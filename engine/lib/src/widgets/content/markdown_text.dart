import 'package:flutter/material.dart';

import 'markdown_icons.dart';

/// 説明本文。Markdown ソースを簡易レンダリングする。
///
/// 対応記法:
/// - 見出し `# `、箇条書き `- `、区切り線 `---`
/// - インライン: 太字 `**`、コード `` ` ``、色強調 `==`、アイコン `:name:`
///   （太字・色強調は入れ子可。例: `**`code`と==強調==**`）
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
    return Text.rich(
      TextSpan(style: base, children: _spans(source, theme, base)),
      textAlign: textAlign,
    );
  }

  /// インライン記法を再帰的に解析する。`**...**` の中に `` `code` `` や
  /// `==highlight==` が入れ子になっても、それぞれのスタイルを重ねて描画する。
  List<InlineSpan> _spans(String source, ThemeData theme, TextStyle? base) {
    final baseSize = base?.fontSize ?? 16;
    final iconSize = baseSize * 1.15;
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
        // 太字。中身も再帰的に解釈し、子スパンの上に bold を重ねる。
        spans.add(
          TextSpan(
            style: const TextStyle(fontWeight: FontWeight.bold),
            children: _spans(m.group(1)!, theme, base),
          ),
        );
      } else if (m.group(2) != null) {
        // コードは中身をそのまま等幅で表示する（入れ子記法は解釈しない）。
        // :::box に合わせて primary の薄い背景・ボーダー・角丸の枠付きチップにする。
        spans.add(
          WidgetSpan(
            alignment: PlaceholderAlignment.middle,
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 1),
              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withValues(alpha: 0.06),
                border: Border.all(
                  color: theme.colorScheme.primary.withValues(alpha: 0.3),
                ),
                borderRadius: BorderRadius.circular(5),
              ),
              child: Text(
                m.group(2)!,
                style: TextStyle(
                  fontFamily: 'monospace',
                  fontSize: baseSize * 0.92,
                  color: theme.colorScheme.onSurface,
                ),
              ),
            ),
          ),
        );
      } else if (m.group(3) != null) {
        // 色強調。中身も再帰的に解釈する。
        spans.add(
          TextSpan(
            style: TextStyle(
              color: theme.colorScheme.primary,
              fontWeight: FontWeight.bold,
            ),
            children: _spans(m.group(3)!, theme, base),
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
                  size: iconSize,
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
    return spans;
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
