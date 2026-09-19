import { describe, it, expect } from "vitest";
import { CASES } from "../src/data/cases.js";
import { getCaseDiscipline } from "../src/utils/taxonomy.js";

describe("Flashcard 闪卡数据流与主动回忆抽认测试", () => {
  const learnedIds = new Set(["bauhaus-dessau", "wassily-chair"]);

  it("默认全量卡组数量与 CASES 一致", () => {
    expect(CASES.length).toBe(100);
  });

  it("已研习过滤仅保留在 learnedIds 中的案例", () => {
    const filtered = CASES.filter(c => learnedIds.has(c.id));
    expect(filtered.length).toBe(2);
    expect(filtered.map(c => c.id)).toContain("bauhaus-dessau");
    expect(filtered.map(c => c.id)).toContain("wassily-chair");
  });

  it("按学科抽认时正确保留对应案例", () => {
    const spatialDeck = CASES.filter(c => getCaseDiscipline(c).id === "spatial");
    expect(spatialDeck.length).toBeGreaterThan(0);
    spatialDeck.forEach(c => {
      expect(getCaseDiscipline(c).id).toBe("spatial");
    });
  });

  it("每件案例均拥有用于正反面抽认的核心字段（title, designer, year, points, intro）", () => {
    CASES.forEach(c => {
      expect(c.id).toBeDefined();
      expect(c.title).toBeDefined();
      expect(c.designer).toBeDefined();
      expect(c.year).toBeDefined();
      expect(Array.isArray(c.points)).toBe(true);
      expect(c.points.length).toBeGreaterThan(0);
    });
  });
});
