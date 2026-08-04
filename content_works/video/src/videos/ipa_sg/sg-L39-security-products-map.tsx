import { Img, staticFile } from "remotion";
import { colors, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L39-security-products-map.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L39: セキュリティ製品・サービスの地図
 *
 * 発注書 content_works/ipa_sg/orders/L39.md（範囲の正）に対応。
 * シナリオ・用語の呼称・リズム設計は narration/ipa_sg/sg-L39-security-products-map.md。
 *
 * 【地図＋代表】の回。**機能名を並べる回にしない**のが最重要:
 *   s03 の「守る場所」4マス（端末／ネットワーク／情報／全体監視）を背骨に立て、
 *   各マスの代表を1つずつ深く語り（EDR・MDM／UTM・WAF／DLP／SIEM）、
 *   s11 で一つの会社の場面に4マスをまとめて回収する。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   ファイアウォール・IDS・IPS の仕組みは L38 → s03-6 で地図のネットワークのマスに
 *   置き直すだけ（UTM の内訳チップに名前が並ぶが説明はしない）。**L38 は並行制作中で
 *   原稿が未着だったため、呼称は発注書 orders/L38.md の表記に合わせてある（要突合）**。
 *   SSL/TLSアクセラレーター・Webアイソレーションは暗記カードの領分なので名前も出さない。
 *   マルウェアの手口は L4・L5、検出手法は L35 なので s04-2 は「対策ソフト」と呼ぶだけ。
 *   SQLインジェクションは L8 なので読み上げず、s06 の画面注記1つで渡す。
 *   ログ管理そのものは L37 なので s08 は製品側（集めて突き合わせる）に限定する。
 *
 * 音声と字幕が違う箇所（narration.md の決まり。字幕は N() の第2引数が正）:
 *   EDR/MDM/UTM/DLP/IDS・IPS は1字ずつ読む略語なので音声側だけ仮名書き（字幕に読みは添えない）。
 *   WAF→ワフ・SIEM→シーム は定着した読み方があるので、字幕は初出（s06-4・s08-2）だけ
 *   読みを添える。Web→ウェブ。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L39-security-products-map");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、セキュリティ製品とサービスの地図を作ります。"),
  N("s02-2.mp3", "この分野は、アルファベットの略語が次々に出てきます。"),
  N("s02-3.mp3", "名前だけを覚えようとすると、すぐに混ざってしまいます。"),
  N("s02-4.mp3", "そこで、どこを守る製品なのかで整理していきましょう。"),
];

const SEG_MAP = [
  N("s03-1.mp3", "守る場所は、大きく四つに分けられます。"),
  N("s03-2.mp3", "一つ目は端末で、パソコンやスマートフォンを守ります。"),
  N("s03-3.mp3", "二つ目はネットワークで、社内と外の境目を守ります。"),
  N("s03-4.mp3", "三つ目は情報で、データそのものを守ります。"),
  N("s03-5.mp3", "四つ目は全体監視で、あちこちの記録をまとめて見ます。"),
  // 音声は「ファイアウォールや、アイディーエス、アイピーエスも、…」
  N("s03-6.mp3", "ファイアウォールやIDS・IPSも、このマスに入ります。"),
];

const SEG_EDR = [
  N("s04-1.mp3", "まずは、端末のマスから見ていきます。"),
  N("s04-2.mp3", "対策ソフトで入口を守っても、すり抜けてくるものはあります。"),
  // 音声は「イーディーアールは、…」
  N("s04-3.mp3", "EDRは、端末のふるまいを記録し続ける仕組みです。"),
  N("s04-4.mp3", "怪しい動きを見つけたら、その端末を切り離せます。"),
  N("s04-5.mp3", "入口で止めるより、入られたあとを短くするのが役目です。"),
];

const SEG_MDM = [
  // 音声は「同じ端末のマスに、エムディーエムがあります。」
  N("s05-1.mp3", "同じ端末のマスに、MDMがあります。"),
  // MDM の対象は「配ったスマートフォン」ではなく、社外へ持ち出す端末すべて
  // （スマホ・タブレット・ノートパソコン）。s05-3 で対象の広さを名指しする
  N("s05-2.mp3", "会社が配って、社外へ持ち出す端末をまとめて管理する仕組みです。"),
  N("s05-3.mp3", "スマートフォンやタブレット、ノートパソコンが対象です。"),
  N("s05-4.mp3", "ふだんは設定を配り、勝手なアプリの利用を制限します。"),
  N("s05-5.mp3", "紛失したときは、遠隔で画面を止め、データを消せます。"),
];

