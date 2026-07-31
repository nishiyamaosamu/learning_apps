# カスタムシーンのレシピ集

「あるべき姿」が既製パターンに無いときに、ページ専用レイアウトを組むためのガイド。
完動する実例は `src/videos/demo/demo.tsx` の `StatScene`（数字ドン）。まずそれを読むこと。

## 共通の骨格

```tsx
import { colors, videoType, fontMono, SCALE, markerStyle, markerPinkStyle } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { segStart } from "../../parts/narration";
import { Ms } from "../../parts/Ms";

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

**数字ドンを選べるのは「その数字がページの主題」のときだけ。** ナレーションが数字の前に
仕組みの説明を1〜2文はさむページ（＝数字は結論の一部）では、巨大数字が画面中央を占めたまま
他の話が入ってこなくなる。判定は「このページを0.5秒見せたら、覚えてほしいのは数字か？」。
違うなら比較カードや図解にする。

**カウントアップは数字要素そのものを `useAppear` で出す。** `useProgress` だけを掛けると
進捗が0の間も要素は描画され続けるので、**「0.0兆通り」が数十秒間デカく居座る**
（sg-L7 s04 で実際に指摘された）。カウントアップの開始まで数字を出したくないなら、
`useProgress`（値）と `useAppear`（表示）の両方を、対応するナレーションの `segStart` に掛ける。

**規模・桁数の差を見せたいときは、数字ドン1つより「2枚のカードの左右比較」が入る。**
片方だけ強調（`primary50` 背景 + `primary500` 枠）し、間に差分のチップ（「+4桁」など）と矢印を置く。
数字は各カード 30×SCALE 程度で、単位・「約」は 12〜13×SCALE に落とす。カードは
`flex: 1` にしておくと、後から出る側の場所が最初から空いているので画面が跳ねない。
語りの順（先に小さい方 → 後で大きい方 → 最後に倍率の一言）に `useAppear(segStart(SEG, i))` で出す。
実例: `src/videos/ipa_sg/sg-L7-password-attacks.tsx` の `DigitCard` / `BruteForceScene`。

なお**ページの最初のセグメントの間だけ本文が空になる**構成は避ける（見出しだけの画面が5秒続く）。
そのページの前提になる要素を `useAppear(0.3)` で先に出し、それを説明する文だけを該当
`segStart` に合わせると、先行感なく間が埋まる。

先に出してよいのは**それ自体に意味がある要素**（場面の登場人物、グラフの軸、候補の並び、
比較カードの見出しなど）だけ。**中身が空のカード枠を先に置いて後から埋めるのはやらない** —
白い空箱が数秒居座ると「まだ描画されていない未完成の画面」に見える（sg-L15 s09 で
枠先出し版を作って却下した）。先に出せる意味のある要素が無いページは、**1文ぶん（5秒前後）
疎な画面が続くのを許容する**ほうがよい。

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

**カード（縦積みの column）の中に画像を置くときは `flex: 1` で伸ばさず、`width`/`height` の
実寸で置く。** column の主軸は縦なので `flex: 1; minHeight: 0` の `Img` は高さ0に潰れ、
**画像が1枚も表示されないまま他の要素だけが並ぶ**（sg-L30 s10 で発生。lint も tsc も通り、
静止画で「絵が無い」ことに気づくまで分からない）。伸ばしたいのは左右分割の**横並び**のときだけで、
その場合も `alignSelf: "stretch"` + `objectFit: "contain"` を併記する。

**Img を含む横並びの行は、親から高さを縛る（`flex: 1` + `minHeight: 0`）。**
`alignSelf: "stretch"` の Img でも、その行自体が `flex: "none"` だと Img の自然高さ
（flex 幅 × 元画像の縦横比）で行が押し広げられ、**ページ全体が本文領域から上下にはみ出す**
（sg-L32 s05 で発生。見出し帯が上に切れ、下の注記チップが字幕帯に潜った）。
「TargetBar など固定要素 + Img 入りの行」を縦に積むページでは、Img の行だけ `flex: 1; minHeight: 0`
にしておくこと。

### キーワード見出し（新出用語をページの主役にする）

**聞き慣れない新出用語は、概念文より目立たせる。** 概念を大きな文字で書いて用語を小さな
グレーの添え字にすると、いちばん覚えてほしい語がページでいちばん目立たない要素になる
（sg-L5 の「ランサムウェア」「踏み台」で実際に指摘が出た）。試験対策なので、**語と意味が
セットで記憶に残ること**が目的 — 概念文は用語に従属させる。

用語ドン（`term` パターン）は1動画1〜2回までなので、それ以外のページでは
**用語ドンと同じ組み方（分類チップ → 用語 → 定義）を左寄せにしただけ**のものを置く。
強調は**文字の大きさとマーカーだけ**で作り、**箱・枠・影・アクセントバーを足さない**
（カードで囲った版を作ったら「装飾が過剰」と差し戻された。集中ブルーは余白で見せる設計で、
囲みは意味のある単位＝並列カード・対比・引用にだけ使う）:

```tsx
const KeywordLead: React.FC<{ chip: string; term: string; termSize: number;
  desc: React.ReactNode; atSec: number }> = ({ chip, term, termSize, desc, atSec }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start",
    gap: 5 * SCALE, ...useAppear(atSec) }}>
    <span style={{ fontSize: 9.5 * SCALE, fontWeight: 800, color: colors.primary800,
      backgroundColor: colors.primary100, borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px` }}>{chip}</span>
    <b style={{ fontSize: termSize, fontWeight: 800, lineHeight: 1.2 }}>
      <span style={markerStyle}>{term}</span>   {/* b は flex 子でブロック化するので span で包む */}
    </b>
    <span style={{ fontSize: 12 * SCALE, fontWeight: 700, lineHeight: 1.5 }}>{desc}</span>
  </div>
);
```

- **chip は分類ラベル**（その語が何の一種か。例「お金を取られる型」「乗っ取られた端末の悪用」）。
  重要度を主張する語（「最重要」など）は入れない — `term` パターンと同じ決まり
- `termSize` は語の長さで決める。左右分割の片側なら**7文字で 27×SCALE / 3文字で 32×SCALE**あたりが上限
  （左テキスト側は `flex: 1.25`、イラスト側は `flex: 0.9〜0.95` にすると入る）
- **マーカーは1ページに1〜2本まで**。用語には `markerStyle`（青）を引き、危険を指す語だけ
  `markerPinkStyle` に分ける。12×SCALE 程度の小さい文字にマーカーを引くと、
  帯が細すぎて汚れにしか見えないので引かない
- 出現は「その語がナレーションで初めて呼ばれるセグメント」に合わせる（`segStart(SEG, i)`）。
  ページの主題そのものなら 0.3 で先に出してよい
- 実例: `src/videos/ipa_sg/sg-L5-ransomware-botnet.tsx` の `KeywordLead`
  （s03 ランサムウェア＝見出しが上・s06 踏み台＝概念文が上と位置を変え、
  隣り合うページで同じ絵にならないようにしている）

図解ページ（ハブ＆スポークなど）で用語がラベルにしか出ないときも、**そのラベルだけは
本文より1〜2段大きく**し（12×SCALE 程度では小さい。15×SCALE 前後）マーカーを引く。

### 実物のモック + 危ない箇所の注記（既知の語を「見せる」）

迷惑メール・偽サイト・怪しい画面など、**受講者が実際に目にする物**が題材のページは、
用語を大写しにする（term）より1つの実物を再現して危ない箇所を指すほうが入る。
完動例は `src/videos/ipa_sg/sg-L3-human-deception.tsx` の `SpamMailScene`（受信メール1通）。

- 骨格: `SlideShell heading="<語>"` + 中央にカード（surface + border + radius 12×SCALE）。
  カード内は「ラベル + 値」の行を積み、危ない要素だけ別ボックスに切り出す
- 点灯は `useProgress(segStart(SEG, i), 0.4)` + `interpolateColors` で
  地 `bg→accentPinkSurface` / 枠 `border→accentPink` / 文字 `textSecondary→accentPinkText`
  （危険の注目はピンク。correct/incorrect は正誤リビール専用なので使わない）
- 要素は**最初から全部レイアウトに置き**、`useAppear` の opacity で出す（高さが動かず、
  途中フレームでカードが伸び縮みしない）

**本文に使える高さは、見出しありで約 655px しかない**（1080 − 上下padding − 見出し − 字幕帯）。
`SlideShell` の padding は `"4.5% 6% 2.4%"` だが、**CSS の縦 padding の % は親の「幅」に対する比**
なので上 86px・下 46px（1920基準）で効く — %の見た目から想像するより余裕が無い。見出しなしの
ページ（キーワード見出し・用語ドン系）は約 770px。

カードに行を1つ足すだけで最下段が字幕帯に潜り込む（L3 s06・sg-L18 の4ページで実際に起きた）。
とくに **`fontSize` を指定した文字は `lineHeight` 既定（normal ≒ 1.5）で高さを取る**ので、
行を積むページでは `lineHeight: 1.2〜1.3` を明示するだけで 1行あたり 10〜20px 縮む。
注記は行を増やさず対象の行にインラインで置き、ボックスの padding は 8×SCALE 前後に抑える。
組んだら必ず stills で**最下段と字幕帯のすき間**、および**見出しと本文先頭の重なり**を確認する
（はみ出しは上下どちらにも出る）。

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
import { DrawPath, ArrowMarker } from "../../parts/draw";

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

**描画前の線は完全に消えている** — `DrawPath` 側で担保済みなので、シーン側で opacity を
足す必要はない。SVG は dash-offset で線を隠しても、**線の周辺物は隠してくれない**のが罠で、
対策前は2つのゴミが出ていた（どちらも `parts/draw.tsx` を修正済み）:

| 見えていたもの | 原因 | 指摘 |
|---|---|---|
| 終端に三角形だけが浮く | marker は strokeDashoffset の影響を受けない | sg-L8 ディレクトリトラバーサル |
| 始点に色付きの点が残る | `strokeLinecap="round"` は長さ0のダッシュにも丸い端点を描く | sg-L10 第三者中継 |

**自前で `<marker>` `<polygon>` `<circle>` を書いたり、`<path>` に直接 dash アニメを当てるときは
同じ穴を自分で塞ぐこと**（`opacity={p > 0 ? 1 : 0}` と、矢じりは線が届いてから付ける）。
静止画は**シーン末尾**しか写らないのでこの種のゴミは stills では見つからない。
図解ページを作ったら、**描画が始まる前のフレームを1枚 `npx remotion still <id> <out.png> --frame=<n>`
で必ず見る**（フレーム番号は `scripts/stills.mjs` が出す各シーンの秒数を積み上げて×30fps）。

**矢じりの縦幅ぶんの余白を viewBox に取る。** 矢じりは `size × DrawPath の strokeWidth`
（viewBox 単位。既定 size=6）の正方形として描かれ、**はみ出した角は root の `<svg>` に
クリップされて四角く欠ける**（sg-L10 の扇状3本・sg-L11 の中間者攻撃で「矢印が欠けている」と
指摘）。細長い矢印ストリップを作るときは `線のy ± (size × strokeWidth) / 2` が viewBox の
内側に入る高さを取る:

```tsx
// NG: viewBox の高さ12に対して矢じりは 6×2.5 = 15単位 → 上下が欠ける
<svg viewBox="0 0 100 12"><DrawPath d="M2 6 L86 6" strokeWidth={2.5} markerEnd={...} /></svg>
// OK: 高さ16なら 8 ± 7.5 = 0.5..15.5 が収まる
<svg viewBox="0 0 100 16"><DrawPath d="M2 8 L86 8" strokeWidth={2.5} markerEnd={...} /></svg>
```

viewBox の高さを変えると px/単位 が変わる（要素の見た目の大きさも変わる）ので、
高さを増やしたら線・終点のy座標も同じ比率で置き直す。**矢じりの欠けは縮小した静止画では
判別できない**ので、`--scale=1` で出して該当箇所を拡大して見る（`sips -c <h> <w>
--cropOffset <y> <x>` で切り出し → `sips -z` で拡大）。

**viewBox の縦横比は、実際の描画領域の比より「横長」にする。** `width: "100%"` + 固定 height の
svg は `preserveAspectRatio` の既定（meet）で**短い辺に合わせて縮む**ので、比が足りないと
長い矢印が領域の真ん中に短いスタブとして描かれる（sg-L18 のチャレンジレスポンス図で、
横 1390px の領域に `viewBox="0 0 100 16"` + `height: 8×SCALE` を置いたら幅 200px の矢印になった）。
判定は `height / viewBoxH ≧ 領域幅 / viewBoxW` になっているか。横長ストリップは
**viewBox を 1000 幅で切る**と扱いやすい:

```tsx
// 領域幅は最大 1390px 前後 → 比 1000:60 なら height 22×SCALE=88px で必ず「幅に」フィットする
// 高さ60のうち矢じりは size6 × strokeWidth7 = 42単位 → 線を y=30 に置けば 9〜51 で収まる
<svg viewBox="0 0 1000 60" style={{ width: "100%", height: 22 * SCALE }}>
  <ArrowMarker id="x" color={colors.primary500} />
  <DrawPath d="M10 30 L935 30" delaySec={...} stroke={colors.primary500} strokeWidth={7} markerEnd="url(#x)" />
</svg>
```

viewBox を広く取ると 1単位が細くなるので、**strokeWidth も同じ比率で上げる**
（1000幅・領域1390px なら strokeWidth 7 ≒ 実寸 10px）。細いままだと線が髪の毛になる。

**矢印は「向き」ではなく「到達」を語らせる。** 矢印の先に出る要素（さかのぼった先のファイル、
届いた先の被害）は、線が引き終わる頃に `useAppear(delaySec + durSec)` で出す。先に置いてあると
矢印が単なる飾りになり、逆に矢印だけ先に着いて数秒間なにも無い所を指すのも間が悪い。
実例: `src/videos/ipa_sg/sg-L8-injection-attacks.tsx` の `TraversalScene`
（s07-4 で線を引き、その 0.85 秒後に `/etc/passwd` が開く）。

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
