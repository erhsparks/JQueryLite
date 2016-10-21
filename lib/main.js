let DOMNodeCollection = require ("./dom_node_collection.js");

let fcnQueue = [];
document.addEventListener("DOMContentLoaded", (e) => {
  fcnQueue.forEach(el => {
    el.call();
  });
});

window.$l = function (selector) {
  if (selector instanceof Function) {
    if (document.readyState === "complete") {
      selector();
    } else {
      fcnQueue.push(selector);
    }
  } else if (selector instanceof HTMLElement) {
    selector = new DOMNodeCollection([selector]);
    return selector;
  } else {
    selector = document.querySelectorAll(selector);
    selector = Array.from(selector);
    selector = new DOMNodeCollection(selector);
    return selector;
  }


};

// // annoying pop-ups to test my documentReady functionality:
// window.$l(() => alert("ready!"));
// window.$l(() => alert("super ready!"));
//
// alert("not ready yet!");
// alert("still loading");
