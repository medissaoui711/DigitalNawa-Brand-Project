# Dark Theme `.art-paper` Contrast Remediation

**Result: PASS — isolated static CSS correction validated.**

## Finding and scope

- **OBSERVED:** WP07 VQA defect register `VQA-002` records `.art-paper` as `POTENTIAL_STATIC_RISK`, dark theme, `1.14:1`, and explicitly says the selector is not instantiated by either inspected HTML specimen. This is a static CSS risk, not a confirmed rendered defect.
- **OBSERVED:** Source stylesheet: `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP07-REMEDIATION-001\social-identity-system.css`; size 7855 bytes; SHA-256 `a9dbf67761e9dbb315b8f083ccb7e1cfced2d09ef0d2313aed89bab8811a2443`.
- **OBSERVED:** Relevant declaration is `.dn-social .art-paper { color:var(--dn-brand-dark-brown); background:var(--social-surface); border:1px solid var(--social-line); }`.
- **VALIDATED:** In dark theme, `--social-surface` resolves through `--dn-surface` to `#292421`. Foreground `--dn-brand-dark-brown` resolves to approved `#1C1917`.

## Candidate change

Added one dark-only override in `candidate-assets/social-identity-system.css`:

```css
.dn-social[data-theme="dark"] .art-paper, .dn-social [data-theme="dark"] .art-paper { color:var(--dn-brand-warm-ivory); }
```

This covers the documented root theme attribute and the nested dark-theme structure used by the existing stylesheet selector. The new foreground resolves to approved Warm Ivory `#FEF3C7`. Background and border declarations are unchanged. No light-theme, palette, token, or unrelated selector changes were made.

## Contrast values

Calculated independently from sRGB HEX using WCAG relative luminance and `(Lmax + 0.05)/(Lmin + 0.05)`.

| Context | Foreground | Background | Ratio | Normal text ≥ 4.5:1 |
|---|---|---|---:|---|
| Dark before | Dark Brown `#1C1917` | Dark surface `#292421` | 1.1397:1 (reported rounded 1.14:1) | Fail |
| Dark after | Warm Ivory `#FEF3C7` | Dark surface `#292421` | 13.7799:1 | Pass |
| Light unchanged | Dark Brown `#1C1917` | Light surface `#FFF9E8` | 16.6285:1 | Pass |

Other approved brand palette colors checked against the dark surface: Warm Gray `#78716C` = 3.1983:1; Muted Teal `#0EA5A4` = 5.0686:1; Warm Orange `#EA5808` = 4.3094:1. Warm Ivory is selected because it is already used as the readable foreground on `.art-dark`, preserves the approved palette, and provides the strongest margin without changing semantics.

## Limits

The class was unused in the inspected specimens. This correction does not establish a rendered defect resolution, visual QA, or full WCAG conformance. It validates this static text/background pair only.
