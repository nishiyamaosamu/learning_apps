import 'dart:convert';
import 'dart:io';

import 'package:engine/engine.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('base.json の講座カテゴリと参照先を読み込める', () {
    final raw = File('contents/base.json').readAsStringSync();
    final index = ContentIndex.fromJson(
      jsonDecode(raw) as Map<String, dynamic>,
    );

    expect(index.lessons, isNotEmpty);
    for (final domain in index.lessons) {
      expect(domain.majorCategories, isNotEmpty, reason: domain.title);
      for (final majorCategory in domain.majorCategories) {
        expect(
          majorCategory.middleCategories,
          isNotEmpty,
          reason: majorCategory.title,
        );
        for (final middleCategory in majorCategory.middleCategories) {
          expect(
            middleCategory.lessons,
            isNotEmpty,
            reason: middleCategory.title,
          );
          for (final lesson in middleCategory.lessons) {
            expect(
              File('contents/lessons/${lesson.id}.json').existsSync(),
              isTrue,
              reason: lesson.title,
            );
          }
        }
      }
    }
  });
}
