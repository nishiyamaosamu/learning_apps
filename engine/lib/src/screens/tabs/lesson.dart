import 'dart:async';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_models.dart' as models;
import '../../content/content_providers.dart';
import '../../settings/audio_settings.dart';
import 'widgets/lesson_contents.dart';
import 'widgets/quiz_controller.dart';

/// レッスン内容。contents/lessons/{id}.json を都度ロードして再生する。
///
/// docs/LESSON.md の構造に従い、コンテンツページ（content）を縦スワイプで
/// 1ページずつ表示する。クイズページ（quiz）はスワイプ feed には含めず、
/// コンテンツ末尾の「確認問題に挑戦！」ボタンから別画面（[_QuizScreen]）で
/// 出題する。
class Lesson extends ConsumerWidget {
  const Lesson({super.key, required this.id, required this.title});

  final String id;
  final String title;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lesson = ref.watch(lessonProvider(id));
    final basePath = ref.watch(appConfigProvider).contentBasePath;

    return lesson.when(
      data: (l) => _LessonPlayer(lesson: l, assetBasePath: basePath),
      loading: () =>
          const Scaffold(body: Center(child: CircularProgressIndicator())),
      error: (e, _) => Scaffold(body: Center(child: Text('読み込みに失敗しました\n$e'))),
    );
  }
}

/// コンテンツページの縦スワイプ再生と音声をまとめて管理する本体。
///
/// ページ間は縦スワイプ（上＝次／下＝前）で1ページずつ移動する。クイズは
/// この feed には含めず、最終ページの「確認問題に挑戦！」ボタンで別画面へ遷移する。
class _LessonPlayer extends ConsumerStatefulWidget {
  const _LessonPlayer({required this.lesson, required this.assetBasePath});

  final models.Lesson lesson;
  final String assetBasePath;

  @override
  ConsumerState<_LessonPlayer> createState() => _LessonPlayerState();
}

class _LessonPlayerState extends ConsumerState<_LessonPlayer> {
  /// ページのナレーション音声を1つだけ再生するプレイヤー。
  final _audio = AudioPlayer()..audioCache = AudioCache(prefix: '');

  /// 縦スワイプのページャ。
  final _controller = PageController();

  /// 音声の自然終了を検知する購読（次へ促すヒント表示に使う）。
  StreamSubscription<void>? _completeSub;

  /// 音声が止まっていて次へ促し中であることを示すヒントを表示するか。
  bool _showHint = false;

  /// 現在のページ番号。`contentPages.length` は完了（CTA）ページを指す。
  int _pageIndex = 0;

  /// スワイプ feed に並べるコンテンツページ。
  List<models.ContentPage> get _contentPages => widget.lesson.pages;

  /// 確認問題画面で出題するクイズ。
  List<models.LessonQuiz> get _quizzes => widget.lesson.quizzes;

  bool get _onDone => _pageIndex >= _contentPages.length;

  @override
  void initState() {
    super.initState();
    // 音声が最後まで再生されたら、次へ進むスワイプを促すヒントを表示する。
    _completeSub = _audio.onPlayerComplete.listen((_) {
      if (mounted) setState(() => _showHint = true);
    });
    // 初回フレーム後に先頭ページの音声を自動再生する。
    WidgetsBinding.instance.addPostFrameCallback((_) => _playSetupAudio());
  }

  @override
  void dispose() {
    _completeSub?.cancel();
    _controller.dispose();
    _audio.dispose();
    super.dispose();
  }

  void _playSetupAudio() => _playAudio(_currentAudioUrl());

  String? _currentAudioUrl() {
    if (_onDone) return null;
    return _contentPages[_pageIndex].audioUrl;
  }

