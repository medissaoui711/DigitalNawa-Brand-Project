# Validation Report

## Commands, output, and exit status

Runtime: existing bundled Python at `C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt\dependencies\python\python.exe`; no dependency installation.

1. PowerShell here-string piped to the Python runtime (`python -`): HTML `html.parser` feed/close and `lxml.html` DOM parse of both candidate HTML files; JSON parse of both candidate registries; local references; class/style heuristic; source hash capture. **Exit 0.** Output: HTML parse errors 0; 33/33 unique IDs mapped; registry 33 records/33 unique IDs/9 formats; 20 implemented/13 not implemented; missing local refs 0; invalid language tags 0; invalid `lang=bi` 0; malformed placeholder matches 0.
2. Python `lxml.etree` parse of all bundled logo SVGs and static responsive/CSS scan: **Exit 0.** SVG files parsed 9/9; HTML class tokens with no matching class-selector token: **0**; CSS brace mismatches 0; local CSS imports 3/3 resolved; remote references 0. This class check is lexical and does not replace a CSS parser.
3. SHA-256 inventory verification: **Exit 0.** All listed files verified; no checksum mismatch.

Story sequence counters observed, in order: `01 / 04`, `02 / 04`, `03 / 04`, `04 / 04`. All local CSS imports resolve. All local HTML image and stylesheet references resolve.

## CSS and responsive limitations

A full CSS parser was not available, so complete CSS grammar validation is **NOT VERIFIED**. Chrome was installed/running, but direct local `file:` navigation was rejected by browser policy (only HTTP/HTTPS allowed). No workaround or alternate surface was used. Responsive viewport tests at 360, 768, 1280, and 1440 CSS pixels, clipping/overflow inspection, and browser CSSOM validation are **NOT VERIFIED**. Static CSS contains responsive media queries and reduced-motion handling; this does not establish rendered behavior.

## Language, accessibility, and brand limitations

`lang` values are `en`/`ar`; malformed `lang="bi"` count is 0. Focus-visible rules are present. There is no WCAG contrast/conformance claim. Arabic direction metadata was inspected statically, but Arabic shaping, glyph selection, and actual visual mixed-direction behavior are **NOT VERIFIED**. Approved palette values found in bundled CSS tokens: `#FEF3C7`, `#78716C`, `#0EA5A4`, `#1C1917`, `#EA5808`. No logo geometry or clear-space acceptance claim is made.

## Source and safety status

Eight requested WP07 source files were read and hashed; current values match the source inspection record. WP07 `EXECUTION-REPORT.md` is **NOT FOUND** at the source package path. Original source, production assets, and WP02–WP06 candidates remain unchanged by this task.
