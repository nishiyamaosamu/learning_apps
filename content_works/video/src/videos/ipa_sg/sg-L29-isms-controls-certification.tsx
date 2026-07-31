import { Img, interpolateColors, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L29-isms-controls-certification.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L29: ISMS②：管理策と認証制度
 *
 * 発注書 content_works/ipa_sg/orders/L29.md の範囲。
 * シナリオは narration/ipa_sg/sg-L29-isms-controls-certification.md。
 *
 * 「具体的に何をやるかのカタログ（管理策）と、外部に証明する仕組み（認証）」を背骨に:
 *   導入（型は分かった、では何を？）→ 27001と27002の対（vs）→ 管理策・管理目的・有効性 →
 *   wipe-light で ★管理策の4区分 → 抽象→具体の場面（ノートPC持ち出し）→ 管理策タイプ（時間軸）→
 *   wipe-light で ISMS適合性評価制度 → 情報セキュリティガバナンス → クイズ幕間 → クイズ3問 →
 *   wipe でまとめ。
 *
 * L28（ISMS①）の直後なので、**ISMS の定義・適用範囲・PDCA・リーダーシップ・内部監査・
 * 是正処置は再説明しない**（s02-1 の「前回は、ISMSという仕組みの型を学びました」で受けるだけ）。
 * 呼称は L28（ISMS／JIS Q 27001）・L27（規程）・L24/L25（リスク）に揃えた。
 *
 * 範囲: 個々の管理策の中身（アクセス制御・ログ管理・物理対策）は第4章 L34〜L41、
 * ISMAP は L31、プライバシーマーク・JIS Q 15001 は L50、4区分の選定演習は L81 なので触れない。
 *
 * 音声と字幕を分けた箇所（TTS の誤読対策・jobs.json 側だけ仮名書き。字幕はここの表記が出る）:
 *   ISMS → アイエスエムエス
 *   27001 → にまんななせんいち / 27002 → にまんななせんに / 27014 → にまんななせんじゅうよん
 *   （v1 は 27001・27002 を数字のまま渡していたが、読み上げが回ごとに揺れると差し戻された。
 *   規格番号は桁の切り方が安定しないので、音声側は最初から仮名書きにする。字幕は数字のまま）
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L29-isms-controls-certification");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "前回は、ISMSという仕組みの型を学びました。"),
  N("s02-2.mp3", "けれど、実際に何をやればよいかは、まだ具体的ではありません。"),
  N("s02-3.mp3", "一から自分で考えると、大事な対策が抜け落ちてしまいます。"),
  N("s02-4.mp3", "そこで頼りになるのが、先人がまとめた対策のカタログです。"),
];

const SEG_STD = [
  N("s03-1.mp3", "ISMSの要求事項を定めた規格が、JIS Q 27001です。"),
  N("s03-2.mp3", "こちらは、何を満たすべきかを示す規格です。"),
  N("s03-3.mp3", "対になるのが、JIS Q 27002という規格です。"),
  N("s03-4.mp3", "こちらは、具体的にどうやるかをまとめた、実践の手引です。"),
  N("s03-5.mp3", "認証の基準は27001、27002は対策を選ぶためのカタログです。"),
];

const SEG_CONTROL = [
  N("s04-1.mp3", "27002に並ぶ一つ一つの対策を、管理策といいます。"),
  N("s04-2.mp3", "たとえば、入退室を記録する、ログを取る、といったものです。"),
  N("s04-3.mp3", "それぞれの管理策には、何のためにやるかという管理目的があります。"),
  N("s04-4.mp3", "大切なのは、導入して終わりにしないことです。"),
  N("s04-5.mp3", "ねらいどおりに効いているかを確かめること、これが有効性です。"),
];

const SEG_FOUR = [
  N("s05-1.mp3", "管理策は、大きく四つの区分に分けて整理されます。"),
  N("s05-2.mp3", "一つ目は組織的な管理策で、規程を作り、役割や責任を決めます。"),
  N("s05-3.mp3", "二つ目は人的な管理策で、教育や秘密保持の取り決めが入ります。"),
  N("s05-4.mp3", "三つ目は物理的な管理策で、入退室の管理や施錠が入ります。"),
  N("s05-5.mp3", "四つ目は技術的な管理策で、アクセス制御や暗号化が入ります。"),
  N("s05-6.mp3", "次の章では、この四つの順に具体策を学びます。"),
];

