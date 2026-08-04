import { Img, interpolateColors, staticFile } from "remotion";
import {
  colors,
  fontMono,
  markerPinkStyle,
  markerStyle,
  SCALE,
  videoType,
} from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { ArrowMarker, DrawPath } from "../../parts/draw";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L42-secure-protocols.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L42: セキュアプロトコルの地図
 *
 * 発注書 content_works/ipa_sg/orders/L42.md に対応。
 * シナリオと用語の呼称表は narration/ipa_sg/sg-L42-secure-protocols.md
 * （★ この回が WPA2／WPA3 の主担当。L65 がこの呼称を参照する）。
 *
 * 【地図＋代表】型: 「どの通信を・どこで守るか」の地図（s03）を背骨に立て、
 * 代表を1つずつ深く見る構成。地図の①〜④は各代表ページのチップ・見出しに同じ番号で出る。
 *   導入 → 地図(2×2) → ①HTTPS（式のピル列）→ TLSの中身(flow・L15/L21の復習)→
 *   買い物サイトの実物モック → wipe-light で ②IPsec（収束＋トンネル図）→ ③SSH（vs）→
 *   ④無線（左テキスト＋イラスト）→ WPAの世代帯（★用語）→ クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 暗号方式の呼称は L15、証明書・認証局は L21 に揃えており、どちらも再説明しない。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L42-secure-protocols");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
//
// 略語の読み: 音声（jobs.json）は仮名書き、字幕はこの text。
// ルビはアルファベット読みが自明でない略語だけ（IPsec / WEP / WPA2 / WPA3）に初出1回。
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、通信そのものを守るセキュアプロトコルを学びます。"),
  N("s02-2.mp3", "インターネットを流れるデータは、そのままでは中身を読み取られてしまいます。"),
  N("s02-3.mp3", "守り方は一つではなく、守りたい通信ごとに専用のプロトコルが用意されています。"),
];

const SEG_MAP = [
  N("s03-1.mp3", "まずは、全体の地図を持っておきましょう。"),
  N("s03-2.mp3", "守る対象は、ウェブのやり取り、通信の全体、遠隔からの操作、そして無線の区間です。"),
  N("s03-3.mp3", "それぞれに、TLS、IPsec、SSH、WPA2やWPA3という専用の方式があります。"),
  N("s03-4.mp3", "大切なのは名前の暗記ではなく、どの通信をどこで守るかという対応です。"),
];

const SEG_HTTPS = [
  N("s04-1.mp3", "一つ目は、ウェブのやり取りを守るTLSです。"),
  N("s04-2.mp3", "ふだん使うHTTPという通信を、TLSで包んだものがHTTPSです。"),
  N("s04-3.mp3", "アドレスがhttpsで始まるページは、この仕組みで守られています。"),
];

const SEG_TLS = [
  N("s05-1.mp3", "TLSの中では、これまで学んだ技術が組み合わさっています。"),
  N("s05-2.mp3", "はじめに、サーバのデジタル証明書で、相手が本物かを確認します。"),
  N("s05-3.mp3", "次に、公開鍵暗号方式を使って、その通信用の共通鍵を安全に渡します。"),
  N("s05-4.mp3", "あとは、その共通鍵で本文をやり取りします。"),
];

const SEG_SHOP = [
  N("s06-1.mp3", "買い物サイトを例に、この仕組みが何をしてくれるのかを見てみましょう。"),
  N("s06-2.mp3", "アドレスバーの鍵マークは、証明書で相手を確認できたという印です。"),
  N("s06-3.mp3", "入力したカード番号も暗号化されるので、途中で盗み見られても読めません。"),
];

const SEG_IPSEC = [
  // IPsec の読みは「アイピーセック」。1字ずつ読ませないので字幕にも初出だけルビ
  N("s07-1.mp3", "二つ目は、通信をまるごと守るIPsec（アイピーセック）です。"),
  N("s07-2.mp3", "TLSがアプリごとに守るのに対して、IPsecはIPの層で暗号化します。"),
  N("s07-3.mp3", "そのため、どのアプリの通信でも、意識せずまとめて守ることができます。"),
  N("s07-4.mp3", "拠点どうしを安全につなぐVPNの土台にもなっています。"),
];

