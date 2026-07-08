# ナレーション音声パイプラインの詳細

仕組みの要点: **字幕1枚 = 1文 = 1音声ファイル(mp3)**。各mp3の実測秒数（ffprobeで採る）を
そのまま字幕の切り替えタイミングとシーン尺に使うので、タイムスタンプ推定なしで完全同期する。
完動する最小手本は `src/videos/demo/narration-demo.tsx`。

## ファイル命名と置き場所

```
content_works/video/
├── narration/<app>/<id>.md          # シナリオ（ページ表 + 原稿）。人が読み返す用
├── narration/<app>/<id>.jobs.json   # TTSジョブ（ファイル名 → 読み上げテキスト）
├── public/audio/<app>/<id>/         # 生成されたmp3
└── src/videos/<app>/<id>.audio.json # 実測秒数（audio-durations.mjs が生成）
```

- セグメントのファイル名は `s{シーン番号2桁}-{通し番号}.mp3`（例 `s03-2.mp3` = 3ページ目の2文目）。
  シーン番号は scenes 配列の 1 始まり。番号が揃っていると再生成・照合が迷わない
- jobs.json はフラットな辞書。テキストは**字幕に出す文とまったく同じ**にする（違うと口と字幕がズレて見える）

```json
{
  "s01-1.mp3": "今回は、企業活動と経営資源について学びます。",
  "s02-1.mp3": "企業活動の目的は、社会に価値を提供することです。",
  "s02-2.mp3": "利益は、その活動を続けるための条件になります。"
}
```

## 音声生成 → 実測

```bash
cd content_works/scripts
mise exec -- uv run tts.py --jobs ../video/narration/<app>/<id>.jobs.json \
    --out-dir ../video/public/audio/<app>/<id>

cd ../video
node scripts/audio-durations.mjs <id>    # → src/videos/<app>/<id>.audio.json + 合計秒数の報告
```

- 声は tts.py の既定（Zephyr / gemini-3.1-flash-tts-preview / ja-JP）をそのまま使う。全動画で声を揃える
- 生成は1ファイル数秒〜数十秒。**全ファイル生成が終わってから** audio-durations を実行する
- audio-durations が「⚠ 359秒超の恐れ」を出したら、原稿を削って**該当ファイルだけ**再生成する（下記）

### 一部だけ再生成する

原稿を直した・読みが不自然だったファイルだけ作り直せばよい。該当キーだけの一時 jobs を作って回す:

```bash
cd content_works/scripts
echo '{"s05-2.mp3": "直した読み上げテキスト。"}' > /tmp/patch.jobs.json
mise exec -- uv run tts.py --jobs /tmp/patch.jobs.json --out-dir ../video/public/audio/<app>/<id>
cd ../video && node scripts/audio-durations.mjs <id>   # 秒数が変わるので必ず採り直す
```

narration/<app>/<id>.jobs.json 本体も同じ文に直しておく（原稿と音声の対応が真実であり続けるように）。

## 実装パターン

### 共通: loader を1回作る

```tsx
import { narrationLoader } from "../parts/narration";
import durations from "./<id>.audio.json";   // audio-durations.mjs が作る（先に音声工程を済ませる）

const N = narrationLoader(durations, "audio/<app>/<id>");
```

`.audio.json` にキーが無いと N() が即エラーを投げる。「音声を作り忘れたまま無音で完成」を防ぐための仕様。

### 既製パターンのシーン

spec に narration を書くだけ。telop は書かない（字幕が音声から出る）。

```tsx
{
  pattern: "bullets",
  heading: "企業活動の目的",
  icon: "corporate_fare",
  bullets: [{ text: "社会に価値を提供する", marker: "blue" }],
  narration: [
    N("s02-1.mp3", "企業活動の目的は、社会に価値を提供することです。"),
    N("s02-2.mp3", "利益は、その活動を続けるための条件になります。"),
  ],
}
```

### カスタムシーン

セグメント配列を定数にして、**spec と SlideShell の両方に同じものを渡す**。
spec 側が音声とシーン尺、SlideShell 側が字幕表示を担う（片方だけだと音が出ない/字幕が出ない）。

```tsx
const SEG5 = [N("s05-1.mp3", "…"), N("s05-2.mp3", "…")];

const MyScene: React.FC = () => (
  <SlideShell heading="…" narration={SEG5}>…</SlideShell>
);

// spec:
{ pattern: "custom", name: "my-scene", durationSec: 4, narration: SEG5, component: MyScene }
```

- `durationSec` は「アニメーションの最低尺」。ナレーションの方が長ければ自動で伸びる
- 音声はレンダラーが spec.narration から自動で鳴らす。**シーン内に `<Audio>` を手動で置かない**（二重再生になる）

### title・ダーク幕間（SlideShell が無いシーン）

音声は spec.narration で鳴る。字幕は出ないので、
- title: 挨拶の1文だけにする（画面のタイトル文字が実質の字幕）
- ダーク幕間: 画面中央の大きな文字を読み上げ文と一致させる（それ自体が字幕）

### 考える間・タメ（gapBeforeSec）

セグメントの読み上げ前に無音の間を置ける。間の間、字幕は前のセグメントのまま残る
（正解などを先出ししない）。シーン尺・音声・字幕すべてに自動で反映される。

```tsx
N("s10-3.mp3", "正解は、イの経営資源です。", { gapBeforeSec: 1.8 })
```

使いどころ: クイズの問い→正解の間（1.5〜2秒）が代表。まとめ前の一拍などにも使えるが、
多用すると間延びする。

### quiz のリビール同期（考える間つき）

問いを読み終えたら考える間を置き、正解読み上げと同時にリビールする。
`revealAtSec` は正解セグメントの開始秒 — `segStart(QSEG, i)` で取る（手で足し算しない）:

