# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "pyyaml>=6.0",
# ]
# ///
"""問題集データ（YAML）をアプリ側アセット（JSON）へ変換するスクリプト。

入力:
  content_works/ipa_ip/exercise/R{4,5,6,7,8}.yaml
  content_works/ipa_ip/exercise/images/*.png

出力（リポジトリに commit する想定）:
  apps/ipa_ip/contents/exercises/{R8..R4}.json
  apps/ipa_ip/contents/exercises/images/*.png  （参照された画像のみコピー）

変換のポイント:
  - JSON のキーはエンジン（json_serializable）のフィールド名に合わせた camelCase。
    特に answer_option_id -> answerOptionId。
  - 画像ブロックの src は "R8003_01.png" -> "exercises/images/R8003_01.png"
    （エンジンが contentBasePath 起点 'contents/exercises/images/...' でロードできる形）。
  - options[].content の空配列（選択肢が設問画像内にある問題）はそのまま空配列で出力。

実行:
  cd content_works/scripts && mise exec -- uv run build_exercises.py
"""

from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

import yaml

# content_works/scripts/ から見たパス。
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent.parent
SRC_DIR = REPO_ROOT / "content_works" / "ipa_ip" / "exercise"
SRC_IMAGES_DIR = SRC_DIR / "images"
OUT_DIR = REPO_ROOT / "apps" / "ipa_ip" / "contents" / "exercises"
OUT_IMAGES_DIR = OUT_DIR / "images"

# 新しい順（令和8 -> 4）。base.json の並びと合わせる。
YEARS = ["R8", "R7", "R6", "R5", "R4"]

# 画像アセットのサブパス（contentBasePath 起点）。
IMAGE_ASSET_PREFIX = "exercises/images"


def convert_blocks(blocks, *, qid: str, referenced: set[str]) -> list[dict]:
    """text/image ブロック列を JSON 用に変換する。"""
    result: list[dict] = []
    for block in blocks or []:
        btype = block.get("type")
        if btype == "text":
            result.append({"type": "text", "text": block["text"]})
        elif btype == "image":
            src = block["src"]
            referenced.add(src)
            result.append({"type": "image", "src": f"{IMAGE_ASSET_PREFIX}/{src}"})
        else:
            raise ValueError(f"{qid}: 未知のブロック type={btype!r}")
    return result


def convert_question(q: dict, *, referenced: set[str]) -> dict:
    qid = q.get("qid", "?")
    qtype = q.get("question_type")
    if qtype != "single_choice":
        raise ValueError(
            f"{qid}: 未対応の question_type={qtype!r}（single_choice のみ対応）"
        )

    options = []
    for opt in q.get("options", []):
        options.append(
            {
                "id": opt["id"],
                "content": convert_blocks(
                    opt.get("content"), qid=qid, referenced=referenced
                ),
            }
        )

    option_ids = [opt["id"] for opt in options]
    if len(option_ids) != len(set(option_ids)):
        raise ValueError(f"{qid}: 選択肢IDが重複しています: {option_ids}")
    if q.get("answer_option_id") not in option_ids:
        raise ValueError(
            f"{qid}: 正解ID {q.get('answer_option_id')!r} が選択肢にありません"
        )

    return {
        "qid": qid,
        "category": q["category"],
        "content": convert_blocks(q.get("content"), qid=qid, referenced=referenced),
        "options": options,
        "answerOptionId": q["answer_option_id"],
        "explanation": convert_blocks(
            q.get("explanation"), qid=qid, referenced=referenced
        ),
    }


def convert_year(year: str, *, referenced: set[str]) -> dict | None:
    src = SRC_DIR / f"{year}.yaml"
    if not src.exists():
        print(f"[warn] {src} が見つかりません。スキップします。")
        return None

    with src.open(encoding="utf-8") as f:
        data = yaml.safe_load(f)

    categories = [
        {"id": c["id"], "name": c["name"]} for c in data.get("categories", [])
    ]
    questions = [
        convert_question(q, referenced=referenced) for q in data.get("exercises", [])
    ]

    category_ids = [category["id"] for category in categories]
    if len(category_ids) != len(set(category_ids)):
        raise ValueError(f"{year}: 分野IDが重複しています: {category_ids}")

    qids = [question["qid"] for question in questions]
    if len(qids) != len(set(qids)):
        raise ValueError(f"{year}: 問題IDが重複しています")

    unknown_categories = {
        question["category"] for question in questions
    } - set(category_ids)
    if unknown_categories:
        raise ValueError(
            f"{year}: 未定義の分野IDがあります: {sorted(unknown_categories)}"
        )

    print(f"[{year}] {len(questions)} 問 / {len(categories)} 分野")
    return {
        "id": data["exercise_id"],
        "title": data["exercise_title"],
        "categories": categories,
        "questions": questions,
    }


def copy_images(referenced: set[str]) -> None:
    OUT_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    missing = sorted(name for name in referenced if not (SRC_IMAGES_DIR / name).is_file())
    if missing:
        raise FileNotFoundError(f"参照画像が見つかりません: {', '.join(missing)}")

    copied = 0
    for name in sorted(referenced):
        src = SRC_IMAGES_DIR / name
        shutil.copy2(src, OUT_IMAGES_DIR / name)
        copied += 1
    print(f"画像コピー: {copied}/{len(referenced)} 枚 -> {OUT_IMAGES_DIR}")

    # 参照されていない孤児画像を警告（削除はしない）。
    if SRC_IMAGES_DIR.exists():
        present = {p.name for p in SRC_IMAGES_DIR.glob("*.png")}
        orphans = present - referenced
        if orphans:
            print(f"  [warn] 参照されない画像が {len(orphans)} 枚あります: "
                  f"{', '.join(sorted(orphans)[:5])}...")


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    referenced: set[str] = set()

    for year in YEARS:
        result = convert_year(year, referenced=referenced)
        if result is None:
            continue
        out_path = OUT_DIR / f"{year}.json"
        with out_path.open("w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"  -> {out_path}")

    copy_images(referenced)
    print("完了。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
