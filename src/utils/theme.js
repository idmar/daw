/**
 * 美术馆光照引擎与主题管理
 */
export const THEMES = [
  { id: "daylight", name: "日光展厅", icon: "☀️", desc: "经典灰白展墙与克莱因蓝策展线" },
  { id: "midnight", name: "深色夜场", icon: "🌙", desc: "黑曜石深色展厅与护眼低眩光" },
  { id: "sepia", name: "纸本档案", icon: "📜", desc: "温润羊皮纸感与典藏书刊基调" },
];

export const getInitialTheme = () => {
  if (typeof window === "undefined") return "daylight";
  try {
    const saved = localStorage.getItem("daw:theme");
    if (saved && THEMES.some(t => t.id === saved)) {
      return saved;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "midnight";
    }
  } catch (e) {
    /* 忽略安全沙箱异常 */
  }
  return "daylight";
};

export const saveTheme = theme => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("daw:theme", theme);
  } catch (e) {
    /* 忽略安全沙箱异常 */
  }
};
