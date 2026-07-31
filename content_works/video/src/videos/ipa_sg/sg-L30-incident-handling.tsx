import { Img, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L30-incident-handling.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L30: インシデントハンドリングとセキュリティ組織
 *
 * 発注書 content_works/ipa_sg/orders/L30.md（範囲の正）に対応。
 * シナリオと**用語の呼称表**は narration/ipa_sg/sg-L30-incident-handling.md
 * （★ この回がインシデント管理〈情報セキュリティ側〉の主担当。L93・L94 はこの呼称に従う）。
 *
 * 「気づく → 順位を付ける → 動く → 報告する」を背骨に:
 *   導入（起きたあとに動けるか）→ 事象とインシデントの区別 → ハンドリングの4ステップ（★背骨）→
 *   トリアージ（医療の言葉の借用・vs）→ 具体場面（ある朝の三件）→ レスポンスとテイクダウン →
 *   wipe-light で組織の地図（委員会・CSIRT・PSIRT・SOC）→ エシカルハッカー →
 *   L68 との用語の区別 → クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   外部機関（NISC・IPA・JPCERT/CC）は L31 なので**一つも出さない**（報告先は「経営層や関係先」）。
 *   インシデント対応規程（文書側）は L27、被害状況の調査・復旧の進め方は L26、
 *   デジタルフォレンジックスは L40・L94、ペネトレーションテストは L33 なので語を出さない。
 *   ボットネット・C&C の仕組みは L5（P7 はテイクダウンの対象として名前を出すだけ）。
 *
 * 音声と字幕が違う箇所（narration.md の「読み」の決まり。字幕は N() の第2引数が正）:
 *   CSIRT → シーサート / PSIRT → ピーサート / SOC → ソック / C&Cサーバ → シーアンドシーサーバ
 *   / 24時間 → にじゅうよじかん（音声側だけ仮名書き。定着した読みなので字幕には初出1回だけ添える）
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L30-incident-handling");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、インシデントハンドリングとセキュリティ組織について学びます。"),
  N("s02-2.mp3", "どれだけ備えても、事故が起きてしまうことはあります。"),
  N("s02-3.mp3", "大事なのは、起きたあとに誰が何をするかが決まっているかです。"),
  N("s02-4.mp3", "その動き方と、担う組織をまとめて押さえていきます。"),
];

const SEG_EVENT = [
  N("s03-1.mp3", "まず、言葉の区別から入ります。"),
  N("s03-2.mp3", "気づいた出来事そのものを、情報セキュリティ事象と呼びます。"),
  N("s03-3.mp3", "そのうち、実害が出た、または出そうなものが情報セキュリティインシデントです。"),
  N("s03-4.mp3", "事象は日々いくつも起きるので、インシデントを見分けるのが最初の仕事です。"),
];

const SEG_STEPS = [
  N("s04-1.mp3", "動き方は、四つのステップで押さえます。"),
  N("s04-2.mp3", "最初は検知・連絡受付で、監視や連絡で気づき、窓口で受け付けます。"),
  N("s04-3.mp3", "次がトリアージで、どれから対応するかの順位を決めます。"),
  N("s04-4.mp3", "そしてインシデントレスポンスで、被害を広げない手当てをします。"),
  N("s04-5.mp3", "最後に報告・情報公開で、経営層や関係先に伝えます。"),
];

const SEG_TRIAGE = [
  N("s05-1.mp3", "四つの中で、聞き慣れないのがトリアージでしょう。"),
  N("s05-2.mp3", "もともとは医療の言葉で、けが人が同時に出たときの治療の順番を決めることです。"),
  N("s05-3.mp3", "セキュリティでも連絡は同時に入るので、全部に一度は対応できません。"),
  N("s05-4.mp3", "影響の大きさと緊急度から、対応の順番を決めます。"),
];

const SEG_CASE = [
  N("s06-1.mp3", "具体的な場面で見てみましょう。"),
  N("s06-2.mp3", "ある朝、社内から三件の連絡が届き、担当チームが受け付けました。"),
  N("s06-3.mp3", "顧客情報が漏れた疑いを最優先と決め、その端末をネットワークから切り離します。"),
  N("s06-4.mp3", "原因を確かめて元に戻し、その日のうちに経営層へ報告しました。"),
];

