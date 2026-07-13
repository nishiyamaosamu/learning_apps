import 'package:flutter/material.dart';

import '../../content/content_models.dart';
import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_haptics.dart';
import '../../design/app_typography.dart';
import '../content/markdown_text.dart';
import '../layout/content_max_width.dart';
import 'choice_tile.dart';
import 'completion_ring.dart';
import 'fill_blank_board.dart';
import 'quiz_controller.dart';
import 'quiz_top_bar.dart';
import 'result_banner.dart';

/// 選択肢の並び順（1 始まり）に対応する「アイウエ…」ラベル。最大 10 択。
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

String _kana(int index) =>
    index < _kanaLabels.length ? _kanaLabels[index] : '${index + 1}';

/// [LessonQuiz] の列を出題する汎用クイズセッション画面。
///
/// 動画の確認クイズなどから [Navigator.push] して使う。1 問ずつ「出題 → 回答する →
/// リビール → 次の問題へ」で進め、全問終了で完了ビュー（[CompletionRing]＋前向きな
/// メッセージ）を表示する。
///
/// - multipleChoice: [ChoiceTile] 列（リビール前は選択切替可、リビール後は正誤＋減光）。
/// - fillInTheBlank: [FillBlankBoard]（タップ配置穴埋め）。
/// - 正解時のみ [AppHaptics.correct]。不正解には何もしない（責めない方針）。
///
/// なお [LessonQuiz] は解説（explanation）フィールドを持たないため、この画面では
/// 解説カードは表示しない（解説付きの本番演習は別画面が担う）。
class QuizSessionScreen extends StatefulWidget {
  const QuizSessionScreen({
    super.key,
    required this.quizzes,
    required this.title,
    this.onFinished,
  });

  final List<LessonQuiz> quizzes;

  /// 画面タイトル（セマンティクス用途。上部は QuizTopBar のため直接は表示しない）。
  final String title;

  /// 全問終了して完了ビューに到達したときに一度だけ呼ばれる。
  final VoidCallback? onFinished;

  @override
  State<QuizSessionScreen> createState() => _QuizSessionScreenState();
}

class _QuizSessionScreenState extends State<QuizSessionScreen> {
  int _index = 0;
  int _score = 0;
  bool _revealed = false;
  QuizController? _controller;

  List<LessonQuiz> get _quizzes => widget.quizzes;
  int get _total => _quizzes.length;
  bool get _onCompletion => _index >= _total;
  bool get _isLast => _index == _total - 1;

  @override
  void initState() {
    super.initState();
    if (!_onCompletion) _bind(QuizController(_quizzes[_index]));
    if (_total == 0) {
      // 空セッションは即完了扱い。
      WidgetsBinding.instance.addPostFrameCallback((_) => widget.onFinished?.call());
    }
  }

  void _bind(QuizController controller) {
    _controller = controller..addListener(_onChanged);
  }

  void _onChanged() => setState(() {});

  @override
  void dispose() {
    _controller?.removeListener(_onChanged);
    _controller?.dispose();
    super.dispose();
  }

  /// 現在の設問の正誤。
  bool _isCurrentCorrect() {
    final controller = _controller!;
    final quiz = _quizzes[_index];
    switch (quiz) {
      case QuizMultipleChoice():
        return controller.choice == quiz.correctOptionIndex;
      case QuizFillInTheBlank():
        for (var i = 0; i < quiz.correctOptionIndices.length; i++) {
          if (controller.blanks[i] != quiz.correctOptionIndices[i]) {
            return false;
          }
        }
        return true;
    }
  }

  /// 「回答する」→ リビール。正解のみハプティクス。
  void _reveal() {
    final controller = _controller!;
    if (!controller.canSubmit) return;
    controller.submit();
    if (_isCurrentCorrect()) {
      _score++;
      AppHaptics.correct();
    }
    setState(() => _revealed = true);
  }

  /// 次の設問（または完了ビュー）へ。
  void _next() {
    _controller?.removeListener(_onChanged);
    _controller?.dispose();
    _controller = null;
    setState(() {
      _index++;
      _revealed = false;
      if (!_onCompletion) {
        _bind(QuizController(_quizzes[_index]));
      }
    });
    if (_onCompletion) widget.onFinished?.call();
  }

  void _close() => Navigator.of(context).maybePop();

