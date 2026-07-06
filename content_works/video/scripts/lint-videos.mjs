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

let violations = 0;
const targets = readdirSync(dir, { recursive: true })
  .map(String)
  .filter((f) => !INFRA.has(f) && (f.endsWith(".ts") || f.endsWith(".tsx")));
for (const f of targets) {
  const lines = readFileSync(join(dir, f), "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*)/.test(line)) return; // コメント行は除外
    for (const rule of RULES) {
      if (rule.re.test(line)) {
        console.error(`src/videos/${f}:${i + 1}: ${rule.msg}\n    ${line.trim()}`);
        violations++;
      }
    }
  });
}

if (violations > 0) {
  console.error(`\n${violations} 件の違反。修正してから再実行してください。`);
  process.exit(1);
}
console.log("lint OK");
