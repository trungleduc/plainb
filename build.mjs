import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  target: ["es2020"],
  platform: "browser",
  outfile: "dist/index.js",
  sourcemap: true,
});

console.log("✓ plainb built → dist/index.js");
