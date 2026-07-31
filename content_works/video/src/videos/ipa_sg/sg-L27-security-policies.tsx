import { Img, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L27-security-policies.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L27: 情報セキュリティ諸規程
 *
 * 発注書 content_works/ipa_sg/orders/L27.md の範囲。
 * シナリオは narration/ipa_sg/sg-L27-security-policies.md。
 *
 * 「ルールは三階層で書く — 上ほど抽象的で変わらず、下ほど具体的で頻繁に変わる」を背骨に:
 *   導入（一枚では書けない）→ ★三階層のピラミッド帯 → 方針（キーワード見出し＋イラスト）→
 *   対策基準＝規程の束（2×2カード）→ wipe-light で具体場面（入れ替えたらどこを直す）→
 *   プライバシーポリシーとの対比（vs）→ ソーシャルメディアガイドライン（P4の鏡像）→
 *   クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 呼称は L22（sg-L22-security-management）に揃え、三階層の全体は
 * 「情報セキュリティポリシーの体系」と呼ぶ（狭義／広義の揺れを避けるため。narration の md に理由あり）。
 * ISMS（PDCA・管理策・認証制度）には踏み込まない（L28・L29 が主担当）。
 *
 * 音声と字幕を分けた箇所: s08-1 の「SNS」は TTS が英字読みしないよう音声用テキストだけ
 * 「エスエヌエス」と仮名書きにしている（jobs.json 側）。字幕は「SNS」のまま＝意図的な食い違い。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L27-security-policies");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、情報セキュリティ諸規程について学びます。"),
  N("s02-2.mp3", "情報を守るルールは、一枚の文書では書き切れません。"),
  N("s02-3.mp3", "情報を守りますという宣言だけでは、現場は何をすればよいか分かりません。"),
  N("s02-4.mp3", "反対に、細かい手順書だけでは、なぜそうするのかが伝わりません。"),
];

const SEG_TIERS = [
  N("s03-1.mp3", "そこで、ルールは三つの階層に分けて作ります。"),
  N("s03-2.mp3", "一番上が情報セキュリティ方針で、何のために守るのかを示します。"),
  N("s03-3.mp3", "真ん中が対策基準で、守るべきことを分野ごとに定めます。"),
  N("s03-4.mp3", "一番下が実施手順で、実際の作業のやり方を書きます。"),
  N("s03-5.mp3", "この三階層の全体を、情報セキュリティポリシーの体系と呼びます。"),
];

const SEG_POLICY = [
  N("s04-1.mp3", "一番上の情報セキュリティ方針を、もう少し詳しく見ます。"),
  N("s04-2.mp3", "これは、経営層が組織の内外に向けて宣言する最上位の文書です。"),
  N("s04-3.mp3", "何のために情報を守るのか、その目的をここで示します。"),
  N("s04-4.mp3", "経営者の意思として出すからこそ、組織全体が従う根拠になります。"),
];

const SEG_RULES = [
  N("s05-1.mp3", "真ん中の対策基準は、実際には規程の束になっています。"),
  N("s05-2.mp3", "たとえば、情報の扱い方を定めた情報管理規程です。"),
  N("s05-3.mp3", "事故が起きたときの動き方を定めた、インシデント対応規程もあります。"),
  N("s05-4.mp3", "例外を認めるときの決まりや、規程を承認する手続きも定めます。"),
  N("s05-5.mp3", "組織の事情に合わせて、こうした規程がいくつも並びます。"),
];

const SEG_CHANGE = [
  N("s06-1.mp3", "では、対策を入れ替えるとき、どの階層を直すのでしょうか。"),
  N("s06-2.mp3", "ウイルス対策ソフトを、別の製品に切り替えた場面で考えます。"),
  N("s06-3.mp3", "情報を守るという方針は、変える必要がありません。"),
  N("s06-4.mp3", "不正なプログラムを検知するという対策基準も、そのままです。"),
  N("s06-5.mp3", "直すのは、設定のやり方を書いた実施手順だけです。"),
  N("s06-6.mp3", "上は変えず、下は現場で変えられる。これが三階層の利点です。"),
];

const SEG_VS = [
  N("s07-1.mp3", "ここで、よく似たもう一つの文書と比べておきましょう。"),
  N("s07-2.mp3", "情報セキュリティ方針は、守るべきルールを組織の中に示す文書です。"),
  N("s07-3.mp3", "これに対して、プライバシーポリシーという文書があります。"),
  N("s07-4.mp3", "個人情報保護方針とも呼ばれ、個人情報の扱いを定めます。"),
  N("s07-5.mp3", "こちらは、お客様や取引先といった外部への約束が中心です。"),
  N("s07-6.mp3", "違いは、誰に向けた宣言かという点にあります。"),
];

