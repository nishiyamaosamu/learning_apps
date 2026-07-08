import { Img, staticFile } from "remotion";
import { colors, videoType, markerStyle, markerPinkStyle, SCALE } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { Ms } from "../../parts/Ms";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./ip-L1v9-corporate-activity.audio.json";

/**
 * ITパスポート講座 L1: 企業活動と経営資源（v6 / create-learning-video スキル現行手順版）
 *
 * content_works/ipa_ip/LESSON_PLAN.md の L1 表（P1〜P13）を、全15シーンに対応させる。
 * 参考実装 L1v5-corporate-activity.tsx は旧仕様だったため、以下をこのバージョンで修正した:
 *   - title にナレーションを付けない（オープニングジングルと声が重なるのを防ぐ）。
 *     導入の挨拶は P1（s02）の先頭文に移した
 *   - クイズの前に幕間ページ（s11）を追加
 *   - 構成順を「本編 → クイズ幕間 → クイズ3問 → まとめ」に変更（まとめを最終シーンへ）
 *   - クイズの正解発表に gapBeforeSec で考える間を作る
 *   - P9（環境への責任）はグリーンIT・カーボンフットプリントをそれぞれ一言で定義する
 *
 * P1・P2・P8 は L1v4/L1v5 から手描きイラストを流用（同じ概念には同じ絵を使い回す）。
 */

const N = narrationLoader(durations, "audio/ipa_ip/ip-L1v9-corporate-activity");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P1 = [
  N("s02-1.mp3", "今回は、企業活動と経営資源について学びます。"),
  N("s02-2.mp3", "企業は、製品やサービスを社会に提供するために活動しています。"),
  N("s02-3.mp3", "その活動を続けて成長するために欠かせないのが、利益です。"),
  N("s02-4.mp3", "つまり利益は、目的ではなく活動を続けるための条件なのです。"),
];

const SEG_P2 = [
  N("s03-1.mp3", "企業活動を支える資源を、経営資源と呼びます。"),
  N("s03-2.mp3", "経営資源には、ヒト、モノ、カネ、情報の四つがあります。"),
  N("s03-3.mp3", "この四つをどう配分するかが、経営の腕の見せどころです。"),
  N("s03-4.mp3", "中でも情報は、目に見えない資源として近年重視されています。"),
];

const SEG_P3 = [
  N("s04-1.mp3", "情報という資源には、独特の特徴があります。"),
  N("s04-2.mp3", "複製しやすく、多くの人と共有できます。"),
  N("s04-3.mp3", "その一方で、時間がたつと価値が古くなっていきます。"),
  N("s04-4.mp3", "この性質を理解して、上手に活用することが大切です。"),
];

const SEG_P4 = [
  N("s05-1.mp3", "企業には、活動の土台となる企業理念があります。"),
  N("s05-2.mp3", "ミッション、ビジョン、バリューを合わせてMVVと呼びます。"),
  N("s05-3.mp3", "使命、目指す姿、大切にする価値観の三つを表す言葉です。"),
  N("s05-4.mp3", "近年は、社会的な存在意義を示すパーパス経営も注目されています。"),
];

const SEG_P5 = [
  N("s06-1.mp3", "企業は、株主総会や決算を通じて経営状況を説明します。"),
  N("s06-2.mp3", "これを情報開示、ディスクロージャーと呼びます。"),
  N("s06-3.mp3", "誰に対して説明責任を果たすかを意識することが重要です。"),
  N("s06-4.mp3", "この情報は、投資家が判断材料として使う大切なものです。"),
];

const SEG_P6 = [
  N("s07-1.mp3", "経営が正しく行われているかは、監査によって確かめられます。"),
  N("s07-2.mp3", "こうした透明性を保つ仕組みを、コーポレートガバナンスと呼びます。"),
  N("s07-3.mp3", "株主をはじめ、社会からの信頼につながります。"),
  N("s07-4.mp3", "外部の監査法人が、客観的な立場でチェックを行います。"),
];

