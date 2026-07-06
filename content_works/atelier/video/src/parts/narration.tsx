import { Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { NarrationSegment } from "../videos/types";

/**
 * <id>.audio.json（scripts/audio-durations.mjs の実測秒数）から NarrationSegment を
 * 組み立てるヘルパー。動画ファイルの先頭で1回作る:
 *
 *   import durations from "./my-video.audio.json";
 *   const N = narrationLoader(durations, "audio/my-video");
 *   const SEG2 = [N("s02-1.mp3", "字幕の一文です"), N("s02-2.mp3", "次の一文です")];
 *
 * 音声ファイルが未生成（jsonにキーが無い）ならここで即エラーにする —
 * 黙って0秒にすると字幕と音声が全部ズレるため。
 */
export const narrationLoader =
  (durations: Record<string, number>, dir: string) =>
  (file: string, text: string, opts?: { gapBeforeSec?: number }): NarrationSegment => {
    const durationSec = durations[file];
    if (durationSec === undefined) {
      throw new Error(
        `${file} の秒数がありません。音声生成後に scripts/audio-durations.mjs を実行してください`,
      );
    }
    return { file: `${dir}/${file}`, text, durationSec, gapBeforeSec: opts?.gapBeforeSec };
  };

/**
 * ナレーション音声をセグメント順に隙間なく再生する。
 * renderScene が spec.narration から自動で置くので、シーン側で手動で使わないこと（二重再生になる）。
 */
export const NarrationAudio: React.FC<{ segments: NarrationSegment[] }> = ({ segments }) => {
  const { fps } = useVideoConfig();
  let from = 0;
  return (
    <>
      {segments.map((seg) => {
        from += Math.round((seg.gapBeforeSec ?? 0) * fps);
        const el = (
          <Sequence
            key={seg.file}
            from={from}
            durationInFrames={Math.round(seg.durationSec * fps)}
            layout="none"
          >
            <Audio src={staticFile(seg.file)} />
          </Sequence>
        );
        from += Math.round(seg.durationSec * fps);
        return el;
      })}
    </>
  );
};

/**
 * 現在再生中のセグメントの text を返す字幕テキスト。SlideShell のテロップ帯の中で使う
 * （SlideShell に narration を渡せば自動でこれになる）。
 * セグメント切り替わりの頭 0.18 秒だけフェードインして「切り替わった」ことを目に伝える。
 */
export const NarrationTelopText: React.FC<{ segments: NarrationSegment[] }> = ({ segments }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // starts[i] = セグメントiの読み上げ開始秒（gapBeforeSec の後）。
  // gap の間は「前のセグメントの字幕を出したまま」にする（クイズの正解などを間の間に先出ししない）
  const starts: number[] = [];
  let acc = 0;
  for (const s of segments) {
    acc += s.gapBeforeSec ?? 0;
    starts.push(acc);
    acc += s.durationSec;
  }
  let idx = 0;
  for (let i = 0; i < segments.length; i++) {
    if (t >= starts[i]) idx = i;
  }

  const local = t - starts[idx];
  const opacity = interpolate(local, [0, 0.18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return <span style={{ opacity }}>{segments[idx].text}</span>;
};