const SEG_NET = [
  N("s06-1.mp3", "次は、ネットワークのマスです。"),
  // 音声は「ユーティーエムは、…」
  N("s06-2.mp3", "UTMは、複数の防御機能を一つにまとめた製品です。"),
  N("s06-3.mp3", "まとめて導入できるので、中小規模の会社で使われます。"),
  // 音声は「ワフは、ウェブアプリを…」。読みを字幕に添えるのは初出のこの1回だけ
  N("s06-4.mp3", "WAF（ワフ）は、Webアプリを狙う攻撃を防ぐ盾です。"),
  N("s06-5.mp3", "入力欄から不正な命令を送る攻撃を、手前で止めます。"),
];

const SEG_DLP = [
  N("s07-1.mp3", "三つ目は、情報のマスです。"),
  // 音声は「ディーエルピーは、…」
  N("s07-2.mp3", "DLPは、守る対象をデータそのものに置いた製品です。"),
  N("s07-3.mp3", "機密情報を見分けて、持ち出しや送信をその場で止めます。"),
  N("s07-4.mp3", "人や場所ではなく、中身を見て判断するのが特徴です。"),
];

const SEG_SIEM = [
  N("s08-1.mp3", "最後は、全体監視のマスです。"),
  // 音声は「シームは、…」。読みを字幕に添えるのは初出のこの1回だけ
  N("s08-2.mp3", "SIEM（シーム）は、機器ごとに散らばったログを集めます。"),
  N("s08-3.mp3", "集めた記録を突き合わせ、攻撃の兆候を浮かび上がらせます。"),
  N("s08-4.mp3", "一つでは異常に見えない動きも、つなげると見えてきます。"),
];

const SEG_LIST = [
  N("s09-1.mp3", "ここからは、製品に共通する考え方です。"),
  N("s09-2.mp3", "危ないものを一覧にして止めるのが、拒否リストです。"),
  N("s09-3.mp3", "安全と認めたものだけを通すのが、許可リストです。"),
  N("s09-4.mp3", "許可リストのほうが安全ですが、業務は窮屈になります。"),
];

const SEG_FALSE = [
  N("s10-1.mp3", "どの製品にも、判定を外すことがあります。"),
  N("s10-2.mp3", "危ないものを見逃すのが、フォールスネガティブです。"),
  N("s10-3.mp3", "安全なものを誤って止めるのが、フォールスポジティブです。"),
  N("s10-4.mp3", "厳しくすれば誤検知が増え、緩めれば見逃しが増えます。"),
];

