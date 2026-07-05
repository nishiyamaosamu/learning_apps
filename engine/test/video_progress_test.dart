import 'package:engine/engine.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  test('record は再生位置を保存し、statusOf が3状態を導出する', () async {
    SharedPreferences.setMockInitialValues({});
    final container = ProviderContainer();
    addTearDown(container.dispose);

    final notifier = container.read(videoProgressProvider.notifier);

    // 未記録 = 未視聴。
    expect(
      container.read(videoProgressProvider).statusOf('1-1'),
      VideoWatchStatus.unwatched,
    );

    // 途中まで再生 = 再生中。
    await notifier.record(id: '1-1', positionSec: 30, durationSec: 300);
    final s = container.read(videoProgressProvider);
    expect(s.statusOf('1-1'), VideoWatchStatus.playing);
    expect(s.positionSecOf('1-1'), 30);
  });

  test('90%閾値に達すると視聴済みになる（境界と未達）', () async {
    SharedPreferences.setMockInitialValues({});
    final container = ProviderContainer();
    addTearDown(container.dispose);
    final notifier = container.read(videoProgressProvider.notifier);

    // 89% は未達（再生中）。
    await notifier.record(id: 'a', positionSec: 89, durationSec: 100);
    expect(
      container.read(videoProgressProvider).statusOf('a'),
      VideoWatchStatus.playing,
    );

    // ちょうど90%で視聴済み。
    await notifier.record(id: 'b', positionSec: 90, durationSec: 100);
    expect(
      container.read(videoProgressProvider).statusOf('b'),
      VideoWatchStatus.watched,
    );
  });

  test('watched は不可逆（末尾到達後に巻き戻しても視聴済みのまま）', () async {
    SharedPreferences.setMockInitialValues({});
    final container = ProviderContainer();
    addTearDown(container.dispose);
    final notifier = container.read(videoProgressProvider.notifier);

    await notifier.record(id: 'x', positionSec: 100, durationSec: 100);
    expect(
      container.read(videoProgressProvider).statusOf('x'),
      VideoWatchStatus.watched,
    );

    // 頭出し（position 0）に戻しても視聴済みは維持する。
    await notifier.record(id: 'x', positionSec: 0, durationSec: 100);
    final s = container.read(videoProgressProvider);
    expect(s.statusOf('x'), VideoWatchStatus.watched);
    expect(s.positionSecOf('x'), 0);
  });

  test('markOpened で lastWatchedId を更新する', () async {
    SharedPreferences.setMockInitialValues({});
    final container = ProviderContainer();
    addTearDown(container.dispose);
    final notifier = container.read(videoProgressProvider.notifier);

    expect(container.read(videoProgressProvider).lastWatchedId, isNull);
    await notifier.markOpened('2-3');
    expect(container.read(videoProgressProvider).lastWatchedId, '2-3');
  });

  test('SharedPreferences から復元する（位置・視聴済み・lastWatchedId）', () async {
    // 先に別コンテナで書き込み、永続化された値を作る。
    SharedPreferences.setMockInitialValues({});
    final writer = ProviderContainer();
    final w = writer.read(videoProgressProvider.notifier);
    await w.record(id: '1-1', positionSec: 95, durationSec: 100); // watched
    await w.record(id: '1-2', positionSec: 10, durationSec: 100); // playing
    await w.markOpened('1-2');
    writer.dispose();

    // 別コンテナ（コールドスタート相当）で復元する。
    final container = ProviderContainer();
    addTearDown(container.dispose);
    container.read(videoProgressProvider);
    await Future<void>.delayed(const Duration(milliseconds: 20));

    final s = container.read(videoProgressProvider);
    expect(s.positionSecOf('1-2'), 10);
    expect(s.statusOf('1-1'), VideoWatchStatus.watched);
    expect(s.statusOf('1-2'), VideoWatchStatus.playing);
    expect(s.statusOf('1-3'), VideoWatchStatus.unwatched); // 未記録
    expect(s.lastWatchedId, '1-2');
  });
}
