import { Img, staticFile } from "remotion";
import { colors, markerStyle, fontMono, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L36-access-control-zero-trust.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L36: アクセス制御とゼロトラスト
 *
 * 発注書 content_works/ipa_sg/orders/L36.md（範囲の正）に対応。
 * シナリオ・用語の呼称・リズム設計は narration/ipa_sg/sg-L36-access-control-zero-trust.md。
 *
 * ★この回が「アクセス制御・最小権限」の主担当（L22 が地図として触れた最小権限を運用へ落とす。
 * L83・L88 の科目Bケースがこの回の呼称を参照する）。呼称は L22 s06 に揃えてある。
 *
 *   導入（鍵をかけても全部屋が開くなら守れない）→ アクセス制御の定義 → 権限表 →
 *   ★最小権限・ニードトゥノウ → ★抽象→具体（Bさんの異動で権限が足し算になる／棚卸し）→
 *   wipe-light で「特権」へ → 特権的アクセス権 → セキュアOS → ゼロトラスト（vs）→
 *   検疫ネットワーク → クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 範囲の切り分け（発注書の「扱わない」）:
 *   アカウントを渡す／取り上げる**組織側の手続き**は L34 なので、この回は権限の設計と運用に限定。
 *   認証の技術（パスワード・多要素）は L18・L19 なので「誰かを確かめたあと」から始める。
 *   ファイアウォール・DMZ など**境界防御の仕組みは L38**。P9 の左列は用語を先取りせず
 *   「これまでの守り方」と呼び、装置名は出さない（ナレーションでも言っていない）。
 *   データベースのアクセス制御は L58、ケース演習は L83・L88。
 *
 * 音声と字幕が違う箇所（narration.md の決まり。字幕は N() の第2引数が正）:
 *   Bさん→ビーさん / OS→オーエス / ID→アイディー / クイズの選択肢記号 A・B→エー・ビー。
 *   ラテン文字を1字ずつ不安定に読ませないための措置。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L36-access-control-zero-trust");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "情報を守る対策のなかで、毎日いちばん使われているのがアクセス制御です。"),
  N("s02-2.mp3", "建物に鍵をかけても、入った人が全部の部屋を開けられたら、守れているとは言えません。"),
  N("s02-3.mp3", "誰に、何を、どこまで許すのか。その仕組みを学びます。"),
];

const SEG_DEF = [
  N("s03-1.mp3", "アクセス制御とは、誰がどの情報にどこまで触れてよいかを決めて、守らせる仕組みです。"),
  N("s03-2.mp3", "決めることは三つ。誰が、どの情報を、どう扱えるか、です。"),
  N("s03-3.mp3", "この三つの組み合わせが、そのまま権限になります。"),
];

const SEG_TABLE = [
  N("s04-1.mp3", "実際の設定は、こんな表のかたちになります。"),
  N("s04-2.mp3", "縦に利用者やグループ、横に読む、書く、実行するといった操作を並べます。"),
  N("s04-3.mp3", "一人ずつ設定すると手間がかかるので、ふつうは部署などのグループ単位で割り当てます。"),
];

const SEG_LEAST = [
  N("s05-1.mp3", "ここで大切になるのが、最小権限の原則です。"),
  N("s05-2.mp3", "業務に必要な人に、必要な範囲だけを与える、という考え方です。"),
  N("s05-3.mp3", "知る必要がある人にだけ知らせる、ニードトゥノウとも呼ばれます。"),
  N("s05-4.mp3", "全員に全部を許すと、一つのアカウントが乗っ取られただけで、すべてが漏れます。"),
];

const SEG_CASE = [
  // 音声は「…えいぎょうぶのビーさんが…」
  N("s06-1.mp3", "たとえば、営業部のBさんが経理部へ異動したとします。"),
  N("s06-2.mp3", "経理のシステムを使うために、新しい権限が追加されます。"),
  N("s06-3.mp3", "ところが、営業の顧客名簿を見られる権限は、そのまま残りがちです。"),
  N("s06-4.mp3", "こうして権限は足し算ばかりになり、一人の届く範囲が広がっていきます。"),
  N("s06-5.mp3", "だから異動や退職のたびに棚卸しをして、いらない権限を外します。"),
];

