import { Img, staticFile } from "remotion";
import { colors, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L23-asset-classification.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L23: 情報資産の分類とリスクの種類
 *
 * 発注書 content_works/ipa_sg/orders/L23.md が範囲の正。
 * シナリオは narration/ipa_sg/sg-L23-asset-classification.md。
 *
 * L22 の「管理の四つの柱」からリスクマネジメントの柱に入る回:
 *   導入（何を守るのか）→ 調査（部署ごとの洗い出し・シャドーIT回収）→
 *   重要性による分類（CIAの3観点 → 高中低）→ 情報資産台帳（テーブルのモック）→
 *   wipe-light でリスクの種類の地図（損失の4分類）→ 自社の外からくるリスク2つ →
 *   大きさの見積もりの入口（年間予想損失額・得点法）→ クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 用語の呼称は L2（sg-L2-asset-threat-vuln）に揃える。
 * **リスク値の算定には踏み込まない**（次回 L24 リスクアセスメントが主担当）ので、
 * P8 は見積もりの「呼び名と考え方」までで止める。3特性の最大値をとる規則は L79（科目B）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L23-asset-classification");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回から、情報セキュリティ管理の柱のひとつ、リスクマネジメントを詳しく見ていきます。"),
  N("s02-2.mp3", "その第一歩は、自分たちが何を守るのかを、はっきりさせることです。"),
  N("s02-3.mp3", "守るものが分からなければ、リスクの大きさも測れません。"),
  N("s02-4.mp3", "守るものに値札をつけることが、リスクマネジメントの出発点です。"),
];

const SEG_SURVEY = [
  N("s03-1.mp3", "まず取りかかるのは、情報資産の調査です。"),
  N("s03-2.mp3", "部署ごとに、どんな情報や機器を持っているかを洗い出していきます。"),
  N("s03-3.mp3", "会社が把握していない資産は、守ることも直すこともできません。"),
  // 音声だけ「シャドーアイティー」と仮名書き（TTSの英字読み対策・L2 と同じ扱い）。字幕は表記のまま
  N("s03-4.mp3", "個人のサービスを勝手に使うシャドーITも、ここで洗い出します。"),
];

const SEG_CLASS = [
  N("s04-1.mp3", "洗い出した資産は、重要性によって分類します。"),
  N("s04-2.mp3", "すべてを同じ強さで守ろうとすると、コストが足りなくなります。"),
  N("s04-3.mp3", "見るのは、機密性、完全性、可用性の三つの観点です。"),
  N("s04-4.mp3", "漏れると困る、書き換えられると困る、止まると困る、という見方です。"),
  N("s04-5.mp3", "三つの評価から、高、中、低といった重要度を決めます。"),
  N("s04-6.mp3", "重要度の高いものに、守りの手間とお金を集めます。"),
];

const SEG_LEDGER = [
  N("s05-1.mp3", "洗い出した資産と重要度を、一覧にまとめたものが情報資産台帳です。"),
  N("s05-2.mp3", "資産の名前、管理する責任者、保管場所、そして重要度を記録します。"),
  N("s05-3.mp3", "どこに何があり、どれが重要かが、一目で分かるようになります。"),
  N("s05-4.mp3", "台帳は作って終わりではなく、定期的な棚卸しで最新に保ちます。"),
];

const SEG_KINDS = [
  N("s06-1.mp3", "ここからは、リスクにどんな種類があるかを見ていきます。"),
  N("s06-2.mp3", "代表的なのは、失うものによる四つの分類です。"),
  N("s06-3.mp3", "財産損失は、建物や機器、データそのものを失うことです。"),
  N("s06-4.mp3", "責任損失は、賠償や訴訟など、他者への責任を負うことです。"),
  N("s06-5.mp3", "純収益の喪失は、事業が止まって売上が入らなくなることです。"),
  N("s06-6.mp3", "人的損失は、けがや病気、退職などで人を失うことです。"),
];

const SEG_EXTERNAL = [
  N("s07-1.mp3", "リスクは、自社の中だけから来るわけではありません。"),
  N("s07-2.mp3", "一つ目は、サプライチェーンリスクです。"),
  N("s07-3.mp3", "取引先や委託先が攻撃されて、自社の業務や情報が巻き込まれる危険です。"),
  N("s07-4.mp3", "二つ目は、地政学的リスクです。"),
  N("s07-5.mp3", "紛争や規制など、国際情勢の変化で事業が続けられなくなる危険です。"),
  N("s07-6.mp3", "どちらも、自社だけでは防ぎきれないという共通点があります。"),
];

