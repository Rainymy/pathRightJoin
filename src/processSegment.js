const { SEGMENTS, SYSTEM_SLASH } = require("./constants");

/**
 * Processes an array of normalized path segments and resolves them
 * based on special markers like SKIP_SEGMENT and EMPTY_SEGMENT.
 *
 * @param {string[]} segments - The segments to process.
 * @returns {string[]} The resolved segment stack.
 */
function processSegmentResulotion(segments) {
  const sgmtStack = [];

  const getLastResolved = () => sgmtStack[sgmtStack.length - 1];

  for (const segment of segments) {
    if (segment === SEGMENTS.SKIP_SEGMENT) {
      sgmtStack.push(segment);
      continue;
    }

    if (getLastResolved() === SEGMENTS.SKIP_SEGMENT) {
      sgmtStack.pop();
      continue;
    }

    if (segment === SEGMENTS.EMPTY_SEGMENT) {
      sgmtStack.push(SYSTEM_SLASH);
      continue;
    }

    sgmtStack.push(segment);
  }

  return sgmtStack;
}

module.exports = processSegmentResulotion;