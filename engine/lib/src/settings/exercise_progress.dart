import 'dart:convert';

import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'exercise_progress.g.dart';

/// 問題集タブで最後に開いたチャンクの位置（年度＋分野＋チャンク番号）。
///
/// 一覧画面の「前回」表示に使う。チャンク本体（設問リスト）は含まず、表示・
/// 再開時に [buildExerciseChunks] で現在のコンテンツから再解決する。
class ExerciseLastOpened {
  const ExerciseLastOpened({
    required this.exerciseId,
    required this.exerciseTitle,
    required this.categoryId,
    required this.chunkIndex,
  });

  final String exerciseId;
  final String exerciseTitle;
  final String categoryId;
  final int chunkIndex;

  Map<String, dynamic> toJson() => {
    'exerciseId': exerciseId,
    'exerciseTitle': exerciseTitle,
    'categoryId': categoryId,
    'chunkIndex': chunkIndex,
  };

  factory ExerciseLastOpened.fromJson(Map<String, dynamic> json) =>
      ExerciseLastOpened(
        exerciseId: json['exerciseId'] as String,
        exerciseTitle: json['exerciseTitle'] as String,
        categoryId: json['categoryId'] as String,
        chunkIndex: (json['chunkIndex'] as num).toInt(),
      );
}

/// 問題集タブの「前回」表示用に、最後に開いたチャンクの位置を永続化する。
///
/// [VideoProgress] と同じ流儀（アプリ全体の学習状態なので keepAlive・永続化の
/// 真実は SharedPreferences 側・[_loaded] ガードで初期ロードの巻き戻しを防ぐ）。
@Riverpod(keepAlive: true)
class ExerciseProgress extends _$ExerciseProgress {
  static const _key = 'exercise.lastOpened';

  Future<void>? _loaded;

  @override
  ExerciseLastOpened? build() {
    _loaded = _load();
    return null;
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_key);
    if (raw == null) return;
    // 既に記録済みの値は保存値より優先する（巻き戻し防止）。
    state ??= ExerciseLastOpened.fromJson(
      jsonDecode(raw) as Map<String, dynamic>,
    );
  }

  /// チャンクを開いた時点で呼び、「前回」を更新する。
  Future<void> markOpened(ExerciseLastOpened entry) async {
    await _loaded;
    state = entry;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_key, jsonEncode(entry.toJson()));
  }
}
