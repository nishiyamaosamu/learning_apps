// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'content_models.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ContentSummaryImpl _$$ContentSummaryImplFromJson(Map<String, dynamic> json) =>
    _$ContentSummaryImpl(
      id: json['id'] as String,
      title: json['title'] as String,
    );

Map<String, dynamic> _$$ContentSummaryImplToJson(
  _$ContentSummaryImpl instance,
) => <String, dynamic>{'id': instance.id, 'title': instance.title};

_$ContentIndexImpl _$$ContentIndexImplFromJson(Map<String, dynamic> json) =>
    _$ContentIndexImpl(
      lessons:
          (json['lessons'] as List<dynamic>?)
              ?.map((e) => ContentSummary.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const <ContentSummary>[],
      exercises:
          (json['exercises'] as List<dynamic>?)
              ?.map((e) => ContentSummary.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const <ContentSummary>[],
      anki:
          (json['anki'] as List<dynamic>?)
              ?.map((e) => ContentSummary.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const <ContentSummary>[],
    );

Map<String, dynamic> _$$ContentIndexImplToJson(_$ContentIndexImpl instance) =>
    <String, dynamic>{
      'lessons': instance.lessons,
      'exercises': instance.exercises,
      'anki': instance.anki,
    };

_$LessonImpl _$$LessonImplFromJson(Map<String, dynamic> json) => _$LessonImpl(
  id: json['id'] as String,
  title: json['title'] as String,
  body: json['body'] as String? ?? '',
);

Map<String, dynamic> _$$LessonImplToJson(_$LessonImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'body': instance.body,
    };

_$ExerciseQuestionImpl _$$ExerciseQuestionImplFromJson(
  Map<String, dynamic> json,
) => _$ExerciseQuestionImpl(
  prompt: json['prompt'] as String,
  answer: json['answer'] as String,
);

Map<String, dynamic> _$$ExerciseQuestionImplToJson(
  _$ExerciseQuestionImpl instance,
) => <String, dynamic>{'prompt': instance.prompt, 'answer': instance.answer};

_$ExerciseImpl _$$ExerciseImplFromJson(Map<String, dynamic> json) =>
    _$ExerciseImpl(
      id: json['id'] as String,
      title: json['title'] as String,
      questions:
          (json['questions'] as List<dynamic>?)
              ?.map((e) => ExerciseQuestion.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const <ExerciseQuestion>[],
    );

Map<String, dynamic> _$$ExerciseImplToJson(_$ExerciseImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'questions': instance.questions,
    };

_$AnkiCardImpl _$$AnkiCardImplFromJson(Map<String, dynamic> json) =>
    _$AnkiCardImpl(
      front: json['front'] as String,
      back: json['back'] as String,
    );

Map<String, dynamic> _$$AnkiCardImplToJson(_$AnkiCardImpl instance) =>
    <String, dynamic>{'front': instance.front, 'back': instance.back};

_$AnkiDeckImpl _$$AnkiDeckImplFromJson(Map<String, dynamic> json) =>
    _$AnkiDeckImpl(
      id: json['id'] as String,
      title: json['title'] as String,
      cards:
          (json['cards'] as List<dynamic>?)
              ?.map((e) => AnkiCard.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const <AnkiCard>[],
    );

Map<String, dynamic> _$$AnkiDeckImplToJson(_$AnkiDeckImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'cards': instance.cards,
    };
