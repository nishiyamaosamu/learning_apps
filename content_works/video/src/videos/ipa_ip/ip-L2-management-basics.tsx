import { Img, staticFile } from "remotion";
import { colors, videoType, markerStyle, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import { SectionTitle } from "../parts/SectionTitle";
import { useAppear, usePop } from "../parts/animate";
import { DrawPath } from "../parts/draw";
import { Ms } from "../parts/Ms";
import { narrationLoader } from "../parts/narration";
import type { VideoSpec } from "./types";
import durations from "./L2-management-basics.audio.json";

/**
 * ITパスポート講座 L2: 経営管理の基本
 *
 * content_works/ipa_ip/LESSON_PLAN.md の L2 表（P1〜P13）を全16シーンに対応させる。
 * シナリオは narration/L2-management-basics.md。
 *
 * 前半（PDCA・OODA・BCP）→ wipe で人的資源管理へ大転換（HRM・育成・行動科学・多様性）→
 * クイズ幕間 → クイズ3問 → wipe でまとめ、という二部構成。
 * 構造ページ（PDCA・OODA・BCP曲線・マズロー）は custom SVG / レイアウトで組み、
 * 語りが主役の情景ページ（P1 導入・P5 HRM）にだけ手描きイラストを添える
 *   - scene-mgmt-steer: 経営管理＝目標に舵を取る（P1）
 *   - scene-team-strength: 人こそ最大の経営資源（P5, 章の転換ヒーロー）
 */

const N = narrationLoader(durations, "audio/L2-management-basics");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P1 = [
  N("s02-1.mp3", "今回は、経営管理の基本について学びます。"),
  N("s02-2.mp3", "経営管理とは、目標を立てて、その達成に向けて舵を取ることです。"),
  N("s02-3.mp3", "ヒトやカネ、情報などの資源を管理しながら進めていきます。"),
];

const SEG_P2 = [
  N("s03-1.mp3", "まずは、改善の基本となるPDCAサイクルです。"),
  N("s03-2.mp3", "計画を立て、実行し、評価して、改善する。この四つを繰り返します。"),
  N("s03-3.mp3", "ぐるぐる回すことで、仕事の質を少しずつ高めていく考え方です。"),
];

const SEG_P3 = [
  N("s04-1.mp3", "これと対比されるのが、OODAループです。"),
  N("s04-2.mp3", "観察し、状況を判断し、意思決定して、すぐ行動します。"),
  N("s04-3.mp3", "じっくり改善するPDCAに対し、OODAは素早い現場判断が持ち味です。"),
];

const SEG_P4 = [
  N("s05-1.mp3", "災害や事故が起きても、事業を止めない備えが必要です。"),
  N("s05-2.mp3", "そのための計画をBCP、事業継続計画と呼びます。"),
  N("s05-3.mp3", "被害を受けても、できるだけ早く復旧させることを目指します。"),
  N("s05-4.mp3", "計画を日ごろから運用し、見直していく活動をBCMと呼びます。"),
];

const SEG_P5 = [
  N("s06-1.mp3", "ここからは、人を活かす管理について見ていきます。"),
  N("s06-2.mp3", "人材を経営資源として活かす取り組みを、HRMと呼びます。"),
  N("s06-3.mp3", "人こそが、企業の成長を支える一番の力になります。"),
];

const SEG_P6 = [
  N("s07-1.mp3", "人を育てる方法に、コーチングとメンタリングがあります。"),
  N("s07-2.mp3", "コーチングは、問いかけて本人の答えを引き出す方法です。"),
  N("s07-3.mp3", "メンタリングは、先輩が経験をもとに助言し支える方法です。"),
];

const SEG_P7 = [
  N("s08-1.mp3", "実際の育成では、OJTとOff-JTを組み合わせます。"),
  N("s08-2.mp3", "OJTは、現場で実際の仕事をしながら学ぶ方法です。"),
  N("s08-3.mp3", "Off-JTは、職場を離れて研修や講義で学ぶ方法です。"),
  N("s08-4.mp3", "学び直しをするリスキリングも、近年重視されています。"),
];

const SEG_P8 = [
  N("s09-1.mp3", "人のやる気を説明する理論も、よく出題されます。"),
  N("s09-2.mp3", "マズローは、人の欲求を五つの段階に分けました。"),
  N("s09-3.mp3", "下の段が満たされると、より高い欲求へと進みます。"),
  N("s09-4.mp3", "満足と不満は別物と考えるのが、ハーズバーグの二要因理論です。"),
];

const SEG_P9 = [
  N("s10-1.mp3", "働きがいを高める工夫も、広がっています。"),
  N("s10-2.mp3", "MBOは、自分で目標を決めて成果を管理するやり方です。"),
  N("s10-3.mp3", "ワークライフバランスは、仕事と生活の調和を大切にします。"),
  N("s10-4.mp3", "多様な人材を受け入れ活かす考え方を、DE&Iと呼びます。"),
];

const SEG_P10 = [
  N("s11-1.mp3", "働く場所も、多様になってきました。"),
  N("s11-2.mp3", "自宅で働く在宅勤務や、外出先で働くモバイルワークがあります。"),
  N("s11-3.mp3", "拠点で働くサテライトオフィスや、旅先で働くワーケーションもあります。"),
];

const SEG_QUIZ_INTRO = [N("s12-1.mp3", "ここまで学んだことを、クイズ形式で確認していきましょう。")];

const SEG_Q1 = [
  N("s13-1.mp3", "ここで問題です。"),
  N("s13-2.mp3", "PDCAサイクルのCは、何を表すでしょうか。"),
  N("s13-3.mp3", "正解は、評価を意味するチェックです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s14-1.mp3", "次の問題です。"),
  N("s14-2.mp3", "OJTとOff-JTの説明として、正しいのはどちらでしょうか。"),
  N("s14-3.mp3", "正解は、OJTは現場、Off-JTは研修で学ぶ、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s15-1.mp3", "最後の問題です。"),
  N("s15-2.mp3", "BCPの説明として、最も適切なのはどちらでしょうか。"),
  N("s15-3.mp3", "正解は、事業を続け、早く復旧させる計画です。", { gapBeforeSec: 1.8 }),
];

const SEG_P11 = [
  N("s16-1.mp3", "経営管理では、PDCAで改善を続け、BCPで危機に備えます。"),
  N("s16-2.mp3", "そして、人を育て活かすことが、成長につながります。"),
  N("s16-3.mp3", "今回のレッスンはここまでです。お疲れさまでした！"),
];

// ---------------------------------------------------------------------------
// P4: BCP（事業継続計画）— 稼働率の復旧曲線。BCPありは早く戻り、対策なしは低いまま
// ---------------------------------------------------------------------------

const LegendSwatch: React.FC<{ color: string; label: string; delaySec: number }> = ({
  color,
  label,
  delaySec,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE, ...useAppear(delaySec) }}>
    <span style={{ width: 16 * SCALE, height: 4 * SCALE, borderRadius: 999, backgroundColor: color }} />
    <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textSecondary }}>{label}</span>
  </div>
);

