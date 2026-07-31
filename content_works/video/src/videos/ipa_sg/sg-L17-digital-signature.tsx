import { Img, staticFile } from "remotion";
import { colors, fontMono, markerStyle, SCALE, videoType } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { SectionTitle } from "../../parts/SectionTitle";
import { Ms } from "../../parts/Ms";
import { useAppear, usePop } from "../../parts/animate";
import { narrationLoader, segStart } from "../../parts/narration";
import { QUIZ_INTRO_SEG, OUTRO_SEG } from "../../parts/common-narration";
import type { VideoSpec } from "../types";
import durations from "./sg-L17-digital-signature.audio.json";

/**
 * 情報セキュリティマネジメント講座 SG-L17: デジタル署名とメッセージ認証
 *
 * 発注書 content_works/ipa_sg/orders/L17.md に対応。
 * シナリオは narration/ipa_sg/sg-L17-digital-signature.md。
 *
 * 「本人が作り、改ざんされていない」をどう技術で証明するかを背骨にした構成:
 *   導入（紙のサイン）→ 証明できる2つのこと（2カード）→ 鍵の向きが逆（上下2段の帯）→
 *   署名を作る流れ（横フロー）→ 検証（2値の突き合わせ）→
 *   wipe-light でタイムスタンプ（キーワード見出し＋イラスト）→ MAC（2者対称図）→
 *   署名とMACの違い（vs）→ クイズ幕間 → クイズ3問 → wipe でまとめ。
 *
 * 呼称は L15（公開鍵・秘密鍵）と L16（メッセージダイジェスト）に揃えている。
 */

const N = narrationLoader(durations, "audio/ipa_sg/sg-L17-digital-signature");

// ---------------------------------------------------------------------------
// セグメント定義（spec の narration と SlideShell の narration の両方に同じものを渡す）
// ---------------------------------------------------------------------------

const SEG_INTRO = [
  N("s02-1.mp3", "今回は、デジタル署名とメッセージ認証について学びます。"),
  N("s02-2.mp3", "紙の契約書なら、本人のサインや押印が、確かに私が作ったという証になります。"),
  N("s02-3.mp3", "では、データで送る文書には、どうやってその証を付けるのでしょうか。"),
  N("s02-4.mp3", "その役割を果たすのが、公開鍵の技術を応用したデジタル署名です。"),
];

const SEG_PROOF = [
  N("s03-1.mp3", "デジタル署名で証明できることは、大きく二つあります。"),
  N("s03-2.mp3", "一つ目は、その文書を確かに本人が作った、ということです。"),
  N("s03-3.mp3", "本人しか作れない署名なので、後から私ではないと言い逃れできません。"),
  N("s03-4.mp3", "二つ目は、その文書が途中で改ざんされていない、ということです。"),
  N("s03-5.mp3", "つまり署名は、真正性と完全性、そして否認防止を同時に支えます。"),
];

const SEG_KEYS = [
  N("s04-1.mp3", "デジタル署名は、公開鍵暗号方式の鍵のペアを使います。"),
  N("s04-2.mp3", "ただし、鍵を使う向きが暗号化とは逆になります。"),
  N("s04-3.mp3", "暗号化では、相手の公開鍵で暗号化し、本人が秘密鍵で復号しました。"),
  N("s04-4.mp3", "署名では逆に、自分の秘密鍵で署名を作り、この鍵を署名鍵と呼びます。"),
  N("s04-5.mp3", "受け取った人は、公開されている検証鍵で、その署名を確かめます。"),
];

const SEG_MAKE = [
  N("s05-1.mp3", "次に、署名を作る手順を見てみましょう。"),
  N("s05-2.mp3", "署名は、文書全体ではなく、メッセージダイジェストに対して行います。"),
  N("s05-3.mp3", "メッセージダイジェストとは、ハッシュ関数で計算した短い値のことです。"),
  N("s05-4.mp3", "その値を署名鍵で変換したものが、デジタル署名になります。"),
  N("s05-5.mp3", "あとは、文書とデジタル署名をセットにして相手へ送ります。"),
];

