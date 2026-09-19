import React, { useState } from "react";
import { MASTERS } from "../data/masters.js";
import { CASES } from "../data/cases.js";

export function MasterBioModal({ initialMasterId, master, onClose, onSelectCase }) {
  const [currentId, setCurrentId] = useState(() => {
    if (master && master.id) return master.id;
    if (initialMasterId) return initialMasterId;
    return MASTERS[0].id;
  });

  const activeMaster = MASTERS.find(m => m.id === currentId) || master || MASTERS[0];

  // 查找馆藏中此大师的相关案例
  const relatedCases = CASES.filter(c => {
    const text = `${c.designer || ""} ${c.title || ""} ${c.intro || ""}`.toLowerCase();
    return activeMaster.caseKeywords.some(kw => text.includes(kw.toLowerCase()));
  });

  return (
    <div className="bio-mask" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${activeMaster.nameZh} 大师档案`}>
      <div className="bio-modal" onClick={e => e.stopPropagation()}>
        {/* 顶栏控制 */}
        <div className="bio-head">
          <div className="bio-eyebrow">DESIGN MASTER ARCHIVE · 大师学术档案</div>
          <button className="bio-close-btn" onClick={onClose} aria-label="关闭大师档案">✕</button>
        </div>

        {/* 快捷大师切换 Chip 列 */}
        <div className="master-chips-scroll" role="tablist" aria-label="大师列表">
          {MASTERS.map(m => (
            <button
              key={m.id}
              type="button"
              className={`master-chip ${m.id === activeMaster.id ? "active" : ""}`}
              onClick={() => setCurrentId(m.id)}
            >
              {m.nameZh}
            </button>
          ))}
        </div>

        {/* 主体传记展签 */}
        <div className="bio-body">
          <div className="bio-dossier-header">
            <div className="bio-identity">
              <h2>{activeMaster.nameZh}</h2>
              <span className="bio-en">{activeMaster.nameEn}</span>
              <div className="bio-tags">
                <span className="bio-tag yr">{activeMaster.years}</span>
                <span className="bio-tag geo">{activeMaster.country}</span>
                <span className="bio-tag mov">{activeMaster.movement}</span>
              </div>
            </div>
            <div className="bio-roles">
              {activeMaster.roles.map((r, i) => (
                <span key={i} className="bio-role-pill">{r}</span>
              ))}
            </div>
          </div>

          {/* 经典名言引用 */}
          <div className="bio-quote-card">
            <span className="quote-mark">“</span>
            <p className="quote-text">{activeMaster.quote}</p>
          </div>

          {/* 生平与学术贡献 */}
          <div className="bio-section">
            <h4 className="bio-sec-title">生平与设计哲学</h4>
            <p className="bio-text">{activeMaster.bio}</p>
          </div>

          {/* 馆藏相关作品 */}
          <div className="bio-section">
            <h4 className="bio-sec-title">
              馆藏收录作品
              <span className="bio-case-count">（{relatedCases.length} 件）</span>
            </h4>
            {relatedCases.length === 0 ? (
              <p className="bio-empty-works">暂未直接收录该大师单件，请在思潮专题中探索。</p>
            ) : (
              <div className="bio-works-grid">
                {relatedCases.map(c => (
                  <div
                    key={c.id}
                    className="bio-work-card"
                    onClick={() => {
                      if (onSelectCase) {
                        onSelectCase(c);
                        onClose();
                      }
                    }}
                    title="点击在展厅中定位研习此案例"
                  >
                    <div className="work-card-top">
                      <span className="work-yr">{c.year}</span>
                      <span className="work-mov">{c.movement}</span>
                    </div>
                    <div className="work-title">{c.title}</div>
                    <div className="work-arrow">查看展签 ➔</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
