/**
 * JSONP Interceptor.
 */

import jsonpClient from '../client/jsonp';
import { when } from '../../util';

export default function (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next(response => {

        if (request.method == 'JSONP') {

            try {
                response.body = JSON.parse(response.body);
            } catch (e) {
                response.body = null;
            }

        }

    });
}
