/**
 * Service for sending network requests.
 */

var _ = require('./lib/util');
var xhr = require('./lib/xhr');
var jsonp = require('./lib/jsonp');
var jsonType = {'Content-Type': 'application/json;charset=utf-8'};

module.exports = function (Vue) {

    function Http(url, options) {

        var self = this, headers, promise;

        options = options || {};

        if (_.isPlainObject(url)) {
            options = url;
            url = '';
        }

        headers = _.extend({},
            Http.headers.common,
            Http.headers[options.method.toLowerCase()]
        );

        options = _.extend(true, {url: url, headers: headers},
            Http.options, _.options('http', this, options)
        );

        if (_.isPlainObject(options.data) && /^(get|jsonp)$/i.test(options.method)) {
            _.extend(options.params, options.data);
            delete options.data;
        }

        promise = (options.method.toLowerCase() == 'jsonp' ? jsonp : xhr).call(this, this.$url || Vue.url, options);

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

    Http.options = {
        method: 'get',
        params: {},
        data: '',
        jsonp: 'callback',
        beforeSend: null,
        emulateHTTP: false,
        emulateJSON: false
    };

    Http.headers = {
        put: jsonType,
        post: jsonType,
        patch: jsonType,
        delete: jsonType,
        common: {
            'Accept': 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest'
        }
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
