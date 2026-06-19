# 図解アーキタイプ・カタログ

題材から「型」を選ぶための一覧。各型に「いつ使うか」「phase設計の指針」「使う部品」を示す。すべて `package:engine/engine.dart`（共通プリミティブ。実体は `engine/lib/src/animations/`）の部品で組める。phase は「1タップで1つ理解が積める」よう分解する（2〜5段が目安）。

座標は `DiagramCanvas` の割合座標(0..1)。左上(0,0)・右下(1,1)・中央(0.5,0.5)。

---

## 1. 順次フロー（手順・工程が順に進む）
**いつ**: 申請→承認→実行、入力→処理→出力、ライフサイクルなど「順番」が主役。
**phase**: 各工程の点灯を1phaseずつ。phase n で n 番目の `NodeBox` を `active`、間の `AnimatedArrow` を `active`。
**部品**: `NodeBox`（横/縦に並べる）＋ `AnimatedArrow`（隣接ノード間）。
**配置例**: 3工程を `at(0.2,0.5) / at(0.5,0.5) / at(0.8,0.5)`、矢印 `start(0.3,0.5) end(0.45,0.5)` …。

## 2. データ/パケットの流れ（ノード間を何かが移動する）
**いつ**: 通信（TCP・HTTP・ルーティング）、クライアント↔サーバ、データの受け渡し。
**phase**: 1往復＝1phase。phase n で n 番目の `MovingDot` を `active`（ラベルに SYN/ACK 等）。経路が複数あるときは縦にずらして重なりを防ぐ。
**部品**: 両端に `NodeBox`、`MovingDot`（ラベル付き）。確立/完了は `PhaseReveal` で注記。
**手本**: `apps/ipa_ip/lib/animations/tcp_handshake.dart`。

## 3. 階層・積み上げ（下から段が積み上がる）
**いつ**: OSI参照モデル、TCP/IP階層、メモリ階層、ピラミッド型の分類。
**phase**: 下の段から1phaseずつ出現。phase n までの段を `PhaseReveal(appearAt: 段index)` で表示。現在の段を `NodeBox.active` で強調しても良い。
**部品**: 縦に並べた `NodeBox`（横幅広め）を `Column` で。`DiagramCanvas` に `Align(bottomCenter)` 起点で積む。
**指針**: 各段は同じ幅・高さで揃え、ラベルは短く。下→上の順序が分かるよう左に層番号を添えても良い。

## 4. 比較・対応（2つを並べて違いを見せる）
**いつ**: 集中処理 vs 分散処理、同期 vs 非同期、長所/短所、Before/After。
**phase**: phase 0 で枠だけ → phase 1 で左 → phase 2 で右、のように対比要素を順に出す。または共通点→相違点の順。
**部品**: 左右2カラムを `NodeBox`/小見出しで構成、`PhaseReveal` で項目を段階表示。中央に区切り線（細い `Container`）。
**指針**: 左右の項目数・高さを揃えると対応が読み取りやすい。

## 5. 状態遷移（状態が切り替わる）
**いつ**: プロセス状態（実行/待機/停止）、トランザクション、信号・モードの変化。
**phase**: phase n で「現在の状態」ノードだけ `active`、遷移の矢印を `active`。前の状態は通常表示に戻す（active=false）。
**部品**: 円/角丸 `NodeBox` を環状や横並びに、状態間に `AnimatedArrow`。
**指針**: 「今どの状態か」が一目で分かるよう active は常に1つ。遷移条件のラベルを矢印近くに `PhaseReveal` で。

## 6. 集合・分類（包含・グルーピング）
**いつ**: 個人情報の分類、データの種類、ベン図的な包含関係、ツリー構造。
**phase**: 大分類→小分類の順、または要素を1つずつ枠へ入れていく。phase n で n 番目の要素/グループを `PhaseReveal`。
**部品**: グループ枠は薄い背景の `Container`（角丸）、要素は小さな `NodeBox`。ツリーは `AnimatedArrow` で親子を結ぶ。
**指針**: 重なり（ベン図）は半透明の円を重ねる `Stack`＋`Opacity`。色で分類を区別。

---

## phase 設計の共通ルール
- **1タップ＝1理解**: narration の各 step（説明文1つ）に対しアニメ1段、が基本。
- **到達状態で考える**: 「phase n のとき画面はこう」を各 phase について言葉で書き出してから実装する。`active`/`appearAt` は `step >= n` で素直に表す。
- **戻る対応は自動**: 部品は `step` の減少でも滑らかに戻るので、巻き戻しを別途実装しなくてよい。
- **詰め込みすぎない**: 1アニメで扱う要素は5〜7個まで。多いなら複数シーン（複数 animationKey）に分ける。

## 配色の指針
- 主役: `colorScheme.primary`、副次: `secondary`/`tertiary`。背景枠: `surfaceContainerLow`（`DiagramCanvas` 既定）。
- 「光らせる」は `active`（背景 alpha 0.16＋枠強調）で表現。原色のベタ塗りは避ける。
- 1アニメ内の色数は3色程度に抑えると学習者が要素を追いやすい。
