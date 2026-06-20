// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'app_config.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

/// @nodoc
mixin _$AppConfig {
  String get title => throw _privateConstructorUsedError;
  Color get primaryColor => throw _privateConstructorUsedError;
  AppDesignScheme? get designScheme =>
      throw _privateConstructorUsedError; // ホーム下部に表示するタブと並び順。app 側で採用するタブを選ぶ。
  List<EngineTab> get tabs =>
      throw _privateConstructorUsedError; // コンテンツ（JSON）を格納したアプリ側アセットのベースパス。
  // 例: 'contents' → contents/base.json, contents/lessons/1.json
  String get contentBasePath =>
      throw _privateConstructorUsedError; // レッスン図解アニメのレジストリ（キー↔ビルダー）。レッスンJSONの
  // `animationKey` を解決する。未登録キーは静かに無視され、画像/テキスト
  // 表示にフォールバックする。
  Map<String, Widget Function(BuildContext, int)> get animations =>
      throw _privateConstructorUsedError;

  /// Create a copy of AppConfig
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AppConfigCopyWith<AppConfig> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AppConfigCopyWith<$Res> {
  factory $AppConfigCopyWith(AppConfig value, $Res Function(AppConfig) then) =
      _$AppConfigCopyWithImpl<$Res, AppConfig>;
  @useResult
  $Res call({
    String title,
    Color primaryColor,
    AppDesignScheme? designScheme,
    List<EngineTab> tabs,
    String contentBasePath,
    Map<String, Widget Function(BuildContext, int)> animations,
  });
}

/// @nodoc
class _$AppConfigCopyWithImpl<$Res, $Val extends AppConfig>
    implements $AppConfigCopyWith<$Res> {
  _$AppConfigCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AppConfig
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = null,
    Object? primaryColor = null,
    Object? designScheme = freezed,
    Object? tabs = null,
    Object? contentBasePath = null,
    Object? animations = null,
  }) {
    return _then(
      _value.copyWith(
            title: null == title
                ? _value.title
                : title // ignore: cast_nullable_to_non_nullable
                      as String,
            primaryColor: null == primaryColor
                ? _value.primaryColor
                : primaryColor // ignore: cast_nullable_to_non_nullable
                      as Color,
            designScheme: freezed == designScheme
                ? _value.designScheme
                : designScheme // ignore: cast_nullable_to_non_nullable
                      as AppDesignScheme?,
            tabs: null == tabs
                ? _value.tabs
                : tabs // ignore: cast_nullable_to_non_nullable
                      as List<EngineTab>,
            contentBasePath: null == contentBasePath
                ? _value.contentBasePath
                : contentBasePath // ignore: cast_nullable_to_non_nullable
                      as String,
            animations: null == animations
                ? _value.animations
                : animations // ignore: cast_nullable_to_non_nullable
                      as Map<String, Widget Function(BuildContext, int)>,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$AppConfigImplCopyWith<$Res>
    implements $AppConfigCopyWith<$Res> {
  factory _$$AppConfigImplCopyWith(
    _$AppConfigImpl value,
    $Res Function(_$AppConfigImpl) then,
  ) = __$$AppConfigImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String title,
    Color primaryColor,
    AppDesignScheme? designScheme,
    List<EngineTab> tabs,
    String contentBasePath,
    Map<String, Widget Function(BuildContext, int)> animations,
  });
}

/// @nodoc
class __$$AppConfigImplCopyWithImpl<$Res>
    extends _$AppConfigCopyWithImpl<$Res, _$AppConfigImpl>
    implements _$$AppConfigImplCopyWith<$Res> {
  __$$AppConfigImplCopyWithImpl(
    _$AppConfigImpl _value,
    $Res Function(_$AppConfigImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of AppConfig
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = null,
    Object? primaryColor = null,
    Object? designScheme = freezed,
    Object? tabs = null,
    Object? contentBasePath = null,
    Object? animations = null,
  }) {
    return _then(
      _$AppConfigImpl(
        title: null == title
            ? _value.title
            : title // ignore: cast_nullable_to_non_nullable
                  as String,
        primaryColor: null == primaryColor
            ? _value.primaryColor
            : primaryColor // ignore: cast_nullable_to_non_nullable
                  as Color,
        designScheme: freezed == designScheme
            ? _value.designScheme
            : designScheme // ignore: cast_nullable_to_non_nullable
                  as AppDesignScheme?,
        tabs: null == tabs
            ? _value._tabs
            : tabs // ignore: cast_nullable_to_non_nullable
                  as List<EngineTab>,
        contentBasePath: null == contentBasePath
            ? _value.contentBasePath
            : contentBasePath // ignore: cast_nullable_to_non_nullable
                  as String,
        animations: null == animations
            ? _value._animations
            : animations // ignore: cast_nullable_to_non_nullable
                  as Map<String, Widget Function(BuildContext, int)>,
      ),
    );
  }
}

/// @nodoc

class _$AppConfigImpl implements _AppConfig {
  const _$AppConfigImpl({
    required this.title,
    this.primaryColor = Colors.indigo,
    this.designScheme,
    final List<EngineTab> tabs = const [
      EngineTab.home,
      EngineTab.lesson,
      EngineTab.exercise,
      EngineTab.anki,
      EngineTab.settings,
    ],
    this.contentBasePath = 'contents',
    final Map<String, Widget Function(BuildContext, int)> animations =
        const <String, LessonAnimationBuilder>{},
  }) : _tabs = tabs,
       _animations = animations;

  @override
  final String title;
  @override
  @JsonKey()
  final Color primaryColor;
  @override
  final AppDesignScheme? designScheme;
  // ホーム下部に表示するタブと並び順。app 側で採用するタブを選ぶ。
  final List<EngineTab> _tabs;
  // ホーム下部に表示するタブと並び順。app 側で採用するタブを選ぶ。
  @override
  @JsonKey()
  List<EngineTab> get tabs {
    if (_tabs is EqualUnmodifiableListView) return _tabs;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_tabs);
  }

  // コンテンツ（JSON）を格納したアプリ側アセットのベースパス。
  // 例: 'contents' → contents/base.json, contents/lessons/1.json
  @override
  @JsonKey()
  final String contentBasePath;
  // レッスン図解アニメのレジストリ（キー↔ビルダー）。レッスンJSONの
  // `animationKey` を解決する。未登録キーは静かに無視され、画像/テキスト
  // 表示にフォールバックする。
  final Map<String, Widget Function(BuildContext, int)> _animations;
  // レッスン図解アニメのレジストリ（キー↔ビルダー）。レッスンJSONの
  // `animationKey` を解決する。未登録キーは静かに無視され、画像/テキスト
  // 表示にフォールバックする。
  @override
  @JsonKey()
  Map<String, Widget Function(BuildContext, int)> get animations {
    if (_animations is EqualUnmodifiableMapView) return _animations;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_animations);
  }

  @override
  String toString() {
    return 'AppConfig(title: $title, primaryColor: $primaryColor, designScheme: $designScheme, tabs: $tabs, contentBasePath: $contentBasePath, animations: $animations)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AppConfigImpl &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.primaryColor, primaryColor) ||
                other.primaryColor == primaryColor) &&
            (identical(other.designScheme, designScheme) ||
                other.designScheme == designScheme) &&
            const DeepCollectionEquality().equals(other._tabs, _tabs) &&
            (identical(other.contentBasePath, contentBasePath) ||
                other.contentBasePath == contentBasePath) &&
            const DeepCollectionEquality().equals(
              other._animations,
              _animations,
            ));
  }

  @override
  int get hashCode => Object.hash(
    runtimeType,
    title,
    primaryColor,
    designScheme,
    const DeepCollectionEquality().hash(_tabs),
    contentBasePath,
    const DeepCollectionEquality().hash(_animations),
  );

  /// Create a copy of AppConfig
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AppConfigImplCopyWith<_$AppConfigImpl> get copyWith =>
      __$$AppConfigImplCopyWithImpl<_$AppConfigImpl>(this, _$identity);
}

abstract class _AppConfig implements AppConfig {
  const factory _AppConfig({
    required final String title,
    final Color primaryColor,
    final AppDesignScheme? designScheme,
    final List<EngineTab> tabs,
    final String contentBasePath,
    final Map<String, Widget Function(BuildContext, int)> animations,
  }) = _$AppConfigImpl;

  @override
  String get title;
  @override
  Color get primaryColor;
  @override
  AppDesignScheme? get designScheme; // ホーム下部に表示するタブと並び順。app 側で採用するタブを選ぶ。
  @override
  List<EngineTab> get tabs; // コンテンツ（JSON）を格納したアプリ側アセットのベースパス。
  // 例: 'contents' → contents/base.json, contents/lessons/1.json
  @override
  String get contentBasePath; // レッスン図解アニメのレジストリ（キー↔ビルダー）。レッスンJSONの
  // `animationKey` を解決する。未登録キーは静かに無視され、画像/テキスト
  // 表示にフォールバックする。
  @override
  Map<String, Widget Function(BuildContext, int)> get animations;

  /// Create a copy of AppConfig
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AppConfigImplCopyWith<_$AppConfigImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
