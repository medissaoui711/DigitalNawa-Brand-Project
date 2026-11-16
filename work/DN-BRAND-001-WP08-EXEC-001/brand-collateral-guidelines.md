# DigitalNawa Brand Collateral Guidelines

**Task:** DN-BRAND-001-WP08-EXEC-001  
**Status:** PROVISIONAL — NOT APPROVED FOR PRODUCTION

## System architecture

The collateral templates apply the existing candidate design system to business identity, document, and presentation surfaces. WP02 provides color and theme tokens, WP03 typography roles, WP04 candidate logo/lockup SVGs, WP05 brand guidance, WP06 reusable components, and WP07 social identity patterns. This package imports candidate CSS through local relative paths and references WP04 SVGs; it does not copy or redefine source tokens or logo geometry.

### Source provenance

SHA-256 values verified before use:
- WP02 V2 JSON: `e4866524b983cd1aeeae18931ad50a43b451e3a8e094e332895513d857e0209a`
- WP02 V2 CSS: `c379f491556f2d1879c2d32213b1f557447fde7aa7285202b378b99eb5c850c0`
- WP03 typography JSON: `c462aa3c76a8c0905a396586b56c32ff97634b754f9a90b81dba7e2063e378c4`
- WP03 typography CSS: `07bb085f4e6971432a3ea9da6c1873069636b43437d9bbb6efb64f1e8cc66ef2`
- WP04 logo candidate index: `5bc61fb7fe8acaa60692b6454e6adaa478455288583a38517e78f452da060524`
- WP05 guidelines: `b77f1d8bc995154a3115eba302fa37ecbb6fc86ebd5f8ac06f9d565d40a4648b`
- WP06 component CSS: `2d2d35c195645f527ab6521663ed404433aa85e08eb43a05a598f2e00006424a`
- WP07 social CSS: `187a15aaa1204c5c3f4c8fecaf3141fdceebdf6357d55e4a6ba365fe73312510`

## Business identity

The business card front/back, digital contact card, professional contact card, bilingual email signatures, and stationery are editable compositions. Contact names, emails, websites, dates, and roles marked in brackets are placeholders. Replace them only with owner-provided details. Keep contact information as selectable text and provide a text alternative if a logo is used in a digital contact flow.

## Document identity

The document templates include Arabic and English letterhead, report cover/interior, proposal cover/interior, invoice, and general business document. Use semantic document headings, table captions, scoped table headers, and reading order that follows the content. Bracketed text is a placeholder. The invoice is a layout only; it contains no legal, tax, or payment terms and must be reviewed for the relevant jurisdiction before real use.

## Presentation identity

Seven slide patterns cover title, section divider, content, two-column, media placeholder, chart, and closing/contact. Maintain one main idea per slide, editable text, strong hierarchy, and consistent logo position. Chart figures are illustrative layout values, not results. Replace media placeholders only with approved and accessible content.

## Color, type, and logo use

- Preserve Warm Ivory `#FEF3C7`, Warm Gray `#78716C`, Muted Teal `#0EA5A4`, Dark Brown `#1C1917`, and Warm Orange `#EA5808` as recorded in WP02.
- CSS uses semantic token references; no new palette values are introduced in collateral styles.
- Functional states and WP-03 typography remain provisional. Do not represent candidates as approved or embed fonts without confirming availability and license.
- Use only existing WP04 logo candidates. Match language and background variant. Do not redraw, crop the symbol geometry, or create a new logo master.
- The local focus indicator uses the approved dark-brown and ivory tokens; its final visibility still requires rendered contrast and keyboard testing.

## Arabic, English, RTL and LTR

Each page declares language and direction. Arabic samples use `lang="ar"` and `dir="rtl"`; English uses `lang="en"` and `dir="ltr"`. Mixed text, email addresses, dates, page numbers, and identifiers use `bdi` or explicit direction. Keep DOM order meaningful and use logical CSS properties for alignment. Arabic shaping, fallback, diacritics, and client-specific display are not visually verified.

## Responsive and reuse guidance

HTML previews use responsive grids and media queries for smaller viewports. They are review specimens, not finished office documents or presentation exports. Reuse the template index and export registry to choose a canvas; retain the original task folders so relative CSS/SVG dependencies resolve. Do not treat a canvas dimension as a current platform or printer specification.

## Known limitations

- All collateral is PROVISIONAL — NOT APPROVED FOR PRODUCTION.
- No PDF, PNG, SVG export, or presentation deck was generated from these previews.
- No fonts were installed, downloaded, or embedded; no licensing determination was made here.
- No professional print, color-profile, physical proof, browser, email client, or document-app validation was performed.
- Export, bleed, trim, DPI, and safe-margin values are candidates requiring provider confirmation.
- Invoice/legal/tax content is not supplied; all fields are placeholders.

## Final QA checklist

1. Review all pages and slides visually at desktop and mobile widths.
2. Test Arabic shaping, mixed-direction runs, page breaks, and text fallback in target software.
3. Verify logo variants, alt text, minimum sizes, spacing, and background contrast.
4. Confirm data tables and charts are understandable without color alone.
5. Validate all output formats, dimensions, transparency, DPI, metadata, and PDF page boxes.
6. Get provider-specific print settings, inspect a generated PDF, and review a physical proof where printed.
7. Replace placeholders with owner-approved information and confirm jurisdiction-specific invoice content.
8. Obtain explicit Project Owner acceptance before production use.
