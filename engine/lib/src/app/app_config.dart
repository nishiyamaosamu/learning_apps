import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import '../design/app_primary.dart';

part 'app_config.freezed.dart';

/// 下部に表示するタブ。タブのロジック（画面・アイコン・ラベル）は engine が
/// 保持し、どのタブをどの順で採用するかは app 側が [AppConfig.tabs] で指定する。
/// 先頭のタブが初期表示（メイン）になる。
enum EngineTab { video, exercise, anki, settings }

/// `ColorScheme` に役割が無い、アプリ固有の意味色を運ぶテーマ拡張。
///
/// **旧コード互換用のレガシーシム**。新規コードでは `context.colors`（[AppColors]）を
/// 使うこと。未改修の画面が `Theme.of(context).semantic.success` を読み続けられる
/// よう、[buildEngineTheme] が `success = correct` / `accent = accentPink` を注入する。
///
/// - [success] / [onSuccess]: 正解・完了などの肯定的な状態。常に値を持つ。
/// - [accent] / [onAccent]: バッジ・連続記録などローカルな強調用のポイント色。
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

  /// 拡張が未登録のテーマ向けフォールバック（集中ブルーの correct グリーン）。
  static const AppSemanticColors fallback = AppSemanticColors(
    success: Color(0xFF0D9488),
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

/// `Theme.of(context).semantic.success` のように意味色へアクセスするための拡張。
///
/// **旧コード互換用のレガシーシム**（新規コードは `context.colors` を使う）。拡張が
/// 未登録のテーマでも [AppSemanticColors.fallback] を返すので安全。
extension AppSemanticColorsTheme on ThemeData {
  AppSemanticColors get semantic =>
      extension<AppSemanticColors>() ?? AppSemanticColors.fallback;
}

@freezed
class AppConfig with _$AppConfig {
  const factory AppConfig({
    required String title,
    // ブランドの主色ランプ。null なら既定の集中ブルー（[AppPrimarySwatch.focusBlue]）。
    // DESIGN.html RULE 3 に従い、アプリが差し替えられるのは主色スワッチだけ。
    AppPrimarySwatch? brandPrimary,
    // 下部に表示するタブと並び順。app 側で採用するタブを選ぶ。
    @Default([
      EngineTab.video,
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
