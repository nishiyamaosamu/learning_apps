import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(
    EngineApp(
      config: AppConfig(
        title: 'ITパスポート',
        tabs: [
          EngineTab.video,
          EngineTab.exercise,
          EngineTab.anki,
          EngineTab.settings,
        ],
      ),
    ),
  );
}
