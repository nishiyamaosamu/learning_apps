import { Img, staticFile } from "remotion";
import { colors, markerStyle, markerPinkStyle, fontMono, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L34-people-security.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L34: 人的セキュリティ対策
 *
 * 発注書 content_works/ipa_sg/orders/L34.md（範囲の正）に対応。
 * シナリオ・用語の呼称・リズム設計は narration/ipa_sg/sg-L34-people-security.md。
 *
 * 第4章の「人」側。教育・訓練・手続・約束の4種類を、L6 の不正のトライアングルで串刺しにする:
 *   導入（鍵を開けるのは人）→ 内部不正防止ガイドライン → ★機会・動機・正当化のどれを潰すか →
 *   啓発と教育 → wipe-light で「訓練で試す」へ → 標的型メール訓練 → レッドチーム演習 →
 *   認証情報の割当てと管理 → セキュリティクリアランス → 秘密保持契約・誓約書 →
 *   ★抽象→具体（Aさんの最終出社日）→ クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   不正のトライアングル・状況的犯罪予防・割れ窓理論の定義は L6 が主担当なので戻らず、
 *   s04 は「三つがそろうと起こる」だけ受けて**対策の側**を語る。
 *   アクセス権の設定・特権管理（技術側の統制）は L36 なので、s08 は「アカウントを渡す／
 *   取り上げる手続き」に限定する。秘密保持契約の法的な扱いは L53、教育計画の提案と
 *   内部不正のケース演習は L95。ペネトレーションテストの中身は L33（違いを言うだけ）。
 *   ガイドラインの発行元（機関名）は L31 の領分なので語らない。ブルーチームは発注書に無いので
 *   「守る側」と呼ぶ。
 *
 * 音声と字幕が違う箇所（narration.md の決まり。字幕は N() の第2引数が正）:
 *   Aさん→エーさん（s11-1 / s11-4）。ラテン文字を1字ずつ読ませないための措置。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L34-people-security");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、人的セキュリティ対策について学びます。"),
  N("s02-2.mp3", "どれだけ機器で固めても、鍵を開けてしまうのは人です。"),
  N("s02-3.mp3", "だから人は、組織で最大の弱点であり、同時に最初の防衛線になります。"),
  N("s02-4.mp3", "教育と訓練と約束で、その人の穴をふさいでいきましょう。"),
];

const SEG_GUIDE = [
  N("s03-1.mp3", "まず、内部不正を防ぐための実務のまとめがあります。"),
  N("s03-2.mp3", "組織における内部不正防止ガイドラインです。"),
  N("s03-3.mp3", "前に学んだ不正のトライアングルを、対策の側から整理してくれます。"),
];

const SEG_TRIANGLE = [
  N("s04-1.mp3", "不正は、機会、動機、正当化の三つがそろったときに起こります。"),
  N("s04-2.mp3", "機会は、権限を必要な分だけにして、記録が残るようにして減らします。"),
  N("s04-3.mp3", "動機は、相談できる窓口や、納得できる評価のしかたで和らげます。"),
  N("s04-4.mp3", "正当化は、ルールをはっきり示し、約束を交わすことでさせません。"),
  N("s04-5.mp3", "どれを潰すのかを決めてから、対策を選ぶのがこつです。"),
];

const SEG_EDU = [
  N("s05-1.mp3", "次は、情報セキュリティの啓発と教育です。"),
  N("s05-2.mp3", "全員に基本を浸透させる、終わりのない活動です。"),
  N("s05-3.mp3", "人は忘れますし、攻撃の手口も変わるので、一度だけでは足りません。"),
  N("s05-4.mp3", "だから、形を変えて繰り返し伝えることが必要になります。"),
];

const SEG_DRILL = [
  N("s06-1.mp3", "教えたことが身についているかは、訓練で確かめます。"),
  N("s06-2.mp3", "標的型メール訓練では、本物そっくりの訓練メールを社員に送ります。"),
  N("s06-3.mp3", "ここで大事なのは、開いてしまった人を責めないことです。"),
  N("s06-4.mp3", "どこが弱いのかを組織として知り、備えを鍛えるのがねらいです。"),
];

