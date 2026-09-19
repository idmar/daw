import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import "./styles/atelier.css";
import { CASES, DAY_THEMES, BADGES } from "./data/cases.js";
import { getVisual } from "./data/visuals.jsx";
import { todayKey, dayIndexOf, casesForDay, fmtDate, calculateStats } from "./utils/date.js";
import { THEMES, getInitialTheme, saveTheme } from "./utils/theme.js";
import { formatArchivePayload, validateArchive, generateMarkdownReport, downloadFile } from "./utils/archive.js";
import { DISCIPLINES, MOVEMENTS, filterCuratedCases, getCaseDiscipline } from "./utils/taxonomy.js";
import { ProgressRing } from "./components/ProgressRing.jsx";
import { CaseCard } from "./components/CaseCard.jsx";
import { FlashcardView } from "./components/FlashcardView.jsx";
import { VisualInspectorModal } from "./components/VisualInspectorModal.jsx";
import { FocusTimerModal } from "./components/FocusTimerModal.jsx";
import { MasterBioModal } from "./components/MasterBioModal.jsx";
import { MASTERS } from "./data/masters.js";

const STORAGE_KEY = "aesthetic-atelier-v1";

/* ---------------- 主应用 ---------------- */
export default function AestheticAtelier() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [state, setState] = useState({ completed: {}, videoLinks: {}, notes: {} });
  const [tab, setTab] = useState("today");
  const [openId, setOpenId] = useState(null);
  const [inspectCase, setInspectCase] = useState(null); // 几何构图检视镜选中的案例
  const [inspectMaster, setInspectMaster] = useState(null); // 大师档案选中的大师
  const [timerOpen, setTimerOpen] = useState(false); // 画室沉浸专注钟
  const [timerCase, setTimerCase] = useState(null); // 当前专注研习案例
  const [extraShown, setExtraShown] = useState(5);
  const [reviewDay, setReviewDay] = useState(null); // 学习足迹 → 点击进入的复习日期
  const [toasts, setToasts] = useState([]); // 徽章解锁提示队列
  const [focusId, setFocusId] = useState(null); // 复习页需定位并高亮的案例
  const [archTheme, setArchTheme] = useState("all"); // 馆藏总览：主题筛选
  const [archStatus, setArchStatus] = useState("all"); // 馆藏总览：状态筛选
  const [archQuery, setArchQuery] = useState(""); // 馆藏总览：关键词
  const [archDiscipline, setArchDiscipline] = useState("all"); // 馆藏总览：学科专业筛选
  const [archMovement, setArchMovement] = useState("all"); // 馆藏总览：思潮流派筛选
  const [queued, setQueued] = useState([]); // 手动加入今晚加映队列的案例 id
  const [preview, setPreview] = useState(null); // 馆藏总览中预览的案例
  const prevUnlockedRef = useRef(null);
  const tKey = todayKey();

  /* 读档 */
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r && r.value) {
          const v = JSON.parse(r.value);
          setState({
            completed: v.completed || {},
            videoLinks: v.videoLinks || {},
            notes: v.notes || {},
          });
        }
      } catch (e) {
        /* 首次使用，无存档 */
      }
      setLoaded(true);
    })();
  }, []);

  /* 存档 */
  const persist = useCallback(next => {
    setState(next);
    (async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("进度保存失败", e);
      }
    })();
  }, []);

  const todayCases = useMemo(() => casesForDay(tKey, CASES), [tKey]);
  const todayTheme = DAY_THEMES[dayIndexOf(tKey)];
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
    const pool = CASES.filter(c => !todayIds.has(c.id) && !before.has(c.id));
    /* 用户在馆藏总览中主动排队的案例优先陈列 */
    const q = queued.filter(id => pool.some(c => c.id === id));
    return [...q.map(id => pool.find(c => c.id === id)), ...pool.filter(c => !q.includes(c.id))];
  }, [state, tKey, todayCases, queued]);
  const extraDoneToday = doneToday.filter(id => !todayCases.some(c => c.id === id)).length;

  /* 统计 */
  const stats = useMemo(() => {
    return calculateStats(state.completed, tKey, dayClosed);
  }, [state.completed, tKey, dayClosed]);

  const finishCase = id => {
    if (doneToday.includes(id)) return;
    persist({ ...state, completed: { ...state.completed, [tKey]: [...doneToday, id] } });
  };

  /* 完成后自动折叠当前卡，展开并滚动到列表中的下一件待研习案例 */
  const finishAndNext = (id, list) => {
    if (doneToday.includes(id)) return;
    finishCase(id);
    const doneNow = [...doneToday, id];
    const next = list.find(c => c.id !== id && !doneNow.includes(c.id));
    setOpenId(next ? next.id : null);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = document.getElementById(next ? `case-${next.id}` : "closed-inline");
        el && el.scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );
  };

  const saveLink = (id, url) => {
    persist({ ...state, videoLinks: { ...state.videoLinks, [id]: url } });
  };

  const saveNote = (id, noteText) => {
    persist({ ...state, notes: { ...state.notes, [id]: noteText } });
  };

  const handleExportJson = () => {
    const payload = formatArchivePayload(state, stats);
    downloadFile(`atelier-archive-${tKey}.json`, JSON.stringify(payload, null, 2), "application/json");
  };

  const handleExportMarkdown = () => {
    const md = generateMarkdownReport(state, CASES, DAY_THEMES);
    downloadFile(`aesthetic-study-report-${tKey}.md`, md, "text/markdown");
  };

  const handleImportJson = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const json = JSON.parse(evt.target.result);
        const res = validateArchive(json);
        if (!res.valid) {
          alert(`导入失败：${res.error}`);
          return;
        }
        persist({
          completed: res.data.completed,
          videoLinks: res.data.videoLinks,
          notes: res.data.notes,
        });
        alert("研习档案已成功导入！");
      } catch (err) {
        alert("导入失败：文件不是有效的 JSON 格式");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const resetCase = (id, dayKey) => {
    const list = state.completed[dayKey] || [];
    if (!list.includes(id)) return;
    const nextList = list.filter(x => x !== id);
    const completed = { ...state.completed };
    if (nextList.length === 0) delete completed[dayKey];
    else completed[dayKey] = nextList;
    const snapshot = state; // 撤销所需的快照
    persist({ ...state, completed });
    const title = (CASES.find(c => c.id === id) || {}).title || "该案例";
    const key = "undo-" + id + "-" + Date.now();
    setToasts(t => [
      ...t,
      {
        key,
        undo: true,
        title,
        onUndo: () => {
          persist(snapshot);
          setToasts(x => x.filter(i => i.key !== key));
        },
      },
    ]);
    setTimeout(() => setToasts(t => t.filter(x => x.key !== key)), 5200);
  };

  /* 复习页：滚动定位到指定案例并短暂高亮 */
  useEffect(() => {
    if (!focusId) return;
    const t = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = document.getElementById(`case-${focusId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.classList.add("spotlight");
        }
      })
    );
    const clear = setTimeout(() => {
      const el = document.getElementById(`case-${focusId}`);
      el && el.classList.remove("spotlight");
      setFocusId(null);
    }, 1600);
    return () => {
      cancelAnimationFrame(t);
      clearTimeout(clear);
    };
  }, [focusId, reviewDay]);

  /* 徽章解锁侦测：与上一次解锁集合做差集，新徽章推入 toast 队列 */
  const unlockedIds = useMemo(() => BADGES.filter(b => b.test(stats)).map(b => b.id), [stats]);
  useEffect(() => {
    if (!loaded) return;
    if (prevUnlockedRef.current === null) {
      prevUnlockedRef.current = unlockedIds;
      return;
    }
    const fresh = unlockedIds.filter(id => !prevUnlockedRef.current.includes(id));
    prevUnlockedRef.current = unlockedIds;
    if (!fresh.length) return;
    fresh.forEach((id, i) => {
      const badge = BADGES.find(b => b.id === id);
      const key = id + "-" + Date.now();
      setTimeout(() => setToasts(t => [...t, { key, badge }]), i * 350);
      setTimeout(() => setToasts(t => t.filter(x => x.key !== key)), 3800 + i * 350);
    });
  }, [unlockedIds, loaded]);

  if (!loaded) {
    return (
      <div className="atelier" data-theme={theme}>
        <div className="wrap" style={{ paddingTop: 80, textAlign: "center", color: "var(--muted)" }}>
          正在开馆，载入你的学习档案…
        </div>
      </div>
    );
  }

  const historyDays = [...stats.days].reverse();

  return (
    <div className="atelier" data-theme={theme}>
      <div className="wrap">
        <header className="masthead">
          <div className="brand">
            <div className="eyebrow">Daily Aesthetic Atelier · 每日五件经典</div>
            <h1>
              设计审美<em>启蒙</em>工作台
            </h1>
          </div>
          <div className="masthead-meta">
            <div className="date">{fmtDate(tKey)}</div>
            <div className="streak">
              连续研习 <b>{stats.streak}</b> 天 · 累计 <b style={{ color: "var(--ink)" }}>{stats.total}</b> 次
            </div>
            <div className="masthead-controls">
              <button
                type="button"
                className="masters-launcher-btn"
                onClick={() => setInspectMaster(MASTERS[0])}
                title="查阅现代设计大师微传记与哲学档案"
              >
                🏛️ 大师辞典
              </button>
              <button
                type="button"
                className="focus-launcher-btn"
                onClick={() => {
                  setTimerCase(null);
                  setTimerOpen(true);
                }}
                title="开启画室沉浸研习时钟"
              >
                ⏱️ 沉浸专注
              </button>
              <div className="theme-switch" role="radiogroup" aria-label="展厅光照模式">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    className={`theme-btn ${theme === t.id ? "on" : ""}`}
                    onClick={() => {
                      setTheme(t.id);
                      saveTheme(t.id);
                    }}
                    title={t.desc}
                    aria-checked={theme === t.id}
                    role="radio"
                  >
                    <span aria-hidden="true">{t.icon}</span>
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <nav className="tabs" aria-label="主导航">
          {[
            ["today", "今日展厅"],
            ["archive", "馆藏总览"],
            ["flashcard", "经典闪卡"],
            ["badges", "成就徽章"],
            ["history", "学习足迹"],
          ].map(([k, t]) => (
            <button
              key={k}
              className={`tab ${tab === k ? "on" : ""}`}
              onClick={() => {
                setTab(k);
                setReviewDay(null);
                setOpenId(null);
                setPreview(null);
              }}
            >
              {t}
            </button>
          ))}
          <div className="tabs-progress" aria-label="今日进度">
            <span className="dot-row" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={i < Math.min(doneToday.length, 5) ? "f" : ""} />
              ))}
            </span>
            {Math.min(doneToday.length, 5)}/5{extraDoneToday > 0 && <b> +{extraDoneToday}</b>}
          </div>
        </nav>

        {/* ============ 今日展厅 ============ */}
        {tab === "today" && (
          <section className="view" key="today">
            <div className="hall-head">
              <div>
                <div className="eyebrow">
                  今日主题 · Theme {String(dayIndexOf(tKey) + 1).padStart(2, "0")} / {DAY_THEMES.length}
                </div>
                <h2>{todayTheme.name}</h2>
                <p>{todayTheme.desc}</p>
              </div>
              <div className="ring-box">
                <div className="ring-label">
                  <div className="n">
                    {Math.min(doneToday.length, 5)}
                    <span style={{ fontSize: 14, color: "var(--muted)" }}> / 5</span>
                    {extraDoneToday > 0 && (
                      <span style={{ fontSize: 13, color: "var(--gold)", fontWeight: 700 }}> +{extraDoneToday}</span>
                    )}
                  </div>
                  <div className="t">{extraDoneToday > 0 ? "今日进度 · 含夜场加映" : "今日研习进度"}</div>
                </div>
                <ProgressRing done={Math.min(doneToday.length, 5)} total={5} />
              </div>
            </div>

            {dayClosed && (
              <div className="closed-banner">
                <span style={{ fontSize: 20 }}>◉</span>
                <span>
                  <b>今日闭馆。</b>本日五件经典均已研习，记录已存入学习足迹。
                </span>
              </div>
            )}

            <div className="case-list">
              {todayCases.map((c, i) => (
                <CaseCard
                  key={c.id}
                  c={c}
                  i={i}
                  catalogIndex={CASES.indexOf(c)}
                  done={doneToday.includes(c.id)}
                  open={openId === c.id}
                  onToggle={() => setOpenId(openId === c.id ? null : c.id)}
                  onFinish={() => finishAndNext(c.id, todayCases)}
                  onReset={() => resetCase(c.id, tKey)}
                  resetNote="将从今日记录中移除，可重新学习。"
                  savedLink={state.videoLinks[c.id]}
                  onSaveLink={url => saveLink(c.id, url)}
                  savedNote={state.notes[c.id]}
                  onSaveNote={note => saveNote(c.id, note)}
                  onInspect={setInspectCase}
                  onStartTimer={cItem => {
                    setTimerCase(cItem);
                    setTimerOpen(true);
                  }}
                  onInspectMaster={setInspectMaster}
                />
              ))}
            </div>

            {/* 闭馆就地确认 */}
            {dayClosed && (
              <div id="closed-inline" className="closed-inline" role="status">
                <span className="seal" aria-hidden="true">
                  ✦
                </span>
                <div className="txt">
                  <b>今日闭馆 · 五件经典研习完毕</b>
                  <span>「闭馆」记录已点亮，连续研习 {stats.streak} 天。意犹未尽的话，夜场已经开灯。</span>
                </div>
                <button
                  className="btn gold"
                  onClick={() => {
                    const el = document.getElementById("encore-sec");
                    el && el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  前往夜场加映 ↓
                </button>
              </div>
            )}

            {/* 夜场加映 */}
            {dayClosed && (
              <div id="encore-sec" className="encore">
                <div className="hall-head" style={{ marginTop: 34 }}>
                  <div>
                    <div className="eyebrow">Encore · 夜场加映</div>
                    <h2>继续研习馆藏新案例</h2>
                    <p>
                      今日任务已完成，以下是你尚未研习过的馆藏经典。加映的研习同样计入累计次数与「夜场常客」徽章。
                    </p>
                  </div>
                </div>
                {extraPool.length === 0 ? (
                  <div className="empty">
                    馆藏 {CASES.length} 件已全部研习完毕——你完成了「全馆巡礼」。接下来可以回到足迹中温习任何一件。
                  </div>
                ) : (
                  <>
                    <div className="case-list">
                      {extraPool.slice(0, extraShown).map((c, i) => (
                        <CaseCard
                          key={c.id}
                          c={c}
                          i={i}
                          catalogIndex={CASES.indexOf(c)}
                          done={doneToday.includes(c.id)}
                          open={openId === c.id}
                          onToggle={() => setOpenId(openId === c.id ? null : c.id)}
                          onFinish={() => finishAndNext(c.id, extraPool.slice(0, extraShown))}
                          onReset={() => resetCase(c.id, tKey)}
                          resetNote="将从今日记录中移除，可重新学习。"
                          savedLink={state.videoLinks[c.id]}
                          onSaveLink={url => saveLink(c.id, url)}
                          savedNote={state.notes[c.id]}
                          onSaveNote={note => saveNote(c.id, note)}
                          onInspect={setInspectCase}
                          onStartTimer={cItem => {
                            setTimerCase(cItem);
                            setTimerOpen(true);
                          }}
                          onInspectMaster={setInspectMaster}
                        />
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

        {/* ============ 馆藏总览 ============ */}
        {tab === "archive" &&
          (() => {
            const learned = new Set();
            Object.values(state.completed).forEach(list => list.forEach(id => learned.add(id)));
            const list = filterCuratedCases(CASES, {
              discipline: archDiscipline,
              movement: archMovement,
              theme: archTheme,
              status: archStatus,
              query: archQuery,
              learnedIds: learned,
            });
            const groups = [];
            list.forEach(c => {
              const g = groups.find(x => x.day === c.day);
              if (g) g.items.push(c);
              else groups.push({ day: c.day, items: [c] });
            });
            const disciplineCounts = {};
            DISCIPLINES.forEach(d => {
              disciplineCounts[d.id] =
                d.id === "all" ? CASES.length : CASES.filter(c => getCaseDiscipline(c).id === d.id).length;
            });
            return (
              <section className="view" key="archive">
                <div className="hall-head">
                  <div>
                    <div className="eyebrow">Collection · 馆藏总览</div>
                    <h2>全部 {CASES.length} 件馆藏</h2>
                    <p>
                      按二十个主题日分组陈列。已研习 <b style={{ color: "var(--blue)" }}>{learned.size}</b> 件，尚余{" "}
                      {CASES.length - learned.size} 件待发现——可将感兴趣的案例加入今晚的夜场加映。
                    </p>
                  </div>
                  <div className="ring-box">
                    <div className="ring-label">
                      <div className="n">
                        {Math.round((learned.size / CASES.length) * 100)}
                        <span style={{ fontSize: 14, color: "var(--muted)" }}>%</span>
                      </div>
                      <div className="t">馆藏研习度</div>
                    </div>
                  </div>
                </div>

                <div className="discipline-bar" role="tablist" aria-label="按专业学科筛选">
                  {DISCIPLINES.map(d => (
                    <button
                      key={d.id}
                      className={`discipline-chip ${archDiscipline === d.id ? "on" : ""}`}
                      onClick={() => setArchDiscipline(d.id)}
                      role="tab"
                      aria-selected={archDiscipline === d.id}
                    >
                      <span>{d.icon}</span>
                      <span>{d.name}</span>
                      <span className="count">{disciplineCounts[d.id] || 0}</span>
                    </button>
                  ))}
                </div>

                <div className="arch-bar">
                  <input
                    className="arch-search"
                    value={archQuery}
                    onChange={e => setArchQuery(e.target.value)}
                    placeholder="搜索作品、设计师、流派或年份…"
                    aria-label="搜索馆藏"
                  />
                  <select
                    value={archDiscipline}
                    onChange={e => setArchDiscipline(e.target.value)}
                    aria-label="按学科门类筛选"
                  >
                    {DISCIPLINES.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.icon} {d.name} ({disciplineCounts[d.id] || 0})
                      </option>
                    ))}
                  </select>
                  <select
                    value={archMovement}
                    onChange={e => setArchMovement(e.target.value)}
                    aria-label="按设计流派筛选"
                  >
                    {MOVEMENTS.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={archTheme}
                    onChange={e => setArchTheme(e.target.value)}
                    aria-label="按主题筛选"
                  >
                    <option value="all">全部主题日</option>
                    {DAY_THEMES.map((t, i) => (
                      <option key={i} value={String(i)}>
                        {String(i + 1).padStart(2, "0")} · {t.name}
                      </option>
                    ))}
                  </select>
                  <div className="seg" role="group" aria-label="按状态筛选">
                    {[
                      ["all", "全部"],
                      ["done", "已研习"],
                      ["todo", "待研习"],
                    ].map(([k, t]) => (
                      <button
                        key={k}
                        className={archStatus === k ? "on" : ""}
                        onClick={() => setArchStatus(k)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {queued.length > 0 && (
                  <div className="queue-note" role="status">
                    已加入今晚加映队列 <b>{queued.length}</b> 件：
                    {queued.map(id => (CASES.find(c => c.id === id) || {}).title).join(" · ")}
                    <button className="undo-btn" onClick={() => setQueued([])}>
                      清空
                    </button>
                  </div>
                )}

                {list.length === 0 ? (
                  <div className="empty">没有符合条件的馆藏。试试更换主题或清空搜索词。</div>
                ) : (
                  groups.map(g => (
                    <div className="arch-group" key={g.day}>
                      <div className="sec-title">
                        <span className="num">{String(g.day + 1).padStart(2, "0")}</span>
                        <h4>{DAY_THEMES[g.day].name}</h4>
                        <span className="rule" />
                        <span className="cnt">
                          {g.items.filter(c => learned.has(c.id)).length}/{g.items.length}
                        </span>
                      </div>
                      <div className="arch-grid">
                        {g.items.map((c, i) => (
                          <button
                            key={c.id}
                            className={`arch-card ${learned.has(c.id) ? "done" : ""}`}
                            style={{ "--i": i }}
                            onClick={() => setPreview(c)}
                          >
                            <span className="ac-thumb">{getVisual(c)}</span>
                            <span className="ac-tx">
                              <span className="ac-title">{c.title}</span>
                              <span className="ac-sub">
                                {c.designer.split(" ")[0]} · {c.year}
                              </span>
                            </span>
                            <span className="ac-dot" aria-label={learned.has(c.id) ? "已研习" : "待研习"} />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </section>
            );
          })()}

        {/* ============ 馆藏预览浮层 ============ */}
        {preview &&
          (() => {
            const learned = Object.values(state.completed).some(l => l.includes(preview.id));
            const inQueue = queued.includes(preview.id);
            return (
              <div className="sheet-mask" onClick={() => setPreview(null)}>
                <div
                  className="sheet"
                  role="dialog"
                  aria-label={preview.title}
                  onClick={e => e.stopPropagation()}
                >
                  <button className="sheet-x" onClick={() => setPreview(null)} aria-label="关闭">
                    ✕
                  </button>
                  <div className="eyebrow">
                    Cat. No.{String(CASES.indexOf(preview) + 1).padStart(3, "0")} · {DAY_THEMES[preview.day].name}
                  </div>
                  <h3>{preview.title}</h3>
                  <div className="sheet-sub">
                    {preview.designer} · {preview.year} · {preview.movement}
                  </div>
                  <div className="sheet-art">{getVisual(preview)}</div>
                  <p className="sheet-intro">{preview.intro}</p>
                  <div className="sheet-acts">
                    {learned ? (
                      <span className="pill ok">已研习 · 可在学习足迹中复习</span>
                    ) : inQueue ? (
                      <button
                        className="btn"
                        onClick={() => setQueued(q => q.filter(x => x !== preview.id))}
                      >
                        已加入加映队列 · 移除
                      </button>
                    ) : (
                      <button
                        className="btn primary"
                        onClick={() => {
                          setQueued(q => [...q, preview.id]);
                          setPreview(null);
                        }}
                      >
                        加入今晚夜场加映
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

        {/* ============ 经典闪卡 ============ */}
        {tab === "flashcard" && (
          <FlashcardView
            cases={CASES}
            learnedIds={new Set(Object.values(state.completed).flat())}
          />
        )}

        {/* ============ 成就徽章 ============ */}
        {tab === "badges" && (
          <section className="view" key="badges">
            <div className="stats-row">
              <div className="stat">
                <div className="n">{stats.streak}</div>
                <div className="t">连续研习天数</div>
              </div>
              <div className="stat">
                <div className="n">{stats.total}</div>
                <div className="t">累计完成案例次数</div>
              </div>
              <div className="stat">
                <div className="n">
                  {BADGES.filter(b => b.test(stats)).length}
                  <span style={{ fontSize: 16, color: "var(--muted)" }}> / {BADGES.length}</span>
                </div>
                <div className="t">已点亮徽章</div>
              </div>
            </div>
            <div className="badges">
              {BADGES.map(b => {
                const got = b.test(stats);
                return (
                  <div key={b.id} className={`badge ${b.blue ? "blue" : ""} ${got ? "" : "locked"}`}>
                    <div className="medal" aria-hidden="true">
                      {b.icon}
                    </div>
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
        {tab === "history" &&
          reviewDay &&
          (() => {
            const ids = state.completed[reviewDay] || [];
            const dayCases = ids.map(id => CASES.find(c => c.id === id)).filter(Boolean);
            const dayTheme = DAY_THEMES[dayIndexOf(reviewDay)];
            return (
              <section className="view" key={"review-" + reviewDay}>
                <button
                  className="btn back-btn"
                  onClick={() => {
                    setReviewDay(null);
                    setOpenId(null);
                  }}
                >
                  ← 返回学习足迹
                </button>
                <div className="hall-head">
                  <div>
                    <div className="eyebrow">复习 · Review {fmtDate(reviewDay)}</div>
                    <h2>{dayTheme.name}</h2>
                    <p>{dayTheme.desc}</p>
                  </div>
                  <div className="ring-box">
                    <div className="ring-label">
                      <div className="n">
                        {dayCases.length}
                        <span style={{ fontSize: 14, color: "var(--muted)" }}> 件</span>
                      </div>
                      <div className="t">当日研习记录</div>
                    </div>
                  </div>
                </div>
                {dayCases.length === 0 && (
                  <div className="empty">该日的研习记录已全部重置。点击上方按钮返回学习足迹。</div>
                )}
                <div className="case-list">
                  {dayCases.map((c, i) => (
                    <CaseCard
                      key={c.id}
                      c={c}
                      i={i}
                      catalogIndex={CASES.indexOf(c)}
                      done={true}
                      open={openId === c.id}
                      onToggle={() => setOpenId(openId === c.id ? null : c.id)}
                      onFinish={() => {}}
                      onReset={() => resetCase(c.id, reviewDay)}
                      resetNote={`将从 ${reviewDay} 的记录中移除；若该日因此不足 5 件，「闭馆」与连续天数会相应变化。`}
                      savedLink={state.videoLinks[c.id]}
                      onSaveLink={url => saveLink(c.id, url)}
                      savedNote={state.notes[c.id]}
                      onSaveNote={note => saveNote(c.id, note)}
                      onInspect={setInspectCase}
                      onStartTimer={cItem => {
                        setTimerCase(cItem);
                        setTimerOpen(true);
                      }}
                      onInspectMaster={setInspectMaster}
                    />
                  ))}
                </div>
              </section>
            );
          })()}

        {/* ============ 学习足迹 ============ */}
        {tab === "history" && !reviewDay && (
          <section className="view" key="history">
            <div className="stats-row">
              <div className="stat">
                <div className="n">{stats.days.length}</div>
                <div className="t">有学习记录的天数</div>
              </div>
              <div className="stat">
                <div className="n">{stats.fullDays}</div>
                <div className="t">「今日闭馆」达成天数</div>
              </div>
              <div className="stat">
                <div className="n">
                  {stats.uniqueCount}
                  <span style={{ fontSize: 16, color: "var(--muted)" }}> / {CASES.length}</span>
                </div>
                <div className="t">研习过的不同案例</div>
              </div>
            </div>

            {/* 档案备份与成果导出工具条 */}
            <div className="archive-toolbar">
              <span className="title">📂 研习档案与专刊导出</span>
              <button className="btn" onClick={handleExportJson} title="将研习打卡、自选视频与个人笔记备份为 JSON 文件">
                💾 导出备份 (JSON)
              </button>
              <label className="btn" style={{ cursor: "pointer" }} title="从已备份的 JSON 文件恢复学习数据">
                📥 恢复档案
                <input type="file" accept=".json" onChange={handleImportJson} style={{ display: "none" }} />
              </label>
              <button className="btn primary" onClick={handleExportMarkdown} title="整理已研习案例与心得，导出为可提交或导入知识库的 Markdown 专刊">
                📑 导出研习专刊 (Markdown)
              </button>
            </div>

            {historyDays.length === 0 ? (
              <div className="empty">还没有学习记录。回到「今日展厅」，完成第一件经典案例的研习吧。</div>
            ) : (
              <div className="history">
                {historyDays.map(k => {
                  const ids = state.completed[k] || [];
                  const dayCases = ids.map(id => CASES.find(c => c.id === id)).filter(Boolean);
                  const dayTheme = DAY_THEMES[dayIndexOf(k)];
                  return (
                    <div className="day-item" key={k}>
                      <div className="d">
                        {k}
                        <button
                          className="theme-link"
                          onClick={() => {
                            setReviewDay(k);
                            setOpenId(null);
                          }}
                          title={`重新进入「${dayTheme.name}」专题复习`}
                        >
                          {dayTheme.name} ↗
                        </button>
                      </div>
                      <div className="cells" aria-label={`完成 ${ids.length} 件`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`cell ${i < ids.length ? "f" : ""}`} />
                        ))}
                        {ids.length > 5 && <span className="cell-extra">+{ids.length - 5}</span>}
                      </div>
                      <div className="names">
                        {dayCases.map((c, i) => (
                          <span key={c.id}>
                            {i > 0 && " · "}
                            <button
                              className="name-link"
                              onClick={() => {
                                setReviewDay(k);
                                setOpenId(c.id);
                                setFocusId(c.id);
                              }}
                              title={`复习「${c.title}」`}
                            >
                              {c.title}
                            </button>
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

      {/* 徽章解锁提示 */}
      <div className="toasts" aria-live="polite">
        {toasts.map(t =>
          t.undo ? (
            <div className="toast undo" key={t.key}>
              <span className="badge-ico r" aria-hidden="true">
                ↺
              </span>
              <div className="tx">
                <b>已重置「{t.title}」</b>
                <span>该案例已恢复为待研习</span>
              </div>
              <button className="undo-btn" onClick={t.onUndo}>
                撤销
              </button>
            </div>
          ) : (
            <div className="toast" key={t.key}>
              <span className={`badge-ico ${t.badge.blue ? "b" : ""}`} aria-hidden="true">
                {t.badge.icon}
              </span>
              <div className="tx">
                <b>{t.badge.name}</b>
                <span>成就已解锁 · {t.badge.desc}</span>
              </div>
            </div>
          )
        )}
      </div>
      {/* 几何解剖图交互检视镜 */}
      {inspectCase && (
        <VisualInspectorModal
          c={inspectCase}
          onClose={() => setInspectCase(null)}
        />
      )}
      {/* 美术馆画室沉浸研习钟 */}
      <FocusTimerModal
        isOpen={timerOpen}
        onClose={() => setTimerOpen(false)}
        currentCase={timerCase}
      />
      {/* 现代设计大师微传记档案 */}
      {inspectMaster && (
        <MasterBioModal
          master={inspectMaster}
          onClose={() => setInspectMaster(null)}
          onSelectCase={(targetCase) => {
            setInspectMaster(null);
            setTab("archive");
            setArchQuery(targetCase.title);
            setOpenId(targetCase.id);
          }}
        />
      )}
    </div>
  );
}
