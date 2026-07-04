import 'package:flutter/material.dart';

import '../../design/app_dimens.dart';

/// 本文コンテンツを画面中央に寄せ、最大幅（[AppLayout.maxContentWidth]）で
/// 頭打ちにする薄いラッパー。
///
/// タブレット等の広い画面で本文が間延びしないよう、スクロール本文やクイズ本体を
/// この部品で包む。左右のマージンは呼び出し側で付ける前提で、ここは幅の制約と
/// 中央寄せだけを担う。
class ContentMaxWidth extends StatelessWidget {
  const ContentMaxWidth({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: AppLayout.maxContentWidth),
        child: child,
      ),
    );
  }
}
