---
name: lesson-animation
description: >-
  Create diagram animations that help learners understand lesson concepts in the
  Flutter learning-apps engine (this repo: engine/ + apps/). Use this WHENEVER the
  user wants to add, build, or design an animated diagram, figure, or visual
  explanation for a lesson — e.g. "make a TCP handshake animation", "animate the
  OSI model stacking up", "add a figure that shows how routing works", "lesson 5
  needs a moving diagram", or any request to show a concept "with motion / as an
  animation / 図解 / アニメ / 動きで". Animations are authored as Flutter widgets on
  the app side (apps/{app}/lib/animations/) and referenced from lesson JSON by
  animationKey. Trigger even if the user doesn't say the word "animation" but
  clearly wants a concept shown visually with phased motion.
---

# lesson-animation

レッスンの概念を**段階的に動く図解**で見せる Flutter ウィジェットを作るスキル。ユーザーはアニメ制作のノウハウが無い前提で、このスキルが「型の選択 → 部品で組む → PNGで自己確認 → registry登録 → （指定時）レッスンJSON組込み」までやり切る。

## 前提（土台はすでにある）

engine/app には以下が実装済み。スキルは土台を作り直さず利用するだけ:

- `LessonScene.narration` の `animationKey`（シーン単位）、`LessonStep` の `animationStep`（phase）
- `AppConfig.animations`（`Map<String, LessonAnimationBuilder>`、`LessonAnimationBuilder = Widget Function(BuildContext, int step)`）
- レッスン再生側：アニメモードのシーンは上部 16:9 固定枠にウィジェットを描画し、表示中の最新 step の `animationStep` を `step` として渡す
- engine 側：図解アニメの共通プリミティブ（基本機構）は `engine/lib/src/animations/`（`DiagramCanvas`/`NodeBox`/`AnimatedArrow`/`MovingDot`/`PhaseReveal`・モーショントークン）。`package:engine/engine.dart` から re-export 済みで、app 側はこれを import するだけで全部使える
- app 側：`apps/ipa_ip/lib/animations/`（個別アニメの実体、`registry.dart`、`main.dart` 配線済み）
- 検証ハーネス：`apps/ipa_ip/test/support/render_phases.dart`

構造仕様はリポジトリの `docs/LESSON.md` の「アニメモード」を正とする。対象アプリは既定 `apps/ipa_ip`（他アプリ指定があればそのパスに読み替える）。

## アニメウィジェットの契約（必ず守る）

1. `step`（int, 0始まり）を受け取る `StatelessWidget`。その phase の**到達状態**を描く。
2. phase の増減で**滑らかに遷移**する。明示的な `AnimationController` は不要 —— engine 提供の共通部品（`PhaseReveal`・`NodeBox.active`・`AnimatedArrow.active`・`MovingDot.active`）が暗黙アニメで遷移を担う。各部品に「この phase で出る/光る/動く」を `step >= n` の形で渡すだけでよい。
3. `static const phaseCount` に総 phase 数を持ち、ファイル先頭コメントに各 phase の意味を書く。
4. **枠いっぱいにスケール**する（固定ピクセル前提にしない）。`DiagramCanvas` を使えば 16:9 枠に収まる。
5. 色は `Theme.of(context).colorScheme` を使い、アプリのテーマに馴染ませる（原色ベタ塗りを避ける）。

## 共通プリミティブ（これで組む。ゼロから描かない）

`package:engine/engine.dart` を1つ import すれば全部使える（実体は `engine/lib/src/animations/`、`engine.dart` が re-export している）。詳細は各ソースの doc コメント参照。

- `DiagramCanvas(children: [...])` — 16:9 の土台 Stack。`DiagramCanvas.at(Offset(x,y), child:)` で割合座標(0..1)の中心に配置。
- `NodeBox(label:, icon?:, active:)` — 角丸ノード箱。`active` で点灯（「今ここ」を表す）。
- `AnimatedArrow(start:, end:, active:)` — 割合座標の2点を結ぶ矢印。`active` で伸びる。`Positioned.fill` 相当でCanvasに重ねる。
- `MovingDot(start:, end:, active:, label?:)` — 2点間を動く点（パケット/データ）。`active` で start→end。
- `PhaseReveal(step:, appearAt:, child:)` — `step>=appearAt` で子をフェードイン。注記やラベルの段階表示に。
- モーショントークン（`engine/lib/src/animations/motion.dart`）— **共通のモーショントークン**（`motionDuration` / `motionDurationLong` / `motionCurve` / `motionCurveAppear` / `motionCurveInOut`）。各部品は既定でこれらを使う。独自に duration/curve を指定したいときも、原則このトークンから選ぶ（1アニメ内で動きの速さ・イージングを揃えると洗練された印象になる）。バラバラの `Curves.easeOut` を直書きしない。

新しい汎用部品が必要になったら engine 側 `engine/lib/src/animations/` に追加し、`animation_primitives.dart`（barrel）に export を足して育てる（全アプリで再利用できる）。engine の freezed/riverpod ではないので再生成は不要。1アニメ専用の描画はそのウィジェット内に閉じる。

## 手順

