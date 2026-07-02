import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'app_config.freezed.dart';

/// 下部に表示するタブ。タブのロジック（画面・アイコン・ラベル）は engine が
/// 保持し、どのタブをどの順で採用するかは app 側が [AppConfig.tabs] で指定する。
/// 先頭のタブが初期表示（メイン）になる。
enum EngineTab { lesson, exercise, anki, settings }

/// アプリごとのデザイン色。
///
/// [tertiary] は Material の `ColorScheme.tertiary` に対応する第3色。
/// [accent] は赤〜ピンクなど、局所的な強調に使うアプリ独自のポイント色。
@immutable
class AppDesignScheme {
  const AppDesignScheme({
    required this.primary,
    this.secondary,
    this.tertiary,
    this.accent,
    this.error,
    this.success,
    this.surface,
    this.surfaceContainerLow,
    this.surfaceContainerHighest,
    this.onPrimary,
    this.onSecondary,
    this.onTertiary,
    this.onAccent,
    this.onSuccess,
    this.onSurface,
    this.onSurfaceVariant,
    this.outline,
    this.outlineVariant,
  });

  final Color primary;
  final Color? secondary;
  final Color? tertiary;
  final Color? accent;
  final Color? error;

  /// 正解・完了などの肯定的な状態を示す色。Material の `ColorScheme` には
  /// 該当する役割がないため [AppSemanticColors] 拡張で配布する。
  final Color? success;
  final Color? surface;
  final Color? surfaceContainerLow;
  final Color? surfaceContainerHighest;
  final Color? onPrimary;
  final Color? onSecondary;
  final Color? onTertiary;
  final Color? onAccent;
  final Color? onSuccess;
  final Color? onSurface;
  final Color? onSurfaceVariant;
  final Color? outline;
  final Color? outlineVariant;

  ColorScheme toColorScheme({Brightness brightness = Brightness.light}) {
    final base = ColorScheme.fromSeed(
      seedColor: primary,
      brightness: brightness,
    );

    return base.copyWith(
      primary: primary,
      secondary: secondary ?? base.secondary,
      tertiary: tertiary ?? base.tertiary,
      error: error ?? base.error,
      surface: surface ?? base.surface,
      surfaceContainerLow: surfaceContainerLow ?? base.surfaceContainerLow,
      surfaceContainerHighest:
          surfaceContainerHighest ?? base.surfaceContainerHighest,
      onPrimary: onPrimary ?? _foregroundFor(primary),
      onSecondary:
          onSecondary ??
          (secondary == null ? base.onSecondary : _foregroundFor(secondary!)),
      onTertiary:
          onTertiary ??
          (tertiary == null ? base.onTertiary : _foregroundFor(tertiary!)),
      onSurface: onSurface ?? base.onSurface,
      onSurfaceVariant: onSurfaceVariant ?? base.onSurfaceVariant,
      outline: outline ?? base.outline,
      outlineVariant: outlineVariant ?? base.outlineVariant,
    );
  }

  /// `ColorScheme` に載らないアプリ固有の意味色（success / accent）をまとめた
  /// テーマ拡張を作る。success は常に既定（mialab グリーン）を持つ。
  AppSemanticColors toSemanticColors() {
    final successColor = success ?? AppSemanticColors.fallback.success;
    return AppSemanticColors(
      success: successColor,
      onSuccess: onSuccess ?? _foregroundFor(successColor),
      accent: accent,
      onAccent: accent == null ? null : (onAccent ?? _foregroundFor(accent!)),
    );
  }

