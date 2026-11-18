import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const bin = resolve(project, "node_modules", ".bin", process.platform === "win32" ? "hyperframes.cmd" : "hyperframes");
for (const format of ["vertical", "square", "landscape"]) {
  const result = spawnSync(bin, ["lint"], { cwd: resolve(project, "compositions", format), stdio: "inherit", shell: process.platform === "win32" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
