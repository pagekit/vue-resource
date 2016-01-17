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