const SEG_CASE = [
  N("s06-1.mp3", "一つの場面で、四つの区分がどう組み合わさるかを見ます。"),
  N("s06-2.mp3", "顧客名簿の入ったノートパソコンを、社外へ持ち出す場面です。"),
  N("s06-3.mp3", "持ち出しの申請と承認の手順を決めるのが、組織的な管理策です。"),
  N("s06-4.mp3", "注意点を研修で伝えるのが、人的な管理策です。"),
  N("s06-5.mp3", "鍵のかかる場所に保管するのが物理的、暗号化が技術的です。"),
  N("s06-6.mp3", "四つを組み合わせて、はじめてリスクが小さくなります。"),
];

const SEG_TYPE = [
  N("s07-1.mp3", "管理策には、もう一つの整理のしかたがあります。"),
  N("s07-2.mp3", "時間の軸で見る、管理策タイプという分け方です。"),
  N("s07-3.mp3", "事前に防ぐものが予防、起きたことに気づくものが検知です。"),
  N("s07-4.mp3", "気づいたあとすぐ動くものが対応、もとに戻すものが復旧です。"),
  N("s07-5.mp3", "たとえば監視カメラは、異常に気づくための検知にあたります。"),
  N("s07-6.mp3", "予防だけ厚くしても、気づけなければ被害は広がります。"),
];

const SEG_CERT = [
  N("s08-1.mp3", "ここからは、外に向けて示す仕組みの話です。"),
  N("s08-2.mp3", "ISMSが要求事項を満たしているかを、第三者が審査します。"),
  N("s08-3.mp3", "これを、ISMS適合性評価制度といいます。"),
  N("s08-4.mp3", "審査に通ると、ISMS認証を受けた組織として登録されます。"),
  N("s08-5.mp3", "認証は、製品が安全だという保証ではありません。"),
  N("s08-6.mp3", "情報を守る仕組みがある、と取引先に示せるのが価値です。"),
];

