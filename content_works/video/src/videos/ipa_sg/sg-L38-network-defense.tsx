import { Img, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { OUTRO_SEG, QUIZ_INTRO_SEG } from "../../parts/common-narration";
import { ArrowMarker, DrawPath } from "../../parts/draw";
import { Ms } from "../../parts/Ms";
import { narrationLoader, segStart } from "../../parts/narration";
import { SectionTitle } from "../../parts/SectionTitle";
import { SlideShell } from "../../parts/SlideShell";
import type { VideoSpec } from "../types";
import durations from "./sg-L38-network-defense.audio.json";

/**
 * sg-L38 ネットワーク防御の仕組み
 * 発注書: content_works/ipa_sg/orders/L38.md
 * シナリオ: narration/ipa_sg/sg-L38-network-defense.md
 *
 * 音声側だけ仮名書きにした語（字幕は英字のまま）: DMZ・IDS・IPS・URL。
 * いずれも1字ずつ読む略語なので、字幕には読みを添えていない（jobs.json 側が音声用テキスト）。
 *
 * 「通す／通ります」も音声側だけ仮名（とおす／とおります）にしてある（v2）。
 * v1 は s06-2「公開しているので通します」が「つうします」と音読みされて差し戻された。
 * 対象は s04-1・s05-2・s06-2・s15-1 の4本で、字幕・画面テキストは漢字のまま。
 * 「通信」は音読みで正しく読まれるので触っていない。
 */
const N = narrationLoader(durations, "audio/ipa_sg/sg-L38-network-defense");

const SEG_INTRO = [
  N("s02-1.mp3", "会社のパソコンは、いつもインターネットとつながっています。"),
  N("s02-2.mp3", "便利な反面、その一本の道は、攻撃者にとっての入口でもあります。"),
  N("s02-3.mp3", "そこで、社内と外との境目に関所を置いて、通信を見張ります。"),
];

const SEG_PACKET = [
  N("s03-1.mp3", "通信は、パケットと呼ばれる小さな荷物に分かれて流れています。"),
  N("s03-2.mp3", "一つ一つのパケットには、荷札のような情報が付いています。"),
  N("s03-3.mp3", "どこへ届けるかを示す宛先と、どこから来たかを示す送信元。"),
  N("s03-4.mp3", "そして、どのサービス宛かを示すポート番号です。"),
];

const SEG_BOUNDARY = [
  N("s04-1.mp3", "社内と外をやり取りするパケットは、必ず境界の一点を通ります。"),
  N("s04-2.mp3", "だからそこに関所を置けば、すべての通信を確かめられます。"),
  N("s04-3.mp3", "アドレスやポート番号そのものの仕組みは、後のネットワークの章で学びます。"),
];

const SEG_FW = [
  N("s05-1.mp3", "境界に置く関所が、ファイアウォールです。"),
  N("s05-2.mp3", "防火壁という名のとおり、決めたルールでパケットを通すか止めるかを判定します。"),
  N("s05-3.mp3", "見るのは荷札だけ。宛先や送信元、ポート番号で機械的に振り分けます。"),
  N("s05-4.mp3", "この方式を、パケットフィルタリングといいます。"),
];

const SEG_RULES = [
  N("s06-1.mp3", "実際のルールを見てみましょう。"),
  N("s06-2.mp3", "外から社内のウェブサーバへの通信は、公開しているので通します。"),
  N("s06-3.mp3", "外から社内のファイル共有への通信は、必要がないので止めます。"),
  N("s06-4.mp3", "ルールに無い通信は、原則としてすべて止めるのが基本です。"),
];

const SEG_DMZ = [
  N("s07-1.mp3", "困るのが、外に公開するサーバの置き場所です。"),
  N("s07-2.mp3", "ウェブサーバやメールサーバは、外から使ってもらう必要があります。"),
  N("s07-3.mp3", "でも社内ネットワークに置くと、外の通信を社内まで引き入れてしまいます。"),
  N("s07-4.mp3", "そこで、社内でも外でもない緩衝地帯を作り、公開サーバだけをそこに置きます。"),
  N("s07-5.mp3", "この区画が、DMZです。"),
];

const SEG_DMZ_CASE = [
  N("s08-1.mp3", "DMZが効くのは、公開サーバが乗っ取られたときです。"),
  N("s08-2.mp3", "攻撃者がウェブサーバを乗っ取り、次に社内を狙ったとします。"),
  N("s08-3.mp3", "しかし、DMZから社内への通信も、ファイアウォールが止めています。"),
  N("s08-4.mp3", "被害を公開サーバだけに閉じ込める。これが、分けて置く理由です。"),
];

const SEG_IDS = [
  N("s09-1.mp3", "ルールをすり抜ける、怪しい通信もあります。"),
  N("s09-2.mp3", "通信を見張り、異常に気づいたら管理者に知らせるのがIDSです。"),
  N("s09-3.mp3", "日本語では、侵入検知システムといいます。"),
  N("s09-4.mp3", "その場で通信を遮断までするのがIPS、侵入防止システムです。"),
  // 字幕帯の1行（全角30字強）に収めるため、s09-5 は短い言い回しに直して音声も作り直した
  N("s09-5.mp3", "検知のIDSと、防止のIPS。この一字が大きな違いです。"),
];

const SEG_FILTER = [
  N("s10-1.mp3", "守るのは、外から中への通信だけではありません。"),
  N("s10-2.mp3", "社内から外へ出ていく通信も、同じように制御します。"),
  N("s10-3.mp3", "行き先のアドレスを見て、危険なサイトを止めるのがURLフィルタリングです。"),
  N("s10-4.mp3", "通信の中身を見て判断するのが、コンテンツフィルタリングです。"),
  N("s10-5.mp3", "行き先で見るか、中身で見るか。見ている場所が違います。"),
];

const SEG_Q1 = [
  N("s12-1.mp3", "一問目です。ファイアウォールが見ているのは、どちらでしょうか。"),
  N("s12-2.mp3", "正解は、宛先や送信元、ポート番号です。", { gapBeforeSec: 1.8 }),
  N("s12-3.mp3", "荷札の情報だけを見て、機械的に振り分けていましたね。"),
];

const SEG_Q2 = [
  N("s13-1.mp3", "二問目です。DMZに置くのは、どちらのサーバでしょうか。"),
  N("s13-2.mp3", "正解は、外に公開するウェブサーバです。", { gapBeforeSec: 1.8 }),
  N("s13-3.mp3", "社内だけで使うサーバは、社内ネットワークに置いたままにします。"),
];

const SEG_Q3 = [
  N("s14-1.mp3", "三問目です。怪しい通信をその場で遮断するのは、どちらでしょうか。"),
  N("s14-2.mp3", "正解は、IPS、侵入防止システムです。", { gapBeforeSec: 1.8 }),
  N("s14-3.mp3", "IDSは、気づいて知らせるところまででしたね。"),
];

const SEG_SUM = [
  N("s15-1.mp3", "今回のまとめです。ファイアウォールは、荷札のルールで通すか止めるかを決めます。"),
  N("s15-2.mp3", "DMZは公開サーバを分けて置き、被害を社内まで広げません。"),
  N("s15-3.mp3", "IDSは気づいて知らせ、IPSはその場で止めます。"),
  N("s15-4.mp3", "そして、中から外への通信は、フィルタリングで見張ります。"),
  OUTRO_SEG,
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/**
 * 横向きの矢印ストリップ。
 * viewBox を px と 1:1（width×height）にして「幅に合わせて縮む」事故を防ぐ
 * （幅可変の入れ物に入れると preserveAspectRatio=meet で短いスタブになる）。
 * 矢じりは size6 × strokeWidth6 = 36単位なので、線のy ± 18 が viewBox に収まる高さを取る。
 */
const ArrowStrip: React.FC<{
  id: string;
  atSec: number;
  color?: string;
  width?: number;
  height?: number;
}> = ({ id, atSec, color = colors.primary500, width = 56 * SCALE, height = 14 * SCALE }) => (
  <svg viewBox={`0 0 ${width} ${height}`} style={{ width, height, flex: "none" }}>
    <ArrowMarker id={id} color={color} />
    <DrawPath
      d={`M${Math.round(width * 0.04)} ${height / 2} L${Math.round(width * 0.86)} ${height / 2}`}
      delaySec={atSec}
      durSec={0.6}
      stroke={color}
      strokeWidth={6}
      markerEnd={`url(#${id})`}
    />
  </svg>
);

/** ネットワーク上の区画・機器を表すブロック（アイコン + ラベル）。幅は中身に合わせる */
const NodeBox: React.FC<{
  icon: string;
  label: string;
  sub?: string;
  atSec: number;
  tone?: "normal" | "pink";
}> = ({ icon, label, sub, atSec, tone = "normal" }) => {
  const pop = usePop(atSec);
  const accent = tone === "pink" ? colors.accentPinkText : colors.primary600;
  const face = tone === "pink" ? colors.accentPinkSurface : colors.primary50;
  return (
    <div
      style={{
        flex: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        ...pop,
      }}
    >
      <span
        style={{
          width: 28 * SCALE,
          height: 28 * SCALE,
          borderRadius: 11 * SCALE,
          backgroundColor: face,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={16 * SCALE} />
      </span>
      <b style={{ fontSize: 11.5 * SCALE, lineHeight: 1.25, whiteSpace: "nowrap" }}>{label}</b>
      {sub ? (
        <span
          style={{
            fontSize: 9.5 * SCALE,
            color: colors.textSecondary,
            lineHeight: 1.25,
            whiteSpace: "nowrap",
          }}
        >
          {sub}
        </span>
      ) : null}
    </div>
  );
};

/** ファイアウォール（境界の壁）を表す縦の帯 */
const WallBar: React.FC<{ atSec: number; label?: string; height?: number }> = ({
  atSec,
  label = "FW",
  height = 42 * SCALE,
}) => {
  const a = useAppear(atSec, { dy: 0 });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
        flex: "none",
        ...a,
      }}
    >
      <span
        style={{
          width: 5 * SCALE,
          height,
          borderRadius: 3 * SCALE,
          backgroundColor: colors.primary600,
        }}
      />
      <span style={{ fontSize: 9 * SCALE, fontWeight: 800, color: colors.primary600 }}>{label}</span>
    </div>
  );
};

/** 分類チップ */
const Chip: React.FC<{ text: string; tone?: "blue" | "pink" }> = ({ text, tone = "blue" }) => (
  <span
    style={{
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      color: tone === "pink" ? colors.accentPinkText : colors.primary800,
      backgroundColor: tone === "pink" ? colors.accentPinkSurface : colors.primary100,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      lineHeight: 1.3,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

// ---------------------------------------------------------------------------
// 2. 導入 — 外とつながる一本の道
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const attacker = useAppear(segStart(SEG_INTRO, 1));
  const gate = usePop(segStart(SEG_INTRO, 2));
  return (
    <SlideShell
      heading="社内と外は、一本の道でつながっている"
      icon={<Ms name="public" size={videoType.slideHeadIcon} />}
      narration={SEG_INTRO}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        {/* 上段: 攻撃者（2文目で出る） */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6 * SCALE,
            height: 32 * SCALE,
            ...attacker,
          }}
        >
          <Img
            src={staticFile("images/ipa_sg/person-attacker.png")}
            style={{ height: "100%", objectFit: "contain", mixBlendMode: "multiply" }}
          />
          <Chip text="その道は、攻撃者の入口にもなる" tone="pink" />
        </div>

        {/* 下段: 社内 — 関所 — インターネット */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5 * SCALE,
          }}
        >
          <NodeBox icon="apartment" label="社内" sub="パソコン・サーバ" atSec={0.3} />
          <ArrowStrip id="l38-intro-a" atSec={0.6} />
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              ...gate,
            }}
          >
            <span
              style={{
                width: 26 * SCALE,
                height: 26 * SCALE,
                borderRadius: 10 * SCALE,
                backgroundColor: colors.primary600,
                color: colors.surface,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ms name="security" size={15 * SCALE} />
            </span>
            <b style={{ fontSize: 12 * SCALE, color: colors.primary800, whiteSpace: "nowrap" }}>
              関所
            </b>
          </div>
          <ArrowStrip id="l38-intro-b" atSec={0.6} />
          <NodeBox icon="language" label="インターネット" sub="外の世界" atSec={0.3} />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 3. パケットの荷札
// ---------------------------------------------------------------------------

const TagRow: React.FC<{ label: string; value: string; atSec: number }> = ({
  label,
  value,
  atSec,
}) => {
  const on = useProgress(atSec, 0.4);
  const a = useAppear(0.5);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${4 * SCALE}px ${9 * SCALE}px`,
        borderRadius: 8 * SCALE,
        backgroundColor: colors.bg,
        ...a,
        opacity: a.opacity * (0.4 + 0.6 * on),
      }}
    >
      <b
        style={{
          fontSize: 12 * SCALE,
          color: colors.primary800,
          width: 62 * SCALE,
          flex: "none",
          lineHeight: 1.3,
        }}
      >
        {label}
      </b>
      <span style={{ fontSize: 12 * SCALE, fontWeight: 700, lineHeight: 1.3 }}>{value}</span>
    </div>
  );
};

const PacketScene: React.FC = () => {
  const lead = useAppear(0.2);
  const card = useAppear(0.4);
  return (
    <SlideShell
      heading="通信は「荷札の付いた小包」で流れる"
      icon={<Ms name="inventory_2" size={videoType.slideHeadIcon} />}
      narration={SEG_PACKET}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6 * SCALE,
        }}
      >
        <b style={{ fontSize: 15 * SCALE, ...lead }}>
          通信の小包＝<span style={markerStyle}>パケット</span>
        </b>
        <div
          style={{
            width: "70%",
            backgroundColor: colors.surface,
            border: `${1 * SCALE}px solid ${colors.border}`,
            borderRadius: 12 * SCALE,
            padding: `${7 * SCALE}px ${9 * SCALE}px`,
            display: "flex",
            flexDirection: "column",
            gap: 3 * SCALE,
            ...card,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4 * SCALE,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
            }}
          >
            <Ms name="label" size={12 * SCALE} />
            荷札に書かれていること
          </span>
          <TagRow label="宛先" value="どこへ届けるか" atSec={segStart(SEG_PACKET, 2)} />
          <TagRow label="送信元" value="どこから来たか" atSec={segStart(SEG_PACKET, 2)} />
          <TagRow label="ポート番号" value="どのサービス宛か" atSec={segStart(SEG_PACKET, 3)} />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 4. 出入りは必ず境界の一点を通る
// ---------------------------------------------------------------------------

const PacketChip: React.FC<{ atSec: number }> = ({ atSec }) => {
  const p = usePop(atSec);
  return (
    <span
      style={{
        width: 15 * SCALE,
        height: 12 * SCALE,
        borderRadius: 5 * SCALE,
        backgroundColor: colors.primary100,
        color: colors.primary800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...p,
      }}
    >
      <Ms name="inventory_2" size={8 * SCALE} />
    </span>
  );
};

const BoundaryScene: React.FC = () => {
  const gate = usePop(1.1);
  const claim = useAppear(segStart(SEG_BOUNDARY, 1));
  const note = useAppear(segStart(SEG_BOUNDARY, 2));
  return (
    <SlideShell
      heading="通信は必ず、境界の一点を通る"
      icon={<Ms name="alt_route" size={videoType.slideHeadIcon} />}
      narration={SEG_BOUNDARY}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8 * SCALE,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7 * SCALE,
          }}
        >
          <NodeBox icon="language" label="インターネット" atSec={0.3} />
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              gap: 2 * SCALE,
            }}
          >
            <PacketChip atSec={0.5} />
            <PacketChip atSec={0.65} />
            <PacketChip atSec={0.8} />
          </div>
          <ArrowStrip id="l38-bd-a" atSec={0.9} width={44 * SCALE} />
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              ...gate,
            }}
          >
            <span
              style={{
                width: 28 * SCALE,
                height: 28 * SCALE,
                borderRadius: 11 * SCALE,
                backgroundColor: colors.primary600,
                color: colors.surface,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ms name="security" size={16 * SCALE} />
            </span>
            <b style={{ fontSize: 11.5 * SCALE, color: colors.primary800, whiteSpace: "nowrap" }}>
              境界の関所
            </b>
          </div>
          <ArrowStrip id="l38-bd-b" atSec={1.4} width={44 * SCALE} />
          <NodeBox icon="apartment" label="社内ネットワーク" atSec={0.3} />
        </div>

        <b style={{ fontSize: 15 * SCALE, textAlign: "center", lineHeight: 1.35, ...claim }}>
          関所は一つ。だから<span style={markerStyle}>すべての通信</span>を確かめられる
        </b>
        <span
          style={{
            fontSize: 10 * SCALE,
            color: colors.textMuted,
            textAlign: "center",
            lineHeight: 1.3,
            ...note,
          }}
        >
          ※ アドレスやポート番号そのものの仕組みは、後の章で
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 5. ファイアウォール（キーワード見出し + イラスト）
// ---------------------------------------------------------------------------

const FirewallScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.5);
  const desc = useAppear(segStart(SEG_FW, 1));
  const method = useAppear(segStart(SEG_FW, 3));
  const illust = useAppear(0.6);
  return (
    <SlideShell narration={SEG_FW}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <div
          style={{
            flex: 1.25,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 5 * SCALE,
          }}
        >
          <span style={{ ...chip }}>
            <Chip text="境界に置く関所" />
          </span>
          <b style={{ fontSize: 25 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>ファイアウォール</span>
          </b>
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, lineHeight: 1.5, ...desc }}>
            決めたルールにしたがって、パケットを
            <br />
            通すか止めるかを判定する（＝防火壁）
          </span>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              lineHeight: 1.4,
              ...method,
            }}
          >
            荷札だけを見て振り分ける方式
            <br />
            ＝ パケットフィルタリング
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/tech-firewall.png")}
          style={{
            flex: 0.9,
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
// 6. ルール表（通す／止める）
// ---------------------------------------------------------------------------

const RuleRow: React.FC<{
  text: string;
  reason: string;
  pass: boolean;
  atSec: number;
}> = ({ text, reason, pass, atSec }) => {
  const a = useAppear(atSec);
  const tint = pass ? colors.primary600 : colors.accentPinkText;
  const face = pass ? colors.primary50 : colors.accentPinkSurface;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${5 * SCALE}px ${9 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: colors.surface,
        border: `${1 * SCALE}px solid ${colors.border}`,
        ...a,
      }}
    >
      <span style={{ flex: 1, fontSize: 12.5 * SCALE, fontWeight: 700, lineHeight: 1.3 }}>
        {text}
      </span>
      <span
        style={{
          flex: "none",
          fontSize: 10 * SCALE,
          color: colors.textSecondary,
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {reason}
      </span>
      <span
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          gap: 3 * SCALE,
          padding: `${2.5 * SCALE}px ${8 * SCALE}px`,
          borderRadius: 999,
          backgroundColor: face,
          color: tint,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          whiteSpace: "nowrap",
        }}
      >
        <Ms name={pass ? "check_circle" : "cancel"} size={13 * SCALE} />
        {pass ? "通す" : "止める"}
      </span>
    </div>
  );
};

const RulesScene: React.FC = () => (
  <SlideShell
    heading="ルールで、機械的に振り分ける"
    icon={<Ms name="checklist" size={videoType.slideHeadIcon} />}
    narration={SEG_RULES}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5 * SCALE,
      }}
    >
      <RuleRow
        text="外 → 社内のウェブサーバ"
        reason="公開しているから"
        pass
        atSec={segStart(SEG_RULES, 1)}
      />
      <RuleRow
        text="外 → 社内のファイル共有"
        reason="外に見せる必要がない"
        pass={false}
        atSec={segStart(SEG_RULES, 2)}
      />
      <RuleRow
        text="ルールに無い、その他すべて"
        reason="原則すべて拒否"
        pass={false}
        atSec={segStart(SEG_RULES, 3)}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// 7. DMZ（配置図）
// ---------------------------------------------------------------------------

const DmzScene: React.FC = () => {
  const warn = useAppear(segStart(SEG_DMZ, 2));
  const zone = useAppear(segStart(SEG_DMZ, 3), { dy: 0 });
  const label = usePop(segStart(SEG_DMZ, 4));
  return (
    <SlideShell
      heading="公開サーバは、社内でも外でもない区画へ"
      icon={<Ms name="schema" size={videoType.slideHeadIcon} />}
      narration={SEG_DMZ}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
        }}
      >
        <NodeBox icon="language" label="インターネット" sub="外の世界" atSec={0.3} />
        <WallBar atSec={0.5} />

        {/* 中央スロット: 先に公開サーバ、あとから DMZ の枠（点線）が重なる */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              padding: `${7 * SCALE}px ${12 * SCALE}px`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 12 * SCALE,
                border: `${1.5 * SCALE}px dashed ${colors.primary500}`,
                backgroundColor: colors.primary50,
                ...zone,
              }}
            />
            <span style={{ position: "relative", ...label }}>
              <Chip text="DMZ ＝ 緩衝地帯" />
            </span>
            <span style={{ position: "relative" }}>
              <NodeBox
                icon="dns"
                label="公開サーバ"
                sub="ウェブ・メール"
                atSec={segStart(SEG_DMZ, 1)}
              />
            </span>
          </div>
        </div>

        <WallBar atSec={segStart(SEG_DMZ, 3)} />
        <div
          style={{
            flex: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4 * SCALE,
          }}
        >
          <NodeBox
            icon="apartment"
            label="社内ネットワーク"
            sub="業務用PC・社内データ"
            atSec={0.3}
          />
          <span style={{ ...warn }}>
            <Chip text="社内には置かない" tone="pink" />
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 8. DMZが効く場面（乗っ取られたとき）
// ---------------------------------------------------------------------------

const DmzCaseScene: React.FC = () => {
  const attacker = useAppear(0.3);
  const hacked = useAppear(segStart(SEG_DMZ_CASE, 1) + 0.7);
  const blocked = usePop(segStart(SEG_DMZ_CASE, 2) + 0.7);
  const conclusion = useAppear(segStart(SEG_DMZ_CASE, 3));
  return (
    <SlideShell
      heading="乗っ取られても、社内までは届かない"
      icon={<Ms name="gpp_bad" size={videoType.slideHeadIcon} />}
      narration={SEG_DMZ_CASE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8 * SCALE,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5 * SCALE,
          }}
        >
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              ...attacker,
            }}
          >
            <Img
              src={staticFile("images/ipa_sg/person-attacker.png")}
              style={{ height: 32 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
            />
            <b style={{ fontSize: 11.5 * SCALE, whiteSpace: "nowrap" }}>攻撃者</b>
          </div>
          <ArrowStrip
            id="l38-case-a"
            atSec={segStart(SEG_DMZ_CASE, 1)}
            color={colors.accentPink}
            width={44 * SCALE}
          />
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
            }}
          >
            <NodeBox icon="dns" label="DMZの公開サーバ" atSec={0.3} tone="pink" />
            <span style={{ ...hacked }}>
              <Chip text="乗っ取られた" tone="pink" />
            </span>
          </div>
          <ArrowStrip
            id="l38-case-b"
            atSec={segStart(SEG_DMZ_CASE, 2)}
            color={colors.accentPink}
            width={44 * SCALE}
          />
          <div style={{ flex: "none", position: "relative" }}>
            <WallBar atSec={0.3} height={38 * SCALE} />
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: 8 * SCALE,
                width: 22 * SCALE,
                height: 22 * SCALE,
                borderRadius: 999,
                backgroundColor: colors.surface,
                color: colors.accentPinkText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                translate: "-50% 0",
                ...blocked,
              }}
            >
              <Ms name="cancel" size={19 * SCALE} />
            </span>
          </div>
          <NodeBox icon="apartment" label="社内ネットワーク" sub="ここは無事" atSec={0.3} />
        </div>

        <b style={{ fontSize: 15 * SCALE, textAlign: "center", lineHeight: 1.35, ...conclusion }}>
          被害を<span style={markerStyle}>公開サーバだけ</span>に閉じ込める
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 10. フィルタリング（中から外への通信）
// ---------------------------------------------------------------------------

const FilterCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  point: string;
  atSec: number;
}> = ({ icon, title, desc, point, atSec }) => {
  const a = useAppear(atSec);
  return (
    <div
      style={{
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: colors.surface,
        border: `${1 * SCALE}px solid ${colors.border}`,
        borderRadius: 12 * SCALE,
        padding: `${5 * SCALE}px ${9 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2.5 * SCALE,
        ...a,
      }}
    >
      <span
        style={{
          width: 22 * SCALE,
          height: 22 * SCALE,
          borderRadius: 9 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={13 * SCALE} />
      </span>
      <b style={{ fontSize: 13.5 * SCALE, lineHeight: 1.25 }}>{title}</b>
      <span style={{ fontSize: 10.5 * SCALE, color: colors.textSecondary, lineHeight: 1.4 }}>
        {desc}
      </span>
      <b style={{ fontSize: 12 * SCALE, color: colors.primary800, lineHeight: 1.3 }}>{point}</b>
    </div>
  );
};

const FilteringScene: React.FC = () => {
  const strip = useAppear(0.3);
  return (
    <SlideShell
      heading="中から外へ出ていく通信も止める"
      icon={<Ms name="language" size={videoType.slideHeadIcon} />}
      narration={SEG_FILTER}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6 * SCALE,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6 * SCALE,
            ...strip,
          }}
        >
          <NodeBox icon="laptop_mac" label="社内のPC" atSec={0.4} />
          <ArrowStrip id="l38-filter" atSec={0.7} width={50 * SCALE} />
          <span
            style={{
              flex: "none",
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              backgroundColor: colors.accentPinkSurface,
              borderRadius: 999,
              padding: `${3 * SCALE}px ${9 * SCALE}px`,
              whiteSpace: "nowrap",
            }}
          >
            危険なサイト・不適切な中身
          </span>
        </div>

        <div style={{ display: "flex", gap: 5 * SCALE, alignItems: "stretch" }}>
          <FilterCard
            icon="travel_explore"
            title="URLフィルタリング"
            desc="行き先のアドレスを見て、危険なサイトへのアクセスを止める"
            point="＝ 行き先で見る"
            atSec={segStart(SEG_FILTER, 2)}
          />
          <FilterCard
            icon="search"
            title="コンテンツフィルタリング"
            desc="通信の中身を見て、危ないファイルや不適切な内容かを判断する"
            point="＝ 中身で見る"
            atSec={segStart(SEG_FILTER, 3)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 11. 幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL38NetworkDefense: VideoSpec = {
  id: "sg-L38-network-defense",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "社内と外の境界に\n関所を置く",
      keywords: ["ファイアウォール", "DMZ", "IDS・IPS"],
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
      name: "packet",
      durationSec: 6,
      narration: SEG_PACKET,
      component: PacketScene,
    },
    {
      pattern: "custom",
      name: "boundary",
      durationSec: 6,
      narration: SEG_BOUNDARY,
      component: BoundaryScene,
    },
    {
      pattern: "custom",
      name: "firewall",
      durationSec: 6,
      narration: SEG_FW,
      component: FirewallScene,
    },
    {
      pattern: "custom",
      name: "rules",
      durationSec: 6,
      narration: SEG_RULES,
      component: RulesScene,
    },
    {
      pattern: "custom",
      name: "dmz",
      durationSec: 7,
      narration: SEG_DMZ,
      component: DmzScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "dmz-case",
      durationSec: 6,
      narration: SEG_DMZ_CASE,
      component: DmzCaseScene,
    },
    {
      pattern: "vs",
      heading: "気づくIDSと、止めるIPS",
      icon: "compare_arrows",
      left: {
        title: "IDS（侵入検知システム）",
        icon: "visibility",
        rows: [
          { k: "すること", v: "見張って、異常に気づく" },
          { k: "気づいた後", v: "管理者に知らせる" },
          { k: "怪しい通信", v: "そのまま流れる" },
        ],
      },
      right: {
        title: "IPS（侵入防止システム）",
        icon: "shield",
        rows: [
          { k: "すること", v: "見張って、異常に気づく" },
          { k: "気づいた後", v: "その場で遮断する" },
          { k: "怪しい通信", v: "止まる" },
        ],
      },
      columnAtSec: [segStart(SEG_IDS, 1), segStart(SEG_IDS, 3)],
      narration: SEG_IDS,
    },
    {
      pattern: "custom",
      name: "filtering",
      durationSec: 7,
      narration: SEG_FILTER,
      component: FilteringScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "quiz-intro",
      durationSec: 3,
      narration: QUIZ_INTRO_SEG,
      component: QuizIntroScene,
    },
    {
      pattern: "quiz",
      question: "ファイアウォールが見るのは？",
      choices: [
        { key: "A", text: "宛先・送信元・ポート番号", correct: true },
        { key: "B", text: "送信者の氏名と所属部署" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 1),
    },
    {
      pattern: "quiz",
      question: "DMZに置くサーバは？",
      choices: [
        { key: "A", text: "社内だけで使う人事サーバ" },
        { key: "B", text: "外に公開するウェブサーバ", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 1),
    },
    {
      pattern: "quiz",
      question: "その場で遮断するのは？",
      choices: [
        { key: "A", text: "IPS（侵入防止システム）", correct: true },
        { key: "B", text: "IDS（侵入検知システム）" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 1),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "ファイアウォールは荷札のルールで通す・止める",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "DMZは公開サーバを分け、被害を閉じ込める",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "IDSは気づいて知らせ、IPSはその場で止める",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
