import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'app_config.freezed.dart';

/// ホーム画面下部のタブ。タブのロジック（画面・アイコン・ラベル）は engine が
/// 保持し、どのタブをどの順で採用するかは app 側が [AppConfig.tabs] で指定する。
enum EngineTab { home, lesson, exercise, anki, settings }

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
  }) = _AppConfig;
}
