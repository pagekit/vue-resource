/**
 * Base client.
 */

import Promise from '../../promise';
import xhrClient from './xhr';
import { each, trim, isArray, isString, toLower } from '../../util';

export default function (request) {

    var response = (request.client || xhrClient)(request);

    return Promise.resolve(response).then((response) => {

        if (response.headers) {

            var headers = parseHeaders(response.headers);

            response.headers = (name) => {

                if (name) {
                    return headers[toLower(name)];
                }

                return headers;
            };

        }

        response.ok = response.status >= 200 && response.status < 300;

        return response;
    });

}

function parseHeaders(str) {

    var headers = {}, value, name, i;

    if (isString(str)) {
        each(str.split('\n'), (row) => {

            i = row.indexOf(':');
            name = trim(toLower(row.slice(0, i)));
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
    }

    return headers;
}
