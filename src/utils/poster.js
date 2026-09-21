import { renderToStaticMarkup } from "react-dom/server";
import { getVisual } from "../data/visuals.jsx";

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
 * 转义 XML / SVG 文本
 */
function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

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
  const id = c.id ? c.id.replace(/[^a-zA-Z0-9]/g, "_") : "work";
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
 * 生成独立完整的矢量 SVG 展签海报源码（真正内嵌案例原创矢量作品）
 */
export function generatePosterSvgMarkup({ c, quote, note, dateStr, visualSvg }) {
  if (!c) return "";
  const qText = quote || AESTHETIC_QUOTES[0];
  const safeTitle = escapeXml(c.title || "");
  const safeDesigner = escapeXml(c.designer || "");
  const safeMovement = escapeXml(c.movement || "");
  const safeCaseId = escapeXml(c.id ? c.id.toUpperCase() : "ATELIER");
  const rawNote = (note || c.intro || "").trim();
  const safeNote = escapeXml(rawNote.slice(0, 160));

  // 获取并转换作品真实矢量图形
  let renderedVisual = "";
  if (visualSvg && typeof visualSvg === "string") {
    renderedVisual = visualSvg;
  } else {
    try {
      const visualNode = getVisual(c);
      if (visualNode) {
        renderedVisual = renderToStaticMarkup(visualNode);
      }
    } catch (e) {
      console.error("Failed to render visual for poster SVG:", e);
    }
  }

  let artworkSvg = "";
  if (renderedVisual && renderedVisual.includes("<svg")) {
    // 将提取出的 SVG 节点自适应配置到展签内框中（支持标准内嵌 SVG 与自适应居中）
    artworkSvg = renderedVisual.replace(
      /^<svg\b([^>]*)>/i,
      (match, existingAttrs) => {
        const cleanedAttrs = existingAttrs
          .replace(/\b(x|y|width|height|preserveAspectRatio)\s*=\s*(?:"[^"]*"|'[^']*'|\S+)/gi, "")
          .trim();
        return `<svg x="76" y="155" width="648" height="430" preserveAspectRatio="xMidYMid meet" ${cleanedAttrs}>`;
      }
    );
  } else {
    artworkSvg = `<g transform="translate(400, 360)">
      <circle r="120" fill="none" stroke="#002FA7" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.3" />
      <line x1="-100" y1="0" x2="100" y2="0" stroke="#C9C7BE" stroke-width="1" />
      <line x1="0" y1="-100" x2="0" y2="100" stroke="#C9C7BE" stroke-width="1" />
      <text y="14" text-anchor="middle" font-family="'Archivo', sans-serif" font-size="52" font-weight="900" fill="#002FA7">${escapeXml(String(c.year || ""))}</text>
    </g>`;
  }

  // 手记/导览多行换行处理（每行约 36-38 个字符，适配 688px 版宽）
  const noteLines = [];
  const maxLineLength = 38;
  for (let i = 0; i < safeNote.length; i += maxLineLength) {
    noteLines.push(safeNote.slice(i, i + maxLineLength));
  }
  if (noteLines.length === 0) noteLines.push("");

  const titleFontSize = safeTitle.length > 20 ? 28 : 34;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1130" width="800" height="1130">
  <defs>
    <style type="text/css"><![CDATA[
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;900&family=Noto+Serif+SC:wght@400;700;900&display=swap');
      .bg { fill: #F7F5EE; }
      .border-line { stroke: #17160F; stroke-width: 2; fill: none; }
      .thin-line { stroke: #C9C7BE; stroke-width: 1; fill: none; }
      .blue-fill { fill: #002FA7; }
      .ink-fill { fill: #17160F; }
      .muted-fill { fill: #727068; }
      .font-sans { font-family: 'Archivo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; }
      .font-serif { font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, 'STSong', serif; }
    ]]></style>
  </defs>

  <!-- 纸本底色 -->
  <rect width="800" height="1130" class="bg" />

  <!-- 外边框与内装订线 -->
  <rect x="36" y="36" width="728" height="1058" class="border-line" />
  <line x1="36" y1="120" x2="764" y2="120" class="border-line" />
  <line x1="36" y1="836" x2="764" y2="836" class="border-line" />
  <line x1="36" y1="1020" x2="764" y2="1020" class="thin-line" />

  <!-- 顶部馆藏标头 -->
  <text x="56" y="74" class="font-sans blue-fill" font-size="11" font-weight="700" letter-spacing="3">DAILY AESTHETIC ATELIER · 美术馆学术档案</text>
  <text x="56" y="98" class="font-serif ink-fill" font-size="16" font-weight="700">经典设计审美启蒙研习专刊</text>
  <text x="744" y="86" text-anchor="end" class="font-sans muted-fill" font-size="12" font-weight="600">${escapeXml(dateStr || "ARCHIVE EDITION")}</text>

  <!-- 中部展签主图框 -->
  <rect x="56" y="140" width="688" height="480" fill="#FFFFFF" stroke="#C9C7BE" stroke-width="1" />
  <!-- 四角精微定位准线 (Archival Registration Marks) -->
  <path d="M 64 154 L 64 148 L 70 148 M 736 154 L 736 148 L 730 148 M 64 606 L 64 612 L 70 612 M 736 606 L 736 612 L 730 612" fill="none" stroke="#C9C7BE" stroke-width="1" />
  <!-- 展件真实矢量图形 -->
  ${artworkSvg}
  <!-- 展框角注 -->
  <text x="76" y="608" class="font-sans" font-size="9.5" font-weight="600" letter-spacing="1.5" fill="#C9C7BE">FIG. ${safeCaseId}</text>
  <text x="724" y="608" text-anchor="end" class="font-sans muted-fill" font-size="10.5" font-weight="700" letter-spacing="1.5">${escapeXml(String(c.year || ""))}</text>

  <!-- 作品题签区 -->
  <text x="56" y="658" class="font-sans blue-fill" font-size="12" font-weight="700" letter-spacing="2">NO. ${safeCaseId}</text>
  <text x="56" y="700" class="font-serif ink-fill" font-size="${titleFontSize}" font-weight="900">${safeTitle}</text>
  <text x="56" y="736" class="font-sans muted-fill" font-size="15" font-weight="600">${safeDesigner} · ${escapeXml(String(c.year || ""))} · ${safeMovement}</text>

  <!-- 格言引用 -->
  <rect x="56" y="764" width="688" height="48" fill="#F0EDE1" />
  <line x1="56" y1="764" x2="56" y2="812" stroke="#002FA7" stroke-width="4" />
  <text x="76" y="794" class="font-serif ink-fill" font-size="13" font-style="italic">“${escapeXml(qText)}”</text>

  <!-- 学术手记与研习批注 -->
  <text x="56" y="868" class="font-sans blue-fill" font-size="11" font-weight="700" letter-spacing="2">CURATORIAL NOTES · 导览研读手记</text>
  <text x="56" y="898" class="font-serif ink-fill" font-size="14">
    ${noteLines.map((line, idx) => `<tspan x="56" dy="${idx === 0 ? 0 : 22}">${line}${idx === noteLines.length - 1 && rawNote.length > 160 ? "…" : ""}</tspan>`).join("\n    ")}
  </text>

  <!-- 底部防伪印签 -->
  <text x="56" y="1054" class="font-sans muted-fill" font-size="10.5">DESIGN EDUCATION ATELIER · FACULTY OF ART &amp; DESIGN</text>
  <text x="744" y="1054" text-anchor="end" class="font-sans blue-fill" font-size="10.5" font-weight="700">OFFICIAL STUDY PLATE ✦ 100 CLASSICS</text>
</svg>`;
}
