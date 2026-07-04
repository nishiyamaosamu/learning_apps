import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../content/content_models.dart';
import '../content/content_providers.dart';
import '../design/app_colors.dart';
import '../design/app_dimens.dart';
import '../design/app_haptics.dart';
import '../design/app_motion.dart';
import '../design/app_shadows.dart';
import '../design/app_typography.dart';
import '../widgets/empty_state.dart';
import '../widgets/layout/content_max_width.dart';
import '../widgets/quiz/completion_ring.dart';
import '../widgets/quiz/quiz_top_bar.dart';

/// ルート `/anki/:id` 用のローダー。デッキを [ankiProvider] で読み込み、
/// カードを配列順のまま [AnkiStudyScreen] へ渡す。
///
/// 旧スタブ（`tabs/anki.dart` の一覧 ListView）を置き換える。
class AnkiStudyRoute extends ConsumerWidget {
  const AnkiStudyRoute({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final c = context.colors;
    final deck = ref.watch(ankiProvider(id));
    return deck.when(
      data: (d) => AnkiStudyScreen(
        cards: d.cards,
        title: d.title,
        deckLabel: d.title,
      ),
      loading: () => Scaffold(
        backgroundColor: c.bg,
        body: const Center(child: CircularProgressIndicator()),
      ),
      error: (e, _) => Scaffold(
        backgroundColor: c.bg,
        appBar: AppBar(),
        body: Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}

/// 暗記カードのフリップ学習画面（DESIGN.html「暗記カード 表・裏」）。
///
/// 上部にクイズと同じクローム（[QuizTopBar]）、中央に 1 枚のカードを大きく浮かせ、
/// 表（意味）→ タップで Y 軸フリップ → 裏（用語＋自己評価）で進める。全カードを
/// 1 周したら [CompletionRing] の完了ビューを出す。
///
/// 設計判断:
/// - **集計はセッション内のみで永続化しない**（「覚えた」率の保存や要復習キューへの
///   投入は後回し。docs/DESIGN_TODO.md #3）。
/// - **「まだ」を押したカードは末尾に回さず、シンプルに 1 周だけで完了する**。復習の
///   再出題は上記の永続化とセットで扱うべきで、セッション内の並べ替えだけ入れても
///   学習体験としては中途半端になるため、あえて入れない。
class AnkiStudyScreen extends StatefulWidget {
  const AnkiStudyScreen({
    super.key,
    required this.cards,
    required this.title,
    this.deckLabel,
  });

  /// 出題するカード（配列順に 1 枚ずつ表示する）。
  final List<AnkiCard> cards;

  /// 画面タイトル（セマンティクス用途。上部は [QuizTopBar] のため直接は表示しない）。
  final String title;

  /// カード上端に出すデッキ名（任意）。複数デッキ混在の「全カードから10問」等では
  /// 単一の名前が無いため null を渡す（その場合は上端ラベルを出さない）。
  final String? deckLabel;

  @override
  State<AnkiStudyScreen> createState() => _AnkiStudyScreenState();
}

class _AnkiStudyScreenState extends State<AnkiStudyScreen>
    with SingleTickerProviderStateMixin {
  /// フリップ角の進行（0=表 / 1=裏）。reduce-motion 時は駆動せず、[_showingBack]
  /// だけで面を切り替える（クロスフェード側を使う）。
  late final AnimationController _flip;

  int _index = 0;
  int _known = 0;
  int _later = 0;
  bool _showingBack = false;
  bool _finished = false;

  List<AnkiCard> get _cards => widget.cards;
  int get _total => _cards.length;

  @override
  void initState() {
    super.initState();
    _flip = AnimationController(vsync: this, duration: AppMotion.slow);
  }

  @override
  void dispose() {
    _flip.dispose();
    super.dispose();
  }

  bool get _reduceMotion => MediaQuery.disableAnimationsOf(context);

  /// カードタップ：表⇄裏をフリップ。選択ハプティクスを鳴らす。
  void _flipCard() {
    AppHaptics.selection();
    setState(() => _showingBack = !_showingBack);
    if (_reduceMotion) return;
    if (_showingBack) {
      _flip.forward();
    } else {
      _flip.reverse();
    }
  }

  /// 自己評価。[known] なら「覚えた」、false なら「まだ」。次のカードへ進み、
  /// 最終カードなら完了ビューへ。
  void _evaluate(bool known) {
    if (known) {
      _known++;
    } else {
      _later++;
    }
    if (_index >= _total - 1) {
      setState(() => _finished = true);
      return;
    }
    setState(() {
      _index++;
      _showingBack = false;
    });
    _flip.value = 0;
  }

  void _close() => Navigator.of(context).maybePop();

  @override
  Widget build(BuildContext context) {
    final c = context.colors;

    if (_total == 0) {
      return Scaffold(
        backgroundColor: c.bg,
        appBar: AppBar(),
        body: const EmptyState(
          icon: Icons.style_rounded,
          label: 'カードがありません',
          description: 'このデッキにはまだ暗記カードが登録されていません。',
        ),
      );
    }

    return Scaffold(
      backgroundColor: c.bg,
      body: SafeArea(
        child: Column(
          children: [
            if (_finished)
              // 完了ビューは右端に閉じるのみ（quiz_session と同じ流儀）。
              Align(
                alignment: Alignment.centerRight,
                child: SizedBox(
                  width: 48,
                  height: 48,
                  child: IconButton(
                    icon: const Icon(Icons.close, size: 20),
                    color: c.textSecondary,
                    onPressed: _close,
                  ),
                ),
              )
            else
              QuizTopBar(
                current: _index + 1,
                total: _total,
                onClose: _close,
              ),
            Expanded(
              child: _finished ? _buildCompletion(c) : _buildStudy(c),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStudy(AppColors c) {
    final card = _cards[_index];
    return ContentMaxWidth(
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppLayout.screenMargin,
        ),
        child: Column(
          children: [
            const SizedBox(height: 14),
            Expanded(
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: _flipCard,
                child: _buildFlipCard(c, card),
              ),
            ),
            const SizedBox(height: 14),
            // 自己評価行は表・裏を通じて常にレイアウトを占有し（カード高さを固定）、
            // 裏面でのみ可視・活性にする。
            IgnorePointer(
              ignoring: !_showingBack,
              child: AnimatedOpacity(
                opacity: _showingBack ? 1 : 0,
                duration: AppMotion.fast,
                curve: AppMotion.easeOut,
                child: _buildActions(c),
              ),
            ),
            const SizedBox(height: 18),
          ],
        ),
      ),
    );
  }

  /// 表⇄裏のフリップ表示。reduce-motion 時はクロスフェードに差し替える。
  Widget _buildFlipCard(AppColors c, AnkiCard card) {
    if (_reduceMotion) {
      return AnimatedSwitcher(
        duration: AppMotion.slow,
        child: _showingBack
            ? _CardFace(
                key: const ValueKey('back'),
                colors: c,
                deckLabel: widget.deckLabel,
                child: _backContent(c, card),
              )
            : _CardFace(
                key: const ValueKey('front'),
                colors: c,
                deckLabel: widget.deckLabel,
                child: _frontContent(c, card),
              ),
      );
    }

    return AnimatedBuilder(
      animation: _flip,
      builder: (context, _) {
        final angle = _flip.value * math.pi; // 0 → π
        final showFront = angle <= math.pi / 2;
        final transform = Matrix4.identity()
          ..setEntry(3, 2, 0.001) // 遠近感（perspective）
          ..rotateY(angle);
        return Transform(
          alignment: Alignment.center,
          transform: transform,
          child: showFront
              ? _CardFace(
                  colors: c,
                  deckLabel: widget.deckLabel,
                  child: _frontContent(c, card),
                )
              // 裏面は 180° 追加回転で鏡像を打ち消す。
              : Transform(
                  alignment: Alignment.center,
                  transform: Matrix4.identity()..rotateY(math.pi),
                  child: _CardFace(
                    colors: c,
                    deckLabel: widget.deckLabel,
                    child: _backContent(c, card),
                  ),
                ),
        );
      },
    );
  }

  /// 表（意味を出し、用語を想起させる）。
  Widget _frontContent(AppColors c, AnkiCard card) {
    return Stack(
      children: [
        Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 240),
            child: Text(
              card.back,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                height: 2.0,
                color: c.textPrimary,
              ),
            ),
          ),
        ),
        // 下端ヒント。
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.touch_app_rounded, size: 12, color: c.textMuted),
              const SizedBox(width: 4),
              Text(
                'タップで用語を表示',
                style: AppTypography.micro.copyWith(color: c.textMuted),
              ),
            ],
          ),
        ),
      ],
    );
  }

  /// 裏（用語を大きく、意味を小さく残す）。
  Widget _backContent(AppColors c, AnkiCard card) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 240),
            child: Text(
              card.back,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w600,
                height: 1.8,
                color: c.textSecondary,
              ),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            card.front,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 23,
              fontWeight: FontWeight.w800,
              letterSpacing: 0.69, // .03em @ 23dp
              height: 1.3,
              color: c.textPrimary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActions(AppColors c) {
    return Row(
      children: [
        Expanded(
          child: _SelfEvalButton(
            label: 'まだ',
            icon: Icons.replay_rounded,
            surface: c.reviewSurface,
            border: c.reviewBorder,
            text: c.reviewText,
            iconColor: c.review,
            onTap: () => _evaluate(false),
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: _SelfEvalButton(
            label: '覚えた',
            icon: Icons.check_rounded,
            surface: c.correctSurface,
            border: c.correct,
            text: c.correctText,
            iconColor: c.correct,
            onTap: () => _evaluate(true),
          ),
        ),
      ],
    );
  }

  Widget _buildCompletion(AppColors c) {
    final rate = _total == 0 ? 0.0 : _known / _total;
    final message = rate >= 1.0
        ? '全部覚えた！'
        : rate >= 0.8
        ? 'いい調子！'
        : rate >= 0.5
        ? 'その調子！'
        : 'くり返しが力になる';
    final laterLine = _later > 0
        ? '「まだ」の$_later枚はまた挑戦しよう'
        : '「まだ」は0枚。よくできました！';

    return ContentMaxWidth(
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppLayout.screenMargin,
        ),
        child: Column(
          children: [
            Expanded(
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CompletionRing(
                      score: _known,
                      total: _total,
                      label: '覚えた',
                    ),
                    const SizedBox(height: 16),
                    Text(
                      message,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w800,
                        color: c.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      laterLine,
                      textAlign: TextAlign.center,
                      style: AppTypography.caption.copyWith(
                        color: c.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: _close,
                  child: const Text('一覧に戻る'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// 1 枚のカードの器（DESIGN.html `.anki-card`）。
///
/// xl 角丸・surface 面・float 影・枠なし。上端にデッキ名（任意）、中央に [child]。
/// 表・裏で同じ器を使うことでフリップしてもカード高さが変わらない。
class _CardFace extends StatelessWidget {
  const _CardFace({
    super.key,
    required this.colors,
    required this.child,
    this.deckLabel,
  });

  final AppColors colors;
  final Widget child;
  final String? deckLabel;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: colors.surface,
        borderRadius: BorderRadius.circular(AppRadius.xl),
        boxShadow: AppShadows.float,
      ),
      padding: const EdgeInsets.fromLTRB(16, 26, 16, 26),
      child: Stack(
        children: [
          if (deckLabel != null)
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: Text(
                deckLabel!,
                textAlign: TextAlign.center,
                style: AppTypography.micro.copyWith(color: colors.textMuted),
              ),
            ),
          Positioned.fill(child: child),
        ],
      ),
    );
  }
}

/// 自己評価ボタン（DESIGN.html `.anki-actions .ab`）。高さ 48・角丸 md・12/w800。
class _SelfEvalButton extends StatelessWidget {
  const _SelfEvalButton({
    required this.label,
    required this.icon,
    required this.surface,
    required this.border,
    required this.text,
    required this.iconColor,
    required this.onTap,
  });

  final String label;
  final IconData icon;
  final Color surface;
  final Color border;
  final Color text;
  final Color iconColor;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: surface,
      borderRadius: BorderRadius.circular(AppRadius.md),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppRadius.md),
        child: Container(
          height: 48,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(AppRadius.md),
            border: Border.all(color: border, width: 1.5),
          ),
          alignment: Alignment.center,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, size: 15, color: iconColor),
              const SizedBox(width: 6),
              Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w800,
                  color: text,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
