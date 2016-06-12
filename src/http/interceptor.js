/**
 * Interceptor factory.
 */

import Promise from '../promise';
import { isFunction } from '../util';

export default function (handler, vm) {

    return function (client) {

        if (isFunction(handler)) {
            handler = handler.call(vm, Promise);
        }

        return function (request) {

            if (isFunction(handler.request)) {
                request = handler.request.call(vm, request);
            }

            return when(request, function (request) {
                return when(client(request), function (response) {

                    if (isFunction(handler.response)) {
                        response = handler.response.call(vm, response);
                    }

                    return response;
                });
            });
        };
    };
}

function when(value, fulfilled, rejected) {

    var promise = Promise.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}
