import { Img, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L22-security-management.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L22: 情報セキュリティ管理の全体像
 *
 * content_works/ipa_sg/LESSON_PLAN.md の L22（第3章 情報セキュリティ管理）に対応。
 * シナリオは narration/ipa_sg/sg-L22-security-management.md。
 *
 * 「四つの柱」を背骨にした章の入口:
 *   導入（製品だけでは守れない）→ 四つの柱（アイコン4連）→ ポリシー（左テキスト＋右イラスト）→
 *   リスクマネジメントの流れ（flow・JIS Q 31000）→ wipe-light で最小権限（絞り込みバー）→
 *   委託・クラウド（左イラスト＋右カード）→ サイバーハイジーン（用語＋アイコン3連）→
 *   クイズ幕間 → クイズ3問 → wipe でまとめ。
 * 詳細は主担当レッスンに委ねる（アセスメントはL24・リスク対応はL25・諸規程はL27・
 * 責任共有モデルはL55・アクセス制御はL36）。ここでは地図として一言ずつ触れる。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L22-security-management");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、情報セキュリティ管理の全体像をつかみます。"),
  N("s02-2.mp3", "対策の製品を導入すれば安心、とはいきません。"),
  N("s02-3.mp3", "何を守り、誰が何をするのかを組織で決め、続けて見直す必要があります。"),
  N("s02-4.mp3", "その仕組み全体が、情報セキュリティ管理です。"),
];

const SEG_PILLARS = [
  N("s03-1.mp3", "全体像は、四つの柱で捉えると分かりやすくなります。"),
  N("s03-2.mp3", "一つ目は、組織のルールを定める情報セキュリティポリシーです。"),
  N("s03-3.mp3", "二つ目は、危険を洗い出して手を打つリスクマネジメントです。"),
  N("s03-4.mp3", "三つ目は、アカウントとアクセス権を絞る日々の運用です。"),
  N("s03-5.mp3", "四つ目は、委託先やクラウドまで含めた管理です。"),
];

const SEG_POLICY = [
  N("s04-1.mp3", "管理の出発点になるのが、情報セキュリティポリシーです。"),
  N("s04-2.mp3", "経営層が方針を示し、組織として守るべきルールを文書に定めます。"),
  N("s04-3.mp3", "担当者それぞれの判断ではなく、決めたルールに全員が従うのが原則です。"),
  N("s04-4.mp3", "ルールは作って終わりではなく、定期的に見直していきます。"),
];

const SEG_RISK = [
  N("s05-1.mp3", "次に、リスクマネジメントの流れを押さえましょう。"),
  // 音声側だけ「さんまんいっせん」と仮名書き（"31000" は「さんまんいちまん」と誤読される）。字幕は数字表記のまま
  N("s05-2.mp3", "進め方は、JIS Q 31000という規格が指針になっています。"),
  N("s05-3.mp3", "まずリスクを特定し、分析して、受け入れられるかどうかを評価します。"),
  N("s05-4.mp3", "そのうえで、リスクへの対応を決めて実行します。"),
  N("s05-5.mp3", "一度で終わらせず、この流れを繰り返し回すことが大切です。"),
];

const SEG_LEAST = [
  N("s06-1.mp3", "日々の運用で要になるのが、アクセス権の管理です。"),
  N("s06-2.mp3", "業務に必要な人に、必要な範囲だけ与えるのが最小権限の原則です。"),
  N("s06-3.mp3", "知る必要がある人にだけ知らせる、ニードトゥノウとも呼ばれます。"),
  N("s06-4.mp3", "入社や異動、退職に合わせて、権限は必ず見直します。"),
  N("s06-5.mp3", "使われていないアカウントは、放置せずに削除します。"),
];

const SEG_OUTSOURCE = [
  N("s07-1.mp3", "守るべき範囲は、自社の中だけではありません。"),
  N("s07-2.mp3", "業務を外部に委託しても、情報を守る責任がなくなるわけではありません。"),
  N("s07-3.mp3", "委託先の管理体制を確認し、守るべき事項を契約で定めます。"),
  N("s07-4.mp3", "クラウドでは、事業者と利用者が責任の範囲を分け合います。"),
  N("s07-5.mp3", "これを、責任共有モデルと呼びます。"),
];

