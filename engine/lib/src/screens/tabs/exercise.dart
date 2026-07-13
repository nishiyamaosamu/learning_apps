import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_providers.dart';
import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_typography.dart';
import '../../settings/exercise_progress.dart';
import '../../settings/exercise_results.dart';
import '../widgets/entity_list.dart';
import '../widgets/exercise_summary_card.dart';
import '../widgets/last_opened_badge.dart';
import '../widgets/video_list.dart' show VideoSectionHeader;
import 'exercise_quiz.dart';
import 'widgets/exercise_chunks.dart';
import 'widgets/exercise_summary.dart';

/// 問題集（1年度）。contents/exercises/{id}.json を都度ロードし、上部に学習サマリー、
/// その下に分野別の「5問チャンク」一覧を表示する。タップで演習プレイヤーを開く。
class Exercise extends ConsumerWidget {
  const Exercise({super.key, required this.id, required this.title});

  final String id;
  final String title;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final exercise = ref.watch(exerciseProvider(id));
    final results = ref.watch(exerciseResultsProvider);
    final basePath = ref.watch(appConfigProvider).contentBasePath;
    final lastOpened = ref.watch(exerciseProgressProvider);
    final c = context.colors;

    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: exercise.when(
        data: (e) {
          final summary = computeExerciseSummary(
            exercises: [e],
            results: results,
          );
          final chunks = buildExerciseChunks(e);
          // 学習済み（全問正解）チャンクの集合。qico の左アイコンを緑チェックに
          // 切り替える判定に使う（[_ChunkStatus] の全問正解判定と同じ基準）。
          final completedChunks = {
            for (final chunk in chunks)
              if (_isChunkComplete(chunk, results)) chunk.chunkKey,
          };
          // 分野ごとにチャンクをまとめて「セクションヘッダー＋リストカード」にする。
          final sections = <_ChunkSection>[];
          for (final chunk in chunks) {
            if (sections.isEmpty ||
                sections.last.categoryId != chunk.categoryId) {
              sections.add(
                _ChunkSection(
                  categoryId: chunk.categoryId,
                  categoryLabel: chunk.categoryLabel,
                ),
              );
            }
            sections.last.chunks.add(chunk);
          }

          return ListView(
            padding: const EdgeInsets.symmetric(
              horizontal: AppLayout.screenMargin,
              vertical: 12,
            ),
            children: [
              ExerciseSummaryCard(summary: summary),
              for (final section in sections) ...[
                const SizedBox(height: 12),
                VideoSectionHeader(title: section.categoryLabel),
                const SizedBox(height: 12),
                EntityListCard(
                  children: [
                    for (final chunk in section.chunks)
                      QicoRow(
                        icon: completedChunks.contains(chunk.chunkKey)
                            ? Icons.check_rounded
                            : Icons.quiz_rounded,
                        iconColor: completedChunks.contains(chunk.chunkKey)
                            ? c.correct
                            : null,
                        iconBackgroundColor:
                            completedChunks.contains(chunk.chunkKey)
                            ? c.correctSurface
                            : null,
                        title: chunk.rangeLabel,
                        maxLines: 1,
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            // 前回開いたチャンクだけ、小さな「前回」ラベルを添える。
                            if (lastOpened != null &&
                                lastOpened.exerciseId == id &&
                                lastOpened.categoryId == chunk.categoryId &&
                                lastOpened.chunkIndex == chunk.chunkIndex) ...[
                              const LastOpenedBadge(),
                              const SizedBox(width: 8),
                            ],
                            _ChunkStatus(chunk: chunk, results: results),
                          ],
                        ),
                        onTap: () {
                          ref
                              .read(exerciseProgressProvider.notifier)
                              .markOpened(
                                ExerciseLastOpened(
                                  exerciseId: id,
                                  exerciseTitle: title,
                                  categoryId: chunk.categoryId,
                                  chunkIndex: chunk.chunkIndex,
                                ),
                              );
                          Navigator.of(context).push(
                            MaterialPageRoute<void>(
                              builder: (_) => ExerciseQuizScreen(
                                questions: chunk.questions,
                                assetBasePath: basePath,
                                title: chunk.label,
                              ),
                            ),
                          );
                        },
                      ),
                  ],
                ),
              ],
            ],
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('読み込みに失敗しました\n$err')),
      ),
    );
  }
}

/// チャンクが学習済み（全問正解）かどうか。qico の左アイコンを緑チェックに
/// 切り替える判定に使う（[_ChunkStatus] の全問正解判定と同じ基準）。
bool _isChunkComplete(ExerciseChunk chunk, Map<String, bool> results) =>
    chunk.questions.isNotEmpty &&
    chunk.questions.every((q) => results[q.qid] == true);

/// 同一分野のチャンクをまとめる中間表現。
class _ChunkSection {
  _ChunkSection({required this.categoryId, required this.categoryLabel});

  final String categoryId;
  final String categoryLabel;
  final List<ExerciseChunk> chunks = [];
}

/// チャンク行の右端の取り組み状態。
///
/// - 着手済み（全問正解も含む）: 正答数 n/総数 を等幅で（学習済みの緑チェックは
///   左の qico アイコン側が担うため、ここは全問正解でも n/total 表記のまま）
/// - 未着手: chevron
class _ChunkStatus extends StatelessWidget {
  const _ChunkStatus({required this.chunk, required this.results});

  final ExerciseChunk chunk;
  final Map<String, bool> results;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final total = chunk.questions.length;
    var answered = 0;
    var correct = 0;
    for (final q in chunk.questions) {
      final r = results[q.qid];
      if (r == null) continue;
      answered++;
      if (r) correct++;
    }

    if (answered > 0) {
      return Text(
        '$correct/$total',
        style: AppTypography.mono(
          AppTypography.caption,
        ).copyWith(color: c.textSecondary),
      );
    }
    return Icon(Icons.chevron_right, size: 18, color: c.textMuted);
  }
}
