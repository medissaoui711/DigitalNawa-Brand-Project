# Validation Report

| Check | Command / method | Result | Exit |
|---|---|---|---:|
| Original DesignCraft size/SHA-256 | `Get-Item`; `Get-FileHash -Algorithm SHA256` | 29423 bytes; `918b8ac57e80e882aca599113d88e7c34891ca1d68399135ed64f4cd0206154f` | 0 |
| Prior candidate size/SHA-256 | `Get-Item`; `Get-FileHash -Algorithm SHA256` | 27947 bytes; `e6705174a7841aed1534c804438dc3edb6ca05c69698c9ddc63116b8b8601219` | 0 |
| Original PDF size/SHA-256 | `Get-Item`; `Get-FileHash -Algorithm SHA256` | 44119 bytes; `33c2135aebb7176d1266ee84f35249ac9d21c0eabc955d3e0a36c8132d70e19b` | 0 |
| DesignCraft ZIP CRC and JSON | Python `zipfile.testzip()`, `json.loads()` | Source and candidate archives valid; story 44/frame 43 present | 0 |
| Owner text/codepoints | Python exact string comparison | Candidate exact; U+2067/U+2069 verified; 4 lines | 0 |
| Source/candidate minimal diff | Python recursive JSON diff and ZIP member byte comparison | Exactly story 44 text and `/stories/44/chars/0/len` differ; other archive members unchanged | 0 |
| PDF metadata | `pdfinfo "C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf"` | 12 pages; A4; tagged; PDF 1.7 | 0 |
| PDF font inspection | `pdffonts "C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf"` | MiKTeX access denied; no font table | -1073740791 |
| Page-2 PDF text extraction | `pdftotext -f 2 -l 2 -layout "C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf" -` | MiKTeX registry/AppData access denied | -1073740791 |
| DesignCraft command discovery | `Get-Command designcraft,designcraft.exe` | No command returned | 0 |
| App package discovery | `Get-AppxPackage -Name '*DesignCraft*'` | Access denied; package status UNKNOWN | Access denied |
| Candidate carry-forward copy | Python `shutil.copyfile`; compare SHA-256 | Byte-identical to prior candidate, hash `e6705174a7841aed1534c804438dc3edb6ca05c69698c9ddc63116b8b8601219` | 0 |

## Validation boundary

The prior original-PDF image inspected is `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-FINAL-QA-001\review-2026-11-16\exports\brand-page-02.png` (827 × 1170 px; SHA-256 `e7276caa6184f3273bd15dcddf33dc08604fb0e0178e377e55df6dc38960a451`). It is original-PDF evidence, not candidate output evidence.

No candidate PDF exists. Consequently candidate page count/dimensions, PDF font embedding, page-2 extraction, screenshot, Arabic shaping, and unchanged-other-pages visual comparison are **NOT VERIFIED**. The task's PASS criteria are not met.
