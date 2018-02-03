/**
 * JSON Interceptor.
 */

import Url from '../../url/index';
import { when, isObject } from '../../util';

export default function (request, next) {

    var type = request.headers.get('Content-Type') || '';

    if (isObject(request.body) && type.indexOf('application/json') === 0) {
        request.body = JSON.stringify(request.body);
    }

    next(response => {

        return response.bodyText ? when(response.text(), text => {

            type = response.headers.get('Content-Type') || '';

            if (type.indexOf('application/json') === 0 || isJson(text)) {

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

function isJson(str) {

    const start = str.match(/^\s*(\[|\{)/);
    const end = {'[': /]\s*$/, '{': /}\s*$/};

    return start && end[start[1]].test(str);
}
