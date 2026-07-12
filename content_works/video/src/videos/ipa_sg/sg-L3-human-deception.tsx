import { Img, interpolateColors, staticFile } from "remotion";
import { colors, markerStyle, SCALE } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { useAppear, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L3-human-deception.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L3: 人をだます攻撃
 *
 * content_works/ipa_sg/LESSON_PLAN.md の L3（第1章）に対応。
 * シナリオは narration/ipa_sg/sg-L3-human-deception.md。
 *
 * 前半（ソーシャルエンジニアリング・BEC・SNS悪用・迷惑メール＝外部からのだまし）→
 * wipe-light で内部不正へ転換（＋誤操作・紛失＝組織内部の人的リスク）→
 * クイズ幕間 → クイズ3問 → wipe でまとめ、という二部構成。
 * 情景・人物が絡むページ（P2 ソーシャルエンジニアリング, P6 内部不正）にだけ
 * 既存の手描きイラスト（public/images/ipa_sg/）を添える。構造ページ（BEC・誤操作/紛失）は
 * flow / vs で組む。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L3-human-deception");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P1 = [
  N("s02-1.mp3", "今回は、人の心理につけこむ「人をだます攻撃」について学びます。"),
  N("s02-2.mp3", "どれほどシステムを固めても、最後に操作するのは人です。"),
  N("s02-3.mp3", "その心のすきを、攻撃者は執拗に狙ってきます。"),
];

const SEG_P2 = [
  N("s03-1.mp3", "コンピュータの技術ではなく、人の心理や行動のすきにつけこむ手口があります。"),
  N("s03-2.mp3", "これを、ソーシャルエンジニアリングと呼びます。"),
  N("s03-3.mp3", "代表的なのが、盗み見となりすまし電話です。"),
  N("s03-4.mp3", "盗み見は、背後から画面や書類をのぞき見て情報を盗む手口です。"),
  N("s03-5.mp3", "なりすまし電話は、上司や取引先を装って情報や送金を引き出します。"),
  N("s03-6.mp3", "声だけでは、本人かどうかを見分けにくいのが弱点です。"),
];

const SEG_P3 = [
  N("s04-1.mp3", "メールを使った詐欺の代表が、ビジネスメール詐欺、BECです。"),
  N("s04-2.mp3", "まず、経営者や取引先になりすましたメールを送りつけます。"),
  N("s04-3.mp3", "緊急の送金や、振込先の変更を装って指示を出します。"),
  N("s04-4.mp3", "本物の取引メールとそっくりで、見分けるのが難しいのが特徴です。"),
  N("s04-5.mp3", "経理担当者が、偽の送金依頼をそのまま信じてしまう事例が典型です。"),
  N("s04-6.mp3", "巧妙な文面を信じ込み、送金してしまう被害が後を絶ちません。"),
];

const SEG_P4 = [
  N("s05-1.mp3", "SNSでも、だましの手口が広がっています。"),
  N("s05-2.mp3", "本人になりすましたアカウントで信頼させ、だまし取る事例があります。"),
  N("s05-3.mp3", "何気ない投稿から、居場所や勤務先が特定されることもあります。"),
  N("s05-4.mp3", "公開範囲の設定を誤ると、被害はさらに広がります。"),
];

const SEG_P5 = [
  N("s06-1.mp3", "身に覚えのないメールが、突然届くこともあります。"),
  N("s06-2.mp3", "怪しいリンクや添付ファイルを送りつける、これを迷惑メールと呼びます。"),
  N("s06-3.mp3", "宅配業者や公的機関をかたるメールも、多く報告されています。"),
  N("s06-4.mp3", "クリックすると偽サイトに誘導されたり、ウイルスに感染したりします。"),
];

const SEG_P6 = [
  N("s07-1.mp3", "ここからは、組織の内部にひそむ人的な脅威を見ていきます。"),
  N("s07-2.mp3", "内部の人間が、権限を悪用して情報を持ち出す内部不正もあります。"),
  N("s07-3.mp3", "退職を控えた社員が、顧客データを持ち出す事例が典型的です。"),
  N("s07-4.mp3", "不満や金銭目的が、動機になることが多いといわれます。"),
];

