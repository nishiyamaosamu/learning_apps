import 'package:flutter/material.dart';

import '../../content/content_models.dart';
import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_haptics.dart';
import '../../design/app_shadows.dart';
import '../../design/app_typography.dart';
import 'quiz_controller.dart';

/// タップ配置式の穴埋め盤面（DESIGN.html `.blank` / `.wordbank`）。
///
/// [question] を `[__]` で分割し、テキスト断片と空欄チップを [Wrap] で交互に並べる。
/// 下部の語群からチップをタップすると先頭の空いている空欄（[QuizController.firstEmptyBlank]）
/// に入り、配置済みの空欄をタップすると外れる（[revealed] 後は不可）。
///
/// - 空欄（未配置）: primary50 面＋primary300 の破線枠＋丸数字。
/// - 空欄（配置済み）: primary500 の実線枠＋primary800/w700 の語。
/// - 空欄（リビール後）: 正誤色（correctSurface/correct 枠 or incorrectSurface/incorrect 枠）＋○/✕。
/// - 語群チップ: full 角丸・surface 面・border 枠・[AppShadows.card]。使用済みは 35% 減光＋タップ不可。
///
/// 採点用の正解（`correctOptionIndices`）は [controller] が保持する
/// [QuizFillInTheBlank] から読む（[revealed] 時のみ使用）。
class FillBlankBoard extends StatelessWidget {
  const FillBlankBoard({
    super.key,
    required this.question,
    required this.options,
    required this.controller,
    required this.revealed,
  });

  /// 空欄 `[__]` を含む問題文。
  final String question;

  /// 語群（選択肢）。
  final List<String> options;

  final QuizController controller;

  /// 「回答する」後の正誤表示中か。
  final bool revealed;

  List<String> get _segments => question.split('[__]');
  int get _blankCount => _segments.length - 1;

  /// 各空欄の正解 option index（`correctOptionIndices`）。取れなければ null。
  List<int>? get _correctIndices {
    final q = controller.quiz;
    return q is QuizFillInTheBlank ? q.correctOptionIndices : null;
  }

  bool _isBlankCorrect(int blankIndex, int optionIndex) {
    final ci = _correctIndices;
    return ci != null &&
        blankIndex < ci.length &&
        ci[blankIndex] == optionIndex;
  }

  /// 0→①, 1→② … の丸数字。
  static String _circled(int n) =>
      n < 20 ? String.fromCharCode(0x2460 + n) : '${n + 1}';

