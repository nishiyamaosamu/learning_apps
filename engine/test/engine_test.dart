import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:engine/engine.dart';

void main() {
  test('AppConfig のデフォルト値', () {
    const config = AppConfig(title: 'テスト');
    expect(config.contentBasePath, 'contents');
    expect(config.tabs, isNotEmpty);
    expect(config.brandPrimary, isNull);
  });

  test('buildEngineTheme は集中ブルーの ColorScheme を返す', () {
    final theme = buildEngineTheme(AppColors.light());
    expect(theme.colorScheme.brightness, Brightness.light);
    // primary は主色ランプの p600（#2563EB）に投影される。
    expect(theme.colorScheme.primary, const Color(0xFF2563EB));
  });

  test('buildEngineTheme は AppColors 拡張をテーマに登録する', () {
    final theme = buildEngineTheme(AppColors.light());
    final colors = theme.extension<AppColors>();
    expect(colors, isNotNull);
    expect(colors!.primary600, const Color(0xFF2563EB));
    expect(colors.correct, const Color(0xFF0D9488));
  });

  test('theme.semantic.success は correct（#0D9488）を指す（互換シム）', () {
    final theme = buildEngineTheme(AppColors.light());
    expect(theme.semantic.success, const Color(0xFF0D9488));
    expect(theme.semantic.accent, const Color(0xFFF98BA4));
  });

  test('ブランド主色スワッチで primary ランプだけ差し替えられる', () {
    const brand = AppPrimarySwatch(
      p50: Color(0xFFE6F7F4),
      p100: Color(0xFFC7EFE8),
      p300: Color(0xFF6FD3C4),
      p500: Color(0xFF19B49B),
      p600: Color(0xFF0F9D8A),
      p800: Color(0xFF0A5F55),
      primaryDark: Color(0xFF3FC7B4),
      primarySurfaceDark: Color.fromRGBO(63, 199, 180, 0.14),
    );
    final theme = buildEngineTheme(AppColors.light(primary: brand));
    // 主色だけブランド値に、semantic は共通固定のまま。
    expect(theme.colorScheme.primary, const Color(0xFF0F9D8A));
    expect(theme.extension<AppColors>()!.correct, const Color(0xFF0D9488));
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
