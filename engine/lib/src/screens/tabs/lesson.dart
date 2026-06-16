import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_models.dart' as models;
import '../../content/content_providers.dart';
import 'widgets/lesson_contents.dart';
import 'widgets/lesson_page_controller.dart';

/// レッスン内容。contents/lessons/{id}.json を都度ロードして表示。
///
/// docs/LESSON.md の構造に従い、`pages` を1ページずつページ送りで表示する。
/// フッターのボタンで「回答する / 次へ」を切り替え、全ページ通過後に完了
/// ページを表示する。
class Lesson extends ConsumerWidget {
  const Lesson({super.key, required this.id, required this.title});

  final String id;
  final String title;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lesson = ref.watch(lessonProvider(id));
    final basePath = ref.watch(appConfigProvider).contentBasePath;

    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: lesson.when(
        data: (l) => _LessonPager(lesson: l, assetBasePath: basePath),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}

/// ページ送りと回答状態を管理する本体。
class _LessonPager extends StatefulWidget {
  const _LessonPager({required this.lesson, required this.assetBasePath});

  final models.Lesson lesson;
  final String assetBasePath;

  @override
  State<_LessonPager> createState() => _LessonPagerState();
}

class _LessonPagerState extends State<_LessonPager> {
  final _pageController = PageController();

  /// 各コンテンツページの回答状態コントローラ（ページ数ぶん）。
  late List<LessonPageController> _controllers;

  /// 現在のページ番号。`pages.length` は完了ページを指す。
  int _index = 0;

  List<models.LessonPage> get _pages => widget.lesson.pages;

  bool get _onCompletion => _index >= _pages.length;

  @override
  void initState() {
    super.initState();
    _controllers = [
      for (final page in _pages) LessonPageController(page),
    ];
  }

  @override
  void dispose() {
    for (final c in _controllers) {
      c.dispose();
    }
    _pageController.dispose();
    super.dispose();
  }

  void _goTo(int index) {
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 280),
      curve: Curves.easeInOut,
    );
  }

  void _restart() {
    setState(() {
      for (final c in _controllers) {
        c.dispose();
      }
      _controllers = [
        for (final page in _pages) LessonPageController(page),
      ];
    });
    _goTo(0);
  }

  @override
  Widget build(BuildContext context) {
    final totalSteps = _pages.length + 1; // 完了ページを含む

    return Column(
      children: [
        Expanded(
          child: PageView.builder(
            controller: _pageController,
            // ナビゲーションはフッターのボタンに限定する。
            physics: const NeverScrollableScrollPhysics(),
            itemCount: totalSteps,
            onPageChanged: (i) => setState(() => _index = i),
            itemBuilder: (context, i) {
              if (i >= _pages.length) {
                return _CompletionPage(
                  exercises: widget.lesson.exercises,
                  onRestart: _restart,
                );
              }
              return _PageContent(
                page: _pages[i],
                controller: _controllers[i],
                assetBasePath: widget.assetBasePath,
              );
            },
          ),
        ),
        if (!_onCompletion) _buildFooter(totalSteps),
      ],
    );
  }

  Widget _buildFooter(int totalSteps) {
    final controller = _controllers[_index];
    final isLastContentPage = _index == _pages.length - 1;

    return AnimatedBuilder(
      animation: controller,
      builder: (context, _) {
        final theme = Theme.of(context);
        // クイズ未回答なら「回答する」、それ以外は「次へ / 完了する」。
        final needsAnswer = controller.hasQuiz && !controller.submitted;

        final String label;
        final VoidCallback? onPressed;
        if (needsAnswer) {
          label = '回答する';
          onPressed = controller.canSubmit ? controller.submit : null;
        } else {
          label = isLastContentPage ? '完了する' : '次へ';
          onPressed = () => _goTo(_index + 1);
        }

        return SafeArea(
          top: false,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  children: [
                    Text(
                      '${_index + 1} / ${_pages.length}',
                      style: theme.textTheme.bodySmall,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: LinearProgressIndicator(
                          value: (_index + 1) / _pages.length,
                          minHeight: 6,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    if (_index > 0)
                      TextButton(
                        onPressed: () => _goTo(_index - 1),
                        child: const Text('戻る'),
                      ),
                    const Spacer(),
                    FilledButton(
                      onPressed: onPressed,
                      child: Text(label),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

/// 1ページ分のコンテンツ列を縦に並べて表示する。
class _PageContent extends StatelessWidget {
  const _PageContent({
    required this.page,
    required this.controller,
    required this.assetBasePath,
  });

  final models.LessonPage page;
  final LessonPageController controller;
  final String assetBasePath;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        for (var i = 0; i < page.contents.length; i++) ...[
          if (i > 0) const SizedBox(height: 16),
          LessonContentView(
            content: page.contents[i],
            contentIndex: i,
            controller: controller,
            assetBasePath: assetBasePath,
          ),
        ],
      ],
    );
  }
}

/// 全ページ通過後に表示する完了ページ。
class _CompletionPage extends StatelessWidget {
  const _CompletionPage({required this.exercises, required this.onRestart});

  final List<int> exercises;
  final VoidCallback onRestart;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.celebration, size: 72, color: theme.colorScheme.primary),
            const SizedBox(height: 16),
            Text('学習完了！', style: theme.textTheme.headlineSmall),
            const SizedBox(height: 8),
            Text(
              'このレッスンのすべてのページを終えました。',
              style: theme.textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
            if (exercises.isNotEmpty) ...[
              const SizedBox(height: 24),
              Text('演習に挑戦', style: theme.textTheme.titleMedium),
              const SizedBox(height: 8),
              for (final id in exercises)
                Card(
                  child: ListTile(
                    leading: const Icon(Icons.assignment),
                    title: Text('演習 $id'),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () {},
                  ),
                ),
            ],
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                OutlinedButton.icon(
                  onPressed: onRestart,
                  icon: const Icon(Icons.replay),
                  label: const Text('最初から'),
                ),
                const SizedBox(width: 12),
                FilledButton(
                  onPressed: () => Navigator.of(context).maybePop(),
                  child: const Text('レッスンを閉じる'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
