# vue-resource [![npm package](https://img.shields.io/npm/v/vue-resource.svg)](https://www.npmjs.com/package/vue-resource)

Resource plugin for Vue.js.

The plugin provides services for making web requests and handle responses using a XMLHttpRequest or JSONP.

## Setup

### Webpack/Browserify

Add `vue` and `vue-resource` to your `package.json`, then `npm install`, then add these lines in your code:

```javascript
var Vue = require('vue');

Vue.use(require('vue-resource'));
```

### Configuration

Set default values using the global configuration.

```javascript
Vue.http.options.root = '/root';
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
```

Set default values inside your Vue component options.

```javascript
new Vue({

    http: {
      root: '/root',
      headers: {
        Authorization: 'Basic YXBpOnBhc3N3b3Jk'
      }
    }

})
```

## HTTP

The http service can be used globally `Vue.http` or in a Vue instance `this.$http`.

### Methods

* `get(url, [data], [success], [options])`
* `post(url, [data], [success], [options])`
* `put(url, [data], [success], [options])`
* `patch(url, [data], [success], [options])`
* `delete(url, [data], [success], [options])`
* `jsonp(url, [data], [success], [options])`

### Options

* **url** - `string` - URL to which the request is sent
* **data** - `Object|string` - Data to be sent as the request message data
* **method** - `string` - HTTP method (e.g. GET, POST, ...)
* **params** - `Object` - Parameters object to be appended as GET parameters
* **headers** - `Object` - Headers object to be sent as HTTP request headers
* **success** - `function(data, status, request)` - Callback function to be called when the request finishes
* **error** - `function(data, status, request)` - Callback function to be called when the request fails
* **beforeSend** - `function(request, options)` - Callback function to modify the request object before it is sent
* **emulateHTTP** - `boolean` - Send PUT, PATCH and DELETE requests with a HTTP POST and set the `X-HTTP-Method-Override` header
* **emulateJSON** - `boolean` -  Send request data as `application/x-www-form-urlencoded` content type
* **xhr** - `Object` - Parameters object to be set on the native XHR object
* **jsonp** - `string` - Callback function name in a JSONP request

### Example

```javascript
new Vue({

    ready: function() {

      // GET request
      this.$http.get('/someUrl', function (data, status, request) {

          // set data on vm
          this.$set('someData', data)

      }).error(function (data, status, request) {
          // handle error
      })

    }

})
```

## Resource

The resource service can be used globally `Vue.resource` or in a Vue instance `this.$resource`.

### Methods

* `resource(url, [params], [actions])`

### Default Actions

```javascript
get: {method: 'GET'},
save: {method: 'POST'},
query: {method: 'GET'},
update: {method: 'PUT'},
remove: {method: 'DELETE'},
delete: {method: 'DELETE'}
```

### Example
```javascript
new Vue({

    ready: function() {

      var resource = this.$resource('someItem/:id');

      // get item
      resource.get({id: 1}, function (item, status, request) {
          this.$set('item', item)
      })

      // save item
      resource.save({id: 1}, {item: this.item}, function (data, status, request) {
          // handle success
      }).error(function (data, status, request) {
          // handle error
      })

      // delete item
      resource.delete({id: 1}, function (data, status, request) {
          // handle success
      }).error(function (data, status, request) {
          // handle error
      })

    }

})
```
