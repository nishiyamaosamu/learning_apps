import 'package:flutter/foundation.dart';

import '../../content/content_models.dart';

/// 1問のクイズの回答状態を集約するコントローラ。
///
/// 設問に入るたびに生成し、戻る→再入場では作り直して回答状態をリセットする。
/// 単一選択・穴埋めの両方を扱う（クイズの型で分岐）。
class QuizController extends ChangeNotifier {
  QuizController(this.quiz) {
    final q = quiz;
    if (q is QuizFillInTheBlank) {
      final blankCount = q.question.split('[__]').length - 1;
      _blanks = List<int?>.filled(blankCount, null);
    }
  }

  final LessonQuiz quiz;

  /// 単一選択で選んだ選択肢 index（未選択は null）。
  int? _choice;

  /// 穴埋めで各空欄に配置した選択肢 index（未配置は null）。
  List<int?> _blanks = const [];

  bool _submitted = false;

  int? get choice => _choice;
  List<int?> get blanks => _blanks;

  /// 「回答する」が押され、正誤を表示中か。
  bool get submitted => _submitted;

  /// まだ何も配置されていない先頭の空欄 index。すべて埋まっていれば null。
  ///
  /// 穴埋めでチップをタップしたとき、次にどの空欄へ入れるかを決めるのに使う。
  int? get firstEmptyBlank {
    final i = _blanks.indexOf(null);
    return i == -1 ? null : i;
  }

  void selectChoice(int optionIndex) {
    if (_submitted) return;
    _choice = optionIndex;
    notifyListeners();
  }

  void placeBlank(int blankIndex, int optionIndex) {
    if (_submitted) return;
    // 既に他の空欄で使われていたら、そちらを空にする（1チップ1空欄）。
    final existing = _blanks.indexOf(optionIndex);
    if (existing != -1) _blanks[existing] = null;
    _blanks[blankIndex] = optionIndex;
    notifyListeners();
  }

  void clearBlank(int blankIndex) {
    if (_submitted) return;
    _blanks[blankIndex] = null;
    notifyListeners();
  }

  /// 回答が揃っていて「回答する」が押せるか。
  bool get canSubmit {
    return switch (quiz) {
      QuizMultipleChoice() => _choice != null,
      QuizFillInTheBlank() => !_blanks.contains(null),
    };
  }

  /// 回答を確定して正誤表示に切り替える。
  void submit() {
    if (!canSubmit || _submitted) return;
    _submitted = true;
    notifyListeners();
  }
}
