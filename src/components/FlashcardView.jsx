import React, { useState, useMemo } from "react";
import { getVisual } from "../data/visuals.jsx";
import { DISCIPLINES, getCaseDiscipline } from "../utils/taxonomy.js";

/**
 * 经典审美术语与作品速记闪卡抽认组件
 */
export function FlashcardView({ cases = [], learnedIds = new Set() }) {
  const [filterDiscipline, setFilterDiscipline] = useState("all");
  const [onlyLearned, setOnlyLearned] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState(new Set());
  const [reviewIds, setReviewIds] = useState(new Set());

  const deck = useMemo(() => {
    return cases.filter(c => {
      if (onlyLearned && !learnedIds.has(c.id)) return false;
      if (filterDiscipline !== "all") {
        const d = getCaseDiscipline(c);
        if (d.id !== filterDiscipline) return false;
      }
      return true;
    });
  }, [cases, onlyLearned, learnedIds, filterDiscipline]);

  const currentCard = deck[currentIndex] || cases[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (deck.length > 0) {
      setCurrentIndex(prev => (prev + 1) % deck.length);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (deck.length > 0) {
      setCurrentIndex(prev => (prev - 1 + deck.length) % deck.length);
    }
  };

  const markMastered = id => {
    setMasteredIds(prev => new Set([...prev, id]));
    setReviewIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    handleNext();
  };

  const markNeedReview = id => {
    setReviewIds(prev => new Set([...prev, id]));
    setMasteredIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    handleNext();
  };

  if (!currentCard || deck.length === 0) {
    return (
      <section className="view">
        <div className="hall-head">
          <div>
            <div className="eyebrow">Flashcards · 经典闪卡</div>
            <h2>审美术语与作品速记闪卡</h2>
            <p>基于主动回忆（Active Recall）法则，遮挡标题与结论，强化对经典作品形态、年份与设计法则的记忆。</p>
          </div>
        </div>
        <div className="empty">当前筛选条件下暂无可用闪卡。请尝试取消「仅已研习」限制或选择全部学科。</div>
      </section>
    );
  }

  const discipline = getCaseDiscipline(currentCard);

  return (
    <section className="view" key="flashcards">
      <div className="hall-head">
        <div>
          <div className="eyebrow">Flashcards · 审美术语速记</div>
          <h2>经典审美术语与作品闪卡</h2>
          <p>基于主动回忆（Active Recall）法则，遮挡标题与结论，强化对经典作品形态、年份与设计法则的记忆。</p>
        </div>
        <div className="ring-box">
          <div className="ring-label">
            <div className="n">
              {masteredIds.size}
              <span style={{ fontSize: 14, color: "var(--muted)" }}> / {deck.length}</span>
            </div>
            <div className="t">本轮已掌握</div>
          </div>
        </div>
      </div>

      {/* 控制栏 */}
      <div className="flashcard-controls">
        <div className="seg">
          <button className={!onlyLearned ? "on" : ""} onClick={() => { setOnlyLearned(false); setCurrentIndex(0); }}>
            全部馆藏 ({cases.length})
          </button>
          <button className={onlyLearned ? "on" : ""} onClick={() => { setOnlyLearned(true); setCurrentIndex(0); }}>
            仅已研习 ({learnedIds.size})
          </button>
        </div>

        <select
          value={filterDiscipline}
          onChange={e => { setFilterDiscipline(e.target.value); setCurrentIndex(0); }}
          aria-label="按学科筛选闪卡"
        >
          {DISCIPLINES.map(d => (
            <option key={d.id} value={d.id}>
              {d.icon} {d.name}
            </option>
          ))}
        </select>

        <span className="deck-counter">
          第 <b>{currentIndex + 1}</b> / {deck.length} 张
        </span>
      </div>

      {/* 3D 翻转卡片容器 */}
      <div className={`card-scene ${isFlipped ? "flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="card-face front">
          <div className="card-badge-row">
            <span className="card-pill">{discipline.icon} {discipline.name}</span>
            <span className="card-year">{currentCard.year} 年 · {currentCard.movement}</span>
          </div>

          <div className="card-visual-box">
            {getVisual(currentCard)}
          </div>

          <div className="card-prompt">
            <span className="q-label">主动回忆提问：</span>
            <p>这件作品的名称是什么？是由哪位设计师打造？它在设计史上确立了哪条核心原则？</p>
          </div>

          <div className="card-hint">
            <span>↻ 点击任意位置翻转看解析</span>
          </div>
        </div>

        <div className="card-face back">
          <div className="card-badge-row">
            <span className="card-pill ok">答案与解析</span>
            <span className="card-year">{currentCard.year} · {currentCard.movement}</span>
          </div>

          <div className="card-answer-head">
            <h3>{currentCard.title}</h3>
            <div className="designer-tag">{currentCard.designer}</div>
          </div>

          <p className="card-intro">{currentCard.intro}</p>

          <div className="card-points">
            {currentCard.points.slice(0, 3).map((pt, i) => (
              <div className="card-point-item" key={i}>
                <b>{pt.h}</b>：{pt.p}
              </div>
            ))}
          </div>

          <div className="card-rating-bar" onClick={e => e.stopPropagation()}>
            <button className="btn danger" onClick={() => markNeedReview(currentCard.id)}>
              ✕ 还不熟 · 待重温
            </button>
            <button className="btn primary" onClick={() => markMastered(currentCard.id)}>
              ✓ 已掌握 · 下一张
            </button>
          </div>
        </div>
      </div>

      {/* 底部前后切换按钮 */}
      <div className="flashcard-nav">
        <button className="btn" onClick={handlePrev} disabled={deck.length <= 1}>
          ← 上一张
        </button>
        <button className="btn gold" onClick={() => setIsFlipped(!isFlipped)}>
          {isFlipped ? "翻回正面 ↺" : "翻转看解析 ↻"}
        </button>
        <button className="btn" onClick={handleNext} disabled={deck.length <= 1}>
          下一张 →
        </button>
      </div>
    </section>
  );
}