const SEG_HYGIENE = [
  N("s08-1.mp3", "最後に紹介するのは、サイバーハイジーンという考え方です。"),
  N("s08-2.mp3", "手洗いのように、基本の対策を日々続けて衛生状態を保つことです。"),
  N("s08-3.mp3", "修正プログラムの適用、不要なソフトの削除、資産の棚卸しが代表例です。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s10-1.mp3", "ここで問題です。"),
  N("s10-2.mp3", "必要な人に必要な範囲だけ権限を与える原則を、何と呼ぶでしょうか。"),
  N("s10-3.mp3", "正解は、最小権限の原則です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s11-1.mp3", "次の問題です。"),
  N("s11-2.mp3", "業務を外部に委託したとき、情報を守る責任はどうなるでしょうか。"),
  N("s11-3.mp3", "正解は、委託した側にも責任が残る、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s12-1.mp3", "最後の問題です。"),
  N("s12-2.mp3", "基本の対策を日々続けて安全な状態を保つ考え方は、何でしょうか。"),
  N("s12-3.mp3", "正解は、サイバーハイジーンです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s13-1.mp3", "情報セキュリティ管理は、ポリシーでルールを決めることから始まります。"),
  N("s13-2.mp3", "リスクは特定、分析、評価、対応の流れで繰り返し見直します。"),
  N("s13-3.mp3", "権限は最小限にし、委託先やクラウドまで管理の範囲に含めます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// P2: 導入 — 左イラスト + 右テキスト
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const noteAppear = useAppear(segStart(SEG_INTRO, 2));
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/tech-firewall.png")}
          style={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div style={{ flex: 1.1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 * SCALE }}>
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.5,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"製品を入れるだけでは\n"}
            <span style={markerStyle}>守れない</span>
          </span>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.5,
              ...noteAppear,
            }}
          >
            決めて、回して、見直す仕組みが要る
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 管理の四つの柱 — 番号つきカード4連（各文の読み上げ開始に同期）
// ---------------------------------------------------------------------------

