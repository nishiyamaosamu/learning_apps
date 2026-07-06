import { AbsoluteFill } from "remotion";
import { colors, fontFamily, SCALE } from "../design/tokens";
import { usePop, useProgress } from "./animate";

/**
 * 章見出しの幕間（ダーク地 + 短い題の文字アニメーション）。
 * クイズ導入などの区切りページはこれを使う（ワイプは使わない — 題の文字が主役）。
 *
 * - title は6〜10文字の体言止め（例: 「クイズで確認」「今日のまとめ」）。
 *   1文字ずつポップして着地し、下に角丸のアンダーラインが伸びる
 * - ナレーションの読み上げ文は長くてよい（音声は spec.narration で鳴る。画面は題だけ）
 *
 * 使い方:
 *   const QuizIntroScene = () => <SectionTitle title="クイズで確認" />;
 *   { pattern: "custom", name: "quiz-intro", durationSec: 3, narration: SEG, component: QuizIntroScene }
 */
const Char: React.FC<{ ch: string; delaySec: number }> = ({ ch, delaySec }) => (
  <span style={{ display: "inline-block", ...usePop(delaySec, { from: 0.5 }) }}>{ch}</span>
);

export const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  const chars = Array.from(title);
  // 全文字の着地後にアンダーラインが伸びる
  const bar = useProgress(0.25 + chars.length * 0.07 + 0.2, 0.45);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgDark,
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
        gap: 7 * SCALE,
      }}
    >
      <div
        style={{
          fontSize: 26 * SCALE,
          fontWeight: 800,
          color: colors.textPrimaryDark,
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
        }}
      >
        {chars.map((c, i) => (
          <Char key={`${i}-${c}`} ch={c} delaySec={0.25 + i * 0.07} />
        ))}
      </div>
      <div
        style={{
          width: `${bar * 24}%`,
          height: 2.5 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary500,
        }}
      />
    </AbsoluteFill>
  );
};
