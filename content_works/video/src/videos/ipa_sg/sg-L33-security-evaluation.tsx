import { Img, staticFile } from "remotion";
import { colors, markerStyle, markerPinkStyle, fontMono, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L33-security-evaluation.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L33: セキュリティ評価
 *
 * 発注書 content_works/ipa_sg/orders/L33.md（範囲の正）に対応。
 * シナリオ・用語の呼称・リズム設計は narration/ipa_sg/sg-L33-security-evaluation.md。
 *
 * 第4章の入口。「対策の前に、まず測る」で章を開ける:
 *   導入（攻撃者より先に自分で見つける）→ CVSS（0〜10の共通の物差し）→
 *   三つの評価基準（基本・現状・環境）→ ★抽象→具体（同じ7点台でもA社とB社で変わる）→
 *   wipe-light で「見つけ方」へ → 脆弱性診断 → ペネトレーションテスト → 対比(vs) →
 *   ファジング → ホワイト／ブラックボックス → クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   パッチ適用・SBOM など見つけた後の管理は L37 なので「見つける・測る」で止める。
 *   レッドチーム演習は L34 が主担当なので**語を出さず**、s07-5 の「人や組織の動きまで試す訓練は
 *   次回のテーマ」の一言だけでペネトレーションテストとの違いを渡す。
 *   エシカルハッカー（L30）・JVN・早期警戒パートナーシップ（L31）は名前も出さない。
 *   CVSS の下位項目（攻撃元区分など）と深刻度のランク分けには踏み込まない。
 *   「脆弱性」の定義は L2 が主担当なので戻らず、この回は「弱点」という言い方で受ける。
 *
 * 音声と字幕が違う箇所（narration.md の決まり。字幕は N() の第2引数が正）:
 *   CVSS→シーブイエスエス（1字ずつ読む略語なので字幕に読みは添えない）/
 *   0から10まで→ゼロからじゅうまで / 7点台→ななてんだい / A社→エーしゃ / B社→ビーしゃ
 *   （読み上げる数字は例外なく音声側だけ仮名書きにする）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L33-security-evaluation");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、セキュリティ評価について学びます。"),
  N("s02-2.mp3", "対策を打つ前に、まず自分の弱点がどこにあるのかを知る必要があります。"),
  N("s02-3.mp3", "攻撃者は、こちらの弱点を探して突いてきます。"),
  N("s02-4.mp3", "だから、攻撃者より先に自分で見つけて、その深刻さを測るのです。"),
];

const SEG_CVSS = [
  N("s03-1.mp3", "弱点が見つかったとき、困るのがその深刻さの伝え方です。"),
  N("s03-2.mp3", "危ないという言葉だけでは、人によって受け取り方が変わります。"),
  // 音声は「…きょうつうぜいじゃくせいひょうかシステム、シーブイエスエスです。」
  N("s03-3.mp3", "そこで使われるのが、共通脆弱性評価システム、CVSSです。"),
  // 音声は「…ゼロからじゅうまでのてんすうで…」（読み上げる数字は仮名書き）
  N("s03-4.mp3", "脆弱性の深刻さを、0から10までの点数で表す共通の物差しです。"),
];

const SEG_CRITERIA = [
  // 音声は「シーブイエスエスのひょうかには、…」
  N("s04-1.mp3", "CVSSの評価には、三つの基準があります。"),
  N("s04-2.mp3", "一つ目は基本評価基準で、脆弱性そのものの性質を点数にします。"),
  N("s04-3.mp3", "二つ目は現状評価基準で、攻撃の出回り具合や対策の有無で変わります。"),
  N("s04-4.mp3", "三つ目は環境評価基準で、自分の会社での影響の大きさを加えます。"),
  N("s04-5.mp3", "つまり同じ脆弱性でも、時間と場所で点数は変わるのです。"),
];

const SEG_CASE = [
  // 音声は「…きほんひょうかでななてんだいの…」
  N("s05-1.mp3", "たとえば、ある製品に基本評価で7点台の脆弱性が見つかったとします。"),
  // 音声は「エーしゃは、…」「ビーしゃは、…」
  N("s05-2.mp3", "A社は、その製品をインターネットに公開したサーバで使っています。"),
  N("s05-3.mp3", "B社は、外につながらない社内の端末で使っているだけです。"),
  N("s05-4.mp3", "同じ7点台でも、A社では危険度が上がり、B社では下がります。"),
  N("s05-5.mp3", "これが、環境評価基準まで見る理由です。"),
];

