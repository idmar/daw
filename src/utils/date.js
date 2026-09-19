/**
 * 日期与研习主题工具函数
 */
export const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const dayIndexOf = (key, themeCount = 20) =>
  Math.floor(Date.parse(key + "T00:00:00") / 86400000) % themeCount;

export const casesForDay = (key, allCases = [], themeCount = 20) => {
  const targetDay = dayIndexOf(key, themeCount);
  return allCases.filter(c => c.day === targetDay);
};

export const fmtDate = key => {
  const [y, m, d] = key.split("-");
  const wd = "日一二三四五六"[new Date(key + "T00:00:00").getDay()];
  return `${y}年${+m}月${+d}日 · 周${wd}`;
};

/**
 * 计算连续研习天数与统计数据
 */
export const calculateStats = (completedMap = {}, tKey, dayClosed = false) => {
  const days = Object.keys(completedMap).sort();
  const total = days.reduce((s, k) => s + (completedMap[k] || []).length, 0);
  const uniq = new Set();
  days.forEach(k => (completedMap[k] || []).forEach(id => uniq.add(id)));
  const fullDays = days.filter(k => (completedMap[k] || []).length >= 5).length;

  let streak = 0;
  const cur = new Date(tKey + "T00:00:00");
  if (!dayClosed) cur.setDate(cur.getDate() - 1); // 今日未闭馆则从昨日起算
  for (;;) {
    const k = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`;
    if ((completedMap[k] || []).length >= 5) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    } else {
      break;
    }
  }

  const extraTotal = days.reduce((n, k) => n + Math.max(0, (completedMap[k] || []).length - 5), 0);
  return { total, uniqueCount: uniq.size, fullDays, streak, days, extraTotal };
};
