import { Img, interpolateColors, staticFile } from "remotion";
import { colors, fontMono, markerStyle, SCALE, videoType } from "../../design/tokens";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { OUTRO_SEG, QUIZ_INTRO_SEG } from "../../parts/common-narration";
import { ArrowMarker, DrawPath } from "../../parts/draw";
import { Ms } from "../../parts/Ms";
import { narrationLoader, segStart } from "../../parts/narration";
import { SectionTitle } from "../../parts/SectionTitle";
import { SlideShell } from "../../parts/SlideShell";
import type { VideoSpec } from "../types";
import durations from "./sg-L45-network-security-implementation.audio.json";

/**
 * sg-L45 ネットワークセキュリティの実装
 * 発注書: content_works/ipa_sg/orders/L45.md
 * シナリオ: narration/ipa_sg/sg-L45-network-security-implementation.md
 *
 * 音声側だけ仮名書きにした語（字幕は英字のまま。jobs.json 側が音声用テキスト）:
 * IPアドレス→アイピーアドレス / ID→アイディー / VPN→ブイピーエヌ /
 * MACアドレス→マックアドレス / 認証VLAN→認証 ブイラン / IPsec→アイピーセック。
 * 字幕のルビはアルファベット読みが自明でない略語の初出だけ（MAC・VLAN・IPsec）。
 *
 * L38（関所・ファイアウォール・パケットフィルタリング）と
 * L42（IPsec）の用語・定義は再説明せず、参照だけに留めている。
 */
const N = narrationLoader(durations, "audio/ipa_sg/sg-L45-network-security-implementation");

const SEG_INTRO = [
  N("s02-1.mp3", "ネットワークの守りでは、社内と外との境目に関所を置くことを学びました。"),
  N("s02-2.mp3", "今回は、その関所をどう設定するのかを見ていきます。"),
  N("s02-3.mp3", "通す相手を絞る、通り道を守る、受け方を工夫する。この三つで整理します。"),
];

const SEG_RULES = [
  N("s03-1.mp3", "まずは、通す相手を絞る設定からです。"),
  N("s03-2.mp3", "ファイアウォールには、こんなルールを一行ずつ書いていきます。"),
  N("s03-3.mp3", "送信元のIPアドレス、宛先、そしてポート番号の組み合わせで、許可か拒否かを決めます。"),
  N("s03-4.mp3", "上から順に照合し、どれにも当てはまらない通信は拒否する。これが基本の形です。"),
];

const SEG_MAC = [
  N("s04-1.mp3", "通信ではなく、つなぐ機器そのもので絞る方法もあります。"),
  // MAC の読み「マック」は自明でないので、この初出だけ字幕にルビを添える
  N("s04-2.mp3", "ネットワーク機器には、MACアドレス（マックアドレス）という固有の番号が付いています。"),
  N("s04-3.mp3", "あらかじめ登録した番号の機器だけを接続させるのが、MACアドレスフィルタリングです。"),
  N("s04-4.mp3", "ただし、この番号は書き換えて偽装できるので、これだけに頼ってはいけません。"),
];

const SEG_AUTH = [
  N("s05-1.mp3", "機器ではなく、使う人を確かめる方法が認証サーバです。"),
  N("s05-2.mp3", "ネットワークにつないだだけでは、まだ中には入れません。"),
  N("s05-3.mp3", "利用者のIDとパスワードを認証サーバが確認して、はじめて通信を許します。"),
  // VLAN の読み「ブイラン」も自明でないので、この初出だけ字幕にルビを添える
  N("s05-4.mp3", "さらに、確認できた人を所属に応じたネットワークへ割り当てるのが、認証VLAN（ブイラン）です。"),
];

const SEG_CASE = [
  N("s06-1.mp3", "会議室のネットワークを例に見てみましょう。"),
  N("s06-2.mp3", "来客がつないだ場合は、インターネットだけが使える来客用のネットワークにつながります。"),
  N("s06-3.mp3", "同じ差込口でも、社員がつなげば、社内のサーバまで使える社内ネットワークになります。"),
  N("s06-4.mp3", "つなげた、イコール、入れた。認証VLANの狙いはここです。"),
];

