import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/exercise_quiz.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

ExerciseQuestion _q(String qid, int answer, {int optionCount = 4}) =>
    ExerciseQuestion(
      qid: qid,
      category: 'strategy',
      content: [ExerciseBlock.text(text: '問題 $qid')],
      options: [
        for (var i = 1; i <= optionCount; i++)
          ExerciseOption(
            id: i,
            content: [ExerciseBlock.text(text: '選択肢$i')],
          ),
      ],
      answerOptionId: answer,
      explanation: [ExerciseBlock.text(text: '解説 $qid')],
    );

Widget _app(Widget home) => ProviderScope(child: MaterialApp(home: home));

void main() {
  setUp(() => SharedPreferences.setMockInitialValues({}));

  testWidgets('回答→即時判定→次へ→完了（正答率）の一連フロー', (tester) async {
    await tester.pumpWidget(
      _app(
        ExerciseQuizScreen(
          questions: [_q('Q1', 1), _q('Q2', 2)],
          assetBasePath: 'contents',
          title: 'テスト問題集',
        ),
      ),
    );
    await tester.pumpAndSettle();

    // 1問目表示。回答前は回答エリアも「次へ」も無い。
    expect(find.text('問題 Q1'), findsOneWidget);
    expect(find.text('解説 Q1'), findsNothing);
    expect(find.text('次へ'), findsNothing);

    // 選択肢「ア」（=正解1）のブロックをタップ。
    await tester.tap(find.text('ア'));
    await tester.pumpAndSettle();
    expect(find.text('正解！'), findsOneWidget);
    expect(find.text('解説 Q1'), findsOneWidget);
    expect(find.text('次へ'), findsOneWidget);

    // 次へ → 2問目。
    await tester.tap(find.text('次へ'));
    await tester.pumpAndSettle();
    expect(find.text('問題 Q2'), findsOneWidget);

    // 2問目はわざと不正解（「ア」=1, 正解=2）。最終問なので「結果を見る」。
    await tester.tap(find.text('ア'));
    await tester.pumpAndSettle();
    expect(find.text('不正解'), findsOneWidget);
    expect(find.text('結果を見る'), findsOneWidget);

    // 完了ページ：1/2正解＝50%。復習・戻るボタンあり。
    await tester.tap(find.text('結果を見る'));
    await tester.pumpAndSettle();
    expect(find.text('50%'), findsOneWidget);
    expect(find.text('1 / 2 問正解'), findsOneWidget);
    expect(find.textContaining('間違えた問題を復習'), findsOneWidget);
    expect(find.text('一覧に戻る'), findsOneWidget);
  });

  testWidgets('回答はロックされ、別の選択肢を押しても変わらない', (tester) async {
    await tester.pumpWidget(
      _app(
        ExerciseQuizScreen(
          questions: [_q('Q1', 1)],
          assetBasePath: 'contents',
          title: 'ロックテスト',
        ),
      ),
    );
    await tester.pumpAndSettle();

    // 「イ」（=2, 不正解）の選択肢をタップ → 不正解で確定。
    await tester.tap(find.text('イ'));
    await tester.pumpAndSettle();
    expect(find.text('不正解'), findsOneWidget);

    // その後「ア」をタップしてもロック済みで判定は変わらない。
    await tester.tap(find.text('ア'));
    await tester.pumpAndSettle();
    expect(find.text('不正解'), findsOneWidget);
    expect(find.text('正解！'), findsNothing);
  });

  testWidgets('10択（ア〜コ）の単一選択も解答できる', (tester) async {
    await tester.pumpWidget(
      _app(
        ExerciseQuizScreen(
          // 正解は10番目（コ）。
          questions: [_q('Q1', 10, optionCount: 10)],
          assetBasePath: 'contents',
          title: '10択テスト',
        ),
      ),
    );
    await tester.pumpAndSettle();

    // ア〜コの全ラベルが表示される。
    for (final kana in ['ア', 'オ', 'カ', 'コ']) {
      expect(find.text(kana), findsWidgets, reason: '$kana が表示される');
    }

    // 「コ」（=10, 正解）をタップ → 正解、正解表示は「コ」。
    await tester.ensureVisible(find.text('コ'));
    await tester.tap(find.text('コ'));
    await tester.pumpAndSettle();
    expect(find.text('正解！'), findsOneWidget);
    expect(find.text('正解：コ'), findsOneWidget);
  });

  testWidgets('完了時に各問の正誤が ExerciseResults に記録される', (tester) async {
    final container = ProviderContainer();
    addTearDown(container.dispose);
    await tester.pumpWidget(
      UncontrolledProviderScope(
        container: container,
        child: MaterialApp(
          home: ExerciseQuizScreen(
            questions: [_q('Q1', 1), _q('Q2', 2)],
            assetBasePath: 'contents',
            title: '記録テスト',
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    // Q1: 正解（ア=1）→ 次へ。
    await tester.tap(find.text('ア'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('次へ'));
    await tester.pumpAndSettle();

    // Q2: 不正解（ア=1, 正解=2）→ 結果を見る。
    await tester.tap(find.text('ア'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('結果を見る'));
    await tester.pumpAndSettle();

    final results = container.read(exerciseResultsProvider);
    expect(results['Q1'], true);
    expect(results['Q2'], false);
  });

  testWidgets('復習完了後の「一覧に戻る」は元の問題集画面へ戻る', (tester) async {
    await tester.pumpWidget(
      _app(
        Builder(
          builder: (context) => Scaffold(
            body: TextButton(
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (_) => ExerciseQuizScreen(
                    questions: [_q('Q1', 2)],
                    assetBasePath: 'contents',
                    title: '遷移テスト',
                  ),
                ),
              ),
              child: const Text('問題集を開く'),
            ),
          ),
        ),
      ),
    );

    await tester.tap(find.text('問題集を開く'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('ア'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('結果を見る'));
    await tester.pumpAndSettle();
    await tester.tap(find.textContaining('間違えた問題を復習'));
    await tester.pumpAndSettle();

    await tester.tap(find.text('イ'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('結果を見る'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('一覧に戻る'));
    await tester.pumpAndSettle();

    expect(find.text('問題集を開く'), findsOneWidget);
    expect(find.text('お疲れさまでした！'), findsNothing);
  });
}
