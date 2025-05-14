const { toUnixSlashes, isDriveLetter } = require("./utils");
const { SEGMENTS, SYSTEM_SLASH } = require("../constants");

/**
 * @param {string} inputPath - The input path to normalize.
 * @returns {string} The normalized, forward-slash (`/`) format.
 * @throws if `inputPath` is not typeof string.
 */
function normalizePath(inputPath) {
  const unixPath = toUnixSlashes(inputPath.trim());

  const result = unixPath
    .split(SYSTEM_SLASH)
    .filter(seg => !isIgnorable(seg))
    .join(SYSTEM_SLASH);

  if (isDriveLetter(result.slice(0, 2))) {
    return result;
  }

  const isAbsolute = unixPath.startsWith(SYSTEM_SLASH);
  const prefix = getPrefix(isAbsolute, result);

  return result ? (prefix + result) : prefix;
}

/**
* @param {Boolean} isAbs
* @param {String} result
* @returns
*/
function getPrefix(isAbs, result) {
  if (isAbs) {
    return SYSTEM_SLASH;
  }
  return result
    ? SEGMENTS.EMPTY_SEGMENT
    : SEGMENTS.RELATIVE_SEGMENT;
}

/**
* @param {String} segment
* @returns {Boolean}
*/
function isIgnorable(segment) {
  return [
    SEGMENTS.EMPTY_SEGMENT, SEGMENTS.RELATIVE_SEGMENT
  ].includes(segment);
}

module.exports = { normalizePath: normalizePath }
