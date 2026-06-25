import 'package:flutter/material.dart';

import '../../../content/content_models.dart';
import 'markdown_icons.dart';
import 'quiz_controller.dart';

/// コンテンツの画像。アセットが見つからない場合はプレースホルダを表示する。
class ContentImage extends StatelessWidget {
  const ContentImage({
    super.key,
    required this.assetPath,
    this.borderRadius = const BorderRadius.all(Radius.circular(8)),
    this.fit = BoxFit.fitWidth,
    this.alignment = Alignment.center,
  });

  /// 画像アセットの完全パス（例: 'contents/lessons/images/2-1.jpeg'）。
  final String assetPath;

  /// 画像の角丸。カード内に全幅で敷き込む場合は [BorderRadius.zero] を渡し、
  /// 角丸は外側のカード側のクリップに任せる。
  final BorderRadius borderRadius;

  /// 画像のフィット方法。高さ制約内で縮めたい場合は [BoxFit.contain] を渡す。
  final BoxFit fit;

  /// フィット後の配置。縮小時に下端へ寄せたい場合は [Alignment.bottomCenter] など。
  final Alignment alignment;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: borderRadius,
      child: Image.asset(
        assetPath,
        fit: fit,
        alignment: alignment,
        errorBuilder: (context, error, stackTrace) {
          final theme = Theme.of(context);
          return Container(
            height: 120,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceContainerHighest,
              borderRadius: borderRadius,
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

/// 説明本文。Markdown ソースを簡易レンダリングする。
///
/// 対応記法:
/// - 見出し `# `、箇条書き `- `、区切り線 `---`
/// - インライン: 太字 `**`、コード `` ` ``、色強調 `==`、アイコン `:name:`
/// - フェンスブロック `:::variant` 〜 `:::`
///   - `:::iconlist` … 円アイコン付きの行（`- :name: 本文`）を区切り線で並べる
///   - `:::box` … 角丸の囲み（中央揃え）
///   - `:::center` … 中央揃え（囲みなし）
///
/// 本格的な Markdown 表示が必要になったら flutter_markdown 等の導入を検討する。
class MarkdownText extends StatelessWidget {
  const MarkdownText({
    super.key,
    required this.text,
    this.textAlign = TextAlign.start,
  });

  final String text;

  /// 段落・見出し・箇条書きの行揃え。`:::center` / `:::box` の中で中央寄せに使う。
  final TextAlign textAlign;

  CrossAxisAlignment get _crossAxis => switch (textAlign) {
    TextAlign.center => CrossAxisAlignment.center,
    TextAlign.end || TextAlign.right => CrossAxisAlignment.end,
    _ => CrossAxisAlignment.start,
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final lines = text.split('\n');
    final widgets = <Widget>[];

    for (var i = 0; i < lines.length; i++) {
      final trimmed = lines[i].trim();

      // フェンスブロック（:::variant 〜 :::）。内側を集めてまとめて描画する。
      if (trimmed.startsWith(':::')) {
        final variant = trimmed.substring(3).trim();
        final inner = <String>[];
        i++;
        while (i < lines.length && lines[i].trim() != ':::') {
          inner.add(lines[i]);
          i++;
        }
        widgets.add(_fenced(variant, inner.join('\n'), theme));
        continue;
      }

      if (trimmed.isEmpty) {
        widgets.add(const SizedBox(height: 8));
      } else if (trimmed == '---' || trimmed == '***') {
        widgets.add(
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Divider(
              height: 0.5,
              thickness: 0.5,
              color: theme.dividerColor.withValues(alpha: 0.4),
            ),
          ),
        );
      } else if (trimmed.startsWith('# ')) {
        widgets.add(
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: _inline(
              trimmed.substring(2),
              theme,
              style: theme.textTheme.titleLarge,
            ),
          ),
        );
      } else if (trimmed.startsWith('- ')) {
        widgets.add(
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 5),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 小さなドット。先頭行の中央あたりに合わせる。
                Padding(
                  padding: const EdgeInsets.only(top: 9, right: 10),
                  child: Container(
                    width: 4,
                    height: 4,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onSurfaceVariant,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
                Expanded(child: _inline(trimmed.substring(2), theme)),
              ],
            ),
          ),
        );
      } else {
        widgets.add(_inline(trimmed, theme));
      }
    }

    return Column(crossAxisAlignment: _crossAxis, children: widgets);
  }

