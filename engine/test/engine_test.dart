import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:engine/engine.dart';

void main() {
  test('AppConfig のデフォルト値', () {
    const config = AppConfig(title: 'テスト');
    expect(config.contentBasePath, 'contents');
    expect(config.tabs, isNotEmpty);
    expect(config.primaryColor, isNotNull);
  });

  test('AppDesignScheme が Material ColorScheme に反映される', () {
    const design = AppDesignScheme(
      primary: Color(0xFF1F7ACC),
      secondary: Color(0xFF0A457B),
      tertiary: Color(0xFF4B9CFB),
      accent: Color(0xFFF84F65),
      surface: Colors.white,
      onSurface: Color(0xFF393C41),
    );

    final scheme = design.toColorScheme();
    final accentColors = design.toAccentColors();

    expect(scheme.primary, const Color(0xFF1F7ACC));
    expect(scheme.secondary, const Color(0xFF0A457B));
    expect(scheme.tertiary, const Color(0xFF4B9CFB));
    expect(scheme.surface, Colors.white);
    expect(scheme.onSurface, const Color(0xFF393C41));
    expect(accentColors?.accent, const Color(0xFFF84F65));
  });

  test('ContentIndex.fromJson が一覧をパースできる', () {
    final index = ContentIndex.fromJson({
      'lessons': [
        {
          'id': 'strategy',
          'title': 'ストラテジ系',
          'majorCategories': [
            {
              'id': '1',
              'title': '企業と法務',
              'middleCategories': [
                {
                  'id': '1',
                  'title': '企業活動',
                  'lessons': [
                    {'id': '1', 'title': '講座1'},
                  ],
                },
              ],
            },
          ],
        },
      ],
      'exercises': [],
      'anki': [],
    });
    expect(index.lessons.length, 1);
    final domain = index.lessons.first;
    expect(domain.id, 'strategy');
    expect(domain.title, 'ストラテジ系');
    final majorCategory = domain.majorCategories.single;
    expect(majorCategory.id, '1');
    expect(majorCategory.title, '企業と法務');
    final middleCategory = majorCategory.middleCategories.single;
    expect(middleCategory.id, '1');
    expect(middleCategory.title, '企業活動');
    expect(middleCategory.lessons.single.title, '講座1');
    expect(index.exercises, isEmpty);
  });

  test('ContentIndex.fromJson は旧フラット講座形式を受理しない', () {
    expect(
      () => ContentIndex.fromJson({
        'lessons': [
          {'id': '1', 'title': '旧形式の講座'},
        ],
      }),
      throwsA(anything),
    );
  });

  test('Lesson.fromJson が pages と quizzes をパースできる', () {
    final lesson = Lesson.fromJson({
      'id': '2',
      'title': '企業活動と経営資源',
      'pages': [
        {
          'audioUrl': 'lessons/audios/2-1.mp3',
          'blocks': [
            {'text': '本文1', 'imageUrl': 'lessons/images/2-1.jpeg'},
            {'text': '本文2'},
          ],
        },
      ],
      'quizzes': [
        {
          'type': 'quizMultipleChoice',
          'question': '問1',
          'options': ['A', 'B'],
          'correctOptionIndex': 1,
        },
        {
          'type': 'quizFillInTheBlank',
          'question': '経営資源は ヒト・[__] の…',
          'options': ['モノ', '土地'],
          'correctOptionIndices': [0],
        },
      ],
      'exercises': [],
    });

    expect(lesson.pages.length, 1);
    expect(lesson.quizzes.length, 2);
    expect(lesson.exercises, isEmpty);

    final content = lesson.pages.first;
    expect(content.audioUrl, 'lessons/audios/2-1.mp3');
    expect(content.blocks.length, 2);
    expect(content.blocks.first.imageUrl, 'lessons/images/2-1.jpeg');
    expect(content.blocks.last.imageUrl, isNull);

    expect((lesson.quizzes.first as QuizMultipleChoice).correctOptionIndex, 1);
    expect((lesson.quizzes.last as QuizFillInTheBlank).correctOptionIndices, [
      0,
    ]);
  });

  test('pages / quizzes を持たないレッスンは空配列になる', () {
    final lesson = Lesson.fromJson({'id': '2', 'title': '導入のみ'});
    expect(lesson.pages, isEmpty);
    expect(lesson.quizzes, isEmpty);
    expect(lesson.exercises, isEmpty);
  });
}
