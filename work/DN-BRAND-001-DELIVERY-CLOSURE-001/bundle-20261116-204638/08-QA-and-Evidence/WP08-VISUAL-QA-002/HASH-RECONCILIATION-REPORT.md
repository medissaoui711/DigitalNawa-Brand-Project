# Hash Reconciliation Report

## Arabic candidate DOCX

**Path:** `work\DN-BRAND-001-WP08-EXEC-002\proposal-page-ar.candidate.docx`  
**Size:** 38,285 bytes  
**Recomputed SHA-256:** `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2`

| Evidence | Recorded value | Result |
|---|---|---|
| `EXECUTION-REPORT.md` deliverable table | `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d9f2ab2ef5e0a2` | Disagrees with actual hash; one character is wrong: the reported substring is `...e7386d9f2...`, actual substring is `...e7386d69f2...`. |
| `DELIVERABLE-INDEX.json` | `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2` | Matches recomputed hash. |
| `SHA256SUMS.txt` | `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2` | Matches recomputed hash. |
| Current `Get-FileHash -Algorithm SHA256` | `1fbd26ea41657385c28f543a12223923feb1ce617434e7386d69f2ab2ef5e0a2` | Recalculated value; authoritative for current bytes. |

**Conclusion:** The original execution report contains a transcription/reporting error. The candidate file was not modified to reconcile the mismatch. The deliverable index and checksum inventory agree with current bytes.

## Other inputs

Recomputed values for the English DOCX and PPTX are recorded in `SHA256SUMS.txt`; both match the prior checksum inventory and deliverable index.
