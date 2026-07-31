import { Img, interpolateColors, staticFile } from "remotion";
import { colors, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L28-isms-management-system.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L28: ISMS①：マネジメントシステム
 *
 * 発注書 content_works/ipa_sg/orders/L28.md の範囲。
 * シナリオは narration/ipa_sg/sg-L28-isms-management-system.md。
 *
 * 「守る活動を"回る仕組み"にする」を背骨に:
 *   導入（決めても続かない）→ ISMS＝個々の対策でなく仕組みの規格 → 適用範囲（対象を区切る）→
 *   リーダーシップ（経営層）→ wipe-light で ★PDCAの型 → 計画と運用 → パフォーマンス評価（vs）→
 *   改善（不適合→是正処置）→ 抽象→具体の場面（監査の指摘）→ クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 呼称は既習回に揃えた: 四つの柱の枠組み＝L22、規程の3階層（情報セキュリティ方針）＝L27、
 * リスクアセスメント＝L24、リスク対応（回避・低減）＝L25。既習の中身は再説明せず1文で回収する。
 *
 * 範囲: **管理策（JIS Q 27002・4区分・附属書A）と認証制度（適合性評価制度・認証取得の流れ）には
 * 踏み込まない**（L29 が主担当）。s03-5 で「満たせば認証を受けられる」と位置づけだけ渡す。
 *
 * 音声と字幕を分けた箇所（TTS の英字読み対策・jobs.json 側だけ仮名書き。字幕はここの英字表記が出る）:
 *   ISMS → アイエスエムエス / PDCA → ピーディーシーエー /
 *   Plan → プラン / Do → ドゥー / Check → チェック / Act → アクト
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L28-isms-management-system");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、ISMSと呼ばれる仕組みについて学びます。"),
  N("s02-2.mp3", "ルールを決め、リスクに手を打っても、それだけでは長続きしません。"),
  N("s02-3.mp3", "担当者が変わると忘れられ、状況が変わっても見直されません。"),
  N("s02-4.mp3", "そこで、守る活動そのものを、組織で回る仕組みにします。"),
];

const SEG_ISMS = [
  N("s03-1.mp3", "ISMSは、情報セキュリティマネジメントシステムの略です。"),
  N("s03-2.mp3", "ファイアウォールのような、個々の対策のことではありません。"),
  N("s03-3.mp3", "組織として決め、実行し、点検して直す、その仕組み全体を指します。"),
  N("s03-4.mp3", "その要求事項は、JIS Q 27001という規格に定められています。"),
  N("s03-5.mp3", "要求事項を満たせば認証を受けることもできますが、その制度は次回学びます。"),
];

const SEG_SCOPE = [
  N("s04-1.mp3", "ISMSを作るとき、最初に決めるのが適用範囲です。"),
  N("s04-2.mp3", "どの事業や拠点、どの情報を対象にするのかを区切ります。"),
  N("s04-3.mp3", "全社を一斉に対象にしなくてもかまいません。"),
  N("s04-4.mp3", "対象をはっきりさせないと、守るべき範囲があいまいになります。"),
];

const SEG_LEAD = [
  N("s05-1.mp3", "次に欠かせないのが、経営層のリーダーシップです。"),
  N("s05-2.mp3", "経営層が情報セキュリティ方針を定め、組織の内外に示します。"),
  N("s05-3.mp3", "人や予算といった資源を割り当てるのも、経営層の役割です。"),
  N("s05-4.mp3", "現場任せで経営層が関わらないものは、ISMSとは呼べません。"),
];

const SEG_PDCA = [
  N("s06-1.mp3", "ISMSの中身は、四つの段階を繰り返す形になっています。"),
  N("s06-2.mp3", "計画を立て、運用し、点検して、改善する。"),
  N("s06-3.mp3", "頭文字をとって、PDCAサイクルと呼びます。"),
  N("s06-4.mp3", "一周して終わりではなく、回すたびに良くしていきます。"),
];

