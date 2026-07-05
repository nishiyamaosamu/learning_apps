// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'review_queue.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$reviewQueueHash() => r'0932233278cd160f51a076bfc1baee7a62e4615c';

/// 要復習キュー（誤答の自動蓄積）。qid の集合を SharedPreferences に永続化する。
///
/// DESIGN.html「集中ブルー」の要復習導線（問題集タブの「要復習をランダムに5問」、
/// 解説カードの「要復習に追加」チップ、完了画面の「要復習 +n」）の裏側。
///
/// - 自動蓄積: クイズ確定時、不正解の qid を追加し、正解の qid は解消（削除）する。
///   （既存の [ExerciseResults.recordAll] と同じフックで [syncFromResults] を呼ぶ）
/// - 手動追加: 解説カードの「要復習に追加」チップから任意の qid を追加する（冪等）。
///
/// 値は [ExerciseQuestion.qid]（例 'R8001'、年度をまたいで一意）。順序は保持しない
/// （出題はランダム抽出のため）。アプリ全体の学習状態なのでセッション中は保持する
/// （keepAlive）。永続化の真実は SharedPreferences 側にあり、コールドスタート時に
/// 復元する。[ExerciseResults] と同じ流儀で、初期ロードが書き込みに割り込んで
/// state を巻き戻すのを [_loaded] ガードで防ぐ。
///
/// Copied from [ReviewQueue].
@ProviderFor(ReviewQueue)
final reviewQueueProvider = NotifierProvider<ReviewQueue, Set<String>>.internal(
  ReviewQueue.new,
  name: r'reviewQueueProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$reviewQueueHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef _$ReviewQueue = Notifier<Set<String>>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
