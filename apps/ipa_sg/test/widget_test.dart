import 'package:engine/engine.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('下部タブに動画講座・問題集・暗記カード・設定が表示される', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      const EngineApp(
        config: AppConfig(title: '情報セキュリティマネジメント'),
      ),
    );
    await tester.pump();

    for (final label in const ['動画講座', '問題集', '暗記カード', '設定']) {
      expect(find.text(label), findsWidgets);
    }
  });
}
