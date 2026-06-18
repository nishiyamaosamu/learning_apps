import 'dart:io';
import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ipa_ip/animations/common/common.dart' show motionDurationLong;

/// プレビューで使う本物のフォント family 名。テスト既定フォントは全文字を
/// 豆腐（□）で描くため、実フォントを読み込んでこの family に割り当てる。
const previewFontFamily = 'PreviewText';

bool _fontsLoaded = false;

/// 日本語テキストとアイコンを実フォントで描けるよう読み込む（macOS想定・初回のみ）。
///
/// 見つからない環境では静かにスキップする（その場合プレビューは豆腐になるが、
/// レイアウト・配置・色・phase 進行の確認には使える）。
///
/// 実 I/O を含むため、テストでは `tester.runAsync(ensurePreviewFonts)` の形で
/// 呼ぶこと（fake-async ゾーンでは Future が完了しない）。
Future<void> ensurePreviewFonts() async {
  if (_fontsLoaded) return;
  _fontsLoaded = true;

  // 日本語を含むテキスト用（Arial Unicode は CJK を含む単一 TTF）。
  for (final path in const [
    '/System/Library/Fonts/Supplemental/Arial Unicode.ttf',
    '/Library/Fonts/Arial Unicode.ttf',
  ]) {
    final f = File(path);
    if (f.existsSync()) {
      final loader = FontLoader(previewFontFamily)
        ..addFont(_bytes(f));
      await loader.load();
      break;
    }
  }

  // Material アイコン用（Flutter キャッシュから dart 実行ファイル経由で探す）。
  final iconFont = _findMaterialIconsFont();
  if (iconFont != null) {
    final loader = FontLoader('MaterialIcons')..addFont(_bytes(iconFont));
    await loader.load();
  }
}

Future<ByteData> _bytes(File f) async {
  final data = await f.readAsBytes();
  return ByteData.view(Uint8List.fromList(data).buffer);
}

/// dart 実行ファイル（`.../flutter/<ver>/bin/cache/dart-sdk/bin/dart`）から
/// `bin/cache/artifacts/material_fonts/MaterialIcons-Regular.otf` を辿る。
File? _findMaterialIconsFont() {
  var dir = File(Platform.resolvedExecutable).parent; // .../dart-sdk/bin
  for (var i = 0; i < 6; i++) {
    final candidate = File(
      '${dir.path}/artifacts/material_fonts/MaterialIcons-Regular.otf',
    );
    if (candidate.existsSync()) return candidate;
    dir = dir.parent;
  }
  return null;
}

/// phase n → n+1 の**遷移そのもの**を、途中フレームを並べた1枚のフィルムストリップ
/// PNG に書き出す（静止画の到達状態だけでは見えない「動き」を確認するため）。
///
/// 各 phase 境界について `framesPerTransition` 枚を等間隔でキャプチャし、横一列に
/// 合成して `animation_previews/<name>/transition_<n>_to_<n+1>.png` に出力する。
/// Remotion の「任意フレームを still で確認する」考え方を取り入れたもの。
Future<void> renderPhaseTransitions({
  required WidgetTester tester,
  required String name,
  required int phaseCount,
  required Widget Function(BuildContext context, int step) builder,
  Size size = const Size(390, 219),
  int framesPerTransition = 5,
  double pixelRatio = 2.0,
  Color seedColor = Colors.teal,
}) async {
  await tester.runAsync(ensurePreviewFonts);
  await tester.binding.setSurfaceSize(size);
  addTearDown(() => tester.binding.setSurfaceSize(null));

  final dir = Directory('animation_previews/$name');
  dir.createSync(recursive: true);

  Widget tree(GlobalKey key, int step) => MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: seedColor),
          fontFamily: previewFontFamily,
        ),
        home: Scaffold(
          body: Center(
            child: SizedBox(
              width: size.width,
              height: size.height,
              child: RepaintBoundary(
                key: key,
                child: Builder(builder: (context) => builder(context, step)),
              ),
            ),
          ),
        ),
      );

  for (var n = 0; n < phaseCount - 1; n++) {
    final key = GlobalKey();
    final frames = <ui.Image>[];

    // phase n の到達状態から始める。
    await tester.pumpWidget(tree(key, n));
    await tester.pumpAndSettle();
    frames.add(await _capture(tester, key, pixelRatio));

    // 同じ要素のまま step を n+1 にして遷移を起こし、等間隔でキャプチャ。
    await tester.pumpWidget(tree(key, n + 1));
    final stepDur = motionDurationLong ~/ (framesPerTransition - 1);
    for (var j = 1; j < framesPerTransition; j++) {
      await tester.pump(stepDur);
      frames.add(await _capture(tester, key, pixelRatio));
    }
    await tester.pumpAndSettle();

    final bytes = await _compositeRow(tester, frames, 8 * pixelRatio);
    File('${dir.path}/transition_${n}_to_${n + 1}.png').writeAsBytesSync(bytes);
    for (final f in frames) {
      f.dispose();
    }
  }
}

