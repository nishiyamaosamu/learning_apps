import 'package:flutter/material.dart';

import '../app/app_config.dart' show AppSemanticColors;
import 'app_colors.dart';
import 'app_dimens.dart';
import 'app_typography.dart';

/// [AppColors]（真実）から engine の [ThemeData] を組み立てる。
///
/// 設計方針: **[AppColors]（ThemeExtension）が唯一の真実であり、[ColorScheme] は
/// その互換投影**。`ColorScheme.fromSeed` は使わず、役割ごとにトークンを手で写す。
/// 画面は原則 `context.colors` を読むが、Material 標準コンポーネントや未改修画面が
/// 参照する `colorScheme` / `theme.semantic` も破綻しないよう整合させる。
ThemeData buildEngineTheme(AppColors c) {
  // ボタン共通のテキストスタイル（15dp / w700）。行間はボタン内で不要なので付けない。
  const buttonTextStyle = TextStyle(fontSize: 15, fontWeight: FontWeight.w700);

  final colorScheme = ColorScheme(
    brightness: Brightness.light,
    primary: c.primary600,
    onPrimary: Colors.white,
    primaryContainer: c.primary100,
    onPrimaryContainer: c.primary800,
    secondary: c.primary500,
    onSecondary: Colors.white,
    secondaryContainer: c.primary50,
    onSecondaryContainer: c.primary800,
    tertiary: c.accentPink,
    onTertiary: Colors.white,
    tertiaryContainer: c.accentPinkSurface,
    onTertiaryContainer: c.accentPinkText,
    error: c.incorrect,
    onError: Colors.white,
    errorContainer: c.incorrectSurface,
    onErrorContainer: c.incorrectText,
    surface: c.surface,
    onSurface: c.textPrimary,
    onSurfaceVariant: c.textSecondary,
    surfaceContainerLow: c.bg,
    surfaceContainer: const Color(0xFFF1F5F9),
    surfaceContainerHighest: const Color(0xFFF1F5F9),
    outline: c.textMuted,
    outlineVariant: c.border,
  );

  final textTheme = AppTypography.buildTextTheme(c);

  RoundedRectangleBorder roundedMd() => RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(AppRadius.md),
  );

  return ThemeData(
    useMaterial3: true,
    colorScheme: colorScheme,
    scaffoldBackgroundColor: c.bg,
    textTheme: textTheme,
    appBarTheme: AppBarTheme(
      backgroundColor: c.surface,
      surfaceTintColor: Colors.transparent,
      foregroundColor: c.textPrimary,
      elevation: 0,
      scrolledUnderElevation: 0,
      centerTitle: false,
      titleTextStyle: AppTypography.section.copyWith(color: c.textPrimary),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size(0, AppLayout.minTap),
        textStyle: buttonTextStyle,
        shape: roundedMd(),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        minimumSize: const Size(0, AppLayout.minTap),
        textStyle: buttonTextStyle,
        foregroundColor: c.primary600,
        side: BorderSide(color: c.primary300),
        shape: roundedMd(),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        minimumSize: const Size(0, AppLayout.minTap),
        textStyle: buttonTextStyle,
        foregroundColor: c.primary600,
        shape: roundedMd(),
      ),
    ),
    cardTheme: CardThemeData(
      elevation: 0,
      color: c.surface,
      surfaceTintColor: Colors.transparent,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.lg),
        side: BorderSide(color: c.border),
      ),
    ),
    dividerTheme: DividerThemeData(color: c.border, thickness: 1),
    switchTheme: SwitchThemeData(
      trackColor: WidgetStateProperty.resolveWith(
        (states) =>
            states.contains(WidgetState.selected) ? c.primary600 : null,
      ),
    ),
    progressIndicatorTheme: ProgressIndicatorThemeData(
      color: c.primary600,
      linearTrackColor: c.primary100,
    ),
    snackBarTheme: SnackBarThemeData(
      behavior: SnackBarBehavior.floating,
      backgroundColor: c.textPrimary,
      contentTextStyle: AppTypography.body.copyWith(color: Colors.white),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.md),
      ),
    ),
    extensions: <ThemeExtension<dynamic>>[
      c,
      // 旧コード互換のシム。新規コードは context.colors を使う。
      AppSemanticColors(
        success: c.correct,
        onSuccess: Colors.white,
        accent: c.accentPink,
        onAccent: Colors.white,
      ),
    ],
  );
}
