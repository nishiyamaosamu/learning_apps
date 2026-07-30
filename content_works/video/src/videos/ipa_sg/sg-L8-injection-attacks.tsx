import React from "react";
import { Img, staticFile } from "remotion";
import { colors, fontMono, markerStyle, markerPinkStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { DrawPath, ArrowMarker } from "../../parts/draw";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L8-injection-attacks.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L8: Webを狙う攻撃①：入力をだます
 *
 * 発注書 content_works/ipa_sg/orders/L8.md に対応（攻撃側だけを扱う。対策＝プレースホルダ・
 * エスケープは L46、利用者を狙う攻撃は L9、HTTP/cookie の詳細は L63）。
 * シナリオは narration/ipa_sg/sg-L8-injection-attacks.md。
 *
 * 前提パイプライン → 概念（イラスト）→ SQL文が書き換わる（等幅コード・この回の主役）→
 * 被害3つ（bullets）→ OSコマンドとの対比（vs・宛先が変わるので wipe-light）→
 * パスをさかのぼる（階層図）→ 領域があふれる（バー）→ 共通原因（収束）→ クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ「SQL」を
 *   「エスキューエル」と仮名書きしている。字幕（下の N() 第2引数）は「SQL」表記が正。
 *   音声と原稿が食い違って見えるが意図的（references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L8-injection-attacks");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "今回は、Webサイトの入力欄を狙う攻撃について学びます。"),
  N("s02-2.mp3", "私たちが検索欄やフォームに入力した文字は、サーバのプログラムに送られます。"),
  N("s02-3.mp3", "プログラムはその文字を受け取り、データベースに問い合わせて結果を返します。"),
  N("s02-4.mp3", "このとき入力は、あくまでデータとして扱われるはずのものです。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "ところが、入力された文字が命令の一部として解釈されることがあります。"),
  N("s03-2.mp3", "これがインジェクション、つまり注入と呼ばれる攻撃です。"),
  N("s03-3.mp3", "データのつもりで受け取った文字を、プログラムが命令として実行してしまうのです。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "代表がSQLインジェクションです。"),
  N("s04-2.mp3", "SQLは、データベースに指示を出すための言葉です。"),
  N("s04-3.mp3", "利用者が入力したIDを、そのまま命令文にはめ込む作りだとします。"),
  N("s04-4.mp3", "そこに、条件が必ず成立する文字列を混ぜて入力します。"),
  N("s04-5.mp3", "すると条件がすべて真になり、本来は見せない全件が返ってしまいます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "SQLインジェクションで起きることは、大きく三つあります。"),
  N("s05-2.mp3", "一つ目は、顧客情報など、データベースの中身を丸ごと盗まれることです。"),
  N("s05-3.mp3", "二つ目は、データを書き換えられたり、消されたりすることです。"),
  N("s05-4.mp3", "三つ目は、ログイン画面をすり抜けて、認証を回避されることです。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "同じ理屈は、データベース以外でも起こります。"),
  N("s06-2.mp3", "OSコマンドインジェクションは、サーバのOSへの命令を実行させる攻撃です。"),
  N("s06-3.mp3", "入力された文字が、サーバ上で動くコマンドの一部になってしまうのです。"),
  N("s06-4.mp3", "ファイルの一覧を見られたり、勝手にプログラムを動かされたりします。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "ディレクトリトラバーサルは、ファイルの置き場所を狙う攻撃です。"),
  N("s07-2.mp3", "Webサイトは、公開してよいフォルダの中だけを見せる作りになっています。"),
  N("s07-3.mp3", "ところがファイル名の指定に、上の階層へ戻る記号を混ぜられることがあります。"),
  N("s07-4.mp3", "さかのぼった先の、見せるつもりのないファイルまで読まれてしまいます。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "バッファオーバーフローは、入力の長さを狙う攻撃です。"),
  N("s08-2.mp3", "プログラムは、入力を入れるための領域をあらかじめ決めています。"),
  N("s08-3.mp3", "想定より長いデータを送られると、そこからあふれてしまいます。"),
  N("s08-4.mp3", "あふれた分が隣の領域を上書きし、動作を乗っ取られることがあります。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "四つの攻撃は、狙う場所こそ違いますが、原因は同じです。"),
  N("s09-2.mp3", "どれも、利用者からの入力をそのまま信用してしまったことが出発点です。"),
  N("s09-3.mp3", "入力は、いつでも攻撃の道具になりうると考える必要があります。"),
  N("s09-4.mp3", "原因が共通なので、対策の考え方も共通になります。"),
  N("s09-5.mp3", "具体的な守り方は、アプリケーションセキュリティの回で学びます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "SQLインジェクションで起きるのは、どちらでしょうか。"),
  N("s11-3.mp3", "正解は、データベースの中身を盗まれることです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "上の階層へさかのぼって、非公開のファイルを読む攻撃はどちらでしょうか。"),
  N("s12-3.mp3", "正解は、ディレクトリトラバーサルです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "四つの攻撃に共通する原因は、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、利用者の入力をそのまま信用したことです。", { gapBeforeSec: 1.8 }),
];

const SEG_P14 = [
  N("s14-1.mp3", "インジェクションは、入力が命令として実行される攻撃です。"),
  N("s14-2.mp3", "トラバーサルは見せないファイル、オーバーフローは領域を狙います。"),
  N("s14-3.mp3", "共通する原因は、入力をそのまま信用したことです。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P2: 前提 — 入力はブラウザ→サーバのプログラム→データベースへ流れる一直線のパイプライン
// ---------------------------------------------------------------------------

const PipeNode: React.FC<{ image: string; label: string; sub: string; atSec: number }> = ({
  image,
  label,
  sub,
  atSec,
}) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 12 * SCALE,
        padding: `${8 * SCALE}px ${6 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        ...appear,
      }}
    >
      <Img
        src={staticFile(image)}
        style={{ height: 26 * SCALE, objectFit: "contain", mixBlendMode: "multiply" }}
      />
      <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
      <span style={{ fontSize: 9 * SCALE, fontWeight: 700, color: colors.textMuted, whiteSpace: "nowrap" }}>
        {sub}
      </span>
    </div>
  );
};

const PipeArrow: React.FC<{ atSec: number }> = ({ atSec }) => {
  const appear = useAppear(atSec, { dy: 0 });
  return (
    <span style={{ flex: "none", color: colors.primary300, display: "flex", ...appear }}>
      <Ms name="arrow_forward" size={18 * SCALE} />
    </span>
  );
};

const PipelineScene: React.FC = () => {
  const note = useAppear(segStart(SEG_P2, 3));
  const t1 = segStart(SEG_P2, 1);
  const t2 = segStart(SEG_P2, 2);

  return (
    <SlideShell
      heading="Webアプリのしくみ"
      icon={<Ms name="language" size={videoType.slideHeadIcon} />}
      narration={SEG_P2}
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
          gap: 10 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, width: "100%" }}>
          <PipeNode image="images/ipa_sg/icon-browser.png" label="ブラウザ" sub="検索欄・フォーム" atSec={t1} />
          <PipeArrow atSec={t1 + 0.5} />
          <PipeNode image="images/ipa_sg/icon-server.png" label="サーバのプログラム" sub="入力を受け取る" atSec={t1 + 0.7} />
          <PipeArrow atSec={t2} />
          <PipeNode image="images/ipa_sg/icon-database.png" label="データベース" sub="問い合わせて返す" atSec={t2 + 0.2} />
        </div>
        <span style={{ fontSize: 13 * SCALE, fontWeight: 800, ...note }}>
          入力はあくまで<span style={markerStyle}>データ</span>のはず
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 概念 — 「データのつもりの文字が命令になる」。主張＋注射器のイラストで一拍おく
// ---------------------------------------------------------------------------

const ConceptScene: React.FC = () => {
  const lead = useAppear(0.3);
  const term = usePop(segStart(SEG_P3, 1));
  const flow = useAppear(segStart(SEG_P3, 2));
  const illust = useAppear(0.6);

  return (
    <SlideShell narration={SEG_P3}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 * SCALE }}>
          {/* 17*SCALE より大きくすると「データのつもりの文字が」が折り返して「が」が孤立する */}
          <span style={{ fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.45, ...lead }}>
            データのつもりの文字が
            <br />
            <span style={markerStyle}>命令として実行される</span>
          </span>
          <span
            style={{
              alignSelf: "flex-start",
              padding: `${5 * SCALE}px ${11 * SCALE}px`,
              borderRadius: 9 * SCALE,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary300}`,
              fontSize: 14 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              ...term,
            }}
          >
            インジェクション（注入）
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5 * SCALE,
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              ...flow,
            }}
          >
            入力（データ）
            <Ms name="arrow_forward" size={13 * SCALE} />
            プログラムの命令
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/attack-injection.png")}
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
// P4: SQLインジェクション（この回の主役）— 命令文のテンプレートに入力がはめ込まれ、
// 攻撃入力を混ぜると条件が常に真になって全件が返る、を等幅のコードで見せる
// ---------------------------------------------------------------------------

const TrialRow: React.FC<{
  kind: string;
  input: string;
  result: string;
  attack: boolean;
  atSec: number;
  resultAtSec: number;
}> = ({ kind, input, result, attack, atSec, resultAtSec }) => {
  const appear = useAppear(atSec, { dy: 10 });
  const res = useAppear(resultAtSec, { dy: 0 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${5 * SCALE}px ${10 * SCALE}px`,
        borderRadius: 10 * SCALE,
        backgroundColor: attack ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${attack ? colors.primary500 : colors.border}`,
        ...appear,
      }}
    >
      <span
        style={{
          flex: "none",
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: attack ? colors.primary600 : colors.textMuted,
          // 2文字が縦に割れないよう、文字幅より広く取る
          width: 21 * SCALE,
          whiteSpace: "nowrap",
        }}
      >
        {kind}
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: fontMono,
          fontSize: 12 * SCALE,
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        {input}
      </span>
      <span
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: attack ? colors.textPrimary : colors.textSecondary,
          ...res,
        }}
      >
        <Ms name="arrow_forward" size={12 * SCALE} />
        {attack ? <span style={markerPinkStyle}>{result}</span> : <span>{result}</span>}
      </span>
    </div>
  );
};

const SqlInjectionScene: React.FC = () => {
  const lead = useAppear(segStart(SEG_P4, 1));
  const tpl = useAppear(segStart(SEG_P4, 2), { dy: 10 });

  return (
    <SlideShell
      heading="SQLインジェクション"
      icon={<Ms name="database" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // 命令文カード＋2行を字幕帯の上に収めるため、間隔は詰めてある（広げると帯に被る）
          gap: 5 * SCALE,
        }}
      >
        <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, color: colors.textSecondary, ...lead }}>
          SQL＝データベースに指示を出す言葉
        </span>
        <div
          style={{
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 11 * SCALE,
            padding: `${6 * SCALE}px ${12 * SCALE}px`,
            display: "flex",
            flexDirection: "column",
            gap: 2 * SCALE,
            ...tpl,
          }}
        >
          <span style={{ fontSize: 9 * SCALE, fontWeight: 700, color: colors.textMuted }}>
            プログラムが組み立てる命令文
          </span>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 12.5 * SCALE,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            SELECT * FROM users WHERE id = &apos;
            <span style={{ color: colors.primary600 }}>［入力］</span>&apos;
          </span>
        </div>
        <TrialRow
          kind="正常"
          input="taro"
          result="1件だけ返る"
          attack={false}
          atSec={segStart(SEG_P4, 2) + 0.8}
          resultAtSec={segStart(SEG_P4, 2) + 1.3}
        />
        <TrialRow
          kind="攻撃"
          input="' OR '1'='1"
          result="全件が返る"
          attack
          atSec={segStart(SEG_P4, 3)}
          resultAtSec={segStart(SEG_P4, 4)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: ディレクトリトラバーサル — 公開フォルダから上へさかのぼる経路を階層図で見せる
// ---------------------------------------------------------------------------

const DirRow: React.FC<{
  path: string;
  note: string;
  indent: number;
  danger: boolean;
  atSec: number;
}> = ({ path, note, indent, danger, atSec }) => {
  const appear = useAppear(atSec, { dy: 8 });
  return (
    <div
      style={{
        marginLeft: indent * 10 * SCALE,
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${5 * SCALE}px ${9 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: danger ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${danger ? colors.primary500 : colors.border}`,
        ...appear,
      }}
    >
      <span style={{ flex: "none", color: danger ? colors.primary600 : colors.textMuted, display: "flex" }}>
        <Ms name={danger ? "lock_open" : "folder"} size={13 * SCALE} />
      </span>
      <span style={{ fontFamily: fontMono, fontSize: 11 * SCALE, fontWeight: 700, whiteSpace: "nowrap" }}>
        {path}
      </span>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          color: danger ? colors.primary600 : colors.textMuted,
          whiteSpace: "nowrap",
        }}
      >
        {note}
      </span>
    </div>
  );
};

const TraversalScene: React.FC = () => {
  const lead = useAppear(0.3);
  const tag = useAppear(segStart(SEG_P7, 2));

  return (
    <SlideShell
      heading="ディレクトリトラバーサル"
      icon={<Ms name="folder" size={videoType.slideHeadIcon} />}
      narration={SEG_P7}
    >
      <div style={{ flex: 1, minHeight: 0, marginTop: "2%", display: "flex", alignItems: "center", gap: "4%" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 7 * SCALE }}>
          <span style={{ fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.45, ...lead }}>
            上へ戻る記号で
            <br />
            <span style={markerStyle}>非公開のファイルへ</span>
          </span>
          <span
            style={{
              alignSelf: "flex-start",
              fontFamily: fontMono,
              fontSize: 13 * SCALE,
              fontWeight: 700,
              color: colors.primary600,
              padding: `${4 * SCALE}px ${9 * SCALE}px`,
              borderRadius: 8 * SCALE,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary300}`,
              ...tag,
            }}
          >
            ../../ を混ぜる
          </span>
        </div>
        <div style={{ flex: "none", alignSelf: "stretch", width: 9 * SCALE, display: "flex" }}>
          {/* さかのぼる経路: 下（公開フォルダ）から上（サーバの奥）へ登る矢印。
              s07-4「さかのぼった先の…読まれてしまいます」で線を引き、
              到達したところで /etc/passwd が開く（矢印が着いてから結果が出る順） */}
          <svg viewBox="0 0 40 150" style={{ width: "100%", height: "100%" }}>
            <ArrowMarker id="trav-arrow" color={colors.primary500} />
            <DrawPath
              d="M20 138 L20 14"
              delaySec={segStart(SEG_P7, 3)}
              durSec={0.9}
              stroke={colors.primary500}
              strokeWidth={3}
              markerEnd="url(#trav-arrow)"
            />
          </svg>
        </div>
        <div
          style={{
            flex: 1.25,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
          }}
        >
          <DirRow
            path="/etc/passwd"
            note="非公開"
            indent={0}
            danger
            atSec={segStart(SEG_P7, 3) + 0.85}
          />
          <DirRow path="/var/www/" note="サーバの中" indent={1} danger={false} atSec={segStart(SEG_P7, 1)} />
          <DirRow
            path="public/image.png"
            note="ここだけ公開"
            indent={2}
            danger={false}
            atSec={segStart(SEG_P7, 1) + 0.5}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: バッファオーバーフロー — 確保した領域と隣の領域。入力のバーが伸びてはみ出し、
// 隣を上書きする（あふれる長さそのものを画面で見せる）
// ---------------------------------------------------------------------------

const BufferOverflowScene: React.FC = () => {
  const boxes = useAppear(segStart(SEG_P8, 1), { dy: 10 });
  const fill = useProgress(segStart(SEG_P8, 1) + 0.6, 0.7);
  const spill = useProgress(segStart(SEG_P8, 2), 1.1);
  const note = useAppear(segStart(SEG_P8, 3));

  // 左ボックス 0〜48%、右ボックス 52〜100%。バーはまず左を満たし、次に右へ食い込む
  const barWidth = 46 * fill + 26 * spill;

  return (
    <SlideShell
      heading="バッファオーバーフロー"
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
          gap: 9 * SCALE,
        }}
      >
        <div style={{ display: "flex", gap: "4%", ...boxes }}>
          <span style={{ flex: 1, fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
            入力用に確保した領域
          </span>
          <span style={{ flex: 1, fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
            隣の領域（プログラムの制御情報）
          </span>
        </div>
        <div style={{ position: "relative", height: 26 * SCALE, ...boxes }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", gap: "4%" }}>
            <span
              style={{
                flex: 1,
                borderRadius: 10 * SCALE,
                backgroundColor: colors.surface,
                border: `${1.5 * SCALE}px dashed ${colors.border}`,
              }}
            />
            <span
              style={{
                flex: 1,
                borderRadius: 10 * SCALE,
                backgroundColor: colors.surface,
                border: `${1.5 * SCALE}px dashed ${colors.border}`,
              }}
            />
          </div>
          {/* 入力データのバー。48%を超えた分が隣の領域に重なる＝上書き */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 4 * SCALE,
              height: 18 * SCALE,
              width: `${barWidth}%`,
              borderRadius: 9 * SCALE,
              backgroundColor: colors.primary500,
              display: "flex",
              alignItems: "center",
              paddingLeft: 9 * SCALE,
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 10 * SCALE,
                fontWeight: 700,
                color: colors.textPrimaryDark,
                whiteSpace: "nowrap",
              }}
            >
              AAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </span>
          </div>
          {/* 上書きされた部分の危険表示（装飾用アクセント） */}
          <span
            style={{
              position: "absolute",
              left: "52%",
              top: 4 * SCALE,
              height: 18 * SCALE,
              width: `${22 * spill}%`,
              borderRadius: 9 * SCALE,
              border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
              opacity: spill,
            }}
          />
        </div>
        <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, textAlign: "center", ...note }}>
          あふれた分が隣を<span style={markerPinkStyle}>上書き</span>し、動作を乗っ取られる
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 共通する原因 — 4つの攻撃名が1つの結論に収束する（対策の各論は L46 へ渡す）
// ---------------------------------------------------------------------------

const AttackChip: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const appear = usePop(atSec);
  return (
    <span
      style={{
        flex: "1 1 44%",
        textAlign: "center",
        padding: `${5 * SCALE}px ${6 * SCALE}px`,
        borderRadius: 9 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        fontSize: 11 * SCALE,
        fontWeight: 800,
        color: colors.textSecondary,
        ...appear,
      }}
    >
      {label}
    </span>
  );
};

const CommonCauseScene: React.FC = () => {
  const card = usePop(segStart(SEG_P9, 1));
  const arrow = useAppear(segStart(SEG_P9, 1) - 0.3 < 0 ? 0.5 : segStart(SEG_P9, 1) - 0.3, { dy: 0 });
  const note = useAppear(segStart(SEG_P9, 3));
  const chips = [
    "SQLインジェクション",
    "OSコマンドインジェクション",
    "ディレクトリトラバーサル",
    "バッファオーバーフロー",
  ];

  return (
    <SlideShell
      heading="4つに共通する原因"
      icon={<Ms name="lightbulb" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
    >
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 * SCALE, width: "88%" }}>
          {chips.map((c, i) => (
            <AttackChip key={c} label={c} atSec={0.3 + i * 0.3} />
          ))}
        </div>
        <span style={{ color: colors.primary300, display: "flex", ...arrow }}>
          <Ms name="arrow_downward" size={16 * SCALE} />
        </span>
        <div
          style={{
            width: "88%",
            textAlign: "center",
            padding: `${9 * SCALE}px ${10 * SCALE}px`,
            borderRadius: 12 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            fontSize: 17 * SCALE,
            fontWeight: 800,
            ...card,
          }}
        >
          入力を<span style={markerStyle}>そのまま信用した</span>こと
        </div>
        <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textSecondary, ...note }}>
          原因が同じなら、守り方も共通（アプリケーションセキュリティの回へ）
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

export const SgL8InjectionAttacks: VideoSpec = {
  id: "sg-L8-injection-attacks",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "その入力欄から\n命令が実行される",
      keywords: ["SQL", "OSコマンド", "トラバーサル"],
      // title にはナレーションを付けない（オープニングジングルと声が重なるため）
    },
    {
      pattern: "custom",
      name: "web-pipeline",
      durationSec: 6,
      narration: SEG_P2,
      component: PipelineScene,
    },
    {
      pattern: "custom",
      name: "injection-concept",
      durationSec: 5,
      narration: SEG_P3,
      component: ConceptScene,
    },
    {
      pattern: "custom",
      name: "sql-injection",
      durationSec: 7,
      narration: SEG_P4,
      component: SqlInjectionScene,
    },
    {
      pattern: "bullets",
      heading: "SQLインジェクションの被害",
      icon: "gpp_bad",
      bullets: [
        { text: "情報の漏えい", sub: "顧客情報などを丸ごと抜かれる", marker: "blue" },
        { text: "データの改ざん", sub: "書き換え・削除をされる" },
        { text: "認証の回避", sub: "ログイン画面をすり抜けられる" },
      ],
      // 各項目はそれを説明するナレーション文の開始秒に合わせて出す
      appearAtSec: [segStart(SEG_P5, 1), segStart(SEG_P5, 2), segStart(SEG_P5, 3)],
      narration: SEG_P5,
    },
    {
      pattern: "vs",
      heading: "宛先が変わっても理屈は同じ",
      icon: "compare_arrows",
      left: {
        title: "SQLインジェクション",
        icon: "database",
        rows: [
          { k: "命令の宛先", v: "データベース" },
          { k: "入力が化ける先", v: "SQL文の一部" },
          { k: "起きること", v: "情報の抜き取り" },
        ],
      },
      right: {
        title: "OSコマンドインジェクション",
        icon: "terminal",
        rows: [
          { k: "命令の宛先", v: "サーバのOS" },
          { k: "入力が化ける先", v: "コマンドの一部" },
          { k: "起きること", v: "ファイル操作・不正実行" },
        ],
      },
      columnAtSec: [segStart(SEG_P6, 0), segStart(SEG_P6, 1)],
      narration: SEG_P6,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "directory-traversal",
      durationSec: 7,
      narration: SEG_P7,
      component: TraversalScene,
    },
    {
      pattern: "custom",
      name: "buffer-overflow",
      durationSec: 7,
      narration: SEG_P8,
      component: BufferOverflowScene,
    },
    {
      pattern: "custom",
      name: "common-cause",
      durationSec: 8,
      narration: SEG_P9,
      component: CommonCauseScene,
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
      question: "SQLインジェクションで起きるのは？",
      choices: [
        { key: "A", text: "DBの中身を盗まれる", correct: true },
        { key: "B", text: "PCのファイルが暗号化される" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "非公開ファイルを読む攻撃は？",
      choices: [
        { key: "A", text: "バッファオーバーフロー" },
        { key: "B", text: "ディレクトリトラバーサル", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "4つに共通する原因は？",
      choices: [
        { key: "A", text: "入力をそのまま信用した", correct: true },
        { key: "B", text: "パスワードが短かった" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      // 各行は1行に収まる長さ（およそ25文字）に抑える
      points: [
        { text: "インジェクションは、入力が命令として実行される", checkAtSec: segStart(SEG_P14, 0) },
        { text: "トラバーサルはファイル、オーバーフローは領域", checkAtSec: segStart(SEG_P14, 1) },
        { text: "共通の原因は、入力をそのまま信用したこと", checkAtSec: segStart(SEG_P14, 2) },
      ],
      narration: SEG_P14,
      transitionIn: "wipe",
    },
  ],
};
