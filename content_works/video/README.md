# content_works/video — 学習動画の制作環境（Remotion）

学習動画（16:9・1920×1080・30fps）を Remotion で組む工房。ビジュアルは
[docs/DESIGN.html](../../docs/DESIGN.html) の「動画ビジュアル」セクションが唯一の見本で、
色・角丸などのトークンは [src/design/tokens.ts](src/design/tokens.ts)（DESIGN.html と 1:1 の写し）から必ず引く。
ハードコード色は禁止（アプリ側と同じルール）。

**制作の進捗は [QUEUE.md](QUEUE.md)（進捗台帳）が唯一の正**。何本目まで作ったか・次に何を作るかは
会話の記憶ではなくここで管理する。1本 = 1エージェントで作り、着手時と完了時に台帳を更新する
（手順は `.claude/skills/create-learning-video/SKILL.md` 工程0）。

## 動画を作る手順（VideoSpec 方式）

動画1本 = `src/videos/<app>/<id>.tsx` の **VideoSpec**。`<app>` はアプリ名ディレクトリ（`ipa_ip` / `ipa_sg`）、
`<id>` はアプリ接頭辞つきでグローバル一意にする（`ip-` / `sg-`。例 `ip-L1v9-corporate-activity`）。
既製パターン（10種）はデータで書き、
既製が合わないページは `pattern: "custom"` でページ専用コンポーネントを組む
（SlideShell + tokens + animate フックの範囲内で自由に設計。`demo.tsx` の StatScene が手本）。
制作の考え方・分量制限・レシピは `.claude/skills/create-learning-video/` を参照。

```bash
cd content_works/video

# 1. src/videos/<app>/<id>.tsx に VideoSpec を書く（src/videos/demo/demo.tsx が記述例）
node scripts/sync-index.mjs         # 2. index.ts を再生成して登録（index.ts は手で編集しない）
node scripts/lint-videos.mjs        # 3. デザインガードレール lint
npx tsc                             # 4. 型チェック
node scripts/stills.mjs <id>        # 5. 全シーンの静止画を stills/<id>/ に出力 → 全部目視確認
npx remotion render <id> draft/<app>/<出力名>.mp4   # 6. フルレンダリング（成果物は draft/<app>/ へ）
#    出力名は app-lesson-version 形式（例 ip-L1-v1.mp4）。作り直すたびに v2, v3… と上げる

npm run dev     # Remotion Studio（プレビューしながら調整したいとき）
```

- レンダリングした動画（ドラフト）は **`draft/<app>/`** に格納する。ここは
  **まだ人が見ていないものの置き場**で、公開が済んだ回は publish が消す（下記）
- シーンの種類とデータ形式は `src/videos/types.ts`（全パターンの型定義）を参照

### 人のレビューが通ったら公開する

レビューが通った回（QUEUE.md が 👀 review）は、アプリの完成品置き場
`apps/<app>/contents/videos/` へ**移す**。mp4のコピー・`base.json` への登録（尺は ffprobe の実測）・
台帳を ✅ done にする・draft から消す、までが1コマンドで揃うので、**手でコピーしない**。

```bash
node scripts/publish.mjs sg-L1              # 複数まとめてもよい（sg-L1 sg-L2）
node scripts/publish.mjs sg-L1 --force      # すでに done の回をやり直す（作り直した版に差し替え）
node scripts/publish.mjs sg-L1 --keep-draft # 例外的に draft を残す
node scripts/publish.mjs --prune            # 昔に公開した回の draft が残っていたら掃除
```

アプリ側の動画ID = **L番号**（`L1` → `contents/videos/L1.mp4`・`/videos/L1`）。視聴進捗のキーなので
後から変えない。公開したmp4はgit対象外（再レンダリングで復元できる）で、gitが追うのは
`base.json` の登録だけ。

公開すると、その回の draft は**公開した版もそれ以前の版（`-v1`…）もまとめて削除される**
（レビュー待ちが埋もれるのと、1本20MBの積み上がりを避けるため）。消すのは公開先に同じサイズの
mp4があると確認できたときだけ。公開済みの動画を見直したいときは
`apps/<app>/contents/videos/L<番号>.mp4` を開く。

## 構成

アプリ別の成果物（動画定義・ナレーション・音声・ドラフト）はすべて `<app>/` サブディレクトリ
（`ipa_ip` / `ipa_sg`、手本類は `demo`）に分けて置く。

