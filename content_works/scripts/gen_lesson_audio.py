"""レッスンのナレーション音声を Google Cloud TTS で生成するスクリプト。

`JOBS` に (出力ファイル名, 読み上げテキスト) を並べて実行する。読み上げテキストは
Markdown記号を除いた「耳で聞いて自然な」文にする（レッスンJSONの本文とは別物）。

出力先: apps/ipa_ip/contents/lessons/audios/
サービスアカウントJSONは secrets/ に置く（.gitignore対象）。
"""

from pathlib import Path

from google.cloud import texttospeech

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR / ".." / ".."
CREDENTIALS_PATH = REPO_ROOT / "secrets" / "audiobook-maker-c60753a2ca0d.json"
OUTPUT_DIR = REPO_ROOT / "apps" / "ipa_ip" / "contents" / "lessons" / "audios"

MODEL_NAME = "gemini-3.1-flash-tts-preview"
VOICE_NAME = "Kore"

# (出力ファイル名, 読み上げテキスト)
# 対象: レッスン1 の P1（scene0・3ステップ）と P2（scene1・5ステップ）。
JOBS = [
    # --- P1: 企業は何のために活動する？ ---
    ("1-1-1.mp3", "企業は、製品やサービスを社会に提供し、利益を上げて事業を継続・成長させることを目的に活動します。"),
    ("1-1-2.mp3", "利益はゴールであり、活動を続けるための手段でもあります。同時に、社会への貢献や責任も求められます。"),
    ("1-1-3.mp3", "自分の担当業務を理解するには、まず企業全体の活動の流れを知ることが大切です。"),
    # --- P2: 経営資源（ヒト・モノ・カネ・情報） ---
    ("1-2-1.mp3", "経営資源。企業活動を支える要素を経営資源と呼びます。まずは、ヒト。従業員などの人材です。"),
    ("1-2-2.mp3", "モノ。設備や原材料、製品です。"),
    ("1-2-3.mp3", "カネ。資金やお金です。"),
    ("1-2-4.mp3", "情報。ノウハウや顧客データ、技術です。"),
    ("1-2-5.mp3", "限りある経営資源を、目的に合わせて適切に配分・管理・活用することが、経営の基本です。"),
]


def main() -> None:
    client = texttospeech.TextToSpeechClient.from_service_account_file(
        str(CREDENTIALS_PATH.resolve())
    )
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for filename, text in JOBS:
        response = client.synthesize_speech(
            input=texttospeech.SynthesisInput(text=text),
            voice=texttospeech.VoiceSelectionParams(
                language_code="ja-JP",
                name=VOICE_NAME,
                model_name=MODEL_NAME,
            ),
            audio_config=texttospeech.AudioConfig(
                audio_encoding=texttospeech.AudioEncoding.MP3,
            ),
        )
        out = OUTPUT_DIR / filename
        out.write_bytes(response.audio_content)
        print(f"書き出し: {out.relative_to(REPO_ROOT.resolve())}")


if __name__ == "__main__":
    main()
