# Phase 3 Static Verification

**Status:** Static verification implemented; not yet executed in the HyperFrames/Docker render environment.

Run from `DigitalNawa/04-Motion-Identity/phase-2`:

```bash
npm run verify:phase3
```

The script checks:
- 9 seconds × 60 fps = 540 target frames.
- 24 particles and deterministic center-out ordering.
- Aspect-ratio-preserving logo bounds against both width and height caps for portrait, square and landscape.
- Particle rise completes before symbol assembly.
- Arabic and English remain separate text nodes using crossfade, without glyph morphing.
- Approved tagline and valid final-hold/fade timing.
- All three owner-specified output dimensions.
- Approved brand palette values remain unchanged.

This is a static guardrail only. It does not claim actual render success, visual quality, Arabic shaping, RTL correctness, audio, or deterministic MP4 output. Those remain mandatory final-QA evidence.
