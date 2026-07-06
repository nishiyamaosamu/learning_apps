import type { VideoSpec } from "../types";

/**
 * ITパスポート講座: 固定費・変動費と損益分岐点
 */
export const bepFixedVariableCost: VideoSpec = {
  id: "bep-fixed-variable-cost",
  scenes: [
    {
      pattern: "title",
      series: "ITパスポート講座",
      title: "固定費・変動費と\n損益分岐点",
      keywords: ["固定費", "変動費", "損益分岐点"],
    },
    {
      pattern: "term",
      icon: "calculate",
      term: "損益分岐点",
      sub: "利益がちょうどゼロになる売上高のこと",
      telop: "今日はこの売上高の求め方を学びます",
    },
    {
      pattern: "vs",
      durationSec: 8,
      heading: "固定費と変動費の違い",
      icon: "balance",
      left: {
        title: "固定費",
        icon: "account_balance",
        rows: [
          { k: "動き", v: "売上に関係なく一定" },
          { k: "例", v: "家賃・人件費" },
          { k: "グラフ", v: "横に一定" },
        ],
      },
      right: {
        title: "変動費",
        icon: "trending_up",
        rows: [
          { k: "動き", v: "売上に比例して増減" },
          { k: "例", v: "材料費・仕入れ" },
          { k: "グラフ", v: "右肩上がり" },
        ],
      },
      telop: "売上が変わっても動かないのが固定費です",
    },
    {
      pattern: "bullets",
      durationSec: 7,
      heading: "費用と利益の関係",
      icon: "functions",
      bullets: [
        { text: "総費用", sub: "固定費+変動費の合計", marker: "blue" },
        { text: "変動費率", sub: "売上に対する変動費の割合" },
        { text: "利益", sub: "売上ー総費用", marker: "pink" },
      ],
      telop: "費用と利益の関係を式でとらえます",
    },
    {
      pattern: "flow",
      durationSec: 7,
      heading: "損益分岐点の求め方",
      steps: [
        { abc: "1", name: "分類", sub: "固定費と変動費" },
        { abc: "2", name: "算出", sub: "変動費率" },
        { abc: "3", name: "計算", sub: "公式に当てはめ" },
      ],
      telop: "この3ステップで売上高が求まります",
    },
    {
      pattern: "bullets",
      durationSec: 7,
      heading: "数値で確認しよう",
      icon: "numbers",
      bullets: [
        { text: "固定費100万円", sub: "毎月一定でかかる", marker: "blue" },
        { text: "変動費率60%", sub: "売上に対する割合" },
        { text: "分岐点250万円", sub: "100万円÷(1-0.6)", marker: "pink" },
      ],
      telop: "数字を当てはめると分岐点が求まります",
    },
    {
      pattern: "graph",
      durationSec: 9,
      heading: "損益分岐点をグラフで見る",
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
      telop: "売上と費用が交わる点が損益分岐点です",
    },
    {
      pattern: "bullets",
      durationSec: 7,
      heading: "今日のポイント",
      icon: "checklist",
      bullets: [
        { text: "固定費は一定", sub: "売上に関係ない", marker: "blue" },
        { text: "変動費は比例", sub: "売上とともに増減" },
        { text: "損益分岐点で黒字化", sub: "超えると利益が出る", marker: "pink" },
      ],
      telop: "この3つを押さえれば計算できます",
    },
    {
      pattern: "quiz",
      question: "損益分岐点の意味は？",
      choices: [
        { key: "A", text: "利益がゼロになる売上高", correct: true },
        { key: "B", text: "変動費がゼロになる売上高" },
      ],
    },
  ],
};
