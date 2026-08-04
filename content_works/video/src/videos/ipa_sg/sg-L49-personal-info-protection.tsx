import React from "react";
import { Img, staticFile } from "remotion";
import {
  colors,
  fontMono,
  markerStyle,
  markerPinkStyle,
  SCALE,
  videoType,
} from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L49-personal-info-protection.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L49:
 * 個人情報保護法①：保護のルール（第6章＝法務の3本目）
 *
 * 発注書 content_works/ipa_sg/orders/L49.md に対応。
 * シナリオと用語の呼称は narration/ipa_sg/sg-L49-personal-info-protection.md が正。
 *
 * 導入（身近な3つ）→ 個人情報の定義 → ★抽象→具体：容易照合性 →
 * 個人情報取扱事業者 →（wipe-light）要配慮個人情報 → 安全管理措置の4本柱 →
 * 第三者提供とオプトイン → オプトインとオプトアウトの比較表 → 個人情報保護委員会 →
 * クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ
 *   「亡くなった方」→ 亡くなったかた、「立入検査」→ たちいり検査、
 *   「人種」→ じんしゅ（s06-2。人のレビューで誤読を指摘）と仮名書きしている。
 *   字幕（下の N() 第2引数）は漢字表記が正で、音声と原稿が食い違って見えるが意図的
 *   （references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L49-personal-info-protection");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "会社が持っている顧客名簿や、アンケートの回答用紙。"),
  N("s02-2.mp3", "防犯カメラに映った、お客さまの顔の映像。"),
  N("s02-3.mp3", "これらはすべて、法律が守る個人情報にあたります。"),
  N("s02-4.mp3", "今回は、集めた側に課されるルールを見ていきます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "まず、個人情報とは何かをはっきりさせましょう。"),
  N("s03-2.mp3", "個人情報とは、生存する個人に関する情報のことです。"),
  N("s03-3.mp3", "その中でも、特定の個人を識別できるものを指します。"),
  N("s03-4.mp3", "氏名や顔写真、生年月日と氏名の組み合わせが典型です。"),
  // 音声は「亡くなったかた」（jobs.json）。字幕は漢字表記が正
  N("s03-5.mp3", "生存する、とあるので、亡くなった方の情報は含みません。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "ここで、試験でよく問われる考え方があります。"),
  N("s04-2.mp3", "たとえば、社員番号だけが並んだ一覧表があるとします。"),
  N("s04-3.mp3", "これだけでは、誰のことなのか分かりません。"),
  N("s04-4.mp3", "ですが、社内の名簿と照らせば、すぐに誰かが分かります。"),
  N("s04-5.mp3", "このように容易に照合できるものも、個人情報です。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "次は、このルールを守る側を見ていきましょう。"),
  N("s05-2.mp3", "個人情報をデータベースにして事業に使う人が対象です。"),
  N("s05-3.mp3", "これを、個人情報取扱事業者といいます。"),
  N("s05-4.mp3", "規模は関係なく、ほとんどの会社が当てはまります。"),
  N("s05-5.mp3", "うちは小さいから関係ない、は通りません。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "個人情報の中には、とくに慎重に扱うものがあります。"),
  N("s06-2.mp3", "人種、信条、病歴、犯罪の経歴などがそれにあたります。"),
  N("s06-3.mp3", "これらを、要配慮個人情報といいます。"),
  N("s06-4.mp3", "知られると、差別や偏見につながるおそれがあるためです。"),
  N("s06-5.mp3", "取得する時点で、本人の同意が必要になります。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "集めた個人情報は、漏らさないように守る義務があります。"),
  N("s07-2.mp3", "これを、安全管理措置といいます。"),
  N("s07-3.mp3", "中身は、組織的、人的、物理的、技術的の四つに分かれます。"),
  N("s07-4.mp3", "規程を決め、研修をし、鍵をかけ、アクセス制御をかける。"),
  N("s07-5.mp3", "以前学んだ管理策の四区分と、同じ骨組みです。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "集めた個人情報を、他社に渡す場合はどうでしょうか。"),
  N("s08-2.mp3", "これを第三者提供といい、原則は本人の同意が必要です。"),
  N("s08-3.mp3", "先に同意をもらうこの方式を、オプトインといいます。"),
  N("s08-4.mp3", "同意なく名簿を売り渡すのは、この原則に反します。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "もう一つ、オプトアウトという方式もあります。"),
  N("s09-2.mp3", "本人が求めれば止める約束で、先に提供する方式です。"),
  N("s09-3.mp3", "使うには、個人情報保護委員会への届け出が必要です。"),
  N("s09-4.mp3", "そして、要配慮個人情報には、この方式を使えません。"),
  N("s09-5.mp3", "慎重に扱う情報は、必ず事前の同意が要るのです。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "最後に、これらを見張る役所を見ておきましょう。"),
  N("s10-2.mp3", "個人情報保護委員会という、独立した監督官庁です。"),
  // 音声は「たちいり検査」（jobs.json）。字幕は漢字表記が正
  N("s10-3.mp3", "報告を求め、立入検査をし、命令を出す権限があります。"),
  N("s10-4.mp3", "個人情報が漏えいしたときの報告先も、この委員会です。"),
  N("s10-5.mp3", "本人への通知も、あわせて必要になります。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "個人情報保護法でいう個人情報は、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、名簿と照合できる社員番号の表です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "オプトアウトで提供できない情報は、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、要配慮個人情報です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "個人情報が漏えいしたときの報告先は、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、個人情報保護委員会です。", { gapBeforeSec: 1.8 }),
];

const SEG_P15 = [
  N("s15-1.mp3", "個人情報は、生存する個人を識別できる情報でした。"),
  N("s15-2.mp3", "集めた側には、安全管理措置と提供のルールがあります。"),
  N("s15-3.mp3", "要配慮個人情報は、取得に同意が必要な特別扱いです。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <span
    style={{
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      color: colors.primary800,
      backgroundColor: colors.primary100,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      lineHeight: 1.3,
      ...style,
    }}
  >
    {children}
  </span>
);

// ---------------------------------------------------------------------------
// P2: 導入 — 身の回りの3つが、どれも個人情報
// ---------------------------------------------------------------------------

const ItemCard: React.FC<{ icon: string; label: React.ReactNode; atSec: number }> = ({
  icon,
  label,
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
        gap: 5 * SCALE,
        padding: `${10 * SCALE}px ${6 * SCALE}px`,
        borderRadius: 16 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          width: 32 * SCALE,
          height: 32 * SCALE,
          borderRadius: 13 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={19 * SCALE} />
      </span>
      <b
        style={{
          minWidth: 0,
          fontSize: 12.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.3,
          textAlign: "center",
        }}
      >
        {label}
      </b>
    </div>
  );
};

const IntroScene: React.FC = () => {
  const conc = usePop(segStart(SEG_P2, 2));
  const chip = useAppear(segStart(SEG_P2, 3), { dy: 8 });

  return (
    <SlideShell narration={SEG_P2}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 9 * SCALE,
        }}
      >
        <div style={{ alignSelf: "stretch", display: "flex", gap: 7 * SCALE }}>
          <ItemCard icon="groups" label="顧客名簿" atSec={0.4} />
          <ItemCard icon="description" label="アンケートの回答" atSec={0.95} />
          <ItemCard
            icon="visibility"
            label={
              <>
                防犯カメラに
                <br />
                映った顔
              </>
            }
            atSec={segStart(SEG_P2, 1)}
          />
        </div>

        <b style={{ fontSize: 27 * SCALE, fontWeight: 800, lineHeight: 1.25, ...conc }}>
          どれも<span style={markerStyle}>個人情報</span>
        </b>

        {/* 字幕（＝ナレーション全文）と同じ文にしない。画面は今回の見出しだけを受け持つ */}
        <Chip style={{ ...chip }}>今回：守る義務と、渡すときのルール</Chip>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 個人情報の定義（キーワード見出し + 要件2つ）
// ---------------------------------------------------------------------------

const ReqRow: React.FC<{ no: string; text: React.ReactNode; atSec: number }> = ({
  no,
  text,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 8 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...appear }}>
      <span
        style={{
          flex: "none",
          width: 13 * SCALE,
          height: 13 * SCALE,
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
      <span style={{ minWidth: 0, fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
        {text}
      </span>
    </div>
  );
};

const DefinitionScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const example = useAppear(segStart(SEG_P3, 3), { dy: 8 });
  const note = useAppear(segStart(SEG_P3, 4), { dy: 8 });
  const illust = useAppear(0.7);

  return (
    <SlideShell narration={SEG_P3}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.4,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6 * SCALE,
          }}
        >
          <Chip style={{ ...chip }}>法律が守る対象</Chip>
          <b style={{ fontSize: 32 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>個人情報</span>
          </b>
          <ReqRow no="1" text="生存する個人に関する情報" atSec={segStart(SEG_P3, 1)} />
          <ReqRow no="2" text="特定の個人を識別できる" atSec={segStart(SEG_P3, 2)} />
          <span
            style={{
              minWidth: 0,
              fontSize: 11 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.35,
              ...example,
            }}
          >
            氏名・顔写真・生年月日と氏名の組み合わせ
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              borderRadius: 11 * SCALE,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
              padding: `${5 * SCALE}px ${9 * SCALE}px`,
              ...note,
            }}
          >
            <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
              <Ms name="cancel" size={13 * SCALE} />
            </span>
            <span
              style={{
                minWidth: 0,
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
                lineHeight: 1.3,
              }}
            >
              亡くなった方の情報は含まない
            </span>
          </div>
        </div>
        <Img
          src={staticFile("images/ipa_sg/law-privacy.png")}
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
// P4: ★抽象→具体 — 照らし合わせれば分かる（容易照合性）
// ---------------------------------------------------------------------------

const TableCard: React.FC<{
  title: string;
  icon: string;
  rows: [string, string][];
  atSec: number;
  accent?: boolean;
}> = ({ title, icon, rows, atSec, accent }) => {
  const appear = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 4 * SCALE,
        borderRadius: 14 * SCALE,
        backgroundColor: accent ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
        padding: `${7 * SCALE}px ${9 * SCALE}px`,
        ...appear,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          lineHeight: 1.3,
        }}
      >
        <Ms name={icon} size={13 * SCALE} />
        {title}
      </span>
      {rows.map(([a, b]) => (
        <div
          key={a}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            borderTop: `${1 * SCALE}px solid ${colors.border}`,
            paddingTop: 3 * SCALE,
          }}
        >
          <span
            style={{
              flex: "none",
              fontFamily: fontMono,
              fontSize: 12 * SCALE,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {a}
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.25,
            }}
          >
            {b}
          </span>
        </div>
      ))}
    </div>
  );
};

const MatchingScene: React.FC = () => {
  const link = useAppear(segStart(SEG_P4, 3), { dy: 0 });
  const unknown = useAppear(segStart(SEG_P4, 2), { dy: 6 });
  const conc = useAppear(segStart(SEG_P4, 4), { dy: 10 });

  return (
    <SlideShell
      heading="照らし合わせれば分かる"
      icon={<Ms name="fact_check" size={videoType.slideHeadIcon} />}
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
        <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
          <TableCard
            title="人事評価の一覧表"
            icon="table_chart"
            rows={[
              ["1024", "評価 A"],
              ["1187", "評価 B"],
              ["1203", "評価 A"],
            ]}
            atSec={0.35}
          />
          <div
            style={{
              flex: "none",
              width: 34 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1 * SCALE,
              ...link,
            }}
          >
            <span style={{ color: colors.primary600, display: "flex" }}>
              <Ms name="compare_arrows" size={20 * SCALE} />
            </span>
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.primary600,
                lineHeight: 1.2,
              }}
            >
              照らす
            </span>
          </div>
          <TableCard
            title="社内の社員名簿"
            icon="groups"
            rows={[
              ["1024", "佐藤 花子"],
              ["1187", "鈴木 太郎"],
              ["1203", "田中 一郎"],
            ]}
            atSec={segStart(SEG_P4, 3) + 0.3}
            accent
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE }}>
          <span
            style={{
              minWidth: 0,
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textMuted,
              lineHeight: 1.3,
              ...unknown,
            }}
          >
            番号だけでは誰か分からない
          </span>
        </div>

        {/* 字幕と同じ文にしない。画面は判断の分かれ目だけを言い切る */}
        <span style={{ fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.35, ...conc }}>
          分かれ目は、他の情報と<span style={markerStyle}>容易に照合</span>できるか
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 個人情報取扱事業者（3条件 → 用語）
// ---------------------------------------------------------------------------

const CondChip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const appear = usePop(atSec);
  return (
    <span
      style={{
        minWidth: 0,
        fontSize: 13 * SCALE,
        fontWeight: 800,
        color: colors.textPrimary,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 12 * SCALE,
        padding: `${6 * SCALE}px ${11 * SCALE}px`,
        lineHeight: 1.3,
        ...appear,
      }}
    >
      {text}
    </span>
  );
};

const Plus: React.FC<{ atSec: number }> = ({ atSec }) => {
  const appear = useAppear(atSec, { dy: 0 });
  return (
    <span style={{ flex: "none", color: colors.primary600, display: "flex", ...appear }}>
      <Ms name="arrow_forward" size={16 * SCALE} />
    </span>
  );
};

const OperatorScene: React.FC = () => {
  const lead = useAppear(0.3);
  const term = usePop(segStart(SEG_P5, 2));
  const band = useAppear(segStart(SEG_P5, 3), { dy: 10 });
  const last = useAppear(segStart(SEG_P5, 4), { dy: 8 });
  const base = segStart(SEG_P5, 1);

  return (
    <SlideShell
      heading="ルールを守るのは誰か"
      icon={<Ms name="business_center" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 8 * SCALE,
        }}
      >
        <span style={{ fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textMuted, ...lead }}>
          この三つがそろえば、法律が適用される
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
          <CondChip text="個人情報を持つ" atSec={base} />
          <Plus atSec={base + 0.3} />
          <CondChip text="データベースにする" atSec={base + 0.35} />
          <Plus atSec={base + 0.65} />
          <CondChip text="事業に使う" atSec={base + 0.7} />
        </div>

        <b style={{ fontSize: 27 * SCALE, fontWeight: 800, lineHeight: 1.25, ...term }}>
          <span style={markerStyle}>個人情報取扱事業者</span>
        </b>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            padding: `${6 * SCALE}px ${11 * SCALE}px`,
            ...band,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="info" size={14 * SCALE} />
          </span>
          <span style={{ minWidth: 0, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            規模は関係なし — ほとんどの会社が当てはまる
          </span>
        </div>

        {/* 字幕が「うちは小さいから関係ない、は通りません」を語るので、画面は具体例で補う */}
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...last }}>
          町の小さな店も、<span style={markerPinkStyle}>個人事業主</span>も対象になる
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 要配慮個人情報（wipe-light）
// ---------------------------------------------------------------------------

const SensitiveItem: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
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
        gap: 5 * SCALE,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        padding: `${6 * SCALE}px ${8 * SCALE}px`,
        ...appear,
      }}
    >
      <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
        <Ms name={icon} size={14 * SCALE} />
      </span>
      <b style={{ minWidth: 0, fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
        {label}
      </b>
    </div>
  );
};

const SensitiveScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(segStart(SEG_P6, 2));
  const why = useAppear(segStart(SEG_P6, 3), { dy: 8 });
  const band = useAppear(segStart(SEG_P6, 4), { dy: 10 });
  const base = segStart(SEG_P6, 1);

  return (
    <SlideShell narration={SEG_P6}>
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
        <div style={{ display: "flex", alignItems: "center", gap: "5%" }}>
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
            <Chip style={{ ...chip }}>とくに慎重に扱う個人情報</Chip>
            <b style={{ fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
              <span style={markerStyle}>要配慮個人情報</span>
            </b>
            <span
              style={{
                minWidth: 0,
                fontSize: 12 * SCALE,
                fontWeight: 700,
                color: colors.textSecondary,
                lineHeight: 1.4,
                ...why,
              }}
            >
              知られると差別や偏見に
              <br />
              つながるおそれがある情報
            </span>
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
            <div style={{ display: "flex", gap: 5 * SCALE }}>
              <SensitiveItem icon="public" label="人種" atSec={base} />
              <SensitiveItem icon="psychology" label="信条" atSec={base + 0.25} />
            </div>
            <div style={{ display: "flex", gap: 5 * SCALE }}>
              <SensitiveItem icon="favorite" label="病歴" atSec={base + 0.5} />
              {/* 「犯罪の経歴」はカード幅で2行に割れるので、試験で使われる短い形にする */}
              <SensitiveItem icon="gavel" label="犯罪歴" atSec={base + 0.75} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
            padding: `${6 * SCALE}px ${11 * SCALE}px`,
            ...band,
          }}
        >
          <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
            <Ms name="task_alt" size={14 * SCALE} />
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              lineHeight: 1.3,
            }}
          >
            ふつうの個人情報と違い、取得の時点で同意が要る
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 安全管理措置の4本柱
// ---------------------------------------------------------------------------

