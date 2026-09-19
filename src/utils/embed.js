/**
 * 视频嵌入链接转换器
 * 把常见分享链接自动转换为「允许被 iframe 嵌入」的官方播放器地址。
 * - YouTube: www.youtube-nocookie.com/embed/{id}
 * - Bilibili: player.bilibili.com/player.html?bvid=... 或 aid=...
 */
export const toEmbed = raw => {
  const url = (raw || "").trim();
  if (!url) return null;
  try {
    const u = new URL(url.includes("://") ? url : "https://" + url);
    const host = u.hostname.replace(/^www\./, "");

    /* ---- YouTube 系列 ---- */
    const yt = id => (id ? { src: `https://www.youtube-nocookie.com/embed/${id}?rel=0`, site: "youtube" } : null);
    if (host === "youtu.be") {
      const id = u.pathname.split("/")[1];
      return yt(id ? id.split("?")[0] : null);
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      if (u.searchParams.get("v")) return yt(u.searchParams.get("v"));
      const m = u.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{6,})/);
      if (m) return yt(m[1]);
    }

    /* ---- B 站系列 ---- */
    if (host === "b23.tv") return { short: true }; // 短链提示用户展开
    if (host.endsWith("bilibili.com")) {
      const base = "https://player.bilibili.com/player.html";
      const common = "&high_quality=1&danmaku=0&autoplay=0";
      if (host.startsWith("player.")) {
        return {
          src: `${base}?${u.search.replace(/^\?/, "")}${u.search.includes("high_quality") ? "" : common}`,
          site: "bilibili",
        };
      }
      const bv = url.match(/(BV[0-9A-Za-z]{8,})/);
      if (bv) {
        const page = u.searchParams.get("p") || "1";
        return { src: `${base}?bvid=${bv[1]}&page=${page}${common}`, site: "bilibili" };
      }
      const av = url.match(/av(\d+)/i);
      if (av) return { src: `${base}?aid=${av[1]}${common}`, site: "bilibili" };
    }
  } catch (e) {
    /* 非法链接 */
  }
  return null;
};