const SEG_SNS = [
  // 音声（jobs.json）は「エスエヌエス」と仮名書き。字幕はここの「SNS」が出る
  N("s08-1.mp3", "規程の中には、SNSの使い方を定めたものもあります。"),
  N("s08-2.mp3", "これを、ソーシャルメディアガイドラインと呼びます。"),
  N("s08-3.mp3", "業務での投稿の範囲や、個人の投稿で気をつけることを示します。"),
  N("s08-4.mp3", "何気ない投稿から、社内の情報や人間関係が読み取られてしまうからです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s10-1.mp3", "ここで問題です。"),
  N("s10-2.mp3", "三階層の一番上に来るのは、どちらでしょうか。"),
  N("s10-3.mp3", "正解は、情報セキュリティ方針です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s11-1.mp3", "次の問題です。"),
  N("s11-2.mp3", "現場の都合で見直す機会が多いのは、どちらでしょうか。"),
  N("s11-3.mp3", "正解は、実施手順です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s12-1.mp3", "最後の問題です。"),
  N("s12-2.mp3", "個人情報の扱いを外部に約束する文書は、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、プライバシーポリシーです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s13-1.mp3", "ルールは、方針、対策基準、実施手順の三階層で作ります。"),
  N("s13-2.mp3", "一番上の方針は経営層が宣言し、下の手順ほど現場で見直していきます。"),
  N("s13-3.mp3", "プライバシーポリシーは、個人情報の扱いを外部に約束する文書です。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** アイコン + 一行の注記（枠は付けず、余白と色で見せる） */
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
        fontSize: 10 * SCALE,
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

/** 新出用語をページの主役にする（分類チップ → 用語 → 定義。箱で囲わない） */
const KeywordLead: React.FC<{
  chip: string;
  chipAtSec: number;
  term: string;
  termSize: number;
  termAtSec: number;
  desc: React.ReactNode;
  descAtSec: number;
}> = ({ chip, chipAtSec, term, termSize, termAtSec, desc, descAtSec }) => {
  const chipAppear = useAppear(chipAtSec, { dy: 10 });
  const termAppear = usePop(termAtSec);
  const descAppear = useAppear(descAtSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 5 * SCALE,
      }}
    >
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
          backgroundColor: colors.primary100,
          borderRadius: 999,
          padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
          whiteSpace: "nowrap",
          ...chipAppear,
        }}
      >
        {chip}
      </span>
      <b
        style={{
          fontSize: termSize,
          fontWeight: 800,
          lineHeight: 1.25,
          whiteSpace: "pre-line",
          ...termAppear,
        }}
      >
        <span style={markerStyle}>{term}</span>
      </b>
      {/* pre-line: 定義文の折返し位置を原稿側で決める（自動折返しだと語の途中で割れる） */}
      <span
        style={{
          fontSize: 12 * SCALE,
          fontWeight: 700,
          lineHeight: 1.5,
          whiteSpace: "pre-line",
          ...descAppear,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// P2: 導入 — 一枚の文書では書き切れない（左イラスト + 右テキスト）
// ---------------------------------------------------------------------------

const ProblemRow: React.FC<{ icon: string; label: string; sub: string; atSec: number }> = ({
  icon,
  label,
  sub,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE, ...row }}>
      <span
        style={{
          width: 28 * SCALE,
          height: 28 * SCALE,
          flex: "none",
          borderRadius: 10 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 1.5 * SCALE, minWidth: 0 }}>
        <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{label}</b>
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {sub}
        </span>
      </span>
    </div>
  );
};

