const path = require("node:path");

const { processSegments } = require("./src/processSegment");
const { normalize } = require("./src/normalize");
const { toUnixSlashes } = require("./src/util/utils");

/**
* Joins and normalizes path segments into a single system-formatted path.
*
* - Handles mixed slashes (`/` and `\\`) safely
* - Collapses redundant separators and dot segments
* - Supports Windows drive letters (e.g., `C:`)
*
* @param  {string[]} segments Any number of path segments.
* @returns {string}
* @throws If any of the segment is not a `string`
*/
function resolvePathToRight(...segments) {
  if (!segments.every(seg => typeof seg === "string")) {
    throw new Error("Provide a path as string.");
  }

  return path.join(...processSegments(normalize(segments)));
}

/**
 * Converts a system path to either POSIX (`/`) or Windows (`\\`) format.
 *
 * - Accepts input in any slash format (mixed, POSIX, or Windows)
 * - Defaults to POSIX if the mode is missing or invalid
 *
 * @param {string} pathFs - A path string in any format
 * @param {"win32"|"posix"} [mode] - Target format
 * @returns {string} A path string normalized to the requested format
 */
function pathConvertTo(pathFs, mode) {
  const seg = toUnixSlashes(pathFs).split(path.posix.sep);

  return seg.join(mode === "win32" ? path.win32.sep : path.posix.sep);
}

module.exports = {
  joinRight: resolvePathToRight,
  pathConvertTo: pathConvertTo
}