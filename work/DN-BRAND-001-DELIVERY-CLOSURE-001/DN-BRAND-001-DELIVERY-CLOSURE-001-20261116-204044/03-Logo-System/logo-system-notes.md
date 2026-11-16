# DN-BRAND-001-WP04-EXEC-001 — Candidate Logo System Notes

**Status:** PROVISIONAL — NOT APPROVED FOR PRODUCTION  
**Task directory:** C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP04-EXEC-001

## Source provenance
- Source file: C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\02-Master\dn-symbol-master.svg
- Size: 798 bytes; SHA-256: 52b96d8f7c706944de8199eccfda27fd624eb2ddf6dadfc23e3a1c982017353a
- SVG dimensions/viewBox: 280 × 240; 0 0 280 240
- Structure: group dn-symbol with path IDs d-monogram, n-monogram, rising-pixels.
- Method: each candidate copies the source path d attributes verbatim; only fill, transforms, composition and editable text were varied. Original source was not modified.
- Source documentation describes a geometric reconstruction of the written concept, not a comparison against an original visual reference. No fidelity claim is made.

## Candidate architecture
There are 65 candidates: 13 compositions × 5 color variants. The index lists every file. All SVG backgrounds are transparent. HTML alone supplies palette preview surfaces.
Compositions include symbol-only, standalone English/Arabic wordmarks, two English horizontal spacing candidates, Arabic horizontal, two bilingual hierarchy alternatives, three stacked arrangements, and separate English/Arabic tagline arrangements.
Variants: full-color, dark-background-reverse, light-background, monochrome-dark, monochrome-light.

## Typography and RTL/LTR
English text remains editable and references Inter/system sans fallbacks. Arabic remains editable with IBM Plex Sans Arabic/Noto Sans Arabic/Tahoma fallbacks and language/direction metadata. Bilingual runs carry explicit direction. Cairo remains an alternative owner decision and is not substituted in the primary Arabic wordmarks. No font files were downloaded or installed. SVG-renderer shaping, actual font availability, glyph coverage and text bounds are unverified.

## Colors
Only approved palette values appear: Warm Ivory #FEF3C7, Warm Gray #78716C, Muted Teal #0EA5A4, Dark Brown #1C1917, Warm Orange #EA5808. No color was added or redefined. Candidate variants are not claims of suitability on every surface.

## Provisional geometry-derived guidance
**PROVISIONAL — SUBJECT TO FINAL QA**
- Source viewBox is 280 × 240. Source path-coordinate bounds are approximately x=42…261 and y=17…230; rising-pixel squares are 19 units wide. These are source-coordinate observations, not rendered optical measurements.
- Test clear space of at least 19 source units around the symbol visible bounds, scaled proportionally.
- English horizontal candidates use symbol/wordmark start points around 280 and 308 viewBox units. Arabic horizontal composition places the symbol to the right; the symbol paths are not mirrored.
- Stacked candidates align symbol and wordmarks on a shared center axis. These are comparison layouts, not approved rules.
- Suggested symbol display starting width: 32 CSS px or greater; at 32px a 19-unit pixel scales to about 2.17px based on the 280-unit source width. 16px favicon display is NOT VERIFIED and may lose detail. Review horizontal lockups from 240px width and stacked lockups from 144px width as provisional thresholds only; actual text legibility depends on font rendering.

## Limitations and owner decisions
- All compositions, spacing, minimum sizes, variant usage and fonts are provisional.
- The original visual reference is unavailable; no exact-reconstruction or geometric-fidelity claim is made.
- Arabic shaping/diacritics and RTL visual ordering have not been inspected in a browser.
- Decide preferred English spacing, bilingual hierarchy, tagline usage, Arabic face (IBM Plex Sans Arabic or Cairo), and minimum sizes.
- Confirm variant/background suitability with actual uses; obtain owner acceptance before promotion.

## Final QA checklist
1. Render every candidate in target browsers/design tools; inspect clipping, text bounds, baselines, Arabic shaping/diacritics, bidi order and spacing.
2. Verify actual fonts and weights after owner decision; evaluate editable text and any separately authorized outline exports.
3. Inspect composition alternatives at small sizes, including 16px/32px symbol use.
4. Check palette variants on real surfaces and measure relevant contrast.
5. Record authoritative reference/contract evidence and owner selection before any master promotion.
6. Keep this package isolated until separately authorized integration.