const SEG_SSH = [
  N("s08-1.mp3", "三つ目は、遠隔からサーバを操作するときの守り方です。"),
  N("s08-2.mp3", "暗号化されていない遠隔操作では、入力した文字がそのまま流れます。"),
  N("s08-3.mp3", "パスワードまで盗聴されてしまうので、今は使ってはいけません。"),
  N("s08-4.mp3", "遠隔操作をまるごと暗号化するのが、SSHです。"),
  N("s08-5.mp3", "相手のサーバが本物かどうかも、鍵を使って確認できます。"),
];

const SEG_WIRELESS = [
  N("s09-1.mp3", "四つ目は、無線の区間を守る方法です。"),
  N("s09-2.mp3", "無線LANは、電波が届く範囲なら誰でも受信できてしまいます。"),
  N("s09-3.mp3", "ケーブルをつながなくても、通信に入り込めるということです。"),
  N("s09-4.mp3", "そこで、電波に乗せるデータそのものを暗号化するのが、無線LANの暗号化方式です。"),
];

// ★ この回が主担当（L65 が参照）。WPA2 / WPA3 の呼称はここが正
const SEG_WPA = [
  N("s10-1.mp3", "無線LANの暗号化方式には、世代があります。"),
  N("s10-2.mp3", "初期のWEP（ウェップ）は、短時間で解読できることが分かっています。"),
  N("s10-3.mp3", "その後に登場したWPA2（ダブリューピーエーツー）が、いまの標準です。"),
  N("s10-4.mp3", "さらに強くしたWPA3（ダブリューピーエースリー）が、最新の方式です。"),
  N("s10-5.mp3", "選ぶならWPA2以上、できればWPA3にする、と覚えてください。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "HTTPSでデジタル証明書が果たす役割は、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、アクセスした相手が本物かを確認することです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "遠隔からサーバを安全に操作するプロトコルは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、SSHです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "無線LANの暗号化方式として選ぶべきなのは、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、より新しいWPA3です。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s15-1.mp3", "セキュアプロトコルは、守りたい通信ごとに使い分けます。"),
  N("s15-2.mp3", "ウェブはTLSとHTTPS、通信をまるごと守るならIPsecです。"),
  N("s15-3.mp3", "遠隔操作はSSH、無線LANの暗号化はWPA2以上、できればWPA3です。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 地図の番号チップ（①〜④）。代表ページのチップにも同じ番号を出して背骨をつなぐ */
const NumChip: React.FC<{ no: string; label: string }> = ({ no, label }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4 * SCALE,
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      color: colors.primary800,
      backgroundColor: colors.primary100,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      whiteSpace: "nowrap",
    }}
  >
    <span>{no}</span>
    <span>{label}</span>
  </span>
);

// ---------------------------------------------------------------------------
// P2: 導入 — 左テキスト + 右イラスト（インターネットを流れる通信）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const noteAppear = useAppear(segStart(SEG_INTRO, 2), { dy: 10 });
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 * SCALE }}
        >
          <span
            style={{
              fontSize: 21 * SCALE,
              fontWeight: 800,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"流れるデータは\n"}
            <span style={markerPinkStyle}>そのままでは丸見え</span>
          </span>
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.5,
              ...noteAppear,
            }}
          >
            守り方は一つではない — 通信ごとに専用のプロトコルがある
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/net-globe.png")}
          style={{
            flex: 0.95,
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
// P3: 地図（この回の背骨）— 2×2の用途カードが「対象 → 方式」の2段階で埋まる
// ---------------------------------------------------------------------------

const MapCard: React.FC<{
  no: string;
  icon: string;
  target: string;
  proto: string;
  /** 用途カードそのものの出現（2文目の読み上げ順に合わせる） */
  cardAtSec: number;
  /** 方式名が入るタイミング（3文目） */
  protoAtSec: number;
}> = ({ no, icon, target, proto, cardAtSec, protoAtSec }) => {
  const card = usePop(cardAtSec);
  const protoAppear = useAppear(protoAtSec, { dy: 8 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        padding: `${7 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 32 * SCALE,
          height: 32 * SCALE,
          borderRadius: 12 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={20 * SCALE} />
      </span>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2 * SCALE,
        }}
      >
        <span
          style={{
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
          }}
        >
          {no} {target}
        </span>
        <b
          style={{
            fontSize: 15 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            fontFamily: fontMono,
            whiteSpace: "nowrap",
            ...protoAppear,
          }}
        >
          <span style={markerStyle}>{proto}</span>
        </b>
      </div>
    </div>
  );
};

const MapScene: React.FC = () => {
  const footAppear = useAppear(segStart(SEG_MAP, 3), { dy: 10 });
  const t2 = segStart(SEG_MAP, 1); // 4つの対象を読み上げる文
  const t3 = segStart(SEG_MAP, 2); // 方式名を読み上げる文
  const cards = [
    { no: "①", icon: "language", target: "ウェブのやり取り", proto: "TLS / HTTPS" },
    { no: "②", icon: "lan", target: "通信の全体", proto: "IPsec" },
    { no: "③", icon: "terminal", target: "遠隔からの操作", proto: "SSH" },
    { no: "④", icon: "wifi", target: "無線の区間", proto: "WPA2 / WPA3" },
  ];
  return (
    <SlideShell
      heading="どの通信を、どこで守るか"
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
          gap: 7 * SCALE,
        }}
      >
        <div style={{ display: "flex", gap: 7 * SCALE }}>
          {cards.slice(0, 2).map((c, i) => (
            <MapCard
              key={c.no}
              {...c}
              cardAtSec={t2 + 0.6 + i * 1.2}
              protoAtSec={t3 + 0.8 + i * 0.7}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 7 * SCALE }}>
          {cards.slice(2).map((c, i) => (
            <MapCard
              key={c.no}
              {...c}
              cardAtSec={t2 + 3.0 + i * 1.2}
              protoAtSec={t3 + 2.2 + i * 0.7}
            />
          ))}
        </div>
        <span
          style={{
            alignSelf: "center",
            marginTop: 3 * SCALE,
            fontSize: 13.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            ...footAppear,
          }}
        >
          覚えるのは名前より、<span style={markerStyle}>どの通信をどこで守るか</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: ①Webのやり取り — 左イラスト + 右に式のピル列（HTTP ＋ TLS ＝ HTTPS）
// ---------------------------------------------------------------------------

const ProtoPill: React.FC<{ text: string; filled?: boolean }> = ({ text, filled }) => (
  <span
    style={{
      fontFamily: fontMono,
      fontSize: 14 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      color: filled ? colors.textPrimaryDark : colors.primary800,
      backgroundColor: filled ? colors.primary600 : colors.primary50,
      border: `${1.5 * SCALE}px solid ${filled ? colors.primary600 : colors.primary300}`,
      borderRadius: 999,
      padding: `${4 * SCALE}px ${12 * SCALE}px`,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

const HttpsScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const termAppear = useAppear(0.3);
  const eqAppear = useAppear(segStart(SEG_HTTPS, 1), { dy: 10 });
  const addrAppear = useAppear(segStart(SEG_HTTPS, 2), { dy: 8 });
  return (
    <SlideShell narration={SEG_HTTPS}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <Img
          src={staticFile("images/ipa_sg/icon-browser.png")}
          style={{
            flex: 0.85,
            minWidth: 0,
            maxHeight: "100%",
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
            gap: 7 * SCALE,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4 * SCALE,
              ...termAppear,
            }}
          >
            <NumChip no="①" label="ウェブのやり取りを守る" />
            <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
              <span style={markerStyle}>TLS</span>
            </b>
          </div>
          {/* HTTP over TLS を式で見せる（用語を並べるより組み合わせが残る） */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              ...eqAppear,
            }}
          >
            <ProtoPill text="HTTP" />
            <span style={{ fontSize: 15 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
              ＋
            </span>
            <ProtoPill text="TLS" />
            <span style={{ fontSize: 15 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
              ＝
            </span>
            <ProtoPill text="HTTPS" filled />
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
              ...addrAppear,
            }}
          >
            <span style={{ color: colors.primary600, flex: "none", display: "flex" }}>
              <Ms name="lock" size={17 * SCALE} />
            </span>
            <span>
              アドレスが <span style={{ fontFamily: fontMono }}>https</span> で始まるページ
            </span>
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 買い物サイトの実物モック（仕組み → 具体場面）
// ---------------------------------------------------------------------------

const ShopNote: React.FC<{ icon: string; text: React.ReactNode; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const note = useAppear(atSec, { dy: 8 });
  return (
    <span
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        fontSize: 11.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        color: colors.primary800,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        borderRadius: 12 * SCALE,
        padding: `${6 * SCALE}px ${12 * SCALE}px`,
        ...note,
      }}
    >
      <span style={{ color: colors.primary600, flex: "none", display: "flex" }}>
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <span>{text}</span>
    </span>
  );
};

const ShopScene: React.FC = () => {
  const cardAppear = useAppear(0.3);
  // 鍵マークは2文目の読み上げで点灯させる（地・枠・文字を同時に動かす）
  const lockOn = useProgress(segStart(SEG_SHOP, 1), 0.4);
  const lockBg = interpolateColors(lockOn, [0, 1], [colors.bg, colors.primary50]);
  const lockBorder = interpolateColors(lockOn, [0, 1], [colors.border, colors.primary500]);
  const lockColor = interpolateColors(lockOn, [0, 1], [colors.textMuted, colors.primary600]);
  const fieldOn = useProgress(segStart(SEG_SHOP, 2), 0.4);
  const fieldColor = interpolateColors(fieldOn, [0, 1], [colors.textPrimary, colors.primary800]);
  return (
    <SlideShell
      heading="買い物サイトで起きていること"
      icon={<Ms name="storefront" size={videoType.slideHeadIcon} />}
      narration={SEG_SHOP}
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
          gap: 8 * SCALE,
        }}
      >
        {/* ブラウザのモック（アドレスバー + 入力欄） */}
        <div
          style={{
            width: "88%",
            display: "flex",
            flexDirection: "column",
            gap: 8 * SCALE,
            padding: `${11 * SCALE}px ${13 * SCALE}px`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 16 * SCALE,
            ...cardAppear,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9 * SCALE,
              padding: `${5 * SCALE}px ${13 * SCALE}px`,
              backgroundColor: lockBg,
              border: `${1.5 * SCALE}px solid ${lockBorder}`,
              borderRadius: 999,
            }}
          >
            <span style={{ color: lockColor, flex: "none", display: "flex" }}>
              <Ms name="lock" size={20 * SCALE} />
            </span>
            <span style={{ fontFamily: fontMono, fontSize: 13 * SCALE, fontWeight: 800 }}>
              https://shop.example.co.jp
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12 * SCALE,
              padding: `${3 * SCALE}px ${5 * SCALE}px`,
            }}
          >
            <span
              style={{
                flex: "none",
                fontSize: 11 * SCALE,
                fontWeight: 800,
                lineHeight: 1.25,
                color: colors.textSecondary,
              }}
            >
              カード番号
            </span>
            <span
              style={{
                flex: 1,
                minWidth: 0,
                fontFamily: fontMono,
                fontSize: 14 * SCALE,
                fontWeight: 800,
                lineHeight: 1.25,
                color: fieldColor,
              }}
            >
              4912 3456 7890 1234
            </span>
          </div>
        </div>
        <div style={{ width: "88%", display: "flex", gap: 7 * SCALE }}>
          {/* チップ1枚の幅は約730px。11.5×SCALE では11文字を超えると折り返して
              最後の1〜2字だけが2行目に落ちるので、本文は10文字前後に収める */}
          <ShopNote
            icon="verified_user"
            text={
              <>
                鍵マーク＝<span style={markerStyle}>相手は本物</span>
              </>
            }
            atSec={segStart(SEG_SHOP, 1)}
          />
          <ShopNote
            icon="lock"
            text={
              <>
                カード番号は<span style={markerStyle}>読めない</span>
              </>
            }
            atSec={segStart(SEG_SHOP, 2)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: ②通信をまるごと — 3本のアプリの通信が1本のトンネルに収束する
// ---------------------------------------------------------------------------

const AppChip: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => {
  const chip = usePop(atSec);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${4 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 999,
        ...chip,
      }}
    >
      <span style={{ color: colors.primary600, flex: "none", display: "flex" }}>
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <span style={{ fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
};

const IpsecScene: React.FC = () => {
  const siteAppear = usePop(0.3);
  const tunnelOn = useProgress(segStart(SEG_IPSEC, 1), 0.5);
  const labelAppear = useAppear(segStart(SEG_IPSEC, 1) + 0.8, { dy: 10 });
  const vpnAppear = useAppear(segStart(SEG_IPSEC, 3), { dy: 8 });
  return (
    <SlideShell
      heading="② アプリを選ばず、まとめて守る"
      icon={<Ms name="lan" size={videoType.slideHeadIcon} />}
      narration={SEG_IPSEC}
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
        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
          {/* 左: アプリごとの通信 */}
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
            }}
          >
            <AppChip icon="mail" label="メール" atSec={0.3} />
            <AppChip icon="language" label="Web" atSec={0.5} />
            <AppChip icon="storage" label="ファイル共有" atSec={0.7} />
          </div>
          {/* 中央: 3本が1本のトンネルに収束する
              viewBox は 1200×240（横長）。矢じりは size6 × strokeWidth8 = 48単位なので
              線を y=120 に置けば 96〜144 に収まり、角が欠けない */}
          {/* 高さは「描画領域の幅 ÷ viewBoxの比」に合わせる（小さいと meet で縮んで
              左右に余白ができ、線がアプリのチップから離れて見える） */}
          <svg viewBox="0 0 1200 240" style={{ flex: 1, minWidth: 0, height: 58 * SCALE }}>
            <ArrowMarker id="ipsec-arrow" color={colors.primary600} />
            <DrawPath
              d="M20 40 L420 120"
              delaySec={0.6}
              durSec={0.7}
              stroke={colors.primary300}
              strokeWidth={8}
            />
            <DrawPath
              d="M20 120 L420 120"
              delaySec={0.8}
              durSec={0.7}
              stroke={colors.primary300}
              strokeWidth={8}
            />
            <DrawPath
              d="M20 200 L420 120"
              delaySec={1.0}
              durSec={0.7}
              stroke={colors.primary300}
              strokeWidth={8}
            />
            <g opacity={tunnelOn}>
              <rect
                x={440}
                y={62}
                width={740}
                height={116}
                rx={58}
                fill={colors.primary50}
                stroke={colors.primary500}
                strokeWidth={4}
              />
            </g>
            <DrawPath
              d="M480 120 L1090 120"
              delaySec={segStart(SEG_IPSEC, 1) + 0.4}
              durSec={0.8}
              stroke={colors.primary600}
              strokeWidth={8}
              markerEnd="url(#ipsec-arrow)"
            />
          </svg>
          {/* 右: 相手の拠点 */}
          <div
            style={{
              flex: "none",
              width: 46 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              ...siteAppear,
            }}
          >
            <span
              style={{
                width: 36 * SCALE,
                height: 36 * SCALE,
                borderRadius: 13 * SCALE,
                backgroundColor: colors.primary50,
                color: colors.primary600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ms name="apartment" size={21 * SCALE} />
            </span>
            <b style={{ fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>相手の拠点</b>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5 * SCALE,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7 * SCALE,
              fontSize: 16 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              ...labelAppear,
            }}
          >
            <span style={{ color: colors.primary600, flex: "none", display: "flex" }}>
              <Ms name="encrypted" size={22 * SCALE} />
            </span>
            <span>
              <span style={markerStyle}>IPsec</span> ＝ IPの層でまとめて暗号化
            </span>
          </span>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.primary800,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary100}`,
              borderRadius: 999,
              padding: `${3 * SCALE}px ${13 * SCALE}px`,
              whiteSpace: "nowrap",
              ...vpnAppear,
            }}
          >
            拠点どうしをつなぐ VPN の土台にもなる
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: ④無線の区間 — 左テキスト + 右イラスト（電波）
// ---------------------------------------------------------------------------

const WirelessScene: React.FC = () => {
  const chipAppear = useAppear(0.3);
  const leadAppear = useAppear(segStart(SEG_WIRELESS, 1));
  const noteAppear = useAppear(segStart(SEG_WIRELESS, 2), { dy: 8 });
  const footAppear = useAppear(segStart(SEG_WIRELESS, 3), { dy: 10 });
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_WIRELESS}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.25,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 7 * SCALE,
          }}
        >
          <span style={{ ...chipAppear }}>
            <NumChip no="④" label="無線の区間を守る" />
          </span>
          <span
            style={{
              fontSize: 22 * SCALE,
              fontWeight: 800,
              lineHeight: 1.35,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"電波は届く範囲なら\n"}
            <span style={markerPinkStyle}>誰でも受信できる</span>
          </span>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.4,
              ...noteAppear,
            }}
          >
            ケーブルをつながなくても入り込める
          </span>
          {/* 左カラムの幅は約970px。14×SCALE では15文字を超えると折り返すので
              改行位置を pre-line で固定する（自動折り返しだと語尾だけが落ちる） */}
          <span
            style={{
              fontSize: 14 * SCALE,
              fontWeight: 800,
              lineHeight: 1.35,
              whiteSpace: "pre-line",
              ...footAppear,
            }}
          >
            {"電波に乗せるデータを暗号化する\n"}
            <span style={markerStyle}>＝ 無線LANの暗号化方式</span>
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/net-wifi-waves.png")}
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
// P10: WPA2 / WPA3 — 世代の帯（★ この回が主担当）
// ---------------------------------------------------------------------------

