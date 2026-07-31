import { Img, staticFile } from "remotion";
import { colors, fontMono, markerPinkStyle, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L16-hash-key-management.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L16: ハッシュ関数と鍵管理
 *
 * 発注書 content_works/ipa_sg/orders/L16.md（範囲の正）に対応。
 * シナリオは narration/ipa_sg/sg-L16-hash-key-management.md。
 *
 * 「戻せない変換」を背骨にした構成:
 *   導入（改ざんを見抜きたい）→ ハッシュ関数＝可変長入力から固定長のメッセージダイジェスト →
 *   一方向性（暗号化は往復・ハッシュは片道）→ パスワードの保管 → 衝突困難性と改ざん検知 →
 *   wipe-light で「暗号は永遠に安全ではない」（危殆化・CRYPTREC）→ 鍵管理のライフサイクル（flow）→
 *   保存データの暗号化 → クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 用語の呼称は L15（narration/ipa_sg/sg-L15-encryption.md）に揃えている
 * （平文／暗号文／暗号化／復号）。メッセージダイジェストの定義はこの回が正で L17 が参照する。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L16-hash-key-management");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、ハッシュ関数と鍵管理について学びます。"),
  N("s02-2.mp3", "受け取ったファイルが、途中で書き換えられていないか気になることはありませんか。"),
  N("s02-3.mp3", "中身をすべて見比べなくても、改ざんを見抜ける仕組みがあります。"),
  N("s02-4.mp3", "それが、もとに戻せない変換を行うハッシュ関数です。"),
];

const SEG_DIGEST = [
  N("s03-1.mp3", "ハッシュ関数は、入力されたデータから短い値を計算する関数です。"),
  N("s03-2.mp3", "できあがった値をメッセージダイジェスト、または単にハッシュ値と呼びます。"),
  N("s03-3.mp3", "入力が一文字でも数ギガバイトでも、出てくる値の長さは必ず同じです。"),
  // 難読語の例外: SHA-256 は音声（jobs.json）だけ「エスエイチエー256」と仮名書きし、
  // 字幕はアルファベット表記＋読みを添える（読みを添えるのは初出のこの1回だけ）。
  N("s03-4.mp3", "代表的なのはSHA-256（エスエイチエー256）で、常に256ビットです。"),
];

const SEG_ONEWAY = [
  N("s04-1.mp3", "ハッシュ関数の一つ目の性質が、一方向性です。"),
  // 難読語の例外: 「平文」は TTS が「へいぶん」と読むため音声だけ「ひらぶん」（L15 で確定）。
  // 字幕は漢字のまま。読みは L15 の初出で添えたのでこの回では添えない。
  N("s04-2.mp3", "暗号化なら、鍵があればもとの平文に戻すことができます。"),
  N("s04-3.mp3", "ところがハッシュ値からは、もとのデータを復元できません。"),
  N("s04-4.mp3", "鍵がないから戻せないのではなく、そもそも戻す仕組みがないのです。"),
];

const SEG_PASSWORD = [
  N("s05-1.mp3", "この一方向性は、パスワードの保管に使われています。"),
  N("s05-2.mp3", "パスワードをそのまま保存すると、漏れたときに全員が悪用されます。"),
  N("s05-3.mp3", "そこでハッシュ値だけを保存し、パスワード自体はどこにも残しません。"),
  N("s05-4.mp3", "入力された値のハッシュを計算し、保存された値と比べれば本人と確認できます。"),
];

const SEG_COLLISION = [
  N("s06-1.mp3", "二つ目の性質が、衝突困難性です。"),
  N("s06-2.mp3", "同じハッシュ値になる別のデータを作り出すのは、非常に困難です。"),
  N("s06-3.mp3", "だから、ハッシュ値が一致すれば中身も同じだと判断できます。"),
  N("s06-4.mp3", "配布元が公開した値と手元で計算した値を比べれば、改ざんに気づけます。"),
];

