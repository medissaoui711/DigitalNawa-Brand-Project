# Accessibility Evidence

**Result: RESOLVED - PARTIALLY VERIFIED; full WCAG compliance NOT VERIFIED.**

Independent sRGB relative-luminance ratios:
| Foreground/background | Ratio | Normal text |
|---|---:|---|
| Dark Brown #1C1917 / Warm Ivory #FEF3C7 | 15.71:1 | Pass |
| Warm Gray #78716C / Warm Ivory #FEF3C7 | 4.31:1 | Fail |
| Muted Teal #0EA5A4 / Warm Ivory #FEF3C7 | 2.72:1 | Fail |
| Warm Orange #EA5808 / Warm Ivory #FEF3C7 | 3.20:1 | Fail |

Gray/Ivory and Orange/Ivory meet 3:1 large-text threshold but fail 4.5:1 normal-text threshold. Teal/Ivory meets neither. These are pair-level results only.

tinycss2 parsed WP02 V2, WP06, WP07, WP08 CSS with no errors (exit 0); focus-visible declarations exist. HTML source scan: one h1 each, no empty/missing img alt; form label/control counts 36/36 and 6/6. Label association, keyboard operation, actual theme pairings, non-text contrast, focus adjacency and screen-reader behavior are not verified. No full WCAG claim.
