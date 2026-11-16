# Print and Export Specifications — Candidate

**Task:** DN-BRAND-001-WP08-EXEC-001  
**Status:** PROVISIONAL — NOT APPROVED FOR PRODUCTION

## Evidence boundary

These values are candidate design and export recommendations. The package contains HTML/CSS specimens and JSON registries, not print-ready PDFs, PNG exports, a presentation deck, or physical proofs. No printer profile, color profile, font installation, font license, color conversion, or print output was inspected. Confirm settings with the selected production provider before export.

## Candidate canvas and trim guidance

| Use | Candidate trim/canvas | Starting bleed/safe guidance | Verification required |
|---|---|---|---|
| Business card | 90 × 50 mm, landscape candidate | Consider 3 mm bleed; keep essential text/logo at least 4 mm inside trim | Provider trim standard, orientation, rounded corners, stock |
| Letterhead and report pages | A4 candidate, 210 × 297 mm | 12–15 mm text margin; add bleed only for elements intended to reach trim | Recipient page size, printer margins, binding |
| Presentation | 16:9 canvas, 1920 × 1080 px | Keep content away from outer 5% as a review starting point | Display/projector aspect, room visibility, export platform |
| Digital business/contact card | Responsive digital layout; no fixed platform dimension claimed | Keep text and action links in responsive safe area | Target device and destination profile |
| Email signature | Flexible email-client width; no universal canvas claimed | Keep logo modest and text-first; avoid image-only contact details | Target mail clients, dark-mode behavior, image blocking |

The bleed and safe-margin values above are recommendations only; they are not sourced from a specific printer or platform and do not establish production readiness.

## Color and raster guidance

- Preserve WP-02 approved palette tokens and semantic references; do not substitute provisional functional colors as approved brand colors.
- For screen raster previews, sRGB is a candidate delivery recommendation, not a verified property of an existing export.
- For placed raster content in print, target 300 ppi at final physical size where practical. Keep logos and text vector when supported.
- Avoid converting RGB brand values to CMYK without the print provider's specified profile and proofing workflow. No CMYK values are defined here.
- Transparent PNG is appropriate for isolated marks/overlays when needed; use an opaque background for full-page collateral.

## SVG guidance

Use the selected WP-04 candidate SVG as-is. Preserve its viewBox, aspect ratio, and path geometry. Keep a vector source for scaling. Inspect variant contrast and rendering in the target application before use. This package does not alter, sanitize, redraw, or re-export any logo file.

## PDF guidance

- Use the provider's requested PDF preset and color profile for physical print.
- Confirm page boxes, trim, bleed, and embedded profile in the exported PDF with an independent PDF inspection tool.
- Fonts should only be embedded if installed and the applicable license permits embedding. WP-03 font names remain provisional; this package does not confirm installation, embedding rights, or actual font embedding.
- Review links, document metadata, selectable text, Arabic shaping, page breaks, and fallback fonts in the final PDF.
- No PDF was produced or verified by this task.

## Naming recommendation

`DigitalNawa-<collateral>-<language>-<format>-<variant>-candidate-vNN.<ext>`

Examples (illustrative names, not generated exports):
- `DigitalNawa-business-card-bi-print-front-candidate-v01.pdf`
- `DigitalNawa-letterhead-ar-a4-preview-candidate-v01.png`
- `DigitalNawa-presentation-title-en-16x9-candidate-v01.svg`

Keep candidate/provisional status in filenames or metadata during review. Never label an unapproved file “final” or “approved”.

## Export sequence

1. Select an approved or review-only template and confirm its source dependencies.
2. Confirm the intended language, direction, theme, canvas, and destination platform/provider.
3. Confirm fonts are available and licensing permits the intended use; check Arabic shaping and fallback.
4. Render using the destination's specified settings without changing the approved palette.
5. Inspect dimensions, bleed/page boxes, links, text overflow, raster resolution, and color profile.
6. Obtain a physical proof for print work and record provider approval before describing it as print-ready.

## Final QA items

- Provider-specific trim, bleed, safe area, color mode/profile, and PDF preset.
- Actual output dimensions, DPI, transparency, page boxes, font embedding, and metadata.
- Browser and document-app rendering in Arabic and English; RTL/LTR, bidi, text wrapping, and email-client differences.
- Screen and physical proof contrast, paper stock effects, and color reproduction.
- Owner acceptance of all candidate collateral before production integration.
