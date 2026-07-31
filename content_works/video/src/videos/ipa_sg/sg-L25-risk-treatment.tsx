import { Img, staticFile } from "remotion";
import { colors, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L25-risk-treatment.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L25: リスク対応
 *
 * 発注書 content_works/ipa_sg/orders/L25.md が範囲の正。
 * シナリオは narration/ipa_sg/sg-L25-risk-treatment.md。
 *
 * ★ **リスク対応4分類の主担当**（L66・L73・L81 が参照）。呼称は
 * narration/ipa_sg/sg-L25-risk-treatment.md の「用語の呼称」表で確定させている:
 *   回避 → 共有 → 保有 → 低減 の順に固定。「リスク移転」は共有の中の一形態として扱う。
 *
 * 構成: 導入（測り終えた次）→ ★4分類の顔見せ → 両極の対比（回避／保有）→
 *   共有の2つの形（移転・分散）→ 低減 → wipe-light でコントロール／ファイナンシングの
 *   切り口 → 【抽象→具体】1つのリスクに4つの打ち手 → 残留リスク → 関連用語の地図 →
 *   クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * リスクアセスメント・リスク値の算定は L24 の領分なので再説明しない（P2 で受け取るだけ）。
 * 管理策の4区分は L29、対応策選定のケース演習は L81。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L25-risk-treatment");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "前回のリスクアセスメントで、リスクに優先順位が付きました。"),
  N("s02-2.mp3", "今回は、そのリスクにどう手を打つかを決める、リスク対応を学びます。"),
  N("s02-3.mp3", "打ち手は思いつきで選ばず、四つの型から選びます。"),
  N("s02-4.mp3", "どれを選ぶかは、費用と効果を見比べた経営の判断になります。"),
];

const SEG_FOUR = [
  N("s03-1.mp3", "測ったリスクへの手の打ち方は、大きく四つに分けられます。"),
  N("s03-2.mp3", "一つ目のリスク回避は、リスクの原因ごとやめてしまうことです。"),
  N("s03-3.mp3", "二つ目のリスク共有は、リスクを他者と分け合うことです。"),
  N("s03-4.mp3", "三つ目のリスク保有は、対策をとらずに受け入れることです。"),
  N("s03-5.mp3", "四つ目のリスク低減は、対策で被害を小さくすることです。"),
];

const SEG_POLES = [
  N("s04-1.mp3", "まずは、両極にある回避と保有を並べて見てみましょう。"),
  N("s04-2.mp3", "リスク回避は、原因になっている活動そのものをやめる判断です。"),
  N("s04-3.mp3", "危険は消えますが、得られたはずの利益も一緒に手放します。"),
  N("s04-4.mp3", "リスク保有は、対策をとらずにそのまま受け入れる判断です。"),
  N("s04-5.mp3", "小さなリスクまで潰すとコスト倒れになるので、あえて選ぶ積極的な判断です。"),
];

const SEG_SHARE = [
  N("s05-1.mp3", "次は、リスクを他者と分け合うリスク共有です。"),
  N("s05-2.mp3", "保険をかけたり、業務を外部に委託したりするのがリスク移転です。"),
  N("s05-3.mp3", "拠点やデータを複数に分けて、同時にやられないようにするのがリスク分散です。"),
  N("s05-4.mp3", "どちらも、自分だけで背負わない形に組み替える対応です。"),
];

const SEG_REDUCE = [
  N("s06-1.mp3", "四つの中で、実務でもっとも多く選ばれるのがリスク低減です。"),
  N("s06-2.mp3", "対策によって、事故の起こりやすさや、起きたときの影響を小さくします。"),
  N("s06-3.mp3", "バックアップや暗号化、社員教育といった具体的な対策が、ここに入ります。"),
];

const SEG_AXIS = [
  N("s07-1.mp3", "四つの分類を、別の切り口でも整理しておきましょう。"),
  N("s07-2.mp3", "損失そのものを抑えるやり方が、リスクコントロールです。"),
  N("s07-3.mp3", "回避、低減、そして拠点を分ける分散が、ここに入ります。"),
  N("s07-4.mp3", "お金で備えるやり方が、リスクファイナンシングです。"),
  N("s07-5.mp3", "保険による移転や、自分で負担する保有が、ここに入ります。"),
  N("s07-6.mp3", "サイバー保険のように、損失に備えて手を打っておくことをリスクヘッジと呼びます。"),
];

