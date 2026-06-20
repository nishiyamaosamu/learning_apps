import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

/// 企業理念（MVV）のピラミッドが下から積み上がる図解。
///
/// 土台のバリューから順に積み上げ、頂点のミッションへ向かう三段ピラミッド。
/// 最後に「何のために存在するのか」を問うパーパス経営の補足を出す。
///
/// phaseCount = 4
/// - phase 0: バリュー（価値観・行動指針）＝土台
/// - phase 1: ＋ビジョン（目指す将来像）
/// - phase 2: ＋ミッション（果たすべき使命）＝頂点
/// - phase 3: ＋パーパス経営（何のために存在するのか）
class MvvPyramidAnimation extends StatelessWidget {
  const MvvPyramidAnimation({super.key, required this.step});

  /// 現在の phase（0..3）。
  final int step;

  static const phaseCount = 4;

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
              Expanded(
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Expanded(
                      flex: 7,
                      // 下から積み上がるピラミッド。表示は上→下なので、
                      // 頂点（ミッション）から順に並べ、Column を下寄せにする。
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          _tier(
                            context,
                            appearAt: 2,
                            widthFactor: 0.42,
                            label: 'ミッション',
                            sub: '果たすべき使命',
                            color: scheme.primary,
                            alpha: 0.95,
                            foreground: scheme.onPrimary,
                          ),
                          const SizedBox(height: 6),
                          _tier(
                            context,
                            appearAt: 1,
                            widthFactor: 0.70,
                            label: 'ビジョン',
                            sub: '目指す将来像',
                            color: scheme.secondary,
                            alpha: 0.34,
                            foreground: scheme.onSurface,
                          ),
                          const SizedBox(height: 6),
                          _tier(
                            context,
                            appearAt: 0,
                            widthFactor: 1,
                            label: 'バリュー',
                            sub: '価値観・行動指針',
                            color: scheme.tertiary,
                            alpha: 0.28,
                            foreground: scheme.onSurface,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      flex: 3,
                      child: Align(
                        alignment: Alignment.center,
                        child: PhaseReveal(
                          step: step,
                          appearAt: 3,
                          slide: const Offset(0.15, 0),
                          child: _purposeCard(context),
                        ),
                      ),
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
    required Color color,
    required double alpha,
    required Color foreground,
  }) {
    final active = step >= appearAt;
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
              color: color.withValues(alpha: alpha),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: color.withValues(alpha: active ? 0.9 : 0.3),
                width: active ? 2 : 1,
              ),
            ),
            child: FittedBox(
              fit: BoxFit.scaleDown,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    label,
                    style: TextStyle(
                      color: foreground,
                      fontWeight: FontWeight.w700,
                      fontSize: 14,
                    ),
                  ),
                  Text(sub, style: TextStyle(color: foreground, fontSize: 10)),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _purposeCard(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return AnimatedContainer(
      duration: motionDuration,
      curve: motionCurve,
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
      decoration: BoxDecoration(
        color: scheme.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: scheme.primary, width: 2),
        boxShadow: [
          BoxShadow(
            color: scheme.shadow.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.flag, color: scheme.primary, size: 20),
          const SizedBox(height: 6),
          FittedBox(
            fit: BoxFit.scaleDown,
            child: Text(
              'パーパス経営',
              maxLines: 1,
              softWrap: false,
              style: TextStyle(
                color: scheme.primary,
                fontWeight: FontWeight.w700,
                fontSize: 12,
              ),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            '何のために\n存在するのか',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: scheme.onSurfaceVariant,
              fontWeight: FontWeight.w600,
              fontSize: 10,
              height: 1.2,
            ),
          ),
        ],
      ),
    );
  }
}
