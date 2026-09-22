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
  if (!c) return DISCIPLINES[1];

  // 1. 东方设计美学：第3日（东方美学与当代经典）、第17日（日本设计 II）、第20日（中国设计与东方回响）或流派/导览明确为东方美学之作
  const mov = c.movement || "";
  const isOrientalTheme = (c.day === 2 && c.id !== "iphone-2007" && c.id !== "i-love-ny") || c.day === 16 || c.day === 19;
  const isOrientalMov = mov.includes("东方") || mov.includes("日本") || mov.includes("中国") || (c.intro && c.intro.includes("东方美学"));
  if (isOrientalTheme || isOrientalMov) {
    return DISCIPLINES.find(d => d.id === "oriental");
  }

  const field = c.field || "";
  // 2. 空间与建筑
  if (field.includes("建筑") || field.includes("空间") || (c.title && c.title.includes("建筑"))) {
    return DISCIPLINES.find(d => d.id === "spatial");
  }
  // 3. 字体与排版
  if (field.includes("字体") || field.includes("书籍") || field.includes("排版")) {
    return DISCIPLINES.find(d => d.id === "typography");
  }
  // 4. 信息与界面
  if (field.includes("信息") || field.includes("界面") || field.includes("交互")) {
    return DISCIPLINES.find(d => d.id === "interaction");
  }
  // 5. 视觉与海报
  if (field.includes("海报") || field.includes("标志") || field.includes("品牌") || field.includes("包装") || field.includes("广告")) {
    return DISCIPLINES.find(d => d.id === "visual");
  }
  // 6. 工业与器物
  if (field.includes("家具") || field.includes("产品") || field.includes("灯具") || field.includes("交通") || field.includes("图案") || field.includes("服装")) {
    return DISCIPLINES.find(d => d.id === "industrial");
  }

  const text = `${c.field || ""} ${c.title || ""} ${c.intro || ""}`;
  for (const d of DISCIPLINES) {
    if (d.id === "all") continue;
    if (d.keywords && d.keywords.some(kw => text.includes(kw))) {
      return d;
    }
  }
  return DISCIPLINES[2]; // 默认工业器物
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
