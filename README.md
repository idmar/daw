# 设计审美启蒙工作台 · Daily Aesthetic Atelier 2.0

> 面向设计学硕士新生的每日审美研训与经典策展工作台。以美术馆学术策展为范式，每日循环研习经典案例，构建跨越百年的设计史时空坐标系。

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2-FCC72B?logo=vitest&logoColor=black)](https://vitest.dev/)
[![Version](https://img.shields.io/badge/Version-v2.0.0-002FA7)]()

---

## 🏛️ 核心特色与学术系统

### 1. 每日五件经典与夜场加映
- 馆藏收录 **100 件现代设计里程碑著作**，跨越 20 个策展主题日（包豪斯魏玛与德绍、字体的世纪、国际主义海报、椅子的一百年、信息与界面、中国设计与东方回响等）。
- 每日日落闭馆机制与连贯打卡（Streak）追踪；支持夜场加映深造。

### 2. 交互式几何解剖镜与图层拆解（Visual Inspector）
- 独创 60% ~ 250% 视口无损缩放。
- 支持针对原创矢量示意图切换**📐 骨架网格**、**🔴 光学修正标线**与**🔤 比例注记**图层，微观拆解大师形式构图法。

### 3. 画室沉浸专注钟与环境白噪音（Atelier Focus Timer）
- 科学心流番茄钟预设：`15 min`（速览精读）、`25 min`（画室工坊）、`45 min`（学术研讨）。
- 纯 **Web Audio API 原生物理建模合成器**，模拟微弱纸笔画室白噪音与 432Hz 柔和颂钵收馆钟声，零外部音频网络资产依赖。

### 4. 现代设计大师学术档案辞典（Master Biographies & Dossier）
- 深度收录瓦尔特·格罗皮乌斯、迪特·拉姆斯、约瑟夫·穆勒-布罗克曼、密斯·凡·德·罗、马塞尔·布劳耶、保罗·兰德、马西莫·维涅里、阿德里安·弗鲁提格、勒·柯布西耶、原研哉、乔纳森·伊夫等先驱微传记。
- 核心设计哲学、生平贡献、名言录与馆藏关联作品双向索引。

### 5. 二十世纪现代设计史编年轴（Century Chronology View）
- 自 16 世纪古典字体源流、1900s 先锋派萌芽、1920s 包豪斯黄金十年、1950s 瑞士网格与博朗功能主义，直至 2000s 后的数字极简与东方虚空哲学。
- 编年谱系轴全景排列 100 件案例，各年代关键历史里程碑事件全景标注。

### 6. 双件经典并置策展台（Curatorial Juxtaposition）
- 经典学术对照组内置解析（瓦西里钢管椅 vs 风格派红蓝椅、Futura 几何纯粹 vs Helvetica 普世客观、博朗 T3 收音机 vs 苹果初代 iPod、索涅特 14 号弯木椅 vs 潘顿整块塑料注塑椅）。
- 支持全馆 100 件任意案例自由双栏并置比对，配学术对照矩阵表。

### 7. 经典闪卡与主动回忆系统（Active Recall Flashcards）
- 3D 卡牌翻转机制（正视矢量形态与基本信息，背视深度导览与核心设计三要点）。
- 支持「待精研 / 已掌握」熟练度打标与按专业学科定向抽认。

### 8. 学术收藏海报生成与引文导出（Exhibition Poster & Citations）
- 自动生成 800×1130 高分辨率学术装裱 SVG 矢量海报（支持无限放大与 Figma/AI 二次编辑）。
- 一键导出国际通行的 **APA 格式** 与 **BibTeX 格式** 学术文献引文。

### 9. 研学手记与归档备份系统（Study Notes & Archive System）
- 案例个人批注撰写与 7 组快捷设计范式标签。
- 支持全量研学档案 JSON 备份、跨端还原与 Markdown 学术专刊一键导出。

### 10. 三套美术馆主题与全键盘工作流（Themes & Keyboard A11y）
- 展厅光照系统：`日光展厅 (Day Light)`、`深色夜场 (Night Exhibition)`、`纸本档案 (Paper Archive)`。
- 全键盘无障碍工作流：
  - `1` ~ `6`：切换主展厅页签
  - `T`：循环切换光照主题
  - `F`：呼出画室专注时钟
  - `M`：查阅大师学术辞典
  - `C`：打开双件并置策展台
  - `?`：打开键盘小抄指南
  - `Esc`：快速关闭当前弹窗

---

## 💻 快速开始与本地开发

```bash
# 安装依赖
npm install

# 启动本地开发服务
npm run dev

# 运行自动化测试套件（14 个测试套件，63 个单元测试全部通过）
npm test

# 构建生产发布包
npm run build

# 预览生产构建
npm run preview
```

---

## 📐 模块化架构与工程目录

```
daw/
├── src/
│   ├── components/
│   │   ├── CaseCard.jsx                    # 案例展签卡片组件
│   │   ├── ComparativeCuratorialModal.jsx  # 双件并置策展台
│   │   ├── ExhibitionPosterModal.jsx       # 展签海报与引文生成器
│   │   ├── FlashcardView.jsx               # 3D 翻转抽认闪卡模式
│   │   ├── FocusTimerModal.jsx             # 画室专注钟组件
│   │   ├── MasterBioModal.jsx              # 大师微传记档案组件
│   │   ├── ProgressRing.jsx                # 圆环进度条组件
│   │   ├── ShortcutsModal.jsx              # 键盘研习快捷键指南
│   │   ├── TimelineView.jsx                # 现代设计史编年轴视图
│   │   └── VisualInspectorModal.jsx        # 几何解剖检视镜
│   ├── data/
│   │   ├── cases.js                        # 100 件案例、20 个主题日与徽章数据
│   │   ├── comparisons.js                  # 预设经典对比组与学术矩阵数据
│   │   ├── masters.js                      # 现代设计先驱传记辞典数据库
│   │   └── visuals.jsx                     # 原创矢量图形与生成式骨架系统
│   ├── utils/
│   │   ├── archive.js                      # 档案导入导出与 Markdown 专刊生成
│   │   ├── audio.js                        # Web Audio 画室白噪与颂钵音频合成
│   │   ├── chronology.js                   # 设计史年代纪元聚类与排序工具
│   │   ├── date.js                         # 日期计算与研习打卡连续天数算法
│   │   ├── embed.js                        # B 站 / YouTube 播放器嵌入地址转换
│   │   ├── poster.js                       # SVG 海报渲染与 APA/BibTeX 引文格式化
│   │   ├── taxonomy.js                     # 六大学科专业与设计流派分类筛选
│   │   └── theme.js                        # 展厅光照主题（日光/深色/纸本）状态管理
│   ├── styles/
│   │   └── atelier.css                     # 美术馆设计系统与 CSS 变量样式
│   ├── DesignAestheticsWorkbench.jsx       # 核心容器应用
│   └── main.jsx                            # 入口挂载文件
└── tests/                                  # 自动化测试套件
    ├── archive.test.js
    ├── badges.test.js
    ├── comparison.test.js
    ├── curation.test.js
    ├── date.test.js
    ├── embed.test.js
    ├── flashcard.test.js
    ├── glossary.test.js
    ├── inspector.test.js
    ├── poster.test.js
    ├── shortcuts.test.js
    ├── theme.test.js
    ├── timeline.test.js
    └── timer.test.js
```

---

## 📜 许可证与版权说明

应用内所有矢量示意图均为原创学术几何研究图，用于形式美学分析教学，不复制任何原作；案例解析文本为教学研讨资料。
欢迎用于设计学院学术研讨与研究生自主研学。
