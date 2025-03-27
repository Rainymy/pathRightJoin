const { toUnixSlashes, isDriveLetter } = require("./utils");

const SYSTEM_SLASH = "/";
const EMPTY_SEGMENT = "";
const RELATIVE_SEGMENT = ".";
const ESPECIAL_SEGMENT = "..";

/**
 * Normalizes a given file path by resolving `.` and `..` segments,
 * handling both Windows (`\\`) and Unix (`/`) slashes.
 * The output is always in forward-slash (`/`) format.
 *
 * @param {string} inputPath - The input path to normalize.
 * @returns {string} The normalized, forward-slash (`/`) format.
 * @throws if `inputPath` is not typeof string.
 */
function normalizePath(inputPath) {
  if (typeof inputPath !== 'string') throw new Error("Provide a path string.");

  const normalizedInput = toUnixSlashes(inputPath);
  const segments = normalizedInput.split(SYSTEM_SLASH);

  const stack = [];
  for (const segment of segments) {
    if (isIgnorable(segment)) continue;

    if (isEspecialSegment(segment) && handleEspecialSegment(stack)) {
      stack.pop();
    }

    stack.push(segment);
  }

  const isAbsolute = isAbsolutePath(normalizedInput, stack);
  return formatResult(stack, isAbsolute);
}

/**
* @param {String[]} stack
* @param {Boolean} isAbsolutePath
* @returns
*/
function formatResult(stack, isAbsolutePath) {
  const result = stack.join(SYSTEM_SLASH);

  // Handle drive-letter like C:/
  if (isDriveLetter(stack[0])) {
    return result;
  }

  if (result) {
    return (isAbsolutePath ? SYSTEM_SLASH : EMPTY_SEGMENT) + result;
  }

  return (isAbsolutePath ? SYSTEM_SLASH : RELATIVE_SEGMENT);
}

/**
* @param {String} segment
* @returns {Boolean}
*/
function isIgnorable(segment) {
  return (segment === EMPTY_SEGMENT || segment === RELATIVE_SEGMENT);
}

/**
* @param {String} segment
* @returns {Boolean}
*/
function isEspecialSegment(segment) {
  return segment === ESPECIAL_SEGMENT;
}

/**
*
* @param {String} inputPath
* @param {String[]} stack
* @returns {Boolean}
*/
function isAbsolutePath(inputPath, stack) {
  const startsWithSlash = inputPath.startsWith(SYSTEM_SLASH);
  return startsWithSlash && !isEspecialSegment(stack[0]);
}

/**
* @param {String[]} stack
* @returns {Boolean}
*/
function handleEspecialSegment(stack) {
  if (stack.length <= 0) return false;
  const segment = stack[stack.length - 1];
  return segment !== ESPECIAL_SEGMENT && segment !== EMPTY_SEGMENT;
};

exports.normalizePath = normalizePath;
