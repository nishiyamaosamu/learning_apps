# exercise JSON スキーマと具体例

engine 共通スキーマ（原本: `engine/lib/src/content/content_models.dart`）。ここが唯一の真実。
迷ったら実際のクラス定義を読む。既存の完成例として `apps/ipa_sg/contents/exercises/R8.json`、
`apps/ipa_ip/contents/exercises/R4.json` が参考になる。

## 目次
1. ファイル全体の構造
2. ブロック（text / image）
3. 選択肢と正解
4. カテゴリと5問チャンク
5. 科目A（単純4択）の例
6. 科目B（ケース＋組合せ多肢）の例
7. base.json への登録
8. 検証（必須）

---

## 1. ファイル全体の構造

`apps/<app>/contents/exercises/<ExerciseId>.json`（例 `R8.json`）:

```json
{
  "id": "R8",
  "title": "令和8年度",
  "categories": [
    { "id": "a", "name": "科目A" },
    { "id": "b", "name": "科目B" }
  ],
  "questions": [ /* ExerciseQuestion の配列 */ ]
}
```

`ExerciseQuestion` の必須フィールド:

| フィールド | 型 | 説明 |
|---|---|---|
| `qid` | string | 問題ID。年度略号＋3桁連番（例 `R8001`〜`R8015`） |
| `category` | string | 分野ID（`categories` の id か、アプリ既知のID） |
| `content` | ブロック配列 | 問題文（text/image の列） |
| `options` | 選択肢配列 | 4択とは限らない（最大10択） |
| `answerOptionId` | int | 正解の選択肢 id |
| `explanation` | ブロック配列 | 解説（text/image の列） |

## 2. ブロック（ExerciseBlock, `unionKey: 'type'`）

- テキスト: `{ "type": "text", "text": "…" }`  改行は `\n`。
- 画像: `{ "type": "image", "src": "exercises/images/<file>.png" }`  `src` は **contentBasePath（=contents）起点の相対パス**。

図・表を組み込むときは、本文でその図表に言及した**直後**に image ブロックを置くと読み手の流れに合う。

## 3. 選択肢（ExerciseOption）と正解

```json
"options": [
  { "id": 1, "content": [ { "type": "text", "text": "…" } ] },
  { "id": 2, "content": [ { "type": "text", "text": "…" } ] }
]
```

- `id` は **1 始まりの連番**。エンジンは id → かな を `ア イ ウ エ オ カ キ ク ケ コ`（最大10択）で対応させる（`engine/lib/src/screens/tabs/exercise_quiz.dart`）。
- `content` が空配列でもよい（選択肢が設問画像内に描かれている場合）。その場合フッターの「アイウエ」ボタンが解答手段になる。
- **`answerOptionId`** は公式解答PDFの記号を id に変換して入れる:

  | 記号 | ア | イ | ウ | エ | オ | カ | キ | ク | ケ | コ |
  |---|---|---|---|---|---|---|---|---|---|---|
  | id | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |

## 4. カテゴリと5問チャンク

- `categories` はファイル冒頭で宣言。宣言順に一覧へ並ぶ。`name` は表示名。
- 既知ID（ipa_ip の `strategy`/`management`/`technology`）は engine 側で「〜系」ラベルに整形される。
  未知ID（例 ipa_sg の `a`/`b`）は `name` がそのまま表示される（fallback）。
- カテゴリ内の問題は engine が自動で **5問チャンク**に割る。末尾の端数が6〜9問になる場合は均等2分割
  （6→3+3, 7→4+3, 8→4+4, 9→5+4。`engine/.../exercise_chunks.dart` の `chunkSizes`）。制作側で区切りを作る必要はない。

## 5. 科目A（単純4択）の例

```json
{
  "qid": "R8010",
  "category": "a",
  "content": [
    { "type": "text", "text": "次のIPアドレスとサブネットマスクをもつPCがある。このPCのネットワークアドレスとして，適切なものはどれか。\n\nIPアドレス：10.170.70.19\nサブネットマスク：255.255.255.240" }
  ],
  "options": [
    { "id": 1, "content": [ { "type": "text", "text": "10.170.70.0" } ] },
    { "id": 2, "content": [ { "type": "text", "text": "10.170.70.16" } ] },
    { "id": 3, "content": [ { "type": "text", "text": "10.170.70.31" } ] },
    { "id": 4, "content": [ { "type": "text", "text": "10.170.70.255" } ] }
  ],
  "answerOptionId": 2,
  "explanation": [
    { "type": "text", "text": "ネットワークアドレスは IPアドレスとサブネットマスクの論理積（AND）。第4オクテットは 19（0001 0011）AND 240（1111 0000）＝16。よって 10.170.70.16（イ）。" }
  ]
}
```

**選択肢が表になっている科目A**（例：2列の組合せ表）は、各行を option の content に展開する（画像化しない）:

```json
{ "id": 1, "content": [ { "type": "text", "text": "アクセス制御：…\n管理者権限管理：…" } ] }
```

