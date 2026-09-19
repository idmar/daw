import { describe, it, expect } from "vitest";
import { BADGES } from "../src/data/cases.js";

describe("BADGES 成就徽章判定测试", () => {
  it("全部 9 枚徽章定义完整", () => {
    expect(BADGES.length).toBe(9);
    BADGES.forEach(b => {
      expect(b.id).toBeDefined();
      expect(b.name).toBeDefined();
      expect(typeof b.test).toBe("function");
    });
  });

  it("first-look: 完成 1 个案例时解锁", () => {
    const b = BADGES.find(x => x.id === "first-look");
    expect(b.test({ total: 0 })).toBe(false);
    expect(b.test({ total: 1 })).toBe(true);
  });

  it("first-close: 首日闭馆测试", () => {
    const b = BADGES.find(x => x.id === "first-close");
    expect(b.test({ fullDays: 0 })).toBe(false);
    expect(b.test({ fullDays: 1 })).toBe(true);
  });

  it("streak-3 与 streak-7 连续天数测试", () => {
    const b3 = BADGES.find(x => x.id === "streak-3");
    const b7 = BADGES.find(x => x.id === "streak-7");
    expect(b3.test({ streak: 2 })).toBe(false);
    expect(b3.test({ streak: 3 })).toBe(true);
    expect(b7.test({ streak: 6 })).toBe(false);
    expect(b7.test({ streak: 7 })).toBe(true);
  });

  it("night-owl: 夜场累计 10 件", () => {
    const b = BADGES.find(x => x.id === "night-owl");
    expect(b.test({ extraTotal: 9 })).toBe(false);
    expect(b.test({ extraTotal: 10 })).toBe(true);
  });

  it("full-tour: 完整 100 件馆藏", () => {
    const b = BADGES.find(x => x.id === "full-tour");
    expect(b.test({ uniqueCount: 99 })).toBe(false);
    expect(b.test({ uniqueCount: 100 })).toBe(true);
  });
});