const SEG_PLANDO = [
  N("s07-1.mp3", "最初のPlan、計画の段階を見ましょう。"),
  N("s07-2.mp3", "ここで行うのが、すでに学んだリスクアセスメントです。"),
  N("s07-3.mp3", "どんなリスクがあるかを洗い出し、大きさを測って順位を付けます。"),
  N("s07-4.mp3", "そのうえで、回避や低減といったリスク対応を決めます。"),
  N("s07-5.mp3", "続くDoでは、決めた対応を日常業務として実行していきます。"),
];

const SEG_CHECK = [
  N("s08-1.mp3", "三つ目のCheck、パフォーマンス評価です。"),
  N("s08-2.mp3", "決めたとおりに動いているかを、自分たちで点検します。"),
  N("s08-3.mp3", "組織の内部で行うこの点検を、内部監査と呼びます。"),
  N("s08-4.mp3", "その結果を経営層が受け取り、仕組み全体を見直します。"),
  N("s08-5.mp3", "これを、マネジメントレビューといいます。"),
];

const SEG_ACT = [
  N("s09-1.mp3", "最後のAct、改善の段階です。"),
  N("s09-2.mp3", "点検で見つかった、決めたとおりでない状態を不適合といいます。"),
  N("s09-3.mp3", "目の前の不具合を直すだけでは、また同じことが起こります。"),
  N("s09-4.mp3", "原因までさかのぼって取り除くことを、是正処置と呼びます。"),
  N("s09-5.mp3", "これを繰り返して仕組みを良くしていくのが、継続的改善です。"),
];

const SEG_CASE = [
  N("s10-1.mp3", "具体的な場面で、この流れを追ってみましょう。"),
  N("s10-2.mp3", "内部監査で、共有フォルダのアクセス権が調べられました。"),
  N("s10-3.mp3", "すると、退職した社員の権限が残っていることが分かりました。"),
  N("s10-4.mp3", "決めたとおりでないので、これが不適合です。"),
  N("s10-5.mp3", "権限を消すだけでなく、棚卸しの手順を作るところまでが是正処置です。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "内部監査は、PDCAのどの段階にあたるでしょうか。"),
  N("s12-3.mp3", "正解は、点検するCheckの段階です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "是正処置として正しいのは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、原因までさかのぼって取り除くことです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  N("s14-2.mp3", "ISMSで方針を定め、資源を割り当てるのは誰でしょうか。"),
  N("s14-3.mp3", "正解は、経営層です。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s15-1.mp3", "ISMSは、情報を守る活動を組織で回す仕組みです。"),
  N("s15-2.mp3", "計画、運用、評価、改善のPDCAを繰り返します。"),
  N("s15-3.mp3", "内部監査で点検し、原因を取り除く是正処置で直していきます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** アイコン + ラベル + 補足 の1行（枠は付けず、余白と色で見せる） */
const IconRow: React.FC<{
  icon: string;
  label: string;
  sub: string;
  atSec: number;
}> = ({ icon, label, sub, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 * SCALE, ...row }}>
      <span
        style={{
          width: 28 * SCALE,
          height: 28 * SCALE,
          flex: "none",
          borderRadius: 10 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 1.5 * SCALE, minWidth: 0 }}>
        <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{label}</b>
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {sub}
        </span>
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// P2: 導入 — 決めただけでは続かない（左イラスト + 右テキスト）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const illust = useAppear(0.4);
  const lead = useAppear(segStart(SEG_INTRO, 1), { dy: 14 });
  const concl = useAppear(segStart(SEG_INTRO, 3), { dy: 12 });
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/person-employee-m-worry.png")}
          style={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
        <div
          style={{
            flex: 1.15,
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
              lineHeight: 1.45,
              whiteSpace: "pre-line",
              ...lead,
            }}
          >
            {"決めて手を打つだけでは\n"}
            <span style={markerStyle}>長続きしない</span>
          </span>
          <IconRow
            icon="manage_accounts"
            label="担当者が変わる"
            sub="決めたことが忘れられていく"
            atSec={segStart(SEG_INTRO, 2)}
          />
          <IconRow
            icon="schedule"
            label="状況が変わる"
            sub="見直されないまま古くなる"
            atSec={segStart(SEG_INTRO, 2) + 0.8}
          />
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 800,
              lineHeight: 1.35,
              ...concl,
            }}
          >
            守る活動そのものを<span style={markerStyle}>回る仕組み</span>にする
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: ISMS は仕組みの規格（左キーワード見出し + 右に「対策そのもの／仕組み」の2行）
// ---------------------------------------------------------------------------

/** 「これではない／これだ」の2行。× はグレー、○ は青ベタで二重符号化 */
const ContrastRow: React.FC<{
  icon: string;
  mark: string;
  text: string;
  sub: string;
  on: boolean;
  atSec: number;
}> = ({ icon, mark, text, sub, on, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        padding: `${9 * SCALE}px ${12 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: on ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${on ? colors.primary500 : colors.border}`,
        ...row,
      }}
    >
      <span
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          color: on ? colors.primary600 : colors.textMuted,
        }}
      >
        <Ms name={mark} size={17 * SCALE} />
        <Ms name={icon} size={17 * SCALE} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 1.5 * SCALE, minWidth: 0 }}>
        <b
          style={{
            fontSize: 11.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.25,
            color: on ? colors.primary800 : colors.textSecondary,
          }}
        >
          {text}
        </b>
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {sub}
        </span>
      </span>
    </div>
  );
};

