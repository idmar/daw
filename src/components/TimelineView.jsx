import React, { useState, useMemo } from "react";
import { EPOCHS, groupCasesByEpoch } from "../utils/chronology.js";
import { getVisual } from "../data/visuals.jsx";

export function TimelineView({ cases, onSelectCase, onInspect, onStartTimer }) {
  const [activeEpochId, setActiveEpochId] = useState("all");

  const grouped = useMemo(() => groupCasesByEpoch(cases), [cases]);

  const displayedGroups = useMemo(() => {
    if (activeEpochId === "all") return grouped.filter(g => g.cases.length > 0);
    return grouped.filter(g => g.id === activeEpochId);
  }, [grouped, activeEpochId]);

  const scrollToEpoch = (id) => {
    setActiveEpochId(id);
    if (id !== "all") {
      const el = document.getElementById(`epoch-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="timeline-view">
      {/* 编年轴顶栏概览 */}
      <div className="timeline-header">
        <div className="timeline-titles">
          <div className="eyebrow">CHRONOLOGY · 现代设计百年编年轴</div>
          <h2>时空演进与里程碑谱系</h2>
          <p className="timeline-intro">
            从 16 世纪人文主义字体源流、工艺美术反思，到包豪斯、乌尔姆、瑞士网格与数字时代极简主义。
            以编年序列洞察「形式追随功能」与材料革命的世纪演进。
          </p>
        </div>

        {/* 年代纪元快速导航 Chips */}
        <div className="epoch-nav" role="tablist" aria-label="年代纪元导航">
          <button
            type="button"
            className={`epoch-chip ${activeEpochId === "all" ? "active" : ""}`}
            onClick={() => setActiveEpochId("all")}
          >
            全部世纪全景 ({cases.length})
          </button>
          {grouped.map(g => (
            <button
              key={g.id}
              type="button"
              className={`epoch-chip ${activeEpochId === g.id ? "active" : ""} ${g.cases.length === 0 ? "empty" : ""}`}
              onClick={() => scrollToEpoch(g.id)}
              disabled={g.cases.length === 0}
            >
              {g.label} ({g.cases.length})
            </button>
          ))}
        </div>
      </div>

      {/* 编年主轴线 */}
      <div className="timeline-stream">
        {displayedGroups.map((group) => (
          <section key={group.id} id={`epoch-${group.id}`} className="epoch-section">
            <div className="epoch-pillar">
              <div className="epoch-marker">
                <span className="epoch-dot" />
                <span className="epoch-year-badge">{group.label}</span>
              </div>
              <div className="epoch-meta">
                <h3 className="epoch-title">{group.sub}</h3>
                <p className="epoch-milestone">
                  <b>历史里程碑：</b>{group.milestone}
                </p>
              </div>
            </div>

            {/* 该年代的案例展品网格 */}
            <div className="epoch-cases-grid">
              {group.cases.map(c => (
                <article key={c.id} className="timeline-case-card">
                  <div
                    className="timeline-card-visual"
                    onClick={() => onSelectCase && onSelectCase(c)}
                    title={`点击查看 ${c.title} 完整展签`}
                  >
                    {getVisual(c)}
                    <span className="timeline-card-year">{c.year}</span>
                  </div>

                  <div className="timeline-card-body">
                    <div className="timeline-card-meta">
                      <span className="card-mov">{c.movement}</span>
                    </div>
                    <h4
                      className="timeline-card-title"
                      onClick={() => onSelectCase && onSelectCase(c)}
                    >
                      {c.title}
                    </h4>
                    <div className="timeline-card-designer">{c.designer}</div>

                    <div className="timeline-card-actions">
                      <button
                        type="button"
                        className="timeline-action-btn"
                        onClick={() => onInspect && onInspect(c)}
                        title="在检视镜中拆解此作构图"
                      >
                        🔍 解剖
                      </button>
                      <button
                        type="button"
                        className="timeline-action-btn"
                        onClick={() => onStartTimer && onStartTimer(c)}
                        title="开启画室专注钟研习此作"
                      >
                        ⏱️ 研习
                      </button>
                      <button
                        type="button"
                        className="timeline-action-btn view-btn"
                        onClick={() => onSelectCase && onSelectCase(c)}
                        title="查看完整学术展签"
                      >
                        展签 ➔
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
