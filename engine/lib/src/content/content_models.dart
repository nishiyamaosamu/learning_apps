import 'package:freezed_annotation/freezed_annotation.dart';

part 'content_models.freezed.dart';
part 'content_models.g.dart';

/// 一覧表示用のサマリ。base.json に含まれる。
@freezed
class ContentSummary with _$ContentSummary {
  const factory ContentSummary({
    required String id,
    required String title,
    // 収録カード数（暗記カードのデッキで使う）。任意フィールドのため、値を持たない
    // 既存の一覧（問題集など）は null のままで非破壊にパースできる。
    int? cardCount,
  }) = _ContentSummary;

  factory ContentSummary.fromJson(Map<String, dynamic> json) =>
      _$ContentSummaryFromJson(json);
}

/// 講座の「系」。大分類をまとめ、base.json の配列順で表示する。
@freezed
class LessonDomain with _$LessonDomain {
  const factory LessonDomain({
    required String id,
    required String title,
    required List<LessonMajorCategory> majorCategories,
  }) = _LessonDomain;

  factory LessonDomain.fromJson(Map<String, dynamic> json) =>
      _$LessonDomainFromJson(json);
}

/// 講座の大分類。講座一覧ではこの単位を開閉する。
@freezed
class LessonMajorCategory with _$LessonMajorCategory {
  const factory LessonMajorCategory({
    required String id,
    required String title,
    required List<LessonMiddleCategory> middleCategories,
  }) = _LessonMajorCategory;

  factory LessonMajorCategory.fromJson(Map<String, dynamic> json) =>
      _$LessonMajorCategoryFromJson(json);
}

/// 講座の中分類。配下の講座を一覧表示する見出しとなる。
@freezed
class LessonMiddleCategory with _$LessonMiddleCategory {
  const factory LessonMiddleCategory({
    required String id,
    required String title,
    required List<ContentSummary> lessons,
  }) = _LessonMiddleCategory;

  factory LessonMiddleCategory.fromJson(Map<String, dynamic> json) =>
      _$LessonMiddleCategoryFromJson(json);
}

/// base.json の内容。各タブの一覧を初期ロードで提供する。
@freezed
class ContentIndex with _$ContentIndex {
  const factory ContentIndex({
    @Default(<LessonDomain>[]) List<LessonDomain> lessons,
    @Default(<ExerciseGroup>[]) List<ExerciseGroup> exercises,
    @Default(<AnkiGroup>[]) List<AnkiGroup> anki,
    // 動画講座（ホームタブ）の章一覧。base.json に `videos` キーが無くても
    // 空リストとしてパースが通る（@Default）。
    @Default(<VideoChapter>[]) List<VideoChapter> videos,
  }) = _ContentIndex;

  factory ContentIndex.fromJson(Map<String, dynamic> json) =>
      _$ContentIndexFromJson(json);
}

/// 問題集タブの見出し（グループ）。base.json の `exercises` 配列に含まれ、
/// 配列順で表示する。[VideoChapter] と同じ「1階層グルーピング」の流儀。
@freezed
class ExerciseGroup with _$ExerciseGroup {
  const factory ExerciseGroup({
    required String id,
    required String title,
    @Default(<ContentSummary>[]) List<ContentSummary> exercises,
  }) = _ExerciseGroup;

  factory ExerciseGroup.fromJson(Map<String, dynamic> json) =>
      _$ExerciseGroupFromJson(json);
}

/// 暗記カードタブの見出し（グループ）。base.json の `anki` 配列に含まれ、
/// 配列順で表示する。
@freezed
class AnkiGroup with _$AnkiGroup {
  const factory AnkiGroup({
    required String id,
    required String title,
    @Default(<ContentSummary>[]) List<ContentSummary> anki,
  }) = _AnkiGroup;

  factory AnkiGroup.fromJson(Map<String, dynamic> json) =>
      _$AnkiGroupFromJson(json);
}

/// 動画講座の「章」。base.json の `videos` 配列に含まれ、配列順で表示する。
@freezed
class VideoChapter with _$VideoChapter {
  const factory VideoChapter({
    required String id,
    required String title,
    // 章に属する動画（配列順）。
    @Default(<VideoItem>[]) List<VideoItem> videos,
  }) = _VideoChapter;

  factory VideoChapter.fromJson(Map<String, dynamic> json) =>
      _$VideoChapterFromJson(json);
}

