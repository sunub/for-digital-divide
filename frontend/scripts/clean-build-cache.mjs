import { rmSync } from "node:fs";

for (const target of ["tsconfig.tsbuildinfo", ".next/cache"]) {
  rmSync(target, { force: true, recursive: true });
}
