# SVG Validation Report

**Static validation: PASS.**

- Source and candidate parsed as XML.
- Canvas remains 1080 × 270; ViewBox remains `0 0 1080 270`.
- Symbol transform and all symbol path data are unchanged.
- Only two attributes changed: Arabic text y 159→145; English tagline y 215→225.
- Both text strings, font family, sizes, weights, anchor, RTL direction and letter spacing were verified unchanged.
- Wordmark color remains `#1C1917`; no raster images or external resources were added.
- Source hash matches the official asset manifest.
- Validation routine: Python XML parse, manifest SHA comparison and recursive source/candidate attribute comparison; exit code `0`.

Static validation does not prove that the rendered lines no longer collide.
