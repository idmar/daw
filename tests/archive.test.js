import { describe, it, expect } from "vitest";
import { validateArchive, formatArchivePayload, generateMarkdownReport } from "../src/utils/archive.js";

describe("archive 学习档案管理工具测试", () => {
  const mockState = {
    completed: {
      "2026-09-19": ["bauhaus-dessau", "wassily-chair"],
    },
    videoLinks: {
      "bauhaus-dessau": "https://www.youtube.com/watch?v=123",
    },
    notes: {
      "bauhaus-dessau": "观察了悬挂玻璃幕墙的非承重特性，确实打破了古典砖石建筑的封闭感。 #形式追随功能",
    },
  };

  const mockCases = [
    {
      id: "bauhaus-dessau",
      title: "包豪斯德绍校舍",
      designer: "格罗皮乌斯",
      year: 1926,
      field: "建筑",
      movement: "包豪斯",
      intro: "现代主义建筑里程碑",
      points: [{ h: "透明性", p: "玻璃幕墙消解了墙体" }],
      exercise: "寻找航拍体块",
    },
    {
      id: "wassily-chair",
      title: "瓦西里椅",
      designer: "布劳耶",
      year: 1925,
      field: "家具",
      movement: "包豪斯",
      intro: "弯管椅原点",
      points: [{ h: "钢管弯折", p: "工业机械之美" }],
      exercise: "画线条草图",
    },
  ];

  const mockThemes = [{ name: "现代主义的起点", desc: "包豪斯与风格派" }];

  it("validateArchive 正确识别合法档案并补全默认值", () => {
    const res = validateArchive({
      completed: { "2026-09-19": ["c1"] },
      notes: { c1: "心得" },
    });
    expect(res.valid).toBe(true);
    expect(res.data.videoLinks).toEqual({});
    expect(res.data.notes.c1).toBe("心得");
  });

  it("validateArchive 拦截非法输入", () => {
    expect(validateArchive(null).valid).toBe(false);
    expect(validateArchive("not a json").valid).toBe(false);
    expect(validateArchive({}).valid).toBe(false); // 缺少 completed
  });

  it("formatArchivePayload 包含版本信息与元数据", () => {
    const payload = formatArchivePayload(mockState, { streak: 5 });
    expect(payload.app).toBe("Daily Aesthetic Atelier");
    expect(payload.version).toBeDefined();
    expect(payload.exportedAt).toBeDefined();
    expect(payload.completed).toEqual(mockState.completed);
    expect(payload.notes).toEqual(mockState.notes);
  });

  it("generateMarkdownReport 能够生成包含案例要点、个人手记与导览的专刊文本", () => {
    const md = generateMarkdownReport(mockState, mockCases, mockThemes);
    expect(md).toContain("# 设计审美研习专刊");
    expect(md).toContain("包豪斯德绍校舍");
    expect(md).toContain("格罗皮乌斯");
    expect(md).toContain("📝 我的研习手记 / 批评心得");
    expect(md).toContain("悬挂玻璃幕墙的非承重特性");
    expect(md).toContain("#形式追随功能");
    expect(md).toContain("关联研习视频");
  });
});