  /// 音声を停止し、オンなら指定アセットを現在の倍速で先頭から再生する。
  void _playAudio(String? url) {
    _audio.stop();
    final willPlay = url != null && ref.read(audioEnabledProvider);
    setState(() => _showHint = !willPlay);
    if (!willPlay) return;
    final speed = ref.read(audioSpeedProvider);
    _audio
        .play(AssetSource('${widget.assetBasePath}/$url'))
        .then((_) => _audio.setPlaybackRate(speed))
        .catchError((_) {});
  }

  void _onPageChanged(int index) {
    setState(() => _pageIndex = index);
    _playSetupAudio();
  }

  void _restart() {
    _controller.animateToPage(
      0,
      duration: const Duration(milliseconds: 180),
      curve: Curves.easeOutCubic,
    );
  }

  /// 確認問題画面へ遷移する。確認問題画面で「閉じる」が押された（true が返る）
  /// ときはレッスン本体も閉じて一覧へ戻る。
  Future<void> _startQuiz() async {
    _audio.stop();
    final closed = await Navigator.of(context).push<bool>(
      MaterialPageRoute(
        builder: (_) => _QuizScreen(
          quizzes: _quizzes,
          exercises: widget.lesson.exercises,
          assetBasePath: widget.assetBasePath,
        ),
      ),
    );
    if (!mounted || closed != true) return;
    Navigator.of(context).maybePop();
  }

  @override
  Widget build(BuildContext context) {
    // 音声トグルの変化に追従：オフ→オンで現在音声を再生、オフで停止。
    ref.listen<bool>(audioEnabledProvider, (prev, next) {
      if (next && prev == false) {
        _playAudio(_currentAudioUrl());
      } else if (!next) {
        _audio.stop();
      }
    });
    // 倍速変更を再生中の音声へ即時反映する。
    ref.listen<double>(audioSpeedProvider, (_, next) {
      _audio.setPlaybackRate(next);
    });
    final total = _contentPages.length;
    // 1ページ目は0%、全ページ通過（完了ページ）で100%になるよう計算する。
    final progress = total == 0 ? 0.0 : _pageIndex / total;

    return Scaffold(
      appBar: _LessonAppBar(progress: progress),
      body: Column(
        children: [
          Expanded(
            child: PageView.builder(
              controller: _controller,
              scrollDirection: Axis.vertical,
              // スナップ判定は _SnappyPageScrollPhysics 側で行う（軽いスワイプでも
              // ページを送れるよう、標準より緩い判定にする）。
              pageSnapping: false,
              physics: const _SnappyPageScrollPhysics(),
              onPageChanged: _onPageChanged,
              itemCount: _contentPages.length + 1,
              itemBuilder: (context, index) => _buildPage(index),
            ),
          ),
          if (!_onDone) const _AudioFooter(),
        ],
      ),
    );
  }

  Widget _buildPage(int index) {
    if (index >= _contentPages.length) {
      return _ContentDoneView(
        key: const ValueKey('done'),
        hasQuiz: _quizzes.isNotEmpty,
        exercises: widget.lesson.exercises,
        onStartQuiz: _startQuiz,
        onRestart: _restart,
      );
    }
    return _ContentPageView(
      key: ValueKey('content-$index'),
      page: _contentPages[index],
      assetBasePath: widget.assetBasePath,
      showHint: _showHint && index == _pageIndex,
    );
  }
}

/// レッスン本体・確認問題画面で共有する AppBar。
/// 左上に閉じる（×）ボタン、残りの領域を進捗バーにする。
class _LessonAppBar extends StatelessWidget implements PreferredSizeWidget {
  const _LessonAppBar({required this.progress});

  /// 進捗（0.0〜1.0）。
  final double progress;

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: IconButton(
        icon: const Icon(Icons.close),
        onPressed: () => Navigator.of(context).maybePop(),
      ),
      title: ClipRRect(
        borderRadius: BorderRadius.circular(4),
        child: LinearProgressIndicator(
          value: progress.clamp(0.0, 1.0),
          minHeight: 6,
        ),
      ),
    );
  }
}

