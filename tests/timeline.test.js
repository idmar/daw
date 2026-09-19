import { describe, it, expect } from "vitest";
import { EPOCHS, getEpochForYear, groupCasesByEpoch } from "../src/utils/chronology.js";
import { CASES } from "../src/data/cases.js";

describe("Design History Chronology 编年史谱系与年代纪元工具测试", () => {
  it("所有年代纪元配置均具备合理的起止年份与里程碑文献注记", () => {
    expect(EPOCHS.length).toBeGreaterThanOrEqual(10);
    EPOCHS.forEach(e => {
      expect(e.id).toBeDefined();
      expect(e.label).toBeTruthy();
      expect(e.sub).toBeTruthy();
      expect(e.milestone).toBeTruthy();
      expect(Array.isArray(e.range)).toBe(true);
      expect(e.range.length).toBe(2);
      expect(e.range[1]).toBeGreaterThanOrEqual(e.range[0]);
    });
  });

  it("getEpochForYear 能准确将历史年份映射到对应的设计史纪元", () => {
    expect(getEpochForYear(1540).id).toBe("pre-1900");
    expect(getEpochForYear(1919).id).toBe("1900s-1910s");
    expect(getEpochForYear(1925).id).toBe("1920s");
    expect(getEpochForYear(1933).id).toBe("1930s");
    expect(getEpochForYear(1946).id).toBe("1940s");
    expect(getEpochForYear(1957).id).toBe("1950s");
    expect(getEpochForYear(1968).id).toBe("1960s");
    expect(getEpochForYear(1972).id).toBe("1970s");
    expect(getEpochForYear(1984).id).toBe("1980s");
    expect(getEpochForYear(1994).id).toBe("1990s");
    expect(getEpochForYear(2007).id).toBe("2000s-now");
  });

  it("groupCasesByEpoch 能够完整无遗漏地聚类全馆 100 件案例并保持年代升序", () => {
    const grouped = groupCasesByEpoch(CASES);
    expect(grouped.length).toBe(EPOCHS.length);

    // 统计总案例数
    const totalCount = grouped.reduce((sum, g) => sum + g.cases.length, 0);
    expect(totalCount).toBe(CASES.length);
    expect(totalCount).toBe(100);

    // 检查各纪元内部是否按年份升序排列
    grouped.forEach(g => {
      for (let i = 1; i < g.cases.length; i++) {
        const prevYear = typeof g.cases[i - 1].year === "number" ? g.cases[i - 1].year : parseInt(g.cases[i - 1].year, 10);
        const currYear = typeof g.cases[i].year === "number" ? g.cases[i].year : parseInt(g.cases[i].year, 10);
        expect(currYear).toBeGreaterThanOrEqual(prevYear);
      }
    });
  });
});
