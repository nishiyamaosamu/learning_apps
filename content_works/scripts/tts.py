"""Google Cloud Text-to-Speech 動作確認用スクリプト。

サービスアカウントのJSONを secrets/xxx.json に置いて実行する。
入力テキスト・出力先は動作確認用にハードコードしている。
"""

from pathlib import Path

from google.cloud import texttospeech

# content_works/scripts/ から見て ../../secrets/xxx.json
SCRIPT_DIR = Path(__file__).resolve().parent
CREDENTIALS_PATH = SCRIPT_DIR / ".." / ".." / "secrets" / "audiobook-maker-c60753a2ca0d.json"

# --- 動作確認用の入力（ハードコード） ---
TEXT = (
"""
企業は、製品やサービスを社会に提供し、利益を上げて事業を継続・成長させることを目的に活動します。
"""
)
OUTPUT_PATH = SCRIPT_DIR / "output.mp3"


def main() -> None:
    client = texttospeech.TextToSpeechClient.from_service_account_file(
        str(CREDENTIALS_PATH.resolve())
    )

    response = client.synthesize_speech(
        input=texttospeech.SynthesisInput(text=TEXT),
        voice=texttospeech.VoiceSelectionParams(
            language_code="ja-JP",
            # 日本語のニューラル音声。必要に応じて差し替え可。
            name="ja-JP-Neural2-B",
        ),
        audio_config=texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3,
            speaking_rate=1.2,
        ),
    )

    OUTPUT_PATH.write_bytes(response.audio_content)
    print(f"音声を書き出しました: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
