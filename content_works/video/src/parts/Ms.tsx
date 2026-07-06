import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/**
 * Material Symbols（Rounded・FILL 1・wght 500）— DESIGN.html .ms の移植
 * DESIGN.html / Flutter と同じアイコン体系。name にはリガチャ名をそのまま渡す
 * （例: gpp_maybe, encrypted, stacks, thumb_up, calculate, dns）。
 * フォントは public/fonts/ のローカル woff2（material-symbols パッケージ由来）。
 */

const FONT_FAMILY = "Material Symbols Rounded";

loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/material-symbols-rounded.woff2"),
});

export const Ms: React.FC<{ name: string; size?: number }> = ({ name, size = 48 }) => (
  <span
    aria-hidden
    style={{
      fontFamily: FONT_FAMILY,
      fontSize: size,
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: 1,
      letterSpacing: "normal",
      textTransform: "none",
      whiteSpace: "nowrap",
      display: "inline-block",
      direction: "ltr",
      userSelect: "none",
      fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24",
      flex: "none",
    }}
  >
    {name}
  </span>
);
