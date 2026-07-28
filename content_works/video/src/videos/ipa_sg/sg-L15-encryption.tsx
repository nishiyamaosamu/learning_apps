import { Img, staticFile } from "remotion";
import { colors, fontMono, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L15-encryption.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L15: 暗号方式
 *
 * content_works/ipa_sg/LESSON_PLAN.md の L15（第2章 守る技術：暗号と認証）に対応。
 * シナリオは narration/ipa_sg/sg-L15-encryption.md。
 *
 * 「鍵の扱い方の違い」を背骨にした構成:
 *   導入 → 用語の変換フロー（平文→暗号文→平文）→ 共通鍵（同じ鍵が両端に）→
 *   公開鍵（鍵ペア・左イラスト＋右カード）→ 鍵の数の数字ドン【息継ぎ】→
 *   wipe-light で2方式の対比（vs）→ ハイブリッド（2段の帯）→
 *   クイズ幕間 → クイズ3問 → wipe でまとめ。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L15-encryption");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、情報を守る基本の技術、暗号方式を学びます。"),
  N("s02-2.mp3", "インターネットを流れるデータは、途中で盗み見られる危険があります。"),
  N("s02-3.mp3", "そこで、内容を読めない形に変えてから送るのが暗号化です。"),
  N("s02-4.mp3", "鍵を持っている相手だけが、元の内容に戻すことができます。"),
];

const SEG_TERMS = [
  N("s03-1.mp3", "まず、言葉の意味を整理しておきましょう。"),
  // 難読語の例外: 「平文」は TTS が「へいぶん」と読んでしまうため、
  // 音声（jobs.json）は「ひらぶん」・字幕（この text）は漢字表記、と意図的に分けている。
  // N() の text は字幕にしか使われないので、音声側と食い違っても再生には影響しない。
  // 初出だけ読みを添え、2回目以降は漢字だけにする（毎回添えると字幕がうるさくなる）。
  N("s03-2.mp3", "もとの読める情報を平文（ひらぶん）、変換されたものを暗号文と呼びます。"),
  N("s03-3.mp3", "平文を暗号文に変えることが暗号化、もとに戻すことが復号です。"),
  N("s03-4.mp3", "このとき使う秘密の情報が、暗号鍵と復号鍵です。"),
];

const SEG_COMMON = [
  N("s04-1.mp3", "一つ目の方式は、共通鍵暗号方式です。"),
  N("s04-2.mp3", "暗号化と復号に、まったく同じ鍵を使う方式です。"),
  N("s04-3.mp3", "処理が速く、大量のデータを扱うのに向いています。"),
  N("s04-4.mp3", "代表的な方式が、AESです。"),
  N("s04-5.mp3", "ただし、その鍵を相手へ安全に渡す方法が課題になります。"),
];

const SEG_PUBLIC = [
  N("s05-1.mp3", "二つ目の方式は、公開鍵暗号方式です。"),
  N("s05-2.mp3", "鍵をペアで作り、公開鍵は誰にでも配り、秘密鍵は自分だけが持ちます。"),
  N("s05-3.mp3", "送る人は、受け取る人の公開鍵を使って暗号化します。"),
  N("s05-4.mp3", "対応する秘密鍵を持つ本人だけが、復号できます。"),
  N("s05-5.mp3", "代表的な方式が、RSA暗号です。"),
];

const SEG_KEYCOUNT = [
  N("s06-1.mp3", "二つの方式は、必要な鍵の数も大きく違います。"),
  N("s06-2.mp3", "共通鍵は相手ごとに別の鍵がいるので、百人だと四千九百五十本も必要です。"),
  N("s06-3.mp3", "公開鍵なら、一人が一組の鍵を持つだけで足ります。"),
];

const SEG_VS = [
  N("s07-1.mp3", "ここで、二つの方式を比べて整理しましょう。"),
  N("s07-2.mp3", "共通鍵は処理が速い一方、鍵を安全に渡す手段が課題になります。"),
  N("s07-3.mp3", "公開鍵は鍵を配れるので安全ですが、処理に時間がかかります。"),
];

