# PDF Export Capability

**Conclusion: No locally verified, safe path to regenerate this DesignCraft PDF.**

## Available tools
| Tool | Availability/evidence | Capability/boundary |
|---|---|---|
| pdfinfo.exe | Codex Poppler runtime; prior run exit 0 | Reads existing PDF metadata only. |
| pdftoppm.exe | Codex Poppler runtime; prior run exit 0 | Rasterizes existing PDF; not a source-document exporter. |
| pdftocairo.exe | MiKTeX path found | Not tested; MiKTeX tools previously fail initialization due registry/AppData access. It cannot read DesignCraft source. |
| pdffonts.exe / pdftotext.exe | MiKTeX path; previous exit -1073740791 | Failed due access denied to registry/AppData; no reliable font/extraction evidence. |
| DesignCraft 0.20.1 | Named in source/PDF metadata; no designcraft command found | Native source exists, but no supported local editor/export route established. |
| WeasyPrint 68.1 | Installed Python module; Python capability query exit 0 | Can be used for HTML, but the actual 12-page authoring source is .designcraft, not HTML. It cannot faithfully reopen this source. Not used. |
| Project dependencies | package.json inspected; no PDF exporter dependency; project node_modules absent | React/Vite project dependencies do not author this DesignCraft document. |
| Browser automation | Playwright/Selenium absent; browser local-file route previously blocked | No browser/PDF workaround used. |

## Font evidence
The DesignCraft archive contains no font binary. A source narrative says Source Serif 4 is bundled and lists fsType=0/restrictedLicence=false, but that font catalog/font bytes are unavailable for independent Arabic-cmap or export verification. Four installed Windows fonts were inspected with fontTools; each has tested basic Arabic/diacritic cmap entries but reports OS/2 fsType=8 (restricted embedding). Do not embed them. Presence and cmap coverage do not establish licensing or Arabic shaping.

Evidence hashes:
- Source PDF: 33c2135aebb7176d1266ee84f35249ac9d21c0eabc955d3e0a36c8132d70e19b.
- DesignCraft source: 918b8ac57e80e882aca599113d88e7c34891ca1d68399135ed64f4cd0206154f.
- Arial C:\Windows\Fonts\arial.ttf (1,045,956 bytes): edfbd22a3d088fc2f5d7c79b8c9c732df6dc878a60f0a80be0f92a3c7a634404.
- Tahoma C:\Windows\Fonts\tahoma.ttf (919,260 bytes): 9af03d4ad44a3b413d92f7de48b94aa7cc8a1471a75d498406eae837f62ee1d1.
- Segoe UI C:\Windows\Fonts\segoeui.ttf (960,076 bytes): 704eada12961a27fd271f7d3b09e2066520e758390c1776744eff430fee30f6e.
- Calibri C:\Windows\Fonts\calibri.ttf (1,650,632 bytes): 57e93ff143572bcc092c1f56202d43ddc07bb119aa104c6d7af163470fb551f6.

## Result
Arabic shaping was not validated. No candidate PDF generated. A safe next step requires opening a copy of the .designcraft in the supported DesignCraft editor, applying a scoped RTL Arabic run and approved/glyph-tested font, then exporting and checking visual shaping, font embedding and tagged-PDF status. No claim of print readiness or WCAG/PDF-UA conformance.
