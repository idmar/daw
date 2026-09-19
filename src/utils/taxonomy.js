/**
 * 设计学学科分类与策展流派体系
 */

export const DISCIPLINES = [
  { id: "all", name: "全部学科", icon: "❖" },
  { id: "spatial", name: "空间与建筑", icon: "🏛️", keywords: ["建筑", "空间", "展馆", "住宅", "室内"] },
  { id: "industrial", name: "工业与器物", icon: "🪑", keywords: ["家具", "工业", "器物", "灯具", "交通", "电子", "日常器物"] },
  { id: "visual", name: "视觉与海报", icon: "🎨", keywords: ["平面", "海报", "标志", "品牌", "包装", "广告"] },
  { id: "typography", name: "字体与排版", icon: "📐", keywords: ["字体", "排版", "书籍", "编辑", "字形"] },
  { id: "interaction", name: "信息与界面", icon: "📱", keywords: ["信息", "界面", "交互", "体验", "数字", "系统"] },
  { id: "oriental", name: "东方设计美学", icon: "🏮", keywords: ["中国", "日本", "东方", "传统", "印章", "水墨"] },
];

export const MOVEMENTS = [
  { id: "all", name: "全部流派" },
  { id: "bauhaus", name: "包豪斯 Bauhaus", match: m => m.includes("包豪斯") },
  { id: "swiss", name: "瑞士国际主义", match: m => m.includes("瑞士") || m.includes("国际主义") },
  { id: "modernism", name: "现代主义", match: m => m.includes("现代主义") },
  { id: "destijl", name: "风格派 De Stijl", match: m => m.includes("风格派") },
  { id: "nordic", name: "北欧现代", match: m => m.includes("北欧") },
  { id: "postmodern", name: "激进与后现代", match: m => m.includes("后现代") || m.includes("激进") || m.includes("孟菲斯") },
  { id: "contemporary", name: "当代与东方", match: m => m.includes("当代") || m.includes("东方") || m.includes("日本") || m.includes("中国") },
];

/**
 * 确定案例所属的学科门类
 */
export const getCaseDiscipline = c => {
  const text = `${c.field || ""} ${c.title || ""} ${c.intro || ""}`;
  for (const d of DISCIPLINES) {
    if (d.id === "all") continue;
    if (d.keywords.some(kw => text.includes(kw))) {
      return d;
    }
  }
  return DISCIPLINES[1]; // 默认工业器物
};

/**
 * 综合多维筛选
 */
export const filterCuratedCases = (cases = [], {
  discipline = "all",
  movement = "all",
  theme = "all",
  status = "all",
  query = "",
  learnedIds = new Set(),
}) => {
  const kw = (query || "").trim().toLowerCase();

  return cases.filter(c => {
    // 1. 学科专业筛选
    if (discipline !== "all") {
      const disc = getCaseDiscipline(c);
      if (disc.id !== discipline) return false;
    }

    // 2. 流派思潮筛选
    if (movement !== "all") {
      const movObj = MOVEMENTS.find(m => m.id === movement);
      if (movObj && movObj.match) {
        if (!movObj.match(c.movement || "")) return false;
      }
    }

    // 3. 主题日筛选
    if (theme !== "all" && String(c.day) !== String(theme)) {
      return false;
    }

    // 4. 研习状态筛选
    const isDone = learnedIds.has(c.id);
    if (status === "done" && !isDone) return false;
    if (status === "todo" && isDone) return false;

    // 5. 关键词搜索
    if (kw) {
      const target = [c.title, c.designer, c.movement, c.field, String(c.year), c.intro]
        .join(" ")
        .toLowerCase();
      if (!target.includes(kw)) return false;
    }

    return true;
  });
};
