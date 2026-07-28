#!/usr/bin/env node
/**
 * src/videos/index.ts を、src/videos/<app>/ 配下の動画定義から自動生成する。
 *
 *   node scripts/sync-index.mjs           # 生成（変更があれば書き込む）
 *   node scripts/sync-index.mjs --check   # 生成結果と差分があれば exit 1（書き込まない）
 *
 * index.ts を手で編集させないための道具。動画を1本ずつ別々に作るとき、
 * 唯一の共有ファイルである index.ts が編集の衝突点になるので、
 * 「各自は <app>/<id>.tsx を置くだけ、登録はこのスクリプトが後からまとめてやる」形にする。
 *
 * 対象は src/videos/<dir>/*.ts(x) のうち `export const <名前>: VideoSpec` を持つファイル。
 * 併せて命名規約も検査する（アプリ配下は id ＝ ファイル名、id はアプリ接頭辞つきで全体一意）。
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src/videos");
const OUT = join(dir, "index.ts");

// ディレクトリ名 → 動画IDの接頭辞（demo は手本置き場なので規約の対象外）
const APP_PREFIX = { ipa_ip: "ip-", ipa_sg: "sg-" };
// demo（手本・確認用）を先に、本番アプリをその後ろに並べる
const dirRank = (d) => (d === "demo" ? 0 : 1);
const natural = (a, b) => a.localeCompare(b, "en", { numeric: true });

const errors = [];
const entries = [];

const dirs = readdirSync(dir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort((a, b) => dirRank(a) - dirRank(b) || natural(a, b));

for (const d of dirs) {
  const files = readdirSync(join(dir, d))
    .filter((f) => (f.endsWith(".ts") || f.endsWith(".tsx")) && !f.endsWith(".d.ts"))
    .sort(natural);

  for (const f of files) {
    const rel = `${d}/${f}`;
    const src = readFileSync(join(dir, d, f), "utf8");

    // 動画定義の書き方は3形式ある。どれで書かれても拾う
    //   export const X: VideoSpec = { ... }
    //   export const X = { ... } satisfies VideoSpec
    //   export const X = { ... } as VideoSpec
    const found = [...src.matchAll(/^export const (\w+)\s*:\s*VideoSpec\b/gm)].map((m) => ({
      name: m[1],
      at: m.index,
    }));
    for (const m of src.matchAll(/\b(?:satisfies|as) VideoSpec\b/g)) {
      // その手前で最後に現れる `export const <名前> =` がその定義
      const decl = [...src.slice(0, m.index).matchAll(/^export const (\w+)\s*=/gm)].pop();
      if (decl) found.push({ name: decl[1], at: decl.index });
    }
    const specs = [...new Map(found.map((f) => [f.name, f])).values()];

    if (specs.length === 0) {
      // VideoSpec を値として書いているように見えるのに拾えないファイルは、黙って無登録にすると
      // 「lint も tsc も通るのに動画が存在しない」状態になり、原因が工程7まで分からない
      const mentions = (src.match(/\bVideoSpec\b/g) ?? []).length;
      const inImports = (src.match(/^import[^\n]*\bVideoSpec\b/gm) ?? []).length;
      if (mentions > inImports) {
        errors.push(
          `${rel}: VideoSpec の export を検出できません（\`export const <名前>: VideoSpec = {\` の形で書く）。` +
            `動画ではなく部品なら src/parts/ に置く`,
        );
      }
      continue;
    }
    if (specs.length > 1) {
      errors.push(
        `${rel}: 1ファイルに VideoSpec が複数あります（${specs.map((s) => s.name).join(", ")}）。1ファイル1動画にする`,
      );
      continue;
    }
    const { name: exportName, at } = specs[0];

    // id は VideoSpec の宣言より後ろから探す（手前にあるデータ定数の id: を拾わないため）
    const idMatch = src.slice(at).match(/^\s*id:\s*"([^"]+)"/m);
    if (!idMatch) {
      errors.push(`${rel}: VideoSpec の id が読み取れません（id: "..." の形で書く）`);
      continue;
    }
    const id = idMatch[1];

    const base = f.replace(/\.tsx?$/, "");
    const prefix = APP_PREFIX[d];
    if (prefix) {
      if (id !== base) {
        errors.push(`${rel}: id "${id}" とファイル名 "${base}" が一致しません（同じにする）`);
      }
      if (!id.startsWith(prefix)) {
        errors.push(`${rel}: id "${id}" は "${prefix}" で始める必要があります（${d} の動画）`);
      }
    }

    entries.push({ rel, importPath: `./${d}/${base}`, exportName, id });
  }
}

for (const key of ["id", "exportName"]) {
  const seen = new Map();
  for (const e of entries) {
    const prev = seen.get(e[key]);
    if (prev) {
      const what = key === "id" ? "動画ID" : "export 名";
      errors.push(`${what} "${e[key]}" が重複しています（${prev.rel} と ${e.rel}）`);
    } else {
      seen.set(e[key], e);
    }
  }
}

if (errors.length > 0) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\n${errors.length}件の問題があります。index.ts は更新していません`);
  process.exit(1);
}

const generated = `// このファイルは scripts/sync-index.mjs が生成する。直接編集しない。
// 動画を追加・削除したら \`node scripts/sync-index.mjs\` を実行して再生成すること。
//
// 登録対象は src/videos/<app>/<id>.tsx の \`export const <名前>: VideoSpec\`。
// - 本番動画: <app> はアプリ名ディレクトリ、id はアプリ接頭辞つきでファイル名と同じ
//   （例: ipa_ip/ip-L1v9-…, ipa_sg/sg-L1-…）
// - 手本・確認用デモ: src/videos/demo/ 配下
// レンダリング: npx remotion render <id> draft/<app>/<出力名>.mp4（draft/ は git 対象外）
import type { VideoSpec } from "./types";
${entries.map((e) => `import { ${e.exportName} } from "${e.importPath}";`).join("\n")}

export const videos: VideoSpec[] = [
${entries.map((e) => `  ${e.exportName},`).join("\n")}
];
`;

const current = readFileSync(OUT, "utf8");
const isCheck = process.argv.includes("--check");

if (current === generated) {
  console.log(`index.ts は最新です（動画 ${entries.length} 本）`);
  process.exit(0);
}

if (isCheck) {
  console.error("index.ts が動画定義と一致していません。`node scripts/sync-index.mjs` を実行してください");
  process.exit(1);
}

writeFileSync(OUT, generated);
console.log(`index.ts を更新しました（動画 ${entries.length} 本）`);
for (const e of entries) console.log(`  ${e.id}`);