const IsmsScene: React.FC = () => {
  const chip = useAppear(0.3, { dy: 10 });
  const term = usePop(0.5);
  const full = useAppear(0.9, { dy: 10 });
  const std = useAppear(segStart(SEG_ISMS, 3), { dy: 12 });
  return (
    <SlideShell narration={SEG_ISMS}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6 * SCALE,
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
              whiteSpace: "nowrap",
              ...chip,
            }}
          >
            仕組みそのものの規格
          </span>
          <b style={{ fontSize: 34 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>ISMS</span>
          </b>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...full,
            }}
          >
            {"情報セキュリティ\nマネジメントシステム"}
          </span>
          {/* 規格番号は s03-4 で読み上げる。ISO/IEC 併記は同じ規格の別名なので注記に添える */}
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2 * SCALE,
              marginTop: 3 * SCALE,
              padding: `${7 * SCALE}px ${12 * SCALE}px`,
              borderRadius: 12 * SCALE,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary100}`,
              ...std,
            }}
          >
            <span
              style={{
                fontSize: 9 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                lineHeight: 1.2,
              }}
            >
              要求事項を定めた規格
            </span>
            <b
              style={{
                fontSize: 12.5 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
                lineHeight: 1.25,
                whiteSpace: "nowrap",
              }}
            >
              JIS Q 27001（ISO/IEC 27001）
            </b>
          </span>
        </div>
        <div
          style={{
            flex: 1.05,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8 * SCALE,
          }}
        >
          <ContrastRow
            mark="cancel"
            icon="shield"
            text="個々の対策そのもの"
            sub="ファイアウォールなどの製品"
            on={false}
            atSec={segStart(SEG_ISMS, 1)}
          />
          <ContrastRow
            mark="task_alt"
            icon="autorenew"
            text="決めて、実行して、点検して直す"
            sub="組織で回る仕組み全体を指す"
            on
            atSec={segStart(SEG_ISMS, 2)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 適用範囲 — 会社の枠の中で対象を区切る
// ---------------------------------------------------------------------------

const ScopeTile: React.FC<{ name: string; inScope: boolean; atSec: number }> = ({
  name,
  inScope,
  atSec,
}) => {
  const on = useProgress(inScope ? atSec : 99999, 0.4);
  const bg = interpolateColors(on, [0, 1], [colors.surface, colors.primary600]);
  const bd = interpolateColors(on, [0, 1], [colors.border, colors.primary600]);
  const fg = interpolateColors(on, [0, 1], [colors.textSecondary, colors.textPrimaryDark]);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5 * SCALE,
        padding: `${10 * SCALE}px 0`,
        borderRadius: 11 * SCALE,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${bd}`,
      }}
    >
      <span style={{ display: "flex", color: fg, opacity: on }}>
        <Ms name="task_alt" size={15 * SCALE} />
      </span>
      <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, color: fg, whiteSpace: "nowrap" }}>
        {name}
      </b>
    </div>
  );
};

