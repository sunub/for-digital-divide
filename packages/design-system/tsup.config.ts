import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "components/index": "src/components/index.ts",
    "patterns/index": "src/patterns/index.ts",
    "primitives/index": "src/primitives/index.ts",
    "styles/index": "src/styles/index.ts",
    "tokens/index": "src/tokens/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  external: ["react", "react-dom", /^next/, "@vanilla-extract/css", "motion", /^motion\//, "react-icons", /^react-icons\//],
  esbuildPlugins: [vanillaExtractPlugin()],
});
