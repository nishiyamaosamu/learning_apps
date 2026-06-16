import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../content/content_providers.dart';

/// 講座タブのトップ。base.json の講座一覧を表示し、選択で講座内容へ遷移する。
class LessonTop extends ConsumerWidget {
  const LessonTop({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(contentIndexProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('講座')),
      body: index.when(
        data: (idx) => ListView.builder(
          itemCount: idx.lessons.length,
          itemBuilder: (context, i) {
            final item = idx.lessons[i];
            return ListTile(
              leading: const Icon(Icons.menu_book),
              title: Text(item.title),
              trailing: const Icon(Icons.chevron_right),
              onTap: () =>
                  context.push('/lessons/${item.id}', extra: item.title),
            );
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}
