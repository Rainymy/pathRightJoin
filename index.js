const path = require("path");

const { getNormalizedSegments } = require("./src/utils");
const processSegments = require("./src/processSegment");

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
  const normalizedSegments = getNormalizedSegments(segments);

  const sgmtStack = processSegments(normalizedSegments);

  return path.join(...sgmtStack);
}

module.exports = resolvePathToRight;