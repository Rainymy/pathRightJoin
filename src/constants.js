const path = require("path");

module.exports = {
  SEGMENTS: {
    EMPTY_SEGMENT: "",
    RELATIVE_SEGMENT: ".",
    SKIP_SEGMENT: ".."
  },
  SYSTEM_SLASH: path.posix.sep
}