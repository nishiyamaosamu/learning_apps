import 'package:flutter/material.dart';

import 'app_primary.dart';

/// アプリ全体の色トークンを 1 か所に集約した [ThemeExtension]。
///
/// DESIGN.html「集中ブルー」の `:root` を 1:1 で写したもの。**この拡張が唯一の
/// 真実**であり、`ColorScheme` は互換のための投影に過ぎない（[buildEngineTheme]）。
/// 画面からは `context.colors`（[AppColorsContext]）で参照する。
///
/// 構成:
/// - 主色ランプ [primary50]〜[primary800]（[AppPrimarySwatch] から展開。差し替え可）
/// - semantic 固定色（correct / incorrect / review 各 4 種）
/// - neutral（bg / surface / border / text 3 段）
/// - accent（装飾専用のピンク 4 種 ＋ AI グラデ終端 [aiViolet]）
/// - dark 系トークン一式（動画プレーヤーなど常時ダークな面で使用。将来のダーク
///   テーマの土台も兼ねる）
@immutable
class AppColors extends ThemeExtension<AppColors> {
  const AppColors({
    required this.primary50,
    required this.primary100,
    required this.primary300,
    required this.primary500,
    required this.primary600,
    required this.primary800,
    required this.correct,
    required this.correctSurface,
    required this.correctBorder,
    required this.correctText,
    required this.incorrect,
    required this.incorrectSurface,
    required this.incorrectBorder,
    required this.incorrectText,
    required this.review,
    required this.reviewSurface,
    required this.reviewBorder,
    required this.reviewText,
    required this.bg,
    required this.surface,
    required this.border,
    required this.textMuted,
    required this.textSecondary,
    required this.textPrimary,
    required this.accentPink,
    required this.accentPinkSoft,
    required this.accentPinkText,
    required this.accentPinkSurface,
    required this.aiViolet,
    required this.bgDark,
    required this.surfaceDark,
    required this.borderDark,
    required this.primaryDark,
    required this.primarySurfaceDark,
    required this.correctDark,
    required this.correctSurfaceDark,
    required this.correctTextDark,
    required this.incorrectDark,
    required this.incorrectSurfaceDark,
    required this.incorrectTextDark,
    required this.reviewDark,
    required this.reviewSurfaceDark,
    required this.reviewBorderDark,
    required this.textPrimaryDark,
    required this.textSecondaryDark,
    required this.textMutedDark,
  });

  // --- 主色ランプ（ブランド差し替え可） ---
  final Color primary50;
  final Color primary100;
  final Color primary300;
  final Color primary500;
  final Color primary600;
  final Color primary800;

  // --- semantic: 正解（全アプリ共通・固定） ---
  final Color correct;
  final Color correctSurface;
  final Color correctBorder;
  final Color correctText;

  // --- semantic: 不正解（全アプリ共通・固定） ---
  final Color incorrect;
  final Color incorrectSurface;
  final Color incorrectBorder;
  final Color incorrectText;

  // --- semantic: 要復習（全アプリ共通・固定） ---
  final Color review;
  final Color reviewSurface;
  final Color reviewBorder;
  final Color reviewText;

  // --- neutral（ライト） ---
  final Color bg;
  final Color surface;
  final Color border;
  final Color textMuted;
  final Color textSecondary;
  final Color textPrimary;

  // --- accent（装飾専用。状態表示・正誤への使用は禁止） ---
  final Color accentPink;
  final Color accentPinkSoft;
  final Color accentPinkText;
  final Color accentPinkSurface;

  /// AI グラデーションの終端色（btn-ai 専用）。
  final Color aiViolet;

  // --- dark 系トークン ---
  final Color bgDark;
  final Color surfaceDark;
  final Color borderDark;
  final Color primaryDark;
  final Color primarySurfaceDark;
  final Color correctDark;
  final Color correctSurfaceDark;
  final Color correctTextDark;
  final Color incorrectDark;
  final Color incorrectSurfaceDark;
  final Color incorrectTextDark;
  final Color reviewDark;
  final Color reviewSurfaceDark;
  final Color reviewBorderDark;
  final Color textPrimaryDark;
  final Color textSecondaryDark;
  final Color textMutedDark;

  /// semantic / accent / dark はブランドに依らず固定なので、ここに一括で保持する。
  /// [light] / [dark] の共通部分。
  static const Color _correct = Color(0xFF0D9488);
  static const Color _correctSurface = Color(0xFFF0FDFA);
  static const Color _correctBorder = Color(0xFFCCFBF1);
  static const Color _correctText = Color(0xFF115E59);
  static const Color _incorrect = Color(0xFFD66A6A);
  static const Color _incorrectSurface = Color(0xFFFDF2F2);
  static const Color _incorrectBorder = Color(0xFFFADADA);
  static const Color _incorrectText = Color(0xFF9B3A3A);
  static const Color _review = Color(0xFFF59E0B);
  static const Color _reviewSurface = Color(0xFFFFFBEB);
  static const Color _reviewBorder = Color(0xFFFDE68A);
  static const Color _reviewText = Color(0xFFB45309);

