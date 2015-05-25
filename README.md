# vue-resource

Resource plugin for Vue.js (v0.11).

The plugin provides services for making web requests and handle responses using a XMLHttpRequest or JSONP.

## HTTP

The http service can be used globally `Vue.http` or in a Vue instance `this.$http`.

List of methods:

* `Vue.http.get(url, [data], [success], [options])`
* `Vue.http.post(url, [data], [success], [options])`
* `Vue.http.put(url, [data], [success], [options])`
* `Vue.http.patch(url, [data], [success], [options])`
* `Vue.http.delete(url, [data], [success], [options])`
* `Vue.http.jsonp(url, [data], [success], [options])`

### Usage

```javascript
  new Vue({

      ready: {

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

List of methods:

* `Vue.resource(url, [params], [actions])`

List of default actions:

```javascript
get: {method: 'GET'},
save: {method: 'POST'},
query: {method: 'GET'},
remove: {method: 'DELETE'},
delete: {method: 'DELETE'}
```

### Usage
```javascript
  new Vue({

      ready: {

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
