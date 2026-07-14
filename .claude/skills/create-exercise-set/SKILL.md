---
name: create-exercise-set
description: IPA試験対策アプリ（apps/ipa_*）の過去問PDFから問題集（exercises JSON）を制作する一気通貫ワークフロー。①対象PDFからキャプション付き図表をPNG抽出 → ②engine共通スキーマのexercise JSONを作成（本文テキスト＋図表画像＋選択肢＋公式解答＋解説）→ ③codexで一次資料と照合レビュー、まで通す。「問題集を作って」「過去問をJSON化」「令和X年度の問題集」「exercisesを作成」「科目A/科目Bの問題を作って」「PDFの図表を抜き出して問題に組み込む」などの依頼は必ずこのスキルを使うこと。正解は必ず公式解答PDFを根拠にし、推測で埋めない。図表画像だけの抽出依頼でもこのスキルの工程1が使える。
---

# 問題集（exercises JSON）の制作

過去問PDFを、アプリで解ける問題集データに変換する仕事。核心は3つの工程を通すことと、
**正解の裏取り**を絶対に外さないことだ。

```
対象PDF ──①図表をPNG抽出──▶ ②exercise JSON作成 ──③codexレビュー──▶ 完成
```

## 絶対に守る土台

- **正解（answerOptionId）は公式解答PDF（`{exam}_ans.pdf`）だけを根拠にする**。問題文から推測して埋めない。
  解答PDFが無ければユーザーに要求する。ここを曖昧にすると学習者に誤答を教えることになり、致命的。
- **解説（explanation）は自分で論理から書く**。IPAは公式解説を公開していない。書いたら必ず正解と矛盾しないか自己検算する（計算問題は数値を、ケース問題は根拠を明示）。
- **スキーマは engine 共通**（`engine/lib/src/content/content_models.dart` の `Exercise` / `ExerciseQuestion` / `ExerciseBlock` / `ExerciseOption`）。勝手に別形式を作らない。
- 出力後は**必ず検証**（後述のパーステスト）。目視だけで済ませない。

## 前提の把握（着手前に確認）

`<app>` は対象アプリ（`ipa_ip` / `ipa_sg`）。`<exam>` は試験回のID（例 `2026r08`）。ユーザーは対象PDFを指定する。

必要な素材:

| 素材 | 場所の例 | 用途 | 無い場合 |
|---|---|---|---|
| 問題PDF | `content_works/<app>/pdf/<exam>_*_qs.pdf` | 図表抽出・（必要なら）本文抽出 | ユーザーに要求 |
| 解答PDF | `content_works/<app>/pdf/<exam>_*_ans.pdf` | `answerOptionId` の根拠 | **ユーザーに要求（必須）** |
| 転記MD | `content_works/<app>/*.md`（例 `sg_koukai_mondai.md`） | 本文・選択肢の入手（優先） | PDFから `pdftotext` で抽出 |

**本文・選択肢の入手元**: 転記済みMarkdownがあればそれを最優先で使う（レイアウト崩れが無く正確）。
無ければ問題PDFを `pdftotext -layout` で読み、問題文・解答群を起こす（改行やルビの崩れを整える）。

---

## 工程1: 図表をPNG抽出する

図表はPDF内にベクター描画（線＋文字）で埋め込まれていることが多く、ラスタ画像として取り出せない。
そこで**キャプション付きの図・表の領域をレンダリングして切り出す**専用スクリプトを使う。

スクリプト: `content_works/scripts/extract_figures.py`（PEP 723 / pymupdf。判定ロジックは冒頭コメント参照）

```bash
cd content_works/scripts

# ipa_sg（デフォルト）: content_works/ipa_sg/pdf/*_sg_qs.pdf → apps/ipa_sg/.../images
mise exec -- uv run extract_figures.py

# 別アプリ・別命名の場合は引数で指定
mise exec -- uv run extract_figures.py \
  --pdf-dir ../ipa_ip/pdf --glob '*_ip_qs.pdf' --strip _ip_qs.pdf \
  --out ../../apps/ipa_ip/contents/exercises/images
```

- 出力名は `{exam}-p{NN}-{kind}{num}.png`（例 `2026r08-p15-tbl1.png`）。**番号は大問ごとにリセットして重複するため、ページ番号を含めて一意化**している。
- 保存先 `apps/<app>/contents/exercises/images/` は `pubspec.yaml` に登録済み。

**必ず目視確認する**（レンダリングした画像を実際に開いて見る）:
- 図・表の全体が入り、見切れ・過剰取り込みが無いか。表の脚注（注記/注N）が横に長い/折り返す場合も収まっているか。
- 本文中の「図1に沿って…」等の**参照**や、表セル内の文字（例「図2の項番」）を誤ってキャプションとして拾っていないか。

