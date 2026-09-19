import React, { useState, useMemo } from "react";
import { CURATED_DUOS } from "../data/comparisons.js";
import { CASES } from "../data/cases.js";
import { getVisual } from "../data/visuals.jsx";

export function ComparativeCuratorialModal({ initialCase, onClose, onInspect, onStartTimer }) {
  const [selectedDuoId, setSelectedDuoId] = useState(() => {
    if (initialCase) {
      const match = CURATED_DUOS.find(d => d.caseAId === initialCase.id || d.caseBId === initialCase.id);
      if (match) return match.id;
    }
    return CURATED_DUOS[0].id;
  });

  const [customAId, setCustomAId] = useState(() => {
    if (initialCase) return initialCase.id;
    return CURATED_DUOS[0].caseAId;
  });

  const [customBId, setCustomBId] = useState(() => {
    if (initialCase) {
      const match = CURATED_DUOS.find(d => d.caseAId === initialCase.id || d.caseBId === initialCase.id);
      if (match) return match.caseAId === initialCase.id ? match.caseBId : match.caseAId;
      return CASES.find(c => c.id !== initialCase.id)?.id || CASES[1].id;
    }
    return CURATED_DUOS[0].caseBId;
  });

  // 当前激活的双件
  const activeDuo = CURATED_DUOS.find(d => d.id === selectedDuoId);

  const caseA = useMemo(() => {
    const id = activeDuo ? activeDuo.caseAId : customAId;
    return CASES.find(c => c.id === id) || CASES[0];
  }, [activeDuo, customAId]);

  const caseB = useMemo(() => {
    const id = activeDuo ? activeDuo.caseBId : customBId;
    return CASES.find(c => c.id === id) || CASES[1];
  }, [activeDuo, customBId]);

  // 匹配分析维度
  const currentAnalysis = useMemo(() => {
    if (activeDuo) return activeDuo.analysis;
    const duoMatch = CURATED_DUOS.find(d => 
      (d.caseAId === caseA.id && d.caseBId === caseB.id) ||
      (d.caseAId === caseB.id && d.caseBId === caseA.id)
    );
    return duoMatch ? duoMatch.analysis : null;
  }, [activeDuo, caseA, caseB]);

  const handleSelectDuo = (duo) => {
    setSelectedDuoId(duo.id);
    setCustomAId(duo.caseAId);
    setCustomBId(duo.caseBId);
  };

  const handleCustomMode = () => {
    setSelectedDuoId("custom");
  };

  return (
    <div className="compare-mask" onClick={onClose} role="dialog" aria-modal="true" aria-label="双件经典并置策展台">
      <div className="compare-modal" onClick={e => e.stopPropagation()}>
        {/* 顶部策展标题 */}
        <div className="compare-head">
          <div className="compare-meta">
            <span className="eyebrow">CURATORIAL JUXTAPOSITION · 并置策展台</span>
            <h3>双件经典横向比较研讨</h3>
          </div>
          <button className="compare-close-btn" onClick={onClose} aria-label="关闭策展台">✕</button>
        </div>

        {/* 预设策展学术组与自定义模式切换 */}
        <div className="compare-presets-bar">
          {CURATED_DUOS.map(d => (
            <button
              key={d.id}
              type="button"
              className={`compare-preset-btn ${selectedDuoId === d.id ? "active" : ""}`}
              onClick={() => handleSelectDuo(d)}
            >
              ⚖️ {d.title}
            </button>
          ))}
          <button
            type="button"
            className={`compare-preset-btn custom-chip ${selectedDuoId === "custom" ? "active" : ""}`}
            onClick={handleCustomMode}
          >
            🧩 自由组合对比
          </button>
        </div>

        <div className="compare-body">
          {/* 并置展示双栏 */}
          <div className="compare-split">
            {/* 左侧案例 A */}
            <div className="compare-card">
              <div className="compare-selector-row">
                <span className="card-side-label">展件 A</span>
                <select
                  value={caseA.id}
                  onChange={e => {
                    setCustomAId(e.target.value);
                    setSelectedDuoId("custom");
                  }}
                  className="compare-select"
                >
                  {CASES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.year} · {c.title}（{c.designer}）
                    </option>
                  ))}
                </select>
              </div>

              <div className="compare-art-frame">
                {getVisual(caseA)}
              </div>

              <div className="compare-info">
                <div className="compare-tags">
                  <span className="pill">{caseA.year}</span>
                  <span className="pill">{caseA.movement}</span>
                  <span className="pill">{caseA.field}</span>
                </div>
                <h4>{caseA.title}</h4>
                <div className="compare-designer">{caseA.designer}</div>
                <p className="compare-intro">{caseA.intro}</p>

                <div className="compare-card-actions">
                  <button
                    type="button"
                    className="btn small"
                    onClick={() => onInspect && onInspect(caseA)}
                  >
                    🔍 构图解剖
                  </button>
                  <button
                    type="button"
                    className="btn small primary"
                    onClick={() => onStartTimer && onStartTimer(caseA)}
                  >
                    ⏱️ 专注研习
                  </button>
                </div>
              </div>
            </div>

            {/* 中间对比徽标 */}
            <div className="compare-vs-badge" aria-hidden="true">
              <span>VS</span>
            </div>

            {/* 右侧案例 B */}
            <div className="compare-card">
              <div className="compare-selector-row">
                <span className="card-side-label">展件 B</span>
                <select
                  value={caseB.id}
                  onChange={e => {
                    setCustomBId(e.target.value);
                    setSelectedDuoId("custom");
                  }}
                  className="compare-select"
                >
                  {CASES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.year} · {c.title}（{c.designer}）
                    </option>
                  ))}
                </select>
              </div>

              <div className="compare-art-frame">
                {getVisual(caseB)}
              </div>

              <div className="compare-info">
                <div className="compare-tags">
                  <span className="pill">{caseB.year}</span>
                  <span className="pill">{caseB.movement}</span>
                  <span className="pill">{caseB.field}</span>
                </div>
                <h4>{caseB.title}</h4>
                <div className="compare-designer">{caseB.designer}</div>
                <p className="compare-intro">{caseB.intro}</p>

                <div className="compare-card-actions">
                  <button
                    type="button"
                    className="btn small"
                    onClick={() => onInspect && onInspect(caseB)}
                  >
                    🔍 构图解剖
                  </button>
                  <button
                    type="button"
                    className="btn small primary"
                    onClick={() => onStartTimer && onStartTimer(caseB)}
                  >
                    ⏱️ 专注研习
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 学术横向拆解多维分析表 */}
          {currentAnalysis ? (
            <div className="compare-analysis-table">
              <div className="analysis-table-head">
                <span className="sec-eyebrow">ACADEMIC MATRIX · 多维学术对照矩阵</span>
                <h4>{activeDuo?.theme || "深度对立统一分析"}</h4>
              </div>
              <div className="analysis-rows">
                {currentAnalysis.map((item, idx) => (
                  <div key={idx} className="analysis-row">
                    <div className="analysis-dim">{item.dim}</div>
                    <div className="analysis-col left">{item.left}</div>
                    <div className="analysis-col right">{item.right}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="compare-custom-note">
              💡 <b>自由并置观察提示</b>：
              观察两件作品在 <b>形式语言</b>、<b>材料诚实性</b>、<b>结构受力</b> 与 <b>时代语境</b> 上的异同。
              优秀的对比研究常能发现跨越半个世纪的设计DNA传承。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
