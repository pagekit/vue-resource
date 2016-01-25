# HTTP

The http service can be used globally `Vue.http` or in a Vue instance `this.$http`.

## Usage

A Vue instance provides the `this.$http(options)` function which takes an options object for generating an HTTP request and returns a promise. Also the Vue instance will be automatically bound to `this` in all function callbacks.

```js
new Vue({

    ready: function() {

      // GET request
      this.$http({url: '/someUrl', method: 'GET'}).then(function (response) {
          // success callback
      }, function (response) {
          // error callback
      });

    }

})
```

The response object properties:

Property | Type | Description
-------- | ---- | -----------
data | `Object`, `string` | Response body data
ok | `boolean` | HTTP status code between 200 and 299
status | `number` | HTTP status code of the response
statusText | `string` | HTTP status text of the response
headers | `function([name])` | HTTP header getter function
request | `Object` | Request options object

## Methods

Shortcut methods are available for all request types. These methods work globally or in a Vue instance.

```js
// global Vue object
Vue.http.get('/someUrl', [data], [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [data], [options]).then(successCallback, errorCallback);

// in a Vue instance
this.$http.get('/someUrl', [data], [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [data], [options]).then(successCallback, errorCallback);
```
List of shortcut methods:

* `get(url, [data], [options])`
* `post(url, [data], [options])`
* `put(url, [data], [options])`
* `patch(url, [data], [options])`
* `delete(url, [data], [options])`
* `jsonp(url, [data], [options])`

## Options

Parameter | Type | Description
--------- | ---- | -----------
url | `string` | URL to which the request is sent
method | `string` | HTTP method (e.g. GET, POST, ...)
data | `Object`, `string` | Data to be sent as the request message data
params | `Object` | Parameters object to be appended as GET parameters
headers | `Object` | Headers object to be sent as HTTP request headers
beforeSend | `function(request)` | Callback function to modify the request object before it is sent
emulateHTTP | `boolean` | Send PUT, PATCH and DELETE requests with a HTTP POST and set the `X-HTTP-Method-Override` header
emulateJSON | `boolean` | Send request data as `application/x-www-form-urlencoded` content type
xhr | `Object` | Parameters object to be set on the [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object
upload | `Object` | Parameters object to be set on the [XHR.upload](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload) property
jsonp | `string` | Callback function name in a JSONP request
timeout | `number` | Request timeout in milliseconds (`0` means no timeout)

## Example

```js
new Vue({

    ready: function() {

      // GET request
      this.$http.get('/someUrl').then(function (response) {

          // get status
          response.status;

          // get all headers
          response.headers();

          // get 'expires' header
          response.headers('expires');

          // set data on vm
          this.$set('someData', response.data)

      }, function (response) {

          // error callback
      });

    }

})
```

## Interceptors

Interceptors can be defined globally and are used for pre- and postprocessing of a request.

```js
Vue.http.interceptors.push({

    request: function (request) {
        return request;
    },

    response: function (response) {
        return response;
    }

});
```

A factory function can also be used.

```js
Vue.http.interceptors.push(function () {
    return {

        request: function (request) {
            return request;
        },

        response: function (response) {
            return response;
        }

    };
});
```
