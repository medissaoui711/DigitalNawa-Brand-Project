# PDF & Typography Findings

## Existing PDF

Previous remediation evidence identifies `DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf` (44,119 bytes; SHA-256 `33c2135aebb7176d1266ee84f35249ac9d21c0eabc955d3e0a36c8132d70e19b`) as a 12-page tagged A4 PDF 1.7 produced by DesignCraft. Page 2 was visually observed to show replacement-square glyphs in the Arabic brand name. This is a confirmed existing defect; the precise font, shaping, bidi, or export cause is not isolated.

## Font and embedding evidence

- Prior `fontTools` inspection found tested Arabic/diacritic cmap entries in Arial, Tahoma, Segoe UI, and Calibri, while their `OS/2 fsType=8` indicates restricted embedding. Do not embed these fonts in a regenerated PDF.
- The DesignCraft document archive reportedly contains no font binary. Its source narrative's Source Serif 4 `fsType=0`/bundled claim is not independently verified against font bytes or an authoritative font catalog; Arabic coverage remains unknown.
- MiKTeX `pdffonts` and `pdftotext` previously failed with exit `-1073740791` due registry/AppData access denial. Poppler `pdfinfo`/`pdftoppm` can inspect/rasterize an existing PDF, but are not a verified DesignCraft source exporter.
- The typography research/package names Inter, IBM Plex Sans Arabic, JetBrains Mono, and Cairo as provisional candidates. No files were downloaded or installed, no exact local font binary was tested, no owner font approval exists, and Arabic shaping remains unverified.

## What can be resolved without DesignCraft

The evidence can be consolidated: available Windows fonts are not approved for embedding; the source's Source Serif 4 claim remains unverified; the PDF's page 2 defect is known; typography candidates remain provisional. No safe correction/export path or font selection can be established from the current local evidence. The approved Arabic text copy candidate and its hash do not prove visual correction.

## Blocked verification

A supported DesignCraft session and a glyph-tested, legally embeddable/appropriately licensed font source are required to verify connected Arabic shaping, mixed-direction rendering, PDF embedding and tagged export. No PDF generation or font substitution was attempted. PDF/UA and print readiness are not claimed.
