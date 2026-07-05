import 'package:engine/engine.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _key = 'review.queueQids';

ExerciseQuestion _q(String qid) => ExerciseQuestion(qid: qid, category: 'strategy', answerOptionId: 1);

Exercise _exercise(String id, List<String> qids) => Exercise(
  id: id,
  title: id,
  questions: [for (final qid in qids) _q(qid)],
);

void main() {
  test('syncFromResults は不正解を追加し、正解を解消する', () async {
    SharedPreferences.setMockInitialValues({});
    final container = ProviderContainer();
    addTearDown(container.dispose);

    final notifier = container.read(reviewQueueProvider.notifier);
    await notifier.syncFromResults({'R8001': false, 'R8002': true, 'R8003': false});
    expect(container.read(reviewQueueProvider), {'R8001', 'R8003'});

    // 再挑戦で R8001 を正解 → 解消。R8002 は元々入っていないので影響なし。
    await notifier.syncFromResults({'R8001': true});
    expect(container.read(reviewQueueProvider), {'R8003'});

    // SharedPreferences にも反映される。
    final prefs = await SharedPreferences.getInstance();
    expect(prefs.getStringList(_key), ['R8003']);
  });

  test('手動 add は冪等（重複追加しても1つ）', () async {
    SharedPreferences.setMockInitialValues({});
    final container = ProviderContainer();
    addTearDown(container.dispose);

    final notifier = container.read(reviewQueueProvider.notifier);
    await notifier.add('R8001');
    await notifier.add('R8001');
    expect(container.read(reviewQueueProvider), {'R8001'});

    await notifier.remove('R8001');
    expect(container.read(reviewQueueProvider), isEmpty);
  });

  test('保存値から復元する', () async {
    SharedPreferences.setMockInitialValues({
      _key: ['R8001', 'R7005'],
    });
    final container = ProviderContainer();
    addTearDown(container.dispose);

    container.read(reviewQueueProvider);
    await Future<void>.delayed(const Duration(milliseconds: 20));

    expect(container.read(reviewQueueProvider), {'R8001', 'R7005'});
  });

  test('resolveReviewQuestions は年度をまたいで qid を設問へ解決する', () {
    final exercises = [
      _exercise('R8', ['R8001', 'R8002']),
      _exercise('R7', ['R7001']),
    ];
    // キューにあるが存在しない qid（R6999）は黙って除外される。
    final resolved = resolveReviewQuestions(
      exercises,
      {'R8002', 'R7001', 'R6999'},
    );
    expect(resolved.map((q) => q.qid), ['R8002', 'R7001']);
  });

  test('resolveReviewQuestions は空キューで空リストを返す', () {
    final exercises = [_exercise('R8', ['R8001'])];
    expect(resolveReviewQuestions(exercises, <String>{}), isEmpty);
  });
}
