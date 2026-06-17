// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'audio_settings.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$audioEnabledHash() => r'f3ebbb6a3fbbfc3b052add03ae9b81db7fa4aaf0';

/// レッスン音声のグローバルなオン/オフ。設定として永続化し、
/// 次レッスンにも引き継ぐ。デフォルトはオン（自動再生）。
///
/// Copied from [AudioEnabled].
@ProviderFor(AudioEnabled)
final audioEnabledProvider =
    AutoDisposeNotifierProvider<AudioEnabled, bool>.internal(
      AudioEnabled.new,
      name: r'audioEnabledProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$audioEnabledHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$AudioEnabled = AutoDisposeNotifier<bool>;
String _$audioSpeedHash() => r'9b7d1abe731cac7f9ae9a9e838252ff6dfa40449';

/// レッスン音声の再生速度（倍速）。設定として永続化し、次レッスンにも
/// 引き継ぐ。デフォルトは等速（1.0倍）。
///
/// Copied from [AudioSpeed].
@ProviderFor(AudioSpeed)
final audioSpeedProvider =
    AutoDisposeNotifierProvider<AudioSpeed, double>.internal(
      AudioSpeed.new,
      name: r'audioSpeedProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$audioSpeedHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$AudioSpeed = AutoDisposeNotifier<double>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
