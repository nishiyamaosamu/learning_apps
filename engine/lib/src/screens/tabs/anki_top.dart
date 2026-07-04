import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../content/content_models.dart';
import '../../content/content_providers.dart';
import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_typography.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/layout/content_max_width.dart';
import '../anki_study.dart';
import '../widgets/entity_list.dart';
import '../widgets/video_list.dart' show VideoSectionHeader;

/// 暗記カードタブのトップ。
///
/// DESIGN.html「暗記カードタブ」に対応。タイトル横のピンク吹き出し・「全カードから
/// 10問」の secondary CTA・デッキ一覧（qico 行＋収録語数）を縦に並べる。
///
/// 「覚えた」率のプログレスバーと「覚えていないカードから10問」（primary）は覚えた率の
/// 永続化が前提のため未実装（docs/DESIGN_TODO.md #3）。
class AnkiTop extends ConsumerWidget {
  const AnkiTop({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(contentIndexProvider);
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: const [
            Text('暗記カード'),
            SizedBox(width: 12),
            _PinkBubble(text: 'よく出る単語だけ!'),
          ],
        ),
      ),
      body: index.when(
        data: (idx) => _AnkiTopBody(decks: idx.anki),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}

class _AnkiTopBody extends ConsumerWidget {
  const _AnkiTopBody({required this.decks});

  final List<ContentSummary> decks;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final c = context.colors;

    if (decks.isEmpty) {
      return const EmptyState(
        icon: Icons.style_rounded,
        label: 'まだ暗記カードがありません',
        description: 'コンテンツが追加されると、ここにデッキが並びます。',
      );
    }

    // 収録語数の合計は base.json のサマリ（cardCount）で即時に出す。
    final totalWords = decks.fold<int>(
      0,
      (sum, d) => sum + (d.cardCount ?? 0),
    );

    // 「全カードから10問」は全デッキのカードを結合してシャッフルするため、
    // 実カードのロード（allAnkiDecksProvider）を待つ。ロード前は無効。
    final allDecks = ref.watch(allAnkiDecksProvider);
    final allCards = <AnkiCard>[
      for (final deck in allDecks.valueOrNull ?? const <AnkiDeck>[])
        ...deck.cards,
    ];

    return ContentMaxWidth(
      child: ListView(
        padding: const EdgeInsets.symmetric(
          horizontal: AppLayout.screenMargin,
          vertical: 12,
        ),
        children: [
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: allCards.isEmpty
                  ? null
                  : () => _startShuffle(context, allCards),
              icon: const Icon(Icons.shuffle_rounded, size: 18),
              label: const Text('全カードから10問'),
            ),
          ),
          const SizedBox(height: 16),
          VideoSectionHeader(title: 'デッキ', trailing: '$totalWords語'),
          const SizedBox(height: 12),
          EntityListCard(
            children: [
              for (final deck in decks)
                QicoRow(
                  icon: Icons.style_rounded,
                  title: deck.title,
                  trailing: deck.cardCount == null
                      ? null
                      : Text(
                          '${deck.cardCount}語',
                          style: AppTypography.mono(
                            AppTypography.caption,
                          ).copyWith(color: c.textMuted),
                        ),
                  onTap: () => context.push('/anki/${deck.id}'),
                ),
            ],
          ),
        ],
      ),
    );
  }

  /// 全デッキのカードをシャッフルして 10 枚（総数が 10 未満なら全部）出題する。
  void _startShuffle(BuildContext context, List<AnkiCard> allCards) {
    final shuffled = List<AnkiCard>.of(allCards)..shuffle();
    final picked = shuffled.take(math.min(10, shuffled.length)).toList();
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => AnkiStudyScreen(
          cards: picked,
          title: '全カードから10問',
        ),
      ),
    );
  }
}

/// タイトル横のピンク吹き出し（DESIGN.html `.bubble`）。
///
/// accentPinkSurface 面・accentPinkSoft 枠・accentPinkText 文字・full 角丸・10/w800。
/// 左向きの三角しっぽ（枠色の三角の上に面色の三角を重ねて縁取り風にする）を付ける。
/// **装飾専用のピンクの正しい使用例**（状態色・正誤色とは混ざらない）。
class _PinkBubble extends StatelessWidget {
  const _PinkBubble({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        CustomPaint(
          size: const Size(5, 10),
          painter: _BubbleTailPainter(
            fill: c.accentPinkSurface,
            border: c.accentPinkSoft,
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 3),
          decoration: BoxDecoration(
            color: c.accentPinkSurface,
            borderRadius: BorderRadius.circular(AppRadius.full),
            border: Border.all(color: c.accentPinkSoft),
          ),
          child: Text(
            text,
            style: const TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w800,
              height: 1.3,
            ).copyWith(color: c.accentPinkText),
          ),
        ),
      ],
    );
  }
}

/// 吹き出しの左向き三角しっぽ。面色の三角を描き、外向きの 2 辺を枠色で縁取る。
class _BubbleTailPainter extends CustomPainter {
  _BubbleTailPainter({required this.fill, required this.border});

  final Color fill;
  final Color border;

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    final triangle = Path()
      ..moveTo(0, h / 2) // 左向きの頂点
      ..lineTo(w, 0)
      ..lineTo(w, h)
      ..close();
    canvas.drawPath(triangle, Paint()..color = fill);

    // 吹き出し本体に接する右辺を除いた 2 辺だけ縁取る。
    final edges = Path()
      ..moveTo(w, 0)
      ..lineTo(0, h / 2)
      ..lineTo(w, h);
    canvas.drawPath(
      edges,
      Paint()
        ..color = border
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1,
    );
  }

  @override
  bool shouldRepaint(_BubbleTailPainter old) =>
      old.fill != fill || old.border != border;
}
