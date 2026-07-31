import { Img, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L31-security-organizations.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L31: セキュリティ機関の地図
 *
 * 発注書 content_works/ipa_sg/orders/L31.md（範囲の正）に対応。
 * シナリオ・用語の呼称・地図の表は narration/ipa_sg/sg-L31-security-organizations.md。
 *
 * 【地図＋代表】の回。機関名を並べて覚えさせず、**3層の地図を先に立てて代表を深く**やる:
 *   導入（自社だけでは手に負えない）→ 司令塔／実働／制度の3層地図（★背骨）→
 *   司令塔の代表 NISC → 実働の代表2つ（IPA・JPCERT/CC・vs）→
 *   ★抽象→具体（弱点を見つけたときの橋渡し = 早期警戒パートナーシップ）→
 *   実働が動かす3つの仕組み（J-CSIP・J-CRAT・JVN）→ wipe-light で制度3つ →
 *   クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 地図を保つ仕掛け: 各ページの分類チップ／見出しに層名（司令塔・実働・制度）を必ず置き、
 * 「いま地図のどこを見ているか」を示す。名前だけを覚えさせないための骨組み。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   組織の**内側**（情報セキュリティ委員会・CSIRT・PSIRT・SOC）は L30 が主担当なので再説明しない
 *   （P2 で「前回は、社内に置くCSIRTなどの組織を見ました」と1回触れて外側へ渡すだけ。
 *   呼称は sg-L30-incident-handling.md に揃えた）。
 *   基準・ガイドラインそのものは L32 なので名前を一つも出さない（機関と「その機関が出すもの」の
 *   関係までに留める）。サイバーセキュリティ基本法の中身は L48、CRYPTREC は L16。
 *   ISAC・Trusted Web推進協議会・情報セキュリティサービス基準 等は暗記カードの領分なので出さない
 *   （動画は1本で完結させるので「暗記カードで」という誘導文も書かない）。
 *
 * 音声と字幕が違う箇所（narration.md の「難読語」の決まり。字幕は N() の第2引数が正）:
 *   CSIRT→シーサート / NISC→ニスク / IPA→アイピーエー / JPCERT/CC→ジェーピーサート /
 *   J-CSIP→ジェイシップ / J-CRAT→ジェイクラート / JVN→ジェーブイエヌ / ISMAP→イスマップ /
 *   SECURITY ACTION→セキュリティアクション / NOTICE→ノーティス / IoT→アイオーティー。
 *   読みが1字ずつでない略語は、字幕にも初出の1回だけ読みを添える。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L31-security-organizations");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、セキュリティに関わる機関と制度について学びます。"),
  // 音声は「しゃないにおくシーサートなどの…」（呼称は L30 に揃えた）
  N("s02-2.mp3", "前回は、社内に置くCSIRTなどの組織を見ました。"),
  N("s02-3.mp3", "けれど、自社だけでは手に負えないことも起こります。"),
  N("s02-4.mp3", "そんなときに頼れる先が、社外にも用意されています。"),
];

const SEG_MAP = [
  N("s03-1.mp3", "関わる機関は多いので、まず地図を三つの層で持ちましょう。"),
  N("s03-2.mp3", "一番上は司令塔で、国として何をするかを決めます。"),
  N("s03-3.mp3", "真ん中は実働で、注意を呼びかけたり、対応を助けたりします。"),
  N("s03-4.mp3", "一番下は制度で、届け出たり、対策を認めたりする仕組みです。"),
  N("s03-5.mp3", "この三つの層に、代表を当てはめていきます。"),
];

const SEG_CMD = [
  N("s04-1.mp3", "まずは、一番上の司令塔です。"),
  N("s04-2.mp3", "国の方針を決めるのが、サイバーセキュリティ戦略本部です。"),
  N("s04-3.mp3", "その事務局を務めるのが、内閣サイバーセキュリティセンターです。"),
  // 音声は「りゃくしてニスクとよばれます。」字幕には初出なので読みを添える
  N("s04-4.mp3", "略してNISC（ニスク）と呼ばれます。"),
  N("s04-5.mp3", "どちらもサイバーセキュリティ基本法にもとづく仕組みで、法律はのちの回で学びます。"),
];