### 1. 題材から「型」を選び phase を設計する
[references/archetypes.md](references/archetypes.md) のアーキタイプ（順次フロー / データの流れ / 積み上げ / 比較 / 状態遷移 / 分類）から最適な型を選ぶ。学習者が1タップごとに1つ理解を積めるよう **phase を分解**する（例: TCP = 0初期/1 SYN/2 SYN+ACK/3 ACK確立）。phase 数は 2〜5 が目安。

### 2. ウィジェットを書く
`apps/{app}/lib/animations/{key}.dart` に作る。`key` は snake_case（例 `tcp_handshake`）。`package:engine/engine.dart` を import し（共通部品はここから来る）、部品を `step` 連動で組む。先頭コメントに `phaseCount` と各 phase の意味を明記。参考実装: `apps/ipa_ip/lib/animations/tcp_handshake.dart`。

### 3. registry に登録
`apps/{app}/lib/animations/registry.dart` の `animationsRegistry` に1行追加:
```dart
'tcp_handshake': _tcpHandshake,
...
Widget _tcpHandshake(BuildContext context, int step) =>
    TcpHandshakeAnimation(step: step);
```
（`const` マップに入れるためトップレベル関数で包む。）

### 4. PNGで各phaseを確認し、自己修正する（必須）
見た目を「見る」唯一の手段。プレビューテストを作って実行し、出力PNGを Read で確認する。

`apps/{app}/test/animation_previews/{key}_preview_test.dart`:
```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:ipa_ip/animations/{key}.dart';
import '../support/render_phases.dart';

void main() {
  testWidgets('render {key} phases to png', (tester) async {
    await renderPhasesToPng(
      tester: tester,
      name: '{key}',
      phaseCount: {Widget}.phaseCount,
      builder: (context, step) => {Widget}(step: step),
    );
  });
}
```
実行（対象アプリのディレクトリで）:
```
cd apps/{app} && mise exec -- flutter test test/animation_previews/{key}_preview_test.dart
```
出力 `apps/{app}/animation_previews/{key}/phase_0.png …` を**全部 Read して目視確認**する。チェック観点: 配置が崩れていないか / phase が進むごとに意図通り展開するか / 要素が枠からはみ出ていないか / 色がテーマと馴染むか / 重なって読めない部分がないか。問題があればウィジェットを直して再実行。**納得いくまで繰り返してから次へ。**

**動き（遷移）も確認する**: 静止画は各 phase の到達状態しか見えない。`renderPhaseTransitions(...)`（同じ `support/render_phases.dart`）を使うと、phase 境界ごとに途中フレームを並べた**フィルムストリップ** `transition_{n}_to_{n+1}.png` が出る。これを Read して「動きが滑らかか / 速すぎ遅すぎないか / 途中で破綻しないか」を確認する。テスト例:
```dart
testWidgets('{key} transitions', (tester) async {
  await renderPhaseTransitions(
    tester: tester, name: '{key}',
    phaseCount: {Widget}.phaseCount,
    builder: (context, step) => {Widget}(step: step),
  );
});
```

重要 — **ハーネスは実機相当サイズ（既定 390×219, 16:9）で描く**。これより大きく描くと固定ptの文字が実機で折り返して切れるのに PNG では収まり、見落とす。`NodeBox` は1行に収まらないと自動縮小するが、長すぎるラベルは避ける。

注意: テキスト・アイコンは macOS の実フォントを読み込んで描画する（ハーネスが Arial Unicode と Material Icons を自動ロード）。もし豆腐(□)になる環境では、配置・色・phase進行の確認に使い、文言はソースで担保する。

### 5. （対象レッスン指定時のみ）レッスンJSONに組み込む
対象が指定されたら `apps/{app}/contents/lessons/{id}.json` の該当 narration シーンに `animationKey` を足し、各 step に `animationStep` を付ける。バリデーション:
- `animationStep` は 0 以上・シーン内で単調増加・最大値 < `phaseCount`
- 先頭 step の `animationStep` 省略は phase 0 とみなす
- 1タップ＝テキスト1つ＋アニメ1段、を基本に分解する（同 phase のまま説明を足す step も可）

指定が無ければ JSON は触らず、「`animationKey: '{key}'` で参照できる」ことと組込み例を伝える。

### 6. 仕上げ
対象アプリで `mise exec -- flutter analyze` を通す。engine 側に新規部品を足した場合は engine も `mise exec -- flutter analyze engine` で確認。

実機で遷移（動き）まで確認したいときは、アプリを debug 起動し **設定タブ →「開発ツール (debug) → アニメビューア」** を案内する（registry登録済みなら自動で出る）。登録済みアニメを選び、スライダー/「進む・戻る」で phase を動かして遷移を目視できる。release ビルドではこのエントリは出ない。

## やってはいけない
- engine 側に**アニメの実体**（個別の図解ウィジェット）を置く（汎用性が壊れる）。実体は必ず app 側 `lib/animations/`。※汎用プリミティブ（基本機構）は逆に engine 側 `engine/lib/src/animations/` が正。app 側に共通部品を再び作らない。
- 自動ループで常時動くアニメ（学習の段階同期が崩れ、負荷も上がる）。**タップ駆動・phaseの到達状態**で設計する。
- PNG確認を飛ばして「できました」と報告する。見ずに納品しない。
- 原色ベタ塗り・固定ピクセル決め打ち。テーマ色と枠フィットを使う。
