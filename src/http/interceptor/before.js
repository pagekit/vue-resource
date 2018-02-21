/**
 * Before Interceptor.
 */

import {isFunction} from '../../util';

export default function (request) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

}
