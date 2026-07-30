import React from "react";
import { Img, staticFile } from "remotion";
import { colors, fontMono, markerStyle, markerPinkStyle, radius, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { DrawPath, ArrowMarker } from "../../parts/draw";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L10-spoofing-phishing.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L10: 通信を狙う攻撃①：なりすましと誘導
 *
 * 発注書 content_works/ipa_sg/orders/L10.md に対応（誘導・なりすまし系のみ。通信への割り込みは
 * L11、SPF/DKIM/DMARC による対策は L43、スパム対策は L44、メール配送とDNSの詳細は L62・L61、
 * 標的型攻撃メールは L12）。シナリオは narration/ipa_sg/sg-L10-spoofing-phishing.md。
 *
 * 導入（イラスト左右分割）→ 前提：差出人欄は自己申告（メールUIモック）→ フィッシングの流れ
 * （既製flow）→ 本物と偽物のブラウザ比較 → 経路違いの派生（チップ列）→ SEOポイズニング
 * （検索結果モック・wipe-light）→ IPスプーフィング（パケットの送信元書き換え）→
 * オープンリレー（踏み台の経路図）→ クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ「SEO」「IP」「SNS」「ID」を
 *   「エスイーオー」「アイピー」「エスエヌエス」「アイディー」と仮名書きしている。字幕
 *   （下の N() 第2引数）は略語表記が正。音声と原稿が食い違って見えるが意図的
 *   （references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L10-spoofing-phishing");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "「アカウントを確認してください」というメールが、銀行の名前で届いたとします。"),
  N("s02-2.mp3", "慌ててリンクを開き、パスワードを入力してしまう人は少なくありません。"),
  N("s02-3.mp3", "今回学ぶのは、誰から来たかを信じ込ませて、偽物のほうへ連れていく攻撃です。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "最初に、大事な前提を一つだけ確認します。"),
  N("s03-2.mp3", "メールの差出人の欄は、送る側が自由に書ける自己申告にすぎません。"),
  N("s03-3.mp3", "銀行の名前も、アドレスも、本物そっくりに名乗ることができます。"),
  N("s03-4.mp3", "差出人が本物に見えることは、本物である証拠にはならないのです。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "代表的な手口が、フィッシングです。"),
  N("s04-2.mp3", "まず、本物そっくりの通知が利用者のもとに届きます。"),
  N("s04-3.mp3", "リンクを開くと、本物に似せて作られた偽のサイトが表示されます。"),
  N("s04-4.mp3", "そこでIDやパスワードを入力すると、その情報は攻撃者に届きます。"),
  N("s04-5.mp3", "盗まれた情報は、そのまま本物のサイトへのログインに使われます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "偽サイトは、見た目だけでは本物と区別がつきません。"),
  N("s05-2.mp3", "ロゴも配色も、本物からそのままコピーできるからです。"),
  N("s05-3.mp3", "違いが出るのは、アドレスバーに表示されているドメイン名です。"),
  N("s05-4.mp3", "見た目ではなく、どこに接続しているかで判断する必要があります。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "フィッシングは、メール以外の経路でも仕掛けられます。"),
  N("s06-2.mp3", "ショートメッセージを使うものは、スミッシングと呼ばれます。"),
  N("s06-3.mp3", "ほかにも、SNSのメッセージや、電話で聞き出す手口があります。"),
  N("s06-4.mp3", "経路が変わっても、偽物へ誘導して入力させる本質は同じです。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "誘導の入口は、届くものだけとは限りません。"),
  N("s07-2.mp3", "SEOポイズニングは、検索結果の上位に悪意のあるサイトを表示させる手口です。"),
  N("s07-3.mp3", "利用者は自分で検索して選んだつもりでも、罠のサイトを開いてしまいます。"),
  N("s07-4.mp3", "検索して出てきたから安全、という判断は成り立たないのです。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "偽装できるのは、名前だけではありません。"),
  N("s08-2.mp3", "IPスプーフィングは、通信の送信元IPアドレスを別のものに偽る攻撃です。"),
  N("s08-3.mp3", "送信元のアドレスで相手を信用している仕組みは、これで破られます。"),
  N("s08-4.mp3", "社内からの通信だから安全、という前提が成り立たなくなります。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "最後は、第三者中継、オープンリレーです。"),
  N("s09-2.mp3", "設定に不備のあるメールサーバは、誰からのメールでも中継してしまいます。"),
  N("s09-3.mp3", "攻撃者はそこを踏み台にして、大量の迷惑メールを送り出します。"),
  N("s09-4.mp3", "自社のサーバが加害者側になり、送信元として拒否されるようになります。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "差出人の欄が本物に見えても信用できないのは、なぜでしょうか。"),
  N("s11-3.mp3", "正解は、差出人は送る側が自由に書けるからです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "検索結果の上位に悪意のあるサイトを表示させる手口は、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、SEOポイズニングです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "メールサーバの設定不備によって起きる不利益は、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、迷惑メールの踏み台にされることです。", { gapBeforeSec: 1.8 }),
];

const SEG_P14 = [
  N("s14-1.mp3", "差出人も検索結果も偽装できるので、見た目は根拠になりません。"),
  N("s14-2.mp3", "フィッシングは偽サイトへ誘導し、入力させて情報を奪います。"),
  N("s14-3.mp3", "設定不備のメールサーバは、自社が加害者になる入口になります。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// 共有の小部品
// ---------------------------------------------------------------------------

/** 向きを自由に選べる矢じり（アイコンフォントに依存しない） */
const Chevron: React.FC<{ dir: "right" | "down"; size: number }> = ({ dir, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: "none" }}
  >
    <path d={dir === "right" ? "M7 4.5l6 5.5-6 5.5" : "M4.5 7l5.5 6 5.5-6"} />
  </svg>
);

/** 各ページ下部の結論バンド（画面の要点。字幕と同じ文は書かない） */
const Conclusion: React.FC<{ atSec: number; children: React.ReactNode }> = ({ atSec, children }) => {
  const appear = useAppear(atSec);
  return (
    <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, textAlign: "center", ...appear }}>
      {children}
    </span>
  );
};

// ---------------------------------------------------------------------------
// P2: 導入 — 「銀行から」のメールは、本当に銀行からとは限らない
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const lead = useAppear(0.3);
  const sub = useAppear(segStart(SEG_P2, 1));
  const theme = usePop(segStart(SEG_P2, 2));
  const illust = useAppear(0.6);

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.4, ...lead }}>
            その通知、
            <br />
            <span style={markerPinkStyle}>本当に銀行から</span>？
          </span>
          <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...sub }}>
            慌てさせて、リンクを開かせるのが狙い
          </span>
          <span
            style={{
              alignSelf: "flex-start",
              padding: `${5 * SCALE}px ${11 * SCALE}px`,
              borderRadius: 9 * SCALE,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary300}`,
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              whiteSpace: "nowrap",
              ...theme,
            }}
          >
            今回：なりすましと誘導
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-attacker-mail.png")}
          style={{
            flex: 1,
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
// P3: 【前提】差出人欄は送る側の自己申告にすぎない（メールUIモック）
// ---------------------------------------------------------------------------

const MailRow: React.FC<{
  label: string;
  highlight?: boolean;
  children: React.ReactNode;
}> = ({ label, highlight = false, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 7 * SCALE,
      padding: `${4 * SCALE}px ${8 * SCALE}px`,
      borderRadius: 9 * SCALE,
      backgroundColor: highlight ? colors.primary50 : colors.surface,
      border: `${1.5 * SCALE}px solid ${highlight ? colors.primary500 : colors.border}`,
    }}
  >
    {/* ラベル列は折り返さない幅を確保する（「差出人」が2行になると行が伸びて本文が帯に被る） */}
    <span
      style={{
        flex: "none",
        width: 28 * SCALE,
        fontSize: 10 * SCALE,
        fontWeight: 800,
        color: colors.textMuted,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

const SenderScene: React.FC = () => {
  const card = useAppear(0.3, { dy: 14 });
  const highlightOn = segStart(SEG_P3, 1);
  const callout = usePop(segStart(SEG_P3, 1) + 0.4);
  const spoofed = useAppear(segStart(SEG_P3, 2), { dy: 0 });
  const rowHighlight = useAppear(highlightOn, { dy: 0 });

  return (
    <SlideShell
      heading="【前提】差出人は名乗っているだけ"
      icon={<Ms name="mail" size={videoType.slideHeadIcon} />}
      narration={SEG_P3}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4 * SCALE,
            padding: `${7 * SCALE}px ${9 * SCALE}px`,
            borderRadius: 13 * SCALE,
            backgroundColor: colors.bg,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...card,
          }}
        >
          {/* 差出人の行だけを、語りに合わせて疑わせる */}
          <div style={{ position: "relative" }}>
            <div style={{ opacity: rowHighlight.opacity }}>
              <MailRow label="差出人" highlight>
                <span style={{ fontSize: 12 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
                  ○○銀行
                </span>
                <span
                  style={{
                    fontFamily: fontMono,
                    fontSize: 10.5 * SCALE,
                    fontWeight: 700,
                    color: colors.textSecondary,
                    whiteSpace: "nowrap",
                  }}
                >
                  &lt;support@ma1-bank.example&gt;
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    flex: "none",
                    padding: `${3 * SCALE}px ${8 * SCALE}px`,
                    borderRadius: 7 * SCALE,
                    backgroundColor: colors.accentPinkSurface,
                    color: colors.accentPinkText,
                    fontSize: 10 * SCALE,
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                    ...callout,
                  }}
                >
                  送る側が自由に書ける欄
                </span>
              </MailRow>
            </div>
            {/* 出現前は素の行として見せる（highlight なし） */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 1 - rowHighlight.opacity,
              }}
            >
              <MailRow label="差出人">
                <span style={{ fontSize: 12 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
                  ○○銀行
                </span>
                <span
                  style={{
                    fontFamily: fontMono,
                    fontSize: 10.5 * SCALE,
                    fontWeight: 700,
                    color: colors.textSecondary,
                    whiteSpace: "nowrap",
                  }}
                >
                  &lt;support@ma1-bank.example&gt;
                </span>
              </MailRow>
            </div>
          </div>
          <MailRow label="件名">
            <span style={{ fontSize: 12 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
              【重要】アカウント確認のお願い
            </span>
          </MailRow>
          <MailRow label="本文">
            <span
              style={{
                fontSize: 10.5 * SCALE,
                fontWeight: 700,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
              24時間以内に、こちらから確認してください
            </span>
          </MailRow>
        </div>
        <span
          style={{
            alignSelf: "center",
            fontSize: 10.5 * SCALE,
            fontWeight: 800,
            color: colors.primary600,
            whiteSpace: "nowrap",
            ...spoofed,
          }}
        >
          名前もアドレスも、本物そっくりに名乗れる
        </span>
        <Conclusion atSec={segStart(SEG_P3, 3)}>
          本物に見えることは、<span style={markerStyle}>本物である証拠にならない</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 本物と偽物のブラウザ比較 — 見た目は同じ、違うのはドメイン名
// ---------------------------------------------------------------------------

const SiteCard: React.FC<{
  tag: string;
  url: string;
  fake: boolean;
  atSec: number;
  urlAtSec: number;
}> = ({ tag, url, fake, atSec, urlAtSec }) => {
  const appear = usePop(atSec);
  const urlMark = useAppear(urlAtSec, { dy: 0 });

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 4 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          alignSelf: "center",
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          color: fake ? colors.accentPinkText : colors.textMuted,
          whiteSpace: "nowrap",
        }}
      >
        {tag}
      </span>
      <div
        style={{
          borderRadius: 12 * SCALE,
          overflow: "hidden",
          backgroundColor: colors.surface,
          border: `${1.5 * SCALE}px solid ${fake ? colors.accentPink : colors.border}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* アドレスバー — ここだけが本物と偽物で違う */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5 * SCALE,
            padding: `${4 * SCALE}px ${8 * SCALE}px`,
            backgroundColor: colors.bg,
            borderBottom: `${1 * SCALE}px solid ${colors.border}`,
          }}
        >
          <span style={{ display: "flex", color: colors.textMuted, flex: "none" }}>
            <Ms name={fake ? "warning" : "lock"} size={11 * SCALE} />
          </span>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: fake ? colors.accentPinkText : colors.textSecondary,
              whiteSpace: "nowrap",
              ...(fake ? { ...markerPinkStyle, opacity: 0.35 + 0.65 * urlMark.opacity } : {}),
            }}
          >
            {url}
          </span>
        </div>
        {/* 中身は本物と偽物でまったく同じ — 見た目では区別できないことを画で示す */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4 * SCALE,
            padding: `${8 * SCALE}px ${10 * SCALE}px`,
          }}
        >
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800 }}>○○銀行 ログイン</span>
          {["ID", "パスワード"].map((f) => (
            <div
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                height: 11 * SCALE,
                paddingLeft: 6 * SCALE,
                borderRadius: 6 * SCALE,
                backgroundColor: colors.bg,
                border: `${1 * SCALE}px solid ${colors.border}`,
                fontSize: 9.5 * SCALE,
                fontWeight: 700,
                color: colors.textMuted,
              }}
            >
              {f}
            </div>
          ))}
          <span
            style={{
              alignSelf: "flex-start",
              padding: `${3 * SCALE}px ${10 * SCALE}px`,
              borderRadius: 7 * SCALE,
              backgroundColor: colors.primary600,
              color: colors.textPrimaryDark,
              fontSize: 10 * SCALE,
              fontWeight: 800,
            }}
          >
            ログイン
          </span>
        </div>
      </div>
    </div>
  );
};

