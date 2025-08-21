const { SYSTEM_SLASH, SEGMENTS } = require("./constants");
const path = require("node:path");

/**
 * @param {String[]} paths
 * @returns {String[]} The normalized, `paths`
 * @throws if input `path` is not typeof ***`string`***.
 */
function normalize(paths) {
  const combinedPath = paths.map(normalizePath).join(SYSTEM_SLASH);

  return normalizePath(combinedPath).split(SYSTEM_SLASH);
}

/**
 * @param {string} inputPath - The input path to normalize.
 * @returns {string} The normalized, forward-slash (`/`) format.
 * @throws if `inputPath` is not typeof string.
 */
function normalizePath(inputPath) {
  const unixPath = toUnixSlashes(inputPath.trim());

  const result = unixPath
    .split(SYSTEM_SLASH)
    .filter((seg) => !isIgnorable(seg))
    .join(SYSTEM_SLASH);

  if (isDriveLetter(result.slice(0, 2))) {
    return result;
  }

  const isAbsolute = unixPath.startsWith(SYSTEM_SLASH);
  const prefix = getPrefix(isAbsolute, result);

  return result ? prefix + result : prefix;
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
  return result ? SEGMENTS.EMPTY_SEGMENT : SEGMENTS.RELATIVE_SEGMENT;
}

/**
 * @param {String} segment
 * @returns {Boolean}
 */
function isIgnorable(segment) {
  return [SEGMENTS.EMPTY_SEGMENT, SEGMENTS.RELATIVE_SEGMENT].includes(segment);
}

/**
 * Detect if string contains windows driver letter like C:
 * @param {String} value
 * @returns
 */
function isDriveLetter(value) {
  return /^[a-zA-Z]:$/.test(value);
}

/**
 * Converts Windows-style backslashes in a file path to
 * Unix-style forward slashes.
 * @param {String} value
 * @returns
 */
function toUnixSlashes(value) {
  return value.replace(path.win32.sep, path.posix.sep);
}

module.exports = { normalize: normalize, toUnixSlashes };
