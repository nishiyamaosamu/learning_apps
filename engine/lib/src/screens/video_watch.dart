import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:video_player/video_player.dart';

import '../content/content_models.dart';
import '../content/content_providers.dart';
import '../design/app_colors.dart';
import '../design/app_dimens.dart';
import '../design/app_typography.dart';
import '../settings/audio_settings.dart';
import '../settings/video_progress.dart';
import '../widgets/layout/content_max_width.dart';
import '../widgets/quiz/quiz_session_screen.dart';
import 'widgets/video_list.dart';
import 'widgets/video_player_view.dart';

/// 動画視聴ページ（DESIGN.html「動画視聴」）。タブシェルから全画面 push される。
///
/// [videoLookupProvider] で章・本体・「次の動画」を引き、[_WatchBody] へ渡す。
/// 実再生（autoplay・倍速・シーク・全画面）は video_player で行う。
class VideoWatchScreen extends ConsumerWidget {
  const VideoWatchScreen({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final c = context.colors;
    final lookup = ref.watch(videoLookupProvider(id));
    return lookup.when(
      data: (data) => _WatchBody(
        chapter: data.chapter,
        item: data.item,
        upNext: data.upNext,
      ),
      loading: () => Scaffold(
        backgroundColor: c.bg,
        body: const Center(child: CircularProgressIndicator()),
      ),
      error: (e, s) {
        debugPrint('Failed to load video $id: $e\n$s');
        return Scaffold(
          backgroundColor: c.bg,
          appBar: AppBar(),
          body: Center(child: Text('動画の読み込みに失敗しました\n$e')),
        );
      },
    );
  }
}

class _WatchBody extends ConsumerStatefulWidget {
  const _WatchBody({
    required this.chapter,
    required this.item,
    required this.upNext,
  });

  final VideoChapter chapter;
  final VideoItem item;
  final List<VideoItem> upNext;

  @override
  ConsumerState<_WatchBody> createState() => _WatchBodyState();
}

class _WatchBodyState extends ConsumerState<_WatchBody>
    with WidgetsBindingObserver {
  VideoPlayerController? _controller;
  bool _initialized = false;
  bool _initFailed = false;

  /// 進捗ストア（keepAlive）。dispose 後に ref を触らないよう initState で
  /// notifier を捕捉し、以後は ref 経由でなくこの参照を使う。
  late final VideoProgress _progress;

  /// 再生中の定期記録タイマー。
  Timer? _saveTimer;

  @override
  void initState() {
    super.initState();
    _progress = ref.read(videoProgressProvider.notifier);
    // 画面を開いた時点で「最後に視聴した動画」を更新する（つづきからヒーロー用）。
    _progress.markOpened(widget.item.id);
    WidgetsBinding.instance.addObserver(this);
    _initController();
  }

  Future<void> _initController() async {
    final basePath = ref.read(appConfigProvider).contentBasePath;
    // 保存済みの再生位置（seek 判定に使う）。視聴済み or ほぼ末尾なら先頭から。
    final savedPositionSec = ref
        .read(videoProgressProvider)
        .positionSecOf(widget.item.id);
    final alreadyWatched =
        ref.read(videoProgressProvider).statusOf(widget.item.id) ==
        VideoWatchStatus.watched;
    final controller = VideoPlayerController.asset(
      '$basePath/${widget.item.asset}',
    );
    _controller = controller;
    try {
      await controller.initialize();
      if (!mounted) return;
      // 保存位置があり、視聴済みでも末尾でもなければそこから再開する。
      final totalSec = controller.value.duration.inSeconds;
      final nearEnd = totalSec > 0 && savedPositionSec >= totalSec - 2;
      if (savedPositionSec > 0 && !alreadyWatched && !nearEnd) {
        await controller.seekTo(Duration(seconds: savedPositionSec));
        if (!mounted) return;
      }
      await controller.setPlaybackSpeed(ref.read(audioSpeedProvider));
      await controller.play();
      if (!mounted) return;
      setState(() => _initialized = true);
      // 数秒間隔で再生位置を記録する（ラフでよい）。
      _saveTimer = Timer.periodic(
        const Duration(seconds: 5),
        (_) => _saveProgress(),
      );
    } catch (e, s) {
      debugPrint('video init failed (${widget.item.asset}): $e\n$s');
      if (mounted) setState(() => _initFailed = true);
    }
  }

  /// 現在の再生位置を進捗ストアへ記録する。dispose 後も安全に呼べるよう、
  /// ref ではなく捕捉済みの [_progress] を使う。
  void _saveProgress() {
    final controller = _controller;
    if (controller == null || !controller.value.isInitialized) return;
    _progress.record(
      id: widget.item.id,
      positionSec: controller.value.position.inSeconds,
      durationSec: widget.item.durationSec,
    );
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.inactive ||
        state == AppLifecycleState.paused) {
      _controller?.pause();
      _saveProgress();
    }
  }

