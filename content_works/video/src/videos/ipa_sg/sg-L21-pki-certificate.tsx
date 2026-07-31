import { Img, staticFile } from "remotion";
import { colors, fontMono, markerPinkStyle, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { ArrowMarker, DrawPath } from "../../parts/draw";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L21-pki-certificate.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L21: PKIとデジタル証明書
 *
 * 発注書 content_works/ipa_sg/orders/L21.md に対応。
 * シナリオと用語の呼称表は narration/ipa_sg/sg-L21-pki-certificate.md（★ この回が証明書の主担当）。
 *
 * 「その公開鍵は本物か」を背骨にした構成:
 *   導入（誰でも配れる）→ 偽の公開鍵をつかまされる場面図 → デジタル証明書（キーワード見出し）→
 *   証明書の中身（カードモック／第2章のつながり）→ 認証局の発行フロー（横3ノード）→
 *   wipe-light で信頼の連鎖（縦3段ツリー・下から上へ積む）→ サーバ／クライアント証明書（vs）→
 *   失効リスト（表モック）→ PKI の回収（用語ドン）→ クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 呼称は L15（公開鍵・秘密鍵・公開鍵暗号方式）と L17（デジタル署名・秘密鍵で署名する）に揃えている。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L21-pki-certificate");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  // 略語の読み: PKI は1字ずつ「ピーケーアイ」。音声（jobs.json）は仮名書きで、
  // 字幕はこの text で初出の1回だけ読みを添えている（narration/…md の例外表を参照）。
  N("s02-1.mp3", "今回は、公開鍵を安全に使うための仕組み、PKI（ピーケーアイ）とデジタル証明書を学びます。"),
  N("s02-2.mp3", "公開鍵暗号方式では、公開鍵は誰にでも配ってよい鍵でした。"),
  N("s02-3.mp3", "ところが、誰でも配れるということは、攻撃者も配れるということです。"),
  N("s02-4.mp3", "その鍵が本当に相手のものか、確かめる方法が必要になります。"),
];

const SEG_SPOOF = [
  N("s03-1.mp3", "たとえば、取引先のBさんへ、暗号化したメールを送りたいとします。"),
  N("s03-2.mp3", "そこへ攻撃者が、これがBさんの公開鍵ですと言って、自分の公開鍵を送ってきます。"),
  N("s03-3.mp3", "あなたはその鍵で暗号化するので、中身は攻撃者に読まれてしまいます。"),
  N("s03-4.mp3", "鍵そのものを見ても、持ち主が誰かは分かりません。"),
];

const SEG_CERT = [
  N("s04-1.mp3", "この問題を解決するのが、デジタル証明書です。"),
  N("s04-2.mp3", "公開鍵証明書とも呼ばれ、公開鍵とその持ち主の対応を保証する電子データです。"),
  N("s04-3.mp3", "身近な例で言えば、顔写真と名前が結び付いた運転免許証にあたります。"),
  N("s04-4.mp3", "免許証を信じられるのは、公安委員会という発行元を信じているからです。"),
];

const SEG_INSIDE = [
  N("s05-1.mp3", "証明書の中身を見てみましょう。"),
  N("s05-2.mp3", "持ち主の名前と、その持ち主の公開鍵が書かれています。"),
  N("s05-3.mp3", "そこに、発行元である認証局のデジタル署名が付いています。"),
  N("s05-4.mp3", "署名があるので、証明書が偽物なら誰でも見破ることができます。"),
  N("s05-5.mp3", "つまり証明書は、公開鍵に発行元の署名を付けたものです。"),
];

const SEG_CA = [
  N("s06-1.mp3", "証明書を発行するのが、認証局です。"),
  // 略語の読み: CA は「シーエー」。音声は仮名書き・字幕は初出のみルビ。
  N("s06-2.mp3", "英語の頭文字から、CA（シーエー）とも呼ばれます。"),
  N("s06-3.mp3", "認証局は、申請してきた相手が本当に本人かを審査します。"),
  N("s06-4.mp3", "確認できたら、その公開鍵に自分の秘密鍵で署名して、証明書を発行します。"),
];

