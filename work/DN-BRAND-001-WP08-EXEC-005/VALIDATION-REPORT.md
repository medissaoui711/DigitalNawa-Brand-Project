# Validation Report — WP08 EXEC-005

## Command and result

Command used the bundled Python executable with `python-docx 1.2.0`, Python `zipfile`, and `xml.etree.ElementTree`; it opened each DOCX, ran `ZipFile.testzip()`, parsed all `.xml` and `.rels` entries, inspected document text, relationships, page dimensions, and direction/language metadata. Console output was configured UTF-8 to preserve Arabic. **stdout:** see per-file results below. **stderr:** empty. **exit code:** `0`.

An initial invocation without UTF-8 stdout failed while encoding Arabic text to the CP1252 console (`UnicodeEncodeError`; exit code `1`). No file operation occurred in that failed invocation. Rerun with UTF-8 succeeded; the failure was an output encoding issue.

## Per-file results

| File | Bytes | SHA-256 | ZIP/XML | python-docx | Structure and content | Direction metadata |
|---|---:|---|---|---|---|---|
| `digital-business-card-bi.candidate.docx` | 37,898 | `27447086b92a8833204ede55688bf5cac4b2a4e36d891484730b0c9478f866f4` | `testzip=None`; 17 XML/relationship parts parsed | Open/read PASS | one table; A4 210.01 × 297.00 mm; exact nonempty source text: “Digital card · bilingual presentation”, `[Your name]`, `Founder · DigitalNawa`, `[email]`, `[website]`, and source placeholder instruction | `en-US`; no `ar-SA` in text metadata |
| `professional-contact-card.candidate.docx` | 38,042 | `4409f28f34106342f57a6c740c2e27824141d2a342f10c8bfb1fcdf0bf7ffedc` | `testzip=None`; 17 XML/relationship parts parsed | Open/read PASS | one table; A4 210.01 × 297.00 mm; exact nonempty source text includes `[الاسم]`, `مؤسس ديجيتال نواة`, `[البريد الإلكتروني]`, `[الموقع الإلكتروني]`, and source instruction about directional isolation | `ar-SA` and `en-US`; 7 bidi paragraph markers and 6 RTL run markers in document XML |

For both: no external relationships (`TargetMode="External"` absent), no `word/media/` entries, no font embedding, and no PDF generation. The authored color values are the unchanged approved brand values `0EA5A4`, `1C1917`, `78716C`, `FEF3C7`.

## Visual and semantic limits

Structural XML validation does not establish visual quality, Arabic shaping, correct visual RTL order, accessibility, or production readiness. Word was identified as installed in the environment inventory but was not running or opened for this execution, so visual rendering and screenshots are NOT VERIFIED. The “bilingual” registry entry’s specimen is English-only, and the digital-card export is responsive CSS rather than a fixed A4 document; both are coverage/specification limitations.

## Production isolation

Only the two new isolated DOCX candidates and task reports/index/checksum were written in the EXEC-005 directory. Prior candidate files and production/source files were not modified. No packages were installed; no network, Git, PDF, or integration operation was performed.