/// 音声オン/オフ・倍速・AI質問をまとめる角丸フローティングメニュー。
/// コンテンツページの再生中に表示する（クイズは音声を持たないため出さない）。
class _AudioFooter extends ConsumerWidget {
  const _AudioFooter();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final enabled = ref.watch(audioEnabledProvider);
    final speed = ref.watch(audioSpeedProvider);
    final muted = theme.colorScheme.onSurfaceVariant;
    final active = theme.colorScheme.primary;

    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 6, 16, 10),
        child: Center(
          child: Material(
            color: theme.colorScheme.surface,
            elevation: 3,
            shadowColor: Colors.black26,
            borderRadius: BorderRadius.circular(28),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _FooterButton(
                    icon: enabled ? Icons.volume_up : Icons.volume_off,
                    label: enabled ? '音声オン' : '音声オフ',
                    color: enabled ? active : muted,
                    onTap: () =>
                        ref.read(audioEnabledProvider.notifier).toggle(),
                  ),
                  // 倍速は音声オン時のみ操作可能。
                  _FooterButton(
                    icon: Icons.speed,
                    label: '${_formatSpeed(speed)}x',
                    color: enabled ? active : muted,
                    onTap: enabled
                        ? () => ref.read(audioSpeedProvider.notifier).cycle()
                        : null,
                  ),
                  _FooterButton(
                    icon: Icons.auto_awesome,
                    label: 'AI質問',
                    color: muted,
                    onTap: () {},
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  /// 1.0 → "1"、1.25 → "1.25" のように末尾の不要な0を落として表示する。
  String _formatSpeed(double v) {
    final s = v.toStringAsFixed(2);
    return s.replaceAll(RegExp(r'\.?0+$'), '');
  }
}

/// 縦 PageView 用のスナップ物理。軽いスワイプでもページが送られるよう、
/// 標準の [PageScrollPhysics] より判定を緩める。
///
/// 標準は「半ページ以上ドラッグ」または「一定速度以上のフリック」が必要だが、
/// ここでは**弱いフリックでもその方向へ1ページ送る**（[_flingVelocity] を低く設定）。
/// ほぼ静止したリリース時のみ近い方のページへスナップする。
/// PageView 側は `pageSnapping: false` にして本クラスがスナップを担う。
class _SnappyPageScrollPhysics extends ScrollPhysics {
  const _SnappyPageScrollPhysics({super.parent});

  /// この速度（logical px/s）を超えるフリックは、ドラッグ量に関係なくその方向へ
  /// 1ページ送る。標準より低くして軽いスワイプでも反応させる。
  static const double _flingVelocity = 50.0;

  @override
  _SnappyPageScrollPhysics applyTo(ScrollPhysics? ancestor) {
    return _SnappyPageScrollPhysics(parent: buildParent(ancestor));
  }

  // スナップを素早く収束させる硬めのばね（標準は stiffness:100, mass:0.5）。
  @override
  SpringDescription get spring => SpringDescription.withDampingRatio(
    mass: 0.4,
    stiffness: 220,
    ratio: 1.1,
  );

  double _targetPixels(ScrollMetrics position, double velocity) {
    final vp = position.viewportDimension;
    if (vp == 0) return position.pixels;
    final current = position.pixels / vp;
    final base = current.floorToDouble();
    double page;
    if (velocity > _flingVelocity) {
      page = base + 1; // 進む方向の軽いフリック
    } else if (velocity < -_flingVelocity) {
      page = base; // 戻る方向の軽いフリック
    } else {
      page = current.roundToDouble(); // ほぼ静止：近い方へ
    }
    return (page * vp).clamp(position.minScrollExtent, position.maxScrollExtent);
  }

  @override
  Simulation? createBallisticSimulation(
    ScrollMetrics position,
    double velocity,
  ) {
    // 端でのオーバースクロール（戻り）は既定挙動に任せる。
    if ((velocity <= 0.0 && position.pixels <= position.minScrollExtent) ||
        (velocity >= 0.0 && position.pixels >= position.maxScrollExtent)) {
      return super.createBallisticSimulation(position, velocity);
    }
    final tolerance = toleranceFor(position);
    final target = _targetPixels(position, velocity);
    if ((target - position.pixels).abs() < tolerance.distance) {
      return null;
    }
    return ScrollSpringSimulation(
      spring,
      position.pixels,
      target,
      velocity,
      tolerance: tolerance,
    );
  }

  @override
  bool get allowImplicitScrolling => false;
}

/// フローティングメニュー内の1ボタン（アイコン＋ラベル、横並び）。
class _FooterButton extends StatelessWidget {
  const _FooterButton({
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(24),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 20, color: color),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(color: color, fontWeight: FontWeight.w600),
            ),
          ],
        ),
      ),
    );
  }
}

