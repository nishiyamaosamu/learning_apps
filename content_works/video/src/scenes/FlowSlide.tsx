import React from "react";
import { interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontMono, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import type { NarrationSegment } from "../videos/types";
import { useAppear, usePop } from "../parts/animate";

export type FlowStep = { abc: string; name: string; sub?: string };

export type FlowSlideProps = {
  heading: string;
  icon?: React.ReactNode;
  steps: FlowStep[];
  telop?: string;
  narration?: NarrationSegment[];
  /** ハイライト開始秒と1ステップあたりの滞在秒 */
  highlightFromSec?: number;
  highlightStaySec?: number;
};

const Step: React.FC<{
  step: FlowStep;
  index: number;
  isLast: boolean;
  highlightFromSec: number;
  highlightStaySec: number;
}> = ({ step, index, isLast, highlightFromSec, highlightStaySec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = usePop(0.35 + index * 0.18, { from: 0.85 });

  // ハイライト量: 自分の番で 1、次のステップに移ると 0（最後のステップは保持）
  const start = highlightFromSec + index * highlightStaySec;
  const end = start + highlightStaySec;
  const t = frame / fps;
  const fade = 0.25;
  let on = 0;
  if (t >= start) {
    on = Math.min(1, (t - start) / fade);
  }
  // 最後のステップは点灯を保持して締める
  if (!isLast && t >= end) {
    on = Math.max(0, 1 - (t - end) / fade);
  }

  const bg = interpolateColors(on, [0, 1], [colors.surface, colors.primary50]);
  const borderColor = interpolateColors(on, [0, 1], [colors.border, colors.primary500]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${borderColor}`,
        borderRadius: 12 * SCALE,
        textAlign: "center",
        padding: `${12 * SCALE}px ${2 * SCALE}px`,
        ...pop,
        scale: String(Number(pop.scale) * (1 + on * 0.03)),
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: fontMono,
          fontSize: 19 * SCALE,
          fontWeight: 800,
          color: colors.primary600,
        }}
      >
        {step.abc}
      </span>
      <span style={{ display: "block", fontSize: 12 * SCALE, fontWeight: 800 }}>{step.name}</span>
      {step.sub ? (
        <span
          style={{
            display: "block",
            fontSize: 9 * SCALE,
            color: colors.textSecondary,
          }}
        >
          {step.sub}
        </span>
      ) : null}
    </div>
  );
};

const Arrow: React.FC<{ delaySec: number }> = ({ delaySec }) => {
  const appear = useAppear(delaySec, { dy: 0 });
  return (
    <span style={{ flex: "none", color: colors.primary300, display: "flex", ...appear }}>
      <svg
        width={14 * SCALE}
        height={14 * SCALE}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 4.5l6 5.5-6 5.5" />
      </svg>
    </span>
  );
};

/**
 * 本編スライド③ ステップフロー — DESIGN.html .flow
 * ステップが順にポップイン → ハイライト（primary50 + primary500枠）が話の進行に合わせて移動。
 */
export const FlowSlide: React.FC<FlowSlideProps> = ({
  heading,
  icon,
  steps,
  telop,
  narration,
  highlightFromSec = 1.6,
  highlightStaySec = 1.2,
}) => {
  return (
    <SlideShell heading={heading} icon={icon} telop={telop} narration={narration}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          marginTop: "2%",
          minHeight: 0,
        }}
      >
        {steps.map((s, i) => (
          <React.Fragment key={s.abc + s.name}>
            {i > 0 ? <Arrow delaySec={0.35 + i * 0.18 - 0.06} /> : null}
            <Step
              step={s}
              index={i}
              isLast={i === steps.length - 1}
              highlightFromSec={highlightFromSec}
              highlightStaySec={highlightStaySec}
            />
          </React.Fragment>
        ))}
      </div>
    </SlideShell>
  );
};
