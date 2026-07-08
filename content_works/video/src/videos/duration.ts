import type { NarrationSegment, SceneSpec, VideoSpec } from "./types";

/** ナレーション最終セグメントの後に置く無音の間（次のシーンに移る呼吸） */
export const NARRATION_TAIL_SEC = 0.9;

export const narrationDurationSec = (segments: NarrationSegment[]): number =>
  segments.reduce((acc, s) => acc + s.durationSec + (s.gapBeforeSec ?? 0), 0) + NARRATION_TAIL_SEC;

/**
 * シーンの標準尺（秒）。narration があれば「音声合計 + テール」と
 * アニメーション尺の長い方。無ければアニメーションの終了時刻 + 読む時間。
 * （React 非依存の純粋関数 — scripts/stills.mjs からも使う）
 */
export const sceneDurationSec = (s: SceneSpec): number => {
  const base = baseDurationSec(s);
  return s.narration?.length ? Math.max(base, narrationDurationSec(s.narration)) : base;
};

const baseDurationSec = (s: SceneSpec): number => {
  if (s.durationSec) return s.durationSec;
  switch (s.pattern) {
    case "title":
      return 7.2; // オープニングジングル（6.8s）が鳴り終わるまで

    case "bullets":
      return 3.2 + 0.9 * s.bullets.length; // 3項目 → 5.9s
    case "vs":
      return 6.5;
    case "flow":
      return 2.2 + 1.2 * s.steps.length; // 4ステップ → 7.0s
    case "matrix":
      return 6.5;
    case "layers":
      return 3.5 + 0.5 * s.layers.length; // 7層 → 7.0s
    case "graph":
      return 5.2 + 0.5 * s.lines.filter((l) => l.role === "main").length + 2.0;
    case "term":
      return 4.5;
    case "binary":
      return 4.7 + 0.7 * s.digits.length; // 4桁 → 7.5s
    case "quiz":
      return 7.5;
    case "summary":
      return 3.0 + 1.1 * s.points.length;
    case "custom":
      return s.durationSec;
  }
};

export const videoDurationInFrames = (spec: VideoSpec, fps: number): number =>
  spec.scenes.reduce((acc, s) => acc + Math.round(sceneDurationSec(s) * fps), 0);
