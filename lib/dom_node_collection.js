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

  }
}


module.exports = DOMNodeCollection;
