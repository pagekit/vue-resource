/**
 * Mime Interceptor.
 */

module.exports = function (_) {

    return {

        request: function (request) {

            if (request.emulateJSON && _.isPlainObject(request.data)) {
                request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                request.data = _.url.params(request.data);
            }

            if (request.emulateHTTP && !request.crossOrigin && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
                request.headers['X-HTTP-Method-Override'] = request.method;
                request.method = 'POST';
            }

            if (_.isObject(request.data) && /FormData/i.test(request.data.toString())) {
                delete request.headers['Content-Type'];
            }

            if (_.isPlainObject(request.data)) {
                request.data = JSON.stringify(request.data);
            }

            return request;

        },

        response: function (response) {

            try {
                response.data = JSON.parse(response.responseText);
            } catch (e) {
                response.data = response.responseText;
            }

            return response;

        }

    };

}