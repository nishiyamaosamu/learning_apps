import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_models.dart';
import '../../settings/exercise_results.dart';
import 'widgets/lesson_contents.dart';

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
/// 1問ずつ進めながら、各問の選択（option id）を記録する。選択は即時にロックされ、
/// 変更できない。完了後は正答率・誤答リストを集計できる。
class ExerciseQuizController extends ChangeNotifier {
  ExerciseQuizController(this.questions)
    : selected = List<int?>.filled(questions.length, null);

  final List<ExerciseQuestion> questions;

  /// 各問で選んだ選択肢ID（未回答は null）。
  final List<int?> selected;

  /// 現在の設問番号。`questions.length` は完了ページを指す。
  int currentIndex = 0;

  int get total => questions.length;

  bool get onCompletion => currentIndex >= total;

  ExerciseQuestion get current => questions[currentIndex];

  /// 現在の設問が回答済み（ロック済み）か。
  bool get isCurrentLocked => !onCompletion && selected[currentIndex] != null;

  bool get isLastQuestion => currentIndex == total - 1;

  /// 選択肢を回答する。ロック済み・完了後は無視する。
  void answer(int optionId) {
    if (onCompletion || selected[currentIndex] != null) return;
    selected[currentIndex] = optionId;
    notifyListeners();
  }

  /// 次の設問（または完了ページ）へ進む。
  void next() {
    if (onCompletion || !isCurrentLocked) return;
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
/// 完了到達時に、この run の各問の正誤を [ExerciseResults] へまとめて記録する
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
  bool _persisted = false;

  void _onChanged() => setState(() {});

  @override
  void dispose() {
    _controller.removeListener(_onChanged);
    _controller.dispose();
    _scroll.dispose();
    super.dispose();
  }

  /// 回答後、回答エリアが見えるよう末尾へスクロールする。
  void _onAnswer(int optionId) {
    _controller.answer(optionId);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!_scroll.hasClients) return;
      _scroll.animateTo(
        _scroll.position.maxScrollExtent,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    });
  }

  /// 次の設問へ進み、スクロールを先頭に戻す。
  void _onNext() {
    _controller.next();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scroll.hasClients) _scroll.jumpTo(0);
    });
  }

  @override
  Widget build(BuildContext context) {
    final total = _controller.total;
    final onCompletion = _controller.onCompletion;
    final progress = total == 0 ? 1.0 : _controller.currentIndex / total;

    // 完了到達時に1度だけ、この run の各問の正誤をまとめて記録する。
    if (onCompletion && !_persisted) {
      _persisted = true;
      final results = <String, bool>{
        for (var i = 0; i < _controller.questions.length; i++)
          _controller.questions[i].qid:
              _controller.selected[i] ==
              _controller.questions[i].answerOptionId,
      };
      WidgetsBinding.instance.addPostFrameCallback((_) {
        ref.read(exerciseResultsProvider.notifier).recordAll(results);
      });
    }

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            _Header(
              title: widget.title,
              progress: onCompletion ? 1.0 : progress,
              indexLabel: onCompletion
                  ? null
                  : '${_controller.currentIndex + 1} / $total',
            ),
            Expanded(
              child: onCompletion
                  ? _CompletionView(
                      correctCount: _controller.correctCount,
                      total: total,
                      wrongQuestions: _controller.wrongQuestions,
                      assetBasePath: widget.assetBasePath,
                    )
                  : _QuestionView(
                      key: ValueKey('q-${_controller.currentIndex}'),
                      scroll: _scroll,
                      question: _controller.current,
                      locked: _controller.isCurrentLocked,
                      selectedId:
                          _controller.selected[_controller.currentIndex],
                      assetBasePath: widget.assetBasePath,
                      isLast: _controller.isLastQuestion,
                      onAnswer: _onAnswer,
                      onNext: _onNext,
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

/// 上部ヘッダー（× クローズ＋進捗バー＋問番号）。
class _Header extends StatelessWidget {
  const _Header({
    required this.title,
    required this.progress,
    required this.indexLabel,
  });

  final String title;
  final double progress;
  final String? indexLabel;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 4, 16, 8),
      child: Column(
        children: [
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.close),
                onPressed: () => Navigator.of(context).maybePop(),
              ),
              Expanded(
                child: Text(
                  title,
                  style: theme.textTheme.titleMedium,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              if (indexLabel != null)
                Text(indexLabel!, style: theme.textTheme.labelLarge),
            ],
          ),
          const SizedBox(height: 4),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: progress,
              minHeight: 6,
              backgroundColor: theme.colorScheme.surfaceContainerHighest,
            ),
          ),
        ],
      ),
    );
  }
}

/// 1問の表示（問題文＋タップ可能な選択肢＋回答エリア＋次へ）。スクロール可能。
///
/// フッターは持たず、解答は選択肢ブロックのタップで行う。回答後は末尾に
/// 回答エリアと「次へ」を表示する。
class _QuestionView extends StatelessWidget {
  const _QuestionView({
    super.key,
    required this.scroll,
    required this.question,
    required this.locked,
    required this.selectedId,
    required this.assetBasePath,
    required this.isLast,
    required this.onAnswer,
    required this.onNext,
  });

