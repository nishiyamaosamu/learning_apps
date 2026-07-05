import { AbsoluteFill } from "remotion";
import { colors, fontFamily, videoType, SCALE } from "../design/tokens";
import { useAppear } from "./animate";

export type SlideShellProps = {
  /** 省略すると見出しなし（用語ドンなど） */
  heading?: string;
  /**
   * 見出し先頭のアクセントは「アイコン」か「ブルータブ」のどちらか一方（DESIGN.html ルール）
   * icon を渡せばアイコン型、渡さなければタブ型（.head i）
   */
  icon?: React.ReactNode;
  telop: string;
  children: React.ReactNode;
};

/**
 * 本編スライドの共通シェル — DESIGN.html .v-slide + .v-telop の移植
 * 下部にテロップ帯（角丸の浮きカード）を常設し、本文（children）はその上の領域に収める。
 * children 側は `flex: 1; marginTop: "2%"; minHeight: 0` の本文レイアウトを自分で持つ。
 */
export const SlideShell: React.FC<SlideShellProps> = ({ heading, icon, telop, children }) => {
  const headAppear = useAppear(0);
  const telopAppear = useAppear(0.15, { dy: 12 });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        color: colors.textPrimary,
        fontFamily,
        padding: "4.5% 6% 4%", // .v-slide（%はモックと同一）
        display: "flex",
        flexDirection: "column",
      }}
    >
      {heading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE, ...headAppear }}>
          {icon ? (
            <span style={{ color: colors.primary600, flex: "none", display: "flex" }}>{icon}</span>
          ) : (
            // .head i — ブルータブ
            <span
              style={{
                display: "block",
                width: 6 * SCALE,
                height: "1.4em",
                borderRadius: 3 * SCALE,
                backgroundColor: colors.primary600,
                flex: "none",
                fontSize: videoType.slideHead,
              }}
            />
          )}
          <b style={{ fontSize: videoType.slideHead, fontWeight: 800 }}>{heading}</b>
        </div>
      ) : null}

      {children}

      {/* .v-telop: 角丸の浮きカード */}
      <div
        style={{
          flex: "none",
          marginTop: "2%",
          backgroundColor: colors.surface,
          border: `${1 * SCALE}px solid ${colors.border}`,
          borderRadius: 10 * SCALE,
          padding: `${5 * SCALE}px ${16 * SCALE}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: videoType.telop,
          fontWeight: 700,
          boxShadow: `0 ${3 * SCALE}px ${10 * SCALE}px rgba(30, 41, 59, 0.08)`,
          ...telopAppear,
        }}
      >
        {telop}
      </div>
    </AbsoluteFill>
  );
};
