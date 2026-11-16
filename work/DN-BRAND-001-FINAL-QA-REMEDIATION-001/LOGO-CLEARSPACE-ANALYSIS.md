# Logo Clear-Space Analysis

**Status: OWNER DECISION REQUIRED. Existing source files unchanged.**

| Source | Rule | Unit/reference | Scope |
|---|---|---|---|
| DigitalNawa/03-Logo-Assets/09-Documentation/visual-system-foundation.md, Construction and usage | at least one quarter of symbol height | proportional; visible-path bounds vs 240-unit viewBox not specified | symbol generally; lockup scope unclear |
| work/DN-BRAND-001-WP04-EXEC-001/logo-system-notes.md, Provisional geometry-derived guidance | at least 19 source units around visible bounds | SVG units; also width of rising-pixel square | symbol bounds; external lockup/internal gap unclear |
| work/DN-BRAND-001-WP05-EXEC-001/DigitalNawa-Brand-Guidelines.candidate.md, logo QA notes | repeats 19-unit proposal and notes quarter-height conflict | source units vs undefined height basis | provisional |

WP04 notes estimate master viewBox 280x240 and visible y bounds 17..230, about 213 units. Quarter visible height is about 53.25; quarter viewBox height is 60. 19 units is one rising-pixel width. Bounds are estimates, not independent optical measurements. None is approved.

Proposed harmonization, NOT OWNER-APPROVED: S >= 0.25 x H_visible, where H_visible is transformed visible symbol-path height. Measure from outermost symbol bounds to unrelated content on all sides, scaling with the symbol transform. For symbol-only, apply around the mark. For horizontal/stacked/bilingual lockups, apply around full lockup outer bounds using symbol height; define internal symbol-wordmark spacing separately. Never mirror DN geometry. Owner/design authority must approve the formula and exact measurement basis.

Original visual reference remains absent; proposal does not establish geometry fidelity.
