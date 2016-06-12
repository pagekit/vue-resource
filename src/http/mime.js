/**
 * Mime Interceptor.
 */

import Url from '../url/index';
import { isObject, isPlainObject } from '../util';

const exports = {

    request(request) {

        if (request.emulateJSON && isPlainObject(request.data)) {
            request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            request.data = Url.params(request.data);
        }

        if (isObject(request.data) && /FormData/i.test(request.data.toString())) {
            delete request.headers['Content-Type'];
        }

        if (isPlainObject(request.data)) {
            request.data = JSON.stringify(request.data);
        }

        return request;
    },

    response(response) {

        try {
            response.data = JSON.parse(response.data);
        } catch (e) {}

        return response;
    }

};

export default exports;
