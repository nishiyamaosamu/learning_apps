import 'dart:convert';

import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/exercise.dart' as detail;
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

final _exercise = Exercise(
  id: 'R8',
  title: '令和8年度 問題集',
  questions: [_q('R8001'), _q('R8002')],
);

Widget _host() => ProviderScope(
  overrides: [
    appConfigProvider.overrideWithValue(const AppConfig(title: '問題集テスト')),
    exerciseProvider('R8').overrideWith((ref) async => _exercise),
  ],
  child: MaterialApp(
    theme: buildEngineTheme(AppColors.light()),
    home: const detail.Exercise(id: 'R8', title: '令和8年度 問題集'),
  ),
);

void main() {
  testWidgets('前回開いたチャンクだけに小さな「前回」ラベルが出る', (tester) async {
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

    expect(find.text('前回'), findsOneWidget);
  });

  testWidgets('前回の情報がなければラベルは出ない', (tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    expect(find.text('前回'), findsNothing);
  });

  testWidgets('学習済み（全問正解）のチャンクは左アイコンが緑チェックになる', (tester) async {
    SharedPreferences.setMockInitialValues({
      'exercise.correctQids': ['R8001', 'R8002'],
    });
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    final icon = tester.widget<Icon>(find.byIcon(Icons.check_rounded));
    expect(icon.color, AppColors.light().correct);
    expect(find.byIcon(Icons.quiz_rounded), findsNothing);
  });

  testWidgets('未学習のチャンクは左アイコンがクイズアイコンのまま', (tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    expect(find.byIcon(Icons.check_rounded), findsNothing);
    expect(find.byIcon(Icons.quiz_rounded), findsOneWidget);
  });
}