const ScopeScene: React.FC = () => {
  const box = useAppear(0.3);
  const badge = usePop(segStart(SEG_SCOPE, 1));
  const note1 = useAppear(segStart(SEG_SCOPE, 2), { dy: 12 });
  const scopeAt = segStart(SEG_SCOPE, 1);
  return (
    <SlideShell
      heading="まず対象を区切る"
      icon={<Ms name="grid_view" size={videoType.slideHeadIcon} />}
      narration={SEG_SCOPE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 9 * SCALE,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8 * SCALE,
            padding: `${10 * SCALE}px ${12 * SCALE}px ${12 * SCALE}px`,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.bg,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...box,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.textMuted,
                whiteSpace: "nowrap",
              }}
            >
              A社ぜんたい
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5 * SCALE,
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.textPrimaryDark,
                backgroundColor: colors.primary600,
                borderRadius: 999,
                padding: `${3 * SCALE}px ${11 * SCALE}px`,
                whiteSpace: "nowrap",
                ...badge,
              }}
            >
              <Ms name="grid_view" size={13 * SCALE} />
              青い部分＝適用範囲
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 * SCALE }}>
            <ScopeTile name="本社" inScope={false} atSec={scopeAt} />
            <ScopeTile name="営業部" inScope atSec={scopeAt} />
            <ScopeTile name="開発部" inScope atSec={scopeAt + 0.35} />
          </div>
          <div style={{ display: "flex", gap: 8 * SCALE }}>
            <ScopeTile name="工場" inScope={false} atSec={scopeAt} />
            <ScopeTile name="物流センター" inScope={false} atSec={scopeAt} />
            <ScopeTile name="海外支社" inScope={false} atSec={scopeAt} />
          </div>
        </div>
        <span style={{ fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.35, ...note1 }}>
          全社を一斉に対象にしなくてよい（<span style={markerStyle}>事業・拠点・情報で区切る</span>）
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: リーダーシップ — 左テキスト3行 + 右イラスト（P2の鏡像）
// ---------------------------------------------------------------------------

const LeadershipScene: React.FC = () => {
  const illust = useAppear(0.5);
  const lead = useAppear(0.3, { dy: 12 });
  return (
    <SlideShell
      heading="動かすのは経営層"
      icon={<Ms name="supervisor_account" size={videoType.slideHeadIcon} />}
      narration={SEG_LEAD}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          alignItems: "center",
          gap: "4%",
        }}
      >
        <div
          style={{
            flex: 1.3,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 9 * SCALE,
          }}
        >
          <span style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.35, ...lead }}>
求められるのは<span style={markerStyle}>リーダーシップ</span>
          </span>
          <IconRow
            icon="flag"
            label="方針を定める"
            sub="情報セキュリティ方針を組織の内外に示す"
            atSec={segStart(SEG_LEAD, 1)}
          />
          <IconRow
            icon="payments"
            label="資源を割り当てる"
            sub="人や予算を用意する"
            atSec={segStart(SEG_LEAD, 2)}
          />
          <IconRow
            icon="verified"
            label="責任を持つ"
            sub="現場任せではISMSと呼べない"
            atSec={segStart(SEG_LEAD, 3)}
          />
        </div>
        <Img
          src={staticFile("images/ipa_sg/person-leader-point.png")}
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
// P6: ★核心 — PDCA の2×2（時計回り）+ 中央に循環ハブ
// ---------------------------------------------------------------------------

