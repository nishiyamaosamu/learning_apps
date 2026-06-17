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
/// docs/LESSON.md の構造に従い、`scenes` をシーン単位で再生する。
/// ナレーションシーンはタップで1ステップずつ累積表示し、クイズシーンは
/// 回答UIを伴う。全シーン通過後に完了ページを表示する。
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
      loading: () => const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      ),
      error: (e, _) => Scaffold(
        body: Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}

/// シーン送り・ステップ展開・回答状態・音声再生をまとめて管理する本体。
class _LessonPlayer extends ConsumerStatefulWidget {
  const _LessonPlayer({required this.lesson, required this.assetBasePath});

  final models.Lesson lesson;
  final String assetBasePath;

  @override
  ConsumerState<_LessonPlayer> createState() => _LessonPlayerState();
}

class _LessonPlayerState extends ConsumerState<_LessonPlayer> {
  /// ナレーション/クイズ設問の音声を1つだけ再生するプレイヤー。
  final _audio = AudioPlayer()..audioCache = AudioCache(prefix: '');

  /// 現在のシーン番号。`scenes.length` は完了ページを指す。
  int _sceneIndex = 0;

  /// 現在のナレーションシーンで表示済みのステップ数（1始まり）。
  int _revealed = 1;

  /// 現在がクイズシーンのときの回答状態（それ以外は null）。
  QuizController? _quiz;

  /// シーン遷移アニメの向き（true=進む/横スライド左へ、false=戻る）。
  bool _forward = true;

  List<models.LessonScene> get _scenes => widget.lesson.scenes;

  bool get _onCompletion => _sceneIndex >= _scenes.length;

  @override
  void initState() {
    super.initState();
    _setupSceneState();
    // 初回フレーム後に先頭シーンの音声を自動再生する。
    WidgetsBinding.instance.addPostFrameCallback((_) => _playSetupAudio());
  }

  @override
  void dispose() {
    _quiz?.dispose();
    _audio.dispose();
    super.dispose();
  }

  /// 現在シーンに合わせて表示状態（ステップ数・クイズ）を組み立てる。
  void _setupSceneState() {
    _revealed = 1;
    _quiz?.removeListener(_onQuizChanged);
    _quiz?.dispose();
    _quiz = null;
    if (_onCompletion) return;
    final scene = _scenes[_sceneIndex];
    if (scene is! models.NarrationScene) {
      _quiz = QuizController(scene)..addListener(_onQuizChanged);
    }
  }

  void _onQuizChanged() => setState(() {});

  /// 現在シーンの先頭（または現在ステップ）音声を再生する。
  void _playSetupAudio() => _playAudio(_currentAudioUrl());

  String? _currentAudioUrl() {
    if (_onCompletion) return null;
    final scene = _scenes[_sceneIndex];
    return switch (scene) {
      models.NarrationScene(:final steps) =>
        (_revealed - 1) < steps.length ? steps[_revealed - 1].audioUrl : null,
      models.QuizMultipleChoiceScene(:final audioUrl) => audioUrl,
      models.QuizFillInTheBlankScene(:final audioUrl) => audioUrl,
    };
  }

  /// 音声を停止し、オンなら指定アセットを現在の倍速で先頭から再生する。
  void _playAudio(String? url) {
    _audio.stop();
    if (url == null) return;
    if (!ref.read(audioEnabledProvider)) return;
    final speed = ref.read(audioSpeedProvider);
    _audio
        .play(AssetSource('${widget.assetBasePath}/$url'))
        .then((_) => _audio.setPlaybackRate(speed))
        .catchError((_) {});
  }