/// コンテンツページ。テキスト＋画像のブロックを縦に積み上げて一度に表示する。
/// ページ移動は本体の縦スワイプで行う（このビューはタップゾーンを持たない）。
class _ContentPageView extends StatelessWidget {
  const _ContentPageView({
    super.key,
    required this.page,
    required this.assetBasePath,
    required this.showHint,
  });

  final models.ContentPage page;
  final String assetBasePath;

  /// 音声が止まり次へ促し中であることを示すヒントを表示するか。
  final bool showHint;

  @override
  Widget build(BuildContext context) {
    final blocks = page.blocks;

    return Stack(
      children: [
        // ブロックを縦に積み上げて表示。内容が短ければ縦中央寄せ、
        // 溢れたらスクロールする。
        LayoutBuilder(
          builder: (context, constraints) => SingleChildScrollView(
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: constraints.maxHeight),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    for (var i = 0; i < blocks.length; i++)
                      Padding(
                        padding: EdgeInsets.only(top: i == 0 ? 0 : 16),
                        child: _ContentBlockView(
                          block: blocks[i],
                          assetBasePath: assetBasePath,
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ),
        ),
        // 音声が止まったら次へのスワイプを促す控えめな記号を下部中央に出す。
        Positioned(
          left: 0,
          right: 0,
          bottom: 12,
          child: Center(child: _SwipeHint(visible: showHint)),
        ),
      ],
    );
  }
}

/// コンテンツページの1ブロック。画像（任意）を上に、本文を下に積む。
class _ContentBlockView extends StatelessWidget {
  const _ContentBlockView({required this.block, required this.assetBasePath});

  final models.ContentBlock block;
  final String assetBasePath;

  @override
  Widget build(BuildContext context) {
    final imageUrl = block.imageUrl;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (imageUrl != null) ...[
          ConstrainedBox(
            constraints: const BoxConstraints(maxHeight: 240),
            child: ContentImage(assetPath: '$assetBasePath/$imageUrl'),
          ),
          if (block.text.isNotEmpty) const SizedBox(height: 12),
        ],
        if (block.text.isNotEmpty) MarkdownText(text: block.text),
      ],
    );
  }
}

/// 音声が止まったときに「上スワイプで次へ」を促す控えめな記号。
///
/// `visible` の間だけゆっくり明滅する。スワイプ操作の邪魔をしないよう
/// [IgnorePointer] で覆い、表示/非表示はフェードで切り替える。
class _SwipeHint extends StatefulWidget {
  const _SwipeHint({required this.visible});

  final bool visible;

  @override
  State<_SwipeHint> createState() => _SwipeHintState();
}

class _SwipeHintState extends State<_SwipeHint>
    with SingleTickerProviderStateMixin {
  late final AnimationController _pulse = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1100),
  )..repeat(reverse: true);

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.onSurfaceVariant;
    return IgnorePointer(
      child: AnimatedOpacity(
        opacity: widget.visible ? 1 : 0,
        duration: const Duration(milliseconds: 250),
        child: FadeTransition(
          // 0.3〜0.6 の薄い明滅にとどめ、目立ちすぎないようにする。
          opacity: Tween(
            begin: 0.3,
            end: 0.6,
          ).animate(CurvedAnimation(parent: _pulse, curve: Curves.easeInOut)),
          child: Icon(Icons.keyboard_arrow_up, size: 26, color: color),
        ),
      ),
    );
  }
}

