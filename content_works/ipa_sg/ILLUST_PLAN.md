# SG動画 イラスト部品計画（ILLUST_PLAN）

[LESSON_PLAN.md](LESSON_PLAN.md) の全84レッスンを動画化するにあたり、**先に作り置きして使い回すアイコン・イラスト部品**の計画。
レッスンごとの一点物イラストを減らして制作を軽くするのが目的。

生成手順・スタイル規定・配置と命名の規則は `create-video-illust` スキル（[.claude/skills/create-video-illust/SKILL.md](../../.claude/skills/create-video-illust/SKILL.md)）に従う。部品は `content_works/video/public/images/ipa_sg/` に置く（フラット・接頭辞で分類。確認待ちは `draft/`）。レッスン固有の一点物も同じ場所に `l{n}-` 接頭辞で置く。

## 色の意味対応（SGコンテンツ固有）

生成プロンプトの「色の意味」にはこの対応を使う：

- 青＝守る側・正常（盾・サーバ・信頼できるもの）
- 赤／ピンク＝攻撃者・脅威・危険
- 緑＝OK・許可・安全確認
- 黄＝注意・警告・鍵や重要物
- グレー＝中立の機材・背景オブジェクト

## 優先度

- **S**：ほぼ全章で登場。最初に作る（約30点）
- **A**：特定の章のほぼ全レッスンで使う。章の制作前に作る
- **B**：数レッスンでしか使わないが、シーンの主役になるもの。都度作成でも可

---

## 1. 基本アイコン【優先度S】

全章横断で使う土台。これだけで説明シーンの大半を組める。

| 部品 | 内容 | 主な用途 |
|---|---|---|
| icon-shield ✅ | 盾（チェック入り。L1のheroの単体版） | 防御・対策全般 |
| icon-shield-broken | ひび割れた盾 | 脆弱性・対策の失敗 |
| icon-lock / icon-lock-open | 南京錠（施錠／開錠） | 機密性・暗号化・アクセス制御 |
| icon-key | 鍵1本 | 暗号鍵・パスワード |
| icon-key-pair ✅ | 色違いの鍵2本（青＝公開鍵・黄＝秘密鍵） | 公開鍵暗号・PKI（L11〜L14） |
| icon-document | 書類1枚（横線の本文） | 情報資産・規程・契約書 |
| icon-document-stack | 書類の束／台帳 | 情報資産台帳・文書管理（L16, L68, L75） |
| icon-folder | フォルダ | データ・分類 |
| icon-database ✅ | データベース円筒 | DB・個人情報データベース |
| icon-server | サーバラック | サーバ全般・ネットワーク図の部品 |
| icon-cloud | 雲 | クラウド（L15, L47, L78） |
| icon-laptop | ノートPC | 利用者端末 |
| icon-smartphone | スマートフォン | モバイル・多要素認証・MDM |
| icon-mail | 封筒 | メール（L8, L35, L53）・フィッシング |
| icon-browser | ブラウザ画面（ウィンドウ枠） | Web関連（L7, L54） |
| icon-network | ノードを線でつないだ網 | ネットワーク全般 |
| icon-building | オフィスビル | 会社・組織・A社（科目B） |
| icon-check | 緑チェックマーク | OK・適切な選択肢 |
| icon-cross | 赤バツ | NG・不適切な選択肢 |
| icon-warning ✅ | 黄色い警告三角（！） | 脅威・注意喚起 |
| icon-skull-bug | 虫＋ドクロ的なマルウェア汎用 | マルウェア一般（種類別は§3） |
| icon-magnifier | 虫めがね | 監査・検知・調査・分析 |
| icon-gear | 歯車 | 運用・設定・プロセス |
| icon-clipboard | チェックリスト付きクリップボード | 点検・計画・管理策 |
| icon-graph | 棒グラフ＋上向き矢印 | 評価指標・分析（L49, L64〜L66） |
| icon-scale | 天秤 | 法務全般（第5章） |
| icon-gavel | 木槌 | 罰則・刑法（L43） |
| icon-money | 硬貨／札束 | コスト・サイバー保険・会計（L18, L66） |
| icon-clock | 時計 | RTO/RPO・時間計算（L49, L51, L59, L74) |
| icon-backup | HDD／テープに巻き戻し矢印 | バックアップ（L19, L28, L51, L73, L74） |

## 2. 人物キャラ【優先度S】✅ 作成済み

シリーズ通しての「登場人物」。表情・ポーズ違いを最初に揃えると科目B（第8章）が特に楽になる。

全8キャラ・25ポーズを `content_works/video/public/images/ipa_sg/` に配置済み。ポーズの実名は下表のバリエーション列（`person-{キャラ}-{ポーズ}.png`、基本ポーズは接尾辞なし）。

