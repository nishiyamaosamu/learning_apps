import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../content/content_providers.dart';

/// 暗記カードタブのトップ。base.json のデッキ一覧を表示し、選択で暗記カードへ遷移する。
class AnkiTop extends ConsumerWidget {
  const AnkiTop({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(contentIndexProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('暗記カード')),
      body: index.when(
        data: (idx) => ListView.builder(
          itemCount: idx.anki.length,
          itemBuilder: (context, i) {
            final item = idx.anki[i];
            return ListTile(
              leading: const Icon(Icons.style),
              title: Text(item.title),
              trailing: const Icon(Icons.chevron_right),
              onTap: () =>
                  context.push('/anki/${item.id}', extra: item.title),
            );
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}