**参照用の表・フロー図が本文にある科目A**（費用表・分析フロー等でキャプション番号が無いもの）は、
content の text ブロックに書き下す。計算に必要な数値を落とさないこと:

```json
{ "type": "text", "text": "…期待費用が最も低い案はどれか。（単位：円）\n\n案A：良品 0／不良品 1,500\n案B：良品 40／不良品 1,000\n案C：良品 80／不良品 500\n案D：良品 120／不良品 200" }
```

## 6. 科目B（ケース＋組合せ多肢）の例

長い状況説明＋図表＋設問＋解答群（ア〜コ）。解答群は (a1,a2,…) の組合せが多い。

```json
{
  "qid": "R8013",
  "category": "b",
  "content": [
    { "type": "text", "text": "A社は，従業員300名の専門商社であり…（状況説明の段落）" },
    { "type": "text", "text": "〔来訪者管理〕\n…（見出し付きの段落）" },
    { "type": "text", "text": "…その課題とB社への依頼を表1にまとめた。" },
    { "type": "image", "src": "exercises/images/2026r08-p09-tbl1.png" },
    { "type": "text", "text": "設問　次の依頼のうち，表1中のa1，a2に入れるものの組合せはどれか。…\n\n（一）…\n（二）…\n（三）…\n（四）…" }
  ],
  "options": [
    { "id": 1, "content": [ { "type": "text", "text": "a1：（一）　a2：（二）" } ] },
    { "id": 4, "content": [ { "type": "text", "text": "a1：（二）　a2：（三）" } ] }
  ],
  "answerOptionId": 4,
  "explanation": [
    { "type": "text", "text": "課題1は…なので a1＝（二）。課題2は…なので a2＝（三）。よって組合せ「エ」が正解。（一）…（四）…が不適な理由も添える。" }
  ]
}
```

要点:
- 状況説明は段落・〔見出し〕単位で text を分ける（1つの巨大ブロックにしない）。
- 図・表は言及の直後に image。設問文と選択肢定義（(一)〜(四)）は末尾 text にまとめる。
- 組合せ選択肢は中身を素直に書く（`a1：…　a2：…`。全角スペース区切りが読みやすい）。UIがア〜のラベルを付ける。
- 表に空欄（a1/a2/a3）があるものは、抽出画像がその空欄を含んでいるので image をそのまま使えばよい。

## 7. base.json への登録

`apps/<app>/contents/base.json` の `exercises` は `ExerciseGroup`（`{ id, title, exercises: [{ id, title }] }`）の配列:

```json
"exercises": [
  {
    "id": "past-exams",
    "title": "IPA公式 公開問題",
    "exercises": [
      { "id": "R8", "title": "令和8年度 問題集" }
    ]
  }
]
```

## 8. 検証（必須）

### 8-1. スキーマ・整合の機械チェック

`python` で、JSONが読める・画像srcが実在する・option idが1..N連番・answerOptionIdが範囲内・categoryが宣言済み、を確認する。例:

```bash
mise exec -- uv run --with none python - <<'PY'
import json, os
base="apps/<app>/contents"
d=json.load(open(f"{base}/exercises/<ExerciseId>.json"))
cats={c["id"] for c in d["categories"]}
KANA="アイウエオカキクケコ"
for q in d["questions"]:
    ids=[o["id"] for o in q["options"]]
    assert ids==list(range(1,len(ids)+1)), (q["qid"],ids)
    assert q["category"] in cats, (q["qid"],q["category"])
    assert q["answerOptionId"] in ids, (q["qid"],q["answerOptionId"])
    for b in q["content"]:
        if b["type"]=="image":
            assert os.path.exists(f"{base}/{b['src']}"), b["src"]
    print(q["qid"],"ans",KANA[q["answerOptionId"]-1],"opts",len(ids))
print("OK")
PY
```

### 8-2. engine モデルでの実パース（最重要）

union型（text/image）・10択・画像パスが engine で正しく解決するかは、実際に `Exercise.fromJson` を通すのが確実。
一時テストを `engine/test/tmp_parse_test.dart` に置いて実行し、**確認後に必ず削除**する:

```dart
import 'dart:convert';
import 'dart:io';
import 'package:engine/engine.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('exercise json parses', () {
    final json = jsonDecode(File(
      '../apps/<app>/contents/exercises/<ExerciseId>.json').readAsStringSync())
        as Map<String, dynamic>;
    final ex = Exercise.fromJson(json);
    expect(ex.questions.isNotEmpty, isTrue);
    for (final q in ex.questions) {
      expect(q.options.map((o) => o.id),
          List.generate(q.options.length, (i) => i + 1), reason: q.qid);
      expect(q.explanation.isNotEmpty, isTrue, reason: q.qid);
    }
  });
}
```

```bash
cd engine && mise exec -- flutter test test/tmp_parse_test.dart && rm test/tmp_parse_test.dart
```

engine の freezed/riverpod を変更した場合はコード再生成が必要（通常この作業では不要）:
`cd engine && mise exec -- dart run build_runner build --delete-conflicting-outputs`