const FakeSiteScene: React.FC = () => (
  <SlideShell
    heading="本物と偽物、違いはどこか"
    icon={<Ms name="language" size={videoType.slideHeadIcon} />}
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
        gap: 8 * SCALE,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 * SCALE }}>
        <SiteCard
          tag="本物のサイト"
          url="bank.example"
          fake={false}
          atSec={0.3}
          urlAtSec={segStart(SEG_P5, 2)}
        />
        <SiteCard
          tag="偽サイト"
          url="ma1-bank.example"
          fake
          atSec={0.6}
          urlAtSec={segStart(SEG_P5, 2)}
        />
      </div>
      <Conclusion atSec={segStart(SEG_P5, 2)}>
        見た目ではなく、<span style={markerStyle}>ドメイン名</span>で判断する
      </Conclusion>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P6: 経路違いの派生 — 経路が変わっても本質は同じ（息継ぎのページ）
// ---------------------------------------------------------------------------

const RouteChip: React.FC<{
  icon: string;
  route: string;
  name: string;
  atSec: number;
}> = ({ icon, route, name, atSec }) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${8 * SCALE}px ${4 * SCALE}px`,
        borderRadius: 13 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          width: 34 * SCALE,
          height: 34 * SCALE,
          borderRadius: 12 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={19 * SCALE} />
      </span>
      <span style={{ fontSize: 10 * SCALE, fontWeight: 700, color: colors.textMuted, whiteSpace: "nowrap" }}>
        {route}
      </span>
      <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
    </div>
  );
};

const RoutesScene: React.FC = () => (
  <SlideShell
    heading="経路が変わっても本質は同じ"
    icon={<Ms name="forum" size={videoType.slideHeadIcon} />}
    narration={SEG_P6}
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
      <div style={{ display: "flex", gap: 7 * SCALE }}>
        <RouteChip icon="mail" route="メール" name="フィッシング" atSec={0.3} />
        <RouteChip icon="chat" route="SMS" name="スミッシング" atSec={segStart(SEG_P6, 1)} />
        <RouteChip icon="forum" route="SNS" name="メッセージ" atSec={segStart(SEG_P6, 2)} />
        <RouteChip icon="call" route="電話" name="口頭で聞き出す" atSec={segStart(SEG_P6, 2) + 0.4} />
      </div>
      <Conclusion atSec={segStart(SEG_P6, 3)}>
        どれも<span style={markerStyle}>偽物へ誘導して入力させる</span>
      </Conclusion>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P7: SEOポイズニング — 検索結果の上位が罠になっている
// ---------------------------------------------------------------------------

const SearchResult: React.FC<{
  rank: string;
  title: string;
  url: string;
  trap: boolean;
  atSec: number;
  badgeAtSec: number;
}> = ({ rank, title, url, trap, atSec, badgeAtSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const badge = usePop(badgeAtSec);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${4 * SCALE}px ${9 * SCALE}px`,
        borderRadius: 10 * SCALE,
        backgroundColor: trap ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${trap ? colors.accentPink : colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 13 * SCALE,
          height: 13 * SCALE,
          borderRadius: radius.full,
          backgroundColor: trap ? colors.accentPink : colors.border,
          color: trap ? colors.surface : colors.textSecondary,
          fontSize: 9 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rank}
      </span>
      {/* タイトルとURLは1行に収める（2行にすると3件で本文領域を超え、見出しに被る） */}
      <b style={{ fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{title}</b>
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 9 * SCALE,
          fontWeight: 700,
          color: trap ? colors.accentPinkText : colors.textMuted,
          whiteSpace: "nowrap",
        }}
      >
        {url}
      </span>
      {trap ? (
        <span
          style={{
            marginLeft: "auto",
            flex: "none",
            padding: `${3 * SCALE}px ${8 * SCALE}px`,
            borderRadius: 7 * SCALE,
            backgroundColor: colors.accentPinkText,
            color: colors.textPrimaryDark,
            fontSize: 9.5 * SCALE,
            fontWeight: 800,
            whiteSpace: "nowrap",
            ...badge,
          }}
        >
          攻撃者が用意したサイト
        </span>
      ) : null}
    </div>
  );
};

