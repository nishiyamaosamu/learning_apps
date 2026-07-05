import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../settings/review_queue.dart';

/// 解説カードの「要復習に追加」チップ（DESIGN.html `.chip-review`）。
///
/// review 系トークン（reviewSurface 面＋reviewBorder 枠＋reviewText 文字／review
/// アイコン）で、この設問の qid を要復習キューへ手動追加する。既に追加済みなら
/// 「追加済み」表示（非対話）に切り替える。誤答は確定時に自動でキューへ入るため、
/// このチップは主に正答・未追加の設問を手動で拾うための導線。
class ReviewChip extends ConsumerWidget {
  const ReviewChip({super.key, required this.qid});

  final String qid;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final c = context.colors;
    final added = ref.watch(reviewQueueProvider).contains(qid);

    final content = DecoratedBox(
      decoration: BoxDecoration(
        color: c.reviewSurface,
        border: Border.all(color: c.reviewBorder),
        borderRadius: BorderRadius.circular(AppRadius.full),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              added ? Icons.bookmark_added_rounded : Icons.bookmark_add_outlined,
              size: 12,
              color: c.review,
            ),
            const SizedBox(width: 5),
            Text(
              added ? '追加済み' : '要復習に追加',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: c.reviewText,
              ),
            ),
          ],
        ),
      ),
    );

    // 追加済みは非対話（表示のみ）。未追加はタップで追加する。
    if (added) return content;
    return InkWell(
      borderRadius: BorderRadius.circular(AppRadius.full),
      onTap: () => ref.read(reviewQueueProvider.notifier).add(qid),
      child: content,
    );
  }
}
