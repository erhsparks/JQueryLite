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
      if (attrVal || attrVal === "") {
        el.setAttribute(attrName, attrVal);
      } else {
        attrVal = el.getAttribute(attrName);
        if (attrVal) return attrVal;
      }
    });

    return attrVal;
  }

  addClass(className) {

  }

  removeClass(className) {

  }
}


module.exports = DOMNodeCollection;
