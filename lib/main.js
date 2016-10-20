let DOMNodeCollection = require ("./dom_node_collection.js");

window.$l = function (selector) {
  if (selector instanceof HTMLElement) {
    selector = new DOMNodeCollection([selector]);
  } else {
    selector = document.querySelectorAll(selector);
    selector = Array.from(selector);
    selector = new DOMNodeCollection(selector);
  }

  return selector;
};
