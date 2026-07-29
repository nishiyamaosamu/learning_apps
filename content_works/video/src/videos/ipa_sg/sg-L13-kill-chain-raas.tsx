import React from "react";
import { Img, interpolateColors, staticFile } from "remotion";
import { colors, fontMono, markerStyle, markerPinkStyle, radius, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L13-kill-chain-raas.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L13: 攻撃の手順とビジネス化
 *
 * 発注書 content_works/ipa_sg/orders/L13.md に対応（サイバーキルチェーン・フットプリンティング／
 * ポートスキャン・ラテラルムーブメント・どの段階でも止められる・RaaS・リークサイト・
 * ハクティビズム／サイバーテロリズム）。不正のトライアングルと攻撃者の種類・ダークウェブは L6、
 * 個々の攻撃手法の詳細は L7〜L12、ペネトレーションテストは L33、CSIRT は L30 が担当。
 * シナリオは narration/ipa_sg/sg-L13-kill-chain-raas.md。
 *
 * 導入（左右分割イラスト）→ キルチェーン（flow 4段・背骨）→ 偵察（公開情報カード＋ポート一覧）→
 * ラテラルムーブメント（端末グリッドに感染が伝播＋権限バー）→ 断てば止まる（縦4段の鎖＋遮断線）→
 * RaaS（商品カード＋分業・wipe-lightで章転換）→ リークサイト（単一パネル大写し）→
 * ハクティビズム vs サイバーテロリズム（既製vs）→ クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ「RaaS」を「ラース」と
 *   仮名書きしている（s07-3 / s12-2 / s14-3）。字幕（下の N() 第2引数）は「RaaS」表記が正。
 *   音声と原稿が食い違って見えるが意図的（references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L13-kill-chain-raas");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "前回まで、いろいろな攻撃の手口を見てきました。"),
  N("s02-2.mp3", "でも実際の攻撃は、いきなり仕掛けられるわけではありません。"),
  N("s02-3.mp3", "攻撃者は決まった段取りを踏んで、じわじわと近づいてきます。"),
  N("s02-4.mp3", "今回は、その手順と、攻撃が商売になっている現実を見ていきます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "攻撃の流れを段階に分けて整理したものが、サイバーキルチェーンです。"),
  N("s03-2.mp3", "最初は偵察です。標的を調べ、狙いどころを探します。"),
  N("s03-3.mp3", "次が侵入。メールや脆弱性を突いて、内部に入り込みます。"),
  N("s03-4.mp3", "そして内部活動。権限を広げ、目的の情報を探し回ります。"),
  N("s03-5.mp3", "最後が目的実行。情報の持ち出しや、暗号化による妨害を行います。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "最初の偵察を、もう少し詳しく見てみましょう。"),
  N("s04-2.mp3", "公開されている情報を集めることを、フットプリンティングと呼びます。"),
  N("s04-3.mp3", "会社のサイトや採用情報から、使っている機器や体制が読み取れます。"),
  N("s04-4.mp3", "さらにポートスキャンで、どの入口が開いているかを調べます。"),
  N("s04-5.mp3", "攻撃が始まる前に、下調べはもう終わっているのです。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "侵入に成功した攻撃者が次に行うのが、ラテラルムーブメントです。"),
  N("s05-2.mp3", "内部を横に移動していく動き、という意味の言葉です。"),
  N("s05-3.mp3", "入り込んだ一台を足がかりに、隣の端末やサーバへ広がっていきます。"),
  N("s05-4.mp3", "移動しながら、より強い権限を少しずつ手に入れていきます。"),
  N("s05-5.mp3", "だから、一台の感染で終わりだと考えてはいけないのです。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "ここまでの話には、守る側にとってよい面もあります。"),
  N("s06-2.mp3", "攻撃が鎖のようにつながっているなら、どこか一つ切れば止まります。"),
  N("s06-3.mp3", "偵察で気づければ理想ですが、内部活動の段階で見つけても被害は防げます。"),
  N("s06-4.mp3", "一つ破られても次で止める、という多層防御の考え方につながります。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "ここからは、攻撃してくる側の事情に目を向けます。"),
  N("s07-2.mp3", "いまの攻撃は、組織的な商売として成り立っています。"),
  N("s07-3.mp3", "その象徴が、RaaS、ランサムウェア・アズ・ア・サービスです。"),
  N("s07-4.mp3", "ランサムウェアが道具として売られ、使い方の支援まで付いてきます。"),
  N("s07-5.mp3", "その結果、高い技術を持たない人でも、攻撃する側に回れてしまいます。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "商売を支えるもう一つの仕組みが、リークサイトです。"),
  N("s08-2.mp3", "盗んだデータを、実際に公開するための場所です。"),
  N("s08-3.mp3", "払わなければ本当に公開されると分かるので、脅しに重みが出ます。"),
  N("s08-4.mp3", "前に学んだ二重脅迫は、この場所があって初めて成り立ちます。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "最後に、金銭以外の動機も押さえておきましょう。"),
  N("s09-2.mp3", "ハクティビズムは、政治的、社会的な主張のための攻撃です。"),
  N("s09-3.mp3", "抗議の手段として、サイトの改ざんやサービス妨害が行われます。"),
  N("s09-4.mp3", "サイバーテロリズムは、社会機能そのものの破壊をねらう攻撃です。"),
  N("s09-5.mp3", "電力や交通など、生活に直結する仕組みが標的になります。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "一台の感染を軽く見てはいけないのは、なぜでしょうか。"),
  N("s11-3.mp3", "正解は、内部を横に移動して被害が広がるからです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "RaaSが広がると、どんなことが起きるでしょうか。"),
  N("s12-3.mp3", "正解は、技術のない人でも攻撃できるようになる、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "攻撃を段階に分けて考える利点は、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、どこか一つの段階を断てば止められる、です。", { gapBeforeSec: 1.8 }),
];

const SEG_P14 = [
  N("s14-1.mp3", "攻撃は、偵察、侵入、内部活動、目的実行という段取りで進みます。"),
  N("s14-2.mp3", "鎖のどこか一つを断てば、被害は止められます。"),
  N("s14-3.mp3", "RaaSやリークサイトによって、攻撃はビジネスとして広がっています。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// 共有の小部品
// ---------------------------------------------------------------------------

/** 各ページ下部の結論バンド（画面の要点。字幕と同じ文は書かない） */
const Conclusion: React.FC<{ atSec: number; children: React.ReactNode }> = ({ atSec, children }) => {
  const appear = useAppear(atSec);
  return (
    <span style={{ fontSize: 13.5 * SCALE, fontWeight: 800, textAlign: "center", ...appear }}>
      {children}
    </span>
  );
};

/** 小さな見出しチップ（ブロックの題） */
const BlockChip: React.FC<{ label: string; atSec: number; tone?: "blue" | "pink" }> = ({
  label,
  atSec,
  tone = "blue",
}) => {
  const appear = useAppear(atSec, { dy: 0 });
  const pink = tone === "pink";
  return (
    <span
      style={{
        alignSelf: "flex-start",
        padding: `${2.5 * SCALE}px ${9 * SCALE}px`,
        borderRadius: 7 * SCALE,
        backgroundColor: pink ? colors.accentPinkSurface : colors.primary50,
        color: pink ? colors.accentPinkText : colors.primary600,
        fontSize: 11 * SCALE,
        fontWeight: 800,
        whiteSpace: "nowrap",
        ...appear,
      }}
    >
      {label}
    </span>
  );
};

// ---------------------------------------------------------------------------
// P2: 導入 — 攻撃は一発勝負ではなく、段取りのある工程
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const lead = useAppear(0.3);
  const sub = useAppear(segStart(SEG_P2, 2));
  const theme = usePop(segStart(SEG_P2, 3));
  const illust = useAppear(0.6);

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          {/* 1行8文字まで（22×SCALE では9文字以上で折り返して3行になる） */}
          <span style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.4, ...lead }}>
            <span style={markerStyle}>一発勝負</span>ではなく
            <br />
            <span style={markerPinkStyle}>段取り</span>のある工程
          </span>
          <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...sub }}>
            攻撃者は順番に、じわじわ近づいてくる
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
            今回：攻撃の手順と、その裏の商売
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-attacker-sneak.png")}
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
// P4: 偵察 — フットプリンティングとポートスキャン
// ---------------------------------------------------------------------------

const SourceRow: React.FC<{ icon: string; label: string; found: string; atSec: number }> = ({
  icon,
  label,
  found,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${4.5 * SCALE}px ${9 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: colors.surface,
        border: `${1 * SCALE}px solid ${colors.border}`,
        ...appear,
      }}
    >
      <span style={{ display: "flex", color: colors.primary600, flex: "none" }}>
        <Ms name={icon} size={15 * SCALE} />
      </span>
      <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap", flex: "none" }}>{label}</b>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 10 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {found}
      </span>
    </div>
  );
};

const PortRow: React.FC<{ port: string; use: string; open: boolean; atSec: number }> = ({
  port,
  use,
  open,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7 * SCALE,
        padding: `${4.5 * SCALE}px ${9 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: open ? colors.accentPinkSurface : colors.surface,
        border: `${1 * SCALE}px solid ${open ? colors.accentPink : colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
          flex: "none",
          width: 26 * SCALE,
        }}
      >
        {port}
      </span>
      <span style={{ fontSize: 11 * SCALE, fontWeight: 700, whiteSpace: "nowrap" }}>{use}</span>
      <span
        style={{
          marginLeft: "auto",
          flex: "none",
          padding: `${1 * SCALE}px ${7 * SCALE}px`,
          borderRadius: 6 * SCALE,
          backgroundColor: open ? colors.surface : colors.bg,
          color: open ? colors.accentPinkText : colors.textMuted,
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          whiteSpace: "nowrap",
        }}
      >
        {open ? "開いている" : "閉じている"}
      </span>
    </div>
  );
};

const ReconScene: React.FC = () => {
  const magnifier = usePop(0.4);
  const recon = segStart(SEG_P4, 1);
  const scan = segStart(SEG_P4, 3);

  return (
    <SlideShell
      heading="偵察 — 攻撃が始まる前の下調べ"
      icon={<Ms name="search" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
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
        <div style={{ display: "flex", alignItems: "stretch", gap: 9 * SCALE }}>
          {/* 左：フットプリンティング（公開情報の収集） */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 * SCALE }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE }}>
              <BlockChip label="フットプリンティング" atSec={recon} />
              <Img
                src={staticFile("images/ipa_sg/icon-magnifier.png")}
                style={{ height: 26 * SCALE, objectFit: "contain", mixBlendMode: "multiply", ...magnifier }}
              />
            </div>
            <SourceRow icon="language" label="会社のサイト" found="→ 使っている機器" atSec={segStart(SEG_P4, 2)} />
            <SourceRow icon="badge" label="採用情報" found="→ 体制・技術" atSec={segStart(SEG_P4, 2) + 0.35} />
            <SourceRow icon="campaign" label="プレスリリース" found="→ 取引先" atSec={segStart(SEG_P4, 2) + 0.7} />
          </div>

          {/* 右：ポートスキャン（どの入口が開いているか） */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 * SCALE }}>
            <BlockChip label="ポートスキャン" atSec={scan} tone="pink" />
            <PortRow port="22" use="遠隔操作" open atSec={scan + 0.2} />
            <PortRow port="80" use="Web公開" open atSec={scan + 0.45} />
            <PortRow port="445" use="ファイル共有" open={false} atSec={scan + 0.7} />
          </div>
        </div>

        <Conclusion atSec={segStart(SEG_P4, 4)}>
          公開情報と入口の確認だけで、<span style={markerPinkStyle}>ここまで分かる</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: ラテラルムーブメント — 1台から横へ広がり、権限も上がる
// ---------------------------------------------------------------------------

/** 感染が伝播する端末セル（感染時刻で地の色が変わる） */
const DeviceCell: React.FC<{ icon: string; label: string; infectAtSec: number }> = ({
  icon,
  label,
  infectAtSec,
}) => {
  const appear = usePop(0.3, { durSec: 0.35 });
  const infected = useProgress(infectAtSec, 0.4);
  const bg = interpolateColors(infected, [0, 1], [colors.surface, colors.accentPinkSurface]);
  const bd = interpolateColors(infected, [0, 1], [colors.border, colors.accentPink]);
  const fg = interpolateColors(infected, [0, 1], [colors.textMuted, colors.accentPinkText]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          width: "100%",
          height: 24 * SCALE,
          borderRadius: 9 * SCALE,
          backgroundColor: bg,
          border: `${1.5 * SCALE}px solid ${bd}`,
          color: fg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={15 * SCALE} />
      </span>
      <span
        style={{
          fontSize: 9 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
          height: 10 * SCALE,
        }}
      >
        {label}
      </span>
    </div>
  );
};

const LATERAL_CELLS: { icon: string; label: string }[] = [
  { icon: "key", label: "侵入口" },
  { icon: "laptop_mac", label: "" },
  { icon: "laptop_mac", label: "" },
  { icon: "laptop_mac", label: "" },
  { icon: "laptop_mac", label: "" },
  { icon: "laptop_mac", label: "" },
  { icon: "laptop_mac", label: "" },
  { icon: "laptop_mac", label: "" },
  { icon: "laptop_mac", label: "" },
  { icon: "dns", label: "重要サーバ" },
];

const LateralMovementScene: React.FC = () => {
  const spread = segStart(SEG_P5, 2);
  const privBar = useProgress(segStart(SEG_P5, 3), 1.6);
  const privLabel = useAppear(segStart(SEG_P5, 3), { dy: 0 });

  return (
    <SlideShell
      heading="ラテラルムーブメント（内部での横移動）"
      icon={<Ms name="swap_horiz" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
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
        <BlockChip label="社内ネットワーク" atSec={0.3} />

        {/* 端末グリッド（2行×5列）— 左上の1台から順に感染が広がる */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            columnGap: 8 * SCALE,
            rowGap: 3 * SCALE,
          }}
        >
          {LATERAL_CELLS.map((c, i) => (
            <DeviceCell
              key={`${c.icon}-${i}`}
              icon={c.icon}
              label={c.label}
              // 侵入口の1台は最初から感染。以降は2文目の読み上げから順に広がる
              infectAtSec={i === 0 ? 0.5 : spread + i * 0.28}
            />
          ))}
        </div>

        {/* 権限の上昇バー */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 * SCALE }}>
          <div style={{ display: "flex", alignItems: "center", ...privLabel }}>
            <span style={{ fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
              一般ユーザーの権限
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
              }}
            >
              管理者の権限
            </span>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 8 * SCALE,
              borderRadius: radius.full,
              backgroundColor: colors.primary100,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                width: `${privBar * 100}%`,
                backgroundColor: colors.accentPink,
                borderRadius: radius.full,
              }}
            />
          </div>
        </div>

        <Conclusion atSec={segStart(SEG_P5, 4)}>
          一台の感染は、<span style={markerPinkStyle}>始まりにすぎない</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: どこか一段階を断てば止まる — 縦の鎖 + 遮断線（多層防御へ接続）
// ---------------------------------------------------------------------------

const ChainStep: React.FC<{
  no: string;
  name: string;
  note: string;
  atSec: number;
  dimAtSec?: number;
}> = ({ no, name, note, atSec, dimAtSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const dim = useProgress(dimAtSec ?? 9999, 0.5);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${5 * SCALE}px ${10 * SCALE}px`,
        borderRadius: 10 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...appear,
        opacity: appear.opacity * (1 - 0.62 * dim),
      }}
    >
      <span
        style={{
          width: 20 * SCALE,
          height: 20 * SCALE,
          borderRadius: radius.full,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        {no}
      </span>
      <b style={{ fontSize: 13 * SCALE, fontWeight: 800, whiteSpace: "nowrap", flex: "none" }}>{name}</b>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 10 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {note}
      </span>
    </div>
  );
};

/** 段と段をつなぐ鎖の縦線 */
const ChainLink: React.FC<{ atSec: number }> = ({ atSec }) => {
  const appear = useAppear(atSec, { dy: 0, durSec: 0.3 });
  return (
    <span
      style={{
        alignSelf: "center",
        width: 2 * SCALE,
        height: 6 * SCALE,
        borderRadius: radius.full,
        backgroundColor: colors.primary300,
        ...appear,
      }}
    />
  );
};

const BreakChainScene: React.FC = () => {
  const cut = segStart(SEG_P6, 2);
  const cutBadge = usePop(cut);
  const conclusion = useAppear(segStart(SEG_P6, 3));

  return (
    <SlideShell
      heading="どこか一段階を断てば、止まる"
      icon={<Ms name="shield" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
    >
      <div style={{ flex: 1, minHeight: 0, marginTop: "2%", display: "flex", alignItems: "center", gap: 10 * SCALE }}>
        {/* 左：縦につながる4段の鎖 */}
        <div style={{ flex: 1.25, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <ChainStep no="1" name="偵察" note="下調べ" atSec={0.35} />
          <ChainLink atSec={0.55} />
          <ChainStep no="2" name="侵入" note="内部へ入り込む" atSec={0.7} />
          <ChainLink atSec={0.9} />
          <ChainStep no="3" name="内部活動" note="権限を広げる" atSec={1.05} />

          {/* 遮断線：ここで断つ */}
          <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE, padding: `${4 * SCALE}px 0` }}>
            <span
              style={{
                flex: 1,
                height: 0,
                borderTop: `${2 * SCALE}px dashed ${colors.accentPink}`,
                ...cutBadge,
              }}
            />
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4 * SCALE,
                padding: `${2 * SCALE}px ${8 * SCALE}px`,
                borderRadius: 7 * SCALE,
                backgroundColor: colors.accentPinkSurface,
                color: colors.accentPinkText,
                fontSize: 11 * SCALE,
                fontWeight: 800,
                whiteSpace: "nowrap",
                flex: "none",
                ...cutBadge,
              }}
            >
              <Ms name="cancel" size={13 * SCALE} />
              ここで断つ
            </span>
            <span
              style={{
                flex: 1,
                height: 0,
                borderTop: `${2 * SCALE}px dashed ${colors.accentPink}`,
                ...cutBadge,
              }}
            />
          </div>

          <ChainStep no="4" name="目的実行" note="起こらない" atSec={1.4} dimAtSec={cut} />
        </div>

        {/* 右：結論カード（多層防御へ接続） */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5 * SCALE,
            padding: `${12 * SCALE}px ${10 * SCALE}px`,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary300}`,
            ...conclusion,
          }}
        >
          <span
            style={{
              width: 34 * SCALE,
              height: 34 * SCALE,
              borderRadius: 12 * SCALE,
              backgroundColor: colors.surface,
              color: colors.primary600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
            }}
          >
            <Ms name="shield" size={20 * SCALE} />
          </span>
          <b style={{ fontSize: 15 * SCALE, fontWeight: 800, textAlign: "center", lineHeight: 1.4 }}>
            断つ場所は
            <br />
            どの段階でもいい
          </b>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              whiteSpace: "nowrap",
            }}
          >
            ＝ 多層防御の考え方
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: RaaS — ランサムウェアが「商品」として売られる
// ---------------------------------------------------------------------------

const IncludedRow: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const appear = useAppear(atSec, { dy: 8 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...appear }}>
      <span style={{ display: "flex", color: colors.accentPinkText, flex: "none" }}>
        <Ms name="task_alt" size={14 * SCALE} />
      </span>
      <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
};

const RoleCard: React.FC<{
  role: string;
  desc: string;
  icon?: string;
  image?: string;
  atSec: number;
}> = ({ role, desc, icon, image, atSec }) => {
  const pop = usePop(atSec);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${7 * SCALE}px ${10 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...pop,
      }}
    >
      {image ? (
        <Img
          src={staticFile(image)}
          style={{ height: 34 * SCALE, objectFit: "contain", mixBlendMode: "multiply", flex: "none" }}
        />
      ) : (
        <span
          style={{
            width: 30 * SCALE,
            height: 30 * SCALE,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.primary50,
            color: colors.primary600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          <Ms name={icon ?? "group"} size={18 * SCALE} />
        </span>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 1 * SCALE, minWidth: 0 }}>
        <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{role}</b>
        <span style={{ fontSize: 10 * SCALE, fontWeight: 700, color: colors.textSecondary, whiteSpace: "nowrap" }}>
          {desc}
        </span>
      </div>
    </div>
  );
};

const RaasScene: React.FC = () => {
  const card = usePop(segStart(SEG_P7, 1));
  const priceTag = usePop(segStart(SEG_P7, 2));
  const items = segStart(SEG_P7, 3);

  return (
    <SlideShell
      heading="攻撃のビジネス化：RaaS"
      icon={<Ms name="sell" size={videoType.slideHeadIcon} />}
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
          gap: 7 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "stretch", gap: 9 * SCALE }}>
          {/* 左：商品カード風 */}
          <div
            style={{
              flex: 1.3,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
              padding: `${9 * SCALE}px ${11 * SCALE}px`,
              borderRadius: 14 * SCALE,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
              ...card,
            }}
          >
            {/* 見出しとバッジを1行に並べるとカード幅（左カラム）を超えるので、2行に分ける */}
            <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE }}>
              <span style={{ display: "flex", color: colors.accentPinkText, flex: "none" }}>
                <Ms name="lock" size={17 * SCALE} />
              </span>
              <b style={{ fontSize: 15 * SCALE, fontWeight: 800, color: colors.accentPinkText, whiteSpace: "nowrap" }}>
                ランサムウェア一式
              </b>
            </div>
            <span
              style={{
                alignSelf: "flex-start",
                padding: `${2 * SCALE}px ${8 * SCALE}px`,
                borderRadius: 7 * SCALE,
                backgroundColor: colors.surface,
                color: colors.accentPinkText,
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                whiteSpace: "nowrap",
                ...priceTag,
              }}
            >
              サービスとして売られている
            </span>
            <IncludedRow label="暗号化のツール一式" atSec={items} />
            <IncludedRow label="リークサイトの利用" atSec={items + 0.3} />
            <IncludedRow label="使い方のサポート" atSec={items + 0.6} />
          </div>

          {/* 右：作る側と使う側の分業 */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 * SCALE }}>
            <RoleCard
              role="作る側"
              desc="専門家が開発・提供"
              image="images/ipa_sg/person-attacker.png"
              atSec={segStart(SEG_P7, 1)}
            />
            <RoleCard role="使う側" desc="高い技術は要らない" icon="group" atSec={segStart(SEG_P7, 4)} />
          </div>
        </div>

        <Conclusion atSec={segStart(SEG_P7, 4) + 1.2}>
          攻撃する側になるための<span style={markerPinkStyle}>敷居が下がった</span>
        </Conclusion>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: リークサイト — 「公開する」を本当にやってみせる場（疎・単一パネル）
