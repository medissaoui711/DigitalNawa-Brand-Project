# CSS and Accessibility Report

## CSS validation

CSS parser availability check: `{'tinycss2': False, 'cssselect2': False, 'cssutils': False, 'cssselect': False, 'css_parser': False}`. None of the tested CSS parsers is installed. No dependency was installed. Simple static checks found 3 local `@import` references, missing imports **0**, brace-count mismatches **0**, and used HTML class tokens with no matching class selector **0**. These lexical checks are not CSS grammar validation. A selector-name heuristic finds defined-but-unused rules, including optional styles such as `.art-paper`, `.code-sample`, `.safe-guide`, `.social-table`, and shared WP06 component styles; no missing used-class selector was found.

## Accessibility evidence

- `:focus-visible` rule: present. `prefers-reduced-motion: reduce`: present.
- Focusable elements: 0 across both specimens; keyboard focus appearance was not exercisable.
- HTML images: 14; missing/empty `alt`: 0.
- Language/direction metadata exceptions: 0.
- No screen-reader, keyboard, rendered zoom, or responsive tests were possible.

## Static contrast calculations

Ratios below use WCAG relative luminance from declared CSS/token HEX values. These are static pairs, not a rendered-interface conformance result.

| Pair | Foreground / background | Ratio | Note |
|---|---|---:|---|
| art-light text | Dark Brown #1C1917 / Warm Ivory #FEF3C7 | 15.71:1 | used |
| art-dark text | Warm Ivory #FEF3C7 / Dark Brown #1C1917 | 15.71:1 | used |
| art-teal text | Dark Brown #1C1917 / Muted Teal #0EA5A4 | 5.78:1 | used |
| light surface primary | Dark Brown #1C1917 / Light surface #FFF9E8 | 16.63:1 | theme token pair |
| light surface secondary | Secondary text #57514D / Light surface #FFF9E8 | 7.42:1 | theme token pair |
| dark surface primary | Warm Ivory #FEF3C7 / Dark elevated surface #332E2A | 12.05:1 | dark theme token pair |
| dark surface secondary | Dark secondary text #D6D3D1 / Dark elevated surface #332E2A | 9.01:1 | dark theme token pair |
| focus halo on teal | Warm Ivory #FEF3C7 / Muted Teal #0EA5A4 | 2.72:1 | focus shadow; outer outline also present |
| unused dark art-paper | Dark Brown #1C1917 / Dark surface #292421 | 1.14:1 | unused CSS class; not rendered |

The unused `.art-paper` class sets Dark Brown text over the theme surface. Under the declared dark surface `#292421`, the static ratio is **1.14:1**. This class is not used in either HTML specimen; it is a potential contrast defect if the variant is used in dark mode, not a confirmed rendered defect. The ivory focus halo against teal is 2.72:1, while the CSS also defines a Dark Brown outer outline against teal at 5.78:1. The appearance and applicability of the focus combination remain unverified.

No WCAG conformance claim is made.
