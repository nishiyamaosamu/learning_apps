import { Img, staticFile } from "remotion";
import { colors, fontMono, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L43-email-domain-auth.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L43: メールのセキュリティ①（送信元ドメイン認証）
 *
 * 発注書 content_works/ipa_sg/orders/L43.md（範囲の正）に対応。
 * シナリオ・ページ設計は narration/ipa_sg/sg-L43-email-domain-auth.md。
 *
 * 対策側だけを語る回。攻撃側（フィッシング・第三者中継）は L10 が主担当なので、
 * s02 で「差出人の欄は送る側が自由に書ける」という L10 の前提を1文で受け直すだけにし、
 * 手口の説明には戻らない。本編の背骨は「見た目 → 送ってきたサーバ」という発想の転換（s04）で、
 * SPF・DKIM・DMARC はその一つの発想の三つの現れとして順に置き、s09 で1通のメールに束ねる。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   S/MIME・PGP・SMTP-AUTH・OP25B・スパムフィルタは L44 なので名前も出さない。
 *   SMTP・メールサーバの詳細は L62、DNSの名前解決は L61 なので s03 は「渡す」「探す」だけ。
 *   デジタル署名の仕組みは L17 なので s06 は「署名を付ける／公開鍵で検証する」に留める。
 *
 * 音声と字幕が違う箇所（narration.md の決まり。字幕は N() の第2引数が正）:
 *   SPF・DNS・IPアドレスは1字ずつ読む略語なので音声側だけ仮名書き（字幕に読みは添えない）。
 *   DKIM→ディーキム・DMARC→ディーマーク は定着した読み方があるので、
 *   字幕は初出（s06-1・s08-1）だけ読みを添える。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L43-email-domain-auth");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "メールの差出人の欄は、送る側が自由に書けると学びました。"),
  N("s02-2.mp3", "名前もアドレスも、本物そっくりに名乗ることができます。"),
  N("s02-3.mp3", "では、受け取る側は、何を手がかりに確かめればよいのでしょうか。"),
  N("s02-4.mp3", "今回は、送信元のドメインを確かめる、三つの仕組みを学びます。"),
];

const SEG_DELIVERY = [
  N("s03-1.mp3", "はじめに、メールがどのように届くのかを確認します。"),
  N("s03-2.mp3", "メールは、送信側のサーバから受信側のサーバへ渡されます。"),
  // 音声は「…、ディーエヌエスという仕組みです。」
  N("s03-3.mp3", "宛先のサーバを探すときに使われるのが、DNSという仕組みです。"),
  N("s03-4.mp3", "ドメイン名から、つなぎ先を調べる住所録だと思ってください。"),
];

const SEG_IDEA = [
  N("s04-1.mp3", "差出人の欄は、いくらでも書き換えられます。"),
  N("s04-2.mp3", "そこで、見た目で判断するのをやめます。"),
  N("s04-3.mp3", "送ってきたサーバが、そのドメインの正規のものかを確かめます。"),
  N("s04-4.mp3", "この考え方を、送信元ドメイン認証といいます。"),
  N("s04-5.mp3", "判定するのは人の目ではなく、受信側のサーバです。"),
];

const SEG_SPF = [
  // 音声は「一つ目の仕組みが、エスピーエフです。」
  N("s05-1.mp3", "一つ目の仕組みが、SPFです。"),
  N("s05-2.mp3", "送信側は、自分のドメインのメールを送るサーバを、DNSに書いておきます。"),
  N("s05-3.mp3", "受信側は、送信元IPアドレスをその一覧と照合します。"),
  N("s05-4.mp3", "一覧に無いサーバから来ていれば、なりすましと判断できます。"),
  N("s05-5.mp3", "確かめているのは中身ではなく、送ってきたサーバそのものです。"),
];

const SEG_DKIM = [
  // 読みを字幕に添えるのは初出のこの1回だけ
  N("s06-1.mp3", "二つ目の仕組みが、DKIM（ディーキム）です。"),
  N("s06-2.mp3", "送信側は、メールにデジタル署名を付けて送り出します。"),
  N("s06-3.mp3", "受信側は、DNSに公開された鍵で、その署名を検証します。"),
  N("s06-4.mp3", "検証が通れば、そのドメインから送られたことが確かめられます。"),
  N("s06-5.mp3", "さらに、途中で中身が書き換えられていないことまで分かります。"),
];