**キャプション（図N/表N）が無い図表は抽出されない**。科目Aの選択肢が表になっている問題（例：セキュアOSの表）や、
番号なしのフロー図・費用表がこれに該当する。これらは工程2で**テキストとして自然に表現**する（無理に画像化しない）。詳しくは工程2。

---

## 工程2: exercise JSON を作る

`apps/<app>/contents/exercises/<ExerciseId>.json` を作る。スキーマの詳細・具体例・検証手順は
**必ず [references/exercise-schema.md](references/exercise-schema.md) を読んでから**着手する。要点だけ再掲:

- **1問** = `ExerciseQuestion`（`qid` / `category` / `content[]` / `options[]` / `answerOptionId` / `explanation[]`）
- **content / explanation** = `ExerciseBlock` の列。`{"type":"text","text":"…"}` か `{"type":"image","src":"exercises/images/…png"}`
  - ケース本文は text ブロック、抽出した図・表は image ブロックで**その図表が言及される直後**に置く
- **options** = `id` は 1 始まりの連番。**エンジンは最大10択（ア〜コ）対応**なので科目Bの多肢もそのまま表現できる
- **answerOptionId** = 解答PDFの記号を id に変換（**ア=1, イ=2, ウ=3, エ=4, オ=5, カ=6, キ=7, ク=8, ケ=9, コ=10**）
- **category** = アプリの分野ID（ipa_ip: `strategy`/`management`/`technology`、ipa_sg: `a`=科目A/`b`=科目B）。
  カテゴリ内の問題は engine が自動で**5問チャンク**に分割する（末尾の端数6〜9問は均等2分割）。制作側で区切りを意識する必要はない。

### 科目B（ケース問題）の組み方

ケース問題は「長い状況説明＋図表＋設問＋解答群（ア〜コ）」。解答群が (a1,a2,a3) の**組合せ**になっていることが多い。

- 本文の段落・〔見出し〕ごとに text ブロックを分ける。図・表は該当箇所の直後に image ブロック。
- 設問文と、そこで参照される選択肢定義（(一)〜(四) 等）は content の末尾 text ブロックに入れる。
- options は解答群 ア〜コ。各 option の content には組合せの中身を書く（例 `"a1：（二）　a2：（三）"`）。UIが「エ」等のラベルを自動付与する。

### 図表がテキストのほうが良いケース

キャプション無しで未抽出の図表（科目Aの表・フロー・費用表など）は、画像化せずテキストで表す:
- 選択肢自体が表の行なら → 各行をそのまま option の content に展開する。
- 参照用の表・フローなら → content の text ブロックに箇条書き等で自然に書き下す（計算に必要な数値は落とさない）。

### base.json への登録

`apps/<app>/contents/base.json` の `exercises`（`ExerciseGroup` の配列）に `{ "id": "<ExerciseId>", "title": "…" }` を追加する。
グループが無ければ作る（例 `{ "id": "past-exams", "title": "IPA公式 公開問題", "exercises": [ … ] }`）。

### 検証（必須）

作ったら [references/exercise-schema.md](references/exercise-schema.md) の「検証」節に従い、
①JSONスキーマ・画像実在・選択肢ID連番・正解ID範囲のチェック、②**engine の `Exercise.fromJson` で実際にパースできるか**（一時テストを engine/test に置いて `mise exec -- flutter test` → 確認後に削除）を通す。union型（text/image）や10択が正しく解決することを保証する。

---

## 工程3: codex で照合レビュー

自分が作ったものを、**一次資料（問題まとめ・公式解答PDF）と独立に照合**させる。CLAUDE.md の codex 呼び出し規約に沿う。

テンプレートは [references/codex-review.md](references/codex-review.md) にある。`<app>` / `<exam>` / 対象JSONパスを埋めて実行:

```bash
cd /Users/osamu/workspace/leaning_apps
codex exec --sandbox read-only "（references/codex-review.md のプロンプト）"
```

レビュー観点は「正解の一致・問題文の忠実性・選択肢の忠実性・解説の妥当性・画像対応・スキーマ整合」。
**要修正の指摘があれば直して再検証・再レビュー**。指摘ゼロになるまで回す。

---

## 完了時の報告

- 作成した Exercise（年度・問数・科目）と、埋め込んだ図表画像の対応表
- 正解の根拠（解答PDF）と、解説を自分で起こした旨
- 検証（パーステスト）と codex レビューの結果（要修正なし/対応済み）
- 未対応・要確認事項（テキスト化した図表、抽出できなかった図表など）があれば明示
