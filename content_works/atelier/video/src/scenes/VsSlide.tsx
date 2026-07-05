import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import { easeOut, useAppear, usePop } from "../parts/animate";

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
  telop: string;
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
 * 本編スライド② 対比（VS）— DESIGN.html .vs-wrap
 * 左右のカラムが両側からスライドイン → 行が時間差 → VSバッジがポップ。
 */
export const VsSlide: React.FC<VsSlideProps> = ({ heading, icon, left, right, telop }) => {
  const badgePop = usePop(1.3, { from: 0.3, durSec: 0.5 });

  return (
    <SlideShell heading={heading} icon={icon} telop={telop}>
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: 10 * SCALE,
          flex: 1,
          marginTop: "2%",
          minHeight: 0,
        }}
      >
        <Col col={left} fromX={-60} delaySec={0.35} />
        <Col col={right} fromX={60} delaySec={0.55} />
        {/* .vs-badge */}
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            width: 30 * SCALE,
            height: 30 * SCALE,
            marginLeft: -15 * SCALE,
            marginTop: -15 * SCALE,
            borderRadius: "50%",
            zIndex: 2,
            backgroundColor: colors.primary600,
            color: "#fff",
            fontWeight: 800,
            fontSize: 10 * SCALE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `${3 * SCALE}px solid ${colors.bg}`,
            ...badgePop,
          }}
        >
          VS
        </span>
      </div>
    </SlideShell>
  );
};
