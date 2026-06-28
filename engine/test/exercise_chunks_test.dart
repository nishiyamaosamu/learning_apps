import 'package:engine/engine.dart';
import 'package:flutter_test/flutter_test.dart';

/// 指定分野の問題を n 問つくる。
List<ExerciseQuestion> _qs(String category, int n) => [
  for (var i = 0; i < n; i++)
    ExerciseQuestion(
      qid: '$category${i + 1}',
      category: category,
      answerOptionId: 1,
    ),
];

Exercise _exercise(
  String id, {
  required int strategy,
  required int management,
  required int technology,
}) => Exercise(
  id: id,
  title: id,
  categories: const [
    ExerciseCategory(id: 'strategy', name: 'ストラテジ'),
    ExerciseCategory(id: 'management', name: 'マネジメント'),
    ExerciseCategory(id: 'technology', name: 'テクノロジー'),
  ],
  // あえて分野をシャッフルした順で渡し、出題順が固定されることを確認する。
  questions: [
    ..._qs('technology', technology),
    ..._qs('strategy', strategy),
    ..._qs('management', management),
  ],
);

void main() {
  group('buildExerciseChunks', () {
    test('R8相当（35/20/45）: 7+4+9=20チャンク、すべて5問', () {
      final chunks = buildExerciseChunks(
        _exercise('R8', strategy: 35, management: 20, technology: 45),
      );

      expect(chunks.length, 20);
      expect(chunks.where((c) => c.categoryId == 'strategy').length, 7);
      expect(chunks.where((c) => c.categoryId == 'management').length, 4);
      expect(chunks.where((c) => c.categoryId == 'technology').length, 9);
      // すべて5問。
      expect(chunks.every((c) => c.questions.length == 5), isTrue);
    });

    test('分野順は strategy → management → technology に固定', () {
      final chunks = buildExerciseChunks(
        _exercise('R8', strategy: 35, management: 20, technology: 45),
      );
      final categories = chunks.map((c) => c.categoryId).toList();
      final firstManagement = categories.indexOf('management');
      final firstTechnology = categories.indexOf('technology');
      final lastStrategy = categories.lastIndexOf('strategy');
      final lastManagement = categories.lastIndexOf('management');

      expect(lastStrategy < firstManagement, isTrue);
      expect(lastManagement < firstTechnology, isTrue);
    });

    test('R4相当（35/19/46）: 端数は最後のチャンクに吸収', () {
      final chunks = buildExerciseChunks(
        _exercise('R4', strategy: 35, management: 19, technology: 46),
      );

      expect(chunks.length, 7 + 3 + 9);

      final management = chunks
          .where((c) => c.categoryId == 'management')
          .toList();
      expect(management.length, 3);
      // 最後のマネジメントチャンクは 9問（5+余り4）。
      expect(management.last.questions.length, 9);
      expect(management.last.startQ, 11);
      expect(management.last.endQ, 19);
      expect(management.last.label, 'マネジメント系 11〜19問');

      final technology = chunks
          .where((c) => c.categoryId == 'technology')
          .toList();
      expect(technology.length, 9);
      // 最後のテクノロジチャンクは 6問（5+余り1）。
      expect(technology.last.questions.length, 6);
      expect(technology.last.startQ, 41);
      expect(technology.last.endQ, 46);
      expect(technology.last.label, 'テクノロジ系 41〜46問');
    });

    test('5問以下の分野は単一チャンク、6〜9問も単一チャンク（吸収）', () {
      final small = buildExerciseChunks(
        _exercise('X', strategy: 3, management: 6, technology: 0),
      );
      final strategy = small.where((c) => c.categoryId == 'strategy').toList();
      final management = small
          .where((c) => c.categoryId == 'management')
          .toList();

      expect(strategy.length, 1);
      expect(strategy.single.questions.length, 3);
      expect(strategy.single.label, 'ストラテジ系 1〜3問');

      expect(management.length, 1);
      expect(management.single.questions.length, 6);
      expect(management.single.label, 'マネジメント系 1〜6問');

      // 問題が0問の分野は出てこない。
      expect(small.any((c) => c.categoryId == 'technology'), isFalse);
    });

    test('ラベル・範囲・chunkKey', () {
      final chunks = buildExerciseChunks(
        _exercise('R8', strategy: 35, management: 20, technology: 45),
      );
      final first = chunks.first;
      expect(first.label, 'ストラテジ系 1〜5問');
      expect(first.rangeLabel, '1〜5問');
      expect(first.chunkKey, 'R8:strategy:0');

      // 分野内2番目のチャンク。
      final second = chunks[1];
      expect(second.label, 'ストラテジ系 6〜10問');
      expect(second.chunkKey, 'R8:strategy:1');
    });

    test('1問だけの分野は「N問」表記', () {
      final chunks = buildExerciseChunks(
        _exercise('Y', strategy: 1, management: 0, technology: 0),
      );
      expect(chunks.single.label, 'ストラテジ系 1問');
      expect(chunks.single.rangeLabel, '1問');
    });

    test('未知の分野もコンテンツの宣言順と表示名で出題する', () {
      final exercise = Exercise(
        id: 'custom',
        title: 'custom',
        categories: const [
          ExerciseCategory(id: 'legal', name: '法務'),
          ExerciseCategory(id: 'design', name: '設計'),
        ],
        questions: [
          ..._qs('design', 1),
          ..._qs('undeclared', 1),
          ..._qs('legal', 1),
        ],
      );

      final chunks = buildExerciseChunks(exercise);

      expect(chunks.map((chunk) => chunk.categoryId), [
        'legal',
        'design',
        'undeclared',
      ]);
      expect(chunks.map((chunk) => chunk.label), [
        '法務 1問',
        '設計 1問',
        'undeclared 1問',
      ]);
    });
  });
}
