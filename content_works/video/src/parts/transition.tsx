import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../design/tokens";

/**
 * シーン頭の切り替え演出（約1.5秒）:
 * 太めの角丸ライン（バー）が上から順に流れ込んで画面全体を埋め、
 * 覆い切ったあと同じ順に右へ抜けて本編が現れる。
 * 角丸の先端が見えるのは出入りの瞬間だけで、覆っている間は隙間なく埋まる。
 *
 * 使い方: SceneSpec に `transitionIn: "wipe"` を付けるだけ（renderScene が自動で重ねる）。
 * **まとめ前専用**（1動画1回）。本編内の場面転換は軽量版 "wipe-light" を、
 * クイズ導入の幕間は parts/SectionTitle.tsx の文字アニメを使う。
 */
const IN_DUR = 0.35; // 流れ込み
const OUT_AT = 0.75; // 抜け開始（delay 0 のバー基準）
const OUT_DUR = 0.4; // 抜け

/**
 * バー構成: 濃い青3トーン（primary800/600/500）だけで組む。
 * 大きなバーを土台に画面を確実に覆い、遅れて入るやや太めのバーが
 * トーン差でランダムに重なって見える。明るい色・ピンクは使わない（落ち着いた転換にする）。
 * top/height/delay は「ランダムに重なって見える」よう手で散らした固定値
 * （Math.random はレンダリングを壊すので使わない）。
 * 土台バーの union が -2%〜104% を覆っていることが崩してはいけない不変条件。
 */
const BARS = [
  // 土台（大きい・先に入る）
  { top: -2, h: 26, w: 142, color: colors.primary800, delay: 0.05 },
  { top: 20, h: 24, w: 132, color: colors.primary600, delay: 0.0 },
  { top: 40, h: 26, w: 150, color: colors.primary800, delay: 0.1 },
  { top: 62, h: 22, w: 136, color: colors.primary600, delay: 0.04 },
  { top: 80, h: 24, w: 144, color: colors.primary800, delay: 0.12 },
  // 中間の変化
  { top: 12, h: 14, w: 138, color: colors.primary500, delay: 0.16 },
  { top: 55, h: 12, w: 130, color: colors.primary500, delay: 0.2 },
  // 最後に重なるバー（下の土台とトーン差が出る色を選ぶ・細すぎない）
  { top: 30, h: 10, w: 134, color: colors.primary800, delay: 0.22 },
  { top: 47, h: 9, w: 146, color: colors.primary500, delay: 0.24 },
  { top: 70, h: 10, w: 132, color: colors.primary800, delay: 0.26 },
  { top: 4, h: 9, w: 140, color: colors.primary600, delay: 0.28 },
];

/**
 * 軽量版ワイプ（transitionIn: "wipe-light"・約1.0秒）:
 * 縦いっぱいの斜めの平行四辺形が3枚、時間差で左から右へ流れ抜けるだけの簡素な転換。
 * 画面は覆わない。本編内の場面転換（話題の切り替わり）に使う。
 * まとめ前は必ず "wipe"（全面カバー版）の方。
 */
const LIGHT_PANELS = [
  { w: 26, color: colors.primary600, delay: 0.0 },
  { w: 16, color: colors.primary800, delay: 0.12 },
  { w: 21, color: colors.primary500, delay: 0.22 },
];
const LIGHT_DUR = 0.75; // 1枚が通過する時間

export const TransitionWipeLight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ease = Easing.bezier(0.5, 0, 0.3, 1);
  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {LIGHT_PANELS.map((p, i) => {
        // 左外→右外へ一気に通過（停止しない）。skew ぶんの余白込みで移動量を取る
        const travel = (100 + p.w + 40) / (p.w / 100); // % of own width
        const x = interpolate(t, [p.delay, p.delay + LIGHT_DUR], [0, travel], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "-15%",
              bottom: "-15%",
              width: `${p.w}%`,
              left: `-${p.w + 25}%`,
              backgroundColor: p.color,
              transform: `translateX(${x}%) skewX(-12deg)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/**
 * wipe が完全に晴れる（最後のバーが右へ抜けきる）までの秒数。
 * renderScene はこの秒数だけ本編（音声＋映像）の開始を遅らせる —
 * 覆っている裏で次ページのアニメーションや読み上げが先に進んでしまうのを防ぐため。
 */
export const WIPE_REVEAL_SEC = Math.max(...BARS.map((b) => b.delay)) + OUT_AT + OUT_DUR;

export const TransitionWipe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ease = Easing.bezier(0.55, 0, 0.25, 1);
  return (
    // 背景色で完全に覆う: renderScene が WIPE_REVEAL_SEC の間だけこのコンポーネントを
    // 表示するので、常時塗っても本編を隠し続けることはない。
    // 通常ページと同じ colors.bg にする（バーと同系色の濃い青にすると青いラインが背景に
    // 溶けて見えなくなるため、バーが際立つ明るい地を選ぶ）
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none", backgroundColor: colors.bg }}>
      {BARS.map((b, i) => {
        // translateX は自身の幅基準: -100%=左外 / 0=画面を覆う / +100%=右外
        const x = interpolate(
          t,
          [b.delay, b.delay + IN_DUR, OUT_AT + b.delay, OUT_AT + b.delay + OUT_DUR],
          [-100, 0, 0, 100],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease },
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${b.top}%`,
              height: `${b.h}%`,
              left: `-${(b.w - 100) / 2}%`, // 中央寄せ（覆った状態で角丸の先端が画面外）
              width: `${b.w}%`,
              borderRadius: 999,
              backgroundColor: b.color,
              transform: `translateX(${x}%)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