const PdcaCard: React.FC<{
  abc: string;
  name: string;
  desc: string;
  atSec: number;
}> = ({ abc, name, desc, atSec }) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        padding: `${10 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 13 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...card,
      }}
    >
      <span
        style={{
          width: 30 * SCALE,
          height: 30 * SCALE,
          flex: "none",
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 15 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {abc}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 * SCALE, minWidth: 0 }}>
        <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{name}</b>
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {desc}
        </span>
      </span>
    </div>
  );
};

const PdcaScene: React.FC = () => {
  // 循環ハブは最後の1文（「回すたびに良くしていきます」）で出す＝語りに画面を合わせる
  const hub = usePop(segStart(SEG_PDCA, 3));
  const cycle = useAppear(segStart(SEG_PDCA, 2), { dy: 12 });
  const at = segStart(SEG_PDCA, 1);
  return (
    <SlideShell
      heading="中身は4つの段階の繰り返し"
      icon={<Ms name="sync" size={videoType.slideHeadIcon} />}
      narration={SEG_PDCA}
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
        {/* 2×2 を時計回りに読ませる（左上P → 右上D → 右下C → 左下A）。中央は循環ハブ */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 22 * SCALE }}>
          <div style={{ display: "flex", gap: 22 * SCALE }}>
            <PdcaCard abc="P" name="計画" desc="リスクを測り、対応を決める" atSec={at} />
            <PdcaCard abc="D" name="運用" desc="決めたことを日常業務で実行" atSec={at + 0.5} />
          </div>
          <div style={{ display: "flex", gap: 22 * SCALE }}>
            <PdcaCard abc="A" name="改善" desc="原因を取り除いて直す" atSec={at + 1.5} />
            <PdcaCard abc="C" name="評価" desc="決めたとおりか点検する" atSec={at + 1.0} />
          </div>
          {/* 位置決めは外側 div、アニメは内側に当てる（transform の競合を避ける） */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              translate: "-50% -50%",
              display: "flex",
            }}
          >
            <span
              style={{
                width: 19 * SCALE,
                height: 19 * SCALE,
                borderRadius: 999,
                backgroundColor: colors.primary100,
                color: colors.primary600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...hub,
              }}
            >
              <Ms name="autorenew" size={13 * SCALE} />
            </span>
          </div>
        </div>
        <span
          style={{
            alignSelf: "center",
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...cycle,
          }}
        >
          頭文字をとって<span style={markerStyle}>PDCAサイクル</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: 計画と運用（上段 P に2カード／下段 D に横長1帯）
// ---------------------------------------------------------------------------

const StageLabel: React.FC<{ abc: string; name: string; atSec: number }> = ({
  abc,
  name,
  atSec,
}) => {
  const row = useAppear(atSec, { dy: 10 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE, ...row }}>
      <span
        style={{
          width: 22 * SCALE,
          height: 22 * SCALE,
          flex: "none",
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {abc}
      </span>
      <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{name}</b>
    </div>
  );
};

const StageCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  atSec: number;
}> = ({ icon, title, desc, atSec }) => {
  const card = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        padding: `${10 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 13 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...card,
      }}
    >
      <span
        style={{
          width: 30 * SCALE,
          height: 30 * SCALE,
          flex: "none",
          borderRadius: 11 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={18 * SCALE} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 * SCALE, minWidth: 0 }}>
        <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{title}</b>
        <span
          style={{
            fontSize: 9.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            lineHeight: 1.3,
          }}
        >
          {desc}
        </span>
      </span>
    </div>
  );
};

const PlanDoScene: React.FC = () => {
  const band = useAppear(segStart(SEG_PLANDO, 4), { dy: 12 });
  return (
    <SlideShell
      heading="計画に組み込み、日常業務として回す"
      icon={<Ms name="checklist" size={videoType.slideHeadIcon} />}
      narration={SEG_PLANDO}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7 * SCALE,
        }}
      >
        <StageLabel abc="P" name="Plan：計画" atSec={0.3} />
        <div style={{ display: "flex", gap: 9 * SCALE }}>
          <StageCard
            icon="monitoring"
            title="リスクアセスメント"
            desc="洗い出し、測って順位を付ける"
            atSec={segStart(SEG_PLANDO, 1)}
          />
          <StageCard
            icon="alt_route"
            title="リスク対応"
            desc="回避や低減から打ち手を決める"
            atSec={segStart(SEG_PLANDO, 3)}
          />
        </div>
        <div style={{ ...band }}>
          <StageLabel abc="D" name="Do：運用" atSec={segStart(SEG_PLANDO, 4)} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10 * SCALE,
            padding: `${11 * SCALE}px ${14 * SCALE}px`,
            borderRadius: 13 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            ...band,
          }}
        >
          <span style={{ flex: "none", display: "flex", color: colors.primary600 }}>
            <Ms name="work" size={19 * SCALE} />
          </span>
          <b
            style={{
              fontSize: 13 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              lineHeight: 1.25,
            }}
          >
            決めた対応を日常業務として実行する
          </b>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: 改善 — 不適合を原因まで戻って直す（縦3行 + 継続的改善）
