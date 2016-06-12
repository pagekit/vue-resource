/**
 * XDomain client (Internet Explorer).
 */

import Url from '../../url/index';
import Promise from '../../promise';

export default function (request) {
    return new Promise((resolve) => {

        var xdr = new XDomainRequest(), response = {request: request}, handler;

        request.cancel = () => {
            xdr.abort();
        };

        xdr.open(request.method, Url(request), true);

        handler = (event) => {

            response.data = xdr.responseText;
            response.status = xdr.status;
            response.statusText = xdr.statusText || '';

            resolve(response);
        };

        xdr.timeout = 0;
        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = () => {};
        xdr.onprogress = () => {};

        xdr.send(request.data);
    });
}
