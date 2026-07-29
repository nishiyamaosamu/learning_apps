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
import durations from "./sg-L9-client-side-attacks.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L9: Webを狙う攻撃②：利用者を狙う
 *
 * 発注書 content_works/ipa_sg/orders/L9.md に対応（利用者を狙う攻撃だけを扱う。入力をだます
 * 攻撃は L8、対策＝エスケープ・トークンは L46、cookie/HTTP の詳細は L63、フィッシングは L10）。
 * シナリオは narration/ipa_sg/sg-L9-client-side-attacks.md。
 *
 * 標的の転換（対比カード）→ 前提のクッキー（往復図）→ XSSの成立（既製flow）→
 * セッションハイジャック（同じ券が2人から出る収束図）→ CSRF（罠ページのUIモック）→
 * XSS対CSRF（vs・wipe-light）→ クリックジャッキング（重なる層）→
 * ドライブバイ（左右分割で息継ぎ）→ クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ「XSS」「CSRF」を
 *   「エックスエスエス」「シーエスアールエフ」と仮名書きしている。字幕（下の N() 第2引数）は
 *   略語表記が正。音声と原稿が食い違って見えるが意図的（references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L9-client-side-attacks");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "前回は、サーバの入力欄を狙う攻撃を学びました。"),
  N("s02-2.mp3", "今回狙われるのは、サーバではなく、そのサイトを使っている利用者です。"),
  N("s02-3.mp3", "しかも攻撃の足場になるのは、利用者が信頼している正規のサイトです。"),
  N("s02-4.mp3", "見慣れたサイトが、そのまま加害の道具にされてしまいます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "まず前提を一つだけ確認します。"),
  N("s03-2.mp3", "ログインすると、サイトはブラウザに引換券のようなデータを渡します。"),
  N("s03-3.mp3", "これがクッキーで、ブラウザは次からの通信でこの券を自動で提示します。"),
  N("s03-4.mp3", "サーバは券を見て本人だと判断するので、券を持つ人が本人として扱われます。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "一つ目はクロスサイトスクリプティング、略してXSSです。"),
  N("s04-2.mp3", "攻撃者は、投稿欄などを使って正規のサイトにスクリプトを仕込みます。"),
  N("s04-3.mp3", "何も知らない利用者がそのページを開くと、スクリプトが一緒に送られてきます。"),
  N("s04-4.mp3", "そして利用者のブラウザで、そのサイトの一部として実行されてしまいます。"),
  N("s04-5.mp3", "攻撃者の書いた命令が、信頼されたサイトの顔をして動くのです。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "XSSの被害の代表が、セッションハイジャックです。"),
  N("s05-2.mp3", "スクリプトに、さきほどの引換券を攻撃者へ送らせるのです。"),
  N("s05-3.mp3", "券を手に入れた攻撃者は、ログインし直すことなく本人になりすませます。"),
  N("s05-4.mp3", "パスワードを一度も破らずに、本人として操作されてしまいます。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "二つ目はクロスサイトリクエストフォージェリ、CSRFです。"),
  N("s06-2.mp3", "攻撃者は罠のページを用意し、利用者にそれを開かせます。"),
  N("s06-3.mp3", "そのページには、別のサイトへ操作を送る仕掛けが埋め込まれています。"),
  N("s06-4.mp3", "ブラウザは引換券を自動で付けて送るため、本人の権限で操作が実行されます。"),
  N("s06-5.mp3", "退会や送金など、身に覚えのない操作をさせられてしまいます。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "XSSとCSRFは名前が似ていますが、動く場所が違います。"),
  N("s07-2.mp3", "XSSは、攻撃者のスクリプトが利用者のブラウザで動く攻撃です。"),
  N("s07-3.mp3", "CSRFでは新しいスクリプトは動かず、正規の操作が本人の権限で送られます。"),
  N("s07-4.mp3", "前者は情報を抜く、後者は操作をさせる、と覚えると区別できます。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "三つ目はクリックジャッキングです。"),
  N("s08-2.mp3", "罠のページの上に、本物のページを透明にして重ねます。"),
  N("s08-3.mp3", "利用者は見えているボタンを押したつもりで、透明な側のボタンを押しています。"),
  N("s08-4.mp3", "公開設定の変更など、意図しない操作をクリックだけでさせられます。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "最後はドライブバイダウンロードです。"),
  N("s09-2.mp3", "改ざんされたサイトを見ただけで、マルウェアを自動でダウンロードさせられます。"),
  N("s09-3.mp3", "ファイルを開いた覚えがなくても、閲覧しただけで感染してしまうのです。"),
  N("s09-4.mp3", "起点になるのは、多くの場合、改ざんされた正規のサイトです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "攻撃者のスクリプトが利用者のブラウザで動くのは、どちらでしょうか。"),
  N("s11-3.mp3", "正解は、XSSです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "引換券であるクッキーを盗まれると、何ができてしまうでしょうか。"),
  N("s12-3.mp3", "正解は、ログインし直さずに本人になりすますことです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "サイトを見ただけで感染してしまう攻撃は、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、ドライブバイダウンロードです。", { gapBeforeSec: 1.8 }),
];

const SEG_P14 = [
  N("s14-1.mp3", "狙われるのはサーバではなく、サイトを使う利用者です。"),
  N("s14-2.mp3", "XSSはブラウザでスクリプトを動かし、CSRFは本人の権限で操作をさせます。"),
  N("s14-3.mp3", "引換券であるクッキーが盗まれると、そのまま成りすまされます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// 共有の小部品
// ---------------------------------------------------------------------------

/** 左右どちらにも向けられる矢じり（アイコンフォントに依存しないので向きを自由にできる） */
const Chevron: React.FC<{ dir: "left" | "right"; size: number }> = ({ dir, size }) => (
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
    <path d={dir === "right" ? "M7 4.5l6 5.5-6 5.5" : "M13 4.5l-6 5.5 6 5.5"} />
  </svg>
);

// ---------------------------------------------------------------------------
// P2: 標的の転換 — 前回はサーバ、今回は利用者。足場は信頼された正規サイト
// ---------------------------------------------------------------------------

const TargetCard: React.FC<{
  tag: string;
  image: string;
  target: string;
  now: boolean;
  atSec: number;
}> = ({ tag, image, target, now, atSec }) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: now ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${now ? colors.primary500 : colors.border}`,
        borderRadius: 14 * SCALE,
        padding: `${8 * SCALE}px ${6 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: now ? colors.primary600 : colors.textMuted,
          whiteSpace: "nowrap",
        }}
      >
        {tag}
      </span>
      <Img
        src={staticFile(image)}
        style={{ height: 34 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
      />
      <b style={{ fontSize: 15 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
        標的＝{now ? <span style={markerStyle}>{target}</span> : target}
      </b>
    </div>
  );
};

const TargetShiftScene: React.FC = () => {
  const note = useAppear(segStart(SEG_P2, 2));
  return (
    <SlideShell
      heading="狙われるのは誰か"
      icon={<Ms name="flag" size={videoType.slideHeadIcon} />}
      narration={SEG_P2}
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
          gap: 10 * SCALE,
        }}
      >
        <div style={{ display: "flex", gap: 8 * SCALE, width: "100%" }}>
          <TargetCard
            tag="前回：入力をだます攻撃"
            image="images/ipa_sg/icon-server.png"
            target="サーバ"
            now={false}
            atSec={0.3}
          />
          <TargetCard
            tag="今回：利用者を狙う攻撃"
            image="images/ipa_sg/person-customer.png"
            target="利用者"
            now
            atSec={segStart(SEG_P2, 1)}
          />
        </div>
        <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, textAlign: "center", ...note }}>
          足場になるのは、利用者が信頼している<span style={markerPinkStyle}>正規のサイト</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 前提 — ログイン状態はクッキーという引換券で保たれている（1枚だけ。詳細は L63）
// ---------------------------------------------------------------------------

/** 両端のノード。ラベルは2行に分けて渡す（1行にするとノード幅を超えてページ余白まではみ出す） */
const EndNode: React.FC<{ image: string; lines: [string, string]; atSec: number }> = ({
  image,
  lines,
  atSec,
}) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: "none",
        width: 44 * SCALE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        ...appear,
      }}
    >
      <Img
        src={staticFile(image)}
        style={{ height: 26 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
      />
      <b style={{ fontSize: 10 * SCALE, fontWeight: 800, lineHeight: 1.25, textAlign: "center" }}>
        {lines[0]}
        <br />
        {lines[1]}
      </b>
    </div>
  );
};

const ExchangeLine: React.FC<{ label: string; dir: "left" | "right"; atSec: number }> = ({
  label,
  dir,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 0 });
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          color: colors.primary500,
          gap: 2 * SCALE,
        }}
      >
        {dir === "left" ? <Chevron dir="left" size={12 * SCALE} /> : null}
        <span
          style={{
            flex: 1,
            height: 1.5 * SCALE,
            backgroundColor: colors.primary300,
            borderRadius: radius.full,
          }}
        />
        {dir === "right" ? <Chevron dir="right" size={12 * SCALE} /> : null}
      </div>
    </div>
  );
};

const CookieScene: React.FC = () => {
  const ticket = usePop(segStart(SEG_P3, 1) + 0.5);
  const note = useAppear(segStart(SEG_P3, 3));

  return (
    <SlideShell
      heading="【前提】ログイン状態のしくみ"
      icon={<Ms name="badge" size={videoType.slideHeadIcon} />}
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
          gap: 8 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, width: "100%" }}>
          <EndNode image="images/ipa_sg/icon-browser.png" lines={["利用者の", "ブラウザ"]} atSec={0.3} />
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5 * SCALE,
            }}
          >
            <ExchangeLine label="① ログイン成功 → 引換券を渡す" dir="left" atSec={segStart(SEG_P3, 1)} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5 * SCALE,
                padding: `${4 * SCALE}px ${10 * SCALE}px`,
                borderRadius: 10 * SCALE,
                backgroundColor: colors.primary50,
                border: `${1.5 * SCALE}px solid ${colors.primary500}`,
                ...ticket,
              }}
            >
              <Img
                src={staticFile("images/ipa_sg/net-cookie.png")}
                style={{ height: 16 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
              />
              <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, color: colors.primary600 }}>
                クッキー
              </span>
              <span style={{ fontFamily: fontMono, fontSize: 11 * SCALE, fontWeight: 700 }}>
                SID=a1b2c3
              </span>
            </div>
            <ExchangeLine label="② 次からは毎回、券を自動で提示" dir="right" atSec={segStart(SEG_P3, 2)} />
          </div>
          <EndNode image="images/ipa_sg/icon-server.png" lines={["サイトの", "サーバ"]} atSec={0.5} />
        </div>
        <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, textAlign: "center", ...note }}>
          この券を持っている人が<span style={markerStyle}>本人</span>として扱われる
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: セッションハイジャック — 利用者と攻撃者が同じ券を出し、サーバは区別できない
// ---------------------------------------------------------------------------

