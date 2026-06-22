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
  scenes:
      (json['scenes'] as List<dynamic>?)
          ?.map((e) => LessonScene.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const <LessonScene>[],
  exercises:
      (json['exercises'] as List<dynamic>?)
          ?.map((e) => (e as num).toInt())
          .toList() ??
      const <int>[],
);

Map<String, dynamic> _$$LessonImplToJson(_$LessonImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'scenes': instance.scenes,
      'exercises': instance.exercises,
    };

_$LessonStepImpl _$$LessonStepImplFromJson(Map<String, dynamic> json) =>
    _$LessonStepImpl(
      text: json['text'] as String,
      audioUrl: json['audioUrl'] as String?,
      imageUrl: json['imageUrl'] as String?,
    );

Map<String, dynamic> _$$LessonStepImplToJson(_$LessonStepImpl instance) =>
    <String, dynamic>{
      'text': instance.text,
      'audioUrl': instance.audioUrl,
      'imageUrl': instance.imageUrl,
    };

_$NarrationSceneImpl _$$NarrationSceneImplFromJson(Map<String, dynamic> json) =>
    _$NarrationSceneImpl(
      steps:
          (json['steps'] as List<dynamic>?)
              ?.map((e) => LessonStep.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const <LessonStep>[],
      $type: json['type'] as String?,
    );

Map<String, dynamic> _$$NarrationSceneImplToJson(
  _$NarrationSceneImpl instance,
) => <String, dynamic>{'steps': instance.steps, 'type': instance.$type};

_$QuizMultipleChoiceSceneImpl _$$QuizMultipleChoiceSceneImplFromJson(
  Map<String, dynamic> json,
) => _$QuizMultipleChoiceSceneImpl(
  question: json['question'] as String,
  imageUrl: json['imageUrl'] as String?,
  audioUrl: json['audioUrl'] as String?,
  options: (json['options'] as List<dynamic>).map((e) => e as String).toList(),
  correctOptionIndex: (json['correctOptionIndex'] as num).toInt(),
  $type: json['type'] as String?,
);

Map<String, dynamic> _$$QuizMultipleChoiceSceneImplToJson(
  _$QuizMultipleChoiceSceneImpl instance,
) => <String, dynamic>{
  'question': instance.question,
  'imageUrl': instance.imageUrl,
  'audioUrl': instance.audioUrl,
  'options': instance.options,
  'correctOptionIndex': instance.correctOptionIndex,
  'type': instance.$type,
};

_$QuizFillInTheBlankSceneImpl _$$QuizFillInTheBlankSceneImplFromJson(
  Map<String, dynamic> json,
) => _$QuizFillInTheBlankSceneImpl(
  question: json['question'] as String,
  imageUrl: json['imageUrl'] as String?,
  audioUrl: json['audioUrl'] as String?,
  options: (json['options'] as List<dynamic>).map((e) => e as String).toList(),
  correctOptionIndices: (json['correctOptionIndices'] as List<dynamic>)
      .map((e) => (e as num).toInt())
      .toList(),
  $type: json['type'] as String?,
);

Map<String, dynamic> _$$QuizFillInTheBlankSceneImplToJson(
  _$QuizFillInTheBlankSceneImpl instance,
) => <String, dynamic>{
  'question': instance.question,
  'imageUrl': instance.imageUrl,
  'audioUrl': instance.audioUrl,
  'options': instance.options,
  'correctOptionIndices': instance.correctOptionIndices,
  'type': instance.$type,
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
