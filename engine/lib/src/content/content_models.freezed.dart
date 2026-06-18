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
  String get title =>
      throw _privateConstructorUsedError; // シーンの列。配列順に表示（シーン＝表示のリセット境界）。
  List<LessonScene> get scenes =>
      throw _privateConstructorUsedError; // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
  // 演習を持たないレッスンは空配列。
  List<int> get exercises => throw _privateConstructorUsedError;

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
  $Res call({
    String id,
    String title,
    List<LessonScene> scenes,
    List<int> exercises,
  });
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
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? scenes = null,
    Object? exercises = null,
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
            scenes: null == scenes
                ? _value.scenes
                : scenes // ignore: cast_nullable_to_non_nullable
                      as List<LessonScene>,
            exercises: null == exercises
                ? _value.exercises
                : exercises // ignore: cast_nullable_to_non_nullable
                      as List<int>,
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
  $Res call({
    String id,
    String title,
    List<LessonScene> scenes,
    List<int> exercises,
  });
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
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? scenes = null,
    Object? exercises = null,
  }) {
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
        scenes: null == scenes
            ? _value._scenes
            : scenes // ignore: cast_nullable_to_non_nullable
                  as List<LessonScene>,
        exercises: null == exercises
            ? _value._exercises
            : exercises // ignore: cast_nullable_to_non_nullable
                  as List<int>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$LessonImpl implements _Lesson {
  const _$LessonImpl({
    required this.id,
    required this.title,
    final List<LessonScene> scenes = const <LessonScene>[],
    final List<int> exercises = const <int>[],
  }) : _scenes = scenes,
       _exercises = exercises;

  factory _$LessonImpl.fromJson(Map<String, dynamic> json) =>
      _$$LessonImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  // シーンの列。配列順に表示（シーン＝表示のリセット境界）。
  final List<LessonScene> _scenes;
  // シーンの列。配列順に表示（シーン＝表示のリセット境界）。
  @override
  @JsonKey()
  List<LessonScene> get scenes {
    if (_scenes is EqualUnmodifiableListView) return _scenes;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_scenes);
  }

  // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
  // 演習を持たないレッスンは空配列。
  final List<int> _exercises;
  // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
  // 演習を持たないレッスンは空配列。
  @override
  @JsonKey()
  List<int> get exercises {
    if (_exercises is EqualUnmodifiableListView) return _exercises;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_exercises);
  }

  @override
  String toString() {
    return 'Lesson(id: $id, title: $title, scenes: $scenes, exercises: $exercises)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LessonImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            const DeepCollectionEquality().equals(other._scenes, _scenes) &&
            const DeepCollectionEquality().equals(
              other._exercises,
              _exercises,
            ));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    title,
    const DeepCollectionEquality().hash(_scenes),
    const DeepCollectionEquality().hash(_exercises),
  );

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
    final List<LessonScene> scenes,
    final List<int> exercises,
  }) = _$LessonImpl;

  factory _Lesson.fromJson(Map<String, dynamic> json) = _$LessonImpl.fromJson;

  @override
  String get id;
  @override
  String get title; // シーンの列。配列順に表示（シーン＝表示のリセット境界）。
  @override
  List<LessonScene> get scenes; // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
  // 演習を持たないレッスンは空配列。
  @override
  List<int> get exercises;

  /// Create a copy of Lesson
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LessonImplCopyWith<_$LessonImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

LessonStep _$LessonStepFromJson(Map<String, dynamic> json) {
  return _LessonStep.fromJson(json);
}

