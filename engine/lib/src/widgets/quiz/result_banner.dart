import 'package:flutter/material.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_motion.dart';

/// 正誤リビールのバナー（DESIGN.html `.result-banner`）。
///
/// [correct] が true なら correctSurface 面＋correctText 文字＋○、false なら
/// incorrectSurface 面＋incorrectText 文字＋✕。表示時に [AppMotion.base]＋
/// [AppMotion.easeOut] で下 [AppMotion.revealOffset]（8dp）からスライドアップ
/// しつつフェードインする。不正解は「責めない」ため色は低彩度レッドにとどめる。
class ResultBanner extends StatelessWidget {
  const ResultBanner({super.key, required this.correct});

  final bool correct;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final bg = correct ? c.correctSurface : c.incorrectSurface;
    final fg = correct ? c.correctText : c.incorrectText;
    final markColor = correct ? c.correct : c.incorrect;
    final icon = correct ? Icons.circle_outlined : Icons.close;
    final label = correct ? '正解！' : '不正解';

    return TweenAnimationBuilder<double>(
      // 0→1 でフェードイン＋スライドアップ（下 8dp から定位置へ）。
      tween: Tween(begin: 0, end: 1),
      duration: AppMotion.base,
      curve: AppMotion.easeOut,
      builder: (context, t, child) => Opacity(
        opacity: t,
        child: Transform.translate(
          offset: Offset(0, AppMotion.revealOffset * (1 - t)),
          child: child,
        ),
      ),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 9),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(AppRadius.md),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 18, color: markColor),
            const SizedBox(width: 8),
            Text(
              label,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w800,
                color: fg,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
