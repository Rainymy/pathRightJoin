const path = require("path");

const processSegments = require("./src/processSegment");
const normalize = require("./src/normalize");

/**
* Right-side join for paths, ignoring ".." from left segments.
*
* Normalizes a given file path by resolving `.` and `..` segments,
* handling both Windows (`\\`) and Unix (`/`) slashes.
* The output is always in forward-slash (`/`) format.
*
* @param  {string[]} segments Any number of path segments.
* @returns {string} Normalized, right-joined path.
*/
function resolvePathToRight(...segments) {
  if (!segments.every(seg => typeof seg === "string")) {
    throw new Error("Provide a path as string.");
  }

  const normalizedSegment = normalize(segments);

  const sgmtStack = processSegments(normalizedSegment);

  return path.join(...sgmtStack);
}

module.exports = resolvePathToRight;