const ActorRow: React.FC<{
  image: string;
  label: string;
  danger: boolean;
  atSec: number;
}> = ({ image, label, danger, atSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${5 * SCALE}px ${9 * SCALE}px`,
        borderRadius: 11 * SCALE,
        backgroundColor: danger ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${danger ? colors.primary500 : colors.border}`,
        ...appear,
      }}
    >
      <Img
        src={staticFile(image)}
        style={{ height: 24 * SCALE, objectFit: "contain", mixBlendMode: "multiply", flex: "none" }}
      />
      <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
      <span
        style={{
          marginLeft: "auto",
          flex: "none",
          fontFamily: fontMono,
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          color: danger ? colors.primary600 : colors.textSecondary,
          padding: `${3 * SCALE}px ${7 * SCALE}px`,
          borderRadius: 7 * SCALE,
          backgroundColor: colors.surface,
          border: `${1 * SCALE}px solid ${colors.border}`,
          whiteSpace: "nowrap",
        }}
      >
        SID=a1b2c3
      </span>
    </div>
  );
};

const HijackScene: React.FC = () => {
  const verdict = usePop(segStart(SEG_P5, 2) + 0.4);
  const note = useAppear(segStart(SEG_P5, 3));

  return (
    <SlideShell
      heading="セッションハイジャック"
      icon={<Ms name="key" size={videoType.slideHeadIcon} />}
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
        <div style={{ display: "flex", alignItems: "center", gap: 3 * SCALE }}>
          <div style={{ flex: 1.35, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 * SCALE }}>
            <ActorRow
              image="images/ipa_sg/person-customer.png"
              label="本物の利用者"
              danger={false}
              atSec={0.3}
            />
            <ActorRow
              image="images/ipa_sg/person-attacker.png"
              label="券を盗んだ攻撃者"
              danger
              atSec={segStart(SEG_P5, 1)}
            />
          </div>
          {/* 2本の経路が1つのサーバへ収束する（サーバから見ると区別がつかない） */}
          <div style={{ flex: "none", width: 22 * SCALE, height: 46 * SCALE }}>
            <svg viewBox="0 0 60 120" style={{ width: "100%", height: "100%" }}>
              <ArrowMarker id="hj-arrow" color={colors.primary500} />
              <DrawPath
                d="M2 30 C 32 30, 26 60, 54 60"
                delaySec={segStart(SEG_P5, 2)}
                durSec={0.7}
                stroke={colors.primary300}
                strokeWidth={3}
                markerEnd="url(#hj-arrow)"
              />
              <DrawPath
                d="M2 90 C 32 90, 26 60, 54 60"
                delaySec={segStart(SEG_P5, 2) + 0.2}
                durSec={0.7}
                stroke={colors.primary500}
                strokeWidth={3}
                markerEnd="url(#hj-arrow)"
              />
            </svg>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              padding: `${7 * SCALE}px ${6 * SCALE}px`,
              borderRadius: 12 * SCALE,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              ...verdict,
            }}
          >
            <Img
              src={staticFile("images/ipa_sg/icon-server.png")}
              style={{ height: 22 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
            />
            <b style={{ fontSize: 13 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
              どちらも<span style={markerPinkStyle}>本人</span>と判定
            </b>
            <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700, color: colors.textMuted, whiteSpace: "nowrap" }}>
              券が正しいかしか見ていない
            </span>
          </div>
        </div>
        {/* 字幕（s05-4）と同じ文を画面にも書かないよう、要点だけを短く置く */}
        <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, textAlign: "center", ...note }}>
          パスワードは<span style={markerStyle}>一度も破られていない</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: CSRF — 罠ページを開かせ、ログイン済みの本人の権限で操作を実行させる
