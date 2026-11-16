# PDF Metadata Report

## Actual PDF location and integrity

- **OBSERVED:** Task-stated path under `09-Documentation` does not exist.
- **VALIDATED actual file:** `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf`; 44119 bytes; SHA-256 `33c2135aebb7176d1266ee84f35249ac9d21c0eabc955d3e0a36c8132d70e19b`.
- `pdfinfo` command: `pdfinfo "C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf"`; exit `0`.

## `pdfinfo` stdout

```text
Title: DigitalNawa Brand Identity
Author: DigitalNawa
Creator: DesignCraft
Producer: DesignCraft
CreationDate: Thu Nov 12 11:40:48 2026 Arab Standard Time
ModDate: Thu Nov 12 11:40:48 2026 Arab Standard Time
Custom Metadata: no
Metadata Stream: yes
Tagged: yes
UserProperties: no
Suspects: no
Form: none
JavaScript: no
Pages: 12
Encrypted: no
Page size: 595.276 x 841.89 pts (A4)
Page rot: 0
File size: 44119 bytes
Optimized: no
PDF version: 1.7
```

## Font and page-text extraction tools

- `pdffonts "C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf"`: exit `-1073740791`; stderr/log contains `Access is denied`, `RegOpenKeyExW`, result 5, MiKTeX registry key `Software\MiKTeX.org\MiKTeX\2.9\Core`. No font list was returned.
- `pdftotext -f 2 -l 2 -layout "C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\DigitalNawa\03-Logo-Assets\06-Exports\digitalnawa-brand-identity.pdf" -`: exit `-1073740791`; stderr/log reports access denied to MiKTeX registry keys and `%AppData%\MiKTeX\2.9`. No PDF text extraction was returned.
- Available Python modules `pypdf`, `pdfplumber`, `fitz`: not installed/available; not installed as part of this task.

**NOT VERIFIED:** embedded font names, embedding flags, ToUnicode map quality, Arabic glyph coverage, page-2 logical text, and PDF text direction. Metadata confirms tagged PDF, not correct Arabic output.
