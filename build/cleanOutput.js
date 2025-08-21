const fs = require("fs");
const path = require("path");


const F_ARG = "-f";
const argFlagIndex = process.argv.indexOf(F_ARG);
if (argFlagIndex === -1) {
  throw new Error(`Argument: ${F_ARG} not found!`);
}

const output = process.argv[argFlagIndex + 1];
if (!output) {
  throw new Error(`Argument value: ${F_ARG} <path> not found!`);
}

const OUTPUT_FOLDER = output;

/**
 * Esbuild plugin delete output folder.
 * @param {String} dist - **MUST PROVIDE OUTPUT FOLDER**
 * @returns {import('esbuild').Plugin}
 */
function cleanUpOutputFolder(dist) {
  const workingDirectory = path.join(__dirname, "..");

  const resolvedTarget = path.resolve(dist);
  const resolvedRoot = path.resolve(workingDirectory);

  // Safety check: ensure the folder is within the project root
  if (!resolvedTarget.startsWith(resolvedRoot + path.sep)) {
    throw new Error(
      [
        "❌ Refusing to delete outside project root!",
        `  ⮡  Root  : ${resolvedRoot}`,
        `  ⮡  Target: ${resolvedTarget}`,
      ].join("\n"),
    );
  }

  if (!fs.existsSync(dist)) {
    return;
  }

  if (!fs.lstatSync(dist).isDirectory()) {
    throw new Error(`❌ Not a valid output directory: ${resolvedTarget}`);
  }

  fs.rmSync(dist, { recursive: true });
}

cleanUpOutputFolder(OUTPUT_FOLDER);
