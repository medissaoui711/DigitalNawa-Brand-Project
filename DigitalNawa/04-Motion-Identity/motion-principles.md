# DigitalNawa Motion Principles

**Status:** Candidate motion direction — not production-approved.

## 1. Rising Pixel

- Use 24 pixel units as the current owner-supplied concept.
- Each unit rises from approximately 100 design units below its intended position.
- Animate opacity from 0% to 100%.
- Per-unit duration: 0.6 seconds.
- Stagger interval: 0.04 seconds.
- Reconcile the 24 units with verified symbol geometry before implementation; do not invent or alter the master mark to force a fit.

## 2. Assembly

- Pixel units converge to assemble the DN symbol.
- The final assembled mark must use the source symbol geometry without redrawing, stretching, or distorting it.
- The assembly should read as a deliberate construction, not a particle explosion.
- The exact trajectories and anchor coordinates remain unverified until the source geometry and storyboard are reviewed together.

## 3. Dual Reveal

- Reveal the Arabic and English brand names as a coordinated bilingual identity moment.
- Preserve correct Arabic shaping, glyph order, and right-to-left behavior.
- Prefer a crossfade between correctly rendered Arabic and English text states over morphing individual Arabic glyphs.
- No final wordmark font is approved; load and test the actual selected font before rendering.

## 4. Slogan Lockup

- Reveal the words in order: **Build.** **Innovate.** **Teach.**
- Candidate scale transition for each word: 95% to 100%.
- Keep timing measured and consistent with the overall 9-second storyboard.
- Preserve the exact approved punctuation and wording.

## Shared motion language

- Preferred easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Avoid linear easing and bounce effects.
- Use no unapproved glow, gradients, color tints, or extra visual effects.
- Limit the motion palette to the approved brand colors; the proposed Dark Brown background remains a candidate usage decision.
- Maintain a clear visual hierarchy: symbol first, bilingual name second, tagline third.

## Accessibility and restraint

- Avoid rapid flashing and unnecessary high-frequency movement.
- Ensure the logo and tagline remain legible at all three output aspect ratios.
- Do not rely on color alone to communicate meaning.
- Provide a reduced-motion or static fallback when this system is integrated into interactive experiences.

## Implementation gate

These principles describe a motion direction, not a completed animation. Phase 2 must validate timing, pixel mapping, Arabic shaping, typography, cropping, color contrast, and deterministic rendering before acceptance.
