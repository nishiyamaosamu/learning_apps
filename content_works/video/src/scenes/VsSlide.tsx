import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import type { NarrationSegment } from "../videos/types";
import { easeOut, useAppear } from "../parts/animate";

export type VsColumn = {
  title: string;
  icon?: React.ReactNode;
  rows: { k: string; v: string }[];
};

export type VsSlideProps = {
  heading: string;
  icon?: React.ReactNode;
  left: VsColumn;
  right: VsColumn;
  telop?: string;
  narration?: NarrationSegment[];
  /**
   * 左右カラムの出現秒 [left, right]。ナレーションが左→右の順で話す構成のときに
   * `[segStart(SEG, 1), segStart(SEG, 2)]` のように指定する。省略時は既定の早出しタイミング。
   */
  columnAtSec?: [number, number];
};

const Col: React.FC<{ col: VsColumn; fromX: number; delaySec: number }> = ({
  col,
  fromX,
  delaySec,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const range = [delaySec * fps, (delaySec + 0.5) * fps];
  const x = interpolate(frame, range, [fromX, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const opacity = interpolate(frame, range, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.primary300}`,
        borderRadius: 12 * SCALE,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity,
        translate: `${x}px 0px`,
      }}
    >
      <h4
        style={{
          margin: 0,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary800,
          padding: 4 * SCALE,
        }}
      >
        {col.icon}
        {col.title}
      </h4>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5 * SCALE,
          padding: `${6 * SCALE}px ${14 * SCALE}px`,
        }}
      >
        {col.rows.map((r, i) => (
          <Row key={r.k} k={r.k} v={r.v} delaySec={delaySec + 0.4 + i * 0.25} />
        ))}
      </div>
    </div>
  );
};

const Row: React.FC<{ k: string; v: string; delaySec: number }> = ({ k, v, delaySec }) => {
  const appear = useAppear(delaySec, { dy: 12 });
  return (
    <div style={{ fontSize: 11.5 * SCALE, fontWeight: 700, lineHeight: 1.5, ...appear }}>
      <span
        style={{
          display: "block",
          fontSize: 9 * SCALE,
          fontWeight: 600,
          color: colors.textMuted,
        }}
      >
        {k}
      </span>
      {v}
    </div>
  );
};

/**
 * 本編スライド② 対比 — DESIGN.html .vs-wrap
 * 左右のカラムが両側からスライドイン → 行が時間差で立ち上がる。
 */
export const VsSlide: React.FC<VsSlideProps> = ({
  heading,
  icon,
  left,
  right,
  telop,
  narration,
  columnAtSec,
}) => {
  return (
    <SlideShell heading={heading} icon={icon} telop={telop} narration={narration}>
      <div
        style={{
          display: "flex",
          gap: 10 * SCALE,
          flex: 1,
          marginTop: "2%",
          minHeight: 0,
        }}
      >
        <Col col={left} fromX={-60} delaySec={columnAtSec?.[0] ?? 0.35} />
        <Col col={right} fromX={60} delaySec={columnAtSec?.[1] ?? 0.55} />
      </div>
    </SlideShell>
  );
};
