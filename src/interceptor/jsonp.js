/**
 * JSONP Interceptor.
 */

module.exports = function (_) {

    return {

        request: function (request) {

            if (request.method == 'JSONP') {
                request.client = require('../client/jsonp')(_);
            }

            return request;

        }

    };

};