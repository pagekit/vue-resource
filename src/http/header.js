/**
 * Header Interceptor.
 */

import Http from './index';
import { assign, isPlainObject } from '../util';

export default function (request, next) {

    request.method = request.method.toUpperCase();
    request.headers = assign({}, Http.headers.common,
        !request.crossOrigin ? Http.headers.custom : {},
        Http.headers[request.method.toLowerCase()],
        request.headers
    );

    if (isPlainObject(request.data) && /^(GET|JSONP)$/i.test(request.method)) {
        assign(request.params, request.data);
        delete request.data;
    }

    next();
}
