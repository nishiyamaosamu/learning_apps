import type { VideoSpec } from "./types";
import { demo } from "./demo/demo";
import { narrationDemo } from "./demo/narration-demo";
import { wipeDemo } from "./demo/wipe-demo";
import { bepFixedVariableCost } from "./demo/bep-fixed-variable-cost";
import { L1v9CorporateActivity } from "./ipa_ip/ip-L1v9-corporate-activity";
import { L2ManagementBasics } from "./ipa_ip/ip-L2-management-basics";

/**
 * ここに動画を登録すると Remotion のコンポジションとして現れる。
 * - 本番動画: src/videos/<app>/<id>.tsx に VideoSpec を書いて追加する
 *   （<app> はアプリ名ディレクトリ、id はアプリ接頭辞つき。例: ipa_ip/ip-L1v9-…, ipa_sg/sg-L1-…）
 * - 手本・確認用デモ: src/videos/demo/ 配下（パターン一覧・ナレーション最小手本・ワイプ確認）
 * レンダリング: npx remotion render <id> draft/<app>/<id>.mp4（draft/ は git 対象外）
 */
export const videos: VideoSpec[] = [
  demo,
  narrationDemo,
  wipeDemo,
  bepFixedVariableCost,
  L1v9CorporateActivity,
  L2ManagementBasics,
];
