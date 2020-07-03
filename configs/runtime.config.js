const path = require("path");

// 扫描目录
exports.SCAN_TARGET = path.join(process.cwd(), "src", "**/*.{js,jsx}");
// 编译目录
exports.COMPILER_TARGET = path.join(process.cwd(), ".runtime", "index.js");

// 编译忽略目录
exports.COMPILER_IGNORE = [
  "/**/components/**/*",
  "/**/services/**/*",
  "/**/utils/**/*"
];