import { useState, useEffect, useMemo, useCallback } from "react";

/* ============================================================
   设计审美启蒙工作台 · Aesthetic Atelier
   为设计学硕士新生打造的每日经典案例学习台
   视觉方向：美术馆展签(museum wall label)语言 + 克莱因蓝策展线
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;900&family=Noto+Sans+SC:wght@400;500;700&family=Archivo:wght@500;600;700&display=swap');

:root{
  --wall:#F2F1EC;        /* 展墙灰白 */
  --panel:#FFFFFF;
  --ink:#17160F;
  --muted:#77746A;
  --line:#E1DFD6;
  --blue:#002FA7;        /* 克莱因蓝 · 策展线 */
  --blue-soft:#E8EDFB;
  --gold:#9A7B2E;        /* 徽章金 */
  --gold-soft:#F6EFDD;
  --shadow:0 1px 2px rgba(23,22,15,.05), 0 10px 30px -18px rgba(23,22,15,.25);
}
*{box-sizing:border-box;margin:0;padding:0}
.atelier{
  min-height:100vh;background:var(--wall);color:var(--ink);
  font-family:'Noto Sans SC',-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;
  font-size:15px;line-height:1.75;
  -webkit-font-smoothing:antialiased;
}
.wrap{max-width:1040px;margin:0 auto;padding:0 20px 96px}

/* ---------- 顶栏 ---------- */
.masthead{
  display:flex;align-items:flex-end;justify-content:space-between;gap:16px;
  padding:28px 0 20px;border-bottom:2px solid var(--ink);
}
.brand .eyebrow{margin-bottom:6px}
.brand h1{
  font-family:'Noto Serif SC',serif;font-weight:900;font-size:clamp(26px,4.5vw,40px);
  line-height:1.15;letter-spacing:.02em;
}
.brand h1 em{font-style:normal;color:var(--blue)}
.eyebrow{
  font-family:'Archivo',sans-serif;font-size:11px;font-weight:600;
  letter-spacing:.22em;text-transform:uppercase;color:var(--muted);
}
.masthead-meta{text-align:right;flex-shrink:0}
.masthead-meta .date{font-family:'Archivo',sans-serif;font-weight:600;font-size:13px;letter-spacing:.08em}
.masthead-meta .streak{font-size:12px;color:var(--muted);margin-top:2px}
.masthead-meta .streak b{color:var(--blue);font-weight:700}

/* ---------- 页签 ---------- */
.tabs{display:flex;gap:4px;margin:22px 0 26px;border-bottom:1px solid var(--line)}
.tab{
  appearance:none;border:none;background:none;cursor:pointer;
  font-family:'Noto Sans SC',sans-serif;font-size:14px;font-weight:500;color:var(--muted);
  padding:10px 14px;border-bottom:3px solid transparent;margin-bottom:-1px;
  transition:color .15s;
}
.tab:hover{color:var(--ink)}
.tab.on{color:var(--ink);font-weight:700;border-bottom-color:var(--blue)}
.tab:focus-visible{outline:2px solid var(--blue);outline-offset:2px;border-radius:2px}

/* ---------- 今日展厅头部 ---------- */
.hall-head{
  display:flex;gap:28px;align-items:center;justify-content:space-between;
  background:var(--panel);border:1px solid var(--line);border-left:6px solid var(--blue);
  padding:22px 26px;box-shadow:var(--shadow);margin-bottom:26px;flex-wrap:wrap;
}
.hall-head h2{font-family:'Noto Serif SC',serif;font-weight:900;font-size:clamp(19px,3vw,25px);margin:4px 0 6px}
.hall-head p{color:var(--muted);font-size:13.5px;max-width:520px}
.ring-box{display:flex;align-items:center;gap:14px;flex-shrink:0}
.ring-label{text-align:right}
.ring-label .n{font-family:'Archivo',sans-serif;font-weight:700;font-size:22px;line-height:1}
.ring-label .t{font-size:12px;color:var(--muted)}

/* 闭馆横幅 */
.closed-banner{
  display:flex;align-items:center;gap:12px;
  background:var(--gold-soft);border:1px solid #E4D5AE;color:#6E5716;
  padding:14px 18px;margin-bottom:26px;font-size:14px;
  animation:rise .5s ease both;
}
.closed-banner b{font-weight:700}
@keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.closed-banner{animation:none}}

/* ---------- 案例卡（展签） ---------- */
.case-list{display:flex;flex-direction:column;gap:14px}
.case{
  background:var(--panel);border:1px solid var(--line);box-shadow:var(--shadow);
  transition:border-color .15s;
}
.case.done{border-left:6px solid var(--gold)}
.case.open{border-left:6px solid var(--blue)}
.case-row{
  width:100%;display:flex;align-items:center;gap:16px;padding:16px 20px;
  background:none;border:none;cursor:pointer;text-align:left;
  font-family:inherit;color:inherit;
}
.case-row:focus-visible{outline:2px solid var(--blue);outline-offset:-2px}
.thumb{
  width:64px;height:64px;flex-shrink:0;border:1px solid var(--line);background:#fff;
  display:flex;align-items:center;justify-content:center;overflow:hidden;
}
.thumb svg{width:100%;height:100%;display:block}
.case-row .info{flex:1;min-width:0}
.case-row .info .meta{
  font-family:'Archivo',sans-serif;font-size:10.5px;font-weight:600;
  letter-spacing:.18em;text-transform:uppercase;color:var(--muted);
}
.case-row .info h3{
  font-family:'Noto Serif SC',serif;font-weight:900;font-size:17px;line-height:1.35;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.case-row .info .sub{font-size:12.5px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.status{flex-shrink:0;display:flex;align-items:center;gap:8px}
.pill{
  font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:99px;letter-spacing:.05em;
}
.pill.todo{background:var(--blue-soft);color:var(--blue)}
.pill.ok{background:var(--gold-soft);color:var(--gold)}
.chev{color:var(--muted);font-size:12px;transition:transform .2s}
.case.open .chev{transform:rotate(180deg)}
@media (prefers-reduced-motion:reduce){.chev{transition:none}}

/* 展开正文 */
.case-body{border-top:1px solid var(--line);padding:26px 26px 30px}
.artwork{
  background:var(--wall);border:1px solid var(--line);padding:clamp(18px,4vw,44px);
  display:flex;justify-content:center;margin-bottom:8px;
}
.artwork svg{width:100%;max-width:560px;height:auto;display:block;background:#fff;border:1px solid var(--line)}
.artwork-note{font-size:11.5px;color:var(--muted);text-align:center;margin-bottom:24px}
.artwork-note a{color:var(--blue)}

.sec-title{
  display:flex;align-items:baseline;gap:10px;margin:26px 0 14px;
  font-family:'Noto Serif SC',serif;font-weight:900;font-size:16px;
}
.sec-title .idx{font-family:'Archivo',sans-serif;font-size:11px;font-weight:700;letter-spacing:.2em;color:var(--blue)}

.points{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media (max-width:720px){.points{grid-template-columns:1fr}}
.point{background:var(--wall);border:1px solid var(--line);padding:16px 18px}
.point h4{font-size:14px;font-weight:700;margin-bottom:6px}
.point h4::before{content:'';display:inline-block;width:10px;height:10px;background:var(--blue);margin-right:8px;vertical-align:baseline}
.point p{font-size:13.5px;color:#4B4A42}

.exercise{
  background:var(--blue-soft);border:1px solid #C9D5F2;padding:16px 18px;margin-top:14px;font-size:13.5px;
}
.exercise b{color:var(--blue)}

/* 视频区 */
.video-box{background:var(--wall);border:1px solid var(--line);padding:18px}
.video-outline{list-style:none;margin-bottom:14px}
.video-outline li{
  font-size:13.5px;color:#4B4A42;padding:6px 0 6px 18px;position:relative;border-bottom:1px dashed var(--line);
}
.video-outline li:last-child{border-bottom:none}
.video-outline li::before{content:'▸';position:absolute;left:0;color:var(--blue)}
.video-actions{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}
.btn{
  appearance:none;cursor:pointer;font-family:'Noto Sans SC',sans-serif;font-size:13px;font-weight:700;
  padding:9px 16px;border:1.5px solid var(--ink);background:#fff;color:var(--ink);
  text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:background .15s,color .15s;
}
.btn:hover{background:var(--ink);color:#fff}
.btn:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.btn.primary{background:var(--blue);border-color:var(--blue);color:#fff}
.btn.primary:hover{background:#00227C;border-color:#00227C}
.btn.primary:disabled{background:var(--gold);border-color:var(--gold);cursor:default}
.link-row{display:flex;gap:8px;flex-wrap:wrap}
.link-row input{
  flex:1;min-width:220px;font-family:inherit;font-size:13px;padding:9px 12px;
  border:1px solid var(--line);background:#fff;color:var(--ink);
}
.link-row input:focus{outline:2px solid var(--blue);outline-offset:-1px}
.video-frame{margin-top:14px;position:relative;padding-top:56.25%;background:#000}
.video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.saved-link{margin-top:10px;font-size:13px}
.saved-link a{color:var(--blue);word-break:break-all}

.finish-bar{margin-top:26px;display:flex;justify-content:flex-end;gap:10px}
.btn.reset{color:var(--muted);border-style:dashed}
.btn.reset:hover{color:#A0341F;border-color:#A0341F;background:#FBF1EE}
.reset-confirm{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end;
  background:#FBF1EE;border:1px solid #E4C3B8;padding:8px 12px;border-radius:2px}
.reset-confirm .note{font-size:12.5px;color:#A0341F;max-width:420px}
.btn.danger{color:#fff;background:#A0341F;border-color:#A0341F}
.btn.danger:hover{background:#8A2B18}

/* ---------- 徽章 ---------- */
.badges{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
.badge{
  background:var(--panel);border:1px solid var(--line);padding:22px 20px;text-align:center;
  box-shadow:var(--shadow);
}
.badge.locked{opacity:.45;filter:grayscale(1)}
.badge .medal{
  width:64px;height:64px;margin:0 auto 12px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  background:var(--gold-soft);border:2px solid var(--gold);font-size:26px;
}
.badge.blue .medal{background:var(--blue-soft);border-color:var(--blue)}
.badge h3{font-family:'Noto Serif SC',serif;font-weight:900;font-size:16px;margin-bottom:4px}
.badge p{font-size:12.5px;color:var(--muted)}
.badge .got{margin-top:8px;font-size:11px;font-family:'Archivo',sans-serif;font-weight:700;letter-spacing:.15em;color:var(--gold)}

/* ---------- 足迹 ---------- */
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:26px}
@media (max-width:640px){.stats-row{grid-template-columns:1fr}}
.stat{background:var(--panel);border:1px solid var(--line);padding:18px 20px;box-shadow:var(--shadow)}
.stat .n{font-family:'Archivo',sans-serif;font-weight:700;font-size:30px;color:var(--blue);line-height:1.1}
.stat .t{font-size:12.5px;color:var(--muted);margin-top:4px}
.history{display:flex;flex-direction:column}
.day-item{
  display:flex;gap:16px;padding:16px 4px;border-bottom:1px solid var(--line);align-items:flex-start;
}
.day-item .d{
  font-family:'Archivo',sans-serif;font-weight:600;font-size:12.5px;letter-spacing:.06em;
  width:110px;flex-shrink:0;padding-top:2px;
}
.day-item .cells{display:flex;gap:5px;flex-shrink:0;padding-top:4px;align-items:center}
.cell-extra{font-family:Archivo,sans-serif;font-size:11px;font-weight:700;color:var(--gold);margin-left:2px}
.encore{border-top:1px dashed var(--line);margin-top:8px}
.more-btn{display:block;margin:18px auto 4px;padding:10px 22px}
.cell{width:14px;height:14px;border:1px solid var(--line);background:#fff}
.cell.f{background:var(--blue);border-color:var(--blue)}
.day-item .names{font-size:12.5px;color:var(--muted);flex:1;min-width:0}
.theme-link{display:block;background:none;border:none;padding:2px 0 0;cursor:pointer;
  font-family:'Noto Serif SC',serif;font-weight:900;font-size:13px;color:var(--blue);text-align:left}
.theme-link:hover{text-decoration:underline}
.name-link{background:none;border:none;padding:0;cursor:pointer;font-size:12.5px;color:var(--muted);
  text-decoration:underline dotted;text-underline-offset:3px}
.name-link:hover{color:var(--blue);text-decoration:underline solid}
.back-btn{margin-bottom:18px}
.day-item .full-tag{font-size:11px;font-weight:700;color:var(--gold);flex-shrink:0;padding-top:3px}
.empty{
  text-align:center;color:var(--muted);padding:56px 20px;border:1px dashed var(--line);background:var(--panel);
  font-size:14px;
}

/* ---------- 页脚 ---------- */
.foot{margin-top:56px;padding-top:18px;border-top:2px solid var(--ink);
  display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;
  font-size:11.5px;color:var(--muted)}

@media (max-width:640px){
  .masthead{flex-direction:column;align-items:flex-start;gap:8px}
  .masthead-meta{text-align:left}
  .hall-head{flex-direction:column;align-items:flex-start}
  .ring-box{align-self:stretch;justify-content:space-between;flex-direction:row-reverse}
  .ring-label{text-align:left}
  .case-row{padding:14px}
  .case-body{padding:18px 16px 24px}
  .case-row .info h3{white-space:normal}
  .status .pill{display:none}
}
`;

/* ============================================================
   经典案例库 · 15 例，按 3 个主题日循环推送（每日 5 例）
   作品图为几何示意研究图（原创致敬构成）；正式部署时
   可替换为馆藏级高清图片链接。
   ============================================================ */

const P = { blue: "#002FA7", red: "#D0361F", yellow: "#E8B50C", ink: "#17160F", gray: "#C9C7BE" };

const VISUALS = {
  bauhaus: (
    <svg viewBox="0 0 320 220" role="img" aria-label="包豪斯校舍构成示意">
      <rect width="320" height="220" fill="#fff" />
      <rect x="30" y="60" width="180" height="110" fill="#F4F3EE" stroke={P.ink} strokeWidth="2" />
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={42 + i*20} y="72" width="14" height="86" fill="#DCE4F5" stroke={P.ink} strokeWidth="1" />
      ))}
      <rect x="196" y="90" width="94" height="80" fill={P.ink} />
      <text x="204" y="150" fill="#fff" fontFamily="Archivo,sans-serif" fontSize="15" fontWeight="700" letterSpacing="2" transform="rotate(-90 204 150)">BAUHAUS</text>
      <rect x="30" y="170" width="260" height="6" fill={P.red} />
    </svg>
  ),
  wassily: (
    <svg viewBox="0 0 320 220" role="img" aria-label="瓦西里椅钢管结构示意">
      <rect width="320" height="220" fill="#fff" />
      <path d="M70 180 L70 90 Q70 60 100 60 L230 60" fill="none" stroke={P.gray} strokeWidth="8" strokeLinecap="round" />
      <path d="M100 180 L240 180 Q262 180 262 158 L262 100" fill="none" stroke={P.gray} strokeWidth="8" strokeLinecap="round" />
      <line x1="90" y1="80" x2="235" y2="120" stroke={P.ink} strokeWidth="26" />
      <line x1="110" y1="150" x2="250" y2="150" stroke={P.ink} strokeWidth="22" />
    </svg>
  ),
  rietveld: (
    <svg viewBox="0 0 320 220" role="img" aria-label="红蓝椅构成示意">
      <rect width="320" height="220" fill="#fff" />
      <rect x="96" y="34" width="34" height="120" fill={P.red} transform="rotate(18 113 94)" />
      <rect x="120" y="128" width="110" height="26" fill={P.blue} transform="rotate(-6 175 141)" />
      <line x1="70" y1="60" x2="70" y2="190" stroke={P.ink} strokeWidth="9" />
      <line x1="250" y1="90" x2="250" y2="190" stroke={P.ink} strokeWidth="9" />
      <line x1="46" y1="120" x2="274" y2="120" stroke={P.ink} strokeWidth="9" />
      <rect x="62" y="52" width="16" height="10" fill={P.yellow} />
      <rect x="242" y="82" width="16" height="10" fill={P.yellow} />
    </svg>
  ),
  barcelona: (
    <svg viewBox="0 0 320 220" role="img" aria-label="巴塞罗那馆水平构成示意">
      <rect width="320" height="220" fill="#fff" />
      <rect x="24" y="58" width="272" height="12" fill={P.ink} />
      <rect x="24" y="168" width="272" height="10" fill={P.ink} />
      <rect x="60" y="80" width="90" height="80" fill="#E8E2D2" stroke={P.ink} strokeWidth="1.5" />
      <rect x="170" y="80" width="60" height="80" fill="#CFD8E8" stroke={P.ink} strokeWidth="1.5" />
      {[110, 200, 258].map((x,i) => <line key={i} x1={x} y1="70" x2={x} y2="168" stroke="#9AA3AE" strokeWidth="4" />)}
    </svg>
  ),
  universal: (
    <svg viewBox="0 0 320 220" role="img" aria-label="几何无衬线小写字母示意">
      <rect width="320" height="220" fill="#fff" />
      <circle cx="140" cy="130" r="52" fill="none" stroke={P.ink} strokeWidth="22" />
      <line x1="192" y1="66" x2="192" y2="182" stroke={P.ink} strokeWidth="22" strokeLinecap="butt" />
      <rect x="36" y="36" width="60" height="8" fill={P.red} />
      <text x="36" y="30" fontFamily="Archivo,sans-serif" fontSize="12" fontWeight="700" letterSpacing="3" fill={P.ink}>abcdefg</text>
    </svg>
  ),
  sk4: (
    <svg viewBox="0 0 320 220" role="img" aria-label="Braun SK4 白色机身示意">
      <rect width="320" height="220" fill="#fff" />
      <rect x="48" y="70" width="224" height="96" rx="4" fill="#FBFBF8" stroke={P.ink} strokeWidth="2" />
      <rect x="48" y="58" width="224" height="14" rx="3" fill="#DFE6F0" stroke={P.ink} strokeWidth="1.5" />
      <circle cx="120" cy="118" r="30" fill="none" stroke={P.ink} strokeWidth="2" />
      <circle cx="120" cy="118" r="4" fill={P.ink} />
      {[200, 222, 244].map((x,i) => <circle key={i} cx={x} cy="100" r="6" fill="none" stroke={P.ink} strokeWidth="2" />)}
      <line x1="190" y1="128" x2="256" y2="128" stroke={P.ink} strokeWidth="2" />
      <line x1="190" y1="142" x2="256" y2="142" stroke={P.ink} strokeWidth="2" />
    </svg>
  ),
  beethoven: (
    <svg viewBox="0 0 320 220" role="img" aria-label="同心圆弧节奏构成示意">
      <rect width="320" height="220" fill="#fff" />
      <g transform="translate(160 230)">
        {[38, 58, 84, 118, 160].map((r, i) => (
          <path key={i} d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`} fill="none" stroke={P.ink} strokeWidth={7 + i * 5} transform={`rotate(${-14 * i})`} />
        ))}
      </g>
      <text x="28" y="40" fontFamily="Archivo,sans-serif" fontSize="13" fontWeight="700" letterSpacing="4" fill={P.ink}>BEETHOVEN</text>
    </svg>
  ),
  helvetica: (
    <svg viewBox="0 0 320 220" role="img" aria-label="中性无衬线字体示意">
      <rect width="320" height="220" fill="#fff" />
      <text x="50%" y="150" textAnchor="middle" fontFamily="Helvetica,Arial,sans-serif" fontSize="120" fontWeight="700" fill={P.ink}>Aa</text>
      <rect x="34" y="176" width="252" height="4" fill={P.red} />
      <text x="34" y="46" fontFamily="Helvetica,Arial,sans-serif" fontSize="12" letterSpacing="6" fill={P.ink}>NEUE HAAS GROTESK</text>
    </svg>
  ),
  tubemap: (
    <svg viewBox="0 0 320 220" role="img" aria-label="伦敦地铁图拓扑线路示意">
      <rect width="320" height="220" fill="#fff" />
      <path d="M30 160 L110 160 L170 100 L290 100" fill="none" stroke={P.red} strokeWidth="8" />
      <path d="M30 70 L130 70 L190 130 L290 130" fill="none" stroke={P.blue} strokeWidth="8" />
      <path d="M60 200 L150 110 L150 30" fill="none" stroke={P.yellow} strokeWidth="8" />
      {[[110,160],[150,120],[170,100],[130,70],[190,130]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="#fff" stroke={P.ink} strokeWidth="3" />
      ))}
    </svg>
  ),
  panton: (
    <svg viewBox="0 0 320 220" role="img" aria-label="潘顿椅单体S曲线示意">
      <rect width="320" height="220" fill="#fff" />
      <path d="M120 34 Q188 40 182 92 Q176 132 140 140 Q104 148 108 172 Q110 190 210 190 L210 200 Q84 202 88 168 Q92 138 132 126 Q166 114 164 88 Q162 56 114 52 Z" fill={P.red} />
      <line x1="60" y1="200" x2="260" y2="200" stroke={P.ink} strokeWidth="2" />
    </svg>
  ),
  tokyo: (
    <svg viewBox="0 0 320 220" role="img" aria-label="1964东京奥运标志构成示意">
      <rect width="320" height="220" fill="#fff" />
      <circle cx="160" cy="86" r="52" fill={P.red} />
      <rect x="88" y="150" width="144" height="26" fill={P.yellow} />
      <text x="160" y="169" textAnchor="middle" fontFamily="Archivo,sans-serif" fontSize="15" fontWeight="700" letterSpacing="4" fill={P.ink}>TOKYO 1964</text>
    </svg>
  ),
  horizon: (
    <svg viewBox="0 0 320 220" role="img" aria-label="地平线海报留白示意">
      <rect width="320" height="220" fill="#fff" />
      <rect x="0" y="0" width="320" height="150" fill="#EAF0F6" />
      <rect x="0" y="150" width="320" height="70" fill="#E4DECB" />
      <line x1="0" y1="150" x2="320" y2="150" stroke="#B9B29B" strokeWidth="1.5" />
      <circle cx="160" cy="146" r="4" fill={P.ink} />
    </svg>
  ),
  iphone: (
    <svg viewBox="0 0 320 220" role="img" aria-label="初代iPhone极简形态示意">
      <rect width="320" height="220" fill="#fff" />
      <rect x="122" y="20" width="76" height="180" rx="14" fill="#1B1B1B" />
      <rect x="130" y="44" width="60" height="118" fill="#3D6FD4" />
      <circle cx="160" cy="180" r="9" fill="none" stroke="#777" strokeWidth="2" />
      <line x1="148" y1="32" x2="172" y2="32" stroke="#555" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  iny: (
    <svg viewBox="0 0 320 220" role="img" aria-label="城市徽标字符与心形组合示意">
      <rect width="320" height="220" fill="#fff" />
      <text x="96" y="112" fontFamily="Georgia,serif" fontSize="86" fontWeight="700" fill={P.ink}>I</text>
      <path d="M196 60 c-12-14-36-8-36 10 c0 16 20 26 36 40 c16-14 36-24 36-40 c0-18-24-24-36-10z" fill={P.red} />
      <text x="76" y="196" fontFamily="Georgia,serif" fontSize="80" fontWeight="700" letterSpacing="6" fill={P.ink}>NY</text>
    </svg>
  ),
  butterfly: (
    <svg viewBox="0 0 320 220" role="img" aria-label="蝴蝶凳双翼曲面示意">
      <rect width="320" height="220" fill="#fff" />
      <path d="M158 60 Q116 66 96 120 Q82 158 66 186 L96 186 Q126 158 152 138 L158 130 Z" fill="#8A5A2B" />
      <path d="M162 60 Q204 66 224 120 Q238 158 254 186 L224 186 Q194 158 168 138 L162 130 Z" fill="#A9743D" />
      <line x1="120" y1="150" x2="200" y2="150" stroke={P.ink} strokeWidth="3" />
    </svg>
  ),
};

/* ---- 生成式示意研究图：无手绘 visual 的案例按类别参数化生成 ---- */
const hashOf = str => { let h = 7; for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
const GEN_INK = ["#002FA7", "#D0361F", "#E8B50C", "#17160F", "#0E7A6C", "#7A6BB5"];
const pick = (h, arr, salt = 0) => arr[(h + salt) % arr.length];

const genVisual = c => {
  const h = hashOf(c.id);
  const A = pick(h, GEN_INK), B = pick(h, GEN_INK, 2), ink = "#17160F", paper = "#EDEBE3";
  const el = [];
  const cat = c.cat || "poster";
  if (cat === "type") {
    const ch = (c.title.match(/[A-Za-z]/) || ["A"])[0].toUpperCase();
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill={paper} />);
    el.push(<text key="g" x="76" y="112" fontFamily="Georgia,serif" fontWeight="900" fontSize="110" fill={ink}>{ch}</text>);
    el.push(<text key="g2" x="128" y="112" fontFamily="Archivo,sans-serif" fontWeight="700" fontSize="72" fill={A}>{ch.toLowerCase()}</text>);
    el.push(<line key="l1" x1="20" y1="112" x2="180" y2="112" stroke={ink} strokeWidth="1.5" />);
    el.push(<line key="l2" x1="20" y1="42" x2="180" y2="42" stroke={ink} strokeDasharray="3 4" strokeWidth="1" />);
  } else if (cat === "logo") {
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill={paper} />);
    el.push(<circle key="r" cx="100" cy="75" r="46" fill="none" stroke={ink} strokeWidth="2.5" />);
    if (h % 3 === 0) el.push(<circle key="m" cx="100" cy="75" r="24" fill={A} />);
    else if (h % 3 === 1) el.push(<rect key="m" x="78" y="53" width="44" height="44" fill={A} transform={`rotate(${(h % 40) - 20} 100 75)`} />);
    else el.push(<path key="m" d="M100 50 L126 98 L74 98 Z" fill={A} />);
    el.push(<circle key="d" cx={148 + (h % 12)} cy="32" r="6" fill={B} />);
  } else if (cat === "chair") {
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill={paper} />);
    el.push(<path key="s" d={`M62 ${44 + (h % 10)} Q60 92 66 96 L134 96 Q142 90 138 ${40 + (h % 12)}`} fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />);
    el.push(<line key="l1" x1="72" y1="96" x2="64" y2="132" stroke={ink} strokeWidth="4" />);
    el.push(<line key="l2" x1="128" y1="96" x2="136" y2="132" stroke={ink} strokeWidth="4" />);
    el.push(<rect key="c" x="66" y="88" width="68" height="9" fill={A} />);
    el.push(<circle key="d" cx="160" cy="40" r="8" fill={B} />);
  } else if (cat === "light") {
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill="#22211B" />);
    el.push(<circle key="g1" cx="100" cy="66" r="42" fill={B} opacity="0.16" />);
    el.push(<circle key="g2" cx="100" cy="66" r="26" fill={B} opacity="0.3" />);
    el.push(<circle key="g3" cx="100" cy="66" r="12" fill="#F6E7B2" />);
    el.push(<line key="w" x1="100" y1="0" x2="100" y2="52" stroke="#8B8878" strokeWidth="2" />);
    el.push(<rect key="t" x="40" y="122" width="120" height="4" fill="#8B8878" />);
  } else if (cat === "arch") {
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill={paper} />);
    el.push(<rect key="m" x="34" y={54 + (h % 10)} width="132" height={46 - (h % 8)} fill="#FFFFFF" stroke={ink} strokeWidth="2" />);
    for (let i = 0; i < 4; i++) el.push(<line key={"p" + i} x1={52 + i * 32} y1={100 - (h % 8)} x2={52 + i * 32} y2="126" stroke={ink} strokeWidth="3" />);
    el.push(<rect key="r" x="58" y={40 + (h % 8)} width={60 + (h % 30)} height="10" fill={A} />);
    el.push(<line key="g" x1="20" y1="126" x2="180" y2="126" stroke={ink} strokeWidth="2" />);
    el.push(<circle key="s" cx={150 + (h % 16)} cy="34" r="8" fill={B} />);
  } else if (cat === "info") {
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill={paper} />);
    const pts = Array.from({ length: 6 }, (_, i) => [26 + i * 30, 105 - ((h >> i) % 60)]);
    el.push(<polyline key="l" points={pts.map(p => p.join(",")).join(" ")} fill="none" stroke={A} strokeWidth="3" />);
    pts.forEach((p, i) => el.push(<circle key={"n" + i} cx={p[0]} cy={p[1]} r="4.5" fill={i === 3 ? B : ink} />));
    el.push(<line key="x" x1="20" y1="122" x2="180" y2="122" stroke={ink} strokeWidth="1.5" />);
    el.push(<line key="y" x1="20" y1="122" x2="20" y2="28" stroke={ink} strokeWidth="1.5" />);
  } else if (cat === "vehicle") {
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill={paper} />);
    el.push(<path key="c" d={`M30 96 Q44 ${56 + (h % 10)} 92 ${54 + (h % 8)} Q150 54 170 96 Z`} fill={A} />);
    el.push(<circle key="w1" cx="66" cy="100" r="13" fill={ink} />);
    el.push(<circle key="w2" cx="140" cy="100" r="13" fill={ink} />);
    el.push(<circle key="h1" cx="66" cy="100" r="5" fill={paper} />);
    el.push(<circle key="h2" cx="140" cy="100" r="5" fill={paper} />);
    el.push(<line key="g" x1="14" y1="113" x2="186" y2="113" stroke={ink} strokeWidth="2" />);
    el.push(<line key="s" x1="150" y1="70" x2="184" y2="60" stroke={B} strokeWidth="3" />);
  } else if (cat === "book") {
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill={paper} />);
    el.push(<rect key="p1" x="36" y="30" width="62" height="90" fill="#FFFFFF" stroke={ink} strokeWidth="2" />);
    el.push(<rect key="p2" x="102" y="30" width="62" height="90" fill="#FFFFFF" stroke={ink} strokeWidth="2" />);
    for (let i = 0; i < 5; i++) el.push(<line key={"t" + i} x1="44" y1={46 + i * 13} x2={90 - (h >> i) % 14} y2={46 + i * 13} stroke={ink} strokeWidth="2" />);
    el.push(<rect key="img" x="110" y="44" width={40 - (h % 10)} height={30 + (h % 14)} fill={A} />);
    el.push(<line key="t6" x1="110" y1="104" x2="156" y2="104" stroke={B} strokeWidth="3" />);
  } else if (cat === "fashion") {
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill={paper} />);
    for (let i = 0; i < 12; i++) el.push(<path key={"pl" + i} d={`M${34 + i * 11} 26 Q${30 + i * 11 + (h % 8)} 75 ${34 + i * 11} 124`} fill="none" stroke={i % 3 === 0 ? A : ink} strokeWidth={i % 3 === 0 ? 3 : 1.5} />);
    el.push(<circle key="d" cx="166" cy="36" r="7" fill={B} />);
  } else { /* poster / product 及其余 */
    el.push(<rect key="b" x="0" y="0" width="200" height="150" fill={cat === "poster" ? A : paper} />);
    if (cat === "poster") {
      el.push(<rect key="band" x="0" y={92 + (h % 14)} width="200" height="20" fill={paper} />);
      el.push(<circle key="c" cx={60 + (h % 70)} cy={46 + (h % 20)} r={22 + (h % 10)} fill={B} />);
      el.push(<rect key="t1" x="16" y={98 + (h % 14)} width="74" height="7" fill={ink} />);
    } else {
      el.push(<rect key="body" x="46" y="34" width="108" height="82" rx={h % 2 ? 14 : 4} fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />);
      el.push(<circle key="k" cx={78 + (h % 40)} cy="92" r="11" fill={A} />);
      for (let i = 0; i < 3; i++) el.push(<line key={"v" + i} x1={62 + i * 12} y1="48" x2={62 + i * 12} y2="64" stroke={ink} strokeWidth="2.5" />);
      el.push(<rect key="s" x="112" y="46" width="30" height="20" fill={B} />);
    }
  }
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={`${c.title} 示意研究图`} preserveAspectRatio="xMidYMid meet">
      {el}
    </svg>
  );
};
const getVisual = c => VISUALS[c.visual] || genVisual(c);