| 部品 | 内容 | ポーズ（ファイル接尾辞） |
|---|---|---|
| person-leader ✅ | 情報セキュリティリーダー（主人公。社員証を下げた人物） | 通常／`-point`指差し解説／`-think`考え込む／`-idea`ひらめき |
| person-employee-f / -m ✅ | 一般社員（女性・男性の2種。会話シーン用） | `-point`指差し／`-worry`困り顔／`-laptop`PC操作中 |
| person-boss ✅ | 上司・経営層（決裁する人） | 通常（腕組み）／`-approve`承認（OKサイン＋決裁書類） |
| person-attacker ✅ | 攻撃者（フード＋ノートPCの定番シルエット） | 通常（PC操作）／`-mail`フィッシングメール送信／`-sneak`物陰から忍び寄る |
| person-insider ✅ | 内部不正者（社員の見た目＋暗いオーラ） | 通常（企み顔）／`-laptop`データ持ち出し操作／`-sneak`USBを隠し持つ |
| person-auditor ✅ | 監査人（女性・ジャケット） | 通常（資料持ち）／`-magnifier`虫めがね／`-checklist`点検リスト |
| person-vendor ✅ | 委託先・外部業者（作業服） | 通常（かばん）／`-card`名刺を出す |
| person-customer ✅ | 顧客・本人（個人情報の主体） | 通常（手を振る）／`-worry`不安顔 |

## 3. 脅威・攻撃の部品【優先度A／第1章・第3章・第8章】

第1章（L3〜L10）は攻撃手法の説明が続くので、ここが最も点数が要る。

| 部品 | 内容 | 主な用途 |
|---|---|---|
| malware-virus | ウイルス（トゲトゲ球体） | L4 |
| malware-worm | ワーム（芋虫が自己複製） | L4 |
| malware-trojan | トロイの木馬（木馬） | L4 |
| malware-bot | ボット（操り人形／リモコン付きPC） | L4, L9 |
| malware-ransom | ランサムウェア（鎖と錠のかかったファイル＋身代金要求） | L4, L5, L28, L80 |
| malware-spyware | スパイウェア（覗き見する目） | L4 |
| attack-phishing | 釣り針に引っかかった封筒／ID | L8, L10, L35, L80 |
| attack-mitm | 通信線の途中に割り込む攻撃者 | L8, L34 |
| attack-dos | サーバに矢印が殺到してパンク | L9 |
| attack-targeted | 的（ダーツボード）＋矢 | L9（標的型・APT） |
| attack-password | 鍵穴に総当たりする鍵の束 | L6 |
| attack-injection | 入力フォームに注射器 | L7, L38 |
| attack-eavesdrop | 通信線に聞き耳（盗聴） | L3, L8 |
| attack-spoofing | お面をかぶったなりすまし | L3, L8, L12 |
| attack-social | 肩越しに画面を覗く／電話で騙す | L3, L27 |
| attack-ai | ロボット顔の攻撃者／ディープフェイクの仮面 | L10 |
| threat-fire-quake | 火事・地震（災害系脅威） | L2, L19, L33, L63 |

## 4. 防御・技術の部品【優先度A／第1章後半・第3章・第4章】

| 部品 | 内容 | 主な用途 |
|---|---|---|
| tech-firewall | レンガ壁＋炎 | L30, L36 |
| tech-ids | サイレン／監視センサー | L30（IDS/IPS）, L76 |
| tech-vpn-tunnel | 2点を結ぶ保護されたトンネル | L34, L36, L55 |
| tech-cert | リボン付き証明書 | L14（PKI）, L44 |
| tech-ca | 認証局（証明書を発行するビル＋ハンコ） | L14 |
| tech-signature | 書類＋ペンと封蝋（デジタル署名） | L12, L44 |
| tech-hash | 文書→ミキサー→短い文字列（ハッシュ） | L11, L12 |
| tech-encrypt | 平文→鍵→暗号文（3コマ横並び） | L11 |
| tech-fingerprint | 指紋 | L13（生体認証） |
| tech-face-id | 顔認証の枠付き顔 | L13 |
| tech-otp | ワンタイムパスワードのトークン（数字表示） | L13 |
| tech-badge | 社員証・入館証（ICカード） | L13, L33, L71 |
| tech-camera | 監視カメラ | L33, L71 |
| tech-gate | フラッパーゲート・入退室扉 | L33, L71 |
| tech-cabinet | 施錠できる書庫・キャビネット | L33, L75 |
| tech-usb | USBメモリ | L33, L75（可搬媒体） |
| tech-shredder | シュレッダー／溶解箱 | L33, L77（媒体処分） |
| tech-log | ログの巻物／流れる行 | L29, L37, L76 |
| tech-patch | 絆創膏（パッチ適用） | L29, L76 |
| tech-quarantine | 検疫の柵に入ったPC | L29 |
| tech-honeypot | 蜜壺（ハニーポット） | L36 |
| tech-masking | 一部が黒塗り／モザイクの個人データ表 | L32, L42, L79（匿名加工） |
| tech-forensic | 証拠品袋に入ったHDD | L32, L81 |

## 5. 管理・組織の部品【優先度A／第2章・第7章・第8章】

