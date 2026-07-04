import 'package:flutter/material.dart';

import 'app_colors.dart';

/// DESIGN.html「集中ブルー」のタイポグラフィスケール。
///
/// - `w400` は使わない（小サイズの日本語で細りすぎるため最低 `w500`）。
/// - カウンタ・時刻・スコアなどの数字は桁揃えのため等幅数字（[mono]）を使う。
/// - 本文の行間は 1.7 を下限、見出しは 1.3〜1.5。
///
/// 各スタイルは色を持たない（色は [buildTextTheme] または利用側で付与する）。
class AppTypography {
  AppTypography._();

  /// 28dp / w800 / lh1.3 — 画面の大見出し（ヒーローなど）。
  static const TextStyle display = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.w800,
    height: 1.3,
  );

  /// 22dp / w800 / lh1.4 — セクションの主見出し。
  static const TextStyle title = TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.w800,
    height: 1.4,
  );

  /// 17dp / w800 / lh1.5 — 小見出し（AppBar タイトル・カード見出し）。
  static const TextStyle section = TextStyle(
    fontSize: 17,
    fontWeight: FontWeight.w800,
    height: 1.5,
  );

  /// 15dp / w500 / lh1.7 — 本文。
  static const TextStyle body = TextStyle(
    fontSize: 15,
    fontWeight: FontWeight.w500,
    height: 1.7,
  );

  /// 15dp / w700 / lh1.7 — 強調本文。
  static const TextStyle bodyStrong = TextStyle(
    fontSize: 15,
    fontWeight: FontWeight.w700,
    height: 1.7,
  );

  /// 13dp / w700 / lh1.4 — ラベル・ボタン内文字・行タイトル。
  static const TextStyle label = TextStyle(
    fontSize: 13,
    fontWeight: FontWeight.w700,
    height: 1.4,
  );

  /// 12dp / w500 / lh1.5 — 補足キャプション。
  static const TextStyle caption = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.5,
  );

  /// 10dp / w600 / lh1.3 / 字送り .02em — 極小ラベル（オールキャップス相当）。
  static const TextStyle micro = TextStyle(
    fontSize: 10,
    fontWeight: FontWeight.w600,
    height: 1.3,
    letterSpacing: 0.2, // .02em @ 10dp
  );

  /// 数字の桁揃え用に等幅数字（[FontFeature.tabularFigures]）を付与する。
  static TextStyle mono(TextStyle base) =>
      base.copyWith(fontFeatures: const [FontFeature.tabularFigures()]);

  /// トークンを Material の [TextTheme] スロットへ写す。
  ///
  /// display→headlineMedium / title→titleLarge / section→titleMedium /
  /// body→bodyLarge / label→labelLarge / caption→bodySmall / micro→labelSmall。
  /// 本文系は [AppColors.textPrimary]、caption・micro は [AppColors.textSecondary]。
  static TextTheme buildTextTheme(AppColors c) {
    return TextTheme(
      headlineMedium: display.copyWith(color: c.textPrimary),
      titleLarge: title.copyWith(color: c.textPrimary),
      titleMedium: section.copyWith(color: c.textPrimary),
      bodyLarge: body.copyWith(color: c.textPrimary),
      labelLarge: label.copyWith(color: c.textPrimary),
      bodySmall: caption.copyWith(color: c.textSecondary),
      labelSmall: micro.copyWith(color: c.textSecondary),
    );
  }
}
