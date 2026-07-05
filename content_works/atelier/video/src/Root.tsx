import "./index.css";
import { Composition } from "remotion";
import { MyComposition, TOTAL_DURATION_SEC } from "./Composition";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Demo"
        component={MyComposition}
        durationInFrames={Math.round(TOTAL_DURATION_SEC * FPS)}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
