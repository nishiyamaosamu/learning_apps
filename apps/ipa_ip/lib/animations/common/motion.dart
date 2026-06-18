/// 図解アニメ共通の「動きの語彙」（モーショントークン）。
///
/// 全部品が同じ duration / curve を参照することで、1つのアニメ内の動きが
/// 揃い、「意図して設計された」洗練された印象になる（バラバラの easeOut より
/// まとまって見える）。Remotion の "consistent timing + custom bezier" の考え方を
/// Flutter に取り入れたもの。
library;

import 'package:flutter/animation.dart';

/// 標準の遷移時間（出入り・点灯など短い動き）。学習者が目で追える速さ。
const motionDuration = Duration(milliseconds: 450);

/// 距離のある動き（線が伸びる・点が移動する）向けの少し長い時間。
const motionDurationLong = Duration(milliseconds: 650);

/// 標準イージング：終端で素早く収束する snappy な easeOut。
/// Remotion 推奨の `bezier(0.16, 1, 0.3, 1)` 相当で、動きに「キレ」が出る。
const motionCurve = Cubic(0.16, 1, 0.3, 1);

/// 出現用：ごく控えめなオーバーシュート（行き過ぎてから収まる）。要素が
/// 「ぽんっ」と現れて生き生きする。強すぎると安っぽいので浅めにしてある。
const motionCurveAppear = Cubic(0.34, 1.32, 0.5, 1);

/// 往復・伸縮など双方向の動き向け（前半ゆっくり→後半収束）。
const motionCurveInOut = Cubic(0.65, 0, 0.35, 1);
