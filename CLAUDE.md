# 概要
- 複数の学習アプリをまとめるリポジトリ
- フレームワーク: Flutter
- iOSとAndroid両方に対応
- 学習アプリのコア機能を提供するエンジンと、個別の学習アプリを分けて管理。
  - engine: 学習アプリのコアアプリケーション。出来るだけ共通化する。
  - apps: 個別の学習アプリ。設定ファイルやコンテンツなどを管理する。
- flutterはmiseでインストール。実行するときは `mise exec -- flutter`を使用してください
- CocoaPodsはBundlerで管理。`pod install` ではなく `bundle exec pod install` を使用してください

# monorepo構成
Dart workspace（Dart 3.6+）で管理。ルートの `pubspec.yaml` にworkspaceを定義し、各パッケージに `resolution: workspace` を設定する。

```
leaning_apps/
├── pubspec.yaml       # Dart workspace定義
├── engine/            # コアエンジンパッケージ
└── apps/
    └── ipa_ip/        # 個別学習アプリ
```

# engineパッケージ仕様

## 技術スタック
- 状態管理: Riverpod（riverpod_generator + build_runner でコード生成）
- ルーティング: go_router
- データクラス: freezed

## 設計方針
- 個別アプリは `main.dart` で `EngineApp` に `AppConfig` を渡すだけで動く
- 画面（Screen）はengineが提供し、アプリは使う画面を `AppConfig.screens` で選択する
- UIテーマ・タイトルも `AppConfig` で設定する

## AppConfig（`package:engine/engine.dart`）
```dart
AppConfig({
  required String title,          // アプリ名
  required List<EngineScreen> screens,  // 使用する画面
  Color primaryColor,             // テーマカラー（デフォルト: Colors.indigo）
})
```

## EngineScreen（現在の画面一覧）
| enum値 | パス | 説明 |
|--------|------|------|
| `EngineScreen.home` | `/` | ホーム（カテゴリ一覧） |
| `EngineScreen.study` | `/study` | 学習画面 |

## 個別アプリのmain.dart最小構成
```dart
void main() {
  runApp(EngineApp(
    config: AppConfig(
      title: 'アプリ名',
      primaryColor: Colors.teal,
      screens: [EngineScreen.home, EngineScreen.study],
    ),
  ));
}
```

## コード生成
engineパッケージでfreezed/riverpodのコードを変更した場合は再生成が必要：
```
cd engine && mise exec -- dart run build_runner build --delete-conflicting-outputs
```

# ipa_ipアプリ
- ITパスポート試験対策アプリ
- 画面: ホーム（カテゴリ一覧）と学習画面