const SEG_CHAIN = [
  N("s07-1.mp3", "では、初めて見る認証局を、どうやって信じるのでしょうか。"),
  N("s07-2.mp3", "認証局は階層になっていて、上位の認証局が下位の証明書に署名しています。"),
  N("s07-3.mp3", "いちばん上がルート証明書で、信頼の基点、トラストアンカーと呼ばれます。"),
  N("s07-4.mp3", "ルート証明書は、パソコンやスマートフォンに最初から入っています。"),
  // 音声は「中間シーエー」（字幕は中間CA表記のまま）
  N("s07-5.mp3", "そこから中間CAを経て相手の証明書までたどれる、これが信頼の連鎖です。"),
];

const SEG_DIR = [
  N("s08-1.mp3", "証明書は、証明する向きによって呼び方が変わります。"),
  N("s08-2.mp3", "サーバ証明書は、そのサーバが実在する本物だと、利用者に示すものです。"),
  N("s08-3.mp3", "クライアント証明書は逆に、利用者や端末が本物だと、サーバに示すものです。"),
];

const SEG_CRL = [
  N("s09-1.mp3", "証明書には有効期限がありますが、期限内でも無効にしたい場合があります。"),
  N("s09-2.mp3", "たとえば、秘密鍵が漏えいしたときや、社員が退職したときです。"),
  N("s09-3.mp3", "そこで認証局は、無効になった証明書の一覧を公開します。"),
  // 略語の読み: CRL は「シーアールエル」。音声は仮名書き・字幕は初出のみルビ。
  N("s09-4.mp3", "これが証明書失効リスト、CRL（シーアールエル）です。"),
  N("s09-5.mp3", "証明書を受け取ったら、失効していないかも必ず確認します。"),
];

const SEG_PKI = [
  N("s10-1.mp3", "ここまで見てきた、証明書、認証局、失効の仕組み。"),
  N("s10-2.mp3", "これらをまとめて支える基盤が、PKI、公開鍵基盤です。"),
  N("s10-3.mp3", "公開鍵を安全に使うための、社会全体の土台と言えます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "デジタル証明書が保証するのは、何でしょうか。"),
  N("s12-3.mp3", "正解は、公開鍵とその持ち主の対応です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "信頼の基点となるトラストアンカーは、どれでしょうか。"),
  N("s13-3.mp3", "正解は、端末に入っているルート証明書です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "有効期限内の証明書を無効にする仕組みは、どれでしょうか。"),
  N("s14-3.mp3", "正解は、証明書失効リスト、CRLです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s15-1.mp3", "デジタル証明書は、公開鍵と持ち主の対応を認証局が保証したものです。"),
  N("s15-2.mp3", "ルート証明書を基点に、信頼の連鎖で相手の証明書までたどります。"),
  N("s15-3.mp3", "期限内の無効化は証明書失効リスト、全体を支える基盤がPKIです。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// P2: 導入 — 左テキスト + 右イラスト（仮面＝なりすまし）
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
            {"その公開鍵は\n"}
            <span style={markerStyle}>本物？</span>
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
            誰でも配れる鍵は、攻撃者も配れる
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/attack-spoofing.png")}
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
// P3: 偽の公開鍵をつかまされる場面 — 左右に当事者・中央に2レーンの矢印
// ---------------------------------------------------------------------------

/** レーン1本（ラベル → 矢印 → 結果チップ）。矢印の向きは dir で切り替える */
const SpoofLane: React.FC<{
  label: string;
  dir: "left" | "right";
  chip: string;
  atSec: number;
}> = ({ label, dir, chip, atSec }) => {
  const labelAppear = useAppear(atSec, { dy: 8 });
  const chipAppear = usePop(atSec + 1.2);
  const arrowId = dir === "left" ? "spoof-arrow-l" : "spoof-arrow-r";
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // レーン内は詰め、レーン間の gap（呼び出し側）を広く取ることで
        // 「ラベル・矢印・結果チップ」が1本のレーンとして読めるようにする
        gap: 2 * SCALE,
      }}
    >
      <span
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
          ...labelAppear,
        }}
      >
        {label}
      </span>
      {/* viewBox は 1000×60（横長）。矢じりは size6 × strokeWidth7 = 42単位なので
          線を y=30 に置けば 9〜51 に収まり、角が欠けない（references/custom-scenes.md） */}
      <svg viewBox="0 0 1000 60" style={{ width: "100%", height: 14 * SCALE }}>
        <ArrowMarker id={arrowId} color={colors.accentPink} />
        <DrawPath
          d={dir === "left" ? "M990 30 L60 30" : "M10 30 L940 30"}
          delaySec={atSec + 0.3}
          durSec={0.9}
          stroke={colors.accentPink}
          strokeWidth={7}
          markerEnd={`url(#${arrowId})`}
        />
      </svg>
      <span
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: colors.accentPinkText,
          backgroundColor: colors.accentPinkSurface,
          border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
          borderRadius: 999,
          padding: `${2.5 * SCALE}px ${13 * SCALE}px`,
          whiteSpace: "nowrap",
          ...chipAppear,
        }}
      >
        {chip}
      </span>
    </div>
  );
};

