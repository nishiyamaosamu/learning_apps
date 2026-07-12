import { colors, fontMono, markerPinkStyle, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { CASE_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L80-risk-value.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L80: リスク値の算定と評価
 *
 * content_works/ipa_sg/LESSON_PLAN.md 第9章 L80 に対応（科目B実践・技能2-1）。
 * シナリオは narration/ipa_sg/sg-L80-risk-value.md。
 *
 * R5問13型: リスク値＝重要度×脅威×脆弱性を算定し、しきい値で対応要否を判定する。
 * 重要度＝3特性の最大値は L79 が既習。ケースは R5問13 を模した分析機器メーカーA社の台帳
 * （評価0〜2・しきい値5）で、算定 → 重要度の罠（機密性0）→ しきい値判定 の3問:
 * 導入(bullets+illust) → 式ドン(custom) → 3要素(custom 縦3行) → しきい値の数直線(custom) →
 * 落とし穴・機密性0(custom, wipe-light) → ケース幕間 → ケース提示(custom 台帳表) →
 * ケース問題3問(quiz) → まとめ(wipe)。イラストは P2 icon-scale.png の1枚。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L80-risk-value");

// ---------------------------------------------------------------------------
// セグメント定義
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "今回は、リスクの大きさを数値で測り、対応が必要かを判定する方法を学びます。"),
  N("s02-2.mp3", "対策には手間もお金もかかるため、すべての資産を同じ強さでは守れません。"),
  N("s02-3.mp3", "そこでリスクを数値にして比べ、対応の要否を誰でも同じように判断できるようにします。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "リスクの大きさは、シンプルな掛け算の式で計算します。"),
  N("s03-2.mp3", "リスク値は、重要度、かける、脅威、かける、脆弱性です。"),
  N("s03-3.mp3", "掛け算なので、三つのうちどれか一つでも小さければ、リスク値は小さくなります。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "式に出てくる、三つの要素を確認しましょう。"),
  N("s04-2.mp3", "重要度は資産の価値で、前回学んだ、三特性の評価の最大値を使います。"),
  N("s04-3.mp3", "脅威は、その資産を狙う攻撃や事故の、起こりやすさです。"),
  N("s04-4.mp3", "脆弱性は、つけ込まれる弱点を、どれだけ残しているかです。"),
  N("s04-5.mp3", "たとえば、修正プログラムを当てていないサーバーは、脆弱性が高い状態です。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "計算したリスク値は、あらかじめ決めた、しきい値と比べます。"),
  N("s05-2.mp3", "しきい値以下なら受容可能なリスク、つまり、そのまま受け入れてよいリスクです。"),
  N("s05-3.mp3", "しきい値を超えたら、保有以外のリスク対応、つまり何らかの対策が必要です。"),
  N("s05-4.mp3", "たとえばしきい値が5なら、リスク値4は受容でき、8は対応が必要です。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "ここで一つ、試験でも狙われやすい、落とし穴があります。"),
  N("s06-2.mp3", "誰でも見られる公開情報は、機密性の評価が0になります。"),
  N("s06-3.mp3", "それでも重要度は最大値で決めるため、改ざんされては困るなら、高いままです。"),
  N("s06-4.mp3", "機密性が低いから守らなくてよい、とは限らないのです。"),
];

const SEG_CASE_INTRO = CASE_INTRO_SEG;

// P8: ケース提示（A社のルールと台帳＝以降3問が参照する「本文・図表」）
const SEG_P8 = [
  N("s08-1.mp3", "では、分析機器メーカー、A社のケースで考えましょう。"),
  N("s08-2.mp3", "A社は評価値を0から2の3段階で付け、リスク値のしきい値を5と決めています。"),
  N("s08-3.mp3", "しきい値を超えた資産には、保有以外のリスク対応を行うルールです。"),
  N("s08-4.mp3", "台帳には、健康診断の情報、Webの会社情報、開発した分析技術が並んでいます。"),
];

// P9: ケース問題1 — リスク値の算定（掛け算 vs 足し算）
const SEG_Q1 = [
  N("s09-1.mp3", "まず一問目です。"),
  N("s09-2.mp3", "健康診断の情報は、重要度2、脅威2、脆弱性2でした。リスク値はいくつでしょうか。"),
  N("s09-3.mp3", "正解は、2かける2かける2で、8です。", { gapBeforeSec: 1.8 }),
  N("s09-4.mp3", "しきい値の5を超えるので、保有以外のリスク対応が必要です。"),
];

// P10: ケース問題2 — 機密性0でも重要度は最大値
const SEG_Q2 = [
  N("s10-1.mp3", "二問目です。"),
  N("s10-2.mp3", "Webの会社情報は、機密性0、完全性2、可用性2です。重要度はいくつでしょうか。"),
  N("s10-3.mp3", "正解は、最大値の2です。", { gapBeforeSec: 1.8 }),
  N("s10-4.mp3", "機密性が0でも、改ざんへの備えが必要なので、重要度は高いままです。"),
];

// P11: ケース問題3 — しきい値以下は受容できる
const SEG_Q3 = [
  N("s11-1.mp3", "最後の問題です。"),
  N("s11-2.mp3", "開発した分析技術は、重要度2、脅威2、脆弱性1で、リスク値は4です。対応は必要でしょうか。"),
  N("s11-3.mp3", "正解は、対応は不要です。", { gapBeforeSec: 1.8 }),
  N("s11-4.mp3", "リスク値4はしきい値の5以下なので、受容可能なリスクとして受け入れられます。"),
];

const SEG_P12 = [
  N("s12-1.mp3", "リスク値は、重要度、脅威、脆弱性の、三つの掛け算で求めます。"),
  N("s12-2.mp3", "リスク値がしきい値を超えたら、保有以外のリスク対応を行います。"),
  N("s12-3.mp3", "機密性が0でも、重要度は最大値で決まることに注意しましょう。"),
  OUTRO_SEG,
];

// ---------------------------------------------------------------------------
// P3: リスク値の式（式ドン）— リスク値＝重要度×脅威×脆弱性
// ---------------------------------------------------------------------------

const FormulaTerm: React.FC<{ label: string; hero?: boolean; delaySec: number }> = ({
  label,
  hero,
  delaySec,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: hero ? colors.primary600 : colors.surface,
      border: hero ? "none" : `${2 * SCALE}px solid ${colors.primary300}`,
      borderRadius: 14 * SCALE,
      padding: `${12 * SCALE}px ${14 * SCALE}px`,
      ...usePop(delaySec),
    }}
  >
    <b
      style={{
        fontSize: (hero ? 17 : 15) * SCALE,
        fontWeight: 800,
        lineHeight: 1,
        color: hero ? colors.surface : colors.textPrimary,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </b>
  </div>
);

const FormulaScene: React.FC = () => {
  const noteAppear = useAppear(segStart(SEG_P3, 2));
  const t1 = segStart(SEG_P3, 1);
  return (
    <SlideShell
      heading="リスク値の求め方"
      icon={<Ms name="calculate" size={videoType.slideHeadIcon} />}
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
          gap: 18 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE }}>
          <FormulaTerm label="リスク値" hero delaySec={t1} />
          <b style={{ fontSize: 18 * SCALE, fontWeight: 800, color: colors.textMuted }}>＝</b>
          <FormulaTerm label="重要度" delaySec={t1 + 0.9} />
          <b style={{ fontSize: 18 * SCALE, fontWeight: 800, color: colors.textMuted }}>×</b>
          <FormulaTerm label="脅威" delaySec={t1 + 1.8} />
          <b style={{ fontSize: 18 * SCALE, fontWeight: 800, color: colors.textMuted }}>×</b>
          <FormulaTerm label="脆弱性" delaySec={t1 + 2.7} />
        </div>
        <span style={{ fontSize: 12 * SCALE, fontWeight: 700, ...noteAppear }}>
          掛け算 → <span style={markerStyle}>どれか一つが小さければ、リスク値も小さい</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 3つの要素（縦3行）— 重要度・脅威・脆弱性の意味
// ---------------------------------------------------------------------------

const FACTORS = [
  { icon: "leaderboard", name: "重要度", desc: "資産の価値 ＝ 3特性の評価の最大値" },
  { icon: "bolt", name: "脅威", desc: "攻撃や事故の、起こりやすさ" },
  { icon: "lock_open", name: "脆弱性", desc: "つけ込まれる弱点の、残り具合" },
];

const FactorRow: React.FC<{ icon: string; name: string; desc: string; delaySec: number }> = ({
  icon,
  name,
  desc,
  delaySec,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 14 * SCALE,
      padding: `${3.5 * SCALE}px ${16 * SCALE}px`,
      ...useAppear(delaySec),
    }}
  >
    <span
      style={{
        width: 23 * SCALE,
        height: 23 * SCALE,
        flex: "none",
        borderRadius: 9 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={14 * SCALE} />
    </span>
    <b style={{ fontSize: 13.5 * SCALE, fontWeight: 800, width: 58 * SCALE, flex: "none" }}>{name}</b>
    <span style={{ fontSize: 11 * SCALE, color: colors.textSecondary }}>{desc}</span>
  </div>
);

const FactorsScene: React.FC = () => {
  const exampleAppear = useAppear(segStart(SEG_P4, 4));
  return (
    <SlideShell
      heading="3つの要素"
      icon={<Ms name="category" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7 * SCALE,
        }}
      >
        {FACTORS.map((f, i) => (
          <FactorRow
            key={f.name}
            icon={f.icon}
            name={f.name}
            desc={f.desc}
            delaySec={segStart(SEG_P4, i + 1)}
          />
        ))}
        <span
          style={{
            alignSelf: "flex-end",
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            backgroundColor: colors.primary50,
            borderRadius: 999,
            padding: `${4 * SCALE}px ${12 * SCALE}px`,
            ...exampleAppear,
          }}
        >
          例：修正プログラム未適用のサーバー ＝ 脆弱性が高い
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: しきい値で判定（数直線）— 以下なら受容、超えたら保有以外の対応
// ---------------------------------------------------------------------------

// 数直線のスケール（0〜9）。しきい値5と例の値4・8を%位置に変換する
const LINE_MAX = 9;
const linePos = (v: number) => `${(v / LINE_MAX) * 100}%`;

const ValueDot: React.FC<{ value: number; over: boolean; delaySec: number }> = ({
  value,
  over,
  delaySec,
}) => (
  <div
    style={{
      position: "absolute",
      left: linePos(value),
      top: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    <div
      style={{
        width: 30 * SCALE,
        height: 30 * SCALE,
        borderRadius: 999,
        backgroundColor: over ? colors.accentPinkText : colors.primary600,
        color: colors.surface,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15 * SCALE,
        fontWeight: 800,
        fontFamily: fontMono,
        ...usePop(delaySec),
      }}
    >
      {value}
    </div>
  </div>
);

const ThresholdScene: React.FC = () => {
  const acceptAppear = useAppear(segStart(SEG_P5, 1));
  const respondAppear = useAppear(segStart(SEG_P5, 2));
  const markAppear = usePop(0.6);
  return (
    <SlideShell
      heading="しきい値と比べる"
      icon={<Ms name="compare_arrows" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `0 ${8 * SCALE}px`,
        }}
      >
        {/* しきい値ラベル（数直線の上・5の位置） */}
        <div style={{ position: "relative", height: 26 * SCALE, marginBottom: 6 * SCALE }}>
          <div
            style={{
              position: "absolute",
              left: linePos(5),
              transform: "translateX(-50%)",
              backgroundColor: colors.textPrimary,
              color: colors.surface,
              borderRadius: 999,
              padding: `${4 * SCALE}px ${11 * SCALE}px`,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              whiteSpace: "nowrap",
              ...markAppear,
            }}
          >
            しきい値 5
          </div>
        </div>

        {/* 数直線（左: 受容ゾーン / 右: 対応ゾーン）と値のドット */}
        <div style={{ position: "relative", height: 40 * SCALE }}>
          <div
            style={{
              position: "absolute",
              inset: `${14 * SCALE}px 0`,
              display: "flex",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div style={{ width: linePos(5), backgroundColor: colors.primary100, ...acceptAppear }} />
            <div style={{ flex: 1, backgroundColor: colors.accentPinkSoft, ...respondAppear }} />
          </div>
          {/* しきい値の縦線 */}
          <div
            style={{
              position: "absolute",
              left: linePos(5),
              top: 0,
              bottom: 0,
              width: 2.5 * SCALE,
              transform: "translateX(-50%)",
              borderRadius: 999,
              backgroundColor: colors.textPrimary,
              ...markAppear,
            }}
          />
          <ValueDot value={4} over={false} delaySec={segStart(SEG_P5, 3) + 0.6} />
          <ValueDot value={8} over delaySec={segStart(SEG_P5, 3) + 1.4} />
        </div>

        {/* ゾーンのラベル */}
        <div style={{ position: "relative", height: 44 * SCALE, marginTop: 8 * SCALE }}>
          <div
            style={{
              position: "absolute",
              left: linePos(2.5),
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              ...acceptAppear,
            }}
          >
            <b style={{ fontSize: 13 * SCALE, fontWeight: 800, color: colors.primary600, whiteSpace: "nowrap" }}>
              受容できる
            </b>
            <span style={{ fontSize: 9.5 * SCALE, color: colors.textSecondary, whiteSpace: "nowrap" }}>
              しきい値以下 → そのまま受け入れる
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              left: linePos(7),
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              ...respondAppear,
            }}
          >
            <b style={{ fontSize: 13 * SCALE, fontWeight: 800, color: colors.accentPinkText, whiteSpace: "nowrap" }}>
              対応が必要
            </b>
            <span style={{ fontSize: 9.5 * SCALE, color: colors.textSecondary, whiteSpace: "nowrap" }}>
              超えたら → 保有以外のリスク対応
            </span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 落とし穴 — 機密性0でも重要度は最大値で決まる
// ---------------------------------------------------------------------------

const TrapChip: React.FC<{ label: string; value: number; dim: boolean; delaySec: number }> = ({
  label,
  value,
  dim,
  delaySec,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3 * SCALE,
      backgroundColor: colors.surface,
      border: `${2 * SCALE}px solid ${dim ? colors.accentPink : colors.border}`,
      borderRadius: 12 * SCALE,
      padding: `${9 * SCALE}px ${15 * SCALE}px`,
      ...usePop(delaySec),
    }}
  >
    <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>{label}</span>
    <b
      style={{
        fontSize: 23 * SCALE,
        fontWeight: 800,
        lineHeight: 1,
        fontFamily: fontMono,
        color: dim ? colors.accentPinkText : colors.textPrimary,
      }}
    >
      {value}
    </b>
  </div>
);

const TrapScene: React.FC = () => {
  const subjectAppear = useAppear(0.4);
  const resultAppear = usePop(segStart(SEG_P6, 2) + 0.6);
  const noteAppear = useAppear(segStart(SEG_P6, 3));
  return (
    <SlideShell
      heading="落とし穴：機密性0"
      icon={<Ms name="gpp_maybe" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
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
          gap: 13 * SCALE,
        }}
      >
        <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, color: colors.textSecondary, ...subjectAppear }}>
          例：<span style={markerStyle}>Webサイトの会社情報</span>（誰でも見られる公開情報）
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 15 * SCALE }}>
          <div style={{ display: "flex", gap: 8 * SCALE }}>
            <TrapChip label="機密性" value={0} dim delaySec={segStart(SEG_P6, 1)} />
            <TrapChip label="完全性" value={2} dim={false} delaySec={segStart(SEG_P6, 1) + 0.3} />
            <TrapChip label="可用性" value={2} dim={false} delaySec={segStart(SEG_P6, 1) + 0.6} />
          </div>
          <span style={{ fontSize: 22 * SCALE, fontWeight: 800, color: colors.textMuted }}>→</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              backgroundColor: colors.primary600,
              borderRadius: 15 * SCALE,
              padding: `${11 * SCALE}px ${20 * SCALE}px`,
              ...resultAppear,
            }}
          >
            <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.primary100 }}>重要度</span>
            <b style={{ fontSize: 28 * SCALE, fontWeight: 800, lineHeight: 1, color: colors.surface }}>2</b>
          </div>
        </div>
        <b style={{ fontSize: 13 * SCALE, fontWeight: 800, ...noteAppear }}>
          機密性が低い ＝ <span style={markerPinkStyle}>守らなくてよい、ではない</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// ケース幕間
// ---------------------------------------------------------------------------

const CaseIntroScene: React.FC = () => <SectionTitle title="ケースで確認" />;

// ---------------------------------------------------------------------------
// P8: ケース提示（A社のルール + 台帳表）— 以降3問が参照する「本文・図表」
// ---------------------------------------------------------------------------

const CASE_RULES = ["評価は 0〜2", "しきい値 5", "超えたら対応"];

const CASE_ROWS = [
  { name: "健康診断の情報", vals: [2, 2, 2, 2, 2] },
  { name: "Webの会社情報", vals: [0, 2, 2, 2, 2] },
  { name: "開発した分析技術", vals: [2, 2, 1, 2, 1] },
];

const CASE_COLS = ["機", "完", "可", "脅威", "脆弱"];

const RuleChip: React.FC<{ label: string; delaySec: number }> = ({ label, delaySec }) => (
  <span
    style={{
      backgroundColor: colors.primary50,
      color: colors.primary800,
      borderRadius: 999,
      padding: `${5 * SCALE}px ${13 * SCALE}px`,
      fontSize: 10.5 * SCALE,
      fontWeight: 800,
      whiteSpace: "nowrap",
      ...usePop(delaySec),
    }}
  >
    {label}
  </span>
);

const CaseRow: React.FC<{ name: string; vals: number[]; delaySec: number }> = ({
  name,
  vals,
  delaySec,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 12 * SCALE,
      padding: `${3.5 * SCALE}px ${14 * SCALE}px`,
      ...useAppear(delaySec),
    }}
  >
    <b style={{ flex: 1, fontSize: 12 * SCALE, fontWeight: 800 }}>{name}</b>
    {vals.map((v, i) => (
      <span
        key={CASE_COLS[i]}
        style={{
          width: 20 * SCALE,
          textAlign: "center",
          fontSize: 13.5 * SCALE,
          fontWeight: 800,
          fontFamily: fontMono,
          marginLeft: (i === 3 ? 10 : 3) * SCALE,
          color: i >= 3 ? colors.primary600 : colors.textPrimary,
        }}
      >
        {v}
      </span>
    ))}
    <span
      style={{
        width: 36 * SCALE,
        textAlign: "center",
        fontSize: 13.5 * SCALE,
        fontWeight: 800,
        fontFamily: fontMono,
        marginLeft: 10 * SCALE,
        color: colors.textMuted,
      }}
    >
      ？
    </span>
  </div>
);

const CaseTableScene: React.FC = () => {
  const headerAppear = useAppear(segStart(SEG_P8, 3));
  return (
    <SlideShell
      heading="ケース：A社の台帳"
      icon={<Ms name="table_chart" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
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
        <div style={{ display: "flex", justifyContent: "center", gap: 8 * SCALE, marginBottom: 2 * SCALE }}>
          <RuleChip label={CASE_RULES[0]} delaySec={segStart(SEG_P8, 1)} />
          <RuleChip label={CASE_RULES[1]} delaySec={segStart(SEG_P8, 1) + 0.5} />
          <RuleChip label={CASE_RULES[2]} delaySec={segStart(SEG_P8, 2)} />
        </div>
        {/* 表ヘッダー（列名） */}
        <div style={{ display: "flex", alignItems: "center", padding: `0 ${15.5 * SCALE}px`, ...headerAppear }}>
          <span style={{ flex: 1, fontSize: 9 * SCALE, fontWeight: 700, color: colors.textMuted }}>
            情報資産
          </span>
          {CASE_COLS.map((c, i) => (
            <span
              key={c}
              style={{
                width: 20 * SCALE,
                textAlign: "center",
                fontSize: 9 * SCALE,
                fontWeight: 700,
                color: colors.textMuted,
                marginLeft: (i === 3 ? 10 : 3) * SCALE,
                whiteSpace: "nowrap",
              }}
            >
              {c}
            </span>
          ))}
          <span
            style={{
              width: 36 * SCALE,
              textAlign: "center",
              fontSize: 9 * SCALE,
              fontWeight: 700,
              color: colors.textMuted,
              marginLeft: 10 * SCALE,
              whiteSpace: "nowrap",
            }}
          >
            リスク値
          </span>
        </div>
        {CASE_ROWS.map((r, i) => (
          <CaseRow key={r.name} name={r.name} vals={r.vals} delaySec={segStart(SEG_P8, 3) + 0.3 + i * 0.35} />
        ))}
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL80RiskValue: VideoSpec = {
  id: "sg-L80-risk-value",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "リスク値の算定と評価",
      keywords: ["リスク値", "しきい値", "受容"],
    },
    {
      pattern: "bullets",
      heading: "リスクを数値で測る",
      icon: "monitoring",
      bullets: [
        { text: "すべては守れない", sub: "対策には手間もお金も", marker: "blue" },
        { text: "数値で要否を決める", sub: "誰でも同じ判定になる" },
      ],
      appearAtSec: [segStart(SEG_P2, 1), segStart(SEG_P2, 2)],
      narration: SEG_P2,
      illust: "images/ipa_sg/icon-scale.png",
    },
    {
      pattern: "custom",
      name: "formula",
      durationSec: 6,
      narration: SEG_P3,
      component: FormulaScene,
    },
    {
      pattern: "custom",
      name: "factors",
      durationSec: 7,
      narration: SEG_P4,
      component: FactorsScene,
    },
    {
      pattern: "custom",
      name: "threshold",
      durationSec: 7,
      narration: SEG_P5,
      component: ThresholdScene,
    },
    {
      pattern: "custom",
      name: "trap",
      durationSec: 6,
      narration: SEG_P6,
      transitionIn: "wipe-light",
      component: TrapScene,
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
      name: "case-table",
      durationSec: 7,
      narration: SEG_P8,
      component: CaseTableScene,
    },
    {
      pattern: "quiz",
      question: "健康診断情報のリスク値は？",
      choices: [
        { key: "A", text: "8（2×2×2）", correct: true },
        { key: "B", text: "6（2＋2＋2）" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "Web会社情報の重要度は？",
      choices: [
        { key: "A", text: "2（最大値で決める）", correct: true },
        { key: "B", text: "0（機密性に合わせる）" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "リスク値4の技術、対応は？",
      choices: [
        { key: "A", text: "不要（受容できる）", correct: true },
        { key: "B", text: "必要（対策を行う）" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "リスク値＝重要度×脅威×脆弱性で求める", checkAtSec: segStart(SEG_P12, 0) },
        { text: "しきい値を超えたら保有以外のリスク対応", checkAtSec: segStart(SEG_P12, 1) },
        { text: "機密性が0でも重要度は最大値で決まる", checkAtSec: segStart(SEG_P12, 2) },
      ],
      narration: SEG_P12,
      transitionIn: "wipe",
    },
  ],
};
