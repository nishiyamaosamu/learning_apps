import 'package:flutter/material.dart';

/// DESIGN.html「集中ブルー」の影トークン。フラット基調のため**この 2 段のみ**。
class AppShadows {
  AppShadows._();

  /// カード等の面をわずかに浮かせる影（`0 1px 2px rgba(30,41,59,.06)`）。
  static const List<BoxShadow> card = [
    BoxShadow(
      color: Color.fromRGBO(30, 41, 59, 0.06),
      offset: Offset(0, 1),
      blurRadius: 2,
    ),
  ];

  /// ボトムシート・浮遊カードなど（`0 12px 32px rgba(30,41,59,.10)`）。
  static const List<BoxShadow> float = [
    BoxShadow(
      color: Color.fromRGBO(30, 41, 59, 0.10),
      offset: Offset(0, 12),
      blurRadius: 32,
    ),
  ];
}
