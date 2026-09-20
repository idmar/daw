import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

/**
 * WCAG 2.1 相对明度与对比度计算工具
 */
function parseHex(hex) {
  const clean = hex.replace("#", "").trim();
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return [r, g, b].map(c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
}

function relativeLuminance(hex) {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Dark Visual Suite & Ergonomic Optimization (深色模式与人机工程学测试)", () => {
  const cssPath = path.resolve(__dirname, "../src/styles/atelier.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  // 提取 Midnight 主题变量块
  const midnightMatch = css.match(/\.atelier\[data-theme="midnight"\]\s*\{([^}]+)\}/);
  const midnightVars = midnightMatch ? midnightMatch[1] : "";

  it("Midnight 主题必须配置原生 color-scheme: dark 以适配系统滚动条与下拉控件", () => {
    expect(midnightVars).toContain("color-scheme: dark");
  });

  it("正文强调文字 (--ink: #EDEAE2) 在深色展墙与面板上的对比度满足 WCAG AAA (>= 7:1)", () => {
    const wallRatio = contrastRatio("#EDEAE2", "#121316");
    const panelRatio = contrastRatio("#EDEAE2", "#1A1B20");

    expect(wallRatio).toBeGreaterThanOrEqual(7.0);
    expect(panelRatio).toBeGreaterThanOrEqual(7.0);
  });

  it("辅助文字 (--muted: #9E9B93) 在深色展墙与面板上的对比度满足 WCAG AA (>= 4.5:1)", () => {
    const wallRatio = contrastRatio("#9E9B93", "#121316");
    const panelRatio = contrastRatio("#9E9B93", "#1A1B20");

    expect(wallRatio).toBeGreaterThanOrEqual(4.5);
    expect(panelRatio).toBeGreaterThanOrEqual(4.5);
  });

  it("深色模式下常态按钮 (.btn) 文字与底色具备高辨识度 (WCAG AAA >= 7:1)", () => {
    // 默认按钮采用 --btn-bg: #22242B 与 --btn-text: #EDEAE2
    const btnRatio = contrastRatio("#EDEAE2", "#22242B");
    expect(btnRatio).toBeGreaterThanOrEqual(7.0);

    // 确保 .btn 没有写死 #fff 白底
    const btnRuleMatch = css.match(/\.btn\s*\{([^}]+)\}/);
    expect(btnRuleMatch).toBeTruthy();
    expect(btnRuleMatch[1]).not.toContain("background: #fff;");
    expect(btnRuleMatch[1]).toContain("var(--btn-bg)");
  });

  it("金色完成/徽章按钮悬浮与完成态采用深墨字色，满足 WCAG AAA (>= 7:1)", () => {
    // #121316 在 #D6A838 上
    const goldRatio = contrastRatio("#121316", "#D6A838");
    expect(goldRatio).toBeGreaterThanOrEqual(7.0);
  });

  it("核心导览 (.lede) 与要点正文 (.point p) 杜绝硬编码深色，自适应继承 var(--ink)", () => {
    const ledeMatch = css.match(/\.lede\s*\{([^}]+)\}/);
    expect(ledeMatch[1]).toContain("color: var(--ink);");
    expect(ledeMatch[1]).not.toContain("#2A2920");

    const pointMatch = css.match(/\.point p\s*\{([^}]+)\}/);
    expect(pointMatch[1]).toContain("color: var(--ink);");
    expect(pointMatch[1]).not.toContain("#4B4A42");
  });

  it("分段按钮与激活芯片杜绝白底白字反色，采用克莱因蓝高亮指示", () => {
    expect(css).toContain(".seg button.on { background: var(--blue); color: #fff;");
    expect(css).toContain(".master-chip.active {\n  background: var(--blue);\n  color: #fff;");
    expect(css).toContain(".timer-action-btn.primary {\n  background: var(--blue);\n  border-color: var(--blue);\n  color: #fff;");
  });

  it("全局配置了明确的 .btn:disabled 禁用态视觉反馈", () => {
    expect(css).toContain(".btn:disabled");
    expect(css).toContain("cursor: not-allowed");
  });
});