const SEG_VPN = [
  N("s07-1.mp3", "二つ目は、通り道そのものを守る方法です。"),
  N("s07-2.mp3", "インターネットは、誰もが使う公衆の道です。"),
  N("s07-3.mp3", "その上に暗号化された専用のトンネルを作るのが、VPNです。"),
  N("s07-4.mp3", "外出先からでも、社内にいるのと同じように安全につなげます。"),
  // IPsec の仕組みは L42 が主担当。ここは「使われる」の一言だけで踏み込まない
  N("s07-5.mp3", "トンネルの中身を暗号化する仕組みには、以前学んだIPsec（アイピーセック）などが使われます。"),
];

const SEG_PROXY = [
  N("s08-1.mp3", "三つ目は、外からの受け方を工夫する方法です。"),
  N("s08-2.mp3", "公開しているサーバに、外から直接つながせたくはありません。"),
  N("s08-3.mp3", "そこで、手前に代理の窓口を置いて、そこで受けて中継します。"),
  N("s08-4.mp3", "これがリバースプロキシで、本体を直接さらさずに済みます。"),
];

const SEG_HONEY = [
  N("s09-1.mp3", "最後は、守るだけではない、変わった仕掛けです。"),
  N("s09-2.mp3", "わざと弱そうに見えるおとりのサーバで、攻撃者を誘い込みます。"),
  N("s09-3.mp3", "これがハニーポットで、蜜の壺という意味の名前です。"),
  N("s09-4.mp3", "目的は防ぐことではなく、どんな手口で来るのかを観察して、本番の守りに活かすことです。"),
];

const SEG_Q1 = [
  N("s11-1.mp3", "一問目です。認証VLANの狙いは、どちらでしょうか。"),
  N("s11-2.mp3", "正解は、認証した人を所属のネットワークにつなぐことです。", {
    gapBeforeSec: 1.8,
  }),
  N("s11-3.mp3", "つなげただけでは入れない、という仕組みでしたね。"),
];

const SEG_Q2 = [
  N("s12-1.mp3", "二問目です。ハニーポットを置く目的は、どちらでしょうか。"),
  N("s12-2.mp3", "正解は、攻撃者の手口を観察することです。", { gapBeforeSec: 1.8 }),
  N("s12-3.mp3", "防ぐためではなく、知るための仕掛けでしたね。"),
];

const SEG_Q3 = [
  N("s13-1.mp3", "三問目です。リバースプロキシを置くのは、どこでしょうか。"),
  N("s13-2.mp3", "正解は、公開サーバの手前です。", { gapBeforeSec: 1.8 }),
  N("s13-3.mp3", "外からの通信を代わりに受けて、中継していましたね。"),
];

