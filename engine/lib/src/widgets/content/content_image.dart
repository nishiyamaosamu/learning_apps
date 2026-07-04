import 'package:flutter/material.dart';

/// コンテンツの画像。アセットが見つからない場合はプレースホルダを表示する。
///
/// [enableZoom] が true（既定）のときはタップで全画面のズームビューア
/// （[_ImageZoomView]）を開き、ピンチ/ダブルタップで拡大して見られる。
class ContentImage extends StatelessWidget {
  const ContentImage({
    super.key,
    required this.assetPath,
    this.borderRadius = const BorderRadius.all(Radius.circular(8)),
    this.fit = BoxFit.fitWidth,
    this.alignment = Alignment.center,
    this.enableZoom = true,
  });

  /// 画像アセットの完全パス（例: 'contents/lessons/images/2-1.jpeg'）。
  final String assetPath;

  /// 画像の角丸。カード内に全幅で敷き込む場合は [BorderRadius.zero] を渡し、
  /// 角丸は外側のカード側のクリップに任せる。
  final BorderRadius borderRadius;

  /// 画像のフィット方法。高さ制約内で縮めたい場合は [BoxFit.contain] を渡す。
  final BoxFit fit;

  /// フィット後の配置。縮小時に下端へ寄せたい場合は [Alignment.bottomCenter] など。
  final Alignment alignment;

  /// タップで全画面ズームビューアを開けるようにするか。
  final bool enableZoom;

  void _openZoom(BuildContext context) {
    Navigator.of(context, rootNavigator: true).push(
      PageRouteBuilder(
        opaque: false,
        // 背景の暗転はビューア側がドラッグ量に応じて描くため、ここは透明にする。
        barrierColor: Colors.transparent,
        fullscreenDialog: true,
        transitionDuration: const Duration(milliseconds: 200),
        pageBuilder: (_, _, _) => _ImageZoomView(assetPath: assetPath),
        transitionsBuilder: (_, animation, _, child) =>
            FadeTransition(opacity: animation, child: child),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final image = ClipRRect(
      borderRadius: borderRadius,
      child: Image.asset(
        assetPath,
        fit: fit,
        alignment: alignment,
        errorBuilder: (context, error, stackTrace) {
          final theme = Theme.of(context);
          return Container(
            height: 120,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceContainerHighest,
              borderRadius: borderRadius,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.image_outlined),
                const SizedBox(height: 4),
                Text(assetPath, style: theme.textTheme.bodySmall),
              ],
            ),
          );
        },
      ),
    );

    if (!enableZoom) return image;

    return GestureDetector(
      // タップは縦スワイプ（ページ送り）と競合しないため、カード上の画像でも
      // 安全に拾える。
      onTap: () => _openZoom(context),
      child: image,
    );
  }
}

/// 画像を全画面で拡大表示するビューア。
///
/// ピンチ/ダブルタップで拡大・縮小できる。等倍のときは下（または上）スワイプで
/// 画像が指に追従して動き、背景が徐々に透けていく。一定量・速度を超えて離すと
/// 画像がそのままストンと画面外へ落ちて閉じる（最近のSNSの画像ビューアと同じ）。
/// 拡大中は [InteractiveViewer] のパンを優先し、スワイプ閉じは無効にする。
class _ImageZoomView extends StatefulWidget {
  const _ImageZoomView({required this.assetPath});

  final String assetPath;

  @override
  State<_ImageZoomView> createState() => _ImageZoomViewState();
}

