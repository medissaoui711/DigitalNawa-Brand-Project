# Arabic Direction Analysis

**Status:** RESOLVED - PARTIALLY VERIFIED for source structure; rendered shaping NOT VERIFIABLE.

## Authoring chain
- PDF: DigitalNawa/03-Logo-Assets/06-Exports/digitalnawa-brand-identity.pdf (44,119 bytes; SHA-256 33c2135aebb7176d1266ee84f35249ac9d21c0eabc955d3e0a36c8132d70e19b).
- Native source: DigitalNawa/03-Logo-Assets/09-Documentation/digitalnawa-brand-identity.designcraft (29,423 bytes; SHA-256 918b8ac57e80e882aca599113d88e7c34891ca1d68399135ed64f4cd0206154f).
- The DesignCraft ZIP metadata says generator DesignCraft 0.20.1. The archive has mimetype, meta.json, preview.png, document.json. No HTML/CSS source was found for the 12-page document.

## Exact source block
Page 2 = spread index 1, page object ID 5. Frame object ID 43, spread 1 item 4, references story 44. Frame path points are (48,145), (548,145), (548,720), (48,720), no transform. Story text:
1. DigitalNawa — ديجيتال نواة
2. Brand model: Founder-Led Digital Brand.
3. Positioning: AI-Assisted Full-Stack Developer; Tech Educator; Digital Product Creator.
4. The identity supports education, development, and digital products.

Observed source fields: story direction leftToRight; one char run len 240, style [None], override Regular 14.0. Story and char run have no lang, fontFamily, per-run direction, or bidi-isolation field. Character style [None] has empty chars; paragraph style is Basic Paragraph. This means RTL is not explicitly scoped to the Arabic substring. The containing story is principally English, so changing the whole story to RTL would be incorrect and could reverse English reading flow.

## Distinguish the failures
- **Flow/direction:** Arabic name is mixed into an LTR story without an explicit RTL isolate/run. Source-level risk confirmed. Actual reordering is not measurable from JSON alone.
- **Glyph substitution:** page 2 raster shows square replacement glyphs. This is a separate visible failure; changing direction alone cannot be assumed to restore glyphs.
- **Font family/glyph coverage:** story does not name a font family; [None] style is empty. Another source note says editorial copy uses bundled Source Serif 4, but the font is not in the archive and the story does not explicitly reference it. PDF font inspection failed.
- **Arabic shaping/joining:** not validated. Missing boxes prevent assessment of connected forms.
- **Language metadata:** no language field found in story or its single char run. PDF is tagged, but its document/structure language could not be inspected.
- **Mixed punctuation/isolation:** em dash and Arabic run share the LTR story; no explicit isolation. Mixed bidi behavior remains unverified.

Observed page 2 image is prior remediation-001 evidence at existing-pdf-page-02.png, SHA-256 e7276caa6184f3273bd15dcddf33dc08604fb0e0178e377e55df6dc38960a451. Therefore the root source location is confirmed, but direction-only remediation is not sufficient evidence of full defect closure.
