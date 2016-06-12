/**
 * Before Interceptor.
 */

import { isFunction } from '../util';

const exports = {

    request: function (request) {

        if (isFunction(request.beforeSend)) {
            request.beforeSend.call(this, request);
        }

        return request;
    }

};

export default exports;
