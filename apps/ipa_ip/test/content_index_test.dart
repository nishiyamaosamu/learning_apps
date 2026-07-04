import 'dart:convert';
import 'dart:io';

import 'package:engine/engine.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('base.json の動画講座（章・動画・確認クイズ）を読み込める', () {
    final raw = File('contents/base.json').readAsStringSync();
    final index = ContentIndex.fromJson(
      jsonDecode(raw) as Map<String, dynamic>,
    );

    // 2章・計3本。
    expect(index.videos, hasLength(2));
    final allVideos = [
      for (final chapter in index.videos) ...chapter.videos,
    ];
    expect(allVideos, hasLength(3));

    // VideoItem.id は全体で一意。
    final ids = allVideos.map((v) => v.id).toList();
    expect(ids.toSet(), hasLength(ids.length), reason: 'ids: $ids');

    for (final video in allVideos) {
      // 尺は正。
      expect(video.durationSec, greaterThan(0), reason: video.id);
      // asset ファイルが contents/ 配下に実在する。
      expect(
        File('contents/${video.asset}').existsSync(),
        isTrue,
        reason: video.asset,
      );
      // 各クイズの正解インデックスが options の範囲内。
      for (final quiz in video.quizzes) {
        switch (quiz) {
          case QuizMultipleChoice(:final options, :final correctOptionIndex):
            expect(
              correctOptionIndex,
              inInclusiveRange(0, options.length - 1),
              reason: '${video.id}: $quiz',
            );
          case QuizFillInTheBlank(:final options, :final correctOptionIndices):
            for (final idx in correctOptionIndices) {
              expect(
                idx,
                inInclusiveRange(0, options.length - 1),
                reason: '${video.id}: $quiz',
              );
            }
        }
      }
    }

    // タップ配置 UI 検証のため、穴埋めクイズが最低1問含まれる。
    final hasFillInBlank = allVideos
        .expand((v) => v.quizzes)
        .any((q) => q is QuizFillInTheBlank);
    expect(hasFillInBlank, isTrue);
  });

  test('base.json の暗記デッキ（件数・cardCount）が実データと一致する', () {
    final raw = File('contents/base.json').readAsStringSync();
    final index = ContentIndex.fromJson(
      jsonDecode(raw) as Map<String, dynamic>,
    );

    // デッキは1件。
    expect(index.anki, hasLength(1));
    final summary = index.anki.single;

    // 実ファイル（contents/anki/{id}.json）が存在し、cardCount が実カード数と一致。
    final deckRaw = File('contents/anki/${summary.id}.json').readAsStringSync();
    final deck = AnkiDeck.fromJson(jsonDecode(deckRaw) as Map<String, dynamic>);
    expect(summary.cardCount, isNotNull, reason: 'cardCount 必須');
    expect(
      summary.cardCount,
      deck.cards.length,
      reason: 'cardCount がファイルの実カード数と一致すること',
    );
  });

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
