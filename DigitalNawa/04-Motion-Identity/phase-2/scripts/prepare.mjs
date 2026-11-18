import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const motionRoot = resolve(project, "..");
const brandRoot = resolve(project, "..", "..");
const tokenPath = resolve(motionRoot, "brand-tokens.json");
const logoPath = resolve(brandRoot, "03-Logo-Assets/02-Master/dn-symbol-master.svg");
const templatePath = resolve(project, "templates/composition.html.in");
const sourceCss = resolve(project, "src/styles.css");
const sourceJs = resolve(project, "src/composition.js");
const tokensBytes = await readFile(tokenPath);
const tokens = JSON.parse(tokensBytes.toString("utf8"));
const allowed = new Set(tokens.statusEnum);
if (allowed.size !== 3 || ["approved", "candidate", "unverified"].some((s) => !allowed.has(s))) throw new Error("Invalid status vocabulary.");
function walk(node, path = "tokens") {
  if (node && typeof node === "object" && !Array.isArray(node) && Object.hasOwn(node, "value")) {
    if (!allowed.has(node.status)) throw new Error(`Invalid status at ${path}`);
    if (typeof node.source !== "string" || !node.source.trim()) throw new Error(`Missing provenance at ${path}`);
    return;
  }
  if (node && typeof node === "object") for (const [key, child] of Object.entries(node)) walk(child, `${path}.${key}`);
}
walk(tokens.tokens);
const logoBytes = await readFile(logoPath);
const logoText = logoBytes.toString("utf8");
if (!logoText.includes("<svg") || !/viewBox="[^"]+"/.test(logoText)) throw new Error("Canonical SVG is not a valid source reference.");
const gsapPath = resolve(project, "node_modules/gsap/dist/gsap.min.js");
const easePath = resolve(project, "node_modules/gsap/dist/CustomEase.min.js");
const [gsapBytes, easeBytes, template, css, controller] = await Promise.all([
  readFile(gsapPath), readFile(easePath), readFile(templatePath, "utf8"), readFile(sourceCss, "utf8"), readFile(sourceJs, "utf8")
]);
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const formats = ["vertical", "square", "landscape"];
for (const format of formats) {
  const [width, height] = tokens.tokens.output[format].value.split("x").map(Number);
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) throw new Error(`Invalid output dimensions for ${format}`);
  const folder = resolve(project, "compositions", format);
  await Promise.all(["assets", "runtime", "vendor", "renders"].map((name) => mkdir(resolve(folder, name), { recursive: true })));
  await Promise.all([
    copyFile(logoPath, resolve(folder, "assets/dn-symbol-master.svg")),
    writeFile(resolve(folder, "runtime/brand-tokens.js"), `window.DN_MOTION_TOKENS = Object.freeze(${JSON.stringify(tokens)});\n`),
    copyFile(resolve(project, "node_modules/gsap/dist/gsap.min.js"), resolve(folder, "vendor/gsap.min.js")),
    copyFile(resolve(project, "node_modules/gsap/dist/CustomEase.min.js"), resolve(folder, "vendor/CustomEase.min.js")),
    writeFile(resolve(folder, "styles.css"), css),
    writeFile(resolve(folder, "composition.js"), controller)
  ]);
  const html = template
    .replaceAll("{{WIDTH}}", String(width))
    .replaceAll("{{HEIGHT}}", String(height))
    .replaceAll("{{DURATION}}", String(tokens.tokens.motion.durationSeconds.value))
    .replaceAll("{{FORMAT}}", format)
    .replaceAll("{{COMPOSITION_ID}}", `dn-motion-${format}`);
  await writeFile(resolve(folder, "index.html"), html);
  await writeFile(resolve(folder, "source-manifest.json"), JSON.stringify({
    format, width, height,
    tokenSha256: sha(tokensBytes),
    logoSource: "DigitalNawa/03-Logo-Assets/02-Master/dn-symbol-master.svg",
    logoSha256: sha(logoBytes),
    gsapSha256: sha(gsapBytes),
    customEaseSha256: sha(easeBytes)
  }, null, 2) + "\n");
}
await copyFile(resolve(project, "compositions/landscape/index.html"), resolve(project, "index.html"));
console.log("Prepared 3 isolated HyperFrames projects from brand-tokens.json.");
