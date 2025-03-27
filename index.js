const path = require("path");

const { normalizePath } = require("./src/normalize");

/**
* Right-side join for paths, ignoring ".." from left segments.
* @param  {string[]} segments Any number of path segments.
* @returns {string} Normalized, right-joined path.
*/
function resolvePathRight(...segments) {
  const normalized_segments = normalize_paths(segments);
  const filteredSegments = [];

  for (let i = 0; i < normalized_segments.length; i++) {
    const segment = normalized_segments[i];
    // Skip ".." and the next segment.
    if (segment === "..") {
      if (normalized_segments[i + 1] === path.sep) i++;
      i++;
      continue;
    }

    filteredSegments.push(segment);
  }

  return path.join(...filteredSegments);
}

/**
* @param {String[]} paths
* @returns {String[]}
*/
function normalize_paths(paths) {
  const normalizedSegments = paths.map(normalizePath);
  const normalized_split = normalizedSegments;

  console.log("normalized_split", normalized_split)

  return normalized_split.map(v => v === "" ? path.sep : v);
}

console.log(resolvePathRight("/../path/", "/path/abs.js"))

module.exports = resolvePathRight;
