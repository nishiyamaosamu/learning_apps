import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontFamily, videoType, easeOutBezier, SCALE } from "../design/tokens";

export type TitleCardProps = {
  series: string;
  title: string; // 改行は \n
  keywords: string[]; // 3個まで
};

/**
 * タイトルカード — DESIGN.html .v-title の忠実な移植（モックpx × SCALE）
 * 構造: series（最上部）→ h3（上下autoで中央）→ kws → foot-line（最下部）
 * 装飾: primary600 の塗り円（右上）/ primary500 の輪郭円（右下）/ accentPink の斜め帯（右下）
 */
export const TitleCard: React.FC<TitleCardProps> = ({ series, title, keywords }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...easeOutBezier);

  const fadeIn = (delaySec: number) =>
    interpolate(frame, [delaySec * fps, (delaySec + 0.5) * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    });

  const rise = (delaySec: number) =>
    interpolate(frame, [delaySec * fps, (delaySec + 0.5) * fps], [24, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgDark,
        color: "#fff",
        fontFamily,
        overflow: "hidden",
        padding: "7% 8%", // .v-title（%はモックと同一）
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* .deco1: 塗りの円（右上） */}
      <div
        style={{
          position: "absolute",
          right: "-8%",
          top: "-22%",
          width: "46%",
          aspectRatio: "1",
          borderRadius: "50%",
          backgroundColor: colors.primary600,
          opacity: 0.35,
        }}
      />
      {/* .deco2: 輪郭だけの円（右下） */}
      <div
        style={{
          position: "absolute",
          right: "14%",
          bottom: "-30%",
          width: "30%",
          aspectRatio: "1",
          borderRadius: "50%",
          border: `${3 * SCALE}px solid ${colors.primary500}`,
          opacity: 0.5,
        }}
      />
      {/* .deco3: accentPink の斜め帯（右下・角丸なし） */}
      <div
        style={{
          position: "absolute",
          right: "-9%",
          bottom: "-4%",
          width: "34%",
          height: "13%",
          backgroundColor: colors.accentPink,
          rotate: "-35deg",
        }}
      />

      {/* .series（最上部） */}
      <span
        style={{
          position: "relative",
          fontSize: videoType.titleSeries,
          fontWeight: 700,
          color: colors.primary300,
          letterSpacing: "0.14em",
          opacity: fadeIn(0),
          translate: `0px ${rise(0)}px`,
        }}
      >
        {series}
      </span>

      {/* h3（上下autoマージンで中央） */}
      <h3
        style={{
          position: "relative",
          margin: "auto 0",
          fontSize: videoType.titleHeadline,
          fontWeight: 800,
          lineHeight: 1.45,
          maxWidth: "86%",
          whiteSpace: "pre-line",
          opacity: fadeIn(0.25),
          translate: `0px ${rise(0.25)}px`,
        }}
      >
        {title}
      </h3>

      {/* .kws: ゴーストチップ（primary300系・目立たせない） */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          gap: 6 * SCALE,
          marginBottom: 10 * SCALE,
          opacity: fadeIn(0.6),
        }}
      >
        {keywords.slice(0, 3).map((kw) => (
          <span
            key={kw}
            style={{
              fontSize: videoType.titleKeyword,
              fontWeight: 700,
              color: colors.primary300,
              backgroundColor: "rgba(59, 130, 246, 0.14)",
              border: `${1 * SCALE}px solid rgba(147, 197, 253, 0.28)`,
              borderRadius: 999,
              padding: `${2 * SCALE}px ${10 * SCALE}px`,
              opacity: 0.9,
            }}
          >
            {kw}
          </span>
        ))}
      </div>

      {/* .foot-line（最下部・左） */}
      <span
        style={{
          position: "relative",
          display: "block",
          width: 26 * SCALE,
          height: 4 * SCALE,
          borderRadius: 2 * SCALE,
          backgroundColor: colors.primary500,
          opacity: fadeIn(0.6),
        }}
      />
    </AbsoluteFill>
  );
};
