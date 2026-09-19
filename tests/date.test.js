import { describe, it, expect } from "vitest";
import { todayKey, dayIndexOf, casesForDay, fmtDate, calculateStats } from "../src/utils/date.js";

describe("date 工具函数测试", () => {
  it("todayKey 返回 YYYY-MM-DD 格式", () => {
    const key = todayKey();
    expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("dayIndexOf 在 0-19 周期循环", () => {
    const idx1 = dayIndexOf("2026-01-01", 20);
    expect(idx1).toBeGreaterThanOrEqual(0);
    expect(idx1).toBeLessThan(20);

    const idx2 = dayIndexOf("2026-01-21", 20);
    expect(idx2).toBe(idx1); // 刚好相差 20 天
  });

  it("fmtDate 格式化日期与星期", () => {
    const str = fmtDate("2026-09-19");
    expect(str).toContain("2026年9月19日");
    expect(str).toContain("周");
  });

  it("calculateStats 正确计算 streak 与统计", () => {
    const completedMap = {
      "2026-09-17": ["c1", "c2", "c3", "c4", "c5"],
      "2026-09-18": ["c6", "c7", "c8", "c9", "c10"],
      "2026-09-19": ["c11", "c12", "c13", "c14", "c15"],
    };
    const stats = calculateStats(completedMap, "2026-09-19", true);
    expect(stats.total).toBe(15);
    expect(stats.uniqueCount).toBe(15);
    expect(stats.fullDays).toBe(3);
    expect(stats.streak).toBe(3);
  });

  it("今日未闭馆时 streak 基于昨日", () => {
    const completedMap = {
      "2026-09-17": ["c1", "c2", "c3", "c4", "c5"],
      "2026-09-18": ["c6", "c7", "c8", "c9", "c10"],
      "2026-09-19": ["c11"], // 未满 5 件
    };
    const stats = calculateStats(completedMap, "2026-09-19", false);
    expect(stats.streak).toBe(2);
    expect(stats.fullDays).toBe(2);
  });
});