const SEG_ESTIMATE = [
  N("s08-1.mp3", "最後に、リスクの大きさをどう見積もるかに触れておきます。"),
  N("s08-2.mp3", "一つは、金額で見る年間予想損失額です。"),
  N("s08-3.mp3", "一年間にどれだけの損失が出そうかを、金額で見積もります。"),
  N("s08-4.mp3", "もう一つは、点数で見る得点法です。"),
  N("s08-5.mp3", "金額にしづらいリスクを、点数に置き換えて比べられるようにします。"),
  N("s08-6.mp3", "詳しい進め方は、次回のリスクアセスメントで学びます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s10-1.mp3", "ここで問題です。"),
  N("s10-2.mp3", "情報資産の重要度は、どの観点から決めるでしょうか。"),
  N("s10-3.mp3", "正解は、機密性、完全性、可用性の三つです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s11-1.mp3", "次の問題です。"),
  N("s11-2.mp3", "情報資産台帳をつくる目的は、何でしょうか。"),
  N("s11-3.mp3", "正解は、何が重要かを一覧で把握するためです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s12-1.mp3", "最後の問題です。"),
  N("s12-2.mp3", "賠償や訴訟によって生じる損失は、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、責任損失です。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s13-1.mp3", "情報資産は洗い出し、重要度で分類してから守ります。"),
  N("s13-2.mp3", "台帳に資産名、管理者、保管場所、重要度を記録します。"),
  N("s13-3.mp3", "リスクは財産、責任、純収益、人的の四つで捉えます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

const NoteChip: React.FC<{ icon: string; text: React.ReactNode; atSec: number }> = ({
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
        padding: `${6 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        color: colors.primary800,
        fontSize: 10 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      {text}
    </span>
  );
};

const ClassChip: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      color: colors.primary800,
      backgroundColor: colors.primary100,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      lineHeight: 1.4,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

// ---------------------------------------------------------------------------
// P2: 導入 — 左テキスト + 右イラスト
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const leadAppear = useAppear(segStart(SEG_INTRO, 1));
  const subAppear = useAppear(segStart(SEG_INTRO, 2));
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
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
          <span style={{ ...chipAppear }}>
            <ClassChip text="管理の柱：リスクマネジメント" />
          </span>
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.45,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            <span style={markerStyle}>何を守るのか</span>
            {"\nをはっきりさせる"}
          </span>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.5,
              ...subAppear,
            }}
          >
            守るものが決まらないと、リスクの大きさも測れない
          </span>
          <NoteChip icon="sell" text="守るものに値札をつける" atSec={segStart(SEG_INTRO, 3)} />
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-leader-think.png")}
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
// P3: 情報資産の調査 — 部署ごとの調査シート（行ラベルを先に、持ち物を後から）
// ---------------------------------------------------------------------------

const AssetPill: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => {
  const pill = usePop(atSec);
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${5 * SCALE}px ${12 * SCALE}px`,
        borderRadius: 999,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        fontSize: 10.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        ...pill,
      }}
    >
      <span style={{ color: colors.primary600, display: "flex", flex: "none" }}>
        <Ms name={icon} size={16 * SCALE} />
      </span>
      {label}
    </span>
  );
};

const DeptRow: React.FC<{
  dept: string;
  items: { icon: string; label: string }[];
  atSec: number;
}> = ({ dept, items, atSec }) => {
  const label = useAppear(0.3, { dy: 0 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE }}>
      <span
        style={{
          flex: "none",
          width: 42 * SCALE,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
          lineHeight: 1.2,
          ...label,
        }}
      >
        {dept}
      </span>
      {items.map((x, j) => (
        <AssetPill key={x.label} icon={x.icon} label={x.label} atSec={atSec + j * 0.25} />
      ))}
    </div>
  );
};

