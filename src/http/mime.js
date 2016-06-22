/**
 * Mime Interceptor.
 */

import Url from '../url/index';
import { parseJSON, isString, isFormData, isObject, isPlainObject } from '../util';

export default function (request, next) {

    if (request.emulateJSON && isPlainObject(request.data)) {
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        request.data = Url.params(request.data);
    }

    if (isFormData(request.data)) {
        delete request.headers['Content-Type'];
    }

    if (isPlainObject(request.data)) {
        request.data = JSON.stringify(request.data);
    }

    next((response) => {

        if (!request.responseType && isString(response.data)) {

            var contentType = response.headers['Content-Type'];

            if (isString(contentType) && contentType.indexOf('application/json') === 0) {
                response.data = parseJSON(response.data);
            }
        }

    });
}
