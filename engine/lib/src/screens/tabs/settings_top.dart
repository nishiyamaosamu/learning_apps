import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../content/content_providers.dart';
import '../dev/animation_viewer.dart';

/// 設定タブのトップ（追って構築）
class SettingsTop extends ConsumerWidget {
  const SettingsTop({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // debug ビルドかつアニメが登録されているときだけ、開発用ビューアへの
    // エントリを出す（release では出さない）。
    final hasAnimations =
        ref.watch(appConfigProvider).animations.isNotEmpty;
    final showDevTools = isDebugBuild && hasAnimations;

    return Scaffold(
      appBar: AppBar(title: const Text('設定')),
      body: ListView(
        children: [
          const ListTile(title: Text('設定項目がここに表示されます')),
          if (showDevTools) ...[
            const Divider(),
            const Padding(
              padding: EdgeInsets.fromLTRB(16, 8, 16, 4),
              child: Text('開発ツール (debug)'),
            ),
            ListTile(
              leading: const Icon(Icons.animation),
              title: const Text('アニメビューア'),
              subtitle: const Text('図解アニメの phase を確認する'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => context.push('/dev/animations'),
            ),
          ],
        ],
      ),
    );
  }
}
