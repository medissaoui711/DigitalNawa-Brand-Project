# Validation Report — DN-BRAND-001-WP08-EXEC-006

## Environment and commands

- Bundled runtime: `C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt\dependencies\python\python.exe`; `python-docx` was already available. No package installation occurred.
- Creation and validation used inline `python.exe -c` scripts with `python-docx`, `zipfile`, `xml.etree.ElementTree`, and `hashlib`; no helper script was written to the project.
- Final validation **exit code 0**; stderr empty. Its output is transcribed below.

```text
FILE meeting-agenda-minutes.candidate.docx SIZE 37957 SHA256 fda4ff9f3cf8b78766470dc2dc6708a504149ed98c9702001ba45c101d0ba2b2 ZIP_TEST None XML_RELS_PARTS 16 XML_PARSE PASS DOCX_OPEN PASS A4_MM (210.01, 297.0) TABLES 3 REQUIRED_TEXT_MISSING [] EXTERNAL_REL False MEDIA 0 EMBEDDED_FONT_DATA 0 EMBED_MARKS False BIDI 5 RTL_RUNS 5 LANG_AR True LANG_EN True RESULT True
FILE project-status-update.candidate.docx SIZE 37990 SHA256 48c8fac7ac3934b9d9b2b2165d78b65078c28fd6031e70f6cbc375fb5b346c34 ZIP_TEST None XML_RELS_PARTS 16 XML_PARSE PASS DOCX_OPEN PASS A4_MM (210.01, 297.0) TABLES 3 REQUIRED_TEXT_MISSING [] EXTERNAL_REL False MEDIA 0 EMBEDDED_FONT_DATA 0 EMBED_MARKS False BIDI 5 RTL_RUNS 5 LANG_AR True LANG_EN True RESULT True
FILE client-onboarding-handoff.candidate.docx SIZE 38258 SHA256 4044fa451e920cc6a1d036ff4fb6dd4617b6183a8b492430d6c521f4b8a209d9 ZIP_TEST None XML_RELS_PARTS 16 XML_PARSE PASS DOCX_OPEN PASS A4_MM (210.01, 297.0) TABLES 5 REQUIRED_TEXT_MISSING [] EXTERNAL_REL False MEDIA 0 EMBEDDED_FONT_DATA 0 EMBED_MARKS False BIDI 5 RTL_RUNS 5 LANG_AR True LANG_EN True RESULT True
ADDENDUM_JSON_PARSE PASS entries=3 status= PROVISIONAL — NOT APPROVED FOR PRODUCTION
EXIT_CODE 0
```

## Intermediate findings and recovery

1. Initial validator exited `1` on an assertion. A follow-up diagnostic showed all three files were US Letter (`215.90 × 279.40 mm`) and English run language was not explicit. No sources or prior artifacts were affected. The three new candidates were corrected to A4 and English `en-US` run metadata.
2. A later focused content check found the meeting action table lacked the exact `[Next Action]` placeholder. It was replaced in that candidate only.
3. Final validation above then passed for all three files.

## Checks and scope limits

- Each DOCX is a valid ZIP package (`testzip=None`); all 16 XML/relationship parts parsed; all three reopened with `python-docx`.
- A4 dimensions: `210.01 × 297.00 mm`. Required text/placeholders are present. Each contains `ar-SA` and `en-US` language metadata, five RTL paragraph markers and five RTL run markers.
- No external OOXML relationship, media payload, or embedded font data was detected. No PDF was generated.
- Addendum JSON parsed and contains three entries with `PROVISIONAL — NOT APPROVED FOR PRODUCTION` status.
- The final directory checksum manifest is validated separately after this report and the other reports are written.
- No rendering or visual inspection was performed because PDF generation is explicitly prohibited. Therefore pagination, clipping, accessibility, font substitution, Arabic shaping, and cross-application behavior are **NOT VERIFIED**.
