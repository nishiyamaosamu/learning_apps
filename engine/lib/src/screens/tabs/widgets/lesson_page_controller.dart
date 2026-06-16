import 'package:flutter/foundation.dart';

import '../../../content/content_models.dart';

/// 1ページ分のクイズ回答状態を集約するコントローラ。
///
/// ページ内の複数クイズの回答を保持し、フッターの「回答する / 次へ」判定
/// （[hasQuiz] / [canSubmit] / [submitted]）に使う。
class LessonPageController extends ChangeNotifier {
  LessonPageController(this.page)
      : hasQuiz = page.contents.any(_isQuiz) {
    // 穴埋めクイズの空欄スロットを先に確保しておく。
    for (var i = 0; i < page.contents.length; i++) {
      final content = page.contents[i];
      if (content is QuizFillInTheBlankContent) {
        final blankCount = content.question.split('[__]').length - 1;
        _blanks[i] = List<int?>.filled(blankCount, null);
      }
    }
  }

  final LessonPage page;

  /// このページがクイズを含むか（フッターのボタン文言の判定に使う）。
  final bool hasQuiz;

  bool _submitted = false;

  /// 「回答する」が押され、正誤を表示中か。
  bool get submitted => _submitted;

  // contentIndex -> 単一選択クイズで選んだ選択肢 index。
  final Map<int, int> _choice = {};
  // contentIndex -> 穴埋めクイズで各空欄に配置した選択肢 index（未配置は null）。
  final Map<int, List<int?>> _blanks = {};

  int? choiceOf(int contentIndex) => _choice[contentIndex];

  List<int?> blanksOf(int contentIndex) => _blanks[contentIndex]!;

  void selectChoice(int contentIndex, int optionIndex) {
    if (_submitted) return;
    _choice[contentIndex] = optionIndex;
    notifyListeners();
  }

  void placeBlank(int contentIndex, int blankIndex, int optionIndex) {
    if (_submitted) return;
    final list = _blanks[contentIndex]!;
    // 既に他の空欄で使われていたら、そちらを空にする（1チップ1空欄）。
    final existing = list.indexOf(optionIndex);
    if (existing != -1) list[existing] = null;
    list[blankIndex] = optionIndex;
    notifyListeners();
  }

  void clearBlank(int contentIndex, int blankIndex) {
    if (_submitted) return;
    _blanks[contentIndex]?[blankIndex] = null;
    notifyListeners();
  }

  /// すべてのクイズに完全な回答が入っていて「回答する」が押せるか。
  bool get canSubmit {
    for (var i = 0; i < page.contents.length; i++) {
      final content = page.contents[i];
      if (content is QuizMultipleChoiceContent) {
        if (_choice[i] == null) return false;
      } else if (content is QuizFillInTheBlankContent) {
        if (_blanks[i]!.contains(null)) return false;
      }
    }
    return true;
  }

  /// 回答を確定して正誤表示に切り替える。
  void submit() {
    if (!canSubmit || _submitted) return;
    _submitted = true;
    notifyListeners();
  }
}

bool _isQuiz(LessonContent content) =>
    content is QuizMultipleChoiceContent ||
    content is QuizFillInTheBlankContent;