const SEG_OPS = [
  N("s05-1.mp3", "次は、真ん中の実働です。"),
  // 音声は「アイピーエーセキュリティセンターと、ジェーピーサートです。」
  N("s05-2.mp3", "代表は二つで、IPAセキュリティセンターとJPCERT/CC（ジェーピーサート）です。"),
  N("s05-3.mp3", "IPAは、注意喚起を出したり、届出の窓口を引き受けたりします。"),
  N("s05-4.mp3", "JPCERT/CCは、インシデント対応の調整役として動きます。"),
  N("s05-5.mp3", "国内外の関係先をつないで、被害を広げない動きを作ります。"),
];

const SEG_BRIDGE = [
  N("s06-1.mp3", "実働がどう働くのか、具体的な場面で見てみましょう。"),
  N("s06-2.mp3", "あなたが、あるソフトウェアの弱点に気づいたとします。"),
  N("s06-3.mp3", "見つけた人はまずIPAに届け出て、JPCERT/CCが開発者へ連絡します。"),
  N("s06-4.mp3", "開発者が直したうえで、修正版と注意が公表されます。"),
  N("s06-5.mp3", "この橋渡しの枠組みが、情報セキュリティ早期警戒パートナーシップです。"),
];

const SEG_MECH = [
  N("s07-1.mp3", "実働の機関は、目的別の仕組みも動かしています。"),
  N("s07-2.mp3", "J-CSIP（ジェイシップ）は、標的型攻撃の情報を企業のあいだで共有する取り組みです。"),
  N("s07-3.mp3", "J-CRAT（ジェイクラート）は、相談を受けて被害の拡大を食い止めるレスキュー隊です。"),
  N("s07-4.mp3", "JVNは、公表された脆弱性の情報をまとめて見られるデータベースです。"),
];

const SEG_SYS = [
  N("s08-1.mp3", "一番下の層は、制度です。"),
  N("s08-2.mp3", "ISMAP（イスマップ）は、政府が使うクラウドサービスを評価して登録する制度です。"),
  N("s08-3.mp3", "SECURITY ACTIONは、中小企業が対策への取り組みを自ら宣言する制度です。"),
  N("s08-4.mp3", "NOTICEは、危ないIoT機器を調べて、利用者に注意を促す取り組みです。"),
  N("s08-5.mp3", "どれも対象がはっきり違うので、対象で覚えると区別できます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s10-1.mp3", "ここで問題です。"),
  N("s10-2.mp3", "インシデント対応の調整役を担うのは、どちらでしょうか。"),
  N("s10-3.mp3", "正解は、JPCERT/CCで、国内外をつないで調整します。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s11-1.mp3", "次の問題です。"),
  N("s11-2.mp3", "ソフトウェアの弱点を見つけたとき、届け出る先はどちらでしょうか。"),
  N("s11-3.mp3", "正解は、IPAで、そこから開発者へ橋渡しされます。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s12-1.mp3", "最後の問題です。"),
  N("s12-2.mp3", "標的型攻撃の相談を受けて支援するのは、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、J-CRATで、サイバーレスキュー隊とも呼ばれます。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s13-1.mp3", "外部の機関は、司令塔、実働、制度の三つの層で捉えます。"),
  N("s13-2.mp3", "実働の代表は、IPAとJPCERT/CCです。"),
  N("s13-3.mp3", "弱点を見つけたら、まずIPAに届け出ます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（層名・対象などの小さなラベル） */
const Chip: React.FC<{ text: string; tone?: "blue" | "solid" }> = ({ text, tone = "blue" }) => (
  <span
    style={{
      flex: "none",
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: `${2.5 * SCALE}px ${10 * SCALE}px`,
      color: tone === "solid" ? colors.primary600 : colors.primary800,
      backgroundColor: tone === "solid" ? colors.surface : colors.primary100,
    }}
  >
    {text}
  </span>
);

/** 地図の現在位置を示す細い帯（層名 + その層の役割） */
const LayerBar: React.FC<{ layer: string; role: string; atSec: number }> = ({
  layer,
  role,
  atSec,
}) => {
  const bar = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        ...bar,
      }}
    >
      <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
        <Ms name="map" size={16 * SCALE} />
      </span>
      <Chip text={`地図：${layer}`} />
      <span
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {role}
      </span>
    </div>
  );
};

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

