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
/// docs/LESSON.md の `lesson` 構造に対応。`scenes` を配列順に再生し、
/// 末尾に `exercises`（本番演習への参照）を表示する。
@freezed
class Lesson with _$Lesson {
  const factory Lesson({
    required String id,
    required String title,
    // シーンの列。配列順に表示（シーン＝表示のリセット境界）。
    @Default(<LessonScene>[]) List<LessonScene> scenes,
    // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
    // 演習を持たないレッスンは空配列。
    @Default(<int>[]) List<int> exercises,
  }) = _Lesson;

  factory Lesson.fromJson(Map<String, dynamic> json) => _$LessonFromJson(json);
}

/// ナレーションシーンの1ステップ。1タップで1つずつ出現し、シーン内で累積する。
@freezed
class LessonStep with _$LessonStep {
  const factory LessonStep({
    // 本文（Markdown）。空文字も許可。
    required String text,
    // 本文ナレーション音声。ローカルアセット相対パス（例 lessons/audios/2-1.mp3）。
    String? audioUrl,
    // このステップ以降に表示する画像（任意）。指定しないステップは直前の
    // 画像を継承する。どの step も持たなければテキストのみシーン。
    // 切替は左→右のワイプで行う。
    String? imageUrl,
  }) = _LessonStep;

  factory LessonStep.fromJson(Map<String, dynamic> json) =>
      _$LessonStepFromJson(json);
}

/// シーン。`type` を discriminator とするフラットなunion。
///
/// 各バリアントは型ごとのフィールドを同階層に持つ（`data:` でネストしない）。
/// narration はタップで累積表示、quiz は回答UIを伴う。
@Freezed(unionKey: 'type')
sealed class LessonScene with _$LessonScene {
  /// 説明用シーン。1つ以上のステップを持つ。
  ///
  /// 画像は step 単位で指定する（[LessonStep.imageUrl]）。シーンが画像モードか
  /// テキストのみかは「いずれかの step が imageUrl を持つか」で決まる（シーン静的）。
  /// 画像モードのシーンは先頭 step から画像を持つ（途中から画像が出る混在は
  /// データ生成バリデーションで禁止）。
  @FreezedUnionValue('narration')
  const factory LessonScene.narration({
    // タップごとに1つずつ出現し累積するステップ列（1つ以上）。
    @Default(<LessonStep>[]) List<LessonStep> steps,
  }) = NarrationScene;

  /// 複数の選択肢から正解を1つ選ぶミニクイズ。
  @FreezedUnionValue('quizMultipleChoice')
  const factory LessonScene.quizMultipleChoice({
    // 設問文（Markdown）。
    required String question,
    String? imageUrl,
    String? audioUrl,
    required List<String> options,
    // 正解の選択肢インデックス（0始まり）。
    required int correctOptionIndex,
  }) = QuizMultipleChoiceScene;

  /// 問題文中の空欄（`[__]`）を選択肢で順番に穴埋めするミニクイズ。
  @FreezedUnionValue('quizFillInTheBlank')
  const factory LessonScene.quizFillInTheBlank({
    // 問題文。空欄は `[__]` で表現。
    required String question,
    String? imageUrl,
    String? audioUrl,
    // 選択肢（同一内容の重複は不可）。options数 ≥ 空欄数。
    required List<String> options,
    // 各空欄の正解。correctOptionIndices[n] = 出現順 n 番目の `[__]` の
    // 正解 = options のインデックス。値は重複しない。
    required List<int> correctOptionIndices,
  }) = QuizFillInTheBlankScene;

  factory LessonScene.fromJson(Map<String, dynamic> json) =>
      _$LessonSceneFromJson(json);
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
