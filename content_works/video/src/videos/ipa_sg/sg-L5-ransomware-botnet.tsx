import { Img, interpolateColors, staticFile } from "remotion";
import { colors, markerPinkStyle, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { DrawPath } from "../../parts/draw";
import { useAppear, useFlyIn, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L5-ransomware-botnet.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L5: ランサムウェアとボットネット
 *
 * 発注書 content_works/ipa_sg/orders/L5.md に対応。シナリオは
 * narration/ipa_sg/sg-L5-ransomware-botnet.md。
 *
 * L4 が「感染のしかたで分ける地図」なので、この回は**目的・被害で分ける**側を担う:
 *   導入（金を取る型／乗っ取って使う型）→ ランサムウェア → 二重脅迫 →
 *   wipe-light で「乗っ取り側」へ転換 → ボットネットとC&Cサーバ（ハブ＆スポーク図）→
 *   踏み台（被害者が加害者に）→ ボット vs RAT → バックドア／ルートキット（重なりで「隠す」）→
 *   ファイルレスマルウェア（用語ドン）→ クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 読みの例外（音声と字幕を分ける。narration.md の「難読語」参照）:
 *   C&Cサーバ → 音声は「シーアンドシーサーバ」 / RAT → 音声は「ラット」
 *   （jobs.json 側が仮名書き。字幕＝下の N() の第2引数は表記のまま）
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L5-ransomware-botnet");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、マルウェアに感染したあと何をされるのかを学びます。"),
  N("s02-2.mp3", "前回は感染のしかたで分けましたが、今回は目的と被害で見ていきます。"),
  N("s02-3.mp3", "ひとつは、データを人質にとってお金を取られる型です。"),
  N("s02-4.mp3", "もうひとつは、端末を乗っ取られ、攻撃の道具として使われる型です。"),
];

const SEG_RANSOM = [
  N("s03-1.mp3", "まず、お金を取られる型の代表が、ランサムウェアです。"),
  N("s03-2.mp3", "感染すると、パソコンやサーバの中のデータが暗号化されます。"),
  N("s03-3.mp3", "そして、元に戻す鍵と引き換えに、身代金を要求してきます。"),
  N("s03-4.mp3", "業務が止まってしまうため、企業にとっては深刻な被害になります。"),
];

const SEG_DOUBLE = [
  N("s04-1.mp3", "近年は、二重脅迫と呼ばれる手口が主流になっています。"),
  N("s04-2.mp3", "一段目は、データを暗号化して使えなくする脅しです。"),
  N("s04-3.mp3", "二段目は、盗んだデータを公開すると迫る脅しです。"),
  N("s04-4.mp3", "つまり、バックアップがあっても、公開するという脅しは防げません。"),
  N("s04-5.mp3", "支払っても元に戻る保証はなく、払うかどうかは重い判断になります。"),
];

const SEG_BOTNET = [
  N("s05-1.mp3", "ここからは、乗っ取られて使われる型を見ていきます。"),
  N("s05-2.mp3", "乗っ取られた端末はボットと呼ばれ、攻撃者の指示どおりに動きます。"),
  // 音声は「シーアンドシーサーバ」（TTSの誤読を避けるための表記ゆらし。字幕は C&Cサーバ のまま）
  N("s05-3.mp3", "指示を出す司令塔が、C&Cサーバと呼ばれる指令サーバです。"),
  N("s05-4.mp3", "大量のボットが束ねられたネットワークを、ボットネットと呼びます。"),
  N("s05-5.mp3", "攻撃者は号令ひとつで、何万台もの端末を一斉に動かせます。"),
];

const SEG_STEP = [
  N("s06-1.mp3", "怖いのは、被害者がそのまま加害者になってしまう点です。"),
  N("s06-2.mp3", "乗っ取られた端末は、他社を攻撃するための踏み台にされます。"),
  N("s06-3.mp3", "攻撃を受けた側から見れば、攻撃してきたのはあなたの会社です。"),
  N("s06-4.mp3", "知らないうちに加害者として名前が出る、それが踏み台の怖さです。"),
];

