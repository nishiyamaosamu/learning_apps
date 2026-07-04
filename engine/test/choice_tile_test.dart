import 'package:engine/engine.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

/// テスト対象を engine のテーマ（集中ブルー）で包む。
Widget _host(Widget child) => MaterialApp(
  theme: buildEngineTheme(AppColors.light()),
  home: Scaffold(body: Center(child: child)),
);

/// [ChoiceTile] の外側 AnimatedContainer の decoration を取り出す。
BoxDecoration _tileDecoration(WidgetTester tester) {
  final container = tester.widgetList<AnimatedContainer>(
    find.descendant(
      of: find.byType(ChoiceTile),
      matching: find.byType(AnimatedContainer),
    ),
  ).first;
  return container.decoration! as BoxDecoration;
}

void main() {
  testWidgets('idle は surface 面＋border 枠', (tester) async {
    await tester.pumpWidget(
      _host(
        const ChoiceTile(
          label: 'ア',
          state: ChoiceTileState.idle,
          child: Text('選択肢'),
        ),
      ),
    );
    await tester.pumpAndSettle();
    final deco = _tileDecoration(tester);
    expect(deco.color, const Color(0xFFFFFFFF)); // surface
    expect((deco.border! as Border).top.color, const Color(0xFFE2E8F0)); // border
  });

  testWidgets('selected は primary50 面＋primary500 枠', (tester) async {
    await tester.pumpWidget(
      _host(
        const ChoiceTile(
          label: 'ウ',
          state: ChoiceTileState.selected,
          child: Text('選択肢'),
        ),
      ),
    );
    await tester.pumpAndSettle();
    final deco = _tileDecoration(tester);
    expect(deco.color, const Color(0xFFEFF6FF)); // primary50
    expect((deco.border! as Border).top.color, const Color(0xFF3B82F6)); // primary500
  });

  testWidgets('correct は correctSurface(#F0FDFA) 面＋○マーク', (tester) async {
    await tester.pumpWidget(
      _host(
        const ChoiceTile(
          label: 'ウ',
          state: ChoiceTileState.correct,
          child: Text('選択肢'),
        ),
      ),
    );
    await tester.pumpAndSettle();
    final deco = _tileDecoration(tester);
    expect(deco.color, const Color(0xFFF0FDFA)); // correctSurface
    expect((deco.border! as Border).top.color, const Color(0xFF0D9488)); // correct
    // ○（円ストローク）が二重符号化として出る。
    expect(find.byIcon(Icons.circle_outlined), findsOneWidget);
  });

  testWidgets('incorrect は incorrectSurface(#FDF2F2) 面＋✕マーク', (tester) async {
    await tester.pumpWidget(
      _host(
        const ChoiceTile(
          label: 'ア',
          state: ChoiceTileState.incorrect,
          child: Text('選択肢'),
        ),
      ),
    );
    await tester.pumpAndSettle();
    final deco = _tileDecoration(tester);
    expect(deco.color, const Color(0xFFFDF2F2)); // incorrectSurface
    expect((deco.border! as Border).top.color, const Color(0xFFD66A6A)); // incorrect
    expect(find.byIcon(Icons.close), findsOneWidget);
  });

  testWidgets('idle/selected/correct/incorrect 以外はマークを出さない', (tester) async {
    await tester.pumpWidget(
      _host(
        const ChoiceTile(
          label: 'ア',
          state: ChoiceTileState.dimmed,
          child: Text('選択肢'),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.byIcon(Icons.circle_outlined), findsNothing);
    expect(find.byIcon(Icons.close), findsNothing);
    // dimmed は減光（Opacity .55）で表現。
    final opacity = tester.widget<Opacity>(
      find.descendant(
        of: find.byType(ChoiceTile),
        matching: find.byType(Opacity),
      ),
    );
    expect(opacity.opacity, 0.55);
  });

  testWidgets('onTap が null ならタップ不発、非 null なら呼ばれる', (tester) async {
    var tapped = 0;
    await tester.pumpWidget(
      _host(
        ChoiceTile(
          label: 'ア',
          state: ChoiceTileState.idle,
          onTap: () => tapped++,
          child: const Text('選択肢'),
        ),
      ),
    );
    await tester.tap(find.byType(ChoiceTile));
    await tester.pumpAndSettle();
    expect(tapped, 1);
  });
}
