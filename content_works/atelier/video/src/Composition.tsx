import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { videoType, SCALE } from "./design/tokens";
import { Ms } from "./parts/Ms";
import { TitleCard } from "./scenes/TitleCard";
import { BulletSlide } from "./scenes/BulletSlide";
import { VsSlide } from "./scenes/VsSlide";
import { FlowSlide } from "./scenes/FlowSlide";
import { MatrixSlide } from "./scenes/MatrixSlide";
import { LayersSlide } from "./scenes/LayersSlide";
import { GraphSlide, PinkMarker } from "./scenes/GraphSlide";
import { TermSlide } from "./scenes/TermSlide";
import { BinarySlide } from "./scenes/BinarySlide";
import { QuizSlide } from "./scenes/QuizSlide";

const headIcon = videoType.slideHeadIcon;
const noteIcon = 11 * SCALE; // 階層図の補足ラベル用
const cellIcon = 14 * SCALE; // マトリクスセル用

/** DESIGN.html の全スライドパターンを1本にまとめたデモ */
const SCENES: { durationSec: number; element: React.ReactNode }[] = [
  {
    durationSec: 3.5,
    element: (
      <TitleCard
        series="情報セキュリティ講座"
        title={"パスワードの使い回しが\n危ないほんとうの理由"}
        keywords={["リスト型攻撃", "総当たり攻撃", "二要素認証"]}
      />
    ),
  },
  {
    durationSec: 6,
    element: (
      <BulletSlide
        heading="パスワード攻撃の主な手口"
        icon={<Ms name="gpp_maybe" size={headIcon} />}
        bullets={[
          { text: "リスト型攻撃", sub: "流出したID・パスワードを流用", marker: "blue" },
          { text: "総当たり攻撃", sub: "あらゆる組み合わせを機械的に試行", marker: "blue" },
          { text: "推測による攻撃", sub: "誕生日・名前などから推測" },
        ]}
        telop="使い回したパスワードは、1か所の流出が全部に広がります"
        illust="images/attack-password.png"
      />
    ),
  },
  {
    durationSec: 6.5,
    element: (
      <VsSlide
        heading="共通鍵暗号と公開鍵暗号"
        icon={<Ms name="encrypted" size={headIcon} />}
        left={{
          title: "共通鍵暗号方式",
          icon: <Ms name="key" size={14 * SCALE} />,
          rows: [
            { k: "使う鍵", v: "同じ鍵を2人で共有" },
            { k: "処理速度", v: "速い" },
            { k: "弱点", v: "鍵の受け渡しが難しい" },
          ],
        }}
        right={{
          title: "公開鍵暗号方式",
          icon: <Ms name="public" size={14 * SCALE} />,
          rows: [
            { k: "使う鍵", v: "公開鍵 + 秘密鍵のペア" },
            { k: "処理速度", v: "遅い" },
            { k: "強み", v: "鍵を安全に配れる" },
          ],
        }}
        telop="いちばんの違いは「鍵の扱い方」です"
      />
    ),
  },
  {
    durationSec: 7,
    element: (
      // 見出しはブルータブ型（icon を渡さない）
      <FlowSlide
        heading="PDCAサイクル"
        steps={[
          { abc: "P", name: "計画", sub: "Plan" },
          { abc: "D", name: "実行", sub: "Do" },
          { abc: "C", name: "評価", sub: "Check" },
          { abc: "A", name: "改善", sub: "Act" },
        ]}
        telop="いま話している段階を、色で強調します"
      />
    ),
  },
  {
    durationSec: 6.5,
    element: (
      <MatrixSlide
        heading="SWOT分析の4象限"
        colLabels={["プラス要因", "マイナス要因"]}
        rowLabels={["内部", "外部"]}
        cells={[
          {
            abc: "S",
            name: "強み",
            icon: <Ms name="thumb_up" size={cellIcon} />,
            desc: "技術力・ブランド",
            tone: "hi",
            highlightAtSec: 2.4,
          },
          { abc: "W", name: "弱み", icon: <Ms name="thumb_down" size={cellIcon} />, desc: "人材不足・コスト" },
          {
            abc: "O",
            name: "機会",
            icon: <Ms name="trending_up" size={cellIcon} />,
            desc: "市場の拡大・規制緩和",
            tone: "lo",
            highlightAtSec: 3.1,
          },
          { abc: "T", name: "脅威", icon: <Ms name="warning" size={cellIcon} />, desc: "競合参入・景気後退" },
        ]}
        telop="内部か外部か、プラスかマイナスかで整理します"
      />
    ),
  },
  {
    durationSec: 7,
    element: (
      <LayersSlide
        heading="OSI基本参照モデル（7階層）"
        icon={<Ms name="stacks" size={headIcon} />}
        layers={[
          { no: 7, name: "アプリケーション層", note: "HTTP・SMTP", noteIcon: <Ms name="language" size={noteIcon} /> },
          { no: 6, name: "プレゼンテーション層" },
          { no: 5, name: "セッション層" },
          { no: 4, name: "トランスポート層", note: "TCP" },
          {
            no: 3,
            name: "ネットワーク層",
            note: "IPはここ",
            noteIcon: <Ms name="router" size={noteIcon} />,
            highlightAtSec: 2.8,
          },
          { no: 2, name: "データリンク層" },
          { no: 1, name: "物理層", note: "ケーブル・電波", noteIcon: <Ms name="cable" size={noteIcon} /> },
        ]}
        telop="下の層ほど、物理的な世界に近づきます"
      />
    ),
  },
  {
    durationSec: 7.5,
    element: (
      <GraphSlide
        heading="損益分岐点の考え方"
        icon={<Ms name="calculate" size={headIcon} />}
        formula={
          <>
            損益分岐点売上高
            <br />
            ＝ 固定費 ÷（1 − 変動費率）
          </>
        }
        note={
          <>
            <PinkMarker>交点より右が黒字、左が赤字</PinkMarker>
            。図と式をセットで覚えましょう。
          </>
        }
        telop="売上と費用が釣り合う点が、損益分岐点です"
      />
    ),
  },
  {
    durationSec: 4.5,
    element: (
      <TermSlide
        icon={<Ms name="dns" size={27 * SCALE} />}
        term="DNS"
        sub="Domain Name System — ドメイン名とIPアドレスを対応づけるしくみ"
        telop="電話帳のように、名前から住所を引けるしくみです"
      />
    ),
  },
  {
    durationSec: 7.5,
    element: (
      <BinarySlide
        heading="2進数「1101」を10進数に"
        icon={<Ms name="calculate" size={headIcon} />}
        digits={[
          { weightLabel: <>2<sup>3</sup>＝8</>, digit: "1", product: "8" },
          { weightLabel: <>2<sup>2</sup>＝4</>, digit: "1", product: "4" },
          { weightLabel: <>2<sup>1</sup>＝2</>, digit: "0", product: "0" },
          { weightLabel: <>2<sup>0</sup>＝1</>, digit: "1", product: "1" },
        ]}
        answer="13"
        telop="「1」が立つ桁の重みだけを、足し合わせます"
      />
    ),
  },
  {
    durationSec: 7.5,
    element: (
      <QuizSlide
        question="より安全なのはどっち？"
        choices={[
          { key: "A", text: "サービスごとに別のパスワード", correct: true },
          { key: "B", text: "複雑な1つを全部で使い回す" },
        ]}
      />
    ),
  },
];

export const TOTAL_DURATION_SEC = SCENES.reduce((acc, s) => acc + s.durationSec, 0);

export const MyComposition: React.FC = () => {
  const { fps } = useVideoConfig();
  let from = 0;

  return (
    <AbsoluteFill>
      {SCENES.map((scene, i) => {
        const start = from;
        from += Math.round(scene.durationSec * fps);
        return (
          <Sequence key={i} from={start} durationInFrames={Math.round(scene.durationSec * fps)}>
            {scene.element}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