const SEG_CASE = [
  N("s11-1.mp3", "では、ある会社の様子を見てみましょう。"),
  N("s11-2.mp3", "社員のパソコンの不審な動きは、EDRが切り離します。"),
  N("s11-3.mp3", "公開しているWebサイトへの攻撃は、WAFが止めます。"),
  N("s11-4.mp3", "名簿を外へ送ろうとするメールは、DLPが引き止めます。"),
  N("s11-5.mp3", "これらの記録はSIEMに集まり、全体像が見えてきます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s13-1.mp3", "ここで問題です。"),
  N("s13-2.mp3", "紛失した端末のデータを遠隔で消せるのは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、MDMで、社外へ持ち出す端末をまとめて管理します。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s14-1.mp3", "次の問題です。"),
  N("s14-2.mp3", "Webアプリを狙う攻撃を専門に防ぐのは、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、WAFで、Webアプリ専門の盾です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s15-1.mp3", "最後の問題です。"),
  N("s15-2.mp3", "安全なものを誤って止めてしまうことを、何といいますか。"),
  N("s15-3.mp3", "正解は、フォールスポジティブ、つまり誤検知です。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s16-1.mp3", "製品は名前ではなく、どこを守るかで引きましょう。"),
  N("s16-2.mp3", "端末はEDRとMDM、ネットワークはUTMとWAFです。"),
  N("s16-3.mp3", "情報はDLP、全体監視はSIEMがまとめます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（いま地図のどのマスを見ているか） */
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

/** アイコンの器（丸角の淡いブロック） */
const IconBox: React.FC<{ icon: string; size?: number; pink?: boolean }> = ({
  icon,
  size = 26,
  pink,
}) => (
  <span
    style={{
      flex: "none",
      width: size * SCALE,
      height: size * SCALE,
      borderRadius: (size / 2.6) * SCALE,
      backgroundColor: pink ? colors.accentPinkSurface : colors.primary50,
      color: pink ? colors.accentPinkText : colors.primary600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Ms name={icon} size={size * 0.62 * SCALE} />
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
        padding: `${5 * SCALE}px ${12 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        color: colors.primary800,
        fontSize: 10 * SCALE,
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

/** 矢印（→）。線を引かずアイコンで済ませる（SVGの座標計算を持ち込まない） */
const ArrowIcon: React.FC<{ atSec: number; size?: number; down?: boolean }> = ({
  atSec,
  size = 18,
  down,
}) => {
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
      <Ms name={down ? "arrow_downward" : "arrow_forward"} size={size * SCALE} />
    </span>
  );
};

// ---------------------------------------------------------------------------
// s02: 導入 — 左イラスト + 右に散らばる略語チップ
// ---------------------------------------------------------------------------

const AcronymChip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const chip = usePop(atSec);
  return (
    <span
      style={{
        fontSize: 13 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        borderRadius: 10 * SCALE,
        padding: `${3 * SCALE}px ${9 * SCALE}px`,
        color: colors.textSecondary,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...chip,
      }}
    >
      {text}
    </span>
  );
};

const IntroScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const themeAppear = useAppear(0.3);
  const mixAppear = useAppear(segStart(SEG_INTRO, 2), { dy: 10 });
  const answerAppear = useAppear(segStart(SEG_INTRO, 3), { dy: 12 });
  const chipBase = segStart(SEG_INTRO, 1);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-employee-f-worry.png")}
          style={{
            flex: 0.85,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.3,
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
              セキュリティ製品の地図
            </b>
          </span>
          {/* 略語が次々に出てくる = この回の困りごと。名前を先に見せてから整理へ向かう */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 * SCALE, maxWidth: "100%" }}>
            {["EDR", "MDM", "UTM", "WAF", "DLP", "SIEM"].map((x, i) => (
              <AcronymChip key={x} text={x} atSec={chipBase + i * 0.22} />
            ))}
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8 * SCALE,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              color: colors.accentPinkText,
              whiteSpace: "nowrap",
              ...mixAppear,
            }}
          >
            <Ms name="help" size={18 * SCALE} />
            名前だけ覚えると、すぐに混ざる
          </span>
          <b style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.3, ...answerAppear }}>
            <span style={markerStyle}>どこを守る製品か</span>で整理する
          </b>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s03: ★背骨 — 「守る場所」の4マス地図
// ---------------------------------------------------------------------------

const MapTile: React.FC<{
  icon: string;
  place: string;
  what: string;
  reps: string;
  atSec: number;
}> = ({ icon, place, what, reps, atSec }) => {
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
        padding: `${10 * SCALE}px ${7 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...tile,
      }}
    >
      <IconBox icon={icon} size={22} />
      <b
        style={{
          fontSize: 13.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {place}
      </b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {what}
      </span>
      <span
        style={{
          fontSize: 10 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          borderRadius: 999,
          padding: `${1.5 * SCALE}px ${8 * SCALE}px`,
          color: colors.primary800,
          backgroundColor: colors.primary50,
        }}
      >
        {reps}
      </span>
    </div>
  );
};

const MapScene: React.FC = () => (
  <SlideShell
    heading="製品は「どこを守るか」で引く"
    icon={<Ms name="map" size={videoType.slideHeadIcon} />}
    narration={SEG_MAP}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 12 * SCALE,
      }}
    >
      <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 8 * SCALE, width: "100%" }}>
        <MapTile
          icon="laptop_mac"
          place="端末"
          what="パソコン・スマホ"
          reps="EDR・MDM"
          atSec={segStart(SEG_MAP, 1)}
        />
        <MapTile
          icon="lan"
          place="ネットワーク"
          what="社内と外の境目"
          reps="UTM・WAF"
          atSec={segStart(SEG_MAP, 2)}
        />
        <MapTile
          icon="description"
          place="情報"
          what="データそのもの"
          reps="DLP"
          atSec={segStart(SEG_MAP, 3)}
        />
        <MapTile
          icon="monitoring"
          place="全体監視"
          what="あちこちの記録"
          reps="SIEM"
          atSec={segStart(SEG_MAP, 4)}
        />
      </div>
      {/* 前回学んだ関所を、この地図のネットワークのマスに置き直す */}
      <NoteChip
        icon="shield"
        text="前回の関所（ファイアウォール・IDS・IPS）も、ネットワークのマス"
        atSec={segStart(SEG_MAP, 5)}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// s04: 端末の代表① EDR — 左キーワード見出し + 右イラスト
// ---------------------------------------------------------------------------

const EdrLine: React.FC<{ icon: string; text: React.ReactNode; atSec: number; pink?: boolean }> = ({
  icon,
  text,
  atSec,
  pink,
}) => {
  const line = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        fontSize: 12 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        color: pink ? colors.accentPinkText : colors.textPrimary,
        ...line,
      }}
    >
      <span style={{ flex: "none", display: "flex", color: pink ? undefined : colors.primary600 }}>
        <Ms name={icon} size={18 * SCALE} />
      </span>
      {text}
    </span>
  );
};

const EdrScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const chipAppear = useAppear(segStart(SEG_EDR, 2), { dy: 10 });
  const termAppear = useAppear(segStart(SEG_EDR, 2) + 0.2, { dy: 12 });
  const defAppear = useAppear(segStart(SEG_EDR, 2) + 0.5, { dy: 10 });
  const closeAppear = useAppear(segStart(SEG_EDR, 4), { dy: 10 });
  return (
    <SlideShell narration={SEG_EDR}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.3,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8 * SCALE,
          }}
        >
          {/* このページの前提（入口を守ってもすり抜ける）を先に置く */}
          <EdrLine icon="gpp_bad" text="入口を守っても、すり抜けてくる" atSec={0.3} pink />
          <span style={chipAppear}>
            <Chip text="守る場所：端末" />
          </span>
          <b style={{ fontSize: 34 * SCALE, fontWeight: 800, lineHeight: 1.15, ...termAppear }}>
            <span style={markerStyle}>EDR</span>
          </b>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
              whiteSpace: "nowrap",
              ...defAppear,
            }}
          >
            端末のふるまいを記録し続ける仕組み
          </span>
          <EdrLine
            icon="alt_route"
            text="怪しい動き → その端末を切り離す"
            atSec={segStart(SEG_EDR, 3)}
          />
          <b style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...closeAppear }}>
            入られた<span style={markerStyle}>あとを短くする</span>のが役目
          </b>
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-employee-m-laptop.png")}
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
// s05: 端末の代表② MDM — 中央にスマホ、左右に「ふだん／紛失時」の2枚
// ---------------------------------------------------------------------------