const SEG_SCAN = [
  N("s06-1.mp3", "では、弱点はどうやって見つけるのでしょうか。"),
  N("s06-2.mp3", "一つ目の方法が、脆弱性診断です。"),
  N("s06-3.mp3", "ツールや専門家が、既知の弱点を網羅的に洗い出します。"),
  N("s06-4.mp3", "人でいえば、悪いところを一通り調べる健康診断にあたります。"),
];

const SEG_PENTEST = [
  N("s07-1.mp3", "もう一つが、ペネトレーションテストです。"),
  N("s07-2.mp3", "検査する人が、実際にそのシステムへ侵入を試みます。"),
  N("s07-3.mp3", "目的は、弱点を並べることではありません。"),
  N("s07-4.mp3", "その弱点を使えば、本当に目的を達成できてしまうのかを確かめることです。"),
  // レッドチーム演習は L34 が主担当なので語を出さず、次回へ渡す一言だけにする
  N("s07-5.mp3", "なお、人や組織の動きまで試す訓練は、次回のテーマになります。"),
];

const SEG_VS = [
  N("s08-1.mp3", "二つの違いを整理しておきましょう。"),
  N("s08-2.mp3", "脆弱性診断は、弱点を漏れなくリストにするのが役割です。"),
  N("s08-3.mp3", "ペネトレーションテストは、その弱点で侵入できるかを実地で試します。"),
];

const SEG_FUZZ = [
  N("s09-1.mp3", "三つ目の方法が、ファジングです。"),
  N("s09-2.mp3", "想定していないデータを大量に送り込み、異常な動きが出ないかを見ます。"),
  N("s09-3.mp3", "作った人が思いつかなかった穴を、機械の力で見つけられます。"),
  N("s09-4.mp3", "ネットにつながる機器や、自社で作ったソフトの検査で役に立ちます。"),
];

