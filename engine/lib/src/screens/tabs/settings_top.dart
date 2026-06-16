import 'package:flutter/material.dart';

/// 設定タブのトップ（追って構築）
class SettingsTop extends StatelessWidget {
  const SettingsTop({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('設定')),
      body: const Center(child: Text('設定項目がここに表示されます')),
    );
  }
}
