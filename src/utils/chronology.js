/**
 * 设计史编年轴与年代纪元工具库 (Design History Chronology Utilities)
 */

export const EPOCHS = [
  {
    id: "pre-1900",
    label: "1900 之前",
    sub: "古典源流与工艺前夜",
    range: [0, 1899],
    milestone: "人文主义字体诞生、工业革命发轫、莫里斯工艺美术运动反思机械冷漠。",
  },
  {
    id: "1900s-1910s",
    label: "1900–1910s",
    sub: "现代先锋派萌芽",
    range: [1900, 1919],
    milestone: "德意志制造联盟成立（贝伦斯），打破纯艺术界限；包豪斯在魏玛创立（1919）。",
  },
  {
    id: "1920s",
    label: "1920s",
    sub: "包豪斯与构成主义",
    range: [1920, 1929],
    milestone: "包豪斯迁至德绍（1925），瓦西里钢管椅问世，Futura 几何无衬线字体铸成。",
  },
  {
    id: "1930s",
    label: "1930s",
    sub: "流线型与有机现代",
    range: [1930, 1939],
    milestone: "装饰艺术（Art Deco）鼎盛，阿尔瓦·阿尔托开创芬兰桦木胶合板有机现代主义。",
  },
  {
    id: "1940s",
    label: "1940s",
    sub: "战后重建与材料革新",
    range: [1940, 1949],
    milestone: "伊姆斯夫妇模压胶合板与玻璃纤维实验，现代人体工程学在战后大放异彩。",
  },
  {
    id: "1950s",
    label: "1950s",
    sub: "瑞士网格与博朗功能主义",
    range: [1950, 1959],
    milestone: "Helvetica 与 Univers 诞生（1957），苏黎世学派网格确立，博朗 SK4 收音机问世。",
  },
  {
    id: "1960s",
    label: "1960s",
    sub: "太空时代与系统设计",
    range: [1960, 1969],
    milestone: "塑料一次性成型（潘顿椅），墨西哥奥运全套系统视觉（1968），波普反叛精神。",
  },
  {
    id: "1970s",
    label: "1970s",
    sub: "信息导视与高科技建筑",
    range: [1970, 1979],
    milestone: "维涅里设计纽约地铁拓扑图（1972），皮亚诺与罗杰斯落成蓬皮杜中心（1977）。",
  },
  {
    id: "1980s",
    label: "1980s",
    sub: "孟菲斯集团与个人电脑",
    range: [1980, 1989],
    milestone: "索特萨斯在米兰创立孟菲斯（1981），苹果发布初代 Macintosh 图形界面（1984）。",
  },
  {
    id: "1990s",
    label: "1990s",
    sub: "去中心化与实验排版",
    range: [1990, 1999],
    milestone: "戴维·卡森《Ray Gun》颠覆传统排版可读性规则，互联网早期的多媒体交互探索。",
  },
  {
    id: "2000s-now",
    label: "2000 至今",
    sub: "数字极简与虚空哲学",
    range: [2000, 2099],
    milestone: "Jony Ive 铝合金一体成型工艺（iPod/iPhone），原研哉与深泽直人东方虚空哲学。",
  },
];

/**
 * 获取某个年份对应的年代纪元对象
 */
export function getEpochForYear(rawYear) {
  const y = typeof rawYear === "number" ? rawYear : parseInt(rawYear, 10);
  if (!y || isNaN(y)) return EPOCHS[2]; // 默认 1920s
  return EPOCHS.find(e => y >= e.range[0] && y <= e.range[1]) || EPOCHS[EPOCHS.length - 1];
}

/**
 * 将传入的所有案例按编年年代聚类分组，并按年份升序排序
 */
export function groupCasesByEpoch(cases) {
  const sorted = [...cases].sort((a, b) => {
    const ya = typeof a.year === "number" ? a.year : parseInt(a.year, 10) || 0;
    const yb = typeof b.year === "number" ? b.year : parseInt(b.year, 10) || 0;
    return ya - yb;
  });

  const grouped = EPOCHS.map(epoch => {
    const matched = sorted.filter(c => {
      const y = typeof c.year === "number" ? c.year : parseInt(c.year, 10) || 0;
      return y >= epoch.range[0] && y <= epoch.range[1];
    });
    return {
      ...epoch,
      cases: matched,
    };
  });

  return grouped;
}
