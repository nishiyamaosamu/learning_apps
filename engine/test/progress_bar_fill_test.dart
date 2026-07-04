import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/widgets/exercise_summary.dart';
import 'package:engine/src/screens/widgets/exercise_summary_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

/// 自前プログレスバーのフィルが高さ0に潰れず、トラック幅×比率で描画されることの
/// 回帰テスト（シミュレータで見つかった高さ0潰れバグの再発防止）。
///
/// 既存の widget テストは「塗りが見えるか」を検証していなかったため、フィル側の
/// [ColoredBox] の実サイズ（[WidgetTester.getSize]）で高さ>0・幅≒比率を確かめる。
void main() {
  final colors = AppColors.light();

  Widget host(Widget child) => MaterialApp(
    theme: buildEngineTheme(colors),
    home: Scaffold(body: Center(child: child)),
  );

  Finder coloredBox(Color color) =>
      find.byWidgetPredicate((w) => w is ColoredBox && w.color == color);

  group('QuizTopBar のプログレスバー', () {
    testWidgets('1/3 進行時、青フィルが高さ>0でトラック幅の約1/3を占める', (tester) async {
      await tester.pumpWidget(
        host(QuizTopBar(current: 1, total: 3, onClose: () {})),
      );
      // 値変化アニメーション（AppMotion.slow）を終端まで進める。
      await tester.pumpAndSettle();

      final track = tester.getSize(coloredBox(colors.primary100));
      final fill = tester.getSize(coloredBox(colors.primary600));

      // フィルが潰れずトラックと同じ高さで塗られている。
      expect(fill.height, greaterThan(0));
      expect(fill.height, moreOrLessEquals(track.height, epsilon: 0.5));
      // 幅はトラック幅 × 1/3 に一致する。
      expect(fill.width, moreOrLessEquals(track.width / 3, epsilon: 1.0));
    });
  });

  group('ExerciseSummaryCard のバー', () {
    testWidgets('進捗フィルも正誤積み上げバーも高さ>0で塗られる', (tester) async {
      // 総数10・正解1・不正解9（進捗100%・正解率10%）。
      const summary = ExerciseSummary(totalQuestions: 10, correct: 1, wrong: 9);
      await tester.pumpWidget(host(const ExerciseSummaryCard(summary: summary)));
      await tester.pumpAndSettle();

      // 進捗バー: primary100 トラック上に primary600 フィル。
      final progressTrack = tester.getSize(coloredBox(colors.primary100));
      final progressFill = tester.getSize(coloredBox(colors.primary600));
      expect(progressFill.height, greaterThan(0));
      expect(progressFill.height, moreOrLessEquals(progressTrack.height, epsilon: 0.5));
      // 進捗100% → フィル幅 ≒ トラック幅。
      expect(progressFill.width, moreOrLessEquals(progressTrack.width, epsilon: 1.0));

      // 正誤積み上げバー: correct(flex1) と incorrect(flex9)。
      final accuracyTrack = tester.getSize(coloredBox(colors.border));
      final correct = tester.getSize(coloredBox(colors.correct));
      final incorrect = tester.getSize(coloredBox(colors.incorrect));

      expect(correct.height, greaterThan(0));
      expect(incorrect.height, greaterThan(0));
      expect(correct.height, moreOrLessEquals(accuracyTrack.height, epsilon: 0.5));
      expect(incorrect.height, moreOrLessEquals(accuracyTrack.height, epsilon: 0.5));
      // 幅比は 正解1 : 不正解9。
      expect(correct.width, moreOrLessEquals(accuracyTrack.width / 10, epsilon: 1.0));
      expect(incorrect.width, moreOrLessEquals(accuracyTrack.width * 9 / 10, epsilon: 1.0));
    });
  });
}
