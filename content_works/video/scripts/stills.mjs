#!/usr/bin/env node
/**
 * 動画の全シーンを1枚ずつ静止画に書き出す確認ツール。
 *
 *   node scripts/stills.mjs <videoId> [--scale=0.5]
 *
 * 各シーンの「アニメーション完了後」（終了0.5秒前）のフレームを
 * stills/<videoId>/scene-<NN>-<pattern>.png に出力する。
 * 動画を作ったら必ずこれを実行し、全画像を目視確認すること。
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FPS = 30;

const [videoId, ...rest] = process.argv.slice(2);
if (!videoId) {
  console.error("usage: node scripts/stills.mjs <videoId> [--scale=0.5]");
  process.exit(1);
}
const scaleArg = rest.find((a) => a.startsWith("--scale=")) ?? "--scale=0.5";

// カスタムシーンが import する @remotion/fonts の loadFont はブラウザAPI（FontFace）を
// module top-level で呼ぶため、Node 用に無害なスタブを先に生やしておく
// （ここではメタ情報しか読まず、フォントは実際には使わない）
globalThis.FontFace ??= class {
  load() {
    return Promise.resolve(this);
  }
};
globalThis.document ??= {};
globalThis.document.fonts ??= { add() {}, delete() {} };

// videos/index.ts を esbuild でバンドルして読む（コンポーネントは実行しない）
const esbuild = await import(pathToFileURL(join(root, "node_modules/esbuild/lib/main.js")));
const outfile = join(tmpdir(), `videos-bundle-${Date.now()}.mjs`);
await esbuild.build({
  entryPoints: [join(root, "src/videos/_manifest.ts")],
  bundle: true,
  format: "esm",
  outfile,
  logLevel: "silent",
  jsx: "automatic",
  // カスタムシーン（.tsx / react / remotion import）を含んでもバンドルできるようにする。
  // コンポーネントは呼ばず durationSec 等のメタだけ読むので実行時依存はない。
  external: [],
});
const { videos, sceneDurationSec } = await import(pathToFileURL(outfile));
rmSync(outfile, { force: true });

const spec = videos.find((v) => v.id === videoId);
if (!spec) {
  console.error(
    `videoId "${videoId}" が見つかりません。登録済み: ${videos.map((v) => v.id).join(", ")}`,
  );
  process.exit(1);
}

const outDir = join(root, "stills", videoId);
mkdirSync(outDir, { recursive: true });

let from = 0;
const rows = [];
for (let i = 0; i < spec.scenes.length; i++) {
  const scene = spec.scenes[i];
  const dur = Math.round(sceneDurationSec(scene) * FPS);
  // アニメーション完了後 = シーン終了の0.5秒前
  const frame = from + dur - Math.round(0.5 * FPS);
  const label = scene.pattern === "custom" ? `custom-${scene.name}` : scene.pattern;
  const name = `scene-${String(i + 1).padStart(2, "0")}-${label}.png`;
  execFileSync(
    "npx",
    ["remotion", "still", videoId, join(outDir, name), `--frame=${frame}`, scaleArg],
    { cwd: root, stdio: ["ignore", "ignore", "inherit"] },
  );
  rows.push({ scene: i + 1, pattern: scene.pattern, sec: (dur / FPS).toFixed(1), file: name });
  from += dur;
}

console.log(`\n出力先: stills/${videoId}/`);
console.table(rows);
console.log(`合計: ${(from / FPS).toFixed(1)}秒`);
