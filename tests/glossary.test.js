import { describe, it, expect } from "vitest";
import { MASTERS, findMasterForCase } from "../src/data/masters.js";
import { CASES } from "../src/data/cases.js";

describe("Design Masters Glossary & Biographies 大师辞典与学术档案测试", () => {
  it("所有收录大师均具备完整的学术档案要素", () => {
    expect(MASTERS.length).toBeGreaterThanOrEqual(10);
    MASTERS.forEach(m => {
      expect(m.id).toBeDefined();
      expect(m.nameZh).toBeTruthy();
      expect(m.nameEn).toBeTruthy();
      expect(m.quote).toBeTruthy();
      expect(m.bio).toBeTruthy();
      expect(m.movement).toBeTruthy();
      expect(Array.isArray(m.roles)).toBe(true);
      expect(Array.isArray(m.caseKeywords)).toBe(true);
      expect(m.caseKeywords.length).toBeGreaterThan(0);
    });
  });

  it("findMasterForCase 能正确通过案例作者或标题匹配到对应大师", () => {
    const gropiusCase = CASES.find(c => c.designer.includes("格罗皮乌斯") || c.title.includes("包豪斯德绍"));
    expect(gropiusCase).toBeDefined();
    const masterGropius = findMasterForCase(gropiusCase);
    expect(masterGropius).toBeDefined();
    expect(masterGropius.id).toBe("walter-gropius");

    const ramsCase = CASES.find(c => c.designer.includes("拉姆斯") || c.title.includes("博朗"));
    expect(ramsCase).toBeDefined();
    const masterRams = findMasterForCase(ramsCase);
    expect(masterRams).toBeDefined();
    expect(masterRams.id).toBe("dieter-rams");

    const breuerCase = CASES.find(c => c.designer.includes("布劳耶") || c.title.includes("瓦西里"));
    expect(breuerCase).toBeDefined();
    const masterBreuer = findMasterForCase(breuerCase);
    expect(masterBreuer).toBeDefined();
    expect(masterBreuer.id).toBe("marcel-breuer");
  });

  it("未知案例或无关联案例能安全返回 null 而非崩溃", () => {
    expect(findMasterForCase(null)).toBeNull();
    expect(findMasterForCase({})).toBeNull();
    expect(findMasterForCase({ designer: "匿名设计师", title: "无名习作" })).toBeNull();
  });
});
