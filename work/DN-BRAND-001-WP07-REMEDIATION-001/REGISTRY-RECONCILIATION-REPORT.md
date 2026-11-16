# Registry Reconciliation Report

- Template index: **33 records, 33 unique IDs**.
- Format registry: **9 formats**; every template format ID resolves.
- Candidate coverage: **20 IMPLEMENTED**, **13 NOT IMPLEMENTED**.
- HTML representation: **33 IDs**, all unique, no missing or extra IDs.
- Local image/stylesheet references: **16 checked**, **0 missing**.
- Format usage: `avatar-square: 3, cover-wide: 3, cover-compact: 2, feed-square: 9, feed-portrait: 3, carousel-portrait: 1, story-vertical: 7, video-landscape: 5`.
- Orphan registered format: `video-vertical` (preset exists but has no registered template).

## Explicitly not implemented

- `cover-general-en` — No supported full cover composition was supplied in either source HTML.
- `cover-professional-en` — Positioning is registered, but no complete cover composition/copy is supplied in the source package.
- `cover-education-ar` — No supported Arabic cover copy/composition is supplied in the source package.
- `cover-brand-ar` — No complete Arabic compact cover composition is supplied in the source package.
- `cover-brand-en-compact` — No complete English compact cover composition is supplied in the source package.
- `post-education-tip-ar` — No source composition for this registered Arabic educational-tip template.
- `post-project-showcase-en` — No distinct source composition for this registered project-showcase template.
- `post-milestone-en` — No supported milestone/achievement content is supplied.
- `post-quote-ar` — No source quote was supplied; no quotation was invented.
- `post-discussion-en` — No distinct registered discussion composition content is supplied.
- `pillar-development` — Registry requires bilingual/mixed treatment; available pillar guidance is English-only.
- `pillar-ai` — Registry requires bilingual/mixed treatment; available pillar guidance is English-only.
- `pillar-education` — Registry requires bilingual/mixed treatment; available pillar guidance is English-only.

`NOT IMPLEMENTED` preserves the registered record and states that the available source did not support a complete composition. No candidate content was invented for those records.
