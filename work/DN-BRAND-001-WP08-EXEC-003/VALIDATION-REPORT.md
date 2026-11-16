# Validation Report — WP08 EXEC-003

## Scope and environment

**FACT:** Validation used the already-installed bundled Python runtime and `python-docx 1.2.0`; no dependencies were installed. DOCX package validation read the two new candidates. The source registry was `work\DN-BRAND-001-WP08-EXEC-001\collateral-template-index.json`. Both selected IDs exist in its 23-entry `templates` array and were not among EXEC-002 outputs (`report-page-en`, `proposal-page-ar`, and the PPTX patterns).

## Results

| Check | Letterhead | Invoice | Evidence / result |
|---|---|---|---|
| File exists, non-empty | PASS | PASS | 38,562 / 39,211 bytes |
| SHA-256 | PASS | PASS | `e0e33b40066b6b968cc4ca77113432876b4c984e44fdc9d88b67a0933ec70e8b` / `b8632a698bdff61a6d2d782d48bd31c2a3b77fa40f8eb61d71237cb9e3819a3f` |
| ZIP integrity (`ZipFile.testzip`) | PASS | PASS | `None` (no corrupt member) |
| XML / relationship parsing | PASS | PASS | 18 XML/relationship parts parsed per file |
| `python-docx` open and structure | PASS | PASS | 8 paragraphs/0 tables; 7 paragraphs/3 tables |
| A4 dimensions | PASS | PASS | 7560310 × 10692130 EMU = 210.01 × 297.00 mm for both |
| Language / direction | PASS | PASS | English `en-US`, LTR registry entries; no RTL content, so RTL metadata is N/A |
| Placeholder content | PASS | PASS | Letterhead: 10 bracket markers. Invoice: 23 bracket markers including business/client/document/date/currency/line-item fields |
| External relationships | PASS | PASS | None |
| Media / embedded font payloads | PASS | PASS | No `word/media` entries; no embedded font files |
| Approved palette use | PASS, scoped | PASS, scoped | Directly authored colors include approved Dark Brown `#1C1917`, Warm Gray `#78716C`, Muted Teal `#0EA5A4`, and invoice Warm Ivory `#FEF3C7`; no functional-state colors added. Warm Orange was not needed by these layouts. Theme/style defaults inside the DOCX package are not treated as applied palette decisions. |

**NOT VERIFIED:** RTL metadata is not applicable to these English-only documents. Arabic shaping was not attempted. Legal/tax compliance and invoice calculations are not provided; the invoice is a layout candidate only.

## Commands and exit codes

1. Candidate generation completed using the existing Python runtime and `python-docx`; process exit code `0` (the candidates were created before this report).
2. Validation command invoked the bundled Python executable with `zipfile`, `xml.etree.ElementTree`, `hashlib`, and `python-docx` against both files; exit code `0`. It reported both ZIP checks `None`, XML parse `PASS`, DOCX open `PASS`, and the exact values above.
3. Hash probe performed while Word held the documents open: PowerShell `Get-FileHash` returned access-in-use errors (exit code `1`). A subsequent Python `Path.read_bytes()` SHA-256 validation succeeded for both files (exit code `0`), matching sizes and hashes above.
4. An initial dimension diagnostic compared EMU values with twips thresholds and printed `A4_NEAR=False` (script exit `0`); this comparison used mismatched units. Recalculation in EMU-to-mm (`36,000 EMU/mm`) yielded 210.01 × 297.00 mm for both, therefore A4. The initial false-negative is recorded rather than silently omitted.
5. Native Word view: both files were opened and observed at 33% zoom. Letterhead displayed a full portrait page with header/body/footer; invoice displayed a portrait invoice page and line-item table. No obvious clipping/overflow was visible at this scaled view. No image files were saved; this is limited live observation, not reproducible screenshot evidence, exhaustive visual QA, or owner approval.

## Limitations

- Candidate text remains provisional and placeholders must be filled by the owner.
- Inter font declaration is provisional; no font files are embedded and font availability/licensing is not verified here.
- Visual observations at 33% cannot establish fine type quality, accessibility, or print behavior.
- Temporary Word lock files `~$tterhead-en.candidate.docx` and `~$voice-en.candidate.docx` were present while Word had the candidates open. They were not removed or included in deliverables.
