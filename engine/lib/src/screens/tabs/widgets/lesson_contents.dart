import 'package:flutter/material.dart';

import '../../../content/content_models.dart';
import 'quiz_controller.dart';

/// コンテンツの画像。アセットが見つからない場合はプレースホルダを表示する。
class ContentImage extends StatelessWidget {
  const ContentImage({super.key, required this.assetPath});

  /// 画像アセットの完全パス（例: 'contents/lessons/images/2-1.jpeg'）。
  final String assetPath;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(8),
      child: Image.asset(
        assetPath,
        fit: BoxFit.contain,
        errorBuilder: (context, error, stackTrace) {
          final theme = Theme.of(context);
          return Container(
            height: 120,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceContainerHighest,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.image_outlined),
                const SizedBox(height: 4),
                Text(assetPath, style: theme.textTheme.bodySmall),
              ],
            ),
          );
        },
      ),
    );
  }
}

/// 説明本文。Markdown ソースをそのまま表示する簡易レンダラ。
///
/// （見出し `#`・箇条書き `-`・太字 `**`・インラインコード `` ` `` の最小対応。
/// 本格的な Markdown 表示が必要になったら flutter_markdown 等の導入を検討する。）
class MarkdownText extends StatelessWidget {
  const MarkdownText({super.key, required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final lines = text.split('\n');
    final widgets = <Widget>[];

    for (final line in lines) {
      final trimmed = line.trimRight();
      if (trimmed.isEmpty) {
        widgets.add(const SizedBox(height: 8));
        continue;
      }
      if (trimmed.startsWith('# ')) {
        widgets.add(Padding(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: Text(trimmed.substring(2), style: theme.textTheme.titleLarge),
        ));
      } else if (trimmed.startsWith('- ')) {
        widgets.add(Padding(
          padding: const EdgeInsets.only(left: 8, top: 2, bottom: 2),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('・'),
              Expanded(child: _inline(trimmed.substring(2), theme)),
            ],
          ),
        ));
      } else {
        widgets.add(_inline(trimmed, theme));
      }
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: widgets,
    );
  }

  /// `**bold**` と `` `code` `` の最小インライン対応。
  Widget _inline(String source, ThemeData theme) {
    final spans = <TextSpan>[];
    final pattern = RegExp(r'\*\*(.+?)\*\*|`(.+?)`');
    var index = 0;
    for (final m in pattern.allMatches(source)) {
      if (m.start > index) {
        spans.add(TextSpan(text: source.substring(index, m.start)));
      }
      if (m.group(1) != null) {
        spans.add(TextSpan(
          text: m.group(1),
          style: const TextStyle(fontWeight: FontWeight.bold),
        ));
      } else {
        spans.add(TextSpan(
          text: m.group(2),
          style: TextStyle(
            fontFamily: 'monospace',
            backgroundColor: theme.colorScheme.surfaceContainerHighest,
          ),
        ));
      }
      index = m.end;
    }
    if (index < source.length) {
      spans.add(TextSpan(text: source.substring(index)));
    }
    return Text.rich(TextSpan(
      style: theme.textTheme.bodyLarge,
      children: spans,
    ));
  }
}

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
                    ? Colors.green
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
    final (Color border, Color? bg, IconData? icon) = switch (state) {
      _OptionState.idle => (theme.dividerColor, null, null),
      _OptionState.selected => (
          theme.colorScheme.primary,
          theme.colorScheme.primary.withValues(alpha: 0.08),
          Icons.radio_button_checked,
        ),
      _OptionState.correct => (
          Colors.green,
          Colors.green.withValues(alpha: 0.1),
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
  FillInTheBlankQuiz({
    super.key,
    required this.quiz,
    required this.controller,
  }) : _segments = quiz.question.split('[__]');

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
              if (i < _blankCount)
                _buildBlank(i, placed[i], submitted, theme),
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
              if (!placed.contains(i))
                _buildDraggableChip(i, submitted, theme),
          ],
        ),
        if (submitted)
          Padding(
            padding: const EdgeInsets.only(top: 12),
            child: Text(
              _allCorrect(placed) ? '全問正解！' : 'もう一度試してみましょう',
              style: theme.textTheme.titleSmall?.copyWith(
                color: _allCorrect(placed)
                    ? Colors.green
                    : theme.colorScheme.error,
              ),
            ),
          ),
      ],
    );
  }

  bool _isBlankCorrect(int blankIndex, int? optionIndex) =>
      optionIndex == quiz.correctOptionIndices[blankIndex];

  bool _allCorrect(List<int?> placed) =>
      List.generate(_blankCount, (i) => _isBlankCorrect(i, placed[i]))
          .every((e) => e);

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
              ? Colors.green
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
