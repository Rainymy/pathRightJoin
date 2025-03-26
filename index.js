const path = require("path");

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
  const normalizedSegments = paths.map(path.normalize).join(path.sep);
  const normalized_split = normalizedSegments.split(path.sep);

  const normalized_filter = normalized_split.reduce((acc, curr, i) => {
    // remove repeated slashes.
    if (curr === "" && acc[acc.length - 1] === curr) {
      return acc;
    }

    acc.push(curr);
    return acc;
  }, []);

  console.log(normalized_split)

  return normalized_filter.map(v => v === "" ? path.sep : v);
}

// const result = resolvePathRight('src//', 'utils\\', '..', 'core');
// const toBeEqual = path.join('src', 'utils/')

// console.log("hello", result, toBeEqual)
// console.log(path.join("ab.js"), resolvePathRight("/../", "/path/ab.js"))

module.exports = resolvePathRight;

