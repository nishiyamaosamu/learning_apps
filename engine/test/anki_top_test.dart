import 'package:engine/engine.dart';
import 'package:engine/src/screens/tabs/anki_top.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _deck1 = AnkiDeck(
  id: '1',
  title: '企業活動のことば',
  cards: [
    AnkiCard(front: '用語A', back: '意味A'),
    AnkiCard(front: '用語B', back: '意味B'),
  ],
);
const _deck2 = AnkiDeck(
  id: '2',
  title: '経営戦略のことば',
  cards: [AnkiCard(front: '用語C', back: '意味C')],
);

const _index = ContentIndex(
  anki: [
    AnkiGroup(
      id: 'basics',
      title: 'デッキ',
      anki: [
        ContentSummary(id: '1', title: '企業活動のことば', cardCount: 2),
        ContentSummary(id: '2', title: '経営戦略のことば', cardCount: 1),
      ],
    ),
  ],
);

Widget _host() => ProviderScope(
  overrides: [
    appConfigProvider.overrideWithValue(const AppConfig(title: '暗記テスト')),
    contentIndexProvider.overrideWith((ref) async => _index),
    allAnkiDecksProvider.overrideWith((ref) async => [_deck1, _deck2]),
  ],
  child: MaterialApp(
    theme: buildEngineTheme(AppColors.light()),
    home: const AnkiTop(),
  ),
);

void main() {
  testWidgets('覚えた0枚: 0%・0/3・主導線あり・副導線あり', (tester) async {
    SharedPreferences.setMockInitialValues({});
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    // 覚えた率 0%（全3枚未評価）。
    expect(find.text('覚えた'), findsOneWidget);
    expect(find.text('0%'), findsOneWidget);
    // 章ヘッダー右端「覚えた / 総語数」。
    expect(find.text('0 / 3'), findsOneWidget);
    // 両導線。
    expect(find.text('覚えていないカードから10問'), findsOneWidget);
    expect(find.text('全カードから10問'), findsOneWidget);
  });

  testWidgets('一部覚えた: 覚えた率・語数に反映され、フィルが潰れない', (tester) async {
    // deck1 の 2 枚を覚えた → 3 枚中 2 枚 = 67%、2 / 3。
    SharedPreferences.setMockInitialValues({
      'anki.knownCards': [
        ankiCardKey('1', _deck1.cards[0]),
        ankiCardKey('1', _deck1.cards[1]),
      ],
    });
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    expect(find.text('67%'), findsOneWidget);
    expect(find.text('2 / 3'), findsOneWidget);
    // 主導線は残り1枚（用語C）があるので表示。
    expect(find.text('覚えていないカードから10問'), findsOneWidget);

    // 覚えたバーのフィル（primary600）が高さ0に潰れていない。
    final colors = AppColors.light();
    final fill = tester.getSize(
      find.byWidgetPredicate(
        (w) => w is ColoredBox && w.color == colors.primary600,
      ),
    );
    expect(fill.height, greaterThan(0));
  });

  testWidgets('全カード覚えた: 100%・主導線は非表示・副導線は残る', (tester) async {
    SharedPreferences.setMockInitialValues({
      'anki.knownCards': [
        ankiCardKey('1', _deck1.cards[0]),
        ankiCardKey('1', _deck1.cards[1]),
        ankiCardKey('2', _deck2.cards[0]),
      ],
    });
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    expect(find.text('100%'), findsOneWidget);
    expect(find.text('3 / 3'), findsOneWidget);
    // 覚えていないカードが0枚 → 主導線は非表示。
    expect(find.text('覚えていないカードから10問'), findsNothing);
    // 副導線は存続。
    expect(find.text('全カードから10問'), findsOneWidget);
  });

  testWidgets('主導線タップで覚えていないカードの学習セッションが始まる', (tester) async {
    // deck1 の 2 枚を覚えた → 残りは 用語C のみ。
    SharedPreferences.setMockInitialValues({
      'anki.knownCards': [
        ankiCardKey('1', _deck1.cards[0]),
        ankiCardKey('1', _deck1.cards[1]),
      ],
    });
    await tester.pumpWidget(_host());
    await tester.pumpAndSettle();

    await tester.tap(find.text('覚えていないカードから10問'));
    await tester.pumpAndSettle();

    // 学習画面（表面）に未評価の意味Cが出る。
    expect(find.text('意味C'), findsOneWidget);
  });
}
