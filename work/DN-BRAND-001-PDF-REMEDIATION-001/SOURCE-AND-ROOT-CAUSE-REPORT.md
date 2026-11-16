# Source and Root-Cause Report

**Status: NEEDS MORE EVIDENCE (root cause not isolated).**

## Verified artifacts

| Role | Actual path | Bytes | SHA-256 | Evidence |
|---|---|---:|---|---|
| Original DesignCraft source | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\09-Documentation\digitalnawa-brand-identity.designcraft` | 29423 | `918b8ac57e80e882aca599113d88e7c34891ca1d68399135ed64f4cd0206154f` | **VALIDATED:** hash matches historical expected value; archive CRC and JSON parse pass. |
| Previously authorized DesignCraft candidate | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-ARABIC-BIDI-COPY-001\digitalnawa-brand-identity.candidate.designcraft` | 27947 | `e6705174a7841aed1534c804438dc3edb6ca05c69698c9ddc63116b8b8601219` | **VALIDATED:** hash matches historical expected value; archive CRC and JSON parse pass. |
| Original PDF | `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf` | 44119 | `33c2135aebb7176d1266ee84f35249ac9d21c0eabc955d3e0a36c8132d70e19b` | **VALIDATED:** hash matches QA baseline; `pdfinfo` exit 0. |

**OBSERVED path discrepancy:** The PDF was not found under `09-Documentation` (the task's stated path); its actual location is `DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf`. The DesignCraft source is in `09-Documentation` as stated.

## Story/frame structure

- Story ID `44` references frame ID `43`; its page-2 host page has A4 dimensions `595.2756 × 841.8898 pt` in the DesignCraft document model. The candidate document archive passes ZIP CRC (`testzip() is None`); `meta.json` identifies DesignCraft `0.20.1`, format `designcraft`, version `2`.
- Original story 44 direction is `leftToRight`; four paragraphs; one character run has style `[None]`, Regular, 14 pt, length metadata 240. No explicit font family, language, per-run direction, or bidi-isolation metadata is recorded in the story/run structure.
- Candidate story 44 also remains globally `leftToRight`, has four paragraphs and the same Regular 14 pt run; its exact text matches the supplied owner replacement, including U+2067/U+2069.
- **VALIDATED minimal structural difference:** archive entries are identical; `mimetype`, `meta.json`, and `preview.png` are byte-identical. Recursive `document.json` comparison found exactly two paths changed: `/stories/44/text` and `/stories/44/chars/0/len` (240 → 246). No other JSON field changed. The length counter is DesignCraft metadata; not interpreted as visual evidence.

## Cause assessment

- **OBSERVED:** Prior rendered page-2 image shows replacement-glyph boxes in the Arabic substring, while adjacent English renders. This confirms an Arabic glyph-rendering failure in the existing PDF.
- **NOT VERIFIED:** Whether the direct cause is missing glyph coverage, font substitution, incorrect embedding, shaping support or an exporter/rasterizer defect. Font enumeration via installed MiKTeX `pdffonts` failed before listing fonts because registry access was denied. The DesignCraft source story does not name a font family. A directionality omission is present in the original story (no local RTL isolation), but available evidence does not prove it caused replacement boxes.
- **Inference:** The appearance is consistent with an Arabic glyph/font coverage or embedding failure, but this remains a hypothesis, not a verified root cause. The bidi issue is a separate source-level risk.

## Local application and tool discovery

- `Get-Command designcraft,designcraft.exe`: no command found (PowerShell command exit 0; no matching output).
- Read-only uninstall-key and standard app-directory/shortcut checks: no DesignCraft result; discovery command exit 0.
- `Get-AppxPackage -Name '*DesignCraft*'`: access denied; app package registration remains **UNKNOWN**, not proof of global absence.
- Prior report `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-DESIGNCRAFT-DISCOVERY-002\INSTALLATION-DISCOVERY-REPORT.md` likewise found no authorized DesignCraft launch route and documented package access denial.
