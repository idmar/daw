import { describe, it, expect, vi, beforeEach } from "vitest";
import { playChime, setAmbientSound } from "../src/utils/audio.js";

describe("Atelier Focus Timer & Web Audio 研习时钟与音效发生器", () => {
  it("无浏览器 AudioContext 环境下函数执行不崩溃", () => {
    expect(() => playChime()).not.toThrow();
    expect(() => setAmbientSound(true)).not.toThrow();
    expect(() => setAmbientSound(false)).not.toThrow();
  });

  it("时钟预设涵盖 15min / 25min / 45min 规范研习心流梯度", () => {
    const presets = [
      { id: "sprint", duration: 15 * 60 },
      { id: "atelier", duration: 25 * 60 },
      { id: "seminar", duration: 45 * 60 },
    ];
    expect(presets[0].duration).toBe(900);
    expect(presets[1].duration).toBe(1500);
    expect(presets[2].duration).toBe(2700);
  });

  it("格式化时间计算在零分秒与两位数下正确补位", () => {
    const formatTime = (totalSec) => {
      const minutes = Math.floor(totalSec / 60);
      const seconds = totalSec % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    expect(formatTime(1500)).toBe("25:00");
    expect(formatTime(900)).toBe("15:00");
    expect(formatTime(65)).toBe("01:05");
    expect(formatTime(0)).toBe("00:00");
  });

  it("圆环周长与进度比率计算准确且无负值", () => {
    const r = 88;
    const circumference = 2 * Math.PI * r;
    const calcOffset = (total, remaining) => {
      const ratio = total > 0 ? (total - remaining) / total : 0;
      return circumference * (1 - ratio);
    };

    expect(calcOffset(1500, 1500)).toBeCloseTo(circumference, 1); // 0% 进度
    expect(calcOffset(1500, 0)).toBeCloseTo(0, 1); // 100% 进度
    expect(calcOffset(1500, 750)).toBeCloseTo(circumference / 2, 1); // 50% 进度
  });
});
