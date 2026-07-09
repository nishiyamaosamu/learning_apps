import { Img, staticFile } from "remotion";
import { colors, videoType, markerStyle, markerPinkStyle, SCALE } from "../design/tokens";
import { SlideShell } from "../parts/SlideShell";
import type { NarrationSegment } from "../videos/types";
import { useAppear } from "../parts/animate";

export type BulletItem = {
  text: string;
  sub?: string;
  /** 蛍光ペン風マーカー（blue = primary100 / pink = accentPinkSoft） */
  marker?: "blue" | "pink";
};

export type BulletSlideProps = {
  heading: string;
  icon?: React.ReactNode;
  bullets: BulletItem[];
  telop?: string;
  narration?: NarrationSegment[];
  /** public/ 配下の手描きイラスト（例: "images/ipa_sg/attack-password.png"）。白地は multiply で溶かす */
  illust?: string;
  /**
   * 各項目の出現秒（bullets と同じ長さ）。ナレーションで「いま何の話をしているか」に
   * 合わせて出したいときに指定する。`segStart(SEG, i)` で組む（手計算しない）。
   * 省略時は均等割りの自動タイミングになる。
   */
  appearAtSec?: number[];
};

const Bullet: React.FC<{ item: BulletItem; delaySec: number }> = ({ item, delaySec }) => {
  const appear = useAppear(delaySec);
  return (
    <li
      style={{
        display: "flex",
        gap: 10 * SCALE,
        alignItems: "baseline",
        fontSize: videoType.body,
        fontWeight: 700,
        ...appear,
      }}
    >
      {/* li::before — 角丸四角のビュレット */}
      <span
        style={{
          width: 9 * SCALE,
          height: 9 * SCALE,
          borderRadius: 3 * SCALE,
          backgroundColor: colors.primary500,
          flex: "none",
          translate: `0px ${-1 * SCALE}px`,
        }}
      />
      <span>
        <span
          style={
            item.marker === "blue" ? markerStyle : item.marker === "pink" ? markerPinkStyle : undefined
          }
        >
          {item.text}
        </span>
        {item.sub ? (
          <small
            style={{
              display: "block",
              fontSize: videoType.bodySub,
              fontWeight: 500,
              color: colors.textSecondary,
            }}
          >
            {item.sub}
          </small>
        ) : null}
      </span>
    </li>
  );
};

/**
 * 本編スライド① 箇条書き + イラスト（基本形）— DESIGN.html .v-slide .cols
 */
export const BulletSlide: React.FC<BulletSlideProps> = ({
  heading,
  icon,
  bullets,
  telop,
  narration,
  illust,
  appearAtSec,
}) => {
  const illustAppear = useAppear(0.5);

  return (
    <SlideShell heading={heading} icon={icon} telop={telop} narration={narration}>
      <div
        style={{
          display: "flex",
          gap: "4%",
          flex: 1,
          marginTop: "2%",
          minHeight: 0,
          alignItems: "center",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            flex: 1.35,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "7%",
          }}
        >
          {bullets.map((b, i) => (
            <Bullet key={b.text} item={b} delaySec={appearAtSec?.[i] ?? 0.5 + i * 0.6} />
          ))}
        </ul>
        {illust ? (
          <Img
            src={staticFile(illust)}
            style={{
              flex: 1,
              minWidth: 0,
              alignSelf: "stretch",
              objectFit: "contain",
              mixBlendMode: "multiply", // 素材の白地を bg に溶かす
              ...illustAppear,
            }}
          />
        ) : null}
      </div>
    </SlideShell>
  );
};