const SEG_VS = [
  N("s07-1.mp3", "二つを並べて、違いを整理しましょう。"),
  N("s07-2.mp3", "SPFが見るのは、どのサーバから送られてきたか、です。"),
  N("s07-3.mp3", "DKIMが見るのは、正しい鍵で署名された中身かどうか、です。"),
  N("s07-4.mp3", "改ざんされていないことまで分かるのは、DKIMのほうです。"),
];

const SEG_DMARC = [
  // 読みを字幕に添えるのは初出のこの1回だけ
  N("s08-1.mp3", "三つ目の仕組みが、DMARC（ディーマーク）です。"),
  N("s08-2.mp3", "検証に失敗したメールを、受信側はどう扱えばよいのでしょうか。"),
  N("s08-3.mp3", "その方針を、送信側があらかじめDNSで宣言しておく仕組みです。"),
  N("s08-4.mp3", "方針は、そのまま受け取る、隔離する、拒否する、の三つです。"),
  N("s08-5.mp3", "迷惑メールのフォルダに入れるのが、隔離にあたります。"),
];

const SEG_FLOW = [
  N("s09-1.mp3", "一通のメールが届いたときの流れで、三つをつなげます。"),
  N("s09-2.mp3", "受信側のサーバは、まずSPFとDKIMで検証します。"),
  N("s09-3.mp3", "どちらも通れば正規の送信元と判断され、受信箱に届きます。"),
  N("s09-4.mp3", "失敗したときは、DMARCで宣言された方針に従います。"),
  N("s09-5.mp3", "隔離なら迷惑メールへ、拒否なら受け取られずに終わります。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "SPFが照合するのは、どちらでしょうか。"),
  N("s11-3.mp3", "正解は、メールを送ってきたサーバです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "中身の改ざんまで分かるのは、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、デジタル署名を使うDKIMです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "検証に失敗したメールの扱いを宣言するのは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、送信側が方針を宣言するDMARCです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s14-1.mp3", "差出人の見た目ではなく、送ってきたサーバを確かめます。"),
  N("s14-2.mp3", "SPFはサーバを照合し、DKIMは署名で中身まで確かめます。"),
  N("s14-3.mp3", "DMARCは、検証に失敗したメールの扱いを宣言します。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ */
const Chip: React.FC<{ text: string; pink?: boolean }> = ({ text, pink }) => (
  <span
    style={{
      flex: "none",
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: `${2 * SCALE}px ${10 * SCALE}px`,
      color: pink ? colors.accentPinkText : colors.primary800,
      backgroundColor: pink ? colors.accentPinkSurface : colors.primary100,
    }}
  >
    {text}
  </span>
);

/** アイコンの器（丸角の淡いブロック） */
const IconBox: React.FC<{ icon: string; size?: number; pink?: boolean }> = ({
  icon,
  size = 24,
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

/** 矢印（→ / ↓）。SVGの座標計算を持ち込まない */
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
// s02: 導入 — 左に「名乗り放題」の再確認と問い、右にイラスト
// ---------------------------------------------------------------------------

const IntroLine: React.FC<{
  icon: string;
  text: React.ReactNode;
  atSec: number;
  pink?: boolean;
}> = ({ icon, text, atSec, pink }) => {
  const line = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        fontSize: 12.5 * SCALE,
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

const IntroScene: React.FC = () => {
  const illust = useAppear(0.5);
  const chip = useAppear(0.3);
  const question = useAppear(segStart(SEG_INTRO, 2), { dy: 12 });
  const answer = useAppear(segStart(SEG_INTRO, 3), { dy: 12 });
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
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
          <span style={chip}>
            <Chip text="前回までの前提" />
          </span>
          {/* L10 で学んだ前提を1文で受け直すだけ（攻撃の手口には戻らない） */}
          <IntroLine icon="mail" text="差出人の欄は、送る側が自由に書ける" atSec={0.5} pink />
          <IntroLine icon="badge" text="名前もアドレスも、本物そっくりに名乗れる" atSec={segStart(SEG_INTRO, 1)} pink />
          <b
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.35,
              whiteSpace: "pre-line",
              ...question,
            }}
          >
            {"では、受け取る側は\n"}
            <span style={markerStyle}>何を手がかりに</span>確かめる？
          </b>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              color: colors.textSecondary,
              whiteSpace: "nowrap",
              ...answer,
            }}
          >
            送信元のドメインを確かめる、三つの仕組み
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-employee-f-worry.png")}
          style={{
            flex: 0.9,
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
// s03: 【前提】メールはどう届くか — 横チェーン + 下にDNS
// ---------------------------------------------------------------------------

const ChainNode: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => {
  const node = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${9 * SCALE}px ${6 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...node,
      }}
    >
      <IconBox icon={icon} size={22} />
      <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        {label}
      </b>
    </div>
  );
};

const DeliveryScene: React.FC = () => {
  const dnsCard = useAppear(segStart(SEG_DELIVERY, 2), { dy: 12 });
  const dnsNote = useAppear(segStart(SEG_DELIVERY, 3), { dy: 10 });
  return (
    <SlideShell
      heading="メールは、サーバからサーバへ渡る"
      icon={<Ms name="alt_route" size={videoType.slideHeadIcon} />}
      narration={SEG_DELIVERY}
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
        <div
          style={{
            flex: "none",
            width: "100%",
            display: "flex",
            alignItems: "stretch",
            gap: 6 * SCALE,
          }}
        >
          <ChainNode icon="person" label="送る人" atSec={0.3} />
          <ArrowIcon atSec={0.5} size={16} />
          <ChainNode icon="storage" label="送信側のサーバ" atSec={segStart(SEG_DELIVERY, 1)} />
          <ArrowIcon atSec={segStart(SEG_DELIVERY, 1) + 0.3} size={16} />
          <ChainNode icon="storage" label="受信側のサーバ" atSec={segStart(SEG_DELIVERY, 1) + 0.5} />
          <ArrowIcon atSec={segStart(SEG_DELIVERY, 1) + 0.8} size={16} />
          <ChainNode icon="person" label="受け取る人" atSec={segStart(SEG_DELIVERY, 1) + 1.0} />
        </div>
        <ArrowIcon atSec={segStart(SEG_DELIVERY, 2)} size={16} down />
        {/* 宛先探しに使われるのが DNS。名前解決の詳細は L61 の領分なので「探す」だけ */}
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 12 * SCALE,
            padding: `${10 * SCALE}px ${18 * SCALE}px`,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary100}`,
            borderRadius: 18 * SCALE,
            ...dnsCard,
          }}
        >
          <span style={{ display: "flex", color: colors.primary600, flex: "none" }}>
            <Ms name="dns" size={22 * SCALE} />
          </span>
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.15, color: colors.primary800 }}>
            DNS
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
            宛先のサーバを探すのに使う
          </span>
        </div>
        <b style={{ flex: "none", fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...dnsNote }}>
          ドメイン名から<span style={markerStyle}>つなぎ先を調べる住所録</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s04: ★背骨 — 発想の転換（見た目 → 送ってきたサーバ）とキーワード見出し
// ---------------------------------------------------------------------------

const IdeaScene: React.FC = () => {
  const oldWay = useAppear(0.3, { dy: 10 });
  const arrow = useAppear(segStart(SEG_IDEA, 1), { dy: 0 });
  const newWay = useAppear(segStart(SEG_IDEA, 2), { dy: 12 });
  const chip = useAppear(segStart(SEG_IDEA, 3), { dy: 10 });
  const term = useAppear(segStart(SEG_IDEA, 3) + 0.2, { dy: 12 });
  const judge = useAppear(segStart(SEG_IDEA, 4), { dy: 10 });
  return (
    <SlideShell narration={SEG_IDEA}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 7 * SCALE,
        }}
      >
        {/* 何を見るのをやめ、何を見るのか。上下2段で置き換える */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9 * SCALE,
            fontSize: 14 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            color: colors.accentPinkText,
            whiteSpace: "nowrap",
            ...oldWay,
          }}
        >
          <span style={{ flex: "none", display: "flex" }}>
            <Ms name="visibility_off" size={20 * SCALE} />
          </span>
          {/* 取り消し線は文字だけに掛ける（親に掛けるとアイコンにも線が走る） */}
          <span
            style={{
              textDecorationLine: "line-through",
              textDecorationThickness: 2 * SCALE,
            }}
          >
            差出人の欄の見た目で判断する
          </span>
        </span>
        <span style={{ display: "flex", color: colors.primary300, ...arrow }}>
          <Ms name="arrow_downward" size={20 * SCALE} />
        </span>
        <b
          style={{
            fontSize: 16 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...newWay,
          }}
        >
          <span style={markerStyle}>送ってきたサーバ</span>が、そのドメインの正規のサーバか
        </b>
        <span style={{ marginTop: 3 * SCALE, ...chip }}>
          <Chip text="この考え方の名前" />
        </span>
        <b style={{ fontSize: 32 * SCALE, fontWeight: 800, lineHeight: 1.15, ...term }}>
          <span style={markerStyle}>送信元ドメイン認証</span>
        </b>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
            ...judge,
          }}
        >
          <span style={{ flex: "none", display: "flex", color: colors.primary600 }}>
            <Ms name="storage" size={18 * SCALE} />
          </span>
          判定するのは人の目ではなく、受信側のサーバ
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s05: SPF — 上段「送る側がDNSに宣言」／下段「受信側が照合」
// ---------------------------------------------------------------------------

const SpfScene: React.FC = () => {
  const head = useAppear(0.3, { dy: 12 });
  const record = useAppear(segStart(SEG_SPF, 1), { dy: 12 });
  const check = useAppear(segStart(SEG_SPF, 2), { dy: 12 });
  const verdict = useAppear(segStart(SEG_SPF, 3), { dy: 10 });
  const close = useAppear(segStart(SEG_SPF, 4), { dy: 10 });
  return (
    <SlideShell narration={SEG_SPF}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7 * SCALE,
        }}
      >
        <span
          style={{
            flex: "none",
            display: "flex",
            alignItems: "baseline",
            gap: 12 * SCALE,
            ...head,
          }}
        >
          <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.15 }}>
            <span style={markerStyle}>SPF</span>
          </b>
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.textSecondary,
              whiteSpace: "nowrap",
            }}
          >
            送るサーバをDNSに宣言し、受信側が照合する
          </span>
        </span>

        {/* 上段: 送信側の宣言（DNSに書かれている一覧） */}
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 10 * SCALE,
            padding: `${9 * SCALE}px ${14 * SCALE}px`,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary100}`,
            borderRadius: 16 * SCALE,
            ...record,
          }}
        >
          <span style={{ flex: "none", display: "flex", color: colors.primary600 }}>
            <Ms name="dns" size={20 * SCALE} />
          </span>
          <span
            style={{
              flex: "none",
              fontSize: 11 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.primary800,
              whiteSpace: "nowrap",
            }}
          >
            example社が宣言
          </span>
          <span
            style={{
              flex: 1,
              minWidth: 0,
              fontFamily: fontMono,
              fontSize: 12 * SCALE,
              fontWeight: 700,
              lineHeight: 1.2,
              color: colors.textPrimary,
              whiteSpace: "nowrap",
            }}
          >
            送信を許可するサーバ ＝ 203.0.113.10
          </span>
        </div>

        {/* 下段: 受信側の照合（届いたメールの送信元と突き合わせる） */}
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 9 * SCALE,
            ...check,
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 3 * SCALE,
              padding: `${8 * SCALE}px ${13 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 14 * SCALE,
            }}
          >
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
              届いたメールの送信元
            </span>
            <b
              style={{
                fontFamily: fontMono,
                fontSize: 14 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              198.51.100.7
            </b>
          </div>
          <span
            style={{
              flex: "none",
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              color: colors.primary600,
              fontSize: 11 * SCALE,
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            <Ms name="compare_arrows" size={20 * SCALE} />
            照合
          </span>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 8 * SCALE,
              padding: `${8 * SCALE}px ${13 * SCALE}px`,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
              borderRadius: 14 * SCALE,
              color: colors.accentPinkText,
              ...verdict,
            }}
          >
            <Ms name="cancel" size={19 * SCALE} />
            <b style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
              一覧に無い＝なりすまし
            </b>
          </div>
        </div>

        <b
          style={{
            flex: "none",
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...close,
          }}
        >
          確かめるのは中身ではなく、<span style={markerStyle}>送ってきたサーバそのもの</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s06: DKIM — 署名つきメール → DNSの公開鍵で検証 → 分かることが2つ
// ---------------------------------------------------------------------------

const CheckLine: React.FC<{ text: React.ReactNode; atSec: number }> = ({ text, atSec }) => {
  const line = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${6 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        fontSize: 12 * SCALE,
        fontWeight: 800,
        lineHeight: 1.25,
        whiteSpace: "nowrap",
        ...line,
      }}
    >
      <span style={{ flex: "none", display: "flex", color: colors.primary600 }}>
        <Ms name="check_circle" size={18 * SCALE} />
      </span>
      {text}
    </span>
  );
};

const DkimScene: React.FC = () => {
  const head = useAppear(0.3, { dy: 12 });
  const mail = useAppear(segStart(SEG_DKIM, 1), { dy: 12 });
  const illust = useAppear(segStart(SEG_DKIM, 1) + 0.3);
  const key = useAppear(segStart(SEG_DKIM, 2), { dy: 12 });
  return (
    <SlideShell narration={SEG_DKIM}>
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
        <span style={{ flex: "none", display: "flex", alignItems: "baseline", gap: 12 * SCALE, ...head }}>
          <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.15 }}>
            <span style={markerStyle}>DKIM</span>
          </b>
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.textSecondary,
              whiteSpace: "nowrap",
            }}
          >
            デジタル署名を付けて送り、公開鍵で検証する
          </span>
        </span>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10 * SCALE,
          }}
        >
          {/* 署名つきのメール（送信側） */}
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5 * SCALE,
              padding: `${9 * SCALE}px ${18 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 16 * SCALE,
              ...mail,
            }}
          >
            <IconBox icon="mail" size={22} />
            <b style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
              送るメール
            </b>
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                borderRadius: 999,
                padding: `${2 * SCALE}px ${9 * SCALE}px`,
                color: colors.primary800,
                backgroundColor: colors.primary50,
              }}
            >
              ＋ デジタル署名
            </span>
          </div>
          <Img
            src={staticFile("images/ipa_sg/tech-signature.png")}
            style={{
              flex: "none",
              width: 42 * SCALE,
              alignSelf: "stretch",
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illust,
            }}
          />
          <ArrowIcon atSec={segStart(SEG_DKIM, 2)} size={16} />
          {/* DNS の公開鍵で検証（受信側） */}
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
              padding: `${9 * SCALE}px ${18 * SCALE}px`,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary100}`,
              borderRadius: 16 * SCALE,
              ...key,
            }}
          >
            <IconBox icon="key" size={22} />
            <b
              style={{
                fontSize: 12 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                color: colors.primary800,
                whiteSpace: "nowrap",
              }}
            >
              DNSの公開鍵
            </b>
            <span
              style={{
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                color: colors.primary800,
                whiteSpace: "nowrap",
              }}
            >
              署名を検証
            </span>
          </div>
        </div>

        {/* 検証が通ると分かること（2つ）。横並びの3段目に置くと右へあふれるので下段に降ろす */}
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 9 * SCALE,
          }}
        >
          <CheckLine text="そのドメインから送られた" atSec={segStart(SEG_DKIM, 3)} />
          <CheckLine
            text={
              <span>
                中身が<span style={markerStyle}>改ざんされていない</span>
              </span>
            }
            atSec={segStart(SEG_DKIM, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s08: DMARC — 検証に失敗したメールの扱いを、送信側が宣言する
// ---------------------------------------------------------------------------

const PolicyCard: React.FC<{
  icon: string;
  name: string;
  what: string;
  pink?: boolean;
  atSec: number;
}> = ({ icon, name, what, pink, atSec }) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${11 * SCALE}px ${8 * SCALE}px`,
        backgroundColor: pink ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${pink ? colors.accentPinkSoft : colors.border}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      <IconBox icon={icon} size={22} pink={pink} />
      <b
        style={{
          fontSize: 15 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          color: pink ? colors.accentPinkText : colors.textPrimary,
        }}
      >
        {name}
      </b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          color: pink ? colors.accentPinkText : colors.textSecondary,
        }}
      >
        {what}
      </span>
    </div>
  );
};