  /// 右タップ＝進む。
  void _advance() {
    if (_onCompletion) return;
    final scene = _scenes[_sceneIndex];
    if (scene is models.NarrationScene) {
      if (_revealed < scene.steps.length) {
        setState(() => _revealed++);
        _playAudio(scene.steps[_revealed - 1].audioUrl);
      } else {
        _goToScene(_sceneIndex + 1, forward: true);
      }
    } else {
      // クイズは採点済みのときだけ次シーンへ進める（未回答は無反応）。
      if (_quiz?.submitted ?? false) {
        _goToScene(_sceneIndex + 1, forward: true);
      }
    }
  }

  /// 左タップ＝戻る（シーン単位、先頭ステップにリセット）。
  void _back() {
    if (_sceneIndex == 0) return;
    _goToScene(_sceneIndex - 1, forward: false);
  }

  void _goToScene(int index, {required bool forward}) {
    setState(() {
      _forward = forward;
      _sceneIndex = index;
      _setupSceneState();
    });
    _playSetupAudio();
  }

  void _restart() => _goToScene(0, forward: false);

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
    final total = _scenes.length;
    // 1ページ目は0%、全シーン通過（完了ページ）で100%になるよう計算する。
    final progress = total == 0 ? 0.0 : _sceneIndex / total;

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
            child: AnimatedSwitcher(
              duration: const Duration(milliseconds: 300),
              switchInCurve: Curves.easeOut,
              switchOutCurve: Curves.easeIn,
              transitionBuilder: (child, animation) {
                // 進む時：新ページは右(+1)から中央へ、現ページは中央から左(-1)へ。
                // 戻る時はその左右を反転する。
                final bool incoming = child.key == ValueKey(_sceneIndex);
                // フェード主体。移動はわずかだけ（進む＝右から左）。
                const slide = 0.06;
                final Offset begin;
                if (incoming) {
                  begin = _forward
                      ? const Offset(slide, 0)
                      : const Offset(-slide, 0);
                } else {
                  begin = _forward
                      ? const Offset(-slide, 0)
                      : const Offset(slide, 0);
                }
                return FadeTransition(
                  opacity: animation,
                  child: SlideTransition(
                    position: Tween(begin: begin, end: Offset.zero)
                        .animate(animation),
                    child: child,
                  ),
                );
              },
              child: KeyedSubtree(
                key: ValueKey(_sceneIndex),
                child: _buildSceneArea(),
              ),
            ),
          ),
          if (!_onCompletion) _buildFooter(enabled),
        ],
      ),
    );
  }

  Widget _buildSceneArea() {
    if (_onCompletion) {
      return _CompletionPage(
        exercises: widget.lesson.exercises,
        onRestart: _restart,
      );
    }
    final scene = _scenes[_sceneIndex];
    return switch (scene) {
      models.NarrationScene() => _NarrationView(
          scene: scene,
          revealed: _revealed,
          assetBasePath: widget.assetBasePath,
          onAdvance: _advance,
          onBack: _back,
        ),
      _ => _QuizView(
          scene: scene,
          controller: _quiz!,
          assetBasePath: widget.assetBasePath,
          canGoBack: _sceneIndex > 0,
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

/// ナレーションシーン。画像を上部にピン留めし、ステップを下へ累積表示する。
/// 本文エリアの左30%タップ＝戻る／右70%タップ＝進む。
class _NarrationView extends StatefulWidget {
  const _NarrationView({
    required this.scene,
    required this.revealed,
    required this.assetBasePath,
    required this.onAdvance,
    required this.onBack,
  });

  final models.NarrationScene scene;
  final int revealed;
  final String assetBasePath;
  final VoidCallback onAdvance;
  final VoidCallback onBack;

  @override
  State<_NarrationView> createState() => _NarrationViewState();
}

class _NarrationViewState extends State<_NarrationView> {
  final _scroll = ScrollController();

  @override
  void didUpdateWidget(_NarrationView oldWidget) {
    super.didUpdateWidget(oldWidget);
    // 新ステップ出現時は最新が見える位置まで自動スクロール。
    if (widget.revealed > oldWidget.revealed) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _scrollToBottom());
    }
  }

  void _scrollToBottom() {
    if (!_scroll.hasClients) return;
    _scroll.animateTo(
      _scroll.position.maxScrollExtent,
      duration: const Duration(milliseconds: 280),
      curve: Curves.easeOut,
    );
  }

  @override
  void dispose() {
    _scroll.dispose();
    super.dispose();
  }

  /// このシーンが画像モードか（いずれかの step が画像を持つ＝シーン静的）。
  bool get _hasImage => widget.scene.steps.any((s) => s.imageUrl != null);

  /// 表示中の画像 = 表示済みステップのうち直近で指定された imageUrl。
  String? _effectiveImage() {
    final steps = widget.scene.steps;
    String? image;
    for (var i = 0; i < widget.revealed && i < steps.length; i++) {
      if (steps[i].imageUrl != null) image = steps[i].imageUrl;
    }
    return image;
  }

  @override
  Widget build(BuildContext context) {
    final steps = widget.scene.steps;
    final imageUrl = _effectiveImage();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // 画像モードのシーンは枠を最初から確保（レイアウト判定はシーン静的）。
        // 画像はステップ単位で差し替え可能。切替は左→右のワイプ（リビール）。
        if (_hasImage)
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
            child: SizedBox(
              height: 240,
              child: imageUrl == null
                  ? const SizedBox.shrink()
                  : _StepImage(
                      assetBasePath: widget.assetBasePath,
                      imageUrl: imageUrl,
                    ),
            ),
          ),
        Expanded(
          child: Stack(
            children: [
              // 累積ステップ（縦スクロール）。画像なしシーンは縦中央寄せにし、
              // 内容が増えて溢れたらスクロールする。
              LayoutBuilder(
                builder: (context, constraints) => SingleChildScrollView(
                  controller: _scroll,
                  child: ConstrainedBox(
                    constraints: BoxConstraints(minHeight: constraints.maxHeight),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        mainAxisAlignment: _hasImage
                            ? MainAxisAlignment.start
                            : MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // 全ステップ分の領域を最初から確保（未表示は透明）。
                          // これで表示済みテキストの位置が固定され、ずれない。
                          for (var i = 0; i < steps.length; i++)
                            Padding(
                              key: ValueKey(i),
                              padding: EdgeInsets.only(top: i == 0 ? 0 : 16),
                              child: _StepReveal(
                                visible: i < widget.revealed,
                                child: MarkdownText(text: steps[i].text),
                              ),
                            ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              // タップゾーン（translucent でスクロールと共存：タップは進む/戻る、
              // 縦ドラッグは背面のスクロールへ）。
              Positioned.fill(
                child: Row(
                  children: [
                    Expanded(
                      flex: 3,
                      child: GestureDetector(
                        behavior: HitTestBehavior.translucent,
                        onTap: widget.onBack,
                      ),
                    ),
                    Expanded(
                      flex: 7,
                      child: GestureDetector(
                        behavior: HitTestBehavior.translucent,
                        onTap: widget.onAdvance,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

/// 1ステップの出現制御。`visible` が false の間も領域を確保し（透明）、
/// true になったタイミングでフェードイン＋スライドアップする。
class _StepReveal extends StatelessWidget {
  const _StepReveal({required this.visible, required this.child});

  final bool visible;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return AnimatedSlide(
      offset: visible ? Offset.zero : const Offset(0, 0.15),
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeOut,
      child: AnimatedOpacity(
        opacity: visible ? 1 : 0,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
        child: child,
      ),
    );
  }
}

/// ステップ単位で差し替わる画像。
///
/// 画像が変わると、旧画像を下に敷いたまま新画像を**左→右へワイプ**して
/// 重ね、描き足された部分が左から順に現れるように見せる。
class _StepImage extends StatefulWidget {
  const _StepImage({required this.assetBasePath, required this.imageUrl});

  final String assetBasePath;
  final String imageUrl;

  @override
  State<_StepImage> createState() => _StepImageState();
}

class _StepImageState extends State<_StepImage>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 360),
  );

  /// ワイプ中に下に表示する直前の画像（無ければ null）。
  String? _previous;

  @override
  void initState() {
    super.initState();
    _controller.value = 1; // 初回はワイプせず即表示。
  }

  @override
  void didUpdateWidget(_StepImage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.imageUrl != widget.imageUrl) {
      _previous = oldWidget.imageUrl;
      _controller.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final current =
        SceneImage(assetPath: '${widget.assetBasePath}/${widget.imageUrl}');
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        if (_controller.isCompleted || _previous == null) return current;
        // 固定高さの枠（StackFit.expand）に旧画像を敷き、新画像を左→右へ
        // クリップ展開して重ねる。
        return Stack(
          fit: StackFit.expand,
          children: [
            SceneImage(assetPath: '${widget.assetBasePath}/$_previous'),
            ClipRect(
              clipper: _LeftRevealClipper(_controller.value),
              child: current,
            ),
          ],
        );
      },
    );
  }
}

/// 左端から幅 `t`（0..1）の範囲だけを見せるクリッパ（左→右リビール）。
class _LeftRevealClipper extends CustomClipper<Rect> {
  const _LeftRevealClipper(this.t);

  final double t;

  @override
  Rect getClip(Size size) => Rect.fromLTWH(0, 0, size.width * t, size.height);

  @override
  bool shouldReclip(_LeftRevealClipper oldClipper) => oldClipper.t != t;
}

/// クイズシーン。設問（＋任意の画像）と回答UI、本文内のナビボタンを表示する。
///
/// タップゾーンは選択肢操作と競合するため使わず、「回答する」→「次へ」の
/// ボタンで進める（未回答では「次へ」を出さない＝進めない）。「戻る」は常時可。
class _QuizView extends StatelessWidget {
  const _QuizView({
    required this.scene,
    required this.controller,
    required this.assetBasePath,
    required this.canGoBack,
    required this.onAdvance,
    required this.onBack,
  });

  final models.LessonScene scene;
  final QuizController controller;
  final String assetBasePath;
  final bool canGoBack;
  final VoidCallback onAdvance;
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    final (String question, String? imageUrl) = switch (scene) {
      models.QuizMultipleChoiceScene(:final question, :final imageUrl) =>
        (question, imageUrl),
      models.QuizFillInTheBlankScene(:final imageUrl) => ('', imageUrl),
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
              child: SceneImage(assetPath: '$assetBasePath/$imageUrl'),
            ),
            const SizedBox(height: 16),
          ],
          // 単一選択は設問文を MarkdownText で表示。穴埋めは設問を内部で描画。
          if (scene is models.QuizMultipleChoiceScene) ...[
            MarkdownText(text: question),
            const SizedBox(height: 12),
            MultipleChoiceQuiz(
              scene: scene as models.QuizMultipleChoiceScene,
              controller: controller,
            ),
          ] else if (scene is models.QuizFillInTheBlankScene)
            FillInTheBlankQuiz(
              scene: scene as models.QuizFillInTheBlankScene,
              controller: controller,
            ),
          const SizedBox(height: 24),
          _buildNav(context),
        ],
      ),
    );
  }

  Widget _buildNav(BuildContext context) {
    final submitted = controller.submitted;
    return Row(
      children: [
        if (canGoBack)
          TextButton(onPressed: onBack, child: const Text('戻る')),
        const Spacer(),
        if (!submitted)
          FilledButton(
            onPressed: controller.canSubmit ? controller.submit : null,
            child: const Text('回答する'),
          )
        else
          FilledButton(onPressed: onAdvance, child: const Text('次へ')),
      ],
    );
  }
}

/// 全シーン通過後に表示する完了ページ。
class _CompletionPage extends StatelessWidget {
  const _CompletionPage({required this.exercises, required this.onRestart});

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
              'このレッスンのすべてのシーンを終えました。',
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
