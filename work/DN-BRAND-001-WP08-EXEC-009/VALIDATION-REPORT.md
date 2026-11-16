# Validation Report — EXEC-009

## Final validation commands and results

- DOCX checks: `zipfile.ZipFile.testzip`, XML/rels parsing with `lxml.etree`, `python-docx` open/read, A4 dimensions, external-relationship scan. Five selected DOCX files passed.
- HTML checks: Python `HTMLParser`, lang/dir, script and external-URL scan. Two HTML candidates passed.
- CSS checks: installed `tinycss2` parsed each inline CSS block; three rules per signature, zero parse/declaration errors.
- Unified registry: JSON parsed; 26 IDs and 26 unique.
- SHA-256 generated via Python `hashlib`; source registry / export registry / addendum hashes match EXEC-008 recorded values.

Combined candidate and registry validation exit code: **0**; stderr empty.

### Complete final validator stdout

```text
FINAL_CANDIDATE_VALIDATION
PASS stationery-en.candidate.docx bytes=36967 sha256=446d87239a08439561547b16f7219262d204f6e032a54eccbd14b4345a3a8303 checks=ZIP/XML python-docx A4 no-external
PASS stationery-ar.v3.candidate.docx bytes=35643 sha256=5d40caa628e27ec8f4b6c521fffa71e1a2bfaaf2cf9257010ae9d88f4ceb8288 checks=ZIP/XML python-docx A4 no-external Arabic-RTL-lang
PASS letterhead-ar.v3.candidate.docx bytes=35672 sha256=0b8ad407a69805cfd292392fef145fbef52c917f480910dd88e1f1791702ba93 checks=ZIP/XML python-docx A4 no-external Arabic-RTL-lang
PASS report-cover-en.candidate.docx bytes=35519 sha256=9d20e16132f4e9e48270926202e67f748cc8b4072767b51f12f0407a37406af1 checks=ZIP/XML python-docx A4 no-external
PASS proposal-cover-ar.v2.candidate.docx bytes=35632 sha256=2074ca6eeb8db579037e85c61e2f017dbc68ccb1e2779ea1605a7de2e1fe0e0b checks=ZIP/XML python-docx A4 no-external Arabic-RTL-lang-mixed-en-run
PASS email-signature-en.candidate.html bytes=701 sha256=fd2adabce574ace48a24fad6e6cd0de2827eb17a416a0f283e62b0724dfda72b checks=HTMLParser lang=en dir=ltr no-script no-external-url
PASS email-signature-ar.candidate.html bytes=819 sha256=fffc1c37dcc53ef3923df6ee51941671678def7617781aa826bc011ac42a2e0 checks=HTMLParser lang=ar dir=rtl no-script no-external-url
PASS unified-registry ids=26 unique=26
FINAL_CANDIDATE_VALIDATION_EXIT=0
```

CSS parser stdout: `PASS email-signature-ar.candidate.html rules=3 css_errors=0`; `PASS email-signature-en.candidate.html rules=3 css_errors=0`. CSS command exit code: **0**; stderr empty.

An earlier registry subcheck used a wrong key and exited `1`; correcting the lookup to `unifiedIds` produced the passing combined run above. This was a harness error, not artifact failure.

## Source integrity

- Original collateral registry SHA-256: `912eb2a85b209d1c82b8036be54acc1bd46bf446a13ad1e39f8bbb647e3b90d0`.
- Export registry SHA-256: `d4e65fd0dc39a32062c5dab9543cb2b50f4a44a79dc8489f7761a0d30e4f1cce`.
- EXEC-006 addendum SHA-256: `c42cf28bf5c2a1b60d93869bc7750ec1896f23d36d169a77c06786fd2270e618`.
These equal EXEC-008 recorded provenance. No source or registry files were modified.

## Preserved non-final drafts

The initial Arabic stationery, official letterhead, and proposal-cover DOCX files, plus the first revised Arabic stationery and letterhead files, remain unchanged in `candidate-assets/documents/` and are listed as superseded in `DELIVERABLE-INDEX.json` and the checksum inventory. V3 stationery/letterhead omit added headings absent from source specimens and include RTL/language metadata.

## Limits

No rendered visual QA, email-client compatibility, Arabic glyph shaping, contrast/accessibility testing, PDF/print proof, bleed/DPI/profile, or owner acceptance is claimed. Presentation SVG/PNG exports are not generated.
