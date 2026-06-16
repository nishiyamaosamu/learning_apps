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

/// 講座内容。contents/lessons/{id}.json を都度ロード。
@freezed
class Lesson with _$Lesson {
  const factory Lesson({
    required String id,
    required String title,
    @Default('') String body,
  }) = _Lesson;

  factory Lesson.fromJson(Map<String, dynamic> json) => _$LessonFromJson(json);
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