const DmarcScene: React.FC = () => {
  const head = useAppear(0.3, { dy: 12 });
  const question = useAppear(segStart(SEG_DMARC, 1), { dy: 10 });
  const declare = useAppear(segStart(SEG_DMARC, 2), { dy: 10 });
  const note = useAppear(segStart(SEG_DMARC, 4), { dy: 10 });
  const base = segStart(SEG_DMARC, 3);
  return (
    <SlideShell narration={SEG_DMARC}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7 * SCALE,
        }}
      >
        <span style={{ flex: "none", display: "flex", alignItems: "baseline", gap: 12 * SCALE, ...head }}>
          <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.15 }}>
            <span style={markerStyle}>DMARC</span>
          </b>
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.textSecondary,
              whiteSpace: "nowrap",
            }}
          >
            検証に失敗したメールの扱いを、送信側が宣言する
          </span>
        </span>

        <span
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            color: colors.accentPinkText,
            whiteSpace: "nowrap",
            ...question,
          }}
        >
          <span style={{ flex: "none", display: "flex" }}>
            <Ms name="help" size={19 * SCALE} />
          </span>
          SPF・DKIMに失敗したメールは、どう扱う？
        </span>

        <span
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...declare,
          }}
        >
          <span style={{ flex: "none", display: "flex", color: colors.primary600 }}>
            <Ms name="dns" size={18 * SCALE} />
          </span>
          送信側があらかじめ<span style={markerStyle}>DNSで宣言</span>しておく
        </span>

        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 9 * SCALE }}>
          <PolicyCard icon="mail" name="そのまま受け取る" what="何もしない" atSec={base} />
          <PolicyCard
            icon="archive"
            name="隔離する"
            what="迷惑メールへ入れる"
            atSec={base + 0.35}
          />
          <PolicyCard icon="cancel" name="拒否する" what="受け取らない" pink atSec={base + 0.7} />
        </div>

        <span
          style={{
            flex: "none",
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
            ...note,
          }}
        >
          迷惑メールのフォルダに入れるのが、隔離にあたる
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s09: ★抽象→具体 — 1通のメールが届いたとき、3つがどう働くか
// ---------------------------------------------------------------------------

