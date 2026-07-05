import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/settings_top.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

Widget _host() {
  return ProviderScope(
    overrides: [
      appConfigProvider.overrideWithValue(const AppConfig(title: '設定テスト')),
    ],
    child: MaterialApp(
      theme: buildEngineTheme(AppColors.light()),
      home: const SettingsTop(),
    ),
  );
}

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
    PackageInfo.setMockInitialValues(
      appName: 'ipa',
      packageName: 'com.example.ipa',
      version: '1.2.3',
      buildNumber: '4',
      buildSignature: '',
    );
  });

  testWidgets('サウンド: 既定オンを反映し、トグル/行タップで切り替わる', (tester) async {
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    Switch sound() => tester.widget<Switch>(find.byType(Switch));

    // audioEnabledProvider の既定（オン）を反映。
    expect(sound().value, isTrue);

    // トグル自体をタップ → オフへ。
    await tester.tap(find.byType(Switch));
    await tester.pumpAndSettle();
    expect(sound().value, isFalse);

    // 行全体（ラベル）タップでも切り替わる → オンへ。
    await tester.tap(find.text('サウンド'));
    await tester.pumpAndSettle();
    expect(sound().value, isTrue);
  });

  testWidgets('再生速度: 行タップで倍速が巡回する', (tester) async {
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    // 既定は等速。AudioSpeed.speeds = [1.0, 1.25, 1.5, 2.0]。
    expect(find.text('1.0×'), findsOneWidget);

    await tester.tap(find.text('再生速度'));
    await tester.pumpAndSettle();
    expect(find.text('1.25×'), findsOneWidget);

    await tester.tap(find.text('再生速度'));
    await tester.pumpAndSettle();
    expect(find.text('1.5×'), findsOneWidget);
  });

  testWidgets('バージョン: package_info_plus の版を行と最下部に表示する', (tester) async {
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    // 「このアプリ」行（ビルド番号つき）と最下部 ver-row の両方に版が出る。
    expect(find.text('1.2.3 (4)'), findsOneWidget);
    expect(find.text('バージョン 1.2.3'), findsOneWidget);
  });

  testWidgets('ダークモード: 既定「システム」を表示し、シートで切替できる', (tester) async {
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    // 行のラベルと現在値（既定=システム）。
    expect(find.text('ダークモード'), findsOneWidget);
    expect(find.text('システム'), findsOneWidget);

    // 行タップでボトムシートが開き、3 択が並ぶ。
    await tester.tap(find.text('ダークモード'));
    await tester.pumpAndSettle();
    expect(find.text('ライト'), findsOneWidget);
    expect(find.text('ダーク'), findsOneWidget);

    // 「ダーク」を選ぶとシートが閉じ、行の値がダークに変わる。
    await tester.tap(find.text('ダーク'));
    await tester.pumpAndSettle();
    expect(find.text('ライト'), findsNothing); // シートは閉じた
    expect(find.text('ダーク'), findsOneWidget); // 行の値として残る
  });
}
