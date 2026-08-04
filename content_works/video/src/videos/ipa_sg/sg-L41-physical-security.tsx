import { Img, staticFile } from "remotion";
import { colors, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L41-physical-security.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L41: 物理的セキュリティ対策
 *
 * 発注書 content_works/ipa_sg/orders/L41.md（範囲の正）に対応。
 * シナリオ・用語の呼称・リズム設計は narration/ipa_sg/sg-L41-physical-security.md。
 *
 * 構成:
 *   導入（入られたら終わり）→ セキュリティゾーニング（入れ子の3区域）→
 *   ★抽象→具体（取引先の人はどこまで入れるか）→ 入退室管理（共連れ／アンチパスバック／
 *   インターロック）→ 監視カメラ・施錠管理 → クリアデスク・クリアスクリーン →
 *   wipe-light で設備へ（UPS・耐震耐火・多重化）→ 遠隔バックアップ → 記憶媒体の管理と処分 →
 *   クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   RASIS・RAS技術・稼働率の指標名は L56 が主担当なので**一つも出さず**、多重化は
 *   「片方が壊れても止まらない」という止めない工夫としてだけ語る（ミラーリング等は L57）。
 *   USBキー・セキュリティケーブルは暗記カードの領分なので出さず、誘導文も書かない。
 *   バックアップの方式・世代管理は L59 なので s09 は置き場所の話だけ（3-2-1ルール＝L35 の
 *   語も出さない）。消去の手法名（暗号化消去など）は L40 が主担当なので平語で締める。
 *   入退室・媒体管理のケース演習は L82・L86 なので確認パートは通常クイズ3問。
 *   監視カメラの効果は L6 の「不正が起きる機会」を1文で受けるだけ。
 *
 * 音声と字幕が違う箇所（narration.md の決まり。字幕は N() の第2引数が正）:
 *   共連れ→ともづれ（s05-2 / s12-3 / s15-1 の3本すべて。読みの揺れを避けるため全部を仮名書き。
 *   字幕は初出 s05-2 だけ読みを添える）/ UPS→ユーピーエス（1字ずつ読む略語なので字幕に読みは添えない）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L41-physical-security");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、物理的セキュリティ対策について学びます。"),
  N("s02-2.mp3", "どれだけ技術で守っても、その場所に入られたら終わりです。"),
  N("s02-3.mp3", "機器を持ち出されれば、暗号も認証も関係ありません。"),
  N("s02-4.mp3", "場所、人の出入り、設備、そして媒体を守っていきましょう。"),
];

const SEG_ZONE = [
  N("s03-1.mp3", "まずは、建物のなかを区域に分けることから始めます。"),
  N("s03-2.mp3", "これをセキュリティゾーニングといいます。"),
  N("s03-3.mp3", "誰でも入れる受付、社員だけの執務室、そしてサーバ室です。"),
  N("s03-4.mp3", "奥へ行くほど、入れる人を絞っていきます。"),
];

const SEG_VISITOR = [
  N("s04-1.mp3", "たとえば、取引先の人が打ち合わせに来たとしましょう。"),
  N("s04-2.mp3", "受付では入館証を受け取り、誰が来ているかを記録します。"),
  N("s04-3.mp3", "執務室から先は、社員が同行しなければ通れません。"),
  N("s04-4.mp3", "サーバ室には、そもそも入る用事がありません。"),
];

const SEG_ENTRY = [
  N("s05-1.mp3", "区域を分けても、扉が素通りできては意味がありません。"),
  // 音声は「後ろについて一緒に入るのが、ともづれ です。」。読みを字幕に添えるのはこの初出だけ
  N("s05-2.mp3", "後ろについて一緒に入るのが、共連れ（ともづれ）です。"),
  N("s05-3.mp3", "そこで使うのが、アンチパスバックです。"),
  N("s05-4.mp3", "入った記録のない人は、外へ出られない仕組みです。"),
  N("s05-5.mp3", "もう一つはインターロックで、二重扉になっています。"),
  N("s05-6.mp3", "手前の扉が閉じるまで、奥の扉は開きません。"),
];

