/**
 * XMLHttp client.
 */

import Url from '../../url/index';
import Promise from '../../promise';
import { each, extend, trim, isPlainObject } from '../../util';

export default function (request) {
    return new Promise((resolve) => {

        var xhr = new XMLHttpRequest(), response = {request: request}, handler;

        request.cancel = () => {
            xhr.abort();
        };

        xhr.open(request.method, Url(request), true);

        handler = (event) => {

            response.data = ('response' in xhr) ? xhr.response : xhr.responseText;
            response.status = xhr.status === 1223 ? 204 : xhr.status; // IE9 status bug
            response.statusText = trim(xhr.statusText || '');
            response.headers = xhr.getAllResponseHeaders();

            resolve(response);
        };

        xhr.timeout = 0;
        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = () => {};
        xhr.onprogress = () => {};

        if (isPlainObject(request.xhr)) {
            extend(xhr, request.xhr);
        }

        if (isPlainObject(request.upload)) {
            extend(xhr.upload, request.upload);
        }

        each(request.headers || {}, (value, header) => {
            xhr.setRequestHeader(header, value);
        });

        xhr.send(request.data);
    });
}
