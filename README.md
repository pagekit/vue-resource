# vue-resource [![Version](https://img.shields.io/npm/v/vue-resource.svg)](https://www.npmjs.com/package/vue-resource) [![License](https://img.shields.io/npm/l/vue-resource.svg)](https://www.npmjs.com/package/vue-resource) [![Downloads](https://img.shields.io/npm/dt/vue-resource.svg)](https://www.npmjs.com/package/vue-resource)

The plugin for [Vue.js](http://vuejs.org) provides services for making web requests and handle responses using a [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) or JSONP.

## Features

- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API and [URI Templates](https://medialize.github.io/URI.js/uri-template.html)
- Supports [interceptors](docs/http.md#interceptors) for request and response
- Supports latest Firefox, Chrome, Safari, Opera and IE9+
- Compact size 14KB (5.3KB gzipped)

## Installation

### NPM
```
$ npm install vue-resource
```

### Bower
```
$ bower install vue-resource
```

### CDN
Available on [jsdelivr](https://cdn.jsdelivr.net/vue.resource/1.2.1/vue-resource.min.js), [cdnjs](https://cdnjs.com/libraries/vue-resource) or [unpkg](https://unpkg.com/vue-resource@1.2.1/dist/vue-resource.min.js).
```html
<script src="https://cdn.jsdelivr.net/vue.resource/1.2.1/vue-resource.min.js"></script>
```

## Example
```js
{
  // GET /someUrl
  this.$http.get('/someUrl').then(response => {

    // get body data
    this.someData = response.body;

  }, response => {
    // error callback
  });
}
```

## Documentation

- [Configuration](docs/config.md)
- [HTTP Requests/Response](docs/http.md)
- [Creating Resources](docs/resource.md)
- [Code Recipes](docs/recipes.md)
- [API Reference](docs/api.md)

## Changelog

Details changes for each release are documented in the [release notes](https://github.com/vuejs/vue-resource/releases).

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/vuejs/vue-resource/issues) or a [pull request](https://github.com/vuejs/vue-resource/pulls).

## License

[MIT](http://opensource.org/licenses/MIT)