const SEG_KITAIKA = [
  N("s07-1.mp3", "ここからは、暗号を安全に使い続けるための話です。"),
  N("s07-2.mp3", "暗号やハッシュ関数は、計算機の性能が上がるほど破られやすくなります。"),
  // 難読語の例外: 「危殆化」は音声だけ「きたい化」。字幕は初出のこの1回だけ読みを添える。
  N("s07-3.mp3", "安全性が時間とともに低下することを、危殆化（きたいか）と呼びます。"),
  N("s07-4.mp3", "そこで国は、今使ってよい暗号を評価してリストにまとめています。"),
  // 難読語の例外: CRYPTREC は音声だけ「クリプトレック」。字幕に読みを添える。
  N("s07-5.mp3", "それがCRYPTREC（クリプトレック）暗号リストです。"),
];

const SEG_KEY = [
  N("s08-1.mp3", "次は、鍵そのものの管理です。"),
  N("s08-2.mp3", "アルゴリズムがどれだけ強くても、鍵が漏れれば暗号は無意味になります。"),
  N("s08-3.mp3", "鍵は、生成、保管、更新、廃棄という一生を通して管理します。"),
  N("s08-4.mp3", "まず推測されにくい鍵を作り、限られた人だけが取り出せる場所に保管します。"),
  N("s08-5.mp3", "そして定期的に新しい鍵へ入れ替えます。"),
  N("s08-6.mp3", "使わなくなった鍵は、復元できない形で確実に捨てます。"),
];

const SEG_STORAGE = [
  N("s09-1.mp3", "暗号化が守るのは、通信だけではありません。"),
  N("s09-2.mp3", "保存されたデータを守るのが、ストレージ暗号化とファイル暗号化です。"),
  N("s09-3.mp3", "ストレージ暗号化は、ディスク全体をまるごと暗号化します。"),
  N("s09-4.mp3", "ファイル暗号化は、重要な書類を一つずつ暗号化します。"),
  N("s09-5.mp3", "端末や記録媒体を盗まれても、中身を読み取られずに済みます。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "ハッシュ値から、もとのデータを復元できるでしょうか。"),
  N("s11-3.mp3", "正解は、復元できない、です。一方向性があるからです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "二つのファイルのハッシュ値が一致したとき、何が言えるでしょうか。"),
  N("s12-3.mp3", "正解は、中身が同じだと判断できる、です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "時間の経過とともに暗号の安全性が下がることを、何と呼ぶでしょうか。"),
  N("s13-3.mp3", "正解は、危殆化です。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s14-1.mp3", "ハッシュ関数は固定長のハッシュ値を作り、もとには戻せません。"),
  N("s14-2.mp3", "ハッシュ値が一致すれば中身も同じ、だから改ざんを見抜けます。"),
  N("s14-3.mp3", "鍵は生成から廃棄まで管理し、暗号の危殆化にも備えます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// P2: 導入 — 左テキスト + 右イラスト（tech-hash.png）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const lead = useAppear(0.3);
  const note = useAppear(segStart(SEG_INTRO, 3), { dy: 12 });
  const illust = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1.1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10 * SCALE,
          }}
        >
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.5,
              whiteSpace: "pre-line",
              ...lead,
            }}
          >
            {"中身を見比べずに\n"}
            <span style={markerStyle}>改ざん</span>を見抜く
          </span>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.5,
              ...note,
            }}
          >
            使うのは「もとに戻せない変換」
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/tech-hash.png")}
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
// P3: ハッシュ関数 — 長さのばらばらな入力（右寄せの棒）→ 固定長のダイジェスト
// ---------------------------------------------------------------------------

// 3列（入力・矢印・ダイジェスト）の幅は定数で持ち、見出し行とデータ行で共有する。
// 全体を TABLE_W の固定幅ラッパーに入れないと、見出しとデータ行で中央寄せの基準が変わってズレる。
const COL_IN = 150 * SCALE;
const COL_ARROW = 22 * SCALE;
const COL_OUT = 112 * SCALE;
const TABLE_W = COL_IN + COL_ARROW + COL_OUT;

