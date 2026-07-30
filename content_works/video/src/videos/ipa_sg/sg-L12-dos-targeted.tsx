import React from "react";
import { Img, staticFile } from "remotion";
import { colors, fontMono, markerStyle, markerPinkStyle, radius, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { DrawPath } from "../../parts/draw";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L12-dos-targeted.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L12: DoS攻撃と標的型攻撃
 *
 * 発注書 content_works/ipa_sg/orders/L12.md に対応（DoS/DDoS・標的型・APT・水飲み場型・
 * ゼロデイ・機能の悪用まで。ボットネットとC&Cの仕組みは L5、キルチェーンとラテラルムーブメントは
 * L13、FW/IDS/WAF は L38・L39、パッチ運用は L37 が担当）。
 * シナリオは narration/ipa_sg/sg-L12-dos-targeted.md。
 *
 * 導入（イラスト左右分割）→ DoS（処理容量バーが溢れる）→ DDoS（多対一の集中線図）→
 * 遮断の難しさ（アクセスログ表）→ 標的型 vs ばらまき型（既製vs・wipe-lightで章転換）→
 * APT（横タイムラインの潜伏帯）→ 水飲み場型（3ノード情景）→ ゼロデイ（数字ドン）→
 * 機能の悪用（カード3枚）→ クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ「DoS」「DDoS」「APT」を
 *   「ドス」「ディードス」「エーピーティー」と仮名書きしている（DoS=ドス / DDoS=ディードス が正しい読み）。
 *   字幕（下の N() 第2引数）は略語表記が正で、初出の1回だけ「DoS（ドス）」のように読みを添える
 *   （references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L12-dos-targeted");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "前回までは、通信に割り込んで盗み見る攻撃を見てきました。"),
  N("s02-2.mp3", "今回は、目的の違う二種類の攻撃を扱います。"),
  N("s02-3.mp3", "サービスを止める攻撃と、特定の相手だけを狙い撃つ攻撃です。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "まずは、DoS（ドス）攻撃です。"), // 初出なので読みを添える
  N("s03-2.mp3", "大量の要求を送りつけて、サーバを処理しきれない状態にします。"),
  N("s03-3.mp3", "行列が長すぎて、本来のお客さんが店に入れない状態です。"),
  N("s03-4.mp3", "データを壊すわけではなく、使えなくするのが狙いです。"),
  N("s03-5.mp3", "つまり、情報セキュリティの可用性を奪う攻撃です。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "これを大勢で一斉にやるのが、DDoS（ディードス）攻撃です。"), // 初出なので読みを添える
  N("s04-2.mp3", "攻撃者は、あらかじめ乗っ取った大量の端末を踏み台にします。"),
  N("s04-3.mp3", "世界中の端末から同時に要求が届くので、量が桁違いになります。"),
  N("s04-4.mp3", "送り元が散らばっているため、発信元を止めるのも簡単ではありません。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "DDoSがやっかいなのは、遮断の判断が難しいところです。"),
  N("s05-2.mp3", "届く要求は、正規の利用者のものとまったく同じ形をしています。"),
  N("s05-3.mp3", "まとめて遮断すると、本物のお客さんまで締め出してしまいます。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "ここからは、狙い撃ちの攻撃に移ります。"),
  N("s06-2.mp3", "標的型攻撃は、特定の組織だけを狙って仕掛けられます。"),
  N("s06-3.mp3", "無差別にばらまくメールと違い、業務のやり取りに見えるよう作り込まれます。"),
  N("s06-4.mp3", "取引先を装った実在しそうな件名なので、迷惑メールとして弾けません。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "標的型攻撃の中でも、長期戦を仕掛けるものをAPTと呼びます。"),
  N("s07-2.mp3", "侵入したあと、すぐには動かず、気づかれないように潜みます。"),
  N("s07-3.mp3", "数か月から数年かけて、社内の情報を少しずつ集めていきます。"),
  N("s07-4.mp3", "だから、入られない前提ではなく、入られた前提で備える必要があります。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "もうひとつが、水飲み場型攻撃です。"),
  N("s08-2.mp3", "動物が集まる水場で獲物を待ち伏せる姿から、この名前がついています。"),
  N("s08-3.mp3", "標的の社員がよく見るサイトを、先回りして改ざんしておきます。"),
  N("s08-4.mp3", "いつもどおり開いただけの人が感染するので、警戒しようがありません。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "攻撃の側が一歩先を行く例が、ゼロデイ攻撃です。"),
  N("s09-2.mp3", "修正プログラムが公開される日を、ゼロ日目と数えます。"),
  N("s09-3.mp3", "その日より前に突かれる攻撃なので、当てる修正がまだ存在しません。"),
  N("s09-4.mp3", "更新をきちんとしていても、防ぎきれない攻撃があるということです。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "最後に、サービスやソフトウェアの機能の悪用です。"),
  N("s10-2.mp3", "欠陥ではなく、もともと備わっている正規の機能がそのまま使われます。"),
  N("s10-3.mp3", "脆弱性がなくても成立するので、修正プログラムでは塞げません。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "DDoS攻撃が、単純なDoS攻撃より防ぎにくいのはなぜでしょうか。"),
  N("s12-3.mp3", "正解は、正規の利用者からの要求と見分けがつかないからです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "標的型攻撃が、ふつうの迷惑メール対策をすり抜けるのはなぜでしょうか。"),
  N("s13-3.mp3", "正解は、業務のメールに見えるよう作り込まれているからです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "修正プログラムが公開される前に突かれる攻撃は、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、ゼロデイ攻撃です。", { gapBeforeSec: 1.8 }),
];

const SEG_P15 = [
  N("s15-1.mp3", "DoS攻撃とDDoS攻撃は、サービスを止めて可用性を奪います。"),
  N("s15-2.mp3", "標的型攻撃は業務メールを装い、APTは長く潜みます。"),
  N("s15-3.mp3", "ゼロデイや機能の悪用は、修正プログラムだけでは防げません。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// 共有の小部品
// ---------------------------------------------------------------------------

/** 向きを自由に選べる矢じり（アイコンフォントに依存しない） */
const Chevron: React.FC<{ dir: "right" | "down"; size: number }> = ({ dir, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: "none" }}
  >
    <path d={dir === "right" ? "M7 4.5l6 5.5-6 5.5" : "M4.5 7l5.5 6 5.5-6"} />
  </svg>
);

/** 各ページ下部の結論バンド（画面の要点。字幕と同じ文は書かない） */
const Conclusion: React.FC<{ atSec: number; children: React.ReactNode }> = ({ atSec, children }) => {
  const appear = useAppear(atSec);
  return (
    <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, textAlign: "center", ...appear }}>
      {children}
    </span>
  );
};

// ---------------------------------------------------------------------------
// P2: 導入 — 止める攻撃と、狙い撃つ攻撃
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const lead = useAppear(0.3);
  const sub = useAppear(segStart(SEG_P2, 1));
  const theme = usePop(segStart(SEG_P2, 2));
  const illust = useAppear(0.6);

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.4, ...lead }}>
            みんなを<span style={markerStyle}>止める</span>か
            <br />
            あなただけを<span style={markerPinkStyle}>狙う</span>か
          </span>
          <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...sub }}>
            広く浅く、と、狭く深く
          </span>
          <span
            style={{
              alignSelf: "flex-start",
              padding: `${5 * SCALE}px ${11 * SCALE}px`,
              borderRadius: 9 * SCALE,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary300}`,
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              whiteSpace: "nowrap",
              ...theme,
            }}
          >
            今回：目的の違う2種類
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/attack-dos.png")}
          style={{
            flex: 1,
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
// P3: DoS攻撃 — 処理能力を超えさせて「使えなくする」
// ---------------------------------------------------------------------------

/** 押し寄せる要求チップ（小さな四角が次々に積まれる） */
const RequestChip: React.FC<{ delaySec: number }> = ({ delaySec }) => {
  const pop = usePop(delaySec, { durSec: 0.3 });
  return (
    <span
      style={{
        width: 13 * SCALE,
        height: 9 * SCALE,
        borderRadius: 3 * SCALE,
        backgroundColor: colors.accentPinkSoft,
        border: `${1 * SCALE}px solid ${colors.accentPink}`,
        flex: "none",
        ...pop,
      }}
    />
  );
};

const DosScene: React.FC = () => {
  const chips = Array.from({ length: 16 }, (_, i) => i);
  const server = useAppear(0.3, { dy: 10 });
  // バーは2文目の読み上げから伸び、処理限界（60%の位置）を大きく超えて振り切れる
  const fill = useProgress(segStart(SEG_P3, 1), 2.0);
  const limit = useAppear(0.5, { dy: 0 });
  const blocked = usePop(segStart(SEG_P3, 2));

  return (
    <SlideShell
      heading="DoS攻撃（サービス妨害）"
      icon={<Ms name="gpp_bad" size={videoType.slideHeadIcon} />}
      narration={SEG_P3}
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
          gap: 5 * SCALE,
        }}
      >
        {/* 押し寄せる大量の要求 */}
        <span
          style={{
            padding: `${2 * SCALE}px ${8 * SCALE}px`,
            borderRadius: 6 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            color: colors.accentPinkText,
            fontSize: 10.5 * SCALE,
            fontWeight: 800,
            whiteSpace: "nowrap",
            ...limit,
          }}
        >
          押し寄せる大量の要求
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4 * SCALE,
            flexWrap: "wrap",
            justifyContent: "center",
            width: "78%",
          }}
        >
          {chips.map((i) => (
            <RequestChip key={i} delaySec={segStart(SEG_P3, 1) + i * 0.07} />
          ))}
        </div>

        <span style={{ display: "flex", color: colors.accentPink }}>
          <Chevron dir="down" size={12 * SCALE} />
        </span>

        {/* サーバの処理容量バー */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 4 * SCALE,
            padding: `${8 * SCALE}px ${12 * SCALE}px`,
            borderRadius: 13 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...server,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
            <span style={{ display: "flex", color: colors.primary600, flex: "none" }}>
              <Ms name="dns" size={15 * SCALE} />
            </span>
            <b style={{ fontSize: 12 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>サーバの処理能力</b>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                color: colors.textMuted,
                whiteSpace: "nowrap",
                ...limit,
              }}
            >
              縦線が処理限界。超えると応答できない
            </span>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: 9 * SCALE,
              borderRadius: radius.full,
              backgroundColor: colors.primary100,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                width: `${fill * 100}%`,
                backgroundColor: colors.accentPink,
                borderRadius: radius.full,
              }}
            />
            {/* 処理限界のライン */}
            <span
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "60%",
                width: 2 * SCALE,
                backgroundColor: colors.textPrimary,
                ...limit,
              }}
            />
          </div>
        </div>

        {/* 本来の利用者が締め出される */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            padding: `${5 * SCALE}px ${13 * SCALE}px`,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
            ...blocked,
          }}
        >
          <span style={{ display: "flex", color: colors.accentPinkText, flex: "none" }}>
            <Ms name="group" size={15 * SCALE} />
          </span>
          <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, color: colors.accentPinkText, whiteSpace: "nowrap" }}>
            本来の利用者がつながらない
          </b>
        </div>

        <Conclusion atSec={segStart(SEG_P3, 4)}>
          壊さずに<span style={markerPinkStyle}>使えなくする</span>＝可用性への攻撃
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: DDoS攻撃 — 多数の踏み台から一斉に（多対一の集中線図）
// ---------------------------------------------------------------------------

/** 上段に並ぶ踏み台端末 */
const ZombieNode: React.FC<{ delaySec: number }> = ({ delaySec }) => {
  const pop = usePop(delaySec, { durSec: 0.35 });
  return (
    <span
      style={{
        width: 20 * SCALE,
        height: 20 * SCALE,
        borderRadius: 7 * SCALE,
        backgroundColor: colors.accentPinkSurface,
        color: colors.accentPinkText,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
        ...pop,
      }}
    >
      <Ms name="laptop_mac" size={12 * SCALE} />
    </span>
  );
};

const DDOS_COUNT = 7;

const DdosScene: React.FC = () => {
  const nodes = Array.from({ length: DDOS_COUNT }, (_, i) => i);
  const label = useAppear(segStart(SEG_P4, 1), { dy: 0 });
  const server = usePop(0.35);
  const scale = useAppear(segStart(SEG_P4, 2), { dy: 0 });

  // 上端に等間隔で並ぶ端末（x%）から、下端中央のサーバへ収束する線
  const xs = nodes.map((i) => 8 + (i * 84) / (DDOS_COUNT - 1));

  return (
    <SlideShell
      heading="DDoS攻撃（分散型サービス妨害）"
      icon={<Ms name="alt_route" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3 * SCALE,
        }}
      >
        {/* ラベルは端末列の上に横1行でまとめる（図の上に浮かせると線と重なる） */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", gap: 8 * SCALE }}>
          <span
            style={{
              padding: `${2 * SCALE}px ${8 * SCALE}px`,
              borderRadius: 6 * SCALE,
              backgroundColor: colors.accentPinkSurface,
              color: colors.accentPinkText,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              whiteSpace: "nowrap",
              ...label,
            }}
          >
            乗っ取られた大量の端末（踏み台）
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              whiteSpace: "nowrap",
              ...scale,
            }}
          >
            量が桁違いになる
          </span>
        </div>

        {/* 端末列 */}
        <div style={{ position: "relative", width: "100%", height: 20 * SCALE }}>
          {nodes.map((i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${xs[i]}%`,
                top: 0,
                translate: "-50% 0",
              }}
            >
              <ZombieNode delaySec={0.4 + i * 0.12} />
            </span>
          ))}
        </div>

        {/* 収束する線（SVGは線だけ・ノードは div） */}
        <div style={{ position: "relative", flex: 1, minHeight: 0, width: "100%" }}>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            {nodes.map((i) => (
              <DrawPath
                key={i}
                d={`M${xs[i]} 1 L50 38`}
                delaySec={segStart(SEG_P4, 2) + i * 0.09}
                durSec={0.5}
                stroke={colors.accentPink}
                strokeWidth={0.5}
              />
            ))}
          </svg>
        </div>

        {/* 標的のサーバ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            padding: `${5 * SCALE}px ${14 * SCALE}px`,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
            ...server,
          }}
        >
          <span style={{ display: "flex", color: colors.primary600, flex: "none" }}>
            <Ms name="dns" size={15 * SCALE} />
          </span>
          <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>標的のサーバ</b>
        </div>

        <Conclusion atSec={segStart(SEG_P4, 3)}>
          送り元が世界中に散らばり、<span style={markerPinkStyle}>止め方が難しい</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 遮断の難しさ — 攻撃の要求と正規の要求が見分けられない
// ---------------------------------------------------------------------------

const LogRow: React.FC<{ ip: string; req: string; atSec: number }> = ({ ip, req, atSec }) => {
  const appear = useAppear(atSec, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        padding: `${3 * SCALE}px ${11 * SCALE}px`,
        borderRadius: 8 * SCALE,
        backgroundColor: colors.surface,
        border: `${1 * SCALE}px solid ${colors.border}`,
        ...appear,
      }}
    >
      {/* IPは等幅で桁数が揺れるので、いちばん長い行が収まる幅を確保する（狭いと要求列に食い込む） */}
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 10 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
          flex: "none",
          width: 82 * SCALE,
        }}
      >
        {ip}
      </span>
      <span style={{ fontSize: 11 * SCALE, fontWeight: 700, whiteSpace: "nowrap" }}>{req}</span>
      <span
        style={{
          marginLeft: "auto",
          flex: "none",
          padding: `${1 * SCALE}px ${8 * SCALE}px`,
          borderRadius: 6 * SCALE,
          backgroundColor: colors.bg,
          color: colors.textMuted,
          fontSize: 11 * SCALE,
          fontWeight: 800,
        }}
      >
        ？
      </span>
    </div>
  );
};

