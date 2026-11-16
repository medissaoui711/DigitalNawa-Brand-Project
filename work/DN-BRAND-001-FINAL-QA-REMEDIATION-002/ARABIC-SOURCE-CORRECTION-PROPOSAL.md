# Arabic Source Correction Proposal

**Status: Proposed patch only; NOT applied.**  
**Reason:** DesignCraft's per-run language/direction schema is not established by the available source, and no supported local DesignCraft editor/exporter is available to validate a copied source. The PDF also has a separate missing-glyph failure.

## Target
Source: DigitalNawa/03-Logo-Assets/09-Documentation/digitalnawa-brand-identity.designcraft  
document.json -> stories["44"], frames [43]. Current story direction is leftToRight and the text is one 240-character [None] run.

## Minimal semantic change
1. Keep the containing English story and paragraphs leftToRight.
2. Keep paragraphs 2-4 unchanged.
3. In the first line, preserve the English run “DigitalNawa — ” as lang=en, dir=ltr.
4. Isolate only “ديجيتال نواة” as lang=ar, dir=rtl, with bidi isolation if the supported editor offers it.
5. Keep the Arabic name visually after the em dash in the English-first line; do not reverse the complete story or insert untested direction-control characters.
6. If DesignCraft cannot express an RTL inline run, use a separately configured Arabic text object/frame within the same first-line composition, retaining the English story LTR.
7. Assign no font in this proposal. Resolve Arabic glyph coverage, shaping and embedding rights in a supported editor after a font is selected and verified. Do not use the restricted-embedding Windows fonts inspected in remediation-001.

Conceptual before/after (not literal DesignCraft JSON):

Before: one LTR story/run: [DigitalNawa — ديجيتال نواة] + English paragraphs.

After: LTR English context [DigitalNawa — ] + isolated Arabic RTL run [ديجيتال نواة]; English paragraphs remain unchanged/LTR.

No minimal source diff is claimed because the native model's RTL run representation is not documented in the local source. Do not patch proprietary JSON by inventing field names. Validate in the actual DesignCraft editor; inspect Arabic joining, punctuation and ordering, then export and inspect the embedded-font list and PDF render.
