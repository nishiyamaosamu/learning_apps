import { colors, markerPinkStyle, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import type { NarrationSegment } from "../videos/types";
import { useAppear, usePop, useProgress } from "../parts/animate";

/**
 * グラフの座標系は DESIGN.html モックと同じ viewBox 220×150。
 * 軸は左下原点で x:18→214 / y:8→138 の範囲に描く（軸自体はシェルが描画）。
 */
export type GraphLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** main = primary600(太・最後に描画) / sub = textSecondary / guide = 破線(textMuted) */
  role: "main" | "sub" | "guide";
  label?: string;
  labelX?: number;
  labelY?: number;
};

export type GraphPoint = {
  x: number;
  y: number;
  /** 注目点のラベル（accentPinkText） */
  label?: string;
  labelX?: number;
  labelY?: number;
  /** 点からX軸への垂線を描く */
  dropLine?: boolean;
};

export type GraphSlideProps = {
  heading: string;
  icon?: React.ReactNode;
  lines: GraphLine[];
  point?: GraphPoint;
  /** 式カード（\n で改行） */
  formula: string;
  /** 結論ノート: highlight 部分は accentPinkSoft マーカー */
  noteHighlight: string;
  noteRest?: string;
  telop?: string;
  narration?: NarrationSegment[];
};

const roleStyle = {
  main: { stroke: colors.primary600, width: 2.5, fill: colors.primary600 },
  sub: { stroke: colors.textSecondary, width: 2, fill: colors.textSecondary },
  guide: { stroke: colors.textMuted, width: 1, fill: colors.textMuted },
} as const;

/**
 * 本編スライド⑥ 計算・グラフ — DESIGN.html .graph-wrap
 * 軸 → guide → sub線 → main線の順に描画し、注目点（accentPink）をポップ →
 * 右側に式カードと結論ノート。左に図・右に式のペア構成。
 */
export const GraphSlide: React.FC<GraphSlideProps> = ({
  heading,
  icon,
  lines,
  point,
  formula,
  noteHighlight,
  noteRest,
  telop,
  narration,
}) => {
  const axes = useProgress(0.2, 0.6);
  // 描画順: guide(フェード) → sub → main。同role内は0.4sずつずらす
  const guides = lines.filter((l) => l.role === "guide");
  const subs = lines.filter((l) => l.role === "sub");
  const mains = lines.filter((l) => l.role === "main");
  const drawStart = (l: GraphLine) => {
    if (l.role === "guide") return 0.8 + guides.indexOf(l) * 0.3;
    if (l.role === "sub") return 1.0 + subs.indexOf(l) * 0.5;
    return 2.0 + mains.indexOf(l) * 0.5;
  };
  const pointAt = 2.0 + mains.length * 0.5 + 0.6;

  const dropDraw = useProgress(pointAt - 0.2, 0.4);
  const pointPop = usePop(pointAt, { from: 0.2 });
  const pointLabel = useAppear(pointAt + 0.3, { dy: 8 });
  const formulaAppear = useAppear(pointAt + 0.9);
  const noteAppear = useAppear(pointAt + 1.5);

  return (
    <SlideShell heading={heading} icon={icon} telop={telop} narration={narration}>
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "5%",
          marginTop: "1.5%",
          minHeight: 0,
          alignItems: "center",
        }}
      >
        <svg viewBox="0 0 220 150" style={{ flex: 1.15, height: "96%", minWidth: 0 }}>
          {/* 軸 */}
          <path
            d="M18 8v130h196"
            fill="none"
            stroke={colors.textMuted}
            strokeWidth={1.5}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - axes}
          />
          {lines.map((l, i) => (
            <GraphLineEl key={i} line={l} delaySec={drawStart(l)} />
          ))}
          {point ? (
            <>
              {point.dropLine !== false ? (
                <path
                  d={`M${point.x} ${point.y}V138`}
                  fill="none"
                  stroke={colors.accentPink}
                  strokeWidth={1.2}
                  strokeDasharray="3 3"
                  opacity={dropDraw}
                />
              ) : null}
              <g style={{ transformOrigin: `${point.x}px ${point.y}px`, scale: pointPop.scale }}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={5}
                  fill={colors.accentPink}
                  opacity={pointPop.opacity}
                />
              </g>
              {point.label ? (
                <text
                  x={point.labelX ?? point.x - 26}
                  y={point.labelY ?? point.y - 12}
                  fontSize={9.5}
                  fontWeight={800}
                  fill={colors.accentPinkText}
                  opacity={pointLabel.opacity}
                >
                  {point.label}
                </text>
              ) : null}
            </>
          ) : null}
        </svg>

        {/* 式と結論 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8 * SCALE,
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <div
            style={{
              backgroundColor: colors.surface,
              border: `${1 * SCALE}px solid ${colors.border}`,
              borderRadius: 10 * SCALE,
              padding: `${8 * SCALE}px ${10 * SCALE}px`,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.6,
              whiteSpace: "pre-line",
              ...formulaAppear,
            }}
          >
            {formula}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 9.5 * SCALE,
              color: colors.textSecondary,
              lineHeight: 1.6,
              ...noteAppear,
            }}
          >
            <span style={{ ...markerPinkStyle, color: colors.textPrimary, fontWeight: 700 }}>
              {noteHighlight}
            </span>
            {noteRest}
          </p>
        </div>
      </div>
    </SlideShell>
  );
};

const GraphLineEl: React.FC<{ line: GraphLine; delaySec: number }> = ({ line, delaySec }) => {
  const s = roleStyle[line.role];
  const draw = useProgress(delaySec, line.role === "guide" ? 0.4 : 0.8);
  const label = useAppear(delaySec + 0.7, { dy: 0 });
  return (
    <>
      {line.role === "guide" ? (
        <path
          d={`M${line.x1} ${line.y1}L${line.x2} ${line.y2}`}
          fill="none"
          stroke={s.stroke}
          strokeWidth={s.width}
          strokeDasharray="4 3"
          opacity={draw}
        />
      ) : (
        <path
          d={`M${line.x1} ${line.y1}L${line.x2} ${line.y2}`}
          fill="none"
          stroke={s.stroke}
          strokeWidth={s.width}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
      )}
      {line.label ? (
        <text
          x={line.labelX ?? line.x2 - 30}
          y={line.labelY ?? line.y2 - 6}
          fontSize={9.5}
          fontWeight={line.role === "main" ? 700 : line.role === "sub" ? 700 : 400}
          fill={s.fill}
          opacity={label.opacity}
        >
          {line.label}
        </text>
      ) : null}
    </>
  );
};
