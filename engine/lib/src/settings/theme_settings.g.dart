// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'theme_settings.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$themeModeSettingHash() => r'f51125a7dd82d049c84c98578967d2a515d53ef5';

/// アプリの配色モード（システム追従／ライト／ダーク）。設定として永続化し、
/// 次回起動にも引き継ぐ。デフォルトはシステム追従（[ThemeMode.system]）。
///
/// [MaterialApp] のルートで購読され `themeMode` に配線される。テーマ構築自体は
/// `buildEngineTheme` が担い、この Notifier は「どのテーマを使うか」だけを保持する。
///
/// 永続化の真実は SharedPreferences 側にあり、コールドスタート時に復元する。
/// 保存フォーマットは [ThemeMode.name]（'system' / 'light' / 'dark'）。
///
/// Copied from [ThemeModeSetting].
@ProviderFor(ThemeModeSetting)
final themeModeSettingProvider =
    AutoDisposeNotifierProvider<ThemeModeSetting, ThemeMode>.internal(
      ThemeModeSetting.new,
      name: r'themeModeSettingProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$themeModeSettingHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$ThemeModeSetting = AutoDisposeNotifier<ThemeMode>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
