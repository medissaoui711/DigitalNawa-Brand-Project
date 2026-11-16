# Owner Decisions & Release Dependencies Register

| Item | Classification | Current evidence/status | What remains |
|---|---|---|---|
| Brand model, positioning/tagline, symbol concept and initial architecture | `NON_BLOCKING` for this audit; previously recorded approval only within scope | Local DN-GOV-001 status is draft/pending according to WP05 source register; preserve documented project decisions without extending approval scope. | Do not reopen absent conflict; formal governance provenance remains subject to owner register approval. |
| Select final logo candidate / bilingual hierarchy / geometry | `OWNER_DECISION_REQUIRED` | WP04 package is provisional; no final variant selected. | Owner selects final candidate after reference/geometry review. |
| Resolve clear-space conflict | `OWNER_DECISION_REQUIRED` | Foundation quarter-height rule conflicts with provisional 19-unit guidance. | Define measurement basis, scope and authoritative rule. |
| Final English/Arabic/technical fonts and licensing/embedding | `OWNER_DECISION_REQUIRED` | WP03 choices provisional; no fonts embedded. | Select families/weights and approve licensing/embedding and fallback policy. |
| Final functional semantic colors | `OWNER_DECISION_REQUIRED` | WP02 functional states provisional; no final owner values provided. | Provide/approve semantic state pairs and focus colors after contrast validation. |
| PDF page 2 glyph repair | `TECHNICAL_DEFECT` + `TOOL_DEPENDENCY` | Replacement glyphs observed; source/export cause not isolated; DesignCraft verified export route unavailable in prior remediation. | Supported editor/export route and final rendered verification; no source patch invented. |
| Missing WP08 presentation SVG/PNG exports | `TOOL_DEPENDENCY` + possible `OWNER_DECISION_REQUIRED` | Editable PPTX active; export registry asks for SVG/PNG. | Supply verified export tooling or owner confirms PPTX-only scope. |
| Print production specs | `OWNER_DECISION_REQUIRED` | No authoritative printer/provider, bleed, profile/DPI or output specs. | Define requirements before print-readiness claim. |
| Bilingual contact-card copy/details | `OWNER_DECISION_REQUIRED` | Placeholders and provisional copy remain. | Supply owner-approved names, role, contact data and language copy. |
| WP08 four partial IDs | `TECHNICAL_DEFECT`/`OWNER_DECISION_REQUIRED` per omitted component | IDs: `business-card-front-en`, `business-card-back-ar`, `letterhead-ar`, `presentation-closing-bi` | Review the four `PARTIAL` records individually; missing pieces depend on logo choice, print specs, contacts and RTL QA. |
| Persisted visual screenshots / responsive QA | `TOOL_DEPENDENCY` + `QA_REQUIRED` | Prior visual capture blocked/unreliable. | Safe approved application/browser capture path. |
| Formal owner acceptance and production authorization | `OWNER_DECISION_REQUIRED` | No acceptance evidence in inspected candidate packages; all remain provisional. | Separate owner approval after release gates pass. |

**Evidence:** The four partial IDs were read directly from WP08 EXEC-010 `CANDIDATE-STATUS-REGISTER.json`: `business-card-front-en`, `business-card-back-ar`, `letterhead-ar`, `presentation-closing-bi`.
