/**
 * Body Interceptor.
 */

import Url from '../../url/index';
import { when, isString, isFormData, isPlainObject } from '../../util';

export default function (request, next) {

    if (request.emulateJSON && isPlainObject(request.body)) {
        request.body = Url.params(request.body);
        request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    if (isFormData(request.body)) {
        request.headers.delete('Content-Type');
    }

    if (isPlainObject(request.body)) {
        request.body = JSON.stringify(request.body);
    }

    next((response) => {

        Object.defineProperty(response, 'data', {

            get() {
                return this.body;
            },

            set(body) {
                this.body = body;
            }

        });

        return response.bodyText ? when(response.text(), text => {

            var type = response.headers.get('Content-Type');

            if (isString(type) && type.indexOf('application/json') === 0) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }

            } else {
                response.body = text;
            }

            return response;

        }) : response;

    });
}
