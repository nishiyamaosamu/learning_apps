import 'package:engine/engine.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _knownKey = 'anki.knownCards';
const _laterKey = 'anki.laterCards';

const _deck1 = AnkiDeck(
  id: '1',
  title: 'デッキ1',
  cards: [
    AnkiCard(front: '用語A', back: '意味A'),
    AnkiCard(front: '用語B', back: '意味B'),
  ],
);
const _deck2 = AnkiDeck(
  id: '2',
  title: 'デッキ2',
  // 用語A はデッキ1 と同名だが、複合キーでデッキをまたいで区別される。
  cards: [AnkiCard(front: '用語A', back: '別意味')],
);

void main() {
  group('AnkiResults 永続化', () {
    test('record は評価を保存し、最新で上書きする', () async {
      SharedPreferences.setMockInitialValues({});
      final container = ProviderContainer();
      addTearDown(container.dispose);

      final notifier = container.read(ankiResultsProvider.notifier);
      final keyA = ankiCardKey('1', _deck1.cards[0]);
      final keyB = ankiCardKey('1', _deck1.cards[1]);

      await notifier.record(keyA, true);
      await notifier.record(keyB, false);
      expect(container.read(ankiResultsProvider)[keyA], true);
      expect(container.read(ankiResultsProvider)[keyB], false);

      // 覚えた → まだ に上書き。
      await notifier.record(keyA, false);
      expect(container.read(ankiResultsProvider)[keyA], false);

      // SharedPreferences にも反映される（keyA は later 側へ移動）。
      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getStringList(_laterKey), containsAll([keyA, keyB]));
      expect(prefs.getStringList(_knownKey) ?? [], isNot(contains(keyA)));
    });

    test('保存値から復元する（known=true / later=false / 無し=未評価）', () async {
      final keyA = ankiCardKey('1', _deck1.cards[0]);
      final keyB = ankiCardKey('1', _deck1.cards[1]);
      SharedPreferences.setMockInitialValues({
        _knownKey: [keyA],
        _laterKey: [keyB],
      });
      final container = ProviderContainer();
      addTearDown(container.dispose);

      container.read(ankiResultsProvider);
      await Future<void>.delayed(const Duration(milliseconds: 20));

      final state = container.read(ankiResultsProvider);
      expect(state[keyA], true);
      expect(state[keyB], false);
      expect(state.containsKey(ankiCardKey('2', _deck2.cards[0])), isFalse);
    });

    test('複合キーはデッキをまたいで同名 front を区別する', () {
      expect(
        ankiCardKey('1', _deck1.cards[0]),
        isNot(ankiCardKey('2', _deck2.cards[0])),
      );
    });
  });

  group('集計ヘルパ', () {
    test('unknownAnkiSessionCards は未評価と「まだ」を返し、覚えたを除く', () {
      final results = {
        ankiCardKey('1', _deck1.cards[0]): true, // 覚えた → 除外
        ankiCardKey('1', _deck1.cards[1]): false, // まだ → 含む
        // deck2 の用語A は未評価 → 含む
      };
      final unknown = unknownAnkiSessionCards([_deck1, _deck2], results);
      expect(unknown.map((s) => (s.deckId, s.card.front)), [
        ('1', '用語B'),
        ('2', '用語A'),
      ]);
    });

    test('knownCountOf は存在するカードの覚えた数だけを数える', () {
      final results = {
        ankiCardKey('1', _deck1.cards[0]): true,
        ankiCardKey('1', _deck1.cards[1]): true,
        'stale key': true, // 存在しないキーは無視
      };
      expect(knownCountOf(_deck1, results), 2);
      expect(knownCountOf(_deck2, results), 0);
    });

    test('allAnkiSessionCards は全デッキを deckId 付きで平坦化する', () {
      final all = allAnkiSessionCards([_deck1, _deck2]);
      expect(all.length, 3);
      expect(all.map((s) => s.deckId), ['1', '1', '2']);
    });
  });
}
