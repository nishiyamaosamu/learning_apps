import React from "react";
import { Img, staticFile } from "remotion";
import {
  colors,
  fontMono,
  markerStyle,
  markerPinkStyle,
  SCALE,
  videoType,
} from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L51-criminal-law-cybercrime.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L51: 刑法とサイバー犯罪（第6章＝法務の5本目）
 *
 * 発注書 content_works/ipa_sg/orders/L51.md に対応。
 * シナリオと用語の呼称は narration/ipa_sg/sg-L51-criminal-law-cybercrime.md が正。
 *
 * 導入（入るまでが不正アクセス禁止法・その先が刑法）→ 四つの動詞で五つの罪を引く見取り図 →
 * ウイルス作成罪 → 作る・渡す・持つ（実行前でも成立）→（wipe-light）電子計算機使用詐欺罪 →
 * 電子計算機損壊等業務妨害罪 → 電磁的記録不正作出及び供用罪 → 支払用カード…罪 →
 * ★抽象→具体：一つの場面に二つの法律 → クイズ3問 → wipe でまとめ。
 *
 * ※ 罰則は「罰せられます」までにとどめ、刑名・年数・金額は出さない（L47〜L50 と揃えた方針）。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ仮名書きしている箇所がある。
 *   この回は「作」「使」「壊」が罪名の熟語（作成罪・作出・使用詐欺罪・損壊）として頻出するため、
 *   同じ漢字の和語動詞（作る・使う・壊す）と「偽る／偽の」は最初から仮名書きにした。
 *   ほかに 作出→さくしゅつ、支払用→しはらいよう、等→とう、及び→および、
 *   ID→アイディー、IC→アイシー、DoS→ドス。
 *   字幕（下の N() 第2引数）と画面テキストは漢字・英字表記が正で、音声と食い違って見えるが
 *   意図的（references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L51-criminal-law-cybercrime");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "前回は、他人のIDで勝手にログインする行為を学びました。"),
  N("s02-2.mp3", "では、入り込んだ先でデータを書き換えたら、どうなるでしょうか。"),
  N("s02-3.mp3", "入るところまでが不正アクセス禁止法、その先の行為は刑法です。"),
  N("s02-4.mp3", "今回は、サイバー犯罪を罰する刑法の罪を見ていきます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "刑法には、コンピュータに関わる罪がいくつも置かれています。"),
  N("s03-2.mp3", "覚え方は簡単で、四つの動詞にまとめられます。"),
  N("s03-3.mp3", "悪いプログラムを作る、そしてコンピュータをだます。"),
  N("s03-4.mp3", "システムを壊す、そしてデータやカードを偽る。"),
  N("s03-5.mp3", "この四つの動詞から、五つの罪を引けるようにします。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "一つ目は、不正指令電磁的記録に関する罪です。"),
  N("s04-2.mp3", "通称、ウイルス作成罪と呼ばれます。"),
  N("s04-3.mp3", "不正指令電磁的記録とは、いわゆるマルウェアのことです。"),
  N("s04-4.mp3", "使う人の意図に反して動くよう作られたプログラムを指します。"),
  N("s04-5.mp3", "これを世に出す行為が、刑法で罰せられます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "この罪で大事なのは、罰せられる範囲の広さです。"),
  N("s05-2.mp3", "マルウェアを作ることは、もちろん罪になります。"),
  N("s05-3.mp3", "他人に渡すことも、正当な理由なく持っておくことも同じです。"),
  N("s05-4.mp3", "しかも、実際に動かして被害が出る前から成立します。"),
  N("s05-5.mp3", "手元に置いているだけで罪になる。ここがよく問われます。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "二つ目は、電子計算機使用詐欺罪です。"),
  N("s06-2.mp3", "コンピュータに、うその情報や不正な指令を与えます。"),
  N("s06-3.mp3", "そうして、お金や財産上の利益を手に入れる罪です。"),
  N("s06-4.mp3", "たとえば、他人のネットバンキングで自分の口座へ送金する。"),
  N("s06-5.mp3", "人ではなく機械をだまして利益を得る。ここが特徴です。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "三つ目は、電子計算機損壊等業務妨害罪です。"),
  N("s07-2.mp3", "コンピュータやデータを壊して、業務を妨害する罪です。"),
  N("s07-3.mp3", "顧客データを消して、受注ができなくなる。これが典型です。"),
  // DoS は1字ずつ読まない略語なので、字幕には初出1回だけ読みを添える
  N("s07-4.mp3", "大量のデータを送りつけるDoS（ドス）攻撃も、この罪です。"),
  N("s07-5.mp3", "狙いは業務を止めること。そこが、詐欺の罪との違いです。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "四つ目は、電磁的記録不正作出及び供用罪です。"),
  N("s08-2.mp3", "紙の文書を偽造する罪の、デジタル版だと考えてください。"),
  N("s08-3.mp3", "権限がないのに、証明になるデータを勝手に作り変える。"),
  N("s08-4.mp3", "これが不正作出で、そのデータを使うことが供用です。"),
  N("s08-5.mp3", "社員証や証明書のデータを書き換える行為が当たります。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "五つ目は、支払用カード電磁的記録不正作出等罪です。"),
  N("s09-2.mp3", "クレジットカードなどの、磁気やICの情報が対象です。"),
  N("s09-3.mp3", "読み取った情報から複製のカードを作ると、この罪です。"),
  N("s09-4.mp3", "手口としては、スキミングがよく知られています。"),
  N("s09-5.mp3", "作るだけでなく、持っているだけでも罰せられます。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "最後に、一つの場面で整理してみましょう。"),
  N("s10-2.mp3", "他人のIDで、銀行のシステムにログインしたとします。"),
  N("s10-3.mp3", "さらに残高のデータを書き換え、自分の口座へ送金しました。"),
  N("s10-4.mp3", "ログインしたところまでが、不正アクセス禁止法です。"),
  N("s10-5.mp3", "その先の送金は、電子計算機使用詐欺罪に当たります。"),
  N("s10-6.mp3", "入る行為と、その先の行為。分けて覚えるのがコツです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "ウイルスを作って保管していただけなら、どうでしょうか。"),
  N("s12-3.mp3", "正解は、それだけで罪になる、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "読み取った情報から複製カードを作る罪は、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、支払用カード電磁的記録不正作出等罪です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "会社のデータを消して業務を止めた行為は、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、電子計算機損壊等業務妨害罪です。", { gapBeforeSec: 1.8 }),
];

const SEG_P15 = [
  N("s15-1.mp3", "入る行為は不正アクセス禁止法、その先の行為は刑法でした。"),
  N("s15-2.mp3", "ウイルスは、作るだけ、持っているだけでも罪になります。"),
  N("s15-3.mp3", "作る、だます、壊す、偽る。この四つで罪名を引きましょう。"),
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

// ---------------------------------------------------------------------------
// P2: 導入 — 入るまでと、その先で担当法が分かれる
// ---------------------------------------------------------------------------

const ActCard: React.FC<{ icon: string; text: React.ReactNode; danger?: boolean; atSec: number }> = ({
  icon,
  text,
  danger,
  atSec,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 7 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.border}`,
      padding: `${9 * SCALE}px ${11 * SCALE}px`,
      ...useAppear(atSec, { dy: 12 }),
    }}
  >
    <span
      style={{
        flex: "none",
        color: danger ? colors.accentPinkText : colors.textSecondary,
        display: "flex",
      }}
    >
      <Ms name={icon} size={20 * SCALE} />
    </span>
    <b style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>{text}</b>
  </div>
);

const LawBadge: React.FC<{ text: string; note: string; danger?: boolean; atSec: number }> = ({
  text,
  note,
  danger,
  atSec,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1.5 * SCALE,
      borderRadius: 12 * SCALE,
      backgroundColor: danger ? colors.accentPinkSurface : colors.primary50,
      border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.primary500}`,
      padding: `${6 * SCALE}px ${10 * SCALE}px`,
      ...usePop(atSec),
    }}
  >
    <span
      style={{
        fontSize: 9 * SCALE,
        fontWeight: 800,
        color: danger ? colors.accentPinkText : colors.primary800,
        lineHeight: 1.2,
      }}
    >
      {note}
    </span>
    <b
      style={{
        minWidth: 0,
        fontSize: 14 * SCALE,
        fontWeight: 800,
        lineHeight: 1.25,
        textAlign: "center",
      }}
    >
      {text}
    </b>
  </div>
);

const IntroScene: React.FC = () => {
  const lead = useAppear(0.3);
  const arrow = useAppear(segStart(SEG_P2, 1), { dy: 0 });
  const conc = useAppear(segStart(SEG_P2, 3), { dy: 10 });

  return (
    <SlideShell narration={SEG_P2}>
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
        <span style={{ fontSize: 11 * SCALE, fontWeight: 800, color: colors.textMuted, ...lead }}>
          入るところまでと、その先 — 担当する法律が分かれる
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
            }}
          >
            <ActCard icon="key" text="他人のIDでログイン" atSec={0.4} />
            <LawBadge
              note="ここまでが"
              text="不正アクセス禁止法"
              atSec={segStart(SEG_P2, 2)}
            />
          </div>

          <div
            style={{
              flex: "none",
              width: 26 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: colors.textMuted,
              ...arrow,
            }}
          >
            <Ms name="arrow_forward" size={20 * SCALE} />
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
            }}
          >
            {/* 左右のカードは1行に収まる長さに揃える（右が2行になると下の法バッジが左右でずれる） */}
            <ActCard
              icon="edit"
              text="データを書き換える"
              danger
              atSec={segStart(SEG_P2, 1) + 0.3}
            />
            <LawBadge
              note="ここからが"
              text="刑法"
              danger
              atSec={segStart(SEG_P2, 2) + 0.5}
            />
          </div>
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.3, ...conc }}>
          今回の主役は、<span style={markerStyle}>刑法の五つの罪</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 四つの動詞で五つの罪を引く（2×2の動詞グリッド）
// ---------------------------------------------------------------------------

/**
 * 動詞 → 罪名の横帯。2×2グリッド版は罪名（最長17文字）が折り返して縦に伸び、
 * 本文が見出しへ食い込んだので、全幅の帯に改めた（罪名は1行に収まる）。
 * 動詞は幅 52×SCALE・14×SCALE で3文字（だます）が1行に入る。
 */
const VerbBand: React.FC<{
  icon: string;
  verb: string;
  crimes: { name: string; sub?: string }[];
  atSec: number;
  crimeAtSec: number;
}> = ({ icon, verb, crimes, atSec, crimeAtSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const crimeAppear = useAppear(crimeAtSec, { dy: 6 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        borderRadius: 14 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        padding: `${5 * SCALE}px ${11 * SCALE}px`,
        ...appear,
      }}
    >
      <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={15 * SCALE} />
      </span>
      <b style={{ flex: "none", width: 52 * SCALE, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
        <span style={markerStyle}>{verb}</span>
      </b>
      <div
        style={{
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1.5 * SCALE,
          ...crimeAppear,
        }}
      >
        {crimes.map((c) => (
          <div key={c.name} style={{ display: "flex", alignItems: "baseline", gap: 6 * SCALE }}>
            <b style={{ minWidth: 0, fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
              {c.name}
            </b>
            {c.sub ? (
              <span
                style={{
                  minWidth: 0,
                  fontSize: 9 * SCALE,
                  fontWeight: 700,
                  color: colors.textMuted,
                  lineHeight: 1.25,
                }}
              >
                {c.sub}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

const VerbMapScene: React.FC = () => {
  const foot = useAppear(segStart(SEG_P3, 4), { dy: 8 });

  return (
    <SlideShell
      heading="四つの動詞で罪名を引く"
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
          gap: 4 * SCALE,
        }}
      >
        {/* 動詞（帯の骨格）を先に出し、罪名だけを語りに同期させる。
            空の枠を置かないよう、帯には最初から動詞が入っている */}
        <VerbBand
          icon="code"
          verb="作る"
          crimes={[{ name: "ウイルス作成罪", sub: "正式には 不正指令電磁的記録に関する罪" }]}
          atSec={0.4}
          crimeAtSec={segStart(SEG_P3, 2)}
        />
        <VerbBand
          icon="psychology"
          verb="だます"
          crimes={[{ name: "電子計算機使用詐欺罪" }]}
          atSec={0.9}
          crimeAtSec={segStart(SEG_P3, 2) + 0.7}
        />
        <VerbBand
          icon="error"
          verb="壊す"
          crimes={[{ name: "電子計算機損壊等業務妨害罪" }]}
          atSec={1.4}
          crimeAtSec={segStart(SEG_P3, 3)}
        />
        <VerbBand
          icon="badge"
          verb="偽る"
          crimes={[
            { name: "電磁的記録不正作出及び供用罪" },
            { name: "支払用カード電磁的記録不正作出等罪" },
          ]}
          atSec={1.9}
          crimeAtSec={segStart(SEG_P3, 3) + 0.7}
        />

        <span
          style={{ marginTop: 3 * SCALE, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3, ...foot }}
        >
          何をしたか（動詞）から、罪名へ<span style={markerPinkStyle}>たどる</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: ウイルス作成罪（キーワード見出し + マルウェアのイラスト）
// ---------------------------------------------------------------------------

const VirusCrimeScene: React.FC = () => {
  const formal = useAppear(0.45, { dy: 8 });
  const term = useAppear(segStart(SEG_P4, 1), { dy: 8 });
  const note = useAppear(segStart(SEG_P4, 2), { dy: 6 });
  const desc = useAppear(segStart(SEG_P4, 3), { dy: 6 });
  const band = useAppear(segStart(SEG_P4, 4), { dy: 8 });
  const illust = useAppear(0.6);

  return (
    <SlideShell narration={SEG_P4}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
        <div
          style={{
            flex: 1.4,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 5 * SCALE,
          }}
        >
          <Chip text="作る — 一つ目の罪" atSec={0.3} />
          <span
            style={{
              minWidth: 0,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.3,
              ...formal,
            }}
          >
            不正指令電磁的記録に関する罪
          </span>
          <b style={{ fontSize: 30 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>ウイルス作成罪</span>
          </b>
          <span style={{ minWidth: 0, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.35, ...note }}>
            不正指令電磁的記録 ＝ いわゆるマルウェア
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.4,
              ...desc,
            }}
          >
            使う人の意図に反して
            <br />
            動くよう作られたプログラム
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              borderRadius: 11 * SCALE,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
              padding: `${5 * SCALE}px ${10 * SCALE}px`,
              ...band,
            }}
          >
            <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
              <Ms name="gavel" size={13 * SCALE} />
            </span>
            <span
              style={{
                minWidth: 0,
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
                lineHeight: 1.3,
              }}
            >
              世に出す行為が刑法で罰せられる
            </span>
          </div>
        </div>
        <Img
          src={staticFile("images/ipa_sg/malware-virus.png")}
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
// P5: 作る・渡す・持つ、どれでも罪（アイコン3連 + 結論帯）
// ---------------------------------------------------------------------------

const ActIcon: React.FC<{ icon: string; label: string; sub: string; atSec: number }> = ({
  icon,
  label,
  sub,
  atSec,
}) => (
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
      padding: `${7 * SCALE}px ${6 * SCALE}px`,
      ...usePop(atSec),
    }}
  >
    <span
      style={{
        width: 26 * SCALE,
        height: 26 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
    </span>
    <b style={{ minWidth: 0, fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{label}</b>
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

const ScopeScene: React.FC = () => {
  const lead = useAppear(0.3, { dy: 10 });
  const band = useAppear(segStart(SEG_P5, 3), { dy: 10 });
  const last = useAppear(segStart(SEG_P5, 4), { dy: 8 });

  return (
    <SlideShell
      heading="罰せられる範囲が広い"
      icon={<Ms name="gpp_bad" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
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
        <span style={{ fontSize: 11 * SCALE, fontWeight: 800, color: colors.textMuted, ...lead }}>
          マルウェアをめぐる、どの行為も対象になる
        </span>

        <div style={{ display: "flex", gap: 6 * SCALE }}>
          <ActIcon
            icon="code"
            label="作る"
            sub="マルウェアを書く"
            atSec={segStart(SEG_P5, 1)}
          />
          <ActIcon
            icon="swap_horiz"
            label="渡す"
            sub="他人に提供する"
            atSec={segStart(SEG_P5, 2)}
          />
          <ActIcon
            icon="archive"
            label="持っておく"
            sub="正当な理由なく保管"
            atSec={segStart(SEG_P5, 2) + 0.7}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
            padding: `${6 * SCALE}px ${11 * SCALE}px`,
            ...band,
          }}
        >
          <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
            <Ms name="timer" size={14 * SCALE} />
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              lineHeight: 1.3,
            }}
          >
            実際に動かして被害が出る前から成立する
          </span>
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3, ...last }}>
          試験で問われるのは、この<span style={markerStyle}>範囲の広さ</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 電子計算機使用詐欺罪（ネットバンキング画面のモック）
// ---------------------------------------------------------------------------

const BankRow: React.FC<{
  label: string;
  value: string;
  danger?: boolean;
  mono?: boolean;
  atSec: number;
}> = ({ label, value, danger, mono, atSec }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 1.5 * SCALE, ...useAppear(atSec) }}>
    <span style={{ fontSize: 9 * SCALE, fontWeight: 800, color: colors.textMuted, lineHeight: 1.2 }}>
      {label}
    </span>
    <span
      style={{
        minWidth: 0,
        fontFamily: mono ? fontMono : undefined,
        fontSize: 12 * SCALE,
        fontWeight: 700,
        lineHeight: 1.3,
        padding: `${4 * SCALE}px ${8 * SCALE}px`,
        borderRadius: 8 * SCALE,
        backgroundColor: danger ? colors.accentPinkSurface : colors.bg,
        border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.border}`,
        color: danger ? colors.accentPinkText : colors.textPrimary,
      }}
    >
      {value}
    </span>
  </div>
);

const BankFraudScene: React.FC = () => {
  const mock = useAppear(0.3, { dy: 10 });
  const desc = useAppear(segStart(SEG_P6, 1), { dy: 6 });
  const gain = useAppear(segStart(SEG_P6, 2), { dy: 6 });
  const button = usePop(segStart(SEG_P6, 3) + 0.6);
  const band = useAppear(segStart(SEG_P6, 4), { dy: 8 });

  return (
    <SlideShell narration={SEG_P6}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        {/* 他人のネットバンキング画面（実物のモック） */}
        <div
          style={{
            flex: 0.95,
            minWidth: 0,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 14 * SCALE,
            padding: `${9 * SCALE}px ${10 * SCALE}px`,
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
            ...mock,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
            }}
          >
            <Ms name="account_balance" size={13 * SCALE} />
            ネットバンキング
          </span>
          {/* カードの高さは隠れている行も含めて確定するので、行の出現が遅いとカード内に
              空白が長く居座る。振込先は2文目の「不正な指令」に合わせて早めに出す */}
          <BankRow label="口座" value="他人の口座" mono atSec={0.45} />
          <BankRow
            label="振込先"
            value="自分の口座"
            danger
            mono
            atSec={segStart(SEG_P6, 1) + 0.5}
          />
          <span
            style={{
              alignSelf: "stretch",
              textAlign: "center",
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.textPrimaryDark,
              backgroundColor: colors.accentPinkText,
              borderRadius: 9 * SCALE,
              padding: `${4 * SCALE}px 0`,
              ...button,
            }}
          >
            振込を実行
          </span>
        </div>

        <div
          style={{
            flex: 1.3,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 5 * SCALE,
          }}
        >
          <Chip text="だます — 二つ目の罪" atSec={0.3} />
          {/* 10文字なので 19×SCALE まで。23×SCALE では「罪」だけが2行目に落ちた */}
          <b style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.2, ...useAppear(0.45) }}>
            <span style={markerStyle}>電子計算機使用詐欺罪</span>
          </b>
          <span style={{ minWidth: 0, fontSize: 12 * SCALE, fontWeight: 700, lineHeight: 1.4, ...desc }}>
            うその情報や不正な指令を与える
          </span>
          <span
            style={{
              minWidth: 0,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary500}`,
              borderRadius: 11 * SCALE,
              padding: `${5 * SCALE}px ${10 * SCALE}px`,
              lineHeight: 1.3,
              ...gain,
            }}
          >
            お金や財産上の利益を手に入れる
          </span>
          {/* 字幕（＝ナレーション全文）と同じ文にしない */}
          <span style={{ minWidth: 0, fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.3, ...band }}>
            <span style={markerPinkStyle}>機械</span>をだます詐欺
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 電子計算機損壊等業務妨害罪（3ノードの流れ + 具体例チップ）
// ---------------------------------------------------------------------------

/* ラベルは幅 48×SCALE に対して 9.5×SCALE の5文字までが1行で収まる（L48 s07 の反省） */
const FlowNode: React.FC<{ icon: string; label: string; danger?: boolean }> = ({
  icon,
  label,
  danger,
}) => (
  <div
    style={{
      flex: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3 * SCALE,
      width: 48 * SCALE,
    }}
  >
    <span
      style={{
        width: 26 * SCALE,
        height: 26 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: danger ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.border}`,
        color: danger ? colors.accentPinkText : colors.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
    </span>
    <span
      style={{
        minWidth: 0,
        fontSize: 9.5 * SCALE,
        fontWeight: 800,
        color: colors.textSecondary,
        lineHeight: 1.25,
        textAlign: "center",
      }}
    >
      {label}
    </span>
  </div>
);

const FlowArrow: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
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
        fontSize: 10.5 * SCALE,
        fontWeight: 800,
        color: colors.accentPinkText,
        lineHeight: 1.25,
        textAlign: "center",
      }}
    >
      {label}
    </span>
    <span style={{ color: colors.accentPink, display: "flex" }}>
      <Ms name="arrow_forward" size={17 * SCALE} />
    </span>
  </div>
);

const ExampleChip: React.FC<{ icon: string; text: string; atSec: number }> = ({
  icon,
  text,
  atSec,
}) => (
  <span
    style={{
      minWidth: 0,
      display: "flex",
      alignItems: "center",
      gap: 5 * SCALE,
      fontSize: 11.5 * SCALE,
      fontWeight: 800,
      color: colors.textSecondary,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 999,
      padding: `${3.5 * SCALE}px ${11 * SCALE}px`,
      lineHeight: 1.3,
      ...useAppear(atSec, { dy: 6 }),
    }}
  >
    <span style={{ flex: "none", color: colors.textMuted, display: "flex" }}>
      <Ms name={icon} size={13 * SCALE} />
    </span>
    {text}
  </span>
);

const ObstructionScene: React.FC = () => {
  const lead = useAppear(0.3, { dy: 10 });
  const flow = useAppear(segStart(SEG_P7, 1), { dy: 12 });
  const conc = useAppear(segStart(SEG_P7, 4), { dy: 8 });

  return (
    <SlideShell
      heading="電子計算機損壊等業務妨害罪"
      icon={<Ms name="error" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
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
        <span style={{ fontSize: 11 * SCALE, fontWeight: 800, color: colors.textMuted, ...lead }}>
          壊す — 三つ目の罪
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5 * SCALE,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            padding: `${8 * SCALE}px ${12 * SCALE}px`,
            ...flow,
          }}
        >
          <FlowNode icon="person" label="攻撃" danger />
          <FlowArrow label="データを壊す" atSec={segStart(SEG_P7, 1) + 0.3} />
          <FlowNode icon="dns" label="動かない" />
          <FlowArrow label="使えない" atSec={segStart(SEG_P7, 1) + 0.8} />
          <FlowNode icon="business_center" label="業務停止" danger />
        </div>

        {/* チップは1行に収まる短い名詞句にする（初版は「…できなくす／る」と割れた） */}
        <div style={{ display: "flex", gap: 6 * SCALE }}>
          <ExampleChip icon="storage" text="顧客データの消去" atSec={segStart(SEG_P7, 2)} />
          <ExampleChip
            icon="lan"
            text="DoS攻撃によるサービス停止"
            atSec={segStart(SEG_P7, 3)}
          />
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.3, ...conc }}>
          利益ではなく、<span style={markerStyle}>業務を止めるのが狙い</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 電磁的記録不正作出及び供用罪（紙 ⇄ デジタルの対応表・行ごとに出す）
// ---------------------------------------------------------------------------

const TableRow: React.FC<{
  k: string;
  paper: string;
  digital: string;
  atSec: number;
  emphasis?: boolean;
}> = ({ k, paper, digital, atSec, emphasis }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6 * SCALE,
      padding: `${6 * SCALE}px ${4 * SCALE}px`,
      borderTop: `${1 * SCALE}px solid ${colors.border}`,
      ...useAppear(atSec, { dy: 8 }),
    }}
  >
    <span
      style={{
        flex: "none",
        width: 34 * SCALE,
        fontSize: 10 * SCALE,
        fontWeight: 800,
        color: colors.textMuted,
        lineHeight: 1.25,
      }}
    >
      {k}
    </span>
    <b
      style={{
        flex: 1,
        minWidth: 0,
        fontSize: emphasis ? 15 * SCALE : 13 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
        color: colors.textSecondary,
      }}
    >
      {paper}
    </b>
    <b
      style={{
        flex: 1,
        minWidth: 0,
        fontSize: emphasis ? 15 * SCALE : 13 * SCALE,
        fontWeight: 800,
        lineHeight: 1.3,
      }}
    >
      {emphasis ? <span style={markerStyle}>{digital}</span> : digital}
    </b>
  </div>
);

const ForgeryScene: React.FC = () => {
  const header = useAppear(0.3, { dy: 10 });
  const example = useAppear(segStart(SEG_P8, 4), { dy: 8 });

  return (
    <SlideShell
      heading="文書偽造の、デジタル版"
      icon={<Ms name="description" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...header }}>
          <span style={{ flex: "none", width: 34 * SCALE }} />
          <span
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              color: colors.textMuted,
              lineHeight: 1.25,
            }}
          >
            <Ms name="description" size={14 * SCALE} />
            紙の世界
          </span>
          <span
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              lineHeight: 1.25,
            }}
          >
            <Ms name="storage" size={14 * SCALE} />
            デジタルの世界
          </span>
        </div>

        <TableRow
          k="対象"
          paper="紙の文書"
          digital="電磁的記録"
          atSec={segStart(SEG_P8, 1)}
        />
        <TableRow
          k="作る罪"
          paper="文書偽造"
          digital="不正作出"
          emphasis
          atSec={segStart(SEG_P8, 2)}
        />
        <TableRow
          k="使う罪"
          paper="偽造文書の行使"
          digital="供用"
          emphasis
          atSec={segStart(SEG_P8, 3)}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            marginTop: 3 * SCALE,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            padding: `${5 * SCALE}px ${10 * SCALE}px`,
            ...example,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="badge" size={14 * SCALE} />
          </span>
          {/* 字幕（＝ナレーション全文）と同じ文にしない */}
          <span style={{ minWidth: 0, fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            例 — 社員証や証明書のデータ
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 支払用カード電磁的記録不正作出等罪（カードのモック + 複製）
// ---------------------------------------------------------------------------

const CardMock: React.FC<{ label: string; danger?: boolean; atSec: number }> = ({
  label,
  danger,
  atSec,
}) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 4 * SCALE,
      borderRadius: 12 * SCALE,
      backgroundColor: danger ? colors.accentPinkSurface : colors.surface,
      border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.border}`,
      padding: `${8 * SCALE}px ${10 * SCALE}px`,
      ...useAppear(atSec, { dy: 10 }),
    }}
  >
    <span
      style={{
        fontSize: 10 * SCALE,
        fontWeight: 800,
        color: danger ? colors.accentPinkText : colors.textMuted,
        lineHeight: 1.2,
      }}
    >
      {label}
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
      {/* ICチップ */}
      <span
        style={{
          flex: "none",
          width: 18 * SCALE,
          height: 14 * SCALE,
          borderRadius: 4 * SCALE,
          backgroundColor: colors.primary100,
          border: `${1 * SCALE}px solid ${colors.primary500}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 7.5 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
        }}
      >
        IC
      </span>
      {/* 磁気ストライプ */}
      <span
        style={{
          flex: 1,
          minWidth: 0,
          height: 9 * SCALE,
          borderRadius: 3 * SCALE,
          backgroundColor: colors.textSecondary,
        }}
      />
    </div>
    <span
      style={{
        minWidth: 0,
        fontFamily: fontMono,
        fontSize: 11 * SCALE,
        fontWeight: 700,
        letterSpacing: 2 * SCALE,
        lineHeight: 1.25,
        color: colors.textSecondary,
      }}
    >
      1234 5678 9012
    </span>
  </div>
);

const CardCrimeScene: React.FC = () => {
  const title = useAppear(0.3, { dy: 10 });
  const note = useAppear(segStart(SEG_P9, 1), { dy: 6 });
  const arrow = useAppear(segStart(SEG_P9, 2), { dy: 0 });
  const illust = useAppear(segStart(SEG_P9, 2));
  const skim = useAppear(segStart(SEG_P9, 3), { dy: 6 });
  const band = useAppear(segStart(SEG_P9, 4), { dy: 8 });

  return (
    <SlideShell
      heading="カードの中身を偽る"
      icon={<Ms name="payments" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
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
        <b style={{ fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.3, ...title }}>
          <span style={markerStyle}>支払用カード電磁的記録不正作出等罪</span>
        </b>
        <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...note }}>
          対象は、クレジットカードなどの磁気やICの情報
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
          <CardMock label="本物のカード" atSec={0.5} />
          {/* 「スキミング」5文字が1行で収まる幅にする（40×SCALE では「スキミン／グ」と割れた） */}
          <div
            style={{
              flex: "none",
              width: 54 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1 * SCALE,
              ...arrow,
            }}
          >
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
                lineHeight: 1.2,
                textAlign: "center",
                ...skim,
              }}
            >
              スキミング
            </span>
            <span style={{ color: colors.accentPink, display: "flex" }}>
              <Ms name="arrow_forward" size={18 * SCALE} />
            </span>
          </div>
          <Img
            src={staticFile("images/ipa_sg/person-attacker.png")}
            style={{
              flex: "none",
              width: 32 * SCALE,
              height: 40 * SCALE,
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illust,
            }}
          />
          <div
            style={{
              flex: "none",
              width: 26 * SCALE,
              display: "flex",
              justifyContent: "center",
              color: colors.accentPink,
              ...arrow,
            }}
          >
            <Ms name="arrow_forward" size={18 * SCALE} />
          </div>
          <CardMock label="複製カード" danger atSec={segStart(SEG_P9, 2) + 0.7} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
            padding: `${5 * SCALE}px ${10 * SCALE}px`,
            ...band,
          }}
        >
          <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
            <Ms name="gavel" size={14 * SCALE} />
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
            {/* 字幕（＝ナレーション全文）と同じ文にしない */}
            複製カードを持っているだけでも罪
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: ★抽象→具体 — 一つの場面に、二つの法律
// ---------------------------------------------------------------------------

const StepBand: React.FC<{
  no: string;
  act: string;
  law: string;
  danger?: boolean;
  atSec: number;
  lawAtSec: number;
}> = ({ no, act, law, danger, atSec, lawAtSec }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 7 * SCALE,
      borderRadius: 14 * SCALE,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.border}`,
      padding: `${7 * SCALE}px ${10 * SCALE}px`,
      ...useAppear(atSec, { dy: 12 }),
    }}
  >
    <span
      style={{
        flex: "none",
        width: 13 * SCALE,
        height: 13 * SCALE,
        borderRadius: 999,
        backgroundColor: danger ? colors.accentPinkText : colors.primary600,
        color: colors.textPrimaryDark,
        fontSize: 9.5 * SCALE,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {no}
    </span>
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 * SCALE }}>
      <b style={{ minWidth: 0, fontSize: 13.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>{act}</b>
      <span
        style={{
          minWidth: 0,
          alignSelf: "flex-start",
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: danger ? colors.accentPinkText : colors.primary800,
          backgroundColor: danger ? colors.accentPinkSurface : colors.primary50,
          border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.primary500}`,
          borderRadius: 999,
          padding: `${2.5 * SCALE}px ${10 * SCALE}px`,
          lineHeight: 1.25,
          ...useAppear(lawAtSec, { dy: 4 }),
        }}
      >
        {law}
      </span>
    </div>
  </div>
);

const TwoLawsScene: React.FC = () => {
  const lead = useAppear(0.3);
  const illust = useAppear(0.6);
  const conc = useAppear(segStart(SEG_P10, 5), { dy: 8 });

  return (
    <SlideShell
      heading="一つの場面に、二つの法律"
      icon={<Ms name="balance" size={videoType.slideHeadIcon} />}
      narration={SEG_P10}
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
        <span style={{ fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textMuted, ...lead }}>
          銀行のシステムで起きた、ひと続きの行為
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "3%" }}>
          <div
            style={{
              flex: 1.7,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6 * SCALE,
            }}
          >
            <StepBand
              no="1"
              act="他人のIDで、銀行のシステムにログイン"
              law="不正アクセス禁止法"
              atSec={segStart(SEG_P10, 1)}
              lawAtSec={segStart(SEG_P10, 3)}
            />
            <StepBand
              no="2"
              act="残高を書き換えて、自分の口座へ送金"
              law="刑法 — 電子計算機使用詐欺罪"
              danger
              atSec={segStart(SEG_P10, 2)}
              lawAtSec={segStart(SEG_P10, 4)}
            />
          </div>
          <Img
            src={staticFile("images/ipa_sg/law-police.png")}
            style={{
              flex: 0.6,
              minWidth: 0,
              alignSelf: "stretch",
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illust,
            }}
          />
        </div>

        {/* 字幕（＝ナレーション全文）と同じ文にしない */}
        <span style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.3, ...conc }}>
          境目は、<span style={markerStyle}>システムに入った瞬間</span>
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

export const SgL51CriminalLawCybercrime: VideoSpec = {
  id: "sg-L51-criminal-law-cybercrime",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "作る・だます\n壊す・偽る",
      keywords: ["ウイルス作成罪", "使用詐欺罪", "業務妨害罪"],
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
      name: "verb-map",
      durationSec: 8,
      narration: SEG_P3,
      component: VerbMapScene,
    },
    {
      pattern: "custom",
      name: "virus-crime",
      durationSec: 7,
      narration: SEG_P4,
      component: VirusCrimeScene,
    },
    {
      pattern: "custom",
      name: "scope",
      durationSec: 7,
      narration: SEG_P5,
      component: ScopeScene,
    },
    {
      pattern: "custom",
      name: "bank-fraud",
      durationSec: 7,
      narration: SEG_P6,
      component: BankFraudScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "obstruction",
      durationSec: 7,
      narration: SEG_P7,
      component: ObstructionScene,
    },
    {
      pattern: "custom",
      name: "forgery",
      durationSec: 7,
      narration: SEG_P8,
      component: ForgeryScene,
    },
    {
      pattern: "custom",
      name: "card-crime",
      durationSec: 7,
      narration: SEG_P9,
      component: CardCrimeScene,
    },
    {
      pattern: "custom",
      name: "two-laws",
      durationSec: 8,
      narration: SEG_P10,
      component: TwoLawsScene,
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
      question: "ウイルスを作って保管しただけなら？",
      choices: [
        { key: "A", text: "動かすまでは罪にならない" },
        { key: "B", text: "それだけで罪になる", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "カード情報を複製する罪は？",
      choices: [
        { key: "A", text: "支払用カード電磁的記録不正作出等罪", correct: true },
        { key: "B", text: "電磁的記録不正作出及び供用罪" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "データを消して業務を止めたら？",
      choices: [
        { key: "A", text: "電子計算機使用詐欺罪" },
        { key: "B", text: "電子計算機損壊等業務妨害罪", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "入る行為は不正アクセス禁止法、その先は刑法", checkAtSec: segStart(SEG_P15, 0) },
        { text: "ウイルスは作る・渡す・持つだけでも罪", checkAtSec: segStart(SEG_P15, 1) },
        { text: "作る・だます・壊す・偽るで罪名を引く", checkAtSec: segStart(SEG_P15, 2) },
      ],
      narration: SEG_P15,
      transitionIn: "wipe",
    },
  ],
};
