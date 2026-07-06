import { useProgress } from "./animate";

/**
 * 図解（関係図・循環図・矢印）用の描画部品。
 * カスタムシーンで SVG の線・矢印を「描いていく」演出を簡単にする。
 * 座標はシーン側の viewBox に従う（strokeWidth も viewBox 座標系で指定）。
 */

/** 線・曲線をストローク描画する。d は SVG パス（直線なら "M x1 y1 L x2 y2"） */
export const DrawPath: React.FC<{
  d: string;
  delaySec: number;
  durSec?: number;
  stroke: string;
  strokeWidth: number;
  /** 破線にする（ガイド線向け。描画演出はフェードになる） */
  dashed?: boolean;
  /** ArrowMarker の id を渡すと終端に矢じりが付く（例: "url(#arrow-blue)"） */
  markerEnd?: string;
}> = ({ d, delaySec, durSec = 0.8, stroke, strokeWidth, dashed, markerEnd }) => {
  const p = useProgress(delaySec, durSec);
  if (dashed) {
    return (
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray="4 3"
        opacity={p}
        markerEnd={markerEnd}
      />
    );
  }
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - p}
      markerEnd={markerEnd}
    />
  );
};

/**
 * 矢じりの定義。<svg> 直下に1回置き、DrawPath の markerEnd="url(#id)" で参照する。
 * size は viewBox 座標系での矢じりの長さ。
 */
export const ArrowMarker: React.FC<{ id: string; color: string; size?: number }> = ({
  id,
  color,
  size = 6,
}) => (
  <defs>
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth={size}
      markerHeight={size}
      orient="auto-start-reverse"
    >
      <path d="M0 0L10 5L0 10z" fill={color} />
    </marker>
  </defs>
);
