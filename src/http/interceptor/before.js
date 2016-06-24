/**
 * Before Interceptor.
 */

import { isFunction } from '../../util';

export default function (request, next) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

    next();
}
