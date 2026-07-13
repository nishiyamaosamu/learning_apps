import 'dart:convert';

import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/exercise_top.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

ExerciseQuestion _q(String qid) => ExerciseQuestion(
  qid: qid,
  category: 'strategy',
  content: [ExerciseBlock.text(text: '問題 $qid')],
  options: [
    for (var i = 1; i <= 4; i++)
      ExerciseOption(id: i, content: [ExerciseBlock.text(text: '選択肢$i')]),
  ],
  answerOptionId: 1,
  explanation: [ExerciseBlock.text(text: '解説 $qid')],
);

final _exercises = [
  Exercise(id: 'R8', title: '令和8年度 問題集', questions: [_q('R8001'), _q('R8002')]),
];

const _index = ContentIndex(
  exercises: [
    ExerciseGroup(
      id: 'past-exams',
      title: '問題集',
      exercises: [ContentSummary(id: 'R8', title: '令和8年度 問題集')],
    ),
  ],
);

Widget _host() => ProviderScope(
  overrides: [
    appConfigProvider.overrideWithValue(const AppConfig(title: '問題集テスト')),
    contentIndexProvider.overrideWith((ref) async => _index),
    allExercisesProvider.overrideWith((ref) async => _exercises),
  ],
  child: MaterialApp(
    theme: buildEngineTheme(AppColors.light()),
    home: const ExerciseTop(),
  ),
);

void main() {
  testWidgets('キューが空なら「要復習をランダムに5問」は出ない', (tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    expect(find.text('令和8年度 問題集'), findsOneWidget);
    expect(find.text('要復習をランダムに5問'), findsNothing);
  });

  testWidgets('キューに設問があればボタンが出て、タップで演習が始まる', (tester) async {
    SharedPreferences.setMockInitialValues({
      'review.queueQids': ['R8002'],
    });
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    final cta = find.text('要復習をランダムに5問');
    expect(cta, findsOneWidget);

    await tester.tap(cta);
    await tester.pumpAndSettle();

    // 要復習セッションが起動し、キュー内の設問が出題される。
    expect(find.text('問題 R8002'), findsOneWidget);
    expect(find.text('回答する'), findsOneWidget);
  });

  testWidgets('前回開いたチャンクがあれば、該当行に小さな「前回」ラベルが出る', (tester) async {
    SharedPreferences.setMockInitialValues({
      'exercise.lastOpened': jsonEncode({
        'exerciseId': 'R8',
        'exerciseTitle': '令和8年度 問題集',
        'categoryId': 'strategy',
        'chunkIndex': 0,
      }),
    });
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    // タイトル行自体は変わらず、行の右端に小さなラベルが添う。
    expect(find.text('令和8年度 問題集'), findsOneWidget);
    expect(find.text('前回'), findsOneWidget);
  });

  testWidgets('前回開いたチャンクがなければラベルは出ない', (tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    expect(find.text('前回'), findsNothing);
  });
}