  @override
  void dispose() {
    _saveTimer?.cancel();
    _saveProgress();
    WidgetsBinding.instance.removeObserver(this);
    _controller?.dispose();
    super.dispose();
  }

  /// 同一コントローラを再利用して全画面ページへ。push 前後で画面向き・システム UI
  /// を切り替え、pop 後に必ず縦向き／edgeToEdge へ復元する。
  Future<void> _enterFullscreen() async {
    final controller = _controller;
    if (controller == null || !controller.value.isInitialized) return;
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeLeft,
      DeviceOrientation.landscapeRight,
    ]);
    await SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    if (!mounted) return;
    await Navigator.of(context).push(
      MaterialPageRoute<void>(
        fullscreenDialog: true,
        builder: (_) => FullscreenPlayerPage(controller: controller),
      ),
    );
    await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    await SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
  }

  void _openQuiz() {
    _controller?.pause();
    _saveProgress();
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => QuizSessionScreen(
          quizzes: widget.item.quizzes,
          title: widget.item.title,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final controller = _controller;

    // 倍速設定の変化を再生中コントローラへ反映（全画面チップ操作もここに届く）。
    ref.listen<double>(audioSpeedProvider, (_, next) {
      controller?.setPlaybackSpeed(next);
    });

    return Scaffold(
      backgroundColor: c.bg,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // 戻る行（プレーヤーに重ねず専用ヘッダーに置く）。
            Align(
              alignment: Alignment.centerLeft,
              child: SizedBox(
                width: 48,
                height: 48,
                child: IconButton(
                  icon: const Icon(Icons.arrow_back),
                  color: c.textPrimary,
                  onPressed: () => Navigator.of(context).maybePop(),
                ),
              ),
            ),
            _buildPlayer(c, controller),
            Expanded(
              child: ContentMaxWidth(
                child: ListView(
                  padding: const EdgeInsets.fromLTRB(
                    AppLayout.screenMargin,
                    14,
                    AppLayout.screenMargin,
                    16,
                  ),
                  children: [
                    Text(
                      widget.item.title,
                      style: AppTypography.bodyStrong.copyWith(
                        color: c.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        Icon(
                          Icons.smart_display_rounded,
                          size: 13,
                          color: c.textSecondary,
                        ),
                        const SizedBox(width: 4),
                        Expanded(
                          child: Text(
                            '動画講座 ・ ${widget.chapter.title}',
                            style: AppTypography.caption.copyWith(
                              color: c.textSecondary,
                            ),
                          ),
                        ),
                      ],
                    ),
                    if (widget.item.quizzes.isNotEmpty) ...[
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: FilledButton(
                          onPressed: _openQuiz,
                          child: const Text('確認クイズに進む'),
                        ),
                      ),
                    ],
                    if (widget.upNext.isNotEmpty) ...[
                      const SizedBox(height: 20),
                      const VideoSectionHeader(title: '次の動画'),
                      const SizedBox(height: 8),
                      VideoList(
                        videos: widget.upNext,
                        // 視聴ページ間の遷移は履歴を積まず置き換える。
                        onTapVideo: (v) => context.replace('/videos/${v.id}'),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 16:9 プレーヤー面。初期化中はスピナー、失敗時はメッセージ、完了後は
  /// [VideoPlayerView]（同一コントローラを全画面でも使い回す）。
  Widget _buildPlayer(AppColors c, VideoPlayerController? controller) {
    if (_initFailed) {
      return AspectRatio(
        aspectRatio: 16 / 9,
        child: ColoredBox(
          color: c.bgDark,
          child: const Center(
            child: Icon(Icons.error_outline_rounded, size: 40, color: Colors.white70),
          ),
        ),
      );
    }
    if (!_initialized || controller == null) {
      return AspectRatio(
        aspectRatio: 16 / 9,
        child: ColoredBox(
          color: c.bgDark,
          child: const Center(
            child: CircularProgressIndicator(color: Colors.white),
          ),
        ),
      );
    }
    return VideoPlayerView(
      controller: controller,
      onFullscreenButton: _enterFullscreen,
    );
  }
}
