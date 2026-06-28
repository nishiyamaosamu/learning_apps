// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'exercise_results.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$exerciseResultsHash() => r'5f4ae4b2d900e265134f1dae2712e52dcb26e3a9';

/// 問題ごとの学習結果（qid → 正解かどうか）。チャンク完了時にまとめて記録し、
/// 年度一覧画面の進捗バー（正解／誤答／未学習）とチャンクの完了✓の導出に使う。
///
/// - キーは [ExerciseQuestion.qid]（例 'R8001'、年度をまたいで一意）。
/// - 値 true=正解 / false=誤答。マップに無い qid は「未学習」。
/// - 再挑戦・復習では最新の結果で上書きする。
///
/// アプリ全体の学習状態なのでセッション中は保持する（keepAlive）。永続化の
/// 真実は SharedPreferences 側にあり、コールドスタート時に復元する。
///
/// Copied from [ExerciseResults].
@ProviderFor(ExerciseResults)
final exerciseResultsProvider =
    NotifierProvider<ExerciseResults, Map<String, bool>>.internal(
      ExerciseResults.new,
      name: r'exerciseResultsProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$exerciseResultsHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$ExerciseResults = Notifier<Map<String, bool>>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
