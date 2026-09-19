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
});
