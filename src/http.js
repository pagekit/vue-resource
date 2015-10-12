/**
 * Service for sending network requests.
 */

var Promise = require('./lib/promise');

module.exports = function (_) {

    var request = require('./lib/request')(_);
    var jsonType = {'Content-Type': 'application/json;charset=utf-8'};

    var defaultInterceptor = {
        'mime': require('./interceptor/mime.js')(_)
    };

    function Http(url, options) {
        var chain, promise,
            vm = this.vm,
            requestInterceptor = [],
            responseInterceptor = [];

        if (_.isPlainObject(url)) {
            options = url;
            url = '';
        }

        options = _.extend({url: url}, options);
        options = _.extend(true, {},
            Http.options, this.options, options
        );

        Http.interceptor.forEach(function (interceptor) {
            var config = {};

            if (_.isArray(interceptor)) {
                interceptor = interceptor[0];
                config = interceptor[1];
            }

            if (_.isString(interceptor)) {
                interceptor = defaultInterceptor[interceptor];
            }

            if (_.isFunction(interceptor)) {
                interceptor = interceptor.call(this, Promise);
            }

            if (!_.isPlainObject(interceptor)) {
                return;
            }

            // TODO: Add config.
            if (interceptor.request) {
                requestInterceptor.push(interceptor.request);
            }

            if (interceptor.response) {
                responseInterceptor.push(interceptor.response);
            }

        });

        chain = requestInterceptor.concat([request], responseInterceptor);
        promise = chain.reduce(function (sequence, segment) {

            return sequence.then(function (carry) {
                return segment.call(vm, carry);
            })

        }, Promise.resolve(options));

        promise = extendPromise(promise.then(function (response) {

            return response.ok ? response : Promise.reject(response);

        }), vm);

        if (options.success) {
            promise = promise.success(options.success);
        }

        if (options.error) {
            promise = promise.error(options.error);
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

    Http.interceptor = [
        'mime'
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
