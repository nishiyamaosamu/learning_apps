# atelier/video — 学習動画の制作環境（Remotion）

学習動画（16:9・1920×1080・30fps）を Remotion で組む工房。ビジュアルは
[docs/DESIGN.html](../../../docs/DESIGN.html) の「動画ビジュアル」セクションが唯一の見本で、
色・角丸などのトークンは [src/design/tokens.ts](src/design/tokens.ts)（DESIGN.html と 1:1 の写し）から必ず引く。
ハードコード色は禁止（アプリ側と同じルール）。

## 使い方

```bash
cd content_works/atelier/video

npm run dev     # Remotion Studio（プレビュー）
npm run still   # 1フレームだけ書き出してレイアウト確認
npm run draft   # draft/demo.mp4 にフルレンダリング
```

- 完成した動画（ドラフト）は **`draft/`** に格納する
- コンポジションを増やしたら `src/Root.tsx` に `<Composition>` を登録し、
  `npx remotion render <CompositionId> draft/<name>.mp4` で書き出す

## 構成

```
video/
├── draft/                 # レンダリング済み動画の置き場
├── public/                # 画像・音声アセット（staticFile() で参照）
│   └── images/            # 手描きイラスト（assets_common からコピーして使う）
├── src/
│   ├── design/tokens.ts   # 集中ブルー トークン（DESIGN.html の写し・原本は Flutter AppColors）
│   │                      #   SCALE=4: モック(480px幅)のpx値を×4して1920pxで使う
│   ├── parts/             # シーン間で再利用する共通部品
│   │   ├── SlideShell.tsx # .v-slide シェル（見出しアイコン/ブルータブ + テロップ浮きカード常設）
│   │   ├── animate.ts     # useAppear / usePop / useProgress（--ease-out・オーバーシュート）
│   │   └── Ms.tsx         # Material Symbols（Rounded・FILL 1）。DESIGN.html の .ms と同一設定で、
│   │                      #   リガチャ名をそのまま渡す（例: <Ms name="gpp_maybe" size={80} />）。
│   │                      #   フォントは public/fonts/ のローカル woff2（オフライン・決定論的）
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
│   ├── Composition.tsx    # シーンを Sequence で並べる（SCENES 配列に追加するだけ）
│   └── Root.tsx           # コンポジション登録（1920×1080 / 30fps・尺は SCENES から自動算出）
```

## 制作ルール（DESIGN.html 動画ビジュアルの要点）

- 本編スライドは全パターン共通で**下部にテロップ帯を常設**し、本文はその上に収める
- 文字はアプリより大きく（見出し 60px〜、本文 44px〜 @1920幅）、要素は少なく
- 手描きイラスト（`assets_common/images`）は白地を `mixBlendMode: multiply` で背景に溶かす
- 強調マーカーは primary100、特に押す文だけ accentPinkSoft。accent は装飾専用で正誤には使わない
- アニメーションは `useCurrentFrame()` + `interpolate()` のみ。CSS transition/animation は禁止（正しくレンダリングされない）
- イラスト素材の生成は `create-video-illust` スキルで行う

## 音声（ナレーション）

TTS は `content_works/scripts/tts.py`（CLI）で生成し、mp3 を `public/audio/` に置いて
`@remotion/media` の `<Audio src={staticFile("audio/xxx.mp3")} />` でシーンに同期させる。
シーン長は音声の実尺から `calculateMetadata` で決めるのが定石（remotion-best-practices スキル参照）。
