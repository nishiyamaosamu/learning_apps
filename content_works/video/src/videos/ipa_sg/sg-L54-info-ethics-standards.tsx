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
import durations from "./sg-L54-info-ethics-standards.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L54: その他の法律・情報倫理・標準化
 * （第6章＝法務の8本目・**章の締めの回**）
 *
 * 発注書 content_works/ipa_sg/orders/L54.md に対応。
 * シナリオと用語の呼称は narration/ipa_sg/sg-L54-info-ethics-standards.md が正。
 *
 * 導入＋見取り図（3つのかたまり）→ 電子化を支える法律の二階建て → e-文書法・電子帳簿保存法 →
 * ★抽象→具体：経理の書類が紙から電子へ →（wipe-light）偽・誤情報の三分類 → ファクトチェック →
 * デジタルタトゥー → フィルタリングとペアレンタルコントロール → 標準化の地図（JIS・ISO・IEEE）→
 * デジュレとデファクト → クイズ3問 → wipe でまとめ。
 *
 * ※ 罰則は語らない（L47〜L53 と揃えた方針。刑名・年数・金額は出さない）。
 * ※ ディープフェイク（L14）・組織のフィルタリングの方式（L38）・JIS Q 27001 の中身（L28）には
 *   戻らない。s11 で 27001 をデジュレの実例として名前だけ1回呼ぶ。
 * ※ 読みの例外: 音声側（jobs.json）だけ仮名書きしている箇所がある —
 *   e-文書法→イー文書法、JIS→ジス、ISO→アイエスオー、IEEE→アイトリプルイー、
 *   JIS Q 27001→ジス キュー にまんななせんいち、公→おおやけ、他では→ほかでは、
 *   一呼吸→ひと呼吸、上の階／下の階→うえの階／したの階。
 *   字幕（下の N() 第2引数）と画面テキストは漢字・英字表記が正で、音声と食い違って見えるが
 *   意図的（references/narration.md の例外規定）。JIS と IEEE は1字ずつ読まない略語だが、
 *   字幕に読みを添えると1行（全角30字）を超えて折り返すので、**読みは s10 の画面
 *   （StandardTile のカナ表記）で見せている**。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L54-info-ethics-standards");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "会社の書類を、紙ではなく電子で保存する。"),
  N("s02-2.mp3", "ネットで見かけた話を、確かめずに広めてしまう。"),
  N("s02-3.mp3", "どちらにも、守るべきルールや心構えがあります。"),
  N("s02-4.mp3", "今回の話は、大きく三つに分かれます。"),
  N("s02-5.mp3", "電子化を支える法律、情報を扱う心構え、そして標準化です。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "まずは、電子化を支える法律です。"),
  N("s03-2.mp3", "上の階には、国の方向を示す基本法が並びます。"),
  N("s03-3.mp3", "デジタル社会形成基本法が、社会の目指す姿を定めます。"),
  N("s03-4.mp3", "官民データ活用推進基本法が、データの活用を進めます。"),
  N("s03-5.mp3", "下の階には、紙の保存を電子でよいとする法律があります。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "一つが、e-文書法です。"),
  N("s04-2.mp3", "保存が義務づけられた文書を、電子でも保存できると定めます。"),
  N("s04-3.mp3", "もう一つが、電子帳簿保存法です。"),
  N("s04-4.mp3", "帳簿や請求書といった、国税に関する書類が対象です。"),
  N("s04-5.mp3", "紙で受け取った書類も、読み取って電子で保存できます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "場面で見てみましょう。経理の書類がたまるオフィスです。"),
  N("s05-2.mp3", "これまでは、請求書を紙のまま何年も保管していました。"),
  N("s05-3.mp3", "いまは、読み取って電子データで残すことが認められています。"),
  N("s05-4.mp3", "保管の場所も、探す手間も、大きく減らせます。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "正しくない情報は、三つに分けられます。"),
  N("s06-2.mp3", "だますつもりの偽情報が、ディスインフォメーションです。"),
  N("s06-3.mp3", "意図はないのに広まる誤りが、ミスインフォメーションです。"),
  N("s06-4.mp3", "三つ目は、事実なのに人を傷つける目的で使うものです。"),
  N("s06-5.mp3", "これを、マルインフォメーションといいます。"),
  N("s06-6.mp3", "見分ける鍵は、だます意図や悪意があるかどうかです。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "広める前に、その情報の出どころを確かめます。"),
  N("s07-2.mp3", "これを、ファクトチェックといいます。"),
  N("s07-3.mp3", "発信元は誰か、いつの話か、他ではどう伝えているか。"),
  N("s07-4.mp3", "確かめないまま広めると、自分も広げる側になります。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "一度ネットに出た情報は、完全には消せません。"),
  N("s08-2.mp3", "保存され、転載され、後からでも掘り起こされます。"),
  N("s08-3.mp3", "この消えない足あとを、デジタルタトゥーと呼びます。"),
  N("s08-4.mp3", "投稿する前に、一呼吸おく習慣が身を守ります。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "有害なサイトへのアクセスを止めるのが、フィルタリングです。"),
  N("s09-2.mp3", "使える時間やアプリを、保護者が決める仕組みもあります。"),
  N("s09-3.mp3", "これを、ペアレンタルコントロールといいます。"),
  N("s09-4.mp3", "会社の通信を見張る仕組みと違い、守る相手は子どもです。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "最後は、世界共通のものさしを作る標準化です。"),
  N("s10-2.mp3", "決まりを統一しておくと、誰が作っても組み合わせられます。"),
  // JIS・IEEE は1字ずつ読まない略語だが、字幕に読みを添えると1行（全角30字）を超えて
  // 折り返すので、**読みは画面（StandardTile のカナ表記）で見せる**（音声は jobs.json 側で仮名書き）
  N("s10-3.mp3", "日本の国内規格を定めるのが、JISです。"),
  N("s10-4.mp3", "国をまたぐ国際規格を定めるのが、ISOです。"),
  N("s10-5.mp3", "電気や通信の分野で規格を定めるのが、IEEEです。"),
];

const SEG_P11 = [
  N("s11-1.mp3", "公の機関が定めた標準が、デジュレスタンダードです。"),
  N("s11-2.mp3", "これまで学んだJIS Q 27001も、その一つです。"),
  N("s11-3.mp3", "広く使われた結果、事実上の標準になったものもあります。"),
  N("s11-4.mp3", "これを、デファクトスタンダードといいます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s13-1.mp3", "ここで問題です。"),
  N("s13-2.mp3", "だます意図がないまま広まった誤りは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、ミスインフォメーションです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s14-1.mp3", "次の問題です。"),
  N("s14-2.mp3", "電子帳簿保存法が認めているのは、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、帳簿や請求書を電子で保存することです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s15-1.mp3", "最後の問題です。"),
  N("s15-2.mp3", "公の機関が定めた標準は、どちらでしょうか。"),
  N("s15-3.mp3", "正解は、デジュレスタンダードです。", { gapBeforeSec: 1.8 }),
];

const SEG_P16 = [
  N("s16-1.mp3", "e-文書法と電子帳簿保存法が、電子での保存を認めます。"),
  N("s16-2.mp3", "偽の情報や誤りは、だます意図があるかで見分けます。"),
  N("s16-3.mp3", "標準は、公が定めたデジュレと、事実上のデファクトです。"),
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
// P2: 導入 ＋ 見取り図（左に問い／右に3つのかたまり）
// ---------------------------------------------------------------------------

const SceneChip: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => (
  <span
    style={{
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: 5 * SCALE,
      fontSize: 10.5 * SCALE,
      fontWeight: 800,
      color: colors.textSecondary,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 999,
      padding: `${2.5 * SCALE}px ${10 * SCALE}px`,
      lineHeight: 1.25,
      ...useAppear(atSec, { dy: 6 }),
    }}
  >
    <span style={{ flex: "none", color: colors.textMuted, display: "flex" }}>
      <Ms name={icon} size={13 * SCALE} />
    </span>
    {text}
  </span>
);

/** 見取り図の1かたまり（横長の小タイル） */
const TopicTile: React.FC<{
  icon: string;
  title: string;
  desc: string;
  atSec: number;
}> = ({ icon, title, desc, atSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 7 * SCALE,
      borderRadius: 13 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.primary500}`,
      padding: `${6 * SCALE}px ${10 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        flex: "none",
        width: 26 * SCALE,
        height: 26 * SCALE,
        borderRadius: 10 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
    </span>
    <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 1 * SCALE }}>
      <b style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{title}</b>
      <span
        style={{
          minWidth: 0,
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textMuted,
          lineHeight: 1.3,
        }}
      >
        {desc}
      </span>
    </div>
  </div>
);

const IntroScene: React.FC = () => {
  const question = useAppear(0.3, { dy: 10 });

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6 * SCALE,
          }}
        >
          <Chip text="今回の見取り図" atSec={0.25} />
          {/* 24×SCALE では1行に入らないので明示改行 */}
          <b style={{ minWidth: 0, fontSize: 24 * SCALE, fontWeight: 800, lineHeight: 1.25, ...question }}>
            身近な場面に、
            <br />
            それぞれの<span style={markerStyle}>決まり</span>
          </b>
          <SceneChip icon="description" text="書類を電子で保存する" atSec={segStart(SEG_P2, 0) + 0.6} />
          <SceneChip icon="forum" text="見かけた話を、確かめずに広める" atSec={segStart(SEG_P2, 1)} />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
          }}
        >
          <TopicTile
            icon="gavel"
            title="電子化を支える法律"
            desc="紙を電子にしてよい、の根拠"
            atSec={segStart(SEG_P2, 3)}
          />
          <TopicTile
            icon="psychology"
            title="情報倫理"
            desc="ネットの情報とのつき合い方"
            atSec={segStart(SEG_P2, 3) + 0.7}
          />
          <TopicTile
            icon="public"
            title="標準化"
            desc="世界共通のものさしを作る"
            atSec={segStart(SEG_P2, 3) + 1.4}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 電子化を支える法律の二階建て（積層図）
// ---------------------------------------------------------------------------

/** 階の中に並ぶ法律の帯。**帯は最初から全部置き**、語りに合わせて点灯させる（空箱を作らない） */
const LawBand: React.FC<{ name: string; desc: string; highlightAtSec?: number }> = ({
  name,
  desc,
  highlightAtSec,
}) => {
  const on = useProgress(highlightAtSec ?? NEVER_SEC, 0.4);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 1 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: interpolateColors(on, [0, 1], [colors.bg, colors.primary50]),
        border: `${1.5 * SCALE}px solid ${interpolateColors(on, [0, 1], [colors.border, colors.primary500])}`,
        padding: `${5 * SCALE}px ${9 * SCALE}px`,
      }}
    >
      <b
        style={{
          minWidth: 0,
          /* 帯の内幅で1行に収まるのは12文字まで（13×SCALE では「官民データ活用推進基本法」の
             「法」だけが2行目に落ちた） */
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          color: interpolateColors(on, [0, 1], [colors.textSecondary, colors.primary800]),
        }}
      >
        {name}
      </b>
      <span
        style={{
          minWidth: 0,
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textMuted,
          lineHeight: 1.3,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const FloorCard: React.FC<{
  floor: string;
  icon: string;
  role: string;
  accent?: boolean;
  atSec: number;
  children: React.ReactNode;
}> = ({ floor, icon, role, accent, atSec, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 9 * SCALE,
      borderRadius: 15 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
      padding: `${7 * SCALE}px ${10 * SCALE}px`,
      ...useAppear(atSec, { dy: 12 }),
    }}
  >
    <div
      style={{
        flex: "none",
        width: 52 * SCALE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
      }}
    >
      <span
        style={{
          width: 26 * SCALE,
          height: 26 * SCALE,
          borderRadius: 10 * SCALE,
          backgroundColor: accent ? colors.primary100 : colors.bg,
          color: accent ? colors.primary600 : colors.textSecondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={15 * SCALE} />
      </span>
      <b style={{ fontSize: 11 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{floor}</b>
      <span
        style={{
          fontSize: 9 * SCALE,
          fontWeight: 700,
          color: colors.textMuted,
          lineHeight: 1.25,
          textAlign: "center",
        }}
      >
        {role}
      </span>
    </div>
    <div style={{ flex: 1, minWidth: 0, display: "flex", gap: 5 * SCALE }}>{children}</div>
  </div>
);

const DigitalLawsScene: React.FC = () => (
  <SlideShell
    heading="電子化を支える法律"
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
        gap: 6 * SCALE,
      }}
    >
      <FloorCard
        floor="上の階"
        icon="flag"
        role="方向を示す"
        atSec={segStart(SEG_P3, 1)}
      >
        <LawBand
          name="デジタル社会形成基本法"
          desc="社会の目指す姿を定める"
          highlightAtSec={segStart(SEG_P3, 2)}
        />
        <LawBand
          name="官民データ活用推進基本法"
          desc="データの活用を進める"
          highlightAtSec={segStart(SEG_P3, 3)}
        />
      </FloorCard>

      <FloorCard
        floor="下の階"
        icon="description"
        role="紙を電子で"
        accent
        atSec={segStart(SEG_P3, 4)}
      >
        <LawBand name="e-文書法" desc="保存義務のある文書を電子で" />
        <LawBand name="電子帳簿保存法" desc="国税に関する書類を電子で" />
      </FloorCard>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P4: e-文書法と電子帳簿保存法（左右2カード）
// ---------------------------------------------------------------------------

const StorageLawCard: React.FC<{
  name: string;
  icon: string;
  target: React.ReactNode;
  accent?: boolean;
  atSec: number;
  targetAtSec: number;
}> = ({ name, icon, target, accent, atSec, targetAtSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4 * SCALE,
      borderRadius: 15 * SCALE,
      backgroundColor: accent ? colors.primary50 : colors.surface,
      border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
      padding: `${7 * SCALE}px ${9 * SCALE}px`,
      ...useAppear(atSec, { dy: 12 }),
    }}
  >
    {/* アイコンは名前と同時に出す — これが無いと、対象が出るまでの数秒がカードの空箱に見える */}
    <span
      style={{
        width: 26 * SCALE,
        height: 26 * SCALE,
        borderRadius: 10 * SCALE,
        backgroundColor: accent ? colors.primary100 : colors.bg,
        color: accent ? colors.primary600 : colors.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
    </span>
    <b style={{ minWidth: 0, fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.2, textAlign: "center" }}>
      <span style={markerStyle}>{name}</span>
    </b>
    <div
      style={{
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
        ...useAppear(targetAtSec, { dy: 6 }),
      }}
    >
      <span style={{ fontSize: 9.5 * SCALE, fontWeight: 800, color: colors.textMuted, lineHeight: 1.2 }}>
        対象になるもの
      </span>
      <span
        style={{
          minWidth: 0,
          fontSize: 12.5 * SCALE,
          fontWeight: 800,
          color: colors.textPrimary,
          lineHeight: 1.35,
          textAlign: "center",
        }}
      >
        {target}
      </span>
    </div>
  </div>
);

const StorageLawsScene: React.FC = () => {
  const note = useAppear(segStart(SEG_P4, 4), { dy: 8 });

  return (
    <SlideShell
      heading="紙の保存を、電子でよいとする法"
      icon={<Ms name="description" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
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
        <div style={{ display: "flex", alignItems: "stretch", gap: 6 * SCALE }}>
          {/* カード内幅で1行に収まるのは 12.5×SCALE で12文字まで。長い方は明示改行する */}
          <StorageLawCard
            name="e-文書法"
            icon="article"
            target="保存が義務づけられた文書"
            atSec={0.35}
            targetAtSec={segStart(SEG_P4, 1)}
          />
          <StorageLawCard
            name="電子帳簿保存法"
            icon="payments"
            target={
              <>
                帳簿・請求書など
                <br />
                国税に関する書類
              </>
            }
            accent
            atSec={segStart(SEG_P4, 2)}
            targetAtSec={segStart(SEG_P4, 3)}
          />
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            padding: `${5 * SCALE}px ${11 * SCALE}px`,
            ...note,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="search" size={14 * SCALE} />
          </span>
          <span style={{ minWidth: 0, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            紙で受け取ったものも <span style={markerPinkStyle}>読み取って保存</span> でよい
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: ★抽象→具体 — 経理の書類が、紙から電子へ
// ---------------------------------------------------------------------------

const AccountingScene: React.FC = () => {
  const ledger = useAppear(0.4);
  const before = useAppear(segStart(SEG_P5, 1), { dy: 8 });
  const arrow = useAppear(segStart(SEG_P5, 2), { dy: 0 });
  const after = useAppear(segStart(SEG_P5, 2) + 0.7, { dy: 10 });
  const merit = useAppear(segStart(SEG_P5, 3), { dy: 8 });

  return (
    <SlideShell
      heading="経理の書類は、こう変わる"
      icon={<Ms name="archive" size={videoType.slideHeadIcon} />}
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
        {/* Img を含む横並びの行は親から高さを縛る（flex:1 + minHeight:0） */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: 4 * SCALE }}>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
            }}
          >
            <Img
              src={staticFile("images/ipa_sg/prop-ledger.png")}
              style={{
                flex: 1,
                minHeight: 0,
                width: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
                ...ledger,
              }}
            />
            <span
              style={{
                minWidth: 0,
                fontSize: 12.5 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                lineHeight: 1.3,
                textAlign: "center",
                ...before,
              }}
            >
              {/* 列幅で1行に収まるのは12文字まで */}
              これまで — 紙のまま保管
            </span>
          </div>

          <div
            style={{
              flex: "none",
              width: 46 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1 * SCALE,
              ...arrow,
            }}
          >
            <span style={{ fontSize: 10 * SCALE, fontWeight: 800, color: colors.primary800, lineHeight: 1.25 }}>
              読み取る
            </span>
            <span style={{ color: colors.primary500, display: "flex" }}>
              <Ms name="arrow_forward" size={20 * SCALE} />
            </span>
          </div>

          <div
            style={{
              flex: 1.15,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
              borderRadius: 15 * SCALE,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary500}`,
              padding: `${9 * SCALE}px ${9 * SCALE}px`,
              ...after,
            }}
          >
            <span
              style={{
                width: 30 * SCALE,
                height: 30 * SCALE,
                borderRadius: 11 * SCALE,
                backgroundColor: colors.primary100,
                color: colors.primary600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ms name="storage" size={18 * SCALE} />
            </span>
            <b style={{ minWidth: 0, fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.25, textAlign: "center" }}>
              電子データで保存
            </b>
            <span
              style={{
                minWidth: 0,
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
                backgroundColor: colors.surface,
                borderRadius: 999,
                padding: `${2 * SCALE}px ${9 * SCALE}px`,
                lineHeight: 1.25,
                textAlign: "center",
              }}
            >
              電子帳簿保存法が認めている
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 5 * SCALE, ...merit }}>
          {[
            { icon: "inventory_2", text: "保管の場所が要らない" },
            { icon: "search", text: "探す手間が減る" },
          ].map((m) => (
            <span
              key={m.text}
              style={{
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                gap: 5 * SCALE,
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                backgroundColor: colors.surface,
                border: `${1.5 * SCALE}px solid ${colors.border}`,
                borderRadius: 999,
                padding: `${3 * SCALE}px ${11 * SCALE}px`,
                lineHeight: 1.3,
              }}
            >
              <span style={{ flex: "none", color: colors.correct, display: "flex" }}>
                <Ms name="check_circle" size={13 * SCALE} />
              </span>
              {m.text}
            </span>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 偽・誤情報の三分類（2×2の地図）
// ---------------------------------------------------------------------------

const InfoCell: React.FC<{
  prefix: string;
  suffix?: string;
  desc: string;
  highlightAtSec?: number;
}> = ({ prefix, suffix, desc, highlightAtSec }) => {
  const on = useProgress(highlightAtSec ?? NEVER_SEC, 0.4);
  const active = highlightAtSec !== undefined;
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1 * SCALE,
        borderRadius: 13 * SCALE,
        backgroundColor: active
          ? interpolateColors(on, [0, 1], [colors.surface, colors.primary50])
          : colors.bg,
        border: `${1.5 * SCALE}px solid ${
          active ? interpolateColors(on, [0, 1], [colors.border, colors.primary500]) : colors.border
        }`,
        padding: `${6 * SCALE}px ${6 * SCALE}px`,
      }}
    >
      <b
        style={{
          minWidth: 0,
          fontSize: (suffix ? 18 : 13) * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          textAlign: "center",
          color: active
            ? interpolateColors(on, [0, 1], [colors.textSecondary, colors.primary800])
            : colors.textMuted,
        }}
      >
        {prefix}
      </b>
      {suffix ? (
        <span
          style={{
            minWidth: 0,
            fontSize: 10 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          {suffix}
        </span>
      ) : null}
      <span
        style={{
          minWidth: 0,
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textMuted,
          lineHeight: 1.3,
          textAlign: "center",
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const AxisLabel: React.FC<{ text: string; width?: number }> = ({ text, width }) => (
  <span
    style={{
      flex: width ? "none" : 1,
      width: width ? width * SCALE : undefined,
      minWidth: 0,
      fontSize: 11 * SCALE,
      fontWeight: 800,
      color: colors.textMuted,
      lineHeight: 1.25,
      textAlign: "center",
    }}
  >
    {text}
  </span>
);

const MisinfoMatrixScene: React.FC = () => {
  const grid = useAppear(0.3, { dy: 10 });
  const key = useAppear(segStart(SEG_P6, 5), { dy: 8 });
  /* 5文字（11×SCALE）が1行に収まる幅。46×SCALE では「誤っている」が2行に割れた */
  const rowLabelW = 58;

  return (
    <SlideShell
      heading="正しくない情報の三分類"
      icon={<Ms name="warning" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
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
        <div style={{ display: "flex", flexDirection: "column", gap: 4 * SCALE, ...grid }}>
          {/* 列ラベル（悪意の有無） */}
          <div style={{ display: "flex", gap: 5 * SCALE }}>
            <AxisLabel text="" width={rowLabelW} />
            <AxisLabel text="悪意なし" />
            <AxisLabel text="悪意あり" />
          </div>

          <div style={{ display: "flex", alignItems: "stretch", gap: 5 * SCALE }}>
            <AxisLabel text="誤っている" width={rowLabelW} />
            <InfoCell
              prefix="ミス"
              suffix="インフォメーション"
              desc="意図はないのに広まる誤り"
              highlightAtSec={segStart(SEG_P6, 2)}
            />
            <InfoCell
              prefix="ディス"
              suffix="インフォメーション"
              desc="だますつもりの偽情報"
              highlightAtSec={segStart(SEG_P6, 1)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "stretch", gap: 5 * SCALE }}>
            <AxisLabel text="事実である" width={rowLabelW} />
            <InfoCell prefix="ふつうの情報" desc="そのまま受け取ってよい" />
            <InfoCell
              prefix="マル"
              suffix="インフォメーション"
              desc="事実を、人を傷つける目的で使う"
              highlightAtSec={segStart(SEG_P6, 4)}
            />
          </div>
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        {/* 13×SCALE ではマーカーの帯が細すぎて汚れに見えたので 15×SCALE に上げた */}
        <span style={{ minWidth: 0, fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.3, ...key }}>
          真偽より、<span style={markerPinkStyle}>意図</span>を見る
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: ファクトチェック（キーワード見出し + 3つのチェック行）
// ---------------------------------------------------------------------------

/**
 * 確かめる観点のピル。
 * 初版は縦3行に積んだが、本文領域（見出しなしで約770px）を超えて注記帯が字幕帯に潜ったので、
 * 横1列のピルに組み替えた（3つとも短いので横に並ぶ）。
 */
const CheckPill: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => (
  <span
    style={{
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: 6 * SCALE,
      borderRadius: 999,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      padding: `${4 * SCALE}px ${12 * SCALE}px`,
      ...useAppear(atSec, { dy: 8 }),
    }}
  >
    <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
      <Ms name={icon} size={15 * SCALE} />
    </span>
    <span style={{ minWidth: 0, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
      {label}
    </span>
  </span>
);

const FactCheckScene: React.FC = () => {
  const term = useAppear(segStart(SEG_P7, 1), { dy: 8 });
  const desc = useAppear(0.4, { dy: 6 });
  const note = useAppear(segStart(SEG_P7, 3), { dy: 8 });
  const at3 = segStart(SEG_P7, 2);

  return (
    <SlideShell narration={SEG_P7}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 6 * SCALE,
        }}
      >
        <Chip text="広める前の一手間" atSec={0.25} />
        <b style={{ minWidth: 0, fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
          <span style={markerStyle}>ファクトチェック</span>
        </b>
        <span
          style={{
            minWidth: 0,
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            lineHeight: 1.35,
            ...desc,
          }}
        >
          情報の出どころを、自分で確かめる
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 * SCALE }}>
          <CheckPill icon="person" label="発信元は誰か" atSec={at3} />
          <CheckPill icon="schedule" label="いつの話か" atSec={at3 + 0.7} />
          <CheckPill icon="forum" label="他ではどう伝えているか" atSec={at3 + 1.4} />
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
            padding: `${5 * SCALE}px ${11 * SCALE}px`,
            ...note,
          }}
        >
          <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
            <Ms name="campaign" size={14 * SCALE} />
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              lineHeight: 1.3,
            }}
          >
            確かめずの拡散は、広げた側になる
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: デジタルタトゥー（キーワード見出し + イラスト）
// ---------------------------------------------------------------------------

const FateChip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => (
  <span
    style={{
      minWidth: 0,
      fontSize: 11 * SCALE,
      fontWeight: 800,
      color: colors.textSecondary,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 999,
      padding: `${2.5 * SCALE}px ${10 * SCALE}px`,
      lineHeight: 1.25,
      ...usePop(atSec),
    }}
  >
    {text}
  </span>
);

const DigitalTattooScene: React.FC = () => {
  const lead = useAppear(0.4, { dy: 8 });
  const term = useAppear(segStart(SEG_P8, 2), { dy: 8 });
  const note = useAppear(segStart(SEG_P8, 3), { dy: 8 });
  const illust = useAppear(0.55);
  const at2 = segStart(SEG_P8, 1);

  return (
    <SlideShell narration={SEG_P8}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.35,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6 * SCALE,
          }}
        >
          <Chip text="消えない足あと" atSec={0.25} />
          {/* 17×SCALE で1行に収まる長さに切って明示改行 */}
          <span style={{ minWidth: 0, fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.3, ...lead }}>
            一度ネットに出た情報は
            <br />
            <span style={markerPinkStyle}>完全には消せない</span>
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 * SCALE }}>
            <FateChip text="保存される" atSec={at2} />
            <FateChip text="転載される" atSec={at2 + 0.5} />
            <FateChip text="掘り起こされる" atSec={at2 + 1.0} />
          </div>
          <b style={{ minWidth: 0, fontSize: 28 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>デジタルタトゥー</span>
          </b>
          <span
            style={{
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary500}`,
              borderRadius: 12 * SCALE,
              padding: `${4 * SCALE}px ${11 * SCALE}px`,
              lineHeight: 1.3,
              ...note,
            }}
          >
            <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
              <Ms name="timer" size={14 * SCALE} />
            </span>
            投稿の前に、ひと呼吸
          </span>
        </div>

        <Img
          src={staticFile("images/ipa_sg/icon-smartphone.png")}
          style={{
            flex: 0.8,
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
// P9: フィルタリングとペアレンタルコントロール（上下2段の横帯 + 対象の帯）
// ---------------------------------------------------------------------------

const ToolBand: React.FC<{
  icon: string;
  term: string;
  desc: string;
  termSize: number;
  atSec: number;
}> = ({ icon, term, desc, termSize, atSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 9 * SCALE,
      borderRadius: 15 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      padding: `${7 * SCALE}px ${11 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        flex: "none",
        width: 30 * SCALE,
        height: 30 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={18 * SCALE} />
    </span>
    <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 1 * SCALE }}>
      <b style={{ minWidth: 0, fontSize: termSize, fontWeight: 800, lineHeight: 1.2 }}>
        <span style={markerStyle}>{term}</span>
      </b>
      <span
        style={{
          minWidth: 0,
          fontSize: 11 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.3,
        }}
      >
        {desc}
      </span>
    </div>
  </div>
);

const ParentalScene: React.FC = () => {
  const target = useAppear(segStart(SEG_P9, 3), { dy: 8 });

  return (
    <SlideShell
      heading="家庭で子どもを守る仕組み"
      icon={<Ms name="school" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
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
        <ToolBand
          icon="visibility_off"
          term="フィルタリング"
          desc="有害なサイトへのアクセスを止める"
          termSize={19 * SCALE}
          atSec={0.35}
        />
        <ToolBand
          icon="manage_accounts"
          term="ペアレンタルコントロール"
          desc="使える時間やアプリを、保護者が決める"
          termSize={19 * SCALE}
          atSec={segStart(SEG_P9, 1)}
        />

        {/* 字幕（＝ナレーション全文）と同じ文にしない。守る相手だけを大きく言う */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            borderRadius: 13 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            padding: `${5 * SCALE}px ${11 * SCALE}px`,
            ...target,
          }}
        >
          <span
            style={{
              flex: "none",
              fontSize: 9.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.surface,
              borderRadius: 999,
              padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
              lineHeight: 1.25,
            }}
          >
            会社の仕組みとの違い
          </span>
          <b style={{ minWidth: 0, fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            守る相手は、<span style={markerPinkStyle}>子ども</span>
          </b>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 標準化の地図（JIS・ISO・IEEE）
// ---------------------------------------------------------------------------

/**
 * 略称は最初から3つ並べておき（＝意味のある「候補の並び」）、
 * 守備範囲の説明と点灯だけを語りに同期させる（空箱を作らない）。
 */
const StandardTile: React.FC<{
  abbr: string;
  reading: string;
  icon: string;
  scope: string;
  highlightAtSec: number;
}> = ({ abbr, reading, icon, scope, highlightAtSec }) => {
  const on = useProgress(highlightAtSec, 0.4);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        borderRadius: 15 * SCALE,
        backgroundColor: interpolateColors(on, [0, 1], [colors.surface, colors.primary50]),
        border: `${1.5 * SCALE}px solid ${interpolateColors(on, [0, 1], [colors.border, colors.primary500])}`,
        padding: `${9 * SCALE}px ${8 * SCALE}px`,
        ...useAppear(0.35),
      }}
    >
      <span
        style={{
          width: 28 * SCALE,
          height: 28 * SCALE,
          borderRadius: 11 * SCALE,
          backgroundColor: interpolateColors(on, [0, 1], [colors.bg, colors.primary100]),
          color: interpolateColors(on, [0, 1], [colors.textMuted, colors.primary600]),
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
          fontSize: 26 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: interpolateColors(on, [0, 1], [colors.textMuted, colors.primary800]),
        }}
      >
        {abbr}
      </b>
      {/* 1字ずつ読まない略語があるので、読み方は画面から学べるようにする（字幕には添えない） */}
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textMuted,
          lineHeight: 1.2,
        }}
      >
        {reading}
      </span>
      <span
        style={{
          minWidth: 0,
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          lineHeight: 1.3,
          textAlign: "center",
          ...useAppear(highlightAtSec, { dy: 4 }),
        }}
      >
        {scope}
      </span>
    </div>
  );
};

const StandardsMapScene: React.FC = () => {
  const lead = useAppear(segStart(SEG_P10, 1), { dy: 8 });

  return (
    <SlideShell
      heading="世界共通のものさし"
      icon={<Ms name="public" size={videoType.slideHeadIcon} />}
      narration={SEG_P10}
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
        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.3, ...lead }}>
          そろえておけば、<span style={markerStyle}>誰が作ってもつながる</span>
        </span>

        <div style={{ display: "flex", alignItems: "stretch", gap: 6 * SCALE }}>
          {/* タイル内幅で1行に収まるのは 11.5×SCALE で9文字まで */}
          <StandardTile
            abbr="JIS"
            reading="ジス"
            icon="flag"
            scope="日本の国内規格"
            highlightAtSec={segStart(SEG_P10, 2)}
          />
          <StandardTile
            abbr="ISO"
            reading="アイエスオー"
            icon="public"
            scope="国をまたぐ国際規格"
            highlightAtSec={segStart(SEG_P10, 3)}
          />
          <StandardTile
            abbr="IEEE"
            reading="アイトリプルイー"
            icon="bolt"
            scope="電気や通信の規格"
            highlightAtSec={segStart(SEG_P10, 4)}
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

export const SgL54InfoEthicsStandards: VideoSpec = {
  id: "sg-L54-info-ethics-standards",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "紙をなくす法律と\n情報とのつき合い方",
      keywords: ["電子帳簿保存法", "偽・誤情報", "標準化"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "intro",
      durationSec: 7,
      narration: SEG_P2,
      component: IntroScene,
    },
    {
      pattern: "custom",
      name: "digital-laws",
      durationSec: 8,
      narration: SEG_P3,
      component: DigitalLawsScene,
    },
    {
      pattern: "custom",
      name: "storage-laws",
      durationSec: 8,
      narration: SEG_P4,
      component: StorageLawsScene,
    },
    {
      pattern: "custom",
      name: "accounting",
      durationSec: 7,
      narration: SEG_P5,
      component: AccountingScene,
    },
    {
      pattern: "custom",
      name: "misinfo-matrix",
      durationSec: 9,
      narration: SEG_P6,
      component: MisinfoMatrixScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "fact-check",
      durationSec: 7,
      narration: SEG_P7,
      component: FactCheckScene,
    },
    {
      pattern: "custom",
      name: "digital-tattoo",
      durationSec: 7,
      narration: SEG_P8,
      component: DigitalTattooScene,
    },
    {
      pattern: "custom",
      name: "parental",
      durationSec: 7,
      narration: SEG_P9,
      component: ParentalScene,
    },
    {
      pattern: "custom",
      name: "standards-map",
      durationSec: 8,
      narration: SEG_P10,
      component: StandardsMapScene,
    },
    {
      pattern: "vs",
      heading: "標準の、二つの成り立ち",
      icon: "balance",
      left: {
        title: "デジュレスタンダード",
        icon: "gavel",
        rows: [
          { k: "決め方", v: "公の機関が定める" },
          { k: "根拠", v: "審議されて公表" },
          { k: "例", v: "JIS Q 27001" },
        ],
      },
      right: {
        title: "デファクトスタンダード",
        icon: "groups",
        rows: [
          { k: "決め方", v: "広く使われて決まる" },
          { k: "根拠", v: "事実上の普及" },
          { k: "例", v: "みんなが使う方式" },
        ],
      },
      columnAtSec: [0.3, segStart(SEG_P11, 2)],
      narration: SEG_P11,
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
      question: "だます意図がない誤情報は？",
      choices: [
        { key: "A", text: "ミスインフォメーション", correct: true },
        { key: "B", text: "ディスインフォメーション" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "電子帳簿保存法が認めるのは？",
      choices: [
        { key: "A", text: "帳簿や請求書の保存をやめる" },
        { key: "B", text: "帳簿や請求書を電子で保存", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "公の機関が定めた標準は？",
      choices: [
        { key: "A", text: "デジュレスタンダード", correct: true },
        { key: "B", text: "デファクトスタンダード" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "e-文書法と電子帳簿保存法が、電子での保存を認める", checkAtSec: segStart(SEG_P16, 0) },
        { text: "偽の情報や誤りは、だます意図があるかで見分ける", checkAtSec: segStart(SEG_P16, 1) },
        { text: "標準は、公が定めたデジュレと事実上のデファクト", checkAtSec: segStart(SEG_P16, 2) },
      ],
      narration: SEG_P16,
      transitionIn: "wipe",
    },
  ],
};
