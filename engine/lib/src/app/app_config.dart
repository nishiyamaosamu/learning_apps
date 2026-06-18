import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'app_config.freezed.dart';

/// ホーム画面下部のタブ。タブのロジック（画面・アイコン・ラベル）は engine が
/// 保持し、どのタブをどの順で採用するかは app 側が [AppConfig.tabs] で指定する。
enum EngineTab { home, lesson, exercise, anki, settings }

/// レッスンの図解アニメーションを描画するビルダー。
///
/// engine は汎用パッケージのためアニメ実体を持たない。app 側が
/// [AppConfig.animations] にキー↔ビルダーを登録し、レッスンJSONの
/// `animationKey` で参照する（→ docs/LESSON.md のアニメモード）。
///
/// [step] は「シーン内で現在表示中の最新ステップの `animationStep`」。
/// ビルダーが返すウィジェットは、この [step] を受け取って phase 0→1→2… の
/// 到達状態を表し、増減時に内部の `AnimationController` で滑らかに遷移する
/// 想定（タップ進行＝アニメ進行を1イベントで同期させる）。
typedef LessonAnimationBuilder = Widget Function(
  BuildContext context,
  int step,
);

@freezed
class AppConfig with _$AppConfig {
  const factory AppConfig({
    required String title,
    @Default(Colors.indigo) Color primaryColor,
    // ホーム下部に表示するタブと並び順。app 側で採用するタブを選ぶ。
    @Default([
      EngineTab.home,
      EngineTab.lesson,
      EngineTab.exercise,
      EngineTab.anki,
      EngineTab.settings,
    ])
    List<EngineTab> tabs,
    // コンテンツ（JSON）を格納したアプリ側アセットのベースパス。
    // 例: 'contents' → contents/base.json, contents/lessons/1.json
    @Default('contents') String contentBasePath,
    // レッスン図解アニメのレジストリ（キー↔ビルダー）。レッスンJSONの
    // `animationKey` を解決する。未登録キーは静かに無視され、画像/テキスト
    // 表示にフォールバックする。
    @Default(<String, LessonAnimationBuilder>{})
    Map<String, LessonAnimationBuilder> animations,
  }) = _AppConfig;
}
