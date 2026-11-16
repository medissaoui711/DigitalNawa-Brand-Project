# Integrity Report

- Source-derived copied files: 288; SHA-256 matches 288; mismatches 0.
- Local relative HTML/CSS links/imports: 116 checked; unresolved 0; external links were not fetched.
- Missing/blocked expected output: one corrected PDF; PDF-REMEDIATION-001 is BLOCKED.
- Intentional exclusions: 11 (WP02 V1 ×2; WP08 archived alternatives ×8; operational `_build-status.json` ×1).
- WP06 aliases are byte-identical files that preserve existing relative references; not separate versions. Manifest paths are unique.
- WP02 has no source checksum inventory; current V2 bytes are directly hashed.
- Original PDF and DesignCraft source are historical reference copies only.

## Commands / exit codes

- PowerShell source listing and `Test-Path`: exit 0.
- Python source-to-package size/SHA-256 copy check: exit 0; 288/288 match.
- Python WP07/WP08 JSON parse/status/count inspection: exit 0.
- Python HTMLParser/CSS local-reference resolution: exit 0; 116 resolved, no network access.
- Final manifest uniqueness/file existence and SHA256SUMS validation: exit 0; 294 package files covered (all except the root SHA256SUMS.txt itself).

All new files are under `C:\Users\DELL\Documents\Codex\DigitalNawa-Brand-Project\work\DN-BRAND-001-DELIVERY-CLOSURE-001\bundle-20261116-204638`; source and production files were not modified.