// ---------------------------------------------------------------------------
// P2: 導入 — 左イラスト + 右テキスト
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const leadAppear = useAppear(0.3);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-employee-m-worry.png")}
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
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.45,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"自社だけでは、\n"}
            <span style={markerStyle}>手に負えないとき</span>
          </span>
          <NoteChip icon="groups" text="前回は、社内に置く組織" atSec={segStart(SEG_INTRO, 1)} />
          <NoteChip
            icon="public"
            text="今回は、社外の機関と制度"
            atSec={segStart(SEG_INTRO, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 3層の地図（★背骨）— 縦3段の帯（上が濃く、下へ薄くなる）
// ---------------------------------------------------------------------------

const MapBand: React.FC<{
  icon: string;
  layer: string;
  role: string;
  tone: "top" | "mid" | "low";
  bandAtSec: number;
  roleAtSec: number;
}> = ({ icon, layer, role, tone, bandAtSec, roleAtSec }) => {
  const band = useAppear(bandAtSec, { dy: 14 });
  const roleAppear = useAppear(roleAtSec, { dy: 0 });
  const dark = tone === "top";
  const bg =
    tone === "top" ? colors.primary600 : tone === "mid" ? colors.primary100 : colors.primary50;
  const bd =
    tone === "top" ? colors.primary600 : tone === "mid" ? colors.primary300 : colors.primary100;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        padding: `${8 * SCALE}px ${16 * SCALE}px`,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${bd}`,
        borderRadius: 16 * SCALE,
        ...band,
      }}
    >
      <span
        style={{
          flex: "none",
          color: dark ? colors.primary100 : colors.primary600,
          display: "flex",
        }}
      >
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <b
        style={{
          flex: "none",
          fontSize: 15 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: dark ? colors.textPrimaryDark : colors.textPrimary,
          whiteSpace: "nowrap",
        }}
      >
        {layer}
      </b>
      {/* 役割はその層を説明する文の開始に合わせて出す（帯そのものは地図として先に見せる） */}
      <span
        style={{
          marginLeft: "auto",
          fontSize: 12 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          color: dark ? colors.primary100 : colors.textSecondary,
          whiteSpace: "nowrap",
          ...roleAppear,
        }}
      >
        {role}
      </span>
    </div>
  );
};

const MapScene: React.FC = () => (
  <SlideShell
    heading="セキュリティ機関の地図"
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
        gap: 11 * SCALE,
      }}
    >
      <MapBand
        icon="account_balance"
        layer="司令塔"
        role="国として何をするかを決める"
        tone="top"
        bandAtSec={0.3}
        roleAtSec={segStart(SEG_MAP, 1)}
      />
      <MapBand
        icon="campaign"
        layer="実働"
        role="呼びかける・対応を助ける"
        tone="mid"
        bandAtSec={0.55}
        roleAtSec={segStart(SEG_MAP, 2)}
      />
      <MapBand
        icon="policy"
        layer="制度"
        role="届け出る・対策を認める"
        tone="low"
        bandAtSec={0.8}
        roleAtSec={segStart(SEG_MAP, 3)}
      />
      {/* 字幕と同じ文を画面にも書かない（二重になる）。地図の使い方を一言だけ足す */}
      <span style={{ alignSelf: "center", marginTop: 2 * SCALE }}>
        <NoteChip
          icon="label"
          text="覚えるのは、名前より「地図のどこか」"
          atSec={segStart(SEG_MAP, 4)}
        />
      </span>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P4: 司令塔の代表 — 左カード（戦略本部）+ 右キーワード見出し（NISC が主役）
// ---------------------------------------------------------------------------

const CommandScene: React.FC = () => {
  const cardAppear = useAppear(segStart(SEG_CMD, 1), { dy: 14 });
  const chipAppear = useAppear(segStart(SEG_CMD, 2), { dy: 10 });
  const descAppear = useAppear(segStart(SEG_CMD, 2) + 0.3, { dy: 12 });
  const termAppear = usePop(segStart(SEG_CMD, 3));
  const noteAppear = useAppear(segStart(SEG_CMD, 4), { dy: 10 });
  return (
    <SlideShell narration={SEG_CMD}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14 * SCALE,
        }}
      >
        <LayerBar layer="司令塔" role="国として何をするかを決める" atSec={0.3} />
        <div style={{ flex: "none", display: "flex", alignItems: "center", gap: "5%" }}>
          {/* 左: 方針を決める側 */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 6 * SCALE,
              padding: `${12 * SCALE}px ${16 * SCALE}px ${14 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 16 * SCALE,
              ...cardAppear,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
              <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
                <Ms name="gavel" size={17 * SCALE} />
              </span>
              <Chip text="方針を決める" />
            </span>
            <b
              style={{
                fontSize: 16 * SCALE,
                fontWeight: 800,
                lineHeight: 1.25,
                whiteSpace: "pre-line",
              }}
            >
              {"サイバーセキュリティ\n戦略本部"}
            </b>
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 700,
                lineHeight: 1.3,
                color: colors.textSecondary,
              }}
            >
              国の方針を決める
            </span>
          </div>
          {/* 右: 実務を担う側（この回の新出用語なので、こちらを主役にする） */}
          <div
            style={{
              flex: 1.15,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 5 * SCALE,
            }}
          >
            <span style={chipAppear}>
              <Chip text="司令塔の事務局" />
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 9 * SCALE,
                ...termAppear,
              }}
            >
              <b style={{ flex: "none", fontSize: 32 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
                <span style={markerStyle}>NISC</span>
              </b>
              <span
                style={{
                  flex: "none",
                  fontSize: 11 * SCALE,
                  fontWeight: 700,
                  color: colors.textSecondary,
                  whiteSpace: "nowrap",
                }}
              >
                ニスク
              </span>
            </span>
            {/* 正式名称は15文字あるので 11.5×SCALE + nowrap（12.5×SCALE だと「ー」だけが折り返す） */}
            <span
              style={{
                fontSize: 11.5 * SCALE,
                fontWeight: 700,
                lineHeight: 1.5,
                whiteSpace: "nowrap",
                ...descAppear,
              }}
            >
              内閣サイバーセキュリティセンター
              <br />
              {/* 11.5×SCALE の文字にマーカーを引くと帯が細すぎて汚れに見えるので引かない */}
              戦略本部の事務局を務める
            </span>
          </div>
        </div>
        <span style={{ ...noteAppear, flex: "none" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7 * SCALE,
              fontSize: 10.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            <Ms name="history_edu" size={15 * SCALE} />
            根拠：サイバーセキュリティ基本法
          </span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: ★抽象→具体 — 弱点を見つけたら、誰にどう届くか（横4ノード + 矢印）
// ---------------------------------------------------------------------------

const BridgeNode: React.FC<{
  icon: string;
  name: string;
  note: string;
  strong?: boolean;
  atSec: number;
}> = ({ icon, name, note, strong, atSec }) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${12 * SCALE}px ${5 * SCALE}px ${13 * SCALE}px`,
        backgroundColor: strong ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${strong ? colors.primary300 : colors.border}`,
        borderRadius: 15 * SCALE,
        ...card,
      }}
    >
      <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={22 * SCALE} />
      </span>
      {/* カード内幅は約 257px しかないので、名前は 12.5×SCALE で1行5文字までに抑える */}
      <b
        style={{
          fontSize: 12.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          textAlign: "center",
          lineHeight: 1.35,
          whiteSpace: "nowrap",
        }}
      >
        {note}
      </span>
    </div>
  );
};

