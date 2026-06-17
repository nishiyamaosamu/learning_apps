import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'audio_settings.g.dart';

/// レッスン音声のグローバルなオン/オフ。設定として永続化し、
/// 次レッスンにも引き継ぐ。デフォルトはオン（自動再生）。
@riverpod
class AudioEnabled extends _$AudioEnabled {
  static const _key = 'lesson.audioEnabled';

  @override
  bool build() {
    // shared_preferences は非同期のため、まず既定値(true)を返してから
    // 保存値を読み込み、あれば state を更新する。
    _load();
    return true;
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getBool(_key);
    if (saved != null && saved != state) state = saved;
  }

  /// オン/オフを切り替えて永続化する。
  Future<void> toggle() async {
    state = !state;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_key, state);
  }
}
