/**
 * XDomain client (Internet Explorer).
 */

import Promise from '../../promise';

export default function (request) {
    return new Promise((resolve) => {

        var xdr = new XDomainRequest(), handler;

        request.abort = () => xdr.abort();

        xdr.open(request.method, request.getUrl(), true);

        handler = (event) => {

            var response = request.respondWith(
                xdr.responseText, {
                    status: xhr.status,
                    statusText: xdr.statusText
                }
            );

            resolve(response);
        };

        xdr.timeout = 0;
        xdr.onload = handler;
        xdr.onerror = handler;
        xdr.ontimeout = () => {};
        xdr.onprogress = () => {};

        xdr.send(request.getBody());
    });
}
