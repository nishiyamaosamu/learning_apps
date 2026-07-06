import { colors, SCALE } from "../../design/tokens";
import { SlideShell } from "../../parts/SlideShell";
import { useAppear, useProgress } from "../../parts/animate";
import type { VideoSpec } from "../types";

/**
 * カスタムシーンの実例: 数字ドン（カウントアップ）。
 * 既製パターンに無い「あるべき姿」を、SlideShell + tokens + animate だけで組む見本。
 * 数値は見本用のダミー。
 */
const StatScene: React.FC = () => {
  const count = useProgress(0.4, 1.4); // 0→1 をカウントアップに使う
  const captionAppear = useAppear(0.2);
  const noteAppear = useAppear(1.9);

  return (
    <SlideShell telop="まず「自分ごと」だと気づくことが第一歩です">
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
          パスワードを使い回している人の割合
        </span>
        <span style={{ display: "flex", alignItems: "baseline", gap: 2 * SCALE }}>
          <span
            style={{
              fontSize: 56 * SCALE,
              fontWeight: 800,
              lineHeight: 1,
              color: colors.primary600,
              fontVariantNumeric: "tabular-nums", // カウント中に幅が揺れないように
            }}
          >
            {Math.round(70 * count)}
          </span>
          <span style={{ fontSize: 20 * SCALE, fontWeight: 800, color: colors.primary600 }}>%</span>
        </span>
        <span style={{ fontSize: 9.5 * SCALE, color: colors.textMuted, ...noteAppear }}>
          ※ 見本用のダミー数値です
        </span>
      </div>
    </SlideShell>
  );
};

/**
 * DESIGN.html の全スライドパターンを1本にまとめたデモ（パターンのショーケース）。
 * 新しい動画を作るときの記述例としても参照する。
 */
export const demo: VideoSpec = {
  id: "Demo",
  scenes: [
    {
      pattern: "title",
      series: "情報セキュリティ講座",
      title: "パスワードの使い回しが\n危ないほんとうの理由",
      keywords: ["リスト型攻撃", "総当たり攻撃", "二要素認証"],
    },
    {
      pattern: "bullets",
      durationSec: 6,
      heading: "パスワード攻撃の主な手口",
      icon: "gpp_maybe",
      bullets: [
        { text: "リスト型攻撃", sub: "流出したID・パスワードを流用", marker: "blue" },
        { text: "総当たり攻撃", sub: "あらゆる組み合わせを機械的に試行", marker: "blue" },
        { text: "推測による攻撃", sub: "誕生日・名前などから推測" },
      ],
      telop: "使い回したパスワードは、1か所の流出が全部に広がります",
      illust: "images/attack-password.png",
    },
    {
      pattern: "custom",
      name: "stat-countup",
      durationSec: 4.5,
      component: StatScene,
    },
    {
      pattern: "vs",
      heading: "共通鍵暗号と公開鍵暗号",
      icon: "encrypted",
      left: {
        title: "共通鍵暗号方式",
        icon: "key",
        rows: [
          { k: "使う鍵", v: "同じ鍵を2人で共有" },
          { k: "処理速度", v: "速い" },
          { k: "弱点", v: "鍵の受け渡しが難しい" },
        ],
      },
      right: {
        title: "公開鍵暗号方式",
        icon: "public",
        rows: [
          { k: "使う鍵", v: "公開鍵 + 秘密鍵のペア" },
          { k: "処理速度", v: "遅い" },
          { k: "強み", v: "鍵を安全に配れる" },
        ],
      },
      telop: "いちばんの違いは「鍵の扱い方」です",
    },
    {
      pattern: "flow",
      heading: "PDCAサイクル",
      steps: [
        { abc: "P", name: "計画", sub: "Plan" },
        { abc: "D", name: "実行", sub: "Do" },
        { abc: "C", name: "評価", sub: "Check" },
        { abc: "A", name: "改善", sub: "Act" },
      ],
      telop: "いま話している段階を、色で強調します",
    },
    {
      pattern: "matrix",
      heading: "SWOT分析の4象限",
      colLabels: ["プラス要因", "マイナス要因"],
      rowLabels: ["内部", "外部"],
      cells: [
        { abc: "S", name: "強み", icon: "thumb_up", desc: "技術力・ブランド", tone: "hi" },
        { abc: "W", name: "弱み", icon: "thumb_down", desc: "人材不足・コスト" },
        { abc: "O", name: "機会", icon: "trending_up", desc: "市場の拡大・規制緩和", tone: "lo" },
        { abc: "T", name: "脅威", icon: "warning", desc: "競合参入・景気後退" },
      ],
      telop: "内部か外部か、プラスかマイナスかで整理します",
    },
    {
      pattern: "layers",
      heading: "OSI基本参照モデル（7階層）",
      icon: "stacks",
      layers: [
        { no: 7, name: "アプリケーション層", note: "HTTP・SMTP", noteIcon: "language" },
        { no: 6, name: "プレゼンテーション層" },
        { no: 5, name: "セッション層" },
        { no: 4, name: "トランスポート層", note: "TCP" },
        { no: 3, name: "ネットワーク層", note: "IPはここ", noteIcon: "router", highlight: true },
        { no: 2, name: "データリンク層" },
        { no: 1, name: "物理層", note: "ケーブル・電波", noteIcon: "cable" },
      ],
      telop: "下の層ほど、物理的な世界に近づきます",
    },
    {
      pattern: "graph",
      heading: "損益分岐点の考え方",
      icon: "calculate",
      lines: [
        { x1: 18, y1: 96, x2: 208, y2: 96, role: "guide", label: "固定費", labelX: 24, labelY: 90 },
        { x1: 18, y1: 96, x2: 205, y2: 56, role: "sub", label: "総費用", labelX: 172, labelY: 50 },
        { x1: 18, y1: 138, x2: 205, y2: 18, role: "main", label: "売上高", labelX: 170, labelY: 14 },
      ],
      point: { x: 112, y: 78, label: "損益分岐点", labelX: 86, labelY: 66 },
      formula: "損益分岐点売上高\n＝ 固定費 ÷（1 − 変動費率）",
      noteHighlight: "交点より右が黒字、左が赤字",
      noteRest: "。図と式をセットで覚えましょう。",
      telop: "売上と費用が釣り合う点が、損益分岐点です",
    },
    {
      pattern: "term",
      icon: "dns",
      term: "DNS",
      sub: "Domain Name System — ドメイン名とIPアドレスを対応づけるしくみ",
      telop: "電話帳のように、名前から住所を引けるしくみです",
    },
    {
      pattern: "binary",
      heading: "2進数「1101」を10進数に",
      icon: "calculate",
      digits: [
        { weight: "2³＝8", digit: "1", product: "8" },
        { weight: "2²＝4", digit: "1", product: "4" },
        { weight: "2¹＝2", digit: "0", product: "0" },
        { weight: "2⁰＝1", digit: "1", product: "1" },
      ],
      answer: "13",
      telop: "「1」が立つ桁の重みだけを、足し合わせます",
    },
    {
      pattern: "quiz",
      question: "より安全なのはどっち？",
      choices: [
        { key: "A", text: "サービスごとに別のパスワード", correct: true },
        { key: "B", text: "複雑な1つを全部で使い回す" },
      ],
    },
  ],
};
