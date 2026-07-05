import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../content/content_models.dart';
import '../../content/content_providers.dart';
import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_motion.dart';
import '../../design/app_typography.dart';
import '../../settings/anki_results.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/layout/content_max_width.dart';
import '../anki_study.dart';
import '../widgets/entity_list.dart';
import '../widgets/video_list.dart' show VideoSectionHeader;

/// 暗記カードタブのトップ。
///
/// DESIGN.html「暗記カードタブ」に対応。タイトル横のピンク吹き出し・「覚えた」率
/// プログレスバー・「覚えていないカードから10問」の主導線（primary）・「全カードから
/// 10問」の副導線（secondary）・デッキ一覧（qico 行＋収録語数）を縦に並べる。
///
/// 「覚えた」率は [AnkiResults]（自己評価の永続化）から全デッキ横断で集計する。
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

    // 「覚えた」率・語数・両導線はすべて実カード（allAnkiDecksProvider）と自己評価
    // （ankiResultsProvider）から全デッキ横断で集計する。DESIGN.html の暗記カード
    // タブは、覚えたバーもランダム10問の 2 導線も、章／デッキの外＝画面上部に置く
    // （全デッキ横断のスコープ）。実カードのロード前は集計 0・導線は無効/非表示。
    final allDecks = ref.watch(allAnkiDecksProvider);
    final results = ref.watch(ankiResultsProvider);
    final loadedDecks = allDecks.valueOrNull ?? const <AnkiDeck>[];

    final allCards = allAnkiSessionCards(loadedDecks);
    final unknownCards = unknownAnkiSessionCards(loadedDecks, results);
    final knownCount = loadedDecks.fold<int>(
      0,
      (sum, d) => sum + knownCountOf(d, results),
    );
    // 分母はロード済みの実カード数。ロード前は base.json のサマリ合計にフォールバック。
    final totalCards = allCards.isNotEmpty
        ? allCards.length
        : decks.fold<int>(0, (sum, d) => sum + (d.cardCount ?? 0));
    final knownFraction = totalCards == 0 ? 0.0 : knownCount / totalCards;

    return ContentMaxWidth(
      child: ListView(
        padding: const EdgeInsets.symmetric(
          horizontal: AppLayout.screenMargin,
          vertical: 12,
        ),
        children: [
          _KnownProgressCard(fraction: knownFraction),
          const SizedBox(height: 12),
          // 主導線: 覚えていないカードから10問（対象0なら非表示）。
          if (unknownCards.isNotEmpty) ...[
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: () => _startSession(
                  context,
                  unknownCards,
                  '覚えていないカードから10問',
                ),
                icon: const Icon(Icons.shuffle_rounded, size: 18),
                label: const Text('覚えていないカードから10問'),
              ),
            ),
            const SizedBox(height: 10),
          ],
          // 副導線: 全カードから10問（secondary。ロード前は無効）。
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: allCards.isEmpty
                  ? null
                  : () => _startSession(context, allCards, '全カードから10問'),
              icon: const Icon(Icons.shuffle_rounded, size: 18),
              label: const Text('全カードから10問'),
            ),
          ),
          const SizedBox(height: 16),
          // 章ヘッダー相当。右端は覚えた語数「覚えた / 総語数」（DESIGN.html「32 / 58」）。
          VideoSectionHeader(title: 'デッキ', trailing: '$knownCount / $totalCards'),
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

  /// 渡されたカードをシャッフルして 10 枚（総数が 10 未満なら全部）出題する。
  void _startSession(
    BuildContext context,
    List<AnkiSessionCard> cards,
    String title,
  ) {
    final shuffled = List<AnkiSessionCard>.of(cards)..shuffle();
    final picked = shuffled.take(math.min(10, shuffled.length)).toList();
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => AnkiStudyScreen(cards: picked, title: title),
      ),
    );
  }
}

/// 「覚えた」率カード（DESIGN.html 暗記カードタブ本文先頭の `.card` 内 `.pg-row`）。
///
/// ラベル「覚えた」＋ primary100 トラック／primary600 フィルのバー＋パーセント。
/// フィルは [AppMotion.slow] で伸びる（達成感の演出）。`heightFactor: 1` を付けて
/// フィルが高さ0に潰れないようにする（QuizTopBar / ExerciseSummaryCard と同じ流儀）。
class _KnownProgressCard extends StatelessWidget {
  const _KnownProgressCard({required this.fraction});

  final double fraction;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final clamped = fraction.clamp(0.0, 1.0);
    final percent = (clamped * 100).round();
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
        child: Row(
          children: [
            SizedBox(
              width: 36,
              child: Text(
                '覚えた',
                style: const TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w700,
                ).copyWith(color: c.textSecondary),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: TweenAnimationBuilder<double>(
                tween: Tween(begin: 0, end: clamped),
                duration: AppMotion.slow,
                curve: AppMotion.easeInOut,
                builder: (context, value, _) => ClipRRect(
                  borderRadius: BorderRadius.circular(AppRadius.full),
                  child: SizedBox(
                    height: 8,
                    child: ColoredBox(
                      color: c.primary100,
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: FractionallySizedBox(
                          widthFactor: value,
                          // heightFactor が無いとフィルは高さ0に潰れて塗りが見えない。
                          heightFactor: 1,
                          child: ColoredBox(color: c.primary600),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 8),
            SizedBox(
              width: 34,
              child: Text(
                '$percent%',
                textAlign: TextAlign.right,
                style: AppTypography.mono(
                  const TextStyle(fontSize: 10, fontWeight: FontWeight.w700),
                ).copyWith(color: c.textPrimary),
              ),
            ),
          ],
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
