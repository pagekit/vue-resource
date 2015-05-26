module.exports = function (Vue) {

    var _ = require('./util')(Vue);
    var jsonType = { 'Content-Type': 'application/json;charset=utf-8' };

    /**
     * Http provides a service for sending XMLHttpRequests.
     */

    function Http (url, options) {

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

        if (_.isObject(options.data) && /FormData/i.test(options.data.toString())) {
            delete options.headers['Content-Type'];
        }

        promise = new _.Promise((options.method.toLowerCase() == 'jsonp' ? jsonp : xhr).bind(this, (this.$url || Vue.url), options));

        _.extend(promise, {

            success: function (onSuccess) {

                this.then(function (request) {
                    onSuccess.apply(self, parseReq(request));
                }, function () {});

                return this;
            },

            error: function (onError) {

                this.catch(function (request) {
                    onError.apply(self, parseReq(request));
                });

                return this;
            },

            always: function (onAlways) {

                var cb = function (request) {
                    onAlways.apply(self, parseReq(request));
                };

                this.then(cb, cb);

                return this;
            }

        });

        if (options.success) {
            promise.success(options.success);
        }

        if (options.error) {
            promise.error(options.error);
        }

        return promise;
    }

    function xhr(url, options, resolve, reject) {

        var request = new XMLHttpRequest();

        if (_.isFunction(options.beforeSend)) {
            options.beforeSend(request, options);
        }

        if (options.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(options.method)) {
            options.headers['X-HTTP-Method-Override'] = options.method;
            options.method = 'POST';
        }

        if (options.emulateJSON && _.isPlainObject(options.data)) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.data = Vue.url.params(options.data);
        }

        if (_.isPlainObject(options.data)) {
            options.data = JSON.stringify(options.data);
        }

        request.open(options.method, url(options), true);

        _.each(options.headers, function (value, header) {
            request.setRequestHeader(header, value);
        });

        request.onreadystatechange = function () {

            if (this.readyState === 4) {

                if (this.status >= 200 && this.status < 300) {
                    resolve(this);
                } else {
                    reject(this);
                }
            }
        };

        request.send(options.data);
    }

    function jsonp(url, options, resolve, reject) {

        var callback = '_jsonp' + Math.random().toString(36).substr(2), script, result;

        _.extend(options.params, options.data);
        options.params[options.jsonp] = callback;

        if (_.isFunction(options.beforeSend)) {
            options.beforeSend({}, options);
        }

        script = document.createElement('script');
        script.src = url(options.url, options.params);
        script.type = 'text/javascript';
        script.async = true;

        window[callback] = function (data) {
            result = data;
        };

        var handler = function (event) {

            delete window[callback];
            document.body.removeChild(script);

            if (event.type === 'load' && !result) {
                event.type = 'error';
            }

            var text = result ? result : event.type, status = event.type === 'error' ? 404 : 200;

            (status === 200 ? resolve : reject)({ responseText: text, status: status });
        };

        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    }

    function parseReq(request) {

        var result;

        try {
            result = JSON.parse(request.responseText);
        } catch (e) {
            result = request.responseText;
        }

        return [result, request.status, request];
    }

    Http.options = {
        method: 'GET',
        params: {},
        data: '',
        jsonp: 'callback',
        beforeSend: null,
        emulateHTTP: false,
        emulateJSON: false,
    };

    Http.headers = {
        put: jsonType,
        post: jsonType,
        patch: jsonType,
        delete: jsonType,
        common: { 'Accept': 'application/json, text/plain, */*' }
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
