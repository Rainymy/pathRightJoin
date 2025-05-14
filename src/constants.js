const path = require("node:path");

module.exports = {
  SEGMENTS: {
    EMPTY_SEGMENT: "",
    RELATIVE_SEGMENT: ".",
    SKIP_SEGMENT: ".."
  },
  SYSTEM_SLASH: path.posix.sep
}