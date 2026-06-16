import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_providers.dart';

/// 暗記カード内容（デッキ）。contents/anki/{id}.json を都度ロードして表示。
class Anki extends ConsumerWidget {
  const Anki({super.key, required this.id, required this.title});

  final String id;
  final String title;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final deck = ref.watch(ankiProvider(id));
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: deck.when(
        data: (d) => ListView.builder(
          padding: const EdgeInsets.all(12),
          itemCount: d.cards.length,
          itemBuilder: (context, i) {
            final card = d.cards[i];
            return Card(
              child: ListTile(
                title: Text(card.front),
                subtitle: Text(card.back),
              ),
            );
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}
