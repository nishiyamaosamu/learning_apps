import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../content/content_models.dart';
import '../../content/content_providers.dart';
import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_typography.dart';
import '../../widgets/empty_state.dart';
import '../../widgets/layout/content_max_width.dart';
import '../widgets/video_list.dart';

/// 動画講座タブのトップ（＝アプリのホーム）。
///
/// DESIGN.html「動画講座（メインタブ＝ホーム）」に対応。アプリ名の AppBar・
/// ヒーローカード（先頭動画への導線）・章ごとの動画リストを縦に並べる。
class VideoTop extends ConsumerWidget {
  const VideoTop({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final title = ref.watch(appConfigProvider.select((c) => c.title));
    final index = ref.watch(contentIndexProvider);
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: index.when(
        data: (idx) => _VideoBody(chapters: idx.videos),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('読み込みに失敗しました\n$e')),
      ),
    );
  }
}

class _VideoBody extends StatelessWidget {
  const _VideoBody({required this.chapters});

  final List<VideoChapter> chapters;

  @override
  Widget build(BuildContext context) {
    // 動画を1本以上持つ章だけを対象にする。
    final chaptersWithVideos = [
      for (final ch in chapters)
        if (ch.videos.isNotEmpty) ch,
    ];

    if (chaptersWithVideos.isEmpty) {
      return const EmptyState(
        icon: Icons.flag_rounded,
        label: 'まだ動画がありません',
        description: 'コンテンツが追加されると、ここに動画講座が並びます。',
      );
    }

    // 「つづきから」の実挙動（最終視聴動画への再開）は視聴進捗の永続化が未実装の
    // ため、当面は先頭章の先頭動画へ遷移する（docs/DESIGN_TODO.md #2）。
    final firstVideo = chaptersWithVideos.first.videos.first;

    final blocks = <Widget>[
      _HeroCard(video: firstVideo),
      for (final chapter in chaptersWithVideos) ...[
        VideoSectionHeader(
          title: chapter.title,
          trailing: '${chapter.videos.length}本',
        ),
        VideoList(
          videos: chapter.videos,
          onTapVideo: (v) => context.push('/videos/${v.id}'),
        ),
      ],
    ];

    return ContentMaxWidth(
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(
          horizontal: AppLayout.screenMargin,
          vertical: 12,
        ),
        itemCount: blocks.length,
        separatorBuilder: (_, _) => const SizedBox(height: 12),
        itemBuilder: (_, i) => blocks[i],
      ),
    );
  }
}

/// ヒーローカード（DESIGN.html `.hero-card`）。
///
/// primary600 面に円装飾を薄く敷き、先頭動画への1タップ導線を置く。
class _HeroCard extends StatelessWidget {
  const _HeroCard({required this.video});

  final VideoItem video;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return ClipRRect(
      borderRadius: BorderRadius.circular(AppRadius.lg),
      child: Container(
        color: c.primary600,
        child: Stack(
          children: [
            // 円装飾（右上）：118dp・primary500 55%。右上にはみ出す。
            Positioned(
              right: -34,
              top: -48,
              child: Container(
                width: 118,
                height: 118,
                decoration: BoxDecoration(
                  color: c.primary500.withValues(alpha: 0.55),
                  shape: BoxShape.circle,
                ),
              ),
            ),
            // 円装飾（右下）：58dp・白枠2.5dp 22%。
            Positioned(
              right: 26,
              bottom: -30,
              child: Container(
                width: 58,
                height: 58,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Colors.white.withValues(alpha: 0.22),
                    width: 2.5,
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'はじめる',
                    style: AppTypography.micro.copyWith(
                      color: Colors.white.withValues(alpha: 0.85),
                      letterSpacing: 0.6, // .06em @ 10dp
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    video.title,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 10),
                  _HeroCta(videoId: video.id),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// ヒーローカードの白い全幅 CTA（面=白 / 文字=primary600）。
class _HeroCta extends StatelessWidget {
  const _HeroCta({required this.videoId});

  final String videoId;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return SizedBox(
      height: 36,
      width: double.infinity,
      child: Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        child: InkWell(
          borderRadius: BorderRadius.circular(10),
          onTap: () => context.push('/videos/$videoId'),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.play_arrow_rounded, size: 18, color: c.primary600),
              const SizedBox(width: 5),
              Text(
                '再生する',
                style: TextStyle(
                  color: c.primary600,
                  fontSize: 12,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
