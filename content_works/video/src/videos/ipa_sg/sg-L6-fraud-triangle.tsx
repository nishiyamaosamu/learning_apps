import { Img, interpolateColors, staticFile } from "remotion";
import { colors, markerPinkStyle, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { DrawPath } from "../../parts/draw";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L6-fraud-triangle.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L6 ★: 攻撃者と不正のメカニズム
 *
 * 発注書 content_works/ipa_sg/orders/L6.md に対応。シナリオは
 * narration/ipa_sg/sg-L6-fraud-triangle.md（用語の呼称表つき）。
 *
 * ★ 不正のトライアングル（機会・動機・正当化）の主担当。L34・L95 はここの言い方に揃える。
 * 構成:
 *   導入（ふつうの人が手を染める）→ ★三角形の図 → どこを崩せるか（機会だけ）→
 *   状況的犯罪予防（心ではなく環境）→ 割れ窓理論（flow）→ 防犯環境設計（bullets）→
 *   wipe-light で「攻撃者は誰か」へ転換 → 攻撃者2×2の地図 → 内部犯がいちばん痛い →
 *   ダークウェブ（用語ドン）→ クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 読みの例外（音声と字幕を分ける。references/narration.md の「難読語」参照）:
 *   s12-2 の「ID」→ 音声は「アイディー」（jobs.json 側が仮名書き。字幕は表記のまま）
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L6-fraud-triangle");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、なぜ人は不正をしてしまうのかを学びます。"),
  N("s02-2.mp3", "情報を持ち出す事件の多くは、社内の人が起こしています。"),
  N("s02-3.mp3", "しかも、もともと悪い人が起こしたわけではありません。"),
  N("s02-4.mp3", "条件がそろったとき、ふつうの人が不正に手を染めてしまうのです。"),
];

const SEG_TRI = [
  N("s03-1.mp3", "不正が起きるしくみを説明するのが、不正のトライアングルです。"),
  N("s03-2.mp3", "一つめは機会。誰も見ていない、いつでも持ち出せるという状況です。"),
  N("s03-3.mp3", "二つめは動機。借金や過大なノルマなど、そうせざるを得ない事情です。"),
  N("s03-4.mp3", "三つめは正当化。自分は正当に評価されていない、という都合のよい理屈です。"),
  N("s03-5.mp3", "この三つがそろったときに、不正は起こります。"),
];

const SEG_BREAK = [
  N("s04-1.mp3", "裏を返せば、三つのうち一つでも崩せば、不正は防げます。"),
  N("s04-2.mp3", "ただし、動機と正当化は、その人の内側にある気持ちです。"),
  N("s04-3.mp3", "組織が直接手を出せるのは、主に機会の側になります。"),
  N("s04-4.mp3", "だから対策の中心は、不正をやりにくい状況をつくることです。"),
];

const SEG_PREVENT = [
  N("s05-1.mp3", "この考え方を、状況的犯罪予防と呼びます。"),
  N("s05-2.mp3", "人の心を変えるのではなく、環境のほうを変える発想です。"),
  N("s05-3.mp3", "ねらいの一つめは、やりにくくすること。"),
  N("s05-4.mp3", "二つめは、見つかりやすくすることです。"),
  N("s05-5.mp3", "持ち出しにくく記録が残る職場なら、機会そのものが消えていきます。"),
];

const SEG_WINDOW = [
  N("s06-1.mp3", "もう一つ、割れ窓理論という考え方があります。"),
  N("s06-2.mp3", "割れた窓を放置した建物は、次々と壊されていくという理論です。"),
  N("s06-3.mp3", "職場も同じで、小さな乱れを放置すると、やがて大きな不正を呼びます。"),
  N("s06-4.mp3", "だから、清掃や整理整頓が、りっぱなセキュリティ対策になります。"),
];

const SEG_CPTED = [
  N("s07-1.mp3", "物理的な場所づくりにも、同じ発想があります。"),
  N("s07-2.mp3", "防犯環境設計は、建物や部屋のつくりで犯行の機会を減らす考え方です。"),
  N("s07-3.mp3", "まず見通しをよくして、死角をなくします。"),
  N("s07-4.mp3", "次に動線を絞り、通れる場所を限ります。"),
  N("s07-5.mp3", "そして監視の目を届かせ、記録が残るようにします。"),
];

