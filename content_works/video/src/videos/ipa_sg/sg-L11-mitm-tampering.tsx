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
import durations from "./sg-L11-mitm-tampering.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L11: 通信を狙う攻撃②：盗聴と改ざん
 *
 * 発注書 content_works/ipa_sg/orders/L11.md に対応（通信路への「割り込み」のみ。誘導・なりすまし
 * 系は L10、TLS/HTTPS・IPsec・VPN による対策は L42・L45、DNS の詳しい仕組みは L61、無線LANの
 * セキュリティ設定は L65）。シナリオは narration/ipa_sg/sg-L11-mitm-tampering.md。
 *
 * 導入（イラスト左右分割）→ 中間者攻撃（思っている通信／実際の通信の2段図・主役）→ 盗聴と改ざん
 * （送信内容が届く前に書き換わる縦図）→ 公衆Wi-Fi（息継ぎ）→ MITB（ブラウザの中・wipe-light）→
 * 【前提】名前解決（既製flow）→ DNSキャッシュポイズニング（キャッシュ表の1行が差し替わる）→
 * リプレイ攻撃（縦タイムライン）→ クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ「MITM」「MITB」「IP」「DNS」
 *   「URL」「無線LAN」を「エムアイティーエム」「エムアイティービー」「アイピー」「ディーエヌエス」
 *   「ユーアールエル」「無線ラン」と仮名書きしている。字幕（下の N() 第2引数）は略語表記が正。
 *   音声と原稿が食い違って見えるが意図的（references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L11-mitm-tampering");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "前回は、偽物のほうへ連れていく攻撃を見てきました。"),
  N("s02-2.mp3", "今回は、正しい相手と通信しているのに、そのあいだに他人が座り込んでいる攻撃を扱います。"),
  N("s02-3.mp3", "通信の途中に割り込まれると、中身を読まれたり、書き換えられたりします。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "この回の主役が、中間者攻撃、MITMです。"),
  N("s03-2.mp3", "利用者とサーバのあいだに、攻撃者が入り込みます。"),
  N("s03-3.mp3", "攻撃者は、受け取った通信をそのまま相手に渡します。"),
  N("s03-4.mp3", "だから両側とも、直接つながっていると思い込んだままです。"),
  N("s03-5.mp3", "通信は素通りしているように見えて、すべて攻撃者を通っています。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "あいだに座った攻撃者にできることは、二つあります。"),
  N("s04-2.mp3", "一つは盗聴で、やり取りの中身をそのまま読み取ることです。"),
  N("s04-3.mp3", "もう一つは改ざんで、内容を書き換えてから相手に渡すことです。"),
  N("s04-4.mp3", "振込先の口座番号を書き換えられても、送った本人は気づけません。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "身近な例が、店や駅の無料の無線LANです。"),
  N("s05-2.mp3", "暗号化されていない電波は、近くにいる誰でも受信できます。"),
  N("s05-3.mp3", "さらに、攻撃者が本物そっくりの名前でアクセスポイントを用意することもあります。"),
  N("s05-4.mp3", "そこにつないだ通信は、最初から攻撃者の手のひらの上です。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "割り込む場所が通信路ではなく、利用者のブラウザの中である攻撃もあります。"),
  N("s06-2.mp3", "これがMITB攻撃です。"),
  N("s06-3.mp3", "ブラウザに入り込んだマルウェアが、暗号化される前の内容を書き換えます。"),
  N("s06-4.mp3", "通信を暗号化しても防げない、というのがこの攻撃の怖いところです。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "ここで、前提をひとつだけ確認します。"),
  N("s07-2.mp3", "私たちが打ち込むのは名前ですが、通信の相手はIPアドレスで指定されます。"),
  N("s07-3.mp3", "この名前をIPアドレスに引き直しているのが、DNSサーバです。"),
  N("s07-4.mp3", "引き直した先のアドレスへ接続して、ようやく通信が始まります。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "そのDNSサーバの答えを偽物にすり替えるのが、DNSキャッシュポイズニングです。"),
  N("s08-2.mp3", "引き直した結果は、しばらくキャッシュとして保存されます。"),
  N("s08-3.mp3", "そこへ偽のアドレスを紛れ込ませると、以後の利用者はまとめて偽サーバへ運ばれます。"),
  N("s08-4.mp3", "打ち込んだURLは正しいままなので、見て気づくことができません。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "最後は、リプレイ攻撃です。"),
  N("s09-2.mp3", "盗み取った通信を、そっくりそのまま相手へ送り直す攻撃です。"),
  N("s09-3.mp3", "中身が暗号化されていて読めなくても、送り直すこと自体はできます。"),
  N("s09-4.mp3", "認証のやり取りを再送されると、本人になりすまして通ってしまいます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "MITB攻撃が、通信を暗号化しても防げないのはなぜでしょうか。"),
  N("s11-3.mp3", "正解は、暗号化される前のブラウザの中で書き換えられるからです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "正しいURLを入力したのに偽サイトが開くのは、どの攻撃でしょうか。"),
  N("s12-3.mp3", "正解は、DNSキャッシュポイズニングです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "中身が読めなくても成立してしまう攻撃は、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、盗んだ通信をそのまま送り直すリプレイ攻撃です。", { gapBeforeSec: 1.8 }),
];

const SEG_P14 = [
  N("s14-1.mp3", "中間者攻撃は、通信のあいだに割り込んで盗聴と改ざんをします。"),
  N("s14-2.mp3", "MITBはブラウザの中で書き換えるので、暗号化では防げません。"),
  N("s14-3.mp3", "DNSを汚されると、正しいURLのまま偽サーバへ運ばれます。"),
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

/** 経路図のノード（アイコン + ラベル）。幅は固定して2段の左右端を揃える */
const NODE_W = 52 * SCALE;

const PathNode: React.FC<{
  icon: string;
  label: string;
  tone?: "normal" | "attacker";
  atSec: number;
}> = ({ icon, label, tone = "normal", atSec }) => {
  const appear = usePop(atSec);
  const attacker = tone === "attacker";
  return (
    <div
      style={{
        flex: "none",
        width: NODE_W,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          width: 28 * SCALE,
          height: 28 * SCALE,
          borderRadius: 10 * SCALE,
          backgroundColor: attacker ? colors.accentPinkSurface : colors.primary50,
          color: attacker ? colors.accentPinkText : colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={16 * SCALE} />
      </span>
      <b
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 800,
          whiteSpace: "nowrap",
          color: attacker ? colors.accentPinkText : colors.textPrimary,
        }}
      >
        {label}
      </b>
    </div>
  );
};

/** 段の見出し（「思っている通信」「実際の通信」など） */
const RowLabel: React.FC<{ text: string; tone?: "muted" | "pink"; atSec: number }> = ({
  text,
  tone = "muted",
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 0 });
  return (
    <span
      style={{
        alignSelf: "flex-start",
        padding: `${2 * SCALE}px ${8 * SCALE}px`,
        borderRadius: 6 * SCALE,
        backgroundColor: tone === "pink" ? colors.accentPinkSurface : colors.border,
        color: tone === "pink" ? colors.accentPinkText : colors.textSecondary,
        fontSize: 10 * SCALE,
        fontWeight: 800,
        whiteSpace: "nowrap",
        ...appear,
      }}
    >
      {text}
    </span>
  );
};

// ---------------------------------------------------------------------------
// P2: 導入 — 相手は本物なのに、あいだに他人が座っている
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
            相手は本物。
            <br />
            でも<span style={markerPinkStyle}>途中に誰かいる</span>
          </span>
          <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...sub }}>
            素通しに見せて、読んで、書き換える
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
            今回：盗聴と改ざん
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/attack-mitm.png")}
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
// P3: 中間者攻撃（MITM）— 思っている通信と、実際の通信の2段比較
// ---------------------------------------------------------------------------

/**
 * 矢印1本ぶんのコネクタ。preserveAspectRatio は既定のまま（L10 の経路図と同じ描き方）。
 * viewBox の高さ16は矢じりの縦幅（size 6 × strokeWidth 2.5 = 15）を収めるための余白
 * （足りないと矢じりの角が四角く欠ける。parts/draw.tsx の ArrowMarker のコメント参照）
 */
const ArrowLink: React.FC<{ id: string; delaySec: number }> = ({ id, delaySec }) => (
  <div style={{ flex: 1, minWidth: 0 }}>
    <svg viewBox="0 0 100 16" style={{ width: "100%", height: 9 * SCALE }}>
      <ArrowMarker id={id} color={colors.accentPink} />
      <DrawPath
        d="M2 8 L86 8"
        delaySec={delaySec}
        durSec={0.5}
        stroke={colors.accentPink}
        strokeWidth={2.5}
        markerEnd={`url(#${id})`}
      />
    </svg>
  </div>
);

const MitmScene: React.FC = () => {
  const dashed = useAppear(0.6, { dy: 0 });
  const believe = usePop(segStart(SEG_P3, 3));

  return (
    <SlideShell
      heading="中間者攻撃（MITM）"
      icon={<Ms name="swap_horiz" size={videoType.slideHeadIcon} />}
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
        {/* 上段: 利用者もサーバも「直接つながっている」と思っている */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 * SCALE }}>
          <RowLabel text="両側が思っている通信" atSec={0.3} />
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <PathNode icon="laptop_mac" label="利用者" atSec={0.3} />
            <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", padding: `0 ${4 * SCALE}px` }}>
              <span
                style={{
                  flex: 1,
                  borderTop: `${2 * SCALE}px dashed ${colors.textMuted}`,
                  ...dashed,
                }}
              />
            </div>
            <PathNode icon="dns" label="サーバ" atSec={0.45} />
          </div>
        </div>

        {/* 下段: 実際は、すべての通信が攻撃者を経由している */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 * SCALE }}>
          {/* ラベルと「気づかない」の一言は1行にまとめる（縦に積むと本文が見出し・帯に被る） */}
          <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE }}>
            <RowLabel text="実際の通信" tone="pink" atSec={segStart(SEG_P3, 1)} />
            <span
              style={{
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
                ...believe,
              }}
            >
              そのまま渡されるので、両側とも気づかない
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <PathNode icon="laptop_mac" label="利用者" atSec={segStart(SEG_P3, 1)} />
            <ArrowLink id="mitm-in" delaySec={segStart(SEG_P3, 2)} />
            <PathNode icon="person" label="攻撃者" tone="attacker" atSec={segStart(SEG_P3, 1) + 0.4} />
            <ArrowLink id="mitm-out" delaySec={segStart(SEG_P3, 2) + 0.4} />
            <PathNode icon="dns" label="サーバ" atSec={segStart(SEG_P3, 1)} />
          </div>
        </div>

        <Conclusion atSec={segStart(SEG_P3, 4)}>
          素通りに見えて、<span style={markerPinkStyle}>すべて攻撃者を通っている</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 盗聴と改ざん — 送った内容が、届く前に書き換えられる
// ---------------------------------------------------------------------------

const TransferCard: React.FC<{
  label: string;
  account: string;
  to: string;
  fake?: boolean;
  atSec: number;
}> = ({ label, account, to, fake = false, atSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        alignSelf: "center",
        padding: `${6 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 11 * SCALE,
        backgroundColor: fake ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${fake ? colors.accentPink : colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          fontSize: 10 * SCALE,
          fontWeight: 800,
          color: fake ? colors.accentPinkText : colors.textMuted,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 13 * SCALE,
          fontWeight: 800,
          color: fake ? colors.accentPinkText : colors.textPrimary,
          whiteSpace: "nowrap",
        }}
      >
        {account}
      </span>
      <span
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: fake ? colors.accentPinkText : colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {to}
      </span>
    </div>
  );
};

const AbilityBadge: React.FC<{ icon: string; name: string; desc: string; atSec: number }> = ({
  icon,
  name,
  desc,
  atSec,
}) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${6 * SCALE}px ${9 * SCALE}px`,
        borderRadius: 11 * SCALE,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary300}`,
        ...appear,
      }}
    >
      <span style={{ display: "flex", color: colors.primary600, flex: "none" }}>
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <b style={{ fontSize: 13 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const TapTamperScene: React.FC = () => {
  const arrow1 = useAppear(0.7, { dy: 0 });
  const arrow2 = useAppear(segStart(SEG_P4, 3), { dy: 0 });

  return (
    <SlideShell
      heading="割り込めば、読めるし書き換えられる"
      icon={<Ms name="edit" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
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
          gap: 4 * SCALE,
        }}
      >
        <TransferCard label="利用者が送った内容" account="1234567" to="A社の口座へ" atSec={0.3} />

        <span style={{ display: "flex", color: colors.textMuted, ...arrow1 }}>
          <Chevron dir="down" size={13 * SCALE} />
        </span>

        {/* 攻撃者にできる2つのこと */}
        <div style={{ display: "flex", alignItems: "stretch", gap: 6 * SCALE, width: "100%" }}>
          <AbilityBadge
            icon="visibility"
            name="盗聴"
            desc="中身をそのまま読み取る"
            atSec={segStart(SEG_P4, 1)}
          />
          <AbilityBadge
            icon="edit"
            name="改ざん"
            desc="内容を書き換えて渡す"
            atSec={segStart(SEG_P4, 2)}
          />
        </div>

        <span style={{ display: "flex", color: colors.accentPink, ...arrow2 }}>
          <Chevron dir="down" size={13 * SCALE} />
        </span>

        <TransferCard
          label="サーバに届いた内容"
          account="9999999"
          to="攻撃者の口座へ"
          fake
          atSec={segStart(SEG_P4, 3)}
        />

        <Conclusion atSec={segStart(SEG_P4, 3) + 1.4}>
          送った本人は、<span style={markerPinkStyle}>書き換えに気づけない</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 公衆Wi-Fiの危うさ（身近な例・息継ぎのページ）
// ---------------------------------------------------------------------------

const RiskCard: React.FC<{ icon: string; title: string; body: string; atSec: number }> = ({
  icon,
  title,
  body,
  atSec,
}) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        padding: `${8 * SCALE}px ${6 * SCALE}px`,
        borderRadius: 13 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          width: 30 * SCALE,
          height: 30 * SCALE,
          borderRadius: 11 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <b style={{ fontSize: 13 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{title}</b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {body}
      </span>
    </div>
  );
};

const PublicWifiScene: React.FC = () => {
  const illust = usePop(0.3);
  const ssid = useAppear(0.6, { dy: 0 });

  return (
    <SlideShell
      heading="身近な例：公衆Wi-Fi"
      icon={<Ms name="wifi" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
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
        <Img
          src={staticFile("images/ipa_sg/net-ap.png")}
          style={{ height: 54 * SCALE, objectFit: "contain", mixBlendMode: "multiply", ...illust }}
        />
        <span
          style={{
            padding: `${3 * SCALE}px ${10 * SCALE}px`,
            borderRadius: radius.full,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            fontFamily: fontMono,
            fontSize: 11 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
            ...ssid,
          }}
        >
          Free-WiFi-Station
        </span>

        <div style={{ display: "flex", alignItems: "stretch", gap: 7 * SCALE, width: "100%" }}>
          <RiskCard
            icon="visibility"
            title="暗号化されていない電波"
            body="近くにいる誰でも受信できる"
            atSec={segStart(SEG_P5, 1)}
          />
          <RiskCard
            icon="warning"
            title="偽のアクセスポイント"
            body="本物そっくりの名前で用意される"
            atSec={segStart(SEG_P5, 2)}
          />
        </div>

        <Conclusion atSec={segStart(SEG_P5, 3)}>
          つないだ時点で、<span style={markerStyle}>攻撃者の中を通っている</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: MITB攻撃 — 割り込む場所がブラウザの中なので、暗号化しても防げない
// ---------------------------------------------------------------------------

const MitbScene: React.FC = () => {
  const browser = useAppear(0.3, { dy: 12 });
  const inside = useAppear(0.8, { dy: 0 });
  const rewrite = useAppear(segStart(SEG_P6, 2), { dy: 0 });
  const tunnel = useAppear(segStart(SEG_P6, 2) + 1.4, { dy: 0 });

  return (
    <SlideShell
      heading="MITB攻撃（ブラウザの中で割り込む）"
      icon={<Ms name="language" size={videoType.slideHeadIcon} />}
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
          gap: 10 * SCALE,
        }}
      >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4 * SCALE,
        }}
      >
        {/* 左: 利用者のブラウザ。暗号化される「前」に中身が書き換えられる */}
        <div
          style={{
            flex: "none",
            width: 200 * SCALE,
            display: "flex",
            flexDirection: "column",
            gap: 4 * SCALE,
            padding: `${7 * SCALE}px ${9 * SCALE}px`,
            borderRadius: 13 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
            ...browser,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
            <span style={{ display: "flex", color: colors.textMuted, flex: "none" }}>
              <Ms name="language" size={12 * SCALE} />
            </span>
            <span style={{ fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
              利用者のブラウザ
            </span>
            <span
              style={{
                marginLeft: "auto",
                flex: "none",
                display: "flex",
                alignItems: "center",
                gap: 4 * SCALE,
                padding: `${2 * SCALE}px ${7 * SCALE}px`,
                borderRadius: 6 * SCALE,
                backgroundColor: colors.accentPinkSurface,
                color: colors.accentPinkText,
                fontSize: 10 * SCALE,
                fontWeight: 800,
                whiteSpace: "nowrap",
                ...inside,
              }}
            >
              <Ms name="bug_report" size={11 * SCALE} />
              マルウェア
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              padding: `${6 * SCALE}px ${9 * SCALE}px`,
              borderRadius: 10 * SCALE,
              backgroundColor: colors.bg,
              border: `${1 * SCALE}px solid ${colors.border}`,
            }}
          >
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
              1234567
            </span>
            <span style={{ display: "flex", color: colors.accentPink, ...rewrite }}>
              <Chevron dir="right" size={11 * SCALE} />
            </span>
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 13 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
                whiteSpace: "nowrap",
                ...rewrite,
              }}
            >
              9999999
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
                whiteSpace: "nowrap",
                ...rewrite,
              }}
            >
              送信前に書き換え
            </span>
          </div>
        </div>

        {/* 中央: ここから先は暗号化済み（＝すでに手遅れ） */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3 * SCALE,
            ...tunnel,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4 * SCALE,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              whiteSpace: "nowrap",
            }}
          >
            <Ms name="lock" size={12 * SCALE} />
            ここから暗号化
          </span>
          {/* 高さ16は矢じり（size 6 × strokeWidth 2.5 = 15）を収める余白。ArrowLink と同じ */}
          <svg viewBox="0 0 100 16" style={{ width: "100%", height: 9 * SCALE }}>
            <ArrowMarker id="mitb-line" color={colors.primary500} />
            <DrawPath
              d="M2 8 L86 8"
              delaySec={segStart(SEG_P6, 2) + 1.4}
              durSec={0.5}
              stroke={colors.primary500}
              strokeWidth={2.5}
              markerEnd="url(#mitb-line)"
            />
          </svg>
          <span style={{ fontSize: 10 * SCALE, fontWeight: 700, color: colors.textMuted, whiteSpace: "nowrap" }}>
            通信路は安全
          </span>
        </div>

        <PathNode icon="dns" label="サーバ" atSec={segStart(SEG_P6, 2) + 1.6} />
      </div>

        <Conclusion atSec={segStart(SEG_P6, 3)}>
          暗号化の<span style={markerPinkStyle}>手前</span>なので、暗号化しても防げない
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: DNSキャッシュポイズニング — URLは正しいのに、行き先だけが偽物になる
// ---------------------------------------------------------------------------

const DnsPoisonScene: React.FC = () => {
  const bar = useAppear(0.3, { dy: 10 });
  const cache = useAppear(0.6, { dy: 10 });
  const cacheLabel = useAppear(segStart(SEG_P8, 1), { dy: 0 });
  const swap = useAppear(segStart(SEG_P8, 2), { dy: 0 });
  const fakeServer = usePop(segStart(SEG_P8, 2) + 0.5);
  const urlOk = usePop(segStart(SEG_P8, 3));

  return (
    <SlideShell
      heading="DNSキャッシュポイズニング"
      icon={<Ms name="dns" size={videoType.slideHeadIcon} />}
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
          gap: 3 * SCALE,
        }}
      >
        {/* 利用者が打ち込んだURLは、最後まで正しいまま */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            width: "72%",
            padding: `${4 * SCALE}px ${11 * SCALE}px`,
            borderRadius: radius.full,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...bar,
          }}
        >
          <span style={{ display: "flex", color: colors.textMuted, flex: "none" }}>
            <Ms name="lock" size={11 * SCALE} />
          </span>
          <span style={{ fontFamily: fontMono, fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
            https://bank.example
          </span>
          <span
            style={{
              marginLeft: "auto",
              flex: "none",
              padding: `${2 * SCALE}px ${8 * SCALE}px`,
              borderRadius: 6 * SCALE,
              backgroundColor: colors.primary50,
              color: colors.primary600,
              fontSize: 10 * SCALE,
              fontWeight: 800,
              whiteSpace: "nowrap",
              ...urlOk,
            }}
          >
            入力は正しい
          </span>
        </div>

        <span style={{ display: "flex", color: colors.textMuted }}>
          <Chevron dir="down" size={10 * SCALE} />
        </span>

        {/* DNSサーバのキャッシュ。1行だけが偽のアドレスに差し替えられる */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9 * SCALE,
            width: "100%",
            padding: `${4 * SCALE}px ${10 * SCALE}px`,
            borderRadius: 13 * SCALE,
            backgroundColor: colors.bg,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...cache,
          }}
        >
          <Img
            src={staticFile("images/ipa_sg/net-dns.png")}
            style={{ height: 30 * SCALE, objectFit: "contain", mixBlendMode: "multiply", flex: "none" }}
          />
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 * SCALE }}>
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.textMuted,
                whiteSpace: "nowrap",
                ...cacheLabel,
              }}
            >
              DNSサーバのキャッシュ（引き直した結果の保存）
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5 * SCALE,
                padding: `${5 * SCALE}px ${9 * SCALE}px`,
                borderRadius: 9 * SCALE,
                backgroundColor: colors.surface,
                border: `${1.5 * SCALE}px solid ${colors.border}`,
              }}
            >
              <span style={{ fontFamily: fontMono, fontSize: 10.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
                bank.example
              </span>
              <span style={{ display: "flex", color: colors.textMuted, flex: "none" }}>
                <Chevron dir="right" size={9 * SCALE} />
              </span>
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 9.5 * SCALE,
                  fontWeight: 700,
                  color: colors.textMuted,
                  textDecoration: "line-through",
                  whiteSpace: "nowrap",
                }}
              >
                203.0.113.9
              </span>
              <span style={{ display: "flex", color: colors.accentPink, ...swap }}>
                <Chevron dir="right" size={10 * SCALE} />
              </span>
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 11.5 * SCALE,
                  fontWeight: 800,
                  color: colors.accentPinkText,
                  whiteSpace: "nowrap",
                  ...swap,
                }}
              >
                198.51.100.7
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 9.5 * SCALE,
                  fontWeight: 800,
                  color: colors.accentPinkText,
                  whiteSpace: "nowrap",
                  ...swap,
                }}
              >
                偽のアドレス
              </span>
            </div>
          </div>
        </div>

        <span style={{ display: "flex", color: colors.accentPink, ...swap }}>
          <Chevron dir="down" size={10 * SCALE} />
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            padding: `${4 * SCALE}px ${12 * SCALE}px`,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
            ...fakeServer,
          }}
        >
          <span style={{ display: "flex", color: colors.accentPinkText, flex: "none" }}>
            <Ms name="dns" size={14 * SCALE} />
          </span>
          <b style={{ fontSize: 12 * SCALE, fontWeight: 800, color: colors.accentPinkText, whiteSpace: "nowrap" }}>
            接続先は攻撃者の偽サーバ
          </b>
        </div>

        <Conclusion atSec={segStart(SEG_P8, 3) + 1.2}>
          URLは正しいまま。<span style={markerPinkStyle}>行き先だけが違う</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: リプレイ攻撃 — 中身が読めなくても、そのまま送り直せば通ってしまう
// ---------------------------------------------------------------------------

const ReplayStep: React.FC<{
  no: string;
  text: string;
  chip?: string;
  tone?: "normal" | "attack";
  last?: boolean;
  atSec: number;
}> = ({ no, text, chip, tone = "normal", last = false, atSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const attack = tone === "attack";
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 8 * SCALE, ...appear }}>
      {/* 左のタイムライン軸 */}
      <div style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "center", width: 18 * SCALE }}>
        <span
          style={{
            flex: "none",
            width: 18 * SCALE,
            height: 18 * SCALE,
            borderRadius: radius.full,
            backgroundColor: attack ? colors.accentPink : colors.primary500,
            color: colors.surface,
            fontSize: 10 * SCALE,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {no}
        </span>
        {last ? null : (
          <span style={{ flex: 1, width: 2 * SCALE, backgroundColor: colors.border, marginTop: 2 * SCALE }} />
        )}
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap: 8 * SCALE,
          marginBottom: last ? 0 : 5 * SCALE,
          padding: `${5 * SCALE}px ${10 * SCALE}px`,
          borderRadius: 10 * SCALE,
          backgroundColor: attack ? colors.accentPinkSurface : colors.surface,
          border: `${1.5 * SCALE}px solid ${attack ? colors.accentPink : colors.border}`,
        }}
      >
        <b
          style={{
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            color: attack ? colors.accentPinkText : colors.textPrimary,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </b>
        {chip ? (
          <span
            style={{
              marginLeft: "auto",
              flex: "none",
              display: "flex",
              alignItems: "center",
              gap: 4 * SCALE,
              padding: `${2 * SCALE}px ${7 * SCALE}px`,
              borderRadius: 6 * SCALE,
              backgroundColor: colors.primary50,
              color: colors.primary600,
              fontSize: 10 * SCALE,
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            <Ms name="lock" size={11 * SCALE} />
            {chip}
          </span>
        ) : null}
      </div>
    </div>
  );
};

const ReplayScene: React.FC = () => (
  <SlideShell
    heading="リプレイ攻撃"
    icon={<Ms name="cached" size={videoType.slideHeadIcon} />}
    narration={SEG_P9}
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ReplayStep no="1" text="本人がログインの通信を送る" chip="暗号化" atSec={0.4} />
        <ReplayStep
          no="2"
          text="攻撃者がその通信をそのまま盗み取る"
          chip="中身は読めない"
          tone="attack"
          atSec={segStart(SEG_P9, 1)}
        />
        <ReplayStep
          no="3"
          text="同じ通信を、あとからもう一度送る"
          tone="attack"
          atSec={segStart(SEG_P9, 2)}
        />
        <ReplayStep
          no="4"
          text="サーバは本人と同じ通信として受け入れる"
          tone="attack"
          last
          atSec={segStart(SEG_P9, 3)}
        />
      </div>
      <Conclusion atSec={segStart(SEG_P9, 3) + 1.3}>
        中身が読めなくても、<span style={markerPinkStyle}>なりすましは成立する</span>
      </Conclusion>
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

export const SgL11MitmTampering: VideoSpec = {
  id: "sg-L11-mitm-tampering",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "その通信、\nあいだに誰かいる",
      keywords: ["中間者攻撃", "改ざん", "リプレイ"],
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
      name: "mitm",
      durationSec: 8,
      narration: SEG_P3,
      component: MitmScene,
    },
    {
      pattern: "custom",
      name: "tap-and-tamper",
      durationSec: 7,
      narration: SEG_P4,
      component: TapTamperScene,
    },
    {
      pattern: "custom",
      name: "public-wifi",
      durationSec: 7,
      narration: SEG_P5,
      component: PublicWifiScene,
    },
    {
      pattern: "custom",
      name: "mitb",
      durationSec: 7,
      narration: SEG_P6,
      component: MitbScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "flow",
      heading: "【前提】名前解決のしくみ",
      icon: "dns",
      steps: [
        { abc: "1", name: "入力", sub: "名前を打ち込む" },
        { abc: "2", name: "名前解決", sub: "DNSが引き直す" },
        { abc: "3", name: "接続", sub: "IPアドレスへ" },
      ],
      // 各ステップはそれを説明するナレーション文の開始秒で点灯させる
      highlightAtSec: [segStart(SEG_P7, 1), segStart(SEG_P7, 2), segStart(SEG_P7, 3)],
      narration: SEG_P7,
    },
    {
      pattern: "custom",
      name: "dns-poisoning",
      durationSec: 8,
      narration: SEG_P8,
      component: DnsPoisonScene,
    },
    {
      pattern: "custom",
      name: "replay",
      durationSec: 7,
      narration: SEG_P9,
      component: ReplayScene,
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
      question: "MITBが暗号化で防げない理由は？",
      choices: [
        { key: "A", text: "通信路で鍵を盗まれるから" },
        { key: "B", text: "暗号化される前に書き換え", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "正しいURLなのに偽サイトへ",
      choices: [
        { key: "A", text: "DNSキャッシュポイズニング", correct: true },
        { key: "B", text: "リプレイ攻撃" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "中身が読めなくても成立するのは？",
      choices: [
        { key: "A", text: "盗聴して内容を解読する" },
        { key: "B", text: "盗んだ通信をそのまま再送", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "割り込まれると盗聴も改ざんもされる", checkAtSec: segStart(SEG_P14, 0) },
        { text: "MITBはブラウザの中。暗号化では防げない", checkAtSec: segStart(SEG_P14, 1) },
        { text: "DNSを汚されるとURLが正しくても偽サーバ", checkAtSec: segStart(SEG_P14, 2) },
      ],
      narration: SEG_P14,
      transitionIn: "wipe",
    },
  ],
};
