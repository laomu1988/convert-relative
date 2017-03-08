# 将地址改为相对地址

## demo

```js
var convert = require('convert-relative')

// 转换链接地址
var link = convert.link('/test/test.js', 'http://www.test.com/test/index.html')
console.log(link)
// 将输出 'test.js'

// 转换html，将html内容中的所有引用地址改为相对地址
var result = convert.html('<a href="/test.html">test</a>', 'http://www.test.com/test/index.html')
console.log(result)
/** 将输出
*  {
*     changed: 1,
*     html: '<a href="../test.html">test</a>',
*     links: ['http://www.test.com/test/index.html']
*  }
*
*/

```

## api
* link(link, baseUrl) 转换地址为相对地址
  - @param {string} link: 被转换的地址
  - @param {string} baseUrl: 基础地址
  - @return {string} 转换后的地址
* html(html, baseUrl) 转换html中内容的地址为相对地址
- @param {string} html: 被转换的html内容
- @param {string} baseUrl: 基础地址
- @return {object}
      - changed: 修改的地址个数
      - html:    修改后的文档内容
      - links:  {array} 网页中引用的链接地址（已转换为绝对地址）


## 测试
```
npm run test
```
