window.$l = function (selector) {
  let nodeList = document.querySelectorAll(selector);
  nodeList = Array.from(nodeList);

  return nodeList;
};
