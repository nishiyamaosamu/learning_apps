# Style guide

## Source reference

Use `SAMPLE_STYLE.png` in this directory as the canonical reference. It is a 1536×1024 style sheet containing multiple examples. Extract only its visual language; never copy its title, numbered sections, captions, or contact-sheet layout.

## Visual language

- Draw with thin, slightly irregular black outlines that feel hand-written.
- Fill selected shapes with sparse diagonal color-pencil hatching.
- Limit fills to pale blue, green, yellow, and pink on a clean white background.
- Prefer simple circles, arrows, icons, people, and familiar objects.
- Keep shapes flat, friendly, and immediately recognizable.
- Make the key object larger or more saturated than supporting elements.
- Use few elements and generous internal separation, but no large outer margin.

Avoid photorealism, glossy vectors, 3D rendering, gradients, heavy shadows, dark backgrounds, dense decoration, tiny writing, and generic corporate stock-art styling.

## Composition selection

Choose the smallest composition that communicates the point:

- One concept or person-centered scene: `4:3`.
- Comparison, cause and effect, or a 2–4 step flow: `16:9`.
- Long sequence or wide relationship diagram: `2:1` or `8:3`.
- One compact symbol or object: `1:1`.

Default to `16:9` for a lesson image when no option is clearly better. Avoid portrait ratios unless explicitly requested because the image appears inside a vertically scrolling smartphone page.

## Text policy

Prefer visual symbols over words. Use text only when the distinction would otherwise be ambiguous, such as `原因` and `結果`, binary digits, or short category names. Supply an exact allowlist in the generation prompt. Treat any extra, misspelled, or pseudo-Japanese text as a failed output.

## Common failure corrections

- If the result copies the reference sheet, state that the output must be one scene with no title, numbering, grid, or multiple examples.
- If it is too dense, reduce it to one focal object and at most three supporting elements.
- If text is garbled, remove nonessential labels or regenerate with a shorter exact allowlist.
- If the style is too digital, emphasize irregular black pen lines and sparse color-pencil hatching.
- If the image has excessive margins, enlarge the central composition while keeping all primary objects inside the frame.
