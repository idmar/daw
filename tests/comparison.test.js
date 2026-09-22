import { describe, it, expect } from "vitest";
import { CURATED_DUOS } from "../src/data/comparisons.js";
import { CASES } from "../src/data/cases.js";

describe("Comparative Curatorial Duos 并置策展与经典对比测试", () => {
  it("所有预设对比组均在 CASES 馆藏中存在对应的两件合法案例", () => {
    expect(CURATED_DUOS.length).toBeGreaterThanOrEqual(3);
    CURATED_DUOS.forEach(duo => {
      expect(duo.id).toBeDefined();
      expect(duo.title).toBeTruthy();
      expect(duo.theme).toBeTruthy();

      const caseA = CASES.find(c => c.id === duo.caseAId);
      const caseB = CASES.find(c => c.id === duo.caseBId);

      expect(caseA).toBeDefined();
      expect(caseB).toBeDefined();
      expect(caseA.id).not.toBe(caseB.id);
    });
  });

  it("每个预设学术对比组均具备多维度横向拆解分析矩阵", () => {
    CURATED_DUOS.forEach(duo => {
      expect(Array.isArray(duo.analysis)).toBe(true);
      expect(duo.analysis.length).toBeGreaterThanOrEqual(3);
      duo.analysis.forEach(row => {
        expect(row.dim).toBeTruthy();
        expect(row.left).toBeTruthy();
        expect(row.right).toBeTruthy();
      });
    });
  });

  it("CSS 规则严密防护：防止并置策展台出现横向溢出与矩阵表格坍缩", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const css = fs.readFileSync(path.resolve(__dirname, "../src/styles/atelier.css"), "utf-8");

    // 1. compare-body 必须设置 overflow-x: hidden 防止子元素撑开横向滚轴
    expect(css).toMatch(/\.compare-body\s*\{[^}]*overflow-x:\s*hidden;/);

    // 2. compare-split 必须配置 minmax(0, 1fr) 与 min-width: 0
    expect(css).toMatch(/\.compare-split\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/);

    // 3. compare-card 与 compare-select 必须包含 min-width: 0 避免超长下拉选项撑大卡片
    expect(css).toMatch(/\.compare-card\s*\{[^}]*min-width:\s*0;/);
    expect(css).toMatch(/\.compare-select\s*\{[^}]*min-width:\s*0;/);

    // 4. compare-analysis-table 必须设置 flex-shrink: 0 杜绝在 flex 容器中被挤压为 4px
    expect(css).toMatch(/\.compare-analysis-table\s*\{[^}]*flex-shrink:\s*0;/);
  });
});
