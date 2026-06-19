import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

/// 経営資源（ヒト・モノ・カネ・情報）が中央の「企業」へ集まる図解。
///
/// 中央に企業ノードを置き、四隅の4つの経営資源がタップごとに1つずつ現れて
/// 矢印で企業へ流れ込む。最後に4要素がそろう。
///
/// phaseCount = 4
/// - phase 0: ヒト が企業へ
/// - phase 1: ＋モノ
/// - phase 2: ＋カネ
/// - phase 3: ＋情報（ヒト・モノ・カネ・情報がそろう）
class KeieiShigenAnimation extends StatelessWidget {
  const KeieiShigenAnimation({super.key, required this.step});

  /// 現在の phase（0..3）。
  final int step;

  static const phaseCount = 4;

  // 中央の企業ノード。
  static const _center = Offset(0.5, 0.54);

  /// 4つの経営資源（出現順）。四隅に配置する。
  static const _resources = <(String, IconData, Offset)>[
    ('ヒト', Icons.person, Offset(0.2, 0.3)),
    ('モノ', Icons.inventory_2, Offset(0.8, 0.3)),
    ('カネ', Icons.payments, Offset(0.2, 0.82)),
    ('情報', Icons.lightbulb, Offset(0.8, 0.82)),
  ];

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return DiagramCanvas(
      children: [
        // 各資源 → 企業 の矢印。資源が出た phase で伸びる。
        // ノードに重ならないよう、両端を箱の手前で止める。
        for (var i = 0; i < _resources.length; i++)
          AnimatedArrow(
            start: Offset.lerp(_resources[i].$3, _center, 0.32)!,
            end: Offset.lerp(_resources[i].$3, _center, 0.66)!,
            active: step >= i,
          ),
        // 見出し。
        DiagramCanvas.at(
          const Offset(0.5, 0.06),
          child: Text(
            '経営資源',
            style: TextStyle(
              color: scheme.onSurface,
              fontWeight: FontWeight.w700,
              fontSize: 14,
            ),
          ),
        ),
        // 中央の企業（常時点灯）。
        DiagramCanvas.at(
          _center,
          child: NodeBox(
            label: '企業',
            icon: Icons.business,
            active: true,
          ),
        ),
        // 四隅の経営資源（出た phase 以降は点灯）。
        for (var i = 0; i < _resources.length; i++)
          DiagramCanvas.at(
            _resources[i].$3,
            child: PhaseReveal(
              step: step,
              appearAt: i,
              child: NodeBox(
                label: _resources[i].$1,
                icon: _resources[i].$2,
                active: step >= i,
              ),
            ),
          ),
      ],
    );
  }
}
