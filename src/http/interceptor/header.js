/**
 * Header Interceptor.
 */

import Http from '../index';
import { assign } from '../../util';

export default function (request, next) {

    request.method = request.method.toUpperCase();
    request.headers = assign({}, Http.headers.common,
        !request.crossOrigin ? Http.headers.custom : {},
        Http.headers[request.method.toLowerCase()],
        request.headers
    );

    next();
}
