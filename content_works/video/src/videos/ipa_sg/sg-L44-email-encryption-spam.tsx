import { Img, interpolateColors, staticFile } from "remotion";
import {
  colors,
  fontMono,
  markerPinkStyle,
  markerStyle,
  SCALE,
  videoType,
} from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop, useProgress } from "../../parts/animate";
import { ArrowMarker, DrawPath } from "../../parts/draw";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L44-email-encryption-spam.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L44: メールのセキュリティ②（暗号化とスパム対策）
 *
 * 発注書 content_works/ipa_sg/orders/L44.md に対応。
 * シナリオと用語の呼称表は narration/ipa_sg/sg-L44-email-encryption-spam.md。
 *
 * 二本柱の構成:
 *   導入 → 平文のまま運ばれる（経路図）→ S/MIME → 二つの働き → PGPとの違い(vs) →
 *   見積書の場面【抽象→具体】→ wipe-light で「止める三か所」→ ①SMTP-AUTH → ②OP25B →
 *   ③ベイジアンフィルタリング → クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 呼称は L43（送信元ドメイン認証）・L15（暗号化／公開鍵・秘密鍵）・L17（デジタル署名）・
 * L21（デジタル証明書／認証局）に揃えており、いずれも再説明しない。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L44-email-encryption-spam");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
//
// 略語・難読語の読み: 音声（jobs.json）だけ仮名書き。字幕はここの text が正。
// ルビは読みが自明でない語の初出1回だけ（平文 / S/MIME / SMTP-AUTH / OP25B）。
// PGP は1字ずつ読む略語なのでルビを添えない。
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "前回は、送信元ドメイン認証という仕組みを学びました。"),
  N("s02-2.mp3", "ですが、送信元が分かっても、中身は守られていません。"),
  N("s02-3.mp3", "今回は、中身を守る暗号化と、迷惑メール対策を学びます。"),
  N("s02-4.mp3", "守る方向と、止める方向の、二つに分けて整理しましょう。"),
];

const SEG_PLAIN = [
  N("s03-1.mp3", "メールは、送信側のサーバから受信側のサーバへ渡されます。"),
  N("s03-2.mp3", "このとき本文は、平文（ひらぶん）のまま運ばれます。"),
  N("s03-3.mp3", "途中で抜き取られれば、内容はそのまま読まれてしまいます。"),
  N("s03-4.mp3", "中身を守るには、メールを暗号化するしかありません。"),
];

const SEG_SMIME = [
  N("s04-1.mp3", "中身を守る標準的な方式が、S/MIME（エスマイム）です。"),
  N("s04-2.mp3", "デジタル証明書を使って、暗号化とデジタル署名を行います。"),
  N("s04-3.mp3", "証明書は、認証局が発行したものをそのまま使います。"),
];

const SEG_ROLES = [
  N("s05-1.mp3", "S/MIMEがしてくれることは、大きく二つあります。"),
  N("s05-2.mp3", "一つ目は暗号化で、相手の公開鍵を使って本文を隠します。"),
  N("s05-3.mp3", "二つ目はデジタル署名で、自分の秘密鍵で差出人を示します。"),
  N("s05-4.mp3", "署名があれば、書き換えられていないことも確かめられます。"),
];

const SEG_PGP = [
  N("s06-1.mp3", "同じことを、認証局なしで実現する方式がPGPです。"),
  N("s06-2.mp3", "S/MIMEでは、認証局が発行した証明書が鍵を保証します。"),
  N("s06-3.mp3", "PGPでは、利用者どうしが署名し合って鍵を保証します。"),
  N("s06-4.mp3", "違いは、その鍵を誰が保証するか、という一点です。"),
];

const SEG_SCENE = [
  N("s07-1.mp3", "取引先に見積書を送る場面で考えてみましょう。"),
  N("s07-2.mp3", "見積書は、相手の公開鍵で暗号化されて送り出されます。"),
  N("s07-3.mp3", "途中のサーバを通っても、中身は読めないままです。"),
  N("s07-4.mp3", "相手は署名を検証して、差出人と改ざんの有無を確かめます。"),
];

const SEG_PLACES = [
  N("s08-1.mp3", "ここからは、迷惑メールを止める側の対策を見ていきます。"),
  N("s08-2.mp3", "送るとき、出ていくとき、受け取るときの三か所で止めます。"),
];