  static Color _foregroundFor(Color color) =>
      ThemeData.estimateBrightnessForColor(color) == Brightness.dark
      ? Colors.white
      : Colors.black;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AppDesignScheme &&
          runtimeType == other.runtimeType &&
          primary == other.primary &&
          secondary == other.secondary &&
          tertiary == other.tertiary &&
          accent == other.accent &&
          error == other.error &&
          success == other.success &&
          surface == other.surface &&
          surfaceContainerLow == other.surfaceContainerLow &&
          surfaceContainerHighest == other.surfaceContainerHighest &&
          onPrimary == other.onPrimary &&
          onSecondary == other.onSecondary &&
          onTertiary == other.onTertiary &&
          onAccent == other.onAccent &&
          onSuccess == other.onSuccess &&
          onSurface == other.onSurface &&
          onSurfaceVariant == other.onSurfaceVariant &&
          outline == other.outline &&
          outlineVariant == other.outlineVariant;

  @override
  int get hashCode => Object.hashAll([
    primary,
    secondary,
    tertiary,
    accent,
    error,
    success,
    surface,
    surfaceContainerLow,
    surfaceContainerHighest,
    onPrimary,
    onSecondary,
    onTertiary,
    onAccent,
    onSuccess,
    onSurface,
    onSurfaceVariant,
    outline,
    outlineVariant,
  ]);
}

/// `ColorScheme` に役割が無い、アプリ固有の意味色を運ぶテーマ拡張。
///
/// - [success] / [onSuccess]: 正解・完了などの肯定的な状態（クイズの正解表示や
///   進捗バーの「正解」セグメントなど）。常に値を持つ。
/// - [accent] / [onAccent]: バッジ・連続記録などローカルな強調用のポイント色。
///   採用するアプリだけが指定するため null になり得る。
@immutable
class AppSemanticColors extends ThemeExtension<AppSemanticColors> {
  const AppSemanticColors({
    required this.success,
    required this.onSuccess,
    this.accent,
    this.onAccent,
  });

  final Color success;
  final Color onSuccess;
  final Color? accent;
  final Color? onAccent;

  /// `designScheme` を指定しないアプリ向けの既定値（mialab の success グリーン）。
  static const AppSemanticColors fallback = AppSemanticColors(
    success: Color(0xFF16B364),
    onSuccess: Colors.white,
  );

  @override
  AppSemanticColors copyWith({
    Color? success,
    Color? onSuccess,
    Color? accent,
    Color? onAccent,
  }) => AppSemanticColors(
    success: success ?? this.success,
    onSuccess: onSuccess ?? this.onSuccess,
    accent: accent ?? this.accent,
    onAccent: onAccent ?? this.onAccent,
  );

  @override
  AppSemanticColors lerp(ThemeExtension<AppSemanticColors>? other, double t) {
    if (other is! AppSemanticColors) {
      return this;
    }

    return AppSemanticColors(
      success: Color.lerp(success, other.success, t)!,
      onSuccess: Color.lerp(onSuccess, other.onSuccess, t)!,
      accent: Color.lerp(accent, other.accent, t),
      onAccent: Color.lerp(onAccent, other.onAccent, t),
    );
  }
}

/// `Theme.of(context).semantic.success` のように意味色へ手軽にアクセスするための
/// 拡張。拡張が未登録のテーマでも [AppSemanticColors.fallback] を返すので安全。
extension AppSemanticColorsTheme on ThemeData {
  AppSemanticColors get semantic =>
      extension<AppSemanticColors>() ?? AppSemanticColors.fallback;
}

@freezed
class AppConfig with _$AppConfig {
  const factory AppConfig({
    required String title,
    @Default(Colors.indigo) Color primaryColor,
    AppDesignScheme? designScheme,
    // 下部に表示するタブと並び順。app 側で採用するタブを選ぶ。
    @Default([
      EngineTab.lesson,
      EngineTab.exercise,
      EngineTab.anki,
      EngineTab.settings,
    ])
    List<EngineTab> tabs,
    // コンテンツ（JSON）を格納したアプリ側アセットのベースパス。
    // 例: 'contents' → contents/base.json, contents/lessons/1.json
    @Default('contents') String contentBasePath,
  }) = _AppConfig;
}

extension AppConfigTheme on AppConfig {
  ColorScheme get resolvedColorScheme =>
      designScheme?.toColorScheme() ??
      ColorScheme.fromSeed(seedColor: primaryColor);
}
