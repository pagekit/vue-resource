/**
 * Base client.
 */

import Promise from '../../promise';
import xhrClient from './xhr';
import { each, trim, when, isArray, isObject, isPlainObject, isString, isFunction, toLower } from '../../util';

export default function (context) {

    var reqHandlers = [sendRequest], resHandlers = [];

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        return new Promise((resolve) => {

            function exec() {
                reqHandlers.pop().call(context, request, next);
            }

            function next(response) {
                when(response, (response) => {

                    if (isFunction(response)) {

                        resHandlers.unshift(response);

                    } else if (isObject(response)) {

                        processResponse(response);

                        resHandlers.forEach((handler) => {
                            handler.call(context, response);
                        });

                        resolve(response);

                        return;
                    }

                    exec();
                });
            }

            exec();

        }, context);
    }

    Client.use = (handler) => {
        reqHandlers.push(handler);
    };

    return Client;
}

function sendRequest(request, resolve) {

    var client = request.client || xhrClient;

    resolve(client(request));
}

function processResponse(response) {

    var headers = response.headers || response.allHeaders;

    if (isString(headers)) {
        headers = parseHeaders(headers);
    }

    if (isObject(headers)) {
        response.headers = (name) => name ? headers[toLower(name)] : headers;
    }

    response.ok = response.status >= 200 && response.status < 300;

    return response;
}

function parseHeaders(str) {

    var headers = {}, value, name, i;

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

    return headers;
}