  static const Color _accentPink = Color(0xFFF98BA4);
  static const Color _accentPinkSoft = Color(0xFFFBD0DB);
  static const Color _accentPinkText = Color(0xFFC2406A);
  static const Color _accentPinkSurface = Color(0xFFFDECF2);
  static const Color _aiViolet = Color(0xFF7C3AED);

  static const Color _bgDark = Color(0xFF0F172A);
  static const Color _surfaceDark = Color(0xFF1E293B);
  static const Color _borderDark = Color(0xFF334155);
  static const Color _correctDark = Color(0xFF2DD4BF);
  static const Color _correctSurfaceDark = Color(0xFF0E2A28);
  static const Color _correctTextDark = Color(0xFF5EEAD4);
  static const Color _incorrectDark = Color(0xFFE08787);
  static const Color _incorrectSurfaceDark = Color(0xFF2E1A1A);
  static const Color _incorrectTextDark = Color(0xFFF0A8A8);
  static const Color _reviewDark = Color(0xFFFBBF24);
  static const Color _reviewSurfaceDark = Color.fromRGBO(245, 158, 11, 0.12);
  static const Color _reviewBorderDark = Color.fromRGBO(245, 158, 11, 0.35);
  static const Color _textPrimaryDark = Color(0xFFF1F5F9);
  static const Color _textSecondaryDark = Color(0xFF94A3B8);
  static const Color _textMutedDark = Color(0xFF64748B);

  /// ライトモードのトークン一式。[primary] で主色ランプだけ差し替えられる。
  factory AppColors.light({
    AppPrimarySwatch primary = AppPrimarySwatch.focusBlue,
  }) {
    return AppColors(
      primary50: primary.p50,
      primary100: primary.p100,
      primary300: primary.p300,
      primary500: primary.p500,
      primary600: primary.p600,
      primary800: primary.p800,
      correct: _correct,
      correctSurface: _correctSurface,
      correctBorder: _correctBorder,
      correctText: _correctText,
      incorrect: _incorrect,
      incorrectSurface: _incorrectSurface,
      incorrectBorder: _incorrectBorder,
      incorrectText: _incorrectText,
      review: _review,
      reviewSurface: _reviewSurface,
      reviewBorder: _reviewBorder,
      reviewText: _reviewText,
      bg: const Color(0xFFF7F9FC),
      surface: const Color(0xFFFFFFFF),
      border: const Color(0xFFE2E8F0),
      textMuted: const Color(0xFF94A3B8),
      textSecondary: const Color(0xFF64748B),
      textPrimary: const Color(0xFF1E293B),
      accentPink: _accentPink,
      accentPinkSoft: _accentPinkSoft,
      accentPinkText: _accentPinkText,
      accentPinkSurface: _accentPinkSurface,
      aiViolet: _aiViolet,
      bgDark: _bgDark,
      surfaceDark: _surfaceDark,
      borderDark: _borderDark,
      primaryDark: primary.primaryDark,
      primarySurfaceDark: primary.primarySurfaceDark,
      correctDark: _correctDark,
      correctSurfaceDark: _correctSurfaceDark,
      correctTextDark: _correctTextDark,
      incorrectDark: _incorrectDark,
      incorrectSurfaceDark: _incorrectSurfaceDark,
      incorrectTextDark: _incorrectTextDark,
      reviewDark: _reviewDark,
      reviewSurfaceDark: _reviewSurfaceDark,
      reviewBorderDark: _reviewBorderDark,
      textPrimaryDark: _textPrimaryDark,
      textSecondaryDark: _textSecondaryDark,
      textMutedDark: _textMutedDark,
    );
  }