```tsx
import { narrationLoader, segStart } from "../parts/narration";

const QSEG = [
  N("s10-1.mp3", "ここで問題です。…"),
  N("s10-2.mp3", "…でしょうか。"),
  N("s10-3.mp3", "正解は、イの経営資源です。", { gapBeforeSec: 1.8 }),
];
{
  pattern: "quiz",
  question: "…",
  choices: [...],
  narration: QSEG,
  revealAtSec: segStart(QSEG, 2), // s10-3 の読み上げ開始（gapBeforeSec 込み）= 正解発表
}
```

### 語りに画面を同期させる（segStart）

カスタムシーンで「N文目に合わせて要素を出す・光らせる」も同じヘルパーで組む。
シーン内の音声はシーン頭から始まるので、`segStart(SEG, i)` がそのまま演出の `delaySec` になる:

```tsx
// 2文目の読み上げ開始と同時に結論カードを出す
const b = useAppear(segStart(SEG5, 1));
```

ナレーションが3文以上あるページは、少なくとも1つの要素を後半のセグメントに同期させて
「語りに画面がついてくる」感を作る（全要素を頭で出し切ると後半が止まった絵になる）。

### オープニングジングル（title で自動再生）

title シーンではレンダラーが `public/audio/common/opening_jingle.mp3`（6.8秒）を自動で鳴らす。
title の尺もジングルに合わせて 7.2 秒が既定。**title にナレーションを付けない**
（ジングルと声が重なる）。導入の語りは2ページ目から始める。

### 共通音声（定型セリフの使い回し）

クイズ導入の幕間と、まとめ最後の締めの一言は**全動画で文言が固定**なので、動画ごとにTTS生成せず
`public/audio/common/` の音声を使い回す。読み・抑揚のブレも無くなる（毎回生成すると同じ文でも
微妙に尺が変わる）。

```
narration/common/common.jobs.json     # 共通セリフのジョブ定義（人が読み返す用）
public/audio/common/quiz_intro.mp3    # 「ここまで学んだことを、クイズ形式で確認していきましょう。」
public/audio/common/outro.mp3         # 「今回のレッスンはここまでです。お疲れさまでした！」
src/videos/common/common.audio.json   # 上記の実測秒数（node scripts/audio-durations.mjs common が生成）
src/parts/common-narration.ts         # QUIZ_INTRO_SEG / OUTRO_SEG を export
```

動画側の使い方（`<id>.jobs.json` にはこの2文を書かない）:

```tsx
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG;           // 幕間シーンの narration にそのまま渡す
const SEG_SUMMARY = [
  N("s16-1.mp3", "…"),
  N("s16-2.mp3", "…"),
  OUTRO_SEG,                                      // まとめの最後のセグメントとして足す
];
```

新しい定型セリフ（今後増える共通フレーズ）を足す手順:

1. `narration/common/common.jobs.json` に `{ "新ファイル名.mp3": "テキスト" }` を追記
2. `cd content_works/scripts && mise exec -- uv run tts.py --jobs ../video/narration/common/common.jobs.json --out-dir ../video/public/audio/common`
3. `cd ../video && node scripts/audio-durations.mjs common`（`src/videos/common/common.audio.json` を更新）
4. `src/parts/common-narration.ts` に `export const XXX_SEG = NC("新ファイル名.mp3", "テキスト");` を追加

## 尺の管理（5:59 上限）

- 読み上げ速度は実測でおよそ **4.5〜5字/秒**（Gemini TTS ja / Zephyr）
- 動画尺 ≈ ナレーション合計 + シーン数 × 0.9秒（テール） + gapBeforeSec の合計 + title 7.2秒
- **原稿の総文字数を先に管理する**のが唯一確実な方法: 目標 1,200〜1,400 字（4〜5分）。
  1,500 字を超えたら音声を作る前に削る（作った後に削ると再生成コストがかかる）
- audio-durations.mjs が合計 330 秒超で警告を出す。最終確認はレンダリング後に
  `ffprobe -v error -show_entries format=duration -of csv=p=0 draft/<app>/<出力名>.mp4` で 359 秒以下を見る
  （出力名は app-lesson-version 形式。例 `ip-L1-v1.mp4` — SKILL.md 工程8参照）

## トラブルシュート

| 症状 | 原因と対処 |
|---|---|
| `〜の秒数がありません` エラー | 音声未生成 or audio-durations 未実行。音声工程を先に済ませる |
| 音声が鳴らないシーンがある | spec に narration を渡し忘れ（SlideShell だけに渡している） |
| 字幕が切り替わらない | SlideShell に telop（固定文字列）を渡している。narration に切り替える |
| 同じ声が二重に聞こえる | シーン内に `<Audio>` を手動で置いている。spec.narration に一本化する |
| 尺が原稿から想定した長さと大きく違う | 音声再生成後に audio-durations を採り直していない |
| tts.py が認証エラー | `secrets/` のサービスアカウントJSONが前提。ユーザーに確認する |
| フルレンダリングが delayRender タイムアウトで繰り返し落ちる | ホストのメモリ不足のことが多い。`--frames=0-N` / `--frames=N+1-末尾` の2回に分けてレンダリングし、`ffmpeg -f concat -c copy` で無劣化結合する（結合点のフレームを目視確認） |
| コードを直したのに mp4 に反映されない | webpack バンドルキャッシュが古い。`--bundle-cache=false` を付けて再レンダリングする。修正の再レンダリングでは、直した箇所のフレームを `ffmpeg -ss <秒> -i <mp4> -frames:v 1 check.png` で**mp4 から**抽出して反映を確認してから納品する（stills はソースから作るので証拠にならない） |
