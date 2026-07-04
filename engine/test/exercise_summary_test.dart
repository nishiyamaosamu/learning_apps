import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/widgets/exercise_summary.dart';
import 'package:flutter_test/flutter_test.dart';

Exercise _exercise(String id, List<String> qids) => Exercise(
  id: id,
  title: id,
  questions: [
    for (final qid in qids)
      ExerciseQuestion(qid: qid, category: 'strategy', answerOptionId: 1),
  ],
);

void main() {
  group('computeExerciseSummary', () {
    test('複数問題集を横断して総数・正解・不正解を集計する', () {
      final summary = computeExerciseSummary(
        exercises: [
          _exercise('R8', ['R8001', 'R8002', 'R8003']),
          _exercise('R7', ['R7001', 'R7002']),
        ],
        results: {'R8001': true, 'R8002': false, 'R7001': true},
      );

      expect(summary.totalQuestions, 5);
      expect(summary.correct, 2);
      expect(summary.wrong, 1);
      expect(summary.answered, 3);
      // 進捗 = 3/5 = 60%。
      expect(summary.progressPercent, 60);
      // 正解率 = 2/3 ≒ 67%。
      expect(summary.accuracyPercent, 67);
    });

    test('回答が1問も無いと進捗0%・正解率0%（バーは空）', () {
      final summary = computeExerciseSummary(
        exercises: [
          _exercise('R8', ['R8001', 'R8002']),
        ],
        results: const {},
      );

      expect(summary.totalQuestions, 2);
      expect(summary.correct, 0);
      expect(summary.wrong, 0);
      expect(summary.progress, 0);
      expect(summary.accuracy, 0);
      expect(summary.progressPercent, 0);
      expect(summary.accuracyPercent, 0);
    });

    test('問題集が未ロード（空）でも回答件数だけは results から数える', () {
      final summary = computeExerciseSummary(
        exercises: const [],
        results: {'R8001': true, 'R8002': true, 'R8003': false},
      );

      // 総数不明 → 0（進捗バーは空表示）。
      expect(summary.totalQuestions, 0);
      expect(summary.progressPercent, 0);
      // 正解率と件数は算出できる。
      expect(summary.correct, 2);
      expect(summary.wrong, 1);
      expect(summary.accuracyPercent, 67);
    });
  });
}