  /// ダークモードのトークン一式。**現状は定義のみで未配線**（Phase 1 はライト先行）。
  ///
  /// neutral / semantic の「役割」フィールドにダーク相当値を割り当てる。dark 系
  /// フィールド（*Dark）は常に固定のダーク定数を保持する。主色ランプと accent は
  /// ダーク変種が無いため据え置き。
  factory AppColors.dark({
    AppPrimarySwatch primary = AppPrimarySwatch.focusBlue,
  }) {
    return AppColors(
      primary50: primary.p50,
      primary100: primary.p100,
      primary300: primary.p300,
      primary500: primary.p500,
      primary600: primary.p600,
      primary800: primary.p800,
      correct: _correctDark,
      correctSurface: _correctSurfaceDark,
      correctBorder: _correctDark,
      correctText: _correctTextDark,
      incorrect: _incorrectDark,
      incorrectSurface: _incorrectSurfaceDark,
      incorrectBorder: _incorrectDark,
      incorrectText: _incorrectTextDark,
      review: _reviewDark,
      reviewSurface: _reviewSurfaceDark,
      reviewBorder: _reviewBorderDark,
      reviewText: _reviewDark,
      bg: _bgDark,
      surface: _surfaceDark,
      border: _borderDark,
      textMuted: _textMutedDark,
      textSecondary: _textSecondaryDark,
      textPrimary: _textPrimaryDark,
      accentPink: _accentPink,
      accentPinkSoft: _accentPinkSoft,
      accentPinkText: _accentPinkText,
      accentPinkSurface: _accentPinkSurface,
      aiViolet: _aiViolet,
      bgDark: _bgDark,
      surfaceDark: _surfaceDark,
      borderDark: _borderDark,
      primaryDark: primary.primaryDark,
      primarySurfaceDark: primary.primarySurfaceDark,
      correctDark: _correctDark,
      correctSurfaceDark: _correctSurfaceDark,
      correctTextDark: _correctTextDark,
      incorrectDark: _incorrectDark,
      incorrectSurfaceDark: _incorrectSurfaceDark,
      incorrectTextDark: _incorrectTextDark,
      reviewDark: _reviewDark,
      reviewSurfaceDark: _reviewSurfaceDark,
      reviewBorderDark: _reviewBorderDark,
      textPrimaryDark: _textPrimaryDark,
      textSecondaryDark: _textSecondaryDark,
      textMutedDark: _textMutedDark,
    );
  }

  @override
  AppColors copyWith({
    Color? primary50,
    Color? primary100,
    Color? primary300,
    Color? primary500,
    Color? primary600,
    Color? primary800,
    Color? correct,
    Color? correctSurface,
    Color? correctBorder,
    Color? correctText,
    Color? incorrect,
    Color? incorrectSurface,
    Color? incorrectBorder,
    Color? incorrectText,
    Color? review,
    Color? reviewSurface,
    Color? reviewBorder,
    Color? reviewText,
    Color? bg,
    Color? surface,
    Color? border,
    Color? textMuted,
    Color? textSecondary,
    Color? textPrimary,
    Color? accentPink,
    Color? accentPinkSoft,
    Color? accentPinkText,
    Color? accentPinkSurface,
    Color? aiViolet,
    Color? bgDark,
    Color? surfaceDark,
    Color? borderDark,
    Color? primaryDark,
    Color? primarySurfaceDark,
    Color? correctDark,
    Color? correctSurfaceDark,
    Color? correctTextDark,
    Color? incorrectDark,
    Color? incorrectSurfaceDark,
    Color? incorrectTextDark,
    Color? reviewDark,
    Color? reviewSurfaceDark,
    Color? reviewBorderDark,
    Color? textPrimaryDark,
    Color? textSecondaryDark,
    Color? textMutedDark,
  }) {
    return AppColors(
      primary50: primary50 ?? this.primary50,
      primary100: primary100 ?? this.primary100,
      primary300: primary300 ?? this.primary300,
      primary500: primary500 ?? this.primary500,
      primary600: primary600 ?? this.primary600,
      primary800: primary800 ?? this.primary800,
      correct: correct ?? this.correct,
      correctSurface: correctSurface ?? this.correctSurface,
      correctBorder: correctBorder ?? this.correctBorder,
      correctText: correctText ?? this.correctText,
      incorrect: incorrect ?? this.incorrect,
      incorrectSurface: incorrectSurface ?? this.incorrectSurface,
      incorrectBorder: incorrectBorder ?? this.incorrectBorder,
      incorrectText: incorrectText ?? this.incorrectText,
      review: review ?? this.review,
      reviewSurface: reviewSurface ?? this.reviewSurface,
      reviewBorder: reviewBorder ?? this.reviewBorder,
      reviewText: reviewText ?? this.reviewText,
      bg: bg ?? this.bg,
      surface: surface ?? this.surface,
      border: border ?? this.border,
      textMuted: textMuted ?? this.textMuted,
      textSecondary: textSecondary ?? this.textSecondary,
      textPrimary: textPrimary ?? this.textPrimary,
      accentPink: accentPink ?? this.accentPink,
      accentPinkSoft: accentPinkSoft ?? this.accentPinkSoft,
      accentPinkText: accentPinkText ?? this.accentPinkText,
      accentPinkSurface: accentPinkSurface ?? this.accentPinkSurface,
      aiViolet: aiViolet ?? this.aiViolet,
      bgDark: bgDark ?? this.bgDark,
      surfaceDark: surfaceDark ?? this.surfaceDark,
      borderDark: borderDark ?? this.borderDark,
      primaryDark: primaryDark ?? this.primaryDark,
      primarySurfaceDark: primarySurfaceDark ?? this.primarySurfaceDark,
      correctDark: correctDark ?? this.correctDark,
      correctSurfaceDark: correctSurfaceDark ?? this.correctSurfaceDark,
      correctTextDark: correctTextDark ?? this.correctTextDark,
      incorrectDark: incorrectDark ?? this.incorrectDark,
      incorrectSurfaceDark: incorrectSurfaceDark ?? this.incorrectSurfaceDark,
      incorrectTextDark: incorrectTextDark ?? this.incorrectTextDark,
      reviewDark: reviewDark ?? this.reviewDark,
      reviewSurfaceDark: reviewSurfaceDark ?? this.reviewSurfaceDark,
      reviewBorderDark: reviewBorderDark ?? this.reviewBorderDark,
      textPrimaryDark: textPrimaryDark ?? this.textPrimaryDark,
      textSecondaryDark: textSecondaryDark ?? this.textSecondaryDark,
      textMutedDark: textMutedDark ?? this.textMutedDark,
    );
  }

