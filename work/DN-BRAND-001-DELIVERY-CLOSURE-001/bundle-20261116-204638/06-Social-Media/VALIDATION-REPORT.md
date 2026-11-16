# Validation Report — WP07 EXEC-003

## Commands and exit codes

- Copy/provenance command: PowerShell here-string piped to Python; byte-copy source assets, calculate SHA-256, compare each source/output. **Exit 0; 17 files copied.**
- Consolidation command: PowerShell here-string piped to Python; `json`, `HTMLParser`, `lxml.etree`, `tinycss2`, `hashlib`. **Exit 0; stdout below; stderr empty.**
- Input checksum inventories: Python parses source `SHA256SUMS.txt` and verifies actual file hashes. Remediation-001: **24 entries, 0 mismatch**; VQA-001: **6 entries, 0 mismatch**; Remediation-002: **8 entries, 0 mismatch**. Inventory check **exit 0**.
- Final output checksum check: SHA-256 inventory and JSON index verified after report creation. **Exit 0**.

### Full consolidation validator stdout

```text
WP07_EXEC003_CONSOLIDATION_VALIDATION
PASS assets/logo-lockups.candidate/horizontal-bi-ar-primary/dark-background-reverse.svg bytes=1442 sha256=7d0a90ea442f1049598abdee5190042ad8c3601f5db65dc89204d0d88ffc47be
PASS assets/logo-lockups.candidate/horizontal-bi-ar-primary/full-color.svg bytes=1429 sha256=82a7b2f2da659bbd217ecfb39e468b9d8ff6a0e06df7300c30c929f70e63fade
PASS assets/logo-lockups.candidate/horizontal-bi-en-primary/dark-background-reverse.svg bytes=1423 sha256=1f9163c5725003f4832f068810b8f5eb9833cd600b307fd774e2d5d7da8fa7e1
PASS assets/logo-lockups.candidate/horizontal-bi-en-primary/full-color.svg bytes=1410 sha256=befae41f813448f82967d74e4674df7f17f74c833f86f449c15c4ce902a0c51a
PASS assets/logo-lockups.candidate/horizontal-en-open/full-color.svg bytes=1148 sha256=86b38c6a55cd22ccc6b809dc5c21d263ac5067cb7b1be95a3e68b9df7f9eed3b
PASS assets/logo-lockups.candidate/horizontal-en-open/monochrome-dark.svg bytes=1153 sha256=5211b50b5317c9b9bf40884cfa6e788c36d288e2a85ca7055f3e492802c05ccf
PASS assets/logo-lockups.candidate/symbol-only/dark-background-reverse.svg bytes=983 sha256=4372906bc1615122b6685ae8e29e96be60085c7cf40d9b443b0e6e600580432f
PASS assets/logo-lockups.candidate/symbol-only/light-background.svg bytes=976 sha256=981fe7feb79d1caf03a47366447f7ae6051adac572258a93538c17d71b350df5
PASS assets/logo-lockups.candidate/symbol-only/monochrome-dark.svg bytes=975 sha256=5616565263b3b62c679390202d4fb3d8964896e75240d707aba57760ccbaf3fb
PASS dependencies/component-library.candidate.css bytes=9171 sha256=9393443a0c5c5a3797a0893875f69e699c1e4e5271aa597f82761d2963fcce2b
PASS dependencies/design-tokens.candidate-v2.css bytes=5414 sha256=c379f491556f2d1879c2d32213b1f557447fde7aa7285202b378b99eb5c850c0
PASS dependencies/typography-tokens.candidate.css bytes=4299 sha256=07bb085f4e6971432a3ea9da6c1873069636b43437d9bbb6efb64f1e8cc66ef2
PASS social-format-registry.candidate.json bytes=4956 sha256=b5c4427c6fcb764c3eba1668b4bb8a8c0345ae46a9dbb5268a669def72388f8b
PASS social-identity-system.css bytes=7977 sha256=d1aa1ee815c17e92c09ef1dfb019c2a7c6a331c00db7108345b21b75ace25600
PASS social-media-specimen.html bytes=17022 sha256=ccfce3856e3faa57d01c1eef9bb689a97bf66cf2853689cb2715879d448d6f5e
PASS social-media-templates.html bytes=5599 sha256=87c617e7ca71c8bdc149aa8439c7106542954c231ffd9867af28c28cb938c228
PASS social-template-index.candidate.json bytes=27315 sha256=215e962f693122d8de624c6d5b3e8ff763e9bd41358d5fc431441007513d4ae3
REGISTRY 33 IDs unique; NOT_IMPLEMENTED=13; exact status JSON copy PASS
PASS HTML social-media-specimen.html localRefs=15 missing=0
PASS HTML social-media-templates.html localRefs=1 missing=0
SVG_XML_PASS 9
CSS tinycss2 files=4 syntaxErrors=0 imports=3 unresolvedImports=0 refs=119 unresolvedVariables=0 PASS
CSS_DIFF_MATCH insertion_bytes=122 output_equals_remediation2=True PASS
CONTRAST before 1.1397:1 after 13.7799:1 light 16.6285:1
MAIN_CSS_SHA256 d1aa1ee815c17e92c09ef1dfb019c2a7c6a331c00db7108345b21b75ace25600
CONSOLIDATION_VALIDATION_EXIT=0
```

## Specific integrity findings

- 17 expected active files; no unexpected or missing candidate assets. Unique active paths: 17.
- Primary template index: 33 IDs; 33 unique; 13 `NOT IMPLEMENTED`, unchanged from source JSON bytes.
- Two HTML files: all 16 local references resolved (15 in specimen, 1 in templates); no browser rendering performed.
- Nine SVG files parsed as XML. Two JSON files parsed and preserved byte-identically.
- Four CSS files parsed with already-installed `tinycss2`: no syntax/declaration errors; all 3 `@import` paths resolve; 119 referenced custom properties and no unresolved references.
- Three imported CSS dependencies are byte-identical to Remediation-001 and Remediation-002 copies.
- Main CSS output: 7,977 bytes; SHA-256 `d1aa1ee815c17e92c09ef1dfb019c2a7c6a331c00db7108345b21b75ace25600`. Original CSS: 7,855 bytes; SHA-256 `a9dbf67761e9dbb315b8f083ccb7e1cfced2d09ef0d2313aed89bab8811a2443`. Candidate is exactly original bytes plus one 122-byte rule insertion.
- The output manifest lists size, source path/task and SHA-256 for every active candidate. `SHA256SUMS.txt` covers every output except itself.

## Status boundaries

`STATIC_VALIDATED` describes static file/registry/reference checks only. `STATIC_REMEDIATION_APPLIED` describes the `.art-paper` CSS override only. The VQA report remains `VISUAL_QA_BLOCKED`; the screenshots inventory has zero images. `RTL_SHAPING_NOT_VERIFIED` and `WCAG_FULL_CONFORMANCE_NOT_VERIFIED` remain explicit. Thirteen entries remain `NOT IMPLEMENTED`. No visual correction, Arabic shaping, responsive rendering, or full accessibility conformance is claimed.
