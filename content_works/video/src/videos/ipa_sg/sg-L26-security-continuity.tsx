import { Img, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L26-security-continuity.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L26: 情報セキュリティ継続
 *
 * 発注書 content_works/ipa_sg/orders/L26.md（範囲の正）に対応。
 * シナリオは narration/ipa_sg/sg-L26-security-continuity.md。
 *
 * 「事故は起きる前提で、止めない・戻せる」を背骨に:
 *   導入（事故の可能性はゼロにならない）→ 緊急事態の区分3種 → 緊急時対応計画 →
 *   応急の対応と復旧は別の段階（★核心）→ 具体場面（受注システムが止まった朝）→
 *   wipe-light で災害復旧／障害復旧（vs）→ 被害状況の調査（調べてから戻す）→
 *   バックアップによる対策 → 戻せるかの確認 → クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   バックアップの方式名（フル／差分／増分）・世代管理は L59 が主担当なので**一つも出さない**
 *   （P9 は「取り方にはいくつかの方式があり、のちの回で学びます」で止める）。
 *   RTO・RPO・RLO・スタンバイ構成は L69 が主担当なので、復旧の速さは「短い時間で戻す」まで。
 *   BCP・BCM・BIA は L74（P2 で用語を出さずに一言添えるだけ）。
 *   インシデントハンドリングの流れは L30、デジタルフォレンジックス／証拠保全の語は L40・L94。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L26-security-continuity");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、情報セキュリティ継続について学びます。"),
  N("s02-2.mp3", "どれだけ対策をしても、事故が起きる可能性はゼロにはなりません。"),
  N("s02-3.mp3", "起きてしまった時に業務を止めない、そして元に戻せる準備が必要です。"),
  N("s02-4.mp3", "会社全体で事業を続ける計画は、のちの経営の章で学びます。"),
];

const SEG_TYPES = [
  N("s03-1.mp3", "まず、緊急事態には種類があります。"),
  N("s03-2.mp3", "地震や火災などの災害、機器やシステムの障害、そしてサイバー攻撃です。"),
  N("s03-3.mp3", "何が起きたかによって、呼ぶ相手も打つ手も変わってきます。"),
  N("s03-4.mp3", "だから、あらかじめ区分を決めておくことが、初動の速さになります。"),
];

const SEG_PLAN = [
  N("s04-1.mp3", "事故の直後にどう動くかを、事前に決めておく計画があります。"),
  N("s04-2.mp3", "これを緊急時対応計画、またはコンティンジェンシー計画と呼びます。"),
  N("s04-3.mp3", "誰が、何を、どの順でやるかを、あらかじめ文書にしておきます。"),
  N("s04-4.mp3", "慌てている場面で考えるのでは、間に合わないからです。"),
];

const SEG_PHASE = [
  N("s05-1.mp3", "ここで押さえたいのが、対応と復旧は別の段階だということです。"),
  N("s05-2.mp3", "事故の直後は、被害を広げないための応急の対応をします。"),
  N("s05-3.mp3", "業務は、手作業などの代わりの手段で何とか続けます。"),
  N("s05-4.mp3", "そのあと、元の状態に戻していくのが復旧です。"),
  N("s05-5.mp3", "この二つを分けるのが、計画づくりの軸になります。"),
];

const SEG_CASE = [
  N("s06-1.mp3", "具体的な場面で見てみましょう。"),
  N("s06-2.mp3", "月曜の朝、受注システムが止まり、注文が受けられなくなりました。"),
  N("s06-3.mp3", "応急の対応として、注文を電話と紙の伝票で受け付けます。"),
  N("s06-4.mp3", "並行して原因を調べ、午後にシステムを元へ戻しました。"),
];

const SEG_RECOVERY = [
  N("s07-1.mp3", "復旧の計画は、原因の大きさで二通りに分けて考えます。"),
  N("s07-2.mp3", "一つは災害復旧で、地震や火災で拠点ごとやられた場合の備えです。"),
  N("s07-3.mp3", "建物や設備も含めて、離れた場所で立て直すことまで考えます。"),
  N("s07-4.mp3", "もう一つは障害復旧で、機器の故障や不具合への備えです。"),
  N("s07-5.mp3", "部品の交換やデータの復元で、短い時間で戻します。"),
];

