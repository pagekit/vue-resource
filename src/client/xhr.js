/**
 * XMLHttp request.
 */

var Promise = require('../lib/promise');

module.exports = function (_) {

    var client;

    return {

        send: function (request) {

            client = new XMLHttpRequest();

            if (request.crossOrigin && !('withCredentials' in client)) {
                client = new XDomainRequest();
                request.headers = {};
            }

            return new Promise(function (resolve) {

                if (_.isFunction(request.beforeSend)) {
                    request.beforeSend.call(this, client, request);
                }

                client.open(request.method, _.url(request), true);
                client.timeout = request.timeout;

                _.each(request.headers, function (value, header) {
                    client.setRequestHeader(header, value);
                });

                var handler = function (event) {

                    client.ok = event.type === 'load';
                    client.header = function (name) {
                        return 'getResponseHeader' in this ? this.getResponseHeader(name) : null;
                    };

                    if (client.ok && client.status) {
                        client.ok = client.status >= 200 && client.status < 300;
                    }
                    client.reject = !client.ok;

                    resolve(client);
                };

                client.onload = handler;
                client.onabort = handler;
                client.onerror = handler;
                client.ontimeout = handler;

                client.send(request.data);
            });

        },

        cancel: function () {
            client.abort();
        }

    };
};