const SEG_RED = [
  N("s07-1.mp3", "もっと本格的に試すのが、レッドチーム演習です。"),
  N("s07-2.mp3", "攻撃役のチームが、実際の攻撃者のように本気で攻めてきます。"),
  N("s07-3.mp3", "試されるのは、守る側が気づけるか、正しく動けるかです。"),
  N("s07-4.mp3", "前回のペネトレーションテストとの違いは、人と組織まで試すことです。"),
];

const SEG_CRED = [
  N("s08-1.mp3", "人に何を渡し、いつ取り上げるかを決めるのが、認証情報の割当てと管理です。"),
  N("s08-2.mp3", "入社のときは、必要な分だけを渡します。"),
  N("s08-3.mp3", "異動したら渡し直し、退職の日には、その日のうちに止めます。"),
  N("s08-4.mp3", "止め忘れた退職者のアカウントは、内部不正の入口になります。"),
];

const SEG_CLEAR = [
  N("s09-1.mp3", "情報の側から見ると、セキュリティクリアランスという考え方があります。"),
  N("s09-2.mp3", "その人が扱ってよい情報のレベルを、あらかじめ決めておくことです。"),
  N("s09-3.mp3", "適性を確かめたうえで、機密に触れられる範囲を人ごとに決めます。"),
];

const SEG_NDA = [
  N("s10-1.mp3", "最後は、約束で縛る対策です。"),
  N("s10-2.mp3", "秘密保持契約や誓約書を、入社のときや退職のときに交わします。"),
  N("s10-3.mp3", "技術で守れるのは、その人が社内にいる間だけです。"),
  N("s10-4.mp3", "約束なら、辞めたあとまで効き続けます。"),
];

const SEG_CASE = [
  // 音声は「…えいぎょうのエーさんが…」
  N("s11-1.mp3", "たとえば、顧客名簿を扱っていた営業のAさんが退職する日を考えます。"),
  N("s11-2.mp3", "まず、秘密は退職後も守ると書いた誓約書に、署名してもらいます。"),
  N("s11-3.mp3", "次に、貸していた端末を返してもらいます。"),
  // 音声は「…エーさんのアカウントを…」
  N("s11-4.mp3", "そしてその日のうちに、Aさんのアカウントを止めます。"),
  N("s11-5.mp3", "これで顧客名簿には入れなくなり、持ち出す機会が消えます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s13-1.mp3", "ここで問題です。"),
  N("s13-2.mp3", "標的型メール訓練のねらいは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、組織の弱点を知って備えを鍛える、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s14-1.mp3", "次の問題です。"),
  N("s14-2.mp3", "退職の日にアカウントを止めるのは、三つのうちどれを潰す対策でしょうか。"),
  N("s14-3.mp3", "正解は、機会です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s15-1.mp3", "最後の問題です。"),
  N("s15-2.mp3", "人や組織の動きまで試すのは、どちらでしょうか。"),
  N("s15-3.mp3", "正解は、レッドチーム演習です。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s16-1.mp3", "内部不正への対策は、機会、動機、正当化のどれを潰すのかで整理します。"),
  N("s16-2.mp3", "教育と訓練は繰り返し、標的型メール訓練では人を責めずに弱点を測ります。"),
  N("s16-3.mp3", "アカウントは渡す時と止める時を決め、約束は辞めたあとまで効き続けます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（その語が何の一種か・いまどの話をしているか） */
const Chip: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{
      flex: "none",
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: `${2.5 * SCALE}px ${10 * SCALE}px`,
      color: colors.primary800,
      backgroundColor: colors.primary100,
    }}
  >
    {text}
  </span>
);

/** 下部に置く一言の注記チップ */
const NoteChip: React.FC<{ icon: string; text: string; atSec: number; warn?: boolean }> = ({
  icon,
  text,
  atSec,
  warn,
}) => {
  const chip = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${6 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: warn ? colors.accentPinkSurface : colors.primary50,
        border: `${1.5 * SCALE}px solid ${warn ? colors.accentPinkSoft : colors.primary100}`,
        color: warn ? colors.accentPinkText : colors.primary800,
        fontSize: 10.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      {text}
    </span>
  );
};