const SeoPoisoningScene: React.FC = () => {
  const box = useAppear(0.3, { dy: 10 });
  return (
    <SlideShell
      heading="SEOポイズニング"
      icon={<Ms name="search" size={videoType.slideHeadIcon} />}
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
          gap: 6 * SCALE,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            alignSelf: "center",
            width: "62%",
            padding: `${5 * SCALE}px ${10 * SCALE}px`,
            borderRadius: radius.full,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...box,
          }}
        >
          <span style={{ display: "flex", color: colors.textMuted, flex: "none" }}>
            <Ms name="search" size={12 * SCALE} />
          </span>
          <span style={{ fontSize: 12 * SCALE, fontWeight: 800 }}>○○銀行　ログイン</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 * SCALE }}>
          <SearchResult
            rank="1"
            title="○○銀行 公式ログイン"
            url="ma1-bank.example"
            trap
            atSec={segStart(SEG_P7, 1)}
            badgeAtSec={segStart(SEG_P7, 1) + 0.9}
          />
          <SearchResult
            rank="2"
            title="○○銀行 ネットバンキング"
            url="bank.example"
            trap={false}
            atSec={segStart(SEG_P7, 1) + 0.4}
            badgeAtSec={0}
          />
          <SearchResult
            rank="3"
            title="○○銀行 店舗のご案内"
            url="bank.example/shop"
            trap={false}
            atSec={segStart(SEG_P7, 1) + 0.7}
            badgeAtSec={0}
          />
        </div>
        <Conclusion atSec={segStart(SEG_P7, 3)}>
          <span style={markerPinkStyle}>検索して出てきた＝安全</span>にはならない
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: IPスプーフィング — パケットの送信元アドレスを書き換える
// ---------------------------------------------------------------------------

