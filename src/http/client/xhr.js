/**
 * XMLHttp client.
 */

import Url from '../../url/index';
import Promise from '../../promise';
import { assign, each, trim } from '../../util';

export default function (request) {
    return new Promise((resolve) => {

        var xhr = new XMLHttpRequest(), response = {request: request}, handler;

        request.cancel = () => {
            xhr.abort();
        };

        xhr.open(request.method, Url(request), true);

        handler = (event) => {

            response.data = 'response' in xhr ? xhr.response : xhr.responseText;
            response.status = xhr.status === 1223 ? 204 : xhr.status; // IE9 status bug
            response.statusText = xhr.status === 1223 ? 'No Content' : trim(xhr.statusText);
            response.allHeaders = xhr.getAllResponseHeaders();

            resolve(response);
        };

        xhr.timeout = 0;
        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        if (request.responseType) {
            try {
              xhr.responseType = request.responseType;
            } catch (e) {
                if (xhr.responseType !== 'json') {
                    throw e;
                }
            }
        }

        if (request.withCredentials) {
            xhr.withCredentials = true;
        }

        each(request.headers || {}, (value, header) => {
            xhr.setRequestHeader(header, value);
        });

        xhr.send(request.data);
    });
}
