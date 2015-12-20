/**
 * JSONP Interceptor.
 */

module.exports = function (_) {

    var jsonpClient = require('../client/jsonp')(_);

    return {

        request: function (request) {

            if (request.method == 'JSONP') {
                request.client = jsonpClient;
            }

            return request;
        }

    };

};
