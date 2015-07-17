var assertDir = require('assert-dir-equal')
var feed = require('../')
var Metalsmith = require('metalsmith')
var layouts = require('metalsmith-jstransformer-layouts')

function test (name, options) {
  /* globals it describe */
  it(name, function (done) {
    Metalsmith('test/fixtures/' + name)
      .use(feed(options || {}))
      .use(layouts())
      .build(function (err) {
        if (err) {
          return done(err)
        }
        assertDir('test/fixtures/' + name + '/expected', 'test/fixtures/' + name + '/build')
        return done()
      })
  })
}

describe('metalsmith-jstransformer', function () {
  test('basic')
})
