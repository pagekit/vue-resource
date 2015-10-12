/**
 * XMLHttp request.
 */

var Promise = require('./promise');

module.exports = function (_, options) {

    var request = new XMLHttpRequest(), promise;

    if (options.crossOrigin && !('withCredentials' in request)) {

        request = new XDomainRequest();
        options.headers = {};
    }

    if (_.isPlainObject(options.xhr)) {
        _.extend(request, options.xhr);
    }


    if (_.isFunction(options.beforeSend)) {
        options.beforeSend.call(this, request, options);
    }

    promise = new Promise(function (resolve) {

        request.open(options.method, _.url(options), true);
        request.timeout = options.timeout;

        _.each(options.headers, function (value, header) {
            request.setRequestHeader(header, value);
        });

        var handler = function (event) {

            request.ok = event.type === 'load';
            request.header = function (name) {
                return 'getResponseHeader' in this ? this.getResponseHeader(name) : null;
            };

            if (request.ok && request.status) {
                request.ok = request.status >= 200 && request.status < 300;
            }
            request.reject = !request.ok;

            resolve(request);
        };

        request.onload = handler;
        request.onabort = handler;
        request.onerror = handler;
        request.ontimeout = handler;

        request.send(options.data);
    });

    return promise;
};