```
video/
├── QUEUE.md               # 制作キュー（進捗台帳）— 状態・動画ID・成果物・尺
├── draft/<app>/           # レビュー待ち動画の置き場（git対象外。公開が済んだ回は publish.mjs が消す）
├── narration/<app>/       # ナレーション原稿（<id>.md）と TTS ジョブ（<id>.jobs.json）
├── stills/                # scripts/stills.mjs の出力（シーン確認用・git対象外）
├── scripts/stills.mjs     # 全シーンを1枚ずつ静止画化する確認ツール
├── scripts/sync-index.mjs # src/videos/index.ts の自動生成（+ id・ファイル名の規約チェック）
├── scripts/publish.mjs    # レビュー済みの回を apps/<app>/contents/videos/ へ公開（+ base.json 登録・台帳を done に）
├── public/                # 画像・音声アセット（staticFile() で参照）
│   ├── audio/<app>/<id>/  # ナレーション音声mp3（git対象外・jobs.json からTTSで再生成する）
│   │                      #   audio/common/ だけは全動画共通の固定素材なのでgit追跡する
│   └── images/<app>/      # 手描きイラスト部品ライブラリの原本（アプリ別・フラット。draft/ は確認待ち）
├── src/
│   ├── design/tokens.ts   # 集中ブルー トークン（DESIGN.html の写し・原本は Flutter AppColors）
│   │                      #   SCALE=4: モック(480px幅)のpx値を×4して1920pxで使う
│   ├── parts/             # シーン間で再利用する共通部品
│   │   ├── SlideShell.tsx # .v-slide シェル（見出しアイコン/ブルータブ + テロップ浮きカード常設）
│   │   ├── animate.ts     # useAppear / usePop / useFlyIn / useProgress（--ease-out・オーバーシュート）
│   │   └── Ms.tsx         # Material Symbols（Rounded・FILL 1）。DESIGN.html の .ms と同一設定で、
│   │                      #   リガチャ名をそのまま渡す（例: <Ms name="gpp_maybe" size={80} />）。
│   │                      #   フォントは public/fonts/ のローカル woff2（オフライン・決定論的）
│   ├── videos/            # 動画定義（純データ）とレンダラー
│   │   ├── types.ts       # VideoSpec / SceneSpec の型（全パターンのデータ形式）
│   │   ├── duration.ts    # シーン標準尺の計算（React非依存）
│   │   ├── renderScene.tsx# SceneSpec → シーン部品（アイコンサイズ・点灯タイミングを保証）
│   │   ├── demo/          # 手本・確認用デモ（パターン一覧・ナレーション最小手本・ワイプ確認）
│   │   ├── <app>/         # 本番動画の VideoSpec（<id>.tsx と <id>.audio.json）
│   │   └── index.ts       # 動画の登録リスト（scripts/sync-index.mjs が生成・手で編集しない）
│   ├── scenes/            # DESIGN.html のスライドパターン 1:1
│   │   ├── TitleCard.tsx  # タイトルカード（bgDark + primary円 + accentPink斜め帯）
│   │   ├── BulletSlide.tsx# ① 箇条書き+イラスト（基本形）
│   │   ├── VsSlide.tsx    # ② 対比（VS）— 左右スライドイン + VSバッジポップ
│   │   ├── FlowSlide.tsx  # ③ ステップフロー — ハイライトが進行に合わせ移動
│   │   ├── MatrixSlide.tsx# ④ 2×2マトリクス — セル順次ポップ + 注目象限が点灯
│   │   ├── LayersSlide.tsx# ⑤ 階層図 — 下の層から積み上げ + 説明中の層が点灯
│   │   ├── GraphSlide.tsx # ⑥ 計算・グラフ — 線の描画アニメ + 交点ポップ + 式カード
│   │   ├── TermSlide.tsx  # ⑦ 用語ドン — トラッキング収束で用語が着地
│   │   ├── BinarySlide.tsx# ⑧ 基数変換 — 桁を順に評価 + 答えがピンクマーカーでドン
│   │   └── QuizSlide.tsx  # 動画内クイズ — 正解リビール（色+○の二重符号化・250ms）
│   └── Root.tsx           # コンポジション登録（1920×1080 / 30fps・尺は VideoSpec から自動算出）
```

## 制作ルール（DESIGN.html 動画ビジュアルの要点）

- 本編スライドは全パターン共通で**下部にテロップ帯を常設**し、本文はその上に収める
- 文字はアプリより大きく（見出し 60px〜、本文 44px〜 @1920幅）、要素は少なく
- 手描きイラスト（`public/images/<app>/`）は白地を `mixBlendMode: multiply` で背景に溶かす
- 強調マーカーは primary100、特に押す文だけ accentPinkSoft。accent は装飾専用で正誤には使わない
- アニメーションは `useCurrentFrame()` + `interpolate()` のみ。CSS transition/animation は禁止（正しくレンダリングされない）
- イラスト素材の生成は `create-video-illust` スキルで行う

## 音声（ナレーション）— 標準装備

動画はナレーション音声＋同期字幕つきが標準。仕組みは「**字幕1枚 = 1文 = 1つのmp3**」で、
各mp3の実測秒数がそのまま字幕切り替えとシーン尺になる（推定タイムスタンプ不要）。
完動する最小手本は `src/videos/demo/narration-demo.tsx`。

```bash
# 1. narration/<app>/<id>.jobs.json にセグメント原稿（s{ページ2桁}-{通し}.mp3 → 文）を書く
cd ../scripts
mise exec -- uv run tts.py --jobs ../video/narration/<app>/<id>.jobs.json \
    --out-dir ../video/public/audio/<app>/<id>       # 2. TTS生成（Gemini TTS / Zephyr）
cd ../video
node scripts/audio-durations.mjs <id>                  # 3. 実測 → src/videos/<app>/<id>.audio.json
# 4. 動画側: narrationLoader(durations, "audio/<app>/<id>") でセグメントを組み、
#    spec の narration（音声・尺）と SlideShell の narration（字幕）に渡す
```

「N文目の読み上げ開始秒」は `segStart(SEG, i)`（parts/narration.tsx）で取れる。
quiz の `revealAtSec` や、カスタムシーンで語りに合わせて要素を出す `delaySec` に使う（手計算しない）。

- 音声はレンダラー（renderScene）が spec.narration から自動再生する。シーンに `<Audio>` を手動で置かない
- シーン尺は「ナレーション合計 + テール0.9s」とアニメ尺の長い方（`src/videos/duration.ts`）
- **1本5分以内目標・5:59(359秒)上限**。原稿総文字数（約4.5〜5字/秒）で先に管理する
- 詳細は `.claude/skills/create-learning-video/references/narration.md`