  /// 完了画面の「もう一度」。同じ設問セットを最初からやり直す。
  void _restart() {
    _controller?.removeListener(_onChanged);
    _controller?.dispose();
    _controller = null;
    setState(() {
      _index = 0;
      _score = 0;
      _revealed = false;
      if (_total > 0) _bind(QuizController(_quizzes[_index]));
    });
  }

  /// 完了画面の「一覧に戻る」。本画面は動画視聴ページの上に imperative push
  /// されているため、maybePop だけでは動画視聴ページに戻ってしまう。ルート
  /// （タブシェル）まで一気に pop して動画講座タブの一覧を見せる。
  void _backToList() => Navigator.of(context).popUntil((route) => route.isFirst);

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Scaffold(
      backgroundColor: c.bg,
      body: SafeArea(
        child: Column(
          children: [
            if (_onCompletion)
              // 完了ビューは右端に閉じるのみ。
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
              child: _onCompletion ? _buildCompletion(c) : _buildQuestion(c),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuestion(AppColors c) {
    final controller = _controller!;
    final quiz = _quizzes[_index];

    return ContentMaxWidth(
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppLayout.screenMargin,
        ),
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(vertical: 14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    if (_revealed) ...[
                      ResultBanner(correct: _isCurrentCorrect()),
                      const SizedBox(height: 14),
                    ],
                    _buildQuestionBody(c, quiz, controller),
                  ],
                ),
              ),
            ),
            _buildCta(controller),
            const SizedBox(height: 14),
          ],
        ),
      ),
    );
  }

  Widget _buildQuestionBody(
    AppColors c,
    LessonQuiz quiz,
    QuizController controller,
  ) {
    switch (quiz) {
      case QuizMultipleChoice():
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            MarkdownText(text: quiz.question),
            const SizedBox(height: 14),
            for (var i = 0; i < quiz.options.length; i++)
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: ChoiceTile(
                  label: _kana(i),
                  state: _choiceState(quiz, controller, i),
                  onTap: _revealed ? null : () => controller.selectChoice(i),
                  child: Text(quiz.options[i]),
                ),
              ),
          ],
        );
      case QuizFillInTheBlank():
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              '空欄をうめて文を完成させよう',
              style: AppTypography.bodyStrong.copyWith(color: c.textPrimary),
            ),
            const SizedBox(height: 16),
            FillBlankBoard(
              question: quiz.question,
              options: quiz.options,
              controller: controller,
              revealed: _revealed,
            ),
          ],
        );
    }
  }

  ChoiceTileState _choiceState(
    QuizMultipleChoice quiz,
    QuizController controller,
    int i,
  ) {
    if (!_revealed) {
      return controller.choice == i
          ? ChoiceTileState.selected
          : ChoiceTileState.idle;
    }
    if (i == quiz.correctOptionIndex) return ChoiceTileState.correct;
    if (i == controller.choice) return ChoiceTileState.incorrect;
    return ChoiceTileState.dimmed;
  }

  Widget _buildCta(QuizController controller) {
    if (!_revealed) {
      return SizedBox(
        width: double.infinity,
        child: FilledButton(
          onPressed: controller.canSubmit ? _reveal : null,
          child: const Text('回答する'),
        ),
      );
    }
    return SizedBox(
      width: double.infinity,
      child: FilledButton(
        onPressed: _next,
        child: Text(_isLast ? '結果を見る' : '次の問題へ'),
      ),
    );
  }

  Widget _buildCompletion(AppColors c) {
    final rate = _total == 0 ? 0.0 : _score / _total;
    final message = rate >= 1.0
        ? 'パーフェクト！'
        : rate >= 0.8
        ? 'いい調子！'
        : rate >= 0.5
        ? 'もう少し！'
        : 'くり返しが力になる';

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
                    CompletionRing(score: _score, total: _total),
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
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: Column(
                children: [
                  if (_total > 0) ...[
                    SizedBox(
                      width: double.infinity,
                      child: FilledButton.icon(
                        icon: const Icon(Icons.replay, size: 18),
                        label: const Text('もう一度'),
                        onPressed: _restart,
                      ),
                    ),
                    const SizedBox(height: 8),
                  ],
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton(
                      onPressed: _backToList,
                      child: const Text('一覧に戻る'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
