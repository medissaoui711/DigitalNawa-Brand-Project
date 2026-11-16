# WP08 Package Integrity Report

## Authoritative inputs and hashes

- Original template registry (`EXEC-001/collateral-template-index.json`): 23 records; SHA-256 `912eb2a85b209d1c82b8036be54acc1bd46bf446a13ad1e39f8bbb647e3b90d0`.
- Original export registry (`EXEC-001/export-registry.json`): SHA-256 `d4e65fd0dc39a32062c5dab9543cb2b50f4a44a79dc8489f7761a0d30e4f1cce`.
- EXEC-006 provisional addendum: 3 records; SHA-256 `c42cf28bf5c2a1b60d93869bc7750ec1896f23d36d169a77c06786fd2270e618`.
- All 50 existing SHA256SUMS entries across EXEC-001–007 validated; **0 mismatches**, **0 missing inventory targets**.
- Candidate indexes and actual artifact sizes/hashes reconciled: no declared hash/size mismatch.

## Package checks

- Copied **16** candidate artifacts and **2** supporting files into `candidate-package/` (18 files total). The supporting files are the EXEC-007 stylesheet and unchanged EXEC-006 addendum. Each copied file is byte-identical to source; **0 copy mismatches**.
- All 12 DOCX/PPTX packages passed ZIP integrity test; all XML and relationship parts parsed; no external OOXML relationships or embedded media/logo files were found.
- Both SVG files parsed as XML; no image elements or external references were found. The card size is conceptual 90 × 50 mm (900 × 500 viewBox).
- Both HTML pages parsed; local shared CSS references resolve after copy; no script or remote resource references found.
- Candidate IDs: 26 total, all unique; all 23 original records and 3 addendum records retained.

## Historical SHA transcription discrepancy

`EXEC-002/EXECUTION-REPORT.md` lists `proposal-page-ar.candidate.docx` as `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d9f2ab2ef5e0a2`. Recomputed file hash, EXEC-002 deliverable index, SHA256SUMS, and WP08-VISUAL-QA-002 all show `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2`. This is a report transcription error; source artifact integrity is confirmed.

## Related WP02–WP04 references inspected

- WP02 V2 candidate CSS: 5,414 bytes; SHA-256 `c379f491556f2d1879c2d32213b1f557447fde7aa7285202b378b99eb5c850c0`.
- WP03 typography notes: 4,201 bytes; SHA-256 `213c61ead705ec60df777d972a5b584c0b0d535de257d82461b4ab91feafc965`; candidate JSON: 3,371 bytes; SHA-256 `c462aa3c76a8c0905a396586b56c32ff97634b754f9a90b81dba7e2063e378c4`. Typography remains provisional.
- WP04 logo index: 21,923 bytes; SHA-256 `5bc61fb7fe8acaa60692b6454e6adaa478455288583a38517e78f452da060524`; 65 provisional candidates. Logo artwork was not selected or embedded; clear-space conflict remains unresolved.

## Visual/print readiness

WP08-VISUAL-QA-001 reports live native-app review of EXEC-002's English report, Arabic proposal and all seven presentation slides; screenshots were not persisted. Arabic proposal text appeared near the left edge although OOXML says right alignment plus bidi; this remains unresolved. EXEC-003/004 report limited live Word viewing without saved screenshots. EXEC-005 reports no renderer review; EXEC-006 prohibits visual rendering; EXEC-007 reports no rendered QA. No PDF/raster export is included. Arabic shaping, responsive rendering, comprehensive contrast/accessibility and printer-specific output remain unverified.


## Source report and inventory evidence

| Execution | EXECUTION-REPORT.md | Bytes | SHA-256 | Checksum entries verified |
|---|---|---:|---|---:|
| EXEC-001 | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP08-EXEC-001\EXECUTION-REPORT.md` — NOT FOUND | — | — | 9/9 |
| EXEC-002 | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP08-EXEC-002\EXECUTION-REPORT.md` | 4351 | `738bcf860bd2e2eab85829ce84d39d01a99be0716c7e0d30800d900fab13bf2e` | 6/6 |
| EXEC-003 | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP08-EXEC-003\EXECUTION-REPORT.md` | 3983 | `6657ff36a252c17023ec19e6159dae42b6c93cfd2219734247d0221db7b6574e` | 5/5 |
| EXEC-004 | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP08-EXEC-004\EXECUTION-REPORT.md` | 2789 | `e30d36a68ca73c1eef411fe9be167a5a1082fe2ab03525b0827afa4cbe89998b` | 6/6 |
| EXEC-005 | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP08-EXEC-005\EXECUTION-REPORT.md` | 3801 | `c0d0be4eb37615b48d24c9522226c1ac1bc1cab28b9891cf0326edac8aed6346` | 6/6 |
| EXEC-006 | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP08-EXEC-006\EXECUTION-REPORT.md` | 3656 | `b2a3eb840d8ad5862d83524d9b0671bc6ef63d297867807cee6912519d1cc52b` | 8/8 |
| EXEC-007 | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP08-EXEC-007\EXECUTION-REPORT.md` | 3794 | `8f8d8e1e75c9e55bd267714abab1c4281632b488e657425c80954afb03164b74` | 10/10 |
