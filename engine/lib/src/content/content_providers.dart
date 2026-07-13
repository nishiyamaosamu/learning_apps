import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../app/app_config.dart';
import 'content_models.dart';
import 'content_repository.dart';

part 'content_providers.g.dart';

/// アプリの [AppConfig]。EngineApp の ProviderScope で override される。
@riverpod
AppConfig appConfig(AppConfigRef ref) =>
    throw UnimplementedError('appConfigProvider must be overridden');

/// コンテンツリポジトリ。AppConfig のベースパスから生成。
@riverpod
ContentRepository contentRepository(ContentRepositoryRef ref) {
  final config = ref.watch(appConfigProvider);
  return ContentRepository(basePath: config.contentBasePath);
}

/// 初期ロードの一覧（base.json）。
@riverpod
Future<ContentIndex> contentIndex(ContentIndexRef ref) {
  return ref.watch(contentRepositoryProvider).loadIndex();
}

/// 講座内容を id 指定で都度ロード。
@riverpod
Future<Lesson> lesson(LessonRef ref, String id) {
  return ref.watch(contentRepositoryProvider).loadLesson(id);
}

/// [videoLookup] の結果。動画1本と、それが属する章・同章の「次の動画」列。
///
/// - [chapter]: その動画が属する章。
/// - [item]: 対象の動画。
/// - [upNext]: 同章内で [item] より後ろに並ぶ動画（視聴ページの「次の動画」用）。
///   最後の動画なら空。
typedef VideoLookupResult = ({
  VideoChapter chapter,
  VideoItem item,
  List<VideoItem> upNext,
});

/// 動画1本を id 指定で全章から探し、章・本体・「次の動画」をまとめて返す。
///
/// [ContentIndex.videos] の全章を走査し、id が一致する [VideoItem] を引く。
/// 見つからない場合は [StateError] を投げる（lessonProvider 同様、詳細画面側の
/// `AsyncValue.error` で扱う）。
@riverpod
Future<VideoLookupResult> videoLookup(VideoLookupRef ref, String id) async {
  final index = await ref.watch(contentIndexProvider.future);
  for (final chapter in index.videos) {
    final i = chapter.videos.indexWhere((v) => v.id == id);
    if (i != -1) {
      return (
        chapter: chapter,
        item: chapter.videos[i],
        upNext: chapter.videos.sublist(i + 1),
      );
    }
  }
  throw StateError('動画が見つかりません: $id');
}

/// 問題内容を id 指定で都度ロード。
@riverpod
Future<Exercise> exercise(ExerciseRef ref, String id) {
  return ref.watch(contentRepositoryProvider).loadExercise(id);
}

/// base.json の全問題集を読み込んで結合する（問題集タブの全体サマリー集計用）。
///
/// 進捗率の分母（全設問数）を出すために各年度の JSON をまとめてロードする。
/// 個々のロードは [exerciseProvider] を再利用する（キャッシュを共有する）。
@riverpod
Future<List<Exercise>> allExercises(AllExercisesRef ref) async {
  final index = await ref.watch(contentIndexProvider.future);
  return Future.wait([
    for (final group in index.exercises)
      for (final summary in group.exercises)
        ref.watch(exerciseProvider(summary.id).future),
  ]);
}

/// 暗記カード内容を id 指定で都度ロード。
@riverpod
Future<AnkiDeck> anki(AnkiRef ref, String id) {
  return ref.watch(contentRepositoryProvider).loadAnki(id);
}

/// base.json の全暗記デッキを読み込んで結合する（「全カードから10問」用）。
///
/// 全デッキのカードを混ぜてシャッフル出題するために各デッキの JSON をまとめて
/// ロードする。個々のロードは [ankiProvider] を再利用する（キャッシュを共有する）。
@riverpod
Future<List<AnkiDeck>> allAnkiDecks(AllAnkiDecksRef ref) async {
  final index = await ref.watch(contentIndexProvider.future);
  return Future.wait([
    for (final group in index.anki)
      for (final summary in group.anki)
        ref.watch(ankiProvider(summary.id).future),
  ]);
}
