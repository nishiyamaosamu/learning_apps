# 目的
講義では、ページにテキスト（文章や音声）・画像・クイズを配置して学習内容を提供します。
最初にテキスト・画像を使って学習内容を説明し、最後にクイズで理解度を確認する構成が一般的です。

# データ構造

## lesson

- id: int
- title: string
- pages: array of page
  - page: int
  - pageType: enum (study, exercise)
  - pageContent: array of content (text, image, quizMultipleChoice, quizFillInTheBlank)
    - order: int
    - contentType: enum (text, image, quizMultipleChoice, quizFillInTheBlank)
    - contentData: any (depends on contentType)
  - exerciseId: int (optional, only for exercise page)

### contentType
#### text
- text: string
- audioUrl: string (optional)

#### image
- imageUrl: string

#### quizMultipleChoice
- options: array of string
- correctOptionIndex: int

quizMultipleChoiceは、複数の選択肢から正解を1つ選ぶ形式です。

#### quizFillInTheBlank
- question: string (with blanks represented as `[__]`)
- options: array of string
- correctOptionIndexs: array of int

quizFillInTheBlankは、問題文中の空欄を `[__]` で表現し、optionsから正解の選択肢を選ぶ形式です。
順番に穴埋めして、誤答も選択肢に含まれます。