/** アイコンの器（丸角の淡いブロック） */
const IconBox: React.FC<{ icon: string; size?: number }> = ({ icon, size = 28 }) => (
  <span
    style={{
      flex: "none",
      width: size * SCALE,
      height: size * SCALE,
      borderRadius: (size / 2.6) * SCALE,
      backgroundColor: colors.primary50,
      color: colors.primary600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Ms name={icon} size={size * 0.62 * SCALE} />
  </span>
);

// ---------------------------------------------------------------------------
// P2: 導入 — 左イラスト + 右テキスト（機器で固めても、鍵を開けるのは人）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const themeAppear = useAppear(0.3);
  const keyAppear = useAppear(segStart(SEG_INTRO, 1), { dy: 10 });
  const leadAppear = useAppear(segStart(SEG_INTRO, 2), { dy: 12 });
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-employee-f-worry.png")}
          style={{
            flex: 0.9,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.25,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 10 * SCALE,
          }}
        >
          <span style={{ ...themeAppear, display: "flex", flexDirection: "column", gap: 5 * SCALE }}>
            <Chip text="今回のテーマ" />
            <b style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
              人的セキュリティ対策
            </b>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8 * SCALE,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.accentPinkText,
              whiteSpace: "nowrap",
              ...keyAppear,
            }}
          >
            <Ms name="key" size={15 * SCALE} />
            機器で固めても、鍵を開けてしまうのは人
          </span>
          {/* このページの結論。marker は1ページ1本に絞る */}
          <b
            style={{
              fontSize: 16 * SCALE,
              fontWeight: 800,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"人は最大の弱点であり、\n"}
            <span style={markerStyle}>最初の防衛線</span>
          </b>
          <NoteChip
            icon="school"
            text="教育・訓練・約束で、人の穴をふさぐ"
            atSec={segStart(SEG_INTRO, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 内部不正防止ガイドライン — 中央のキーワード見出し（疎）
// ---------------------------------------------------------------------------

const GuidelineScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(segStart(SEG_GUIDE, 1), { dy: 12 });
  const useAppearDesc = useAppear(segStart(SEG_GUIDE, 2), { dy: 10 });
  return (
    <SlideShell narration={SEG_GUIDE}>
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
        <span style={chipAppear}>
          <Chip text="内部不正対策の実務のまとめ" />
        </span>
        <b
          style={{
            flex: "none",
            fontSize: 26 * SCALE,
            fontWeight: 800,
            lineHeight: 1.25,
            textAlign: "center",
            whiteSpace: "pre-line",
            ...termAppear,
          }}
        >
          {"組織における\n"}
          <span style={markerStyle}>内部不正防止ガイドライン</span>
        </b>
        <span
          style={{
            flex: "none",
            marginTop: 3 * SCALE,
            fontSize: 13 * SCALE,
            fontWeight: 700,
            lineHeight: 1.4,
            color: colors.textSecondary,
            textAlign: "center",
            ...useAppearDesc,
          }}
        >
          不正のトライアングルを、
          <span style={{ color: colors.primary600 }}>対策の側から</span>
          整理してくれる
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: ★どれを潰すか — 3カード（要素 → 潰し方）+ 結論バンド
// ---------------------------------------------------------------------------

const FactorCard: React.FC<{
  icon: string;
  factor: string;
  main: boolean;
  how: string;
  atSec: number;
}> = ({ icon, factor, main, how, atSec }) => {
  const card = useAppear(atSec, { dy: 14 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5 * SCALE,
        padding: `${10 * SCALE}px ${9 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${main ? colors.primary300 : colors.border}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      <IconBox icon={icon} size={24} />
      <b style={{ fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        {factor}
      </b>
      {main ? (
        <Chip text="対策の中心" />
      ) : (
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            color: colors.textMuted,
            whiteSpace: "nowrap",
          }}
          // 高さを揃えるための空きラベル（機会カードのチップと同じ行）
        >
          人の内側にある
        </span>
      )}
      <span
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 700,
          lineHeight: 1.35,
          color: colors.textSecondary,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {how}
      </span>
    </div>
  );
};

const TriangleScene: React.FC = () => {
  const conclusionAppear = useAppear(segStart(SEG_TRIANGLE, 4), { dy: 10 });
  return (
    <SlideShell
      heading="三つのうち、どれを潰すか"
      icon={<Ms name="account_tree" size={videoType.slideHeadIcon} />}
      narration={SEG_TRIANGLE}
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
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 12 * SCALE }}>
          <FactorCard
            icon="lock"
            factor="機会"
            main
            how={"権限は必要な分だけ\n記録が残るようにする"}
            atSec={segStart(SEG_TRIANGLE, 1)}
          />
          <FactorCard
            icon="forum"
            factor="動機"
            main={false}
            how={"相談できる窓口\n納得できる評価"}
            atSec={segStart(SEG_TRIANGLE, 2)}
          />
          <FactorCard
            icon="gavel"
            factor="正当化"
            main={false}
            how={"ルールをはっきり示す\n約束を交わす"}
            atSec={segStart(SEG_TRIANGLE, 3)}
          />
        </div>
        <b
          style={{
            flex: "none",
            alignSelf: "center",
            fontSize: 14 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...conclusionAppear,
          }}
        >
          <span style={markerStyle}>どれを潰すのか</span>を決めてから、対策を選ぶ
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 啓発と教育 — 左テキスト + 右イラスト（P2 の鏡像）
// ---------------------------------------------------------------------------

const ReasonRow: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 8 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        fontSize: 12 * SCALE,
        fontWeight: 700,
        lineHeight: 1.3,
        color: colors.textSecondary,
        whiteSpace: "nowrap",
        ...row,
      }}
    >
      <span style={{ color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={16 * SCALE} />
      </span>
      {text}
    </span>
  );
};

const EducationScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const descAppear = useAppear(segStart(SEG_EDU, 1), { dy: 10 });
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_EDU}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.25,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 9 * SCALE,
          }}
        >
          <span style={chipAppear}>
            <Chip text="全員に基本を浸透させる" />
          </span>
          <b style={{ fontSize: 28 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>啓発と教育</span>
          </b>
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.4,
              ...descAppear,
            }}
          >
            終わりのない活動
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5 * SCALE,
              marginTop: 1 * SCALE,
            }}
          >
            <ReasonRow icon="psychology" text="人は忘れる" atSec={segStart(SEG_EDU, 2)} />
            <ReasonRow
              icon="autorenew"
              text="攻撃の手口も変わる"
              atSec={segStart(SEG_EDU, 2) + 0.7}
            />
          </div>
          <NoteChip
            icon="campaign"
            text="形を変えて、繰り返し伝える"
            atSec={segStart(SEG_EDU, 3)}
          />
        </div>
        <Img
          src={staticFile("images/ipa_sg/mgmt-education.png")}
          style={{
            flex: 0.95,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 標的型メール訓練 — 訓練メールのモックカード（章の転換 / wipe-light）
// ---------------------------------------------------------------------------

const MailRow: React.FC<{ label: string; value: string; mono?: boolean }> = ({
  label,
  value,
  mono,
}) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 9 * SCALE }}>
    <span
      style={{
        flex: "none",
        width: 26 * SCALE,
        fontSize: 9.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        color: colors.textMuted,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontSize: 11 * SCALE,
        fontWeight: 700,
        lineHeight: 1.25,
        color: colors.textPrimary,
        fontFamily: mono ? fontMono : undefined,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  </div>
);

const DrillScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const mailAppear = useAppear(segStart(SEG_DRILL, 1), { dy: 14 });
  const stampAppear = usePop(segStart(SEG_DRILL, 1) + 1.6);
  const blameAppear = useAppear(segStart(SEG_DRILL, 2), { dy: 10 });
  const aimAppear = useAppear(segStart(SEG_DRILL, 3), { dy: 10 });
  return (
    <SlideShell narration={SEG_DRILL}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12 * SCALE,
        }}
      >
        <span
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 11 * SCALE,
          }}
        >
          <span style={chipAppear}>
            <Chip text="身についたかを試す" />
          </span>
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>標的型メール訓練</span>
          </b>
        </span>
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 14 * SCALE }}>
          {/* 本物そっくりの訓練メール（実物を1通だけ見せる） */}
          <div
            style={{
              flex: 1.3,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
              padding: `${12 * SCALE}px ${14 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 14 * SCALE,
              ...mailAppear,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8 * SCALE,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7 * SCALE,
                  color: colors.primary600,
                }}
              >
                <Ms name="mail" size={16 * SCALE} />
                <span style={{ fontSize: 10 * SCALE, fontWeight: 800, color: colors.textMuted }}>
                  受信トレイ
                </span>
              </span>
              {/* 本物に見えるカードへ、あとから「訓練」の判子が押される */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5 * SCALE,
                  padding: `${3 * SCALE}px ${9 * SCALE}px`,
                  borderRadius: 999,
                  backgroundColor: colors.primary100,
                  color: colors.primary800,
                  fontSize: 9.5 * SCALE,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  ...stampAppear,
                }}
              >
                <Ms name="school" size={13 * SCALE} />
                これは訓練メール
              </span>
            </span>
            <MailRow label="差出人" value="人事部 <hr@example.co.jp>" mono />
            <MailRow label="件名" value="【至急】人事評価シートのご提出" />
            <MailRow label="添付" value="評価シート.xlsx" />
          </div>
          {/* 訓練のねらい（責めない → 弱点を知る） */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 9 * SCALE,
            }}
          >
            <b
              style={{
                fontSize: 15 * SCALE,
                fontWeight: 800,
                lineHeight: 1.35,
                whiteSpace: "pre-line",
                ...blameAppear,
              }}
            >
              {"開いてしまった人を、\n"}
              <span style={markerPinkStyle}>責めない</span>
            </b>
            <span
              style={{
                fontSize: 11.5 * SCALE,
                fontWeight: 700,
                lineHeight: 1.4,
                color: colors.textSecondary,
                whiteSpace: "pre-line",
                ...aimAppear,
              }}
            >
              {"弱いところを組織として知り、\n備えを鍛えるのがねらい"}
            </span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: レッドチーム演習 — 攻撃役 → 守る側 の対決図 + ペネトレとの違い
// ---------------------------------------------------------------------------

const TeamTile: React.FC<{
  icon: string;
  name: string;
  sub: string;
  danger?: boolean;
  atSec: number;
}> = ({ icon, name, sub, danger, atSec }) => {
  const tile = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5 * SCALE,
        padding: `${10 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: danger ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${danger ? colors.accentPinkSoft : colors.border}`,
        borderRadius: 16 * SCALE,
        ...tile,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 26 * SCALE,
          height: 26 * SCALE,
          borderRadius: 10 * SCALE,
          backgroundColor: danger ? colors.surface : colors.primary50,
          color: danger ? colors.accentPinkText : colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <b
        style={{
          fontSize: 14 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          color: danger ? colors.accentPinkText : colors.textPrimary,
        }}
      >
        {name}
      </b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.35,
          color: colors.textSecondary,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {sub}
      </span>
    </div>
  );
};

const RedTeamScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const arrowAppear = useAppear(segStart(SEG_RED, 1) + 0.6, { dy: 0 });
  const diffAppear = useAppear(segStart(SEG_RED, 3), { dy: 12 });
  return (
    <SlideShell narration={SEG_RED}>
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
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 11 * SCALE,
          }}
        >
          <span style={chipAppear}>
            <Chip text="訓練の本気版" />
          </span>
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>レッドチーム演習</span>
          </b>
        </span>
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 10 * SCALE,
          }}
        >
          <TeamTile
            icon="gpp_bad"
            name="攻撃役のチーム"
            sub={"実際の攻撃者のように\n本気で攻めてくる"}
            danger
            atSec={segStart(SEG_RED, 1)}
          />
          <span
            style={{
              flex: "none",
              alignSelf: "center",
              color: colors.primary300,
              display: "flex",
              ...arrowAppear,
            }}
          >
            <Ms name="arrow_forward" size={20 * SCALE} />
          </span>
          <TeamTile
            icon="shield"
            name="守る側"
            sub={"気づけるか\n正しく動けるか"}
            atSec={segStart(SEG_RED, 2)}
          />
        </div>
        {/* 前回（L33）のペネトレーションテストとの違いだけを渡す */}
        <div
          style={{
            flex: "none",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            gap: 12 * SCALE,
            padding: `${7 * SCALE}px ${16 * SCALE}px`,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary100}`,
            ...diffAppear,
          }}
        >
          <span style={{ color: colors.primary600, display: "flex" }}>
            <Ms name="compare_arrows" size={17 * SCALE} />
          </span>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              color: colors.textSecondary,
              whiteSpace: "nowrap",
            }}
          >
            ペネトレーションテストはシステムまで
          </span>
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              color: colors.primary800,
              whiteSpace: "nowrap",
            }}
          >
            レッドチーム演習は人と組織まで
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 認証情報の割当てと管理 — 横帯3段（渡す→渡し直す→止める）+ 注意
// ---------------------------------------------------------------------------

const TimingBand: React.FC<{ when: string; what: string; atSec: number }> = ({
  when,
  what,
  atSec,
}) => {
  const band = useAppear(atSec, { dy: 14 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16 * SCALE,
        padding: `${7 * SCALE}px ${18 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...band,
      }}
    >
      <b
        style={{
          flex: "none",
          minWidth: 34 * SCALE,
          fontSize: 15 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: colors.primary600,
          whiteSpace: "nowrap",
        }}
      >
        {when}
      </b>
      <span
        style={{
          fontSize: 12.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {what}
      </span>
    </div>
  );
};

