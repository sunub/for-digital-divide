import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import { transform } from "lightningcss";

const directory = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "dist",
);

const files = await glob(`${directory}/**/*.css`);

for (const csspath of files) {
  console.log(`Minifying: ${csspath}`);
  const cssCode = await fs.readFile(csspath);

  const { code } = transform({
    filename: path.basename(csspath),
    code: cssCode,
    minify: true,
    sourceMap: true,
  });

  await fs.writeFile(csspath, code);
}
