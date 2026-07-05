import { interpolateColors } from "remotion";
import { colors, fontMono, markerPinkStyle, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import { useAppear, usePop, useProgress } from "../parts/animate";

export type BinaryDigit = {
  weightLabel: React.ReactNode; // 例: 2³＝8
  digit: string; // "1" | "0"
  product: string; // 例: "8"（0の桁は "0"）
};

export type BinarySlideProps = {
  heading: string;
  icon?: React.ReactNode;
  digits: BinaryDigit[];
  /** 例: ["8", "4", "0", "1"] — 式の項（digits と同順） */
  answer: string;
  telop: string;
  /** 桁の評価を始める秒と1桁あたりの秒 */
  evalFromSec?: number;
  evalStepSec?: number;
};

const DigitCol: React.FC<{ d: BinaryDigit; index: number; litAtSec: number }> = ({
  d,
  index,
  litAtSec,
}) => {
  const isOne = d.digit === "1";
  const appear = useAppear(0.35 + index * 0.15, { dy: 16 });
  const lit = useProgress(litAtSec, 0.3);
  const productPop = usePop(litAtSec + 0.1, { from: 0.5 });

  // 1の桁: surface → primary50 + primary500枠で点灯 / 0の桁: 減光して「数えない」
  const bg = interpolateColors(isOne ? lit : 0, [0, 1], [colors.surface, colors.primary50]);
  const borderColor = interpolateColors(isOne ? lit : 0, [0, 1], [colors.border, colors.primary500]);
  const digitColor = isOne
    ? interpolateColors(lit, [0, 1], [colors.textPrimary, colors.primary800])
    : interpolateColors(lit, [0, 1], [colors.textPrimary, colors.textMuted]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        width: 54 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
        }}
      >
        {d.weightLabel}
      </span>
      <span
        style={{
          width: 44 * SCALE,
          height: 44 * SCALE,
          borderRadius: 11 * SCALE,
          backgroundColor: bg,
          border: `${1.5 * SCALE}px solid ${borderColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fontMono,
          fontSize: 23 * SCALE,
          fontWeight: 800,
          color: digitColor,
          scale: String(1 + (isOne ? lit : 0) * 0.04),
        }}
      >
        {d.digit}
      </span>
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 13 * SCALE,
          fontWeight: 800,
          color: isOne ? colors.primary800 : colors.textMuted,
          ...productPop,
        }}
      >
        {d.product}
      </span>
    </div>
  );
};

/**
 * 本編スライド⑧ 基数変換（計算ステップ）— DESIGN.html .bin-wrap
 * 桁が並ぶ → 左から1桁ずつ評価（1は点灯・0は減光）→ 足し算が1項ずつ → 答えがピンクマーカーでドン。
 */
export const BinarySlide: React.FC<BinarySlideProps> = ({
  heading,
  icon,
  digits,
  answer,
  telop,
  evalFromSec = 1.3,
  evalStepSec = 0.7,
}) => {
  const eqStart = evalFromSec + 0.15;
  const ansAt = evalFromSec + digits.length * evalStepSec + 0.3;
  const ansPop = usePop(ansAt, { from: 0.4, durSec: 0.5 });

  return (
    <SlideShell heading={heading} icon={icon} telop={telop}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12 * SCALE,
          marginTop: "1%",
          minHeight: 0,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 14 * SCALE }}>
          {digits.map((d, i) => (
            <DigitCol key={i} d={d} index={i} litAtSec={evalFromSec + i * evalStepSec} />
          ))}
        </div>

        {/* .bin-eq: 足し算 1 行で着地 */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 9 * SCALE,
            fontFamily: fontMono,
            fontSize: 15 * SCALE,
            fontWeight: 800,
          }}
        >
          {digits.map((d, i) => (
            <EqTerm
              key={i}
              text={d.product}
              dim={d.digit === "0"}
              plus={i > 0}
              delaySec={eqStart + i * evalStepSec}
            />
          ))}
          <EqPart delaySec={ansAt - 0.1}>＝</EqPart>
          <span
            style={{
              fontSize: 23 * SCALE,
              ...markerPinkStyle,
              padding: `0 ${2 * SCALE}px`,
              ...ansPop,
            }}
          >
            {answer}
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

const EqPart: React.FC<{ delaySec: number; children: React.ReactNode }> = ({
  delaySec,
  children,
}) => {
  const appear = useAppear(delaySec, { dy: 8 });
  return <span style={appear}>{children}</span>;
};

const EqTerm: React.FC<{ text: string; dim: boolean; plus: boolean; delaySec: number }> = ({
  text,
  dim,
  plus,
  delaySec,
}) => {
  const appear = useAppear(delaySec, { dy: 8 });
  return (
    <>
      {plus ? <EqPart delaySec={delaySec}>＋</EqPart> : null}
      <span style={{ color: dim ? colors.textMuted : undefined, ...appear }}>{text}</span>
    </>
  );
};