  @override
  Widget build(BuildContext context) {
    final c = context.colors;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // 問題文（テキスト断片と空欄を交互に並べる）。
        Wrap(
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 2,
          runSpacing: 8,
          children: [
            for (var i = 0; i < _segments.length; i++) ...[
              if (_segments[i].isNotEmpty)
                Text(
                  _segments[i],
                  style: AppTypography.body.copyWith(color: c.textPrimary),
                ),
              if (i < _blankCount) _blank(context, i),
            ],
          ],
        ),
        const SizedBox(height: 20),
        // 語群（未配置の語もタップで配置できるよう全て並べ、使用済みは減光）。
        Wrap(
          alignment: WrapAlignment.center,
          spacing: 8,
          runSpacing: 8,
          children: [
            for (var i = 0; i < options.length; i++) _chip(context, i),
          ],
        ),
      ],
    );
  }

  Widget _blank(BuildContext context, int blankIndex) {
    final c = context.colors;
    final placed = controller.blanks[blankIndex];
    final filled = placed != null;

    Color bg;
    Border? border;
    bool dashed = false;
    IconData? mark;
    Color? markColor;
    Widget content;

    if (revealed && filled) {
      final correct = _isBlankCorrect(blankIndex, placed);
      bg = correct ? c.correctSurface : c.incorrectSurface;
      border = Border.all(
        color: correct ? c.correct : c.incorrect,
        width: 1.5,
      );
      mark = correct ? Icons.circle_outlined : Icons.close;
      markColor = correct ? c.correct : c.incorrect;
      content = Text(
        options[placed],
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w700,
          color: correct ? c.correctText : c.incorrectText,
        ),
      );
    } else if (filled) {
      bg = c.primary50;
      border = Border.all(color: c.primary500, width: 1.5);
      content = Text(
        options[placed],
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w700,
          color: c.primary800,
        ),
      );
    } else {
      bg = c.primary50;
      dashed = true;
      content = Text(
        _circled(blankIndex),
        style: TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w700,
          color: c.primary300,
        ),
      );
    }

    // alignment を指定すると Container が内容を Align で包み、Wrap が渡す
    // 上限幅（＝行いっぱい）まで伸びてしまう。中央寄せは Row 側で行い、
    // minWidth 58 ＋内容幅で intrinsic に収める。
    Widget box = Container(
      height: 32,
      constraints: const BoxConstraints(minWidth: 58),
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(AppRadius.sm),
        border: dashed ? null : border,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          content,
          if (mark != null) ...[
            const SizedBox(width: 4),
            Icon(mark, size: 13, color: markColor),
          ],
        ],
      ),
    );

    if (dashed) {
      box = CustomPaint(
        foregroundPainter: _DashedRRectPainter(
          color: c.primary300,
          radius: AppRadius.sm,
          strokeWidth: 1.5,
        ),
        child: box,
      );
    }

    // 配置済みかつリビール前はタップで外す。
    final canClear = filled && !revealed;
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: canClear ? () => controller.clearBlank(blankIndex) : null,
      child: box,
    );
  }

  Widget _chip(BuildContext context, int optionIndex) {
    final c = context.colors;
    final used = controller.blanks.contains(optionIndex);
    final tappable = !used && !revealed;

    final chip = Container(
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 6),
      decoration: BoxDecoration(
        color: c.surface,
        borderRadius: BorderRadius.circular(AppRadius.full),
        border: Border.all(color: c.border, width: 1.5),
        boxShadow: AppShadows.card,
      ),
      child: Text(
        options[optionIndex],
        style: TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w700,
          color: c.textPrimary,
        ),
      ),
    );

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: tappable
          ? () {
              final target = controller.firstEmptyBlank;
              if (target == null) return; // 空欄が無ければ無視
              controller.placeBlank(target, optionIndex);
              AppHaptics.selection();
            }
          : null,
      child: Opacity(opacity: used ? 0.35 : 1, child: chip),
    );
  }
}

/// 角丸矩形の破線枠を描くペインタ（空欄の「入る場所」表現）。
class _DashedRRectPainter extends CustomPainter {
  _DashedRRectPainter({
    required this.color,
    required this.radius,
    required this.strokeWidth,
  });

  final Color color;
  final double radius;
  final double strokeWidth;

  /// 破線の実線長・空白長（固定）。
  static const double dash = 4;
  static const double gap = 3;

  @override
  void paint(Canvas canvas, Size size) {
    final inset = strokeWidth / 2;
    final rect = Rect.fromLTWH(
      inset,
      inset,
      size.width - strokeWidth,
      size.height - strokeWidth,
    );
    final rrect = RRect.fromRectAndRadius(
      rect,
      Radius.circular((radius - inset).clamp(0, radius)),
    );
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..color = color;

    final source = Path()..addRRect(rrect);
    for (final metric in source.computeMetrics()) {
      var distance = 0.0;
      while (distance < metric.length) {
        final next = distance + dash;
        canvas.drawPath(
          metric.extractPath(distance, next.clamp(0, metric.length)),
          paint,
        );
        distance = next + gap;
      }
    }
  }

  @override
  bool shouldRepaint(_DashedRRectPainter old) =>
      old.color != color ||
      old.radius != radius ||
      old.strokeWidth != strokeWidth;
}