const DigestRow: React.FC<{ label: string; ratio: number; value: string; atSec: number }> = ({
  label,
  ratio,
  value,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, ...row }}>
      <div
        style={{
          width: COL_IN,
          flex: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 2.5 * SCALE,
        }}
      >
        <span style={{ fontSize: 10 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
          {label}
        </span>
        <span
          style={{
            width: `${ratio * 100}%`,
            height: 9 * SCALE,
            borderRadius: 999,
            backgroundColor: colors.primary300,
          }}
        />
      </div>
      <span
        style={{
          width: COL_ARROW,
          flex: "none",
          textAlign: "center",
          fontSize: 18 * SCALE,
          lineHeight: 1,
          color: colors.primary300,
        }}
      >
        →
      </span>
      <span
        style={{
          width: COL_OUT,
          flex: "none",
          textAlign: "center",
          fontFamily: fontMono,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          letterSpacing: 0.5 * SCALE,
          color: colors.textPrimaryDark,
          backgroundColor: colors.primary600,
          borderRadius: 9 * SCALE,
          padding: `${5.5 * SCALE}px 0`,
        }}
      >
        {value}
      </span>
    </div>
  );
};

const DigestScene: React.FC = () => {
  const term = useAppear(segStart(SEG_DIGEST, 1), { dy: 10 });
  const sameLen = useAppear(segStart(SEG_DIGEST, 2), { dy: 8 });
  const sha = usePop(segStart(SEG_DIGEST, 3));
  return (
    <SlideShell
      heading="ハッシュ関数"
      icon={<Ms name="tag" size={videoType.slideHeadIcon} />}
      narration={SEG_DIGEST}
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
          gap: 5 * SCALE,
        }}
      >
        <div
          style={{
            width: TABLE_W,
            flex: "none",
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
          }}
        >
          {/* 列見出し（データ行と同じ3列幅を使う。右列の語は nowrap で右にはみ出させる） */}
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <span
              style={{
                width: COL_IN,
                flex: "none",
                textAlign: "right",
                fontSize: 10.5 * SCALE,
                fontWeight: 700,
                color: colors.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
              入力データ（長さはばらばら）
            </span>
            <span style={{ width: COL_ARROW, flex: "none" }} />
            <span
              style={{
                width: COL_OUT,
                flex: "none",
                display: "flex",
                flexDirection: "column",
                gap: 1 * SCALE,
              }}
            >
              <b
                style={{
                  fontSize: 13.5 * SCALE,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  ...term,
                }}
              >
                <span style={markerStyle}>メッセージダイジェスト</span>
              </b>
              <span
                style={{
                  fontSize: 10 * SCALE,
                  fontWeight: 700,
                  color: colors.textSecondary,
                  whiteSpace: "nowrap",
                  ...sameLen,
                }}
              >
                ＝ハッシュ値。長さは常に同じ
              </span>
            </span>
          </div>

          <DigestRow label="「はい」の2文字" ratio={0.3} value="9f86d0…f56a" atSec={0.5} />
          <DigestRow label="契約書のPDF" ratio={0.62} value="a3f19c…d42b" atSec={1.3} />
          <DigestRow label="動画ファイル 2GB" ratio={1} value="7d02ef…41ee" atSec={2.1} />
        </div>

        <span
          style={{
            marginTop: 3 * SCALE,
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            padding: `${4 * SCALE}px ${13 * SCALE}px`,
            borderRadius: 999,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary100}`,
            color: colors.primary800,
            fontSize: 11 * SCALE,
            fontWeight: 800,
            whiteSpace: "nowrap",
            ...sha,
          }}
        >
          <Ms name="verified" size={15 * SCALE} />
          SHA-256 は常に 256ビット
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 一方向性 — 上下2段の帯（暗号化＝往復 / ハッシュ＝片道）
// ---------------------------------------------------------------------------

const WayBox: React.FC<{ text: string; tone: "plain" | "cipher" }> = ({ text, tone }) => (
  <b
    style={{
      flex: "none",
      // 「ハッシュ値」（5文字）が折り返さない幅。文字を増やすときは幅も見直す
      width: 68 * SCALE,
      textAlign: "center",
      fontSize: 11.5 * SCALE,
      fontWeight: 800,
      padding: `${8 * SCALE}px 0`,
      borderRadius: 11 * SCALE,
      backgroundColor: tone === "cipher" ? colors.primary600 : colors.surface,
      color: tone === "cipher" ? colors.textPrimaryDark : colors.textPrimary,
      border: `${1.5 * SCALE}px solid ${tone === "cipher" ? colors.primary600 : colors.border}`,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </b>
);

const WayBand: React.FC<{
  kind: string;
  from: string;
  to: string;
  fwd: string;
  backIcon: string;
  backText: string;
  danger?: boolean;
  atSec: number;
  verdictAtSec: number;
}> = ({ kind, from, to, fwd, backIcon, backText, danger, atSec, verdictAtSec }) => {
  const band = useAppear(atSec, { dy: 14 });
  const verdict = useAppear(verdictAtSec, { dy: 8 });
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        padding: `${10 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: colors.bg,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...band,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 44 * SCALE,
          textAlign: "center",
          fontSize: 10.5 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
          backgroundColor: colors.primary100,
          borderRadius: 999,
          padding: `${4 * SCALE}px 0`,
        }}
      >
        {kind}
      </span>
      <WayBox text={from} tone="plain" />
      <span
        style={{
          flex: "none",
          width: 40 * SCALE,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            whiteSpace: "nowrap",
          }}
        >
          {fwd}
        </span>
        <span style={{ fontSize: 20 * SCALE, lineHeight: 1, color: colors.primary300 }}>→</span>
      </span>
      <WayBox text={to} tone="cipher" />
      <span
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap: 6 * SCALE,
          marginLeft: 4 * SCALE,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          whiteSpace: "nowrap",
          color: danger ? colors.accentPinkText : colors.primary800,
          ...verdict,
        }}
      >
        <Ms name={backIcon} size={17 * SCALE} />
        <span>{backText}</span>
      </span>
    </div>
  );
};

