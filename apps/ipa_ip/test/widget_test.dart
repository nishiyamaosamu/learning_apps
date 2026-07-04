import 'package:engine/engine.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('下部タブに動画講座・問題集・暗記カード・設定が表示される', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      const EngineApp(
        config: AppConfig(
          title: 'ITパスポート',
          tabs: [
            EngineTab.video,
            EngineTab.exercise,
            EngineTab.anki,
            EngineTab.settings,
          ],
        ),
      ),
    );
    // コンテンツロードは非同期。タブラベルはロード完了を待たず表示される。
    await tester.pump();

    for (final label in const ['動画講座', '問題集', '暗記カード', '設定']) {
      expect(find.text(label), findsWidgets);
    }
  });
}
