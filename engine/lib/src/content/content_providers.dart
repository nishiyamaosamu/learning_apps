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

/// 問題内容を id 指定で都度ロード。
@riverpod
Future<Exercise> exercise(ExerciseRef ref, String id) {
  return ref.watch(contentRepositoryProvider).loadExercise(id);
}

/// 暗記カード内容を id 指定で都度ロード。
@riverpod
Future<AnkiDeck> anki(AnkiRef ref, String id) {
  return ref.watch(contentRepositoryProvider).loadAnki(id);
}