const SEG_P7 = [
  N("s08-1.mp3", "悪意がなくても、脅威になることがあります。"),
  N("s08-2.mp3", "メールの宛先間違いなど、うっかりミスで情報が漏れる誤操作です。"),
  N("s08-3.mp3", "パソコンやUSBメモリを置き忘れる紛失や、盗難による流出もあります。"),
  N("s08-4.mp3", "こうした人的脅威は、誰にでも起こりうる身近なリスクです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s10-1.mp3", "ここで問題です。"),
  N("s10-2.mp3", "人の心理や行動のすきを突く、だましの手口を何と呼ぶでしょうか。"),
  N("s10-3.mp3", "正解は、ソーシャルエンジニアリングです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s11-1.mp3", "次の問題です。"),
  N("s11-2.mp3", "経営者や取引先になりすまし、送金を指示するメール詐欺を何と呼ぶでしょうか。"),
  N("s11-3.mp3", "正解は、ビジネスメール詐欺、BECです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s12-1.mp3", "最後の問題です。"),
  N("s12-2.mp3", "組織内部の人間が、権限を悪用して情報を持ち出す不正の、主な動機は何でしょうか。"),
  N("s12-3.mp3", "正解は、不満や金銭目的が動機になることが多いです。", { gapBeforeSec: 1.8 }),
];

