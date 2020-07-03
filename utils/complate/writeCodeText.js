const fs = require("fs");
const path = require("path");
const { promisify } = require("es6-promisify");

const ModuleCode = require("./codes/ModuleCode");
const ComponentCode = require("./codes/ComponentCode");


module.exports = async function (fileName, writeType) {
  try {
    const writeFilePath = path.join(process.cwd(), "src", fileName);
    if (writeType === "component") {
      await promisify(fs.writeFile)(writeFilePath, ComponentCode);
    };
    if (writeType === "module") {
      await promisify(fs.writeFile)(writeFilePath, ModuleCode);
    };
  } catch (error) {
    throw error;
  };
};