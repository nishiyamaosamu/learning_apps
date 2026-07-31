import { Img, staticFile } from "remotion";
import { colors, markerStyle, fontMono, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L32-standards-guidelines.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L32: 基準・ガイドラインの地図
 *
 * 発注書 content_works/ipa_sg/orders/L32.md（範囲の正）に対応。
 * シナリオ・用語の呼称・地図の表は narration/ipa_sg/sg-L32-standards-guidelines.md。
 *
 * 【地図＋代表】の回。基準の名前を並べて覚えさせず、**「誰向けのお手本か」の5マスの地図を
 * 先に立てて代表を深く**やる:
 *   導入（型は学んだ、では中身は？）→ 誰向けかの5マス（★背骨）→
 *   経営者向け（3原則＋重要10項目の二階建て）→ 中小企業向け（＋SECURITY ACTION）→
 *   モノ向け（IoT特有の弱さ2つ）→ 業界向け（PCI DSS・用語ドン）→
 *   共通枠組み（CSFの5機能・flow）→ wipe-light で ★抽象→具体（ネットショップでどれを開くか）→
 *   クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 地図を保つ仕掛け: 各ページに「誰向け：◯◯」の帯／チップを必ず置く。
 * **L31 の「司令塔／実働／制度」（機関の役割の層）とは別の軸**なので、層名は一度も出さない。
 *
 * 第3章（L22〜L32）の締めの回: s02 で「情報セキュリティポリシーの体系」（L27）と
 * 「ISMSという仕組みの型」（L28）を1文で受け、この回は「その中身に何を書くか」のお手本という
 * 位置づけを渡すだけ（各回の再説明はしない）。s09 の締めで「自社の規程の下敷き」＝L27 へ戻す。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   機関そのもの（NISC・IPA・JPCERT/CC など）は L31 が主担当なので一つも出さない。
 *   SECURITY ACTION だけは発注書の指示で中小企業向けガイドラインとセットにするため、
 *   L31 の言い方（中小企業が取り組みを自ら宣言する制度）を短縮して s05 で1文触れる。
 *   JIS Q 27001／27002 の中身は L28・L29（s02 の「規格は認証につながるもの」の対比だけ・
 *   規格番号は読み上げない）。法律は第6章 L47〜L54。CVSS は L33、内部不正防止ガイドラインは L34、
 *   脆弱性管理は L37、プライバシーマークは L50 なので触れない。
 *   CxO の体系（CEO・CIO・CDO・CPO）は L74 なので、CISO は「セキュリティの責任者」として1回呼ぶだけ。
 *   暗記カードの領分（ウイルス対策基準・不正アクセス対策基準・政府統一基準群など）は名前も出さず、
 *   他機能への誘導文も書かない（動画は1本で完結させる）。
 *
 * 音声と字幕が違う箇所（narration.md の「難読語」の決まり。字幕は N() の第2引数が正）:
 *   ISMS→アイエスエムエス / CISO→シーアイエスオー / IoT→アイオーティー /
 *   PCI DSS→ピーシーアイディーエスエス / CSF→シーエスエフ /
 *   SECURITY ACTION→セキュリティアクション。
 *   いずれもアルファベットを1字ずつ読む略語なので、字幕に読みは添えない。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L32-standards-guidelines");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、セキュリティの基準とガイドラインについて学びます。"),
  // 音声は「…や、アイエスエムエスというしくみのかたをまなびました。」（呼称は L28 に揃えた）
  N("s02-2.mp3", "ここまで、情報セキュリティポリシーの体系や、ISMSという仕組みの型を学びました。"),
  N("s02-3.mp3", "では、その中身には何を書けばよいのでしょうか。"),
  N("s02-4.mp3", "実は、参考にできるお手本が、すでにいくつも作られています。"),
  N("s02-5.mp3", "規格は認証につながるもの、ガイドラインは従うと役に立つ手引きです。"),
];

const SEG_MAP = [
  N("s03-1.mp3", "数が多いので、まず誰向けかで地図を持ちましょう。"),
  N("s03-2.mp3", "一つ目は経営者向けで、経営者が何をすべきかを示します。"),
  N("s03-3.mp3", "二つ目は中小企業向けで、何から始めるかを教えます。"),
  N("s03-4.mp3", "三つ目はモノ向けで、ネットにつながる機器のためのものです。"),
  N("s03-5.mp3", "四つ目は業界向けで、その業界で守る線を決めます。"),
  N("s03-6.mp3", "五つ目は共通の枠組みで、対策全体を整理する型です。"),
];

