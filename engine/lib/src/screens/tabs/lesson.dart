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
/// docs/LESSON.md の構造に従い、`pages` を縦スワイプで1ページずつ表示する。
/// コンテンツページはテキスト＋画像のブロックを積み上げて一度に表示し、
/// ページ単位で1音声を再生する。クイズページは回答UIを伴う。
/// 全ページ通過後に完了ページを表示する。
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

/// ページ送り・音声再生をまとめて管理する本体。
///
/// ページ間は縦スワイプ（上＝次／下＝前）で1ページずつスナップ移動する。
/// クイズページはページャをロックし、ページ内のボタンで進める（未回答は
/// せき止め）。
class _LessonPlayer extends ConsumerStatefulWidget {
  const _LessonPlayer({required this.lesson, required this.assetBasePath});

  final models.Lesson lesson;
  final String assetBasePath;

  @override
  ConsumerState<_LessonPlayer> createState() => _LessonPlayerState();
}

class _LessonPlayerState extends ConsumerState<_LessonPlayer> {
  /// ページ／クイズ設問の音声を1つだけ再生するプレイヤー。
  final _audio = AudioPlayer()..audioCache = AudioCache(prefix: '');

  /// 縦スワイプのページャ。
  final _controller = PageController();

  /// 音声の自然終了を検知する購読（次へ促すヒント表示に使う）。
  StreamSubscription<void>? _completeSub;

  /// 音声が止まっていて次へ促し中であることを示すヒントを表示するか。
  /// 再生中は隠し、再生完了時/音声オフ時に表示する。
  bool _showHint = false;

  /// 現在のページ番号。`pages.length` は完了ページを指す。
  int _pageIndex = 0;

  /// クイズページの入場回数。再入場のたびに増やしてキーを変え、
  /// 回答状態をリセットする（戻る→再入場でリセットする方針）。
  final Map<int, int> _quizEntries = {};

  List<models.LessonPage> get _pages => widget.lesson.pages;

  bool get _onCompletion => _pageIndex >= _pages.length;

  /// 指定インデックスがクイズページか（コンテンツでも完了ページでもない）。
  bool _isQuizPage(int index) =>
      index < _pages.length && _pages[index] is! models.ContentPage;

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

  /// 現在ページの音声を再生する。
  void _playSetupAudio() => _playAudio(_currentAudioUrl());

  String? _currentAudioUrl() {
    if (_onCompletion) return null;
    return switch (_pages[_pageIndex]) {
      models.ContentPage(:final audioUrl) => audioUrl,
      models.QuizMultipleChoicePage(:final audioUrl) => audioUrl,
      models.QuizFillInTheBlankPage(:final audioUrl) => audioUrl,
    };
  }

  /// 音声を停止し、オンなら指定アセットを現在の倍速で先頭から再生する。
  void _playAudio(String? url) {
    _audio.stop();
    final willPlay = url != null && ref.read(audioEnabledProvider);
    // 再生する間はヒントを隠し、鳴らない（音声オフ等）ならすぐ次へ促す。
    setState(() => _showHint = !willPlay);
    if (!willPlay) return;
    final speed = ref.read(audioSpeedProvider);
    _audio
        .play(AssetSource('${widget.assetBasePath}/$url'))
        .then((_) => _audio.setPlaybackRate(speed))
        .catchError((_) {});
  }

  /// スワイプ／ボタンでページが切り替わったときの処理。
  void _onPageChanged(int index) {
    setState(() {
      _pageIndex = index;
      // クイズページへ入場したら回答状態をリセットする。
      if (_isQuizPage(index)) {
        _quizEntries[index] = (_quizEntries[index] ?? 0) + 1;
      }
    });
    _playSetupAudio();
  }

  /// 指定ページへアニメーションで移動する（onPageChanged が状態を更新）。
  void _goToPage(int index) {
    _controller.animateToPage(
      index,
      duration: const Duration(milliseconds: 320),
      curve: Curves.easeInOut,
    );
  }

  /// クイズの「次へ」＝次ページへ。
  void _advance() {
    if (_onCompletion) return;
    _goToPage(_pageIndex + 1);
  }

  /// クイズの「戻る」＝前ページへ。
  void _back() {
    if (_pageIndex == 0) return;
    _goToPage(_pageIndex - 1);
  }

  void _restart() => _goToPage(0);

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
    final enabled = ref.watch(audioEnabledProvider);
    final total = _pages.length;
    // 1ページ目は0%、全ページ通過（完了ページ）で100%になるよう計算する。
    final progress = total == 0 ? 0.0 : _pageIndex / total;