const SpoofScene: React.FC = () => {
  const youAppear = usePop(0.3);
  const attackerAppear = usePop(segStart(SEG_SPOOF, 1));
  const footAppear = useAppear(segStart(SEG_SPOOF, 3), { dy: 10 });
  return (
    <SlideShell
      heading="鍵だけでは持ち主が分からない"
      icon={<Ms name="gpp_maybe" size={videoType.slideHeadIcon} />}
      narration={SEG_SPOOF}
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
        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
          {/* 左: あなた（送る人） */}
          <div
            style={{
              flex: "none",
              width: 40 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              ...youAppear,
            }}
          >
            <span
              style={{
                width: 38 * SCALE,
                height: 38 * SCALE,
                borderRadius: 14 * SCALE,
                backgroundColor: colors.primary50,
                color: colors.primary600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ms name="person" size={22 * SCALE} />
            </span>
            <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>あなた</b>
          </div>
          {/* 中央: 2レーン */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8 * SCALE,
            }}
          >
            <SpoofLane
              label="「これがBさんの公開鍵です」"
              dir="left"
              chip="偽の公開鍵"
              atSec={segStart(SEG_SPOOF, 1)}
            />
            <SpoofLane
              label="その鍵で暗号化して送る"
              dir="right"
              chip="攻撃者に読まれる"
              atSec={segStart(SEG_SPOOF, 2)}
            />
          </div>
          {/* 右: 攻撃者 */}
          <div
            style={{
              flex: "none",
              width: 44 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              ...attackerAppear,
            }}
          >
            <Img
              src={staticFile("images/ipa_sg/person-attacker.png")}
              style={{
                width: 40 * SCALE,
                height: 40 * SCALE,
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
            <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>攻撃者</b>
          </div>
        </div>
        <span
          style={{
            alignSelf: "center",
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            ...footAppear,
          }}
        >
          鍵そのものには<span style={markerPinkStyle}>持ち主が書かれていない</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: デジタル証明書 — 左イラスト + 右キーワード見出し（s02 と左右を反転）
// ---------------------------------------------------------------------------

const AnalogyLine: React.FC<{ icon: string; text: React.ReactNode; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const line = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        fontSize: 11.5 * SCALE,
        fontWeight: 700,
        lineHeight: 1.3,
        ...line,
      }}
    >
      <span style={{ color: colors.primary600, flex: "none", display: "flex" }}>
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <span>{text}</span>
    </span>
  );
};

const CertTermScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const termAppear = useAppear(0.3);
  const aliasAppear = useAppear(segStart(SEG_CERT, 1), { dy: 8 });
  return (
    <SlideShell narration={SEG_CERT}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <Img
          src={staticFile("images/ipa_sg/tech-cert.png")}
          style={{
            flex: 0.9,
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
            gap: 5 * SCALE,
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
            <span
              style={{
                fontSize: 9.5 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
                backgroundColor: colors.primary100,
                borderRadius: 999,
                padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
              }}
            >
              公開鍵の持ち主を保証する
            </span>
            <b style={{ fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
              <span style={markerStyle}>デジタル証明書</span>
            </b>
            {/* 自動折り返しに任せると「電子データ」の「タ」だけが2行目に落ちるので、
                pre-line で改行位置を固定する */}
            <span
              style={{
                fontSize: 12 * SCALE,
                fontWeight: 700,
                lineHeight: 1.4,
                whiteSpace: "pre-line",
              }}
            >
              {"公開鍵と持ち主の対応を\n保証する電子データ"}
            </span>
          </div>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              ...aliasAppear,
            }}
          >
            公開鍵証明書とも呼ばれる
          </span>
          <div
            style={{
              marginTop: 3 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4 * SCALE,
            }}
          >
            <AnalogyLine
              icon="badge"
              text={<>身近な例なら 運転免許証にあたる</>}
              atSec={segStart(SEG_CERT, 2)}
            />
            <AnalogyLine
              icon="account_balance"
              text={
                <>
                  信じられるのは<span style={markerStyle}>発行元</span>を信じているから
                </>
              }
              atSec={segStart(SEG_CERT, 3)}
            />
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 証明書の中身 — カードのモック（第2章のつながり: 公開鍵 + デジタル署名）
// ---------------------------------------------------------------------------

const CertRow: React.FC<{
  label: string;
  value: string;
  mono?: boolean;
  tone?: "plain" | "sign";
  atSec: number;
}> = ({ label, value, mono, tone = "plain", atSec }) => {
  const row = useAppear(atSec, { dy: 0 });
  const sign = tone === "sign";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        // 本文に使える高さは約655px。行の padding を1段落とすだけで
        // 3行ぶんで50px以上変わる（カードが見出しと字幕帯の両方に潜り込んだ）
        padding: `${4 * SCALE}px ${11 * SCALE}px`,
        borderRadius: 10 * SCALE,
        backgroundColor: sign ? colors.primary50 : colors.bg,
        border: `${1.5 * SCALE}px solid ${sign ? colors.primary300 : colors.border}`,
        ...row,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 60 * SCALE,
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          color: sign ? colors.primary800 : colors.textSecondary,
        }}
      >
        {label}
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: mono ? 12 * SCALE : 13 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          fontFamily: mono ? fontMono : undefined,
          color: sign ? colors.primary800 : colors.textPrimary,
        }}
      >
        {value}
      </span>
    </div>
  );
};