const SEG_P7 = [
  N("s08-1.mp3", "企業は、法令を守って活動する必要があります。"),
  N("s08-2.mp3", "これをコンプライアンス、法令遵守と呼びます。"),
  N("s08-3.mp3", "企業倫理を意識した行動も、あわせて求められます。"),
  N("s08-4.mp3", "違反が起きると、社会からの信頼を大きく失うことになります。"),
];

const SEG_P8 = [
  N("s09-1.mp3", "企業は、株主や従業員、顧客、地域社会など多くの人と関わっています。"),
  N("s09-2.mp3", "これらをステークホルダーと呼び、企業はその期待に応えます。"),
  N("s09-3.mp3", "社会的責任を果たす姿勢をCSR、社会性を重視した投資をSRIと呼びます。"),
  N("s09-4.mp3", "こうした信頼の積み重ねが、コーポレートブランドを築きます。"),
];

const SEG_P9 = [
  N("s10-1.mp3", "企業には、環境に配慮した活動も求められます。"),
  N("s10-2.mp3", "SDGsは、持続可能な開発目標を示す国際的な指標です。"),
  N("s10-3.mp3", "グリーンITは、ITを活用して環境負荷を減らす取り組みです。"),
  N("s10-4.mp3", "カーボンフットプリントは、活動で排出したCO2の総量を表します。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "企業活動を支える経営資源の組み合わせとして、正しいのはどちらでしょうか。"),
  N("s12-3.mp3", "正解は、ヒト・モノ・カネ・情報です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "CSRの説明として、最も適切なのはどちらでしょうか。"),
  N("s13-3.mp3", "正解は、社会にも責任を果たす姿勢です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "ディスクロージャーの説明として、適切なのはどちらでしょうか。"),
  N("s14-3.mp3", "正解は、経営状況を株主や社会に公開することです。", { gapBeforeSec: 1.8 }),
];

const SEG_P10 = [
  N("s15-1.mp3", "企業は、経営資源を活かしながら活動しています。"),
  N("s15-2.mp3", "そして、企業理念のもとで社会的な責任を果たしていきます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P1: 企業活動の目的（中央ヒーローイラスト + 一文）
// ---------------------------------------------------------------------------

const PurposeScene: React.FC = () => {
  const line1 = useAppear(0.2);
  const illustAppear = useAppear(0.6);

  return (
    <SlideShell narration={SEG_P1}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4 * SCALE,
        }}
      >
        <span
          style={{
            fontSize: 15.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.4,
            textAlign: "center",
            ...line1,
          }}
        >
          企業は<span style={markerStyle}>価値を提供</span>し、利益を得て
          <span style={markerPinkStyle}>成長</span>する
        </span>
        <Img
          src={staticFile("images/ipa_ip/scene-shop-handoff.png")}
          style={{
            flex: 1,
            minHeight: 0,
            width: "100%",
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
// P3: 情報という資源の特徴（左アイコン + 右3行の属性リスト）
// ---------------------------------------------------------------------------

const InfoAttr: React.FC<{ icon: string; text: string; delaySec: number }> = ({ icon, text, delaySec }) => {
  const pop = usePop(delaySec);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE, ...pop }}>
      <span
        style={{
          width: 22 * SCALE,
          height: 22 * SCALE,
          borderRadius: 8 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={13 * SCALE} />
      </span>
      <b style={{ fontSize: 13.5 * SCALE }}>{text}</b>
    </div>
  );
};

const InfoResourceScene: React.FC = () => (
  <SlideShell
    heading="情報という資源の特徴"
    icon={<Ms name="info" size={videoType.slideHeadIcon} />}
    narration={SEG_P3}
  >
    <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "6%" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5 * SCALE,
          ...usePop(0.2),
        }}
      >
        <span
          style={{
            width: 62 * SCALE,
            height: 62 * SCALE,
            borderRadius: 22 * SCALE,
            backgroundColor: colors.primary100,
            color: colors.primary600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ms name="info" size={34 * SCALE} />
        </span>
        <b style={{ fontSize: 16 * SCALE }}>情報</b>
      </div>
      <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
        <InfoAttr icon="autorenew" text="複製できる" delaySec={0.6} />
        <InfoAttr icon="public" text="共有できる" delaySec={1.4} />
        <InfoAttr icon="schedule" text="陳腐化する" delaySec={2.3} />
      </div>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P4: 企業理念とMVV（積み上げピラミッド）
// ---------------------------------------------------------------------------

const PYRAMID_LAYERS = [
  { id: "value", label: "バリュー", icon: "star", width: "100%", bg: colors.primary50, fg: colors.primary800, delay: 0.4 },
  { id: "vision", label: "ビジョン", icon: "visibility", width: "72%", bg: colors.primary300, fg: colors.surface, delay: 1.1 },
  { id: "mission", label: "ミッション", icon: "flag", width: "46%", bg: colors.primary600, fg: colors.surface, delay: 1.8 },
] as const;

const PyramidLayer: React.FC<(typeof PYRAMID_LAYERS)[number]> = ({ label, icon, width, bg, fg, delay }) => {
  const appear = useAppear(delay, { dy: 16 });
  return (
    <div
      style={{
        width,
        alignSelf: "center",
        backgroundColor: bg,
        color: fg,
        borderRadius: 9 * SCALE,
        padding: `${6 * SCALE}px 0`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7 * SCALE,
        ...appear,
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      <b style={{ fontSize: 13.5 * SCALE }}>{label}</b>
    </div>
  );
};

const MvvPyramidScene: React.FC = () => (
  <SlideShell
    heading="企業理念とMVV"
    icon={<Ms name="flag" size={videoType.slideHeadIcon} />}
    narration={SEG_P4}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 6 * SCALE,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column-reverse", gap: 6 * SCALE }}>
        {PYRAMID_LAYERS.map((l) => (
          <PyramidLayer key={l.id} {...l} />
        ))}
      </div>
      <span
        style={{
          textAlign: "center",
          fontSize: 11.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          ...useAppear(2.6),
        }}
      >
        パーパス経営は、この土台のうえに社会的な存在意義を重ねます
      </span>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P6: 監査とコーポレートガバナンス（企業 → 株主の情報の流れ + 監査）
// ---------------------------------------------------------------------------

const GovernanceScene: React.FC = () => {
  const leftPop = usePop(0.1);
  const rightPop = usePop(1.0);
  const lineProgress = useProgress(0.4, 0.6);
  const docOpacity = useProgress(0.5, 0.3);
  const docProgress = useProgress(0.5, 0.7);
  const auditPop = usePop(1.5);
  const captionAppear = useAppear(2.4);

  return (
    <SlideShell
      heading="監査とコーポレートガバナンス"
      icon={<Ms name="balance" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 * SCALE }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              flex: "none",
              ...leftPop,
            }}
          >
            <span
              style={{
                width: 34 * SCALE,
                height: 34 * SCALE,
                borderRadius: 12 * SCALE,
                backgroundColor: colors.primary600,
                color: colors.surface,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ms name="corporate_fare" size={18 * SCALE} />
            </span>
            <b style={{ fontSize: 11 * SCALE }}>企業</b>
          </div>

          <div style={{ position: "relative", flex: 1, height: 3 * SCALE, backgroundColor: colors.border, margin: "0 3%" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${lineProgress * 100}%`,
                backgroundColor: colors.primary500,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: `${docProgress * 90}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                opacity: docOpacity,
                width: 22 * SCALE,
                height: 22 * SCALE,
                borderRadius: 8 * SCALE,
                backgroundColor: colors.surface,
                border: `${1 * SCALE}px solid ${colors.primary300}`,
                color: colors.primary600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ms name="description" size={13 * SCALE} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              flex: "none",
              ...rightPop,
            }}
          >
            <span
              style={{
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
              <Ms name="account_balance" size={18 * SCALE} />
            </span>
            <b style={{ fontSize: 11 * SCALE }}>株主</b>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 * SCALE, ...auditPop }}>
          <span
            style={{
              width: 24 * SCALE,
              height: 24 * SCALE,
              borderRadius: 9 * SCALE,
              backgroundColor: colors.primary50,
              color: colors.primary600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ms name="fact_check" size={14 * SCALE} />
          </span>
          <b style={{ fontSize: 12.5 * SCALE }}>監査で透明性を確認</b>
        </div>

        <span
          style={{
            textAlign: "center",
            fontSize: 11.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            ...captionAppear,
          }}
        >
          こうした仕組み全体をコーポレートガバナンスと呼びます
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: コンプライアンス（用語ドン風の一語アイコン・密なP6の後の一息）
// ---------------------------------------------------------------------------

const ComplianceStampScene: React.FC = () => {
  const iconPop = usePop(0.2);
  const termAppear = useAppear(0.6);
  const underline = useProgress(1.0, 0.5);
  const subAppear = useAppear(1.6);

  return (
    <SlideShell narration={SEG_P7}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6 * SCALE,
        }}
      >
        <span
          style={{
            width: 52 * SCALE,
            height: 52 * SCALE,
            borderRadius: "50%",
            backgroundColor: colors.primary600,
            color: colors.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...iconPop,
          }}
        >
          <Ms name="gavel" size={26 * SCALE} />
        </span>
        <b style={{ fontSize: 24 * SCALE, letterSpacing: "0.02em", ...termAppear }}>コンプライアンス</b>
        <div style={{ position: "relative", width: 42 * SCALE, height: 3 * SCALE, backgroundColor: colors.border }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${underline * 100}%`,
              backgroundColor: colors.primary500,
            }}
          />
        </div>
        <span style={{ fontSize: 12 * SCALE, fontWeight: 700, color: colors.textSecondary, ...subAppear }}>
          法令遵守と企業倫理
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 環境への責任（アイコン縦列。SDGs・グリーンIT・カーボンフットプリントの
// 各アイコンは、対応するナレーション文の開始秒に合わせて出す）
// ---------------------------------------------------------------------------

const EnvRow: React.FC<{ icon: string; text: string; delaySec: number }> = ({ icon, text, delaySec }) => {
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

// s10-1(導入) の後に SDGs → グリーンIT → カーボンフットプリントの順で読み上げるので、
// 各アイコンの出現もその文の開始秒（累積秒 + 少し）に合わせる
const ENV_SDGS_DELAY = SEG_P9[0].durationSec + 0.15;
const ENV_GREEN_IT_DELAY = SEG_P9[0].durationSec + SEG_P9[1].durationSec + 0.15;
const ENV_CARBON_DELAY = SEG_P9[0].durationSec + SEG_P9[1].durationSec + SEG_P9[2].durationSec + 0.15;

const EnvironmentScene: React.FC = () => (
  <SlideShell
    heading="環境への責任"
    icon={<Ms name="eco" size={videoType.slideHeadIcon} />}
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
      <EnvRow icon="public" text="SDGs（持続可能な開発目標）" delaySec={ENV_SDGS_DELAY} />
      <EnvRow icon="energy_savings_leaf" text="グリーンIT" delaySec={ENV_GREEN_IT_DELAY} />
      <EnvRow icon="monitoring" text="カーボンフットプリント" delaySec={ENV_CARBON_DELAY} />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// クイズ幕間（ダーク幕間・SlideShellを使わない唯一の例外）
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const L1v9CorporateActivity: VideoSpec = {
  id: "ip-L1v9-corporate-activity",
  scenes: [
    {
      pattern: "title",
      series: "ITパスポート講座",
      title: "企業は何のために\n活動するのか",
      keywords: ["経営資源", "MVV", "CSR"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    { pattern: "custom", name: "purpose-illust", durationSec: 6, narration: SEG_P1, component: PurposeScene },
    {
      pattern: "bullets",
      heading: "経営資源とは",
      icon: "diversity_3",
      bullets: [
        { text: "ヒト・モノ・カネ・情報", sub: "企業活動を支える経営資源", marker: "blue" },
        { text: "足りなければ管理・補充する", sub: "限られた資源を有効に活かす" },
      ],
      illust: "images/ipa_ip/scene-resources-gather.png",
      narration: SEG_P2,
    },
    { pattern: "custom", name: "info-split", durationSec: 5.5, narration: SEG_P3, component: InfoResourceScene },
    { pattern: "custom", name: "mvv-pyramid", durationSec: 6.5, narration: SEG_P4, component: MvvPyramidScene },
    {
      pattern: "bullets",
      heading: "情報開示（ディスクロージャー）",
      icon: "description",
      bullets: [
        { text: "株主総会", sub: "年に一度、経営を報告する場", marker: "blue" },
        { text: "決算の公表", sub: "経営状況を社会に説明する" },
      ],
      narration: SEG_P5,
    },
    { pattern: "custom", name: "governance-flow", durationSec: 6.5, narration: SEG_P6, component: GovernanceScene },
    { pattern: "custom", name: "compliance-stamp", durationSec: 5, narration: SEG_P7, component: ComplianceStampScene },
    {
      pattern: "bullets",
      heading: "社会的責任とステークホルダー",
      icon: "volunteer_activism",
      bullets: [
        { text: "ステークホルダー", sub: "株主・従業員・顧客・地域社会", marker: "blue" },
        { text: "CSR・SRI", sub: "社会的責任と、それを重視した投資" },
        { text: "コーポレートブランド", sub: "信頼の積み重ねが企業価値になる" },
      ],
      illust: "images/ipa_ip/scene-company-community.png",
      narration: SEG_P8,
    },
    { pattern: "custom", name: "environment", durationSec: 5.5, narration: SEG_P9, component: EnvironmentScene },
    {
      pattern: "custom",
      name: "quiz-intro",
      durationSec: 3,
      narration: SEG_QUIZ_INTRO,
      component: QuizIntroScene,
    },
    {
      pattern: "quiz",
      question: "経営資源の組み合わせとして正しいのは？",
      choices: [
        { key: "A", text: "ヒト・モノ・カネ・情報", correct: true },
        { key: "B", text: "ヒト・モノ・カネ・技術" },
      ],
      narration: SEG_Q1,
      revealAtSec: SEG_Q1[0].durationSec + SEG_Q1[1].durationSec + 1.8,
    },
    {
      pattern: "quiz",
      question: "CSRの説明として最も適切なのは？",
      choices: [
        { key: "A", text: "利益だけを追求する姿勢" },
        { key: "B", text: "社会にも責任を果たす姿勢", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: SEG_Q2[0].durationSec + SEG_Q2[1].durationSec + 1.8,
    },
    {
      pattern: "quiz",
      question: "ディスクロージャーとして適切なのは？",
      choices: [
        { key: "A", text: "経営状況を公開すること", correct: true },
        { key: "B", text: "経営情報を秘密にすること" },
      ],
      narration: SEG_Q3,
      revealAtSec: SEG_Q3[0].durationSec + SEG_Q3[1].durationSec + 1.8,
    },
    {
      pattern: "summary",
      points: [
        { text: "企業は、経営資源を活かしながら活動しています。", checkAtSec: segStart(SEG_P10, 0) },
        {
          text: "そして、企業理念のもとで社会的な責任を果たしていきます。",
          checkAtSec: segStart(SEG_P10, 1),
        },
      ],
      narration: SEG_P10,
      transitionIn: "wipe",
    },
  ],
};
