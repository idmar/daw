/**
 * 美术馆画室沉浸音效合成器 (Web Audio API 原生纯数学合成，零外部资源依赖)
 */

let audioCtx = null;
let ambientNoiseNode = null;
let ambientGainNode = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * 播放研习结束柔和颂钵/编钟音 (432Hz 谐波正弦波衰减)
 */
export function playChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // 432Hz 经典谐振基频，配微弱次泛音
    osc.type = "sine";
    osc.frequency.setValueAtTime(432, now);
    osc.frequency.exponentialRampToValueAtTime(428, now + 3);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 3.6);
  } catch (e) {
    // 静音或环境不支持时静默忽略
  }
}

/**
 * 切换画室极淡纸张/铅笔白噪环境音
 * @param {boolean} enable 
 * @param {number} volume 0.0 ~ 1.0
 */
export function setAmbientSound(enable, volume = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (!enable) {
      if (ambientNoiseNode) {
        try {
          ambientNoiseNode.stop();
          ambientNoiseNode.disconnect();
        } catch (e) {}
        ambientNoiseNode = null;
      }
      return;
    }

    if (ambientNoiseNode) return; // 已在播放

    // 生成 3 秒循环粉红/布朗柔和环境噪波 (仿若画室铅笔划纸与风声)
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02; // 极低通滤波
      data[i] = lastOut * 1.5;
    }

    ambientNoiseNode = ctx.createBufferSource();
    ambientNoiseNode.buffer = buffer;
    ambientNoiseNode.loop = true;

    // 低通滤波器营造暖色室内感
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    ambientGainNode = ctx.createGain();
    ambientGainNode.gain.setValueAtTime(volume * 0.25, ctx.currentTime);

    ambientNoiseNode.connect(filter);
    filter.connect(ambientGainNode);
    ambientGainNode.connect(ctx.destination);

    ambientNoiseNode.start();
  } catch (e) {
    // 静音
  }
}
