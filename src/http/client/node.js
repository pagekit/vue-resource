/**
 * Http client (Node).
 */

import Promise from '../../promise';
import {each, trim} from '../../util';

export default function (request) {

    const client = require('got');

    return new Promise(resolve => {

        var url = request.getUrl();
        var body = request.getBody();
        var method = request.method;
        var headers = {}, handler;

        request.headers.forEach((value, name) => {
            headers[name] = value;
        });

        client(url, {body, method, headers}).then(handler = (resp) => {

            var response = request.respondWith(resp.body, {
                status: resp.statusCode,
                statusText: trim(resp.statusMessage)
            });

            each(resp.headers, (value, name) => {
                response.headers.set(name, value);
            });

            resolve(response);

        }, error => handler(error.response));
    });
}
