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
import durations from "./sg-L48-cybersecurity-basic-act.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L48:
 * サイバーセキュリティ基本法と不正アクセス禁止法（第6章＝法務の2本目）
 *
 * 発注書 content_works/ipa_sg/orders/L48.md に対応。
 * シナリオと用語の呼称は narration/ipa_sg/sg-L48-cybersecurity-basic-act.md が正。
 *
 * 導入（同僚のIDでログイン）→ 見取り図（2つの法律）→ 基本法：四者の責務 →
 * 基本法にもとづく2つの仕組み（戦略・協議会）→（wipe-light）不正アクセス行為の二つの型 →
 * ネットワーク越しが要件 → アクセス制御機能を備えた機器 → 助長する行為 →
 * ★抽象→具体：見ただけ・被害ゼロでも成立 → クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ
 *   「ID」→ アイディー、「NISC」→ ニスク、「席を外した」→ 席をはずした、「開ける」→ あける
 *   と仮名書きしている。字幕（下の N() 第2引数）は英字・漢字表記が正で、
 *   音声と原稿が食い違って見えるが意図的（references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L48-cybersecurity-basic-act");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "会社のパソコンには、必ずIDとパスワードがあります。"),
  N("s02-2.mp3", "では、同僚のIDで勝手にログインしたら、どうでしょうか。"),
  N("s02-3.mp3", "実はこれ、法律で禁じられた、れっきとした犯罪です。"),
  N("s02-4.mp3", "今回は、国の方針を決める法律と、この禁止のルールを見ます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "今回学ぶ法律は、二つあります。"),
  N("s03-2.mp3", "一つ目は、サイバーセキュリティ基本法です。"),
  N("s03-3.mp3", "国全体で、どう守っていくかの土台を決めた法律です。"),
  N("s03-4.mp3", "二つ目は、不正アクセス禁止法です。"),
  N("s03-5.mp3", "こちらは、やってはいけない行為を、はっきり決めています。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "サイバーセキュリティ基本法の柱は、責務を決めたことです。"),
  N("s04-2.mp3", "国は、全体の方針を作り、対策を進める役割を負います。"),
  N("s04-3.mp3", "地方公共団体も、地域の実情に合わせて取り組みます。"),
  N("s04-4.mp3", "事業者は、自分たちの事業を守る努力が求められます。"),
  N("s04-5.mp3", "そして私たち国民も、関心を持ち、注意を払うよう努めます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "この法律にもとづいて、二つの仕組みが動いています。"),
  N("s05-2.mp3", "一つは、サイバーセキュリティ戦略です。"),
  N("s05-3.mp3", "国がこれから何をするかを、まとめた計画にあたります。"),
  N("s05-4.mp3", "もう一つは、サイバーセキュリティ協議会です。"),
  N("s05-5.mp3", "国や企業が集まり、攻撃の情報を共有する枠組みです。"),
  // NISC は1字ずつ読まない略語なので、字幕には初出1回だけ読みを添える
  N("s05-6.mp3", "戦略本部やNISC（ニスク）も、この法律にもとづく組織です。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "ここからは、不正アクセス禁止法です。"),
  N("s06-2.mp3", "禁止されている不正アクセス行為には、二つの型があります。"),
  N("s06-3.mp3", "一つ目は、他人のIDとパスワードを使う、なりすましです。"),
  N("s06-4.mp3", "二つ目は、システムの弱点を突いて入り込む方法です。"),
  N("s06-5.mp3", "どちらも、許されていない人が中に入る行為です。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "ここで、大事な条件が一つあります。"),
  N("s07-2.mp3", "不正アクセス行為は、ネットワークを通じて行われるものです。"),
  N("s07-3.mp3", "目の前のパソコンを直接操作するのは、この法律の対象外です。"),
  N("s07-4.mp3", "離れた場所から、通信を使って入り込む。これが要件です。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "もう一つ、守られるコンピュータにも条件があります。"),
  N("s08-2.mp3", "対象は、アクセス制御機能を備えたコンピュータです。"),
  N("s08-3.mp3", "IDとパスワードなどで、利用者を確かめる仕組みのことです。"),
  N("s08-4.mp3", "裏を返すと、パスワードすら無い機器は、対象になりません。"),
  // 音声は「あける」（jobs.json）。字幕は漢字表記が正
  N("s08-5.mp3", "鍵のかかった扉だからこそ、開ける行為が罪になるのです。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "この法律は、自分で入る行為だけを罰するのではありません。"),
  N("s09-2.mp3", "他人のパスワードを、無断で第三者に教える。"),
  N("s09-3.mp3", "これは、不正アクセスを助長する行為として禁じられています。"),
  N("s09-4.mp3", "売る場合はもちろん、親切のつもりで教えた場合も同じです。"),
  N("s09-5.mp3", "自分は一度もログインしていなくても、罰の対象になります。"),
];

const SEG_P10 = [
  // 音声は「席をはずした」（jobs.json）。「対象外」に引きずられる誤読の予防
  N("s10-1.mp3", "たとえば、席を外した同僚のIDでログインしたとします。"),
  N("s10-2.mp3", "見たのは社内の資料が一つだけで、何も壊していません。"),
  N("s10-3.mp3", "それでも、ログインした時点で不正アクセス行為は成立します。"),
  N("s10-4.mp3", "被害が無くても犯罪で、罰則もきちんと定められています。"),
  N("s10-5.mp3", "パスワードを教えてもらっていた、では済みません。"),
  N("s10-6.mp3", "IDは自分だけのもの。ここが、この法律の考え方です。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "他人のパスワードを無断で教える行為は、どうなるでしょうか。"),
  N("s12-3.mp3", "正解は、助長する行為として禁止、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "不正アクセス禁止法が守るのは、どちらの機器でしょうか。"),
  N("s13-3.mp3", "正解は、アクセス制御機能を備えた機器です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "同僚のIDでログインし、見ただけの場合はどうでしょうか。"),
  N("s14-3.mp3", "正解は、その時点で違反になる、です。", { gapBeforeSec: 1.8 }),
];

const SEG_P15 = [
  N("s15-1.mp3", "基本法は、国から国民までの責務を定めた法律でした。"),
  N("s15-2.mp3", "不正アクセス行為は、なりすましと、弱点を突いた侵入です。"),
  N("s15-3.mp3", "パスワードを教える行為も罪。被害が無くても成立します。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P2: 導入 — ログイン画面の実物と、その先の判定
// ---------------------------------------------------------------------------

const LoginField: React.FC<{ label: string; value: string; mono?: boolean }> = ({
  label,
  value,
  mono,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 1.5 * SCALE }}>
    <span style={{ fontSize: 9 * SCALE, fontWeight: 800, color: colors.textMuted, lineHeight: 1.2 }}>
      {label}
    </span>
    <span
      style={{
        minWidth: 0,
        fontFamily: mono ? fontMono : undefined,
        fontSize: 12 * SCALE,
        fontWeight: 700,
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

const IntroScene: React.FC = () => {
  const mock = useAppear(0.3, { dy: 10 });
  const question = useAppear(segStart(SEG_P2, 1), { dy: 10 });
  const answer = usePop(segStart(SEG_P2, 2));
  const theme = useAppear(segStart(SEG_P2, 3));

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        {/* 社内システムのログイン画面（実物のモック） */}
        <div
          style={{
            flex: 0.95,
            minWidth: 0,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 14 * SCALE,
            padding: `${9 * SCALE}px ${10 * SCALE}px`,
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
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
            }}
          >
            <Ms name="lock" size={13 * SCALE} />
            社内システム
          </span>
          <LoginField label="ID" value="sato.k" mono />
          <LoginField label="パスワード" value="••••••••" mono />
          <span
            style={{
              alignSelf: "stretch",
              textAlign: "center",
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.textPrimaryDark,
              backgroundColor: colors.primary600,
              borderRadius: 9 * SCALE,
              padding: `${4 * SCALE}px 0`,
            }}
          >
            ログイン
          </span>
        </div>

        <div
          style={{
            flex: 1.25,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6 * SCALE,
          }}
        >
          <span
            style={{
              minWidth: 0,
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.4,
              ...question,
            }}
          >
            もし、同僚のIDで
            <br />
            勝手にログインしたら？
          </span>
          <b style={{ fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.25, ...answer }}>
            <span style={markerPinkStyle}>れっきとした犯罪</span>
          </b>
          <span
            style={{
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary100,
              borderRadius: 999,
              padding: `${2 * SCALE}px ${10 * SCALE}px`,
              ...theme,
            }}
          >
            今回：国の方針と、禁止のルール
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 今回の見取り図 — 番号つきの横帯2本
// ---------------------------------------------------------------------------

const LawBand: React.FC<{
  no: string;
  name: string;
  role: string;
  atSec: number;
  roleAtSec: number;
}> = ({ no, name, role, atSec, roleAtSec }) => {
  const appear = useAppear(atSec, { dy: 12 });
  const roleAppear = useAppear(roleAtSec, { dy: 6 });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 3 * SCALE,
        borderRadius: 14 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        padding: `${8 * SCALE}px ${10 * SCALE}px`,
        ...appear,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
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
        <b style={{ minWidth: 0, fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
          <span style={markerStyle}>{name}</span>
        </b>
      </div>
      <span
        style={{
          minWidth: 0,
          fontSize: 11.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.3,
          ...roleAppear,
        }}
      >
        {role}
      </span>
    </div>
  );
};

const MapScene: React.FC = () => {
  const lead = useAppear(0.3);
  const illust = useAppear(0.6);

  return (
    <SlideShell
      heading="今回の二つの法律"
      icon={<Ms name="gavel" size={videoType.slideHeadIcon} />}
      narration={SEG_P3}
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.5,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 6 * SCALE,
          }}
        >
          <span
            style={{
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.textMuted,
              ...lead,
            }}
          >
            土台を決める法と、線を引く法
          </span>
          <LawBand
            no="1"
            name="サイバーセキュリティ基本法"
            role="国全体で、どう守っていくかの土台"
            atSec={segStart(SEG_P3, 1)}
            roleAtSec={segStart(SEG_P3, 2)}
          />
          <LawBand
            no="2"
            name="不正アクセス禁止法"
            role="やってはいけない行為を、はっきり決める"
            atSec={segStart(SEG_P3, 3)}
            roleAtSec={segStart(SEG_P3, 4)}
          />
        </div>
        <Img
          src={staticFile("images/ipa_sg/law-book.png")}
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
// P4: 基本法 — 四者の責務（アイコン4連）
// ---------------------------------------------------------------------------

const DutyCard: React.FC<{
  icon: string;
  who: string;
  what: React.ReactNode;
  atSec: number;
}> = ({
  icon,
  who,
  what,
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
      <b style={{ minWidth: 0, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.25, textAlign: "center" }}>
        {who}
      </b>
      <span
        style={{
          minWidth: 0,
          fontSize: 10 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.35,
          textAlign: "center",
        }}
      >
        {what}
      </span>
    </div>
  );
};

const DutyScene: React.FC = () => {
  const lead = useAppear(0.3, { dy: 10 });

  return (
    <SlideShell
      heading="サイバーセキュリティ基本法"
      icon={<Ms name="policy" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 9 * SCALE,
        }}
      >
        <b style={{ fontSize: 21 * SCALE, fontWeight: 800, lineHeight: 1.25, ...lead }}>
          守るのは国だけではない — <span style={markerStyle}>四者の責務</span>
        </b>

        {/* 語の途中で折り返さないよう、各カードの説明は明示改行にしている */}
        <div style={{ display: "flex", gap: 6 * SCALE }}>
          <DutyCard
            icon="account_balance"
            who="国"
            what={
              <>
                全体の方針を作り
                <br />
                対策を進める
              </>
            }
            atSec={segStart(SEG_P4, 1)}
          />
          <DutyCard
            icon="apartment"
            who="地方公共団体"
            what={
              <>
                地域の実情に
                <br />
                合わせて取り組む
              </>
            }
            atSec={segStart(SEG_P4, 2)}
          />
          <DutyCard
            icon="business_center"
            who="事業者"
            what={
              <>
                自分たちの事業を
                <br />
                守る努力をする
              </>
            }
            atSec={segStart(SEG_P4, 3)}
          />
          <DutyCard
            icon="group"
            who="国民"
            what={
              <>
                関心を持ち
                <br />
                注意を払う
              </>
            }
            atSec={segStart(SEG_P4, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 基本法にもとづく二つの仕組み
// ---------------------------------------------------------------------------

const MechRow: React.FC<{
  no: string;
  name: string;
  desc: string;
  atSec: number;
  descAtSec: number;
}> = ({ no, name, desc, atSec, descAtSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const descAppear = useAppear(descAtSec, { dy: 6 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        borderRadius: 13 * SCALE,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary500}`,
        padding: `${7 * SCALE}px ${10 * SCALE}px`,
        ...appear,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 12 * SCALE,
          height: 12 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 9 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {no}
      </span>
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 1.5 * SCALE }}>
        <b style={{ minWidth: 0, fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
          {name}
        </b>
        <span
          style={{
            minWidth: 0,
            fontSize: 11 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
            ...descAppear,
          }}
        >
          {desc}
        </span>
      </div>
    </div>
  );
};

const MechanismScene: React.FC = () => {
  const base = useAppear(0.3, { dy: 10 });
  const band = useAppear(segStart(SEG_P5, 5), { dy: 8 });

  return (
    <SlideShell
      heading="基本法にもとづく仕組み"
      icon={<Ms name="account_tree" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
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
        <div style={{ display: "flex", alignItems: "center", gap: "3.5%" }}>
          <div
            style={{
              flex: 0.85,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 3 * SCALE,
              borderRadius: 14 * SCALE,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              padding: `${9 * SCALE}px ${10 * SCALE}px`,
              ...base,
            }}
          >
            <span style={{ fontSize: 9.5 * SCALE, fontWeight: 800, color: colors.textMuted }}>
              根拠となる法律
            </span>
            <b style={{ minWidth: 0, fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
              サイバー
              <br />
              セキュリティ
              <br />
              基本法
            </b>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3 * SCALE,
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                color: colors.primary600,
              }}
            >
              <Ms name="arrow_forward" size={12 * SCALE} />二つの仕組み
            </span>
          </div>

          <div
            style={{
              flex: 1.6,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
            }}
          >
            <MechRow
              no="1"
              name="サイバーセキュリティ戦略"
              desc="国がこれから何をするかの計画"
              atSec={segStart(SEG_P5, 1)}
              descAtSec={segStart(SEG_P5, 2)}
            />
            <MechRow
              no="2"
              name="サイバーセキュリティ協議会"
              desc="国や企業が攻撃の情報を共有する枠組み"
              atSec={segStart(SEG_P5, 3)}
              descAtSec={segStart(SEG_P5, 4)}
            />
          </div>
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
            以前学んだ戦略本部・NISC も、根拠はこの法律
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 不正アクセス行為の二つの型（wipe-light）
// ---------------------------------------------------------------------------

const TypeCard: React.FC<{ icon: string; title: string; desc: string; atSec: number }> = ({
  icon,
  title,
  desc,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${8 * SCALE}px ${10 * SCALE}px`,
        borderRadius: 14 * SCALE,
        backgroundColor: colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
        ...appear,
      }}
    >
      <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
        <Ms name={icon} size={19 * SCALE} />
      </span>
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 * SCALE }}>
        <b style={{ minWidth: 0, fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
          {title}
        </b>
        <span
          style={{
            minWidth: 0,
            fontSize: 10.5 * SCALE,
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
};

const UnauthorizedAccessScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const note = useAppear(segStart(SEG_P6, 4), { dy: 8 });

  return (
    <SlideShell narration={SEG_P6}>
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
          不正アクセス禁止法が禁じる行為
        </span>
        <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
          <span style={markerStyle}>不正アクセス行為</span>
        </b>

        <div style={{ alignSelf: "stretch", display: "flex", gap: 6 * SCALE, marginTop: 2 * SCALE }}>
          <TypeCard
            icon="person"
            title="なりすまし"
            desc="他人のIDとパスワードを使う"
            atSec={segStart(SEG_P6, 2)}
          />
          <TypeCard
            icon="bug_report"
            title="弱点を突く"
            desc="システムの弱点から入り込む"
            atSec={segStart(SEG_P6, 3)}
          />
        </div>

        <span
          style={{
            minWidth: 0,
            fontSize: 13.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.35,
            ...note,
          }}
        >
          {/* 字幕（＝ナレーション全文）と同じ文にしない。画面は言い切りだけを受け持つ */}
          どちらか一方でも<span style={markerPinkStyle}>不正アクセス行為</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: ネットワークを通じて、が要件 — 対象と対象外の2経路
// ---------------------------------------------------------------------------

/* ラベルは4文字まで。width 40×SCALE に対して 9×SCALE の4文字が1行で収まる幅にしてある
   （初版は width 30×SCALE で「その機器」が2行に割れ、ページが本文領域からはみ出した） */
const PathNode: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <div
    style={{
      flex: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2 * SCALE,
      width: 40 * SCALE,
    }}
  >
    <span
      style={{
        width: 22 * SCALE,
        height: 22 * SCALE,
        borderRadius: 10 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        color: colors.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={13 * SCALE} />
    </span>
    <span
      style={{
        minWidth: 0,
        fontSize: 9 * SCALE,
        fontWeight: 800,
        color: colors.textSecondary,
        lineHeight: 1.25,
        textAlign: "center",
      }}
    >
      {label}
    </span>
  </div>
);

const PathRow: React.FC<{
  ok: boolean;
  via: string;
  verdict: string;
  fromIcon: string;
  fromLabel: string;
  toIcon: string;
  toLabel: string;
  atSec: number;
}> = ({ ok, via, verdict, fromIcon, fromLabel, toIcon, toLabel, atSec }) => {
  const appear = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        borderRadius: 14 * SCALE,
        backgroundColor: ok ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${ok ? colors.accentPink : colors.border}`,
        padding: `${5 * SCALE}px ${10 * SCALE}px`,
        ...appear,
      }}
    >
      <PathNode icon={fromIcon} label={fromLabel} />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1 * SCALE,
        }}
      >
        <span
          style={{
            minWidth: 0,
            fontSize: 11 * SCALE,
            fontWeight: 800,
            color: ok ? colors.accentPinkText : colors.textSecondary,
            lineHeight: 1.25,
            textAlign: "center",
          }}
        >
          {via}
        </span>
        <span style={{ color: ok ? colors.accentPink : colors.textMuted, display: "flex" }}>
          <Ms name="arrow_forward" size={17 * SCALE} />
        </span>
      </div>
      <PathNode icon={toIcon} label={toLabel} />
      <span
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          color: ok ? colors.accentPinkText : colors.textMuted,
          backgroundColor: colors.surface,
          border: `${1.5 * SCALE}px solid ${ok ? colors.accentPink : colors.border}`,
          borderRadius: 999,
          padding: `${3 * SCALE}px ${10 * SCALE}px`,
        }}
      >
        <Ms name={ok ? "gpp_bad" : "cancel"} size={13 * SCALE} />
        {verdict}
      </span>
    </div>
  );
};

const NetworkRequirementScene: React.FC = () => {
  const lead = useAppear(0.3);
  const conc = useAppear(segStart(SEG_P7, 3), { dy: 10 });

  return (
    <SlideShell
      heading="ネットワークを通じて、が要件"
      icon={<Ms name="lan" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
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
        <span style={{ fontSize: 10 * SCALE, fontWeight: 800, color: colors.textMuted, ...lead }}>
          不正アクセス行為になるか、ならないか
        </span>

        <PathRow
          ok
          fromIcon="laptop_mac"
          fromLabel="離れた所"
          via="ネットワークを通じて"
          toIcon="dns"
          toLabel="サーバ"
          verdict="不正アクセス行為"
          atSec={segStart(SEG_P7, 1)}
        />
        <PathRow
          ok={false}
          fromIcon="person"
          fromLabel="目の前"
          via="直接キーボードを操作"
          toIcon="computer"
          toLabel="その機器"
          verdict="この法律の対象外"
          atSec={segStart(SEG_P7, 2)}
        />

        <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, lineHeight: 1.35, ...conc }}>
          <span style={markerStyle}>離れた場所から、通信を使って入り込む</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: アクセス制御機能を備えたコンピュータ（キーワード見出し + 鍵のイラスト）
// ---------------------------------------------------------------------------

const AccessControlScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const desc = useAppear(segStart(SEG_P8, 2));
  const out = useAppear(segStart(SEG_P8, 3), { dy: 10 });
  const conc = useAppear(segStart(SEG_P8, 4), { dy: 8 });
  const illust = useAppear(0.7);

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
            守られるコンピュータの条件
          </span>
          <b style={{ fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>アクセス制御機能</span>
          </b>
          <span style={{ minWidth: 0, fontSize: 12 * SCALE, fontWeight: 700, lineHeight: 1.4, ...desc }}>
            IDとパスワードなどで
            <br />
            利用者を確かめる仕組み
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
              ...out,
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
              パスワードすら無い機器は対象外
            </span>
          </div>
          <span style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.35, ...conc }}>
            鍵がかかっているからこそ、
            <br />
            開ける行為が罪になる
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/icon-lock.png")}
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
// P9: 助長する行為 — 教えるだけでも罪
// ---------------------------------------------------------------------------

const ActorNode: React.FC<{ icon: string; label: string; danger?: boolean }> = ({
  icon,
  label,
  danger,
}) => (
  <div
    style={{
      flex: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3 * SCALE,
      // 4文字ラベル（システム）が1行で収まる幅にする（34×SCALE では「システ／ム」に割れた）
      width: 42 * SCALE,
    }}
  >
    <span
      style={{
        width: 26 * SCALE,
        height: 26 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: danger ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.border}`,
        color: danger ? colors.accentPinkText : colors.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
    </span>
    <span
      style={{
        minWidth: 0,
        fontSize: 10 * SCALE,
        fontWeight: 800,
        color: colors.textSecondary,
        lineHeight: 1.25,
        textAlign: "center",
      }}
    >
      {label}
    </span>
  </div>
);

const HandoffArrow: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
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
          color: colors.accentPinkText,
          lineHeight: 1.25,
          textAlign: "center",
        }}
      >
        {label}
      </span>
      <span style={{ color: colors.accentPink, display: "flex" }}>
        <Ms name="arrow_forward" size={17 * SCALE} />
      </span>
    </div>
  );
};

const AbettingScene: React.FC = () => {
  const lead = useAppear(0.3);
  const nodes = useAppear(segStart(SEG_P9, 1), { dy: 10 });
  const term = useAppear(segStart(SEG_P9, 2), { dy: 8 });
  const chip1 = useAppear(segStart(SEG_P9, 3), { dy: 8 });
  const chip2 = usePop(segStart(SEG_P9, 4));

  return (
    <SlideShell
      heading="教えるだけでも罪になる"
      icon={<Ms name="forum" size={videoType.slideHeadIcon} />}
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
        <span style={{ fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textMuted, ...lead }}>
          罰せられるのは、自分で入る人だけではない
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5 * SCALE,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            padding: `${8 * SCALE}px ${12 * SCALE}px`,
            ...nodes,
          }}
        >
          <ActorNode icon="person" label="自分" danger />
          <HandoffArrow label="パスワードを教える" atSec={segStart(SEG_P9, 1)} />
          <ActorNode icon="group" label="第三者" />
          <HandoffArrow label="ログイン" atSec={segStart(SEG_P9, 1) + 0.5} />
          <ActorNode icon="dns" label="システム" />
        </div>

        <span style={{ minWidth: 0, fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.3, ...term }}>
          これも罪 — <span style={markerStyle}>助長する行為</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
          <span
            style={{
              minWidth: 0,
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 999,
              padding: `${3 * SCALE}px ${11 * SCALE}px`,
              ...chip1,
            }}
          >
            売っても、親切のつもりでも同じ
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
              borderRadius: 999,
              padding: `${3 * SCALE}px ${11 * SCALE}px`,
              ...chip2,
            }}
          >
            自分は入っていなくても罰の対象
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: ★抽象→具体 — 見ただけでも、被害ゼロでも成立する
// ---------------------------------------------------------------------------

const CaseLine: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const appear = useAppear(atSec, { dy: 6 });
  return (
    <span
      style={{
        minWidth: 0,
        display: "flex",
        alignItems: "flex-start",
        gap: 4 * SCALE,
        fontSize: 11.5 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        lineHeight: 1.3,
        ...appear,
      }}
    >
      <span style={{ flex: "none", color: colors.textMuted, display: "flex" }}>
        <Ms name="label" size={12 * SCALE} />
      </span>
      {text}
    </span>
  );
};

const CaseScene: React.FC = () => {
  const card = useAppear(0.3, { dy: 12 });
  const illust = useAppear(0.5);
  const judge = useAppear(segStart(SEG_P10, 2), { dy: 12 });
  const result = usePop(segStart(SEG_P10, 2) + 0.4);
  const band = useAppear(segStart(SEG_P10, 3), { dy: 8 });
  const last = useAppear(segStart(SEG_P10, 5), { dy: 8 });

  return (
    <SlideShell
      heading="見ただけでも、成立する"
      icon={<Ms name="warning" size={videoType.slideHeadIcon} />}
      narration={SEG_P10}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: 6 * SCALE,
        }}
      >
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "3%" }}>
          {/* 場面 */}
          <div
            style={{
              flex: 1.25,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 14 * SCALE,
              padding: `${8 * SCALE}px ${10 * SCALE}px`,
              ...card,
            }}
          >
            {/* column ではなく row の中だが、実寸で置く（flex で伸ばすと潰れる） */}
            <Img
              src={staticFile("images/ipa_sg/person-employee-m-laptop.png")}
              style={{
                flex: "none",
                width: 34 * SCALE,
                height: 42 * SCALE,
                objectFit: "contain",
                mixBlendMode: "multiply",
                ...illust,
              }}
            />
            <div
              style={{
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 4 * SCALE,
              }}
            >
              <span style={{ fontSize: 10 * SCALE, fontWeight: 800, color: colors.textMuted }}>
                席を外した同僚のパソコンで
              </span>
              {/* 1行に収まる長さにする（初版は「一つだ／け」「持ち出し／てもいない」と割れた） */}
              <CaseLine text="同僚のIDでログインした" atSec={segStart(SEG_P10, 0) + 0.4} />
              <CaseLine text="見たのは資料が一つだけ" atSec={segStart(SEG_P10, 1)} />
              <CaseLine text="何も壊していない" atSec={segStart(SEG_P10, 1) + 0.5} />
            </div>
          </div>

          {/* 判定 */}
          <div
            style={{
              flex: 0.95,
              minWidth: 0,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
              borderRadius: 14 * SCALE,
              padding: `${9 * SCALE}px ${10 * SCALE}px`,
              display: "flex",
              flexDirection: "column",
              gap: 4 * SCALE,
              ...judge,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4 * SCALE,
                fontSize: 11 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
              }}
            >
              <Ms name="gpp_bad" size={13 * SCALE} />
              ログインした時点で
            </span>
            <b style={{ minWidth: 0, fontSize: 18 * SCALE, fontWeight: 800, lineHeight: 1.3, ...result }}>
              不正アクセス
              <br />
              行為が成立
            </b>
          </div>
        </div>

        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            padding: `${5 * SCALE}px ${10 * SCALE}px`,
            ...band,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="gavel" size={14 * SCALE} />
          </span>
          <span style={{ minWidth: 0, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            被害が無くても犯罪 — 罰則も定められている
          </span>
        </div>

        <span
          style={{
            flex: "none",
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...last,
          }}
        >
          <span style={markerPinkStyle}>IDは自分だけのもの</span>
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

export const SgL48CybersecurityBasicAct: VideoSpec = {
  id: "sg-L48-cybersecurity-basic-act",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "国の備えと\n越えてはいけない線",
      keywords: ["基本法", "不正アクセス", "助長行為"],
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
      durationSec: 7,
      narration: SEG_P3,
      component: MapScene,
    },
    {
      pattern: "custom",
      name: "duties",
      durationSec: 7,
      narration: SEG_P4,
      component: DutyScene,
    },
    {
      pattern: "custom",
      name: "mechanisms",
      durationSec: 8,
      narration: SEG_P5,
      component: MechanismScene,
    },
    {
      pattern: "custom",
      name: "unauthorized-access",
      durationSec: 7,
      narration: SEG_P6,
      component: UnauthorizedAccessScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "network-requirement",
      durationSec: 6,
      narration: SEG_P7,
      component: NetworkRequirementScene,
    },
    {
      pattern: "custom",
      name: "access-control",
      durationSec: 7,
      narration: SEG_P8,
      component: AccessControlScene,
    },
    {
      pattern: "custom",
      name: "abetting",
      durationSec: 7,
      narration: SEG_P9,
      component: AbettingScene,
    },
    {
      pattern: "custom",
      name: "case-no-damage",
      durationSec: 8,
      narration: SEG_P10,
      component: CaseScene,
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
      question: "他人のパスワードを教える行為は？",
      choices: [
        { key: "A", text: "自分が使わなければ問題ない" },
        { key: "B", text: "助長する行為として禁止", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "不正アクセス禁止法が守る機器は？",
      choices: [
        { key: "A", text: "アクセス制御機能を備えた機器", correct: true },
        { key: "B", text: "社内に置かれた機器のすべて" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "同僚のIDで入り見ただけなら？",
      choices: [
        { key: "A", text: "被害が無いので違反ではない" },
        { key: "B", text: "その時点で違反になる", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "基本法は国から国民までの責務を定める", checkAtSec: segStart(SEG_P15, 0) },
        { text: "不正アクセスはなりすましと弱点狙い", checkAtSec: segStart(SEG_P15, 1) },
        { text: "教える行為も罪。被害が無くても成立", checkAtSec: segStart(SEG_P15, 2) },
      ],
      narration: SEG_P15,
      transitionIn: "wipe",
    },
  ],
};