/// 動画講座の1本（動画＋視聴後の確認クイズ）。
///
/// [id] は**全章を通してグローバルに一意**である前提。ルート `/videos/:id` から
/// 章をまたいで1本を引く（[videoLookup]）ため、章内ローカルではなく全体で
/// ユニークな値を割り当てること（例: '1-1', '1-2', '2-1'）。
///
/// [asset] は contentBasePath からの相対パス（例 'videos/1-1.mp4'）。
/// [quizzes] は視聴後の確認クイズで、既存の [LessonQuiz] union をそのまま再利用する。
@freezed
class VideoItem with _$VideoItem {
  const factory VideoItem({
    required String id,
    required String title,
    // 尺（秒）。行末の mm:ss 表示に使う。
    required int durationSec,
    // 動画アセットの相対パス（contentBasePath 起点。例 'videos/1-1.mp4'）。
    required String asset,
    // 視聴後の確認クイズ（空なら確認クイズ導線を出さない）。
    @Default(<LessonQuiz>[]) List<LessonQuiz> quizzes,
  }) = _VideoItem;

  factory VideoItem.fromJson(Map<String, dynamic> json) =>
      _$VideoItemFromJson(json);
}

/// レッスン内容。contents/lessons/{id}.json を都度ロード。
///
/// docs/LESSON.md の `lesson` 構造に対応。コンテンツ（`pages`）を縦スワイプで
/// 1ページずつ表示し、確認問題（`quizzes`）を別画面で出題、末尾に `exercises`
/// （本番演習への参照）を表示する。
@freezed
class Lesson with _$Lesson {
  const factory Lesson({
    required String id,
    required String title,
    // 説明用のコンテンツページの列（縦スワイプで1ページずつ表示）。
    @Default(<ContentPage>[]) List<ContentPage> pages,
    // 確認問題（ミニクイズ）の列。別画面でまとめて出題する。
    @Default(<LessonQuiz>[]) List<LessonQuiz> quizzes,
    // 末尾に表示する本番演習への参照（exercises/{id}.json の id）。
    // 演習を持たないレッスンは空配列。
    @Default(<int>[]) List<int> exercises,
  }) = _Lesson;

  factory Lesson.fromJson(Map<String, dynamic> json) => _$LessonFromJson(json);
}

/// 説明用のコンテンツページ。1つ以上のブロックを縦に積み上げ、一度に表示する。
///
/// 画像はブロック単位で指定する（[ContentBlock.imageUrl]）。ナレーション音声は
/// ページ単位で1つだけ持つ（[audioUrl]）。
@freezed
class ContentPage with _$ContentPage {
  const factory ContentPage({
    // ページのタイトル（任意）。AppBar 等の本文外 UI で使う。
    String? title,
    // ページ全体のナレーション音声（任意）。ローカルアセット相対パス
    // （例 lessons/audios/1-1.mp3）。
    String? audioUrl,
    // 縦に積み上げて一度に表示するブロック列（1つ以上）。配列順。
    @Default(<ContentBlock>[]) List<ContentBlock> blocks,
  }) = _ContentPage;

  factory ContentPage.fromJson(Map<String, dynamic> json) =>
      _$ContentPageFromJson(json);
}

/// コンテンツページを構成するブロック。テキストか画像のどちらか一方を持つ
/// 1アイテム（1ブロック＝1アイテム）。ページ内では配列順に縦へ積み上げる。
@freezed
class ContentBlock with _$ContentBlock {
  const factory ContentBlock({
    // 本文（Markdown）。テキストブロックのとき指定する。画像ブロックでは null。
    String? text,
    // 画像。画像ブロックのとき指定する。テキストブロックでは null。
    // ローカルアセット相対パス（例 lessons/images/2-1.jpeg）。
    String? imageUrl,
  }) = _ContentBlock;

  factory ContentBlock.fromJson(Map<String, dynamic> json) =>
      _$ContentBlockFromJson(json);
}

/// 確認問題（ミニクイズ）。`type` を discriminator とするフラットなunion。
///
/// 各バリアントは型ごとのフィールドを同階層に持つ（`data:` でネストしない）。
@Freezed(unionKey: 'type')
sealed class LessonQuiz with _$LessonQuiz {
  /// 複数の選択肢から正解を1つ選ぶミニクイズ。
  @FreezedUnionValue('quizMultipleChoice')
  const factory LessonQuiz.multipleChoice({
    // 設問文（Markdown）。
    required String question,
    String? imageUrl,
    required List<String> options,
    // 正解の選択肢インデックス（0始まり）。
    required int correctOptionIndex,
  }) = QuizMultipleChoice;

  /// 問題文中の空欄（`[__]`）を選択肢で順番に穴埋めするミニクイズ。
  @FreezedUnionValue('quizFillInTheBlank')
  const factory LessonQuiz.fillInTheBlank({
    // 問題文。空欄は `[__]` で表現。
    required String question,
    String? imageUrl,
    // 選択肢（同一内容の重複は不可）。options数 ≥ 空欄数。
    required List<String> options,
    // 各空欄の正解。correctOptionIndices[n] = 出現順 n 番目の `[__]` の
    // 正解 = options のインデックス。値は重複しない。
    required List<int> correctOptionIndices,
  }) = QuizFillInTheBlank;

