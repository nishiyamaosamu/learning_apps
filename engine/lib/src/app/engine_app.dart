import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app_config.dart';
import '../content/content_providers.dart';
import '../routing/router.dart';

class EngineApp extends StatelessWidget {
  const EngineApp({super.key, required this.config});

  final AppConfig config;

  @override
  Widget build(BuildContext context) {
    final router = buildRouter(config);

    return ProviderScope(
      overrides: [appConfigProvider.overrideWithValue(config)],
      child: MaterialApp.router(
        title: config.title,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: config.primaryColor),
        ),
        routerConfig: router,
      ),
    );
  }
}
