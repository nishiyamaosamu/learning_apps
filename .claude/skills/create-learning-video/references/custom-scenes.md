# カスタムシーンのレシピ集

「あるべき姿」が既製パターンに無いときに、ページ専用レイアウトを組むためのガイド。
完動する実例は `src/videos/demo/demo.tsx` の `StatScene`（数字ドン）。まずそれを読むこと。

## 共通の骨格

```tsx
import { colors, videoType, fontMono, SCALE, markerStyle, markerPinkStyle } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import { useAppear, usePop, useProgress } from "../parts/animate";
import { segStart } from "../parts/narration";
import { Ms } from "../parts/Ms";

const MyScene: React.FC = () => {
  // フックはコンポーネント先頭で。要素ごとに遅延をずらして順に出す
  const a = useAppear(0.2);        // フェード+上昇 → style に spread
  const b = usePop(0.6);           // 縮小からポップ → style に spread
  const p = useProgress(1.0, 0.8); // 0→1 の進捗（バー・カウント・線の描画に）

  return (
    <SlideShell heading="見出し（不要なら省略）" icon={<Ms name="lightbulb" size={videoType.slideHeadIcon} />}
      telop="下部テロップは本編ページの必須要素です">
      {/* 本文領域: flex:1 + minHeight:0 が約束。中は自由 */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: 8 * SCALE, ...a }}>
        ...
      </div>
    </SlideShell>
  );
};
```

寸法の考え方: DESIGN.html のモックは480px幅なので、**モックで自然な px × SCALE(=4)** で書く。
文字の最小は 9×SCALE=36px。迷ったら大きく。

## レシピ

### 数字ドン（インパクトのある統計・数値）
`demo.tsx` の `StatScene` がそのまま手本。中央に 56×SCALE の巨大数字、
`useProgress` でカウントアップ、上に小さな説明、下にテロップ。
1ページに数字は1つ。2つ並べたくなったら「対比」なので vs か左右分割へ。

### 左右分割（説明 + ビジュアル）
bullets より文が少なく、絵を大きく見せたいとき。

```tsx
<div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 * SCALE }}>
    <span style={{ fontSize: 16 * SCALE, fontWeight: 800, ...useAppear(0.2) }}>
      短い主張<span style={markerStyle}>強調部分</span>
    </span>
    <span style={{ fontSize: 11 * SCALE, color: colors.textSecondary, ...useAppear(0.5) }}>補足の一文</span>
  </div>
  <Img src={staticFile("images/<app>/xxx.png")} style={{ flex: 1, minWidth: 0, alignSelf: "stretch",
    objectFit: "contain", mixBlendMode: "multiply", ...useAppear(0.4) }} />
</div>
```
（`Img`/`staticFile` は remotion から import。画像は public/images/<app>/ に実在するものだけ）

### ダーク幕間（チャプター区切り・問いかけ）
章の切り替えや「ここで質問です」の一拍に。SlideShell を使わない唯一の例外。

```tsx
<AbsoluteFill style={{ backgroundColor: colors.bgDark, fontFamily, alignItems: "center",
  justifyContent: "center", padding: "0 10%" }}>
  <span style={{ fontSize: 20 * SCALE, fontWeight: 800, color: colors.textPrimaryDark,
    textAlign: "center", lineHeight: 1.6, ...useAppear(0.3) }}>
    では、情報は{"\n"}どう守ればいい？
  </span>
</AbsoluteFill>
```
（whiteSpace: "pre-line" を足すと \n が改行になる。装飾を足すなら TitleCard の円・帯を参考に、1〜2個まで）

### 章見出しの幕間（SectionTitle）

クイズ導入などの区切りページは `parts/SectionTitle.tsx` を使う。短い題（6〜10文字・体言止め）が
1文字ずつポップし、角丸のアンダーラインが伸びる。読み上げ文は長くてよい（画面は題だけ）。

```tsx
const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;
{ pattern: "custom", name: "quiz-intro", durationSec: 3,
  narration: SEG_QI, component: QuizIntroScene }
```

### シーン切り替えワイプ（transitionIn）

2種類あり、レンダラーが自動で重ねるので**自前でワイプを実装しない**。
確認用デモは `wipe-demo`（`npx remotion render wipe-demo` で両方の動きが見られる）。

