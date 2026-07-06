# atelier/video — 学習動画の制作環境（Remotion）

学習動画（16:9・1920×1080・30fps）を Remotion で組む工房。ビジュアルは
[docs/DESIGN.html](../../../docs/DESIGN.html) の「動画ビジュアル」セクションが唯一の見本で、
色・角丸などのトークンは [src/design/tokens.ts](src/design/tokens.ts)（DESIGN.html と 1:1 の写し）から必ず引く。
ハードコード色は禁止（アプリ側と同じルール）。

## 動画を作る手順（VideoSpec 方式）

動画1本 = `src/videos/<id>.tsx` の **VideoSpec**。既製パターン（10種）はデータで書き、
既製が合わないページは `pattern: "custom"` でページ専用コンポーネントを組む
（SlideShell + tokens + animate フックの範囲内で自由に設計。`demo.tsx` の StatScene が手本）。
制作の考え方・分量制限・レシピは `.claude/skills/create-learning-video/` を参照。

```bash
cd content_works/atelier/video

# 1. src/videos/<id>.tsx に VideoSpec を書く（src/videos/demo/demo.tsx が記述例）
# 2. src/videos/index.ts の videos 配列に追加
node scripts/lint-videos.mjs        # 3. デザインガードレール lint
npx tsc                             # 4. 型チェック
node scripts/stills.mjs <id>        # 5. 全シーンの静止画を stills/<id>/ に出力 → 全部目視確認
npx remotion render <id> draft/<id>.mp4   # 6. フルレンダリング（成果物は draft/ へ）

npm run dev     # Remotion Studio（プレビューしながら調整したいとき）
```

- 完成した動画（ドラフト）は **`draft/`** に格納する
- シーンの種類とデータ形式は `src/videos/types.ts`（全パターンの型定義）を参照

## 構成

```
video/
├── draft/                 # レンダリング済み動画の置き場
├── stills/                # scripts/stills.mjs の出力（シーン確認用・git対象外）
├── scripts/stills.mjs     # 全シーンを1枚ずつ静止画化する確認ツール
├── public/                # 画像・音声アセット（staticFile() で参照）
│   └── images/<app>/      # 手描きイラスト部品ライブラリの原本（アプリ別・フラット。draft/ は確認待ち）
├── src/
│   ├── design/tokens.ts   # 集中ブルー トークン（DESIGN.html の写し・原本は Flutter AppColors）
│   │                      #   SCALE=4: モック(480px幅)のpx値を×4して1920pxで使う
│   ├── parts/             # シーン間で再利用する共通部品
│   │   ├── SlideShell.tsx # .v-slide シェル（見出しアイコン/ブルータブ + テロップ浮きカード常設）
│   │   ├── animate.ts     # useAppear / usePop / useProgress（--ease-out・オーバーシュート）
│   │   └── Ms.tsx         # Material Symbols（Rounded・FILL 1）。DESIGN.html の .ms と同一設定で、
│   │                      #   リガチャ名をそのまま渡す（例: <Ms name="gpp_maybe" size={80} />）。
│   │                      #   フォントは public/fonts/ のローカル woff2（オフライン・決定論的）
│   ├── videos/            # 動画定義（純データ）とレンダラー
│   │   ├── types.ts       # VideoSpec / SceneSpec の型（全パターンのデータ形式）
│   │   ├── duration.ts    # シーン標準尺の計算（React非依存）
│   │   ├── renderScene.tsx# SceneSpec → シーン部品（アイコンサイズ・点灯タイミングを保証）
│   │   ├── demo/          # 手本・確認用デモ（パターン一覧・ナレーション最小手本・ワイプ確認）
│   │   └── index.ts       # 動画の登録リスト（ここに追加すると Studio / render に現れる）
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
# 1. narration/<id>.jobs.json にセグメント原稿（s{ページ2桁}-{通し}.mp3 → 文）を書く
cd ../../scripts
mise exec -- uv run tts.py --jobs ../atelier/video/narration/<id>.jobs.json \
    --out-dir ../atelier/video/public/audio/<id>       # 2. TTS生成（Gemini TTS / Zephyr）
cd ../atelier/video
node scripts/audio-durations.mjs <id>                  # 3. 実測 → src/videos/<id>.audio.json
# 4. 動画側: narrationLoader(durations, "audio/<id>") でセグメントを組み、
#    spec の narration（音声・尺）と SlideShell の narration（字幕）に渡す
```

- 音声はレンダラー（renderScene）が spec.narration から自動再生する。シーンに `<Audio>` を手動で置かない
- シーン尺は「ナレーション合計 + テール0.9s」とアニメ尺の長い方（`src/videos/duration.ts`）
- **1本5分以内目標・5:59(359秒)上限**。原稿総文字数（約4.5〜5字/秒）で先に管理する
- 詳細は `.claude/skills/create-learning-video/references/narration.md`
