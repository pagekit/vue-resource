/**
 * JSONP Interceptor.
 */

import jsonpClient from '../client/jsonp';
import { when } from '../../util';

export default function (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next((response) => {

        if (request.method == 'JSONP') {

            return when(response.json(), json => {

                response.body = json;

                return response;
            });
        }

    });
}
