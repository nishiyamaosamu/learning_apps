import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../content/content_models.dart';
import '../../content/content_providers.dart';
import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../settings/exercise_results.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/layout/content_max_width.dart';
import '../widgets/entity_list.dart';
import '../widgets/exercise_summary_card.dart';
import '../widgets/video_list.dart' show VideoSectionHeader;
import 'widgets/exercise_summary.dart';

/// 問題集タブのトップ。
///
/// DESIGN.html「問題集タブ」に対応。先頭に全体サマリーカード（進捗率＋正誤率＋
/// ○✕ 凡例）、続いてセクションヘッダーと問題集リスト（qico 行）を縦に並べる。
class ExerciseTop extends ConsumerWidget {
  const ExerciseTop({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(contentIndexProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('問題集')),
      body: index.when(
        data: (idx) => _ExerciseTopBody(exercises: idx.exercises),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}

class _ExerciseTopBody extends ConsumerWidget {
  const _ExerciseTopBody({required this.exercises});

  final List<ContentSummary> exercises;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (exercises.isEmpty) {
      return const EmptyState(
        icon: Icons.quiz_rounded,
        label: 'まだ問題集がありません',
        description: 'コンテンツが追加されると、ここに問題集が並びます。',
      );
    }

    // 全体サマリー：全問題集を読み込んで進捗率の分母（総設問数）を出す。
    // 読み込み中は総数不明のため回答件数だけ（進捗バーは空）で先に描く。
    final results = ref.watch(exerciseResultsProvider);
    final allExercises = ref.watch(allExercisesProvider);
    final summary = computeExerciseSummary(
      exercises: allExercises.valueOrNull ?? const <Exercise>[],
      results: results,
    );

    return ContentMaxWidth(
      child: ListView(
        padding: const EdgeInsets.symmetric(
          horizontal: AppLayout.screenMargin,
          vertical: 12,
        ),
        children: [
          ExerciseSummaryCard(summary: summary),
          const SizedBox(height: 12),
          const VideoSectionHeader(title: '問題集'),
          const SizedBox(height: 12),
          EntityListCard(
            children: [
              for (final item in exercises)
                QicoRow(
                  icon: Icons.quiz_rounded,
                  title: item.title,
                  trailing: Icon(
                    Icons.chevron_right,
                    size: 18,
                    color: context.colors.textMuted,
                  ),
                  onTap: () =>
                      context.push('/exercises/${item.id}', extra: item.title),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