const DilemmaCard: React.FC<{ icon: string; act: string; result: string; atSec: number }> = ({
  icon,
  act,
  result,
  atSec,
}) => {
  const pop = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7 * SCALE,
        padding: `${5 * SCALE}px ${10 * SCALE}px`,
        borderRadius: 11 * SCALE,
        backgroundColor: colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
        ...pop,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 5 * SCALE, color: colors.accentPinkText, flex: "none" }}>
        <Ms name={icon} size={15 * SCALE} />
        <b style={{ fontSize: 12 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{act}</b>
      </span>
      <span style={{ fontSize: 10 * SCALE, fontWeight: 700, color: colors.textSecondary, whiteSpace: "nowrap" }}>
        {result}
      </span>
    </div>
  );
};

const IndistinguishableScene: React.FC = () => {
  const head = useAppear(0.3, { dy: 0 });
  // 4行にすると見出しと重なるので3行まで（本文領域の高さは telop 帯のぶん狭い）
  const rows = [
    { ip: "203.0.113.4", req: "商品ページを開く" },
    { ip: "198.51.100.22", req: "商品ページを開く" },
    { ip: "192.0.2.87", req: "商品ページを開く" },
  ];

  return (
    <SlideShell
      heading="どれが攻撃か、見分けられない"
      icon={<Ms name="search" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE, padding: `0 ${11 * SCALE}px`, ...head }}>
          <span style={{ fontSize: 10 * SCALE, fontWeight: 800, color: colors.textMuted, flex: "none", width: 82 * SCALE }}>
            送信元
          </span>
          <span style={{ fontSize: 10 * SCALE, fontWeight: 800, color: colors.textMuted }}>要求の内容</span>
          <span style={{ marginLeft: "auto", fontSize: 10 * SCALE, fontWeight: 800, color: colors.textMuted }}>
            攻撃か正規か
          </span>
        </div>

        {rows.map((r, i) => (
          <LogRow key={r.ip} ip={r.ip} req={r.req} atSec={segStart(SEG_P5, 1) + i * 0.25} />
        ))}

        <div style={{ display: "flex", alignItems: "stretch", gap: 6 * SCALE }}>
          <DilemmaCard
            icon="lock"
            act="まとめて遮断"
            result="本物の客も入れない"
            atSec={segStart(SEG_P5, 2)}
          />
          <DilemmaCard
            icon="lock_open"
            act="そのまま通す"
            result="サーバが止まる"
            atSec={segStart(SEG_P5, 2) + 0.5}
          />
        </div>

        <Conclusion atSec={segStart(SEG_P5, 2) + 1.4}>
          防ぐ側は、<span style={markerPinkStyle}>切るに切れない</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: APT（持続的標的型攻撃）— 侵入したあと、長く潜む
// ---------------------------------------------------------------------------

/** 潜伏帯の中で少しずつ進む情報収集の点 */
const LurkDot: React.FC<{ leftPct: number; atSec: number }> = ({ leftPct, atSec }) => {
  const pop = usePop(atSec, { durSec: 0.35 });
  return (
    <span
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top: "50%",
        translate: "-50% -50%",
      }}
    >
      <span
        style={{
          display: "block",
          width: 10 * SCALE,
          height: 10 * SCALE,
          borderRadius: radius.full,
          backgroundColor: colors.accentPink,
          ...pop,
        }}
      />
    </span>
  );
};

