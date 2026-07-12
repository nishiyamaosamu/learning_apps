import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { CASE_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L79-asset-register.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L79: 情報資産の特定と台帳づくり
 *
 * content_works/ipa_sg/LESSON_PLAN.md 第9章 L79 に対応（科目B実践・技能1-1／1-2／1-3）。
 * シナリオは narration/ipa_sg/sg-L79-asset-register.md。
 *
 * 「守る対象を洗い出す」工程を扱う（リスクアセスメントL80の前提）。
 * 科目B（ケース問題）レッスンなので、確認パートは知識の一問一答ではなく
 * 「A社のケースを提示 → その状況で判断させる」構成にしている:
 * 導入(bullets+illust) → 情報資産とは(custom アイコン4連) → 3特性(custom 3カード) →
 * 重要度＝最大値(custom 評価→最大) → 責任者と許容範囲(bullets) →
 * 台帳に記録する4項目(custom 2×2, wipe-light) → ケース幕間 →
 * ケース提示(custom 資産カード＝図表) → ケース問題3問(quiz。図表を参照して判断) → まとめ(wipe)。
 * イラストは P2 person-leader-think.png の1枚。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L79-asset-register");

// ---------------------------------------------------------------------------
// セグメント定義
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "今回は、守るべき情報資産を洗い出して、台帳にまとめる方法を学びます。"),
  N("s02-2.mp3", "セキュリティ対策の第一歩は、何を守るのかを、はっきりさせることです。"),
  N("s02-3.mp3", "存在に気づいていない情報は、守りようがありません。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "まず、情報資産とは何かを整理しましょう。"),
  N("s03-2.mp3", "情報資産は、電子データだけを指すのではありません。"),
  N("s03-3.mp3", "顧客データや書類はもちろん、パソコンやサーバー、建物や人材まで含みます。"),
  N("s03-4.mp3", "業務で使う、守る価値のあるものすべてが、情報資産です。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "次に、情報資産の価値を、三つの特性から測ります。"),
  N("s04-2.mp3", "一つ目は機密性。許された人だけが見られる状態を保つことです。"),
  N("s04-3.mp3", "二つ目は完全性。情報が正確で、勝手に書き換えられていないことです。"),
  N("s04-4.mp3", "三つ目は可用性。必要なときに、いつでも使える状態のことです。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "この三つを評価したら、最も高い値を、その資産の重要度とします。"),
  N("s05-2.mp3", "たとえば顧客名簿は、漏れると影響が大きく、機密性が高くなります。"),
  N("s05-3.mp3", "三つのうち最大の値が、そのまま重要度になります。"),
  N("s05-4.mp3", "一つでも重大なら、資産全体を重要として扱う、という考え方です。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "洗い出した資産には、必ず管理責任者を決めます。"),
  N("s06-2.mp3", "その資産を守る責任を持ち、扱い方のルールを決める人です。"),
  N("s06-3.mp3", "あわせて、誰がどこまで使ってよいかという、利用の許容範囲も定めます。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "これらの情報を一覧にまとめたものが、情報資産台帳です。"),
  N("s07-2.mp3", "資産の名前、管理責任者、三特性の評価、そして重要度を記録します。"),
  N("s07-3.mp3", "台帳があれば、どこに何があり、どれが重要かが、一目でわかります。"),
  N("s07-4.mp3", "定期的に棚卸しをして、台帳を最新に保つことが大切です。"),
];

const SEG_CASE_INTRO = CASE_INTRO_SEG;

// P9: ケース提示（A社 営業部の資産＝以降の問題が参照する「本文・図表」）
const SEG_CASE = [
  N("s09-1.mp3", "A社の営業部で、情報資産台帳を作ることになりました。"),
  N("s09-2.mp3", "扱う資産は、顧客名簿と受注データの二つです。"),
  N("s09-3.mp3", "顧客名簿は漏れると影響が大きく、受注データは止まると業務が滞ります。"),
];

// P10: ケース問題1 — 最大値ルールを顧客名簿に適用
const SEG_Q1 = [
  N("s10-1.mp3", "まず一問目です。"),
  N("s10-2.mp3", "顧客名簿の評価は、機密性3、完全性2、可用性2でした。重要度はいくつでしょうか。"),
  N("s10-3.mp3", "正解は、最も高い値をとって、3です。", { gapBeforeSec: 1.8 }),
];

// P11: ケース問題2 — 「止まると困る」→ 可用性、の対応づけ
const SEG_Q2 = [
  N("s11-1.mp3", "二問目です。"),
  N("s11-2.mp3", "止まると業務が滞る受注データで、最も重視すべき特性はどれでしょうか。"),
  N("s11-3.mp3", "正解は、可用性です。", { gapBeforeSec: 1.8 }),
];

// P12: ケース問題3 — 管理責任者は資産を扱う業務部門の長
const SEG_Q3 = [
  N("s12-1.mp3", "三問目です。"),
  N("s12-2.mp3", "顧客名簿の管理責任者として、ふさわしいのはどちらでしょうか。"),
  N("s12-3.mp3", "正解は、その資産を扱う営業部の部長です。", { gapBeforeSec: 1.8 }),
];

const SEG_P13 = [
  N("s13-1.mp3", "情報資産は、データだけでなく、機器や人、施設まで含みます。"),
  N("s13-2.mp3", "三つの特性を評価し、最も高い値を、その資産の重要度とします。"),
  N("s13-3.mp3", "これらを台帳にまとめ、定期的な棚卸しで、最新に保ちます。"),
  OUTRO_SEG,
];

// ---------------------------------------------------------------------------
// P3: 情報資産とは（アイコン4連）— データだけでなく機器・人・施設も
// ---------------------------------------------------------------------------

const ASSET_KINDS = [
  { icon: "storage", label: "データ", sub: "顧客情報・記録" },
  { icon: "description", label: "書類", sub: "契約書・帳票" },
  { icon: "computer", label: "機器", sub: "PC・サーバー" },
  { icon: "apartment", label: "人・施設", sub: "人材・建物" },
];

const AssetKindCard: React.FC<{ icon: string; label: string; sub: string; delaySec: number }> = ({
  icon,
  label,
  sub,
  delaySec,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 14 * SCALE,
      padding: `${11 * SCALE}px ${9 * SCALE}px`,
      width: 90 * SCALE,
      ...usePop(delaySec),
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
      <Ms name={icon} size={23 * SCALE} />
    </span>
    <b style={{ fontSize: 13 * SCALE, fontWeight: 800 }}>{label}</b>
    <span style={{ fontSize: 9.5 * SCALE, color: colors.textSecondary, textAlign: "center" }}>{sub}</span>
  </div>
);

const AssetKindsScene: React.FC = () => {
  const headAppear = useAppear(0.3);
  return (
    <SlideShell
      heading="情報資産とは"
      icon={<Ms name="inventory_2" size={videoType.slideHeadIcon} />}
      narration={SEG_P3}
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
          gap: 16 * SCALE,
        }}
      >
        <span style={{ fontSize: 15 * SCALE, fontWeight: 800, ...headAppear }}>
          <span style={markerStyle}>情報</span>だけが資産ではない
        </span>
        <div style={{ display: "flex", gap: 14 * SCALE }}>
          {ASSET_KINDS.map((k, i) => (
            <AssetKindCard
              key={k.label}
              icon={k.icon}
              label={k.label}
              sub={k.sub}
              delaySec={segStart(SEG_P3, 2) + i * 0.3}
            />
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 3特性で価値を測る（機密性・完全性・可用性の3カード）
// 各カードをその特性を説明するナレーション文の読み上げ開始に同期
// ---------------------------------------------------------------------------

const CIA = [
  { icon: "lock", name: "機密性", en: "Confidentiality", def: "許された人だけが見られる" },
  { icon: "verified", name: "完全性", en: "Integrity", def: "正確で改ざんされない" },
  { icon: "schedule", name: "可用性", en: "Availability", def: "必要なときに使える" },
];

const CiaCard: React.FC<{
  icon: string;
  name: string;
  en: string;
  def: string;
  delaySec: number;
}> = ({ icon, name, en, def, delaySec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 16 * SCALE,
      padding: `${12 * SCALE}px ${12 * SCALE}px`,
      ...useAppear(delaySec),
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
      }}
    >
      <Ms name={icon} size={24 * SCALE} />
    </span>
    <b style={{ fontSize: 15 * SCALE, fontWeight: 800 }}>{name}</b>
    <span style={{ fontSize: 8.5 * SCALE, fontWeight: 700, color: colors.textMuted, letterSpacing: 0.5 }}>
      {en}
    </span>
    <span style={{ fontSize: 10.5 * SCALE, color: colors.textSecondary, textAlign: "center", lineHeight: 1.4 }}>
      {def}
    </span>
  </div>
);

const CiaScene: React.FC = () => (
  <SlideShell
    heading="3特性で価値を測る"
    icon={<Ms name="shield" size={videoType.slideHeadIcon} />}
    narration={SEG_P4}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14 * SCALE,
      }}
    >
      {CIA.map((c, i) => (
        <CiaCard
          key={c.name}
          icon={c.icon}
          name={c.name}
          en={c.en}
          def={c.def}
          delaySec={segStart(SEG_P4, i + 1)}
        />
      ))}
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P5: 重要度＝3特性の最大値（例: 顧客名簿）
// ---------------------------------------------------------------------------

const EvalChip: React.FC<{ label: string; value: number; isMax: boolean; on: boolean }> = ({
  label,
  value,
  isMax,
  on,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4 * SCALE,
      backgroundColor: isMax && on ? colors.primary50 : colors.surface,
      border: `${2 * SCALE}px solid ${isMax && on ? colors.primary600 : colors.border}`,
      borderRadius: 12 * SCALE,
      padding: `${10 * SCALE}px ${16 * SCALE}px`,
      minWidth: 68 * SCALE,
    }}
  >
    <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textSecondary }}>{label}</span>
    <b
      style={{
        fontSize: 26 * SCALE,
        fontWeight: 800,
        lineHeight: 1,
        color: isMax && on ? colors.primary600 : colors.textPrimary,
      }}
    >
      {value}
    </b>
  </div>
);

const ImportanceScene: React.FC = () => {
  const exampleAppear = useAppear(0.3);
  const chipsAppear = useAppear(0.6);
  const maxOn = useProgress(segStart(SEG_P5, 1), 0.3) > 0.5;
  const resultAppear = useAppear(segStart(SEG_P5, 2));

  return (
    <SlideShell
      heading="重要度は最大値で決める"
      icon={<Ms name="leaderboard" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
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
          gap: 16 * SCALE,
        }}
      >
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, color: colors.textSecondary, ...exampleAppear }}>
          例：<span style={markerStyle}>顧客名簿</span>を評価すると…
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 * SCALE, ...chipsAppear }}>
          <div style={{ display: "flex", gap: 10 * SCALE }}>
            <EvalChip label="機密性" value={3} isMax on={maxOn} />
            <EvalChip label="完全性" value={2} isMax={false} on={maxOn} />
            <EvalChip label="可用性" value={2} isMax={false} on={maxOn} />
          </div>
          <span style={{ fontSize: 26 * SCALE, fontWeight: 800, color: colors.textMuted }}>→</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              backgroundColor: colors.primary600,
              borderRadius: 16 * SCALE,
              padding: `${12 * SCALE}px ${22 * SCALE}px`,
              ...resultAppear,
            }}
          >
            <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.primary100 }}>重要度</span>
            <b style={{ fontSize: 34 * SCALE, fontWeight: 800, lineHeight: 1, color: colors.surface }}>3</b>
          </div>
        </div>
        <span style={{ fontSize: 11 * SCALE, color: colors.textSecondary, ...resultAppear }}>
          一つでも重大なら、資産全体を重要とみなす
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 情報資産台帳（左に記録項目・右に台帳イラスト）
// ---------------------------------------------------------------------------

