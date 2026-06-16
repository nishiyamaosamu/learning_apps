import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_providers.dart';

/// 講座内容。contents/lessons/{id}.json を都度ロードして表示。
class Lesson extends ConsumerWidget {
  const Lesson({super.key, required this.id, required this.title});

  final String id;
  final String title;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lesson = ref.watch(lessonProvider(id));
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: lesson.when(
        data: (l) => SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Text(l.body),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}
