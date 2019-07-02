/*
  Docsify plugin for adding toc of each page.
  author: Ragina Jeon
 */
import "./page-toc.css";

// To collect headings and then add to the page ToC
function pageToC(headings, path) {
  var toc = ['<div class="page_toc">', '<p class="title">Contents</p>'];
  var list = [];
  headings = document.querySelectorAll(window.$docsify["page-toc"].target);
  if (headings) {
    headings.forEach(function(heading) {
      var item = generateToC(heading.tagName.replace(/h/gi, ""), heading.innerHTML)
      if (item) {
        list.push(item)
      }
    });
  }
  if (list.length > 0) {
    toc = toc.concat(list);
    toc.push("</div>");
    return toc.join("");
  } else {
    return "";
  }
}

// To generate each ToC item
function generateToC(level, html) {
  if (level > 1 && level <= window.$docsify["page-toc"].tocMaxLevel) {
    var heading = ['<div class="lv' + level + '">', html, "</div>"].join("");
    return heading;
  }
  return "";
}

// Docsify plugin functions
function plugin(hook, vm) {
  hook.mounted(function() {
    var content = window.Docsify.dom.find(".content");
    if (content) {
      var nav = window.Docsify.dom.create("aside", "");
      window.Docsify.dom.toggleClass(nav, "add", "nav");
      window.Docsify.dom.before(content, nav);
    }
  });
  hook.doneEach(function() {
    var nav = window.Docsify.dom.find(".nav");
    if (nav) {
      nav.innerHTML = pageToC().trim();
      if (nav.innerHTML == "") {
        window.Docsify.dom.toggleClass(nav, "add", "nothing");
      } else {
        window.Docsify.dom.toggleClass(nav, "remove", "nothing");
      }
    }
  });
}

// Docsify plugin options
window.$docsify["page-toc"] = Object.assign(window.$docsify["page-toc"], {
  tocMaxLevel: 3,
  target: "h2, h3, h4, h5, h6"
});
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);