const SEG_PRIV = [
  N("s07-1.mp3", "権限のなかでも特別な扱いが必要なのが、特権的アクセス権です。"),
  N("s07-2.mp3", "システムの管理者に与えられる、ほとんど何でもできる権限のことです。"),
  // 音声は「…アイディー を複数人で…」
  N("s07-3.mp3", "使える人を絞り、IDを複数人で共有しないことが基本です。"),
  N("s07-4.mp3", "そのうえで、特権での操作はすべて記録に残します。"),
];

const SEG_SECOS = [
  // 音声は「…発想を オーエス に組み込んだものが セキュアオーエス です。」
  N("s08-1.mp3", "管理者でも何でもはできない、という発想をOSに組み込んだものがセキュアOSです。"),
  N("s08-2.mp3", "利用者ではなく、システムの側が決めた規則で許可を判断します。"),
  N("s08-3.mp3", "これを強制アクセス制御と呼びます。"),
  N("s08-4.mp3", "さらに管理者の権限を分割し、乗っ取られても被害が限定されるようにします。"),
];

const SEG_ZT = [
  N("s09-1.mp3", "これまでの守り方は、社内と社外の境目に壁を作るものでした。"),
  N("s09-2.mp3", "でも、社内の人が悪意を持つこともあれば、社外から働く人もいます。"),
  N("s09-3.mp3", "そこで、社内だから信用する、をやめたのがゼロトラストです。"),
  N("s09-4.mp3", "場所ではなく、アクセスのたびに毎回確かめます。"),
];

const SEG_QNET = [
  N("s10-1.mp3", "その発想を形にした仕組みが、検疫ネットワークです。"),
  N("s10-2.mp3", "持ち込んだパソコンを、いきなり社内のネットワークにはつなぎません。"),
  N("s10-3.mp3", "まず隔離した専用のネットワークで、健全かどうかを検査します。"),
  N("s10-4.mp3", "修正プログラムやウイルス対策が最新かを確かめて通します。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "一問目です。"),
  N("s12-2.mp3", "最小権限の原則に沿った設定は、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、Bの業務で使う範囲だけを与える、です。", { gapBeforeSec: 1.8 }),
  N("s12-4.mp3", "全員に同じ権限をまとめて付けると、必要のない情報にまで手が届きます。"),
];

const SEG_Q2 = [
  N("s13-1.mp3", "二問目です。"),
  N("s13-2.mp3", "管理者のIDを複数人で共有すると、何が問題になるでしょうか。"),
  N("s13-3.mp3", "正解は、Aの誰の操作か分からなくなる、です。", { gapBeforeSec: 1.8 }),
  N("s13-4.mp3", "記録は残っても、操作した人にたどり着けなくなってしまいます。"),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "ゼロトラストの考え方に近いのは、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、Bの場所で信用せず毎回確かめる、です。", { gapBeforeSec: 1.8 }),
  N("s14-4.mp3", "社内にいることは、もう安全の証明にはならないという前提に立ちます。"),
];