const SEG_RAT = [
  // 音声は「ラット」。字幕は初出なので読みを添える
  N("s07-1.mp3", "似た言葉に、遠隔操作型のRAT（ラット）があります。"),
  N("s07-2.mp3", "ボットは、指示を受けて自動的に動くのが基本です。"),
  N("s07-3.mp3", "一方RATは、攻撃者が手元から直接その端末を操作します。"),
  N("s07-4.mp3", "自動で一斉に動くか、手動でじっくり操るかのちがいです。"),
];

const SEG_PERSIST = [
  N("s08-1.mp3", "攻撃者は、一度入り込んだ端末に居座ろうとします。"),
  N("s08-2.mp3", "そのために作られる再侵入用の裏口が、バックドアです。"),
  N("s08-3.mp3", "侵入の痕跡やバックドアを隠す技術が、ルートキットです。"),
  N("s08-4.mp3", "駆除したはずなのに戻ってくる、その正体がこれらです。"),
];

const SEG_FILELESS = [
  N("s09-1.mp3", "最後に、ファイルレスマルウェアを押さえましょう。"),
  N("s09-2.mp3", "これは、ディスクにファイルを置かずに動くマルウェアです。"),
  N("s09-3.mp3", "端末にもともとある正規の機能を悪用し、メモリ上だけで動きます。"),
  N("s09-4.mp3", "ファイルを調べる検査には映らないため、見つけにくいのが厄介です。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "二重脅迫のうち、バックアップがあっても防げないのはどちらでしょうか。"),
  N("s11-3.mp3", "正解は、盗んだデータの公開です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "端末が踏み台にされると、どうなってしまうでしょうか。"),
  N("s12-3.mp3", "正解は、自社が攻撃元になることです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "攻撃者が手元から直接、端末を操作するのはどちらでしょうか。"),
  N("s13-3.mp3", "正解は、遠隔操作型のRATです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s14-1.mp3", "ランサムウェアは、暗号化と公開の二重脅迫でお金を要求します。"),
  N("s14-2.mp3", "ボットネットは、乗っ取った大量の端末を指令サーバで一斉に動かします。"),
  N("s14-3.mp3", "踏み台にされると、被害者がそのまま加害者になってしまいます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 語句単位のハイライト（説明文の開始で用語を濃色に）
// ---------------------------------------------------------------------------

const HighlightSpan: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const on = useProgress(atSec, 0.3);
  const color = interpolateColors(on, [0, 1], [colors.textSecondary, colors.primary600]);
  return <span style={{ color }}>{text}</span>;
};

// ---------------------------------------------------------------------------
// P3: ランサムウェア（左テキスト + 右イラスト）
// ---------------------------------------------------------------------------

const RansomScene: React.FC = () => {
  const termAppear = useAppear(0.3);
  const subAppear = useAppear(segStart(SEG_RANSOM, 1));
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_RANSOM}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.45, ...termAppear }}>
            データを
            <span style={markerStyle}>人質</span>にとり
            <br />
            身代金を要求する
          </span>
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, lineHeight: 1.6, ...subAppear }}>
            <span style={{ color: colors.textSecondary }}>ランサムウェア</span>
            <br />
            <HighlightSpan text="元に戻す鍵と引き換えに" atSec={segStart(SEG_RANSOM, 2)} />
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/malware-ransom.png")}
          style={{
            flex: 1.05,
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
// P4: 二重脅迫（縦2段の脅しカード + 注記）
// ---------------------------------------------------------------------------

const ThreatCard: React.FC<{
  no: string;
  icon: string;
  title: string;
  desc: string;
  atSec: number;
}> = ({ no, icon, title, desc, atSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10 * SCALE,
      padding: `${6 * SCALE}px ${14 * SCALE}px`,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 14 * SCALE,
      ...useAppear(atSec),
    }}
  >
    <span
      style={{
        width: 23 * SCALE,
        height: 23 * SCALE,
        borderRadius: 999,
        flex: "none",
        backgroundColor: colors.primary600,
        color: colors.surface,
        fontSize: 14 * SCALE,
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
        borderRadius: 12 * SCALE,
        flex: "none",
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={20 * SCALE} />
    </span>
    <span style={{ display: "flex", flexDirection: "column", gap: 1.5 * SCALE, minWidth: 0 }}>
      <b style={{ fontSize: 15 * SCALE, fontWeight: 800 }}>{title}</b>
      <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textSecondary }}>{desc}</span>
    </span>
  </div>
);

const DoubleExtortionScene: React.FC = () => {
  const noteAppear = useAppear(segStart(SEG_DOUBLE, 3));
  const payAppear = useAppear(segStart(SEG_DOUBLE, 4));
  return (
    <SlideShell
      heading="二重脅迫 — 二段構えの脅し"
      icon={<Ms name="gpp_bad" size={videoType.slideHeadIcon} />}
      narration={SEG_DOUBLE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "0.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6 * SCALE,
        }}
      >
        <ThreatCard
          no="1"
          icon="lock"
          title="暗号化して使えなくする"
          desc="データを人質にとって業務を止める"
          atSec={segStart(SEG_DOUBLE, 1)}
        />
        <ThreatCard
          no="2"
          icon="campaign"
          title="公開すると迫る"
          desc="盗んだデータをさらすと脅す"
          atSec={segStart(SEG_DOUBLE, 2)}
        />
        <div
          style={{
            marginTop: 4 * SCALE,
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            fontSize: 13 * SCALE,
            fontWeight: 800,
            ...noteAppear,
          }}
        >
          <Ms name="warning" size={18 * SCALE} />
          <span>
            バックアップがあっても<span style={markerPinkStyle}>公開の脅しは防げない</span>
          </span>
        </div>
        <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...payAppear }}>
          払っても元に戻る保証はない
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: ボットネット（C&Cサーバを頂点にしたハブ＆スポーク図）
// 図の座標系は viewBox 350×150 と同じ比率のボックス（%配置）で揃える
// ---------------------------------------------------------------------------

