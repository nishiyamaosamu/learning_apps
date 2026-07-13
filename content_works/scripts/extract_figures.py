# /// script
# requires-python = ">=3.11"
# dependencies = ["pymupdf"]
# ///
"""過去問PDFから「図」「表」をキャプション込みで切り出してPNG化するCLI。

IPA試験PDFの図・表はベクター描画（線＋文字。埋め込みラスタ画像ではない）なので、
該当領域をレンダリングして取り出す。キャプション位置とベクター枠の座標から領域を
自動判定する。

判定ロジック:
  - キャプション: 行頭が「図N」/「表N」で、かつページ中央寄せ（本文中の参照や
    表セル内の「図2の項番」等を除外するための中央寄せ判定）。
  - 図: キャプションの直上にあるベクター描画クラスタが本体。
  - 表: キャプションの直下のグリッドが本体。直下に「注記/注N)」があれば脚注も含める
    （表より横に長い脚注・複数行折り返しにも対応）。

番号は大問ごとにリセットされ試験内で重複する（例: 図1が複数）ため、出力名には
ページ番号を含めて一意化する: {exam}-p{NN}-{fig|tbl}{num}.png

使い方:
  cd content_works/scripts

  # ipa_sg（デフォルト）: content_works/ipa_sg/pdf/*_sg_qs.pdf → apps/ipa_sg/.../images
  mise exec -- uv run extract_figures.py

  # 別ディレクトリ/別アプリを対象にする
  mise exec -- uv run extract_figures.py \
    --pdf-dir ../ipa_ip/pdf --glob '*_ip_qs.pdf' --strip _ip_qs.pdf \
    --out ../../apps/ipa_ip/contents/exercises/images

出力後は必ず目視確認すること（見切れ・過剰取り込みがないか）。
"""
import argparse
import fitz
import re
from pathlib import Path

CAP_PAT = re.compile(r"^(図|表)\s*([0-9０-９]+)")
NOTE_PAT = re.compile(r"^注")

# 調整パラメータ
GAP = 13          # ベクター矩形を縦方向にクラスタ化する許容ギャップ(pt)
CENTER_TOL = 45   # キャプションと見なすページ中央からの許容ズレ(pt)
CLUSTER_MAX = 40  # キャプションと本体クラスタの許容距離(pt)
PAD = 7           # 切り出しの余白(pt)


def _zfull(s: str) -> str:
    """全角数字を半角へ。"""
    return s.translate(str.maketrans("０１２３４５６７８９", "0123456789"))


def clusters(pg):
    """ベクター描画矩形を縦方向のクラスタ（=図/表の本体）へまとめる。"""
    rects = sorted((d["rect"] for d in pg.get_drawings()), key=lambda r: r.y0)
    cl = []
    for r in rects:
        if r.width <= 0 or r.height <= 0:
            continue
        if cl and r.y0 <= cl[-1].y1 + GAP:
            cl[-1] |= r
        else:
            cl.append(fitz.Rect(r))
    return cl


def captions(pg, page_cx, rejects):
    """中央寄せの「図N/表N」キャプションを抽出する。"""
    out = []
    for b in pg.get_text("dict")["blocks"]:
        for line in b.get("lines", []):
            txt = "".join(s["text"] for s in line["spans"]).strip()
            m = CAP_PAT.match(txt)
            if not m:
                continue
            x0, y0, x1, y1 = line["bbox"]
            cx = (x0 + x1) / 2
            if abs(cx - page_cx) > CENTER_TOL:
                rejects.append((y0, cx, page_cx, txt[:36]))
                continue  # 本文中の参照 / 表セル内テキスト
            kind = "fig" if m.group(1) == "図" else "tbl"
            out.append((kind, _zfull(m.group(2)), fitz.Rect(x0, y0, x1, y1)))
    return out


