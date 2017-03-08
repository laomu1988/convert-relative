'use strict';

/**
 * 文件对象
 *
 * */
var Path = require('path');
var Url = require('url');
var cheerio = require('cheerio'); // cherrio是用jquery的语法来解析html
/**
* 转换链接为相对地址
* 注意假如是文件夹目录最后要加斜线/
*/
function relativeLink(link, baseUrl) {
  if (!link || !baseUrl || link[0] === '#' || link.indexOf('javascript:') === 0 || link.indexOf('void') === 0 || link.indexOf('data:') === 0) return link;
  link = Url.resolve(baseUrl, link);
  var parse1 = Url.parse(link);
  var parse2 = Url.parse(baseUrl);
  if (parse1.host && parse1.host !== parse2.host) return link; // 不转换
  link = Path.normalize(parse1.pathname);
  baseUrl = Path.normalize(parse2.pathname);
  baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf('/')) + '/';
  return Path.relative(baseUrl, link);
}

function relativeHTML(html, baseUrl) {
  try {
    var $ = cheerio.load(html);
    var attrs = ['href', 'src', 'data-original'];
    var list = Array.prototype.slice.call($('[href],[src]'));
    var links = [];
    var changed = 0;
    list.forEach(function (dom) {
      var domAttrs = dom.attribs;
      attrs.forEach(function (attr) {
        if (domAttrs[attr]) {
          var old = domAttrs[attr];
          var link = relativeLink(old, baseUrl);
          links.push(Url.resolve(baseUrl, old));
          if (domAttrs[attr] !== link) {
            domAttrs[attr] = link;
            changed += 1;
          }
        }
      });
    });
    return {
      changed: changed,
      links: arrUnique(links.filter(isRealLink)),
      html: changed > 0 ? $.html() : html
    };
  } catch (e) {
    console.trace('getLinksError:', e);
    throw e;
  }
}
module.exports = {
  link: relativeLink,
  html: relativeHTML
};

// 是否是指向某个文件的链接
function isRealLink(link) {
  if (!link || link[0] === '#' || link.indexOf('javascript:') === 0 || link.indexOf('void') === 0 || link.indexOf('data:') === 0) return false;
  return true;
}

// 过滤数组重复项
function arrUnique(arr) {
  var n = {};
  var arr2 = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    if (!n[arr[i]]) {
      n[arr[i]] = true;
      arr2.unshift(arr[i]);
    }
  }
  return arr2;
}