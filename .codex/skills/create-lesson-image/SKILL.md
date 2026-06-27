---
name: create-lesson-image
description: Generate or revise lesson illustrations and Japanese infographics for learning-app content in this repository. Use when asked to create an image from lesson text, visualize a learning concept, add or replace an asset under apps/*/contents/lessons/images, or match the hand-drawn style of the bundled reference image.
---

# Create Lesson Image

Create one simple, readable lesson image from the supplied content. Use [references/SAMPLE_STYLE.png](references/SAMPLE_STYLE.png) as the visual reference and optimize the result for an image block on a smartphone screen.

## Workflow

1. Resolve the skill directory from this `SKILL.md` and locate `references/SAMPLE_STYLE.png` within it.
2. Inspect the reference with the local image-viewing tool before generating. Treat it as a style sheet, not as a composition template.
3. Read the target lesson JSON when a lesson or insertion point is named. Use the surrounding page text to avoid repeating explanations in the image.
4. Extract one visual learning point. Split unrelated concepts into separate images instead of producing a dense poster.
5. Honor an explicit aspect ratio. If none is supplied, choose one using [references/style-guide.md](references/style-guide.md) without asking for confirmation.
6. Decide whether any text is necessary. Prefer no text; otherwise use only short Japanese words or values essential to the diagram.
7. Build the generation prompt from the template below.
8. Generate with the image-generation tool and pass the absolute path to `references/SAMPLE_STYLE.png` as the reference image. Do not use web image search.
9. Inspect the output at full resolution. Regenerate when it violates any acceptance criterion.
10. Save and integrate the image only when the request includes a target asset or lesson update.

Do not ask again for content, ratio, labels, or destination when the user already supplied them. Ask only when missing information would materially change the learning meaning.

## Prompt template

Write the prompt in Japanese and include all applicable fields:

```text
参照画像 `references/SAMPLE_STYLE.png` は画風だけの参考です。見本画像のタイトル、番号、ラベル、複数見本を並べた構成は再現しないでください。完成画像は1つの学習ポイントを表す、単一構成のレッスン用イラストです。

この画像はレッスン内容テキストの前後に配置されます。本文を画像内で説明し直さないでください。タイトルと説明文は不要です。文字は原則なしとし、必要な場合だけ短い日本語の単語・数値を使ってください。

サイズ比は {w}:{h}。スマートフォンの縦型画面内で表示されるため、細部や小さな文字を避け、少ない要素で明快にしてください。外側の余白や枠は設けず、白い背景上で画面を有効に使ってください。ただし主要要素は切れないようにしてください。

細めで少し揺らぎのある黒い手描き線、白背景、淡い青・緑・黄・ピンクの色鉛筆風の塗り、柔らかく明るい日本語インフォグラフィック。平面的で親しみやすく、写真風・3D・濃い影・暗い背景にはしないでください。重要なオブジェクトを大きく目立たせ、背景は簡素にしてください。

使用してよい文字: {なし、または短いラベルの完全な一覧}

内容:
{視覚化する内容を日本語で簡潔に記述}
```

Replace the text field with `なし` when labels are unnecessary. When labels are allowed, enumerate every exact string and forbid all other text. Avoid asking the model to render long Japanese sentences.

## Acceptance criteria

Require all of the following:

- Represent the requested concept accurately with one obvious focal point.
- Match the hand-drawn black-outline and pale hatched-pastel language in the reference.
- Keep the background white and structurally simple.
- Omit titles, explanatory paragraphs, example numbers, legends, decorative borders, and style-sheet layouts.
- Remain understandable at smartphone width without zooming.
- Keep every allowed Japanese label exact, legible, and short; regenerate garbled text.
- Preserve the requested aspect ratio and avoid clipped primary objects.
- Avoid excessive empty margins while retaining minimal crop safety.

## Repository integration

Use PNG for lesson assets. For `ipa_ip`, place integrated images under:

```text
apps/ipa_ip/contents/lessons/images/<lesson-id>-<sequence>.png
```

Reference them from lesson JSON with the app-relative path:

```json
{"imageUrl": "lessons/images/<lesson-id>-<sequence>.png"}
```

Use the next unused sequence number unless the user specifies a filename. Insert an image block only when integration was requested or is clearly part of creating the lesson. Preserve unrelated user edits and never overwrite an existing image without explicit intent.

Read [references/style-guide.md](references/style-guide.md) before choosing an unspecified ratio or refining a failed generation.