const IntroScene: React.FC = () => {
  const lead = useAppear(0.3);
  const illust = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-employee-f-worry.png")}
          style={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
        <div
          style={{
            flex: 1.15,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10 * SCALE,
          }}
        >
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.45,
              whiteSpace: "pre-line",
              ...lead,
            }}
          >
            {"情報を守るルールは\n"}
            <span style={markerStyle}>一枚では書けない</span>
          </span>
          <ProblemRow
            icon="campaign"
            label="宣言だけ"
            sub="現場は何をすればよいか分からない"
            atSec={segStart(SEG_INTRO, 2)}
          />
          <ProblemRow
            icon="description"
            label="手順書だけ"
            sub="なぜそうするのかが伝わらない"
            atSec={segStart(SEG_INTRO, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: ★核心 — 三階層のピラミッド帯（上が抽象・下が具体）
// ---------------------------------------------------------------------------

const TierBand: React.FC<{
  widthPct: number;
  name: string;
  desc: string;
  tone: "top" | "mid" | "bottom";
  atSec: number;
}> = ({ widthPct, name, desc, tone, atSec }) => {
  const band = usePop(atSec);
  const bg =
    tone === "top" ? colors.primary600 : tone === "mid" ? colors.primary300 : colors.primary100;
  const fg = tone === "top" ? colors.textPrimaryDark : colors.primary800;
  const subFg = tone === "top" ? colors.primary100 : colors.primary800;
  return (
    <div
      style={{
        width: `${widthPct}%`,
        flex: "none",
        padding: `${9 * SCALE}px ${14 * SCALE}px`,
        borderRadius: 11 * SCALE,
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 11 * SCALE,
        ...band,
      }}
    >
      <b style={{ fontSize: 13 * SCALE, fontWeight: 800, color: fg, whiteSpace: "nowrap" }}>
        {name}
      </b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: subFg,
          whiteSpace: "nowrap",
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const TiersScene: React.FC = () => {
  const axis = useAppear(0.3);
  const system = useAppear(segStart(SEG_TIERS, 4), { dy: 12 });
  return (
    <SlideShell
      heading="ルールは3つの階層で作る"
      icon={<Ms name="stacks" size={videoType.slideHeadIcon} />}
      narration={SEG_TIERS}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 9 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "stretch", gap: 10 * SCALE }}>
          {/* 抽象→具体の軸。それ自体に意味があるので先に出す（1文目の間を埋める） */}
          <div
            style={{
              width: 26 * SCALE,
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
              ...axis,
            }}
          >
            <span style={{ fontSize: 9.5 * SCALE, fontWeight: 800, color: colors.textMuted }}>
              抽象
            </span>
            <div
              style={{
                flex: 1,
                width: 3 * SCALE,
                borderRadius: 999,
                backgroundColor: colors.primary100,
              }}
            />
            <span style={{ fontSize: 9.5 * SCALE, fontWeight: 800, color: colors.textMuted }}>
              具体
            </span>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8 * SCALE,
            }}
          >
            <TierBand
              widthPct={66}
              name="情報セキュリティ方針"
              desc="何のために守るのか"
              tone="top"
              atSec={segStart(SEG_TIERS, 1)}
            />
            <TierBand
              widthPct={81}
              name="対策基準"
              desc="守るべきことを分野ごとに"
              tone="mid"
              atSec={segStart(SEG_TIERS, 2)}
            />
            <TierBand
              widthPct={96}
              name="実施手順"
              desc="実際の作業のやり方"
              tone="bottom"
              atSec={segStart(SEG_TIERS, 3)}
            />
          </div>
        </div>
        <span
          style={{
            alignSelf: "center",
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...system,
          }}
        >
          この3階層の全体＝<span style={markerStyle}>情報セキュリティポリシーの体系</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 情報セキュリティ方針 — 左キーワード見出し + 右イラスト
// ---------------------------------------------------------------------------

const PolicyScene: React.FC = () => {
  const illust = useAppear(0.5);
  return (
    <SlideShell narration={SEG_POLICY}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.25,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 9 * SCALE,
          }}
        >
          <KeywordLead
            chip="3階層の最上位"
            chipAtSec={0.3}
            term="情報セキュリティ方針"
            termSize={20 * SCALE}
            termAtSec={0.5}
            desc={
              <>
                {"経営層が組織の内外に向けて宣言する\n"}
                <span style={markerStyle}>最上位の文書</span>
              </>
            }
            descAtSec={segStart(SEG_POLICY, 1)}
          />
          <NoteChip
            icon="flag"
            text="何のために守るのかを示す"
            atSec={segStart(SEG_POLICY, 2)}
          />
          <NoteChip
            icon="verified"
            text="経営者の意思だから全員が従う"
            atSec={segStart(SEG_POLICY, 3)}
          />
        </div>
        <Img
          src={staticFile("images/ipa_sg/mgmt-committee.png")}
          style={{
            flex: 0.95,
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
// P5: 対策基準＝規程の束（2×2 の規程カード）
// ---------------------------------------------------------------------------

const RuleCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  atSec: number;
}> = ({ icon, title, desc, atSec }) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        padding: `${10 * SCALE}px ${13 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 13 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          width: 30 * SCALE,
          height: 30 * SCALE,
          flex: "none",
          borderRadius: 11 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 * SCALE, minWidth: 0 }}>
        <b style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{title}</b>
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {desc}
        </span>
      </span>
    </div>
  );
};

const RulesScene: React.FC = () => {
  const foot = useAppear(segStart(SEG_RULES, 4), { dy: 12 });
  return (
    <SlideShell
      heading="対策基準の中身は規程の束"
      icon={<Ms name="description" size={videoType.slideHeadIcon} />}
      narration={SEG_RULES}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 9 * SCALE,
        }}
      >
        <div style={{ display: "flex", gap: 9 * SCALE }}>
          <RuleCard
            icon="archive"
            title="情報管理規程"
            desc="情報の扱い方を定める"
            atSec={segStart(SEG_RULES, 1)}
          />
          <RuleCard
            icon="report"
            title="インシデント対応規程"
            desc="事故が起きたときの動き方"
            atSec={segStart(SEG_RULES, 2)}
          />
        </div>
        <div style={{ display: "flex", gap: 9 * SCALE }}>
          <RuleCard
            icon="alt_route"
            title="例外の取扱い"
            desc="例外を認めるときの決まり"
            atSec={segStart(SEG_RULES, 3)}
          />
          <RuleCard
            icon="task_alt"
            title="規程の承認手続"
            desc="誰がどう承認するか"
            atSec={segStart(SEG_RULES, 3) + 0.7}
          />
        </div>
        <span
          style={{
            alignSelf: "center",
            fontSize: 11 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
            ...foot,
          }}
        >
          規程の数と種類は組織ごとに違う
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 具体場面 — 入れ替えたらどこを直す（左イラスト + 右に三階層の判定行）
// ---------------------------------------------------------------------------

const VerdictRow: React.FC<{
  name: string;
  verdict: string;
  changed: boolean;
  atSec: number;
}> = ({ name, verdict, changed, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        padding: `${7 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: changed ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${changed ? colors.primary500 : colors.border}`,
        ...row,
      }}
    >
      <b
        style={{
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          color: changed ? colors.primary800 : colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </b>
      <span
        style={{
          marginLeft: "auto",
          flex: "none",
          display: "flex",
          alignItems: "center",
          gap: 5 * SCALE,
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          borderRadius: 999,
          padding: `${3 * SCALE}px ${10 * SCALE}px`,
          whiteSpace: "nowrap",
          backgroundColor: changed ? colors.primary600 : colors.bg,
          color: changed ? colors.textPrimaryDark : colors.textMuted,
        }}
      >
        <Ms name={changed ? "build" : "lock"} size={13 * SCALE} />
        {verdict}
      </span>
    </div>
  );
};

const ChangeScene: React.FC = () => {
  const illust = useAppear(0.4);
  const scene = useAppear(segStart(SEG_CHANGE, 1), { dy: 10 });
  const foot = useAppear(segStart(SEG_CHANGE, 5), { dy: 12 });
  return (
    <SlideShell
      heading="入れ替えたら、どこを直す？"
      icon={<Ms name="swap_horiz" size={videoType.slideHeadIcon} />}
      narration={SEG_CHANGE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          alignItems: "center",
          gap: "4%",
        }}
      >
        {/* ウイルス対策ソフト＝盾。tech-patch（絆創膏）は修正プログラムに読めるので使わない */}
        <Img
          src={staticFile("images/ipa_sg/icon-shield.png")}
          style={{
            flex: 0.8,
            minWidth: 0,
            height: 74 * SCALE,
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
        <div
          style={{
            flex: 1.55,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
          }}
        >
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              ...scene,
            }}
          >
            ウイルス対策ソフトを別の製品に切り替えた
          </span>
          <VerdictRow
            name="情報セキュリティ方針"
            verdict="変えない"
            changed={false}
            atSec={segStart(SEG_CHANGE, 2)}
          />
          <VerdictRow
            name="対策基準"
            verdict="変えない"
            changed={false}
            atSec={segStart(SEG_CHANGE, 3)}
          />
          <VerdictRow
            name="実施手順"
            verdict="ここを直す"
            changed
            atSec={segStart(SEG_CHANGE, 4)}
          />
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              ...foot,
            }}
          >
            上は変えず、<span style={markerStyle}>下は現場で変えられる</span>
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: ソーシャルメディアガイドライン — 左イラスト + 右キーワード見出し（P4の鏡像）
// ---------------------------------------------------------------------------

/** 投稿から読み取られてしまうもの（危険の注目なのでピンク） */
const LeakChip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const chip = usePop(atSec);
  return (
    <span
      style={{
        fontSize: 11 * SCALE,
        fontWeight: 800,
        color: colors.accentPinkText,
        backgroundColor: colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
        borderRadius: 999,
        padding: `${4 * SCALE}px ${13 * SCALE}px`,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      {text}
    </span>
  );
};

const SnsScene: React.FC = () => {
  const illust = useAppear(0.4);
  const riskLabel = useAppear(segStart(SEG_SNS, 3), { dy: 12 });
  return (
    <SlideShell narration={SEG_SNS}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <Img
          src={staticFile("images/ipa_sg/icon-smartphone.png")}
          style={{
            flex: 0.6,
            minWidth: 0,
            height: 84 * SCALE,
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
        <div
          style={{
            flex: 1.4,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10 * SCALE,
          }}
        >
          <KeywordLead
            chip="SNS利用のルール"
            chipAtSec={0.3}
            term={"ソーシャルメディア\nガイドライン"}
            termSize={19 * SCALE}
            termAtSec={segStart(SEG_SNS, 1)}
            desc={"業務での投稿の範囲と、\n個人の投稿で気をつけること"}
            descAtSec={segStart(SEG_SNS, 2)}
          />
          {/* ラベルとチップを同じ行に並べると幅が足りず折返して崩れるので、行を分ける */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 * SCALE }}>
            <span
              style={{
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
                ...riskLabel,
              }}
            >
              何気ない投稿から読み取られる
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
              <LeakChip text="社内の情報" atSec={segStart(SEG_SNS, 3) + 0.4} />
              <LeakChip text="人間関係" atSec={segStart(SEG_SNS, 3) + 0.8} />
            </div>
          </div>
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

export const SgL27SecurityPolicies: VideoSpec = {
  id: "sg-L27-security-policies",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "情報セキュリティ\n諸規程",
      keywords: ["3階層", "方針", "規程"],
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
      name: "three-tiers",
      durationSec: 6,
      narration: SEG_TIERS,
      component: TiersScene,
    },
    {
      pattern: "custom",
      name: "policy",
      durationSec: 5,
      narration: SEG_POLICY,
      component: PolicyScene,
    },
    {
      pattern: "custom",
      name: "rules-bundle",
      durationSec: 6,
      narration: SEG_RULES,
      component: RulesScene,
    },
    {
      pattern: "custom",
      name: "which-tier-changes",
      durationSec: 6,
      narration: SEG_CHANGE,
      transitionIn: "wipe-light",
      component: ChangeScene,
    },
    {
      pattern: "vs",
      heading: "誰に向けた宣言か",
      icon: "compare_arrows",
      left: {
        title: "情報セキュリティ方針",
        icon: "policy",
        rows: [
          { k: "宣言の相手", v: "組織の内部へ" },
          { k: "定めるもの", v: "守るべきルール全般" },
          { k: "位置づけ", v: "3階層の最上位" },
        ],
      },
      right: {
        title: "プライバシーポリシー",
        icon: "handshake",
        rows: [
          { k: "宣言の相手", v: "顧客・取引先など外部へ" },
          { k: "定めるもの", v: "個人情報の扱い" },
          { k: "位置づけ", v: "個人情報保護方針とも呼ぶ" },
        ],
      },
      columnAtSec: [segStart(SEG_VS, 1), segStart(SEG_VS, 2)],
      narration: SEG_VS,
    },
    {
      pattern: "custom",
      name: "social-media-guideline",
      durationSec: 5,
      narration: SEG_SNS,
      component: SnsScene,
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
      question: "3階層の一番上に来るのは？",
      choices: [
        { key: "A", text: "実施手順" },
        { key: "B", text: "情報セキュリティ方針", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "現場の都合で見直す機会が多いのは？",
      choices: [
        { key: "A", text: "実施手順", correct: true },
        { key: "B", text: "対策基準" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "個人情報の扱いを外部に約束するのは？",
      choices: [
        { key: "A", text: "情報セキュリティ方針" },
        { key: "B", text: "プライバシーポリシー", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行に収める（29文字が上限）
          text: "ルールは方針、対策基準、実施手順の3階層で作ります。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "方針は経営層が宣言し、下の手順ほど現場で見直します。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "プライバシーポリシーは個人情報の扱いを外部に約束。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
