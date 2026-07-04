import 'package:engine/engine.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

/// 2 空欄・3 語のテスト用穴埋め。
QuizFillInTheBlank _quiz() => LessonQuiz.fillInTheBlank(
  question: 'X[__]Y[__]Z',
  options: const ['あ', 'い', 'う'],
  correctOptionIndices: const [0, 1],
) as QuizFillInTheBlank;

/// controller の通知で盤面を作り直すホスト（実利用と同じ配線）。
Widget _host(
  QuizController controller,
  QuizFillInTheBlank quiz, {
  bool revealed = false,
}) => MaterialApp(
  theme: buildEngineTheme(AppColors.light()),
  home: Scaffold(
    body: AnimatedBuilder(
      animation: controller,
      builder: (_, _) => FillBlankBoard(
        question: quiz.question,
        options: quiz.options,
        controller: controller,
        revealed: revealed,
      ),
    ),
  ),
);

/// 空欄チップ（minWidth 58 の Container）を全て指す finder。
Finder _blanks() => find.byWidgetPredicate(
  (w) => w is Container && w.constraints?.minWidth == 58,
);

void main() {
  testWidgets('チップをタップすると先頭の空欄に入る', (tester) async {
    final quiz = _quiz();
    final controller = QuizController(quiz);
    addTearDown(controller.dispose);
    await tester.pumpWidget(_host(controller, quiz));

    // 未配置時、語群の「あ」は 1 つだけ（空欄は丸数字表示）。
    expect(find.text('あ'), findsOneWidget);
    await tester.tap(find.text('あ'));
    await tester.pump();

    expect(controller.blanks[0], 0);
    expect(controller.blanks[1], isNull);
  });

  testWidgets('配置済みの空欄をタップすると解除される', (tester) async {
    final quiz = _quiz();
    final controller = QuizController(quiz);
    addTearDown(controller.dispose);
    await tester.pumpWidget(_host(controller, quiz));

    await tester.tap(find.text('あ'));
    await tester.pump();
    expect(controller.blanks[0], 0);

    // 配置済みの空欄（文中に出る先頭の「あ」）をタップ → 解除。
    await tester.tap(find.text('あ').first);
    await tester.pump();
    expect(controller.blanks[0], isNull);
  });

  testWidgets('全空欄が埋まると canSubmit が真になる', (tester) async {
    final quiz = _quiz();
    final controller = QuizController(quiz);
    addTearDown(controller.dispose);
    await tester.pumpWidget(_host(controller, quiz));

    expect(controller.canSubmit, isFalse);
    await tester.tap(find.text('あ'));
    await tester.pump();
    expect(controller.canSubmit, isFalse); // まだ空欄が残る

    await tester.tap(find.text('い'));
    await tester.pump();
    expect(controller.blanks, [0, 1]);
    expect(controller.canSubmit, isTrue);
  });

  testWidgets('未配置の空欄チップは行全幅に伸びず内容幅に収まる', (tester) async {
    final quiz = _quiz();
    final controller = QuizController(quiz);
    addTearDown(controller.dispose);
    await tester.pumpWidget(_host(controller, quiz));

    final blanks = _blanks();
    expect(blanks, findsNWidgets(2));
    for (var i = 0; i < 2; i++) {
      // 文中インラインの小型チップ（min-width 58＋内容幅）。全幅に伸びていない。
      expect(tester.getSize(blanks.at(i)).width, lessThan(200));
    }
  });

  testWidgets('配置済み・リビール後の空欄チップも行全幅に伸びない', (tester) async {
    final quiz = _quiz();
    final controller = QuizController(quiz);
    addTearDown(controller.dispose);
    // 2 空欄を埋めてから正誤表示（○✕付き）に切り替える。
    controller.placeBlank(0, 0);
    controller.placeBlank(1, 1);
    await tester.pumpWidget(_host(controller, quiz, revealed: true));

    // ○✕マークが出ている＝リビール後の描画。
    expect(find.byIcon(Icons.circle_outlined), findsWidgets);

    final blanks = _blanks();
    expect(blanks, findsNWidgets(2));
    for (var i = 0; i < 2; i++) {
      expect(tester.getSize(blanks.at(i)).width, lessThan(200));
    }
  });

  testWidgets('使用済みチップは再タップしても動かない', (tester) async {
    final quiz = _quiz();
    final controller = QuizController(quiz);
    addTearDown(controller.dispose);
    await tester.pumpWidget(_host(controller, quiz));

    await tester.tap(find.text('あ'));
    await tester.pump();
    expect(controller.blanks[0], 0);

    // 使用済みの語群チップ（末尾の「あ」）をタップ → 何も起きない。
    await tester.tap(find.text('あ').last);
    await tester.pump();
    expect(controller.blanks, [0, null]);
  });
}