const OneWayScene: React.FC = () => {
  const conclusion = useAppear(segStart(SEG_ONEWAY, 3), { dy: 10 });
  return (
    <SlideShell
      heading="一方向性"
      icon={<Ms name="alt_route" size={videoType.slideHeadIcon} />}
      narration={SEG_ONEWAY}
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
        <WayBand
          kind="暗号化"
          from="平文"
          to="暗号文"
          fwd="暗号化"
          backIcon="key"
          backText="鍵があれば戻せる"
          atSec={0.4}
          verdictAtSec={segStart(SEG_ONEWAY, 1)}
        />
        <WayBand
          kind="ハッシュ"
          from="データ"
          to="ハッシュ値"
          fwd="ハッシュ"
          backIcon="cancel"
          backText="戻す仕組みがない"
          danger
          atSec={1}
          verdictAtSec={segStart(SEG_ONEWAY, 2)}
        />
        <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.3, ...conclusion }}>
          <span>
            鍵の有無ではなく<span style={markerPinkStyle}>片道だから戻せない</span>
          </span>
        </b>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: パスワードの保管 — 保存テーブルのモック
// ---------------------------------------------------------------------------

const StoreRow: React.FC<{ user: string; value: string; atSec: number }> = ({
  user,
  value,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        padding: `${2.5 * SCALE}px 0`,
        borderTop: `${1 * SCALE}px solid ${colors.border}`,
        ...row,
      }}
    >
      <span style={{ flex: "none", width: 46 * SCALE, fontSize: 10.5 * SCALE, fontWeight: 700 }}>
        {user}
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: fontMono,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          color: colors.primary600,
          letterSpacing: 0.4 * SCALE,
        }}
      >
        {value}
      </span>
    </div>
  );
};

const CheckChip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const chip = usePop(atSec);
  return (
    <span
      style={{
        fontSize: 10.5 * SCALE,
        fontWeight: 800,
        color: colors.primary800,
        backgroundColor: colors.primary50,
        border: `${1.5 * SCALE}px solid ${colors.primary100}`,
        borderRadius: 999,
        padding: `${4 * SCALE}px ${12 * SCALE}px`,
        whiteSpace: "nowrap",
        ...chip,
      }}
    >
      {text}
    </span>
  );
};