// ---------------------------------------------------------------------------

const BrowserCard: React.FC<{
  url: string;
  danger: boolean;
  atSec: number;
  children: React.ReactNode;
}> = ({ url, danger, atSec, children }) => {
  const appear = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        borderRadius: 12 * SCALE,
        overflow: "hidden",
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${danger ? colors.primary500 : colors.border}`,
        display: "flex",
        flexDirection: "column",
        ...appear,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5 * SCALE,
          padding: `${4 * SCALE}px ${8 * SCALE}px`,
          backgroundColor: danger ? colors.primary50 : colors.bg,
          borderBottom: `${1 * SCALE}px solid ${colors.border}`,
        }}
      >
        <span style={{ display: "flex", color: colors.textMuted, flex: "none" }}>
          <Ms name={danger ? "warning" : "lock"} size={11 * SCALE} />
        </span>
        <span
          style={{
            fontFamily: fontMono,
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
          }}
        >
          {url}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4 * SCALE,
          padding: `${7 * SCALE}px ${9 * SCALE}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const CsrfScene: React.FC = () => {
  const fullName = useAppear(0.3);
  const arrow = useAppear(segStart(SEG_P6, 2), { dy: 0 });
  const ops = useAppear(segStart(SEG_P6, 4), { dy: 8 });
  const note = useAppear(segStart(SEG_P6, 3));

  return (
    <SlideShell
      heading="CSRF：本人の権限で操作させる"
      icon={<Ms name="swap_horiz" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7 * SCALE,
        }}
      >
        <span
          style={{
            fontSize: 10.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            ...fullName,
          }}
        >
          クロスサイトリクエストフォージェリ
        </span>
        {/* 高さは中身に合わせる（固定値にすると url バー＋本文が入りきらず、
            overflow:hidden のカードで文字が途中から切れる） */}
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 5 * SCALE }}>
          <BrowserCard url="trap.example" danger atSec={segStart(SEG_P6, 1)}>
            <b style={{ fontSize: 12 * SCALE, fontWeight: 800 }}>かわいい猫の写真</b>
            <span
              style={{
                alignSelf: "flex-start",
                padding: `${3 * SCALE}px ${9 * SCALE}px`,
                borderRadius: 8 * SCALE,
                backgroundColor: colors.primary600,
                color: colors.textPrimaryDark,
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
              }}
            >
              見る
            </span>
            <span style={{ fontSize: 9 * SCALE, fontWeight: 700, color: colors.textMuted }}>
              裏に別サイトへの操作が仕込まれている
            </span>
          </BrowserCard>
          <span
            style={{
              flex: "none",
              alignSelf: "center",
              color: colors.primary500,
              display: "flex",
              ...arrow,
            }}
          >
            <Chevron dir="right" size={16 * SCALE} />
          </span>
          <BrowserCard url="bank.example（ログイン済み）" danger={false} atSec={segStart(SEG_P6, 2) + 0.4}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 * SCALE, ...ops }}>
              {["送金する", "退会する"].map((op) => (
                <span
                  key={op}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4 * SCALE,
                    fontSize: 11 * SCALE,
                    fontWeight: 800,
                  }}
                >
                  <span style={{ display: "flex", color: colors.primary600, flex: "none" }}>
                    <Ms name="check_circle" size={11 * SCALE} />
                  </span>
                  {op}
                  <span style={{ color: colors.textMuted, fontSize: 9.5 * SCALE }}>を本人として実行</span>
                </span>
              ))}
            </div>
          </BrowserCard>
        </div>
        <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, textAlign: "center", ...note }}>
          ブラウザが<span style={markerStyle}>引換券を自動で付ける</span>ので、本人の操作として通る
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: クリックジャッキング — 見えている罠の上に、本物のページを透明にして重ねる
// ---------------------------------------------------------------------------

