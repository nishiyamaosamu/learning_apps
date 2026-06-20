import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

/// 先生アバターの「顔」。目と口の開閉だけを受け取り、3枚のPNGを重ねて描く
/// 純粋な表示ウィジェット（自前のアニメーションは持たない）。
///
/// - ベース画像（teacher_base）は目開き・口開き。
/// - [eyesClosed] が true のとき teacher_closed_eye を重ねて目を閉じる。
/// - [mouthClosed] が true のとき teacher_closed_mouse を重ねて口を閉じる。
///
/// 3枚とも 1254×1254 の同一キャンバスでピクセル一致しているため、単純な
/// [Stack] で重ねるだけで合成できる。オーバーレイは常にツリーに置いたまま
/// [Opacity] で 0/1 を切り替える（= ハードカット）。こうすると初回表示時の
/// デコード遅延によるチラつきが出ない。
class AvatarFace extends StatelessWidget {
  const AvatarFace({
    super.key,
    required this.eyesClosed,
    required this.mouthClosed,
    this.size,
  });

  final bool eyesClosed;
  final bool mouthClosed;

  /// 1辺のサイズ（正方形）。null なら親に追従する（[AspectRatio] 1:1）。
  final double? size;

  static const _base = 'lib/images/teacher_base.png';
  static const _closedEye = 'lib/images/teacher_closed_eye.png';
  static const _closedMouth = 'lib/images/teacher_closed_mouse.png';
  static const _package = 'engine';

  static Widget _layer(String asset) => Image.asset(
        asset,
        package: _package,
        fit: BoxFit.contain,
      );

  @override
  Widget build(BuildContext context) {
    final face = Stack(
      fit: StackFit.expand,
      children: [
        _layer(_base),
        Opacity(opacity: mouthClosed ? 1 : 0, child: _layer(_closedMouth)),
        Opacity(opacity: eyesClosed ? 1 : 0, child: _layer(_closedEye)),
      ],
    );

    if (size == null) return AspectRatio(aspectRatio: 1, child: face);
    return SizedBox(width: size, height: size, child: face);
  }
}

/// 喋るアバター。[talking] が true の間だけ口をパクパクさせ、まばたきは
/// talking に関係なく常時ランダムに起こす（= 常に生きている）。
///
/// - 口: talking 中のみ、ランダム間隔で開閉をトグル。talking=false のアイドル時は
///   口を閉じて静止する。
/// - 目: 独立タイマーで数秒に1回、短時間だけ閉じる（まばたき）。
///
/// 速度・間隔は [mouthInterval] / [blinkInterval] を「中心値」として毎回
/// ランダムに揺らす（ロボットっぽさを避ける）。変更すると次のトグル/まばたきから
/// 反映される。
///
/// 将来このウィジェットをレッスン再生に組み込むときは、ナレーション音声の
/// 再生状態を [talking] に渡せば音声中だけ喋るようになる（今回は未配線）。
class TalkingAvatar extends StatefulWidget {
  const TalkingAvatar({
    super.key,
    required this.talking,
    this.mouthInterval = const Duration(milliseconds: 140),
    this.blinkInterval = const Duration(milliseconds: 3800),
    this.size,
  });

  final bool talking;

  /// 口パクの平均トグル間隔（実際は中心値として 0.6〜1.4 倍に揺らす）。
  final Duration mouthInterval;

  /// まばたきの平均間隔（実際は中心値として 0.6〜1.4 倍に揺らす）。
  final Duration blinkInterval;

  /// 1辺のサイズ（正方形）。null なら親に追従する。
  final double? size;

  @override
  State<TalkingAvatar> createState() => _TalkingAvatarState();
}

class _TalkingAvatarState extends State<TalkingAvatar> {
  final _rng = math.Random();

  Timer? _mouthTimer;
  Timer? _blinkTimer;

  bool _mouthOpen = false;
  bool _eyesClosed = false;

  /// まばたきで目を閉じている時間。
  static const _blinkDuration = Duration(milliseconds: 120);

  @override
  void initState() {
    super.initState();
    _scheduleBlink();
    if (widget.talking) _scheduleMouth();
  }

  @override
  void didUpdateWidget(TalkingAvatar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.talking == oldWidget.talking) return;
    if (widget.talking) {
      _scheduleMouth();
    } else {
      _mouthTimer?.cancel();
      _mouthTimer = null;
      setState(() => _mouthOpen = false); // アイドルは口閉じ。
    }
  }

  @override
  void dispose() {
    _mouthTimer?.cancel();
    _blinkTimer?.cancel();
    super.dispose();
  }

  /// 中心値 [base] を 0.6〜1.4 倍に揺らす。
  Duration _jitter(Duration base) {
    final ms = base.inMilliseconds * (0.6 + _rng.nextDouble() * 0.8);
    return Duration(milliseconds: ms.round());
  }

  void _scheduleMouth() {
    _mouthTimer = Timer(_jitter(widget.mouthInterval), () {
      setState(() => _mouthOpen = !_mouthOpen);
      _scheduleMouth();
    });
  }

  void _scheduleBlink() {
    _blinkTimer = Timer(_jitter(widget.blinkInterval), () {
      if (!mounted) return;
      setState(() => _eyesClosed = true);
      _blinkTimer = Timer(_blinkDuration, () {
        if (!mounted) return;
        setState(() => _eyesClosed = false);
        _scheduleBlink();
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return AvatarFace(
      eyesClosed: _eyesClosed,
      mouthClosed: !_mouthOpen,
      size: widget.size,
    );
  }
}
