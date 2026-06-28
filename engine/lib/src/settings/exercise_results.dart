import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'exercise_results.g.dart';

/// 問題ごとの学習結果（qid → 正解かどうか）。チャンク完了時にまとめて記録し、
/// 年度一覧画面の進捗バー（正解／誤答／未学習）とチャンクの完了✓の導出に使う。
///
/// - キーは [ExerciseQuestion.qid]（例 'R8001'、年度をまたいで一意）。
/// - 値 true=正解 / false=誤答。マップに無い qid は「未学習」。
/// - 再挑戦・復習では最新の結果で上書きする。
///
/// アプリ全体の学習状態なのでセッション中は保持する（keepAlive）。永続化の
/// 真実は SharedPreferences 側にあり、コールドスタート時に復元する。
@Riverpod(keepAlive: true)
class ExerciseResults extends _$ExerciseResults {
  static const _correctKey = 'exercise.correctQids';
  static const _wrongKey = 'exercise.wrongQids';

  /// 初期ロードの完了を表す Future。recordAll はこれを待ってから上書きする
  /// （ロードが書き込みの途中に割り込んで state を巻き戻すのを防ぐ）。
  Future<void>? _loaded;

  @override
  Map<String, bool> build() {
    // shared_preferences は非同期のため、まず空マップを返してから
    // 保存値を読み込み、あれば state を更新する。
    _loaded = _load();
    return <String, bool>{};
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final correct = prefs.getStringList(_correctKey) ?? const <String>[];
    final wrong = prefs.getStringList(_wrongKey) ?? const <String>[];
    state = {
      for (final qid in correct) qid: true,
      for (final qid in wrong) qid: false,
      // 既に記録済みの結果は保存値より優先する（順序保護）。
      ...state,
    };
  }

  /// 複数問の結果を最新で上書き保存する（チャンク／復習の完了時に呼ぶ）。
  Future<void> recordAll(Map<String, bool> results) async {
    if (results.isEmpty) return;
    // 初期ロード完了後に上書きする（ロードによる巻き戻しを避ける）。
    await _loaded;
    state = {...state, ...results};
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_correctKey, [
      for (final e in state.entries)
        if (e.value) e.key,
    ]);
    await prefs.setStringList(_wrongKey, [
      for (final e in state.entries)
        if (!e.value) e.key,
    ]);
  }
}
