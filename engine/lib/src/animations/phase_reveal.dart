import 'package:flutter/material.dart';

import 'motion.dart';

/// phase（step）に応じて子を出現させるヘルパー。
///
/// 図解アニメは「現在の phase（[step]）」を受け取り、各部品が
/// 「自分はどの phase で現れるか（[appearAt]）」を宣言する設計にすると、
/// step が増減したときに各部品が自動で滑らかに出入りする。
///
/// [step] >= [appearAt] のとき表示（フェードイン＋わずかに上へスライド）、
/// それ未満のとき非表示。`maintainSize` true なら非表示でも領域を確保し、
/// レイアウトが動かない（図解では基本 true 推奨）。
class PhaseReveal extends StatelessWidget {
  const PhaseReveal({
    super.key,
    required this.step,
    required this.appearAt,
    required this.child,
    this.duration = motionDuration,
    this.maintainSize = true,
    this.slide = const Offset(0, 0.15),
  });

  /// 現在の phase。
  final int step;

  /// この部品が出現する phase（0始まり）。
  final int appearAt;

  /// 出入りのアニメ時間（300〜600ms 推奨）。
  final Duration duration;

  /// 非表示時も領域を確保するか（true で他要素の位置が動かない）。
  final bool maintainSize;

  /// 出現時の移動量（FractionalOffset）。控えめが見やすい。
  final Offset slide;

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final visible = step >= appearAt;
    final content = AnimatedSlide(
      offset: visible ? Offset.zero : slide,
      duration: duration,
      curve: motionCurveAppear, // 控えめなオーバーシュートで「ぽんっ」と出す。
      child: AnimatedOpacity(
        opacity: visible ? 1 : 0,
        duration: duration,
        curve: motionCurve,
        child: child,
      ),
    );
    if (maintainSize) return content;
    // 領域確保が不要なら、非表示時に畳む。
    return AnimatedSize(
      duration: duration,
      curve: motionCurve,
      child: visible ? content : const SizedBox.shrink(),
    );
  }
}
