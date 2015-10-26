/**
 * Service for sending network requests.
 */

var Promise = require('./lib/promise');

module.exports = function (_) {

    var jsonType = {'Content-Type': 'application/json;charset=utf-8'};
    var factory = require('./interceptor/factory')(_);

    function Http(url, options) {

        var request;

        if (_.isPlainObject(url)) {
            options = url;
            url = '';
        }

        request = _.extend({url: url}, options);
        request = _.extend(true, {},
            Http.options, this.options, request
        );

        request.client = require('./client/xhr')(_);

        var promise = factory(Http.interceptors).run(request);

        promise = extendPromise(promise.then(function (response) {

            return response.ok ? response : Promise.reject(response);

        }), this.vm);

        if (request.success) {
            promise = promise.success(request.success);
        }

        if (request.error) {
            promise = promise.error(request.error);
        }

        return promise;
    }

    function extendPromise(promise, vm) {

        promise.success = function (fn) {

            return extendPromise(promise.then(function (response) {
                return fn.call(vm, response.data, response.status, response) || response;
            }), vm);

        };

        promise.error = function (fn) {

            return extendPromise(promise.then(undefined, function (response) {
                return fn.call(vm, response.data, response.status, response) || response;
            }), vm);

        };

        promise.always = function (fn) {

            var cb = function (response) {
                return fn.call(vm, response.data, response.status, response) || response;
            };

            return extendPromise(promise.then(cb, cb), vm);
        };

        return promise;
    }

    Http.options = {
        method: 'get',
        params: {},
        data: '',
        xhr: null,
        jsonp: 'callback',
        beforeSend: null,
        crossOrigin: null,
        emulateHTTP: false,
        emulateJSON: false,
        timeout: 0
    };

    Http.interceptors = [
        require('./interceptor/cors')(_),
        require('./interceptor/header')(_),
        require('./interceptor/mime')(_),
        require('./interceptor/jsonp')(_)
    ];

    Http.headers = {
        put: jsonType,
        post: jsonType,
        patch: jsonType,
        delete: jsonType,
        common: {'Accept': 'application/json, text/plain, */*'},
        custom: {'X-Requested-With': 'XMLHttpRequest'}
    };

    ['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

        Http[method] = function (url, data, success, options) {

            if (_.isFunction(data)) {
                options = success;
                success = data;
                data = undefined;
            }

            return this(url, _.extend({method: method, data: data, success: success}, options));
        };
    });

    return _.http = Http;
};
