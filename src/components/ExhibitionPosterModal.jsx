import React, { useState, useMemo } from "react";
import { AESTHETIC_QUOTES, generateAPAReference, generateBibTeX, generatePosterSvgMarkup } from "../utils/poster.js";
import { downloadFile } from "../utils/archive.js";
import { getVisual } from "../data/visuals.jsx";

export function ExhibitionPosterModal({ c, savedNote, onClose }) {
  const [selectedQuote, setSelectedQuote] = useState(AESTHETIC_QUOTES[0]);
  const [copyStatus, setCopyStatus] = useState("");

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const svgContent = useMemo(() => {
    if (!c) return "";
    return generatePosterSvgMarkup({
      c,
      quote: selectedQuote,
      note: savedNote,
      dateStr: todayStr,
    });
  }, [c, selectedQuote, savedNote, todayStr]);

  if (!c) return null;

  const handleDownloadSvg = () => {
    downloadFile(svgContent, `${c.id}-exhibition-poster.svg`, "image/svg+xml;charset=utf-8");
  };

  const handleCopyAPA = () => {
    const text = generateAPAReference(c);
    navigator.clipboard?.writeText(text);
    setCopyStatus("APA 文献引用已复制到剪贴板！");
    setTimeout(() => setCopyStatus(""), 2400);
  };

  const handleCopyBibTeX = () => {
    const text = generateBibTeX(c);
    navigator.clipboard?.writeText(text);
    setCopyStatus("BibTeX 条目已复制到剪贴板！");
    setTimeout(() => setCopyStatus(""), 2400);
  };

  return (
    <div className="poster-mask" onClick={onClose} role="dialog" aria-modal="true" aria-label="学术展签海报生成器">
      <div className="poster-modal" onClick={e => e.stopPropagation()}>
        <div className="poster-head">
          <div className="poster-meta">
            <span className="eyebrow">GALLERY POSTER &amp; CITATION · 学术展签海报</span>
            <h3>{c.title} · 收藏级海报与文献引文</h3>
          </div>
          <button className="poster-close-btn" onClick={onClose} aria-label="关闭海报生成器">✕</button>
        </div>

        <div className="poster-layout">
          {/* 左侧：画廊装裱纸本质感海报预览 */}
          <div className="poster-preview-col">
            <div className="poster-frame">
              <div className="poster-canvas">
                <div className="poster-header-line">
                  <span className="p-brand">DAILY AESTHETIC ATELIER</span>
                  <span className="p-date">{todayStr}</span>
                </div>

                <div className="poster-visual-box">
                  {getVisual(c)}
                  <span className="poster-art-year">{c.year}</span>
                </div>

                <div className="poster-caption-box">
                  <div className="p-eyebrow">NO. {c.id.toUpperCase()}</div>
                  <h2 className="p-title">{c.title}</h2>
                  <div className="p-designer">{c.designer} · {c.year} · {c.movement}</div>
                </div>

                <div className="poster-quote-banner">
                  <span className="quote-icon">“</span>
                  <p>{selectedQuote}</p>
                </div>

                <div className="poster-note-box">
                  <div className="p-note-label">研学手记摘录</div>
                  <p className="p-note-content">{savedNote || c.intro}</p>
                </div>

                <div className="poster-footer-seal">
                  <span>FACULTY OF ART &amp; DESIGN</span>
                  <span>OFFICIAL CURATED PLATE ✦</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：控制与引文导出 */}
          <div className="poster-tools-col">
            {/* 格言选择器 */}
            <div className="tool-section">
              <h4 className="tool-title">选配经典审美格言</h4>
              <div className="quote-list">
                {AESTHETIC_QUOTES.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`quote-option-btn ${selectedQuote === q ? "active" : ""}`}
                    onClick={() => setSelectedQuote(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* 导出操作区 */}
            <div className="tool-section">
              <h4 className="tool-title">下载与分享</h4>
              <button
                type="button"
                className="btn primary full-width"
                onClick={handleDownloadSvg}
              >
                📥 下载高分辨率矢量海报 (SVG)
              </button>
              <span className="tool-hint">SVG 矢量文件支持无损无限放大印刷与 Illustrator / Figma 编辑。</span>
            </div>

            {/* 学术引文导出 */}
            <div className="tool-section">
              <h4 className="tool-title">学术文献引用格式</h4>
              <div className="citation-btn-group">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={handleCopyAPA}
                >
                  📋 复制 APA 引用
                </button>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={handleCopyBibTeX}
                >
                  📋 复制 BibTeX 条目
                </button>
              </div>
              {copyStatus && (
                <div className="copy-status-tip" role="status">
                  ✓ {copyStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