const CertInsideScene: React.FC = () => {
  const cardAppear = useAppear(0.3);
  const footAppear = useAppear(segStart(SEG_INSIDE, 4), { dy: 10 });
  const breakAppear = useAppear(segStart(SEG_INSIDE, 3), { dy: 8 });
  return (
    <SlideShell
      heading="証明書の中身"
      icon={<Ms name="description" size={videoType.slideHeadIcon} />}
      narration={SEG_INSIDE}
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
        <div
          style={{
            width: "84%",
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
            padding: `${10 * SCALE}px ${12 * SCALE}px`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 14 * SCALE,
            ...cardAppear,
          }}
        >
          <CertRow
            label="持ち主"
            value="株式会社サンプル商事"
            atSec={segStart(SEG_INSIDE, 1)}
          />
          <CertRow
            label="公開鍵"
            value="30 82 01 0a 02 82 01 01 …"
            mono
            atSec={segStart(SEG_INSIDE, 1) + 1.8}
          />
          {/* 第2章のつながり: L15 の公開鍵に L17 のデジタル署名が付く、が1枚の中で合流する行 */}
          <CertRow
            label="発行元"
            value="サンプル認証局のデジタル署名"
            tone="sign"
            atSec={segStart(SEG_INSIDE, 2)}
          />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              ...breakAppear,
            }}
          >
            <Ms name="task_alt" size={15 * SCALE} />
            <span>署名があるので、偽物なら誰でも見破れる</span>
          </span>
        </div>
        <span style={{ fontSize: 14 * SCALE, fontWeight: 800, ...footAppear }}>
          証明書 ＝ <span style={markerStyle}>公開鍵 ＋ 発行元の署名</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 認証局 — 横一列3ノードの発行フロー（中央に認証局のイラスト）
// ---------------------------------------------------------------------------

const IssueBox: React.FC<{
  title: string;
  sub: string;
  filled?: boolean;
  atSec: number;
}> = ({ title, sub, filled, atSec }) => {
  const box = usePop(atSec);
  return (
    <div
      style={{
        flex: "none",
        width: 74 * SCALE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        padding: `${12 * SCALE}px ${8 * SCALE}px`,
        backgroundColor: filled ? colors.primary600 : colors.surface,
        color: filled ? colors.textPrimaryDark : colors.textPrimary,
        border: `${1.5 * SCALE}px solid ${filled ? colors.primary600 : colors.border}`,
        borderRadius: 14 * SCALE,
        textAlign: "center",
        ...box,
      }}
    >
      {/* 改行は pre-line で明示する（自動折り返しに任せると1文字だけ落ちる） */}
      <b
        style={{
          fontSize: 13 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          whiteSpace: "pre-line",
        }}
      >
        {title}
      </b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
          whiteSpace: "pre-line",
          color: filled ? colors.primary100 : colors.textSecondary,
        }}
      >
        {sub}
      </span>
    </div>
  );
};