/** チップ間の矢印。useAppear を掛けないと、チップが出る前から矢印だけが浮いて見える */
const ChipArrow: React.FC<{ atSec: number }> = ({ atSec }) => {
  const arrow = useAppear(atSec, { dy: 0 });
  return (
    <span style={{ fontSize: 15 * SCALE, color: colors.primary300, ...arrow }}>→</span>
  );
};

const PasswordScene: React.FC = () => {
  const risk = useAppear(segStart(SEG_PASSWORD, 1), { dy: 10 });
  // 保存テーブルはこのページの前提（1文目が「パスワードの保管に使われています」）なので先に出す。
  // 枠だけ先出しして値を後から入れると、10秒近く空の箱が画面に居座るのでそれは避けた
  const card = useAppear(0.4, { dy: 14 });
  const rowAt = 0.55;
  const flowAt = segStart(SEG_PASSWORD, 3);
  return (
    <SlideShell
      heading="パスワードはハッシュ値で保管"
      icon={<Ms name="key" size={videoType.slideHeadIcon} />}
      narration={SEG_PASSWORD}
    >
      {/* 本文の高さは約755pxしかない。行を足すとチップ列が字幕帯に潜るので、
          カードの padding と行の文字サイズはここまで詰めてある（stills で確認済み） */}
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
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            alignSelf: "flex-start",
            padding: `${6 * SCALE}px ${13 * SCALE}px`,
            borderRadius: 10 * SCALE,
            backgroundColor: colors.accentPinkSurface,
            border: `${1.5 * SCALE}px solid ${colors.accentPinkSoft}`,
            color: colors.accentPinkText,
            fontSize: 11 * SCALE,
            fontWeight: 800,
            whiteSpace: "nowrap",
            ...risk,
          }}
        >
          <Ms name="warning" size={15 * SCALE} />
          そのまま保存すると、漏れたとき全員が悪用される
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: `${5 * SCALE}px ${16 * SCALE}px ${6 * SCALE}px`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 13 * SCALE,
            ...card,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12 * SCALE,
              paddingBottom: 4 * SCALE,
            }}
          >
            <span
              style={{
                flex: "none",
                width: 46 * SCALE,
                fontSize: 9.5 * SCALE,
                fontWeight: 700,
                color: colors.textSecondary,
              }}
            >
              利用者
            </span>
            <span
              style={{
                flex: 1,
                fontSize: 9.5 * SCALE,
                fontWeight: 700,
                color: colors.textSecondary,
              }}
            >
              保存されている値（ハッシュ値）
            </span>
          </div>
          <StoreRow user="sato" value="8f4e2a…d19c" atSec={rowAt + 0.15} />
          <StoreRow user="tanaka" value="1b7c93…40af" atSec={rowAt + 0.4} />
          <StoreRow user="suzuki" value="e02d6f…7b58" atSec={rowAt + 0.65} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
          <CheckChip text="入力値をハッシュ計算" atSec={flowAt} />
          <ChipArrow atSec={flowAt + 0.35} />
          <CheckChip text="保存値と比べる" atSec={flowAt + 0.5} />
          <ChipArrow atSec={flowAt + 0.85} />
          <CheckChip text="一致すれば本人" atSec={flowAt + 1} />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 衝突困難性と改ざん検知 — 2つのハッシュ値の突き合わせ
// ---------------------------------------------------------------------------

const CompareCard: React.FC<{ label: string; value: string; atSec: number }> = ({
  label,
  value,
  atSec,
}) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${10 * SCALE}px ${8 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 13 * SCALE,
        ...card,
      }}
    >
      <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 15 * SCALE,
          fontWeight: 800,
          color: colors.primary600,
          letterSpacing: 0.5 * SCALE,
        }}
      >
        {value}
      </span>
    </div>
  );
};