/// @nodoc
mixin _$LessonStep {
  // 本文（Markdown）。空文字も許可。
  String get text =>
      throw _privateConstructorUsedError; // 本文ナレーション音声。ローカルアセット相対パス（例 lessons/audios/2-1.mp3）。
  String? get audioUrl =>
      throw _privateConstructorUsedError; // このステップ以降に表示する画像（任意）。指定しないステップは直前の
  // 画像を継承する。どの step も持たなければテキストのみシーン。
  // 切替は左→右のワイプで行う。
  String? get imageUrl =>
      throw _privateConstructorUsedError; // アニメモードのシーンで、このステップ表示時にアニメを進める phase
  // （0始まり・任意）。省略時は直前ステップの値を継承（先頭省略は0）。
  // シーンの `animationKey` と組で使う（→ [NarrationScene.animationKey]）。
  int? get animationStep => throw _privateConstructorUsedError;

  /// Serializes this LessonStep to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LessonStep
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LessonStepCopyWith<LessonStep> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LessonStepCopyWith<$Res> {
  factory $LessonStepCopyWith(
    LessonStep value,
    $Res Function(LessonStep) then,
  ) = _$LessonStepCopyWithImpl<$Res, LessonStep>;
  @useResult
  $Res call({
    String text,
    String? audioUrl,
    String? imageUrl,
    int? animationStep,
  });
}

/// @nodoc
class _$LessonStepCopyWithImpl<$Res, $Val extends LessonStep>
    implements $LessonStepCopyWith<$Res> {
  _$LessonStepCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LessonStep
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? text = null,
    Object? audioUrl = freezed,
    Object? imageUrl = freezed,
    Object? animationStep = freezed,
  }) {
    return _then(
      _value.copyWith(
            text: null == text
                ? _value.text
                : text // ignore: cast_nullable_to_non_nullable
                      as String,
            audioUrl: freezed == audioUrl
                ? _value.audioUrl
                : audioUrl // ignore: cast_nullable_to_non_nullable
                      as String?,
            imageUrl: freezed == imageUrl
                ? _value.imageUrl
                : imageUrl // ignore: cast_nullable_to_non_nullable
                      as String?,
            animationStep: freezed == animationStep
                ? _value.animationStep
                : animationStep // ignore: cast_nullable_to_non_nullable
                      as int?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$LessonStepImplCopyWith<$Res>
    implements $LessonStepCopyWith<$Res> {
  factory _$$LessonStepImplCopyWith(
    _$LessonStepImpl value,
    $Res Function(_$LessonStepImpl) then,
  ) = __$$LessonStepImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String text,
    String? audioUrl,
    String? imageUrl,
    int? animationStep,
  });
}

/// @nodoc
class __$$LessonStepImplCopyWithImpl<$Res>
    extends _$LessonStepCopyWithImpl<$Res, _$LessonStepImpl>
    implements _$$LessonStepImplCopyWith<$Res> {
  __$$LessonStepImplCopyWithImpl(
    _$LessonStepImpl _value,
    $Res Function(_$LessonStepImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonStep
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? text = null,
    Object? audioUrl = freezed,
    Object? imageUrl = freezed,
    Object? animationStep = freezed,
  }) {
    return _then(
      _$LessonStepImpl(
        text: null == text
            ? _value.text
            : text // ignore: cast_nullable_to_non_nullable
                  as String,
        audioUrl: freezed == audioUrl
            ? _value.audioUrl
            : audioUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        imageUrl: freezed == imageUrl
            ? _value.imageUrl
            : imageUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        animationStep: freezed == animationStep
            ? _value.animationStep
            : animationStep // ignore: cast_nullable_to_non_nullable
                  as int?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$LessonStepImpl implements _LessonStep {
  const _$LessonStepImpl({
    required this.text,
    this.audioUrl,
    this.imageUrl,
    this.animationStep,
  });

  factory _$LessonStepImpl.fromJson(Map<String, dynamic> json) =>
      _$$LessonStepImplFromJson(json);

  // 本文（Markdown）。空文字も許可。
  @override
  final String text;
  // 本文ナレーション音声。ローカルアセット相対パス（例 lessons/audios/2-1.mp3）。
  @override
  final String? audioUrl;
  // このステップ以降に表示する画像（任意）。指定しないステップは直前の
  // 画像を継承する。どの step も持たなければテキストのみシーン。
  // 切替は左→右のワイプで行う。
  @override
  final String? imageUrl;
  // アニメモードのシーンで、このステップ表示時にアニメを進める phase
  // （0始まり・任意）。省略時は直前ステップの値を継承（先頭省略は0）。
  // シーンの `animationKey` と組で使う（→ [NarrationScene.animationKey]）。
  @override
  final int? animationStep;

  @override
  String toString() {
    return 'LessonStep(text: $text, audioUrl: $audioUrl, imageUrl: $imageUrl, animationStep: $animationStep)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LessonStepImpl &&
            (identical(other.text, text) || other.text == text) &&
            (identical(other.audioUrl, audioUrl) ||
                other.audioUrl == audioUrl) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl) &&
            (identical(other.animationStep, animationStep) ||
                other.animationStep == animationStep));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, text, audioUrl, imageUrl, animationStep);

  /// Create a copy of LessonStep
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LessonStepImplCopyWith<_$LessonStepImpl> get copyWith =>
      __$$LessonStepImplCopyWithImpl<_$LessonStepImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LessonStepImplToJson(this);
  }
}

abstract class _LessonStep implements LessonStep {
  const factory _LessonStep({
    required final String text,
    final String? audioUrl,
    final String? imageUrl,
    final int? animationStep,
  }) = _$LessonStepImpl;

  factory _LessonStep.fromJson(Map<String, dynamic> json) =
      _$LessonStepImpl.fromJson;

  // 本文（Markdown）。空文字も許可。
  @override
  String get text; // 本文ナレーション音声。ローカルアセット相対パス（例 lessons/audios/2-1.mp3）。
  @override
  String? get audioUrl; // このステップ以降に表示する画像（任意）。指定しないステップは直前の
  // 画像を継承する。どの step も持たなければテキストのみシーン。
  // 切替は左→右のワイプで行う。
  @override
  String? get imageUrl; // アニメモードのシーンで、このステップ表示時にアニメを進める phase
  // （0始まり・任意）。省略時は直前ステップの値を継承（先頭省略は0）。
  // シーンの `animationKey` と組で使う（→ [NarrationScene.animationKey]）。
  @override
  int? get animationStep;

  /// Create a copy of LessonStep
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LessonStepImplCopyWith<_$LessonStepImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

LessonScene _$LessonSceneFromJson(Map<String, dynamic> json) {
  switch (json['type']) {
    case 'narration':
      return NarrationScene.fromJson(json);
    case 'quizMultipleChoice':
      return QuizMultipleChoiceScene.fromJson(json);
    case 'quizFillInTheBlank':
      return QuizFillInTheBlankScene.fromJson(json);

    default:
      throw CheckedFromJsonException(
        json,
        'type',
        'LessonScene',
        'Invalid union type "${json['type']}"!',
      );
  }
}

/// @nodoc
mixin _$LessonScene {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(List<LessonStep> steps, String? animationKey)
    narration,
    required TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )
    quizMultipleChoice,
    required TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )
    quizFillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(List<LessonStep> steps, String? animationKey)? narration,
    TResult? Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    quizMultipleChoice,
    TResult? Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(List<LessonStep> steps, String? animationKey)? narration,
    TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    quizMultipleChoice,
    TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
    required TResult orElse(),
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(NarrationScene value) narration,
    required TResult Function(QuizMultipleChoiceScene value) quizMultipleChoice,
    required TResult Function(QuizFillInTheBlankScene value) quizFillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NarrationScene value)? narration,
    TResult? Function(QuizMultipleChoiceScene value)? quizMultipleChoice,
    TResult? Function(QuizFillInTheBlankScene value)? quizFillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NarrationScene value)? narration,
    TResult Function(QuizMultipleChoiceScene value)? quizMultipleChoice,
    TResult Function(QuizFillInTheBlankScene value)? quizFillInTheBlank,
    required TResult orElse(),
  }) => throw _privateConstructorUsedError;

  /// Serializes this LessonScene to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LessonSceneCopyWith<$Res> {
  factory $LessonSceneCopyWith(
    LessonScene value,
    $Res Function(LessonScene) then,
  ) = _$LessonSceneCopyWithImpl<$Res, LessonScene>;
}

