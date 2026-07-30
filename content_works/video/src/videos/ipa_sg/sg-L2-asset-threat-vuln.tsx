import { Img, staticFile } from "remotion";
import { colors, markerStyle, radius, videoType, SCALE } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L2-asset-threat-vuln.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L2: 情報資産・脅威・脆弱性
 *
 * 発注書は content_works/ipa_sg/orders/L2.md、シナリオは
 * narration/ipa_sg/sg-L2-asset-threat-vuln.md。
 *
 * 前半（情報資産の広がり → 脅威×脆弱性＝リスクの関係 → 片方だけでは事故にならない）→
 * wipe-light で「脅威の地図」へ転換 → 脆弱性の中身（技術／人／シャドーIT）→
 * wipe-light で事業影響へ → クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * この回が「情報資産・脅威・脆弱性・リスク」の呼称と定義の入口なので、以降の回は
 * narration/ipa_sg/sg-L2-asset-threat-vuln.md の「用語の呼称」表に揃えること。
 *
 * 音声と字幕が違う箇所: 「シャドーIT」は TTS の英字読みを避けるため
 * 音声用テキスト（jobs.json）だけ「シャドーアイティー」と仮名書きにしている。
 * 字幕（下の N() 第2引数）は「シャドーIT」のまま — 意図的な食い違いなので直さないこと。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L2-asset-threat-vuln");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "今回は、情報セキュリティの土台になる、情報資産、脅威、脆弱性の三つを学びます。"),
  N("s02-2.mp3", "まず、守るべき対象が情報資産です。"),
  N("s02-3.mp3", "会社が持っている、価値のある情報とその入れ物すべてを指します。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "情報資産は、パソコンの中のデータだけではありません。"),
  N("s03-2.mp3", "印刷された書類やノートも、立派な情報資産です。"),
  N("s03-3.mp3", "パソコンやサーバなど、情報を扱う機器そのものも含まれます。"),
  N("s03-4.mp3", "社員が頭の中に持っているノウハウや、会社の評判も資産です。"),
  N("s03-5.mp3", "形のないものまで含めて洗い出すのが、守りの第一歩になります。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "次に、脅威と脆弱性です。"),
  N("s04-2.mp3", "脅威とは、情報資産に損害を与える原因となるものです。"),
  N("s04-3.mp3", "脆弱性とは、その脅威につけこまれる、資産側の弱点です。"),
  N("s04-4.mp3", "脅威が脆弱性を突いたときに、損害が起きる可能性が生まれます。"),
  N("s04-5.mp3", "この可能性の大きさを、リスクと呼びます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "大切なのは、片方だけでは事故にならない、という点です。"),
  N("s05-2.mp3", "泥棒がうろついていても、金庫の鍵が閉まっていれば盗まれません。"),
  N("s05-3.mp3", "鍵が開けっ放しでも、泥棒が来なければ被害は起きません。"),
  N("s05-4.mp3", "脅威と脆弱性がそろったときに、はじめてリスクになります。"),
  N("s05-5.mp3", "私たちが減らせるのは、多くの場合、脆弱性の側です。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "その脅威は、大きく二つに分けて整理できます。"),
  N("s06-2.mp3", "一つは環境的脅威で、地震や火災、機器の故障などです。"),
  N("s06-3.mp3", "人の意思とは関係なく起きる、事故や災害が当てはまります。"),
  N("s06-4.mp3", "もう一つは人為的脅威で、人が引き起こすものです。"),
  N("s06-5.mp3", "わざと行う故意と、うっかりの過失に分かれます。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "ここからは、脆弱性の中身を見ていきます。"),
  N("s07-2.mp3", "プログラムの作り込みの誤りを、バグと呼びます。"),
  N("s07-3.mp3", "バグのうち、セキュリティ上の弱点になるものがセキュリティホールです。"),
  N("s07-4.mp3", "危ないのは、見つかってから修正されるまでの時間です。"),
  N("s07-5.mp3", "その間に攻撃されると、防ぎようがありません。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "弱点は、システムだけでなく人にもあります。"),
  N("s08-2.mp3", "忙しさや思い込みから、確認を省いてしまうことがあります。"),
  N("s08-3.mp3", "規則を知らない、あるいは守らないことも弱点になります。"),
  N("s08-4.mp3", "こうした人の弱点を突く手口は、次回くわしく学びます。"),
];

const SEG_P9 = [
  // 字幕は「シャドーIT」、音声は「シャドーアイティー」（誤読対策・上のコメント参照）
  N("s09-1.mp3", "もう一つ見落としやすいのが、シャドーITです。"),
  N("s09-2.mp3", "会社が把握していないまま使われている、機器やサービスを指します。"),
  N("s09-3.mp3", "個人のクラウドサービスに、仕事のファイルを置くのが典型です。"),
  N("s09-4.mp3", "見えていない資産は、守ることも直すこともできません。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "最後に、事故が起きたときの影響を考えます。"),
  N("s10-2.mp3", "情報が漏れることよりも、事業が止まることの方が痛手になります。"),
  N("s10-3.mp3", "事故は、事業継続そのものへの脅威だといえます。"),
  N("s10-4.mp3", "裏を返せば、高いセキュリティ水準は会社の評価を高めます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "鍵が壊れたままの倉庫に、泥棒がねらいをつけています。"),
  N("s12-3.mp3", "このうち、脆弱性にあたるのはどちらでしょうか。"),
  N("s12-4.mp3", "正解は、倉庫の鍵が壊れていることです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "地震や火災による被害は、どちらの脅威に分類されるでしょうか。"),
  N("s13-3.mp3", "正解は、環境的脅威です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  // 字幕は「シャドーIT」、音声は「シャドーアイティー」（誤読対策）
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "シャドーITが問題になるのは、なぜでしょうか。"),
  N("s14-3.mp3", "正解は、会社が把握できず、対策が打てないからです。", { gapBeforeSec: 1.8 }),
];

const SEG_P15 = [
  N("s15-1.mp3", "守るべき対象が情報資産、損害の原因が脅威、資産側の弱点が脆弱性です。"),
  N("s15-2.mp3", "脅威が脆弱性を突いたときに、リスクが現実の事故になります。"),
  N("s15-3.mp3", "見えない資産や人の弱点をなくすことが、事業を守ることにつながります。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P2: 導入（左テキスト + 右イラスト）— 3語を予告し、まず情報資産に絞る
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const subAppear = useAppear(segStart(SEG_P2, 1));
  const illustAppear = useAppear(0.5);

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{ flex: 1.3, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}
        >
          {/* 自動折り返しに任せるとマーカーが行をまたいで切れるので、改行位置は自分で決める */}
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.45,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"セキュリティの\n"}
            <span style={markerStyle}>土台になる3語</span>
          </span>
          {/* 3語を並べ、この回でまず掘り下げる「情報資産」だけを濃色にする */}
          <span
            style={{
              fontSize: 13 * SCALE,
              fontWeight: 700,
              lineHeight: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 2 * SCALE,
              ...subAppear,
            }}
          >
            <span style={{ color: colors.primary600 }}>情報資産＝守るべき対象</span>
            <span style={{ color: colors.textSecondary }}>脅威・脆弱性</span>
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/scene-office.png")}
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
// P3: 情報資産はデータだけではない（アイコン5連 + 締めの一行）
// ---------------------------------------------------------------------------

const ASSET_ITEMS: { icon: string; label: string; sub: string; atSec: number }[] = [
  { icon: "storage", label: "データ", sub: "ファイル・DB", atSec: 0.3 },
  { icon: "description", label: "紙の書類", sub: "帳票・ノート", atSec: segStart(SEG_P3, 1) },
  { icon: "computer", label: "機器", sub: "PC・サーバ", atSec: segStart(SEG_P3, 2) },
  { icon: "psychology", label: "知識", sub: "社員のノウハウ", atSec: segStart(SEG_P3, 3) },
  { icon: "star", label: "評判", sub: "会社の信用", atSec: segStart(SEG_P3, 3) + 0.7 },
];

const AssetItem: React.FC<{ icon: string; label: string; sub: string; atSec: number }> = ({
  icon,
  label,
  sub,
  atSec,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3 * SCALE,
      width: 74 * SCALE,
      ...usePop(atSec),
    }}
  >
    <span
      style={{
        width: 42 * SCALE,
        height: 42 * SCALE,
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
    <b style={{ fontSize: 12.5 * SCALE }}>{label}</b>
    <span style={{ fontSize: 9.5 * SCALE, color: colors.textSecondary }}>{sub}</span>
  </div>
);

const AssetScene: React.FC = () => {
  const noteAppear = useAppear(segStart(SEG_P3, 4));
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
          gap: 13 * SCALE,
        }}
      >
        <div style={{ display: "flex", gap: 6 * SCALE }}>
          {ASSET_ITEMS.map((x) => (
            <AssetItem key={x.label} {...x} />
          ))}
        </div>
        {/* 画面は要点だけ（字幕がナレーション全文を出すので、同じ文を書かない） */}
        <b style={{ fontSize: 13.5 * SCALE, ...noteAppear }}>
          <span style={markerStyle}>形のないもの</span>も情報資産
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 脅威 × 脆弱性 ＝ リスク（式レイアウト）★この回の核心
// ---------------------------------------------------------------------------

const TermCard: React.FC<{
  icon: string;
  term: string;
  sub: string;
  atSec: number;
  tone: "plain" | "accent";
}> = ({ icon, term, sub, atSec, tone }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4 * SCALE,
      padding: `${13 * SCALE}px ${6 * SCALE}px`,
      borderRadius: radius.lg * SCALE,
      backgroundColor: tone === "accent" ? colors.primary600 : colors.surface,
      border: `${1 * SCALE}px solid ${tone === "accent" ? colors.primary600 : colors.border}`,
      color: tone === "accent" ? colors.textPrimaryDark : colors.textPrimary,
      ...usePop(atSec),
    }}
  >
    <span style={{ color: tone === "accent" ? colors.textPrimaryDark : colors.primary600, display: "flex" }}>
      <Ms name={icon} size={26 * SCALE} />
    </span>
    <b style={{ fontSize: 16 * SCALE }}>{term}</b>
    <span
      style={{
        fontSize: 10 * SCALE,
        fontWeight: 700,
        textAlign: "center",
        color: tone === "accent" ? colors.primary100 : colors.textSecondary,
      }}
    >
      {sub}
    </span>
  </div>
);

const Operator: React.FC<{ mark: string; atSec: number }> = ({ mark, atSec }) => (
  <span
    style={{
      flex: "none",
      width: 14 * SCALE,
      textAlign: "center",
      fontSize: 22 * SCALE,
      fontWeight: 800,
      color: colors.textMuted,
      ...useAppear(atSec),
    }}
  >
    {mark}
  </span>
);

const RelationScene: React.FC = () => (
  <SlideShell
    heading="脅威・脆弱性・リスク"
    icon={<Ms name="account_tree" size={videoType.slideHeadIcon} />}
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
        gap: 4 * SCALE,
      }}
    >
      <TermCard
        icon="warning"
        term="脅威"
        sub="損害を与える原因"
        atSec={segStart(SEG_P4, 1)}
        tone="plain"
      />
      <Operator mark="×" atSec={segStart(SEG_P4, 2)} />
      <TermCard
        icon="lock_open"
        term="脆弱性"
        sub="つけこまれる弱点"
        atSec={segStart(SEG_P4, 2)}
        tone="plain"
      />
      <Operator mark="＝" atSec={segStart(SEG_P4, 3)} />
      <TermCard
        icon="gpp_maybe"
        term="リスク"
        sub="損害が起きる可能性"
        atSec={segStart(SEG_P4, 4)}
        tone="accent"
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P5: 片方だけでは事故にならない（3行のケース表）
// 3行目（両方そろう）だけを主色で強調する。正誤ではないので semantic 色は使わない
// ---------------------------------------------------------------------------

const CaseChip: React.FC<{ text: string; on: boolean }> = ({ text, on }) => (
  <span
    style={{
      flex: 1,
      minWidth: 0,
      textAlign: "center",
      padding: `${7 * SCALE}px ${4 * SCALE}px`,
      borderRadius: radius.md * SCALE,
      fontSize: 11.5 * SCALE,
      fontWeight: 700,
      backgroundColor: on ? colors.primary50 : colors.surface,
      border: `${1 * SCALE}px solid ${on ? colors.primary300 : colors.border}`,
      color: on ? colors.primary800 : colors.textMuted,
    }}
  >
    {text}
  </span>
);

const CaseRow: React.FC<{
  threat: string;
  threatOn: boolean;
  vuln: string;
  vulnOn: boolean;
  resultIcon: string;
  result: string;
  hot: boolean;
  atSec: number;
}> = ({ threat, threatOn, vuln, vulnOn, resultIcon, result, hot, atSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 4 * SCALE,
      ...useAppear(atSec),
    }}
  >
    <CaseChip text={threat} on={threatOn} />
    <span style={{ flex: "none", width: 6 * SCALE, textAlign: "center", fontSize: 13 * SCALE, color: colors.textMuted }}>
      ＋
    </span>
    <CaseChip text={vuln} on={vulnOn} />
    {/* 矢印は Material Symbols に頼らずテキストで出す（icons.md のリスト外の名前は文字列のまま出る） */}
    <span
      style={{
        flex: "none",
        width: 10 * SCALE,
        textAlign: "center",
        fontSize: 15 * SCALE,
        fontWeight: 800,
        color: colors.textMuted,
      }}
    >
      →
    </span>
    {/* 結果チップはアイコン＋文字が1行に収まる幅を確保する（詰めると「被害な／し」と折り返す） */}
    <span
      style={{
        flex: "none",
        width: 84 * SCALE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        gap: 3 * SCALE,
        padding: `${7 * SCALE}px 0`,
        borderRadius: radius.md * SCALE,
        fontSize: 12 * SCALE,
        fontWeight: 800,
        backgroundColor: hot ? colors.primary600 : colors.surface,
        border: `${1 * SCALE}px solid ${hot ? colors.primary600 : colors.border}`,
        color: hot ? colors.textPrimaryDark : colors.textSecondary,
      }}
    >
      <Ms name={resultIcon} size={15 * SCALE} />
      {result}
    </span>
  </div>
);

const CaseScene: React.FC = () => {
  const noteAppear = useAppear(segStart(SEG_P5, 4));
  return (
    <SlideShell
      heading="片方だけでは事故にならない"
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
          gap: 6 * SCALE,
        }}
      >
        <CaseRow
          threat="泥棒がいる"
          threatOn
          vuln="鍵は閉まっている"
          vulnOn={false}
          resultIcon="shield"
          result="被害なし"
          hot={false}
          atSec={segStart(SEG_P5, 1)}
        />
        <CaseRow
          threat="泥棒は来ない"
          threatOn={false}
          vuln="鍵が開いている"
          vulnOn
          resultIcon="shield"
          result="被害なし"
          hot={false}
          atSec={segStart(SEG_P5, 2)}
        />
        <CaseRow
          threat="泥棒がいる"
          threatOn
          vuln="鍵が開いている"
          vulnOn
          resultIcon="warning"
          result="リスク"
          hot
          atSec={segStart(SEG_P5, 3)}
        />
        <b style={{ fontSize: 13 * SCALE, textAlign: "center", marginTop: 2 * SCALE, ...noteAppear }}>
          減らせるのは<span style={markerStyle}>脆弱性の側</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 脅威の地図（ツリー分岐）— 分類だけを示す。個々の攻撃名は出さない（発注書 L2.md）
// 線は SVG ではなく div（幅・高さを useProgress で伸ばす）で引く。座標のズレが起きない
// ---------------------------------------------------------------------------

const CONNECTOR_W = 24 * SCALE;

const TreeConnector: React.FC = () => {
  const trunk = useProgress(segStart(SEG_P6, 0) + 0.3, 0.4);
  const spine = useProgress(segStart(SEG_P6, 0) + 0.6, 0.5);
  const upper = useProgress(segStart(SEG_P6, 1), 0.35);
  const lower = useProgress(segStart(SEG_P6, 3), 0.35);
  const lineW = 1.2 * SCALE;
  const half = CONNECTOR_W / 2;

  return (
    <div style={{ flex: "none", width: CONNECTOR_W, alignSelf: "stretch", position: "relative" }}>
      {/* 幹（脅威 → 分岐点） */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          height: lineW,
          width: half * trunk,
          backgroundColor: colors.primary300,
        }}
      />
      {/* 縦の背骨（上枝25% ↔ 下枝75%） */}
      <div
        style={{
          position: "absolute",
          left: half - lineW / 2,
          top: `${50 - 25 * spine}%`,
          height: `${50 * spine}%`,
          width: lineW,
          backgroundColor: colors.primary300,
        }}
      />
      {/* 上枝・下枝 */}
      <div
        style={{
          position: "absolute",
          left: half,
          top: "25%",
          height: lineW,
          width: half * upper,
          backgroundColor: colors.primary300,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: half,
          top: "75%",
          height: lineW,
          width: half * lower,
          backgroundColor: colors.primary300,
        }}
      />
    </div>
  );
};

const TreeBranch: React.FC<{
  icon: string;
  name: string;
  chips: string[];
  atSec: number;
  chipAtSec: number;
}> = ({ icon, name, chips, atSec, chipAtSec }) => {
  const cardAppear = useAppear(atSec);
  const chipAppear = useAppear(chipAtSec);
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4 * SCALE }}>
      <div
        style={{
          flex: "none",
          width: 106 * SCALE,
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          padding: `${9 * SCALE}px ${8 * SCALE}px`,
          borderRadius: radius.lg * SCALE,
          backgroundColor: colors.primary50,
          border: `${1 * SCALE}px solid ${colors.primary300}`,
          ...cardAppear,
        }}
      >
        <span style={{ color: colors.primary600, display: "flex", flex: "none" }}>
          <Ms name={icon} size={22 * SCALE} />
        </span>
        <b style={{ fontSize: 14 * SCALE, color: colors.primary800 }}>{name}</b>
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", gap: 4 * SCALE, ...chipAppear }}>
        {chips.map((c) => (
          <span
            key={c}
            style={{
              flex: 1,
              minWidth: 0,
              textAlign: "center",
              padding: `${7 * SCALE}px ${3 * SCALE}px`,
              borderRadius: radius.md * SCALE,
              backgroundColor: colors.surface,
              border: `${1 * SCALE}px solid ${colors.border}`,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

const ThreatMapScene: React.FC = () => (
  <SlideShell
    heading="脅威の分類"
    icon={<Ms name="category" size={videoType.slideHeadIcon} />}
    narration={SEG_P6}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        gap: 0,
      }}
    >
      <div
        style={{
          flex: "none",
          width: 76 * SCALE,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3 * SCALE,
          padding: `${13 * SCALE}px 0`,
          borderRadius: radius.lg * SCALE,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          ...usePop(0.2),
        }}
      >
        <Ms name="warning" size={26 * SCALE} />
        <b style={{ fontSize: 16 * SCALE }}>脅威</b>
      </div>
      <TreeConnector />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TreeBranch
          icon="bolt"
          name="環境的"
          chips={["地震・火災", "機器の故障"]}
          atSec={segStart(SEG_P6, 1)}
          chipAtSec={segStart(SEG_P6, 2)}
        />
        <TreeBranch
          icon="group"
          name="人為的"
          chips={["故意（わざと）", "過失（うっかり）"]}
          atSec={segStart(SEG_P6, 3)}
          chipAtSec={segStart(SEG_P6, 4)}
        />
      </div>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P7: バグとセキュリティホール（上：包含関係の2枚 / 下：時間軸）
// ---------------------------------------------------------------------------

const TIMELINE_MARKS: { at: number; label: string }[] = [
  // ラベルは折り返さない長さに抑える（幅 76×SCALE に収まる 5〜6文字）
  { at: 14, label: "作り込まれる" },
  { at: 47, label: "発見・公表" },
  { at: 83, label: "修正される" },
];

const TimelineMark: React.FC<{ at: number; label: string; atSec: number }> = ({
  at,
  label,
  atSec,
}) => (
  <>
    <span
      style={{
        position: "absolute",
        left: `${at}%`,
        top: 15 * SCALE,
        marginLeft: -3 * SCALE,
        width: 6 * SCALE,
        height: 6 * SCALE,
        borderRadius: radius.full,
        backgroundColor: colors.primary600,
        ...usePop(atSec),
      }}
    />
    <span
      style={{
        position: "absolute",
        left: `${at}%`,
        top: 25 * SCALE,
        marginLeft: -38 * SCALE,
        width: 76 * SCALE,
        textAlign: "center",
        fontSize: 10 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        ...useAppear(atSec),
      }}
    >
      {label}
    </span>
  </>
);

const DefCard: React.FC<{ term: string; sub: string; atSec: number; accent: boolean }> = ({
  term,
  sub,
  atSec,
  accent,
}) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2 * SCALE,
      padding: `${10 * SCALE}px ${11 * SCALE}px`,
      borderRadius: radius.lg * SCALE,
      backgroundColor: accent ? colors.primary50 : colors.surface,
      border: `${1 * SCALE}px solid ${accent ? colors.primary300 : colors.border}`,
      ...useAppear(atSec),
    }}
  >
    <b style={{ fontSize: 15 * SCALE, color: accent ? colors.primary800 : colors.textPrimary }}>
      {term}
    </b>
    <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>{sub}</span>
  </div>
);

const SecurityHoleScene: React.FC = () => {
  const band = useProgress(segStart(SEG_P7, 3), 0.7);
  const dangerAppear = useAppear(segStart(SEG_P7, 3));
  const bandLeft = TIMELINE_MARKS[1].at;
  const bandWidth = TIMELINE_MARKS[2].at - TIMELINE_MARKS[1].at;

  return (
    <SlideShell
      heading="技術的な弱点"
      icon={<Ms name="bug_report" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
          <DefCard
            term="バグ"
            sub="プログラムの作り込みの誤り"
            atSec={segStart(SEG_P7, 1)}
            accent={false}
          />
          <span
            style={{
              flex: "none",
              width: 36 * SCALE,
              textAlign: "center",
              whiteSpace: "nowrap",
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textMuted,
              ...useAppear(segStart(SEG_P7, 2)),
            }}
          >
            のうち
          </span>
          <DefCard
            term="セキュリティホール"
            sub="セキュリティ上の弱点になるバグ"
            atSec={segStart(SEG_P7, 2)}
            accent
          />
        </div>

        {/* 時間軸: 発見から修正までが「攻撃にさらされる期間」 */}
        <div style={{ position: "relative", height: 42 * SCALE }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 16.5 * SCALE,
              height: 3 * SCALE,
              borderRadius: radius.full,
              backgroundColor: colors.primary100,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${bandLeft}%`,
              top: 16.5 * SCALE,
              width: `${bandWidth * band}%`,
              height: 3 * SCALE,
              borderRadius: radius.full,
              backgroundColor: colors.primary600,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: `${bandLeft + bandWidth / 2}%`,
              top: 0,
              marginLeft: -50 * SCALE,
              width: 100 * SCALE,
              textAlign: "center",
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              ...dangerAppear,
            }}
          >
            この間が危ない
          </span>
          {TIMELINE_MARKS.map((m, i) => (
            <TimelineMark
              key={m.label}
              at={m.at}
              label={m.label}
              atSec={segStart(SEG_P7, i === 0 ? 1 : 3)}
            />
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 事故が事業に与える影響（大小の対比 + 結論バンド）
// ---------------------------------------------------------------------------

const ImpactScene: React.FC = () => {
  const leftAppear = useAppear(0.3);
  const rightAppear = usePop(segStart(SEG_P10, 1));
  const opAppear = useAppear(segStart(SEG_P10, 1));
  const noteAppear = useAppear(segStart(SEG_P10, 2));
  const bandAppear = useAppear(segStart(SEG_P10, 3));

  return (
    <SlideShell
      heading="事故が事業に与える影響"
      icon={<Ms name="trending_down" size={videoType.slideHeadIcon} />}
      narration={SEG_P10}
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 * SCALE }}>
          <div
            style={{
              flex: "none",
              width: 108 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              padding: `${11 * SCALE}px 0`,
              borderRadius: radius.lg * SCALE,
              backgroundColor: colors.surface,
              border: `${1 * SCALE}px solid ${colors.border}`,
              color: colors.textSecondary,
              ...leftAppear,
            }}
          >
            <Ms name="description" size={22 * SCALE} />
            <b style={{ fontSize: 13 * SCALE }}>情報が漏れる</b>
          </div>
          <span
            style={{
              flex: "none",
              fontSize: 24 * SCALE,
              fontWeight: 800,
              color: colors.textMuted,
              ...opAppear,
            }}
          >
            ＜
          </span>
          <div
            style={{
              flex: "none",
              width: 168 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
              padding: `${17 * SCALE}px 0`,
              borderRadius: radius.xl * SCALE,
              backgroundColor: colors.primary600,
              color: colors.textPrimaryDark,
              ...rightAppear,
            }}
          >
            <Ms name="storefront" size={30 * SCALE} />
            <b style={{ fontSize: 19 * SCALE }}>事業が止まる</b>
            <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.primary100, ...noteAppear }}>
              事業継続そのものへの脅威
            </span>
          </div>
        </div>
        <b style={{ fontSize: 13 * SCALE, textAlign: "center", ...bandAppear }}>
          守りは<span style={markerStyle}>会社の評価</span>も高める
        </b>
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

export const SgL2AssetThreatVuln: VideoSpec = {
  id: "sg-L2-asset-threat-vuln",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "何を、何から\n守るのか",
      keywords: ["情報資産", "脅威", "脆弱性"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "intro",
      durationSec: 5,
      narration: SEG_P2,
      component: IntroScene,
    },
    {
      pattern: "custom",
      name: "asset",
      durationSec: 6,
      narration: SEG_P3,
      component: AssetScene,
    },
    {
      pattern: "custom",
      name: "relation",
      durationSec: 6,
      narration: SEG_P4,
      component: RelationScene,
    },
    {
      pattern: "custom",
      name: "case-table",
      durationSec: 6,
      narration: SEG_P5,
      component: CaseScene,
    },
    {
      pattern: "custom",
      name: "threat-map",
      durationSec: 6,
      narration: SEG_P6,
      transitionIn: "wipe-light",
      component: ThreatMapScene,
    },
    {
      pattern: "custom",
      name: "security-hole",
      durationSec: 6,
      narration: SEG_P7,
      component: SecurityHoleScene,
    },
    {
      pattern: "bullets",
      heading: "人にもある弱点",
      icon: "psychology",
      bullets: [
        { text: "忙しさ・思い込み", sub: "確認を省いてしまう", marker: "blue" },
        { text: "知らない・守らない", sub: "規則が身についていない" },
      ],
      appearAtSec: [segStart(SEG_P8, 1), segStart(SEG_P8, 2)],
      narration: SEG_P8,
      illust: "images/ipa_sg/person-employee-f-worry.png",
    },
    {
      pattern: "term",
      chip: "組織の脆弱性",
      icon: "visibility_off",
      term: "シャドーIT",
      sub: "会社が把握していないまま使われている機器やサービス",
      narration: SEG_P9,
    },
    {
      pattern: "custom",
      name: "impact",
      durationSec: 6,
      narration: SEG_P10,
      transitionIn: "wipe-light",
      component: ImpactScene,
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
      question: "脆弱性にあたるのは？",
      choices: [
        { key: "A", text: "泥棒がねらっている" },
        { key: "B", text: "倉庫の鍵が壊れている", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 3),
    },
    {
      pattern: "quiz",
      question: "地震や火災はどの脅威？",
      choices: [
        { key: "A", text: "環境的脅威", correct: true },
        { key: "B", text: "人為的脅威（故意）" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "シャドーITの問題点は？",
      choices: [
        { key: "A", text: "利用料が会社の負担になる" },
        { key: "B", text: "把握できず対策が打てない", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "守るべき対象が情報資産、損害の原因が脅威、資産側の弱点が脆弱性です。",
          checkAtSec: segStart(SEG_P15, 0),
        },
        {
          text: "脅威が脆弱性を突いたときに、リスクが現実の事故になります。",
          checkAtSec: segStart(SEG_P15, 1),
        },
        {
          text: "見えない資産や人の弱点をなくすことが、事業を守ることにつながります。",
          checkAtSec: segStart(SEG_P15, 2),
        },
      ],
      narration: SEG_P15,
      transitionIn: "wipe",
    },
  ],
};
