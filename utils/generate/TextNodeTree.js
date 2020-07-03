const glob = require("glob");
const { promisify } = require("es6-promisify");

class TextNodeTree {

  constructor () {
    this.headerHashTree = {};
    this.globalHashTree = {};
    this.bodyHashTree = {};
  };

  generate() {
    // 生成代码
    const headerCodeCollection = Object.values(this.headerHashTree).join("\n");
    const globalCodeCollection = Object.values(this.globalHashTree).join("\n");
    const bodyCodeCollection = Object.values(this.bodyHashTree).join("\n");
    return [headerCodeCollection, globalCodeCollection, bodyCodeCollection].join("");
  };

  setImportHeader() {
    // 头部依赖
    const headerText = [
      `import React from "react";`,
      `import ReactDOM from "react-dom";`,
      `import { registryFeedBack } from "@/utils/feedback";`
    ].concat("\n").join("\n");
    this.headerHashTree["importHeader"] = headerText;
  };

  async setGlobals(globalFileName, improtPath) {
    const result = await promisify(glob)(improtPath);
    if (result.length === 0) {
      this.globalHashTree[globalFileName] = undefined;
    } else {
      const globalCodeText = `import "${improtPath}"`;
      this.globalHashTree[globalFileName] = globalCodeText;
    };
  };

  async setFeedBack(importClassName, importPath) {
    // feedback动态代码
    const result = await promisify(glob)(importPath);
    if (result.length === 0) {
      this.bodyHashTree[importClassName] = undefined;
    } else {
      const feedBackText = [
        `import ${importClassName} from "${importPath}";`,
        `registryFeedBack(${importClassName})("${importClassName}");`
      ].join("\n");
      this.bodyHashTree[importClassName] = feedBackText;
    };
  };

};

module.exports = new TextNodeTree();

