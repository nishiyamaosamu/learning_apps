import 'package:engine/engine.dart';
import 'package:flutter/widgets.dart';

import 'tcp_handshake.dart';
import 'tcp_ip_model.dart';

/// レッスン図解アニメのレジストリ（キー↔ウィジェット）。
///
/// レッスンJSONの `animationKey` がここのキーと対応する。engine は現在の
/// phase（最新ステップの `animationStep`）を `step` として渡す。
///
/// 新しいアニメを追加したら、ここに1行登録する（lesson-animation スキルが
/// 自動で追記する）。各ウィジェットの `phaseCount` がそのアニメの phase 数。
const Map<String, LessonAnimationBuilder> animationsRegistry = {
  'tcp_handshake': _tcpHandshake,
  'tcp_ip_model': _tcpIpModel,
};

// const マップに入れるためトップレベル関数として定義する。
Widget _tcpHandshake(BuildContext context, int step) =>
    TcpHandshakeAnimation(step: step);

Widget _tcpIpModel(BuildContext context, int step) =>
    TcpIpModelAnimation(step: step);
