/**
 * 学习档案管理与导入/导出工具
 */

export const ARCHIVE_VERSION = "1.0.0";

/**
 * 验证导入的 JSON 档案结构完整性
 */
export const validateArchive = raw => {
  if (!raw || typeof raw !== "object") {
    return { valid: false, error: "档案格式非法，必须为 JSON 对象" };
  }
  if (!raw.completed || typeof raw.completed !== "object") {
    return { valid: false, error: "缺少 completed 完成记录字段" };
  }
  return {
    valid: true,
    data: {
      completed: raw.completed || {},
      videoLinks: raw.videoLinks && typeof raw.videoLinks === "object" ? raw.videoLinks : {},
      notes: raw.notes && typeof raw.notes === "object" ? raw.notes : {},
    },
  };
};

/**
 * 将学习档案格式化为易备份的 JSON 数据
 */
export const formatArchivePayload = (state, stats = {}) => {
  return {
    app: "Daily Aesthetic Atelier",
    version: ARCHIVE_VERSION,
    exportedAt: new Date().toISOString(),
    stats,
    completed: state.completed || {},
    videoLinks: state.videoLinks || {},
    notes: state.notes || {},
  };
};

/**
 * 生成设计学研习成果 Markdown 专刊报告
 */
export const generateMarkdownReport = (state, allCases = [], dayThemes = []) => {
  const completed = state.completed || {};
  const notes = state.notes || {};
  const videoLinks = state.videoLinks || {};
  const days = Object.keys(completed).sort();

  const totalFinished = days.reduce((sum, d) => sum + (completed[d] || []).length, 0);
  const uniqueFinished = new Set(days.flatMap(d => completed[d] || [])).size;

  let md = `# 设计审美研习专刊 · Study Portfolio\n\n`;
  md += `> 导览：面向设计学硕士新生的每日经典案例研习档案与观察笔记。\n\n`;
  md += `- **导出时间**：${new Date().toLocaleDateString("zh-CN")} ${new Date().toLocaleTimeString("zh-CN")}\n`;
  md += `- **累计研习次数**：${totalFinished} 次\n`;
  md += `- **研习经典案例**：${uniqueFinished} / ${allCases.length} 件\n\n`;
  md += `---\n\n`;

  if (days.length === 0) {
    md += `*暂无已完成的研习记录。*\n`;
    return md;
  }

  days.forEach(day => {
    const caseIds = completed[day] || [];
    const dayCases = caseIds.map(id => allCases.find(c => c.id === id)).filter(Boolean);
    const themeIdx = Math.floor(Date.parse(day + "T00:00:00") / 86400000) % (dayThemes.length || 20);
    const themeName = dayThemes[themeIdx]?.name || `主题日 ${themeIdx + 1}`;

    md += `## 📅 ${day} · ${themeName}\n\n`;

    dayCases.forEach((c, idx) => {
      md += `### ${idx + 1}. ${c.title} (${c.year}) - ${c.designer}\n\n`;
      md += `- **领域与流派**：${c.field} · ${c.movement}\n`;
      md += `- **导览要旨**：${c.intro}\n\n`;

      if (c.points && c.points.length > 0) {
        md += `#### 设计要点解析\n`;
        c.points.forEach(pt => {
          md += `- **${pt.h}**：${pt.p}\n`;
        });
        md += `\n`;
      }

      md += `#### 观察练习\n> ${c.exercise}\n\n`;

      const userNote = notes[c.id];
      if (userNote && userNote.trim()) {
        md += `#### 📝 我的研习手记 / 批评心得\n\`\`\`text\n${userNote.trim()}\n\`\`\`\n\n`;
      }

      if (videoLinks[c.id]) {
        md += `- **关联研习视频**：[查看视频链接](${videoLinks[c.id]})\n\n`;
      }

      md += `---\n\n`;
    });
  });

  return md;
};

/**
 * 解析并纠偏下载入参（具备参数倒置自愈能力）
 */
export const resolveDownloadPayload = (arg1, arg2, defaultMime = "text/plain;charset=utf-8") => {
  let filename = arg1;
  let content = arg2;

  // 自愈纠偏：如果 arg1 包含了大段 XML/SVG/JSON 内容或换行符，而 arg2 符合文件名特征（长度较短且带扩展名）
  if (
    typeof arg1 === "string" &&
    typeof arg2 === "string" &&
    (arg1.includes("<?xml") || arg1.includes("<svg") || arg1.includes("\n") || arg1.length > 255) &&
    arg2.length <= 255 &&
    /\.[a-zA-Z0-9]{2,5}$/.test(arg2)
  ) {
    filename = arg2;
    content = arg1;
  }

  return { filename, content, mimeType: defaultMime };
};

/**
 * 客户端文件下载辅助
 */
export const downloadFile = (filename, content, mimeType = "text/plain;charset=utf-8") => {
  if (typeof window === "undefined" || !document) return;
  const resolved = resolveDownloadPayload(filename, content, mimeType);
  const blob = new Blob([resolved.content], { type: resolved.mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = resolved.filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};
