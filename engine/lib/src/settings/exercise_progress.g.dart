// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'exercise_progress.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$exerciseProgressHash() => r'057445d725347eb6b5f019ddbf012571620b1bed';

/// 問題集タブの「前回」表示用に、最後に開いたチャンクの位置を永続化する。
///
/// [VideoProgress] と同じ流儀（アプリ全体の学習状態なので keepAlive・永続化の
/// 真実は SharedPreferences 側・[_loaded] ガードで初期ロードの巻き戻しを防ぐ）。
///
/// Copied from [ExerciseProgress].
@ProviderFor(ExerciseProgress)
final exerciseProgressProvider =
    NotifierProvider<ExerciseProgress, ExerciseLastOpened?>.internal(
      ExerciseProgress.new,
      name: r'exerciseProgressProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$exerciseProgressHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$ExerciseProgress = Notifier<ExerciseLastOpened?>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