const CASES = [
  /* ---- 主题日 A · 现代主义的起点 ---- */
  {
    id: "bauhaus-dessau", day: 0, visual: "bauhaus",
    title: "包豪斯德绍校舍", designer: "沃尔特·格罗皮乌斯 Walter Gropius", year: 1926,
    field: "建筑 · 现代主义", movement: "包豪斯",
    intro: "现代主义建筑的宣言之作：玻璃幕墙、非对称体量与「形式追随功能」在此第一次被完整实践。",
    points: [
      { h: "功能决定体量", p: "教学楼、工坊、宿舍按功能拆分为不同体块，再以连桥衔接。建筑的外形不是先画出来的，而是由内部使用方式「推」出来的。" },
      { h: "玻璃幕墙的透明性", p: "工坊翼的整面悬挂玻璃幕墙在当时是激进技术，它消解了墙的封闭感，把「内部劳动」直接展示给城市——透明本身成为一种态度。" },
      { h: "去装饰的诚实材料", p: "混凝土、钢、玻璃均以本来面目出现，没有任何古典柱式或雕饰。材料的真实感取代装饰，成为新的审美来源。" },
      { h: "非对称的动态平衡", p: "从任何单一角度都无法看全建筑，必须绕行观看。体块的风车式布局制造了运动中的平衡，这是与古典对称完全不同的秩序观。" },
    ],
    exercise: "找一张校舍航拍图，用三种颜色把「教学、工坊、宿舍」体块涂出来，体会功能分区如何直接生成形体。",
    videoOutline: ["包豪斯学校的成立背景与「艺术与技术新统一」主张", "德绍校舍的功能分区与流线组织", "玻璃幕墙的构造做法与象征意义", "包豪斯对全球现代建筑教育的影响"],
    searchQuery: "包豪斯 德绍校舍 格罗皮乌斯 建筑解析",
    searchQueryEn: "Bauhaus Dessau building Walter Gropius architecture",
  },
  {
    id: "wassily-chair", day: 0, visual: "wassily",
    title: "瓦西里椅 Wassily Chair (B3)", designer: "马歇尔·布劳耶 Marcel Breuer", year: 1925,
    field: "家具 · 工业设计", movement: "包豪斯",
    intro: "第一把弯曲钢管椅。布劳耶从自行车把手获得灵感，把家具从木匠工艺带入了工业时代。",
    points: [
      { h: "新材料重构原型", p: "扶手椅的「体量感」被彻底抽空：钢管勾勒结构，皮革带面悬撑身体。坐具第一次变成了空间中的线条骨架而非实体。" },
      { h: "工业逻辑的美", p: "钢管可以机器弯折、批量生产、标准化连接。它的美不来自雕琢，而来自制造方式本身——这是包豪斯「设计为大众」理想的物证。" },
      { h: "视觉的轻与坐的稳", p: "悬浮的坐面与镜面镀铬让椅子看起来轻盈通透，但闭合的管框结构又提供了扎实的稳定性。轻与稳的张力是它百年不衰的原因。" },
    ],
    exercise: "观察身边一件木质家具，尝试用「只留结构线」的思路画一版钢管化改造草图。",
    videoOutline: ["布劳耶与自行车把手的灵感故事", "弯曲钢管工艺如何改变家具制造", "结构拆解：管框、皮带面与受力方式", "钢管家具谱系：从B3到悬臂椅"],
    searchQuery: "瓦西里椅 布劳耶 钢管家具 设计解析",
    searchQueryEn: "Wassily Chair Marcel Breuer design history",
  },
  {
    id: "red-blue-chair", day: 0, visual: "rietveld",
    title: "红蓝椅 Red and Blue Chair", designer: "格里特·里特维尔德 Gerrit Rietveld", year: 1918,
    field: "家具 · 风格派", movement: "De Stijl 风格派",
    intro: "一把「坐的蒙德里安绘画」：用最少的标准木条与三原色，宣告了一种全新的空间构成语言。",
    points: [
      { h: "三维化的新造型主义", p: "风格派主张用水平/垂直线与三原色抵达普遍的和谐。红蓝椅把这套绘画语法搬进三维：每根构件都是一段独立的「线」，在空间中交错而不融合。" },
      { h: "构件的彼此独立", p: "木条在交接处相互穿过而非咬合成整体，端头涂黄色以强调「线是无限延伸的」。家具由此变成一个开放的空间图解。" },
      { h: "颜色即结构标注", p: "红色靠背、蓝色坐面、黑色框架、黄色端头——色彩不是装饰，而是给每类构件「编码」，让结构逻辑一眼可读。" },
    ],
    exercise: "用红黄蓝黑四色便签，把你书桌上的物品按「支撑/承载/连接」重新做一次颜色编码标注。",
    videoOutline: ["风格派运动与蒙德里安的绘画理念", "红蓝椅的构件系统与节点做法", "色彩编码如何表达结构逻辑", "从红蓝椅到施罗德住宅"],
    searchQuery: "红蓝椅 里特维尔德 风格派 设计解析",
    searchQueryEn: "Red and Blue Chair Gerrit Rietveld De Stijl",
  },
  {
    id: "barcelona-pavilion", day: 0, visual: "barcelona",
    title: "巴塞罗那德国馆", designer: "密斯·凡·德·罗 Mies van der Rohe", year: 1929,
    field: "建筑 · 现代主义", movement: "现代主义",
    intro: "「少即是多」的空间原典：几片墙、一块屋顶、八根十字柱，定义了「流动空间」。",
    points: [
      { h: "流动空间", p: "墙体不再围合房间，而是像屏风一样自由布置，引导人在空间中穿行。「房间」消失了，取而代之的是连续流动的场域。" },
      { h: "结构与围护分离", p: "十字形钢柱独立承重，墙因此获得自由——它可以是玛瑙石、玻璃或水面，只负责界定与反射，不负责支撑。" },
      { h: "奢侈的极简", p: "极简不等于廉价：缟玛瑙、罗马洞石、镀铬钢柱的精确对缝，说明「少」的背后是对材料与比例近乎苛刻的控制。" },
      { h: "水平性的仪式感", p: "低矮出挑的屋面、基座抬高的平台、两片水池，共同营造出静谧的水平延展，人被引导着放慢脚步。" },
    ],
    exercise: "临摹一遍德国馆平面图，只描墙体与柱位，感受墙「不围合」时空间如何流动。",
    videoOutline: ["1929年世博会与德国馆的政治语境", "流动空间的平面组织分析", "材料细部：玛瑙墙、十字柱与对缝", "密斯的「少即是多」及其争议"],
    searchQuery: "密斯 巴塞罗那德国馆 流动空间 解析",
    searchQueryEn: "Barcelona Pavilion Mies van der Rohe analysis",
  },
  {
    id: "bayer-universal", day: 0, visual: "universal",
    title: "Universal 通用字体实验", designer: "赫伯特·拜耶 Herbert Bayer", year: 1925,
    field: "字体 · 平面设计", movement: "包豪斯",
    intro: "一套只有小写字母、完全由几何元素构成的实验字体——把「理性」推到极致的排版宣言。",
    points: [
      { h: "几何作为字形基因", p: "所有字母由圆、直线与弧线拼装而成，去除一切书写痕迹与衬线。字体第一次被当作「工业零件」来设计。" },
      { h: "废除大写的激进主张", p: "拜耶认为德语大小写并存是低效冗余，「我们说话并不分大小写」。单一小写系统是对语言排版效率的极端追问。" },
      { h: "实验的遗产", p: "Universal 从未被完整铸字商用，但它的几何思路直接滋养了 Futura 等经典无衬线字体，也奠定了包豪斯排版的视觉基调。" },
    ],
    exercise: "只用圆规和直尺，在方格纸上拼出自己名字拼音的小写字母，体会几何造字的限制与自由。",
    videoOutline: ["包豪斯排版课与新文字排印运动", "Universal 的几何构造规则", "「废除大写」争论的语言学背景", "对 Futura 与现代无衬线体的影响"],
    searchQuery: "包豪斯 拜耶 Universal 字体 几何无衬线",
    searchQueryEn: "Herbert Bayer Universal typeface Bauhaus typography",
  },

  /* ---- 主题日 B · 功能主义与瑞士平面 ---- */
  {
    id: "braun-sk4", day: 1, visual: "sk4",
    title: "Braun SK4 唱片收音机「白雪公主之棺」", designer: "迪特·拉姆斯 Dieter Rams / 汉斯·古格洛特", year: 1956,
    field: "产品 · 工业设计", movement: "功能主义",
    intro: "第一次用透明有机玻璃盖示人内部机件的家电，「好设计十原则」美学的起点。",
    points: [
      { h: "「少，却更好」", p: "机身只剩白色金属壳、木侧板与必要的旋钮，一切与功能无关的装饰被清除。克制不是贫乏，而是让使用逻辑一目了然。" },
      { h: "透明顶盖的诚实", p: "当年家电习惯藏进木柜假装家具，SK4 却用透明盖把唱盘机构大方展示——技术本身值得被观看，这一姿态影响至今。" },
      { h: "秩序化的操作面板", p: "旋钮与刻度以严格网格对齐，视觉层级与操作次序一致。用户不需要说明书，面板本身就是说明书。" },
      { h: "从SK4到苹果", p: "拉姆斯的T3收音机与iPod、SK4的界面秩序与iOS的呼应广为人知——理解SK4，就理解了当代科技产品美学的源头。" },
    ],
    exercise: "为你的手机充电器写一份「拉姆斯式改造清单」：列出可删去的元素与必须保留的元素。",
    videoOutline: ["战后德国设计与乌尔姆学院背景", "SK4 的结构拆解与材料选择", "拉姆斯「好设计十原则」逐条解读", "Braun 与 Apple 的设计谱系对照"],
    searchQuery: "迪特拉姆斯 Braun SK4 好设计十原则",
    searchQueryEn: "Dieter Rams Braun SK4 ten principles of good design",
  },
  {
    id: "beethoven-poster", day: 1, visual: "beethoven",
    title: "「贝多芬」音乐会海报", designer: "约瑟夫·穆勒-布罗克曼 Josef Müller-Brockmann", year: 1955,
    field: "海报 · 平面设计", movement: "瑞士国际主义风格",
    intro: "用一组按数学比例展开的同心弧线「翻译」音乐节奏——瑞士平面设计的巅峰之作。",
    points: [
      { h: "结构性的抽象", p: "弧线的宽度与间距按等比数列递增，旋转角度暗合乐曲的节拍强弱。图形不是在「画」音乐，而是在用几何逻辑演奏音乐。" },
      { h: "网格系统的胜利", p: "文字信息以严格网格排布于左上角，与自由旋转的弧线形成理性与动感的对位。网格给了自由以边界。" },
      { h: "黑白的最大音量", p: "全图仅黑白两色。放弃色彩后，尺度对比与疏密节奏承担全部表现力——克制反而让画面获得了轰鸣般的力量。" },
    ],
    exercise: "选一首你熟悉的曲子，只用同一种几何形的大小与间距变化，做一张A5黑白「节奏练习」。",
    videoOutline: ["瑞士国际主义风格的形成与主张", "海报中弧线的比例与角度分析", "网格系统 Grid Systems 方法论入门", "音乐可视化设计的当代延续"],
    searchQuery: "穆勒布罗克曼 贝多芬海报 瑞士平面设计 网格",
    searchQueryEn: "Josef Muller-Brockmann Beethoven poster Swiss design",
  },
  {
    id: "helvetica", day: 1, visual: "helvetica",
    title: "Helvetica 字体", designer: "马克斯·米丁格 / 爱德华·霍夫曼", year: 1957,
    field: "字体 · 平面设计", movement: "瑞士国际主义风格",
    intro: "世界上被使用最多的字体：以「中性」为最高追求，成为战后国际化视觉语言的代名词。",
    points: [
      { h: "中性作为设计立场", p: "Helvetica 力求不携带情绪与时代口音，让内容自己说话。「没有风格」本身是一种被精心设计出来的风格。" },
      { h: "高x高与紧密字距", p: "较大的x字高、闭合倾向的字怀与紧凑字距，让它在小字号下依然清晰、成段后色泽均匀——这是它统治标识系统的技术原因。" },
      { h: "从瑞士到全世界", p: "纽约地铁、无数企业标识与政府表单都采用它。它的成功提示我们：字体选择从来不只是审美，而是关于信任与效率的公共决策。" },
      { h: "赞誉与批评并存", p: "有人称它完美，有人批评它令世界同质化。围绕Helvetica的争论本身，就是一堂关于「普适」与「个性」的设计伦理课。" },
    ],
    exercise: "在今天的生活场景中拍下3处Helvetica或类似中性无衬线体的使用，判断它在每处传达了什么。",
    videoOutline: ["纪录片《Helvetica》核心观点梳理", "字形解剖：x字高、字怀与字距", "与 Univers、Arial 的对比辨析", "中性字体的当代批评与再评价"],
    searchQuery: "Helvetica 字体 纪录片 解析",
    searchQueryEn: "Helvetica documentary typeface history",
  },
  {
    id: "tube-map", day: 1, visual: "tubemap",
    title: "伦敦地铁线路图", designer: "哈里·贝克 Harry Beck", year: 1933,
    field: "信息设计", movement: "信息设计先驱",
    intro: "放弃地理真实、改用电路图逻辑的地图——信息设计史上最重要的一次「失真」。",
    points: [
      { h: "有用的失真", p: "贝克意识到乘客只关心「换乘关系」而非真实距离，于是把线路拉直为水平、垂直与45°线。牺牲地理精度，换来了认知效率。" },
      { h: "拓扑优先于几何", p: "站点间的「连接顺序」被完整保留，市中心被放大、郊区被压缩。这是「按用户任务重组信息」的最早范本。" },
      { h: "系统化的视觉语法", p: "线路配色、换乘圆圈、站名字体共同构成可扩展的规则系统。九十年来线路不断增加，这套语法依然运转自如。" },
    ],
    exercise: "把你从宿舍到工作室的日常路线画成一张「贝克式」示意图：只保留节点与转向，全部用45°与直角线。",
    videoOutline: ["1933年前地理式地铁图的困境", "电路图思维如何迁移到地图", "视觉规则系统的建立与扩展", "对全球交通图与信息设计的影响"],
    searchQuery: "伦敦地铁图 哈里贝克 信息设计",
    searchQueryEn: "Harry Beck London Underground map design",
  },
  {
    id: "panton-chair", day: 1, visual: "panton",
    title: "潘顿椅 Panton Chair", designer: "维尔纳·潘顿 Verner Panton", year: 1960,
    field: "家具 · 工业设计", movement: "波普 / 有机现代主义",
    intro: "世界上第一把一体成型的塑料悬臂椅：材料、结构与形态在一条S曲线中合而为一。",
    points: [
      { h: "一体成型的宣言", p: "无腿、无接缝、无组装——整椅由一次注塑完成。制造工艺的极限探索直接生成了前所未有的形态。" },
      { h: "悬臂结构的力学表演", p: "S形曲线既是造型也是结构：前缘下探形成支撑，腰部收束提供弹性。坐上去的微微下沉是刻意保留的力学体验。" },
      { h: "色彩与波普精神", p: "高饱和的红、橙与光泽表面呼应六十年代波普文化，宣告塑料不是廉价替代品，而是有自身尊严的新材料。" },
    ],
    exercise: "用一张A4纸不裁剪、只折弯，做一个能支撑一部手机的「悬臂支架」，体会连续曲面的结构潜能。",
    videoOutline: ["塑料材料在六十年代的技术突破", "从概念到量产历经十年的波折", "悬臂结构与曲面力学分析", "潘顿的色彩理论与空间设计"],
    searchQuery: "潘顿椅 一体成型 塑料家具 设计解析",
    searchQueryEn: "Panton Chair Verner Panton design history",
  },

  /* ---- 主题日 C · 东方美学与当代经典 ---- */
  {
    id: "tokyo-1964", day: 2, visual: "tokyo",
    title: "1964年东京奥运会标志", designer: "龟仓雄策", year: 1961,
    field: "标志 · 平面设计", movement: "日本现代设计",
    intro: "一轮红日、金色字标、五环——用最少元素完成国家形象的现代化表达，奥运视觉系统的开山之作。",
    points: [
      { h: "极简的国家叙事", p: "巨大红圆直接引用国旗「日之丸」，却通过精确的比例与上下构图获得全新的现代感。传统符号被翻译成国际语言。" },
      { h: "系统而非单件", p: "东京奥运首次建立了完整的视觉识别系统：从标志、海报到指示图标（Pictogram）风格统一。「设计一个系统」的观念由此确立。" },
      { h: "图标的世界语", p: "为跨越语言障碍，设计团队开发了整套运动项目象形图——这套方法沿用至今，成为每届奥运会的规定动作。" },
    ],
    exercise: "选一个你家乡的传统符号，尝试只用一个几何形与一种颜色，做出它的「现代化翻译」。",
    videoOutline: ["战后日本设计崛起的时代背景", "红日构图的比例与张力分析", "奥运视觉系统与象形图标的开创", "龟仓雄策与日本设计中心"],
    searchQuery: "1964东京奥运 龟仓雄策 标志设计",
    searchQueryEn: "Tokyo 1964 Olympics logo Yusaku Kamekura design",
  },
  {
    id: "muji-horizon", day: 2, visual: "horizon",
    title: "无印良品「地平线」海报", designer: "原研哉", year: 2003,
    field: "海报 · 品牌设计", movement: "日本当代设计",
    intro: "玻利维亚盐湖上一个小小的人影与无尽地平线——用「空」承载一切想象的品牌哲学之作。",
    points: [
      { h: "「空」的容器", p: "原研哉提出Emptiness：画面不传达具体信息，而是提供一个空的容器，让观者把自己的生活想象注入其中。品牌因此属于每一个人。" },
      { h: "极限的留白", p: "天与地各占一半，人物只是一个点。留白不是没有内容，而是把「尺度感」本身变成了内容——人在世界中的位置。" },
      { h: "反广告的广告", p: "没有产品、没有口号、没有促销。它拒绝喊叫，反而建立了最深的品牌记忆。这是传播策略上的一次大胆逆行。" },
      { h: "摄影即设计", p: "为找到纯粹的地平线，团队远赴玻利维亚乌尤尼盐湖与蒙古草原实拍。素材的极致纯度是留白成立的前提。" },
    ],
    exercise: "用手机在校园里拍一张「只有地平线与一个点」的照片，感受留白构图对信息的容纳力。",
    videoOutline: ["原研哉的「空」与「白」设计哲学", "无印良品品牌理念的演进", "地平线系列的拍摄幕后", "留白在东方美学中的谱系"],
    searchQuery: "原研哉 无印良品 地平线 海报 设计哲学",
    searchQueryEn: "Kenya Hara MUJI Horizon poster emptiness design",
  },
  {
    id: "iphone-2007", day: 2, visual: "iphone",
    title: "初代 iPhone", designer: "乔纳森·艾维 Jony Ive 团队", year: 2007,
    field: "产品 · 交互设计", movement: "当代科技设计",
    intro: "「一块屏幕」的赌注：删除键盘、删除手写笔，把整个界面交给玻璃与手指。",
    points: [
      { h: "删除的勇气", p: "当全行业为手机堆叠更多按键时，iPhone只保留一个Home键。「删除什么」比「增加什么」更能定义产品——这是拉姆斯精神的当代回响。" },
      { h: "硬件为软件让位", p: "硬件被压缩为一块中性的玻璃平板，真正的形态由软件界面动态定义。产品设计的重心从「物」转移到了「体验」。" },
      { h: "直接操纵的交互革命", p: "多点触控让手指直接「触摸」信息：捏合缩放、滑动惯性、橡皮筋回弹——物理世界的直觉被翻译进数字界面。" },
      { h: "细节的仪式感", p: "开箱包装、圆角半径、动画曲线都被当作产品本体来设计。「体验的完整性」自此成为行业标准。" },
    ],
    exercise: "观察你手机上任意一个App，找出三处「模拟物理世界直觉」的交互细节并记录。",
    videoOutline: ["2007发布会的历史语境与产品赌注", "从Braun到Apple的设计谱系", "多点触控交互的原理与隐喻", "初代iPhone对产品设计范式的改写"],
    searchQuery: "初代iPhone 2007 设计解析 乔纳森艾维",
    searchQueryEn: "original iPhone 2007 design Jony Ive",
  },
  {
    id: "i-love-ny", day: 2, visual: "iny",
    title: "I♥NY 城市标志", designer: "米尔顿·格拉泽 Milton Glaser", year: 1977,
    field: "标志 · 平面设计", movement: "美国平面设计",
    intro: "在出租车后座用红色蜡笔画下的草图，成为史上被复制最多的城市标识——一次「情感符号化」的奇迹。",
    points: [
      { h: "动词的力量", p: "标志不描述纽约「是什么」，而是替市民说出「我爱它」。以第一人称情感陈述做标识，在当时闻所未闻。" },
      { h: "字谜式的阅读乐趣", p: "字母I、心形符号、缩写NY构成一个小小的字谜，观者在半秒的解码中获得参与感——理解的瞬间就是记忆的瞬间。" },
      { h: "打字机字体的平民感", p: "选用圆润的American Typewriter而非精英化的现代字体，让标志带着街头与日常的温度，任何人都觉得它属于自己。" },
    ],
    exercise: "为你的校园或城市写一个「第一人称情感短语」，并只用现成字体与一个符号排出来。",
    videoOutline: ["70年代纽约财政危机与城市营销背景", "出租车草图的诞生故事", "符号替代文字的修辞学分析", "从I♥NY看城市品牌设计方法"],
    searchQuery: "I love NY 标志 格拉泽 设计故事",
    searchQueryEn: "I Love NY logo Milton Glaser design story",
  },
  {
    id: "butterfly-stool", day: 2, visual: "butterfly",
    title: "蝴蝶凳 Butterfly Stool", designer: "柳宗理", year: 1954,
    field: "家具 · 工业设计", movement: "日本现代设计",
    intro: "两片相同的弯曲胶合板对合而成——西方成型技术与东方形态感的一次完美握手。",
    points: [
      { h: "一个零件的智慧", p: "整凳只有一种曲面构件，镜像对合后以一根铜杆与两颗螺丝固定。极致的构件经济带来了极致的形态纯度。" },
      { h: "手的思考", p: "柳宗理反对先画效果图，主张直接用手在模型上反复调整曲线——「用手思考」。蝴蝶凳的曲面是手工打磨出来的工业品。" },
      { h: "东西方的合流", p: "成型胶合板技术来自伊姆斯夫妇的美国实践，而剪影令人想起鸟居与书法笔势。技术无国界，形态有乡音。" },
    ],
    exercise: "用两张相同裁剪的卡纸对合拼插，探索「单一构件×镜像」还能生成哪些稳定形态。",
    videoOutline: ["柳宗理与「用手思考」的设计方法", "成型胶合板技术的来龙去脉", "蝴蝶凳的结构与打样过程", "民艺思想对日本工业设计的影响"],
    searchQuery: "柳宗理 蝴蝶凳 设计解析",
    searchQueryEn: "Sori Yanagi Butterfly Stool design",
  },

  /* ---- 主题日 D04 · 字体的世纪 ---- */
  { id: "futura", day: 3, cat: "type", title: "Futura 字体", designer: "保罗·伦纳 Paul Renner", year: 1927,
    field: "字体 · 平面设计", movement: "德国现代主义",
    intro: "以圆、三角、方为骨架的几何无衬线体，自称「我们时代的字体」，后来随阿波罗11号登上了月球铭牌。",
    points: [
      { h: "几何理想主义", p: "字母o接近正圆、字母A是纯粹三角——伦纳相信几何是超越民族与历史的普适语言，字体因此成为现代精神的宣言。" },
      { h: "看不见的视觉修正", p: "看似纯几何，实则处处有光学补偿：圆形笔画在交接处削细、尖角略微出格。「看起来几何」比「真正几何」更重要。" },
      { h: "跨世纪的生命力", p: "从纳粹时期被冷落到成为登月铭牌与无数品牌的选择，Futura证明了理性造型可以承载完全不同的时代情绪。" },
    ],
    exercise: "用圆规直尺画出Futura的小写o与手写圆的差异，观察哪里做了「视觉欺骗」。",
    videoOutline: ["新文字排印运动与几何无衬线的兴起", "Futura的字形解剖与光学修正", "从登月铭牌到当代品牌的应用史"],
    searchQuery: "Futura 字体 几何无衬线 设计解析", searchQueryEn: "Futura typeface Paul Renner history" },
  { id: "garamond", day: 3, cat: "type", title: "Garamond 加拉蒙体", designer: "克洛德·加拉蒙 Claude Garamond", year: 1540,
    field: "字体 · 平面设计", movement: "文艺复兴人文主义",
    intro: "十六世纪巴黎刻字匠的杰作，五百年来始终是「优雅正文」的代名词，也是无数经典书籍的默认声音。",
    points: [
      { h: "书写的记忆", p: "笔画的粗细变化保留了平头笔书写的轴线与节奏，字母像被「写」出来而非「造」出来——这是人文主义衬线体的温度来源。" },
      { h: "为长文阅读而生", p: "适中的x字高、开放的字怀与舒展的字距让大段文字色泽均匀、不易疲劳。它教会我们：正文字体的美德是隐身。" },
      { h: "复刻的谱系学", p: "今天的各种Garamond其实源自不同底本的复刻与再诠释。追踪一款字体的版本史，就是在读一部微缩的印刷文化史。" },
    ],
    exercise: "同一段文字分别用Garamond类衬线体与几何无衬线排出，对比阅读时眼睛的疲劳感。",
    videoOutline: ["文艺复兴印刷与人文主义字体", "Garamond的字形特征与书写轴线", "各版本Garamond的复刻源流"],
    searchQuery: "Garamond 加拉蒙 衬线字体 历史", searchQueryEn: "Garamond typeface history classic serif" },
  { id: "baskerville", day: 3, cat: "type", title: "Baskerville 巴斯克维尔体", designer: "约翰·巴斯克维尔 John Baskerville", year: 1757,
    field: "字体 · 平面设计", movement: "过渡期衬线",
    intro: "一位漆器商人对印刷全链路的偏执改造：更黑的墨、更光的纸、更锐利的字，共同定义了「过渡期」衬线的精致。",
    points: [
      { h: "系统性的完美主义", p: "巴斯克维尔不满足于刻字，他自制油墨、热压纸张、改良印刷机——字体的锐利感来自整个生产系统的升级，而非字形本身。" },
      { h: "对比度的抬升", p: "笔画粗细对比比旧体更强、衬线更细锐、轴线趋向垂直，页面因此更「亮」。这是从人文书写迈向理性刻造的中间一步。" },
      { h: "被证明的可信感", p: "当代实验发现同一段话用Baskerville排版更容易被读者相信。字体的修辞力量由此有了量化注脚。" },
    ],
    exercise: "找同一句话的三种字体排版截图，直觉判断哪种「更可信」，再对照字形分析原因。",
    videoOutline: ["十八世纪英国印刷技术革新", "过渡期衬线的字形演变逻辑", "字体与可信度的心理学实验"],
    searchQuery: "Baskerville 字体 过渡期衬线 解析", searchQueryEn: "Baskerville typeface John Baskerville history" },
  { id: "univers", day: 3, cat: "type", title: "Univers 字体家族", designer: "阿德里安·弗鲁提格 Adrian Frutiger", year: 1957,
    field: "字体 · 平面设计", movement: "瑞士国际主义风格",
    intro: "第一个在诞生之初就规划为完整「系统」的字体家族：21个成员用两位数字编号，织成一张字重×字宽的坐标网。",
    points: [
      { h: "家族先于个体", p: "传统做法是先做正文体再补粗体斜体，Univers反其道而行：先设计整个矩阵，再填充每个格子。字体设计从造字升级为造系统。" },
      { h: "编号取代命名", p: "55是标准、65是粗体、57是窄体——数字编号消灭了Bold/Heavy/Black的语义混乱，是信息架构思维在字体上的早期实践。" },
      { h: "统一的骨架", p: "全家族共享同一套字形骨架与x字高，任意混排都严丝合缝。这为复杂版面的层级表达提供了空前的秩序保障。" },
    ],
    exercise: "画一个3×3网格，把你手机里常用的字体按「字重×字宽」填入坐标，体会系统化视角。",
    videoOutline: ["弗鲁提格的设计生涯与方法", "Univers编号系统的逻辑", "字体家族系统对现代UI字体的影响"],
    searchQuery: "Univers 字体 弗鲁提格 字体家族系统", searchQueryEn: "Univers typeface Adrian Frutiger family system" },
  { id: "didot", day: 3, cat: "type", title: "Didot 迪多体", designer: "菲尔曼·迪多 Firmin Didot", year: 1784,
    field: "字体 · 平面设计", movement: "现代衬线 Didone",
    intro: "极端的粗细对比与发丝般的衬线，让它成为「奢华」与「时尚」的字体化身，两百年后仍统治着高级时装刊头。",
    points: [
      { h: "刻造取代书写", p: "垂直轴线、纯几何的粗细切换、无弧度的发丝衬线——书写痕迹被彻底清除，字母成为雕刻般的理性构造物。" },
      { h: "尺寸即命运", p: "极细衬线在小字号下会「消失」，因此Didot天生属于大标题。理解字体，必须理解它与尺寸、纸张、工艺的绑定关系。" },
      { h: "气质的垄断", p: "当一种字形与「优雅昂贵」的联想绑定两个世纪，字体就成了品牌资产本身。选择Didot，等于借用这笔联想遗产。" },
    ],
    exercise: "把同一个品牌名分别用Didot类字体与几何无衬线排出，写下两者传达的价格与人群差异。",
    videoOutline: ["Didone现代衬线的诞生背景", "发丝衬线的工艺与尺寸限制", "时尚产业与Didot的百年绑定"],
    searchQuery: "Didot 字体 时尚 现代衬线 解析", searchQueryEn: "Didot typeface fashion Didone history" },

  /* ---- 主题日 D05 · 海报的黄金时代 ---- */
  { id: "moulin-rouge", day: 4, cat: "poster", title: "《红磨坊》石版海报", designer: "图卢兹-劳特累克 Toulouse-Lautrec", year: 1891,
    field: "海报 · 平面设计", movement: "新艺术 / 石版印刷",
    intro: "把街头广告变成艺术的第一张海报：大色块、剪影与浮世绘式构图，让巴黎人半夜撬下墙上的招贴收藏。",
    points: [
      { h: "减法的诞生", p: "为适应石版套色的限制，劳特累克把人群压成一片黑色剪影、把主角简化为几个色面。印刷限制倒逼出了现代平面语言。" },
      { h: "浮世绘的移植", p: "平涂色块、斜切构图、大胆留白与轮廓线均来自日本版画。这是设计史上最成功的一次跨文化语法借用。" },
      { h: "海报作为媒介自觉", p: "他明白海报要在街头三秒内抓住行人，因此放弃细节、放大姿态。「为观看场景设计」的意识从此觉醒。" },
    ],
    exercise: "把一张人物照片压缩成三个色块加一条轮廓线，检验它在三米外是否仍可辨认。",
    videoOutline: ["石版印刷术与海报的技术起点", "劳特累克与蒙马特的夜生活图景", "浮世绘对欧洲平面设计的影响"],
    searchQuery: "劳特累克 红磨坊海报 石版画 解析", searchQueryEn: "Toulouse Lautrec Moulin Rouge poster lithograph" },
  { id: "priester", day: 4, cat: "poster", title: "Priester 火柴海报", designer: "卢西安·伯恩哈德 Lucian Bernhard", year: 1906,
    field: "海报 · 平面设计", movement: "实物海报 Sachplakat",
    intro: "画面里只有两根火柴与一个品牌名——18岁青年在竞赛截稿前的删减，开创了「实物海报」流派。",
    points: [
      { h: "删到不能再删", p: "初稿有烟灰缸、雪茄与舞女，伯恩哈德一样样擦掉，最后只剩火柴与字。现代广告「一图一词」的公式在此定型。" },
      { h: "商品即主角", p: "不讲故事、不造场景，把商品放大为纪念碑。这种直白在充斥装饰的新艺术时代是一次美学暴动。" },
      { h: "色彩的心理挤压", p: "深棕底色上,火柴头的红与黄成为唯一亮点，视线无处可逃。用色彩层级替代构图层级，是海报的高效法门。" },
    ],
    exercise: "为你桌上任意一件物品做「实物海报」：纯色底＋物品＋一个词，不允许出现第二个元素。",
    videoOutline: ["柏林海报黄金期与Sachplakat流派", "伯恩哈德竞赛夺魁的删减过程", "实物海报对现代广告语法的奠基"],
    searchQuery: "伯恩哈德 Priester 火柴海报 实物海报", searchQueryEn: "Lucian Bernhard Priester poster Sachplakat" },
  { id: "normandie", day: 4, cat: "poster", title: "「诺曼底号」邮轮海报", designer: "卡桑德尔 A.M. Cassandre", year: 1935,
    field: "海报 · 平面设计", movement: "装饰艺术 Art Deco",
    intro: "正对船头的极端仰视，让巨轮化作一座几何纪念碑——装饰艺术时代对速度与机械的最高礼赞。",
    points: [
      { h: "视角即修辞", p: "放弃侧面全貌，选择正面仰视：船体压缩成一个巨大的黑色三角，海鸥小如尘埃。视角的选择本身就是夸张的修辞。" },
      { h: "喷绘的渐变体量", p: "喷枪制造的光影渐变赋予平面以金属体量感，机械之美第一次拥有了绘画性的表达工具。" },
      { h: "字与图的建筑关系", p: "船名以对称大字压于底部，像基座承托船体。卡桑德尔坚持「海报是字与图的建筑」，两者必须结构性咬合。" },
    ],
    exercise: "为一件日常物选择一个「最不常见的视角」拍摄，让它显得纪念碑化。",
    videoOutline: ["装饰艺术运动与机械崇拜", "卡桑德尔的海报构成方法", "字图一体的版面建筑观"],
    searchQuery: "卡桑德尔 诺曼底号 海报 装饰艺术", searchQueryEn: "Cassandre Normandie poster Art Deco" },
  { id: "vertigo-poster", day: 4, cat: "poster", title: "《迷魂记》海报与片头", designer: "索尔·巴斯 Saul Bass", year: 1958,
    field: "海报 · 动态图形", movement: "美国现代平面设计",
    intro: "一根旋涡线与坠落的人形剪影——巴斯证明：一个抽象图形足以装下整部电影的心理漩涡。",
    points: [
      { h: "概念先于描绘", p: "海报不展示明星面孔，而是把「眩晕」这一心理状态图形化。从描绘内容到提炼概念，是现代海报的关键一跃。" },
      { h: "片头作为设计领地", p: "巴斯把片头字幕做成动态图形序曲，让观众在正片前就进入影片情绪。动态图形设计（Motion Graphics）由此立业。" },
      { h: "剪影的普适力", p: "扁平人形剪影抹去个体特征，让每个观众都能代入。抽象程度与共情范围往往成正比。" },
    ],
    exercise: "为你最近看的一部电影画一个「单图形概念海报」草图：只许一个图形加片名。",
    videoOutline: ["索尔·巴斯与希区柯克的合作", "从叙事海报到概念海报的转变", "电影片头设计的开创与影响"],
    searchQuery: "索尔巴斯 迷魂记 海报 电影片头设计", searchQueryEn: "Saul Bass Vertigo poster title sequence" },
  { id: "nihon-buyo", day: 4, cat: "poster", title: "Nihon Buyo 日本舞踊海报", designer: "田中一光", year: 1981,
    field: "海报 · 平面设计", movement: "日本现代设计",
    intro: "用色块网格拼出的艺伎面容：传统能剧之美与蒙德里安式构成在一张脸上达成和解。",
    points: [
      { h: "网格里的东方脸", p: "面孔被纳入严格的方格系统，眼与唇化为几何色块。传统题材经过现代构成的「翻译」，获得了国际通行的形式语言。" },
      { h: "色彩的双重血统", p: "配色同时来自日本传统色（红殷、群青）与现代印刷色域，暧昧的中间地带正是「日本现代设计」的身份所在。" },
      { h: "少即是艳", p: "去除一切描绘性细节后，色块间的微妙比例承担全部表情。克制的形式反而放大了艳丽的感染力。" },
    ],
    exercise: "在8×8方格里只用五个色块拼出一张能被认出的「脸」，体会抽象与识别的临界点。",
    videoOutline: ["田中一光与战后日本平面设计", "传统图像的几何化翻译方法", "从琳派到网格：日本美学的现代转译"],
    searchQuery: "田中一光 日本舞踊 海报 解析", searchQueryEn: "Ikko Tanaka Nihon Buyo poster design" },

  /* ---- 主题日 D06 · 标志与品牌 ---- */
  { id: "nike-swoosh", day: 5, cat: "logo", title: "Nike Swoosh 标志", designer: "卡罗琳·戴维森 Carolyn Davidson", year: 1971,
    field: "标志 · 品牌设计", movement: "美国品牌设计",
    intro: "设计系学生以35美元交付的一道弧线，最终成为无需署名也能被全球识别的「运动」本身。",
    points: [
      { h: "动词的形状", p: "Swoosh不描绘任何实物，它是速度与掠过的抽象轨迹——胜利女神翅膀的现代速写。好标志画的是动作，不是东西。" },
      { h: "简到可以手绘", p: "任何人闭眼都能画出它。极低的复制成本意味着极高的传播效率，这是标志设计的硬指标。" },
      { h: "意义是养出来的", p: "1971年它「什么都不像」，今天它意味着运动精神——标志的意义并非设计之初注入，而是品牌用几十年行为喂养出来的。" },
    ],
    exercise: "用一笔画出「快」这个概念的三种抽象形，让同学盲测哪种最有速度感。",
    videoOutline: ["Swoosh诞生的35美元故事", "抽象标志与具象标志的效率对比", "品牌行为如何为符号注入意义"],
    searchQuery: "耐克标志 Swoosh 设计故事", searchQueryEn: "Nike Swoosh logo Carolyn Davidson story" },
  { id: "ibm-rand", day: 5, cat: "logo", title: "IBM 八线条纹标志", designer: "保罗·兰德 Paul Rand", year: 1972,
    field: "标志 · 品牌设计", movement: "美国企业识别",
    intro: "把厚重字母切成八道水平条纹——扫描线的隐喻让一家硬件公司看起来像「速度与数据」本身。",
    points: [
      { h: "条纹的双重功能", p: "条纹既暗示扫描线与动态，又在视觉上削轻了粗壮字母的呆板。装饰与减重一举两得，这是形式效率的示范。" },
      { h: "系统重于标志", p: "兰德为IBM制定了从年报到包装的完整设计规范。真正的企业识别不是一个图形，而是一套长期运转的语法。" },
      { h: "信任的几何", p: "严格的水平线、稳定的字重传达可靠与秩序——对一家卖「不能出错的机器」的公司，这比任何创意都重要。" },
    ],
    exercise: "把你名字的首字母加粗后切成条纹，比较5条、8条、12条时轻重感的变化。",
    videoOutline: ["保罗·兰德的企业识别方法论", "IBM条纹标的演变过程", "设计规范手册的意义与实践"],
    searchQuery: "保罗兰德 IBM 标志 企业识别", searchQueryEn: "Paul Rand IBM logo corporate identity" },
  { id: "apple-logo", day: 5, cat: "logo", title: "Apple 苹果标志", designer: "罗布·雅诺夫 Rob Janoff", year: 1977,
    field: "标志 · 品牌设计", movement: "科技品牌设计",
    intro: "缺一口的苹果加六色彩虹条：把冰冷的计算机变成了「友好、创造、人人可用」的许诺。",
    points: [
      { h: "那一口的功能", p: "咬掉的缺口首先是尺度标尺——防止图形被误认为樱桃。传奇故事众多，但设计师的解释朴素得多：好设计常源于解决具体问题。" },
      { h: "彩虹的策略", p: "六色条纹炫耀Apple II的彩色显示能力，同时向反主流文化致意。色彩在此是产品卖点的直接可视化。" },
      { h: "标志的减法进化", p: "从彩虹到单色再到玻璃质感又回归极简剪影，四十年的演变示范了：强壮的轮廓才是标志唯一不可变的资产。" },
    ],
    exercise: "找三个经历过多次改版的标志，描出它们「从未变过」的轮廓部分。",
    videoOutline: ["苹果标志的诞生与传说辨析", "彩虹条纹与产品策略的关系", "标志随品牌成熟的减法演变"],
    searchQuery: "苹果标志 设计演变 解析", searchQueryEn: "Apple logo Rob Janoff design evolution" },
  { id: "cbs-eye", day: 5, cat: "logo", title: "CBS 眼睛标志", designer: "威廉·戈尔登 William Golden", year: 1951,
    field: "标志 · 品牌设计", movement: "美国企业识别",
    intro: "电视时代的第一只「眼睛」：七十余年不曾改版，被誉为史上最完美的标志之一。",
    points: [
      { h: "媒介的自我指涉", p: "电视是观看的机器，标志就是一只眼睛——媒介属性与图形符号严丝合缝，无需任何解释。" },
      { h: "几何的纯度", p: "外轮廓与瞳孔均由正圆规范生成，任何尺寸下都清晰稳定。纯几何构造是标志长寿的技术保障。" },
      { h: "不改版的勇气", p: "七十年里无数品牌反复翻新标志，CBS之眼纹丝不动。当形式已经完美，克制住「更新」的冲动本身就是设计管理的智慧。" },
    ],
    exercise: "为「广播电台」设计一个同样自我指涉的图形符号，只允许使用正圆与直线。",
    videoOutline: ["电视黄金时代与CBS设计部", "眼睛标志的几何构造分析", "长寿标志的共同特质"],
    searchQuery: "CBS 眼睛标志 设计 解析", searchQueryEn: "CBS Eye logo William Golden design" },
  { id: "bank-of-china", day: 5, cat: "logo", title: "中国银行标志", designer: "靳埭强", year: 1980,
    field: "标志 · 品牌设计", movement: "华人现代设计",
    intro: "古钱方孔与「中」字的同构：一个图形同时说出「中国」与「银行」，东西方设计语法在此握手。",
    points: [
      { h: "同构的双关", p: "外圆内方是古钱，中间竖笔完成「中」字——两个语义共用一套笔画。图形同构是标志设计里最优雅的修辞。" },
      { h: "红线串钱的余韵", p: "中央竖线暗合穿钱的红绳，传统意象被压缩进最简几何。文化转译不是贴纹样，而是找到结构层面的对应。" },
      { h: "华人设计的成年礼", p: "它证明现代主义的简洁语法完全可以承载东方文化身份，为其后四十年华人品牌设计立下范式。" },
    ],
    exercise: "选一个汉字，尝试让它与一个器物剪影「共用笔画」，画出三版同构草图。",
    videoOutline: ["靳埭强与香港设计的崛起", "同构手法的图形学分析", "传统符号现代转译的方法论"],
    searchQuery: "中国银行标志 靳埭强 设计解析", searchQueryEn: "Bank of China logo Kan Tai-keung design" },

  /* ---- 主题日 D07 · 椅子的一百年 ---- */
  { id: "thonet-14", day: 6, cat: "chair", title: "托内特14号椅", designer: "米夏埃尔·托内特 Michael Thonet", year: 1859,
    field: "家具 · 工业设计", movement: "工业化先驱",
    intro: "六根曲木、十颗螺丝、两个圈：史上第一件真正意义的量产家具，一立方米木箱可装36把。",
    points: [
      { h: "蒸汽弯木的革命", p: "整根实木经蒸汽软化后弯成曲线，省去雕刻与榫卯。新工艺直接生成新形态——曲线不是画出来的，是弯出来的。" },
      { h: "拆装与物流思维", p: "拆散平板运输、目的地组装的模式早宜家一百年。设计从造型延伸到了包装与运输的全链路。" },
      { h: "亿万次的验证", p: "至今累计生产逾两亿把。咖啡馆椅的日常身份提醒我们：最伟大的设计常常隐身于最平凡的场景。" },
    ],
    exercise: "数一数你身边任意一把椅子的零件数，思考哪些还能合并或省去。",
    videoOutline: ["蒸汽弯木工艺的原理与产线", "14号椅的零件系统与物流设计", "从维也纳咖啡馆到全球的传播史"],
    searchQuery: "托内特14号椅 曲木 量产家具", searchQueryEn: "Thonet No.14 chair bentwood mass production" },
  { id: "eames-lounge", day: 6, cat: "chair", title: "伊姆斯躺椅 Eames Lounge Chair", designer: "查尔斯与蕾·伊姆斯 Charles & Ray Eames", year: 1956,
    field: "家具 · 工业设计", movement: "美国战后现代主义",
    intro: "「一只用旧了的棒球手套」——模压胶合板与皮革的组合，让现代主义第一次学会了拥抱与温柔。",
    points: [
      { h: "温暖的现代主义", p: "在钢管与硬壳盛行的年代，伊姆斯夫妇用花梨木贴面与内凹皮垫召回身体的松弛。现代不必冷峻，是他们最大的修正。" },
      { h: "三壳分离的结构", p: "头枕、靠背、坐面三片独立木壳以铝件柔性连接，随身体微微浮动。结构的分解带来了体感的连续。" },
      { h: "从战场到客厅", p: "模压胶合板技术源自他们战时为海军制作的腿部夹板。伊姆斯示范了如何把军工技术转译为日常之美。" },
    ],
    exercise: "记录你瘫在最舒服的椅子里时身体的三个接触压力点，思考它们各需何种支撑。",
    videoOutline: ["伊姆斯夫妇的跨界实践", "模压胶合板技术的战时起源", "三壳结构与人体工学分析"],
    searchQuery: "伊姆斯躺椅 设计解析", searchQueryEn: "Eames Lounge Chair design history" },
  { id: "ant-chair", day: 6, cat: "chair", title: "蚂蚁椅 Ant Chair", designer: "阿恩·雅各布森 Arne Jacobsen", year: 1952,
    field: "家具 · 工业设计", movement: "丹麦现代主义",
    intro: "一片三维弯曲的胶合板加三条细钢腿：为食堂而生的极限减重，成了丹麦设计的国民剪影。",
    points: [
      { h: "一片板的极限", p: "背与坐由同一片板一次压成，「蜂腰」收窄处正是二维弯曲转为三维的技术妥协——限制被转化为标志性轮廓。" },
      { h: "可堆叠的民主", p: "轻、可叠、廉价，为的是让好设计进入食堂与教室而非沙龙。堆叠性是公共家具的核心美德。" },
      { h: "剪影的性格", p: "收腰轮廓让椅子有了昵称与拟人性格。产品的「可命名性」是它进入大众文化的门票。" },
    ],
    exercise: "用一张卡纸只做两道弯折，尝试同时形成「坐面」与「靠背」，感受单片成型的限制。",
    videoOutline: ["雅各布森与丹麦功能主义", "三维模压胶合板的技术细节", "从蚂蚁椅到七号椅的家族演化"],
    searchQuery: "蚂蚁椅 雅各布森 设计解析", searchQueryEn: "Ant Chair Arne Jacobsen design" },
  { id: "wishbone", day: 6, cat: "chair", title: "Y椅 Wishbone Chair", designer: "汉斯·瓦格纳 Hans Wegner", year: 1949,
    field: "家具 · 工业设计", movement: "丹麦现代主义",
    intro: "从明式圈椅出发的再设计：一根蒸弯的环形扶手、一个Y形背板、一百二十米手工纸绳。",
    points: [
      { h: "对明椅的回答", p: "瓦格纳研究中国明式圈椅后做了系列再设计，Y椅是终点：保留环抱式扶手的精神，用丹麦工艺重写全部构造。" },
      { h: "Y形的一举三得", p: "背板既支撑腰部、又稳固扶手圈、还成为视觉签名。一个构件承担三重职能，是构造经济学的典范。" },
      { h: "手工与量产共生", p: "每把椅子的纸绳坐面仍需约一小时手工编织。它证明工业化产品可以为手艺保留恰当的位置。" },
    ],
    exercise: "找一张明式圈椅图片与Y椅并置，列出瓦格纳「保留了什么、替换了什么」。",
    videoOutline: ["瓦格纳与「中国椅」系列", "明式家具对丹麦设计的影响", "纸绳编织坐面的工艺过程"],
    searchQuery: "Y椅 瓦格纳 中国椅 明式", searchQueryEn: "Wishbone Chair Hans Wegner China Chair" },
  { id: "egg-chair", day: 6, cat: "chair", title: "蛋椅 Egg Chair", designer: "阿恩·雅各布森 Arne Jacobsen", year: 1958,
    field: "家具 · 工业设计", movement: "丹麦现代主义",
    intro: "为哥本哈根SAS皇家酒店整体设计而生：一枚包裹身体的「蛋」，在开放大堂里造出私密的微型房间。",
    points: [
      { h: "雕塑法造椅", p: "雅各布森先在车库里用石膏反复削磨出原型，再翻制玻璃钢壳体。这是用雕塑家的手，而非制图员的笔完成的设计。" },
      { h: "椅子即建筑", p: "高耸的环抱椅背在声学与视线上围合出半私密领域——椅子在此承担了「房间」的职能，家具与建筑的边界被打破。" },
      { h: "总体设计的样本", p: "从建筑、家具、灯具到餐具，整座酒店出自一人之手。蛋椅是理解「总体艺术」设计观的最佳入口。" },
    ],
    exercise: "在图书馆或咖啡馆观察人们如何用姿势和物品「圈出」自己的领域，做三张速写。",
    videoOutline: ["SAS皇家酒店的总体设计", "石膏原型到玻璃钢量产的过程", "家具的空间围合功能分析"],
    searchQuery: "蛋椅 雅各布森 SAS酒店 设计", searchQueryEn: "Egg Chair Arne Jacobsen SAS hotel" },

  /* ---- 主题日 D08 · 灯具与光 ---- */
  { id: "anglepoise", day: 7, cat: "light", title: "Anglepoise 1227 工作灯", designer: "乔治·卡沃丁 George Carwardine", year: 1935,
    field: "灯具 · 工业设计", movement: "英国工程设计",
    intro: "汽车悬挂工程师的副产品：用弹簧模拟人臂肌腱，灯头可停驻于任意姿态而纹丝不动。",
    points: [
      { h: "仿生的力学", p: "弹簧、杠杆与关节的配比模拟了人臂「随处可停」的恒张力平衡。工程原理直接外显为形态，无需任何装饰。" },
      { h: "可调即体贴", p: "光应当追随任务而非固定于位。「可调性」把使用者的主动权写进产品，是交互设计的机械时代雏形。" },
      { h: "诚实的骨骼美", p: "所有弹簧与铰接完全裸露，机械构造本身成为审美对象——比包裹外壳更早地实践了「诚实设计」。" },
    ],
    exercise: "观察自己台灯的调节方式，画出它的关节自由度示意图，标注哪些动作最费力。",
    videoOutline: ["恒张力弹簧机构的原理", "从车间工作灯到文化符号", "可调性设计的人因学意义"],
    searchQuery: "Anglepoise 工作灯 弹簧结构 设计", searchQueryEn: "Anglepoise 1227 lamp design history" },
  { id: "ph5", day: 7, cat: "light", title: "PH5 吊灯", designer: "保尔·汉宁森 Poul Henningsen", year: 1958,
    field: "灯具 · 工业设计", movement: "丹麦现代主义",
    intro: "多层遮光板按对数螺线排布，让人从任何角度都看不到灯泡——一盏为「无眩光」而做的科学仪器。",
    points: [
      { h: "设计光，而非灯", p: "汉宁森毕生研究的对象是光的分布曲线而非灯具造型。层层反射板把点光源驯化为柔和的面光——形态是光学计算的副产品。" },
      { h: "对数螺线的必然", p: "遮光板的位置由对数螺线严格推导，保证任意视角遮挡灯丝。当几何来自物理需求，形式便拥有了不可辩驳性。" },
      { h: "对抗眩光的伦理", p: "他称刺眼的裸灯泡是「文明的野蛮」。把舒适而非炫目当作光的伦理，至今仍是照明设计的第一课。" },
    ],
    exercise: "今晚记录你房间里三处直接可见光源的位置，思考如何用一张纸消除其中最刺眼的一处。",
    videoOutline: ["汉宁森的光学研究方法", "PH系列反射板几何推导", "眩光控制与照明舒适度标准"],
    searchQuery: "PH5 吊灯 汉宁森 无眩光设计", searchQueryEn: "PH5 lamp Poul Henningsen glare free design" },
  { id: "arco", day: 7, cat: "light", title: "Arco 弧形落地灯", designer: "卡斯蒂廖尼兄弟 A. & P.G. Castiglioni", year: 1962,
    field: "灯具 · 工业设计", movement: "意大利现代设计",
    intro: "一块65公斤大理石基座甩出2.4米不锈钢弧臂——把「吊灯」搬到房间任何位置，且无需在天花板打一个孔。",
    points: [
      { h: "重新定义问题", p: "问题不是「设计一盏落地灯」，而是「如何让餐桌上方有吊灯而不接天花板」。改写问题定义，答案自然新颖。" },
      { h: "路灯的移植", p: "弧形悬臂的原型是街头路灯。卡斯蒂廖尼兄弟擅长从无名日常物中提取智慧——「设计始于观察」的经典示范。" },
      { h: "重与轻的戏剧", p: "大理石的重、钢弧的轻、灯头的悬，三者构成一场静止的杂技。张力感是这盏灯六十年不过时的秘密。" },
    ],
    exercise: "在街上找三件「无名设计」（路灯、井盖、护栏），各写一句它们暗藏的设计智慧。",
    videoOutline: ["卡斯蒂廖尼的「现成物」设计方法", "Arco的结构力学与配重计算", "意大利战后设计的黄金年代"],
    searchQuery: "Arco 落地灯 卡斯蒂廖尼 设计解析", searchQueryEn: "Arco lamp Castiglioni design history" },
  { id: "akari", day: 7, cat: "light", title: "AKARI 光之雕塑", designer: "野口勇 Isamu Noguchi", year: 1951,
    field: "灯具 · 雕塑", movement: "日美现代主义",
    intro: "岐阜提灯的竹骨和纸遇上现代雕塑：野口勇称它们不是灯具，而是「光的雕塑」，轻得可以折叠寄往世界。",
    points: [
      { h: "材料的透光人格", p: "手漉和纸让光变得温润有肌理，竹骨的疏密控制着明暗节奏。选择材料就是选择光的性格。" },
      { h: "传统产业的再生", p: "野口勇没有发明新工艺，而是为衰落的岐阜提灯作坊注入新形态。设计可以是文化保育的引擎。" },
      { h: "轻与可折叠", p: "整灯可压平装入信封尺寸的纸盒。「轻」既是物理属性，也是一种反纪念碑的美学立场。" },
    ],
    exercise: "用一张白纸包住手机闪光灯，改变折叠方式观察光质的变化，记录三种效果。",
    videoOutline: ["野口勇的雕塑与设计生涯", "岐阜提灯工艺与AKARI的诞生", "「光之雕塑」概念的当代回响"],
    searchQuery: "野口勇 AKARI 和纸灯 光之雕塑", searchQueryEn: "Isamu Noguchi Akari light sculpture" },
  { id: "tizio", day: 7, cat: "light", title: "Tizio 台灯", designer: "理查德·萨帕 Richard Sapper", year: 1972,
    field: "灯具 · 工业设计", movement: "意大利现代设计",
    intro: "没有一根外露电线：低压电流经结构臂自身传导，配重平衡让指尖轻拨即可精准定位光斑。",
    points: [
      { h: "结构即导线", p: "让金属臂身兼导电职能，电线彻底消失。把两个系统合并为一个，是工程与美学的双赢减法。" },
      { h: "配重的指尖手感", p: "杠杆与配重的精密配比让沉重灯臂获得羽毛般的操作感。「手感」是被计算出来的，不是碰运气的。" },
      { h: "黑色的仪器感", p: "通体哑黑、比例瘦削，像一件精密仪器而非家居饰品。它为「高级办公美学」定了调。" },
    ],
    exercise: "列出你桌面上所有可见的线缆，为其中一根构想「让它消失」的三种方案。",
    videoOutline: ["萨帕的技术美学路线", "结构导电与配重系统解析", "Tizio与办公照明文化"],
    searchQuery: "Tizio 台灯 萨帕 结构导电", searchQueryEn: "Tizio lamp Richard Sapper design" },

  /* ---- 主题日 D09 · 日常器物 ---- */
  { id: "moka", day: 8, cat: "product", title: "Moka Express 摩卡壶", designer: "阿方索·比亚莱蒂 Alfonso Bialetti", year: 1933,
    field: "产品 · 工业设计", movement: "意大利工业设计",
    intro: "八角铝壶让浓缩咖啡从咖啡馆走进千家万户——九十年不改的造型，累计销量以亿计。",
    points: [
      { h: "八角形的道理", p: "八个平面便于翻砂铸造与拧握施力，棱线还加强了刚性。装饰艺术的外观之下，每个面都有工程理由。" },
      { h: "民主化一种仪式", p: "它把原属公共场所的浓缩咖啡带回家庭厨房。设计的社会意义常在于「把特权变成日常」。" },
      { h: "不变即品牌", p: "九十年造型几乎未改，磨损的壶身成为家庭记忆的容器。经典的另一种定义：无需再设计。" },
    ],
    exercise: "找一件你家用了十年以上的器物，写下它「幸好没变」的三个细节。",
    videoOutline: ["铝材与意大利战间期工业", "摩卡壶的萃取原理与结构", "国民器物如何成为文化符号"],
    searchQuery: "摩卡壶 比亚莱蒂 设计 解析", searchQueryEn: "Bialetti Moka Express design history" },
  { id: "chemex", day: 8, cat: "product", title: "Chemex 手冲咖啡壶", designer: "彼得·施伦博姆 Peter Schlumbohm", year: 1941,
    field: "产品 · 工业设计", movement: "美国现代主义",
    intro: "化学家把实验室的漏斗与烧瓶合为一体，木领皮绳一系——理性器皿从此登上MoMA永久馆藏。",
    points: [
      { h: "实验室语法的挪用", p: "耐热硼硅玻璃、锥形漏斗、无涂层的纯粹几何，全部来自实验室器皿的语言。功能血统赋予了它可信的美。" },
      { h: "一体成型的清晰", p: "冲泡与盛装合并于一只玻璃体，过程完全可见。透明不只是材料属性，更是对使用者的坦白。" },
      { h: "木与皮的一处温度", p: "在冷静玻璃的腰部系上木领与皮绳，唯一的「软」既隔热又给了手一个位置。克制的温度感最动人。" },
    ],
    exercise: "为一件全玻璃或全金属器物构想「唯一一处柔软材料」的位置，并说明理由。",
    videoOutline: ["施伦博姆与实验室美学", "一体壶身的功能整合分析", "MoMA设计收藏的评选逻辑"],
    searchQuery: "Chemex 手冲壶 设计 解析", searchQueryEn: "Chemex coffee maker Schlumbohm design" },
  { id: "juicy-salif", day: 8, cat: "product", title: "Juicy Salif 榨汁器", designer: "菲利普·斯塔克 Philippe Starck", year: 1990,
    field: "产品 · 工业设计", movement: "法国后现代设计",
    intro: "一只三足章鱼般的铝制榨汁器，斯塔克坦言：「它不是用来榨柠檬的，是用来开启话题的。」",
    points: [
      { h: "功能的挑衅", p: "它榨汁性能平平，却公然把「引发交谈」列为首要功能。这件作品逼迫我们追问：产品的功能清单里，情感与话题算不算数？" },
      { h: "草图的原始能量", p: "造型源自斯塔克在餐巾纸上的即兴涂鸦（据说灵感来自鱿鱼）。保留草图的生猛，是对抗过度打磨的策略。" },
      { h: "争议即遗产", p: "被赞为诗意也被批为失职，它成了设计伦理课的永恒案例。能持续引发争论的设计，本身就是一种成功。" },
    ],
    exercise: "写两段各100字的短评：一段为它辩护，一段批评它，体会两种设计价值观的冲突。",
    videoOutline: ["斯塔克与Alessi的合作背景", "「话题功能」的设计伦理争论", "后现代设计对功能主义的反叛"],
    searchQuery: "斯塔克 榨汁器 Juicy Salif 争议", searchQueryEn: "Philippe Starck Juicy Salif design controversy" },
  { id: "muji-cd", day: 8, cat: "product", title: "无印良品壁挂式CD机", designer: "深泽直人", year: 1999,
    field: "产品 · 交互设计", movement: "日本当代设计",
    intro: "一台长得像换气扇的CD机：拉绳开关唤起身体记忆，音乐像风一样「流」出来。",
    points: [
      { h: "无意识设计", p: "深泽直人主张设计应嵌入人们已有的行为记忆——看到拉绳，手自然想拉。最好的交互说明书是使用者的过去。" },
      { h: "隐喻的听觉化", p: "换气扇送风，CD机送乐。隐喻不停留在外形玩笑，而是重塑了「播放音乐」这一行为的体感。" },
      { h: "墙面的解放", p: "把音响从柜面移上墙，它便从「设备」变为「场景的一部分」。改变安放位置，就是改变产品的存在方式。" },
    ],
    exercise: "列出五个你「不假思索就会做」的日常动作，为其中一个构想一件借用它的新产品。",
    videoOutline: ["深泽直人「无意识设计」理论", "行为记忆与产品直觉性", "无印良品的产品哲学"],
    searchQuery: "深泽直人 壁挂CD机 无意识设计", searchQueryEn: "Naoto Fukasawa wall CD player MUJI" },
  { id: "oxo", day: 8, cat: "product", title: "OXO Good Grips 削皮器", designer: "Smart Design / 山姆·法伯", year: 1990,
    field: "产品 · 通用设计", movement: "通用设计 Universal Design",
    intro: "源于对患关节炎妻子的观察：一只人人都好握的黑色胖柄，开创了「通用设计」的商业范式。",
    points: [
      { h: "为边缘即为所有人", p: "为握力最弱的人优化的椭圆软柄与鳍状防滑纹，结果让所有人都用得更省力。「极端用户」是设计洞察的富矿。" },
      { h: "橡胶的诚意", p: "当年厨具以不锈钢的冷亮为高级，OXO选择哑黑合成橡胶的厚实——材料选择公开宣示了它的价值排序：手感高于观感。" },
      { h: "同理心的商业证明", p: "它以数倍于均价的定价成为畅销品，证明关怀不是成本而是竞争力。通用设计从此成为行业标准语汇。" },
    ],
    exercise: "戴上厚手套完成削苹果、开瓶盖、发消息三件事，记录哪些设计瞬间「失效」了。",
    videoOutline: ["通用设计七原则概述", "OXO手柄的人因工程细节", "从关怀个体到商业范式"],
    searchQuery: "OXO 削皮器 通用设计 解析", searchQueryEn: "OXO Good Grips universal design story" },

  /* ---- 主题日 D10 · 交通工具 ---- */
  { id: "beetle", day: 9, cat: "vehicle", title: "大众甲壳虫", designer: "费迪南德·保时捷 Ferdinand Porsche", year: 1938,
    field: "交通工具 · 工业设计", movement: "流线型 / 国民设计",
    intro: "「人民之车」的连续曲面剪影跨越半个世纪几乎未变，成为全球辨识度最高的汽车形态。",
    points: [
      { h: "一笔画的车身", p: "发动机盖、车顶、尾部由一条连续曲线贯通，没有断裂的腰线。整体感让它在任何年代的车流中一眼可辨。" },
      { h: "国民车的规格思维", p: "设计任务从价格倒推：可载全家、易维修、经济耐用。约束清单先于造型存在，形态是约束求解的结果。" },
      { h: "形象的自我更新", p: "从国民工具到六十年代反主流文化的宠儿，再到复刻新甲壳虫——同一形态在不同语境中被反复重新赋义。" },
    ],
    exercise: "只用一条不间断的曲线画出三款你熟悉的车的侧影，看哪款「一笔」最完整。",
    videoOutline: ["国民车计划的历史背景", "连续曲面造型的空气动力考量", "甲壳虫的文化形象变迁"],
    searchQuery: "大众甲壳虫 设计 历史 解析", searchQueryEn: "VW Beetle design history icon" },
  { id: "vespa", day: 9, cat: "vehicle", title: "Vespa 踏板摩托车", designer: "科拉迪诺·达斯卡尼奥 Corradino D'Ascanio", year: 1946,
    field: "交通工具 · 工业设计", movement: "意大利战后设计",
    intro: "讨厌摩托车的直升机工程师重新发明了摩托车：全包裹钢制车身、跨坐改为坐入，优雅从此可以上路。",
    points: [
      { h: "外行的优势", p: "达斯卡尼奥不受摩托车传统束缚，直接从「让穿裙装者也能体面骑行」出发。无知有时是创新最好的通行证。" },
      { h: "单体壳的整合", p: "航空单体壳思路让车架与外壳合一：遮蔽机械、防溅泥水、简化制造，一举三得。" },
      { h: "移动的生活方式", p: "战后废墟中，Vespa卖的不只是交通，而是轻盈自由的生活想象。《罗马假日》让它成为一代人的浪漫符号。" },
    ],
    exercise: "选一类你从未使用过的工具，以「彻底外行」身份写下它最不合理的三个地方。",
    videoOutline: ["航空工程师的摩托车革命", "单体壳车身的结构分析", "Vespa与战后意大利生活美学"],
    searchQuery: "Vespa 踏板车 设计 历史", searchQueryEn: "Vespa scooter D'Ascanio design history" },
  { id: "citroen-ds", day: 9, cat: "vehicle", title: "雪铁龙 DS「女神」", designer: "弗拉米尼奥·贝尔托尼 Flaminio Bertoni", year: 1955,
    field: "交通工具 · 工业设计", movement: "法国未来主义",
    intro: "巴黎车展首日订单破万：液气悬挂让车身如气垫般浮起，罗兰·巴特称它为「从天而降的物体」。",
    points: [
      { h: "雕塑家的车身", p: "贝尔托尼本行是雕塑家，DS的曲面不服从任何既有汽车语法，前低后高的俯冲姿态像一滴将落未落的水。" },
      { h: "技术的可感化", p: "液气悬挂、转向随动大灯等先进技术不藏在参数表里,而被转译为「漂浮」的直接体感。让技术被身体感知，是产品设计的高级任务。" },
      { h: "作为神话的设计", p: "巴特在《神话学》中以DS分析物如何被时代赋魅。读设计史也要读它的接受史。" },
    ],
    exercise: "读罗兰·巴特《新雪铁龙》短文，摘出三句你认为最适用于当下新产品发布的句子。",
    videoOutline: ["DS的空气动力与液气悬挂", "贝尔托尼的雕塑造型方法", "罗兰·巴特与设计的神话分析"],
    searchQuery: "雪铁龙DS 女神 设计解析", searchQueryEn: "Citroen DS design Flaminio Bertoni" },
  { id: "mini", day: 9, cat: "vehicle", title: "Mini 微型轿车", designer: "亚历克·伊西戈尼斯 Alec Issigonis", year: 1959,
    field: "交通工具 · 工业设计", movement: "英国工程设计",
    intro: "石油危机催生的空间魔术：发动机横置、四轮四角，3米车长里挤出80%的乘员空间。",
    points: [
      { h: "布局即设计", p: "横置发动机加前轮驱动的布局革命，才是Mini真正的「造型」。最大的设计决定往往发生在看不见的层面。" },
      { h: "小的正当性", p: "轮子推到四角、缩小到十英寸，一切为空间效率服务。小不是妥协，而是一种被论证的价值主张。" },
      { h: "亲和的比例", p: "短悬、圆灯与近乎方正的舱体形成孩童涂鸦般的亲和比例，让它同时赢得赛道冠军与大众宠爱。" },
    ],
    exercise: "测量你房间里使用率最低的一平方米，构想一个「布局革命」让它承担新功能。",
    videoOutline: ["苏伊士危机与微型车需求", "横置前驱布局的空间革命", "Mini的赛车传奇与文化形象"],
    searchQuery: "Mini 汽车 伊西戈尼斯 设计", searchQueryEn: "Mini car Alec Issigonis design revolution" },
  { id: "shinkansen", day: 9, cat: "vehicle", title: "新干线0系列车", designer: "三木忠直（团队）", year: 1964,
    field: "交通工具 · 工业设计", movement: "日本战后工业设计",
    intro: "世界第一条高速铁路的首发车：轰炸机工程师转向和平事业，圆润「子弹头」成为战后日本复兴的国家肖像。",
    points: [
      { h: "航空技术的转译", p: "流线头型、轻量车体与气密结构皆来自航空经验。0系是「军转民」技术迁移的典范案例。" },
      { h: "速度的公共表达", p: "蓝白涂装、圆窗与饱满曲面把210km/h的威慑转化为亲切与信赖。面向公众的速度，需要温和的面孔。" },
      { h: "系统而非单车", p: "专用线路、信号系统、发车密度与车辆一体设计。高铁的伟大在于系统工程，车头只是它的可见结晶。" },
    ],
    exercise: "对比0系与任一现代高铁头型照片，从降噪与气压角度猜测形态演化的原因。",
    videoOutline: ["东海道新干线的诞生始末", "航空工程师与子弹头造型", "高铁作为国家形象工程"],
    searchQuery: "新干线0系 设计 历史", searchQueryEn: "Shinkansen 0 series bullet train design" },

  /* ---- 主题日 D11 · 电子产品 ---- */
  { id: "braun-t3", day: 10, cat: "product", title: "Braun T3 袖珍收音机", designer: "迪特·拉姆斯 Dieter Rams", year: 1958,
    field: "产品 · 工业设计", movement: "功能主义",
    intro: "一块素白小盒、一片孔阵、一个转盘——半个世纪后，初代iPod对它的致意肉眼可见。",
    points: [
      { h: "界面的原型", p: "圆形拨盘居于孔阵之下、比例克制、无一冗余。T3提炼出的「屏幕区+单一操控件」布局，成为便携电子设备的元语法。" },
      { h: "孔阵的秩序", p: "扬声孔以严格网格排布，功能性开孔被升华为唯一的表面肌理。装饰可以省略，秩序不可以。" },
      { h: "跨越媒介的血脉", p: "从T3到iPod的形式呼应说明：伟大的界面范式可以脱离具体技术,在新媒介中转世。" },
    ],
    exercise: "把T3与初代iPod的正面图并置，用描图纸描出两者共享的构图骨架。",
    videoOutline: ["拉姆斯的便携产品系列", "T3的界面布局分析", "Braun与Apple的形式对话"],
    searchQuery: "Braun T3 收音机 拉姆斯 iPod", searchQueryEn: "Braun T3 radio Dieter Rams iPod" },
  { id: "walkman", day: 10, cat: "product", title: "Sony Walkman TPS-L2", designer: "索尼设计中心", year: 1979,
    field: "产品 · 工业设计", movement: "日本消费电子",
    intro: "砍掉录音功能、砍掉外放喇叭——一台「只能听」的机器，发明了「随身音乐」这种生活方式。",
    points: [
      { h: "做减法的产品定义", p: "在功能竞赛的年代主动删除录音与扬声器，换来极致便携。产品的边界由删除决定，而非堆砌。" },
      { h: "发明一种行为", p: "Walkman之前，「边走边听自己的音乐」并不存在。最高级的设计创造的不是物品，而是前所未有的行为。" },
      { h: "私人声场的社会学", p: "耳机在公共空间围出私人领域，重塑了城市中人与人的距离。产品的涟漪远超出产品本身。" },
    ],
    exercise: "观察地铁里戴耳机的人群十分钟，记录耳机如何改变他们的姿态与目光。",
    videoOutline: ["Walkman诞生的内部博弈", "便携音乐与城市生活变迁", "从Walkman到流媒体的行为谱系"],
    searchQuery: "索尼 Walkman 随身听 设计历史", searchQueryEn: "Sony Walkman TPS-L2 design history" },
  { id: "macintosh", day: 10, cat: "product", title: "Macintosh 128K", designer: "苹果团队 / Hartmut Esslinger 风格", year: 1984,
    field: "产品 · 交互设计", movement: "个人计算革命",
    intro: "一台会对你「微笑」的电脑：米色一体机身、图形界面与鼠标，把计算从机房请进书房。",
    points: [
      { h: "拟人的姿态", p: "竖向机身如一张微微仰起的脸，开机画面是笑脸图标。当技术令人生畏时，设计的首要任务是消除恐惧。" },
      { h: "桌面隐喻", p: "文件、文件夹、废纸篓——图形界面用办公桌的隐喻让操作无需学习。隐喻是把新事物翻译给旧经验的桥。" },
      { h: "软硬一体的体验观", p: "机身、系统、字体（首批比例字体）与开箱指南被当作一个整体设计。「体验」作为设计对象自此确立。" },
    ],
    exercise: "在你的电脑桌面找出五个沿用至今的「桌面隐喻」元素，思考哪个已名存实亡。",
    videoOutline: ["1984发布会与时代语境", "图形界面与鼠标的交互革命", "桌面隐喻的遗产与局限"],
    searchQuery: "Macintosh 1984 麦金塔 设计", searchQueryEn: "Macintosh 128K 1984 design GUI" },
  { id: "gameboy", day: 10, cat: "product", title: "Game Boy 掌机", designer: "横井军平", year: 1989,
    field: "产品 · 工业设计", movement: "日本消费电子",
    intro: "「枯萎技术的水平思考」：用落后一代的黑白屏与成熟芯片，赢下便携游戏市场十余年。",
    points: [
      { h: "落后即策略", p: "横井军平放弃彩屏，换取低价、耐摔与数十小时续航。技术选型的智慧不在最新，而在最合适。" },
      { h: "按键布局的定型", p: "十字键+AB键+双功能键的布局经Game Boy固化为掌机的通用语法，沿用至今。" },
      { h: "皮实的尊严", p: "海湾战争中被烧毁一半仍能运行的那台Game Boy成为传奇。可靠性是最朴素也最动人的产品品格。" },
    ],
    exercise: "列出你手机里三个「过剩」的功能，构想一个删掉它们后更便宜耐用的版本卖给谁。",
    videoOutline: ["横井军平的设计哲学", "枯萎技术水平思考的案例", "十字键与掌机交互标准"],
    searchQuery: "Game Boy 横井军平 枯萎技术", searchQueryEn: "Game Boy Gunpei Yokoi lateral thinking withered technology" },
  { id: "ipod", day: 10, cat: "product", title: "iPod 初代", designer: "苹果设计团队", year: 2001,
    field: "产品 · 交互设计", movement: "当代科技设计",
    intro: "「把一千首歌装进口袋」：转盘滑动的物理快感与白色耳机线，重新发明了人与音乐库的关系。",
    points: [
      { h: "一句话的产品", p: "「1000 songs in your pocket」先于产品存在。能被一句话说清的价值主张，才配得上被设计。" },
      { h: "转盘的操控密度", p: "拇指划圈可在万首歌中瞬间跳跃，加速度曲线经过精心调校。输入方式必须匹配数据规模。" },
      { h: "白色的识别策略", p: "当所有耳机线都是黑色，白色线材让街头每个用户都成了广告牌。差异化可以低成本到只是换个颜色。" },
    ],
    exercise: "为你常用的一个App写出它的「一句话产品」，删到不能再删为止。",
    videoOutline: ["iPod立项与音乐产业背景", "Click Wheel交互的层级逻辑", "白色耳机的传播策略"],
    searchQuery: "iPod 初代 设计解析 转盘", searchQueryEn: "original iPod 2001 click wheel design" },

  /* ---- 主题日 D12 · 书籍与编辑设计 ---- */
  { id: "penguin", day: 11, cat: "book", title: "企鹅丛书排版规范", designer: "扬·奇肖尔德 Jan Tschichold", year: 1947,
    field: "书籍 · 编辑设计", movement: "传统排印复兴",
    intro: "现代主义旗手转身拥抱传统：四页《企鹅排版规则》让数百种平装书获得统一而克制的品质。",
    points: [
      { h: "规则的力量", p: "字距、行距、标点悬挂……奇肖尔德把品味翻译为可执行的规则，让平价书也能有一流的排印尊严。" },
      { h: "网格化的封面系统", p: "三段式色带、固定字体与徽标位置，使书店里的企鹅书一眼成阵。系统性识别先于「设计感」。" },
      { h: "立场的成熟", p: "年轻时鼓吹新排印、中年回归古典比例，奇肖尔德的转变提示我们：风格是工具，读者利益才是立场。" },
    ],
    exercise: "为「你所在院系的系列讲座海报」拟五条最重要的排版规则，一页写完。",
    videoOutline: ["奇肖尔德从新排印到古典的转向", "企鹅规则的具体条款解读", "系列出版物的系统设计方法"],
    searchQuery: "奇肖尔德 企鹅丛书 排版规则", searchQueryEn: "Jan Tschichold Penguin composition rules" },
  { id: "massin", day: 11, cat: "book", title: "《秃头歌女》视觉剧本", designer: "罗贝尔·马桑 Robert Massin", year: 1964,
    field: "书籍 · 编辑设计", movement: "法国实验排印",
    intro: "把荒诞剧「演」在纸上：每个角色一种字体，音量放大字号、争吵挤压版面——排印成为表演本身。",
    points: [
      { h: "字体即声音", p: "马桑给每个角色分配专属字体，粗细与字号追随音量情绪。文字第一次在书页上「发出声音」。" },
      { h: "版面即舞台", p: "对话在页面上碰撞、倾斜、重叠,空白就是沉默。版面从容器变为叙事媒介本身。" },
      { h: "束缚中的先锋", p: "全部效果用铅字时代的照相制版完成。技术限制没有阻止实验，反而逼出了更强的想象力。" },
    ],
    exercise: "选一段两人吵架的对话，用字号、位置与倾斜把它「排演」在一页A4纸上。",
    videoOutline: ["荒诞派戏剧与视觉文学", "马桑的角色字体系统", "表现性排印的当代回声"],
    searchQuery: "马桑 秃头歌女 实验排版", searchQueryEn: "Robert Massin Bald Soprano typography" },
  { id: "sugiura", day: 11, cat: "book", title: "杉浦康平杂志设计", designer: "杉浦康平", year: 1971,
    field: "书籍 · 编辑设计", movement: "日本编辑设计",
    intro: "以《游》等杂志建立的「杉浦流」：把亚洲宇宙观注入网格，让一本书成为可翻阅的曼荼罗。",
    points: [
      { h: "浓密的信息宇宙", p: "与瑞士式留白相反，杉浦以极高密度编织图文，层层嵌套如星图。他证明「多」也可以是被精密控制的秩序。" },
      { h: "书籍五感论", p: "纸张的重量、翻页的声响、油墨的气味都是设计对象。书是身体接触的容器，不只是视觉平面。" },
      { h: "亚洲图谱学", p: "从佛教曼荼罗、汉字结构到民间图案，杉浦为亚洲设计寻找不依附西方的方法论根系。" },
    ],
    exercise: "闭眼抚摸三本装帧不同的书60秒，写下每本通过触觉传达的「性格」。",
    videoOutline: ["杉浦康平与战后日本编辑设计", "高密度版面的网格控制", "书籍五感与装帧哲学"],
    searchQuery: "杉浦康平 杂志设计 书籍设计", searchQueryEn: "Kohei Sugiura editorial design Japan" },
  { id: "smlxl", day: 11, cat: "book", title: "S,M,L,XL", designer: "布鲁斯·毛 Bruce Mau × 雷姆·库哈斯", year: 1995,
    field: "书籍 · 编辑设计", movement: "当代编辑设计",
    intro: "1376页、2.7公斤的「建筑小说」：辞典、日记、项目与宣言以数据洪流的方式倾泻，重新定义了作品集。",
    points: [
      { h: "厚度即宣言", p: "书的物理规模本身模拟了信息时代的过载体验。开本、页数、重量都是修辞手段。" },
      { h: "多声部的编辑", p: "词条旁注贯穿全书、图文比例剧烈波动,阅读像换台。编辑设计的对象是「阅读节奏」而非单页美观。" },
      { h: "设计师作为合著者", p: "布鲁斯·毛不是排版执行者而是内容共谋者。当代编辑设计要求设计师深度介入内容生产。" },
    ],
    exercise: "把你最近一次课程作业重新构想为一本书：写下它的开本、页数与阅读节奏设定。",
    videoOutline: ["库哈斯与AMO的媒介实验", "巨型书籍的编辑结构解析", "作品集出版的范式转移"],
    searchQuery: "SMLXL 库哈斯 书籍设计", searchQueryEn: "S M L XL Rem Koolhaas Bruce Mau book" },
  { id: "lu-jingren", day: 11, cat: "book", title: "吕敬人书籍设计", designer: "吕敬人", year: 1997,
    field: "书籍 · 编辑设计", movement: "中国当代书籍设计",
    intro: "从「装帧」到「书籍设计」的观念跃迁：函套、纸张、翻阅节奏皆为叙事，让中文书拥有建筑般的空间感。",
    points: [
      { h: "书筑的观念", p: "吕敬人提出做书如做建筑：读者是在时间中「走进」一本书。目录是门厅，章节是房间，节奏由设计师规划。" },
      { h: "材料的文化语义", p: "手工纸、经折装、函套等传统工艺被重新激活，材料自身携带的文化记忆参与叙事。" },
      { h: "信息的再编辑", p: "他常重构原稿的信息层级与图文关系——书籍设计师的工作从美化升级为「第二作者」的编辑劳动。" },
    ],
    exercise: "为你最喜欢的一篇论文设想一种「非A4」的物理形态，说明形态如何服务内容。",
    videoOutline: ["从装帧到书籍设计的观念史", "传统工艺的当代书籍应用", "信息再编辑的工作方法"],
    searchQuery: "吕敬人 书籍设计 书筑", searchQueryEn: "Lu Jingren Chinese book design" },

  /* ---- 主题日 D13 · 信息与界面 ---- */
  { id: "isotype", day: 12, cat: "info", title: "ISOTYPE 图示统计系统", designer: "奥托·纽拉特 & 格尔德·阿恩茨", year: 1936,
    field: "信息设计", movement: "维也纳方法",
    intro: "「用数量重复代替大小夸张」：一套两千余个象形符号的语言，志在让统计知识穿越文字与阶级。",
    points: [
      { h: "重复优于放大", p: "十个小人代表一千万人口，而非画一个更大的人。规则杜绝了视觉夸张的误导——诚实被写进了语法。" },
      { h: "符号的字典", p: "阿恩茨刻制的象形符号语义统一、风格一致，构成可组合的视觉词汇表。今天的图标系统皆是其后裔。" },
      { h: "知识民主的工具", p: "ISOTYPE诞生于社会博物馆，服务于工人教育。信息设计从起点上就是一项政治承诺：让复杂向所有人敞开。" },
    ],
    exercise: "用重复的简单图形（不许改变大小）表现你班级同学的三项统计数据。",
    videoOutline: ["纽拉特与维也纳社会博物馆", "ISOTYPE的符号规则详解", "从ISOTYPE到现代图标系统"],
    searchQuery: "ISOTYPE 图示统计 纽拉特", searchQueryEn: "ISOTYPE Otto Neurath pictogram statistics" },
  { id: "minard", day: 12, cat: "info", title: "拿破仑东征信息图", designer: "夏尔·米纳尔 Charles Minard", year: 1869,
    field: "信息设计", movement: "统计制图先驱",
    intro: "一张图讲完一场溃败：兵力、路线、方向、时间、地点与温度六个变量交织，被誉为「史上最好的统计图形」。",
    points: [
      { h: "六变量的编织", p: "线宽表兵力、颜色分进退、下方并列温度曲线——多维数据在同一平面各得其所而不打架，是编码分配的教科书。" },
      { h: "数据的叙事弧", p: "粗带渐细直至涓涓一线，42万人到1万人的溃败无需一个形容词。让数据自己完成情感冲击。" },
      { h: "反战的图表", p: "米纳尔明言此图为控诉战争代价而作。信息设计从不「中立」，选择呈现什么本身就是立场。" },
    ],
    exercise: "选一段个人经历（如体重、开销、学习时长），尝试在一张图里同时编码四个变量。",
    videoOutline: ["米纳尔与十九世纪统计制图", "六变量编码的图形分析", "Tufte对该图的经典评述"],
    searchQuery: "米纳尔 拿破仑东征图 信息图", searchQueryEn: "Minard Napoleon march map data visualization" },
  { id: "susan-kare", day: 12, cat: "info", title: "Macintosh 像素图标", designer: "苏珊·卡雷 Susan Kare", year: 1984,
    field: "界面 · 图标设计", movement: "早期GUI设计",
    intro: "在32×32的像素牢笼里造出微笑电脑、小炸弹与⌘符号——她让冰冷的比特有了可被喜爱的表情。",
    points: [
      { h: "约束中的人性", p: "每个图标只有一千余个黑白像素，卡雷用刺绣与马赛克的思维雕琢它们。极限约束恰是风格的孵化器。" },
      { h: "隐喻的挑选", p: "废纸篓、手表、油漆桶——图标从日常物中借义,让功能无需说明。挑对隐喻是图标设计的一半工作。" },
      { h: "符号的考古", p: "⌘取自北欧露营地标志。优秀的符号设计师都是符号历史的考古学家。" },
    ],
    exercise: "在16×16方格纸上设计「保存」的新图标——禁止使用软盘隐喻。",
    videoOutline: ["卡雷与初代Mac团队", "像素图标的绘制方法", "界面隐喻的选择逻辑"],
    searchQuery: "Susan Kare 像素图标 Mac 设计", searchQueryEn: "Susan Kare Macintosh icons pixel design" },
  { id: "ios7", day: 12, cat: "info", title: "iOS 7 扁平化改版", designer: "乔纳森·艾维（软件设计主导）", year: 2013,
    field: "界面 · 交互设计", movement: "扁平化设计",
    intro: "一夜之间擦掉皮革缝线与毛毡纹理：以「遵从、清晰、深度」三原则，宣告拟物时代终结。",
    points: [
      { h: "内容优先的遵从", p: "界面退后，内容上前——半透明层与细字重让「壳」尽量隐形。装饰的删除是为了注意力的重新分配。" },
      { h: "深度取代质感", p: "拟真纹理被层级、模糊与视差取代。空间感不再靠「画出来」,而是靠系统性的图层逻辑「组织出来」。" },
      { h: "范式切换的代价", p: "可点击性线索随质感一起消失,引发可用性争论。每次美学革命都需要重建一套新的可供性语言。" },
    ],
    exercise: "找同一App在2012与2014年的截图,标出三处「可点击线索」的表达方式变化。",
    videoOutline: ["拟物设计的兴衰始末", "iOS7三原则与图层体系", "扁平化的可用性争论"],
    searchQuery: "iOS7 扁平化 设计 解析", searchQueryEn: "iOS 7 flat design redesign analysis" },
  { id: "material", day: 12, cat: "info", title: "Material Design 设计系统", designer: "谷歌设计团队", year: 2014,
    field: "界面 · 设计系统", movement: "设计系统时代",
    intro: "「量子纸」的隐喻：一种会响应触摸、能升起投影的理想材料，把整个数字世界纳入统一物理学。",
    points: [
      { h: "隐喻的系统化", p: "纸片的层级、阴影与运动规律被写成完整规范。隐喻不再是零星修辞，而是可推导一切界面行为的公理系统。" },
      { h: "动效即物理", p: "加速度曲线、转场编排都服从「材料」的虚拟物理。动效从装饰升格为解释空间关系的功能语言。" },
      { h: "开源的设计权力", p: "完整规范、组件库与工具免费公开,中小团队瞬间获得大厂级设计基线。设计系统重塑了行业的能力分布。" },
    ],
    exercise: "观察任意App的一次页面转场，用草图画出元素「从哪来、到哪去」的空间逻辑。",
    videoOutline: ["设计系统概念的兴起", "量子纸隐喻与图层物理", "设计规范开源的行业影响"],
    searchQuery: "Material Design 设计系统 解析", searchQueryEn: "Google Material Design system analysis" },

  /* ---- 主题日 D14 · 建筑经典 II ---- */
  { id: "villa-savoye", day: 13, cat: "arch", title: "萨伏伊别墅", designer: "勒·柯布西耶 Le Corbusier", year: 1931,
    field: "建筑 · 现代主义", movement: "国际风格",
    intro: "「新建筑五点」的完整宣言：底层架空、屋顶花园、自由平面、横向长窗、自由立面——一座漂浮的白色机器。",
    points: [
      { h: "五点的逻辑链", p: "钢筋混凝土框架解放了墙体,五点由此环环相扣：柱子承重,墙便自由;屋顶不再是坡顶,便可成花园。技术前提决定形式自由。" },
      { h: "建筑漫步", p: "坡道贯穿三层,行走中空间连续展开如电影。柯布西耶设计的不是房间,而是一段被编排的时间。" },
      { h: "居住的机器", p: "这句口号常被误读为冷酷,其本意是像设计飞机一样严谨地服务生活。理解宣言,须回到原文与语境。" },
    ],
    exercise: "画出你住所的平面,标出哪些墙承重、哪些可拆,想象「自由平面」版的改造。",
    videoOutline: ["新建筑五点逐条图解", "建筑漫步的路径分析", "萨伏伊别墅的居住争议"],
    searchQuery: "萨伏伊别墅 柯布西耶 新建筑五点", searchQueryEn: "Villa Savoye Le Corbusier five points" },
  { id: "fallingwater", day: 13, cat: "arch", title: "流水别墅", designer: "弗兰克·劳埃德·赖特 F. L. Wright", year: 1937,
    field: "建筑 · 有机建筑", movement: "有机建筑",
    intro: "不是面对瀑布,而是悬在瀑布之上——混凝土平台从山岩中长出,建筑与自然互为延伸。",
    points: [
      { h: "有机的立场", p: "赖特拒绝「观景房」的常规,让业主生活在瀑布声中而非瀑布照片前。设计立场决定了全部形式选择。" },
      { h: "悬挑的戏剧", p: "层层出挑的平台呼应岩层节理,把结构冒险转化为诗意。工程胆识是浪漫的骨架。" },
      { h: "材料的就地对话", p: "毛石砌体取自当地岩层,与混凝土的浅色平台形成「自然/人工」的持续对话。" },
    ],
    exercise: "找一处校园水景或树木,构想一个「与它交织而非面对它」的小构筑物草图。",
    videoOutline: ["赖特与有机建筑理念", "悬挑结构的力学与维修史", "建筑与场地关系的设计课"],
    searchQuery: "流水别墅 赖特 有机建筑", searchQueryEn: "Fallingwater Frank Lloyd Wright organic" },
  { id: "ronchamp", day: 13, cat: "arch", title: "朗香教堂", designer: "勒·柯布西耶 Le Corbusier", year: 1955,
    field: "建筑 · 现代主义", movement: "粗野主义 / 雕塑建筑",
    intro: "理性主义大师的惊人转身：蟹壳般的屋顶、深深的窗洞与彩色光斑——一座用光书写的混凝土雕塑。",
    points: [
      { h: "自我的推翻", p: "写下「住宅是机器」的人,晚年造出最反机器的建筑。大师的价值不在一贯,而在持续生长。" },
      { h: "光的乐谱", p: "南墙上大小深浅不一的窗洞如乐谱音符,不同时刻投下变幻光斑。光在此不是照明,而是内容。" },
      { h: "厚墙的原始感", p: "倾斜的厚墙与粗糙喷浆唤起洞穴与庇护的原型记忆。现代技术可以服务于最古老的情感。" },
    ],
    exercise: "在一个纸盒侧面开五个大小不同的孔,用手电筒观察光斑的组合与移动。",
    videoOutline: ["柯布西耶晚期转向", "朗香教堂的光线设计分析", "宗教空间的情感营造"],
    searchQuery: "朗香教堂 柯布西耶 光 解析", searchQueryEn: "Ronchamp chapel Le Corbusier light" },
  { id: "sydney-opera", day: 13, cat: "arch", title: "悉尼歌剧院", designer: "约恩·乌松 Jørn Utzon", year: 1973,
    field: "建筑 · 现代主义", movement: "结构表现主义",
    intro: "十四年波折建成的白色风帆：所有壳片同出一个球面的几何顿悟，让「不可能」获得了可施工的秩序。",
    points: [
      { h: "球面的顿悟", p: "自由曲面无法预制,乌松剥橙子般发现:全部壳体可取自同一半径球面。一个几何决定,同时解决了美学、结构与造价。" },
      { h: "城市尺度的剪影", p: "它面向海港四面皆为正面,剪影简洁到儿童可画。地标的本质是「可被简笔画传播」。" },
      { h: "未完成的教训", p: "乌松中途被迫辞任,室内由他人完成。这段公案是设计管理与政治博弈的必修案例。" },
    ],
    exercise: "用橙子皮剪出三种不同曲面片,拼一个小构筑,体会「同源几何」的拼装逻辑。",
    videoOutline: ["竞赛方案到球面方案的演化", "壳体预制与施工过程", "乌松辞任风波与遗产"],
    searchQuery: "悉尼歌剧院 乌松 球面几何", searchQueryEn: "Sydney Opera House Utzon spherical geometry" },
  { id: "church-of-light", day: 13, cat: "arch", title: "光之教堂", designer: "安藤忠雄", year: 1989,
    field: "建筑 · 当代建筑", movement: "日本当代建筑",
    intro: "一个清水混凝土盒子,一道十字形切口——预算拮据的小教堂,以「减到只剩光」震动世界。",
    points: [
      { h: "贫穷的丰盛", p: "预算不足反而成全了纯粹:无装饰、无彩窗,连长椅都用脚手架木板。资源约束是设计的盟友而非敌人。" },
      { h: "负形的十字", p: "十字不是挂上去的物,而是墙体的缺失——由光而非材料构成。以「无」造「有」,是东方美学的当代显影。" },
      { h: "混凝土的肌理修养", p: "清水混凝土的孔洞排布、模板分缝都被精确设计。所谓极简,是把功夫藏进了毫米之间。" },
    ],
    exercise: "用手机在全黑房间拍一张「只有一道光缝」的照片,体会负形的表现力。",
    videoOutline: ["安藤忠雄的自学之路", "光之教堂的建造细节", "清水混凝土的工艺美学"],
    searchQuery: "光之教堂 安藤忠雄 解析", searchQueryEn: "Church of the Light Tadao Ando" },

  /* ---- 主题日 D15 · 战后意大利设计 ---- */
  { id: "valentine", day: 14, cat: "product", title: "Valentine 便携打字机", designer: "埃托雷·索特萨斯 Ettore Sottsass", year: 1969,
    field: "产品 · 工业设计", movement: "意大利激进设计",
    intro: "一台艳红色的「反机器」：索特萨斯要它远离办公室,陪诗人去乡间的周末——工具第一次被赋予了叛逆人格。",
    points: [
      { h: "情感的立项", p: "设计任务书写的不是参数而是场景:「给孤独诗人的周日伴侣」。从情绪出发定义产品,是激进设计的方法论遗产。" },
      { h: "红色的宣言", p: "在灰米色办公设备的海洋里,通体艳红加塑料提盒是一次色彩起义。颜色即政治。" },
      { h: "反成功的成功", p: "索特萨斯后来嫌它「太像玩具」,商业上也平平——但它作为观念的影响远超销量。设计史记住的常是提问者。" },
    ],
    exercise: "选一件严肃的工作工具,为它构想一个「度假版」:改哪三处能让它变得轻松?",
    videoOutline: ["索特萨斯与奥利维蒂", "激进设计运动的诉求", "产品人格化的先声"],
    searchQuery: "索特萨斯 Valentine 打字机 红色", searchQueryEn: "Sottsass Valentine typewriter Olivetti" },
  { id: "superleggera", day: 14, cat: "chair", title: "Superleggera 超轻椅", designer: "吉奥·庞蒂 Gio Ponti", year: 1957,
    field: "家具 · 工业设计", movement: "意大利现代设计",
    intro: "1.7公斤,单指可提,小孩可抛接——庞蒂把渔村传统木椅提炼到极限,证明「轻」是意大利的现代性。",
    points: [
      { h: "再设计的深度", p: "原型是基亚瓦里渔民椅。庞蒂没有另起炉灶,而是把传统截面一削再削至三角形。创新可以是对既有智慧的极限提纯。" },
      { h: "轻的工程学", p: "白蜡木的纤维方向、藤面的张力分布都经计算。每减一克都要用结构智慧来赎买。" },
      { h: "掉地不坏的广告", p: "宣传片里椅子从楼上抛下弹而不碎。用一个可验证的动作讲清核心价值,胜过千言。" },
    ],
    exercise: "称一称你椅子的重量,列出若要减重30%可以从哪三处「削」起。",
    videoOutline: ["庞蒂与《Domus》杂志", "从渔民椅到超轻椅的提纯", "轻量化的结构策略"],
    searchQuery: "庞蒂 超轻椅 Superleggera", searchQueryEn: "Gio Ponti Superleggera chair design" },
  { id: "carlton", day: 14, cat: "product", title: "Carlton 书架", designer: "埃托雷·索特萨斯 / 孟菲斯 Memphis", year: 1981,
    field: "家具 · 后现代设计", movement: "孟菲斯 Memphis",
    intro: "彩色塑料贴面拼成的图腾柱,斜板放不稳几本书——孟菲斯用一件「坏家具」炸开了功能主义的天花板。",
    points: [
      { h: "对好品味的罢工", p: "廉价贴面、糖果色、混乱角度,全是「好设计」的反面清单。孟菲斯证明:品味的边界是被约定的,因此可以被谈判。" },
      { h: "家具作为图腾", p: "Carlton更像雕塑或神龛而非储物工具。它追问:家里的物件,除了有用,能否也承担精神图腾的角色?" },
      { h: "短命而长效", p: "孟菲斯集团六年即散,但其色彩与几何至今回荡在时尚与界面设计中。运动的寿命与影响的寿命是两回事。" },
    ],
    exercise: "用便利贴在墙上拼一个「无用但想每天看到」的构成,拍照留存一周后再评价它。",
    videoOutline: ["孟菲斯集团的成立宣言", "Carlton的构成与材料", "后现代设计的当代回潮"],
    searchQuery: "孟菲斯 Carlton 书架 索特萨斯", searchQueryEn: "Memphis Carlton bookcase Sottsass" },
  { id: "alessi-9093", day: 14, cat: "product", title: "9093 鸣鸟水壶", designer: "迈克尔·格雷夫斯 Michael Graves", year: 1985,
    field: "产品 · 后现代设计", movement: "后现代主义",
    intro: "壶嘴上一只会唱歌的小鸟：水开时鸟鸣代替汽笛——Alessi最畅销的单品,让厨房有了幽默感。",
    points: [
      { h: "功能的戏剧化", p: "报警是功能,鸟鸣是戏剧。格雷夫斯把必要功能转写为愉悦事件,示范了「情感化设计」的经典路径。" },
      { h: "锥体的亲和几何", p: "宽底锥形加热效率高且稳,蓝色手柄圆球是防烫提示。后现代的趣味之下,功能账算得一丝不苟。" },
      { h: "厂牌作为策展人", p: "Alessi以「设计工厂」自居,邀请建筑师跨界造物。品牌可以是设计文化的策展机构。" },
    ],
    exercise: "为你的闹钟构想一种「令人微笑的报警方式」,画出草图并注明技术可行性。",
    videoOutline: ["Alessi的设计策展模式", "9093的功能与符号分析", "情感化设计三层次理论"],
    searchQuery: "Alessi 9093 水壶 格雷夫斯", searchQueryEn: "Alessi 9093 kettle Michael Graves" },
  { id: "ts502", day: 14, cat: "product", title: "TS502 立方体收音机", designer: "马尔科·扎努索 & 理查德·萨帕", year: 1964,
    field: "产品 · 工业设计", movement: "意大利现代设计",
    intro: "合上是一只沉默的彩色立方体,打开才露出喇叭与旋钮——收音机第一次拥有了「关机的形态」。",
    points: [
      { h: "两种存在状态", p: "使用态与休眠态被分别设计:开启是设备,合上是雕塑。产品的「不使用时刻」同样值得设计。" },
      { h: "铰链的仪式", p: "开合动作成为使用的序曲与终章。一个机械动作,承担了数字时代「开机动画」的角色。" },
      { h: "色彩的家具化", p: "橙、白、黑的烤漆壳让它融入客厅如一件小家具。电子产品的归宿是消失于生活,而非炫耀技术。" },
    ],
    exercise: "观察你的三件电子产品「关机时的样子」,为最丑的那件构想休眠形态。",
    videoOutline: ["扎努索与萨帕的合作", "开合结构的交互意义", "电子产品的家具化趋势"],
    searchQuery: "Brionvega TS502 收音机 设计", searchQueryEn: "Brionvega TS502 radio Zanuso Sapper" },

  /* ---- 主题日 D16 · 北欧设计 ---- */
  { id: "savoy-vase", day: 15, cat: "product", title: "Savoy 花瓶", designer: "阿尔瓦·阿尔托 Alvar Aalto", year: 1936,
    field: "产品 · 玻璃设计", movement: "北欧有机现代主义",
    intro: "打破对称的自由波浪轮廓——据说源自芬兰湖岸线,让玻璃器皿从「容器」变成了「地形」。",
    points: [
      { h: "有机曲线的立场", p: "在直线统治的现代主义盛期,阿尔托坚持自然的自由曲线。北欧现代主义的独特贡献,正是给理性补上了温度。" },
      { h: "不规定的功能", p: "波浪开口不指定花的插法,使用者每次都在与形状协商。留下使用的自由度,是一种设计的慷慨。" },
      { h: "木模吹制的偶然", p: "早期在木模中吹制,木纹与烧蚀带来微差。工艺的不完美被接纳为生命感的来源。" },
    ],
    exercise: "描下三种自然轮廓(叶缘、湖岸、云边),挑一条转化为器皿开口的曲线。",
    videoOutline: ["阿尔托的有机现代主义", "Savoy花瓶的工艺演变", "北欧设计中的自然母题"],
    searchQuery: "阿尔托 Savoy 花瓶 设计", searchQueryEn: "Alvar Aalto Savoy vase design" },
  { id: "stool60", day: 15, cat: "chair", title: "Stool 60 三足凳", designer: "阿尔瓦·阿尔托 Alvar Aalto", year: 1933,
    field: "家具 · 工业设计", movement: "北欧现代主义",
    intro: "L形弯腿直接旋入座面——一个专利节点,让桦木凳可无限堆叠成塔,九十年畅销不衰。",
    points: [
      { h: "一个节点定乾坤", p: "「L腿」把实木弯折并直固于板面,免去横撑与斜撑。解决了关键节点,整件家具便水到渠成。" },
      { h: "堆叠的螺旋之美", p: "三足设计让堆叠时腿部错开,自然旋转成塔。功能性堆叠意外生成了雕塑性,是「涌现美」的范例。" },
      { h: "桦木的国家性格", p: "选用芬兰本地桦木而非进口硬木,温润浅色定义了「北欧感」的材料基调。" },
    ],
    exercise: "观察三件可堆叠物品(椅、篮、杯),画出它们「为堆叠而妥协」的设计细节。",
    videoOutline: ["L腿专利与弯木实验", "Artek公司与设计民主化", "堆叠家具的空间经济学"],
    searchQuery: "阿尔托 Stool60 三足凳", searchQueryEn: "Aalto Stool 60 L-leg Artek" },
  { id: "unikko", day: 15, cat: "poster", title: "Unikko 罂粟花图案", designer: "玛依娅·伊索拉 Maija Isola / Marimekko", year: 1964,
    field: "图案 · 纺织设计", movement: "芬兰纺织设计",
    intro: "老板宣布「绝不做花卉印花」,伊索拉偏画出一朵巨大到出框的罂粟——违抗命令的图案成了芬兰的国民符号。",
    points: [
      { h: "尺度的反叛", p: "花朵被放大到超出布幅、边缘被裁切,甜美题材因巨大尺度获得抽象力量。改变尺度,就能改变题材的性格。" },
      { h: "不完美的笔触", p: "花瓣保留手绘的歪斜与色块错位,印刷不修正它们。机器时代刻意保留的手感,是图案的心跳。" },
      { h: "图案作为态度", p: "Marimekko的印花与解放的着装方式绑定,布料参与了社会风气的塑造。纹样从不只是装饰。" },
    ],
    exercise: "把任意小物(回形针、纽扣)放大二十倍画满一张A4,观察尺度如何改变它的气质。",
    videoOutline: ["Marimekko与芬兰设计崛起", "Unikko诞生的违命故事", "图案尺度与印花工艺"],
    searchQuery: "Marimekko Unikko 罂粟花 图案", searchQueryEn: "Marimekko Unikko Maija Isola pattern" },
  { id: "lego", day: 15, cat: "product", title: "乐高积木凸管专利", designer: "戈特弗雷德·柯克·克里斯蒂安森", year: 1958,
    field: "产品 · 玩具设计", movement: "系统设计",
    intro: "凸点与内管的咬合专利:让两块小砖既咬得紧又拆得开——一个夹持结构,支撑起一个无限组合的宇宙。",
    points: [
      { h: "夹持力的甜点", p: "凸管结构在「稳固」与「可拆」之间找到精确平衡点。伟大的系统往往悬于一个微小的物理参数之上。" },
      { h: "向后兼容的承诺", p: "1958年的砖至今仍能咬合新砖。六十余年的接口不变,是对用户资产最深的敬意。" },
      { h: "系统而非玩具", p: "乐高卖的不是造型而是「组合语法」。当产品成为开放系统,用户便成了共同设计师。" },
    ],
    exercise: "找两个不同品牌的可拼插玩具,比较其咬合手感,猜测公差设计的差异。",
    videoOutline: ["从木玩具到塑料系统", "凸管结构与精密模具", "平台化产品的设计逻辑"],
    searchQuery: "乐高 积木 凸管专利 设计", searchQueryEn: "LEGO brick stud tube patent design" },
  { id: "beogram", day: 15, cat: "product", title: "Beogram 4000 唱机", designer: "雅各布·延森 Jacob Jensen / B&O", year: 1972,
    field: "产品 · 工业设计", movement: "丹麦极简电子",
    intro: "切线循迹臂如仪器般平移过唱片——铝面、细线与克制的灰阶,定义了「昂贵的安静」这一北欧高端语言。",
    points: [
      { h: "技术的可见诗", p: "切线臂解决循迹失真,其缓缓平移的动作本身被展示为仪式。把核心技术转化为可观赏的动态,是高端产品的叙事法。" },
      { h: "拉丝铝的语法", p: "阳极氧化铝、发丝纹、精细刻字——延森为B&O建立的材料语法,后来被整个高端电子行业借用。" },
      { h: "操作的减字诀", p: "面板元素极少,多数动作自动完成。奢侈的一种定义:替你省去的操作。" },
    ],
    exercise: "找出你设备上一处「自动完成」的功能,写下它替你省去了哪几步旧操作。",
    videoOutline: ["延森与B&O设计语言", "切线循迹臂的技术原理", "北欧高端电子美学谱系"],
    searchQuery: "B&O Beogram4000 唱机 设计", searchQueryEn: "Beogram 4000 Jacob Jensen tangential" },

  /* ---- 主题日 D17 · 日本设计 II ---- */
  { id: "victory-1945", day: 16, cat: "poster", title: "《VICTORY 1945》海报", designer: "福田繁雄", year: 1975,
    field: "海报 · 平面设计", movement: "日本视觉幽默",
    intro: "一枚炮弹掉头飞回炮管——战争胜利三十周年之际,一个视觉反转道尽「加害者终自伤」的反战寓言。",
    points: [
      { h: "一秒钟的顿悟", p: "画面只有炮管与倒飞的炮弹,观者在半秒内完成「发现—会意」。好的观念海报把论文压缩为一个视觉瞬间。" },
      { h: "幽默的锋利", p: "福田用玩笑的语气说最沉重的话。幽默不是消解严肃,而是让批判绕过心理防线。" },
      { h: "极简的剧场", p: "纯色底、剪影形、无文字说明。删除一切辅助信息,是对观者智力的信任,也是对图形力量的自信。" },
    ],
    exercise: "选一个社会议题,只用「一个物体+一处反常」构思三个无文字海报草图。",
    videoOutline: ["福田繁雄的错视与幽默", "观念海报的构思方法", "反战主题的视觉修辞史"],
    searchQuery: "福田繁雄 VICTORY 海报 反战", searchQueryEn: "Shigeo Fukuda Victory 1945 poster" },
  { id: "yokoo", day: 16, cat: "poster", title: "横尾忠则剧团海报", designer: "横尾忠则", year: 1966,
    field: "海报 · 平面设计", movement: "日本迷幻波普",
    intro: "旭日、浮世绘、霓虹粉与拼贴照片挤作一团——在瑞士极简当道之时,横尾用「过剩」开辟了另一条现代之路。",
    points: [
      { h: "对国际风格的起义", p: "当主流膜拜网格与留白,横尾拥抱杂乱、俗艳与本土符号。设计史由主流与叛军共同写成。" },
      { h: "土俗的前卫", p: "祭典配色、货郎招贴等「低级」视觉被他升格为前卫语言。所谓品味鄙视链,常是尚未被翻译的资源。" },
      { h: "个人宇宙的公共化", p: "私人梦境、执念与偶像被直接印上商业海报。作者性的极端在场,预告了设计师明星化的时代。" },
    ],
    exercise: "收集五张你家乡「土味」视觉(招牌、包装),分析其配色与构图的隐藏规则。",
    videoOutline: ["六十年代日本前卫剧场", "横尾忠则的拼贴语言", "土俗美学的当代转译"],
    searchQuery: "横尾忠则 海报 迷幻 解析", searchQueryEn: "Tadanori Yokoo poster psychedelic design" },
  { id: "pleats-please", day: 16, cat: "fashion", title: "Pleats Please 褶皱系列", designer: "三宅一生", year: 1993,
    field: "服装 · 系统设计", movement: "日本当代时装",
    intro: "先裁剪后打褶的工艺倒置:一块布经热压获得记忆,轻若无物、随身而动、卷起即走——服装成为可量产的雕塑。",
    points: [
      { h: "工艺顺序的翻转", p: "常规是先打褶布料再裁剪,三宅倒转为先成衣后热压。翻转既有流程的顺序,常能打开新的形态大陆。" },
      { h: "一块布的哲学", p: "「A Piece of Cloth」贯穿其生涯:从整块布出发思考身体与布的关系,而非从西式立体剪裁的版型出发。" },
      { h: "民主的高级时装", p: "免烫、耐皱、可机洗、价格可及——先锋形态与日常实用罕见地统一。实验若不落地,只是橱窗里的宣言。" },
    ],
    exercise: "把一张纸反复折出规律褶皱后展开再揉团,观察「记忆」如何改变材料的行为。",
    videoOutline: ["三宅一生的一块布理念", "热压褶皱工艺流程", "时装与工业设计的方法互鉴"],
    searchQuery: "三宅一生 褶皱 Pleats Please", searchQueryEn: "Issey Miyake Pleats Please design" },
  { id: "nagai-life", day: 16, cat: "poster", title: "LIFE 系列海报", designer: "永井一正", year: 1988,
    field: "海报 · 平面设计", movement: "日本平面设计",
    intro: "从几何抽象转向手绘动物:布满细密线条的鹤、鹿与游鱼凝视观者——一位大师晚年向「生命」的漫长致敬。",
    points: [
      { h: "晚期风格的勇气", p: "永井盛年以精密几何著称,五十余岁转向稚拙手绘。推翻自己成熟的语言,比建立它更难。" },
      { h: "线条的呼吸感", p: "上万条颤动的手绘短线织出皮毛与鳞羽,机械复制时代里,笔触的微颤成了「生命」的直接证词。" },
      { h: "凝视的伦理", p: "动物正面直视观者,人与自然的位置被悄然对调。海报可以不推销任何东西,只发出一次注视。" },
    ],
    exercise: "用单色笔以短线「织」出一只手掌,不许用轮廓线,体会线条密度如何塑形。",
    videoOutline: ["永井一正的风格转变", "LIFE系列的线条语言", "生态主题的海报表达"],
    searchQuery: "永井一正 LIFE 海报 动物", searchQueryEn: "Kazumasa Nagai LIFE poster animals" },
  { id: "meiji-milk", day: 16, cat: "product", title: "明治「美味牛奶」包装", designer: "佐藤卓", year: 2001,
    field: "包装 · 品牌设计", movement: "日本日常设计",
    intro: "一盒看似「没设计过」的牛奶:白底、蓝字、一杯牛奶照片——克制到近乎匿名,却统治货架二十余年。",
    points: [
      { h: "日常的再设计", p: "佐藤卓主张为「每天出现一百次」的物品做设计:它必须耐看、不打扰、经得起十年注视。惊艳是短跑,日常是马拉松。" },
      { h: "信息的秩序感", p: "品名、卖点、容量的字号层级与留白经过精密推敲。看似朴素的包装,是被计算到毫米的秩序。" },
      { h: "解剖设计的态度", p: "佐藤后来发起「设计的解剖」展,把这盒牛奶层层拆解展示。向公众解释设计,也是设计师的职责。" },
    ],
    exercise: "从冰箱里拿出三件包装,评选「最耐看」的一件,列出它克制在哪三处。",
    videoOutline: ["佐藤卓与日常设计观", "牛奶包装的信息层级分析", "「设计的解剖」展览方法"],
    searchQuery: "佐藤卓 明治牛奶 包装设计", searchQueryEn: "Taku Satoh Meiji milk package design" },

  /* ---- 主题日 D18 · 美国平面与广告 ---- */
  { id: "think-small", day: 17, cat: "poster", title: "「Think Small」甲壳虫广告", designer: "DDB / 赫尔穆特·克罗恩", year: 1959,
    field: "广告 · 平面设计", movement: "创意革命",
    intro: "整版留白里一辆小小的甲壳虫:在吹嘘成风的美国车市,一句自嘲开启了广告的「创意革命」。",
    points: [
      { h: "诚实作为策略", p: "承认车小、其貌不扬,反而赢得信任。当所有人夸张时,坦白就是最大的差异化。" },
      { h: "留白的胆量", p: "昂贵版面大片空置,把「小」演给你看。形式完全服务于概念——版式即论点。" },
      { h: "文案与美术的合体", p: "DDB首创文案与美术指导结对工作,图文从此互为因果而非彼此装饰。协作结构的改革催生了创意的黄金时代。" },
    ],
    exercise: "为一件你产品化的缺点(如「续航短」)写一句坦白式广告语,并设计版面示意。",
    videoOutline: ["创意革命与DDB方法", "Think Small系列的版面分析", "诚实广告的当代案例"],
    searchQuery: "Think Small 甲壳虫广告 DDB", searchQueryEn: "Think Small VW ad DDB creative revolution" },
  { id: "avant-garde", day: 17, cat: "type", title: "Avant Garde 标志与字体", designer: "赫布·卢巴林 Herb Lubalin", year: 1968,
    field: "字体 · 平面设计", movement: "美国表现主义排印",
    intro: "为先锋杂志设计的刊头连字:字母相互嵌套斜倚,紧到极限——排印第一次公然以「亲密」为美。",
    points: [
      { h: "负空间的雕刻", p: "卢巴林把字距压到笔画即将相触,字间空隙成为被雕刻的形。排印的对象不止字形,更是字与字之间的空气。" },
      { h: "连字的表达力", p: "AV共享斜边、GA相互咬合——连字不是装饰花样,而是让词组成为一个不可拆分的图形整体。" },
      { h: "被误用的警示", p: "这套为刊头定制的连字被滥用于正文,饱受批评。字体有其设计语境,越界使用是设计素养的试金石。" },
    ],
    exercise: "把你名字缩写的两个字母尝试五种「共享笔画」的连字方案。",
    videoOutline: ["卢巴林与表现主义排印", "Avant Garde连字系统解析", "字体使用语境的讨论"],
    searchQuery: "卢巴林 Avant Garde 字体 连字", searchQueryEn: "Herb Lubalin Avant Garde ligatures" },
  { id: "mtv", day: 17, cat: "logo", title: "MTV 标志", designer: "Manhattan Design", year: 1981,
    field: "标志 · 品牌设计", movement: "美国流行文化设计",
    intro: "一个骨架恒定、表皮千变的M+TV:标志史上第一次,「不断变化」本身成为识别的核心。",
    points: [
      { h: "可变识别的开端", p: "粗壮的M与喷漆的TV轮廓不变,填充图案随节目任意更换。它预言了四十年后的动态品牌浪潮。" },
      { h: "涂鸦的合法化", p: "喷漆字形把街头涂鸦文化迎入主流商业识别。品牌年轻化的本质是符号系统的换血。" },
      { h: "频道即态度", p: "标志的躁动多变本身就是「音乐电视」这一新媒介的性格说明书。标志应当表演品牌,而不只是标记它。" },
    ],
    exercise: "为你的个人签名设计一个「骨架不变、表皮可换」的系统,画出三种皮肤。",
    videoOutline: ["MTV与音乐电视的诞生", "可变标志系统的机制", "动态品牌的当代实践"],
    searchQuery: "MTV 标志 可变识别 设计", searchQueryEn: "MTV logo flexible identity design" },
  { id: "public-theater", day: 17, cat: "poster", title: "公共剧院视觉识别", designer: "宝拉·舍尔 Paula Scher", year: 1994,
    field: "海报 · 品牌设计", movement: "美国当代平面设计",
    intro: "木刻字体挤满海报、标语斜冲出血——舍尔从街头拳赛招贴中提炼出「城市的音量」,让剧院海报重新喧哗。",
    points: [
      { h: "历史素材的再武装", p: "十九世纪木活字招贴的密集排字被她接入当代街头。传统不是包袱,是等待重新通电的线路。" },
      { h: "文字即图像", p: "没有插图,字号的暴涨暴缩、方向的冲撞就是全部画面。当文字足够有姿态,图像便是多余。" },
      { h: "识别的音色", p: "这套系统的识别性不靠固定标志,而靠一种「嗓门」——鲜明的排印性格同样可以成为品牌资产。" },
    ],
    exercise: "只用一种字体的不同字号与方向,为一场校园演出排一张「大声」的海报。",
    videoOutline: ["舍尔与Pentagram的实践", "木活字传统的当代转译", "以排印性格建立识别"],
    searchQuery: "宝拉舍尔 公共剧院 海报", searchQueryEn: "Paula Scher Public Theater posters" },
  { id: "hope-poster", day: 17, cat: "poster", title: "《HOPE》竞选海报", designer: "谢泼德·费尔雷 Shepard Fairey", year: 2008,
    field: "海报 · 平面设计", movement: "街头艺术 / 政治传播",
    intro: "红蓝米三色的模板化肖像配一个单词:一张源自街头贴纸文化的海报,成为社交媒体时代政治图像的分水岭。",
    points: [
      { h: "模板化的传播力", p: "色彩简化到三色、形体简化到模板,使它极易被复制、改编与再创作。可被二创的图像,才能在网络时代病毒式生长。" },
      { h: "单词的重量", p: "不喊政纲,只押一个抽象词。词越空,容纳的投射越多——这既是传播的智慧,也是需要警惕的修辞术。" },
      { h: "版权的余震", p: "海报因原始照片版权陷入多年诉讼。挪用文化与知识产权的冲突,是每个创作者的必修边界课。" },
    ],
    exercise: "把一张自己的照片手动简化为三个色块层,体会模板化对辨识与情绪的双重影响。",
    videoOutline: ["街头艺术进入主流政治", "三色模板的图像学分析", "挪用与版权的争议始末"],
    searchQuery: "HOPE 海报 费尔雷 设计分析", searchQueryEn: "Shepard Fairey Hope poster analysis" },

  /* ---- 主题日 D19 · 数字时代的体验 ---- */
  { id: "google-home", day: 18, cat: "info", title: "Google 极简首页", designer: "拉里·佩奇 / 谷歌团队", year: 1998,
    field: "界面 · 交互设计", movement: "网页设计",
    intro: "在门户网站堆满链接的年代,一个标志加一个输入框——「简陋」的首页把速度与专注变成了商业哲学。",
    points: [
      { h: "无知造就的极简", p: "初版简陋部分因为创始人不会写复杂HTML。设计史上不少经典始于约束与无能,重要的是事后把它坚持为原则。" },
      { h: "以毫秒为美学", p: "首页字节数被长期严控,「快」被当作首要设计指标。性能是最容易被忽视的用户体验。" },
      { h: "一个框的信任", p: "把一切复杂性藏进一个输入框背后,是对后端能力的自信,也是对用户注意力的敬畏。" },
    ],
    exercise: "统计你常用三个App首页的可点击元素数量,思考各自「删到多少」仍能完成核心任务。",
    videoOutline: ["门户时代与搜索引擎之争", "首页极简的性能账本", "单一入口的交互哲学"],
    searchQuery: "谷歌首页 极简设计 历史", searchQueryEn: "Google homepage minimalist design history" },
  { id: "dyson-dc01", day: 18, cat: "product", title: "Dyson DC01 吸尘器", designer: "詹姆斯·戴森 James Dyson", year: 1993,
    field: "产品 · 工业设计", movement: "英国工程设计",
    intro: "5127个原型之后:透明集尘筒把「看见灰尘」变成卖点,气旋技术以黄灰撞色高调示人——工程本身成为风格。",
    points: [
      { h: "透明的反常识", p: "行规认为顾客不想看见脏物,戴森偏用透明筒展示吸力战果。挑战行业「常识」前,先追问它是否只是惯性。" },
      { h: "技术的色彩标注", p: "关键功能件以高亮黄色标出,像工程图纸的引注。配色系统在此是功能说明书,不是装饰方案。" },
      { h: "迭代的马拉松", p: "5127个原型、十五年无人投产的坚持,提醒我们:激进创新的成本表里,时间是最大一项。" },
    ],
    exercise: "选一件内部结构有趣的家电,构想若外壳局部透明,应「开窗」展示哪个部件。",
    videoOutline: ["气旋分离技术原理", "5127个原型的迭代故事", "工程美学的产品语言"],
    searchQuery: "戴森 DC01 吸尘器 设计", searchQueryEn: "Dyson DC01 vacuum design story" },
  { id: "wii-remote", day: 18, cat: "product", title: "Wii 遥控器手柄", designer: "任天堂设计团队", year: 2006,
    field: "产品 · 交互设计", movement: "日本消费电子",
    intro: "游戏手柄伪装成电视遥控器:一个亲切的旧外形装进体感新技术,把祖母与孙子拉到同一块屏幕前。",
    points: [
      { h: "外形的心理学", p: "选择遥控器而非手柄形态,是为了让非玩家「敢拿起来」。降低心理门槛,常比增加功能更能扩大用户版图。" },
      { h: "动作即输入", p: "挥动、指向、倾斜替代按键组合,身体记忆成为操作说明书。最好的教学是唤起用户已会的动作。" },
      { h: "蓝海的设计起点", p: "Wii放弃机能竞赛,转向「无游戏经验人群」。定义对手与战场,是比造型更早的设计决策。" },
    ],
    exercise: "为一位从不玩游戏的长辈观察其使用电视遥控器的动作,记录三个可借用的习惯。",
    videoOutline: ["Wii的蓝海战略背景", "体感交互的技术与隐喻", "家庭场景的包容性设计"],
    searchQuery: "Wii 手柄 体感 设计", searchQueryEn: "Wii Remote motion control design" },
  { id: "kindle", day: 18, cat: "product", title: "Kindle 电子阅读器", designer: "亚马逊 Lab126", year: 2007,
    field: "产品 · 交互设计", movement: "平静技术",
    intro: "电子墨水不发光、翻页有残影、机身灰而钝——一台故意「无聊」的设备,只为让你忘记设备而记住书。",
    points: [
      { h: "消失即胜利", p: "屏幕如纸、无通知打扰,产品追求被遗忘而非被把玩。「平静技术」主张:最好的界面是不出现的界面。" },
      { h: "单一场景的深挖", p: "拒绝彩屏与多功能诱惑,把「长时间读文字」这一件事做到极限。产品的锋利来自敢于只做一件事。" },
      { h: "生态先于硬件", p: "一键购书与云端书库让硬件成为服务入口。数字时代的产品设计,半数功夫在看不见的系统侧。" },
    ],
    exercise: "记录你今天被手机通知打断阅读的次数,构想一个「平静模式」的交互方案。",
    videoOutline: ["电子墨水技术的取舍", "平静技术设计理念", "内容生态与硬件的关系"],
    searchQuery: "Kindle 电子墨水 阅读器 设计", searchQueryEn: "Kindle e-ink reader calm technology design" },
  { id: "nest", day: 18, cat: "product", title: "Nest 智能恒温器", designer: "托尼·法德尔 Tony Fadell", year: 2011,
    field: "产品 · 交互设计", movement: "智能家居设计",
    intro: "iPod之父盯上了墙上最被嫌弃的塑料盒子:一个会学习的金属圆环,证明「无聊品类」正是设计的富矿。",
    points: [
      { h: "选题即洞察", p: "恒温器人人要用、人人厌烦、几十年无人认真设计——法德尔的第一步不是造型,而是选中被忽视的日常。" },
      { h: "一个旋钮的全部", p: "旋转调温、按压确认,交互被压缩进一个环。把复杂系统翻译为单一直觉动作,是交互设计的至高压缩术。" },
      { h: "学习替代设置", p: "它记录你的习惯自动编程,把「配置」这项苦差从用户清单上划掉。智能的意义是删除任务,不是添加功能。" },
    ],
    exercise: "在你的住所找出「最被嫌弃却天天使用」的一件设备,写一份重设计立项书。",
    videoOutline: ["从iPod到Nest的产品方法", "单旋钮交互的层级设计", "机器学习与体验的结合"],
    searchQuery: "Nest 恒温器 设计 解析", searchQueryEn: "Nest thermostat Tony Fadell design" },

  /* ---- 主题日 D20 · 中国设计与东方回响 ---- */
  { id: "beijing-2008", day: 19, cat: "logo", title: "北京2008「中国印·舞动的北京」", designer: "郭春宁（始创国际团队）", year: 2003,
    field: "标志 · 平面设计", movement: "中国当代设计",
    intro: "一方朱红印章里,「京」字化作冲线的人形——篆刻、书法与运动激情在方寸间完成三重曝光。",
    points: [
      { h: "印章的文化重量", p: "印在中国文化里意味着承诺与信用。以「盖章」为形,是把国家承诺压进了标志的语义底层。" },
      { h: "字形的身体化", p: "「京」字笔画被驯化为舞动人形,汉字的表意基因让这种双关天然成立。汉字是中文设计独有的图形富矿。" },
      { h: "笔触的温度", p: "印痕边缘保留手工镌刻的毛糙,对抗电脑图形的完美冰冷。数字时代,「手」的痕迹成为稀缺的诚意。" },
    ],
    exercise: "选一个汉字,尝试让它的笔画「做出一个动作」,画三版草图。",
    videoOutline: ["奥运会徽的评选过程", "印章与汉字的图形转译", "国家形象设计的语法"],
    searchQuery: "中国印 舞动的北京 会徽 设计", searchQueryEn: "Beijing 2008 Olympics emblem Chinese seal" },
  { id: "kan-hanzi", day: 19, cat: "poster", title: "「汉字」主题海报系列", designer: "靳埭强", year: 1995,
    field: "海报 · 平面设计", movement: "华人现代设计",
    intro: "「山」字旁真的立着石,「水」字边真的淌着墨——文字与实物在宣纸留白中互证,水墨美学接通现代版面。",
    points: [
      { h: "字与物的互文", p: "书法字与实物摄影并置,能指与所指在同一画面相认。这是只有表意文字体系才可能的设计游戏。" },
      { h: "留白的现代转译", p: "大面积空白承自山水画的「计白当黑」,又暗合瑞士版面的呼吸感。两种留白传统在此合流。" },
      { h: "文人设计的路径", p: "靳埭强示范了一条道路:不靠符号堆砌,而以水墨的气韵与哲思参与国际对话。文化自信是方法,不是口号。" },
    ],
    exercise: "选「木、火、雨」任一字,用书写的字与一件实物拍一张「互证」的构成照片。",
    videoOutline: ["靳埭强的水墨设计语言", "汉字系列的构成分析", "东方留白与瑞士留白的对话"],
    searchQuery: "靳埭强 汉字 海报 水墨", searchQueryEn: "Kan Tai-keung Chinese character posters ink" },
  { id: "chen-coca", day: 19, cat: "type", title: "可口可乐中文标准字", designer: "陈幼坚", year: 2003,
    field: "字体 · 品牌设计", movement: "华人品牌设计",
    intro: "让四个汉字「流动」起来:笔画的飘带弧度与英文斯宾塞体血脉相认——跨文字系统品牌转译的教科书。",
    points: [
      { h: "神似高于形似", p: "陈幼坚不描摹英文字形,而是提取其「流动飘逸」的性格重写汉字骨骼。翻译品牌,译的是气质不是笔画。" },
      { h: "汉字的书法余地", p: "连笔、出锋与弧线在汉字传统中自有出处,西方品牌基因得以嫁接在书法语法上而不显生硬。" },
      { h: "全球与在地的握手", p: "国际品牌的中文字标是两种文字文明的谈判桌。设计师是坐在中间的翻译官。" },
    ],
    exercise: "选一个国际品牌,分析其现有中文字标「译」出了原标志的哪些性格、丢了哪些。",
    videoOutline: ["陈幼坚的东情西韵", "跨文字系统的品牌转译", "中文字标设计的方法"],
    searchQuery: "陈幼坚 可口可乐 中文字体", searchQueryEn: "Alan Chan Coca-Cola Chinese logotype" },
  { id: "china-pavilion", day: 19, cat: "arch", title: "上海世博会中国馆「东方之冠」", designer: "何镜堂（团队）", year: 2010,
    field: "建筑 · 当代建筑", movement: "中国当代建筑",
    intro: "层层出挑的「中国红」斗冠:传统斗拱的力学词汇被放大为国家展馆的形体宣言。",
    points: [
      { h: "构件的纪念碑化", p: "斗拱本是屋檐下的小构件,被提取、放大为整座建筑的形式母题。传统的现代化,常始于对一个「零件」的重新聚焦。" },
      { h: "中国红的七种红", p: "外墙实际由多种红色渐变拼成,以在不同光线与距离下呈现统一的「中国红」。看似单色,实为色彩工程。" },
      { h: "巨构的争议", p: "有人赞其气度,有人批其符号直白。国家级项目的美学讨论,是理解设计与权力关系的活教材。" },
    ],
    exercise: "找一个传统建筑小构件(瓦当、雀替、窗棂),画一版把它「放大为建筑」的构想草图。",
    videoOutline: ["世博会与国家馆设计传统", "斗拱转译的形式分析", "中国红的色彩工程细节"],
    searchQuery: "中国馆 东方之冠 何镜堂 设计", searchQueryEn: "China Pavilion Expo 2010 Oriental Crown" },
  { id: "phoenix-bike", day: 19, cat: "vehicle", title: "凤凰牌二八自行车", designer: "上海自行车三厂", year: 1959,
    field: "交通工具 · 工业设计", movement: "中国国民设计",
    intro: "「二八大杠」:黑漆车架、镀铬车圈与凤凰标——三大件时代的国民座驾,一件被亿万人日常验证的耐用设计。",
    points: [
      { h: "耐用的美德", p: "加粗车架、载重后架与全链罩,一切为「一车用二十年、还能带一家人」而设计。在物资匮乏时代,耐久就是最高的用户体验。" },
      { h: "维修友好的系统", p: "标准化零件让街头修车摊就能维护一切。可维修性是被当代设计遗忘、又正被重新捡起的价值。" },
      { h: "器物与集体记忆", p: "横杠上的孩子、后座上的爱人——二八车承载的使用记忆已成文化遗产。研究设计,也要研究人们如何「过」一件物。" },
    ],
    exercise: "访谈一位长辈关于他们第一辆自行车的记忆,记录三个与设计细节相关的故事。",
    videoOutline: ["三大件时代的工业叙事", "二八车的结构与耐用设计", "共享单车时代的对照反思"],
    searchQuery: "凤凰牌 二八自行车 设计 历史", searchQueryEn: "Phoenix bicycle China classic design" },

];

