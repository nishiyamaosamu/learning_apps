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
      throw _privateConstructorUsedError; // 説明用のコンテンツページの列（縦スワイプで1ページずつ表示）。
  List<ContentPage> get pages =>
      throw _privateConstructorUsedError; // 確認問題（ミニクイズ）の列。別画面でまとめて出題する。
  List<LessonQuiz> get quizzes =>
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
    List<ContentPage> pages,
    List<LessonQuiz> quizzes,
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
    Object? pages = null,
    Object? quizzes = null,
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
            pages: null == pages
                ? _value.pages
                : pages // ignore: cast_nullable_to_non_nullable
                      as List<ContentPage>,
            quizzes: null == quizzes
                ? _value.quizzes
                : quizzes // ignore: cast_nullable_to_non_nullable
                      as List<LessonQuiz>,
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
    List<ContentPage> pages,
    List<LessonQuiz> quizzes,
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
    Object? pages = null,
    Object? quizzes = null,
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
        pages: null == pages
            ? _value._pages
            : pages // ignore: cast_nullable_to_non_nullable
                  as List<ContentPage>,
        quizzes: null == quizzes
            ? _value._quizzes
            : quizzes // ignore: cast_nullable_to_non_nullable
                  as List<LessonQuiz>,
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
    final List<ContentPage> pages = const <ContentPage>[],
    final List<LessonQuiz> quizzes = const <LessonQuiz>[],
    final List<int> exercises = const <int>[],
  }) : _pages = pages,
       _quizzes = quizzes,
       _exercises = exercises;

  factory _$LessonImpl.fromJson(Map<String, dynamic> json) =>
      _$$LessonImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  // 説明用のコンテンツページの列（縦スワイプで1ページずつ表示）。
  final List<ContentPage> _pages;
  // 説明用のコンテンツページの列（縦スワイプで1ページずつ表示）。
  @override
  @JsonKey()
  List<ContentPage> get pages {
    if (_pages is EqualUnmodifiableListView) return _pages;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_pages);
  }

  // 確認問題（ミニクイズ）の列。別画面でまとめて出題する。
  final List<LessonQuiz> _quizzes;
  // 確認問題（ミニクイズ）の列。別画面でまとめて出題する。
  @override
  @JsonKey()
  List<LessonQuiz> get quizzes {
    if (_quizzes is EqualUnmodifiableListView) return _quizzes;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_quizzes);
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
    return 'Lesson(id: $id, title: $title, pages: $pages, quizzes: $quizzes, exercises: $exercises)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LessonImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            const DeepCollectionEquality().equals(other._pages, _pages) &&
            const DeepCollectionEquality().equals(other._quizzes, _quizzes) &&
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
    const DeepCollectionEquality().hash(_pages),
    const DeepCollectionEquality().hash(_quizzes),
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
    final List<ContentPage> pages,
    final List<LessonQuiz> quizzes,
    final List<int> exercises,
  }) = _$LessonImpl;

  factory _Lesson.fromJson(Map<String, dynamic> json) = _$LessonImpl.fromJson;

  @override
  String get id;
  @override
  String get title; // 説明用のコンテンツページの列（縦スワイプで1ページずつ表示）。
  @override
  List<ContentPage> get pages; // 確認問題（ミニクイズ）の列。別画面でまとめて出題する。
  @override
  List<LessonQuiz> get quizzes; // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
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

ContentPage _$ContentPageFromJson(Map<String, dynamic> json) {
  return _ContentPage.fromJson(json);
}

