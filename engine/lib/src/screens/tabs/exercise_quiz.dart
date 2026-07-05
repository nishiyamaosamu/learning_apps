import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_models.dart';
import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_haptics.dart';
import '../../settings/exercise_results.dart';
import '../../settings/review_queue.dart';
import '../../widgets/content/content_image.dart';
import '../../widgets/content/markdown_text.dart';
import '../../widgets/layout/content_max_width.dart';
import '../../widgets/quiz/choice_tile.dart';
import '../../widgets/quiz/completion_ring.dart';
import '../../widgets/quiz/explanation_card.dart';
import '../../widgets/quiz/quiz_top_bar.dart';
import '../../widgets/quiz/result_banner.dart';
import '../../widgets/quiz/review_chip.dart';

/// 選択肢ID（1始まり）と「アイウエ…」の対応。最大10択（ア〜コ）まで対応する。
const List<String> _kanaLabels = [
  'ア',
  'イ',
  'ウ',
  'エ',
  'オ',
  'カ',
  'キ',
  'ク',
  'ケ',
  'コ',
];

String _kana(int optionId) => (optionId >= 1 && optionId <= _kanaLabels.length)
    ? _kanaLabels[optionId - 1]
    : '$optionId';

/// 演習プレイヤーの回答セッション状態。
///
/// 各問は「選択（[select]、リビール前は何度でも変更可）→ 確定（[confirm]、リビール
/// して結果を確定）」の2段階で進める。確定後は選択を変更できない。完了後は正答率・
/// 誤答リストを集計できる。
class ExerciseQuizController extends ChangeNotifier {
  ExerciseQuizController(this.questions)
    : selected = List<int?>.filled(questions.length, null),
      _revealed = List<bool>.filled(questions.length, false);

  final List<ExerciseQuestion> questions;

  /// 各問で選んだ選択肢ID（未選択は null）。リビール前は変更可能。
  final List<int?> selected;

  /// 各問がリビール（確定）済みか。
  final List<bool> _revealed;

  /// 現在の設問番号。`questions.length` は完了ページを指す。
  int currentIndex = 0;

  int get total => questions.length;

  bool get onCompletion => currentIndex >= total;

  ExerciseQuestion get current => questions[currentIndex];

  /// 現在の設問で選択肢を選んでいるか。
  bool get isCurrentSelected => !onCompletion && selected[currentIndex] != null;

  /// 現在の設問がリビール（確定）済みか。
  bool get isCurrentRevealed => !onCompletion && _revealed[currentIndex];

  bool get isLastQuestion => currentIndex == total - 1;

  /// 現在の設問で選んだ選択肢ID（未選択は null）。
  int? get currentSelectedId => onCompletion ? null : selected[currentIndex];

  /// 現在の選択が正解か（リビール後に意味を持つ）。
  bool get isCurrentCorrect =>
      !onCompletion && selected[currentIndex] == current.answerOptionId;

  /// 選択肢を選ぶ。リビール後・完了後は無視する（何度でも選び直せる）。
  void select(int optionId) {
    if (onCompletion || _revealed[currentIndex]) return;
    selected[currentIndex] = optionId;
    notifyListeners();
  }

  /// 現在の選択を確定してリビールする。未選択・確定済み・完了後は無視する。
  void confirm() {
    if (onCompletion ||
        _revealed[currentIndex] ||
        selected[currentIndex] == null) {
      return;
    }
    _revealed[currentIndex] = true;
    notifyListeners();
  }

  /// 次の設問（または完了ページ）へ進む。確定前は無視する。
  void next() {
    if (onCompletion || !_revealed[currentIndex]) return;
    currentIndex++;
    notifyListeners();
  }

  int get correctCount {
    var n = 0;
    for (var i = 0; i < questions.length; i++) {
      if (selected[i] == questions[i].answerOptionId) n++;
    }
    return n;
  }

  /// 不正解（未回答含む）だった設問。
  List<ExerciseQuestion> get wrongQuestions => [
    for (var i = 0; i < questions.length; i++)
      if (selected[i] != questions[i].answerOptionId) questions[i],
  ];
}

/// 演習プレイヤー（フルスクリーン）。チャンクの問題を1問ずつ出題する。
///
/// 各問の正誤は**確定（confirm）時**に、その qid の結果を [ExerciseResults] へ記録する
/// （チャンク・復習いずれの run でも記録し、最新の結果で上書きする）。
class ExerciseQuizScreen extends ConsumerStatefulWidget {
  const ExerciseQuizScreen({
    super.key,
    required this.questions,
    required this.assetBasePath,
    required this.title,
  });

  final List<ExerciseQuestion> questions;
  final String assetBasePath;
  final String title;