const PillarCard: React.FC<{
  icon: string;
  name: string;
  example: string;
  atSec: number;
  exampleAtSec: number;
}> = ({ icon, name, example, atSec, exampleAtSec }) => {
  const appear = usePop(atSec);
  const ex = useAppear(exampleAtSec, { dy: 6 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${9 * SCALE}px ${5 * SCALE}px`,
        borderRadius: 14 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          width: 26 * SCALE,
          height: 26 * SCALE,
          borderRadius: 11 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={16 * SCALE} />
      </span>
      <b style={{ minWidth: 0, fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{name}</b>
      <span
        style={{
          minWidth: 0,
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.3,
          textAlign: "center",
          ...ex,
        }}
      >
        {example}
      </span>
    </div>
  );
};

const SafetyScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(segStart(SEG_P7, 1));
  const band = useAppear(segStart(SEG_P7, 4), { dy: 10 });
  const base = segStart(SEG_P7, 2);
  const exBase = segStart(SEG_P7, 3);

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
          gap: 8 * SCALE,
        }}
      >
        <Chip style={{ ...chip }}>集めた情報を漏らさない義務</Chip>
        <b style={{ fontSize: 27 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
          <span style={markerStyle}>安全管理措置</span>
        </b>

        <div style={{ alignSelf: "stretch", display: "flex", gap: 6 * SCALE }}>
          <PillarCard
            icon="checklist"
            name="組織的"
            example="規程を決める"
            atSec={base}
            exampleAtSec={exBase}
          />
          <PillarCard
            icon="school"
            name="人的"
            example="研修をする"
            atSec={base + 0.3}
            exampleAtSec={exBase + 0.4}
          />
          <PillarCard
            icon="lock"
            name="物理的"
            example="鍵をかける"
            atSec={base + 0.6}
            exampleAtSec={exBase + 0.8}
          />
          <PillarCard
            icon="encrypted"
            name="技術的"
            example="アクセス制御"
            atSec={base + 0.9}
            exampleAtSec={exBase + 1.2}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            padding: `${5 * SCALE}px ${10 * SCALE}px`,
            ...band,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="history_edu" size={13 * SCALE} />
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.3,
            }}
          >
            管理策の四区分と同じ並び
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 第三者提供とオプトイン
// ---------------------------------------------------------------------------

const FlowNode: React.FC<{
  label: string;
  icon?: string;
  image?: string;
  atSec: number;
}> = ({ label, icon, image, atSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        flex: "none",
        width: 46 * SCALE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        ...appear,
      }}
    >
      {image ? (
        <Img
          src={staticFile(image)}
          style={{
            width: 34 * SCALE,
            height: 34 * SCALE,
            objectFit: "contain",
            mixBlendMode: "multiply",
          }}
        />
      ) : (
        <span
          style={{
            width: 30 * SCALE,
            height: 30 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            color: colors.textSecondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ms name={icon ?? "info"} size={17 * SCALE} />
        </span>
      )}
      <b
        style={{
          minWidth: 0,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          textAlign: "center",
        }}
      >
        {label}
      </b>
    </div>
  );
};

const FlowArrow: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const appear = useAppear(atSec, { dy: 0 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          minWidth: 0,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: colors.primary600,
          lineHeight: 1.25,
          textAlign: "center",
        }}
      >
        {label}
      </span>
      <span style={{ color: colors.primary500, display: "flex" }}>
        <Ms name="arrow_forward" size={18 * SCALE} />
      </span>
    </div>
  );
};

const ThirdPartyScene: React.FC = () => {
  const row = useAppear(0.3, { dy: 12 });
  const term = useAppear(segStart(SEG_P8, 2), { dy: 8 });
  const note = useAppear(segStart(SEG_P8, 3), { dy: 8 });

  return (
    <SlideShell
      heading="第三者提供のルール"
      icon={<Ms name="swap_horiz" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 9 * SCALE,
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            alignItems: "center",
            gap: 5 * SCALE,
            borderRadius: 16 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            padding: `${9 * SCALE}px ${13 * SCALE}px`,
            ...row,
          }}
        >
          <FlowNode label="本人" image="images/ipa_sg/person-customer.png" atSec={0.4} />
          <FlowArrow label="同意をもらう" atSec={segStart(SEG_P8, 1)} />
          <FlowNode label="自社" icon="business_center" atSec={0.55} />
          <FlowArrow label="提供する" atSec={segStart(SEG_P8, 1) + 0.5} />
          <FlowNode label="他社" icon="apartment" atSec={segStart(SEG_P8, 1) + 0.7} />
        </div>

        <span style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.3, ...term }}>
          先に同意をもらう方式 — <span style={markerStyle}>オプトイン</span>
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
            padding: `${6 * SCALE}px ${11 * SCALE}px`,
            ...note,
          }}
        >
          <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
            <Ms name="gpp_bad" size={14 * SCALE} />
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
            同意なしの名簿の売買は、この原則に反する
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: オプトイン と オプトアウト の比較表（行ごとに語りへ同期）
// ---------------------------------------------------------------------------

const CompareRow: React.FC<{
  k: string;
  inText: string;
  outText: string;
  atSec: number;
  danger?: boolean;
}> = ({ k, inText, outText, atSec, danger }) => {
  const appear = useAppear(atSec, { dy: 8 });
  const cell: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    fontSize: 12.5 * SCALE,
    fontWeight: 800,
    lineHeight: 1.3,
    textAlign: "center",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5 * SCALE,
        borderTop: `${1.5 * SCALE}px solid ${colors.border}`,
        paddingTop: 6 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          flex: 0.85,
          minWidth: 0,
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          lineHeight: 1.3,
        }}
      >
        {k}
      </span>
      <span style={cell}>{inText}</span>
      <span style={{ ...cell, color: danger ? colors.accentPinkText : colors.textPrimary }}>
        {outText}
      </span>
    </div>
  );
};

const OptOutScene: React.FC = () => {
  const head = useAppear(0.3, { dy: 8 });
  const outHead = usePop(segStart(SEG_P9, 0) + 0.4);
  const conc = useAppear(segStart(SEG_P9, 4), { dy: 10 });

  const headCell: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    fontSize: 14 * SCALE,
    fontWeight: 800,
    lineHeight: 1.3,
    textAlign: "center",
  };

  return (
    <SlideShell
      heading="二つの提供のしかた"
      icon={<Ms name="alt_route" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14 * SCALE,
        }}
      >
        {/* 表を白いカードで囲うと、行が出そろうまで「空の箱」が数秒居座る（工程7で確認して外した）。
            地・枠を持たせず、各行の上罫線だけで表の形を作る */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6 * SCALE,
            padding: `0 ${4 * SCALE}px`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
            <span style={{ flex: 0.85, minWidth: 0 }} />
            <b style={{ ...headCell, ...head }}>
              <span style={markerStyle}>オプトイン</span>
            </b>
            <b style={{ ...headCell, ...outHead }}>
              <span style={markerStyle}>オプトアウト</span>
            </b>
          </div>
          <CompareRow
            k="本人の同意"
            inText="先にもらう"
            outText="求められたら止める"
            atSec={segStart(SEG_P9, 1)}
          />
          <CompareRow
            k="委員会への届け出"
            inText="不要"
            outText="必要"
            atSec={segStart(SEG_P9, 2)}
          />
          <CompareRow
            k="要配慮個人情報"
            inText="使える"
            outText="使えない"
            atSec={segStart(SEG_P9, 3)}
            danger
          />
        </div>

        {/* 字幕が「慎重に扱う情報は、必ず事前の同意が要るのです」を語るので、画面は用語で言い切る */}
        <span style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.3, ...conc }}>
          要配慮個人情報は、<span style={markerPinkStyle}>事前の同意だけ</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 個人情報保護委員会
// ---------------------------------------------------------------------------

const DirectionBand: React.FC<{
  dir: string;
  items: string[];
  atSec: number;
  accent?: boolean;
}> = ({ dir, items, atSec, accent }) => {
  const appear = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4 * SCALE,
        borderRadius: 14 * SCALE,
        backgroundColor: accent ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
        padding: `${7 * SCALE}px ${10 * SCALE}px`,
        ...appear,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          color: colors.textMuted,
          lineHeight: 1.25,
        }}
      >
        <Ms name="arrow_forward" size={12 * SCALE} />
        {dir}
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 * SCALE }}>
        {items.map((x) => (
          <span
            key={x}
            style={{
              minWidth: 0,
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.textPrimary,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 999,
              padding: `${3 * SCALE}px ${8 * SCALE}px`,
              lineHeight: 1.3,
            }}
          >
            {x}
          </span>
        ))}
      </div>
    </div>
  );
};

const CommissionScene: React.FC = () => {
  // 委員会のカードはこのページの主題そのものなので先に出す（1文目の間、本文が空にならない）
  const card = useAppear(0.35, { dy: 12 });
  const illust = useAppear(0.5);
  const chip = useAppear(segStart(SEG_P10, 4), { dy: 8 });

  return (
    <SlideShell
      heading="見張る役所"
      icon={<Ms name="account_balance" size={videoType.slideHeadIcon} />}
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
        <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
          <div
            style={{
              flex: 0.8,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
              borderRadius: 16 * SCALE,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.primary500}`,
              padding: `${8 * SCALE}px ${9 * SCALE}px`,
              ...card,
            }}
          >
            {/* column の中なので実寸で置く（flex で伸ばすと高さ0に潰れる） */}
            <Img
              src={staticFile("images/ipa_sg/icon-gov.png")}
              style={{
                width: 34 * SCALE,
                height: 26 * SCALE,
                objectFit: "contain",
                mixBlendMode: "multiply",
                ...illust,
              }}
            />
            <b
              style={{
                minWidth: 0,
                fontSize: 13 * SCALE,
                fontWeight: 800,
                lineHeight: 1.25,
                textAlign: "center",
              }}
            >
              <span style={markerStyle}>個人情報保護委員会</span>
            </b>
            <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
              独立した監督官庁
            </span>
          </div>

          <div
            style={{
              flex: 1.8,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
            }}
          >
            <DirectionBand
              dir="委員会から事業者へ"
              items={["報告を求める", "立入検査", "命令"]}
              atSec={segStart(SEG_P10, 2)}
            />
            <DirectionBand
              dir="事業者から委員会へ"
              items={["漏えいしたときの報告"]}
              atSec={segStart(SEG_P10, 3)}
              accent
            />
          </div>
        </div>

        <Chip style={{ alignSelf: "flex-start", ...chip }}>本人への通知もあわせて必要</Chip>
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

export const SgL49PersonalInfoProtection: VideoSpec = {
  id: "sg-L49-personal-info-protection",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "その情報、\n個人情報かもしれない",
      keywords: ["個人情報", "要配慮", "オプトイン"],
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
      name: "definition",
      durationSec: 7,
      narration: SEG_P3,
      component: DefinitionScene,
    },
    {
      pattern: "custom",
      name: "matching",
      durationSec: 7,
      narration: SEG_P4,
      component: MatchingScene,
    },
    {
      pattern: "custom",
      name: "operator",
      durationSec: 7,
      narration: SEG_P5,
      component: OperatorScene,
    },
    {
      pattern: "custom",
      name: "sensitive",
      durationSec: 7,
      narration: SEG_P6,
      component: SensitiveScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "safeguards",
      durationSec: 7,
      narration: SEG_P7,
      component: SafetyScene,
    },
    {
      pattern: "custom",
      name: "third-party",
      durationSec: 6,
      narration: SEG_P8,
      component: ThirdPartyScene,
    },
    {
      pattern: "custom",
      name: "opt-out",
      durationSec: 7,
      narration: SEG_P9,
      component: OptOutScene,
    },
    {
      pattern: "custom",
      name: "commission",
      durationSec: 7,
      narration: SEG_P10,
      component: CommissionScene,
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
      question: "個人情報にあたるのはどちら？",
      choices: [
        { key: "A", text: "亡くなった方の氏名と住所" },
        { key: "B", text: "名簿と照合できる社員番号の表", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "オプトアウトで提供できないのは？",
      choices: [
        { key: "A", text: "要配慮個人情報", correct: true },
        { key: "B", text: "氏名と住所だけの名簿" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "個人情報が漏えいした時の報告先は？",
      choices: [
        { key: "A", text: "業界団体の相談窓口" },
        { key: "B", text: "個人情報保護委員会", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "個人情報＝生存する個人を識別できる情報", checkAtSec: segStart(SEG_P15, 0) },
        { text: "集めた側に安全管理措置と提供のルール", checkAtSec: segStart(SEG_P15, 1) },
        { text: "要配慮個人情報は取得に本人の同意が必要", checkAtSec: segStart(SEG_P15, 2) },
      ],
      narration: SEG_P15,
      transitionIn: "wipe",
    },
  ],
};