const DAY_THEMES = [
  { name: "现代主义的起点", desc: "从包豪斯到风格派：观察功能、材料与几何如何取代装饰，成为二十世纪设计的新语法。" },
  { name: "功能主义与瑞士平面", desc: "拉姆斯的克制、瑞士网格的理性、信息设计的诞生：学习「少」如何成为最有力的表达。" },
  { name: "东方美学与当代经典", desc: "从东京到纽约再到硅谷：看留白、情感与体验如何塑造我们身处的当代设计世界。" },
  { name: "字体的世纪", desc: "从文艺复兴刻字匠到瑞士系统：五款字体，五种时代精神的容器。" },
  { name: "海报的黄金时代", desc: "从石版印刷到观念海报：学习一张纸如何在三秒内抓住街头的目光。" },
  { name: "标志与品牌", desc: "五个传世标志的诞生与演化：符号的意义如何被设计、被喂养、被守护。" },
  { name: "椅子的一百年", desc: "从蒸汽弯木到玻璃钢壳体：椅子是材料史、工艺史与身体史的交汇点。" },
  { name: "灯具与光", desc: "设计的对象是光而非灯：五件作品各自回答「光应当如何存在于房间」。" },
  { name: "日常器物", desc: "咖啡壶、削皮器与CD机：伟大的设计常隐身于最平凡的清晨与厨房。" },
  { name: "交通工具", desc: "从甲壳虫到新干线：速度、空间与国民生活如何被造型语言承载。" },
  { name: "电子产品", desc: "从袖珍收音机到iPod：便携电子设备五十年的界面语法演化。" },
  { name: "书籍与编辑设计", desc: "从企鹅规则到书籍五感：纸页之间的秩序、节奏与身体经验。" },
  { name: "信息与界面", desc: "从统计图示到设计系统：让复杂向所有人敞开，是信息设计的政治承诺。" },
  { name: "建筑经典 II", desc: "从萨伏伊到光之教堂：空间、光与材料的五堂大师课。" },
  { name: "战后意大利设计", desc: "激进、幽默与工程的合谋：意大利如何把设计变成一种国民态度。" },
  { name: "北欧设计", desc: "有机曲线、桦木与民主：北欧现代主义给理性补上的那份温度。" },
  { name: "日本设计 II", desc: "错视幽默、迷幻土俗与一块布：日本设计的多声部合唱。" },
  { name: "美国平面与广告", desc: "创意革命、可变标志与街头模板：美国视觉文化的音量与锋芒。" },
  { name: "数字时代的体验", desc: "极简首页、平静技术与学习型硬件：体验设计的当代前沿。" },
  { name: "中国设计与东方回响", desc: "印章、水墨、斗拱与二八大杠：中文语境下的现代设计路径。" },
];