const CollisionScene: React.FC = () => {
  const def = useAppear(0.4);
  const rule = useAppear(segStart(SEG_COLLISION, 2), { dy: 12 });
  const cmpAt = segStart(SEG_COLLISION, 3);
  const equals = usePop(cmpAt + 0.8);
  const note = useAppear(cmpAt + 1.3, { dy: 8 });
  return (
    <SlideShell
      heading="衝突困難性"
      icon={<Ms name="fact_check" size={videoType.slideHeadIcon} />}
      narration={SEG_COLLISION}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 9 * SCALE,
        }}
      >
        <span
          style={{
            fontSize: 12.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.4,
            ...def,
          }}
        >
          同じハッシュ値になる別のデータは、作り出せない
        </span>

        <b
          style={{
            fontSize: 18 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...rule,
          }}
        >
          <span>
            値が<span style={markerStyle}>一致</span>すれば、中身も同じ
          </span>
        </b>

        <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE, marginTop: 2 * SCALE }}>
          <CompareCard label="配布元が公開した値" value="a3f19c…d42b" atSec={cmpAt} />
          <span
            style={{
              flex: "none",
              fontSize: 24 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              ...equals,
            }}
          >
            ＝
          </span>
          <CompareCard label="手元で計算した値" value="a3f19c…d42b" atSec={cmpAt + 0.4} />
        </div>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            color: colors.accentPinkText,
            ...note,
          }}
        >
          <Ms name="report" size={16 * SCALE} />
          <span>一文字でも書き換わっていれば、まったく別の値になる</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 危殆化とCRYPTREC暗号リスト — キーワード見出し + 右イラスト + 下帯
// ---------------------------------------------------------------------------

const KitaikaScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const desc = useAppear(segStart(SEG_KITAIKA, 1), { dy: 10 });
  const illust = useAppear(0.6);
  const band = useAppear(segStart(SEG_KITAIKA, 3), { dy: 12 });
  const listName = useAppear(segStart(SEG_KITAIKA, 4), { dy: 6 });
  return (
    <SlideShell narration={SEG_KITAIKA}>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
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
              暗号の経年劣化
            </span>
            <b style={{ fontSize: 32 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
              <span style={markerStyle}>危殆化</span>
            </b>
            <span
              style={{
                fontSize: 12 * SCALE,
                fontWeight: 700,
                lineHeight: 1.5,
                ...desc,
              }}
            >
              計算機の性能が上がるほど、いま安全な暗号も破られやすくなる
            </span>
          </div>
          <Img
            src={staticFile("images/ipa_sg/icon-clock.png")}
            style={{
              flex: 0.8,
              minWidth: 0,
              maxHeight: 62 * SCALE,
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illust,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12 * SCALE,
            padding: `${10 * SCALE}px ${16 * SCALE}px`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 14 * SCALE,
            ...band,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="policy" size={26 * SCALE} />
          </span>
          <span
            style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 * SCALE }}
          >
            <b style={{ fontSize: 15 * SCALE, fontWeight: 800, ...listName }}>
              <span style={markerStyle}>CRYPTREC暗号リスト</span>
            </b>
            <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
              国が安全性を評価した「いま使ってよい暗号」の一覧
            </span>
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 保存データの暗号化 — 左イラスト（tech-cabinet.png）+ 右カード2枚 + 下帯
// ---------------------------------------------------------------------------

const EncTargetCard: React.FC<{
  icon: string;
  name: string;
  desc: string;
  atSec: number;
  descAtSec: number;
}> = ({ icon, name, desc, atSec, descAtSec }) => {
  const card = usePop(atSec);
  const descAppear = useAppear(descAtSec, { dy: 6 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        padding: `${9 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 13 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 36 * SCALE,
          height: 36 * SCALE,
          borderRadius: 12 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={21 * SCALE} />
      </span>
      <span
        style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 * SCALE }}
      >
        <b style={{ fontSize: 14 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
        <span
          style={{
            fontSize: 10.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            ...descAppear,
          }}
        >
          {desc}
        </span>
      </span>
    </div>
  );
};

const StorageScene: React.FC = () => {
  const illust = useAppear(0.4);
  const cardAt = segStart(SEG_STORAGE, 1);
  const band = useAppear(segStart(SEG_STORAGE, 4), { dy: 12 });
  return (
    <SlideShell
      heading="守るのは通信だけではない"
      icon={<Ms name="storage" size={videoType.slideHeadIcon} />}
      narration={SEG_STORAGE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 11 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4%" }}>
          <Img
            src={staticFile("images/ipa_sg/tech-cabinet.png")}
            style={{
              flex: 0.7,
              minWidth: 0,
              maxHeight: 88 * SCALE,
              objectFit: "contain",
              mixBlendMode: "multiply",
              ...illust,
            }}
          />
          <div
            style={{
              flex: 1.5,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 9 * SCALE,
            }}
          >
            <EncTargetCard
              icon="storage"
              name="ストレージ暗号化"
              desc="ディスク全体をまるごと暗号化する"
              atSec={cardAt}
              descAtSec={segStart(SEG_STORAGE, 2)}
            />
            <EncTargetCard
              icon="description"
              name="ファイル暗号化"
              desc="重要な書類を一つずつ暗号化する"
              atSec={cardAt + 2.2}
              descAtSec={segStart(SEG_STORAGE, 3)}
            />
          </div>
        </div>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            alignSelf: "center",
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            ...band,
          }}
        >
          <Ms name="smartphone" size={18 * SCALE} />
          <span>
            端末や記録媒体を<span style={markerPinkStyle}>盗まれても読めない</span>
          </span>
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

export const SgL16HashKeyManagement: VideoSpec = {
  id: "sg-L16-hash-key-management",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "ハッシュ関数と\n鍵管理",
      keywords: ["一方向性", "危殆化", "鍵管理"],
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
      name: "digest",
      durationSec: 6,
      narration: SEG_DIGEST,
      component: DigestScene,
    },
    {
      pattern: "custom",
      name: "one-way",
      durationSec: 6,
      narration: SEG_ONEWAY,
      component: OneWayScene,
    },
    {
      pattern: "custom",
      name: "password",
      durationSec: 6,
      narration: SEG_PASSWORD,
      component: PasswordScene,
    },
    {
      pattern: "custom",
      name: "collision",
      durationSec: 6,
      narration: SEG_COLLISION,
      component: CollisionScene,
    },
    {
      pattern: "custom",
      name: "kitaika",
      durationSec: 6,
      narration: SEG_KITAIKA,
      component: KitaikaScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "flow",
      heading: "鍵管理 ― 鍵の一生を守る",
      icon: "autorenew",
      steps: [
        { abc: "1", name: "生成", sub: "推測されにくい鍵" },
        { abc: "2", name: "保管", sub: "取り出せる人を限る" },
        { abc: "3", name: "更新", sub: "定期的に入れ替え" },
        { abc: "4", name: "廃棄", sub: "復元できない形で" },
      ],
      highlightAtSec: [
        segStart(SEG_KEY, 3),
        segStart(SEG_KEY, 3) + 3.2,
        segStart(SEG_KEY, 4),
        segStart(SEG_KEY, 5),
      ],
      narration: SEG_KEY,
    },
    {
      pattern: "custom",
      name: "storage",
      durationSec: 6,
      narration: SEG_STORAGE,
      component: StorageScene,
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
      question: "ハッシュ値からもとのデータは？",
      choices: [
        { key: "A", text: "復元できない", correct: true },
        { key: "B", text: "鍵があれば復元できる" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "ハッシュ値が一致したら？",
      choices: [
        { key: "A", text: "作成者が同じだと分かる" },
        { key: "B", text: "中身が同じだと分かる", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "暗号の安全性が下がることは？",
      choices: [
        { key: "A", text: "危殆化", correct: true },
        { key: "B", text: "一方向性" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行29文字が上限（超えるとテロップ帯に重なる）ので読み上げ文より短く圧縮した
          text: "ハッシュ関数は固定長の値を作り、戻せない",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "値が一致すれば中身も同じ＝改ざん検知",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "鍵は生成から廃棄まで管理し、危殆化に備える",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