const PillarCard: React.FC<{
  no: string;
  icon: string;
  label: string;
  desc: string;
  atSec: number;
}> = ({ no, icon, label, desc, atSec }) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        width: 96 * SCALE,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${9 * SCALE}px ${6 * SCALE}px ${11 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
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
          flex: "none",
        }}
      >
        {no}
      </span>
      <span
        style={{
          width: 38 * SCALE,
          height: 38 * SCALE,
          borderRadius: 13 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={22 * SCALE} />
      </span>
      <b style={{ fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
      <span
        style={{
          fontSize: 9 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          textAlign: "center",
          lineHeight: 1.35,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const PillarsScene: React.FC = () => (
  <SlideShell
    heading="管理の全体像は4つの柱"
    icon={<Ms name="account_tree" size={videoType.slideHeadIcon} />}
    narration={SEG_PILLARS}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9 * SCALE,
      }}
    >
      <PillarCard
        no="1"
        icon="policy"
        label="ポリシー"
        desc="ルールを定める"
        atSec={segStart(SEG_PILLARS, 1)}
      />
      <PillarCard
        no="2"
        icon="gpp_maybe"
        label="リスク管理"
        desc="危険に手を打つ"
        atSec={segStart(SEG_PILLARS, 2)}
      />
      <PillarCard
        no="3"
        icon="manage_accounts"
        label="権限の運用"
        desc="権限を絞る"
        atSec={segStart(SEG_PILLARS, 3)}
      />
      <PillarCard
        no="4"
        icon="cloud"
        label="委託・クラウド"
        desc="社外も範囲"
        atSec={segStart(SEG_PILLARS, 4)}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P4: ポリシーに基づく管理 — 左テキスト + 右イラスト（P2の鏡像）
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

const PolicyScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_POLICY}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span
            style={{
              fontSize: 17 * SCALE,
              fontWeight: 800,
              lineHeight: 1.5,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"経営層が方針を示し\n"}
            <span style={markerStyle}>全員が同じルール</span>に従う
          </span>
          <NoteChip
            icon="description"
            text="判断ではなく文書のルールで動く"
            atSec={segStart(SEG_POLICY, 2)}
          />
          <NoteChip icon="autorenew" text="作って終わりにせず見直す" atSec={segStart(SEG_POLICY, 3)} />
        </div>
        <Img
          src={staticFile("images/ipa_sg/mgmt-committee.png")}
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
// P6: 最小権限 — 権限が絞り込まれていくバー（wipe-light で章転換）
// ---------------------------------------------------------------------------

const ScopeBar: React.FC<{
  widthPct: number;
  label: string;
  tone: "wide" | "mid" | "narrow";
  atSec: number;
}> = ({ widthPct, label, tone, atSec }) => {
  const bar = useAppear(atSec, { dy: 0 });
  const bg =
    tone === "narrow" ? colors.primary600 : tone === "mid" ? colors.primary300 : colors.primary100;
  const fg = tone === "narrow" ? colors.textPrimaryDark : colors.primary800;
  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 * SCALE, ...bar }}>
      <div
        style={{
          width: `${widthPct}%`,
          flex: "none",
          height: 24 * SCALE,
          borderRadius: 9 * SCALE,
          backgroundColor: bg,
          color: fg,
          display: "flex",
          alignItems: "center",
          paddingLeft: 14 * SCALE,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};

const LeastPrivilegeScene: React.FC = () => {
  const needToKnow = useAppear(segStart(SEG_LEAST, 2), { dy: 10 });
  return (
    <SlideShell
      heading="必要な分だけ与える"
      icon={<Ms name="manage_accounts" size={videoType.slideHeadIcon} />}
      narration={SEG_LEAST}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6 * SCALE,
        }}
      >
        <ScopeBar widthPct={100} label="社内のすべての情報" tone="wide" atSec={0.3} />
        <ScopeBar widthPct={66} label="所属部署の情報" tone="mid" atSec={segStart(SEG_LEAST, 1)} />
        <ScopeBar
          widthPct={38}
          label="業務に必要な分だけ"
          tone="narrow"
          atSec={segStart(SEG_LEAST, 1) + 1.8}
        />
        <span
          style={{
            marginTop: 3 * SCALE,
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            ...needToKnow,
          }}
        >
          <Ms name="visibility_off" size={17 * SCALE} />
          <span>
            <span style={markerStyle}>最小権限</span>（need-to-know）の原則
          </span>
        </span>
        <div style={{ display: "flex", gap: 9 * SCALE, marginTop: 2 * SCALE }}>
          <NoteChip icon="schedule" text="入社・異動・退職で見直す" atSec={segStart(SEG_LEAST, 3)} />
          <NoteChip icon="cancel" text="使わないアカウントは削除" atSec={segStart(SEG_LEAST, 4)} />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 外部委託とクラウド — 左イラスト + 右カード2枚
// ---------------------------------------------------------------------------

const ScopeCard: React.FC<{
  icon: string;
  title: string;
  body: string;
  tag: string;
  atSec: number;
  tagAtSec: number;
}> = ({ icon, title, body, tag, atSec, tagAtSec }) => {
  const card = usePop(atSec);
  const tagAppear = useAppear(tagAtSec, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5 * SCALE,
        padding: `${10 * SCALE}px ${13 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 13 * SCALE,
        ...card,
      }}
    >
      {/* タグは見出しと同じ行に置く（縦に積むと2枚で本文領域からあふれる） */}
      <span style={{ display: "flex", alignItems: "center", gap: 7 * SCALE }}>
        <span style={{ color: colors.primary600, display: "flex", flex: "none" }}>
          <Ms name={icon} size={19 * SCALE} />
        </span>
        <b style={{ flex: "none", fontSize: 12.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
          {title}
        </b>
        <span
          style={{
            flex: "none",
            marginLeft: "auto",
            fontSize: 9.5 * SCALE,
            fontWeight: 800,
            color: colors.primary800,
            backgroundColor: colors.primary50,
            borderRadius: 999,
            padding: `${3 * SCALE}px ${10 * SCALE}px`,
            whiteSpace: "nowrap",
            ...tagAppear,
          }}
        >
          {tag}
        </span>
      </span>
      <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700, color: colors.textSecondary, lineHeight: 1.4 }}>
        {body}
      </span>
    </div>
  );
};

const OutsourceScene: React.FC = () => {
  const illustAppear = useAppear(0.4);
  return (
    <SlideShell
      heading="守る範囲は社外にも広がる"
      icon={<Ms name="handshake" size={videoType.slideHeadIcon} />}
      narration={SEG_OUTSOURCE}
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
          src={staticFile("images/ipa_sg/mgmt-contract.png")}
          style={{
            flex: 1,
            minWidth: 0,
            maxHeight: "100%",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div style={{ flex: 1.4, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 * SCALE }}>
          <ScopeCard
            icon="handshake"
            title="外部委託"
            body="委託しても、情報を守る責任はなくならない"
            tag="契約で事項を定める"
            atSec={segStart(SEG_OUTSOURCE, 1)}
            tagAtSec={segStart(SEG_OUTSOURCE, 2)}
          />
          <ScopeCard
            icon="cloud"
            title="クラウド利用"
            body="事業者と利用者で責任の範囲を分け合う"
            tag="責任共有モデル"
            atSec={segStart(SEG_OUTSOURCE, 3)}
            tagAtSec={segStart(SEG_OUTSOURCE, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: サイバーハイジーン — 用語ドン + 代表例のアイコン3連
// ---------------------------------------------------------------------------

const HygieneItem: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => {
  const item = usePop(atSec);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        width: 104 * SCALE,
        ...item,
      }}
    >
      <span
        style={{
          width: 42 * SCALE,
          height: 42 * SCALE,
          borderRadius: 14 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={24 * SCALE} />
      </span>
      <span
        style={{
          fontSize: 10 * SCALE,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.3,
          whiteSpace: "pre-line",
        }}
      >
        {label}
      </span>
    </div>
  );
};

const HygieneScene: React.FC = () => {
  const termAppear = usePop(0.3);
  const subAppear = useAppear(segStart(SEG_HYGIENE, 1));
  const base = segStart(SEG_HYGIENE, 2);
  return (
    <SlideShell narration={SEG_HYGIENE}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 7 * SCALE,
        }}
      >
        <b
          style={{
            fontSize: 27 * SCALE,
            fontWeight: 800,
            color: colors.primary600,
            ...termAppear,
          }}
        >
          サイバーハイジーン
        </b>
        <span
          style={{
            fontSize: 12 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            ...subAppear,
          }}
        >
          手洗いのように<span style={markerStyle}>基本を日々続ける</span>
        </span>
        <div style={{ display: "flex", gap: 12 * SCALE, marginTop: 6 * SCALE }}>
          <HygieneItem icon="security" label={"修正プログラム\nの適用"} atSec={base} />
          <HygieneItem icon="cancel" label={"不要なソフト\nの削除"} atSec={base + 0.35} />
          <HygieneItem icon="inventory_2" label={"資産の\n棚卸し"} atSec={base + 0.7} />
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

export const SgL22SecurityManagement: VideoSpec = {
  id: "sg-L22-security-management",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "情報セキュリティ\n管理の全体像",
      keywords: ["ポリシー", "最小権限", "衛生管理"],
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
      name: "four-pillars",
      durationSec: 6,
      narration: SEG_PILLARS,
      component: PillarsScene,
    },
    {
      pattern: "custom",
      name: "policy",
      durationSec: 5,
      narration: SEG_POLICY,
      component: PolicyScene,
    },
    {
      pattern: "flow",
      heading: "JIS Q 31000 のリスク管理",
      icon: "gpp_maybe",
      steps: [
        { abc: "1", name: "特定", sub: "何が起きうるか" },
        { abc: "2", name: "分析", sub: "起こりやすさと影響" },
        { abc: "3", name: "評価", sub: "受け入れられるか" },
        { abc: "4", name: "対応", sub: "手を決めて実行" },
      ],
      // s05-3 は「特定→分析→評価」を1文で語るので、文の中の該当箇所に合わせて点灯を送る
      highlightAtSec: [
        segStart(SEG_RISK, 2) + 0.8,
        segStart(SEG_RISK, 2) + 2.8,
        segStart(SEG_RISK, 2) + 4.6,
        segStart(SEG_RISK, 3),
      ],
      narration: SEG_RISK,
    },
    {
      pattern: "custom",
      name: "least-privilege",
      durationSec: 6,
      narration: SEG_LEAST,
      transitionIn: "wipe-light",
      component: LeastPrivilegeScene,
    },
    {
      pattern: "custom",
      name: "outsource-cloud",
      durationSec: 6,
      narration: SEG_OUTSOURCE,
      component: OutsourceScene,
    },
    {
      pattern: "custom",
      name: "cyber-hygiene",
      durationSec: 5,
      narration: SEG_HYGIENE,
      component: HygieneScene,
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
      question: "必要な範囲だけ権限を与える原則は？",
      choices: [
        { key: "A", text: "最小権限の原則", correct: true },
        { key: "B", text: "責任共有モデル" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "外部委託したときの守る責任は？",
      choices: [
        { key: "A", text: "委託先だけが負う" },
        { key: "B", text: "委託した側にも残る", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "基本対策を日々続ける考え方は？",
      choices: [
        { key: "A", text: "リスクアセスメント" },
        { key: "B", text: "サイバーハイジーン", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行に収める（29文字が上限。超えると3行分がテロップ帯に重なる）
          text: "管理はポリシーでルールを決めることから始まります。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "リスクは特定、分析、評価、対応の流れで見直します。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "権限は最小限に、委託先やクラウドも管理の範囲です。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