const SEG_CASE = [
  N("s08-1.mp3", "一つのリスクにあてはめると、四つの違いがはっきりします。"),
  N("s08-2.mp3", "営業がノートPCを持ち出して、顧客名簿が漏れるリスクで考えます。"),
  N("s08-3.mp3", "持ち出しを禁止すれば回避、保険をかければ共有、暗号化すれば低減です。"),
  N("s08-4.mp3", "影響が小さいと判断してそのままにするなら、それが保有です。"),
];

const SEG_RESIDUAL = [
  N("s09-1.mp3", "どの対応を選んでも、リスクがゼロになることはありません。"),
  N("s09-2.mp3", "対応をとったあとに残る分を、残留リスクといいます。"),
  N("s09-3.mp3", "残留リスクが受け入れられる大きさかを、リスク基準に照らして確かめます。"),
  N("s09-4.mp3", "そのうえで保有として引き受け、定期的に見直していきます。"),
];

const SEG_MAP = [
  N("s10-1.mp3", "最後に、リスク対応のまわりの言葉を、まとめて押さえます。"),
  N("s10-2.mp3", "似たリスクをまとめて一つの対応で扱うのが、リスク集約です。"),
  N("s10-3.mp3", "だれが、いつまでに、何をするかを決めるのが、リスク対応計画です。"),
  N("s10-4.mp3", "リスクと対応の状況を記録する一覧が、リスク登録簿です。"),
  N("s10-5.mp3", "関係者と情報を共有して認識を合わせるのが、リスクコミュニケーションです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "情報漏えいに備えてサイバー保険に加入するのは、どの対応でしょうか。"),
  N("s12-3.mp3", "正解は、リスク共有です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "リスク保有を選ぶのが適切なのは、どんなときでしょうか。"),
  N("s13-3.mp3", "正解は、損失が小さく、対策の費用のほうが高くつくときです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "対応をとってもなお残るリスクを、何と呼ぶでしょうか。"),
  N("s14-3.mp3", "正解は、残留リスクです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s15-1.mp3", "リスク対応は、回避、共有、保有、低減の四つから選びます。"),
  N("s15-2.mp3", "損失を抑えるコントロールと、お金で備えるファイナンシングで整理できます。"),
  N("s15-3.mp3", "残った分は残留リスクとして引き受け、見直しを続けます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

const ClassChip: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      color: colors.primary800,
      backgroundColor: colors.primary100,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      lineHeight: 1.4,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

const NoteChip: React.FC<{ icon: string; text: React.ReactNode; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const chip = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${6 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        color: colors.primary800,
        fontSize: 10 * SCALE,
        fontWeight: 800,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      {text}
    </span>
  );
};

const IconBadge: React.FC<{ icon: string; size: number; iconSize: number }> = ({
  icon,
  size,
  iconSize,
}) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.34,
      backgroundColor: colors.primary50,
      color: colors.primary600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
    }}
  >
    <Ms name={icon} size={iconSize} />
  </span>
);

// ---------------------------------------------------------------------------
// P2: 導入 — 左テキスト + 右イラスト（測り終えた次にやること）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const leadAppear = useAppear(segStart(SEG_INTRO, 1));
  const subAppear = useAppear(segStart(SEG_INTRO, 2));
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.15,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 9 * SCALE,
          }}
        >
          <span style={{ ...chipAppear }}>
            <ClassChip text="前回：測って順位を付けた" />
          </span>
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.45,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"次は\n"}
            <span style={markerStyle}>どう手を打つか</span>
            {"を決める"}
          </span>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.5,
              ...subAppear,
            }}
          >
            思いつきで選ばず、四つの型から選ぶ
          </span>
          <NoteChip
            icon="balance"
            text="費用と効果を見比べた経営の判断"
            atSec={segStart(SEG_INTRO, 3)}
          />
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-leader-idea.png")}
          style={{
            flex: 1,
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
// P3: ★4分類の顔見せ — 横4列（囲みなし。動詞を先に置き、用語を語りに合わせて出す）
// ---------------------------------------------------------------------------

const TypeColumn: React.FC<{
  icon: string;
  verb: string;
  word: string;
  verbAtSec: number;
  wordAtSec: number;
}> = ({ icon, verb, word, verbAtSec, wordAtSec }) => {
  const head = useAppear(verbAtSec, { dy: 12 });
  const term = usePop(wordAtSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6 * SCALE,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5 * SCALE,
          ...head,
        }}
      >
        <IconBadge icon={icon} size={34 * SCALE} iconSize={20 * SCALE} />
        <b
          style={{
            fontSize: 14 * SCALE,
            fontWeight: 800,
            color: colors.primary800,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {verb}
        </b>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1 * SCALE,
          ...term,
        }}
      >
        <span
          style={{
            fontSize: 10 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            lineHeight: 1.2,
          }}
        >
          リスク
        </span>
        <b style={{ fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
          <span style={markerStyle}>{word}</span>
        </b>
      </div>
    </div>
  );
};

const FourTypesScene: React.FC = () => (
  <SlideShell
    heading="手の打ち方は四つ"
    icon={<Ms name="alt_route" size={videoType.slideHeadIcon} />}
    narration={SEG_FOUR}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10 * SCALE,
      }}
    >
      <TypeColumn
        icon="cancel"
        verb="やめる"
        word="回避"
        verbAtSec={0.35}
        wordAtSec={segStart(SEG_FOUR, 1)}
      />
      <TypeColumn
        icon="handshake"
        verb="分け合う"
        word="共有"
        verbAtSec={0.55}
        wordAtSec={segStart(SEG_FOUR, 2)}
      />
      <TypeColumn
        icon="check_circle"
        verb="受け入れる"
        word="保有"
        verbAtSec={0.75}
        wordAtSec={segStart(SEG_FOUR, 3)}
      />
      <TypeColumn
        icon="shield"
        verb="小さくする"
        word="低減"
        verbAtSec={0.95}
        wordAtSec={segStart(SEG_FOUR, 4)}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P5: リスク共有の2つの形 — 用語見出し + 横長2行（移転・分散）
// ---------------------------------------------------------------------------

const ShareRow: React.FC<{
  icon: string;
  chip: string;
  term: string;
  desc: string;
  atSec: number;
  descAtSec: number;
}> = ({ icon, chip, term, desc, atSec, descAtSec }) => {
  const row = useAppear(atSec);
  const descAppear = useAppear(descAtSec, { dy: 8 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 * SCALE, ...row }}>
      <IconBadge icon={icon} size={40 * SCALE} iconSize={23 * SCALE} />
      <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3 * SCALE }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
          <ClassChip text={chip} />
          <b style={{ fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
            <span style={markerStyle}>{term}</span>
          </b>
        </span>
        <span
          style={{
            fontSize: 11 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.35,
            ...descAppear,
          }}
        >
          {desc}
        </span>
      </span>
    </div>
  );
};

const ShareScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  return (
    <SlideShell
      heading="リスクを他者と分け合う"
      icon={<Ms name="handshake" size={videoType.slideHeadIcon} />}
      narration={SEG_SHARE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 14 * SCALE,
        }}
      >
        <span style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.3, ...leadAppear }}>
          <span style={markerStyle}>リスク共有</span>には、二つの形がある
        </span>
        <ShareRow
          icon="swap_horiz"
          chip="他者に移す"
          term="リスク移転"
          desc="保険をかける・業務を外部に委託する"
          atSec={segStart(SEG_SHARE, 1)}
          descAtSec={segStart(SEG_SHARE, 1) + 0.6}
        />
        <ShareRow
          icon="call_split"
          chip="複数に分ける"
          term="リスク分散"
          desc="拠点やデータを分けて、同時にやられないようにする"
          atSec={segStart(SEG_SHARE, 2)}
          descAtSec={segStart(SEG_SHARE, 2) + 0.6}
        />
        <NoteChip
          icon="groups"
          text="自分だけで背負わない形に組み替える"
          atSec={segStart(SEG_SHARE, 3)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: リスク低減 — 左キーワード見出し + 右2カード + 下に対策チップ列（見出しなし）
// ---------------------------------------------------------------------------

const ReduceCard: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11 * SCALE,
        padding: `${10 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...card,
      }}
    >
      <IconBadge icon={icon} size={34 * SCALE} iconSize={20 * SCALE} />
      <b style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>{text}</b>
    </div>
  );
};

const MeasureChip: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const chip = usePop(atSec);
  return (
    <span
      style={{
        padding: `${4 * SCALE}px ${12 * SCALE}px`,
        borderRadius: 999,
        backgroundColor: colors.primary600,
        color: colors.textPrimaryDark,
        fontSize: 11 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      {label}
    </span>
  );
};

const ReduceScene: React.FC = () => {
  const chipAppear = useAppear(0.3, { dy: 10 });
  const termAppear = useAppear(0.45);
  const cardBase = segStart(SEG_REDUCE, 1);
  const chipBase = segStart(SEG_REDUCE, 2);
  const railAppear = useAppear(chipBase, { dy: 8 });
  return (
    <SlideShell narration={SEG_REDUCE}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5%" }}>
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
            <span style={{ ...chipAppear }}>
              <ClassChip text="実務でもっとも多く選ばれる" />
            </span>
            <b
              style={{
                fontSize: 30 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                ...termAppear,
              }}
            >
              <span style={markerStyle}>リスク低減</span>
            </b>
          </div>
          <div
            style={{
              flex: 1.1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 9 * SCALE,
            }}
          >
            {/* カード内は1行に収まる長さで書く（折り返すと2枚のカードで高さが揺れる） */}
            <ReduceCard icon="gpp_maybe" text="起こりやすさを下げる" atSec={cardBase} />
            <ReduceCard icon="trending_down" text="影響を小さくする" atSec={cardBase + 0.5} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE }}>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              ...railAppear,
            }}
          >
            具体的な対策
          </span>
          <MeasureChip label="バックアップ" atSec={chipBase + 0.2} />
          <MeasureChip label="暗号化" atSec={chipBase + 0.5} />
          <MeasureChip label="社員教育" atSec={chipBase + 0.8} />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: もう一つの切り口 — リスクコントロール／リスクファイナンシングの振り分け
// ---------------------------------------------------------------------------

const AxisChip: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const chip = usePop(atSec);
  return (
    <span
      style={{
        padding: `${3 * SCALE}px ${11 * SCALE}px`,
        borderRadius: 999,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.primary300}`,
        color: colors.primary800,
        fontSize: 11.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      {label}
    </span>
  );
};

