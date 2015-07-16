/**
 * Service for sending network requests.
 */

var _ = require('./lib/util');
var xhr = require('./lib/xhr');
var jsonp = require('./lib/jsonp');
var jsonType = {'Content-Type': 'application/json;charset=utf-8'};

module.exports = function (Vue) {

    var Url = Vue.url;
    var originUrl = Url.parse(location.href);

    function Http(url, options) {

        var self = this, promise;

        options = options || {};

        if (_.isPlainObject(url)) {
            options = url;
            url = '';
        }

        options = _.extend(true, {url: url},
            Http.options, _.options('http', self, options)
        );

        if (options.crossOrigin === null) {
            options.crossOrigin = crossOrigin(options.url);
        }

        options.headers = _.extend({},
            Http.headers.common,
            !options.crossOrigin ? Http.headers.custom : {},
            Http.headers[options.method.toLowerCase()],
            options.headers
        );

        if (_.isPlainObject(options.data) && /^(get|jsonp)$/i.test(options.method)) {
            _.extend(options.params, options.data);
            delete options.data;
        }

        if (options.emulateHTTP && !options.crossOrigin && /^(put|patch|delete)$/i.test(options.method)) {
            options.headers['X-HTTP-Method-Override'] = options.method;
            options.method = 'post';
        }

        if (options.emulateJSON && _.isPlainObject(options.data)) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.data = Url.params(options.data);
        }

        if (_.isObject(options.data) && /FormData/i.test(options.data.toString())) {
            delete options.headers['Content-Type'];
        }

        if (_.isPlainObject(options.data)) {
            options.data = JSON.stringify(options.data);
        }

        promise = (options.method.toLowerCase() == 'jsonp' ? jsonp : xhr).call(self, self.$url || Url, options);

        promise.then(transformResponse, transformResponse);

        promise.success = function (fn) {

            promise.then(function (response) {
                fn.call(self, response.data, response.status, response);
            }, function () {});

            return promise;
        };

        promise.error = function (fn) {

            promise.catch(function (response) {
                fn.call(self, response.data, response.status, response);
            });

            return promise;
        };

        promise.always = function (fn) {

            var cb = function (response) {
                fn.call(self, response.data, response.status, response);
            };

            promise.then(cb, cb);

            return promise;
        };

        if (options.success) {
            promise.success(options.success);
        }

        if (options.error) {
            promise.error(options.error);
        }

        return promise;
    }

    function transformResponse(response) {

        try {
            response.data = JSON.parse(response.responseText);
        } catch (e) {
            response.data = response.responseText;
        }

    }

    function crossOrigin(url) {

        var requestUrl = Url.parse(url);

        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
    }

    Http.options = {
        method: 'get',
        params: {},
        data: '',
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

    Object.defineProperty(Vue.prototype, '$http', {

        get: function () {
            return _.extend(Http.bind(this), Http);
        }

    });

    return Http;
};
