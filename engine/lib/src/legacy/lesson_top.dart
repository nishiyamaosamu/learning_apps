// 旧テキストレッスン一覧UI（講座タブのトップ）。ルート未接続・到達不可。
// 動画講座（VideoTop）に置き換え済み。`context.push('/lessons/:id')` は現在の
// router に存在しないルートを指す（復活時に router へ再接続する前提の温存コード）。
// 詳細は engine/lib/src/legacy/README.md を参照。
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../content/content_models.dart';
import '../content/content_providers.dart';

/// 講座タブのトップ。base.json の講座一覧を表示し、選択で講座内容へ遷移する。
class LessonTop extends ConsumerWidget {
  const LessonTop({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(contentIndexProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('講座')),
      body: index.when(
        data: (idx) => _LessonCategoryList(domains: idx.lessons),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}

class _LessonCategoryList extends StatelessWidget {
  const _LessonCategoryList({required this.domains});

  final List<LessonDomain> domains;

  @override
  Widget build(BuildContext context) {
    final categories = [
      for (final domain in domains)
        for (final majorCategory in domain.majorCategories)
          if (majorCategory.middleCategories.any(
            (middleCategory) => middleCategory.lessons.isNotEmpty,
          ))
            (domain: domain, majorCategory: majorCategory),
    ];

    if (categories.isEmpty) {
      return const Center(child: Text('講座がありません'));
    }

    return ListView.separated(
      padding: const EdgeInsets.all(12),
      itemCount: categories.length,
      separatorBuilder: (_, _) => const SizedBox(height: 8),
      itemBuilder: (context, index) {
        final category = categories[index];
        return _MajorCategoryTile(
          key: PageStorageKey(
            '${category.domain.id}/${category.majorCategory.id}',
          ),
          domain: category.domain,
          majorCategory: category.majorCategory,
        );
      },
    );
  }
}

class _MajorCategoryTile extends StatelessWidget {
  const _MajorCategoryTile({
    super.key,
    required this.domain,
    required this.majorCategory,
  });

  final LessonDomain domain;
  final LessonMajorCategory majorCategory;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final middleCategories = majorCategory.middleCategories.where(
      (category) => category.lessons.isNotEmpty,
    );

    return Card(
      margin: EdgeInsets.zero,
      clipBehavior: Clip.antiAlias,
      child: ExpansionTile(
        initiallyExpanded: true,
        maintainState: true,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: colorScheme.primaryContainer,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(
                domain.title,
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: colorScheme.onPrimaryContainer,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                majorCategory.title,
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
          ],
        ),
        children: [
          for (final middleCategory in middleCategories)
            _MiddleCategorySection(category: middleCategory),
        ],
      ),
    );
  }
}

class _MiddleCategorySection extends StatelessWidget {
  const _MiddleCategorySection({required this.category});

  final LessonMiddleCategory category;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: double.infinity,
          color: theme.colorScheme.surfaceContainerLow,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Text(category.title, style: theme.textTheme.labelLarge),
        ),
        for (final lesson in category.lessons)
          ListTile(
            contentPadding: const EdgeInsets.only(left: 24, right: 16),
            leading: const Icon(Icons.menu_book_outlined),
            title: Text(lesson.title),
            trailing: const Icon(Icons.chevron_right),
            onTap: () =>
                context.push('/lessons/${lesson.id}', extra: lesson.title),
          ),
      ],
    );
  }
}
