import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/video_top.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

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

const _index = ContentIndex(
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

void main() {
  testWidgets('動画が空なら空状態を表示する', (tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(_host(const ContentIndex()));
    await tester.pumpAndSettle();

    expect(find.text('まだ動画がありません'), findsOneWidget);
  });

  testWidgets('1章2本で章タイトル・各行・「0 / 2」を表示する', (tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(_host(_index));
    await tester.pumpAndSettle();

    expect(find.text('第1章 企業と法務'), findsOneWidget);
    // 先頭動画のタイトルはヒーローカードと行の両方に出る。
    expect(find.text('1-1 企業活動とは'), findsWidgets);
    expect(find.text('1-2 株式会社のしくみ'), findsOneWidget);
    // 章ヘッダーは「視聴済み / 全本数」（DESIGN.html の cnt）。未視聴なので 0 / 2。
    expect(find.text('0 / 2'), findsOneWidget);
    // 尺は mm:ss で表示される。
    expect(find.text('5:12'), findsOneWidget);
    expect(find.text('6:40'), findsOneWidget);
  });

  testWidgets('未視聴のときヒーローは「はじめる」＋先頭動画', (tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(_host(_index));
    await tester.pumpAndSettle();

    expect(find.text('はじめる'), findsOneWidget);
    expect(find.text('再生する'), findsOneWidget);
    expect(find.text('つづきから'), findsNothing);
  });

  testWidgets('lastWatchedId があるとヒーローは「つづきから」＋その動画', (tester) async {
    SharedPreferences.setMockInitialValues({'video.lastWatchedId': '1-2'});
    await tester.pumpWidget(_host(_index));
    await tester.pumpAndSettle();

    expect(find.text('つづきから'), findsOneWidget);
    expect(find.text('つづける'), findsOneWidget);
    expect(find.text('はじめる'), findsNothing);
    // 「つづきから」の動画（1-2）がヒーローと行の両方に出る。
    expect(find.text('1-2 株式会社のしくみ'), findsWidgets);
  });

  testWidgets('視聴状態で章ヘッダーのカウントと行アイコンが変わる', (tester) async {
    // 1-1=視聴済み（95/100 相当を保存）、1-2=再生中。
    SharedPreferences.setMockInitialValues({
      'video.progress':
          '{"1-1":{"p":300,"w":true},"1-2":{"p":40,"w":false}}',
      'video.lastWatchedId': '1-2',
    });
    await tester.pumpWidget(_host(_index));
    await tester.pumpAndSettle();

    // 視聴済み1本。
    expect(find.text('1 / 2'), findsOneWidget);
    // vthumb 3状態のうち、視聴済み(check)と再生中(equalizer)が1つずつ。
    expect(find.byIcon(Icons.check_rounded), findsOneWidget);
    expect(find.byIcon(Icons.equalizer_rounded), findsOneWidget);
    // 未視聴(play_arrow) はヒーローCTAにも出るので、行に無いことは
    // check/equalizer が揃うことで担保する（両行とも既知状態）。
  });
}