const SEG_GOV = [
  N("s09-1.mp3", "最後に、ISMSより一つ上の層の話をします。"),
  N("s09-2.mp3", "経営層がISMSの向かう先を決め、うまく働いているかを見守ります。"),
  N("s09-3.mp3", "この方向づけとモニタリングが、情報セキュリティガバナンスです。"),
  N("s09-4.mp3", "JIS Q 27014という規格が、その考え方を示しています。"),
  N("s09-5.mp3", "管理者がISMSを回し、経営層が経営の課題として扱います。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "管理策の実践の手引を示すのは、どちらの規格でしょうか。"),
  N("s11-3.mp3", "正解は、JIS Q 27002です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "監視カメラは、どの区分でどのタイプの管理策でしょうか。"),
  N("s12-3.mp3", "正解は、物理的な管理策で、タイプは検知です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "ISMS認証が示しているのは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、情報を守る仕組みが組織にあることです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s14-1.mp3", "JIS Q 27001が要求事項、27002が管理策の手引です。"),
  N("s14-2.mp3", "管理策は、組織的、人的、物理的、技術的の四つに分かれます。"),
  N("s14-3.mp3", "第三者の審査で認証を受けるのが、ISMS適合性評価制度です。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** アイコン + ラベル + 補足 の1行（枠は付けず、余白と色で見せる） */
const IconRow: React.FC<{
  icon: string;
  label: string;
  sub: string;
  atSec: number;
}> = ({ icon, label, sub, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE, ...row }}>
      <span
        style={{
          width: 28 * SCALE,
          height: 28 * SCALE,
          flex: "none",
          borderRadius: 10 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 1.5 * SCALE, minWidth: 0 }}>
        <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{label}</b>
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {sub}
        </span>
      </span>
    </div>
  );
};

/** 「これではない／これだ」の2行。× はグレー、○ は青ベタで二重符号化 */
const ContrastRow: React.FC<{
  mark: string;
  text: string;
  /** 省略すると1行だけの低い行になる（本文の高さを詰めたいときに使う） */
  sub?: string;
  on: boolean;
  atSec: number;
}> = ({ mark, text, sub, on, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        padding: `${8 * SCALE}px ${12 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: on ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${on ? colors.primary500 : colors.border}`,
        ...row,
      }}
    >
      <span
        style={{
          flex: "none",
          display: "flex",
          color: on ? colors.primary600 : colors.textMuted,
        }}
      >
        <Ms name={mark} size={18 * SCALE} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 1.5 * SCALE, minWidth: 0 }}>
        <b
          style={{
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.25,
            color: on ? colors.primary800 : colors.textSecondary,
          }}
        >
          {text}
        </b>
        {sub ? (
          <span
            style={{
              fontSize: 9.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.3,
            }}
          >
            {sub}
          </span>
        ) : null}
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// s02: 導入 — 型は分かった、では具体的に何をやる？（左テキスト + 右イラスト）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const illust = useAppear(0.5);
  const lead = useAppear(0.3, { dy: 14 });
  const concl = useAppear(segStart(SEG_INTRO, 3), { dy: 12 });
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.2,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 11 * SCALE,
          }}
        >
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.45,
              whiteSpace: "pre-line",
              ...lead,
            }}
          >
            {"仕組みの型は分かった\nでは、"}
            <span style={markerStyle}>何をやればいい？</span>
          </span>
          <IconRow
            icon="psychology"
            label="一から自分で考える"
            sub="大事な対策が抜け落ちる"
            atSec={segStart(SEG_INTRO, 2)}
          />
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.35,
              ...concl,
            }}
          >
            {/* 字幕がフル文を語るので、画面は要点だけ（1行に収める） */}
            <span style={markerStyle}>対策のカタログ</span>が要る
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-leader-think.png")}
          style={{
            flex: 0.95,
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
// s04: 管理策・管理目的・有効性（キーワード見出し + 右に3要素）
// ---------------------------------------------------------------------------

/** 「入退室を記録する」などの例を小さなチップで並べる1行 */
const ExampleChips: React.FC<{ items: string[]; atSec: number }> = ({ items, atSec }) => {
  const row = useAppear(atSec, { dy: 10 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...row }}>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: colors.textMuted,
          whiteSpace: "nowrap",
        }}
      >
        たとえば
      </span>
      {items.map((t) => (
        <span
          key={t}
          style={{
            fontSize: 10.5 * SCALE,
            fontWeight: 800,
            color: colors.primary800,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary100}`,
            borderRadius: 999,
            padding: `${3 * SCALE}px ${10 * SCALE}px`,
            whiteSpace: "nowrap",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
};

const ControlScene: React.FC = () => {
  const chip = useAppear(0.3, { dy: 10 });
  const term = usePop(0.5);
  const desc = useAppear(0.9, { dy: 10 });
  const negate = useAppear(segStart(SEG_CONTROL, 3), { dy: 10 });
  return (
    <SlideShell narration={SEG_CONTROL}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
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
              whiteSpace: "nowrap",
              ...chip,
            }}
          >
            リスクに手を打つ具体策
          </span>
          <b style={{ fontSize: 34 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>管理策</span>
          </b>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...desc,
            }}
          >
            {"JIS Q 27002 に並ぶ\n一つ一つの対策"}
          </span>
        </div>
        <div
          style={{
            flex: 1.15,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 9 * SCALE,
          }}
        >
          <ExampleChips
            items={["入退室を記録する", "ログを取る"]}
            atSec={segStart(SEG_CONTROL, 1)}
          />
          <IconRow
            icon="target"
            label="管理目的"
            sub="何のためにやるのか"
            atSec={segStart(SEG_CONTROL, 2)}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...negate }}>
            <span style={{ flex: "none", display: "flex", color: colors.textMuted }}>
              <Ms name="cancel" size={15 * SCALE} />
            </span>
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                lineHeight: 1.3,
              }}
            >
              導入して終わりにしない
            </span>
          </div>
          <IconRow
            icon="monitoring"
            label="有効性"
            sub="効いているかを確かめる"
            atSec={segStart(SEG_CONTROL, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s05: ★管理策の4区分（アイコン横4カード＝第4章の予告編）
// ---------------------------------------------------------------------------

const CategoryCard: React.FC<{
  no: string;
  icon: string;
  name: string;
  examples: string;
  atSec: number;
}> = ({ no, icon, name, examples, atSec }) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5 * SCALE,
        padding: `${10 * SCALE}px ${6 * SCALE}px ${12 * SCALE}px`,
        borderRadius: 14 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...card,
      }}
    >
      <span
        style={{
          width: 17 * SCALE,
          height: 17 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 10 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {no}
      </span>
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
        <Ms name={icon} size={21 * SCALE} />
      </span>
      <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        {name}
      </b>
      <span
        style={{
          fontSize: 9 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.4,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {examples}
      </span>
    </div>
  );
};

const FourCategoriesScene: React.FC = () => {
  const foot = useAppear(segStart(SEG_FOUR, 5), { dy: 12 });
  return (
    <SlideShell
      heading="管理策は4つの区分で整理する"
      icon={<Ms name="category" size={videoType.slideHeadIcon} />}
      narration={SEG_FOUR}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 9 * SCALE,
        }}
      >
        <div style={{ display: "flex", gap: 8 * SCALE }}>
          <CategoryCard
            no="1"
            icon="checklist"
            name="組織的"
            examples={"規程を作る\n役割を決める"}
            atSec={segStart(SEG_FOUR, 1)}
          />
          <CategoryCard
            no="2"
            icon="school"
            name="人的"
            examples={"教育・研修\n秘密保持"}
            atSec={segStart(SEG_FOUR, 2)}
          />
          <CategoryCard
            no="3"
            icon="apartment"
            name="物理的"
            examples={"入退室の管理\n施錠"}
            atSec={segStart(SEG_FOUR, 3)}
          />
          <CategoryCard
            no="4"
            icon="settings"
            name="技術的"
            examples={"アクセス制御\n暗号化"}
            atSec={segStart(SEG_FOUR, 4)}
          />
        </div>
        <span
          style={{
            alignSelf: "center",
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...foot,
          }}
        >
          次の章は<span style={markerStyle}>この順</span>に進みます
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s06: 【抽象→具体】ノートPC持ち出しに4区分が同時にかかる（左イラスト + 右4行）
// ---------------------------------------------------------------------------

const MeasureRow: React.FC<{
  icon: string;
  text: string;
  chip: string;
  atSec: number;
}> = ({ icon, text, chip, atSec }) => {
  const row = useAppear(atSec, { dy: 10 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE, ...row }}>
      <span
        style={{
          width: 24 * SCALE,
          height: 24 * SCALE,
          flex: "none",
          borderRadius: 9 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={15 * SCALE} />
      </span>
      <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.25, minWidth: 0 }}>
        {text}
      </b>
      <span
        style={{
          marginLeft: "auto",
          flex: "none",
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          borderRadius: 999,
          padding: `${3 * SCALE}px ${11 * SCALE}px`,
          whiteSpace: "nowrap",
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
        }}
      >
        {chip}
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => {
  const illust = useAppear(0.4);
  const scene = useAppear(segStart(SEG_CASE, 1), { dy: 12 });
  const foot = useAppear(segStart(SEG_CASE, 5), { dy: 12 });
  return (
    <SlideShell
      heading="1つの場面に4つが同時にかかる"
      icon={<Ms name="work" size={videoType.slideHeadIcon} />}
      narration={SEG_CASE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          alignItems: "center",
          gap: "4%",
        }}
      >
        <Img
          src={staticFile("images/ipa_sg/person-employee-m-laptop.png")}
          style={{
            flex: 0.8,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
        <div
          style={{
            flex: 1.6,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8 * SCALE,
          }}
        >
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...scene }}>
            <span style={markerStyle}>顧客名簿入りのノートPC</span>を社外へ持ち出す
          </span>
          <MeasureRow
            icon="checklist"
            text="申請と承認の手順を決める"
            chip="組織的"
            atSec={segStart(SEG_CASE, 2)}
          />
          <MeasureRow
            icon="school"
            text="注意点を研修で伝える"
            chip="人的"
            atSec={segStart(SEG_CASE, 3)}
          />
          <MeasureRow
            icon="apartment"
            text="鍵のかかる場所に保管する"
            chip="物理的"
            atSec={segStart(SEG_CASE, 4)}
          />
          <MeasureRow
            icon="settings"
            text="ディスクを暗号化する"
            chip="技術的"
            atSec={segStart(SEG_CASE, 4) + 1.0}
          />
          <span style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...foot }}>
            <span style={markerStyle}>四つを組み合わせて</span>はじめて効く
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s07: 管理策タイプ — 時間の軸（縦タイムライン。事故の瞬間を予防と検知の間に置く）
// ---------------------------------------------------------------------------

const TypeRow: React.FC<{
  name: string;
  desc: string;
  chip: string;
  atSec: number;
  /** この秒で行全体を青く点灯させる（監視カメラ＝検知の例に同期）。省略で点灯しない */
  lightAtSec?: number;
}> = ({ name, desc, chip, atSec, lightAtSec }) => {
  const row = useAppear(atSec, { dy: 10 });
  const on = useProgress(lightAtSec ?? 99999, 0.4);
  const dotBg = interpolateColors(on, [0, 1], [colors.primary100, colors.primary600]);
  const dotFg = interpolateColors(on, [0, 1], [colors.primary600, colors.textPrimaryDark]);
  const nameFg = interpolateColors(on, [0, 1], [colors.textPrimary, colors.primary800]);
  const chipBg = interpolateColors(on, [0, 1], [colors.primary50, colors.primary600]);
  const chipFg = interpolateColors(on, [0, 1], [colors.primary800, colors.textPrimaryDark]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE, ...row }}>
      <span
        style={{
          width: 20 * SCALE,
          height: 20 * SCALE,
          flex: "none",
          borderRadius: 999,
          backgroundColor: dotBg,
          color: dotFg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name="check_circle" size={13 * SCALE} />
      </span>
      <b
        style={{
          width: 34 * SCALE,
          flex: "none",
          fontSize: 14 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: nameFg,
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </b>
      <span
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {desc}
      </span>
      <span
        style={{
          marginLeft: "auto",
          flex: "none",
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          borderRadius: 999,
          padding: `${3 * SCALE}px ${11 * SCALE}px`,
          whiteSpace: "nowrap",
          backgroundColor: chipBg,
          color: chipFg,
        }}
      >
        {chip}
      </span>
    </div>
  );
};

const IncidentRow: React.FC<{ atSec: number }> = ({ atSec }) => {
  const row = useAppear(atSec, { dy: 10 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE, ...row }}>
      <span
        style={{
          width: 20 * SCALE,
          height: 20 * SCALE,
          flex: "none",
          borderRadius: 999,
          backgroundColor: colors.accentPink,
          color: colors.textPrimaryDark,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name="bolt" size={13 * SCALE} />
      </span>
      <b
        style={{
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          color: colors.accentPinkText,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        ここで事故が起きる
      </b>
    </div>
  );
};

const ControlTypeScene: React.FC = () => {
  // 軸だけが数秒ぽつんと立っているのを避けるため、「時間の軸で見る」と言う2文目で出す
  const line = useAppear(segStart(SEG_TYPE, 1));
  const foot = useAppear(segStart(SEG_TYPE, 5), { dy: 12 });
  const at = segStart(SEG_TYPE, 2);
  return (
    <SlideShell
      heading="管理策タイプ：時間の軸で見る"
      icon={<Ms name="timeline" size={videoType.slideHeadIcon} />}
      narration={SEG_TYPE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10 * SCALE,
        }}
      >
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          {/* 時間の軸（縦線）。行のドット（幅20×SCALE）の中心 = left 10×SCALE に合わせる */}
          <div
            style={{
              position: "absolute",
              left: 9 * SCALE,
              top: 10 * SCALE,
              bottom: 10 * SCALE,
              width: 2 * SCALE,
              borderRadius: 999,
              // primary100 では地(bg)との差が弱く「時間の軸」に見えないので primary300
              backgroundColor: colors.primary300,
              ...line,
            }}
          />
          <TypeRow name="予防" desc="事前に防ぐ" chip="施錠・教育" atSec={at} />
          <IncidentRow atSec={at + 0.8} />
          <TypeRow
            name="検知"
            desc="起きたことに気づく"
            chip="監視カメラ・ログ監視"
            atSec={at + 1.4}
            lightAtSec={segStart(SEG_TYPE, 4)}
          />
          <TypeRow
            name="対応"
            desc="すぐ動く"
            chip="切り離す・連絡する"
            atSec={segStart(SEG_TYPE, 3)}
          />
          <TypeRow
            name="復旧"
            desc="もとに戻す"
            chip="バックアップから戻す"
            atSec={segStart(SEG_TYPE, 3) + 1.2}
          />
        </div>
        <span
          style={{
            alignSelf: "center",
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...foot,
          }}
        >
          予防だけでは<span style={markerStyle}>気づけない</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s08: ISMS適合性評価制度 — 第三者の審査で認証（左バッジ + 右に制度名と○×）
// ---------------------------------------------------------------------------

const CertScene: React.FC = () => {
  const illust = useAppear(0.4);
  const chip = useAppear(segStart(SEG_CERT, 1), { dy: 10 });
  const name = usePop(segStart(SEG_CERT, 2));
  const sub = useAppear(segStart(SEG_CERT, 3), { dy: 10 });
  return (
    <SlideShell
      heading="第三者の審査で認証を受ける"
      icon={<Ms name="verified" size={videoType.slideHeadIcon} />}
      narration={SEG_CERT}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          alignItems: "center",
          gap: "4%",
        }}
      >
        <Img
          src={staticFile("images/ipa_sg/mgmt-cert-badge.png")}
          style={{
            flex: 0.85,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
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
          <span
            style={{
              fontSize: 9.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.primary800,
              backgroundColor: colors.primary100,
              borderRadius: 999,
              padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
              whiteSpace: "nowrap",
              ...chip,
            }}
          >
            第三者が審査する制度
          </span>
          <b
            style={{
              fontSize: 17 * SCALE,
              fontWeight: 800,
              lineHeight: 1.25,
              whiteSpace: "nowrap",
              ...name,
            }}
          >
            <span style={markerStyle}>ISMS適合性評価制度</span>
          </b>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.35,
              whiteSpace: "nowrap", // 2行になると本文があふれて見出し・字幕帯に食い込む
              ...sub,
            }}
          >
            通れば ISMS認証 として登録される
          </span>
          {/* ✗行は sub を省いて1行にしてある（本文の縦があふれるため） */}
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
            }}
          >
            <ContrastRow
              mark="cancel"
              text="製品の安全を保証するもの"
              on={false}
              atSec={segStart(SEG_CERT, 4)}
            />
            <ContrastRow
              mark="task_alt"
              text="守る仕組みが組織にあること"
              sub="取引先に示せるのが価値"
              on
              atSec={segStart(SEG_CERT, 5)}
            />
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s09: 情報セキュリティガバナンス — ISMS の一つ上の層（上下2層 + 双方向の連結）
// ---------------------------------------------------------------------------

const GovernanceScene: React.FC = () => {
  const top = useAppear(segStart(SEG_GOV, 1), { dy: 14 });
  const term = usePop(segStart(SEG_GOV, 2));
  const std = useAppear(segStart(SEG_GOV, 3), { dy: 10 });
  const link = useAppear(segStart(SEG_GOV, 2), { dy: 10 });
  const bottom = useAppear(0.3, { dy: 12 });
  const foot = useAppear(segStart(SEG_GOV, 4), { dy: 10 });
  return (
    <SlideShell
      heading="ISMSの一つ上の層"
      icon={<Ms name="account_balance" size={videoType.slideHeadIcon} />}
      narration={SEG_GOV}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        {/* 上の層 = 経営層 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
            padding: `${10 * SCALE}px ${14 * SCALE}px`,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.primary600,
            ...top,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE }}>
            <span
              style={{
                flex: "none",
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
                backgroundColor: colors.primary100,
                borderRadius: 999,
                padding: `${3 * SCALE}px ${11 * SCALE}px`,
                whiteSpace: "nowrap",
              }}
            >
              経営層
            </span>
            <span
              style={{
                fontSize: 11 * SCALE,
                fontWeight: 700,
                color: colors.textPrimaryDark,
                lineHeight: 1.3,
              }}
            >
              向かう先を決め、うまく働いているかを見守る
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE }}>
            <b
              style={{
                fontSize: 17 * SCALE,
                fontWeight: 800,
                color: colors.textPrimaryDark,
                lineHeight: 1.25,
                whiteSpace: "nowrap",
                ...term,
              }}
            >
              情報セキュリティガバナンス
            </b>
            <span
              style={{
                flex: "none",
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
                backgroundColor: colors.primary100,
                borderRadius: 999,
                padding: `${3 * SCALE}px ${11 * SCALE}px`,
                whiteSpace: "nowrap",
                ...std,
              }}
            >
              JIS Q 27014
            </span>
          </div>
        </div>

        {/* 上下をつなぐ双方向の連結（方向づけ ↓ ／ モニタリング ↑） */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12 * SCALE,
            ...link,
          }}
        >
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              whiteSpace: "nowrap",
            }}
          >
            方向づけ
          </span>
          <span
            style={{
              display: "flex",
              color: colors.primary500,
              transform: "rotate(90deg)",
            }}
          >
            <Ms name="compare_arrows" size={22 * SCALE} />
          </span>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              whiteSpace: "nowrap",
            }}
          >
            モニタリング
          </span>
        </div>

        {/* 下の層 = 管理者が ISMS を回す（前回学んだ層） */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9 * SCALE,
            padding: `${10 * SCALE}px ${14 * SCALE}px`,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...bottom,
          }}
        >
          <span
            style={{
              flex: "none",
              fontSize: 10 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              backgroundColor: colors.bg,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 999,
              padding: `${3 * SCALE}px ${11 * SCALE}px`,
              whiteSpace: "nowrap",
            }}
          >
            管理者
          </span>
          <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>ISMSを回す</b>
          <span
            style={{
              fontSize: 10.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.3,
            }}
          >
            前回学んだ層
          </span>
        </div>

        <span
          style={{
            alignSelf: "center",
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...foot,
          }}
        >
          現場任せにせず<span style={markerStyle}>経営の課題</span>として扱う
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

export const SgL29IsmsControlsCertification: VideoSpec = {
  id: "sg-L29-isms-controls-certification",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "ISMS②\n管理策と認証制度",
      keywords: ["管理策", "4つの区分", "ISMS認証"],
    },
    {
      pattern: "custom",
      name: "intro",
      durationSec: 5,
      narration: SEG_INTRO,
      component: IntroScene,
    },
    {
      pattern: "vs",
      heading: "二つの規格は対になっている",
      icon: "compare_arrows",
      left: {
        title: "JIS Q 27001",
        icon: "description",
        rows: [
          { k: "定めるもの", v: "ISMSの要求事項" },
          { k: "答える問い", v: "何を満たすか" },
          { k: "使いみち", v: "認証の基準になる" },
        ],
      },
      right: {
        title: "JIS Q 27002",
        icon: "menu_book",
        rows: [
          { k: "定めるもの", v: "管理策の実践の手引" },
          { k: "答える問い", v: "具体的にどうやるか" },
          { k: "使いみち", v: "対策を選ぶカタログ" },
        ],
      },
      columnAtSec: [segStart(SEG_STD, 0), segStart(SEG_STD, 2)],
      narration: SEG_STD,
    },
    {
      pattern: "custom",
      name: "control",
      durationSec: 6,
      narration: SEG_CONTROL,
      component: ControlScene,
    },
    {
      pattern: "custom",
      name: "four-categories",
      durationSec: 6,
      narration: SEG_FOUR,
      transitionIn: "wipe-light",
      component: FourCategoriesScene,
    },
    {
      pattern: "custom",
      name: "case-laptop",
      durationSec: 6,
      narration: SEG_CASE,
      component: CaseScene,
    },
    {
      pattern: "custom",
      name: "control-type",
      durationSec: 6,
      narration: SEG_TYPE,
      component: ControlTypeScene,
    },
    {
      pattern: "custom",
      name: "certification",
      durationSec: 6,
      narration: SEG_CERT,
      transitionIn: "wipe-light",
      component: CertScene,
    },
    {
      pattern: "custom",
      name: "governance",
      durationSec: 6,
      narration: SEG_GOV,
      component: GovernanceScene,
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
      question: "管理策の実践の手引を示すのは？",
      choices: [
        { key: "A", text: "JIS Q 27001" },
        { key: "B", text: "JIS Q 27002", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "監視カメラはどの管理策？",
      choices: [
        { key: "A", text: "物理的な管理策の検知", correct: true },
        { key: "B", text: "技術的な管理策の予防" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "ISMS認証が示しているのは？",
      choices: [
        { key: "A", text: "製品が安全だということ" },
        { key: "B", text: "守る仕組みが組織にあること", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行に収める（29文字が上限）
          text: "27001が要求事項、27002が管理策の手引。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "管理策は組織的・人的・物理的・技術的の4区分。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "第三者の審査で受けるのがISMS認証。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
