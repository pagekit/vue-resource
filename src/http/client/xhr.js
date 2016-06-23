/**
 * XMLHttp client.
 */

import Promise from '../../promise';
import { each, trim, isArray } from '../../util';

export default function (request) {
    return new Promise((resolve) => {

        var xhr = new XMLHttpRequest(), handler = (event) => {

            var response = request.respondWith(
                'response' in xhr ? xhr.response : xhr.responseText, {
                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText),
                    headers: parseHeaders(xhr.getAllResponseHeaders()),
                }
            );

            resolve(response);
        };

        request.abort = () => xhr.abort();

        xhr.open(request.method, request.getUrl(), true);
        xhr.timeout = 0;
        xhr.onload = handler;
        xhr.onerror = handler;

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        if (request.credentials === true) {
            xhr.withCredentials = true;
        }

        each(request.headers || {}, (value, header) => {
            xhr.setRequestHeader(header, value);
        });

        xhr.send(request.getBody());
    });
}

function parseHeaders(str) {

    var headers = {}, value, name, i;

    each(trim(str).split('\n'), (row) => {

        i = row.indexOf(':');
        name = trim(row.slice(0, i));
        value = trim(row.slice(i + 1));

        if (headers[name]) {

            if (isArray(headers[name])) {
                headers[name].push(value);
            } else {
                headers[name] = [headers[name], value];
            }

        } else {

            headers[name] = value;
        }

    });

    return headers;
}
