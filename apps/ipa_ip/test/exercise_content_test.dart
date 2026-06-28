import 'dart:convert';
import 'dart:io';

import 'package:engine/engine.dart';
import 'package:flutter_test/flutter_test.dart';

/// 生成済みの問題集JSON（contents/exercises/*.json）を実際にモデルへパースし、
/// チャンク分割まで通ることを検証する。コンバータ出力とエンジンモデルの整合性ガード。
Exercise _load(String id) {
  final raw = File('contents/exercises/$id.json').readAsStringSync();
  return Exercise.fromJson(jsonDecode(raw) as Map<String, dynamic>);
}

void main() {
  test('全年度が100問でパースできる', () {
    for (final id in ['R8', 'R7', 'R6', 'R5', 'R4']) {
      final e = _load(id);
      expect(e.questions.length, 100, reason: '$id の問数');
      expect(e.categories.length, 3, reason: '$id の分野数');
    }
  });

  test('R8 は 20 チャンク（35/20/45 すべて5問区切り）', () {
    final chunks = buildExerciseChunks(_load('R8'));
    expect(chunks.length, 20);
    expect(chunks.every((c) => c.questions.length == 5), isTrue);
  });

  test('R4 は 19 チャンク（端数吸収）', () {
    final chunks = buildExerciseChunks(_load('R4'));
    expect(chunks.length, 19);
    // テクノロジ系の最後は6問（41〜46）。
    final tech = chunks.where((c) => c.categoryId == 'technology').toList();
    expect(tech.last.questions.length, 6);
    expect(tech.last.label, 'テクノロジ系 41〜46問');
  });

  test('画像問題・空選択肢（R4051）が正しくモデル化される', () {
    final q = _load('R4').questions.firstWhere((q) => q.qid == 'R4051');
    expect(q.content.whereType<ExerciseImageBlock>().isNotEmpty, isTrue);
    expect(q.options.every((o) => o.content.isEmpty), isTrue);
    expect(q.answerOptionId, 2);
  });

  test('画像ブロックの src はアセットパスに変換されている（R8003）', () {
    final q = _load('R8').questions.firstWhere((q) => q.qid == 'R8003');
    final img = q.content.whereType<ExerciseImageBlock>().first;
    expect(img.src, 'exercises/images/R8003_01.png');
    // 参照先の画像が実在する。
    expect(File('contents/${img.src}').existsSync(), isTrue);
  });
}