const IssueArrow: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const arrow = useAppear(atSec, { dy: 0 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...arrow,
      }}
    >
      {/* 左右の矢印でラベルの行数が違うと矢じりの高さがずれるので nowrap で1行に固定する */}
      <b
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 800,
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </b>
      <span style={{ fontSize: 22 * SCALE, lineHeight: 1, color: colors.primary300 }}>→</span>
    </div>
  );
};

const CaScene: React.FC = () => {
  const caAppear = usePop(0.3);
  const aliasAppear = useAppear(segStart(SEG_CA, 1), { dy: 8 });
  const checkAppear = useAppear(segStart(SEG_CA, 2), { dy: 8 });
  return (
    <SlideShell
      heading="証明書を発行する認証局"
      icon={<Ms name="account_balance" size={videoType.slideHeadIcon} />}
      narration={SEG_CA}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2 * SCALE,
        }}
      >
        <IssueBox
          title="申請"
          sub={"公開鍵と\n本人の情報"}
          atSec={segStart(SEG_CA, 2)}
        />
        <IssueArrow label="審査を申し込む" atSec={segStart(SEG_CA, 2)} />
        {/* 中央: 認証局（このページの主役なので先に出す） */}
        <div
          style={{
            flex: "none",
            width: 92 * SCALE,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2 * SCALE,
            ...caAppear,
          }}
        >
          <Img
            src={staticFile("images/ipa_sg/tech-ca.png")}
            style={{
              width: 60 * SCALE,
              height: 60 * SCALE,
              objectFit: "contain",
              mixBlendMode: "multiply",
            }}
          />
          <b style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
            <span style={markerStyle}>認証局</span>
          </b>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              ...aliasAppear,
            }}
          >
            （CA）
          </span>
          <span
            style={{
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary100}`,
              borderRadius: 999,
              padding: `${3 * SCALE}px ${11 * SCALE}px`,
              whiteSpace: "nowrap",
              ...checkAppear,
            }}
          >
            本人かを審査
          </span>
        </div>
        <IssueArrow label="秘密鍵で署名" atSec={segStart(SEG_CA, 3)} />
        <IssueBox
          title={"デジタル\n証明書"}
          sub="発行"
          filled
          atSec={segStart(SEG_CA, 3) + 0.6}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 信頼の連鎖 — 縦3段のツリー（下から上へ積み上げる）
// ---------------------------------------------------------------------------

const ChainBand: React.FC<{
  rank: string;
  name: string;
  note: string;
  tone: "root" | "mid" | "leaf";
  atSec: number;
  /** root だけ: 2段目に置く補足（トラストアンカーの説明） */
  extra?: React.ReactNode;
}> = ({ rank, name, note, tone, atSec, extra }) => {
  const band = useAppear(atSec, { dy: 14 });
  const root = tone === "root";
  return (
    <div
      style={{
        width: root ? "98%" : tone === "mid" ? "84%" : "70%",
        display: "flex",
        flexDirection: "column",
        gap: 5 * SCALE,
        // 見出しを省いても本文は約770px。帯3枚＋矢印2本＋締めの1行を積むので
        // 縦 padding は 5×SCALE まで詰める（9×SCALE では字幕帯へ潜った）
        padding: `${5 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: root ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${root ? colors.primary300 : colors.border}`,
        borderRadius: 14 * SCALE,
        ...band,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE }}>
        <span
          style={{
            flex: "none",
            fontSize: 9.5 * SCALE,
            fontWeight: 800,
            color: root ? colors.primary800 : colors.textSecondary,
            backgroundColor: root ? colors.primary100 : colors.bg,
            borderRadius: 999,
            padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
            whiteSpace: "nowrap",
          }}
        >
          {rank}
        </span>
        <b
          style={{
            flex: "none",
            fontSize: root ? 16 * SCALE : 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {root ? <span style={markerStyle}>{name}</span> : name}
        </b>
        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: 10.5 * SCALE,
            fontWeight: 700,
            lineHeight: 1.2,
            color: colors.textSecondary,
          }}
        >
          {note}
        </span>
      </div>
      {extra}
    </div>
  );
};

const ChainArrow: React.FC<{ atSec: number }> = ({ atSec }) => {
  const arrow = useAppear(atSec, { dy: 0 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        ...arrow,
      }}
    >
      <span style={{ fontSize: 14 * SCALE, lineHeight: 1, color: colors.primary300 }}>↓</span>
      <span style={{ fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.primary800 }}>
        署名する
      </span>
    </div>
  );
};

const TrustChainScene: React.FC = () => {
  const anchorAppear = usePop(segStart(SEG_CHAIN, 2) + 1.6);
  const preAppear = useAppear(segStart(SEG_CHAIN, 3), { dy: 8 });
  const footAppear = useAppear(segStart(SEG_CHAIN, 4), { dy: 10 });
  const rootExtra = (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE }}>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
          backgroundColor: colors.surface,
          border: `${1.5 * SCALE}px solid ${colors.primary300}`,
          borderRadius: 999,
          padding: `${2 * SCALE}px ${11 * SCALE}px`,
          whiteSpace: "nowrap",
          ...anchorAppear,
        }}
      >
        トラストアンカー（信頼の基点）
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5 * SCALE,
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
          ...preAppear,
        }}
      >
        <Ms name="devices" size={15 * SCALE} />
        <span>端末に最初から入っている</span>
      </span>
    </div>
  );
  // 見出しは置かず、締めの一行（＝信頼の連鎖）に語を持たせる。
  // 見出しありでは本文が約655pxしかなく、帯3枚＋矢印2本が収まらない
  return (
    <SlideShell narration={SEG_CHAIN}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3 * SCALE,
        }}
      >
        {/* 語りに合わせて末端 → 中間 → 最上位の順に、下から積み上がる */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <ChainBand
            rank="最上位"
            name="ルート証明書"
            note="自分自身で署名している"
            tone="root"
            atSec={segStart(SEG_CHAIN, 2)}
            extra={rootExtra}
          />
        </div>
        <ChainArrow atSec={segStart(SEG_CHAIN, 2) + 0.5} />
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <ChainBand
            rank="中間"
            name="中間CAの証明書"
            note="上位の認証局が署名している"
            tone="mid"
            atSec={segStart(SEG_CHAIN, 1)}
          />
        </div>
        <ChainArrow atSec={segStart(SEG_CHAIN, 1) + 0.5} />
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <ChainBand
            rank="末端"
            name="相手の証明書"
            note="確かめたいサーバのもの"
            tone="leaf"
            atSec={0.3}
          />
        </div>
        <span
          style={{
            marginTop: 5 * SCALE,
            fontSize: 15 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            ...footAppear,
          }}
        >
          ルート証明書までたどれる ＝ <span style={markerStyle}>信頼の連鎖</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 証明書失効リスト — 失効理由 + 一覧の表モック
// ---------------------------------------------------------------------------

const ReasonChip: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const chip = useAppear(atSec, { dy: 8 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        fontSize: 11 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        color: colors.accentPinkText,
        backgroundColor: colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
        borderRadius: 999,
        padding: `${3 * SCALE}px ${13 * SCALE}px`,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      <Ms name={icon} size={16 * SCALE} />
      <span>{text}</span>
    </span>
  );
};

const CrlRow: React.FC<{ serial: string; date: string; atSec: number }> = ({
  serial,
  date,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 0 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8 * SCALE,
        padding: `${3.5 * SCALE}px ${11 * SCALE}px`,
        borderRadius: 8 * SCALE,
        backgroundColor: colors.bg,
        ...row,
      }}
    >
      <span style={{ fontFamily: fontMono, fontSize: 11.5 * SCALE, fontWeight: 800 }}>{serial}</span>
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 11 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
        }}
      >
        {date}
      </span>
    </div>
  );
};

const CrlScene: React.FC = () => {
  const validAppear = useAppear(0.3);
  const listAppear = useAppear(segStart(SEG_CRL, 2));
  const termAppear = useAppear(segStart(SEG_CRL, 3));
  const footAppear = useAppear(segStart(SEG_CRL, 4), { dy: 10 });
  return (
    <SlideShell
      heading="有効期限内でも無効にする"
      icon={<Ms name="cancel" size={videoType.slideHeadIcon} />}
      narration={SEG_CRL}
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
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 5 * SCALE,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6 * SCALE,
                fontSize: 10.5 * SCALE,
                fontWeight: 700,
                lineHeight: 1.2,
                color: colors.textSecondary,
                ...validAppear,
              }}
            >
              <Ms name="schedule" size={15 * SCALE} />
              <span>有効期限は 2027-03-31 まで</span>
            </span>
            <span
              style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.2, ...validAppear }}
            >
              それでも<span style={markerPinkStyle}>今すぐ無効に</span>したい理由
            </span>
            <ReasonChip icon="key" text="秘密鍵の漏えい" atSec={segStart(SEG_CRL, 1)} />
            <ReasonChip icon="person" text="社員の退職" atSec={segStart(SEG_CRL, 1) + 1.8} />
          </div>
          <div
            style={{
              flex: 1.1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 3 * SCALE,
              padding: `${7 * SCALE}px ${10 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 13 * SCALE,
              ...listAppear,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6 * SCALE,
                fontSize: 11 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
              }}
            >
              <Ms name="checklist" size={16 * SCALE} />
              <span>認証局が公開する無効の一覧</span>
            </span>
            <CrlRow serial="No. 4A2F…81" date="2026-08-10 失効" atSec={segStart(SEG_CRL, 2) + 0.4} />
            <CrlRow serial="No. 7C90…3D" date="2026-09-02 失効" atSec={segStart(SEG_CRL, 2) + 0.9} />
            <CrlRow serial="No. B15E…6A" date="2026-09-24 失効" atSec={segStart(SEG_CRL, 2) + 1.4} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3 * SCALE,
          }}
        >
          <b style={{ fontSize: 18 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>証明書失効リスト（CRL）</span>
          </b>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 700,
              lineHeight: 1.2,
              color: colors.textSecondary,
              ...footAppear,
            }}
          >
            証明書を受け取ったら、失効していないかも確認する
          </span>
        </div>
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

