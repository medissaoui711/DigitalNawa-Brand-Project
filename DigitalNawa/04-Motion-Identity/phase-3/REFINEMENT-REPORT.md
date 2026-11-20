# DN-MOTION-001 — Phase 3 Experimental Intro Refinement

**Status:** Isolated implementation candidate. Not approved as the official motion signature and not production-ready.

## Objective

Refine the existing 9-second experimental intro without changing the storyboard, canonical logo source, approved brand palette, or the Phase 2 implementation on `main`.

## Changes in this candidate

- Increase symbol prominence through tokenized viewport constraints while preserving the source SVG aspect ratio.
- Increase Arabic/English wordmark and tagline sizes modestly; font family names remain candidates and font binaries are not added.
- Tighten the transition-particle field and use deterministic center-out sequencing for the 24-particle rise instead of row-order sequencing.
- Shorten the Arabic-to-English pause and increase controlled crossfade overlap. Arabic and English remain separate text nodes; no glyph morphing is introduced.
- Extend the final lockup hold and use a 0.15-second fade at the end of the 9-second timeline.

## Source-of-truth and boundaries

- `../brand-tokens.json` remains the source for all palette, typography, timing, layout and particle values.
- Existing approved palette values and approved brand wording are unchanged.
- No new colors, fonts, sound effects, music, logo geometry or external assets are introduced.
- The existing master SVG is referenced unchanged. Its geometry remains an unverified reconstruction, not an approved final logo master.
- This branch modifies only the Phase 2 motion token and controller files to create an isolated candidate. The `main` branch remains unchanged.
- No production integration, merge, or owner acceptance is included.

## Required validation

1. Run the existing preparation, source verification and lint commands.
2. Render all three aspect ratios at 60 fps / 540 frames.
3. Inspect checkpoints at 0, 2, 3.5, 5.5, 8, 8.85 and 9 seconds.
4. Verify particle sequencing, symbol prominence, safe margins and text hierarchy in portrait, square and landscape.
5. Verify Arabic shaping and RTL from the actual rendered frames; do not infer success from HTML attributes.
6. Repeat renders in the documented Docker environment and compare encoded and decoded frame hashes.
7. Review all three MP4s and the Arabic checkpoint before changing the status beyond candidate.

## Known blockers

- The Phase 2 environment report records that rendered QA was previously blocked. This Phase 3 branch does not claim that rendering has now succeeded.
- Font binaries and licensing are not resolved.
- Audio is intentionally out of scope until licensed sound assets are selected and documented.
- Final logo geometry and owner acceptance remain unresolved.
