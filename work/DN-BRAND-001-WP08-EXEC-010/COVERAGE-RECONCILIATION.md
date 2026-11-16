# WP08 Coverage Reconciliation — EXEC-010

## Counts and duplicate interpretation

- Original registry: **23** identities; EXEC-006 provisional addendum: **3** identities; total expected unique IDs: **26**. The ID union matches EXEC-008 `unifiedIds`; each appears once.
- Primary status, counted once per ID: **22 `IMPLEMENTED_CANDIDATE`, 4 `PARTIAL`, 0 `NOT_IMPLEMENTED`, 0 `DUPLICATE_ALIAS`**.
- EXEC-009's “2 duplicate representations” are **two additional DOCX files**, for `digital-business-card-bi` and `professional-contact-card`. The active format-appropriate candidates for both IDs are HTML. They are archived as inactive alternatives; they are not duplicate IDs. EXEC-008 `duplicateIds` is zero.
- One older DOCX email-signature carrier is also archived because EXEC-009 provides the active HTML candidate for that email identity; this carrier is separate from the two counted duplicate representations.
- Active physical files: **21 unique paths**. Primary identity references: 26; the same editable PPTX covers seven presentation identities, and one local CSS file is shared by two HTML contact assets.
- Preserved inactive archive files: **8** (two DOCX duplicate alternatives, one prior email DOCX carrier, five EXEC-009 superseded Arabic drafts). They are not active candidates.

## Registered identity ledger

The exact path/hash/provenance mapping for all 26 identities appears in `CANDIDATE-STATUS-REGISTER.json`. The active package includes all seven selected EXEC-009 assets, including Arabic V3 stationery and letterhead. V1/V2 Arabic drafts are archived and inactive. No missing asset was fabricated during consolidation.

## Presentation distinction

`presentation-template-16x9.candidate.pptx` is an editable source template and remains in the candidate package. It is not the separate SVG/PNG slide-export deliverable. Slide exports remain unproduced; this limitation is recorded against the presentation entries and in `OWNER-DECISIONS-AND-DEPENDENCIES.md`.

## Remaining partial IDs

- `business-card-front-en` and `business-card-back-ar`: logo selection/clear-space and print requirements remain unresolved.
- `letterhead-ar`: text-only A4 candidate; logo omitted pending owner choice.
- `presentation-closing-bi`: shared editable PPTX exists, but registered SVG/PNG export coverage remains unproduced.

These decisions do not block unrelated document, signature, or operational candidates. No production readiness or owner acceptance is implied.

## Recorded discrepancy carried forward

EXEC-002's `EXECUTION-REPORT.md` transcribes the `proposal-page-ar.candidate.docx` SHA-256 as `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d9f2ab2ef5e0a2`. The EXEC-002 checksum inventory, deliverable index, EXEC-008 integrity report, VQA-002 recomputation, and current source file agree on `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2` (38,285 bytes). Consolidated copy uses the verified latter value; this is a historical report transcription error, not an asset hash mismatch.