const SEG_BOX = [
  N("s10-1.mp3", "どの検査でも、先に決めておくことがあります。"),
  N("s10-2.mp3", "検査する人に、内部の情報をどこまで知らせるかです。"),
  N("s10-3.mp3", "設計や仕組みを知らせて調べるのが、ホワイトボックス検査です。"),
  N("s10-4.mp3", "内部を知らせず、外から見える情報だけで調べるのがブラックボックス検査です。"),
  N("s10-5.mp3", "外部の攻撃者と同じ条件になるので、現実に近い結果が得られます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "実際に侵入を試みて、目的を達成できるか確かめるのはどちらでしょうか。"),
  N("s12-3.mp3", "正解は、ペネトレーションテストです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "自分の会社での影響の大きさを反映する基準は、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、環境評価基準です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "内部を知らせず、外から見える情報だけで調べる検査はどちらでしょうか。"),
  N("s14-3.mp3", "正解は、ブラックボックス検査です。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  // 音声は「…シーブイエスエスのてんすうで…」
  N("s15-1.mp3", "弱点の深刻さは、CVSSの点数で共通の物差しに乗せます。"),
  N("s15-2.mp3", "基本、現状、環境の三つの基準で、時間と場所によって点数は変わります。"),
  N("s15-3.mp3", "弱点を洗い出すのが脆弱性診断、侵入を試すのがペネトレーションテストです。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（その語が何の一種か・いまどの段にいるか） */
const Chip: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{
      flex: "none",
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: `${2.5 * SCALE}px ${10 * SCALE}px`,
      color: colors.primary800,
      backgroundColor: colors.primary100,
    }}
  >
    {text}
  </span>
);

/** 下部に置く一言の注記チップ */
const NoteChip: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const chip = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${6 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        color: colors.primary800,
        fontSize: 10.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      {text}
    </span>
  );
};

/** アイコンの器（丸角の淡いブロック） */
const IconBox: React.FC<{ icon: string; size?: number }> = ({ icon, size = 30 }) => (
  <span
    style={{
      flex: "none",
      width: size * SCALE,
      height: size * SCALE,
      borderRadius: (size / 2.6) * SCALE,
      backgroundColor: colors.primary50,
      color: colors.primary600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Ms name={icon} size={(size * 0.62) * SCALE} />
  </span>
);

// ---------------------------------------------------------------------------
// P2: 導入 — 左イラスト + 右テキスト（攻撃者より先に、自分で見つけて測る）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const themeAppear = useAppear(0.3);
  const needAppear = useAppear(segStart(SEG_INTRO, 1), { dy: 10 });
  const threatAppear = useAppear(segStart(SEG_INTRO, 2), { dy: 10 });
  const leadAppear = useAppear(segStart(SEG_INTRO, 3), { dy: 12 });
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-auditor-magnifier.png")}
          style={{
            flex: 0.95,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.2,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 9 * SCALE,
          }}
        >
          <span style={{ ...themeAppear, display: "flex", flexDirection: "column", gap: 5 * SCALE }}>
            <Chip text="今回のテーマ" />
            <b style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
              セキュリティ評価
            </b>
          </span>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              ...needAppear,
            }}
          >
            対策の前に：弱点がどこにあるかを知る
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8 * SCALE,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.accentPinkText,
              whiteSpace: "nowrap",
              ...threatAppear,
            }}
          >
            <Ms name="search" size={15 * SCALE} />
            攻撃者も、同じ弱点を探している
          </span>
          {/* このページの結論。marker は1ページ1本に絞る */}
          <b
            style={{
              fontSize: 16 * SCALE,
              fontWeight: 800,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"攻撃者より先に、\n"}
            <span style={markerStyle}>自分で見つけて測る</span>
          </b>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: CVSS — 中央のキーワード + 0〜10 の横スケール
// ---------------------------------------------------------------------------

const CvssScene: React.FC = () => {
  const problemAppear = useAppear(0.3);
  const termAppear = useAppear(segStart(SEG_CVSS, 2), { dy: 12 });
  const nameAppear = useAppear(segStart(SEG_CVSS, 2) + 0.5, { dy: 0 });
  const scaleAppear = useAppear(segStart(SEG_CVSS, 3), { dy: 12 });
  return (
    <SlideShell narration={SEG_CVSS}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12 * SCALE,
        }}
      >
        {/* 字幕の文をそのまま写さず、困りごとだけを短く置く */}
        <b
          style={{
            flex: "none",
            fontSize: 14 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            color: colors.textSecondary,
            ...problemAppear,
          }}
        >
          <span style={markerPinkStyle}>「危ない」</span>だけでは、受け取り方が人それぞれ
        </b>
        <span
          style={{
            flex: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5 * SCALE,
            ...termAppear,
          }}
        >
          <Chip text="深刻さの共通の物差し" />
          <b style={{ fontSize: 36 * SCALE, fontWeight: 800, lineHeight: 1.15 }}>
            <span style={markerStyle}>CVSS</span>
          </b>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
              ...nameAppear,
            }}
          >
            共通脆弱性評価システム
          </span>
        </span>
        {/* 深刻さを点数の軸に乗せる。地は primary100 → primary600 のグラデーション */}
        <div
          style={{
            flex: "none",
            width: "84%",
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
            ...scaleAppear,
          }}
        >
          <div
            style={{
              height: 11 * SCALE,
              borderRadius: 999,
              backgroundImage: `linear-gradient(90deg, ${colors.primary100}, ${colors.primary600})`,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: fontMono,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
            }}
          >
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.textMuted,
            }}
          >
            <span>低い</span>
            <span>深刻</span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 三つの評価基準 — 横帯3段（番号 + 名前 + 何で決まるか）
// ---------------------------------------------------------------------------

