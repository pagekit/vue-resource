# HTTP

The http service can be used globally `Vue.http` or in a Vue instance `this.$http`.

## Usage

A Vue instance provides the `this.$http` service which can send HTTP requests. A request method call returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to the response. Also the Vue instance will be automatically bound to `this` in all function callbacks.

```js
new Vue({

    ready() {

      // GET /someUrl
      this.$http.get('/someUrl').then((response) => {
          // success callback
      }, (response) => {
          // error callback
      });

    }

})
```

## Methods

Shortcut methods are available for all request types. These methods work globally or in a Vue instance.

```js
// global Vue object
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

// in a Vue instance
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
```
List of shortcut methods:

* `get(url, [options])`
* `head(url, [options])`
* `delete(url, [options])`
* `jsonp(url, [options])`
* `post(url, [body], [options])`
* `put(url, [body], [options])`
* `patch(url, [body], [options])`

## Options

Parameter | Type | Description
--------- | ---- | -----------
url | `string` | URL to which the request is sent
method | `string` | HTTP method (e.g. GET, POST, ...)
body | `Object`, `FormData` `string` | Data to be sent as the request body
params | `Object` | Parameters object to be sent as URL parameters
headers | `Object` | Headers object to be sent as HTTP request headers
timeout | `number` | Request timeout in milliseconds (`0` means no timeout)
before | `function(request)` | Callback function to modify the request options before it is sent
progress | `function(event)` | Callback function to handle the [ProgressEvent](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent) of uploads
credentials | `boolean` | Indicates whether or not cross-site Access-Control requests should be made using credentials
emulateHTTP | `boolean` | Send PUT, PATCH and DELETE requests with a HTTP POST and set the `X-HTTP-Method-Override` header
emulateJSON | `boolean` | Send request body as `application/x-www-form-urlencoded` content type

## Response

A request resolves to a response object with the following properties and methods:

Method | Type | Description
-------- | ---- | -----------
text() | `string` | Response body as string
json() | `Object` | Response body as parsed JSON object
blob() | `Blob` | Response body as Blob object
**Property** | **Type** | **Description**
ok | `boolean` | HTTP status code between 200 and 299
status | `number` | HTTP status code of the response
statusText | `string` | HTTP status text of the response
headers | `Object` | HTTP headers of the response

## Example

```js
new Vue({

    ready() {

      // POST /someUrl
      this.$http.post('/someUrl', {foo: 'bar'}).then((response) => {

          // get status
          response.status;

          // get status text
          response.statusText;

          // get all headers
          response.headers;

          // get 'Expires' header
          response.headers['Expires'];

          // set data on vm
          this.$set('someData', response.json())

      }, (response) => {
          // error callback
      });

    }

})
```

## Interceptors

Interceptors can be defined globally and are used for pre- and postprocessing of a request.

### Request processing
```js
Vue.http.interceptors.push((request, next) => {

    // modify request
    request.method = 'POST';

    // continue to next interceptor
    next();
});
```

### Request and Response processing
```js
Vue.http.interceptors.push((request, next)  => {

    // modify request
    request.method = 'POST';

    // continue to next interceptor
    next((response) => {

        // modify response
        response.body = '...';

    });
});
```

### Return a Response and stop processing
```js
Vue.http.interceptors.push((request, next) => {

    // modify request ...

    // stop and return response
    next(request.respondWith(body, {
         status: 404,
         statusText: 'Not found'
    }));
});
```

### set loading
...js
Vue.http.interceptors.push({
        request: function(request){
            // start loading 
            request.loadingid = setTimeout(function () {
                if (!_loadingDialog) {
                    _loadingDialog = true;
                }
            }, 500);
            return request
        },
        response: function(response){

            // clean loading
            if (_loadingDialog) {
                _loadingDialog = false;
            }
            clearTimeout(response.request.loadingid);
			
            return response
        }
    });
```
