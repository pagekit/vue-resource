/**
 * Timeout Interceptor.
 */

module.exports = function (_) {

    var timeout;

    return {

        request: function (request) {

            if (request.timeout) {
                timeout = setTimeout(function () {

                    request.client.cancel();

                }, request.timeout);
            }

            return request;

        },

        response: function (response) {

            clearTimeout(timeout);

            return response;

        }

    };

};