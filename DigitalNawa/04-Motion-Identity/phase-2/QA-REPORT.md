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


## Environmental Execution Constraints

The current execution environment could not run the final render pipeline. The blocker is environmental, not evidence of a successful render. Completion requires all of the following:

- **Docker Engine:** a running Docker-compatible engine. The HyperFrames CLI is invoked with `--docker`; a Docker CLI alone is insufficient.
- **Network access for initial dependency resolution:** npm registry access is needed to install the exact top-level versions and resolve their transitive dependencies.
- **Node.js 22 or later**, npm, FFmpeg and FFprobe.
- **Writable workspace:** the owner must be able to generate and commit `package-lock.json`, rendered outputs and reports on `feature/dn-motion-001`.

### Exact owner execution commands

From `DigitalNawa/04-Motion-Identity/phase-2/` on the host, build and enter the provided toolchain container:

```bash
docker build -t dn-motion-render:local .
docker run --rm -it \
  -v "$PWD:/workspace" \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -w /workspace \
  dn-motion-render:local
```

Inside the container:

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

Then commit `package-lock.json`, `reports/render-integrity.json`, `reports/determinism-report.json`, and `reports/arabic-rtl-proof.png` to the feature branch after reviewing the generated media. Record command exit codes and tool versions. Inspect all three MP4 files and the Arabic proof frame; do not promote any output-only gate without the corresponding actual artifact.

**Docker socket risk:** the supplied container requires access to the host Docker socket for HyperFrames rendering. This is effectively privileged access to the host Docker daemon. Run only on a trusted, isolated machine or disposable CI runner. Do not use a shared multi-tenant host.

### Workflow decision

No GitHub Actions workflow was added in this branch. A workflow introduced only in a pull request is not a reliable way to execute that same pull request before merge because the PR event workflow must be available from the base branch. Activating it would require a separately authorized change to the default branch or a trusted external runner. This handover does not authorize a change to `main`.

**Handover state:** source candidate remains intact; render and output QA remain BLOCKED until the owner executes the commands above and attaches the real output evidence.

## Release decision

Source-code prototype candidate only. It is not a rendered animation, does not satisfy the rendered Arabic-shaping gate, and does not satisfy the determinism evidence gate. Keep PR in Draft; do not merge or promote to production.
