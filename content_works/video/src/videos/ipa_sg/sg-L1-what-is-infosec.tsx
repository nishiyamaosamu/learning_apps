import { Img, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L1-what-is-infosec.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L1: 情報セキュリティとは
 *
 * content_works/ipa_sg/LESSON_PLAN.md の L1（第1章）に対応。
 * シナリオは narration/ipa_sg/sg-L1-what-is-infosec.md。
 *
 * 「情報セキュリティ＝CIA3特性を保つこと」を背骨にした構成:
 *   導入（漏れる・書き換わる・使えない）→ CIA3特性（カード3連・最後に頭文字を回収）→
 *   事故を特性で読む（行＋矢印）→ wipe-light で追加の4特性（2×2）→
 *   多層防御（同心円）→ バイデザイン（vs）→ クイズ幕間 → クイズ3問 → wipe でまとめ。
 * 隣り合うページで視覚文法（縦カード／横行／グリッド／同心円／対比表）を必ず変えている。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L1-what-is-infosec");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、情報セキュリティとは何かを学びます。"),
  N("s02-2.mp3", "会社の情報が外に漏れたり、勝手に書き換えられたりすると、大きな損害になります。"),
  N("s02-3.mp3", "情報が使えなくなるだけでも、仕事は止まってしまいます。"),
  N("s02-4.mp3", "情報セキュリティは、こうした事態から情報を守る取り組みです。"),
];

const SEG_CIA = [
  N("s03-1.mp3", "情報セキュリティは、三つの特性を保つことと定義されています。"),
  N("s03-2.mp3", "機密性とは、許可された人だけが情報を使える状態です。"),
  N("s03-3.mp3", "完全性とは、情報が正確で、勝手に書き換えられていない状態です。"),
  N("s03-4.mp3", "可用性とは、必要なときにいつでも情報を使える状態です。"),
  N("s03-5.mp3", "英語の頭文字をとって、CIAの三特性と呼ばれます。"),
];

const SEG_CASE = [
  N("s04-1.mp3", "事故が起きたら、どの特性が損なわれたのかで考えます。"),
  N("s04-2.mp3", "顧客名簿が外部に流出したなら、失われたのは機密性です。"),
  N("s04-3.mp3", "注文データを勝手に書き換えられたなら、失われたのは完全性です。"),
  N("s04-4.mp3", "サーバが止まって使えなくなったなら、失われたのは可用性です。"),
];

const SEG_PLUS4 = [
  N("s05-1.mp3", "この三特性に、四つの特性を加えて考えることもあります。"),
  N("s05-2.mp3", "真正性は、名乗っているとおりの本人や機器である、ということです。"),
  N("s05-3.mp3", "責任追跡性は、誰が何をしたかを、後から追跡できることです。"),
  N("s05-4.mp3", "否認防止は、やっていないと後から言い逃れできないことです。"),
  N("s05-5.mp3", "信頼性は、システムが意図したとおりに動くことを指します。"),
];

const SEG_DEFENSE = [
  N("s06-1.mp3", "守り方の基本になるのが、多層防御という考え方です。"),
  N("s06-2.mp3", "一つの対策が破られても、次の対策が働くように重ねて守ります。"),
  N("s06-3.mp3", "入口で防ぎ、内部で見張り、外へ出さない、と層をつくります。"),
  N("s06-4.mp3", "完璧な対策は存在しない、という前提に立った考え方です。"),
];

