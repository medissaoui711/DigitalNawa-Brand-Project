# Validation Report — DN-BRAND-001-WP08-EXEC-007

## Environment and command results

Validation used the already available bundled Python runtime and standard-library `xml.etree.ElementTree`, `html.parser`, and `hashlib`. A dedicated Python CSS parser (`tinycss2`, `cssselect2`) and bundled Node CSS parsers (`postcss`, `css-tree`, `lightningcss`, `css`) were not available. No dependency was installed. The combined inline validation command was run as bundled `python.exe -c <validation script>`; **stderr was empty; exit code 0**. CSS full formal parsing is NOT VERIFIED.

### Raw final validation stdout

```text
SVG business-card-front-en.candidate.svg SIZE 1572 SHA256 1c3195312148f439fe093919aba375e4fa121c7c2ca2080f0cf7fe765125136e XML_PARSE PASS VIEWBOX 0 0 900 500 DIMENSIONS 90mm 50mm EXTERNAL_REFS [] PALETTE ['#0EA5A4', '#1C1917', '#FEF3C7'] PLACEHOLDERS PASS LANG en
SVG business-card-back-ar.candidate.svg SIZE 2318 SHA256 2392920047a9d2c01fcf70ccf831cdd9e6a55dc64e0886c6e5acbfe0cde5a613 XML_PARSE PASS VIEWBOX 0 0 900 500 DIMENSIONS 90mm 50mm EXTERNAL_REFS [] PALETTE ['#0EA5A4', '#1C1917', '#FEF3C7'] PLACEHOLDERS PASS LANG ar
CSS contact-cards.candidate.css SIZE 2411 SHA256 3e8fa79c3152863a42642c360033a3a051f91f11db25607d93ad654824786ea6 BALANCED_BRACES True RESPONSIVE_RULE True RTL_LTR_RULES True DARK_THEME_RULE True PALETTE ['#0EA5A4', '#1C1917', '#78716C', '#FEF3C7'] FULL_CSS_PARSE NOT_VERIFIED
HTML digital-business-card-bi.candidate.html SIZE 2037 SHA256 0197b3d35b6d850b3e9d5f74e428a0bdc335b56ffe62b6201482c106bfb8822b HTML_PARSER PASS LOCAL_REFS ['contact-cards.candidate.css'] MISSING_LOCAL [] SCRIPTS 0 BILINGUAL_DIR_ISOLATION PASS
HTML professional-contact-card.candidate.html SIZE 2338 SHA256 97b54ecad76261457a14d3431665659780af76b15b8bd21ebafc5652226086ae HTML_PARSER PASS LOCAL_REFS ['contact-cards.candidate.css'] MISSING_LOCAL [] SCRIPTS 0 BILINGUAL_DIR_ISOLATION PASS
VALIDATION_EXIT 0
```

The final `DELIVERABLE-INDEX.json` parsed successfully and listed four registered targets. The source registry still contains 23 entries and its SHA-256 matches its prior recorded value. The final SHA-256 manifest was separately checked after report generation; see the execution result and checksum file.

## Per-format validation

### SVG cards

Both candidate SVGs parse as XML. Each declares a 90 × 50 mm candidate canvas and `viewBox="0 0 900 500"`, contains the requested placeholders, uses only unchanged approved palette values, and has no external references or embedded raster image element. The Arabic back declares Arabic language and RTL direction; editable English contact runs use the WP03 provisional English font stack. Neither artwork includes a logo.

### Digital HTML and CSS

Python's standard `HTMLParser` parsed both HTML files. Each local stylesheet reference resolves to `contact-cards.candidate.css`; no scripts, remote resources, or missing local assets were found. Bilingual pages separate English LTR and Arabic RTL sections and use `bdi` for contact placeholders.

The CSS smoke checks confirmed balanced braces, a responsive breakpoint, direction-specific selectors, a dark-scheme rule, and colors drawn from the approved palette. Because no CSS parser was available, standards-compliant syntax parsing and computed browser styles remain NOT VERIFIED.

## Limits and print status

The local print guidance calls 90 × 50 mm a candidate trim canvas and says 3 mm bleed / 4 mm safe area are recommendations, not printer-sourced settings. The SVGs are conceptual only; no bleed, ICC/profile, stock, finish, provider preset, or print proof is established. Digital format is responsive with no fixed device canvas. No PDF was created.

Visual appearance, SVG text bounds, HTML layout, contrast in rendered states, Arabic shaping, accessibility, and cross-browser behavior remain NOT VERIFIED. The brand palette is preserved; the selected type families are existing provisional recommendations, with no font files embedded.

## Intermediate and prior QA findings

The first formal CSS parser discovery found the relevant parser packages unavailable; validation was therefore limited as stated above. No file was changed after the final validator run. Previously recorded WP08 QA gaps remain: Arabic DOCX alignment discrepancy, missing reproducible Office screenshots, Arabic shaping/font evidence, brand PDF page-2 replacement glyph, logo clear-space conflict, and historical hash transcription discrepancy. This task did not repeat or correct those checks.