const SEG_CAMERA = [
  N("s06-1.mp3", "出入りの記録と合わせて効くのが、監視カメラです。"),
  N("s06-2.mp3", "あとから確認でき、見られていると思わせる効果もあります。"),
  N("s06-3.mp3", "これは、不正が起きる機会そのものを減らす対策です。"),
  N("s06-4.mp3", "鍵も同じで、誰にいつ貸したかを記録して管理します。"),
];

const SEG_CLEAR = [
  N("s07-1.mp3", "お金をかけずにできる対策もあります。"),
  N("s07-2.mp3", "退社するとき、机の上に書類を残さないのがクリアデスクです。"),
  N("s07-3.mp3", "離席するとき、画面をロックするのがクリアスクリーンです。"),
  N("s07-4.mp3", "もっとも安く、もっとも忘れられやすい対策です。"),
];

const SEG_FACILITY = [
  N("s08-1.mp3", "ここからは、建物の設備の話です。"),
  // 音声は「…無停電電源装置、ユーピーエス です。」
  N("s08-2.mp3", "停電に備えるのが、無停電電源装置、UPSです。"),
  N("s08-3.mp3", "電源が切れても、安全に終了する時間を稼げます。"),
  N("s08-4.mp3", "地震や火災に備えて、耐震設備や耐火設備も置きます。"),
  N("s08-5.mp3", "電源や機器を二重にしておけば、片方が壊れても止まりません。"),
];

const SEG_REMOTE = [
  N("s09-1.mp3", "控えを取っていても、同じ建物に置いていては共倒れです。"),
  N("s09-2.mp3", "火事や地震は、本番も控えもまとめて奪っていきます。"),
  N("s09-3.mp3", "だから控えの一つは、離れた場所に置きます。"),
  N("s09-4.mp3", "これを遠隔バックアップといいます。"),
];

