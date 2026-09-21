import { describe, it, expect } from "vitest";
import { generateAPAReference, generateBibTeX, generatePosterSvgMarkup, AESTHETIC_QUOTES } from "../src/utils/poster.js";
import { resolveDownloadPayload } from "../src/utils/archive.js";
import { CASES } from "../src/data/cases.js";

describe("Exhibition Poster & Academic Citation 海报生成与文献引文工具测试", () => {
  const sampleCase = CASES[0]; // 德绍包豪斯

  it("generateAPAReference 能准确生成标准学术 APA 格式引文字符串", () => {
    const apa = generateAPAReference(sampleCase);
    expect(apa).toContain(sampleCase.designer);
    expect(apa).toContain(String(sampleCase.year));
    expect(apa).toContain(sampleCase.title);
    expect(apa).toContain(sampleCase.movement);
    expect(apa).toContain("Daily Aesthetic Atelier");
  });

  it("generateBibTeX 能准确生成标准 BibTeX 学术引用块", () => {
    const bib = generateBibTeX(sampleCase);
    expect(bib.startsWith("@misc{")).toBe(true);
    expect(bib).toContain(`author = {${sampleCase.designer}}`);
    expect(bib).toContain(`title = {${sampleCase.title}}`);
    expect(bib).toContain(`year = {${sampleCase.year}}`);
  });

  it("generatePosterSvgMarkup 能生成合法的全矢量独立 SVG 展签海报源码并内嵌真实矢量作品", () => {
    const svg = generatePosterSvgMarkup({
      c: sampleCase,
      quote: AESTHETIC_QUOTES[0],
      note: "测试研习批注与几何骨架观察：通过悬挂玻璃幕墙消解了传统建筑的笨重封闭感，让劳动空间与自然光线发生对话。",
      dateStr: "2026-09-19",
    });

    expect(svg.startsWith("<?xml")).toBe(true);
    expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('viewBox="0 0 800 1130"');
    expect(svg).toContain("DAILY AESTHETIC ATELIER");
    expect(svg).toContain(sampleCase.title);
    expect(svg).toContain("</svg>");
    // 关键验证：海报正中央嵌入了真实的包豪斯矢量作品（包含 BAUHAUS 文本与几何矩形），而非简单占位符
    expect(svg).toContain("BAUHAUS");
    expect(svg).toContain('preserveAspectRatio="xMidYMid meet"');
    expect(svg).toContain("<tspan");
  });

  it("支持程序生成矢量图（未定义在预设 VISUALS 中的案例）正确渲染到海报主框", () => {
    const fallbackCase = {
      id: "experimental-kiosk",
      title: "实验性报亭装置",
      designer: "前卫工坊",
      year: 1930,
      field: "公共设施",
      movement: "构成主义",
      intro: "动态折角与红蓝结构",
    };

    const svg = generatePosterSvgMarkup({
      c: fallbackCase,
      quote: AESTHETIC_QUOTES[1],
      dateStr: "2026-09-19",
    });

    expect(svg).toContain("EXPERIMENTAL-KIOSK");
    expect(svg).toContain("实验性报亭装置");
    expect(svg).toContain('<svg x="76" y="155" width="648" height="430"');
  });

  it("resolveDownloadPayload 能正确自愈纠偏意外倒置的文件名与文件内容参数", () => {
    const dummySvg = '<?xml version="1.0"?><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>';
    const dummyFilename = "bauhaus-dessau-exhibition-poster.svg";

    // 模拟之前导致 bug 的倒置传参：arg1=SVG内容, arg2=文件名
    const healed = resolveDownloadPayload(dummySvg, dummyFilename, "image/svg+xml;charset=utf-8");
    expect(healed.filename).toBe(dummyFilename);
    expect(healed.content).toBe(dummySvg);
    expect(healed.mimeType).toBe("image/svg+xml;charset=utf-8");

    // 正常传参：arg1=文件名, arg2=内容
    const normal = resolveDownloadPayload(dummyFilename, dummySvg, "image/svg+xml;charset=utf-8");
    expect(normal.filename).toBe(dummyFilename);
    expect(normal.content).toBe(dummySvg);
  });

  it("海报 SVG 绝无任何重复属性（杜绝 Chrome 报错 Attribute class redefined）", () => {
    function findDuplicateAttributes(svg) {
      const cleanSvg = svg
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "");

      const tagRegex = /<([a-zA-Z0-9:-]+)((?:\s+[^=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/g;
      const errors = [];
      let match;

      while ((match = tagRegex.exec(cleanSvg)) !== null) {
        const tagName = match[1];
        const attrsString = match[2];
        if (!attrsString.trim()) continue;

        const attrRegex = /\b([a-zA-Z0-9:-]+)\s*=/g;
        const seenAttrs = new Set();
        let attrMatch;

        while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
          const attrName = attrMatch[1];
          if (seenAttrs.has(attrName)) {
            errors.push(`Tag <${tagName}> 重复定义了属性 "${attrName}": ${match[0]}`);
          }
          seenAttrs.add(attrName);
        }
      }
      return errors;
    }

    // 验证所有 CASES 全量样本的海报 SVG
    for (const c of CASES) {
      const svg = generatePosterSvgMarkup({
        c,
        quote: AESTHETIC_QUOTES[0],
        note: "严格验证 XML 规范度，不得含有属性重定义。",
        dateStr: "2026-09-21",
      });
      const errors = findDuplicateAttributes(svg);
      expect(errors, `Case ${c.id} 生成的 SVG 存在重复属性: ${errors.join("; ")}`).toEqual([]);
      // 样式应安全包裹在 CDATA 中以保护 & 等 XML 敏感实体
      expect(svg).toContain("<![CDATA[");
      expect(svg).toContain("]]>");
    }
  });

  it("空入参情况下能够安全降级而不抛出异常", () => {
    expect(generateAPAReference(null)).toBe("");
    expect(generateBibTeX(null)).toBe("");
    expect(generatePosterSvgMarkup({})).toBe("");
  });
});

