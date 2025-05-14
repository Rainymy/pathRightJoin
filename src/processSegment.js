const { SEGMENTS, SYSTEM_SLASH } = require("./constants");

/**
 * Processes an array of normalized path segments and resolves them
 * based on special markers like `SKIP_SEGMENT` and `EMPTY_SEGMENT`.
 *
 * @param {string[]} segments - The segments to process.
 * @returns {string[]} The resolved segment stack.
 */
function processSegments(segments) {
  const stack = [];

  for (const segment of segments) {
    if (segment === SEGMENTS.SKIP_SEGMENT) {
      stack.push(segment);
      continue;
    }

    const lastSegment = stack[stack.length - 1];
    if (lastSegment === SEGMENTS.SKIP_SEGMENT) {
      stack.pop();
      continue;
    }

    if (segment === SEGMENTS.EMPTY_SEGMENT) {
      stack.push(SYSTEM_SLASH);
      continue;
    }

    stack.push(segment);
  }

  return stack;
}

module.exports = { processSegments: processSegments }