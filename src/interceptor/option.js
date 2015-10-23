/**
 * Options Interceptor.
 */

module.exports = function (_) {

    var originUrl = _.url.parse(location.href);

    return {

        request: function (options) {

            if (options.crossOrigin === null) {
                options.crossOrigin = crossOrigin(options.url);
            }

            options.method = options.method.toUpperCase();
            options.headers = _.extend({}, _.http.headers.common,
                !options.crossOrigin ? _.http.headers.custom : {},
                _.http.headers[options.method.toLowerCase()],
                options.headers
            );

            if (_.isPlainObject(options.data) && /^(GET|JSONP)$/i.test(options.method)) {
                _.extend(options.params, options.data);
                delete options.data;
            }

            return options;

        }

    };

    function crossOrigin(url) {

        var requestUrl = _.url.parse(url);

        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
    }

}