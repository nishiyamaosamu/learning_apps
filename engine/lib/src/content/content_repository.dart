import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;

import 'content_models.dart';

/// アプリ側アセットに置かれたコンテンツ（JSON）を読み込むリポジトリ。
///
/// 実体はアプリ（例: apps/ipa_ip）の `contents/` 以下に置かれ、
/// pubspec.yaml の assets に登録されている前提。
class ContentRepository {
  const ContentRepository({required this.basePath});

  /// コンテンツのベースパス（例: 'contents'）。
  final String basePath;

  /// 初期ロード用の一覧（base.json）。
  Future<ContentIndex> loadIndex() async {
    return ContentIndex.fromJson(await _loadJson('base.json'));
  }

  /// 講座内容（contents/lessons/{id}.json）を都度ロード。
  Future<Lesson> loadLesson(String id) async {
    return Lesson.fromJson(await _loadJson('lessons/$id.json'));
  }

  /// 問題内容（contents/exercises/{id}.json）を都度ロード。
  Future<Exercise> loadExercise(String id) async {
    return Exercise.fromJson(await _loadJson('exercises/$id.json'));
  }

  /// 暗記カード内容（contents/anki/{id}.json）を都度ロード。
  Future<AnkiDeck> loadAnki(String id) async {
    return AnkiDeck.fromJson(await _loadJson('anki/$id.json'));
  }

  Future<Map<String, dynamic>> _loadJson(String relativePath) async {
    final raw = await rootBundle.loadString('$basePath/$relativePath');
    return jsonDecode(raw) as Map<String, dynamic>;
  }
}
