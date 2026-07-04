import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../app/app_config.dart';
import '../content/content_providers.dart';
import '../design/app_colors.dart';
import '../design/app_typography.dart';
import 'tabs/anki_top.dart';
import 'tabs/exercise_top.dart';
import 'tabs/settings_top.dart';
import 'tabs/video_top.dart';

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
      EngineTab.video => const _TabItem(
          label: '動画講座',
          icon: Icons.smart_display_rounded,
          root: VideoTop(),
        ),
      EngineTab.exercise => const _TabItem(
          label: '問題集',
          icon: Icons.quiz_rounded,
          root: ExerciseTop(),
        ),
      EngineTab.anki => const _TabItem(
          label: '暗記カード',
          icon: Icons.style_rounded,
          root: AnkiTop(),
        ),
      EngineTab.settings => const _TabItem(
          label: '設定',
          icon: Icons.settings_rounded,
          root: SettingsTop(),
        ),
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
      bottomNavigationBar: _EngineTabBar(
        items: items,
        currentIndex: index,
        onSelected: (i) => setState(() => _currentIndex = i),
      ),
    );
  }
}

/// 下部タブバー（DESIGN.html `.tabbar`）。
///
/// M3 の [NavigationBar] のピルインジケータを持たない、フラットな自前バー。
/// surface 面＋上辺ボーダーで面を切り、active は primary600 / inactive は
/// textMuted。各タブはアイコン＋極小ラベルを縦に積み、タップ領域はタブ全域
/// （高さ 56 以上）。
class _EngineTabBar extends StatelessWidget {
  const _EngineTabBar({
    required this.items,
    required this.currentIndex,
    required this.onSelected,
  });

  final List<_TabItem> items;
  final int currentIndex;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Container(
      decoration: BoxDecoration(
        color: c.surface,
        border: Border(top: BorderSide(color: c.border)),
      ),
      child: SafeArea(
        top: false,
        child: SizedBox(
          height: 56,
          child: Row(
            children: [
              for (var i = 0; i < items.length; i++)
                Expanded(
                  child: _TabButton(
                    item: items[i],
                    active: i == currentIndex,
                    onTap: () => onSelected(i),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// タブバー内の1タブ（アイコン＋ラベル）。タップ領域はタブ全域。
class _TabButton extends StatelessWidget {
  const _TabButton({
    required this.item,
    required this.active,
    required this.onTap,
  });

  final _TabItem item;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final color = active ? c.primary600 : c.textMuted;
    return InkWell(
      onTap: onTap,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(item.icon, size: 23, color: color),
          const SizedBox(height: 3),
          Text(
            item.label,
            style: AppTypography.micro.copyWith(
              color: color,
              letterSpacing: 0,
            ),
          ),
        ],
      ),
    );
  }
}
