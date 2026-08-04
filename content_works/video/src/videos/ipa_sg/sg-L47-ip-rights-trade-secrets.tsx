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
import durations from "./sg-L47-ip-rights-trade-secrets.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L47: 知的財産権と不正競争防止法（第6章＝法務の入口）
 *
 * 発注書 content_works/ipa_sg/orders/L47.md に対応。
 * シナリオと用語の呼称は narration/ipa_sg/sg-L47-ip-rights-trade-secrets.md が正。
 *
 * 導入（目に見えないもの）→ 見取り図（知的財産権／不正競争防止法）→ 著作権は自動発生 →
 * 表現とアイデアの線引き（試験の急所）→ 三つの侵害 → コピープロテクト外し →
 * （wipe-light）営業秘密の三要件 → ★抽象→具体：置きっぱなしの顧客リスト →
 * ドメイン名の不正取得 → クイズ3問 → wipe でまとめ。
 *
 * ※ 読みの例外: TTS の誤読を避けるため、音声側（jobs.json）だけ
 *   「外す／外し／外して」→ はずす／はずし／はずして、「取ること」→ とること と仮名書きしている。
 *   同じ回に「社外秘」「対象外」「取得」（音読み）が出るため、訓読みの和語動詞が引きずられるのを防ぐ目的。
 *   字幕（下の N() 第2引数）は漢字表記が正で、音声と原稿が食い違って見えるが意図的
 *   （references/narration.md の例外規定）。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L47-ip-rights-trade-secrets");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_P2 = [
  N("s02-1.mp3", "会社では毎日、目に見えないものをたくさん扱っています。"),
  N("s02-2.mp3", "作った資料やプログラム、社外に出せない顧客のリスト。"),
  N("s02-3.mp3", "こうしたものは、実は法律でしっかり守られています。"),
  N("s02-4.mp3", "今回は、その守り方と、何をすると違反になるかを見ます。"),
];

const SEG_P3 = [
  N("s03-1.mp3", "作った人の権利をまとめて、知的財産権と呼びます。"),
  N("s03-2.mp3", "大きく、著作権と、産業財産権の二つに分かれます。"),
  N("s03-3.mp3", "特許権や商標権は、発明やブランドを守る産業財産権です。"),
  N("s03-4.mp3", "今回の主役は、表現を守る著作権のほうです。"),
  N("s03-5.mp3", "もう一つ、会社の秘密を守る不正競争防止法も見ていきます。"),
];

const SEG_P4 = [
  N("s04-1.mp3", "著作権のいちばん大事な性質は、自動的に発生することです。"),
  N("s04-2.mp3", "届け出も登録も要りません。作った瞬間から権利が生まれます。"),
  N("s04-3.mp3", "対象は幅広く、文書も、写真も、プログラムも含まれます。"),
  N("s04-4.mp3", "業務で作ったプログラムも、当然、著作物として保護されます。"),
];

const SEG_P5 = [
  N("s05-1.mp3", "ただし、守られるのは、表現されたものだけです。"),
  N("s05-2.mp3", "頭の中のアイデアそのものは、著作権では守られません。"),
  N("s05-3.mp3", "プログラムなら、書かれたソースコードは守られます。"),
  N("s05-4.mp3", "一方で、その土台にあるアルゴリズムは対象外です。"),
  N("s05-5.mp3", "アイデアは対象外。ここが、試験でいちばんの急所です。"),
];

const SEG_P6 = [
  N("s06-1.mp3", "では、何をすると権利の侵害になるのでしょうか。"),
  N("s06-2.mp3", "一つ目は、無断でコピーすること。"),
  N("s06-3.mp3", "買った業務ソフトを、何台ものパソコンに入れる行為です。"),
  N("s06-4.mp3", "二つ目は無断の改変、三つ目は無断の公開です。"),
  N("s06-5.mp3", "拾ったコードを断りなく製品に入れるのも、侵害にあたります。"),
];

const SEG_P7 = [
  N("s07-1.mp3", "著作権法には、もう一つ禁じられている行為があります。"),
  // 音声は「はずす」（jobs.json）。字幕は漢字表記が正
  N("s07-2.mp3", "コピーを防ぐ仕組みを外す、コピープロテクト外しです。"),
  N("s07-3.mp3", "こうした仕組みは、技術的保護手段と呼ばれます。"),
  N("s07-4.mp3", "これを回避する行為は、それ自体が違法とされています。"),
  N("s07-5.mp3", "自分でお金を払って買ったものでも、外してはいけません。"),
];

