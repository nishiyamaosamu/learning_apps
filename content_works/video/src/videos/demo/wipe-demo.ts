import type { VideoSpec } from "../types";

/**
 * ワイプ2種の確認用デモ。
 * A →（wipe: まとめ前専用・全面カバー）→ B →（wipe-light: 本編内用・流れ抜けるだけ）→ C
 */
export const wipeDemo: VideoSpec = {
  id: "wipe-demo",
  scenes: [
    {
      pattern: "term",
      durationSec: 2.5,
      icon: "lightbulb",
      term: "シーン A",
      sub: "ワイプ前のページ",
      telop: "この後、まとめ前専用ワイプで切り替わります",
    },
    {
      pattern: "term",
      durationSec: 4,
      icon: "autorenew",
      term: "シーン B",
      sub: "wipe（まとめ前専用）",
      telop: "ラインが画面を埋めてから右へ抜けました",
      transitionIn: "wipe",
    },
    {
      pattern: "term",
      durationSec: 4,
      icon: "swap_horiz",
      term: "シーン C",
      sub: "wipe-light（本編内用）",
      telop: "軽量版はラインが流れ抜けるだけの簡素な転換です",
      transitionIn: "wipe-light",
    },
  ],
};
