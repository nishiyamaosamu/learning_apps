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

/// レッスン音声の再生速度（倍速）。設定として永続化し、次レッスンにも
/// 引き継ぐ。デフォルトは等速（1.0倍）。
@riverpod
class AudioSpeed extends _$AudioSpeed {
  static const _key = 'lesson.audioSpeed';

  /// 切り替えで巡回する倍速候補。
  static const speeds = <double>[1.0, 1.25, 1.5, 2.0];

  @override
  double build() {
    // shared_preferences は非同期のため、まず既定値(1.0)を返してから
    // 保存値を読み込み、あれば state を更新する。
    _load();
    return 1.0;
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getDouble(_key);
    if (saved != null && saved != state) state = saved;
  }

  /// 次の倍速候補へ巡回して永続化する。
  Future<void> cycle() async {
    final i = speeds.indexOf(state);
    state = speeds[(i + 1) % speeds.length];
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble(_key, state);
  }
}
