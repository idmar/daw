import React from "react";

export const SHORTCUTS = [
  { key: "1 – 6", desc: "快速切换展厅页签（今日、馆藏、编年、闪卡、徽章、足迹）" },
  { key: "T", desc: "循环切换展厅光照主题（日光展厅 / 深色夜场 / 纸本档案）" },
  { key: "F", desc: "快速呼出画室沉浸研习钟（Atelier Focus Timer）" },
  { key: "M", desc: "快速查阅现代设计大师学术档案与设计哲学辞典" },
  { key: "C", desc: "打开双件经典并置策展台（Curatorial Juxtaposition）" },
  { key: "?", desc: "打开 / 关闭本键盘快捷操作指南" },
  { key: "Esc", desc: "快速关闭当前所有弹窗与检视镜" },
];

export function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="shortcuts-mask" onClick={onClose} role="dialog" aria-modal="true" aria-label="键盘研学快捷键指南">
      <div className="shortcuts-modal" onClick={e => e.stopPropagation()}>
        <div className="shortcuts-head">
          <div className="shortcuts-eyebrow">KEYBOARD WORKFLOW · 键盘研习工作流</div>
          <button className="shortcuts-close" onClick={onClose} aria-label="关闭快捷键指南">✕</button>
        </div>

        <div className="shortcuts-body">
          <h3 className="shortcuts-title">沉浸式无干扰键盘研学</h3>
          <p className="shortcuts-sub">专为设计学学者与研究生打造的高效键盘工作流指南：</p>

          <div className="shortcuts-list">
            {SHORTCUTS.map((s, i) => (
              <div key={i} className="shortcut-item">
                <kbd className="key-cap">{s.key}</kbd>
                <span className="key-desc">{s.desc}</span>
              </div>
            ))}
          </div>

          <div className="shortcuts-tip">
            💡 提示：在任何输入框或研习手记编辑状态下，单字符快捷键会自动休眠，避免冲突干扰打字。
          </div>
        </div>
      </div>
    </div>
  );
}
