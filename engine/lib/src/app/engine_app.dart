import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'app_config.dart';
import '../content/content_providers.dart';
import '../design/app_colors.dart';
import '../design/app_primary.dart';
import '../design/app_theme.dart';
import '../routing/router.dart';
import '../settings/theme_settings.dart';

class EngineApp extends StatefulWidget {
  const EngineApp({super.key, required this.config});

  final AppConfig config;

  @override
  State<EngineApp> createState() => _EngineAppState();
}

class _EngineAppState extends State<EngineApp> {
  late final _router = buildRouter(widget.config);

  @override
  void dispose() {
    _router.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final config = widget.config;

    return ProviderScope(
      overrides: [appConfigProvider.overrideWithValue(config)],
      child: _EngineMaterialApp(config: config, router: _router),
    );
  }
}

/// [ProviderScope] 配下で `themeMode` を購読するための内側ウィジェット。
///
/// ルート（[buildRouter] の結果）は再生成コストが高いため [_EngineAppState] が
/// State に保持し、ここへ受け渡す。テーマ（ライト／ダーク）はいずれも
/// [AppConfig.brandPrimary] の主色スワッチを反映して構築する。
class _EngineMaterialApp extends ConsumerWidget {
  const _EngineMaterialApp({required this.config, required this.router});

  final AppConfig config;
  final GoRouter router;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final swatch = config.brandPrimary ?? AppPrimarySwatch.focusBlue;
    final themeMode = ref.watch(themeModeSettingProvider);

    return MaterialApp.router(
      title: config.title,
      theme: buildEngineTheme(AppColors.light(primary: swatch)),
      darkTheme: buildEngineTheme(
        AppColors.dark(primary: swatch),
        brightness: Brightness.dark,
      ),
      themeMode: themeMode,
      routerConfig: router,
    );
  }
}
