/**
 * HTTP method override Interceptor.
 */

module.exports = function (_) {

    return {

        request: function (request) {

            if (request.emulateHTTP && !request.crossOrigin && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
                request.headers['X-HTTP-Method-Override'] = request.method;
                request.method = 'POST';
            }

            return request;
        }

    };

};
