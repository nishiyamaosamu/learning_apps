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
      /**
       * 描画前は完全に消す。strokeLinecap="round" は長さ0のダッシュにも丸い端点を描くため、
       * p=0 の間も始点に「点」が残ってしまう（sg-L10 の第三者中継で、矢印より先に
       * 赤い点が出ていると指摘）。opacity は marker にも効くのでここで一括して消す。
       */
      opacity={p > 0 ? 1 : 0}
      /**
       * 矢じり（marker）は strokeDashoffset の影響を受けず、線がまだ伸びていない間も
       * 終端に描かれてしまう。何も無い場所に三角形だけがずっと浮いて見えるので
       * （sg-L8 のディレクトリトラバーサルで指摘）、線が終端へ届くまでは付けない。
       */
      markerEnd={p >= 0.98 ? markerEnd : undefined}
    />
  );
};

/**
 * 矢じりの定義。<svg> 直下に1回置き、DrawPath の markerEnd="url(#id)" で参照する。
 *
 * **矢じりの縦横は `size × DrawPath の strokeWidth`（viewBox 単位）になる**
 * （marker の既定 markerUnits="strokeWidth" のため）。既定なら 6 × strokeWidth。
 * この幅ぶんの余白が線の両側に viewBox 内に無いと、はみ出した角が root の <svg> に
 * クリップされて**矢じりの角が四角く欠ける**（sg-L10 の第三者中継・sg-L11 の中間者攻撃で
 * 「矢印が欠けている」と指摘）。細長い矢印用の svg を作るときは、
 * 線のy ± (size × strokeWidth) / 2 が viewBox に収まるように viewBox の高さを取る。
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