// 「内部犯」は TTS が「ないぶほん」と誤読するため、音声側（jobs.json）だけ「ないぶはん」と
// 仮名書きにしてある。字幕（下の text）は漢字のまま — 音声と原稿の食い違いは意図的。
const SEG_ACTORS = [
  N("s08-1.mp3", "ここからは、実際に攻撃してくる人たちを見ていきます。"),
  N("s08-2.mp3", "スクリプトキディは、公開された攻撃ツールを使うだけの初心者です。"),
  N("s08-3.mp3", "愉快犯は、騒ぎを起こして注目されること自体が目的です。"),
  N("s08-4.mp3", "詐欺犯は、金銭が目的で、いまの攻撃の主流になっています。"),
  N("s08-5.mp3", "そして内部犯は、正規の権限を持った社内の人です。"),
];

const SEG_INSIDER = [
  N("s09-1.mp3", "この中で、いちばん痛いのが内部犯です。"),
  N("s09-2.mp3", "もともと入る権限があるので、壁を破る必要がありません。"),
  N("s09-3.mp3", "どこに大事な情報があるかも、最初から知っています。"),
  N("s09-4.mp3", "外からの侵入を防ぐ対策では、そもそも止められないのです。"),
];

const SEG_DARKWEB = [
  N("s10-1.mp3", "最後に、ダークウェブを押さえましょう。"),
  N("s10-2.mp3", "特別なソフトでしかたどり着けない、匿名性の高い領域です。"),
  N("s10-3.mp3", "ここでは、盗まれた情報や攻撃ツールが売り買いされています。"),
  N("s10-4.mp3", "攻撃が商売として成り立つ、その入口がここにあります。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  // 音声は「アイディー」（TTSの英字読みを避ける。字幕は ID のまま）
  N("s12-2.mp3", "共有のアカウントをやめて、一人ひとりのIDに分ける対策があります。"),
  N("s12-3.mp3", "この対策は、三つのうちどれを崩しているでしょうか。"),
  N("s12-4.mp3", "正解は、機会を取り除いている、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "割れ窓理論が教えているのは、どちらの考え方でしょうか。"),
  N("s13-3.mp3", "正解は、小さな乱れが大きな不正を呼ぶ、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "内部犯が止めにくいのは、なぜでしょうか。"),
  N("s14-3.mp3", "正解は、正規の権限を持っているから、です。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s15-1.mp3", "不正は、機会、動機、正当化の三つがそろったときに起こります。"),
  N("s15-2.mp3", "組織が崩せるのは主に機会で、やりにくく見つかりやすい環境をつくります。"),
  N("s15-3.mp3", "攻撃者の中では、正規の権限を持つ内部犯が、いちばん止めにくい相手です。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 語句単位のハイライト（説明文の開始で用語を濃色に）
// ---------------------------------------------------------------------------

const HighlightSpan: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const on = useProgress(atSec, 0.3);
  const color = interpolateColors(on, [0, 1], [colors.textSecondary, colors.primary600]);
  return <span style={{ color }}>{text}</span>;
};

// ---------------------------------------------------------------------------
// P2: 導入（左テキスト + 右イラスト）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const illustAppear = useAppear(0.5);
  const subAppear = useAppear(segStart(SEG_INTRO, 2));
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1.2, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 21 * SCALE, fontWeight: 800, lineHeight: 1.45, ...leadAppear }}>
            不正をするのは
            <br />
            <span style={markerStyle}>特別な人</span>ではない
          </span>
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, lineHeight: 1.6, ...subAppear }}>
            <span style={{ color: colors.textSecondary }}>持ち出す事件の多くは社内の人</span>
            <br />
            <HighlightSpan text="ふつうの人でも手を染める" atSec={segStart(SEG_INTRO, 3)} />
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-employee-m-worry.png")}
          style={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: ★不正のトライアングル（三角形の頂点に3要素・中央に「不正が起きる」）
// 図の座標系は viewBox 360×165 と同じ比率のボックス（%配置）で揃える
// ---------------------------------------------------------------------------

// 中央のカードが三角形の2辺に重ならないよう、CORE の高さでの内幅（≒155単位）より
// カード幅（≒133単位）が小さくなる比率で座標を決めてある。文言を長くするときは要再計算
const TRI_W = 400;
const TRI_H = 165;
const APEX = { x: 200, y: 30 };
const BL = { x: 56, y: 138 };
const BR = { x: 344, y: 138 };
const CORE = { x: 200, y: 88 };

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

const VertexChip: React.FC<{
  x: number;
  y: number;
  name: string;
  desc: string;
  atSec: number;
}> = ({ x, y, name, desc, atSec }) => (
  <div
    style={{
      position: "absolute",
      left: pct(x, TRI_W),
      top: pct(y, TRI_H),
      translate: "-50% -50%",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
        padding: `${6 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 14 * SCALE,
        backgroundColor: colors.surface,
        border: `${2 * SCALE}px solid ${colors.primary500}`,
        whiteSpace: "nowrap",
        boxShadow: `0 ${3 * SCALE}px ${10 * SCALE}px rgba(30, 41, 59, 0.10)`,
        ...usePop(atSec),
      }}
    >
      <b style={{ fontSize: 15 * SCALE, fontWeight: 800, color: colors.primary600 }}>{name}</b>
      <span style={{ fontSize: 10 * SCALE, fontWeight: 700, color: colors.textSecondary }}>{desc}</span>
    </div>
  </div>
);

const TriangleScene: React.FC = () => {
  const core = usePop(segStart(SEG_TRI, 4), { from: 0.5 });
  return (
    <SlideShell
      heading="不正のトライアングル"
      icon={<Ms name="warning" size={videoType.slideHeadIcon} />}
      narration={SEG_TRI}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: TRI_W * SCALE, height: TRI_H * SCALE, flex: "none" }}>
          <svg
            viewBox={`0 0 ${TRI_W} ${TRI_H}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <DrawPath
              d={`M ${APEX.x} ${APEX.y} L ${BR.x} ${BR.y} L ${BL.x} ${BL.y} Z`}
              delaySec={0.4}
              durSec={1.6}
              stroke={colors.primary300}
              strokeWidth={2.5}
            />
          </svg>

          {/* 中央：三つがそろうと不正が起きる */}
          <div
            style={{
              position: "absolute",
              left: pct(CORE.x, TRI_W),
              top: pct(CORE.y, TRI_H),
              translate: "-50% -50%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7 * SCALE,
                padding: `${6 * SCALE}px ${14 * SCALE}px`,
                borderRadius: 12 * SCALE,
                backgroundColor: colors.primary600,
                color: colors.surface,
                whiteSpace: "nowrap",
                ...core,
              }}
            >
              <Ms name="gpp_bad" size={20 * SCALE} />
              <b style={{ fontSize: 13 * SCALE, fontWeight: 800 }}>不正が起きる</b>
            </div>
          </div>

          <VertexChip
            x={APEX.x}
            y={APEX.y}
            name="機会"
            desc="誰も見ていない"
            atSec={segStart(SEG_TRI, 1)}
          />
          <VertexChip
            x={BL.x}
            y={BL.y}
            name="動機"
            desc="借金・ノルマ"
            atSec={segStart(SEG_TRI, 2)}
          />
          <VertexChip
            x={BR.x}
            y={BR.y}
            name="正当化"
            desc="自分は悪くない"
            atSec={segStart(SEG_TRI, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: どこを崩せるか（3カード + 可否バッジ + 結論バンド）
// ---------------------------------------------------------------------------

const BreakCard: React.FC<{
  icon: string;
  name: string;
  badge: string;
  badgeIcon: string;
  /** 0→1 で「組織が崩せる」側として点灯する */
  on: number;
  /** 0→1 で「内側の問題」として退く */
  off: number;
  atSec: number;
}> = ({ icon, name, badge, badgeIcon, on, off, atSec }) => {
  const appear = useAppear(atSec);
  const bg = interpolateColors(on, [0, 1], [colors.surface, colors.primary600]);
  const borderColor = interpolateColors(
    Math.max(on, off),
    [0, 1],
    [colors.border, on > off ? colors.primary600 : colors.border],
  );
  const fg = interpolateColors(on, [0, 1], [colors.textPrimary, colors.surface]);
  const badgeBg = interpolateColors(on, [0, 1], [colors.bg, colors.primary800]);
  const badgeFg = interpolateColors(on, [0, 1], [colors.textSecondary, colors.surface]);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5 * SCALE,
        padding: `${12 * SCALE}px ${6 * SCALE}px`,
        borderRadius: 16 * SCALE,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${borderColor}`,
        opacity: (appear.opacity as number) * (1 - off * 0.4),
        translate: appear.translate,
      }}
    >
      <span style={{ color: on > 0.5 ? colors.surface : colors.primary600, display: "flex" }}>
        <Ms name={icon} size={26 * SCALE} />
      </span>
      <b style={{ fontSize: 16 * SCALE, fontWeight: 800, color: fg }}>{name}</b>
      <span
        style={{
          marginTop: 2 * SCALE,
          padding: `${3 * SCALE}px ${9 * SCALE}px`,
          borderRadius: 999,
          fontSize: 10 * SCALE,
          fontWeight: 800,
          whiteSpace: "nowrap",
          backgroundColor: badgeBg,
          color: badgeFg,
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
        }}
      >
        <Ms name={badgeIcon} size={13 * SCALE} />
        {badge}
      </span>
    </div>
  );
};

const BreakScene: React.FC = () => {
  const inner = useProgress(segStart(SEG_BREAK, 1), 0.4);
  const chance = useProgress(segStart(SEG_BREAK, 2), 0.4);
  const band = useAppear(segStart(SEG_BREAK, 3));
  return (
    <SlideShell
      heading="崩せるのは、どれか"
      icon={<Ms name="build" size={videoType.slideHeadIcon} />}
      narration={SEG_BREAK}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 9 * SCALE,
        }}
      >
        <div style={{ display: "flex", gap: 9 * SCALE, alignItems: "stretch" }}>
          <BreakCard
            icon="lock_open"
            name="機会"
            badge="組織が崩せる"
            badgeIcon="task_alt"
            on={chance}
            off={0}
            atSec={0.3}
          />
          <BreakCard
            icon="psychology"
            name="動機"
            badge="本人の内側"
            badgeIcon="favorite"
            on={0}
            off={inner}
            atSec={0.45}
          />
          <BreakCard
            icon="forum"
            name="正当化"
            badge="本人の内側"
            badgeIcon="favorite"
            on={0}
            off={inner}
            atSec={0.6}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8 * SCALE,
            fontSize: 14 * SCALE,
            fontWeight: 800,
            ...band,
          }}
        >
          <Ms name="lightbulb" size={19 * SCALE} />
          <span>
            対策の中心は<span style={markerPinkStyle}>やりにくい状況をつくる</span>こと
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 状況的犯罪予防（否定 → 肯定の階層・疎ページ）
// ---------------------------------------------------------------------------

const AimChip: React.FC<{ icon: string; text: string; atSec: number }> = ({ icon, text, atSec }) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      gap: 7 * SCALE,
      padding: `${7 * SCALE}px ${16 * SCALE}px`,
      borderRadius: 999,
      backgroundColor: colors.primary50,
      color: colors.primary600,
      fontSize: 14 * SCALE,
      fontWeight: 800,
      whiteSpace: "nowrap",
      ...usePop(atSec),
    }}
  >
    <Ms name={icon} size={19 * SCALE} />
    {text}
  </span>
);

const PreventScene: React.FC = () => {
  const deny = useAppear(0.3);
  const arrow = useAppear(segStart(SEG_PREVENT, 1) - 0.2);
  const main = usePop(segStart(SEG_PREVENT, 1), { from: 0.8 });
  const note = useAppear(segStart(SEG_PREVENT, 4));
  return (
    <SlideShell
      heading="状況的犯罪予防"
      icon={<Ms name="policy" size={videoType.slideHeadIcon} />}
      narration={SEG_PREVENT}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        <span
          style={{
            fontSize: 14 * SCALE,
            fontWeight: 700,
            color: colors.textMuted,
            textDecoration: "line-through",
            ...deny,
          }}
        >
          人の心を変える
        </span>
        <span style={{ color: colors.textMuted, display: "flex", ...arrow }}>
          <Ms name="trending_down" size={22 * SCALE} />
        </span>
        <b style={{ fontSize: 27 * SCALE, fontWeight: 800, color: colors.primary600, ...main }}>
          環境のほうを変える
        </b>
        <div style={{ display: "flex", gap: 10 * SCALE, marginTop: 4 * SCALE }}>
          <AimChip icon="lock" text="やりにくく" atSec={segStart(SEG_PREVENT, 2)} />
          <AimChip icon="visibility" text="見つかりやすく" atSec={segStart(SEG_PREVENT, 3)} />
        </div>
        {/* 画面は要点だけ（読み上げ全文は字幕が担う） */}
        <span
          style={{
            marginTop: 4 * SCALE,
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            ...note,
          }}
        >
          機会そのものが消えていく
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 攻撃者の地図（2×2グリッド・内部犯だけ色が変わる）
// ---------------------------------------------------------------------------

const ActorCard: React.FC<{
  icon: string;
  name: string;
  desc: string;
  atSec: number;
  strong?: boolean;
}> = ({ icon, name, desc, atSec, strong }) => {
  const appear = useAppear(atSec);
  const bg = strong ? colors.primary600 : colors.surface;
  const fg = strong ? colors.surface : colors.textPrimary;
  const sub = strong ? colors.primary100 : colors.textSecondary;
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 11 * SCALE,
        padding: `${11 * SCALE}px ${14 * SCALE}px`,
        borderRadius: 16 * SCALE,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${strong ? colors.primary600 : colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 38 * SCALE,
          height: 38 * SCALE,
          borderRadius: 13 * SCALE,
          backgroundColor: strong ? colors.primary800 : colors.primary50,
          color: strong ? colors.surface : colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={22 * SCALE} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 * SCALE, minWidth: 0 }}>
        <b style={{ fontSize: 14.5 * SCALE, fontWeight: 800, color: fg }}>{name}</b>
        <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: sub }}>{desc}</span>
      </span>
    </div>
  );
};

const ActorsScene: React.FC = () => (
  <SlideShell
    heading="攻撃してくるのは誰か"
    icon={<Ms name="groups" size={videoType.slideHeadIcon} />}
    narration={SEG_ACTORS}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "1.5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 9 * SCALE,
      }}
    >
      <div style={{ display: "flex", gap: 9 * SCALE }}>
        <ActorCard
          icon="code"
          name="スクリプトキディ"
          desc="公開ツールを使うだけ"
          atSec={segStart(SEG_ACTORS, 1)}
        />
        <ActorCard
          icon="campaign"
          name="愉快犯"
          desc="騒ぎと注目が目的"
          atSec={segStart(SEG_ACTORS, 2)}
        />
      </div>
      <div style={{ display: "flex", gap: 9 * SCALE }}>
        <ActorCard
          icon="payments"
          name="詐欺犯"
          desc="金銭が目的。いまの主流"
          atSec={segStart(SEG_ACTORS, 3)}
        />
        <ActorCard
          icon="badge"
          name="内部犯"
          desc="権限を持った社内の人"
          atSec={segStart(SEG_ACTORS, 4)}
          strong
        />
      </div>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P9: 内部犯がいちばん痛い（左イラスト + 右テキスト・P2の鏡像）
// ---------------------------------------------------------------------------

const InsiderScene: React.FC = () => {
  const illustAppear = useAppear(0.4);
  const leadAppear = useAppear(0.3);
  const subAppear = useAppear(segStart(SEG_INSIDER, 1));
  const noteAppear = useAppear(segStart(SEG_INSIDER, 3));
  return (
    <SlideShell narration={SEG_INSIDER}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-insider-sneak.png")}
          style={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div style={{ flex: 1.3, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 21 * SCALE, fontWeight: 800, lineHeight: 1.45, ...leadAppear }}>
            <span style={markerPinkStyle}>壁を破る必要</span>が
            <br />
            ない相手
          </span>
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, lineHeight: 1.6, ...subAppear }}>
            <span style={{ color: colors.textSecondary }}>内部犯｜もともと入る権限がある</span>
            <br />
            <HighlightSpan text="どこに大事な情報があるかも知っている" atSec={segStart(SEG_INSIDER, 2)} />
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7 * SCALE,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              ...noteAppear,
            }}
          >
            <Ms name="gpp_bad" size={18 * SCALE} />
            <span>外からの対策では止まらない</span>
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// クイズ幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL6FraudTriangle: VideoSpec = {
  id: "sg-L6-fraud-triangle",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "なぜ人は\n不正をするのか",
      keywords: ["不正のトライアングル", "割れ窓理論", "内部犯"],
    },
    {
      pattern: "custom",
      name: "intro",
      durationSec: 5,
      narration: SEG_INTRO,
      component: IntroScene,
    },
    {
      pattern: "custom",
      name: "fraud-triangle",
      durationSec: 7,
      narration: SEG_TRI,
      component: TriangleScene,
    },
    {
      pattern: "custom",
      name: "break-one",
      durationSec: 5,
      narration: SEG_BREAK,
      component: BreakScene,
    },
    {
      pattern: "custom",
      name: "situational-prevention",
      durationSec: 6,
      narration: SEG_PREVENT,
      component: PreventScene,
    },
    {
      pattern: "flow",
      heading: "割れ窓理論",
      icon: "report",
      steps: [
        { abc: "1", name: "乱れ", sub: "書類が出しっぱなし" },
        { abc: "2", name: "放置", sub: "誰も気に留めない" },
        { abc: "3", name: "不正", sub: "やがて大きな不正へ" },
      ],
      highlightAtSec: [0.6, segStart(SEG_WINDOW, 1), segStart(SEG_WINDOW, 2)],
      narration: SEG_WINDOW,
    },
    {
      pattern: "bullets",
      heading: "防犯環境設計",
      icon: "home",
      bullets: [
        { text: "見通し", sub: "死角をなくす" },
        { text: "動線", sub: "通れる場所を限る" },
        { text: "監視", sub: "人の目と記録を届かせる" },
      ],
      appearAtSec: [segStart(SEG_CPTED, 2), segStart(SEG_CPTED, 3), segStart(SEG_CPTED, 4)],
      illust: "images/ipa_sg/scene-entrance.png",
      narration: SEG_CPTED,
    },
    {
      pattern: "custom",
      name: "attacker-map",
      durationSec: 6,
      narration: SEG_ACTORS,
      transitionIn: "wipe-light",
      component: ActorsScene,
    },
    {
      pattern: "custom",
      name: "insider",
      durationSec: 5,
      narration: SEG_INSIDER,
      component: InsiderScene,
    },
    {
      pattern: "term",
      chip: "攻撃者の市場",
      icon: "travel_explore",
      term: "ダークウェブ",
      sub: "Dark Web — 盗まれた情報や攻撃ツールが売買される匿名の領域",
      narration: SEG_DARKWEB,
    },
    {
      pattern: "custom",
      name: "quiz-intro",
      durationSec: 3,
      narration: SEG_QUIZ_INTRO,
      component: QuizIntroScene,
    },
    {
      pattern: "quiz",
      question: "個人IDに分ける対策が崩すのは？",
      choices: [
        { key: "A", text: "動機を取り除いている" },
        { key: "B", text: "機会を取り除いている", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 3),
    },
    {
      pattern: "quiz",
      question: "割れ窓理論が教えることは？",
      choices: [
        { key: "A", text: "小さな乱れが大きな不正を呼ぶ", correct: true },
        { key: "B", text: "大きな事件だけ防げば十分" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "内部犯が止めにくい理由は？",
      choices: [
        { key: "A", text: "攻撃ツールが高度だから" },
        { key: "B", text: "正規の権限を持っているから", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "不正は、機会、動機、正当化の三つがそろったときに起こります。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "組織が崩せるのは主に機会で、やりにくく見つかりやすい環境をつくります。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "攻撃者の中では、正規の権限を持つ内部犯が、いちばん止めにくい相手です。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
