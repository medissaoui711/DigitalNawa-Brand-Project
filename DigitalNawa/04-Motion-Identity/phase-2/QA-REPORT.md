# DN-MOTION-001 Phase 2 — QA Evidence Report

**Result: BLOCKED — source prototype files are committed; rendered-video acceptance evidence is not available.**

## Verified from repository source

- Token audit completed against the current branch: **83 token value records**, all with an allowed status (`approved`, `candidate`, or `unverified`) and non-empty provenance.
- HyperFrames `0.9.64` and GSAP `3.15.1` are pinned exactly in `package.json`.
- The preparation script is designed to generate three isolated HyperFrames projects from token-derived dimensions: 1080×1920, 1080×1080 and 1920×1080.
- Each generated project template has a matching `data-composition-id`, `data-width`, `data-height`, timed visible clips and a paused GSAP timeline registered under the matching ID.
- The controller reads brand text, colors, typography, dimensions, storyboard timings, easing, particle count and layout values from the parent `brand-tokens.json`. No brand palette hex values or brand-name strings are copied into the controller or composition template.
- The preparation script uses a byte-copy operation for the canonical SVG and records its SHA-256. It does not edit, trace, redraw or morph the source asset.
- The master SVG remains explicitly unverified as final logo geometry.
- Arabic and English are separate text nodes. Arabic uses `lang="ar"`, `dir="rtl"` and `unicode-bidi: isolate`; the transition is a token-guarded crossfade rather than glyph morphing.

## Execution environment observed

- Node.js: v22.16.0
- FFmpeg: 7.1.5
- Docker: unavailable
- Outbound network from the execution container: unavailable. GitHub clone and npm package retrieval failed.
- A local earlier smoke-test version of the preparation workflow used placeholder GSAP files to exercise file-copy and template-generation paths. Those placeholders were not actual GSAP and were not used for rendering; this is not a test of the exact current committed source revision.

## Required evidence not produced

| Gate | Status | Reason |
|---|---|---|
| Current-branch Node syntax checks | NOT VERIFIED | The exact committed scripts could not be materialized and executed in the isolated environment |
| HyperFrames lint | NOT RUN | Pinned CLI package could not be installed |
| Dependency lockfile | BLOCKED | npm registry unavailable; no lockfile was fabricated |
| MP4 render for all 3 canvases | BLOCKED | HyperFrames package unavailable; Docker unavailable |
| Exactly 540 frames per output | NOT VERIFIED | No rendered media to probe |
| Arabic shaping/RTL in rendered frame | NOT VERIFIED | No rendered frame or screenshot |
| Rendered SVG visual comparison | NOT VERIFIED | No rendered composition |
| Repeated-render output hashes | NOT VERIFIED | No MP4 outputs |
| Decoded-frame determinism | NOT VERIFIED | No MP4 outputs |

## Reproduction

Run in an environment with Node.js 22+, npm, FFmpeg/FFprobe, network access for the first dependency installation, and Docker for deterministic rendering:

```bash
npm install
npm run prepare:assets
npm run verify:source
npm run lint
npm run render:all
npm run verify:render
npm run verify:determinism
npm run capture:arabic
```

Commit the generated `package-lock.json` before treating the dependency graph as reproducible. Inspect `reports/arabic-rtl-proof.png` visually and attach it together with `reports/determinism-report.json` to the PR. Do not change any gate to PASS without those artifacts.

## Release decision

Source-code prototype candidate only. It is not a rendered animation, does not satisfy the rendered Arabic-shaping gate, and does not satisfy the determinism evidence gate. Keep PR in Draft; do not merge or promote to production.
