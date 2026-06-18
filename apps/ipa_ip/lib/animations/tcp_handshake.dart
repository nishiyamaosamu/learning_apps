import 'package:flutter/material.dart';

import 'common/common.dart';

/// TCP 3ウェイハンドシェイク。クライアントとサーバが3往復で接続を確立する流れ。
///
/// シーケンス図風に、上部に両者のノード、その下に3本のメッセージ（矢印）を
/// レーン分けして配置する（要素どうしが重ならないようにする）。
///
/// phaseCount = 4
/// - phase 0: クライアントとサーバが存在（まだ通信なし）
/// - phase 1: クライアント → サーバ へ SYN
/// - phase 2: サーバ → クライアント へ SYN+ACK
/// - phase 3: クライアント → サーバ へ ACK（接続確立）
class TcpHandshakeAnimation extends StatelessWidget {
  const TcpHandshakeAnimation({super.key, required this.step});

  /// 現在の phase（0..3）。engine から渡される。
  final int step;

  static const phaseCount = 4;

  // 両端の列の x 位置（割合座標）。
  static const _clientX = 0.2;
  static const _serverX = 0.8;
  // メッセージのレーン（y 位置）。重ならないよう縦に分ける。
  static const _lane1 = 0.46;
  static const _lane2 = 0.64;
  static const _lane3 = 0.82;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return DiagramCanvas(
      children: [
        // メッセージの矢印（レーンごと）。
        AnimatedArrow(
          start: const Offset(_clientX, _lane1),
          end: const Offset(_serverX, _lane1),
          active: step >= 1,
        ),
        AnimatedArrow(
          start: const Offset(_serverX, _lane2),
          end: const Offset(_clientX, _lane2),
          active: step >= 2,
          color: scheme.tertiary,
        ),
        AnimatedArrow(
          start: const Offset(_clientX, _lane3),
          end: const Offset(_serverX, _lane3),
          active: step >= 3,
        ),
        // メッセージのラベル（矢印の少し上）。
        _label(context, 'SYN', _lane1, appearAt: 1, color: scheme.primary),
        _label(context, 'SYN+ACK', _lane2, appearAt: 2, color: scheme.tertiary),
        _label(context, 'ACK', _lane3, appearAt: 3, color: scheme.primary),
        // 上部の両ノード。確立後は両方を点灯。
        DiagramCanvas.at(
          const Offset(_clientX, 0.14),
          child: NodeBox(
            label: 'クライアント',
            icon: Icons.computer,
            active: step >= 3,
          ),
        ),
        DiagramCanvas.at(
          const Offset(_serverX, 0.14),
          child: NodeBox(
            label: 'サーバ',
            icon: Icons.dns,
            active: step >= 3,
          ),
        ),
        // 確立メッセージ。
        Align(
          alignment: Alignment.bottomCenter,
          child: PhaseReveal(
            step: step,
            appearAt: 3,
            child: Padding(
              padding: const EdgeInsets.only(bottom: 2),
              child: Text(
                '接続確立',
                style: TextStyle(
                  color: scheme.primary,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  /// レーン中央のやや上にメッセージ名を出す。
  Widget _label(
    BuildContext context,
    String text,
    double laneY, {
    required int appearAt,
    required Color color,
  }) {
    return DiagramCanvas.at(
      Offset(0.5, laneY - 0.1),
      child: PhaseReveal(
        step: step,
        appearAt: appearAt,
        child: Text(
          text,
          style: TextStyle(
            color: color,
            fontSize: 12,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
    );
  }
}
