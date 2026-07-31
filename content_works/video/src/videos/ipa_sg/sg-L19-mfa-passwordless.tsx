import React from "react";
import { Img, staticFile } from "remotion";
import { colors, fontMono, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { DrawPath, ArrowMarker } from "../../parts/draw";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L19-mfa-passwordless.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L19: 多要素認証とパスワードレス
 *
 * 発注書 content_works/ipa_sg/orders/L19.md に対応。
 * シナリオは narration/ipa_sg/sg-L19-mfa-passwordless.md。
 *
 * L18（パスワードによる認証）の続き。パスワード認証・ワンタイムパスワードの呼称は
 * narration/ipa_sg/sg-L18-password-authentication.md に揃えた（P2 が L18 を受ける導入）。
 * 生体認証の方式・FRR/FAR は L20 の担当なので、3要素の「生体」は名前と例だけで踏み込まない。
 *
 * 構成: 「重ねる（3要素 → 多要素 → 多段階との違い）」→「省く・なくす（リスクベース →
 * パスワードレス）」→「まとめ役のしくみ（SSO・CAPTCHA）」。視覚文法は 左右分割 →
 * アイコン3連 → キーワード見出し+式 → 判定2行 → ケース2行 → 左右分割 → ハブ&スポーク →
 * モック の順に散らしてある（線で繋ぐ図は P8 の1回だけ）。
 *
 * 音声と字幕の食い違い（意図的）: jobs.json 側だけ「ICカード→アイシーカード」
 * 「FIDO→ファイド」「CAPTCHA→キャプチャ」と仮名書きにしている（TTS に綴りどおり読ませないため）。
 * 字幕は原表記のまま＋初出だけ読みを添える（references/narration.md の略語ルール）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L19-mfa-passwordless");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "前回は、パスワードで本人を確かめるしくみを学びました。"),
  N("s02-2.mp3", "でも、どれだけ長いパスワードでも、漏れてしまえばそれ一つで突破されます。"),
  N("s02-3.mp3", "そこで今回は、パスワード一本に頼らない方法を学びます。"),
  N("s02-4.mp3", "考え方は、大きく二つあります。"),
  N("s02-5.mp3", "違う種類の証拠を重ねるか、覚える秘密そのものをなくすかです。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "認証の手がかりは、大きく三つの種類に分けられます。"),
  N("s03-2.mp3", "一つ目は記憶で、パスワードのように本人だけが知っているものです。"),
  N("s03-3.mp3", "二つ目は所有で、スマートフォンやICカードのように本人だけが持っているものです。"),
  N("s03-4.mp3", "三つ目は生体で、指紋や顔のように本人自身の特徴です。"),
  N("s03-5.mp3", "この三つが、今回の話の土台になります。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "この三つのうち、種類の違うものを組み合わせるのが多要素認証です。"),
  N("s04-2.mp3", "たとえば、パスワードに加えて、スマートフォンに届く番号を入力する方式です。"),
  N("s04-3.mp3", "これは記憶と所有、二つの種類を重ねています。"),
  N("s04-4.mp3", "片方が漏れても、もう片方がなければログインできません。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "ここが試験でよく問われる急所です。"),
  N("s05-2.mp3", "パスワードのあとに秘密の質問に答える方式は、確認を二回おこなっています。"),
  N("s05-3.mp3", "これは多段階認証ですが、多要素認証ではありません。"),
  N("s05-4.mp3", "どちらも記憶で、同じ種類の証拠を二回たずねているだけだからです。"),
  N("s05-5.mp3", "効くのは回数ではなく、種類の違う要素を重ねることです。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "とはいえ、毎回二つの確認を求められると面倒です。"),
  N("s06-2.mp3", "そこで使われるのが、リスクベース認証です。"),
  N("s06-3.mp3", "いつもの端末やいつもの場所からのログインは、そのまま通します。"),
  N("s06-4.mp3", "見慣れない端末や、遠い国からのアクセスのときだけ、追加の確認を求めます。"),
  N("s06-5.mp3", "安全性と使いやすさの、折り合いをつけるしくみです。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "もう一つの方向が、覚える秘密そのものをなくす、パスワードレス認証です。"),
  // 字幕だけ読みを添える（音声は「ファイド」で生成済み）
  N("s07-2.mp3", "代表的なしくみが、FIDO（ファイド）と呼ばれる規格です。"),
  N("s07-3.mp3", "本人を確かめる秘密は、利用者の端末の中だけに保管されます。"),
  N("s07-4.mp3", "サーバーには秘密を預けないので、サーバーから漏れるものがありません。"),
  N("s07-5.mp3", "利用者は、端末のロックを解除するだけでログインできます。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "次は、シングルサインオンです。"),
  N("s08-2.mp3", "一度認証すれば、複数のサービスをそのまま利用できるしくみです。"),
  N("s08-3.mp3", "社内システムやクラウドサービスに、入り直す手間がなくなります。"),
  N("s08-4.mp3", "ただし、その一回の認証が破られると、つながる全部に入られてしまいます。"),
  N("s08-5.mp3", "だからこそ、入口の認証を多要素にしておくことが大切です。"),
];

const SEG_P9 = [
  // 字幕だけ読みを添える（音声は「キャプチャ」で生成済み）
  N("s09-1.mp3", "最後に、CAPTCHA（キャプチャ）です。"),
  N("s09-2.mp3", "ゆがんだ文字を読ませたり、私はロボットではありませんに印を付けさせる、あの画面です。"),
  N("s09-3.mp3", "これは、相手が人間かプログラムかを見分けるしくみです。"),
  N("s09-4.mp3", "本人が誰かを確かめるものではなく、機械による大量のログイン試行を防ぐためのものです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "パスワードのあとに秘密の質問に答える方式は、どちらでしょうか。"),
  N("s11-3.mp3", "正解は、多要素認証ではない、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "リスクベース認証は、どんなときに追加の確認を求めるでしょうか。"),
  N("s12-3.mp3", "正解は、いつもと違うときです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "CAPTCHAが確かめているのは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、人間かプログラムかです。", { gapBeforeSec: 1.8 }),
];

const SEG_P14 = [
  N("s14-1.mp3", "認証の要素は、記憶、所有、生体の三つです。"),
  N("s14-2.mp3", "種類の違う要素を重ねるのが多要素認証で、回数を重ねる多段階認証とは違います。"),
  N("s14-3.mp3", "リスクベース認証やパスワードレス認証は、安全と便利を両立させます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（「記憶」「所有」などの要素ラベルにも使う） */
const Chip: React.FC<{ text: string; tone?: "blue" | "pink" }> = ({ text, tone = "blue" }) => (
  <span
    style={{
      flex: "none",
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      color: tone === "blue" ? colors.primary800 : colors.accentPinkText,
      backgroundColor: tone === "blue" ? colors.primary100 : colors.accentPinkSurface,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
    }}
  >
    {text}
  </span>
);

// ---------------------------------------------------------------------------
// P2: パスワード1本の限界 — 左右分割（人物イラスト + 主張 + 今回の2方向）
// ---------------------------------------------------------------------------

const DirectionRow: React.FC<{ no: string; text: React.ReactNode; atSec: number }> = ({
  no,
  text,
  atSec,
}) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 7 * SCALE, ...useAppear(atSec, { dy: 10 }) }}
  >
    <span
      style={{
        flex: "none",
        width: 9 * SCALE,
        height: 9 * SCALE,
        borderRadius: 999,
        backgroundColor: colors.primary600,
        color: colors.surface,
        fontSize: 7 * SCALE,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {no}
    </span>
    <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>{text}</span>
  </div>
);

const WhyMfaScene: React.FC = () => {
  const illust = useAppear(0.3);
  const lead = useAppear(0.45);
  const punch = useAppear(segStart(SEG_P2, 1), { dy: 12 });
  const label = useAppear(segStart(SEG_P2, 3));

  return (
    <SlideShell
      heading="パスワード1本の限界"
      icon={<Ms name="lock_open" size={videoType.slideHeadIcon} />}
      narration={SEG_P2}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <Img
          src={staticFile("images/ipa_sg/person-employee-m-worry.png")}
          style={{
            flex: 0.8,
            minWidth: 0,
            height: 60 * SCALE,
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
        <div
          style={{
            flex: 1.35,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 6 * SCALE,
          }}
        >
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
              ...lead,
            }}
          >
            長く複雑にしても、秘密は1つだけ
          </span>
          <span style={{ fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.3, ...punch }}>
            <span style={markerPinkStyle}>漏れたら1本で突破される</span>
          </span>
          <div
            style={{
              marginTop: 3 * SCALE,
              paddingTop: 7 * SCALE,
              borderTop: `${1.5 * SCALE}px solid ${colors.border}`,
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
            }}
          >
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                color: colors.textMuted,
                ...label,
              }}
            >
              頼らないための2つの方向
            </span>
            <DirectionRow
              no="1"
              text={
                <>
                  違う<span style={markerStyle}>種類の証拠</span>を重ねる
                </>
              }
              atSec={segStart(SEG_P2, 4)}
            />
            <DirectionRow
              no="2"
              text={
                <>
                  覚える<span style={markerStyle}>秘密をなくす</span>
                </>
              }
              atSec={segStart(SEG_P2, 4) + 1.6}
            />
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 認証の3要素 — アイコン3連（記憶・所有・生体）。この回全体の地図
// 生体の中身（方式・精度）は L20 の担当なので、例を1つ挙げるだけにとどめる
// ---------------------------------------------------------------------------

const FactorColumn: React.FC<{
  icon: string;
  name: string;
  desc: string;
  example: string;
  atSec: number;
}> = ({ icon, name, desc, example, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4 * SCALE,
      ...usePop(atSec),
    }}
  >
    <span
      style={{
        width: 34 * SCALE,
        height: 34 * SCALE,
        borderRadius: 13 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={20 * SCALE} />
    </span>
    <b style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
      <span style={markerStyle}>{name}</span>
    </b>
    <span
      style={{
        fontSize: 11 * SCALE,
        fontWeight: 700,
        lineHeight: 1.3,
        color: colors.textSecondary,
        whiteSpace: "nowrap",
      }}
    >
      {desc}
    </span>
    <Chip text={example} />
  </div>
);

const ThreeFactorsScene: React.FC = () => {
  const foot = useAppear(segStart(SEG_P3, 4));

  return (
    <SlideShell
      heading="認証の3要素"
      icon={<Ms name="category" size={videoType.slideHeadIcon} />}
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
          gap: 11 * SCALE,
        }}
      >
        <div style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 6 * SCALE }}>
          <FactorColumn
            icon="psychology"
            name="記憶"
            desc="知っているもの"
            example="パスワード"
            atSec={segStart(SEG_P3, 1)}
          />
          <FactorColumn
            icon="smartphone"
            name="所有"
            desc="持っているもの"
            example="スマホ・ICカード"
            atSec={segStart(SEG_P3, 2)}
          />
          <FactorColumn
            icon="fingerprint"
            name="生体"
            desc="本人自身の特徴"
            example="指紋・顔"
            atSec={segStart(SEG_P3, 3)}
          />
        </div>
        {/* 字幕（s03-5）の言い換えではなく、この3つの位置づけだけを短く置く */}
        <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...foot }}>
          本人を確かめる手がかりは、この<span style={markerStyle}>3種類</span>だけ
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 多要素認証 — キーワード見出し（新出用語を主役に）+ 要素の足し算
// ---------------------------------------------------------------------------

const FactorCard: React.FC<{ chip: string; text: string; atSec: number }> = ({
  chip,
  text,
  atSec,
}) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 11 * SCALE,
      padding: `${6 * SCALE}px ${9 * SCALE}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3 * SCALE,
      ...useAppear(atSec, { dy: 12 }),
    }}
  >
    <Chip text={chip} />
    <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.25, whiteSpace: "nowrap" }}>
      {text}
    </span>
  </div>
);

const Operator: React.FC<{ sign: string; atSec: number }> = ({ sign, atSec }) => (
  <span
    style={{
      flex: "none",
      alignSelf: "center",
      fontSize: 16 * SCALE,
      fontWeight: 800,
      lineHeight: 1,
      color: colors.primary600,
      ...usePop(atSec),
    }}
  >
    {sign}
  </span>
);

const MfaScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const desc = useAppear(0.7);
  const verdict = useAppear(segStart(SEG_P4, 2), { dy: 10 });
  const note = useAppear(segStart(SEG_P4, 3));

  return (
    <SlideShell narration={SEG_P4}>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 5 * SCALE,
          }}
        >
          <span style={{ ...chip }}>
            <Chip text="利用者認証の方式" />
          </span>
          <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>多要素認証</span>
          </b>
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, lineHeight: 1.4, ...desc }}>
            種類の違う要素を、2つ以上組み合わせる
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 6 * SCALE,
            paddingTop: 8 * SCALE,
            borderTop: `${1.5 * SCALE}px solid ${colors.border}`,
          }}
        >
          <FactorCard chip="記憶" text="パスワード" atSec={segStart(SEG_P4, 1)} />
          <Operator sign="＋" atSec={segStart(SEG_P4, 1) + 1.4} />
          <FactorCard chip="所有" text="スマホに届く番号" atSec={segStart(SEG_P4, 1) + 1.6} />
          <Operator sign="＝" atSec={segStart(SEG_P4, 2)} />
          <span
            style={{
              flex: 1,
              minWidth: 0,
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5 * SCALE,
              fontSize: 14 * SCALE,
              fontWeight: 800,
              lineHeight: 1.25,
              color: colors.primary600,
              ...verdict,
            }}
          >
            <Ms name="check_circle" size={16 * SCALE} />
            2種類そろう
          </span>
        </div>

        {/* 字幕（s04-4）は理由から語るので、画面は結論の一語だけを残す */}
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...note }}>
          1つ漏れただけでは<span style={markerStyle}>突破されない</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 多要素認証と多段階認証の違い（試験の急所）— 組み合わせ2行の判定
// 判定は色 + アイコンの二重符号化。危険・誤解の注目はピンク
// ---------------------------------------------------------------------------

const ElementBox: React.FC<{ chip: string; text: string; tone?: "blue" | "pink" }> = ({
  chip,
  text,
  tone = "blue",
}) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: 6 * SCALE,
      backgroundColor: colors.bg,
      border: `${1 * SCALE}px solid ${colors.border}`,
      borderRadius: 9 * SCALE,
      padding: `${3.5 * SCALE}px ${8 * SCALE}px`,
    }}
  >
    <Chip text={chip} tone={tone} />
    <span
      style={{ fontSize: 12 * SCALE, fontWeight: 700, lineHeight: 1.2, whiteSpace: "nowrap" }}
    >
      {text}
    </span>
  </div>
);

const JudgeRow: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  icon: string;
  verdict: string;
  ok: boolean;
  atSec: number;
  verdictAtSec: number;
}> = ({ left, right, icon, verdict, ok, atSec, verdictAtSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${ok ? colors.primary500 : colors.accentPink}`,
      borderRadius: 11 * SCALE,
      padding: `${6 * SCALE}px ${9 * SCALE}px`,
      ...useAppear(atSec, { dy: 12 }),
    }}
  >
    {left}
    <span style={{ flex: "none", fontSize: 13 * SCALE, fontWeight: 800, color: colors.textMuted }}>
      ＋
    </span>
    {right}
    {/* 判定は「色 + アイコン」の二重符号化。3文字でも縦に割れないよう幅と nowrap を確保する
        （幅が足りず縦に1文字ずつ折れて行の高さが3倍になり、静止画で見出し・字幕帯に食い込んだ） */}
    <span
      style={{
        flex: "none",
        width: 58 * SCALE,
        display: "flex",
        alignItems: "center",
        gap: 4 * SCALE,
        fontSize: 12 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        color: ok ? colors.primary600 : colors.accentPinkText,
        ...useAppear(verdictAtSec, { dy: 0 }),
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      {verdict}
    </span>
  </div>
);

const MultiStepScene: React.FC = () => {
  const lead = useAppear(0.3);
  const reason = useAppear(segStart(SEG_P5, 3), { dy: 8 });
  const foot = useAppear(segStart(SEG_P5, 4));

  return (
    <SlideShell
      heading="多要素と多段階はどう違う？"
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
          gap: 6 * SCALE,
        }}
      >
        <span
          style={{
            fontSize: 11 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            ...lead,
          }}
        >
          確認を2回すれば多要素、ではない
        </span>

        <JudgeRow
          left={<ElementBox chip="記憶" text="パスワード" tone="pink" />}
          right={<ElementBox chip="記憶" text="秘密の質問" tone="pink" />}
          icon="cancel"
          verdict="多段階"
          ok={false}
          atSec={0.5}
          verdictAtSec={segStart(SEG_P5, 2)}
        />
        <span
          style={{
            fontSize: 11 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            color: colors.accentPinkText,
            ...reason,
          }}
        >
          同じ「記憶」を2回たずねているだけ
        </span>

        <JudgeRow
          left={<ElementBox chip="記憶" text="パスワード" />}
          right={<ElementBox chip="所有" text="スマホに届く番号" />}
          icon="check_circle"
          verdict="多要素"
          ok
          atSec={segStart(SEG_P5, 4)}
          verdictAtSec={segStart(SEG_P5, 4) + 0.8}
        />

        {/* 字幕（s05-5）の全文は書かず、結論の一語だけを残す */}
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...foot }}>
          大事なのは<span style={markerStyle}>種類の違い</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: リスクベース認証 — 「いつもの／いつもと違う」2ケースの振り分け
// ---------------------------------------------------------------------------

const CaseRow: React.FC<{
  icon: string;
  situation: string;
  action: string;
  actionIcon: string;
  ok: boolean;
  atSec: number;
}> = ({ icon, situation, action, actionIcon, ok, atSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${ok ? colors.border : colors.accentPink}`,
      borderRadius: 11 * SCALE,
      padding: `${7 * SCALE}px ${11 * SCALE}px`,
      ...useAppear(atSec, { dy: 12 }),
    }}
  >
    <span
      style={{
        flex: "none",
        width: 22 * SCALE,
        height: 22 * SCALE,
        borderRadius: 9 * SCALE,
        backgroundColor: ok ? colors.primary50 : colors.accentPinkSurface,
        color: ok ? colors.primary600 : colors.accentPinkText,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
    </span>
    <span
      style={{ flex: 1, minWidth: 0, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.25 }}
    >
      {situation}
    </span>
    <span
      style={{
        flex: "none",
        fontSize: 13 * SCALE,
        fontWeight: 800,
        color: colors.textMuted,
        lineHeight: 1,
      }}
    >
      →
    </span>
    {/* 対応ラベルは 4文字でも縦に折れないよう幅と nowrap を確保する（JudgeRow と同じ理由） */}
    <span
      style={{
        flex: "none",
        width: 70 * SCALE,
        display: "flex",
        alignItems: "center",
        gap: 5 * SCALE,
        fontSize: 12.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        color: ok ? colors.primary600 : colors.accentPinkText,
      }}
    >
      <Ms name={actionIcon} size={15 * SCALE} />
      {action}
    </span>
  </div>
);

const RiskBasedScene: React.FC = () => {
  const lead = useAppear(0.3);
  const lead2 = useAppear(segStart(SEG_P6, 1));
  const foot = useAppear(segStart(SEG_P6, 4));

  return (
    <SlideShell
      heading="リスクベース認証"
      icon={<Ms name="alt_route" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
    >
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
            fontSize: 11 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            ...lead,
          }}
        >
          毎回2つの確認を求められると、使う側は面倒
        </span>
        <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...lead2 }}>
          いつもの操作かどうかで、<span style={markerStyle}>確認の強さを変える</span>
        </span>

        <CaseRow
          icon="laptop_mac"
          situation="いつもの端末・いつもの場所"
          action="そのまま"
          actionIcon="check_circle"
          ok
          atSec={segStart(SEG_P6, 2)}
        />
        <CaseRow
          icon="travel_explore"
          situation="見慣れない端末・遠い国から"
          action="追加確認"
          actionIcon="gpp_maybe"
          ok={false}
          atSec={segStart(SEG_P6, 3)}
        />

        {/* 字幕（s06-5）の全文は書かず、結論だけを短く置く */}
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...foot }}>
          安全と便利の<span style={markerStyle}>折り合い</span>をつける
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: パスワードレス認証 — キーワード見出し + 端末イラスト
// FIDO の鍵の仕組み（公開鍵暗号）には踏み込まず、「秘密が端末の外に出ない」だけを語る
// ---------------------------------------------------------------------------

const PasswordlessScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const desc = useAppear(segStart(SEG_P7, 2));
  const fido = useAppear(segStart(SEG_P7, 1));
  const illust = useAppear(0.6);
  const band = useAppear(segStart(SEG_P7, 3), { dy: 12 });
  const bandSub = useAppear(segStart(SEG_P7, 4));

  return (
    <SlideShell narration={SEG_P7}>
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
              flex: 1.3,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 5 * SCALE,
            }}
          >
            <span style={{ ...chip }}>
              <Chip text="覚える秘密をなくす" />
            </span>
            {/* 9文字なので 22×SCALE が上限（これ以上だと左カラム幅で折り返す） */}
            <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
              <span style={markerStyle}>パスワードレス認証</span>
            </b>
            <span
              style={{
                fontSize: 11.5 * SCALE,
                fontWeight: 700,
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                ...desc,
              }}
            >
              本人を確かめる秘密は、端末の中だけにある
            </span>
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 700,
                lineHeight: 1.3,
                color: colors.textSecondary,
                ...fido,
              }}
            >
              代表的な規格 ＝ FIDO（ファイド）
            </span>
          </div>
          <Img
            src={staticFile("images/ipa_sg/icon-smartphone.png")}
            style={{
              flex: 0.85,
              minWidth: 0,
              height: 76 * SCALE,
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
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              fontSize: 15 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
            }}
          >
            <Ms name="storage" size={17 * SCALE} />
            サーバーに秘密を預けない ＝ <span style={markerStyle}>漏れる秘密がない</span>
          </span>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
              ...bandSub,
            }}
          >
            {/* 字幕（s07-5）と同じ文にしない。画面は操作の一語だけに絞る */}
            ログイン操作は、端末のロック解除だけ
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: シングルサインオン — ハブ&スポーク（1回の認証 → 複数サービス）
// この動画で「線で繋ぐ図」はここだけ。
// viewBox の比（1000:220 = 4.5）は描画領域の比（約1150:255 = 4.5）以上にして、
// preserveAspectRatio の既定（meet）で幅にフィットさせる。
// 矢じりは size6 × strokeWidth5 = 30単位なので、終点 y=28/110/195 なら 13〜210 で viewBox に収まる。
// ---------------------------------------------------------------------------

const ServicePill: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 5 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 999,
      padding: `${4 * SCALE}px ${11 * SCALE}px`,
      color: colors.primary600,
      ...useAppear(atSec, { dy: 0 }),
    }}
  >
    <Ms name={icon} size={14 * SCALE} />
    <span
      style={{
        fontSize: 12 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        color: colors.textPrimary,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  </div>
);

const SsoScene: React.FC = () => {
  const hub = usePop(0.3);
  const drawFrom = segStart(SEG_P8, 1);
  const warn = useAppear(segStart(SEG_P8, 3), { dy: 12 });
  const foot = useAppear(segStart(SEG_P8, 4));

  return (
    <SlideShell
      heading="シングルサインオン"
      icon={<Ms name="key" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
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
        <div style={{ display: "flex", alignItems: "center", gap: 4 * SCALE }}>
          {/* ハブ = 1回の認証 */}
          <div
            style={{
              flex: "none",
              width: 38 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              ...hub,
            }}
          >
            <span
              style={{
                width: 30 * SCALE,
                height: 30 * SCALE,
                borderRadius: 12 * SCALE,
                backgroundColor: colors.primary600,
                color: colors.surface,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ms name="key" size={18 * SCALE} />
            </span>
            <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>
              1回の認証
            </b>
          </div>

          <svg viewBox="0 0 1000 220" style={{ flex: 1, minWidth: 0, height: 64 * SCALE }}>
            <ArrowMarker id="l19-sso" color={colors.primary500} />
            <DrawPath
              d="M40 110 L935 28"
              delaySec={drawFrom}
              durSec={0.6}
              stroke={colors.primary500}
              strokeWidth={5}
              markerEnd="url(#l19-sso)"
            />
            <DrawPath
              d="M40 110 L935 110"
              delaySec={drawFrom + 0.3}
              durSec={0.6}
              stroke={colors.primary500}
              strokeWidth={5}
              markerEnd="url(#l19-sso)"
            />
            <DrawPath
              d="M40 110 L935 192"
              delaySec={drawFrom + 0.6}
              durSec={0.6}
              stroke={colors.primary500}
              strokeWidth={5}
              markerEnd="url(#l19-sso)"
            />
          </svg>

          {/* 到達先のサービスは、線が届く頃に出す */}
          <div
            style={{
              flex: "none",
              height: 64 * SCALE,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <ServicePill icon="mail" label="メール" atSec={drawFrom + 0.6} />
            <ServicePill icon="cloud" label="クラウドサービス" atSec={drawFrom + 0.9} />
            <ServicePill icon="storage" label="社内システム" atSec={drawFrom + 1.2} />
          </div>
        </div>

        {/* 字幕（s08-4・s08-5）の全文は書かず、結論だけを短く置く */}
        <span style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.3, ...warn }}>
          破られたら<span style={markerPinkStyle}>つながる全部に入られる</span>
        </span>
        <span
          style={{
            fontSize: 12 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            ...foot,
          }}
        >
          入口こそ多要素認証にしておく
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: CAPTCHA — 実物の画面のモック + 位置づけ（本人確認ではない）
// 受講者が実際に目にする物なので、用語を大写しにせずモックで見せる
// ---------------------------------------------------------------------------

const CaptchaScene: React.FC = () => {
  const card = useAppear(0.3);
  const distorted = useAppear(segStart(SEG_P9, 1), { dy: 10 });
  const isNote = useAppear(segStart(SEG_P9, 2), { dy: 10 });
  const notNote = useAppear(segStart(SEG_P9, 3), { dy: 10 });
  const purpose = useAppear(segStart(SEG_P9, 3) + 1.8);

  return (
    <SlideShell
      heading="CAPTCHA（キャプチャ）"
      icon={<Ms name="shield" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
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
        {/* CAPTCHA 画面のモック */}
        <div
          style={{
            flex: 1.15,
            minWidth: 0,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 12 * SCALE,
            padding: `${9 * SCALE}px ${12 * SCALE}px`,
            display: "flex",
            flexDirection: "column",
            gap: 7 * SCALE,
            ...card,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
            <span
              style={{
                flex: "none",
                width: 13 * SCALE,
                height: 13 * SCALE,
                borderRadius: 4 * SCALE,
                border: `${1.5 * SCALE}px solid ${colors.primary500}`,
                backgroundColor: colors.bg,
              }}
            />
            <span
              style={{
                fontSize: 12 * SCALE,
                fontWeight: 700,
                lineHeight: 1.25,
                whiteSpace: "nowrap",
              }}
            >
              私はロボットではありません
            </span>
          </div>
          <div
            style={{
              borderTop: `${1 * SCALE}px solid ${colors.border}`,
              paddingTop: 7 * SCALE,
              display: "flex",
              flexDirection: "column",
              gap: 4 * SCALE,
              ...distorted,
            }}
          >
            <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700, color: colors.textMuted }}>
              表示された文字を入力してください
            </span>
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 20 * SCALE,
                fontWeight: 700,
                fontStyle: "italic",
                letterSpacing: 4 * SCALE,
                lineHeight: 1.2,
                color: colors.textSecondary,
                backgroundColor: colors.bg,
                borderRadius: 8 * SCALE,
                padding: `${4 * SCALE}px ${8 * SCALE}px`,
                textAlign: "center",
              }}
            >
              7fRq2X
            </span>
          </div>
        </div>

        {/* 位置づけ（何を確かめていて、何を確かめていないか）
            右カラムは語中で折り返すと読みにくいので、1行に収まる短さに詰めてある */}
        <div
          style={{
            flex: 0.95,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 9 * SCALE,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 6 * SCALE,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.35,
              color: colors.primary600,
              ...isNote,
            }}
          >
            <Ms name="check_circle" size={16 * SCALE} />
            <span style={{ color: colors.textPrimary, whiteSpace: "nowrap" }}>
              <span style={markerStyle}>人間かプログラムか</span>の判別
            </span>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 6 * SCALE,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.35,
              color: colors.accentPinkText,
              ...notNote,
            }}
          >
            <Ms name="cancel" size={15 * SCALE} />
            <span style={{ color: colors.textPrimary, whiteSpace: "nowrap" }}>
              本人が誰かは確かめない
            </span>
          </span>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.35,
              color: colors.textSecondary,
              ...purpose,
            }}
          >
            狙いは大量ログインの防止
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

export const SgL19MfaPasswordless: VideoSpec = {
  id: "sg-L19-mfa-passwordless",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "パスワード1本に\n頼らない",
      keywords: ["多要素認証", "リスクベース", "FIDO"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "why-mfa",
      durationSec: 7,
      narration: SEG_P2,
      component: WhyMfaScene,
    },
    {
      pattern: "custom",
      name: "three-factors",
      durationSec: 7,
      narration: SEG_P3,
      component: ThreeFactorsScene,
    },
    {
      pattern: "custom",
      name: "mfa",
      durationSec: 7,
      narration: SEG_P4,
      component: MfaScene,
    },
    {
      pattern: "custom",
      name: "multi-step",
      durationSec: 7,
      narration: SEG_P5,
      component: MultiStepScene,
    },
    {
      pattern: "custom",
      name: "risk-based",
      durationSec: 7,
      narration: SEG_P6,
      transitionIn: "wipe-light", // 「重ねる」→「省く・なくす」への場面転換
      component: RiskBasedScene,
    },
    {
      pattern: "custom",
      name: "passwordless",
      durationSec: 7,
      narration: SEG_P7,
      component: PasswordlessScene,
    },
    {
      pattern: "custom",
      name: "sso",
      durationSec: 7,
      narration: SEG_P8,
      component: SsoScene,
    },
    {
      pattern: "custom",
      name: "captcha",
      durationSec: 7,
      narration: SEG_P9,
      component: CaptchaScene,
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
      question: "パスワード＋秘密の質問は？",
      choices: [
        { key: "A", text: "要素が2つで多要素認証" },
        { key: "B", text: "同じ記憶なので多要素でない", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "リスクベース認証の追加確認は？",
      choices: [
        { key: "A", text: "いつもと違うときだけ", correct: true },
        { key: "B", text: "毎回すべての利用者に" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "CAPTCHAが確かめるのは？",
      choices: [
        { key: "A", text: "本人が誰かどうか" },
        { key: "B", text: "人間かプログラムか", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "認証の要素は記憶・所有・生体の3つ。", checkAtSec: segStart(SEG_P14, 0) },
        { text: "多要素は種類の違い、多段階は回数の話。", checkAtSec: segStart(SEG_P14, 1) },
        { text: "リスクベースやパスワードレスで両立させる。", checkAtSec: segStart(SEG_P14, 2) },
      ],
      narration: SEG_P14,
      transitionIn: "wipe",
    },
  ],
};
