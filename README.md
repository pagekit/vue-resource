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

## Asset

The asset service can be used globally `Vue.asset` or in a Vue instance `this.$asset`.

List of methods:

* `Vue.asset(assets, [success], [error])`


### Usage
```javascript
  new Vue({

      ready: function() {

        this.$asset({
            css   : [
                'lib/style.css',
                'lib2/style.css'
            ],
            js    : [
                'lib/script.js',
                'lib2/script.js',
            ],
            image : [
                'media/image1.png',
                'media/image2.png',
            ]

        }, function() {

            this.obj = new Lib(this.$el);

        }).error(function(e) {
            // handle error
        });

      }

  })
```