const VB_W = 350;
const VB_H = 150;
const CC = { x: 175, y: 30 };
const BOTS = [40, 107, 175, 243, 310];
const BOT_Y = 112;

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

const BotNode: React.FC<{ x: number; atSec: number }> = ({ x, atSec }) => (
  <div
    style={{
      position: "absolute",
      left: pct(x, VB_W),
      top: pct(BOT_Y, VB_H),
      translate: "-50% -50%",
    }}
  >
    <div
      style={{
        width: 30 * SCALE,
        height: 30 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        color: colors.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...usePop(atSec),
      }}
    >
      <Ms name="laptop_mac" size={18 * SCALE} />
    </div>
  </div>
);

const BotnetScene: React.FC = () => {
  const ccAppear = usePop(segStart(SEG_BOTNET, 2));
  const netLabel = useAppear(segStart(SEG_BOTNET, 3));
  const note = useAppear(segStart(SEG_BOTNET, 4));
  const lineDelay = segStart(SEG_BOTNET, 3);
  return (
    <SlideShell
      heading="ボットネットのしくみ"
      icon={<Ms name="lan" size={videoType.slideHeadIcon} />}
      narration={SEG_BOTNET}
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
          gap: 4 * SCALE,
        }}
      >
        <div style={{ position: "relative", width: 350 * SCALE, height: 150 * SCALE, flex: "none" }}>
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {BOTS.map((x, i) => (
              <DrawPath
                key={x}
                d={`M ${CC.x} ${CC.y + 22} L ${x} ${BOT_Y - 17}`}
                delaySec={lineDelay + i * 0.12}
                durSec={0.5}
                stroke={colors.primary300}
                strokeWidth={1.6}
              />
            ))}
          </svg>

          {/* C&Cサーバ（指令サーバ） */}
          <div
            style={{
              position: "absolute",
              left: pct(CC.x, VB_W),
              top: pct(CC.y, VB_H),
              translate: "-50% -50%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8 * SCALE,
                padding: `${7 * SCALE}px ${13 * SCALE}px`,
                borderRadius: 13 * SCALE,
                backgroundColor: colors.primary600,
                color: colors.surface,
                whiteSpace: "nowrap",
                ...ccAppear,
              }}
            >
              <Ms name="dns" size={22 * SCALE} />
              <span style={{ display: "flex", flexDirection: "column", gap: 1 * SCALE }}>
                <b style={{ fontSize: 14 * SCALE, fontWeight: 800 }}>C&Cサーバ</b>
                <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700 }}>指令サーバ</span>
              </span>
            </div>
          </div>

          {BOTS.map((x, i) => (
            <BotNode key={x} x={x} atSec={segStart(SEG_BOTNET, 1) + i * 0.12} />
          ))}

          {/* ボット群のくくり */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: pct(134, VB_H),
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 9 * SCALE,
              ...netLabel,
            }}
          >
            <b style={{ fontSize: 12 * SCALE, fontWeight: 800 }}>
              <span style={markerStyle}>ボットネット</span>
            </b>
            <span style={{ color: colors.textSecondary, fontSize: 10.5 * SCALE, fontWeight: 700 }}>
              乗っ取られた端末（ボット）の群れ
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            fontSize: 12 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            ...note,
          }}
        >
          <Ms name="campaign" size={16 * SCALE} />
          <span>号令ひとつで、何万台もの端末が一斉に動く</span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 踏み台（左イラスト + 右テキスト・P3の鏡像）
