# Static Accessibility Addendum

**Scope:** Source-only inspection of 10 existing HTML specimens across WP03-EXEC-011 and WP04–WP08, plus candidate CSS files in those packages. This is not browser, assistive-technology, or full WCAG testing.

## Static findings

| Check | Observation | Limitation |
|---|---|---|
| Document language | All 10 inspected HTML files have an `<html lang>` attribute. | A present attribute does not validate language correctness for every fragment or rendered content. |
| Semantic headings | Heading elements (`h1`–`h6`) were found in all 10 files. | Heading order, uniqueness, and screen-reader navigation were not functionally tested. |
| Images | 82 `<img>` elements inspected; 0 were missing an `alt` attribute. | Whether each alternative is meaningful or correctly empty was not judged visually/contextually. CSS backgrounds and SVG-as-image cases are outside this count. |
| Interactive semantics | WP06 component specimen contains native `<button>` and `<a>` elements; WP06 application-pattern specimen also contains these native elements. | Accessible names, keyboard operation, state announcements, target behavior, and focus order were not runtime tested. |
| Focus indicators | WP06 component CSS contains grouped `:focus-visible` rules with outline and boundary shadow. WP07 and WP08 CSS each contain `:focus-visible` rules. | Visible contrast and behavior after actual rendering were not tested; WP03 typography CSS has no focus rules because it is a specimen/token stylesheet. |
| Responsive CSS | WP06 component CSS has 2 media queries; WP07 and WP08 each have responsive media queries (2 each). | Breakpoints and overflow have not been visually validated. |
| Reduced motion | No `prefers-reduced-motion` rule was found in the inspected CSS files. | This static search does not cover runtime behavior or styles outside these packages. |
| Color contrast | The existing visual-system foundation documents Dark Brown/Warm Ivory 15.71:1, Warm Gray/Warm Ivory 4.31:1, Muted Teal/Warm Ivory 2.70:1, and Warm Orange/Warm Ivory 3.20:1. | Only documented pairs were considered. 4.31:1, 2.70:1, and 3.20:1 are below 4.5:1 for normal text; contextual use, large text, graphics, and all other pairs were not exhaustively checked. |

## Not verified

Rendered text/background contrast across all states, keyboard traversal, focus visibility in browser, accessible names and roles, screen-reader output, zoom/reflow, reduced-motion behavior, color-only cues, and WCAG conformance. Static source observations must not be reported as a WCAG pass.