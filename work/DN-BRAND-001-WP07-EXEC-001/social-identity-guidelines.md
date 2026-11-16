# DigitalNawa Social Identity Guidelines

**Task:** DN-BRAND-001-WP07-EXEC-001  
**Status:** PROVISIONAL — NOT APPROVED FOR PRODUCTION

## Architecture and provenance

This package extends the supplied brand identity through reusable format presets, layouts, typography roles, and logo placement. It does not create a separate identity. The five approved palette values remain sourced from WP-02; decorative pillar accents reuse teal, orange, ivory, and brown. Functional colors inherited from WP-02 remain provisional. The local focus preview uses approved dark-brown and ivory palette tokens; visual clarity still requires Final QA. Typography remains provisional.

Source candidates and inspected SHA-256:
- WP-02 V2 JSON: `e4866524b983cd1aeeae18931ad50a43b451e3a8e094e332895513d857e0209a`
- WP-02 V2 CSS: `c379f491556f2d1879c2d32213b1f557447fde7aa7285202b378b99eb5c850c0`
- WP-03 typography CSS: `07bb085f4e6971432a3ea9da6c1873069636b43437d9bbb6efb64f1e8cc66ef2`
- WP-04 logo candidate index: `5bc61fb7fe8acaa60692b6454e6adaa478455288583a38517e78f452da060524`
- WP-05 candidate guidelines: `b77f1d8bc995154a3115eba302fa37ecbb6fc86ebd5f8ac06f9d565d40a4648b`
- WP-06 component CSS: `2d2d35c195645f527ab6521663ed404433aa85e08eb43a05a598f2e00006424a`

The social stylesheet locally imports WP-06, which imports WP-02 and WP-03. SVGs are referenced from WP-04 using relative paths. Source packages are not bundled or modified. Keep the task directory under the project work folder so those references resolve.

## Visual system rules

- Use the supplied candidate lockups; do not redraw, crop into, or alter symbol geometry. Choose a lockup variant appropriate to its background and language.
- Keep the symbol centered and generously inset in avatar crops. Bilingual name/tagline usually sit outside the circle crop; review any bilingual avatar treatment at small sizes.
- Banner dashed outlines are composition guides only. They do not claim safe areas for a particular platform.
- Keep the headline as the primary reading anchor, with kicker and supporting sentence subordinate. Preserve open negative space and one clear CTA or footer.
- Use semantic surface and typography tokens; use the approved brand palette for identity accents. Do not turn WP-02 provisional status colors into official social pillar colors.
- Development uses teal accents, AI & Automation uses warm orange accents, and Education uses ivory/brown/teal layouts. These are variations within one palette, not independent palettes.
- Keep code left-to-right and use `bdi`/explicit `dir="ltr"` for technical identifiers within Arabic copy.

## Content pillars

1. **Digital Products & Development:** build logs, tutorials, project showcases, launch notes.
2. **AI & Automation:** tool insights, workflow examples, human-review checkpoints.
3. **Digital Education:** short explainers, tips, carousels, questions and learning prompts.

A single template can carry more than one pillar. The index assigns a primary content pillar for filtering, not an exclusive brand rule.

## Typography hierarchy

The specimens reference WP-03 candidates: Inter for English/UI, IBM Plex Sans Arabic for Arabic, JetBrains Mono for technical examples, and Cairo as an alternative Arabic candidate. All remain provisional; no font files are included. Use display/headline roles for short headlines, body roles for explanatory text, and mono only for code or identifiers. Avoid applying Latin tracking to Arabic. Keep text editable and allow Arabic line-height to follow WP-03's Arabic adjustment.

## Language, direction and reading order

Set page-level `lang` and `dir` and add explicit metadata to Arabic and English text runs. Build RTL layouts with logical CSS properties and preserve semantic reading order in the DOM. Use `bdi` or `dir="ltr"` around Latin handles, code, numbers, and technical identifiers embedded in Arabic. Do not rely on visual alignment alone to establish reading order.

## Format registry and safe areas

`social-format-registry.json` contains nine candidate canvas presets: avatar, square and portrait feed, portrait carousel, vertical story and video, landscape thumbnail, and two wide-cover variants. Dimensions are design presets, not current platform requirements. Safe-area notes are initial composition guidance, not guarantees. Confirm present-day upload size, crop, UI overlays, and format policy for every target platform during Final QA.

## Reuse and export guidance

Use `social-template-index.json` to select a layout by pillar, use, format, language, direction, and theme compatibility. Open the HTML specimens locally while preserving sibling WP-02 through WP-06 packages. The HTML/CSS is editable source; no image exports are delivered here. Before an authorized export, check exact platform crop and output encoding, then render the selected canvas at target dimensions and review legibility at thumbnail scale.

## Known limitations

- Every item is a candidate; none is owner-approved or production-integrated.
- Platform-specific specifications have not been verified.
- Browser rendering, mobile crop, Arabic shaping, font fallback, image export, and contrast at final rendered sizes remain unverified.
- Logo geometry is reused from WP-04; this task makes no claim of approval or geometric fidelity beyond referencing the candidate files.
- The specimens have no external scripts, fonts, or network resources. Local relative imports require sibling candidate folders to remain available.
- The sample tutorial and content are illustrative and technically neutral; they are not product promises.

## Final QA checklist

1. Inspect desktop, tablet, and mobile rendering and check overflow, clipping, headline wraps, and crop areas.
2. Inspect all selected formats in actual target platform previews; validate current upload and safe-area rules.
3. Review Arabic shaping, diacritics, punctuation, numerals, mixed-direction text, and reading order in target browsers.
4. Review avatar/wordmark visibility at small sizes and obtain logo candidate approval.
5. Verify contrast and keyboard focus on every chosen surface; do not infer full WCAG conformance from token pair measurements.
6. Confirm editable source and export dimensions for the approved content workflow.
7. Obtain owner approval before production use or integration.
