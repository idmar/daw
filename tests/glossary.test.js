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

  it("防误触回归测试：避免 Think Small、Bayer Universal 等案例被错误关联", () => {
    // 1. Think Small 甲壳虫广告不应误挂原研哉 (因为 intro 中的留白)
    const thinkSmall = CASES.find(c => c.id === "think-small");
    expect(thinkSmall).toBeDefined();
    expect(findMasterForCase(thinkSmall)).toBeNull();

    // 2. 赫伯特·拜耶 Universal 字体不应误挂阿德里安·弗鲁提格
    const bayerUniversal = CASES.find(c => c.id === "bayer-universal");
    expect(bayerUniversal).toBeDefined();
    expect(findMasterForCase(bayerUniversal)).toBeNull();

    // 3. 龟仓雄策 1964 东京奥运会标志不应误挂保罗·兰德
    const tokyo1964 = CASES.find(c => c.id === "tokyo-1964");
    expect(tokyo1964).toBeDefined();
    expect(findMasterForCase(tokyo1964)).toBeNull();

    // 4. 深泽直人壁挂CD机不应误挂原研哉
    const mujiCd = CASES.find(c => c.id === "muji-cd");
    expect(mujiCd).toBeDefined();
    expect(findMasterForCase(mujiCd)).toBeNull();

    // 5. Macintosh 128K 不应误挂乔纳森·伊夫
    const macintosh = CASES.find(c => c.id === "macintosh");
    expect(macintosh).toBeDefined();
    expect(findMasterForCase(macintosh)).toBeNull();
  });

  it("大师档案中的馆藏作品列表精准对应大师真实收录作品", () => {
    const getRelatedCases = (master) => CASES.filter(c => {
      if (master.caseIds && master.caseIds.includes(c.id)) return true;
      const m = findMasterForCase(c);
      return m && m.id === master.id;
    });

    // 原研哉：仅收录 muji-horizon
    const hara = MASTERS.find(m => m.id === "kenya-hara");
    const haraCases = getRelatedCases(hara);
    expect(haraCases.map(c => c.id)).toEqual(["muji-horizon"]);

    // 保罗·兰德：仅收录 ibm-rand
    const rand = MASTERS.find(m => m.id === "paul-rand");
    const randCases = getRelatedCases(rand);
    expect(randCases.map(c => c.id)).toEqual(["ibm-rand"]);

    // 阿德里安·弗鲁提格：仅收录 univers
    const frutiger = MASTERS.find(m => m.id === "adrian-frutiger");
    const frutigerCases = getRelatedCases(frutiger);
    expect(frutigerCases.map(c => c.id)).toEqual(["univers"]);

    // 迪特·拉姆斯：收录 braun-sk4 与 braun-t3
    const rams = MASTERS.find(m => m.id === "dieter-rams");
    const ramsCases = getRelatedCases(rams);
    expect(ramsCases.map(c => c.id).sort()).toEqual(["braun-sk4", "braun-t3"].sort());

    // 乔纳森·伊夫：收录 iphone-2007 与 ios7
    const ive = MASTERS.find(m => m.id === "jony-ive");
    const iveCases = getRelatedCases(ive);
    expect(iveCases.map(c => c.id).sort()).toEqual(["iphone-2007", "ios7"].sort());

    // 勒·柯布西耶：收录 villa-savoye 与 ronchamp
    const corbusier = MASTERS.find(m => m.id === "le-corbusier");
    const corbusierCases = getRelatedCases(corbusier);
    expect(corbusierCases.map(c => c.id).sort()).toEqual(["villa-savoye", "ronchamp"].sort());

    // 马西莫·维涅里：暂未收录单件，返回空数组
    const vignelli = MASTERS.find(m => m.id === "massimo-vignelli");
    const vignelliCases = getRelatedCases(vignelli);
    expect(vignelliCases.length).toBe(0);
  });
});
