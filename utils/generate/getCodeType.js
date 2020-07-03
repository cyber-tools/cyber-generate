
module.exports = function (dir) {
  const list = dir.split("/");
  return list[list.length - 1];
};