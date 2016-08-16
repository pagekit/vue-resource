/**
 * Body Interceptor.
 */

import Url from '../../url/index';
import Promise from '../../promise';
import { isString, isFormData, isPlainObject } from '../../util';

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

        return isBlobText(response.blob()) ? new Promise((resolve) => {

            var reader = new FileReader();

            reader.readAsText(response.blob());
            reader.onload = () => {
                response.init(reader.result);
                resolve(initData(response));
            };

        }) : initData(response);

    });
}

function initData(response) {

    var contentType = response.headers.get('Content-Type');

    if (isString(contentType) && contentType.indexOf('application/json') === 0) {

        try {
            response.data = response.json();
        } catch (e) {
            response.data = null;
        }

    } else {
        response.data = response.text();
    }

    return response;
}

function isBlobText(body) {
    return body && (body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1);
}
