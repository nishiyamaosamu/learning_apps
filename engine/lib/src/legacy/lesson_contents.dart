// 旧テキストレッスンの本文部品（単一選択・穴埋めミニクイズ、カードレイアウト寸法・
// ビルダー）。ルート未接続・到達不可。動画講座＋共有クイズキットに置き換え済み。
// 詳細は engine/lib/src/legacy/README.md を参照。
import 'package:flutter/material.dart';

import '../app/app_config.dart';
import '../content/content_models.dart';
import '../widgets/quiz/quiz_controller.dart';

/// 単一選択ミニクイズ。選択肢タップで [controller] に回答を登録し、
/// 「回答する」確定後（[QuizController.submitted]）に正誤を表示する。
class MultipleChoiceQuiz extends StatelessWidget {
  const MultipleChoiceQuiz({
    super.key,
    required this.quiz,
    required this.controller,
  });

  final QuizMultipleChoice quiz;
  final QuizController controller;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final answered = controller.submitted;
    final selected = controller.choice;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (var i = 0; i < quiz.options.length; i++)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: _OptionTile(
              label: quiz.options[i],
              state: _stateFor(i, selected, answered),
              onTap: answered ? null : () => controller.selectChoice(i),
            ),
          ),
        if (answered)
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              selected == quiz.correctOptionIndex ? '正解！' : '不正解',
              style: theme.textTheme.titleSmall?.copyWith(
                color: selected == quiz.correctOptionIndex
                    ? theme.semantic.success
                    : theme.colorScheme.error,
              ),
            ),
          ),
      ],
    );
  }

  _OptionState _stateFor(int i, int? selected, bool answered) {
    if (!answered) {
      return i == selected ? _OptionState.selected : _OptionState.idle;
    }
    // 回答後は正解を緑、選んだ誤答を赤で示す。
    if (i == quiz.correctOptionIndex) return _OptionState.correct;
    if (i == selected) return _OptionState.wrong;
    return _OptionState.idle;
  }
}

enum _OptionState { idle, selected, correct, wrong }

class _OptionTile extends StatelessWidget {
  const _OptionTile({
    required this.label,
    required this.state,
    required this.onTap,
  });

  final String label;
  final _OptionState state;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final success = theme.semantic.success;
    final (Color border, Color? bg, IconData? icon) = switch (state) {
      _OptionState.idle => (theme.dividerColor, null, null),
      _OptionState.selected => (
        theme.colorScheme.primary,
        theme.colorScheme.primary.withValues(alpha: 0.08),
        Icons.radio_button_checked,
      ),
      _OptionState.correct => (
        success,
        success.withValues(alpha: 0.12),
        Icons.check_circle,
      ),
      _OptionState.wrong => (
        theme.colorScheme.error,
        theme.colorScheme.error.withValues(alpha: 0.1),
        Icons.cancel,
      ),
    };

    return Material(
      color: bg ?? Colors.transparent,
      borderRadius: BorderRadius.circular(8),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
          decoration: BoxDecoration(
            border: Border.all(color: border),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            children: [
              Expanded(child: Text(label)),
              if (icon != null) Icon(icon, size: 20, color: border),
            ],
          ),
        ),
      ),
    );
  }
}

/// 穴埋めミニクイズ。選択肢チップを空欄へドラッグ&ドロップして回答する。
///
/// - `question` 中の `[__]` を出現順に空欄として扱う。
/// - 各チップは1つの空欄にのみ使用できる（使用済みは選択肢から消える）。
/// - 空欄をタップすると配置を解除して選択肢へ戻す（回答確定前のみ）。
/// - 採点は「回答する」（[QuizController.submit]）で行う。
class FillInTheBlankQuiz extends StatelessWidget {
  FillInTheBlankQuiz({super.key, required this.quiz, required this.controller})
    : _segments = quiz.question.split('[__]');

  final QuizFillInTheBlank quiz;
  final QuizController controller;

  /// question を `[__]` で分割した、空欄の前後に挟まる固定テキスト片。
  /// （セグメント数 = 空欄数 + 1）
  final List<String> _segments;