const SEG_HYBRID = [
  N("s08-1.mp3", "そこで、両方の良いところを組み合わせたのがハイブリッド暗号方式です。"),
  N("s08-2.mp3", "はじめに、公開鍵暗号方式を使って、共通鍵を安全に相手へ渡します。"),
  N("s08-3.mp3", "そのあとは、渡した共通鍵で本文を高速にやり取りします。"),
  N("s08-4.mp3", "ウェブを暗号化するTLSも、この仕組みを使っています。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s10-1.mp3", "ここで問題です。"),
  N("s10-2.mp3", "暗号化と復号に同じ鍵を使う方式は、どちらでしょうか。"),
  N("s10-3.mp3", "正解は、共通鍵暗号方式です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s11-1.mp3", "次の問題です。"),
  N("s11-2.mp3", "公開鍵で暗号化された文を復号できるのは、どれでしょうか。"),
  N("s11-3.mp3", "正解は、対応する秘密鍵です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s12-1.mp3", "最後の問題です。"),
  N("s12-2.mp3", "共通鍵を公開鍵暗号方式で届けてから本文を送る方式は、何でしょうか。"),
  N("s12-3.mp3", "正解は、ハイブリッド暗号方式です。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s13-1.mp3", "共通鍵暗号方式は同じ鍵を使い、速いかわりに鍵の受け渡しが課題です。"),
  N("s13-2.mp3", "公開鍵暗号方式は公開鍵で暗号化し、秘密鍵で復号します。"),
  N("s13-3.mp3", "この二つを組み合わせたものが、ハイブリッド暗号方式です。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// P2: 導入 — 左テキスト + 右イラスト
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const noteAppear = useAppear(segStart(SEG_INTRO, 3));
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 * SCALE }}>
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.5,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"盗み見られても\n"}
            <span style={markerStyle}>読めない形</span>にして送る
          </span>
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.5,
              ...noteAppear,
            }}
          >
            鍵を持つ相手だけが元に戻せる
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/tech-encrypt.png")}
          style={{
            flex: 1.05,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P3: 用語の整理 — 平文 →(暗号化) 暗号文 →(復号) 平文 の横フロー
// ---------------------------------------------------------------------------

const TermBox: React.FC<{ name: string; sub: string; tone: "plain" | "cipher"; atSec: number }> = ({
  name,
  sub,
  tone,
  atSec,
}) => {
  const box = usePop(atSec);
  return (
    <div
      style={{
        width: 78 * SCALE,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        padding: `${13 * SCALE}px ${5 * SCALE}px`,
        backgroundColor: tone === "cipher" ? colors.primary600 : colors.surface,
        color: tone === "cipher" ? colors.textPrimaryDark : colors.textPrimary,
        border: `${1.5 * SCALE}px solid ${tone === "cipher" ? colors.primary600 : colors.border}`,
        borderRadius: 14 * SCALE,
        ...box,
      }}
    >
      <b style={{ fontSize: 15 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          fontFamily: tone === "cipher" ? fontMono : undefined,
          color: tone === "cipher" ? colors.primary100 : colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {sub}
      </span>
    </div>
  );
};

const TermArrow: React.FC<{ label: string; atSec: number; keyAtSec: number }> = ({
  label,
  atSec,
  keyAtSec,
}) => {
  const arrow = useAppear(atSec, { dy: 0 });
  const keyAppear = usePop(keyAtSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2 * SCALE,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4 * SCALE,
          fontSize: 9.5 * SCALE,
          fontWeight: 800,
          color: colors.primary600,
          ...keyAppear,
        }}
      >
        <Ms name="key" size={14 * SCALE} />
        <span style={{ whiteSpace: "nowrap" }}>鍵</span>
      </span>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "center", ...arrow }}>
        <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
        <span style={{ fontSize: 20 * SCALE, lineHeight: 1, color: colors.primary300 }}>→</span>
      </span>
    </div>
  );
};

