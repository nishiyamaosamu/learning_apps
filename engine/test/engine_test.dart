import 'package:flutter_test/flutter_test.dart';

import 'package:engine/engine.dart';

void main() {
  test('AppConfig のデフォルト値', () {
    const config = AppConfig(title: 'テスト');
    expect(config.contentBasePath, 'contents');
    expect(config.tabs, isNotEmpty);
    expect(config.primaryColor, isNotNull);
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

  test('Lesson.fromJson が pages/contents の union をパースできる', () {
    final lesson = Lesson.fromJson({
      'id': '1',
      'title': 'IPAとは何か',
      'pages': [
        {
          'contents': [
            {'type': 'text', 'text': '本文', 'audioUrl': 'audio/1-1.mp3'},
            {'type': 'image', 'imageUrl': 'images/chart.png'},
          ],
        },
        {
          'contents': [
            {
              'type': 'quizMultipleChoice',
              'options': ['A', 'B'],
              'correctOptionIndex': 1,
            },
            {
              'type': 'quizFillInTheBlank',
              'question': '[i] は[__]母音です。',
              'options': ['前舌・狭', '後舌・広'],
              'correctOptionIndices': [0],
            },
          ],
        },
      ],
      'exercises': [],
    });

    expect(lesson.pages.length, 2);
    expect(lesson.exercises, isEmpty);

    final first = lesson.pages.first.contents;
    expect(first.first, isA<TextContent>());
    expect((first.first as TextContent).audioUrl, 'audio/1-1.mp3');
    expect(first.last, isA<ImageContent>());

    final second = lesson.pages.last.contents;
    expect(
      (second.first as QuizMultipleChoiceContent).correctOptionIndex,
      1,
    );
    expect(
      (second.last as QuizFillInTheBlankContent).correctOptionIndices,
      [0],
    );
  });

  test('exercises を持たないレッスンは空配列になる', () {
    final lesson = Lesson.fromJson({'id': '2', 'title': '導入のみ'});
    expect(lesson.pages, isEmpty);
    expect(lesson.exercises, isEmpty);
  });
}
