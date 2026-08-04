import React from "react";
import { Img, interpolateColors, staticFile } from "remotion";
import { colors, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { NEVER_SEC, useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L52-other-security-laws.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L52: その他のセキュリティ関連法規（第6章＝法務の6本目）
 *
 * 発注書 content_works/ipa_sg/orders/L52.md に対応。
 * シナリオと用語の呼称は narration/ipa_sg/sg-L52-other-security-laws.md が正。
 *
 * 導入（ハンコを押さない契約は成立するのか）→ 見取り図（場面ごとに担当する法律）→
 * 電子署名法 → 成立の推定 → 認定認証事業者 →（wipe-light）特定電子メール法とオプトイン →
 * ★抽象→具体：登録フォームのチェック欄 → 送信者の義務 → 情報流通プラットフォーム対処法 →
 * クイズ3問 → wipe でまとめ。
 *
 * ※ 罰則は「認められません」「義務づけられます」までにとどめ、刑名・年数・金額は出さない
 *   （L47〜L51 と揃えた方針）。
 * ※ 技術の側は「デジタル署名」（L17 の呼称）、法律が効力を与える側は「電子署名」で呼び分ける。
 * ※ s09 の受信拒否は L49 の「オプトアウト」制度とは別物なので、意図的にその語を使わない。
 * ※ 読みの例外: 音声側（jobs.json）だけ仮名書きしている箇所がある —
 *   及び→および（法律名）、誹謗中傷→ひぼう中傷、SNS→エスエヌエス。
 *   字幕（下の N() 第2引数）と画面テキストは漢字・英字表記が正で、音声と食い違って見えるが
 *   意図的（references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L52-other-security-laws");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "契約書にハンコを押さず、画面の上で署名する。"),
  N("s02-2.mp3", "これで本当に、契約は成立するのでしょうか。"),
  N("s02-3.mp3", "答えを決めているのは、技術ではなく法律です。"),
  N("s02-4.mp3", "今回は、身近な場面を支える三つの法律を見ていきます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "今回の舞台は、電子の署名、広告のメール、ネット上の投稿です。"),
  N("s03-2.mp3", "一つ目の電子署名法は、電子の文書に紙と同じ効力を与えます。"),
  N("s03-3.mp3", "二つ目の特定電子メール法は、広告メールの送り方を決めます。"),
  N("s03-4.mp3", "三つ目の情報流通プラットフォーム対処法は、投稿への対応です。"),
  N("s03-5.mp3", "場面ごとに、担当する法律が決まっています。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "まずは、電子署名法です。"),
  N("s04-2.mp3", "正式には、電子署名及び認証業務に関する法律といいます。"),
  N("s04-3.mp3", "以前学んだデジタル署名は、本人が作ったことを示す技術でした。"),
  N("s04-4.mp3", "その技術による署名に、法律の効力を与えるのが、この法律です。"),
  N("s04-5.mp3", "紙のハンコにあたる役割を、電子の署名に持たせます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "この法律の中心にあるのが、成立の推定という考え方です。"),
  N("s05-2.mp3", "電子文書に、本人による電子署名があるとします。"),
  N("s05-3.mp3", "するとその文書は、真正に成立したものと推定されます。"),
  N("s05-4.mp3", "つまり、本人が押印した紙の文書と同じ扱いになります。"),
  N("s05-5.mp3", "電子契約サービスで結んだ契約書も、証拠として通用します。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "では、その署名が本人のものだと、誰が示すのでしょうか。"),
  N("s06-2.mp3", "その役目を担うのが、電子証明書を発行する認証業務です。"),
  N("s06-3.mp3", "一定の基準を満たす事業者を、国が認定します。"),
  N("s06-4.mp3", "これを、認定認証事業者といいます。"),
  N("s06-5.mp3", "以前学んだ認証局を、法制度の側から見たものです。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "次は、広告のメールに関する法律です。"),
  N("s07-2.mp3", "特定電子メール法といい、広告宣伝のメールが対象です。"),
  N("s07-3.mp3", "原則は、以前学んだオプトインです。"),
  N("s07-4.mp3", "あらかじめ同意した人にしか、送ってはいけません。"),
  N("s07-5.mp3", "同意していない相手へ一方的に送ることは、認められません。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "場面で見てみましょう。ネットショップの会員登録フォームです。"),
  N("s08-2.mp3", "広告メールを受け取る、というチェック欄があります。"),
  N("s08-3.mp3", "ここにチェックを入れた人だけが、送ってよい相手です。"),
  N("s08-4.mp3", "しかも、同意をもらった記録は保存しておく必要があります。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "送るときにも、決められた表示があります。"),
  N("s09-2.mp3", "送信者の氏名や名称、そして連絡先を書かなければなりません。"),
  N("s09-3.mp3", "さらに、受信を拒否するための連絡先も示します。"),
  N("s09-4.mp3", "メールの下にある配信停止のリンクが、まさにこれです。"),
  N("s09-5.mp3", "拒否した人へ、その後も送り続けることはできません。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "最後は、ネット上の投稿をめぐる法律です。"),
  N("s10-2.mp3", "情報流通プラットフォーム対処法といいます。"),
  N("s10-3.mp3", "SNSなどの、大規模なプラットフォームが対象です。"),
  N("s10-4.mp3", "誹謗中傷の投稿を削除するかどうか、対応する体制を求めます。"),
  N("s10-5.mp3", "どんな基準で判断し、どう対応したかの公表も必要です。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "本人による電子署名がある電子文書は、どう扱われるでしょうか。"),
  N("s12-3.mp3", "正解は、押印された紙と同じように扱われる、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "広告宣伝のメールを送れるのは、どの相手でしょうか。"),
  N("s13-3.mp3", "正解は、あらかじめ同意した人だけ、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "大規模なプラットフォームに求められるのは、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、削除対応の体制を整えて公表することです。", { gapBeforeSec: 1.8 }),
];

const SEG_P15 = [
  N("s15-1.mp3", "電子署名法は、本人の電子署名に紙と同じ効力を与えます。"),
  N("s15-2.mp3", "広告のメールは原則オプトイン。同意した人にだけ送れます。"),
  N("s15-3.mp3", "プラットフォームには、削除対応の体制と公表が求められます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（用語ドンと同じ形。その語が何の一種か） */
const Chip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => (
  <span
    style={{
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      color: colors.primary800,
      backgroundColor: colors.primary100,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      ...useAppear(atSec),
    }}
  >
    {text}
  </span>
);

// ---------------------------------------------------------------------------
// P2: 導入 — ハンコを押さない契約は成立するのか
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const scene = useAppear(0.3, { dy: 10 });
  const question = useAppear(segStart(SEG_P2, 1), { dy: 10 });
  const answer = useAppear(segStart(SEG_P2, 2), { dy: 8 });
  const illust = useAppear(0.5);

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.35,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 7 * SCALE,
          }}
        >
          <span
            style={{
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 12 * SCALE,
              padding: `${6 * SCALE}px ${11 * SCALE}px`,
              lineHeight: 1.3,
              ...scene,
            }}
          >
            <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
              <Ms name="edit" size={15 * SCALE} />
            </span>
            ハンコを押さず、画面の上で署名
          </span>

          <b style={{ minWidth: 0, fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.25, ...question }}>
            {/* 26×SCALE では1行に入らず「る？」だけが2行目に落ちるので明示改行 */}
            これで契約は
            <br />
            <span style={markerPinkStyle}>成立</span>する？
          </b>

          <span style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.35, ...answer }}>
            決めているのは技術ではなく、<span style={markerStyle}>法律</span>
          </span>
        </div>

        <Img
          src={staticFile("images/ipa_sg/tech-signature.png")}
          style={{
            flex: 0.85,
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
// P3: 見取り図 — 場面ごとに担当する法律（全幅の横帯3本）
// ---------------------------------------------------------------------------

const SceneBand: React.FC<{
  icon: string;
  scene: string;
  law: string;
  role: string;
  atSec: number;
  lawAtSec: number;
}> = ({ icon, scene, law, role, atSec, lawAtSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const lawAppear = useAppear(lawAtSec, { dy: 6 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        borderRadius: 14 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        padding: `${5 * SCALE}px ${11 * SCALE}px`,
        ...appear,
      }}
    >
      <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={16 * SCALE} />
      </span>
      {/* 「ネット上の投稿」7文字が1行に収まる幅・文字サイズにする
          （13×SCALE / 幅64×SCALE では2行に割れて帯が高くなり、本文が見出しへ食い込んだ） */}
      <b
        style={{
          flex: "none",
          width: 80 * SCALE,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          color: colors.textSecondary,
        }}
      >
        {scene}
      </b>
      <span style={{ flex: "none", color: colors.textMuted, display: "flex" }}>
        <Ms name="arrow_forward" size={15 * SCALE} />
      </span>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1 * SCALE,
          ...lawAppear,
        }}
      >
        <b style={{ minWidth: 0, fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
          <span style={markerStyle}>{law}</span>
        </b>
        <span
          style={{
            minWidth: 0,
            fontSize: 9 * SCALE,
            fontWeight: 700,
            color: colors.textMuted,
            lineHeight: 1.25,
          }}
        >
          {role}
        </span>
      </div>
    </div>
  );
};

const LawMapScene: React.FC = () => {
  const foot = useAppear(segStart(SEG_P3, 4), { dy: 8 });

  return (
    <SlideShell
      heading="今回の三つの法律"
      icon={<Ms name="gavel" size={videoType.slideHeadIcon} />}
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
        {/* 場面（帯の骨格）を先に出し、法律名だけを語りに同期させる */}
        <SceneBand
          icon="edit"
          scene="電子の署名"
          law="電子署名法"
          role="電子の文書に、紙と同じ効力を与える"
          atSec={0.4}
          lawAtSec={segStart(SEG_P3, 1)}
        />
        <SceneBand
          icon="mail"
          scene="広告のメール"
          law="特定電子メール法"
          role="広告メールの送り方を決める"
          atSec={0.8}
          lawAtSec={segStart(SEG_P3, 2)}
        />
        <SceneBand
          icon="forum"
          scene="ネット上の投稿"
          law="情報流通プラットフォーム対処法"
          role="投稿への対応を求める"
          atSec={1.2}
          lawAtSec={segStart(SEG_P3, 3)}
        />

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span
          style={{ marginTop: 2 * SCALE, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...foot }}
        >
          迷ったら、まず<span style={markerPinkStyle}>どの場面の話か</span>を見る
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 電子署名法（キーワード見出し + 技術／効力の2段バッジ）
// ---------------------------------------------------------------------------

const LayerCard: React.FC<{
  tag: string;
  title: string;
  desc: string;
  accent?: boolean;
  atSec: number;
}> = ({ tag, title, desc, accent, atSec }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 2 * SCALE,
      borderRadius: 13 * SCALE,
      backgroundColor: accent ? colors.primary50 : colors.surface,
      border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
      padding: `${7 * SCALE}px ${10 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        fontSize: 9 * SCALE,
        fontWeight: 800,
        color: accent ? colors.primary800 : colors.textMuted,
        lineHeight: 1.2,
      }}
    >
      {tag}
    </span>
    <b style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{title}</b>
    <span
      style={{
        minWidth: 0,
        fontSize: 10 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        lineHeight: 1.3,
      }}
    >
      {desc}
    </span>
  </div>
);

const ESignLawScene: React.FC = () => {
  const term = useAppear(0.4, { dy: 8 });
  const formal = useAppear(segStart(SEG_P4, 1), { dy: 6 });
  const band = useAppear(segStart(SEG_P4, 4), { dy: 8 });
  const arrow = useAppear(segStart(SEG_P4, 3), { dy: 0 });

  return (
    <SlideShell narration={SEG_P4}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.05,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6 * SCALE,
          }}
        >
          <Chip text="一つ目の法律" atSec={0.3} />
          <b style={{ minWidth: 0, fontSize: 32 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>電子署名法</span>
          </b>
          <span
            style={{
              minWidth: 0,
              fontSize: 11 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.35,
              ...formal,
            }}
          >
            正式名称 — 電子署名及び
            <br />
            認証業務に関する法律
          </span>
          <span style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.35, ...band }}>
            紙のハンコにあたる役割を
            <br />
            <span style={markerPinkStyle}>電子の署名</span>に持たせる
          </span>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 3 * SCALE,
          }}
        >
          <LayerCard
            tag="技術（前回まで）"
            title="デジタル署名"
            desc="本人が作ったことを示す仕組み"
            atSec={segStart(SEG_P4, 2)}
          />
          <span
            style={{
              alignSelf: "center",
              color: colors.textMuted,
              display: "flex",
              ...arrow,
            }}
          >
            <Ms name="arrow_downward" size={17 * SCALE} />
          </span>
          <LayerCard
            tag="法律（今回）"
            title="電子署名法"
            desc="その署名に法律の効力を与える"
            accent
            atSec={segStart(SEG_P4, 3) + 0.4}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 成立の推定（紙 ＝ 電子 の2カード + 結論帯）
// ---------------------------------------------------------------------------

const DocCard: React.FC<{
  tag: string;
  icon: string;
  title: string;
  seal: string;
  accent?: boolean;
  atSec: number;
  sealAtSec: number;
}> = ({ tag, icon, title, seal, accent, atSec, sealAtSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3.5 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
      padding: `${7 * SCALE}px ${8 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        fontSize: 9.5 * SCALE,
        fontWeight: 800,
        color: accent ? colors.primary800 : colors.textMuted,
        lineHeight: 1.2,
      }}
    >
      {tag}
    </span>
    <span
      style={{
        width: 26 * SCALE,
        height: 26 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: accent ? colors.primary50 : colors.bg,
        color: accent ? colors.primary600 : colors.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
    </span>
    <b style={{ minWidth: 0, fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{title}</b>
    <span
      style={{
        minWidth: 0,
        fontSize: 10.5 * SCALE,
        fontWeight: 800,
        color: accent ? colors.primary800 : colors.textSecondary,
        backgroundColor: accent ? colors.primary50 : colors.bg,
        border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
        borderRadius: 999,
        padding: `${2 * SCALE}px ${10 * SCALE}px`,
        lineHeight: 1.25,
        ...useAppear(sealAtSec, { dy: 4 }),
      }}
    >
      {seal}
    </span>
  </div>
);

const PresumptionScene: React.FC = () => {
  const equal = usePop(segStart(SEG_P5, 3));
  const band = useAppear(segStart(SEG_P5, 3) + 0.4, { dy: 8 });
  const example = useAppear(segStart(SEG_P5, 4), { dy: 8 });

  return (
    <SlideShell
      heading="成立の推定"
      icon={<Ms name="balance" size={videoType.slideHeadIcon} />}
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
        {/* リード文は置かない — 本文領域（見出しありで約655px）に2枚のカード・結論帯・
            例チップが入り切らず、初版はリード文が見出しに重なっていた */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
          <DocCard
            tag="紙の世界"
            icon="description"
            title="紙の契約書"
            seal="本人の押印"
            atSec={0.5}
            sealAtSec={0.9}
          />
          <b
            style={{
              flex: "none",
              width: 24 * SCALE,
              textAlign: "center",
              fontSize: 24 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              lineHeight: 1,
              ...equal,
            }}
          >
            ＝
          </b>
          <DocCard
            tag="電子の世界"
            icon="article"
            title="電子文書"
            seal="本人による電子署名"
            accent
            atSec={segStart(SEG_P5, 1)}
            sealAtSec={segStart(SEG_P5, 1) + 0.5}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            padding: `${5 * SCALE}px ${11 * SCALE}px`,
            ...band,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="verified" size={14 * SCALE} />
          </span>
          {/* 字幕（＝ナレーション全文）と同じ文にしない */}
          <span
            style={{
              minWidth: 0,
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              lineHeight: 1.3,
            }}
          >
            押印した紙の文書と、同じ扱い
          </span>
        </div>

        <span
          style={{
            minWidth: 0,
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 5 * SCALE,
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 999,
            padding: `${3.5 * SCALE}px ${11 * SCALE}px`,
            lineHeight: 1.3,
            ...example,
          }}
        >
          <span style={{ flex: "none", color: colors.textMuted, display: "flex" }}>
            <Ms name="handshake" size={13 * SCALE} />
          </span>
          例 — 電子契約サービスで結んだ契約書
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 認定認証事業者と電子証明書（横フロー3ノード）
// ---------------------------------------------------------------------------

const CertNode: React.FC<{
  icon: string;
  label: string;
  sub: string;
  accent?: boolean;
  atSec: number;
}> = ({ icon, label, sub, accent, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: accent ? colors.primary50 : colors.surface,
      border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
      padding: `${8 * SCALE}px ${6 * SCALE}px`,
      ...usePop(atSec),
    }}
  >
    <span
      style={{
        width: 28 * SCALE,
        height: 28 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: accent ? colors.primary100 : colors.bg,
        color: accent ? colors.primary600 : colors.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={16 * SCALE} />
    </span>
    <b
      style={{
        minWidth: 0,
        fontSize: 13 * SCALE,
        fontWeight: 800,
        lineHeight: 1.25,
        textAlign: "center",
      }}
    >
      {label}
    </b>
    <span
      style={{
        minWidth: 0,
        fontSize: 9.5 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        lineHeight: 1.3,
        textAlign: "center",
      }}
    >
      {sub}
    </span>
  </div>
);

const StepArrow: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => (
  <div
    style={{
      flex: "none",
      width: 42 * SCALE,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1 * SCALE,
      ...useAppear(atSec, { dy: 0 }),
    }}
  >
    <span
      style={{
        minWidth: 0,
        fontSize: 10 * SCALE,
        fontWeight: 800,
        color: colors.primary800,
        lineHeight: 1.25,
        textAlign: "center",
      }}
    >
      {label}
    </span>
    <span style={{ color: colors.primary500, display: "flex" }}>
      <Ms name="arrow_forward" size={17 * SCALE} />
    </span>
  </div>
);

const CertBusinessScene: React.FC = () => {
  const lead = useAppear(0.3);
  const term = useAppear(segStart(SEG_P6, 3), { dy: 8 });
  const note = useAppear(segStart(SEG_P6, 4), { dy: 8 });

  return (
    <SlideShell
      heading="その署名は本人のもの、と示す"
      icon={<Ms name="verified_user" size={videoType.slideHeadIcon} />}
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
        <span style={{ fontSize: 11 * SCALE, fontWeight: 800, color: colors.textMuted, ...lead }}>
          電子証明書を発行するのが、認証業務
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 3 * SCALE }}>
          <CertNode
            icon="account_balance"
            label="国"
            sub="一定の基準を定める"
            atSec={0.5}
          />
          <StepArrow label="認定" atSec={segStart(SEG_P6, 2)} />
          <CertNode
            icon="badge"
            label="認定認証事業者"
            /* ノードの幅で1行に収まるのは9文字まで（10文字だと「者」だけ2行目に落ちた） */
            sub="国が認定した事業者"
            accent
            atSec={segStart(SEG_P6, 1)}
          />
          <StepArrow label="発行" atSec={segStart(SEG_P6, 1) + 0.6} />
          <CertNode
            icon="description"
            label="電子証明書"
            sub="本人のものだと示す"
            atSec={segStart(SEG_P6, 1) + 0.9}
          />
        </div>

        <span style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.3, ...term }}>
          国が認定するから、<span style={markerStyle}>認定認証事業者</span>
        </span>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span
          style={{
            minWidth: 0,
            fontSize: 11 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
            ...note,
          }}
        >
          技術の側から見れば認証局、法制度の側から見れば認証業務
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 特定電子メール法とオプトイン（中央の大きな用語 + ○／×の2カード）
// ---------------------------------------------------------------------------

const JudgeCard: React.FC<{
  markIcon: string;
  cond: string;
  result: string;
  ng?: boolean;
  atSec: number;
}> = ({ markIcon, cond, result, ng, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: 8 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: ng ? colors.incorrectSurface : colors.correctSurface,
      border: `${1.5 * SCALE}px solid ${ng ? colors.incorrectBorder : colors.correctBorder}`,
      padding: `${8 * SCALE}px ${11 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        flex: "none",
        color: ng ? colors.incorrect : colors.correct,
        display: "flex",
      }}
    >
      <Ms name={markIcon} size={24 * SCALE} />
    </span>
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1.5 * SCALE }}>
      <span
        style={{
          minWidth: 0,
          fontSize: 10 * SCALE,
          fontWeight: 800,
          color: ng ? colors.incorrectText : colors.correctText,
          lineHeight: 1.25,
        }}
      >
        {cond}
      </span>
      <b
        style={{
          minWidth: 0,
          fontSize: 14 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          color: ng ? colors.incorrectText : colors.correctText,
        }}
      >
        {result}
      </b>
    </div>
  </div>
);

const OptInScene: React.FC = () => {
  const target = useAppear(segStart(SEG_P7, 1), { dy: 8 });
  const term = usePop(segStart(SEG_P7, 2));

  return (
    <SlideShell
      heading="特定電子メール法"
      icon={<Ms name="mail" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 6 * SCALE,
        }}
      >
        <span
          style={{
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 5 * SCALE,
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            lineHeight: 1.3,
            ...target,
          }}
        >
          <span style={{ flex: "none", color: colors.textMuted, display: "flex" }}>
            <Ms name="campaign" size={14 * SCALE} />
          </span>
          対象は、広告宣伝のメール
        </span>

        <div style={{ display: "flex", alignItems: "baseline", gap: 7 * SCALE, ...term }}>
          <span style={{ fontSize: 13 * SCALE, fontWeight: 800, color: colors.textMuted }}>
            原則は
          </span>
          <b style={{ fontSize: 34 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
            <span style={markerStyle}>オプトイン</span>
          </b>
        </div>

        <div style={{ alignSelf: "stretch", display: "flex", gap: 6 * SCALE }}>
          <JudgeCard
            markIcon="check_circle"
            cond="あらかじめ同意している"
            result="送ってよい"
            atSec={segStart(SEG_P7, 3)}
          />
          <JudgeCard
            markIcon="cancel"
            cond="同意していない"
            result="一方的には送れない"
            ng
            atSec={segStart(SEG_P7, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: ★抽象→具体 — 会員登録フォームのチェック欄
// ---------------------------------------------------------------------------

const FormRow: React.FC<{ label: string; value: string; atSec: number }> = ({
  label,
  value,
  atSec,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 1.5 * SCALE, ...useAppear(atSec) }}>
    <span style={{ fontSize: 9 * SCALE, fontWeight: 800, color: colors.textMuted, lineHeight: 1.2 }}>
      {label}
    </span>
    <span
      style={{
        minWidth: 0,
        fontSize: 11.5 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        lineHeight: 1.3,
        padding: `${4 * SCALE}px ${8 * SCALE}px`,
        borderRadius: 8 * SCALE,
        backgroundColor: colors.bg,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
      }}
    >
      {value}
    </span>
  </div>
);

const ConsentFormScene: React.FC = () => {
  const mock = useAppear(0.3, { dy: 10 });
  /* チェック欄の行はカード表示と同時に置き、語りに同期するのは「点灯」と「チェックが入る」だけ。
     行そのものを後から出すと、カードの高さは確定済みなので白い空欄が数秒居座る */
  const checkbox = useProgress(segStart(SEG_P8, 1), 0.4);
  const checked = usePop(segStart(SEG_P8, 2));
  const judge = useAppear(segStart(SEG_P8, 2) + 0.5, { dy: 8 });
  const illust = useAppear(segStart(SEG_P8, 2) + 0.3);
  const record = useAppear(segStart(SEG_P8, 3), { dy: 8 });

  return (
    <SlideShell
      heading="同意が「送ってよい相手」を決める"
      icon={<Ms name="task_alt" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
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
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
          {/* ネットショップの会員登録フォーム（実物のモック） */}
          <div
            style={{
              flex: 1.5,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 5 * SCALE,
              borderRadius: 14 * SCALE,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              padding: `${9 * SCALE}px ${11 * SCALE}px`,
              ...mock,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5 * SCALE,
                fontSize: 11 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
              }}
            >
              <Ms name="storefront" size={13 * SCALE} />
              会員登録フォーム
            </span>
            {/* 行を増やすとカードが本文領域を超えて見出しに被る（初版は「お名前」行もあった） */}
            <FormRow label="メールアドレス" value="taro@example.com" atSec={0.55} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7 * SCALE,
                borderRadius: 10 * SCALE,
                backgroundColor: interpolateColors(checkbox, [0, 1], [colors.bg, colors.primary50]),
                border: `${1.5 * SCALE}px solid ${interpolateColors(
                  checkbox,
                  [0, 1],
                  [colors.border, colors.primary500],
                )}`,
                padding: `${6 * SCALE}px ${9 * SCALE}px`,
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: 15 * SCALE,
                  height: 15 * SCALE,
                  borderRadius: 5 * SCALE,
                  backgroundColor: colors.surface,
                  border: `${1.5 * SCALE}px solid ${interpolateColors(
                    checkbox,
                    [0, 1],
                    [colors.textMuted, colors.primary600],
                  )}`,
                  color: colors.primary600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ display: "flex", ...checked }}>
                  <Ms name="check_circle" size={11 * SCALE} />
                </span>
              </span>
              <b
                style={{
                  minWidth: 0,
                  fontSize: 12 * SCALE,
                  fontWeight: 800,
                  color: interpolateColors(checkbox, [0, 1], [colors.textSecondary, colors.primary800]),
                  lineHeight: 1.3,
                }}
              >
                広告メールを受け取る
              </b>
            </div>
          </div>

          <Img
            src={staticFile("images/ipa_sg/person-customer.png")}
            style={{
              flex: 0.55,
              minWidth: 0,
              alignSelf: "stretch",
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illust,
            }}
          />

          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 5 * SCALE,
              ...judge,
            }}
          >
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.correctText,
                backgroundColor: colors.correctSurface,
                border: `${1.5 * SCALE}px solid ${colors.correctBorder}`,
                borderRadius: 999,
                padding: `${2.5 * SCALE}px ${10 * SCALE}px`,
                lineHeight: 1.25,
              }}
            >
              チェックを入れた
            </span>
            <b style={{ minWidth: 0, fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
              <span style={markerStyle}>送ってよい相手</span>
              <br />
              になる
            </b>
          </div>
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            padding: `${5 * SCALE}px ${11 * SCALE}px`,
            ...record,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="archive" size={14 * SCALE} />
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              lineHeight: 1.3,
            }}
          >
            同意の記録は、保存が必要
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 送信者の義務（1通のメールのモック + 注記）
// ---------------------------------------------------------------------------

/**
 * メール1通の行。**行は最初から全部置き**、義務にあたる行だけを語りに同期して点灯させる
 * （行そのものを後から出すと、カードの高さは確定済みなので白い空箱が10秒近く居座る。
 *  references/custom-scenes.md「実物のモック + 危ない箇所の注記」の作り方に合わせた）。
 */
const MailPart: React.FC<{
  note: string;
  body: React.ReactNode;
  highlightAtSec?: number;
}> = ({ note, body, highlightAtSec }) => {
  const on = useProgress(highlightAtSec ?? NEVER_SEC, 0.4);
  const noteAppear = useAppear(highlightAtSec ?? 0.5, { dy: 0 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE }}>
      <span
        style={{
          flex: "none",
          width: 84 * SCALE,
          textAlign: "right",
          fontSize: 10 * SCALE,
          fontWeight: 800,
          color: interpolateColors(on, [0, 1], [colors.textMuted, colors.primary800]),
          lineHeight: 1.25,
          ...noteAppear,
        }}
      >
        {note}
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 11 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
          color: interpolateColors(on, [0, 1], [colors.textSecondary, colors.primary800]),
          backgroundColor: interpolateColors(on, [0, 1], [colors.bg, colors.primary50]),
          border: `${1.5 * SCALE}px solid ${interpolateColors(
            on,
            [0, 1],
            [colors.border, colors.primary500],
          )}`,
          borderRadius: 9 * SCALE,
          padding: `${4 * SCALE}px ${9 * SCALE}px`,
        }}
      >
        {body}
      </span>
    </div>
  );
};

const MailDutyScene: React.FC = () => {
  const card = useAppear(0.3, { dy: 10 });
  const conc = useAppear(segStart(SEG_P9, 4), { dy: 8 });

  return (
    <SlideShell
      heading="送るときの決まりごと"
      icon={<Ms name="checklist" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4 * SCALE,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            padding: `${7 * SCALE}px ${11 * SCALE}px`,
            ...card,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
            }}
          >
            <Ms name="mail" size={13 * SCALE} />
            届いた広告メール
          </span>
          <MailPart note="件名" body="春の新商品キャンペーンのご案内" />
          <MailPart
            note="表示義務 ①"
            body="送信者 — 株式会社◯◯（氏名・名称）"
            highlightAtSec={segStart(SEG_P9, 1)}
          />
          <MailPart
            note="表示義務 ②"
            body="連絡先 — 住所・電話番号・メールアドレス"
            highlightAtSec={segStart(SEG_P9, 1) + 0.7}
          />
          <MailPart
            note="受信拒否の導線"
            body="配信停止はこちら（受信拒否の連絡先）"
            highlightAtSec={segStart(SEG_P9, 2)}
          />
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...conc }}>
          拒否した人への送信は、<span style={markerPinkStyle}>そこで終わり</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 情報流通プラットフォーム対処法（対象行 + 義務カード2枚）
// ---------------------------------------------------------------------------

const DutyCard: React.FC<{ no: string; icon: string; title: string; desc: string; atSec: number }> = ({
  no,
  icon,
  title,
  desc,
  atSec,
}) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 4 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.primary500}`,
      padding: `${8 * SCALE}px ${11 * SCALE}px`,
      ...useAppear(atSec, { dy: 12 }),
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
      <span
        style={{
          flex: "none",
          width: 14 * SCALE,
          height: 14 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {no}
      </span>
      <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={15 * SCALE} />
      </span>
      <b style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{title}</b>
    </div>
    <span
      style={{
        minWidth: 0,
        fontSize: 11 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        lineHeight: 1.35,
      }}
    >
      {desc}
    </span>
  </div>
);

const PlatformActScene: React.FC = () => {
  const name = useAppear(segStart(SEG_P10, 1), { dy: 8 });
  const target = useAppear(segStart(SEG_P10, 2), { dy: 6 });
  const illust = useAppear(0.5);

  return (
    <SlideShell
      heading="ネット上の投稿への対応"
      icon={<Ms name="forum" size={videoType.slideHeadIcon} />}
      narration={SEG_P10}
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE }}>
          <Img
            src={staticFile("images/ipa_sg/net-globe.png")}
            style={{
              flex: "none",
              width: 44 * SCALE,
              height: 44 * SCALE,
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illust,
            }}
          />
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4 * SCALE,
            }}
          >
            <b style={{ minWidth: 0, fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.25, ...name }}>
              <span style={markerStyle}>情報流通プラットフォーム対処法</span>
            </b>
            <span
              style={{
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                gap: 5 * SCALE,
                fontSize: 11 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                backgroundColor: colors.surface,
                border: `${1.5 * SCALE}px solid ${colors.border}`,
                borderRadius: 999,
                padding: `${3 * SCALE}px ${11 * SCALE}px`,
                lineHeight: 1.3,
                ...target,
              }}
            >
              <span style={{ flex: "none", color: colors.textMuted, display: "flex" }}>
                <Ms name="groups" size={13 * SCALE} />
              </span>
              対象 — SNSなどの大規模なプラットフォーム
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6 * SCALE }}>
          <DutyCard
            no="1"
            icon="report"
            title="削除対応の体制"
            desc="誹謗中傷の投稿を削除するか、受け付けて判断する仕組みを整える"
            atSec={segStart(SEG_P10, 3)}
          />
          <DutyCard
            no="2"
            icon="visibility"
            title="基準と対応の公表"
            desc="判断の基準と、実際の対応状況を外から見える形にする"
            atSec={segStart(SEG_P10, 4)}
          />
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

export const SgL52OtherSecurityLaws: VideoSpec = {
  id: "sg-L52-other-security-laws",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "署名・広告メール\nネットの投稿",
      keywords: ["電子署名法", "オプトイン", "投稿への対応"],
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
      name: "law-map",
      durationSec: 8,
      narration: SEG_P3,
      component: LawMapScene,
    },
    {
      pattern: "custom",
      name: "e-sign-law",
      durationSec: 7,
      narration: SEG_P4,
      component: ESignLawScene,
    },
    {
      pattern: "custom",
      name: "presumption",
      durationSec: 7,
      narration: SEG_P5,
      component: PresumptionScene,
    },
    {
      pattern: "custom",
      name: "cert-business",
      durationSec: 7,
      narration: SEG_P6,
      component: CertBusinessScene,
    },
    {
      pattern: "custom",
      name: "opt-in",
      durationSec: 7,
      narration: SEG_P7,
      component: OptInScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "consent-form",
      durationSec: 7,
      narration: SEG_P8,
      component: ConsentFormScene,
    },
    {
      pattern: "custom",
      name: "mail-duty",
      durationSec: 7,
      narration: SEG_P9,
      component: MailDutyScene,
    },
    {
      pattern: "custom",
      name: "platform-act",
      durationSec: 7,
      narration: SEG_P10,
      component: PlatformActScene,
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
      question: "本人の電子署名がある電子文書は？",
      choices: [
        { key: "A", text: "紙に印刷して押印し直す必要がある" },
        { key: "B", text: "押印された紙と同じように扱われる", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "広告宣伝メールを送れる相手は？",
      choices: [
        { key: "A", text: "あらかじめ同意した人だけ", correct: true },
        { key: "B", text: "拒否の連絡が来るまでは誰でも" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "大規模プラットフォームの義務は？",
      choices: [
        { key: "A", text: "全ての投稿を事前に検閲する" },
        { key: "B", text: "削除対応の体制を整えて公表", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "電子署名法 — 本人の電子署名は紙の押印と同じ", checkAtSec: segStart(SEG_P15, 0) },
        { text: "広告メールは原則オプトイン。同意した人だけ", checkAtSec: segStart(SEG_P15, 1) },
        { text: "大規模プラットフォームは削除対応の体制と公表", checkAtSec: segStart(SEG_P15, 2) },
      ],
      narration: SEG_P15,
      transitionIn: "wipe",
    },
  ],
};
