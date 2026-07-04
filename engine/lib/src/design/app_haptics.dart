import 'package:flutter/services.dart';

/// 触覚フィードバックのラッパー。
///
/// **不正解用のハプティクスは意図的に存在しない**。学習者を「責めない」方針のため、
/// まちがいには振動を返さない（正解・完了だけを肯定的に強調する）。
class AppHaptics {
  AppHaptics._();

  /// 選択肢タップ・トグルなどの選択操作。
  static Future<void> selection() => HapticFeedback.selectionClick();

  /// 正解時の軽い肯定フィードバック。
  static Future<void> correct() => HapticFeedback.lightImpact();

  /// セッション完了など、より強い達成フィードバック。
  static Future<void> complete() => HapticFeedback.mediumImpact();
}
