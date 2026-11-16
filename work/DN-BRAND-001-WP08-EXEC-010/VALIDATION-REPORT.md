# Validation Report — EXEC-010

## Consolidation validation

Command: PowerShell here-string piped to the already-installed Python interpreter; uses `hashlib`, `zipfile`, `lxml`, Python `HTMLParser`, `tinycss2`, and JSON parsing. Exit code **0**; stdout below; stderr empty.

Checks: 21 distinct active physical paths exist with no duplicate inventory paths; all copy hashes equal their source hashes. Eight inactive archive files match source hashes. All DOCX/PPTX packages passed ZIP tests and all XML/rels parts parsed. Two SVGs parsed as XML. Four HTML files parsed and their local stylesheet references resolved. Shared contact CSS parsed with `tinycss2`. Registry union is exactly 23 original + 3 addendum = 26 unique IDs and matches EXEC-008 unified IDs.

### Full validator stdout

```text
CONSOLIDATED_VALIDATION
PASS candidate-package/communications/email-signature-ar.candidate.html bytes=819 sha256=fffc1c37dcc53ef3923df6ee51941671678def7617781aa826bc011ac42a2e0 HTMLParser/local refs PASS
PASS candidate-package/communications/email-signature-en.candidate.html bytes=701 sha256=fd2adabce574ace48a24fad6e6cd0de2827eb17a416a0f283e62b0724dfda72b HTMLParser/local refs PASS
PASS candidate-package/communications/stationery-ar.v3.candidate.docx bytes=35643 sha256=5d40caa628e27ec8f4b6c521fffa71e1a2bfaaf2cf9257010ae9d88f4ceb8288 ZIP+XML PASS
PASS candidate-package/communications/stationery-en.candidate.docx bytes=36967 sha256=446d87239a08439561547b16f7219262d204f6e032a54eccbd14b4345a3a8303 ZIP+XML PASS
PASS candidate-package/documents/general-document-ar.candidate.docx bytes=38714 sha256=b107a171b6701ce3a1c8996c6a8756dd296777f6c130a853823be4277c40e49b ZIP+XML PASS
PASS candidate-package/documents/invoice-en.candidate.docx bytes=39211 sha256=b8632a698bdff61a6d2d782d48bd31c2a3b77fa40f8eb61d71237cb9e3819a3f ZIP+XML PASS
PASS candidate-package/documents/letterhead-ar.v3.candidate.docx bytes=35672 sha256=0b8ad407a69805cfd292392fef145fbef52c917f480910dd88e1f1791702ba93 ZIP+XML PASS
PASS candidate-package/documents/letterhead-en.candidate.docx bytes=38562 sha256=e0e33b40066b6b968cc4ca77113432876b4c984e44fdc9d88b67a0933ec70e8b ZIP+XML PASS
PASS candidate-package/documents/proposal-cover-ar.v2.candidate.docx bytes=35632 sha256=2074ca6eeb8db579037e85c61e2f017dbc68ccb1e2779ea1605a7de2e1fe0e0b ZIP+XML PASS
PASS candidate-package/documents/proposal-page-ar.candidate.docx bytes=38285 sha256=1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2 ZIP+XML PASS
PASS candidate-package/documents/report-cover-en.candidate.docx bytes=35519 sha256=9d20e16132f4e9e48270926202e67f748cc8b4072767b51f12f0407a37406af1 ZIP+XML PASS
PASS candidate-package/documents/report-page-en.candidate.docx bytes=38322 sha256=50a6b5531b3775ebfc2e3acf73906922206982841ab81896de7588b0374cafbf ZIP+XML PASS
PASS candidate-package/identity/business-cards/business-card-back-ar.candidate.svg bytes=2318 sha256=2392920047a9d2c01fcf70ccf831cdd9e6a55dc64e0886c6e5acbfe0cde5a613 SVG XML PASS
PASS candidate-package/identity/business-cards/business-card-front-en.candidate.svg bytes=1572 sha256=1c3195312148f439fe093919aba375e4fa121c7c2ca2080f0cf7fe765125136e SVG XML PASS
PASS candidate-package/identity/digital-contact/contact-cards.candidate.css bytes=2411 sha256=3e8fa79c3152863a42642c360033a3a051f91f11db25607d93ad654824786ea6 tinycss2 PASS
PASS candidate-package/identity/digital-contact/digital-business-card-bi.candidate.html bytes=2037 sha256=0197b3d35b6d850b3e9d5f74e428a0bdc335b56ffe62b6201482c106bfb8822b HTMLParser/local refs PASS
PASS candidate-package/identity/digital-contact/professional-contact-card.candidate.html bytes=2338 sha256=97b54ecad76261457a14d3431665659780af76b15b8bd21ebafc5652226086ae HTMLParser/local refs PASS
PASS candidate-package/operational/client-onboarding-handoff.candidate.docx bytes=38258 sha256=4044fa451e920cc6a1d036ff4fb6dd4617b6183a8b492430d6c521f4b8a209d9 ZIP+XML PASS
PASS candidate-package/operational/meeting-agenda-minutes.candidate.docx bytes=37957 sha256=fda4ff9f3cf8b78766470dc2dc6708a504149ed98c9702001ba45c101d0ba2b2 ZIP+XML PASS
PASS candidate-package/operational/project-status-update.candidate.docx bytes=37990 sha256=48c8fac7ac3934b9d9b2b2165d78b65078c28fd6031e70f6cbc375fb5b346c34 ZIP+XML PASS
PASS candidate-package/presentations/presentation-template-16x9.candidate.pptx bytes=38179 sha256=0e88cc720cc70923a482a708ea756fc3cb0b62bfeaf6a84c0c80c81d27a9f59b ZIP+XML PASS
ARCHIVE_FILES 8 all source hashes match
ACTIVE_PATHS 21 UNIQUE 21 TEMPLATE_IDS 26
REGISTRY_RECONCILIATION original=23 addendum=3 union=26 unique=26 unifiedIDs=26 PASS
SOURCE_INVENTORIES {'DN-BRAND-001-WP08-EXEC-002': 6, 'DN-BRAND-001-WP08-EXEC-003': 5, 'DN-BRAND-001-WP08-EXEC-004': 6, 'DN-BRAND-001-WP08-EXEC-006': 8, 'DN-BRAND-001-WP08-EXEC-007': 10, 'DN-BRAND-001-WP08-EXEC-008': 26, 'DN-BRAND-001-WP08-EXEC-009': 19} mismatches=0
CONSOLIDATED_VALIDATION_EXIT=0
```

