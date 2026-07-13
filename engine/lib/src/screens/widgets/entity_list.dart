import 'package:flutter/material.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';

/// qico アイコン面（DESIGN.html `.qico`）付きのリスト行（`.ls`）。
///
/// 左に 26dp・角丸 8・primary50 面＋primary600 アイコンの四角チップ、続いてタイトル、
/// 右端に任意の [trailing]（chevron・状態バッジなど）を並べる。行高は 48 以上。
/// 問題集タブ・問題集詳細のチャンク一覧など、カード内の行として使う。
class QicoRow extends StatelessWidget {
  const QicoRow({
    super.key,
    required this.icon,
    required this.title,
    this.trailing,
    this.onTap,
    this.maxLines = 2,
    this.iconColor,
    this.iconBackgroundColor,
  });

  /// qico チップの中に置くアイコン。
  final IconData icon;

  /// 行タイトル。
  final String title;

  /// 右端の要素（chevron・状態表示など）。null なら出さない。
  final Widget? trailing;

  /// 行タップ時のコールバック。null ならタップ不可。
  final VoidCallback? onTap;

  /// タイトルの最大行数。
  final int maxLines;

  /// qico チップのアイコン色。null なら既定（primary600）。
  final Color? iconColor;

  /// qico チップの面色。null なら既定（primary50）。
  final Color? iconBackgroundColor;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return InkWell(
      onTap: onTap,
      child: ConstrainedBox(
        constraints: const BoxConstraints(minHeight: AppLayout.minTap),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          child: Row(
            children: [
              // qico（26×26・角丸 8・既定は primary50 面／primary600 アイコン）。
              Container(
                width: 26,
                height: 26,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: iconBackgroundColor ?? c.primary50,
                  borderRadius: BorderRadius.circular(AppRadius.sm),
                ),
                child: Icon(icon, size: 16, color: iconColor ?? c.primary600),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  title,
                  maxLines: maxLines,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    height: 1.4,
                    color: c.textPrimary,
                  ),
                ),
              ),
              if (trailing != null) ...[
                const SizedBox(width: 8),
                trailing!,
              ],
            ],
          ),
        ),
      ),
    );
  }
}

/// リスト行をまとめるカード（DESIGN.html `.lesson-list`）。
///
/// surface 面＋border 枠＋lg 角丸。行間は 1px の区切り線。[VideoList] と同じ様式を
/// 任意の行ウィジェット（[QicoRow] など）へ一般化したもの。
class EntityListCard extends StatelessWidget {
  const EntityListCard({super.key, required this.children});

  /// 行ウィジェット（区切り線は本体が挿入する）。
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: c.surface,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        border: Border.all(color: c.border),
      ),
      child: Column(
        children: [
          for (var i = 0; i < children.length; i++) ...[
            if (i > 0) Divider(height: 1, thickness: 1, color: c.border),
            children[i],
          ],
        ],
      ),
    );
  }
}
