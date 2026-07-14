# 工程3: codex 照合レビューのテンプレート

自作の exercise JSON を、一次資料（問題まとめMD・公式解答PDF）と**独立に**照合させる。
自分の思い込みを外から検証するのが目的なので、レビュアー（codex）には元資料の場所と観点を渡し、
**ファイルは変更させない**（`--sandbox read-only`）。

## 実行

`<app>` / `<exam>` / 対象JSONパス / 資料パスを埋めて実行する。`content_works/<app>/` の直下から
問題まとめMD（例 `sg_koukai_mondai.md`）と解答PDF（`pdf/<exam>_*_ans.pdf`）を指す。

```bash
cd /Users/osamu/workspace/leaning_apps
codex exec --sandbox read-only "あなたはIPA試験対策アプリのコンテンツレビュアーです。ファイル apps/<app>/contents/exercises/<ExerciseId>.json をレビューしてください。これは<試験名>の問題集データです。

照合すべき一次資料:
- 問題本文: content_works/<app>/<問題まとめMD> の該当年度セクション（無ければ content_works/<app>/pdf/<exam>_*_qs.pdf を pdftotext で読む）
- 公式解答: content_works/<app>/pdf/<exam>_*_ans.pdf （pdftotextで読める。問番号と正解記号ア〜コの対応表）

レビュー観点:
1. 【正解の一致】各問の answerOptionId（1=ア,2=イ,…,10=コ）が公式解答PDFの正解記号と一致するか。多肢（ア〜コ）に特に注意。
2. 【問題文の忠実性】content の問題文・条件が原文と意味的に一致するか（脱落・改変がないか）。
3. 【選択肢の忠実性】options の各選択肢が原文の解答群と一致し、id順（ア〜）が正しいか。組合せ選択肢（a1/a2/a3）が解答群の表と一致するか。
4. 【解説の妥当性】explanation の説明・計算が論理的に正しく、正解と矛盾しないか。
5. 【画像参照】image src が図表と正しく対応しているか（ファイルは exercises/images/ 配下）。
6. 【スキーマ】qid連番, category, option id連番, 必須フィールドの整合。

ファイルは変更しないでください。日本語で、問題ごとに『問番号: OK / 要修正（具体的な指摘）』の形式で簡潔に報告し、最後に総評をまとめてください。"
```

## 指摘への対応

- 要修正の指摘が出たら、一次資料に当たって真偽を判断する（codexも誤ることがある。特に解説の妥当性は自分でも再検算）。
- 本当に誤りなら JSON を修正 → [exercise-schema.md](exercise-schema.md) の検証を再実行 → codex を再度回す。
- **指摘ゼロ（要修正なし）になるまで繰り返す**。総評まで OK が揃って完了。