const SEG_P8 = [
  N("s08-1.mp3", "ここからは、会社の秘密を守る不正競争防止法です。"),
  N("s08-2.mp3", "守られるのは、営業秘密と呼ばれる情報です。"),
  N("s08-3.mp3", "ただし、秘密と呼べば守られる、というわけではありません。"),
  N("s08-4.mp3", "一つ目は、秘密として管理していること。秘密管理性です。"),
  N("s08-5.mp3", "二つ目は、事業に役立つこと。有用性です。"),
  N("s08-6.mp3", "三つ目は、まだ知られていないこと。非公知性です。"),
];

const SEG_P9 = [
  N("s09-1.mp3", "三つすべてを満たして、初めて営業秘密になります。"),
  N("s09-2.mp3", "たとえば、顧客リストのファイルがあったとします。"),
  N("s09-3.mp3", "誰でも開ける共有フォルダに、置きっぱなしになっていました。"),
  N("s09-4.mp3", "これでは、秘密として管理しているとはいえません。"),
  N("s09-5.mp3", "持ち出されても、営業秘密としては守ってもらえません。"),
  N("s09-6.mp3", "社外秘と書いて、見られる人を限る。理由はここにあります。"),
];

const SEG_P10 = [
  N("s10-1.mp3", "不正競争防止法は、ドメイン名も対象にしています。"),
  // 音声は「とること」（jobs.json）。次文の「取得」に引きずられる誤読の予防
  N("s10-2.mp3", "他社の名前やブランドによく似たドメインを取ること。"),
  N("s10-3.mp3", "不正な利益を得る目的なら、取得も使用も違反になります。"),
  N("s10-4.mp3", "似せた住所は、偽サイトへ誘い込む入り口にもなります。"),
  N("s10-5.mp3", "フィッシング対策という意味でも、大切な決まりです。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）

const SEG_Q1 = [
  N("s12-1.mp3", "ここで問題です。"),
  N("s12-2.mp3", "著作権法で保護されないのは、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、プログラムのアルゴリズムです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s13-1.mp3", "次の問題です。"),
  N("s13-2.mp3", "営業秘密として守られないのは、どちらの資料でしょうか。"),
  N("s13-3.mp3", "正解は、誰でも見られる場所に置いた資料です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s14-1.mp3", "最後の問題です。"),
  // 音声は「はずす」（jobs.json）
  N("s14-2.mp3", "コピープロテクトを外す行為は、どう扱われるでしょうか。"),
  N("s14-3.mp3", "正解は、自分で買ったものでも違法、です。", { gapBeforeSec: 1.8 }),
];

const SEG_P15 = [
  N("s15-1.mp3", "著作権が守るのは表現で、アイデアは対象外でした。"),
  N("s15-2.mp3", "侵害になるのは、無断のコピー、改変、そして公開です。"),
  N("s15-3.mp3", "営業秘密は、三つの要件をすべて満たして守られます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す（src/parts/common-narration.ts）
];

// ---------------------------------------------------------------------------
// P2: 導入 — 会社が扱う「目に見えないもの」を法律が守っている
// ---------------------------------------------------------------------------

const AssetRow: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 10 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...appear }}>
      <span
        style={{
          flex: "none",
          width: 16 * SCALE,
          height: 16 * SCALE,
          borderRadius: 7 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={10 * SCALE} />
      </span>
      <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{label}</b>
    </div>
  );
};

const IntroScene: React.FC = () => {
  const lead = useAppear(0.3);
  const conc = useAppear(segStart(SEG_P2, 2), { dy: 10 });
  const theme = useAppear(segStart(SEG_P2, 3));
  const illust = useAppear(segStart(SEG_P2, 2) + 0.2);

  return (
    <SlideShell narration={SEG_P2}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "4%" }}>
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
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              ...lead,
            }}
          >
            会社が毎日扱っている、目に見えないもの
          </span>
          <AssetRow icon="description" label="作った資料" atSec={segStart(SEG_P2, 1)} />
          <AssetRow icon="code" label="プログラム" atSec={segStart(SEG_P2, 1) + 0.35} />
          <AssetRow
            icon="group"
            label="社外に出せない顧客のリスト"
            atSec={segStart(SEG_P2, 1) + 0.7}
          />
          <b
            style={{
              fontSize: 20 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              marginTop: 3 * SCALE,
              ...conc,
            }}
          >
            どれも<span style={markerStyle}>法律が守っている</span>
          </b>
          <span
            style={{
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary100,
              borderRadius: 999,
              padding: `${2 * SCALE}px ${10 * SCALE}px`,
              ...theme,
            }}
          >
            今回：守り方と、違反になること
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/law-book.png")}
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
// P3: 今回の見取り図 — 知的財産権（入れ子）と、別枠の不正競争防止法
// ---------------------------------------------------------------------------

