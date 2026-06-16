// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'content_models.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

ContentSummary _$ContentSummaryFromJson(Map<String, dynamic> json) {
  return _ContentSummary.fromJson(json);
}

/// @nodoc
mixin _$ContentSummary {
  String get id => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;

  /// Serializes this ContentSummary to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ContentSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ContentSummaryCopyWith<ContentSummary> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ContentSummaryCopyWith<$Res> {
  factory $ContentSummaryCopyWith(
    ContentSummary value,
    $Res Function(ContentSummary) then,
  ) = _$ContentSummaryCopyWithImpl<$Res, ContentSummary>;
  @useResult
  $Res call({String id, String title});
}

/// @nodoc
class _$ContentSummaryCopyWithImpl<$Res, $Val extends ContentSummary>
    implements $ContentSummaryCopyWith<$Res> {
  _$ContentSummaryCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ContentSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? title = null}) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            title: null == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ContentSummaryImplCopyWith<$Res>
    implements $ContentSummaryCopyWith<$Res> {
  factory _$$ContentSummaryImplCopyWith(
    _$ContentSummaryImpl value,
    $Res Function(_$ContentSummaryImpl) then,
  ) = __$$ContentSummaryImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, String title});
}

/// @nodoc
class __$$ContentSummaryImplCopyWithImpl<$Res>
    extends _$ContentSummaryCopyWithImpl<$Res, _$ContentSummaryImpl>
    implements _$$ContentSummaryImplCopyWith<$Res> {
  __$$ContentSummaryImplCopyWithImpl(
    _$ContentSummaryImpl _value,
    $Res Function(_$ContentSummaryImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ContentSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? title = null}) {
    return _then(
      _$ContentSummaryImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ContentSummaryImpl implements _ContentSummary {
  const _$ContentSummaryImpl({required this.id, required this.title});

  factory _$ContentSummaryImpl.fromJson(Map<String, dynamic> json) =>
      _$$ContentSummaryImplFromJson(json);

  @override
  final String id;
  @override
  final String title;

  @override
  String toString() {
    return 'ContentSummary(id: $id, title: $title)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ContentSummaryImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, title);

  /// Create a copy of ContentSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ContentSummaryImplCopyWith<_$ContentSummaryImpl> get copyWith =>
      __$$ContentSummaryImplCopyWithImpl<_$ContentSummaryImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$ContentSummaryImplToJson(this);
  }
}

abstract class _ContentSummary implements ContentSummary {
  const factory _ContentSummary({
    required final String id,
    required final String title,
  }) = _$ContentSummaryImpl;

  factory _ContentSummary.fromJson(Map<String, dynamic> json) =
      _$ContentSummaryImpl.fromJson;

  @override
  String get id;
  @override
  String get title;

  /// Create a copy of ContentSummary
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ContentSummaryImplCopyWith<_$ContentSummaryImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ContentIndex _$ContentIndexFromJson(Map<String, dynamic> json) {
  return _ContentIndex.fromJson(json);
}

/// @nodoc
mixin _$ContentIndex {
  List<ContentSummary> get lessons => throw _privateConstructorUsedError;
  List<ContentSummary> get exercises => throw _privateConstructorUsedError;
  List<ContentSummary> get anki => throw _privateConstructorUsedError;

  /// Serializes this ContentIndex to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ContentIndex
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ContentIndexCopyWith<ContentIndex> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ContentIndexCopyWith<$Res> {
  factory $ContentIndexCopyWith(
    ContentIndex value,
    $Res Function(ContentIndex) then,
  ) = _$ContentIndexCopyWithImpl<$Res, ContentIndex>;
  @useResult
  $Res call({
    List<ContentSummary> lessons,
    List<ContentSummary> exercises,
    List<ContentSummary> anki,
  });
}

/// @nodoc
class _$ContentIndexCopyWithImpl<$Res, $Val extends ContentIndex>
    implements $ContentIndexCopyWith<$Res> {
  _$ContentIndexCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ContentIndex
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? lessons = null,
    Object? exercises = null,
    Object? anki = null,
  }) {
    return _then(
      _value.copyWith(
            lessons: null == lessons
                ? _value.lessons
                : lessons // ignore: cast_nullable_to_non_nullable
                      as List<ContentSummary>,
            exercises: null == exercises
                ? _value.exercises
                : exercises // ignore: cast_nullable_to_non_nullable
                      as List<ContentSummary>,
            anki: null == anki
                ? _value.anki
                : anki // ignore: cast_nullable_to_non_nullable
                      as List<ContentSummary>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ContentIndexImplCopyWith<$Res>
    implements $ContentIndexCopyWith<$Res> {
  factory _$$ContentIndexImplCopyWith(
    _$ContentIndexImpl value,
    $Res Function(_$ContentIndexImpl) then,
  ) = __$$ContentIndexImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    List<ContentSummary> lessons,
    List<ContentSummary> exercises,
    List<ContentSummary> anki,
  });
}

/// @nodoc
class __$$ContentIndexImplCopyWithImpl<$Res>
    extends _$ContentIndexCopyWithImpl<$Res, _$ContentIndexImpl>
    implements _$$ContentIndexImplCopyWith<$Res> {
  __$$ContentIndexImplCopyWithImpl(
    _$ContentIndexImpl _value,
    $Res Function(_$ContentIndexImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ContentIndex
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? lessons = null,
    Object? exercises = null,
    Object? anki = null,
  }) {
    return _then(
      _$ContentIndexImpl(
        lessons: null == lessons
            ? _value._lessons
            : lessons // ignore: cast_nullable_to_non_nullable
                  as List<ContentSummary>,
        exercises: null == exercises
            ? _value._exercises
            : exercises // ignore: cast_nullable_to_non_nullable
                  as List<ContentSummary>,
        anki: null == anki
            ? _value._anki
            : anki // ignore: cast_nullable_to_non_nullable
                  as List<ContentSummary>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ContentIndexImpl implements _ContentIndex {
  const _$ContentIndexImpl({
    final List<ContentSummary> lessons = const <ContentSummary>[],
    final List<ContentSummary> exercises = const <ContentSummary>[],
    final List<ContentSummary> anki = const <ContentSummary>[],
  }) : _lessons = lessons,
       _exercises = exercises,
       _anki = anki;

  factory _$ContentIndexImpl.fromJson(Map<String, dynamic> json) =>
      _$$ContentIndexImplFromJson(json);

  final List<ContentSummary> _lessons;
  @override
  @JsonKey()
  List<ContentSummary> get lessons {
    if (_lessons is EqualUnmodifiableListView) return _lessons;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_lessons);
  }

  final List<ContentSummary> _exercises;
  @override
  @JsonKey()
  List<ContentSummary> get exercises {
    if (_exercises is EqualUnmodifiableListView) return _exercises;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_exercises);
  }

  final List<ContentSummary> _anki;
  @override
  @JsonKey()
  List<ContentSummary> get anki {
    if (_anki is EqualUnmodifiableListView) return _anki;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_anki);
  }

  @override
  String toString() {
    return 'ContentIndex(lessons: $lessons, exercises: $exercises, anki: $anki)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ContentIndexImpl &&
            const DeepCollectionEquality().equals(other._lessons, _lessons) &&
            const DeepCollectionEquality().equals(
              other._exercises,
              _exercises,
            ) &&
            const DeepCollectionEquality().equals(other._anki, _anki));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_lessons),
    const DeepCollectionEquality().hash(_exercises),
    const DeepCollectionEquality().hash(_anki),
  );

  /// Create a copy of ContentIndex
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ContentIndexImplCopyWith<_$ContentIndexImpl> get copyWith =>
      __$$ContentIndexImplCopyWithImpl<_$ContentIndexImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ContentIndexImplToJson(this);
  }
}

abstract class _ContentIndex implements ContentIndex {
  const factory _ContentIndex({
    final List<ContentSummary> lessons,
    final List<ContentSummary> exercises,
    final List<ContentSummary> anki,
  }) = _$ContentIndexImpl;

  factory _ContentIndex.fromJson(Map<String, dynamic> json) =
      _$ContentIndexImpl.fromJson;

  @override
  List<ContentSummary> get lessons;
  @override
  List<ContentSummary> get exercises;
  @override
  List<ContentSummary> get anki;

  /// Create a copy of ContentIndex
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ContentIndexImplCopyWith<_$ContentIndexImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Lesson _$LessonFromJson(Map<String, dynamic> json) {
  return _Lesson.fromJson(json);
}

/// @nodoc
mixin _$Lesson {
  String get id => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  String get body => throw _privateConstructorUsedError;

  /// Serializes this Lesson to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Lesson
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LessonCopyWith<Lesson> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LessonCopyWith<$Res> {
  factory $LessonCopyWith(Lesson value, $Res Function(Lesson) then) =
      _$LessonCopyWithImpl<$Res, Lesson>;
  @useResult
  $Res call({String id, String title, String body});
}

/// @nodoc
class _$LessonCopyWithImpl<$Res, $Val extends Lesson>
    implements $LessonCopyWith<$Res> {
  _$LessonCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Lesson
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? title = null, Object? body = null}) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            title: null == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String,
            body: null == body
                ? _value.body
                : body // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$LessonImplCopyWith<$Res> implements $LessonCopyWith<$Res> {
  factory _$$LessonImplCopyWith(
    _$LessonImpl value,
    $Res Function(_$LessonImpl) then,
  ) = __$$LessonImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, String title, String body});
}

/// @nodoc
class __$$LessonImplCopyWithImpl<$Res>
    extends _$LessonCopyWithImpl<$Res, _$LessonImpl>
    implements _$$LessonImplCopyWith<$Res> {
  __$$LessonImplCopyWithImpl(
    _$LessonImpl _value,
    $Res Function(_$LessonImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Lesson
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? title = null, Object? body = null}) {
    return _then(
      _$LessonImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        body: null == body
            ? _value.body
            : body // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$LessonImpl implements _Lesson {
  const _$LessonImpl({required this.id, required this.title, this.body = ''});

  factory _$LessonImpl.fromJson(Map<String, dynamic> json) =>
      _$$LessonImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  @override
  @JsonKey()
  final String body;

  @override
  String toString() {
    return 'Lesson(id: $id, title: $title, body: $body)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LessonImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.body, body) || other.body == body));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, title, body);

  /// Create a copy of Lesson
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LessonImplCopyWith<_$LessonImpl> get copyWith =>
      __$$LessonImplCopyWithImpl<_$LessonImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LessonImplToJson(this);
  }
}

abstract class _Lesson implements Lesson {
  const factory _Lesson({
    required final String id,
    required final String title,
    final String body,
  }) = _$LessonImpl;

  factory _Lesson.fromJson(Map<String, dynamic> json) = _$LessonImpl.fromJson;

  @override
  String get id;
  @override
  String get title;
  @override
  String get body;

  /// Create a copy of Lesson
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LessonImplCopyWith<_$LessonImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ExerciseQuestion _$ExerciseQuestionFromJson(Map<String, dynamic> json) {
  return _ExerciseQuestion.fromJson(json);
}

/// @nodoc
mixin _$ExerciseQuestion {
  String get prompt => throw _privateConstructorUsedError;
  String get answer => throw _privateConstructorUsedError;

  /// Serializes this ExerciseQuestion to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ExerciseQuestion
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ExerciseQuestionCopyWith<ExerciseQuestion> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ExerciseQuestionCopyWith<$Res> {
  factory $ExerciseQuestionCopyWith(
    ExerciseQuestion value,
    $Res Function(ExerciseQuestion) then,
  ) = _$ExerciseQuestionCopyWithImpl<$Res, ExerciseQuestion>;
  @useResult
  $Res call({String prompt, String answer});
}

/// @nodoc
class _$ExerciseQuestionCopyWithImpl<$Res, $Val extends ExerciseQuestion>
    implements $ExerciseQuestionCopyWith<$Res> {
  _$ExerciseQuestionCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ExerciseQuestion
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? prompt = null, Object? answer = null}) {
    return _then(
      _value.copyWith(
            prompt: null == prompt
                ? _value.prompt
                : prompt // ignore: cast_nullable_to_non_nullable
                      as String,
            answer: null == answer
                ? _value.answer
                : answer // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ExerciseQuestionImplCopyWith<$Res>
    implements $ExerciseQuestionCopyWith<$Res> {
  factory _$$ExerciseQuestionImplCopyWith(
    _$ExerciseQuestionImpl value,
    $Res Function(_$ExerciseQuestionImpl) then,
  ) = __$$ExerciseQuestionImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String prompt, String answer});
}

/// @nodoc
class __$$ExerciseQuestionImplCopyWithImpl<$Res>
    extends _$ExerciseQuestionCopyWithImpl<$Res, _$ExerciseQuestionImpl>
    implements _$$ExerciseQuestionImplCopyWith<$Res> {
  __$$ExerciseQuestionImplCopyWithImpl(
    _$ExerciseQuestionImpl _value,
    $Res Function(_$ExerciseQuestionImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ExerciseQuestion
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? prompt = null, Object? answer = null}) {
    return _then(
      _$ExerciseQuestionImpl(
        prompt: null == prompt
            ? _value.prompt
            : prompt // ignore: cast_nullable_to_non_nullable
                  as String,
        answer: null == answer
            ? _value.answer
            : answer // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ExerciseQuestionImpl implements _ExerciseQuestion {
  const _$ExerciseQuestionImpl({required this.prompt, required this.answer});

  factory _$ExerciseQuestionImpl.fromJson(Map<String, dynamic> json) =>
      _$$ExerciseQuestionImplFromJson(json);

  @override
  final String prompt;
  @override
  final String answer;

  @override
  String toString() {
    return 'ExerciseQuestion(prompt: $prompt, answer: $answer)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ExerciseQuestionImpl &&
            (identical(other.prompt, prompt) || other.prompt == prompt) &&
            (identical(other.answer, answer) || other.answer == answer));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, prompt, answer);

  /// Create a copy of ExerciseQuestion
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ExerciseQuestionImplCopyWith<_$ExerciseQuestionImpl> get copyWith =>
      __$$ExerciseQuestionImplCopyWithImpl<_$ExerciseQuestionImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$ExerciseQuestionImplToJson(this);
  }
}

abstract class _ExerciseQuestion implements ExerciseQuestion {
  const factory _ExerciseQuestion({
    required final String prompt,
    required final String answer,
  }) = _$ExerciseQuestionImpl;

  factory _ExerciseQuestion.fromJson(Map<String, dynamic> json) =
      _$ExerciseQuestionImpl.fromJson;

  @override
  String get prompt;
  @override
  String get answer;

  /// Create a copy of ExerciseQuestion
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ExerciseQuestionImplCopyWith<_$ExerciseQuestionImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Exercise _$ExerciseFromJson(Map<String, dynamic> json) {
  return _Exercise.fromJson(json);
}

/// @nodoc
mixin _$Exercise {
  String get id => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  List<ExerciseQuestion> get questions => throw _privateConstructorUsedError;

  /// Serializes this Exercise to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Exercise
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ExerciseCopyWith<Exercise> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ExerciseCopyWith<$Res> {
  factory $ExerciseCopyWith(Exercise value, $Res Function(Exercise) then) =
      _$ExerciseCopyWithImpl<$Res, Exercise>;
  @useResult
  $Res call({String id, String title, List<ExerciseQuestion> questions});
}

/// @nodoc
class _$ExerciseCopyWithImpl<$Res, $Val extends Exercise>
    implements $ExerciseCopyWith<$Res> {
  _$ExerciseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Exercise
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? questions = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            title: null == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String,
            questions: null == questions
                ? _value.questions
                : questions // ignore: cast_nullable_to_non_nullable
                      as List<ExerciseQuestion>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ExerciseImplCopyWith<$Res>
    implements $ExerciseCopyWith<$Res> {
  factory _$$ExerciseImplCopyWith(
    _$ExerciseImpl value,
    $Res Function(_$ExerciseImpl) then,
  ) = __$$ExerciseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, String title, List<ExerciseQuestion> questions});
}

/// @nodoc
class __$$ExerciseImplCopyWithImpl<$Res>
    extends _$ExerciseCopyWithImpl<$Res, _$ExerciseImpl>
    implements _$$ExerciseImplCopyWith<$Res> {
  __$$ExerciseImplCopyWithImpl(
    _$ExerciseImpl _value,
    $Res Function(_$ExerciseImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Exercise
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? questions = null,
  }) {
    return _then(
      _$ExerciseImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        questions: null == questions
            ? _value._questions
            : questions // ignore: cast_nullable_to_non_nullable
                  as List<ExerciseQuestion>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ExerciseImpl implements _Exercise {
  const _$ExerciseImpl({
    required this.id,
    required this.title,
    final List<ExerciseQuestion> questions = const <ExerciseQuestion>[],
  }) : _questions = questions;

  factory _$ExerciseImpl.fromJson(Map<String, dynamic> json) =>
      _$$ExerciseImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  final List<ExerciseQuestion> _questions;
  @override
  @JsonKey()
  List<ExerciseQuestion> get questions {
    if (_questions is EqualUnmodifiableListView) return _questions;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_questions);
  }

  @override
  String toString() {
    return 'Exercise(id: $id, title: $title, questions: $questions)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ExerciseImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            const DeepCollectionEquality().equals(
              other._questions,
              _questions,
            ));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    title,
    const DeepCollectionEquality().hash(_questions),
  );

  /// Create a copy of Exercise
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ExerciseImplCopyWith<_$ExerciseImpl> get copyWith =>
      __$$ExerciseImplCopyWithImpl<_$ExerciseImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ExerciseImplToJson(this);
  }
}

abstract class _Exercise implements Exercise {
  const factory _Exercise({
    required final String id,
    required final String title,
    final List<ExerciseQuestion> questions,
  }) = _$ExerciseImpl;

  factory _Exercise.fromJson(Map<String, dynamic> json) =
      _$ExerciseImpl.fromJson;

  @override
  String get id;
  @override
  String get title;
  @override
  List<ExerciseQuestion> get questions;

  /// Create a copy of Exercise
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ExerciseImplCopyWith<_$ExerciseImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

AnkiCard _$AnkiCardFromJson(Map<String, dynamic> json) {
  return _AnkiCard.fromJson(json);
}

/// @nodoc
mixin _$AnkiCard {
  String get front => throw _privateConstructorUsedError;
  String get back => throw _privateConstructorUsedError;

  /// Serializes this AnkiCard to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AnkiCard
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AnkiCardCopyWith<AnkiCard> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AnkiCardCopyWith<$Res> {
  factory $AnkiCardCopyWith(AnkiCard value, $Res Function(AnkiCard) then) =
      _$AnkiCardCopyWithImpl<$Res, AnkiCard>;
  @useResult
  $Res call({String front, String back});
}

/// @nodoc
class _$AnkiCardCopyWithImpl<$Res, $Val extends AnkiCard>
    implements $AnkiCardCopyWith<$Res> {
  _$AnkiCardCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AnkiCard
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? front = null, Object? back = null}) {
    return _then(
      _value.copyWith(
            front: null == front
                ? _value.front
                : front // ignore: cast_nullable_to_non_nullable
                      as String,
            back: null == back
                ? _value.back
                : back // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$AnkiCardImplCopyWith<$Res>
    implements $AnkiCardCopyWith<$Res> {
  factory _$$AnkiCardImplCopyWith(
    _$AnkiCardImpl value,
    $Res Function(_$AnkiCardImpl) then,
  ) = __$$AnkiCardImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String front, String back});
}

/// @nodoc
class __$$AnkiCardImplCopyWithImpl<$Res>
    extends _$AnkiCardCopyWithImpl<$Res, _$AnkiCardImpl>
    implements _$$AnkiCardImplCopyWith<$Res> {
  __$$AnkiCardImplCopyWithImpl(
    _$AnkiCardImpl _value,
    $Res Function(_$AnkiCardImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of AnkiCard
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? front = null, Object? back = null}) {
    return _then(
      _$AnkiCardImpl(
        front: null == front
            ? _value.front
            : front // ignore: cast_nullable_to_non_nullable
                  as String,
        back: null == back
            ? _value.back
            : back // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$AnkiCardImpl implements _AnkiCard {
  const _$AnkiCardImpl({required this.front, required this.back});

  factory _$AnkiCardImpl.fromJson(Map<String, dynamic> json) =>
      _$$AnkiCardImplFromJson(json);

  @override
  final String front;
  @override
  final String back;

  @override
  String toString() {
    return 'AnkiCard(front: $front, back: $back)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AnkiCardImpl &&
            (identical(other.front, front) || other.front == front) &&
            (identical(other.back, back) || other.back == back));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, front, back);

  /// Create a copy of AnkiCard
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AnkiCardImplCopyWith<_$AnkiCardImpl> get copyWith =>
      __$$AnkiCardImplCopyWithImpl<_$AnkiCardImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AnkiCardImplToJson(this);
  }
}

abstract class _AnkiCard implements AnkiCard {
  const factory _AnkiCard({
    required final String front,
    required final String back,
  }) = _$AnkiCardImpl;

  factory _AnkiCard.fromJson(Map<String, dynamic> json) =
      _$AnkiCardImpl.fromJson;

  @override
  String get front;
  @override
  String get back;

  /// Create a copy of AnkiCard
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AnkiCardImplCopyWith<_$AnkiCardImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

AnkiDeck _$AnkiDeckFromJson(Map<String, dynamic> json) {
  return _AnkiDeck.fromJson(json);
}

/// @nodoc
mixin _$AnkiDeck {
  String get id => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  List<AnkiCard> get cards => throw _privateConstructorUsedError;

  /// Serializes this AnkiDeck to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AnkiDeck
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AnkiDeckCopyWith<AnkiDeck> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AnkiDeckCopyWith<$Res> {
  factory $AnkiDeckCopyWith(AnkiDeck value, $Res Function(AnkiDeck) then) =
      _$AnkiDeckCopyWithImpl<$Res, AnkiDeck>;
  @useResult
  $Res call({String id, String title, List<AnkiCard> cards});
}

/// @nodoc
class _$AnkiDeckCopyWithImpl<$Res, $Val extends AnkiDeck>
    implements $AnkiDeckCopyWith<$Res> {
  _$AnkiDeckCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AnkiDeck
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? title = null, Object? cards = null}) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            title: null == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String,
            cards: null == cards
                ? _value.cards
                : cards // ignore: cast_nullable_to_non_nullable
                      as List<AnkiCard>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$AnkiDeckImplCopyWith<$Res>
    implements $AnkiDeckCopyWith<$Res> {
  factory _$$AnkiDeckImplCopyWith(
    _$AnkiDeckImpl value,
    $Res Function(_$AnkiDeckImpl) then,
  ) = __$$AnkiDeckImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, String title, List<AnkiCard> cards});
}

/// @nodoc
class __$$AnkiDeckImplCopyWithImpl<$Res>
    extends _$AnkiDeckCopyWithImpl<$Res, _$AnkiDeckImpl>
    implements _$$AnkiDeckImplCopyWith<$Res> {
  __$$AnkiDeckImplCopyWithImpl(
    _$AnkiDeckImpl _value,
    $Res Function(_$AnkiDeckImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of AnkiDeck
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? title = null, Object? cards = null}) {
    return _then(
      _$AnkiDeckImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        cards: null == cards
            ? _value._cards
            : cards // ignore: cast_nullable_to_non_nullable
                  as List<AnkiCard>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$AnkiDeckImpl implements _AnkiDeck {
  const _$AnkiDeckImpl({
    required this.id,
    required this.title,
    final List<AnkiCard> cards = const <AnkiCard>[],
  }) : _cards = cards;

  factory _$AnkiDeckImpl.fromJson(Map<String, dynamic> json) =>
      _$$AnkiDeckImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  final List<AnkiCard> _cards;
  @override
  @JsonKey()
  List<AnkiCard> get cards {
    if (_cards is EqualUnmodifiableListView) return _cards;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_cards);
  }

  @override
  String toString() {
    return 'AnkiDeck(id: $id, title: $title, cards: $cards)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AnkiDeckImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            const DeepCollectionEquality().equals(other._cards, _cards));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    title,
    const DeepCollectionEquality().hash(_cards),
  );

  /// Create a copy of AnkiDeck
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AnkiDeckImplCopyWith<_$AnkiDeckImpl> get copyWith =>
      __$$AnkiDeckImplCopyWithImpl<_$AnkiDeckImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AnkiDeckImplToJson(this);
  }
}

abstract class _AnkiDeck implements AnkiDeck {
  const factory _AnkiDeck({
    required final String id,
    required final String title,
    final List<AnkiCard> cards,
  }) = _$AnkiDeckImpl;

  factory _AnkiDeck.fromJson(Map<String, dynamic> json) =
      _$AnkiDeckImpl.fromJson;

  @override
  String get id;
  @override
  String get title;
  @override
  List<AnkiCard> get cards;

  /// Create a copy of AnkiDeck
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AnkiDeckImplCopyWith<_$AnkiDeckImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
