/**
 * Form data Interceptor.
 */

import Url from '../../url/index';
import { isObject, isFormData } from '../../util';

export default function (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');

    } else if (isObject(request.body) && request.emulateJSON) {

        request.body = Url.params(request.body);
        request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    next();
}