const MapScene: React.FC = () => {
  const outer = useAppear(0.3, { dy: 10 });
  const copyright = useAppear(segStart(SEG_P3, 1), { dy: 10 });
  const industrial = useAppear(segStart(SEG_P3, 1) + 0.4, { dy: 10 });
  const star = usePop(segStart(SEG_P3, 3));
  const unfair = useAppear(segStart(SEG_P3, 4), { dy: 10 });

  return (
    <SlideShell
      heading="今回の見取り図"
      icon={<Ms name="account_tree" size={videoType.slideHeadIcon} />}
      narration={SEG_P3}
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "3.5%" }}>
        {/* 知的財産権（外枠）の中に 著作権 / 産業財産権 */}
        <div
          style={{
            flex: 1.3,
            minWidth: 0,
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 6 * SCALE,
            borderRadius: 18 * SCALE,
            border: `${1.5 * SCALE}px dashed ${colors.primary300}`,
            backgroundColor: colors.surface,
            padding: `${9 * SCALE}px ${9 * SCALE}px`,
            ...outer,
          }}
        >
          <span style={{ fontSize: 15 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
            知的財産権 — 作った人の権利
          </span>
          <div style={{ display: "flex", gap: 6 * SCALE }}>
            <div
              style={{
                flex: 1,
                minWidth: 0,
                borderRadius: 13 * SCALE,
                backgroundColor: colors.primary50,
                border: `${1.5 * SCALE}px solid ${colors.primary500}`,
                padding: `${8 * SCALE}px ${8 * SCALE}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 3 * SCALE,
                ...copyright,
              }}
            >
              <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
                <span style={markerStyle}>著作権</span>
              </b>
              <span style={{ fontSize: 11 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
                表現を守る
              </span>
              <span
                style={{
                  fontSize: 9.5 * SCALE,
                  fontWeight: 800,
                  color: colors.textPrimaryDark,
                  backgroundColor: colors.primary600,
                  borderRadius: 999,
                  padding: `${1.5 * SCALE}px ${8 * SCALE}px`,
                  ...star,
                }}
              >
                今回の主役
              </span>
            </div>
            <div
              style={{
                flex: 1,
                minWidth: 0,
                borderRadius: 13 * SCALE,
                backgroundColor: colors.bg,
                border: `${1.5 * SCALE}px solid ${colors.border}`,
                padding: `${8 * SCALE}px ${8 * SCALE}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 3 * SCALE,
                ...industrial,
              }}
            >
              <b
                style={{
                  fontSize: 15 * SCALE,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: colors.textSecondary,
                }}
              >
                産業財産権
              </b>
              <span style={{ fontSize: 10.5 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
                特許権・商標権
              </span>
              <span style={{ fontSize: 10 * SCALE, fontWeight: 700, color: colors.textMuted }}>
                発明やブランド
              </span>
            </div>
          </div>
        </div>

        {/* 別枠の法律 */}
        <div
          style={{
            flex: 0.95,
            minWidth: 0,
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 4 * SCALE,
            borderRadius: 18 * SCALE,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            padding: `${9 * SCALE}px ${10 * SCALE}px`,
            ...unfair,
          }}
        >
          <span style={{ fontSize: 10 * SCALE, fontWeight: 800, color: colors.textMuted }}>
            もう一つの法律
          </span>
          <b style={{ fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
            <span style={markerStyle}>不正競争防止法</span>
          </b>
          <span style={{ fontSize: 11 * SCALE, fontWeight: 800, color: colors.textSecondary }}>
            会社の秘密を守る
          </span>
          <div style={{ display: "flex", gap: 4 * SCALE, marginTop: 2 * SCALE }}>
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
                backgroundColor: colors.primary100,
                borderRadius: 999,
                padding: `${1.5 * SCALE}px ${8 * SCALE}px`,
              }}
            >
              営業秘密
            </span>
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
                backgroundColor: colors.primary100,
                borderRadius: 999,
                padding: `${1.5 * SCALE}px ${8 * SCALE}px`,
              }}
            >
              ドメイン名
            </span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 著作権はいつ生まれるか — 自動発生（登録不要）と、対象の広さ
// ---------------------------------------------------------------------------

const TargetCard: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        padding: `${8 * SCALE}px 0`,
        borderRadius: 13 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        ...appear,
      }}
    >
      <span style={{ color: colors.primary600, display: "flex" }}>
        <Ms name={icon} size={20 * SCALE} />
      </span>
      <b style={{ fontSize: 13 * SCALE, fontWeight: 800 }}>{label}</b>
    </div>
  );
};