const SEG_SUM = [
  N("s15-1.mp3", "今回のまとめです。"),
  N("s15-2.mp3", "アクセス制御は、誰に何をどこまで許すかを決め、最小限に絞るのが基本です。"),
  N("s15-3.mp3", "特権的アクセス権は、人を絞り、共有せず、操作を記録します。"),
  N("s15-4.mp3", "社内という場所を信用しないのが、ゼロトラストと検疫ネットワークの発想です。"),
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
// P2: 導入 — 左テキスト + 右イラスト（鍵をかけても、全部屋が開くなら守れていない）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const themeAppear = useAppear(0.3, { dy: 12 });
  const illustAppear = useAppear(0.5);
  const metaphorAppear = useAppear(segStart(SEG_INTRO, 1), { dy: 10 });
  const leadAppear = useAppear(segStart(SEG_INTRO, 2), { dy: 12 });
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.3,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 11 * SCALE,
          }}
        >
          <span style={{ ...themeAppear, display: "flex", flexDirection: "column", gap: 6 * SCALE }}>
            <Chip text="今回のテーマ" />
            <b style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.3, whiteSpace: "pre-line" }}>
              {"毎日いちばん使われている\nセキュリティ対策"}
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
              ...metaphorAppear,
            }}
          >
            <Ms name="lock_open" size={15 * SCALE} />
            鍵をかけても、全部の部屋が開くなら守れない
          </span>
          <b
            style={{
              fontSize: 17 * SCALE,
              fontWeight: 800,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"誰に、何を、\n"}
            <span style={markerStyle}>どこまで許すか</span>
            {"を決める"}
          </b>
        </div>
        <Img
          src={staticFile("images/ipa_sg/tech-gate.png")}
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
// P3: アクセス制御とは — 中央キーワード見出し + 決めること3つ
// ---------------------------------------------------------------------------

const DecideChip: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => {
  const chip = usePop(atSec);
  return (
    <span
      style={{
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${8 * SCALE}px ${16 * SCALE}px`,
        borderRadius: 14 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        fontSize: 13 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      <span style={{ color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={17 * SCALE} />
      </span>
      {label}
    </span>
  );
};

const DefinitionScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const descAppear = useAppear(0.9, { dy: 10 });
  const eqAppear = useAppear(segStart(SEG_DEF, 2), { dy: 10 });
  return (
    <SlideShell narration={SEG_DEF}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10 * SCALE,
        }}
      >
        <span style={chipAppear}>
          <Chip text="今回の土台になる仕組み" />
        </span>
        <b
          style={{
            flex: "none",
            fontSize: 30 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            textAlign: "center",
            ...termAppear,
          }}
        >
          <span style={markerStyle}>アクセス制御</span>
        </b>
        <span
          style={{
            flex: "none",
            fontSize: 12.5 * SCALE,
            fontWeight: 700,
            lineHeight: 1.4,
            color: colors.textSecondary,
            textAlign: "center",
            ...descAppear,
          }}
        >
          どこまで触れてよいかを決めて、守らせる仕組み
        </span>
        {/* 決めることは三つ — 語りに合わせて左から順に出す */}
        <div
          style={{
            flex: "none",
            marginTop: 4 * SCALE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10 * SCALE,
          }}
        >
          <DecideChip icon="person" label="誰が" atSec={segStart(SEG_DEF, 1)} />
          <DecideChip icon="description" label="どの情報を" atSec={segStart(SEG_DEF, 1) + 0.8} />
          <DecideChip icon="build" label="どう扱えるか" atSec={segStart(SEG_DEF, 1) + 1.6} />
        </div>
        <b
          style={{
            flex: "none",
            marginTop: 2 * SCALE,
            fontSize: 14 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...eqAppear,
          }}
        >
          {/* 字幕が全文を語るので、画面は要点だけ（原稿と同じ文を書かない） */}
          三つの組み合わせ ＝ <span style={markerStyle}>権限</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: アクセス権の設定 — 権限表グリッド（縦=グループ / 横=操作）
// ---------------------------------------------------------------------------

const PERM_ROWS: { group: string; perms: boolean[] }[] = [
  { group: "営業部", perms: [true, true, true] },
  { group: "経理部", perms: [true, false, false] },
  { group: "アルバイト", perms: [false, false, false] },
];

const PermMark: React.FC<{ ok: boolean; atSec: number }> = ({ ok, atSec }) => {
  const mark = usePop(atSec);
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: ok ? colors.primary600 : colors.textMuted,
        ...mark,
      }}
    >
      <Ms name={ok ? "check_circle" : "cancel"} size={13 * SCALE} />
    </span>
  );
};

const PermCell: React.FC<{ children: React.ReactNode; head?: boolean }> = ({ children, head }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: `${3 * SCALE}px 0`,
      backgroundColor: head ? colors.primary50 : colors.surface,
      borderRadius: 10 * SCALE,
      fontSize: 11.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      color: head ? colors.primary800 : colors.textPrimary,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

const PermTableScene: React.FC = () => {
  const tableAppear = useAppear(0.35, { dy: 12 });
  const cellsAt = segStart(SEG_TABLE, 1);
  return (
    <SlideShell
      heading="アクセス権の設定"
      icon={<Ms name="table_chart" size={videoType.slideHeadIcon} />}
      narration={SEG_TABLE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // 見出し帯と字幕帯にはさまれた本文高さは約 655px しかない。
          // 4行の表 + キャプション + 注記チップは、この詰め方でようやく収まる
          gap: 7 * SCALE,
        }}
      >
        <span
          style={{
            flex: "none",
            fontSize: 11 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            color: colors.textSecondary,
            ...tableAppear,
          }}
        >
          例：顧客管理システムに対する権限
        </span>
        <div
          style={{
            flex: "none",
            width: "84%",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
            gap: 5 * SCALE,
            ...tableAppear,
          }}
        >
          {/* 見出し行（表の軸。これ自体に意味があるので先に出す） */}
          <PermCell head>利用者・グループ</PermCell>
          <PermCell head>読む</PermCell>
          <PermCell head>書く</PermCell>
          <PermCell head>実行する</PermCell>
          {PERM_ROWS.map((row, r) => (
            <PermRow key={row.group} group={row.group} perms={row.perms} atSec={cellsAt + r * 0.7} />
          ))}
        </div>
        <NoteChip
          icon="groups"
          text="一人ずつではなく、部署などのグループ単位で割り当てる"
          atSec={segStart(SEG_TABLE, 2)}
        />
      </div>
    </SlideShell>
  );
};

/** 表の1行（グループ名 + ○×3つ）。grid の直下に4セルを並べるため Fragment で返す */
const PermRow: React.FC<{ group: string; perms: boolean[]; atSec: number }> = ({
  group,
  perms,
  atSec,
}) => {
  const label = useAppear(atSec, { dy: 8 });
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${3 * SCALE}px 0`,
          backgroundColor: colors.surface,
          border: `${1.5 * SCALE}px solid ${colors.border}`,
          borderRadius: 10 * SCALE,
          fontSize: 11.5 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          ...label,
        }}
      >
        {group}
      </div>
      {perms.map((ok, i) => (
        <div
          key={`${group}-${i}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: `${3 * SCALE}px 0`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 10 * SCALE,
            // 行の出現アニメを枠にも掛ける。掛けないと「中身の無い白い箱」が
            // 行が出るまでの数秒間ずっと並んで見える（stills はシーン末尾なので気づけない）
            ...label,
          }}
        >
          <PermMark ok={ok} atSec={atSec + 0.15 + i * 0.15} />
        </div>
      ))}
    </>
  );
};

// ---------------------------------------------------------------------------
// P5: ★最小権限の原則 — 左キーワード見出し + 右の絞り込み図（L22 s06 と同じ絵）
// ---------------------------------------------------------------------------

const ScopeBar: React.FC<{
  label: string;
  widthPct: number;
  bg: string;
  fg: string;
  atSec: number;
}> = ({ label, widthPct, bg, fg, atSec }) => {
  const bar = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        alignSelf: "center",
        width: `${widthPct}%`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 21 * SCALE,
        borderRadius: 10 * SCALE,
        backgroundColor: bg,
        color: fg,
        fontSize: 10.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        ...bar,
      }}
    >
      {label}
    </div>
  );
};

const LeastPrivilegeScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const descAppear = useAppear(segStart(SEG_LEAST, 1), { dy: 10 });
  const aliasAppear = useAppear(segStart(SEG_LEAST, 2), { dy: 10 });
  return (
    <SlideShell narration={SEG_LEAST}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "6%" }}>
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
            <Chip text="アクセス制御の基本原則" />
          </span>
          <b
            style={{
              fontSize: 25 * SCALE,
              fontWeight: 800,
              lineHeight: 1.25,
              whiteSpace: "pre-line",
              ...termAppear,
            }}
          >
            <span style={markerStyle}>{"最小権限の原則"}</span>
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
            {"業務に必要な人に、\n必要な範囲だけを与える"}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8 * SCALE,
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              color: colors.primary800,
              whiteSpace: "nowrap",
              ...aliasAppear,
            }}
          >
            <Ms name="swap_horiz" size={15 * SCALE} />
            ニードトゥノウ（need-to-know）とも呼ぶ
          </span>
          <NoteChip
            icon="warning"
            text="全部を許すと、1つの乗っ取りで全部が漏れる"
            atSec={segStart(SEG_LEAST, 3)}
            warn
          />
        </div>
        {/* 全社 → 部署 → 本人 と絞り込む図（L22 s06 と同じ視覚言語） */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8 * SCALE,
          }}
        >
          {/* ラベルはバー幅に収まる長さに切る（46%幅では10文字が右へあふれた） */}
          <ScopeBar
            label="全社の情報"
            widthPct={100}
            bg={colors.primary50}
            fg={colors.textSecondary}
            atSec={0.6}
          />
          <ScopeBar
            label="部署の情報"
            widthPct={78}
            bg={colors.primary100}
            fg={colors.primary800}
            atSec={segStart(SEG_LEAST, 1)}
          />
          <ScopeBar
            label="本人に必要な分"
            widthPct={58}
            bg={colors.primary500}
            fg={colors.surface}
            atSec={segStart(SEG_LEAST, 1) + 0.9}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: ★抽象→具体 — Bさんの異動で、権限が足し算になっていく
// ---------------------------------------------------------------------------

const PermBadge: React.FC<{ text: string; stale?: boolean }> = ({ text, stale }) => (
  <span
    style={{
      flex: "none",
      display: "flex",
      alignItems: "center",
      gap: 5 * SCALE,
      padding: `${5 * SCALE}px ${9 * SCALE}px`,
      borderRadius: 999,
      backgroundColor: stale ? colors.accentPinkSurface : colors.primary50,
      border: `${1.5 * SCALE}px solid ${stale ? colors.accentPinkSoft : colors.primary100}`,
      color: stale ? colors.accentPinkText : colors.primary800,
      fontSize: 10 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
    }}
  >
    <Ms name={stale ? "warning" : "check_circle"} size={12 * SCALE} />
    {text}
  </span>
);

const PhaseBand: React.FC<{
  when: string;
  atSec: number;
  children: React.ReactNode;
}> = ({ when, atSec, children }) => {
  const band = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        padding: `${9 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...band,
      }}
    >
      <b
        style={{
          flex: "none",
          minWidth: 26 * SCALE,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {when}
      </b>
      <span style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, flexWrap: "nowrap" }}>
        {children}
      </span>
    </div>
  );
};

const TransferCaseScene: React.FC = () => {
  const headAppear = useAppear(0.3, { dy: 10 });
  const illustAppear = useAppear(0.5);
  const newPermAppear = useAppear(segStart(SEG_CASE, 1), { dy: 8 });
  const stalePermAppear = useAppear(segStart(SEG_CASE, 2), { dy: 8 });
  const growAppear = useAppear(segStart(SEG_CASE, 3), { dy: 10 });
  return (
    <SlideShell narration={SEG_CASE}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-employee-f-laptop.png")}
          style={{
            flex: 0.6,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.9,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 9 * SCALE,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11 * SCALE,
              ...headAppear,
            }}
          >
            <Chip text="たとえば" />
            <b style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.25, whiteSpace: "nowrap" }}>
              営業部のBさんが、経理部へ異動
            </b>
          </span>
          <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 8 * SCALE }}>
            <PhaseBand when="異動前" atSec={0.45}>
              <PermBadge text="顧客名簿：読む・書く" />
            </PhaseBand>
            {/* バッジ2つを1行に収めるため、異動後は対象名だけに切る（右端で切れていた） */}
            <PhaseBand when="異動後" atSec={segStart(SEG_CASE, 1)}>
              <span style={newPermAppear}>
                <PermBadge text="会計システム" />
              </span>
              <span style={stalePermAppear}>
                <PermBadge text="顧客名簿が残ったまま" stale />
              </span>
            </PhaseBand>
          </div>
          <b
            style={{
              fontSize: 13.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              ...growAppear,
            }}
          >
            権限は<span style={markerStyle}>足し算ばかり</span>になり、届く範囲が広がる
          </b>
          <NoteChip
            icon="checklist"
            text="異動・退職のたびに棚卸しして、いらない権限を外す"
            atSec={segStart(SEG_CASE, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 特権的アクセス権 — 用語見出し + 守り方3カード（wipe-light で章転換）
// ---------------------------------------------------------------------------

const GuardCard: React.FC<{ icon: string; title: string; sub: string; atSec: number }> = ({
  icon,
  title,
  sub,
  atSec,
}) => {
  const card = useAppear(atSec, { dy: 14 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${12 * SCALE}px ${9 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...card,
      }}
    >
      <IconBox icon={icon} size={25} />
      <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        {title}
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

const PrivilegeScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const descAppear = useAppear(segStart(SEG_PRIV, 1), { dy: 10 });
  return (
    <SlideShell narration={SEG_PRIV}>
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
        <span style={{ flex: "none", display: "flex", alignItems: "center", gap: 11 * SCALE }}>
          <span style={chipAppear}>
            <Chip text="管理者に与える、いちばん強い権限" />
          </span>
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>特権的アクセス権</span>
          </b>
        </span>
        <span
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            fontSize: 12 * SCALE,
            fontWeight: 700,
            lineHeight: 1.3,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
            ...descAppear,
          }}
        >
          <Ms name="key" size={16 * SCALE} />
          ほとんど何でもできてしまうので、扱いを別に決める
        </span>
        <div style={{ flex: "none", display: "flex", alignItems: "stretch", gap: 12 * SCALE }}>
          <GuardCard
            icon="manage_accounts"
            title="人を絞る"
            sub={"使える人を\nできるだけ少なく"}
            atSec={segStart(SEG_PRIV, 2)}
          />
          <GuardCard
            icon="badge"
            title="共有しない"
            sub={"1つのIDを\n複数人で使わない"}
            atSec={segStart(SEG_PRIV, 2) + 1.4}
          />
          <GuardCard
            icon="fact_check"
            title="記録する"
            sub={"特権での操作は\nすべてログに残す"}
            atSec={segStart(SEG_PRIV, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: セキュアOS — 上下2段のバンド図（規則が判断する／権限を分割する）
// ---------------------------------------------------------------------------

const FeatureBand: React.FC<{
  icon: string;
  title: string;
  body: React.ReactNode;
  tag?: string;
  tagAtSec?: number;
  atSec: number;
}> = ({ icon, title, body, tag, tagAtSec, atSec }) => {
  const band = useAppear(atSec, { dy: 14 });
  const tagShow = useAppear(tagAtSec ?? 0, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14 * SCALE,
        padding: `${11 * SCALE}px ${16 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...band,
      }}
    >
      <IconBox icon={icon} size={26} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 * SCALE }}>
        <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25, whiteSpace: "nowrap" }}>
          {title}
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
          {body}
        </span>
      </div>
      {tag ? (
        <span style={{ flex: "none", ...tagShow }}>
          <Chip text={tag} />
        </span>
      ) : null}
    </div>
  );
};

const SecureOsScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  return (
    <SlideShell narration={SEG_SECOS}>
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
        <span style={{ flex: "none", display: "flex", alignItems: "center", gap: 11 * SCALE }}>
          <span style={chipAppear}>
            <Chip text="管理者でも何でもはできない" />
          </span>
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>セキュアOS</span>
          </b>
        </span>
        {/* タグ付きの帯は本文に使える幅が狭い（タグと重なるので文言を短く保つ） */}
        <FeatureBand
          icon="policy"
          title="許可を判断するのはシステム"
          body="利用者ではなく、決められた規則のとおりに許可する"
          tag="強制アクセス制御"
          tagAtSec={segStart(SEG_SECOS, 2)}
          atSec={segStart(SEG_SECOS, 1)}
        />
        <FeatureBand
          icon="call_split"
          title="管理者の権限を分割する"
          body="一人では全部を触れないので、乗っ取られても被害が限定される"
          atSec={segStart(SEG_SECOS, 3)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 検疫ネットワーク — 3段のステップ + 右イラスト
// ---------------------------------------------------------------------------

const StepBand: React.FC<{ no: string; text: React.ReactNode; atSec: number }> = ({
  no,
  text,
  atSec,
}) => {
  const band = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        padding: `${9 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...band,
      }}
    >
      <span
        style={{
          flex: "none",
          fontFamily: fontMono,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          lineHeight: 1,
          color: colors.primary600,
        }}
      >
        {no}
      </span>
      <span
        style={{
          minWidth: 0,
          fontSize: 10 * SCALE,
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        {text}
      </span>
    </div>
  );
};

const QuarantineScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.55, { dy: 12 });
  const illustAppear = useAppear(0.6);
  return (
    <SlideShell narration={SEG_QNET}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.95,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 9 * SCALE,
          }}
        >
          <span style={chipAppear}>
            <Chip text="つなぐ前に検査する仕組み" />
          </span>
          <b style={{ fontSize: 23 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>検疫ネットワーク</span>
          </b>
          <div
            style={{
              alignSelf: "stretch",
              marginTop: 2 * SCALE,
              display: "flex",
              flexDirection: "column",
              gap: 7 * SCALE,
            }}
          >
            <StepBand
              no="01"
              text="持ち込んだPCを、いきなり社内につながない"
              atSec={segStart(SEG_QNET, 1)}
            />
            <StepBand
              no="02"
              text="隔離した専用のネットワークで健全性を検査"
              atSec={segStart(SEG_QNET, 2)}
            />
            <StepBand
              no="03"
              text="修正プログラム・ウイルス対策が最新なら社内へ"
              atSec={segStart(SEG_QNET, 3)}
            />
          </div>
        </div>
        <Img
          src={staticFile("images/ipa_sg/tech-quarantine.png")}
          style={{
            flex: 0.7,
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
// クイズ幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL36AccessControlZeroTrust: VideoSpec = {
  id: "sg-L36-access-control-zero-trust",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "誰に、何を、\nどこまで許すか",
      keywords: ["最小権限", "特権管理", "ゼロトラスト"],
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
      name: "definition",
      durationSec: 6,
      narration: SEG_DEF,
      component: DefinitionScene,
    },
    {
      pattern: "custom",
      name: "permission-table",
      durationSec: 6,
      narration: SEG_TABLE,
      component: PermTableScene,
    },
    {
      pattern: "custom",
      name: "least-privilege",
      durationSec: 7,
      narration: SEG_LEAST,
      component: LeastPrivilegeScene,
    },
    {
      pattern: "custom",
      name: "transfer-case",
      durationSec: 8,
      narration: SEG_CASE,
      component: TransferCaseScene,
    },
    {
      pattern: "custom",
      name: "privileged-access",
      durationSec: 7,
      narration: SEG_PRIV,
      component: PrivilegeScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "secure-os",
      durationSec: 7,
      narration: SEG_SECOS,
      component: SecureOsScene,
    },
    {
      // 境界防御は L38 の領分なので、左列は用語ではなく「これまでの守り方」と呼ぶ
      pattern: "vs",
      heading: "守り方の前提が変わる",
      icon: "compare_arrows",
      left: {
        title: "これまでの守り方",
        icon: "security",
        rows: [
          { k: "信用の基準", v: "社内か、社外か" },
          { k: "守るところ", v: "社内と社外の境目" },
          { k: "弱いところ", v: "中に入られると通る" },
        ],
      },
      right: {
        title: "ゼロトラスト",
        icon: "verified_user",
        rows: [
          { k: "信用の基準", v: "場所では信用しない" },
          { k: "守るところ", v: "アクセスのたび毎回" },
          { k: "強いところ", v: "社内も社外も同じ扱い" },
        ],
      },
      columnAtSec: [0.4, segStart(SEG_ZT, 2)],
      narration: SEG_ZT,
    },
    {
      pattern: "custom",
      name: "quarantine-network",
      durationSec: 7,
      narration: SEG_QNET,
      component: QuarantineScene,
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
      question: "最小権限の原則に沿うのは？",
      choices: [
        { key: "A", text: "全員に同じ権限をまとめて付ける" },
        { key: "B", text: "業務で使う範囲だけを付ける", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "管理者IDを共有する問題は？",
      choices: [
        { key: "A", text: "誰の操作か分からなくなる", correct: true },
        { key: "B", text: "管理者の人数が増えてしまう" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "ゼロトラストの考え方は？",
      choices: [
        { key: "A", text: "社内からの通信は信用する" },
        { key: "B", text: "場所で信用せず毎回確かめる", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "アクセス制御は、誰に何をどこまで許すかを決め、最小限に絞ります。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "特権的アクセス権は、人を絞り、共有せず、操作を記録します。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
        {
          text: "社内という場所を信用しないのが、ゼロトラストと検疫の発想です。",
          checkAtSec: segStart(SEG_SUM, 3),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
