/**
 * Header Interceptor.
 */

import Http from './index';
import { extend, isPlainObject } from '../util';

export default function (request, next) {

    request.method = request.method.toUpperCase();
    request.headers = extend({}, Http.headers.common,
        !request.crossOrigin ? Http.headers.custom : {},
        Http.headers[request.method.toLowerCase()],
        request.headers
    );

    if (isPlainObject(request.data) && /^(GET|JSONP)$/i.test(request.method)) {
        extend(request.params, request.data);
        delete request.data;
    }

    next();
}
