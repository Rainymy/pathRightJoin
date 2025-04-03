# path-right-join

> A tiny Node.js utility to **right-side join paths**, skipping `..` segments from earlier path fragments. Think of it as a "directional override" to avoid unwanted path climbing.

---

## Quickstart
```js
const joinRight = require("path-right-join");

joinRight("../", "/path/ab.js");                  // "ab.js"
joinRight('..', 'src', '..', 'dist', 'main.js');  // "main.js"
joinRight('src//', 'utils\\', '..', 'core');      // "src/utils"
```

---

## 🔧 Usage Example
Example: Copy files to a target folder, preserving only filenames

```toml
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
const joinRight = require("path-right-join");
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