const TermsScene: React.FC = () => (
  <SlideShell
    heading="暗号化と復号"
    icon={<Ms name="encrypted" size={videoType.slideHeadIcon} />}
    narration={SEG_TERMS}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2 * SCALE,
      }}
    >
      <TermBox name="平文" sub="読める" tone="plain" atSec={segStart(SEG_TERMS, 1)} />
      <TermArrow
        label="暗号化"
        atSec={segStart(SEG_TERMS, 2)}
        keyAtSec={segStart(SEG_TERMS, 3)}
      />
      <TermBox name="暗号文" sub="読めない" tone="cipher" atSec={segStart(SEG_TERMS, 1) + 1.4} />
      <TermArrow
        label="復号"
        atSec={segStart(SEG_TERMS, 2) + 1.6}
        keyAtSec={segStart(SEG_TERMS, 3) + 0.6}
      />
      <TermBox name="平文" sub="読める" tone="plain" atSec={segStart(SEG_TERMS, 2) + 2.4} />
    </div>
  </SlideShell>
);

// ---------------------------------------------------------------------------
// P4: 共通鍵暗号方式 — 送信者と受信者の両端に「同じ鍵」
// ---------------------------------------------------------------------------

const PartyBlock: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => {
  const block = usePop(atSec);
  return (
    <div
      style={{
        flex: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        ...block,
      }}
    >
      <span
        style={{
          width: 44 * SCALE,
          height: 44 * SCALE,
          borderRadius: 15 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={25 * SCALE} />
      </span>
      <b style={{ fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
      <Img
        src={staticFile("images/ipa_sg/icon-key.png")}
        style={{ width: 128, height: 128, objectFit: "contain", mixBlendMode: "multiply" }}
      />
    </div>
  );
};

const FeatureChip: React.FC<{ icon: string; text: string; tone: "good" | "issue"; atSec: number }> = ({
  icon,
  text,
  tone,
  atSec,
}) => {
  const chip = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        padding: `${6 * SCALE}px ${13 * SCALE}px`,
        borderRadius: 999,
        fontSize: 11 * SCALE,
        fontWeight: 800,
        whiteSpace: "nowrap",
        backgroundColor: tone === "good" ? colors.primary50 : colors.reviewSurface,
        color: tone === "good" ? colors.primary800 : colors.reviewText,
        border: `${1.5 * SCALE}px solid ${tone === "good" ? colors.primary100 : colors.reviewBorder}`,
        ...chip,
      }}
    >
      <Ms name={icon} size={15 * SCALE} />
      {text}
    </span>
  );
};

const CommonKeyScene: React.FC = () => {
  const sameKey = useAppear(segStart(SEG_COMMON, 1), { dy: 10 });
  return (
    <SlideShell
      heading="共通鍵暗号方式"
      icon={<Ms name="key" size={videoType.slideHeadIcon} />}
      narration={SEG_COMMON}
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
          gap: 8 * SCALE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE }}>
          <PartyBlock icon="person" label="送信者" atSec={0.3} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2 * SCALE,
              width: 120 * SCALE,
            }}
          >
            <span style={{ fontSize: 24 * SCALE, lineHeight: 1, color: colors.primary300 }}>→</span>
            <span style={{ fontSize: 10 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
              暗号文を送る
            </span>
          </div>
          <PartyBlock icon="group" label="受信者" atSec={0.6} />
        </div>
        <b
          style={{
            fontSize: 13 * SCALE,
            fontWeight: 800,
            color: colors.primary800,
            lineHeight: 1.2,
            ...sameKey,
          }}
        >
          両端で<span style={markerStyle}>まったく同じ鍵</span>を使う
        </b>
        <div style={{ display: "flex", gap: 9 * SCALE }}>
          <FeatureChip
            icon="bolt"
            text="処理が速い・代表はAES"
            tone="good"
            atSec={segStart(SEG_COMMON, 2)}
          />
          <FeatureChip
            icon="warning"
            text="鍵の渡し方が課題"
            tone="issue"
            atSec={segStart(SEG_COMMON, 4)}
          />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 公開鍵暗号方式 — 左イラスト（鍵ペア）+ 右カード2枚
// ---------------------------------------------------------------------------

const KeyCard: React.FC<{
  icon: string;
  name: string;
  who: string;
  role: string;
  atSec: number;
  roleAtSec: number;
}> = ({ icon, name, who, role, atSec, roleAtSec }) => {
  const card = usePop(atSec);
  const roleAppear = useAppear(roleAtSec, { dy: 8 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8 * SCALE,
        padding: `${10 * SCALE}px ${12 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 13 * SCALE,
        ...card,
      }}
    >
      <span
        style={{
          width: 36 * SCALE,
          height: 36 * SCALE,
          borderRadius: 12 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <Ms name={icon} size={21 * SCALE} />
      </span>
      <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 * SCALE }}>
        <b style={{ fontSize: 12.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
        <span style={{ fontSize: 9.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
          {who}
        </span>
      </span>
      <span
        style={{
          flex: "none",
          fontSize: 10 * SCALE,
          fontWeight: 800,
          color: colors.primary800,
          backgroundColor: colors.primary50,
          borderRadius: 999,
          padding: `${4 * SCALE}px ${10 * SCALE}px`,
          whiteSpace: "nowrap",
          ...roleAppear,
        }}
      >
        {role}
      </span>
    </div>
  );
};

const PublicKeyScene: React.FC = () => {
  const illustAppear = useAppear(0.4);
  const rsaAppear = useAppear(segStart(SEG_PUBLIC, 4), { dy: 8 });
  return (
    <SlideShell
      heading="公開鍵暗号方式"
      icon={<Ms name="public" size={videoType.slideHeadIcon} />}
      narration={SEG_PUBLIC}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <Img
          src={staticFile("images/ipa_sg/icon-key-pair.png")}
          style={{
            flex: 1,
            minWidth: 0,
            maxHeight: "100%",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{
            flex: 1.35,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 9 * SCALE,
          }}
        >
          <KeyCard
            icon="public"
            name="公開鍵"
            who="誰にでも配ってよい"
            role="暗号化"
            atSec={segStart(SEG_PUBLIC, 1)}
            roleAtSec={segStart(SEG_PUBLIC, 2)}
          />
          <KeyCard
            icon="lock"
            name="秘密鍵"
            who="本人だけが持つ"
            role="復号"
            atSec={segStart(SEG_PUBLIC, 1) + 1.8}
            roleAtSec={segStart(SEG_PUBLIC, 3)}
          />
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              ...rsaAppear,
            }}
          >
            代表的な方式は<span style={markerStyle}>RSA暗号</span>
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 鍵の数（数字ドン）— 100人が通信するときに必要な共通鍵の本数
// ---------------------------------------------------------------------------

const withComma = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const KeyCountScene: React.FC = () => {
  const count = useProgress(segStart(SEG_KEYCOUNT, 1), 1.6);
  const captionAppear = useAppear(0.3);
  const noteAppear = useAppear(segStart(SEG_KEYCOUNT, 2), { dy: 10 });
  return (
    <SlideShell narration={SEG_KEYCOUNT}>
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
        <span
          style={{
            fontSize: 12 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            ...captionAppear,
          }}
        >
          100人が共通鍵でやり取りするのに必要な鍵の数
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
            {withComma(Math.round(4950 * count))}
          </span>
          <span style={{ fontSize: 20 * SCALE, fontWeight: 800, color: colors.primary600 }}>本</span>
        </span>
        <span
          style={{
            marginTop: 6 * SCALE,
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            ...noteAppear,
          }}
        >
          <Ms name="public" size={17 * SCALE} />
          <span>
            公開鍵なら<span style={markerStyle}>1人1組</span>で足りる
          </span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P8: ハイブリッド暗号方式 — 2段の帯（STEP1 で鍵を渡し、STEP2 で本文）
// ---------------------------------------------------------------------------

const StepBand: React.FC<{
  no: string;
  icon: string;
  title: string;
  sub: string;
  atSec: number;
}> = ({ no, icon, title, sub, atSec }) => {
  const band = useAppear(atSec, { dy: 16 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * SCALE,
        width: "100%",
        padding: `${9 * SCALE}px ${16 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 14 * SCALE,
        ...band,
      }}
    >
      <span
        style={{
          width: 40 * SCALE,
          height: 40 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary600,
          color: colors.textPrimaryDark,
          fontSize: 16 * SCALE,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        {no}
      </span>
      <span style={{ color: colors.primary600, flex: "none", display: "flex" }}>
        <Ms name={icon} size={26 * SCALE} />
      </span>
      <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 * SCALE }}>
        <b style={{ fontSize: 14 * SCALE, fontWeight: 800 }}>{title}</b>
        <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
          {sub}
        </span>
      </span>
    </div>
  );
};

const HybridScene: React.FC = () => {
  const note = useAppear(segStart(SEG_HYBRID, 3), { dy: 10 });
  return (
    <SlideShell
      heading="ハイブリッド暗号方式"
      icon={<Ms name="layers" size={videoType.slideHeadIcon} />}
      narration={SEG_HYBRID}
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
        <StepBand
          no="1"
          icon="public"
          title="公開鍵暗号方式で「共通鍵」を渡す"
          sub="安全に届けられるが、処理は遅い"
          atSec={segStart(SEG_HYBRID, 1)}
        />
        <StepBand
          no="2"
          icon="bolt"
          title="渡した共通鍵で本文をやり取り"
          sub="大量のデータを高速に暗号化できる"
          atSec={segStart(SEG_HYBRID, 2)}
        />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            fontSize: 11.5 * SCALE,
            fontWeight: 700,
            color: colors.textSecondary,
            ...note,
          }}
        >
          <Ms name="language" size={16 * SCALE} />
          <span>
            ウェブを暗号化する<span style={markerStyle}>TLS</span>もこの仕組み
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

export const SgL15Encryption: VideoSpec = {
  id: "sg-L15-encryption",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "暗号方式",
      keywords: ["共通鍵", "公開鍵", "ハイブリッド"],
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
      name: "terms",
      durationSec: 5,
      narration: SEG_TERMS,
      component: TermsScene,
    },
    {
      pattern: "custom",
      name: "common-key",
      durationSec: 6,
      narration: SEG_COMMON,
      component: CommonKeyScene,
    },
    {
      pattern: "custom",
      name: "public-key",
      durationSec: 6,
      narration: SEG_PUBLIC,
      component: PublicKeyScene,
    },
    {
      pattern: "custom",
      name: "key-count",
      durationSec: 5,
      narration: SEG_KEYCOUNT,
      component: KeyCountScene,
    },
    {
      pattern: "vs",
      heading: "2つの方式のトレードオフ",
      icon: "compare_arrows",
      left: {
        title: "共通鍵暗号方式",
        icon: "key",
        rows: [
          { k: "使う鍵", v: "同じ鍵を2人で共有" },
          { k: "処理速度", v: "速い" },
          { k: "課題", v: "鍵の受け渡しが難しい" },
        ],
      },
      right: {
        title: "公開鍵暗号方式",
        icon: "public",
        rows: [
          { k: "使う鍵", v: "公開鍵と秘密鍵のペア" },
          { k: "処理速度", v: "遅い" },
          { k: "課題", v: "処理に時間がかかる" },
        ],
      },
      columnAtSec: [segStart(SEG_VS, 1), segStart(SEG_VS, 2)],
      narration: SEG_VS,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "hybrid",
      durationSec: 6,
      narration: SEG_HYBRID,
      component: HybridScene,
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
      question: "暗号化と復号に同じ鍵を使うのは？",
      choices: [
        { key: "A", text: "公開鍵暗号方式" },
        { key: "B", text: "共通鍵暗号方式", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "公開鍵で暗号化した文を戻す鍵は？",
      choices: [
        { key: "A", text: "対応する秘密鍵", correct: true },
        { key: "B", text: "同じ公開鍵" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "2つの方式を組み合わせた方式は？",
      choices: [
        { key: "A", text: "共通鍵暗号方式" },
        { key: "B", text: "ハイブリッド暗号方式", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行に収める（29文字が上限。超えると3行分がテロップ帯に重なる）
          text: "共通鍵は同じ鍵で速いが、鍵の受け渡しが課題です。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "公開鍵暗号方式は公開鍵で暗号化し、秘密鍵で復号します。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "この二つを組み合わせたものが、ハイブリッド暗号方式です。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
