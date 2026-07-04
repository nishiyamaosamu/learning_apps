import 'package:flutter/material.dart';

/// ブランドの「主色ランプ」。
///
/// DESIGN.html「集中ブルー」の RULE 3 に従い、**アプリごとに差し替え可能な唯一の
/// デザイン単位**がこのスワッチである。semantic（正誤・要復習）や neutral、accent
/// といった他のトークンは全アプリ共通で固定され、ブランドが変えられるのは主色
/// （p50〜p800 とダーク面の 2 トークン）だけに限定される。
///
/// 既定は集中ブルー（[focusBlue]）。個別アプリは [AppConfig.brandPrimary] に別の
/// スワッチを渡すことでのみ主色を差し替える。
@immutable
class AppPrimarySwatch {
  const AppPrimarySwatch({
    required this.p50,
    required this.p100,
    required this.p300,
    required this.p500,
    required this.p600,
    required this.p800,
    required this.primaryDark,
    required this.primarySurfaceDark,
  });

  /// 最も淡い面（選択中の選択肢面、vthumb 面など）。
  final Color p50;

  /// 淡い面・トラック（プログレスの空き、バッジ面など）。
  final Color p100;

  /// 破線・淡いボーダー（secondary ボタン枠、穴埋め空欄枠など）。
  final Color p300;

  /// サブ主色（進捗の副セグメント、スクラブなど）。
  final Color p500;

  /// 主色（ボタン・アクティブタブ・進捗フィルなど）。
  final Color p600;

  /// 濃い主色（見出し文字・オンブルー面のトラックなど）。
  final Color p800;

  /// ダーク面上での主色（動画プレーヤーなど常時ダークな文脈で使用）。
  final Color primaryDark;

  /// ダーク面上での主色の淡い面（14% 不透明）。
  final Color primarySurfaceDark;

  /// 既定のブランド主色「集中ブルー」。
  static const AppPrimarySwatch focusBlue = AppPrimarySwatch(
    p50: Color(0xFFEFF6FF),
    p100: Color(0xFFDBEAFE),
    p300: Color(0xFF93C5FD),
    p500: Color(0xFF3B82F6),
    p600: Color(0xFF2563EB),
    p800: Color(0xFF1E40AF),
    primaryDark: Color(0xFF60A5FA),
    primarySurfaceDark: Color.fromRGBO(96, 165, 250, 0.14),
  );

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AppPrimarySwatch &&
          runtimeType == other.runtimeType &&
          p50 == other.p50 &&
          p100 == other.p100 &&
          p300 == other.p300 &&
          p500 == other.p500 &&
          p600 == other.p600 &&
          p800 == other.p800 &&
          primaryDark == other.primaryDark &&
          primarySurfaceDark == other.primarySurfaceDark;

  @override
  int get hashCode => Object.hash(
    p50,
    p100,
    p300,
    p500,
    p600,
    p800,
    primaryDark,
    primarySurfaceDark,
  );
}