  @override
  AppColors lerp(ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) {
      return this;
    }
    Color l(Color a, Color b) => Color.lerp(a, b, t)!;
    return AppColors(
      primary50: l(primary50, other.primary50),
      primary100: l(primary100, other.primary100),
      primary300: l(primary300, other.primary300),
      primary500: l(primary500, other.primary500),
      primary600: l(primary600, other.primary600),
      primary800: l(primary800, other.primary800),
      correct: l(correct, other.correct),
      correctSurface: l(correctSurface, other.correctSurface),
      correctBorder: l(correctBorder, other.correctBorder),
      correctText: l(correctText, other.correctText),
      incorrect: l(incorrect, other.incorrect),
      incorrectSurface: l(incorrectSurface, other.incorrectSurface),
      incorrectBorder: l(incorrectBorder, other.incorrectBorder),
      incorrectText: l(incorrectText, other.incorrectText),
      review: l(review, other.review),
      reviewSurface: l(reviewSurface, other.reviewSurface),
      reviewBorder: l(reviewBorder, other.reviewBorder),
      reviewText: l(reviewText, other.reviewText),
      bg: l(bg, other.bg),
      surface: l(surface, other.surface),
      border: l(border, other.border),
      textMuted: l(textMuted, other.textMuted),
      textSecondary: l(textSecondary, other.textSecondary),
      textPrimary: l(textPrimary, other.textPrimary),
      accentPink: l(accentPink, other.accentPink),
      accentPinkSoft: l(accentPinkSoft, other.accentPinkSoft),
      accentPinkText: l(accentPinkText, other.accentPinkText),
      accentPinkSurface: l(accentPinkSurface, other.accentPinkSurface),
      aiViolet: l(aiViolet, other.aiViolet),
      bgDark: l(bgDark, other.bgDark),
      surfaceDark: l(surfaceDark, other.surfaceDark),
      borderDark: l(borderDark, other.borderDark),
      primaryDark: l(primaryDark, other.primaryDark),
      primarySurfaceDark: l(primarySurfaceDark, other.primarySurfaceDark),
      correctDark: l(correctDark, other.correctDark),
      correctSurfaceDark: l(correctSurfaceDark, other.correctSurfaceDark),
      correctTextDark: l(correctTextDark, other.correctTextDark),
      incorrectDark: l(incorrectDark, other.incorrectDark),
      incorrectSurfaceDark: l(incorrectSurfaceDark, other.incorrectSurfaceDark),
      incorrectTextDark: l(incorrectTextDark, other.incorrectTextDark),
      reviewDark: l(reviewDark, other.reviewDark),
      reviewSurfaceDark: l(reviewSurfaceDark, other.reviewSurfaceDark),
      reviewBorderDark: l(reviewBorderDark, other.reviewBorderDark),
      textPrimaryDark: l(textPrimaryDark, other.textPrimaryDark),
      textSecondaryDark: l(textSecondaryDark, other.textSecondaryDark),
      textMutedDark: l(textMutedDark, other.textMutedDark),
    );
  }
}

/// `context.colors.primary600` のように色トークンへ手軽にアクセスするための拡張。
///
/// [AppColors] は [buildEngineTheme] が必ずテーマに載せるため、非 null で取得できる。
extension AppColorsContext on BuildContext {
  AppColors get colors => Theme.of(this).extension<AppColors>()!;
}