const SEG_DESIGN = [
  N("s07-1.mp3", "もう一つ大切なのが、セキュリティバイデザインです。"),
  N("s07-2.mp3", "対策を後から付け足すのではなく、企画や設計の段階から組み込みます。"),
  N("s07-3.mp3", "後付けは費用も手間もかかり、抜け漏れも生まれやすくなります。"),
  N("s07-4.mp3", "同じ考え方を個人情報の保護に当てはめたものが、プライバシーバイデザインです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s09-1.mp3", "ここで問題です。"),
  N("s09-2.mp3", "情報が勝手に書き換えられていないことを表す特性は、どれでしょうか。"),
  N("s09-3.mp3", "正解は、完全性です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s10-1.mp3", "次の問題です。"),
  N("s10-2.mp3", "誰が何をしたかを後から追跡できることを表す特性は、どれでしょうか。"),
  N("s10-3.mp3", "正解は、責任追跡性です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s11-1.mp3", "最後の問題です。"),
  N("s11-2.mp3", "企画や設計の段階からセキュリティを組み込む考え方は、何でしょうか。"),
  N("s11-3.mp3", "正解は、セキュリティバイデザインです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s12-1.mp3", "情報セキュリティの基本は、機密性、完全性、可用性の三特性です。"),
  N("s12-2.mp3", "これに真正性、責任追跡性、否認防止、信頼性を加えた七つで考えます。"),
  N("s12-3.mp3", "対策は多層に重ね、設計の段階から組み込むのが基本です。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// P2: 導入 — 左テキスト（3つの失われ方）+ 右イラスト
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const noteAppear = useAppear(segStart(SEG_INTRO, 3));
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 * SCALE }}>
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.5,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"漏れる・書き換わる\n"}
            <span style={markerStyle}>使えなくなる</span>
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
            これを防ぐのが情報セキュリティ
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/scene-incident.png")}
          style={{
            flex: 1.05,
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
// P3: CIA3特性 — 縦カード3連。頭文字は最後の文（s03-5）で回収する
// ---------------------------------------------------------------------------

const CiaCard: React.FC<{
  letter: string;
  icon: string;
  name: string;
  desc: string;
  atSec: number;
  letterAtSec: number;
}> = ({ letter, icon, name, desc, atSec, letterAtSec }) => {
  const card = usePop(atSec);
  const letterAppear = useAppear(letterAtSec, { dy: 10 });
  return (
    <div
      style={{
        width: 118 * SCALE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${10 * SCALE}px ${6 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          fontSize: 20 * SCALE,
          fontWeight: 800,
          lineHeight: 1,
          color: colors.primary600,
          ...letterAppear,
        }}
      >
        {letter}
      </span>
      <span
        style={{
          width: 40 * SCALE,
          height: 40 * SCALE,
          borderRadius: 14 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={23 * SCALE} />
      </span>
      <b style={{ fontSize: 13 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
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

const CiaScene: React.FC = () => (
  <SlideShell
    heading="情報セキュリティの3特性"
    icon={<Ms name="shield" size={videoType.slideHeadIcon} />}
    narration={SEG_CIA}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 13 * SCALE,
      }}
    >
      <CiaCard
        letter="C"
        icon="lock"
        name="機密性"
        desc="許可された人だけ"
        atSec={segStart(SEG_CIA, 1)}
        letterAtSec={segStart(SEG_CIA, 4)}
      />
      <CiaCard
        letter="I"
        icon="fact_check"
        name="完全性"
        desc="改ざんされていない"
        atSec={segStart(SEG_CIA, 2)}
        letterAtSec={segStart(SEG_CIA, 4) + 0.25}
      />
      <CiaCard
        letter="A"
        icon="autorenew"
        name="可用性"
        desc="必要なときに使える"
        atSec={segStart(SEG_CIA, 3)}
        letterAtSec={segStart(SEG_CIA, 4) + 0.5}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P4: 事故はどの特性が失われたかで読む — 横1行 ×3（カード3連と視覚文法を変える）
// ---------------------------------------------------------------------------

const CaseRow: React.FC<{ icon: string; incident: string; trait: string; atSec: number }> = ({
  icon,
  incident,
  trait,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 14 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        width: "100%",
        padding: `${6 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 12 * SCALE,
        ...row,
      }}
    >
      <span
        style={{
          width: 26 * SCALE,
          height: 26 * SCALE,
          borderRadius: 9 * SCALE,
          backgroundColor: colors.incorrectSurface,
          color: colors.incorrect,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={16 * SCALE} />
      </span>
      <span style={{ flex: 1, minWidth: 0, fontSize: 12 * SCALE, fontWeight: 700 }}>{incident}</span>
      <span style={{ fontSize: 15 * SCALE, fontWeight: 800, color: colors.primary300, flex: "none" }}>
        →
      </span>
      <span
        style={{
          flex: "none",
          fontSize: 12.5 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
          backgroundColor: colors.primary50,
          border: `${1.5 * SCALE}px solid ${colors.primary100}`,
          borderRadius: 999,
          padding: `${4 * SCALE}px ${13 * SCALE}px`,
          whiteSpace: "nowrap",
        }}
      >
        {trait}
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => (
  <SlideShell
    heading="どの特性が失われた？"
    icon={<Ms name="help" size={videoType.slideHeadIcon} />}
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
        gap: 9 * SCALE,
      }}
    >
      <CaseRow
        icon="visibility"
        incident="顧客名簿が外部に流出した"
        trait="機密性"
        atSec={segStart(SEG_CASE, 1)}
      />
      <CaseRow
        icon="edit"
        incident="注文データを書き換えられた"
        trait="完全性"
        atSec={segStart(SEG_CASE, 2)}
      />
      <CaseRow
        icon="error"
        incident="サーバが止まって使えない"
        trait="可用性"
        atSec={segStart(SEG_CASE, 3)}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P5: 追加の4特性 — 2×2グリッド（横並びカード。P3の縦カードと形を変える）
// ---------------------------------------------------------------------------

const TraitCard: React.FC<{ icon: string; name: string; desc: string; atSec: number }> = ({
  icon,
  name,
  desc,
  atSec,
}) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${9 * SCALE}px ${11 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 13 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          width: 36 * SCALE,
          height: 36 * SCALE,
          borderRadius: 12 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={21 * SCALE} />
      </span>
      <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 * SCALE }}>
        <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
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

const Plus4Scene: React.FC = () => (
  <SlideShell
    heading="3特性に加える4つの特性"
    icon={<Ms name="verified_user" size={videoType.slideHeadIcon} />}
    narration={SEG_PLUS4}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignContent: "center",
        gap: 10 * SCALE,
      }}
    >
      <TraitCard
        icon="badge"
        name="真正性"
        desc="名乗るとおりの本人である"
        atSec={segStart(SEG_PLUS4, 1)}
      />
      <TraitCard
        icon="fact_check"
        name="責任追跡性"
        desc="誰が何をしたかを後から追える"
        atSec={segStart(SEG_PLUS4, 2)}
      />
      <TraitCard
        icon="gavel"
        name="否認防止"
        desc="後から言い逃れできない"
        atSec={segStart(SEG_PLUS4, 3)}
      />
      <TraitCard
        icon="task_alt"
        name="信頼性"
        desc="意図したとおりに動く"
        atSec={segStart(SEG_PLUS4, 4)}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P6: 多層防御 — 同心円（外から 入口／内部／出口、中心に守る情報資産）
// ---------------------------------------------------------------------------

// 本文領域の高さ（見出しあり＝約 577px）に収まる寸法。
// 層の名前は円の帯に書き込むと文字幅が帯の弦を超えるので、左の凡例に出して同期させる。
const RING_OUTER = 470;
const RING_MID = 350;
const RING_INNER = 262;
const RING_CORE = 168;

const Ring: React.FC<{
  size: number;
  bg: string;
  borderColor: string;
  atSec: number;
}> = ({ size, bg, borderColor, atSec }) => {
  const ring = usePop(atSec, { from: 0.85 });
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: size,
        height: size,
        marginTop: -size / 2,
        marginLeft: -size / 2,
        borderRadius: "50%",
        backgroundColor: bg,
        border: `${2 * SCALE}px solid ${borderColor}`,
        ...ring,
      }}
    />
  );
};

const LayerLegend: React.FC<{
  swatch: string;
  name: string;
  desc: string;
  atSec: number;
}> = ({ swatch, name, desc, atSec }) => {
  const item = useAppear(atSec, { dy: 10 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE, ...item }}>
      <span
        style={{
          width: 20 * SCALE,
          height: 20 * SCALE,
          borderRadius: "50%",
          border: `${2.5 * SCALE}px solid ${swatch}`,
          flex: "none",
        }}
      />
      <span style={{ display: "flex", flexDirection: "column", gap: 1 * SCALE }}>
        <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
        <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
          {desc}
        </span>
      </span>
    </div>
  );
};

const DefenseScene: React.FC = () => {
  const core = usePop(0.3);
  const note = useAppear(segStart(SEG_DEFENSE, 3), { dy: 10 });
  const labelBase = segStart(SEG_DEFENSE, 2);
  const ringBase = segStart(SEG_DEFENSE, 1);
  return (
    <SlideShell
      heading="多層防御"
      icon={<Ms name="security" size={videoType.slideHeadIcon} />}
      narration={SEG_DEFENSE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "7%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 13 * SCALE }}>
          <LayerLegend
            swatch={colors.primary100}
            name="入口対策"
            desc="外から入れさせない"
            atSec={labelBase}
          />
          <LayerLegend
            swatch={colors.primary300}
            name="内部対策"
            desc="中の動きを見張る"
            atSec={labelBase + 0.9}
          />
          <LayerLegend
            swatch={colors.primary500}
            name="出口対策"
            desc="外へ持ち出させない"
            atSec={labelBase + 1.8}
          />
          <span
            style={{
              marginTop: 3 * SCALE,
              fontSize: 11 * SCALE,
              fontWeight: 700,
              lineHeight: 1.2,
              color: colors.textSecondary,
              ...note,
            }}
          >
            破られる前提で<span style={markerStyle}>重ねて守る</span>
          </span>
        </div>
        <div style={{ position: "relative", width: RING_OUTER, height: RING_OUTER, flex: "none" }}>
          <Ring
            size={RING_OUTER}
            bg={colors.primary50}
            borderColor={colors.primary100}
            atSec={ringBase}
          />
          <Ring
            size={RING_MID}
            bg={colors.surface}
            borderColor={colors.primary300}
            atSec={ringBase + 0.35}
          />
          <Ring
            size={RING_INNER}
            bg={colors.primary50}
            borderColor={colors.primary500}
            atSec={ringBase + 0.7}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: RING_CORE,
              height: RING_CORE,
              marginTop: -RING_CORE / 2,
              marginLeft: -RING_CORE / 2,
              borderRadius: "50%",
              backgroundColor: colors.surface,
              border: `${2 * SCALE}px solid ${colors.primary600}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1 * SCALE,
              ...core,
            }}
          >
            <Img
              src={staticFile("images/ipa_sg/icon-database.png")}
              style={{ width: 64, height: 64, objectFit: "contain", mixBlendMode: "multiply" }}
            />
            <b style={{ fontSize: 7 * SCALE, fontWeight: 800, color: colors.primary800 }}>情報資産</b>
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

export const SgL1WhatIsInfosec: VideoSpec = {
  id: "sg-L1-what-is-infosec",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "情報セキュリティ\nとは",
      keywords: ["機密性", "完全性", "可用性"],
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
      name: "cia",
      durationSec: 6,
      narration: SEG_CIA,
      component: CiaScene,
    },
    {
      pattern: "custom",
      name: "which-trait",
      durationSec: 5,
      narration: SEG_CASE,
      component: CaseScene,
    },
    {
      pattern: "custom",
      name: "plus4-traits",
      durationSec: 6,
      narration: SEG_PLUS4,
      transitionIn: "wipe-light",
      component: Plus4Scene,
    },
    {
      pattern: "custom",
      name: "defense-in-depth",
      durationSec: 6,
      narration: SEG_DEFENSE,
      component: DefenseScene,
    },
    {
      pattern: "vs",
      heading: "後付けの対策との違い",
      icon: "schema",
      left: {
        title: "後付けの対策",
        icon: "build",
        rows: [
          { k: "着手", v: "できてから対策する" },
          { k: "費用", v: "手直しでかさむ" },
          { k: "個人情報", v: "後から対応に追われる" },
        ],
      },
      right: {
        title: "バイデザイン",
        icon: "lightbulb",
        rows: [
          { k: "着手", v: "企画・設計の段階から" },
          { k: "費用", v: "全体では抑えられる" },
          { k: "個人情報", v: "プライバシーバイデザイン" },
        ],
      },
      // 左（後付け）はs07-2の前半、右（バイデザイン）は同じ文の後半に合わせて出す
      columnAtSec: [segStart(SEG_DESIGN, 1), segStart(SEG_DESIGN, 1) + 1.2],
      narration: SEG_DESIGN,
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
      question: "勝手に書き換えられない特性は？",
      choices: [
        { key: "A", text: "完全性", correct: true },
        { key: "B", text: "可用性" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "誰がしたか後から追える特性は？",
      choices: [
        { key: "A", text: "真正性" },
        { key: "B", text: "責任追跡性", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "設計段階から組み込む考え方は？",
      choices: [
        { key: "A", text: "セキュリティバイデザイン", correct: true },
        { key: "B", text: "多層防御" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行に収める（29文字が上限。超えると3行分がテロップ帯に重なる）
          text: "基本は機密性、完全性、可用性の三特性です。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "真正性、責任追跡性、否認防止、信頼性を加えて七つ。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "対策は多層に重ね、設計段階から組み込みます。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
