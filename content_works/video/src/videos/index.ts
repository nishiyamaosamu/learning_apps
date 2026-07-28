// このファイルは scripts/sync-index.mjs が生成する。直接編集しない。
// 動画を追加・削除したら `node scripts/sync-index.mjs` を実行して再生成すること。
//
// 登録対象は src/videos/<app>/<id>.tsx の `export const <名前>: VideoSpec`。
// - 本番動画: <app> はアプリ名ディレクトリ、id はアプリ接頭辞つきでファイル名と同じ
//   （例: ipa_ip/ip-L1v9-…, ipa_sg/sg-L1-…）
// - 手本・確認用デモ: src/videos/demo/ 配下
// レンダリング: npx remotion render <id> draft/<app>/<出力名>.mp4（draft/ は git 対象外）
import type { VideoSpec } from "./types";
import { bepFixedVariableCost } from "./demo/bep-fixed-variable-cost";
import { demo } from "./demo/demo";
import { narrationDemo } from "./demo/narration-demo";
import { wipeDemo } from "./demo/wipe-demo";
import { L1v9CorporateActivity } from "./ipa_ip/ip-L1v9-corporate-activity";
import { L2ManagementBasics } from "./ipa_ip/ip-L2-management-basics";
import { SgL1WhatIsInfosec } from "./ipa_sg/sg-L1-what-is-infosec";
import { SgL3HumanDeception } from "./ipa_sg/sg-L3-human-deception";
import { SgL4MalwareTypes } from "./ipa_sg/sg-L4-malware-types";
import { SgL15Encryption } from "./ipa_sg/sg-L15-encryption";
import { SgL22SecurityManagement } from "./ipa_sg/sg-L22-security-management";
import { SgL78SubjectBMethod } from "./ipa_sg/sg-L78-subject-b-method";
import { SgL79AssetRegister } from "./ipa_sg/sg-L79-asset-register";
import { SgL80RiskValue } from "./ipa_sg/sg-L80-risk-value";

export const videos: VideoSpec[] = [
  bepFixedVariableCost,
  demo,
  narrationDemo,
  wipeDemo,
  L1v9CorporateActivity,
  L2ManagementBasics,
  SgL1WhatIsInfosec,
  SgL3HumanDeception,
  SgL4MalwareTypes,
  SgL15Encryption,
  SgL22SecurityManagement,
  SgL78SubjectBMethod,
  SgL79AssetRegister,
  SgL80RiskValue,
];