const SEG_P8 = [
  N("s13-1.mp3", "人をだます攻撃には、ソーシャルエンジニアリングやBECがあります。"),
  N("s13-2.mp3", "内部不正や誤操作、紛失も、身近な人的脅威です。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P2: ソーシャルエンジニアリング（左テキスト + 右イラスト）
// サブ行は「盗み見」「なりすまし電話」をそれぞれの説明文（s03-4 / s03-5）の
// 読み上げ開始に合わせて濃色にする（いま何の話をしているかを追える）
// ---------------------------------------------------------------------------

const HighlightSpan: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const on = useProgress(atSec, 0.3);
  const color = interpolateColors(on, [0, 1], [colors.textSecondary, colors.primary600]);
  return <span style={{ color }}>{text}</span>;
};

const SocialEngineeringScene: React.FC = () => {
  const termAppear = useAppear(0.3);
  const subAppear = useAppear(segStart(SEG_P2, 1));
  const illustAppear = useAppear(0.5);

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.45, ...termAppear }}>
            人の心理に<span style={markerStyle}>つけこむ罠</span>
          </span>
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, ...subAppear }}>
            <span style={{ color: colors.textSecondary }}>ソーシャルエンジニアリング｜</span>
            <HighlightSpan text="盗み見" atSec={segStart(SEG_P2, 3)} />
            <span style={{ color: colors.textSecondary }}>・</span>
            <HighlightSpan text="なりすまし電話" atSec={segStart(SEG_P2, 4)} />
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/attack-social.png")}
          style={{
            flex: 1.15,
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
// P6: 内部不正（左テキスト + 右イラスト）— ここで章が内部の人的脅威へ切り替わる（wipe-light）
// ---------------------------------------------------------------------------

const InsiderScene: React.FC = () => {
  const termAppear = useAppear(0.3);
  // サブ行（内部不正の定義）はそれを説明するs07-2の読み上げ開始に合わせて出す
  const subAppear = useAppear(segStart(SEG_P6, 1));
  const illustAppear = useAppear(0.5);

  return (
    <SlideShell narration={SEG_P6}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.45, ...termAppear }}>
            組織の<span style={markerStyle}>内側にひそむ</span>脅威
          </span>
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...subAppear }}>
            内部不正｜権限の悪用による情報持ち出し
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-insider-sneak.png")}
          style={{
            flex: 1.15,
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
// クイズ幕間（ダーク幕間）
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL3HumanDeception: VideoSpec = {
  id: "sg-L3-human-deception",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "人の心のすきを\nねらう攻撃",
      keywords: ["ソーシャル攻撃", "BEC", "内部不正"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "bullets",
      heading: "なぜ人が狙われるのか",
      icon: "psychology",
      bullets: [
        { text: "技術対策だけでは守れない", sub: "最後の壁は「人」の判断", marker: "blue" },
        { text: "心のすきを突かれる", sub: "焦り・信頼・親切心につけこむ" },
      ],
      // 各項目はそれを説明するナレーション文の開始秒に合わせて出す
      appearAtSec: [segStart(SEG_P1, 1), segStart(SEG_P1, 2)],
      narration: SEG_P1,
    },
    {
      pattern: "custom",
      name: "social-engineering",
      durationSec: 6,
      narration: SEG_P2,
      component: SocialEngineeringScene,
    },
    {
      pattern: "flow",
      heading: "ビジネスメール詐欺（BEC）",
      icon: "mail",
      steps: [
        { abc: "1", name: "偽装", sub: "経営者を装う" },
        { abc: "2", name: "指示", sub: "送金を指示" },
        { abc: "3", name: "被害", sub: "信じて送金" },
      ],
      // 「偽装」はs04-2、「指示」はs04-3、「被害」はs04-5（信じてしまう事例）の読み上げ開始に同期
      highlightAtSec: [segStart(SEG_P3, 1), segStart(SEG_P3, 2), segStart(SEG_P3, 4)],
      narration: SEG_P3,
    },
    {
      pattern: "bullets",
      heading: "SNSの悪用",
      icon: "forum",
      bullets: [
        { text: "なりすましアカウント", sub: "本人を装い、信頼させてだます", marker: "blue" },
        { text: "投稿からの情報特定", sub: "何気ない投稿から情報が特定される" },
      ],
      appearAtSec: [segStart(SEG_P4, 1), segStart(SEG_P4, 2)],
      narration: SEG_P4,
    },
    {
      pattern: "term",
      icon: "mail",
      term: "迷惑メール",
      sub: "怪しいリンクや添付でウイルス感染や情報漏えいを狙う",
      narration: SEG_P5,
    },
    {
      pattern: "custom",
      name: "insider-threat",
      durationSec: 5,
      narration: SEG_P6,
      transitionIn: "wipe-light",
      component: InsiderScene,
    },
    {
      pattern: "vs",
      heading: "誤操作と紛失",
      icon: "report",
      left: {
        title: "誤操作",
        icon: "error",
        rows: [
          { k: "原因", v: "宛先間違い・設定ミス" },
          { k: "結果", v: "情報が意図せず漏れる" },
        ],
      },
      right: {
        title: "紛失・盗難",
        icon: "devices",
        rows: [
          { k: "原因", v: "PC・USBの置き忘れ" },
          { k: "結果", v: "情報が持ち去られる" },
        ],
      },
      // 左（誤操作）はs08-2、右（紛失・盗難）はs08-3の読み上げ開始に合わせて出す
      columnAtSec: [segStart(SEG_P7, 1), segStart(SEG_P7, 2)],
      narration: SEG_P7,
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
      question: "だましの手口の名前は？",
      choices: [
        { key: "A", text: "ソーシャルエンジニアリング", correct: true },
        { key: "B", text: "総当たり攻撃" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "このメール詐欺の名前は？",
      choices: [
        { key: "A", text: "ビジネスメール詐欺（BEC）", correct: true },
        { key: "B", text: "フィッシング詐欺" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "内部不正の動機は？",
      choices: [
        { key: "A", text: "不満や金銭目的", correct: true },
        { key: "B", text: "システムの誤作動" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "人をだます攻撃には、ソーシャルエンジニアリングやBECがあります。",
          checkAtSec: segStart(SEG_P8, 0),
        },
        {
          text: "内部不正や誤操作、紛失も、身近な人的脅威です。",
          checkAtSec: segStart(SEG_P8, 1),
        },
      ],
      narration: SEG_P8,
      transitionIn: "wipe",
    },
  ],
};
