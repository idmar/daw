import { describe, it, expect } from "vitest";
import { generateAPAReference, generateBibTeX, generatePosterSvgMarkup, AESTHETIC_QUOTES } from "../src/utils/poster.js";
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

  it("generatePosterSvgMarkup 能生成合法的全矢量独立 SVG 展签海报源码", () => {
    const svg = generatePosterSvgMarkup({
      c: sampleCase,
      quote: AESTHETIC_QUOTES[0],
      note: "测试研习批注与几何骨架观察",
      dateStr: "2026-09-19",
    });

    expect(svg.startsWith("<?xml")).toBe(true);
    expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('viewBox="0 0 800 1130"');
    expect(svg).toContain("DAILY AESTHETIC ATELIER");
    expect(svg).toContain(sampleCase.title);
    expect(svg).toContain("</svg>");
  });

  it("空入参情况下能够安全降级而不抛出异常", () => {
    expect(generateAPAReference(null)).toBe("");
    expect(generateBibTeX(null)).toBe("");
    expect(generatePosterSvgMarkup({})).toBe("");
  });
});