  /// `:::variant` ブロックを種別ごとに描画する。
  Widget _fenced(String variant, String inner, ThemeData theme) {
    switch (variant) {
      case 'iconlist':
        return _IconList(source: inner);
      case 'center':
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: MarkdownText(text: inner, textAlign: TextAlign.center),
        );
      case 'box':
      default:
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            decoration: BoxDecoration(
              color: theme.colorScheme.primary.withValues(alpha: 0.06),
              borderRadius: BorderRadius.circular(16),
            ),
            child: MarkdownText(text: inner, textAlign: TextAlign.center),
          ),
        );
    }
  }

  /// `**bold**`・`` `code` ``・`==highlight==`・`:icon:` のインライン対応。
  Widget _inline(String source, ThemeData theme, {TextStyle? style}) {
    final raw = style ?? theme.textTheme.bodyLarge;
    // 全体的に少し詰めたいので base のフォントサイズを 1.5pt 下げる。
    final base = raw?.copyWith(fontSize: (raw.fontSize ?? 16) - 1.5);
    final spans = <InlineSpan>[];
    final pattern = RegExp(
      r'\*\*(.+?)\*\*|`(.+?)`|==(.+?)==|:([a-z_][a-z0-9_]*):',
    );
    var index = 0;
    for (final m in pattern.allMatches(source)) {
      if (m.start > index) {
        spans.add(TextSpan(text: source.substring(index, m.start)));
      }
      if (m.group(1) != null) {
        spans.add(
          TextSpan(
            text: m.group(1),
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        );
      } else if (m.group(2) != null) {
        spans.add(
          TextSpan(
            text: m.group(2),
            style: TextStyle(
              fontFamily: 'monospace',
              backgroundColor: theme.colorScheme.surfaceContainerHighest,
            ),
          ),
        );
      } else if (m.group(3) != null) {
        spans.add(
          TextSpan(
            text: m.group(3),
            style: TextStyle(
              color: theme.colorScheme.primary,
              fontWeight: FontWeight.bold,
            ),
          ),
        );
      } else {
        final icon = markdownIcons[m.group(4)];
        if (icon == null) {
          // 未登録のアイコン名はそのまま文字列として残す。
          spans.add(TextSpan(text: m.group(0)));
        } else {
          spans.add(
            WidgetSpan(
              alignment: PlaceholderAlignment.middle,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 1),
                child: Icon(
                  icon,
                  size: (base?.fontSize ?? 16) * 1.15,
                  color: theme.colorScheme.primary,
                ),
              ),
            ),
          );
        }
      }
      index = m.end;
    }
    if (index < source.length) {
      spans.add(TextSpan(text: source.substring(index)));
    }
    return Text.rich(
      TextSpan(style: base, children: spans),
      textAlign: textAlign,
    );
  }
}

/// `:::iconlist` ブロック。`- :name: 本文` の各行を、円アイコンのバッジ付きで
/// 縦に並べ、行間に薄い区切り線を入れる（スクショのヒト/モノ/カネ/情報のレイアウト）。
class _IconList extends StatelessWidget {
  const _IconList({required this.source});

  final String source;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final rowPattern = RegExp(r'^-\s*:([a-z_][a-z0-9_]*):\s*(.*)$');
    final rows = <({IconData icon, String text})>[];
    for (final line in source.split('\n')) {
      final m = rowPattern.firstMatch(line.trim());
      if (m == null) continue;
      final icon = markdownIcons[m.group(1)];
      if (icon == null) continue;
      rows.add((icon: icon, text: m.group(2) ?? ''));
    }
    if (rows.isEmpty) return const SizedBox.shrink();

    final children = <Widget>[];
    for (var i = 0; i < rows.length; i++) {
      if (i > 0) {
        children.add(
          Divider(
            height: 0.5,
            thickness: 0.5,
            color: theme.dividerColor.withValues(alpha: 0.4),
          ),
        );
      }
      children.add(
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 10),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: 38,
                height: 38,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: theme.colorScheme.primary.withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  rows[i].icon,
                  color: theme.colorScheme.primary,
                  size: 18,
                ),
              ),
              const SizedBox(width: 14),
              Expanded(child: _rowContent(rows[i].text)),
            ],
          ),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: children,
    );
  }

  /// 行の本文を描画する。`ラベル：説明` の形（全角コロン区切り）はラベルを上段・
  /// 説明を下段の2行にして、ラベルが途中で折り返さないようにする。
  Widget _rowContent(String text) {
    final sep = text.indexOf('：');
    if (sep < 0) return MarkdownText(text: text);
    final label = text.substring(0, sep);
    final body = text.substring(sep + 1).trimLeft();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        MarkdownText(text: label),
        if (body.isNotEmpty) ...[
          const SizedBox(height: 2),
          MarkdownText(text: body),
        ],
      ],
    );
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
