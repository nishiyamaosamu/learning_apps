import React from "react";
import { Img, interpolateColors, staticFile } from "remotion";
import { colors, fontMono, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { DrawPath, ArrowMarker } from "../../parts/draw";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L18-password-authentication.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L18: パスワードによる認証
 *
 * 発注書 content_works/ipa_sg/orders/L18.md に対応（**対策側だけ**を扱う）。
 * シナリオは narration/ipa_sg/sg-L18-password-authentication.md。
 *
 * L7（パスワードを狙う攻撃）と対の回。攻撃の仕組みは L7 の担当なので再説明せず、
 * 攻撃名を出して参照するだけにしてある（呼称は narration/ipa_sg/sg-L7-password-attacks.md に揃えた）。
 * ハッシュ関数・ハッシュ値の呼称は L16（narration/ipa_sg/sg-L16-hash-key-management.md）に揃えた。
 *
 * 「作る（強度・使い回し）→ 送る（チャレンジレスポンス・ワンタイム）→ 預ける（ハッシュ保管・
 * 再設定経路）」の3場面で構成。視覚文法は モック → 左右カード → vs表 → 往復図 → 見出し+絵 →
 * テーブル → リスト点灯 の順に散らしてある。
 *
 * 音声と字幕の食い違い（意図的）: jobs.json 側だけ「ID→アイディー」「SNS→エスエヌエス」と
 * 仮名書きにしている（TTS に綴りどおり読ませないため。L6・L10 と同じ処理）。字幕は原表記のまま。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L18-password-authentication");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "前回は、パスワードを狙う攻撃を学びました。"),
  N("s02-2.mp3", "今回は、その攻撃から身を守る側にまわります。"),
  N("s02-3.mp3", "ログイン画面には、利用者IDとパスワードを入れます。"),
  N("s02-4.mp3", "利用者IDは、自分が誰なのかを名乗るためのものです。"),
  N("s02-5.mp3", "パスワードは、その人が本人であることを確かめるためのものです。"),
  N("s02-6.mp3", "この二つがそろって、はじめて本人だと認められます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "まずは、パスワードの作り方です。"),
  N("s03-2.mp3", "総当たり攻撃に効くのは、複雑さよりも長さです。"),
  N("s03-3.mp3", "記号を混ぜた八文字よりも、意味のない言葉をつないだ二十文字のほうが強くなります。"),
  N("s03-4.mp3", "一文字増えるたびに、試すべき組み合わせは何十倍にもふくらみます。"),
  N("s03-5.mp3", "覚えやすくて長い、自分だけのフレーズを作るのがこつです。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "次は、使い回しをやめることです。"),
  N("s04-2.mp3", "パスワードリスト攻撃は、どこかで漏れた組み合わせをそのまま試します。"),
  N("s04-3.mp3", "どれだけ長くて強いパスワードでも、使い回した瞬間に破られます。"),
  N("s04-4.mp3", "サービスごとに違うパスワードにすることが、唯一の対策です。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "ここからは、パスワードを送るときの守り方です。"),
  N("s05-2.mp3", "パスワードをそのままネットワークに流すと、盗聴されたときに読まれてしまいます。"),
  N("s05-3.mp3", "そこで使われるのが、チャレンジレスポンス認証です。"),
  N("s05-4.mp3", "サーバーは、毎回ちがうお題を利用者に送ります。"),
  N("s05-5.mp3", "利用者側は、そのお題とパスワードからハッシュ値を計算して返します。"),
  N("s05-6.mp3", "サーバーも同じ計算をして答え合わせをするので、パスワードそのものは流れません。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "送るときのもう一つの工夫が、ワンタイムパスワードです。"),
  N("s06-2.mp3", "一度使ったら無効になる、使い捨てのパスワードです。"),
  N("s06-3.mp3", "通信の途中で盗み見られても、次のログインには使えません。"),
  N("s06-4.mp3", "この使い捨ての番号を作り出す道具を、セキュリティトークンと呼びます。"),
  N("s06-5.mp3", "専用の小さな機器のほか、スマートフォンのアプリも使われます。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "では、預けたパスワードは、サービス側でどう守られているのでしょうか。"),
  N("s07-2.mp3", "きちんとしたサービスは、パスワードそのものを保存していません。"),
  N("s07-3.mp3", "ハッシュ関数で計算したハッシュ値だけを保存し、ログインのたびに照合します。"),
  N("s07-4.mp3", "だから、忘れたときに元のパスワードを教えてもらうことはできません。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "そこで用意されているのが、パスワードリマインダです。"),
  N("s08-2.mp3", "秘密の質問に答えると、パスワードを再設定できるしくみです。"),
  N("s08-3.mp3", "ところが、母親の旧姓や出身校といった答えは、SNSから調べられてしまいます。"),
  N("s08-4.mp3", "どんなに強いパスワードでも、再設定の経路が甘ければそこから破られます。"),
  N("s08-5.mp3", "秘密の質問の答えも、他人に推測できない別のパスワードだと考えて決めます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s10-1.mp3", "ここで問題です。"),
  N("s10-2.mp3", "パスワードを使い回していると、とくに危ないのはどちらの攻撃でしょうか。"),
  N("s10-3.mp3", "正解は、パスワードリスト攻撃です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s11-1.mp3", "次の問題です。"),
  N("s11-2.mp3", "パスワードそのものをネットワークに流さない方式は、どちらでしょうか。"),
  N("s11-3.mp3", "正解は、チャレンジレスポンス認証です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s12-1.mp3", "最後の問題です。"),
  N("s12-2.mp3", "総当たり攻撃に対して、より効くのはどちらでしょうか。"),
  N("s12-3.mp3", "正解は、文字数を長くすることです。", { gapBeforeSec: 1.8 }),
];

const SEG_P13 = [
  N("s13-1.mp3", "利用者IDで名乗り、パスワードで本人だと確かめます。"),
  N("s13-2.mp3", "パスワードの強さは長さで決まり、使い回しは避けます。"),
  N("s13-3.mp3", "流さないチャレンジレスポンス認証や、使い捨てのワンタイムパスワードで守ります。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P2: 認証のしくみ — ログイン画面のモック + 2欄それぞれの役割
// 欄は最初からレイアウトに置き、語りに合わせて点灯だけを切り替える（高さが動かない）
// ---------------------------------------------------------------------------

const LoginField: React.FC<{ label: string; value: string; mono: boolean; litAtSec: number }> = ({
  label,
  value,
  mono,
  litAtSec,
}) => {
  const lit = useProgress(litAtSec, 0.4);
  const bg = interpolateColors(lit, [0, 1], [colors.bg, colors.primary50]);
  const border = interpolateColors(lit, [0, 1], [colors.border, colors.primary500]);
  const labelColor = interpolateColors(lit, [0, 1], [colors.textMuted, colors.primary600]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2 * SCALE,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${border}`,
        borderRadius: 8 * SCALE,
        padding: `${4 * SCALE}px ${10 * SCALE}px`,
      }}
    >
      <span style={{ fontSize: 8 * SCALE, fontWeight: 800, lineHeight: 1.2, color: labelColor }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: mono ? fontMono : undefined,
          fontSize: 11 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: mono ? undefined : 2 * SCALE,
        }}
      >
        {value}
      </span>
    </div>
  );
};

const RoleNote: React.FC<{ chip: string; text: React.ReactNode; atSec: number }> = ({
  chip,
  text,
  atSec,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE, ...useAppear(atSec, { dy: 10 }) }}>
    <span
      style={{
        flex: "none",
        fontSize: 9.5 * SCALE,
        fontWeight: 800,
        color: colors.primary800,
        backgroundColor: colors.primary100,
        borderRadius: 999,
        padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      }}
    >
      {chip}
    </span>
    <span style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.35 }}>{text}</span>
  </div>
);

const LoginFormScene: React.FC = () => {
  const card = useAppear(0.3);
  const conclusion = useAppear(segStart(SEG_P2, 4));

  return (
    <SlideShell
      heading="ログインで確かめていること"
      icon={<Ms name="password" size={videoType.slideHeadIcon} />}
      narration={SEG_P2}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          gap: "6%",
        }}
      >
        {/* ログイン画面のモック */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 13 * SCALE,
            padding: `${8 * SCALE}px ${13 * SCALE}px`,
            display: "flex",
            flexDirection: "column",
            gap: 4 * SCALE,
            ...card,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 10 * SCALE,
              lineHeight: 1.2,
              fontWeight: 800,
              color: colors.textSecondary,
            }}
          >
            <Ms name="lock" size={12 * SCALE} />
            ログイン
          </span>
          <LoginField label="利用者ID" value="tanaka" mono litAtSec={segStart(SEG_P2, 3)} />
          <LoginField label="パスワード" value="●●●●●●●●" mono={false} litAtSec={segStart(SEG_P2, 4)} />
          <span
            style={{
              marginTop: 1 * SCALE,
              textAlign: "center",
              fontSize: 10.5 * SCALE,
              lineHeight: 1.2,
              fontWeight: 800,
              color: colors.surface,
              backgroundColor: colors.primary600,
              borderRadius: 7 * SCALE,
              padding: `${4 * SCALE}px 0`,
            }}
          >
            ログインする
          </span>
        </div>

        {/* それぞれの役割 */}
        <div
          style={{
            flex: 1.05,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10 * SCALE,
          }}
        >
          <RoleNote
            chip="識別"
            text={
              <>
                「<span style={markerStyle}>誰か</span>」を名乗る
              </>
            }
            atSec={segStart(SEG_P2, 3)}
          />
          <RoleNote
            chip="認証"
            text={
              <>
                「<span style={markerStyle}>本人か</span>」を確かめる
              </>
            }
            atSec={segStart(SEG_P2, 4)}
          />
          {/* 字幕（s02-6）と同じ文を画面に書かない。ここは「二つの合算」という関係だけを短く示す */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7 * SCALE,
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              ...conclusion,
            }}
          >
            <Ms name="check_circle" size={15 * SCALE} />
            二つそろって本人と認める
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: パスワード強度 — 8文字 / 20文字 の左右比較カード
// L7 P4（DigitCard）と同じ「2枚のカードで桁数の効きを見せる」形をあえて踏襲している。
// 攻撃側と対策側で同じ概念に同じ絵を当て、記憶をつなぐため
// ---------------------------------------------------------------------------

const LengthCard: React.FC<{
  chip: string;
  sample: string;
  length: number;
  verdict: string;
  verdictIcon: string;
  emphasize: boolean;
  atSec: number;
  verdictAtSec: number;
}> = ({ chip, sample, length, verdict, verdictIcon, emphasize, atSec, verdictAtSec }) => {
  const card = useAppear(atSec, { dy: 14 });
  const ver = useAppear(verdictAtSec, { dy: 8 });

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: emphasize ? colors.primary50 : colors.surface,
        border: `${2 * SCALE}px solid ${emphasize ? colors.primary500 : colors.border}`,
        borderRadius: 14 * SCALE,
        padding: `${8 * SCALE}px ${9 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        ...card,
      }}
    >
      <span
        style={{ fontSize: 11 * SCALE, fontWeight: 800, lineHeight: 1.2, color: colors.textSecondary }}
      >
        {chip}
      </span>
      {/* 20文字が折り返すとカードの高さが左右で揃わないので nowrap（折り返しは静止画で発覚した） */}
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 11 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {sample}
      </span>
      {/* 文字数そのものを●の数で見せる（読む前に「長さの違い」が目に入る） */}
      <span style={{ display: "flex", gap: 1.5 * SCALE, flexWrap: "nowrap" }}>
        {Array.from({ length }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 4 * SCALE,
              height: 4 * SCALE,
              borderRadius: 999,
              flex: "none",
              backgroundColor: emphasize ? colors.primary600 : colors.primary300,
            }}
          />
        ))}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          fontSize: 15 * SCALE,
          lineHeight: 1.2,
          fontWeight: 800,
          color: emphasize ? colors.primary600 : colors.textMuted,
          ...ver,
        }}
      >
        <Ms name={verdictIcon} size={17 * SCALE} />
        {verdict}
      </span>
    </div>
  );
};

const StrengthScene: React.FC = () => {
  const arrow = usePop(segStart(SEG_P3, 2) + 1.0);
  const note = useAppear(segStart(SEG_P3, 3));
  const tip = useAppear(segStart(SEG_P3, 4));

  return (
    <SlideShell
      heading="パスワード強度は長さで決まる"
      icon={<Ms name="numbers" size={videoType.slideHeadIcon} />}
      narration={SEG_P3}
    >
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
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 5 * SCALE,
            width: "94%",
          }}
        >
          <LengthCard
            chip="記号を混ぜた 8文字"
            sample="P@s5w0rd"
            length={8}
            verdict="弱い"
            verdictIcon="lock_open"
            emphasize={false}
            atSec={0.3}
            verdictAtSec={segStart(SEG_P3, 2)}
          />
          <span
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1 * SCALE,
              color: colors.primary600,
              ...arrow,
            }}
          >
            <span style={{ fontSize: 10 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>+12文字</span>
            <span style={{ fontSize: 18 * SCALE, fontWeight: 800, lineHeight: 1 }}>→</span>
          </span>
          <LengthCard
            chip="言葉をつないだ 20文字"
            sample="hoshi-kaeru-yoru-ame"
            length={20}
            verdict="強い"
            verdictIcon="lock"
            emphasize
            atSec={0.6}
            verdictAtSec={segStart(SEG_P3, 2) + 1.0}
          />
        </div>

        <span style={{ fontSize: 13 * SCALE, fontWeight: 700, lineHeight: 1.3, ...note }}>
          1文字増えるごとに、候補は<span style={markerStyle}>何十倍</span>にふくらむ
        </span>
        {/* 字幕（s03-5）の言い換えではなく、作り方の「手口」だけを短く添える */}
        <span
          style={{
            fontSize: 11.5 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            ...tip,
          }}
        >
          意味のない言葉をつないで長くする
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: チャレンジレスポンス認証 — サーバー↔利用者の往復2本
// 「お題が届く → 手元で計算する → 答えを返す」の順に語りへ同期させる
// ---------------------------------------------------------------------------

const PartyNode: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => (
  <div
    style={{
      flex: "none",
      width: 34 * SCALE,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3 * SCALE,
      ...usePop(atSec),
    }}
  >
    <span
      style={{
        width: 30 * SCALE,
        height: 30 * SCALE,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={18 * SCALE} />
    </span>
    <b style={{ fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
  </div>
);

const ChallengeResponseScene: React.FC = () => {
  // 矢印が動き出すのは s05-4（13.8秒）なので、それまで絵が止まらないよう
  // リード文を2つに割って s05-2 / s05-3 に同期させる（行を増やさずインラインで出す）
  const lead = useAppear(segStart(SEG_P5, 1));
  const lead2 = useAppear(segStart(SEG_P5, 2), { dy: 0 });
  const chLabel = useAppear(segStart(SEG_P5, 3));
  const calc = useAppear(segStart(SEG_P5, 4), { dy: 12 });
  const resLabel = useAppear(segStart(SEG_P5, 4) + 1.0);
  const banner = useAppear(segStart(SEG_P5, 5));

  return (
    <SlideShell
      heading="チャレンジレスポンス認証"
      icon={<Ms name="compare_arrows" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
    >
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
        {/* 字幕（s05-2・s05-3）の全文は書かず、問題と狙いを短く2段で置く */}
        <span
          style={{
            fontSize: 12 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            textAlign: "center",
            ...lead,
          }}
        >
          そのまま流せば読まれる。
          <span style={{ color: colors.textPrimary, ...lead2 }}>
            だから<span style={markerStyle}>送らずに</span>確かめる
          </span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 4 * SCALE }}>
          <PartyNode icon="storage" label="サーバー" atSec={0.3} />
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 * SCALE }}>
            <span
              style={{
                fontSize: 10.5 * SCALE,
                lineHeight: 1.2,
                fontWeight: 800,
                color: colors.primary600,
                textAlign: "center",
                ...chLabel,
              }}
            >
              ① 毎回ちがうお題（チャレンジ）
            </span>
            {/*
              viewBox の縦横比は「実際の描画領域の縦横比より横長」にしておく。
              preserveAspectRatio の既定（meet）は短い方に合わせて縮めるので、
              比が足りないと線が真ん中に短いスタブとして描かれる（静止画で発覚した）。
              領域幅は最大 1390px 前後なので、比 1000:60 なら height 22×SCALE=88px で
              必ず「幅に合わせて」フィットする。
              高さ60のうち矢じりは size6 × strokeWidth7 = 42単位 → y=30 なら 9〜51 で収まる。
            */}
            <svg viewBox="0 0 1000 60" style={{ width: "100%", height: 22 * SCALE }}>
              <ArrowMarker id="l18-challenge" color={colors.primary500} />
              <DrawPath
                d="M10 30 L935 30"
                delaySec={segStart(SEG_P5, 3)}
                durSec={0.6}
                stroke={colors.primary500}
                strokeWidth={7}
                markerEnd="url(#l18-challenge)"
              />
            </svg>
            <svg viewBox="0 0 1000 60" style={{ width: "100%", height: 22 * SCALE }}>
              <ArrowMarker id="l18-response" color={colors.primary500} />
              <DrawPath
                d="M990 30 L65 30"
                delaySec={segStart(SEG_P5, 4) + 1.0}
                durSec={0.6}
                stroke={colors.primary500}
                strokeWidth={7}
                markerEnd="url(#l18-response)"
              />
            </svg>
            <span
              style={{
                fontSize: 10.5 * SCALE,
                lineHeight: 1.2,
                fontWeight: 800,
                color: colors.primary600,
                textAlign: "center",
                ...resLabel,
              }}
            >
              ② 計算した答え（レスポンス）
            </span>
          </div>
          <PartyNode icon="person" label="利用者" atSec={0.5} />
        </div>

        {/* 矢印が届いてから、手元でやっている計算を出す */}
        <div
          style={{
            alignSelf: "flex-end",
            width: "62%",
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 10 * SCALE,
            padding: `${7 * SCALE}px ${11 * SCALE}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6 * SCALE,
            fontSize: 11.5 * SCALE,
            lineHeight: 1.2,
            fontWeight: 800,
            ...calc,
          }}
        >
          <span>お題</span>
          <span style={{ color: colors.primary600 }}>＋</span>
          <span>パスワード</span>
          <span style={{ color: colors.primary600 }}>→</span>
          <span style={markerStyle}>ハッシュ値</span>
        </div>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6 * SCALE,
            fontSize: 14 * SCALE,
            lineHeight: 1.3,
            fontWeight: 800,
            ...banner,
          }}
        >
          <Ms name="verified_user" size={16 * SCALE} />
          {/* 字幕（s05-6）の全文は書かず、結論の一語だけを残す */}
          <span style={markerStyle}>パスワードは流れない</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: ワンタイムパスワード — キーワード見出し + 右イラスト + 下帯（セキュリティトークン）
// 新出用語をページの主役にする（references/custom-scenes.md「キーワード見出し」）
// ---------------------------------------------------------------------------

const OneTimePasswordScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const desc = useAppear(segStart(SEG_P6, 1));
  const illust = useAppear(0.6);
  const band = useAppear(segStart(SEG_P6, 3), { dy: 12 });
  const bandSub = useAppear(segStart(SEG_P6, 4));

  return (
    <SlideShell narration={SEG_P6}>
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
        <div style={{ display: "flex", alignItems: "center", gap: "5%" }}>
          <div
            style={{
              flex: 1.25,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 5 * SCALE,
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
                ...chip,
              }}
            >
              使い捨てのパスワード
            </span>
            {/* 10文字なので 22×SCALE が上限（これ以上だと左カラム幅で折り返す） */}
            <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
              <span style={markerStyle}>ワンタイムパスワード</span>
            </b>
            {/* 左カラム幅（約920px）に1行で収まる長さにする。2行になると語中で折れて読みにくい
                （11×SCALE なら 20文字が上限。静止画で折り返しを確認しながら詰めた） */}
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 700,
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                ...desc,
              }}
            >
              一度使ったら無効。盗まれても次は使えない
            </span>
          </div>
          <Img
            src={staticFile("images/ipa_sg/tech-otp.png")}
            style={{
              flex: 0.9,
              minWidth: 0,
              height: 68 * SCALE,
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illust,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3 * SCALE,
            borderTop: `${1.5 * SCALE}px solid ${colors.border}`,
            paddingTop: 8 * SCALE,
            ...band,
          }}
        >
          <span style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            使い捨ての番号を作り出す道具 ＝ <span style={markerStyle}>セキュリティトークン</span>
          </span>
          {/* 字幕（s06-5）は文で語るので、画面は具体物の列挙だけに絞る */}
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
              ...bandSub,
            }}
          >
            専用の小型機器・スマートフォンのアプリ
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 預けたパスワードの守り方 — サーバー側の保存テーブルのモック
// L16 P5（パスワードはハッシュ値だけを保存する）と同じ絵を意図的に踏襲している
// ---------------------------------------------------------------------------

const StoreRow: React.FC<{ id: string; hash: string; atSec: number }> = ({ id, hash, atSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6 * SCALE,
      borderTop: `${1 * SCALE}px solid ${colors.border}`,
      padding: `${5 * SCALE}px ${11 * SCALE}px`,
      ...useAppear(atSec, { dy: 8 }),
    }}
  >
    <span
      style={{
        flex: 1,
        minWidth: 0,
        fontFamily: fontMono,
        fontSize: 11 * SCALE,
        lineHeight: 1.2,
        fontWeight: 700,
      }}
    >
      {id}
    </span>
    <span
      style={{
        flex: 2,
        minWidth: 0,
        fontFamily: fontMono,
        fontSize: 11 * SCALE,
        lineHeight: 1.2,
        fontWeight: 700,
        color: colors.primary600,
      }}
    >
      {hash}
    </span>
  </div>
);

const HashStoreScene: React.FC = () => {
  const table = useAppear(0.3);
  const noStore = useAppear(segStart(SEG_P7, 1), { dy: 8 });
  const check = useAppear(segStart(SEG_P7, 2), { dy: 8 });
  const note = useAppear(segStart(SEG_P7, 3));

  return (
    <SlideShell
      heading="預けたパスワードはどう守られるか"
      icon={<Ms name="encrypted" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
    >
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
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 12 * SCALE,
            overflow: "hidden",
            ...table,
          }}
        >
          <div style={{ display: "flex", gap: 6 * SCALE, padding: `${5 * SCALE}px ${11 * SCALE}px` }}>
            <span
              style={{
                flex: 1,
                minWidth: 0,
                fontSize: 9.5 * SCALE,
                lineHeight: 1.2,
                fontWeight: 700,
                color: colors.textMuted,
              }}
            >
              利用者ID
            </span>
            <span
              style={{
                flex: 2,
                minWidth: 0,
                fontSize: 9.5 * SCALE,
                lineHeight: 1.2,
                fontWeight: 700,
                color: colors.textMuted,
              }}
            >
              保存されている値（ハッシュ値）
            </span>
          </div>
          <StoreRow id="tanaka" hash="8f4e2ac1…d907b3" atSec={0.5} />
          <StoreRow id="suzuki" hash="5c7b90fe…3e2f1a" atSec={0.7} />
        </div>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            fontSize: 13.5 * SCALE,
            lineHeight: 1.3,
            fontWeight: 800,
            color: colors.textPrimary,
            ...noStore,
          }}
        >
          <Ms name="cancel" size={15 * SCALE} />
          パスワードそのものは保存しない
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            fontSize: 12 * SCALE,
            lineHeight: 1.3,
            fontWeight: 700,
            color: colors.textSecondary,
            ...check,
          }}
        >
          <Ms name="check_circle" size={14 * SCALE} />
          毎回ハッシュ関数で計算して照合する
        </span>

        {/* 字幕（s07-4）は理由から語るので、画面は結論の一語だけを残す */}
        <span style={{ fontSize: 13 * SCALE, lineHeight: 1.3, fontWeight: 800, ...note }}>
          <span style={markerStyle}>元のパスワードは取り出せない</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: パスワードリマインダの落とし穴 — 秘密の質問3行がピンクに点灯する
// 危険の注目はピンク（correct/incorrect は正誤リビール専用なので使わない）
// ---------------------------------------------------------------------------

const SecretQuestionRow: React.FC<{ question: string; atSec: number; litAtSec: number }> = ({
  question,
  atSec,
  litAtSec,
}) => {
  const appear = useAppear(atSec, { dy: 8 });
  const lit = useProgress(litAtSec, 0.4);
  const bg = interpolateColors(lit, [0, 1], [colors.surface, colors.accentPinkSurface]);
  const border = interpolateColors(lit, [0, 1], [colors.border, colors.accentPink]);
  const chipColor = interpolateColors(lit, [0, 1], [colors.textMuted, colors.accentPinkText]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8 * SCALE,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${border}`,
        borderRadius: 10 * SCALE,
        padding: `${5 * SCALE}px ${12 * SCALE}px`,
        ...appear,
      }}
    >
      <span style={{ fontSize: 12.5 * SCALE, lineHeight: 1.25, fontWeight: 700 }}>{question}</span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          flex: "none",
          fontSize: 10.5 * SCALE,
          lineHeight: 1.25,
          fontWeight: 800,
          color: chipColor,
          opacity: lit,
        }}
      >
        <Ms name="search" size={12 * SCALE} />
        SNSで調べられる
      </span>
    </div>
  );
};

const REMINDER_QUESTIONS = ["母親の旧姓は？", "出身の小学校は？", "初めて飼ったペットの名前は？"];

const ReminderScene: React.FC = () => {
  const lead = useAppear(segStart(SEG_P8, 1));
  const banner = useAppear(segStart(SEG_P8, 3), { dy: 10 });
  const tip = useAppear(segStart(SEG_P8, 4));
  const litFrom = segStart(SEG_P8, 2);

  return (
    <SlideShell
      heading="パスワードリマインダの落とし穴"
      icon={<Ms name="help" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
    >
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
        <span
          style={{
            fontSize: 11.5 * SCALE,
            lineHeight: 1.3,
            fontWeight: 700,
            color: colors.textSecondary,
            ...lead,
          }}
        >
          秘密の質問に答えて、パスワードを再設定するしくみ
        </span>
        {REMINDER_QUESTIONS.map((q, i) => (
          <SecretQuestionRow
            key={q}
            question={q}
            atSec={0.3 + i * 0.25}
            litAtSec={litFrom + i * 0.5}
          />
        ))}
        <span
          style={{
            fontSize: 13.5 * SCALE,
            lineHeight: 1.3,
            fontWeight: 800,
            marginTop: 2 * SCALE,
            ...banner,
          }}
        >
          強いパスワードでも、<span style={markerPinkStyle}>再設定の経路が最弱リンク</span>
        </span>
        <span
          style={{
            fontSize: 11.5 * SCALE,
            lineHeight: 1.3,
            fontWeight: 700,
            color: colors.textSecondary,
            ...tip,
          }}
        >
          質問の答えも「別のパスワード」として決める
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

export const SgL18PasswordAuthentication: VideoSpec = {
  id: "sg-L18-password-authentication",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "パスワードは\nこう守る",
      keywords: ["利用者認証", "強度", "ワンタイム"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "login-form",
      durationSec: 7,
      narration: SEG_P2,
      component: LoginFormScene,
    },
    {
      pattern: "custom",
      name: "password-strength",
      durationSec: 7,
      narration: SEG_P3,
      component: StrengthScene,
    },
    {
      pattern: "vs",
      heading: "使い回しをやめる",
      icon: "key",
      left: {
        title: "使い回し",
        icon: "lock_open",
        rows: [
          { k: "パスワード", v: "どれも同じ" },
          { k: "1つ漏れたら", v: "すべて突破される" },
          { k: "リスト攻撃", v: "一発で通る" },
        ],
      },
      right: {
        title: "サービスごとに別",
        icon: "lock",
        rows: [
          { k: "パスワード", v: "1つずつ違う" },
          { k: "1つ漏れたら", v: "その1つで止まる" },
          { k: "リスト攻撃", v: "通らない" },
        ],
      },
      // 左列は「破られる側」の説明（s04-2〜3）、右列は「唯一の対策」（s04-4）に同期
      columnAtSec: [segStart(SEG_P4, 1), segStart(SEG_P4, 3)],
      narration: SEG_P4,
    },
    {
      pattern: "custom",
      name: "challenge-response",
      durationSec: 8,
      narration: SEG_P5,
      transitionIn: "wipe-light", // 「作る」→「送る」への場面転換
      component: ChallengeResponseScene,
    },
    {
      pattern: "custom",
      name: "one-time-password",
      durationSec: 7,
      narration: SEG_P6,
      component: OneTimePasswordScene,
    },
    {
      pattern: "custom",
      name: "hash-store",
      durationSec: 7,
      narration: SEG_P7,
      component: HashStoreScene,
    },
    {
      pattern: "custom",
      name: "password-reminder",
      durationSec: 7,
      narration: SEG_P8,
      component: ReminderScene,
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
      question: "使い回しがとくに危ないのは？",
      choices: [
        { key: "A", text: "総当たり攻撃" },
        { key: "B", text: "パスワードリスト攻撃", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "パスワードを流さないのは？",
      choices: [
        { key: "A", text: "チャレンジレスポンス認証", correct: true },
        { key: "B", text: "パスワードリマインダ" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "総当たりに効くのは？",
      choices: [
        { key: "A", text: "記号を混ぜて短くする" },
        { key: "B", text: "文字数を長くする", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "IDで名乗り、パスワードで本人を確かめる。", checkAtSec: segStart(SEG_P13, 0) },
        { text: "強さは長さ。使い回しは避ける。", checkAtSec: segStart(SEG_P13, 1) },
        { text: "流さない・使い捨てにする工夫がある。", checkAtSec: segStart(SEG_P13, 2) },
      ],
      narration: SEG_P13,
      transitionIn: "wipe",
    },
  ],
};