const SEG_VERIFY = [
  N("s06-1.mp3", "受け取った側は、二つの値を突き合わせます。"),
  N("s06-2.mp3", "一つは、署名を検証鍵で戻して取り出したダイジェストです。"),
  N("s06-3.mp3", "もう一つは、届いた文書から自分でハッシュ関数を計算した値です。"),
  N("s06-4.mp3", "この二つが一致すれば、本人が作り、改ざんもされていないと分かります。"),
];

const SEG_TIME = [
  N("s07-1.mp3", "ここからは、時刻の証明です。"),
  N("s07-2.mp3", "署名は誰が作ったかを示しますが、いつ作られたかは示せません。"),
  N("s07-3.mp3", "そこで使うのがタイムスタンプ、日本語で時刻認証と呼ばれる仕組みです。"),
  N("s07-4.mp3", "その時刻にその文書が存在し、それ以降変わっていないことを証明します。"),
  N("s07-5.mp3", "証明するのは当事者ではなく、信頼できる第三者の機関です。"),
];

const SEG_MAC = [
  N("s08-1.mp3", "もう一つの改ざん検知の方法が、メッセージ認証符号です。"),
  // 略語の読み: MAC は「マック」が定着した読み（HMAC＝エイチマック）なので、
  // 音声（jobs.json）は「マック」・字幕はこの text で読みを添えている（初出のみ）。
  N("s08-2.mp3", "英語の頭文字から、MAC（マック）とも呼ばれます。"),
  N("s08-3.mp3", "送る側は、メッセージと共通鍵から短い符号を計算して、一緒に送ります。"),
  N("s08-4.mp3", "受け取る側も同じ共通鍵で計算し、値が合えば改ざんされていないと分かります。"),
];

const SEG_DIFF = [
  N("s09-1.mp3", "デジタル署名とメッセージ認証符号は、使う鍵が違います。"),
  N("s09-2.mp3", "署名は公開鍵の技術なので、第三者にも本人が作ったと示せます。"),
  N("s09-3.mp3", "一方MACは、共通鍵を知る二者の間だけの仕組みで、否認防止はできません。"),
];

const SEG_QUIZ_INTRO = QUIZ_INTRO_SEG; // 定型セリフ。共通音声を使い回す

const SEG_Q1 = [
  N("s11-1.mp3", "ここで問題です。"),
  N("s11-2.mp3", "デジタル署名を作るときに使うのは、どちらの鍵でしょうか。"),
  N("s11-3.mp3", "正解は、自分の秘密鍵、つまり署名鍵です。", { gapBeforeSec: 1.8 }),
];

const SEG_Q2 = [
  N("s12-1.mp3", "次の問題です。"),
  N("s12-2.mp3", "デジタル署名で確認できることは、どちらでしょうか。"),
  N("s12-3.mp3", "正解は、本人が作成したことと、改ざんされていないことです。", { gapBeforeSec: 1.8 }),
];

const SEG_Q3 = [
  N("s13-1.mp3", "最後の問題です。"),
  N("s13-2.mp3", "タイムスタンプが証明するのは、何でしょうか。"),
  N("s13-3.mp3", "正解は、その時刻に文書が存在していたことです。", { gapBeforeSec: 1.8 }),
];

const SEG_SUM = [
  N("s14-1.mp3", "デジタル署名は、本人が作ったことと、改ざんがないことを証明します。"),
  N("s14-2.mp3", "署名は自分の秘密鍵で作り、公開された検証鍵で誰でも確かめられます。"),
  N("s14-3.mp3", "時刻はタイムスタンプ、共通鍵での改ざん検知はメッセージ認証符号です。"),
  OUTRO_SEG, // 定型セリフ。共通音声を使い回す
];

// ---------------------------------------------------------------------------
// P2: 導入 — 左テキスト + 右イラスト（紙のサイン）
// ---------------------------------------------------------------------------

