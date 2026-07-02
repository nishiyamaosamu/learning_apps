import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

import 'app_design.dart';

void main() {
  runApp(
    EngineApp(
      config: AppConfig(
        title: '情報セキュリティマネジメント',
        designScheme: ipaSgDesignScheme,
        tabs: [
          EngineTab.lesson,
          EngineTab.exercise,
          EngineTab.anki,
          EngineTab.settings,
        ],
      ),
    ),
  );
}
