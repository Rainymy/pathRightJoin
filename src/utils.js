const path = require("path");
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

module.exports = {
  toUnixSlashes: toUnixSlashes,
  isDriveLetter: isDriveLetter
}