/// @nodoc
class _$LessonSceneCopyWithImpl<$Res, $Val extends LessonScene>
    implements $LessonSceneCopyWith<$Res> {
  _$LessonSceneCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
}

/// @nodoc
abstract class _$$NarrationSceneImplCopyWith<$Res> {
  factory _$$NarrationSceneImplCopyWith(
    _$NarrationSceneImpl value,
    $Res Function(_$NarrationSceneImpl) then,
  ) = __$$NarrationSceneImplCopyWithImpl<$Res>;
  @useResult
  $Res call({List<LessonStep> steps, String? animationKey});
}

/// @nodoc
class __$$NarrationSceneImplCopyWithImpl<$Res>
    extends _$LessonSceneCopyWithImpl<$Res, _$NarrationSceneImpl>
    implements _$$NarrationSceneImplCopyWith<$Res> {
  __$$NarrationSceneImplCopyWithImpl(
    _$NarrationSceneImpl _value,
    $Res Function(_$NarrationSceneImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? steps = null, Object? animationKey = freezed}) {
    return _then(
      _$NarrationSceneImpl(
        steps: null == steps
            ? _value._steps
            : steps // ignore: cast_nullable_to_non_nullable
                  as List<LessonStep>,
        animationKey: freezed == animationKey
            ? _value.animationKey
            : animationKey // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$NarrationSceneImpl implements NarrationScene {
  const _$NarrationSceneImpl({
    final List<LessonStep> steps = const <LessonStep>[],
    this.animationKey,
    final String? $type,
  }) : _steps = steps,
       $type = $type ?? 'narration';

  factory _$NarrationSceneImpl.fromJson(Map<String, dynamic> json) =>
      _$$NarrationSceneImplFromJson(json);

  // タップごとに1つずつ出現し累積するステップ列（1つ以上）。
  final List<LessonStep> _steps;
  // タップごとに1つずつ出現し累積するステップ列（1つ以上）。
  @override
  @JsonKey()
  List<LessonStep> get steps {
    if (_steps is EqualUnmodifiableListView) return _steps;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_steps);
  }

  // 図解アニメのキー（任意・シーン単位）。指定すると「アニメモード」になり、
  // 上部固定枠に [AppConfig.animations] で解決したウィジェットを表示し、
  // 各ステップの `animationStep` で phase を進める。未登録キーや null は
  // 通常の画像/テキスト表示にフォールバックする。
  // アニメモードと画像モードが両立する場合はアニメを優先する。
  @override
  final String? animationKey;

  @JsonKey(name: 'type')
  final String $type;

  @override
  String toString() {
    return 'LessonScene.narration(steps: $steps, animationKey: $animationKey)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NarrationSceneImpl &&
            const DeepCollectionEquality().equals(other._steps, _steps) &&
            (identical(other.animationKey, animationKey) ||
                other.animationKey == animationKey));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_steps),
    animationKey,
  );

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NarrationSceneImplCopyWith<_$NarrationSceneImpl> get copyWith =>
      __$$NarrationSceneImplCopyWithImpl<_$NarrationSceneImpl>(
        this,
        _$identity,
      );

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(List<LessonStep> steps, String? animationKey)
    narration,
    required TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )
    quizMultipleChoice,
    required TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )
    quizFillInTheBlank,
  }) {
    return narration(steps, animationKey);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(List<LessonStep> steps, String? animationKey)? narration,
    TResult? Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    quizMultipleChoice,
    TResult? Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
  }) {
    return narration?.call(steps, animationKey);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(List<LessonStep> steps, String? animationKey)? narration,
    TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    quizMultipleChoice,
    TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (narration != null) {
      return narration(steps, animationKey);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(NarrationScene value) narration,
    required TResult Function(QuizMultipleChoiceScene value) quizMultipleChoice,
    required TResult Function(QuizFillInTheBlankScene value) quizFillInTheBlank,
  }) {
    return narration(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NarrationScene value)? narration,
    TResult? Function(QuizMultipleChoiceScene value)? quizMultipleChoice,
    TResult? Function(QuizFillInTheBlankScene value)? quizFillInTheBlank,
  }) {
    return narration?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NarrationScene value)? narration,
    TResult Function(QuizMultipleChoiceScene value)? quizMultipleChoice,
    TResult Function(QuizFillInTheBlankScene value)? quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (narration != null) {
      return narration(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$NarrationSceneImplToJson(this);
  }
}

