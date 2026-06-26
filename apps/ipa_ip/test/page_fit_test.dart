// レッスン各ページが iPhone 17 基準で「1ページに収まるか（縮小されないか）」を
// 機械的に判定するテスト。
//
// 仕組み:
//   レッスンカードは _LessonCard の FittedBox(scaleDown) により、本文が領域を
//   超えると全体を縮小して押し込む（はみ出しはしない）。したがって「収まって
//   いる」= 本文の原寸の高さ <= カードが原寸表示で使える高さ（maxHeight）。
//   このテストは実際の描画と同じ buildLessonCardColumn / MarkdownText で本文を
//   組み、原寸の高さを計測して使用率（usage = 高さ / 予算）を出す。
//
// 精度について:
//   Material 3 タイポグラフィは行高を明示指定しているため、テスト用フォントでも
//   行高は実機と一致する。字送り幅は CJK ではほぼ一致、ラテン文字では過大評価
//   （= 高さを安全側に見積もる）。残差を吸収するため _tightThreshold の余裕を持つ。
//
// 実行: cd apps/ipa_ip && mise exec -- flutter test test/page_fit_test.dart
import 'dart:convert';
import 'dart:io';

import 'package:engine/engine.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ipa_ip/app_design.dart';

/// iPhone 17（論理 402 × 874pt, セーフエリア 上59 / 下34）。
/// 機種を変えたいときはここを差し替える。
const _screen = Size(402, 874);
const _viewPadding = EdgeInsets.only(top: 59, bottom: 34);

/// 使用率の判定閾値。
///
/// テスト用フォントは実機よりも高さを過大評価する（実測: レッスン1 p9 は実機
/// デバッグバッジで 99% だが、本テストでは 103%。約4ポイント高く出る）。この
/// 過大評価ぶんを吸収するため、NG 判定は 105% 超で行う。実機の正確な値は
/// デバッグビルドのカード右上バッジ（_FitBadge）で確認する。
const _overThreshold = 1.05;

/// 90〜105% は「ギリギリ」として警告のみ（実機で縮む可能性があるため削ると安全）。
const _tightThreshold = 0.90;

/// 画像が見つからないときに _LessonCard が出すプレースホルダの高さ。
const _missingImageHeight = 120.0;

/// 1ページ分の計測結果。
class _PageResult {
  _PageResult(this.lessonFile, this.lessonTitle, this.pageIndex, this.summary,
      this.height, this.usage);
  final String lessonFile;
  final String lessonTitle;
  final int pageIndex; // 1始まり
  final String summary;
  final double height;
  final double usage;

  bool get isOver => usage > _overThreshold;
  bool get isTight => usage >= _tightThreshold && usage <= _overThreshold;
  String get verdict => isOver
      ? 'NG（縮小）'
      : isTight
          ? 'ギリギリ'
          : 'OK';
}

