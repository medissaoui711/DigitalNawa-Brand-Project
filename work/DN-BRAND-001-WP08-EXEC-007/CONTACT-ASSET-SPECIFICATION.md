# Contact Identity Asset Specification

**Task:** DN-BRAND-001-WP08-EXEC-007  
**Status:** PROVISIONAL — NOT APPROVED FOR PRODUCTION

## Source and format mapping

- `business-card-front-en` and `business-card-back-ar` use editable SVG because the registry format is vector business-card artwork. The local export guidance identifies 90 × 50 mm landscape as a candidate trim canvas. SVG dimensions are set to that candidate size with `viewBox="0 0 900 500"`.
- `digital-business-card-bi` and `professional-contact-card` use responsive HTML plus a shared local CSS file, matching the digital-card export guidance (fluid layout; no fixed platform dimension claimed).

The print specification calls 3 mm bleed and 4 mm safe placement recommendations and explicitly states these are not provider-sourced. The SVG cards therefore remain conceptual trim canvases. Printer, bleed, safe-area, stock, color profile, finish, and export preset must be confirmed before print production.

## Content and direction

Every unknown personal/contact value is a neutral placeholder: `[Full Name]`, `[Role / Title]`, `[Email Address]`, `[Telephone]`, `[Website]`, and `[Social Link]`; Arabic equivalents are used on the RTL card. No actual personal details or new services/credentials are asserted. Digital HTML identifies English blocks with `lang="en" dir="ltr"`, Arabic blocks with `lang="ar" dir="rtl"`, and isolates contact values using `<bdi dir="ltr">`. The Arabic SVG declares Arabic language/direction and marks the text runs RTL. Visual shaping is not verified.

## Palette, typography and logo governance

Direct color values use only the existing approved palette: Warm Ivory `#FEF3C7`, Dark Brown `#1C1917`, Muted Teal `#0EA5A4`, and Warm Gray `#78716C`. Warm Orange `#EA5808` is preserved in the underlying palette and not needed in these layouts. Colors were not redefined.

Font stacks follow the WP03 provisional recommendations: Inter/system sans for English and IBM Plex Sans Arabic/Noto Sans Arabic/Tahoma for Arabic. No font files are embedded and font availability/licensing has not been re-evaluated.

WP04 contains 65 candidate logo compositions/variants. No single variant is selected by an owner, and the foundation versus WP04/WP05 clear-space conflict remains open. Consequently, the cards reserve a labeled logo-placement area but do not embed, trace, redraw, or modify a logo candidate. The visible `DigitalNawa` text on the English SVG is plain editable brand text, not logo artwork.

## Validation boundary

SVG XML, dimensions/viewBox, placeholders, local/external references and palette values are structurally checked. HTML is parsed with Python's standard-library HTMLParser; local stylesheet references, scripts, direction blocks and placeholders are checked. CSS delimiter balance, media rules, color values and direction selectors are checked. No preinstalled dedicated CSS parser was found; complete formal CSS parsing remains NOT VERIFIED.

No PDF was created. Rendering, clipping, font fallback, Arabic shaping, screen-reader behavior, contrast in rendered states, physical proofing, and print readiness remain unverified.