const SEG_RESPONSE = [
  N("s07-1.mp3", "インシデントレスポンスは、被害を広げないための手当てです。"),
  N("s07-2.mp3", "感染した端末を切り離したり、危ないサービスを一時的に止めたりします。"),
  N("s07-3.mp3", "攻撃に使われている外部の仕組みを止めさせる対応が、テイクダウンです。"),
  // 音声は「シーアンドシーサーバ」（読みは L5 に揃えた）。字幕は表記のまま
  N("s07-4.mp3", "自社をかたる偽サイトや、指令を出すC&Cサーバが対象です。"),
];

const SEG_ORG = [
  N("s08-1.mp3", "ここからは、備える組織を見ていきます。"),
  N("s08-2.mp3", "方針と体制を決めるのが、情報セキュリティ委員会です。"),
  // 略語は音声だけ仮名書き。字幕は初出の1回だけ読みを添える
  N("s08-3.mp3", "決まったことにもとづいて実際に動くのが、CSIRT（シーサート）です。"),
  N("s08-4.mp3", "自社製品の脆弱性やインシデントに対応するのが、PSIRT（ピーサート）です。"),
  N("s08-5.mp3", "24時間の体制で監視し、異常を見つけるのがSOC（ソック）です。"),
];

const SEG_ETHICAL = [
  N("s09-1.mp3", "もう一つ、押さえたい役割があります。"),
  N("s09-2.mp3", "攻撃者と同じ技術を、守る側で使う人をエシカルハッカーと呼びます。"),
  N("s09-3.mp3", "弱点を先に見つけて直すために、攻撃者の目で自社を調べます。"),
  N("s09-4.mp3", "実際に攻撃を試すやり方は、のちの回でくわしく学びます。"),
];

