import 'package:flutter_test/flutter_test.dart';

import 'package:engine/engine.dart';

void main() {
  test('AppConfig のデフォルト値', () {
    const config = AppConfig(title: 'テスト');
    expect(config.contentBasePath, 'contents');
    expect(config.tabs, isNotEmpty);
    expect(config.primaryColor, isNotNull);
  });

  test('ContentIndex.fromJson が一覧をパースできる', () {
    final index = ContentIndex.fromJson({
      'lessons': [
        {'id': '1', 'title': '講座1'},
      ],
      'exercises': [],
      'anki': [],
    });
    expect(index.lessons.length, 1);
    expect(index.lessons.first.title, '講座1');
    expect(index.exercises, isEmpty);
  });
}
