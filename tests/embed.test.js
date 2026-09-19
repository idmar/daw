import { describe, it, expect } from "vitest";
import { toEmbed } from "../src/utils/embed.js";

describe("toEmbed 视频链接解析与嵌入转换", () => {
  it("应返回 null 当输入为空或无效时", () => {
    expect(toEmbed("")).toBeNull();
    expect(toEmbed(null)).toBeNull();
    expect(toEmbed("   ")).toBeNull();
    expect(toEmbed("not-a-valid-url-and-no-protocol")).toBeNull();
  });

  describe("YouTube 系列链接", () => {
    it("正确转换标准 watch 链接", () => {
      const res = toEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      expect(res).toEqual({
        src: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0",
        site: "youtube",
      });
    });

    it("正确转换 youtu.be 短链接", () => {
      const res = toEmbed("https://youtu.be/dQw4w9WgXcQ?t=42");
      expect(res).toEqual({
        src: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0",
        site: "youtube",
      });
    });

    it("正确转换 shorts 链接", () => {
      const res = toEmbed("https://www.youtube.com/shorts/abc12345");
      expect(res).toEqual({
        src: "https://www.youtube-nocookie.com/embed/abc12345?rel=0",
        site: "youtube",
      });
    });

    it("正确转换已是 embed 的链接", () => {
      const res = toEmbed("https://www.youtube.com/embed/xyz98765");
      expect(res).toEqual({
        src: "https://www.youtube-nocookie.com/embed/xyz98765?rel=0",
        site: "youtube",
      });
    });
  });

  describe("Bilibili 系列链接", () => {
    it("正确转换标准 BV 视频链接", () => {
      const res = toEmbed("https://www.bilibili.com/video/BV1xx411c7mD");
      expect(res).toEqual({
        src: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&page=1&high_quality=1&danmaku=0&autoplay=0",
        site: "bilibili",
      });
    });

    it("正确保留分 P 参数", () => {
      const res = toEmbed("https://www.bilibili.com/video/BV1xx411c7mD?p=3");
      expect(res).toEqual({
        src: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&page=3&high_quality=1&danmaku=0&autoplay=0",
        site: "bilibili",
      });
    });

    it("正确转换 av 号链接", () => {
      const res = toEmbed("https://www.bilibili.com/video/av170001");
      expect(res).toEqual({
        src: "https://player.bilibili.com/player.html?aid=170001&high_quality=1&danmaku=0&autoplay=0",
        site: "bilibili",
      });
    });

    it("对 b23.tv 短链返回 short: true 提示", () => {
      const res = toEmbed("https://b23.tv/abcd123");
      expect(res).toEqual({ short: true });
    });

    it("正确处理已是 player.bilibili.com 的播放器地址", () => {
      const res = toEmbed("https://player.bilibili.com/player.html?bvid=BV1xx411c7mD");
      expect(res?.site).toBe("bilibili");
      expect(res?.src).toContain("player.bilibili.com");
      expect(res?.src).toContain("high_quality=1");
    });
  });
});
