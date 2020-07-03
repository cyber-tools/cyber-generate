const fs = require("fs");
const glob = require("glob");
const path = require("path");
const { promisify } = require("es6-promisify");

const { SCAN_TARGET, COMPILER_IGNORE, COMPILER_TARGET } = require("@/configs/runtime.config");

const getCodeType = require("@/utils/generate/getCodeType");
const NodeTree = require("@/utils/generate/TextNodeTree");

module.exports = async function () {
  NodeTree.setImportHeader();
  const result = await promisify(glob)(SCAN_TARGET, { ignore: COMPILER_IGNORE });
  const promiseTeam = result.map(async (filePath) => {
    const { name: importClassName, ext, dir } = path.parse(filePath.replace(process.cwd(), ""));
    const type = getCodeType(dir);
    if (type === "globals") {
      await NodeTree.setGlobals(`${importClassName}_${ext}`, filePath);
    };
    if (type === "feedbacks") {
      await NodeTree.setFeedBack(importClassName, filePath);
    };
  });
  await Promise.all(promiseTeam);
  await promisify(fs.writeFile)(COMPILER_TARGET, NodeTree.generate());
};