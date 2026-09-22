import { describe, it, expect } from "vitest";
import { SHORTCUTS } from "../src/components/ShortcutsModal.jsx";

describe("Keyboard Shortcuts & A11y 键盘快捷操作与无障碍测试", () => {
  it("所有配置的键盘快捷键均具备键位和功能描述", () => {
    expect(SHORTCUTS.length).toBeGreaterThanOrEqual(6);
    SHORTCUTS.forEach(s => {
      expect(s.key).toBeTruthy();
      expect(s.desc).toBeTruthy();
    });
  });

  it("快捷键列表完整覆盖核心工作流（切换Tab、主题轮换、专注钟、大师辞典、并置对比、Esc）", () => {
    const keys = SHORTCUTS.map(s => s.key);
    expect(keys).toContain("1 – 6");
    expect(keys).toContain("T");
    expect(keys).toContain("F");
    expect(keys).toContain("M");
    expect(keys).toContain("C");
    expect(keys).toContain("?");
    expect(keys).toContain("Esc");
  });

  it("键盘快捷键处理函数对 metaKey / ctrlKey / altKey 组合键做了过滤拦截，避免与复制 (Cmd+C) 等原生功能冲突", async () => {
    const fs = await import("fs");
    const code = fs.readFileSync(new URL("../src/DesignAestheticsWorkbench.jsx", import.meta.url), "utf-8");
    expect(code).toContain("if (e.metaKey || e.ctrlKey || e.altKey) return;");
  });
});
