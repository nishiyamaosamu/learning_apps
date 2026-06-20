import 'dart:async';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../../avatar/talking_avatar.dart';

/// 喋るアバターの開発用ビューア（debug専用）。
///
/// 既存の「アニメビューア」は phase をステップする静的なものだが、喋りは
/// 連続ループのため制御モデルが異なる。ここでは以下を確認・調整できる：
///
/// - 「話す/停止」トグルで口パクの開始/停止
/// - 手動モードで4状態（目開閉×口開閉）を静止確認
/// - 口パク速度・まばたき間隔のスライダー調整
/// - サンプル音声を再生し、再生中だけ喋らせて雰囲気を先取り確認
///
/// 設定タブの debug エントリから開く（`/dev/avatar`）。release ではエントリを出さない。
class AvatarViewer extends StatefulWidget {
  const AvatarViewer({super.key});

  /// engine 同梱のサンプル音声（apps/ipa_ip のナレーション1本を複製したもの）。
  static const _sampleAudio = 'packages/engine/lib/audio/teacher_sample.mp3';

  @override
  State<AvatarViewer> createState() => _AvatarViewerState();
}

class _AvatarViewerState extends State<AvatarViewer> {
  final _audio = AudioPlayer()..audioCache = AudioCache(prefix: '');
  StreamSubscription<void>? _completeSub;

  /// 手動で4状態を確認するモード。
  bool _manual = false;
  bool _manualEyesClosed = false;
  bool _manualMouthClosed = true;

  /// 自動モードで喋っているか。
  bool _talking = false;

  /// サンプル音声を再生中か（再生中は _talking=true に追従）。
  bool _audioPlaying = false;

  /// 口パクの平均トグル間隔（ms）。小さいほど速い。
  double _mouthMs = 140;

  /// まばたきの平均間隔（ms）。
  double _blinkMs = 3800;

  @override
  void initState() {
    super.initState();
    // 同梱画像を先にデコードしておき、初回切替えのチラつきを防ぐ。
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      for (final asset in const [
        'lib/images/teacher_base.png',
        'lib/images/teacher_closed_eye.png',
        'lib/images/teacher_closed_mouse.png',
      ]) {
        precacheImage(AssetImage(asset, package: 'engine'), context);
      }
    });
    _completeSub = _audio.onPlayerComplete.listen((_) {
      if (!mounted) return;
      setState(() {
        _audioPlaying = false;
        _talking = false;
      });
    });
  }

  @override
  void dispose() {
    _completeSub?.cancel();
    _audio.dispose();
    super.dispose();
  }

  Future<void> _toggleSampleAudio() async {
    if (_audioPlaying) {
      await _audio.stop();
      setState(() {
        _audioPlaying = false;
        _talking = false;
      });
      return;
    }
    setState(() {
      _audioPlaying = true;
      _talking = true;
    });
    await _audio.play(AssetSource(AvatarViewer._sampleAudio));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('アバタービューア (debug)')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // アバター表示（正方形・中央）。
          Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 280),
              child: DecoratedBox(
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border.all(color: Theme.of(context).dividerColor),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: _manual
                      ? AvatarFace(
                          eyesClosed: _manualEyesClosed,
                          mouthClosed: _manualMouthClosed,
                        )
                      : TalkingAvatar(
                          talking: _talking,
                          mouthInterval:
                              Duration(milliseconds: _mouthMs.round()),
                          blinkInterval:
                              Duration(milliseconds: _blinkMs.round()),
                        ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),

          // 手動モード切替え。
          SwitchListTile(
            title: const Text('手動で状態を確認'),
            subtitle: const Text('4状態（目開閉×口開閉）を静止表示'),
            value: _manual,
            onChanged: (v) => setState(() => _manual = v),
          ),
          const Divider(),

          if (_manual) ..._manualControls() else ..._autoControls(),
        ],
      ),
    );
  }

  List<Widget> _manualControls() => [
        SwitchListTile(
          title: const Text('目を閉じる'),
          value: _manualEyesClosed,
          onChanged: (v) => setState(() => _manualEyesClosed = v),
        ),
        SwitchListTile(
          title: const Text('口を閉じる'),
          value: _manualMouthClosed,
          onChanged: (v) => setState(() => _manualMouthClosed = v),
        ),
      ];

  List<Widget> _autoControls() => [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FilledButton.icon(
              onPressed: _audioPlaying
                  ? null
                  : () => setState(() => _talking = !_talking),
              icon: Icon(_talking ? Icons.pause : Icons.play_arrow),
              label: Text(_talking ? '停止' : '話す'),
            ),
            const SizedBox(width: 12),
            FilledButton.tonalIcon(
              onPressed: _toggleSampleAudio,
              icon: Icon(_audioPlaying ? Icons.stop : Icons.music_note),
              label: Text(_audioPlaying ? '音声停止' : 'サンプル音声'),
            ),
          ],
        ),
        const SizedBox(height: 24),
        Text('口パク速度: ${_mouthMs.round()}ms（小さいほど速い）'),
        Slider(
          value: _mouthMs,
          min: 60,
          max: 320,
          divisions: 26,
          label: '${_mouthMs.round()}ms',
          onChanged: (v) => setState(() => _mouthMs = v),
        ),
        const SizedBox(height: 8),
        Text('まばたき間隔: ${(_blinkMs / 1000).toStringAsFixed(1)}s'),
        Slider(
          value: _blinkMs,
          min: 1000,
          max: 8000,
          divisions: 14,
          label: '${(_blinkMs / 1000).toStringAsFixed(1)}s',
          onChanged: (v) => setState(() => _blinkMs = v),
        ),
      ];
}

/// debug ビルドかどうか（release ではビューアのエントリを隠す）。
bool get isAvatarViewerEnabled => kDebugMode;
