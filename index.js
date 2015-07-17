var async = require('async')
var extend = require('extend')
var clone = require('clone')
var request = require('request')

module.exports = function (opts) {
  // Prepare the options.
  opts = opts || {}

  // Execute the plugin.
  return function (files, metalsmith, done) {

    /**
     * Filter out all files with feed information.
     */
    function filterFiles(file, done) {
      done(files[file].json_feed)
    }

    function processFile(file, done) {
      var feed = files[file].json_feed
      request(feed, function (error, response, body) {
        if (error) {
          return done(error)
        }

        var results = files[file].contents
        try {
          results = JSON.parse(body)
        }
        catch (e) {
          return done(e)
        }
        for (var i in results) {
          console.log(results[i])
          var newFile = clone(files[file])
          var newFilename = results[i].uuid[0].value + '.html'
          newFile.contents = results[i].body[0].value
          files[newFilename] = extend({}, newFile, results[i])
        }
        done()
      })
    }

    function deleteFile(file, done) {
      delete files[file]
      done()
    }

    async.filter(Object.keys(files), filterFiles, function (feeds) {
      async.map(feeds, processFile, function (err) {
        if (err) {
          done(err)
        } else {
          // Now delete the original files.
          async.map(feeds, deleteFile, done)
        }
      })
    })
  }
}
