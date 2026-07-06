/**
 * scripts/stills.mjs 用のReact非依存エントリ（videos一覧 + 尺計算のみ）。
 * ここに renderScene 等のReact依存を足さないこと。
 */
export { videos } from "./index";
export { sceneDurationSec, videoDurationInFrames } from "./duration";
