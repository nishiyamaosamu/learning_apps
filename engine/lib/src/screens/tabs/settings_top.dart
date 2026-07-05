import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_typography.dart';
import '../../settings/app_info.dart';
import '../../settings/audio_settings.dart';
import '../../settings/theme_settings.dart';
import '../../widgets/layout/content_max_width.dart';
import '../widgets/entity_list.dart';
import '../widgets/video_list.dart' show VideoSectionHeader;

/// 設定タブのトップ。
///
/// DESIGN.html「設定タブ」に対応。h-sec の節見出し＋行リストカード（[EntityListCard]）
/// で構成し、行は「アイコン ＋ ラベル ＋ 値／トグル／シェブロン」の 3 型だけで統一する
/// （トグル ON は primary600）。
///
/// 以下はこのフェーズでは**意図的に未実装**（docs/DESIGN_TODO.md 参照）:
/// - プレミアムヒーローカード（#5）
/// - ダークモード行（#7）
/// - リマインダー行・サポート節「お問い合わせ／利用規約」（#8）
class SettingsTop extends ConsumerWidget {
  const SettingsTop({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final c = context.colors;
    final audioEnabled = ref.watch(audioEnabledProvider);
    final speed = ref.watch(audioSpeedProvider);
    final themeMode = ref.watch(themeModeSettingProvider);
    final info = ref.watch(packageInfoProvider).valueOrNull;
    final version = info?.version ?? '';
    final build = info?.buildNumber ?? '';
    // カード内の行は詳細寄せでビルド番号も見せ、最下部の ver-row は簡潔に版のみ。
    final rowVersion = build.isEmpty ? version : '$version ($build)';

    return Scaffold(
      appBar: AppBar(title: const Text('設定')),
      body: ContentMaxWidth(
        child: ListView(
          padding: const EdgeInsets.symmetric(
            horizontal: AppLayout.screenMargin,
            vertical: 12,
          ),
          children: [
            // --- 学習 ---
            const VideoSectionHeader(title: '学習'),
            const SizedBox(height: 12),
            EntityListCard(
              children: [
                // サウンド（トグル）。行全体タップでも切り替わる。
                QicoRow(
                  icon: Icons.volume_up_rounded,
                  title: 'サウンド',
                  trailing: Switch(
                    value: audioEnabled,
                    onChanged: (_) =>
                        ref.read(audioEnabledProvider.notifier).toggle(),
                  ),
                  onTap: () => ref.read(audioEnabledProvider.notifier).toggle(),
                ),
                // 再生速度（値＋シェブロン）。タップで倍速候補を順繰り。
                QicoRow(
                  icon: Icons.speed_rounded,
                  title: '再生速度',
                  trailing: _ValueTrailing(
                    value: '$speed×',
                    showChevron: true,
                  ),
                  onTap: () => ref.read(audioSpeedProvider.notifier).cycle(),
                ),
                // ダークモード（値＋シェブロン）。タップで選択シートを開く。
                QicoRow(
                  icon: Icons.dark_mode_rounded,
                  title: 'ダークモード',
                  trailing: _ValueTrailing(
                    value: _themeModeLabel(themeMode),
                    showChevron: true,
                  ),
                  onTap: () => _showThemeModeSheet(context, ref, themeMode),
                ),
              ],
            ),
            const SizedBox(height: 16),
            // --- このアプリ ---
            const VideoSectionHeader(title: 'このアプリ'),
            const SizedBox(height: 12),
            EntityListCard(
              children: [
                // バージョン（値のみ・タップ不可）。
                QicoRow(
                  icon: Icons.info_outline_rounded,
                  title: 'バージョン',
                  trailing: _ValueTrailing(value: rowVersion),
                ),
              ],
            ),
            const SizedBox(height: 16),
            // 最下部中央の小さな版表記（DESIGN.html `.ver-row`）。
            Center(
              child: Text(
                'バージョン $version',
                style: AppTypography.micro.copyWith(color: c.textMuted),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// [ThemeMode] の日本語ラベル（設定行の値 / 選択肢に共通で使う）。
String _themeModeLabel(ThemeMode mode) {
  switch (mode) {
    case ThemeMode.system:
      return 'システム';
    case ThemeMode.light:
      return 'ライト';
    case ThemeMode.dark:
      return 'ダーク';
  }
}

/// ダークモードの選択シート（DESIGN.html の「詳細設定へ遷移」に相当）。
///
/// 専用画面を 1 つ増やすほどの情報量ではない（3 択のラジオのみ）ため、go_router の
/// サブルートを追加せず軽量なボトムシートで代替する。選択即反映＋永続化。
Future<void> _showThemeModeSheet(
  BuildContext context,
  WidgetRef ref,
  ThemeMode current,
) {
  return showModalBottomSheet<void>(
    context: context,
    showDragHandle: true,
    builder: (sheetContext) {
      final c = sheetContext.colors;
      return SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(
                AppLayout.screenMargin,
                4,
                AppLayout.screenMargin,
                8,
              ),
              child: Text(
                'ダークモード',
                style: AppTypography.section.copyWith(color: c.textPrimary),
              ),
            ),
            RadioGroup<ThemeMode>(
              groupValue: current,
              onChanged: (selected) {
                if (selected != null) {
                  ref.read(themeModeSettingProvider.notifier).set(selected);
                }
                Navigator.of(sheetContext).pop();
              },
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  for (final mode in ThemeMode.values)
                    RadioListTile<ThemeMode>(
                      value: mode,
                      title: Text(_themeModeLabel(mode)),
                      activeColor: c.primary600,
                    ),
                ],
              ),
            ),
            const SizedBox(height: 8),
          ],
        ),
      );
    },
  );
}

/// 設定行の右端表示（DESIGN.html `.val`）。
///
/// 値テキスト（mono caption / textSecondary）に、任意でシェブロンを添える。
class _ValueTrailing extends StatelessWidget {
  const _ValueTrailing({required this.value, this.showChevron = false});

  final String value;
  final bool showChevron;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          value,
          style: AppTypography.mono(
            AppTypography.caption,
          ).copyWith(color: c.textSecondary),
        ),
        if (showChevron) ...[
          const SizedBox(width: 2),
          Icon(Icons.chevron_right, size: 18, color: c.textMuted),
        ],
      ],
    );
  }
}
