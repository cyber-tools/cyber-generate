const fs = require("fs");
const path = require("path");
const moment = require("moment");
const { promisify } = require("es6-promisify");


module.exports = async function (filename) {
  try {
    const realFilePath = path.join(process.cwd(), "src", filename);
    const { mtime, birthtime } = await promisify(fs.stat)(realFilePath);
    const mTimeUnix = moment(mtime).toDate().getTime();
    const birthTimeUnix = moment(birthtime).toDate().getTime();
    // console.log("上一次修改该文件的时间=>", mTimeUnix);
    // console.log("创建此文件的时间戳=>", birthTimeUnix);
    return mTimeUnix === birthTimeUnix;
  } catch (error) {
    return false;
  };
};