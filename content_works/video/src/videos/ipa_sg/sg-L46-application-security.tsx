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
import durations from "./sg-L46-application-security.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L46: アプリケーションセキュリティ（第5章の締め）
 *
 * 発注書 content_works/ipa_sg/orders/L46.md に対応（**対策側だけ**を扱う。攻撃の仕組みは
 * L8・L9 が主担当で再説明しない。WAF の製品説明は L39、DBの暗号化・アクセス制御は L58）。
 * シナリオは narration/ipa_sg/sg-L46-application-security.md。
 *
 * 復習（攻撃→原因→対策）→ セキュアプログラミング → 対応地図（①②③）→
 * ① プレースホルダ（等幅コード対比）→ ①が効く場面（ログイン画面モック・★抽象→具体）→
 * ② エスケープ（変換表＋画面表示・wipe-light）→ ③ 長さの検査（ゲート）→
 * 対策の置き場所（アプリの実装／WAF）→ クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ
 *   「SQL」→エスキューエル / 「XSS」→エックスエスエス / 「WAF」→ワフ と仮名書きしている。
 *   字幕（下の N() 第2引数）は英字表記が正で、WAF だけ初出 s09-3 に読みを添える（L39 に揃える）。
 *   音声と原稿が食い違って見えるが意図的（references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L46-application-security");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "これまで、Webサイトを狙うさまざまな攻撃を見てきました。"),
  N("s02-2.mp3", "SQLインジェクションもXSSも、原因はひとつでした。"),
  N("s02-3.mp3", "利用者からの入力を、そのまま信用してしまったことです。"),
  N("s02-4.mp3", "原因が共通なら、守り方はアプリを作る側の書き方で決まります。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "そこで大事になるのが、セキュアプログラミングです。"),
  N("s03-2.mp3", "攻撃されることを前提に、プログラムを書く作法のことです。"),
  N("s03-3.mp3", "合言葉は、入力は全部疑う、です。"),
  N("s03-4.mp3", "利用者が親切に使ってくれる前提では作らない、ということです。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "守り方は、攻撃ごとにきちんと決まっています。"),
  N("s04-2.mp3", "SQLインジェクションには、プレースホルダを使います。"),
  N("s04-3.mp3", "クロスサイトスクリプティングには、エスケープ処理です。"),
  N("s04-4.mp3", "バッファオーバーフローには、入力の長さの検査です。"),
  N("s04-5.mp3", "この三つを、順番に見ていきましょう。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "一つ目は、プレースホルダです。"),
  N("s05-2.mp3", "危ない書き方は、命令文の中に入力の文字をはめ込むものでした。"),
  N("s05-3.mp3", "プレースホルダは、入力が入る場所に目印だけを置いておきます。"),
  N("s05-4.mp3", "そして命令文とは別に、入力を値として渡します。"),
  N("s05-5.mp3", "命令とデータが最初から別なので、入力は命令になりません。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "では、攻撃の文字列を入れられたらどうなるでしょうか。"),
  N("s06-2.mp3", "ログイン画面のID欄に、攻撃の文字列を入れられたとします。"),
  N("s06-3.mp3", "プレースホルダなら、そういう名前のIDとして扱われます。"),
  N("s06-4.mp3", "そんなIDの利用者はいない、という結果が返って終わります。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "二つ目は、エスケープ処理です。"),
  N("s07-2.mp3", "XSSは、投稿された文字がブラウザで動く攻撃でした。"),
  N("s07-3.mp3", "エスケープは、出す前に特別な文字を別の表記へ変えることです。"),
  N("s07-4.mp3", "置き換えられた文字は、命令ではなくただの文字として出ます。"),
  N("s07-5.mp3", "受け取るときの入力チェックと合わせて、二段構えで守ります。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "三つ目は、入力の長さの検査です。"),
  N("s08-2.mp3", "バッファオーバーフローは、長すぎる入力があふれる攻撃でした。"),
  N("s08-3.mp3", "そこで、領域に入れる前に長さを測り、超えていれば弾きます。"),
  N("s08-4.mp3", "あふれさせない、それだけで防げます。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "ここまでの対策は、どれもアプリを作るときの実装に入れます。"),
  N("s09-2.mp3", "一方で、外側から守る製品もあります。"),
  // WAF は定着した読み方がある略語。初出のこの1回だけ字幕に読みを添える（L39 に揃える）
  N("s09-3.mp3", "WAF（ワフ）は、Webアプリへの攻撃を手前で止める盾です。"),
  N("s09-4.mp3", "ただしWAFは保険で、本筋はアプリ側の実装にあります。"),
  N("s09-5.mp3", "入力を疑って無害にする発想は、ほかの対策にも共通します。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "プレースホルダが有効なのは、なぜでしょうか。"),
  N("s11-3.mp3", "正解は、命令文と入力データを分けて渡すからです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "特別な文字を置き換える対策は、どの攻撃に効くでしょうか。"),
  N("s12-3.mp3", "正解は、クロスサイトスクリプティングです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "対策の本筋は、どちらに置くべきでしょうか。"),
  N("s13-3.mp3", "正解は、アプリを作るときの実装です。", { gapBeforeSec: 1.8 }),
];

const SEG_P14 = [
  N("s14-1.mp3", "セキュアプログラミングの合言葉は、入力は全部疑う、でした。"),
  N("s14-2.mp3", "プレースホルダで分け、エスケープで無害にします。"),
  N("s14-3.mp3", "対策の本筋はアプリの実装で、WAFは外側の保険です。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P2: 復習 — L8・L9 の攻撃 → 共通の原因 → 今回（対策）。縦に収束させて回の位置を示す
// ---------------------------------------------------------------------------

const AttackChip: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const appear = usePop(atSec);
  return (
    <span
      style={{
        flex: 1,
        minWidth: 0,
        textAlign: "center",
        padding: `${5 * SCALE}px ${4 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        fontSize: 11 * SCALE,
        fontWeight: 800,
        color: colors.textSecondary,
        whiteSpace: "nowrap",
        ...appear,
      }}
    >
      {label}
    </span>
  );
};

const DownArrow: React.FC<{ atSec: number }> = ({ atSec }) => {
  const appear = useAppear(atSec, { dy: 0 });
  return (
    <span style={{ color: colors.primary300, display: "flex", ...appear }}>
      <Ms name="arrow_downward" size={15 * SCALE} />
    </span>
  );
};

const RecapScene: React.FC = () => {
  const cause = useAppear(segStart(SEG_P2, 2), { dy: 10 });
  const answer = usePop(segStart(SEG_P2, 3));

  return (
    <SlideShell
      heading="攻撃と対策のつながり"
      icon={<Ms name="compare_arrows" size={videoType.slideHeadIcon} />}
      narration={SEG_P2}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4 * SCALE,
        }}
      >
        <div style={{ display: "flex", gap: 5 * SCALE, width: "94%" }}>
          <AttackChip label="SQLインジェクション" atSec={0.3} />
          <AttackChip label="XSS・CSRF" atSec={0.6} />
          <AttackChip label="バッファオーバーフロー" atSec={0.9} />
        </div>
        <DownArrow atSec={segStart(SEG_P2, 2) - 0.3} />
        <div
          style={{
            width: "78%",
            textAlign: "center",
            padding: `${6 * SCALE}px ${10 * SCALE}px`,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            fontSize: 13 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            lineHeight: 1.3,
            ...cause,
          }}
        >
          共通の原因：入力をそのまま信用した
        </div>
        <DownArrow atSec={segStart(SEG_P2, 3) - 0.3} />
        <div
          style={{
            width: "78%",
            textAlign: "center",
            padding: `${10 * SCALE}px ${10 * SCALE}px`,
            borderRadius: 13 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            fontSize: 18 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...answer,
          }}
        >
          守り方は<span style={markerStyle}>作る側の書き方</span>で決まる
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: セキュアプログラミング — 新出用語をページの主役にする（キーワード見出し + イラスト）
// ---------------------------------------------------------------------------

const SecureProgrammingScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const desc = useAppear(segStart(SEG_P3, 1));
  const motto = useAppear(segStart(SEG_P3, 2));
  const illust = useAppear(0.7);

  return (
    <SlideShell narration={SEG_P3}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
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
          <span
            style={{
              fontSize: 9.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary100,
              borderRadius: 999,
              padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
              ...chip,
            }}
          >
            作る側の作法
          </span>
          {/* 12文字なので2行に割る（1行だと左カラム幅に入らない） */}
          <b style={{ fontSize: 24 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>セキュア</span>
            <br />
            <span style={markerStyle}>プログラミング</span>
          </b>
          <span style={{ fontSize: 12 * SCALE, fontWeight: 700, lineHeight: 1.4, ...desc }}>
            攻撃されることを前提に、
            <br />
            プログラムを書く作法
          </span>
          <span style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.4, ...motto }}>
            合言葉は「<span style={markerPinkStyle}>入力は全部疑う</span>」
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-employee-m-laptop.png")}
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
// P4: 対応地図 — この回の背骨。攻撃①②③に対策が1つずつ対応する
// ---------------------------------------------------------------------------

const PairRow: React.FC<{ no: string; attack: string; defense: string; atSec: number }> = ({
  no,
  attack,
  defense,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 12 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...appear }}>
      <span
        style={{
          flex: "none",
          width: 11 * SCALE,
          height: 11 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 9 * SCALE,
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
          flex: 1.15,
          minWidth: 0,
          padding: `${6 * SCALE}px ${8 * SCALE}px`,
          borderRadius: 10 * SCALE,
          backgroundColor: colors.surface,
          border: `${1.5 * SCALE}px solid ${colors.border}`,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {attack}
      </span>
      <span style={{ flex: "none", color: colors.primary300, display: "flex" }}>
        <Ms name="arrow_forward" size={14 * SCALE} />
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          padding: `${6 * SCALE}px ${8 * SCALE}px`,
          borderRadius: 10 * SCALE,
          backgroundColor: colors.primary50,
          border: `${1.5 * SCALE}px solid ${colors.primary500}`,
          fontSize: 14 * SCALE,
          fontWeight: 800,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {defense}
      </span>
    </div>
  );
};

const DefenseMapScene: React.FC = () => {
  const head = useAppear(0.3);
  return (
    <SlideShell
      heading="攻撃ごとに対策は決まっている"
      icon={<Ms name="checklist" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
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
        <div style={{ display: "flex", gap: 6 * SCALE, paddingLeft: 17 * SCALE, ...head }}>
          <span
            style={{
              flex: 1.15,
              fontSize: 10 * SCALE,
              fontWeight: 800,
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            攻撃
          </span>
          <span style={{ flex: "none", width: 14 * SCALE }} />
          <span
            style={{
              flex: 1,
              fontSize: 10 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              textAlign: "center",
            }}
          >
            対策（今回）
          </span>
        </div>
        <PairRow
          no="1"
          attack="SQLインジェクション"
          defense="プレースホルダ"
          atSec={segStart(SEG_P4, 1)}
        />
        <PairRow
          no="2"
          attack="クロスサイトスクリプティング"
          defense="エスケープ処理"
          atSec={segStart(SEG_P4, 2)}
        />
        <PairRow
          no="3"
          attack="バッファオーバーフロー"
          defense="入力の長さの検査"
          atSec={segStart(SEG_P4, 3)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: ① プレースホルダ — 命令文と入力の関係が変わることを等幅コードで見せる
// （L8 s04 の「はめ込む書き方」と対になるページ）
// ---------------------------------------------------------------------------

const CodeCard: React.FC<{
  label: string;
  danger: boolean;
  atSec: number;
  children: React.ReactNode;
}> = ({ label, danger, atSec, children }) => {
  const appear = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        padding: `${6 * SCALE}px ${12 * SCALE}px ${8 * SCALE}px`,
        borderRadius: 11 * SCALE,
        backgroundColor: danger ? colors.surface : colors.primary50,
        border: `${1.5 * SCALE}px solid ${danger ? colors.border : colors.primary500}`,
        display: "flex",
        flexDirection: "column",
        gap: 3 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: danger ? colors.textMuted : colors.primary600,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
};

const PlaceholderScene: React.FC = () => {
  const pass = useAppear(segStart(SEG_P5, 3), { dy: 0 });
  const conc = useAppear(segStart(SEG_P5, 4));

  return (
    <SlideShell
      heading="① プレースホルダ"
      icon={<Ms name="database" size={videoType.slideHeadIcon} />}
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
        <CodeCard label="危ない書き方：入力の文字をはめ込む" danger atSec={segStart(SEG_P5, 1)}>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 12.5 * SCALE,
              fontWeight: 700,
              whiteSpace: "nowrap",
              lineHeight: 1.3,
            }}
          >
            ... WHERE id = &apos;
            <span style={{ color: colors.accentPinkText }}>［入力］</span>&apos;
          </span>
        </CodeCard>
        <CodeCard label="プレースホルダ：目印だけを置く" danger={false} atSec={segStart(SEG_P5, 2)}>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 12.5 * SCALE,
              fontWeight: 700,
              whiteSpace: "nowrap",
              lineHeight: 1.3,
            }}
          >
            ... WHERE id = <span style={{ color: colors.primary600 }}>?</span>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              ...pass,
            }}
          >
            <Ms name="arrow_forward" size={12 * SCALE} />
            あとから「値」として渡す
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 11 * SCALE,
                padding: `${1 * SCALE}px ${6 * SCALE}px`,
                borderRadius: 6 * SCALE,
                backgroundColor: colors.surface,
                border: `${1 * SCALE}px solid ${colors.primary300}`,
                color: colors.textPrimary,
              }}
            >
              taro
            </span>
          </span>
        </CodeCard>
        <span
          style={{
            fontSize: 15 * SCALE,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.3,
            ...conc,
          }}
        >
          <span style={markerStyle}>命令とデータが最初から別</span>だから、入力は命令にならない
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: ★抽象→具体 — 実際のログイン画面に攻撃文字列を入れられたら何が起きるか
// ---------------------------------------------------------------------------

const LoginCaseScene: React.FC = () => {
  const mock = useAppear(0.3, { dy: 12 });
  const attack = useProgress(segStart(SEG_P6, 1), 0.4);
  const arrow = useAppear(segStart(SEG_P6, 2), { dy: 0 });
  const result = usePop(segStart(SEG_P6, 2) + 0.7);
  const note = useAppear(segStart(SEG_P6, 3));

  return (
    <SlideShell
      heading="攻撃の文字列を入れられたら"
      icon={<Ms name="password" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "3%" }}>
        {/* ログイン画面のモック */}
        <div
          style={{
            flex: 1.15,
            minWidth: 0,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 12 * SCALE,
            padding: `${8 * SCALE}px ${10 * SCALE}px`,
            display: "flex",
            flexDirection: "column",
            gap: 4 * SCALE,
            ...mock,
          }}
        >
          <span style={{ fontSize: 11 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
            ログイン
          </span>
          <span style={{ fontSize: 9 * SCALE, fontWeight: 700, color: colors.textMuted }}>ID</span>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              padding: `${4 * SCALE}px ${7 * SCALE}px`,
              borderRadius: 7 * SCALE,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
              color: colors.accentPinkText,
              whiteSpace: "nowrap",
              opacity: attack,
            }}
          >
            &apos; OR &apos;1&apos;=&apos;1
          </span>
          <span style={{ fontSize: 9 * SCALE, fontWeight: 700, color: colors.textMuted }}>
            パスワード
          </span>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              padding: `${4 * SCALE}px ${7 * SCALE}px`,
              borderRadius: 7 * SCALE,
              backgroundColor: colors.bg,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              color: colors.textMuted,
            }}
          >
            ● ● ● ● ● ●
          </span>
        </div>

        <span style={{ flex: "none", color: colors.primary300, display: "flex", ...arrow }}>
          <Ms name="arrow_forward" size={18 * SCALE} />
        </span>

        {/* 結果 */}
        <div
          style={{
            flex: 1.25,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
          }}
        >
          <div
            style={{
              padding: `${10 * SCALE}px ${10 * SCALE}px`,
              borderRadius: 12 * SCALE,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary500}`,
              display: "flex",
              flexDirection: "column",
              gap: 3 * SCALE,
              ...result,
            }}
          >
            <span style={{ fontSize: 9.5 * SCALE, fontWeight: 800, color: colors.primary600 }}>
              プレースホルダなら
            </span>
            <span style={{ fontSize: 16 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
              <span style={markerStyle}>そういう名前のID</span>
              <br />
              として扱われるだけ
            </span>
          </div>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              lineHeight: 1.3,
              ...note,
            }}
          >
            該当する利用者は0件
            <br />
            それで終わり
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: ② エスケープ処理 — 投稿された文字 → 置き換え → 画面ではただの文字
// ---------------------------------------------------------------------------

const StageCard: React.FC<{
  label: string;
  tone: "danger" | "plain" | "safe";
  atSec: number;
  children: React.ReactNode;
}> = ({ label, tone, atSec, children }) => {
  const appear = useAppear(atSec, { dy: 12 });
  const border =
    tone === "danger" ? colors.accentPink : tone === "safe" ? colors.primary500 : colors.border;
  const bg =
    tone === "danger"
      ? colors.accentPinkSurface
      : tone === "safe"
        ? colors.primary50
        : colors.surface;
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        alignSelf: "stretch",
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${border}`,
        borderRadius: 12 * SCALE,
        padding: `${7 * SCALE}px ${8 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: tone === "safe" ? colors.primary600 : colors.textMuted,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
};

const EscapeScene: React.FC = () => {
  const arrow1 = useAppear(segStart(SEG_P7, 2) - 0.2, { dy: 0 });
  const arrow2 = useAppear(segStart(SEG_P7, 3) - 0.2, { dy: 0 });
  const guard = useAppear(segStart(SEG_P7, 4), { dy: 10 });

  return (
    <SlideShell
      heading="② エスケープ処理"
      icon={<Ms name="language" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
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
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: 5 * SCALE }}>
          <StageCard label="投稿された文字" tone="danger" atSec={0.3}>
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 14 * SCALE,
                fontWeight: 700,
                color: colors.accentPinkText,
                whiteSpace: "nowrap",
              }}
            >
              &lt;script&gt;
            </span>
            <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
              そのままだと動く
            </span>
          </StageCard>

          <span style={{ flex: "none", color: colors.primary300, display: "flex", ...arrow1 }}>
            <Ms name="arrow_forward" size={15 * SCALE} />
          </span>

          <StageCard label="出す前に置き換え" tone="safe" atSec={segStart(SEG_P7, 2)}>
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 12 * SCALE,
                fontWeight: 700,
                color: colors.primary600,
                lineHeight: 1.5,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              &lt; → &amp;lt;
              <br />
              &gt; → &amp;gt;
            </span>
          </StageCard>

          <span style={{ flex: "none", color: colors.primary300, display: "flex", ...arrow2 }}>
            <Ms name="arrow_forward" size={15 * SCALE} />
          </span>

          <StageCard label="画面での見え方" tone="plain" atSec={segStart(SEG_P7, 3)}>
            <span
              style={{
                fontSize: 14 * SCALE,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              &lt;script&gt;
            </span>
            <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
              ただの文字として出る
            </span>
          </StageCard>
        </div>

        <div style={{ flex: "none", display: "flex", justifyContent: "center", gap: 6 * SCALE, ...guard }}>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              padding: `${4 * SCALE}px ${11 * SCALE}px`,
              borderRadius: 999,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              whiteSpace: "nowrap",
            }}
          >
            入り口：入力チェック
          </span>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              padding: `${4 * SCALE}px ${11 * SCALE}px`,
              borderRadius: 999,
              backgroundColor: colors.primary100,
              whiteSpace: "nowrap",
            }}
          >
            出口：エスケープ
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: ③ 入力の長さの検査 — L8 の「あふれる図」と対。検査の門で止まってあふれない
// ---------------------------------------------------------------------------

const LengthCheckScene: React.FC = () => {
  const boxes = useAppear(segStart(SEG_P8, 1), { dy: 10 });
  const grow = useProgress(segStart(SEG_P8, 1) + 0.6, 0.9);
  const gate = usePop(segStart(SEG_P8, 2));
  const reject = useAppear(segStart(SEG_P8, 2) + 0.7, { dy: 0 });
  const conc = useAppear(segStart(SEG_P8, 3));

  return (
    <SlideShell
      heading="③ 入力の長さの検査"
      icon={<Ms name="memory" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
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
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 * SCALE, ...boxes }}>
          <span style={{ flex: 1.3, fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
            送られてきた入力
          </span>
          <span
            style={{
              flex: "none",
              width: 26 * SCALE,
              fontSize: 10 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            長さ
            <br />
            検査
          </span>
          <span style={{ flex: 1, fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
            入力用に確保した領域
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, height: 26 * SCALE }}>
          {/* 送られてきた入力（長い） */}
          <div style={{ flex: 1.3, minWidth: 0, position: "relative", height: "100%", ...boxes }}>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 4 * SCALE,
                height: 18 * SCALE,
                width: `${100 * grow}%`,
                borderRadius: 9 * SCALE,
                backgroundColor: colors.accentPink,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 8 * SCALE,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontFamily: fontMono,
                  fontSize: 10 * SCALE,
                  fontWeight: 700,
                  color: colors.surface,
                  whiteSpace: "nowrap",
                }}
              >
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              </span>
            </div>
          </div>

          {/* 検査の門 */}
          <div
            style={{
              flex: "none",
              width: 26 * SCALE,
              height: "100%",
              borderRadius: 9 * SCALE,
              backgroundColor: colors.primary600,
              color: colors.textPrimaryDark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...gate,
            }}
          >
            <Ms name="fact_check" size={16 * SCALE} />
          </div>

          {/* 確保した領域（空のまま＝あふれない） */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              height: "100%",
              borderRadius: 10 * SCALE,
              border: `${1.5 * SCALE}px dashed ${colors.border}`,
              backgroundColor: colors.surface,
              ...boxes,
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
          <span
            style={{
              flex: 1.3,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              textAlign: "right",
              ...reject,
            }}
          >
            長さが超過 → 受け付けない
          </span>
          <span style={{ flex: "none", width: 26 * SCALE }} />
          <span style={{ flex: 1 }} />
        </div>

        <span style={{ fontSize: 15 * SCALE, fontWeight: 800, textAlign: "center", ...conc }}>
          <span style={markerStyle}>あふれさせない</span>、それだけで防げる
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 対策の置き場所 — 内側（アプリの実装）が本筋、外側（WAF）は保険。入れ子で示す
// ---------------------------------------------------------------------------

const PlacementScene: React.FC = () => {
  const core = usePop(0.3);
  const outer = useAppear(segStart(SEG_P9, 1), { dy: 0 });
  const wafLabel = useAppear(segStart(SEG_P9, 2), { dy: 0 });
  const attack = useAppear(segStart(SEG_P9, 2) + 0.7, { dy: 0 });
  const conc = useAppear(segStart(SEG_P9, 3));
  const extra = useAppear(segStart(SEG_P9, 4));

  return (
    <SlideShell
      heading="対策はどこに置くのが本筋か"
      icon={<Ms name="shield" size={videoType.slideHeadIcon} />}
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
        <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
          {/* 攻撃 */}
          <div
            style={{
              flex: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              color: colors.accentPinkText,
              ...attack,
            }}
          >
            <Ms name="gpp_bad" size={20 * SCALE} />
            <span style={{ fontSize: 10 * SCALE, fontWeight: 800 }}>攻撃</span>
          </div>
          <span style={{ flex: "none", color: colors.accentPink, display: "flex", ...attack }}>
            <Ms name="arrow_forward" size={16 * SCALE} />
          </span>

          {/* 外側 = WAF */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              borderRadius: 16 * SCALE,
              border: `${1.5 * SCALE}px dashed ${colors.primary300}`,
              backgroundColor: colors.surface,
              padding: `${7 * SCALE}px ${10 * SCALE}px ${10 * SCALE}px`,
              display: "flex",
              flexDirection: "column",
              gap: 5 * SCALE,
              ...outer,
            }}
          >
            <span
              style={{
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                display: "flex",
                alignItems: "center",
                gap: 4 * SCALE,
                ...wafLabel,
              }}
            >
              <Ms name="security" size={13 * SCALE} />
              WAF — Webアプリへの攻撃を手前で止める盾（外側の保険）
            </span>

            {/* 内側 = アプリの実装 */}
            <div
              style={{
                borderRadius: 12 * SCALE,
                backgroundColor: colors.primary50,
                border: `${1.5 * SCALE}px solid ${colors.primary500}`,
                padding: `${9 * SCALE}px ${10 * SCALE}px`,
                display: "flex",
                flexDirection: "column",
                gap: 3 * SCALE,
                ...core,
              }}
            >
              <span style={{ fontSize: 9.5 * SCALE, fontWeight: 800, color: colors.primary600 }}>
                対策の本筋
              </span>
              <span style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
                <span style={markerStyle}>アプリを作るときの実装</span>
              </span>
              <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
                プレースホルダ・エスケープ処理・入力の長さの検査
              </span>
            </div>
          </div>
        </div>

        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, textAlign: "center", ...conc }}>
          外側は保険。<span style={markerStyle}>本筋は内側の実装</span>にある
        </span>
        <span
          style={{
            fontSize: 10.5 * SCALE,
            fontWeight: 700,
            color: colors.textMuted,
            textAlign: "center",
            ...extra,
          }}
        >
          入力を疑って無害にする — 対策に共通する発想
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

export const SgL46ApplicationSecurity: VideoSpec = {
  id: "sg-L46-application-security",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "その攻撃は\n書き方で止まる",
      keywords: ["プレースホルダ", "エスケープ", "WAF"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "recap-cause",
      durationSec: 6,
      narration: SEG_P2,
      component: RecapScene,
    },
    {
      pattern: "custom",
      name: "secure-programming",
      durationSec: 6,
      narration: SEG_P3,
      component: SecureProgrammingScene,
    },
    {
      pattern: "custom",
      name: "defense-map",
      durationSec: 7,
      narration: SEG_P4,
      component: DefenseMapScene,
    },
    {
      pattern: "custom",
      name: "placeholder",
      durationSec: 8,
      narration: SEG_P5,
      component: PlaceholderScene,
    },
    {
      pattern: "custom",
      name: "login-case",
      durationSec: 7,
      narration: SEG_P6,
      component: LoginCaseScene,
    },
    {
      pattern: "custom",
      name: "escape",
      durationSec: 8,
      narration: SEG_P7,
      component: EscapeScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "length-check",
      durationSec: 7,
      narration: SEG_P8,
      component: LengthCheckScene,
    },
    {
      pattern: "custom",
      name: "placement",
      durationSec: 8,
      narration: SEG_P9,
      component: PlacementScene,
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
      question: "プレースホルダが効くのはなぜ？",
      choices: [
        { key: "A", text: "命令と入力を分けて渡すから", correct: true },
        { key: "B", text: "入力を暗号化して渡すから" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "文字を置き換える対策が効く攻撃は？",
      choices: [
        { key: "A", text: "バッファオーバーフロー" },
        { key: "B", text: "クロスサイトスクリプティング", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "対策の本筋はどちら？",
      choices: [
        { key: "A", text: "アプリを作るときの実装", correct: true },
        { key: "B", text: "外側のWAFだけに任せる" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "合言葉は「入力は全部疑う」", checkAtSec: segStart(SEG_P14, 0) },
        { text: "プレースホルダで分け、エスケープで無害化", checkAtSec: segStart(SEG_P14, 1) },
        { text: "本筋はアプリの実装、WAFは外側の保険", checkAtSec: segStart(SEG_P14, 2) },
      ],
      narration: SEG_P14,
      transitionIn: "wipe",
    },
  ],
};
