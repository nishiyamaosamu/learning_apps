import 'package:flutter/material.dart';

/// 図解の土台。16:9 の枠いっぱいに広がる `Stack` を提供し、子を
/// 割合座標（0..1）で配置できるようにする。
///
/// [AnimatedArrow]/[MovingDot] などの全面オーバーレイ部品と、[at] で置いた
/// ノードを同じ座標系で重ねられる。背景は薄いカードにして図を見やすくする。
class DiagramCanvas extends StatelessWidget {
  const DiagramCanvas({
    super.key,
    required this.children,
    this.padding = const EdgeInsets.all(8),
    this.background = true,
  });

  /// 重ねる要素。`Positioned.fill` のオーバーレイ部品と [at] の戻り値を混在可。
  final List<Widget> children;
  final EdgeInsets padding;
  final bool background;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final stack = Padding(
      padding: padding,
      child: Stack(fit: StackFit.expand, children: children),
    );
    if (!background) return stack;
    return DecoratedBox(
      decoration: BoxDecoration(
        color: scheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(12),
      ),
      child: ClipRRect(borderRadius: BorderRadius.circular(12), child: stack),
    );
  }

  /// 子を割合座標 [fraction]（0..1）の中心に配置する。
  /// 例: `DiagramCanvas.at(const Offset(0.2, 0.5), child: NodeBox(...))`。
  static Widget at(Offset fraction, {required Widget child}) {
    return Align(
      alignment: Alignment(fraction.dx * 2 - 1, fraction.dy * 2 - 1),
      child: child,
    );
  }
}
