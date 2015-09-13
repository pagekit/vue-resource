/**
 * XMLHttp request.
 */

var Promise = require('./promise');
var XDomain = window.XDomainRequest;

module.exports = function (_, options) {

    var request = new XMLHttpRequest(), promise;

    if (XDomain && options.crossOrigin) {
        request = new XDomainRequest(); options.headers = {};
    }

    if (_.isPlainObject(options.xhr)) {
        _.extend(request, options.xhr);
    }

    if (_.isFunction(options.beforeSend)) {
        options.beforeSend.call(this, request, options);
    }

    promise = new Promise(function (resolve, reject) {

        request.open(options.method, _.url(options), true);

        _.each(options.headers, function (value, header) {
            request.setRequestHeader(header, value);
        });

        var handler = function (event) {

            request.ok = event.type === 'load';

            if (request.ok && request.status) {
                request.ok = request.status >= 200 && request.status < 300;
            }

            (request.ok ? resolve : reject)(request);
        };

        request.onload = handler;
        request.onabort = handler;
        request.onerror = handler;

        request.send(options.data);
    });

    return promise;
};
