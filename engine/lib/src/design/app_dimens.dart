/// DESIGN.html「集中ブルー」の角丸トークン。
class AppRadius {
  AppRadius._();

  /// 8dp — チップ内アイコン枠、小さな面。
  static const double sm = 8;

  /// 12dp — ボタン、選択肢、入力欄。
  static const double md = 12;

  /// 16dp — カード。
  static const double lg = 16;

  /// 20dp — ヒーローカード、ボトムシート。
  static const double xl = 20;

  /// 999dp — バッジ、チップ（完全な丸）。
  static const double full = 999;
}

/// レイアウトの基本寸法。
class AppLayout {
  AppLayout._();

  /// 最小タップ領域（高さ）。
  static const double minTap = 48;

  /// 画面左右の標準マージン。
  static const double screenMargin = 16;

  /// 本文コンテンツの最大幅（中央寄せ）。
  static const double maxContentWidth = 640;

  /// レイアウトグリッドの基本単位。
  static const double grid = 4;
}
