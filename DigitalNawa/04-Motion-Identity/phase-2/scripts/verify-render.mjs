import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(await readFile(resolve(project, "..", "brand-tokens.json"), "utf8"));
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const outputs = [];
for (const format of ["vertical", "square", "landscape"]) {
  const [width, height] = tokens.tokens.output[format].value.split("x").map(Number);
  const path = resolve(project, "compositions", format, "renders", `dn-motion-${format}.mp4`);
  const bytes = await readFile(path);
  const result = spawnSync("ffprobe", ["-v","error","-select_streams","v:0","-show_entries","stream=width,height,r_frame_rate,nb_frames,duration","-of","json",path], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr);
  const stream = JSON.parse(result.stdout).streams?.[0];
  const fps = tokens.tokens.motion.frameRate.value;
  const frames = fps * tokens.tokens.motion.durationSeconds.value;
  if (!stream || Number(stream.width)!==width || Number(stream.height)!==height || stream.r_frame_rate!==`${fps}/1` || Number(stream.nb_frames)!==frames) throw new Error(`${format}: output contract failed`);
  outputs.push({format,width,height,frameRate:stream.r_frame_rate,frames:Number(stream.nb_frames),durationSeconds:Number(stream.duration),sha256:sha(bytes)});
}
await mkdir(resolve(project,"reports"),{recursive:true});
await writeFile(resolve(project,"reports/render-integrity.json"),JSON.stringify({outputs},null,2)+"\n");
console.log(JSON.stringify({outputs},null,2));
