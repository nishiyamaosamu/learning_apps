import 'package:flutter/material.dart';

/// ホームタブの中身（追って構築）
class HomeTab extends StatelessWidget {
  const HomeTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('ホーム')),
      body: const Center(child: Text('学習カテゴリがここに表示されます')),
    );
  }
}
