# PDF Arabic Investigation

**Status: NOT RESOLVED; cause partly characterized, export cause NOT VERIFIABLE.**

PDF path: DigitalNawa/03-Logo-Assets/06-Exports/digitalnawa-brand-identity.pdf; 44,119 bytes; SHA-256 33c2135aebb7176d1266ee84f35249ac9d21c0eabc955d3e0a36c8132d70e19b. pdfinfo says Creator/Producer DesignCraft, 12 pages, tagged A4 PDF 1.7; exit 0.

Native source: DigitalNawa/03-Logo-Assets/09-Documentation/digitalnawa-brand-identity.designcraft; 29,423 bytes; SHA-256 918b8ac57e80e882aca599113d88e7c34891ca1d68399135ed64f4cd0206154f. ZIP entries: mimetype, meta.json, preview.png, document.json. Meta generator DesignCraft 0.20.1; no font binary included.

Document story 44 (frame 43; page 2 text) contains correct Unicode Arabic. Its direction is leftToRight; one 240-character run uses style [None], fontStyle Regular, size 14, with no explicit Arabic font or direction. Source narrative says editorial text uses bundled Source Serif 4 and DesignCraft font.list reports source=bundled, fsType=0, restrictedLicence=false. This is source text, not independent font-byte/cmap verification; no Arabic-specific font override is present in story 44.

Direct page 2 render shows Arabic replacement-square glyphs. This may involve default font glyph coverage, direction/shaping or export, but evidence cannot isolate one.

Commands:
- pdfinfo PDF: exit 0.
- pdftoppm -png -r 100 PDF output prefix: exit 0; 12 renders in this folder.
- MiKTeX pdffonts PDF: exit -1073740791; AppData/registry access denied.
- MiKTeX pdftotext -f 2 -l 2 -enc UTF-8 -nopgbrk PDF -: exit -1073740791; registry access denied.
- fontTools check Arial/Tahoma/Segoe UI/Calibri: exit 0; Arabic and tested diacritics in cmap; OS/2 fsType=8 restricted embedding.
- Get-Command designcraft,DesignCraft: no command found.

No source correction/PDF was made. Safest next step is to open a copy in supported DesignCraft, put Arabic into an explicit RTL run with owner-approved glyph-tested font and documented embedding rights, keep Latin text isolated LTR, export, then inspect connected shaping and embedded fonts. Do not infer brand font approval.