export const SgL21PkiCertificate: VideoSpec = {
  id: "sg-L21-pki-certificate",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "PKIと\nデジタル証明書",
      keywords: ["認証局", "信頼の連鎖", "失効リスト"],
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
      name: "spoof",
      durationSec: 6,
      narration: SEG_SPOOF,
      component: SpoofScene,
    },
    {
      pattern: "custom",
      name: "cert-term",
      durationSec: 6,
      narration: SEG_CERT,
      component: CertTermScene,
    },
    {
      pattern: "custom",
      name: "cert-inside",
      durationSec: 6,
      narration: SEG_INSIDE,
      component: CertInsideScene,
    },
    {
      pattern: "custom",
      name: "ca",
      durationSec: 6,
      narration: SEG_CA,
      component: CaScene,
    },
    {
      pattern: "custom",
      name: "trust-chain",
      durationSec: 7,
      narration: SEG_CHAIN,
      component: TrustChainScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "vs",
      heading: "証明する向きで呼び方が変わる",
      icon: "compare_arrows",
      left: {
        title: "サーバ証明書",
        icon: "dns",
        rows: [
          { k: "示すもの", v: "そのサーバが本物" },
          { k: "示す相手", v: "アクセスする利用者" },
          { k: "使いどころ", v: "偽サイトの見分け" },
        ],
      },
      right: {
        title: "クライアント証明書",
        icon: "laptop_mac",
        rows: [
          { k: "示すもの", v: "利用者や端末が本物" },
          { k: "示す相手", v: "接続されるサーバ" },
          { k: "使いどころ", v: "許可した端末だけ接続" },
        ],
      },
      columnAtSec: [segStart(SEG_DIR, 1), segStart(SEG_DIR, 2)],
      narration: SEG_DIR,
    },
    {
      pattern: "custom",
      name: "crl",
      durationSec: 7,
      narration: SEG_CRL,
      component: CrlScene,
    },
    {
      pattern: "term",
      chip: "公開鍵を支える基盤",
      icon: "account_tree",
      term: "PKI",
      sub: "公開鍵基盤 — 証明書・認証局・失効の仕組みをまとめて支える枠組み",
      narration: SEG_PKI,
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
      question: "デジタル証明書が保証するのは？",
      choices: [
        { key: "A", text: "公開鍵と持ち主の対応", correct: true },
        { key: "B", text: "その公開鍵の暗号の強さ" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "信頼の基点＝トラストアンカーは？",
      choices: [
        { key: "A", text: "中間CAの証明書" },
        { key: "B", text: "端末に入るルート証明書", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "期限内の証明書を無効にするのは？",
      choices: [
        { key: "A", text: "証明書失効リスト（CRL）", correct: true },
        { key: "B", text: "クライアント証明書" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行29文字が上限（超えると3行分がテロップ帯に重なる）
          text: "証明書＝公開鍵と持ち主を認証局が保証",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "ルート証明書からたどれる＝信頼の連鎖",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "期限内の無効化はCRL、基盤全体がPKI",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