/// 現在描画中のフレームを ui.Image として取り出す。
Future<ui.Image> _capture(
  WidgetTester tester,
  GlobalKey key,
  double pixelRatio,
) async {
  final boundary =
      key.currentContext!.findRenderObject() as RenderRepaintBoundary;
  late final ui.Image image;
  await tester.runAsync(() async {
    image = await boundary.toImage(pixelRatio: pixelRatio);
  });
  return image;
}

/// 複数フレームを横一列に合成して PNG バイト列にする。
Future<List<int>> _compositeRow(
  WidgetTester tester,
  List<ui.Image> images,
  double gap,
) async {
  late final List<int> out;
  await tester.runAsync(() async {
    final h = images.map((i) => i.height).reduce(math.max).toDouble();
    final w = images.fold<double>(0, (a, i) => a + i.width) +
        gap * (images.length - 1);
    final recorder = ui.PictureRecorder();
    final canvas = Canvas(recorder);
    canvas.drawRect(
      Rect.fromLTWH(0, 0, w, h),
      Paint()..color = const Color(0xFFECEFEE),
    );
    var x = 0.0;
    for (final img in images) {
      canvas.drawImage(img, Offset(x, 0), Paint());
      x += img.width + gap;
    }
    final picture = recorder.endRecording();
    final composite = await picture.toImage(w.ceil(), h.ceil());
    final data = await composite.toByteData(format: ui.ImageByteFormat.png);
    out = data!.buffer.asUint8List();
    composite.dispose();
  });
  return out;
}

/// 図解アニメの各 phase を「到達状態」の静止画 PNG として書き出す。
///
/// lesson-animation スキルが生成物の見た目を確認するための共通ハーネス。
/// `flutter test` 実行ディレクトリ（= apps/ipa_ip）配下の
/// `animation_previews/<name>/phase_<i>.png` に出力する。
///
/// アニメ途中の中間フレームではなく、各 phase の最終状態を撮る
/// （遷移そのものは実機プレビューで確認する方針）。
Future<void> renderPhasesToPng({
  required WidgetTester tester,
  required String name,
  required int phaseCount,
  required Widget Function(BuildContext context, int step) builder,
  // 実機の上部枠に近いサイズ（16:9・横幅390pt相当）。これより大きく描くと
  // 固定ptの文字が実機では収まらず切れる（PNGと実機の乖離の原因）ため、
  // 実機に近い小さめのサイズを既定にする。
  Size size = const Size(390, 219),
  double pixelRatio = 3.0,
  Color seedColor = Colors.teal,
}) async {
  // フォント読み込みは実 I/O のため runAsync 内で行う（fake-async ゾーンでは
  // Future が完了せずハングする）。
  await tester.runAsync(ensurePreviewFonts);

  final dir = Directory('animation_previews/$name');
  dir.createSync(recursive: true);

  for (var phase = 0; phase < phaseCount; phase++) {
    final key = GlobalKey();
    await tester.pumpWidget(
      MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: seedColor),
          fontFamily: previewFontFamily,
        ),
        home: Scaffold(
          body: Center(
            child: SizedBox(
              width: size.width,
              height: size.height,
              child: RepaintBoundary(
                key: key,
                child: Builder(builder: (context) => builder(context, phase)),
              ),
            ),
          ),
        ),
      ),
    );
    // 暗黙アニメを目標値まで落ち着かせてから撮る。
    await tester.pumpAndSettle();

    final boundary =
        key.currentContext!.findRenderObject() as RenderRepaintBoundary;
    late final List<int> pngBytes;
    await tester.runAsync(() async {
      final image = await boundary.toImage(pixelRatio: pixelRatio);
      final data = await image.toByteData(format: ui.ImageByteFormat.png);
      pngBytes = data!.buffer.asUint8List();
      image.dispose();
    });
    File('${dir.path}/phase_$phase.png').writeAsBytesSync(pngBytes);
  }
}
