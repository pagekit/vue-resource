/**
 * Base client.
 */

import Promise from '../../promise';
import xhrClient from './xhr';
import nodeClient from './node';
import {warn, when, isObject, isFunction, inBrowser} from '../../util';

export default function (context) {

    const reqHandlers = [sendRequest], resHandlers = [];

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        while (reqHandlers.length) {

            const handler = reqHandlers.pop();

            if (isFunction(handler)) {

                let response, next;

                response = handler.call(context, request, val => next = val) || next;

                if (isObject(response)) {
                    return new Promise((resolve, reject) => {

                        resHandlers.forEach(handler => {
                            response = when(response, response => {
                                return handler.call(context, response) || response;
                            }, reject);
                        });

                        when(response, resolve, reject);

                    }, context);
                }

                if (isFunction(response)) {
                    resHandlers.unshift(response);
                }

            } else {
                warn(`Invalid interceptor of type ${typeof handler}, must be a function`);
            }
        }
    }

    Client.use = handler => {
        reqHandlers.push(handler);
    };

    return Client;
}

function sendRequest(request) {

    const client = request.client || (inBrowser ? xhrClient : nodeClient);

    return client(request);
}