/// コンテンツを全て読み終えた後に表示する締めのページ。
///
/// 確認問題があれば「確認問題に挑戦！」ボタンを出して [_QuizScreen] へ遷移する。
/// 確認問題が無いレッスンはここが最終ページとなり、演習への参照を表示する。
class _ContentDoneView extends StatelessWidget {
  const _ContentDoneView({
    super.key,
    required this.hasQuiz,
    required this.exercises,
    required this.onStartQuiz,
    required this.onRestart,
  });

  final bool hasQuiz;
  final List<int> exercises;
  final VoidCallback onStartQuiz;
  final VoidCallback onRestart;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              hasQuiz ? Icons.menu_book : Icons.celebration,
              size: 72,
              color: theme.colorScheme.primary,
            ),
            const SizedBox(height: 16),
            Text(
              hasQuiz ? 'コンテンツはここまで！' : '学習完了！',
              style: theme.textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            Text(
              hasQuiz ? '確認問題で理解度をチェックしましょう。' : 'このレッスンのコンテンツを終えました。',
              style: theme.textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
            if (hasQuiz) ...[
              const SizedBox(height: 24),
              FilledButton.icon(
                onPressed: onStartQuiz,
                icon: const Icon(Icons.quiz),
                label: const Text('確認問題に挑戦！'),
                style: FilledButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 14,
                  ),
                ),
              ),
            ] else ...[
              // 確認問題が無いレッスンはここが最終ページ。演習参照と操作を出す。
              if (exercises.isNotEmpty) ...[
                const SizedBox(height: 24),
                _ExerciseLinks(exercises: exercises),
              ],
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  OutlinedButton.icon(
                    onPressed: onRestart,
                    icon: const Icon(Icons.replay),
                    label: const Text('最初から'),
                  ),
                  const SizedBox(width: 12),
                  FilledButton(
                    onPressed: () => Navigator.of(context).maybePop(),
                    child: const Text('レッスンを閉じる'),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// 確認問題（クイズ）を出題する別画面。
///
/// クイズは縦スワイプ feed と分離し、ここでは本文内のボタン（戻る／回答する／
/// 次へ）で1問ずつ進める。未回答のまま次へは進めない（せき止め）。
/// クイズは音声を持たないため、音声フッターは表示しない。
class _QuizScreen extends StatefulWidget {
  const _QuizScreen({
    required this.quizzes,
    required this.exercises,
    required this.assetBasePath,
  });

  final List<models.LessonQuiz> quizzes;
  final List<int> exercises;
  final String assetBasePath;

  @override
  State<_QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<_QuizScreen> {
  /// 現在の設問番号。`quizzes.length` は完了ページを指す。
  int _index = 0;

  List<models.LessonQuiz> get _quizzes => widget.quizzes;

  bool get _onCompletion => _index >= _quizzes.length;

  void _go(int index) => setState(() => _index = index);

  void _advance() => _go(_index + 1);
  void _back() {
    if (_index == 0) return;
    _go(_index - 1);
  }

  @override
  Widget build(BuildContext context) {
    final total = _quizzes.length;
    final progress = total == 0 ? 0.0 : _index / total;

    return Scaffold(
      appBar: _LessonAppBar(progress: progress),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 200),
        child: _onCompletion
            ? _QuizCompletionView(
                key: const ValueKey('quiz-done'),
                exercises: widget.exercises,
              )
            : _QuizPage(
                // 設問が切り替わるたび State を作り直して回答をリセットする。
                key: ValueKey('quiz-$_index'),
                quiz: _quizzes[_index],
                assetBasePath: widget.assetBasePath,
                canGoBack: _index > 0,
                onAdvance: _advance,
                onBack: _back,
              ),
      ),
    );
  }
}

/// 1問のクイズ。設問（＋任意の画像）と回答UI、本文内のナビボタンを表示する。
///
/// 「回答する」→「次へ」（未回答では「次へ」を出さない＝進めない）、「戻る」は常時可。
/// 回答状態は自身の [QuizController] で保持する。
class _QuizPage extends StatefulWidget {
  const _QuizPage({
    super.key,
    required this.quiz,
    required this.assetBasePath,
    required this.canGoBack,
    required this.onAdvance,
    required this.onBack,
  });

  final models.LessonQuiz quiz;
  final String assetBasePath;
  final bool canGoBack;
  final VoidCallback onAdvance;
  final VoidCallback onBack;

  @override
  State<_QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<_QuizPage> {
  late final QuizController _controller = QuizController(widget.quiz)
    ..addListener(_onChanged);

  void _onChanged() => setState(() {});

  @override
  void dispose() {
    _controller.removeListener(_onChanged);
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // 画像と回答UIを1回の型分岐で取り出す。
    // 単一選択は設問文を MarkdownText で表示し、穴埋めは設問を内部で描画する。
    final (String? imageUrl, Widget answer) = switch (widget.quiz) {
      final models.QuizMultipleChoice q => (
        q.imageUrl,
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            MarkdownText(text: q.question),
            const SizedBox(height: 12),
            MultipleChoiceQuiz(quiz: q, controller: _controller),
          ],
        ),
      ),
      final models.QuizFillInTheBlank q => (
        q.imageUrl,
        FillInTheBlankQuiz(quiz: q, controller: _controller),
      ),
    };

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (imageUrl != null) ...[
            ConstrainedBox(
              constraints: const BoxConstraints(maxHeight: 240),
              child: ContentImage(
                assetPath: '${widget.assetBasePath}/$imageUrl',
              ),
            ),
            const SizedBox(height: 16),
          ],
          answer,
          const SizedBox(height: 24),
          _buildNav(),
        ],
      ),
    );
  }

  Widget _buildNav() {
    final submitted = _controller.submitted;
    return Row(
      children: [
        if (widget.canGoBack)
          TextButton(onPressed: widget.onBack, child: const Text('戻る')),
        const Spacer(),
        if (!submitted)
          FilledButton(
            onPressed: _controller.canSubmit ? _controller.submit : null,
            child: const Text('回答する'),
          )
        else
          FilledButton(onPressed: widget.onAdvance, child: const Text('次へ')),
      ],
    );
  }
}

