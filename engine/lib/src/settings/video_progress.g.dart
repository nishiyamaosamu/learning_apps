// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'video_progress.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$videoProgressHash() => r'6635bc4ef5549a63d8014580e6dba6ff0f76a2ba';

/// 動画の視聴進捗（再生位置・視聴済み・最終視聴動画）を永続化する。
///
/// アプリ全体の学習状態なのでセッション中は保持する（keepAlive）。永続化の
/// 真実は SharedPreferences 側にあり、コールドスタート時に復元する。
/// [ExerciseResults] と同じ流儀で、初期ロードが書き込みに割り込んで state を
/// 巻き戻すのを [_loaded] ガードで防ぐ。
///
/// Copied from [VideoProgress].
@ProviderFor(VideoProgress)
final videoProgressProvider =
    NotifierProvider<VideoProgress, VideoProgressData>.internal(
      VideoProgress.new,
      name: r'videoProgressProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$videoProgressHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$VideoProgress = Notifier<VideoProgressData>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
