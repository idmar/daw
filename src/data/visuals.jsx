import React from "react";

const P = { blue: "#002FA7", red: "#D0361F", yellow: "#E8B50C", ink: "#17160F", gray: "#C9C7BE" };

const VISUALS = {
  /* ===== 主题日 04 · 字体的世纪：字形解剖研究图 ===== */
  futuraGeometry: (
    <svg viewBox="0 0 320 220" role="img" aria-label="几何字形与光学修正研究：正圆骨架与交接处的削细补偿">
      <rect width="320" height="220" fill="#fff" />
      {/* 构造：圆、三角、方 */}
      <circle cx="78" cy="110" r="52" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 5" />
      <path d="M150 162 L192 58 L234 162 Z" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 5" />
      <rect x="252" y="58" width="52" height="104" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 5" />
      {/* 字形本体 */}
      <circle cx="78" cy="110" r="44" fill="none" stroke={P.ink} strokeWidth="13" />
      <path d="M152 162 L192 64 L232 162" fill="none" stroke={P.ink} strokeWidth="13" strokeLinecap="butt" />
      <line x1="170" y1="122" x2="214" y2="122" stroke={P.ink} strokeWidth="13" />
      <line x1="262" y1="58" x2="262" y2="162" stroke={P.ink} strokeWidth="13" />
      <line x1="262" y1="110" x2="300" y2="110" stroke={P.ink} strokeWidth="13" />
      {/* 光学修正：交接处削细、尖角出格 */}
      <circle cx="78" cy="66" r="9" fill="none" stroke={P.red} strokeWidth="2" />
      <circle cx="192" cy="60" r="9" fill="none" stroke={P.red} strokeWidth="2" />
      <line x1="78" y1="57" x2="78" y2="44" stroke={P.red} strokeWidth="1.5" />
      <line x1="192" y1="51" x2="192" y2="38" stroke={P.red} strokeWidth="1.5" />
      <text x="20" y="38" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>OPTICAL CORRECTION</text>
      <line x1="20" y1="162" x2="308" y2="162" stroke={P.ink} strokeWidth="1" />
      <line x1="20" y1="58" x2="308" y2="58" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      <text x="20" y="196" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>CIRCLE · TRIANGLE · SQUARE</text>
      <text x="228" y="196" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>1927</text>
    </svg>
  ),
  garamondStroke: (
    <svg viewBox="0 0 320 220" role="img" aria-label="人文主义衬线的书写轴线研究：平头笔的粗细变化与倾斜轴">
      <rect width="320" height="220" fill="#fff" />
      {/* 平头笔的书写轨迹 */}
      <path d="M92 168 C 62 140 66 92 96 68 C 126 44 166 52 178 82"
        fill="none" stroke={P.ink} strokeWidth="17" strokeLinecap="round" />
      <path d="M92 168 C 62 140 66 92 96 68 C 126 44 166 52 178 82"
        fill="none" stroke="#fff" strokeWidth="7" strokeDasharray="1 0" opacity="0" />
      {/* 倾斜轴：书写留下的应力方向 */}
      <line x1="60" y1="150" x2="126" y2="70" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="118" y1="176" x2="184" y2="96" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="24" y="66" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>STRESS AXIS</text>
      {/* 平头笔截面示意 */}
      <g transform="translate(196,54) rotate(-30)">
        <rect x="0" y="0" width="30" height="8" fill={P.blue} />
        <line x1="0" y1="12" x2="30" y2="12" stroke={P.blue} strokeWidth="1.5" />
      </g>
      <text x="196" y="44" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>BROAD NIB</text>
      {/* 衬线细部：与笔画自然过渡 */}
      <g transform="translate(206,108)">
        <line x1="20" y1="0" x2="20" y2="52" stroke={P.ink} strokeWidth="9" />
        <path d="M4 52 C 14 52 16 46 20 44 C 24 46 26 52 36 52" fill="none" stroke={P.ink} strokeWidth="6" />
        <circle cx="20" cy="46" r="8" fill="none" stroke={P.red} strokeWidth="1.5" />
        <text x="46" y="50" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>BRACKET</text>
      </g>
      {/* 正文色泽：均匀的灰度 */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i} x1="206" y1={178 + i * 6} x2={i === 5 ? 268 : 300} y2={178 + i * 6} stroke="#9A988F" strokeWidth="3" />
      ))}
      <text x="24" y="196" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>WRITTEN, NOT DRAWN</text>
      <text x="206" y="170" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>EVEN COLOUR</text>
    </svg>
  ),
  baskervilleContrast: (
    <svg viewBox="0 0 320 220" role="img" aria-label="过渡期衬线研究：对比度抬升、轴线趋垂直与整条生产链的升级">
      <rect width="320" height="220" fill="#fff" />
      {/* 左：旧体——低对比、倾斜轴 */}
      <g transform="translate(34,52)">
        <ellipse cx="34" cy="52" rx="30" ry="34" fill="none" stroke={P.gray} strokeWidth="13" />
        <ellipse cx="34" cy="52" rx="30" ry="34" fill="none" stroke="#fff" strokeWidth="5" opacity="0" />
        <line x1="8" y1="82" x2="60" y2="22" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="-6" y="112" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>OLD STYLE</text>
      </g>
      {/* 右：过渡期——高对比、垂直轴、细锐衬线 */}
      <g transform="translate(150,52)">
        <path d="M34 18 C 52 18 64 34 64 52 C 64 70 52 86 34 86 C 16 86 4 70 4 52 C 4 34 16 18 34 18 Z"
          fill="none" stroke={P.ink} strokeWidth="4" />
        <path d="M34 20 C 46 26 50 38 50 52 C 50 66 46 78 34 84 C 22 78 18 66 18 52 C 18 38 22 26 34 20 Z"
          fill={P.ink} />
        <line x1="34" y1="8" x2="34" y2="96" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="-6" y="112" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>TRANSITIONAL</text>
      </g>
      <text x="152" y="34" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>VERTICAL AXIS</text>
      {/* 生产链升级：墨、纸、机 */}
      <g transform="translate(244,56)">
        <circle cx="14" cy="14" r="12" fill={P.ink} />
        <text x="-2" y="40" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>INK</text>
        <rect x="2" y="56" width="26" height="20" fill="#F2F0E8" stroke={P.gray} strokeWidth="1.5" />
        <text x="-4" y="92" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>PAPER</text>
        <rect x="2" y="106" width="26" height="22" fill="none" stroke={P.gray} strokeWidth="2" />
        <line x1="8" y1="112" x2="22" y2="112" stroke={P.gray} strokeWidth="2" />
        <text x="-8" y="144" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>PRESS</text>
      </g>
      <line x1="236" y1="46" x2="236" y2="204" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>CONTRAST RISES</text>
      <text x="20" y="206" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>WHOLE CHAIN UPGRADED</text>
    </svg>
  ),
  universMatrix: (
    <svg viewBox="0 0 320 220" role="img" aria-label="字体家族矩阵研究：以字重与字宽为坐标的编号系统">
      <rect width="320" height="220" fill="#fff" />
      {/* 坐标轴 */}
      <line x1="58" y1="40" x2="58" y2="182" stroke={P.ink} strokeWidth="1.5" />
      <line x1="58" y1="182" x2="296" y2="182" stroke={P.ink} strokeWidth="1.5" />
      <text x="20" y="46" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>WEIGHT</text>
      <text x="246" y="200" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>WIDTH</text>
      {/* 矩阵格子：粗细 × 宽窄 */}
      {[0, 1, 2, 3].map(r => (
        [0, 1, 2, 3, 4].map(c => (
          <g key={`${r}-${c}`}>
            <rect x={70 + c * 44} y={48 + r * 32} width={38} height={26} fill="none" stroke="#E4E2DA" strokeWidth="1" />
            <rect x={74 + c * 44 - c} y={54 + r * 32} width={10 + c * 4} height={14} fill={P.ink} opacity={0.3 + r * 0.22} />
          </g>
        ))
      ))}
      {/* 编号系统 */}
      {[["55", 1, 1], ["65", 1, 2], ["57", 0, 1], ["75", 1, 3]].map(([n, c, r], i) => (
        <text key={i} x={72 + c * 44} y={44 + r * 32} fontFamily="Archivo,sans-serif" fontSize="9" fontWeight="700" fill={P.red}>{n}</text>
      ))}
      <rect x="114" y="80" width="38" height="26" fill="none" stroke={P.red} strokeWidth="2" />
      {/* 共享骨架 */}
      <line x1="58" y1="146" x2="296" y2="146" stroke={P.blue} strokeWidth="1" strokeDasharray="4 3" />
      <line x1="58" y1="166" x2="296" y2="166" stroke={P.blue} strokeWidth="1" strokeDasharray="4 3" />
      <text x="62" y="160" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>SHARED SKELETON · SAME x-HEIGHT</text>
      <text x="20" y="26" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>FAMILY BEFORE INDIVIDUAL · 21 MEMBERS</text>
      <text x="20" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>NUMBERS, NOT NAMES</text>
    </svg>
  ),
  didotHairline: (
    <svg viewBox="0 0 320 220" role="img" aria-label="现代衬线尺寸依赖研究：发丝衬线在大字号成立、小字号消失">
      <rect width="320" height="220" fill="#fff" />
      {/* 大字号：极端对比成立 */}
      <g transform="translate(40,44)">
        <path d="M22 8 C 44 14 54 34 54 60 C 54 86 44 106 22 112 Z" fill={P.ink} />
        <rect x="16" y="8" width="6" height="104" fill={P.ink} />
        <line x1="2" y1="8" x2="42" y2="8" stroke={P.ink} strokeWidth="1.2" />
        <line x1="2" y1="112" x2="42" y2="112" stroke={P.ink} strokeWidth="1.2" />
        <circle cx="22" cy="8" r="9" fill="none" stroke={P.red} strokeWidth="1.5" />
        <text x="-14" y="136" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>DISPLAY — WORKS</text>
      </g>
      <text x="92" y="60" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>HAIRLINE SERIF</text>
      <line x1="90" y1="54" x2="76" y2="52" stroke={P.red} strokeWidth="1" />
      {/* 缩小后：发丝消失、笔画断裂 */}
      <g transform="translate(160,96)">
        <path d="M8 3 C 16 5 20 13 20 22 C 20 31 16 39 8 41 Z" fill={P.ink} />
        <rect x="6" y="3" width="2" height="38" fill={P.ink} />
        <text x="-6" y="62" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>TEXT — BREAKS</text>
      </g>
      <g transform="translate(206,110)">
        <path d="M4 2 C 9 3 11 7 11 12 C 11 17 9 21 4 22 Z" fill="#B5B3AA" />
        <rect x="3" y="2" width="1" height="20" fill="#B5B3AA" />
      </g>
      <line x1="186" y1="100" x2="214" y2="142" stroke={P.red} strokeWidth="2" />
      <line x1="214" y1="100" x2="186" y2="142" stroke={P.red} strokeWidth="2" />
      {/* 气质：奢华的联想遗产 */}
      <line x1="248" y1="40" x2="248" y2="188" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="260" y1={64 + i * 22} x2={i % 2 ? 290 : 304} y2={64 + i * 22} stroke={P.ink} strokeWidth={i === 0 ? 1 : 1.5} />
      ))}
      <text x="258" y="50" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>FASHION</text>
      <text x="258" y="172" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>MASTHEAD</text>
      <text x="20" y="26" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>SIZE IS DESTINY</text>
    </svg>
  ),

  /* ===== 主题日 05 · 海报的黄金时代：构图与传播研究图 ===== */
  lautrecSilhouette: (
    <svg viewBox="0 0 320 220" role="img" aria-label="石版套色的减法研究：人群压为剪影、主角简化为色面">
      <rect width="320" height="220" fill="#fff" />
      <rect x="22" y="20" width="276" height="180" fill="#E8DCC2" />
      {/* 前景人群：压成一片黑剪影 */}
      <path d="M22 200 L22 138 C 46 128 58 146 74 132 C 90 118 104 142 122 134
        C 138 127 146 148 162 140 L162 200 Z" fill={P.ink} />
      {/* 主角：平涂色面加轮廓线 */}
      <path d="M186 200 C 176 160 190 116 216 104 C 244 92 268 112 266 146
        C 264 172 256 190 250 200 Z" fill={P.yellow} />
      <path d="M186 200 C 176 160 190 116 216 104 C 244 92 268 112 266 146
        C 264 172 256 190 250 200" fill="none" stroke={P.ink} strokeWidth="2.5" />
      <circle cx="222" cy="88" r="16" fill={P.red} />
      <path d="M206 84 C 214 68 236 68 240 84" fill="none" stroke={P.ink} strokeWidth="2.5" />
      {/* 斜切构图：浮世绘式的裁切 */}
      <line x1="22" y1="112" x2="298" y2="66" stroke={P.ink} strokeWidth="1.5" strokeDasharray="5 4" />
      {/* 字块：与图同层的平面元素 */}
      <rect x="34" y="34" width="96" height="14" fill={P.ink} />
      <rect x="34" y="54" width="62" height="9" fill={P.red} />
      {/* 三色限制 */}
      <g transform="translate(250,30)">
        {[P.ink, P.red, P.yellow].map((c, i) => (
          <rect key={i} x={i * 16} y="0" width="14" height="14" fill={c} />
        ))}
        <text x="-6" y="28" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>3 PLATES</text>
      </g>
      <text x="22" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>FLAT COLOUR · CROPPED · READ AT 3 METERS</text>
    </svg>
  ),
  bernhardReduction: (
    <svg viewBox="0 0 320 220" role="img" aria-label="实物海报的删减研究：从堆满道具到只剩商品与品牌名">
      <rect width="320" height="220" fill="#fff" />
      {/* 初稿：杂多元素 */}
      <rect x="20" y="42" width="112" height="140" fill="#F2F0E8" stroke={P.gray} strokeWidth="1.5" />
      <rect x="34" y="132" width="40" height="26" fill="#C9C7BE" />
      <ellipse cx="96" cy="140" rx="22" ry="9" fill="#C9C7BE" />
      <rect x="46" y="70" width="8" height="46" fill="#C9C7BE" />
      <rect x="58" y="78" width="8" height="38" fill="#C9C7BE" />
      <path d="M84 118 C 96 96 116 100 116 118 Z" fill="#C9C7BE" />
      <rect x="32" y="52" width="60" height="8" fill="#C9C7BE" />
      <text x="20" y="34" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>FIRST DRAFT</text>
      {/* 删减箭头 */}
      <line x1="144" y1="112" x2="176" y2="112" stroke={P.red} strokeWidth="2" />
      <path d="M182 112 L172 107 L172 117 Z" fill={P.red} />
      <text x="140" y="100" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>ERASE</text>
      {/* 终稿：只剩两根火柴与一个词 */}
      <rect x="192" y="42" width="112" height="140" fill="#5A3A22" />
      <rect x="222" y="74" width="9" height="62" fill="#E8DCC2" />
      <rect x="244" y="74" width="9" height="62" fill="#E8DCC2" />
      <ellipse cx="226.5" cy="70" rx="8" ry="10" fill={P.red} />
      <ellipse cx="248.5" cy="70" rx="8" ry="10" fill={P.yellow} />
      <rect x="216" y="152" width="64" height="11" fill="#E8DCC2" />
      <text x="192" y="34" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>FINAL — 2 OBJECTS + 1 WORD</text>
      <text x="20" y="206" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>THE PRODUCT AS MONUMENT</text>
    </svg>
  ),
  cassandrePerspective: (
    <svg viewBox="0 0 320 220" role="img" aria-label="仰视视角与字图建筑研究：船体压缩为三角纪念碑、船名作为基座">
      <rect width="320" height="220" fill="#fff" />
      <rect x="20" y="16" width="280" height="188" fill="#C8B98E" />
      {/* 船体：正面仰视压缩成巨大三角 */}
      <path d="M160 34 L236 160 L84 160 Z" fill={P.ink} />
      <path d="M160 34 L196 94 L124 94 Z" fill="#3A3830" />
      {/* 喷绘渐变的体量感 */}
      <path d="M160 40 L186 84 L160 84 Z" fill="#54524A" opacity=".8" />
      {/* 海鸥：尺度对比，小如尘埃 */}
      {[[62, 62], [78, 50], [94, 68]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} C ${x + 4} ${y - 4} ${x + 8} ${y - 4} ${x + 12} ${y}`}
          fill="none" stroke="#fff" strokeWidth="1.5" />
      ))}
      {/* 字块作为基座，承托船体 */}
      <rect x="84" y="166" width="152" height="24" fill="#fff" />
      <rect x="96" y="172" width="128" height="12" fill={P.ink} />
      {/* 结构咬合的标注 */}
      <line x1="84" y1="160" x2="84" y2="190" stroke={P.red} strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="236" y1="160" x2="236" y2="190" stroke={P.red} strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="20" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>TYPE AS PLINTH · IMAGE AS TOWER</text>
      <text x="222" y="30" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>LOW ANGLE</text>
    </svg>
  ),
  bassSpiral: (
    <svg viewBox="0 0 320 220" role="img" aria-label="观念海报研究：一个抽象漩涡承载整部影片的心理状态">
      <rect width="320" height="220" fill="#fff" />
      <rect x="20" y="16" width="280" height="188" fill={P.ink} />
      {/* 漩涡：以极坐标生成的连续螺线 */}
      <path d="M160 110
        C 160 96 174 96 176 108 C 179 126 158 134 146 122 C 130 106 148 80 172 84
        C 202 89 210 126 188 148 C 162 174 116 158 106 124 C 94 84 132 46 176 52"
        fill="none" stroke={P.red} strokeWidth="3" />
      {/* 坠落的人形剪影：抽象到可代入 */}
      <g transform="translate(206,150) rotate(28)">
        <circle cx="0" cy="0" r="5" fill="#fff" />
        <path d="M-2 5 L-2 22 L-9 34 M-2 22 L6 32 M-8 10 L10 6" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* 片名区：单一字块 */}
      <rect x="40" y="176" width="86" height="10" fill="#fff" />
      <text x="20" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>ONE FORM = ONE STATE OF MIND</text>
      <text x="228" y="36" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill="#fff">CONCEPT ▸ NOT SCENE</text>
    </svg>
  ),
  tanakaFace: (
    <svg viewBox="0 0 320 220" role="img" aria-label="网格中的东方脸研究：面容被纳入方格系统，色块比例承担全部表情">
      <rect width="320" height="220" fill="#fff" />
      {/* 网格底 */}
      {[...Array(9)].map((_, i) => (
        <line key={"v" + i} x1={96 + i * 16} y1="26" x2={96 + i * 16} y2="194" stroke="#E4E2DA" strokeWidth="1" />
      ))}
      {[...Array(11)].map((_, i) => (
        <line key={"h" + i} x1="96" y1={26 + i * 16.8} x2="224" y2={26 + i * 16.8} stroke="#E4E2DA" strokeWidth="1" />
      ))}
      {/* 面部：色块拼合 */}
      <rect x="96" y="26" width="128" height="46" fill="#1B2A5E" />
      <rect x="96" y="72" width="128" height="88" fill="#F0E4D4" />
      <rect x="96" y="160" width="128" height="34" fill="#9B1B2E" />
      <rect x="112" y="92" width="36" height="9" fill={P.ink} />
      <rect x="172" y="92" width="36" height="9" fill={P.ink} />
      <rect x="150" y="118" width="20" height="26" fill="#E6C9A8" />
      <rect x="144" y="146" width="32" height="10" fill="#9B1B2E" />
      <rect x="96" y="26" width="128" height="14" fill="#0E1A3C" />
      {/* 传统色与现代色域的双重血统 */}
      <g transform="translate(24,60)">
        {["#9B1B2E", "#1B2A5E", "#E6C9A8", "#0E1A3C"].map((c, i) => (
          <rect key={i} x="0" y={i * 22} width="44" height="16" fill={c} />
        ))}
        <text x="-4" y="112" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>TRADITIONAL</text>
        <text x="-4" y="126" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>+ MODERN</text>
      </g>
      {/* 识别临界：仅五个色块即可辨认 */}
      <text x="240" y="60" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>5 BLOCKS</text>
      <text x="240" y="74" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>= A FACE</text>
      <line x1="236" y1="88" x2="222" y2="100" stroke={P.red} strokeWidth="1" />
      <text x="24" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>TRADITION TRANSLATED BY GRID</text>
    </svg>
  ),
  /* ===== 主题日 11 · 电子产品：界面元语法研究图 ===== */
  braunT3Grid: (
    <svg viewBox="0 0 320 220" role="img" aria-label="便携电子界面元语法研究：孔阵秩序与单一操控件的布局原型">
      <rect width="320" height="220" fill="#fff" />
      {/* 机身 */}
      <rect x="66" y="30" width="126" height="160" rx="6" fill="#F4F3EE" stroke={P.ink} strokeWidth="2.5" />
      {/* 孔阵：功能开孔升华为唯一表面肌理 */}
      {[...Array(9)].map((_, r) => (
        [...Array(7)].map((_, c) => (
          <circle key={`${r}-${c}`} cx={84 + c * 15} cy={48 + r * 9.6} r="2.6" fill="#B5B3AA" />
        ))
      ))}
      {/* 单一圆形拨盘 */}
      <circle cx="129" cy="156" r="23" fill="#E4E2DA" stroke={P.ink} strokeWidth="2" />
      <circle cx="129" cy="156" r="6" fill={P.ink} />
      <line x1="129" y1="139" x2="129" y2="146" stroke={P.ink} strokeWidth="2" />
      {/* 布局骨架：屏幕区 + 单一操控件 */}
      <rect x="76" y="40" width="106" height="88" fill="none" stroke={P.blue} strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="129" cy="156" r="30" fill="none" stroke={P.blue} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="20" y="44" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>FIELD</text>
      <text x="20" y="160" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>ONE CONTROL</text>
      {/* 同一骨架在后世设备上的转世 */}
      <rect x="226" y="52" width="70" height="116" rx="10" fill="#fff" stroke={P.gray} strokeWidth="2" />
      <rect x="236" y="62" width="50" height="44" fill="#EFEEE8" stroke={P.gray} strokeWidth="1.5" />
      <circle cx="261" cy="134" r="20" fill="none" stroke={P.gray} strokeWidth="2" />
      <circle cx="261" cy="134" r="7" fill="#EFEEE8" stroke={P.gray} strokeWidth="1.5" />
      <line x1="196" y1="110" x2="220" y2="110" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="226" y="186" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>SAME SKELETON, 43 YEARS LATER</text>
      <text x="20" y="26" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>ORDER, NOT ORNAMENT</text>
    </svg>
  ),
  walkmanSubtract: (
    <svg viewBox="0 0 320 220" role="img" aria-label="做减法的产品定义研究：删除录音与扬声器换取极致便携">
      <rect width="320" height="220" fill="#fff" />
      {/* 机身 */}
      <rect x="40" y="62" width="130" height="102" rx="5" fill="#2E68B0" stroke={P.ink} strokeWidth="2" />
      <rect x="54" y="78" width="102" height="52" fill="#E4E2DA" stroke={P.ink} strokeWidth="1.5" />
      <circle cx="80" cy="104" r="13" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      <circle cx="130" cy="104" r="13" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={54 + i * 26} y="140" width="20" height="10" fill={P.ink} />
      ))}
      {/* 被删除的功能：录音键与扬声器 */}
      <g opacity=".45">
        <rect x="186" y="70" width="42" height="18" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="207" cy="79" r="5" fill="none" stroke={P.gray} strokeWidth="1.5" />
        <rect x="186" y="104" width="42" height="34" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 3" />
        {[...Array(9)].map((_, i) => (
          <circle key={i} cx={193 + (i % 3) * 14} cy={112 + Math.floor(i / 3) * 11} r="2.4" fill={P.gray} />
        ))}
      </g>
      <line x1="184" y1="66" x2="230" y2="92" stroke={P.red} strokeWidth="2.5" />
      <line x1="230" y1="66" x2="184" y2="92" stroke={P.red} strokeWidth="2.5" />
      <line x1="184" y1="102" x2="230" y2="140" stroke={P.red} strokeWidth="2.5" />
      <line x1="230" y1="102" x2="184" y2="140" stroke={P.red} strokeWidth="2.5" />
      <text x="184" y="158" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>REMOVED</text>
      {/* 换来的行为：边走边听 */}
      <g transform="translate(252,74)">
        <circle cx="16" cy="10" r="9" fill={P.ink} />
        <path d="M16 20 L16 44 L6 64 M16 44 L28 62 M4 30 L30 30" fill="none" stroke={P.ink} strokeWidth="3" strokeLinecap="round" />
        <path d="M6 8 C 6 -2 26 -2 26 8" fill="none" stroke={P.blue} strokeWidth="2.5" />
        <circle cx="6" cy="10" r="3.5" fill={P.blue} />
        <circle cx="26" cy="10" r="3.5" fill={P.blue} />
      </g>
      <text x="234" y="166" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>NEW BEHAVIOUR</text>
      <text x="20" y="42" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>DEFINED BY DELETION</text>
      <text x="20" y="196" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>PRIVATE SOUND IN PUBLIC SPACE</text>
    </svg>
  ),
  macDesktop: (
    <svg viewBox="0 0 320 220" role="img" aria-label="桌面隐喻研究：办公桌物件被翻译为屏幕对象，机身呈拟人姿态">
      <rect width="320" height="220" fill="#fff" />
      {/* 机身：竖向一体，微微仰起的脸 */}
      <path d="M62 44 L172 44 C 180 44 184 48 184 56 L184 168 C 184 176 180 180 172 180 L62 180 C 54 180 50 176 50 168 L50 56 C 50 48 54 44 62 44 Z"
        fill="#E8E5DA" stroke={P.ink} strokeWidth="2.5" />
      <rect x="66" y="58" width="102" height="76" fill="#DCE4F5" stroke={P.ink} strokeWidth="1.5" />
      <rect x="90" y="144" width="54" height="12" rx="2" fill="#C9C7BE" stroke={P.ink} strokeWidth="1.5" />
      {/* 笑脸：消除对技术的恐惧 */}
      <circle cx="98" cy="86" r="4" fill={P.ink} />
      <circle cx="136" cy="86" r="4" fill={P.ink} />
      <path d="M94 104 C 106 116 128 116 140 104" fill="none" stroke={P.ink} strokeWidth="2.5" />
      {/* 桌面隐喻：实物 → 屏幕对象 */}
      <g transform="translate(210,42)">
        <rect x="0" y="0" width="30" height="24" fill="none" stroke={P.gray} strokeWidth="2" />
        <path d="M0 8 L12 8 L16 2 L30 2" fill="none" stroke={P.gray} strokeWidth="2" />
        <text x="-6" y="40" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>FOLDER</text>
        <rect x="62" y="0" width="26" height="24" fill="none" stroke={P.gray} strokeWidth="2" />
        <line x1="66" y1="6" x2="84" y2="6" stroke={P.gray} strokeWidth="1.5" />
        <line x1="66" y1="12" x2="84" y2="12" stroke={P.gray} strokeWidth="1.5" />
        <text x="58" y="40" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>PAGE</text>
      </g>
      <g transform="translate(210,110)">
        <path d="M4 6 L26 6 L22 30 L8 30 Z" fill="none" stroke={P.ink} strokeWidth="2" />
        <line x1="0" y1="6" x2="30" y2="6" stroke={P.ink} strokeWidth="2" />
        <text x="-6" y="46" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.ink}>TRASH</text>
        <path d="M68 4 L68 30 L76 24 L80 34 L84 32 L80 22 L88 22 Z" fill={P.ink} />
        <text x="58" y="46" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.ink}>POINTER</text>
      </g>
      <line x1="196" y1="110" x2="196" y2="30" stroke={P.red} strokeWidth="1" strokeDasharray="3 3" />
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>DESK → SCREEN</text>
      <text x="20" y="204" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>HARDWARE + SOFTWARE AS ONE</text>
    </svg>
  ),
  gameboyWithered: (
    <svg viewBox="0 0 320 220" role="img" aria-label="枯萎技术的水平思考研究：以落后一代的显示换取续航、价格与耐用">
      <rect width="320" height="220" fill="#fff" />
      {/* 机体 */}
      <rect x="54" y="26" width="118" height="170" rx="10" fill="#D8D5C6" stroke={P.ink} strokeWidth="2.5" />
      <rect x="70" y="44" width="86" height="66" rx="3" fill="#8FA87A" stroke={P.ink} strokeWidth="2" />
      {[...Array(6)].map((_, i) => (
        <rect key={i} x={78 + (i % 3) * 24} y={56 + Math.floor(i / 3) * 24} width="14" height="14" fill="#5E7550" />
      ))}
      {/* 十字键 + AB 键：定型的掌机语法 */}
      <g transform="translate(88,140)">
        <rect x="-16" y="-6" width="32" height="12" rx="2" fill={P.ink} />
        <rect x="-6" y="-16" width="12" height="32" rx="2" fill={P.ink} />
      </g>
      <circle cx="140" cy="134" r="8" fill={P.red} />
      <circle cx="158" cy="146" r="8" fill={P.red} />
      <rect x="92" y="172" width="20" height="6" rx="3" fill="#9C9A92" transform="rotate(-20 102 175)" />
      <rect x="118" y="172" width="20" height="6" rx="3" fill="#9C9A92" transform="rotate(-20 128 175)" />
      {/* 技术取舍：以落后换取的三项优势 */}
      <text x="196" y="42" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>TRADE-OFF</text>
      {[["COLOUR", 26, P.red], ["BATTERY", 104, P.blue], ["PRICE", 96, P.blue], ["DURABILITY", 110, P.blue]].map(([t, w, c], i) => (
        <g key={i}>
          <rect x="196" y={54 + i * 26} width="112" height="9" fill="#EFEEE8" />
          <rect x="196" y={54 + i * 26} width={w} height="9" fill={c} />
          <text x="196" y={50 + i * 26} fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={c}>{t}</text>
        </g>
      ))}
      <text x="196" y="176" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>WITHERED TECH,</text>
      <text x="196" y="188" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>LATERAL THINKING</text>
      <text x="20" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>NOT NEWEST — FITTEST</text>
    </svg>
  ),
  ipodWheel: (
    <svg viewBox="0 0 320 220" role="img" aria-label="转盘操控密度研究：拇指划圈在万首歌中跳跃，白色线材成为识别">
      <rect width="320" height="220" fill="#fff" />
      {/* 机身 */}
      <rect x="66" y="24" width="112" height="172" rx="12" fill="#F7F6F2" stroke={P.ink} strokeWidth="2.5" />
      <rect x="82" y="40" width="80" height="54" fill="#DCE4F5" stroke={P.ink} strokeWidth="1.5" />
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="90" y1={52 + i * 12} x2={i === 3 ? 130 : 154} y2={52 + i * 12} stroke="#6E7A94" strokeWidth="3" />
      ))}
      {/* 转盘与加速度曲线 */}
      <circle cx="122" cy="146" r="38" fill="#EFEEE8" stroke={P.ink} strokeWidth="2" />
      <circle cx="122" cy="146" r="14" fill="#fff" stroke={P.ink} strokeWidth="2" />
      <path d="M122 108 A 38 38 0 0 1 158 134" fill="none" stroke={P.red} strokeWidth="3" />
      <path d="M160 140 L154 128 L166 130 Z" fill={P.red} />
      <text x="188" y="132" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>THUMB ARC</text>
      {/* 输入方式匹配数据规模 */}
      <g transform="translate(196,44)">
        <line x1="0" y1="56" x2="106" y2="56" stroke={P.gray} strokeWidth="1.5" />
        <line x1="0" y1="56" x2="0" y2="0" stroke={P.gray} strokeWidth="1.5" />
        <path d="M0 54 C 30 52 46 20 106 6" fill="none" stroke={P.blue} strokeWidth="2" />
        <text x="0" y="-6" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>SPEED ↔ ROTATION</text>
        <text x="0" y="72" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>1000 SONGS</text>
      </g>
      {/* 白色耳机线：低成本差异化 */}
      <path d="M122 24 C 122 10 196 6 214 16" fill="none" stroke="#fff" strokeWidth="4" />
      <path d="M122 24 C 122 10 196 6 214 16" fill="none" stroke={P.gray} strokeWidth="1" />
      <circle cx="218" cy="18" r="5" fill="#fff" stroke={P.gray} strokeWidth="1.5" />
      <text x="228" y="22" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>WHITE = ADVERT</text>
      <text x="20" y="206" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>ONE SENTENCE, ONE PRODUCT</text>
    </svg>
  ),

  /* ===== 主题日 15 · 战后意大利设计：观念与工程研究图 ===== */
  valentineRed: (
    <svg viewBox="0 0 320 220" role="img" aria-label="产品人格化研究：艳红机体与提盒，从办公室走向乡间的场景转移">
      <rect width="320" height="220" fill="#fff" />
      {/* 打字机主体 */}
      <path d="M70 112 L214 112 L222 166 L62 166 Z" fill="#D0361F" stroke={P.ink} strokeWidth="2" />
      <path d="M84 96 L200 96 L214 112 L70 112 Z" fill="#B02A15" />
      {[0, 1, 2, 3].map(r => (
        [...Array(9)].map((_, c) => (
          <circle key={`${r}-${c}`} cx={82 + c * 16 + r * 4} cy={124 + r * 11} r="3.4" fill="#F2F0E8" />
        ))
      ))}
      <rect x="96" y="76" width="92" height="20" rx="3" fill="#B02A15" stroke={P.ink} strokeWidth="1.5" />
      <rect x="112" y="60" width="60" height="18" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      {/* 提盒：可拎走的机器 */}
      <path d="M232 104 L294 104 L294 170 L232 170 Z" fill="#D0361F" stroke={P.ink} strokeWidth="2" />
      <path d="M248 104 C 248 84 278 84 278 104" fill="none" stroke={P.ink} strokeWidth="3" />
      <text x="230" y="186" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>CARRY CASE</text>
      {/* 场景转移：办公室 → 乡间 */}
      <g transform="translate(24,42)">
        <rect x="0" y="0" width="26" height="22" fill="none" stroke={P.gray} strokeWidth="1.5" />
        <line x1="0" y1="8" x2="26" y2="8" stroke={P.gray} strokeWidth="1.5" />
        <text x="-4" y="36" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>OFFICE</text>
      </g>
      <line x1="58" y1="50" x2="84" y2="50" stroke={P.red} strokeWidth="1.5" />
      <path d="M90 50 L80 45 L80 55 Z" fill={P.red} />
      <g transform="translate(100,36)">
        <path d="M0 28 C 10 12 22 12 32 28 Z" fill="none" stroke={P.red} strokeWidth="1.5" />
        <circle cx="42" cy="8" r="6" fill="none" stroke={P.red} strokeWidth="1.5" />
        <text x="-2" y="44" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.red}>SUNDAY, COUNTRYSIDE</text>
      </g>
      <text x="20" y="208" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>A BRIEF WRITTEN AS A MOOD</text>
    </svg>
  ),
  superleggeraLight: (
    <svg viewBox="0 0 320 220" role="img" aria-label="极限减重研究：三角截面的削减与抛落不碎的结构验证">
      <rect width="320" height="220" fill="#fff" />
      {/* 椅子：极细杆件 */}
      <g stroke="#C9922E" strokeWidth="4" strokeLinecap="round" fill="none">
        <line x1="96" y1="42" x2="104" y2="124" />
        <line x1="150" y1="40" x2="146" y2="124" />
        <line x1="98" y1="58" x2="149" y2="56" />
        <line x1="100" y1="82" x2="148" y2="80" />
        <line x1="104" y1="124" x2="96" y2="186" />
        <line x1="146" y1="124" x2="152" y2="186" />
        <line x1="180" y1="132" x2="188" y2="186" />
        <line x1="104" y1="124" x2="180" y2="132" />
        <line x1="146" y1="124" x2="180" y2="132" />
        <line x1="100" y1="160" x2="184" y2="164" />
      </g>
      <path d="M104 124 L180 132 L188 140 L110 132 Z" fill="#E8DCC2" stroke={P.ink} strokeWidth="1" />
      <line x1="76" y1="190" x2="212" y2="190" stroke={P.ink} strokeWidth="1.5" />
      {/* 三角截面：削到极限 */}
      <g transform="translate(232,52)">
        <circle cx="26" cy="26" r="26" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M26 6 L44 38 L8 38 Z" fill="#C9922E" stroke={P.ink} strokeWidth="1.5" />
        <text x="-6" y="70" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>TRIANGULAR SECTION</text>
      </g>
      {/* 抛落验证 */}
      <g transform="translate(236,136)">
        <path d="M14 0 C 14 20 6 34 14 52" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="5 4" />
        <path d="M14 58 L9 46 L19 46 Z" fill={P.red} />
        <path d="M0 62 C 10 56 22 56 32 62" fill="none" stroke={P.red} strokeWidth="1.5" />
        <text x="-14" y="80" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>DROPPED — BOUNCES</text>
      </g>
      <text x="20" y="34" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>1.7 kg</text>
      <text x="20" y="206" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>REDESIGN OF A FISHERMAN&#39;S CHAIR</text>
    </svg>
  ),
  memphisTotem: (
    <svg viewBox="0 0 320 220" role="img" aria-label="对好品味的罢工研究：斜板、糖果色与图腾式堆叠的反功能构成">
      <rect width="320" height="220" fill="#fff" />
      {/* 图腾式堆叠：倾斜的搁板放不稳书 */}
      <rect x="140" y="40" width="20" height="150" fill="#2E68B0" />
      <path d="M92 74 L160 58 L160 74 L92 90 Z" fill="#D0361F" />
      <path d="M160 96 L226 80 L226 96 L160 112 Z" fill={P.yellow} />
      <path d="M96 128 L160 116 L160 132 L96 144 Z" fill="#4CA64C" />
      <path d="M160 152 L222 140 L222 156 L160 168 Z" fill="#8E3B8E" />
      <rect x="112" y="184" width="76" height="14" fill="#E8B50C" />
      {/* 廉价贴面纹样 */}
      {[...Array(10)].map((_, i) => (
        <g key={i}>
          <circle cx={118 + (i % 5) * 16} cy={188 + Math.floor(i / 5) * 6} r="2" fill={P.ink} />
        </g>
      ))}
      {/* 放不稳的书：功能的公然失效 */}
      <g transform="translate(176,72) rotate(-14)">
        <rect x="0" y="0" width="22" height="16" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      </g>
      <path d="M204 96 C 210 106 214 112 216 122" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="212" y="134" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>SLIDES OFF</text>
      {/* 好设计清单的反面 */}
      <g transform="translate(20,44)">
        {["SYMMETRY", "NEUTRAL", "USEFUL"].map((t, i) => (
          <g key={i}>
            <text x="0" y={i * 22} fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>{t}</text>
            <line x1="-2" y1={i * 22 - 3} x2="56" y2={i * 22 - 3} stroke={P.red} strokeWidth="1.5" />
          </g>
        ))}
        <text x="0" y="80" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>TASTE IS</text>
        <text x="0" y="92" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>NEGOTIABLE</text>
      </g>
      <text x="20" y="208" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>FURNITURE AS TOTEM</text>
    </svg>
  ),
  alessiBird: (
    <svg viewBox="0 0 320 220" role="img" aria-label="情感化设计研究：锥体加热效率与以鸟鸣取代汽笛的愉悦事件">
      <rect width="320" height="220" fill="#fff" />
      {/* 宽底锥形壶身：加热效率与稳定 */}
      <path d="M74 178 L96 92 L192 92 L214 178 Z" fill="#DCDAD1" stroke={P.ink} strokeWidth="2.5" />
      <ellipse cx="144" cy="92" rx="48" ry="9" fill="#EFEEE8" stroke={P.ink} strokeWidth="2" />
      {/* 蓝色圆球手柄：防烫提示 */}
      <path d="M186 96 C 226 96 234 140 206 158" fill="none" stroke={P.ink} strokeWidth="5" />
      <circle cx="232" cy="122" r="11" fill="#2E68B0" stroke={P.ink} strokeWidth="1.5" />
      {/* 壶嘴与鸟 */}
      <path d="M74 122 L44 108 L40 122 L70 138 Z" fill="#DCDAD1" stroke={P.ink} strokeWidth="2" />
      <path d="M34 104 C 26 96 30 84 42 86 C 52 88 54 100 46 108 Z" fill={P.red} />
      <path d="M30 96 L20 92 L28 90 Z" fill={P.yellow} />
      {/* 鸟鸣：功能被转写为愉悦事件 */}
      {[0, 1, 2].map(i => (
        <path key={i} d={`M22 ${76 - i * 10} C 34 ${66 - i * 10} 48 ${72 - i * 10} 58 ${62 - i * 10}`}
          fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 4" opacity={0.9 - i * 0.24} />
      ))}
      <text x="66" y="52" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>BIRD SONG ≠ WHISTLE</text>
      {/* 加热效率：宽底受热面积 */}
      <line x1="74" y1="192" x2="214" y2="192" stroke={P.blue} strokeWidth="1.5" />
      {[...Array(7)].map((_, i) => (
        <path key={i} d={`M${86 + i * 21} 200 C ${90 + i * 21} 194 ${82 + i * 21} 190 ${86 + i * 21} 184`}
          fill="none" stroke={P.blue} strokeWidth="1.5" />
      ))}
      <text x="222" y="196" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>WIDE BASE</text>
      <text x="222" y="70" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>BRAND AS</text>
      <text x="222" y="82" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>CURATOR</text>
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>FUNCTION DRAMATISED</text>
    </svg>
  ),
  ts502Cube: (
    <svg viewBox="0 0 320 220" role="img" aria-label="两种存在状态研究：合上是沉默立方，打开才成为设备">
      <rect width="320" height="220" fill="#fff" />
      {/* 合上：休眠态的雕塑 */}
      <rect x="34" y="72" width="96" height="96" fill="#E8752A" stroke={P.ink} strokeWidth="2.5" />
      <line x1="34" y1="120" x2="130" y2="120" stroke={P.ink} strokeWidth="1.5" />
      <rect x="120" y="114" width="6" height="12" fill={P.ink} />
      <text x="34" y="190" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>CLOSED — SCULPTURE</text>
      {/* 开合动作：使用的序曲 */}
      <path d="M146 120 C 158 106 168 104 178 106" fill="none" stroke={P.blue} strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M184 106 L172 102 L176 112 Z" fill={P.blue} />
      <text x="140" y="142" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>HINGE RITUAL</text>
      {/* 打开：使用态的设备 */}
      <path d="M196 72 L292 72 L292 118 L196 118 Z" fill="#E8752A" stroke={P.ink} strokeWidth="2.5" transform="rotate(-16 196 118)" />
      <rect x="196" y="122" width="96" height="46" fill="#E8752A" stroke={P.ink} strokeWidth="2.5" />
      <circle cx="222" cy="145" r="13" fill="#C9C7BE" stroke={P.ink} strokeWidth="1.5" />
      <circle cx="222" cy="145" r="4" fill={P.ink} />
      {[...Array(12)].map((_, i) => (
        <circle key={i} cx={250 + (i % 4) * 12} cy={134 + Math.floor(i / 4) * 11} r="2.6" fill="#B5B3AA" />
      ))}
      <text x="196" y="190" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>OPEN — DEVICE</text>
      <text x="20" y="34" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>DESIGN THE OFF STATE</text>
      <text x="20" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>ELECTRONICS AS FURNITURE</text>
    </svg>
  ),
  /* ===== 主题日 16 · 北欧设计：自然与民主研究图 ===== */
  aaltoWave: (
    <svg viewBox="0 0 320 220" role="img" aria-label="自由曲线的来源研究：湖岸轮廓转化为器皿开口与木模吹制的微差">
      <rect width="320" height="220" fill="#fff" />
      {/* 湖岸线：自然轮廓 */}
      <path d="M20 54 C 56 40 74 66 108 58 C 140 50 152 74 186 66 C 216 58 238 74 300 62"
        fill="none" stroke={P.blue} strokeWidth="2" strokeDasharray="5 4" />
      <text x="20" y="42" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>SHORELINE</text>
      <line x1="150" y1="72" x2="150" y2="92" stroke={P.gray} strokeWidth="1.5" />
      <path d="M150 98 L145 86 L155 86 Z" fill={P.gray} />
      {/* 器皿：非对称的自由开口 */}
      <path d="M92 108 C 110 98 122 118 146 110 C 168 102 178 120 202 112 C 214 108 224 114 230 110
        L230 176 C 222 190 196 196 160 196 C 124 196 98 190 90 176 Z"
        fill="#DFF0EE" stroke={P.ink} strokeWidth="2.5" />
      <path d="M92 108 C 110 98 122 118 146 110 C 168 102 178 120 202 112 C 214 108 224 114 230 110"
        fill="none" stroke={P.blue} strokeWidth="3" />
      {/* 玻璃的高光与木纹微差 */}
      <path d="M112 128 C 108 150 110 168 118 182" fill="none" stroke="#fff" strokeWidth="4" opacity=".9" />
      {[0, 1, 2].map(i => (
        <path key={i} d={`M${150 + i * 22} 130 C ${146 + i * 22} 152 ${152 + i * 22} 170 ${148 + i * 22} 186`}
          fill="none" stroke="#B7CFCB" strokeWidth="1.5" />
      ))}
      {/* 不规定的使用方式 */}
      <line x1="120" y1="112" x2="120" y2="84" stroke={P.red} strokeWidth="2" />
      <line x1="176" y1="114" x2="176" y2="90" stroke={P.red} strokeWidth="2" />
      <line x1="214" y1="110" x2="214" y2="96" stroke={P.red} strokeWidth="2" />
      <text x="248" y="108" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>NO FIXED</text>
      <text x="248" y="120" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>ARRANGEMENT</text>
      <text x="20" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>ORGANIC CURVE AS POSITION</text>
    </svg>
  ),
  stoolLLeg: (
    <svg viewBox="0 0 320 220" role="img" aria-label="L形腿节点与堆叠螺旋研究：一个专利节点解决整件家具">
      <rect width="320" height="220" fill="#fff" />
      {/* L 腿节点放大 */}
      <g transform="translate(30,40)">
        <path d="M10 92 L10 30 C 10 16 22 10 36 10 L88 10" fill="none" stroke="#C9922E" strokeWidth="14" strokeLinecap="round" />
        <rect x="36" y="2" width="56" height="9" fill="#B5813C" />
        <circle cx="24" cy="24" r="16" fill="none" stroke={P.red} strokeWidth="2" strokeDasharray="4 3" />
        <text x="-4" y="120" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>BENT &amp; FIXED — NO BRACE</text>
      </g>
      {/* 堆叠螺旋：三足错开自然旋转成塔 */}
      <g transform="translate(206,40)">
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(${i * 4},${i * 26})`}>
            <ellipse cx="46" cy="16" rx="42" ry="12" fill="#E8DCC2" stroke={P.ink} strokeWidth="1.5" />
            <line x1={16 + i * 6} y1="22" x2={12 + i * 6} y2="44" stroke="#C9922E" strokeWidth="5" />
            <line x1={76 - i * 4} y1="22" x2={80 - i * 4} y2="44" stroke="#C9922E" strokeWidth="5" />
          </g>
        ))}
        <path d="M-12 20 C -26 60 -26 90 -12 124" fill="none" stroke={P.blue} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="-30" y="146" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>STACKS INTO A SPIRAL</text>
      </g>
      <text x="20" y="28" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>ONE JOINT SOLVES THE WHOLE</text>
      <text x="20" y="208" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>FINNISH BIRCH · 1933</text>
    </svg>
  ),
  unikkoScale: (
    <svg viewBox="0 0 320 220" role="img" aria-label="图案尺度研究：花朵放大到超出布幅、边缘被裁切而获得抽象力量">
      <rect width="320" height="220" fill="#fff" />
      <rect x="20" y="26" width="196" height="172" fill="#F2EFE6" />
      {/* 放大到出框的花：手绘的歪斜被保留 */}
      <circle cx="112" cy="104" r="30" fill="#E8752A" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => {
        const a = i * Math.PI / 3.5;
        return (
          <ellipse key={i} cx={112 + 56 * Math.cos(a)} cy={104 + 56 * Math.sin(a)} rx="34" ry="26"
            fill="#D0361F" transform={`rotate(${i * 51 + 8} ${112 + 56 * Math.cos(a)} ${104 + 56 * Math.sin(a)})`} />
        );
      })}
      <circle cx="112" cy="104" r="30" fill="#E8B50C" />
      <circle cx="112" cy="104" r="14" fill="#B02A15" />
      {/* 被布幅裁切的第二朵 */}
      <circle cx="212" cy="186" r="26" fill="#E8B50C" />
      <circle cx="212" cy="186" r="46" fill="none" stroke="#D0361F" strokeWidth="22" strokeDasharray="30 18" />
      <rect x="216" y="26" width="6" height="172" fill="#fff" />
      {/* 尺度对照：常规印花 */}
      <g transform="translate(238,52)">
        {[...Array(9)].map((_, i) => (
          <circle key={i} cx={10 + (i % 3) * 22} cy={10 + Math.floor(i / 3) * 22} r="6" fill="#C9C7BE" />
        ))}
        <text x="-2" y="82" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>USUAL SCALE</text>
      </g>
      <line x1="238" y1="104" x2="238" y2="130" stroke={P.red} strokeWidth="1.5" />
      <path d="M238 136 L233 124 L243 124 Z" fill={P.red} />
      <text x="238" y="154" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>×20 SCALE</text>
      <text x="238" y="168" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>= ABSTRACTION</text>
      <text x="20" y="18" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>CROPPED BY THE CLOTH</text>
    </svg>
  ),
  legoStud: (
    <svg viewBox="0 0 320 220" role="img" aria-label="凸管夹持结构研究：稳固与可拆之间的公差甜点与向后兼容">
      <rect width="320" height="220" fill="#fff" />
      {/* 剖面：上砖的内管与下砖的凸点咬合 */}
      <rect x="54" y="44" width="150" height="46" fill="#D0361F" stroke={P.ink} strokeWidth="2" />
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={68 + i * 36} y="30" width="22" height="14" rx="3" fill="#D0361F" stroke={P.ink} strokeWidth="2" />
      ))}
      <rect x="54" y="106" width="150" height="46" fill="#2E68B0" stroke={P.ink} strokeWidth="2" />
      {[0, 1, 2, 3].map(i => (
        <rect key={"s" + i} x={68 + i * 36} y="92" width="22" height="14" rx="3" fill="#2E68B0" stroke={P.ink} strokeWidth="2" />
      ))}
      {/* 内管：夹持凸点的三点接触 */}
      {[0, 1, 2].map(i => (
        <circle key={"t" + i} cx={104 + i * 36} cy="128" r="11" fill="none" stroke="#fff" strokeWidth="3" />
      ))}
      {[0, 1, 2, 3].map(i => (
        <rect key={"g" + i} x={68 + i * 36} y="106" width="22" height="14" fill="#1F4E8C" />
      ))}
      {/* 夹持力甜点 */}
      <g transform="translate(224,44)">
        <line x1="0" y1="96" x2="76" y2="96" stroke={P.gray} strokeWidth="1.5" />
        <line x1="0" y1="96" x2="0" y2="16" stroke={P.gray} strokeWidth="1.5" />
        <path d="M0 92 C 22 92 30 24 38 24 C 46 24 56 90 76 92" fill="none" stroke={P.red} strokeWidth="2" />
        <line x1="38" y1="24" x2="38" y2="96" stroke={P.red} strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="38" cy="24" r="4" fill={P.red} />
        <text x="-2" y="10" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>CLUTCH SWEET SPOT</text>
        <text x="-4" y="112" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>LOOSE</text>
        <text x="52" y="112" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>TIGHT</text>
      </g>
      {/* 向后兼容 */}
      <line x1="54" y1="176" x2="204" y2="176" stroke={P.blue} strokeWidth="1.5" />
      <text x="54" y="192" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>1958 BRICK STILL FITS TODAY</text>
      <text x="20" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>A SYSTEM, NOT A TOY</text>
    </svg>
  ),
  beogramTangent: (
    <svg viewBox="0 0 320 220" role="img" aria-label="切线循迹研究：唱臂平移消除循迹失真，技术转化为可观赏的仪式">
      <rect width="320" height="220" fill="#fff" />
      {/* 铝面机身 */}
      <rect x="34" y="52" width="252" height="132" rx="4" fill="#D8D6CE" stroke={P.ink} strokeWidth="2" />
      {[...Array(14)].map((_, i) => (
        <line key={i} x1={40 + i * 18} y1="52" x2={40 + i * 18} y2="184" stroke="#C4C2B9" strokeWidth="1" />
      ))}
      {/* 唱片 */}
      <circle cx="136" cy="118" r="58" fill={P.ink} />
      <circle cx="136" cy="118" r="20" fill="#C9C7BE" />
      <circle cx="136" cy="118" r="3" fill="#fff" />
      {[28, 38, 48].map((r, i) => (
        <circle key={i} cx="136" cy="118" r={r} fill="none" stroke="#3A3830" strokeWidth="1" />
      ))}
      {/* 切线臂：沿半径平移而非旋转 */}
      <line x1="136" y1="46" x2="136" y2="184" stroke="#B5B3AA" strokeWidth="1" strokeDasharray="4 4" />
      <rect x="112" y="64" width="90" height="9" rx="2" fill="#9C9A92" stroke={P.ink} strokeWidth="1.5" />
      <rect x="126" y="73" width="12" height="16" fill={P.ink} />
      <line x1="136" y1="89" x2="136" y2="98" stroke={P.red} strokeWidth="2" />
      {/* 平移轨迹 */}
      <line x1="84" y1="118" x2="136" y2="118" stroke={P.red} strokeWidth="1.5" strokeDasharray="5 4" />
      <path d="M78 118 L90 113 L90 123 Z" fill={P.red} />
      <text x="62" y="140" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>TANGENT TRAVEL</text>
      {/* 对照：普通旋转臂的循迹角误差 */}
      <g transform="translate(212,96)">
        <circle cx="34" cy="34" r="34" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="72" y1="4" x2="34" y2="34" stroke={P.gray} strokeWidth="2" />
        <path d="M34 34 L56 18" fill="none" stroke={P.red} strokeWidth="1.5" />
        <text x="-6" y="88" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>PIVOT ARM — ERROR</text>
      </g>
      {/* 极少的操作元素 */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={222 + i * 18} y="66" width="12" height="4" fill={P.ink} />
      ))}
      <text x="20" y="34" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>TECHNIQUE MADE VISIBLE</text>
      <text x="20" y="206" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>BRUSHED ALUMINIUM GRAMMAR</text>
    </svg>
  ),

  /* ===== 主题日 17 · 日本设计 II：观念与材料研究图 ===== */
  fukudaReversal: (
    <svg viewBox="0 0 320 220" role="img" aria-label="视觉反转研究：炮弹回飞炮管，以一处反常完成反战寓言">
      <rect width="320" height="220" fill="#fff" />
      <rect x="20" y="24" width="280" height="172" fill="#E8DCC2" />
      {/* 炮管 */}
      <path d="M40 150 L206 150 L206 124 L40 124 Z" fill={P.ink} />
      <path d="M206 158 L246 158 L246 116 L206 116 Z" fill={P.ink} />
      <circle cx="40" cy="137" r="22" fill={P.ink} />
      {/* 炮弹：方向反转，飞回自身 */}
      <g transform="translate(262,122)">
        <path d="M26 15 L10 0 L-14 0 L-14 30 L10 30 Z" fill={P.red} />
        <path d="M-14 4 L-24 -4 L-24 34 L-14 26 Z" fill={P.red} />
      </g>
      {/* 反向轨迹 */}
      <path d="M296 104 C 274 86 246 90 236 110" fill="none" stroke={P.ink} strokeWidth="1.5" strokeDasharray="5 4" />
      <path d="M234 116 L232 104 L242 108 Z" fill={P.ink} />
      {/* 一秒钟的顿悟 */}
      <text x="36" y="188" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>ONE OBJECT + ONE ANOMALY</text>
      <text x="200" y="52" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>RETURNS TO SENDER</text>
      <line x1="252" y1="58" x2="268" y2="96" stroke={P.red} strokeWidth="1" strokeDasharray="3 3" />
      <text x="20" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>HUMOUR BYPASSES DEFENCE</text>
    </svg>
  ),
  yokooCollage: (
    <svg viewBox="0 0 320 220" role="img" aria-label="过剩美学研究：旭日放射、拼贴与霓虹配色对国际风格的起义">
      <rect width="320" height="220" fill="#fff" />
      <rect x="20" y="22" width="280" height="176" fill="#F2D0A8" />
      {/* 旭日放射 */}
      {[...Array(16)].map((_, i) => {
        const a = (i * Math.PI) / 8;
        return (
          <path key={i} d={`M160 110 L${160 + 190 * Math.cos(a)} ${110 + 190 * Math.sin(a)} L${160 + 190 * Math.cos(a + 0.19)} ${110 + 190 * Math.sin(a + 0.19)} Z`}
            fill={i % 2 ? "#D0361F" : "#E8752A"} opacity=".85" />
        );
      })}
      <rect x="20" y="22" width="280" height="176" fill="none" stroke="#fff" strokeWidth="0" />
      {/* 中央圆日 */}
      <circle cx="160" cy="110" r="34" fill="#E8B50C" stroke={P.ink} strokeWidth="2" />
      {/* 拼贴照片块：私人图像直接印上商业海报 */}
      <rect x="44" y="40" width="54" height="66" fill="#8E3B8E" stroke="#fff" strokeWidth="3" transform="rotate(-6 44 40)" />
      <rect x="226" y="126" width="58" height="52" fill="#2E68B0" stroke="#fff" strokeWidth="3" transform="rotate(5 226 126)" />
      {/* 密集字块：土俗招贴的排字 */}
      {[0, 1, 2].map(i => (
        <rect key={i} x="40" y={150 + i * 14} width={128 - i * 26} height="9" fill={P.ink} />
      ))}
      <rect x="216" y="42" width="66" height="12" fill={P.ink} />
      <rect x="216" y="58" width="48" height="8" fill="#fff" />
      {/* 与瑞士网格的对照 */}
      <g transform="translate(24,204)">
        <text x="0" y="0" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>AGAINST THE GRID · EXCESS AS AVANT-GARDE</text>
      </g>
      <text x="20" y="18" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>FESTIVAL COLOUR · COLLAGE · RAYS</text>
    </svg>
  ),
  miyakePleats: (
    <svg viewBox="0 0 320 220" role="img" aria-label="工艺顺序翻转研究：先裁剪成衣后热压定褶，材料获得记忆">
      <rect width="320" height="220" fill="#fff" />
      {/* 步骤一：整片布 */}
      <rect x="26" y="60" width="66" height="96" fill="#EFEEE8" stroke={P.ink} strokeWidth="1.5" />
      <text x="26" y="176" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>1 · ONE CLOTH</text>
      <line x1="98" y1="108" x2="116" y2="108" stroke={P.ink} strokeWidth="1.5" />
      <path d="M122 108 L112 103 L112 113 Z" fill={P.ink} />
      {/* 步骤二：先裁剪成衣（超大版型） */}
      <path d="M134 62 L200 62 L212 84 L196 92 L196 156 L138 156 L138 92 L122 84 Z"
        fill="#EFEEE8" stroke={P.ink} strokeWidth="1.5" />
      <text x="130" y="176" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>2 · CUT OVERSIZE</text>
      <line x1="220" y1="108" x2="238" y2="108" stroke={P.red} strokeWidth="1.5" />
      <path d="M244 108 L234 103 L234 113 Z" fill={P.red} />
      {/* 步骤三：热压定褶，尺寸收缩、材料获得记忆 */}
      <path d="M252 70 L298 70 L302 88 L294 92 L294 148 L256 148 L256 92 L248 88 Z"
        fill="#B7A6D6" stroke={P.ink} strokeWidth="1.5" />
      {[...Array(9)].map((_, i) => (
        <line key={i} x1={254 + i * 5.4} y1="70" x2={254 + i * 5.4} y2="148" stroke="#8E7CB8" strokeWidth="1.2" />
      ))}
      <text x="248" y="176" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>3 · HEAT-PRESS</text>
      {/* 翻转说明：常规是先打褶再裁剪 */}
      <text x="26" y="36" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>USUAL ORDER — PLEAT, THEN CUT</text>
      <line x1="24" y1="42" x2="228" y2="42" stroke={P.red} strokeWidth="1.5" />
      <text x="26" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>REVERSED ORDER = NEW TERRITORY</text>
      <text x="236" y="200" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>WASHABLE</text>
    </svg>
  ),
  nagaiLines: (
    <svg viewBox="0 0 320 220" role="img" aria-label="线条呼吸研究：上万条颤动短线织出毛羽，动物正面凝视观者">
      <rect width="320" height="220" fill="#fff" />
      {/* 以短线织出的动物头部 */}
      <ellipse cx="160" cy="116" rx="72" ry="82" fill="#F7F6F2" />
      {[...Array(30)].map((_, r) => (
        [...Array(16)].map((_, c) => {
          const x = 96 + c * 8.6 + ((r % 2) * 4);
          const y = 44 + r * 4.8;
          const dx = (x - 160) / 72;
          const dy = (y - 116) / 82;
          if (dx * dx + dy * dy > 1) return null;
          return <line key={`${r}-${c}`} x1={x} y1={y} x2={x + 2} y2={y + 4.4} stroke={P.ink} strokeWidth="1" opacity=".72" />;
        })
      ))}
      {/* 正面直视的眼睛：人与自然位置对调 */}
      <ellipse cx="132" cy="106" rx="13" ry="15" fill="#fff" stroke={P.ink} strokeWidth="2" />
      <ellipse cx="188" cy="106" rx="13" ry="15" fill="#fff" stroke={P.ink} strokeWidth="2" />
      <circle cx="132" cy="108" r="7" fill={P.ink} />
      <circle cx="188" cy="108" r="7" fill={P.ink} />
      <circle cx="129" cy="104" r="2.4" fill="#fff" />
      <circle cx="185" cy="104" r="2.4" fill="#fff" />
      <path d="M150 146 C 156 140 164 140 170 146 C 164 154 156 154 150 146 Z" fill={P.red} />
      {/* 线条密度标注 */}
      <line x1="238" y1="60" x2="238" y2="160" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(250,${70 + i * 38})`}>
          {[...Array(6 + i * 5)].map((_, k) => (
            <line key={k} x1={k * (22 / (6 + i * 5))} y1="0" x2={k * (22 / (6 + i * 5)) + 2} y2="12" stroke={P.ink} strokeWidth="1" />
          ))}
          <text x="30" y="10" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>{["THIN", "MID", "DENSE"][i]}</text>
        </g>
      ))}
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>HAND TREMOR AS LIFE</text>
      <text x="20" y="208" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>THE ANIMAL LOOKS BACK</text>
    </svg>
  ),
  satohMilk: (
    <svg viewBox="0 0 320 220" role="img" aria-label="日常再设计研究：信息层级的毫米推敲与经得起十年注视的克制">
      <rect width="320" height="220" fill="#fff" />
      {/* 纸盒正面 */}
      <path d="M92 44 L206 44 L206 190 L92 190 Z" fill="#fff" stroke={P.ink} strokeWidth="2" />
      <path d="M92 44 L118 26 L232 26 L206 44 Z" fill="#F4F3EE" stroke={P.ink} strokeWidth="2" />
      <path d="M206 44 L232 26 L232 172 L206 190 Z" fill="#EFEEE8" stroke={P.ink} strokeWidth="2" />
      {/* 品名与卖点：字号层级经过推敲 */}
      <rect x="108" y="66" width="82" height="16" fill="#1B3F8B" />
      <rect x="108" y="88" width="56" height="8" fill="#1B3F8B" />
      <rect x="108" y="102" width="40" height="5" fill="#8A8880" />
      {/* 一杯牛奶的照片位 */}
      <path d="M126 122 L172 122 L166 168 L132 168 Z" fill="#F2F0E8" stroke="#C9C7BE" strokeWidth="1.5" />
      <path d="M128 136 L170 136 L166 168 L132 168 Z" fill="#fff" stroke="#DCDAD1" strokeWidth="1" />
      <rect x="108" y="178" width="38" height="5" fill="#B5B3AA" />
      {/* 层级标注：毫米级的秩序 */}
      {[[66, "1"], [88, "2"], [102, "3"], [178, "4"]].map(([y, n], i) => (
        <g key={i}>
          <line x1="80" y1={y + 4} x2="104" y2={y + 4} stroke={P.blue} strokeWidth="1" strokeDasharray="3 2" />
          <text x="66" y={y + 8} fontFamily="Archivo,sans-serif" fontSize="8" fontWeight="700" fill={P.blue}>{n}</text>
        </g>
      ))}
      <text x="36" y="200" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>HIERARCHY</text>
      {/* 解剖：向公众解释设计 */}
      <g transform="translate(250,60)">
        {["PAPER", "INK", "CAP", "MILK"].map((t, i) => (
          <g key={i}>
            <rect x="0" y={i * 28} width="18" height="18" fill="none" stroke={P.gray} strokeWidth="1.5" />
            <text x="24" y={i * 28 + 13} fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>{t}</text>
          </g>
        ))}
        <text x="-2" y="132" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>ANATOMY OF</text>
        <text x="-2" y="144" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>DESIGN</text>
      </g>
      <text x="20" y="22" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>SEEN 100 TIMES A DAY</text>
    </svg>
  ),
  /* ===== 主题日 18 · 美国平面与广告：论点即版式研究图 ===== */
  thinkSmallVoid: (
    <svg viewBox="0 0 320 220" role="img" aria-label="留白作为论点研究：昂贵版面大片空置，把「小」演给读者看">
      <rect width="320" height="220" fill="#fff" />
      <rect x="20" y="20" width="280" height="180" fill="#F7F6F2" stroke={P.gray} strokeWidth="1" />
      {/* 极小的主体：被留白包围 */}
      <g transform="translate(96,60)">
        <path d="M0 22 C 1 14 6 10 12 9 C 16 2 30 2 34 9 C 40 10 45 14 46 22 Z" fill={P.ink} />
        <circle cx="12" cy="23" r="4.5" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
        <circle cx="34" cy="23" r="4.5" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      </g>
      {/* 留白量的标注 */}
      <line x1="40" y1="40" x2="40" y2="180" stroke={P.blue} strokeWidth="1" strokeDasharray="4 3" />
      <line x1="34" y1="40" x2="46" y2="40" stroke={P.blue} strokeWidth="1.5" />
      <line x1="34" y1="180" x2="46" y2="180" stroke={P.blue} strokeWidth="1.5" />
      <text x="50" y="164" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>PAID SPACE, LEFT EMPTY</text>
      {/* 标题与正文：坦白的文案 */}
      <rect x="96" y="146" width="66" height="9" fill={P.ink} />
      {[0, 1, 2].map(i => (
        <line key={i} x1="96" y1={166 + i * 8} x2={i === 2 ? 156 : 196} y2={166 + i * 8} stroke="#8A8880" strokeWidth="2" />
      ))}
      {/* 对照：同期广告的夸张做法 */}
      <g transform="translate(212,44)">
        <rect x="0" y="0" width="76" height="60" fill="#EFEEE8" stroke={P.gray} strokeWidth="1.5" />
        <path d="M6 44 C 10 24 22 18 38 18 C 56 18 68 26 70 44 Z" fill={P.gray} />
        <rect x="6" y="6" width="64" height="8" fill={P.gray} />
        <text x="-2" y="76" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>RIVALS — FILL IT ALL</text>
        <line x1="0" y1="-6" x2="76" y2="-6" stroke={P.red} strokeWidth="1.5" />
      </g>
      <text x="20" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>LAYOUT IS THE ARGUMENT</text>
      <text x="212" y="140" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>HONESTY AS STRATEGY</text>
    </svg>
  ),
  lubalinLigature: (
    <svg viewBox="0 0 320 220" role="img" aria-label="负空间雕刻研究：字距压至笔画相触，字间空气成为被雕刻的形">
      <rect width="320" height="220" fill="#fff" />
      {/* 常规字距 */}
      <g transform="translate(34,50)">
        <path d="M0 60 L18 6 L36 60" fill="none" stroke={P.gray} strokeWidth="9" />
        <path d="M52 6 L70 60 L88 6" fill="none" stroke={P.gray} strokeWidth="9" />
        <text x="-4" y="84" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>NORMAL SPACING</text>
      </g>
      {/* 极限压缩：共享斜边的连字 */}
      <g transform="translate(180,50)">
        <path d="M0 60 L22 6 L44 60" fill="none" stroke={P.ink} strokeWidth="10" />
        <path d="M30 6 L52 60 L74 6" fill="none" stroke={P.ink} strokeWidth="10" />
        <path d="M22 6 L37 42 L30 6 Z" fill={P.red} />
        <text x="-4" y="84" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>LIGATURE — SHARED EDGE</text>
      </g>
      <text x="216" y="30" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>NEGATIVE SPACE CARVED</text>
      {/* 字间空气的形状 */}
      <g transform="translate(34,148)">
        <rect x="0" y="0" width="120" height="44" fill="#EFEEE8" />
        <path d="M18 44 L36 0 L54 44 Z" fill="#fff" />
        <path d="M66 0 L84 44 L102 0 Z" fill="#fff" />
        <text x="-4" y="60" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>THE AIR BETWEEN</text>
      </g>
      {/* 使用语境的警示 */}
      <g transform="translate(184,148)">
        <rect x="0" y="0" width="120" height="44" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 3" />
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1="8" y1={10 + i * 9} x2={i === 3 ? 76 : 112} y2={10 + i * 9} stroke={P.gray} strokeWidth="2" />
        ))}
        <line x1="0" y1="0" x2="120" y2="44" stroke={P.red} strokeWidth="2" />
        <text x="-2" y="60" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>NOT FOR BODY TEXT</text>
      </g>
      <text x="20" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>TYPE SET TO TOUCH</text>
    </svg>
  ),
  variableIdentity: (
    <svg viewBox="0 0 320 220" role="img" aria-label="可变识别研究：骨架恒定、表皮千变的标志系统">
      <rect width="320" height="220" fill="#fff" />
      <defs>
        <clipPath id="vi-mark">
          <path d="M8 76 L8 10 L26 10 L40 40 L54 10 L72 10 L72 76 L54 76 L54 40 L40 66 L26 40 L26 76 Z" />
        </clipPath>
      </defs>
      {/* 骨架：不变的粗壮字形 */}
      <g transform="translate(24,46)">
        <path d="M8 76 L8 10 L26 10 L40 40 L54 10 L72 10 L72 76 L54 76 L54 40 L40 66 L26 40 L26 76 Z"
          fill="none" stroke={P.ink} strokeWidth="2" strokeDasharray="4 3" />
        <text x="-4" y="98" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>CONSTANT SKELETON</text>
      </g>
      {/* 三种可替换的表皮 */}
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(${126 + i * 62},46)`}>
          <g clipPath="url(#vi-mark)">
            <rect x="0" y="0" width="80" height="86" fill={["#D0361F", "#2E68B0", "#E8B50C"][i]} />
            {i === 0 && [...Array(8)].map((_, k) => (
              <line key={k} x1={k * 12} y1="0" x2={k * 12 - 20} y2="86" stroke="#fff" strokeWidth="4" />
            ))}
            {i === 1 && [...Array(12)].map((_, k) => (
              <circle key={k} cx={8 + (k % 4) * 22} cy={12 + Math.floor(k / 4) * 28} r="7" fill="#fff" />
            ))}
            {i === 2 && [...Array(5)].map((_, k) => (
              <rect key={k} x="0" y={k * 18} width="80" height="8" fill={P.ink} />
            ))}
          </g>
          <path d="M8 76 L8 10 L26 10 L40 40 L54 10 L72 10 L72 76 L54 76 L54 40 L40 66 L26 40 L26 76 Z"
            fill="none" stroke={P.ink} strokeWidth="1.5" />
        </g>
      ))}
      <text x="126" y="144" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>INFINITE SKINS</text>
      {/* 喷漆字：街头文化进入主流识别 */}
      <g transform="translate(126,166)">
        <path d="M0 22 C 10 4 26 4 34 16 C 42 4 58 4 66 20" fill="none" stroke={P.ink} strokeWidth="7" strokeLinecap="round" />
        {[...Array(14)].map((_, i) => (
          <circle key={i} cx={4 + i * 5} cy={30 + (i % 3) * 3} r="1.6" fill={P.gray} />
        ))}
        <text x="80" y="26" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>SPRAY-PAINT LEGITIMISED</text>
      </g>
      <text x="20" y="26" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>CHANGE ITSELF IS THE IDENTITY</text>
    </svg>
  ),
  scherVolume: (
    <svg viewBox="0 0 320 220" role="img" aria-label="排印音量研究：木活字式密排、字号暴涨与方向冲撞形成识别音色">
      <rect width="320" height="220" fill="#fff" />
      <rect x="20" y="20" width="280" height="180" fill="#E8DCC2" />
      {/* 密排字块：木活字招贴的传统 */}
      <rect x="30" y="30" width="260" height="30" fill={P.ink} />
      <rect x="30" y="64" width="150" height="46" fill="#D0361F" />
      <rect x="184" y="64" width="106" height="20" fill={P.ink} />
      <rect x="184" y="88" width="106" height="22" fill="#1B3F8B" />
      {/* 斜冲出血的标语 */}
      <g transform="rotate(-8 160 134)">
        <rect x="14" y="120" width="300" height="28" fill={P.ink} />
        <rect x="24" y="126" width="120" height="16" fill="#E8B50C" />
      </g>
      <rect x="30" y="160" width="88" height="34" fill="#1B3F8B" />
      <rect x="124" y="160" width="60" height="34" fill="#D0361F" />
      <rect x="190" y="160" width="100" height="34" fill={P.ink} />
      {/* 无插图：文字即图像 */}
      <text x="20" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>NO IMAGE — TYPE IS THE PICTURE</text>
      <text x="196" y="16" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>IDENTITY BY VOLUME</text>
    </svg>
  ),
  stencilThree: (
    <svg viewBox="0 0 320 220" role="img" aria-label="三色模板化研究：连续影调被压缩为三层色块，图像因此可被二次创作">
      <rect width="320" height="220" fill="#fff" />
      {/* 连续影调 → 三色分层的过程 */}
      <g transform="translate(26,46)">
        <ellipse cx="42" cy="52" rx="34" ry="42" fill="#8A8880" />
        <ellipse cx="34" cy="44" rx="22" ry="28" fill="#B5B3AA" />
        <ellipse cx="30" cy="38" rx="12" ry="16" fill="#DCDAD1" />
        <text x="-6" y="116" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>CONTINUOUS TONE</text>
      </g>
      <line x1="118" y1="98" x2="140" y2="98" stroke={P.ink} strokeWidth="1.5" />
      <path d="M146 98 L136 93 L136 103 Z" fill={P.ink} />
      {/* 三层模板 */}
      <g transform="translate(160,46)">
        <ellipse cx="42" cy="52" rx="34" ry="42" fill="#1B3F8B" />
        <path d="M42 10 C 60 14 72 32 70 60 C 56 66 44 60 36 48 C 30 38 32 18 42 10 Z" fill="#D0361F" />
        <path d="M34 22 C 46 20 54 30 52 44 C 44 48 36 42 32 34 Z" fill="#E8DCC2" />
        <text x="-6" y="116" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>THREE FLAT LAYERS</text>
      </g>
      {/* 三色图例 */}
      <g transform="translate(262,52)">
        {["#1B3F8B", "#D0361F", "#E8DCC2"].map((c, i) => (
          <rect key={i} x="0" y={i * 22} width="34" height="16" fill={c} stroke={P.ink} strokeWidth="1" />
        ))}
        <text x="-2" y="82" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>3 PLATES</text>
      </g>
      {/* 可二创：模板被无限改编 */}
      <g transform="translate(26,176)">
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i} transform={`translate(${i * 40},0)`}>
            <ellipse cx="14" cy="14" rx="12" ry="15" fill={["#1B3F8B", "#4CA64C", "#8E3B8E", "#E8752A", "#2E68B0"][i]} />
            <path d="M14 1 C 20 3 24 9 23 18 C 18 21 13 18 10 13 Z" fill="#fff" opacity=".65" />
          </g>
        ))}
        <text x="212" y="18" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>REMIXABLE = VIRAL</text>
      </g>
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>STENCIL LOGIC</text>
    </svg>
  ),

  /* ===== 主题日 19 · 数字时代的体验：注意力与系统研究图 ===== */
  googleBlank: (
    <svg viewBox="0 0 320 220" role="img" aria-label="单一入口研究：门户堆叠链接与极简首页的元素数量对照">
      <rect width="320" height="220" fill="#fff" />
      {/* 左：门户时代——堆满链接 */}
      <rect x="22" y="36" width="126" height="152" fill="#F7F6F2" stroke={P.gray} strokeWidth="1.5" />
      {[...Array(11)].map((_, r) => (
        [...Array(3)].map((_, c) => (
          <line key={`${r}-${c}`} x1={30 + c * 40} y1={48 + r * 13} x2={30 + c * 40 + (c === 2 ? 22 : 30)} y2={48 + r * 13}
            stroke="#A8A69D" strokeWidth="3" />
        ))
      ))}
      <text x="22" y="204" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>PORTAL — 120+ LINKS</text>
      {/* 右：一个框 */}
      <rect x="172" y="36" width="126" height="152" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      <g transform="translate(200,86)">
        {["#2E68B0", "#D0361F", "#E8B50C", "#4CA64C"].map((c, i) => (
          <circle key={i} cx={i * 18} cy="0" r="7" fill={c} />
        ))}
      </g>
      <rect x="188" y="110" width="94" height="18" rx="9" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      <circle cx="274" cy="119" r="5" fill="none" stroke={P.gray} strokeWidth="1.5" />
      <rect x="206" y="142" width="26" height="10" fill="#EFEEE8" stroke={P.gray} strokeWidth="1" />
      <rect x="240" y="142" width="26" height="10" fill="#EFEEE8" stroke={P.gray} strokeWidth="1" />
      <text x="172" y="204" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>ONE FIELD</text>
      {/* 性能作为体验指标 */}
      <line x1="158" y1="36" x2="158" y2="188" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      <text x="172" y="26" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>BYTES BUDGETED · SPEED AS AESTHETIC</text>
      <text x="22" y="26" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>1998</text>
    </svg>
  ),
  dysonCyclone: (
    <svg viewBox="0 0 320 220" role="img" aria-label="透明集尘与工程美学研究：气旋分离路径与高亮标注的功能件">
      <rect width="320" height="220" fill="#fff" />
      {/* 机身 */}
      <path d="M96 190 L96 96 C 96 76 112 62 134 62 L166 62 C 188 62 202 76 202 96 L202 190 Z"
        fill="#D8D6CE" stroke={P.ink} strokeWidth="2.5" />
      {/* 透明集尘筒：看见灰尘成为卖点 */}
      <path d="M112 176 L112 104 C 112 92 124 84 142 84 L160 84 C 176 84 188 92 188 104 L188 176 Z"
        fill="#E8F0F7" stroke={P.ink} strokeWidth="2" />
      {/* 气旋路径 */}
      <path d="M150 96 C 176 102 178 122 156 128 C 134 134 126 152 146 160"
        fill="none" stroke={P.red} strokeWidth="2" strokeDasharray="5 4" />
      <path d="M150 164 L138 158 L148 152 Z" fill={P.red} />
      {/* 被分离的尘粒 */}
      {[[126, 150], [140, 166], [160, 158], [172, 144], [132, 134]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="#8A8880" />
      ))}
      {/* 高亮黄：关键功能件如工程图引注 */}
      <rect x="120" y="60" width="58" height="12" rx="3" fill="#E8B50C" stroke={P.ink} strokeWidth="1.5" />
      <path d="M202 120 L232 108 L240 124 L208 136 Z" fill="#E8B50C" stroke={P.ink} strokeWidth="1.5" />
      <circle cx="149" cy="190" r="10" fill={P.ink} />
      <line x1="184" y1="66" x2="230" y2="52" stroke={P.gray} strokeWidth="1" strokeDasharray="3 3" />
      <text x="234" y="52" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill="#B08A0C">YELLOW = FUNCTION</text>
      {/* 迭代次数 */}
      <g transform="translate(24,52)">
        <text x="0" y="0" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>PROTOTYPES</text>
        {[...Array(5)].map((_, r) => (
          [...Array(8)].map((_, c) => (
            <rect key={`${r}-${c}`} x={c * 7} y={8 + r * 7} width="4" height="4" fill="#C9C7BE" />
          ))
        ))}
        <text x="0" y="60" fontFamily="Archivo,sans-serif" fontSize="9" fontWeight="700" fill={P.red}>5127</text>
      </g>
      <text x="20" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>SHOW THE DIRT</text>
    </svg>
  ),
  wiiGesture: (
    <svg viewBox="0 0 320 220" role="img" aria-label="外形心理学研究：伪装成遥控器以降低门槛，动作取代按键组合">
      <rect width="320" height="220" fill="#fff" />
      {/* 手柄：熟悉的遥控器外形 */}
      <rect x="66" y="34" width="52" height="152" rx="10" fill="#F7F6F2" stroke={P.ink} strokeWidth="2.5" />
      <circle cx="92" cy="62" r="12" fill="#EFEEE8" stroke={P.ink} strokeWidth="1.5" />
      <line x1="92" y1="54" x2="92" y2="70" stroke={P.ink} strokeWidth="2" />
      <line x1="84" y1="62" x2="100" y2="62" stroke={P.ink} strokeWidth="2" />
      <circle cx="92" cy="92" r="6" fill={P.red} />
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x="82" y={112 + i * 16} width="20" height="7" rx="3" fill="#C9C7BE" />
      ))}
      {/* 对照：传统手柄的按键密度 */}
      <g transform="translate(24,40)">
        <path d="M0 14 C 10 4 26 4 32 14 C 38 4 54 4 64 14 L60 44 L4 44 Z" fill="none" stroke={P.gray} strokeWidth="1.5" />
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={10 + (i % 4) * 14} cy={22 + Math.floor(i / 4) * 12} r="3" fill={P.gray} />
        ))}
        <text x="-4" y="62" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>12 BUTTONS</text>
        <line x1="0" y1="-6" x2="64" y2="-6" stroke={P.red} strokeWidth="1.5" />
      </g>
      {/* 动作即输入：挥、指、倾 */}
      {[["SWING", 60], ["POINT", 108], ["TILT", 156]].map(([t, y], i) => (
        <g key={i} transform={`translate(156,${y})`}>
          <path d={i === 0 ? "M0 20 C 16 2 40 2 56 20" : i === 1 ? "M0 12 L56 12" : "M0 22 C 20 22 36 8 56 4"}
            fill="none" stroke={P.blue} strokeWidth="2.5" strokeDasharray="5 4" />
          <path d={i === 1 ? "M62 12 L50 7 L50 17 Z" : "M60 12 L48 8 L50 18 Z"} fill={P.blue} />
          <text x="76" y="16" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>{t}</text>
        </g>
      ))}
      {/* 用户版图扩大 */}
      <g transform="translate(232,34)">
        {[0, 1, 2].map(i => (
          <g key={i} transform={`translate(${i * 24},0)`}>
            <circle cx="8" cy="8" r="7" fill={i === 1 ? P.blue : "#C9C7BE"} />
            <path d="M2 18 C 2 14 14 14 14 18 L14 30 L2 30 Z" fill={i === 1 ? P.blue : "#C9C7BE"} />
          </g>
        ))}
        <text x="-4" y="46" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>NON-GAMERS INCLUDED</text>
      </g>
      <text x="20" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>FAMILIAR SHELL, NEW INPUT</text>
    </svg>
  ),
  kindleCalm: (
    <svg viewBox="0 0 320 220" role="img" aria-label="平静技术研究：不发光的电子墨水、零通知与云端书库的生态支撑">
      <rect width="320" height="220" fill="#fff" />
      {/* 设备：故意无聊的灰盒 */}
      <rect x="66" y="34" width="116" height="152" rx="6" fill="#DCDAD1" stroke={P.ink} strokeWidth="2.5" />
      <rect x="78" y="46" width="92" height="112" fill="#F4F3EE" stroke={P.gray} strokeWidth="1" />
      {[...Array(11)].map((_, i) => (
        <line key={i} x1="86" y1={58 + i * 9} x2={i === 10 ? 132 : 162} y2={58 + i * 9} stroke="#7A7870" strokeWidth="2" />
      ))}
      {[0, 1].map(i => (
        <rect key={"k" + i} x={86 + i * 60} y="166" width="34" height="8" rx="3" fill="#C4C2B9" />
      ))}
      {/* 对照：发光屏与通知打扰 */}
      <g transform="translate(206,40)">
        <rect x="0" y="0" width="76" height="120" rx="8" fill="#2A2A2A" stroke={P.ink} strokeWidth="2" />
        <rect x="8" y="10" width="60" height="100" fill="#4A6FA8" />
        {[0, 1, 2].map(i => (
          <rect key={i} x="12" y={16 + i * 22} width="52" height="16" rx="3" fill="#fff" opacity=".9" />
        ))}
        {[0, 1, 2].map(i => (
          <circle key={"d" + i} cx="66" cy={18 + i * 22} r="4" fill={P.red} />
        ))}
        <text x="-4" y="136" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>NOTIFICATIONS</text>
      </g>
      {/* 反射光 vs 背光 */}
      <path d="M46 44 L74 60" stroke={P.yellow} strokeWidth="2" />
      <path d="M46 56 L74 72" stroke={P.yellow} strokeWidth="2" />
      <text x="20" y="90" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill="#B08A0C">REFLECTED</text>
      <text x="20" y="102" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill="#B08A0C">LIGHT ONLY</text>
      {/* 生态：看不见的系统侧 */}
      <g transform="translate(66,192)">
        <path d="M14 10 C 14 2 28 -2 34 4 C 44 0 54 6 52 14 C 60 16 60 26 50 26 L10 26 C 0 26 0 12 14 10 Z"
          fill="none" stroke={P.blue} strokeWidth="1.5" />
        <line x1="32" y1="-4" x2="32" y2="-16" stroke={P.blue} strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="70" y="20" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>CLOUD LIBRARY — HALF THE DESIGN</text>
      </g>
      <text x="20" y="28" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>BORING ON PURPOSE</text>
    </svg>
  ),
  nestDial: (
    <svg viewBox="0 0 320 220" role="img" aria-label="单旋钮与学习型交互研究：复杂系统被压缩为一个环，配置被自动学习取代">
      <rect width="320" height="220" fill="#fff" />
      {/* 旋钮环：旋转调温、按压确认 */}
      <circle cx="120" cy="110" r="66" fill="#D8D6CE" stroke={P.ink} strokeWidth="2.5" />
      <circle cx="120" cy="110" r="52" fill="#1F2A36" />
      <path d="M120 44 A 66 66 0 0 1 178 142" fill="none" stroke={P.red} strokeWidth="5" />
      {[...Array(24)].map((_, i) => {
        const a = (i * Math.PI) / 12;
        return (
          <line key={i} x1={120 + 58 * Math.cos(a)} y1={110 + 58 * Math.sin(a)}
            x2={120 + 64 * Math.cos(a)} y2={110 + 64 * Math.sin(a)} stroke="#B5B3AA" strokeWidth="1.5" />
        );
      })}
      <text x="120" y="122" textAnchor="middle" fontFamily="Archivo,sans-serif" fontSize="34" fontWeight="700" fill="#fff">21</text>
      {/* 两种输入：旋与按 */}
      <path d="M186 74 C 204 86 206 108 192 122" fill="none" stroke={P.blue} strokeWidth="2" strokeDasharray="5 4" />
      <path d="M190 128 L186 116 L196 118 Z" fill={P.blue} />
      <text x="200" y="70" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>ROTATE = SET</text>
      <text x="200" y="136" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>PRESS = CONFIRM</text>
      {/* 学习替代设置：一周作息自动生成 */}
      <g transform="translate(196,158)">
        <line x1="0" y1="30" x2="104" y2="30" stroke={P.gray} strokeWidth="1.5" />
        <path d="M0 26 L14 26 L14 10 L34 10 L34 24 L58 24 L58 8 L80 8 L80 22 L104 22"
          fill="none" stroke={P.red} strokeWidth="2" />
        <text x="-2" y="46" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>LEARNS THE WEEK</text>
      </g>
      {/* 被划掉的配置项 */}
      <g transform="translate(24,42)">
        {["SCHEDULE", "PROGRAM", "TIMER"].map((t, i) => (
          <g key={i}>
            <text x="0" y={i * 18} fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>{t}</text>
            <line x1="-2" y1={i * 18 - 3} x2="56" y2={i * 18 - 3} stroke={P.red} strokeWidth="1.5" />
          </g>
        ))}
        <text x="-2" y="62" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>TASKS REMOVED</text>
      </g>
      <text x="20" y="206" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>A DULL CATEGORY, TAKEN SERIOUSLY</text>
    </svg>
  ),
  /* ===== 主题日 13 · 信息与界面：编码与界面语言研究图 ===== */
  isotypeRepeat: (
    <svg viewBox="0 0 320 220" role="img" aria-label="重复优于放大研究：等大符号的数量重复与错误的尺寸夸张对照">
      <rect width="320" height="220" fill="#fff" />
      {/* 正确：以数量重复表达倍数 */}
      <text x="20" y="34" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>REPEAT — HONEST</text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <g key={i} transform={`translate(${22 + i * 22},44)`}>
          <circle cx="7" cy="7" r="6" fill={P.ink} />
          <path d="M1 17 C 1 13 13 13 13 17 L13 32 L9 32 L9 24 L5 24 L5 32 L1 32 Z" fill={P.ink} />
        </g>
      ))}
      {[0, 1, 2, 3].map(i => (
        <g key={"b" + i} transform={`translate(${22 + i * 22},84)`}>
          <circle cx="7" cy="7" r="6" fill={P.red} />
          <path d="M1 17 C 1 13 13 13 13 17 L13 32 L9 32 L9 24 L5 24 L5 32 L1 32 Z" fill={P.red} />
        </g>
      ))}
      <line x1="20" y1="126" x2="200" y2="126" stroke={P.ink} strokeWidth="1.5" />
      <text x="204" y="70" fontFamily="Archivo,sans-serif" fontSize="9" fontWeight="700" fill={P.ink}>8×</text>
      <text x="204" y="110" fontFamily="Archivo,sans-serif" fontSize="9" fontWeight="700" fill={P.red}>4×</text>
      {/* 错误：放大尺寸造成面积误导 */}
      <text x="20" y="152" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>SCALE — MISLEADING</text>
      <g transform="translate(24,158)">
        <circle cx="6" cy="6" r="5" fill={P.gray} />
        <path d="M1 15 C 1 11 11 11 11 15 L11 28 L8 28 L8 22 L4 22 L4 28 L1 28 Z" fill={P.gray} />
      </g>
      <g transform="translate(60,156) scale(1.9)">
        <circle cx="6" cy="6" r="5" fill={P.gray} opacity=".55" />
        <path d="M1 15 C 1 11 11 11 11 15 L11 28 L8 28 L8 22 L4 22 L4 28 L1 28 Z" fill={P.gray} opacity=".55" />
      </g>
      <line x1="112" y1="160" x2="136" y2="196" stroke={P.red} strokeWidth="2.5" />
      <line x1="136" y1="160" x2="112" y2="196" stroke={P.red} strokeWidth="2.5" />
      {/* 符号字典 */}
      <text x="204" y="152" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>SYMBOL DICTIONARY</text>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <rect key={"d" + i} x={204 + (i % 3) * 22} y={158 + Math.floor(i / 3) * 22} width="16" height="16"
          fill="none" stroke={P.ink} strokeWidth="1.5" />
      ))}
      <circle cx="212" cy="166" r="4" fill={P.ink} />
      <rect x="228" y="162" width="8" height="8" fill={P.ink} />
      <path d="M250 170 L258 162 L258 170 Z" fill={P.ink} />
    </svg>
  ),
  minardFlow: (
    <svg viewBox="0 0 320 220" role="img" aria-label="六变量编码研究：线宽表兵力、颜色分进退、下方并置温度曲线">
      <rect width="320" height="220" fill="#fff" />
      {/* 进军：粗带自左向右渐细 */}
      <path d="M26 66 L96 64 L170 62 L236 60 L288 60 L288 72 L236 76 L170 82 L96 90 L26 96 Z" fill="#C9BFA6" />
      {/* 撤退：黑色细带向左回缩并持续变细 */}
      <path d="M288 80 L236 84 L170 92 L96 104 L26 114 L26 118 L96 110 L170 100 L236 90 L288 86 Z" fill={P.ink} />
      {/* 地点节点 */}
      {[[96, 78], [170, 84], [236, 78]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill={P.red} />
          <line x1={x} y1={y} x2={x} y2="150" stroke={P.gray} strokeWidth="1" strokeDasharray="3 3" />
        </g>
      ))}
      {/* 温度曲线：与路线共享横轴 */}
      <line x1="26" y1="150" x2="300" y2="150" stroke={P.gray} strokeWidth="1" />
      <polyline points="288,156 236,168 200,176 170,186 130,180 96,192 60,198 26,196"
        fill="none" stroke={P.blue} strokeWidth="2" />
      {[[288, 156], [236, 168], [170, 186], [96, 192], [26, 196]].map(([x, y], i) => (
        <circle key={"t" + i} cx={x} cy={y} r="3" fill={P.blue} />
      ))}
      {/* 变量图例 */}
      <text x="20" y="26" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>6 VARIABLES IN ONE PLANE</text>
      <rect x="20" y="34" width="18" height="10" fill="#C9BFA6" />
      <text x="42" y="43" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>ADVANCE</text>
      <rect x="98" y="34" width="18" height="6" fill={P.ink} />
      <text x="120" y="43" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>RETREAT</text>
      <text x="184" y="43" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.blue}>TEMPERATURE</text>
      {/* 兵力标注：从粗到一线 */}
      <text x="20" y="60" fontFamily="Archivo,sans-serif" fontSize="8" fontWeight="700" fill={P.ink}>422,000</text>
      <text x="264" y="52" fontFamily="Archivo,sans-serif" fontSize="8" fontWeight="700" fill={P.red}>10,000</text>
      <text x="20" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>WIDTH = LIVES</text>
    </svg>
  ),
  kareGrid: (
    <svg viewBox="0 0 320 220" role="img" aria-label="像素栅格中的图标造型研究：有限像素内的隐喻选择与曲线取舍">
      <rect width="320" height="220" fill="#fff" />
      {/* 栅格 */}
      {[...Array(13)].map((_, i) => (
        <line key={"v" + i} x1={24 + i * 13} y1="40" x2={24 + i * 13} y2="196" stroke="#E4E2DA" strokeWidth="1" />
      ))}
      {[...Array(13)].map((_, i) => (
        <line key={"h" + i} x1="24" y1={40 + i * 13} x2="180" y2={40 + i * 13} stroke="#E4E2DA" strokeWidth="1" />
      ))}
      {/* 像素图标：以方格逼近曲线 */}
      {[[4, 1], [5, 1], [6, 1], [7, 1], [3, 2], [8, 2], [2, 3], [9, 3], [2, 4], [9, 4], [2, 5], [9, 5],
      [3, 6], [8, 6], [4, 7], [5, 7], [6, 7], [7, 7], [5, 8], [6, 8], [5, 9], [6, 9], [4, 10], [5, 10],
      [6, 10], [7, 10]].map(([x, y], i) => (
        <rect key={i} x={24 + x * 13} y={40 + y * 13} width="13" height="13" fill={P.ink} />
      ))}
      {/* 理想曲线与像素逼近的差 */}
      <circle cx="102" cy="105" r="52" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 4" />
      {/* 右：隐喻取自日常物 */}
      <text x="204" y="34" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>METAPHORS</text>
      <g transform="translate(204,44)">
        <path d="M2 8 L24 8 L21 30 L5 30 Z" fill="none" stroke={P.ink} strokeWidth="2" />
        <line x1="0" y1="8" x2="26" y2="8" stroke={P.ink} strokeWidth="2" />
        <line x1="9" y1="13" x2="10" y2="26" stroke={P.ink} strokeWidth="1.5" />
        <line x1="17" y1="13" x2="16" y2="26" stroke={P.ink} strokeWidth="1.5" />
      </g>
      <g transform="translate(252,44)">
        <circle cx="13" cy="19" r="12" fill="none" stroke={P.ink} strokeWidth="2" />
        <line x1="13" y1="19" x2="13" y2="11" stroke={P.ink} strokeWidth="2" />
        <line x1="13" y1="19" x2="19" y2="22" stroke={P.ink} strokeWidth="2" />
      </g>
      <g transform="translate(204,94)">
        <rect x="2" y="10" width="24" height="20" fill="none" stroke={P.ink} strokeWidth="2" />
        <path d="M8 10 L8 4 L20 4 L20 10" fill="none" stroke={P.ink} strokeWidth="2" />
      </g>
      <g transform="translate(252,94)">
        <path d="M4 12 L22 12 L22 30 L4 30 Z" fill="none" stroke={P.ink} strokeWidth="2" />
        <path d="M4 12 C 8 4 18 4 22 12" fill="none" stroke={P.ink} strokeWidth="2" />
      </g>
      {/* 符号考古：来自露营地标志 */}
      <g transform="translate(228,150)">
        <path d="M6 6 L22 6 L22 22 L6 22 Z" fill="none" stroke={P.red} strokeWidth="2.5" />
        <circle cx="6" cy="6" r="5" fill="none" stroke={P.red} strokeWidth="2.5" />
        <circle cx="22" cy="6" r="5" fill="none" stroke={P.red} strokeWidth="2.5" />
        <circle cx="6" cy="22" r="5" fill="none" stroke={P.red} strokeWidth="2.5" />
        <circle cx="22" cy="22" r="5" fill="none" stroke={P.red} strokeWidth="2.5" />
      </g>
      <text x="196" y="198" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>BORROWED SYMBOL</text>
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>32 × 32 · BLACK &amp; WHITE</text>
    </svg>
  ),
  flatLayers: (
    <svg viewBox="0 0 320 220" role="img" aria-label="拟物到扁平的范式切换研究：质感剥离与图层深度的取代关系">
      <rect width="320" height="220" fill="#fff" />
      {/* 左：拟物——纹理、高光与投影承担可点击线索 */}
      <rect x="24" y="46" width="112" height="150" rx="10" fill="#EFE8DA" stroke={P.ink} strokeWidth="1.5" />
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={36} y={62 + i * 42} width="88" height="30" rx="6" fill="#DCCFB4" stroke="#B49B72" strokeWidth="1.5" />
          <rect x={36} y={62 + i * 42} width="88" height="9" rx="6" fill="#F0E7D2" />
          <line x1="40" y1={88 + i * 42} x2="120" y2={88 + i * 42} stroke="#B49B72" strokeWidth="1" strokeDasharray="2 3" />
        </g>
      ))}
      <text x="24" y="38" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>SKEUOMORPH</text>
      {/* 箭头 */}
      <line x1="148" y1="120" x2="172" y2="120" stroke={P.ink} strokeWidth="2" />
      <path d="M178 120 L168 115 L168 125 Z" fill={P.ink} />
      {/* 右：扁平——内容上前，层级由图层与模糊组织 */}
      <rect x="190" y="46" width="112" height="150" rx="10" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      <rect x="190" y="46" width="112" height="26" rx="10" fill={P.blue} opacity=".10" />
      {[0, 1, 2].map(i => (
        <g key={"f" + i}>
          <line x1="202" y1={88 + i * 34} x2="290" y2={88 + i * 34} stroke={P.ink} strokeWidth="3" />
          <line x1="202" y1={98 + i * 34} x2="254" y2={98 + i * 34} stroke={P.gray} strokeWidth="2" />
          <line x1="190" y1={110 + i * 34} x2="302" y2={110 + i * 34} stroke="#E4E2DA" strokeWidth="1" />
        </g>
      ))}
      <text x="190" y="38" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>FLAT · DEFERENCE</text>
      {/* 深度：以层叠与视差取代质感 */}
      <g transform="translate(206,150)">
        <rect x="0" y="0" width="52" height="30" fill="#DDE5F7" />
        <rect x="8" y="8" width="52" height="30" fill="#C2D0F0" />
        <rect x="16" y="16" width="52" height="30" fill={P.blue} opacity=".55" />
      </g>
      <text x="190" y="212" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>DEPTH REPLACES TEXTURE</text>
      {/* 代价：可供性线索消失 */}
      <text x="24" y="212" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>AFFORDANCE LOST?</text>
    </svg>
  ),
  materialPaper: (
    <svg viewBox="0 0 320 220" role="img" aria-label="量子纸隐喻研究：层级高度、投影规律与动效作为空间解释">
      <rect width="320" height="220" fill="#fff" />
      {/* 层级剖面：每层纸片有确定高度与投影 */}
      <line x1="24" y1="168" x2="164" y2="168" stroke={P.ink} strokeWidth="1.5" />
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={34 + i * 12} y={150 - i * 26} width="96" height="10" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
          <ellipse cx={82 + i * 12} cy={164 - i * 2} rx={48 - i * 2} ry={3 + i} fill={P.ink} opacity={0.16 - i * 0.04} />
          <line x1={24} y1={155 - i * 26} x2={34 + i * 12} y2={155 - i * 26} stroke={P.blue} strokeWidth="1" strokeDasharray="3 3" />
          <text x="20" y={152 - i * 26} textAnchor="end" fontFamily="Archivo,sans-serif" fontSize="8" fontWeight="700" fill={P.blue}>{i * 4 + 1}</text>
        </g>
      ))}
      <text x="24" y="188" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>ELEVATION dp</text>
      {/* 触点涟漪：材料对触摸的响应 */}
      <circle cx="226" cy="70" r="6" fill={P.blue} />
      {[14, 24, 34].map((r, i) => (
        <circle key={i} cx="226" cy="70" r={r} fill="none" stroke={P.blue} strokeWidth="1.5" opacity={0.7 - i * 0.2} />
      ))}
      <text x="188" y="34" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>TOUCH RESPONSE</text>
      {/* 动效曲线：加速度即虚拟物理 */}
      <line x1="188" y1="186" x2="300" y2="186" stroke={P.gray} strokeWidth="1" />
      <line x1="188" y1="186" x2="188" y2="124" stroke={P.gray} strokeWidth="1" />
      <path d="M188 186 C 210 186 216 134 242 130 C 268 126 282 128 300 128"
        fill="none" stroke={P.red} strokeWidth="2" />
      <text x="188" y="204" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>EASING = PHYSICS</text>
      <text x="24" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>QUANTUM PAPER</text>
    </svg>
  ),

  /* ===== 主题日 14 · 建筑经典 II：空间与光的剖面研究图 ===== */
  savoyeFivePoints: (
    <svg viewBox="0 0 320 220" role="img" aria-label="新建筑五点研究：底层架空、自由平面、横向长窗、自由立面与屋顶花园">
      <rect width="320" height="220" fill="#fff" />
      {/* 屋顶花园 */}
      <path d="M62 54 L258 54 L258 64 L62 64 Z" fill="#fff" stroke={P.ink} strokeWidth="2" />
      <path d="M150 54 C 150 34 186 30 196 44 C 212 38 226 48 222 54 Z" fill="#8FAE7A" />
      {/* 主体量：自由立面 */}
      <rect x="62" y="64" width="196" height="62" fill="#fff" stroke={P.ink} strokeWidth="2" />
      {/* 横向长窗：贯通整个立面 */}
      <rect x="74" y="84" width="172" height="20" fill="#DCE4F5" stroke={P.ink} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={i} x1={94 + i * 22} y1="84" x2={94 + i * 22} y2="104" stroke={P.ink} strokeWidth="1" />
      ))}
      {/* 底层架空：细柱托起体量 */}
      {[86, 122, 158, 194, 230].map((x, i) => (
        <line key={"p" + i} x1={x} y1="126" x2={x} y2="176" stroke={P.ink} strokeWidth="4" />
      ))}
      <line x1="40" y1="176" x2="280" y2="176" stroke={P.ink} strokeWidth="2" />
      {/* 自由平面：内墙与柱网脱开 */}
      <path d="M100 138 L100 158 L140 158" fill="none" stroke={P.red} strokeWidth="2.5" />
      <path d="M176 134 L176 162" fill="none" stroke={P.red} strokeWidth="2.5" />
      <path d="M206 150 L244 150" fill="none" stroke={P.red} strokeWidth="2.5" />
      {/* 坡道：建筑漫步 */}
      <path d="M150 172 L196 132 L150 96 L196 62" fill="none" stroke={P.blue} strokeWidth="2" strokeDasharray="6 4" />
      <path d="M200 58 L188 62 L194 72 Z" fill={P.blue} />
      {/* 五点编号 */}
      {[["1", 40, 150], ["2", 40, 118], ["3", 40, 96], ["4", 40, 74], ["5", 40, 50]].map(([n, x, y], i) => (
        <text key={i} x={x} y={y} fontFamily="Archivo,sans-serif" fontSize="10" fontWeight="700" fill={P.red}>{n}</text>
      ))}
      <text x="20" y="26" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>FIVE POINTS</text>
      <text x="20" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>PROMENADE</text>
    </svg>
  ),
  fallingwaterCantilever: (
    <svg viewBox="0 0 320 220" role="img" aria-label="悬挑与场地关系研究：混凝土平台自岩层出挑，横跨瀑布之上">
      <rect width="320" height="220" fill="#fff" />
      {/* 岩层：毛石砌体的水平节理 */}
      <path d="M20 118 L108 118 L108 200 L20 200 Z" fill="#CFC9BC" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i} x1="20" y1={126 + i * 13} x2="108" y2={126 + i * 13} stroke="#A8A294" strokeWidth="1.5" />
      ))}
      {/* 竖向石砌核心 */}
      <rect x="96" y="44" width="34" height="140" fill="#CFC9BC" stroke={P.ink} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line key={"s" + i} x1="96" y1={54 + i * 18} x2="130" y2={54 + i * 18} stroke="#A8A294" strokeWidth="1.5" />
      ))}
      {/* 层层出挑的浅色平台 */}
      <rect x="112" y="56" width="132" height="13" fill="#F2F0E8" stroke={P.ink} strokeWidth="1.5" />
      <rect x="100" y="98" width="168" height="13" fill="#F2F0E8" stroke={P.ink} strokeWidth="1.5" />
      <rect x="118" y="140" width="118" height="13" fill="#F2F0E8" stroke={P.ink} strokeWidth="1.5" />
      {/* 出挑长度标注 */}
      <line x1="130" y1="82" x2="244" y2="82" stroke={P.blue} strokeWidth="1.5" />
      <line x1="130" y1="76" x2="130" y2="88" stroke={P.blue} strokeWidth="1.5" />
      <line x1="244" y1="76" x2="244" y2="88" stroke={P.blue} strokeWidth="1.5" />
      <text x="158" y="76" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>CANTILEVER</text>
      {/* 瀑布：建筑悬于其上而非面对它 */}
      <path d="M150 158 C 148 176 152 186 148 200" fill="none" stroke="#7FA8CF" strokeWidth="4" />
      <path d="M166 158 C 164 178 168 188 164 200" fill="none" stroke="#7FA8CF" strokeWidth="3" />
      <path d="M182 158 C 180 176 184 186 180 200" fill="none" stroke="#7FA8CF" strokeWidth="4" />
      <ellipse cx="180" cy="202" rx="62" ry="7" fill="#7FA8CF" opacity=".35" />
      {/* 声音向上传入室内 */}
      {[0, 1, 2].map(i => (
        <path key={"w" + i} d={`M200 ${186 - i * 12} C 216 ${180 - i * 12} 230 ${190 - i * 12} 246 ${182 - i * 12}`}
          fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 4" opacity={0.85 - i * 0.22} />
      ))}
      <text x="196" y="210" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>SOUND OF WATER</text>
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>OVER, NOT FACING</text>
    </svg>
  ),
  ronchampLight: (
    <svg viewBox="0 0 320 220" role="img" aria-label="厚墙光洞研究：深洞窗的内外喇叭口与投在室内的彩色光斑">
      <rect width="320" height="220" fill="#fff" />
      {/* 蟹壳屋顶 */}
      <path d="M40 76 C 90 44 214 36 286 62 L286 78 C 210 56 96 64 40 92 Z" fill={P.ink} />
      {/* 厚墙：南墙剖切，洞口呈内大外小的喇叭 */}
      <path d="M52 92 L52 196 L116 196 L116 86 Z" fill="#DCDAD1" stroke={P.ink} strokeWidth="1.5" />
      {[[104, 32], [126, 20], [152, 26], [170, 14]].map(([y, h], i) => (
        <path key={i} d={`M52 ${y} L116 ${y - h * 0.3} L116 ${y + h} L52 ${y + h * 1.7} Z`} fill="#fff" />
      ))}
      {/* 光束：自洞口斜射入室内 */}
      {[[104, 32], [126, 20], [152, 26], [170, 14]].map(([y, h], i) => (
        <path key={"b" + i} d={`M116 ${y - h * 0.3} L250 ${y + 6 + i * 6} L250 ${y + h + 26 + i * 6} L116 ${y + h} Z`}
          fill={[P.yellow, "#D0361F", "#2E68B0", P.yellow][i]} opacity=".20" />
      ))}
      {/* 室内地面的光斑 */}
      {[[196, 118], [222, 140], [180, 162], [238, 176]].map(([x, y], i) => (
        <ellipse key={"s" + i} cx={x} cy={y} rx={14 - i} ry={6} fill={[P.yellow, "#D0361F", "#2E68B0", P.yellow][i]} opacity=".5" />
      ))}
      {/* 地面与内墙 */}
      <line x1="116" y1="196" x2="296" y2="196" stroke={P.ink} strokeWidth="2" />
      <line x1="296" y1="92" x2="296" y2="196" stroke={P.ink} strokeWidth="2" />
      {/* 墙厚标注 */}
      <line x1="52" y1="206" x2="116" y2="206" stroke={P.blue} strokeWidth="1.5" />
      <line x1="52" y1="200" x2="52" y2="212" stroke={P.blue} strokeWidth="1.5" />
      <line x1="116" y1="200" x2="116" y2="212" stroke={P.blue} strokeWidth="1.5" />
      <text x="54" y="218" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>WALL DEPTH</text>
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>LIGHT AS SCORE</text>
      <text x="196" y="216" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>MOVING PATCHES</text>
    </svg>
  ),
  utzonSphere: (
    <svg viewBox="0 0 320 220" role="img" aria-label="球面几何研究：所有壳片取自同一半径球面，因而可预制施工">
      <rect width="320" height="220" fill="#fff" />
      {/* 母球：所有壳片的同源几何 */}
      <circle cx="80" cy="96" r="58" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 5" />
      {[0, 1, 2, 3].map(i => (
        <ellipse key={i} cx="80" cy="96" rx={58 - i * 14} ry="58" fill="none" stroke="#E4E2DA" strokeWidth="1" />
      ))}
      {/* 从球面上切出的一瓣 */}
      <path d="M80 38 C 108 52 120 84 112 124 C 96 118 82 106 80 38 Z" fill={P.blue} opacity=".22" stroke={P.blue} strokeWidth="1.5" />
      <line x1="80" y1="96" x2="130" y2="66" stroke={P.red} strokeWidth="1.5" />
      <text x="96" y="62" fontFamily="Archivo,sans-serif" fontSize="9" fontWeight="700" fill={P.red}>R</text>
      <text x="24" y="170" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>ONE SPHERE · ONE RADIUS</text>
      {/* 箭头 */}
      <line x1="146" y1="110" x2="170" y2="110" stroke={P.ink} strokeWidth="2" />
      <path d="M176 110 L166 105 L166 115 Z" fill={P.ink} />
      {/* 组合成帆：同源壳片的排列 */}
      <path d="M192 164 C 196 112 218 74 248 56 C 256 88 252 130 238 164 Z" fill="#F2F0E8" stroke={P.ink} strokeWidth="1.5" />
      <path d="M216 164 C 220 116 240 82 268 66 C 276 98 272 134 258 164 Z" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      <path d="M242 164 C 246 124 262 96 286 82 C 294 110 290 138 278 164 Z" fill="#F2F0E8" stroke={P.ink} strokeWidth="1.5" />
      {/* 基座与水面 */}
      <rect x="182" y="164" width="120" height="10" fill={P.ink} />
      <line x1="150" y1="186" x2="312" y2="186" stroke="#7FA8CF" strokeWidth="2" />
      {[0, 1, 2].map(i => (
        <line key={"w" + i} x1={160 + i * 50} y1="194" x2={196 + i * 50} y2="194" stroke="#7FA8CF" strokeWidth="1.5" />
      ))}
      <text x="182" y="212" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>PREFABRICABLE SHELLS</text>
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>PEELING THE ORANGE</text>
    </svg>
  ),
  andoCross: (
    <svg viewBox="0 0 320 220" role="img" aria-label="负形十字研究：光由墙体的缺失构成，混凝土模板分缝精确对位">
      <rect width="320" height="220" fill="#fff" />
      {/* 清水混凝土墙：模板分缝与对拉螺栓孔 */}
      <rect x="96" y="26" width="164" height="168" fill="#BFBDB4" />
      {[0, 1, 2, 3].map(i => (
        <line key={"v" + i} x1={96 + i * 41} y1="26" x2={96 + i * 41} y2="194" stroke="#A8A69D" strokeWidth="1.5" />
      ))}
      {[0, 1, 2, 3].map(i => (
        <line key={"h" + i} x1="96" y1={26 + i * 42} x2="260" y2={26 + i * 42} stroke="#A8A69D" strokeWidth="1.5" />
      ))}
      {[[116, 46], [157, 46], [198, 46], [239, 46], [116, 88], [239, 88], [116, 130], [239, 130], [116, 172], [157, 172], [198, 172], [239, 172]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#8F8D85" />
      ))}
      {/* 十字：以墙体的缺失构成，不是挂上去的物 */}
      <rect x="168" y="52" width="16" height="118" fill="#fff" />
      <rect x="126" y="92" width="100" height="16" fill="#fff" />
      {/* 光：自缺口射入，在地面延伸 */}
      <path d="M184 52 L286 40 L286 182 L184 170 Z" fill={P.yellow} opacity=".16" />
      <path d="M226 92 L286 86 L286 114 L226 108 Z" fill={P.yellow} opacity=".16" />
      <rect x="264" y="60" width="18" height="102" fill={P.yellow} opacity=".30" />
      <rect x="248" y="96" width="46" height="14" fill={P.yellow} opacity=".30" />
      {/* 极简的长椅：脚手架木板 */}
      <rect x="40" y="150" width="46" height="5" fill="#9C7A4E" />
      <rect x="40" y="168" width="46" height="5" fill="#9C7A4E" />
      <line x1="20" y1="194" x2="300" y2="194" stroke={P.ink} strokeWidth="2" />
      <text x="20" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>MADE OF ABSENCE</text>
      <text x="20" y="212" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>SCAFFOLD PLANK PEWS</text>
      <text x="212" y="212" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>FORMWORK JOINTS ALIGNED</text>
    </svg>
  ),
  /* ===== 主题日 09 · 日常器物：结构与工艺研究图 ===== */
  mokaSection: (
    <svg viewBox="0 0 320 220" role="img" aria-label="摩卡壶萃取剖面研究：八角截面、压力路径与三段式结构">
      <rect width="320" height="220" fill="#fff" />
      {/* 下壶：水与压力 */}
      <path d="M96 200 L86 140 L206 140 L196 200 Z" fill="#E4E2DA" stroke={P.ink} strokeWidth="2.5" />
      <path d="M92 176 L200 176 L196 200 L96 200 Z" fill="#BFD4E8" />
      {/* 滤杯与粉层 */}
      <path d="M104 140 L112 116 L180 116 L188 140 Z" fill="#fff" stroke={P.ink} strokeWidth="2.5" />
      <rect x="116" y="120" width="60" height="16" fill="#8A6A48" />
      {/* 上壶与壶嘴 */}
      <path d="M96 116 L106 52 L186 52 L196 116 Z" fill="#E4E2DA" stroke={P.ink} strokeWidth="2.5" />
      <path d="M186 64 L226 46 L232 58 L192 78 Z" fill="#E4E2DA" stroke={P.ink} strokeWidth="2.5" />
      {/* 中柱：蒸汽推咖啡上行 */}
      <rect x="138" y="64" width="16" height="52" fill="#fff" stroke={P.ink} strokeWidth="2" />
      {/* 压力路径 */}
      <path d="M146 190 L146 140 L146 64 L146 58" fill="none" stroke={P.red} strokeWidth="2" strokeDasharray="6 4" />
      <path d="M146 52 L140 64 L152 64 Z" fill={P.red} />
      {/* 八角截面俯视：便于铸造与拧握 */}
      <g transform="translate(262,150)">
        <path d="M0 -26 L18 -18 L26 0 L18 18 L0 26 L-18 18 L-26 0 L-18 -18 Z"
          fill="none" stroke={P.blue} strokeWidth="2" />
        <circle cx="0" cy="0" r="26" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="3 3" />
        <text x="-26" y="44" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>8 FACETS</text>
      </g>
      {/* 手柄 */}
      <path d="M200 150 C 236 148 240 184 206 190" fill="none" stroke={P.ink} strokeWidth="6" strokeLinecap="round" />
      <text x="20" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>PRESSURE RISES</text>
      <text x="20" y="128" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.gray}>GROUNDS</text>
      <text x="20" y="190" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.gray}>WATER</text>
    </svg>
  ),
  chemexForm: (
    <svg viewBox="0 0 320 220" role="img" aria-label="一体壶身与实验室语法研究：漏斗与烧瓶合为单一玻璃体，唯一柔软处在腰部">
      <rect width="320" height="220" fill="#fff" />
      {/* 一体成型的玻璃体：冲泡与盛装合一 */}
      <path d="M108 34 L212 34 L176 108 L176 116 C 214 128 226 156 216 178
        C 206 198 114 198 104 178 C 94 156 106 128 144 116 L144 108 Z"
        fill="#F2F7FB" stroke={P.ink} strokeWidth="2.5" />
      {/* 滤纸与粉层 */}
      <path d="M118 44 L202 44 L172 104 L148 104 Z" fill="#fff" stroke={P.gray} strokeWidth="1.5" />
      <path d="M126 56 L194 56 L170 100 L150 100 Z" fill="#8A6A48" opacity=".35" />
      {/* 萃取液面：过程完全可见 */}
      <path d="M110 152 C 130 146 190 146 210 152 C 214 172 204 190 160 190 C 116 190 106 172 110 152 Z"
        fill="#6B4A2A" opacity=".55" />
      {/* 滴落路径 */}
      <line x1="160" y1="106" x2="160" y2="146" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="160" cy="132" r="3" fill={P.red} />
      {/* 木领与皮绳：唯一的柔软与隔热 */}
      <path d="M140 108 L180 108 L180 120 L140 120 Z" fill="#B5813C" stroke={P.ink} strokeWidth="1.5" />
      <path d="M138 114 C 128 112 126 120 136 118" fill="none" stroke="#7A4A28" strokeWidth="2.5" />
      <line x1="184" y1="114" x2="236" y2="114" stroke={P.gray} strokeWidth="1" strokeDasharray="3 3" />
      <text x="240" y="112" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill="#B5813C">WOOD</text>
      <text x="240" y="126" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill="#B5813C">+ CORD</text>
      {/* 实验室语法：耐热玻璃的刻度 */}
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="222" y1={156 + i * 10} x2={i % 2 ? 232 : 238} y2={156 + i * 10} stroke={P.gray} strokeWidth="1.5" />
      ))}
      <text x="20" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>ONE VESSEL · FULLY VISIBLE</text>
      <text x="20" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>LAB GLASS GRAMMAR</text>
    </svg>
  ),
  salifTripod: (
    <svg viewBox="0 0 320 220" role="img" aria-label="三足榨汁器的力学与争议研究：功能表现与话题功能的并置">
      <rect width="320" height="220" fill="#fff" />
      {/* 主体：餐巾纸草图的生猛造型 */}
      <path d="M160 26 C 176 44 186 76 184 100 C 182 118 170 128 160 128
        C 150 128 138 118 136 100 C 134 76 144 44 160 26 Z" fill="#B9B7AE" stroke={P.ink} strokeWidth="2" />
      {[0, 1, 2, 3, 4].map(i => (
        <path key={i} d={`M${148 + i * 6} 40 C ${144 + i * 6} 70 ${146 + i * 6} 100 ${152 + i * 6} 124`}
          fill="none" stroke="#8F8D85" strokeWidth="1.5" />
      ))}
      {/* 三条细长足 */}
      <path d="M150 124 C 128 148 108 172 100 194" fill="none" stroke="#B9B7AE" strokeWidth="7" strokeLinecap="round" />
      <path d="M170 124 C 192 148 212 172 220 194" fill="none" stroke="#B9B7AE" strokeWidth="7" strokeLinecap="round" />
      <path d="M160 128 C 160 156 160 178 160 196" fill="none" stroke="#B9B7AE" strokeWidth="7" strokeLinecap="round" />
      <line x1="70" y1="198" x2="250" y2="198" stroke={P.ink} strokeWidth="1.5" />
      {/* 汁液路径：性能平平 */}
      <path d="M160 128 L160 160" stroke={P.yellow} strokeWidth="2" strokeDasharray="3 4" />
      <ellipse cx="160" cy="168" rx="16" ry="5" fill={P.yellow} opacity=".4" />
      {/* 功能评分：榨汁 vs 话题 */}
      <text x="22" y="40" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>JUICING</text>
      <rect x="22" y="46" width="72" height="9" fill="#E4E2DA" />
      <rect x="22" y="46" width="24" height="9" fill={P.gray} />
      <text x="22" y="76" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>CONVERSATION</text>
      <rect x="22" y="82" width="72" height="9" fill="#F6E2DD" />
      <rect x="22" y="82" width="70" height="9" fill={P.red} />
      {/* 争议：赞誉与批评的两极 */}
      <text x="238" y="52" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>POETIC</text>
      <text x="238" y="80" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>USELESS</text>
      <line x1="236" y1="58" x2="200" y2="70" stroke={P.blue} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="236" y1="86" x2="200" y2="82" stroke={P.red} strokeWidth="1" strokeDasharray="3 3" />
      <text x="20" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>FUNCTION AS PROVOCATION</text>
    </svg>
  ),
  mujiPull: (
    <svg viewBox="0 0 320 220" role="img" aria-label="无意识设计研究：借用换气扇的身体记忆，拉绳启动、音乐如风流出">
      <rect width="320" height="220" fill="#fff" />
      {/* 墙面 */}
      <line x1="14" y1="30" x2="306" y2="30" stroke={P.gray} strokeWidth="1" strokeDasharray="4 5" />
      {/* 机体：方形壳，形如换气扇 */}
      <rect x="104" y="40" width="112" height="112" rx="4" fill="#F4F3EE" stroke={P.ink} strokeWidth="2.5" />
      {/* 圆形开口与碟片 */}
      <circle cx="160" cy="96" r="42" fill="#E4E2DA" stroke={P.ink} strokeWidth="1.5" />
      <circle cx="160" cy="96" r="34" fill="#fff" stroke={P.gray} strokeWidth="1.5" />
      <circle cx="160" cy="96" r="7" fill={P.ink} />
      {/* 拉绳：唤起已有的身体记忆 */}
      <line x1="160" y1="152" x2="160" y2="196" stroke={P.ink} strokeWidth="2" />
      <circle cx="160" cy="200" r="6" fill={P.ink} />
      <path d="M176 186 C 186 190 190 198 188 206" fill="none" stroke={P.blue} strokeWidth="2" />
      <path d="M188 210 L184 198 L194 200 Z" fill={P.blue} />
      {/* 音乐如风流出 */}
      {[0, 1, 2].map(i => (
        <path key={i} d={`M222 ${66 + i * 26} C 250 ${56 + i * 26} 274 ${76 + i * 26} 302 ${64 + i * 26}`}
          fill="none" stroke={P.blue} strokeWidth="2" strokeDasharray="7 5" opacity={0.9 - i * 0.22} />
      ))}
      {/* 已有行为的记忆：与换气扇同构 */}
      <g transform="translate(24,58)">
        <rect x="0" y="0" width="52" height="52" rx="3" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="26" cy="26" r="18" fill="none" stroke={P.gray} strokeWidth="1.5" />
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1="26" y1="26" x2={26 + 17 * Math.cos(i * Math.PI / 2 + 0.6)} y2={26 + 17 * Math.sin(i * Math.PI / 2 + 0.6)}
            stroke={P.gray} strokeWidth="1.5" />
        ))}
        <line x1="26" y1="52" x2="26" y2="72" stroke={P.gray} strokeWidth="1.5" />
        <circle cx="26" cy="75" r="4" fill={P.gray} />
      </g>
      <line x1="80" y1="96" x2="100" y2="96" stroke={P.red} strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="24" y="150" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>KNOWN GESTURE</text>
      <text x="222" y="42" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>MUSIC AS AIR</text>
      <text x="20" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>PULL TO PLAY</text>
    </svg>
  ),
  oxoGrip: (
    <svg viewBox="0 0 320 220" role="img" aria-label="通用设计握柄研究：椭圆软柄截面、鳍状防滑与握力需求的覆盖范围">
      <rect width="320" height="220" fill="#fff" />
      {/* 削皮器：黑色胖柄 + 金属刀头 */}
      <path d="M62 116 C 62 92 82 78 114 78 L156 78 C 172 78 178 90 178 102
        C 178 116 170 128 156 128 L114 128 C 82 128 62 140 62 116 Z" fill="#26251E" />
      {/* 鳍状防滑纹：受压时张开 */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <path key={i} d={`M${82 + i * 15} 92 C ${76 + i * 15} 102 ${76 + i * 15} 106 ${82 + i * 15} 116`}
          fill="none" stroke="#5E5C51" strokeWidth="3" strokeLinecap="round" />
      ))}
      {/* 刀头与摆动轴 */}
      <path d="M178 96 L216 88 L240 96 L240 110 L216 118 L178 110 Z" fill="#C9C7BE" stroke={P.ink} strokeWidth="1.5" />
      <line x1="216" y1="88" x2="216" y2="118" stroke={P.ink} strokeWidth="1.5" />
      <circle cx="228" cy="103" r="4" fill="none" stroke={P.red} strokeWidth="1.5" />
      <path d="M244 92 C 254 98 254 108 244 114" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="3 3" />
      {/* 握柄截面：椭圆而非圆，贴合掌心 */}
      <g transform="translate(78,166)">
        <ellipse cx="0" cy="0" rx="30" ry="19" fill="#26251E" />
        <ellipse cx="0" cy="0" rx="30" ry="19" fill="none" stroke={P.blue} strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="0" cy="0" r="19" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="3 3" />
        <line x1="-30" y1="26" x2="30" y2="26" stroke={P.blue} strokeWidth="1.5" />
        <text x="-30" y="42" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.blue}>OVAL ≠ ROUND</text>
      </g>
      {/* 握力覆盖：为最弱者优化，结果人人受益 */}
      <g transform="translate(176,150)">
        <line x1="0" y1="24" x2="122" y2="24" stroke={P.ink} strokeWidth="1.5" />
        <rect x="0" y="10" width="122" height="10" fill="#E4E2DA" />
        <rect x="0" y="10" width="122" height="10" fill="none" stroke={P.gray} strokeWidth="1" />
        <rect x="0" y="10" width="34" height="10" fill={P.red} />
        <text x="0" y="6" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.red}>WEAK GRIP</text>
        <text x="74" y="6" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>STRONG</text>
        <text x="0" y="42" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.ink}>DESIGN FOR THE EDGE</text>
      </g>
      <text x="20" y="46" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>SOFT RUBBER · FINS</text>
    </svg>
  ),
  /* ===== 主题日 12 · 书籍与编辑设计：版面骨架研究图 ===== */
  penguinRules: (
    <svg viewBox="0 0 320 220" role="img" aria-label="系列封面网格与正文排印规则研究：三段式色带与标点悬挂">
      <rect width="320" height="220" fill="#fff" />
      {/* 左：三段式封面系统——固定色带、字体与徽标位置 */}
      <rect x="22" y="26" width="114" height="168" fill="#fff" stroke={P.ink} strokeWidth="1.5" />
      <rect x="22" y="26" width="114" height="44" fill="#D98324" />
      <rect x="22" y="150" width="114" height="44" fill="#D98324" />
      <line x1="34" y1="84" x2="124" y2="84" stroke={P.ink} strokeWidth="6" />
      <line x1="34" y1="100" x2="104" y2="100" stroke={P.ink} strokeWidth="3" />
      <line x1="34" y1="128" x2="88" y2="128" stroke={P.gray} strokeWidth="3" />
      <ellipse cx="79" cy="172" rx="13" ry="16" fill="#fff" />
      <ellipse cx="79" cy="172" rx="13" ry="16" fill="none" stroke={P.ink} strokeWidth="1.5" />
      {/* 网格辅助线 */}
      <line x1="34" y1="20" x2="34" y2="200" stroke={P.blue} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="124" y1="20" x2="124" y2="200" stroke={P.blue} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="16" y1="70" x2="142" y2="70" stroke={P.blue} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="16" y1="150" x2="142" y2="150" stroke={P.blue} strokeWidth="1" strokeDasharray="3 4" />
      {/* 右：正文规则——标点悬挂于版心之外 */}
      <line x1="176" y1="40" x2="176" y2="188" stroke={P.blue} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="298" y1="40" x2="298" y2="188" stroke={P.blue} strokeWidth="1" strokeDasharray="3 4" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={i} x1="176" y1={52 + i * 17} x2={i === 7 ? 258 : 298} y2={52 + i * 17}
          stroke={P.ink} strokeWidth="3.5" />
      ))}
      {/* 悬挂的引号与逗号 */}
      {[0, 3, 5].map((i, k) => (
        <g key={k}>
          <rect x="168" y={48 + i * 17} width="5" height="5" fill={P.red} />
          <line x1="166" y1={52 + i * 17} x2="176" y2={52 + i * 17} stroke={P.red} strokeWidth="1" strokeDasharray="2 2" />
        </g>
      ))}
      <text x="22" y="18" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>FIXED GRID</text>
      <text x="176" y="18" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>HANGING PUNCTUATION</text>
      <text x="176" y="206" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>4 PAGES OF RULES</text>
    </svg>
  ),
  massinStage: (
    <svg viewBox="0 0 320 220" role="img" aria-label="表现性排印研究：字体即声音、版面即舞台，空白即沉默">
      <rect width="320" height="220" fill="#fff" />
      {/* 角色 A：粗重、逼近——高音量 */}
      <rect x="24" y="34" width="150" height="18" fill={P.ink} />
      <rect x="24" y="58" width="118" height="14" fill={P.ink} />
      {/* 角色 B：细瘦、倾斜——不同声线 */}
      <g transform="rotate(-7 200 84)">
        <rect x="178" y="76" width="118" height="7" fill={P.red} />
        <rect x="178" y="89" width="92" height="7" fill={P.red} />
        <rect x="178" y="102" width="106" height="7" fill={P.red} />
      </g>
      {/* 争吵：两声部在版面上碰撞重叠 */}
      <g transform="rotate(6 150 132)">
        <rect x="46" y="124" width="132" height="15" fill={P.ink} opacity=".88" />
      </g>
      <g transform="rotate(-11 190 138)">
        <rect x="132" y="130" width="128" height="11" fill={P.red} opacity=".85" />
      </g>
      {/* 呐喊：字号暴涨 */}
      <rect x="40" y="158" width="228" height="30" fill={P.ink} />
      <rect x="40" y="192" width="96" height="10" fill={P.ink} />
      {/* 沉默：空白本身是台词 */}
      <rect x="190" y="26" width="104" height="38" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="206" y="50" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="2" fill={P.gray}>SILENCE</text>
      <text x="24" y="20" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>VOICE A</text>
      <text x="238" y="120" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>VOICE B</text>
      <text x="274" y="186" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>ff</text>
    </svg>
  ),
  sugiuraDense: (
    <svg viewBox="0 0 320 220" role="img" aria-label="高密度版面与书籍五感研究：曼荼罗式嵌套秩序与触觉听觉的编排">
      <rect width="320" height="220" fill="#fff" />
      {/* 曼荼罗式嵌套：极高密度仍被精密控制 */}
      {[70, 54, 38, 22].map((r, i) => (
        <circle key={i} cx="142" cy="106" r={r} fill="none"
          stroke={i % 2 ? P.red : P.ink} strokeWidth="1.5" strokeDasharray={i % 2 ? "3 3" : "6 4"} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
        <line key={"s" + i}
          x1={142 + 22 * Math.cos(i * Math.PI / 6)} y1={106 + 22 * Math.sin(i * Math.PI / 6)}
          x2={142 + 70 * Math.cos(i * Math.PI / 6)} y2={106 + 70 * Math.sin(i * Math.PI / 6)}
          stroke={P.gray} strokeWidth="1" />
      ))}
      <circle cx="142" cy="106" r="9" fill={P.red} />
      {/* 密集图文块：多而不乱 */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
        <rect key={"b" + i} x={20 + (i % 4) * 14} y={30 + Math.floor(i / 4) * 12}
          width="11" height="8" fill={i % 3 === 0 ? P.ink : P.gray} opacity={i % 3 === 0 ? 1 : .55} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
        <line key={"t" + i} x1="20" y1={100 + i * 9} x2={i % 3 === 0 ? 62 : 74} y2={100 + i * 9}
          stroke={P.ink} strokeWidth="2.5" />
      ))}
      {/* 五感：纸的厚度、翻页的声、油墨的气味 */}
      <g transform="translate(232,38)">
        <rect x="0" y="0" width="56" height="10" fill="#DCDAD1" />
        <rect x="0" y="12" width="56" height="6" fill="#C9C7BE" />
        <rect x="0" y="20" width="56" height="4" fill="#B5B3AA" />
        <text x="0" y="38" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>WEIGHT</text>
      </g>
      <g transform="translate(232,100)">
        {[0, 1, 2].map(i => (
          <path key={i} d={`M4 20 A ${12 + i * 12} ${12 + i * 12} 0 0 1 4 ${-4 - i * 0}`}
            fill="none" stroke={P.red} strokeWidth="1.5" transform={`translate(${i * 2},0)`} />
        ))}
        <text x="0" y="42" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>SOUND</text>
      </g>
      <g transform="translate(232,162)">
        <path d="M6 24 C 18 14 2 8 14 -2" fill="none" stroke={P.ink} strokeWidth="1.5" />
        <path d="M24 24 C 36 14 20 8 32 -2" fill="none" stroke={P.ink} strokeWidth="1.5" />
        <text x="0" y="42" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1.2" fill={P.gray}>SCENT</text>
      </g>
      <text x="20" y="20" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>DENSITY AS ORDER</text>
    </svg>
  ),
  smlxlBulk: (
    <svg viewBox="0 0 320 220" role="img" aria-label="厚度即宣言研究：巨型书块与常规开本的对比及阅读节奏波动">
      <rect width="320" height="220" fill="#fff" />
      {/* 巨型书块侧视：1376 页 */}
      <rect x="40" y="32" width="88" height="128" fill="#EFEEE8" stroke={P.ink} strokeWidth="2" />
      {[...Array(24)].map((_, i) => (
        <line key={i} x1="42" y1={37 + i * 5.2} x2="126" y2={37 + i * 5.2} stroke={P.gray} strokeWidth="1" />
      ))}
      <rect x="32" y="32" width="10" height="128" fill={P.ink} />
      {/* 常规开本对照 */}
      <rect x="152" y="118" width="46" height="42" fill="#EFEEE8" stroke={P.ink} strokeWidth="1.5" />
      <rect x="148" y="118" width="5" height="42" fill={P.gray} />
      <line x1="30" y1="170" x2="128" y2="170" stroke={P.ink} strokeWidth="1.5" />
      <line x1="148" y1="170" x2="198" y2="170" stroke={P.gray} strokeWidth="1.5" />
      <text x="34" y="184" fontFamily="Archivo,sans-serif" fontSize="9" fontWeight="700" letterSpacing="1" fill={P.ink}>1376 pp · 2.7 kg</text>
      <text x="150" y="184" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1" fill={P.gray}>NORMAL</text>
      {/* 阅读节奏：图文比例剧烈波动，像换台 */}
      <text x="214" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>RHYTHM</text>
      {[38, 14, 62, 26, 76, 20, 54, 88, 30, 68].map((h, i) => (
        <rect key={i} x={214 + i * 10} y={160 - h} width="7" height={h}
          fill={i % 2 ? P.red : P.ink} opacity={i % 2 ? .85 : 1} />
      ))}
      <line x1="210" y1="160" x2="310" y2="160" stroke={P.ink} strokeWidth="1.5" />
      <text x="214" y="176" fontFamily="Archivo,sans-serif" fontSize="8" letterSpacing="1" fill={P.gray}>IMAGE / TEXT RATIO</text>
      <text x="34" y="22" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>BULK AS MANIFESTO</text>
      <text x="214" y="196" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>S · M · L · XL</text>
    </svg>
  ),
  bookArchitecture: (
    <svg viewBox="0 0 320 220" role="img" aria-label="书筑观念研究：函套、经折装与在时间中走进一本书的路径">
      <rect width="320" height="220" fill="#fff" />
      {/* 函套：进入书的门厅 */}
      <path d="M22 60 L74 42 L74 168 L22 186 Z" fill="#D8C9A8" stroke={P.ink} strokeWidth="1.5" />
      <path d="M22 60 L74 42 L96 50 L44 68 Z" fill="#E8DCC2" stroke={P.ink} strokeWidth="1.5" />
      <text x="20" y="204" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.gray}>SLIPCASE</text>
      {/* 经折装：页面如墙体，折叠成空间序列 */}
      <path d="M104 150 L128 104 L152 150 L176 104 L200 150 L224 104 L248 150 L272 104"
        fill="none" stroke={P.ink} strokeWidth="4" strokeLinejoin="round" />
      {[[104, 150], [152, 150], [200, 150], [248, 150]].map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={x} y2={y + 24} stroke={P.gray} strokeWidth="1.5" strokeDasharray="3 3" />
      ))}
      {/* 房间：章节作为被走过的空间 */}
      {[128, 176, 224].map((x, i) => (
        <rect key={i} x={x - 18} y="60" width="36" height="34" fill="none" stroke={P.gray} strokeWidth="1.5" />
      ))}
      {[128, 176, 224].map((x, i) => (
        <line key={"l" + i} x1={x - 12} y1="72" x2={x + 12} y2="72" stroke={P.gray} strokeWidth="2" />
      ))}
      {/* 阅读路径：在时间中走进一本书 */}
      <path d="M84 120 C 104 120 110 88 128 88 C 146 88 152 128 176 128 C 200 128 202 88 224 88 C 244 88 252 110 272 112"
        fill="none" stroke={P.red} strokeWidth="2" strokeDasharray="6 4" />
      <path d="M278 112 L266 106 L266 118 Z" fill={P.red} />
      <circle cx="84" cy="120" r="4" fill={P.red} />
      <text x="104" y="196" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.ink}>ACCORDION FOLD · CHAPTERS AS ROOMS</text>
      <text x="104" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>READING AS WALKING</text>
    </svg>
  ),
  /* ===== 主题日 07 · 椅子的一百年：结构与体感研究图 ===== */
  thonetParts: (
    <svg viewBox="0 0 320 220" role="img" aria-label="六件曲木零件的分解与组装研究：可拆装的量产结构">
      <rect width="320" height="220" fill="#fff" />
      {/* 分解：六根蒸汽弯木零件 */}
      <g fill="none" stroke={P.ink} strokeWidth="6" strokeLinecap="round">
        <path d="M22 44 C 48 20 104 20 130 44" />
        <path d="M40 76 C 60 58 92 58 112 76" />
        <ellipse cx="76" cy="112" rx="54" ry="17" />
        <path d="M30 146 C 34 168 34 184 30 200" />
        <path d="M76 146 C 80 168 80 184 76 200" />
        <path d="M122 146 C 126 168 126 184 122 200" />
      </g>
      {[["1", 14, 40], ["2", 30, 74], ["3", 14, 116], ["4", 18, 200], ["5", 64, 200], ["6", 110, 200]].map(([n, x, y], i) => (
        <text key={i} x={x} y={y} fontFamily="Archivo,sans-serif" fontSize="10" fontWeight="700" fill={P.red}>{n}</text>
      ))}
      <line x1="152" y1="24" x2="152" y2="206" stroke={P.gray} strokeWidth="1" strokeDasharray="4 5" />
      {/* 组装后：咖啡馆椅侧影 */}
      <g fill="none" stroke={P.ink} strokeWidth="5" strokeLinecap="round">
        <path d="M188 118 C 184 74 200 48 232 46 C 264 44 278 66 274 92" />
        <path d="M202 86 C 216 70 244 68 258 82" />
        <ellipse cx="232" cy="120" rx="46" ry="13" />
        <path d="M192 128 C 190 156 190 180 194 198" />
        <path d="M272 128 C 276 156 276 180 272 198" />
        <path d="M232 132 L232 198" />
      </g>
      {/* 十颗螺丝 */}
      {[[196, 110], [268, 110], [232, 104], [212, 82], [252, 80]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={P.red} />
      ))}
      <text x="14" y="18" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>6 PARTS · 10 SCREWS</text>
      <text x="190" y="18" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>36 PER m³</text>
    </svg>
  ),
  eamesShells: (
    <svg viewBox="0 0 320 220" role="img" aria-label="三片木壳分离与柔性连接研究：随身体浮动的靠背结构">
      <rect width="320" height="220" fill="#fff" />
      {/* 三片独立木壳：头枕、靠背、坐面 */}
      <path d="M60 54 C 88 38 120 38 140 50 L146 72 C 120 60 88 62 66 76 Z" fill="#7A4A28" />
      <path d="M70 86 C 100 70 138 70 162 84 L170 130 C 140 112 102 112 78 128 Z" fill="#7A4A28" />
      <path d="M96 140 C 130 126 180 126 214 142 L218 166 C 180 150 132 150 100 164 Z" fill="#7A4A28" />
      {/* 皮垫：内凹的包裹感 */}
      <path d="M74 60 C 98 48 124 48 140 58 L142 68 C 120 58 96 60 78 72 Z" fill={P.ink} opacity=".82" />
      <path d="M84 92 C 110 78 142 78 162 90 L166 124 C 140 108 108 108 88 122 Z" fill={P.ink} opacity=".82" />
      <path d="M106 146 C 138 134 180 134 208 148 L210 162 C 178 150 138 150 110 160 Z" fill={P.ink} opacity=".82" />
      {/* 柔性连接件：分离处的铝质枢轴 */}
      {[[148, 76], [172, 132], [96, 134]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6.5" fill="#fff" stroke={P.red} strokeWidth="2.5" />
          <path d={`M${x - 14} ${y + 10} A 16 16 0 0 1 ${x + 14} ${y + 6}`} fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
      ))}
      {/* 旋转底座 */}
      <line x1="158" y1="166" x2="158" y2="188" stroke={P.ink} strokeWidth="6" />
      <path d="M116 196 L200 196" stroke={P.ink} strokeWidth="6" strokeLinecap="round" />
      <path d="M132 190 L184 190" stroke={P.ink} strokeWidth="5" strokeLinecap="round" />
      {/* 后倾角 */}
      <line x1="40" y1="196" x2="40" y2="60" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="40" y1="196" x2="96" y2="64" stroke={P.blue} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="14" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>3 SHELLS · FLEX JOINTS</text>
      <text x="228" y="196" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>RECLINE</text>
    </svg>
  ),
  antShell: (
    <svg viewBox="0 0 320 220" role="img" aria-label="单片模压胶合板的成型研究：蜂腰收窄处的二维转三维妥协">
      <rect width="320" height="220" fill="#fff" />
      {/* 一片板：背与坐一次压成，腰部收窄 */}
      <path d="M118 24 C 150 16 200 16 226 26 C 240 32 240 52 230 60
        C 210 74 196 82 190 96 C 186 108 190 116 196 122
        C 220 134 238 144 244 156 C 250 170 238 178 218 178
        L126 178 C 106 178 94 170 100 156 C 106 144 124 134 148 122
        C 154 116 158 108 154 96 C 148 82 134 74 114 60 C 104 52 104 32 118 24 Z"
        fill="#C9922E" />
      {/* 蜂腰标注：技术妥协成为标志性轮廓 */}
      <line x1="152" y1="104" x2="192" y2="104" stroke={P.red} strokeWidth="2" />
      <path d="M146 104 L156 99 L156 109 Z" fill={P.red} />
      <path d="M198 104 L188 99 L188 109 Z" fill={P.red} />
      {/* 三条细钢腿 */}
      <line x1="140" y1="178" x2="108" y2="206" stroke={P.ink} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="204" y1="178" x2="236" y2="206" stroke={P.ink} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="172" y1="178" x2="172" y2="206" stroke={P.ink} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="90" y1="208" x2="254" y2="208" stroke={P.ink} strokeWidth="1.5" />
      {/* 可堆叠提示 */}
      {[0, 1].map(i => (
        <path key={i} d={`M262 ${52 + i * 18} C 278 ${46 + i * 18} 302 ${46 + i * 18} 312 ${54 + i * 18}`}
          fill="none" stroke={P.gray} strokeWidth="3" strokeDasharray="5 4" />
      ))}
      <path d="M288 100 L288 118" stroke={P.gray} strokeWidth="1.5" />
      <path d="M288 124 L283 114 L293 114 Z" fill={P.gray} />
      <text x="258" y="142" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.gray}>STACK</text>
      <text x="14" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>ONE SHEET · 3 LEGS</text>
      <text x="14" y="110" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>WAIST</text>
    </svg>
  ),
  wishboneY: (
    <svg viewBox="0 0 320 220" role="img" aria-label="环形扶手与Y形背板研究：一个构件承担三重职能">
      <rect width="320" height="220" fill="#fff" />
      {/* 蒸弯环形扶手：明式圈椅的精神保留 */}
      <path d="M78 96 C 78 52 124 34 160 34 C 196 34 242 52 242 96"
        fill="none" stroke="#B5813C" strokeWidth="10" strokeLinecap="round" />
      {/* Y 形背板：支撑腰部、稳固扶手圈、视觉签名 */}
      <path d="M160 36 L160 78" stroke="#B5813C" strokeWidth="9" strokeLinecap="round" />
      <path d="M160 78 C 150 96 138 106 132 126" stroke="#B5813C" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M160 78 C 170 96 182 106 188 126" stroke="#B5813C" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* 后腿延伸至扶手 */}
      <line x1="94" y1="96" x2="104" y2="132" stroke="#B5813C" strokeWidth="8" strokeLinecap="round" />
      <line x1="226" y1="96" x2="216" y2="132" stroke="#B5813C" strokeWidth="8" strokeLinecap="round" />
      {/* 纸绳编织坐面 */}
      <path d="M100 134 L220 134 L212 158 L108 158 Z" fill="#E8DCC2" stroke={P.ink} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={i} x1={104 + i * 15} y1="134" x2={110 + i * 14} y2="158" stroke="#C6B58C" strokeWidth="1.5" />
      ))}
      {[0, 1, 2].map(i => (
        <line key={"h" + i} x1={102 - i} y1={140 + i * 7} x2={218 + i} y2={140 + i * 7} stroke="#C6B58C" strokeWidth="1.5" />
      ))}
      {/* 四腿与横撑 */}
      <line x1="108" y1="158" x2="98" y2="200" stroke="#B5813C" strokeWidth="7" strokeLinecap="round" />
      <line x1="212" y1="158" x2="222" y2="200" stroke="#B5813C" strokeWidth="7" strokeLinecap="round" />
      <line x1="102" y1="180" x2="218" y2="180" stroke="#B5813C" strokeWidth="5" strokeLinecap="round" />
      <line x1="70" y1="204" x2="250" y2="204" stroke={P.ink} strokeWidth="1.5" />
      {/* 三重职能标记 */}
      {[[160, 78], [132, 126], [188, 126]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="none" stroke={P.red} strokeWidth="2" />
      ))}
      <text x="14" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>ONE PART · 3 ROLES</text>
      <text x="238" y="152" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.gray}>PAPER CORD</text>
    </svg>
  ),
  eggEnclosure: (
    <svg viewBox="0 0 320 220" role="img" aria-label="包裹式椅背的围合研究：在开放大堂中构筑私密的微型房间">
      <rect width="320" height="220" fill="#fff" />
      {/* 外部声场与视线：被高耸椅背阻断 */}
      {[0, 1, 2].map(i => (
        <path key={i} d={`M${36 - i * 12} ${60 + i * 6} C ${66 - i * 10} 100 ${66 - i * 10} 132 ${36 - i * 12} ${172 - i * 6}`}
          fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="5 5" />
      ))}
      <line x1="20" y1="116" x2="92" y2="116" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="96" y1="108" x2="112" y2="124" stroke={P.red} strokeWidth="2.5" />
      <line x1="112" y1="108" x2="96" y2="124" stroke={P.red} strokeWidth="2.5" />
      {/* 蛋形壳体：以雕塑手法削磨而成 */}
      <path d="M116 176 C 96 130 104 72 146 50 C 190 26 238 50 242 100
        C 246 140 232 166 214 178 Z" fill="#1F4E8C" />
      {/* 内部：被围合的坐者领域 */}
      <path d="M140 170 C 126 136 132 90 162 74 C 192 58 222 76 224 108
        C 226 136 214 160 200 170 Z" fill="#2E68B0" />
      <ellipse cx="182" cy="168" rx="46" ry="12" fill="#17355E" />
      {/* 私密领域范围 */}
      <path d="M128 178 C 112 128 122 66 168 44" fill="none" stroke={P.yellow} strokeWidth="2" strokeDasharray="6 4" />
      {/* 旋转底座 */}
      <line x1="180" y1="178" x2="180" y2="194" stroke={P.gray} strokeWidth="6" />
      <path d="M144 202 L216 202" stroke={P.gray} strokeWidth="6" strokeLinecap="round" />
      <line x1="60" y1="206" x2="280" y2="206" stroke={P.ink} strokeWidth="1.5" />
      <text x="14" y="44" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>LOBBY NOISE · GAZE</text>
      <text x="14" y="196" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.yellow}>PRIVATE ZONE</text>
      <text x="230" y="40" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>ROOM IN A CHAIR</text>
    </svg>
  ),

  /* ===== 主题日 08 · 灯具与光：光学与机构研究图 ===== */
  anglepoiseArm: (
    <svg viewBox="0 0 320 220" role="img" aria-label="恒张力弹簧机构研究：模拟人臂肌腱的随处可停平衡">
      <rect width="320" height="220" fill="#fff" />
      {/* 姿态残影：任意位置皆可停驻 */}
      <g stroke={P.gray} strokeWidth="2" strokeDasharray="4 4" fill="none">
        <path d="M70 170 L112 96 L186 118" />
        <path d="M70 170 L96 82 L168 66" />
      </g>
      {/* 主臂与前臂 */}
      <line x1="70" y1="170" x2="128" y2="76" stroke={P.ink} strokeWidth="6" strokeLinecap="round" />
      <line x1="128" y1="76" x2="222" y2="96" stroke={P.ink} strokeWidth="6" strokeLinecap="round" />
      {/* 弹簧：模拟肌腱的恒张力 */}
      <path d="M78 158 L84 148 L92 156 L100 144 L108 152 L116 140 L124 148 L130 138"
        fill="none" stroke={P.red} strokeWidth="2.5" />
      <path d="M134 84 L144 80 L150 92 L162 86 L168 98 L180 92 L186 104 L198 98"
        fill="none" stroke={P.red} strokeWidth="2.5" />
      {/* 关节 */}
      {[[70, 170], [128, 76], [222, 96]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="#fff" stroke={P.ink} strokeWidth="3" />
      ))}
      {/* 灯头与光锥 */}
      <path d="M222 96 L262 76 L278 110 L238 124 Z" fill={P.ink} />
      <path d="M244 122 L214 186 L296 186 L272 108 Z" fill={P.yellow} opacity=".26" />
      {/* 基座 */}
      <ellipse cx="70" cy="178" rx="42" ry="10" fill={P.ink} />
      <line x1="20" y1="188" x2="300" y2="188" stroke={P.ink} strokeWidth="1.5" />
      <text x="14" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>CONSTANT TENSION</text>
      <text x="14" y="120" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>ANY POSITION HOLDS</text>
    </svg>
  ),
  ph5Section: (
    <svg viewBox="0 0 320 220" role="img" aria-label="遮光板与无眩光研究：对数螺线排布使任意视角看不到灯丝">
      <rect width="320" height="220" fill="#fff" />
      {/* 吊线 */}
      <line x1="160" y1="16" x2="160" y2="62" stroke={P.gray} strokeWidth="2" />
      {/* 三层遮光板：位置由对数螺线推导 */}
      <path d="M78 74 C 118 58 202 58 242 74 C 224 92 96 92 78 74 Z" fill="#C9C7BE" />
      <path d="M62 104 C 112 84 208 84 258 104 C 232 126 88 126 62 104 Z" fill="#DCDAD1" />
      <path d="M104 120 C 134 110 186 110 216 120 C 200 134 120 134 104 120 Z" fill="#C9C7BE" />
      {/* 光源：被完全遮蔽 */}
      <circle cx="160" cy="98" r="9" fill={P.yellow} />
      {/* 反射后向下铺开的柔和面光 */}
      <path d="M96 126 L60 200 L260 200 L224 126 Z" fill={P.yellow} opacity=".22" />
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={120 + i * 27} y1="128" x2={74 + i * 58} y2="196"
          stroke={P.yellow} strokeWidth="2" opacity=".75" />
      ))}
      {/* 反射路径 */}
      <path d="M160 98 L110 82 L90 118" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M160 98 L212 82 L232 118" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 3" />
      {/* 视线：任意角度都被遮挡 */}
      <line x1="20" y1="136" x2="96" y2="110" stroke={P.ink} strokeWidth="1.5" strokeDasharray="5 4" />
      <circle cx="18" cy="137" r="5" fill="none" stroke={P.ink} strokeWidth="2" />
      <line x1="92" y1="104" x2="104" y2="118" stroke={P.red} strokeWidth="2.5" />
      <line x1="104" y1="104" x2="92" y2="118" stroke={P.red} strokeWidth="2.5" />
      <text x="14" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>NO DIRECT VIEW OF LAMP</text>
      <text x="204" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>SOFT FIELD</text>
    </svg>
  ),
  arcoOverhang: (
    <svg viewBox="0 0 320 220" role="img" aria-label="悬臂跨距与配重研究：无需在天花板开孔的落地吊灯">
      <rect width="320" height="220" fill="#fff" />
      {/* 天花板：明确不打孔 */}
      <line x1="14" y1="20" x2="306" y2="20" stroke={P.gray} strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <line key={i} x1={18 + i * 32} y1="20" x2={26 + i * 32} y2="12" stroke={P.gray} strokeWidth="1" />
      ))}
      <circle cx="160" cy="32" r="9" fill="none" stroke={P.red} strokeWidth="2" strokeDasharray="3 3" />
      <line x1="153" y1="25" x2="167" y2="39" stroke={P.red} strokeWidth="2" />
      <line x1="167" y1="25" x2="153" y2="39" stroke={P.red} strokeWidth="2" />
      {/* 弧形悬臂：源自街头路灯 */}
      <path d="M62 150 C 62 76 132 46 214 50" fill="none" stroke="#B9B7AE" strokeWidth="7" strokeLinecap="round" />
      {/* 灯头 */}
      <path d="M190 50 C 206 42 232 44 240 58 L236 68 C 222 60 202 60 192 62 Z" fill="#9C9A92" />
      <path d="M196 70 L170 138 L258 138 L238 70 Z" fill={P.yellow} opacity=".24" />
      {/* 餐桌：光落在桌面中央 */}
      <rect x="152" y="138" width="126" height="6" fill={P.ink} />
      <line x1="168" y1="144" x2="168" y2="186" stroke={P.ink} strokeWidth="4" />
      <line x1="262" y1="144" x2="262" y2="186" stroke={P.ink} strokeWidth="4" />
      {/* 大理石基座与提携孔 */}
      <path d="M30 152 L94 152 L88 184 L36 184 Z" fill="#E4E2DA" stroke={P.ink} strokeWidth="2" />
      {[0, 1, 2, 3].map(i => (
        <path key={i} d={`M${38 + i * 14} 156 C ${44 + i * 14} 166 ${36 + i * 14} 174 ${42 + i * 14} 182`}
          fill="none" stroke={P.gray} strokeWidth="1" />
      ))}
      <circle cx="62" cy="168" r="5" fill="#fff" stroke={P.ink} strokeWidth="2" />
      {/* 跨距标注 */}
      <line x1="62" y1="196" x2="214" y2="196" stroke={P.blue} strokeWidth="1.5" />
      <line x1="62" y1="190" x2="62" y2="202" stroke={P.blue} strokeWidth="1.5" />
      <line x1="214" y1="190" x2="214" y2="202" stroke={P.blue} strokeWidth="1.5" />
      <text x="100" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>2.40 m OVERHANG</text>
      <text x="14" y="146" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.gray}>65 kg</text>
      <text x="176" y="34" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>NO CEILING HOLE</text>
    </svg>
  ),
  akariPaper: (
    <svg viewBox="0 0 320 220" role="img" aria-label="和纸与竹骨的透光研究：材料决定光的性格，可压平收纳">
      <rect width="320" height="220" fill="#fff" />
      <defs>
        <radialGradient id="akari-glow" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#FFF3CE" />
          <stop offset="70%" stopColor="#F6E7B2" />
          <stop offset="100%" stopColor="#E8D79A" />
        </radialGradient>
      </defs>
      {/* 柔光外溢 */}
      <ellipse cx="170" cy="108" rx="96" ry="88" fill={P.yellow} opacity=".08" />
      {/* 灯体：手漉和纸的温润光质 */}
      <path d="M122 46 C 154 34 198 36 216 56 C 238 80 238 134 214 158
        C 192 180 148 180 128 158 C 104 130 104 70 122 46 Z" fill="url(#akari-glow)" />
      {/* 竹骨：疏密控制明暗节奏 */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <path key={i} d={`M${112 + Math.abs(4 - i) * 2.4} ${58 + i * 13} C 150 ${52 + i * 13} 190 ${52 + i * 13} ${226 - Math.abs(4 - i) * 2.4} ${58 + i * 13}`}
          fill="none" stroke="#D9C489" strokeWidth="1.6" />
      ))}
      {/* 吊线与顶部收口 */}
      <line x1="170" y1="12" x2="170" y2="42" stroke={P.gray} strokeWidth="1.5" />
      <ellipse cx="170" cy="44" rx="16" ry="5" fill="#D9C489" />
      {/* 可压平收纳：轻与反纪念碑的立场 */}
      <g transform="translate(26,150)">
        <rect x="0" y="0" width="52" height="34" fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="4 3" />
        {[0, 1, 2, 3].map(i => <line key={i} x1="4" y1={7 + i * 7} x2="48" y2={7 + i * 7} stroke="#D9C489" strokeWidth="1.5" />)}
      </g>
      <path d="M52 142 L52 128" stroke={P.gray} strokeWidth="1.5" />
      <path d="M52 124 L47 134 L57 134 Z" fill={P.gray} />
      <text x="20" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.gray}>FOLDS FLAT</text>
      <text x="14" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>WASHI + BAMBOO RIBS</text>
    </svg>
  ),
  tizioBalance: (
    <svg viewBox="0 0 320 220" role="img" aria-label="结构导电与配重研究：臂身兼作导线，指尖轻拨即可定位">
      <rect width="320" height="220" fill="#fff" />
      {/* 臂身：金属臂同时是导线 */}
      <line x1="96" y1="156" x2="188" y2="72" stroke={P.ink} strokeWidth="5" strokeLinecap="round" />
      <line x1="188" y1="72" x2="272" y2="102" stroke={P.ink} strokeWidth="5" strokeLinecap="round" />
      {/* 电流路径：沿结构传导，无一根外露电线 */}
      <path d="M96 156 L188 72 L272 102" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="5 4" />
      {[[130, 124], [218, 84]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="#fff" stroke={P.red} strokeWidth="1.5" />
          <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke={P.red} strokeWidth="1.5" />
          <line x1={x} y1={y - 4} x2={x} y2={y + 4} stroke={P.red} strokeWidth="1.5" />
        </g>
      ))}
      {/* 配重块：让沉重灯臂获得羽毛般手感 */}
      <rect x="76" y="146" width="26" height="14" rx="2" fill={P.ink} />
      <rect x="176" y="60" width="24" height="13" rx="2" fill={P.ink} />
      {/* 指尖操作提示 */}
      <path d="M248 130 C 260 140 274 138 282 128" fill="none" stroke={P.blue} strokeWidth="2" />
      <path d="M284 124 L282 136 L272 130 Z" fill={P.blue} />
      {/* 灯头与光锥 */}
      <path d="M266 94 L296 88 L300 110 L270 116 Z" fill={P.ink} />
      <path d="M272 116 L248 182 L312 182 L298 110 Z" fill={P.yellow} opacity=".22" />
      {/* 变压器基座 */}
      <rect x="62" y="162" width="72" height="26" rx="3" fill={P.ink} />
      <line x1="20" y1="192" x2="300" y2="192" stroke={P.ink} strokeWidth="1.5" />
      <text x="14" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>ARMS CARRY THE CURRENT</text>
      <text x="14" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>COUNTERWEIGHTS · NO CABLE</text>
    </svg>
  ),
  /* ===== 主题日 20 · 中国设计与东方回响：转译与同构研究图 ===== */
  sealDance: (
    <svg viewBox="0 0 320 220" role="img" aria-label="印章形制与字形身体化研究：由书写笔画转为舞动人形">
      <rect width="320" height="220" fill="#fff" />
      {/* 左：印面形制——外框留朱、边缘保留镌刻的毛糙 */}
      <path d="M26 42 L142 40 L144 156 L28 158 Z" fill={P.red} />
      <path d="M26 42 L142 40 L144 156 L28 158 Z" fill="none" stroke="#B02A15" strokeWidth="2" strokeDasharray="7 3 3 5" />
      <text x="84" y="122" textAnchor="middle" fontFamily="'Noto Serif SC',serif" fontWeight="900" fontSize="80" fill="#fff">京</text>
      {/* 转译箭头 */}
      <line x1="158" y1="100" x2="186" y2="100" stroke={P.ink} strokeWidth="2" />
      <path d="M192 100 L182 95 L182 105 Z" fill={P.ink} />
      {/* 右：同一组笔画被驯化为奔跑舞动的身体 */}
      <path d="M232 52 C 244 46 256 52 254 64 C 252 74 240 78 232 72 C 226 66 226 56 232 52 Z" fill={P.red} />
      <path d="M244 78 C 262 88 268 104 258 124 C 252 136 240 142 232 150" fill="none" stroke={P.red} strokeWidth="13" strokeLinecap="round" />
      <path d="M250 96 C 268 88 286 92 296 104" fill="none" stroke={P.red} strokeWidth="11" strokeLinecap="round" />
      <path d="M248 98 C 230 96 216 86 210 72" fill="none" stroke={P.red} strokeWidth="10" strokeLinecap="round" />
      <path d="M244 140 C 258 150 268 160 270 172" fill="none" stroke={P.red} strokeWidth="11" strokeLinecap="round" />
      <path d="M238 146 C 224 156 214 166 210 178" fill="none" stroke={P.red} strokeWidth="11" strokeLinecap="round" />
      {/* 笔画对应关系 */}
      <circle cx="84" cy="70" r="3.5" fill="#fff" />
      <circle cx="232" cy="62" r="3.5" fill={P.ink} />
      <text x="26" y="184" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>SEAL = PROMISE</text>
      <text x="204" y="198" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>STROKE → BODY</text>
    </svg>
  ),
  inkHanzi: (
    <svg viewBox="0 0 320 220" role="img" aria-label="字与物互文研究：书法笔画与实物剪影在留白中互证">
      <rect width="320" height="220" fill="#fff" />
      {/* 留白区：计白当黑，空白本身是构图的主体 */}
      <rect x="18" y="18" width="284" height="184" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="4 6" />
      {/* 左：书写的「山」——笔画带提按与飞白 */}
      <path d="M72 62 L72 148" stroke={P.ink} strokeWidth="13" strokeLinecap="round" />
      <path d="M44 92 L44 148" stroke={P.ink} strokeWidth="10" strokeLinecap="round" />
      <path d="M100 86 L100 148" stroke={P.ink} strokeWidth="10" strokeLinecap="round" />
      <path d="M40 146 L104 146" stroke={P.ink} strokeWidth="12" strokeLinecap="round" />
      <path d="M96 96 L99 128" stroke="#fff" strokeWidth="2" opacity=".55" />
      {/* 右：实物——石的剪影与淡墨晕 */}
      <ellipse cx="228" cy="150" rx="66" ry="14" fill={P.ink} opacity=".10" />
      <path d="M196 148 C 190 122 204 100 226 98 C 250 96 266 116 262 142 C 260 150 250 152 240 150 Z" fill={P.ink} opacity=".82" />
      <path d="M232 104 C 246 108 254 120 254 134" fill="none" stroke="#fff" strokeWidth="2" opacity=".4" />
      {/* 互证：能指与所指在同一画面相认 */}
      <line x1="118" y1="120" x2="182" y2="126" stroke={P.red} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="118" cy="120" r="3" fill={P.red} />
      <circle cx="182" cy="126" r="3" fill={P.red} />
      {/* 朱文小印 */}
      <rect x="264" y="34" width="24" height="24" fill={P.red} />
      <text x="26" y="196" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>WORD ⇄ THING · NEGATIVE SPACE</text>
    </svg>
  ),
  scriptBridge: (
    <svg viewBox="0 0 320 220" role="img" aria-label="跨文字系统的品牌转译研究：提取飘带式流动性格重写汉字骨骼">
      <rect width="320" height="220" fill="#fff" />
      {/* 上：拉丁手写体的性格提取——一条连绵的飘带弧 */}
      <path d="M26 74 C 60 34 96 34 118 60 C 136 82 118 104 100 96 C 84 88 94 62 124 58 C 168 52 212 62 258 44 C 278 36 292 44 294 58"
        fill="none" stroke={P.gray} strokeWidth="7" strokeLinecap="round" />
      <path d="M262 46 C 276 40 288 46 292 58" fill="none" stroke={P.red} strokeWidth="7" strokeLinecap="round" />
      <text x="26" y="24" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>SOURCE — FLOWING GESTURE</text>
      {/* 分隔：译的是气质，不是笔画 */}
      <line x1="26" y1="112" x2="294" y2="112" stroke={P.gray} strokeWidth="1" strokeDasharray="4 5" />
      <text x="122" y="108" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>TRANSLATE THE GESTURE</text>
      {/* 下：汉字骨骼被同一性格重写——连笔、弧线与出锋 */}
      <path d="M40 146 C 62 132 78 142 76 160 C 74 176 54 180 44 170" fill="none" stroke={P.red} strokeWidth="9" strokeLinecap="round" />
      <path d="M96 138 C 116 134 128 148 122 164 C 118 176 102 180 92 172" fill="none" stroke={P.red} strokeWidth="9" strokeLinecap="round" />
      <path d="M92 172 C 112 178 134 172 146 158" fill="none" stroke={P.red} strokeWidth="7" strokeLinecap="round" />
      <path d="M162 140 L214 140" stroke={P.red} strokeWidth="9" strokeLinecap="round" />
      <path d="M188 134 C 190 158 182 174 166 182" fill="none" stroke={P.red} strokeWidth="9" strokeLinecap="round" />
      <path d="M214 146 C 236 140 256 150 252 166 C 248 180 230 182 222 174" fill="none" stroke={P.red} strokeWidth="9" strokeLinecap="round" />
      {/* 出锋标记：与上方飘带同源 */}
      <circle cx="292" cy="58" r="4" fill={P.blue} />
      <circle cx="252" cy="166" r="4" fill={P.blue} />
      <line x1="292" y1="62" x2="256" y2="162" stroke={P.blue} strokeWidth="1" strokeDasharray="3 4" />
      <text x="26" y="204" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>TARGET — SAME CHARACTER, NEW SYSTEM</text>
    </svg>
  ),
  dougongCrown: (
    <svg viewBox="0 0 320 220" role="img" aria-label="斗拱构件放大为建筑形体的研究：层层出挑与多层红的渐变">
      <rect width="320" height="220" fill="#fff" />
      {/* 左：原始构件——屋檐下的小斗拱 */}
      <g transform="translate(14,118) scale(0.52)">
        <rect x="0" y="66" width="18" height="46" fill={P.gray} />
        <rect x="-16" y="52" width="50" height="14" fill="#C4472C" />
        <rect x="-30" y="34" width="78" height="14" fill="#C4472C" />
        <rect x="-44" y="16" width="106" height="14" fill="#C4472C" />
      </g>
      {/* 放大箭头 */}
      <line x1="72" y1="120" x2="104" y2="120" stroke={P.ink} strokeWidth="2" />
      <path d="M110 120 L100 115 L100 125 Z" fill={P.ink} />
      {/* 右：同一形制被放大为建筑形体，七层红的渐变 */}
      {[
        ["#8E2A18", 62, 50, 0],
        ["#A8321C", 76, 70, 1],
        ["#BE3A20", 92, 90, 2],
        ["#D0361F", 108, 110, 3],
        ["#DC4B2A", 124, 130, 4],
      ].map(([c, x, y, i]) => (
        <rect key={i} x={x} y={y} width={320 - 2 * x} height="19" fill={c} />
      ))}
      {/* 支撑核心 */}
      <rect x="148" y="150" width="24" height="44" fill={P.gray} />
      <rect x="124" y="150" width="16" height="44" fill="#DCDAD1" />
      <rect x="180" y="150" width="16" height="44" fill="#DCDAD1" />
      {/* 出挑尺寸标注 */}
      <line x1="50" y1="150" x2="50" y2="56" stroke={P.blue} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="50" y1="150" x2="124" y2="150" stroke={P.blue} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="50" y1="56" x2="62" y2="56" stroke={P.blue} strokeWidth="2" />
      <path d="M50 88 L45 100 L55 100 Z" fill={P.blue} />
      <path d="M50 118 L45 106 L55 106 Z" fill={P.blue} />
      <line x1="106" y1="194" x2="214" y2="194" stroke={P.ink} strokeWidth="1.5" />
      <text x="14" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>COMPONENT → MONUMENT</text>
      <text x="212" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>7 REDS</text>
    </svg>
  ),
  phoenixBike: (
    <svg viewBox="0 0 320 220" role="img" aria-label="二八自行车结构研究：加粗车架、全链罩、载重后架与标准化可维修节点">
      <rect width="320" height="220" fill="#fff" />
      {/* 28 吋大轮 */}
      <circle cx="78" cy="134" r="44" fill="none" stroke={P.ink} strokeWidth="3.5" />
      <circle cx="246" cy="134" r="44" fill="none" stroke={P.ink} strokeWidth="3.5" />
      {[0, 30, 60, 90, 120, 150].map((a, i) => (
        <g key={i} stroke={P.gray} strokeWidth="1">
          <line x1={78 + 42 * Math.cos(a * Math.PI / 180)} y1={134 + 42 * Math.sin(a * Math.PI / 180)}
            x2={78 - 42 * Math.cos(a * Math.PI / 180)} y2={134 - 42 * Math.sin(a * Math.PI / 180)} />
          <line x1={246 + 42 * Math.cos(a * Math.PI / 180)} y1={134 + 42 * Math.sin(a * Math.PI / 180)}
            x2={246 - 42 * Math.cos(a * Math.PI / 180)} y2={134 - 42 * Math.sin(a * Math.PI / 180)} />
        </g>
      ))}
      {/* 车架：黑漆加粗管件 */}
      <g stroke={P.ink} strokeWidth="7" strokeLinecap="round" fill="none">
        <line x1="126" y1="74" x2="150" y2="134" />
        <line x1="150" y1="134" x2="78" y2="134" />
        <line x1="126" y1="74" x2="78" y2="134" />
        <line x1="150" y1="134" x2="214" y2="86" />
        <line x1="212" y1="70" x2="222" y2="110" />
        <line x1="222" y1="110" x2="246" y2="134" />
      </g>
      {/* 关键：可载人的横梁「大杠」 */}
      <line x1="126" y1="74" x2="212" y2="70" stroke={P.blue} strokeWidth="9" strokeLinecap="round" />
      {/* 全链罩：防尘与护衣 */}
      <path d="M150 122 C 178 118 190 126 190 134 C 190 144 176 150 150 148 C 136 146 134 124 150 122 Z"
        fill="#EFEEE8" stroke={P.ink} strokeWidth="2.5" />
      {/* 载重后架 */}
      <rect x="52" y="92" width="72" height="7" fill={P.ink} />
      <line x1="58" y1="99" x2="72" y2="128" stroke={P.ink} strokeWidth="3" />
      <line x1="112" y1="99" x2="104" y2="128" stroke={P.ink} strokeWidth="3" />
      {/* 车座与车把 */}
      <path d="M108 68 L142 66 C 150 66 150 58 140 58 L114 58 C 104 58 100 68 108 68 Z" fill={P.ink} />
      <path d="M198 58 L226 58" stroke={P.ink} strokeWidth="6" strokeLinecap="round" />
      <line x1="212" y1="70" x2="212" y2="58" stroke={P.ink} strokeWidth="6" />
      {/* 标准化节点：街头修车摊即可维护 */}
      {[[150, 134], [78, 134], [246, 134], [212, 70]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="11" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="4 3" />
      ))}
      <line x1="20" y1="182" x2="300" y2="182" stroke={P.ink} strokeWidth="1.5" />
      <text x="126" y="52" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>TOP TUBE — SEATS A PASSENGER</text>
      <text x="20" y="202" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>STANDARD PARTS · REPAIRABLE</text>
      <text x="236" y="202" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>28 INCH</text>
    </svg>
  ),
  /* ===== 主题日 10 · 交通工具：形态与布局研究图 ===== */
  beetleCurve: (
    <svg viewBox="0 0 320 220" role="img" aria-label="一笔连续曲线的车身侧影研究：前盖、车顶与尾部贯通为单一轮廓">
      <rect width="320" height="220" fill="#fff" />
      {/* 车身体量 */}
      <path d="M36 152 C 40 122 66 110 94 106 C 118 66 202 66 228 106 C 256 112 282 124 286 152 Z"
        fill="#EFEEE8" stroke={P.gray} strokeWidth="1.5" />
      {/* 舱室与分件线（次要信息，弱化） */}
      <path d="M118 102 C 140 74 188 74 210 102" fill="#fff" stroke={P.gray} strokeWidth="1.5" />
      <line x1="164" y1="76" x2="164" y2="102" stroke={P.gray} strokeWidth="1.5" />
      {/* 关键：一条不间断的轮廓线贯穿全车 */}
      <path d="M36 152 C 40 122 66 110 94 106 C 118 66 202 66 228 106 C 256 112 282 124 286 152"
        fill="none" stroke={P.blue} strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="36" cy="152" r="4" fill={P.blue} />
      <circle cx="286" cy="152" r="4" fill={P.blue} />
      {/* 车轮与地面 */}
      <circle cx="96" cy="154" r="24" fill="#fff" stroke={P.ink} strokeWidth="3" />
      <circle cx="228" cy="154" r="24" fill="#fff" stroke={P.ink} strokeWidth="3" />
      <circle cx="96" cy="154" r="9" fill={P.ink} />
      <circle cx="228" cy="154" r="9" fill={P.ink} />
      <line x1="20" y1="178" x2="300" y2="178" stroke={P.ink} strokeWidth="1.5" />
      {/* 无腰线断裂的标注 */}
      <line x1="150" y1="118" x2="150" y2="136" stroke={P.red} strokeWidth="1" strokeDasharray="3 3" />
      <text x="26" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>ONE UNBROKEN LINE</text>
      <text x="212" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>NO BELT BREAK</text>
    </svg>
  ),
  vespaShell: (
    <svg viewBox="0 0 320 220" role="img" aria-label="单体壳与跨入式空间研究：全包裹钢壳与前后分离的踏入区">
      <rect width="320" height="220" fill="#fff" />
      {/* 前护腿板：单体壳的前段 */}
      <path d="M44 156 C 38 116 46 82 70 70 L96 62 L106 84 L82 94 C 68 108 66 130 70 156 Z"
        fill={P.blue} />
      {/* 踏板 */}
      <rect x="66" y="144" width="120" height="13" fill={P.blue} />
      {/* 后车身：包覆发动机与后轮的壳体 */}
      <path d="M180 158 C 172 122 190 96 220 92 L264 94 C 288 98 294 132 284 158 Z" fill={P.blue} />
      {/* 座垫 */}
      <path d="M196 88 L272 90 C 280 90 280 78 270 76 L206 74 C 194 74 190 88 196 88 Z" fill={P.ink} />
      {/* 车把 */}
      <line x1="98" y1="64" x2="120" y2="52" stroke={P.ink} strokeWidth="5" strokeLinecap="round" />
      <circle cx="94" cy="66" r="9" fill={P.ink} />
      {/* 跨入空间：传统摩托被横梁占据，此处为空 */}
      <rect x="74" y="86" width="104" height="56" fill="none" stroke={P.red} strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="126" y1="86" x2="126" y2="142" stroke={P.red} strokeWidth="1" strokeDasharray="2 4" />
      {/* 车轮与地面 */}
      <circle cx="72" cy="160" r="20" fill="#fff" stroke={P.ink} strokeWidth="3" />
      <circle cx="252" cy="160" r="20" fill="#fff" stroke={P.ink} strokeWidth="3" />
      <circle cx="72" cy="160" r="7" fill={P.ink} />
      <circle cx="252" cy="160" r="7" fill={P.ink} />
      <line x1="20" y1="180" x2="300" y2="180" stroke={P.ink} strokeWidth="1.5" />
      <text x="74" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>STEP-THROUGH VOID</text>
      <text x="228" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>MONOCOQUE</text>
    </svg>
  ),
  dsFloat: (
    <svg viewBox="0 0 320 220" role="img" aria-label="俯冲姿态与液气悬挂研究：前低后高的车身线与可变车高">
      <rect width="320" height="220" fill="#fff" />
      {/* 车身：前低后高，一滴将落未落的水 */}
      <path d="M26 132 C 58 118 104 104 152 96 C 200 88 252 90 288 104 C 300 108 302 124 296 138 L26 138 Z"
        fill="#EFEEE8" stroke={P.gray} strokeWidth="1.5" />
      {/* 舱室 */}
      <path d="M118 98 C 148 66 216 66 250 92" fill="#fff" stroke={P.gray} strokeWidth="1.5" />
      {/* 关键线：一条持续下俯的上缘 */}
      <path d="M26 132 C 58 118 104 104 152 96 C 200 88 252 90 288 104"
        fill="none" stroke={P.blue} strokeWidth="4" strokeLinecap="round" />
      {/* 随动前灯 */}
      <circle cx="44" cy="126" r="7" fill={P.yellow} stroke={P.ink} strokeWidth="1.5" />
      <line x1="44" y1="126" x2="18" y2="116" stroke={P.yellow} strokeWidth="2" strokeDasharray="3 3" />
      {/* 车轮：后轮内收 */}
      <circle cx="84" cy="150" r="21" fill="#fff" stroke={P.ink} strokeWidth="3" />
      <circle cx="246" cy="150" r="21" fill="#fff" stroke={P.ink} strokeWidth="3" />
      {/* 液气悬挂：可变车高的双向标注 */}
      <line x1="300" y1="126" x2="300" y2="172" stroke={P.red} strokeWidth="1.5" />
      <path d="M300 122 L296 132 L304 132 Z" fill={P.red} />
      <path d="M300 176 L296 166 L304 166 Z" fill={P.red} />
      <line x1="272" y1="140" x2="308" y2="140" stroke={P.red} strokeWidth="1" strokeDasharray="4 3" />
      <line x1="272" y1="158" x2="308" y2="158" stroke={P.red} strokeWidth="1" strokeDasharray="4 3" />
      {/* 地面与「浮起」的气垫感 */}
      <line x1="20" y1="172" x2="300" y2="172" stroke={P.ink} strokeWidth="1.5" />
      <line x1="60" y1="180" x2="270" y2="180" stroke={P.gray} strokeWidth="1" strokeDasharray="2 6" />
      <text x="26" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>NOSE-DOWN STANCE</text>
      <text x="204" y="200" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>VARIABLE HEIGHT</text>
    </svg>
  ),
  miniLayout: (
    <svg viewBox="0 0 320 220" role="img" aria-label="平面布局研究：横置发动机、四轮四角与乘员空间占比">
      <rect width="320" height="220" fill="#fff" />
      {/* 车体外廓（俯视） */}
      <rect x="72" y="30" width="176" height="152" rx="14" fill="#EFEEE8" stroke={P.ink} strokeWidth="2" />
      {/* 四轮推至四角 */}
      {[[58, 46], [58, 140], [238, 46], [238, 140]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="24" height="34" rx="4" fill={P.ink} />
      ))}
      {/* 横置动力总成：占据最短的纵向长度 */}
      <rect x="84" y="38" width="152" height="30" fill={P.red} />
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={100 + i * 36} y1="38" x2={100 + i * 36} y2="68" stroke="#fff" strokeWidth="2" />
      ))}
      {/* 乘员空间：车长的绝大部分 */}
      <rect x="84" y="76" width="152" height="98" fill={P.blue} opacity=".16" stroke={P.blue} strokeWidth="1.5" strokeDasharray="5 4" />
      {[[110, 100], [210, 100], [110, 150], [210, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="13" fill="none" stroke={P.blue} strokeWidth="2" />
      ))}
      <text x="146" y="132" fontFamily="Archivo,sans-serif" fontSize="17" fontWeight="700" fill={P.blue}>80%</text>
      {/* 车长尺寸线 */}
      <line x1="72" y1="196" x2="248" y2="196" stroke={P.ink} strokeWidth="1.5" />
      <line x1="72" y1="190" x2="72" y2="202" stroke={P.ink} strokeWidth="1.5" />
      <line x1="248" y1="190" x2="248" y2="202" stroke={P.ink} strokeWidth="1.5" />
      <text x="128" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.ink}>3.05 m</text>
      <text x="252" y="56" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.red}>TRANSVERSE</text>
      <text x="252" y="164" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.2" fill={P.gray}>CORNERS</text>
    </svg>
  ),
  shinkansenNose: (
    <svg viewBox="0 0 320 220" role="img" aria-label="流线头型与系统工程研究：气流轨迹、涂装分层与专用线路信号">
      <rect width="320" height="220" fill="#fff" />
      {/* 气流：贴附头型而不分离 */}
      {[0, 1, 2].map(i => (
        <path key={i} d={`M12 ${54 - i * 12} C 70 ${54 - i * 12} 96 ${68 + i * 4} 150 ${66 + i * 3} L300 ${64 + i * 3}`}
          fill="none" stroke={P.gray} strokeWidth="1.5" strokeDasharray="6 5" />
      ))}
      {/* 车身：圆润子弹头 */}
      <path d="M24 136 C 32 104 66 84 118 82 L296 82 L296 136 Z" fill="#fff" stroke={P.ink} strokeWidth="2.5" />
      {/* 蓝色腰带涂装：速度的温和表达 */}
      <path d="M26 124 C 34 118 54 112 76 110 L296 110 L296 124 Z" fill={P.blue} />
      {/* 圆窗 */}
      <circle cx="96" cy="97" r="8" fill="#DCE4F5" stroke={P.ink} strokeWidth="1.5" />
      {[150, 196, 242, 284].map((x, i) => (
        <rect key={i} x={x} y="90" width="26" height="14" rx="3" fill="#DCE4F5" stroke={P.ink} strokeWidth="1.5" />
      ))}
      {/* 转向架与轨道 */}
      <circle cx="86" cy="142" r="8" fill={P.ink} />
      <circle cx="122" cy="142" r="8" fill={P.ink} />
      <circle cx="232" cy="142" r="8" fill={P.ink} />
      <circle cx="268" cy="142" r="8" fill={P.ink} />
      <line x1="10" y1="152" x2="310" y2="152" stroke={P.ink} strokeWidth="3" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <line key={i} x1={24 + i * 34} y1="152" x2={24 + i * 34} y2="162" stroke={P.gray} strokeWidth="3" />
      ))}
      {/* 系统：专用线路上的信号节点 */}
      {[70, 150, 230].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="178" x2={x} y2="164" stroke={P.red} strokeWidth="1.5" />
          <circle cx={x} cy="180" r="4" fill={P.red} />
        </g>
      ))}
      <line x1="40" y1="180" x2="280" y2="180" stroke={P.red} strokeWidth="1" strokeDasharray="4 4" />
      <text x="24" y="204" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.red}>DEDICATED TRACK · SIGNAL SYSTEM</text>
      <text x="238" y="48" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>AIRFLOW</text>
    </svg>
  ),
  /* ===== 主题日 06 · 标志与品牌：几何构造研究图 ===== */
  nikeSwoosh: (
    <svg viewBox="0 0 320 220" role="img" aria-label="速度轨迹的几何构造研究：一笔加速弧线的生成">
      <rect width="320" height="220" fill="#fff" />
      {/* 构造圆：大小两圆的相切关系决定弧线的加速感 */}
      <circle cx="120" cy="10" r="132" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="4 5" />
      <circle cx="150" cy="-38" r="168" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="4 5" />
      {/* 轨迹本体：尾端细、头端展开，形成方向性 */}
      <path d="M268 62 C 208 112 132 150 62 142 C 126 178 220 134 278 52 Z" fill={P.ink} />
      {/* 速度线：视线被推向右上 */}
      <line x1="40" y1="160" x2="104" y2="160" stroke={P.red} strokeWidth="3" />
      <line x1="52" y1="172" x2="128" y2="172" stroke={P.red} strokeWidth="2" opacity=".6" />
      <line x1="66" y1="182" x2="150" y2="182" stroke={P.red} strokeWidth="1.5" opacity=".35" />
      {/* 方向箭头 */}
      <path d="M282 46 L296 40 L290 56 Z" fill={P.red} />
      {/* 基线与端点标记 */}
      <line x1="30" y1="198" x2="290" y2="198" stroke={P.ink} strokeWidth="1" />
      <circle cx="62" cy="142" r="3.5" fill={P.blue} />
      <circle cx="272" cy="57" r="3.5" fill={P.blue} />
      <text x="30" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>TAIL — THIN</text>
      <text x="216" y="214" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>HEAD — OPEN</text>
    </svg>
  ),
  ibmStripes: (
    <svg viewBox="0 0 320 220" role="img" aria-label="条纹切分的减重原理：实心字块与八线条纹字块的对照研究">
      <rect width="320" height="220" fill="#fff" />
      <defs>
        <mask id="m-stripe">
          <rect x="0" y="0" width="320" height="220" fill="#fff" />
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <rect key={i} x="166" y={62 + i * 15.4} width="128" height="5.6" fill="#000" />
          ))}
        </mask>
      </defs>
      {/* 左：实心字块——厚重、静止 */}
      <g fill={P.ink}>
        <rect x="34" y="58" width="16" height="104" />
        <rect x="60" y="58" width="40" height="104" />
        <rect x="108" y="58" width="16" height="104" />
        <rect x="124" y="58" width="16" height="52" />
      </g>
      <rect x="72" y="74" width="16" height="22" fill="#fff" />
      <rect x="72" y="122" width="16" height="24" fill="#fff" />
      {/* 右：同一字块经八线切分——减重、生成扫描线的动态 */}
      <g mask="url(#m-stripe)">
        <g fill={P.blue}>
          <rect x="166" y="58" width="16" height="104" />
          <rect x="192" y="58" width="40" height="104" />
          <rect x="240" y="58" width="16" height="104" />
          <rect x="256" y="58" width="16" height="52" />
        </g>
        <rect x="204" y="74" width="16" height="22" fill="#fff" />
        <rect x="204" y="122" width="16" height="24" fill="#fff" />
      </g>
      {/* 八线计数标尺 */}
      <line x1="300" y1="58" x2="300" y2="162" stroke={P.gray} strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={i} x1="296" y1={62 + i * 14.6} x2="304" y2={62 + i * 14.6} stroke={P.red} strokeWidth="2" />
      ))}
      <text x="286" y="180" fontFamily="Archivo,sans-serif" fontSize="10" fontWeight="700" fill={P.red}>8</text>
      <text x="34" y="182" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>SOLID — HEAVY</text>
      <text x="166" y="182" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>STRIPED — LIGHT</text>
      <line x1="146" y1="52" x2="146" y2="168" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
    </svg>
  ),
  appleBite: (
    <svg viewBox="0 0 320 220" role="img" aria-label="缺口作为尺度标尺：圆的相减构造与六色带研究">
      <rect width="320" height="220" fill="#fff" />
      <defs>
        <clipPath id="cp-body">
          <path d="M160 34 C 214 34 246 76 246 118 C 246 160 212 192 160 192 C 108 192 74 160 74 118 C 74 76 106 34 160 34 Z" />
        </clipPath>
      </defs>
      {/* 主体：六色带填充，色彩即产品能力的宣示 */}
      <g clipPath="url(#cp-body)">
        {["#4CA64C", "#E8B50C", "#E88A0C", "#D0361F", "#8E3B8E", "#2E6FD0"].map((c, i) => (
          <rect key={i} x="60" y={30 + i * 27.5} width="200" height="27.5" fill={c} />
        ))}
      </g>
      {/* 缺口：以同源小圆相减，缺口尺寸即整体的尺度参照 */}
      <circle cx="250" cy="106" r="26" fill="#fff" />
      <circle cx="250" cy="106" r="26" fill="none" stroke={P.ink} strokeWidth="1.5" strokeDasharray="4 4" />
      {/* 构造网格 */}
      <circle cx="160" cy="113" r="86" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="4 5" />
      <line x1="160" y1="20" x2="160" y2="206" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="56" y1="113" x2="284" y2="113" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      {/* 尺度标注：缺口直径 = 整体的参照单位 */}
      <line x1="224" y1="196" x2="276" y2="196" stroke={P.blue} strokeWidth="2" />
      <line x1="224" y1="191" x2="224" y2="201" stroke={P.blue} strokeWidth="2" />
      <line x1="276" y1="191" x2="276" y2="201" stroke={P.blue} strokeWidth="2" />
      <text x="228" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1" fill={P.blue}>SCALE UNIT</text>
      <text x="34" y="212" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>CIRCLE − CIRCLE</text>
    </svg>
  ),
  cbsEye: (
    <svg viewBox="0 0 320 220" role="img" aria-label="视觉之眼的纯几何构造：双圆相交生成的透镜形与同心瞳孔">
      <rect width="320" height="220" fill="#fff" />
      {/* 两个等大圆相交，交叠区即透镜形（vesica）——眼形的几何来源 */}
      <circle cx="160" cy="46" r="92" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="4 5" />
      <circle cx="160" cy="174" r="92" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="4 5" />
      {/* 透镜形本体 */}
      <path d="M81 110 A 92 92 0 0 1 239 110 A 92 92 0 0 1 81 110 Z" fill={P.ink} />
      {/* 瞳孔：以同心圆自白色反挖，纯正圆保证任意尺寸下的清晰 */}
      <circle cx="160" cy="110" r="34" fill="#fff" />
      <circle cx="160" cy="110" r="17" fill={P.ink} />
      {/* 半径与中心轴标注 */}
      <line x1="160" y1="110" x2="194" y2="110" stroke={P.red} strokeWidth="2" />
      <circle cx="160" cy="110" r="2.5" fill={P.red} />
      <line x1="40" y1="110" x2="280" y2="110" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="160" y1="14" x2="160" y2="206" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      <text x="34" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>TWO ARCS → ONE LENS</text>
      <text x="196" y="102" fontFamily="Archivo,sans-serif" fontSize="9" fontWeight="700" fill={P.red}>r</text>
    </svg>
  ),
  bocCoin: (
    <svg viewBox="0 0 320 220" role="img" aria-label="外圆内方的同构构造：古钱形制与「中」字笔画的共用研究">
      <rect width="320" height="220" fill="#fff" />
      {/* 外圆：古钱轮廓 */}
      <circle cx="160" cy="110" r="72" fill="none" stroke={P.red} strokeWidth="11" />
      {/* 内方：方孔 */}
      <rect x="132" y="82" width="56" height="56" fill="none" stroke={P.red} strokeWidth="11" />
      {/* 竖笔：贯穿全形，同时完成「中」字与穿钱红绳的双重语义 */}
      <line x1="160" y1="20" x2="160" y2="200" stroke={P.red} strokeWidth="11" />
      {/* 构造辅助：外接方与中心轴，说明外圆内方的比例推导 */}
      <rect x="88" y="38" width="144" height="144" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="4 5" />
      <line x1="40" y1="110" x2="280" y2="110" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      <circle cx="160" cy="110" r="28" fill="none" stroke={P.gray} strokeWidth="1" strokeDasharray="3 4" />
      {/* 笔画共用标记：竖笔同时属于「钱绳」与「中」 */}
      <circle cx="160" cy="82" r="3.5" fill={P.blue} />
      <circle cx="160" cy="138" r="3.5" fill={P.blue} />
      <text x="34" y="30" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.gray}>ROUND OUT · SQUARE IN</text>
      <text x="34" y="206" fontFamily="Archivo,sans-serif" fontSize="9" letterSpacing="1.5" fill={P.blue}>SHARED STROKE</text>
    </svg>
  ),
  bauhaus: (
    <svg viewBox="0 0 320 220" role="img" aria-label="包豪斯校舍构成示意">
      <rect width="320" height="220" fill="#fff" />
      <rect x="30" y="60" width="180" height="110" fill="#F4F3EE" stroke={P.ink} strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <rect key={i} x={42 + i * 20} y="72" width="14" height="86" fill="#DCE4F5" stroke={P.ink} strokeWidth="1" />
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
      {[110, 200, 258].map((x, i) => <line key={i} x1={x} y1="70" x2={x} y2="168" stroke="#9AA3AE" strokeWidth="4" />)}
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
      {[200, 222, 244].map((x, i) => <circle key={i} cx={x} cy="100" r="6" fill="none" stroke={P.ink} strokeWidth="2" />)}
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
      {[[110, 160], [150, 120], [170, 100], [130, 70], [190, 130]].map(([x, y], i) => (
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
    const v = h % 3;
    if (v === 0) { /* 大小写并置 + 基线网格 */
      el.push(<text key="g" x="72" y="112" fontFamily="Georgia,serif" fontWeight="900" fontSize="110" fill={ink}>{ch}</text>);
      el.push(<text key="g2" x="126" y="112" fontFamily="Archivo,sans-serif" fontWeight="700" fontSize="72" fill={A}>{ch.toLowerCase()}</text>);
      el.push(<line key="l1" x1="20" y1="112" x2="180" y2="112" stroke={ink} strokeWidth="1.5" />);
      el.push(<line key="l2" x1="20" y1="42" x2="180" y2="42" stroke={ink} strokeDasharray="3 4" strokeWidth="1" />);
    } else if (v === 1) { /* 单字满版 + 计量线 */
      el.push(<text key="g" x="100" y="122" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="900" fontSize="140" fill={A}>{ch}</text>);
      el.push(<line key="x1" x1="10" y1="122" x2="190" y2="122" stroke={ink} strokeWidth="1" />);
      el.push(<line key="x2" x1="10" y1="50" x2="190" y2="50" stroke={ink} strokeDasharray="2 5" strokeWidth="1" />);
      el.push(<rect key="m" x="8" y="50" width="5" height="72" fill={B} />);
    } else { /* 字符矩阵 */
      const seq = [ch, ch.toLowerCase(), "a", "g", "R", "e", "n", "2"];
      seq.forEach((t, i) => el.push(
        <text key={"m" + i} x={30 + (i % 4) * 44} y={62 + Math.floor(i / 4) * 54}
          textAnchor="middle" fontFamily={i % 2 ? "Archivo,sans-serif" : "Georgia,serif"}
          fontWeight="700" fontSize="40" fill={i === (h % 8) ? A : ink}>{t}</text>));
      el.push(<line key="l" x1="16" y1="82" x2="184" y2="82" stroke={ink} strokeDasharray="3 4" strokeWidth="1" />);
    }
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
      const v = h % 3;
      if (v === 0) { /* 色带 + 圆 */
        el.push(<rect key="band" x="0" y={92 + (h % 14)} width="200" height="20" fill={paper} />);
        el.push(<circle key="c" cx={60 + (h % 70)} cy={46 + (h % 20)} r={22 + (h % 10)} fill={B} />);
        el.push(<rect key="t1" x="16" y={98 + (h % 14)} width="74" height="7" fill={ink} />);
      } else if (v === 1) { /* 对角分割 + 剪影 */
        el.push(<path key="d" d={`M0 ${40 + (h % 30)} L200 0 L200 150 L0 150 Z`} fill={paper} opacity=".92" />);
        el.push(<path key="f" d={`M${70 + (h % 30)} 122 Q${86 + (h % 20)} ${60 + (h % 20)} ${118 + (h % 16)} 122 Z`} fill={ink} />);
        el.push(<rect key="t" x="18" y="18" width={54 + (h % 26)} height="8" fill={B} />);
      } else { /* 网格分块 */
        for (let i = 0; i < 9; i++) {
          const on = ((h >> i) & 1) === 1;
          el.push(<rect key={"g" + i} x={22 + (i % 3) * 52} y={16 + Math.floor(i / 3) * 40}
            width="48" height="36" fill={on ? paper : (i === (h % 9) ? B : "none")}
            stroke={paper} strokeWidth="1" opacity={on ? 1 : .85} />);
        }
      }
    } else {
      if (h % 3 === 2) { /* 分解层叠视图 */
        for (let i = 0; i < 3; i++) el.push(
          <rect key={"L" + i} x={50 + i * 12} y={30 + i * 26} width="88" height="30" rx="3"
            fill={i === 1 ? A : "#FFFFFF"} stroke={ink} strokeWidth="2" />);
        el.push(<line key="ax" x1="150" y1="30" x2="150" y2="116" stroke={ink} strokeDasharray="3 4" strokeWidth="1" />);
        el.push(<circle key="d" cx="168" cy="40" r="6" fill={B} />);
      } else { /* 正视图 + 操控件 */
        el.push(<rect key="body" x="46" y="34" width="108" height="82" rx={h % 2 ? 14 : 4} fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />);
        el.push(<circle key="k" cx={78 + (h % 40)} cy="92" r="11" fill={A} />);
        for (let i = 0; i < 3; i++) el.push(<line key={"v" + i} x1={62 + i * 12} y1="48" x2={62 + i * 12} y2="64" stroke={ink} strokeWidth="2.5" />);
        el.push(<rect key="s" x="112" y="46" width="30" height="20" fill={B} />);
      }
    }
  }
  const fid = "grain-" + c.id;
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={`${c.title} 示意研究图`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id={fid} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      {el}
      {/* 极淡纸纹，消解程序图形的光滑感 */}
      <rect x="0" y="0" width="200" height="150" filter={`url(#${fid})`} opacity="0.055" style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
};
const getVisual = c => VISUALS[c.visual] || genVisual(c);


export { P, VISUALS, getVisual };