  factory LessonQuiz.fromJson(Map<String, dynamic> json) =>
      _$LessonQuizFromJson(json);
}

/// 問題文・選択肢・解説を構成するブロック。`type` を discriminator とする
/// フラットなunion（[LessonQuiz] と同じ流儀。`data:` でネストしない）。
@Freezed(unionKey: 'type')
sealed class ExerciseBlock with _$ExerciseBlock {
  /// テキストブロック。
  @FreezedUnionValue('text')
  const factory ExerciseBlock.text({required String text}) = ExerciseTextBlock;

  /// 画像ブロック。[src] は contentBasePath 起点の相対パス
  /// （例 'exercises/images/R8003_01.png'）。
  @FreezedUnionValue('image')
  const factory ExerciseBlock.image({required String src}) = ExerciseImageBlock;

  factory ExerciseBlock.fromJson(Map<String, dynamic> json) =>
      _$ExerciseBlockFromJson(json);
}

/// 4択の1選択肢。`content` は空配列のことがある（選択肢が設問画像内にある場合）。
/// その場合はフッターの「アイウエ」ボタンが唯一の解答手段になる。
@freezed
class ExerciseOption with _$ExerciseOption {
  const factory ExerciseOption({
    // 選択肢ID。1=ア, 2=イ, 3=ウ, 4=エ。
    required int id,
    @Default(<ExerciseBlock>[]) List<ExerciseBlock> content,
  }) = _ExerciseOption;

  factory ExerciseOption.fromJson(Map<String, dynamic> json) =>
      _$ExerciseOptionFromJson(json);
}

/// 問題の1問。
@freezed
class ExerciseQuestion with _$ExerciseQuestion {
  const factory ExerciseQuestion({
    // 問題ID（例 'R8001'）。
    required String qid,
    // 分野ID（'strategy' | 'management' | 'technology'）。
    required String category,
    // 問題文（テキスト・画像ブロックの列）。
    @Default(<ExerciseBlock>[]) List<ExerciseBlock> content,
    // 4つの選択肢。
    @Default(<ExerciseOption>[]) List<ExerciseOption> options,
    // 正解の選択肢ID（1..4）。
    required int answerOptionId,
    // 解説（テキスト・画像ブロックの列）。
    @Default(<ExerciseBlock>[]) List<ExerciseBlock> explanation,
  }) = _ExerciseQuestion;

  factory ExerciseQuestion.fromJson(Map<String, dynamic> json) =>
      _$ExerciseQuestionFromJson(json);
}

/// 分野（カテゴリ）の定義。表示名は「系」付きラベルに別途マッピングする。
@freezed
class ExerciseCategory with _$ExerciseCategory {
  const factory ExerciseCategory({required String id, required String name}) =
      _ExerciseCategory;

  factory ExerciseCategory.fromJson(Map<String, dynamic> json) =>
      _$ExerciseCategoryFromJson(json);
}

/// 問題集（1年度分）。contents/exercises/{id}.json を都度ロード。
@freezed
class Exercise with _$Exercise {
  const factory Exercise({
    // 年度ID（例 'R8'）。
    required String id,
    // 表示タイトル（例 '令和8年度'）。
    required String title,
    @Default(<ExerciseCategory>[]) List<ExerciseCategory> categories,
    @Default(<ExerciseQuestion>[]) List<ExerciseQuestion> questions,
  }) = _Exercise;

  factory Exercise.fromJson(Map<String, dynamic> json) =>
      _$ExerciseFromJson(json);
}

/// 暗記カードの1枚。
@freezed
class AnkiCard with _$AnkiCard {
  const factory AnkiCard({
    required String front,
    required String back,
    // 用語（front）側にだけ出す補足。backに書くと答えがバレる
    // 「Uninterruptible Power Supplyの略」のような情報を置く。
    String? frontInfo,
  }) = _AnkiCard;

  factory AnkiCard.fromJson(Map<String, dynamic> json) =>
      _$AnkiCardFromJson(json);
}

/// 暗記カード内容（デッキ）。contents/anki/{id}.json を都度ロード。
@freezed
class AnkiDeck with _$AnkiDeck {
  const factory AnkiDeck({
    required String id,
    required String title,
    @Default(<AnkiCard>[]) List<AnkiCard> cards,
  }) = _AnkiDeck;

  factory AnkiDeck.fromJson(Map<String, dynamic> json) =>
      _$AnkiDeckFromJson(json);
}