const BcpScene: React.FC = () => (
  <SlideShell
    heading="BCP（事業継続計画）"
    icon={<Ms name="shield" size={videoType.slideHeadIcon} />}
    narration={SEG_P4}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "1.5%",
        display: "flex",
        flexDirection: "column",
        gap: 6 * SCALE,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: 20 * SCALE, flex: "none" }}>
        <LegendSwatch color={colors.primary600} label="BCPあり（早く復旧）" delaySec={2.2} />
        <LegendSwatch color={colors.textMuted} label="対策なし" delaySec={2.4} />
      </div>

      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", height: "100%", aspectRatio: "240 / 150", maxWidth: "100%" }}>
          <svg viewBox="0 0 240 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {/* 軸 */}
            <path d="M30 20 L30 125 L225 125" fill="none" stroke={colors.border} strokeWidth={1.6} strokeLinecap="round" />
            {/* 発生を示す縦の破線 */}
            <DrawPath d="M96 42 L96 125" delaySec={0.6} durSec={0.4} stroke={colors.textMuted} strokeWidth={1.2} dashed />
            {/* 対策なし（低いまま） */}
            <DrawPath
              d="M30 45 L90 45 L104 108 C140 106 178 99 210 93"
              delaySec={1.0}
              durSec={1.2}
              stroke={colors.textMuted}
              strokeWidth={2.4}
            />
            {/* BCPあり（早く戻る） */}
            <DrawPath
              d="M30 45 L90 45 L104 108 C134 102 162 60 210 48"
              delaySec={1.8}
              durSec={1.2}
              stroke={colors.primary600}
              strokeWidth={3}
            />
          </svg>

          <Overlay left="40%" top="15%">
            <span style={{ fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textSecondary }}>災害・事故</span>
          </Overlay>
          <Overlay left="82%" top="20%">
            <span style={{ fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.primary600 }}>早く復旧</span>
          </Overlay>
          <Overlay left="90%" top="90%">
            <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700, color: colors.textMuted }}>時間 →</span>
          </Overlay>
          <div
            style={{
              position: "absolute",
              left: "4%",
              top: "6%",
              fontSize: 9.5 * SCALE,
              fontWeight: 700,
              color: colors.textMuted,
            }}
          >
            稼働率
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
);

