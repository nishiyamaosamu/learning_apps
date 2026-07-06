/**
 * 集中ブルー デザイントークン（docs/DESIGN.html と 1:1 対応）
 * 原本は Flutter の AppColors / AppTypography。ここは動画用の写し。
 * 色をハードコードせず、必ずこのファイルから引くこと。
 */

export const colors = {
  // Primary（集中ブルー）
  primary50: "#EFF6FF",
  primary100: "#DBEAFE",
  primary300: "#93C5FD",
  primary500: "#3B82F6",
  primary600: "#2563EB",
  primary800: "#1E40AF",

  // Semantic（正誤・要復習）— 全アプリ共通で固定
  correct: "#0D9488",
  correctSurface: "#F0FDFA",
  correctBorder: "#CCFBF1",
  correctText: "#115E59",
  incorrect: "#D66A6A",
  incorrectSurface: "#FDF2F2",
  incorrectBorder: "#FADADA",
  incorrectText: "#9B3A3A",
  review: "#F59E0B",
  reviewSurface: "#FFFBEB",
  reviewBorder: "#FDE68A",
  reviewText: "#B45309",

  // Neutral
  bg: "#F7F9FC",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  textMuted: "#94A3B8",
  textSecondary: "#64748B",
  textPrimary: "#1E293B",

  // Dark
  bgDark: "#0F172A",
  surfaceDark: "#1E293B",
  borderDark: "#334155",
  primaryDark: "#60A5FA",
  textPrimaryDark: "#F1F5F9",
  textSecondaryDark: "#94A3B8",

  // Accent（装飾専用 — 状態表示には使わない）
  accentPink: "#F98BA4",
  accentPinkSoft: "#FBD0DB",
  accentPinkText: "#C2406A",
  accentPinkSurface: "#FDECF2",
  aiViolet: "#7C3AED",
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Noto Sans JP", sans-serif';

export const fontMono = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace';

/**
 * DESIGN.html の動画モックは 480px 幅（16:9）。本番は 1920×1080 なので、
 * モックCSSの px 値は一律 ×4 して使う（SCALE）。%指定はそのまま使える。
 */
export const SCALE = 4;

/** 動画（1920×1080）の文字サイズ。DESIGN.html のモック px × SCALE */
export const videoType = {
  titleSeries: 13 * SCALE, // .v-title .series
  titleHeadline: 26 * SCALE, // .v-title h3
  titleKeyword: 9.5 * SCALE, // .v-title .kw
  slideHead: 19 * SCALE, // .v-slide .head b
  slideHeadIcon: 20 * SCALE, // .v-slide .head .ms
  body: 14.5 * SCALE, // .v-slide li
  bodySub: 11 * SCALE, // .v-slide li small
  telop: 12.5 * SCALE, // .v-telop
} as const;

/**
 * 蛍光ペン風マーカー（.marker / .marker-pink）
 * 文字の下 38% だけを塗る。全面塗りにしないこと。
 */
export const markerStyle = {
  backgroundImage: `linear-gradient(transparent 62%, ${colors.primary100} 62%)`,
} as const;

export const markerPinkStyle = {
  backgroundImage: `linear-gradient(transparent 62%, ${colors.accentPinkSoft} 62%)`,
} as const;

/** イージング（DESIGN.html --ease-out 相当） */
export const easeOutBezier = [0.2, 0.8, 0.4, 1] as const;
