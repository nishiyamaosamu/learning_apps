import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fontFamily, SCALE } from "../design/tokens";
import type { NarrationSegment } from "../videos/types";
import { NarrationTelopText } from "../parts/narration";
import { easeOut, useAppear, usePop, useProgress } from "../parts/animate";

export type QuizChoice = { key: string; text: string; correct?: boolean };

export type QuizSlideProps = {
  question: string;
  choices: QuizChoice[];
  foot?: string;
  /** ナレーション字幕。渡すと foot 帯が音声同期字幕になる（revealAtSec は「正解を読み上げるセグメントの開始秒」に合わせる） */
  narration?: NarrationSegment[];
  /** 正解をリビールする秒 */
  revealAtSec?: number;
};

const Choice: React.FC<{ choice: QuizChoice; delaySec: number; revealAtSec: number }> = ({
  choice,
  delaySec,
  revealAtSec,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = useAppear(delaySec, { dy: 24 });
  // 正誤リビールは --dur-base(250ms) 相当で切り替え
  const reveal = useProgress(revealAtSec, 0.25);
  const on = choice.correct ? reveal : 0;

  const bg = interpolateColors(on, [0, 1], [colors.surface, colors.correctSurface]);
  const borderColor = interpolateColors(on, [0, 1], [colors.border, colors.correct]);
  const textColor = interpolateColors(on, [0, 1], [colors.textPrimary, colors.correctText]);
  const klBg = interpolateColors(on, [0, 1], [colors.bg, colors.correct]);
  const klColor = interpolateColors(on, [0, 1], [colors.textSecondary, "#FFFFFF"]);

  // 不正解側はリビール後に減光
  const dim = !choice.correct
    ? interpolate(frame, [revealAtSec * fps, (revealAtSec + 0.25) * fps], [1, 0.55], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOut,
      })
    : 1;

  // ○マークはアルファ+ポップで出す。
  // stroke-dashoffset の描画方式はリビール前に微小な点が残り（丸め誤差）、
  // 描き終わりも真円に見えないことがあるため使わない
  const markPop = usePop(revealAtSec + 0.15, { from: 0.4 });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        backgroundColor: bg,
        border: `${2 * SCALE}px solid ${borderColor}`,
        borderRadius: 12 * SCALE,
        padding: `${8 * SCALE}px ${14 * SCALE}px`,
        fontSize: 14.5 * SCALE,
        fontWeight: 700,
        color: textColor,
        ...appear,
        opacity: Number(appear.opacity) * dim,
        scale: String(1 + on * 0.02),
      }}
    >
      <span
        style={{
          flex: "none",
          width: 26 * SCALE,
          height: 26 * SCALE,
          borderRadius: "50%",
          backgroundColor: klBg,
          border: `${1 * SCALE}px solid ${interpolateColors(on, [0, 1], [colors.border, colors.correct])}`,
          color: klColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12 * SCALE,
        }}
      >
        {choice.key}
      </span>
      {choice.text}
      {choice.correct ? (
        <span style={{ marginLeft: "auto", color: colors.correct, display: "flex", ...markPop }}>
          <svg
            width={20 * SCALE}
            height={20 * SCALE}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            aria-label="正解"
          >
            <circle cx={10} cy={10} r={6.5} />
          </svg>
        </span>
      ) : null}
    </div>
  );
};

/**
 * 動画内クイズ（正解リビール）— DESIGN.html .v-quiz
 * 地を primary50 にして本編と場面転換。正誤の見せ方はアプリの選択肢と完全に同じ文法
 * （色 + ○記号の二重符号化・ルール2）。
 */
export const QuizSlide: React.FC<QuizSlideProps> = ({
  question,
  choices,
  foot = "答えは ○ で表示 — 色 + 記号の二重符号化はアプリと共通ルール",
  revealAtSec = 3.4,
  narration,
}) => {
  const qPop = usePop(0.15, { from: 0.85 });
  const footAppear = useAppear(revealAtSec + 0.8, { dy: 8 });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.primary50,
        color: colors.textPrimary,
        fontFamily,
        padding: "4.5% 6%",
        display: "flex",
        flexDirection: "column",
        gap: "3.5%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE, ...qPop }}>
        <span
          style={{
            width: 34 * SCALE,
            height: 34 * SCALE,
            borderRadius: 10 * SCALE,
            flex: "none",
            backgroundColor: colors.primary600,
            color: "#fff",
            fontWeight: 800,
            fontSize: 18 * SCALE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Q
        </span>
        <b style={{ fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.5 }}>{question}</b>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10 * SCALE,
          flex: 1,
          justifyContent: "center",
        }}
      >
        {choices.map((c, i) => (
          <Choice key={c.key} choice={c} delaySec={0.7 + i * 0.25} revealAtSec={revealAtSec} />
        ))}
      </div>

      {/* foot: 高さは2行分で固定 — 字幕セグメントが1行/2行と変わっても
          選択肢ブロック（flex:1 中央寄せ）の位置が揺れないようにする（SlideShell のテロップ帯と同じ理由） */}
      <div
        style={{
          flex: "none",
          height: 32 * SCALE,
          display: "flex",
          alignItems: "center",
          fontSize: 11 * SCALE,
          lineHeight: 1.35,
          fontWeight: 700,
          color: colors.textSecondary,
          ...footAppear,
        }}
      >
        {narration?.length ? <NarrationTelopText segments={narration} /> : foot}
      </div>
    </AbsoluteFill>
  );
};
