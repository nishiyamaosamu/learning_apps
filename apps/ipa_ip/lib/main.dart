import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

import 'animations/registry.dart';

void main() {
  runApp(
    EngineApp(
      config: AppConfig(
        title: 'ITパスポート',
        primaryColor: Colors.teal,
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
