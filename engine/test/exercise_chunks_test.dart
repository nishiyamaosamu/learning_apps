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

    test('R4相当（35/19/46）: 末尾の端数は均等2分割', () {
      final chunks = buildExerciseChunks(
        _exercise('R4', strategy: 35, management: 19, technology: 46),
      );

      // strategy 35→7, management 19→[5,5,5,4]=4, technology 46→[5×8,3,3]=10。
      expect(chunks.length, 7 + 4 + 10);

      final management = chunks
          .where((c) => c.categoryId == 'management')
          .toList();
      expect(management.map((c) => c.questions.length), [5, 5, 5, 4]);
      // 最後のマネジメントチャンクは 4問（端数9を5+4に分割した後半）。
      expect(management.last.startQ, 16);
      expect(management.last.endQ, 19);
      expect(management.last.label, 'マネジメント系 16〜19問');

      final technology = chunks
          .where((c) => c.categoryId == 'technology')
          .toList();
      expect(technology.length, 10);
      // 末尾の端数6を 3+3 に分割。
      expect(technology[8].questions.length, 3);
      expect(technology[8].label, 'テクノロジ系 41〜43問');
      expect(technology.last.questions.length, 3);
      expect(technology.last.startQ, 44);
      expect(technology.last.endQ, 46);
      expect(technology.last.label, 'テクノロジ系 44〜46問');
    });

    test('5問以下の分野は単一チャンク、6〜9問は均等2分割', () {
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

      // 6問は 3+3 の2チャンクに分割。
      expect(management.length, 2);
      expect(management.map((c) => c.questions.length), [3, 3]);
      expect(management.first.label, 'マネジメント系 1〜3問');
      expect(management.last.label, 'マネジメント系 4〜6問');
      expect(management.last.chunkKey, 'X:management:1');

      // 問題が0問の分野は出てこない。
      expect(small.any((c) => c.categoryId == 'technology'), isFalse);
    });

    test('chunkSizes: 末尾6〜9問は均等2分割（多い方を先）', () {
      // 5以下・5の倍数はそのまま。
      expect(chunkSizes(1), [1]);
      expect(chunkSizes(5), [5]);
      expect(chunkSizes(10), [5, 5]);
      expect(chunkSizes(15), [5, 5, 5]);
      // 末尾の端数を分割。
      expect(chunkSizes(6), [3, 3]);
      expect(chunkSizes(7), [4, 3]);
      expect(chunkSizes(8), [4, 4]);
      expect(chunkSizes(9), [5, 4]);
      expect(chunkSizes(11), [5, 3, 3]);
      expect(chunkSizes(12), [5, 4, 3]);
      expect(chunkSizes(13), [5, 4, 4]);
      expect(chunkSizes(14), [5, 5, 4]);
      expect(chunkSizes(16), [5, 5, 3, 3]);
      // どのチャンクも3〜5問に収まる。
      for (var n = 1; n <= 60; n++) {
        final sizes = chunkSizes(n);
        expect(sizes.reduce((a, b) => a + b), n, reason: 'n=$n 合計不一致');
        if (n >= 6) {
          expect(sizes.every((s) => s >= 3 && s <= 5), isTrue, reason: 'n=$n');
        }
      }
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
