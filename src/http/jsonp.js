/**
 * JSONP Interceptor.
 */

import jsonpClient from './client/jsonp';

const exports = {

    request: function (request) {

        if (request.method == 'JSONP') {
            request.client = jsonpClient;
        }

        return request;
    }

};

export default exports;
