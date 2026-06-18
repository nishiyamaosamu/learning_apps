import 'package:flutter/material.dart';

import 'motion.dart';

/// 2点間を移動する点（パケット/データの移動を表す）。
///
/// 親いっぱいに描画するため `Stack` 内で `Positioned.fill` に重ねて使う。
/// [start]/[end] は親サイズに対する割合（0..1）。[active] が true のとき
/// start→end へ移動し、false のとき start に戻る（phase で切り替える）。
class MovingDot extends StatelessWidget {
  const MovingDot({
    super.key,
    required this.start,
    required this.end,
    required this.active,
    this.color,
    this.radius = 6,
    this.label,
    this.duration = motionDurationLong,
  });

  final Offset start;
  final Offset end;

  /// true で start→end、false で start。
  final bool active;

  final Color? color;
  final double radius;

  /// 点に添える短いラベル（例 "SYN"）。
  final String? label;

  final Duration duration;

  @override
  Widget build(BuildContext context) {
    final c = color ?? Theme.of(context).colorScheme.secondary;
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0, end: active ? 1.0 : 0.0),
      duration: duration,
      curve: motionCurveInOut,
      builder: (context, t, _) => LayoutBuilder(
        builder: (context, constraints) {
          final w = constraints.maxWidth;
          final h = constraints.maxHeight;
          final pos = Offset.lerp(start, end, t)!;
          final dx = pos.dx * w;
          final dy = pos.dy * h;
          // 移動中だけ見せる（端では薄く）。
          final opacity = (active ? 1.0 : 0.0);
          return Stack(
            children: [
              Positioned(
                left: dx - radius,
                top: dy - radius,
                child: Opacity(
                  opacity: opacity,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: radius * 2,
                        height: radius * 2,
                        decoration: BoxDecoration(
                          color: c,
                          shape: BoxShape.circle,
                        ),
                      ),
                      if (label != null)
                        Padding(
                          padding: const EdgeInsets.only(top: 2),
                          child: Text(
                            label!,
                            style: TextStyle(
                              color: c,
                              fontSize: 10,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
