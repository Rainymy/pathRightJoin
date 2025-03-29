# 🧭 path-right-join

> A tiny Node.js utility to **right-side join paths**, skipping `..` segments from earlier path fragments. Think of it as a "directional override" to avoid unwanted path climbing.

---

# 🤔 Why Use this package?

The native path.join() is great; until you need to join paths and preserve the rightmost segments, especially when dealing with full paths or globbed files.

---

## ✨ Features

- 🧱 **Keeps the Right Path**: Later segments take priority.
- 📦 Fully Node.js-compatible.
- 🧼 Cross-platform Safe: Normalized slashes (/) for consistent output.

---
## 🧪 Examples
```js
// Example: Prevent ".." from climbing above `/path`
joinRight("../", "/path/ab.js");  // "ab.js"
joinRight('..', 'src', '..', 'dist', 'main.js');  // "main.js"
joinRight('src//', 'utils\\', '..', 'core');  // "src/utils"
```

## 🔧 Usage Example
```js
const joinRight = require("path-right-join");
const glob = require("glob");
const fs = require("fs");

// Example: copy files to a target folder, preserving only filenames
// `glob` returns full paths to matching files.
const files = glob.sync("./path/*.js");

for (const file of files) {
  // file → ./path/filename.js
  const outputPath = joinRight("/folder/", "..", file); // → "/folder/filename.js"
  fs.copyFileSync(file, outputPath);
}
```

## 📦 Installation

```bash
npm install path-right-join
```