/**
 * Timeout Interceptor.
 */

const exports = function () {

    var timeout;

    return {

        request(request) {

            if (request.timeout) {
                timeout = setTimeout(() => {
                    request.cancel();
                }, request.timeout);
            }

            return request;
        },

        response(response) {

            clearTimeout(timeout);

            return response;
        }

    };
};

export default exports;
