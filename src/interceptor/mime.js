/**
 * Mime Interceptor.
 */

module.exports = function (_) {

    return {

        request: function (options) {

            if (options.emulateJSON && _.isPlainObject(options.data)) {
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                options.data = _.url.params(options.data);
            }

            if (_.isObject(options.data) && /FormData/i.test(options.data.toString())) {
                delete options.headers['Content-Type'];
            }

            if (_.isPlainObject(options.data)) {
                options.data = JSON.stringify(options.data);
            }

            return options;

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