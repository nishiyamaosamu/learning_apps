import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { easeOutBezier } from "../design/tokens";

const clampOpts = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** DESIGN.html --ease-out */
export const easeOut = Easing.bezier(...easeOutBezier);
/** 軽いオーバーシュート（ポップイン用） */
export const easeOvershoot = Easing.bezier(0.34, 1.56, 0.64, 1);

/** フェード + 上昇（dy < 0 で降下）。style に spread して使う */
export const useAppear = (delaySec: number, opts?: { dy?: number; durSec?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { dy = 20, durSec = 0.4 } = opts ?? {};
  const range = [delaySec * fps, (delaySec + durSec) * fps];
  return {
    opacity: interpolate(frame, range, [0, 1], { ...clampOpts, easing: easeOut }),
    translate: `0px ${interpolate(frame, range, [dy, 0], { ...clampOpts, easing: easeOut })}px`,
  };
};

/** ポップイン（縮小からオーバーシュートで着地）。style に spread して使う */
export const usePop = (delaySec: number, opts?: { durSec?: number; from?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durSec = 0.45, from = 0.7 } = opts ?? {};
  const range = [delaySec * fps, (delaySec + durSec) * fps];
  return {
    opacity: interpolate(frame, range, [0, 1], { ...clampOpts, easing: easeOut }),
    scale: String(interpolate(frame, range, [from, 1], { ...clampOpts, easing: easeOvershoot })),
  };
};

/**
 * 任意方向からのスライドイン（フェード付き）。style に spread して使う。
 * useAppear の dy 版に加えて dx（横方向）も指定できる。
 * 既存の transform / 位置指定（translate(-50%,-50%) 等）と混ぜたい場合は、
 * このスタイルを「内側のラッパー div」に当てて、位置決めは外側の div で行うこと。
 */
export const useFlyIn = (
  delaySec: number,
  opts?: { dx?: number; dy?: number; durSec?: number },
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { dx = 0, dy = 20, durSec = 0.45 } = opts ?? {};
  const range = [delaySec * fps, (delaySec + durSec) * fps];
  const t = interpolate(frame, range, [1, 0], { ...clampOpts, easing: easeOut });
  return {
    opacity: interpolate(frame, range, [0, 1], { ...clampOpts, easing: easeOut }),
    translate: `${dx * t}px ${dy * t}px`,
  };
};

/** 「発火しない」を表す遅延秒の番兵（interpolate が安全に扱える大きさ） */
export const NEVER_SEC = 9999;

/** 0→1 の進捗(線の描画・カラーブレンドなどに) */
export const useProgress = (delaySec: number, durSec: number, easing = easeOut) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame, [delaySec * fps, (delaySec + durSec) * fps], [0, 1], {
    ...clampOpts,
    easing,
  });
};
