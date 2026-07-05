import { colors, markerPinkStyle, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import { useAppear, usePop, useProgress } from "../parts/animate";

export type GraphSlideProps = {
  heading: string;
  icon?: React.ReactNode;
  formula: React.ReactNode;
  note: React.ReactNode;
  telop: string;
};

/**
 * 本編スライド⑥ 計算・グラフ — DESIGN.html .graph-wrap（損益分岐点）
 * 軸 → 総費用線 → 売上高線の順に描画し、交点（accentPink）をポップ →
 * 右側に式カードと結論ノートが出る。左に図・右に式のペア構成。
 * 注目点は accentPink 系（装飾専用トークン——状態表示には使わない）。
 */
export const GraphSlide: React.FC<GraphSlideProps> = ({ heading, icon, formula, note, telop }) => {
  const axes = useProgress(0.2, 0.6);
  const fixedLine = useAppear(0.8, { dy: 0 });
  const costDraw = useProgress(1.0, 0.8);
  const costLabel = useAppear(1.7, { dy: 8 });
  const salesDraw = useProgress(2.0, 0.8);
  const salesLabel = useAppear(2.7, { dy: 8 });
  const dropDraw = useProgress(3.1, 0.4);
  const pointPop = usePop(3.3, { from: 0.2 });
  const bepLabel = useAppear(3.6, { dy: 8 });
  const formulaAppear = useAppear(4.2);
  const noteAppear = useAppear(4.8);

  return (
    <SlideShell heading={heading} icon={icon} telop={telop}>
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
        {/* 図（モックの viewBox をそのまま使用） */}
        <svg
          viewBox="0 0 220 150"
          style={{ flex: 1.15, height: "96%", minWidth: 0 }}
          aria-label="損益分岐点のグラフ"
        >
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
          {/* 固定費（破線） */}
          <g opacity={fixedLine.opacity}>
            <path
              d="M18 96h190"
              fill="none"
              stroke={colors.textMuted}
              strokeWidth={1}
              strokeDasharray="4 3"
            />
            <text x={24} y={90} fontSize={9} fill={colors.textMuted}>
              固定費
            </text>
          </g>
          {/* 総費用 */}
          <path
            d="M18 96L205 56"
            fill="none"
            stroke={colors.textSecondary}
            strokeWidth={2}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - costDraw}
          />
          <text
            x={172}
            y={50}
            fontSize={9.5}
            fontWeight={700}
            fill={colors.textSecondary}
            opacity={costLabel.opacity}
          >
            総費用
          </text>
          {/* 売上高（primary600・主series） */}
          <path
            d="M18 138L205 18"
            fill="none"
            stroke={colors.primary600}
            strokeWidth={2.5}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - salesDraw}
          />
          <text
            x={170}
            y={14}
            fontSize={9.5}
            fontWeight={700}
            fill={colors.primary600}
            opacity={salesLabel.opacity}
          >
            売上高
          </text>
          {/* 損益分岐点（accentPink 注目点） */}
          <path
            d="M112 78v60"
            fill="none"
            stroke={colors.accentPink}
            strokeWidth={1.2}
            strokeDasharray="3 3"
            pathLength={1}
            strokeDashoffset={0}
            opacity={dropDraw}
          />
          <g style={{ transformOrigin: "112px 78px", scale: pointPop.scale }}>
            <circle cx={112} cy={78} r={5} fill={colors.accentPink} opacity={pointPop.opacity} />
          </g>
          <text
            x={86}
            y={66}
            fontSize={9.5}
            fontWeight={800}
            fill={colors.accentPinkText}
            opacity={bepLabel.opacity}
          >
            損益分岐点
          </text>
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
            {note}
          </p>
        </div>
      </div>
    </SlideShell>
  );
};

/** 結論の一文を accentPinkSoft マーカーで強調するヘルパー */
export const PinkMarker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ ...markerPinkStyle, color: colors.textPrimary, fontWeight: 700 }}>{children}</span>
);
