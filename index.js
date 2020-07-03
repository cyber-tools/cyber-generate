#!/usr/bin/env node
require("module-alias").addAlias("@", __dirname);
const fs = require("fs");
const path = require("path");

const postGenerate = require("@/actions/postGenerate");
const autoGenerate = require("@/actions/autoGenerate");
const autoComplate = require("@/actions/autoComplate");

postGenerate();
fs.watch(path.join(process.cwd(), "./src/"), { recursive: true }, (eventType, filename) => {
  // 根据文件后缀名填充文件内容
  autoComplate(eventType, filename);
  // 自动生成runtime代码
  autoGenerate(eventType, filename);
});