const CredentialScene: React.FC = () => (
  <SlideShell
    heading="認証情報の割当てと管理"
    icon={<Ms name="manage_accounts" size={videoType.slideHeadIcon} />}
    narration={SEG_CRED}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 9 * SCALE,
      }}
    >
      <TimingBand
        when="入社時"
        what="必要な分だけを渡す"
        atSec={segStart(SEG_CRED, 1)}
      />
      <TimingBand
        when="異動時"
        what="渡し直す（前に持っていた分は返す）"
        atSec={segStart(SEG_CRED, 2)}
      />
      <TimingBand
        when="退職時"
        what="その日のうちに止める"
        atSec={segStart(SEG_CRED, 2) + 1.8}
      />
      <span style={{ alignSelf: "center", marginTop: 2 * SCALE }}>
        <NoteChip
          icon="warning"
          text="止め忘れた退職者のアカウントが、内部不正の入口になる"
          atSec={segStart(SEG_CRED, 3)}
          warn
        />
      </span>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P9: セキュリティクリアランス — 左テキスト + 右に「触れてよい範囲」の段
// ---------------------------------------------------------------------------

const LevelBlock: React.FC<{
  level: string;
  allowed: boolean;
  tone: string;
  atSec: number;
}> = ({ level, allowed, tone, atSec }) => {
  const block = useAppear(atSec, { dy: 10 });
  const markOn = useProgress(atSec + 0.2, 0.4);
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10 * SCALE,
        padding: `0 ${14 * SCALE}px`,
        backgroundColor: tone,
        borderRadius: 12 * SCALE,
        ...block,
      }}
    >
      <b
        style={{
          fontSize: 12.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: allowed ? colors.primary800 : colors.textMuted,
          whiteSpace: "nowrap",
        }}
      >
        {level}
      </b>
      <span
        style={{
          display: "flex",
          color: allowed ? colors.primary600 : colors.textMuted,
          opacity: markOn,
        }}
      >
        <Ms name={allowed ? "task_alt" : "lock"} size={17 * SCALE} />
      </span>
    </div>
  );
};

const ClearanceScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const descAppear = useAppear(segStart(SEG_CLEAR, 1), { dy: 10 });
  const badgeAppear = useAppear(segStart(SEG_CLEAR, 2), { dy: 10 });
  return (
    <SlideShell narration={SEG_CLEAR}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "6%" }}>
        <div
          style={{
            flex: 1.3,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 9 * SCALE,
          }}
        >
          <span style={chipAppear}>
            <Chip text="情報のレベルを人に結びつける" />
          </span>
          {/* 12文字あるので明示的に2行へ割る（左カラム幅では1行に入らない） */}
          <b
            style={{
              fontSize: 23 * SCALE,
              fontWeight: 800,
              lineHeight: 1.25,
              whiteSpace: "pre-line",
              ...termAppear,
            }}
          >
            <span style={markerStyle}>{"セキュリティ\nクリアランス"}</span>
          </b>
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...descAppear,
            }}
          >
            {"その人が扱ってよい情報のレベルを、\nあらかじめ決めておく"}
          </span>
          <NoteChip
            icon="badge"
            text="適性を確かめて、範囲を人ごとに決める"
            atSec={segStart(SEG_CLEAR, 2)}
          />
        </div>
        {/* 情報の機密性を3段に分け、この人が触れてよい範囲だけが開いている図 */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 6 * SCALE,
            paddingTop: 4 * SCALE,
            paddingBottom: 4 * SCALE,
          }}
        >
          <span
            style={{
              flex: "none",
              display: "flex",
              alignItems: "center",
              gap: 7 * SCALE,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              color: colors.textSecondary,
              ...badgeAppear,
            }}
          >
            <Ms name="person" size={15 * SCALE} />
            この人が触れてよい範囲
          </span>
          <LevelBlock
            level="機密性 高"
            allowed={false}
            tone={colors.border}
            atSec={segStart(SEG_CLEAR, 1)}
          />
          <LevelBlock
            level="機密性 中"
            allowed
            tone={colors.primary100}
            atSec={segStart(SEG_CLEAR, 1) + 0.4}
          />
          <LevelBlock
            level="機密性 低"
            allowed
            tone={colors.primary50}
            atSec={segStart(SEG_CLEAR, 1) + 0.8}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 秘密保持契約・誓約書 — 「いつまで効くか」の時間軸ストリップ
