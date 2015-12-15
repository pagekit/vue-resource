/**
 * Service for sending network requests.
 */

module.exports = function (_) {

    var Promise = require('./lib/promise')(_);
    var interceptor = require('./interceptor')(_);
    var defaultClient = require('./client/default')(_);
    var jsonType = {'Content-Type': 'application/json'};

    function Http(url, options) {

        var client = defaultClient, request, promise;

        if (_.isPlainObject(url)) {
            options = url;
            url = '';
        }

        request = _.extend({url: url}, options);
        request = _.extend(true, {},
            Http.options, this.options, request
        );

        Http.interceptors.forEach(function (i) {
            client = interceptor(i, this.vm)(client);
        }, this);

        promise = extendPromise(client(request).bind(this.vm).then(function (response) {

            response.ok = response.status >= 200 && response.status < 300;
            return response.ok ? response : Promise.reject(response);

        }, function (response) {

            if (response instanceof Error) {
                _.error(response);
            }

            return Promise.reject(response);
        }));

        if (request.success) {
            promise = promise.success(request.success);
        }

        if (request.error) {
            promise = promise.error(request.error);
        }

        return promise;
    }

    function extendPromise(promise) {

        promise.success = function (fn) {

            _.warn('The `success` method has been deprecated. Use the `then` method instead.');

            return extendPromise(promise.then(function (response) {
                return fn.call(this, response.data, response.status, response) || response;
            }));

        };

        promise.error = function (fn) {

            _.warn('The `error` method has been deprecated. Use the `catch` method instead.');

            return extendPromise(promise.then(undefined, function (response) {
                return fn.call(this, response.data, response.status, response) || response;
            }));

        };

        promise.always = function (fn) {

            _.warn('The `always` method has been deprecated. Use the `finally` method instead.');

            var cb = function (response) {
                return fn.call(this, response.data, response.status, response) || response;
            };

            return extendPromise(promise.then(cb, cb));
        };

        return promise;
    }

    Http.options = {
        method: 'get',
        data: '',
        params: {},
        headers: {},
        xhr: null,
        jsonp: 'callback',
        beforeSend: null,
        crossOrigin: null,
        emulateHTTP: false,
        emulateJSON: false,
        timeout: 0
    };

    Http.interceptors = [
        require('./interceptor/before')(_),
        require('./interceptor/timeout')(_),
        require('./interceptor/jsonp')(_),
        require('./interceptor/method')(_),
        require('./interceptor/mime')(_),
        require('./interceptor/header')(_),
        require('./interceptor/cors')(_)
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

            if (_.isObject(success)) {
                options = success;
                success = undefined;
            }

            return this(url, _.extend({method: method, data: data, success: success}, options));
        };
    });

    return _.http = Http;
};
