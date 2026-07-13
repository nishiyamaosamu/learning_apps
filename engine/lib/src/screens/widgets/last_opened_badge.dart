import 'package:flutter/material.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';

/// 「前回」ラベル（一覧の該当行に添える小バッジ）。
///
/// 問題集タブのトップ（年度の行）と問題集詳細（チャンクの行）の両方で、前回
/// 開いていた行に共通で添える。primary系トークンの小さなピル。
class LastOpenedBadge extends StatelessWidget {
  const LastOpenedBadge({super.key});

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return DecoratedBox(
      decoration: BoxDecoration(
        color: c.primary50,
        borderRadius: BorderRadius.circular(AppRadius.full),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
        child: Text(
          '前回',
          style: TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w700,
            color: c.primary600,
          ),
        ),
      ),
    );
  }
}