const SEG_SUM = [
  N("s14-1.mp3", "今回のまとめです。通す相手は、アドレス、機器の番号、人の認証で絞ります。"),
  N("s14-2.mp3", "通り道は、VPNで暗号化された専用のトンネルにします。"),
  N("s14-3.mp3", "受け方はリバースプロキシ、手口はハニーポットで知ります。"),
  OUTRO_SEG,
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/**
 * 横向きの矢印ストリップ。viewBox を px と 1:1 にして
 * 「幅可変の入れ物で短いスタブに縮む」事故を防ぐ（sg-L38 と同じ作り）。
 * 矢じりは size6 × strokeWidth6 = 36単位なので、線のy ± 18 が viewBox に収まる高さを取る。
 */
const ArrowStrip: React.FC<{
  id: string;
  atSec: number;
  color?: string;
  width?: number;
  height?: number;
}> = ({ id, atSec, color = colors.primary500, width = 40 * SCALE, height = 14 * SCALE }) => (
  <svg viewBox={`0 0 ${width} ${height}`} style={{ width, height, flex: "none" }}>
    <ArrowMarker id={id} color={color} />
    <DrawPath
      d={`M${Math.round(width * 0.05)} ${height / 2} L${Math.round(width * 0.85)} ${height / 2}`}
      delaySec={atSec}
      durSec={0.55}
      stroke={color}
      strokeWidth={6}
      markerEnd={`url(#${id})`}
    />
  </svg>
);

/** ネットワーク上の区画・機器を表すブロック（アイコン + ラベル） */
const NodeBox: React.FC<{
  icon: string;
  label: string;
  sub?: string;
  atSec: number;
  tone?: "normal" | "solid" | "pink";
  size?: number;
}> = ({ icon, label, sub, atSec, tone = "normal", size = 28 }) => {
  const pop = usePop(atSec);
  const face =
    tone === "pink" ? colors.accentPinkSurface : tone === "solid" ? colors.primary600 : colors.primary50;
  const accent =
    tone === "pink" ? colors.accentPinkText : tone === "solid" ? colors.surface : colors.primary600;
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
          width: size * SCALE,
          height: size * SCALE,
          borderRadius: (size * 0.4) * SCALE,
          backgroundColor: face,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={size * 0.58 * SCALE} />
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

/** 分類チップ */
const Chip: React.FC<{ text: string; tone?: "blue" | "pink" }> = ({ text, tone = "blue" }) => (
  <span
    style={{
      fontSize: 10 * SCALE,
      fontWeight: 800,
      color: tone === "pink" ? colors.accentPinkText : colors.primary800,
      backgroundColor: tone === "pink" ? colors.accentPinkSurface : colors.primary100,
      borderRadius: 999,
      padding: `${2 * SCALE}px ${10 * SCALE}px`,
      lineHeight: 1.3,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

// ---------------------------------------------------------------------------
// 2. 導入 — 関所を「どう設定するか」【この回の背骨】
// ---------------------------------------------------------------------------

const ApproachCard: React.FC<{
  no: string;
  icon: string;
  title: string;
  sub: string;
  atSec: number;
}> = ({ no, icon, title, sub, atSec }) => {
  const a = useAppear(atSec);
  return (
    <div
      style={{
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: colors.surface,
        border: `${1 * SCALE}px solid ${colors.border}`,
        borderRadius: 12 * SCALE,
        padding: `${7 * SCALE}px ${9 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 3 * SCALE,
        ...a,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5 * SCALE,
          color: colors.primary600,
        }}
      >
        <b style={{ fontSize: 15 * SCALE, fontWeight: 800 }}>{no}</b>
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <b style={{ fontSize: 14.5 * SCALE, lineHeight: 1.25 }}>{title}</b>
      <span style={{ fontSize: 10.5 * SCALE, color: colors.textSecondary, lineHeight: 1.35 }}>
        {sub}
      </span>
    </div>
  );
};

const IntroScene: React.FC = () => {
  const strip = useAppear(0.3);
  const note = useAppear(segStart(SEG_INTRO, 1));
  const base = segStart(SEG_INTRO, 2);
  return (
    <SlideShell
      heading="関所を、実際にどう設定するか"
      icon={<Ms name="settings" size={videoType.slideHeadIcon} />}
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
          gap: 6 * SCALE,
        }}
      >
        {/* 学んだこと（L38 の関所）の復習ストリップ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4 * SCALE,
            ...strip,
          }}
        >
          <NodeBox icon="apartment" label="社内" atSec={0.35} size={24} />
          <ArrowStrip id="l45-intro-a" atSec={0.6} width={30 * SCALE} />
          <NodeBox icon="security" label="関所" atSec={0.5} tone="solid" size={24} />
          <ArrowStrip id="l45-intro-b" atSec={0.6} width={30 * SCALE} />
          <NodeBox icon="language" label="インターネット" atSec={0.35} size={24} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", ...note }}>
          <Chip text="この関所に、何をどう設定するのか" />
        </div>

        <div style={{ display: "flex", gap: 5 * SCALE, alignItems: "stretch" }}>
          <ApproachCard
            no="①"
            icon="verified_user"
            title="通す相手を絞る"
            sub="アドレス・機器の番号・人の認証で"
            atSec={base}
          />
          <ApproachCard
            no="②"
            icon="lock"
            title="通り道を守る"
            sub="通り道そのものを暗号化する"
            atSec={base + 0.5}
          />
          <ApproachCard
            no="③"
            icon="schema"
            title="受け方を工夫する"
            sub="受け口をずらす・おとりを置く"
            atSec={base + 1.0}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 3. ①パケットフィルタリングの実装（実際の設定表）
// ---------------------------------------------------------------------------

const RULE_COLS = [1.0, 1.75, 0.65, 0.75];

const HeadCell: React.FC<{ text: string; flex: number; atSec: number; align?: string }> = ({
  text,
  flex,
  atSec,
  align = "left",
}) => {
  const on = useProgress(atSec, 0.4);
  const color = interpolateColors(on, [0, 1], [colors.textSecondary, colors.primary600]);
  return (
    <span
      style={{
        flex,
        fontSize: 11 * SCALE,
        fontWeight: 800,
        color,
        lineHeight: 1.2,
        textAlign: align as "left" | "center",
      }}
    >
      {text}
    </span>
  );
};

const RuleRow: React.FC<{
  src: string;
  dst: string;
  port: string;
  allow: boolean;
  atSec: number;
  muted?: boolean;
}> = ({ src, dst, port, allow, atSec, muted }) => {
  const a = useAppear(atSec);
  const tint = allow ? colors.primary600 : colors.accentPinkText;
  const face = allow ? colors.primary50 : colors.accentPinkSurface;
  const valueStyle = {
    fontFamily: fontMono,
    fontSize: 10.5 * SCALE,
    fontWeight: 700,
    lineHeight: 1.25,
    color: muted ? colors.textSecondary : colors.textPrimary,
  } as const;
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
      <span style={{ ...valueStyle, flex: RULE_COLS[0] }}>{src}</span>
      <span style={{ ...valueStyle, flex: RULE_COLS[1] }}>{dst}</span>
      <span style={{ ...valueStyle, flex: RULE_COLS[2] }}>{port}</span>
      <span
        style={{
          flex: RULE_COLS[3],
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3 * SCALE,
            padding: `${2.5 * SCALE}px ${8 * SCALE}px`,
            borderRadius: 999,
            backgroundColor: face,
            color: tint,
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          <Ms name={allow ? "check_circle" : "cancel"} size={13 * SCALE} />
          {allow ? "許可" : "拒否"}
        </span>
      </span>
    </div>
  );
};

const RulesScene: React.FC = () => {
  const head = useAppear(0.4);
  const foot = useAppear(segStart(SEG_RULES, 3));
  const colOn = segStart(SEG_RULES, 2);
  return (
    <SlideShell
      heading="ルールを、一行ずつ書いていく"
      icon={<Ms name="table_chart" size={videoType.slideHeadIcon} />}
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
          gap: 4 * SCALE,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            padding: `0 ${9 * SCALE}px`,
            ...head,
          }}
        >
          <HeadCell text="送信元" flex={RULE_COLS[0]} atSec={colOn} />
          <HeadCell text="宛先" flex={RULE_COLS[1]} atSec={colOn + 0.3} />
          <HeadCell text="ポート番号" flex={RULE_COLS[2]} atSec={colOn + 0.6} />
          <HeadCell text="判定" flex={RULE_COLS[3]} atSec={0.4} align="center" />
        </div>

        <RuleRow
          src="社外すべて"
          dst="203.0.113.10（Web）"
          port="443"
          allow
          atSec={segStart(SEG_RULES, 1) + 0.3}
        />
        <RuleRow
          src="社外すべて"
          dst="192.168.0.0/24（社内）"
          port="445"
          allow={false}
          atSec={segStart(SEG_RULES, 1) + 1.1}
        />
        <RuleRow
          src="すべて"
          dst="すべて"
          port="すべて"
          allow={false}
          atSec={segStart(SEG_RULES, 3)}
          muted
        />

        <span
          style={{
            fontSize: 11 * SCALE,
            fontWeight: 700,
            color: colors.primary800,
            textAlign: "center",
            lineHeight: 1.35,
            marginTop: 2 * SCALE,
            ...foot,
          }}
        >
          原則は「許可した通信だけを通す」
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 4. ①MACアドレスフィルタリング
// ---------------------------------------------------------------------------

const DeviceCard: React.FC<{
  icon: string;
  name: string;
  mac: string;
  registered: boolean;
  atSec: number;
  badgeAtSec: number;
}> = ({ icon, name, mac, registered, atSec, badgeAtSec }) => {
  const a = useAppear(atSec);
  const badge = usePop(badgeAtSec);
  const tint = registered ? colors.primary600 : colors.accentPinkText;
  const face = registered ? colors.primary50 : colors.accentPinkSurface;
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        border: `${1 * SCALE}px solid ${colors.border}`,
        borderRadius: 12 * SCALE,
        padding: `${6 * SCALE}px ${8 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2.5 * SCALE,
        ...a,
      }}
    >
      <span style={{ color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <b style={{ fontSize: 11.5 * SCALE, lineHeight: 1.2, whiteSpace: "nowrap" }}>{name}</b>
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 10 * SCALE,
          color: colors.textSecondary,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {mac}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3 * SCALE,
          padding: `${2 * SCALE}px ${8 * SCALE}px`,
          borderRadius: 999,
          backgroundColor: face,
          color: tint,
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          whiteSpace: "nowrap",
          ...badge,
        }}
      >
        <Ms name={registered ? "check_circle" : "cancel"} size={12 * SCALE} />
        {registered ? "登録済み・つながる" : "未登録・つながらない"}
      </span>
    </div>
  );
};

const MacScene: React.FC = () => {
  const chip = useAppear(segStart(SEG_MAC, 2));
  const term = useAppear(segStart(SEG_MAC, 2) + 0.2);
  const warn = useAppear(segStart(SEG_MAC, 3));
  const badgeAt = segStart(SEG_MAC, 2) + 0.6;
  return (
    <SlideShell
      heading="つなぐ機器そのもので絞る"
      icon={<Ms name="devices" size={videoType.slideHeadIcon} />}
      narration={SEG_MAC}
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
        <div style={{ display: "flex", gap: 5 * SCALE, alignItems: "stretch" }}>
          <DeviceCard
            icon="laptop_mac"
            name="業務用ノート"
            mac="00-1B-44-11-3A-B7"
            registered
            atSec={segStart(SEG_MAC, 1)}
            badgeAtSec={badgeAt}
          />
          <DeviceCard
            icon="computer"
            name="社内デスクトップ"
            mac="00-1B-44-11-3A-C2"
            registered
            atSec={segStart(SEG_MAC, 1) + 0.3}
            badgeAtSec={badgeAt + 0.2}
          />
          <DeviceCard
            icon="smartphone"
            name="私物のスマホ"
            mac="A4-83-E7-92-0D-51"
            registered={false}
            atSec={segStart(SEG_MAC, 1) + 0.6}
            badgeAtSec={badgeAt + 0.4}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3 * SCALE,
          }}
        >
          <span style={{ ...chip }}>
            <Chip text="機器の固有番号で絞る" />
          </span>
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>MACアドレスフィルタリング</span>
          </b>
        </div>

        <div style={{ display: "flex", justifyContent: "center", ...warn }}>
          <Chip text="番号は偽装できる → これだけに頼らない" tone="pink" />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 6. 具体場面 — 会議室の差込口（★抽象→具体）
// ---------------------------------------------------------------------------

const BRANCH_W = 320 * SCALE;
// viewBox は px と 1:1。矢じりは size6 × strokeWidth7 = 42単位なので、
// 終点 y=100 + 21 = 121 が高さ128 に収まる
const BRANCH_H = 32 * SCALE;

const DestBox: React.FC<{
  who: string;
  whoIcon: string;
  net: string;
  reach: string;
  atSec: number;
}> = ({ who, whoIcon, net, reach, atSec }) => {
  const a = useAppear(atSec);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        ...a,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
        }}
      >
        <Ms name={whoIcon} size={14 * SCALE} />
        {who}
      </span>
      <div
        style={{
          backgroundColor: colors.surface,
          border: `${1 * SCALE}px solid ${colors.border}`,
          borderRadius: 12 * SCALE,
          padding: `${5 * SCALE}px ${12 * SCALE}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5 * SCALE,
        }}
      >
        <b style={{ fontSize: 13.5 * SCALE, lineHeight: 1.2, whiteSpace: "nowrap" }}>{net}</b>
        <span
          style={{
            fontSize: 10.5 * SCALE,
            color: colors.textSecondary,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
          }}
        >
          {reach}
        </span>
      </div>
    </div>
  );
};

const AuthCaseScene: React.FC = () => {
  const conclusion = useAppear(segStart(SEG_CASE, 3));
  return (
    <SlideShell
      heading="同じ差込口でも、つなぐ人で行き先が変わる"
      icon={<Ms name="call_split" size={videoType.slideHeadIcon} />}
      narration={SEG_CASE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2 * SCALE,
        }}
      >
        <NodeBox icon="lan" label="会議室のLAN差込口" atSec={0.35} size={24} />

        <svg
          viewBox={`0 0 ${BRANCH_W} ${BRANCH_H}`}
          style={{ width: BRANCH_W, height: BRANCH_H, flex: "none" }}
        >
          <ArrowMarker id="l45-branch-l" color={colors.primary500} />
          <ArrowMarker id="l45-branch-r" color={colors.primary500} />
          <DrawPath
            d={`M${BRANCH_W / 2} 8 L${BRANCH_W / 2} 45 L${BRANCH_W / 4} 45 L${BRANCH_W / 4} 100`}
            delaySec={segStart(SEG_CASE, 1)}
            durSec={0.7}
            stroke={colors.primary500}
            strokeWidth={7}
            markerEnd="url(#l45-branch-l)"
          />
          <DrawPath
            d={`M${BRANCH_W / 2} 8 L${BRANCH_W / 2} 45 L${(BRANCH_W * 3) / 4} 45 L${
              (BRANCH_W * 3) / 4
            } 100`}
            delaySec={segStart(SEG_CASE, 2)}
            durSec={0.7}
            stroke={colors.primary500}
            strokeWidth={7}
            markerEnd="url(#l45-branch-r)"
          />
        </svg>

        <div style={{ width: BRANCH_W, display: "flex", alignItems: "flex-start" }}>
          <DestBox
            who="来客"
            whoIcon="person"
            net="来客用ネットワーク"
            reach="インターネットだけ"
            atSec={segStart(SEG_CASE, 1) + 0.8}
          />
          <DestBox
            who="社員"
            whoIcon="badge"
            net="社内ネットワーク"
            reach="社内のサーバまで"
            atSec={segStart(SEG_CASE, 2) + 0.8}
          />
        </div>

        <b
          style={{
            fontSize: 14.5 * SCALE,
            textAlign: "center",
            lineHeight: 1.3,
            marginTop: 2 * SCALE,
            ...conclusion,
          }}
        >
          <span style={markerStyle}>つなげた ＝ 入れた</span>、にしない
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 7. ②VPN
// ---------------------------------------------------------------------------

const VpnScene: React.FC = () => {
  const chip = useAppear(0.3);
  const lead = useAppear(segStart(SEG_VPN, 1));
  const term = useAppear(segStart(SEG_VPN, 2));
  const desc = useAppear(segStart(SEG_VPN, 2) + 0.3);
  const use = useAppear(segStart(SEG_VPN, 3));
  const note = useAppear(segStart(SEG_VPN, 4));
  const illust = useAppear(0.6);
  return (
    <SlideShell narration={SEG_VPN}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 5 * SCALE,
          }}
        >
          <span style={{ ...chip }}>
            <Chip text="② 通り道を守る" />
          </span>
          <span style={{ fontSize: 12 * SCALE, color: colors.textSecondary, lineHeight: 1.4, ...lead }}>
            インターネット ＝ 誰もが使う公衆の道
          </span>
          <b style={{ fontSize: 32 * SCALE, fontWeight: 800, lineHeight: 1.15, ...term }}>
            <span style={markerStyle}>VPN</span>
          </b>
          <span style={{ fontSize: 13 * SCALE, fontWeight: 700, lineHeight: 1.5, ...desc }}>
            公衆の道の上に作る、
            <br />
            暗号化された専用のトンネル
          </span>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              lineHeight: 1.4,
              ...use,
            }}
          >
            外出先からでも、社内にいるように
          </span>
          <span style={{ fontSize: 10 * SCALE, color: colors.textMuted, lineHeight: 1.35, ...note }}>
            ※ トンネルの暗号化には IPsec などを使う
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/tech-vpn-tunnel.png")}
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
// 8. ③リバースプロキシ
// ---------------------------------------------------------------------------

const ProxyScene: React.FC = () => {
  const warn = useAppear(segStart(SEG_PROXY, 1));
  const proxyLabel = useAppear(segStart(SEG_PROXY, 2) + 0.4);
  const conclusion = useAppear(segStart(SEG_PROXY, 3));
  return (
    <SlideShell
      heading="本体の手前で、代わりに受ける"
      icon={<Ms name="swap_horiz" size={videoType.slideHeadIcon} />}
      narration={SEG_PROXY}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7 * SCALE,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", ...warn }}>
          <Chip text="公開サーバに、外から直接つながせたくない" tone="pink" />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5 * SCALE,
          }}
        >
          <NodeBox icon="public" label="外からの利用者" atSec={0.35} />
          <ArrowStrip id="l45-proxy-a" atSec={segStart(SEG_PROXY, 2)} width={36 * SCALE} />
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
            }}
          >
            <NodeBox
              icon="alt_route"
              label="リバースプロキシ"
              atSec={segStart(SEG_PROXY, 2)}
              tone="solid"
              size={32}
            />
            <span style={{ ...proxyLabel }}>
              <Chip text="代理の窓口として受ける" />
            </span>
          </div>
          <ArrowStrip id="l45-proxy-b" atSec={segStart(SEG_PROXY, 2) + 0.5} width={36 * SCALE} />
          <NodeBox icon="dns" label="本体の公開サーバ" sub="直接はさらさない" atSec={0.35} />
        </div>

        <b
          style={{
            fontSize: 15 * SCALE,
            textAlign: "center",
            lineHeight: 1.35,
            marginTop: 4 * SCALE,
            ...conclusion,
          }}
        >
          本体のサーバを<span style={markerStyle}>外に直接さらさない</span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 9. ③ハニーポット
// ---------------------------------------------------------------------------

const PurposeRow: React.FC<{ ok: boolean; text: string; atSec: number }> = ({
  ok,
  text,
  atSec,
}) => {
  const a = useAppear(atSec);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        ...a,
      }}
    >
      <span
        style={{
          flex: "none",
          color: ok ? colors.primary600 : colors.textMuted,
          display: "flex",
        }}
      >
        <Ms name={ok ? "check_circle" : "cancel"} size={16 * SCALE} />
      </span>
      <span
        style={{
          fontSize: 12 * SCALE,
          fontWeight: ok ? 800 : 700,
          color: ok ? colors.textPrimary : colors.textMuted,
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};

const HoneypotScene: React.FC = () => {
  const illust = useAppear(0.4);
  const chip = useAppear(0.3);
  const lead = useAppear(segStart(SEG_HONEY, 1));
  const term = useAppear(segStart(SEG_HONEY, 2));
  const meaning = useAppear(segStart(SEG_HONEY, 2) + 0.4);
  return (
    <SlideShell narration={SEG_HONEY}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/tech-honeypot.png")}
          style={{
            flex: 0.9,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
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
            <Chip text="③ 守るだけではない仕掛け" />
          </span>
          <span style={{ fontSize: 12 * SCALE, color: colors.textSecondary, lineHeight: 1.4, ...lead }}>
            わざと弱そうに見せた、おとりのサーバ
          </span>
          <b style={{ fontSize: 27 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>ハニーポット</span>
          </b>
          <span style={{ fontSize: 11.5 * SCALE, color: colors.textSecondary, lineHeight: 1.4, ...meaning }}>
            ＝ 蜜の壺。攻撃者を誘い込むための壺
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3 * SCALE,
              marginTop: 2 * SCALE,
            }}
          >
            <PurposeRow ok={false} text="目的は、攻撃を防ぐこと" atSec={segStart(SEG_HONEY, 3)} />
            <PurposeRow
              ok
              text="目的は、手口を観察して本番の守りに活かすこと"
              atSec={segStart(SEG_HONEY, 3) + 0.5}
            />
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// 10. 幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL45NetworkSecurityImplementation: VideoSpec = {
  id: "sg-L45-network-security-implementation",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "ネットワークを\n守る設定",
      keywords: ["認証VLAN", "VPN", "ハニーポット"],
    },
    {
      pattern: "custom",
      name: "intro",
      durationSec: 6,
      narration: SEG_INTRO,
      component: IntroScene,
    },
    {
      pattern: "custom",
      name: "rules",
      durationSec: 7,
      narration: SEG_RULES,
      component: RulesScene,
    },
    {
      pattern: "custom",
      name: "mac-filter",
      durationSec: 7,
      narration: SEG_MAC,
      component: MacScene,
    },
    {
      pattern: "flow",
      heading: "つないだだけでは、まだ入れない",
      icon: "verified_user",
      steps: [
        { abc: "1", name: "つなぐ", sub: "この時点では、まだ通信できない" },
        { abc: "2", name: "認証", sub: "認証サーバがIDとパスワードを確認" },
        { abc: "3", name: "割当て", sub: "認証VLANが所属に応じた網へつなぐ" },
      ],
      highlightAtSec: [
        segStart(SEG_AUTH, 1),
        segStart(SEG_AUTH, 2),
        segStart(SEG_AUTH, 3),
      ],
      narration: SEG_AUTH,
    },
    {
      pattern: "custom",
      name: "auth-case",
      durationSec: 7,
      narration: SEG_CASE,
      component: AuthCaseScene,
    },
    {
      pattern: "custom",
      name: "vpn",
      durationSec: 8,
      narration: SEG_VPN,
      component: VpnScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "reverse-proxy",
      durationSec: 7,
      narration: SEG_PROXY,
      component: ProxyScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "honeypot",
      durationSec: 7,
      narration: SEG_HONEY,
      component: HoneypotScene,
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
      question: "認証VLANの狙いは？",
      choices: [
        { key: "A", text: "通信の中身を暗号化して守る" },
        { key: "B", text: "認証した人を所属の網につなぐ", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 1),
    },
    {
      pattern: "quiz",
      question: "ハニーポットを置く目的は？",
      choices: [
        { key: "A", text: "攻撃者を誘い込み手口を見る", correct: true },
        { key: "B", text: "重要データを暗号化して保管" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 1),
    },
    {
      pattern: "quiz",
      question: "リバースプロキシの置き場所は？",
      choices: [
        { key: "A", text: "社内の利用者と外との間" },
        { key: "B", text: "公開サーバの手前", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 1),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "通す相手はアドレス・機器の番号・人の認証で絞る",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "通り道はVPNで暗号化された専用トンネルに",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "受け方はリバースプロキシ、手口はハニーポットで知る",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
