import 'package:engine/engine.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('5つのタブが表示される', (WidgetTester tester) async {
    await tester.pumpWidget(
      const EngineApp(
        config: AppConfig(title: 'IPA発音'),
      ),
    );
    await tester.pump();

    for (final label in const ['ホーム', '講座', '問題集', '暗記カード', '設定']) {
      expect(find.text(label), findsWidgets);
    }
  });
}