const MilestoneNode: React.FC<{ icon: string; label: string; atSec: number }> = ({ icon, label, atSec }) => {
  const pop = usePop(atSec);
  return (
    <div
      style={{
        flex: "none",
        width: 58 * SCALE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        ...pop,
      }}
    >
      <span
        style={{
          width: 38 * SCALE,
          height: 38 * SCALE,
          borderRadius: 13 * SCALE,
          backgroundColor: colors.accentPinkSurface,
          color: colors.accentPinkText,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={21 * SCALE} />
      </span>
      <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
    </div>
  );
};

const AptScene: React.FC = () => {
  const band = useProgress(segStart(SEG_P7, 1), 1.6);
  const period = useAppear(segStart(SEG_P7, 2), { dy: 0 });

  return (
    <SlideShell
      heading="APT（持続的標的型攻撃）"
      icon={<Ms name="schedule" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
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
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <MilestoneNode icon="key" label="侵入" atSec={0.4} />

          {/* 潜伏の帯（長さが「時間の長さ」を語る） */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 * SCALE }}>
            <span
              style={{
                alignSelf: "center",
                fontSize: 20 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
                whiteSpace: "nowrap",
                ...period,
              }}
            >
              数か月〜数年
            </span>
            <div
              style={{
                position: "relative",
                height: 22 * SCALE,
                borderRadius: radius.full,
                backgroundColor: colors.primary100,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${band * 100}%`,
                  backgroundColor: colors.accentPinkSurface,
                  borderRadius: radius.full,
                }}
              />
              <LurkDot leftPct={22} atSec={segStart(SEG_P7, 2)} />
              <LurkDot leftPct={44} atSec={segStart(SEG_P7, 2) + 0.5} />
              <LurkDot leftPct={66} atSec={segStart(SEG_P7, 2) + 1.0} />
              <LurkDot leftPct={88} atSec={segStart(SEG_P7, 2) + 1.5} />
            </div>
            <span
              style={{
                alignSelf: "center",
                fontSize: 11.5 * SCALE,
                fontWeight: 700,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
              気づかれないように潜み、情報を少しずつ集める
            </span>
          </div>

          <MilestoneNode icon="cloud_upload" label="持ち出し" atSec={segStart(SEG_P7, 2) + 1.4} />
        </div>

        <Conclusion atSec={segStart(SEG_P7, 3)}>
          <span style={markerStyle}>入られた前提</span>で備える発想へ
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 水飲み場型攻撃 — 標的がよく見るサイトで待ち伏せる
// ---------------------------------------------------------------------------

const WateringHoleScene: React.FC = () => {
  const attacker = useAppear(0.4, { dy: 0 });
  const site = usePop(0.6);
  const tampered = usePop(segStart(SEG_P8, 2));
  const visitor = useAppear(segStart(SEG_P8, 3), { dy: 0 });

  return (
    <SlideShell
      heading="水飲み場型攻撃"
      icon={<Ms name="travel_explore" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
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
          gap: 4 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: 3 * SCALE }}>
          {/* 攻撃者：先回りして改ざん */}
          <div style={{ flex: "none", width: 86 * SCALE, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 * SCALE, ...attacker }}>
            <Img
              src={staticFile("images/ipa_sg/person-attacker-sneak.png")}
              style={{ height: 60 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
            />
            <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, color: colors.accentPinkText, whiteSpace: "nowrap" }}>
              先回りして改ざん
            </b>
          </div>

          <span style={{ display: "flex", color: colors.accentPink, flex: "none" }}>
            <Chevron dir="right" size={13 * SCALE} />
          </span>

          {/* 標的がよく見るサイト */}
          <div
            style={{
              flex: "none",
              // バッジ「改ざん済み・待ち伏せ」が収まる幅を確保する（狭いと文字が枠から出る）
              width: 140 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
              padding: `${9 * SCALE}px ${8 * SCALE}px`,
              borderRadius: 13 * SCALE,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              ...site,
            }}
          >
            <Img
              src={staticFile("images/ipa_sg/icon-browser.png")}
              style={{ height: 42 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
            />
            <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>いつも見ているサイト</b>
            <span
              style={{
                padding: `${2 * SCALE}px ${8 * SCALE}px`,
                borderRadius: 6 * SCALE,
                backgroundColor: colors.accentPinkSurface,
                color: colors.accentPinkText,
                fontSize: 10 * SCALE,
                fontWeight: 800,
                whiteSpace: "nowrap",
                ...tampered,
              }}
            >
              改ざん済み・待ち伏せ
            </span>
          </div>

          <span style={{ display: "flex", color: colors.textMuted, flex: "none", ...visitor }}>
            <Chevron dir="right" size={13 * SCALE} />
          </span>

          {/* いつもどおり訪れる社員 */}
          <div style={{ flex: "none", width: 86 * SCALE, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 * SCALE, ...visitor }}>
            <Img
              src={staticFile("images/ipa_sg/person-employee-m-laptop.png")}
              style={{ height: 60 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
            />
            <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>いつもどおり訪問</b>
          </div>
        </div>

        <Conclusion atSec={segStart(SEG_P8, 3) + 1.2}>
          開いただけで感染。<span style={markerPinkStyle}>警戒しようがない</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: ゼロデイ攻撃 — 修正が公開される「0日目」より前（数字ドン）
// ---------------------------------------------------------------------------

const ZeroDayScene: React.FC = () => {
  const chip = useAppear(0.3, { dy: 0 });
  const zero = usePop(segStart(SEG_P9, 1), { from: 0.4, durSec: 0.6 });
  const caption = useAppear(segStart(SEG_P9, 1) + 0.6, { dy: 0 });

  return (
    <SlideShell narration={SEG_P9}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2 * SCALE,
        }}
      >
        <span
          style={{
            padding: `${3 * SCALE}px ${12 * SCALE}px`,
            borderRadius: radius.full,
            backgroundColor: colors.primary50,
            color: colors.primary600,
            fontSize: 12 * SCALE,
            fontWeight: 800,
            whiteSpace: "nowrap",
            ...chip,
          }}
        >
          ゼロデイ攻撃
        </span>

        <div style={{ display: "flex", alignItems: "baseline", gap: 4 * SCALE, ...zero }}>
          <span
            style={{
              fontSize: 56 * SCALE,
              fontWeight: 800,
              lineHeight: 1.05,
              color: colors.accentPinkText,
            }}
          >
            0
          </span>
          <span style={{ fontSize: 18 * SCALE, fontWeight: 800, color: colors.accentPinkText }}>日目</span>
        </div>

        <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...caption }}>
          ＝ 修正プログラムが公開される日
        </span>

        <Conclusion atSec={segStart(SEG_P9, 2)}>
          それより前の攻撃には、<span style={markerPinkStyle}>当てる修正がまだ無い</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 機能の悪用 — 脆弱性がなくても成立する
// ---------------------------------------------------------------------------

const AbuseCard: React.FC<{ icon: string; title: string; body: string; tone: "plain" | "attack"; atSec: number }> = ({
  icon,
  title,
  body,
  tone,
  atSec,
}) => {
  const pop = usePop(atSec);
  const attack = tone === "attack";
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${10 * SCALE}px ${7 * SCALE}px`,
        borderRadius: 13 * SCALE,
        backgroundColor: attack ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${attack ? colors.accentPink : colors.border}`,
        ...pop,
      }}
    >
      <span
        style={{
          width: 32 * SCALE,
          height: 32 * SCALE,
          borderRadius: 12 * SCALE,
          backgroundColor: attack ? colors.surface : colors.primary50,
          color: attack ? colors.accentPinkText : colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <b
        style={{
          fontSize: 13 * SCALE,
          fontWeight: 800,
          color: attack ? colors.accentPinkText : colors.textPrimary,
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </b>
      <span
        style={{
          fontSize: 10.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {body}
      </span>
    </div>
  );
};

const FeatureAbuseScene: React.FC = () => (
  <SlideShell
    heading="サービス・ソフトウェアの機能の悪用"
    icon={<Ms name="settings" size={videoType.slideHeadIcon} />}
    narration={SEG_P10}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 7 * SCALE,
      }}
    >
      <div style={{ display: "flex", alignItems: "stretch", gap: 7 * SCALE }}>
        <AbuseCard
          icon="build"
          title="正規の機能"
          body="もともと備わっている"
          tone="plain"
          atSec={0.4}
        />
        <AbuseCard
          icon="gpp_bad"
          title="そのまま悪用"
          body="使い道だけを変える"
          tone="attack"
          atSec={segStart(SEG_P10, 1)}
        />
        <AbuseCard
          icon="cancel"
          title="修正では塞げない"
          body="直すべき欠陥が無い"
          tone="attack"
          atSec={segStart(SEG_P10, 2)}
        />
      </div>

      <Conclusion atSec={segStart(SEG_P10, 2) + 1.2}>
        <span style={markerStyle}>脆弱性がなくても</span>成立する攻撃がある
      </Conclusion>
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// クイズ幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL12DosTargeted: VideoSpec = {
  id: "sg-L12-dos-targeted",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "止める攻撃と、\n狙い撃つ攻撃",
      keywords: ["DDoS", "標的型", "ゼロデイ"],
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
      name: "dos",
      durationSec: 8,
      narration: SEG_P3,
      component: DosScene,
    },
    {
      pattern: "custom",
      name: "ddos",
      durationSec: 8,
      narration: SEG_P4,
      component: DdosScene,
    },
    {
      pattern: "custom",
      name: "indistinguishable",
      durationSec: 7,
      narration: SEG_P5,
      component: IndistinguishableScene,
    },
    {
      pattern: "vs",
      heading: "ばらまき型と標的型",
      icon: "mail",
      left: {
        title: "ばらまき型",
        icon: "campaign",
        rows: [
          { k: "宛先", v: "誰でもいい・無差別" },
          { k: "文面", v: "不特定向けで作りが雑" },
          { k: "対策", v: "迷惑メールとして弾ける" },
        ],
      },
      right: {
        title: "標的型",
        icon: "target",
        rows: [
          { k: "宛先", v: "特定の組織だけ" },
          { k: "文面", v: "業務のやり取りに偽装" },
          { k: "対策", v: "弾く材料がない" },
        ],
      },
      // ナレーションは「標的型（文2）→ ばらまきと違い（文3）」の順に話すので、右列が先に出る
      columnAtSec: [segStart(SEG_P6, 2), segStart(SEG_P6, 1)],
      narration: SEG_P6,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "apt",
      durationSec: 8,
      narration: SEG_P7,
      component: AptScene,
    },
    {
      pattern: "custom",
      name: "watering-hole",
      durationSec: 7,
      narration: SEG_P8,
      component: WateringHoleScene,
    },
    {
      pattern: "custom",
      name: "zero-day",
      durationSec: 7,
      narration: SEG_P9,
      component: ZeroDayScene,
    },
    {
      pattern: "custom",
      name: "feature-abuse",
      durationSec: 6,
      narration: SEG_P10,
      component: FeatureAbuseScene,
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
      question: "DDoSが防ぎにくい理由は？",
      choices: [
        { key: "A", text: "通信が暗号化されているから" },
        { key: "B", text: "正規の要求と見分けがつかない", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "標的型がメール対策をすり抜けるのは",
      choices: [
        { key: "A", text: "業務メールに見えるから", correct: true },
        { key: "B", text: "無差別に大量送信するから" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "修正の公開前に突かれる攻撃は？",
      choices: [
        { key: "A", text: "水飲み場型攻撃" },
        { key: "B", text: "ゼロデイ攻撃", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "DoS・DDoSは可用性を奪う攻撃", checkAtSec: segStart(SEG_P15, 0) },
        { text: "標的型は業務メールを装い、APTは長く潜む", checkAtSec: segStart(SEG_P15, 1) },
        { text: "ゼロデイと機能の悪用は修正では防げない", checkAtSec: segStart(SEG_P15, 2) },
      ],
      narration: SEG_P15,
      transitionIn: "wipe",
    },
  ],
};
