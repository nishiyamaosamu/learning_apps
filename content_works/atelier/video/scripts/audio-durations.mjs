#!/usr/bin/env node
/**
 * ナレーション音声（public/audio/<videoId>/*.mp3）の実測秒数を ffprobe で採り、
 * src/videos/<videoId>.audio.json に書き出す。
 *
 *   node scripts/audio-durations.mjs <videoId>
 *
 * 動画側は narrationLoader(durations, "audio/<videoId>") でこの JSON を読む。
 * 音声を生成・再生成したら必ず実行し直すこと（秒数が字幕同期とシーン尺の根拠になる）。
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const videoId = process.argv[2];
if (!videoId) {
  console.error("usage: node scripts/audio-durations.mjs <videoId>");
  process.exit(1);
}

const dir = join(root, "public", "audio", videoId);
if (!existsSync(dir)) {
  console.error(`public/audio/${videoId}/ がありません。先に tts.py で音声を生成してください`);
  process.exit(1);
}
const files = readdirSync(dir)
  .filter((f) => f.endsWith(".mp3"))
  .sort();
if (files.length === 0) {
  console.error(`public/audio/${videoId}/ に mp3 がありません`);
  process.exit(1);
}

const out = {};
let total = 0;
for (const f of files) {
  const sec = parseFloat(
    execFileSync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      join(dir, f),
    ]).toString(),
  );
  out[f] = Math.round(sec * 1000) / 1000;
  total += sec;
}

const outPath = join(root, "src", "videos", `${videoId}.audio.json`);
writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");

console.log(`src/videos/${videoId}.audio.json に ${files.length} ファイル分を書き出しました`);
console.log(`ナレーション合計: ${total.toFixed(1)}秒（${Math.floor(total / 60)}分${Math.round(total % 60)}秒）`);

// 動画尺 ≈ ナレーション合計 + シーン数 × テール(0.9s) + タイトル等の余白。上限は 5:59 = 359 秒
if (total > 330) {
  console.warn(
    `⚠ ナレーション合計が ${total.toFixed(0)} 秒あります。テール込みで動画が 5:59(359秒) を超える恐れが高いので、原稿を削って該当ファイルだけ再生成してください`,
  );
} else if (total > 300) {
  console.warn("△ 5分超えが近い水準です。最終レンダリング後に必ず尺を確認してください");
}
