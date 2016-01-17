# vue-resource [![npm package](https://img.shields.io/npm/v/vue-resource.svg)](https://www.npmjs.com/package/vue-resource)

Resource plugin for Vue.js.

The plugin provides services for making web requests and handle responses using a XMLHttpRequest or JSONP.

## Setup

### Webpack/Browserify

Add `vue` and `vue-resource` to your `package.json`, then `npm install`, then add these lines in your code:

```js
var Vue = require('vue');

Vue.use(require('vue-resource'));
```

## Documentation

- [Configuration](docs/config.md)
- [HTTP Requests/Response](docs/http.md)
- [Creating Resources](docs/resource.md)
