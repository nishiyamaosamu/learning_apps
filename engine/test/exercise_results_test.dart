import 'package:engine/engine.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _correctKey = 'exercise.correctQids';
const _wrongKey = 'exercise.wrongQids';

void main() {
  test('recordAll は結果を保存し、最新で上書きする', () async {
    SharedPreferences.setMockInitialValues({});
    final container = ProviderContainer();
    addTearDown(container.dispose);

    final notifier = container.read(exerciseResultsProvider.notifier);
    await notifier.recordAll({'R8001': false, 'R8002': true});
    expect(container.read(exerciseResultsProvider)['R8001'], false);
    expect(container.read(exerciseResultsProvider)['R8002'], true);

    // 同じ qid を最新（正解）で上書き。
    await notifier.recordAll({'R8001': true});
    expect(container.read(exerciseResultsProvider)['R8001'], true);

    // SharedPreferences にも反映される。
    final prefs = await SharedPreferences.getInstance();
    expect(prefs.getStringList(_correctKey), containsAll(['R8001', 'R8002']));
    expect(prefs.getStringList(_wrongKey) ?? [], isNot(contains('R8001')));
  });

  test('保存値から復元する（correct=true / wrong=false / 無し=未学習）', () async {
    SharedPreferences.setMockInitialValues({
      _correctKey: ['R8001'],
      _wrongKey: ['R8002'],
    });
    final container = ProviderContainer();
    addTearDown(container.dispose);

    // build() 内の非同期ロード完了を待つ。
    container.read(exerciseResultsProvider);
    await Future<void>.delayed(const Duration(milliseconds: 20));

    final state = container.read(exerciseResultsProvider);
    expect(state['R8001'], true);
    expect(state['R8002'], false);
    expect(state.containsKey('R8003'), isFalse); // 未学習
  });
}
