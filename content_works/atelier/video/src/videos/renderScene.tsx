import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { SCALE, videoType } from "../design/tokens";
import { Ms } from "../parts/Ms";
import { NarrationAudio } from "../parts/narration";
import { TransitionWipe, TransitionWipeLight } from "../parts/transition";
import { TitleCard } from "../scenes/TitleCard";
import { BulletSlide } from "../scenes/BulletSlide";
import { VsSlide } from "../scenes/VsSlide";
import { FlowSlide } from "../scenes/FlowSlide";
import { MatrixSlide } from "../scenes/MatrixSlide";
import { LayersSlide } from "../scenes/LayersSlide";
import { GraphSlide } from "../scenes/GraphSlide";
import { TermSlide } from "../scenes/TermSlide";
import { BinarySlide } from "../scenes/BinarySlide";
import { QuizSlide } from "../scenes/QuizSlide";
import type { SceneSpec, VideoSpec } from "./types";
import { sceneDurationSec } from "./duration";

export { sceneDurationSec, videoDurationInFrames } from "./duration";

/** アイコンサイズは DESIGN.html のモック値 × SCALE（呼び出し側は名前だけ渡す） */
const headMs = (name?: string) =>
  name ? <Ms name={name} size={videoType.slideHeadIcon} /> : undefined;

/**
 * シーン本体 + ナレーション音声。narration 付きシーンは音声がここで自動再生されるので、
 * シーン側（カスタム含む）で <Audio> を手動で置かないこと。
 */
export const renderScene = (s: SceneSpec): React.ReactNode => {
  const body = renderSceneBody(s);
  if (!s.narration?.length && !s.transitionIn) return body;
  return (
    <>
      {s.narration?.length ? <NarrationAudio segments={s.narration} /> : null}
      {body}
      {s.transitionIn === "wipe" ? <TransitionWipe /> : null}
      {s.transitionIn === "wipe-light" ? <TransitionWipeLight /> : null}
    </>
  );
};

const renderSceneBody = (s: SceneSpec): React.ReactNode => {
  switch (s.pattern) {
    case "title":
      // オープニングジングル（6.8s）は title で必ず鳴らす。title にはナレーションを付けない
      return (
        <>
          <Audio src={staticFile("audio/common/opening_jingle.mp3")} />
          <TitleCard series={s.series} title={s.title} keywords={s.keywords} />
        </>
      );
    case "bullets":
      return (
        <BulletSlide
          heading={s.heading}
          icon={headMs(s.icon)}
          bullets={s.bullets}
          telop={s.telop}
          narration={s.narration}
          illust={s.illust}
        />
      );
    case "vs":
      return (
        <VsSlide
          heading={s.heading}
          icon={headMs(s.icon)}
          left={{
            title: s.left.title,
            icon: s.left.icon ? <Ms name={s.left.icon} size={14 * SCALE} /> : undefined,
            rows: s.left.rows,
          }}
          right={{
            title: s.right.title,
            icon: s.right.icon ? <Ms name={s.right.icon} size={14 * SCALE} /> : undefined,
            rows: s.right.rows,
          }}
          telop={s.telop}
          narration={s.narration}
        />
      );
    case "flow":
      return (
        <FlowSlide heading={s.heading} icon={headMs(s.icon)} steps={s.steps} telop={s.telop}
          narration={s.narration} />
      );
    case "matrix": {
      // tone 付き象限を順に点灯（2.4s から 0.7s 間隔）
      let toneIndex = 0;
      const cells = s.cells.map((c) => ({
        abc: c.abc,
        name: c.name,
        icon: c.icon ? <Ms name={c.icon} size={14 * SCALE} /> : undefined,
        desc: c.desc,
        tone: c.tone,
        highlightAtSec: c.tone ? 2.4 + 0.7 * toneIndex++ : undefined,
      }));
      return (
        <MatrixSlide
          heading={s.heading}
          icon={headMs(s.icon)}
          colLabels={s.colLabels}
          rowLabels={s.rowLabels}
          cells={cells as Parameters<typeof MatrixSlide>[0]["cells"]}
          telop={s.telop}
          narration={s.narration}
        />
      );
    }
    case "layers":
      return (
        <LayersSlide
          heading={s.heading}
          icon={headMs(s.icon)}
          layers={s.layers.map((l) => ({
            no: l.no,
            name: l.name,
            note: l.note,
            noteIcon: l.noteIcon ? <Ms name={l.noteIcon} size={11 * SCALE} /> : undefined,
            // 点灯タイミング: 全層の積み上げ完了後
            highlightAtSec: l.highlight ? 0.5 + s.layers.length * 0.16 + 1.0 : undefined,
          }))}
          telop={s.telop}
          narration={s.narration}
        />
      );
    case "graph":
      return (
        <GraphSlide
          heading={s.heading}
          icon={headMs(s.icon)}
          lines={s.lines}
          point={s.point}
          formula={s.formula}
          noteHighlight={s.noteHighlight}
          noteRest={s.noteRest}
          telop={s.telop}
          narration={s.narration}
        />
      );
    case "term":
      return (
        <TermSlide
          chip={s.chip}
          icon={<Ms name={s.icon} size={27 * SCALE} />}
          term={s.term}
          sub={s.sub}
          telop={s.telop}
          narration={s.narration}
        />
      );
    case "binary":
      return (
        <BinarySlide
          heading={s.heading}
          icon={headMs(s.icon)}
          digits={s.digits}
          answer={s.answer}
          telop={s.telop}
          narration={s.narration}
        />
      );
    case "quiz":
      return (
        <QuizSlide
          question={s.question}
          choices={s.choices}
          foot={s.foot}
          narration={s.narration}
          revealAtSec={s.revealAtSec}
        />
      );
    case "custom": {
      const C = s.component;
      return <C />;
    }
  }
};

/**
 * VideoSpec からコンポジション用コンポーネントを作る。
 * defaultProps 経由で spec を渡すと JSON シリアライズでカスタムシーンの
 * component（関数）が失われるため、必ずクロージャで束縛する。
 */
export const makeVideoComponent = (spec: VideoSpec): React.FC => {
  const Video: React.FC = () => <VideoComposition spec={spec} />;
  return Video;
};

/** VideoSpec をそのまま再生する汎用コンポジション */
export const VideoComposition: React.FC<{ spec: VideoSpec }> = ({ spec }) => {
  const { fps } = useVideoConfig();
  let from = 0;
  return (
    <AbsoluteFill>
      {spec.scenes.map((scene, i) => {
        const dur = Math.round(sceneDurationSec(scene) * fps);
        const start = from;
        from += dur;
        return (
          <Sequence key={i} from={start} durationInFrames={dur}>
            {renderScene(scene)}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
