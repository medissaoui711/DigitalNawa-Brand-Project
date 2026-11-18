# Motion Render Specification

**Status:** Candidate specification — implementation has not started.

## Output targets

| Variant | Canvas | Intended use |
|---|---:|---|
| Vertical | 1080 × 1920 | Short-form vertical video |
| Square | 1080 × 1080 | Square social placements |
| Landscape | 1920 × 1080 | Presentation and widescreen video |

Shared target: 60 frames per second and 9 seconds (540 frames).

## Composition rules

- Maintain one motion system across all aspect ratios.
- Adapt composition and safe areas per canvas; do not stretch a finished frame to create another aspect ratio.
- Preserve the symbol's intrinsic proportions and source geometry.
- Keep the bilingual name and tagline within a safe region appropriate to each canvas.
- Do not crop the symbol, Arabic wordmark, English wordmark, or tagline.
- Do not invent a new logo lockup to solve responsive layout constraints; document any unresolved layout conflict for review.

## Color and typography

- Consume values from `brand-tokens.json`; do not duplicate hard-coded values in future implementation files.
- Use only the approved palette values unless a new color receives explicit owner approval.
- Dark Brown as the opening background is a candidate usage decision, not a new approved semantic color.
- Font candidates must not be treated as final selections. Verify font version, source, license, embedding permissions, and actual renderer loading.
- Test Arabic shaping and RTL in rendered video output, not merely in a browser preview.

## Proposed toolchain

HyperFrames is the proposed HTML-based rendering layer. No package, version, runtime, or dependency is installed or pinned by this documentation phase. Verify current tool documentation, license, supported runtimes, and deterministic-render behavior before implementation.

## Deterministic rendering

For the same source revision, assets, fonts, configuration, and render environment, repeated renders should produce equivalent frame content and duration. Record:

- source commit and branch;
- renderer and runtime versions;
- font file names, versions, and hashes;
- token file hash;
- render command and exit status;
- output dimensions, frame rate, frame count, and duration;
- output file hashes.

If byte-identical video output is not achievable because of container metadata or codec behavior, document the variance and compare decoded frame content under a defined tolerance.

## QA acceptance gates

1. All three canvases render at their exact target dimensions.
2. Each output contains exactly 540 frames at 60 fps.
3. No cropping, stretching, clipping, or unintended overflow occurs.
4. Symbol geometry remains unchanged from the selected source.
5. Arabic text shapes correctly and reads in the intended RTL order.
6. English text and tagline remain legible and correctly punctuated.
7. Colors resolve from the token registry; no unapproved colors appear.
8. Audio, fonts, and other external assets have documented licensing provenance.
9. Repeat renders pass the documented determinism comparison.
10. Visual review evidence and a QA report are attached before owner acceptance.

## Out of scope for Phase 1

No animation source code, video output, audio assets, font binaries, dependency installation, workflow automation, or production integration is included.
