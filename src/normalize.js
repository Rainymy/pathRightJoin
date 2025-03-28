const { toUnixSlashes, isDriveLetter } = require("./utils");
const { SEGMENTS, SYSEM_SLASH } = require("./enum");

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
  const segments = normalizedInput.split(SYSEM_SLASH);

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
  const result = stack.join(SYSEM_SLASH);

  // Handle drive-letter like C:/
  if (isDriveLetter(stack[0])) {
    return result;
  }

  if (result) {
    const prefix = isAbsolutePath ? SYSEM_SLASH : SEGMENTS.EMPTY_SEGMENT;
    return prefix + result;
  }

  return isAbsolutePath ? SYSEM_SLASH : SEGMENTS.RELATIVE_SEGMENT;
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

/**
* @param {String} segment
* @returns {Boolean}
*/
function isEspecialSegment(segment) {
  return segment === SEGMENTS.ESPECIAL_SEGMENT;
}

/**
*
* @param {String} inputPath
* @param {String[]} stack
* @returns {Boolean}
*/
function isAbsolutePath(inputPath, stack) {
  const startsWithSlash = inputPath.startsWith(SYSEM_SLASH);
  return startsWithSlash && !isEspecialSegment(stack[0]);
}

/**
* @param {String[]} stack
* @returns {Boolean}
*/
function handleEspecialSegment(stack) {
  if (stack.length <= 0) return false;

  const segment = stack[stack.length - 1];
  const isEspecialSegment = segment === SEGMENTS.ESPECIAL_SEGMENT;
  const isEmptySegment = segment === SEGMENTS.EMPTY_SEGMENT;

  return !isEspecialSegment && !isEmptySegment;
};

exports.normalizePath = normalizePath;