const VerifyChip: React.FC<{ name: string; what: string; atSec: number }> = ({
  name,
  what,
  atSec,
}) => {
  const chip = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${5 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        borderRadius: 14 * SCALE,
        ...chip,
      }}
    >
      <b
        style={{
          flex: "none",
          fontSize: 15 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: colors.primary800,
        }}
      >
        {name}
      </b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: colors.primary800,
          whiteSpace: "nowrap",
        }}
      >
        {what}
      </span>
    </div>
  );
};

const ResultRow: React.FC<{
  icon: string;
  cond: string;
  result: string;
  pink?: boolean;
  atSec: number;
}> = ({ icon, cond, result, pink, atSec }) => {
  const row = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        padding: `${5 * SCALE}px ${13 * SCALE}px`,
        backgroundColor: pink ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${pink ? colors.accentPinkSoft : colors.border}`,
        borderRadius: 14 * SCALE,
        color: pink ? colors.accentPinkText : colors.textPrimary,
        ...row,
      }}
    >
      <span style={{ flex: "none", display: "flex", color: pink ? undefined : colors.primary600 }}>
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <span
        style={{
          flex: "none",
          width: 74 * SCALE,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {cond}
      </span>
      <b style={{ flex: 1, minWidth: 0, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        {result}
      </b>
    </div>
  );
};

const FlowScene: React.FC = () => {
  const mail = useAppear(0.3, { dy: 12 });
  const branchNote = useAppear(segStart(SEG_FLOW, 3), { dy: 8 });
  return (
    <SlideShell
      heading="1通のメールが届いたとき"
      icon={<Ms name="mail" size={videoType.slideHeadIcon} />}
      narration={SEG_FLOW}
    >
      {/* 上段で「届いたメール → 二つの検証」、下段で「結果の分岐」。
          3段を横一列に並べると結果の行が右へあふれるので、縦に折り返している */}
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
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9 * SCALE,
            marginBottom: 2 * SCALE,
          }}
        >
          {/* 届いたメール（このページの前提なので先に置く） */}
          <div
            style={{
              flex: "none",
              display: "flex",
              alignItems: "center",
              gap: 9 * SCALE,
              padding: `${5 * SCALE}px ${14 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 16 * SCALE,
              ...mail,
            }}
          >
            <IconBox icon="mail" size={20} />
            <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
              届いたメール
            </b>
          </div>
          <ArrowIcon atSec={segStart(SEG_FLOW, 1)} size={16} />
          {/* 受信側サーバでの検証 */}
          <VerifyChip name="SPF" what="送ってきたサーバ" atSec={segStart(SEG_FLOW, 1)} />
          <VerifyChip name="DKIM" what="署名と中身" atSec={segStart(SEG_FLOW, 1) + 0.4} />
        </div>

        <ResultRow
          icon="check_circle"
          cond="どちらも通る"
          result="正規の送信元と判断され、受信箱に届く"
          atSec={segStart(SEG_FLOW, 2)}
        />
        {/* 失敗したときの分岐が DMARC の宣言に従うことを、分岐の見出しとして置く */}
        <span
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
            ...branchNote,
          }}
        >
          <span style={{ flex: "none", display: "flex", color: colors.primary600 }}>
            <Ms name="call_split" size={17 * SCALE} />
          </span>
          失敗したときの扱いは、DMARCの宣言に従う
        </span>
        <ResultRow
          icon="archive"
          cond="失敗＋隔離"
          result="迷惑メールのフォルダへ"
          atSec={segStart(SEG_FLOW, 4)}
        />
        <ResultRow
          icon="cancel"
          cond="失敗＋拒否"
          result="受け取られずに終わる"
          pink
          atSec={segStart(SEG_FLOW, 4) + 0.4}
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

