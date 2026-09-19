import { describe, it, expect } from "vitest";
import { CASES } from "../src/data/cases.js";
import { getVisual, VISUALS } from "../src/data/visuals.jsx";

describe("Visual Inspector 构图解剖与矢量图层检视测试", () => {
  it("所有定制研究图在 VISUALS 中均可正常提取", () => {
    const customKeys = Object.keys(VISUALS);
    expect(customKeys.length).toBeGreaterThan(10);
    expect(VISUALS.futuraGeometry).toBeDefined();
    expect(VISUALS.garamondStroke).toBeDefined();
  });

  it("getVisual 能为全部 100 个案例提供合法的矢量图形元素", () => {
    CASES.forEach(c => {
      const visual = getVisual(c);
      expect(visual).toBeDefined();
      expect(visual.type).toBe("svg");
      expect(visual.props.role).toBe("img");
      expect(visual.props.viewBox).toBeDefined();
    });
  });

  it("具备定制解剖图的案例能正确匹配专属 VISUALS 节点", () => {
    const futuraCase = CASES.find(c => c.visual === "futuraGeometry");
    expect(futuraCase).toBeDefined();
    const visual = getVisual(futuraCase);
    expect(visual).toBe(VISUALS.futuraGeometry);
  });

  it("全部 100 个案例均拥有专门定制的专属几何矢量研究图", () => {
    CASES.forEach(c => {
      expect(VISUALS[c.visual]).toBeDefined();
    });
  });

  it("未知案例或外部导入案例能自动退回高质量程序性几何骨架图", () => {
    const dummyCase = { id: "custom-case", title: "现代主义新构", visual: "non_existent" };
    const visual = getVisual(dummyCase);
    expect(visual.props["aria-label"]).toContain("示意研究图");
  });
});
