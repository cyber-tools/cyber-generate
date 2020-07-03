const path = require("path");
const isFirstCreate = require("@/utils/complate/isFirstCreate");
const writeCodeText = require("@/utils/complate/writeCodeText");


// 根据创建文件目录的不同,填充不同的代码(仅限在一级结构)
module.exports = async (eventType, filename) => {
  const { dir, ext } = path.parse(filename);
  const isFirst = await isFirstCreate(filename);
  if (!isFirst) {
    return false;
  };
  if (!ext.match(/.(js|jsx)$/ig)) {
    return false;
  };
  switch (dir) {
    case "components":
      await writeCodeText(filename, "component");
      break;
    case "feedbacks":
      await writeCodeText(filename, "component");
      break;
    case "layouts":
      await writeCodeText(filename, "component");
      break;
    case "pages":
      await writeCodeText(filename, "component");
      break;
    case "services":
      await writeCodeText(filename, "module");
      break;
    case "utils":
      await writeCodeText(filename, "module");
      break;
    default:
      return false;
  };
};