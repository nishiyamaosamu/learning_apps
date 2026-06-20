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
    // debug ビルドのときだけ開発用ビューアへのエントリを出す（release では
    // 出さない）。アニメビューアはアニメ登録があるときのみ、アバタービューアは
    // 常に表示する（アバターは registry に依存しないため）。
    final hasAnimations =
        ref.watch(appConfigProvider).animations.isNotEmpty;

    return Scaffold(
      appBar: AppBar(title: const Text('設定')),
      body: ListView(
        children: [
          const ListTile(title: Text('設定項目がここに表示されます')),
          if (isDebugBuild) ...[
            const Divider(),
            const Padding(
              padding: EdgeInsets.fromLTRB(16, 8, 16, 4),
              child: Text('開発ツール (debug)'),
            ),
            if (hasAnimations)
              ListTile(
                leading: const Icon(Icons.animation),
                title: const Text('アニメビューア'),
                subtitle: const Text('図解アニメの phase を確認する'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () => context.push('/dev/animations'),
              ),
            ListTile(
              leading: const Icon(Icons.face),
              title: const Text('アバタービューア'),
              subtitle: const Text('喋るアバターの動きを確認する'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => context.push('/dev/avatar'),
            ),
          ],
        ],
      ),
    );
  }
}
