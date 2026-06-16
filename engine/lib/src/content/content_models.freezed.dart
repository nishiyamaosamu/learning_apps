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
      throw _privateConstructorUsedError; // 説明・ミニクイズのページ列。配列順に表示。
  List<LessonPage> get pages =>
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
    List<LessonPage> pages,
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
                      as List<LessonPage>,
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
    List<LessonPage> pages,
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
                  as List<LessonPage>,
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
    final List<LessonPage> pages = const <LessonPage>[],
    final List<int> exercises = const <int>[],
  }) : _pages = pages,
       _exercises = exercises;

  factory _$LessonImpl.fromJson(Map<String, dynamic> json) =>
      _$$LessonImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  // 説明・ミニクイズのページ列。配列順に表示。
  final List<LessonPage> _pages;
  // 説明・ミニクイズのページ列。配列順に表示。
  @override
  @JsonKey()
  List<LessonPage> get pages {
    if (_pages is EqualUnmodifiableListView) return _pages;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_pages);
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
    return 'Lesson(id: $id, title: $title, pages: $pages, exercises: $exercises)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LessonImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            const DeepCollectionEquality().equals(other._pages, _pages) &&
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
    final List<LessonPage> pages,
    final List<int> exercises,
  }) = _$LessonImpl;

  factory _Lesson.fromJson(Map<String, dynamic> json) = _$LessonImpl.fromJson;

  @override
  String get id;
  @override
  String get title; // 説明・ミニクイズのページ列。配列順に表示。
  @override
  List<LessonPage> get pages; // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
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

LessonPage _$LessonPageFromJson(Map<String, dynamic> json) {
  return _LessonPage.fromJson(json);
}