const BADGES = [
  { id: "first-look", icon: "◔", name: "初次凝视", desc: "完成第 1 个案例学习", blue: true, test: s => s.total >= 1 },
  { id: "first-close", icon: "◉", name: "首日闭馆", desc: "完成一整日 5 个案例", test: s => s.fullDays >= 1 },
  { id: "streak-3", icon: "☰", name: "三日连贯", desc: "连续 3 天完成每日学习", test: s => s.streak >= 3 },
  { id: "streak-7", icon: "❋", name: "七日成习", desc: "连续 7 天完成每日学习", test: s => s.streak >= 7 },
  { id: "night-owl", icon: "☾", name: "夜场常客", desc: "闭馆后累计加映研习 10 件", blue: true, test: s => s.extraTotal >= 10 },
  { id: "quarter", icon: "◧", name: "四分之一馆藏", desc: "研习过 25 件不同案例", test: s => s.uniqueCount >= 25 },
  { id: "half", icon: "◑", name: "半座美术馆", desc: "研习过 50 件不同案例", blue: true, test: s => s.uniqueCount >= 50 },
  { id: "connoisseur", icon: "✦", name: "鉴赏家之眼", desc: "累计完成 60 次案例学习", test: s => s.total >= 60 },
  { id: "full-tour", icon: "▦", name: "全馆巡礼", desc: "学完案例库全部 100 件经典", test: s => s.uniqueCount >= 100 },
];

