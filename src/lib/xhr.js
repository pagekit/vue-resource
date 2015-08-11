/**
 * XMLHttp request.
 */

var _ = require('./util');
var Promise = require('./promise');

module.exports = function (url, options) {

    var request = new XMLHttpRequest(), promise;

    if (_.isFunction(options.beforeSend)) {
        options.beforeSend.call(this, request, options);
    }

    promise = new Promise(function (resolve, reject) {

        if (_.isPlainObject(options.xhr)) {
            _.each(options.xhr, function (value, key) {
                request[key] = value;
            });
        }

        request.open(options.method, url(options), true);

        _.each(options.headers, function (value, header) {
            request.setRequestHeader(header, value);
        });

        request.onreadystatechange = function () {

            if (request.readyState === 4) {

                request.ok = request.status >= 200 && request.status < 300;

                (request.ok ? resolve : reject)(request);
            }
        };

        request.send(options.data);
    });

    return promise;
};