/** grow は左右の欄で中身の長さが大きく違うため必須（flex:1 で等分すると中身が隣にはみ出す） */
const PacketField: React.FC<{
  label: string;
  grow: number;
  children: React.ReactNode;
  highlight?: boolean;
}> = ({ label, grow, children, highlight = false }) => (
  <div
    style={{
      flex: `${grow} 1 0`,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 3 * SCALE,
      padding: `${6 * SCALE}px ${9 * SCALE}px`,
      borderRadius: 10 * SCALE,
      backgroundColor: highlight ? colors.primary50 : colors.surface,
      border: `${1.5 * SCALE}px solid ${highlight ? colors.primary500 : colors.border}`,
    }}
  >
    <span style={{ fontSize: 9.5 * SCALE, fontWeight: 800, color: colors.textMuted }}>{label}</span>
    {children}
  </div>
);

const IpSpoofingScene: React.FC = () => {
  const packet = useAppear(0.3, { dy: 12 });
  const rewrite = useAppear(segStart(SEG_P8, 1) + 0.6, { dy: 0 });
  const arrow = useAppear(segStart(SEG_P8, 2), { dy: 0 });
  const judge = usePop(segStart(SEG_P8, 2) + 0.3);

  return (
    <SlideShell
      heading="IPスプーフィング"
      icon={<Ms name="lan" size={videoType.slideHeadIcon} />}
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
          gap: 5 * SCALE,
        }}
      >
        {/* 攻撃者が送るパケット。送信元の欄だけが書き換えられる */}
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: 6 * SCALE,
            padding: `${7 * SCALE}px ${8 * SCALE}px`,
            borderRadius: 13 * SCALE,
            backgroundColor: colors.bg,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...packet,
          }}
        >
          <PacketField label="送信元IPアドレス" grow={3.2} highlight>
            <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 11 * SCALE,
                  fontWeight: 700,
                  color: colors.textMuted,
                  textDecoration: "line-through",
                  whiteSpace: "nowrap",
                }}
              >
                203.0.113.9
              </span>
              <span style={{ display: "flex", color: colors.primary500, ...rewrite }}>
                <Chevron dir="right" size={11 * SCALE} />
              </span>
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 13 * SCALE,
                  fontWeight: 800,
                  color: colors.primary600,
                  whiteSpace: "nowrap",
                  ...rewrite,
                }}
              >
                192.168.1.10
              </span>
              <span
                style={{
                  fontSize: 9.5 * SCALE,
                  fontWeight: 800,
                  color: colors.primary600,
                  whiteSpace: "nowrap",
                  ...rewrite,
                }}
              >
                （社内のアドレス）
              </span>
            </div>
          </PacketField>
          <PacketField label="宛先IPアドレス" grow={1}>
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 11 * SCALE,
                fontWeight: 700,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
              10.0.0.5
            </span>
          </PacketField>
        </div>

        <span style={{ display: "flex", color: colors.primary500, ...arrow }}>
          <Chevron dir="down" size={15 * SCALE} />
        </span>

        {/* 受け取る側は「送信元がどこか」しか見ていない */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            padding: `${6 * SCALE}px ${12 * SCALE}px`,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...judge,
          }}
        >
          <Img
            src={staticFile("images/ipa_sg/tech-firewall.png")}
            style={{ height: 24 * SCALE, objectFit: "contain", mixBlendMode: "multiply", flex: "none" }}
          />
          <b style={{ fontSize: 13 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
            「社内からの通信だから通す」
          </b>
        </div>

        <Conclusion atSec={segStart(SEG_P8, 3)}>
          送信元アドレスは、<span style={markerStyle}>信用の根拠にならない</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 第三者中継（オープンリレー）— 自社のサーバが踏み台にされ、加害者側になる
// ---------------------------------------------------------------------------

/** ノード幅はラベルが折り返さない幅で固定する（「メールサーバ」が3行に割れるのを防ぐ） */
const PathNode: React.FC<{
  image: string;
  lines: [string, string];
  badge?: string;
  width: number;
  atSec: number;
}> = ({ image, lines, badge, width, atSec }) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: "none",
        width,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        ...appear,
      }}
    >
      <Img
        src={staticFile(image)}
        style={{ height: 42 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
      />
      <b
        style={{
          fontSize: 12 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {lines[0]}
        <br />
        {lines[1]}
      </b>
      {badge ? (
        <span
          style={{
            padding: `${2 * SCALE}px ${7 * SCALE}px`,
            borderRadius: 6 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            color: colors.accentPinkText,
            fontSize: 10.5 * SCALE,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
};

const OpenRelayScene: React.FC = () => {
  const label1 = useAppear(segStart(SEG_P9, 1), { dy: 0 });
  const label2 = useAppear(segStart(SEG_P9, 2), { dy: 0 });
  const targets = usePop(segStart(SEG_P9, 2) + 0.5);

  return (
    <SlideShell
      heading="第三者中継（オープンリレー）"
      icon={<Ms name="campaign" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
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
        <div style={{ display: "flex", alignItems: "center", gap: 2 * SCALE, width: "100%" }}>
          <PathNode
            image="images/ipa_sg/person-attacker.png"
            lines={["外部の", "攻撃者"]}
            width={46 * SCALE}
            atSec={0.3}
          />
          {/* 攻撃者 → 自社サーバ */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 * SCALE }}>
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
                ...label1,
              }}
            >
              誰からでも中継してしまう
            </span>
            <svg viewBox="0 0 100 16" style={{ width: "100%", height: 10 * SCALE }}>
              <ArrowMarker id="relay-in" color={colors.primary500} />
              <DrawPath
                d="M2 8 L88 8"
                delaySec={segStart(SEG_P9, 1)}
                durSec={0.6}
                stroke={colors.primary500}
                strokeWidth={2.5}
                markerEnd="url(#relay-in)"
              />
            </svg>
          </div>
          <PathNode
            image="images/ipa_sg/net-mailserver.png"
            lines={["自社の", "メールサーバ"]}
            badge="設定不備"
            width={66 * SCALE}
            atSec={0.5}
          />
          {/* 自社サーバ → 不特定多数（3本に分かれて出ていく） */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 * SCALE }}>
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
                whiteSpace: "nowrap",
                ...label2,
              }}
            >
              大量の迷惑メール
            </span>
            {/* 高さ48・上下の終点を y=8/40 にしているのは、矢じりの縦幅
                （size 6 × strokeWidth 2.5 = 15）が viewBox の外に出て角が欠けるのを防ぐため
                （parts/draw.tsx の ArrowMarker のコメント参照） */}
            <svg viewBox="0 0 100 48" style={{ width: "100%", height: 26 * SCALE }}>
              <ArrowMarker id="relay-out" color={colors.accentPink} />
              {[
                "M2 24 C 40 24, 50 8, 88 8",
                "M2 24 L88 24",
                "M2 24 C 40 24, 50 40, 88 40",
              ].map((d, i) => (
                <DrawPath
                  key={d}
                  d={d}
                  delaySec={segStart(SEG_P9, 2) + i * 0.18}
                  durSec={0.6}
                  stroke={colors.accentPink}
                  strokeWidth={2.5}
                  markerEnd="url(#relay-out)"
                />
              ))}
            </svg>
          </div>
          <div
            style={{
              flex: "none",
              width: 62 * SCALE, // 中身（アイコン+ラベル+余白）より一回り大きく。等号ぴったりだと右へはみ出す
              display: "flex",
              flexDirection: "column",
              gap: 3 * SCALE,
              ...targets,
            }}
          >
            {["宛先A", "宛先B", "宛先C"].map((t) => (
              <span
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4 * SCALE,
                  padding: `${3 * SCALE}px ${6 * SCALE}px`,
                  borderRadius: 7 * SCALE,
                  backgroundColor: colors.surface,
                  border: `${1 * SCALE}px solid ${colors.border}`,
                  fontSize: 10.5 * SCALE,
                  fontWeight: 800,
                  color: colors.textSecondary,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ display: "flex", color: colors.textMuted, flex: "none" }}>
                  <Ms name="mail" size={11 * SCALE} />
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>
        <Conclusion atSec={segStart(SEG_P9, 3)}>
          送信元は自社。<span style={markerPinkStyle}>加害者側として扱われる</span>
        </Conclusion>
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

export const SgL10SpoofingPhishing: VideoSpec = {
  id: "sg-L10-spoofing-phishing",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "その「誰から」は\n本当か",
      keywords: ["フィッシング", "なりすまし", "偽サイト"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "intro",
      durationSec: 6,
      narration: SEG_P2,
      component: IntroScene,
    },
    {
      pattern: "custom",
      name: "sender-is-self-declared",
      durationSec: 7,
      narration: SEG_P3,
      component: SenderScene,
    },
    {
      pattern: "flow",
      heading: "フィッシングの流れ",
      icon: "alt_route",
      steps: [
        // sub は9文字までに抑える（それ以上はカード内で折り返す）
        { abc: "1", name: "届く", sub: "本物そっくりの通知" },
        { abc: "2", name: "開く", sub: "偽サイトが表示" },
        { abc: "3", name: "入力", sub: "IDとパスワード" },
        { abc: "4", name: "悪用", sub: "本人になりすます" },
      ],
      // 各ステップはそれを説明するナレーション文の開始秒で点灯させる
      highlightAtSec: [
        segStart(SEG_P4, 1),
        segStart(SEG_P4, 2),
        segStart(SEG_P4, 3),
        segStart(SEG_P4, 4),
      ],
      narration: SEG_P4,
    },
    {
      pattern: "custom",
      name: "fake-site",
      durationSec: 7,
      narration: SEG_P5,
      component: FakeSiteScene,
    },
    {
      pattern: "custom",
      name: "routes",
      durationSec: 6,
      narration: SEG_P6,
      component: RoutesScene,
    },
    {
      pattern: "custom",
      name: "seo-poisoning",
      durationSec: 7,
      narration: SEG_P7,
      component: SeoPoisoningScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "ip-spoofing",
      durationSec: 7,
      narration: SEG_P8,
      component: IpSpoofingScene,
    },
    {
      pattern: "custom",
      name: "open-relay",
      durationSec: 7,
      narration: SEG_P9,
      component: OpenRelayScene,
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
      question: "差出人が本物に見えても？",
      choices: [
        { key: "A", text: "通信が暗号化されていない" },
        { key: "B", text: "送る側が自由に書ける欄", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "検索結果の上位を偽装する手口は？",
      choices: [
        { key: "A", text: "SEOポイズニング", correct: true },
        { key: "B", text: "第三者中継" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "メールサーバの設定不備で？",
      choices: [
        { key: "A", text: "顧客のパスワードが漏れる" },
        { key: "B", text: "迷惑メールの踏み台にされる", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "差出人も検索結果も偽装できる", checkAtSec: segStart(SEG_P14, 0) },
        { text: "フィッシングは偽サイトへ誘導して入力させる", checkAtSec: segStart(SEG_P14, 1) },
        { text: "設定不備のサーバは自社が加害者になる", checkAtSec: segStart(SEG_P14, 2) },
      ],
      narration: SEG_P14,
      transitionIn: "wipe",
    },
  ],
};