    // クイズページではページャをロックし、ページ内ボタンで進める
    // （未回答のまま次へ進めないせき止め）。
    final lockSwipe = _isQuizPage(_pageIndex);

    return Scaffold(
      appBar: AppBar(
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
      ),
      body: Column(
        children: [
          Expanded(
            child: PageView.builder(
              controller: _controller,
              scrollDirection: Axis.vertical,
              physics: lockSwipe
                  ? const NeverScrollableScrollPhysics()
                  : null,
              onPageChanged: _onPageChanged,
              itemCount: _pages.length + 1,
              itemBuilder: (context, index) => _buildPage(index),
            ),
          ),
          if (!_onCompletion) _buildFooter(enabled),
        ],
      ),
    );
  }

  Widget _buildPage(int index) {
    if (index >= _pages.length) {
      return _CompletionPage(
        key: const ValueKey('completion'),
        exercises: widget.lesson.exercises,
        onRestart: _restart,
      );
    }
    final page = _pages[index];
    return switch (page) {
      models.ContentPage() => _ContentPageView(
        key: ValueKey('content-$index'),
        page: page,
        assetBasePath: widget.assetBasePath,
        showHint: _showHint && index == _pageIndex,
      ),
      _ => _QuizPage(
        // 入場回数をキーに含め、再入場で State を作り直して回答をリセットする。
        key: ValueKey('quiz-$index-${_quizEntries[index] ?? 0}'),
        page: page,
        assetBasePath: widget.assetBasePath,
        canGoBack: index > 0,
        onAdvance: _advance,
        onBack: _back,
      ),
    };
  }

  Widget _buildFooter(bool enabled) {
    final theme = Theme.of(context);
    final speed = ref.watch(audioSpeedProvider);
    final muted = theme.colorScheme.onSurfaceVariant;
    final active = theme.colorScheme.primary;

    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 6, 16, 10),
        child: Center(
          // 角丸フローティングメニュー：音声オン/オフ・倍速・AI質問をまとめる。
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

/// クイズページ。設問（＋任意の画像）と回答UI、本文内のナビボタンを表示する。
///
/// クイズページはページャがロックされるため、ナビは本文内のボタンで行う：
/// 「回答する」→「次へ」（未回答では「次へ」を出さない＝進めない）、「戻る」は常時可。
/// 回答状態は自身の [QuizController] で保持し、再入場では State ごと作り直す。
class _QuizPage extends StatefulWidget {
  const _QuizPage({
    super.key,
    required this.page,
    required this.assetBasePath,
    required this.canGoBack,
    required this.onAdvance,
    required this.onBack,
  });

  final models.LessonPage page;
  final String assetBasePath;
  final bool canGoBack;
  final VoidCallback onAdvance;
  final VoidCallback onBack;

  @override
  State<_QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<_QuizPage> {
  late final QuizController _controller = QuizController(widget.page)
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
    final page = widget.page;
    final (String question, String? imageUrl) = switch (page) {
      models.QuizMultipleChoicePage(:final question, :final imageUrl) => (
        question,
        imageUrl,
      ),
      models.QuizFillInTheBlankPage(:final imageUrl) => ('', imageUrl),
      _ => ('', null),
    };

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (imageUrl != null) ...[
            ConstrainedBox(
              constraints: const BoxConstraints(maxHeight: 240),
              child: ContentImage(assetPath: '${widget.assetBasePath}/$imageUrl'),
            ),
            const SizedBox(height: 16),
          ],
          // 単一選択は設問文を MarkdownText で表示。穴埋めは設問を内部で描画。
          if (page is models.QuizMultipleChoicePage) ...[
            MarkdownText(text: question),
            const SizedBox(height: 12),
            MultipleChoiceQuiz(scene: page, controller: _controller),
          ] else if (page is models.QuizFillInTheBlankPage)
            FillInTheBlankQuiz(scene: page, controller: _controller),
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

/// 全ページ通過後に表示する完了ページ。
class _CompletionPage extends StatelessWidget {
  const _CompletionPage({
    super.key,
    required this.exercises,
    required this.onRestart,
  });

  final List<int> exercises;
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
            Icon(Icons.celebration, size: 72, color: theme.colorScheme.primary),
            const SizedBox(height: 16),
            Text('学習完了！', style: theme.textTheme.headlineSmall),
            const SizedBox(height: 8),
            Text(
              'このレッスンのすべてのページを終えました。',
              style: theme.textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
            if (exercises.isNotEmpty) ...[
              const SizedBox(height: 24),
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
        ),
      ),
    );
  }
}