const CriteriaBand: React.FC<{
  no: string;
  name: string;
  desc: string;
  atSec: number;
}> = ({ no, name, desc, atSec }) => {
  const band = useAppear(atSec, { dy: 14 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14 * SCALE,
        // 見出しあり（本文 約655px）で3段 + 結論を積むので、縦 padding と数字は詰める
        // （9×SCALE + 24×SCALE の数字だと帯1つ178px になり、見出しと字幕帯を食う）
        padding: `${6 * SCALE}px ${18 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...band,
      }}
    >
      <span
        style={{
          flex: "none",
          fontFamily: fontMono,
          fontSize: 18 * SCALE,
          fontWeight: 800,
          lineHeight: 1.1,
          color: colors.primary600,
          minWidth: 22 * SCALE,
          textAlign: "center",
        }}
      >
        {no}
      </span>
      <b
        style={{
          flex: "none",
          fontSize: 15 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </b>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 11.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const CriteriaScene: React.FC = () => {
  const conclusionAppear = useAppear(segStart(SEG_CRITERIA, 4), { dy: 10 });
  return (
    <SlideShell
      heading="CVSSの三つの評価基準"
      icon={<Ms name="stacks" size={videoType.slideHeadIcon} />}
      narration={SEG_CRITERIA}
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
        <CriteriaBand
          no="1"
          name="基本評価基準"
          desc="脆弱性そのものの性質で決まる"
          atSec={segStart(SEG_CRITERIA, 1)}
        />
        <CriteriaBand
          no="2"
          name="現状評価基準"
          desc="攻撃の出回り具合・対策の有無で変わる"
          atSec={segStart(SEG_CRITERIA, 2)}
        />
        <CriteriaBand
          no="3"
          name="環境評価基準"
          desc="自分の会社での影響の大きさを加える"
          atSec={segStart(SEG_CRITERIA, 3)}
        />
        <b
          style={{
            flex: "none",
            alignSelf: "center",
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...conclusionAppear,
          }}
        >
          同じ脆弱性でも、<span style={markerStyle}>時間と場所で点数は変わる</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: ★抽象→具体 — 同じ7点台が、A社とB社で違う点になる
// ---------------------------------------------------------------------------

const CompanyCard: React.FC<{
  icon: string;
  who: string;
  usage: string;
  trendIcon: string;
  trend: string;
  danger?: boolean;
  cardAtSec: number;
  trendAtSec: number;
}> = ({ icon, who, usage, trendIcon, trend, danger, cardAtSec, trendAtSec }) => {
  const card = useAppear(cardAtSec, { dy: 14 });
  const trendAppear = useAppear(trendAtSec, { dy: 8 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${13 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      <IconBox icon={icon} size={28} />
      <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        {who}
      </b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {usage}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6 * SCALE,
          padding: `${4 * SCALE}px ${12 * SCALE}px`,
          borderRadius: 999,
          backgroundColor: danger ? colors.accentPinkSurface : colors.primary50,
          color: danger ? colors.accentPinkText : colors.primary800,
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          ...trendAppear,
        }}
      >
        <Ms name={trendIcon} size={15 * SCALE} />
        {trend}
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => {
  const baseAppear = useAppear(0.3, { dy: 12 });
  return (
    <SlideShell narration={SEG_CASE}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 11 * SCALE,
        }}
      >
        {/* 同じ出発点（基本評価の点数）を先に置き、そこから2社に分かれる形にする */}
        <div
          style={{
            flex: "none",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            gap: 12 * SCALE,
            ...baseAppear,
          }}
        >
          <Chip text="同じ製品・同じ脆弱性" />
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.textSecondary,
            }}
          >
            基本評価
          </span>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 26 * SCALE,
              fontWeight: 800,
              lineHeight: 1.1,
              color: colors.primary600,
            }}
          >
            7.5
          </span>
        </div>
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 13 * SCALE }}>
          <CompanyCard
            icon="public"
            who="A社"
            usage="インターネットに公開したサーバで使う"
            trendIcon="trending_up"
            trend="危険度は上がる"
            danger
            cardAtSec={segStart(SEG_CASE, 1)}
            trendAtSec={segStart(SEG_CASE, 3)}
          />
          <CompanyCard
            icon="lan"
            who="B社"
            usage="外につながらない社内の端末で使う"
            trendIcon="trending_down"
            trend="危険度は下がる"
            cardAtSec={segStart(SEG_CASE, 2)}
            trendAtSec={segStart(SEG_CASE, 3) + 0.8}
          />
        </div>
        <span style={{ alignSelf: "center" }}>
          <NoteChip
            icon="location_on"
            text="だから、環境評価基準まで見る"
            atSec={segStart(SEG_CASE, 4)}
          />
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 脆弱性診断 — 左テキスト（用語が主役）+ 右イラスト
// ---------------------------------------------------------------------------

const ScanScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(segStart(SEG_SCAN, 1), { dy: 12 });
  const descAppear = useAppear(segStart(SEG_SCAN, 2), { dy: 10 });
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_SCAN}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.25,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 9 * SCALE,
          }}
        >
          <span style={chipAppear}>
            <Chip text="弱点の見つけ方 ①" />
          </span>
          <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>脆弱性診断</span>
          </b>
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...descAppear,
            }}
          >
            {"ツールや専門家が、\n既知の弱点を網羅的に洗い出す"}
          </span>
          <NoteChip
            icon="fact_check"
            text="たとえるなら、体の健康診断"
            atSec={segStart(SEG_SCAN, 3)}
          />
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-auditor-checklist.png")}
          style={{
            flex: 0.9,
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
// P7: ペネトレーションテスト — 横一列の「到達」ストリップ
// ---------------------------------------------------------------------------

const StripTile: React.FC<{
  icon: string;
  label: string;
  sub: string;
  goal?: boolean;
  atSec: number;
}> = ({ icon, label, sub, goal, atSec }) => {
  const tile = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        // 4段（チップ+用語 / ストリップ / 注記チップ / 次回への一言）を積むので詰める
        padding: `${8 * SCALE}px ${6 * SCALE}px`,
        backgroundColor: goal ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${goal ? colors.accentPinkSoft : colors.border}`,
        borderRadius: 16 * SCALE,
        ...tile,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 22 * SCALE,
          height: 22 * SCALE,
          borderRadius: 9 * SCALE,
          backgroundColor: goal ? colors.surface : colors.primary50,
          color: goal ? colors.accentPinkText : colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={15 * SCALE} />
      </span>
      <b
        style={{
          fontSize: 12 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          color: goal ? colors.accentPinkText : colors.textPrimary,
        }}
      >
        {label}
      </b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {sub}
      </span>
    </div>
  );
};

const StripArrow: React.FC<{ atSec: number }> = ({ atSec }) => {
  const arrow = useAppear(atSec, { dy: 0 });
  return (
    <span
      style={{
        flex: "none",
        alignSelf: "center",
        color: colors.primary300,
        display: "flex",
        ...arrow,
      }}
    >
      <Ms name="arrow_forward" size={20 * SCALE} />
    </span>
  );
};

const PentestScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const handoffAppear = useAppear(segStart(SEG_PENTEST, 4), { dy: 8 });
  return (
    <SlideShell narration={SEG_PENTEST}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 9 * SCALE,
        }}
      >
        <span
          style={{
            flex: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 4 * SCALE,
          }}
        >
          <span style={chipAppear}>
            <Chip text="弱点の見つけ方 ②" />
          </span>
          <b style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>ペネトレーションテスト</span>
          </b>
        </span>
        {/* 「弱点を並べる」ではなく「到達できてしまうか」を見せるストリップ */}
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 9 * SCALE }}>
          <StripTile
            icon="person"
            label="検査する人"
            sub="攻撃者の側に立つ"
            atSec={segStart(SEG_PENTEST, 1)}
          />
          <StripArrow atSec={segStart(SEG_PENTEST, 1) + 0.5} />
          <StripTile
            icon="gpp_bad"
            label="弱点"
            sub="実際に侵入を試す"
            atSec={segStart(SEG_PENTEST, 1) + 0.7}
          />
          <StripArrow atSec={segStart(SEG_PENTEST, 3)} />
          <StripTile
            icon="flag"
            label="目的を達成できる？"
            sub="そこまで確かめる"
            goal
            atSec={segStart(SEG_PENTEST, 3) + 0.2}
          />
        </div>
        <span style={{ alignSelf: "center" }}>
          <NoteChip
            icon="checklist"
            text="弱点を並べるのが目的ではない"
            atSec={segStart(SEG_PENTEST, 2)}
          />
        </span>
        {/* レッドチーム演習（L34）は語らず、次回へ渡す一言だけ */}
        <span
          style={{
            flex: "none",
            alignSelf: "center",
            fontSize: 10 * SCALE,
            fontWeight: 700,
            lineHeight: 1.2,
            color: colors.textMuted,
            whiteSpace: "nowrap",
            ...handoffAppear,
          }}
        >
          人や組織の動きまで試す訓練は、次回のテーマ
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: ファジング — 想定外のデータを流し込んで異常を炙り出す
// ---------------------------------------------------------------------------

