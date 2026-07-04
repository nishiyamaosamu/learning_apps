import 'package:flutter/material.dart';

import '../design/app_colors.dart';
import '../design/app_typography.dart';

/// 空状態・エラー画面の共通骨格（DESIGN.html `.empty`）。
///
/// 「いま何もない理由」＋「次にやること」を 1 セットで示すための部品。円アイコン＋
/// 太字 1 行の見出し＋補足文＋任意の CTA ボタンを、縦中央に並べる。
///
/// - 既定（初期状態・エラー）は primary 系（primary50 面＋primary600 アイコン）。
/// - [celebration] を true にすると達成による空（要復習ゼロ等）として correct 系で祝う。
/// - エラーでも incorrect の赤は使わない（エラー ≠ 不正解）。
class EmptyState extends StatelessWidget {
  const EmptyState({
    super.key,
    required this.icon,
    required this.label,
    this.description,
    this.action,
    this.celebration = false,
  });

  /// 円の中に表示するアイコン。
  final IconData icon;

  /// 見出し（太字 1 行）。
  final String label;

  /// 補足文（任意）。最大幅 250 で中央揃え。
  final String? description;

  /// 次の行動を促す CTA（任意）。
  final Widget? action;

  /// 達成による空なら true（correct 系で祝う）。既定は false（primary 系で導く）。
  final bool celebration;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final circleBg = celebration ? colors.correctSurface : colors.primary50;
    final iconColor = celebration ? colors.correct : colors.primary600;

    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              width: 54,
              height: 54,
              alignment: Alignment.center,
              decoration: BoxDecoration(color: circleBg, shape: BoxShape.circle),
              child: Icon(icon, size: 26, color: iconColor),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              textAlign: TextAlign.center,
              style: AppTypography.label.copyWith(color: colors.textPrimary),
            ),
            if (description != null) ...[
              const SizedBox(height: 8),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 250),
                child: Text(
                  description!,
                  textAlign: TextAlign.center,
                  style: AppTypography.caption.copyWith(
                    color: colors.textSecondary,
                  ),
                ),
              ),
            ],
            if (action != null) ...[const SizedBox(height: 16), action!],
          ],
        ),
      ),
    );
  }
}
