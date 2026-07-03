# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow", "numpy", "scipy"]
# ///
"""ポーズシート（1枚に複数ポーズが並んだ生成画像）を、透過PNGに分解する。

- 背景除去: 画像の外周から連結した白領域だけを抜くフラッドフィル方式。
  白いシャツ・顔など、キャラ内部の白は保持される。輪郭線の小さな切れ目は
  膨張処理で塞いでから判定するので、線画の隙間から抜けが漏れない。
- 分割: 透過後のアルファ投影の空白ギャップで行→列の順に分割。指定した
  ポーズ数と合わないときは、ピースの結合／最も薄い位置での切断で合わせる。

使い方:
  mise exec -- uv run split_pose_sheet.py \
      --src sheet.png \
      --names "person-leader,person-leader-point;person-leader-think,person-leader-idea" \
      --out-dir ../ipa_sg/video/assets_common/person

--names は「,」区切りが列、「;」区切りが行（読み順）。
"""
import argparse
import os

import numpy as np
from PIL import Image
from scipy import ndimage

WHITE_THRESHOLD = 235  # min(R,G,B)がこれ以上なら背景候補の白
MARGIN = 24            # 切り出し後に付ける透明マージン(px)
MIN_GAP = 12           # 分割ギャップとみなす空白幅(px)
MIN_PIXELS = 400       # これ未満の孤立ゴミは除去
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


def find_segments(mask_1d, expected, density=None):
    occupied = np.where(mask_1d)[0]
    lo, hi = occupied.min(), occupied.max()
    segments, gaps = [], []
    start = lo
    i = lo
    while i <= hi:
        if mask_1d[i]:
            i += 1
            continue
        j = i
        while j <= hi and not mask_1d[j]:
            j += 1
        if j - i >= MIN_GAP:
            segments.append((start, i))
            gaps.append(j - i)
            start = j
        i = j
    segments.append((start, hi + 1))
    # ピースが多すぎる（浮いた小物が別ピースになった）→ 最小ギャップを結合
    while len(segments) > expected:
        k = int(np.argmin(gaps))
        segments[k] = (segments[k][0], segments[k + 1][1])
        del segments[k + 1], gaps[k]
    # ピースが足りない（ポーズ同士が接触）→ 最大ピースを最も薄い位置で切る
    while len(segments) < expected and density is not None:
        k = int(np.argmax([b - a for a, b in segments]))
        a, b = segments[k]
        inner = density[a:b].astype(np.float64)
        pad = (b - a) // 5
        inner[:pad] = inner[-pad:] = np.inf
        cut = a + int(np.argmin(inner))
        segments[k: k + 1] = [(a, cut), (cut, b)]
    if len(segments) != expected:
        raise ValueError(f"expected {expected} segments, got {len(segments)}")
    return segments


def save_piece(rgba, name, out_dir):
    opaque = rgba[:, :, 3] > 8
    ys, xs = np.where(opaque)
    tile = rgba[ys.min(): ys.max() + 1, xs.min(): xs.max() + 1]
    th, tw = tile.shape[:2]
    canvas = np.zeros((th + 2 * MARGIN, tw + 2 * MARGIN, 4), dtype=np.uint8)
    canvas[MARGIN: MARGIN + th, MARGIN: MARGIN + tw] = tile
    Image.fromarray(canvas).save(os.path.join(out_dir, f"{name}.png"))
    print(f"{name}.png  {canvas.shape[1]}x{canvas.shape[0]}")


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--src", required=True, help="ポーズシート画像")
    p.add_argument("--names", required=True,
                   help="出力名。','区切りが列、';'区切りが行（読み順）")
    p.add_argument("--out-dir", required=True)
    a = p.parse_args()

    name_rows = [[n.strip() for n in row.split(",") if n.strip()]
                 for row in a.names.split(";") if row.strip()]
    os.makedirs(a.out_dir, exist_ok=True)

    arr = np.asarray(Image.open(a.src).convert("RGB"))
    alpha = remove_background(arr)
    rgba = np.dstack([arr, alpha])
    solid = alpha > 8
    labels, n = ndimage.label(solid)
    sizes = ndimage.sum(solid, labels, range(1, n + 1))
    for idx in np.where(sizes < MIN_PIXELS)[0]:
        rgba[labels == idx + 1, 3] = 0
    solid = rgba[:, :, 3] > 8

    row_segs = find_segments(solid.any(axis=1), len(name_rows))
    for (y0, y1), names in zip(row_segs, name_rows):
        band = solid[y0:y1]
        col_segs = find_segments(band.any(axis=0), len(names), density=band.sum(axis=0))
        for (x0, x1), name in zip(col_segs, names):
            save_piece(rgba[y0:y1, x0:x1], name, a.out_dir)


if __name__ == "__main__":
    main()
