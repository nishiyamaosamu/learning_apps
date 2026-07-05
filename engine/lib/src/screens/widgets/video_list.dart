import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_models.dart';
import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_typography.dart';
import '../../settings/video_progress.dart';

/// 秒数を mm:ss（例: 312 → "5:12"）へ整形する。
String formatDuration(int seconds) {
  final m = seconds ~/ 60;
  final s = seconds % 60;
  return '$m:${s.toString().padLeft(2, '0')}';
}

/// アプリ内小見出し（DESIGN.html `.h-sec`）。
///
/// 左に青→ピンクのツートンティック＋見出し（12/w800）、右に任意の補足
/// （章の「n本」など。mono caption / textSecondary）を並べる。
class VideoSectionHeader extends StatelessWidget {
  const VideoSectionHeader({super.key, required this.title, this.trailing});

  final String title;

  /// 右端の補足テキスト（例: '5本'）。null なら出さない。
  final String? trailing;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Row(
      children: [
        // ツートンティック（4×12dp・角丸2）。165度相当のグラデ（青70% → ピンク先端）。
        // バーが細いため縦グラデで近似する（stops[0.7,0.7] で先端30%がピンク）。
        Container(
          width: 4,
          height: 12,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(2),
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [c.primary600, c.accentPink],
              stops: const [0.7, 0.7],
            ),
          ),
        ),
        const SizedBox(width: 6),
        Expanded(
          child: Text(
            title,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w800,
              height: 1.4,
              color: c.textPrimary,
            ),
          ),
        ),
        if (trailing != null)
          Text(
            trailing!,
            style: AppTypography.mono(
              AppTypography.caption,
            ).copyWith(color: c.textSecondary),
          ),
      ],
    );
  }
}

/// vthumb の視聴状態に応じたアイコン（DESIGN.html: ✓=視聴済み `check` /
/// equalizer=再生中 / ▶=未視聴 `play_arrow`）。
IconData _vthumbIcon(VideoWatchStatus status) => switch (status) {
  VideoWatchStatus.watched => Icons.check_rounded,
  VideoWatchStatus.playing => Icons.equalizer_rounded,
  VideoWatchStatus.unwatched => Icons.play_arrow_rounded,
};

/// 動画1本を表す行（DESIGN.html `.ls` + `.vthumb`）。
///
/// vthumb（36×21・角丸5・primary50 面＋中央に状態アイコン）＋ タイトル（13/w600・
/// 1行省略）＋ 右端に尺（mm:ss、mono caption / textMuted）。行高は 48 以上。
/// vthumb の面色 (primary50)・アイコン色 (primary600) は3状態で共通で、中央の
/// グリフだけが視聴状態で切り替わる（DESIGN.html の `.vthumb` 仕様どおり）。
class VideoRow extends StatelessWidget {
  const VideoRow({
    super.key,
    required this.video,
    required this.onTap,
    this.status = VideoWatchStatus.unwatched,
  });

  final VideoItem video;
  final VoidCallback onTap;
  final VideoWatchStatus status;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return InkWell(
      onTap: onTap,
      child: ConstrainedBox(
        constraints: const BoxConstraints(minHeight: 48),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          child: Row(
            children: [
              Container(
                width: 36,
                height: 21,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: c.primary50,
                  borderRadius: BorderRadius.circular(5),
                ),
                child: Icon(
                  _vthumbIcon(status),
                  size: 14,
                  color: c.primary600,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  video.title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    height: 1.4,
                    color: c.textPrimary,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                formatDuration(video.durationSec),
                style: AppTypography.mono(
                  AppTypography.caption,
                ).copyWith(color: c.textMuted),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// 動画行をまとめるカード（DESIGN.html `.lesson-list`）。
///
/// surface 面＋border 枠＋角丸 lg。行間は 1px の区切り線。行タップは
/// [onTapVideo] に委譲する（遷移方法は呼び出し側が決める）。各行の vthumb 状態は
/// [videoProgressProvider] を watch して導出するため、ホーム・視聴ページの
/// 「次の動画」いずれでも同じ視聴状態が反映される。
class VideoList extends ConsumerWidget {
  const VideoList({super.key, required this.videos, required this.onTapVideo});

  final List<VideoItem> videos;
  final void Function(VideoItem video) onTapVideo;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final c = context.colors;
    final progress = ref.watch(videoProgressProvider);
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: c.surface,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        border: Border.all(color: c.border),
      ),
      child: Column(
        children: [
          for (var i = 0; i < videos.length; i++) ...[
            if (i > 0) Divider(height: 1, thickness: 1, color: c.border),
            VideoRow(
              video: videos[i],
              status: progress.statusOf(videos[i].id),
              onTap: () => onTapVideo(videos[i]),
            ),
          ],
        ],
      ),
    );
  }
}
