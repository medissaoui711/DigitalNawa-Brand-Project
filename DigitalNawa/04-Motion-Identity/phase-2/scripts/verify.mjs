import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(await readFile(resolve(project, "..", "brand-tokens.json"), "utf8"));
const allowed = new Set(tokens.statusEnum);
const errors = [];
let count = 0;
function walk(node, path = "tokens") {
  if (node && typeof node === "object" && !Array.isArray(node) && Object.hasOwn(node, "value")) {
    count += 1;
    if (!allowed.has(node.status)) errors.push(`${path}: invalid status`);
    if (typeof node.source !== "string" || !node.source.trim()) errors.push(`${path}: missing provenance`);
    return;
  }
  if (node && typeof node === "object") for (const [key, child] of Object.entries(node)) walk(child, `${path}.${key}`);
}
walk(tokens.tokens);
for (const format of ["vertical", "square", "landscape"]) {
  const folder = resolve(project, "compositions", format);
  for (const file of ["index.html", "styles.css", "composition.js", "assets/dn-symbol-master.svg", "runtime/brand-tokens.js", "vendor/gsap.min.js", "vendor/CustomEase.min.js"]) {
    try { await access(resolve(folder, file)); } catch { errors.push(`Missing ${format}/${file}; run npm run prepare:assets`); }
  }
  const html = await readFile(resolve(folder, "index.html"), "utf8").catch(() => "");
  if (!html.includes(`data-composition-id="dn-motion-${format}"`)) errors.push(`${format}: composition id mismatch`);
  if (!html.includes('data-width=') || !html.includes('data-height=')) errors.push(`${format}: missing dimensions`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`PASS: ${count} token values have allowed status/provenance; three isolated HyperFrames projects are complete.`);