const GenBox: React.FC<{
  name: string;
  note: string;
  badge: string;
  tone: "danger" | "ok" | "best";
  /** 名前だけの状態で出す秒（世代の並びは最初から意味がある） */
  appearAtSec: number;
  /** 語りに合わせて点灯する秒 */
  litAtSec: number;
}> = ({ name, note, badge, tone, appearAtSec, litAtSec }) => {
  const box = usePop(appearAtSec);
  const on = useProgress(litAtSec, 0.4);
  const danger = tone === "danger";
  const best = tone === "best";
  const litBg = danger ? colors.accentPinkSurface : best ? colors.primary600 : colors.primary50;
  const litBorder = danger ? colors.accentPink : best ? colors.primary600 : colors.primary500;
  const litText = danger ? colors.accentPinkText : best ? colors.textPrimaryDark : colors.primary800;
  const bg = interpolateColors(on, [0, 1], [colors.surface, litBg]);
  const borderColor = interpolateColors(on, [0, 1], [colors.border, litBorder]);
  const nameColor = interpolateColors(on, [0, 1], [colors.textPrimary, litText]);
  const noteColor = interpolateColors(on, [0, 1], [colors.textSecondary, litText]);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${11 * SCALE}px ${6 * SCALE}px`,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${borderColor}`,
        borderRadius: 16 * SCALE,
        ...box,
      }}
    >
      <b
        style={{
          fontFamily: fontMono,
          fontSize: 22 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: nameColor,
        }}
      >
        {name}
      </b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.25,
          color: noteColor,
          opacity: on,
          whiteSpace: "nowrap",
        }}
      >
        {note}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: danger ? colors.accentPinkText : best ? colors.textPrimaryDark : colors.primary800,
          backgroundColor: danger
            ? colors.surface
            : best
              ? colors.primary800
              : colors.surface,
          border: `${1.5 * SCALE}px solid ${
            danger ? colors.accentPink : best ? colors.primary800 : colors.primary300
          }`,
          borderRadius: 999,
          padding: `${2 * SCALE}px ${10 * SCALE}px`,
          whiteSpace: "nowrap",
          opacity: on,
        }}
      >
        <Ms name={danger ? "cancel" : best ? "star" : "check_circle"} size={14 * SCALE} />
        <span>{badge}</span>
      </span>
    </div>
  );
};

