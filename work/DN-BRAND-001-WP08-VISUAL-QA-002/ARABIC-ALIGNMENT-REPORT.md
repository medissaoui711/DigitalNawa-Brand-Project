# Arabic Alignment Report

**Input:** `work\DN-BRAND-001-WP08-EXEC-002\proposal-page-ar.candidate.docx`  
**Size:** 38,285 bytes  
**SHA-256:** `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2`

## OOXML findings

Read-only inspection of `word/document.xml` found the following Arabic-bearing body paragraphs (document paragraph positions 2 and 4–11):

- `w:jc`: `right` on each inspected paragraph.
- `w:bidi`: present on each inspected paragraph; no explicit `w:val` attribute, so it is an on-valued OOXML toggle.
- Run language: `ar-SA` on Arabic runs. Mixed section-marker paragraph 2 has both `en-US` and `ar-SA` run language metadata.
- Run-level `w:rtl`: absent in the inspected runs.
- Paragraph 2 (`02 · [القسم]`) is a direct child of `w:body`, outside the one-column table. The document table grid is 9,638 twips wide; the section marker is therefore not right-aligned merely within a narrow table cell.

The XML establishes explicit physical right alignment and paragraph bidi. These are separate properties; RTL reading order alone does not establish alignment.

## Word visual observation

**OBSERVED:** In the live Word view, the mixed section marker appeared at the left edge of the page's text area rather than near its right edge. Arabic body text also appeared visually left-positioned in the displayed page. The page was one page. The view was inspected through CUA at page-fit and at 100% zoom; no saved screenshot is available. The live observation conflicts with the explicit `w:jc=right` property.

## Determination

**VALIDATED:** XML paragraph alignment is explicitly right; paragraph bidi is enabled; language tags are present as above.

**OBSERVED / NOT REPRODUCIBLY EVIDENCED:** Word's live rendering appeared left-aligned, in conflict with the XML property. Because no attributable screenshot was saved and no style/layout engine diagnosis identifies why Word does not honor the direct property, the rendering mismatch is confirmed as an observation but not safely localized to a single correctable property.

No correction candidate was created. Changing `w:jc` from `right` would be speculative because the source already specifies right alignment; run-level direction or another layout interaction may be involved. Reopen with a same-session capture method and inspect paragraph boundaries and effective formatting before proposing a patch.
