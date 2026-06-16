import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_providers.dart';

/// 問題内容。contents/exercises/{id}.json を都度ロードして表示。
class Exercise extends ConsumerWidget {
  const Exercise({super.key, required this.id, required this.title});

  final String id;
  final String title;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final exercise = ref.watch(exerciseProvider(id));
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: exercise.when(
        data: (e) => ListView.builder(
          itemCount: e.questions.length,
          itemBuilder: (context, i) {
            final q = e.questions[i];
            return ListTile(
              leading: CircleAvatar(child: Text('${i + 1}')),
              title: Text(q.prompt),
              subtitle: Text('答え: ${q.answer}'),
            );
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('読み込みに失敗しました\n$err')),
      ),
    );
  }
}
