/**
 * XDomain client (Internet Explorer).
 */

module.exports = function (_) {

    var Promise = require('../promise')(_);

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

            xdr.timeout = 0;
            xdr.onload = handler;
            xdr.onabort = handler;
            xdr.onerror = handler;
            xdr.ontimeout = function () {};
            xdr.onprogress = function () {};

            xdr.send(request.data);
        });
    };

};
