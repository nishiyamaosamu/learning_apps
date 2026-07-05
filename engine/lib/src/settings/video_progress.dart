import 'dart:convert';

import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'video_progress.g.dart';

/// 動画の視聴3状態（DESIGN.html「動画講座」の `vthumb` に対応）。
///
/// - [unwatched]: 進捗マップに無い＝未視聴（▶ `play_arrow`）。
/// - [playing]: マップにあり、まだ視聴済みに達していない＝再生中／途中（equalizer）。
/// - [watched]: 視聴済みフラグが立っている（✓ `check`）。
enum VideoWatchStatus { unwatched, playing, watched }

/// 動画1本の視聴状態（再生位置と視聴済みフラグ）。
class VideoWatchEntry {
  const VideoWatchEntry({required this.positionSec, required this.watched});

  /// 最後に記録した再生位置（秒）。
  final int positionSec;

  /// 視聴済み（総尺の90%以上に達したことがある）。一度 true になったら戻さない。
  final bool watched;

  Map<String, dynamic> toJson() => {'p': positionSec, 'w': watched};

  factory VideoWatchEntry.fromJson(Map<String, dynamic> json) => VideoWatchEntry(
    positionSec: (json['p'] as num?)?.toInt() ?? 0,
    watched: json['w'] as bool? ?? false,
  );
}

/// 視聴進捗の全体状態。動画ID（グローバル一意、例 '1-1'）→ 視聴状態のマップと、
/// ホームの「つづきから」ヒーロー用の「最後に視聴した動画ID」を保持する。
class VideoProgressData {
  const VideoProgressData({
    this.byId = const <String, VideoWatchEntry>{},
    this.lastWatchedId,
  });

  final Map<String, VideoWatchEntry> byId;
  final String? lastWatchedId;

  /// 保存済みの再生位置（秒）。無ければ 0。
  int positionSecOf(String id) => byId[id]?.positionSec ?? 0;

  /// 3状態の導出（[VideoWatchStatus] 参照）。
  VideoWatchStatus statusOf(String id) {
    final entry = byId[id];
    if (entry == null) return VideoWatchStatus.unwatched;
    if (entry.watched) return VideoWatchStatus.watched;
    return VideoWatchStatus.playing;
  }
}

/// 動画の視聴進捗（再生位置・視聴済み・最終視聴動画）を永続化する。
///
/// アプリ全体の学習状態なのでセッション中は保持する（keepAlive）。永続化の
/// 真実は SharedPreferences 側にあり、コールドスタート時に復元する。
/// [ExerciseResults] と同じ流儀で、初期ロードが書き込みに割り込んで state を
/// 巻き戻すのを [_loaded] ガードで防ぐ。
@Riverpod(keepAlive: true)
class VideoProgress extends _$VideoProgress {
  static const _dataKey = 'video.progress';
  static const _lastKey = 'video.lastWatchedId';

  /// 視聴済みと判定する再生位置の割合（総尺比）。
  static const _watchedThreshold = 0.9;

  /// 初期ロードの完了を表す Future。書き込み系はこれを待ってから state を
  /// 更新する（ロードが割り込んで巻き戻すのを防ぐ）。
  Future<void>? _loaded;

  @override
  VideoProgressData build() {
    _loaded = _load();
    return const VideoProgressData();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_dataKey);
    final last = prefs.getString(_lastKey);
    final loaded = <String, VideoWatchEntry>{};
    if (raw != null) {
      final decoded = jsonDecode(raw) as Map<String, dynamic>;
      for (final e in decoded.entries) {
        loaded[e.key] = VideoWatchEntry.fromJson(e.value as Map<String, dynamic>);
      }
    }
    state = VideoProgressData(
      // 既に記録済みの値は保存値より優先する（巻き戻し防止）。
      byId: {...loaded, ...state.byId},
      lastWatchedId: state.lastWatchedId ?? last,
    );
  }

  /// 再生位置を記録し、90%閾値に達していれば視聴済みにする（不可逆）。
  ///
  /// pause／dispose／ライフサイクル変化／定期リスナーから呼ぶ。
  Future<void> record({
    required String id,
    required int positionSec,
    required int durationSec,
  }) async {
    await _loaded;
    final prev = state.byId[id];
    final reachedEnd =
        durationSec > 0 && positionSec >= durationSec * _watchedThreshold;
    final watched = (prev?.watched ?? false) || reachedEnd;
    state = VideoProgressData(
      byId: {
        ...state.byId,
        id: VideoWatchEntry(
          positionSec: positionSec < 0 ? 0 : positionSec,
          watched: watched,
        ),
      },
      lastWatchedId: state.lastWatchedId,
    );
    await _persist();
  }

  /// 「最後に視聴した動画」を更新する（視聴ページを開いた時点で呼ぶ）。
  Future<void> markOpened(String id) async {
    await _loaded;
    if (state.lastWatchedId == id) return;
    state = VideoProgressData(byId: state.byId, lastWatchedId: id);
    await _persist();
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _dataKey,
      jsonEncode({for (final e in state.byId.entries) e.key: e.value.toJson()}),
    );
    final last = state.lastWatchedId;
    if (last != null) await prefs.setString(_lastKey, last);
  }
}