const GenArrow: React.FC<{ atSec: number }> = ({ atSec }) => {
  const arrow = useAppear(atSec, { dy: 0 });
  return (
    <span
      style={{
        flex: "none",
        fontSize: 20 * SCALE,
        lineHeight: 1,
        color: colors.primary300,
        ...arrow,
      }}
    >
      →
    </span>
  );
};

const WpaScene: React.FC = () => {
  const footAppear = useAppear(segStart(SEG_WPA, 4), { dy: 10 });
  return (
    <SlideShell
      heading="無線LANの暗号化方式の世代"
      icon={<Ms name="wifi" size={videoType.slideHeadIcon} />}
      narration={SEG_WPA}
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
        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
          <GenBox
            name="WEP"
            note="短時間で解読できる"
            badge="使わない"
            tone="danger"
            appearAtSec={0.3}
            litAtSec={segStart(SEG_WPA, 1)}
          />
          <GenArrow atSec={0.5} />
          <GenBox
            name="WPA2"
            note="いまの標準"
            badge="これ以上を選ぶ"
            tone="ok"
            appearAtSec={0.5}
            litAtSec={segStart(SEG_WPA, 2)}
          />
          <GenArrow atSec={0.7} />
          <GenBox
            name="WPA3"
            note="さらに強い最新の方式"
            badge="できればこちら"
            tone="best"
            appearAtSec={0.7}
            litAtSec={segStart(SEG_WPA, 3)}
          />
        </div>
        <span
          style={{
            alignSelf: "center",
            fontSize: 16 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            ...footAppear,
          }}
        >
          選ぶなら<span style={markerStyle}>WPA2以上、できればWPA3</span>
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

export const SgL42SecureProtocols: VideoSpec = {
  id: "sg-L42-secure-protocols",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "セキュア\nプロトコルの地図",
      keywords: ["HTTPS", "IPsec", "WPA3"],
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
      name: "https",
      durationSec: 5,
      narration: SEG_HTTPS,
      component: HttpsScene,
    },
    {
      pattern: "flow",
      heading: "TLSの中で起きていること",
      icon: "verified_user",
      steps: [
        { abc: "1", name: "確認", sub: "サーバの証明書で相手が本物かを確かめる" },
        { abc: "2", name: "鍵を渡す", sub: "公開鍵暗号方式で共通鍵を安全に届ける" },
        { abc: "3", name: "本文", sub: "渡した共通鍵で中身をやり取りする" },
      ],
      highlightAtSec: [segStart(SEG_TLS, 1), segStart(SEG_TLS, 2), segStart(SEG_TLS, 3)],
      narration: SEG_TLS,
    },
    {
      pattern: "custom",
      name: "shop",
      durationSec: 5,
      narration: SEG_SHOP,
      component: ShopScene,
    },
    {
      pattern: "custom",
      name: "ipsec",
      durationSec: 7,
      narration: SEG_IPSEC,
      component: IpsecScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "vs",
      heading: "③ 遠隔からサーバを操作する",
      icon: "terminal",
      left: {
        title: "暗号化しない遠隔操作",
        icon: "visibility",
        rows: [
          { k: "通信の中身", v: "そのまま流れる" },
          { k: "パスワード", v: "盗聴されてしまう" },
          { k: "相手の確認", v: "できない" },
        ],
      },
      right: {
        title: "SSH",
        icon: "encrypted",
        rows: [
          { k: "通信の中身", v: "まるごと暗号化" },
          { k: "パスワード", v: "読み取られない" },
          { k: "相手の確認", v: "鍵で確認できる" },
        ],
      },
      columnAtSec: [segStart(SEG_SSH, 1), segStart(SEG_SSH, 3)],
      narration: SEG_SSH,
    },
    {
      pattern: "custom",
      name: "wireless",
      durationSec: 6,
      narration: SEG_WIRELESS,
      component: WirelessScene,
    },
    {
      pattern: "custom",
      name: "wpa",
      durationSec: 7,
      narration: SEG_WPA,
      component: WpaScene,
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
      question: "HTTPSで証明書が果たす役割は？",
      choices: [
        { key: "A", text: "相手が本物かの確認", correct: true },
        { key: "B", text: "本文を速く暗号化する" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "遠隔からサーバを操作するなら？",
      choices: [
        { key: "A", text: "IPsec" },
        { key: "B", text: "SSH", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "無線LANで選ぶべき方式は？",
      choices: [
        { key: "A", text: "WPA3", correct: true },
        { key: "B", text: "WEP" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行29文字が上限（超えると字幕帯に重なる）
          text: "守りたい通信ごとに使い分ける",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "WebはTLS／HTTPS、全体はIPsec",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "遠隔操作はSSH、無線はWPA2以上",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
