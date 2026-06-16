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
├── apps/
│   └── ipa_ip/        # 個別学習アプリ
├── content_works/
│   └── scripts/       # コンテンツ制作補助スクリプト（Python: TTSなど）
└── docs/
    └── LESSON.md      # レッスンコンテンツ（JSON）の構造仕様
```

コンテンツ制作補助スクリプトはPythonで管理（miseでインストール）。`content_works/scripts/tts.py` はGoogle Cloud Text-to-Speechでレッスン音声を生成する。サービスアカウントJSONは `secrets/`（.gitignore対象）に配置する。

# engineパッケージ仕様

## 技術スタック
- 状態管理: Riverpod（riverpod_generator + build_runner でコード生成）
- ルーティング: go_router
- データクラス: freezed
- 音声再生: audioplayers

## 設計方針
- 個別アプリは `main.dart` で `EngineApp` に `AppConfig` を渡すだけで動く
- 画面はホーム（タブシェル）を起点に固定。下部タブはengineが提供し、アプリは使うタブと並び順を `AppConfig.tabs` で選択する
- レッスン等の詳細画面はホームのサブルートとして全画面pushされる（`/lessons/:id`, `/exercises/:id`, `/anki/:id`）
- UIテーマ・タイトルも `AppConfig` で設定する
- 表示するコンテンツはアプリ側アセット（JSON）として持ち、engineが都度ロードする

## AppConfig（`package:engine/engine.dart`）
```dart
AppConfig({
  required String title,            // アプリ名
  Color primaryColor,              // テーマカラー（デフォルト: Colors.indigo）
  List<EngineTab> tabs,            // ホーム下部のタブと並び順（デフォルト: 全タブ）
  String contentBasePath,         // コンテンツアセットのベースパス（デフォルト: 'contents'）
})
```

## EngineTab（ホーム下部のタブ一覧）
| enum値 | ラベル | 説明 |
|--------|--------|------|
| `EngineTab.home` | ホーム | ホーム |
| `EngineTab.lesson` | 講座 | レッスン一覧 |
| `EngineTab.exercise` | 問題集 | 演習一覧 |
| `EngineTab.anki` | 暗記カード | 暗記カード一覧 |
| `EngineTab.settings` | 設定 | 設定 |

## 個別アプリのmain.dart最小構成
```dart
void main() {
  runApp(EngineApp(
    config: AppConfig(
      title: 'アプリ名',
      primaryColor: Colors.teal,
      tabs: [EngineTab.home, EngineTab.lesson, EngineTab.exercise, EngineTab.anki, EngineTab.settings],
    ),
  ));
}
```

## コンテンツ（アプリ側アセット）
- `contentBasePath`（デフォルト `contents/`）配下にJSONで配置し、`pubspec.yaml` の `flutter.assets` に登録する
- `base.json`: レッスン・演習・暗記カードの一覧（id・title）
- `lessons/{id}.json`: 1レッスンの中身（ページ列とミニクイズ）。構造の仕様は [docs/LESSON.md](docs/LESSON.md) を参照
- `lessons/audios/`: レッスン本文のナレーション音声（mp3）
- レッスンコンテンツは `type` を discriminator とするフラットなunion（text / image / quizMultipleChoice / quizFillInTheBlank）

## コード生成
engineパッケージでfreezed/riverpodのコードを変更した場合は再生成が必要：
```
cd engine && mise exec -- dart run build_runner build --delete-conflicting-outputs
```

# ipa_ipアプリ
- ITパスポート試験対策アプリ
- タブ: ホーム・講座・問題集・暗記カード・設定
- コンテンツは `apps/ipa_ip/contents/` 配下にJSONで管理（`base.json` と `lessons/{id}.json` など）
