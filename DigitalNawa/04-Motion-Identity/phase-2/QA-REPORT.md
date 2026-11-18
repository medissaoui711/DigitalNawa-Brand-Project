# DN-MOTION-001 Phase 2 — QA Evidence Report

**Result: BLOCKED — source prototype prepared; rendered-video acceptance evidence is not yet available.**

## Verified source design

- Token registry is the only source for visual, textual, timing and layout values.
- All token value records must carry one allowed status and non-empty provenance.
- The preparation script generates three independent HyperFrames projects with 1080×1920, 1080×1080 and 1920×1080 canvases.
- Each project has an `index.html`, a paused GSAP timeline, and a matching `window.__timelines[data-composition-id]` registration.
- The canonical SVG is copied unchanged. The source geometry remains unverified as a final master.
- Arabic and English text use separate DOM text nodes. Arabic is marked `lang="ar"`, `dir="rtl"` and `unicode-bidi: isolate`; the transition is a crossfade, not glyph morphing.
- HyperFrames and GSAP versions are exactly pinned in `package.json`.

## Execution environment observed during implementation

- Node.js: v22.16.0
- FFmpeg: 7.1.5
- Docker: unavailable
- Outbound network from the execution container: unavailable. GitHub clone and npm package retrieval failed.
- A temporary placeholder was used only to smoke-test the preparation script's path/copy/template logic; it was not an actual GSAP runtime and was not used for a render.

## Required evidence not produced

| Gate | Status | Reason |
|---|---|---|
| HyperFrames lint | NOT RUN | Pinned CLI package could not be installed in the isolated environment |
| Dependency lockfile | BLOCKED | npm registry unavailable; no lockfile was fabricated |
| MP4 render for all 3 canvases | BLOCKED | HyperFrames package unavailable; Docker unavailable |
| Exactly 540 frames per output | NOT VERIFIED | No rendered media to probe |
| Arabic shaping/RTL in rendered frame | NOT VERIFIED | No rendered frame or screenshot |
| Source SVG visual comparison | NOT VERIFIED | Copy integrity can be checked; rendered composition is unavailable |
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
