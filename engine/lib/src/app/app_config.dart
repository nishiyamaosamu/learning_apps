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
    this.surface,
    this.surfaceContainerLow,
    this.surfaceContainerHighest,
    this.onPrimary,
    this.onSecondary,
    this.onTertiary,
    this.onAccent,
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
  final Color? surface;
  final Color? surfaceContainerLow;
  final Color? surfaceContainerHighest;
  final Color? onPrimary;
  final Color? onSecondary;
  final Color? onTertiary;
  final Color? onAccent;
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

  AppAccentColors? toAccentColors() => accent == null
      ? null
      : AppAccentColors(
          accent: accent!,
          onAccent: onAccent ?? _foregroundFor(accent!),
        );

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
          surface == other.surface &&
          surfaceContainerLow == other.surfaceContainerLow &&
          surfaceContainerHighest == other.surfaceContainerHighest &&
          onPrimary == other.onPrimary &&
          onSecondary == other.onSecondary &&
          onTertiary == other.onTertiary &&
          onAccent == other.onAccent &&
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
    surface,
    surfaceContainerLow,
    surfaceContainerHighest,
    onPrimary,
    onSecondary,
    onTertiary,
    onAccent,
    onSurface,
    onSurfaceVariant,
    outline,
    outlineVariant,
  ]);
}

@immutable
class AppAccentColors extends ThemeExtension<AppAccentColors> {
  const AppAccentColors({required this.accent, required this.onAccent});

  final Color accent;
  final Color onAccent;

  @override
  AppAccentColors copyWith({Color? accent, Color? onAccent}) => AppAccentColors(
    accent: accent ?? this.accent,
    onAccent: onAccent ?? this.onAccent,
  );

  @override
  AppAccentColors lerp(ThemeExtension<AppAccentColors>? other, double t) {
    if (other is! AppAccentColors) {
      return this;
    }

    return AppAccentColors(
      accent: Color.lerp(accent, other.accent, t)!,
      onAccent: Color.lerp(onAccent, other.onAccent, t)!,
    );
  }
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