const DataChip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const chip = useAppear(atSec, { dy: 8 });
  return (
    <span
      style={{
        flex: "none",
        fontFamily: fontMono,
        fontSize: 10 * SCALE,
        fontWeight: 700,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        padding: `${5 * SCALE}px ${11 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        color: colors.textSecondary,
        ...chip,
      }}
    >
      {text}
    </span>
  );
};

const FuzzingScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const targetAppear = useAppear(0.8, { dy: 12 });
  const arrow1 = useAppear(segStart(SEG_FUZZ, 1), { dy: 0 });
  const arrow2 = useAppear(segStart(SEG_FUZZ, 1) + 2.2, { dy: 0 });
  const alertAppear = usePop(segStart(SEG_FUZZ, 1) + 2.4);
  const targetNoteAppear = useAppear(segStart(SEG_FUZZ, 3), { dy: 8 });
  return (
    <SlideShell narration={SEG_FUZZ}>
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
        <span
          style={{
            flex: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 4 * SCALE,
          }}
        >
          <span style={chipAppear}>
            <Chip text="弱点の見つけ方 ③" />
          </span>
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>ファジング</span>
          </b>
        </span>
        {/* 横に5つ並ぶ行。本文幅は約1690pxしかないので、各要素の文字数と余白は詰める
            （初版は「ネットにつながる機器・自作のソフト」等で 2000px 級になり左右が切れた） */}
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8 * SCALE,
          }}
        >
          {/* 想定外のデータ（送り込む側）*/}
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 6 * SCALE,
            }}
          >
            <DataChip text="とても長い文字列" atSec={segStart(SEG_FUZZ, 1)} />
            <DataChip text="想定しない記号" atSec={segStart(SEG_FUZZ, 1) + 0.4} />
            <DataChip text="けた外れの数値" atSec={segStart(SEG_FUZZ, 1) + 0.8} />
          </div>
          <span style={{ flex: "none", color: colors.primary300, display: "flex", ...arrow1 }}>
            <Ms name="arrow_forward" size={16 * SCALE} />
          </span>
          {/* 検査される側（このページの前提なので先に出す） */}
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5 * SCALE,
              padding: `${10 * SCALE}px ${16 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 16 * SCALE,
              ...targetAppear,
            }}
          >
            <IconBox icon="devices" size={24} />
            <b style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>検査の対象</b>
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 700,
                lineHeight: 1.3,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
                ...targetNoteAppear,
              }}
            >
              機器・自作のソフト
            </span>
          </div>
          <span style={{ flex: "none", color: colors.primary300, display: "flex", ...arrow2 }}>
            <Ms name="arrow_forward" size={16 * SCALE} />
          </span>
          <span
            style={{
              flex: "none",
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              padding: `${7 * SCALE}px ${12 * SCALE}px`,
              borderRadius: 12 * SCALE,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
              color: colors.accentPinkText,
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              ...alertAppear,
            }}
          >
            <Ms name="warning" size={17 * SCALE} />
            異常な動き
          </span>
        </div>
        <span style={{ alignSelf: "center" }}>
          <NoteChip
            icon="bug_report"
            text="作った人が思いつかなかった穴を、機械の力で"
            atSec={segStart(SEG_FUZZ, 2)}
          />
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: ホワイトボックス／ブラックボックス — 明るいパネルと暗いパネル
// ---------------------------------------------------------------------------

