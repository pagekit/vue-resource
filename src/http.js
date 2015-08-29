/**
 * Service for sending network requests.
 */

var xhr = require('./lib/xhr');
var jsonp = require('./lib/jsonp');
var Promise = require('./lib/promise');

module.exports = function (_) {

    var originUrl = _.url.parse(location.href);
    var jsonType = {'Content-Type': 'application/json;charset=utf-8'};

    function Http(url, options) {

        var promise;

        if (_.isPlainObject(url)) {
            options = url;
            url = '';
        }

        options = _.extend({url: url}, options);
        options = _.extend(true, {},
            Http.options, this.options, options
        );

        if (options.crossOrigin === null) {
            options.crossOrigin = crossOrigin(options.url);
        }

        options.method = options.method.toUpperCase();
        options.headers = _.extend({}, Http.headers.common,
            !options.crossOrigin ? Http.headers.custom : {},
            Http.headers[options.method.toLowerCase()],
            options.headers
        );

        if (_.isPlainObject(options.data) && /^(GET|JSONP)$/i.test(options.method)) {
            _.extend(options.params, options.data);
            delete options.data;
        }

        if (options.emulateHTTP && !options.crossOrigin && /^(PUT|PATCH|DELETE)$/i.test(options.method)) {
            options.headers['X-HTTP-Method-Override'] = options.method;
            options.method = 'POST';
        }

        if (options.emulateJSON && _.isPlainObject(options.data)) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.data = _.url.params(options.data);
        }

        if (_.isObject(options.data) && /FormData/i.test(options.data.toString())) {
            delete options.headers['Content-Type'];
        }

        if (_.isPlainObject(options.data)) {
            options.data = JSON.stringify(options.data);
        }

        promise = (options.method == 'JSONP' ? jsonp : xhr).call(this.vm, _, options);
        promise = extendPromise(promise.then(transformResponse, transformResponse), this.vm);

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

    function transformResponse(response) {

        try {
            response.data = JSON.parse(response.responseText);
        } catch (e) {
            response.data = response.responseText;
        }

        return response.ok ? response : Promise.reject(response);
    }

    function crossOrigin(url) {

        var requestUrl = _.url.parse(url);

        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
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
        emulateJSON: false
    };

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
