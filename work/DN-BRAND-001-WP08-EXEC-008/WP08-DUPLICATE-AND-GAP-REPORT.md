# WP08 Duplicate and Gap Report

## Reconciled counts

- Original registry: **23 IDs**; EXEC-006 extension addendum: **3 IDs**; unified: **26 unique IDs**.
- Unique candidate coverage: **17 implemented**, **3 partial**, **6 missing**.
- Two DOCX alternatives are duplicates of already represented digital-card IDs; they are retained but not counted as additional templates.
- Owner decision items: **6**.

## Duplicate representations

- `candidate-package/EXEC-005/digital-business-card-bi.candidate.docx` — duplicate carrier for `digital-business-card-bi`; the registry-appropriate responsive HTML is in EXEC-007.
- `candidate-package/EXEC-005/professional-contact-card.candidate.docx` — duplicate carrier for `professional-contact-card`; the registry-appropriate responsive HTML is in EXEC-007.

## Missing original IDs

- `email-signature-ar`
- `stationery-en`
- `stationery-ar`
- `letterhead-ar`
- `report-cover-en`
- `proposal-cover-ar`

Existing report/proposal interior pages do not satisfy separate cover IDs. `stationery-en/ar` are separate registrations from letterhead IDs; no inferred consolidation was applied.

## Partial candidate IDs

- `business-card-front-en`, `business-card-back-ar`: candidate SVGs have conceptual 90 × 50 mm trim dimensions but omit logo artwork; no provider bleed/profile or print proof. Not print-ready.
- `email-signature-en`: DOCX editing carrier, not a mail-client signature export; registered suggested width/rendering is unverified.

## Confirmed discrepancies and evidence gaps

- Presentation registrations are represented by an editable 7-slide 16:9 PPTX. The separate `export-registry.json` defines `presentation-assets` as SVG/PNG and says editable slides are authored separately. Preserve the PPTX candidate; owner decision required on the export contract.
- EXEC-005 records the original `digital-business-card-bi` specimen as English-only; EXEC-007 HTML includes EN/AR sections. Final bilingual copy approval was not located.
- EXEC-002 execution report has a one-character SHA-256 transcription error for the Arabic proposal DOCX. Actual file/index/SHA inventory value is `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2`; erroneous report value is documented in the integrity report.
- Six owner decisions and wider QA gaps are listed in `WP08-READINESS-MATRIX.json`.
