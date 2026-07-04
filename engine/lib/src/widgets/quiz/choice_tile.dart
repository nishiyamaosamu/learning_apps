import 'package:flutter/material.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_haptics.dart';
import '../../design/app_motion.dart';

/// [ChoiceTile] の見た目の状態（DESIGN.html `.choice` の各修飾）。
///
/// - [idle]     … 未選択（surface 面＋border 枠）。
/// - [selected] … 選択中（primary50 面＋primary500 枠、kl は primary600 の白抜き）。
/// - [correct]  … 正解（correctSurface 面＋correct 枠、右端に ○）。
/// - [incorrect]… 誤答（incorrectSurface 面＋incorrect 枠、右端に ✕）。
/// - [dimmed]   … リビール後、注目させない選択肢（idle 見た目を 55% 減光）。
enum ChoiceTileState { idle, selected, correct, incorrect, dimmed }

/// クイズの選択肢 1 行（コア部品、DESIGN.html `.choice`）。
///
/// 左に丸ラベル（ア／イ／ウ／エ…を [label] に文字列で渡す）、中央に [child]、
/// 右端に状態マーク（○ / ✕）を置く。状態変化は [AppMotion.fast]＋[AppMotion.easeOut]
/// で色と枠だけをアニメーションし、位置・サイズは動かさない。
///
/// 正誤は「色＋記号」の二重符号化（RULE 2）。[onTap] が null のときはタップ不可
/// （リビール後など）で、ハプティクスも鳴らさない。
class ChoiceTile extends StatelessWidget {
  const ChoiceTile({
    super.key,
    required this.label,
    required this.state,
    required this.child,
    this.onTap,
  });

  /// 丸ラベルの文字（例: 'ア'）。呼び出し側で採番する。
  final String label;

  final ChoiceTileState state;

  /// 選択肢の内容（テキストや画像ブロックなど）。
  final Widget child;

  /// タップ時のコールバック。null ならタップ不可。
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;

    // 状態ごとの面・枠・文字色・丸ラベル配色・右端マーク。
    final Color bg;
    final Color borderColor;
    final Color textColor;
    final Color klBg;
    final Color klText;
    final Color klBorder;
    IconData? mark;
    Color? markColor;

    switch (state) {
      case ChoiceTileState.idle:
      case ChoiceTileState.dimmed:
        bg = c.surface;
        borderColor = c.border;
        textColor = c.textPrimary;
        klBg = c.bg;
        klText = c.textSecondary;
        klBorder = c.border;
      case ChoiceTileState.selected:
        bg = c.primary50;
        borderColor = c.primary500;
        textColor = c.textPrimary;
        klBg = c.primary600;
        klText = Colors.white;
        klBorder = c.primary600;
      case ChoiceTileState.correct:
        bg = c.correctSurface;
        borderColor = c.correct;
        textColor = c.correctText;
        klBg = c.correct;
        klText = Colors.white;
        klBorder = c.correct;
        mark = Icons.circle_outlined;
        markColor = c.correct;
      case ChoiceTileState.incorrect:
        bg = c.incorrectSurface;
        borderColor = c.incorrect;
        textColor = c.incorrectText;
        klBg = c.incorrect;
        klText = Colors.white;
        klBorder = c.incorrect;
        mark = Icons.close;
        markColor = c.incorrect;
    }

    final tile = AnimatedContainer(
      duration: AppMotion.fast,
      curve: AppMotion.easeOut,
      constraints: const BoxConstraints(minHeight: AppLayout.minTap),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: bg,
        border: Border.all(color: borderColor, width: 1.5),
        borderRadius: BorderRadius.circular(AppRadius.md),
      ),
      child: Row(
        children: [
          // 丸ラベル（ア/イ/ウ/エ…）。
          AnimatedContainer(
            duration: AppMotion.fast,
            curve: AppMotion.easeOut,
            width: 24,
            height: 24,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: klBg,
              shape: BoxShape.circle,
              border: Border.all(color: klBorder),
            ),
            child: Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: klText,
              ),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: DefaultTextStyle.merge(
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: textColor,
              ),
              child: child,
            ),
          ),
          if (mark != null) ...[
            const SizedBox(width: 10),
            Icon(mark, size: 18, color: markColor),
          ],
        ],
      ),
    );

    // dimmed は idle 見た目のまま全体を減光する。
    final content = state == ChoiceTileState.dimmed
        ? Opacity(opacity: 0.55, child: tile)
        : tile;

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: onTap == null
          ? null
          : () {
              AppHaptics.selection();
              onTap!();
            },
      child: content,
    );
  }
}
