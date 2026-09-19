import React, { useState, useEffect } from "react";
import { playChime, setAmbientSound } from "../utils/audio.js";

const PRESETS = [
  { id: "sprint", label: "15 min · 速览精读", duration: 15 * 60 },
  { id: "atelier", label: "25 min · 画室工坊", duration: 25 * 60 },
  { id: "seminar", label: "45 min · 学术研讨", duration: 45 * 60 },
];

export function FocusTimerModal({ isOpen, onClose, currentCase }) {
  const [selectedPreset, setSelectedPreset] = useState("atelier");
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [ambientSound, setAmbientSoundState] = useState(false);

  // 切换预设
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.id);
    setTotalSeconds(preset.duration);
    setRemainingSeconds(preset.duration);
    setIsRunning(false);
  };

  // 计时核心 Effect
  useEffect(() => {
    let timer = null;
    if (isRunning && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, remainingSeconds]);

  // 环境音效同步
  useEffect(() => {
    if (isRunning && ambientSound) {
      setAmbientSound(true);
    } else {
      setAmbientSound(false);
    }
    return () => {
      setAmbientSound(false);
    };
  }, [isRunning, ambientSound]);

  if (!isOpen) return null;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progressRatio = totalSeconds > 0 ? (totalSeconds - remainingSeconds) / totalSeconds : 0;
  const strokeDashoffset = 2 * Math.PI * 88 * (1 - progressRatio);

  const toggleRun = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  return (
    <div className="focus-mask" onClick={onClose} role="dialog" aria-modal="true" aria-label="画室专注研习钟">
      <div className="focus-modal" onClick={e => e.stopPropagation()}>
        <div className="focus-head">
          <div className="focus-badge">ATELIER IMMERSION · 画室专注</div>
          <button className="focus-close-btn" onClick={onClose} aria-label="收起专注钟">✕</button>
        </div>

        {currentCase && (
          <div className="focus-current-case">
            <span className="case-focus-label">正在研习经典</span>
            <span className="case-focus-title">{currentCase.title}</span>
            <span className="case-focus-designer">（{currentCase.designer} · {currentCase.year}）</span>
          </div>
        )}

        {/* 预设时长选择器 */}
        <div className="preset-selector" role="group" aria-label="研习时长预设">
          {PRESETS.map(p => (
            <button
              key={p.id}
              type="button"
              className={`preset-btn ${selectedPreset === p.id ? "active" : ""}`}
              onClick={() => handleSelectPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* 圆形呼吸光环计时器 */}
        <div className={`focus-clock-wrap ${isRunning ? "breathing" : ""}`}>
          <svg className="clock-svg" viewBox="0 0 200 200">
            {/* 底环 */}
            <circle cx="100" cy="100" r="88" className="clock-track" />
            {/* 进度环 */}
            <circle
              cx="100"
              cy="100"
              r="88"
              className="clock-progress"
              style={{
                strokeDasharray: 2 * Math.PI * 88,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="clock-inner">
            <div className="clock-digits">{timeFormatted}</div>
            <div className="clock-status">
              {remainingSeconds === 0
                ? "🎉 研习达成"
                : isRunning
                ? "深度研习中 · 保持专注"
                : "就绪待启"}
            </div>
          </div>
        </div>

        {/* 控制按钮组 */}
        <div className="focus-controls">
          <button
            type="button"
            className={`timer-action-btn primary ${isRunning ? "pause" : "start"}`}
            onClick={toggleRun}
          >
            {isRunning ? "⏸️ 暂停研习" : remainingSeconds === 0 ? "🔄 再次研习" : "▶️ 开始专注"}
          </button>
          <button
            type="button"
            className="timer-action-btn secondary"
            onClick={resetTimer}
            title="重置计时"
          >
            重设
          </button>
        </div>

        {/* 画室微弱环境音开关 */}
        <div className="focus-footer-options">
          <label className="ambient-toggle">
            <input
              type="checkbox"
              checked={ambientSound}
              onChange={e => setAmbientSoundState(e.target.checked)}
            />
            <span>🍃 画室纸笔白噪音（保持心流）</span>
          </label>
        </div>
      </div>
    </div>
  );
}