  @override
  ConsumerState<ExerciseQuizScreen> createState() => _ExerciseQuizScreenState();
}

class _ExerciseQuizScreenState extends ConsumerState<ExerciseQuizScreen> {
  late final ExerciseQuizController _controller = ExerciseQuizController(
    widget.questions,
  )..addListener(_onChanged);
  final ScrollController _scroll = ScrollController();

  void _onChanged() => setState(() {});

  @override
  void dispose() {
    _controller.removeListener(_onChanged);
    _controller.dispose();
    _scroll.dispose();
    super.dispose();
  }

  /// 選択を確定してリビールする。確定時にこの問の正誤を記録し、正解ならハプティクス。
  void _onConfirm() {
    final question = _controller.current;
    _controller.confirm();
    if (!_controller.isCurrentRevealed) return;
    final correct = _controller.isCurrentCorrect;
    ref
        .read(exerciseResultsProvider.notifier)
        .recordAll({question.qid: correct});
    // 要復習キューへ連動（不正解=自動追加 / 正解=解消）。
    ref
        .read(reviewQueueProvider.notifier)
        .syncFromResults({question.qid: correct});
    if (correct) AppHaptics.correct();
    _scrollToTop();
  }

  /// 次の設問へ進み、スクロールを先頭に戻す。
  void _onNext() {
    _controller.next();
    _scrollToTop();
  }

