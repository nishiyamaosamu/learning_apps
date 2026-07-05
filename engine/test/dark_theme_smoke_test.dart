import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/anki_top.dart';
import 'package:engine/src/screens/tabs/exercise_top.dart';
import 'package:engine/src/screens/tabs/settings_top.dart';
import 'package:engine/src/screens/tabs/video_top.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// ダークテーマで主要タブ画面をポンプし、例外なく描画できることのスモーク。
///
/// `context.colors` 経由で色を引く画面は `AppColors.dark()` を積んだテーマに追従する
/// はずで、ここではクラッシュ（未定義トークン参照・アサート違反など）が無いことを
/// 担保する。コントラスト自体の目視確認はシミュレータで行う。
Widget _dark(Widget home, {List<Override> overrides = const []}) {
  return ProviderScope(
    overrides: [
      appConfigProvider.overrideWithValue(const AppConfig(title: 'ダークテスト')),
      ...overrides,
    ],
    child: MaterialApp(
      theme: buildEngineTheme(AppColors.light()),
      darkTheme: buildEngineTheme(
        AppColors.dark(),
        brightness: Brightness.dark,
      ),
      themeMode: ThemeMode.dark,
      home: home,
    ),
  );
}

const _videoIndex = ContentIndex(
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
      ],
    ),
  ],
);

const _exerciseIndex = ContentIndex(
  exercises: [ContentSummary(id: 'R8', title: '令和8年度 問題集')],
);

final _exercises = [
  Exercise(
    id: 'R8',
    title: '令和8年度 問題集',
    questions: [
      ExerciseQuestion(
        qid: 'R8001',
        category: 'strategy',
        content: [ExerciseBlock.text(text: '問題 R8001')],
        options: [
          for (var i = 1; i <= 4; i++)
            ExerciseOption(id: i, content: [ExerciseBlock.text(text: '選択肢$i')]),
        ],
        answerOptionId: 1,
        explanation: [ExerciseBlock.text(text: '解説')],
      ),
    ],
  ),
];

const _ankiIndex = ContentIndex(
  anki: [ContentSummary(id: '1', title: '企業活動のことば', cardCount: 1)],
);
const _ankiDeck = AnkiDeck(
  id: '1',
  title: '企業活動のことば',
  cards: [AnkiCard(front: '用語A', back: '意味A')],
);

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
    PackageInfo.setMockInitialValues(
      appName: 'ipa',
      packageName: 'com.example.ipa',
      version: '1.0.0',
      buildNumber: '1',
      buildSignature: '',
    );
  });

  testWidgets('video_top がダークで例外なく描画される', (tester) async {
    await tester.pumpWidget(
      _dark(
        const VideoTop(),
        overrides: [contentIndexProvider.overrideWith((ref) async => _videoIndex)],
      ),
    );
    await tester.pumpAndSettle();

    expect(tester.takeException(), isNull);
    expect(find.text('第1章 企業と法務'), findsOneWidget);
    // ダークテーマが実際に効いていること（ColorScheme.brightness = dark）。
    final ctx = tester.element(find.text('第1章 企業と法務'));
    expect(Theme.of(ctx).brightness, Brightness.dark);
    expect(ctx.colors.bg, AppColors.dark().bg);
  });

  testWidgets('exercise_top がダークで例外なく描画される', (tester) async {
    await tester.pumpWidget(
      _dark(
        const ExerciseTop(),
        overrides: [
          contentIndexProvider.overrideWith((ref) async => _exerciseIndex),
          allExercisesProvider.overrideWith((ref) async => _exercises),
        ],
      ),
    );
    await tester.pumpAndSettle();

    expect(tester.takeException(), isNull);
    expect(find.text('令和8年度 問題集'), findsOneWidget);
  });

  testWidgets('anki_top がダークで例外なく描画される', (tester) async {
    await tester.pumpWidget(
      _dark(
        const AnkiTop(),
        overrides: [
          contentIndexProvider.overrideWith((ref) async => _ankiIndex),
          allAnkiDecksProvider.overrideWith((ref) async => [_ankiDeck]),
        ],
      ),
    );
    await tester.pumpAndSettle();

    expect(tester.takeException(), isNull);
    expect(find.text('覚えた'), findsOneWidget);
  });

  testWidgets('settings_top がダークで例外なく描画される', (tester) async {
    await tester.pumpWidget(_dark(const SettingsTop()));
    await tester.pumpAndSettle();

    expect(tester.takeException(), isNull);
    expect(find.text('ダークモード'), findsOneWidget);
  });
}
