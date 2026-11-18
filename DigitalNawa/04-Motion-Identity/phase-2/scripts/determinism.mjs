import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repo = resolve(project, "..", "..", "..");
const tokensBytes = await readFile(resolve(project, "..", "brand-tokens.json"));
const tokens = JSON.parse(tokensBytes.toString("utf8"));
const pkg = JSON.parse(await readFile(resolve(project, "package.json"), "utf8"));
const bin = resolve(project, "node_modules", ".bin", process.platform === "win32" ? "hyperframes.cmd" : "hyperframes");
const sha = (b) => createHash("sha256").update(b).digest("hex");
function run(command, args, cwd) {
  const r = spawnSync(command, args, { cwd, encoding: "utf8", shell: process.platform === "win32" });
  if (r.error) throw r.error;
  if (r.status !== 0) throw new Error(r.stderr || `${command} failed`);
  return r.stdout;
}
const ffmpegVersion = run("ffmpeg", ["-version"], project).split("\n")[0];
const dockerVersion = run("docker", ["--version"], project).trim();
let sourceCommit = "unknown";
try { sourceCommit = run("git", ["rev-parse", "HEAD"], repo).trim(); } catch {}
const report = {
  renderer: { hyperframes: pkg.devDependencies.hyperframes, gsap: pkg.devDependencies.gsap },
  runtime: { node: process.version, platform: process.platform, arch: process.arch, ffmpeg: ffmpegVersion, docker: dockerVersion },
  sourceCommit,
  tokenSha256: sha(tokensBytes),
  outputs: []
};
for (const format of ["vertical", "square", "landscape"]) {
  const folder = resolve(project, "compositions", format);
  const manifest = JSON.parse(await readFile(resolve(folder, "source-manifest.json"), "utf8"));
  const runs = [];
  for (const suffix of ["a", "b"]) {
    const out = `renders/dn-motion-${format}-${suffix}.mp4`;
    run(bin, ["render", "--docker", "--fps", String(tokens.tokens.motion.frameRate.value), "--quality", "high", "--output", out], folder);
    const path = resolve(folder, out);
    const bytes = await readFile(path);
    const frames = run("ffmpeg", ["-v", "error", "-i", path, "-map", "0:v:0", "-f", "framemd5", "-"], folder)
      .split("\n").filter((x) => x && !x.startsWith("#")).map((x) => x.trim());
    runs.push({ path: out, sha256: sha(bytes), decodedFrameSha256: sha(Buffer.from(frames.join("\n"))), frameCount: frames.length });
  }
  const decodedIdentical = runs[0].decodedFrameSha256 === runs[1].decodedFrameSha256;
  report.outputs.push({
    format, inputs: { logoSha256: manifest.logoSha256, gsapSha256: manifest.gsapSha256, customEaseSha256: manifest.customEaseSha256 },
    runA: runs[0], runB: runs[1],
    byteIdentical: runs[0].sha256 === runs[1].sha256,
    decodedFramesIdentical: decodedIdentical
  });
}
report.status = report.outputs.every((x) => x.decodedFramesIdentical) ? "PASS" : "FAILED";
await mkdir(resolve(project, "reports"), { recursive: true });
await writeFile(resolve(project, "reports/determinism-report.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (report.status !== "PASS") process.exit(1);
