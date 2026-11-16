# DN-BRAND-001-WP06-EXEC-001 — Component System Specification

**Status:** PROVISIONAL — NOT APPROVED FOR PRODUCTION

## Package and source provenance
This isolated candidate references sibling sources through local CSS imports. No source token values were rewritten into a new token layer.
- WP02 V2 JSON: e4866524b983cd1aeeae18931ad50a43b451e3a8e094e332895513d857e0209a
- WP02 V2 CSS: c379f491556f2d1879c2d32213b1f557447fde7aa7285202b378b99eb5c850c0
- WP03 typography JSON: c462aa3c76a8c0905a396586b56c32ff97634b754f9a90b81dba7e2063e378c4
- WP03 typography CSS: 07bb085f4e6971432a3ea9da6c1873069636b43437d9bbb6efb64f1e8cc66ef2
- WP04 logo index (65 candidates): 5bc61fb7fe8acaa60692b6454e6adaa478455288583a38517e78f452da060524
- WP05 guidelines Markdown: b77f1d8bc995154a3115eba302fa37ecbb6fc86ebd5f8ac06f9d565d40a4648b

The CSS imports WP02 V2 and WP03 typography CSS via relative paths. The HTML specimens link only to local component CSS and WP04 SVG candidates. All source files remain unchanged.

## Component inventory
The JSON index contains 41 components:
- Foundation: 8
- Buttons: 5
- Forms: 8
- Information: 7
- Navigation: 5
- Content and layout: 8

Every index entry is marked PROVISIONAL — NOT APPROVED FOR PRODUCTION. See component-index.json for supported themes, directions, states, and token dependencies.

## Token and typography dependencies
Color, spacing, radius, state, focus, surface, and component aliases come from WP02 V2 candidate CSS/JSON. Typography and fallback families come from WP03 candidate CSS/JSON. Functional Success/Warning/Error/Info colors remain provisional. The package introduces no new brand color values.

Recorded pair measurements in source evidence include Dark Brown on Warm Ivory 15.71:1, Warm Gray on Warm Ivory 4.31:1, Muted Teal on Warm Ivory 2.72:1, Warm Orange on Warm Ivory 3.20:1, and Dark Brown text on Teal 5.78:1. These are pair-level values only. Focus colors and adjacent-surface behavior require visual verification; this package does not claim complete WCAG conformance.

## Theme, direction, and responsive behavior
Specimens cover light and dark themes in LTR English and RTL Arabic. Components use logical spacing/alignment properties and inherit semantic theme aliases. Mixed-direction names/identifiers use bdi or explicit LTR direction. Media queries stack dashboard columns and card grids at tablet/mobile breakpoints. Browser behavior remains unverified unless visual QA is reported separately.

## Accessibility considerations
Semantic headings, labels, native inputs, visible focus styles, non-color status words, table captions, nav labels, status text, and local logo alt text are included. Tooltip and loading examples are static. The toggle is a native checkbox with switch role, but no script interaction is implemented. Candidate focus ring colors are inherited from WP02 and need checks against each adjacent surface. No blanket WCAG claim is made.

## Known limitations
- Fonts are referenced by family name; no fonts are bundled or installed.
- Arabic shaping, font fallback, text clipping, responsive rendering, and assistive technology behavior are not browser-verified here.
- Functional and focus values are provisional.
- Dashboard text and numbers are illustrative, not live data or product promises.
- Candidate imports depend on the package remaining alongside WP02/WP03 paths.
- No application source code or production tokens were changed.

## Reuse recommendations
Treat these files as reviewable specimens. After owner decisions, reconcile token versions, review component APIs, add automated behavior only in an authorized implementation task, and promote no style or component without final QA and owner acceptance.

## Final QA checklist
1. Open both HTML specimens at desktop, tablet, and mobile widths; check overflow, clipping, navigation collisions, and RTL alignment.
2. Test keyboard order, focus visibility, form labels, native control states, and screen reader announcements.
3. Verify status text/icon behavior without color.
4. Measure actual component foreground/background/border/focus contrast in both themes.
5. Test Arabic shaping, diacritics, mixed direction, font availability, and fallback on target browsers.
6. Confirm local CSS imports and logo paths in the intended package layout.
7. Record owner selection and acceptance before production integration.