  void _scrollToTop() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scroll.hasClients) _scroll.jumpTo(0);
    });
  }

  void _close() => Navigator.of(context).maybePop();

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final onCompletion = _controller.onCompletion;

    return Scaffold(
      backgroundColor: c.bg,
      body: SafeArea(
        child: Column(
          children: [
            if (onCompletion)
              // 完了ビューは右端に閉じるボタンのみ。
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
                current: _controller.currentIndex + 1,
                total: _controller.total,
                onClose: _close,
              ),
            Expanded(
              child: onCompletion
                  ? _CompletionView(
                      correctCount: _controller.correctCount,
                      total: _controller.total,
                      wrongQuestions: _controller.wrongQuestions,
                      assetBasePath: widget.assetBasePath,
                    )
                  : _QuestionView(
                      key: ValueKey('q-${_controller.currentIndex}'),
                      scroll: _scroll,
                      question: _controller.current,
                      revealed: _controller.isCurrentRevealed,
                      selected: _controller.isCurrentSelected,
                      selectedId: _controller.currentSelectedId,
                      correct: _controller.isCurrentCorrect,
                      assetBasePath: widget.assetBasePath,
                      isLast: _controller.isLastQuestion,
                      onSelect: _controller.select,
                      onConfirm: _onConfirm,
                      onNext: _onNext,
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

/// 1問の表示（問題文＋選択肢＋確定後のバナー・解説＋下部CTA）。
class _QuestionView extends StatelessWidget {
  const _QuestionView({
    super.key,
    required this.scroll,
    required this.question,
    required this.revealed,
    required this.selected,
    required this.selectedId,
    required this.correct,
    required this.assetBasePath,
    required this.isLast,
    required this.onSelect,
    required this.onConfirm,
    required this.onNext,
  });

  final ScrollController scroll;
  final ExerciseQuestion question;
  final bool revealed;
  final bool selected;
  final int? selectedId;
  final bool correct;
  final String assetBasePath;
  final bool isLast;
  final ValueChanged<int> onSelect;
  final VoidCallback onConfirm;
  final VoidCallback onNext;

  @override
  Widget build(BuildContext context) {
    return ContentMaxWidth(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: AppLayout.screenMargin),
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                controller: scroll,
                padding: const EdgeInsets.symmetric(vertical: 14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    if (revealed) ...[
                      ResultBanner(correct: correct),
                      const SizedBox(height: 14),
                    ],
                    // 問題文ブロック。
                    _Blocks(
                      blocks: question.content,
                      assetBasePath: assetBasePath,
                    ),
                    const SizedBox(height: 16),
                    // 選択肢。
                    for (final opt in question.options)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: ChoiceTile(
                          label: _kana(opt.id),
                          state: _choiceState(opt.id),
                          onTap: revealed ? null : () => onSelect(opt.id),
                          child: opt.content.isEmpty
                              ? const SizedBox.shrink()
                              : _Blocks(
                                  blocks: opt.content,
                                  assetBasePath: assetBasePath,
                                ),
                        ),
                      ),
                    // 解説（リビール後・解説がある場合）。
                    if (revealed && question.explanation.isNotEmpty) ...[
                      const SizedBox(height: 6),
                      ExplanationCard(
                        trailing: ReviewChip(qid: question.qid),
                        child: _Blocks(
                          blocks: question.explanation,
                          assetBasePath: assetBasePath,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
            // 下部CTA。
            SizedBox(
              width: double.infinity,
              child: revealed
                  ? FilledButton(
                      onPressed: onNext,
                      child: Text(isLast ? '結果を見る' : '次の問題へ'),
                    )
                  : FilledButton(
                      onPressed: selected ? onConfirm : null,
                      child: const Text('回答する'),
                    ),
            ),
            const SizedBox(height: 14),
          ],
        ),
      ),
    );
  }

  ChoiceTileState _choiceState(int optionId) {
    if (!revealed) {
      return optionId == selectedId
          ? ChoiceTileState.selected
          : ChoiceTileState.idle;
    }
    if (optionId == question.answerOptionId) return ChoiceTileState.correct;
    if (optionId == selectedId) return ChoiceTileState.incorrect;
    return ChoiceTileState.dimmed;
  }
}

/// テキスト/画像ブロックの列を縦に描画する。
class _Blocks extends StatelessWidget {
  const _Blocks({required this.blocks, required this.assetBasePath});

  final List<ExerciseBlock> blocks;
  final String assetBasePath;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (var i = 0; i < blocks.length; i++)
          Padding(
            padding: EdgeInsets.only(top: i == 0 ? 0 : 12),
            child: _block(blocks[i]),
          ),
      ],
    );
  }

  Widget _block(ExerciseBlock block) {
    return switch (block) {
      ExerciseTextBlock(:final text) => MarkdownText(text: text),
      ExerciseImageBlock(:final src) => ConstrainedBox(
        constraints: const BoxConstraints(maxHeight: 280),
        child: ContentImage(assetPath: '$assetBasePath/$src'),
      ),
    };
  }
}

/// 完了ビュー（スコアリング＋前向きメッセージ＋復習/一覧アクション）。
class _CompletionView extends StatelessWidget {
  const _CompletionView({
    required this.correctCount,
    required this.total,
    required this.wrongQuestions,
    required this.assetBasePath,
  });

  final int correctCount;
  final int total;
  final List<ExerciseQuestion> wrongQuestions;
  final String assetBasePath;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final rate = total == 0 ? 0.0 : correctCount / total;
    final wrongCount = wrongQuestions.length;
    final allCorrect = wrongCount == 0;
    final message = rate >= 1.0
        ? 'パーフェクト！'
        : rate >= 0.8
        ? 'いい調子！'
        : rate >= 0.5
        ? 'もう少し！'
        : 'くり返しが力になる';

    return ContentMaxWidth(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: AppLayout.screenMargin),
        child: Column(
          children: [
            Expanded(
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CompletionRing(score: correctCount, total: total),
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
                    if (!allCorrect) ...[
                      const SizedBox(height: 6),
                      // まちがいは責めず、次の行動（要復習）につなげて報告する。
                      Text(
                        'まちがえた$wrongCount問は要復習に追加ずみ',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: c.textSecondary,
                        ),
                      ),
                    ],
                    const SizedBox(height: 20),
                    // stats: 今回の正解率 ＋ 要復習 +n（アンバー）。連続日数は範囲外。
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _CompletionStat(
                          value: '${(rate * 100).round()}',
                          unit: '%',
                          label: '今回の正解率',
                        ),
                        const SizedBox(width: 28),
                        _CompletionStat(
                          value: '+$wrongCount',
                          label: '要復習',
                          amber: true,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            if (!allCorrect) ...[
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  icon: const Icon(Icons.replay, size: 18),
                  label: Text('要復習の$wrongCount問をもう一度'),
                  onPressed: () => Navigator.of(context).pushReplacement(
                    MaterialPageRoute<void>(
                      builder: (_) => ExerciseQuizScreen(
                        questions: wrongQuestions,
                        assetBasePath: assetBasePath,
                        title: 'まちがい直し',
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
            ],
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('一覧に戻る'),
              ),
            ),
            const SizedBox(height: 14),
          ],
        ),
      ),
    );
  }
}

/// 完了サマリーの stat（大きな数値＋小さなラベル）。
///
/// DESIGN.html クイズ完了の `.stats .stat`。[amber] を true にすると要復習系
/// （reviewText）で数値を強調する。既定は textPrimary。
class _CompletionStat extends StatelessWidget {
  const _CompletionStat({
    required this.value,
    required this.label,
    this.unit,
    this.amber = false,
  });

  final String value;
  final String? unit;
  final String label;
  final bool amber;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text.rich(
          TextSpan(
            text: value,
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: amber ? c.reviewText : c.textPrimary,
            ),
            children: [
              if (unit != null)
                TextSpan(
                  text: unit,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: amber ? c.reviewText : c.textPrimary,
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: c.textSecondary,
          ),
        ),
      ],
    );
  }
}
