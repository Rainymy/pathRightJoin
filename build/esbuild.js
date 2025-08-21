const esbuild = require("esbuild");

/** @type {esbuild.BuildOptions} */
const options = {
  entryPoints: ["./index.js"],
  platform: "node",
  bundle: true,
  minify: false,
  minifyIdentifiers: true,
  minifyWhitespace: false,
  minifySyntax: true,
  logLevel: "info",
};

async function build_CJS() {
  await esbuild.build({
    ...options,
    format: "cjs",
    outfile: "./dist/index.cjs",
  });
}

async function build_ESM() {
  await esbuild.build({
    ...options,
    format: "esm",
    outfile: "./dist/index.mjs",
  });
}

async function main() {
  await build_CJS();
  await build_ESM();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
