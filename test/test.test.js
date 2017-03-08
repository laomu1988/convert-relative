var convert = require('../lib/index.js')
var assert = require('assert')

assert.equal(convert.link('/test.html', 'http://www.test.com/index.html'), 'test.html')
assert.equal(convert.link('/test.html', 'http://www.test.com/abc/index.html'), '../test.html')
assert.equal(convert.link('/test.html', 'http://www.test.com/vue/vue/index.html'), '../../test.html')
assert.equal(convert.link('./test.html', 'http://www.test.com/abc/index.html'), 'test.html')
assert.equal(convert.link('/test/test.html', '/test/index.html'), 'test.html')
assert.equal(convert.link('/test.html', '/abc/index.html'), '../test.html')
assert.equal(convert.link('/test.html', '/vue/vue/index.html'), '../../test.html')
assert.equal(convert.link('./test.html', '/abc/index.html'), 'test.html')
assert.equal(convert.link('./../../../test.html', '/abc/index.html'), '../test.html')
assert.equal(convert.link('./../../../test.html', '/abc/'), '../test.html')
assert.equal(convert.link('./test.html', '/abc/'), 'test.html')

assert.equal(convert.html('<a href="/index.html">test</a>', '/abc/').html, '<a href="../index.html">test</a>')
assert.equal(convert.html('<img src="/test.png">', '/abc/abc.html').html, '<img src="../test.png">')
assert.equal(convert.html('<link href="../test.css">', '/abc/').html, '<link href="../test.css">')
assert.equal(convert.html('<script src="/test.js"></script>', '/abc/').html, '<script src="../test.js"></script>')

console.log(convert.html('<script src="/test.js"></script>', 'http://www.test.com/abc/'));

console.log('test finish!')
