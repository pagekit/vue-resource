# Configuration

Set default values using the global configuration.

```js
Vue.http.options.root = '/root';
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
```

Set default values inside your Vue component options.

```js
new Vue({

  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  }

})
```

## CDN

The CDN version of vue-resource doesn't automatically register itself, thus, when you include either the JS file directly or via the CDN, you need to register the
VueResource instance with Vue yourself. To do so, add this line of code to your application:

```js
    Vue.use(VueResource);
```

## Webpack/Browserify

Add `vue` and `vue-resource` to your `package.json`, then `npm install`, then add these lines in your code:

```js
var Vue = require('vue');
var VueResource = require('vue-resource');

Vue.use(VueResource);
```

## Legacy web servers

If your web server can't handle requests encoded as `application/json`, you can enable the `emulateJSON` option. This will send the request as `application/x-www-form-urlencoded` MIME type, as if from an normal HTML form.

```js
Vue.http.options.emulateJSON = true;
```

If your web server can't handle REST/HTTP requests like `PUT`, `PATCH` and `DELETE`, you can enable the `emulateHTTP` option. This will set the `X-HTTP-Method-Override` header with the actual HTTP method and use a normal `POST` request.

```js
Vue.http.options.emulateHTTP = true;
```