const CopyrightBirthScene: React.FC = () => {
  const lead = useAppear(0.3);
  const noReg = useAppear(segStart(SEG_P4, 1), { dy: 10 });
  const note = useAppear(segStart(SEG_P4, 3));

  return (
    <SlideShell
      heading="著作権はいつ生まれるか"
      icon={<Ms name="auto_stories" size={videoType.slideHeadIcon} />}
      narration={SEG_P4}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 7 * SCALE,
        }}
      >
        <b style={{ fontSize: 23 * SCALE, fontWeight: 800, lineHeight: 1.25, ...lead }}>
          作った瞬間に、<span style={markerStyle}>自動で発生</span>
        </b>

        <div style={{ display: "flex", gap: 6 * SCALE, ...noReg }}>
          {["届け出は不要", "登録も不要"].map((t) => (
            <span
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4 * SCALE,
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                color: colors.textSecondary,
                backgroundColor: colors.surface,
                border: `${1.5 * SCALE}px solid ${colors.border}`,
                borderRadius: 999,
                padding: `${3 * SCALE}px ${11 * SCALE}px`,
              }}
            >
              <span style={{ color: colors.textMuted, display: "flex" }}>
                <Ms name="cancel" size={12 * SCALE} />
              </span>
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 6 * SCALE, width: "82%" }}>
          <TargetCard icon="description" label="文書" atSec={segStart(SEG_P4, 2)} />
          <TargetCard icon="photo_camera" label="写真" atSec={segStart(SEG_P4, 2) + 0.3} />
          <TargetCard icon="code" label="プログラム" atSec={segStart(SEG_P4, 2) + 0.6} />
        </div>

        {/* 字幕と同じ文を画面に出さない（画面は短い言い切りだけを受け持つ） */}
        <span
          style={{
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            color: colors.textSecondary,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 999,
            padding: `${3 * SCALE}px ${12 * SCALE}px`,
            ...note,
          }}
        >
          仕事で作ったものも同じ
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 表現とアイデアの線引き — 試験のいちばんの急所
// ---------------------------------------------------------------------------

const SideCard: React.FC<{
  ok: boolean;
  title: string;
  term: string;
  exampleLabel: string;
  example: string;
  atSec: number;
  exampleAtSec: number;
}> = ({ ok, title, term, exampleLabel, example, atSec, exampleAtSec }) => {
  const appear = useAppear(atSec, { dy: 12 });
  const ex = useAppear(exampleAtSec, { dy: 8 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        alignSelf: "stretch",
        borderRadius: 15 * SCALE,
        backgroundColor: ok ? colors.primary50 : colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${ok ? colors.primary500 : colors.accentPink}`,
        padding: `${9 * SCALE}px ${10 * SCALE}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5 * SCALE,
        ...appear,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          color: ok ? colors.primary600 : colors.accentPinkText,
        }}
      >
        <Ms name={ok ? "check_circle" : "cancel"} size={14 * SCALE} />
        {title}
      </span>
      <b style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>{term}</b>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5 * SCALE,
          borderRadius: 9 * SCALE,
          backgroundColor: colors.surface,
          padding: `${4 * SCALE}px ${8 * SCALE}px`,
          ...ex,
        }}
      >
        <span style={{ fontSize: 9.5 * SCALE, fontWeight: 800, color: colors.textMuted }}>
          {exampleLabel}
        </span>
        <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, color: colors.textPrimary }}>
          {example}
        </b>
      </div>
    </div>
  );
};