// ---------------------------------------------------------------------------

const SteppingStoneScene: React.FC = () => {
  const termAppear = useAppear(0.3);
  const subAppear = useAppear(segStart(SEG_STEP, 1));
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_STEP}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/malware-bot.png")}
          style={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.45, ...termAppear }}>
            被害者が、
            <br />
            <span style={markerPinkStyle}>加害者</span>になる
          </span>
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, lineHeight: 1.6, ...subAppear }}>
            <span style={{ color: colors.textSecondary }}>踏み台</span>
            <br />
            <HighlightSpan text="自社が攻撃元として名前が出る" atSec={segStart(SEG_STEP, 2)} />
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: バックドアとルートキット（重なりで「隠す」を見せる）
// ---------------------------------------------------------------------------

const PersistScene: React.FC = () => {
  const backdoor = useAppear(segStart(SEG_PERSIST, 1));
  const rootkit = useFlyIn(segStart(SEG_PERSIST, 2), { dx: 90, dy: 0 });
  const note = useAppear(segStart(SEG_PERSIST, 3));
  return (
    <SlideShell
      heading="居座るための技術"
      icon={<Ms name="security" size={videoType.slideHeadIcon} />}
      narration={SEG_PERSIST}
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
          gap: 12 * SCALE,
        }}
      >
        <div style={{ position: "relative", width: 360 * SCALE, height: 100 * SCALE, flex: "none" }}>
          {/* バックドア（下のカード） */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 200 * SCALE,
              height: 100 * SCALE,
              boxSizing: "border-box",
              padding: `${11 * SCALE}px ${14 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 16 * SCALE,
              display: "flex",
              flexDirection: "column",
              gap: 4 * SCALE,
              ...backdoor,
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
              <Ms name="lock_open" size={22 * SCALE} />
              <b style={{ fontSize: 15 * SCALE, fontWeight: 800, color: colors.textPrimary }}>
                バックドア
              </b>
            </span>
            <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
              いつでも入り直せる
              <br />
              再侵入用の裏口
            </span>
          </div>

          {/* ルートキット（上に重なって裏口を隠す） */}
          <div
            style={{
              position: "absolute",
              left: 160 * SCALE,
              top: 0,
              width: 200 * SCALE,
              height: 100 * SCALE,
              boxSizing: "border-box",
              padding: `${11 * SCALE}px ${14 * SCALE}px`,
              backgroundColor: colors.primary800,
              borderRadius: 16 * SCALE,
              boxShadow: `0 ${4 * SCALE}px ${14 * SCALE}px rgba(30, 41, 59, 0.22)`,
              display: "flex",
              flexDirection: "column",
              gap: 4 * SCALE,
              ...rootkit,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7 * SCALE,
                color: colors.primaryDark,
              }}
            >
              <Ms name="visibility_off" size={22 * SCALE} />
              <b style={{ fontSize: 15 * SCALE, fontWeight: 800, color: colors.textPrimaryDark }}>
                ルートキット
              </b>
            </span>
            <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textSecondaryDark }}>
              裏口も侵入の痕跡も
              <br />
              覆い隠してしまう
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            fontSize: 13 * SCALE,
            fontWeight: 800,
            ...note,
          }}
        >
          <Ms name="autorenew" size={18 * SCALE} />
          <span>
            だから<span style={markerStyle}>駆除しても再発する</span>
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

export const SgL5RansomwareBotnet: VideoSpec = {
  id: "sg-L5-ransomware-botnet",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "ランサムウェアと\nボットネット",
      keywords: ["二重脅迫", "C&Cサーバ", "踏み台"],
    },
    {
      pattern: "bullets",
      heading: "感染したあと、何をされるか",
      icon: "gpp_maybe",
      bullets: [
        { text: "お金を取られる", sub: "データを人質に身代金を要求", marker: "blue" },
        { text: "乗っ取られて使われる", sub: "攻撃の道具として動かされる", marker: "blue" },
      ],
      appearAtSec: [segStart(SEG_INTRO, 2), segStart(SEG_INTRO, 3)],
      narration: SEG_INTRO,
    },
    {
      pattern: "custom",
      name: "ransomware",
      durationSec: 5,
      narration: SEG_RANSOM,
      component: RansomScene,
    },
    {
      pattern: "custom",
      name: "double-extortion",
      durationSec: 6,
      narration: SEG_DOUBLE,
      component: DoubleExtortionScene,
    },
    {
      pattern: "custom",
      name: "botnet",
      durationSec: 6,
      narration: SEG_BOTNET,
      transitionIn: "wipe-light",
      component: BotnetScene,
    },
    {
      pattern: "custom",
      name: "stepping-stone",
      durationSec: 5,
      narration: SEG_STEP,
      component: SteppingStoneScene,
    },
    {
      pattern: "vs",
      heading: "ボットとRATのちがい",
      icon: "compare_arrows",
      left: {
        title: "ボット",
        icon: "autorenew",
        rows: [
          { k: "動き方", v: "指示を受けて自動で動く" },
          { k: "規模", v: "大量の端末を一斉に" },
        ],
      },
      right: {
        title: "RAT（遠隔操作型）",
        icon: "settings",
        rows: [
          { k: "動き方", v: "攻撃者が手元で操作する" },
          { k: "規模", v: "狙った端末をじっくり" },
        ],
      },
      columnAtSec: [segStart(SEG_RAT, 1), segStart(SEG_RAT, 2)],
      narration: SEG_RAT,
    },
    {
      pattern: "custom",
      name: "backdoor-rootkit",
      durationSec: 5,
      narration: SEG_PERSIST,
      component: PersistScene,
    },
    {
      pattern: "term",
      icon: "memory",
      term: "ファイルレス",
      sub: "ファイルレスマルウェア — ファイルを置かずメモリ上で動く",
      narration: SEG_FILELESS,
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
      question: "バックアップでは防げない脅しは？",
      choices: [
        { key: "A", text: "盗んだデータの公開", correct: true },
        { key: "B", text: "データの暗号化" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "踏み台にされると起きることは？",
      choices: [
        { key: "A", text: "身代金を要求される" },
        { key: "B", text: "自社が攻撃元になる", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "攻撃者が手動で操作するのは？",
      choices: [
        { key: "A", text: "RAT（遠隔操作型）", correct: true },
        { key: "B", text: "ボット" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          text: "ランサムウェアは、暗号化と公開の二重脅迫でお金を要求します。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "ボットネットは、乗っ取った大量の端末を指令サーバで一斉に動かします。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "踏み台にされると、被害者がそのまま加害者になってしまいます。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
