import { narrationLoader } from "./narration";
import commonDurations from "../videos/common/common.audio.json";

/**
 * 全動画で文言が固定される定型セリフ（クイズ導入・締めの一言）の共通音声。
 * `public/audio/common/` に一度だけ生成した音声を全動画で使い回す
 * （動画ごとに毎回同じ文言を再生成しない）。
 *
 * 文言を変える場合は narration/common/common.jobs.json を編集して
 * tts.py で再生成 → node scripts/audio-durations.mjs common を実行する。
 */
const NC = narrationLoader(commonDurations, "audio/common");

/** クイズ導入の幕間ページで使う（例: `narration: QUIZ_INTRO_SEG` として SectionTitle に渡す） */
export const QUIZ_INTRO_SEG = [
  NC("quiz_intro.mp3", "ここまで学んだことを、クイズ形式で確認していきましょう。"),
];

/**
 * 科目B（ケース問題）レッスンの確認パート導入で使う。
 * 知識の一問一答ではなく「A社のケースを提示 → その状況で判断させる」構成のとき、
 * QUIZ_INTRO_SEG の代わりにこれを SectionTitle（例: 題「ケースで確認」）に渡す。
 */
export const CASE_INTRO_SEG = [
  NC("case_intro.mp3", "ここまでを踏まえて、ケース問題で確認していきましょう。"),
];

/** まとめページ最後のセグメントとして配列の末尾に足す（例: `[...ownSegments, OUTRO_SEG]`） */
export const OUTRO_SEG = NC("outro.mp3", "今回のレッスンはここまでです。お疲れさまでした！");
