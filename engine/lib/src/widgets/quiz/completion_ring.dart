import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../design/app_colors.dart';
import '../../design/app_haptics.dart';
import '../../design/app_motion.dart';
import '../../design/app_typography.dart';

/// クイズ完了のスコアリング円（DESIGN.html `.ring`）。
///
/// 128dp の円弧（トラック primary100／フィル primary600、ストローク幅 ~11、丸キャップ）
/// の中央にスコア「7 /10」とラベルを表示する。[AppMotion.slow]＋[AppMotion.easeInOut]
/// で 0→[score]/[total] まで円弧が伸び、スコア数字も同時にカウントアップする。
/// アニメーション完了時に [AppHaptics.complete] を 1 回だけ鳴らす（達成の山場）。
class CompletionRing extends StatefulWidget {
  const CompletionRing({
    super.key,
    required this.score,
    required this.total,
    this.label = '正解',
  });

  /// 正解数。
  final int score;

  /// 総問題数。
  final int total;

  /// 中央下のラベル。
  final String label;

  @override
  State<CompletionRing> createState() => _CompletionRingState();
}

class _CompletionRingState extends State<CompletionRing> {
  bool _hapticFired = false;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final target = widget.total == 0
        ? 0.0
        : (widget.score / widget.total).clamp(0.0, 1.0);

    return SizedBox(
      width: 128,
      height: 128,
      child: TweenAnimationBuilder<double>(
        tween: Tween(begin: 0, end: 1),
        duration: AppMotion.slow,
        curve: AppMotion.easeInOut,
        onEnd: () {
          if (_hapticFired) return;
          _hapticFired = true;
          AppHaptics.complete();
        },
        builder: (context, t, _) {
          final displayScore = (widget.score * t).round();
          return CustomPaint(
            painter: _RingPainter(
              fraction: target * t,
              track: c.primary100,
              fill: c.primary600,
            ),
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text.rich(
                    TextSpan(
                      text: '$displayScore',
                      style: TextStyle(
                        fontSize: 27,
                        fontWeight: FontWeight.w800,
                        color: c.textPrimary,
                        height: 1.15,
                      ),
                      children: [
                        TextSpan(
                          text: ' /${widget.total}',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: c.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Text(
                    widget.label,
                    style: AppTypography.micro.copyWith(
                      color: c.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

/// 円弧を描くペインタ。トラック（全周）の上に進捗フィルを上から時計回りに重ねる。
class _RingPainter extends CustomPainter {
  _RingPainter({
    required this.fraction,
    required this.track,
    required this.fill,
  });

  final double fraction;
  final Color track;
  final Color fill;

  static const double _stroke = 11;

  @override
  void paint(Canvas canvas, Size size) {
    final center = size.center(Offset.zero);
    final radius = (size.shortestSide - _stroke) / 2;
    final rect = Rect.fromCircle(center: center, radius: radius);

    final trackPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = _stroke
      ..color = track;
    canvas.drawCircle(center, radius, trackPaint);

    if (fraction <= 0) return;
    final fillPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = _stroke
      ..strokeCap = StrokeCap.round
      ..color = fill;
    // 12 時方向（-90°）から時計回りに fraction 分だけ描く。
    canvas.drawArc(rect, -math.pi / 2, 2 * math.pi * fraction, false, fillPaint);
  }

  @override
  bool shouldRepaint(_RingPainter old) =>
      old.fraction != fraction || old.track != track || old.fill != fill;
}
