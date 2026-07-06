import { interpolateColors } from "remotion";
import { colors, fontMono, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import type { NarrationSegment } from "../videos/types";
import { NEVER_SEC, useAppear, useProgress } from "../parts/animate";

export type LayerItem = {
  no: string | number;
  name: string;
  note?: string;
  noteIcon?: React.ReactNode;
  /** この層を点灯させる秒 */
  highlightAtSec?: number;
};

export type LayersSlideProps = {
  heading: string;
  icon?: React.ReactNode;
  layers: LayerItem[]; // 上（大きい番号）から順に
  telop?: string;
  narration?: NarrationSegment[];
};

const Layer: React.FC<{ layer: LayerItem; delaySec: number }> = ({ layer, delaySec }) => {
  const appear = useAppear(delaySec, { dy: 24 });
  const on = useProgress(layer.highlightAtSec ?? NEVER_SEC, 0.35);
  const bg = interpolateColors(on, [0, 1], [colors.surface, colors.primary50]);
  const borderColor = interpolateColors(on, [0, 1], [colors.border, colors.primary500]);
  const noteColor = interpolateColors(on, [0, 1], [colors.textMuted, colors.primary800]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        backgroundColor: bg,
        border: `${1 * SCALE}px solid ${borderColor}`,
        borderRadius: 6 * SCALE,
        padding: `${2 * SCALE}px ${11 * SCALE}px`,
        fontSize: 10.5 * SCALE,
        fontWeight: 700,
        minHeight: 0,
        scale: String(1 + on * 0.02),
        ...appear,
      }}
    >
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 9 * SCALE,
          color: colors.textMuted,
          width: 10 * SCALE,
          flex: "none",
        }}
      >
        {layer.no}
      </span>
      {layer.name}
      {layer.note ? (
        <small
          style={{
            marginLeft: "auto",
            fontSize: 9 * SCALE,
            color: noteColor,
            fontWeight: layer.highlightAtSec != null ? 700 : 500,
            display: "flex",
            alignItems: "center",
            gap: 4 * SCALE,
          }}
        >
          {layer.noteIcon}
          {layer.note}
        </small>
      ) : null}
    </div>
  );
};

/**
 * 本編スライド⑤ 階層図 — DESIGN.html .layers
 * 下の層（物理側）から順に積み上がり、説明中の層だけ点灯（primary50 + primary500枠）。
 */
export const LayersSlide: React.FC<LayersSlideProps> = ({ heading, icon, layers, telop, narration }) => {
  return (
    <SlideShell heading={heading} icon={icon} telop={telop} narration={narration}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3 * SCALE,
          marginTop: "1%",
          minHeight: 0,
          width: "82%",
          alignSelf: "center",
        }}
      >
        {layers.map((l, i) => (
          // 下から積み上げる: DOM末尾（最下層）ほど早く
          <Layer key={String(l.no)} layer={l} delaySec={0.3 + (layers.length - 1 - i) * 0.16} />
        ))}
      </div>
    </SlideShell>
  );
};
