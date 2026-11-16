# DigitalNawa visual system foundation

Status: draft. The logo symbol concept and palette are approved in the supplied project instructions. No reference image is present; the SVG is a geometric reconstruction from the written concept, not an exact trace. Wordmark typography remains provisional.

## Approved palette

| Name | Hex | Intended role |
|---|---|---|
| Warm Ivory | #FEF3C7 | Light background |
| Warm Gray | #78716C | Secondary text |
| Muted Teal | #0EA5A4 | DN monogram D |
| Dark Brown | #1C1917 | Primary text and dark monochrome |
| Warm Orange | #EA5808 | DN monogram N and rising pixels |

## Typography candidates (not approved)

- English: Inter.
- Arabic: Cairo or IBM Plex Sans Arabic.
- Technical: JetBrains Mono.
- SVG wordmarks use live text and candidate font stacks; visual output depends on installed fonts until a final font is approved. Font files are not bundled; licensing has not been independently verified.

## Construction and usage

The symbol geometry is authored separately from the wordmark. Preserve its proportions; maintain clear space of at least one quarter of the symbol height; do not skew or clip it. Light versions use Dark Brown wordmarks on transparent/light backgrounds; dark versions use Warm Ivory. Monochrome files use a single ink. The social preview uses Warm Ivory.

## Layout, spacing, iconography

Spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64 px. Radius tokens: 0, 4, 8, 16, 999 px. Use geometric square pixel accents only as part of the logo motif.

## RTL/LTR

English wordmark is LTR. Arabic wordmark is RTL and reads “ديجيتال نواة”. Keep icon and wordmark as separate groups; do not mirror the DN symbol when changing direction.

## Contrast check (WCAG 2.x relative luminance calculation)

Text-sized combinations checked: Dark Brown on Warm Ivory = 15.71:1 (AA pass); Warm Gray on Warm Ivory = 4.31:1 (AA fail for normal text, use for large text only); Muted Teal on Warm Ivory = 2.7:1 (AA fail); Warm Orange on Warm Ivory = 3.20:1 (AA fail). Teal and Orange are symbol/accent colors and are not approved here for normal text on Warm Ivory. Contrast ratios are calculated from the listed sRGB hex values; validate actual UI combinations before release.

## Actual document font use

The 12-page DesignCraft publication uses the app's bundled Source Serif 4 for editorial text. DesignCraft `font.list` reported `source=bundled`, `fsType=0`, and `restrictedLicence=false`. This is document typesetting only; it does not approve Source Serif 4 as a DigitalNawa brand typeface. The SVG wordmark candidate stacks remain provisional, and their font licensing has not been independently checked. The DigitalNawa package does not bundle font files.
