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

コンテンツ制作補助スクリプトはPythonで管理。依存は各スクリプト先頭のインラインメタデータ（PEP 723）に宣言し、`mise exec -- uv run <script>.py` で実行する（uv・Pythonはmiseでインストール、環境はuvが自動管理）。サービスアカウントJSONは `secrets/`（.gitignore対象）に配置する。

## 音声生成（content_works/scripts/tts.py）
Google Cloud TTS（Gemini TTS、デフォルト: voice `Zephyr` / model `gemini-3.1-flash-tts-preview` / ja-JP / MP3）でナレーション音声を生成するCLI。

```bash
cd content_works/scripts

# 単発（動作確認など）
mise exec -- uv run tts.py --text "読み上げテキスト" --out /path/to/file.mp3

# 一括（レッスン音声の生成）
mise exec -- uv run tts.py --jobs jobs.json --out-dir ../../apps/<app>/contents/lessons/audios
```

ジョブJSONは出力ファイル名→テキストのフラットな辞書:

```json
{
  "1-1.mp3": "企業は、製品やサービスを社会に提供し…",
  "1-2.mp3": "次に、経営資源について…"
}
```

- 音声はアプリの `contents/lessons/audios/{lessonId}-{pageIndex}.mp3` に置き、レッスンJSONから `audioUrl: lessons/audios/{lessonId}-{pageIndex}.mp3` で参照する
- 読み上げテキストはMarkdown記号を除いた「耳で聞いて自然な」文にする（レッスンJSONの本文とは別物）

# engineパッケージ仕様

## 技術スタック
- 状態管理: Riverpod（riverpod_generator + build_runner でコード生成）
- ルーティング: go_router
- データクラス: freezed
- 音声再生: audioplayers

## 設計方針
- 個別アプリは `main.dart` で `EngineApp` に `AppConfig` を渡すだけで動く
- 画面はタブシェルを起点に固定。下部タブはengineが提供し、アプリは使うタブと並び順を `AppConfig.tabs` で選択する（先頭のタブが初期表示＝メイン）
- レッスン等の詳細画面はタブシェルのサブルートとして全画面pushされる（`/lessons/:id`, `/exercises/:id`, `/anki/:id`）
- UIテーマ・タイトルも `AppConfig` で設定する
- 表示するコンテンツはアプリ側アセット（JSON）として持ち、engineが都度ロードする

## AppConfig（`package:engine/engine.dart`）
```dart
AppConfig({
  required String title,            // アプリ名
  Color primaryColor,              // テーマカラー（デフォルト: Colors.indigo）
  List<EngineTab> tabs,            // 下部のタブと並び順（デフォルト: 全タブ／先頭がメイン）
  String contentBasePath,         // コンテンツアセットのベースパス（デフォルト: 'contents'）
})
```

## EngineTab（下部のタブ一覧）
| enum値 | ラベル | 説明 |
|--------|--------|------|
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
      tabs: [EngineTab.lesson, EngineTab.exercise, EngineTab.anki, EngineTab.settings],
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
- **1ページの分量**: コンテンツページが iPhone 17 で1ページに収まる（縮小されない）かの設計指針と機械チェックは [docs/PAGE_FIT.md](docs/PAGE_FIT.md) を参照。レッスン作成後は `cd apps/ipa_ip && mise exec -- flutter test test/page_fit_test.dart` で各ページの usage を確認する

## コード生成
engineパッケージでfreezed/riverpodのコードを変更した場合は再生成が必要：
```
cd engine && mise exec -- dart run build_runner build --delete-conflicting-outputs
```

# ipa_ipアプリ
- ITパスポート試験対策アプリ
- タブ: 講座・問題集・暗記カード・設定
- コンテンツは `apps/ipa_ip/contents/` 配下にJSONで管理（`base.json` と `lessons/{id}.json` など）

# 画像生成
画像生成が必要なときは、以下の形式でCodexを呼び出してください。

codex exec --sandbox workspace-write "
この画像が使われるレイアウトは、下記内容テキストの下に配置されるため、説明的なテキストは不要です。単語として分かるものはOKです。タイトルも不要です。書き込み量は少なくしましょう。サイズは<w:h>でお願いします。
柔らかく、明るい色合いの、日本語のインフォグラフィックスタイルです。
余白はすでに確保されているため、余白は不要です。スマートフォンの縦型画面で表示されることを想定して、細かい書き込みは避け、シンプルにしてください。
重要キーワードのオブジェクトはより目立つように、背景部分はシンプルに保ちましょう。
内容:
<ここに画像の内容を日本語で簡潔に記述してください>
"