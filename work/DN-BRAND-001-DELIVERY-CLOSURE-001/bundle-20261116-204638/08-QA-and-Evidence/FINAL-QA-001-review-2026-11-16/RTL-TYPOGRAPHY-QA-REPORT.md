# RTL and Typography QA

Result: NEEDS MORE EVIDENCE.

WP03-011 candidate typography JSON (3371 bytes; SHA-256 c462aa3c76a8c0905a396586b56c32ff97634b754f9a90b81dba7e2063e378c4) lists provisional Inter (English/UI), IBM Plex Sans Arabic, JetBrains Mono and Cairo alternative. It contains roles, fallbacks, direction/language metadata, bidi-isolation guidance, zero Arabic tracking and Arabic line-height adjustment. WP04 declares editable Arabic/English wordmark text and fallbacks. No font files are bundled.

Direct observation: PDF page 2 image renders Arabic as missing-glyph boxes. Cause (font embedding, glyph coverage, encoding or export pipeline) UNKNOWN.

| Dimension | Result |
|---|---|
| Source RTL/language declarations | OBSERVED |
| Bidi isolation guidance | OBSERVED |
| Browser Arabic joining/diacritics | NOT VERIFIED |
| SVG wordmark shaping/metrics | NOT VERIFIED |
| Actual font availability/fallback | NOT VERIFIED |
| Mixed Arabic/English, URLs, email, numerals, punctuation | NOT VERIFIED |
| PDF embedded font list | NOT VERIFIED; pdffonts exit 1, MiKTeX registry access denied |
| Deployment licensing evidence | NOT VERIFIED in this QA |

No font installed, downloaded or copied. Do not claim typography approval or shaping correctness.
