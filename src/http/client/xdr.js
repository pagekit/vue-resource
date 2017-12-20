/**
 * XDomain client (Internet Explorer).
 */

import Promise from '../../promise';

export default function (request) {
    return new Promise(resolve => {

        var xdr = new XDomainRequest(), handler = ({type}) => {

                var status = 0;

                if (type === 'load') {
                    status = 200;
                } else if (type === 'error') {
                    status = 500;
                }

                resolve(request.respondWith(xdr.responseText, {status}));
            };

        request.abort = () => xdr.abort();

        xdr.open(request.method, request.getUrl());

        if (request.timeout) {
            xdr.timeout = request.timeout;
        }

        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = () => {};
        xdr.send(request.getBody());
    });
}
