import { AbsoluteFill } from "remotion";
import { colors, fontFamily, videoType, SCALE } from "../design/tokens";
import type { NarrationSegment } from "../videos/types";
import { useAppear } from "./animate";
import { NarrationTelopText } from "./narration";

export type SlideShellProps = {
  /** 省略すると見出しなし（用語ドンなど） */
  heading?: string;
  /**
   * 見出し先頭のアクセントは「アイコン」か「ブルータブ」のどちらか一方（DESIGN.html ルール）
   * icon を渡せばアイコン型、渡さなければタブ型（.head i）
   */
  icon?: React.ReactNode;
  /** ナレーションなしページの固定テロップ。narration とどちらか一方を必ず渡す */
  telop?: string;
  /**
   * ナレーション字幕。音声に同期してテロップ帯の文が切り替わる。
   * spec.narration と同じ配列を渡すこと（音声自体は renderScene が spec 側から鳴らす）
   */
  narration?: NarrationSegment[];
  children: React.ReactNode;
};

/**
 * 本編スライドの共通シェル — DESIGN.html .v-slide + .v-telop の移植
 * 下部にテロップ帯（角丸の浮きカード）を常設し、本文（children）はその上の領域に収める。
 * children 側は `flex: 1; marginTop: "2%"; minHeight: 0` の本文レイアウトを自分で持つ。
 */
export const SlideShell: React.FC<SlideShellProps> = ({
  heading,
  icon,
  telop,
  narration,
  children,
}) => {
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

      {/* .v-telop: 角丸の浮きカード。
          高さは2行分で固定 — 字幕が1行/2行と変わっても本文領域の高さが揺れないようにする */}
      <div
        style={{
          flex: "none",
          marginTop: "2%",
          height: 44 * SCALE,
          backgroundColor: colors.surface,
          border: `${1 * SCALE}px solid ${colors.border}`,
          borderRadius: 10 * SCALE,
          padding: `0 ${16 * SCALE}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: videoType.telop,
          lineHeight: 1.35,
          fontWeight: 700,
          boxShadow: `0 ${3 * SCALE}px ${10 * SCALE}px rgba(30, 41, 59, 0.08)`,
          ...telopAppear,
        }}
      >
        {narration?.length ? <NarrationTelopText segments={narration} /> : telop}
      </div>
    </AbsoluteFill>
  );
};