/* ---------------- 工具函数 ---------------- */
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const dayIndexOf = key => Math.floor(Date.parse(key + "T00:00:00") / 86400000) % DAY_THEMES.length;
const casesForDay = key => CASES.filter(c => c.day === dayIndexOf(key));
const fmtDate = key => {
  const [y, m, d] = key.split("-");
  const wd = "日一二三四五六"[new Date(key + "T00:00:00").getDay()];
  return `${y}年${+m}月${+d}日 · 周${wd}`;
};
/* 把常见分享链接自动转换为「允许被 iframe 嵌入」的播放器地址。
   直接嵌入 watch 页 / 视频页会被站点的 X-Frame-Options 阻挡，
   必须转换为官方嵌入端点：
   - YouTube → www.youtube-nocookie.com/embed/{id}（嵌入专用域，兼容性最好）
   - B 站    → player.bilibili.com/player.html?bvid=…（官方外链播放器） */
const toEmbed = raw => {
  const url = (raw || "").trim();
  if (!url) return null;
  try {
    const u = new URL(url.includes("://") ? url : "https://" + url);
    const host = u.hostname.replace(/^www\./, "");

    /* ---- YouTube 系列 ---- */
    const yt = id => id ? { src: `https://www.youtube-nocookie.com/embed/${id}?rel=0`, site: "youtube" } : null;
    if (host === "youtu.be") return yt(u.pathname.split("/")[1]);
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      if (u.searchParams.get("v")) return yt(u.searchParams.get("v"));
      const m = u.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{6,})/);
      if (m) return yt(m[1]);
    }

    /* ---- B 站系列 ---- */
    if (host === "b23.tv") return { short: true }; // 短链无法离线还原，提示用户展开
    if (host.endsWith("bilibili.com")) {
      const base = "https://player.bilibili.com/player.html";
      const common = "&high_quality=1&danmaku=0&autoplay=0";
      if (host.startsWith("player.")) {
        // 已是播放器地址：确保 https 并补齐参数
        return { src: `${base}?${u.search.replace(/^\?/, "")}${u.search.includes("high_quality") ? "" : common}`, site: "bilibili" };
      }
      const bv = url.match(/(BV[0-9A-Za-z]{8,})/);
      if (bv) {
        const page = u.searchParams.get("p") || "1";
        return { src: `${base}?bvid=${bv[1]}&page=${page}${common}`, site: "bilibili" };
      }
      const av = url.match(/av(\d+)/i);
      if (av) return { src: `${base}?aid=${av[1]}${common}`, site: "bilibili" };
    }
  } catch (e) { /* 非法链接：退回普通链接展示 */ }
  return null;
};

