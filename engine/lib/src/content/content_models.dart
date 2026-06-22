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
/// docs/LESSON.md の `lesson` 構造に対応。コンテンツ（`pages`）を縦スワイプで
/// 1ページずつ表示し、確認問題（`quizzes`）を別画面で出題、末尾に `exercises`
/// （本番演習への参照）を表示する。
@freezed
class Lesson with _$Lesson {
  const factory Lesson({
    required String id,
    required String title,
    // 説明用のコンテンツページの列（縦スワイプで1ページずつ表示）。
    @Default(<ContentPage>[]) List<ContentPage> pages,
    // 確認問題（ミニクイズ）の列。別画面でまとめて出題する。
    @Default(<LessonQuiz>[]) List<LessonQuiz> quizzes,
    // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
    // 演習を持たないレッスンは空配列。
    @Default(<int>[]) List<int> exercises,
  }) = _Lesson;

  factory Lesson.fromJson(Map<String, dynamic> json) => _$LessonFromJson(json);
}

/// 説明用のコンテンツページ。1つ以上のブロックを縦に積み上げ、一度に表示する。
///
/// 画像はブロック単位で指定する（[ContentBlock.imageUrl]）。ナレーション音声は
/// ページ単位で1つだけ持つ（[audioUrl]）。
@freezed
class ContentPage with _$ContentPage {
  const factory ContentPage({
    // ページ全体のナレーション音声（任意）。ローカルアセット相対パス
    // （例 lessons/audios/1-1.mp3）。
    String? audioUrl,
    // 縦に積み上げて一度に表示するブロック列（1つ以上）。配列順。
    @Default(<ContentBlock>[]) List<ContentBlock> blocks,
  }) = _ContentPage;

  factory ContentPage.fromJson(Map<String, dynamic> json) =>
      _$ContentPageFromJson(json);
}

/// コンテンツページを構成するブロック。テキストと任意の画像を組み合わせ、
/// ページ内に上から順（配列順）へ積み上げて一度に表示する。
@freezed
class ContentBlock with _$ContentBlock {
  const factory ContentBlock({
    // 本文（Markdown）。空文字も許可（画像だけのブロック等）。
    required String text,
    // このブロックに添える画像（任意）。本文の上に表示する。
    // ローカルアセット相対パス（例 lessons/images/2-1.jpeg）。
    String? imageUrl,
  }) = _ContentBlock;

  factory ContentBlock.fromJson(Map<String, dynamic> json) =>
      _$ContentBlockFromJson(json);
}

/// 確認問題（ミニクイズ）。`type` を discriminator とするフラットなunion。
///
/// 各バリアントは型ごとのフィールドを同階層に持つ（`data:` でネストしない）。
@Freezed(unionKey: 'type')
sealed class LessonQuiz with _$LessonQuiz {
  /// 複数の選択肢から正解を1つ選ぶミニクイズ。
  @FreezedUnionValue('quizMultipleChoice')
  const factory LessonQuiz.multipleChoice({
    // 設問文（Markdown）。
    required String question,
    String? imageUrl,
    required List<String> options,
    // 正解の選択肢インデックス（0始まり）。
    required int correctOptionIndex,
  }) = QuizMultipleChoice;

  /// 問題文中の空欄（`[__]`）を選択肢で順番に穴埋めするミニクイズ。
  @FreezedUnionValue('quizFillInTheBlank')
  const factory LessonQuiz.fillInTheBlank({
    // 問題文。空欄は `[__]` で表現。
    required String question,
    String? imageUrl,
    // 選択肢（同一内容の重複は不可）。options数 ≥ 空欄数。
    required List<String> options,
    // 各空欄の正解。correctOptionIndices[n] = 出現順 n 番目の `[__]` の
    // 正解 = options のインデックス。値は重複しない。
    required List<int> correctOptionIndices,
  }) = QuizFillInTheBlank;

  factory LessonQuiz.fromJson(Map<String, dynamic> json) =>
      _$LessonQuizFromJson(json);
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
