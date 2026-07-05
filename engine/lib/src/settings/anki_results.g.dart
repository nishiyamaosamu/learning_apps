// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'anki_results.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$ankiResultsHash() => r'3b5e328e3336ede9cbd7a8439f324efae1f4732b';

/// カード単位の自己評価（cardKey → 覚えた/まだ）を永続化する。
///
/// DESIGN.html「暗記カードタブ」の「覚えた」率プログレスバー・「覚えた語数」・
/// 「覚えていないカードから10問」の裏側。
///
/// - キーは [ankiCardKey]（deckId+front の複合キー、デッキをまたいで一意）。
/// - 値 true=覚えた / false=まだ。マップに無いカードは「未評価」。
/// - 最新の自己評価で上書きする（覚えた→まだ、まだ→覚えた いずれも可）。
/// - 「覚えていない」= 未評価 ∪「まだ」（= state[key] != true）。
///
/// アプリ全体の学習状態なのでセッション中は保持する（keepAlive）。永続化の
/// 真実は SharedPreferences 側にあり、コールドスタート時に復元する。
/// [ExerciseResults] と同じ流儀で、初期ロードが書き込みに割り込んで state を
/// 巻き戻すのを [_loaded] ガードで防ぐ。
///
/// Copied from [AnkiResults].
@ProviderFor(AnkiResults)
final ankiResultsProvider =
    NotifierProvider<AnkiResults, Map<String, bool>>.internal(
      AnkiResults.new,
      name: r'ankiResultsProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$ankiResultsHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$AnkiResults = Notifier<Map<String, bool>>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
