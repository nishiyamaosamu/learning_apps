import 'package:engine/engine.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(
    EngineApp(
      config: AppConfig(
        title: '情報セキュリティマネジメント',
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
