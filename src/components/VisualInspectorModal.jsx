import React, { useState } from "react";
import { getVisual } from "../data/visuals.jsx";

/**
 * 几何研究解剖图交互检视镜模态框
 */
export function VisualInspectorModal({ c, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [showOptics, setShowOptics] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  if (!c) return null;

  const handleZoomIn = () => setZoom(z => Math.min(2.5, +(z + 0.25).toFixed(2)));
  const handleZoomOut = () => setZoom(z => Math.max(0.6, +(z - 0.25).toFixed(2)));
  const handleReset = () => setZoom(1);

  return (
    <div className="inspector-mask" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${c.title} 几何构图检视镜`}>
      <div className="inspector-window" onClick={e => e.stopPropagation()}>
        {/* 顶栏控制区 */}
        <div className="inspector-head">
          <div className="inspector-meta">
            <span className="eyebrow">Geometry Inspector · 构图解剖镜</span>
            <h3>{c.title}</h3>
            <span className="sub">{c.designer} · {c.year} · {c.movement}</span>
          </div>

          <div className="inspector-actions">
            {/* 图层开关 */}
            <div className="layer-toggles" role="group" aria-label="图层显隐">
              <button
                type="button"
                className={`layer-btn ${showGrid ? "on" : ""}`}
                onClick={() => setShowGrid(!showGrid)}
                title="切换辅助网格与几何骨架"
              >
                📐 骨架网格
              </button>
              <button
                type="button"
                className={`layer-btn ${showOptics ? "on" : ""}`}
                onClick={() => setShowOptics(!showOptics)}
                title="切换光学修正红线与补偿圆"
              >
                🔴 光学修正
              </button>
              <button
                type="button"
                className={`layer-btn ${showLabels ? "on" : ""}`}
                onClick={() => setShowLabels(!showLabels)}
                title="切换学术标注与年份文字"
              >
                🔤 比例注记
              </button>
            </div>

            {/* 缩放控制 */}
            <div className="zoom-controls">
              <button className="zoom-btn" onClick={handleZoomOut} title="缩小 (-)">−</button>
              <button className="zoom-btn text" onClick={handleReset} title="复位 100%">{Math.round(zoom * 100)}%</button>
              <button className="zoom-btn" onClick={handleZoomIn} title="放大 (+)">+</button>
            </div>

            <button className="inspector-close" onClick={onClose} aria-label="关闭检视镜">✕</button>
          </div>
        </div>

        {/* 交互视口 */}
        <div className={`inspector-canvas ${!showGrid ? "hide-grid" : ""} ${!showOptics ? "hide-optics" : ""} ${!showLabels ? "hide-labels" : ""}`}>
          <div
            className="inspector-art-wrap"
            style={{
              transform: `scale(${zoom})`,
              transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {getVisual(c)}
          </div>
        </div>

        {/* 底栏说明 */}
        <div className="inspector-foot">
          <div className="hint-tip">
            💡 <b>观察提示</b>：{c.exercise}
          </div>
          <div className="zoom-hint">
            使用上方图层开关可拆解观察大师的设计几何法则；支持放大至 250% 细察笔形与构件交界。
          </div>
        </div>
      </div>
    </div>
  );
}
