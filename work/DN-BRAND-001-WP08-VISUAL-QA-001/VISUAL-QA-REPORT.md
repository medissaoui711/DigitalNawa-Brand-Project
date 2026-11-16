# Visual QA Report — DN-BRAND-001-WP08-VISUAL-QA-001

**Status: NEEDS MORE EVIDENCE**

## Scope and renderer

**OBSERVED:** Microsoft Word and Microsoft PowerPoint were available and opened the three candidate files through their native interfaces. Office install evidence recorded for this QA run: Microsoft 365 Apps for enterprise, version `16.0.15601.20142`; executables: `C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE` and `C:\Program Files\Microsoft Office\root\Office16\POWERPNT.EXE`. No LibreOffice Writer/Impress or `soffice` renderer was available. No PDF was generated.

**OBSERVED:** Word showed the English document as `Page 1 of 1`; the Arabic document was also inspected as a single page. PowerPoint showed `Slide 7 of 7`; all seven slides were reviewed in the native slide canvas. Live UI screenshots were visually inspected, but the computer-use interface did not persist them as files in the output directory. No screenshot attachment or saved screenshot dimensions are available.

## Results

- **English DOCX:** One page. Provisional marking, section label, teal rule, headings, body text, and comparison table were visible. No apparent text clipping, missing-glyph boxes, or overflow in the inspected page. No confirmed defect.
- **Arabic DOCX:** One page. Arabic glyphs appeared connected and legible in Word; no obvious missing-glyph boxes or clipping were seen. A visual alignment concern remains: Arabic content appeared toward the left edge of its content area despite prior structural validation reportedly finding bidi/right-alignment metadata. This is recorded as an unresolved concern, not a proven RTL failure. Mixed-direction punctuation was not exhaustively verified.
- **PPTX:** Seven slides reviewed: title, Arabic divider, English content, Arabic comparison, media placeholder, illustrative chart, and bilingual closing. Text and shapes appeared within slide bounds. Arabic on slides 2, 4, and 7 appeared connected and visually right-to-left. No obvious clipping, overflow, or missing glyphs were observed. Contrast was visually inspected only, not measured for every text/background pair.

## Defects and limits

**OBSERVED:** No objectively confirmed rendering defect was established. The Arabic DOCX alignment concern is unresolved; evidence is insufficient to change the candidate safely. No corrections were made.

**NOT VERIFIED:** Persisted screenshots, image dimensions, exhaustive text/shape boundary measurements, all contrast ratios, accessibility remediation, cross-renderer consistency, font-substitution diagnostics, and Arabic shaping in other Office/print/PDF renderers. This review does not establish WCAG conformance, production readiness, or owner acceptance.

## Input integrity

SHA-256 values were recalculated after native-app review and matched the existing `EXEC-002/SHA256SUMS.txt` entries for all three inputs. A one-character transcription discrepancy exists in `EXEC-002/EXECUTION-REPORT.md` for the Arabic DOCX: its table says `...e7386d9f2...`, while the inventory and recalculated hash say `...e7386d69f2...`. The hash in this QA package reflects the recalculated value. No input candidate was edited or saved by the reviewer. No production files were opened or changed.

## Recommendation

Retain the files as isolated drafts. Before visual approval, persist full-page and per-slide screenshots using an authorized capture workflow; resolve whether the Arabic DOCX's left-edge placement is intended; then measure contrast and inspect text boxes at fit-to-page/full-slide scale. No production integration is recommended from this evidence alone.
