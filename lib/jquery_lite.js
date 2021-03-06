/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let DOMNodeCollection = __webpack_require__ (1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(elArray) {
	    this.elArray = elArray;
	  }

	  html(innerHTMLString) {
	    if (innerHTMLString || innerHTMLString === "") {
	      this.elArray.forEach(el => {
	        el.innerHTML = innerHTMLString;
	      });
	    } else return this.elArray[0].innerHTML;
	  }

	  empty() {
	    this.html("");
	  }

	  append(content) {
	    this.elArray.forEach(el => {
	      if (content instanceof HTMLElement) {
	        el.innerHTML += content.outerHTML;
	      } else {
	        el.innerHTML += content;
	      }
	    });
	  }

	  attr(attrName, attrVal) {
	    this.elArray.forEach(el => {
	      if (attrVal) {
	        el.setAttribute(attrName, attrVal);
	      } else if (attrVal === "") {
	        el.removeAttribute(attrName);
	      } else {
	        attrVal = el.getAttribute(attrName);
	        if (attrVal) return attrVal;
	      }
	    });

	    return attrVal;
	  }

	  addClass(newClass) {
	    this.elArray.forEach(el => {
	      if (el.className) {
	        let newClassName = el.className.split(" ");
	        newClassName.push(newClass);
	        el.className = newClassName.join(" ");
	      } else {
	        el.className = newClass;
	      }
	    });
	  }

	  removeClass(className) {
	    this.elArray.forEach(el => {
	      let classes = el.className.split(" ");
	      let classIdx = classes.indexOf(className);

	      if (classIdx !== -1) {
	        classes.splice(classIdx, classIdx + 1);
	        el.className = classes.join(" ");
	      }
	    });
	  }

	  children() {
	    let childEls = [];

	    this.elArray.forEach(el => {
	      childEls = childEls.concat(el.children);
	    });

	    return new DOMNodeCollection(childEls);
	  }

	  parent() {
	    let parentEls = [];

	    this.elArray.forEach(el => {
	      parentEls = parentEls.concat(el.parentElement);
	    });

	    return new DOMNodeCollection(parentEls);
	  }

	  find(selector) {
	    let found = [];

	    this.elArray.forEach(el => {
	      found = found.concat(el.querySelectorAll(selector));
	    });

	    return new DOMNodeCollection(found);
	  }

	  remove() {
	    this.elArray.forEach(el => {
	      el.remove();
	    });
	  }

	  on(event, callback) {
	    this.elArray.forEach(el => {
	      el.addEventListener(event, callback);
	    });
	  }

	  off(event, callback) {
	    this.elArray.forEach(el => {
	      el.removeEventListener(event, callback);
	    });
	  }
	}


	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);