- `"wipe"` — 太めの角丸ラインが画面全体を埋め、覆い切ってから右へ抜ける約1.5秒。
  **まとめ前専用（1動画1回）**
- `"wipe-light"` — 斜めの平行四辺形が3枚、画面を覆わずに流れ抜けるだけの約1.0秒。
  本編内で話題が大きく変わるページに（1〜2回まで）

クイズ導入の幕間にはどちらも付けない（SectionTitle が主役）。

```tsx
{ pattern: "custom", name: "summary", durationSec: 5,
  narration: SEG_SUM, transitionIn: "wipe", component: SummaryScene }   // まとめ前
{ pattern: "vs", ..., transitionIn: "wipe-light" }                      // 本編内の転換
```

### アイコン3連（概念の顔見せ）
3つの要素を大きなアイコン+ラベルで横に並べる。それぞれ `usePop` を 0.3s ずつずらす。

```tsx
<div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center",
  justifyContent: "center", gap: 14 * SCALE }}>
  {[
    { icon: "group", label: "ヒト" },
    { icon: "inventory_2", label: "モノ" },
    { icon: "payments", label: "カネ" },
  ].map((x, i) => (
    <div key={x.label} style={{ display: "flex", flexDirection: "column", alignItems: "center",
      gap: 3 * SCALE, ...usePop(0.3 + i * 0.3) }}>
      <span style={{ width: 40 * SCALE, height: 40 * SCALE, borderRadius: 14 * SCALE,
        backgroundColor: colors.primary50, color: colors.primary600, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Ms name={x.icon} size={22 * SCALE} />
      </span>
      <b style={{ fontSize: 12 * SCALE }}>{x.label}</b>
    </div>
  ))}
</div>
```
※ .map 内で usePop を呼ぶとフック規則違反になる場合は、子コンポーネントに切り出す
（demo.tsx や src/scenes/ の各ファイルがその書き方をしている）。

### 進捗バー・割合バー
`useProgress` の値で幅%を動かす。バーの地は `colors.primary100`、中身は `colors.primary600`、
高さ 8×SCALE、角丸 `radius.full`。正誤の意味を持たせるときだけ correct/incorrect 系を使う。

### 関係図・循環図・矢印（DrawPath / ArrowMarker）
線を「描いていく」演出は `parts/draw.tsx` を使う。SVG の dash-offset を手計算しない。

```tsx
import { DrawPath, ArrowMarker } from "../parts/draw";

<svg viewBox="0 0 220 150" style={{ flex: 1, minHeight: 0 }}>
  <ArrowMarker id="arr" color={colors.primary300} />
  {/* ノードAからBへ、矢じり付きで0.8秒かけて描く */}
  <DrawPath d="M40 75 L120 75" delaySec={0.8} stroke={colors.primary300} strokeWidth={2}
    markerEnd="url(#arr)" />
  {/* 曲線もそのまま（循環図の弧など） */}
  <DrawPath d="M110 30 A55 55 0 0 1 165 100" delaySec={1.2} stroke={colors.primary300} strokeWidth={2} />
</svg>
```

ノード（アイコン+ラベル）は SVG の外に div で重ねるより、**SVG 内は線だけ・ノードは
absolute 配置の div** にすると文字が綺麗に出る。ノードの座標と線の端点座標を%で揃えること。

### 方向つきスライドイン（useFlyIn）
上下左右から要素を寄せ集める演出は `useFlyIn(delay, { dx, dy })`。
**注意**: `translate(-50%, -50%)` などの位置決め transform と競合するので、
位置決めは外側の div、useFlyIn のスタイルは内側のラッパー div に分けて当てる。

### 語りに同期して出す（segStart）
「N文目の読み上げ開始」に演出を合わせるときは `segStart(SEG, i)`（parts/narration.tsx）。
durationSec の足し算を手で書かない。完動例は `narration-demo.tsx`。

```tsx
const SEG = [N("s05-1.mp3", "…"), N("s05-2.mp3", "…"), N("s05-3.mp3", "…")];
const conclusion = useAppear(segStart(SEG, 2));   // 3文目と同時に結論を出す
```