  int get _blankCount => _segments.length - 1;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final placed = controller.blanks;
    final submitted = controller.submitted;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // 問題文（テキスト片と空欄を交互に並べる）。
        Wrap(
          crossAxisAlignment: WrapCrossAlignment.center,
          spacing: 4,
          runSpacing: 8,
          children: [
            for (var i = 0; i < _segments.length; i++) ...[
              if (_segments[i].isNotEmpty) Text(_segments[i]),
              if (i < _blankCount) _buildBlank(i, placed[i], submitted, theme),
            ],
          ],
        ),
        const SizedBox(height: 16),
        // 未使用の選択肢チップ。
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (var i = 0; i < quiz.options.length; i++)
              if (!placed.contains(i)) _buildDraggableChip(i, submitted, theme),
          ],
        ),
        if (submitted)
          Padding(
            padding: const EdgeInsets.only(top: 12),
            child: Text(
              _allCorrect(placed) ? '全問正解！' : 'もう一度試してみましょう',
              style: theme.textTheme.titleSmall?.copyWith(
                color: _allCorrect(placed)
                    ? theme.semantic.success
                    : theme.colorScheme.error,
              ),
            ),
          ),
      ],
    );
  }

  bool _isBlankCorrect(int blankIndex, int? optionIndex) =>
      optionIndex == quiz.correctOptionIndices[blankIndex];

  bool _allCorrect(List<int?> placed) => List.generate(
    _blankCount,
    (i) => _isBlankCorrect(i, placed[i]),
  ).every((e) => e);

  Widget _buildBlank(
    int blankIndex,
    int? optionIndex,
    bool submitted,
    ThemeData theme,
  ) {
    return DragTarget<int>(
      onWillAcceptWithDetails: (_) => !submitted,
      onAcceptWithDetails: (details) =>
          controller.placeBlank(blankIndex, details.data),
      builder: (context, candidate, rejected) {
        final hovering = candidate.isNotEmpty;
        final Color border;
        if (submitted && optionIndex != null) {
          border = _isBlankCorrect(blankIndex, optionIndex)
              ? theme.semantic.success
              : theme.colorScheme.error;
        } else if (hovering) {
          border = theme.colorScheme.primary;
        } else {
          border = theme.dividerColor;
        }

        return GestureDetector(
          onTap: (!submitted && optionIndex != null)
              ? () => controller.clearBlank(blankIndex)
              : null,
          child: Container(
            constraints: const BoxConstraints(minWidth: 72, minHeight: 36),
            alignment: Alignment.center,
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
            decoration: BoxDecoration(
              border: Border.all(color: border, width: 1.5),
              borderRadius: BorderRadius.circular(8),
              color: optionIndex != null
                  ? theme.colorScheme.surfaceContainerHighest
                  : null,
            ),
            child: Text(
              optionIndex != null ? quiz.options[optionIndex] : '____',
              style: TextStyle(
                color: optionIndex != null
                    ? null
                    : theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildDraggableChip(int optionIndex, bool submitted, ThemeData theme) {
    final chip = _Chip(label: quiz.options[optionIndex]);
    if (submitted) return chip;
    return Draggable<int>(
      data: optionIndex,
      feedback: Material(
        color: Colors.transparent,
        child: _Chip(label: quiz.options[optionIndex], elevated: true),
      ),
      childWhenDragging: Opacity(opacity: 0.3, child: chip),
      child: chip,
    );
  }
}

class _Chip extends StatelessWidget {
  const _Chip({required this.label, this.elevated = false});

  final String label;
  final bool elevated;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: theme.colorScheme.primaryContainer,
        borderRadius: BorderRadius.circular(20),
        boxShadow: elevated
            ? [const BoxShadow(blurRadius: 6, color: Colors.black26)]
            : null,
      ),
      child: Text(
        label,
        style: TextStyle(color: theme.colorScheme.onPrimaryContainer),
      ),
    );
  }
}

/// レッスンカードのレイアウト寸法。
///
/// 実際の描画（`_LessonCard` / `_ContentPageView`）と、分量が1ページに収まるかを
/// 機械的に判定するテスト（apps/*/test/page_fit_test.dart）の双方が同じ値を参照
/// できるよう、寸法をここに一元化する。値を変えると両方の挙動が同時に変わる。
class LessonCardMetrics {
  const LessonCardMetrics._();

  /// 上部ヘッダー（進捗バー）の高さ。`_LessonHeader.height` の実体。
  static const double headerHeight = 56;

  /// 下部フッター（音声操作）の高さ。`_AudioFooter.height` の実体。
  static const double footerHeight = 72;

  /// 1ページ領域からカードへ渡すときに上下で控える余白の合計
  /// （`_ContentPageView` の `constraints.maxHeight - 40`）。
  static const double pageVerticalInset = 40;

  /// カード左右のマージン合計（`constraints.maxWidth - 32`）。
  static const double horizontalMargin = 32;

  /// カード内側の余白。本文はこの内側でレイアウトされる。
  static const EdgeInsets cardPadding = EdgeInsets.fromLTRB(20, 24, 20, 24);

  /// ページタイトルと最初のブロックの間隔。
  static const double titleGap = 12;

  /// ブロック間の間隔。
  static const double blockGap = 16;
}

/// カード本文（タイトル＋ブロック列）を組み立てる。
///
/// `_LessonCard` の本体レイアウトをこの関数に集約し、分量チェックのテストからも
/// 同一のツリーを再構築して原寸の高さを計測できるようにする。[blocks] には
/// テキストなら MarkdownText、画像なら ContentImage（テストでは寸法を再現した
/// 代替ウィジェット）を、定義順で渡す。
Widget buildLessonCardColumn({
  String? title,
  required List<Widget> blocks,
  required ThemeData theme,
}) {
  return Padding(
    padding: LessonCardMetrics.cardPadding,
    child: Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (title != null) ...[
          Text(
            title,
            style: theme.textTheme.labelMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
          const SizedBox(height: LessonCardMetrics.titleGap),
        ],
        for (var i = 0; i < blocks.length; i++)
          Padding(
            padding: EdgeInsets.only(
              top: i == 0 ? 0 : LessonCardMetrics.blockGap,
            ),
            child: blocks[i],
          ),
      ],
    ),
  );
}

/// 画面サイズとセーフエリアから、カードが原寸（縮小なし）で使える最大の
/// 幅・高さを求める。
///
/// 本文の自然な高さがこの [maxHeight] を超えると `_LessonCard` の
/// `FittedBox(scaleDown)` により全体が縮小される（＝1ページに収まっていない）。
({double maxWidth, double maxHeight}) lessonCardFitBox({
  required Size screen,
  required EdgeInsets viewPadding,
}) {
  final pageHeight =
      screen.height -
      viewPadding.top -
      LessonCardMetrics.headerHeight -
      viewPadding.bottom -
      LessonCardMetrics.footerHeight;
  return (
    maxWidth: screen.width - LessonCardMetrics.horizontalMargin,
    maxHeight: pageHeight - LessonCardMetrics.pageVerticalInset,
  );
}
