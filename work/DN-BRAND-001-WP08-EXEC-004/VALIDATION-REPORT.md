# Validation Report — WP08 EXEC-004

## Files and commands

Validation used the already configured bundled Python runtime with installed `python-docx`; no dependencies were installed and no network was used. The operation marker command completed with exit code `0`. The combined validator used `zipfile`, `xml.etree.ElementTree`, `hashlib`, HTML parsing, and `python-docx`; exit code `0`.

An initial exact-text comparison harness omitted the inline date `<span>` and returned exit code `1` due to its extraction scope. No candidate was changed. The corrected parser included the date span and compared all eight Arabic blocks exactly; result `True`, exit code `0`.

## Results

| Check | Arabic general document | English email signature |
|---|---|---|
| Exists, non-zero | PASS — 38,714 bytes | PASS — 38,511 bytes |
| ZIP package (`testzip`) | PASS — `None` | PASS — `None` |
| XML/relationship parts parsed | PASS — 18 | PASS — 18 |
| `python-docx` open/read | PASS — 8 paragraphs | PASS — 6 paragraphs |
| Page dimensions | A4 210.01 × 297.0 mm | A4 Word editing carrier 210.01 × 297.0 mm |
| Expected source text | PASS — eight blocks exactly match in order | PASS — five registered specimen paragraphs present exactly and in order |
| Direction / language | PASS — `ar-SA`, RTL paragraph/run metadata | PASS — `en-US`, LTR text |
| External relationships | None | None |
| Embedded media / fonts | None / none | None / none |
| Logos | None embedded | None embedded |

**Palette:** Authored document/header/footer styling uses existing approved palette values (Dark Brown `#1C1917`, Warm Gray `#78716C`, Muted Teal `#0EA5A4`); no new or functional colors were introduced. Warm Ivory and Warm Orange were not needed in these compositions. Typeface name Inter is provisional; font files are not embedded and licensing/availability is not validated here.

## Word view

Both files opened in the installed Microsoft Word application. Arabic showed one A4 page at 75% zoom; English signature showed one page. No obvious clipping or overflow was visible in those live views. No screenshot file was saved. This is limited live inspection, not reproducible screenshot evidence, cross-client Arabic shaping verification, print proof, accessibility validation, or owner acceptance. No PDF was generated.

## Limitations

- The email signature's A4 page is only an editable Word carrier; it does not establish a universal email-client canvas. Link behavior, dark mode, image blocking, and client-specific rendering remain unverified.
- Arabic shaping, font fallback and mixed-direction punctuation with real contact data remain open.
- All candidates remain provisional.