const BoxPanel: React.FC<{
  icon: string;
  condition: string;
  term: string;
  desc: string;
  dark?: boolean;
  termAtSec: number;
}> = ({ icon, condition, term, desc, dark, termAtSec }) => {
  const panel = useAppear(dark ? 0.55 : 0.3, { dy: 14 });
  const termAppear = useAppear(termAtSec, { dy: 10 });
  const descAppear = useAppear(termAtSec + 0.6, { dy: 8 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${16 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: dark ? colors.bgDark : colors.surface,
        border: `${1.5 * SCALE}px solid ${dark ? colors.borderDark : colors.border}`,
        borderRadius: 18 * SCALE,
        ...panel,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 30 * SCALE,
          height: 30 * SCALE,
          borderRadius: 12 * SCALE,
          backgroundColor: dark ? colors.surfaceDark : colors.primary50,
          color: dark ? colors.primaryDark : colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={19 * SCALE} />
      </span>
      {/* 条件（内部を知らせるか）は先に出し、用語は読み上げに合わせて後から出す */}
      <span
        style={{
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.3,
          color: dark ? colors.textSecondaryDark : colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {condition}
      </span>
      <b
        style={{
          fontSize: 17 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          color: dark ? colors.textPrimaryDark : colors.textPrimary,
          ...termAppear,
        }}
      >
        {term}
      </b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
          color: dark ? colors.textSecondaryDark : colors.textSecondary,
          whiteSpace: "nowrap",
          ...descAppear,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const BoxTestScene: React.FC = () => (
  <SlideShell
    heading="検査する人に、内部をどこまで知らせるか"
    icon={<Ms name="visibility" size={videoType.slideHeadIcon} />}
    narration={SEG_BOX}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        gap: 14 * SCALE,
      }}
    >
      <BoxPanel
        icon="visibility"
        condition="設計や仕組みを知らせる"
        term="ホワイトボックス検査"
        desc="内部まで踏み込んで調べられる"
        termAtSec={segStart(SEG_BOX, 2)}
      />
      <BoxPanel
        icon="visibility_off"
        condition="外から見える情報だけ"
        term="ブラックボックス検査"
        desc="外部の攻撃者と同じ条件になる"
        dark
        termAtSec={segStart(SEG_BOX, 3)}
      />
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

export const SgL33SecurityEvaluation: VideoSpec = {
  id: "sg-L33-security-evaluation",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "攻撃者より先に\n弱点を測る",
      keywords: ["CVSS", "脆弱性診断", "ファジング"],
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
      name: "cvss",
      durationSec: 6,
      narration: SEG_CVSS,
      component: CvssScene,
    },
    {
      pattern: "custom",
      name: "criteria",
      durationSec: 7,
      narration: SEG_CRITERIA,
      component: CriteriaScene,
    },
    {
      pattern: "custom",
      name: "case-two-companies",
      durationSec: 7,
      narration: SEG_CASE,
      component: CaseScene,
    },
    {
      pattern: "custom",
      name: "vuln-scan",
      durationSec: 5,
      narration: SEG_SCAN,
      component: ScanScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "pentest",
      durationSec: 7,
      narration: SEG_PENTEST,
      component: PentestScene,
    },
    {
      pattern: "vs",
      heading: "脆弱性診断とペネトレーションテスト",
      icon: "compare_arrows",
      left: {
        title: "脆弱性診断",
        icon: "fact_check",
        rows: [
          { k: "目的", v: "弱点を漏れなく洗い出す" },
          { k: "やり方", v: "ツールで網羅的に調べる" },
          { k: "たとえると", v: "健康診断" },
        ],
      },
      right: {
        title: "ペネトレーションテスト",
        icon: "security",
        rows: [
          { k: "目的", v: "侵入できるか確かめる" },
          { k: "やり方", v: "実際に攻撃を試す" },
          { k: "たとえると", v: "実地の試験" },
        ],
      },
      columnAtSec: [segStart(SEG_VS, 1), segStart(SEG_VS, 2)],
      narration: SEG_VS,
    },
    {
      pattern: "custom",
      name: "fuzzing",
      durationSec: 7,
      narration: SEG_FUZZ,
      component: FuzzingScene,
    },
    {
      pattern: "custom",
      name: "box-test",
      durationSec: 7,
      narration: SEG_BOX,
      component: BoxTestScene,
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
      question: "実際に侵入を試すのは？",
      choices: [
        { key: "A", text: "脆弱性診断" },
        { key: "B", text: "ペネトレーションテスト", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "自社での影響を反映する基準は？",
      choices: [
        { key: "A", text: "環境評価基準", correct: true },
        { key: "B", text: "基本評価基準" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "外から見える情報だけで調べるのは？",
      choices: [
        { key: "A", text: "ホワイトボックス検査" },
        { key: "B", text: "ブラックボックス検査", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "弱点の深刻さは、CVSSの点数で共通の物差しに乗せます。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "基本・現状・環境の三つの基準で、点数は時間と場所で変わります。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "洗い出すのが脆弱性診断、侵入を試すのがペネトレーションテストです。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
