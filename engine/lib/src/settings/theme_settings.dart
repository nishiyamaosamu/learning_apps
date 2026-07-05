import 'package:flutter/material.dart' show ThemeMode;
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'theme_settings.g.dart';

/// アプリの配色モード（システム追従／ライト／ダーク）。設定として永続化し、
/// 次回起動にも引き継ぐ。デフォルトはシステム追従（[ThemeMode.system]）。
///
/// [MaterialApp] のルートで購読され `themeMode` に配線される。テーマ構築自体は
/// `buildEngineTheme` が担い、この Notifier は「どのテーマを使うか」だけを保持する。
///
/// 永続化の真実は SharedPreferences 側にあり、コールドスタート時に復元する。
/// 保存フォーマットは [ThemeMode.name]（'system' / 'light' / 'dark'）。
@riverpod
class ThemeModeSetting extends _$ThemeModeSetting {
  static const _key = 'app.themeMode';

  @override
  ThemeMode build() {
    // shared_preferences は非同期のため、まず既定値(system)を返してから
    // 保存値を読み込み、あれば state を更新する。
    _load();
    return ThemeMode.system;
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = _decode(prefs.getString(_key));
    if (saved != null && saved != state) state = saved;
  }

  /// 指定のモードに切り替えて永続化する。
  Future<void> set(ThemeMode mode) async {
    if (mode == state) return;
    state = mode;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_key, mode.name);
  }

  static ThemeMode? _decode(String? name) {
    if (name == null) return null;
    for (final m in ThemeMode.values) {
      if (m.name == name) return m;
    }
    return null;
  }
}
