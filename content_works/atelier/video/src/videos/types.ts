import type { FC } from "react";
import type { GraphLine, GraphPoint } from "../scenes/GraphSlide";

/**
 * 動画1本 = VideoSpec。シーンは純データで書く（Reactコード不要）。
 * アイコンは Material Symbols のリガチャ名（例: "gpp_maybe", "factory", "trending_up"）。
 * サイズ・色・アニメーションはレンダラーとシーン部品が保証するので、ここでは指定しない。
 */

/**
 * ナレーション1セグメント = 字幕1枚 = 音声ファイル1つ。
 * durationSec は実測値（scripts/audio-durations.mjs が生成する <id>.audio.json 由来）。
 * 手書きせず parts/narration.tsx の narrationLoader で組み立てること。
 */
export type NarrationSegment = {
  /** public/ からの相対パス（例: "audio/l1/s02-1.mp3"） */
  file: string;
  /** 字幕として表示する文（音声の読み上げテキストと一致させる） */
  text: string;
  /** 音声の実測秒数 */
  durationSec: number;
  /**
   * このセグメントを読み始める前に置く無音の間（秒）。
   * クイズの「問い→正解」の考える時間などに使う。間の間、字幕は前のセグメントのまま
   */
  gapBeforeSec?: number;
};

export type TitleScene = {
  pattern: "title";
  durationSec?: number;
  series: string;
  title: string; // 改行は \n（2行まで・1行13文字目安）
  keywords: string[]; // 3個まで
};

export type BulletsScene = {
  pattern: "bullets";
  durationSec?: number;
  heading: string;
  icon: string;
  bullets: { text: string; sub?: string; marker?: "blue" | "pink" }[]; // 3項目まで
  /** narration を付けるシーンでは省略（字幕が音声から出る） */
  telop?: string;
  /** public/ 配下のパス（例: "images/<app>/xxx.png"）。手描きイラストがある場合のみ */
  illust?: string;
};

export type VsScene = {
  pattern: "vs";
  durationSec?: number;
  heading: string;
  icon: string;
  left: VsColumnSpec;
  right: VsColumnSpec;
  /** narration を付けるシーンでは省略（字幕が音声から出る） */
  telop?: string;
};

export type VsColumnSpec = {
  title: string;
  icon?: string;
  rows: { k: string; v: string }[]; // 3行まで・左右で同じ観点を並べる
};

export type FlowScene = {
  pattern: "flow";
  durationSec?: number;
  heading: string;
  icon?: string; // 省略時はブルータブ（見本③と同じ）
  steps: { abc: string; name: string; sub?: string }[]; // 3〜5ステップ
  /** narration を付けるシーンでは省略（字幕が音声から出る） */
  telop?: string;
};

export type MatrixScene = {
  pattern: "matrix";
  durationSec?: number;
  heading: string;
  icon?: string; // 省略時はブルータブ（見本④と同じ）
  colLabels: [string, string];
  rowLabels: [string, string];
  /** 左上→右上→左下→右下。tone を付けた象限は自動で順に点灯する */
  cells: [MatrixCellSpec, MatrixCellSpec, MatrixCellSpec, MatrixCellSpec];
  /** narration を付けるシーンでは省略（字幕が音声から出る） */
  telop?: string;
};

export type MatrixCellSpec = {
  abc: string;
  name: string;
  icon?: string;
  desc: string;
  tone?: "hi" | "lo";
};

export type LayersScene = {
  pattern: "layers";
  durationSec?: number;
  heading: string;
  icon: string;
  /** 上（大きい番号）から順に。7層まで */
  layers: {
    no: string | number;
    name: string;
    note?: string;
    noteIcon?: string;
    /** true にした層が説明の主役として点灯する（1つだけ） */
    highlight?: boolean;
  }[];
  /** narration を付けるシーンでは省略（字幕が音声から出る） */
  telop?: string;
};

export type GraphScene = {
  pattern: "graph";
  durationSec?: number;
  heading: string;
  icon: string;
  /** 座標系: viewBox 220×150、軸は x:18→214 / y:8(上)→138(下) */
  lines: GraphLine[];
  point?: GraphPoint;
  formula: string; // \n で改行
  noteHighlight: string; // ピンクマーカーで強調される結論
  noteRest?: string;
  /** narration を付けるシーンでは省略（字幕が音声から出る） */
  telop?: string;
};

export type TermScene = {
  pattern: "term";
  durationSec?: number;
  chip?: string; // 既定: 今日のキーワード
  icon: string;
  term: string; // 用語1つだけ（10文字目安）
  sub: string;
  /** narration を付けるシーンでは省略（字幕が音声から出る） */
  telop?: string;
};

export type BinaryScene = {
  pattern: "binary";
  durationSec?: number;
  heading: string;
  icon: string;
  digits: { weight: string; digit: string; product: string }[]; // 4〜8桁
  answer: string;
  /** narration を付けるシーンでは省略（字幕が音声から出る） */
  telop?: string;
};

/**
 * カスタムシーン: 既製パターンが内容に合わないときに、ページ専用のレイアウトを組む。
 * component には SlideShell / tokens / parts(animate, Ms) で組んだ React コンポーネントを渡す。
 * デザインシステムの範囲内で自由に設計してよい（色はトークン、動きは interpolate 系のみ）。
 */
export type CustomScene = {
  pattern: "custom";
  /** stills のファイル名・ログに使う短い英数字名 */
  name: string;
  durationSec: number;
  component: FC;
};

export type QuizScene = {
  pattern: "quiz";
  durationSec?: number;
  question: string;
  choices: { key: string; text: string; correct?: boolean }[]; // 2〜3択・correct は1つ
  foot?: string;
  /** 正解リビールの秒。narration 付きなら「正解を読み上げるセグメントの開始秒」に合わせる */
  revealAtSec?: number;
};

/**
 * どのシーンにも narration を付けられる。付けたシーンは
 * - 音声が自動で鳴る（renderScene が保証。手動で <Audio> を置かない）
 * - シーン尺が「ナレーション合計 + テール」まで自動で伸びる（duration.ts）
 * - SlideShell に同じ配列を渡せば字幕が音声に同期して切り替わる
 *
 * transitionIn（シーン頭の切り替え演出。parts/transition.tsx）:
 * - "wipe": 角丸ラインが画面を埋めてから抜ける約1.5秒。**まとめ前専用**
 * - "wipe-light": 斜めの平行四辺形が3枚流れ抜けるだけの軽量版（約1.0秒）。本編内の場面転換用
 */
export type SceneSpec = (
  | TitleScene
  | BulletsScene
  | VsScene
  | FlowScene
  | MatrixScene
  | LayersScene
  | GraphScene
  | TermScene
  | BinaryScene
  | QuizScene
  | CustomScene
) & { narration?: NarrationSegment[]; transitionIn?: "wipe" | "wipe-light" };

export type VideoSpec = {
  /** コンポジションID（英数字とハイフン。レンダリング時に指定する名前） */
  id: string;
  scenes: SceneSpec[];
};
