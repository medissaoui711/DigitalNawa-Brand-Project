# Export Validation

**Status: RESOLVED - PARTIALLY VERIFIED.**

Poppler pdfinfo and pdftoppm are available. pdfinfo exit 0; pdftoppm exit 0 rendered the unchanged PDF to existing-pdf-page-01.png through -12.png in this directory. Each page is 827x1170 pixels. These are preview renders, not corrected exports. PDF SHA-256 33c2135aebb7176d1266ee84f35249ac9d21c0eabc955d3e0a36c8132d70e19b; page 2 Arabic glyphs still fail.

MiKTeX pdffonts and pdftotext fail with exit -1073740791 because AppData/registry access is denied. No DesignCraft CLI found. Python fontTools/tinycss2/WeasyPrint already exist; none installed. WeasyPrint was not used to bypass local browser security or reproduce DesignCraft layout.

No candidate PDF was generated. Font embedding, transparency, ICC/CMYK, bleed/trim/provider compatibility and physical print remain NOT VERIFIED.
