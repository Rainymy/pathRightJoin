# path-right-join

> 🧭 A tiny Node.js utility to **right-side join paths**, skipping `..` segments from earlier path fragments. Think of it as a "directional override" to avoid unwanted path climbing.

---

## ✨ Features

- ✅ **Directional Join**: Ignores `".."` segments in earlier path parts
- 🧱 **Keeps the Right Path**: Later segments take priority
- 📦 Fully Node.js-compatible (uses only the built-in `path` module)
- 🧼 Outputs cross-platform paths

---

## 📦 Usage Example
```js
const joinRight = require("path-right-join");

// Example: Prevent ".." from climbing above `/path`
const result = joinRight("../", "/path/ab.js");  // "./ab.js"
const result = joinRight('..', 'src', '..', 'dist', 'main.js');  // "main.js"
const result = joinRight('src//', 'utils\\', '..', 'core');  // "src/utils/"
```

## 📦 Installation

```bash
npm install path-right-join
```