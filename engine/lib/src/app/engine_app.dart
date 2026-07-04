import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app_config.dart';
import '../content/content_providers.dart';
import '../design/app_colors.dart';
import '../design/app_primary.dart';
import '../design/app_theme.dart';
import '../routing/router.dart';

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
    final colors = AppColors.light(
      primary: config.brandPrimary ?? AppPrimarySwatch.focusBlue,
    );

    return ProviderScope(
      overrides: [appConfigProvider.overrideWithValue(config)],
      child: MaterialApp.router(
        title: config.title,
        theme: buildEngineTheme(colors),
        routerConfig: _router,
      ),
    );
  }
}
