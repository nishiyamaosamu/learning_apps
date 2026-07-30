#!/usr/bin/env node
/**
 * 人のレビューが通った動画（QUEUE.md が 👀 review）を、draft から
 * アプリの完成品置き場（apps/<app>/contents/videos/）へ公開する。
 *
 *   node scripts/publish.mjs sg-L1              # 1本
 *   node scripts/publish.mjs sg-L1 sg-L2        # まとめて
 *   node scripts/publish.mjs sg-L4 --force      # すでに ✅ done の行をやり直す
 *   node scripts/publish.mjs sg-L1 --keep-draft # draft を消さずに残す（例外）
 *   node scripts/publish.mjs --prune            # 公開済み（✅ done）の draft を一括で掃除
 *
 * 引数は `<接頭辞>-L<番号>`（`sg-L1`）か QUEUE.md の動画ID そのまま
 * （`sg-L1-what-is-infosec`）。何度実行しても結果は同じ（冪等）。
 *
 * この1コマンドで次の4つが揃う。手でどれかを忘れると一覧に出ない／再生できない。
 *   1. draft/<app>/<成果物>.mp4 → apps/<app>/contents/videos/<L番号>.mp4 にコピー
 *   2. apps/<app>/contents/base.json の `videos` に章ごと登録（尺は ffprobe の実測）
 *   3. QUEUE.md の行を ✅ done にし、尺（mm:ss）を埋める
 *   4. その回の draft/<app>/*.mp4 を削除（公開した版と、置き換わった旧版 `-v<n>` の両方）
 *      — draft は「まだ人が見ていないもの」の置き場。公開が済んだ回を残すと、
 *        次にレビューするものが埋もれるし、1本20MBが積み上がる。
 *      消すのは公開先に同じサイズのmp4があると確認できたときだけ（gitignore で復元できないため）。
 *      QUEUE.md の「成果物(draft)」欄はどの版を公開したかの記録として残る（ファイルはもう無い）。
 *
 * アプリ側の動画ID = L番号（`L1`）。視聴進捗のキーなので後から変えない。
 * 章（VideoChapter）は QUEUE.md の `### 第N章 タイトル` 見出しから採る。
 * 見出しが無いアプリ（ipa_ip）は --chapter <id>:<タイトル> で明示する。
 */
import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
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
const keepDraft = argv.includes("--keep-draft");
const pruneOnly = argv.includes("--prune");
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
if (targets.length === 0 && !pruneOnly) {
  console.error(
    "usage: node scripts/publish.mjs <sg-L1 | 動画ID> [...] [--force] [--keep-draft] [--chapter <id>:<title>]\n" +
      "       node scripts/publish.mjs --prune   # 公開済み（✅ done）の draft を掃除するだけ",
  );
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

function publishedPath(app, lesson) {
  return join(repoRoot, "apps", app, "contents", "videos", `L${lesson}.mp4`);
}

/**
 * 公開が済んだ回の draft を消す。対象は「公開した版」と「置き換わった旧版」
 * （`<base>-v<n>.mp4` の連番。承認された版があるので、それ以前の版は用済み）。
 *
 * draft は gitignore で復元が効かないので、**公開先に同じサイズのmp4がある**ことを
 * 確認できたときだけ消す。確認が取れなければ何もせず理由を返す（掃除は失敗させない）。
 *
 * @returns {{removed:string[], skipped:string|null}}
 */
function pruneDrafts({ app, lesson, artifact }) {
  const dir = join(videoRoot, "draft", app);
  const dest = publishedPath(app, lesson);
  if (!existsSync(dest)) return { removed: [], skipped: `公開先に ${dest} が無い` };
  if (!existsSync(dir)) return { removed: [], skipped: null };

  const draftPath = join(dir, artifact);
  if (existsSync(draftPath) && statSync(draftPath).size !== statSync(dest).size) {
    return {
      removed: [],
      skipped: `${artifact} と公開済みの L${lesson}.mp4 でサイズが違う（別の版が公開されている？）`,
    };
  }

  // 旧版は `<base>-v<n>.mp4` の連番のときだけ辿る（旧命名は成果物そのものだけ消す）
  const versioned = artifact.match(/^(.+)-v(\d+)\.mp4$/);
  const files = new Set([artifact]);
  if (versioned) {
    const pattern = new RegExp(`^${versioned[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-v\\d+\\.mp4$`);
    for (const f of readdirSync(dir)) if (pattern.test(f)) files.add(f);
  }

  const removed = [];
  for (const f of files) {
    const p = join(dir, f);
    if (!existsSync(p)) continue;
    rmSync(p);
    removed.push(f);
  }
  return { removed, skipped: null };
}

function reportPrune(label, { removed, skipped }) {
  if (skipped) console.warn(`  ! draft を残した（${label}）: ${skipped}`);
  else if (removed.length > 0) console.log(`  draft を削除: ${removed.join(" ")}`);
}

let queueText = readFileSync(queuePath, "utf8");

// --prune: 台帳が ✅ done の回で draft に残っているものをまとめて掃除する
// （消す運用にする前に公開した回の後始末。公開そのものは何もしない）
if (pruneOnly) {
  let hit = 0;
  for (const row of parseQueue(queueText)) {
    const [, , state, , artifact] = row.cells.map((c) => c.trim());
    if (!state.includes("done") || !artifact) continue;
    const result = pruneDrafts({ app: row.app, lesson: row.lesson, artifact });
    if (result.removed.length === 0 && !result.skipped) continue;
    hit++;
    console.log(`${row.app} L${row.lesson}`);
    reportPrune(`${row.app} L${row.lesson}`, result);
  }
  if (hit === 0) console.log("掃除するものは無い（✅ done の draft はすべて削除済み）");
  process.exit(0);
}

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

  // 公開が済んだので draft から消す（--keep-draft で残せる）
  if (keepDraft) console.log("  draft は残した（--keep-draft）");
  else reportPrune(`${row.app} ${id}`, pruneDrafts({ app: row.app, lesson: row.lesson, artifact }));
}

console.log(
  "\napps/<app>/pubspec.yaml の flutter.assets に `- contents/videos/` があるか確認すること（初回のみ）",
);