const ProtectedOrNotScene: React.FC = () => {
  const conc = useAppear(segStart(SEG_P5, 4), { dy: 10 });

  return (
    <SlideShell
      heading="守られるのは、どちらか"
      icon={<Ms name="compare_arrows" size={videoType.slideHeadIcon} />}
      narration={SEG_P5}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "1.5%",
          display: "flex",
          flexDirection: "column",
          gap: 8 * SCALE,
        }}
      >
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 6 * SCALE }}>
          <SideCard
            ok
            title="守られる"
            term="表現されたもの"
            exampleLabel="プログラムなら"
            example="ソースコード"
            atSec={0.3}
            exampleAtSec={segStart(SEG_P5, 2)}
          />
          <SideCard
            ok={false}
            title="守られない"
            term="アイデアそのもの"
            exampleLabel="プログラムなら"
            example="アルゴリズム"
            atSec={segStart(SEG_P5, 1)}
            exampleAtSec={segStart(SEG_P5, 3)}
          />
        </div>
        <span
          style={{
            flex: "none",
            fontSize: 15 * SCALE,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.3,
            ...conc,
          }}
        >
          <span style={markerPinkStyle}>アイデアは対象外</span> — 試験でいちばんの急所
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 三つの侵害 — 無断のコピー・改変・公開。下に職場で起きる具体例
// ---------------------------------------------------------------------------

const BanCard: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const appear = usePop(atSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        padding: `${8 * SCALE}px ${4 * SCALE}px`,
        borderRadius: 13 * SCALE,
        backgroundColor: colors.accentPinkSurface,
        border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
        ...appear,
      }}
    >
      <span style={{ color: colors.accentPinkText, display: "flex" }}>
        <Ms name="cancel" size={15 * SCALE} />
      </span>
      <b style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{label}</b>
    </div>
  );
};

const ExampleBand: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const appear = useAppear(atSec, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        padding: `${6 * SCALE}px ${10 * SCALE}px`,
        ...appear,
      }}
    >
      <span style={{ flex: "none", color: colors.accentPinkText, display: "flex" }}>
        <Ms name="warning" size={13 * SCALE} />
      </span>
      <span
        style={{
          minWidth: 0,
          fontSize: 13 * SCALE,
          fontWeight: 800,
          color: colors.textSecondary,
          lineHeight: 1.3,
        }}
      >
        {text}
      </span>
    </div>
  );
};