const BridgeArrow: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const arrow = useAppear(atSec, { dy: 0 });
  return (
    <span
      style={{
        flex: "none",
        // 親が alignItems: stretch なので、明示しないと矢印がカードの上端に張り付く
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
        color: colors.primary600,
        ...arrow,
      }}
    >
      <Ms name="arrow_forward" size={14 * SCALE} />
      <span
        style={{
          fontSize: 9 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </span>
  );
};

const BridgeScene: React.FC = () => {
  const leadAppear = useAppear(segStart(SEG_BRIDGE, 1), { dy: 10 });
  const nameAppear = useAppear(segStart(SEG_BRIDGE, 4), { dy: 10 });
  return (
    <SlideShell
      heading="弱点を見つけたら、どこへ届くか"
      icon={<Ms name="bug_report" size={videoType.slideHeadIcon} />}
      narration={SEG_BRIDGE}
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
        <span
          style={{
            flex: "none",
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...leadAppear,
          }}
        >
          あるソフトウェアの<span style={markerStyle}>弱点に気づいた</span>とき
        </span>
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 5 * SCALE }}>
          <BridgeNode
            icon="person"
            name="見つけた人"
            note="弱点に気づく"
            atSec={segStart(SEG_BRIDGE, 1)}
          />
          <BridgeArrow label="届け出る" atSec={segStart(SEG_BRIDGE, 2) - 0.2} />
          <BridgeNode
            icon="campaign"
            name="IPA"
            note="届出の窓口"
            strong
            atSec={segStart(SEG_BRIDGE, 2)}
          />
          <BridgeArrow label="つなぐ" atSec={segStart(SEG_BRIDGE, 2) + 1.6} />
          <BridgeNode
            icon="support_agent"
            name="JPCERT/CC"
            note="開発者へ連絡"
            strong
            atSec={segStart(SEG_BRIDGE, 2) + 1.9}
          />
          <BridgeArrow label="直す" atSec={segStart(SEG_BRIDGE, 3) - 0.2} />
          <BridgeNode
            icon="build"
            name="開発者"
            note="修正版を公開"
            atSec={segStart(SEG_BRIDGE, 3)}
          />
        </div>
        {/* この枠組みの名前がこのページの新出用語なので、字幕の文を写さず用語そのものを主役にする */}
        <span
          style={{
            flex: "none",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            gap: 10 * SCALE,
            ...nameAppear,
          }}
        >
          <Chip text="この橋渡しの枠組み" />
          {/* 20文字あるので 13.5×SCALE（15×SCALE だと chip と合わせて本文幅 1690px を使い切る） */}
          <b
            style={{
              flex: "none",
              fontSize: 13.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            <span style={markerStyle}>情報セキュリティ早期警戒パートナーシップ</span>
          </b>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 実働が動かす3つの仕組み — 縦3行リスト（用語を行の主役にする）
// ---------------------------------------------------------------------------

const MechRow: React.FC<{
  icon: string;
  term: string;
  reading?: string;
  desc: string;
  atSec: number;
}> = ({ icon, term, reading, desc, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        // 3行 + 見出し + リード行で本文領域（約655px）がぎりぎりなので padding は詰めておく
        padding: `${5 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...row,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 22 * SCALE,
          height: 22 * SCALE,
          borderRadius: 10 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={16 * SCALE} />
      </span>
      {/* 用語を行の主役にする（desc より2段大きく＋マーカー）。読みは右に小さく並べる */}
      <b
        style={{
          flex: "none",
          fontSize: 16 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        <span style={markerStyle}>{term}</span>
      </b>
      {reading ? (
        <span
          style={{
            flex: "none",
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
          }}
        >
          {reading}
        </span>
      ) : null}
      <span
        style={{
          marginLeft: "auto",
          fontSize: 11.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const MechanismScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  return (
    <SlideShell
      heading="実働：目的別の三つの仕組み"
      icon={<Ms name="schema" size={videoType.slideHeadIcon} />}
      narration={SEG_MECH}
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
        <span
          style={{
            flex: "none",
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...leadAppear,
          }}
        >
          IPAとJPCERT/CCが動かす、<span style={markerStyle}>目的別</span>の仕組み
        </span>
        <MechRow
          icon="forum"
          term="J-CSIP"
          reading="ジェイシップ"
          desc="企業のあいだで攻撃の情報を共有する"
          atSec={segStart(SEG_MECH, 1)}
        />
        <MechRow
          icon="support_agent"
          term="J-CRAT"
          reading="ジェイクラート"
          desc="相談を受けて被害の拡大を食い止める"
          atSec={segStart(SEG_MECH, 2)}
        />
        <MechRow
          icon="database"
          term="JVN"
          desc="公表された脆弱性情報のデータベース"
          atSec={segStart(SEG_MECH, 3)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 制度の代表3つ — 横3カード（対象をイラストで見せる。wipe-light で章転換）
// ---------------------------------------------------------------------------

const SystemCard: React.FC<{
  image: string;
  target: string;
  term: string;
  reading?: string;
  desc: string;
  atSec: number;
}> = ({ image, target, term, reading, desc, atSec }) => {
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
        padding: `${10 * SCALE}px ${14 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      {/* 画像は flex で伸ばさず実寸で置く（column の中で flex:1 にすると高さが 0 に潰れる） */}
      <Img
        src={staticFile(`images/ipa_sg/${image}`)}
        style={{
          flex: "none",
          width: 30 * SCALE,
          height: 30 * SCALE,
          objectFit: "contain",
          mixBlendMode: "multiply",
        }}
      />
      <Chip text={target} />
      {/* カード内幅は約 416px。SECURITY ACTION（英字15文字）が1行に収まる上限が 12×SCALE */}
      <b
        style={{
          fontSize: 12 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        <span style={markerStyle}>{term}</span>
      </b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {reading ?? " "}
      </span>
      {/* desc は1行に収める（2行にすると3枚の高さが増えて下の注記が字幕帯に食い込む）。
          カード内幅は約 416px なので 10.5×SCALE で8文字が上限 */}
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.4,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const SystemScene: React.FC = () => (
  <SlideShell
    heading="制度：届け出る・認める"
    icon={<Ms name="policy" size={videoType.slideHeadIcon} />}
    narration={SEG_SYS}
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
      <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 13 * SCALE }}>
        <SystemCard
          image="icon-cloud.png"
          target="政府が使うクラウド"
          term="ISMAP"
          reading="イスマップ"
          desc="評価して登録する"
          atSec={segStart(SEG_SYS, 1)}
        />
        <SystemCard
          image="icon-building.png"
          target="中小企業"
          term="SECURITY ACTION"
          desc="自ら宣言する"
          atSec={segStart(SEG_SYS, 2)}
        />
        <SystemCard
          image="icon-smartphone.png"
          target="IoT機器"
          term="NOTICE"
          reading="ノーティス"
          desc="調べて注意を促す"
          atSec={segStart(SEG_SYS, 3)}
        />
      </div>
      <span style={{ alignSelf: "center" }}>
        <NoteChip
          icon="lightbulb"
          text="名前ではなく「対象」で覚えると区別できる"
          atSec={segStart(SEG_SYS, 4)}
        />
      </span>
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

export const SgL31SecurityOrganizations: VideoSpec = {
  id: "sg-L31-security-organizations",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "セキュリティ\n機関の地図",
      keywords: ["司令塔", "実働", "制度"],
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
      durationSec: 6,
      narration: SEG_MAP,
      component: MapScene,
    },
    {
      pattern: "custom",
      name: "command",
      durationSec: 6,
      narration: SEG_CMD,
      component: CommandScene,
    },
    {
      pattern: "vs",
      heading: "実働の代表 — IPAとJPCERT/CC",
      icon: "campaign",
      left: {
        title: "IPAセキュリティセンター",
        icon: "campaign",
        rows: [
          { k: "立場", v: "国内の推進機関" },
          { k: "主な仕事", v: "注意喚起と届出受付" },
          { k: "強み", v: "窓口としての情報集約" },
        ],
      },
      right: {
        title: "JPCERT/CC",
        icon: "support_agent",
        rows: [
          { k: "立場", v: "対応の調整役" },
          { k: "主な仕事", v: "インシデント対応の調整" },
          { k: "強み", v: "国内外の関係先をつなぐ" },
        ],
      },
      columnAtSec: [segStart(SEG_OPS, 2), segStart(SEG_OPS, 3)],
      narration: SEG_OPS,
    },
    {
      pattern: "custom",
      name: "bridge",
      durationSec: 7,
      narration: SEG_BRIDGE,
      component: BridgeScene,
    },
    {
      pattern: "custom",
      name: "mechanisms",
      durationSec: 6,
      narration: SEG_MECH,
      component: MechanismScene,
    },
    {
      pattern: "custom",
      name: "systems",
      durationSec: 7,
      narration: SEG_SYS,
      component: SystemScene,
      transitionIn: "wipe-light",
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
      question: "インシデント対応の調整役は？",
      choices: [
        { key: "A", text: "JPCERT/CC", correct: true },
        { key: "B", text: "NISC" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "弱点を見つけたときの届出先は？",
      choices: [
        { key: "A", text: "見つけた人が自分で公表" },
        { key: "B", text: "IPAに届け出る", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "標的型攻撃の相談を受けるのは？",
      choices: [
        { key: "A", text: "J-CRAT（レスキュー隊）", correct: true },
        { key: "B", text: "JVN（脆弱性の情報源）" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "機関は司令塔・実働・制度の三層で捉えます。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "実働の代表は、IPAとJPCERT/CCです。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "弱点を見つけたら、まずIPAに届け出ます。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