const ClickjackScene: React.FC = () => {
  const decoy = useAppear(segStart(SEG_P8, 1), { dy: 14 });
  const overlay = useAppear(segStart(SEG_P8, 1) + 0.6, { dy: -14 });
  const cursor = usePop(segStart(SEG_P8, 2));
  const note = useAppear(segStart(SEG_P8, 3));

  const layerStyle = {
    position: "absolute" as const,
    width: "74%",
    height: 26 * SCALE,
    borderRadius: 12 * SCALE,
    display: "flex",
    alignItems: "center",
    gap: 8 * SCALE,
    padding: `0 ${10 * SCALE}px`,
  };

  return (
    <SlideShell
      heading="クリックジャッキング"
      icon={<Ms name="visibility_off" size={videoType.slideHeadIcon} />}
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
          gap: 10 * SCALE,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: 56 * SCALE }}>
          {/* 下＝利用者に見えている罠のページ */}
          <div
            style={{
              ...layerStyle,
              left: "16%",
              top: 28 * SCALE,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              ...decoy,
            }}
          >
            <span style={{ fontSize: 10 * SCALE, fontWeight: 800, color: colors.textMuted, whiteSpace: "nowrap" }}>
              下：見えている罠のページ
            </span>
            <span
              style={{
                marginLeft: "auto",
                padding: `${3 * SCALE}px ${9 * SCALE}px`,
                borderRadius: 8 * SCALE,
                backgroundColor: colors.primary600,
                color: colors.textPrimaryDark,
                fontSize: 11 * SCALE,
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              無料でプレゼント
            </span>
          </div>
          {/* 上＝透明にして重ねられた本物のページ。実際に押されるのはこちら */}
          <div
            style={{
              ...layerStyle,
              left: "4%",
              top: 0,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px dashed ${colors.primary500}`,
              ...overlay,
              // 「透明に重ねられている」ことを見た目でも出す（出現アニメの opacity に掛け合わせる）
              opacity: overlay.opacity * 0.75,
            }}
          >
            <span style={{ fontSize: 10 * SCALE, fontWeight: 800, color: colors.primary600, whiteSpace: "nowrap" }}>
              上：透明に重ねた本物のページ
            </span>
            <span
              style={{
                marginLeft: "auto",
                padding: `${3 * SCALE}px ${9 * SCALE}px`,
                borderRadius: 8 * SCALE,
                border: `${1.5 * SCALE}px dashed ${colors.primary600}`,
                color: colors.primary600,
                fontSize: 11 * SCALE,
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              公開する
            </span>
          </div>
          {/* クリックはいちばん上の層（透明な本物）に届く。
              上の層の右端（4% + 74% = 78%）の外側に置く — 中央に置くと下の層のボタンと重なる */}
          <div
            style={{
              position: "absolute",
              left: "79.5%",
              top: 6 * SCALE,
              display: "flex",
              alignItems: "center",
              gap: 3 * SCALE,
              color: colors.accentPinkText,
              ...cursor,
            }}
          >
            <Chevron dir="left" size={13 * SCALE} />
            <b style={{ fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>クリック</b>
          </div>
        </div>
        <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, textAlign: "center", ...note }}>
          押したつもりは下、実際に押されるのは<span style={markerPinkStyle}>上の見えないボタン</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: ドライブバイダウンロード — 見ただけで感染。息継ぎのページなので大きく1点だけ
// ---------------------------------------------------------------------------

const DriveByScene: React.FC = () => {
  const chip = usePop(0.3);
  const lead = useAppear(segStart(SEG_P9, 1));
  const sub = useAppear(segStart(SEG_P9, 2));
  const illust = useAppear(0.6);

  return (
    <SlideShell narration={SEG_P9}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
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
              ...chip,
            }}
          >
            ドライブバイダウンロード
          </span>
          <span style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.4, ...lead }}>
            <span style={markerPinkStyle}>見ただけ</span>で
            <br />
            感染する
          </span>
          {/* 最後の字幕（s09-4「起点は改ざんされた正規のサイト」）と重ならない別の要点を置く */}
          <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...sub }}>
            クリックもダウンロード操作も不要
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/malware-virus.png")}
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
// クイズ幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL9ClientSideAttacks: VideoSpec = {
  id: "sg-L9-client-side-attacks",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "信頼したサイトが\n加害の道具になる",
      keywords: ["XSS", "CSRF", "クッキー"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "target-shift",
      durationSec: 6,
      narration: SEG_P2,
      component: TargetShiftScene,
    },
    {
      pattern: "custom",
      name: "cookie-ticket",
      durationSec: 7,
      narration: SEG_P3,
      component: CookieScene,
    },
    {
      pattern: "flow",
      heading: "XSS（クロスサイトスクリプティング）",
      icon: "code",
      steps: [
        { abc: "1", name: "仕込む", sub: "投稿欄などにスクリプト" },
        { abc: "2", name: "閲覧", sub: "利用者が正規ページを開く" },
        { abc: "3", name: "実行", sub: "利用者のブラウザで動く" },
      ],
      // 各ステップはそれを説明するナレーション文の開始秒で点灯させる
      highlightAtSec: [segStart(SEG_P4, 1), segStart(SEG_P4, 2), segStart(SEG_P4, 3)],
      narration: SEG_P4,
    },
    {
      pattern: "custom",
      name: "session-hijack",
      durationSec: 7,
      narration: SEG_P5,
      component: HijackScene,
    },
    {
      pattern: "custom",
      name: "csrf",
      durationSec: 8,
      narration: SEG_P6,
      component: CsrfScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "vs",
      heading: "XSSとCSRFの違い",
      icon: "compare_arrows",
      left: {
        title: "XSS",
        icon: "code",
        rows: [
          { k: "動くもの", v: "攻撃者のスクリプト" },
          { k: "動く場所", v: "利用者のブラウザ" },
          { k: "ねらい", v: "情報を抜き取る" },
        ],
      },
      right: {
        title: "CSRF",
        icon: "swap_horiz",
        rows: [
          { k: "動くもの", v: "正規の操作リクエスト" },
          { k: "動く場所", v: "標的サイトのサーバ" },
          { k: "ねらい", v: "操作をさせる" },
        ],
      },
      columnAtSec: [segStart(SEG_P7, 1), segStart(SEG_P7, 2)],
      narration: SEG_P7,
    },
    {
      pattern: "custom",
      name: "clickjacking",
      durationSec: 7,
      narration: SEG_P8,
      component: ClickjackScene,
    },
    {
      pattern: "custom",
      name: "drive-by-download",
      durationSec: 6,
      narration: SEG_P9,
      component: DriveByScene,
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
      question: "ブラウザでスクリプトが動くのは？",
      choices: [
        { key: "A", text: "CSRF" },
        { key: "B", text: "XSS", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "クッキーを盗まれると？",
      choices: [
        { key: "A", text: "本人になりすまされる", correct: true },
        { key: "B", text: "パスワードが初期化される" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "見ただけで感染する攻撃は？",
      choices: [
        { key: "A", text: "クリックジャッキング" },
        { key: "B", text: "ドライブバイダウンロード", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "狙われるのは、サイトを使う利用者", checkAtSec: segStart(SEG_P14, 0) },
        { text: "XSSはブラウザで実行、CSRFは本人の権限で操作", checkAtSec: segStart(SEG_P14, 1) },
        { text: "クッキーを盗まれると、そのまま成りすまされる", checkAtSec: segStart(SEG_P14, 2) },
      ],
      narration: SEG_P14,
      transitionIn: "wipe",
    },
  ],
};
