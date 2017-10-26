# Resource

The resource service can be used globally `Vue.resource` or in a Vue instance `this.$resource`.

## Methods

* `resource(url, [params], [actions], [options])`

## Default Actions

```js
get: {method: 'GET'},
save: {method: 'POST'},
query: {method: 'GET'},
update: {method: 'PUT'},
remove: {method: 'DELETE'},
delete: {method: 'DELETE'}
```

## Example

```js
{
  var resource = this.$resource('someItem{/id}');

  // GET someItem/1
  resource.get({id: 1}).then(response => {
    this.item = response.body;
  });

  // POST someItem/1
  resource.save({id: 1}, {item: this.item}).then(response => {
    // success callback
  }, response => {
    // error callback
  });

  // DELETE someItem/1
  resource.delete({id: 1}).then(response => {
    // success callback
  }, response => {
    // error callback
  });
}
```

## Custom Actions

```js
{
  var customActions = {
    foo: {method: 'GET', url: 'someItem/foo{/id}'},
    bar: {method: 'POST', url: 'someItem/bar{/id}'}
  }

  var resource = this.$resource('someItem{/id}', {}, customActions);

  // GET someItem/foo/1
  resource.foo({id: 1}).then(response => {
    this.item = response.body;
  });

  // POST someItem/bar/1
  resource.bar({id: 1}, {item: this.item}).then(response => {
    // success callback
  }, response => {
    // error callback
  });
}
```

**Note:** When passing only one single object (for POST, PUT and PATCH custom actions), it will defaults to body param. If you need set url params you will have to pass an empty object as second argument.

```js
{
  var resource = this.$resource('someItem{/id}', {}, {
    baz: {method: 'POST', url: 'someItem/baz{/id}'}
  });

  // POST someItem/baz
  resource.baz({id: 1}).then(response => {
    // success callback
  }, response => {
    // error callback
  });

  // POST someItem/baz/1
  resource.baz({id: 1}, {}).then(response => {
    // success callback
  }, response => {
    // error callback
  });
```
