# Configuration

Import VueResource into your main.js file.
```js
import VueResource from 'vue-resource'
Vue.use(VueResource);
```

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

Note that for the root option to work, the path of the request must be relative. This will use this the root option: `Vue.http.get('someUrl')` while this will not: `Vue.http.get('/someUrl')`.

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

## Typescript Support

Typescript for vue-resource should work out of the box since the type definition files are included within the npm package.