const STORAGE_KEY = "aesthetic-atelier-v1";

/* ---------------- 进度环 ---------------- */
function ProgressRing({ done, total }) {
  const R = 30, C = 2 * Math.PI * R, seg = C / total, gap = 5;
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" role="img" aria-label={`今日进度 ${done}/${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <circle key={i} cx="38" cy="38" r={R} fill="none"
          stroke={i < done ? "var(--blue)" : "var(--line)"} strokeWidth="7"
          strokeDasharray={`${seg - gap} ${C - seg + gap}`}
          strokeDashoffset={-i * seg + C / 4} strokeLinecap="butt" />
      ))}
      <text x="38" y="43" textAnchor="middle" fontFamily="Archivo,sans-serif" fontWeight="700" fontSize="15" fill="var(--ink)">
        {done}/{total}
      </text>
    </svg>
  );
}

/* ---------------- 案例卡 ---------------- */
function CaseCard({ c, i, done, open, onToggle, onFinish, onReset, resetNote, savedLink, onSaveLink }) {
  const [draft, setDraft] = useState(savedLink || "");
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => setDraft(savedLink || ""), [savedLink]);
  useEffect(() => { setConfirmReset(false); }, [open, done]); // 折叠或状态变化时退出确认态
  const embed = savedLink ? toEmbed(savedLink) : null;
  const q = encodeURIComponent(c.searchQuery);          // 中文 → B 站
  const qEn = encodeURIComponent(c.searchQueryEn || c.searchQuery); // 英文 → YouTube

  return (
    <article className={`case ${done ? "done" : ""} ${open ? "open" : ""}`}>
      <button className="case-row" onClick={onToggle} aria-expanded={open}>
        <div className="thumb" aria-hidden="true">{getVisual(c)}</div>
        <div className="info">
          <div className="meta">No.{String(i + 1).padStart(2, "0")} · {c.field}</div>
          <h3>{c.title}</h3>
          <div className="sub">{c.designer} · {c.year} · {c.movement}</div>
        </div>
        <div className="status">
          <span className={`pill ${done ? "ok" : "todo"}`}>{done ? "已研习" : "待研习"}</span>
          <span className="chev" aria-hidden="true">▼</span>
        </div>
      </button>

      {open && (
        <div className="case-body">
          <div className="artwork">{getVisual(c)}</div>
          <p className="artwork-note">
            上图为原创几何示意研究图。建议同时检索原作高清图对照观看：
            <a href={`https://www.google.com/search?tbm=isch&q=${q}`} target="_blank" rel="noreferrer"> 搜索原作图片 ↗</a>
          </p>

          <p style={{ fontSize: 14.5, marginBottom: 4 }}><b style={{ color: "var(--blue)" }}>导览 · </b>{c.intro}</p>

          <div className="sec-title"><span className="idx">01 图文研习</span>设计要点解析</div>
          <div className="points">
            {c.points.map((pt, k) => (
              <div className="point" key={k}><h4>{pt.h}</h4><p>{pt.p}</p></div>
            ))}
          </div>
          <div className="exercise"><b>观察练习 · </b>{c.exercise}</div>

          <div className="sec-title"><span className="idx">02 视频解析</span>经典讲解应关注的内容</div>
          <div className="video-box">
            <ul className="video-outline">
              {c.videoOutline.map((v, k) => <li key={k}>{v}</li>)}
            </ul>
            <div className="video-actions">
              <a className="btn" href={`https://search.bilibili.com/all?keyword=${q}`} target="_blank" rel="noreferrer">在 B 站搜索讲解（中文）↗</a>
              <a className="btn" href={`https://www.youtube.com/results?search_query=${qEn}`} target="_blank" rel="noreferrer">在 YouTube 搜索（English）↗</a>
            </div>
            <div className="link-row">
              <input value={draft} onChange={e => setDraft(e.target.value)}
                placeholder="粘贴 B 站或 YouTube 视频链接，保存后自动转换为可嵌入格式并在此播放"
                aria-label="视频链接" />
              <button className="btn" onClick={() => onSaveLink(draft.trim())}>保存链接</button>
            </div>
            {savedLink && embed && embed.src && (
              <>
                <div className="video-frame">
                  <iframe
                    src={embed.src}
                    title={`${c.title} 讲解视频`}
                    scrolling="no"
                    frameBorder="0"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                </div>
                <p className="saved-link">
                  已自动转换为{embed.site === "bilibili" ? " B 站外链播放器" : " YouTube 嵌入"}格式播放 ·
                  <a href={savedLink} target="_blank" rel="noreferrer"> 打开原视频页 ↗</a>
                </p>
              </>
            )}
            {savedLink && embed && embed.short && (
              <p className="saved-link">
                检测到 b23.tv 短链接，短链无法直接嵌入。请在浏览器打开
                <a href={savedLink} target="_blank" rel="noreferrer"> 该短链 ↗</a>
                后，复制地址栏中带 BV 号的完整链接（形如 bilibili.com/video/BV…）再粘贴保存。
              </p>
            )}
            {savedLink && !embed && (
              <p className="saved-link">
                暂不支持该链接的自动嵌入（目前支持 B 站与 YouTube 视频链接）。已保存：
                <a href={savedLink} target="_blank" rel="noreferrer"> {savedLink} ↗</a>
              </p>
            )}
          </div>

          <div className="finish-bar">
            {done && onReset && !confirmReset && (
              <button className="btn reset" onClick={() => setConfirmReset(true)} title="将本案例恢复为待研习状态">
                重置为待研习
              </button>
            )}
            {done && onReset && confirmReset && (
              <div className="reset-confirm" role="alertdialog" aria-label="确认重置">
                <span className="note">{resetNote || "确认将本案例恢复为待研习？"}</span>
                <button className="btn danger" onClick={() => { setConfirmReset(false); onReset(); }}>确认重置</button>
                <button className="btn" onClick={() => setConfirmReset(false)}>取消</button>
              </div>
            )}
            {!(done && onReset && confirmReset) && (
              <button className="btn primary" disabled={done} onClick={onFinish}>
                {done ? "✓ 本案例已完成" : "完成本案例学习"}
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/* ---------------- 主应用 ---------------- */
export default function AestheticAtelier() {
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState({ completed: {}, videoLinks: {} });
  const [tab, setTab] = useState("today");
  const [openId, setOpenId] = useState(null);
  const [extraShown, setExtraShown] = useState(5);
  const [reviewDay, setReviewDay] = useState(null); // 学习足迹 → 点击进入的复习日期
  const tKey = todayKey();

  /* 读档 */
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r && r.value) {
          const v = JSON.parse(r.value);
          setState({ completed: v.completed || {}, videoLinks: v.videoLinks || {} });
        }
      } catch (e) { /* 首次使用，无存档 */ }
      setLoaded(true);
    })();
  }, []);

  /* 存档 */
  const persist = useCallback(next => {
    setState(next);
    (async () => {
      try { await window.storage.set(STORAGE_KEY, JSON.stringify(next)); }
      catch (e) { console.error("进度保存失败", e); }
    })();
  }, []);

  const todayCases = useMemo(() => casesForDay(tKey), [tKey]);
  const theme = DAY_THEMES[dayIndexOf(tKey)];
  const doneToday = state.completed[tKey] || [];
  const dayClosed = todayCases.length > 0 && todayCases.every(c => doneToday.includes(c.id));

  /* 夜场加映候选池：排除今日五件，排除今日之前已研习过的；
     今日新加映完成的仍保留在列表中呈现「已研习」状态 */
  const extraPool = useMemo(() => {
    const todayIds = new Set(todayCases.map(c => c.id));
    const before = new Set();
    Object.keys(state.completed).forEach(k => {
      if (k !== tKey) state.completed[k].forEach(id => before.add(id));
    });
    return CASES.filter(c => !todayIds.has(c.id) && !before.has(c.id));
  }, [state, tKey, todayCases]);
  const extraDoneToday = doneToday.filter(id => !todayCases.some(c => c.id === id)).length;

  /* 统计 */
  const stats = useMemo(() => {
    const days = Object.keys(state.completed).sort();
    const total = days.reduce((s, k) => s + state.completed[k].length, 0);
    const uniq = new Set(); days.forEach(k => state.completed[k].forEach(id => uniq.add(id)));
    const fullDays = days.filter(k => state.completed[k].length >= 5).length;
    let streak = 0;
    const cur = new Date(tKey + "T00:00:00");
    if (!dayClosed) cur.setDate(cur.getDate() - 1); // 今日未闭馆则从昨日起算
    for (;;) {
      const k = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`;
      if ((state.completed[k] || []).length >= 5) { streak++; cur.setDate(cur.getDate() - 1); }
      else break;
    }
    if (dayClosed) streak++;
    const extraTotal = days.reduce((n, k) => n + Math.max(0, state.completed[k].length - 5), 0);
    return { total, uniqueCount: uniq.size, fullDays, streak, days, extraTotal };
  }, [state, tKey, dayClosed]);

  const finishCase = id => {
    if (doneToday.includes(id)) return;
    persist({ ...state, completed: { ...state.completed, [tKey]: [...doneToday, id] } });
  };
  const saveLink = (id, url) => {
    persist({ ...state, videoLinks: { ...state.videoLinks, [id]: url } });
  };
  const resetCase = (id, dayKey) => {
    const list = state.completed[dayKey] || [];
    if (!list.includes(id)) return;
    const nextList = list.filter(x => x !== id);
    const completed = { ...state.completed };
    if (nextList.length === 0) delete completed[dayKey];
    else completed[dayKey] = nextList;
    persist({ ...state, completed });
  };

  if (!loaded) {
    return (
      <div className="atelier"><style>{CSS}</style>
        <div className="wrap" style={{ paddingTop: 80, textAlign: "center", color: "var(--muted)" }}>
          正在开馆，载入你的学习档案…
        </div>
      </div>
    );
  }

  const historyDays = [...stats.days].reverse();

  return (
    <div className="atelier">
      <style>{CSS}</style>
      <div className="wrap">

        <header className="masthead">
          <div className="brand">
            <div className="eyebrow">Daily Aesthetic Atelier · 每日五件经典</div>
            <h1>设计审美<em>启蒙</em>工作台</h1>
          </div>
          <div className="masthead-meta">
            <div className="date">{fmtDate(tKey)}</div>
            <div className="streak">连续研习 <b>{stats.streak}</b> 天 · 累计 <b style={{ color: "var(--ink)" }}>{stats.total}</b> 次</div>
          </div>
        </header>

        <nav className="tabs" aria-label="主导航">
          {[["today", "今日展厅"], ["badges", "成就徽章"], ["history", "学习足迹"]].map(([k, t]) => (
            <button key={k} className={`tab ${tab === k ? "on" : ""}`} onClick={() => { setTab(k); setReviewDay(null); setOpenId(null); }}>{t}</button>
          ))}
        </nav>

        {/* ============ 今日展厅 ============ */}
        {tab === "today" && (
          <section>
            <div className="hall-head">
              <div>
                <div className="eyebrow">今日主题 · Theme {String(dayIndexOf(tKey) + 1).padStart(2, "0")} / {DAY_THEMES.length}</div>
                <h2>{theme.name}</h2>
                <p>{theme.desc}</p>
              </div>
              <div className="ring-box">
                <div className="ring-label">
                  <div className="n">
                    {Math.min(doneToday.length, 5)}<span style={{ fontSize: 14, color: "var(--muted)" }}> / 5</span>
                    {extraDoneToday > 0 && <span style={{ fontSize: 13, color: "var(--gold)", fontWeight: 700 }}> +{extraDoneToday}</span>}
                  </div>
                  <div className="t">{extraDoneToday > 0 ? "今日进度 · 含夜场加映" : "今日研习进度"}</div>
                </div>
                <ProgressRing done={Math.min(doneToday.length, 5)} total={5} />
              </div>
            </div>

            {dayClosed && (
              <div className="closed-banner">
                <span style={{ fontSize: 20 }}>◉</span>
                <span><b>今日闭馆。</b>五件经典已全部研习完毕，「今日闭馆」记录已点亮。意犹未尽？下方「夜场加映」已开放，可继续研习馆藏中的新案例。</span>
              </div>
            )}

            <div className="case-list">
              {todayCases.map((c, i) => (
                <CaseCard key={c.id} c={c} i={i}
                  done={doneToday.includes(c.id)}
                  open={openId === c.id}
                  onToggle={() => setOpenId(openId === c.id ? null : c.id)}
                  onFinish={() => finishCase(c.id)}
                  onReset={() => resetCase(c.id, tKey)}
                  resetNote="将从今日记录中移除，可重新学习。"
                  savedLink={state.videoLinks[c.id]}
                  onSaveLink={url => saveLink(c.id, url)} />
              ))}
            </div>

            {/* ---- 夜场加映：闭馆后继续学习新的案例 ---- */}
            {dayClosed && (
              <div className="encore">
                <div className="hall-head" style={{ marginTop: 34 }}>
                  <div>
                    <div className="eyebrow">Encore · 夜场加映</div>
                    <h2>继续研习馆藏新案例</h2>
                    <p>今日任务已完成，以下是你尚未研习过的馆藏经典。加映的研习同样计入累计次数与「夜场常客」徽章。</p>
                  </div>
                </div>
                {extraPool.length === 0 ? (
                  <div className="empty">馆藏 {CASES.length} 件已全部研习完毕——你完成了「全馆巡礼」。接下来可以回到足迹中温习任何一件。</div>
                ) : (
                  <>
                    <div className="case-list">
                      {extraPool.slice(0, extraShown).map((c, i) => (
                        <CaseCard key={c.id} c={c} i={i}
                          done={doneToday.includes(c.id)}
                          open={openId === c.id}
                          onToggle={() => setOpenId(openId === c.id ? null : c.id)}
                          onFinish={() => finishCase(c.id)}
                          onReset={() => resetCase(c.id, tKey)}
                          resetNote="将从今日记录中移除，可重新学习。"
                          savedLink={state.videoLinks[c.id]}
                          onSaveLink={url => saveLink(c.id, url)} />
                      ))}
                    </div>
                    {extraPool.length > extraShown && (
                      <button className="btn more-btn" onClick={() => setExtraShown(n => n + 5)}>
                        再加开 5 件（馆藏还剩 {extraPool.length - extraShown} 件未研习）
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </section>
        )}

        {/* ============ 成就徽章 ============ */}
        {tab === "badges" && (
          <section>
            <div className="stats-row">
              <div className="stat"><div className="n">{stats.streak}</div><div className="t">连续研习天数</div></div>
              <div className="stat"><div className="n">{stats.total}</div><div className="t">累计完成案例次数</div></div>
              <div className="stat"><div className="n">{BADGES.filter(b => b.test(stats)).length}<span style={{ fontSize: 16, color: "var(--muted)" }}> / {BADGES.length}</span></div><div className="t">已点亮徽章</div></div>
            </div>
            <div className="badges">
              {BADGES.map(b => {
                const got = b.test(stats);
                return (
                  <div key={b.id} className={`badge ${b.blue ? "blue" : ""} ${got ? "" : "locked"}`}>
                    <div className="medal" aria-hidden="true">{b.icon}</div>
                    <h3>{b.name}</h3>
                    <p>{b.desc}</p>
                    {got && <div className="got">UNLOCKED</div>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ============ 学习足迹 · 复习视图 ============ */}
        {tab === "history" && reviewDay && (() => {
          const ids = state.completed[reviewDay] || [];
          const dayCases = ids.map(id => CASES.find(c => c.id === id)).filter(Boolean);
          const dayTheme = DAY_THEMES[dayIndexOf(reviewDay)];
          return (
            <section>
              <button className="btn back-btn" onClick={() => { setReviewDay(null); setOpenId(null); }}>← 返回学习足迹</button>
              <div className="hall-head">
                <div>
                  <div className="eyebrow">复习 · Review {fmtDate(reviewDay)}</div>
                  <h2>{dayTheme.name}</h2>
                  <p>{dayTheme.desc}</p>
                </div>
                <div className="ring-box">
                  <div className="ring-label">
                    <div className="n">{dayCases.length}<span style={{ fontSize: 14, color: "var(--muted)" }}> 件</span></div>
                    <div className="t">当日研习记录</div>
                  </div>
                </div>
              </div>
              {dayCases.length === 0 && (
                <div className="empty">该日的研习记录已全部重置。点击上方按钮返回学习足迹。</div>
              )}
              <div className="case-list">
                {dayCases.map((c, i) => (
                  <CaseCard key={c.id} c={c} i={i}
                    done={true}
                    open={openId === c.id}
                    onToggle={() => setOpenId(openId === c.id ? null : c.id)}
                    onFinish={() => {}}
                    onReset={() => resetCase(c.id, reviewDay)}
                    resetNote={`将从 ${reviewDay} 的记录中移除；若该日因此不足 5 件，「闭馆」与连续天数会相应变化。`}
                    savedLink={state.videoLinks[c.id]}
                    onSaveLink={url => saveLink(c.id, url)} />
                ))}
              </div>
            </section>
          );
        })()}

        {/* ============ 学习足迹 ============ */}
        {tab === "history" && !reviewDay && (
          <section>
            <div className="stats-row">
              <div className="stat"><div className="n">{stats.days.length}</div><div className="t">有学习记录的天数</div></div>
              <div className="stat"><div className="n">{stats.fullDays}</div><div className="t">「今日闭馆」达成天数</div></div>
              <div className="stat"><div className="n">{stats.uniqueCount}<span style={{ fontSize: 16, color: "var(--muted)" }}> / {CASES.length}</span></div><div className="t">研习过的不同案例</div></div>
            </div>

            {historyDays.length === 0 ? (
              <div className="empty">还没有学习记录。回到「今日展厅」，完成第一件经典案例的研习吧。</div>
            ) : (
              <div className="history">
                {historyDays.map(k => {
                  const ids = state.completed[k];
                  const dayCases = ids.map(id => CASES.find(c => c.id === id)).filter(Boolean);
                  const dayTheme = DAY_THEMES[dayIndexOf(k)];
                  return (
                    <div className="day-item" key={k}>
                      <div className="d">
                        {k}
                        <button className="theme-link" onClick={() => { setReviewDay(k); setOpenId(null); }}
                          title={`重新进入「${dayTheme.name}」专题复习`}>
                          {dayTheme.name} ↗
                        </button>
                      </div>
                      <div className="cells" aria-label={`完成 ${ids.length} 件`}>
                        {Array.from({ length: 5 }).map((_, i) => <span key={i} className={`cell ${i < ids.length ? "f" : ""}`} />)}
                        {ids.length > 5 && <span className="cell-extra">+{ids.length - 5}</span>}
                      </div>
                      <div className="names">
                        {dayCases.map((c, i) => (
                          <span key={c.id}>
                            {i > 0 && " · "}
                            <button className="name-link" onClick={() => { setReviewDay(k); setOpenId(c.id); }}
                              title={`复习「${c.title}」`}>{c.title}</button>
                          </span>
                        ))}
                      </div>
                      {ids.length >= 5 && <div className="full-tag">闭馆 ✓</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        <footer className="foot">
          <span>案例库 {CASES.length} 件 · 按二十大主题日循环推送 · 闭馆后可夜场加映 · 进度自动保存</span>
          <span>Aesthetic Atelier · For First-Year Design Graduates</span>
        </footer>
      </div>
    </div>
  );
}