  final ScrollController scroll;
  final ExerciseQuestion question;
  final bool locked;
  final int? selectedId;
  final String assetBasePath;
  final bool isLast;
  final ValueChanged<int> onAnswer;
  final VoidCallback onNext;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SingleChildScrollView(
      controller: scroll,
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // 問題文ブロック。
          _Blocks(blocks: question.content, assetBasePath: assetBasePath),
          const SizedBox(height: 20),
          // 選択肢（タップで即時回答）。
          for (final opt in question.options)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: _OptionRow(
                option: opt,
                state: _optionState(opt.id),
                assetBasePath: assetBasePath,
                onTap: locked ? null : () => onAnswer(opt.id),
              ),
            ),
          // 回答エリア＋次へ（回答後のみ）。
          if (locked) ...[
            const SizedBox(height: 16),
            _AnswerArea(
              question: question,
              correct: selectedId == question.answerOptionId,
              assetBasePath: assetBasePath,
              theme: theme,
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: onNext,
                child: Text(isLast ? '結果を見る' : '次へ'),
              ),
            ),
          ],
        ],
      ),
    );
  }

  _OptionVisualState _optionState(int optionId) {
    if (!locked) return _OptionVisualState.idle;
    if (optionId == question.answerOptionId) return _OptionVisualState.correct;
    if (optionId == selectedId) return _OptionVisualState.wrong;
    return _OptionVisualState.idle;
  }
}

enum _OptionVisualState { idle, correct, wrong }

/// 選択肢1つ（アイウエのラベル＋内容）。タップで回答し、回答後は正誤で色付けする。
class _OptionRow extends StatelessWidget {
  const _OptionRow({
    required this.option,
    required this.state,
    required this.assetBasePath,
    required this.onTap,
  });

  final ExerciseOption option;
  final _OptionVisualState state;
  final String assetBasePath;

  /// タップで回答する。回答済み（ロック）のときは null。
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final (
      Color border,
      Color? bg,
      IconData? icon,
      Color? iconColor,
    ) = switch (state) {
      _OptionVisualState.idle => (theme.dividerColor, null, null, null),
      _OptionVisualState.correct => (
        Colors.green,
        Colors.green.withValues(alpha: 0.1),
        Icons.check_circle,
        Colors.green,
      ),
      _OptionVisualState.wrong => (
        theme.colorScheme.error,
        theme.colorScheme.error.withValues(alpha: 0.1),
        Icons.cancel,
        theme.colorScheme.error,
      ),
    };

    final hasContent = option.content.isNotEmpty;
    final labelColor = onTap == null && state == _OptionVisualState.idle
        ? theme.colorScheme.onSurfaceVariant
        : theme.colorScheme.primary;

    return Material(
      color: bg ?? Colors.transparent,
      borderRadius: BorderRadius.circular(8),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
          decoration: BoxDecoration(
            border: Border.all(color: border),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // アイウエのラベル。
              Container(
                width: 28,
                height: 28,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: labelColor.withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                ),
                child: Text(
                  _kana(option.id),
                  style: theme.textTheme.labelLarge?.copyWith(
                    color: labelColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: hasContent
                    ? _Blocks(
                        blocks: option.content,
                        assetBasePath: assetBasePath,
                      )
                    : const SizedBox.shrink(),
              ),
              if (icon != null) ...[
                const SizedBox(width: 8),
                Icon(icon, size: 20, color: iconColor),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

/// 回答エリア（正解の表示＋解説）。
class _AnswerArea extends StatelessWidget {
  const _AnswerArea({
    required this.question,
    required this.correct,
    required this.assetBasePath,
    required this.theme,
  });

  final ExerciseQuestion question;
  final bool correct;
  final String assetBasePath;
  final ThemeData theme;

  @override
  Widget build(BuildContext context) {
    final accent = correct ? Colors.green : theme.colorScheme.error;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: accent.withValues(alpha: 0.4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                correct ? Icons.check_circle : Icons.cancel,
                color: accent,
                size: 20,
              ),
              const SizedBox(width: 6),
              Text(
                correct ? '正解！' : '不正解',
                style: theme.textTheme.titleSmall?.copyWith(
                  color: accent,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const Spacer(),
              Text(
                '正解：${_kana(question.answerOptionId)}',
                style: theme.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          if (question.explanation.isNotEmpty) ...[
            const Divider(height: 24),
            Text(
              '解説',
              style: theme.textTheme.labelMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            _Blocks(blocks: question.explanation, assetBasePath: assetBasePath),
          ],
        ],
      ),
    );
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

/// 完了ページ（正答率＋アクション）。
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
    final theme = Theme.of(context);
    final rate = total == 0 ? 0 : (correctCount / total * 100).round();
    final allCorrect = wrongQuestions.isEmpty;

    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              allCorrect ? Icons.emoji_events : Icons.flag_circle,
              size: 72,
              color: theme.colorScheme.primary,
            ),
            const SizedBox(height: 16),
            Text('お疲れさまでした！', style: theme.textTheme.headlineSmall),
            const SizedBox(height: 24),
            Text('正答率', style: theme.textTheme.titleMedium),
            const SizedBox(height: 4),
            Text(
              '$rate%',
              style: theme.textTheme.displaySmall?.copyWith(
                color: theme.colorScheme.primary,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              '$correctCount / $total 問正解',
              style: theme.textTheme.bodyLarge,
            ),
            const SizedBox(height: 32),
            if (!allCorrect)
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  icon: const Icon(Icons.replay),
                  label: Text('間違えた問題を復習（${wrongQuestions.length}問）'),
                  onPressed: () => Navigator.of(context).pushReplacement(
                    MaterialPageRoute<void>(
                      builder: (_) => ExerciseQuizScreen(
                        questions: wrongQuestions,
                        assetBasePath: assetBasePath,
                        title: '間違えた問題の復習',
                      ),
                    ),
                  ),
                ),
              ),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('一覧に戻る'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
