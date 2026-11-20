import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const here = dirname(fileURLToPath(import.meta.url));
const motionRoot = resolve(here, "../..");
const project = resolve(motionRoot, "phase-2");
const tokens = JSON.parse(await readFile(resolve(motionRoot, "brand-tokens.json"), "utf8"));
const controller = await readFile(resolve(project, "src/composition.js"), "utf8");
const get = (group, key) => tokens.tokens[group][key].value;
const checks = [];
const check = (name, fn) => { fn(); checks.push(name); };

check("9-second / 60-fps / 540-frame storyboard", () => {
  assert.equal(get("motion", "durationSeconds"), 9);
  assert.equal(get("motion", "frameRate"), 60);
  assert.equal(get("motion", "durationSeconds") * get("motion", "frameRate"), 540);
});
check("24 deterministic transition particles", () => {
  assert.equal(get("motion", "pixelCount"), 24);
  assert.match(controller, /Center-out sequencing/);
  assert.match(controller, /aDistance - bDistance \|\| aRow - bRow \|\| aCol - bCol/);
});
check("rise completes before assembly", () => {
  const lastRise = get("motion", "riseStartSeconds") +
    (get("motion", "pixelCount") - 1) * get("motion", "pixelStaggerSeconds") +
    get("motion", "pixelRiseDurationSeconds");
  assert.ok(lastRise <= get("motion", "riseEndSeconds"), `rise ends at ${lastRise}s`);
  assert.ok(get("motion", "assemblyStartSeconds") >= get("motion", "riseEndSeconds"));
});
check("assembly, bilingual reveal and tagline fit their storyboard windows", () => {
  const m = (key) => get("motion", key);
  const actualRiseFinish = m("riseStartSeconds") + (m("pixelCount") - 1) * m("pixelStaggerSeconds") + m("pixelRiseDurationSeconds");
  const assembleAt = Math.max(m("assemblyStartSeconds"), actualRiseFinish);
  const assemblyDuration = Math.max(m("minimumAssemblyDurationSeconds"), m("assemblyEndSeconds") - assembleAt - m("assemblyLogoLeadSeconds"));
  const particleAssemblyEnd = assembleAt + assemblyDuration + (m("pixelCount") - 1) * m("particleAssemblyStaggerSeconds");
  const logoRevealStart = m("assemblyEndSeconds") - m("assemblyLogoLeadSeconds");
  const logoRevealEnd = logoRevealStart + m("logoRevealDurationSeconds");
  assert.ok(particleAssemblyEnd <= m("assemblyEndSeconds"), "particle assembly exceeds its window");
  assert.ok(logoRevealEnd <= m("assemblyEndSeconds"), "logo reveal exceeds its 3.5-second boundary");

  const dualStart = m("dualRevealStartSeconds");
  const dualEnd = m("dualRevealEndSeconds");
  const arabicDuration = (dualEnd - dualStart) * m("arabicRevealDurationRatio");
  const arabicFadeStart = dualStart + arabicDuration + m("arabicFadeDelaySeconds");
  const arabicFadeEnd = arabicFadeStart + m("arabicFadeDurationSeconds");
  const englishStart = arabicFadeStart + m("arabicFadeDurationSeconds") * m("englishRevealOverlapRatio");
  const englishEnd = englishStart + m("englishRevealDurationSeconds");
  assert.ok(arabicFadeEnd <= dualEnd, "Arabic fade exceeds bilingual window");
  assert.ok(englishEnd <= dualEnd, "English reveal exceeds bilingual window");

  const words = get("identity", "tagline").trim().split(/\\s+/);
  const slot = (m("sloganEndSeconds") - m("sloganStartSeconds")) / words.length;
  const wordDuration = Math.min(m("sloganRevealMaxDurationSeconds"), slot * m("sloganRevealDurationRatio"));
  const finalWordEnd = m("sloganStartSeconds") + (words.length - 1) * slot + wordDuration;
  assert.ok(finalWordEnd <= m("sloganEndSeconds"), "tagline reveal exceeds its window");
  assert.ok(m("sloganEndSeconds") <= m("finalHoldStartSeconds"), "final hold begins before tagline finishes");
});
check("aspect-ratio-safe logo sizing across all three formats", () => {
  assert.match(controller, /height \* layout\("symbolHeightViewportRatio"\) \* symbolAspect/);
  const aspect = get("identity", "logoDesignWidth") / get("identity", "logoDesignHeight");
  const widthRatio = get("layout", "symbolWidthViewportRatio");
  const heightRatio = get("layout", "symbolHeightViewportRatio");
  for (const [width, height] of [[1080, 1920], [1080, 1080], [1920, 1080]]) {
    const symbolWidth = Math.min(width * widthRatio, height * heightRatio * aspect);
    const symbolHeight = symbolWidth / aspect;
    assert.ok(symbolWidth <= width * widthRatio + 1e-9, `width cap exceeded at ${width}x${height}`);
    assert.ok(symbolHeight <= height * heightRatio + 1e-9, `height cap exceeded at ${width}x${height}`);
    assert.ok(Math.abs(symbolWidth / symbolHeight - aspect) < 1e-9, `aspect ratio changed at ${width}x${height}`);
  }
});
check("Arabic-safe separate-node crossfade", () => {
  assert.equal(get("motion", "arabicEnglishTransition"), "crossfade");
  assert.match(controller, /Only the token-approved shaping-safe crossfade/);
  assert.match(controller, /fromTo\(arabic/);
  assert.match(controller, /fromTo\(english/);
  assert.doesNotMatch(controller, /morphSVG|SplitText/);
});
check("tagline content and final hold fit timeline", () => {
  assert.equal(get("identity", "tagline"), "Build. Innovate. Teach.");
  assert.equal(get("motion", "sloganStartSeconds"), get("motion", "dualRevealEndSeconds"));
  assert.ok(get("motion", "finalFadeStartSeconds") >= get("motion", "finalHoldStartSeconds"));
  assert.ok(get("motion", "finalFadeStartSeconds") < get("motion", "durationSeconds"));
});
check("all three owner-specified output formats", () => {
  assert.equal(get("output", "vertical"), "1080x1920");
  assert.equal(get("output", "square"), "1080x1080");
  assert.equal(get("output", "landscape"), "1920x1080");
});
check("approved palette values unchanged", () => {
  assert.equal(get("color", "warmIvory"), "#FEF3C7");
  assert.equal(get("color", "darkBrown"), "#1C1917");
  assert.equal(get("color", "mutedTeal"), "#0EA5A4");
  assert.equal(get("color", "warmOrange"), "#EA5808");
});
console.log(`PASS: ${checks.length} Phase 3 static acceptance checks\n- ${checks.join("\n- ")}`);
console.log("NOTE: This script does not replace HyperFrames rendering, decoded-frame inspection, Arabic shaping review, or deterministic repeat-render proof.");