const REGISTER_ROWS = [
  { icon: "label", label: "資産名", sub: "顧客名簿・見積書 など" },
  { icon: "badge", label: "管理責任者", sub: "守る責任を持つ人" },
  { icon: "shield", label: "3特性の評価", sub: "機密性・完全性・可用性" },
  { icon: "leaderboard", label: "重要度", sub: "3特性の最大値" },
];

const RegisterCard: React.FC<{ icon: string; label: string; sub: string; delaySec: number }> = ({
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

const RegisterScene: React.FC = () => (
  <SlideShell
    heading="台帳に記録する4項目"
    icon={<Ms name="table_chart" size={videoType.slideHeadIcon} />}
    narration={SEG_P7}
  >
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
      {REGISTER_ROWS.map((r, i) => (
        <RegisterCard
          key={r.label}
          icon={r.icon}
          label={r.label}
          sub={r.sub}
          delaySec={segStart(SEG_P7, 1) + i * 0.25}
        />
      ))}
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// ケース幕間
// ---------------------------------------------------------------------------

const CaseIntroScene: React.FC = () => <SectionTitle title="ケースで確認" />;

// ---------------------------------------------------------------------------
// P9: ケース提示（A社 営業部の資産）— 以降3問が参照する「本文・図表」
// 2つの資産カード（メモ＋3特性の評価値）を並べる
// ---------------------------------------------------------------------------

const CASE_ASSETS = [
  {
    icon: "group",
    name: "顧客名簿",
    note: "漏れると影響が大きい",
    cia: [
      { k: "機", v: 3 },
      { k: "完", v: 2 },
      { k: "可", v: 2 },
    ],
  },
  {
    icon: "database",
    name: "受注データ",
    note: "止まると業務が滞る",
    cia: [
      { k: "機", v: 2 },
      { k: "完", v: 2 },
      { k: "可", v: 3 },
    ],
  },
];

const CiaMiniChip: React.FC<{ k: string; v: number }> = ({ k, v }) => (
  <div
    style={{
      display: "flex",
      alignItems: "baseline",
      gap: 3 * SCALE,
      backgroundColor: colors.primary50,
      borderRadius: 8 * SCALE,
      padding: `${5 * SCALE}px ${9 * SCALE}px`,
    }}
  >
    <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>{k}</span>
    <b style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1, color: colors.primary600 }}>{v}</b>
  </div>
);

const CaseAssetCard: React.FC<{
  icon: string;
  name: string;
  note: string;
  cia: { k: string; v: number }[];
  delaySec: number;
}> = ({ icon, name, note, cia, delaySec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 7 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 16 * SCALE,
      padding: `${13 * SCALE}px ${12 * SCALE}px`,
      ...usePop(delaySec),
    }}
  >
    <span
      style={{
        width: 40 * SCALE,
        height: 40 * SCALE,
        borderRadius: 13 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={23 * SCALE} />
    </span>
    <b style={{ fontSize: 15 * SCALE, fontWeight: 800 }}>{name}</b>
    <span style={{ fontSize: 10 * SCALE, color: colors.textSecondary, textAlign: "center" }}>{note}</span>
    <div style={{ display: "flex", gap: 6 * SCALE, marginTop: 2 * SCALE }}>
      {cia.map((c) => (
        <CiaMiniChip key={c.k} k={c.k} v={c.v} />
      ))}
    </div>
  </div>
);

const CaseScene: React.FC = () => (
  <SlideShell
    heading="ケース：A社 営業部の資産"
    icon={<Ms name="business_center" size={videoType.slideHeadIcon} />}
    narration={SEG_CASE}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16 * SCALE,
      }}
    >
      {CASE_ASSETS.map((a, i) => (
        <CaseAssetCard
          key={a.name}
          icon={a.icon}
          name={a.name}
          note={a.note}
          cia={a.cia}
          delaySec={segStart(SEG_CASE, 1) + i * 0.4}
        />
      ))}
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL79AssetRegister: VideoSpec = {
  id: "sg-L79-asset-register",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "情報資産の特定と\n台帳づくり",
      keywords: ["情報資産", "3特性", "資産台帳"],
    },
    {
      pattern: "bullets",
      heading: "何を守るかを決める",
      icon: "search",
      bullets: [
        { text: "守る対象を洗い出す", sub: "対策の第一歩", marker: "blue" },
        { text: "見えない資産は守れない", sub: "気づかぬ情報は無防備" },
      ],
      appearAtSec: [segStart(SEG_P2, 1), segStart(SEG_P2, 2)],
      narration: SEG_P2,
      illust: "images/ipa_sg/person-leader-think.png",
    },
    {
      pattern: "custom",
      name: "asset-kinds",
      durationSec: 6,
      narration: SEG_P3,
      component: AssetKindsScene,
    },
    {
      pattern: "custom",
      name: "cia",
      durationSec: 6,
      narration: SEG_P4,
      component: CiaScene,
    },
    {
      pattern: "custom",
      name: "importance",
      durationSec: 6,
      narration: SEG_P5,
      component: ImportanceScene,
    },
    {
      pattern: "bullets",
      heading: "責任者と使い方を決める",
      icon: "manage_accounts",
      bullets: [
        { text: "管理責任者を決める", sub: "守る責任・ルールを持つ人", marker: "blue" },
        { text: "利用の許容範囲を定める", sub: "誰がどこまで使ってよいか" },
      ],
      appearAtSec: [segStart(SEG_P6, 0), segStart(SEG_P6, 2)],
      narration: SEG_P6,
    },
    {
      pattern: "custom",
      name: "register",
      durationSec: 7,
      narration: SEG_P7,
      transitionIn: "wipe-light",
      component: RegisterScene,
    },
    {
      pattern: "custom",
      name: "case-intro",
      durationSec: 3,
      narration: SEG_CASE_INTRO,
      component: CaseIntroScene,
    },
    {
      pattern: "custom",
      name: "case-setup",
      durationSec: 6,
      narration: SEG_CASE,
      component: CaseScene,
    },
    {
      pattern: "quiz",
      question: "顧客名簿の重要度は？",
      choices: [
        { key: "A", text: "3（3特性の最大値）", correct: true },
        { key: "B", text: "2（3特性の平均）" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "受注データで重視する特性は？",
      choices: [
        { key: "A", text: "可用性（止まると困る）", correct: true },
        { key: "B", text: "機密性（漏れると困る）" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "顧客名簿の管理責任者は？",
      choices: [
        { key: "A", text: "営業部の部長", correct: true },
        { key: "B", text: "情報システム部の担当者" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "情報資産はデータだけでなく機器や人も含む", checkAtSec: segStart(SEG_P13, 0) },
        { text: "3特性の最大値をその資産の重要度とする", checkAtSec: segStart(SEG_P13, 1) },
        { text: "資産名・責任者・重要度を台帳にまとめる", checkAtSec: segStart(SEG_P13, 2) },
      ],
      narration: SEG_P13,
      transitionIn: "wipe",
    },
  ],
};
