# Validation Report

**Final validation: PASS (structural and source-content checks only).** Visual rendering and production readiness are not asserted.

## Tool availability

Bundled workspace runtime: `C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt\dependencies\python\python.exe`.

Command: `python.exe -c "import importlib.util as u; print('python-docx',bool(u.find_spec('docx'))); print('python-pptx',bool(u.find_spec('pptx')))"`

Output: `python-docx True`; `python-pptx True`; Python `3.12.14`. Exit code: `0`. No dependency was installed.

## Final validator output

Command: bundled Python runtime invoked with a read-only validation script on stdin (`@'…'@ | & '<bundled-python.exe>' -`). Exit code: `0`.

```text
DOC_SOURCE_RECORDS=8
report-page-en.candidate.docx: ZIP_CRC=PASS; XML_parts=17 XML_parse=PASS; external_relationships=0 embedded_media=0
report-page-en.candidate.docx: source_record=4 lang=en dir=ltr expected_snippets=9/9
  python-docx_open=PASS; size=38322; page_DXA=11906x16838; A4_ratio=0.707091; tables=2; Arabic_runs=0; RTL_paragraphs=0; Arabic_runs_missing_RTL=0
proposal-page-ar.candidate.docx: ZIP_CRC=PASS; XML_parts=17 XML_parse=PASS; external_relationships=0 embedded_media=0
proposal-page-ar.candidate.docx: source_record=6 lang=ar dir=rtl expected_snippets=9/9
  python-docx_open=PASS; size=38285; page_DXA=11906x16838; A4_ratio=0.707091; tables=1; Arabic_runs=9; RTL_paragraphs=9; Arabic_runs_missing_RTL=0
presentation-template-16x9.candidate.pptx: ZIP_CRC=PASS; XML_parts=48 XML_parse=PASS; external_relationships=0 embedded_media=0
PPTX: python-pptx_open=PASS; slides=7; size_EMU=12192000x6858000; ratio=1.777778
  slide_1: editable_shapes=6; text_chars=138
  slide_2: editable_shapes=5; text_chars=125
  slide_3: editable_shapes=6; text_chars=203
  slide_4: editable_shapes=7; text_chars=116
  slide_5: editable_shapes=6; text_chars=185
  slide_6: editable_shapes=14; text_chars=187
  slide_7: editable_shapes=8; text_chars=142
PPTX: source_slide_records=7; source_text=27/27; Arabic_runs=10; runs_with_lang+RTL=10; shapes=52
EXTERNAL_RELATIONSHIPS=0; EMBEDDED_MEDIA=0; FONTS_EMBEDDED=0; PDF_GENERATED=0
VALIDATION=PASS
```

## Checks performed

- Three deliverable files exist and are non-empty.
- Each package passed ZIP CRC (`testzip`) and all XML and relationship parts parsed.
- `python-docx` and `python-pptx` reopened the files.
- DOCX page size: `11906 × 16838` twips; ratio `0.707091`, A4-compatible. The English report contains two editable tables; Arabic proposal has one layout table.
- Arabic DOCX: 9 Arabic text runs; all have `w:rtl`; 9 paragraphs have `w:bidi`.
- PPTX: seven slides, `12192000 × 6858000` EMUs (16:9); 52 editable shapes. 27/27 required template text excerpts exist in the source and candidate. All 10 Arabic runs have `lang="ar-SA"` and their paragraph has `rtl="1"`.
- No external OOXML relationships, linked or embedded media, or embedded fonts. Logo SVGs were not embedded or transformed. No PDF exists in the output.

## Failed/intermediate checks and recovery

- Initial candidate generation exited `1` because the media-slide helper sentence used “this placeholder” while the source says “the placeholder.” The candidate PPTX copy was corrected to the exact source wording; final content reconciliation passed. No source was changed.
- An initial validation attempt exited `1` because a simple source substring check crossed an HTML `<bdi>` markup boundary; a subsequent parser pass handled visible HTML text and confirmed the selected source excerpts. Another parser attempt exited `1` because void tags such as `<br>` were counted as nested content; the corrected validator handles void tags and passed.
- One validator launch attempt exited `1` before Python started because the bundled executable path was mistyped; no files were accessed or changed by that failed launch.

## Not verified

Actual Word/PowerPoint rendering; page/slide overflow and clipping; real font availability/substitution; Arabic glyph shaping in Microsoft Office; screen-reader output; print fidelity; acceptance of clear-space or logo decisions. These require visual review and owner decisions where applicable.