const MdmCard: React.FC<{
  label: string;
  icon: string;
  lines: string[];
  pink?: boolean;
  atSec: number;
}> = ({ label, icon, lines, pink, atSec }) => {
  const card = useAppear(atSec, { dy: 14 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5 * SCALE,
        padding: `${11 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: pink ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${pink ? colors.accentPinkSoft : colors.border}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6 * SCALE,
          color: pink ? colors.accentPinkText : colors.primary600,
        }}
      >
        <Ms name={icon} size={17 * SCALE} />
        <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
          {label}
        </b>
      </span>
      {lines.map((t) => (
        <span
          key={t}
          style={{
            fontSize: 11.5 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            color: pink ? colors.accentPinkText : colors.textPrimary,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
};

/** MDM が対象にする端末（社外へ持ち出すもの）。スマホだけに見えないよう3種を並べる */
const DeviceChip: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const chip = usePop(atSec);
  return (
    <span
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 5 * SCALE,
        fontSize: 11 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        borderRadius: 999,
        padding: `${3 * SCALE}px ${11 * SCALE}px`,
        color: colors.primary800,
        backgroundColor: colors.primary50,
        ...chip,
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      {text}
    </span>
  );
};

const MdmScene: React.FC = () => {
  const headAppear = useAppear(0.3, { dy: 12 });
  const defAppear = useAppear(segStart(SEG_MDM, 1), { dy: 10 });
  const illustAppear = useAppear(0.6);
  const deviceBase = segStart(SEG_MDM, 2);
  return (
    <SlideShell narration={SEG_MDM}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8 * SCALE,
        }}
      >
        <span
          style={{
            flex: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3 * SCALE,
            ...headAppear,
          }}
        >
          <Chip text="守る場所：端末" />
          <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.15 }}>
            <span style={markerStyle}>MDM</span>
          </b>
        </span>
        <span
          style={{
            flex: "none",
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
            ...defAppear,
          }}
        >
          会社が配り、社外へ持ち出す端末をまとめて管理する
        </span>
        {/* 対象はスマホだけではない（タブレット・ノートパソコンも同じ仕組みで管理する） */}
        <div style={{ flex: "none", display: "flex", justifyContent: "center", gap: 7 * SCALE }}>
          <DeviceChip icon="smartphone" text="スマートフォン" atSec={deviceBase} />
          <DeviceChip icon="tablet_mac" text="タブレット" atSec={deviceBase + 0.25} />
          <DeviceChip icon="laptop_mac" text="ノートパソコン" atSec={deviceBase + 0.5} />
        </div>
        {/* 中央の端末（スマホ＋ノートPC）を挟んで「ふだん」と「紛失したとき」を対に置く */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10 * SCALE,
          }}
        >
          <MdmCard
            label="ふだん"
            icon="settings"
            lines={["設定をまとめて配る", "勝手なアプリを制限"]}
            atSec={segStart(SEG_MDM, 3)}
          />
          {/* 既存部品の流用のみ（新規イラストは作らない）。スマホ1枚だと対象が狭く見えるので
              ノートパソコンを並べ、絵でも「持ち出す端末ぜんぶ」が伝わるようにする */}
          <div
            style={{
              flex: 0.75,
              minWidth: 0,
              alignSelf: "stretch",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4 * SCALE,
              ...illustAppear,
            }}
          >
            <Img
              src={staticFile("images/ipa_sg/icon-laptop.png")}
              style={{
                flex: 1.15,
                minWidth: 0,
                maxHeight: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
            <Img
              src={staticFile("images/ipa_sg/icon-smartphone.png")}
              style={{
                flex: 0.85,
                minWidth: 0,
                maxHeight: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </div>
          <MdmCard
            label="紛失したとき"
            icon="warning"
            lines={["遠隔で画面を止める", "中のデータを消す"]}
            pink
            atSec={segStart(SEG_MDM, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s06: ネットワークの代表 UTM と WAF — 「まとめる箱」と「一点を守る盾」
// ---------------------------------------------------------------------------

const FuncChip: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{
      fontSize: 10 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: `${2 * SCALE}px ${8 * SCALE}px`,
      color: colors.primary800,
      backgroundColor: colors.primary50,
    }}
  >
    {text}
  </span>
);

const NetScene: React.FC = () => {
  const utmAppear = useAppear(segStart(SEG_NET, 1), { dy: 14 });
  const utmNote = useAppear(segStart(SEG_NET, 2), { dy: 8 });
  const wafAppear = useAppear(segStart(SEG_NET, 3), { dy: 14 });
  const wafNote = useAppear(segStart(SEG_NET, 4), { dy: 8 });
  return (
    <SlideShell
      heading="ネットワークのマスの、二つの代表"
      icon={<Ms name="lan" size={videoType.slideHeadIcon} />}
      narration={SEG_NET}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "stretch",
          gap: 12 * SCALE,
        }}
      >
        {/* 左: まとめる（詰め合わせ） */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 7 * SCALE,
            padding: `${10 * SCALE}px ${10 * SCALE}px`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 18 * SCALE,
            ...utmAppear,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
            <IconBox icon="inventory_2" size={22} />
            <b style={{ fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.15 }}>UTM</b>
          </span>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.textSecondary,
              whiteSpace: "nowrap",
            }}
          >
            複数の防御機能を、一つにまとめる
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 5 * SCALE,
              maxWidth: "100%",
            }}
          >
            <FuncChip text="ファイアウォール" />
            <FuncChip text="IDS・IPS" />
            <FuncChip text="ウイルス対策" />
            <FuncChip text="URLフィルタリング" />
          </div>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              ...utmNote,
            }}
          >
            <span style={markerStyle}>中小規模の会社</span>でよく使われる
          </span>
        </div>
        {/* 右: しぼる（一点を守る盾） */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 7 * SCALE,
            padding: `${10 * SCALE}px ${10 * SCALE}px`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 18 * SCALE,
            ...wafAppear,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
            <IconBox icon="shield" size={22} />
            <b style={{ fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.15 }}>WAF</b>
          </span>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.textSecondary,
              whiteSpace: "nowrap",
            }}
          >
            Webアプリを狙う攻撃だけを防ぐ
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              fontSize: 11 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ display: "flex", color: colors.accentPinkText }}>
              <Ms name="warning" size={16 * SCALE} />
            </span>
            攻撃
            <span style={{ display: "flex", color: colors.primary300 }}>
              <Ms name="arrow_forward" size={16 * SCALE} />
            </span>
            <span style={{ display: "flex", color: colors.primary600 }}>
              <Ms name="shield" size={16 * SCALE} />
            </span>
            <span style={{ display: "flex", color: colors.primary300 }}>
              <Ms name="arrow_forward" size={16 * SCALE} />
            </span>
            <span style={{ display: "flex", color: colors.textSecondary }}>
              <Ms name="language" size={16 * SCALE} />
            </span>
            Webアプリ
          </span>
          {/* SQLインジェクションは L8 の領分。読み上げず画面の注記だけで渡す */}
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              ...wafNote,
            }}
          >
            <span style={markerStyle}>入力欄への不正な命令</span>を手前で止める
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s07: 情報の代表 DLP — 機密データ → 判定 → 止まる出口2つ（横フロー）
// ---------------------------------------------------------------------------

const BlockedExit: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const exit = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${6 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
        borderRadius: 14 * SCALE,
        color: colors.accentPinkText,
        ...exit,
      }}
    >
      <Ms name={icon} size={16 * SCALE} />
      <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        {text}
      </b>
      <Ms name="cancel" size={16 * SCALE} />
    </div>
  );
};

const DlpScene: React.FC = () => {
  const dataAppear = useAppear(0.3, { dy: 12 });
  const gateAppear = useAppear(segStart(SEG_DLP, 1), { dy: 12 });
  const closeAppear = useAppear(segStart(SEG_DLP, 3), { dy: 10 });
  return (
    <SlideShell
      heading="情報のマス：データそのものを守る"
      icon={<Ms name="description" size={videoType.slideHeadIcon} />}
      narration={SEG_DLP}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10 * SCALE,
        }}
      >
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 9 * SCALE,
            width: "100%",
          }}
        >
          {/* 守る対象 = データそのもの */}
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
              padding: `${9 * SCALE}px ${14 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 16 * SCALE,
              ...dataAppear,
            }}
          >
            <IconBox icon="description" size={22} />
            <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
              顧客名簿
            </b>
            <span
              style={{
                fontSize: 9.5 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                borderRadius: 999,
                padding: `${1.5 * SCALE}px ${8 * SCALE}px`,
                color: colors.accentPinkText,
                backgroundColor: colors.accentPinkSurface,
              }}
            >
              機密
            </span>
          </div>
          <ArrowIcon atSec={segStart(SEG_DLP, 1)} />
          {/* 判定するのは DLP */}
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              padding: `${9 * SCALE}px ${16 * SCALE}px`,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary100}`,
              borderRadius: 16 * SCALE,
              ...gateAppear,
            }}
          >
            <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.15, color: colors.primary800 }}>
              DLP
            </b>
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                color: colors.primary800,
                whiteSpace: "nowrap",
              }}
            >
              機密を見分ける
            </span>
          </div>
          <ArrowIcon atSec={segStart(SEG_DLP, 2)} />
          {/* 止められる出口 */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
            }}
          >
            <BlockedExit icon="storage" text="USBへ持ち出し" atSec={segStart(SEG_DLP, 2)} />
            <BlockedExit
              icon="mail"
              text="メールで社外へ"
              atSec={segStart(SEG_DLP, 2) + 0.4}
            />
          </div>
        </div>
        <b
          style={{
            flex: "none",
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...closeAppear,
          }}
        >
          守る対象は場所ではなく、<span style={markerStyle}>データそのもの</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s08: 全体監視の代表 SIEM — 散らばったログを下の帯へ集約（縦の集約図）
// ---------------------------------------------------------------------------

const LogChip: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const chip = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        padding: `${7 * SCALE}px ${6 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...chip,
      }}
    >
      <span style={{ display: "flex", color: colors.textSecondary }}>
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
};

