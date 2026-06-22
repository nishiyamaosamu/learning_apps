import 'package:flutter/foundation.dart';

import '../../../content/content_models.dart';

/// 1つのクイズページの回答状態を集約するコントローラ。
///
/// ページに入るたびに生成し、戻る→再入場では作り直して回答状態をリセットする。
/// 単一選択・穴埋めの両方を扱う（ページの型で分岐）。
class QuizController extends ChangeNotifier {
  QuizController(this.page) {
    final p = page;
    if (p is QuizFillInTheBlankPage) {
      final blankCount = p.question.split('[__]').length - 1;
      _blanks = List<int?>.filled(blankCount, null);
    }
  }

  final LessonPage page;

  /// 単一選択で選んだ選択肢 index（未選択は null）。
  int? _choice;

  /// 穴埋めで各空欄に配置した選択肢 index（未配置は null）。
  List<int?> _blanks = const [];

  bool _submitted = false;

  int? get choice => _choice;
  List<int?> get blanks => _blanks;

  /// 「回答する」が押され、正誤を表示中か。
  bool get submitted => _submitted;

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
    return switch (page) {
      QuizMultipleChoicePage() => _choice != null,
      QuizFillInTheBlankPage() => !_blanks.contains(null),
      _ => false,
    };
  }

  /// 回答を確定して正誤表示に切り替える。
  void submit() {
    if (!canSubmit || _submitted) return;
    _submitted = true;
    notifyListeners();
  }
}