const SEG_EXEC = [
  N("s04-1.mp3", "まずは、経営者向けの代表を見ていきます。"),
  N("s04-2.mp3", "サイバーセキュリティ経営ガイドラインは、経営者に向けた手引きです。"),
  N("s04-3.mp3", "中身は大きく二つで、三原則と重要十項目に分かれています。"),
  N("s04-4.mp3", "三原則は、経営者自身が持つべき心構えです。"),
  // 音声は「…せきにんしゃ、シーアイエスオーにしじすべき…」（CxO の体系は L74 が主担当）
  N("s04-5.mp3", "重要十項目は、セキュリティの責任者、CISOに指示すべきことの一覧です。"),
];

const SEG_SME = [
  N("s05-1.mp3", "次は、中小企業向けです。"),
  N("s05-2.mp3", "中小企業の情報セキュリティ対策ガイドラインは、何から始めるかを示します。"),
  N("s05-3.mp3", "経営者が知っておくべきことと、現場での実践の両方が書かれています。"),
  // 音声は「…セキュリティアクションとして…」（呼称は L31 に揃えた）
  N("s05-4.mp3", "読んで取り組んだら、SECURITY ACTIONとして自ら宣言できます。"),
  N("s05-5.mp3", "前回出てきた、取り組みを自ら宣言する制度です。"),
];

const SEG_IOT = [
  N("s06-1.mp3", "三つ目は、モノ向けです。"),
  N("s06-2.mp3", "ネットにつながる機器には、特有の弱さがあります。"),
  N("s06-3.mp3", "一つは、出荷されたあと長く使われ、管理から外れやすいことです。"),
  N("s06-4.mp3", "もう一つは、修正プログラムを当てにくい機器が多いことです。"),
  // 音声は「…アイオーティーセキュリティガイドラインが…」
  N("s06-5.mp3", "だからこそ、IoTセキュリティガイドラインが、作る側と使う側の心得を示します。"),
];

const SEG_PCI = [
  N("s07-1.mp3", "四つ目は、業界向けの基準です。"),
  // 音声は「ピーシーアイディーエスエスは、…」
  N("s07-2.mp3", "PCI DSSは、クレジットカード業界が定めた基準です。"),
  N("s07-3.mp3", "カード情報を扱う会社は、この基準に従うことを求められます。"),
];

const SEG_CSF = [
  N("s08-1.mp3", "最後は、対策全体を整理するための共通の枠組みです。"),
  // 音声は「…りゃくしてシーエスエフとよばれます。」
  N("s08-2.mp3", "サイバーセキュリティフレームワーク、略してCSFと呼ばれます。"),
  N("s08-3.mp3", "識別、防御、検知、対応、復旧という五つの機能で対策を並べます。"),
  N("s08-4.mp3", "自社の対策がどの機能に薄いのか、見つけやすくなります。"),
  N("s08-5.mp3", "今では、全体を方向づける統治の機能も加えられています。"),
];

const SEG_CASE = [
  N("s09-1.mp3", "では、小さなネットショップを開く会社を考えてみましょう。"),
  N("s09-2.mp3", "経営者は、経営ガイドラインで自分の役割を確かめます。"),
  N("s09-3.mp3", "現場は、中小企業向けのガイドラインで何から始めるかを決めます。"),
  // 音声は「…ピーシーアイディーエスエスへのじゅんきょも…」
  N("s09-4.mp3", "カード決済も扱うので、PCI DSSへの準拠も必要になります。"),
  N("s09-5.mp3", "開いたお手本が、自社の規程を作る下敷きになります。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "経営者が自分の役割を確かめるために読むのは、どちらでしょうか。"),
  N("s11-3.mp3", "正解は、サイバーセキュリティ経営ガイドラインです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "カード情報を扱う会社が従うよう求められるのは、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、PCI DSSで、カード業界が定めた基準です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "対策全体を五つの機能で整理する枠組みは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、サイバーセキュリティフレームワークです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s14-1.mp3", "基準やガイドラインは、誰向けかで引きましょう。"),
  N("s14-2.mp3", "経営者向けの代表が、サイバーセキュリティ経営ガイドラインです。"),
  N("s14-3.mp3", "対策全体は、CSFの五つの機能で整理できます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（「誰向け」などの小さなラベル） */
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

/**
 * 地図の現在位置を示す細い帯 —「誰向け：◯◯」＋そのお手本が答えること。
 * L31 の層名（司令塔／実働／制度）とは別の軸なので、必ず「誰向け」の形で書く。
 */
const TargetBar: React.FC<{ target: string; answers: string; atSec: number }> = ({
  target,
  answers,
  atSec,
}) => {
  const bar = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        ...bar,
      }}
    >
      <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
        <Ms name="map" size={16 * SCALE} />
      </span>
      <Chip text={`誰向け：${target}`} />
      <span
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {answers}
      </span>
    </div>
  );
};

