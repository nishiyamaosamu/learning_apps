import { interpolateColors } from "remotion";
import { colors, fontMono, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import { NEVER_SEC, useAppear, usePop, useProgress } from "../parts/animate";

export type MatrixCell = {
  abc: string;
  name: string;
  icon?: React.ReactNode;
  desc: string;
  /** hi = primary100 / lo = primary50 で塗る（強調したい象限だけ） */
  tone?: "hi" | "lo";
  /** 塗りに切り替わる秒（省略時は塗らない or 最初から？→ アニメで点灯） */
  highlightAtSec?: number;
};

export type MatrixSlideProps = {
  heading: string;
  icon?: React.ReactNode;
  colLabels: [string, string];
  rowLabels: [string, string];
  cells: [MatrixCell, MatrixCell, MatrixCell, MatrixCell]; // 左上→右上→左下→右下
  telop: string;
};

const Cell: React.FC<{ cell: MatrixCell; delaySec: number }> = ({ cell, delaySec }) => {
  const pop = usePop(delaySec, { from: 0.88 });
  const on = useProgress(cell.highlightAtSec ?? NEVER_SEC, 0.35);
  const toneColor = cell.tone === "hi" ? colors.primary100 : colors.primary50;
  const bg = interpolateColors(cell.tone ? on : 0, [0, 1], [colors.surface, toneColor]);
  const borderColor = interpolateColors(cell.tone ? on : 0, [0, 1], [colors.border, toneColor]);

  return (
    <div
      style={{
        borderRadius: 10 * SCALE,
        padding: `${4 * SCALE}px ${12 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 0,
        backgroundColor: bg,
        border: `${1 * SCALE}px solid ${borderColor}`,
        ...pop,
      }}
    >
      <b style={{ fontSize: 11.5 * SCALE, display: "flex", alignItems: "center" }}>
        <i
          style={{
            fontFamily: fontMono,
            fontStyle: "normal",
            color: colors.primary800,
            marginRight: 5 * SCALE,
          }}
        >
          {cell.abc}
        </i>
        {cell.name}
        <span style={{ marginLeft: "auto", color: colors.textSecondary, display: "flex" }}>
          {cell.icon}
        </span>
      </b>
      <span style={{ fontSize: 9 * SCALE, color: colors.textSecondary, lineHeight: 1.4 }}>
        {cell.desc}
      </span>
    </div>
  );
};

const AxisLabel: React.FC<{
  children: React.ReactNode;
  vertical?: boolean;
  delaySec: number;
}> = ({ children, vertical, delaySec }) => {
  const appear = useAppear(delaySec, { dy: 8 });
  return (
    <span
      style={{
        fontSize: 9 * SCALE,
        fontWeight: 700,
        color: colors.textMuted,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        writingMode: vertical ? "vertical-rl" : undefined,
        ...appear,
      }}
    >
      {children}
    </span>
  );
};

/**
 * 本編スライド④ 2×2マトリクス — DESIGN.html .mx-wrap
 * 軸ラベル → セルが順にポップイン → 注目象限だけ後から点灯（primary100/50）。
 */
export const MatrixSlide: React.FC<MatrixSlideProps> = ({
  heading,
  icon,
  colLabels,
  rowLabels,
  cells,
  telop,
}) => {
  return (
    <SlideShell heading={heading} icon={icon} telop={telop}>
      <div
        style={{
          flex: 1,
          display: "grid",
          gap: 4 * SCALE,
          marginTop: "1.5%",
          minHeight: 0,
          gridTemplateColumns: `${14 * SCALE}px 1fr 1fr`,
          gridTemplateRows: `${13 * SCALE}px 1fr 1fr`,
        }}
      >
        <span aria-hidden />
        <AxisLabel delaySec={0.3}>{colLabels[0]}</AxisLabel>
        <AxisLabel delaySec={0.3}>{colLabels[1]}</AxisLabel>
        <AxisLabel vertical delaySec={0.4}>
          {rowLabels[0]}
        </AxisLabel>
        <Cell cell={cells[0]} delaySec={0.6} />
        <Cell cell={cells[1]} delaySec={0.85} />
        <AxisLabel vertical delaySec={0.5}>
          {rowLabels[1]}
        </AxisLabel>
        <Cell cell={cells[2]} delaySec={1.1} />
        <Cell cell={cells[3]} delaySec={1.35} />
      </div>
    </SlideShell>
  );
};
