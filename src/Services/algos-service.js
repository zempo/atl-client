export const splitColorData = dataStr => {
  const exp1 = /[\{}]+/g;
  let str = dataStr.replace(exp1, "").split(",");
  return str;
};
