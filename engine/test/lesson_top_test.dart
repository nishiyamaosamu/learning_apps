import 'package:engine/src/screens/tabs/lesson_top.dart';
import 'package:engine/engine.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('系をラベル、大分類をアコーディオン、中分類を見出しとして表示する', (tester) async {
    const index = ContentIndex(
      lessons: [
        LessonDomain(
          id: 'strategy',
          title: 'ストラテジ系',
          majorCategories: [
            LessonMajorCategory(
              id: '1',
              title: '企業と法務',
              middleCategories: [
                LessonMiddleCategory(
                  id: '1',
                  title: '企業活動',
                  lessons: [ContentSummary(id: '1', title: '講座1')],
                ),
              ],
            ),
          ],
        ),
      ],
    );

    await tester.pumpWidget(
      ProviderScope(
        overrides: [contentIndexProvider.overrideWith((ref) async => index)],
        child: const MaterialApp(home: LessonTop()),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('ストラテジ系'), findsOneWidget);
    expect(find.text('企業と法務'), findsOneWidget);
    expect(find.text('企業活動'), findsOneWidget);
    expect(find.text('講座1'), findsOneWidget);

    await tester.tap(find.text('企業と法務'));
    await tester.pumpAndSettle();

    expect(find.text('企業活動'), findsNothing);
    expect(find.text('講座1'), findsNothing);
  });

  testWidgets('レッスンがないカテゴリは表示しない', (tester) async {
    const index = ContentIndex(
      lessons: [
        LessonDomain(
          id: 'management',
          title: 'マネジメント系',
          majorCategories: [
            LessonMajorCategory(
              id: '4',
              title: '開発技術',
              middleCategories: [
                LessonMiddleCategory(id: '8', title: 'システム開発技術', lessons: []),
              ],
            ),
          ],
        ),
      ],
    );

    await tester.pumpWidget(
      ProviderScope(
        overrides: [contentIndexProvider.overrideWith((ref) async => index)],
        child: const MaterialApp(home: LessonTop()),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('講座がありません'), findsOneWidget);
    expect(find.text('開発技術'), findsNothing);
  });
}
