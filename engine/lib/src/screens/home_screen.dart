import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../app/app_config.dart';
import '../content/content_providers.dart';
import 'tabs/anki_top.dart';
import 'tabs/exercise_top.dart';
import 'tabs/lesson_top.dart';
import 'tabs/settings_top.dart';

/// タブバーの1項目を表す定義。
class _TabItem {
  const _TabItem({
    required this.label,
    required this.icon,
    required this.root,
  });

  final String label;
  final IconData icon;

  /// タブのトップ画面。
  final Widget root;
}

/// [EngineTab] からタブの中身（ラベル・アイコン・画面）への対応。
/// タブのロジックは engine が保持し、採用するタブは app 側が選ぶ。
_TabItem _itemFor(EngineTab tab) => switch (tab) {
      EngineTab.lesson =>
        const _TabItem(label: '講座', icon: Icons.menu_book, root: LessonTop()),
      EngineTab.exercise =>
        const _TabItem(label: '問題集', icon: Icons.quiz, root: ExerciseTop()),
      EngineTab.anki =>
        const _TabItem(label: '暗記カード', icon: Icons.style, root: AnkiTop()),
      EngineTab.settings => const _TabItem(
          label: '設定', icon: Icons.settings, root: SettingsTop()),
    };

/// 下部にタブバーを持つホーム画面のシェル。
/// 表示するタブは [AppConfig.tabs]（app 側の指定）から構築する。
/// 詳細画面への遷移は go_router のルート遷移で行い、タブバーを含む画面全体が
/// 切り替わる。
class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final tabs = ref.watch(appConfigProvider.select((c) => c.tabs));
    final items = [for (final t in tabs) _itemFor(t)];
    final index = _currentIndex.clamp(0, items.length - 1);

    return Scaffold(
      body: IndexedStack(
        index: index,
        children: [for (final t in items) t.root],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: index,
        onDestinationSelected: (i) => setState(() => _currentIndex = i),
        destinations: [
          for (final t in items)
            NavigationDestination(icon: Icon(t.icon), label: t.label),
        ],
      ),
    );
  }
}
