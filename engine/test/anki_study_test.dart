import 'package:engine/engine.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

Widget _app(Widget home) =>
    MaterialApp(theme: buildEngineTheme(AppColors.light()), home: home);

const _cards = [
  AnkiCard(front: '用語A', back: '意味A'),
  AnkiCard(front: '用語B', back: '意味B'),
];

void main() {
  testWidgets('表→タップ→裏（用語が表示される）', (tester) async {
    await tester.pumpWidget(
      _app(
        const AnkiStudyScreen(
          cards: _cards,
          title: 'テストデッキ',
          deckLabel: 'テストデッキ',
        ),
      ),
    );
    await tester.pumpAndSettle();

    // 表：意味が出て、用語（front）はまだ出ない。ヒントも出る。
    expect(find.text('意味A'), findsOneWidget);
    expect(find.text('用語A'), findsNothing);
    expect(find.text('タップで用語を表示'), findsOneWidget);

    // カードをタップ → フリップして裏（用語）を表示。
    await tester.tap(find.text('意味A'));
    await tester.pumpAndSettle();
    expect(find.text('用語A'), findsOneWidget);
  });

  testWidgets('裏で「覚えた」→次のカードへ進む', (tester) async {
    await tester.pumpWidget(
      _app(
        const AnkiStudyScreen(cards: _cards, title: 'テストデッキ'),
      ),
    );
    await tester.pumpAndSettle();

    // 1枚目を裏返して「覚えた」。
    await tester.tap(find.text('意味A'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('覚えた'));
    await tester.pumpAndSettle();

    // 2枚目の表（意味B）へ。1枚目の用語は消えている。
    expect(find.text('意味B'), findsOneWidget);
    expect(find.text('用語A'), findsNothing);
  });

  testWidgets('最終カード評価後に完了ビュー（CompletionRing）を表示', (tester) async {
    await tester.pumpWidget(
      _app(
        const AnkiStudyScreen(cards: _cards, title: 'テストデッキ'),
      ),
    );
    await tester.pumpAndSettle();

    // 1枚目：覚えた。
    await tester.tap(find.text('意味A'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('覚えた'));
    await tester.pumpAndSettle();

    // 2枚目：まだ。
    await tester.tap(find.text('意味B'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('まだ'));
    await tester.pumpAndSettle();

    // 完了ビュー：CompletionRing・ラベル「覚えた」・「一覧に戻る」。
    expect(find.byType(CompletionRing), findsOneWidget);
    expect(find.text('覚えた'), findsOneWidget); // ring のラベル
    expect(find.text('一覧に戻る'), findsOneWidget);

    // 「まだ」1枚の文言。
    expect(find.textContaining('「まだ」の1枚'), findsOneWidget);
  });

  testWidgets('全カード「覚えた」なら「まだ」0枚の文言', (tester) async {
    await tester.pumpWidget(
      _app(
        const AnkiStudyScreen(
          cards: [AnkiCard(front: '用語X', back: '意味X')],
          title: '単一デッキ',
        ),
      ),
    );
    await tester.pumpAndSettle();

    await tester.tap(find.text('意味X'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('覚えた'));
    await tester.pumpAndSettle();

    expect(find.byType(CompletionRing), findsOneWidget);
    expect(find.textContaining('「まだ」は0枚'), findsOneWidget);
  });

  testWidgets('reduce-motion（disableAnimations）でもフリップが機能する', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: buildEngineTheme(AppColors.light()),
        home: const MediaQuery(
          data: MediaQueryData(disableAnimations: true),
          child: AnkiStudyScreen(
            cards: _cards,
            title: 'reduceデッキ',
            deckLabel: 'reduceデッキ',
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('意味A'), findsOneWidget);
    expect(find.text('用語A'), findsNothing);

    await tester.tap(find.text('意味A'));
    await tester.pumpAndSettle();
    // クロスフェードでも裏面の用語が出る。
    expect(find.text('用語A'), findsOneWidget);
  });
}
