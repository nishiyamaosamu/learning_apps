import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import { easeOut, useAppear, usePop } from "../parts/animate";

export type TermSlideProps = {
  chip?: string;
  icon: React.ReactNode;
  term: string;
  sub: string;
  telop: string;
};

/**
 * 本編スライド⑦ 用語ドン — DESIGN.html .term-wrap
 * 見出しタブは置かず中央寄せ。チップ → アイコン → 用語（トラッキングを広げながら着地）→ 補足。
 */
export const TermSlide: React.FC<TermSlideProps> = ({
  chip = "今日のキーワード",
  icon,
  term,
  sub,
  telop,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chipAppear = useAppear(0.1, { dy: -14 });
  const iconPop = usePop(0.4, { from: 0.4 });
  const subAppear = useAppear(1.25, { dy: 10 });

  const termRange = [0.7 * fps, 1.2 * fps];
  const termOpacity = interpolate(frame, termRange, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const termTracking = interpolate(frame, termRange, [0.22, 0.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <SlideShell telop={telop}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 7 * SCALE,
          textAlign: "center",
          minHeight: 0,
        }}
      >
        <span
          style={{
            fontSize: 10 * SCALE,
            fontWeight: 800,
            color: colors.primary800,
            backgroundColor: colors.primary100,
            borderRadius: 999,
            padding: `${2 * SCALE}px ${14 * SCALE}px`,
            ...chipAppear,
          }}
        >
          {chip}
        </span>
        <span
          style={{
            width: 46 * SCALE,
            height: 46 * SCALE,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.primary50,
            color: colors.primary600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...iconPop,
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontSize: 42 * SCALE,
            fontWeight: 800,
            letterSpacing: `${termTracking}em`,
            lineHeight: 1.1,
            opacity: termOpacity,
          }}
        >
          {term}
        </span>
        <span
          style={{
            fontSize: 12 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            ...subAppear,
          }}
        >
          {sub}
        </span>
      </div>
    </SlideShell>
  );
};