/// @nodoc
mixin _$ContentPage {
  // ページのタイトル（任意）。AppBar 等の本文外 UI で使う。
  String? get title =>
      throw _privateConstructorUsedError; // ページ全体のナレーション音声（任意）。ローカルアセット相対パス
  // （例 lessons/audios/1-1.mp3）。
  String? get audioUrl =>
      throw _privateConstructorUsedError; // 縦に積み上げて一度に表示するブロック列（1つ以上）。配列順。
  List<ContentBlock> get blocks => throw _privateConstructorUsedError;

  /// Serializes this ContentPage to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ContentPage
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ContentPageCopyWith<ContentPage> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ContentPageCopyWith<$Res> {
  factory $ContentPageCopyWith(
    ContentPage value,
    $Res Function(ContentPage) then,
  ) = _$ContentPageCopyWithImpl<$Res, ContentPage>;
  @useResult
  $Res call({String? title, String? audioUrl, List<ContentBlock> blocks});
}

/// @nodoc
class _$ContentPageCopyWithImpl<$Res, $Val extends ContentPage>
    implements $ContentPageCopyWith<$Res> {
  _$ContentPageCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ContentPage
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = freezed,
    Object? audioUrl = freezed,
    Object? blocks = null,
  }) {
    return _then(
      _value.copyWith(
            title: freezed == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String?,
            audioUrl: freezed == audioUrl
                ? _value.audioUrl
                : audioUrl // ignore: cast_nullable_to_non_nullable
                      as String?,
            blocks: null == blocks
                ? _value.blocks
                : blocks // ignore: cast_nullable_to_non_nullable
                      as List<ContentBlock>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ContentPageImplCopyWith<$Res>
    implements $ContentPageCopyWith<$Res> {
  factory _$$ContentPageImplCopyWith(
    _$ContentPageImpl value,
    $Res Function(_$ContentPageImpl) then,
  ) = __$$ContentPageImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String? title, String? audioUrl, List<ContentBlock> blocks});
}

/// @nodoc
class __$$ContentPageImplCopyWithImpl<$Res>
    extends _$ContentPageCopyWithImpl<$Res, _$ContentPageImpl>
    implements _$$ContentPageImplCopyWith<$Res> {
  __$$ContentPageImplCopyWithImpl(
    _$ContentPageImpl _value,
    $Res Function(_$ContentPageImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ContentPage
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = freezed,
    Object? audioUrl = freezed,
    Object? blocks = null,
  }) {
    return _then(
      _$ContentPageImpl(
        title: freezed == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String?,
        audioUrl: freezed == audioUrl
            ? _value.audioUrl
            : audioUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
        blocks: null == blocks
            ? _value._blocks
            : blocks // ignore: cast_nullable_to_non_nullable
                  as List<ContentBlock>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ContentPageImpl implements _ContentPage {
  const _$ContentPageImpl({
    this.title,
    this.audioUrl,
    final List<ContentBlock> blocks = const <ContentBlock>[],
  }) : _blocks = blocks;

  factory _$ContentPageImpl.fromJson(Map<String, dynamic> json) =>
      _$$ContentPageImplFromJson(json);

  // ページのタイトル（任意）。AppBar 等の本文外 UI で使う。
  @override
  final String? title;
  // ページ全体のナレーション音声（任意）。ローカルアセット相対パス
  // （例 lessons/audios/1-1.mp3）。
  @override
  final String? audioUrl;
  // 縦に積み上げて一度に表示するブロック列（1つ以上）。配列順。
  final List<ContentBlock> _blocks;
  // 縦に積み上げて一度に表示するブロック列（1つ以上）。配列順。
  @override
  @JsonKey()
  List<ContentBlock> get blocks {
    if (_blocks is EqualUnmodifiableListView) return _blocks;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_blocks);
  }

  @override
  String toString() {
    return 'ContentPage(title: $title, audioUrl: $audioUrl, blocks: $blocks)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ContentPageImpl &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.audioUrl, audioUrl) ||
                other.audioUrl == audioUrl) &&
            const DeepCollectionEquality().equals(other._blocks, _blocks));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    title,
    audioUrl,
    const DeepCollectionEquality().hash(_blocks),
  );

  /// Create a copy of ContentPage
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ContentPageImplCopyWith<_$ContentPageImpl> get copyWith =>
      __$$ContentPageImplCopyWithImpl<_$ContentPageImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ContentPageImplToJson(this);
  }
}

abstract class _ContentPage implements ContentPage {
  const factory _ContentPage({
    final String? title,
    final String? audioUrl,
    final List<ContentBlock> blocks,
  }) = _$ContentPageImpl;

  factory _ContentPage.fromJson(Map<String, dynamic> json) =
      _$ContentPageImpl.fromJson;

  // ページのタイトル（任意）。AppBar 等の本文外 UI で使う。
  @override
  String? get title; // ページ全体のナレーション音声（任意）。ローカルアセット相対パス
  // （例 lessons/audios/1-1.mp3）。
  @override
  String? get audioUrl; // 縦に積み上げて一度に表示するブロック列（1つ以上）。配列順。
  @override
  List<ContentBlock> get blocks;

  /// Create a copy of ContentPage
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ContentPageImplCopyWith<_$ContentPageImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ContentBlock _$ContentBlockFromJson(Map<String, dynamic> json) {
  return _ContentBlock.fromJson(json);
}

/// @nodoc
mixin _$ContentBlock {
  // 本文（Markdown）。空文字も許可（画像だけのブロック等）。
  String get text =>
      throw _privateConstructorUsedError; // このブロックに添える画像（任意）。本文の上に表示する。
  // ローカルアセット相対パス（例 lessons/images/2-1.jpeg）。
  String? get imageUrl => throw _privateConstructorUsedError;

  /// Serializes this ContentBlock to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ContentBlock
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ContentBlockCopyWith<ContentBlock> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ContentBlockCopyWith<$Res> {
  factory $ContentBlockCopyWith(
    ContentBlock value,
    $Res Function(ContentBlock) then,
  ) = _$ContentBlockCopyWithImpl<$Res, ContentBlock>;
  @useResult
  $Res call({String text, String? imageUrl});
}

/// @nodoc
class _$ContentBlockCopyWithImpl<$Res, $Val extends ContentBlock>
    implements $ContentBlockCopyWith<$Res> {
  _$ContentBlockCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ContentBlock
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? text = null, Object? imageUrl = freezed}) {
    return _then(
      _value.copyWith(
            text: null == text
                ? _value.text
                : text // ignore: cast_nullable_to_non_nullable
                      as String,
            imageUrl: freezed == imageUrl
                ? _value.imageUrl
                : imageUrl // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ContentBlockImplCopyWith<$Res>
    implements $ContentBlockCopyWith<$Res> {
  factory _$$ContentBlockImplCopyWith(
    _$ContentBlockImpl value,
    $Res Function(_$ContentBlockImpl) then,
  ) = __$$ContentBlockImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String text, String? imageUrl});
}

/// @nodoc
class __$$ContentBlockImplCopyWithImpl<$Res>
    extends _$ContentBlockCopyWithImpl<$Res, _$ContentBlockImpl>
    implements _$$ContentBlockImplCopyWith<$Res> {
  __$$ContentBlockImplCopyWithImpl(
    _$ContentBlockImpl _value,
    $Res Function(_$ContentBlockImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of ContentBlock
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? text = null, Object? imageUrl = freezed}) {
    return _then(
      _$ContentBlockImpl(
        text: null == text
            ? _value.text
            : text // ignore: cast_nullable_to_non_nullable
                  as String,
        imageUrl: freezed == imageUrl
            ? _value.imageUrl
            : imageUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ContentBlockImpl implements _ContentBlock {
  const _$ContentBlockImpl({this.text = '', this.imageUrl});

  factory _$ContentBlockImpl.fromJson(Map<String, dynamic> json) =>
      _$$ContentBlockImplFromJson(json);

  // 本文（Markdown）。空文字も許可（画像だけのブロック等）。
  @override
  @JsonKey()
  final String text;
  // このブロックに添える画像（任意）。本文の上に表示する。
  // ローカルアセット相対パス（例 lessons/images/2-1.jpeg）。
  @override
  final String? imageUrl;

  @override
  String toString() {
    return 'ContentBlock(text: $text, imageUrl: $imageUrl)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ContentBlockImpl &&
            (identical(other.text, text) || other.text == text) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, text, imageUrl);

  /// Create a copy of ContentBlock
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ContentBlockImplCopyWith<_$ContentBlockImpl> get copyWith =>
      __$$ContentBlockImplCopyWithImpl<_$ContentBlockImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ContentBlockImplToJson(this);
  }
}

abstract class _ContentBlock implements ContentBlock {
  const factory _ContentBlock({final String text, final String? imageUrl}) =
      _$ContentBlockImpl;

  factory _ContentBlock.fromJson(Map<String, dynamic> json) =
      _$ContentBlockImpl.fromJson;

  // 本文（Markdown）。空文字も許可（画像だけのブロック等）。
  @override
  String get text; // このブロックに添える画像（任意）。本文の上に表示する。
  // ローカルアセット相対パス（例 lessons/images/2-1.jpeg）。
  @override
  String? get imageUrl;

  /// Create a copy of ContentBlock
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ContentBlockImplCopyWith<_$ContentBlockImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

LessonQuiz _$LessonQuizFromJson(Map<String, dynamic> json) {
  switch (json['type']) {
    case 'quizMultipleChoice':
      return QuizMultipleChoice.fromJson(json);
    case 'quizFillInTheBlank':
      return QuizFillInTheBlank.fromJson(json);

    default:
      throw CheckedFromJsonException(
        json,
        'type',
        'LessonQuiz',
        'Invalid union type "${json['type']}"!',
      );
  }
}

/// @nodoc
mixin _$LessonQuiz {
  // 設問文（Markdown）。
  String get question => throw _privateConstructorUsedError;
  String? get imageUrl => throw _privateConstructorUsedError;
  List<String> get options => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      int correctOptionIndex,
    )
    multipleChoice,
    required TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )
    fillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(
      String question,
      String? imageUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    multipleChoice,
    TResult? Function(
      String question,
      String? imageUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    fillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    multipleChoice,
    TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    fillInTheBlank,
    required TResult orElse(),
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(QuizMultipleChoice value) multipleChoice,
    required TResult Function(QuizFillInTheBlank value) fillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(QuizMultipleChoice value)? multipleChoice,
    TResult? Function(QuizFillInTheBlank value)? fillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(QuizMultipleChoice value)? multipleChoice,
    TResult Function(QuizFillInTheBlank value)? fillInTheBlank,
    required TResult orElse(),
  }) => throw _privateConstructorUsedError;

  /// Serializes this LessonQuiz to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LessonQuiz
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LessonQuizCopyWith<LessonQuiz> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LessonQuizCopyWith<$Res> {
  factory $LessonQuizCopyWith(
    LessonQuiz value,
    $Res Function(LessonQuiz) then,
  ) = _$LessonQuizCopyWithImpl<$Res, LessonQuiz>;
  @useResult
  $Res call({String question, String? imageUrl, List<String> options});
}

/// @nodoc
class _$LessonQuizCopyWithImpl<$Res, $Val extends LessonQuiz>
    implements $LessonQuizCopyWith<$Res> {
  _$LessonQuizCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LessonQuiz
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? question = null,
    Object? imageUrl = freezed,
    Object? options = null,
  }) {
    return _then(
      _value.copyWith(
            question: null == question
                ? _value.question
                : question // ignore: cast_nullable_to_non_nullable
                      as String,
            imageUrl: freezed == imageUrl
                ? _value.imageUrl
                : imageUrl // ignore: cast_nullable_to_non_nullable
                      as String?,
            options: null == options
                ? _value.options
                : options // ignore: cast_nullable_to_non_nullable
                      as List<String>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$QuizMultipleChoiceImplCopyWith<$Res>
    implements $LessonQuizCopyWith<$Res> {
  factory _$$QuizMultipleChoiceImplCopyWith(
    _$QuizMultipleChoiceImpl value,
    $Res Function(_$QuizMultipleChoiceImpl) then,
  ) = __$$QuizMultipleChoiceImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String question,
    String? imageUrl,
    List<String> options,
    int correctOptionIndex,
  });
}

/// @nodoc
class __$$QuizMultipleChoiceImplCopyWithImpl<$Res>
    extends _$LessonQuizCopyWithImpl<$Res, _$QuizMultipleChoiceImpl>
    implements _$$QuizMultipleChoiceImplCopyWith<$Res> {
  __$$QuizMultipleChoiceImplCopyWithImpl(
    _$QuizMultipleChoiceImpl _value,
    $Res Function(_$QuizMultipleChoiceImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonQuiz
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? question = null,
    Object? imageUrl = freezed,
    Object? options = null,
    Object? correctOptionIndex = null,
  }) {
    return _then(
      _$QuizMultipleChoiceImpl(
        question: null == question
            ? _value.question
            : question // ignore: cast_nullable_to_non_nullable
                  as String,
        imageUrl: freezed == imageUrl
            ? _value.imageUrl
            : imageUrl // ignore: cast_nullable_to_non_nullable
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
class _$QuizMultipleChoiceImpl implements QuizMultipleChoice {
  const _$QuizMultipleChoiceImpl({
    required this.question,
    this.imageUrl,
    required final List<String> options,
    required this.correctOptionIndex,
    final String? $type,
  }) : _options = options,
       $type = $type ?? 'quizMultipleChoice';

  factory _$QuizMultipleChoiceImpl.fromJson(Map<String, dynamic> json) =>
      _$$QuizMultipleChoiceImplFromJson(json);

  // 設問文（Markdown）。
  @override
  final String question;
  @override
  final String? imageUrl;
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
    return 'LessonQuiz.multipleChoice(question: $question, imageUrl: $imageUrl, options: $options, correctOptionIndex: $correctOptionIndex)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$QuizMultipleChoiceImpl &&
            (identical(other.question, question) ||
                other.question == question) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl) &&
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
    const DeepCollectionEquality().hash(_options),
    correctOptionIndex,
  );

  /// Create a copy of LessonQuiz
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$QuizMultipleChoiceImplCopyWith<_$QuizMultipleChoiceImpl> get copyWith =>
      __$$QuizMultipleChoiceImplCopyWithImpl<_$QuizMultipleChoiceImpl>(
        this,
        _$identity,
      );

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      int correctOptionIndex,
    )
    multipleChoice,
    required TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )
    fillInTheBlank,
  }) {
    return multipleChoice(question, imageUrl, options, correctOptionIndex);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(
      String question,
      String? imageUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    multipleChoice,
    TResult? Function(
      String question,
      String? imageUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    fillInTheBlank,
  }) {
    return multipleChoice?.call(
      question,
      imageUrl,
      options,
      correctOptionIndex,
    );
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    multipleChoice,
    TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    fillInTheBlank,
    required TResult orElse(),
  }) {
    if (multipleChoice != null) {
      return multipleChoice(question, imageUrl, options, correctOptionIndex);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(QuizMultipleChoice value) multipleChoice,
    required TResult Function(QuizFillInTheBlank value) fillInTheBlank,
  }) {
    return multipleChoice(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(QuizMultipleChoice value)? multipleChoice,
    TResult? Function(QuizFillInTheBlank value)? fillInTheBlank,
  }) {
    return multipleChoice?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(QuizMultipleChoice value)? multipleChoice,
    TResult Function(QuizFillInTheBlank value)? fillInTheBlank,
    required TResult orElse(),
  }) {
    if (multipleChoice != null) {
      return multipleChoice(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$QuizMultipleChoiceImplToJson(this);
  }
}

abstract class QuizMultipleChoice implements LessonQuiz {
  const factory QuizMultipleChoice({
    required final String question,
    final String? imageUrl,
    required final List<String> options,
    required final int correctOptionIndex,
  }) = _$QuizMultipleChoiceImpl;

  factory QuizMultipleChoice.fromJson(Map<String, dynamic> json) =
      _$QuizMultipleChoiceImpl.fromJson;

  // 設問文（Markdown）。
  @override
  String get question;
  @override
  String? get imageUrl;
  @override
  List<String> get options; // 正解の選択肢インデックス（0始まり）。
  int get correctOptionIndex;

  /// Create a copy of LessonQuiz
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$QuizMultipleChoiceImplCopyWith<_$QuizMultipleChoiceImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$QuizFillInTheBlankImplCopyWith<$Res>
    implements $LessonQuizCopyWith<$Res> {
  factory _$$QuizFillInTheBlankImplCopyWith(
    _$QuizFillInTheBlankImpl value,
    $Res Function(_$QuizFillInTheBlankImpl) then,
  ) = __$$QuizFillInTheBlankImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String question,
    String? imageUrl,
    List<String> options,
    List<int> correctOptionIndices,
  });
}

/// @nodoc
class __$$QuizFillInTheBlankImplCopyWithImpl<$Res>
    extends _$LessonQuizCopyWithImpl<$Res, _$QuizFillInTheBlankImpl>
    implements _$$QuizFillInTheBlankImplCopyWith<$Res> {
  __$$QuizFillInTheBlankImplCopyWithImpl(
    _$QuizFillInTheBlankImpl _value,
    $Res Function(_$QuizFillInTheBlankImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonQuiz
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? question = null,
    Object? imageUrl = freezed,
    Object? options = null,
    Object? correctOptionIndices = null,
  }) {
    return _then(
      _$QuizFillInTheBlankImpl(
        question: null == question
            ? _value.question
            : question // ignore: cast_nullable_to_non_nullable
                  as String,
        imageUrl: freezed == imageUrl
            ? _value.imageUrl
            : imageUrl // ignore: cast_nullable_to_non_nullable
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
class _$QuizFillInTheBlankImpl implements QuizFillInTheBlank {
  const _$QuizFillInTheBlankImpl({
    required this.question,
    this.imageUrl,
    required final List<String> options,
    required final List<int> correctOptionIndices,
    final String? $type,
  }) : _options = options,
       _correctOptionIndices = correctOptionIndices,
       $type = $type ?? 'quizFillInTheBlank';

  factory _$QuizFillInTheBlankImpl.fromJson(Map<String, dynamic> json) =>
      _$$QuizFillInTheBlankImplFromJson(json);

  // 問題文。空欄は `[__]` で表現。
  @override
  final String question;
  @override
  final String? imageUrl;
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
    return 'LessonQuiz.fillInTheBlank(question: $question, imageUrl: $imageUrl, options: $options, correctOptionIndices: $correctOptionIndices)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$QuizFillInTheBlankImpl &&
            (identical(other.question, question) ||
                other.question == question) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl) &&
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
    const DeepCollectionEquality().hash(_options),
    const DeepCollectionEquality().hash(_correctOptionIndices),
  );

  /// Create a copy of LessonQuiz
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$QuizFillInTheBlankImplCopyWith<_$QuizFillInTheBlankImpl> get copyWith =>
      __$$QuizFillInTheBlankImplCopyWithImpl<_$QuizFillInTheBlankImpl>(
        this,
        _$identity,
      );

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      int correctOptionIndex,
    )
    multipleChoice,
    required TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )
    fillInTheBlank,
  }) {
    return fillInTheBlank(question, imageUrl, options, correctOptionIndices);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(
      String question,
      String? imageUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    multipleChoice,
    TResult? Function(
      String question,
      String? imageUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    fillInTheBlank,
  }) {
    return fillInTheBlank?.call(
      question,
      imageUrl,
      options,
      correctOptionIndices,
    );
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      int correctOptionIndex,
    )?
    multipleChoice,
    TResult Function(
      String question,
      String? imageUrl,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    fillInTheBlank,
    required TResult orElse(),
  }) {
    if (fillInTheBlank != null) {
      return fillInTheBlank(question, imageUrl, options, correctOptionIndices);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(QuizMultipleChoice value) multipleChoice,
    required TResult Function(QuizFillInTheBlank value) fillInTheBlank,
  }) {
    return fillInTheBlank(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(QuizMultipleChoice value)? multipleChoice,
    TResult? Function(QuizFillInTheBlank value)? fillInTheBlank,
  }) {
    return fillInTheBlank?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(QuizMultipleChoice value)? multipleChoice,
    TResult Function(QuizFillInTheBlank value)? fillInTheBlank,
    required TResult orElse(),
  }) {
    if (fillInTheBlank != null) {
      return fillInTheBlank(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$QuizFillInTheBlankImplToJson(this);
  }
}

abstract class QuizFillInTheBlank implements LessonQuiz {
  const factory QuizFillInTheBlank({
    required final String question,
    final String? imageUrl,
    required final List<String> options,
    required final List<int> correctOptionIndices,
  }) = _$QuizFillInTheBlankImpl;

  factory QuizFillInTheBlank.fromJson(Map<String, dynamic> json) =
      _$QuizFillInTheBlankImpl.fromJson;

  // 問題文。空欄は `[__]` で表現。
  @override
  String get question;
  @override
  String? get imageUrl; // 選択肢（同一内容の重複は不可）。options数 ≥ 空欄数。
  @override
  List<String> get options; // 各空欄の正解。correctOptionIndices[n] = 出現順 n 番目の `[__]` の
  // 正解 = options のインデックス。値は重複しない。
  List<int> get correctOptionIndices;

  /// Create a copy of LessonQuiz
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$QuizFillInTheBlankImplCopyWith<_$QuizFillInTheBlankImpl> get copyWith =>
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