const SEG_MEDIA = [
  N("s10-1.mp3", "最後は、記憶媒体の管理と処分です。"),
  N("s10-2.mp3", "持ち出しは台帳に記録し、使わないときは鍵のかかる場所へ。"),
  N("s10-3.mp3", "そして、捨てるときがいちばん危ない場面です。"),
  N("s10-4.mp3", "削除しただけのデータは、専用のソフトで元に戻せます。"),
  N("s10-5.mp3", "上書きして完全に消すか、物理的に壊してから処分します。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "アンチパスバックが防ぐのは、どちらでしょうか。"),
  // 音声は「…後ろについて入る、ともづれ です。」
  N("s12-3.mp3", "正解は、認証した人の後ろについて入る、共連れです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "クリアデスクの目的は、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、机の上から情報を持ち去られるのを防ぐことです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "媒体を捨てるとき、削除だけでは危ないのはなぜでしょうか。"),
  N("s14-3.mp3", "正解は、専用のソフトでデータを元に戻せるからです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  // 音声は「…扉と記録でともづれ を防ぎます。」
  N("s15-1.mp3", "区域を分けて奥ほど厳しくし、扉と記録で共連れを防ぎます。"),
  N("s15-2.mp3", "カメラと施錠、クリアデスクで、日々の機会を減らします。"),
  N("s15-3.mp3", "設備と遠隔バックアップで止めず、媒体は消してから捨てます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（その語が何の一種か・いまどの段にいるか） */
const Chip: React.FC<{ text: string; tone?: "blue" | "pink" }> = ({ text, tone = "blue" }) => (
  <span
    style={{
      flex: "none",
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: `${2.5 * SCALE}px ${10 * SCALE}px`,
      color: tone === "pink" ? colors.accentPinkText : colors.primary800,
      backgroundColor: tone === "pink" ? colors.accentPinkSurface : colors.primary100,
    }}
  >
    {text}
  </span>
);

/** アイコンの器（丸角の淡いブロック） */
const IconBox: React.FC<{ icon: string; size?: number; tone?: "blue" | "pink" }> = ({
  icon,
  size = 30,
  tone = "blue",
}) => (
  <span
    style={{
      flex: "none",
      width: size * SCALE,
      height: size * SCALE,
      borderRadius: (size / 2.6) * SCALE,
      backgroundColor: tone === "pink" ? colors.accentPinkSurface : colors.primary50,
      color: tone === "pink" ? colors.accentPinkText : colors.primary600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Ms name={icon} size={size * 0.62 * SCALE} />
  </span>
);

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
        padding: `${5 * SCALE}px ${12 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        color: colors.primary800,
        fontSize: 10 * SCALE,
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

// ---------------------------------------------------------------------------
// s02: 導入 — 左イラスト（忍び込む人）+ 右にテーマと2本柱
// ---------------------------------------------------------------------------

const PillarLine: React.FC<{ icon: string; lead: string; tail: string; atSec: number }> = ({
  icon,
  lead,
  tail,
  atSec,
}) => {
  const line = useAppear(atSec, { dy: 12 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        fontSize: 12.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        ...line,
      }}
    >
      <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
        <Ms name={icon} size={19 * SCALE} />
      </span>
      <span>
        <span style={{ color: colors.textSecondary }}>{lead}</span>
        {tail}
      </span>
    </span>
  );
};

const IntroScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const themeAppear = useAppear(0.3);
  const p1 = segStart(SEG_INTRO, 1);
  const p2 = segStart(SEG_INTRO, 2);
  const roadAppear = useAppear(segStart(SEG_INTRO, 3), { dy: 10 });
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-attacker-sneak.png")}
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
            <b style={{ fontSize: 21 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
              物理的セキュリティ対策
            </b>
          </span>
          <PillarLine icon="gpp_bad" lead="その場所に" tail="入られたら終わり" atSec={p1} />
          <PillarLine icon="lock_open" lead="持ち出されたら" tail="暗号も認証も関係ない" atSec={p2} />
          <span style={{ display: "flex", ...roadAppear }}>
            <NoteChip
              icon="checklist"
              text="場所・人の出入り・設備・媒体を守る"
              atSec={segStart(SEG_INTRO, 3)}
            />
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s03: セキュリティゾーニング — 入れ子の3ボックス（奥ほど青が濃い＝厳しい）
// ---------------------------------------------------------------------------

const Zone: React.FC<{
  label: string;
  name: string;
  icon: string;
  depth: 0 | 1 | 2;
  atSec: number;
  children?: React.ReactNode;
}> = ({ label, name, icon, depth, atSec, children }) => {
  const box = useAppear(atSec, { dy: 12 });
  const bg = depth === 0 ? colors.surface : depth === 1 ? colors.primary50 : colors.primary100;
  const bd = depth === 0 ? colors.border : depth === 1 ? colors.primary300 : colors.primary600;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5 * SCALE,
        // 縦の padding を詰めてある（3段の入れ子で3倍効くので、増やすと注記チップが字幕帯に潜る）
        padding: `${6 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${bd}`,
        borderRadius: 18 * SCALE,
        ...box,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE }}>
        <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
          <Ms name={icon} size={20 * SCALE} />
        </span>
        <b
          style={{
            flex: "none",
            fontSize: 16 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </b>
        <span
          style={{
            fontSize: 10.5 * SCALE,
            fontWeight: 700,
            lineHeight: 1.2,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
};

const ZoningScene: React.FC = () => {
  const termAppear = useAppear(segStart(SEG_ZONE, 1), { dy: 12 });
  const leadAppear = useAppear(0.3, { dy: 10 });
  const base = segStart(SEG_ZONE, 2);
  return (
    <SlideShell narration={SEG_ZONE}>
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
            flex: "none",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4 * SCALE,
          }}
        >
          <span style={{ display: "flex", ...leadAppear }}>
            <Chip text="建物のなかを区域に分ける" />
          </span>
          <b style={{ fontSize: 24 * SCALE, fontWeight: 800, lineHeight: 1.15, ...termAppear }}>
            <span style={markerStyle}>セキュリティゾーニング</span>
          </b>
        </span>
        {/* 入れ子＝外から奥へ。深いほど地の青が濃くなる（＝入れる人が絞られる）。
            ずらし幅を 0.3 秒に詰めてあるのは、外側の箱だけが先に出ると
            「中身が空の大きな白い箱」が数秒居座って未完成に見えるため
            （内側の Zone は非表示でもレイアウト上の高さを占めるので、遅らせるほど空白が長い）。
            s03-3 が3区域を一息で読み上げる文なので、速いずらしでも語りとずれない */}
        <Zone label="誰でも入れる" name="受付" icon="storefront" depth={0} atSec={base}>
          <Zone label="社員だけ" name="執務室" icon="business_center" depth={1} atSec={base + 0.3}>
            <Zone
              label="限られた人だけ"
              name="サーバ室"
              icon="storage"
              depth={2}
              atSec={base + 0.6}
            />
          </Zone>
        </Zone>
        <span style={{ alignSelf: "center", display: "flex" }}>
          <NoteChip
            icon="arrow_forward"
            text="奥へ行くほど、入れる人を絞る"
            atSec={segStart(SEG_ZONE, 3)}
          />
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s04: ★抽象→具体 — 取引先の人はどこまで入れるか
// ---------------------------------------------------------------------------

const VisitorRow: React.FC<{
  zone: string;
  what: string;
  icon: string;
  deny?: boolean;
  atSec: number;
}> = ({ zone, what, icon, deny, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        padding: `${6 * SCALE}px ${18 * SCALE}px`,
        backgroundColor: deny ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${deny ? colors.accentPinkSoft : colors.border}`,
        borderRadius: 14 * SCALE,
        ...row,
      }}
    >
      <b
        style={{
          flex: "none",
          minWidth: 20 * SCALE * 3,
          fontSize: 14 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          color: deny ? colors.accentPinkText : colors.primary600,
        }}
      >
        {zone}
      </b>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 12.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {what}
      </span>
      <span
        style={{
          flex: "none",
          display: "flex",
          color: deny ? colors.accentPinkText : colors.primary600,
        }}
      >
        <Ms name={icon} size={19 * SCALE} />
      </span>
    </div>
  );
};

const VisitorScene: React.FC = () => {
  const caseAppear = useAppear(0.3, { dy: 12 });
  return (
    <SlideShell narration={SEG_VISITOR}>
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
        {/* 場面（このページの前提）は先に出す */}
        <div
          style={{
            flex: "none",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            gap: 11 * SCALE,
            padding: `${7 * SCALE}px ${18 * SCALE}px`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 14 * SCALE,
            ...caseAppear,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="person" size={20 * SCALE} />
          </span>
          <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
            取引先の人が、打ち合わせに来た
          </b>
        </div>
        <VisitorRow
          zone="受付"
          what="入館証を受け取り、記録が残る"
          icon="badge"
          atSec={segStart(SEG_VISITOR, 1)}
        />
        <VisitorRow
          zone="執務室"
          what="社員が同行しなければ通れない"
          icon="group"
          atSec={segStart(SEG_VISITOR, 2)}
        />
        <VisitorRow
          zone="サーバ室"
          what="そもそも入る用事がない"
          icon="cancel"
          deny
          atSec={segStart(SEG_VISITOR, 3)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s05: 入退室管理 — 共連れ（問題）→ アンチパスバック / インターロック（2カード）
// ---------------------------------------------------------------------------

const MiniStep: React.FC<{ text: string; strong?: boolean }> = ({ text, strong }) => (
  <span
    style={{
      flex: "none",
      fontSize: 10 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: `${3 * SCALE}px ${9 * SCALE}px`,
      color: strong ? colors.primary800 : colors.textSecondary,
      backgroundColor: strong ? colors.primary100 : colors.bg,
    }}
  >
    {text}
  </span>
);

const MeasureCard: React.FC<{
  icon: string;
  term: string;
  desc: string;
  from: string;
  to: string;
  atSec: number;
  stripAtSec: number;
}> = ({ icon, term, desc, from, to, atSec, stripAtSec }) => {
  const card = useAppear(atSec, { dy: 14 });
  const strip = useAppear(stripAtSec, { dy: 8 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${11 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      <IconBox icon={icon} size={24} />
      <b style={{ fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        <span style={markerStyle}>{term}</span>
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
      <span style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...strip }}>
        <MiniStep text={from} />
        <span style={{ flex: "none", color: colors.primary300, display: "flex" }}>
          <Ms name="arrow_forward" size={15 * SCALE} />
        </span>
        <MiniStep text={to} strong />
      </span>
    </div>
  );
};

const EntryControlScene: React.FC = () => {
  const bandAppear = useAppear(0.3, { dy: 12 });
  const termAppear = useAppear(segStart(SEG_ENTRY, 1), { dy: 0 });
  return (
    <SlideShell
      heading="扉を、素通りさせない"
      icon={<Ms name="lock" size={videoType.slideHeadIcon} />}
      narration={SEG_ENTRY}
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
        {/* 問題（このページの前提）— 新出用語「共連れ」は2文目の読み上げに同期して大きく出す
            （帯そのものは alignSelf:"stretch" で幅を固定し、語が出ても帯が伸び縮みしないようにする） */}
        <div
          style={{
            flex: "none",
            alignSelf: "stretch",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 11 * SCALE,
            padding: `${7 * SCALE}px ${18 * SCALE}px`,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
            borderRadius: 14 * SCALE,
            color: colors.accentPinkText,
            ...bandAppear,
          }}
        >
          <Ms name="group" size={20 * SCALE} />
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
            認証した人の後ろについて、一緒に入られる
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10 * SCALE,
              ...termAppear,
            }}
          >
            <span style={{ flex: "none", display: "flex", color: colors.accentPink }}>
              <Ms name="arrow_forward" size={18 * SCALE} />
            </span>
            <b style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
              共連れ
            </b>
          </span>
        </div>
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 12 * SCALE }}>
          <MeasureCard
            icon="badge"
            term="アンチパスバック"
            desc="入った記録のない人は、外へ出られない"
            from="入室の記録なし"
            to="退室できない"
            atSec={segStart(SEG_ENTRY, 2)}
            stripAtSec={segStart(SEG_ENTRY, 3)}
          />
          <MeasureCard
            icon="key"
            term="インターロック"
            desc="二重扉。同時には開かない"
            from="手前の扉が閉じる"
            to="奥の扉が開く"
            atSec={segStart(SEG_ENTRY, 4)}
            stripAtSec={segStart(SEG_ENTRY, 5)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s06: 監視カメラ・施錠管理 — 左テキスト + 右イラスト（s02 の鏡像）
// ---------------------------------------------------------------------------

const EffectLine: React.FC<{ icon: string; label: string; text: string; atSec: number }> = ({
  icon,
  label,
  text,
  atSec,
}) => {
  const line = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        fontSize: 12.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        ...line,
      }}
    >
      <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={19 * SCALE} />
      </span>
      <span style={{ color: colors.primary600 }}>{label}</span>
      <span>{text}</span>
    </span>
  );
};

const CameraScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const illustAppear = useAppear(0.5);
  const chanceAppear = useAppear(segStart(SEG_CAMERA, 2), { dy: 10 });
  return (
    <SlideShell narration={SEG_CAMERA}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
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
          <span style={{ display: "flex", ...chipAppear }}>
            <Chip text="出入りの記録と対になる" />
          </span>
          <b style={{ fontSize: 27 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>監視カメラ</span>
          </b>
          <EffectLine
            icon="search"
            label="検知"
            text="あとから確認できる"
            atSec={segStart(SEG_CAMERA, 1)}
          />
          <EffectLine
            icon="visibility"
            label="抑止"
            text="見られていると思わせる"
            atSec={segStart(SEG_CAMERA, 1) + 0.7}
          />
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              ...chanceAppear,
            }}
          >
            不正が起きる<span style={markerPinkStyle}>機会そのもの</span>を減らす
          </span>
          <span style={{ display: "flex" }}>
            <NoteChip
              icon="key"
              text="鍵も、誰にいつ貸したかを記録して管理する"
              atSec={segStart(SEG_CAMERA, 3)}
            />
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/tech-camera.png")}
          style={{
            flex: 0.85,
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
// s07: クリアデスク・クリアスクリーン — 中央に大タイル2枚（疎・息継ぎ）
// ---------------------------------------------------------------------------

const HabitTile: React.FC<{ icon: string; term: string; when: string; what: string; atSec: number }> = ({
  icon,
  term,
  when,
  what,
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
        gap: 7 * SCALE,
        ...tile,
      }}
    >
      <IconBox icon={icon} size={40} />
      <b style={{ fontSize: 21 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        <span style={markerStyle}>{term}</span>
      </b>
      <span
        style={{
          fontSize: 11.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.35,
          color: colors.textSecondary,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {`${when}\n${what}`}
      </span>
    </div>
  );
};

const ClearDeskScene: React.FC = () => {
  const leadAppear = useAppear(0.3, { dy: 10 });
  const closeAppear = useAppear(segStart(SEG_CLEAR, 3), { dy: 10 });
  return (
    <SlideShell narration={SEG_CLEAR}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16 * SCALE,
        }}
      >
        <span style={{ display: "flex", ...leadAppear }}>
          <Chip text="お金をかけずにできる" />
        </span>
        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "flex-start",
            gap: 20 * SCALE,
            width: "100%",
          }}
        >
          <HabitTile
            icon="description"
            term="クリアデスク"
            when="退社するとき"
            what="机の上に書類を残さない"
            atSec={segStart(SEG_CLEAR, 1)}
          />
          <HabitTile
            icon="lock"
            term="クリアスクリーン"
            when="離席するとき"
            what="画面をロックする"
            atSec={segStart(SEG_CLEAR, 2)}
          />
        </div>
        <b
          style={{
            flex: "none",
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...closeAppear,
          }}
        >
          もっとも安く、もっとも<span style={markerPinkStyle}>忘れられやすい</span>対策
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s08: 設備 — アイコン3連（UPS・耐震耐火・多重化）【章の転換 wipe-light】
// ---------------------------------------------------------------------------

const FacilityTile: React.FC<{
  icon: string;
  term: string;
  sub: string;
  note?: string;
  atSec: number;
  noteAtSec: number;
}> = ({ icon, term, sub, note, atSec, noteAtSec }) => {
  const tile = useAppear(atSec, { dy: 14 });
  const noteAppear = useAppear(noteAtSec, { dy: 6 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5 * SCALE,
        padding: `${11 * SCALE}px ${8 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...tile,
      }}
    >
      <IconBox icon={icon} size={26} />
      <b style={{ fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        {term}
      </b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {sub}
      </span>
      <span
        style={{
          fontSize: 10 * SCALE,
          fontWeight: 800,
          lineHeight: 1.3,
          color: colors.primary800,
          whiteSpace: "nowrap",
          ...(note ? noteAppear : { opacity: 0 }),
        }}
      >
        {note ?? "-"}
      </span>
    </div>
  );
};

const FacilityScene: React.FC = () => {
  const closeAppear = useAppear(segStart(SEG_FACILITY, 4) + 1.4, { dy: 10 });
  return (
    <SlideShell
      heading="止めない・壊さないための設備"
      icon={<Ms name="settings" size={videoType.slideHeadIcon} />}
      narration={SEG_FACILITY}
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
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 10 * SCALE }}>
          <FacilityTile
            icon="bolt"
            term="UPS"
            sub="無停電電源装置"
            note="安全に終了する時間を稼ぐ"
            atSec={segStart(SEG_FACILITY, 1)}
            noteAtSec={segStart(SEG_FACILITY, 2)}
          />
          <FacilityTile
            icon="apartment"
            term="耐震・耐火設備"
            sub="地震や火災に備える"
            atSec={segStart(SEG_FACILITY, 3)}
            noteAtSec={segStart(SEG_FACILITY, 3)}
          />
          <FacilityTile
            icon="layers"
            term="多重化"
            sub="電源や機器を二重にする"
            atSec={segStart(SEG_FACILITY, 4)}
            noteAtSec={segStart(SEG_FACILITY, 4)}
          />
        </div>
        <b
          style={{
            flex: "none",
            alignSelf: "center",
            fontSize: 13 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            ...closeAppear,
          }}
        >
          <span style={markerStyle}>片方が壊れても、止まらない</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s09: 遠隔バックアップ — 「同じ建物」と「離れた場所」の2パネル対比
// ---------------------------------------------------------------------------

const DiskChip: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{
      flex: "none",
      display: "flex",
      alignItems: "center",
      gap: 5 * SCALE,
      fontSize: 10.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      borderRadius: 10 * SCALE,
      padding: `${4 * SCALE}px ${10 * SCALE}px`,
      backgroundColor: colors.primary50,
      color: colors.primary800,
    }}
  >
    <Ms name="storage" size={14 * SCALE} />
    {text}
  </span>
);

const BuildingBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      flex: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4 * SCALE,
      padding: `${6 * SCALE}px ${12 * SCALE}px`,
      backgroundColor: colors.bg,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 14 * SCALE,
    }}
  >
    <span style={{ color: colors.textSecondary, display: "flex" }}>
      <Ms name="apartment" size={22 * SCALE} />
    </span>
    {children}
  </div>
);

const RemotePanel: React.FC<{
  title: string;
  verdict: string;
  verdictIcon: string;
  bad?: boolean;
  atSec: number;
  verdictAtSec: number;
  children: React.ReactNode;
}> = ({ title, verdict, verdictIcon, bad, atSec, verdictAtSec, children }) => {
  const panel = useAppear(atSec, { dy: 14 });
  const v = useAppear(verdictAtSec, { dy: 8 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6 * SCALE,
        // 縦の padding・gap は詰めてある（増やすと下の「遠隔バックアップ」が字幕帯に潜る）
        padding: `${9 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${bad ? colors.accentPinkSoft : colors.border}`,
        borderRadius: 18 * SCALE,
        ...panel,
      }}
    >
      <b
        style={{
          flex: "none",
          fontSize: 13.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          color: bad ? colors.accentPinkText : colors.primary600,
        }}
      >
        {title}
      </b>
      {children}
      <span
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          gap: 7 * SCALE,
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          color: bad ? colors.accentPinkText : colors.primary800,
          ...v,
        }}
      >
        <Ms name={verdictIcon} size={16 * SCALE} />
        {verdict}
      </span>
    </div>
  );
};

const RemoteBackupScene: React.FC = () => {
  const termAppear = useAppear(segStart(SEG_REMOTE, 3), { dy: 12 });
  return (
    <SlideShell
      heading="控えを、どこに置くか"
      icon={<Ms name="storage" size={videoType.slideHeadIcon} />}
      narration={SEG_REMOTE}
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
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 14 * SCALE }}>
          <RemotePanel
            title="同じ建物の中"
            verdict="火事や地震で、まとめて失う"
            verdictIcon="warning"
            bad
            atSec={0.3}
            verdictAtSec={segStart(SEG_REMOTE, 1)}
          >
            <BuildingBox>
              <span style={{ display: "flex", gap: 6 * SCALE }}>
                <DiskChip text="本番" />
                <DiskChip text="控え" />
              </span>
            </BuildingBox>
          </RemotePanel>
          <RemotePanel
            title="離れた場所へ"
            verdict="片方が失われても、残る"
            verdictIcon="task_alt"
            atSec={segStart(SEG_REMOTE, 2)}
            verdictAtSec={segStart(SEG_REMOTE, 2) + 0.8}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
              <BuildingBox>
                <DiskChip text="本番" />
              </BuildingBox>
              <span style={{ flex: "none", color: colors.primary300, display: "flex" }}>
                <Ms name="arrow_forward" size={18 * SCALE} />
              </span>
              <BuildingBox>
                <DiskChip text="控え" />
              </BuildingBox>
            </span>
          </RemotePanel>
        </div>
        <b
          style={{
            flex: "none",
            alignSelf: "center",
            fontSize: 18 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            ...termAppear,
          }}
        >
          <span style={markerStyle}>遠隔バックアップ</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s10: 記憶媒体の管理と処分 — 左イラスト + 右に「持ち出すとき／捨てるとき」
// ---------------------------------------------------------------------------

const MediaLine: React.FC<{ icon: string; text: string; pink?: boolean; atSec: number }> = ({
  icon,
  text,
  pink,
  atSec,
}) => {
  const line = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        fontSize: 12 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        color: pink ? colors.accentPinkText : colors.textPrimary,
        ...line,
      }}
    >
      <span style={{ flex: "none", display: "flex", color: pink ? colors.accentPinkText : colors.primary600 }}>
        <Ms name={icon} size={18 * SCALE} />
      </span>
      {text}
    </span>
  );
};

const MediaScene: React.FC = () => {
  const illustAppear = useAppear(0.5);
  const takeAppear = useAppear(0.3, { dy: 10 });
  const dumpAppear = useAppear(segStart(SEG_MEDIA, 2), { dy: 10 });
  const wayAppear = useAppear(segStart(SEG_MEDIA, 4), { dy: 10 });
  return (
    <SlideShell
      heading="記憶媒体の、持ち出しと処分"
      icon={<Ms name="archive" size={videoType.slideHeadIcon} />}
      narration={SEG_MEDIA}
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
          src={staticFile("images/ipa_sg/tech-shredder.png")}
          style={{
            flex: 0.8,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.35,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8 * SCALE,
          }}
        >
          <span style={{ display: "flex", ...takeAppear }}>
            <Chip text="持ち出すとき" />
          </span>
          <MediaLine
            icon="menu_book"
            text="台帳に記録し、鍵のかかる場所へ"
            atSec={segStart(SEG_MEDIA, 1)}
          />
          <span style={{ display: "flex", marginTop: 4 * SCALE, ...dumpAppear }}>
            <Chip text="捨てるとき（いちばん危ない）" tone="pink" />
          </span>
          <MediaLine
            icon="warning"
            text="削除しただけでは、専用のソフトで戻せる"
            pink
            atSec={segStart(SEG_MEDIA, 3)}
          />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10 * SCALE,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              ...wayAppear,
            }}
          >
            <span style={markerStyle}>上書きして完全に消す</span>
            <span style={{ flex: "none", color: colors.textMuted }}>または</span>
            <span style={markerStyle}>物理的に壊す</span>
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

export const SgL41PhysicalSecurity: VideoSpec = {
  id: "sg-L41-physical-security",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "サイバー対策も\n物理で破られる",
      keywords: ["ゾーニング", "入退室管理", "クリアデスク"],
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
      name: "zoning",
      durationSec: 6,
      narration: SEG_ZONE,
      component: ZoningScene,
    },
    {
      pattern: "custom",
      name: "visitor-case",
      durationSec: 6,
      narration: SEG_VISITOR,
      component: VisitorScene,
    },
    {
      pattern: "custom",
      name: "entry-control",
      durationSec: 7,
      narration: SEG_ENTRY,
      component: EntryControlScene,
    },
    {
      pattern: "custom",
      name: "camera-lock",
      durationSec: 6,
      narration: SEG_CAMERA,
      component: CameraScene,
    },
    {
      pattern: "custom",
      name: "clear-desk",
      durationSec: 6,
      narration: SEG_CLEAR,
      component: ClearDeskScene,
    },
    {
      pattern: "custom",
      name: "facility",
      durationSec: 7,
      narration: SEG_FACILITY,
      component: FacilityScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "remote-backup",
      durationSec: 6,
      narration: SEG_REMOTE,
      component: RemoteBackupScene,
    },
    {
      pattern: "custom",
      name: "media-disposal",
      durationSec: 7,
      narration: SEG_MEDIA,
      component: MediaScene,
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
      question: "アンチパスバックが防ぐのは？",
      choices: [
        { key: "A", text: "退社時に書類を机に残すこと" },
        { key: "B", text: "認証した人について一緒に入る", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "クリアデスクの目的は？",
      choices: [
        { key: "A", text: "机の上の情報を持ち去られない", correct: true },
        { key: "B", text: "停電のときに機器を守る" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "削除だけで捨てると危ないのは？",
      choices: [
        { key: "A", text: "台帳に記録が残らないから" },
        { key: "B", text: "専用のソフトで元に戻せるから", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "区域を分け、奥ほど入れる人を絞る", checkAtSec: segStart(SEG_SUM, 0) },
        { text: "カメラ・施錠・クリアデスクで機会を減らす", checkAtSec: segStart(SEG_SUM, 1) },
        { text: "設備と遠隔バックアップ、媒体は消して捨てる", checkAtSec: segStart(SEG_SUM, 2) },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