// ---------------------------------------------------------------------------

const LeakRow: React.FC<{ name: string; status: string; done: boolean; atSec: number }> = ({
  name,
  status,
  done,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        padding: `${4 * SCALE}px ${11 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: colors.bg,
        border: `${1 * SCALE}px solid ${colors.border}`,
        ...appear,
      }}
    >
      <span style={{ display: "flex", color: colors.textMuted, flex: "none" }}>
        <Ms name="description" size={15 * SCALE} />
      </span>
      <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
      <span
        style={{
          marginLeft: "auto",
          flex: "none",
          padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
          borderRadius: 7 * SCALE,
          backgroundColor: done ? colors.accentPink : colors.accentPinkSurface,
          color: done ? colors.surface : colors.accentPinkText,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          whiteSpace: "nowrap",
        }}
      >
        {status}
      </span>
    </div>
  );
};

const LeakSiteScene: React.FC = () => {
  const panel = usePop(0.35);
  const rows = segStart(SEG_P8, 1);
  const link = useAppear(segStart(SEG_P8, 3), { dy: 0 });

  return (
    <SlideShell narration={SEG_P8}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        <div
          style={{
            width: "82%",
            display: "flex",
            flexDirection: "column",
            gap: 4 * SCALE,
            padding: `${8 * SCALE}px ${12 * SCALE}px ${9 * SCALE}px`,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
            ...panel,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE }}>
            <span style={{ display: "flex", color: colors.accentPinkText, flex: "none" }}>
              <Ms name="public" size={17 * SCALE} />
            </span>
            <b style={{ fontSize: 16 * SCALE, fontWeight: 800, color: colors.accentPinkText, whiteSpace: "nowrap" }}>
              リークサイト
            </b>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                color: colors.textMuted,
                whiteSpace: "nowrap",
              }}
            >
              公開予定リスト
            </span>
          </div>
          <LeakRow name="A社の内部資料" status="公開まで あと3日" done={false} atSec={rows} />
          <LeakRow name="B社の顧客情報" status="公開済み" done atSec={rows + 0.35} />
          <LeakRow name="C社の設計データ" status="公開まで あと7日" done={false} atSec={rows + 0.7} />
        </div>

        <Conclusion atSec={segStart(SEG_P8, 2)}>
          支払いを<span style={markerPinkStyle}>断りにくくする</span>ための仕組み
        </Conclusion>

        <span
          style={{
            padding: `${3 * SCALE}px ${11 * SCALE}px`,
            borderRadius: radius.full,
            backgroundColor: colors.primary50,
            color: colors.primary600,
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            whiteSpace: "nowrap",
            ...link,
          }}
        >
          二重脅迫は、この場所があって成り立つ
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

export const SgL13KillChainRaas: VideoSpec = {
  id: "sg-L13-kill-chain-raas",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "攻撃には手順があり\n商売になっている",
      keywords: ["キルチェーン", "RaaS", "リークサイト"],
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
      pattern: "flow",
      heading: "サイバーキルチェーン（攻撃の4段階）",
      icon: "timeline",
      steps: [
        { abc: "1", name: "偵察", sub: "調べる" },
        { abc: "2", name: "侵入", sub: "入り込む" },
        { abc: "3", name: "内部活動", sub: "広げる" },
        { abc: "4", name: "目的実行", sub: "実行する" },
      ],
      // 各段階を語る文の開始に点灯を合わせる（1文目は全体の導入なので偵察と同じ扱い）
      highlightAtSec: [
        segStart(SEG_P3, 1),
        segStart(SEG_P3, 2),
        segStart(SEG_P3, 3),
        segStart(SEG_P3, 4),
      ],
      narration: SEG_P3,
    },
    {
      pattern: "custom",
      name: "recon",
      durationSec: 8,
      narration: SEG_P4,
      component: ReconScene,
    },
    {
      pattern: "custom",
      name: "lateral-movement",
      durationSec: 8,
      narration: SEG_P5,
      component: LateralMovementScene,
    },
    {
      pattern: "custom",
      name: "break-the-chain",
      durationSec: 7,
      narration: SEG_P6,
      component: BreakChainScene,
    },
    {
      pattern: "custom",
      name: "raas",
      durationSec: 8,
      narration: SEG_P7,
      component: RaasScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "leak-site",
      durationSec: 7,
      narration: SEG_P8,
      component: LeakSiteScene,
    },
    {
      pattern: "vs",
      heading: "金銭以外の動機",
      icon: "campaign",
      left: {
        title: "ハクティビズム",
        icon: "record_voice_over",
        rows: [
          { k: "目的", v: "政治的・社会的な主張" },
          { k: "手口", v: "改ざん・サービス妨害" },
          { k: "位置づけ", v: "抗議の手段としての攻撃" },
        ],
      },
      right: {
        title: "サイバーテロリズム",
        icon: "warning",
        rows: [
          { k: "目的", v: "社会機能そのものの破壊" },
          { k: "手口", v: "重要インフラへの攻撃" },
          { k: "位置づけ", v: "生活に直接被害が及ぶ" },
        ],
      },
      columnAtSec: [segStart(SEG_P9, 1), segStart(SEG_P9, 3)],
      narration: SEG_P9,
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
      question: "1台の感染を軽く見てはいけない理由",
      choices: [
        { key: "A", text: "感染はその1台で必ず止まるから" },
        { key: "B", text: "横に移動して被害が広がるから", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "RaaSが広がると何が起きる？",
      choices: [
        { key: "A", text: "技術がなくても攻撃できる", correct: true },
        { key: "B", text: "攻撃に高度な技術が必要になる" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "攻撃を段階に分けて考える利点は？",
      choices: [
        { key: "A", text: "攻撃者の動機がわかる" },
        { key: "B", text: "一段階を断てば止められる", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "攻撃は偵察・侵入・内部活動・目的実行の順で進む", checkAtSec: segStart(SEG_P14, 0) },
        { text: "鎖のどこか一つを断てば被害は止められる", checkAtSec: segStart(SEG_P14, 1) },
        { text: "RaaSとリークサイトで攻撃が商売になっている", checkAtSec: segStart(SEG_P14, 2) },
      ],
      narration: SEG_P14,
      transitionIn: "wipe",
    },
  ],
};
