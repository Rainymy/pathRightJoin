const path = require("path");

const { normalizePath } = require("./src/normalize");
const { SYSTEM_SLASH, SEGMENTS } = require("./src/constants");

/**
* Right-side join for paths, ignoring ".." from left segments.
* @param  {string[]} segments Any number of path segments.
* @returns {string} Normalized, right-joined path.
*/
function resolvePathToRight(...segments) {
  const normalizedSegments = getNormalizedPathSegments(segments);
  const resolvedSegments = [];

  for (let i = 0; i < normalizedSegments.length; i++) {
    const segment = normalizedSegments[i];
    // Skip ".." and the next segment.
    if (segment === SEGMENTS.SKIP_SEGMENT) {
      i++;
      continue;
    }

    resolvedSegments.push(segment);
  }

  return path.join(...resolvedSegments);
}

/**
* @param {String[]} paths
* @returns {String[]}
*/
function getNormalizedPathSegments(paths) {
  const normalizedPaths = paths.map(normalizePath);
  const combinedPath = normalizedPaths.join(SYSTEM_SLASH);

  return normalizePath(combinedPath).split(SYSTEM_SLASH);
}

console.log("result => ", resolvePathToRight("../as", "/path/abs.js"))

module.exports = resolvePathToRight;