ナレーションが3文以上のページは、少なくとも1要素を後半のセグメントに同期させる
（全部を頭で出し切ると、後半が止まった絵に声だけの状態になる）。

**既製パターン（bullets／vs／flow）の項目・ステップも同じ理由で同期させる。**
何も指定しないと全項目が最初の1〜2秒でほぼ同時に出る／点灯が機械的に一定間隔で切り替わる ——
ナレーションが項目ごとに順番へ話す構成だと、画面が語りより先行して見えるズレになる
（BECの3ステップ図で実際に起きた不具合）。ナレーションが項目ごとに話す構成のときは必ず指定する:

```tsx
{ pattern: "bullets", bullets: [...], appearAtSec: [segStart(SEG, 1), segStart(SEG, 2)], narration: SEG }
{ pattern: "vs", left: {...}, right: {...}, columnAtSec: [segStart(SEG, 1), segStart(SEG, 2)], narration: SEG }
{ pattern: "flow", steps: [...], highlightAtSec: [segStart(SEG, 1), segStart(SEG, 2), segStart(SEG, 4)], narration: SEG }
```

（`flow` の `highlightAtSec` は steps と同じ長さ。各ステップの点灯開始秒 — 次のステップの
開始秒まで点灯し、最後のステップは点灯を保持する。中間の文が前のステップの補足なら、
その文の分だけ前のステップを点灯させ続けてよい。上の例では index 3 の文を index1 の
ステップの続きとして扱い、index4 から次のステップに切り替えている）

### 1要素の中の一部だけを強調する（語句単位のハイライト）

副題に2つの用語を並べておき、それぞれの説明文が始まったタイミングで色を変える、
といった「1つの要素の中の一部だけ」を同期させたい場合は `useProgress` + `interpolateColors`
を語句ごとの小さな span に当てる。既製パターンには無いので custom で組む:

```tsx
const HighlightSpan: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const on = useProgress(atSec, 0.3);
  const color = interpolateColors(on, [0, 1], [colors.textSecondary, colors.primary600]);
  return <span style={{ color }}>{text}</span>;
};

// 副題「ソーシャルエンジニアリング｜盗み見・なりすまし電話」— 2つの用語をそれぞれ同期
<span>
  <span style={{ color: colors.textSecondary }}>ソーシャルエンジニアリング｜</span>
  <HighlightSpan text="盗み見" atSec={segStart(SEG, 3)} />
  <span style={{ color: colors.textSecondary }}>・</span>
  <HighlightSpan text="なりすまし電話" atSec={segStart(SEG, 4)} />
</span>
```

完動例は `src/videos/ipa_sg/sg-L3-human-deception.tsx` の `HighlightSpan`（`SocialEngineeringScene`）。

## やってはいけないこと（lint が検出する）

- 色のハードコード（`#...`）→ 必ず `colors.*`
- `animation:` / `transition:` / `@keyframes` → 必ず animate フック
- `fontFamily: "..."` の直書き → tokens の `fontFamily` / `fontMono`
- `Math.random()` / `Date.now()` → フレームごとに変わりレンダリングが壊れる
- `<img>` → remotion の `<Img>`

## 幾何もの（グリッド・SVG図解）の注意

- グリッドセルは**中身より一回り大きく**取る。ぴったりサイズは折返し・重なりの温床
  （lint/tsc では検出できず、静止画確認で初めて見つかる）
- SVG 図解は座標を数個の定数（中心座標・半径など）から計算で導くと、ズレたとき一括で直せる
- 同じ「線で繋ぐ図」（循環図・ハブ&スポーク・関係図）を1動画で2回以上使うなら、
  視覚文法が被らないよう形を明確に変える

## 動きの原則

- 出現は「フェード+上昇」か「ポップ」の2語彙で統一（DESIGN.html のモーション思想）
- 要素は一斉に出さず 0.2〜0.6s ずつずらす。ページの主役を最後に出すと視線が終着する
- 出現の遅延は語りに紐づける: ナレーション付きページは `segStart(SEG, i)` を基準にする
- シーン尺は「最後の要素の出現 + 読む時間(2〜3s)」。カスタムは durationSec 必須なので忘れずに