const IntroScene: React.FC = () => {
  const leadAppear = useAppear(0.3);
  const noteAppear = useAppear(segStart(SEG_INTRO, 3));
  const illustAppear = useAppear(0.5);
  return (
    <SlideShell narration={SEG_INTRO}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", gap: "5%" }}>
        <div
          style={{ flex: 1.1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 * SCALE }}
        >
          <span
            style={{
              fontSize: 19 * SCALE,
              fontWeight: 800,
              lineHeight: 1.5,
              whiteSpace: "pre-line",
              ...leadAppear,
            }}
          >
            {"「確かに私が作った」を\n"}
            <span style={markerStyle}>データで示す</span>
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
            紙のサインや押印にあたる仕組み
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/tech-signature.png")}
          style={{
            flex: 1,
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
// P3: 署名が証明する2つのこと — 2カード横並び + CIA+α の回収チップ
// ---------------------------------------------------------------------------

const ProofCard: React.FC<{
  no: string;
  icon: string;
  title: string;
  sub: string;
  extra?: string;
  atSec: number;
  extraAtSec: number;
}> = ({ no, icon, title, sub, extra, atSec, extraAtSec }) => {
  const card = usePop(atSec);
  const extraAppear = useAppear(extraAtSec, { dy: 10 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // 2枚のカードは行数が違う（1枚目だけ extra がある）ので上揃えにする。
        // center にすると同じ要素（チップ・アイコン）の高さが左右でずれて見える
        justifyContent: "flex-start",
        gap: 4 * SCALE,
        padding: `${8 * SCALE}px ${10 * SCALE}px`,
        backgroundColor: colors.surface,
        border: `${1.5 * SCALE}px solid ${colors.border}`,
        borderRadius: 16 * SCALE,
        textAlign: "center",
        ...card,
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
        }}
      >
        {no}
      </span>
      <span
        style={{
          width: 32 * SCALE,
          height: 32 * SCALE,
          borderRadius: 12 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={19 * SCALE} />
      </span>
      <b style={{ fontSize: 15.5 * SCALE, fontWeight: 800, lineHeight: 1.3 }}>
        <span style={markerStyle}>{title}</span>
      </b>
      <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
        {sub}
      </span>
      {extra ? (
        <span
          style={{
            marginTop: 2 * SCALE,
            fontSize: 10.5 * SCALE,
            fontWeight: 800,
            color: colors.primary800,
            ...extraAppear,
          }}
        >
          {extra}
        </span>
      ) : null}
    </div>
  );
};

const ProofScene: React.FC = () => {
  const footAppear = useAppear(segStart(SEG_PROOF, 4), { dy: 12 });
  return (
    <SlideShell
      heading="デジタル署名が証明すること"
      icon={<Ms name="verified" size={videoType.slideHeadIcon} />}
      narration={SEG_PROOF}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 7 * SCALE,
        }}
      >
        {/* flexShrink: 0 — 縮められるとカードの中身が白い箱の外へはみ出す */}
        <div style={{ display: "flex", gap: 10 * SCALE, flexShrink: 0 }}>
          <ProofCard
            no="1つ目"
            icon="verified_user"
            title="本人が作った"
            sub="なりすましではない"
            extra="後から「私ではない」と言えない"
            atSec={segStart(SEG_PROOF, 1)}
            extraAtSec={segStart(SEG_PROOF, 2)}
          />
          <ProofCard
            no="2つ目"
            icon="fact_check"
            title="改ざんされていない"
            sub="送ったあとに書き換わっていない"
            atSec={segStart(SEG_PROOF, 3)}
            extraAtSec={segStart(SEG_PROOF, 3)}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8 * SCALE,
            ...footAppear,
          }}
        >
          <span style={{ fontSize: 11 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
            署名が同時に支えるもの
          </span>
          {["真正性", "完全性", "否認防止"].map((x) => (
            <span
              key={x}
              style={{
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
                backgroundColor: colors.primary50,
                border: `${1.5 * SCALE}px solid ${colors.primary100}`,
                borderRadius: 999,
                padding: `${3 * SCALE}px ${12 * SCALE}px`,
              }}
            >
              {x}
            </span>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P4: 署名鍵と検証鍵 — 上下2段の帯（暗号化と署名で鍵の向きが逆）
// ---------------------------------------------------------------------------

const DirectionBand: React.FC<{
  label: string;
  icon: string;
  fromKey: string;
  fromAct: string;
  toKey: string;
  toAct: string;
  fromChip?: string;
  toChip?: string;
  tone: "muted" | "main";
  atSec: number;
  chipAtSec: number;
  toChipAtSec: number;
}> = ({
  label,
  icon,
  fromKey,
  fromAct,
  toKey,
  toAct,
  fromChip,
  toChip,
  tone,
  atSec,
  chipAtSec,
  toChipAtSec,
}) => {
  const band = useAppear(atSec, { dy: 16 });
  const fromChipAppear = useAppear(chipAtSec, { dy: 8 });
  const toChipAppear = useAppear(toChipAtSec, { dy: 8 });
  const main = tone === "main";
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 11 * SCALE,
        padding: `${10 * SCALE}px ${14 * SCALE}px`,
        backgroundColor: main ? colors.primary50 : colors.surface,
        border: `${1.5 * SCALE}px solid ${main ? colors.primary300 : colors.border}`,
        borderRadius: 15 * SCALE,
        ...band,
      }}
    >
      <span
        style={{
          flex: "none",
          width: 66 * SCALE,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2 * SCALE,
          color: main ? colors.primary600 : colors.textSecondary,
        }}
      >
        <Ms name={icon} size={22 * SCALE} />
        <b style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
      </span>
      <KeyStep
        keyName={fromKey}
        act={fromAct}
        chip={fromChip}
        chipStyle={fromChipAppear}
        main={main}
      />
      <span
        style={{
          flex: "none",
          fontSize: 22 * SCALE,
          lineHeight: 1,
          color: main ? colors.primary500 : colors.primary300,
        }}
      >
        →
      </span>
      <KeyStep keyName={toKey} act={toAct} chip={toChip} chipStyle={toChipAppear} main={main} />
    </div>
  );
};

const KeyStep: React.FC<{
  keyName: string;
  act: string;
  chip?: string;
  chipStyle: React.CSSProperties;
  main: boolean;
}> = ({ keyName, act, chip, chipStyle, main }) => (
  <span
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2 * SCALE,
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: 6 * SCALE }}>
      <b style={{ fontSize: 14 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{keyName}</b>
      {chip ? (
        <span
          style={{
            fontSize: 10 * SCALE,
            fontWeight: 800,
            color: main ? colors.primary800 : colors.textSecondary,
            backgroundColor: colors.surface,
            border: `${1.5 * SCALE}px solid ${colors.primary300}`,
            borderRadius: 999,
            padding: `${1.5 * SCALE}px ${8 * SCALE}px`,
            whiteSpace: "nowrap",
            ...chipStyle,
          }}
        >
          {chip}
        </span>
      ) : null}
    </span>
    <span style={{ fontSize: 10.5 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
      {act}
    </span>
  </span>
);

const KeyDirectionScene: React.FC = () => {
  const noteAppear = useAppear(segStart(SEG_KEYS, 1), { dy: 10 });
  return (
    <SlideShell
      heading="署名鍵と検証鍵"
      icon={<Ms name="key" size={videoType.slideHeadIcon} />}
      narration={SEG_KEYS}
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
        <b style={{ fontSize: 14 * SCALE, fontWeight: 800, lineHeight: 1.2, ...noteAppear }}>
          <span>
            同じ鍵ペアでも、使う<span style={markerStyle}>向きが逆</span>になる
          </span>
        </b>
        <DirectionBand
          label="暗号化"
          icon="encrypted"
          fromKey="相手の公開鍵"
          fromAct="送る人が暗号化する"
          toKey="自分の秘密鍵"
          toAct="受け取る本人が復号する"
          tone="muted"
          atSec={segStart(SEG_KEYS, 2)}
          chipAtSec={segStart(SEG_KEYS, 2)}
          toChipAtSec={segStart(SEG_KEYS, 2)}
        />
        <DirectionBand
          label="署名"
          icon="verified_user"
          fromKey="自分の秘密鍵"
          fromChip="署名鍵"
          fromAct="作った人が署名する"
          toKey="公開されている鍵"
          toChip="検証鍵"
          toAct="誰でも署名を確かめられる"
          tone="main"
          atSec={segStart(SEG_KEYS, 3)}
          chipAtSec={segStart(SEG_KEYS, 3) + 1.2}
          toChipAtSec={segStart(SEG_KEYS, 4)}
        />
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P5: 署名を作る流れ — 文書 →(ハッシュ関数) ダイジェスト →(署名鍵) デジタル署名
// ---------------------------------------------------------------------------

const FlowBox: React.FC<{
  name: string;
  sub: string;
  tone: "plain" | "digest" | "sign";
  atSec: number;
}> = ({ name, sub, tone, atSec }) => {
  const box = usePop(atSec);
  const filled = tone === "sign";
  return (
    <div
      style={{
        // 幅は固定せず中身に合わせる（「デジタル署名」は6文字あり、固定幅だと
        // nowrap のまま枠から溢れる。minWidth で短い語の箱がやせすぎるのを防ぐ）
        minWidth: 64 * SCALE,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3 * SCALE,
        padding: `${13 * SCALE}px ${11 * SCALE}px`,
        backgroundColor: filled ? colors.primary600 : colors.surface,
        color: filled ? colors.textPrimaryDark : colors.textPrimary,
        border: `${1.5 * SCALE}px solid ${filled ? colors.primary600 : colors.border}`,
        borderRadius: 14 * SCALE,
        ...box,
      }}
    >
      <b style={{ fontSize: 14 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{name}</b>
      <span
        style={{
          fontSize: 9.5 * SCALE,
          fontWeight: 700,
          fontFamily: tone === "plain" ? undefined : fontMono,
          color: filled ? colors.primary100 : colors.textSecondary,
          whiteSpace: "nowrap",
        }}
      >
        {sub}
      </span>
    </div>
  );
};

const FlowArrow: React.FC<{ label: string; atSec: number }> = ({ label, atSec }) => {
  const arrow = useAppear(atSec, { dy: 0 });
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...arrow,
      }}
    >
      <b style={{ fontSize: 11 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
      <span style={{ fontSize: 20 * SCALE, lineHeight: 1, color: colors.primary300 }}>→</span>
    </div>
  );
};

const MakeSignatureScene: React.FC = () => {
  const sendAppear = useAppear(segStart(SEG_MAKE, 4), { dy: 12 });
  return (
    <SlideShell
      heading="署名はダイジェストに付ける"
      icon={<Ms name="schema" size={videoType.slideHeadIcon} />}
      narration={SEG_MAKE}
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
          gap: 12 * SCALE,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2 * SCALE,
          }}
        >
          <FlowBox name="文書" sub="長い" tone="plain" atSec={0.3} />
          <FlowArrow label="ハッシュ関数" atSec={segStart(SEG_MAKE, 1)} />
          <FlowBox
            name="ダイジェスト"
            sub="短い値"
            tone="digest"
            atSec={segStart(SEG_MAKE, 1) + 0.5}
          />
          <FlowArrow label="署名鍵で変換" atSec={segStart(SEG_MAKE, 3)} />
          <FlowBox
            name="デジタル署名"
            sub="本人しか作れない"
            tone="sign"
            atSec={segStart(SEG_MAKE, 3) + 0.5}
          />
        </div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            ...sendAppear,
          }}
        >
          <Ms name="mail" size={17 * SCALE} />
          <span>
            <span style={markerStyle}>文書とデジタル署名</span>をセットにして送る
          </span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P6: 受け取った側の検証 — 2つの値の突き合わせ
// ---------------------------------------------------------------------------

const ValueColumn: React.FC<{
  label: string;
  source: string;
  value: string;
  valueAtSec: number;
}> = ({ label, source, value, valueAtSec }) => {
  const valueAppear = usePop(valueAtSec);
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5 * SCALE,
      }}
    >
      <span style={{ fontSize: 11.5 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ fontSize: 10 * SCALE, fontWeight: 700, color: colors.textSecondary }}>
        {source}
      </span>
      <span
        style={{
          width: "100%",
          padding: `${11 * SCALE}px 0`,
          textAlign: "center",
          fontFamily: fontMono,
          fontSize: 17 * SCALE,
          fontWeight: 800,
          color: colors.primary600,
          backgroundColor: colors.surface,
          border: `${1.5 * SCALE}px solid ${colors.primary100}`,
          borderRadius: 13 * SCALE,
          ...valueAppear,
        }}
      >
        {value}
      </span>
    </div>
  );
};

const VerifyScene: React.FC = () => {
  const frameAppear = useAppear(0.3);
  const eqAppear = usePop(segStart(SEG_VERIFY, 3));
  const judgeAppear = useAppear(segStart(SEG_VERIFY, 3) + 0.4, { dy: 12 });
  return (
    <SlideShell
      heading="受け取った側の検証"
      icon={<Ms name="fact_check" size={videoType.slideHeadIcon} />}
      narration={SEG_VERIFY}
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
          gap: 12 * SCALE,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 6 * SCALE,
            ...frameAppear,
          }}
        >
          <ValueColumn
            label="署名から取り出した値"
            source="検証鍵で署名を戻す"
            value="3f9a…c72"
            valueAtSec={segStart(SEG_VERIFY, 1)}
          />
          <span
            style={{
              flex: "none",
              // 値の箱の中心に合わせる（列の上にはラベル2行が載っているので、
              // 行の中央ではなく「下揃え＋箱の半分ぶん持ち上げ」で合わせる）
              alignSelf: "flex-end",
              marginBottom: 6 * SCALE,
              fontSize: 26 * SCALE,
              fontWeight: 800,
              color: colors.primary600,
              ...eqAppear,
            }}
          >
            ＝
          </span>
          <ValueColumn
            label="文書から計算した値"
            source="ハッシュ関数で再計算"
            value="3f9a…c72"
            valueAtSec={segStart(SEG_VERIFY, 2)}
          />
        </div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8 * SCALE,
            padding: `${7 * SCALE}px ${16 * SCALE}px`,
            borderRadius: 999,
            fontSize: 13 * SCALE,
            fontWeight: 800,
            color: colors.correctText,
            backgroundColor: colors.correctSurface,
            border: `${1.5 * SCALE}px solid ${colors.correctBorder}`,
            ...judgeAppear,
          }}
        >
          <span style={{ color: colors.correct, display: "flex", alignItems: "center" }}>
            <Ms name="check_circle" size={18 * SCALE} />
          </span>
          <span>一致すれば 本人が作成・改ざんなし</span>
        </span>
      </div>
    </SlideShell>
  );
};

// ---------------------------------------------------------------------------
// P7: タイムスタンプ — キーワード見出し + 右イラスト（章の転換 wipe-light）
// ---------------------------------------------------------------------------

const ProofLine: React.FC<{ text: string; atSec: number }> = ({ text, atSec }) => {
  const line = useAppear(atSec, { dy: 10 });
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6 * SCALE,
        fontSize: 11 * SCALE,
        fontWeight: 700,
        ...line,
      }}
    >
      <span style={{ color: colors.primary600, display: "flex" }}>
        <Ms name="task_alt" size={16 * SCALE} />
      </span>
      <span>{text}</span>
    </span>
  );
};

