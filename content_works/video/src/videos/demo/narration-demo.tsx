/**
 * ナレーション付き動画の最小手本。
 * 「字幕1枚 = 1文 = 1音声ファイル」の作り方（パターン / カスタム両方）を示す。
 *
 * 制作手順:
 *   1. narration/<app>/<id>.jobs.json にセグメント原稿を書く
 *   2. cd ../scripts && mise exec -- uv run tts.py --jobs ... --out-dir ../video/public/audio/<app>/<id>
 *   3. node scripts/audio-durations.mjs <id>  → <app>/<id>.audio.json が生まれる
 *   4. この形で narrationLoader から組み立てる
 */
import { videoType, SCALE, colors } from "../../design/tokens";
import { usePop } from "../../parts/animate";
import { Ms } from "../../parts/Ms";
import { narrationLoader } from "../../parts/narration";
import { SlideShell } from "../../parts/SlideShell";
import type { VideoSpec } from "../types";
import durations from "./narration-demo.audio.json";

const N = narrationLoader(durations, "audio/demo/narration-demo");

// セグメント配列は「spec の narration」と「シーン内の SlideShell」の両方に同じものを渡す
const SEG1 = [
  N("s01-1.mp3", "企業活動の目的は、社会に価値を提供することです。"),
  N("s01-2.mp3", "利益は、その活動を続けるための条件になります。"),
];
const SEG2 = [
  N("s02-1.mp3", "経営資源には、ヒト、モノ、カネ、情報の四つがあります。"),
  N("s02-2.mp3", "この四つをどう配分するかが、経営の腕の見せどころです。"),
];

const ResourceIcons: React.FC = () => (
  <SlideShell heading="4つの経営資源" icon={<Ms name="category" size={videoType.slideHeadIcon} />} narration={SEG2}>
    <div
      style={{
        flex: 1,
        minHeight: 0,
        marginTop: "2%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14 * SCALE,
      }}
    >
      {[
        { icon: "group", label: "ヒト" },
        { icon: "inventory_2", label: "モノ" },
        { icon: "payments", label: "カネ" },
        { icon: "storage", label: "情報" },
      ].map((x, i) => (
        <Resource key={x.label} icon={x.icon} label={x.label} delaySec={0.4 + i * 0.35} />
      ))}
    </div>
  </SlideShell>
);

const Resource: React.FC<{ icon: string; label: string; delaySec: number }> = ({
  icon,
  label,
  delaySec,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3 * SCALE,
      ...usePop(delaySec),
    }}
  >
    <span
      style={{
        width: 40 * SCALE,
        height: 40 * SCALE,
        borderRadius: 14 * SCALE,
        backgroundColor: colors.primary50,
        color: colors.primary600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ms name={icon} size={22 * SCALE} />
    </span>
    <b style={{ fontSize: 12 * SCALE }}>{label}</b>
  </div>
);

export const narrationDemo: VideoSpec = {
  id: "narration-demo",
  scenes: [
    {
      pattern: "bullets",
      heading: "企業活動の目的",
      icon: "corporate_fare",
      bullets: [
        { text: "社会に価値を提供する", marker: "blue" },
        { text: "利益は継続の条件", sub: "目的そのものではない" },
      ],
      narration: SEG1, // telop は書かない（字幕が音声から出る）
    },
    {
      pattern: "custom",
      name: "resource-icons",
      durationSec: 4, // アニメーションの最低尺。ナレーションの方が長ければ自動で伸びる
      narration: SEG2,
      component: ResourceIcons,
    },
  ],
};
