# DigitalNawa Social Identity Guidelines — Remediation Candidate

**Task:** DN-BRAND-001-WP07-REMEDIATION-001  
**Status:** PROVISIONAL — NOT APPROVED FOR PRODUCTION

## Candidate package and source relationships

This package corrects the WP07 HTML specimens while preserving the source format registry and all 33 template identifiers. The candidate index adds `IMPLEMENTED` or `NOT IMPLEMENTED` status without changing source identifiers. The existing 23-template WP08 collateral registry and WP08-EXEC-006 addendum are not modified.

WP02 color tokens, WP03 typography CSS and WP06 component CSS are copied into `dependencies/` to resolve local imports. Nine referenced WP04 logo candidates are copied byte-identically into `assets/logo-lockups.candidate/`; no logo geometry is edited.

## Language, direction and sequence

The page-level language is English/LTR. Arabic text blocks carry `lang="ar" dir="rtl"`; English blocks carry `lang="en" dir="ltr"`. Mixed inline handles and copy are isolated with `<bdi>` or explicit language/direction. No `lang="bi"` is used. The 4-frame story reads in order and displays `01 / 04` through `04 / 04`.

## Logo and background use

Each included logo is an existing WP04 candidate and remains provisional. Dark-background reverse variants are used on dark-brown fields; light-background variants on warm-ivory fields; monochrome-dark variants on teal fields; full-color variants only on light fields. These are candidate compatibility checks based on source fills and intended variant names, not approval or a full rendered contrast claim. Logo scale, crop, safe area, and clear-space remain subject to Final QA and owner decision.

## Format and responsive use

The nine canvas presets remain unchanged and are not current platform specifications. The gallery CSS uses responsive grids and the preserved format aspect ratios. Check each target platform's current crop, safe area, and upload rules before export. Focus-visible styles remain; reduced-motion preferences suppress motion. No image export or PDF is included.

## Content coverage

Twenty of 33 registered template entries have supported specimen content or source compositions. Thirteen entries are explicitly marked `NOT IMPLEMENTED` in the candidate gallery and index because source content is incomplete or language requirements are unsupported. Do not treat those status cards as finished designs. The fourth story counters were corrected. The source third video thumbnail conflicted with `video-project-ar` metadata; the candidate uses the existing Arabic project-update content from the source HTML and keeps the English episode number/kicker isolated.

## Limitations

All entries remain provisional. Formal CSS parser availability, visual viewport inspection, Arabic shaping, font fallback, rendered clipping, platform crop, keyboard interaction, and accessibility conformance require remaining Final QA. No WCAG compliance claim is made.
