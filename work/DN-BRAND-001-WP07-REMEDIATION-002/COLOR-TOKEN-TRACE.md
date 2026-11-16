# Color Token Trace

## Source files

- WP07 CSS: `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP07-REMEDIATION-001\social-identity-system.css` — 7855 bytes; SHA-256 `a9dbf67761e9dbb315b8f083ccb7e1cfced2d09ef0d2313aed89bab8811a2443`.
- WP02 candidate token export: `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP07-REMEDIATION-001\dependencies\design-tokens.candidate-v2.css` — 5414 bytes; SHA-256 `c379f491556f2d1879c2d32213b1f557447fde7aa7285202b378b99eb5c850c0`.
- QA accessibility report: `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP07-VISUAL-QA-001\CSS-ACCESSIBILITY-REPORT.md` — 2807 bytes; SHA-256 `7cde82a034677438210f22d638cbac9c43a3f8cfe560aa523bea101f9c18c400`.
- QA defect register: `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-WP07-VISUAL-QA-001\DEFECT-REGISTER.json` — 1393 bytes; SHA-256 `46ff17621aae9b53ac15ef3ad44e175c2d257dfa7a58fb439def82841767ac8f`.

## Cascade and token resolution

1. Base rule `.dn-social .art-paper` sets foreground to `var(--dn-brand-dark-brown)`, background to `var(--social-surface)`, and border to `var(--social-line)`.
2. `.dn-social` defines `--social-surface: var(--dn-surface)` and `--social-line: var(--dn-border)`.
3. WP02 V2 candidate tokens define the approved primitives `--dn-brand-dark-brown:#1C1917` and `--dn-brand-warm-ivory:#FEF3C7`. Their palette values remain unchanged.
4. The token stylesheet's `[data-theme="dark"]` mapping sets `--dn-surface:#292421`; derived `--social-surface` therefore resolves to `#292421`.
5. The dark-only override changes only `.art-paper` foreground to `var(--dn-brand-warm-ivory)`. Its computed foreground is `#FEF3C7`; background remains `#292421`.

The QA report's `VQA-002` calls out the same unused CSS rule and records 1.14:1. No `.art-paper` class was found in either inspected HTML specimen.

## Token trace table

| Property | Before reference | Resolved value | After reference | Resolved value |
|---|---|---|---|---|
| Dark foreground | `var(--dn-brand-dark-brown)` | `#1C1917` | `var(--dn-brand-warm-ivory)` | `#FEF3C7` |
| Dark background | `var(--social-surface)` → `var(--dn-surface)` | `#292421` | unchanged | `#292421` |
| Border | `var(--social-line)` → `var(--dn-border)` | `#8C8580` in dark theme | unchanged | `#8C8580` |
| Light foreground | base rule `var(--dn-brand-dark-brown)` | `#1C1917` | unchanged | `#1C1917` |
| Light background | `var(--social-surface)` → `var(--dn-surface)` | `#FFF9E8` | unchanged | `#FFF9E8` |

## Governance

No new color was introduced or approved. Warm Ivory is an existing approved brand primitive. No global token, theme map, HTML specimen, logo, type, or other workstream file was changed.