abstract class NarrationScene implements LessonScene {
  const factory NarrationScene({
    final List<LessonStep> steps,
    final String? animationKey,
  }) = _$NarrationSceneImpl;

  factory NarrationScene.fromJson(Map<String, dynamic> json) =
      _$NarrationSceneImpl.fromJson;

  // タップごとに1つずつ出現し累積するステップ列（1つ以上）。
  List<LessonStep> get steps; // 図解アニメのキー（任意・シーン単位）。指定すると「アニメモード」になり、
  // 上部固定枠に [AppConfig.animations] で解決したウィジェットを表示し、
  // 各ステップの `animationStep` で phase を進める。未登録キーや null は
  // 通常の画像/テキスト表示にフォールバックする。
  // アニメモードと画像モードが両立する場合はアニメを優先する。
  String? get animationKey;

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NarrationSceneImplCopyWith<_$NarrationSceneImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$QuizMultipleChoiceSceneImplCopyWith<$Res> {
  factory _$$QuizMultipleChoiceSceneImplCopyWith(
    _$QuizMultipleChoiceSceneImpl value,
    $Res Function(_$QuizMultipleChoiceSceneImpl) then,
  ) = __$$QuizMultipleChoiceSceneImplCopyWithImpl<$Res>;
  @useResult
  $Res call({
    String question,
    String? imageUrl,
    String? audioUrl,
    List<String> options,
    int correctOptionIndex,
  });
}

/// @nodoc
class __$$QuizMultipleChoiceSceneImplCopyWithImpl<$Res>
    extends _$LessonSceneCopyWithImpl<$Res, _$QuizMultipleChoiceSceneImpl>
    implements _$$QuizMultipleChoiceSceneImplCopyWith<$Res> {
  __$$QuizMultipleChoiceSceneImplCopyWithImpl(
    _$QuizMultipleChoiceSceneImpl _value,
    $Res Function(_$QuizMultipleChoiceSceneImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? question = null,
    Object? imageUrl = freezed,
    Object? audioUrl = freezed,
    Object? options = null,
    Object? correctOptionIndex = null,
  }) {
    return _then(
      _$QuizMultipleChoiceSceneImpl(
        question: null == question
            ? _value.question
            : question // ignore: cast_nullable_to_non_nullable
                  as String,
        imageUrl: freezed == imageUrl
            ? _value.imageUrl
            : imageUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        audioUrl: freezed == audioUrl
            ? _value.audioUrl
            : audioUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        options: null == options
            ? _value._options
            : options // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        correctOptionIndex: null == correctOptionIndex
            ? _value.correctOptionIndex
            : correctOptionIndex // ignore: cast_nullable_to_non_nullable
                  as int,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$QuizMultipleChoiceSceneImpl implements QuizMultipleChoiceScene {
  const _$QuizMultipleChoiceSceneImpl({
    required this.question,
    this.imageUrl,
    this.audioUrl,
    required final List<String> options,
    required this.correctOptionIndex,
    final String? $type,
  }) : _options = options,
       $type = $type ?? 'quizMultipleChoice';

  factory _$QuizMultipleChoiceSceneImpl.fromJson(Map<String, dynamic> json) =>
      _$$QuizMultipleChoiceSceneImplFromJson(json);

  // 設問文（Markdown）。
  @override
  final String question;
  @override
  final String? imageUrl;
  @override
  final String? audioUrl;
  final List<String> _options;
  @override
  List<String> get options {
    if (_options is EqualUnmodifiableListView) return _options;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_options);
  }

  // 正解の選択肢インデックス（0始まり）。
  @override
  final int correctOptionIndex;

  @JsonKey(name: 'type')
  final String $type;

  @override
  String toString() {
    return 'LessonScene.quizMultipleChoice(question: $question, imageUrl: $imageUrl, audioUrl: $audioUrl, options: $options, correctOptionIndex: $correctOptionIndex)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$QuizMultipleChoiceSceneImpl &&
            (identical(other.question, question) ||
                other.question == question) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl) &&
            (identical(other.audioUrl, audioUrl) ||
                other.audioUrl == audioUrl) &&
            const DeepCollectionEquality().equals(other._options, _options) &&
            (identical(other.correctOptionIndex, correctOptionIndex) ||
                other.correctOptionIndex == correctOptionIndex));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    question,
    imageUrl,
    audioUrl,
    const DeepCollectionEquality().hash(_options),
    correctOptionIndex,
  );

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$QuizMultipleChoiceSceneImplCopyWith<_$QuizMultipleChoiceSceneImpl>
  get copyWith =>
      __$$QuizMultipleChoiceSceneImplCopyWithImpl<
        _$QuizMultipleChoiceSceneImpl
      >(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(List<LessonStep> steps, String? animationKey)
    narration,
    required TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )
    quizMultipleChoice,
    required TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )
    quizFillInTheBlank,
  }) {
    return quizMultipleChoice(
      question,
      imageUrl,
      audioUrl,
      options,
      correctOptionIndex,
    );
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(List<LessonStep> steps, String? animationKey)? narration,
    TResult? Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    quizMultipleChoice,
    TResult? Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
  }) {
    return quizMultipleChoice?.call(
      question,
      imageUrl,
      audioUrl,
      options,
      correctOptionIndex,
    );
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(List<LessonStep> steps, String? animationKey)? narration,
    TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    quizMultipleChoice,
    TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (quizMultipleChoice != null) {
      return quizMultipleChoice(
        question,
        imageUrl,
        audioUrl,
        options,
        correctOptionIndex,
      );
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(NarrationScene value) narration,
    required TResult Function(QuizMultipleChoiceScene value) quizMultipleChoice,
    required TResult Function(QuizFillInTheBlankScene value) quizFillInTheBlank,
  }) {
    return quizMultipleChoice(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NarrationScene value)? narration,
    TResult? Function(QuizMultipleChoiceScene value)? quizMultipleChoice,
    TResult? Function(QuizFillInTheBlankScene value)? quizFillInTheBlank,
  }) {
    return quizMultipleChoice?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NarrationScene value)? narration,
    TResult Function(QuizMultipleChoiceScene value)? quizMultipleChoice,
    TResult Function(QuizFillInTheBlankScene value)? quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (quizMultipleChoice != null) {
      return quizMultipleChoice(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$QuizMultipleChoiceSceneImplToJson(this);
  }
}

