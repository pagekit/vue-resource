/**
 * Timeout Interceptor.
 */

module.exports = function (_) {

    return function () {

        var timeout;

        return {

            request: function (request) {

                if (request.timeout) {
                    timeout = setTimeout(function () {
                        request.cancel();
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

};
