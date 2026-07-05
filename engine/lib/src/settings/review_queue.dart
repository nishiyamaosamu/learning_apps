import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../content/content_models.dart';

part 'review_queue.g.dart';

/// 要復習キュー（誤答の自動蓄積）。qid の集合を SharedPreferences に永続化する。
///
/// DESIGN.html「集中ブルー」の要復習導線（問題集タブの「要復習をランダムに5問」、
/// 解説カードの「要復習に追加」チップ、完了画面の「要復習 +n」）の裏側。
///
/// - 自動蓄積: クイズ確定時、不正解の qid を追加し、正解の qid は解消（削除）する。
///   （既存の [ExerciseResults.recordAll] と同じフックで [syncFromResults] を呼ぶ）
/// - 手動追加: 解説カードの「要復習に追加」チップから任意の qid を追加する（冪等）。
///
/// 値は [ExerciseQuestion.qid]（例 'R8001'、年度をまたいで一意）。順序は保持しない
/// （出題はランダム抽出のため）。アプリ全体の学習状態なのでセッション中は保持する
/// （keepAlive）。永続化の真実は SharedPreferences 側にあり、コールドスタート時に
/// 復元する。[ExerciseResults] と同じ流儀で、初期ロードが書き込みに割り込んで
/// state を巻き戻すのを [_loaded] ガードで防ぐ。
@Riverpod(keepAlive: true)
class ReviewQueue extends _$ReviewQueue {
  static const _key = 'review.queueQids';

  /// 初期ロードの完了を表す Future。書き込み系はこれを待ってから state を
  /// 更新する（ロードが割り込んで巻き戻すのを防ぐ）。
  Future<void>? _loaded;

  @override
  Set<String> build() {
    _loaded = _load();
    return <String>{};
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getStringList(_key) ?? const <String>[];
    state = {
      ...saved,
      // 既に記録済みの追加/解消は保存値より優先する（巻き戻し防止）。
      ...state,
    };
  }

  /// クイズ結果に連動してキューを更新する（不正解=追加 / 正解=解消）。
  ///
  /// 確定時に [ExerciseResults.recordAll] と対で呼ぶ。結果が空なら何もしない。
  Future<void> syncFromResults(Map<String, bool> results) async {
    if (results.isEmpty) return;
    await _loaded;
    final next = {...state};
    var changed = false;
    results.forEach((qid, correct) {
      if (correct) {
        changed |= next.remove(qid);
      } else {
        changed |= next.add(qid);
      }
    });
    if (!changed) return;
    state = next;
    await _persist();
  }

  /// 手動でキューに追加する（解説カードのチップ用。既に追加済みなら何もしない）。
  Future<void> add(String qid) async {
    await _loaded;
    if (state.contains(qid)) return;
    state = {...state, qid};
    await _persist();
  }

  /// キューから外す（解消）。
  Future<void> remove(String qid) async {
    await _loaded;
    if (!state.contains(qid)) return;
    state = {...state}..remove(qid);
    await _persist();
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_key, state.toList());
  }
}

/// キュー内の qid を、読み込み済みの全問題集から [ExerciseQuestion] に解決する。
///
/// qid → 設問の対応は年度をまたいで一意な qid をキーに全問題集を走査して引く
/// （qid の年度プレフィックスに依存しない）。キューに入っていても対応する設問が
/// 見つからない qid（コンテンツ改訂で消えた等）は黙って除外する。返り値の順序は
/// [exercises] の設問順。
List<ExerciseQuestion> resolveReviewQuestions(
  List<Exercise> exercises,
  Set<String> queue,
) {
  if (queue.isEmpty) return const <ExerciseQuestion>[];
  return [
    for (final exercise in exercises)
      for (final q in exercise.questions)
        if (queue.contains(q.qid)) q,
  ];
}
