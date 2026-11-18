# DigitalNawa Motion Identity — Phase 1 Foundation

**Workstream:** DN-MOTION-001  
**Status:** Documentation draft — candidate, not production-approved  
**Branch:** `feature/dn-motion-001`

## Purpose

Establish a traceable, machine-readable foundation for DigitalNawa motion work before implementing any animation or rendering project. This directory is additive and isolated from the existing identity assets.

## Authority and source-of-truth rules

1. The existing brand repository remains the source of existing identity assets. This directory does not replace or reinterpret them.
2. The approved brand palette is transcribed into `brand-tokens.json` with per-value status and provenance.
3. Candidate and unverified values are explicitly labelled. A candidate is not an approval.
4. Logo geometry, typography, Arabic shaping, and any unverified asset must not be treated as final.
5. When a value conflicts with a source asset or an owner decision, stop and record the conflict; do not silently normalize it.
6. The token file is the proposed Single Source of Truth for future motion implementation. It becomes authoritative for implementation only after token validation and owner acceptance.

## Existing source references

The following repository assets are references, not files modified by this workstream:

- Logo symbol master: `DigitalNawa/03-Logo-Assets/02-Master/dn-symbol-master.svg`
- Logo asset manifest: `DigitalNawa/03-Logo-Assets/08-Manifest/asset-manifest.json`
- Existing design-token exports, if present in the current source tree: `DigitalNawa/03-Logo-Assets/06-Exports/design-tokens.json` and `design-tokens.css`

The symbol has previously been documented as a geometric reconstruction from the approved written concept; the original reference image was not present in the reviewed source package. Wordmark font selection and Arabic shaping remain unresolved. Do not infer final geometry or font approval from the presence of SVG files.

## Licensing and intellectual property

- This phase adds documentation and token metadata only; it does not add third-party font binaries, music, sound effects, stock media, or copied external artwork.
- Existing DigitalNawa assets remain subject to their actual ownership and any applicable source-project terms. This README does not grant or expand any license.
- Before adding font files, audio, footage, plugins, or external artwork, record the exact source, version, license, attribution obligations, and redistribution permissions.
- HyperFrames is a proposed rendering tool, not a dependency added by this phase. Verify its current license and version at adoption time.
- Nothing in this directory constitutes legal clearance, trademark registration, or final brand approval.

## Directory map

| File | Purpose |
|---|---|
| `brand-tokens.json` | Typed token values with mandatory per-value status and provenance |
| `motion-principles.md` | Motion principles and implementation constraints |
| `motion-storyboard.md` | Nine-second storyboard and timing |
| `render-spec.md` | Frame rate, output formats, and render acceptance requirements |

## Status vocabulary

Every token value uses exactly one of:

- `approved` — explicitly approved brand value or owner-supplied specification.
- `candidate` — proposed value or direction requiring validation or acceptance.
- `unverified` — evidence is insufficient to assert correctness.

These labels describe the state of the value, not production readiness of the entire workstream.

## Phase boundary

Included: documentation, provenance, token structure, motion specification.

Excluded: modifying existing identity assets, changing the public website, adding animation code, installing dependencies, adding media assets, creating rendered videos, changing repository settings, or merging to `main`.

## Acceptance gates

- JSON parses and conforms to the documented status vocabulary.
- Every token value has a status and source.
- No existing file outside `DigitalNawa/04-Motion-Identity/` is changed.
- Candidate and unverified values remain visibly distinguished.
- Owner review is required before Phase 2 implementation.
