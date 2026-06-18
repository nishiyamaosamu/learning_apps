import 'package:flutter/material.dart';

import 'common/common.dart';

/// TCP/IP 階層モデル（4階層）が下から1段ずつ積み上がる図解。
///
/// 下位（物理に近い）→上位（アプリに近い）の順に重なることを、タップごとに
/// 1段ずつ出現させて見せる。最後に出た段を点灯して「今ここ」を示す。
///
/// phaseCount = 4
/// - phase 0: ネットワークインタフェース層
/// - phase 1: ＋インターネット層
/// - phase 2: ＋トランスポート層
/// - phase 3: ＋アプリケーション層（4階層そろう）
class TcpIpModelAnimation extends StatelessWidget {
  const TcpIpModelAnimation({super.key, required this.step});

  /// 現在の phase（0..3）。
  final int step;

  static const phaseCount = 4;

  /// 下から順（index 0 = 最下層）。
  static const _layers = <(String, IconData)>[
    ('ネットワークインタフェース層', Icons.cable),
    ('インターネット層（IP）', Icons.public),
    ('トランスポート層（TCP / UDP）', Icons.swap_horiz),
    ('アプリケーション層（HTTP / DNS）', Icons.web),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return DiagramCanvas(
      children: [
        Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [
              // 見出し（常時表示）。
              Text(
                'TCP/IP の 4 階層',
                style: theme.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w700,
                  color: theme.colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: 6),
              // 層の積み上げ。下から積むので、見た目（上→下）は層を逆順に並べる。
              // 各段を Expanded で等分し、全段ぶんの領域を最初から確保
              // （maintainSize）。下寄せにして「下から積み上がる」よう見せる。
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    for (var i = _layers.length - 1; i >= 0; i--)
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 2),
                          child: PhaseReveal(
                            step: step,
                            appearAt: i,
                            slide: const Offset(0, 0.4), // 下からせり上がる。
                            child: NodeBox(
                              label: _layers[i].$1,
                              icon: _layers[i].$2,
                              expand: true,
                              active: step == i, // 最後に出た段を点灯。
                            ),
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
}
