import '../../../content/content_models.dart';

/// 問題集を分野別の「5問チャンク」に分割するための純ロジック。
///
/// UI から切り離して単体テストできるよう、Flutter には依存しない。

/// 分野IDから「系」付きの表示ラベルへのマッピング。
///
/// YAML の `name`（例 'テクノロジー'）からは導出せず、ここで IPA 公式表記を保証する。
const Map<String, String> _categoryLabels = <String, String>{
  'strategy': 'ストラテジ系',
  'management': 'マネジメント系',
  'technology': 'テクノロジ系',
};

/// 分野IDの表示ラベル。IPAの既知IDは公式表記を使い、それ以外はコンテンツ側の
/// 表示名へフォールバックする。
String exerciseCategoryLabel(String categoryId, {String? fallback}) =>
    _categoryLabels[categoryId] ?? fallback ?? categoryId;

/// 5問単位の出題チャンク。
class ExerciseChunk {
  const ExerciseChunk({
    required this.exerciseId,
    required this.categoryId,
    required this.categoryLabel,
    required this.chunkIndex,
    required this.startQ,
    required this.endQ,
    required this.questions,
  });

  /// 年度ID（例 'R8'）。
  final String exerciseId;

  /// 分野ID（'strategy' など）。
  final String categoryId;

  /// 分野の表示名。
  final String categoryLabel;

  /// 分野内でのチャンク番号（0始まり）。
  final int chunkIndex;

  /// 分野内の開始問番号（1始まり、表示用）。
  final int startQ;

  /// 分野内の終了問番号（1始まり・含む、表示用）。
  final int endQ;

  /// このチャンクに含まれる問題（実体）。
  final List<ExerciseQuestion> questions;

  /// 問番号の範囲ラベル（例 '1〜5問'、1問のみなら '46問'）。
  String get rangeLabel => startQ == endQ ? '$endQ問' : '$startQ〜$endQ問';

  /// 一覧ラベル（例 'ストラテジ系 1〜5問'、1問のみなら 'テクノロジ系 46問'）。
  String get label => '$categoryLabel $rangeLabel';

  /// 完了状態の永続化キー（例 'R8:strategy:0'）。
  String get chunkKey => '$exerciseId:$categoryId:$chunkIndex';
}

/// 分野の問数を「5問チャンク」の大きさ列へ分割する。
///
/// 基本は5問ずつ。ただし末尾が6〜9問の端数になる場合は、その末尾チャンクを
/// 2つに均等分割する（多い方を先: 6→3+3, 7→4+3, 8→4+4, 9→5+4）。これにより
/// どのチャンクも3〜5問に収まる。5問以下の分野は単一チャンク。
List<int> chunkSizes(int n) {
  if (n <= 5) return <int>[n];
  final rem = n % 5;
  if (rem == 0) return List<int>.filled(n ~/ 5, 5);
  final tail = 5 + rem; // 6〜9
  return <int>[
    ...List<int>.filled(n ~/ 5 - 1, 5),
    (tail + 1) ~/ 2, // ceil（多い方を先）
    tail ~/ 2, // floor
  ];
}

/// 問題集を分野順・5問チャンクに分割する。
///
/// 各分野の問数が5で割り切れない場合、末尾の端数（6〜9問）は2つのチャンクに
/// 均等分割する（[chunkSizes] を参照）。問数が5以下の分野は単一チャンク。
List<ExerciseChunk> buildExerciseChunks(Exercise exercise) {
  final chunks = <ExerciseChunk>[];

  final categoriesById = {
    for (final category in exercise.categories) category.id: category,
  };
  // コンテンツで宣言された順を優先する。宣言漏れの分野も問題の出現順で末尾に
  // 加え、未知の分野に属する問題が一覧から黙って消えないようにする。
  final categoryIds = <String>[...categoriesById.keys];
  final seenCategoryIds = categoryIds.toSet();
  for (final question in exercise.questions) {
    if (seenCategoryIds.add(question.category)) {
      categoryIds.add(question.category);
    }
  }

  for (final categoryId in categoryIds) {
    final questions = exercise.questions
        .where((q) => q.category == categoryId)
        .toList(growable: false);
    final n = questions.length;
    if (n == 0) continue;

    final sizes = chunkSizes(n);
    var start = 0;
    for (var c = 0; c < sizes.length; c++) {
      final end = start + sizes[c];
      chunks.add(
        ExerciseChunk(
          exerciseId: exercise.id,
          categoryId: categoryId,
          categoryLabel: exerciseCategoryLabel(
            categoryId,
            fallback: categoriesById[categoryId]?.name,
          ),
          chunkIndex: c,
          startQ: start + 1,
          endQ: end,
          questions: questions.sublist(start, end),
        ),
      );
      start = end;
    }
  }

  return chunks;
}
