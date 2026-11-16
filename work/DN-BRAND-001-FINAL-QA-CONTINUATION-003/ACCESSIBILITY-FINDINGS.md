# Accessibility Findings

## Confirmed findings

1. **Color-pair failures are confirmed, but actual text usage is not inferred from an isolated measurement.** Existing evidence calculates Warm Gray `#78716C` on Warm Ivory `#FEF3C7` at 4.31:1, Muted Teal `#0EA5A4` on Warm Ivory at 2.72:1, and Warm Orange `#EA5808` on Warm Ivory at 3.20:1. Each is below 4.5:1 for normal text; teal is also below 3:1 for large text. The WP06 light primary button instead pairs Dark Brown `#1C1917` with Teal `#0EA5A4`; independent relative-luminance calculation is 5.78:1. No remapping was made.
2. **Logo clear-space conflict:** separate specification/decision issue, not an accessibility defect. See `LOGO-CLEARSPACE-DECISION.md`.

## Static source observations

- WP06 `component-library-specimen.html`: 36 labels, 36 form controls; all controls are nested inside labels; zero duplicate IDs; zero unassociated controls in the static parser check.
- WP06 `digital-application-patterns.html`: 6 labels and 6 form controls; all controls are nested inside labels; zero duplicate IDs; zero unassociated controls in the static parser check.
- Ten inspected specimen HTML files: no missing `alt` attributes were found. This does not establish that the alternative text accurately describes each image or correctly treats decorative imagery.
- WP06, WP07, and WP08 candidate stylesheets contain `:focus-visible` rules. Their rendered contrast, thickness, adjacency and persistence are **NOT VERIFIED**.
- Source snippets contain scoped Arabic `lang`/`dir` attributes. Full mixed-direction correctness and screen-reader pronunciation are **NOT VERIFIED**.
- The scanned WP06/WP07/WP08 stylesheets contained no animation/transition declarations. Reduced-motion support was not a concrete defect in those sheets; this is not a repository-wide claim.

## Missing evidence

- Browser-rendered color pairings and focus indicators in both themes.
- Keyboard operation and focus order; screen-reader announcement and semantics.
- Complete non-text contrast measurements, including actual adjacent surfaces.
- Alt-text quality and decorative-image treatment.
- Responsive zoom/reflow, clipping, and actual Arabic shaping/bidi behavior.
- Full WCAG conformance testing.

## Optional improvements

- Add an automated semantic check for label/control association to future candidate QA, retaining manual review for nested labels.
- Record expected text/background and non-text adjacency pairs alongside the component state matrix.
- Add reduced-motion rules if motion effects are introduced in later styles.

## Candidate patch decision

No concrete source-level defect with a clearly safe correction was confirmed in the reviewed HTML/CSS. No candidate patch was created. Failing isolated palette pairs do not establish a failing UI pairing where that pairing is not used as text; the approved palette must not be altered here.
