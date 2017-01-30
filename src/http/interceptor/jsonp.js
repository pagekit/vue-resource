/**
 * JSONP Interceptor.
 */

import jsonpClient from '../client/jsonp';

export default function (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next();
}
