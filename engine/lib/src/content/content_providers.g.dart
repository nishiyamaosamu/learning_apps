// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'content_providers.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$appConfigHash() => r'5b509d4e0d6680da8bb2c8df4b46dd114f8c58d2';

/// アプリの [AppConfig]。EngineApp の ProviderScope で override される。
///
/// Copied from [appConfig].
@ProviderFor(appConfig)
final appConfigProvider = AutoDisposeProvider<AppConfig>.internal(
  appConfig,
  name: r'appConfigProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$appConfigHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef AppConfigRef = AutoDisposeProviderRef<AppConfig>;
String _$contentRepositoryHash() => r'8a538f7c3e3ffa5c363006c4f0b7251b002edb8b';

/// コンテンツリポジトリ。AppConfig のベースパスから生成。
///
/// Copied from [contentRepository].
@ProviderFor(contentRepository)
final contentRepositoryProvider =
    AutoDisposeProvider<ContentRepository>.internal(
      contentRepository,
      name: r'contentRepositoryProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$contentRepositoryHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef ContentRepositoryRef = AutoDisposeProviderRef<ContentRepository>;
String _$contentIndexHash() => r'ba7f61d413cceddcadcaf9b15f2dd24466f84be8';

/// 初期ロードの一覧（base.json）。
///
/// Copied from [contentIndex].
@ProviderFor(contentIndex)
final contentIndexProvider = AutoDisposeFutureProvider<ContentIndex>.internal(
  contentIndex,
  name: r'contentIndexProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$contentIndexHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef ContentIndexRef = AutoDisposeFutureProviderRef<ContentIndex>;
String _$lessonHash() => r'95dd0ab4896752c7a558dff6137d04c10e0c36f2';

/// Copied from Dart SDK
class _SystemHash {
  _SystemHash._();

  static int combine(int hash, int value) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + value);
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
    return hash ^ (hash >> 6);
  }

  static int finish(int hash) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
    // ignore: parameter_assignments
    hash = hash ^ (hash >> 11);
    return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
  }
}

/// 講座内容を id 指定で都度ロード。
///
/// Copied from [lesson].
@ProviderFor(lesson)
const lessonProvider = LessonFamily();

/// 講座内容を id 指定で都度ロード。
///
/// Copied from [lesson].
class LessonFamily extends Family<AsyncValue<Lesson>> {
  /// 講座内容を id 指定で都度ロード。
  ///
  /// Copied from [lesson].
  const LessonFamily();

  /// 講座内容を id 指定で都度ロード。
  ///
  /// Copied from [lesson].
  LessonProvider call(String id) {
    return LessonProvider(id);
  }

  @override
  LessonProvider getProviderOverride(covariant LessonProvider provider) {
    return call(provider.id);
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'lessonProvider';
}

/// 講座内容を id 指定で都度ロード。
///
/// Copied from [lesson].
class LessonProvider extends AutoDisposeFutureProvider<Lesson> {
  /// 講座内容を id 指定で都度ロード。
  ///
  /// Copied from [lesson].
  LessonProvider(String id)
    : this._internal(
        (ref) => lesson(ref as LessonRef, id),
        from: lessonProvider,
        name: r'lessonProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$lessonHash,
        dependencies: LessonFamily._dependencies,
        allTransitiveDependencies: LessonFamily._allTransitiveDependencies,
        id: id,
      );

  LessonProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.id,
  }) : super.internal();

  final String id;

  @override
  Override overrideWith(FutureOr<Lesson> Function(LessonRef provider) create) {
    return ProviderOverride(
      origin: this,
      override: LessonProvider._internal(
        (ref) => create(ref as LessonRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        id: id,
      ),
    );
  }

  @override
  AutoDisposeFutureProviderElement<Lesson> createElement() {
    return _LessonProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is LessonProvider && other.id == id;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, id.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin LessonRef on AutoDisposeFutureProviderRef<Lesson> {
  /// The parameter `id` of this provider.
  String get id;
}

class _LessonProviderElement extends AutoDisposeFutureProviderElement<Lesson>
    with LessonRef {
  _LessonProviderElement(super.provider);

  @override
  String get id => (origin as LessonProvider).id;
}

String _$videoLookupHash() => r'c871e61248eeecffb0322fbf4dfa5d2b0d7e18ac';

/// 動画1本を id 指定で全章から探し、章・本体・「次の動画」をまとめて返す。
///
/// [ContentIndex.videos] の全章を走査し、id が一致する [VideoItem] を引く。
/// 見つからない場合は [StateError] を投げる（lessonProvider 同様、詳細画面側の
/// `AsyncValue.error` で扱う）。
///
/// Copied from [videoLookup].
@ProviderFor(videoLookup)
const videoLookupProvider = VideoLookupFamily();

/// 動画1本を id 指定で全章から探し、章・本体・「次の動画」をまとめて返す。
///
/// [ContentIndex.videos] の全章を走査し、id が一致する [VideoItem] を引く。
/// 見つからない場合は [StateError] を投げる（lessonProvider 同様、詳細画面側の
/// `AsyncValue.error` で扱う）。
///
/// Copied from [videoLookup].
class VideoLookupFamily extends Family<AsyncValue<VideoLookupResult>> {
  /// 動画1本を id 指定で全章から探し、章・本体・「次の動画」をまとめて返す。
  ///
  /// [ContentIndex.videos] の全章を走査し、id が一致する [VideoItem] を引く。
  /// 見つからない場合は [StateError] を投げる（lessonProvider 同様、詳細画面側の
  /// `AsyncValue.error` で扱う）。
  ///
  /// Copied from [videoLookup].
  const VideoLookupFamily();

  /// 動画1本を id 指定で全章から探し、章・本体・「次の動画」をまとめて返す。
  ///
  /// [ContentIndex.videos] の全章を走査し、id が一致する [VideoItem] を引く。
  /// 見つからない場合は [StateError] を投げる（lessonProvider 同様、詳細画面側の
  /// `AsyncValue.error` で扱う）。
  ///
  /// Copied from [videoLookup].
  VideoLookupProvider call(String id) {
    return VideoLookupProvider(id);
  }

  @override
  VideoLookupProvider getProviderOverride(
    covariant VideoLookupProvider provider,
  ) {
    return call(provider.id);
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'videoLookupProvider';
}

/// 動画1本を id 指定で全章から探し、章・本体・「次の動画」をまとめて返す。
///
/// [ContentIndex.videos] の全章を走査し、id が一致する [VideoItem] を引く。
/// 見つからない場合は [StateError] を投げる（lessonProvider 同様、詳細画面側の
/// `AsyncValue.error` で扱う）。
///
/// Copied from [videoLookup].
class VideoLookupProvider extends AutoDisposeFutureProvider<VideoLookupResult> {
  /// 動画1本を id 指定で全章から探し、章・本体・「次の動画」をまとめて返す。
  ///
  /// [ContentIndex.videos] の全章を走査し、id が一致する [VideoItem] を引く。
  /// 見つからない場合は [StateError] を投げる（lessonProvider 同様、詳細画面側の
  /// `AsyncValue.error` で扱う）。
  ///
  /// Copied from [videoLookup].
  VideoLookupProvider(String id)
    : this._internal(
        (ref) => videoLookup(ref as VideoLookupRef, id),
        from: videoLookupProvider,
        name: r'videoLookupProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$videoLookupHash,
        dependencies: VideoLookupFamily._dependencies,
        allTransitiveDependencies: VideoLookupFamily._allTransitiveDependencies,
        id: id,
      );

  VideoLookupProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.id,
  }) : super.internal();

  final String id;

  @override
  Override overrideWith(
    FutureOr<VideoLookupResult> Function(VideoLookupRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: VideoLookupProvider._internal(
        (ref) => create(ref as VideoLookupRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        id: id,
      ),
    );
  }

  @override
  AutoDisposeFutureProviderElement<VideoLookupResult> createElement() {
    return _VideoLookupProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is VideoLookupProvider && other.id == id;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, id.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin VideoLookupRef on AutoDisposeFutureProviderRef<VideoLookupResult> {
  /// The parameter `id` of this provider.
  String get id;
}

class _VideoLookupProviderElement
    extends AutoDisposeFutureProviderElement<VideoLookupResult>
    with VideoLookupRef {
  _VideoLookupProviderElement(super.provider);

  @override
  String get id => (origin as VideoLookupProvider).id;
}

String _$exerciseHash() => r'66c924a59442f5b47361a378b749cf1c5e9d2449';

/// 問題内容を id 指定で都度ロード。
///
/// Copied from [exercise].
@ProviderFor(exercise)
const exerciseProvider = ExerciseFamily();

/// 問題内容を id 指定で都度ロード。
///
/// Copied from [exercise].
class ExerciseFamily extends Family<AsyncValue<Exercise>> {
  /// 問題内容を id 指定で都度ロード。
  ///
  /// Copied from [exercise].
  const ExerciseFamily();

  /// 問題内容を id 指定で都度ロード。
  ///
  /// Copied from [exercise].
  ExerciseProvider call(String id) {
    return ExerciseProvider(id);
  }

  @override
  ExerciseProvider getProviderOverride(covariant ExerciseProvider provider) {
    return call(provider.id);
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'exerciseProvider';
}

/// 問題内容を id 指定で都度ロード。
///
/// Copied from [exercise].
class ExerciseProvider extends AutoDisposeFutureProvider<Exercise> {
  /// 問題内容を id 指定で都度ロード。
  ///
  /// Copied from [exercise].
  ExerciseProvider(String id)
    : this._internal(
        (ref) => exercise(ref as ExerciseRef, id),
        from: exerciseProvider,
        name: r'exerciseProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$exerciseHash,
        dependencies: ExerciseFamily._dependencies,
        allTransitiveDependencies: ExerciseFamily._allTransitiveDependencies,
        id: id,
      );

  ExerciseProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.id,
  }) : super.internal();

  final String id;

  @override
  Override overrideWith(
    FutureOr<Exercise> Function(ExerciseRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: ExerciseProvider._internal(
        (ref) => create(ref as ExerciseRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        id: id,
      ),
    );
  }

  @override
  AutoDisposeFutureProviderElement<Exercise> createElement() {
    return _ExerciseProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is ExerciseProvider && other.id == id;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, id.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin ExerciseRef on AutoDisposeFutureProviderRef<Exercise> {
  /// The parameter `id` of this provider.
  String get id;
}

class _ExerciseProviderElement
    extends AutoDisposeFutureProviderElement<Exercise>
    with ExerciseRef {
  _ExerciseProviderElement(super.provider);

  @override
  String get id => (origin as ExerciseProvider).id;
}

String _$allExercisesHash() => r'e5e02a8c19082fb1f0ba32647c196a96fad3c9f4';

/// base.json の全問題集を読み込んで結合する（問題集タブの全体サマリー集計用）。
///
/// 進捗率の分母（全設問数）を出すために各年度の JSON をまとめてロードする。
/// 個々のロードは [exerciseProvider] を再利用する（キャッシュを共有する）。
///
/// Copied from [allExercises].
@ProviderFor(allExercises)
final allExercisesProvider = AutoDisposeFutureProvider<List<Exercise>>.internal(
  allExercises,
  name: r'allExercisesProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$allExercisesHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef AllExercisesRef = AutoDisposeFutureProviderRef<List<Exercise>>;
String _$ankiHash() => r'a60dcd7aa0449b3e5376ad0d3d555b1e28df2802';

/// 暗記カード内容を id 指定で都度ロード。
///
/// Copied from [anki].
@ProviderFor(anki)
const ankiProvider = AnkiFamily();

/// 暗記カード内容を id 指定で都度ロード。
///
/// Copied from [anki].
class AnkiFamily extends Family<AsyncValue<AnkiDeck>> {
  /// 暗記カード内容を id 指定で都度ロード。
  ///
  /// Copied from [anki].
  const AnkiFamily();

  /// 暗記カード内容を id 指定で都度ロード。
  ///
  /// Copied from [anki].
  AnkiProvider call(String id) {
    return AnkiProvider(id);
  }

  @override
  AnkiProvider getProviderOverride(covariant AnkiProvider provider) {
    return call(provider.id);
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'ankiProvider';
}

/// 暗記カード内容を id 指定で都度ロード。
///
/// Copied from [anki].
class AnkiProvider extends AutoDisposeFutureProvider<AnkiDeck> {
  /// 暗記カード内容を id 指定で都度ロード。
  ///
  /// Copied from [anki].
  AnkiProvider(String id)
    : this._internal(
        (ref) => anki(ref as AnkiRef, id),
        from: ankiProvider,
        name: r'ankiProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$ankiHash,
        dependencies: AnkiFamily._dependencies,
        allTransitiveDependencies: AnkiFamily._allTransitiveDependencies,
        id: id,
      );

  AnkiProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.id,
  }) : super.internal();

  final String id;

  @override
  Override overrideWith(FutureOr<AnkiDeck> Function(AnkiRef provider) create) {
    return ProviderOverride(
      origin: this,
      override: AnkiProvider._internal(
        (ref) => create(ref as AnkiRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        id: id,
      ),
    );
  }

  @override
  AutoDisposeFutureProviderElement<AnkiDeck> createElement() {
    return _AnkiProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is AnkiProvider && other.id == id;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, id.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin AnkiRef on AutoDisposeFutureProviderRef<AnkiDeck> {
  /// The parameter `id` of this provider.
  String get id;
}

class _AnkiProviderElement extends AutoDisposeFutureProviderElement<AnkiDeck>
    with AnkiRef {
  _AnkiProviderElement(super.provider);

  @override
  String get id => (origin as AnkiProvider).id;
}

String _$allAnkiDecksHash() => r'fa620f92bbe816e314e21954bdd0c412270b413d';

/// base.json の全暗記デッキを読み込んで結合する（「全カードから10問」用）。
///
/// 全デッキのカードを混ぜてシャッフル出題するために各デッキの JSON をまとめて
/// ロードする。個々のロードは [ankiProvider] を再利用する（キャッシュを共有する）。
///
/// Copied from [allAnkiDecks].
@ProviderFor(allAnkiDecks)
final allAnkiDecksProvider = AutoDisposeFutureProvider<List<AnkiDeck>>.internal(
  allAnkiDecks,
  name: r'allAnkiDecksProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$allAnkiDecksHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef AllAnkiDecksRef = AutoDisposeFutureProviderRef<List<AnkiDeck>>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
