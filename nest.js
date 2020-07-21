class Nesting {
  constructor() {}

  recursion(
    targetInfo,
    target = "name",
    children = "children",
    all = true,
    nameArr = []
  ) {
    if (!Array.isArray(targetInfo)) return;
    targetInfo.forEach(item => {
      if (item[children] && item[children].length > 0) {
        if (all) {
          if (item[target]) nameArr.push(item[target]);
        }
        this.recursion(item[children], target, children, all, nameArr);
      } else {
        if (item[target]) nameArr.push(item[target]); //取最深处的name
      }
    });
    return nameArr;
  }
}

export default Nesting;