const InfringementScene: React.FC = () => {
  const label = useAppear(segStart(SEG_P6, 2) - 0.2);

  return (
    <SlideShell
      heading="何をすると侵害になるか"
      icon={<Ms name="gpp_bad" size={videoType.slideHeadIcon} />}
      narration={SEG_P6}
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
        <div style={{ display: "flex", gap: 6 * SCALE }}>
          <BanCard label="無断でコピー" atSec={segStart(SEG_P6, 1)} />
          <BanCard label="無断で改変" atSec={segStart(SEG_P6, 3)} />
          <BanCard label="無断で公開" atSec={segStart(SEG_P6, 3) + 0.5} />
        </div>

        <span
          style={{
            fontSize: 10.5 * SCALE,
            fontWeight: 800,
            color: colors.textMuted,
            ...label,
          }}
        >
          職場でよくある例
        </span>
        {/* 字幕と一字一句同じにしない（画面は場面の言い換えを受け持つ） */}
        <ExampleBand
          text="買った業務ソフトを、社内の何台にもインストール"
          atSec={segStart(SEG_P6, 2)}
        />
        <ExampleBand
          text="他人のコードを、断りなく自社の製品へ流用"
          atSec={segStart(SEG_P6, 4)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: コピープロテクト外し — 新出用語をページの主役にする（キーワード見出し）
// ---------------------------------------------------------------------------

const CopyProtectionScene: React.FC = () => {
  const chip = useAppear(0.3);
  const term = useAppear(0.45);
  const means = useAppear(segStart(SEG_P7, 2));
  const illegal = useAppear(segStart(SEG_P7, 3));
  const even = useAppear(segStart(SEG_P7, 4), { dy: 10 });
  const illust = useAppear(0.7);

  return (
    <SlideShell narration={SEG_P7}>
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
            著作権法が禁じている行為
          </span>
          {/* 11文字なので2行に割る（1行だと左カラム幅に入らない） */}
          <b style={{ fontSize: 25 * SCALE, fontWeight: 800, lineHeight: 1.2, ...term }}>
            <span style={markerStyle}>コピープロテクト</span>
            <br />
            <span style={markerStyle}>外し</span>
          </b>
          <span style={{ fontSize: 12 * SCALE, fontWeight: 700, lineHeight: 1.4, ...means }}>
            コピーを防ぐ仕組み＝技術的保護手段
            <br />
            これを回避する行為
          </span>
          <span style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.4, ...illegal }}>
            回避すること自体が違法
          </span>
          <span
            style={{
              fontSize: 14 * SCALE,
              fontWeight: 800,
              lineHeight: 1.4,
              ...even,
            }}
          >
            <span style={markerPinkStyle}>自分で買ったものでもダメ</span>
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/icon-lock-open.png")}
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
// P8: 営業秘密の三つの条件（wipe-light で章の切り替え）
// ---------------------------------------------------------------------------

const ReqRow: React.FC<{ no: string; term: string; desc: string; atSec: number }> = ({
  no,
  term,
  desc,
  atSec,
}) => {
  const appear = useAppear(atSec, { dy: 12 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE, ...appear }}>
      <span
        style={{
          flex: "none",
          width: 13 * SCALE,
          height: 13 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary600,
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
      <b style={{ flex: "none", fontSize: 18 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
        <span style={markerStyle}>{term}</span>
      </b>
      <span
        style={{
          minWidth: 0,
          fontSize: 12.5 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          lineHeight: 1.3,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

const TradeSecretScene: React.FC = () => {
  const head = useAppear(0.3, { dy: 10 });
  const caution = useAppear(segStart(SEG_P8, 2));

  return (
    <SlideShell
      heading="営業秘密の三つの条件"
      icon={<Ms name="lock" size={videoType.slideHeadIcon} />}
      narration={SEG_P8}
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
        <div style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...head }}>
          <span
            style={{
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.textSecondary,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 999,
              padding: `${2 * SCALE}px ${9 * SCALE}px`,
            }}
          >
            不正競争防止法
          </span>
          <span style={{ flex: "none", color: colors.primary300, display: "flex" }}>
            <Ms name="arrow_forward" size={13 * SCALE} />
          </span>
          <b style={{ fontSize: 19 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
            <span style={markerStyle}>営業秘密</span>
          </b>
          <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
            を守る
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5 * SCALE,
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            color: colors.accentPinkText,
            ...caution,
          }}
        >
          <Ms name="cancel" size={13 * SCALE} />
          「秘密」と呼ぶだけでは守られない
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6 * SCALE,
            marginTop: 2 * SCALE,
          }}
        >
          <ReqRow
            no="1"
            term="秘密管理性"
            desc="秘密として管理していること"
            atSec={segStart(SEG_P8, 3)}
          />
          <ReqRow no="2" term="有用性" desc="事業に役立つこと" atSec={segStart(SEG_P8, 4)} />
          <ReqRow
            no="3"
            term="非公知性"
            desc="まだ世に知られていないこと"
            atSec={segStart(SEG_P8, 5)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P9: ★抽象→具体 — 共有フォルダに置きっぱなしの顧客リストは守られない
// ---------------------------------------------------------------------------

const SharedFolderScene: React.FC = () => {
  const top = useAppear(0.3);
  const folder = useAppear(segStart(SEG_P9, 1), { dy: 12 });
  const danger = useAppear(segStart(SEG_P9, 2), { dy: 8 });
  const arrow = useAppear(segStart(SEG_P9, 3), { dy: 0 });
  const judge = useAppear(segStart(SEG_P9, 3), { dy: 12 });
  const result = usePop(segStart(SEG_P9, 4));
  const band = useAppear(segStart(SEG_P9, 5), { dy: 10 });

  return (
    <SlideShell
      heading="置きっぱなしの顧客リスト"
      icon={<Ms name="warning" size={videoType.slideHeadIcon} />}
      narration={SEG_P9}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: 6 * SCALE,
        }}
      >
        <span
          style={{
            flex: "none",
            fontSize: 11 * SCALE,
            fontWeight: 800,
            color: colors.textMuted,
            ...top,
          }}
        >
          三つすべてを満たして、初めて営業秘密
        </span>

        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "3%" }}>
          {/* 共有フォルダのモック */}
          <div
            style={{
              flex: 1.15,
              minWidth: 0,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 13 * SCALE,
              padding: `${8 * SCALE}px ${10 * SCALE}px`,
              display: "flex",
              flexDirection: "column",
              gap: 5 * SCALE,
              ...folder,
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
              <Ms name="storage" size={13 * SCALE} />
              共有フォルダ（全員が閲覧可）
            </span>
            <span
              style={{
                minWidth: 0,
                fontFamily: fontMono,
                fontSize: 13 * SCALE,
                fontWeight: 700,
                padding: `${5 * SCALE}px ${8 * SCALE}px`,
                borderRadius: 8 * SCALE,
                backgroundColor: colors.bg,
                border: `${1.5 * SCALE}px solid ${colors.border}`,
                lineHeight: 1.3,
              }}
            >
              顧客リスト.xlsx
            </span>
            <span
              style={{
                minWidth: 0,
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
                lineHeight: 1.3,
                ...danger,
              }}
            >
              置きっぱなし — 誰でも開ける
            </span>
          </div>

          <span style={{ flex: "none", color: colors.primary300, display: "flex", ...arrow }}>
            <Ms name="arrow_forward" size={17 * SCALE} />
          </span>

          {/* 判定 */}
          <div
            style={{
              flex: 1.1,
              minWidth: 0,
              backgroundColor: colors.accentPinkSurface,
              border: `${1.5 * SCALE}px solid ${colors.accentPink}`,
              borderRadius: 13 * SCALE,
              padding: `${9 * SCALE}px ${10 * SCALE}px`,
              display: "flex",
              flexDirection: "column",
              gap: 4 * SCALE,
              ...judge,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4 * SCALE,
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                color: colors.accentPinkText,
              }}
            >
              <Ms name="cancel" size={13 * SCALE} />
              秘密管理性が足りない
            </span>
            {/* カード幅に収まらず「れない」だけ3行目に落ちるので明示改行にする */}
            <b
              style={{
                fontSize: 16 * SCALE,
                fontWeight: 800,
                lineHeight: 1.3,
                ...result,
              }}
            >
              持ち出されても
              <br />
              営業秘密として
              <br />
              守られない
            </b>
          </div>
        </div>

        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            borderRadius: 11 * SCALE,
            backgroundColor: colors.primary50,
            border: `${1.5 * SCALE}px solid ${colors.primary500}`,
            padding: `${6 * SCALE}px ${10 * SCALE}px`,
            ...band,
          }}
        >
          <span style={{ flex: "none", color: colors.primary600, display: "flex" }}>
            <Ms name="lightbulb" size={14 * SCALE} />
          </span>
          <span style={{ minWidth: 0, fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            実務のポイント：「社外秘」と表示し、閲覧できる人を限る
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P10: ドメイン名の不正取得 — 本物と、よく似せたもの
// ---------------------------------------------------------------------------

const DomainRow: React.FC<{
  label: string;
  danger: boolean;
  atSec: number;
  children: React.ReactNode;
}> = ({ label, danger, atSec, children }) => {
  const appear = useAppear(atSec, { dy: 10 });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1.5 * SCALE,
        borderRadius: 11 * SCALE,
        backgroundColor: danger ? colors.accentPinkSurface : colors.surface,
        border: `${1.5 * SCALE}px solid ${danger ? colors.accentPink : colors.border}`,
        padding: `${5 * SCALE}px ${10 * SCALE}px`,
        ...appear,
      }}
    >
      <span
        style={{
          fontSize: 9 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: danger ? colors.accentPinkText : colors.textMuted,
        }}
      >
        {label}
      </span>
      <span
        style={{
          minWidth: 0,
          fontFamily: fontMono,
          fontSize: 12.5 * SCALE,
          fontWeight: 700,
          lineHeight: 1.25,
        }}
      >
        {children}
      </span>
    </div>
  );
};

const DomainScene: React.FC = () => {
  const rule = useAppear(segStart(SEG_P10, 2), { dy: 8 });
  const phish = useAppear(segStart(SEG_P10, 3), { dy: 8 });
  const chip = useAppear(segStart(SEG_P10, 4));
  const illust = useAppear(0.6);

  return (
    <SlideShell
      heading="ドメイン名の不正取得"
      icon={<Ms name="public" size={videoType.slideHeadIcon} />}
      narration={SEG_P10}
    >
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "3%" }}>
        {/* 本文の高さは 655px 前後しかない。要素5つを積むので各行を詰めている
            （初版は 720px 相当あり、見出しと字幕帯の両方にはみ出した） */}
        <div
          style={{
            flex: 1.4,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4 * SCALE,
          }}
        >
          <DomainRow label="本物の銀行" danger={false} atSec={0.3}>
            example-bank.co.jp
          </DomainRow>
          <DomainRow label="よく似せて取ったもの" danger atSec={segStart(SEG_P10, 1)}>
            example-bank
            <span style={{ color: colors.accentPinkText }}>-jp.com</span>
          </DomainRow>

          <span
            style={{
              minWidth: 0,
              fontSize: 12 * SCALE,
              fontWeight: 800,
              lineHeight: 1.3,
              marginTop: 2 * SCALE,
              ...rule,
            }}
          >
            <span style={markerStyle}>不正な利益を得る目的</span>なら、
            <br />
            取得も使用も不正競争行為
          </span>

          <span
            style={{
              minWidth: 0,
              fontSize: 11 * SCALE,
              fontWeight: 800,
              color: colors.accentPinkText,
              lineHeight: 1.3,
              ...phish,
            }}
          >
            似せた住所は、偽サイトへの入り口
          </span>

          <span
            style={{
              alignSelf: "flex-start",
              fontSize: 10 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary100,
              borderRadius: 999,
              padding: `${2 * SCALE}px ${10 * SCALE}px`,
              ...chip,
            }}
          >
            フィッシング対策にもつながる
          </span>
        </div>

        <Img
          src={staticFile("images/ipa_sg/net-globe.png")}
          style={{
            flex: 0.75,
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
// クイズ幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL47IpRightsTradeSecrets: VideoSpec = {
  id: "sg-L47-ip-rights-trade-secrets",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "その「かたち」と\n「秘密」は守られる",
      keywords: ["著作権", "営業秘密", "ドメイン名"],
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
      name: "map",
      durationSec: 7,
      narration: SEG_P3,
      component: MapScene,
    },
    {
      pattern: "custom",
      name: "copyright-birth",
      durationSec: 6,
      narration: SEG_P4,
      component: CopyrightBirthScene,
    },
    {
      pattern: "custom",
      name: "protected-or-not",
      durationSec: 7,
      narration: SEG_P5,
      component: ProtectedOrNotScene,
    },
    {
      pattern: "custom",
      name: "infringement",
      durationSec: 7,
      narration: SEG_P6,
      component: InfringementScene,
    },
    {
      pattern: "custom",
      name: "copy-protection",
      durationSec: 7,
      narration: SEG_P7,
      component: CopyProtectionScene,
    },
    {
      pattern: "custom",
      name: "trade-secret",
      durationSec: 8,
      narration: SEG_P8,
      component: TradeSecretScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "shared-folder-case",
      durationSec: 8,
      narration: SEG_P9,
      component: SharedFolderScene,
    },
    {
      pattern: "custom",
      name: "domain-abuse",
      durationSec: 7,
      narration: SEG_P10,
      component: DomainScene,
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
      question: "著作権法で保護されないのは？",
      choices: [
        { key: "A", text: "プログラムのソースコード" },
        { key: "B", text: "プログラムのアルゴリズム", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "営業秘密として守られない例は？",
      choices: [
        { key: "A", text: "誰でも見られる場所に置いた資料", correct: true },
        { key: "B", text: "社外秘と表示し閲覧を限った資料" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "コピープロテクト外しの扱いは？",
      choices: [
        { key: "A", text: "自分で買ったものなら問題ない" },
        { key: "B", text: "自分で買ったものでも違法", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "著作権は表現を守る。アイデアは対象外", checkAtSec: segStart(SEG_P15, 0) },
        { text: "侵害は無断のコピー・改変・公開", checkAtSec: segStart(SEG_P15, 1) },
        { text: "営業秘密は三つの要件すべてで成立", checkAtSec: segStart(SEG_P15, 2) },
      ],
      narration: SEG_P15,
      transitionIn: "wipe",
    },
  ],
};
