import React from "react";
import { Img, interpolateColors, staticFile } from "remotion";
import {
  colors,
  fontMono,
  markerStyle,
  markerPinkStyle,
  SCALE,
  videoType,
} from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { NEVER_SEC, useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L50-anonymized-info.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L50:
 * 個人情報保護法②：加工情報と関連制度（第6章＝法務の4本目）
 *
 * 発注書 content_works/ipa_sg/orders/L50.md に対応。
 * シナリオと用語の呼称は narration/ipa_sg/sg-L50-anonymized-info.md が正。
 * ★この回が「匿名加工の手法名」の主担当（L40・L92 がこの呼称を参照する）。
 *
 * 導入（使いたい／渡せない）→ 匿名加工情報 → ★抽象→具体：歩数アプリの場面 →
 * 仮名加工情報との対比 →（wipe-light）削る三つ → ぼかす三つ → k-匿名化 →
 * マイナンバー法・特定個人情報 → JIS Q 15001・プライバシーマーク →
 * 国際的な枠組みの地図 → クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ仮名書きしている。
 *   k-匿名化 → ケー匿名化 / k人以上 → ケー人以上、JIS Q 15001 → ジス キュー いちまんごせんいち、
 *   34歳・30代 → さんじゅうよんさい・さんじゅうだい、ISMS → アイエスエムエス、
 *   OECD・GDPR・PIA → オーイーシーディー・ジーディーピーアール・ピーアイエー。
 *   字幕（下の N() 第2引数）は表記どおりが正で、音声と食い違って見えるが意図的
 *   （references/narration.md の例外規定）。1字ずつ読む略語なので字幕に読みは添えない。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L50-anonymized-info");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "集めた個人情報を、統計や分析に使いたいことがあります。"),
  N("s02-2.mp3", "ですが、本人の同意なしに他社へ渡すことはできません。"),
  N("s02-3.mp3", "そこで、誰の情報か分からないように加工する道があります。"),
  N("s02-4.mp3", "今回は、その加工の作法と、周りの制度を見ていきます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "まず、加工してできる情報の一つ目です。"),
  N("s03-2.mp3", "特定の個人を識別できず、元に戻すこともできない情報です。"),
  N("s03-3.mp3", "これを、匿名加工情報といいます。"),
  N("s03-4.mp3", "ここまで加工すれば、本人の同意なしで第三者に提供できます。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "たとえば、歩数を記録するアプリの利用データです。"),
  N("s04-2.mp3", "保険会社と組んで、健康と歩数の関係を分析したいとします。"),
  N("s04-3.mp3", "氏名やメールアドレスを消し、年齢を年代にまとめて渡します。"),
  N("s04-4.mp3", "誰のデータか分からなくなるので、同意なしでも提供できます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "もう一つ、仮名加工情報という形もあります。"),
  N("s05-2.mp3", "他の情報と照合しなければ、個人を特定できない状態です。"),
  N("s05-3.mp3", "加工の程度が弱いぶん、第三者への提供は原則できません。"),
  N("s05-4.mp3", "社内で分析に使うための、いわば内向きの加工です。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "ここからは、匿名加工の手法に名前をつけていきます。"),
  N("s06-2.mp3", "一つ目は、項目そのものを消す項目削除です。"),
  N("s06-3.mp3", "二つ目は、特定の一行をまるごと消すレコード削除です。"),
  N("s06-4.mp3", "三つ目は、表の一つのマスだけを消すセル削除です。"),
  N("s06-5.mp3", "まずは、消してしまうのが基本の三つです。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "次は、消さずにぼかす手法です。"),
  N("s07-2.mp3", "一般化は、きゅうりを野菜のように、上位の概念へ置き換えます。"),
  N("s07-3.mp3", "トップコーディングは、極端に大きい値をまとめる手法です。"),
  N("s07-4.mp3", "小さい側をまとめる場合は、ボトムコーディングと呼びます。"),
  // 音声は「さんじゅうよんさい を さんじゅうだい」（jobs.json）。字幕は数字表記が正
  N("s07-5.mp3", "丸めは、34歳を30代とするように、数値を丸めることです。"),
];

const SEG_P8 = [
  // 音声は「ケー匿名化」「ケー人以上」（jobs.json）
  N("s08-1.mp3", "さらに進んだ手法が、k-匿名化です。"),
  N("s08-2.mp3", "同じ属性の組み合わせの人が、必ずk人以上いるようにします。"),
  N("s08-3.mp3", "たとえば、三人以上そろうまで年代や地域をぼかしていきます。"),
  N("s08-4.mp3", "一人だけの組み合わせが残ると、そこから特定されるからです。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "ここからは、周りの制度に目を向けます。"),
  N("s09-2.mp3", "マイナンバーを含む個人情報は、特定個人情報と呼ばれます。"),
  N("s09-3.mp3", "扱いはマイナンバー法で定められ、通常より厳格です。"),
  N("s09-4.mp3", "利用できる目的が限られ、他社への提供も制限されています。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "個人情報を守る仕組みにも、規格と認証制度があります。"),
  // 音声は「ジス キュー いちまんごせんいち」（jobs.json）。字幕は数字表記が正
  N("s10-2.mp3", "規格の名前は、JIS Q 15001 といいます。"),
  N("s10-3.mp3", "これに沿った仕組みがあると認められると、マークを使えます。"),
  // 音声は「アイエスエムエス」（jobs.json）
  N("s10-4.mp3", "それがプライバシーマーク、個人情報版のISMS認証です。"),
];

const SEG_P11 = [
  N("s11-1.mp3", "最後に、国際的な枠組みを三つ押さえておきましょう。"),
  N("s11-2.mp3", "まず、OECDプライバシーガイドラインです。"),
  N("s11-3.mp3", "各国の個人情報のルールの土台になった勧告です。"),
  N("s11-4.mp3", "GDPRは、ヨーロッパの厳しい個人データ保護の規則です。"),
  N("s11-5.mp3", "PIAは、新しい仕組みの前に影響を評価する取り組みです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s13-1.mp3", "ここで問題です。"),
  N("s13-2.mp3", "本人の同意なしで第三者に提供できるのは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、匿名加工情報です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s14-1.mp3", "次の問題です。"),
  N("s14-2.mp3", "極端に大きい値をまとめる手法は、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、トップコーディングです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s15-1.mp3", "最後の問題です。"),
  N("s15-2.mp3", "個人情報保護の仕組みを認証する制度は、どちらでしょうか。"),
  N("s15-3.mp3", "正解は、プライバシーマークです。", { gapBeforeSec: 1.8 }),
];

const SEG_P16 = [
  N("s16-1.mp3", "匿名加工情報は、同意なしで第三者に提供できました。"),
  N("s16-2.mp3", "手法は、削るか、ぼかすかの二つの方向でした。"),
  N("s16-3.mp3", "マイナンバーを含む情報は、特定個人情報として厳格に扱います。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <span
    style={{
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      color: colors.primary800,
      backgroundColor: colors.primary100,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      lineHeight: 1.3,
      ...style,
    }}
  >
    {children}
  </span>
);

/** 番号つきの要件行（キーワード見出しの下に置く） */
const ReqRow: React.FC<{ no: string; text: React.ReactNode; atSec: number }> = ({
  no,
  text,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 8 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...appear }}>
      <span
        style={{
          flex: "none",
          width: 13 * SCALE,
          height: 13 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {no}
      </span>
      <span style={{ minWidth: 0, fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
        {text}
      </span>
    </div>
  );
};

/** 結論の帯（青＝結論 / ピンク＝注意） */
const Band: React.FC<{
  icon: string;
  children: React.ReactNode;
  atSec: number;
  tone?: "blue" | "pink" | "plain";
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({ icon, children, atSec, tone = "blue", fontSize = 12.5 * SCALE, style }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const bg =
    tone === "pink"
      ? colors.accentPinkSurface
      : tone === "blue"
        ? colors.primary50
        : colors.surface;
  const bd =
    tone === "pink" ? colors.accentPink : tone === "blue" ? colors.primary500 : colors.border;
  const fg = tone === "pink" ? colors.accentPinkText : colors.textPrimary;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        borderRadius: 12 * SCALE,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${bd}`,
        padding: `${6 * SCALE}px ${11 * SCALE}px`,
        ...appear,
        ...style,
      }}
    >
      <span style={{ flex: "none", color: fg, display: "flex" }}>
        <Ms name={icon} size={14 * SCALE} />
      </span>
      <span style={{ minWidth: 0, fontSize, fontWeight: 800, color: fg, lineHeight: 1.3 }}>
        {children}
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// P2: 導入 — 使いたい / 渡せない の板ばさみ
// ---------------------------------------------------------------------------

const WishCard: React.FC<{
  icon: string;
  text: string;
  atSec: number;
  danger?: boolean;
}> = ({ icon, text, atSec, danger }) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5 * SCALE,
        padding: `${11 * SCALE}px ${8 * SCALE}px`,
        borderRadius: 16 * SCALE,
        backgroundColor: danger ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          width: 32 * SCALE,
          height: 32 * SCALE,
          borderRadius: 13 * SCALE,
          backgroundColor: danger ? colors.surface : colors.primary50,
          color: danger ? colors.accentPinkText : colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={19 * SCALE} />
      </span>
      <b
        style={{
          minWidth: 0,
          fontSize: 14 * SCALE,
          fontWeight: 800,
          lineHeight: 1.3,
          textAlign: "center",
          color: danger ? colors.accentPinkText : colors.textPrimary,
        }}
      >
        {text}
      </b>
    </div>
  );
};

const IntroScene: React.FC = () => {
  const versus = useAppear(0.9, { dy: 0 });
  const answer = usePop(segStart(SEG_P2, 2));
  const chip = useAppear(segStart(SEG_P2, 3), { dy: 8 });

  return (
    <SlideShell narration={SEG_P2}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10 * SCALE,
        }}
      >
        <div style={{ alignSelf: "stretch", display: "flex", alignItems: "center", gap: 6 * SCALE }}>
          <WishCard icon="monitoring" text="分析や統計に使いたい" atSec={0.4} />
          <span
            style={{
              flex: "none",
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.textMuted,
              ...versus,
            }}
          >
            でも
          </span>
          <WishCard
            icon="gpp_bad"
            text="同意なしには渡せない"
            atSec={segStart(SEG_P2, 1)}
            danger
          />
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない。画面は抜け道を一語で言い切る */}
        <b style={{ fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.25, ...answer }}>
          抜け道は、<span style={markerStyle}>加工</span>すること
        </b>

        <Chip style={{ ...chip }}>今回：加工の作法と、まわりの制度の地図</Chip>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 匿名加工情報（キーワード見出し + 要件2つ）
// ---------------------------------------------------------------------------

const AnonymousScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const illust = useAppear(0.65);
  const base = segStart(SEG_P3, 1);

  return (
    <SlideShell narration={SEG_P3}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.5,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 7 * SCALE,
          }}
        >
          <Chip style={{ ...chip }}>加工してできる情報 ①</Chip>
          <b style={{ fontSize: 28 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>匿名加工情報</span>
          </b>
          <ReqRow no="1" text="特定の個人を識別できない" atSec={base} />
          <ReqRow no="2" text="元の個人情報に復元できない" atSec={base + 0.9} />
          {/* 画面は「制度の狙い」まで足して、字幕の文の繰り返しにしない
              （1行に収まる長さにする。長いと帯の中で2行に折り返す） */}
          <Band icon="lock_open" atSec={segStart(SEG_P3, 3)} fontSize={12 * SCALE}>
            同意なしで提供 — 活用と保護の両立
          </Band>
        </div>
        <Img
          src={staticFile("images/ipa_sg/tech-masking.png")}
          style={{
            flex: 0.85,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: ★抽象→具体 — 歩数アプリのデータを保険会社へ
// ---------------------------------------------------------------------------

const SceneNode: React.FC<{
  icon: string;
  label: string;
  atSec: number;
  accent?: boolean;
}> = ({ icon, label, atSec, accent }) => {
  const appear = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        flex: "none",
        width: 50 * SCALE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          width: 32 * SCALE,
          height: 32 * SCALE,
          borderRadius: 13 * SCALE,
          backgroundColor: accent ? colors.primary50 : colors.surface,
          border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
          color: accent ? colors.primary600 : colors.textSecondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <b
        style={{
          minWidth: 0,
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          textAlign: "center",
        }}
      >
        {label}
      </b>
    </div>
  );
};

const SceneArrow: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const appear = useAppear(atSec, { dy: 0 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          minWidth: 0,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: colors.primary600,
          lineHeight: 1.25,
          textAlign: "center",
        }}
      >
        {label}
      </span>
      <span style={{ color: colors.primary500, display: "flex" }}>
        <Ms name="arrow_forward" size={18 * SCALE} />
      </span>
    </div>
  );
};

const WorkChip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const appear = usePop(atSec);
  return (
    <span
      style={{
        minWidth: 0,
        fontSize: 12 * SCALE,
        fontWeight: 800,
        fontFamily: fontMono,
        color: colors.textPrimary,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.primary300}`,
        borderRadius: 999,
        padding: `${4 * SCALE}px ${10 * SCALE}px`,
        lineHeight: 1.3,
        ...appear,
      }}
    >
      {text}
    </span>
  );
};

const CaseScene: React.FC = () => {
  const row = useAppear(0.3, { dy: 12 });
  const workBase = segStart(SEG_P4, 2);

  return (
    <SlideShell
      heading="歩数アプリのデータを渡す"
      icon={<Ms name="directions_walk" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 9 * SCALE,
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            alignItems: "center",
            gap: 5 * SCALE,
            borderRadius: 16 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            padding: `${9 * SCALE}px ${13 * SCALE}px`,
            ...row,
          }}
        >
          <SceneNode icon="person" label="アプリの利用者" atSec={0.4} />
          <SceneArrow label="歩数・年齢・氏名" atSec={0.6} />
          <SceneNode icon="business_center" label="自社" atSec={0.5} accent />
          <SceneArrow label="匿名加工情報" atSec={segStart(SEG_P4, 1)} />
          <SceneNode icon="apartment" label="保険会社" atSec={segStart(SEG_P4, 1) + 0.3} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE }}>
          <WorkChip text="氏名・メール → 削除" atSec={workBase} />
          <WorkChip text="34歳 → 30代" atSec={workBase + 0.7} />
        </div>

        {/* 字幕が「同意なしでも提供できます」を語るので、画面は判断の理由を書く */}
        <Band icon="task_alt" atSec={segStart(SEG_P4, 3)} fontSize={13.5 * SCALE}>
          もう誰のデータか分からない — だから同意が要らない
        </Band>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 削る三つ（項目削除・レコード削除・セル削除）
// ---------------------------------------------------------------------------

const TABLE_COLS = ["氏名", "年齢", "地域", "歩数"];
const TABLE_ROWS: string[][] = [
  ["佐藤 花子", "34", "東京", "8,200"],
  ["鈴木 太郎", "52", "大阪", "5,100"],
  ["田中 一郎", "28", "福岡", "9,600"],
];

/** 消える演出のセル。killAtSec が NEVER_SEC なら一生消えない */
const Cell: React.FC<{ text: string; head?: boolean; killAtSec: number }> = ({
  text,
  head,
  killAtSec,
}) => {
  const on = useProgress(killAtSec, 0.45);
  const baseBg = head ? colors.primary50 : colors.surface;
  const baseFg = head ? colors.primary800 : colors.textPrimary;
  return (
    <span
      style={{
        flex: 1,
        minWidth: 0,
        fontSize: 11.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        textAlign: "center",
        padding: `${4 * SCALE}px ${2 * SCALE}px`,
        backgroundColor: interpolateColors(on, [0, 1], [baseBg, colors.accentPinkSurface]),
        color: interpolateColors(on, [0, 1], [baseFg, colors.accentPinkSoft]),
      }}
    >
      {text}
    </span>
  );
};

const CutLabel: React.FC<{ name: string; where: string; atSec: number }> = ({
  name,
  where,
  atSec,
}) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
        padding: `${5 * SCALE}px ${6 * SCALE}px`,
        ...appear,
      }}
    >
      <b
        style={{
          minWidth: 0,
          fontSize: 13 * SCALE,
          fontWeight: 800,
          color: colors.accentPinkText,
          lineHeight: 1.25,
        }}
      >
        {name}
      </b>
      <span
        style={{
          minWidth: 0,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          lineHeight: 1.25,
        }}
      >
        {where}
      </span>
    </div>
  );
};

const DeleteScene: React.FC = () => {
  const table = useAppear(0.3, { dy: 10 });
  const tItem = segStart(SEG_P6, 1);
  const tRecord = segStart(SEG_P6, 2);
  const tCell = segStart(SEG_P6, 3);

  return (
    <SlideShell
      heading="匿名加工の手法① 消す"
      icon={<Ms name="table_chart" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 9 * SCALE,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 12 * SCALE,
            overflow: "hidden",
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...table,
          }}
        >
          <div style={{ display: "flex", borderBottom: `${1.5 * SCALE}px solid ${colors.border}` }}>
            {TABLE_COLS.map((c, ci) => (
              <Cell key={c} text={c} head killAtSec={ci === 0 ? tItem : NEVER_SEC} />
            ))}
          </div>
          {TABLE_ROWS.map((r, ri) => (
            <div
              key={r[0]}
              style={{
                display: "flex",
                borderTop: ri === 0 ? undefined : `${1 * SCALE}px solid ${colors.border}`,
              }}
            >
              {r.map((v, ci) => {
                const kill =
                  ri === 1 ? tRecord : ci === 0 ? tItem : ri === 2 && ci === 2 ? tCell : NEVER_SEC;
                return <Cell key={TABLE_COLS[ci]} text={v} killAtSec={kill} />;
              })}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 6 * SCALE }}>
          <CutLabel name="項目削除" where="列をまるごと" atSec={tItem} />
          <CutLabel name="レコード削除" where="行をまるごと" atSec={tRecord} />
          <CutLabel name="セル削除" where="1つのマスだけ" atSec={tCell} />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: ぼかす三つ（一般化・トップ（ボトム）コーディング・丸め）
// ---------------------------------------------------------------------------

const BlurRow: React.FC<{
  name: React.ReactNode;
  how: string;
  from: string;
  to: string;
  atSec: number;
}> = ({ name, how, from, to, atSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const valueStyle: React.CSSProperties = {
    minWidth: 0,
    fontSize: 12.5 * SCALE,
    fontWeight: 800,
    fontFamily: fontMono,
    lineHeight: 1.3,
    backgroundColor: colors.surface,
    border: `${1.5 * SCALE}px solid ${colors.border}`,
    borderRadius: 999,
    padding: `${3 * SCALE}px ${9 * SCALE}px`,
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        borderTop: `${1.5 * SCALE}px solid ${colors.border}`,
        paddingTop: 5 * SCALE,
        ...appear,
      }}
    >
      <div
        style={{
          flex: 1.15,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1 * SCALE,
        }}
      >
        <b style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
          {name}
        </b>
        <span
          style={{
            minWidth: 0,
            fontSize: 10 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.25,
          }}
        >
          {how}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5 * SCALE,
        }}
      >
        <span style={valueStyle}>{from}</span>
        <span style={{ flex: "none", color: colors.primary500, display: "flex" }}>
          <Ms name="arrow_forward" size={15 * SCALE} />
        </span>
        <span
          style={{
            ...valueStyle,
            backgroundColor: colors.primary50,
            borderColor: colors.primary500,
            color: colors.primary800,
          }}
        >
          {to}
        </span>
      </div>
    </div>
  );
};

const BlurScene: React.FC = () => {
  const bottom = useAppear(segStart(SEG_P7, 3), { dy: 8 });

  return (
    <SlideShell
      heading="匿名加工の手法② ぼかす"
      icon={<Ms name="swap_horiz" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        <BlurRow
          name={<span style={markerStyle}>一般化</span>}
          how="上位の概念に置き換える"
          from="きゅうり"
          to="野菜"
          atSec={segStart(SEG_P7, 1)}
        />
        <BlurRow
          name={
            <span style={markerStyle}>
              トップ（ボトム）
              <br />
              コーディング
            </span>
          }
          how="極端に大きい（小さい）値をまとめる"
          from="115歳"
          to="80歳以上"
          atSec={segStart(SEG_P7, 2)}
        />
        <span
          style={{
            fontSize: 11 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            lineHeight: 1.3,
            ...bottom,
          }}
        >
          小さい側をまとめるときは ボトムコーディング
        </span>
        <BlurRow
          name={<span style={markerStyle}>丸め</span>}
          how="四捨五入などして丸める"
          from="34歳"
          to="30代"
          atSec={segStart(SEG_P7, 4)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: k-匿名化
// ---------------------------------------------------------------------------

const PersonGroup: React.FC<{
  attrs: string;
  count: number;
  verdict: string;
  ok: boolean;
  atSec: number;
}> = ({ attrs, count, verdict, ok, atSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const tone = ok ? colors.primary600 : colors.accentPinkText;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4 * SCALE,
        borderRadius: 14 * SCALE,
        backgroundColor: ok ? colors.primary50 : colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${ok ? colors.primary500 : colors.accentPink}`,
        padding: `${9 * SCALE}px ${12 * SCALE}px`,
        ...appear,
      }}
    >
      {/* 属性と人を1行目、判定を2行目に分ける（横一列にすると判定が2行に割れる） */}
      <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE }}>
        <span
          style={{
            flex: "none",
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            fontFamily: fontMono,
            color: colors.textPrimary,
            lineHeight: 1.3,
          }}
        >
          {attrs}
        </span>
        <span style={{ flex: "none", display: "flex", color: tone }}>
          {Array.from({ length: count }, (_, i) => (
            <Ms key={i} name="person" size={20 * SCALE} />
          ))}
        </span>
      </div>
      <span
        style={{
          minWidth: 0,
          fontSize: 13.5 * SCALE,
          fontWeight: 800,
          color: tone,
          lineHeight: 1.3,
        }}
      >
        {verdict}
      </span>
    </div>
  );
};

const KAnonScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);

  return (
    <SlideShell narration={SEG_P8}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 7 * SCALE,
          }}
        >
          <Chip style={{ ...chip }}>より進んだ匿名加工</Chip>
          <b style={{ fontSize: 32 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>k-匿名化</span>
          </b>
          <ReqRow no="k" text="同じ属性の人がk人以上" atSec={segStart(SEG_P8, 1)} />
        </div>

        <div
          style={{
            flex: 1.35,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8 * SCALE,
          }}
        >
          <PersonGroup
            attrs="30代・関東"
            count={3}
            verdict="3人いる — 誰なのか絞れない"
            ok
            atSec={segStart(SEG_P8, 2)}
          />
          <PersonGroup
            attrs="70代・北陸"
            count={1}
            verdict="1人だけ — そこから特定される"
            ok={false}
            atSec={segStart(SEG_P8, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: マイナンバー法と特定個人情報
// ---------------------------------------------------------------------------

const MyNumberScene: React.FC = () => {
  const chip = useAppear(0.3);
  const illust = useAppear(0.55);
  const term = useAppear(segStart(SEG_P9, 1));
  const strictBase = segStart(SEG_P9, 3);

  return (
    <SlideShell narration={SEG_P9}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.5,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 7 * SCALE,
          }}
        >
          <Chip style={{ ...chip }}>マイナンバーを含む個人情報</Chip>
          <b style={{ fontSize: 28 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>特定個人情報</span>
          </b>
          {/* 画面は根拠の法律名を先に出し、字幕の「通常より厳格です」は下の2点で具体化する */}
          <Band icon="gavel" atSec={segStart(SEG_P9, 2)} tone="plain" fontSize={12 * SCALE}>
            根拠は マイナンバー法
          </Band>
          <ReqRow no="1" text="使ってよい目的が限られる" atSec={strictBase} />
          <ReqRow no="2" text="他社への提供も制限される" atSec={strictBase + 0.8} />
        </div>
        <Img
          src={staticFile("images/ipa_sg/law-mynumber.png")}
          style={{
            flex: 0.85,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: JIS Q 15001 とプライバシーマーク
// ---------------------------------------------------------------------------

const StepBox: React.FC<{
  caption: string;
  main: React.ReactNode;
  atSec: number;
  mainAtSec?: number;
  image?: string;
  accent?: boolean;
}> = ({ caption, main, atSec, mainAtSec, image, accent }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const mainAppear = useAppear(mainAtSec ?? atSec, { dy: 6 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4 * SCALE,
        borderRadius: 14 * SCALE,
        backgroundColor: accent ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
        padding: `${8 * SCALE}px ${7 * SCALE}px`,
        ...appear,
      }}
    >
      <span
        style={{
          fontSize: 10 * SCALE,
          fontWeight: 800,
          color: colors.textMuted,
          lineHeight: 1.25,
        }}
      >
        {caption}
      </span>
      {image ? (
        /* column の中なので実寸で置く（flex で伸ばすと高さ0に潰れる） */
        <Img
          src={staticFile(image)}
          style={{
            width: 26 * SCALE,
            height: 22 * SCALE,
            objectFit: "contain",
            mixBlendMode: "multiply",
          }}
        />
      ) : null}
      <b
        style={{
          minWidth: 0,
          fontSize: 14 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          textAlign: "center",
          ...mainAppear,
        }}
      >
        {main}
      </b>
    </div>
  );
};

const StepArrow: React.FC<{ atSec: number }> = ({ atSec }) => {
  const appear = useAppear(atSec, { dy: 0 });
  return (
    <span
      style={{
        flex: "none",
        color: colors.primary500,
        display: "flex",
        alignItems: "center", // 親が alignItems:"stretch" なので自分で縦中央にする
        ...appear,
      }}
    >
      <Ms name="arrow_forward" size={20 * SCALE} />
    </span>
  );
};

const PrivacyMarkScene: React.FC = () => (
  <SlideShell
    heading="規格と、その認証"
    icon={<Ms name="verified" size={videoType.slideHeadIcon} />}
    narration={SEG_P10}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 11 * SCALE,
      }}
    >
      {/* カードは 1行7文字が上限（幅 ≒ 420px / 文字 56px）。alignItems: stretch で高さを揃える */}
      <div style={{ display: "flex", alignItems: "stretch", gap: 6 * SCALE }}>
        {/* 規格名を後出しにすると、見出しだけの「空のカード」が5秒居座る（出現前フレームで確認）。
            このページの前提になる要素なので、カードと名前をまとめて先に出す */}
        <StepBox
          caption="仕組みの規格"
          main={<span style={markerStyle}>JIS Q 15001</span>}
          atSec={0.4}
        />
        <StepArrow atSec={segStart(SEG_P10, 2)} />
        <StepBox caption="第三者が確かめる" main="審査を受ける" atSec={segStart(SEG_P10, 2)} />
        <StepArrow atSec={segStart(SEG_P10, 2) + 0.5} />
        <StepBox
          caption="認められると使える"
          main={
            <span style={markerStyle}>
              プライバシー
              <br />
              マーク
            </span>
          }
          atSec={segStart(SEG_P10, 2) + 0.6}
          image="images/ipa_sg/mgmt-cert-badge.png"
          accent
        />
      </div>

      {/* 字幕が「個人情報版のISMS認証です」を語るので、画面は対応関係の図式にする */}
      <Band
        icon="compare_arrows"
        atSec={segStart(SEG_P10, 3)}
        fontSize={13 * SCALE}
        style={{ alignSelf: "center" }}
      >
        ISMS認証は組織のセキュリティ全体、Pマークは
        <span style={markerPinkStyle}>個人情報</span>
      </Band>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P11: 国際的な枠組みの地図
// ---------------------------------------------------------------------------

const GlobalCard: React.FC<{
  name: React.ReactNode;
  /** 1行11文字が上限（幅 ≒ 489px / 文字 42px）。カタカナの途中で割れるので改行は明示する */
  desc: React.ReactNode;
  icon?: string;
  image?: string;
  atSec: number;
  descAtSec: number;
}> = ({ name, desc, icon, image, atSec, descAtSec }) => {
  const appear = usePop(atSec);
  const descAppear = useAppear(descAtSec, { dy: 6 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5 * SCALE,
        borderRadius: 16 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        padding: `${10 * SCALE}px ${7 * SCALE}px`,
        ...appear,
      }}
    >
      {image ? (
        <Img
          src={staticFile(image)}
          style={{
            width: 30 * SCALE,
            height: 26 * SCALE,
            objectFit: "contain",
            mixBlendMode: "multiply",
          }}
        />
      ) : (
        <span
          style={{
            width: 26 * SCALE,
            height: 26 * SCALE,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.primary50,
            color: colors.primary600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ms name={icon ?? "public"} size={16 * SCALE} />
        </span>
      )}
      <b
        style={{
          minWidth: 0,
          fontSize: 13.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          textAlign: "center",
        }}
      >
        {name}
      </b>
      <span
        style={{
          minWidth: 0,
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.35,
          textAlign: "center",
          ...descAppear,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const GlobalScene: React.FC = () => {
  const chip = useAppear(0.3);

  return (
    <SlideShell
      heading="国際的な枠組み"
      icon={<Ms name="public" size={videoType.slideHeadIcon} />}
      narration={SEG_P11}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10 * SCALE,
        }}
      >
        <Chip style={{ ...chip }}>日本の法律の外側にも、押さえる枠組みがある</Chip>

        <div style={{ alignSelf: "stretch", display: "flex", alignItems: "stretch", gap: 7 * SCALE }}>
          <GlobalCard
            name={
              <>
                OECDプライバシー
                <br />
                ガイドライン
              </>
            }
            desc={
              <>
                各国のルールの
                <br />
                土台になった勧告
              </>
            }
            icon="history_edu"
            atSec={segStart(SEG_P11, 1)}
            descAtSec={segStart(SEG_P11, 2)}
          />
          <GlobalCard
            name="GDPR"
            desc={
              <>
                ヨーロッパの厳しい
                <br />
                個人データ保護の規則
              </>
            }
            image="images/ipa_sg/law-globe-eu.png"
            atSec={segStart(SEG_P11, 3)}
            descAtSec={segStart(SEG_P11, 3) + 0.5}
          />
          <GlobalCard
            name="PIA"
            desc={
              <>
                プライバシーへの影響を
                <br />
                つくる前に評価する
              </>
            }
            icon="fact_check"
            atSec={segStart(SEG_P11, 4)}
            descAtSec={segStart(SEG_P11, 4) + 0.5}
          />
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

export const SgL50AnonymizedInfo: VideoSpec = {
  id: "sg-L50-anonymized-info",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "個人情報は\n加工すれば使える",
      keywords: ["匿名加工情報", "k-匿名化", "Pマーク"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "intro",
      durationSec: 6,
      narration: SEG_P2,
      component: IntroScene,
    },
    {
      pattern: "custom",
      name: "anonymous",
      durationSec: 6,
      narration: SEG_P3,
      component: AnonymousScene,
    },
    {
      pattern: "custom",
      name: "case",
      durationSec: 6,
      narration: SEG_P4,
      component: CaseScene,
    },
    {
      pattern: "vs",
      heading: "二つの加工情報",
      icon: "alt_route",
      left: {
        title: "匿名加工情報",
        icon: "visibility_off",
        rows: [
          { k: "加工の程度", v: "識別も復元も不可" },
          { k: "第三者提供", v: "同意なしでできる" },
          { k: "使いみち", v: "外部との共同分析" },
        ],
      },
      right: {
        title: "仮名加工情報",
        icon: "badge",
        rows: [
          { k: "加工の程度", v: "照合すれば分かる" },
          { k: "第三者提供", v: "原則できない" },
          { k: "使いみち", v: "社内の分析" },
        ],
      },
      columnAtSec: [0.35, segStart(SEG_P5, 0) + 0.5],
      narration: SEG_P5,
    },
    {
      pattern: "custom",
      name: "delete-methods",
      durationSec: 7,
      narration: SEG_P6,
      component: DeleteScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "blur-methods",
      durationSec: 7,
      narration: SEG_P7,
      component: BlurScene,
    },
    {
      pattern: "custom",
      name: "k-anonymity",
      durationSec: 6,
      narration: SEG_P8,
      component: KAnonScene,
    },
    {
      pattern: "custom",
      name: "my-number",
      durationSec: 6,
      narration: SEG_P9,
      component: MyNumberScene,
    },
    {
      pattern: "custom",
      name: "privacy-mark",
      durationSec: 6,
      narration: SEG_P10,
      component: PrivacyMarkScene,
    },
    {
      pattern: "custom",
      name: "global-map",
      durationSec: 7,
      narration: SEG_P11,
      component: GlobalScene,
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
      question: "同意なしで第三者提供できるのは？",
      choices: [
        { key: "A", text: "仮名加工情報" },
        { key: "B", text: "匿名加工情報", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "極端に大きい値をまとめる手法は？",
      choices: [
        { key: "A", text: "トップコーディング", correct: true },
        { key: "B", text: "丸め" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "個人情報保護の仕組みの認証は？",
      choices: [
        { key: "A", text: "ISMS適合性評価制度" },
        { key: "B", text: "プライバシーマーク", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "匿名加工情報は同意なしで第三者提供できる", checkAtSec: segStart(SEG_P16, 0) },
        { text: "手法は「消す」と「ぼかす」の二方向", checkAtSec: segStart(SEG_P16, 1) },
        { text: "マイナンバーを含めば特定個人情報として厳格に", checkAtSec: segStart(SEG_P16, 2) },
      ],
      narration: SEG_P16,
      transitionIn: "wipe",
    },
  ],
};
