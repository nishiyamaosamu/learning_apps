import 'dart:math' as math;

import 'package:flutter/material.dart';

import 'motion.dart';

/// 2点間を結ぶ矢印。[active] が true になると始点から終点へ向けて
/// 線が伸び、到達すると矢じりが現れる（データ/制御の流れを表す）。
///
/// 親いっぱいに描画するため、`Stack` の中で `Positioned.fill` に置いて
/// ノード配置レイヤーに重ねて使う。座標は親サイズに対する割合（0..1）の
/// [start]/[end] で指定する（例: 左中央=Offset(0.1, 0.5)）。
class AnimatedArrow extends StatelessWidget {
  const AnimatedArrow({
    super.key,
    required this.start,
    required this.end,
    required this.active,
    this.color,
    this.strokeWidth = 2.5,
    this.duration = motionDurationLong,
  });

  /// 始点・終点（親サイズに対する割合 0..1）。
  final Offset start;
  final Offset end;

  /// true で伸びる、false で引っ込む。phase に応じて切り替える。
  final bool active;

  final Color? color;
  final double strokeWidth;
  final Duration duration;

  @override
  Widget build(BuildContext context) {
    final c = color ?? Theme.of(context).colorScheme.primary;
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0, end: active ? 1.0 : 0.0),
      duration: duration,
      curve: motionCurveInOut,
      builder: (context, t, _) => CustomPaint(
        painter: _ArrowPainter(
          start: start,
          end: end,
          progress: t,
          color: c,
          strokeWidth: strokeWidth,
        ),
        child: const SizedBox.expand(),
      ),
    );
  }
}

class _ArrowPainter extends CustomPainter {
  _ArrowPainter({
    required this.start,
    required this.end,
    required this.progress,
    required this.color,
    required this.strokeWidth,
  });

  final Offset start;
  final Offset end;
  final double progress;
  final Color color;
  final double strokeWidth;

  @override
  void paint(Canvas canvas, Size size) {
    if (progress <= 0) return;
    final a = Offset(start.dx * size.width, start.dy * size.height);
    final b = Offset(end.dx * size.width, end.dy * size.height);
    final tip = Offset.lerp(a, b, progress)!;

    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round
      ..style = PaintingStyle.stroke;
    canvas.drawLine(a, tip, paint);

    // 終点近くまで伸びたら矢じりを描く。
    if (progress > 0.9) {
      final dir = (b - a);
      final len = dir.distance;
      if (len == 0) return;
      final unit = dir / len;
      const headLen = 10.0;
      final left = _rotate(unit, 2.6) * headLen;
      final right = _rotate(unit, -2.6) * headLen;
      final fill = Paint()
        ..color = color
        ..style = PaintingStyle.fill;
      final path = Path()
        ..moveTo(tip.dx, tip.dy)
        ..lineTo(tip.dx + left.dx, tip.dy + left.dy)
        ..lineTo(tip.dx + right.dx, tip.dy + right.dy)
        ..close();
      canvas.drawPath(path, fill);
    }
  }

  Offset _rotate(Offset v, double radians) {
    final cosR = math.cos(radians);
    final sinR = math.sin(radians);
    return Offset(v.dx * cosR - v.dy * sinR, v.dx * sinR + v.dy * cosR);
  }

  @override
  bool shouldRepaint(_ArrowPainter old) =>
      old.progress != progress ||
      old.start != start ||
      old.end != end ||
      old.color != color;
}
