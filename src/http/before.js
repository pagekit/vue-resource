/**
 * Before Interceptor.
 */

import { isFunction } from '../util';

export default function (request, next) {

    if (isFunction(request.beforeSend)) {
        request.beforeSend.call(this, request);
    }

    next();
}
