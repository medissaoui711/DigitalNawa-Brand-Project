# DigitalNawa Logo Motion — 9-Second Storyboard

**Status:** Candidate storyboard based on the owner-provided sequence.  
**Frame target:** 60 fps.  
**Total duration:** 9 seconds.

| Timecode | Duration | Visual action | Audio cue |
|---|---:|---|---|
| 00:00–00:02 | 2.0 s | Dark opening. 24 pixel units rise from below with opacity 0% → 100%. | Whoosh placeholder |
| 00:02–00:03.5 | 1.5 s | Pixel units converge and assemble the DN symbol. | Ding placeholder |
| 00:03.5–00:05.5 | 2.0 s | Symbol settles. Arabic brand name transitions to English brand name using a shaping-safe reveal. | None specified |
| 00:05.5–00:08 | 2.5 s | Tagline appears sequentially: Build. Innovate. Teach. Each word scales from 95% to 100%. | None specified |
| 00:08–00:09 | 1.0 s | Final lockup hold followed by fade out within the final second. | None specified |

## Timing notes

- The storyboard totals exactly 9 seconds.
- At 60 fps, the target duration is 540 frames.
- The first two seconds must accommodate the staggered 24-pixel rise and its completion.
- The 2.0–3.5 second assembly window must end with the source mark intact and undistorted.
- The Arabic/English transition must not morph glyph outlines. Use two correctly shaped text states and a controlled crossfade unless renderer testing proves a better safe method.
- The final hold/fade split within 8–9 seconds is not yet specified; tune it during the prototype and submit it for review rather than silently fixing an arbitrary split.

## Sound and licensing

“Whoosh” and “ding” are cue descriptions only. No sound files are included or selected. Before adding audio, document the exact asset source, creator, license, attribution requirements, and redistribution rights. Do not use unlicensed commercial music or sound effects.

## Required review evidence

- Frame-accurate timeline or equivalent render report.
- Visual checkpoints at 0, 2, 3.5, 5.5, 8, and 9 seconds.
- Arabic and English text legibility and shaping evidence.
- Evidence that the assembled symbol matches the source geometry.
- Confirmation that the 9-second output is exactly 540 frames at 60 fps.
