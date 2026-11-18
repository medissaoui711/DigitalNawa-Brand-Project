# DN-MOTION-001 — HyperFrames Prototype (Phase 2)

**Status:** Implementation candidate. Not owner-approved and not production-ready.

## Source-of-truth and asset handling

- `../brand-tokens.json` is the only source for palette, typography, brand wording, timing, dimensions, layout, particle and easing values. The preparation script validates the token records and generates the runtime payload; the animation controller reads values from that payload.
- The canonical logo reference is `../../03-Logo-Assets/02-Master/dn-symbol-master.svg`. The preparation step copies it byte-for-byte to each isolated composition project and records its SHA-256. It never edits, traces, redraws or morphs the source SVG.
- The SVG is a previously documented geometric reconstruction, not certified final master geometry. It is used as an unchanged visual reference only.
- The 24 particles are transition accents, not a claim that the master SVG contains 24 independent pixels.
- Font family names come from the token registry, but font binaries are not bundled. Actual font resolution, shaping and RTL must be proven in rendered video output.

## Toolchain

- Node.js >= 22
- HyperFrames CLI `0.9.64` (exact version pin; Apache-2.0)
- GSAP `3.15.1` (exact version pin; GreenSock Standard "no charge" license)
- FFmpeg/FFprobe; Docker is required for the deterministic render procedure.

See the official [HyperFrames CLI](https://hyperframes.app/docs/5-packages/cli), [GSAP animation integration](https://hyperframes.app/docs/3-guides/3-gsap-animation), [HTML schema](https://hyperframes.app/docs/6-reference/html-schema), and [deterministic rendering guide](https://hyperframes.app/docs/3-guides/4-rendering).

## Run

From this directory:

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

The preparation step creates three isolated HyperFrames projects, each with its own `index.html`, assets and runtime files. The CLI runs from each composition project; it does not rely on a non-existent `--composition` flag. Each timeline is paused and registered under the exact `data-composition-id`.

Each output targets 60 fps and 9 seconds (540 frames), with dimensions read from the token registry. `verify:render` checks dimensions, frame rate, frame count and SHA-256. `verify:determinism` performs two Docker renders per format, records tool/runtime versions and compares both encoded hashes and decoded frame hashes. `capture:arabic` extracts a frame from the rendered video for human RTL/shaping inspection.

## Licensing and scope

No third-party font, music, sound effect or stock-media files are bundled. Record source, version, license and redistribution rights before adding any external asset. GSAP is installed from npm and is not copied into the repository. Preserve its license notice when distributing derived bundles.

This project does not alter the canonical logo, original identity source files, `main`, repository settings or production assets. All prototype assumptions remain candidates pending rendered QA and owner acceptance.