## Source inventory checks

The checksum parser handles EXEC-002's documented trailing byte-count annotations separately from the path. Source inventory entries checked: EXEC-001 **9**, EXEC-002 **6**, EXEC-003 **5**, EXEC-004 **6**, EXEC-006 **8**, EXEC-007 **10**, EXEC-008 **26**, EXEC-009 **19**; all **89** entries matched, zero missing targets or mismatches. EXEC-001 inventory command and consolidation validator both exited `0`.

An initial naive EXEC-002 checksum parsing attempt treated `(NN bytes)` as part of each filename and printed false `MISSING` results. The corrected parser stripped only that documented annotation; the rerun produced zero errors. Separately, EXEC-002 `EXECUTION-REPORT.md` has a historical one-character transcription error in the proposal-page Arabic SHA; the actual file, EXEC-002 inventory/index, EXEC-008 integrity report and VQA-002 agree on `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2`. This is not an asset hash mismatch.

The EXEC-008 package-integrity report also records 50/50 existing SHA entries across EXEC-001–007 and 16 candidate assets plus two support files copied byte-identically into its package.

## Candidate distinction and unresolved QA

The PPTX remains one editable source file referenced by seven slide-template IDs; no SVG/PNG slide exports are present. Existing visual evidence is partial and lacks saved, attributable screenshots. See `VISUAL-QA-READINESS.md`; this validation is structural/integrity evidence, not visual QA, Arabic shaping, accessibility certification, production readiness, or owner approval.
