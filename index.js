const path = require("path");

const { normalizePath } = require("./src/normalize");
const { SYSTEM_SLASH, SEGMENTS } = require("./src/constants");

/**
* Right-side join for paths, ignoring ".." from left segments.
*
*
* Normalizes a given file path by resolving `.` and `..` segments,
* handling both Windows (`\\`) and Unix (`/`) slashes.
* The output is always in forward-slash (`/`) format.
* @param  {string[]} segments Any number of path segments.
* @returns {string} Normalized, right-joined path.
*/
function resolvePathToRight(...segments) {
  const normalizedSegments = getNormalizedSegments(segments);
  const sgmtStack = [];

  const getLastResolved = (sgmt) => sgmt[sgmt.length - 1];

  for (const segment of normalizedSegments) {
    if (segment === SEGMENTS.SKIP_SEGMENT) {
      sgmtStack.push(segment);
      continue;
    }

    if (getLastResolved(sgmtStack) === SEGMENTS.SKIP_SEGMENT) {
      sgmtStack.pop();
      continue;
    }

    if (segment === SEGMENTS.EMPTY_SEGMENT) {
      sgmtStack.push(SYSTEM_SLASH);
      continue;
    }

    sgmtStack.push(segment);
  }

  return path.join(...sgmtStack);
}

/**
* @param {String[]} paths
* @returns {String[]}
*/
function getNormalizedSegments(paths) {
  const normalizedPaths = paths.map(normalizePath);
  const combinedPath = normalizedPaths.join(SYSTEM_SLASH);

  return normalizePath(combinedPath).split(SYSTEM_SLASH);
}

module.exports = resolvePathToRight;