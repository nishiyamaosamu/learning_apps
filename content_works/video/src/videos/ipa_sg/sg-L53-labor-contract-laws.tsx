import React from "react";
import { Img, interpolateColors, staticFile } from "remotion";
import { colors, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { NEVER_SEC, useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L53-labor-contract-laws.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L53: 労働・取引関連法規（第6章＝法務の7本目）
 *
 * 発注書 content_works/ipa_sg/orders/L53.md に対応。
 * シナリオと用語の呼称は narration/ipa_sg/sg-L53-labor-contract-laws.md が正。
 *
 * 導入（同じ職場、違う契約）→ 見取り図（働く形の法律／頼む形の契約）→ 労働基準法と就業規則 →
 * 労働者派遣法（雇用と指揮命令の分離）→（wipe-light）請負と準委任 → 偽装請負 →
 * ★抽象→具体：開発委託は工程で契約が変わる → 守秘契約 → ソフトウェア使用許諾 → コピーレフト →
 * クイズ3問 → wipe でまとめ。
 *
 * ※ 罰則は「無効です」「法律に違反します」までにとどめ、刑名・年数・金額は出さない
 *   （L47〜L52 と揃えた方針）。
 * ※ 著作権そのもの（発生・保護対象）は L47、入社・退職時の誓約書の運用は L34、
 *   規程の階層は L27 の領分なので、それぞれ1文つなぐだけで戻らない。
 * ※ 読みの例外: 音声側（jobs.json）だけ仮名書きしている箇所がある —
 *   請負→うけおい、偽装請負→偽装うけおい、派遣元→はけんもと、派遣先→はけんさき、
 *   NDA→エヌディーエー。字幕（下の N() 第2引数）と画面テキストは漢字・英字表記が正で、
 *   音声と食い違って見えるが意図的（references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L53-labor-contract-laws");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "同じフロアで、机を並べて働く三人がいます。"),
  N("s02-2.mp3", "自社の社員、派遣社員、そして協力会社の技術者です。"),
  N("s02-3.mp3", "見た目は同じでも、誰の指示で働くかは別々です。"),
  N("s02-4.mp3", "今回は、働き方と発注を決める法律と契約を見ていきます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "今回の話は、大きく二つに分かれます。"),
  N("s03-2.mp3", "一つは、働く人を守る法律。労働基準法と労働者派遣法です。"),
  N("s03-3.mp3", "もう一つは、仕事を頼むときに交わす契約です。"),
  N("s03-4.mp3", "請負や準委任、守秘契約、ソフトウェアの使用許諾。"),
  N("s03-5.mp3", "どちらも、責任が誰にあるのかを決めています。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "まずは、労働基準法です。"),
  N("s04-2.mp3", "労働時間や賃金など、労働条件の最低の基準を定めます。"),
  N("s04-3.mp3", "これを下回る取り決めは、社員が同意していても無効です。"),
  N("s04-4.mp3", "会社ごとの具体的な決まりは、就業規則に書かれます。"),
  N("s04-5.mp3", "情報の扱い方や懲戒も、就業規則に書くから効き目を持ちます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "次は、労働者派遣法です。"),
  N("s05-2.mp3", "派遣では、雇う会社と、指示を出す会社が分かれます。"),
  N("s05-3.mp3", "雇用契約を結び、給与を払うのは派遣元です。"),
  N("s05-4.mp3", "実際に仕事の指示を出すのは、派遣先です。"),
  N("s05-5.mp3", "この、雇用と指揮命令の分離が、派遣の一番の特徴です。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "ここからは、外部に仕事を頼むときの契約です。"),
  N("s06-2.mp3", "請負契約は、決められた成果物を完成させる約束です。"),
  N("s06-3.mp3", "完成しなければ、責任を問われます。"),
  N("s06-4.mp3", "準委任契約は、作業を任せる約束で、完成までは約束しません。"),
  N("s06-5.mp3", "どちらも、発注側が作業者へ直接指示を出すことはできません。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "ここで気をつけたいのが、偽装請負です。"),
  N("s07-2.mp3", "契約は請負なのに、発注側の社員が作業者へ直接指示を出す。"),
  N("s07-3.mp3", "これは実態として労働者派遣にあたり、法律に違反します。"),
  N("s07-4.mp3", "指示を出したいなら、派遣の形で受け入れる必要があります。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "場面で見てみましょう。システム開発をベンダに委託します。"),
  N("s08-2.mp3", "何を作るかを決める要件定義は、準委任契約が典型です。"),
  N("s08-3.mp3", "作るものが決まったあとの開発は、請負契約が典型です。"),
  N("s08-4.mp3", "そのひな形が、ソフトウェア開発委託モデル契約です。"),
  N("s08-5.mp3", "役割分担のほか、秘密保持や検収の進め方も定めています。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "取引では、相手の秘密に触れることがあります。"),
  N("s09-2.mp3", "そこで交わすのが、守秘契約です。"),
  N("s09-3.mp3", "秘密保持契約とも呼ばれ、NDAと略されます。"),
  N("s09-4.mp3", "知った秘密を、目的以外に使わず、外に出さないと約束します。"),
  N("s09-5.mp3", "社員と交わす誓約書と合わせて、秘密を守る土台になります。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "次は、ソフトウェアを買うときの契約です。"),
  N("s10-2.mp3", "買ったのは、そのソフトを使う権利です。"),
  N("s10-3.mp3", "プログラムの著作権は、作った側に残ったままです。"),
  N("s10-4.mp3", "だから、許諾の範囲を超えた複製や配布はできません。"),
  N("s10-5.mp3", "使う台数をまとめて買う形が、ボリュームライセンスです。"),
];

const SEG_P11 = [
  N("s11-1.mp3", "最後に紹介するのは、コピーレフトという考え方です。"),
  N("s11-2.mp3", "自由に使えるソフトの中には、条件がついたものがあります。"),
  N("s11-3.mp3", "改変して配るなら、同じ自由を引き継がせる、という条件です。"),
  N("s11-4.mp3", "自社のソフトに取り込む前に、条件を必ず確認します。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s13-1.mp3", "ここで問題です。"),
  N("s13-2.mp3", "派遣社員に、仕事の指示を出すのはどちらでしょうか。"),
  N("s13-3.mp3", "正解は、派遣先の会社です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s14-1.mp3", "次の問題です。"),
  N("s14-2.mp3", "成果物の完成に責任を負うのは、どちらの契約でしょうか。"),
  N("s14-3.mp3", "正解は、請負契約です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s15-1.mp3", "最後の問題です。"),
  N("s15-2.mp3", "パッケージソフトを買って手に入るのは、どちらでしょうか。"),
  N("s15-3.mp3", "正解は、そのソフトを使う権利です。", { gapBeforeSec: 1.8 }),
];

const SEG_P16 = [
  N("s16-1.mp3", "派遣では、雇うのは派遣元で、指示を出すのは派遣先です。"),
  N("s16-2.mp3", "請負は完成の約束、準委任は作業を任せる約束です。"),
  N("s16-3.mp3", "ソフトは買っても、手に入るのは使う権利でした。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（用語ドンと同じ形。その語が何の一種か） */
const Chip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => (
  <span
    style={{
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      color: colors.primary800,
      backgroundColor: colors.primary100,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      ...useAppear(atSec),
    }}
  >
    {text}
  </span>
);

/** 横並びの矢印（ラベル付き）。線の描画は使わないので出現前のゴミが出ない */
const LabeledArrow: React.FC<{
  label: string;
  icon: string;
  atSec: number;
  width?: number;
}> = ({ label, icon, atSec, width = 46 }) => (
  <div
    style={{
      flex: "none",
      width: width * SCALE,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1 * SCALE,
      ...useAppear(atSec, { dy: 0 }),
    }}
  >
    <span
      style={{
        minWidth: 0,
        fontSize: 10 * SCALE,
        fontWeight: 800,
        color: colors.primary800,
        lineHeight: 1.25,
        textAlign: "center",
      }}
    >
      {label}
    </span>
    <span style={{ color: colors.primary500, display: "flex" }}>
      <Ms name={icon} size={17 * SCALE} />
    </span>
  </div>
);

// ---------------------------------------------------------------------------
// P2: 導入 — 同じ職場、違う契約
// ---------------------------------------------------------------------------

const RoleChip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => (
  <span
    style={{
      minWidth: 0,
      fontSize: 10.5 * SCALE,
      fontWeight: 800,
      color: colors.textSecondary,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 999,
      padding: `${2.5 * SCALE}px ${9 * SCALE}px`,
      lineHeight: 1.25,
      ...useAppear(atSec, { dy: 6 }),
    }}
  >
    {text}
  </span>
);

const IntroScene: React.FC = () => {
  const question = useAppear(0.3, { dy: 10 });
  const answer = useAppear(segStart(SEG_P2, 2), { dy: 8 });
  const illust = useAppear(0.5);

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.35,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 7 * SCALE,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 * SCALE }}>
            <RoleChip text="自社の社員" atSec={segStart(SEG_P2, 1)} />
            <RoleChip text="派遣社員" atSec={segStart(SEG_P2, 1) + 0.5} />
            <RoleChip text="協力会社の技術者" atSec={segStart(SEG_P2, 1) + 1.0} />
          </div>

          <b style={{ minWidth: 0, fontSize: 26 * SCALE, fontWeight: 800, lineHeight: 1.25, ...question }}>
            {/* 26×SCALE では1行に入らないので明示改行 */}
            <span style={markerPinkStyle}>誰の指示</span>で
            <br />
            働いている？
          </b>

          <span style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.35, ...answer }}>
            {/* 14×SCALE では「形」だけが2行目に落ちるので明示改行 */}
            机は同じ、でも決めているのは
            <br />
            <span style={markerStyle}>契約の形</span>
          </span>
        </div>

        <Img
          src={staticFile("images/ipa_sg/scene-office.png")}
          style={{
            flex: 0.85,
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
// P3: 見取り図 — 二つの柱
// ---------------------------------------------------------------------------

const PillarCard: React.FC<{
  icon: string;
  title: string;
  items: { name: string; desc: string }[];
  accent?: boolean;
  atSec: number;
}> = ({ icon, title, items, accent, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 5 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
      padding: `${8 * SCALE}px ${10 * SCALE}px`,
      ...useAppear(atSec, { dy: 12 }),
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5 * SCALE,
        fontSize: 12 * SCALE,
        fontWeight: 800,
        color: colors.primary800,
        lineHeight: 1.25,
      }}
    >
      <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={14 * SCALE} />
      </span>
      {title}
    </span>
    {items.map((it) => (
      <div key={it.name} style={{ display: "flex", flexDirection: "column", gap: 0.5 * SCALE }}>
        <b style={{ minWidth: 0, fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
          <span style={markerStyle}>{it.name}</span>
        </b>
        <span
          style={{
            minWidth: 0,
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textMuted,
            lineHeight: 1.3,
          }}
        >
          {it.desc}
        </span>
      </div>
    ))}
  </div>
);

const LawMapScene: React.FC = () => {
  const foot = useAppear(segStart(SEG_P3, 4), { dy: 8 });

  return (
    <SlideShell
      heading="今回の二つの柱"
      icon={<Ms name="gavel" size={videoType.slideHeadIcon} />}
      narration={SEG_P3}
    >
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
        <div style={{ display: "flex", alignItems: "stretch", gap: 6 * SCALE }}>
          <PillarCard
            icon="groups"
            title="働く人を守る法律"
            items={[
              { name: "労働基準法", desc: "労働条件の、最低の基準を定める" },
              { name: "労働者派遣法", desc: "雇う会社と、指示を出す会社が分かれる" },
            ]}
            atSec={0.4}
          />
          <PillarCard
            icon="handshake"
            title="仕事を頼むときの契約"
            items={[
              { name: "請負・準委任", desc: "完成を約束するか、作業を任せるか" },
              { name: "守秘契約", desc: "知った秘密を外に出さない約束" },
              { name: "ソフトウェア使用許諾", desc: "使う権利を、条件つきで買う" },
            ]}
            accent
            atSec={segStart(SEG_P3, 2)}
          />
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span style={{ marginTop: 2 * SCALE, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...foot }}>
          まず見分ける — <span style={markerPinkStyle}>働く形の話か、頼む形の話か</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 労働基準法と就業規則（キーワード見出し + 就業規則の目次モック）
// ---------------------------------------------------------------------------

/**
 * 就業規則の目次の行。**行は最初から全部置き**、セキュリティに効く2行だけを語りに
 * 同期して点灯させる（行を後から出すと、カードの高さは確定済みなので白い空欄が居座る）。
 */
const RuleRow: React.FC<{ icon: string; label: string; highlightAtSec?: number }> = ({
  icon,
  label,
  highlightAtSec,
}) => {
  const on = useProgress(highlightAtSec ?? NEVER_SEC, 0.4);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        borderRadius: 9 * SCALE,
        backgroundColor: interpolateColors(on, [0, 1], [colors.bg, colors.primary50]),
        border: `${1.5 * SCALE}px solid ${interpolateColors(on, [0, 1], [colors.border, colors.primary500])}`,
        padding: `${4 * SCALE}px ${9 * SCALE}px`,
      }}
    >
      <span
        style={{
          flex: "none",
          display: "flex",
          color: interpolateColors(on, [0, 1], [colors.textMuted, colors.primary600]),
        }}
      >
        <Ms name={icon} size={13 * SCALE} />
      </span>
      <span
        style={{
          minWidth: 0,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          lineHeight: 1.3,
          color: interpolateColors(on, [0, 1], [colors.textSecondary, colors.primary800]),
        }}
      >
        {label}
      </span>
    </div>
  );
};

const LaborStandardsScene: React.FC = () => {
  const term = useAppear(0.4, { dy: 8 });
  const desc = useAppear(segStart(SEG_P4, 1), { dy: 6 });
  const invalid = useAppear(segStart(SEG_P4, 2), { dy: 8 });
  const card = useAppear(segStart(SEG_P4, 3), { dy: 10 });

  return (
    <SlideShell narration={SEG_P4}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6 * SCALE,
          }}
        >
          <Chip text="働く人を守る法律" atSec={0.3} />
          <b style={{ minWidth: 0, fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>労働基準法</span>
          </b>
          <span
            style={{
              minWidth: 0,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.35,
              ...desc,
            }}
          >
            労働時間や賃金など
            <br />
            労働条件の、最低の基準
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              borderRadius: 12 * SCALE,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
              padding: `${5 * SCALE}px ${10 * SCALE}px`,
              ...invalid,
            }}
          >
            <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
              <Ms name="cancel" size={14 * SCALE} />
            </span>
            <span
              style={{
                minWidth: 0,
                fontSize: 12 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
                lineHeight: 1.3,
              }}
            >
              下回る取り決めは、同意があっても無効
            </span>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 4 * SCALE,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            padding: `${8 * SCALE}px ${10 * SCALE}px`,
            ...card,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              color: colors.textPrimary,
            }}
          >
            {/* 12×SCALE でカード幅に収まるのは12文字まで（「就業規則（会社ごとの決まり）」は
                「り）」だけが2行目に落ちた） */}
            <Ms name="description" size={14 * SCALE} />
            就業規則（会社の決まり）
          </span>
          <RuleRow icon="schedule" label="労働時間・休日" />
          <RuleRow icon="payments" label="賃金の決まり" />
          <RuleRow icon="policy" label="服務規律（情報の扱い方）" highlightAtSec={segStart(SEG_P4, 4)} />
          <RuleRow icon="gavel" label="懲戒" highlightAtSec={segStart(SEG_P4, 4) + 0.8} />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 労働者派遣法（3ノードの関係図）
// ---------------------------------------------------------------------------

const PartyNode: React.FC<{
  icon: string;
  label: string;
  sub: string;
  accent?: boolean;
  atSec: number;
}> = ({ icon, label, sub, accent, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: accent ? colors.primary50 : colors.surface,
      border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
      padding: `${8 * SCALE}px ${6 * SCALE}px`,
      ...usePop(atSec),
    }}
  >
    <span
      style={{
        width: 28 * SCALE,
        height: 28 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: accent ? colors.primary100 : colors.bg,
        color: accent ? colors.primary600 : colors.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={16 * SCALE} />
    </span>
    <b style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25, textAlign: "center" }}>
      {label}
    </b>
    <span
      style={{
        minWidth: 0,
        fontSize: 9.5 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        lineHeight: 1.3,
        textAlign: "center",
      }}
    >
      {sub}
    </span>
  </div>
);

const DispatchScene: React.FC = () => {
  const foot = useAppear(segStart(SEG_P5, 4), { dy: 8 });

  return (
    <SlideShell
      heading="雇う会社と、指示を出す会社"
      icon={<Ms name="groups" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 3 * SCALE }}>
          <PartyNode
            icon="corporate_fare"
            label="派遣元"
            /* ノード幅で1行に収まるのは10文字まで（長いと「給/与」で割れる） */
            sub="雇用し、給与を払う"
            atSec={segStart(SEG_P5, 1) + 0.2}
          />
          <LabeledArrow label="雇用契約" icon="arrow_forward" atSec={segStart(SEG_P5, 2)} />
          <PartyNode
            icon="person"
            label="派遣労働者"
            sub="派遣先の職場で働く"
            accent
            atSec={0.4}
          />
          <LabeledArrow label="指揮命令" icon="arrow_back" atSec={segStart(SEG_P5, 3)} />
          <PartyNode
            icon="apartment"
            label="派遣先"
            sub="仕事の指示を出す"
            atSec={segStart(SEG_P5, 1) + 0.6}
          />
        </div>

        {/* 字幕（＝ナレーション全文）と文を重ねない。ここは「用語の見出し」として置く */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8 * SCALE,
            ...foot,
          }}
        >
          <span
            style={{
              flex: "none",
              fontSize: 9.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary100,
              borderRadius: 999,
              padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
            }}
          >
            派遣の要
          </span>
          <b style={{ minWidth: 0, fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            <span style={markerStyle}>雇用と指揮命令の分離</span>
          </b>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 偽装請負（場面図）
// ---------------------------------------------------------------------------

const DisguisedContractScene: React.FC = () => {
  const contract = useAppear(0.35, { dy: 6 });
  const boss = useAppear(0.5);
  const worker = useAppear(0.7);
  const order = useAppear(segStart(SEG_P7, 1), { dy: 8 });
  const ng = usePop(segStart(SEG_P7, 1) + 1.0);
  const judge = useAppear(segStart(SEG_P7, 2), { dy: 8 });
  const fix = useAppear(segStart(SEG_P7, 3), { dy: 8 });

  return (
    <SlideShell
      heading="偽装請負"
      icon={<Ms name="warning" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        <span
          style={{
            minWidth: 0,
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 5 * SCALE,
            fontSize: 11 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 999,
            padding: `${3 * SCALE}px ${11 * SCALE}px`,
            lineHeight: 1.3,
            ...contract,
          }}
        >
          <span style={{ flex: "none", color: colors.textMuted, display: "flex" }}>
            <Ms name="description" size={13 * SCALE} />
          </span>
          交わした契約は、請負契約
        </span>

        {/* Img を含む横並びの行は親から高さを縛る（flex:1 + minHeight:0） */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: 3 * SCALE }}>
          <Img
            src={staticFile("images/ipa_sg/person-leader-point.png")}
            style={{
              flex: 0.8,
              minWidth: 0,
              alignSelf: "stretch",
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...boss,
            }}
          />
          <div
            style={{
              flex: 1.5,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              ...order,
            }}
          >
            <span
              style={{
                minWidth: 0,
                fontSize: 12.5 * SCALE,
                fontWeight: 800,
                color: colors.textPrimary,
                backgroundColor: colors.surface,
                border: `${1.5 * SCALE}px solid ${colors.border}`,
                borderRadius: 12 * SCALE,
                padding: `${5 * SCALE}px ${11 * SCALE}px`,
                lineHeight: 1.3,
                textAlign: "center",
              }}
            >
              「この作業を先にやって」
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 * SCALE }}>
              <span style={{ color: colors.textMuted, display: "flex" }}>
                <Ms name="arrow_forward" size={17 * SCALE} />
              </span>
              <span
                style={{
                  fontSize: 10 * SCALE,
                  fontWeight: 800,
                  color: colors.textSecondary,
                  lineHeight: 1.25,
                }}
              >
                発注側の社員が、直接の指示
              </span>
              <span style={{ color: colors.incorrect, display: "flex", ...ng }}>
                <Ms name="cancel" size={20 * SCALE} />
              </span>
            </div>
          </div>
          <Img
            src={staticFile("images/ipa_sg/person-vendor.png")}
            style={{
              flex: 0.8,
              minWidth: 0,
              alignSelf: "stretch",
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...worker,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.incorrectSurface,
            border: `${1.5 * SCALE}px solid ${colors.incorrectBorder}`,
            padding: `${5 * SCALE}px ${11 * SCALE}px`,
            ...judge,
          }}
        >
          <span style={{ flex: "none", color: colors.incorrect, display: "flex" }}>
            <Ms name="gpp_bad" size={14 * SCALE} />
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.incorrectText,
              lineHeight: 1.3,
            }}
          >
            NG — 実態は、労働者派遣
          </span>
        </div>

        {/* 字幕（＝ナレーション全文）と文を重ねないよう、判定の対になるラベルとして置く */}
        <span
          style={{
            minWidth: 0,
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            color: colors.correctText,
            backgroundColor: colors.correctSurface,
            border: `${1.5 * SCALE}px solid ${colors.correctBorder}`,
            borderRadius: 12 * SCALE,
            padding: `${5 * SCALE}px ${11 * SCALE}px`,
            lineHeight: 1.3,
            ...fix,
          }}
        >
          <span style={{ flex: "none", color: colors.correct, display: "flex" }}>
            <Ms name="check_circle" size={14 * SCALE} />
          </span>
          OK — 指示を出すなら、派遣契約で受け入れる
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: ★抽象→具体 — システム開発の委託は工程で契約が変わる
// ---------------------------------------------------------------------------

const PhaseCard: React.FC<{
  no: string;
  icon: string;
  phase: string;
  desc: string;
  contract: string;
  atSec: number;
  contractAtSec: number;
}> = ({ no, icon, phase, desc, contract, atSec, contractAtSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      padding: `${8 * SCALE}px ${9 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5 * SCALE,
        fontSize: 9.5 * SCALE,
        fontWeight: 800,
        color: colors.textMuted,
        lineHeight: 1.2,
      }}
    >
      <span style={{ flex: "none", color: colors.textSecondary, display: "flex" }}>
        <Ms name={icon} size={13 * SCALE} />
      </span>
      工程 {no}
    </span>
    <b style={{ minWidth: 0, fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.25, textAlign: "center" }}>
      {phase}
    </b>
    <span
      style={{
        minWidth: 0,
        fontSize: 10 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        lineHeight: 1.3,
        textAlign: "center",
      }}
    >
      {desc}
    </span>
    <span
      style={{
        minWidth: 0,
        fontSize: 12.5 * SCALE,
        fontWeight: 800,
        color: colors.primary800,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary500}`,
        borderRadius: 999,
        padding: `${2.5 * SCALE}px ${11 * SCALE}px`,
        lineHeight: 1.25,
        textAlign: "center",
        ...useAppear(contractAtSec, { dy: 4 }),
      }}
    >
      {contract}
    </span>
  </div>
);

const DevOutsourcingScene: React.FC = () => {
  const model = useAppear(segStart(SEG_P8, 3), { dy: 10 });
  const parts = useAppear(segStart(SEG_P8, 4), { dy: 6 });

  return (
    <SlideShell
      heading="開発の委託は、工程で契約が変わる"
      icon={<Ms name="account_tree" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 3 * SCALE }}>
          <PhaseCard
            no="1"
            icon="edit"
            phase="要件定義"
            desc="何を作るかを、これから決める"
            contract="準委任契約"
            atSec={0.4}
            contractAtSec={segStart(SEG_P8, 1)}
          />
          <LabeledArrow label="決まったら" icon="arrow_forward" atSec={0.8} width={52} />
          <PhaseCard
            no="2"
            icon="code"
            phase="設計・開発"
            desc="決まったものを、完成させる"
            contract="請負契約"
            atSec={0.6}
            contractAtSec={segStart(SEG_P8, 2)}
          />
        </div>

        {/* チップは横並びの残り幅に入り切らず1文字ずつ折り返したので、名前とチップを上下2段にした */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            padding: `${7 * SCALE}px ${11 * SCALE}px`,
            ...model,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
            <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
              <Ms name="description" size={16 * SCALE} />
            </span>
            <b style={{ minWidth: 0, fontSize: 13.5 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
              <span style={markerStyle}>ソフトウェア開発委託モデル契約</span>
            </b>
          </div>
          <div style={{ display: "flex", gap: 4 * SCALE, ...parts }}>
            {["役割分担", "秘密保持", "検収の進め方"].map((t) => (
              <span
                key={t}
                style={{
                  flex: "none",
                  fontSize: 10.5 * SCALE,
                  fontWeight: 800,
                  color: colors.textSecondary,
                  backgroundColor: colors.bg,
                  border: `${1.5 * SCALE}px solid ${colors.border}`,
                  borderRadius: 999,
                  padding: `${2.5 * SCALE}px ${9 * SCALE}px`,
                  lineHeight: 1.25,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 守秘契約（キーワード見出し + イラスト）
// ---------------------------------------------------------------------------

const NdaScene: React.FC = () => {
  const term = useAppear(segStart(SEG_P9, 1), { dy: 8 });
  const alias = useAppear(segStart(SEG_P9, 2), { dy: 6 });
  const desc = useAppear(segStart(SEG_P9, 3), { dy: 6 });
  const note = useAppear(segStart(SEG_P9, 4), { dy: 8 });
  const illust = useAppear(0.5);

  return (
    <SlideShell narration={SEG_P9}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.25,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6 * SCALE,
          }}
        >
          <Chip text="取引で交わす約束" atSec={0.3} />
          <b style={{ minWidth: 0, fontSize: 32 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>守秘契約</span>
          </b>
          <span
            style={{
              minWidth: 0,
              fontSize: 11 * SCALE,
              fontWeight: 700,
              color: colors.textMuted,
              lineHeight: 1.35,
              ...alias,
            }}
          >
            秘密保持契約 ／ NDA
          </span>
          {/* 字幕（＝ナレーション全文）と同じ文にせず、約束の中身を2行の箇条に分解する */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 * SCALE, ...desc }}>
            {["目的以外には使わない", "外には出さない"].map((t) => (
              <span
                key={t}
                style={{
                  minWidth: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 5 * SCALE,
                  fontSize: 13.5 * SCALE,
                  fontWeight: 800,
                  lineHeight: 1.3,
                }}
              >
                <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
                  <Ms name="check_circle" size={14 * SCALE} />
                </span>
                {t}
              </span>
            ))}
          </div>
          <span
            style={{
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 999,
              padding: `${3 * SCALE}px ${11 * SCALE}px`,
              lineHeight: 1.3,
              ...note,
            }}
          >
            <span style={{ flex: "none", color: colors.textMuted, display: "flex" }}>
              <Ms name="group" size={13 * SCALE} />
            </span>
            社員の誓約書と合わせて効く
          </span>
        </div>

        <Img
          src={staticFile("images/ipa_sg/mgmt-contract.png")}
          style={{
            flex: 0.85,
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
// P10: ソフトウェア使用許諾契約
// ---------------------------------------------------------------------------

const GetCard: React.FC<{
  tag: string;
  icon: string;
  title: string;
  desc: string;
  accent?: boolean;
  atSec: number;
}> = ({ tag, icon, title, desc, accent, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2.5 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: accent ? colors.primary50 : colors.surface,
      border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
      padding: `${6 * SCALE}px ${11 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5 * SCALE,
        fontSize: 9.5 * SCALE,
        fontWeight: 800,
        color: accent ? colors.primary800 : colors.textMuted,
        lineHeight: 1.2,
      }}
    >
      <span style={{ flex: "none", display: "flex" }}>
        <Ms name={icon} size={13 * SCALE} />
      </span>
      {tag}
    </span>
    <b style={{ minWidth: 0, fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{title}</b>
    <span
      style={{
        minWidth: 0,
        fontSize: 10.5 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        lineHeight: 1.3,
      }}
    >
      {desc}
    </span>
  </div>
);

const LicenseScene: React.FC = () => {
  const headline = useAppear(segStart(SEG_P10, 1), { dy: 8 });
  const limit = useAppear(segStart(SEG_P10, 3), { dy: 8 });
  const volume = useAppear(segStart(SEG_P10, 4), { dy: 8 });

  return (
    <SlideShell
      heading="パッケージソフトを買う、とは"
      icon={<Ms name="sell" size={videoType.slideHeadIcon} />}
      narration={SEG_P10}
    >
      {/* 初版はリードのチップを置いていたが、本文領域（見出しありで約655px）を超えて
          チップが見出しに、ボリュームライセンスの帯が字幕帯に食い込んだ。
          リードは見出しに畳み、各要素も一回り小さくしてある */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5 * SCALE,
        }}
      >
        <b style={{ minWidth: 0, fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.25, ...headline }}>
          買ったのは、<span style={markerStyle}>使う権利</span>
        </b>

        <div style={{ display: "flex", alignItems: "stretch", gap: 6 * SCALE }}>
          <GetCard
            tag="手に入るもの"
            icon="key"
            title="ソフトを使用する権利"
            desc="許諾された範囲で使える"
            accent
            atSec={segStart(SEG_P10, 1) + 0.5}
          />
          <GetCard
            tag="移らないもの"
            icon="lock"
            title="プログラムの著作権"
            desc="作った側に残ったまま"
            atSec={segStart(SEG_P10, 2)}
          />
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span style={{ minWidth: 0, fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...limit }}>
          <span style={markerPinkStyle}>コピーして配ること</span>までは、買っていない
        </span>

        <span
          style={{
            minWidth: 0,
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            fontSize: 12 * SCALE,
            fontWeight: 800,
            color: colors.primary800,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            borderRadius: 12 * SCALE,
            padding: `${3.5 * SCALE}px ${11 * SCALE}px`,
            lineHeight: 1.3,
            ...volume,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="stacks" size={14 * SCALE} />
          </span>
          使う台数をまとめて買う ＝ ボリュームライセンス
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P11: コピーレフト
// ---------------------------------------------------------------------------

const SoftCard: React.FC<{
  tag: string;
  icon: string;
  title: string;
  desc: string;
  accent?: boolean;
  atSec: number;
}> = ({ tag, icon, title, desc, accent, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: accent ? colors.primary50 : colors.surface,
      border: `${1.5 * SCALE}px solid ${accent ? colors.primary500 : colors.border}`,
      padding: `${9 * SCALE}px ${9 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        fontSize: 9.5 * SCALE,
        fontWeight: 800,
        color: accent ? colors.primary800 : colors.textMuted,
        lineHeight: 1.2,
      }}
    >
      {tag}
    </span>
    <span
      style={{
        width: 28 * SCALE,
        height: 28 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: accent ? colors.primary100 : colors.bg,
        color: accent ? colors.primary600 : colors.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={16 * SCALE} />
    </span>
    <b style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25, textAlign: "center" }}>
      {title}
    </b>
    <span
      style={{
        minWidth: 0,
        fontSize: 10.5 * SCALE,
        fontWeight: 700,
        color: colors.textSecondary,
        lineHeight: 1.3,
        textAlign: "center",
      }}
    >
      {desc}
    </span>
  </div>
);

const CopyleftScene: React.FC = () => {
  const term = useAppear(0.35, { dy: 8 });
  const note = useAppear(segStart(SEG_P11, 3), { dy: 8 });

  return (
    <SlideShell
      heading="コピーレフト"
      icon={<Ms name="autorenew" size={videoType.slideHeadIcon} />}
      narration={SEG_P11}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8 * SCALE,
        }}
      >
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...term }}>
          ライセンスに付く、<span style={markerStyle}>自由を引き継がせる条件</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 4 * SCALE }}>
          <SoftCard
            tag="元のソフト"
            icon="code"
            title="自由に使える"
            desc="改変も配布も認められている"
            atSec={segStart(SEG_P11, 1)}
          />
          <LabeledArrow
            label="改変して配る"
            icon="arrow_forward"
            atSec={segStart(SEG_P11, 2)}
            /* 6文字（10×SCALE＝40px）が1行に収まる幅。58×SCALE では「る」だけ2行目に落ちた */
            width={72}
          />
          <SoftCard
            tag="改変したソフト"
            icon="autorenew"
            title="同じ自由を引き継ぐ"
            desc="受け取った人も、自由に使える"
            accent
            atSec={segStart(SEG_P11, 2) + 0.6}
          />
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
            padding: `${5 * SCALE}px ${11 * SCALE}px`,
            ...note,
          }}
        >
          <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
            <Ms name="warning" size={14 * SCALE} />
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              lineHeight: 1.3,
            }}
          >
            公開されたソフトの流用は、ライセンスの条件とセットで
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

export const SgL53LaborContractLaws: VideoSpec = {
  id: "sg-L53-labor-contract-laws",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "誰の指示で働き\n何を約束するか",
      keywords: ["労働者派遣法", "請負と準委任", "使用許諾"],
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
      name: "law-map",
      durationSec: 8,
      narration: SEG_P3,
      component: LawMapScene,
    },
    {
      pattern: "custom",
      name: "labor-standards",
      durationSec: 8,
      narration: SEG_P4,
      component: LaborStandardsScene,
    },
    {
      pattern: "custom",
      name: "dispatch",
      durationSec: 8,
      narration: SEG_P5,
      component: DispatchScene,
    },
    {
      pattern: "vs",
      heading: "外部に頼むときの二つの契約",
      icon: "handshake",
      left: {
        title: "請負契約",
        icon: "verified",
        rows: [
          { k: "約束するもの", v: "成果物の完成" },
          { k: "完成の責任", v: "ある" },
          { k: "発注側の指示", v: "直接は出せない" },
        ],
      },
      right: {
        title: "準委任契約",
        icon: "work",
        rows: [
          { k: "約束するもの", v: "任された作業" },
          { k: "完成の責任", v: "ない" },
          { k: "発注側の指示", v: "直接は出せない" },
        ],
      },
      columnAtSec: [segStart(SEG_P6, 1), segStart(SEG_P6, 3)],
      narration: SEG_P6,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "disguised-contract",
      durationSec: 8,
      narration: SEG_P7,
      component: DisguisedContractScene,
    },
    {
      pattern: "custom",
      name: "dev-outsourcing",
      durationSec: 8,
      narration: SEG_P8,
      component: DevOutsourcingScene,
    },
    {
      pattern: "custom",
      name: "nda",
      durationSec: 8,
      narration: SEG_P9,
      component: NdaScene,
    },
    {
      pattern: "custom",
      name: "license",
      durationSec: 8,
      narration: SEG_P10,
      component: LicenseScene,
    },
    {
      pattern: "custom",
      name: "copyleft",
      durationSec: 7,
      narration: SEG_P11,
      component: CopyleftScene,
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
      question: "派遣社員に指示を出すのは？",
      choices: [
        { key: "A", text: "雇用契約を結んだ派遣元" },
        { key: "B", text: "実際に働く職場の派遣先", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "成果物の完成に責任を負うのは？",
      choices: [
        { key: "A", text: "請負契約", correct: true },
        { key: "B", text: "準委任契約" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "ソフトを買って手に入るのは？",
      choices: [
        { key: "A", text: "プログラムの著作権" },
        { key: "B", text: "そのソフトを使う権利", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "雇うのは派遣元、指示を出すのは派遣先", checkAtSec: segStart(SEG_P16, 0) },
        { text: "請負は完成の約束、準委任は作業を任せる約束", checkAtSec: segStart(SEG_P16, 1) },
        { text: "ソフトを買っても、得るのは使う権利だけ", checkAtSec: segStart(SEG_P16, 2) },
      ],
      narration: SEG_P16,
      transitionIn: "wipe",
    },
  ],
};
