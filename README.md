# vue-resource [![npm package](https://img.shields.io/npm/v/vue-resource.svg)](https://www.npmjs.com/package/vue-resource)

Resource plugin for Vue.js.

The plugin provides services for making web requests and handle responses using a [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) or JSONP.

## Features

- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API and [URI Templates](https://medialize.github.io/URI.js/uri-template.html)
- Supports interceptors for request and response
- Supports latest Firefox, Chrome, Safari, Opera and IE9+
- Compact size 12KB (4.5KB gzipped)

## Setup

### Webpack/Browserify

Add `vue` and `vue-resource` to your `package.json`, then `npm install`, then add these lines in your code:

```js
var Vue = require('vue');
var VueResource = require('vue-resource');

Vue.use(VueResource);
```

## Documentation

- [Configuration](docs/config.md)
- [HTTP Requests/Response](docs/http.md)
- [Creating Resources](docs/resource.md)
- [Code Recipes](docs/recipes.md)

## Changelog

Details changes for each release are documented in the [release notes](https://github.com/vuejs/vue-resource/releases).

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/vuejs/vue-resource/issues) or a pull request.

## License

[MIT](http://opensource.org/licenses/MIT)
