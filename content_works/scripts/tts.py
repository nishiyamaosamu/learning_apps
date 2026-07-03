# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "google-cloud-texttospeech>=2.16.0",
# ]
# ///
"""Google Cloud TTS（Gemini TTS）で音声を生成するCLI。

読み上げテキストはMarkdown記号を除いた「耳で聞いて自然な」文にする
（レッスンJSONの本文とは別物）。

単発モード:
    mise exec -- uv run tts.py --text "読み上げテキスト" --out /path/to/file.mp3

バッチモード（ジョブJSONは {"ファイル名.mp3": "テキスト"} のフラットな辞書）:
    mise exec -- uv run tts.py --jobs jobs.json --out-dir ../../apps/ipa_sg/contents/lessons/audios

サービスアカウントJSONは secrets/ に置く（.gitignore対象）。
"""

import argparse
import json
import sys
from pathlib import Path

from google.cloud import texttospeech

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR / ".." / ".."
DEFAULT_CREDENTIALS = REPO_ROOT / "secrets" / "audiobook-maker-c60753a2ca0d.json"

DEFAULT_MODEL = "gemini-3.1-flash-tts-preview"
DEFAULT_VOICE = "Zephyr"
DEFAULT_LANGUAGE = "ja-JP"


def synthesize(client, text: str, *, voice: str, model: str, language: str) -> bytes:
    # Gemini TTSは audio_config.speaking_rate を反映しない。
    # 話速・スタイル制御が必要になったら SynthesisInput.prompt を拡張ポイントにする。
    response = client.synthesize_speech(
        input=texttospeech.SynthesisInput(text=text),
        voice=texttospeech.VoiceSelectionParams(
            language_code=language,
            name=voice,
            model_name=model,
        ),
        audio_config=texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3,
        ),
    )
    return response.audio_content


def load_jobs(jobs_path: Path) -> dict[str, str]:
    try:
        data = json.loads(jobs_path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        sys.exit(f"ジョブJSONが見つかりません: {jobs_path}")
    except json.JSONDecodeError as e:
        sys.exit(f"ジョブJSONのパースに失敗しました: {jobs_path} ({e})")
    if not isinstance(data, dict):
        sys.exit('ジョブJSONは {"ファイル名.mp3": "テキスト"} の辞書にしてください')
    for filename, text in data.items():
        if not isinstance(text, str) or not text.strip():
            sys.exit(f"ジョブJSONのテキストが不正です: {filename!r}")
    return data


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Google Cloud TTS（Gemini TTS）で音声を生成する",
    )
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--text", help="単発モード: 読み上げテキスト")
    mode.add_argument(
        "--jobs", type=Path, help='バッチモード: {"ファイル名.mp3": "テキスト"} のJSON'
    )
    parser.add_argument("--out", type=Path, help="単発モードの出力mp3パス")
    parser.add_argument("--out-dir", type=Path, help="バッチモードの出力ディレクトリ")
    parser.add_argument("--voice", default=DEFAULT_VOICE)
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument("--language", default=DEFAULT_LANGUAGE)
    parser.add_argument("--credentials", type=Path, default=DEFAULT_CREDENTIALS)
    args = parser.parse_args()

    if args.text is not None and args.out is None:
        parser.error("--text には --out を指定してください")
    if args.jobs is not None and args.out_dir is None:
        parser.error("--jobs には --out-dir を指定してください")
    if args.text is not None and args.out_dir is not None:
        parser.error("--text と --out-dir は併用できません")
    if args.jobs is not None and args.out is not None:
        parser.error("--jobs と --out は併用できません")

    credentials = args.credentials.resolve()
    if not credentials.is_file():
        sys.exit(
            f"認証情報が見つかりません: {credentials}\n"
            "サービスアカウントJSONを secrets/ に置くか --credentials で指定してください"
        )

    if args.text is not None:
        jobs = {args.out.name: args.text}
        out_dir = args.out.parent
    else:
        jobs = load_jobs(args.jobs)
        out_dir = args.out_dir

    client = texttospeech.TextToSpeechClient.from_service_account_file(str(credentials))
    out_dir.mkdir(parents=True, exist_ok=True)

    for filename, text in jobs.items():
        audio = synthesize(
            client, text, voice=args.voice, model=args.model, language=args.language
        )
        out = out_dir / filename
        out.write_bytes(audio)
        print(f"書き出し: {out} ({len(audio)} bytes)")


if __name__ == "__main__":
    main()
