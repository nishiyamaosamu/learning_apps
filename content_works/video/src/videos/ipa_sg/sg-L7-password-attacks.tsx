import React from "react";
import { Img, staticFile } from "remotion";
import { colors, fontMono, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L7-password-attacks.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L7: パスワードを狙う攻撃
 *
 * 発注書 content_works/ipa_sg/orders/L7.md に対応（攻撃側だけを扱い、対策の各論は L18）。
 * シナリオは narration/ipa_sg/sg-L7-password-attacks.md。
 *
 * 辞書攻撃（候補リスト）→ 総当たり（数字ドン）→ リバースブルートフォース（2レーン比較・
 * ここで攻撃の向きが反転するので wipe-light）→ リスト攻撃（flow）→ 使い回し（鍵と錠）→
 * 4つの整理（比較表）→ クイズ3問 → wipe でまとめ。
 * 視覚文法が隣り合わないよう、リスト→数字→レーン→フロー→イラスト→表の順に散らしてある。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L7-password-attacks");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "今回は、パスワードそのものを狙う攻撃について学びます。"),
  N("s02-2.mp3", "IDとパスワードは、あなたの情報を守る玄関の鍵です。"),
  N("s02-3.mp3", "鍵さえ手に入れば、攻撃者は正規の利用者として入れてしまいます。"),
  N("s02-4.mp3", "破り方は大きく四通りあり、狙われ方によって効く守り方が変わります。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "一つ目は、辞書攻撃です。"),
  N("s03-2.mp3", "よく使われる単語やありがちな文字列を、辞書のように並べて試します。"),
  N("s03-3.mp3", "英単語そのものや、単純な数字の並び、名前や誕生日が代表例です。"),
  N("s03-4.mp3", "複雑さよりも、ありがちであることのほうが危ないのです。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "二つ目は、総当たり攻撃、ブルートフォース攻撃です。"),
  N("s04-2.mp3", "考えられる文字の組み合わせを、片端から機械的に試します。"),
  N("s04-3.mp3", "英字と数字の四桁なら、およそ百六十八万通りしかありません。"),
  N("s04-4.mp3", "これが八桁になると、組み合わせは約二兆八千億通りに跳ね上がります。"),
  N("s04-5.mp3", "桁数が増えるほど、総当たりは現実的でなくなります。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "三つ目は、リバースブルートフォース攻撃です。"),
  N("s05-2.mp3", "ふつうの総当たりは、IDを固定してパスワードを次々に変えます。"),
  N("s05-3.mp3", "同じIDで失敗が続くため、アカウントロックで止められます。"),
  N("s05-4.mp3", "リバースブルートフォースは、その逆で、パスワードを固定します。"),
  N("s05-5.mp3", "よくあるパスワードを一つ決め、IDのほうを次々に変えていきます。"),
  N("s05-6.mp3", "一つのIDあたりの失敗は一回だけなので、ロックをすり抜けてしまいます。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "四つ目は、パスワードリスト攻撃です。"),
  N("s06-2.mp3", "クレデンシャルスタッフィングとも呼ばれます。"),
  N("s06-3.mp3", "まず、どこかのサービスからIDとパスワードの組が流出します。"),
  N("s06-4.mp3", "攻撃者はその一覧を手に入れ、別のサービスでそのまま試します。"),
  N("s06-5.mp3", "同じ組み合わせを使い回していれば、一発でログインされてしまいます。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "リスト攻撃で狙われるのは、パスワードの使い回しです。"),
  N("s07-2.mp3", "一つの鍵で、いくつもの扉が開いてしまう状態だからです。"),
  N("s07-3.mp3", "一か所の流出が、そのまま他のサービスの被害に直結します。"),
  N("s07-4.mp3", "どれだけ複雑なパスワードでも、使い回した時点で弱点になります。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "ここまでの四つを、何を固定して何を変えるかで整理します。"),
  N("s08-2.mp3", "辞書攻撃と総当たり攻撃は、IDを固定してパスワードを変えます。"),
  N("s08-3.mp3", "リバースブルートフォースは、パスワードを固定してIDを変えます。"),
  N("s08-4.mp3", "パスワードリスト攻撃は、漏れた組み合わせをそのまま使います。"),
  N("s08-5.mp3", "どれを狙われているかで、効く守り方が変わります。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s10-1.mp3", "ここで問題です。"),
  N("s10-2.mp3", "アカウントロックで止めにくいのは、どちらの攻撃でしょうか。"),
  N("s10-3.mp3", "正解は、リバースブルートフォース攻撃です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s11-1.mp3", "次の問題です。"),
  N("s11-2.mp3", "よく使われる語を並べて試す攻撃を、何と呼ぶでしょうか。"),
  N("s11-3.mp3", "正解は、辞書攻撃です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s12-1.mp3", "最後の問題です。"),
  N("s12-2.mp3", "パスワードリスト攻撃を防ぐうえで、いちばん大切なことは何でしょうか。"),
  N("s12-3.mp3", "正解は、パスワードを使い回さないことです。", { gapBeforeSec: 1.8 }),
];

const SEG_P13 = [
  N("s13-1.mp3", "辞書攻撃と総当たり攻撃は、IDを固定してパスワードを試します。"),
  N("s13-2.mp3", "リバースブルートフォースは、IDを変えてロックをすり抜けます。"),
  N("s13-3.mp3", "リスト攻撃は、使い回したパスワードを一発で突破します。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P3: 辞書攻撃 — 左に主張、右に「試される候補リスト」。
// 候補は s03-2 の読み上げから順に落ちてきて、最後の1つが当たる（＝ありがちが危ない）
// ---------------------------------------------------------------------------

const DICT_CANDIDATES = ["password", "123456", "qwerty", "taro1990"];

const CandidateRow: React.FC<{ word: string; delaySec: number; hit: boolean; hitAtSec: number }> = ({
  word,
  delaySec,
  hit,
  hitAtSec,
}) => {
  const appear = useAppear(delaySec, { dy: 12 });
  const on = useProgress(hitAtSec, 0.3);
  const lit = hit ? on : 0;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8 * SCALE,
        padding: `${6 * SCALE}px ${11 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: hit ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${hit ? colors.primary500 : colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 13 * SCALE,
          fontWeight: 700,
          color: hit ? colors.primary600 : colors.textPrimary,
        }}
      >
        {word}
      </span>
      <span
        style={{
          fontSize: 10 * SCALE,
          fontWeight: 700,
          color: hit ? colors.primary600 : colors.textMuted,
          opacity: hit ? lit : 1,
        }}
      >
        {hit ? "一致" : "試行"}
      </span>
    </div>
  );
};

const DictionaryScene: React.FC = () => {
  const lead = useAppear(0.3);
  const sub = useAppear(segStart(SEG_P3, 3));
  const listStart = segStart(SEG_P3, 1);

  return (
    <SlideShell
      heading="辞書攻撃"
      icon={<Ms name="menu_book" size={videoType.slideHeadIcon} />}
      narration={SEG_P3}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          gap: "6%",
        }}
      >
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 * SCALE }}>
          <span style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.45, ...lead }}>
            ありがちな語を
            <br />
            <span style={markerStyle}>辞書のように試す</span>
          </span>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              lineHeight: 1.5,
              color: colors.textSecondary,
              ...sub,
            }}
          >
            複雑さより「ありがち」が危ない
          </span>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
          }}
        >
          {DICT_CANDIDATES.map((w, i) => (
            <CandidateRow
              key={w}
              word={w}
              delaySec={listStart + i * 0.5}
              hit={i === DICT_CANDIDATES.length - 1}
              hitAtSec={segStart(SEG_P3, 2) + 1.2}
            />
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 総当たり攻撃 — 数字ドン（8桁の組み合わせ数）。
// 4桁との比較を上に小さく置き、桁数で桁違いになることを1画面で見せる
// ---------------------------------------------------------------------------

const BruteForceScene: React.FC = () => {
  const smallStat = useAppear(segStart(SEG_P4, 2));
  const caption = useAppear(segStart(SEG_P4, 3));
  const count = useProgress(segStart(SEG_P4, 3) + 0.3, 1.4);
  const note = useAppear(segStart(SEG_P4, 4));

  return (
    <SlideShell
      heading="総当たり攻撃（ブルートフォース）"
      icon={<Ms name="calculate" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3 * SCALE,
        }}
      >
        <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textMuted, ...smallStat }}>
          英数字 4桁 なら 約168万通り
        </span>
        <span style={{ fontSize: 12 * SCALE, fontWeight: 700, color: colors.textSecondary, ...caption }}>
          英数字 8桁 の組み合わせ
        </span>
        <span style={{ display: "flex", alignItems: "baseline", gap: 2 * SCALE }}>
          <span
            style={{
              fontSize: 52 * SCALE,
              fontWeight: 800,
              lineHeight: 1,
              color: colors.primary600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {(2.8 * count).toFixed(1)}
          </span>
          <span style={{ fontSize: 20 * SCALE, fontWeight: 800, color: colors.primary600 }}>兆通り</span>
        </span>
        {/* 字幕（s04-5）と同じ文を画面に書かない。ここは倍率という別の切り口で桁数の効きを補強する */}
        <span style={{ fontSize: 12.5 * SCALE, fontWeight: 700, ...note }}>
          4桁の<span style={markerStyle}>およそ168万倍</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: リバースブルートフォース攻撃 — 2レーン比較。
// 「何を固定して何を変えるか」が反転すると、アカウントロックの網から外れることを
// 試行の並びで見せる（この回の山場なので wipe-light で場面を切り替える）
// ---------------------------------------------------------------------------

const Chip: React.FC<{ label: string; value: string; tone: "fixed" | "vary" }> = ({
  label,
  value,
  tone,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4 * SCALE,
      padding: `${4 * SCALE}px ${8 * SCALE}px`,
      borderRadius: 7 * SCALE,
      backgroundColor: tone === "fixed" ? colors.primary50 : colors.surface,
      border: `${1.5 * SCALE}px solid ${tone === "fixed" ? colors.primary300 : colors.border}`,
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ fontSize: 8.5 * SCALE, fontWeight: 700, color: colors.textMuted }}>{label}</span>
    <span style={{ fontFamily: fontMono, fontSize: 11 * SCALE, fontWeight: 700 }}>{value}</span>
  </span>
);

const Lane: React.FC<{
  name: string;
  fixedLabel: string;
  fixedValue: string;
  varyValues: string[];
  result: string;
  emphasize: boolean;
  nameAtSec: number;
  varyAtSec: number;
  resultAtSec: number;
}> = ({ name, fixedLabel, fixedValue, varyValues, result, emphasize, nameAtSec, varyAtSec, resultAtSec }) => {
  const card = useAppear(nameAtSec, { dy: 14 });
  const vary = useAppear(varyAtSec, { dy: 0 });
  const res = useAppear(resultAtSec, { dy: 8 });

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${emphasize ? colors.primary500 : colors.border}`,
        borderRadius: 12 * SCALE,
        padding: `${10 * SCALE}px ${13 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        gap: 6 * SCALE,
        ...card,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE, flexWrap: "nowrap" }}>
        <b style={{ fontSize: 13 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
        <Chip label={fixedLabel} value={fixedValue} tone="fixed" />
        <span style={{ fontSize: 12 * SCALE, color: colors.primary300, fontWeight: 800 }}>→</span>
        <span style={{ display: "flex", gap: 4 * SCALE, ...vary }}>
          {varyValues.map((v) => (
            <Chip key={v} label="" value={v} tone="vary" />
          ))}
        </span>
      </div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5 * SCALE,
          fontSize: 11 * SCALE,
          fontWeight: 700,
          color: emphasize ? colors.textPrimary : colors.textSecondary,
          ...res,
        }}
      >
        <Ms name={emphasize ? "lock_open" : "lock"} size={13 * SCALE} />
        {emphasize ? <span style={markerPinkStyle}>{result}</span> : <span>{result}</span>}
      </span>
    </div>
  );
};

const ReverseBruteScene: React.FC = () => (
  <SlideShell
    heading="リバースブルートフォース攻撃"
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
        gap: 8 * SCALE,
      }}
    >
      <Lane
        name="総当たり"
        fixedLabel="固定"
        fixedValue="ID: tanaka"
        varyValues={["pass01", "pass02", "pass03"]}
        result="同じIDで失敗が続き、アカウントロックで止まる"
        emphasize={false}
        nameAtSec={segStart(SEG_P5, 1)}
        varyAtSec={segStart(SEG_P5, 1) + 0.5}
        resultAtSec={segStart(SEG_P5, 2)}
      />
      <Lane
        name="リバース"
        fixedLabel="固定"
        fixedValue="PW: password"
        varyValues={["tanaka", "suzuki", "sato"]}
        result="1つのIDにつき失敗は1回。ロックをすり抜ける"
        emphasize
        nameAtSec={segStart(SEG_P5, 3)}
        varyAtSec={segStart(SEG_P5, 4)}
        resultAtSec={segStart(SEG_P5, 5)}
      />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P7: 使い回しが致命傷 — 鍵1本と、順に開いてしまう3つの錠
// 錠は s07-2「いくつもの扉が開く」の読み上げから順に開く
// ---------------------------------------------------------------------------

const ServiceLock: React.FC<{ label: string; openAtSec: number }> = ({ label, openAtSec }) => {
  const appear = usePop(openAtSec - 0.6 < 0 ? 0.4 : openAtSec - 0.6);
  const open = useProgress(openAtSec, 0.35);

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 11 * SCALE,
        padding: `${9 * SCALE}px ${3 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        ...appear,
      }}
    >
      {/* 閉→開はアイコンを重ねて opacity で入れ替える（CSS transition は使えないため） */}
      <span style={{ position: "relative", display: "flex", color: colors.primary600 }}>
        <span style={{ opacity: 1 - open, display: "flex", color: colors.textMuted }}>
          <Ms name="lock" size={20 * SCALE} />
        </span>
        <span style={{ position: "absolute", inset: 0, opacity: open, display: "flex" }}>
          <Ms name="lock_open" size={20 * SCALE} />
        </span>
      </span>
      <b style={{ fontSize: 10.5 * SCALE, fontWeight: 800 }}>{label}</b>
    </div>
  );
};

const ReuseScene: React.FC = () => {
  const lead = useAppear(0.3);
  const sub = useAppear(segStart(SEG_P7, 3));
  const key = useAppear(0.5);
  const openFrom = segStart(SEG_P7, 1);

  return (
    <SlideShell narration={SEG_P7}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "6%" }}>
        <div style={{ flex: 1.1, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 * SCALE }}>
          <span style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.45, ...lead }}>
            1つの鍵が
            <br />
            <span style={markerStyle}>全部の扉を開ける</span>
          </span>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              lineHeight: 1.5,
              color: colors.textSecondary,
              ...sub,
            }}
          >
            複雑でも、使い回せば弱点
          </span>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 6 * SCALE,
          }}
        >
          <Img
            src={staticFile("images/ipa_sg/icon-key.png")}
            style={{
              height: "42%",
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...key,
            }}
          />
          <div style={{ display: "flex", gap: 5 * SCALE }}>
            {["A社", "B社", "C社"].map((s, i) => (
              <ServiceLock key={s} label={s} openAtSec={openFrom + i * 0.45} />
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: 4つの違いの整理 — 「何を固定して何を変えるか」の比較表
// 行はナレーションの説明順（辞書・総当たり → リバース → リスト）に合わせて出す
// ---------------------------------------------------------------------------

type CompareRow = { attack: string; fixed: string; vary: string; atSec: number };

const COMPARE_COLS = [1.5, 1, 1.5] as const;

const CompareCells: React.FC<{ row: CompareRow }> = ({ row }) => {
  const appear = useAppear(row.atSec, { dy: 10 });
  const cells = [row.attack, row.fixed, row.vary];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 10 * SCALE,
        // 4行 + ヘッダ + 結論を本文領域に収めるため、行の高さは詰めてある（広げると字幕帯に被る）
        padding: `${5 * SCALE}px ${10 * SCALE}px`,
        ...appear,
      }}
    >
      {cells.map((c, i) => (
        <span
          key={c + String(i)}
          style={{
            flex: COMPARE_COLS[i],
            minWidth: 0,
            fontSize: 10.5 * SCALE,
            fontWeight: i === 0 ? 800 : 700,
            lineHeight: 1.3,
            color: i === 0 ? colors.textPrimary : i === 1 ? colors.primary600 : colors.textSecondary,
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
};

const CompareScene: React.FC = () => {
  const head = useAppear(0.3);
  const note = useAppear(segStart(SEG_P8, 4));
  const rows: CompareRow[] = [
    { attack: "辞書攻撃", fixed: "ID", vary: "ありがちな語", atSec: segStart(SEG_P8, 1) },
    { attack: "総当たり攻撃", fixed: "ID", vary: "全パターン", atSec: segStart(SEG_P8, 1) + 0.4 },
    {
      attack: "リバースブルートフォース",
      fixed: "パスワード",
      vary: "ID",
      atSec: segStart(SEG_P8, 2),
    },
    {
      attack: "パスワードリスト攻撃",
      fixed: "漏れた組",
      vary: "そのまま使う",
      atSec: segStart(SEG_P8, 3),
    },
  ];

  return (
    <SlideShell
      heading="4つの違いを整理する"
      icon={<Ms name="table_chart" size={videoType.slideHeadIcon} />}
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
        <div
          style={{
            display: "flex",
            gap: 4 * SCALE,
            padding: `0 ${10 * SCALE}px`,
            ...head,
          }}
        >
          {["攻撃", "固定するもの", "変えるもの"].map((h, i) => (
            <span
              key={h}
              style={{
                flex: COMPARE_COLS[i],
                minWidth: 0,
                fontSize: 9.5 * SCALE,
                fontWeight: 700,
                color: colors.textMuted,
              }}
            >
              {h}
            </span>
          ))}
        </div>
        {rows.map((r) => (
          <CompareCells key={r.attack} row={r} />
        ))}
        <span
          style={{
            fontSize: 11 * SCALE,
            fontWeight: 700,
            textAlign: "center",
            ...note,
          }}
        >
          狙われ方が違えば、<span style={markerStyle}>効く守り方も変わる</span>
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

export const SgL7PasswordAttacks: VideoSpec = {
  id: "sg-L7-password-attacks",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "パスワードは\nこう破られる",
      keywords: ["辞書攻撃", "総当たり", "リスト攻撃"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "bullets",
      heading: "なぜパスワードが狙われるのか",
      icon: "password",
      bullets: [
        { text: "パスワードは玄関の鍵", sub: "奪われれば正規の利用者として侵入される", marker: "blue" },
        { text: "破り方は4通り", sub: "狙われ方で効く守り方が変わる" },
      ],
      // 各項目はそれを説明するナレーション文の開始秒に合わせて出す
      appearAtSec: [segStart(SEG_P2, 1), segStart(SEG_P2, 3)],
      narration: SEG_P2,
      illust: "images/ipa_sg/attack-password.png",
    },
    {
      pattern: "custom",
      name: "dictionary-attack",
      durationSec: 6,
      narration: SEG_P3,
      component: DictionaryScene,
    },
    {
      pattern: "custom",
      name: "brute-force",
      durationSec: 6,
      narration: SEG_P4,
      component: BruteForceScene,
    },
    {
      pattern: "custom",
      name: "reverse-brute-force",
      durationSec: 8,
      narration: SEG_P5,
      transitionIn: "wipe-light",
      component: ReverseBruteScene,
    },
    {
      pattern: "flow",
      heading: "パスワードリスト攻撃",
      icon: "checklist",
      steps: [
        { abc: "1", name: "流出", sub: "IDとPWの組が漏れる" },
        { abc: "2", name: "入手", sub: "攻撃者が一覧を手に入れる" },
        { abc: "3", name: "転用", sub: "別サービスでそのまま試す" },
      ],
      // 「流出」はs06-3、「入手」「転用」はs06-4、突破の結末はs06-5に同期
      highlightAtSec: [segStart(SEG_P6, 2), segStart(SEG_P6, 3), segStart(SEG_P6, 4)],
      narration: SEG_P6,
    },
    {
      pattern: "custom",
      name: "password-reuse",
      durationSec: 6,
      narration: SEG_P7,
      component: ReuseScene,
    },
    {
      pattern: "custom",
      name: "compare-four",
      durationSec: 7,
      narration: SEG_P8,
      component: CompareScene,
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
      question: "ロックで止めにくいのは？",
      choices: [
        { key: "A", text: "総当たり攻撃" },
        { key: "B", text: "リバースブルートフォース", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "ありがちな語を試す攻撃は？",
      choices: [
        { key: "A", text: "辞書攻撃", correct: true },
        { key: "B", text: "総当たり攻撃" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "リスト攻撃に効くのは？",
      choices: [
        { key: "A", text: "桁数を増やして複雑にする" },
        { key: "B", text: "サービスごとに別にする", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える — 2行になると3行目が字幕帯に潜り込む
      points: [
        {
          text: "辞書攻撃と総当たりは、パスワードを試します。",
          checkAtSec: segStart(SEG_P13, 0),
        },
        {
          text: "リバースブルートフォースは、IDを変えます。",
          checkAtSec: segStart(SEG_P13, 1),
        },
        {
          text: "リスト攻撃は、使い回しを一発で突破します。",
          checkAtSec: segStart(SEG_P13, 2),
        },
      ],
      narration: SEG_P13,
      transitionIn: "wipe",
    },
  ],
};
