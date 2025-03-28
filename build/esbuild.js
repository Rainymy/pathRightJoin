const esbuild = require("esbuild");

async function build_CJS() {
  await esbuild.build({
    entryPoints: ['./index.js'],
    bundle: true,
    minify: false,
    platform: 'node',
    format: 'cjs',
    outfile: './dist/index.cjs',
  });
}

async function build_ESM() {
  await esbuild.build({
    entryPoints: ['./index.js'],
    bundle: true,
    minify: false,
    platform: 'node',
    format: 'esm',
    outfile: './dist/index.mjs',
  });
}

async function main() {
  await build_CJS();
  await build_ESM();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});