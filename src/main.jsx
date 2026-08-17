import React from "react";
import { createRoot } from "react-dom/client";
import App from "./DesignAestheticsWorkbench.jsx";

/* ------------------------------------------------------------------
   存储兼容层
   组件使用 Claude Artifacts 提供的 window.storage（异步 key-value）。
   在普通浏览器环境中不存在该 API，这里以 localStorage 实现同签名的
   兼容层，保证学习进度在本地开发 / 静态部署时同样可持久化。
------------------------------------------------------------------- */
if (typeof window !== "undefined" && !window.storage) {
  const PREFIX = "daw:";
  window.storage = {
    async get(key) {
      const value = localStorage.getItem(PREFIX + key);
      if (value === null) throw new Error("Key not found: " + key);
      return { key, value, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(PREFIX + key, value);
      return { key, value, shared: false };
    },
    async delete(key) {
      localStorage.removeItem(PREFIX + key);
      return { key, deleted: true, shared: false };
    },
    async list(prefix = "") {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PREFIX + prefix)) keys.push(k.slice(PREFIX.length));
      }
      return { keys, prefix, shared: false };
    },
  };
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