const Overlay: React.FC<{ left: string; top: string; children: React.ReactNode }> = ({
  left,
  top,
  children,
}) => (
  <div style={{ position: "absolute", left, top, transform: "translate(-50%, -50%)", whiteSpace: "nowrap" }}>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// P5: HRM（左テキスト + 右チームイラスト）— 人こそ最大の資源。
// ここで章が人的資源管理へ切り替わる（wipe）。手描きの人物情景で温度感を出す
// ---------------------------------------------------------------------------

const HrmScene: React.FC = () => {
  const termAppear = useAppear(0.3);
  const subAppear = useAppear(0.7);
  const illustAppear = useAppear(0.5);

  return (
    <SlideShell narration={SEG_P5}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.45, ...termAppear }}>
            人こそ、<span style={markerStyle}>最大の経営資源</span>
          </span>
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...subAppear }}>
            HRM ｜ 人を活かすマネジメント
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_ip/scene-team-strength.png")}
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
// P6: コーチングとメンタリング（2カード横並び）
// ---------------------------------------------------------------------------

const MethodCard: React.FC<{ icon: string; term: string; def: string; delaySec: number }> = ({
  icon,
  term,
  def,
  delaySec,
}) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      alignSelf: "stretch",
      backgroundColor: colors.surface,
      border: `${1 * SCALE}px solid ${colors.border}`,
      borderRadius: 14 * SCALE,
      boxShadow: `0 ${3 * SCALE}px ${10 * SCALE}px rgba(30, 41, 59, 0.06)`,
      padding: `${14 * SCALE}px ${10 * SCALE}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 7 * SCALE,
      ...usePop(delaySec),
    }}
  >
    <span
      style={{
        width: 46 * SCALE,
        height: 46 * SCALE,
        borderRadius: 16 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={25 * SCALE} />
    </span>
    <b style={{ fontSize: 16 * SCALE }}>{term}</b>
    <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, color: colors.textSecondary, textAlign: "center" }}>
      {def}
    </span>
  </div>
);

const CoachingScene: React.FC = () => (
  <SlideShell
    heading="コーチングとメンタリング"
    icon={<Ms name="forum" size={videoType.slideHeadIcon} />}
    narration={SEG_P6}
  >
    <div style={{ flex: 1, minHeight: 0, marginTop: "1.5%", display: "flex", alignItems: "center", gap: 6 * SCALE }}>
      <MethodCard icon="psychology" term="コーチング" def="問いかけて答えを引き出す" delaySec={0.4} />
      <MethodCard icon="supervisor_account" term="メンタリング" def="経験をもとに助言し支える" delaySec={1.0} />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P9: 働きがいと多様性（アイコン縦3列。各行を対応するナレーション文の開始秒に合わせて出す）
// ---------------------------------------------------------------------------

const WorkRow: React.FC<{ icon: string; text: string; delaySec: number }> = ({ icon, text, delaySec }) => {
  const pop = usePop(delaySec);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE, ...pop }}>
      <span
        style={{
          width: 30 * SCALE,
          height: 30 * SCALE,
          borderRadius: 11 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <b style={{ fontSize: 14.5 * SCALE }}>{text}</b>
    </div>
  );
};

const WORK_MBO_DELAY = SEG_P9[0].durationSec + 0.15;
const WORK_WLB_DELAY = SEG_P9[0].durationSec + SEG_P9[1].durationSec + 0.15;
const WORK_DEI_DELAY = SEG_P9[0].durationSec + SEG_P9[1].durationSec + SEG_P9[2].durationSec + 0.15;

const WorkStyleScene: React.FC = () => (
  <SlideShell
    heading="働きがいと多様性"
    icon={<Ms name="favorite" size={videoType.slideHeadIcon} />}
    narration={SEG_P9}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 11 * SCALE,
      }}
    >
      <WorkRow icon="target" text="MBO（目標による管理）" delaySec={WORK_MBO_DELAY} />
      <WorkRow icon="balance" text="ワークライフバランス" delaySec={WORK_WLB_DELAY} />
      <WorkRow icon="diversity_3" text="DE&I（多様性を活かす）" delaySec={WORK_DEI_DELAY} />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P10: テレワークの4類型（2×2 グリッド）
// ---------------------------------------------------------------------------

const TeleworkCard: React.FC<{ icon: string; name: string; sub: string; delaySec: number }> = ({
  icon,
  name,
  sub,
  delaySec,
}) => (
  <div
    style={{
      backgroundColor: colors.surface,
      border: `${1 * SCALE}px solid ${colors.border}`,
      borderRadius: 13 * SCALE,
      display: "flex",
      alignItems: "center",
      gap: 9 * SCALE,
      padding: `0 ${12 * SCALE}px`,
      ...usePop(delaySec),
    }}
  >
    <span
      style={{
        width: 34 * SCALE,
        height: 34 * SCALE,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        flex: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={19 * SCALE} />
    </span>
    <div style={{ display: "flex", flexDirection: "column", gap: 1 * SCALE, minWidth: 0 }}>
      <b style={{ fontSize: 13 * SCALE }}>{name}</b>
      <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>{sub}</span>
    </div>
  </div>
);

const TeleworkScene: React.FC = () => (
  <SlideShell
    heading="テレワークの4類型"
    icon={<Ms name="devices" size={videoType.slideHeadIcon} />}
    narration={SEG_P10}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 9 * SCALE,
      }}
    >
      <TeleworkCard icon="home" name="在宅勤務" sub="自宅で働く" delaySec={0.4} />
      <TeleworkCard icon="smartphone" name="モバイルワーク" sub="外出先で働く" delaySec={0.7} />
      <TeleworkCard icon="apartment" name="サテライトオフィス" sub="拠点で働く" delaySec={1.0} />
      <TeleworkCard icon="park" name="ワーケーション" sub="旅先で働く" delaySec={1.3} />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// クイズ幕間（ダーク幕間）
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// P11: まとめ（アイコン3連 + プラス記号。wipe で転換）
// ---------------------------------------------------------------------------

const SUMMARY_ITEMS = [
  { icon: "sync", label: "改善", delay: 0.4 },
  { icon: "shield", label: "備え", delay: 0.85 },
  { icon: "groups", label: "育成", delay: 1.3 },
] as const;

const SummaryItem: React.FC<{ icon: string; label: string; delaySec: number }> = ({ icon, label, delaySec }) => {
  const pop = usePop(delaySec);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 * SCALE, ...pop }}>
      <span
        style={{
          width: 44 * SCALE,
          height: 44 * SCALE,
          borderRadius: 16 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={24 * SCALE} />
      </span>
      <b style={{ fontSize: 13 * SCALE }}>{label}</b>
    </div>
  );
};

const SummaryScene: React.FC = () => {
  const plusAppear = useAppear(0.75);
  return (
    <SlideShell narration={SEG_P11}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE }}>
          {SUMMARY_ITEMS.map((it, i) => (
            <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 9 * SCALE }}>
              {i > 0 ? (
                <span style={{ fontSize: 15 * SCALE, fontWeight: 800, color: colors.textMuted, ...plusAppear }}>
                  +
                </span>
              ) : null}
              <SummaryItem icon={it.icon} label={it.label} delaySec={it.delay} />
            </div>
          ))}
        </div>
        <span
          style={{
            fontSize: 12.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            textAlign: "center",
            ...useAppear(2.2),
          }}
        >
          この3つが、経営管理を支える柱です
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const L2ManagementBasics: VideoSpec = {
  id: "L2-management-basics",
  scenes: [
    {
      pattern: "title",
      series: "ITパスポート講座",
      title: "計画し、実行し、\n改善するしくみ",
      keywords: ["PDCA", "BCP", "人材育成"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "bullets",
      heading: "経営管理とは",
      icon: "target",
      bullets: [
        { text: "目標を立てて達成へ導く", sub: "経営目標に向けて舵を取る", marker: "blue" },
        { text: "資源を管理する", sub: "ヒト・カネ・情報を活かす" },
      ],
      illust: "images/ipa_ip/scene-mgmt-steer.png",
      narration: SEG_P1,
    },
    {
      pattern: "flow",
      heading: "PDCAサイクル",
      steps: [
        { abc: "P", name: "計画", sub: "Plan" },
        { abc: "D", name: "実行", sub: "Do" },
        { abc: "C", name: "評価", sub: "Check" },
        { abc: "A", name: "改善", sub: "Act" },
      ],
      narration: SEG_P2,
    },
    {
      pattern: "vs",
      heading: "PDCAとOODAの違い",
      icon: "compare_arrows",
      left: {
        title: "PDCA",
        icon: "sync",
        rows: [
          { k: "進め方", v: "計画から改善へ" },
          { k: "速さ", v: "じっくり改善" },
          { k: "得意", v: "継続的な改善" },
        ],
      },
      right: {
        title: "OODA",
        icon: "bolt",
        rows: [
          { k: "進め方", v: "観察から行動へ" },
          { k: "速さ", v: "素早く判断" },
          { k: "得意", v: "変化への即応" },
        ],
      },
      narration: SEG_P3,
    },
    { pattern: "custom", name: "bcp-curve", durationSec: 7, narration: SEG_P4, component: BcpScene },
    {
      pattern: "custom",
      name: "hrm-hero",
      durationSec: 5,
      narration: SEG_P5,
      transitionIn: "wipe",
      component: HrmScene,
    },
    { pattern: "custom", name: "coaching-cards", durationSec: 5, narration: SEG_P6, component: CoachingScene },
    {
      pattern: "vs",
      heading: "OJTとOff-JT",
      icon: "menu_book",
      left: {
        title: "OJT",
        icon: "work",
        rows: [
          { k: "学ぶ場所", v: "職場・現場" },
          { k: "学び方", v: "仕事をしながら" },
          { k: "長所", v: "実践的に身につく" },
        ],
      },
      right: {
        title: "Off-JT",
        icon: "school",
        rows: [
          { k: "学ぶ場所", v: "研修・座学" },
          { k: "学び方", v: "業務を離れて" },
          { k: "長所", v: "体系的に学べる" },
        ],
      },
      narration: SEG_P7,
    },
    {
      pattern: "layers",
      heading: "マズローの欲求5段階",
      icon: "stacks",
      layers: [
        { no: 5, name: "自己実現の欲求", note: "成長したい", noteIcon: "trending_up", highlight: true },
        { no: 4, name: "承認の欲求", note: "認められたい" },
        { no: 3, name: "社会的欲求", note: "つながりたい" },
        { no: 2, name: "安全の欲求" },
        { no: 1, name: "生理的欲求", note: "生きるため" },
      ],
      narration: SEG_P8,
    },
    { pattern: "custom", name: "work-style", durationSec: 6, narration: SEG_P9, component: WorkStyleScene },
    { pattern: "custom", name: "telework-grid", durationSec: 5, narration: SEG_P10, component: TeleworkScene },
    {
      pattern: "custom",
      name: "quiz-intro",
      durationSec: 3,
      narration: SEG_QUIZ_INTRO,
      component: QuizIntroScene,
    },
    {
      pattern: "quiz",
      question: "PDCAのCが指すのは？",
      choices: [
        { key: "A", text: "評価（Check）", correct: true },
        { key: "B", text: "計画（Plan）" },
      ],
      narration: SEG_Q1,
      revealAtSec: SEG_Q1[0].durationSec + SEG_Q1[1].durationSec + 1.8,
    },
    {
      pattern: "quiz",
      question: "OJTとOff-JTで正しいのは？",
      choices: [
        { key: "A", text: "OJTは現場・Off-JTは研修", correct: true },
        { key: "B", text: "OJTは研修・Off-JTは現場" },
      ],
      narration: SEG_Q2,
      revealAtSec: SEG_Q2[0].durationSec + SEG_Q2[1].durationSec + 1.8,
    },
    {
      pattern: "quiz",
      question: "BCPの説明で適切なのは？",
      choices: [
        { key: "A", text: "利益を最大にする計画" },
        { key: "B", text: "事業を続け早く復旧する計画", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: SEG_Q3[0].durationSec + SEG_Q3[1].durationSec + 1.8,
    },
    {
      pattern: "custom",
      name: "summary-icons",
      durationSec: 5,
      narration: SEG_P11,
      transitionIn: "wipe",
      component: SummaryScene,
    },
  ],
};
