# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow", "numpy", "scipy"]
# ///
"""白背景で生成した単品イラストPNGの背景を透過にする（上書き）。

split_pose_sheet.py と同じフラッドフィル方式:
画像の外周から連結した白領域だけを抜くため、オブジェクト内部の白
（盾のハイライト・書類の紙面など）は保持される。輪郭線の小さな
切れ目は膨張処理で塞いでから判定する。

使い方:
  mise exec -- uv run remove_bg.py ../ipa_sg/video/assets_common/icon/*.png

既に透過ピクセルを持つ画像は処理済みとみなしてスキップする（--force で再処理）。
"""
import argparse

import numpy as np
from PIL import Image
from scipy import ndimage

WHITE_THRESHOLD = 235  # min(R,G,B)がこれ以上なら背景候補の白
SEAL = 3               # 線画の切れ目を塞ぐ膨張量(px)


def remove_background(arr):
    near_white = arr.min(axis=2) >= WHITE_THRESHOLD
    ink = ndimage.binary_dilation(~near_white, iterations=SEAL)
    labels, _ = ndimage.label(~ink)
    border = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
    border.discard(0)
    bg_sealed = np.isin(labels, list(border))
    background = ndimage.binary_dilation(bg_sealed, iterations=SEAL + 1) & near_white
    alpha = np.where(background, 0, 255).astype(np.uint8)
    return ndimage.uniform_filter(alpha.astype(np.float32), size=3).astype(np.uint8)


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("files", nargs="+", help="処理するPNG（上書き保存）")
    p.add_argument("--force", action="store_true", help="透過済みの画像も再処理する")
    a = p.parse_args()

    for path in a.files:
        img = Image.open(path)
        if not a.force and img.mode == "RGBA" and np.asarray(img)[:, :, 3].min() < 255:
            print(f"skip (already transparent): {path}")
            continue
        arr = np.asarray(img.convert("RGB"))
        rgba = np.dstack([arr, remove_background(arr)])
        Image.fromarray(rgba).save(path)
        print(f"done: {path}")


if __name__ == "__main__":
    main()