| 部品 | 内容 | 主な用途 |
|---|---|---|
| mgmt-pdca | PDCAの循環矢印（4分割円） | L21, L63, L84 |
| mgmt-pyramid | 3層ピラミッド（方針・対策基準・実施手順） | L20 |
| mgmt-risk-matrix | 縦横2軸のマトリックス（色分きマス） | L17, L69 |
| mgmt-balance-risk | リスクの4対応（避ける・渡す・持つ・減らす）の4コマ用小物：迂回矢印・手渡し・抱える・盾で軽減 | L18, L57, L70 |
| mgmt-csirt | 消防士風チーム／緊急対応バッジ | L23, L80, L81 |
| mgmt-soc | モニターが並ぶ監視室 | L23, L31 |
| mgmt-education | 教壇と受講者（研修） | L27, L82 |
| mgmt-contract | 契約書＋2人の握手 | L27, L45, L77 |
| mgmt-committee | 会議テーブルを囲む人々 | L20, L23 |
| mgmt-escalation | 上へ報告する階段矢印 | L58, L80 |
| mgmt-servicedesk | ヘッドセットの窓口担当 | L58 |
| mgmt-bcp | 折れたビルから復旧する矢印／非常口 | L19, L63 |
| mgmt-cert-badge | ISMS認証マーク風の盾バッジ | L21, L22 |

## 6. IT基礎の部品【優先度A／第4章・第6章】

ネットワーク図を組むための「機材セット」。L52〜L56や前提知識ページ（L7・L8・L14・L30・L34〜L36の冒頭）で繰り返し使う。

| 部品 | 内容 | 主な用途 |
|---|---|---|
| net-router | ルータ（矢印の交差する箱） | L52 |
| net-switch | スイッチ（ポートの並ぶ箱） | L52 |
| net-ap | 無線LANアクセスポイント（電波マーク付き） | L56 |
| net-dns | 電話帳を持つサーバ（名前→番号） | L8, L52 |
| net-mailserver | 封筒マーク付きサーバ | L35, L53 |
| net-proxy | 中継役のサーバ（受け渡し） | L36, L54 |
| net-globe | 地球儀（インターネット） | 全ネットワーク図 |
| net-packet | 小包（パケット） | L52, L30 |
| net-wifi-waves | 電波（3本弧） | L55, L56 |
| net-raid | ディスクが複数並んだ箱 | L48 |
| net-dual | 2台並びのサーバ（冗長化） | L48, L59 |
| icon-ip-address | 番地札（住所プレート） | L52（IPアドレス） |

## 7. 科目B・ケース演習の部品【優先度A／第8章】

第8章18レッスンは「A社のケース」を毎回描く。舞台セットとして共通化する。

| 部品 | 内容 | 主な用途 |
|---|---|---|
| scene-office | A社オフィスの俯瞰（島型デスク＋サーバ室＋入口） | 第8章全レッスンの導入 |
| scene-serverroom | サーバ室（ラック＋施錠扉） | L71, L73 |
| scene-entrance | 受付＋フラッパーゲート | L71 |
| scene-meeting ✅ | 会議室（ケース検討の場面） | 第8章の判断ポイント解説 |
| scene-desk-work | リーダーがPCと台帳に向かう作業机 | L68, L69, L76 |
| scene-incident | 赤い警告の出たPCと駆けつける人 | L80, L81 |
| prop-ledger | 情報資産台帳（表組みの帳簿） | L68, L69 |
| prop-thermometer | リスク値のメーター（低↔高） | L69, L70, L78 |
| prop-timeline | 時間軸の帯（障害→復旧、RPO/RTO用） | L74 |
| prop-calendar | カレンダー（取得サイクル・スケジュール） | L73, L51 |

## 8. 法務・その他の部品【優先度B／第5章・第7章】

| 部品 | 内容 | 主な用途 |
|---|---|---|
| law-book | 六法風の分厚い本 | 第5章全般 |
| law-copyright | ©マーク＋作品（本・音楽・コード） | L39 |
| law-privacy | 個人情報（顔＋名前カードを守る手） | L41, L42 |
| law-mynumber | マイナンバーカード風カード | L42 |
| law-police | 手錠／パトランプ（犯罪・摘発） | L40, L43 |
| law-globe-eu | EU旗風の星円（GDPR） | L42 |
| biz-chart-pareto | パレート図・特性要因図の白地図版 | L64 |
| biz-decision-tree | 分岐する木 | L65 |
| biz-bs-sheet | 貸借対照表風の2分割ボックス | L66 |
| biz-gantt | 帯が並ぶ工程表 | L57 |

---

## 制作の進め方

1. **§1・§2（優先度S、約40点）を最初にまとめて生成**。以降の全動画の土台になる
2. 章の動画制作に入る前に、その章の優先度A部品を生成（第1章なら§3・§4）
3. レッスン固有の一点物（L1のheroのような「そのレッスンの顔」）は `l{n}-` 接頭辞で同じフォルダに作る。**hero画像はレッスンごとに固有で作る**のを推奨（動画サムネイル・導入の顔になるため）
4. 同じ概念が複数レッスンに出るときは必ず同じ部品を使う（LESSON_PLAN の「用語の主担当」と同様、**絵の一貫性＝記憶のフック**）
5. 作成が終わったセクションには ✅ を付ける
