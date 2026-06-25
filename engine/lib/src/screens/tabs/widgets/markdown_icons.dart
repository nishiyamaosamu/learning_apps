import 'package:flutter/material.dart';

/// Markdown の `:name:` 記法から参照できるマテリアルアイコンの許可リスト。
///
/// Flutter のアイコンは const な [IconData] 参照でないと tree-shaking で落ちるため、
/// `IconData(codePoint)` を動的生成せず、文字列→[IconData] の固定マップで管理する。
/// 新しいアイコンを使いたくなったらここにエイリアスを追加する。
const Map<String, IconData> markdownIcons = {
  // 経営資源（ヒト・モノ・カネ・情報）
  'people': Icons.groups,
  'groups': Icons.groups,
  'person': Icons.person,
  'box': Icons.inventory_2,
  'inventory': Icons.inventory_2,
  'thing': Icons.inventory_2,
  'yen': Icons.currency_yen,
  'money': Icons.payments,
  'cash': Icons.payments,
  'chart': Icons.bar_chart,
  'data': Icons.bar_chart,
  'insights': Icons.insights,

  // 汎用
  'book': Icons.menu_book,
  'lightbulb': Icons.lightbulb,
  'idea': Icons.lightbulb_outline,
  'check': Icons.check_circle,
  'info': Icons.info_outline,
  'warning': Icons.warning_amber,
  'star': Icons.star,
  'flag': Icons.flag,
  'bolt': Icons.bolt,
  'time': Icons.schedule,
  'building': Icons.apartment,
  'factory': Icons.factory,
  'globe': Icons.public,
  'cloud': Icons.cloud,
  'lock': Icons.lock,
  'key': Icons.key,
  'shield': Icons.shield,
  'gear': Icons.settings,
  'search': Icons.search,
  'link': Icons.link,
  'mail': Icons.mail_outline,
  'phone': Icons.phone,
  'doc': Icons.description,
  'folder': Icons.folder,
  'cart': Icons.shopping_cart,
  'truck': Icons.local_shipping,
  'tag': Icons.sell,
  'pin': Icons.push_pin,
  'arrow': Icons.arrow_forward,
  'target': Icons.adjust,
  'rocket': Icons.rocket_launch,
  'handshake': Icons.handshake,
  'leaf': Icons.eco,
};
