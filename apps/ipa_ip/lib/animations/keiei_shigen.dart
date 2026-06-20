import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

/// 経営資源（ヒト・モノ・カネ・情報）を4つのカードとしてそろえる図解。
///
/// 企業活動を支える4要素をタップごとに1つずつ表示し、最後に限りある資源を
/// 目的に合わせて「配分・管理・活用」することを下段の帯で示す。
///
/// phaseCount = 4
/// - phase 0: ヒト（人材）
/// - phase 1: ＋モノ（設備・原材料）
/// - phase 2: ＋カネ（資金）
/// - phase 3: ＋情報（ノウハウ）と「配分・管理・活用」
class KeieiShigenAnimation extends StatelessWidget {
  const KeieiShigenAnimation({super.key, required this.step});

  /// 現在の phase（0..3）。
  final int step;

  static const phaseCount = 4;

  static const _resources = <_ResourceSpec>[
    _ResourceSpec('ヒト', '人材', Icons.person),
    _ResourceSpec('モノ', '設備・原材料', Icons.inventory_2),
    _ResourceSpec('カネ', '資金', Icons.payments),
    _ResourceSpec('情報', 'ノウハウ', Icons.lightbulb),
  ];

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final colors = [
      scheme.primary,
      scheme.secondary,
      scheme.tertiary,
      scheme.primary,
    ];

    return DiagramCanvas(
      padding: const EdgeInsets.all(10),
      children: [
        Column(
          children: [
            Text(
              '経営資源',
              style: TextStyle(
                color: scheme.onSurface,
                fontWeight: FontWeight.w700,
                fontSize: 14,
              ),
            ),
            Text(
              '企業活動を支える4要素',
              style: TextStyle(
                color: scheme.onSurfaceVariant,
                fontWeight: FontWeight.w600,
                fontSize: 10,
              ),
            ),
            const SizedBox(height: 6),
            Expanded(
              child: Column(
                children: [
                  Expanded(
                    child: Row(
                      children: [
                        _resourceSlot(context, 0, colors[0]),
                        const SizedBox(width: 8),
                        _resourceSlot(context, 1, colors[1]),
                      ],
                    ),
                  ),
                  const SizedBox(height: 6),
                  Expanded(
                    child: Row(
                      children: [
                        _resourceSlot(context, 2, colors[2]),
                        const SizedBox(width: 8),
                        _resourceSlot(context, 3, colors[3]),
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    height: 36,
                    child: PhaseReveal(
                      step: step,
                      appearAt: 3,
                      slide: const Offset(0, 0.25),
                      child: _ManagementBand(color: scheme.primary),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _resourceSlot(BuildContext context, int index, Color color) {
    final spec = _resources[index];
    return Expanded(
      child: PhaseReveal(
        step: step,
        appearAt: index,
        slide: const Offset(0, 0.22),
        child: _ResourceCard(spec: spec, color: color, active: step == index),
      ),
    );
  }
}

class _ResourceSpec {
  const _ResourceSpec(this.label, this.subLabel, this.icon);

  final String label;
  final String subLabel;
  final IconData icon;
}

class _ResourceCard extends StatelessWidget {
  const _ResourceCard({
    required this.spec,
    required this.color,
    required this.active,
  });

  final _ResourceSpec spec;
  final Color color;
  final bool active;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final foreground = active ? color : scheme.onSurface;

    return AnimatedContainer(
      duration: motionDuration,
      curve: motionCurve,
      alignment: Alignment.center,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: active ? color.withValues(alpha: 0.15) : scheme.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: active ? color : scheme.outlineVariant,
          width: active ? 2 : 1,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(spec.icon, color: foreground, size: 22),
          const SizedBox(width: 8),
          Flexible(
            child: FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    spec.label,
                    maxLines: 1,
                    softWrap: false,
                    style: TextStyle(
                      color: foreground,
                      fontWeight: FontWeight.w700,
                      fontSize: 14,
                    ),
                  ),
                  Text(
                    spec.subLabel,
                    maxLines: 1,
                    softWrap: false,
                    style: TextStyle(
                      color: scheme.onSurfaceVariant,
                      fontWeight: FontWeight.w600,
                      fontSize: 10,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ManagementBand extends StatelessWidget {
  const _ManagementBand({required this.color});

  final Color color;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return AnimatedContainer(
      duration: motionDuration,
      curve: motionCurve,
      alignment: Alignment.center,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.14),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: color, width: 2),
      ),
      child: FittedBox(
        fit: BoxFit.scaleDown,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.tune, color: color, size: 18),
            const SizedBox(width: 8),
            Text(
              '目的に合わせて 配分・管理・活用',
              maxLines: 1,
              softWrap: false,
              style: TextStyle(
                color: scheme.onSurface,
                fontWeight: FontWeight.w700,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