class _ImageZoomViewState extends State<_ImageZoomView>
    with SingleTickerProviderStateMixin {
  final _transform = TransformationController();

  /// 指を離した後の「跳ね戻り」または「落として閉じる」アニメーション。
  late final AnimationController _settle = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 240),
  );
  Animation<Offset>? _settleAnim;

  /// ダブルタップで等倍⇄2.5倍をトグルするためのタップ位置。
  TapDownDetails? _doubleTapDetails;

  /// スワイプ閉じ中の画像の移動量（指に追従、または settle アニメの現在値）。
  Offset _drag = Offset.zero;

  /// 現在拡大中（等倍より大きい）か。拡大中はスワイプ閉じを無効化する。
  bool _scaled = false;

  /// これ以上ドラッグして離したら閉じる距離・速度のしきい値。
  static const double _dismissDistance = 110;
  static const double _dismissVelocity = 700;

  @override
  void initState() {
    super.initState();
    _transform.addListener(_onTransform);
    _settle.addListener(() {
      final a = _settleAnim;
      if (a != null) setState(() => _drag = a.value);
    });
  }

  @override
  void dispose() {
    _settle.dispose();
    _transform.dispose();
    super.dispose();
  }

  void _onTransform() {
    final scaled = _transform.value.getMaxScaleOnAxis() > 1.01;
    if (scaled != _scaled) setState(() => _scaled = scaled);
  }

  /// ドラッグ量に応じた背景の不透明度（離れるほど透ける）。
  double get _backdropOpacity =>
      (1 - _drag.dy.abs() / 360).clamp(0.0, 1.0);

  /// 下方向に引くほど画像をわずかに縮める（落ちていく感覚を補強する）。
  double get _imageScale =>
      _drag.dy <= 0 ? 1.0 : (1 - _drag.dy / 1200).clamp(0.88, 1.0);

  void _onDragStart(DragStartDetails _) {
    _settle.stop();
    _settleAnim = null;
  }

  void _onDragUpdate(DragUpdateDetails d) {
    setState(() => _drag += d.delta);
  }

  void _onDragEnd(DragEndDetails d) {
    final dy = _drag.dy;
    final vy = d.velocity.pixelsPerSecond.dy;
    final shouldDismiss =
        dy.abs() > _dismissDistance || vy.abs() > _dismissVelocity;

    if (shouldDismiss) {
      // 動いていた向き（なければ速度の向き）へそのまま画面外まで落とす。
      final dir = dy != 0 ? dy.sign : (vy >= 0 ? 1.0 : -1.0);
      final screenH = MediaQuery.of(context).size.height;
      _runSettle(
        Offset(_drag.dx, dir * screenH),
        Curves.easeIn,
        thenPop: true,
      );
    } else {
      // しきい値未満は元の位置へ跳ね戻す。
      _runSettle(Offset.zero, Curves.easeOut);
    }
  }

  void _runSettle(Offset end, Curve curve, {bool thenPop = false}) {
    _settleAnim = _settle.drive(
      Tween(begin: _drag, end: end).chain(CurveTween(curve: curve)),
    );
    _settle.forward(from: 0).then((_) {
      if (thenPop && mounted) Navigator.of(context).maybePop();
    });
  }

  void _handleDoubleTap() {
    if (_transform.value != Matrix4.identity()) {
      _transform.value = Matrix4.identity();
      return;
    }
    final pos = _doubleTapDetails?.localPosition;
    if (pos == null) return;
    const scale = 2.5;
    _transform.value = Matrix4.identity()
      ..translateByDouble(-pos.dx * (scale - 1), -pos.dy * (scale - 1), 0, 1)
      ..scaleByDouble(scale, scale, scale, 1);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          // ドラッグ量に追従して透けていく背景。タップでも閉じる。
          Positioned.fill(
            child: GestureDetector(
              onTap: () => Navigator.of(context).maybePop(),
              child: ColoredBox(
                color: Colors.black.withValues(alpha: _backdropOpacity),
              ),
            ),
          ),
          Positioned.fill(
            child: Transform.translate(
              offset: _drag,
              child: Transform.scale(
                scale: _imageScale,
                child: GestureDetector(
                  // 拡大中は InteractiveViewer のパンに任せ、スワイプ閉じは止める。
                  onVerticalDragStart: _scaled ? null : _onDragStart,
                  onVerticalDragUpdate: _scaled ? null : _onDragUpdate,
                  onVerticalDragEnd: _scaled ? null : _onDragEnd,
                  onDoubleTapDown: (d) => _doubleTapDetails = d,
                  onDoubleTap: _handleDoubleTap,
                  child: InteractiveViewer(
                    transformationController: _transform,
                    minScale: 1,
                    maxScale: 5,
                    // 等倍のときは外側のスワイプ閉じへジェスチャーを譲る。
                    panEnabled: _scaled,
                    child: Center(
                      child: Image.asset(widget.assetPath, fit: BoxFit.contain),
                    ),
                  ),
                ),
              ),
            ),
          ),
          // 閉じるボタン。
          Positioned(
            top: 0,
            right: 0,
            child: SafeArea(
              child: IconButton(
                icon: const Icon(Icons.close),
                color: Colors.white,
                onPressed: () => Navigator.of(context).maybePop(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
