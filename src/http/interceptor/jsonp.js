/**
 * JSONP Interceptor.
 */

import jsonpClient from '../client/jsonp';

export default function (request) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

}