const AxisPanel: React.FC<{
  icon: string;
  term: string;
  sub: string;
  chips: string[];
  atSec: number;
  chipAtSec: number;
}> = ({ icon, term, sub, chips, atSec, chipAtSec }) => {
  const panel = useAppear(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // 縦に4段（アイコン・用語・補足・チップ）積むので、padding と gap を詰めないと
        // 本文が見出しに重なり、下のチップが字幕帯に潜り込む（stills で実際に起きた）
        gap: 4 * SCALE,
        padding: `${7 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        ...panel,
      }}
    >
      <IconBadge icon={icon} size={24 * SCALE} iconSize={15 * SCALE} />
      <b style={{ fontSize: 14.5 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
        <span style={markerStyle}>{term}</span>
      </b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.25,
        }}
      >
        {sub}
      </span>
      <div style={{ display: "flex", gap: 7 * SCALE }}>
        {chips.map((c, i) => (
          <AxisChip key={c} label={c} atSec={chipAtSec + i * 0.3} />
        ))}
      </div>
    </div>
  );
};

const AxisScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  return (
    <SlideShell
      heading="もう一つの切り口"
      icon={<Ms name="category" size={videoType.slideHeadIcon} />}
      narration={SEG_AXIS}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6 * SCALE,
        }}
      >
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...leadAppear }}>
          四つを<span style={markerStyle}>何で抑えるか</span>で分け直す
        </span>
        <div style={{ display: "flex", alignSelf: "stretch", gap: 12 * SCALE }}>
          <AxisPanel
            icon="shield"
            term="リスクコントロール"
            sub="損失そのものを抑える"
            chips={["回避", "低減", "分散"]}
            atSec={segStart(SEG_AXIS, 1)}
            chipAtSec={segStart(SEG_AXIS, 2)}
          />
          <AxisPanel
            icon="payments"
            term="リスクファイナンシング"
            sub="お金で備える"
            chips={["移転（保険）", "保有"]}
            atSec={segStart(SEG_AXIS, 3)}
            chipAtSec={segStart(SEG_AXIS, 4)}
          />
        </div>
        <NoteChip
          icon="savings"
          text={
            <span>
              損失に備えて手を打つこと＝<span style={markerPinkStyle}>リスクヘッジ</span>
            </span>
          }
          atSec={segStart(SEG_AXIS, 5)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 【抽象→具体】1つのリスクに4つの打ち手 — リスク帯 + 2×2の打ち手カード
// ---------------------------------------------------------------------------

const ActionCard: React.FC<{ term: string; action: string; atSec: number }> = ({
  term,
  action,
  atSec,
}) => {
  // 用語だけ先に出して打ち手を後から入れると、数秒間「半分空のカード」が4枚並んで
  // 未完成の画面に見える（stills の出現前フレームで確認）。カードごと語りに合わせて出す
  const card = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: 3 * SCALE,
        padding: `${7 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...card,
      }}
    >
      {/* 用語と打ち手を横並びにすると打ち手が2行に折り返すので縦積みにしている */}
      <b
        style={{
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {term}
      </b>
      <span
        style={{
          fontSize: 14 * SCALE,
          fontWeight: 800,
          lineHeight: 1.25,
          whiteSpace: "nowrap",
        }}
      >
        {action}
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => {
  // 題材のリスク（このページの前提）を先に出す。打ち手は語りの順に1枚ずつ
  const bandAppear = useAppear(0.4);
  const base = segStart(SEG_CASE, 2);
  return (
    <SlideShell
      heading="一つのリスクで比べる"
      icon={<Ms name="compare_arrows" size={videoType.slideHeadIcon} />}
      narration={SEG_CASE}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10 * SCALE,
            padding: `${8 * SCALE}px ${14 * SCALE}px`,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
            borderRadius: 13 * SCALE,
            ...bandAppear,
          }}
        >
          <span style={{ color: colors.accentPinkText, display: "flex", flex: "none" }}>
            <Ms name="laptop_mac" size={20 * SCALE} />
          </span>
          <b
            style={{
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              lineHeight: 1.3,
            }}
          >
            営業がノートPCを持ち出し、顧客名簿が漏れる
          </b>
        </div>
        <div style={{ display: "flex", gap: 11 * SCALE }}>
          <ActionCard term="リスク回避" action="持ち出しを禁止する" atSec={base} />
          <ActionCard term="リスク共有" action="サイバー保険に入る" atSec={base + 0.9} />
        </div>
        <div style={{ display: "flex", gap: 11 * SCALE }}>
          <ActionCard term="リスク低減" action="ディスクを暗号化する" atSec={base + 1.8} />
          <ActionCard
            term="リスク保有"
            action="影響が小さいのでそのまま"
            atSec={segStart(SEG_CASE, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 残留リスク — 対応前後の横バー（減った分 + 残る分）
// ---------------------------------------------------------------------------

/** 対応後に残る割合（対応前のバー全体を1とする）。帯はこの幅まで縮む */
const RESIDUAL_RATIO = 0.34;

const ResidualScene: React.FC = () => {
  const beforeAppear = useAppear(0.3, { dy: 8 });
  const afterAppear = useAppear(0.55, { dy: 8 });
  // 対応で小さくなる様子: 帯が全幅から残留リスクぶんの幅まで縮む（幅を進捗で動かす）
  const shrink = useProgress(0.9, 1.0);
  const afterWidth = 100 - (1 - RESIDUAL_RATIO) * 100 * shrink;
  const labelAppear = useAppear(segStart(SEG_RESIDUAL, 1), { dy: 8 });
  return (
    <SlideShell
      heading="リスクはゼロにはならない"
      icon={<Ms name="gpp_maybe" size={videoType.slideHeadIcon} />}
      narration={SEG_RESIDUAL}
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
        <div style={{ display: "flex", flexDirection: "column", gap: 4 * SCALE, ...beforeAppear }}>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.2,
            }}
          >
            対応前のリスクの大きさ
          </span>
          <span
            style={{
              height: 14 * SCALE,
              borderRadius: 999,
              backgroundColor: colors.primary100,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 * SCALE, ...afterAppear }}>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.2,
            }}
          >
            回避・共有・低減で手を打ったあと
          </span>
          {/* 対応前の幅から残留分まで縮む1本の帯。残ったものがそのまま残留リスク */}
          <span
            style={{
              width: `${afterWidth}%`,
              height: 14 * SCALE,
              borderRadius: 999,
              backgroundColor: colors.accentPinkSoft,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10 * SCALE,
            ...labelAppear,
          }}
        >
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.2,
            }}
          >
            残った分 ＝
          </span>
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
            <span style={markerPinkStyle}>残留リスク</span>
          </b>
        </div>
        {/* チップは横1列で 1690px に収まる文言にする（長いと2つ目が右にはみ出す） */}
        <div style={{ display: "flex", gap: 9 * SCALE }}>
          <NoteChip
            icon="fact_check"
            text="リスク基準に照らして確かめる"
            atSec={segStart(SEG_RESIDUAL, 2)}
          />
          <NoteChip
            icon="autorenew"
            text="保有として引き受け、定期的に見直す"
            atSec={segStart(SEG_RESIDUAL, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 関連用語の地図 — 左4行リスト + 右イラスト
// ---------------------------------------------------------------------------

const MapRow: React.FC<{ icon: string; term: string; desc: string; atSec: number }> = ({
  icon,
  term,
  desc,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 10 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE, ...row }}>
      <IconBadge icon={icon} size={30 * SCALE} iconSize={18 * SCALE} />
      <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 1 * SCALE }}>
        <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
          <span style={markerStyle}>{term}</span>
        </b>
        <span
          style={{
            fontSize: 10.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {desc}
        </span>
      </span>
    </div>
  );
};

const TermMapScene: React.FC = () => {
  const illustAppear = useAppear(0.4);
  return (
    <SlideShell
      heading="リスク対応のまわりの言葉"
      icon={<Ms name="menu_book" size={videoType.slideHeadIcon} />}
      narration={SEG_MAP}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          gap: "4%",
        }}
      >
        <div
          style={{
            flex: 1.55,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10 * SCALE,
          }}
        >
          <MapRow
            icon="merge"
            term="リスク集約"
            desc="似たリスクをまとめて一つの対応で扱う"
            atSec={segStart(SEG_MAP, 1)}
          />
          <MapRow
            icon="checklist"
            term="リスク対応計画"
            desc="だれが、いつまでに、何をするかを決める"
            atSec={segStart(SEG_MAP, 2)}
          />
          <MapRow
            icon="table_chart"
            term="リスク登録簿"
            desc="リスクと対応の状況を記録する一覧"
            atSec={segStart(SEG_MAP, 3)}
          />
          <MapRow
            icon="forum"
            term="リスクコミュニケーション"
            desc="関係者と情報を共有して認識を合わせる"
            atSec={segStart(SEG_MAP, 4)}
          />
        </div>
        <Img
          src={staticFile("images/ipa_sg/prop-ledger.png")}
          style={{
            flex: 1,
            minWidth: 0,
            maxHeight: "100%",
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

export const SgL25RiskTreatment: VideoSpec = {
  id: "sg-L25-risk-treatment",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "測ったリスクに\nどう手を打つか",
      keywords: ["リスク低減", "リスク共有", "残留リスク"],
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
      name: "four-types",
      durationSec: 7,
      narration: SEG_FOUR,
      component: FourTypesScene,
    },
    {
      pattern: "vs",
      heading: "両極にある二つの判断",
      icon: "compare_arrows",
      left: {
        title: "リスク回避",
        icon: "cancel",
        rows: [
          { k: "打ち手", v: "原因ごとやめる" },
          { k: "選ぶ場面", v: "損失が大きすぎるとき" },
          { k: "代償", v: "得られたはずの利益も失う" },
        ],
      },
      right: {
        title: "リスク保有",
        icon: "check_circle",
        rows: [
          { k: "打ち手", v: "対策せず受け入れる" },
          { k: "選ぶ場面", v: "損失が小さいとき" },
          { k: "代償", v: "起きたら自分で負担する" },
        ],
      },
      columnAtSec: [segStart(SEG_POLES, 1), segStart(SEG_POLES, 3)],
      narration: SEG_POLES,
    },
    {
      pattern: "custom",
      name: "share",
      durationSec: 6,
      narration: SEG_SHARE,
      component: ShareScene,
    },
    {
      pattern: "custom",
      name: "reduce",
      durationSec: 6,
      narration: SEG_REDUCE,
      component: ReduceScene,
    },
    {
      pattern: "custom",
      name: "control-financing",
      durationSec: 8,
      narration: SEG_AXIS,
      transitionIn: "wipe-light",
      component: AxisScene,
    },
    {
      pattern: "custom",
      name: "case-notepc",
      durationSec: 7,
      narration: SEG_CASE,
      component: CaseScene,
    },
    {
      pattern: "custom",
      name: "residual",
      durationSec: 7,
      narration: SEG_RESIDUAL,
      component: ResidualScene,
    },
    {
      pattern: "custom",
      name: "term-map",
      durationSec: 7,
      narration: SEG_MAP,
      component: TermMapScene,
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
      question: "サイバー保険への加入は？",
      choices: [
        { key: "A", text: "リスク回避" },
        { key: "B", text: "リスク共有", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "リスク保有が適切なのは？",
      choices: [
        { key: "A", text: "損失が小さく対策費が高い", correct: true },
        { key: "B", text: "発生する可能性がないとき" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "対応後も残るリスクは？",
      choices: [
        { key: "A", text: "リスク集約" },
        { key: "B", text: "残留リスク", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "対応は回避・共有・保有・低減の四つ。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "損失を抑えるか、お金で備えるかで整理。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "残った分は残留リスクとして引き受ける。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
