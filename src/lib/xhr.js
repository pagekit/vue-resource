/**
 * XMLHttp request.
 */

var Promise = require('./promise');
var Response = require('./response');

module.exports = function (_) {

    var xhr, handler;

    return {

        send: function (request) {

            xhr = new XMLHttpRequest();

            if (request.crossOrigin && !('withCredentials' in xhr)) {
                xhr = new XDomainRequest();
                request.headers = {};
            }

            if (_.isPlainObject(request.xhr)) {
                _.extend(xhr, request.xhr);
            }

            return new Promise(function (resolve) {

                xhr.open(request.method, _.url(request), true);

                _.each(request.headers, function (value, header) {
                    xhr.setRequestHeader(header, value);
                });

                handler = function (event) {
                    resolve(Response(xhr.responseText, xhr.status));
                };

                xhr.onload = handler;
                xhr.onabort = handler;
                xhr.onerror = handler;

                xhr.send(request.data);
            });

        },

        cancel: function () {
            xhr.abort();
        }

    };
};
