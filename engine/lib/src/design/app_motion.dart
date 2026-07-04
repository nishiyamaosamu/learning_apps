import 'package:flutter/animation.dart';

/// DESIGN.html「集中ブルー」のモーショントークン。
///
/// - [fast]/[base] には [easeOut]（`Curves.easeOutCubic`）
/// - [slow] には [easeInOut]（`Curves.easeInOutCubic`）
class AppMotion {
  AppMotion._();

  /// 150ms — 選択・トグルなどの即時フィードバック。
  static const Duration fast = Duration(milliseconds: 150);

  /// 250ms — 正誤リビール、画面遷移。
  static const Duration base = Duration(milliseconds: 250);

  /// 400ms — プログレス加算、カードフリップ。
  static const Duration slow = Duration(milliseconds: 400);

  /// 出現・即時フィードバック用（[fast]/[base]）。
  static const Curve easeOut = Curves.easeOutCubic;

  /// 双方向のなめらかな遷移用（[slow]）。
  static const Curve easeInOut = Curves.easeInOutCubic;

  /// リビール時のスライドアップ標準距離（8dp）。
  static const double revealOffset = 8;
}
