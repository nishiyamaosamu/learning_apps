import 'package:freezed_annotation/freezed_annotation.dart';

part 'content_models.freezed.dart';
part 'content_models.g.dart';

/// 一覧表示用のサマリ。base.json に含まれる。
@freezed
class ContentSummary with _$ContentSummary {
  const factory ContentSummary({
    required String id,
    required String title,
  }) = _ContentSummary;

  factory ContentSummary.fromJson(Map<String, dynamic> json) =>
      _$ContentSummaryFromJson(json);
}

/// base.json の内容。各タブの一覧を初期ロードで提供する。
@freezed
class ContentIndex with _$ContentIndex {
  const factory ContentIndex({
    @Default(<ContentSummary>[]) List<ContentSummary> lessons,
    @Default(<ContentSummary>[]) List<ContentSummary> exercises,
    @Default(<ContentSummary>[]) List<ContentSummary> anki,
  }) = _ContentIndex;

  factory ContentIndex.fromJson(Map<String, dynamic> json) =>
      _$ContentIndexFromJson(json);
}

/// レッスン内容。contents/lessons/{id}.json を都度ロード。
///
/// docs/LESSON.md の `lesson` 構造に対応。`pages` を配列順に表示し、
/// 末尾に `exercises`（本番演習への参照）を表示する。
@freezed
class Lesson with _$Lesson {
  const factory Lesson({
    required String id,
    required String title,
    // 説明・ミニクイズのページ列。配列順に表示。
    @Default(<LessonPage>[]) List<LessonPage> pages,
    // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
    // 演習を持たないレッスンは空配列。
    @Default(<int>[]) List<int> exercises,
  }) = _Lesson;

  factory Lesson.fromJson(Map<String, dynamic> json) => _$LessonFromJson(json);
}

/// レッスンの1ページ。複数のコンテンツを束ねる。
@freezed
class LessonPage with _$LessonPage {
  const factory LessonPage({
    // このページに並べるコンテンツ列。配列順に表示。
    @Default(<LessonContent>[]) List<LessonContent> contents,
  }) = _LessonPage;

  factory LessonPage.fromJson(Map<String, dynamic> json) =>
      _$LessonPageFromJson(json);
}

/// ページ内コンテンツ。`type` を discriminator とするフラットなunion。
///
/// 各バリアントは型ごとのフィールドを同階層に持つ（`data:` でネストしない）。
@Freezed(unionKey: 'type')
sealed class LessonContent with _$LessonContent {
  /// 説明本文（Markdown）。
  @FreezedUnionValue('text')
  const factory LessonContent.text({
    required String text,
    // 本文ナレーション音声。ローカルアセット相対パス（例 audio/1-1.mp3）。
    String? audioUrl,
  }) = TextContent;

  /// 画像。imageUrl はローカルアセット相対パス（例 images/vowels.png）。
  @FreezedUnionValue('image')
  const factory LessonContent.image({
    required String imageUrl,
  }) = ImageContent;

  /// 複数の選択肢から正解を1つ選ぶミニクイズ。
  /// 設問文は直前の [TextContent] が担う（このバリアント自身は設問文を持たない）。
  @FreezedUnionValue('quizMultipleChoice')
  const factory LessonContent.quizMultipleChoice({
    required List<String> options,
    // 正解の選択肢インデックス（0始まり）。
    required int correctOptionIndex,
  }) = QuizMultipleChoiceContent;

  /// 問題文中の空欄（`[__]`）を選択肢で順番に穴埋めするミニクイズ。
  @FreezedUnionValue('quizFillInTheBlank')
  const factory LessonContent.quizFillInTheBlank({
    // 問題文。空欄は `[__]` で表現。
    required String question,
    // 選択肢（同一内容の重複は不可）。options数 ≥ 空欄数。
    required List<String> options,
    // 各空欄の正解。correctOptionIndices[n] = 出現順 n 番目の `[__]` の
    // 正解 = options のインデックス。値は重複しない。
    required List<int> correctOptionIndices,
  }) = QuizFillInTheBlankContent;

  factory LessonContent.fromJson(Map<String, dynamic> json) =>
      _$LessonContentFromJson(json);
}

/// 問題の1問。
@freezed
class ExerciseQuestion with _$ExerciseQuestion {
  const factory ExerciseQuestion({
    required String prompt,
    required String answer,
  }) = _ExerciseQuestion;

  factory ExerciseQuestion.fromJson(Map<String, dynamic> json) =>
      _$ExerciseQuestionFromJson(json);
}

/// 問題内容。contents/exercises/{id}.json を都度ロード。
@freezed
class Exercise with _$Exercise {
  const factory Exercise({
    required String id,
    required String title,
    @Default(<ExerciseQuestion>[]) List<ExerciseQuestion> questions,
  }) = _Exercise;

  factory Exercise.fromJson(Map<String, dynamic> json) =>
      _$ExerciseFromJson(json);
}

/// 暗記カードの1枚。
@freezed
class AnkiCard with _$AnkiCard {
  const factory AnkiCard({
    required String front,
    required String back,
  }) = _AnkiCard;

  factory AnkiCard.fromJson(Map<String, dynamic> json) =>
      _$AnkiCardFromJson(json);
}

/// 暗記カード内容（デッキ）。contents/anki/{id}.json を都度ロード。
@freezed
class AnkiDeck with _$AnkiDeck {
  const factory AnkiDeck({
    required String id,
    required String title,
    @Default(<AnkiCard>[]) List<AnkiCard> cards,
  }) = _AnkiDeck;

  factory AnkiDeck.fromJson(Map<String, dynamic> json) =>
      _$AnkiDeckFromJson(json);
}