const SiemScene: React.FC = () => {
  const bandAppear = useAppear(segStart(SEG_SIEM, 1) + 0.5, { dy: 14 });
  const signAppear = useAppear(segStart(SEG_SIEM, 2), { dy: 0 });
  const closeAppear = useAppear(segStart(SEG_SIEM, 3), { dy: 10 });
  // 機器がそれぞれログを持っている状態は、このページの前提なので先に出す
  // （SIEM が出るまで本文が空の画面が数秒続くのを避ける）
  const chipBase = 0.3;
  return (
    <SlideShell
      heading="全体監視のマス：記録をつなげて見る"
      icon={<Ms name="monitoring" size={videoType.slideHeadIcon} />}
      narration={SEG_SIEM}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 6 * SCALE,
        }}
      >
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 8 * SCALE, width: "100%" }}>
          <LogChip icon="storage" text="サーバ" atSec={chipBase} />
          <LogChip icon="laptop_mac" text="パソコン" atSec={chipBase + 0.2} />
          <LogChip icon="shield" text="ファイアウォール" atSec={chipBase + 0.4} />
          <LogChip icon="key" text="認証" atSec={chipBase + 0.6} />
        </div>
        <div style={{ flex: "none", display: "flex", justifyContent: "center", gap: 60 * SCALE }}>
          <ArrowIcon atSec={segStart(SEG_SIEM, 1)} size={16} down />
          <ArrowIcon atSec={segStart(SEG_SIEM, 1) + 0.1} size={16} down />
          <ArrowIcon atSec={segStart(SEG_SIEM, 1) + 0.2} size={16} down />
        </div>
        {/* 集約先の帯 */}
        <div
          style={{
            flex: "none",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12 * SCALE,
            padding: `${11 * SCALE}px ${14 * SCALE}px`,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary100}`,
            borderRadius: 18 * SCALE,
            ...bandAppear,
          }}
        >
          <b style={{ fontSize: 24 * SCALE, fontWeight: 800, lineHeight: 1.15, color: colors.primary800 }}>
            SIEM
          </b>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.primary800,
              whiteSpace: "nowrap",
            }}
          >
            集めて、突き合わせる
          </span>
          <ArrowIcon atSec={segStart(SEG_SIEM, 2)} size={16} />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.accentPinkText,
              whiteSpace: "nowrap",
              ...signAppear,
            }}
          >
            <Ms name="search" size={16 * SCALE} />
            攻撃の兆候が浮かび上がる
          </span>
        </div>
        <b
          style={{
            flex: "none",
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...closeAppear,
          }}
        >
          一つでは異常に見えない動きも、<span style={markerStyle}>つなげると見えてくる</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s10: 見逃しと誤検知 — 1本の横軸（ゆるい ⇔ きびしい）
// ---------------------------------------------------------------------------

const FalseCard: React.FC<{
  icon: string;
  term: string;
  what: string;
  atSec: number;
}> = ({ icon, term, what, atSec }) => {
  const card = useAppear(atSec, { dy: 14 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${10 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      <span style={{ display: "flex", color: colors.accentPinkText }}>
        <Ms name={icon} size={19 * SCALE} />
      </span>
      <b style={{ fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        <span style={markerPinkStyle}>{term}</span>
      </b>
      <span
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {what}
      </span>
    </div>
  );
};

const FalseScene: React.FC = () => {
  const axisAppear = useAppear(0.3, { dy: 10 });
  const closeAppear = useAppear(segStart(SEG_FALSE, 3), { dy: 10 });
  return (
    <SlideShell
      heading="判定は、どちらかに外れる"
      icon={<Ms name="balance" size={videoType.slideHeadIcon} />}
      narration={SEG_FALSE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10 * SCALE,
        }}
      >
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 14 * SCALE }}>
          <FalseCard
            icon="visibility_off"
            term="フォールスネガティブ"
            what="危ないものを見逃す"
            atSec={segStart(SEG_FALSE, 1)}
          />
          <FalseCard
            icon="cancel"
            term="フォールスポジティブ"
            what="安全なものを誤って止める"
            atSec={segStart(SEG_FALSE, 2)}
          />
        </div>
        {/* 1本の軸で「どちらかを減らすと、もう一方が増える」を見せる */}
        <div
          style={{
            flex: "none",
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
            ...axisAppear,
          }}
        >
          <div
            style={{
              height: 8 * SCALE,
              borderRadius: 999,
              backgroundColor: colors.primary100,
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
← ゆるくすると、見逃しが増える
            </span>
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
きびしくすると、誤検知が増える →
            </span>
          </div>
        </div>
        <b
          style={{
            flex: "none",
            alignSelf: "center",
            fontSize: 13.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...closeAppear,
          }}
        >
          <span style={markerStyle}>どちらかを減らすと、もう一方が増える</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s11: ★抽象→具体 — 一つの会社で4マスを回収
// ---------------------------------------------------------------------------

const CaseRow: React.FC<{
  event: string;
  product: string;
  place: string;
  atSec: number;
}> = ({ event, product, place, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11 * SCALE,
        padding: `${6 * SCALE}px ${18 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...row,
      }}
    >
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 12.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.25,
          whiteSpace: "nowrap",
        }}
      >
        {event}
      </span>
      <span style={{ flex: "none", color: colors.primary300, display: "flex" }}>
        <Ms name="arrow_forward" size={17 * SCALE} />
      </span>
      <b
        style={{
          flex: "none",
          width: 30 * SCALE,
          textAlign: "right",
          fontSize: 16 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: colors.primary600,
        }}
      >
        {product}
      </b>
      <span
        style={{
          flex: "none",
          width: 64 * SCALE,
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          textAlign: "center",
          whiteSpace: "nowrap",
          borderRadius: 999,
          padding: `${1.5 * SCALE}px ${4 * SCALE}px`,
          color: colors.primary800,
          backgroundColor: colors.primary50,
        }}
      >
        {place}
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => {
  const sceneAppear = useAppear(0.3, { dy: 12 });
  return (
    <SlideShell narration={SEG_CASE}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8 * SCALE,
        }}
      >
        <div
          style={{
            flex: "none",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            gap: 9 * SCALE,
            padding: `${6 * SCALE}px ${16 * SCALE}px`,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary100}`,
            borderRadius: 14 * SCALE,
            color: colors.primary800,
            ...sceneAppear,
          }}
        >
          <Ms name="apartment" size={19 * SCALE} />
          <b style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
            ある会社の、同じ日に起きたこと
          </b>
        </div>
        <CaseRow
          event="社員のパソコンで、不審な動き"
          product="EDR"
          place="端末"
          atSec={segStart(SEG_CASE, 1)}
        />
        <CaseRow
          event="公開しているWebサイトへの攻撃"
          product="WAF"
          place="ネットワーク"
          atSec={segStart(SEG_CASE, 2)}
        />
        <CaseRow
          event="名簿を外へ送ろうとするメール"
          product="DLP"
          place="情報"
          atSec={segStart(SEG_CASE, 3)}
        />
        <CaseRow
          event="これらの記録が一か所に集まる"
          product="SIEM"
          place="全体監視"
          atSec={segStart(SEG_CASE, 4)}
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

export const SgL39SecurityProductsMap: VideoSpec = {
  id: "sg-L39-security-products-map",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "製品は\n守る場所で覚える",
      keywords: ["EDR・MDM", "UTM・WAF", "DLP・SIEM"],
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
      name: "map",
      durationSec: 7,
      narration: SEG_MAP,
      component: MapScene,
    },
    {
      pattern: "custom",
      name: "edr",
      durationSec: 7,
      narration: SEG_EDR,
      component: EdrScene,
    },
    {
      pattern: "custom",
      name: "mdm",
      durationSec: 6,
      narration: SEG_MDM,
      component: MdmScene,
    },
    {
      pattern: "custom",
      name: "utm-waf",
      durationSec: 7,
      narration: SEG_NET,
      component: NetScene,
    },
    {
      pattern: "custom",
      name: "dlp",
      durationSec: 6,
      narration: SEG_DLP,
      component: DlpScene,
    },
    {
      pattern: "custom",
      name: "siem",
      durationSec: 6,
      narration: SEG_SIEM,
      component: SiemScene,
    },
    {
      pattern: "vs",
      heading: "拒否リストと、許可リスト",
      icon: "compare_arrows",
      left: {
        title: "拒否リスト",
        icon: "cancel",
        rows: [
          { k: "考え方", v: "危ないものを止める" },
          { k: "作る一覧", v: "危険なものの一覧" },
          { k: "弱み", v: "新しい危険は素通り" },
        ],
      },
      right: {
        title: "許可リスト",
        icon: "task_alt",
        rows: [
          { k: "考え方", v: "認めたものだけ通す" },
          { k: "作る一覧", v: "安全なものの一覧" },
          { k: "弱み", v: "業務が窮屈になる" },
        ],
      },
      columnAtSec: [segStart(SEG_LIST, 1), segStart(SEG_LIST, 2)],
      narration: SEG_LIST,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "false-positive-negative",
      durationSec: 6,
      narration: SEG_FALSE,
      component: FalseScene,
    },
    {
      pattern: "custom",
      name: "company-case",
      durationSec: 7,
      narration: SEG_CASE,
      component: CaseScene,
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
      question: "紛失時に遠隔でデータを消せるのは？",
      choices: [
        { key: "A", text: "UTM" },
        { key: "B", text: "MDM", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "Webアプリを狙う攻撃を防ぐのは？",
      choices: [
        { key: "A", text: "WAF", correct: true },
        { key: "B", text: "EDR" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "安全なものを誤って止めることは？",
      choices: [
        { key: "A", text: "フォールスネガティブ" },
        { key: "B", text: "フォールスポジティブ", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "製品は名前ではなく、どこを守るかで引く", checkAtSec: segStart(SEG_SUM, 0) },
        { text: "端末はEDR・MDM、ネットワークはUTM・WAF", checkAtSec: segStart(SEG_SUM, 1) },
        { text: "情報はDLP、全体監視はSIEMがまとめる", checkAtSec: segStart(SEG_SUM, 2) },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
