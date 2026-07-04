import 'package:engine/engine.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

Widget _host(List<LessonQuiz> quizzes) => MaterialApp(
  theme: buildEngineTheme(AppColors.light()),
  home: QuizSessionScreen(quizzes: quizzes, title: 'テスト確認クイズ'),
);

void main() {
  testWidgets('単一選択: 選択→回答する→バナー→結果を見る→完了リング', (tester) async {
    final quiz = LessonQuiz.multipleChoice(
      question: 'これは問題です',
      options: const ['正しい', 'ちがう', 'べつ', 'ほか'],
      correctOptionIndex: 0,
    );
    await tester.pumpWidget(_host([quiz]));
    await tester.pumpAndSettle();

    // 出題中。CTA「回答する」はあるが未選択で無効。
    expect(find.text('回答する'), findsOneWidget);
    final ctaBefore = tester.widget<FilledButton>(
      find.ancestor(
        of: find.text('回答する'),
        matching: find.byType(FilledButton),
      ),
    );
    expect(ctaBefore.onPressed, isNull);

    // 正解の選択肢をタップ → CTA 有効化。
    await tester.tap(find.text('正しい'));
    await tester.pumpAndSettle();
    final ctaAfter = tester.widget<FilledButton>(
      find.ancestor(
        of: find.text('回答する'),
        matching: find.byType(FilledButton),
      ),
    );
    expect(ctaAfter.onPressed, isNotNull);

    // 回答する → 正解バナー表示。1 問なので次は「結果を見る」。
    await tester.tap(find.text('回答する'));
    await tester.pumpAndSettle();
    expect(find.byType(ResultBanner), findsOneWidget);
    expect(find.text('正解！'), findsOneWidget);
    expect(find.text('結果を見る'), findsOneWidget);

    // 結果を見る → 完了ビュー（CompletionRing＋前向きメッセージ）。
    await tester.tap(find.text('結果を見る'));
    await tester.pumpAndSettle();
    expect(find.byType(CompletionRing), findsOneWidget);
    expect(find.text('パーフェクト！'), findsOneWidget); // 1/1 = 満点
    expect(find.text('一覧に戻る'), findsOneWidget);
  });

  testWidgets('不正解を選ぶと不正解バナーが出る', (tester) async {
    final quiz = LessonQuiz.multipleChoice(
      question: 'これは問題です',
      options: const ['正しい', 'ちがう'],
      correctOptionIndex: 0,
    );
    await tester.pumpWidget(_host([quiz]));
    await tester.pumpAndSettle();

    await tester.tap(find.text('ちがう'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('回答する'));
    await tester.pumpAndSettle();

    expect(find.text('不正解'), findsOneWidget);
  });
}