/** 下部に置く一言の注記チップ */
const NoteChip: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
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
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        color: colors.primary800,
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

/**
 * 「◯◯：△△」の対比行（チップ + 一言）。
 * 字幕の文をそのまま画面に写さず、対比の構造だけを見せるための部品。
 */
const PairRow: React.FC<{ label: string; value: string; atSec: number }> = ({
  label,
  value,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        ...row,
      }}
    >
      <Chip text={label} />
      <span
        style={{
          fontSize: 11.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </span>
  );
};

// ---------------------------------------------------------------------------
// P2: 導入 — 左イラスト + 右テキスト（型は学んだ、では中身は？）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const themeAppear = useAppear(0.3);
  const recapAppear = useAppear(segStart(SEG_INTRO, 1), { dy: 10 });
  const leadAppear = useAppear(segStart(SEG_INTRO, 3), { dy: 12 });
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-leader-think.png")}
          style={{
            flex: 0.95,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.2,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8 * SCALE,
          }}
        >
          <span style={{ ...themeAppear, display: "flex", flexDirection: "column", gap: 5 * SCALE }}>
            <Chip text="今回のテーマ" />
            <b style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
              基準とガイドライン
            </b>
          </span>
          <span
            style={{
              fontSize: 10.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              ...recapAppear,
            }}
          >
            ここまで：ポリシーの体系・ISMSの型
          </span>
          <b
            style={{
              fontSize: 15 * SCALE,
              fontWeight: 800,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"中身は、\n"}
            <span style={markerStyle}>ゼロから考えなくていい</span>
          </b>
          {/* 字幕の文をそのまま写さず、規格とガイドラインの違いを対比の形だけで見せる */}
          <PairRow label="規格" value="審査を受けて認証される" atSec={segStart(SEG_INTRO, 4)} />
          <PairRow
            label="ガイドライン"
            value="従うと役に立つお手本"
            atSec={segStart(SEG_INTRO, 4) + 0.7}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 「誰向けか」の5マス（★背骨）— 横5列の対象タイル
// ---------------------------------------------------------------------------

const MapTile: React.FC<{
  icon: string;
  target: string;
  answers: string;
  atSec: number;
}> = ({ icon, target, answers, atSec }) => {
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
        padding: `${13 * SCALE}px ${4 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...tile,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 32 * SCALE,
          height: 32 * SCALE,
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
      {/* タイル内幅は約 300px。5文字までなら 12.5×SCALE が1行に収まる */}
      <b
        style={{
          fontSize: 12.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {target}
      </b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.3,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {answers}
      </span>
    </div>
  );
};

const MapScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  return (
    <SlideShell
      heading="基準・ガイドラインの地図"
      icon={<Ms name="map" size={videoType.slideHeadIcon} />}
      narration={SEG_MAP}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 13 * SCALE,
        }}
      >
        {/* 字幕と同じ文を画面に写さず、地図の使い方（覚え方）を先に置く */}
        <span
          style={{
            flex: "none",
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...leadAppear,
          }}
        >
          名前ではなく<span style={markerStyle}>「誰向けか」</span>で引く
        </span>
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 9 * SCALE }}>
          <MapTile
            icon="business_center"
            target="経営者"
            answers="何をすべきか"
            atSec={segStart(SEG_MAP, 1)}
          />
          <MapTile
            icon="storefront"
            target="中小企業"
            answers="何から始めるか"
            atSec={segStart(SEG_MAP, 2)}
          />
          <MapTile
            icon="devices"
            target="モノ"
            answers="機器の心得"
            atSec={segStart(SEG_MAP, 3)}
          />
          <MapTile
            icon="payments"
            target="業界"
            answers="守るべき線"
            atSec={segStart(SEG_MAP, 4)}
          />
          <MapTile
            icon="schema"
            target="共通枠組み"
            answers="全体の整理"
            atSec={segStart(SEG_MAP, 5)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 経営者向けの代表 — 二階建ての帯（大きな数字 3／10）
// ---------------------------------------------------------------------------

const TierBand: React.FC<{
  no: string;
  name: string;
  desc: string;
  strong?: boolean;
  bandAtSec: number;
  descAtSec: number;
}> = ({ no, name, desc, strong, bandAtSec, descAtSec }) => {
  const band = useAppear(bandAtSec, { dy: 14 });
  const descAppear = useAppear(descAtSec, { dy: 0 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14 * SCALE,
        padding: `${9 * SCALE}px ${18 * SCALE}px`,
        backgroundColor: strong ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${strong ? colors.primary300 : colors.border}`,
        borderRadius: 16 * SCALE,
        ...band,
      }}
    >
      <span
        style={{
          flex: "none",
          fontFamily: fontMono,
          fontSize: 28 * SCALE,
          fontWeight: 800,
          lineHeight: 1.1,
          color: colors.primary600,
          minWidth: 24 * SCALE,
          textAlign: "center",
        }}
      >
        {no}
      </span>
      <b
        style={{
          flex: "none",
          fontSize: 15 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </b>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 12 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
          ...descAppear,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const ExecScene: React.FC = () => {
  const termAppear = useAppear(segStart(SEG_EXEC, 1), { dy: 12 });
  return (
    <SlideShell narration={SEG_EXEC}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 13 * SCALE,
        }}
      >
        <TargetBar target="経営者" answers="経営者が何をすべきか" atSec={0.3} />
        {/* 18文字あるので 20×SCALE（本文幅 1690px にちょうど収まる） */}
        <b
          style={{
            flex: "none",
            fontSize: 20 * SCALE,
            fontWeight: 800,
            lineHeight: 1.25,
            whiteSpace: "nowrap",
            ...termAppear,
          }}
        >
          <span style={markerStyle}>サイバーセキュリティ経営ガイドライン</span>
        </b>
        <TierBand
          no="3"
          name="3原則"
          desc="経営者自身が持つべき心構え"
          strong
          bandAtSec={segStart(SEG_EXEC, 2)}
          descAtSec={segStart(SEG_EXEC, 3)}
        />
        <TierBand
          no="10"
          name="重要10項目"
          desc="責任者（CISO）に指示すべきこと"
          bandAtSec={segStart(SEG_EXEC, 2) + 0.3}
          descAtSec={segStart(SEG_EXEC, 4)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 中小企業向け — 左テキスト（用語が主役）+ 右イラスト
// ---------------------------------------------------------------------------

const SmeRow: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        fontSize: 11.5 * SCALE,
        fontWeight: 700,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        ...row,
      }}
    >
      <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={15 * SCALE} />
      </span>
      {text}
    </span>
  );
};