/// @nodoc
mixin _$LessonPage {
  // このページに並べるコンテンツ列。配列順に表示。
  List<LessonContent> get contents => throw _privateConstructorUsedError;

  /// Serializes this LessonPage to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LessonPage
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LessonPageCopyWith<LessonPage> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LessonPageCopyWith<$Res> {
  factory $LessonPageCopyWith(
    LessonPage value,
    $Res Function(LessonPage) then,
  ) = _$LessonPageCopyWithImpl<$Res, LessonPage>;
  @useResult
  $Res call({List<LessonContent> contents});
}

/// @nodoc
class _$LessonPageCopyWithImpl<$Res, $Val extends LessonPage>
    implements $LessonPageCopyWith<$Res> {
  _$LessonPageCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LessonPage
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? contents = null}) {
    return _then(
      _value.copyWith(
            contents: null == contents
                ? _value.contents
                : contents // ignore: cast_nullable_to_non_nullable
                      as List<LessonContent>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$LessonPageImplCopyWith<$Res>
    implements $LessonPageCopyWith<$Res> {
  factory _$$LessonPageImplCopyWith(
    _$LessonPageImpl value,
    $Res Function(_$LessonPageImpl) then,
  ) = __$$LessonPageImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({List<LessonContent> contents});
}

/// @nodoc
class __$$LessonPageImplCopyWithImpl<$Res>
    extends _$LessonPageCopyWithImpl<$Res, _$LessonPageImpl>
    implements _$$LessonPageImplCopyWith<$Res> {
  __$$LessonPageImplCopyWithImpl(
    _$LessonPageImpl _value,
    $Res Function(_$LessonPageImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonPage
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? contents = null}) {
    return _then(
      _$LessonPageImpl(
        contents: null == contents
            ? _value._contents
            : contents // ignore: cast_nullable_to_non_nullable
                  as List<LessonContent>,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$LessonPageImpl implements _LessonPage {
  const _$LessonPageImpl({
    final List<LessonContent> contents = const <LessonContent>[],
  }) : _contents = contents;

  factory _$LessonPageImpl.fromJson(Map<String, dynamic> json) =>
      _$$LessonPageImplFromJson(json);

  // このページに並べるコンテンツ列。配列順に表示。
  final List<LessonContent> _contents;
  // このページに並べるコンテンツ列。配列順に表示。
  @override
  @JsonKey()
  List<LessonContent> get contents {
    if (_contents is EqualUnmodifiableListView) return _contents;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_contents);
  }

  @override
  String toString() {
    return 'LessonPage(contents: $contents)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LessonPageImpl &&
            const DeepCollectionEquality().equals(other._contents, _contents));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, const DeepCollectionEquality().hash(_contents));

  /// Create a copy of LessonPage
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LessonPageImplCopyWith<_$LessonPageImpl> get copyWith =>
      __$$LessonPageImplCopyWithImpl<_$LessonPageImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LessonPageImplToJson(this);
  }
}

abstract class _LessonPage implements LessonPage {
  const factory _LessonPage({final List<LessonContent> contents}) =
      _$LessonPageImpl;

  factory _LessonPage.fromJson(Map<String, dynamic> json) =
      _$LessonPageImpl.fromJson;

  // このページに並べるコンテンツ列。配列順に表示。
  @override
  List<LessonContent> get contents;

  /// Create a copy of LessonPage
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LessonPageImplCopyWith<_$LessonPageImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

LessonContent _$LessonContentFromJson(Map<String, dynamic> json) {
  switch (json['type']) {
    case 'text':
      return TextContent.fromJson(json);
    case 'image':
      return ImageContent.fromJson(json);
    case 'quizMultipleChoice':
      return QuizMultipleChoiceContent.fromJson(json);
    case 'quizFillInTheBlank':
      return QuizFillInTheBlankContent.fromJson(json);

    default:
      throw CheckedFromJsonException(
        json,
        'type',
        'LessonContent',
        'Invalid union type "${json['type']}"!',
      );
  }
}

/// @nodoc
mixin _$LessonContent {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(String text, String? audioUrl) text,
    required TResult Function(String imageUrl) image,
    required TResult Function(List<String> options, int correctOptionIndex)
    quizMultipleChoice,
    required TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )
    quizFillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(String text, String? audioUrl)? text,
    TResult? Function(String imageUrl)? image,
    TResult? Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult? Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(String text, String? audioUrl)? text,
    TResult Function(String imageUrl)? image,
    TResult Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
    required TResult orElse(),
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(TextContent value) text,
    required TResult Function(ImageContent value) image,
    required TResult Function(QuizMultipleChoiceContent value)
    quizMultipleChoice,
    required TResult Function(QuizFillInTheBlankContent value)
    quizFillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(TextContent value)? text,
    TResult? Function(ImageContent value)? image,
    TResult? Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult? Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
  }) => throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(TextContent value)? text,
    TResult Function(ImageContent value)? image,
    TResult Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
    required TResult orElse(),
  }) => throw _privateConstructorUsedError;

  /// Serializes this LessonContent to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LessonContentCopyWith<$Res> {
  factory $LessonContentCopyWith(
    LessonContent value,
    $Res Function(LessonContent) then,
  ) = _$LessonContentCopyWithImpl<$Res, LessonContent>;
}

/// @nodoc
class _$LessonContentCopyWithImpl<$Res, $Val extends LessonContent>
    implements $LessonContentCopyWith<$Res> {
  _$LessonContentCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
}

/// @nodoc
abstract class _$$TextContentImplCopyWith<$Res> {
  factory _$$TextContentImplCopyWith(
    _$TextContentImpl value,
    $Res Function(_$TextContentImpl) then,
  ) = __$$TextContentImplCopyWithImpl<$Res>;
  @useResult
  $Res call({String text, String? audioUrl});
}

