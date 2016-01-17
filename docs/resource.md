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
new Vue({

    ready: function() {

      var resource = this.$resource('someItem{/id}');

      // get item
      resource.get({id: 1}).then(function (response) {
          this.$set('item', response.item)
      });

      // save item
      resource.save({id: 1}, {item: this.item}).then(function (response) {
          // success callback
      }, function (response) {
          // error callback
      });

      // delete item
      resource.delete({id: 1}).then(function (response) {
          // success callback
      }, function (response) {
          // error callback
      });

    }

})
```
