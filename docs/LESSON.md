# 目的

レッスンは、説明（テキスト・画像）と軽い理解度チェック（ミニクイズ）を**ページ単位**で並べて学習内容を提供します。
最初にテキスト・画像で内容を説明し、途中にミニクイズで軽く確認、**最後に本番の演習（exercises = 過去問）を参照する**構成が一般的です。

- レッスンの一覧情報（カテゴリ・id・title など）は `base.json` 側が持つ。本ドキュメントは**1レッスンの中身**の構造のみを規定する。
- コンテンツは YAML で執筆する（ドキュメント内の例も YAML）。シーケンスの順序がそのまま表示順になる（明示的な番号フィールドは持たない）。
- 音声・画像はアプリの `contents/` 配下に同梱するローカルアセットの相対パスで指定する。

# データ構造

## lesson

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `id` | int | ✅ | レッスン ID |
| `title` | string | ✅ | レッスン名（base.json と重複するが、ファイル単体での可読性のため保持） |
| `pages` | array of [page](#page) | ✅ | 説明・ミニクイズのページ列。配列順に表示。 |
| `exercises` | array of int | ー（任意） | 末尾に表示する本番演習への参照。`exercises/{id}.json` の id を指す。無いレッスンは空配列。 |

- `exercises` は**常にレッスンの末尾**に表示される（ページ列の中には入れない）。導入だけのレッスンなど、演習を持たないレッスンも許容する。

## page

ページは複数のコンテンツを束ねるオブジェクト。

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `contents` | array of [content](#content) | ✅ | このページに並べるコンテンツ列。配列順に表示。 |

## content

各コンテンツは `type` を discriminator とする**フラット構造**（型ごとのフィールドを同階層に持つ。`data:` でネストしない）。

### type: text

説明本文。

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `type` | `"text"` | ✅ | |
| `text` | string (Markdown) | ✅ | 本文。Markdown（太字・箇条書き・見出し・インラインコード等）で記述。 |
| `audioUrl` | string | ー（任意） | 本文ナレーション音声。ローカルアセット相対パス（例 `audio/1-1.mp3`）。 |

### type: image

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `type` | `"image"` | ✅ | |
| `imageUrl` | string | ✅ | 画像。ローカルアセット相対パス（例 `images/vowels.png`）。 |

### type: quizMultipleChoice

複数の選択肢から正解を1つ選ぶミニクイズ。**設問文は直前の `text` コンテンツが担う**（このコンテンツ自身は設問文を持たない）。

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `type` | `"quizMultipleChoice"` | ✅ | |
| `options` | array of string | ✅ | 選択肢 |
| `correctOptionIndex` | int | ✅ | 正解の選択肢インデックス（0始まり） |

### type: quizFillInTheBlank

問題文中の空欄を選択肢で順番に穴埋めするミニクイズ。

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `type` | `"quizFillInTheBlank"` | ✅ | |
| `question` | string | ✅ | 問題文。空欄は `[__]` で表現。 |
| `options` | array of string | ✅ | 選択肢。**同一内容の重複は不可**（各選択肢はユニークな文字列）。 |
| `correctOptionIndices` | array of int | ✅ | 各空欄の正解。`correctOptionIndices[n]` = `question` 中に出現順で数えた n 番目の `[__]` の正解 = `options` のインデックス。 |

ロジック:

- `question` 中の `[__]` を**出現順**に数え、その n 番目の空欄の正解が `correctOptionIndices[n]`。
- 回答 UI は**ドラッグ&ドロップ**。選択肢チップを空欄に配置する。各チップは1つの空欄にのみ使用する。
- したがって `options 数 ≥ 空欄数`。余ったチップが誤答（distractor）になる。`correctOptionIndices` の値は重複しない。

# YAML 例

```yaml
id: 1
title: IPAとは何か
pages:
  - contents:
      - type: text
        text: |
          # 国際音声記号（IPA）

          **IPA: International Phonetic Alphabet** は、世界中の言語の音声を
          表記するための記号体系です。

          - 1つの記号が1つの音に対応する
          - つづりに惑わされず正確な発音を学べる
        audioUrl: audio/1-1.mp3
      - type: image
        imageUrl: images/ipa_chart.png

  - contents:
      - type: text
        text: 母音 `[i]` が表す音はどれでしょう？
      - type: quizMultipleChoice
        options:
          - 前舌・狭母音（「イー」に近い）
          - 後舌・広母音（「アー」に近い）
          - 中舌・中母音
        correctOptionIndex: 0

  - contents:
      - type: quizFillInTheBlank
        question: "[i] は[__]母音、[ɑ] は[__]母音です。"
        options:
          - 前舌・狭
          - 後舌・広
          - 中舌・中
        correctOptionIndices: [0, 1]

exercises: [1]
```
