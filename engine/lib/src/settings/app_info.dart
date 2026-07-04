import 'package:package_info_plus/package_info_plus.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'app_info.g.dart';

/// アプリのパッケージ情報（バージョン・ビルド番号など）。
///
/// 設定タブのバージョン表示で使う。プラットフォーム由来のため非同期に一度だけ
/// 読み込み、以降はキャッシュする。テストでは
/// `PackageInfo.setMockInitialValues(...)` で差し込む。
@riverpod
Future<PackageInfo> packageInfo(PackageInfoRef ref) =>
    PackageInfo.fromPlatform();
