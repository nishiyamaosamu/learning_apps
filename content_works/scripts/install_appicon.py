# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow"]
# ///
"""書き出し済みの正方形アプリアイコンPNGから、iOSの全サイズ（Contents.json記載分）を
生成してAppIcon.appiconsetに上書きする。

前提: 入力PNGは不要な装飾（デザインツールのラベル・シャドウ・はみ出し要素など）を
除いた、正方形の書き出し画像であること。正方形でない画像はエラーにする
（自動クロップはしない。過去にラベルや装飾が意図せず含まれて誤爬したことがあるため）。
1024x1024以外の正方形はリサイズして扱う。

使い方:
  cd content_works/scripts

  # アプリ名指定（既定のsrc/appiconsetパスを使う。下記 APP_DEFAULTS 参照）
  mise exec -- uv run install_appicon.py --app ipa_sg
  mise exec -- uv run install_appicon.py --app ipa_ip

  # 両方まとめて
  mise exec -- uv run install_appicon.py --all

  # パス直接指定
  mise exec -- uv run install_appicon.py ../ipa_sg/appicon-sg.png \
    ../../apps/ipa_sg/ios/Runner/Assets.xcassets/AppIcon.appiconset
"""
import argparse
import json
from pathlib import Path

from PIL import Image

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent.parent

APP_DEFAULTS = {
    "ipa_sg": {
        "src": REPO_ROOT / "content_works/ipa_sg/appicon-sg.png",
        "iconset": REPO_ROOT / "apps/ipa_sg/ios/Runner/Assets.xcassets/AppIcon.appiconset",
    },
    "ipa_ip": {
        "src": REPO_ROOT / "content_works/ipa_ip/appicon-ip.png",
        "iconset": REPO_ROOT / "apps/ipa_ip/ios/Runner/Assets.xcassets/AppIcon.appiconset",
    },
}


def px(size_str: str, scale_str: str) -> int:
    base = float(size_str.split("x")[0])
    scale = int(scale_str.rstrip("x"))
    return round(base * scale)


def install(src: Path, iconset_dir: Path) -> None:
    img = Image.open(src).convert("RGBA")
    w, h = img.size
    if w != h:
        raise SystemExit(f"{src}: 正方形ではありません ({w}x{h})。先にクロップしてください。")
    master = img.convert("RGB")
    if master.size != (1024, 1024):
        master = master.resize((1024, 1024), Image.LANCZOS)

    contents_path = iconset_dir / "Contents.json"
    contents = json.loads(contents_path.read_text())

    for entry in contents["images"]:
        size_px = px(entry["size"], entry["scale"])
        out_path = iconset_dir / entry["filename"]
        master.resize((size_px, size_px), Image.LANCZOS).save(out_path, "PNG")
        print(f"  {entry['filename']}: {size_px}x{size_px}")
    print(f"done: {iconset_dir} ({len(contents['images'])} files)")


def main():
    p = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    p.add_argument("src", nargs="?", type=Path, help="書き出し済み正方形アイコンPNG")
    p.add_argument("iconset_dir", nargs="?", type=Path, help="AppIcon.appiconset のパス")
    p.add_argument("--app", choices=sorted(APP_DEFAULTS), help="src/iconset_dir省略時のアプリ既定値")
    p.add_argument("--all", action="store_true", help="APP_DEFAULTS の全アプリをまとめて実行")
    a = p.parse_args()

    if a.all:
        for name, paths in APP_DEFAULTS.items():
            print(f"== {name} ==")
            install(paths["src"], paths["iconset"])
        return

    if a.app:
        paths = APP_DEFAULTS[a.app]
        install(a.src or paths["src"], a.iconset_dir or paths["iconset"])
        return

    if not a.src or not a.iconset_dir:
        p.error("src と iconset_dir を指定するか、--app / --all を使ってください")
    install(a.src, a.iconset_dir)


if __name__ == "__main__":
    main()
