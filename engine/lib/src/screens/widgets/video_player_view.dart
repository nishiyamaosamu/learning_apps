import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:video_player/video_player.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_motion.dart';
import '../../design/app_typography.dart';
import '../../settings/audio_settings.dart';
import 'video_list.dart';

/// 動画プレーヤー面（16:9、DESIGN.html「動画視聴」の `.player`）。
///
/// [controller] は**呼び出し側が所有・破棄する**（このウィジェットは dispose
/// しない）。インライン表示と全画面表示（[FullscreenPlayerPage]）の両方から
/// 同一コントローラを渡して使い回す共通面。
///
/// 倍速チップは [audioSpeedProvider] を直接 watch/read するため、この面が
/// どこ（インライン／全画面）にあってもラベルが同期し、タップで巡回・永続化
/// される。実際の再生速度反映（`setPlaybackSpeed`）はコントローラを所有する
/// 親（`_WatchBody`）の `ref.listen` が担う。
class VideoPlayerView extends ConsumerWidget {
  const VideoPlayerView({
    super.key,
    required this.controller,
    required this.onFullscreenButton,
    this.fullscreen = false,
  });

  final VideoPlayerController controller;

  /// 右下ボタン押下時のコールバック。インラインでは全画面へ、全画面では解除（pop）。
  final VoidCallback onFullscreenButton;

  /// 全画面ページ内での表示か。アイコン（拡大/縮小）と外枠アスペクト比を切り替える。
  final bool fullscreen;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final c = context.colors;
    final speed = ref.watch(audioSpeedProvider);

    final videoAspect =
        controller.value.isInitialized ? controller.value.aspectRatio : 16 / 9;
    // インラインは常に 16:9 の面。全画面は動画本来のアスペクト比で中央に置く。
    final outerAspect = fullscreen ? videoAspect : 16 / 9;

    return AspectRatio(
      aspectRatio: outerAspect,
      child: ColoredBox(
        color: fullscreen ? Colors.black : c.bgDark,
        child: Stack(
          fit: StackFit.expand,
          children: [
            // 動画本体（面に対してレターボックス）。
            Center(
              child: AspectRatio(
                aspectRatio: videoAspect,
                child: VideoPlayer(controller),
              ),
            ),
            // 操作オーバーレイ。position 更新に追従して時刻・再生アイコンを描き替える。
            Positioned.fill(
              child: ValueListenableBuilder<VideoPlayerValue>(
                valueListenable: controller,
                builder: (context, value, _) {
                  return _ControlsOverlay(
                    colors: c,
                    controller: controller,
                    value: value,
                    speedLabel: '$speed×',
                    onCycleSpeed: () =>
                        ref.read(audioSpeedProvider.notifier).cycle(),
                    onFullscreenButton: onFullscreenButton,
                    fullscreen: fullscreen,
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ControlsOverlay extends StatelessWidget {
  const _ControlsOverlay({
    required this.colors,
    required this.controller,
    required this.value,
    required this.speedLabel,
    required this.onCycleSpeed,
    required this.onFullscreenButton,
    required this.fullscreen,
  });

  final AppColors colors;
  final VideoPlayerController controller;
  final VideoPlayerValue value;
  final String speedLabel;
  final VoidCallback onCycleSpeed;
  final VoidCallback onFullscreenButton;
  final bool fullscreen;

  void _togglePlay() {
    if (value.isPlaying) {
      controller.pause();
    } else {
      controller.play();
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = colors;
    final position = value.position.inSeconds;
    final duration = value.duration.inSeconds;
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: _togglePlay,
      child: Stack(
        children: [
          // 中央: 再生/一時停止アイコン（再生中はフェードアウト）。
          Center(
            child: AnimatedOpacity(
              opacity: value.isPlaying ? 0 : 1,
              duration: AppMotion.base,
              curve: AppMotion.easeOut,
              child: Icon(
                value.isPlaying
                    ? Icons.pause_circle_rounded
                    : Icons.play_circle_rounded,
                size: 56,
                color: Colors.white,
              ),
            ),
          ),
          // 左下: 倍速チップ。
          Positioned(
            left: 10,
            bottom: 12,
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: onCycleSpeed,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.16),
                  borderRadius: BorderRadius.circular(AppRadius.full),
                ),
                child: Text(
                  speedLabel,
                  style: AppTypography.mono(AppTypography.caption).copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ),
          ),
          // 右下（全画面ボタンの左）: 現在時刻 / 総時間。
          Positioned(
            right: 50,
            bottom: 15,
            child: Text(
              '${formatDuration(position)} / ${formatDuration(duration)}',
              style: AppTypography.mono(AppTypography.caption).copyWith(
                color: Colors.white,
              ),
            ),
          ),
          // 右下: 全画面ボタン。
          Positioned(
            right: 6,
            bottom: 8,
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: onFullscreenButton,
              child: Icon(
                fullscreen
                    ? Icons.fullscreen_exit_rounded
                    : Icons.fullscreen_rounded,
                size: 24,
                color: Colors.white,
              ),
            ),
          ),
          // 最下部: シークバー（primary800 トラック + primary500 フィル）。
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: VideoProgressIndicator(
              controller,
              allowScrubbing: true,
              padding: EdgeInsets.zero,
              colors: VideoProgressColors(
                playedColor: c.primary500,
                backgroundColor: c.primary800,
                bufferedColor: Color.lerp(c.primary800, c.primary500, 0.35)!,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// 全画面プレーヤーページ。**同一 [controller] を再利用**する（dispose しない）。
///
/// 呼び出し側（`_WatchBody`）が push 前に横向き固定＋immersive を設定し、
/// pop 後に縦向き＋edgeToEdge へ復元する。この画面は黒背景で動画本来の
/// アスペクト比を中央に置き、[VideoPlayerView] の操作 UI をそのまま重ねる。
class FullscreenPlayerPage extends StatelessWidget {
  const FullscreenPlayerPage({super.key, required this.controller});

  final VideoPlayerController controller;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: VideoPlayerView(
          controller: controller,
          fullscreen: true,
          onFullscreenButton: () => Navigator.of(context).maybePop(),
        ),
      ),
    );
  }
}
