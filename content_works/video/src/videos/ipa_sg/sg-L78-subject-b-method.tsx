import { Img, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L78-subject-b-method.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L78: 科目B問題の解き方
 *
 * content_works/ipa_sg/LESSON_PLAN.md 第9章 L78 に対応（科目B実践の入口＝オリエンテーション回）。
 * シナリオは narration/ipa_sg/sg-L78-subject-b-method.md。
 *
 * 個別の技術ではなく、ケース問題の「読み方・立場・設問の型」を扱う:
 * 導入 → 科目A/Bの違い(vs) → 情報セキュリティリーダーの立場(custom+illust) →
 * 読解4ステップ(flow) → 設問パターンの地図(custom 2×2) → 解くコツ(bullets) →
 * クイズ幕間 → クイズ3問 → まとめ(wipe)。
 * イラストは P4 に person-leader-point.png（＝あなた）を1枚だけ添える。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L78-subject-b-method");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "今回は、試験の科目Bを解くための、考え方の型を身につけます。"),
  N("s02-2.mp3", "科目Bは、会社で実際に起こりそうな出来事を題材にした、長文のケース問題です。"),
  N("s02-3.mp3", "知識を覚えるだけでは解けず、読み方そのものにコツがあります。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "まず、科目Aと科目Bの違いを整理しておきましょう。"),
  N("s03-2.mp3", "科目Aは、短い文章で知識を問う、四択の問題です。"),
  N("s03-3.mp3", "一方の科目Bは、会社の状況を読み解いて判断する、ケース問題です。"),
  N("s03-4.mp3", "暗記の力よりも、状況を整理して筋道を立てる力が問われます。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "科目Bであなたが演じるのは、情報セキュリティリーダーです。"),
  N("s04-2.mp3", "組織の中で、セキュリティ対策を実際に進めていく役割の担当者です。"),
  N("s04-3.mp3", "リスクを見つけて対策を考え、経営層に報告や提案を行います。"),
  N("s04-4.mp3", "現場と経営をつなぐ、橋渡しの立場だとイメージしてください。"),
  N("s04-5.mp3", "ただし、最終的に決めるのは経営層だ、という点も覚えておきましょう。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "では、ケース問題を読む手順を、四つのステップで確認します。"),
  N("s05-2.mp3", "まず、設問を先に読み、何を問われているのかを確かめます。"),
  N("s05-3.mp3", "次に、登場人物の役割と、図や表に書かれた前提を掴みます。"),
  N("s05-4.mp3", "そのうえで、選択肢を一つずつ、前提の条件に照らしていきます。"),
  N("s05-5.mp3", "最後に、本文にない条件を勝手に足していないか、見直します。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "科目Bの設問は、大きく四つの型に分けられます。"),
  N("s06-2.mp3", "リスクを見つける、対策を選ぶ、運用を点検する、インシデントに対応する、の四つです。"),
  N("s06-3.mp3", "どの型でも、判断の根拠は必ず本文と図表の中にあります。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "最後に、解くときのコツと、はまりやすい落とし穴を押さえましょう。"),
  N("s07-2.mp3", "全て挙げる形式では、条件に合うものを、漏れなく選ぶことが大切です。"),
  N("s07-3.mp3", "そして、経験や思い込みで、本文にない前提を足さないよう気をつけます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ（共通音声）

const SEG_Q1 = [
  N("s09-1.mp3", "ここで問題です。"),
  N("s09-2.mp3", "科目Bであなたが判断する立場は、次のうちどれでしょうか。"),
  N("s09-3.mp3", "正解は、情報セキュリティリーダーです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s10-1.mp3", "次の問題です。"),
  N("s10-2.mp3", "ケース問題を読むとき、最初にすべきことは何でしょうか。"),
  N("s10-3.mp3", "正解は、設問を先に読むことです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s11-1.mp3", "最後の問題です。"),
  N("s11-2.mp3", "選択肢を判断する根拠は、どこにあるでしょうか。"),
  N("s11-3.mp3", "正解は、本文と図や表の中です。", { gapBeforeSec: 1.8 }),
];

const SEG_P12 = [
  N("s12-1.mp3", "科目Bは、リーダーの立場でケースを判断する問題です。"),
  N("s12-2.mp3", "設問を先に読み、本文と図表の条件に照らして選びます。"),
  OUTRO_SEG, // 定型セリフ（共通音声）
];

// ---------------------------------------------------------------------------
// P4: 情報セキュリティリーダーの立場（左テキスト + 右イラスト）
// 役割の説明(s04-2)と「決めるのは経営層」の但し書き(s04-5)を、その読み上げ開始に同期して出す
// ---------------------------------------------------------------------------

const LeaderRoleScene: React.FC = () => {
  const titleAppear = useAppear(0.3);
  const roleAppear = useAppear(segStart(SEG_P4, 1));
  const caveatAppear = useAppear(segStart(SEG_P4, 4));
  const illustAppear = useAppear(0.5);

  return (
    <SlideShell heading="あなたの立場" icon={<Ms name="badge" size={videoType.slideHeadIcon} />} narration={SEG_P4}>
      <div style={{ flex: 1, minHeight: 0, marginTop: "2%", display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 * SCALE }}>
          <span style={{ fontSize: 18 * SCALE, fontWeight: 800, lineHeight: 1.45, ...titleAppear }}>
            主人公は<span style={markerStyle}>情報セキュリティリーダー</span>
          </span>
          <span style={{ fontSize: 12 * SCALE, fontWeight: 700, color: colors.textSecondary, ...roleAppear }}>
            組織で対策を進め、経営層に報告・提案する担当者
          </span>
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary300}`,
              borderRadius: 8 * SCALE,
              padding: `${5 * SCALE}px ${11 * SCALE}px`,
              ...caveatAppear,
            }}
          >
            決めるのは経営層
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-leader-point.png")}
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
// P6: 設問パターンの地図（2×2カード）— 4つの型を staggered pop で
// s06-2 で4つを一息に読むので、その読み上げ開始から順にポップさせる
// ---------------------------------------------------------------------------

const MAP_CARDS = [
  { icon: "search", label: "見つける", sub: "リスクの特定・算定" },
  { icon: "shield", label: "選ぶ", sub: "対策の選定・計画" },
  { icon: "checklist", label: "点検する", sub: "運用の点検・監査" },
  { icon: "warning", label: "対応する", sub: "インシデント対応" },
];

const MapCard: React.FC<{ icon: string; label: string; sub: string; delaySec: number }> = ({
  icon,
  label,
  sub,
  delaySec,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 11 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 12 * SCALE,
      padding: `${13 * SCALE}px ${15 * SCALE}px`,
      ...usePop(delaySec),
    }}
  >
    <span
      style={{
        width: 44 * SCALE,
        height: 44 * SCALE,
        flex: "none",
        borderRadius: 12 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={24 * SCALE} />
    </span>
    <div style={{ display: "flex", flexDirection: "column", gap: 2 * SCALE, minWidth: 0 }}>
      <b style={{ fontSize: 14 * SCALE, fontWeight: 800 }}>{label}</b>
      <span style={{ fontSize: 10 * SCALE, color: colors.textSecondary }}>{sub}</span>
    </div>
  </div>
);

const QuestionMapScene: React.FC = () => (
  <SlideShell heading="設問パターンの地図" icon={<Ms name="map" size={videoType.slideHeadIcon} />} narration={SEG_P6}>
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 12 * SCALE,
        alignContent: "center",
      }}
    >
      {MAP_CARDS.map((c, i) => (
        <MapCard key={c.label} icon={c.icon} label={c.label} sub={c.sub} delaySec={segStart(SEG_P6, 1) + i * 0.35} />
      ))}
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

export const SgL78SubjectBMethod: VideoSpec = {
  id: "sg-L78-subject-b-method",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "科目B問題の\n解き方",
      keywords: ["ケース問題", "読解手順", "設問の型"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "bullets",
      heading: "科目Bという壁",
      icon: "menu_book",
      bullets: [
        { text: "長文のケース問題", sub: "会社で起こる出来事が題材", marker: "blue" },
        { text: "読み方にコツがある", sub: "知識の暗記だけでは解けない" },
      ],
      appearAtSec: [segStart(SEG_P2, 1), segStart(SEG_P2, 2)],
      narration: SEG_P2,
    },
    {
      pattern: "vs",
      heading: "科目Aと科目Bの違い",
      icon: "compare_arrows",
      left: {
        title: "科目A",
        icon: "quiz",
        rows: [
          { k: "形式", v: "短文の四択" },
          { k: "問うもの", v: "知識・用語" },
          { k: "必要な力", v: "覚える力" },
        ],
      },
      right: {
        title: "科目B",
        icon: "menu_book",
        rows: [
          { k: "形式", v: "長文のケース" },
          { k: "問うもの", v: "状況の判断" },
          { k: "必要な力", v: "整理する力" },
        ],
      },
      // 左（科目A）はs03-2、右（科目B）はs03-3の読み上げ開始に合わせて出す
      columnAtSec: [segStart(SEG_P3, 1), segStart(SEG_P3, 2)],
      narration: SEG_P3,
    },
    {
      pattern: "custom",
      name: "leader-role",
      durationSec: 6,
      narration: SEG_P4,
      component: LeaderRoleScene,
    },
    {
      pattern: "flow",
      heading: "ケースを読む4ステップ",
      icon: "fact_check",
      steps: [
        { abc: "1", name: "設問", sub: "何を問われているか先に読む" },
        { abc: "2", name: "前提", sub: "人物の役割・図表の条件を掴む" },
        { abc: "3", name: "照合", sub: "選択肢を条件に照らす" },
        { abc: "4", name: "検算", sub: "本文にない前提を足さない" },
      ],
      // 各ステップをそれを説明するナレーション文（s05-2〜s05-5）の読み上げ開始に同期
      highlightAtSec: [segStart(SEG_P5, 1), segStart(SEG_P5, 2), segStart(SEG_P5, 3), segStart(SEG_P5, 4)],
      narration: SEG_P5,
    },
    {
      pattern: "custom",
      name: "question-map",
      durationSec: 6,
      narration: SEG_P6,
      transitionIn: "wipe-light",
      component: QuestionMapScene,
    },
    {
      pattern: "bullets",
      heading: "解くコツと落とし穴",
      icon: "lightbulb",
      bullets: [
        { text: "漏れなく選ぶ", sub: "「全て挙げよ」は数え上げる", marker: "blue" },
        { text: "前提を足さない", sub: "思い込みで条件を補わない", marker: "pink" },
      ],
      appearAtSec: [segStart(SEG_P7, 1), segStart(SEG_P7, 2)],
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
      question: "あなたが判断する立場は？",
      choices: [
        { key: "A", text: "情報セキュリティリーダー", correct: true },
        { key: "B", text: "外部の攻撃者" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "ケースを読むとき最初にするのは？",
      choices: [
        { key: "A", text: "設問を先に読む", correct: true },
        { key: "B", text: "本文を最後まで暗記する" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "判断の根拠はどこにある？",
      choices: [
        { key: "A", text: "本文と図表の中", correct: true },
        { key: "B", text: "自分の経験と勘" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "科目Bは、リーダーの立場でケースを判断する問題です。",
          checkAtSec: segStart(SEG_P12, 0),
        },
        {
          text: "設問を先に読み、本文と図表の条件に照らして選びます。",
          checkAtSec: segStart(SEG_P12, 1),
        },
      ],
      narration: SEG_P12,
      transitionIn: "wipe",
    },
  ],
};