// ---------------------------------------------------------------------------

const EffectBar: React.FC<{
  label: string;
  widthPct: number;
  pink?: boolean;
  atSec: number;
}> = ({ label, widthPct, pink, atSec }) => {
  const grow = useProgress(atSec, 0.7);
  const show = useAppear(atSec, { dy: 8 });
  return (
    <div style={{ display: "flex", alignItems: "center", ...show }}>
      <div
        style={{
          width: `${widthPct * grow}%`,
          height: 20 * SCALE,
          borderRadius: 999,
          backgroundColor: pink ? colors.accentPink : colors.primary500,
          display: "flex",
          alignItems: "center",
          paddingLeft: 12 * SCALE,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontSize: 10 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            color: colors.surface,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

const NdaScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const illustAppear = useAppear(0.6);
  const axisAppear = useAppear(segStart(SEG_NDA, 1), { dy: 10 });
  return (
    <SlideShell narration={SEG_NDA}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <Img
          src={staticFile("images/ipa_sg/mgmt-contract.png")}
          style={{
            flex: 0.75,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.6,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 10 * SCALE,
          }}
        >
          <span style={chipAppear}>
            <Chip text="約束で縛る対策" />
          </span>
          <b style={{ fontSize: 21 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>秘密保持契約・誓約書</span>
          </b>
          {/* いつ交わし、いつまで効くかを1本の時間軸で見せる */}
          <div
            style={{
              alignSelf: "stretch",
              marginTop: 3 * SCALE,
              display: "flex",
              flexDirection: "column",
              gap: 9 * SCALE,
            }}
          >
            {/* 退職の目盛りを、1本目のバーが終わる 68% にぴったり合わせる */}
            <div
              style={{
                display: "flex",
                fontSize: 10 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                color: colors.textMuted,
                ...axisAppear,
              }}
            >
              <span style={{ width: "68%" }}>入社</span>
              <span style={{ flex: 1 }}>退職</span>
              <span style={{ flex: "none" }}>その後</span>
            </div>
            <EffectBar
              label="技術で守れるのはここまで"
              widthPct={68}
              atSec={segStart(SEG_NDA, 2)}
            />
            <EffectBar
              label="約束は、辞めたあとまで効き続ける"
              widthPct={100}
              pink
              atSec={segStart(SEG_NDA, 3)}
            />
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P11: ★抽象→具体 — Aさんの最終出社日に、実際に何が起きるか
// ---------------------------------------------------------------------------

const StepTile: React.FC<{ no: string; icon: string; text: string; atSec: number }> = ({
  no,
  icon,
  text,
  atSec,
}) => {
  const tile = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${13 * SCALE}px ${9 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...tile,
      }}
    >
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          lineHeight: 1,
          color: colors.textMuted,
        }}
      >
        {no}
      </span>
      <IconBox icon={icon} size={26} />
      <span
        style={{
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.35,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => {
  const sceneAppear = useAppear(0.3, { dy: 12 });
  const resultAppear = useAppear(segStart(SEG_CASE, 4), { dy: 12 });
  return (
    <SlideShell narration={SEG_CASE}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12 * SCALE,
        }}
      >
        <span
          style={{
            flex: "none",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            gap: 12 * SCALE,
            ...sceneAppear,
          }}
        >
          <Chip text="たとえば" />
          <b
            style={{
              fontSize: 15 * SCALE,
              fontWeight: 800,
              lineHeight: 1.25,
              whiteSpace: "nowrap",
            }}
          >
            顧客名簿を扱う営業のAさんの、最終出社日
          </b>
        </span>
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 11 * SCALE }}>
          <StepTile
            no="01"
            icon="description"
            text={"退職後も秘密を守る\n誓約書に署名"}
            atSec={segStart(SEG_CASE, 1)}
          />
          <StepTile
            no="02"
            icon="laptop_mac"
            text={"貸していた端末を\n返してもらう"}
            atSec={segStart(SEG_CASE, 2)}
          />
          <StepTile
            no="03"
            icon="lock"
            text={"その日のうちに\nアカウントを止める"}
            atSec={segStart(SEG_CASE, 3)}
          />
        </div>
        <b
          style={{
            flex: "none",
            alignSelf: "center",
            fontSize: 14 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            display: "flex",
            alignItems: "center",
            gap: 9 * SCALE,
            ...resultAppear,
          }}
        >
          <span style={{ color: colors.primary600, display: "flex" }}>
            <Ms name="task_alt" size={18 * SCALE} />
          </span>
          <span style={{ whiteSpace: "nowrap" }}>
            顧客名簿には入れなくなり、
            <span style={markerStyle}>持ち出す機会が消える</span>
          </span>
        </b>
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

export const SgL34PeopleSecurity: VideoSpec = {
  id: "sg-L34-people-security",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "人は最大の弱点\nそして最初の防衛線",
      keywords: ["内部不正防止", "メール訓練", "誓約書"],
    },
    {
      pattern: "custom",
      name: "intro",
      durationSec: 5,
      narration: SEG_INTRO,
      component: IntroScene,
    },
    {
      pattern: "custom",
      name: "guideline",
      durationSec: 5,
      narration: SEG_GUIDE,
      component: GuidelineScene,
    },
    {
      pattern: "custom",
      name: "triangle-countermeasure",
      durationSec: 7,
      narration: SEG_TRIANGLE,
      component: TriangleScene,
    },
    {
      pattern: "custom",
      name: "education",
      durationSec: 6,
      narration: SEG_EDU,
      component: EducationScene,
    },
    {
      pattern: "custom",
      name: "mail-drill",
      durationSec: 7,
      narration: SEG_DRILL,
      component: DrillScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "red-team",
      durationSec: 7,
      narration: SEG_RED,
      component: RedTeamScene,
    },
    {
      pattern: "custom",
      name: "credentials",
      durationSec: 7,
      narration: SEG_CRED,
      component: CredentialScene,
    },
    {
      pattern: "custom",
      name: "clearance",
      durationSec: 6,
      narration: SEG_CLEAR,
      component: ClearanceScene,
    },
    {
      pattern: "custom",
      name: "nda",
      durationSec: 6,
      narration: SEG_NDA,
      component: NdaScene,
    },
    {
      pattern: "custom",
      name: "case-last-day",
      durationSec: 7,
      narration: SEG_CASE,
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
      question: "標的型メール訓練のねらいは？",
      choices: [
        { key: "A", text: "開いた人を見つけて注意する" },
        { key: "B", text: "組織の弱点を知り備えを鍛える", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "退職日にアカウントを止めるのは？",
      choices: [
        { key: "A", text: "機会を潰す対策", correct: true },
        { key: "B", text: "動機を潰す対策" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "人や組織の動きまで試すのは？",
      choices: [
        { key: "A", text: "ペネトレーションテスト" },
        { key: "B", text: "レッドチーム演習", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "内部不正への対策は、機会・動機・正当化のどれを潰すのかで整理します。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "教育と訓練は繰り返し、標的型メール訓練では人を責めずに弱点を測ります。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "アカウントは渡す時と止める時を決め、約束は辞めたあとまで効きます。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