// ---------------------------------------------------------------------------

const ActRow: React.FC<{
  mark: string;
  text: string;
  chip?: string;
  tone: "plain" | "bad" | "good";
  atSec: number;
}> = ({ mark, text, chip, tone, atSec }) => {
  const row = useAppear(atSec, { dy: 12 });
  const bg =
    tone === "bad"
      ? colors.accentPinkSurface
      : tone === "good"
        ? colors.primary50
        : colors.surface;
  const bd =
    tone === "bad" ? colors.accentPinkSoft : tone === "good" ? colors.primary500 : colors.border;
  const fg =
    tone === "bad"
      ? colors.accentPinkText
      : tone === "good"
        ? colors.primary800
        : colors.textPrimary;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10 * SCALE,
        padding: `${9 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 12 * SCALE,
        backgroundColor: bg,
        border: `${1.5 * SCALE}px solid ${bd}`,
        ...row,
      }}
    >
      <span style={{ flex: "none", display: "flex", color: fg }}>
        <Ms name={mark} size={18 * SCALE} />
      </span>
      <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, color: fg, lineHeight: 1.25 }}>{text}</b>
      {chip ? (
        <span
          style={{
            marginLeft: "auto",
            flex: "none",
            fontSize: 10.5 * SCALE,
            fontWeight: 800,
            borderRadius: 999,
            padding: `${3 * SCALE}px ${12 * SCALE}px`,
            whiteSpace: "nowrap",
            backgroundColor: tone === "bad" ? colors.accentPink : colors.primary600,
            color: colors.textPrimaryDark,
          }}
        >
          {chip}
        </span>
      ) : null}
    </div>
  );
};

const ActScene: React.FC = () => {
  const foot = useAppear(segStart(SEG_ACT, 4), { dy: 12 });
  return (
    <SlideShell
      heading="Act：原因までさかのぼって直す"
      icon={<Ms name="build" size={videoType.slideHeadIcon} />}
      narration={SEG_ACT}
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
        <ActRow
          mark="report"
          text="点検で見つかった、決めたとおりでない状態"
          chip="不適合"
          tone="plain"
          atSec={segStart(SEG_ACT, 1)}
        />
        <ActRow
          mark="cancel"
          text="目の前の不具合だけを直す"
          chip="また起こる"
          tone="bad"
          atSec={segStart(SEG_ACT, 2)}
        />
        <ActRow
          mark="task_alt"
          text="原因までさかのぼって取り除く"
          chip="是正処置"
          tone="good"
          atSec={segStart(SEG_ACT, 3)}
        />
        <span
          style={{
            alignSelf: "center",
            marginTop: 2 * SCALE,
            fontSize: 12 * SCALE,
            fontWeight: 800,
            lineHeight: 1.3,
            ...foot,
          }}
        >
繰り返して良くしていく ＝ <span style={markerStyle}>継続的改善</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: 【抽象→具体】監査の指摘（左イラスト + 右に指摘票の4行）
// ---------------------------------------------------------------------------

const FindingRow: React.FC<{
  label: string;
  value: React.ReactNode;
  tone: "plain" | "bad" | "good";
  atSec: number;
}> = ({ label, value, tone, atSec }) => {
  const row = useAppear(atSec, { dy: 10 });
  const fg =
    tone === "bad"
      ? colors.accentPinkText
      : tone === "good"
        ? colors.primary800
        : colors.textPrimary;
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 * SCALE, ...row }}>
      <span
        style={{
          width: 40 * SCALE,
          flex: "none",
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: colors.textMuted,
          lineHeight: 1.3,
          whiteSpace: "nowrap", // 4文字の見出し（監査対象・是正処置）が折り返さない幅を確保する
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 12 * SCALE,
          fontWeight: 800,
          color: fg,
          lineHeight: 1.3,
          minWidth: 0,
        }}
      >
        {value}
      </span>
    </div>
  );
};

const CaseScene: React.FC = () => {
  const illust = useAppear(0.4);
  const card = useAppear(0.5);
  return (
    <SlideShell
      heading="内部監査で見つかったこと"
      icon={<Ms name="fact_check" size={videoType.slideHeadIcon} />}
      narration={SEG_CASE}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1%",
          display: "flex",
          alignItems: "center",
          gap: "4%",
        }}
      >
        <Img
          src={staticFile("images/ipa_sg/person-auditor-checklist.png")}
          style={{
            flex: 0.8,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illust,
          }}
        />
        <div
          style={{
            flex: 1.6,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 9 * SCALE,
            padding: `${13 * SCALE}px ${15 * SCALE}px`,
            borderRadius: 14 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            ...card,
          }}
        >
          <FindingRow
            label="監査対象"
            value="共有フォルダのアクセス権"
            tone="plain"
            atSec={segStart(SEG_CASE, 1)}
          />
          <FindingRow
            label="発見"
            value="退職した社員の権限が残っていた"
            tone="bad"
            atSec={segStart(SEG_CASE, 2)}
          />
          <FindingRow
            label="判定"
            value={<span style={markerStyle}>不適合</span>}
            tone="bad"
            atSec={segStart(SEG_CASE, 3)}
          />
          <FindingRow
            label="是正処置"
            value={"権限を消す ＋ 棚卸し手順を作る"}
            tone="good"
            atSec={segStart(SEG_CASE, 4)}
          />
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

export const SgL28IsmsManagementSystem: VideoSpec = {
  id: "sg-L28-isms-management-system",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "ISMS\nマネジメントシステム",
      keywords: ["適用範囲", "PDCA", "是正処置"],
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
      name: "isms",
      durationSec: 6,
      narration: SEG_ISMS,
      component: IsmsScene,
    },
    {
      pattern: "custom",
      name: "scope",
      durationSec: 5,
      narration: SEG_SCOPE,
      component: ScopeScene,
    },
    {
      pattern: "custom",
      name: "leadership",
      durationSec: 5,
      narration: SEG_LEAD,
      component: LeadershipScene,
    },
    {
      pattern: "custom",
      name: "pdca",
      durationSec: 6,
      narration: SEG_PDCA,
      transitionIn: "wipe-light",
      component: PdcaScene,
    },
    {
      pattern: "custom",
      name: "plan-do",
      durationSec: 6,
      narration: SEG_PLANDO,
      component: PlanDoScene,
    },
    {
      pattern: "vs",
      heading: "Check：決めたとおりか点検する",
      icon: "search",
      left: {
        title: "内部監査",
        icon: "fact_check",
        rows: [
          { k: "行うのは", v: "組織の内部の担当者" },
          { k: "見るもの", v: "決めたとおりに動いているか" },
          { k: "結果", v: "不適合の指摘" },
        ],
      },
      right: {
        title: "マネジメントレビュー",
        icon: "supervisor_account",
        rows: [
          { k: "行うのは", v: "経営層" },
          { k: "見るもの", v: "仕組み全体" },
          { k: "結果", v: "見直しの指示" },
        ],
      },
      columnAtSec: [segStart(SEG_CHECK, 2), segStart(SEG_CHECK, 3)],
      narration: SEG_CHECK,
    },
    {
      pattern: "custom",
      name: "improvement",
      durationSec: 6,
      narration: SEG_ACT,
      component: ActScene,
    },
    {
      pattern: "custom",
      name: "audit-case",
      durationSec: 6,
      narration: SEG_CASE,
      component: CaseScene,
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
      question: "内部監査はPDCAのどの段階？",
      choices: [
        { key: "A", text: "計画するPlan" },
        { key: "B", text: "点検するCheck", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "是正処置として正しいのは？",
      choices: [
        { key: "A", text: "原因までさかのぼって取り除く", correct: true },
        { key: "B", text: "見つかった不具合だけを直す" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "方針を定め、資源を割り当てるのは？",
      choices: [
        { key: "A", text: "情報システム部門の担当者" },
        { key: "B", text: "経営層", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行に収める（29文字が上限）
          text: "ISMSは情報を守る活動を組織で回す仕組み。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "計画・運用・評価・改善のPDCAを繰り返します。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "内部監査で点検し、是正処置で原因を取り除きます。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
