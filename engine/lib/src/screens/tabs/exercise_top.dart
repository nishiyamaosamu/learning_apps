import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../content/content_providers.dart';

/// 問題集タブのトップ。base.json の問題一覧を表示し、選択で問題内容へ遷移する。
class ExerciseTop extends ConsumerWidget {
  const ExerciseTop({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(contentIndexProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('問題集')),
      body: index.when(
        data: (idx) => ListView.builder(
          itemCount: idx.exercises.length,
          itemBuilder: (context, i) {
            final item = idx.exercises[i];
            return ListTile(
              leading: const Icon(Icons.quiz),
              title: Text(item.title),
              trailing: const Icon(Icons.chevron_right),
              onTap: () =>
                  context.push('/exercises/${item.id}', extra: item.title),
            );
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}