export const SgL43EmailDomainAuth: VideoSpec = {
  id: "sg-L43-email-domain-auth",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "そのメールは\n本当にそこから？",
      keywords: ["SPF", "DKIM", "DMARC"],
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
      name: "delivery",
      durationSec: 6,
      narration: SEG_DELIVERY,
      component: DeliveryScene,
    },
    {
      pattern: "custom",
      name: "idea",
      durationSec: 6,
      narration: SEG_IDEA,
      component: IdeaScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "spf",
      durationSec: 7,
      narration: SEG_SPF,
      component: SpfScene,
    },
    {
      pattern: "custom",
      name: "dkim",
      durationSec: 7,
      narration: SEG_DKIM,
      component: DkimScene,
    },
    {
      pattern: "vs",
      heading: "SPFとDKIMは、見ている場所が違う",
      icon: "compare_arrows",
      left: {
        title: "SPF",
        icon: "storage",
        rows: [
          { k: "見るもの", v: "送ってきたサーバ" },
          { k: "使う情報", v: "DNSのサーバ一覧" },
          { k: "改ざん検知", v: "できない" },
        ],
      },
      right: {
        title: "DKIM",
        icon: "key",
        rows: [
          { k: "見るもの", v: "署名と中身" },
          { k: "使う情報", v: "DNSの公開鍵" },
          { k: "改ざん検知", v: "できる" },
        ],
      },
      columnAtSec: [segStart(SEG_VS, 1), segStart(SEG_VS, 2)],
      narration: SEG_VS,
    },
    {
      pattern: "custom",
      name: "dmarc",
      durationSec: 7,
      narration: SEG_DMARC,
      component: DmarcScene,
    },
    {
      pattern: "custom",
      name: "one-mail-flow",
      durationSec: 7,
      narration: SEG_FLOW,
      component: FlowScene,
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
      question: "SPFが照合するのは？",
      choices: [
        { key: "A", text: "メール本文の署名" },
        { key: "B", text: "メールを送ってきたサーバ", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "中身の改ざんまで分かるのは？",
      choices: [
        { key: "A", text: "DKIM", correct: true },
        { key: "B", text: "SPF" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "検証失敗時の扱いを宣言するのは？",
      choices: [
        { key: "A", text: "SPF" },
        { key: "B", text: "DMARC", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "見た目ではなく、送ってきたサーバを確かめる", checkAtSec: segStart(SEG_SUM, 0) },
        { text: "SPFはサーバを照合、DKIMは署名で中身まで確認", checkAtSec: segStart(SEG_SUM, 1) },
        { text: "DMARCは検証に失敗したメールの扱いを宣言", checkAtSec: segStart(SEG_SUM, 2) },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
