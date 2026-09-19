import { describe, it, expect } from "vitest";
import { DISCIPLINES, MOVEMENTS, getCaseDiscipline, filterCuratedCases } from "../src/utils/taxonomy.js";
import { CASES } from "../src/data/cases.js";

describe("taxonomy 馆藏学科分类与多维策展过滤测试", () => {
  it("所有学科门类定义完整且包含图标与名称", () => {
    expect(DISCIPLINES.length).toBeGreaterThan(5);
    DISCIPLINES.forEach(d => {
      expect(d.id).toBeDefined();
      expect(d.name).toBeDefined();
    });
  });

  it("getCaseDiscipline 正确归类建筑经典为空间建筑门类", () => {
    const bauhaus = CASES.find(c => c.id === "bauhaus-dessau");
    expect(bauhaus).toBeDefined();
    const d = getCaseDiscipline(bauhaus);
    expect(d.id).toBe("spatial");
    expect(d.name).toContain("建筑");
  });

  it("getCaseDiscipline 正确归类椅子与电器为工业器物门类", () => {
    const wassily = CASES.find(c => c.id === "wassily-chair");
    expect(wassily).toBeDefined();
    const d = getCaseDiscipline(wassily);
    expect(d.id).toBe("industrial");
  });

  it("filterCuratedCases 按学科筛选生效", () => {
    const spatialCases = filterCuratedCases(CASES, { discipline: "spatial" });
    expect(spatialCases.length).toBeGreaterThan(0);
    spatialCases.forEach(c => {
      expect(getCaseDiscipline(c).id).toBe("spatial");
    });
  });

  it("filterCuratedCases 按包豪斯流派筛选生效", () => {
    const bauhausCases = filterCuratedCases(CASES, { movement: "bauhaus" });
    expect(bauhausCases.length).toBeGreaterThan(0);
    bauhausCases.forEach(c => {
      expect(c.movement).toContain("包豪斯");
    });
  });

  it("filterCuratedCases 组合筛选与已研习过滤正常工作", () => {
    const learnedIds = new Set(["bauhaus-dessau"]);
    const doneList = filterCuratedCases(CASES, { status: "done", learnedIds });
    expect(doneList.length).toBe(1);
    expect(doneList[0].id).toBe("bauhaus-dessau");

    const todoList = filterCuratedCases(CASES, { status: "todo", learnedIds });
    expect(todoList.some(c => c.id === "bauhaus-dessau")).toBe(false);
  });
});
