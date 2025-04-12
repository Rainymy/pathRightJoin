# path-right-join

> A tiny Node.js utility to **right-side join paths**, skipping `..` segments from earlier path fragments. Think of it as a "directional override" to avoid unwanted path climbing.

This package is available on (`npm`)[https://www.npmjs.com/package/path-right-join].

---

## Quickstart
```js
const { joinRight, pathConvertTo } = require("path-right-join");

// joinRight(...segments: string[]): string
joinRight("../", "/path/ab.js");                 // "ab.js"
joinRight('..', 'src', '..', 'dist', 'main.js'); // "main.js"
joinRight('src//', 'utils\\', '..', 'core');     // "src/utils"

// Converts mixed-format paths to the target platform style
// pathConvertTo(path: string, mode?: win32 | posix)
pathConvertTo("src//utils\\", "win32"); //  src\\utils\\
pathConvertTo("src//utils\\", "posix"); //  src/utils/
pathConvertTo("src//utils\\");          //  src/utils/ (defaults to "posix")
```

---

## 🔧 Usage Example
Example: Copy files to a target folder, preserving only filenames

```sh
# Folder structure
  root
  ├── src
  │   ├── index.js
  │   └── utils.js
  ├── assets
  │   ├── penguin.png
  │   └── logo.png
  └── dist
      └── <empty>
```

```js
const { joinRight } = require("path-right-join");
const glob = require("glob");
const fs = require("fs");

// `glob` returns full paths to matching files.
const files = glob.sync("./assets/*.png");
//     └ [ "./assets/penguin.png", "./assets/logo.png" ]

for (const file of files) {
  const outputPath = joinRight("/dist/", "..", file);
  //     ├ /dist/penguin.png
  //     └ /dist/logo.png
  fs.copyFileSync(file, outputPath);
}
```

---