const SEG_SAMENAME = [
  N("s10-1.mp3", "最後に、言葉の注意点です。"),
  N("s10-2.mp3", "インシデント管理という言葉は、サービスマネジメントの分野でも使われます。"),
  N("s10-3.mp3", "そちらは、サービスの障害をできるだけ早く元に戻すための活動です。"),
  N("s10-4.mp3", "同じ名前でも別の枠組みなので、のちの章でもう一度整理します。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "インシデントの連絡を受け付けた次にやるのは、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、トリアージで対応の順位を付けることです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "決まったことにもとづいて実際に動くのは、どちらでしょうか。"),
  // 音声は「…もとづいて動くシーサートです。」（読みは s08-3 の初出で字幕に添え済み）
  N("s13-3.mp3", "正解は、決まったことにもとづいて動くCSIRTです。", {
    gapBeforeSec: 1.8,
  }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  // 音声は「ソックが主に担うのは、…」
  N("s14-2.mp3", "SOCが主に担うのは、どちらの役割でしょうか。"),
  N("s14-3.mp3", "正解は、監視して異常を見つけることです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s15-1.mp3", "事象のうち、実害やその恐れがあるものがインシデントです。"),
  N("s15-2.mp3", "対応は、検知と連絡受付、トリアージ、レスポンス、報告の順で進めます。"),
  // 音声は「委員会が決め、シーサートが動き、ソックが監視する…」
  N("s15-3.mp3", "委員会が決め、CSIRTが動き、SOCが監視する体制で備えます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

const NoteChip: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const chip = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${7 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        color: colors.primary800,
        fontSize: 10.5 * SCALE,
        fontWeight: 800,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      {text}
    </span>
  );
};

/** 分類チップ（用語の上に置く小さなラベル） */
const Chip: React.FC<{ text: string; tone?: "blue" | "pink" | "solid" }> = ({
  text,
  tone = "blue",
}) => (
  <span
    style={{
      flex: "none",
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: `${2.5 * SCALE}px ${10 * SCALE}px`,
      color:
        tone === "pink"
          ? colors.textPrimaryDark
          : tone === "solid"
            ? colors.primary600
            : colors.primary800,
      backgroundColor:
        tone === "pink"
          ? colors.accentPink
          : tone === "solid"
            ? colors.surface
            : colors.primary100,
    }}
  >
    {text}
  </span>
);

/** キーワード見出し（分類チップ → 用語 → 定義。囲みは付けない） */
const KeywordLead: React.FC<{
  chip: string;
  chipAtSec: number;
  term: string;
  termSize: number;
  desc: React.ReactNode;
  termAtSec: number;
  descAtSec: number;
  note?: string;
  noteAtSec?: number;
  flex?: number;
}> = ({
  chip,
  chipAtSec,
  term,
  termSize,
  desc,
  termAtSec,
  descAtSec,
  note,
  noteAtSec,
  flex = 1.2,
}) => {
  const chipAppear = useAppear(chipAtSec, { dy: 10 });
  const termAppear = usePop(termAtSec);
  const descAppear = useAppear(descAtSec, { dy: 12 });
  const noteAppear = useAppear(noteAtSec ?? 0, { dy: 10 });
  return (
    <div
      style={{
        flex,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6 * SCALE,
      }}
    >
      <span style={chipAppear}>
        <Chip text={chip} />
      </span>
      <b style={{ fontSize: termSize, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
        <span style={markerStyle}>{term}</span>
      </b>
      <span style={{ fontSize: 12 * SCALE, fontWeight: 700, lineHeight: 1.45, ...descAppear }}>
        {desc}
      </span>
      {note ? (
        <span
          style={{
            fontSize: 10 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.4,
            ...noteAppear,
          }}
        >
          {note}
        </span>
      ) : null}
    </div>
  );
};

// ---------------------------------------------------------------------------
// P2: 導入 — 左イラスト + 右テキスト
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const leadAppear = useAppear(0.3);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/scene-incident.png")}
          style={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.15,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 9 * SCALE,
          }}
        >
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.45,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"事故は起きる。問題は\n"}
            <span style={markerStyle}>そのあと動けるか</span>
          </span>
          <NoteChip
            icon="timeline"
            text="決まった動き方があるか"
            atSec={segStart(SEG_INTRO, 2)}
          />
          <NoteChip
            icon="groups"
            text="担う組織があるか"
            atSec={segStart(SEG_INTRO, 2) + 1.9}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 事象とインシデント — 包含図（大枠＝事象、その中の小枠＝インシデント）
// ---------------------------------------------------------------------------

/** 例の小チップ（枠の中に並べる具体例） */
const ExampleChip: React.FC<{ text: string; tone: "plain" | "pink"; atSec: number }> = ({
  text,
  tone,
  atSec,
}) => {
  const chip = usePop(atSec);
  const pink = tone === "pink";
  return (
    <span
      style={{
        flex: "none",
        fontSize: 10.5 * SCALE,
        fontWeight: 700,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        color: pink ? colors.accentPinkText : colors.textSecondary,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${pink ? colors.accentPinkSoft : colors.border}`,
        borderRadius: 10 * SCALE,
        padding: `${5 * SCALE}px ${11 * SCALE}px`,
        ...chip,
      }}
    >
      {text}
    </span>
  );
};

const EventIncidentScene: React.FC = () => {
  const outerAppear = useAppear(0.3, { dy: 14 });
  const innerAppear = useAppear(segStart(SEG_EVENT, 2), { dy: 14 });
  return (
    <SlideShell
      heading="事象とインシデント"
      icon={<Ms name="info" size={videoType.slideHeadIcon} />}
      narration={SEG_EVENT}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* 外枠 = 情報セキュリティ事象 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 9 * SCALE,
            padding: `${13 * SCALE}px ${15 * SCALE}px ${15 * SCALE}px`,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary100}`,
            borderRadius: 18 * SCALE,
            ...outerAppear,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10 * SCALE }}>
            <Chip text="情報セキュリティ事象" />
            <span style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
              気づいた出来事そのもの
            </span>
          </span>
          <span style={{ display: "flex", gap: 9 * SCALE }}>
            <ExampleChip
              text="ログインの失敗が続いた"
              tone="plain"
              atSec={segStart(SEG_EVENT, 1)}
            />
            <ExampleChip
              text="知らないメールが届いた"
              tone="plain"
              atSec={segStart(SEG_EVENT, 1) + 0.5}
            />
          </span>

          {/* 内枠 = 情報セキュリティインシデント（事象の部分集合） */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 9 * SCALE,
              padding: `${12 * SCALE}px ${14 * SCALE}px ${14 * SCALE}px`,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
              borderRadius: 15 * SCALE,
              ...innerAppear,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 * SCALE }}>
              <Chip text="情報セキュリティインシデント" tone="pink" />
              <span
                style={{
                  fontSize: 12.5 * SCALE,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: colors.accentPinkText,
                }}
              >
                実害が出た、または出そうなもの
              </span>
            </span>
            <span style={{ display: "flex", gap: 9 * SCALE }}>
              <ExampleChip
                text="ウイルスに感染した"
                tone="pink"
                atSec={segStart(SEG_EVENT, 3)}
              />
              <ExampleChip
                text="顧客情報が外に出た"
                tone="pink"
                atSec={segStart(SEG_EVENT, 3) + 0.5}
              />
            </span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: インシデントハンドリングの4ステップ（★背骨）— 横4カード + 矢印
// ---------------------------------------------------------------------------

const StepCard: React.FC<{ no: string; name: string; note: string; atSec: number }> = ({
  no,
  name,
  note,
  atSec,
}) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${13 * SCALE}px ${5 * SCALE}px ${15 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 15 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 23 * SCALE,
          height: 23 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {no}
      </span>
      {/* 名前は7文字まであるので pre-line で2行に割る（1行だとカード幅からあふれる）。
          カード内幅は約 310px しかないので 12×SCALE で1行6文字が上限 */}
      <b
        style={{
          fontSize: 12 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {name}
      </b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          textAlign: "center",
          lineHeight: 1.35,
          whiteSpace: "pre-line",
        }}
      >
        {note}
      </span>
    </div>
  );
};

const StepArrow: React.FC<{ atSec: number }> = ({ atSec }) => {
  const arrow = useAppear(atSec, { dy: 0 });
  return (
    <span
      style={{
        flex: "none",
        color: colors.primary300,
        display: "flex",
        alignItems: "center",
        ...arrow,
      }}
    >
      <Ms name="arrow_forward" size={13 * SCALE} />
    </span>
  );
};

const HandlingStepsScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  return (
    <SlideShell
      heading="インシデントハンドリング"
      icon={<Ms name="timeline" size={videoType.slideHeadIcon} />}
      narration={SEG_STEPS}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 13 * SCALE,
        }}
      >
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...leadAppear }}>
          起きたあとの動き方は、<span style={markerStyle}>この四つの順</span>で
        </span>
        {/* alignItems: stretch で4枚のカードの高さを揃える（既定の中央寄せだと段差が出る） */}
        <div style={{ display: "flex", alignItems: "stretch", gap: 5 * SCALE }}>
          <StepCard
            no="1"
            name={"検知・\n連絡受付"}
            note={"監視や連絡で\n気づく"}
            atSec={segStart(SEG_STEPS, 1)}
          />
          <StepArrow atSec={segStart(SEG_STEPS, 2) - 0.3} />
          <StepCard
            no="2"
            name={"トリアージ"}
            note={"どれからやるか\n順位を決める"}
            atSec={segStart(SEG_STEPS, 2)}
          />
          <StepArrow atSec={segStart(SEG_STEPS, 3) - 0.3} />
          <StepCard
            no="3"
            name={"インシデント\nレスポンス"}
            note={"被害を広げない\n手当てをする"}
            atSec={segStart(SEG_STEPS, 3)}
          />
          <StepArrow atSec={segStart(SEG_STEPS, 4) - 0.3} />
          <StepCard
            no="4"
            name={"報告・\n情報公開"}
            note={"経営層や関係先\nに伝える"}
            atSec={segStart(SEG_STEPS, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 具体場面 — 時刻つき4行（★抽象→具体。4ステップが実際にどう現れるか）
// ---------------------------------------------------------------------------

const CaseRow: React.FC<{
  time: string;
  text: string;
  tag: string;
  tone: "bad" | "mid" | "strong";
  atSec: number;
}> = ({ time, text, tag, tone, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  const bg =
    tone === "bad"
      ? colors.accentPinkSurface
      : tone === "strong"
        ? colors.primary100
        : colors.primary50;
  const bd =
    tone === "bad"
      ? colors.accentPinkSoft
      : tone === "strong"
        ? colors.primary300
        : colors.primary100;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        padding: `${7 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${bd}`,
        borderRadius: 13 * SCALE,
        ...row,
      }}
    >
      <b
        style={{
          flex: "none",
          width: 34 * SCALE,
          fontSize: 13 * SCALE,
          fontWeight: 800,
          color: tone === "bad" ? colors.accentPinkText : colors.primary800,
          whiteSpace: "nowrap",
        }}
      >
        {time}
      </b>
      <b
        style={{
          flex: "none",
          fontSize: 13 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </b>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 10 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          lineHeight: 1.3,
          textAlign: "right",
          whiteSpace: "nowrap",
        }}
      >
        {tag}
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => (
  <SlideShell
    heading="ある朝の三件"
    icon={<Ms name="report" size={videoType.slideHeadIcon} />}
    narration={SEG_CASE}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 7 * SCALE,
      }}
    >
      <CaseRow
        time="9:05"
        text="三件の連絡が届く"
        tag="① 検知・連絡受付 — 窓口で受け付ける"
        tone="bad"
        atSec={segStart(SEG_CASE, 1)}
      />
      {/* 本文＋タグは nowrap なので、1行に収まる長さに保つ（長いとカード右端からあふれる） */}
      <CaseRow
        time="9:15"
        text="顧客情報の漏えいを最優先に"
        tag="② トリアージ — 順位を決める"
        tone="mid"
        atSec={segStart(SEG_CASE, 2)}
      />
      <CaseRow
        time="9:20"
        text="その端末を切り離す"
        tag="③ インシデントレスポンス — 広げない"
        tone="mid"
        atSec={segStart(SEG_CASE, 2) + 2.8}
      />
      <CaseRow
        time="16:00"
        text="原因と対処を経営層へ報告"
        tag="④ 報告・情報公開 — 関係先に伝える"
        tone="strong"
        atSec={segStart(SEG_CASE, 3)}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P7: インシデントレスポンスとテイクダウン — 左2行 + 右キーワード見出し
// ---------------------------------------------------------------------------

const ActionRow: React.FC<{ icon: string; title: string; note: string; atSec: number }> = ({
  icon,
  title,
  note,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11 * SCALE,
        padding: `${9 * SCALE}px ${13 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 13 * SCALE,
        ...row,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 34 * SCALE,
          height: 34 * SCALE,
          borderRadius: 12 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={20 * SCALE} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 * SCALE, minWidth: 0 }}>
        <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{title}</b>
        <span
          style={{
            fontSize: 10 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {note}
        </span>
      </span>
    </div>
  );
};

const ResponseScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  return (
    <SlideShell
      heading="インシデントレスポンス"
      icon={<Ms name="security" size={videoType.slideHeadIcon} />}
      narration={SEG_RESPONSE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <div
          style={{
            flex: 1.05,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 9 * SCALE,
          }}
        >
          <span style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.3, ...leadAppear }}>
            <span style={markerStyle}>被害を広げない</span>ための手当て
          </span>
          <ActionRow
            icon="call_split"
            title="切り離す"
            note="感染した端末をネットワークから外す"
            atSec={segStart(SEG_RESPONSE, 1)}
          />
          <ActionRow
            icon="lock"
            title="一時的に止める"
            note="危ないサービスをいったん停止する"
            atSec={segStart(SEG_RESPONSE, 1) + 2.2}
          />
        </div>
        <KeywordLead
          chip="レスポンスの具体例"
          chipAtSec={segStart(SEG_RESPONSE, 2)}
          term="テイクダウン"
          termSize={25 * SCALE}
          desc={
            <>
              攻撃に使われる外部の仕組みを
              <br />
              <span style={markerStyle}>止めさせる</span>
            </>
          }
          termAtSec={segStart(SEG_RESPONSE, 2) + 0.4}
          descAtSec={segStart(SEG_RESPONSE, 2) + 0.8}
          note="対象：自社をかたる偽サイト／指令を出すC&Cサーバ"
          noteAtSec={segStart(SEG_RESPONSE, 3)}
          flex={0.95}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: インシデントに備える組織 — 2段の地図（上＝決める / 下＝動く・製品・見つける）
// ---------------------------------------------------------------------------

const OrgCard: React.FC<{
  role: string;
  icon: string;
  term: string;
  reading?: string;
  desc: string;
  atSec: number;
}> = ({ role, icon, term, reading, desc, atSec }) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 5 * SCALE,
        padding: `${10 * SCALE}px ${14 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 15 * SCALE,
        ...card,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
        <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
          <Ms name={icon} size={17 * SCALE} />
        </span>
        <Chip text={role} />
      </span>
      {/* 読み仮名は用語の下に置くと縦に伸びるので、右に小さく並べる */}
      <span style={{ display: "flex", alignItems: "baseline", gap: 7 * SCALE, minWidth: 0 }}>
        <b style={{ flex: "none", fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
          <span style={markerStyle}>{term}</span>
        </b>
        {reading ? (
          <span
            style={{
              flex: "none",
              fontSize: 9.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              whiteSpace: "nowrap",
            }}
          >
            {reading}
          </span>
        ) : null}
      </span>
      {/* desc は1行に収める（2行にすると3枚の高さが増えて本文領域からあふれる。
          カード内幅は約 425px なので 10.5×SCALE で10文字が上限） */}
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const OrgMapScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const topAppear = useAppear(segStart(SEG_ORG, 1), { dy: 14 });
  return (
    <SlideShell
      heading="インシデントに備える組織"
      icon={<Ms name="groups" size={videoType.slideHeadIcon} />}
      narration={SEG_ORG}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8 * SCALE,
        }}
      >
        <span style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...leadAppear }}>
          <span style={markerStyle}>決める組織</span>と<span style={markerStyle}>動く組織</span>
          を分けておく
        </span>
        {/* 上段: 決める */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 13 * SCALE,
            padding: `${7 * SCALE}px ${16 * SCALE}px`,
            backgroundColor: colors.primary600,
            border: `${1.5 * SCALE}px solid ${colors.primary600}`,
            borderRadius: 15 * SCALE,
            ...topAppear,
          }}
        >
          <span style={{ flex: "none", color: colors.primary100, display: "flex" }}>
            <Ms name="gavel" size={20 * SCALE} />
          </span>
          <Chip text="決める" tone="solid" />
          <b
            style={{
              flex: "none",
              fontSize: 17 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.textPrimaryDark,
              whiteSpace: "nowrap",
            }}
          >
            情報セキュリティ委員会
          </b>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 11 * SCALE,
              fontWeight: 700,
              color: colors.primary100,
              whiteSpace: "nowrap",
            }}
          >
            方針と体制を決める
          </span>
        </div>
        {/* 下段: 動く・製品・見つける */}
        <div style={{ display: "flex", alignItems: "stretch", gap: 11 * SCALE }}>
          <OrgCard
            role="動く"
            icon="support_agent"
            term="CSIRT"
            reading="シーサート"
            desc="対応の実働を担う"
            atSec={segStart(SEG_ORG, 2)}
          />
          <OrgCard
            role="製品"
            icon="devices"
            term="PSIRT"
            reading="ピーサート"
            desc="製品の脆弱性に対応"
            atSec={segStart(SEG_ORG, 3)}
          />
          <OrgCard
            role="見つける"
            icon="visibility"
            term="SOC"
            reading="ソック"
            desc="24時間の監視で発見"
            atSec={segStart(SEG_ORG, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: エシカルハッカー — キーワード見出し + 右イラスト
// ---------------------------------------------------------------------------

const EthicalHackerScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_ETHICAL}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <KeywordLead
          chip="攻撃の技術を守る側で使う人"
          chipAtSec={0.3}
          term="エシカルハッカー"
          termSize={24 * SCALE}
          desc={
            <>
              弱点を<span style={markerStyle}>先に見つけて直す</span>ために
              <br />
              攻撃者の目で自社を調べる
            </>
          }
          termAtSec={segStart(SEG_ETHICAL, 1)}
          descAtSec={segStart(SEG_ETHICAL, 2)}
          note="実際に攻撃を試すやり方は、のちの回で"
          noteAtSec={segStart(SEG_ETHICAL, 3)}
          flex={1.25}
        />
        <Img
          src={staticFile("images/ipa_sg/person-auditor-magnifier.png")}
          style={{
            flex: 0.9,
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
// P10: 同じ言葉が二つの分野に（★L68 との区別）— 2枚カード
// ---------------------------------------------------------------------------

const FieldCard: React.FC<{
  chip: string;
  image: string;
  desc: string;
  atSec: number;
}> = ({ chip, image, desc, atSec }) => {
  const card = useAppear(atSec, { dy: 14 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        padding: `${12 * SCALE}px ${16 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      {/* 画像は flex で伸ばさず実寸で置く（column の中で flex:1 にすると高さが 0 に潰れる） */}
      <Img
        src={staticFile(`images/ipa_sg/${image}`)}
        style={{
          flex: "none",
          width: 42 * SCALE,
          height: 42 * SCALE,
          objectFit: "contain",
          mixBlendMode: "multiply",
        }}
      />
      <span
        style={{
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 5 * SCALE,
        }}
      >
        <Chip text={chip} />
        {/* 画像のぶんテキスト列は約 475px。8文字を1行に収めるには 14.5×SCALE が上限 */}
        <b
          style={{
            fontSize: 14.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          <span style={markerStyle}>インシデント管理</span>
        </b>
        <span
          style={{
            fontSize: 11 * SCALE,
            fontWeight: 700,
            lineHeight: 1.35,
            color: colors.textSecondary,
          }}
        >
          {desc}
        </span>
      </span>
    </div>
  );
};

const SameNameScene: React.FC = () => {
  const noteAppear = useAppear(segStart(SEG_SAMENAME, 3), { dy: 10 });
  return (
    <SlideShell
      heading="同じ言葉が二つの分野に"
      icon={<Ms name="compare_arrows" size={videoType.slideHeadIcon} />}
      narration={SEG_SAMENAME}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16 * SCALE,
        }}
      >
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 13 * SCALE }}>
          <FieldCard
            chip="情報セキュリティ"
            image="icon-shield.png"
            desc="事故を検知し、順位を付けて対応する"
            atSec={0.3}
          />
          <FieldCard
            chip="ITサービスマネジメント"
            image="mgmt-servicedesk.png"
            desc="サービスの障害をできるだけ早く元に戻す"
            atSec={segStart(SEG_SAMENAME, 1)}
          />
        </div>
        <span
          style={{
            flex: "none",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            padding: `${7 * SCALE}px ${14 * SCALE}px`,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary100}`,
            color: colors.primary800,
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...noteAppear,
          }}
        >
          <Ms name="warning" size={16 * SCALE} />
          同じ名前でも別の枠組み — のちの章でもう一度整理します
        </span>
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

export const SgL30IncidentHandling: VideoSpec = {
  id: "sg-L30-incident-handling",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "インシデント対応\nと組織",
      keywords: ["トリアージ", "CSIRT", "SOC"],
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
      name: "event-incident",
      durationSec: 6,
      narration: SEG_EVENT,
      component: EventIncidentScene,
    },
    {
      pattern: "custom",
      name: "handling-steps",
      durationSec: 6,
      narration: SEG_STEPS,
      component: HandlingStepsScene,
    },
    {
      pattern: "vs",
      heading: "トリアージ＝対応の順番を決める",
      icon: "leaderboard",
      left: {
        title: "医療の現場",
        icon: "support_agent",
        rows: [
          { k: "状況", v: "けが人が同時に出る" },
          { k: "判断", v: "治療の順番を決める" },
          { k: "ねらい", v: "助かる人を増やす" },
        ],
      },
      right: {
        title: "セキュリティ",
        icon: "security",
        rows: [
          { k: "状況", v: "連絡が同時に入る" },
          { k: "判断", v: "対応の順番を決める" },
          { k: "ねらい", v: "被害を小さくする" },
        ],
      },
      columnAtSec: [segStart(SEG_TRIAGE, 1), segStart(SEG_TRIAGE, 2)],
      narration: SEG_TRIAGE,
    },
    {
      pattern: "custom",
      name: "case-morning",
      durationSec: 6,
      narration: SEG_CASE,
      component: CaseScene,
    },
    {
      pattern: "custom",
      name: "response-takedown",
      durationSec: 6,
      narration: SEG_RESPONSE,
      component: ResponseScene,
    },
    {
      pattern: "custom",
      name: "org-map",
      durationSec: 7,
      narration: SEG_ORG,
      component: OrgMapScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "ethical-hacker",
      durationSec: 5,
      narration: SEG_ETHICAL,
      component: EthicalHackerScene,
    },
    {
      pattern: "custom",
      name: "same-name",
      durationSec: 6,
      narration: SEG_SAMENAME,
      component: SameNameScene,
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
      question: "連絡を受け付けた次にやるのは？",
      choices: [
        { key: "A", text: "元に戻す作業を始める" },
        { key: "B", text: "トリアージで順位を付ける", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "決まったことにもとづいて動くのは？",
      choices: [
        { key: "A", text: "CSIRT", correct: true },
        { key: "B", text: "情報セキュリティ委員会" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "SOCが主に担う役割は？",
      choices: [
        { key: "A", text: "対応の指揮をとって動く" },
        { key: "B", text: "監視して異常を見つける", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "実害やその恐れがあるものがインシデントです。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "検知・連絡受付、トリアージ、対応、報告の順です。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "委員会が決め、CSIRTが動き、SOCが監視します。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