const SEG_AUTH = [
  N("s09-1.mp3", "一つ目は、送るときに止める対策です。"),
  N("s09-2.mp3", "誰でも使える送信サーバは、迷惑メールに悪用されます。"),
  N("s09-3.mp3", "そこで、メールを送る前に利用者を認証します。"),
  N("s09-4.mp3", "この仕組みがSMTP-AUTH（エスエムティーピーオース）です。"),
  N("s09-5.mp3", "利用者名とパスワードで、正規の利用者だけを通します。"),
];

const SEG_OP25B = [
  N("s10-1.mp3", "二つ目は、出ていくときに止める対策です。"),
  N("s10-2.mp3", "迷惑メールは、乗っ取られた家庭の端末から直接送られます。"),
  N("s10-3.mp3", "そこでプロバイダが、外向きの25番ポートを塞ぎます。"),
  N("s10-4.mp3", "これがOP25B（オーピーにじゅうごビー）という対策です。"),
  N("s10-5.mp3", "残る道は、プロバイダの正規の送信サーバだけになります。"),
];

const SEG_BAYES = [
  N("s11-1.mp3", "三つ目は、受け取るときに止める対策です。"),
  N("s11-2.mp3", "それでも届いてしまう迷惑メールは、受信側で振り分けます。"),
  N("s11-3.mp3", "迷惑メールによく出る単語の傾向を、統計的に学習させます。"),
  N("s11-4.mp3", "この方式を、ベイジアンフィルタリングといいます。"),
  N("s11-5.mp3", "利用者が迷惑と指定するほど、判定の精度は上がります。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s13-1.mp3", "ここで問題です。"),
  N("s13-2.mp3", "S/MIMEで本文を守るために使うのは、どちらでしょうか。"),
  N("s13-3.mp3", "正解は、認証局が発行するデジタル証明書です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s14-1.mp3", "次の問題です。"),
  N("s14-2.mp3", "OP25Bが塞ぐのは、どちらでしょうか。"),
  N("s14-3.mp3", "正解は、外向きの25番ポートです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s15-1.mp3", "最後の問題です。"),
  N("s15-2.mp3", "SMTP-AUTHで認証を行うのは、どの場面でしょうか。"),
  N("s15-3.mp3", "正解は、送信サーバを使ってメールを送るときです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s16-1.mp3", "メールの中身は、暗号化とデジタル署名で守ります。"),
  N("s16-2.mp3", "S/MIMEは認証局が、PGPは利用者どうしが鍵を保証します。"),
  N("s16-3.mp3", "送信時の認証、出口の遮断、受信の網の三段で止めます。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// 共通の小部品
// ---------------------------------------------------------------------------

/** 分類チップ（①②③の番号は s08 の三か所と s09〜s11 の見出しをつなぐ背骨） */
const Chip: React.FC<{ text: string; tone?: "blue" | "pink" }> = ({ text, tone = "blue" }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      fontSize: 9.5 * SCALE,
      fontWeight: 800,
      lineHeight: 1.2,
      color: tone === "blue" ? colors.primary800 : colors.accentPinkText,
      backgroundColor: tone === "blue" ? colors.primary100 : colors.accentPinkSurface,
      borderRadius: 999,
      padding: `${1.5 * SCALE}px ${9 * SCALE}px`,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

/** アイコンの丸バッジ */
const IconBadge: React.FC<{ name: string; size?: number; tone?: "blue" | "pink" | "muted" }> = ({
  name,
  size = 26,
  tone = "blue",
}) => (
  <span
    style={{
      width: size * SCALE,
      height: size * SCALE,
      flex: "none",
      borderRadius: 999,
      backgroundColor:
        tone === "blue" ? colors.primary50 : tone === "pink" ? colors.accentPinkSurface : colors.bg,
      color:
        tone === "blue"
          ? colors.primary600
          : tone === "pink"
            ? colors.accentPinkText
            : colors.textMuted,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Ms name={name} size={size * 0.56 * SCALE} />
  </span>
);

/** 固定幅の矢印ストリップ（幅可変の入れ物に置くと縮むので px と 1:1 の viewBox にする） */
const ArrowStrip: React.FC<{ id: string; atSec: number; widthPx: number; color?: string }> = ({
  id,
  atSec,
  widthPx,
  color = colors.primary300,
}) => (
  <svg
    viewBox={`0 0 ${widthPx} 20`}
    style={{ width: widthPx, height: 20, flex: "none" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <ArrowMarker id={id} color={color} />
    <DrawPath
      d={`M3 10 L${widthPx - 8} 10`}
      delaySec={atSec}
      durSec={0.45}
      stroke={color}
      strokeWidth={2.5}
      markerEnd={`url(#${id})`}
    />
  </svg>
);

/** キーワード見出し（分類チップ → 用語 → 一言の定義。箱で囲わない） */
const KeywordLead: React.FC<{
  chip: string;
  term: string;
  termSize: number;
  desc: React.ReactNode;
  atSec: number;
  chipAtSec?: number;
}> = ({ chip, term, termSize, desc, atSec, chipAtSec }) => {
  const chipAppear = useAppear(chipAtSec ?? atSec);
  const termAppear = useAppear(atSec);
  const descAppear = useAppear(atSec + 0.35);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 5 * SCALE }}>
      <span style={chipAppear}>
        <Chip text={chip} />
      </span>
      <b style={{ fontSize: termSize, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
        <span style={markerStyle}>{term}</span>
      </b>
      <span style={{ fontSize: 12 * SCALE, fontWeight: 700, lineHeight: 1.5, ...descAppear }}>
        {desc}
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// s02: 導入 — 左テキスト + 右イラスト
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const noteAppear = useAppear(segStart(SEG_INTRO, 2), { dy: 10 });
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{ flex: 1.15, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 * SCALE }}
        >
          <span
            style={{
              fontSize: 21 * SCALE,
              fontWeight: 800,
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"送信元は確かめられた\n"}
            <span style={markerPinkStyle}>では、中身は？</span>
          </span>
          <span
            style={{
              fontSize: 12.5 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              lineHeight: 1.5,
              whiteSpace: "pre-line",
              ...noteAppear,
            }}
          >
            {"中身を守る暗号化と、\n迷惑メールを止める対策の二つ"}
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/icon-mail.png")}
          style={{
            flex: 0.9,
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
// s03: メールは平文のまま運ばれる — 横チェーンの経路図 + 封筒カード
// ---------------------------------------------------------------------------

const PathNode: React.FC<{ icon: string; label: string; atSec: number }> = ({
  icon,
  label,
  atSec,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3 * SCALE,
      flex: "none",
      ...usePop(atSec),
    }}
  >
    <IconBadge name={icon} size={22} />
    <span style={{ fontSize: 10 * SCALE, fontWeight: 800, lineHeight: 1.2, whiteSpace: "nowrap" }}>
      {label}
    </span>
  </div>
);

const PlaintextPathScene: React.FC = () => {
  const cardAppear = useAppear(segStart(SEG_PLAIN, 1));
  const noteAppear = useAppear(segStart(SEG_PLAIN, 2), { dy: 10 });
  return (
    <SlideShell
      heading="メールは平文のまま運ばれる"
      icon={<Ms name="mail" size={videoType.slideHeadIcon} />}
      narration={SEG_PLAIN}
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
          gap: 9 * SCALE,
        }}
      >
        {/* 経路: 送信者 → 送信サーバ → 受信サーバ → 受信者 */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 * SCALE }}>
          <PathNode icon="person" label="送信者" atSec={0.3} />
          <ArrowStrip id="p1" atSec={0.45} widthPx={52} />
          <PathNode icon="dns" label="送信側サーバ" atSec={0.6} />
          <ArrowStrip id="p2" atSec={0.75} widthPx={52} />
          <PathNode icon="dns" label="受信側サーバ" atSec={0.9} />
          <ArrowStrip id="p3" atSec={1.05} widthPx={52} />
          <PathNode icon="person" label="受信者" atSec={1.2} />
        </div>

        {/* 運ばれている本文そのもの（平文） */}
        <div
          style={{
            width: "82%",
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
            padding: `${10 * SCALE}px ${13 * SCALE}px`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 14 * SCALE,
            ...cardAppear,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
            <span
              style={{
                flex: "none",
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                lineHeight: 1.25,
                color: colors.textSecondary,
              }}
            >
              件名
            </span>
            <span style={{ fontSize: 13 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
              来週のお見積りの件
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE }}>
            <span
              style={{
                flex: "none",
                fontSize: 10.5 * SCALE,
                fontWeight: 800,
                lineHeight: 1.25,
                color: colors.textSecondary,
              }}
            >
              本文
            </span>
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 12.5 * SCALE,
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              添付のとおりお送りします。
            </span>
          </div>
          <span style={{ fontSize: 11 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            <span style={markerPinkStyle}>平文＝そのまま読める形</span>
          </span>
        </div>

        {/* 抜き取られたらどうなるか */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            color: colors.accentPinkText,
            ...noteAppear,
          }}
        >
          <Ms name="visibility" size={16 * SCALE} />
          <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            経路の途中で抜き取られれば、内容はそのまま読まれる
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s04: S/MIME — 左イラスト + 右キーワード見出し（s02 と左右を反転）
// ---------------------------------------------------------------------------

const SmimeScene: React.FC = () => {
  const illustAppear = useAppear(0.4);
  const noteAppear = useAppear(segStart(SEG_SMIME, 2), { dy: 10 });
  return (
    <SlideShell narration={SEG_SMIME}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <Img
          src={staticFile("images/ipa_sg/tech-cert.png")}
          style={{
            flex: 0.85,
            minWidth: 0,
            alignSelf: "stretch",
            objectFit: "contain",
            mixBlendMode: "multiply",
            ...illustAppear,
          }}
        />
        <div
          style={{ flex: 1.25, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 * SCALE }}
        >
          <KeywordLead
            chip="メールの中身を守る方式"
            term="S/MIME"
            termSize={30 * SCALE}
            desc={<>デジタル証明書を使って、本文の暗号化とデジタル署名を行う</>}
            atSec={0.3}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 7 * SCALE, ...noteAppear }}>
            <span style={{ color: colors.primary600, flex: "none", display: "flex" }}>
              <Ms name="verified" size={15 * SCALE} />
            </span>
            <span
              style={{
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                lineHeight: 1.35,
                color: colors.textSecondary,
              }}
            >
              証明書は認証局が発行したものを使う
            </span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s05: S/MIME の二つの働き — 2カード横並び + 下に回収チップ
// ---------------------------------------------------------------------------

const RoleCard: React.FC<{
  icon: string;
  title: string;
  keyText: string;
  desc: string;
  atSec: number;
}> = ({ icon, title, keyText, desc, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      alignSelf: "stretch",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6 * SCALE,
      padding: `${13 * SCALE}px ${11 * SCALE}px`,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 16 * SCALE,
      ...useAppear(atSec),
    }}
  >
    <IconBadge name={icon} size={28} />
    <b style={{ fontSize: 17 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{title}</b>
    <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
      <span style={markerStyle}>{keyText}</span>
    </span>
    <span
      style={{
        fontSize: 11 * SCALE,
        fontWeight: 700,
        lineHeight: 1.35,
        color: colors.textSecondary,
        textAlign: "center",
      }}
    >
      {desc}
    </span>
  </div>
);

const TwoRolesScene: React.FC = () => {
  const chipAppear = useAppear(segStart(SEG_ROLES, 3), { dy: 10 });
  return (
    <SlideShell
      heading="S/MIME の二つの働き"
      icon={<Ms name="encrypted" size={videoType.slideHeadIcon} />}
      narration={SEG_ROLES}
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
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 10 * SCALE }}>
          <RoleCard
            icon="lock"
            title="暗号化"
            keyText="相手の公開鍵"
            desc="本文を読めない形にして送る"
            atSec={segStart(SEG_ROLES, 1)}
          />
          <RoleCard
            icon="verified"
            title="デジタル署名"
            keyText="自分の秘密鍵"
            desc="差出人が自分であることを示す"
            atSec={segStart(SEG_ROLES, 2)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", ...chipAppear }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6 * SCALE,
              fontSize: 12.5 * SCALE,
              fontWeight: 800,
              lineHeight: 1.25,
              color: colors.primary800,
              backgroundColor: colors.primary50,
              borderRadius: 999,
              padding: `${4 * SCALE}px ${14 * SCALE}px`,
            }}
          >
            <Ms name="fact_check" size={15 * SCALE} />
            署名があれば、書き換えられていないことも分かる
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s07: 【抽象→具体】取引先に見積書を送る — 場面図
// ---------------------------------------------------------------------------

const PersonCol: React.FC<{ file: string; label: string; atSec: number }> = ({
  file,
  label,
  atSec,
}) => (
  <div
    style={{
      flex: 0.75,
      minWidth: 0,
      alignSelf: "stretch",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 3 * SCALE,
      ...useAppear(atSec),
    }}
  >
    <Img
      src={staticFile(`images/ipa_sg/${file}`)}
      style={{
        flex: 1,
        minHeight: 0,
        width: "100%",
        objectFit: "contain",
        mixBlendMode: "multiply",
      }}
    />
    <b style={{ flex: "none", fontSize: 12 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{label}</b>
  </div>
);

const CheckChip: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6 * SCALE,
      fontSize: 12 * SCALE,
      fontWeight: 800,
      lineHeight: 1.25,
      color: colors.correctText,
      backgroundColor: colors.correctSurface,
      border: `${1.5 * SCALE}px solid ${colors.correctBorder}`,
      borderRadius: 999,
      padding: `${3.5 * SCALE}px ${13 * SCALE}px`,
      whiteSpace: "nowrap",
      ...useAppear(atSec),
    }}
  >
    <Ms name="check_circle" size={15 * SCALE} />
    {text}
  </span>
);

const ScenarioScene: React.FC = () => {
  const serverAppear = useAppear(0.45);
  const parcelAppear = useAppear(segStart(SEG_SCENE, 1));
  const blindAppear = useAppear(segStart(SEG_SCENE, 2), { dy: 10 });
  return (
    <SlideShell
      heading="取引先に見積書を送る"
      icon={<Ms name="description" size={videoType.slideHeadIcon} />}
      narration={SEG_SCENE}
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
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: 3 * SCALE }}>
          <PersonCol file="person-employee-m-laptop.png" label="自社" atSec={0.3} />
          <div
            style={{
              flex: 2.3,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4 * SCALE,
            }}
          >
            {/* 経路の途中にある中継サーバ */}
            <div
              style={{ display: "flex", alignItems: "center", gap: 6 * SCALE, ...serverAppear }}
            >
              <IconBadge name="dns" size={17} tone="muted" />
              <span
                style={{
                  fontSize: 11 * SCALE,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: colors.textSecondary,
                }}
              >
                途中の中継サーバ
              </span>
            </div>
            {/* 暗号化された見積書が右へ流れる */}
            <svg
              viewBox="0 0 1000 60"
              style={{ width: "100%", height: 15 * SCALE, flex: "none" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <ArrowMarker id="scene-arrow" color={colors.primary500} />
              <DrawPath
                d="M10 30 L935 30"
                delaySec={segStart(SEG_SCENE, 1)}
                durSec={0.9}
                stroke={colors.primary500}
                strokeWidth={7}
                markerEnd="url(#scene-arrow)"
              />
            </svg>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7 * SCALE,
                padding: `${5 * SCALE}px ${13 * SCALE}px`,
                backgroundColor: colors.primary50,
                border: `${1.5 * SCALE}px solid ${colors.primary300}`,
                borderRadius: 12 * SCALE,
                ...parcelAppear,
              }}
            >
              <span style={{ color: colors.primary600, flex: "none", display: "flex" }}>
                <Ms name="lock" size={17 * SCALE} />
              </span>
              <span style={{ fontSize: 12.5 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
                見積書は相手の公開鍵で暗号化
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6 * SCALE,
                color: colors.accentPinkText,
                ...blindAppear,
              }}
            >
              <Ms name="visibility_off" size={15 * SCALE} />
              <span style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.25 }}>
                中継サーバでは中身が読めない
              </span>
            </div>
          </div>
          <PersonCol file="person-employee-f-laptop.png" label="取引先" atSec={0.3} />
        </div>
        <div
          style={{ flex: "none", display: "flex", justifyContent: "center", gap: 8 * SCALE }}
        >
          <CheckChip text="差出人は本人" atSec={segStart(SEG_SCENE, 3)} />
          <CheckChip text="改ざんされていない" atSec={segStart(SEG_SCENE, 3) + 0.4} />
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s08: 【転換】迷惑メールを止める三か所 — ①②③の3ステージ帯
// ---------------------------------------------------------------------------

const PlaceCard: React.FC<{
  no: string;
  icon: string;
  title: string;
  sub: string;
  atSec: number;
}> = ({ no, icon, title, sub, atSec }) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      alignSelf: "stretch",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 5 * SCALE,
      padding: `${12 * SCALE}px ${9 * SCALE}px`,
      backgroundColor: colors.surface,
      border: `${1.5 * SCALE}px solid ${colors.border}`,
      borderRadius: 16 * SCALE,
      ...useAppear(atSec),
    }}
  >
    <Chip text={no} />
    <IconBadge name={icon} size={26} />
    <b style={{ fontSize: 15 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>{title}</b>
    <span
      style={{
        fontSize: 11 * SCALE,
        fontWeight: 700,
        lineHeight: 1.35,
        color: colors.textSecondary,
        textAlign: "center",
      }}
    >
      {sub}
    </span>
  </div>
);

const ThreePlacesScene: React.FC = () => {
  const leadAppear = useAppear(segStart(SEG_PLACES, 1), { dy: 10 });
  return (
    <SlideShell
      heading="迷惑メールを止める三か所"
      icon={<Ms name="shield" size={videoType.slideHeadIcon} />}
      narration={SEG_PLACES}
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
        <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 9 * SCALE }}>
          <PlaceCard
            no="①"
            icon="manage_accounts"
            title="送るとき"
            sub="送信サーバを使う人を確かめる"
            atSec={0.4}
          />
          <PlaceCard
            no="②"
            icon="router"
            title="出ていくとき"
            sub="プロバイダの出口でまとめて塞ぐ"
            atSec={0.9}
          />
          <PlaceCard
            no="③"
            icon="fact_check"
            title="受け取るとき"
            sub="受信側で迷惑メールを振り分ける"
            atSec={1.4}
          />
        </div>
        <div style={{ flex: "none", textAlign: "center", ...leadAppear }}>
          <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
            1通ずつ見分けるのではなく、<span style={markerStyle}>三か所で止める</span>
          </b>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s09: ① SMTP-AUTH — 送信設定のモック（縦積み）
// ---------------------------------------------------------------------------

const MockRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 * SCALE }}>
    {/* ラベルは折り返させない（幅が足りないと1文字ずつ縦に積まれてカードが3倍の高さになる） */}
    <span
      style={{
        flex: "none",
        width: 50 * SCALE,
        fontSize: 9.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.25,
        whiteSpace: "nowrap",
        color: colors.textSecondary,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: fontMono,
        fontSize: 11.5 * SCALE,
        fontWeight: 800,
        lineHeight: 1.25,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  </div>
);

const SmtpAuthScene: React.FC = () => {
  const cardAppear = useAppear(0.35);
  // 3文目「送る前に利用者を認証します」で認証行を点灯させる
  const on = useProgress(segStart(SEG_AUTH, 2), 0.4);
  const bg = interpolateColors(on, [0, 1], [colors.bg, colors.primary50]);
  const bd = interpolateColors(on, [0, 1], [colors.border, colors.primary500]);
  const fg = interpolateColors(on, [0, 1], [colors.textMuted, colors.primary800]);
  const termAppear = useAppear(segStart(SEG_AUTH, 3));
  const descAppear = useAppear(segStart(SEG_AUTH, 4), { dy: 10 });
  return (
    <SlideShell
      heading="① 送るときに止める"
      icon={<Ms name="manage_accounts" size={videoType.slideHeadIcon} />}
      narration={SEG_AUTH}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8 * SCALE,
        }}
      >
        {/* メールソフトの送信設定 */}
        <div
          style={{
            width: "76%",
            display: "flex",
            flexDirection: "column",
            gap: 5 * SCALE,
            padding: `${9 * SCALE}px ${14 * SCALE}px`,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.border}`,
            borderRadius: 16 * SCALE,
            ...cardAppear,
          }}
        >
          <MockRow label="送信サーバ" value="smtp.example.co.jp" />
          <MockRow label="ユーザー名" value="sato@example.co.jp" />
          <MockRow label="パスワード" value="••••••••" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8 * SCALE,
              padding: `${4 * SCALE}px ${11 * SCALE}px`,
              backgroundColor: bg,
              border: `${1.5 * SCALE}px solid ${bd}`,
              borderRadius: 10 * SCALE,
            }}
          >
            <span style={{ color: fg, flex: "none", display: "flex" }}>
              <Ms name="check_circle" size={15 * SCALE} />
            </span>
            <span style={{ fontSize: 11.5 * SCALE, fontWeight: 800, lineHeight: 1.25, color: fg }}>
              送信する前に利用者を認証する
            </span>
          </div>
        </div>

        {/* 用語の回収 */}
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 * SCALE }}
        >
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>SMTP-AUTH</span>
          </b>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.35,
              color: colors.textSecondary,
              ...descAppear,
            }}
          >
            利用者名とパスワードで、正規の利用者だけに送信を許す
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s10: ② OP25B — 塞がれる道 / 通る道 の2レーン比較
// ---------------------------------------------------------------------------

const Lane: React.FC<{
  tone: "pink" | "blue";
  icon: string;
  nodeLabel: string;
  route: string;
  statusIcon: string;
  status: string;
  atSec: number;
  statusAtSec: number;
  arrowId: string;
}> = ({ tone, icon, nodeLabel, route, statusIcon, status, atSec, statusAtSec, arrowId }) => {
  const laneAppear = useAppear(atSec);
  const statusAppear = usePop(statusAtSec);
  const isPink = tone === "pink";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9 * SCALE,
        padding: `${9 * SCALE}px ${13 * SCALE}px`,
        backgroundColor: isPink ? colors.accentPinkSurface : colors.primary50,
        border: `${1.5 * SCALE}px solid ${isPink ? colors.accentPinkSoft : colors.primary300}`,
        borderRadius: 14 * SCALE,
        ...laneAppear,
      }}
    >
      {/* ノードのラベルは折り返させない（幅を縛ると1文字ずつ縦に積まれてレーンが縦長になる） */}
      <div
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          gap: 6 * SCALE,
        }}
      >
        <IconBadge name={icon} size={19} tone={isPink ? "pink" : "blue"} />
        <span
          style={{
            fontSize: 10 * SCALE,
            fontWeight: 800,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {nodeLabel}
        </span>
      </div>
      <ArrowStrip
        id={arrowId}
        atSec={atSec + 0.3}
        widthPx={44}
        color={isPink ? colors.accentPink : colors.primary500}
      />
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {route}
      </span>
      <span
        style={{
          flex: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 5 * SCALE,
          fontSize: 12 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          color: isPink ? colors.accentPinkText : colors.correctText,
          backgroundColor: colors.surface,
          borderRadius: 999,
          padding: `${3.5 * SCALE}px ${11 * SCALE}px`,
          whiteSpace: "nowrap",
          ...statusAppear,
        }}
      >
        <Ms name={statusIcon} size={15 * SCALE} />
        {status}
      </span>
    </div>
  );
};

const Op25bScene: React.FC = () => {
  const termAppear = useAppear(segStart(SEG_OP25B, 3));
  return (
    <SlideShell
      heading="② 出ていくときに塞ぐ"
      icon={<Ms name="router" size={videoType.slideHeadIcon} />}
      narration={SEG_OP25B}
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
          tone="pink"
          icon="laptop_mac"
          nodeLabel="乗っ取られた端末"
          route="外向きの25番ポートで直接"
          statusIcon="cancel"
          status="塞がれる"
          atSec={segStart(SEG_OP25B, 1)}
          statusAtSec={segStart(SEG_OP25B, 2)}
          arrowId="op25b-a"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2 * SCALE,
            ...termAppear,
          }}
        >
          <b style={{ fontSize: 24 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
            <span style={markerStyle}>OP25B</span>
          </b>
          <span
            style={{
              fontSize: 11.5 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
            }}
          >
            プロバイダが外向きの25番ポートをまとめて塞ぐ
          </span>
        </div>
        <Lane
          tone="blue"
          icon="laptop_mac"
          nodeLabel="利用者の端末"
          route="プロバイダの送信サーバを経由"
          statusIcon="check_circle"
          status="通る"
          atSec={segStart(SEG_OP25B, 4)}
          statusAtSec={segStart(SEG_OP25B, 4) + 0.5}
          arrowId="op25b-b"
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s11: ③ ベイジアンフィルタリング — メールカード + 単語スコアバー
// ---------------------------------------------------------------------------

const WordBar: React.FC<{ word: string; pct: number; atSec: number }> = ({ word, pct, atSec }) => {
  const appear = useAppear(atSec);
  const p = useProgress(atSec + 0.15, 0.6);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 * SCALE, ...appear }}>
      <span
        style={{
          flex: "none",
          width: 34 * SCALE,
          fontSize: 11 * SCALE,
          fontWeight: 800,
          lineHeight: 1.2,
          textAlign: "right",
          whiteSpace: "nowrap",
        }}
      >
        {word}
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          height: 8 * SCALE,
          borderRadius: 999,
          backgroundColor: colors.primary100,
          display: "block",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            display: "block",
            width: `${p * pct}%`,
            height: "100%",
            borderRadius: 999,
            backgroundColor: colors.primary600,
          }}
        />
      </span>
    </div>
  );
};

const BayesScene: React.FC = () => {
  const mailAppear = useAppear(0.35);
  const barsAppear = useAppear(segStart(SEG_BAYES, 2), { dy: 10 });
  const termAppear = useAppear(segStart(SEG_BAYES, 3));
  const noteAppear = useAppear(segStart(SEG_BAYES, 4), { dy: 10 });
  return (
    <SlideShell
      heading="③ 受け取るときに振り分ける"
      icon={<Ms name="fact_check" size={videoType.slideHeadIcon} />}
      narration={SEG_BAYES}
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
        <div style={{ display: "flex", alignItems: "center", gap: 11 * SCALE }}>
          {/* 届いた1通 */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 4 * SCALE,
              padding: `${9 * SCALE}px ${12 * SCALE}px`,
              backgroundColor: colors.surface,
              border: `${1.5 * SCALE}px solid ${colors.border}`,
              borderRadius: 14 * SCALE,
              ...mailAppear,
            }}
          >
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 10 * SCALE,
                fontWeight: 800,
                lineHeight: 1.25,
                whiteSpace: "nowrap",
                color: colors.textSecondary,
              }}
            >
              info@unknown-shop.example
            </span>
            <span
              style={{
                fontSize: 12.5 * SCALE,
                fontWeight: 800,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
              }}
            >
              【当選】無料で今すぐ受取
            </span>
          </div>
          {/* 単語ごとの迷惑メール度 */}
          <div
            style={{
              flex: 1.05,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 5 * SCALE,
              ...barsAppear,
            }}
          >
            <span
              style={{
                fontSize: 10 * SCALE,
                fontWeight: 800,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                color: colors.textSecondary,
              }}
            >
              学習した「迷惑メール度」
            </span>
            <WordBar word="当選" pct={94} atSec={segStart(SEG_BAYES, 2)} />
            <WordBar word="無料" pct={81} atSec={segStart(SEG_BAYES, 2) + 0.4} />
            <WordBar word="今すぐ" pct={66} atSec={segStart(SEG_BAYES, 2) + 0.8} />
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 * SCALE }}
        >
          <b style={{ fontSize: 20 * SCALE, fontWeight: 800, lineHeight: 1.2, ...termAppear }}>
            <span style={markerStyle}>ベイジアンフィルタリング</span>
          </b>
          <span
            style={{
              fontSize: 11 * SCALE,
              fontWeight: 700,
              lineHeight: 1.3,
              color: colors.textSecondary,
              ...noteAppear,
            }}
          >
            利用者が迷惑と指定するほど、判定の精度は上がる
          </span>
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// s12: クイズ導入の幕間
// ---------------------------------------------------------------------------

const QuizIntroScene: React.FC = () => <SectionTitle title="クイズで確認" />;

// ---------------------------------------------------------------------------
// VideoSpec
// ---------------------------------------------------------------------------

export const SgL44EmailEncryptionSpam: VideoSpec = {
  id: "sg-L44-email-encryption-spam",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "メールを守る\n暗号化とスパム対策",
      keywords: ["S/MIME", "PGP", "OP25B"],
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
      name: "plaintext-path",
      durationSec: 6,
      narration: SEG_PLAIN,
      component: PlaintextPathScene,
    },
    {
      pattern: "custom",
      name: "smime",
      durationSec: 5,
      narration: SEG_SMIME,
      component: SmimeScene,
    },
    {
      pattern: "custom",
      name: "two-roles",
      durationSec: 6,
      narration: SEG_ROLES,
      component: TwoRolesScene,
    },
    {
      pattern: "vs",
      heading: "誰が鍵を保証するか",
      icon: "handshake",
      left: {
        title: "S/MIME",
        icon: "verified_user",
        rows: [
          { k: "鍵の保証", v: "認証局が発行する証明書" },
          { k: "信頼の形", v: "上位の機関に保証してもらう" },
          { k: "使いどころ", v: "企業のメールで広く使う" },
        ],
      },
      right: {
        title: "PGP",
        icon: "group",
        rows: [
          { k: "鍵の保証", v: "利用者どうしの署名" },
          { k: "信頼の形", v: "利用者どうしで支え合う" },
          { k: "使いどころ", v: "個人どうしのやり取り" },
        ],
      },
      columnAtSec: [segStart(SEG_PGP, 1), segStart(SEG_PGP, 2)],
      narration: SEG_PGP,
    },
    {
      pattern: "custom",
      name: "scenario",
      durationSec: 6,
      narration: SEG_SCENE,
      component: ScenarioScene,
    },
    {
      pattern: "custom",
      name: "three-places",
      durationSec: 5,
      narration: SEG_PLACES,
      component: ThreePlacesScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "smtp-auth",
      durationSec: 7,
      narration: SEG_AUTH,
      component: SmtpAuthScene,
    },
    {
      pattern: "custom",
      name: "op25b",
      durationSec: 7,
      narration: SEG_OP25B,
      component: Op25bScene,
    },
    {
      pattern: "custom",
      name: "bayes",
      durationSec: 7,
      narration: SEG_BAYES,
      component: BayesScene,
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
      question: "S/MIMEが使うのは？",
      choices: [
        { key: "A", text: "デジタル証明書", correct: true },
        { key: "B", text: "送信元IPアドレス" },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "OP25Bが塞ぐのは？",
      choices: [
        { key: "A", text: "迷惑メールフォルダ" },
        { key: "B", text: "外向きの25番ポート", correct: true },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "SMTP-AUTHで認証するのは？",
      choices: [
        { key: "A", text: "メールを送るとき", correct: true },
        { key: "B", text: "メールを開くとき" },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        { text: "中身は暗号化とデジタル署名で守る", checkAtSec: segStart(SEG_SUM, 0) },
        { text: "S/MIMEは認証局、PGPは利用者どうし", checkAtSec: segStart(SEG_SUM, 1) },
        { text: "送信時の認証・出口の遮断・受信の網", checkAtSec: segStart(SEG_SUM, 2) },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
