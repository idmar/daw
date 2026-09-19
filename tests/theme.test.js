import { describe, it, expect, beforeEach, vi } from "vitest";
import { THEMES, getInitialTheme, saveTheme } from "../src/utils/theme.js";

// Node 环境下的轻量 mock localStorage
const createMockLocalStorage = () => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, val) => {
      store[key] = String(val);
    },
    removeItem: key => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

describe("THEMES 美术馆光照主题管理测试", () => {
  beforeEach(() => {
    globalThis.localStorage = createMockLocalStorage();
    globalThis.window = {
      localStorage: globalThis.localStorage,
      matchMedia: vi.fn().mockReturnValue({ matches: false }),
    };
  });

  it("包含 3 套精心设计的美术馆主题", () => {
    expect(THEMES.length).toBe(3);
    const ids = THEMES.map(t => t.id);
    expect(ids).toContain("daylight");
    expect(ids).toContain("midnight");
    expect(ids).toContain("sepia");
  });

  it("默认返回 daylight 主题当无存储或系统暗色时", () => {
    expect(getInitialTheme()).toBe("daylight");
  });

  it("当 localStorage 有保存的主题时优先返回保存的主题", () => {
    localStorage.setItem("daw:theme", "midnight");
    expect(getInitialTheme()).toBe("midnight");

    localStorage.setItem("daw:theme", "sepia");
    expect(getInitialTheme()).toBe("sepia");
  });

  it("当系统处于深色模式且无自定义存储时自动命中 midnight", () => {
    window.matchMedia = vi.fn().mockImplementation(q => ({
      matches: q.includes("dark"),
    }));
    expect(getInitialTheme()).toBe("midnight");
  });

  it("saveTheme 正确写入 localStorage", () => {
    saveTheme("midnight");
    expect(localStorage.getItem("daw:theme")).toBe("midnight");
  });
});
