/// 図解アニメ共通プリミティブ（基本機構）のまとめ export。
///
/// アニメの「実体」（個別の図解ウィジェット）は app 側 `lib/animations/` に
/// 置くが、その土台となる汎用部品とモーショントークンは engine が提供して
/// 全アプリで共有する。app 側のアニメウィジェットは
/// `import 'package:engine/engine.dart';` だけで全部品を使える
/// （engine.dart がこのファイルを再 export している）。
///
/// 各アニメはこれらを phase（step）で組み合わせて作る。
library;

export 'animated_arrow.dart';
export 'diagram.dart';
export 'motion.dart';
export 'moving_dot.dart';
export 'node_box.dart';
export 'phase_reveal.dart';
