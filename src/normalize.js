const { normalizePath } = require("./util/normalizePath");
const { SYSTEM_SLASH } = require("./constants");

/**
* @param {String[]} paths
* @returns {String[]} The normalized, `paths`
* @throws if input `path` is not typeof ***`string`***.
*/
function normalize(paths) {
  const normalizedPaths = paths.map(normalizePath);
  const combinedPath = normalizedPaths.join(SYSTEM_SLASH);

  return normalizePath(combinedPath).split(SYSTEM_SLASH);
}

module.exports = normalize;