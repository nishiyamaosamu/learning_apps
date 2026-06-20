import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

import 'app_design.dart';
import 'animations/registry.dart';

void main() {
  runApp(
    EngineApp(
      config: AppConfig(
        title: 'ITパスポート',
        designScheme: ipaIpDesignScheme,
        tabs: [
          EngineTab.home,
          EngineTab.lesson,
          EngineTab.exercise,
          EngineTab.anki,
          EngineTab.settings,
        ],
        animations: animationsRegistry,
      ),
    ),
  );
}
