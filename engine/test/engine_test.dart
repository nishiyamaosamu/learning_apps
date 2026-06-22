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
        {'id': '1', 'title': '講座1'},
      ],
      'exercises': [],
      'anki': [],
    });
    expect(index.lessons.length, 1);
    expect(index.lessons.first.title, '講座1');
    expect(index.exercises, isEmpty);
  });

  test('Lesson.fromJson が pages の union をパースできる', () {
    final lesson = Lesson.fromJson({
      'id': '2',
      'title': '企業活動と経営資源',
      'pages': [
        {
          'type': 'content',
          'audioUrl': 'lessons/audios/2-1.mp3',
          'blocks': [
            {'text': '本文1', 'imageUrl': 'lessons/images/2-1.jpeg'},
            {'text': '本文2'},
          ],
        },
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

    expect(lesson.pages.length, 3);
    expect(lesson.exercises, isEmpty);

    final content = lesson.pages.first as ContentPage;
    expect(content.audioUrl, 'lessons/audios/2-1.mp3');
    expect(content.blocks.length, 2);
    expect(content.blocks.first.imageUrl, 'lessons/images/2-1.jpeg');
    expect(content.blocks.last.imageUrl, isNull);

    expect((lesson.pages[1] as QuizMultipleChoicePage).correctOptionIndex, 1);
    expect(
      (lesson.pages.last as QuizFillInTheBlankPage).correctOptionIndices,
      [0],
    );
  });

  test('pages を持たないレッスンは空配列になる', () {
    final lesson = Lesson.fromJson({'id': '2', 'title': '導入のみ'});
    expect(lesson.pages, isEmpty);
    expect(lesson.exercises, isEmpty);
  });
}
