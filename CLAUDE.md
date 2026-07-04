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
- ※ レッスン本文のナレーション音声（`lessons/audios/`）は現在 legacy（旧テキストレッスン）専用の用途。TTS スクリプト自体は任意の音声生成に使える

# engineパッケージ仕様

## 技術スタック
- 状態管理: Riverpod（riverpod_generator + build_runner でコード生成）
- ルーティング: go_router
- データクラス: freezed
- 音声再生: audioplayers

## 設計方針
- 個別アプリは `main.dart` で `EngineApp` に `AppConfig` を渡すだけで動く
- 画面はタブシェルを起点に固定。下部タブはengineが提供し、アプリは使うタブと並び順を `AppConfig.tabs` で選択する（先頭のタブが初期表示＝メイン）
- 詳細画面（動画視聴・演習・暗記カード）はタブシェルのサブルートとして全画面pushされる（`/videos/:id`, `/exercises/:id`, `/anki/:id`）
- UIテーマ・タイトルも `AppConfig` で設定する
- 表示するコンテンツはアプリ側アセット（JSON）として持ち、engineが都度ロードする

## デザインシステム（集中ブルー）
- トークンの原本は `engine/lib/src/design/`（`AppColors` / `AppTypography` / `AppDimens` / `AppShadows` / `AppMotion` / `AppPrimarySwatch` など）。`AppColors`（`ThemeExtension`）が唯一の真実で、`ColorScheme` はその互換投影
- 新規UIは `context.colors`（`AppColors`）で色を参照する。ハードコード色（`Color(0x…)` 直書き）は禁止（`design/` のトークン定義を除く）
- 旧 `Theme.of(context).semantic`（`AppSemanticColors`）はレガシー互換シムなので**新規コードでは使わない**（`app_theme.dart` が旧コード向けに注入しているだけ）
- デザイン見本（HTML）は [docs/DESIGN.html](docs/DESIGN.html)、engine へ意図的に未実装の項目は [docs/DESIGN_TODO.md](docs/DESIGN_TODO.md) を参照

## AppConfig（`package:engine/engine.dart`）
```dart
AppConfig({
  required String title,            // アプリ名
  AppPrimarySwatch? brandPrimary,  // ブランドの主色ランプ（null=既定の集中ブルー）
  List<EngineTab> tabs,            // 下部のタブと並び順（デフォルト: 全タブ／先頭がメイン）
  String contentBasePath,         // コンテンツアセットのベースパス（デフォルト: 'contents'）
})
```

DESIGN.html「集中ブルー」の RULE 3 に従い、アプリが差し替えられるのは主色（primary 系のランプ = `AppPrimarySwatch`）だけ。`brandPrimary` を省略（null）すると既定の集中ブルーになる。semantic（正誤・要復習）・neutral・accent は全アプリ共通で固定。

## EngineTab（下部のタブ一覧）
| enum値 | ラベル | 説明 |
|--------|--------|------|
| `EngineTab.video` | 動画講座 | 動画講座一覧（ホーム＝先頭タブ） |
| `EngineTab.exercise` | 問題集 | 演習一覧 |
| `EngineTab.anki` | 暗記カード | 暗記カード一覧 |
| `EngineTab.settings` | 設定 | 設定 |

## 個別アプリのmain.dart最小構成
```dart
void main() {
  runApp(EngineApp(
    config: AppConfig(
      title: 'アプリ名',
      // brandPrimary を省略すると既定の集中ブルー。差し替える場合のみ渡す。
      tabs: [EngineTab.video, EngineTab.exercise, EngineTab.anki, EngineTab.settings],
    ),
  ));
}
```

## コンテンツ（アプリ側アセット）
- `contentBasePath`（デフォルト `contents/`）配下にJSONで配置し、`pubspec.yaml` の `flutter.assets` に登録する
- `base.json`: 各タブの一覧を初期ロードで提供する（`videos` / `exercises` / `anki`。id・title）
- **`videos`（ホーム＝動画講座タブ）**: `VideoChapter`（章）の配列。各章は `VideoItem`（動画1本）を持つ
  - `VideoItem.asset` は `contentBasePath` からの相対パス（例 `videos/1-1.mp4`）
  - `VideoItem.quizzes` は視聴後の確認クイズで、`LessonQuiz` union（quizMultipleChoice / quizFillInTheBlank）をそのまま再利用する
  - `VideoItem.id` は**全章を通してグローバルに一意**（ルート `/videos/:id` が章をまたいで1本を引くため。例 `1-1`, `1-2`, `2-1`）
- `exercises/{id}.json` / `anki/{id}.json`: 問題集・暗記カードの中身を都度ロード
- **旧レッスン（legacy）**: 旧「テキストレッスン」UI一式は `engine/lib/src/legacy/` に退避済みで、ルート（`/lessons/:id`）は未接続・アプリから到達不可。`lessons/{id}.json`（構造仕様 [docs/LESSON.md](docs/LESSON.md)）・`lessons/audios/`・その「1ページの分量」チェック（[docs/PAGE_FIT.md](docs/PAGE_FIT.md) の `page_fit_test.dart`）はすべて legacy 専用。復活手順は `engine/lib/src/legacy/README.md` を参照

## コード生成
engineパッケージでfreezed/riverpodのコードを変更した場合は再生成が必要：
```
cd engine && mise exec -- dart run build_runner build --delete-conflicting-outputs
```

# ipa_ipアプリ
- ITパスポート試験対策アプリ
- タブ: 動画講座・問題集・暗記カード・設定
- コンテンツは `apps/ipa_ip/contents/` 配下にJSONで管理（`base.json` と `exercises/{id}.json` など）

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