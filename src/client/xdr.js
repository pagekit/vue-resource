/**
 * XDomain client (Internet Explorer).
 */

var Promise = require('../lib/promise');

module.exports = function (_) {

    return function (request) {
        return new Promise(function (resolve) {

            var xdr = new XDomainRequest(), response = {request: request}, handler;

            request.cancel = function () {
                xdr.abort();
            };

            xdr.open(request.method, _.url(request), true);

            handler = function (event) {

                response.data = xdr.responseText;
                response.status = xdr.status;
                response.statusText = xdr.statusText;

                resolve(response);
            };

            xdr.onload = handler;
            xdr.onabort = handler;
            xdr.onerror = handler;
            xdr.onprogress = function () {};

            xdr.send(request.data);
        });
    };

};
