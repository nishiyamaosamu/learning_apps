import "./index.css";
import { Composition } from "remotion";
import { videos } from "./videos";
import { makeVideoComponent, videoDurationInFrames } from "./videos/renderScene";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {videos.map((spec) => (
        <Composition
          key={spec.id}
          id={spec.id}
          component={makeVideoComponent(spec)}
          durationInFrames={videoDurationInFrames(spec, FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
      ))}
    </>
  );
};