const SurveyScene: React.FC = () => {
  const base = segStart(SEG_SURVEY, 1);
  const noteAppear = useAppear(segStart(SEG_SURVEY, 2));
  return (
    <SlideShell
      heading="まず、何があるかを洗い出す"
      icon={<Ms name="search" size={videoType.slideHeadIcon} />}
      narration={SEG_SURVEY}
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
        <DeptRow
          dept="営業部"
          items={[
            { icon: "description", label: "顧客名簿" },
            { icon: "laptop_mac", label: "ノートPC" },
            { icon: "smartphone", label: "業務スマホ" },
          ]}
          atSec={base}
        />
        <DeptRow
          dept="開発部"
          items={[
            { icon: "code", label: "ソースコード" },
            { icon: "storage", label: "開発サーバ" },
            { icon: "article", label: "設計書" },
          ]}
          atSec={base + 0.5}
        />
        <DeptRow
          dept="総務部"
          items={[
            { icon: "description", label: "契約書" },
            { icon: "badge", label: "人事データ" },
            { icon: "devices", label: "複合機" },
          ]}
          atSec={base + 1.0}
        />
        <span
          style={{
            marginTop: 6 * SCALE,
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...noteAppear,
          }}
        >
          <span style={markerStyle}>把握していない資産</span>は守れない
        </span>
        <NoteChip
          icon="visibility"
          text={
            <span>
              <span style={markerPinkStyle}>シャドーIT</span>（届け出のない機器・サービス）
            </span>
          }
          atSec={segStart(SEG_SURVEY, 3)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 重要性による分類 — 3観点カード → 重要度バッジ
// ---------------------------------------------------------------------------

const AspectCard: React.FC<{
  icon: string;
  name: string;
  desc: string;
  atSec: number;
  descAtSec: number;
}> = ({ icon, name, desc, atSec, descAtSec }) => {
  const card = usePop(atSec);
  const descAppear = useAppear(descAtSec, { dy: 8 });
  return (
    <div
      style={{
        width: 112 * SCALE,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        padding: `${6 * SCALE}px ${6 * SCALE}px ${7 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          width: 30 * SCALE,
          height: 30 * SCALE,
          borderRadius: 11 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{name}</b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          textAlign: "center",
          lineHeight: 1.3,
          ...descAppear,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const LevelBadge: React.FC<{ label: string; tone: "hi" | "mid" | "lo"; atSec: number }> = ({
  label,
  tone,
  atSec,
}) => {
  const badge = usePop(atSec);
  const bg =
    tone === "hi" ? colors.primary600 : tone === "mid" ? colors.primary300 : colors.primary100;
  const fg = tone === "hi" ? colors.textPrimaryDark : colors.primary800;
  return (
    <span
      style={{
        minWidth: 26 * SCALE,
        padding: `${3 * SCALE}px ${10 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: bg,
        color: fg,
        fontSize: 13 * SCALE,
        fontWeight: 800,
        textAlign: "center",
        lineHeight: 1.25,
        ...badge,
      }}
    >
      {label}
    </span>
  );
};

const ClassifyScene: React.FC = () => {
  const premiseAppear = useAppear(segStart(SEG_CLASS, 1));
  const cardBase = segStart(SEG_CLASS, 2);
  const descBase = segStart(SEG_CLASS, 3);
  const levelBase = segStart(SEG_CLASS, 4);
  const arrowAppear = useAppear(levelBase - 0.3, { dy: 0 });
  return (
    <SlideShell
      heading="重要性によって分類する"
      icon={<Ms name="category" size={videoType.slideHeadIcon} />}
      narration={SEG_CLASS}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        <span
          style={{
            fontSize: 11 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
            ...premiseAppear,
          }}
        >
          すべてを同じ強さで守るとコストが足りない
        </span>
        <div style={{ display: "flex", gap: 9 * SCALE }}>
          <AspectCard
            icon="lock"
            name="機密性"
            desc="漏れると困る"
            atSec={cardBase}
            descAtSec={descBase}
          />
          <AspectCard
            icon="fact_check"
            name="完全性"
            desc="書き換えられると困る"
            atSec={cardBase + 0.3}
            descAtSec={descBase + 1.6}
          />
          <AspectCard
            icon="autorenew"
            name="可用性"
            desc="止まると困る"
            atSec={cardBase + 0.6}
            descAtSec={descBase + 3.2}
          />
        </div>
        <span
          style={{
            fontSize: 12 * SCALE,
            fontWeight: 800,
            color: colors.primary300,
            lineHeight: 1,
            ...arrowAppear,
          }}
        >
          ↓
        </span>
        {/* 重要度バッジと結論のチップは1行にまとめる（縦に積むと本文が字幕帯に潜り込む） */}
        <span style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.2,
              ...arrowAppear,
            }}
          >
            重要度
          </span>
          <LevelBadge label="高" tone="hi" atSec={levelBase} />
          <LevelBadge label="中" tone="mid" atSec={levelBase + 0.25} />
          <LevelBadge label="低" tone="lo" atSec={levelBase + 0.5} />
          <span style={{ marginLeft: 8 * SCALE }}>
            <NoteChip
              icon="savings"
              text="高いものに手間とお金を集める"
              atSec={segStart(SEG_CLASS, 5)}
            />
          </span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 情報資産台帳 — テーブルのモック（見出し行を先に、データ行を語りに合わせて）
// ---------------------------------------------------------------------------

const LEDGER_COLS: { label: string; flex: number }[] = [
  { label: "資産名", flex: 1.5 },
  { label: "管理責任者", flex: 1.1 },
  { label: "保管場所", flex: 1.3 },
  { label: "重要度", flex: 0.7 },
];

const LedgerRow: React.FC<{ cells: string[]; level: "hi" | "mid"; atSec: number }> = ({
  cells,
  level,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: colors.surface,
        borderTop: `${1 * SCALE}px solid ${colors.border}`,
        ...row,
      }}
    >
      {cells.map((c, i) => (
        <span
          key={LEDGER_COLS[i].label}
          style={{
            flex: LEDGER_COLS[i].flex,
            minWidth: 0,
            // 行の padding / lineHeight を詰めないと3行目が字幕帯に潜り込む
            padding: `${6 * SCALE}px ${12 * SCALE}px`,
            fontSize: 11 * SCALE,
            fontWeight: 700,
            lineHeight: 1.15,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {i === 3 ? (
            <span
              style={{
                display: "inline-block",
                padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
                borderRadius: 8 * SCALE,
                lineHeight: 1.1,
                backgroundColor: level === "hi" ? colors.primary600 : colors.primary100,
                color: level === "hi" ? colors.textPrimaryDark : colors.primary800,
                fontWeight: 800,
              }}
            >
              {c}
            </span>
          ) : (
            c
          )}
        </span>
      ))}
    </div>
  );
};

const LedgerScene: React.FC = () => {
  const headAppear = useAppear(0.3, { dy: 0 });
  const base = segStart(SEG_LEDGER, 1);
  return (
    <SlideShell
      heading="情報資産台帳にまとめる"
      icon={<Ms name="table_chart" size={videoType.slideHeadIcon} />}
      narration={SEG_LEDGER}
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
        <div
          style={{
            borderRadius: 12 * SCALE,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              backgroundColor: colors.primary50,
              ...headAppear,
            }}
          >
            {LEDGER_COLS.map((c) => (
              <span
                key={c.label}
                style={{
                  flex: c.flex,
                  minWidth: 0,
                  padding: `${6 * SCALE}px ${12 * SCALE}px`,
                  fontSize: 10.5 * SCALE,
                  fontWeight: 800,
                  color: colors.primary800,
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                }}
              >
                {c.label}
              </span>
            ))}
          </div>
          <LedgerRow
            cells={["顧客名簿", "営業部長", "社内サーバ", "高"]}
            level="hi"
            atSec={base}
          />
          <LedgerRow
            cells={["設計書一式", "開発部長", "共有フォルダ", "中"]}
            level="mid"
            atSec={base + 1.0}
          />
          <LedgerRow
            cells={["採用応募データ", "総務部長", "人事システム", "高"]}
            level="hi"
            atSec={base + 2.0}
          />
        </div>
        <div style={{ display: "flex", gap: 9 * SCALE }}>
          <NoteChip
            icon="visibility"
            text="どこに何があり、どれが重要かが一目で分かる"
            atSec={segStart(SEG_LEDGER, 2)}
          />
          <NoteChip
            icon="autorenew"
            text="定期的な棚卸しで最新に保つ"
            atSec={segStart(SEG_LEDGER, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: リスクの種類の地図 — 損失の4分類（2×2・用語を先に、説明を語りに合わせて）
// ---------------------------------------------------------------------------

const LossCard: React.FC<{
  icon: string;
  name: string;
  desc: string;
  atSec: number;
  descAtSec: number;
}> = ({ icon, name, desc, atSec, descAtSec }) => {
  const card = usePop(atSec);
  const descAppear = useAppear(descAtSec, { dy: 8 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 11 * SCALE,
        padding: `${10 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...card,
      }}
    >
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
      <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 * SCALE }}>
        <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
          <span style={markerStyle}>{name}</span>
        </b>
        {/* 1行に収まる長さで書く（折り返すと4枚のカードで高さが揺れる） */}
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...descAppear,
          }}
        >
          {desc}
        </span>
      </span>
    </div>
  );
};

const KindsScene: React.FC = () => {
  const base = segStart(SEG_KINDS, 1);
  return (
    <SlideShell
      heading="失うのは、物だけではない"
      icon={<Ms name="warning" size={videoType.slideHeadIcon} />}
      narration={SEG_KINDS}
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
        <div style={{ display: "flex", gap: 11 * SCALE }}>
          <LossCard
            icon="inventory_2"
            name="財産損失"
            desc="建物・機器・データを失う"
            atSec={base}
            descAtSec={segStart(SEG_KINDS, 2)}
          />
          <LossCard
            icon="gavel"
            name="責任損失"
            desc="賠償や訴訟の責任を負う"
            atSec={base + 0.25}
            descAtSec={segStart(SEG_KINDS, 3)}
          />
        </div>
        <div style={{ display: "flex", gap: 11 * SCALE }}>
          <LossCard
            icon="trending_down"
            name="純収益の喪失"
            desc="事業が止まり売上が入らない"
            atSec={base + 0.5}
            descAtSec={segStart(SEG_KINDS, 4)}
          />
          <LossCard
            icon="group"
            name="人的損失"
            desc="けが・病気・退職で人を失う"
            atSec={base + 0.75}
            descAtSec={segStart(SEG_KINDS, 5)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 自社の外からくるリスク — 中央に自社、左右にキーワード（囲みなし）
// ---------------------------------------------------------------------------

const ExternalTerm: React.FC<{
  chip: string;
  term: string;
  desc: string;
  align: "right" | "left";
  atSec: number;
  descAtSec: number;
}> = ({ chip, term, desc, align, atSec, descAtSec }) => {
  const head = useAppear(atSec);
  const descAppear = useAppear(descAtSec, { dy: 10 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: align === "right" ? "flex-end" : "flex-start",
        textAlign: align,
        gap: 5 * SCALE,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: align === "right" ? "flex-end" : "flex-start",
          gap: 5 * SCALE,
          ...head,
        }}
      >
        <ClassChip text={chip} />
        <b
          style={{
            fontSize: 19 * SCALE,
            fontWeight: 800,
            lineHeight: 1.25,
            whiteSpace: "pre-line",
          }}
        >
          <span style={markerStyle}>{term}</span>
        </b>
      </div>
      <span
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.4,
          ...descAppear,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const ExternalScene: React.FC = () => {
  const selfAppear = usePop(0.3);
  const footAppear = useAppear(segStart(SEG_EXTERNAL, 5));
  return (
    <SlideShell
      heading="自社の外からくるリスク"
      icon={<Ms name="public" size={videoType.slideHeadIcon} />}
      narration={SEG_EXTERNAL}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
          <ExternalTerm
            chip="取引先・委託先から"
            term={"サプライチェーン\nリスク"}
            desc="取引先が攻撃され、自社の業務や情報が巻き込まれる"
            align="right"
            atSec={segStart(SEG_EXTERNAL, 1)}
            descAtSec={segStart(SEG_EXTERNAL, 2)}
          />
          <div
            style={{
              flex: "none",
              width: 46 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              ...selfAppear,
            }}
          >
            <span
              style={{
                width: 40 * SCALE,
                height: 40 * SCALE,
                borderRadius: 14 * SCALE,
                backgroundColor: colors.primary600,
                color: colors.textPrimaryDark,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ms name="apartment" size={24 * SCALE} />
            </span>
            <b style={{ fontSize: 11 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>自社</b>
          </div>
          <ExternalTerm
            chip="国際情勢から"
            term="地政学的リスク"
            desc="紛争や規制で、事業そのものが続けられなくなる"
            align="left"
            atSec={segStart(SEG_EXTERNAL, 3)}
            descAtSec={segStart(SEG_EXTERNAL, 4)}
          />
        </div>
        <span
          style={{
            alignSelf: "center",
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...footAppear,
          }}
        >
          自社だけでは<span style={markerPinkStyle}>防ぎきれない</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 大きさの見積もり方 — 横長2行リスト + 右イラスト（詳細は次回 L24）
// ---------------------------------------------------------------------------

const EstimateRow: React.FC<{
  icon: string;
  chip: string;
  term: string;
  desc: string;
  atSec: number;
  descAtSec: number;
}> = ({ icon, chip, term, desc, atSec, descAtSec }) => {
  const row = useAppear(atSec);
  const descAppear = useAppear(descAtSec, { dy: 8 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 * SCALE, ...row }}>
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
      <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3 * SCALE }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
          <ClassChip text={chip} />
          <b style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
            <span style={markerStyle}>{term}</span>
          </b>
        </span>
        <span
          style={{
            fontSize: 10.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.35,
            ...descAppear,
          }}
        >
          {desc}
        </span>
      </span>
    </div>
  );
};

const EstimateScene: React.FC = () => {
  const illustAppear = useAppear(0.4);
  return (
    <SlideShell
      heading="大きさをどう見積もるか"
      icon={<Ms name="calculate" size={videoType.slideHeadIcon} />}
      narration={SEG_ESTIMATE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          gap: "4%",
        }}
      >
        <div
          style={{
            flex: 1.5,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 13 * SCALE,
          }}
        >
          <EstimateRow
            icon="payments"
            chip="金額で見る"
            term="年間予想損失額"
            desc="一年間に出そうな損失額を見積もる"
            atSec={segStart(SEG_ESTIMATE, 1)}
            descAtSec={segStart(SEG_ESTIMATE, 2)}
          />
          <EstimateRow
            icon="numbers"
            chip="点数で見る"
            term="得点法"
            desc="金額にしづらいものを点数で比べる"
            atSec={segStart(SEG_ESTIMATE, 3)}
            descAtSec={segStart(SEG_ESTIMATE, 4)}
          />
          <NoteChip
            icon="menu_book"
            text="進め方は次回のリスクアセスメントで"
            atSec={segStart(SEG_ESTIMATE, 5)}
          />
        </div>
        <Img
          src={staticFile("images/ipa_sg/prop-thermometer.png")}
          style={{
            flex: 1,
            minWidth: 0,
            maxHeight: "100%",
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
// クイズ幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL23AssetClassification: VideoSpec = {
  id: "sg-L23-asset-classification",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "情報資産の分類と\nリスクの種類",
      keywords: ["情報資産台帳", "損失の4分類", "得点法"],
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
      name: "survey",
      durationSec: 6,
      narration: SEG_SURVEY,
      component: SurveyScene,
    },
    {
      pattern: "custom",
      name: "classify",
      durationSec: 7,
      narration: SEG_CLASS,
      component: ClassifyScene,
    },
    {
      pattern: "custom",
      name: "ledger",
      durationSec: 6,
      narration: SEG_LEDGER,
      component: LedgerScene,
    },
    {
      pattern: "custom",
      name: "loss-kinds",
      durationSec: 7,
      narration: SEG_KINDS,
      transitionIn: "wipe-light",
      component: KindsScene,
    },
    {
      pattern: "custom",
      name: "external-risks",
      durationSec: 7,
      narration: SEG_EXTERNAL,
      component: ExternalScene,
    },
    {
      pattern: "custom",
      name: "estimate",
      durationSec: 7,
      narration: SEG_ESTIMATE,
      component: EstimateScene,
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
      question: "重要度を決める観点は？",
      choices: [
        { key: "A", text: "機密性・完全性・可用性", correct: true },
        { key: "B", text: "資産名・管理者・保管場所" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "情報資産台帳をつくる目的は？",
      choices: [
        { key: "A", text: "不要な機器を処分する" },
        { key: "B", text: "何が重要かを一覧で把握する", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "賠償や訴訟による損失は？",
      choices: [
        { key: "A", text: "責任損失", correct: true },
        { key: "B", text: "純収益の喪失" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "資産は洗い出し、重要度で分類してから守ります。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          // 画面は1行に収める（23文字が上限。超えると3行分が字幕帯に重なる）
          text: "台帳に資産名・管理者・重要度を記録します。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "リスクは財産、責任、純収益、人的の四つで捉えます。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
