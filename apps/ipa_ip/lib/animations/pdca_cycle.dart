import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

/// PDCAサイクルが順に点灯し、円環して継続的改善につながる図解。
///
/// P→D→C→A の4ノードを四隅に置き、時計回りの矢印で結ぶ。タップごとに
/// 次の段が点灯し、最後に円環が閉じて「継続的改善」が中央に現れる。
///
/// phaseCount = 5
/// - phase 0: P（Plan：計画）点灯
/// - phase 1: ＋D（Do：実行）
/// - phase 2: ＋C（Check：評価）
/// - phase 3: ＋A（Act：改善）
/// - phase 4: 円環が閉じ、次サイクルへ＝継続的改善
class PdcaCycleAnimation extends StatelessWidget {
  const PdcaCycleAnimation({super.key, required this.step});

  /// 現在の phase（0..4）。
  final int step;

  static const phaseCount = 5;

  // 四隅のノード位置（時計回り：P→D→C→A）。
  static const _p = Offset(0.27, 0.28);
  static const _d = Offset(0.73, 0.28);
  static const _c = Offset(0.73, 0.78);
  static const _a = Offset(0.27, 0.78);

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return DiagramCanvas(
      children: [
        // 時計回りの矢印。次のノードが点灯する phase で伸びる。
        // ノードに重ならないよう、両端を箱の手前で止める。
        AnimatedArrow(
            start: Offset.lerp(_p, _d, 0.34)!,
            end: Offset.lerp(_p, _d, 0.66)!,
            active: step >= 1),
        AnimatedArrow(
            start: Offset.lerp(_d, _c, 0.30)!,
            end: Offset.lerp(_d, _c, 0.70)!,
            active: step >= 2),
        AnimatedArrow(
            start: Offset.lerp(_c, _a, 0.34)!,
            end: Offset.lerp(_c, _a, 0.66)!,
            active: step >= 3),
        // 円環を閉じる矢印（A→P）。最終 phase で出る。
        AnimatedArrow(
          start: Offset.lerp(_a, _p, 0.30)!,
          end: Offset.lerp(_a, _p, 0.70)!,
          active: step >= 4,
          color: scheme.tertiary,
        ),
        // 4ノード（点灯したら以降も点灯したまま）。
        DiagramCanvas.at(
          _p,
          child: NodeBox(label: 'P 計画', icon: Icons.edit_note, active: step >= 0),
        ),
        DiagramCanvas.at(
          _d,
          child: NodeBox(
              label: 'D 実行', icon: Icons.play_arrow, active: step >= 1),
        ),
        DiagramCanvas.at(
          _c,
          child: NodeBox(
              label: 'C 評価', icon: Icons.fact_check, active: step >= 2),
        ),
        DiagramCanvas.at(
          _a,
          child: NodeBox(
              label: 'A 改善', icon: Icons.autorenew, active: step >= 3),
        ),
        // 中央：継続的改善（最終 phase で出現）。
        DiagramCanvas.at(
          const Offset(0.5, 0.53),
          child: PhaseReveal(
            step: step,
            appearAt: 4,
            child: NodeBox(
              label: '継続的改善',
              icon: Icons.trending_up,
              active: true,
              color: scheme.tertiary,
            ),
          ),
        ),
      ],
    );
  }
}
