import '../../../content/content_models.dart';

/// 問題集の学習サマリー（進捗率・正誤率・件数）を表す純データ。
///
/// UI から切り離して単体テストできるよう Flutter には依存しない。問題集タブの
/// 全体サマリーカード（[computeExerciseSummary]）と、問題集詳細の進捗パネルの
/// 両方で使う。
class ExerciseSummary {
  const ExerciseSummary({
    required this.totalQuestions,
    required this.correct,
    required this.wrong,
  });

  /// 対象の総設問数（進捗率の分母）。集計対象の問題集が未ロードのときは 0。
  final int totalQuestions;

  /// 正解した設問数。
  final int correct;

  /// 不正解だった設問数。
  final int wrong;

  /// 回答済み（正解＋不正解）の設問数。
  int get answered => correct + wrong;

  /// 進捗率（回答済み / 総設問数）。総設問数 0 のときは 0。0..1。
  double get progress =>
      totalQuestions == 0 ? 0 : (answered / totalQuestions).clamp(0.0, 1.0);

  /// 正解率（正解 / 回答済み）。未回答のときは 0。0..1。
  double get accuracy => answered == 0 ? 0 : (correct / answered).clamp(0.0, 1.0);

  /// 進捗率（%・四捨五入）。
  int get progressPercent => (progress * 100).round();

  /// 正解率（%・四捨五入）。
  int get accuracyPercent => (accuracy * 100).round();
}

/// 問題集群と回答結果からサマリーを集計する。
///
/// - [totalQuestions] は [exercises] 内の全設問数（進捗率の分母）。集計対象が
///   未ロードのあいだは空リストを渡すことで 0 になり、進捗バーは空表示になる。
/// - [correct] / [wrong] は [results]（qid → 正誤）から数える。qid は年度をまたいで
///   一意なので、[exercises] に属する設問のみを対象に集計する（未ロード中でも
///   回答件数だけは出せるよう、対象が空なら results 全体から数える）。
ExerciseSummary computeExerciseSummary({
  required List<Exercise> exercises,
  required Map<String, bool> results,
}) {
  var total = 0;
  var correct = 0;
  var wrong = 0;

  if (exercises.isEmpty) {
    // 集計対象が未ロードのあいだ（総数不明）は、回答件数だけを results から出す。
    for (final v in results.values) {
      if (v) {
        correct++;
      } else {
        wrong++;
      }
    }
    return ExerciseSummary(totalQuestions: 0, correct: correct, wrong: wrong);
  }

  for (final exercise in exercises) {
    for (final q in exercise.questions) {
      total++;
      final r = results[q.qid];
      if (r == true) {
        correct++;
      } else if (r == false) {
        wrong++;
      }
    }
  }
  return ExerciseSummary(totalQuestions: total, correct: correct, wrong: wrong);
}
