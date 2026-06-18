import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../content/content_providers.dart';

/// 図解アニメの開発用ビューア（debug専用）。
///
/// [AppConfig.animations] に登録された全アニメを一覧から選び、phase を
/// スライダー/ボタンで動かして遷移も含めて目視確認できる。engine は
/// 各アニメの総 phase 数を知らないため、スライダー上限は [_maxPhase] 固定
/// （各ウィジェットは範囲外 step を内部でクランプする想定）。
///
/// 設定タブの debug エントリから開く（`/dev/animations`）。release ビルドでは
/// エントリ自体を出さない。
class AnimationViewer extends ConsumerStatefulWidget {
  const AnimationViewer({super.key});

  static const _maxPhase = 8;

  @override
  ConsumerState<AnimationViewer> createState() => _AnimationViewerState();
}

class _AnimationViewerState extends ConsumerState<AnimationViewer> {
  String? _key;
  int _step = 0;

  @override
  Widget build(BuildContext context) {
    final animations = ref.watch(appConfigProvider).animations;
    final keys = animations.keys.toList();
    final selected = _key ?? (keys.isEmpty ? null : keys.first);

    return Scaffold(
      appBar: AppBar(title: const Text('アニメビューア (debug)')),
      body: keys.isEmpty
          ? const Center(
              child: Padding(
                padding: EdgeInsets.all(24),
                child: Text(
                  'AppConfig.animations にアニメが登録されていません。\n'
                  'apps/{app}/lib/animations/registry.dart を確認してください。',
                  textAlign: TextAlign.center,
                ),
              ),
            )
          : Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // アニメ選択。
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      for (final k in keys)
                        ChoiceChip(
                          label: Text(k),
                          selected: k == selected,
                          onSelected: (_) => setState(() {
                            _key = k;
                            _step = 0;
                          }),
                        ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // engine の表示枠と同じ 16:9。
                  AspectRatio(
                    aspectRatio: 16 / 9,
                    child: animations[selected]!(context, _step),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    'phase: $_step',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  Slider(
                    value: _step.toDouble(),
                    min: 0,
                    max: AnimationViewer._maxPhase.toDouble(),
                    divisions: AnimationViewer._maxPhase,
                    label: '$_step',
                    onChanged: (v) => setState(() => _step = v.round()),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      FilledButton.tonal(
                        onPressed:
                            _step > 0 ? () => setState(() => _step--) : null,
                        child: const Text('戻る'),
                      ),
                      const SizedBox(width: 12),
                      FilledButton(
                        onPressed: _step < AnimationViewer._maxPhase
                            ? () => setState(() => _step++)
                            : null,
                        child: const Text('進む'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
    );
  }
}

/// debug ビルドかどうか（release ではビューアのエントリを隠す）。
bool get isDebugBuild => kDebugMode;
