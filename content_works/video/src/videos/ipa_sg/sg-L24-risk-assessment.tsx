import { Img, interpolateColors, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontMono, markerPinkStyle, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L24-risk-assessment.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L24: リスクアセスメント
 *
 * 発注書: content_works/ipa_sg/orders/L24.md ／ シナリオ: narration/ipa_sg/sg-L24-risk-assessment.md
 *
 * ★ リスク値の主担当（L80・L90 が参照）。式の読み上げは必ず
 * 「重要度、かける、脅威、かける、脆弱性」で固定する（narration md の「用語の呼称」表が正）。
 *
 * 構成: title → 導入(custom 左右分割) → 3段階(flow) → リスク基準(custom) →
 * 特定と所有者(bullets+illust) → 定性/定量(vs, wipe-light) → マトリックス(custom 3×3) →
 * リスク値の式(custom 式ドン) → 【計算ワーク】(custom 台帳→穴埋め→答え) →
 * 評価=順位付け(custom 降順バー) → クイズ幕間 → クイズ3問 → まとめ(wipe)
 *
 * 範囲: リスク対応の4分類・残留リスクは L25、しきい値での対応要否判定は L80 なので触れない。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L24-risk-assessment");

// ---------------------------------------------------------------------------
// セグメント定義
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "今回は、リスクの大きさを測って順位をつける、リスクアセスメントを学びます。"),
  N("s02-2.mp3", "リスクは数え切れないほどあり、すべてに同じだけ手をかけられません。"),
  N("s02-3.mp3", "だから、洗い出し、測り、順位を付けるという手順を踏みます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "リスクアセスメントは、三つの段階で進みます。"),
  N("s03-2.mp3", "まず、どんなリスクがあるかを洗い出すリスク特定です。"),
  N("s03-3.mp3", "次に、その大きさを見積もるリスク分析です。"),
  N("s03-4.mp3", "最後に、基準と比べて優先順位を決めるリスク評価です。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "三つの段階に入る前に、測るための物差しを決めます。"),
  N("s04-2.mp3", "どこから上を問題とするかを定めた、リスク基準です。"),
  N("s04-3.mp3", "どこまで受け入れるかを示すので、リスク受容基準とも呼びます。"),
  N("s04-4.mp3", "後から基準を動かすと、都合のよい結論になってしまいます。"),
  N("s04-5.mp3", "避けたがる姿勢がリスク忌避、取りに行く姿勢がリスク選好で、基準の厳しさに表れます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "一つ目の段階、リスク特定です。"),
  N("s05-2.mp3", "どの資産に、どんな脅威が、どの弱点をついて起きるのかを洗い出します。"),
  N("s05-3.mp3", "リスクを生み出すもとになるものを、リスク源と呼びます。"),
  N("s05-4.mp3", "そして、リスクごとに責任者となるリスク所有者を決めます。"),
  N("s05-5.mp3", "みんなのリスクにすると、結局だれも対応しません。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "二つ目の段階、リスク分析です。"),
  N("s06-2.mp3", "測り方は二つあり、一つは高・中・低の言葉で測る定性的分析です。"),
  N("s06-3.mp3", "もう一つは、金額や点数の数値で測る定量的分析です。"),
  N("s06-4.mp3", "前回の年間予想損失額や得点法は、この定量的分析にあたります。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "定性的分析でよく使うのが、リスクマトリックスです。"),
  N("s07-2.mp3", "発生のしやすさと、影響の大きさを縦横にとった表です。"),
  N("s07-3.mp3", "交わるマスが表す大きさの段階を、リスクレベルといいます。"),
  N("s07-4.mp3", "起きやすくて影響も大きい右上が、最も高いリスクレベルです。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "定量的に測るときの、代表的な式を見ましょう。"),
  N("s08-2.mp3", "リスク値は、重要度、かける、脅威、かける、脆弱性で求めます。"),
  N("s08-3.mp3", "重要度は資産の価値、脅威は起こりやすさ、脆弱性は残った弱点です。"),
  N("s08-4.mp3", "掛け算なので、どれか一つが小さければリスク値も小さくなります。"),
];

// P9【計算ワーク】s09-3 の gapBeforeSec が「自分で掛け算する時間」
const SEG_P9 = [
  N("s09-1.mp3", "では、実際に手を動かして計算してみましょう。"),
  N("s09-2.mp3", "顧客名簿は、重要度が3、脅威が2、脆弱性が2と評価されました。"),
  N("s09-3.mp3", "三つを掛けると、3かける2かける2で、12になります。", { gapBeforeSec: 1.5 }),
  N("s09-4.mp3", "表から三つ拾って掛けるだけ、というのが計算の中身です。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "三つ目の段階、リスク評価です。"),
  N("s10-2.mp3", "分析で出た大きさを、最初に決めたリスク基準と比べます。"),
  N("s10-3.mp3", "基準を超えたものから順に、対応の優先順位を付けます。"),
  N("s10-4.mp3", "どう対応するかは、次回のリスク対応で学びます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG;

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "リスクアセスメントの三つの段階は、どの順番で進めるでしょうか。"),
  N("s12-3.mp3", "正解は、特定、分析、評価の順です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "リスク基準を、測る前に決めておくのはなぜでしょうか。"),
  N("s13-3.mp3", "正解は、後から都合よく基準を変えないためです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "リスクマトリックスで、リスクレベルが最も高くなるのはどれでしょうか。"),
  N("s14-3.mp3", "正解は、起きやすく影響も大きいものです。", { gapBeforeSec: 1.8 }),
];

const SEG_P15 = [
  N("s15-1.mp3", "リスクアセスメントは、特定、分析、評価の三段階で進めます。"),
  N("s15-2.mp3", "測る前に、判断の物差しとなるリスク基準を決めておきます。"),
  N("s15-3.mp3", "リスク値は、重要度、かける、脅威、かける、脆弱性で求めます。"),
  OUTRO_SEG,
];

// ---------------------------------------------------------------------------
// P2 導入: 左テキスト（キーワード見出し）＋ 右イラスト
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.5);
  const def = useAppear(0.9);
  const note = useAppear(segStart(SEG_P2, 1));
  const illust = useAppear(0.7);
  return (
    <SlideShell narration={SEG_P2}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          gap: "4%",
        }}
      >
        <div
          style={{
            flex: 1.2,
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
              ...chip,
            }}
          >
            リスクマネジメントの中核
          </span>
          <b
            style={{
              fontSize: 22 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              ...term,
            }}
          >
            <span style={markerStyle}>リスクアセスメント</span>
          </b>
          <span style={{ fontSize: 13 * SCALE, fontWeight: 700, lineHeight: 1.5, ...def }}>
            洗い出し、測り、順位を付ける手続き
          </span>
          <span
            style={{
              marginTop: 4 * SCALE,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.5,
              ...note,
            }}
          >
            すべてに同じだけ手はかけられない
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/icon-scale.png")}
          style={{
            flex: 0.85,
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
// P4 リスク基準: キーワード見出し ＋ 忌避↔選好のスペクトラム
// ---------------------------------------------------------------------------

const SpectrumEnd: React.FC<{ term: string; desc: string }> = ({ term, desc }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 4 * SCALE, flex: "none" }}>
    <b
      style={{
        fontSize: 12.5 * SCALE,
        fontWeight: 800,
        color: colors.primary600,
        whiteSpace: "nowrap",
      }}
    >
      {term}
    </b>
    <span style={{ fontSize: 10 * SCALE, color: colors.textSecondary, whiteSpace: "nowrap" }}>
      {desc}
    </span>
  </div>
);

const CriteriaScene: React.FC = () => {
  const lead = useAppear(0.35);
  const term = usePop(segStart(SEG_P4, 1));
  const alias = useAppear(segStart(SEG_P4, 2));
  const warn = useAppear(segStart(SEG_P4, 3));
  const spectrum = useAppear(segStart(SEG_P4, 4));
  return (
    <SlideShell
      heading="測る前に決めること"
      icon={<Ms name="policy" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
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
          gap: 4 * SCALE,
        }}
      >
        <span
          style={{
            fontSize: 11.5 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            ...lead,
          }}
        >
          どこから上を問題とするかの、判断の物差し
        </span>
        <b style={{ fontSize: 25 * SCALE, fontWeight: 800, lineHeight: 1.15, ...term }}>
          <span style={markerStyle}>リスク基準</span>
        </b>
        <span
          style={{
            fontSize: 12.5 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            ...alias,
          }}
        >
          ＝ リスク受容基準（どこまで受け入れるか）
        </span>
        <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...warn }}>
          後から動かすと <span style={markerPinkStyle}>都合のよい結論</span> になる
        </b>

        {/* 忌避 ←→ 選好（組織の姿勢が基準の厳しさに表れる） */}
        <div
          style={{
            marginTop: 4 * SCALE,
            width: "88%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2 * SCALE,
            ...spectrum,
          }}
        >
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 6 * SCALE }}>
            <SpectrumEnd term="リスク忌避" desc="避けたがる" />
            <div
              style={{
                flex: 1,
                height: 2.5 * SCALE,
                borderRadius: 999,
                backgroundColor: colors.primary300,
              }}
            />
            <SpectrumEnd term="リスク選好" desc="取りに行く" />
          </div>
          <span
            style={{ fontSize: 10 * SCALE, fontWeight: 700, lineHeight: 1.3, color: colors.textMuted }}
          >
            組織の姿勢が、基準の厳しさに表れる
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7 リスクマトリックス: 3×3（縦=影響の大きさ／横=発生のしやすさ）
// ---------------------------------------------------------------------------

type Level = "高" | "中" | "低";

const LEVEL_STYLE: Record<Level, { bg: string; fg: string }> = {
  高: { bg: colors.accentPinkSurface, fg: colors.accentPinkText },
  中: { bg: colors.primary100, fg: colors.primary800 },
  低: { bg: colors.primary50, fg: colors.textSecondary },
};

// 上の行が「影響 大」。左の列が「発生 低」
const MATRIX_ROWS: { impact: string; cells: Level[] }[] = [
  { impact: "大", cells: ["中", "高", "高"] },
  { impact: "中", cells: ["低", "中", "高"] },
  { impact: "小", cells: ["低", "低", "中"] },
];

const MatrixCell: React.FC<{ level: Level; delaySec: number; hero: boolean; heroAtSec: number }> = ({
  level,
  delaySec,
  hero,
  heroAtSec,
}) => {
  const appear = useAppear(delaySec, { dy: 10 });
  const on = useProgress(hero ? heroAtSec : 99999, 0.4);
  const borderColor = interpolateColors(
    on,
    [0, 1],
    [LEVEL_STYLE[level].bg, colors.accentPink],
  );
  return (
    <div
      style={{
        flex: 1,
        height: 31 * SCALE,
        borderRadius: 12 * SCALE,
        backgroundColor: LEVEL_STYLE[level].bg,
        border: `${2 * SCALE}px solid ${borderColor}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5 * SCALE,
        ...appear,
      }}
    >
      <b style={{ fontSize: 17 * SCALE, fontWeight: 800, color: LEVEL_STYLE[level].fg, lineHeight: 1 }}>
        {level}
      </b>
      {hero ? (
        <span style={{ fontSize: 9 * SCALE, fontWeight: 700, color: colors.accentPinkText }}>
          いちばん高い
        </span>
      ) : null}
    </div>
  );
};

const MatrixRow: React.FC<{
  impact: string;
  cells: Level[];
  rowIndex: number;
  baseSec: number;
  heroAtSec: number;
}> = ({ impact, cells, rowIndex, baseSec, heroAtSec }) => {
  const label = useAppear(0.4 + rowIndex * 0.12);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 * SCALE }}>
      <b
        style={{
          width: 12 * SCALE,
          flex: "none",
          textAlign: "center",
          fontSize: 12 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          ...label,
        }}
      >
        {impact}
      </b>
      {cells.map((lv, ci) => (
        <MatrixCell
          key={`${impact}-${ci}`}
          level={lv}
          delaySec={baseSec + (rowIndex * 3 + ci) * 0.1}
          hero={rowIndex === 0 && ci === 2}
          heroAtSec={heroAtSec}
        />
      ))}
    </div>
  );
};

const MatrixScene2: React.FC = () => {
  const axisX = useAppear(0.3);
  const axisY = useAppear(0.3);
  const levelNote = useAppear(segStart(SEG_P7, 2));
  return (
    <SlideShell
      heading="リスクマトリックス"
      icon={<Ms name="grid_view" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.2%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        {/* 縦軸のタイトル */}
        <span
          style={{
            writingMode: "vertical-rl",
            fontSize: 11 * SCALE,
            fontWeight: 800,
            color: colors.textMuted,
            ...axisY,
          }}
        >
          影響の大きさ
        </span>

        <div style={{ width: 260 * SCALE, display: "flex", flexDirection: "column", gap: 4 * SCALE }}>
          {MATRIX_ROWS.map((r, ri) => (
            <MatrixRow
              key={r.impact}
              impact={r.impact}
              cells={r.cells}
              rowIndex={ri}
              baseSec={segStart(SEG_P7, 1)}
              heroAtSec={segStart(SEG_P7, 3)}
            />
          ))}

          {/* 横軸のラベル */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 * SCALE, ...axisX }}>
            <span style={{ width: 12 * SCALE, flex: "none" }} />
            {["低", "中", "高"].map((c) => (
              <b
                key={c}
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 11 * SCALE,
                  fontWeight: 800,
                  color: colors.textSecondary,
                }}
              >
                {c}
              </b>
            ))}
          </div>
          <div style={{ display: "flex", ...axisX }}>
            <span style={{ width: 12 * SCALE, flex: "none" }} />
            <span
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 11 * SCALE,
                fontWeight: 800,
                color: colors.textMuted,
              }}
            >
              発生のしやすさ →
            </span>
          </div>

          <span
            style={{
              marginTop: 3 * SCALE,
              alignSelf: "center",
              fontSize: 11 * SCALE,
              fontWeight: 800,
              ...levelNote,
            }}
          >
            マスが表す段階 ＝ <span style={markerStyle}>リスクレベル</span>
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8 リスク値の式（式ドン）★ 呼称の主担当
// ---------------------------------------------------------------------------

const FormulaTerm: React.FC<{
  label: string;
  gloss?: string;
  hero?: boolean;
  delaySec: number;
  glossAtSec: number;
}> = ({ label, gloss, hero, delaySec, glossAtSec }) => {
  const box = usePop(delaySec);
  const g = useAppear(glossAtSec);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 * SCALE }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: hero ? colors.primary600 : colors.surface,
          border: hero ? "none" : `${2 * SCALE}px solid ${colors.primary300}`,
          borderRadius: 14 * SCALE,
          padding: `${11 * SCALE}px ${13 * SCALE}px`,
          ...box,
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
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
          ...g,
        }}
      >
        {gloss ?? ""}
      </span>
    </div>
  );
};

const Operator: React.FC<{ sign: string }> = ({ sign }) => (
  <b
    style={{
      fontSize: 18 * SCALE,
      fontWeight: 800,
      color: colors.textMuted,
      marginBottom: 5 * SCALE,
    }}
  >
    {sign}
  </b>
);

const FormulaScene: React.FC = () => {
  const t1 = segStart(SEG_P8, 1);
  const glossAt = segStart(SEG_P8, 2);
  const note = useAppear(segStart(SEG_P8, 3));
  return (
    <SlideShell
      heading="リスク値の求め方"
      icon={<Ms name="calculate" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
          <FormulaTerm label="リスク値" hero delaySec={t1} glossAtSec={glossAt} />
          <Operator sign="＝" />
          <FormulaTerm label="重要度" gloss="資産の価値" delaySec={t1 + 0.9} glossAtSec={glossAt} />
          <Operator sign="×" />
          <FormulaTerm label="脅威" gloss="起こりやすさ" delaySec={t1 + 1.7} glossAtSec={glossAt + 0.5} />
          <Operator sign="×" />
          <FormulaTerm label="脆弱性" gloss="残った弱点" delaySec={t1 + 2.5} glossAtSec={glossAt + 1.0} />
        </div>
        <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, ...note }}>
          掛け算 → <span style={markerStyle}>どれか一つが小さければ、リスク値も小さい</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9【計算ワーク】台帳の1行 → 穴埋め式 → 答え
// 穴埋め（？）が s09-3 の gapBeforeSec 1.5 秒のあいだ表示され、そこで自分で掛け算する
// ---------------------------------------------------------------------------

const WORK_VALUES = [
  { label: "重要度", value: 3 },
  { label: "脅威", value: 2 },
  { label: "脆弱性", value: 2 },
];

const WorkValueCell: React.FC<{ label: string; value: number; pickAtSec: number }> = ({
  label,
  value,
  pickAtSec,
}) => {
  const on = useProgress(pickAtSec, 0.35);
  const bg = interpolateColors(on, [0, 1], [colors.bg, colors.primary50]);
  const bd = interpolateColors(on, [0, 1], [colors.border, colors.primary500]);
  const fg = interpolateColors(on, [0, 1], [colors.textPrimary, colors.primary600]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5 * SCALE,
        width: 42 * SCALE,
        backgroundColor: bg,
        border: `${2 * SCALE}px solid ${bd}`,
        borderRadius: 10 * SCALE,
        padding: `${5 * SCALE}px 0`,
      }}
    >
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <b style={{ fontSize: 19 * SCALE, fontWeight: 800, fontFamily: fontMono, lineHeight: 1, color: fg }}>
        {value}
      </b>
    </div>
  );
};

const Slot: React.FC<{ text: string }> = ({ text }) => (
  <b
    style={{
      width: 20 * SCALE,
      textAlign: "center",
      fontSize: 24 * SCALE,
      fontWeight: 800,
      fontFamily: fontMono,
      lineHeight: 1,
      color: colors.primary600,
    }}
  >
    {text}
  </b>
);

const AnswerSlot: React.FC<{ revealAtSec: number }> = ({ revealAtSec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const revealed = frame / fps >= revealAtSec;
  const pop = usePop(revealAtSec);
  return (
    <div
      style={{
        width: 40 * SCALE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {revealed ? (
        <b
          style={{
            fontSize: 30 * SCALE,
            fontWeight: 800,
            fontFamily: fontMono,
            lineHeight: 1,
            color: colors.accentPinkText,
            ...pop,
          }}
        >
          12
        </b>
      ) : (
        <b
          style={{
            fontSize: 26 * SCALE,
            fontWeight: 800,
            lineHeight: 1,
            color: colors.textMuted,
          }}
        >
          ？
        </b>
      )}
    </div>
  );
};

const CalcWorkScene: React.FC = () => {
  const pickBase = segStart(SEG_P9, 1);
  const row = useAppear(0.35);
  // 3つの値を読み終えるころに矢印 → 穴埋めの式を出す（？のまま gapBeforeSec の無音に入る）
  const arrow = useAppear(pickBase + 3.2);
  const formula = useAppear(pickBase + 4.0);
  const note = useAppear(segStart(SEG_P9, 3));
  return (
    <SlideShell
      heading="やってみよう：リスク値の計算"
      icon={<Ms name="edit" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
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
          gap: 6 * SCALE,
        }}
      >
        {/* 情報資産台帳の1行 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 14 * SCALE,
            padding: `${7 * SCALE}px ${16 * SCALE}px`,
            ...row,
          }}
        >
          <Ms name="inventory_2" size={16 * SCALE} />
          <b style={{ fontSize: 14 * SCALE, fontWeight: 800, marginRight: 6 * SCALE }}>顧客名簿</b>
          {WORK_VALUES.map((v, i) => (
            <WorkValueCell
              key={v.label}
              label={v.label}
              value={v.value}
              pickAtSec={pickBase + i * 0.5}
            />
          ))}
        </div>

        <span
          style={{
            fontSize: 11 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            ...arrow,
          }}
        >
          ↓ 3つを掛ける
        </span>

        {/* 穴埋めの式 */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE, ...formula }}>
          <b style={{ fontSize: 15 * SCALE, fontWeight: 800, marginRight: 4 * SCALE }}>リスク値</b>
          <b style={{ fontSize: 18 * SCALE, fontWeight: 800, color: colors.textMuted }}>＝</b>
          <Slot text="3" />
          <b style={{ fontSize: 16 * SCALE, fontWeight: 800, color: colors.textMuted }}>×</b>
          <Slot text="2" />
          <b style={{ fontSize: 16 * SCALE, fontWeight: 800, color: colors.textMuted }}>×</b>
          <Slot text="2" />
          <b style={{ fontSize: 18 * SCALE, fontWeight: 800, color: colors.textMuted }}>＝</b>
          <AnswerSlot revealAtSec={segStart(SEG_P9, 2) + 1.1} />
        </div>

        <b style={{ marginTop: 2 * SCALE, fontSize: 12.5 * SCALE, fontWeight: 800, ...note }}>
          <span style={markerStyle}>表から3つ拾って掛けるだけ</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10 リスク評価: 大きさの降順 ＋ リスク基準の線 ＋ 優先順位バッジ
// ---------------------------------------------------------------------------

const EVAL_MAX = 12;
const EVAL_CRITERIA = 6;
const NAME_W = 96 * SCALE;
const BADGE_W = 13 * SCALE;
const VALUE_W = 16 * SCALE;
const TRACK_LEFT = BADGE_W + NAME_W + 8 * SCALE; // バッジ + 名前 + gap
const TRACK_RIGHT = VALUE_W + 4 * SCALE;

const EVAL_ROWS = [
  { name: "顧客名簿の漏えい", value: 12, rank: "1" },
  { name: "サーバの停止", value: 8, rank: "2" },
  { name: "書類の紛失", value: 3, rank: "" },
];

const EvalRow: React.FC<{
  name: string;
  value: number;
  rank: string;
  index: number;
  rankAtSec: number;
}> = ({ name, value, rank, index, rankAtSec }) => {
  const appear = useAppear(0.4 + index * 0.2);
  const grow = useProgress(0.6 + index * 0.2, 0.7);
  const badge = usePop(rankAtSec + index * 0.4);
  const over = value > EVAL_CRITERIA;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 * SCALE, ...appear }}>
      <div style={{ width: BADGE_W, flex: "none", display: "flex", justifyContent: "center" }}>
        {rank ? (
          <span
            style={{
              width: 12 * SCALE,
              height: 12 * SCALE,
              borderRadius: 999,
              backgroundColor: colors.primary600,
              color: colors.surface,
              fontSize: 10 * SCALE,
              fontWeight: 800,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...badge,
            }}
          >
            {rank}
          </span>
        ) : null}
      </div>
      <b
        style={{
          width: NAME_W,
          flex: "none",
          fontSize: 12 * SCALE,
          fontWeight: 800,
          whiteSpace: "nowrap",
          color: over ? colors.textPrimary : colors.textMuted,
        }}
      >
        {name}
      </b>
      <div
        style={{
          flex: 1,
          height: 11 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.bg,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(value / EVAL_MAX) * 100 * grow}%`,
            height: "100%",
            borderRadius: 999,
            backgroundColor: over ? colors.primary600 : colors.primary300,
          }}
        />
      </div>
      <b
        style={{
          width: VALUE_W,
          flex: "none",
          textAlign: "right",
          fontSize: 14 * SCALE,
          fontWeight: 800,
          fontFamily: fontMono,
          color: over ? colors.primary600 : colors.textMuted,
        }}
      >
        {value}
      </b>
    </div>
  );
};

const EvaluateScene: React.FC = () => {
  const header = useAppear(0.35);
  const criteria = useAppear(segStart(SEG_P10, 1));
  const foot = useAppear(segStart(SEG_P10, 3));
  return (
    <SlideShell
      heading="基準と比べて順位を付ける"
      icon={<Ms name="leaderboard" size={videoType.slideHeadIcon} />}
      narration={SEG_P10}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4 * SCALE,
        }}
      >
        {/* 値の列見出し ＋ リスク基準のラベル（縦線の真上） */}
        <div
          style={{
            height: 24 * SCALE,
            marginLeft: TRACK_LEFT,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: VALUE_W,
              textAlign: "right",
              fontSize: 9.5 * SCALE,
              fontWeight: 700,
              color: colors.textMuted,
              whiteSpace: "nowrap",
              ...header,
            }}
          >
            リスク値
          </span>
          <div
            style={{
              position: "absolute",
              left: `calc((100% - ${TRACK_RIGHT}px) * ${EVAL_CRITERIA / EVAL_MAX})`,
              bottom: 0,
              transform: "translateX(-50%)",
            }}
          >
            <span
              style={{
                display: "block",
                whiteSpace: "nowrap",
                backgroundColor: colors.textPrimary,
                color: colors.surface,
                borderRadius: 999,
                padding: `${3 * SCALE}px ${10 * SCALE}px`,
                fontSize: 10 * SCALE,
                fontWeight: 800,
                ...criteria,
              }}
            >
              リスク基準
            </span>
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 7 * SCALE }}>
          {EVAL_ROWS.map((r, i) => (
            <EvalRow
              key={r.name}
              name={r.name}
              value={r.value}
              rank={r.rank}
              index={i}
              rankAtSec={segStart(SEG_P10, 2)}
            />
          ))}
          {/* 基準の縦線（バーの領域だけに引く） */}
          <div
            style={{
              position: "absolute",
              left: TRACK_LEFT,
              right: TRACK_RIGHT,
              top: 0,
              bottom: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `${(EVAL_CRITERIA / EVAL_MAX) * 100}%`,
                top: 0,
                bottom: 0,
                borderLeft: `${2 * SCALE}px dashed ${colors.textPrimary}`,
                ...criteria,
              }}
            />
          </div>
        </div>

        <span
          style={{
            marginTop: 8 * SCALE,
            alignSelf: "flex-end",
            marginRight: TRACK_RIGHT,
            fontSize: 10 * SCALE,
            fontWeight: 800,
            color: colors.primary800,
            backgroundColor: colors.primary50,
            borderRadius: 999,
            padding: `${4 * SCALE}px ${13 * SCALE}px`,
            whiteSpace: "nowrap",
            ...foot,
          }}
        >
          次回 → リスク対応
        </span>
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

export const SgL24RiskAssessment: VideoSpec = {
  id: "sg-L24-risk-assessment",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "リスクアセスメント",
      keywords: ["リスク基準", "リスク値", "マトリックス"],
    },
    {
      pattern: "custom",
      name: "intro",
      durationSec: 6,
      narration: SEG_P2,
      component: IntroScene,
    },
    {
      pattern: "flow",
      heading: "リスクアセスメントの3段階",
      icon: "flowchart",
      steps: [
        { abc: "1", name: "特定", sub: "洗い出す" },
        { abc: "2", name: "分析", sub: "大きさを測る" },
        { abc: "3", name: "評価", sub: "順位を付ける" },
      ],
      highlightAtSec: [segStart(SEG_P3, 1), segStart(SEG_P3, 2), segStart(SEG_P3, 3)],
      narration: SEG_P3,
    },
    {
      pattern: "custom",
      name: "criteria",
      durationSec: 7,
      narration: SEG_P4,
      component: CriteriaScene,
    },
    {
      pattern: "bullets",
      heading: "リスク特定",
      icon: "search",
      bullets: [
        { text: "起きうることを洗い出す", sub: "資産・脅威・弱点の組合せ" },
        { text: "リスク源をつかむ", sub: "リスクを生み出すもと" },
        { text: "リスク所有者を決める", sub: "対応の責任と権限をもつ人", marker: "blue" },
      ],
      appearAtSec: [segStart(SEG_P5, 1), segStart(SEG_P5, 2), segStart(SEG_P5, 3)],
      narration: SEG_P5,
      illust: "images/ipa_sg/person-leader-point.png",
    },
    {
      pattern: "vs",
      heading: "リスク分析：2つの測り方",
      icon: "compare_arrows",
      left: {
        title: "定性的分析",
        icon: "label",
        rows: [
          { k: "測り方", v: "高・中・低の言葉" },
          { k: "代表例", v: "リスクマトリックス" },
          { k: "向くとき", v: "金額にしにくいリスク" },
        ],
      },
      right: {
        title: "定量的分析",
        icon: "calculate",
        rows: [
          { k: "測り方", v: "金額や点数の数値" },
          { k: "代表例", v: "年間予想損失額・得点法" },
          { k: "向くとき", v: "費用と見比べたいとき" },
        ],
      },
      columnAtSec: [segStart(SEG_P6, 1), segStart(SEG_P6, 2)],
      narration: SEG_P6,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "matrix",
      durationSec: 7,
      narration: SEG_P7,
      component: MatrixScene2,
    },
    {
      pattern: "custom",
      name: "formula",
      durationSec: 7,
      narration: SEG_P8,
      component: FormulaScene,
    },
    {
      pattern: "custom",
      name: "calc-work",
      durationSec: 8,
      narration: SEG_P9,
      component: CalcWorkScene,
    },
    {
      pattern: "custom",
      name: "evaluate",
      durationSec: 7,
      narration: SEG_P10,
      component: EvaluateScene,
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
      question: "3つの段階の正しい順番は？",
      choices: [
        { key: "A", text: "分析 → 特定 → 評価" },
        { key: "B", text: "特定 → 分析 → 評価", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "リスク基準を先に決める理由は？",
      choices: [
        { key: "A", text: "後から都合よく変えないため", correct: true },
        { key: "B", text: "計算の手間を減らせるため" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "リスクレベルが最も高いのは？",
      choices: [
        { key: "A", text: "起きやすいが影響は小さい" },
        { key: "B", text: "起きやすく影響も大きい", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "特定→分析→評価の3段階で進める", checkAtSec: segStart(SEG_P15, 0) },
        { text: "測る前にリスク基準を決めておく", checkAtSec: segStart(SEG_P15, 1) },
        { text: "リスク値＝重要度×脅威×脆弱性", checkAtSec: segStart(SEG_P15, 2) },
      ],
      narration: SEG_P15,
      transitionIn: "wipe",
    },
  ],
};
