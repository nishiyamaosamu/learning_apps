import 'package:flutter/material.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_motion.dart';
import '../../design/app_typography.dart';

/// クイズ上部のクローム（DESIGN.html `.quiz-top`）。
///
/// ✕ ボタン＋プログレスバー（primary100 トラック／primary600 フィル）＋「n/m」
/// カウンタを横に並べる。バーの値変化は [AppMotion.slow]＋[AppMotion.easeInOut]
/// でアニメーションし、進捗が伸びる達成感を作る。カウンタは等幅数字で桁を揃える。
///
/// [SafeArea] 内で使う前提の [Row] 部品（自前で余白は最小限に留める）。
class QuizTopBar extends StatelessWidget {
  const QuizTopBar({
    super.key,
    required this.current,
    required this.total,
    required this.onClose,
  });

  /// 現在の設問番号（1 始まり）。
  final int current;

  /// 総設問数。
  final int total;

  /// ✕ タップ時のコールバック。
  final VoidCallback onClose;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final fraction = total == 0 ? 0.0 : (current / total).clamp(0.0, 1.0);

    return Padding(
      padding: const EdgeInsets.fromLTRB(6, 6, 14, 0),
      child: Row(
        children: [
          // ✕（タップ領域 48dp）。
          SizedBox(
            width: 48,
            height: 48,
            child: IconButton(
              padding: EdgeInsets.zero,
              icon: const Icon(Icons.close, size: 20),
              color: c.textSecondary,
              onPressed: onClose,
            ),
          ),
          const SizedBox(width: 4),
          Expanded(
            child: TweenAnimationBuilder<double>(
              tween: Tween(begin: 0, end: fraction),
              duration: AppMotion.slow,
              curve: AppMotion.easeInOut,
              builder: (context, value, _) => ClipRRect(
                borderRadius: BorderRadius.circular(AppRadius.full),
                child: SizedBox(
                  height: 6,
                  child: ColoredBox(
                    color: c.primary100,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: FractionallySizedBox(
                        widthFactor: value,
                        // heightFactor が無いとフィルは高さ0に潰れて塗りが見えない。
                        heightFactor: 1,
                        child: ColoredBox(color: c.primary600),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 10),
          Text(
            '$current/$total',
            style: AppTypography.mono(
              AppTypography.caption,
            ).copyWith(color: c.textSecondary),
          ),
        ],
      ),
    );
  }
}
