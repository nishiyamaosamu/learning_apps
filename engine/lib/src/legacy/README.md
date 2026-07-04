# legacy — 旧テキストレッスンUI（ルート未接続）

集中ブルーのデザイン適用（動画講座タブ化）にあたり退役した、旧「テキストレッスン」
UI一式のコード温存置き場。**どの active コード（`screens/`・`routing/`・`engine.dart`）
からも import されておらず、アプリからは到達不可**。`flutter analyze` は通す。

## 中身

- `lesson_top.dart` — 講座タブのトップ（`LessonTop`。カテゴリのアコーディオン一覧）
- `lesson.dart` — レッスン再生本体（`Lesson`。縦スワイプのカード式プレイヤー＋確認クイズ画面）
- `lesson_contents.dart` — 本文部品（`MultipleChoiceQuiz` / `FillInTheBlankQuiz` /
  `LessonCardMetrics` / `buildLessonCardColumn` / `lessonCardFitBox`）

## 復活させる場合

1. `router.dart` に `/lessons/:id`（→ `legacy/lesson.dart` の `Lesson`）を再接続する。
2. タブに戻すなら `EngineTab` に講座タブを足し、`home_screen.dart` の `_itemFor` に
   `legacy/lesson_top.dart` の `LessonTop` を割り当てる。
3. 分量チェック（`page_fit_test.dart`）を使うなら `engine.dart` で
   `LessonCardMetrics` / `buildLessonCardColumn` / `lessonCardFitBox` を再エクスポートする。

なお `lessonProvider` / `Lesson` モデル（`content/` 層）は legacy が参照するため
温存されている（削除しない）。
