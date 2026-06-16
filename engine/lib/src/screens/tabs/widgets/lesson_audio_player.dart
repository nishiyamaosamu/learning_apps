import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';

/// 本文ナレーション音声の再生バー。
///
/// ページ表示時（[autoPlay] が true のとき）に自動再生し、
/// 再生/一時停止ボタンで操作できる。アセットの読み込みに失敗しても
/// UI は維持し、ボタンから再試行できる。
class LessonAudioPlayer extends StatefulWidget {
  const LessonAudioPlayer({
    super.key,
    required this.assetPath,
    this.autoPlay = true,
  });

  /// アセットの完全パス（例: `contents/lessons/audios/2-1.mp3`）。
  final String assetPath;

  /// 初回表示時に自動再生するか。
  final bool autoPlay;

  @override
  State<LessonAudioPlayer> createState() => _LessonAudioPlayerState();
}

class _LessonAudioPlayerState extends State<LessonAudioPlayer> {
  // pubspec に登録したアセットパスをそのままキーとして解決するため、
  // 既定の 'assets/' プレフィックスを無効化する。
  final _player = AudioPlayer()..audioCache = AudioCache(prefix: '');

  PlayerState _state = PlayerState.stopped;

  @override
  void initState() {
    super.initState();
    _player.onPlayerStateChanged.listen((s) {
      if (mounted) setState(() => _state = s);
    });
    if (widget.autoPlay) {
      _playFromStart();
    }
  }

  @override
  void dispose() {
    _player.dispose();
    super.dispose();
  }

  Future<void> _playFromStart() async {
    try {
      await _player.play(AssetSource(widget.assetPath));
    } catch (_) {
      // アセット未登録・再生不可など。UI は維持し再試行に委ねる。
    }
  }

  Future<void> _toggle() async {
    switch (_state) {
      case PlayerState.playing:
        await _player.pause();
      case PlayerState.paused:
        await _player.resume();
      default:
        await _playFromStart();
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final playing = _state == PlayerState.playing;

    return Material(
      color: theme.colorScheme.primaryContainer.withValues(alpha: 0.4),
      borderRadius: BorderRadius.circular(24),
      child: InkWell(
        onTap: _toggle,
        borderRadius: BorderRadius.circular(24),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                playing ? Icons.pause_circle : Icons.play_circle,
                color: theme.colorScheme.primary,
                size: 28,
              ),
              const SizedBox(width: 8),
              Text(
                playing ? '再生中' : '音声を再生',
                style: theme.textTheme.labelLarge
                    ?.copyWith(color: theme.colorScheme.onPrimaryContainer),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
