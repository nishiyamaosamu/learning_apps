import 'package:flutter/material.dart';

import 'motion.dart';

/// 図解の「ノード」を表す角丸ラベル箱。
///
/// ネットワーク図の機器、フローチャートの工程、階層の1段などに使う。
/// [active] を true にすると枠と背景が強調色になり「今ここ」を示せる。
/// 色を省略するとテーマの配色に追従する（アプリと馴染む）。
class NodeBox extends StatelessWidget {
  const NodeBox({
    super.key,
    required this.label,
    this.icon,
    this.active = false,
    this.color,
    this.expand = false,
    this.duration = motionDuration,
  });

  final String label;
  final IconData? icon;

  /// 強調表示（点灯）するか。phase に応じて切り替えると「順に光る」表現になる。
  final bool active;

  /// 基調色。省略時は `colorScheme.primary`。
  final Color? color;

  /// 親の幅いっぱいに広げ、内容を中央寄せにする。積み上げ/比較の層バーなど、
  /// 同じ幅の箱を並べたいときに使う（Column の crossAxisAlignment.stretch と併用）。
  final bool expand;

  final Duration duration;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final base = color ?? scheme.primary;
    final bg = active ? base.withValues(alpha: 0.16) : scheme.surface;
    final border = active ? base : scheme.outlineVariant;
    final fg = active ? base : scheme.onSurface;

    return AnimatedContainer(
      duration: duration,
      curve: motionCurve,
      alignment: expand ? Alignment.center : null,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: border, width: active ? 2 : 1),
      ),
      child: Row(
        mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
        mainAxisAlignment:
            expand ? MainAxisAlignment.center : MainAxisAlignment.start,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 18, color: fg),
            const SizedBox(width: 6),
          ],
          // ラベルは1行に固定し、枠に収まらなければ折り返さず縮小する
          // （実機の狭い枠で2行になって高さがはみ出すのを防ぐ）。
          Flexible(
            child: FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Text(
                label,
                maxLines: 1,
                softWrap: false,
                style: TextStyle(
                  color: fg,
                  fontWeight: active ? FontWeight.w700 : FontWeight.w500,
                  fontSize: 13,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
