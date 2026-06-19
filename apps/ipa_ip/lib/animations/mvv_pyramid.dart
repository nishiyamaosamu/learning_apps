import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

/// 企業理念（MVV）のピラミッドが下から積み上がる図解。
///
/// 土台のバリューから順に積み上げ、頂点のミッションへ向かう三段ピラミッド。
/// 下ほど幅広・薄色、上ほど幅狭・濃色にして階層（土台→頂点）を表す。
///
/// phaseCount = 3
/// - phase 0: バリュー（価値観・行動指針）＝土台
/// - phase 1: ＋ビジョン（目指す将来像）
/// - phase 2: ＋ミッション（果たすべき使命）＝頂点
class MvvPyramidAnimation extends StatelessWidget {
  const MvvPyramidAnimation({super.key, required this.step});

  /// 現在の phase（0..2）。
  final int step;

  static const phaseCount = 3;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return DiagramCanvas(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(12, 10, 12, 12),
          child: Column(
            children: [
              Text(
                '企業理念（MVV）',
                style: TextStyle(
                  color: scheme.onSurface,
                  fontWeight: FontWeight.w700,
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: 8),
              // 下から積み上がるピラミッド。表示は上→下なので、頂点（ミッション）
              // から順に並べ、Column を下寄せにして土台が下に来るようにする。
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    _tier(
                      context,
                      appearAt: 2,
                      widthFactor: 0.40,
                      label: 'ミッション',
                      sub: '果たすべき使命',
                      alpha: 0.95,
                      onDark: true,
                    ),
                    const SizedBox(height: 6),
                    _tier(
                      context,
                      appearAt: 1,
                      widthFactor: 0.68,
                      label: 'ビジョン',
                      sub: '目指す将来像',
                      alpha: 0.55,
                      onDark: false,
                    ),
                    const SizedBox(height: 6),
                    _tier(
                      context,
                      appearAt: 0,
                      widthFactor: 1.0,
                      label: 'バリュー',
                      sub: '価値観・行動指針',
                      alpha: 0.28,
                      onDark: false,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _tier(
    BuildContext context, {
    required int appearAt,
    required double widthFactor,
    required String label,
    required String sub,
    required double alpha,
    required bool onDark,
  }) {
    final scheme = Theme.of(context).colorScheme;
    final fg = onDark ? scheme.onPrimary : scheme.onSurface;
    return Expanded(
      child: PhaseReveal(
        step: step,
        appearAt: appearAt,
        slide: const Offset(0, 0.5), // 下からせり上がる。
        child: FractionallySizedBox(
          widthFactor: widthFactor,
          child: AnimatedContainer(
            duration: motionDuration,
            curve: motionCurve,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: scheme.primary.withValues(alpha: alpha),
              borderRadius: BorderRadius.circular(8),
            ),
            child: FittedBox(
              fit: BoxFit.scaleDown,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    label,
                    style: TextStyle(
                      color: fg,
                      fontWeight: FontWeight.w700,
                      fontSize: 14,
                    ),
                  ),
                  Text(
                    sub,
                    style: TextStyle(color: fg, fontSize: 10),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
