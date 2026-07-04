import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/video_top.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

Widget _host(ContentIndex index) {
  return ProviderScope(
    overrides: [
      appConfigProvider.overrideWithValue(const AppConfig(title: '動画テスト')),
      contentIndexProvider.overrideWith((ref) async => index),
    ],
    child: MaterialApp(
      theme: buildEngineTheme(AppColors.light()),
      home: const VideoTop(),
    ),
  );
}

void main() {
  testWidgets('動画が空なら空状態を表示する', (tester) async {
    await tester.pumpWidget(_host(const ContentIndex()));
    await tester.pumpAndSettle();

    expect(find.text('まだ動画がありません'), findsOneWidget);
  });

  testWidgets('1章2本で章タイトル・各行・「2本」を表示する', (tester) async {
    const index = ContentIndex(
      videos: [
        VideoChapter(
          id: '1',
          title: '第1章 企業と法務',
          videos: [
            VideoItem(
              id: '1-1',
              title: '1-1 企業活動とは',
              durationSec: 312,
              asset: 'videos/1-1.mp4',
            ),
            VideoItem(
              id: '1-2',
              title: '1-2 株式会社のしくみ',
              durationSec: 400,
              asset: 'videos/1-2.mp4',
            ),
          ],
        ),
      ],
    );

    await tester.pumpWidget(_host(index));
    await tester.pumpAndSettle();

    expect(find.text('第1章 企業と法務'), findsOneWidget);
    // 先頭動画のタイトルはヒーローカードと行の両方に出る。
    expect(find.text('1-1 企業活動とは'), findsWidgets);
    expect(find.text('1-2 株式会社のしくみ'), findsOneWidget);
    expect(find.text('2本'), findsOneWidget);
    // 尺は mm:ss で表示される。
    expect(find.text('5:12'), findsOneWidget);
    expect(find.text('6:40'), findsOneWidget);
  });
}