const TimestampScene: React.FC = () => {
  const illustAppear = useAppear(0.4);
  const whoAppear = useAppear(segStart(SEG_TIME, 1), { dy: 10 });
  const termAppear = useAppear(segStart(SEG_TIME, 2));
  const thirdAppear = useAppear(segStart(SEG_TIME, 4), { dy: 10 });
  return (
    <SlideShell
      heading="「いつ」を証明する"
      icon={<Ms name="schedule" size={videoType.slideHeadIcon} />}
      narration={SEG_TIME}
    >
      <div
        style={{ flex: 1, minHeight: 0, marginTop: "2%", display: "flex", alignItems: "center", gap: "4%" }}
      >
        <div
          style={{
            flex: 1.3,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            // 高さの余裕は約755pxしかない。要素6段を積むので gap は詰める
            // （6*SCALE だと最下段のチップが字幕帯に潜った）
            gap: 4 * SCALE,
          }}
        >
          <span
            style={{
              fontSize: 12 * SCALE,
              fontWeight: 700,
              color: colors.textSecondary,
              ...whoAppear,
            }}
          >
            署名が示すのは「誰が」だけ
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4 * SCALE,
              ...termAppear,
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
              }}
            >
              時刻を証明する仕組み
            </span>
            <b style={{ fontSize: 24 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
              <span style={markerStyle}>タイムスタンプ</span>
            </b>
            <span style={{ fontSize: 11.5 * SCALE, fontWeight: 700, lineHeight: 1.4 }}>
              日本語では時刻認証
            </span>
          </div>
          <ProofLine text="その時刻に文書が存在した" atSec={segStart(SEG_TIME, 3)} />
          <ProofLine text="それ以降、変わっていない" atSec={segStart(SEG_TIME, 3) + 1.6} />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6 * SCALE,
              fontSize: 10.5 * SCALE,
              fontWeight: 800,
              color: colors.primary800,
              backgroundColor: colors.primary50,
              border: `${1.5 * SCALE}px solid ${colors.primary100}`,
              borderRadius: 999,
              padding: `${4 * SCALE}px ${12 * SCALE}px`,
              ...thirdAppear,
            }}
          >
            <Ms name="groups" size={15 * SCALE} />
            <span>証明するのは信頼できる第三者</span>
          </span>
        </div>
        <Img
          src={staticFile("images/ipa_sg/icon-clock.png")}
          style={{
            flex: 0.9,
            minWidth: 0,
            maxHeight: "100%",
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
// P8: メッセージ認証符号（MAC）— 左右対称の2者図（同じ共通鍵）
// ---------------------------------------------------------------------------

const MacParty: React.FC<{ icon: string; label: string; act: string; atSec: number }> = ({
  icon,
  label,
  act,
  atSec,
}) => {
  const party = usePop(atSec);
  return (
    <div
      style={{
        flex: "none",
        width: 104 * SCALE, // 「同じ鍵で計算し照合」が1行に収まる幅（折り返すと下段が字幕帯に潜る）
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4 * SCALE,
        ...party,
      }}
    >
      <span
        style={{
          width: 42 * SCALE,
          height: 42 * SCALE,
          borderRadius: 15 * SCALE,
          backgroundColor: colors.primary50,
          color: colors.primary600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ms name={icon} size={24 * SCALE} />
      </span>
      <b style={{ fontSize: 12 * SCALE, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</b>
      <Img
        src={staticFile("images/ipa_sg/icon-key.png")}
        style={{ width: 96, height: 96, objectFit: "contain", mixBlendMode: "multiply" }}
      />
      <span
        style={{
          fontSize: 10 * SCALE,
          fontWeight: 700,
          color: colors.textSecondary,
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {act}
      </span>
    </div>
  );
};

const MacScene: React.FC = () => {
  const termAppear = useAppear(0.3);
  const aliasAppear = useAppear(segStart(SEG_MAC, 1), { dy: 8 });
  const msgAppear = useAppear(segStart(SEG_MAC, 2), { dy: 0 });
  const footAppear = useAppear(segStart(SEG_MAC, 3), { dy: 10 });
  return (
    <SlideShell narration={SEG_MAC}>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4 * SCALE,
            ...termAppear,
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
            }}
          >
            共通鍵で作る改ざん検知
          </span>
          <b style={{ fontSize: 22 * SCALE, fontWeight: 800, lineHeight: 1.2 }}>
            <span style={markerStyle}>メッセージ認証符号</span>
            <span style={{ fontSize: 15 * SCALE, color: colors.textSecondary, ...aliasAppear }}>
              （MAC）
            </span>
          </b>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 * SCALE }}>
          <MacParty icon="person" label="送る側" act="共通鍵で符号を計算" atSec={0.6} />
          <div
            style={{
              flex: "none",
              width: 150 * SCALE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3 * SCALE,
              ...msgAppear,
            }}
          >
            <span
              style={{
                fontSize: 11.5 * SCALE,
                fontWeight: 800,
                color: colors.primary800,
                backgroundColor: colors.primary50,
                border: `${1.5 * SCALE}px solid ${colors.primary300}`,
                borderRadius: 999,
                padding: `${4 * SCALE}px ${12 * SCALE}px`,
                whiteSpace: "nowrap",
              }}
            >
              メッセージ ＋ 符号
            </span>
            <span style={{ fontSize: 24 * SCALE, lineHeight: 1, color: colors.primary300 }}>→</span>
          </div>
          <MacParty icon="group" label="受け取る側" act="同じ鍵で計算し照合" atSec={0.9} />
        </div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7 * SCALE,
            fontSize: 12.5 * SCALE,
            fontWeight: 800,
            ...footAppear,
          }}
        >
          <Ms name="task_alt" size={17 * SCALE} />
          <span>
            値が合えば<span style={markerStyle}>改ざんなし</span>と分かる
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

export const SgL17DigitalSignature: VideoSpec = {
  id: "sg-L17-digital-signature",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティマネジメント講座",
      title: "デジタル署名と\nメッセージ認証",
      keywords: ["署名鍵", "検証鍵", "MAC"],
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
      name: "proof",
      durationSec: 6,
      narration: SEG_PROOF,
      component: ProofScene,
    },
    {
      pattern: "custom",
      name: "key-direction",
      durationSec: 6,
      narration: SEG_KEYS,
      component: KeyDirectionScene,
    },
    {
      pattern: "custom",
      name: "make-signature",
      durationSec: 6,
      narration: SEG_MAKE,
      component: MakeSignatureScene,
    },
    {
      pattern: "custom",
      name: "verify",
      durationSec: 5,
      narration: SEG_VERIFY,
      component: VerifyScene,
    },
    {
      pattern: "custom",
      name: "timestamp",
      durationSec: 6,
      narration: SEG_TIME,
      component: TimestampScene,
      transitionIn: "wipe-light",
    },
    {
      pattern: "custom",
      name: "mac",
      durationSec: 6,
      narration: SEG_MAC,
      component: MacScene,
    },
    {
      pattern: "vs",
      heading: "デジタル署名とMACの違い",
      icon: "compare_arrows",
      left: {
        title: "デジタル署名",
        icon: "verified_user",
        rows: [
          { k: "使う鍵", v: "公開鍵と秘密鍵のペア" },
          { k: "第三者への証明", v: "できる" },
          { k: "否認防止", v: "できる" },
        ],
      },
      right: {
        title: "メッセージ認証符号",
        icon: "key",
        rows: [
          { k: "使う鍵", v: "二者で共有する共通鍵" },
          { k: "第三者への証明", v: "できない" },
          { k: "否認防止", v: "できない" },
        ],
      },
      columnAtSec: [segStart(SEG_DIFF, 1), segStart(SEG_DIFF, 2)],
      narration: SEG_DIFF,
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
      question: "デジタル署名を作るときに使う鍵は？",
      choices: [
        { key: "A", text: "相手の公開鍵" },
        { key: "B", text: "自分の秘密鍵＝署名鍵", correct: true },
      ],
      narration: SEG_Q1,
      revealAtSec: segStart(SEG_Q1, 2),
    },
    {
      pattern: "quiz",
      question: "デジタル署名で確認できることは？",
      choices: [
        { key: "A", text: "本人が作成・改ざんなし", correct: true },
        { key: "B", text: "作成された時刻の正しさ" },
      ],
      narration: SEG_Q2,
      revealAtSec: segStart(SEG_Q2, 2),
    },
    {
      pattern: "quiz",
      question: "タイムスタンプが証明することは？",
      choices: [
        { key: "A", text: "署名した人の身元" },
        { key: "B", text: "その時刻に存在したこと", correct: true },
      ],
      narration: SEG_Q3,
      revealAtSec: segStart(SEG_Q3, 2),
    },
    {
      pattern: "summary",
      points: [
        {
          // 画面は1行29文字が上限（超えると3行分がテロップ帯に重なる）
          text: "署名は「本人が作成」と「改ざんなし」を証明します。",
          checkAtSec: segStart(SEG_SUM, 0),
        },
        {
          text: "秘密鍵で署名し、公開の検証鍵で誰でも検証できます。",
          checkAtSec: segStart(SEG_SUM, 1),
        },
        {
          text: "時刻はタイムスタンプ、共通鍵での検知はMACです。",
          checkAtSec: segStart(SEG_SUM, 2),
        },
      ],
      narration: SEG_SUM,
      transitionIn: "wipe",
    },
  ],
};
