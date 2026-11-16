# Delivery Exceptions

| ID | Severity/status evidence | Impact | Required future action | Owner decision? |
|---|---|---|---|---|
| PDF-AR-02 | High; original page-2 glyph defect confirmed by prior image; remediation BLOCKED; cause UNKNOWN. | PDF is not corrected. | Supported DesignCraft export; inspect fonts/text; visually verify page 2 and all pages. | Tool task; font choice may be owner-controlled. |
| WP07-VISUAL | BLOCKED | Responsive screenshots unavailable. | Approved browser review at specified viewports. | No unless redesign arises. |
| WP07-RTL | NOT VERIFIED | Arabic shaping/bidi unproven. | Actual rendered Arabic review. | Font choice owner; QA technical. |
| ACCESSIBILITY | NEEDS MORE EVIDENCE | Static checks do not establish full WCAG or keyboard/focus behavior. | Review real pairings and keyboard/focus. | Functional colors owner-controlled. |
| WP08-PARTIAL | 4 PARTIAL: business-card-front-en, business-card-back-ar, letterhead-ar, presentation-closing-bi | Not complete deliverables. | Complete after required dependencies and QA. | Logo/contact/print as applicable. |
| WP08-SLIDE-EXPORT | SVG/PNG exports absent | PPTX source does not fulfill export outputs. | Confirm scope and use trusted renderer. | If registry scope changes, yes. |
| WP08-AR-ALIGN | NEEDS MORE EVIDENCE | Arabic document layout unresolved. | Actual Word rendering. | Technical QA unless design choice needed. |
| PRINT | NOT VERIFIED | Print readiness unsupported. | Obtain provider/profile/bleed/output specs and validate. | Yes. |
| LOGO | OWNER DECISION REQUIRED | Clear-space/minimum-size/reference conflict unresolved. | Select candidate and authoritative rules. | Yes. |
| TYPE/COLORS | PROVISIONAL | Fonts and semantic colors are not production-final. | Owner decisions, then technical verification. | Yes. |
| ACCEPTANCE | NOT RECORDED | Candidate-only. | Separate owner acceptance and production authorization. | Yes. |

No exception was marked fixed or reclassified by packaging.