const SmeScene: React.FC = () => {
  const chipAppear = useAppear(segStart(SEG_SME, 1), { dy: 10 });
  const termAppear = useAppear(segStart(SEG_SME, 1) + 0.25, { dy: 12 });
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_SME}>
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
        <TargetBar target="中小企業" answers="何から始めるか" atSec={0.3} />
        {/* Img を含む横並びは flex:1 + minHeight:0 で親に高さを縛る
            （flex:"none" だと Img の自然高さで行が伸び、上下にはみ出す） */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
          <div
            style={{
              flex: 1.25,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 8 * SCALE,
            }}
          >
            <span style={chipAppear}>
              <Chip text="何から始めるかの手引" />
            </span>
            {/* 20文字あるので2行に割る。左カラム幅は約 930px なので、2行目（16文字）は
                13.5×SCALE でないと3行目に「ン」だけが落ちる */}
            <b
              style={{
                fontSize: 13.5 * SCALE,
                fontWeight: 800,
                lineHeight: 1.35,
                whiteSpace: "pre-line",
                ...termAppear,
              }}
            >
              {"中小企業の\n"}
              <span style={markerStyle}>情報セキュリティ対策ガイドライン</span>
            </b>
            <SmeRow
              icon="business_center"
              text="経営者が知っておくべきこと"
              atSec={segStart(SEG_SME, 2)}
            />
            <SmeRow icon="build" text="現場での実践のしかた" atSec={segStart(SEG_SME, 2) + 0.5} />
            <NoteChip
              icon="verified"
              text="SECURITY ACTION：取り組みを自ら宣言"
              atSec={segStart(SEG_SME, 3)}
            />
          </div>
          <Img
            src={staticFile("images/ipa_sg/person-employee-f-point.png")}
            style={{
              flex: 0.9,
              minWidth: 0,
              alignSelf: "stretch",
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illustAppear,
            }}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: モノ向け — 横2枚の弱点カード（ピンク）+ 下に用語
// ---------------------------------------------------------------------------

const WeakCard: React.FC<{
  image: string;
  title: string;
  sub: string;
  atSec: number;
}> = ({ image, title, sub, atSec }) => {
  const card = useAppear(atSec, { dy: 14 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        padding: `${11 * SCALE}px ${16 * SCALE}px`,
        backgroundColor: colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      {/* 画像は flex で伸ばさず実寸で置く（column/row いずれでも潰れないように） */}
      <Img
        src={staticFile(`images/ipa_sg/${image}`)}
        style={{
          flex: "none",
          width: 26 * SCALE,
          height: 26 * SCALE,
          objectFit: "contain",
          mixBlendMode: "multiply",
        }}
      />
      <span
        style={{
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2 * SCALE,
        }}
      >
        <b
          style={{
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.25,
            color: colors.accentPinkText,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </b>
        <span
          style={{
            fontSize: 10 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
          }}
        >
          {sub}
        </span>
      </span>
    </div>
  );
};

const IotScene: React.FC = () => {
  const barAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(segStart(SEG_IOT, 4), { dy: 12 });
  return (
    <SlideShell
      heading="ネットにつながる機器の弱さ"
      icon={<Ms name="devices" size={videoType.slideHeadIcon} />}
      narration={SEG_IOT}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12 * SCALE,
        }}
      >
        <span style={{ ...barAppear, flex: "none" }}>
          <Chip text="誰向け：モノ" />
        </span>
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 13 * SCALE }}>
          <WeakCard
            image="tech-camera.png"
            title="出荷後も長く使われる"
            sub="管理から外れやすい"
            atSec={segStart(SEG_IOT, 2)}
          />
          <WeakCard
            image="tech-patch.png"
            title="修正プログラムを当てにくい"
            sub="そういう機器が多い"
            atSec={segStart(SEG_IOT, 3)}
          />
        </div>
        {/* 「だからこそ」の答えがこのページの新出用語。字幕の文を写さず用語を主役にする */}
        <span
          style={{
            flex: "none",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            gap: 10 * SCALE,
            ...termAppear,
          }}
        >
          <Chip text="作る側と使う側の心得" />
          <b
            style={{
              flex: "none",
              fontSize: 15 * SCALE,
              fontWeight: 800,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            <span style={markerStyle}>IoTセキュリティガイドライン</span>
          </b>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: ★抽象→具体 — 小さなネットショップで、どれを開くか（縦3行の対応表）
// ---------------------------------------------------------------------------

const CaseRow: React.FC<{
  icon: string;
  who: string;
  guide: string;
  purpose: string;
  atSec: number;
}> = ({ icon, who, guide, purpose, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11 * SCALE,
        padding: `${5 * SCALE}px ${16 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...row,
      }}
    >
      {/* 3行 + リード + 注記チップで本文領域（見出しなしで約770px）がぎりぎりなので、
          アイコンの器は 20×SCALE に抑える（24×SCALE だと注記チップが字幕帯に潜る） */}
      <span
        style={{
          flex: "none",
          width: 20 * SCALE,
          height: 20 * SCALE,
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
      {/* who は最長5文字（カード決済）。矢印の位置を3行で揃えるため minWidth を固定する */}
      <b
        style={{
          flex: "none",
          fontSize: 12.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          minWidth: 64 * SCALE,
          whiteSpace: "nowrap",
        }}
      >
        {who}
      </b>
      <span style={{ flex: "none", color: colors.primary300, display: "flex" }}>
        <Ms name="arrow_forward" size={15 * SCALE} />
      </span>
      {/* guide は読み上げと同じ短い呼び方（正式名称は s04・s05 で出した）。
          正式名称のままだと purpose と合わせて行の内幅 1562px を超える */}
      <b
        style={{
          flex: "none",
          fontSize: 13 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {guide}
      </b>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {purpose}
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  return (
    <SlideShell narration={SEG_CASE}>
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
        <span
          style={{
            flex: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6 * SCALE,
            ...leadAppear,
          }}
        >
          <Chip text="この場面では、どれを開くか" />
          <b style={{ fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
            小さな<span style={markerStyle}>ネットショップ</span>を開く会社
          </b>
        </span>
        <CaseRow
          icon="business_center"
          who="経営者"
          guide="経営ガイドライン"
          purpose="自分の役割を確かめる"
          atSec={segStart(SEG_CASE, 1)}
        />
        <CaseRow
          icon="storefront"
          who="現場"
          guide="中小企業向けガイドライン"
          purpose="始め方を決める"
          atSec={segStart(SEG_CASE, 2)}
        />
        <CaseRow
          icon="payments"
          who="カード決済"
          guide="PCI DSS"
          purpose="準拠が求められる"
          atSec={segStart(SEG_CASE, 3)}
        />
        {/* 字幕の文をそのまま写さず、行き先（お手本 → 自社の規程）だけを示す */}
        <span style={{ alignSelf: "center" }}>
          <NoteChip
            icon="description"
            text="お手本 → 自社の規程の下敷き"
            atSec={segStart(SEG_CASE, 4)}
          />
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

export const SgL32StandardsGuidelines: VideoSpec = {
  id: "sg-L32-standards-guidelines",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "基準・ガイドライン\nの地図",
      keywords: ["経営者向け", "業界の基準", "共通枠組み"],
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
      name: "map",
      durationSec: 7,
      narration: SEG_MAP,
      component: MapScene,
    },
    {
      pattern: "custom",
      name: "exec-guideline",
      durationSec: 6,
      narration: SEG_EXEC,
      component: ExecScene,
    },
    {
      pattern: "custom",
      name: "sme-guideline",
      durationSec: 6,
      narration: SEG_SME,
      component: SmeScene,
    },
    {
      pattern: "custom",
      name: "iot-guideline",
      durationSec: 6,
      narration: SEG_IOT,
      component: IotScene,
    },
    {
      pattern: "term",
      chip: "業界向けの基準",
      icon: "payments",
      term: "PCI DSS",
      sub: "カード業界が定めた基準 — 扱う会社は準拠を求められる",
      narration: SEG_PCI,
    },
    {
      pattern: "flow",
      heading: "CSF：五つの機能で対策を整理する",
      icon: "schema",
      // sub はカード内幅（約250px）に収まる6文字までにする（7文字以上は不自然な位置で折り返す）
      steps: [
        { abc: "1", name: "識別", sub: "対象を知る" },
        { abc: "2", name: "防御", sub: "未然に防ぐ" },
        { abc: "3", name: "検知", sub: "異常に気づく" },
        { abc: "4", name: "対応", sub: "すぐ動く" },
        { abc: "5", name: "復旧", sub: "もとに戻す" },
      ],
      // 5機能は s08-3 で一息に読まれるので、その文の中で1秒ずつずらして点灯させ、
      // 最後の「復旧」は s08-4（どの機能が薄いか）の間も点灯を保つ
      highlightAtSec: [
        segStart(SEG_CSF, 2) + 0.4,
        segStart(SEG_CSF, 2) + 1.4,
        segStart(SEG_CSF, 2) + 2.4,
        segStart(SEG_CSF, 2) + 3.4,
        segStart(SEG_CSF, 3),
      ],
      narration: SEG_CSF,
    },
    {
      pattern: "custom",
      name: "case-netshop",
      durationSec: 7,
      narration: SEG_CASE,
      component: CaseScene,
      transitionIn: "wipe-light",
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
      question: "経営者が読むべき手引は？",
      choices: [
        { key: "A", text: "サイバーセキュリティ経営ガイドライン", correct: true },
        { key: "B", text: "IoTセキュリティガイドライン" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "カード情報を扱う会社の基準は？",
      choices: [
        { key: "A", text: "中小企業向けのガイドライン" },
        { key: "B", text: "PCI DSS", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "対策全体を整理する枠組みは？",
      choices: [
        { key: "A", text: "サイバーセキュリティフレームワーク", correct: true },
        { key: "B", text: "SECURITY ACTION" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "基準やガイドラインは、誰向けかで引きます。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "経営者向けの代表が、サイバーセキュリティ経営ガイドラインです。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "対策全体は、CSFの五つの機能で整理できます。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
