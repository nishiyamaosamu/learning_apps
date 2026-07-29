#!/usr/bin/env node
/**
 * 人のレビューが通った動画（QUEUE.md が 👀 review）を、draft から
 * アプリの完成品置き場（apps/<app>/contents/videos/）へ公開する。
 *
 *   node scripts/publish.mjs sg-L1          # 1本
 *   node scripts/publish.mjs sg-L1 sg-L2    # まとめて
 *   node scripts/publish.mjs sg-L4 --force  # すでに ✅ done の行をやり直す
 *
 * 引数は `<接頭辞>-L<番号>`（`sg-L1`）か QUEUE.md の動画ID そのまま
 * （`sg-L1-what-is-infosec`）。何度実行しても結果は同じ（冪等）。
 *
 * この1コマンドで次の3つが揃う。手でどれかを忘れると一覧に出ない／再生できない。
 *   1. draft/<app>/<成果物>.mp4 → apps/<app>/contents/videos/<L番号>.mp4 にコピー
 *      （draft は残す。gitignore 対象で再レンダリングもできるが、消す理由がない）
 *   2. apps/<app>/contents/base.json の `videos` に章ごと登録（尺は ffprobe の実測）
 *   3. QUEUE.md の行を ✅ done にし、尺（mm:ss）を埋める
 *
 * アプリ側の動画ID = L番号（`L1`）。視聴進捗のキーなので後から変えない。
 * 章（VideoChapter）は QUEUE.md の `### 第N章 タイトル` 見出しから採る。
 * 見出しが無いアプリ（ipa_ip）は --chapter <id>:<タイトル> で明示する。
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const videoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(videoRoot, "..", "..");
const queuePath = join(videoRoot, "QUEUE.md");

// ---------------------------------------------------------------------------
// 引数
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const force = argv.includes("--force");
const chapterArgIndex = argv.indexOf("--chapter");
let chapterOverride = null;
if (chapterArgIndex !== -1) {
  const raw = argv[chapterArgIndex + 1];
  const m = raw?.match(/^([^:]+):(.+)$/);
  if (!m) die("--chapter は <id>:<タイトル> の形で渡す（例 --chapter 1:'第1章 企業と法務'）");
  chapterOverride = { id: m[1], title: m[2] };
}
const chapterValueIndex = chapterArgIndex === -1 ? -1 : chapterArgIndex + 1;
const targets = argv.filter((a, i) => !a.startsWith("--") && i !== chapterValueIndex);
if (targets.length === 0) {
  console.error("usage: node scripts/publish.mjs <sg-L1 | 動画ID> [...] [--force] [--chapter <id>:<title>]");
  process.exit(1);
}

function die(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// QUEUE.md のパース（表の行 = 1本）
// ---------------------------------------------------------------------------

/** @returns {{lineIndex:number, app:string, chapter:{id:string,title:string}|null, lesson:number, cells:string[]}[]} */
function parseQueue(text) {
  const rows = [];
  let app = null;
  let chapter = null;
  text.split("\n").forEach((line, lineIndex) => {
    const appHeading = line.match(/^##\s+(ipa_\w+)/);
    if (appHeading) {
      app = appHeading[1];
      chapter = null;
      return;
    }
    const chapterHeading = line.match(/^###\s+(第(\d+)章\s+[^（(]+)/);
    if (chapterHeading) {
      chapter = { id: chapterHeading[2], title: chapterHeading[1].trim() };
      return;
    }
    if (!app || !line.startsWith("|")) return;
    // 先頭・末尾の | を落としてセル分割（メモにパイプは書かない前提）
    const cells = line.slice(1, -1).split("|");
    if (cells.length < 7) return;
    const lesson = cells[0].trim().match(/^L(\d+)/);
    if (!lesson) return; // ヘッダ・区切り行
    rows.push({ lineIndex, app, chapter, lesson: Number(lesson[1]), cells });
  });
  return rows;
}

function findRow(rows, target) {
  const shorthand = target.match(/^(ip|sg)-L(\d+)$/);
  if (shorthand) {
    const app = shorthand[1] === "ip" ? "ipa_ip" : "ipa_sg";
    const lesson = Number(shorthand[2]);
    return rows.filter((r) => r.app === app && r.lesson === lesson);
  }
  return rows.filter((r) => r.cells[3].trim() === target);
}

// ---------------------------------------------------------------------------
// base.json の書き換え（videos ブロックだけを差し替えて他は1バイトも触らない）
// ---------------------------------------------------------------------------

/** テキスト中の `"videos": [ ... ]`（トップレベル）の範囲を返す。無ければ null。 */
function findVideosSpan(text) {
  const start = text.search(/^ {2}"videos":\s*\[/m);
  if (start === -1) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = text.indexOf("[", start); i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return { start, end: i + 1 };
    }
  }
  die("base.json の videos ブロックが閉じていない");
}

function renderVideosBlock(chapters) {
  const body = JSON.stringify(chapters, null, 2)
    .split("\n")
    .map((l, i) => (i === 0 ? l : `  ${l}`))
    .join("\n");
  return `  "videos": ${body}`;
}

function upsertVideo(basePath, chapter, item) {
  const text = readFileSync(basePath, "utf8");
  const data = JSON.parse(text);
  const chapters = Array.isArray(data.videos) ? data.videos : [];

  let target = chapters.find((c) => c.id === chapter.id);
  if (!target) {
    target = { id: chapter.id, title: chapter.title, videos: [] };
    chapters.push(target);
    chapters.sort((a, b) => Number(a.id) - Number(b.id));
  } else {
    target.title = chapter.title;
  }
  target.videos = target.videos.filter((v) => v.id !== item.id).concat(item);
  // 章の中は L番号の昇順（表示順 = 配列順）
  target.videos.sort((a, b) => lessonNumber(a.id) - lessonNumber(b.id));

  const block = renderVideosBlock(chapters);
  const span = findVideosSpan(text);
  const next = span
    ? text.slice(0, span.start) + block + text.slice(span.end)
    : text.replace(/^\{\n/, `{\n${block},\n`);
  writeFileSync(basePath, next);
}

function lessonNumber(id) {
  const m = String(id).match(/^L(\d+)$/);
  return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER;
}

// ---------------------------------------------------------------------------
// 公開
// ---------------------------------------------------------------------------

function probeSeconds(file) {
  const out = execFileSync("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    file,
  ]).toString();
  const sec = parseFloat(out);
  if (!Number.isFinite(sec)) die(`尺が取れない: ${file}`);
  return sec;
}

function mmss(sec) {
  const total = Math.round(sec);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

let queueText = readFileSync(queuePath, "utf8");

for (const target of targets) {
  const rows = parseQueue(queueText);
  const matches = findRow(rows, target);
  if (matches.length === 0) die(`QUEUE.md に ${target} の行が無い`);
  if (matches.length > 1) die(`${target} が QUEUE.md の複数行に一致する（動画IDで指定する）`);
  const row = matches[0];
  const [, title, state, videoId, artifact] = row.cells.map((c) => c.trim());

  if (!/review|done/.test(state)) {
    die(`L${row.lesson} は ${state}。公開できるのは 👀 review（人のレビューが通ったもの）だけ`);
  }
  if (state.includes("done") && !force) {
    die(`L${row.lesson} はすでに ✅ done。やり直すなら --force`);
  }
  if (!artifact) die(`L${row.lesson} の成果物(draft)が空。先にレンダリングする`);

  const draftPath = join(videoRoot, "draft", row.app, artifact);
  if (!existsSync(draftPath)) die(`${draftPath} が無い。再レンダリングする（動画ID: ${videoId}）`);

  const chapter = chapterOverride ?? row.chapter;
  if (!chapter) {
    die(`L${row.lesson} の章が QUEUE.md から決まらない。--chapter <id>:<タイトル> で渡す`);
  }

  const id = `L${row.lesson}`;
  const destDir = join(repoRoot, "apps", row.app, "contents", "videos");
  mkdirSync(destDir, { recursive: true });
  copyFileSync(draftPath, join(destDir, `${id}.mp4`));

  const sec = probeSeconds(draftPath);
  upsertVideo(join(repoRoot, "apps", row.app, "contents", "base.json"), chapter, {
    id,
    title: `${id} ${title}`,
    durationSec: Math.round(sec),
    asset: `videos/${id}.mp4`,
  });

  // QUEUE.md はその行だけを差し替える（並列で動く他エージェントの更新を消さない）
  const cells = [...row.cells];
  cells[2] = " ✅ done ";
  cells[5] = ` ${mmss(sec)} `;
  const lines = queueText.split("\n");
  lines[row.lineIndex] = `|${cells.join("|")}|`;
  queueText = lines.join("\n");
  writeFileSync(queuePath, queueText);

  console.log(`✓ ${row.app} ${id} ${title}  ${artifact} → contents/videos/${id}.mp4  (${mmss(sec)})`);
}

console.log(
  "\napps/<app>/pubspec.yaml の flutter.assets に `- contents/videos/` があるか確認すること（初回のみ）",
);
