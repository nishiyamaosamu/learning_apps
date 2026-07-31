import React from "react";
import { Img, interpolateColors, staticFile } from "remotion";
import { colors, fontMono, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { NEVER_SEC, useAppear, usePop, useProgress } from "../../parts/animate";
import { DrawPath } from "../../parts/draw";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L20-biometrics.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L20: 生体認証と本人確認
 *
 * 発注書 content_works/ipa_sg/orders/L20.md に対応。
 * シナリオは narration/ipa_sg/sg-L20-biometrics.md。
 *
 * L19（多要素認証とパスワードレス）の後の回。認証の3要素の呼称は L19 の発注書
 * （記憶・所有・生体＋和語の言い換え）に揃えた。3要素の枠組み・多要素／多段階の区別・
 * リスクベース認証の仕組みは L19 が主担当なので**再説明せず参照するだけ**にしてある。
 * パスワード側の呼称は L18（narration/ipa_sg/sg-L18-password-authentication.md）に揃え、
 * ワンタイムパスワード等は L18 の担当なので P9 の追加認証では語らない。
 *
 * 音声と字幕の食い違い（意図的）: jobs.json 側だけ「ICカード→アイシーカード」
 * 「PINコード→ピンコード」「FRR→エフアールアール」「FAR→エフエーアール」
 * 「eKYC→イーケーワイシー」「EMV 3-Dセキュア→イーエムブイスリーディーセキュア」と
 * 仮名書きにしている（TTS に綴りどおり読ませないため）。字幕は原表記のまま。
 * eKYC・EMV 3-Dセキュアは初出の字幕にだけカナの読みを添えた。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L20-biometrics");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "前回は、認証の三つの要素を学びました。"),
  N("s02-2.mp3", "記憶、所有、そして生体の三つですね。"),
  N("s02-3.mp3", "今回は、その中の生体をくわしく見ていきます。"),
  N("s02-4.mp3", "体そのものを鍵にするのが、生体認証です。"),
  N("s02-5.mp3", "パスワードのように忘れることも、カードのように失くすこともありません。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "生体認証は、大きく二つに分けられます。"),
  N("s03-2.mp3", "一つめは、身体的特徴による認証です。"),
  N("s03-3.mp3", "体の形やもよう、そのものを証拠として使います。"),
  N("s03-4.mp3", "手のひらの静脈、目の虹彩、顔の形などが代表です。"),
  N("s03-5.mp3", "どれも一人ひとり違い、生まれつき変わりにくいのが強みです。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "二つめは、行動的特徴による認証です。"),
  N("s04-2.mp3", "こちらは体の形ではなく、動きの癖を証拠にします。"),
  N("s04-3.mp3", "声の高さや話し方の癖を見るのが、声紋による認証です。"),
  N("s04-4.mp3", "手書きの署名なら、書く速さや筆圧の癖まで確かめられます。"),
  N("s04-5.mp3", "形だけまねても、書き方の癖まではまねられません。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "ここで、生体認証の急所になる二つの割合を覚えます。"),
  N("s05-2.mp3", "本人拒否率、略してFRRは、本人なのに拒まれてしまう割合です。"),
  N("s05-3.mp3", "指が乾いていて読み取れない、といった場面ですね。"),
  N("s05-4.mp3", "他人受入率、略してFARは、他人を本人として通してしまう割合です。"),
  N("s05-5.mp3", "本人拒否率は不便さにつながり、他人受入率は危険に直結します。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "この二つは、判定の厳しさで同時に決まります。"),
  N("s06-2.mp3", "判定を厳しくすると、他人受入率は下がります。"),
  N("s06-3.mp3", "ところが同時に、本人拒否率は上がってしまいます。"),
  N("s06-4.mp3", "ゆるくすれば本人は通りやすくなりますが、他人も通りやすくなります。"),
  N("s06-5.mp3", "どちらか片方だけをゼロにすることはできません。"),
  N("s06-6.mp3", "だから、用途に合わせてちょうどよい厳しさに調整します。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "ここからは、本人確認のしくみに目を向けます。"),
  N("s07-2.mp3", "社員証などのICカードは、持っている人だけが使えます。"),
  N("s07-3.mp3", "そこに、PINコードという暗証番号を組み合わせます。"),
  N("s07-4.mp3", "カードは所有、PINコードは記憶にあたります。"),
  N("s07-5.mp3", "種類の違う二つを重ねるので、カードを盗まれただけでは使えません。"),
];

const SEG_P8 = [
  // 読み方が定着した略語なので、初出の字幕にだけカナを添える（音声は仮名書き）
  N("s08-1.mp3", "オンラインで本人確認を済ませるしくみが、eKYC（イーケーワイシー）です。"),
  N("s08-2.mp3", "銀行の口座開設などを、窓口に行かずに完結できます。"),
  N("s08-3.mp3", "まず、運転免許証などの本人確認書類を撮影します。"),
  N("s08-4.mp3", "次に、自分の顔をその場で撮影します。"),
  N("s08-5.mp3", "送られた二つを照合して、同じ人かどうかを確かめます。"),
  N("s08-6.mp3", "書類の郵送を待たずに、その日から使い始められます。"),
];

const SEG_P9 = [
  N(
    "s09-1.mp3",
    "カード決済の本人確認に使われるのが、EMV 3-Dセキュア（イーエムブイスリーディーセキュア）です。",
  ),
  N("s09-2.mp3", "ネットショップの支払いで、毎回パスワードを求められては面倒です。"),
  N("s09-3.mp3", "そこで、ふだんと同じ端末からの支払いは、そのまま通します。"),
  N("s09-4.mp3", "いつもと違う端末や、高額な取引のときだけ、追加の確認をします。"),
  N("s09-5.mp3", "前回学んだリスクベース認証を、カード決済に応用したしくみです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "生体認証の判定を厳しくすると、どうなるでしょうか。"),
  N("s11-3.mp3", "正解は、本人拒否率が上がることです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "ICカードとPINコードは、何と何を重ねた組み合わせでしょうか。"),
  N("s12-3.mp3", "正解は、所有と記憶の組み合わせです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "声紋による認証は、どちらに分類されるでしょうか。"),
  N("s13-3.mp3", "正解は、行動的特徴による認証です。", { gapBeforeSec: 1.8 }),
];

const SEG_P14 = [
  N("s14-1.mp3", "生体認証には、身体的特徴と行動的特徴があります。"),
  N("s14-2.mp3", "判定を厳しくすると本人拒否率が上がり、ゆるめると他人受入率が上がります。"),
  N("s14-3.mp3", "ICカードとPINコード、eKYC、EMV 3-Dセキュアも本人確認のしくみです。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P2: 生体認証は3要素の「生体」— 3要素の帯（生体だけ点灯）+ キーワード見出し + イラスト
// 3要素の枠組みは L19 の担当なので、帯で位置づけだけ示して深追いしない
// ---------------------------------------------------------------------------

const FactorChip: React.FC<{ icon: string; name: string; gloss: string; litAtSec: number }> = ({
  icon,
  name,
  gloss,
  litAtSec,
}) => {
  const lit = useProgress(litAtSec, 0.4);
  const bg = interpolateColors(lit, [0, 1], [colors.surface, colors.primary50]);
  const border = interpolateColors(lit, [0, 1], [colors.border, colors.primary500]);
  const nameColor = interpolateColors(lit, [0, 1], [colors.textSecondary, colors.primary600]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5 * SCALE,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${border}`,
        borderRadius: 10 * SCALE,
        padding: `${5 * SCALE}px ${4 * SCALE}px`,
      }}
    >
      <span style={{ flex: "none", display: "flex", color: nameColor }}>
        <Ms name={icon} size={15 * SCALE} />
      </span>
      <b style={{ fontSize: 13 * SCALE, lineHeight: 1.2, color: nameColor }}>{name}</b>
      <span style={{ fontSize: 10 * SCALE, lineHeight: 1.2, color: colors.textMuted }}>{gloss}</span>
    </div>
  );
};

const BiometricsIntroScene: React.FC = () => {
  const band = useAppear(0.3);
  const chip = useAppear(segStart(SEG_P2, 2));
  const term = useAppear(segStart(SEG_P2, 2) + 0.2);
  const desc = useAppear(segStart(SEG_P2, 3));
  const illust = useAppear(segStart(SEG_P2, 2) + 0.1);
  const merits = useAppear(segStart(SEG_P2, 4), { dy: 12 });
  const litAt = segStart(SEG_P2, 1);

  return (
    <SlideShell narration={SEG_P2}>
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
        {/* 認証の3要素（L19 の呼称）。今回の主役＝生体だけを点灯させる */}
        <div style={{ display: "flex", gap: 5 * SCALE, ...band }}>
          <FactorChip icon="psychology" name="記憶" gloss="知っているもの" litAtSec={NEVER_SEC} />
          <FactorChip icon="badge" name="所有" gloss="持っているもの" litAtSec={NEVER_SEC} />
          <FactorChip icon="fingerprint" name="生体" gloss="本人自身" litAtSec={litAt} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
          <div
            style={{
              flex: 1.2,
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
              3要素の「生体」
            </span>
            <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
              <span style={markerStyle}>生体認証</span>
            </b>
            <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, lineHeight: 1.4, ...desc }}>
              体そのものを鍵にする
            </span>
          </div>
          <Img
            src={staticFile("images/ipa_sg/tech-fingerprint.png")}
            style={{
              flex: 0.9,
              minWidth: 0,
              height: 70 * SCALE,
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illust,
            }}
          />
        </div>

        {/* 字幕（s02-5）は文で語るので、画面は強みの2語だけに絞る */}
        <div
          style={{
            display: "flex",
            gap: 12 * SCALE,
            borderTop: `${1.5 * SCALE}px solid ${colors.border}`,
            paddingTop: 8 * SCALE,
            ...merits,
          }}
        >
          {[
            { icon: "psychology", text: "忘れない" },
            { icon: "inventory_2", text: "失くさない" },
          ].map((m) => (
            <span
              key={m.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5 * SCALE,
                fontSize: 14 * SCALE,
                fontWeight: 800,
                lineHeight: 1.3,
                color: colors.primary600,
              }}
            >
              <Ms name={m.icon} size={16 * SCALE} />
              {m.text}
            </span>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 身体的特徴による認証 — 縦3行（部位アイコン + 用語 + 見るところ）
// 用語（静脈・虹彩・顔）を本文より大きくしてマーカーを引く
// ---------------------------------------------------------------------------

const TraitRow: React.FC<{ icon: string; term: string; desc: string; atSec: number }> = ({
  icon,
  term,
  desc,
  atSec,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 10 * SCALE,
      // 3行 + リード + 注記が本文高さ（見出しあり＝約655px）に収まるよう詰めてある。
      // 行を高くすると見出しと本文が重なる（静止画で発覚した）
      padding: `${5 * SCALE}px ${13 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        flex: "none",
        width: 20 * SCALE,
        height: 20 * SCALE,
        borderRadius: 7 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={13 * SCALE} />
    </span>
    <b style={{ flex: "none", fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
      <span style={markerStyle}>{term}</span>
    </b>
    <span
      style={{ fontSize: 11.5 * SCALE, fontWeight: 700, lineHeight: 1.3, color: colors.textSecondary }}
    >
      {desc}
    </span>
  </div>
);

const PhysicalTraitScene: React.FC = () => {
  const lead = useAppear(segStart(SEG_P3, 2));
  const note = useAppear(segStart(SEG_P3, 4), { dy: 10 });
  const rowFrom = segStart(SEG_P3, 3);

  return (
    <SlideShell
      heading="身体的特徴による認証"
      icon={<Ms name="fingerprint" size={videoType.slideHeadIcon} />}
      narration={SEG_P3}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        <span
          style={{
            marginBottom: 2 * SCALE,
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...lead,
          }}
        >
          体の形やもよう、<span style={markerStyle}>そのもの</span>が証拠になる
        </span>
        <TraitRow icon="schema" term="静脈" desc="手のひらの血管のもよう" atSec={rowFrom} />
        <TraitRow icon="visibility" term="虹彩" desc="目のもよう" atSec={rowFrom + 0.7} />
        <TraitRow icon="person" term="顔" desc="顔の形の特徴" atSec={rowFrom + 1.4} />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            fontSize: 12.5 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            ...note,
          }}
        >
          <Ms name="check_circle" size={14 * SCALE} />
          一人ひとり違い、生まれつき変わりにくい
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 行動的特徴による認証 — 横2カード（声紋・署名）
// P3 の縦リストと形を変えて、2分類が同じ絵にならないようにしている
// ---------------------------------------------------------------------------

const BehaviorCard: React.FC<{
  icon: string;
  term: string;
  desc: string;
  atSec: number;
}> = ({ icon, term, desc, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      backgroundColor: colors.surface,
      border: `${2 * SCALE}px solid ${colors.primary300}`,
      borderRadius: 14 * SCALE,
      padding: `${10 * SCALE}px ${8 * SCALE}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5 * SCALE,
      ...useAppear(atSec, { dy: 14 }),
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
      }}
    >
      <Ms name={icon} size={20 * SCALE} />
    </span>
    <b style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
      <span style={markerStyle}>{term}</span>
    </b>
    <span
      style={{
        fontSize: 12 * SCALE,
        fontWeight: 700,
        lineHeight: 1.3,
        color: colors.textSecondary,
        textAlign: "center",
      }}
    >
      {desc}
    </span>
  </div>
);

const BehaviorTraitScene: React.FC = () => {
  const lead = useAppear(0.3);
  const note = useAppear(segStart(SEG_P4, 4), { dy: 10 });

  return (
    <SlideShell
      heading="行動的特徴による認証"
      icon={<Ms name="record_voice_over" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
    >
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
        <span
          style={{
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            textAlign: "center",
            ...lead,
          }}
        >
          体の形ではなく、<span style={markerStyle}>動きの癖</span>が証拠になる
        </span>
        <div style={{ display: "flex", alignItems: "stretch", gap: 8 * SCALE }}>
          <BehaviorCard
            icon="record_voice_over"
            term="声紋"
            desc="声の高さ・話し方の癖"
            atSec={segStart(SEG_P4, 2)}
          />
          <BehaviorCard
            icon="edit"
            term="署名"
            desc="書く速さ・筆圧の癖"
            atSec={segStart(SEG_P4, 3)}
          />
        </div>
        <span
          style={{
            fontSize: 13.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            textAlign: "center",
            ...note,
          }}
        >
          形だけまねても、<span style={markerStyle}>癖はまねられない</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 厳しさのトレードオフ — 折れ線2本（しきい値が右へ行くほど厳しい）+ 右に結論
// この回の急所。語りに合わせて FAR → FRR の順に線を描き、最後に結論を出す
// ---------------------------------------------------------------------------

const TradeoffNote: React.FC<{
  icon: string;
  text: React.ReactNode;
  tone: "pink" | "blue" | "muted";
  atSec: number;
}> = ({ icon, text, tone, atSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 7 * SCALE,
      fontSize: 12.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.3,
      color:
        tone === "pink"
          ? colors.accentPinkText
          : tone === "blue"
            ? colors.primary600
            : colors.textSecondary,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span style={{ flex: "none", display: "flex" }}>
      <Ms name={icon} size={15 * SCALE} />
    </span>
    {text}
  </div>
);

const TradeoffScene: React.FC = () => {
  const caption = useAppear(0.3);
  const axes = useProgress(0.4, 0.5);
  const farLabel = useAppear(segStart(SEG_P6, 1) + 0.9, { dy: 0 });
  const frrLabel = useAppear(segStart(SEG_P6, 2) + 0.9, { dy: 0 });
  const conclusion = useAppear(segStart(SEG_P6, 4), { dy: 12 });
  const tune = useAppear(segStart(SEG_P6, 5));

  return (
    <SlideShell
      heading="厳しさのトレードオフ"
      icon={<Ms name="balance" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2 * SCALE,
          }}
        >
          <span
            style={{
              fontSize: 10.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textMuted,
              ...caption,
            }}
          >
            縦軸＝率　／　横軸＝判定の厳しさ
          </span>
          {/*
            座標系は GraphSlide と同じ viewBox 220×150（軸は x:18→214 / y:8→138）。
            svg は preserveAspectRatio の既定（meet）で短い辺に合わせて縮むので、
            height を小さく取ると図が領域の真ん中に小さく描かれる（静止画で発覚した）。
            領域幅は約 730px なので、height 128×SCALE=512px あれば幅いっぱいに広がる。
          */}
          <svg viewBox="0 0 220 150" style={{ width: "100%", height: 128 * SCALE }}>
            <path
              d="M18 8v130h196"
              fill="none"
              stroke={colors.textMuted}
              strokeWidth={1.5}
              opacity={axes}
            />
            {/* 他人受入率: 厳しくするほど下がる */}
            <DrawPath
              d="M24 28 L204 122"
              delaySec={segStart(SEG_P6, 1)}
              durSec={0.9}
              stroke={colors.accentPink}
              strokeWidth={2.5}
            />
            {/* 本人拒否率: 厳しくするほど上がる */}
            <DrawPath
              d="M24 122 L204 28"
              delaySec={segStart(SEG_P6, 2)}
              durSec={0.9}
              stroke={colors.primary600}
              strokeWidth={2.5}
            />
            <text
              x={116}
              y={26}
              fontSize={10}
              fontWeight={800}
              fill={colors.primary600}
              opacity={frrLabel.opacity}
            >
              本人拒否率
            </text>
            <text
              x={116}
              y={132}
              fontSize={10}
              fontWeight={800}
              fill={colors.accentPinkText}
              opacity={farLabel.opacity}
            >
              他人受入率
            </text>
            <text x={22} y={148} fontSize={9} fontWeight={700} fill={colors.textMuted} opacity={axes}>
              ゆるい
            </text>
            <text
              x={212}
              y={148}
              fontSize={9}
              fontWeight={700}
              fill={colors.textMuted}
              textAnchor="end"
              opacity={axes}
            >
              厳しい
            </text>
          </svg>
        </div>

        <div
          style={{
            flex: 1.1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 7 * SCALE,
          }}
        >
          <TradeoffNote
            icon="trending_down"
            tone="pink"
            text="厳しく → 他人受入率↓"
            atSec={segStart(SEG_P6, 1)}
          />
          <TradeoffNote
            icon="trending_up"
            tone="blue"
            text="でも → 本人拒否率↑"
            atSec={segStart(SEG_P6, 2)}
          />
          <TradeoffNote
            icon="swap_horiz"
            tone="muted"
            text="ゆるくすれば、その逆"
            atSec={segStart(SEG_P6, 3)}
          />
          {/* 字幕（s06-5）と同じ文は書かず、結論の一語だけを大きく残す */}
          <span
            style={{
              fontSize: 15 * SCALE,
              fontWeight: 800,
              lineHeight: 1.35,
              marginTop: 3 * SCALE,
              ...conclusion,
            }}
          >
            <span style={markerPinkStyle}>両方をゼロにはできない</span>
          </span>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
              ...tune,
            }}
          >
            用途に合うちょうどよさに調整する
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: ICカードとPINコード — カード（所有）＋ PIN（記憶）の「＋」図
// 3要素の呼称（所有・記憶）は L19 に揃えている
// ---------------------------------------------------------------------------

const FactorLabel: React.FC<{ name: string; gloss: string; atSec: number }> = ({
  name,
  gloss,
  atSec,
}) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      gap: 5 * SCALE,
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      color: colors.primary800,
      backgroundColor: colors.primary100,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${10 * SCALE}px`,
      ...useAppear(atSec, { dy: 8 }),
    }}
  >
    {name}
    <span style={{ fontWeight: 700, color: colors.primary600 }}>{gloss}</span>
  </span>
);

const IcCardPinScene: React.FC = () => {
  const cardPanel = useAppear(0.4);
  const plus = usePop(segStart(SEG_P7, 2));
  const pinPanel = useAppear(segStart(SEG_P7, 2) + 0.15, { dy: 14 });
  const note = useAppear(segStart(SEG_P7, 4), { dy: 12 });
  const chipAt = segStart(SEG_P7, 3);

  return (
    <SlideShell
      heading="ICカードとPINコード"
      icon={<Ms name="badge" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
    >
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 * SCALE }}>
          {/* ICカード側（所有） */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
              ...cardPanel,
            }}
          >
            <Img
              src={staticFile("images/ipa_sg/tech-badge.png")}
              style={{
                width: "100%",
                height: 56 * SCALE,
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
            <b style={{ fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
              <span style={markerStyle}>ICカード</span>
            </b>
            <FactorLabel name="所有" gloss="持っているもの" atSec={chipAt} />
          </div>

          <span
            style={{
              flex: "none",
              fontSize: 22 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              lineHeight: 1,
              ...plus,
            }}
          >
            ＋
          </span>

          {/* PINコード側（記憶） */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
              ...pinPanel,
            }}
          >
            <div
              style={{
                height: 56 * SCALE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5 * SCALE,
              }}
            >
              {["●", "●", "●", "●"].map((d, i) => (
                <span
                  key={i}
                  style={{
                    width: 19 * SCALE,
                    height: 25 * SCALE,
                    borderRadius: 7 * SCALE,
                    backgroundColor: colors.surface,
                    border: `${1.5 * SCALE}px solid ${colors.primary500}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fontMono,
                    fontSize: 14 * SCALE,
                    lineHeight: 1,
                    color: colors.primary600,
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
            <b style={{ fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
              <span style={markerStyle}>PINコード</span>
            </b>
            <FactorLabel name="記憶" gloss="知っているもの" atSec={chipAt + 0.5} />
          </div>
        </div>

        {/* 字幕（s07-5）は文で語るので、画面は結論だけを残す */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7 * SCALE,
            borderTop: `${1.5 * SCALE}px solid ${colors.border}`,
            paddingTop: 9 * SCALE,
            fontSize: 14.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...note,
          }}
        >
          <Ms name="verified_user" size={16 * SCALE} />
          <span>
            種類の違う2つ ＝ <span style={markerStyle}>盗まれただけでは使えない</span>
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: EMV 3-Dセキュア — 決済画面のモック + 2ルートの分岐
// 「怪しい取引のときだけ追加認証」を、具体的な買い物の場面で見せる
// ---------------------------------------------------------------------------

const RouteRow: React.FC<{
  condition: string;
  result: string;
  icon: string;
  danger: boolean;
  atSec: number;
}> = ({ condition, result, icon, danger, atSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6 * SCALE,
      backgroundColor: danger ? colors.accentPinkSurface : colors.primary50,
      border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.primary500}`,
      borderRadius: 10 * SCALE,
      padding: `${7 * SCALE}px ${11 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        flex: 1,
        minWidth: 0,
        fontSize: 11.5 * SCALE,
        fontWeight: 700,
        lineHeight: 1.3,
        color: colors.textSecondary,
      }}
    >
      {condition}
    </span>
    <span
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 5 * SCALE,
        fontSize: 13 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        color: danger ? colors.accentPinkText : colors.primary600,
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      {result}
    </span>
  </div>
);

const ThreeDSecureScene: React.FC = () => {
  const mock = useAppear(0.4);
  const lead = useAppear(segStart(SEG_P9, 1));
  const note = useAppear(segStart(SEG_P9, 4), { dy: 10 });

  return (
    <SlideShell
      heading="EMV 3-Dセキュア"
      icon={<Ms name="payments" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        {/* ネットショップの決済画面（具体的な場面） */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 13 * SCALE,
            padding: `${9 * SCALE}px ${13 * SCALE}px`,
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
            ...mock,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 10 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.textSecondary,
            }}
          >
            <Ms name="storefront" size={12 * SCALE} />
            ネットショップの支払い
          </span>
          <span style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>￥42,800</span>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 11 * SCALE,
              fontWeight: 700,
              lineHeight: 1.2,
              color: colors.textSecondary,
            }}
          >
            ●●●● ●●●● ●●●● 1234
          </span>
          <span
            style={{
              marginTop: 1 * SCALE,
              textAlign: "center",
              fontSize: 11 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.surface,
              backgroundColor: colors.primary600,
              borderRadius: 7 * SCALE,
              padding: `${5 * SCALE}px 0`,
            }}
          >
            この内容で支払う
          </span>
        </div>

        <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 7 * SCALE }}>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
              ...lead,
            }}
          >
            毎回の確認は面倒 → 必要なときだけ
          </span>
          <RouteRow
            condition="ふだんの端末"
            result="そのまま完了"
            icon="check_circle"
            danger={false}
            atSec={segStart(SEG_P9, 2)}
          />
          <RouteRow
            condition="違う端末や高額"
            result="追加の確認"
            icon="gpp_maybe"
            danger
            atSec={segStart(SEG_P9, 3)}
          />
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...note }}>
            <span style={markerStyle}>リスクベース認証</span>の決済版
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

export const SgL20Biometrics: VideoSpec = {
  id: "sg-L20-biometrics",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "体そのものが\n鍵になる",
      keywords: ["生体認証", "FRR・FAR", "eKYC"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "biometrics-intro",
      durationSec: 7,
      narration: SEG_P2,
      component: BiometricsIntroScene,
    },
    {
      pattern: "custom",
      name: "physical-trait",
      durationSec: 7,
      narration: SEG_P3,
      component: PhysicalTraitScene,
    },
    {
      pattern: "custom",
      name: "behavior-trait",
      durationSec: 7,
      narration: SEG_P4,
      component: BehaviorTraitScene,
    },
    {
      pattern: "vs",
      heading: "二つの割合をおさえる",
      icon: "percent",
      left: {
        title: "本人拒否率（FRR）",
        icon: "person",
        rows: [
          { k: "意味", v: "本人なのに拒む" },
          { k: "起きる例", v: "指が乾いて読めない" },
          { k: "困ること", v: "不便になる" },
        ],
      },
      right: {
        title: "他人受入率（FAR）",
        icon: "group",
        rows: [
          { k: "意味", v: "他人を本人と通す" },
          { k: "起きる例", v: "似た他人が通る" },
          { k: "困ること", v: "危険になる" },
        ],
      },
      // 左列は s05-2（FRR の説明）、右列は s05-4（FAR の説明）に同期
      columnAtSec: [segStart(SEG_P5, 1), segStart(SEG_P5, 3)],
      narration: SEG_P5,
    },
    {
      pattern: "custom",
      name: "frr-far-tradeoff",
      durationSec: 8,
      narration: SEG_P6,
      component: TradeoffScene,
    },
    {
      pattern: "custom",
      name: "ic-card-pin",
      durationSec: 7,
      narration: SEG_P7,
      transitionIn: "wipe-light", // 生体 →「本人確認のしくみ」への場面転換
      component: IcCardPinScene,
    },
    {
      pattern: "flow",
      heading: "eKYC ＝ オンラインの本人確認",
      icon: "smartphone",
      steps: [
        { abc: "1", name: "書類撮影", sub: "運転免許証など" },
        { abc: "2", name: "顔を撮影", sub: "その場で自撮り" },
        { abc: "3", name: "照合", sub: "同じ人か確かめる" },
      ],
      // 手順を語る s08-3 / s08-4 / s08-5 に点灯を合わせる
      highlightAtSec: [segStart(SEG_P8, 2), segStart(SEG_P8, 3), segStart(SEG_P8, 4)],
      narration: SEG_P8,
    },
    {
      pattern: "custom",
      name: "emv-3d-secure",
      durationSec: 8,
      narration: SEG_P9,
      component: ThreeDSecureScene,
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
      question: "判定を厳しくするとどうなる？",
      choices: [
        { key: "A", text: "他人受入率が上がる" },
        { key: "B", text: "本人拒否率が上がる", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "ICカードとPINコードは？",
      choices: [
        { key: "A", text: "所有と記憶の組み合わせ", correct: true },
        { key: "B", text: "記憶と記憶の組み合わせ" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "声紋はどちらの認証？",
      choices: [
        { key: "A", text: "身体的特徴による認証" },
        { key: "B", text: "行動的特徴による認証", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "生体認証は身体的特徴と行動的特徴に分かれる。", checkAtSec: segStart(SEG_P14, 0) },
        { text: "厳しくすればFRRが上がり、ゆるめればFARが上がる。", checkAtSec: segStart(SEG_P14, 1) },
        { text: "ICカードとPIN、eKYC、EMV 3-Dセキュアも本人確認。", checkAtSec: segStart(SEG_P14, 2) },
      ],
      narration: SEG_P14,
      transitionIn: "wipe",
    },
  ],
};