/// @nodoc
class __$$TextContentImplCopyWithImpl<$Res>
    extends _$LessonContentCopyWithImpl<$Res, _$TextContentImpl>
    implements _$$TextContentImplCopyWith<$Res> {
  __$$TextContentImplCopyWithImpl(
    _$TextContentImpl _value,
    $Res Function(_$TextContentImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? text = null, Object? audioUrl = freezed}) {
    return _then(
      _$TextContentImpl(
        text: null == text
            ? _value.text
            : text // ignore: cast_nullable_to_non_nullable
                  as String,
        audioUrl: freezed == audioUrl
            ? _value.audioUrl
            : audioUrl // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$TextContentImpl implements TextContent {
  const _$TextContentImpl({
    required this.text,
    this.audioUrl,
    final String? $type,
  }) : $type = $type ?? 'text';

  factory _$TextContentImpl.fromJson(Map<String, dynamic> json) =>
      _$$TextContentImplFromJson(json);

  @override
  final String text;
  // 本文ナレーション音声。ローカルアセット相対パス（例 audio/1-1.mp3）。
  @override
  final String? audioUrl;

  @JsonKey(name: 'type')
  final String $type;

  @override
  String toString() {
    return 'LessonContent.text(text: $text, audioUrl: $audioUrl)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$TextContentImpl &&
            (identical(other.text, text) || other.text == text) &&
            (identical(other.audioUrl, audioUrl) ||
                other.audioUrl == audioUrl));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, text, audioUrl);

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$TextContentImplCopyWith<_$TextContentImpl> get copyWith =>
      __$$TextContentImplCopyWithImpl<_$TextContentImpl>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(String text, String? audioUrl) text,
    required TResult Function(String imageUrl) image,
    required TResult Function(List<String> options, int correctOptionIndex)
    quizMultipleChoice,
    required TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )
    quizFillInTheBlank,
  }) {
    return text(this.text, audioUrl);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(String text, String? audioUrl)? text,
    TResult? Function(String imageUrl)? image,
    TResult? Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult? Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
  }) {
    return text?.call(this.text, audioUrl);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(String text, String? audioUrl)? text,
    TResult Function(String imageUrl)? image,
    TResult Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (text != null) {
      return text(this.text, audioUrl);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(TextContent value) text,
    required TResult Function(ImageContent value) image,
    required TResult Function(QuizMultipleChoiceContent value)
    quizMultipleChoice,
    required TResult Function(QuizFillInTheBlankContent value)
    quizFillInTheBlank,
  }) {
    return text(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(TextContent value)? text,
    TResult? Function(ImageContent value)? image,
    TResult? Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult? Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
  }) {
    return text?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(TextContent value)? text,
    TResult Function(ImageContent value)? image,
    TResult Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (text != null) {
      return text(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$TextContentImplToJson(this);
  }
}

abstract class TextContent implements LessonContent {
  const factory TextContent({
    required final String text,
    final String? audioUrl,
  }) = _$TextContentImpl;

  factory TextContent.fromJson(Map<String, dynamic> json) =
      _$TextContentImpl.fromJson;

  String get text; // 本文ナレーション音声。ローカルアセット相対パス（例 audio/1-1.mp3）。
  String? get audioUrl;

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$TextContentImplCopyWith<_$TextContentImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$ImageContentImplCopyWith<$Res> {
  factory _$$ImageContentImplCopyWith(
    _$ImageContentImpl value,
    $Res Function(_$ImageContentImpl) then,
  ) = __$$ImageContentImplCopyWithImpl<$Res>;
  @useResult
  $Res call({String imageUrl});
}

/// @nodoc
class __$$ImageContentImplCopyWithImpl<$Res>
    extends _$LessonContentCopyWithImpl<$Res, _$ImageContentImpl>
    implements _$$ImageContentImplCopyWith<$Res> {
  __$$ImageContentImplCopyWithImpl(
    _$ImageContentImpl _value,
    $Res Function(_$ImageContentImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? imageUrl = null}) {
    return _then(
      _$ImageContentImpl(
        imageUrl: null == imageUrl
            ? _value.imageUrl
            : imageUrl // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ImageContentImpl implements ImageContent {
  const _$ImageContentImpl({required this.imageUrl, final String? $type})
    : $type = $type ?? 'image';

  factory _$ImageContentImpl.fromJson(Map<String, dynamic> json) =>
      _$$ImageContentImplFromJson(json);

  @override
  final String imageUrl;

  @JsonKey(name: 'type')
  final String $type;

  @override
  String toString() {
    return 'LessonContent.image(imageUrl: $imageUrl)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ImageContentImpl &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, imageUrl);

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ImageContentImplCopyWith<_$ImageContentImpl> get copyWith =>
      __$$ImageContentImplCopyWithImpl<_$ImageContentImpl>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(String text, String? audioUrl) text,
    required TResult Function(String imageUrl) image,
    required TResult Function(List<String> options, int correctOptionIndex)
    quizMultipleChoice,
    required TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )
    quizFillInTheBlank,
  }) {
    return image(imageUrl);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(String text, String? audioUrl)? text,
    TResult? Function(String imageUrl)? image,
    TResult? Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult? Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
  }) {
    return image?.call(imageUrl);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(String text, String? audioUrl)? text,
    TResult Function(String imageUrl)? image,
    TResult Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (image != null) {
      return image(imageUrl);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(TextContent value) text,
    required TResult Function(ImageContent value) image,
    required TResult Function(QuizMultipleChoiceContent value)
    quizMultipleChoice,
    required TResult Function(QuizFillInTheBlankContent value)
    quizFillInTheBlank,
  }) {
    return image(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(TextContent value)? text,
    TResult? Function(ImageContent value)? image,
    TResult? Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult? Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
  }) {
    return image?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(TextContent value)? text,
    TResult Function(ImageContent value)? image,
    TResult Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (image != null) {
      return image(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$ImageContentImplToJson(this);
  }
}

abstract class ImageContent implements LessonContent {
  const factory ImageContent({required final String imageUrl}) =
      _$ImageContentImpl;

  factory ImageContent.fromJson(Map<String, dynamic> json) =
      _$ImageContentImpl.fromJson;

  String get imageUrl;

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ImageContentImplCopyWith<_$ImageContentImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$QuizMultipleChoiceContentImplCopyWith<$Res> {
  factory _$$QuizMultipleChoiceContentImplCopyWith(
    _$QuizMultipleChoiceContentImpl value,
    $Res Function(_$QuizMultipleChoiceContentImpl) then,
  ) = __$$QuizMultipleChoiceContentImplCopyWithImpl<$Res>;
  @useResult
  $Res call({List<String> options, int correctOptionIndex});
}

/// @nodoc
class __$$QuizMultipleChoiceContentImplCopyWithImpl<$Res>
    extends _$LessonContentCopyWithImpl<$Res, _$QuizMultipleChoiceContentImpl>
    implements _$$QuizMultipleChoiceContentImplCopyWith<$Res> {
  __$$QuizMultipleChoiceContentImplCopyWithImpl(
    _$QuizMultipleChoiceContentImpl _value,
    $Res Function(_$QuizMultipleChoiceContentImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? options = null, Object? correctOptionIndex = null}) {
    return _then(
      _$QuizMultipleChoiceContentImpl(
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
class _$QuizMultipleChoiceContentImpl implements QuizMultipleChoiceContent {
  const _$QuizMultipleChoiceContentImpl({
    required final List<String> options,
    required this.correctOptionIndex,
    final String? $type,
  }) : _options = options,
       $type = $type ?? 'quizMultipleChoice';

  factory _$QuizMultipleChoiceContentImpl.fromJson(Map<String, dynamic> json) =>
      _$$QuizMultipleChoiceContentImplFromJson(json);

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
    return 'LessonContent.quizMultipleChoice(options: $options, correctOptionIndex: $correctOptionIndex)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$QuizMultipleChoiceContentImpl &&
            const DeepCollectionEquality().equals(other._options, _options) &&
            (identical(other.correctOptionIndex, correctOptionIndex) ||
                other.correctOptionIndex == correctOptionIndex));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_options),
    correctOptionIndex,
  );

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$QuizMultipleChoiceContentImplCopyWith<_$QuizMultipleChoiceContentImpl>
  get copyWith =>
      __$$QuizMultipleChoiceContentImplCopyWithImpl<
        _$QuizMultipleChoiceContentImpl
      >(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(String text, String? audioUrl) text,
    required TResult Function(String imageUrl) image,
    required TResult Function(List<String> options, int correctOptionIndex)
    quizMultipleChoice,
    required TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )
    quizFillInTheBlank,
  }) {
    return quizMultipleChoice(options, correctOptionIndex);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(String text, String? audioUrl)? text,
    TResult? Function(String imageUrl)? image,
    TResult? Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult? Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
  }) {
    return quizMultipleChoice?.call(options, correctOptionIndex);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(String text, String? audioUrl)? text,
    TResult Function(String imageUrl)? image,
    TResult Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (quizMultipleChoice != null) {
      return quizMultipleChoice(options, correctOptionIndex);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(TextContent value) text,
    required TResult Function(ImageContent value) image,
    required TResult Function(QuizMultipleChoiceContent value)
    quizMultipleChoice,
    required TResult Function(QuizFillInTheBlankContent value)
    quizFillInTheBlank,
  }) {
    return quizMultipleChoice(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(TextContent value)? text,
    TResult? Function(ImageContent value)? image,
    TResult? Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult? Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
  }) {
    return quizMultipleChoice?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(TextContent value)? text,
    TResult Function(ImageContent value)? image,
    TResult Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (quizMultipleChoice != null) {
      return quizMultipleChoice(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$QuizMultipleChoiceContentImplToJson(this);
  }
}

abstract class QuizMultipleChoiceContent implements LessonContent {
  const factory QuizMultipleChoiceContent({
    required final List<String> options,
    required final int correctOptionIndex,
  }) = _$QuizMultipleChoiceContentImpl;

  factory QuizMultipleChoiceContent.fromJson(Map<String, dynamic> json) =
      _$QuizMultipleChoiceContentImpl.fromJson;

  List<String> get options; // 正解の選択肢インデックス（0始まり）。
  int get correctOptionIndex;

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$QuizMultipleChoiceContentImplCopyWith<_$QuizMultipleChoiceContentImpl>
  get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$QuizFillInTheBlankContentImplCopyWith<$Res> {
  factory _$$QuizFillInTheBlankContentImplCopyWith(
    _$QuizFillInTheBlankContentImpl value,
    $Res Function(_$QuizFillInTheBlankContentImpl) then,
  ) = __$$QuizFillInTheBlankContentImplCopyWithImpl<$Res>;
  @useResult
  $Res call({
    String question,
    List<String> options,
    List<int> correctOptionIndices,
  });
}

/// @nodoc
class __$$QuizFillInTheBlankContentImplCopyWithImpl<$Res>
    extends _$LessonContentCopyWithImpl<$Res, _$QuizFillInTheBlankContentImpl>
    implements _$$QuizFillInTheBlankContentImplCopyWith<$Res> {
  __$$QuizFillInTheBlankContentImplCopyWithImpl(
    _$QuizFillInTheBlankContentImpl _value,
    $Res Function(_$QuizFillInTheBlankContentImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? question = null,
    Object? options = null,
    Object? correctOptionIndices = null,
  }) {
    return _then(
      _$QuizFillInTheBlankContentImpl(
        question: null == question
            ? _value.question
            : question // ignore: cast_nullable_to_non_nullable
                  as String,
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
class _$QuizFillInTheBlankContentImpl implements QuizFillInTheBlankContent {
  const _$QuizFillInTheBlankContentImpl({
    required this.question,
    required final List<String> options,
    required final List<int> correctOptionIndices,
    final String? $type,
  }) : _options = options,
       _correctOptionIndices = correctOptionIndices,
       $type = $type ?? 'quizFillInTheBlank';

  factory _$QuizFillInTheBlankContentImpl.fromJson(Map<String, dynamic> json) =>
      _$$QuizFillInTheBlankContentImplFromJson(json);

  // 問題文。空欄は `[__]` で表現。
  @override
  final String question;
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
    return 'LessonContent.quizFillInTheBlank(question: $question, options: $options, correctOptionIndices: $correctOptionIndices)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$QuizFillInTheBlankContentImpl &&
            (identical(other.question, question) ||
                other.question == question) &&
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
    const DeepCollectionEquality().hash(_options),
    const DeepCollectionEquality().hash(_correctOptionIndices),
  );

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$QuizFillInTheBlankContentImplCopyWith<_$QuizFillInTheBlankContentImpl>
  get copyWith =>
      __$$QuizFillInTheBlankContentImplCopyWithImpl<
        _$QuizFillInTheBlankContentImpl
      >(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(String text, String? audioUrl) text,
    required TResult Function(String imageUrl) image,
    required TResult Function(List<String> options, int correctOptionIndex)
    quizMultipleChoice,
    required TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )
    quizFillInTheBlank,
  }) {
    return quizFillInTheBlank(question, options, correctOptionIndices);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(String text, String? audioUrl)? text,
    TResult? Function(String imageUrl)? image,
    TResult? Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult? Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
  }) {
    return quizFillInTheBlank?.call(question, options, correctOptionIndices);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(String text, String? audioUrl)? text,
    TResult Function(String imageUrl)? image,
    TResult Function(List<String> options, int correctOptionIndex)?
    quizMultipleChoice,
    TResult Function(
      String question,
      List<String> options,
      List<int> correctOptionIndices,
    )?
    quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (quizFillInTheBlank != null) {
      return quizFillInTheBlank(question, options, correctOptionIndices);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(TextContent value) text,
    required TResult Function(ImageContent value) image,
    required TResult Function(QuizMultipleChoiceContent value)
    quizMultipleChoice,
    required TResult Function(QuizFillInTheBlankContent value)
    quizFillInTheBlank,
  }) {
    return quizFillInTheBlank(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(TextContent value)? text,
    TResult? Function(ImageContent value)? image,
    TResult? Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult? Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
  }) {
    return quizFillInTheBlank?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(TextContent value)? text,
    TResult Function(ImageContent value)? image,
    TResult Function(QuizMultipleChoiceContent value)? quizMultipleChoice,
    TResult Function(QuizFillInTheBlankContent value)? quizFillInTheBlank,
    required TResult orElse(),
  }) {
    if (quizFillInTheBlank != null) {
      return quizFillInTheBlank(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$QuizFillInTheBlankContentImplToJson(this);
  }
}

abstract class QuizFillInTheBlankContent implements LessonContent {
  const factory QuizFillInTheBlankContent({
    required final String question,
    required final List<String> options,
    required final List<int> correctOptionIndices,
  }) = _$QuizFillInTheBlankContentImpl;

  factory QuizFillInTheBlankContent.fromJson(Map<String, dynamic> json) =
      _$QuizFillInTheBlankContentImpl.fromJson;

  // 問題文。空欄は `[__]` で表現。
  String get question; // 選択肢（同一内容の重複は不可）。options数 ≥ 空欄数。
  List<String>
  get options; // 各空欄の正解。correctOptionIndices[n] = 出現順 n 番目の `[__]` の
  // 正解 = options のインデックス。値は重複しない。
  List<int> get correctOptionIndices;

  /// Create a copy of LessonContent
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$QuizFillInTheBlankContentImplCopyWith<_$QuizFillInTheBlankContentImpl>
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
