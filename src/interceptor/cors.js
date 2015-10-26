/**
 * CORS Interceptor.
 */

module.exports = function (_) {

    var originUrl = _.url.parse(location.href);

    return {

        request: function (options) {

            if (options.crossOrigin === null) {
                options.crossOrigin = crossOrigin(options.url);
            }

            return options;

        }

    };

    function crossOrigin(url) {

        var requestUrl = _.url.parse(url);

        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);

    }

}