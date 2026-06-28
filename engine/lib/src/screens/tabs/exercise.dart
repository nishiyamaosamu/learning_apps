import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_models.dart';
import '../../content/content_providers.dart';
import '../../settings/exercise_results.dart';
import 'exercise_quiz.dart';
import 'widgets/exercise_chunks.dart';

/// 問題集（1年度）。contents/exercises/{id}.json を都度ロードし、上部に学習進捗バー、
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

    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: exercise.when(
        data: (e) {
          final chunks = buildExerciseChunks(e);
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _ProgressPanel(questions: e.questions, results: results),
              const Divider(height: 1),
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.only(bottom: 16),
                  itemCount: chunks.length,
                  itemBuilder: (context, i) {
                    final chunk = chunks[i];
                    // チャンクの全qidが記録済みなら完了とみなす。
                    final done = chunk.questions.every(
                      (q) => results.containsKey(q.qid),
                    );
                    final showHeader =
                        i == 0 || chunks[i - 1].categoryId != chunk.categoryId;

                    final tile = ListTile(
                      title: Text(chunk.rangeLabel),
                      trailing: done
                          ? const Icon(Icons.check_circle, color: Colors.green)
                          : const Icon(Icons.chevron_right),
                      onTap: () => Navigator.of(context).push(
                        MaterialPageRoute<void>(
                          builder: (_) => ExerciseQuizScreen(
                            questions: chunk.questions,
                            assetBasePath: basePath,
                            title: chunk.label,
                          ),
                        ),
                      ),
                    );

                    if (!showHeader) return tile;
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        _CategoryHeader(label: chunk.categoryLabel),
                        tile,
                      ],
                    );
                  },
                ),
              ),
            ],
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('読み込みに失敗しました\n$err')),
      ),
    );
  }
}

/// 学習進捗パネル。進捗率（=(正解+誤答)/全問）と、正解／誤答／未学習の
/// 積み上げバー＋件数の凡例を表示する。
class _ProgressPanel extends StatelessWidget {
  const _ProgressPanel({required this.questions, required this.results});

  final List<ExerciseQuestion> questions;
  final Map<String, bool> results;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final total = questions.length;
    var correct = 0;
    var wrong = 0;
    for (final q in questions) {
      final r = results[q.qid];
      if (r == true) {
        correct++;
      } else if (r == false) {
        wrong++;
      }
    }
    final unlearned = total - correct - wrong;
    final rate = total == 0 ? 0 : ((correct + wrong) / total * 100).round();

    final unlearnedColor = theme.colorScheme.surfaceContainerHighest;

    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text('進捗', style: theme.textTheme.titleSmall),
              const Spacer(),
              Text(
                '$rate%',
                style: theme.textTheme.headlineSmall?.copyWith(
                  color: theme.colorScheme.primary,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          // 積み上げバー（正解=緑 / 誤答=赤 / 未学習=グレー）。
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: SizedBox(
              height: 12,
              child: Row(
                children: [
                  if (correct > 0)
                    Expanded(
                      flex: correct,
                      child: const ColoredBox(color: Colors.green),
                    ),
                  if (wrong > 0)
                    Expanded(
                      flex: wrong,
                      child: ColoredBox(color: theme.colorScheme.error),
                    ),
                  if (unlearned > 0)
                    Expanded(
                      flex: unlearned,
                      child: ColoredBox(color: unlearnedColor),
                    ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 10),
          // 件数の凡例。
          Row(
            children: [
              _LegendItem(color: Colors.green, label: '正解', count: correct),
              const SizedBox(width: 16),
              _LegendItem(
                color: theme.colorScheme.error,
                label: '誤答',
                count: wrong,
              ),
              const SizedBox(width: 16),
              _LegendItem(
                color: unlearnedColor,
                label: '未学習',
                count: unlearned,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// 進捗凡例の1項目（色ドット＋ラベル＋件数）。
class _LegendItem extends StatelessWidget {
  const _LegendItem({
    required this.color,
    required this.label,
    required this.count,
  });

  final Color color;
  final String label;
  final int count;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 10,
          height: 10,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 6),
        Text('$label $count', style: theme.textTheme.bodyMedium),
      ],
    );
  }
}

/// 分野ごとのセクション見出し。
class _CategoryHeader extends StatelessWidget {
  const _CategoryHeader({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 6),
      child: Text(
        label,
        style: theme.textTheme.titleSmall?.copyWith(
          color: theme.colorScheme.primary,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
