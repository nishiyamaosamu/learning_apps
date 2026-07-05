import 'package:engine/engine.dart';
import 'package:flutter/material.dart' show ThemeMode;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  test('既定はシステム追従', () async {
    SharedPreferences.setMockInitialValues({});
    final container = ProviderContainer();
    addTearDown(container.dispose);

    expect(container.read(themeModeSettingProvider), ThemeMode.system);
  });

  test('set でモードを切り替えて永続化する', () async {
    SharedPreferences.setMockInitialValues({});
    final container = ProviderContainer();
    addTearDown(container.dispose);

    await container.read(themeModeSettingProvider.notifier).set(ThemeMode.dark);
    expect(container.read(themeModeSettingProvider), ThemeMode.dark);

    final prefs = await SharedPreferences.getInstance();
    expect(prefs.getString('app.themeMode'), 'dark');
  });

  test('保存値を復元する', () async {
    SharedPreferences.setMockInitialValues({'app.themeMode': 'light'});
    final container = ProviderContainer();
    addTearDown(container.dispose);
    // autoDispose なので listen で生存させつつ非同期ロードの完了を待つ。
    container.listen(themeModeSettingProvider, (_, _) {});

    // build は同期で既定を返し、非同期ロードで保存値へ更新する。
    expect(container.read(themeModeSettingProvider), ThemeMode.system);
    await Future<void>.delayed(Duration.zero);
    expect(container.read(themeModeSettingProvider), ThemeMode.light);
  });

  test('不正な保存値は無視して既定のまま', () async {
    SharedPreferences.setMockInitialValues({'app.themeMode': 'garbage'});
    final container = ProviderContainer();
    addTearDown(container.dispose);
    container.listen(themeModeSettingProvider, (_, _) {});

    await Future<void>.delayed(Duration.zero);
    expect(container.read(themeModeSettingProvider), ThemeMode.system);
  });
}
