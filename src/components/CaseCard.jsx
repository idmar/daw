import React, { useState, useEffect, useMemo } from "react";
import { getVisual } from "../data/visuals.jsx";
import { toEmbed } from "../utils/embed.js";
import { findMasterForCase } from "../data/masters.js";

const QUICK_TAGS = ["#形式追随功能", "#网格系统", "#克制极简", "#人机工学", "#减法设计", "#材料诚实", "#东方留白"];

/**
 * 单件案例展签卡片组件
 */
export function CaseCard({
  c,
  i,
  catalogIndex,
  done,
  open,
  onToggle,
  onFinish,
  onReset,
  resetNote,
  savedLink,
  onSaveLink,
  savedNote,
  onSaveNote,
  onInspect,
  onStartTimer,
  onInspectMaster,
  onCompare,
  onPoster,
  extraActions,
}) {
  const [draft, setDraft] = useState(savedLink || "");
  const [noteDraft, setNoteDraft] = useState(savedNote || "");
  const [noteSavedAlert, setNoteSavedAlert] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const master = useMemo(() => findMasterForCase(c), [c]);

  useEffect(() => setDraft(savedLink || ""), [savedLink]);
  useEffect(() => setNoteDraft(savedNote || ""), [savedNote]);
  useEffect(() => {
    setFrameReady(false);
  }, [savedLink]); // 换片时重新显示骨架屏
  useEffect(() => {
    setConfirmReset(false);
  }, [open, done]); // 折叠或状态变化时退出确认态

  const embed = savedLink ? toEmbed(savedLink) : null;

  /* 输入框内容的即时可嵌入性校验 */
  const draftCheck = useMemo(() => {
    const v = draft.trim();
    if (!v || v === (savedLink || "")) return null;
    const r = toEmbed(v);
    if (r && r.src) {
      return {
        tone: "ok",
        text: `✓ 可嵌入 · ${r.site === "bilibili" ? "B 站播放器" : "YouTube"}，回车或点「保存链接」即可`,
      };
    }
    if (r && r.short) {
      return { tone: "warn", text: "⚠ b23.tv 短链无法嵌入：请在浏览器打开后复制带 BV 号的完整链接" };
    }
    return { tone: "warn", text: "⚠ 暂不支持自动嵌入：保存后将以普通链接形式呈现" };
  }, [draft, savedLink]);

  const q = encodeURIComponent(c.searchQuery); // 中文 → B 站
  const qEn = encodeURIComponent(c.searchQueryEn || c.searchQuery); // 英文 → YouTube

  const catNum = String((catalogIndex !== undefined ? catalogIndex : i) + 1).padStart(3, "0");

  return (
    <article
      id={`case-${c.id}`}
      className={`case ${done ? "done" : ""} ${open ? "open" : ""}`}
      style={{ "--i": i }}
    >
      <button className="case-row" onClick={onToggle} aria-expanded={open}>
        <div className="thumb" aria-hidden="true">
          {getVisual(c)}
        </div>
        <div className="info">
          <div className="meta">
            No.{String(i + 1).padStart(2, "0")} · {c.field}
          </div>
          <h3>{c.title}</h3>
          <div className="sub">
            {c.designer} · {c.year} · {c.movement}
          </div>
        </div>
        <div className="status">
          <span className={`pill ${done ? "ok" : "todo"}`}>{done ? "已研习" : "待研习"}</span>
          <span className="chev" aria-hidden="true">
            ▼
          </span>
        </div>
      </button>

      <div className="case-wrap">
        <div className="case-body" aria-hidden={!open}>
          <figure className="artwork">
            {getVisual(c)}
            <figcaption className="plate">
              <span className="cat-no">Cat. No.{catNum}</span>
              <span className="plate-t">{c.title}</span>
              <span className="cat-yr">{c.year}</span>
            </figcaption>
            <div className="art-tools-bar">
              <button
                type="button"
                className="art-inspect-btn"
                onClick={() => onInspect && onInspect(c)}
                title="在构图检视镜中放大并拆解图层"
              >
                🔍 构图解剖与图层拆解
              </button>
              <button
                type="button"
                className="art-timer-btn"
                onClick={() => onStartTimer && onStartTimer(c)}
                title="开启画室专注钟深入精读此案例"
              >
                ⏱️ 沉浸研习钟
              </button>
              {master && (
                <button
                  type="button"
                  className="art-master-btn"
                  onClick={() => onInspectMaster && onInspectMaster(master)}
                  title={`查阅 ${master.nameZh} 大师生平与设计哲学`}
                >
                  🏛️ {master.nameZh}
                </button>
              )}
              <button
                type="button"
                className="art-compare-btn"
                onClick={() => onCompare && onCompare(c)}
                title="在并置策展台中进行横向学术比较"
              >
                ⚖️ 并置对比
              </button>
              <button
                type="button"
                className="art-poster-btn"
                onClick={() => onPoster && onPoster(c)}
                title="生成并下载学术收藏展签海报与文献引文"
              >
                🖼️ 展签海报
              </button>
            </div>
          </figure>
          <p className="artwork-note">
            上图为原创几何示意研究图。建议同时检索原作高清图对照观看：
            <a href={`https://www.google.com/search?tbm=isch&q=${q}`} target="_blank" rel="noreferrer">
              {" "}
              搜索原作图片 ↗
            </a>
          </p>

          <p className="lede">
            <b>导览</b>
            {c.intro}
          </p>

          <div className="sec-title">
            <span className="idx">01 图文研习</span>设计要点解析
          </div>
          <div className="points">
            {c.points.map((pt, k) => (
              <div className="point" key={k}>
                <h4>{pt.h}</h4>
                <p>{pt.p}</p>
              </div>
            ))}
          </div>
          <div className="exercise">
            <b>观察练习 · </b>
            {c.exercise}
          </div>

          {/* 研习手记批注区 */}
          <div className="note-section">
            <div className="note-head">
              <span className="note-title">📝 我的研习手记与思考批注</span>
              {noteSavedAlert && <span className="note-alert">已自动保存 ✓</span>}
            </div>
            <textarea
              className="note-input"
              value={noteDraft}
              onChange={e => {
                const val = e.target.value;
                setNoteDraft(val);
                if (onSaveNote) {
                  onSaveNote(val);
                  setNoteSavedAlert(true);
                  setTimeout(() => setNoteSavedAlert(false), 2000);
                }
              }}
              placeholder="记录本案例的观察心得、构图推导或与导师同学研讨的思考点…"
              rows={3}
              aria-label={`${c.title} 研习手记`}
            />
            <div className="note-tags">
              <span className="note-tag-label">快捷标签：</span>
              {QUICK_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className="note-tag-btn"
                  onClick={() => {
                    const updated = noteDraft ? `${noteDraft.trim()} ${tag} ` : `${tag} `;
                    setNoteDraft(updated);
                    if (onSaveNote) {
                      onSaveNote(updated);
                      setNoteSavedAlert(true);
                      setTimeout(() => setNoteSavedAlert(false), 2000);
                    }
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 额外扩展插槽 */}
          {extraActions && extraActions(c)}

          <div className="sec-title">
            <span className="idx">02 视频解析</span>经典讲解应关注的内容
          </div>
          <div className="video-box">
            <ul className="video-outline">
              {c.videoOutline.map((v, k) => (
                <li key={k}>{v}</li>
              ))}
            </ul>
            <div className="video-actions">
              <a
                className="btn"
                href={`https://search.bilibili.com/all?keyword=${q}`}
                target="_blank"
                rel="noreferrer"
              >
                在 B 站搜索讲解（中文）↗
              </a>
              <a
                className="btn"
                href={`https://www.youtube.com/results?search_query=${qEn}`}
                target="_blank"
                rel="noreferrer"
              >
                在 YouTube 搜索（English）↗
              </a>
            </div>
            <div className="link-row">
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSaveLink(draft.trim());
                  }
                }}
                onPaste={e => {
                  const text = (e.clipboardData || window.clipboardData).getData("text").trim();
                  if (!text) return;
                  const r = toEmbed(text);
                  setDraft(text);
                  if (r && r.src) {
                    e.preventDefault();
                    onSaveLink(text);
                  }
                }}
                placeholder="粘贴 B 站或 YouTube 视频链接，可嵌入的链接将自动保存并在此播放"
                aria-label="视频链接"
              />
              <button className="btn" onClick={() => onSaveLink(draft.trim())}>
                保存链接
              </button>
            </div>
            {draftCheck && (
              <p className={`link-check ${draftCheck.tone}`} role="status">
                {draftCheck.text}
              </p>
            )}
            {savedLink && embed && embed.src && (
              <>
                <div className={`video-frame ${frameReady ? "ready" : ""}`}>
                  <iframe
                    onLoad={() => setFrameReady(true)}
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
                  <a href={savedLink} target="_blank" rel="noreferrer">
                    {" "}
                    打开原视频页 ↗
                  </a>
                </p>
              </>
            )}
            {savedLink && embed && embed.short && (
              <p className="saved-link">
                检测到 b23.tv 短链接，短链无法直接嵌入。请在浏览器打开
                <a href={savedLink} target="_blank" rel="noreferrer">
                  {" "}
                  该短链 ↗
                </a>
                后，复制地址栏中带 BV 号的完整链接（形如 bilibili.com/video/BV…）再粘贴保存。
              </p>
            )}
            {savedLink && !embed && (
              <p className="saved-link">
                暂不支持该链接的自动嵌入（目前支持 B 站与 YouTube 视频链接）。已保存：
                <a href={savedLink} target="_blank" rel="noreferrer">
                  {" "}
                  {savedLink} ↗
                </a>
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
                <button
                  className="btn danger"
                  onClick={() => {
                    setConfirmReset(false);
                    onReset();
                  }}
                >
                  确认重置
                </button>
                <button className="btn" onClick={() => setConfirmReset(false)}>
                  取消
                </button>
              </div>
            )}
            {!(done && onReset && confirmReset) && (
              <button className="btn primary" disabled={done} onClick={onFinish}>
                {done ? "✓ 本案例已完成" : "完成本案例学习"}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