abstract class QuizMultipleChoiceScene implements LessonScene {
  const factory QuizMultipleChoiceScene({
    required final String question,
    final String? imageUrl,
    final String? audioUrl,
    required final List<String> options,
    required final int correctOptionIndex,
  }) = _$QuizMultipleChoiceSceneImpl;

  factory QuizMultipleChoiceScene.fromJson(Map<String, dynamic> json) =
      _$QuizMultipleChoiceSceneImpl.fromJson;

  // 設問文（Markdown）。
  String get question;
  String? get imageUrl;
  String? get audioUrl;
  List<String> get options; // 正解の選択肢インデックス（0始まり）。
  int get correctOptionIndex;

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$QuizMultipleChoiceSceneImplCopyWith<_$QuizMultipleChoiceSceneImpl>
  get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$QuizFillInTheBlankSceneImplCopyWith<$Res> {
  factory _$$QuizFillInTheBlankSceneImplCopyWith(
    _$QuizFillInTheBlankSceneImpl value,
    $Res Function(_$QuizFillInTheBlankSceneImpl) then,
  ) = __$$QuizFillInTheBlankSceneImplCopyWithImpl<$Res>;
  @useResult
  $Res call({
    String question,
    String? imageUrl,
    String? audioUrl,
    List<String> options,
    List<int> correctOptionIndices,
  });
}

/// @nodoc
class __$$QuizFillInTheBlankSceneImplCopyWithImpl<$Res>
    extends _$LessonSceneCopyWithImpl<$Res, _$QuizFillInTheBlankSceneImpl>
    implements _$$QuizFillInTheBlankSceneImplCopyWith<$Res> {
  __$$QuizFillInTheBlankSceneImplCopyWithImpl(
    _$QuizFillInTheBlankSceneImpl _value,
    $Res Function(_$QuizFillInTheBlankSceneImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? question = null,
    Object? imageUrl = freezed,
    Object? audioUrl = freezed,
    Object? options = null,
    Object? correctOptionIndices = null,
  }) {
    return _then(
      _$QuizFillInTheBlankSceneImpl(
        question: null == question
            ? _value.question
            : question // ignore: cast_nullable_to_non_nullable
                  as String,
        imageUrl: freezed == imageUrl
            ? _value.imageUrl
            : imageUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        audioUrl: freezed == audioUrl
            ? _value.audioUrl
            : audioUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        options: null == options
            ? _value._options
            : options // ignore: cast_nullable_to_non_nullable
                  as List<String>,
        correctOptionIndices: null == correctOptionIndices
            ? _value._correctOptionIndices
            : correctOptionIndices // ignore: cast_nullable_to_non_nullable
                  as List<int>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$QuizFillInTheBlankSceneImpl implements QuizFillInTheBlankScene {
  const _$QuizFillInTheBlankSceneImpl({
    required this.question,
    this.imageUrl,
    this.audioUrl,
    required final List<String> options,
    required final List<int> correctOptionIndices,
    final String? $type,
  }) : _options = options,
       _correctOptionIndices = correctOptionIndices,
       $type = $type ?? 'quizFillInTheBlank';

  factory _$QuizFillInTheBlankSceneImpl.fromJson(Map<String, dynamic> json) =>
      _$$QuizFillInTheBlankSceneImplFromJson(json);

  // 問題文。空欄は `[__]` で表現。
  @override
  final String question;
  @override
  final String? imageUrl;
  @override
  final String? audioUrl;
  // 選択肢（同一内容の重複は不可）。options数 ≥ 空欄数。
  final List<String> _options;
  // 選択肢（同一内容の重複は不可）。options数 ≥ 空欄数。
  @override
  List<String> get options {
    if (_options is EqualUnmodifiableListView) return _options;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_options);
  }

  // 各空欄の正解。correctOptionIndices[n] = 出現順 n 番目の `[__]` の
  // 正解 = options のインデックス。値は重複しない。
  final List<int> _correctOptionIndices;
  // 各空欄の正解。correctOptionIndices[n] = 出現順 n 番目の `[__]` の
  // 正解 = options のインデックス。値は重複しない。
  @override
  List<int> get correctOptionIndices {
    if (_correctOptionIndices is EqualUnmodifiableListView)
      return _correctOptionIndices;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_correctOptionIndices);
  }

  @JsonKey(name: 'type')
  final String $type;

  @override
  String toString() {
    return 'LessonScene.quizFillInTheBlank(question: $question, imageUrl: $imageUrl, audioUrl: $audioUrl, options: $options, correctOptionIndices: $correctOptionIndices)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$QuizFillInTheBlankSceneImpl &&
            (identical(other.question, question) ||
                other.question == question) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl) &&
            (identical(other.audioUrl, audioUrl) ||
                other.audioUrl == audioUrl) &&
            const DeepCollectionEquality().equals(other._options, _options) &&
            const DeepCollectionEquality().equals(
              other._correctOptionIndices,
              _correctOptionIndices,
            ));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    question,
    imageUrl,
    audioUrl,
    const DeepCollectionEquality().hash(_options),
    const DeepCollectionEquality().hash(_correctOptionIndices),
  );

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$QuizFillInTheBlankSceneImplCopyWith<_$QuizFillInTheBlankSceneImpl>
  get copyWith =>
      __$$QuizFillInTheBlankSceneImplCopyWithImpl<
        _$QuizFillInTheBlankSceneImpl
      >(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(List<LessonStep> steps, String? animationKey)
    narration,
    required TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )
    quizMultipleChoice,
    required TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )
    quizFillInTheBlank,
  }) {
    return quizFillInTheBlank(
      question,
      imageUrl,
      audioUrl,
      options,
      correctOptionIndices,
    );
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(List<LessonStep> steps, String? animationKey)? narration,
    TResult? Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    quizMultipleChoice,
    TResult? Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
  }) {
    return quizFillInTheBlank?.call(
      question,
      imageUrl,
      audioUrl,
      options,
      correctOptionIndices,
    );
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(List<LessonStep> steps, String? animationKey)? narration,
    TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    quizMultipleChoice,
    TResult Function(
      String question,
      String? imageUrl,
      String? audioUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (quizFillInTheBlank != null) {
      return quizFillInTheBlank(
        question,
        imageUrl,
        audioUrl,
        options,
        correctOptionIndices,
      );
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(NarrationScene value) narration,
    required TResult Function(QuizMultipleChoiceScene value) quizMultipleChoice,
    required TResult Function(QuizFillInTheBlankScene value) quizFillInTheBlank,
  }) {
    return quizFillInTheBlank(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NarrationScene value)? narration,
    TResult? Function(QuizMultipleChoiceScene value)? quizMultipleChoice,
    TResult? Function(QuizFillInTheBlankScene value)? quizFillInTheBlank,
  }) {
    return quizFillInTheBlank?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NarrationScene value)? narration,
    TResult Function(QuizMultipleChoiceScene value)? quizMultipleChoice,
    TResult Function(QuizFillInTheBlankScene value)? quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (quizFillInTheBlank != null) {
      return quizFillInTheBlank(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$QuizFillInTheBlankSceneImplToJson(this);
  }
}

abstract class QuizFillInTheBlankScene implements LessonScene {
  const factory QuizFillInTheBlankScene({
    required final String question,
    final String? imageUrl,
    final String? audioUrl,
    required final List<String> options,
    required final List<int> correctOptionIndices,
  }) = _$QuizFillInTheBlankSceneImpl;

  factory QuizFillInTheBlankScene.fromJson(Map<String, dynamic> json) =
      _$QuizFillInTheBlankSceneImpl.fromJson;

  // 問題文。空欄は `[__]` で表現。
  String get question;
  String? get imageUrl;
  String? get audioUrl; // 選択肢（同一内容の重複は不可）。options数 ≥ 空欄数。
  List<String>
  get options; // 各空欄の正解。correctOptionIndices[n] = 出現順 n 番目の `[__]` の
  // 正解 = options のインデックス。値は重複しない。
  List<int> get correctOptionIndices;

  /// Create a copy of LessonScene
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$QuizFillInTheBlankSceneImplCopyWith<_$QuizFillInTheBlankSceneImpl>
  get copyWith => throw _privateConstructorUsedError;
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
