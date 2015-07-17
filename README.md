# Metalsmith JSON Feed Plugin [![NPM version](https://img.shields.io/npm/v/metalsmith-json-feed.svg)](https://www.npmjs.org/package/metalsmith-json-feed)

[![Build Status](https://img.shields.io/travis/RobLoach/metalsmith-json-feed/master.svg)](https://travis-ci.org/RobLoach/metalsmith-json-feed)
[![Dependency Status](https://david-dm.org/RobLoach/metalsmith-json-feed.png)](https://david-dm.org/RobLoach/metalsmith-json-feed)

[Metalsmith](http://metalsmith.io) plugin to process files with any [json-feed](http://github.com/json-feeds).

## Installation

    npm install --save metalsmith-json-feed

## Usage

Create files that you would like to act on with json-feeds

### Example

#### `src/feed.html`
```
---
json_feed: http://example.com/rest
layout: mylayout.swig
---
```

### CLI

If you are using the command-line version of Metalsmith, you can install via npm, and then add the `metalsmith-json-feed` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-json-feed": {}
  }
}
```

### JavaScript

If you are using the JS Api for Metalsmith, then you can require the module and add it to your `.use()` directives:

```js
var feed = require('metalsmith-json-feed');

metalsmith.use(feed());
```

## License

MIT