/// 確認問題をすべて終えた後に表示する完了ページ。
class _QuizCompletionView extends StatelessWidget {
  const _QuizCompletionView({super.key, required this.exercises});

  final List<int> exercises;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.celebration, size: 72, color: theme.colorScheme.primary),
            const SizedBox(height: 16),
            Text('お疲れさまでした！', style: theme.textTheme.headlineSmall),
            const SizedBox(height: 8),
            Text(
              '確認問題はここまでです。',
              style: theme.textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
            if (exercises.isNotEmpty) ...[
              const SizedBox(height: 24),
              _ExerciseLinks(exercises: exercises),
            ],
            const SizedBox(height: 24),
            FilledButton(
              // 確認問題画面とレッスン本体の両方を閉じて一覧へ戻る
              // （_LessonPlayer._startQuiz が true を受けて本体を pop する）。
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('閉じる'),
            ),
          ],
        ),
      ),
    );
  }
}

/// 完了ページで表示する本番演習（exercises）への参照リンク一覧。
class _ExerciseLinks extends StatelessWidget {
  const _ExerciseLinks({required this.exercises});

  final List<int> exercises;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('演習に挑戦', style: theme.textTheme.titleMedium),
        const SizedBox(height: 8),
        for (final id in exercises)
          Card(
            child: ListTile(
              leading: const Icon(Icons.assignment),
              title: Text('演習 $id'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {},
            ),
          ),
      ],
    );
  }
}