def nearest_cluster(kind, cap, cls):
    """図はキャプション直上、表は直下のクラスタを本体として選ぶ。"""
    best, best_gap = None, 1e9
    for c in cls:
        gap = (cap.y0 - c.y1) if kind == "fig" else (c.y0 - cap.y1)
        if gap < -3:  # 正しい側にあること
            continue
        if gap < best_gap:
            best, best_gap = c, gap
    return best if best is not None and best_gap < CLUSTER_MAX else None


def footnote_below(pg, region):
    """表グリッド直下の「注記/注N)」ブロックを取り込む（横幅・折り返しも吸収）。"""
    blocks = [
        (b["bbox"], "".join(s["text"] for l in b.get("lines", []) for s in l["spans"]).strip())
        for b in pg.get_text("dict")["blocks"]
        if b.get("lines")
    ]
    grow = fitz.Rect(region)
    seeded, changed = False, True
    while changed:
        changed = False
        for (bx0, by0, bx1, by1), txt in blocks:
            if by1 <= grow.y1 + 1e-3:
                continue  # すでに含まれている
            gap = by0 - grow.y1
            is_note = NOTE_PAT.match(txt)
            if (not seeded and is_note and -2 <= gap <= 22) or (
                seeded and gap <= 8 and bx0 < grow.x1 and bx1 > grow.x0
            ):
                grow |= fitz.Rect(bx0, by0, bx1, by1)
                seeded, changed = True, True
    return grow


def main():
    here = Path(__file__).resolve().parent  # content_works/scripts
    ap = argparse.ArgumentParser(description="過去問PDFから図・表をPNG化する")
    ap.add_argument("--pdf-dir", default=str(here.parent / "ipa_sg" / "pdf"),
                    help="対象PDFのディレクトリ")
    ap.add_argument("--glob", default="*_sg_qs.pdf", help="対象PDFのglob")
    ap.add_argument("--strip", default="_sg_qs.pdf",
                    help="出力名のexam id算出時にファイル名末尾から除く文字列")
    ap.add_argument("--out",
                    default=str(here.parent.parent / "apps" / "ipa_sg" / "contents"
                                / "exercises" / "images"),
                    help="PNG出力先ディレクトリ")
    ap.add_argument("--dpi", type=int, default=300, help="レンダリング解像度")
    args = ap.parse_args()

    pdf_dir, out = Path(args.pdf_dir), Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    zoom = args.dpi / 72

    manifest, rejects = [], []
    for pdf in sorted(pdf_dir.glob(args.glob)):
        name = pdf.name
        exam = name[: -len(args.strip)] if args.strip and name.endswith(args.strip) else pdf.stem
        doc = fitz.open(pdf)
        for pidx in range(len(doc)):
            pg = doc[pidx]
            page_cx = pg.rect.width / 2
            cls = clusters(pg)
            for kind, num, cap in captions(pg, page_cx, rejects):
                c = nearest_cluster(kind, cap, cls)
                if c is None:
                    manifest.append((exam, pidx + 1, f"{kind}{num}", "NO_CLUSTER", ""))
                    continue
                region = fitz.Rect(cap) | c
                if kind == "tbl":
                    region = footnote_below(pg, region)
                region.x0 -= PAD; region.y0 -= PAD; region.x1 += PAD; region.y1 += PAD
                out_name = f"{exam}-p{pidx + 1:02d}-{kind}{num}.png"
                pix = pg.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=region)
                pix.save(out / out_name)
                manifest.append((exam, pidx + 1, f"{kind}{num}", out_name, f"{pix.width}x{pix.height}"))

    for exam, page, label, name, size in manifest:
        print(f"{exam} p{page} {label} -> {name} {size}")
    print(f"\nTOTAL: {len(manifest)} images -> {out}")
    if rejects:
        print("\n--- 除外した図/表パターン行（本文参照・表セルのはず）---")
        for y, cx, pcx, txt in rejects:
            print(f"  y{y:.0f} cx{cx:.0f}(page_cx{pcx:.0f}) | {txt}")


if __name__ == "__main__":
    main()
