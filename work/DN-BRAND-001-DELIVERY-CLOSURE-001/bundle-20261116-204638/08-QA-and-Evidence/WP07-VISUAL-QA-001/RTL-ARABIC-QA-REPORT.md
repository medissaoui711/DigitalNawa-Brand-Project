# RTL and Arabic QA Report

**Rendered Arabic shaping / visual RTL: BLOCKED.**

Static HTML inspection found no invalid `lang=bi`; language tags are `en` or `ar`. Explicit direction checks found **0** elements with `lang=ar` lacking `dir=rtl` and **0** elements with `lang=en` lacking `dir=ltr`. There are 49 `<bdi>` isolation elements across the two specimens. The Arabic video/story headings and English episode numbers are separately marked in source.

This is metadata and source-structure evidence only. Chrome could not reach the loopback preview, so connected glyph shaping, reading order, punctuation placement, mixed Arabic/English wrapping, alignment, numerals, URL/identifier behavior, and font fallback were **NOT VERIFIED**. No RTL PASS is claimed.
