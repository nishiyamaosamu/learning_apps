import { colors, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import type { NarrationSegment } from "../videos/types";
import { useAppear, usePop } from "../parts/animate";
import { Ms } from "../parts/Ms";

export type SummaryPoint = { text: string; checkAtSec: number };

export type SummarySlideProps = {
  chip?: string;
  points: SummaryPoint[]; // 3行まで
  narration?: NarrationSegment[];
};

const SummaryRow: React.FC<{ point: SummaryPoint }> = ({ point }) => {
  const appear = useAppear(Math.max(0, point.checkAtSec - 0.35), { dy: 10 });
  const checkPop = usePop(point.checkAtSec, { from: 0.4 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        backgroundColor: colors.surface,
        border: `${1 * SCALE}px solid ${colors.border}`,
        borderRadius: 10 * SCALE,
        padding: `${7 * SCALE}px ${14 * SCALE}px`,
        fontSize: 12 * SCALE,
        fontWeight: 700,
        lineHeight: 1.55,
        ...appear,
      }}
    >
      <span style={{ flex: "none", color: colors.primary600, display: "flex", ...checkPop }}>
        <Ms name="check_circle" size={17 * SCALE} />
      </span>
      {point.text}
    </div>
  );
};

/**
 * まとめページ（標準形）— DESIGN.html .sum-check
 * 要点を文のまま3行以内で復唱する。チェックは各行の checkAtSec
 * （対応するナレーション文の開始秒）に同期して入る。
 * チェック色は primary600 — correct（緑）は正誤リビール専用なのでここでは使わない（ルール2）。
 */
export const SummarySlide: React.FC<SummarySlideProps> = ({
  chip = "今日のポイント",
  points,
  narration,
}) => {
  const chipAppear = useAppear(0.1, { dy: -14 });

  return (
    <SlideShell narration={narration}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 11 * SCALE,
        }}
      >
        <span
          style={{
            fontSize: 10 * SCALE,
            fontWeight: 800,
            color: colors.primary800,
            backgroundColor: colors.primary100,
            borderRadius: 999,
            padding: `${2 * SCALE}px ${14 * SCALE}px`,
            ...chipAppear,
          }}
        >
          {chip}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 * SCALE, width: "86%" }}>
          {points.map((p) => (
            <SummaryRow key={p.text} point={p} />
          ))}
        </div>
      </div>
    </SlideShell>
  );
};
