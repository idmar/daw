/**
 * 美术馆学术展签海报生成与学术引文导出工具 (Exhibition Poster & Academic Citation Utilities)
 */

export const AESTHETIC_QUOTES = [
  "好的设计是尽可能少的设计。 —— 迪特·拉姆斯",
  "少即是多。 —— 密斯·凡·德·罗",
  "艺术与技术：一种新的统一。 —— 瓦尔特·格罗皮乌斯",
  "形式永远追随功能。 —— 路易斯·沙利文",
  "设计不是纯粹的装饰，设计是秩序与惊喜的精妙平衡。 —— 保罗·兰德",
  "网格不仅是一种视觉次序，更是一种对待信息与文明的谦逊态度。 —— 穆勒-布罗克曼",
  "如果你能设计一样东西，你就能设计一切。 —— 马西莫·维涅里",
  "设计不是制作一件物品，而是探寻人与环境之间的敏感连接。 —— 原研哉",
];

/**
 * 为案例生成标准 APA 格式学术文献引用字符串
 */
export function generateAPAReference(c) {
  if (!c) return "";
  const year = c.year || "n.d.";
  const designer = c.designer || "Unknown Designer";
  const title = c.title || "Untitled Work";
  const movement = c.movement || "Modern Design";
  return `${designer} (${year}). ${title} [Design Work / Artifact]. Movement: ${movement}. Curated in Daily Aesthetic Atelier.`;
}

/**
 * 为案例生成标准 BibTeX 文献条目
 */
export function generateBibTeX(c) {
  if (!c) return "";
  const id = c.id.replace(/[^a-zA-Z0-9]/g, "_");
  const year = c.year || "n.d.";
  const designer = c.designer || "Unknown";
  const title = c.title || "Untitled";
  return `@misc{${id}_${year},
  author = {${designer}},
  title = {${title}},
  year = {${year}},
  howpublished = {Daily Aesthetic Atelier Curatorial Archive},
  note = {Movement: ${c.movement || ""}}
}`;
}

/**
 * 生成独立完整的矢量 SVG 展签海报源码
 */
export function generatePosterSvgMarkup({ c, quote, note, dateStr }) {
  if (!c) return "";
  const qText = quote || AESTHETIC_QUOTES[0];
  const safeTitle = (c.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeDesigner = (c.designer || "").replace(/&/g, "&amp;");
  const safeMovement = (c.movement || "").replace(/&/g, "&amp;");
  const safeNote = (note || c.intro || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").slice(0, 120);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1130" width="800" height="1130">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;900&amp;family=Noto+Serif+SC:wght@400;700;900&amp;display=swap');
      .bg { fill: #F7F5EE; }
      .border-line { stroke: #17160F; stroke-width: 2; fill: none; }
      .thin-line { stroke: #C9C7BE; stroke-width: 1; fill: none; }
      .blue-fill { fill: #002FA7; }
      .ink-fill { fill: #17160F; }
      .muted-fill { fill: #727068; }
      .font-sans { font-family: 'Archivo', -apple-system, sans-serif; }
      .font-serif { font-family: 'Noto Serif SC', serif; }
    </style>
  </defs>

  <!-- 纸本底色 -->
  <rect width="800" height="1130" class="bg" />

  <!-- 外边框与内装订线 -->
  <rect x="36" y="36" width="728" height="1058" class="border-line" />
  <line x1="36" y1="120" x2="764" y2="120" class="border-line" />
  <line x1="36" y1="840" x2="764" y2="840" class="border-line" />
  <line x1="36" y1="1020" x2="764" y2="1020" class="thin-line" />

  <!-- 顶部馆藏标头 -->
  <text x="56" y="74" class="font-sans" font-size="11" font-weight="700" letter-spacing="3" fill="#002FA7">DAILY AESTHETIC ATELIER · 美术馆学术档案</text>
  <text x="56" y="98" class="font-serif" font-size="16" font-weight="700" class="ink-fill">经典设计审美启蒙研习专刊</text>
  <text x="744" y="86" text-anchor="end" class="font-sans" font-size="12" font-weight="600" class="muted-fill">${dateStr || "ARCHIVE EDITION"}</text>

  <!-- 中部展签主图框 -->
  <rect x="56" y="140" width="688" height="480" fill="#FFFFFF" stroke="#C9C7BE" stroke-width="1" />
  <!-- 居中矢量展件说明 -->
  <text x="400" y="380" text-anchor="middle" class="font-serif" font-size="28" font-weight="900" fill="#17160F" opacity="0.12">${safeTitle}</text>
  <circle cx="400" cy="360" r="160" fill="none" stroke="#002FA7" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.4" />
  <line x1="200" y1="360" x2="600" y2="360" stroke="#C9C7BE" stroke-width="1" />
  <line x1="400" y1="160" x2="400" y2="560" stroke="#C9C7BE" stroke-width="1" />
  <text x="400" y="372" text-anchor="middle" class="font-sans" font-size="64" font-weight="900" fill="#002FA7">${c.year || ""}</text>
  <text x="400" y="420" text-anchor="middle" class="font-sans" font-size="13" font-weight="700" letter-spacing="4" fill="#D0361F">GEOMETRIC PROPORTION STUDY</text>

  <!-- 作品题签区 -->
  <text x="56" y="660" class="font-sans" font-size="12" font-weight="700" letter-spacing="2" fill="#002FA7">NO. ${c.id.toUpperCase()}</text>
  <text x="56" y="706" class="font-serif" font-size="34" font-weight="900" class="ink-fill">${safeTitle}</text>
  <text x="56" y="744" class="font-sans" font-size="16" font-weight="600" class="muted-fill">${safeDesigner} · ${c.year} · ${safeMovement}</text>

  <!-- 格言引用 -->
  <rect x="56" y="770" width="688" height="48" fill="#F0EDE1" />
  <line x1="56" y1="770" x2="56" y2="818" stroke="#002FA7" stroke-width="4" />
  <text x="76" y="800" class="font-serif" font-size="13.5" font-style="italic" class="ink-fill">“${qText}”</text>

  <!-- 学术手记与研习批注 -->
  <text x="56" y="874" class="font-sans" font-size="11" font-weight="700" letter-spacing="2" fill="#002FA7">CURATORIAL NOTES · 导览研读手记</text>
  <text x="56" y="906" class="font-serif" font-size="14" class="ink-fill">${safeNote}…</text>

  <!-- 底部防伪印签 -->
  <text x="56" y="1054" class="font-sans" font-size="10.5" class="muted-fill">DESIGN EDUCATION ATELIER · FACULTY OF ART &amp; DESIGN</text>
  <text x="744" y="1054" text-anchor="end" class="font-sans" font-size="10.5" font-weight="700" fill="#002FA7">OFFICIAL STUDY PLATE ✦ 100 CLASSICS</text>
</svg>`;
}
