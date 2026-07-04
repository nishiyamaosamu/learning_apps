import 'package:flutter/material.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';

/// 解説カード（DESIGN.html `.expl`）。
///
/// テーマ既定の [Card]（surface 面＋border 枠＋lg 角丸）の中に「解説」ピル
/// （primary100 面＋primary800 文字、full 角丸、10dp/w700）と本文スロット [child]
/// を縦に並べる。正誤リビールの最後に、バナー → 選択肢の色替え → 解説の順で見せる。
class ExplanationCard extends StatelessWidget {
  const ExplanationCard({super.key, required this.child});

  /// 解説本文（MarkdownText などを渡す）。
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // 「解説」ピル。
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 1),
              decoration: BoxDecoration(
                color: c.primary100,
                borderRadius: BorderRadius.circular(AppRadius.full),
              ),
              child: Text(
                '解説',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w700,
                  color: c.primary800,
                ),
              ),
            ),
            const SizedBox(height: 6),
            child,
          ],
        ),
      ),
    );
  }
}