const SEG_INVESTIGATE = [
  N("s08-1.mp3", "戻す前に、必ずやることがあります。"),
  N("s08-2.mp3", "何がどこまでやられたのかを、調べて把握することです。"),
  N("s08-3.mp3", "まず、記録が上書きされないように、ログをそのまま残します。"),
  N("s08-4.mp3", "そのうえで、影響が及んだ範囲と原因を突き止めます。"),
  N("s08-5.mp3", "順番を誤って先に戻すと、原因が分からず被害を広げてしまいます。"),
];

const SEG_BACKUP = [
  N("s09-1.mp3", "戻すために欠かせないのが、データの控えを取っておくことです。"),
  N("s09-2.mp3", "これが、バックアップによる対策です。"),
  N("s09-3.mp3", "大事な情報の写しを、別の場所にも置いておきます。"),
  N("s09-4.mp3", "取り方にはいくつかの方式があり、そこはのちの回で学びます。"),
];

const SEG_RESTORE = [
  N("s10-1.mp3", "大事なのは、取ってあるだけでは対策にならない点です。"),
  N("s10-2.mp3", "いざ戻そうとしたら壊れていた、という話は珍しくありません。"),
  N("s10-3.mp3", "実際に戻せるかを、ときどき試して確かめておきます。"),
  N("s10-4.mp3", "同じ部屋に置いた控えは、火事や水害で一緒に失われます。"),
  N("s10-5.mp3", "控えは、離れた場所にも分けて保管します。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "緊急時対応計画は、何のために決めておく計画でしょうか。"),
  N("s12-3.mp3", "正解は、事故の直後の動き方を決めておくためです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "注文を紙の伝票で受け付けるのは、どちらの段階でしょうか。"),
  N("s13-3.mp3", "正解は、業務を続けるための応急の対応です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "バックアップを取ったあとに、確かめておくべきことは何でしょうか。"),
  N("s14-3.mp3", "正解は、実際に元へ戻せるかどうかです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s15-1.mp3", "緊急事態は、災害、障害、攻撃に区分して備えます。"),
  N("s15-2.mp3", "事故の直後の応急の対応と、元に戻す復旧は、分けて計画します。"),
  N("s15-3.mp3", "バックアップは、実際に戻せることを確かめて初めて対策になります。"),
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

/** キーワード見出し（分類チップ → 用語 → 定義。囲みは付けない） */
const KeywordLead: React.FC<{
  chip: string;
  chipAtSec: number;
  term: string;
  termSize: number;
  alias?: string;
  desc: React.ReactNode;
  termAtSec: number;
  descAtSec: number;
  note?: string;
  noteAtSec?: number;
}> = ({
  chip,
  chipAtSec,
  term,
  termSize,
  alias,
  desc,
  termAtSec,
  descAtSec,
  note,
  noteAtSec,
}) => {
  const chipAppear = useAppear(chipAtSec, { dy: 10 });
  const termAppear = usePop(termAtSec);
  const descAppear = useAppear(descAtSec, { dy: 12 });
  const noteAppear = useAppear(noteAtSec ?? 0, { dy: 10 });
  return (
    <div
      style={{
        flex: 1.2,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6 * SCALE,
      }}
    >
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
          backgroundColor: colors.primary100,
          borderRadius: 999,
          padding: `${2 * SCALE}px ${10 * SCALE}px`,
          ...chipAppear,
        }}
      >
        {chip}
      </span>
      <b style={{ fontSize: termSize, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
        <span style={markerStyle}>{term}</span>
      </b>
      {alias ? (
        <span
          style={{
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            color: colors.primary600,
            lineHeight: 1.3,
            ...termAppear,
          }}
        >
          {alias}
        </span>
      ) : null}
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
  const leadAppear = useAppear(0.3);
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/mgmt-bcp.png")}
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
            alignItems: "flex-start", // チップを内容幅に収める（column では既定で横に伸びる）
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
            {"事故は起きる前提で\n"}
            <span style={markerStyle}>止めない・戻せる</span>
          </span>
          <NoteChip
            icon="autorenew"
            text="業務を止めない工夫"
            atSec={segStart(SEG_INTRO, 2)}
          />
          <NoteChip
            icon="cached"
            text="元の状態に戻す備え"
            atSec={segStart(SEG_INTRO, 2) + 1.8}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 緊急事態の区分 — 3カード（1文の中の言及順に合わせて時間差で出す）
// ---------------------------------------------------------------------------

const TypeCard: React.FC<{
  icon: string;
  label: string;
  example: string;
  atSec: number;
}> = ({ icon, label, example, atSec }) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        width: 118 * SCALE,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5 * SCALE,
        padding: `${12 * SCALE}px ${8 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 15 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          width: 44 * SCALE,
          height: 44 * SCALE,
          borderRadius: 15 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={26 * SCALE} />
      </span>
      <b style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{label}</b>
      <span
        style={{
          fontSize: 10 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          textAlign: "center",
          lineHeight: 1.35,
          whiteSpace: "pre-line",
        }}
      >
        {example}
      </span>
    </div>
  );
};

const EmergencyTypesScene: React.FC = () => {
  // s03-2 が3区分を1文で言い切るので、文の中の言及順に合わせて送る
  const base = segStart(SEG_TYPES, 1);
  return (
    <SlideShell
      heading="緊急事態は区分して備える"
      icon={<Ms name="warning" size={videoType.slideHeadIcon} />}
      narration={SEG_TYPES}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12 * SCALE,
        }}
      >
        <div style={{ display: "flex", gap: 14 * SCALE }}>
          <TypeCard icon="bolt" label="災害" example={"地震・火災\n停電など"} atSec={base + 0.4} />
          <TypeCard icon="build" label="障害" example={"機器の故障\nシステムの不具合"} atSec={base + 2.6} />
          <TypeCard icon="gpp_bad" label="攻撃" example={"サイバー攻撃\nによる被害"} atSec={base + 5.0} />
        </div>
        <NoteChip icon="schedule" text="区分ごとに初動を決めておく" atSec={segStart(SEG_TYPES, 3)} />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 緊急時対応計画 — キーワード見出し + 右イラスト
// ---------------------------------------------------------------------------

const ContingencyScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_PLAN}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <KeywordLead
          chip="事故の直後に動くための計画"
          chipAtSec={0.3}
          term="緊急時対応計画"
          termSize={27 * SCALE}
          alias="＝ コンティンジェンシー計画"
          desc={
            <>
              <span style={markerStyle}>誰が・何を・どの順で</span>やるかを文書に
            </>
          }
          termAtSec={segStart(SEG_PLAN, 1)}
          descAtSec={segStart(SEG_PLAN, 2)}
        />
        <Img
          src={staticFile("images/ipa_sg/person-leader-point.png")}
          style={{
            flex: 0.95,
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
// P5: 応急の対応と復旧は別の段階（★核心）— 横並びの2フェーズ
// ---------------------------------------------------------------------------

/** フェーズ帯の中の一言（読み上げに合わせて1つずつ出す） */
const PhaseNote: React.FC<{ text: string; atSec: number; strong: boolean }> = ({
  text,
  atSec,
  strong,
}) => {
  const note = useAppear(atSec, { dy: 8 });
  return (
    <span
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        fontSize: 10.5 * SCALE,
        fontWeight: 700,
        lineHeight: 1.25,
        whiteSpace: "nowrap",
        color: strong ? colors.primary100 : colors.textSecondary,
        ...note,
      }}
    >
      <Ms name="check_circle" size={15 * SCALE} />
      {text}
    </span>
  );
};

/**
 * 横1列に並べると帯の幅が足りず用語が折り返すので、フェーズは縦に積む
 * （上から下が時間の流れ。step ラベルの「直後」「そのあと」で順序を示す）
 */
const PhaseBand: React.FC<{
  step: string;
  title: string;
  notes: { text: string; atSec: number }[];
  tone: "mid" | "strong";
  atSec: number;
}> = ({ step, title, notes, tone, atSec }) => {
  const band = useAppear(atSec, { dy: 14 });
  const strong = tone === "strong";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14 * SCALE,
        padding: `${8 * SCALE}px ${16 * SCALE}px`,
        backgroundColor: strong ? colors.primary600 : colors.primary50,
        border: `${1.5 * SCALE}px solid ${strong ? colors.primary600 : colors.primary100}`,
        borderRadius: 15 * SCALE,
        ...band,
      }}
    >
      <span
        style={{
          flex: "none",
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: strong ? colors.primary600 : colors.primary800,
          backgroundColor: strong ? colors.primary100 : colors.surface,
          borderRadius: 999,
          padding: `${2.5 * SCALE}px ${9 * SCALE}px`,
          whiteSpace: "nowrap",
        }}
      >
        {step}
      </span>
      <b
        style={{
          flex: "none",
          width: 90 * SCALE,
          fontSize: 17 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          color: strong ? colors.textPrimaryDark : colors.textPrimary,
        }}
      >
        {title}
      </b>
      {notes.map((note) => (
        <PhaseNote key={note.text} text={note.text} atSec={note.atSec} strong={strong} />
      ))}
    </div>
  );
};

const PhaseScene: React.FC = () => {
  const startAppear = usePop(0.3);
  const axisAppear = useAppear(segStart(SEG_PHASE, 4), { dy: 10 });
  return (
    <SlideShell
      heading="対応と復旧は別の段階"
      icon={<Ms name="timeline" size={videoType.slideHeadIcon} />}
      narration={SEG_PHASE}
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
        <span
          style={{
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            padding: `${7 * SCALE}px ${13 * SCALE}px`,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
            color: colors.accentPinkText,
            fontSize: 12 * SCALE,
            fontWeight: 800,
            whiteSpace: "nowrap",
            ...startAppear,
          }}
        >
          <Ms name="error" size={17 * SCALE} />
          事故の発生
        </span>
        <PhaseBand
          step="直後"
          title="応急の対応"
          tone="mid"
          atSec={segStart(SEG_PHASE, 1)}
          notes={[
            { text: "被害を広げない", atSec: segStart(SEG_PHASE, 1) + 0.5 },
            { text: "代わりの手段で続ける", atSec: segStart(SEG_PHASE, 2) },
          ]}
        />
        <PhaseBand
          step="そのあと"
          title="復旧"
          tone="strong"
          atSec={segStart(SEG_PHASE, 3)}
          notes={[{ text: "元の状態に戻していく", atSec: segStart(SEG_PHASE, 3) + 0.5 }]}
        />
        <span
          style={{
            marginTop: 3 * SCALE,
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...axisAppear,
          }}
        >
          <span style={markerStyle}>分けて考える</span>のが計画づくりの軸
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 具体場面 — 左イラスト + 右に時刻つき3行（抽象→具体）
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
    tone === "bad" ? colors.accentPinkSoft : tone === "strong" ? colors.primary300 : colors.primary100;
  const timeColor = tone === "bad" ? colors.accentPinkText : colors.primary800;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11 * SCALE,
        padding: `${7 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${bd}`,
        borderRadius: 13 * SCALE,
        ...row,
      }}
    >
      <b
        style={{
          flex: "none",
          fontSize: 13 * SCALE,
          fontWeight: 800,
          color: timeColor,
          whiteSpace: "nowrap",
        }}
      >
        {time}
      </b>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 * SCALE, minWidth: 0 }}>
        {/* 1行に収まる長さに保つ（2行になると3枚で本文領域からあふれる） */}
        <span style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.3, whiteSpace: "nowrap" }}>
          {text}
        </span>
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {tag}
        </span>
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => {
  const illustAppear = useAppear(0.3);
  return (
    <SlideShell
      heading="受注システムが止まった朝"
      icon={<Ms name="report" size={videoType.slideHeadIcon} />}
      narration={SEG_CASE}
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
        <Img
          src={staticFile("images/ipa_sg/scene-incident.png")}
          style={{
            flex: 0.7,
            minWidth: 0,
            maxHeight: "100%",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.5,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 9 * SCALE,
          }}
        >
          <CaseRow
            time="9:00"
            text="受注システムが停止"
            tag="緊急事態の発生（障害）— 注文が受けられない"
            tone="bad"
            atSec={segStart(SEG_CASE, 1)}
          />
          <CaseRow
            time="9:15"
            text="電話と紙の伝票で受注"
            tag="応急の対応 — 業務を止めない"
            tone="mid"
            atSec={segStart(SEG_CASE, 2)}
          />
          <CaseRow
            time="14:00"
            text="原因を調べてから復旧"
            tag="復旧 — 元の状態に戻す"
            tone="strong"
            atSec={segStart(SEG_CASE, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 被害状況の調査 — 縦3ステップ + 注意帯
// ---------------------------------------------------------------------------

const StepRow: React.FC<{ no: string; text: string; note: string; atSec: number }> = ({
  no,
  text,
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
        padding: `${4 * SCALE}px ${13 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 13 * SCALE,
        ...row,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 22 * SCALE,
          height: 22 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {no}
      </span>
      <b style={{ flex: "none", fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{text}</b>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 10 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.3,
          textAlign: "right",
        }}
      >
        {note}
      </span>
    </div>
  );
};

const InvestigateScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const warnAppear = useAppear(segStart(SEG_INVESTIGATE, 4), { dy: 10 });
  return (
    <SlideShell
      heading="戻す前に、被害を調べる"
      icon={<Ms name="search" size={videoType.slideHeadIcon} />}
      narration={SEG_INVESTIGATE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        <span style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.3, ...leadAppear }}>
          <span style={markerStyle}>何がどこまでやられたか</span>を把握してから戻す
        </span>
        <StepRow
          no="1"
          text="ログをそのまま残す"
          note="記録が上書きされないように"
          atSec={segStart(SEG_INVESTIGATE, 2)}
        />
        <StepRow
          no="2"
          text="影響が及んだ範囲を特定する"
          note="どこまでやられたのか"
          atSec={segStart(SEG_INVESTIGATE, 3)}
        />
        <StepRow
          no="3"
          text="原因を突き止める"
          note="同じことを繰り返さないために"
          atSec={segStart(SEG_INVESTIGATE, 3) + 2.2}
        />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            padding: `${7 * SCALE}px ${14 * SCALE}px`,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
            color: colors.accentPinkText,
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...warnAppear,
          }}
        >
          <Ms name="warning" size={17 * SCALE} />
          先に戻すと、原因が分からず被害を広げる
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: バックアップによる対策 — 左イラスト + キーワード見出し（P4 の鏡像）
// ---------------------------------------------------------------------------

const BackupScene: React.FC = () => {
  const illustAppear = useAppear(0.3);
  return (
    <SlideShell narration={SEG_BACKUP}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/icon-backup.png")}
          style={{
            flex: 0.8,
            minWidth: 0,
            maxHeight: "100%",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <KeywordLead
          chip="戻すための備え"
          chipAtSec={0.3}
          term="バックアップ"
          termSize={30 * SCALE}
          desc={
            <>
              大事な情報の写しを<span style={markerStyle}>別の場所にも置く</span>
            </>
          }
          termAtSec={segStart(SEG_BACKUP, 1)}
          descAtSec={segStart(SEG_BACKUP, 2)}
          note="方式の種類は、のちの回でくわしく"
          noteAtSec={segStart(SEG_BACKUP, 3)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 取ってあるだけでは対策にならない — ✗／○ の2枚カード
// ---------------------------------------------------------------------------

const JudgeRow: React.FC<{ text: string; tone: "bad" | "good"; atSec: number }> = ({
  text,
  tone,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 8 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        fontSize: 11.5 * SCALE,
        fontWeight: 700,
        lineHeight: 1.35,
        color: tone === "bad" ? colors.accentPinkText : colors.primary800,
        ...row,
      }}
    >
      <span style={{ flex: "none", display: "flex" }}>
        <Ms name={tone === "bad" ? "cancel" : "check_circle"} size={16 * SCALE} />
      </span>
      {text}
    </span>
  );
};

const JudgeCard: React.FC<{
  mark: string;
  title: React.ReactNode;
  tone: "bad" | "good";
  rows: { text: string; atSec: number }[];
  atSec: number;
}> = ({ mark, title, tone, rows, atSec }) => {
  const card = usePop(atSec);
  const bad = tone === "bad";
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 8 * SCALE,
        padding: `${13 * SCALE}px ${15 * SCALE}px ${15 * SCALE}px`,
        backgroundColor: bad ? colors.accentPinkSurface : colors.primary50,
        border: `${1.5 * SCALE}px solid ${bad ? colors.accentPinkSoft : colors.primary300}`,
        borderRadius: 15 * SCALE,
        ...card,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
        <span
          style={{
            flex: "none",
            width: 26 * SCALE,
            height: 26 * SCALE,
            borderRadius: 999,
            backgroundColor: bad ? colors.accentPink : colors.primary600,
            color: colors.textPrimaryDark,
            fontSize: 14 * SCALE,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mark}
        </span>
        <b style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{title}</b>
      </span>
      {rows.map((row) => (
        <JudgeRow key={row.text} text={row.text} tone={tone} atSec={row.atSec} />
      ))}
    </div>
  );
};

const RestoreCheckScene: React.FC = () => (
  <SlideShell
    heading="取ってあるだけでは対策にならない"
    icon={<Ms name="fact_check" size={videoType.slideHeadIcon} />}
    narration={SEG_RESTORE}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        gap: 14 * SCALE,
      }}
    >
      <JudgeCard
        mark="✕"
        title="取っただけ"
        tone="bad"
        atSec={0.3}
        rows={[
          { text: "戻そうとしたら壊れていた", atSec: segStart(SEG_RESTORE, 1) },
          { text: "同じ部屋で一緒に失われる", atSec: segStart(SEG_RESTORE, 3) },
        ]}
      />
      <JudgeCard
        mark="○"
        title="戻せる状態"
        tone="good"
        atSec={segStart(SEG_RESTORE, 2)}
        rows={[
          { text: "ときどき戻して確かめる", atSec: segStart(SEG_RESTORE, 2) + 0.5 },
          { text: "離れた場所に分けて保管", atSec: segStart(SEG_RESTORE, 4) },
        ]}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// クイズ幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL26SecurityContinuity: VideoSpec = {
  id: "sg-L26-security-continuity",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "情報セキュリティ\n継続",
      keywords: ["緊急時対応", "復旧計画", "バックアップ"],
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
      name: "emergency-types",
      durationSec: 6,
      narration: SEG_TYPES,
      component: EmergencyTypesScene,
    },
    {
      pattern: "custom",
      name: "contingency-plan",
      durationSec: 5,
      narration: SEG_PLAN,
      component: ContingencyScene,
    },
    {
      pattern: "custom",
      name: "two-phases",
      durationSec: 6,
      narration: SEG_PHASE,
      component: PhaseScene,
    },
    {
      pattern: "custom",
      name: "case-morning",
      durationSec: 5,
      narration: SEG_CASE,
      component: CaseScene,
    },
    {
      pattern: "vs",
      heading: "復旧計画は2通りで備える",
      icon: "cached",
      left: {
        title: "災害復旧",
        icon: "bolt",
        rows: [
          { k: "原因", v: "地震・火災など" },
          { k: "範囲", v: "拠点ごと使えない" },
          { k: "備え", v: "離れた場所で立て直す" },
        ],
      },
      right: {
        title: "障害復旧",
        icon: "build",
        rows: [
          { k: "原因", v: "機器の故障・不具合" },
          { k: "範囲", v: "機器やデータの一部" },
          { k: "備え", v: "交換や復元で短時間に" },
        ],
      },
      columnAtSec: [segStart(SEG_RECOVERY, 1), segStart(SEG_RECOVERY, 3)],
      narration: SEG_RECOVERY,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "investigate",
      durationSec: 6,
      narration: SEG_INVESTIGATE,
      component: InvestigateScene,
    },
    {
      pattern: "custom",
      name: "backup",
      durationSec: 5,
      narration: SEG_BACKUP,
      component: BackupScene,
    },
    {
      pattern: "custom",
      name: "restore-check",
      durationSec: 6,
      narration: SEG_RESTORE,
      component: RestoreCheckScene,
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
      question: "緊急時対応計画は何を決める計画？",
      choices: [
        { key: "A", text: "事故の直後の動き方", correct: true },
        { key: "B", text: "元の状態に戻す手順" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "紙の伝票で受注を続けるのは？",
      choices: [
        { key: "A", text: "元に戻すための復旧" },
        { key: "B", text: "業務を続ける応急の対応", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "バックアップで確かめておくことは？",
      choices: [
        { key: "A", text: "実際に元へ戻せるか", correct: true },
        { key: "B", text: "空き容量が足りているか" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "緊急事態は災害・障害・攻撃に区分して備えます。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "応急の対応と、元に戻す復旧は分けて計画します。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "バックアップは戻せることを確かめて対策になります。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