void main() {
  // 実機（EngineApp）と同一のテーマを構築する。本文のフォント寸法はテーマ依存。
  final colorScheme = ipaIpDesignScheme.toColorScheme();
  final theme = ThemeData(
    useMaterial3: true,
    colorScheme: colorScheme,
    scaffoldBackgroundColor: colorScheme.surface,
  );

  final fit = lessonCardFitBox(screen: _screen, viewPadding: _viewPadding);
  final contentWidth = fit.maxWidth - LessonCardMetrics.cardPadding.horizontal;

  final contentsDir = Directory('contents');
  final lessonsDir = Directory('${contentsDir.path}/lessons');
  final lessonFiles =
      lessonsDir
          .listSync()
          .whereType<File>()
          .where((f) => f.path.endsWith('.json'))
          .toList()
        ..sort((a, b) => a.path.compareTo(b.path));

  final results = <_PageResult>[];

  for (final file in lessonFiles) {
    final name = file.uri.pathSegments.last;
    final lesson = Lesson.fromJson(
      jsonDecode(file.readAsStringSync()) as Map<String, dynamic>,
    );

    for (var p = 0; p < lesson.pages.length; p++) {
      final page = lesson.pages[p];

      testWidgets('$name p${p + 1} が1ページに収まる', (tester) async {
        final blocks = <Widget>[
          for (final b in page.blocks)
            if (b.imageUrl != null)
              _imagePlaceholder(contentsDir.path, b.imageUrl!)
            else if (b.text != null && b.text!.isNotEmpty)
              MarkdownText(text: b.text!),
        ];

        const measureKey = ValueKey('measure');
        await tester.pumpWidget(
          MaterialApp(
            theme: theme,
            home: MediaQuery(
              data: const MediaQueryData(
                size: _screen,
                padding: _viewPadding,
                textScaler: TextScaler.noScaling,
              ),
              child: Scaffold(
                body: SingleChildScrollView(
                  child: Align(
                    alignment: Alignment.topLeft,
                    child: SizedBox(
                      width: fit.maxWidth,
                      child: KeyedSubtree(
                        key: measureKey,
                        child: buildLessonCardColumn(
                          title: page.title,
                          blocks: blocks,
                          theme: theme,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );

        final naturalHeight = tester.getSize(find.byKey(measureKey)).height;
        results.add(_PageResult(name, lesson.title, p + 1, _blocksSummary(page),
            naturalHeight, naturalHeight / fit.maxHeight));
      });
    }
  }

  tearDownAll(() {
    results.sort((a, b) {
      final c = a.lessonFile.compareTo(b.lessonFile);
      return c != 0 ? c : a.pageIndex.compareTo(b.pageIndex);
    });

    final report = StringBuffer()
      ..writeln('')
      ..writeln('=== ページ分量チェック（iPhone 17 / 402×874pt）===')
      ..writeln('本文が原寸で使える領域: 高さ ${fit.maxHeight.toStringAsFixed(0)}pt'
          ' / 幅 ${fit.maxWidth.toStringAsFixed(0)}pt'
          '（本文幅 ${contentWidth.toStringAsFixed(0)}pt）')
      ..writeln('usage = 本文高さ / ${fit.maxHeight.toStringAsFixed(0)}pt'
          '（テスト用フォントのため実機より数%高め）。'
          ' >105% で NG、90〜105% はギリギリ。実機の正確値はデバッグバッジ参照。');

    String? currentFile;
    for (final r in results) {
      if (r.lessonFile != currentFile) {
        currentFile = r.lessonFile;
        report.writeln('\n▼ ${r.lessonFile}  「${r.lessonTitle}」');
      }
      report.writeln('  p${r.pageIndex.toString().padLeft(2)}'
          '  ${r.height.toStringAsFixed(0).padLeft(4)}pt'
          '  ${(r.usage * 100).toStringAsFixed(0).padLeft(3)}%'
          '  ${r.verdict.padRight(7)}'
          '  | ${r.summary}');
    }

    final over = results.where((r) => r.isOver).toList();
    // ignore: avoid_print
    print(report.toString());
    if (over.isNotEmpty) {
      final list = over
          .map((r) => '${r.lessonFile} p${r.pageIndex} '
              '(${(r.usage * 100).toStringAsFixed(0)}%)')
          .join(', ');
      // ignore: avoid_print
      print('\n⚠️  1ページに収まらないページ: $list\n');
    }

    // CIゲート: 縮小されるページがあれば失敗させる。
    expect(over, isEmpty,
        reason: '次のページが iPhone 17 で1ページに収まらず縮小されます: '
            '${over.map((r) => '${r.lessonFile} p${r.pageIndex}').join(', ')}');
  });
}

/// 画像ブロックの高さを再現する。実ファイルの寸法から BoxFit.fitWidth 相当の
/// アスペクト比でレイアウトする（見つからなければプレースホルダ高さ）。
Widget _imagePlaceholder(String contentsPath, String imageUrl) {
  final file = File('$contentsPath/$imageUrl');
  final size = file.existsSync() ? _pngSize(file.readAsBytesSync()) : null;
  if (size == null) {
    return const SizedBox(height: _missingImageHeight);
  }
  return AspectRatio(
    aspectRatio: size.width / size.height,
    child: const SizedBox.expand(),
  );
}

/// PNG ヘッダ（IHDR）から幅・高さを読む。PNG 以外は null。
Size? _pngSize(List<int> bytes) {
  const sig = [137, 80, 78, 71, 13, 10, 26, 10];
  if (bytes.length < 24) return null;
  for (var i = 0; i < sig.length; i++) {
    if (bytes[i] != sig[i]) return null;
  }
  int be32(int o) =>
      (bytes[o] << 24) | (bytes[o + 1] << 16) | (bytes[o + 2] << 8) | bytes[o + 3];
  return Size(be32(16).toDouble(), be32(20).toDouble());
}

String _blocksSummary(ContentPage page) {
  final parts = <String>[];
  for (final b in page.blocks) {
    if (b.imageUrl != null) {
      parts.add('画像');
    } else if (b.text != null) {
      parts.add('文字${b.text!.replaceAll(RegExp(r'\s'), '').length}');
    }
  }
  return parts.join('+');
}
