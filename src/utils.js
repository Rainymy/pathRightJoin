
/**
* Detect if string contains windows driver letter like C:
* @param {String} segment
* @returns
*/
function isDriveLetter(segment) {
  return /^[a-zA-Z]:$/.test(segment);
}

/**
*
* @param {String} value
* @returns
*/
function toUnixSlashes(value) {
  return value.replace(/\\/g, "/");
}

module.exports = {
  toUnixSlashes: toUnixSlashes,
  isDriveLetter: isDriveLetter
}