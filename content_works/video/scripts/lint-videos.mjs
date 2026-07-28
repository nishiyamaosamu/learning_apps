#!/usr/bin/env node
/**
 * 動画定義ファイルのデザインガードレール lint。
 *
 *   node scripts/lint-videos.mjs
 *
 * src/videos/ 配下（アプリ別サブディレクトリ含む）の動画定義（infra ファイルを除く）を検査し、
 * デザインシステム違反を検出したら一覧を出して exit 1。
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src/videos");
const INFRA = new Set(["types.ts", "duration.ts", "renderScene.tsx", "_manifest.ts", "index.ts"]);

const RULES = [
  {
    re: /#[0-9a-fA-F]{3,8}\b/,
    msg: "色のハードコード禁止 — design/tokens.ts の colors から引く",
  },
  {
    re: /\b(animation|transition)\s*:/,
    msg: "CSS animation/transition 禁止 — useCurrentFrame/interpolate 系（parts/animate.ts）を使う",
  },
  { re: /@keyframes/, msg: "CSS @keyframes 禁止（レンダリングが壊れる）" },
  {
    re: /fontFamily\s*:\s*["'`]/,
    msg: "フォントの直接指定禁止 — tokens の fontFamily / fontMono を使う",
  },
  {
    re: /\b(Math\.random|Date\.now)\s*\(/,
    msg: "非決定的な値は禁止（フレームごとに変わりレンダリングが壊れる）",
  },
  { re: /<img[\s>]/, msg: "<img> ではなく remotion の <Img> を使う" },
  {
    re: /\bstyle=\{\{[^}]*position:\s*["']fixed/,
    msg: "position:fixed 禁止 — AbsoluteFill / absolute を使う",
  },
];

/**
 * quiz の choices ブロックを拾い、正解（correct: true）が何番目かを返す。
 * 戻り値: [{ line, index, count }]（line は choices: [ の行番号・1始まり）
 */
function quizAnswerPositions(src) {
  const found = [];
  const re = /choices\s*:\s*\[/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    let depth = 0;
    let end = -1;
    for (let i = m.index + m[0].length - 1; i < src.length; i++) {
      const ch = src[i];
      if (ch === "[") depth++;
      else if (ch === "]") {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end < 0) continue;
    const body = src.slice(m.index + m[0].length, end);
    const items = body.match(/\{[^{}]*\}/g) ?? [];
    const index = items.findIndex((it) => /correct\s*:\s*true/.test(it));
    if (items.length === 0 || index < 0) continue;
    found.push({
      line: src.slice(0, m.index).split("\n").length,
      index,
      count: items.length,
    });
  }
  return found;
}

let violations = 0;
const targets = readdirSync(dir, { recursive: true })
  .map(String)
  .filter((f) => !INFRA.has(f) && (f.endsWith(".ts") || f.endsWith(".tsx")));
for (const f of targets) {
  const src = readFileSync(join(dir, f), "utf8");
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*)/.test(line)) return; // コメント行は除外
    for (const rule of RULES) {
      if (rule.re.test(line)) {
        console.error(`src/videos/${f}:${i + 1}: ${rule.msg}\n    ${line.trim()}`);
        violations++;
      }
    }
  });

  // 正解の位置が全問同じ（＝実質「いつもA」）になっていないか
  const quizzes = quizAnswerPositions(src);
  if (quizzes.length >= 2 && new Set(quizzes.map((q) => q.index)).size === 1) {
    const key = ["A", "B", "C", "D"][quizzes[0].index] ?? `${quizzes[0].index + 1}番目`;
    console.error(
      `src/videos/${f}:${quizzes[0].line}: quiz の正解が全問「${key}」— 正解位置は問ごとに散らす（references/patterns.md「quiz」）\n` +
        `    ${quizzes.length}問すべて ${key} が correct: true。選択肢の text を入れ替えて A/B を両方使う`,
    );
    violations++;
  }
}

if (violations > 0) {
  console.error(`\n${violations} 件の違反。修正してから再実行してください。`);
  process.exit(1);
}
console.log("lint OK");
