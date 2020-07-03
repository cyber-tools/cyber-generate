const fs = require("fs");
const path = require("path");
const { promisify } = require("es6-promisify");
const { COMPILER_TARGET } = require("@/configs/runtime.config");

const getCodeType = require("@/utils/generate/getCodeType");
const NodeTree = require("@/utils/generate/TextNodeTree");

module.exports = async function (eventType, filename) {
  const filePath = path.join(process.cwd(), "src", filename);
  const { name: importClassName, dir, ext } = path.parse(filePath);
  const type = getCodeType(dir);
  if (type === "globals") {
    await NodeTree.setGlobals(`${importClassName}_${ext}`, filePath);
  };
  if (type === "feedbacks") {
    await NodeTree.setFeedBack(importClassName, filePath);
  };
  await promisify(fs.writeFile)(COMPILER_TARGET, NodeTree.generate());
};