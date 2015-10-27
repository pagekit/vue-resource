/**
 * CORS Interceptor.
 */

module.exports = function (_) {

    var originUrl = _.url.parse(location.href);

    return {

        request: function (request) {

            if (request.crossOrigin === null) {
                request.crossOrigin = crossOrigin(request.url);
            }

            return request;

        }

    };

    function crossOrigin(url) {

        var requestUrl = _.url.parse(url);

        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);

    }

};