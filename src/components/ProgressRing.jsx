import React from "react";

/**
 * 环形研习进度指示器
 */
export function ProgressRing({ done, total }) {
  const R = 30;
  const C = 2 * Math.PI * R;
  const seg = C / total;
  const gap = 5;

  return (
    <svg width="76" height="76" viewBox="0 0 76 76" role="img" aria-label={`今日进度 ${done}/${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <circle
          key={i}
          className={`ring-seg ${i < done ? "on" : ""}`}
          cx="38"
          cy="38"
          r={R}
          fill="none"
          stroke={i < done ? "var(--blue)" : "var(--line)"}
          strokeWidth="7"
          strokeDasharray={`${seg - gap} ${C - seg + gap}`}
          strokeDashoffset={-i * seg + C / 4}
          strokeLinecap="butt"
          style={{ transitionDelay: `${i * 40}ms` }}
        />
      ))}
      {done >= total && (
        <circle
          className="ring-sweep"
          cx="38"
          cy="38"
          r={R}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="7"
          strokeDasharray={C}
          strokeDashoffset={C}
          transform="rotate(-90 38 38)"
          strokeLinecap="butt"
        />
      )}
      <text
        key={done}
        className="ring-num"
        x="38"
        y="43"
        textAnchor="middle"
        fontFamily="Archivo,sans-serif"
        fontWeight="700"
        fontSize="15"
        fill="var(--ink)"
      >
        {done}/{total}
      </text>
    </svg>
  );
}
